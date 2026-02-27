// @ts-nocheck
'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts'
import { formatProgram } from '@/lib/format-program'

function fmtMoney(n: number) {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M'
  if (Math.abs(n) >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K'
  return '$' + n.toFixed(0)
}

const COLORS = ['#15803d', '#22c55e', '#86efac', '#166534', '#4ade80', '#bbf7d0', '#14532d', '#a3e635']

export function YearlyChart({ data }: { data: { year: number; amount: number }[] }) {
  return (
    <div className="bg-white rounded-xl border p-4">
      <h3 className="font-semibold mb-3">Yearly Subsidy Payments</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
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

export function ProgramPieChart({ data }: { data: { program: string; amount: number }[] }) {
  const pieData = data.slice(0, 8).map(d => ({ name: formatProgram(d.program), value: d.amount }))
  return (
    <div className="bg-white rounded-xl border p-4">
      <h3 className="font-semibold mb-3">Subsidies by Program</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name.length > 20 ? name.slice(0, 20) + '…' : name} ${(percent * 100).toFixed(0)}%`}>
            {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(v: number) => fmtMoney(v)} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
