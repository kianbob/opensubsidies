// @ts-nocheck
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const data = [
  { year: '2017', normal: 6.35, emergency: 0 },
  { year: '2018', normal: 10.33, emergency: 4.9 },
  { year: '2019', normal: 10.22, emergency: 13.5 },
  { year: '2020', normal: 8.85, emergency: 29.9 },
  { year: '2021', normal: 4.56, emergency: 4.63 },
  { year: '2022', normal: 2.95, emergency: 4.21 },
  { year: '2023', normal: 4.01, emergency: 5.08 },
  { year: '2024', normal: 5.33, emergency: 11.66 },
  { year: '2025', normal: 1.1, emergency: 1.32 },
]

function fmt(v: number) {
  return `$${v.toFixed(1)}B`
}

export default function EmergencySpendingChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Regular vs Emergency Spending by Year</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="year" />
          <YAxis tickFormatter={v => `$${v}B`} />
          <Tooltip formatter={(v: number) => fmt(v)} />
          <Legend />
          <Bar dataKey="normal" name="Regular Programs" fill="#3b82f6" stackId="a" />
          <Bar dataKey="emergency" name="Emergency/Trade/COVID" fill="#ef4444" stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
