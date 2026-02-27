// @ts-nocheck
'use client'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const COLORS = ['#15803d', '#ca8a04', '#dc2626', '#6366f1', '#ec4899', '#06b6d4', '#f97316', '#8b5cf6', '#14b8a6']

interface TaxpayerData {
  total: number
  years: number
  perTaxpayer: number
  perTaxpayerPerYear: number
  perHousehold: number
  perHouseholdPerYear: number
  comparisons: { label: string; count: number; unit: string }[]
  federalComparisons: { label: string; amount: number }[]
}

export default function TaxpayerCalculatorClient({ data }: { data: TaxpayerData }) {
  const [income, setIncome] = useState('')

  // Simple effective federal tax rate estimation
  function effectiveRate(inc: number) {
    if (inc <= 11000) return 0.10
    if (inc <= 44725) return 0.12
    if (inc <= 95375) return 0.15
    if (inc <= 182100) return 0.18
    if (inc <= 231250) return 0.22
    return 0.26
  }

  const incomeNum = parseFloat(income.replace(/[,$]/g, '')) || 0
  const rate = effectiveRate(incomeNum)
  const totalTax = incomeNum * rate
  // Farm subsidies are ~0.4% of federal budget
  const farmShare = totalTax * 0.004
  const farmShareTotal = farmShare * data.years

  const chartData = data.federalComparisons.map(c => ({
    name: c.label,
    amount: c.amount / 1e9,
  }))

  return (
    <div>
      {/* Key stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        {[
          { label: 'Per Taxpayer (9 yrs)', value: `$${data.perTaxpayer}` },
          { label: 'Per Taxpayer/Year', value: `$${data.perTaxpayerPerYear}` },
          { label: 'Per Household (9 yrs)', value: `$${data.perHousehold.toLocaleString()}` },
          { label: 'Per Household/Year', value: `$${data.perHouseholdPerYear}` },
        ].map(s => (
          <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#15803d]">{s.value}</div>
            <div className="text-sm text-gray-600">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Calculator */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-heading)]">Calculate Your Share</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Your annual income</label>
            <input
              type="text"
              placeholder="$75,000"
              value={income}
              onChange={e => setIncome(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          {incomeNum > 0 && (
            <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm text-gray-500">Est. effective tax rate: {(rate * 100).toFixed(0)}%</div>
              <div className="text-sm text-gray-500">Est. federal tax: ${totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              <div className="text-2xl font-bold text-[#15803d] mt-2">${farmShareTotal.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Your estimated share of farm subsidies over 9 years</div>
              <div className="text-lg font-semibold text-gray-900 mt-1">${farmShare.toFixed(2)}/year</div>
            </div>
          )}
        </div>
      </div>

      {/* Federal spending comparison chart */}
      <h2 className="text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-heading)]">Farm Subsidies vs. Other Federal Spending (Annual)</h2>
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 140, right: 20 }}>
            <XAxis type="number" tickFormatter={v => `$${v}B`} />
            <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v: number) => [`$${v.toFixed(1)}B`, 'Annual']} />
            <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* What $147B could buy */}
      <h2 className="text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-heading)]">What $147 Billion Could Buy Instead</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.comparisons.map(c => (
          <div key={c.label} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 text-center">
            <div className="text-3xl font-bold text-[#15803d]">{c.count.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mt-1">{c.unit}</div>
            <div className="text-xs text-gray-400 mt-1">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
