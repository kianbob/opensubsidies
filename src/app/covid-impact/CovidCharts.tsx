// @ts-nocheck
'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine, Cell } from 'recharts'

function fmtMoney(n: number) {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(0) + 'M'
  return '$' + n.toLocaleString()
}

export default function CovidCharts({ data }: { data: { year: number; amount: number; payments: number }[] }) {
  const chartData = data.map(d => ({
    year: d.year.toString(),
    amount: d.amount,
    isCovid: d.year >= 2020,
  }))

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Annual Farm Subsidy Spending</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ left: 10, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={v => `$${(v/1e9).toFixed(0)}B`} />
            <Tooltip formatter={(v: number) => [fmtMoney(v), 'Spending']} />
            <ReferenceLine x="2020" stroke="#dc2626" strokeDasharray="4 4" label={{ value: 'COVID', position: 'top', fill: '#dc2626', fontSize: 12 }} />
            <Bar dataKey="amount" radius={[4,4,0,0]}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.isCovid ? '#dc2626' : '#15803d'} fillOpacity={entry.isCovid ? 0.8 : 0.9} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-700" />
          <span>Pre-COVID</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-600" />
          <span>Post-COVID</span>
        </div>
      </div>
    </div>
  )
}
