// @ts-nocheck
'use client'

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'

const COLORS = ['#15803d', '#16a34a', '#22c55e', '#4ade80', '#86efac', '#166534', '#14532d', '#bbf7d0', '#dcfce7', '#059669']

export function YearlyTrendChart({ data }: { data: { year: number; amount: number }[] }) {
  const filtered = data.filter(d => d.year >= 2017 && d.year <= 2024)
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={filtered} margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis tickFormatter={(v) => `$${(v / 1e9).toFixed(1)}B`} />
          <Tooltip formatter={(v: number) => [`$${(v / 1e9).toFixed(2)}B`, 'Amount']} />
          <Line type="monotone" dataKey="amount" stroke="#15803d" strokeWidth={2} dot={{ r: 4, fill: '#15803d' }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function TopStatesBarChart({ data }: { data: { name: string; amount: number }[] }) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis tickFormatter={(v) => `$${(v / 1e9).toFixed(1)}B`} />
          <Tooltip formatter={(v: number) => [`$${(v / 1e9).toFixed(2)}B`, 'Amount']} />
          <Bar dataKey="amount" fill="#15803d" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function TopProgramsPieChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={100} innerRadius={40} dataKey="value" nameKey="name" label={({ name, percent }) => `${name.length > 18 ? name.slice(0, 18) + '…' : name} ${(percent * 100).toFixed(0)}%`} labelLine={true}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(v: number) => [`$${(v / 1e9).toFixed(2)}B`, 'Amount']} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
