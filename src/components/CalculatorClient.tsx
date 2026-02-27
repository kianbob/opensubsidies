// @ts-nocheck
'use client'
import { useState } from 'react'

type Recipient = { name: string; amount: number }
type State = { abbr: string; name: string; amount: number; payments: number }

function fmtMoney(n: number): string {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M'
  if (Math.abs(n) >= 1e3) return '$' + (n / 1e3).toFixed(1) + 'K'
  return '$' + n.toLocaleString()
}

export default function CalculatorClient({ recipients, states, stats }: {
  recipients: Recipient[]
  states: State[]
  stats: { totalAmount: number; totalPayments: number }
}) {
  const [input, setInput] = useState('')
  const amount = parseFloat(input.replace(/[,$]/g, '')) || 0

  const avgPayment = stats.totalAmount / stats.totalPayments
  const rank = amount > 0 ? recipients.filter(r => r.amount > amount).length + 1 : null
  const topState = states.sort((a, b) => b.amount - a.amount)[0]
  const avgHouseholdIncome = 75149
  const avgTeacherSalary = 69544

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Enter a dollar amount</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">$</span>
          <input
            type="text" value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="e.g. 500,000"
            className="w-full pl-10 pr-4 py-4 text-2xl border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>
      </div>

      {amount > 0 && (
        <div className="space-y-4">
          {rank !== null && (
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-primary">
              <p className="text-sm text-gray-500 mb-1">Recipient Ranking</p>
              <p className="text-xl font-bold">
                {rank <= recipients.length
                  ? <>Your amount would rank <span className="text-primary">#{rank.toLocaleString()}</span> out of {recipients.length.toLocaleString()} top recipients</>
                  : <>Your amount is below all {recipients.length.toLocaleString()} top recipients</>}
              </p>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <p className="text-sm text-gray-500 mb-1">Percentage of Total</p>
            <p className="text-xl font-bold">
              That&apos;s <span className="text-blue-600">{(amount / stats.totalAmount * 100).toFixed(4)}%</span> of all $40B in farm subsidies
            </p>
            <p className="text-sm text-gray-500 mt-1">
              And {(amount / topState.amount * 100).toFixed(2)}% of {topState.name}&apos;s total subsidies
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-amber-500">
            <p className="text-sm text-gray-500 mb-1">Average Payments</p>
            <p className="text-xl font-bold">
              That could fund <span className="text-amber-600">{Math.floor(amount / avgPayment).toLocaleString()}</span> average farm subsidy payments
            </p>
            <p className="text-sm text-gray-500 mt-1">Average payment: {fmtMoney(avgPayment)}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
            <p className="text-sm text-gray-500 mb-1">Real-World Comparisons</p>
            <div className="space-y-2 mt-2">
              <p className="text-lg"><span className="font-bold text-purple-600">{(amount / avgHouseholdIncome).toFixed(1)}×</span> the median U.S. household income (${avgHouseholdIncome.toLocaleString()})</p>
              <p className="text-lg"><span className="font-bold text-purple-600">{(amount / avgTeacherSalary).toFixed(1)}×</span> the average teacher salary (${avgTeacherSalary.toLocaleString()})</p>
              <p className="text-lg"><span className="font-bold text-purple-600">{Math.floor(amount / 12.47).toLocaleString()}</span> hours at the federal minimum wage ($7.25/hr gross → ~$12.47 avg cost)</p>
            </div>
          </div>
        </div>
      )}

      {amount === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-3">🧮</p>
          <p>Enter an amount above to see how it compares to farm subsidies</p>
        </div>
      )}
    </div>
  )
}
