// @ts-nocheck
'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

function fmtMoney(n: number) {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M'
  return '$' + n.toLocaleString()
}

export default function ProgramsChart({ data }: { data: { name: string; amount: number }[] }) {
  // Truncate labels for mobile
  const chartData = data.map(d => ({
    ...d,
    label: d.name.length > 25 ? d.name.slice(0, 25) + '…' : d.name,
  }))

  return (
    <div className="w-full h-[450px] overflow-x-auto">
      <div className="min-w-[500px] h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 20, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={(v) => `$${(v / 1e9).toFixed(0)}B`} />
            <YAxis type="category" dataKey="label" width={160} tick={{ fontSize: 11 }} />
            <Tooltip 
              formatter={(v: number) => [fmtMoney(v), 'Total Subsidies']}
              labelFormatter={(l) => {
                const item = data.find(d => d.name.startsWith(l.replace('…', '')))
                return item ? item.name : l
              }}
            />
            <Bar dataKey="amount" fill="#15803d" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
