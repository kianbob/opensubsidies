// @ts-nocheck
'use client'

import { useState } from 'react'
import Link from 'next/link'

type County = { state: string; stateName: string; county: string; fips: string; payments: number; amount: number }

function fmt(n: number) { return n.toLocaleString() }
function fmtMoney(n: number) {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M'
  if (Math.abs(n) >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K'
  return '$' + n.toFixed(0)
}

export default function CountiesClient({ counties }: { counties: County[] }) {
  const [query, setQuery] = useState('')
  const filtered = query
    ? counties.filter(c => c.county.toLowerCase().includes(query.toLowerCase()) || c.stateName.toLowerCase().includes(query.toLowerCase()))
    : counties.slice(0, 500)

  return (
    <>
      <input
        type="text"
        placeholder="Search counties..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full max-w-md mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-green-700 text-left">
              <th className="py-2 pr-4">#</th>
              <th className="py-2 pr-4">County</th>
              <th className="py-2 pr-4">State</th>
              <th className="py-2 pr-4 text-right">Payments</th>
              <th className="py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 200).map((c, i) => (
              <tr key={c.fips} className="border-b border-gray-200 hover:bg-green-50">
                <td className="py-2 pr-4 text-gray-500">{i + 1}</td>
                <td className="py-2 pr-4 font-medium">{c.county}</td>
                <td className="py-2 pr-4">
                  <Link href={`/states/${c.state.toLowerCase()}`} className="text-green-700 hover:underline">{c.stateName}</Link>
                </td>
                <td className="py-2 pr-4 text-right tabular-nums">{fmt(c.payments)}</td>
                <td className="py-2 text-right tabular-nums font-medium">{fmtMoney(c.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length > 200 && <p className="text-sm text-gray-500 mt-4">Showing 200 of {fmt(filtered.length)} results. Refine your search to see more.</p>}
    </>
  )
}
