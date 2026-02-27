// @ts-nocheck
'use client'
import { useState } from 'react'
import Link from 'next/link'

type County = { state: string; stateName: string; county: string; fips: string; payments: number; amount: number }
type RankingTab = 'total' | 'payments' | 'average'

function fmtMoney(n: number): string {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M'
  if (Math.abs(n) >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K'
  return '$' + n.toFixed(0)
}

function fmt(n: number) { return n.toLocaleString() }

const tabs: { key: RankingTab; label: string }[] = [
  { key: 'total', label: 'Total Subsidies' },
  { key: 'payments', label: '# of Payments' },
  { key: 'average', label: 'Avg Payment' },
]

export default function CountyRankingsClient({ counties }: { counties: County[] }) {
  const [tab, setTab] = useState<RankingTab>('total')
  const [query, setQuery] = useState('')

  const ranked = [...counties]
    .map(c => ({ ...c, avg: c.payments > 0 ? c.amount / c.payments : 0 }))
    .filter(c => !query || c.county.toLowerCase().includes(query.toLowerCase()) || c.stateName.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (tab === 'total') return b.amount - a.amount
      if (tab === 'payments') return b.payments - a.payments
      return b.avg - a.avg
    })

  function getValue(c: typeof ranked[0]) {
    if (tab === 'total') return fmtMoney(c.amount)
    if (tab === 'payments') return fmt(c.payments)
    return fmtMoney(c.avg)
  }

  function getLabel() {
    if (tab === 'total') return 'Total'
    if (tab === 'payments') return 'Payments'
    return 'Avg Payment'
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t.key ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <input
        type="text" placeholder="Search counties..." value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full max-w-md mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
      />

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold w-12">#</th>
              <th className="px-4 py-3 text-left font-semibold">County</th>
              <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">State</th>
              <th className="px-4 py-3 text-right font-semibold">{getLabel()}</th>
              <th className="px-4 py-3 text-right font-semibold hidden md:table-cell">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ranked.slice(0, 200).map((c, i) => (
              <tr key={c.fips} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500 font-mono">{i + 1}</td>
                <td className="px-4 py-3">
                  <Link href={`/counties/${c.fips}`} className="text-primary hover:underline font-medium">{c.county}</Link>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <Link href={`/states/${c.state.toLowerCase()}`} className="text-gray-600 hover:underline">{c.stateName}</Link>
                </td>
                <td className="px-4 py-3 text-right font-mono font-medium">{getValue(c)}</td>
                <td className="px-4 py-3 text-right hidden md:table-cell text-gray-500">{fmtMoney(c.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {ranked.length > 200 && <p className="text-sm text-gray-500 mt-4">Showing 200 of {fmt(ranked.length)} results. Use search to narrow down.</p>}
    </div>
  )
}
