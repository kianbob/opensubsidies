// @ts-nocheck
'use client'

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function StateYearlyChart({ data }: { data: { year: number; amount: number }[] }) {
  const filtered = data.filter(d => d.year <= 2024)
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={filtered} margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis tickFormatter={(v) => `$${(v / 1e6).toFixed(0)}M`} />
          <Tooltip formatter={(v: number) => [`$${(v / 1e6).toFixed(1)}M`, 'Amount']} />
          <Line type="monotone" dataKey="amount" stroke="#15803d" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
