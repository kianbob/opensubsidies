// @ts-nocheck
'use client'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface DistData {
  buckets: { range: string; count: number; amount: number }[]
  median: number
  average: number
  totalPayments: number
  totalAmount: number
}

export default function DistributionClient({ data }: { data: DistData }) {
  const [view, setView] = useState<'count' | 'amount'>('count')

  const chartData = data.buckets.map(b => ({
    range: b.range,
    value: view === 'count' ? b.count : b.amount,
  }))

  return (
    <div>
      {/* Key stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        {[
          { label: 'Median Payment', value: `$${data.median.toLocaleString()}` },
          { label: 'Average Payment', value: `$${data.average.toLocaleString()}` },
          { label: 'Avg/Median Ratio', value: `${(data.average / data.median).toFixed(1)}x` },
          { label: 'Total Payments', value: `${(data.totalPayments / 1e6).toFixed(1)}M` },
        ].map(s => (
          <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#15803d]">{s.value}</div>
            <div className="text-sm text-gray-600">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Toggle */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => setView('count')} className={`px-4 py-2 rounded-lg text-sm font-medium ${view === 'count' ? 'bg-[#15803d] text-white' : 'bg-gray-100 text-gray-700'}`}>
          By Payment Count
        </button>
        <button onClick={() => setView('amount')} className={`px-4 py-2 rounded-lg text-sm font-medium ${view === 'amount' ? 'bg-[#15803d] text-white' : 'bg-gray-100 text-gray-700'}`}>
          By Total Amount
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <XAxis dataKey="range" tick={{ fontSize: 11 }} angle={-30} textAnchor="end" height={60} />
            <YAxis tickFormatter={v => view === 'count' ? `${(v / 1e6).toFixed(1)}M` : `$${(v / 1e9).toFixed(0)}B`} />
            <Tooltip formatter={(v: number) => view === 'count' ? v.toLocaleString() + ' payments' : '$' + (v / 1e9).toFixed(1) + 'B'} />
            <Bar dataKey="value" fill={view === 'count' ? '#15803d' : '#ca8a04'} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-500 text-center mt-2">
          {view === 'count' ? 'Most payments are small — the $1K-$5K bucket has the most payments' : 'Most dollars go to larger payments — the $10K-$50K bucket dominates total spending'}
        </p>
      </div>
    </div>
  )
}
