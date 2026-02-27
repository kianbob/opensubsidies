// @ts-nocheck
'use client'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

type YearData = { year: number; payments: number; amount: number }

function fmtMoney(n: number): string {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(0) + 'M'
  return '$' + n.toLocaleString()
}

const events = [
  { year: 2018, label: '🌐 Trade War', color: '#f59e0b' },
  { year: 2020, label: '🦠 COVID-19', color: '#ef4444' },
  { year: 2022, label: '🌪️ Disasters', color: '#8b5cf6' },
]

export default function SpendingTimeline({ yearly }: { yearly: YearData[] }) {
  const data = yearly
    .filter(y => y.year >= 2017 && y.year <= 2025)
    .map(y => ({ ...y, amountB: y.amount / 1e9 }))

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold mb-1">Farm Subsidy Spending Timeline</h3>
      <p className="text-sm text-gray-500 mb-4">2017–2025 · Key policy events marked</p>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(v: number) => `$${v.toFixed(0)}B`} />
            <Tooltip
              formatter={(v: number) => [fmtMoney(v * 1e9), 'Total Spending']}
              labelFormatter={(l: number) => `Year: ${l}`}
            />
            {events.map(e => (
              <ReferenceLine key={e.year} x={e.year} stroke={e.color} strokeDasharray="3 3" label={{ value: e.label, position: 'top', fontSize: 12 }} />
            ))}
            <Area type="monotone" dataKey="amountB" stroke="#16a34a" fillOpacity={1} fill="url(#colorAmount)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
