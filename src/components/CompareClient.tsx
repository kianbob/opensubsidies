// @ts-nocheck
'use client'
import { useState, useEffect, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#15803d', '#2563eb', '#dc2626', '#d97706']

interface State { abbr: string; name: string; payments: number; amount: number; topPrograms: { program: string; amount: number }[] }
interface YearlyRow { state: string; year: number; payments: number; amount: number }

export default function CompareClient() {
  const [states, setStates] = useState<State[]>([])
  const [yearly, setYearly] = useState<YearlyRow[]>([])
  const [selected, setSelected] = useState<string[]>(['TX', 'IA', '', ''])

  useEffect(() => {
    Promise.all([
      fetch('/data/states.json').then(r => r.json()),
      fetch('/data/state-yearly.json').then(r => r.json()),
    ]).then(([s, y]) => { setStates(s); setYearly(y) })
  }, [])

  const stateMap = useMemo(() => Object.fromEntries(states.map(s => [s.abbr, s])), [states])
  const picks = selected.filter(Boolean).map(a => stateMap[a]).filter(Boolean)

  const chartData = useMemo(() => {
    if (!picks.length) return []
    const years = [...new Set(yearly.filter(r => selected.includes(r.state)).map(r => r.year))].sort()
    return years.map(y => {
      const row: Record<string, number> = { year: y }
      picks.forEach(p => {
        const match = yearly.find(r => r.state === p.abbr && r.year === y)
        row[p.name] = match ? match.amount : 0
      })
      return row
    })
  }, [picks, yearly, selected])

  // Program overlap
  const programSets = picks.map(p => new Set(p.topPrograms.map(tp => tp.program)))
  const allPrograms = [...new Set(picks.flatMap(p => p.topPrograms.map(tp => tp.program)))]

  const fmtM = (n: number) => n >= 1e9 ? '$' + (n/1e9).toFixed(2) + 'B' : n >= 1e6 ? '$' + (n/1e6).toFixed(1) + 'M' : '$' + (n/1e3).toFixed(0) + 'K'

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[0,1,2,3].map(i => (
          <select key={i} value={selected[i]} onChange={e => { const n = [...selected]; n[i] = e.target.value; setSelected(n) }}
            className="border rounded-lg px-3 py-2 text-sm bg-white">
            <option value="">{i < 2 ? 'Select state' : 'Add state (optional)'}</option>
            {states.sort((a,b) => a.name.localeCompare(b.name)).map(s => (
              <option key={s.abbr} value={s.abbr}>{s.name}</option>
            ))}
          </select>
        ))}
      </div>

      {picks.length >= 2 && (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {picks.map((p, i) => (
              <div key={p.abbr} className="bg-white rounded-xl shadow-sm border-t-4 p-4" style={{ borderColor: COLORS[i] }}>
                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="text-sm text-gray-600 mt-1">Total: <span className="font-mono font-semibold text-gray-900">{fmtM(p.amount)}</span></p>
                <p className="text-sm text-gray-600">Payments: <span className="font-mono">{p.payments.toLocaleString()}</span></p>
                <p className="text-sm text-gray-600">Avg: <span className="font-mono">{fmtM(p.amount / p.payments)}</span></p>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="font-bold text-lg mb-4 font-[family-name:var(--font-heading)]">Annual Totals by State</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <XAxis dataKey="year" />
                <YAxis tickFormatter={v => fmtM(v)} />
                <Tooltip formatter={v => fmtM(v as number)} />
                <Legend />
                {picks.map((p, i) => (
                  <Bar key={p.abbr} dataKey={p.name} fill={COLORS[i]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Program overlap table */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-bold text-lg mb-4 font-[family-name:var(--font-heading)]">Top Programs Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">Program</th>
                    {picks.map(p => <th key={p.abbr} className="px-3 py-2 text-right font-semibold">{p.abbr}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {allPrograms.slice(0, 15).map(prog => (
                    <tr key={prog} className="hover:bg-gray-50">
                      <td className="px-3 py-2 text-xs">{prog}</td>
                      {picks.map(p => {
                        const tp = p.topPrograms.find(t => t.program === prog)
                        return <td key={p.abbr} className="px-3 py-2 text-right font-mono text-xs">{tp ? fmtM(tp.amount) : '—'}</td>
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {picks.length < 2 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">Select at least 2 states above to compare</p>
        </div>
      )}
    </div>
  )
}
