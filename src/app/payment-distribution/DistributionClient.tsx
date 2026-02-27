// @ts-nocheck
'use client'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface Bucket {
  range: string
  count: number
  totalAmount: number
  percentOfRecipients: number
  percentOfAmount: number
}

interface DistData {
  buckets: Bucket[]
  median: number
  average: number
  totalRecipients: number
  totalAmount: number
  note: string
}

function fmtMoney(n: number) {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M'
  if (Math.abs(n) >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K'
  return '$' + n.toFixed(0)
}

export default function DistributionClient({ data }: { data: DistData }) {
  const [view, setView] = useState<'count' | 'amount'>('count')

  const chartData = data.buckets.map(b => ({
    range: b.range,
    value: view === 'count' ? b.count : b.totalAmount,
  }))

  return (
    <div>
      {/* Key stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        {[
          { label: 'Median Total', value: fmtMoney(data.median) },
          { label: 'Average Total', value: fmtMoney(data.average) },
          { label: 'Avg/Median Ratio', value: `${(data.average / data.median).toFixed(1)}x` },
          { label: 'Top Recipients', value: data.totalRecipients?.toLocaleString() || '2,000' },
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
          By Recipient Count
        </button>
        <button onClick={() => setView('amount')} className={`px-4 py-2 rounded-lg text-sm font-medium ${view === 'amount' ? 'bg-[#15803d] text-white' : 'bg-gray-100 text-gray-700'}`}>
          By Total Amount
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <XAxis dataKey="range" tick={{ fontSize: 11 }} angle={-30} textAnchor="end" height={60} />
            <YAxis tickFormatter={v => view === 'count' ? v.toLocaleString() : fmtMoney(v)} />
            <Tooltip formatter={(v: number) => view === 'count' ? v.toLocaleString() + ' recipients' : fmtMoney(v)} />
            <Bar dataKey="value" fill={view === 'count' ? '#15803d' : '#ca8a04'} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-500 text-center mt-2">
          {view === 'count'
            ? 'Most top recipients fall in the $2M–$5M range over 9 years'
            : 'The $2M–$5M bucket accounts for the most total subsidy dollars among top recipients'}
        </p>
      </div>

      {/* Distribution table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Range</th>
              <th className="px-4 py-3 text-right font-semibold">Recipients</th>
              <th className="px-4 py-3 text-right font-semibold">% of Recipients</th>
              <th className="px-4 py-3 text-right font-semibold">Total Amount</th>
              <th className="px-4 py-3 text-right font-semibold">% of Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.buckets.map(b => (
              <tr key={b.range} className="hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{b.range}</td>
                <td className="px-4 py-2 text-right">{b.count.toLocaleString()}</td>
                <td className="px-4 py-2 text-right text-gray-600">{b.percentOfRecipients}%</td>
                <td className="px-4 py-2 text-right font-mono">{fmtMoney(b.totalAmount)}</td>
                <td className="px-4 py-2 text-right text-gray-600">{b.percentOfAmount}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.note && (
        <p className="text-xs text-gray-400 mt-4 italic">{data.note}</p>
      )}
    </div>
  )
}
