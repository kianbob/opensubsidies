// @ts-nocheck
'use client'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#15803d', '#ca8a04', '#dc2626', '#6366f1', '#ec4899', '#06b6d4', '#f97316', '#8b5cf6']

interface EntityType {
  type: string
  count: number
  amount: number
  topRecipient: string
  topAmount: number
}

export default function EntityTypesClient({ data }: { data: EntityType[] }) {
  const totalAmount = data.reduce((s, d) => s + d.amount, 0)
  const pieData = data.map(d => ({ name: d.type, value: d.amount }))
  const barData = data.map(d => ({ name: d.type, count: d.count }))

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8 my-8">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2">By Total Amount</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart margin={{ top: 20, bottom: 20, left: 20, right: 20 }}>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name.length > 15 ? name.slice(0, 15) + '…' : name} ${(percent * 100).toFixed(0)}%`} labelLine={true}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `$${(v / 1e9).toFixed(1)}B`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2">By Recipient Count</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barData} layout="vertical" margin={{ left: 120 }}>
              <XAxis type="number" tickFormatter={v => `${(v / 1e6).toFixed(1)}M`} />
              <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => v.toLocaleString()} />
              <Bar dataKey="count" fill="#15803d" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto my-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-semibold">Entity Type</th>
              <th className="text-right py-3 px-2 font-semibold">Recipients</th>
              <th className="text-right py-3 px-2 font-semibold">Total</th>
              <th className="text-right py-3 px-2 font-semibold">Avg Payment</th>
              <th className="text-left py-3 px-2 font-semibold">Top Recipient</th>
            </tr>
          </thead>
          <tbody>
            {data.map(d => (
              <tr key={d.type} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2 font-medium">{d.type}</td>
                <td className="text-right py-3 px-2">{d.count.toLocaleString()}</td>
                <td className="text-right py-3 px-2">${(d.amount / 1e9).toFixed(1)}B</td>
                <td className="text-right py-3 px-2">${Math.round(d.amount / d.count).toLocaleString()}</td>
                <td className="py-3 px-2 text-gray-600">{d.topRecipient}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Callout */}
      <div className="bg-amber-50 border-l-4 border-[#ca8a04] rounded-lg p-6 my-8">
        <h3 className="text-lg font-bold text-gray-900">Key Insight: Corporate &amp; LLC Share</h3>
        <p className="text-gray-700 mt-2">
          Corporations, LLCs, and partnerships make up just {((data.filter(d => ['Corporation/LLC', 'Partnership'].includes(d.type)).reduce((s, d) => s + d.count, 0) / data.reduce((s, d) => s + d.count, 0)) * 100).toFixed(0)}% of recipients
          but collect <strong>{((data.filter(d => ['Corporation/LLC', 'Partnership'].includes(d.type)).reduce((s, d) => s + d.amount, 0) / totalAmount) * 100).toFixed(0)}%</strong> of all subsidy dollars.
          Their average payment is {Math.round(data.filter(d => ['Corporation/LLC', 'Partnership'].includes(d.type)).reduce((s, d) => s + d.amount, 0) / data.filter(d => ['Corporation/LLC', 'Partnership'].includes(d.type)).reduce((s, d) => s + d.count, 0) / (data.find(d => d.type === 'Individual')!.amount / data.find(d => d.type === 'Individual')!.count)).toFixed(1)}x the individual farmer average.
        </p>
      </div>
    </div>
  )
}
