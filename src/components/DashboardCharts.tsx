// @ts-nocheck
'use client'

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'

const COLORS = ['#15803d', '#16a34a', '#22c55e', '#4ade80', '#86efac', '#166534', '#14532d', '#bbf7d0', '#dcfce7', '#059669']

export function YearlyTrendChart({ data }: { data: { year: number; amount: number }[] }) {
  const filtered = data.filter(d => d.year >= 2017 && d.year <= 2025).map(d => ({
    ...d, label: d.year === 2025 ? '2025*' : String(d.year)
  }))
  return (
    <div>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filtered} margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis tickFormatter={(v) => `$${(v / 1e9).toFixed(1)}B`} />
            <Tooltip formatter={(v: number) => [`$${(v / 1e9).toFixed(2)}B`, 'Amount']} />
            <Line type="monotone" dataKey="amount" stroke="#15803d" strokeWidth={2} dot={{ r: 4, fill: '#15803d' }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-gray-400 mt-1">* 2025 is partial year data</p>
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
        <PieChart margin={{ top: 20, bottom: 20, left: 20, right: 20 }}>
          <Pie data={data} cx="50%" cy="50%" outerRadius={80} innerRadius={30} dataKey="value" nameKey="name" label={({ name, percent }) => `${name.length > 16 ? name.slice(0, 16) + '…' : name} ${(percent * 100).toFixed(0)}%`} labelLine={true}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(v: number) => [`$${(v / 1e9).toFixed(2)}B`, 'Amount']} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
