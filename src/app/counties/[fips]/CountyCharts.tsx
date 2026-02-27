// @ts-nocheck
'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

function fmtMoney(n: number) {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M'
  if (Math.abs(n) >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K'
  return '$' + n.toFixed(0)
}

export default function CountyYearlyChart({ data }: { data: { year: number; amount: number; payments: number }[] }) {
  const filtered = data.filter(d => d.year <= 2024)
  return (
    <div className="bg-white rounded-xl border p-4">
      <h3 className="font-semibold mb-3">Yearly Subsidy Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={filtered}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis tickFormatter={fmtMoney} width={70} />
          <Tooltip formatter={(v: number) => fmtMoney(v)} />
          <Bar dataKey="amount" fill="#15803d" radius={[4, 4, 0, 0]} name="Subsidies" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
