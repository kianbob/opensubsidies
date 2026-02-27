// @ts-nocheck
'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { formatProgram } from '@/lib/format-program'

type YearData = { year: number; payments: number; amount: number }
type ProgramYear = { program: string; yearly: { year: number; amount: number; payments: number }[] }

const EVENTS: { year: number; label: string; color: string }[] = [
  { year: 2018, label: '2018 Trade War', color: '#ca8a04' },
  { year: 2019, label: '2019 MFP Payments', color: '#ca8a04' },
  { year: 2020, label: '2020 COVID CFAP', color: '#dc2626' },
  { year: 2022, label: '2022 ERP', color: '#2563eb' },
]

function fmtMoney(n: number): string {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(0) + 'M'
  if (Math.abs(n) >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K'
  return '$' + n.toFixed(0)
}

export default function TimelineClient({ yearly, programYearly }: { yearly: YearData[]; programYearly: ProgramYear[] }) {
  const data = useMemo(() => yearly.filter(y => y.year >= 2017 && y.year <= 2025), [yearly])
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  const yearBreakdown = useMemo(() => {
    if (!selectedYear) return null
    const topPrograms = programYearly
      .map(p => {
        const yd = p.yearly.find(y => y.year === selectedYear)
        return yd ? { program: p.program, amount: yd.amount, payments: yd.payments } : null
      })
      .filter(Boolean)
      .sort((a, b) => b!.amount - a!.amount)
      .slice(0, 10) as { program: string; amount: number; payments: number }[]
    const yd = yearly.find(y => y.year === selectedYear)
    return { year: selectedYear, total: yd?.amount || 0, payments: yd?.payments || 0, topPrograms }
  }, [selectedYear, programYearly, yearly])

  return (
    <div>
      {/* Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Farm Subsidy Spending (2017–2025)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} onClick={(e) => { if (e?.activeLabel) setSelectedYear(+e.activeLabel) }}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#15803d" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#15803d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={fmtMoney} />
              <Tooltip formatter={(v: number) => fmtMoney(v)} labelFormatter={(l) => `Year ${l}`} />
              <Area type="monotone" dataKey="amount" stroke="#15803d" fill="url(#colorAmount)" strokeWidth={2} name="Total Spending" />
              {EVENTS.map(e => (
                <ReferenceLine key={e.year} x={e.year} stroke={e.color} strokeDasharray="3 3" label={{ value: e.label, position: 'top', fontSize: 10, fill: e.color }} />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-gray-400 mt-2">Click a year on the chart to see the breakdown below.</p>
      </div>

      {/* Year Breakdown */}
      {yearBreakdown && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">{yearBreakdown.year} Breakdown</h3>
            <button onClick={() => setSelectedYear(null)} className="text-xs text-gray-400 hover:text-gray-600">✕ Close</button>
          </div>
          <div className="flex gap-6 mb-4">
            <div>
              <div className="text-2xl font-bold text-[#15803d]">{fmtMoney(yearBreakdown.total)}</div>
              <div className="text-xs text-gray-500">total spending</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-700">{yearBreakdown.payments.toLocaleString()}</div>
              <div className="text-xs text-gray-500">payments</div>
            </div>
          </div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Top Programs</h4>
          <div className="space-y-2">
            {yearBreakdown.topPrograms.map((p, i) => (
              <div key={p.program} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-5 text-right">{i + 1}.</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{formatProgram(p.program)}</div>
                </div>
                <span className="text-sm font-bold text-[#15803d] whitespace-nowrap">{fmtMoney(p.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Event annotations */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {EVENTS.map(e => (
          <button
            key={e.year}
            onClick={() => setSelectedYear(e.year)}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 text-left hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: e.color }} />
              <span className="font-bold text-gray-900">{e.label}</span>
            </div>
            <p className="text-xs text-gray-500">
              {e.year === 2018 && 'Trade tensions led to the Market Facilitation Program, compensating farmers for lost export markets.'}
              {e.year === 2019 && 'MFP payments peaked at $14.5B as the trade war with China continued.'}
              {e.year === 2020 && 'COVID-19 triggered CFAP rounds totaling over $23B in direct payments to farmers.'}
              {e.year === 2022 && 'Emergency Relief Program addressed crop losses from natural disasters in prior years.'}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
