// @ts-nocheck
'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, Legend } from 'recharts'
import { formatProgram } from '@/lib/format-program'
import { fmtMoney } from '@/lib/utils'

type Program = {
  program: string
  code: string
  payments: number
  amount: number
}

type ProgramYearly = {
  program: string
  yearly: { year: number; amount: number; payments: number }[]
}

const COLORS = ['#15803d', '#0284c7', '#dc2626', '#9333ea']

export default function ProgramCompareClient({ programs, programYearly }: { programs: Program[]; programYearly: ProgramYearly[] }) {
  const [selected, setSelected] = useState<string[]>([])
  const [search, setSearch] = useState('')

  const sorted = useMemo(() => [...programs].sort((a, b) => b.amount - a.amount), [programs])
  const yearlyMap = useMemo(() => {
    const m: Record<string, ProgramYearly['yearly']> = {}
    programYearly.forEach(p => { m[p.program] = p.yearly })
    return m
  }, [programYearly])

  const filtered = useMemo(() => {
    if (!search) return sorted.slice(0, 30)
    const q = search.toLowerCase()
    return sorted.filter(p => p.program.toLowerCase().includes(q) || formatProgram(p.program).toLowerCase().includes(q)).slice(0, 30)
  }, [sorted, search])

  function toggle(program: string) {
    setSelected(prev => {
      if (prev.includes(program)) return prev.filter(p => p !== program)
      if (prev.length >= 3) return prev
      return [...prev, program]
    })
  }

  const selectedPrograms = sorted.filter(p => selected.includes(p.program))

  // Build combined yearly chart data
  const yearlyChartData = useMemo(() => {
    if (selected.length === 0) return []
    const allYears = new Set<number>()
    selected.forEach(prog => {
      yearlyMap[prog]?.forEach(y => allYears.add(y.year))
    })
    return [...allYears].sort().map(year => {
      const row: Record<string, number | string> = { year: String(year) }
      selected.forEach(prog => {
        const entry = yearlyMap[prog]?.find(y => y.year === year)
        row[prog] = entry?.amount || 0
      })
      return row
    })
  }, [selected, yearlyMap])

  return (
    <div>
      {/* Program selector */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <input
            type="text"
            placeholder="Search programs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full max-w-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          />
          <span className="text-sm text-gray-400 whitespace-nowrap">{selected.length}/3 selected</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
          {filtered.map(p => {
            const isSelected = selected.includes(p.program)
            const colorIdx = selected.indexOf(p.program)
            return (
              <button
                key={p.program}
                onClick={() => toggle(p.program)}
                disabled={!isSelected && selected.length >= 3}
                className={`text-left p-3 rounded-lg border transition-all text-sm ${
                  isSelected
                    ? 'border-green-600 bg-green-50 shadow-sm'
                    : selected.length >= 3
                    ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                    : 'border-gray-200 hover:border-green-400 hover:bg-green-50/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isSelected && (
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[colorIdx] }} />
                  )}
                  <span className="font-medium truncate">{formatProgram(p.program)}</span>
                </div>
                <div className="text-gray-500 mt-0.5">{fmtMoney(p.amount)} · {p.payments.toLocaleString()} payments</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Comparison */}
      {selectedPrograms.length > 0 && (
        <div className="space-y-8">
          {/* Side by side stats */}
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selectedPrograms.length}, 1fr)` }}>
            {selectedPrograms.map((p, i) => (
              <div key={p.program} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
                  <h3 className="font-bold text-gray-900 text-sm truncate">{formatProgram(p.program)}</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-gray-400 uppercase">Total Spending</div>
                    <div className="text-xl font-bold text-gray-900">{fmtMoney(p.amount)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase">Total Payments</div>
                    <div className="text-xl font-bold text-gray-900">{p.payments.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase">Avg Payment</div>
                    <div className="text-xl font-bold text-gray-900">{fmtMoney(p.amount / p.payments)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase">Active Years</div>
                    <div className="text-lg font-bold text-gray-900">
                      {yearlyMap[p.program]?.length || 0} of 9
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Spending comparison bar */}
          <div>
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-gray-900 mb-3">Total Spending Comparison</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={selectedPrograms.map((p, i) => ({ name: formatProgram(p.program).slice(0, 25), amount: p.amount, idx: i }))} margin={{ left: 5, right: 5 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tickFormatter={(v: number) => fmtMoney(v)} tick={{ fontSize: 11 }} width={70} />
                <Tooltip formatter={(v: number) => ['$' + v.toLocaleString(undefined, { maximumFractionDigits: 0 }), 'Total']} />
                <Bar dataKey="amount" radius={[3, 3, 0, 0]}>
                  {selectedPrograms.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Year-over-year trend */}
          {yearlyChartData.length > 0 && (
            <div>
              <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-gray-900 mb-3">Year-Over-Year Trends</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={yearlyChartData} margin={{ left: 5, right: 5 }}>
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={(v: number) => fmtMoney(v)} tick={{ fontSize: 11 }} width={70} />
                  <Tooltip formatter={(v: number, name: string) => ['$' + Number(v).toLocaleString(undefined, { maximumFractionDigits: 0 }), formatProgram(String(name)).slice(0, 30)]} />
                  <Legend formatter={(value: string) => formatProgram(value).slice(0, 25)} />
                  {selected.map((prog, i) => (
                    <Line key={prog} type="monotone" dataKey={prog} stroke={COLORS[i]} strokeWidth={2} dot={{ r: 3 }} connectNulls />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {selectedPrograms.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">📊</div>
          <p>Select up to 3 programs above to compare them side by side.</p>
        </div>
      )}
    </div>
  )
}
