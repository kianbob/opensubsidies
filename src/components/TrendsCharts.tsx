// @ts-nocheck
'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

type YearData = { year: number; payments: number; amount: number }

function fmtMoney(n: number): string {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(0) + 'M'
  return '$' + n.toLocaleString()
}

export default function TrendsCharts({ yearly }: { yearly: YearData[] }) {
  // Filter to complete years with meaningful data (exclude 2025 partial)
  const data = yearly.filter(y => y.year >= 2017 && y.year <= 2024 && y.amount > 100000).map(y => ({
    ...y,
    amountB: y.amount / 1e9,
  }))

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold mb-4">Total Farm Subsidy Spending by Year</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(v: number) => `$${v.toFixed(0)}B`} />
              <Tooltip formatter={(v: number) => fmtMoney(v * 1e9)} labelFormatter={(l: number) => `Year: ${l}`} />
              <Line type="monotone" dataKey="amountB" stroke="#15803d" strokeWidth={2.5} dot={{ r: 3 }} name="Spending" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold mb-4">Number of Payments by Year</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(v: number) => v.toLocaleString()} labelFormatter={(l: number) => `Year: ${l}`} />
              <Bar dataKey="payments" fill="#15803d" opacity={0.8} name="Payments" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
