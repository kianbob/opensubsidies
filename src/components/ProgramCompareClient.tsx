// @ts-nocheck
'use client'
import { useState, useEffect, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#15803d', '#2563eb', '#dc2626', '#d97706']

interface Program { program: string; code: string; payments: number; amount: number }
interface ProgramYearly { program: string; yearly: { year: number; amount: number; payments: number }[] }

function fmtM(n: number) {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M'
  if (Math.abs(n) >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K'
  return '$' + n.toFixed(0)
}

export default function ProgramCompareClient() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [programYearly, setProgramYearly] = useState<ProgramYearly[]>([])
  const [selected, setSelected] = useState<string[]>(['', '', '', ''])

  useEffect(() => {
    Promise.all([
      fetch('/data/programs.json').then(r => r.json()),
      fetch('/data/program-yearly.json').then(r => r.json()),
    ]).then(([p, py]) => {
      const sorted = [...p].sort((a: Program, b: Program) => b.amount - a.amount)
      setPrograms(sorted)
      setProgramYearly(py)
      if (sorted.length >= 2) {
        setSelected([sorted[0].program, sorted[1].program, '', ''])
      }
    })
  }, [])

  const progMap = useMemo(() => Object.fromEntries(programs.map(p => [p.program, p])), [programs])
  const yearlyMap = useMemo(() => Object.fromEntries(programYearly.map(p => [p.program, p.yearly])), [programYearly])
  const picks = selected.filter(Boolean).map(name => progMap[name]).filter(Boolean)

  const chartData = useMemo(() => {
    if (!picks.length) return []
    const allYears = new Set<number>()
    picks.forEach(p => {
      const yd = yearlyMap[p.program] || []
      yd.forEach(y => allYears.add(y.year))
    })
    const years = [...allYears].sort()
    return years.map(y => {
      const row: Record<string, number | string> = { year: y }
      picks.forEach((p, i) => {
        const match = (yearlyMap[p.program] || []).find(r => r.year === y)
        row[`prog${i}`] = match ? match.amount : 0
      })
      return row
    })
  }, [picks, yearlyMap])

  const topPrograms = programs.slice(0, 50)

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[0, 1, 2, 3].map(i => (
          <select key={i} value={selected[i]} onChange={e => { const n = [...selected]; n[i] = e.target.value; setSelected(n) }}
            className="border rounded-lg px-3 py-2 text-sm bg-white truncate">
            <option value="">{i < 2 ? 'Select program' : 'Add program (optional)'}</option>
            {topPrograms.map(p => (
              <option key={p.program} value={p.program}>{p.program.length > 50 ? p.program.slice(0, 50) + '…' : p.program}</option>
            ))}
          </select>
        ))}
      </div>

      {picks.length >= 2 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {picks.map((p, i) => (
              <div key={p.program} className="bg-white rounded-xl shadow-sm border-t-4 p-4" style={{ borderColor: COLORS[i] }}>
                <h3 className="font-bold text-sm leading-tight">{p.program}</h3>
                <p className="text-sm text-gray-600 mt-2">Total: <span className="font-mono font-semibold text-gray-900">{fmtM(p.amount)}</span></p>
                <p className="text-sm text-gray-600">Payments: <span className="font-mono">{p.payments.toLocaleString()}</span></p>
                <p className="text-sm text-gray-600">Avg: <span className="font-mono">{fmtM(p.amount / p.payments)}</span></p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="font-bold text-lg mb-4 font-[family-name:var(--font-heading)]">Annual Spending by Program</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <XAxis dataKey="year" />
                <YAxis tickFormatter={v => fmtM(v)} />
                <Tooltip formatter={v => fmtM(v as number)} />
                <Legend />
                {picks.map((p, i) => (
                  <Bar key={p.program} dataKey={`prog${i}`} name={p.program.length > 30 ? p.program.slice(0, 30) + '…' : p.program} fill={COLORS[i]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary comparison table */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-bold text-lg mb-4 font-[family-name:var(--font-heading)]">Side-by-Side Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">Metric</th>
                    {picks.map((p, i) => (
                      <th key={i} className="px-3 py-2 text-right font-semibold" style={{ color: COLORS[i] }}>
                        {p.program.length > 20 ? p.program.slice(0, 20) + '…' : p.program}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="px-3 py-2 font-medium">Total Amount</td>{picks.map((p, i) => <td key={i} className="px-3 py-2 text-right font-mono">{fmtM(p.amount)}</td>)}</tr>
                  <tr><td className="px-3 py-2 font-medium">Payments</td>{picks.map((p, i) => <td key={i} className="px-3 py-2 text-right font-mono">{p.payments.toLocaleString()}</td>)}</tr>
                  <tr><td className="px-3 py-2 font-medium">Avg Payment</td>{picks.map((p, i) => <td key={i} className="px-3 py-2 text-right font-mono">{fmtM(p.amount / p.payments)}</td>)}</tr>
                  <tr><td className="px-3 py-2 font-medium">Active Years</td>{picks.map((p, i) => <td key={i} className="px-3 py-2 text-right font-mono">{(yearlyMap[p.program] || []).length}</td>)}</tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {picks.length < 2 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">Select at least 2 programs above to compare</p>
        </div>
      )}
    </div>
  )
}
