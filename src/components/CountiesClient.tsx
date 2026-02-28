// @ts-nocheck
'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

type County = { state: string; stateName: string; county: string; fips: string; payments: number; amount: number }
type SortKey = 'county' | 'stateName' | 'payments' | 'amount'

function fmt(n: number) { return n.toLocaleString() }
function fmtMoney(n: number) {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M'
  if (Math.abs(n) >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K'
  return '$' + n.toFixed(0)
}

export default function CountiesClient({ counties }: { counties: County[] }) {
  const [query, setQuery] = useState('')
  const [stateFilter, setStateFilter] = useState('')
  const [sortBy, setSortBy] = useState<SortKey>('amount')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const states = useMemo(() => {
    const s = new Set(counties.map(c => c.stateName))
    return [...s].sort()
  }, [counties])

  const filtered = useMemo(() => {
    let list = counties.filter(c => {
      if (stateFilter && c.stateName !== stateFilter) return false
      if (query) {
        const q = query.toLowerCase()
        return c.county.toLowerCase().includes(q) || c.stateName.toLowerCase().includes(q)
      }
      return true
    })
    list = [...list].sort((a, b) => {
      const mul = sortDir === 'desc' ? -1 : 1
      if (sortBy === 'county' || sortBy === 'stateName') return mul * a[sortBy].localeCompare(b[sortBy])
      return mul * (a[sortBy] - b[sortBy])
    })
    return list
  }, [counties, query, stateFilter, sortBy, sortDir])

  function toggleSort(key: SortKey) {
    if (sortBy === key) setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    else { setSortBy(key); setSortDir(key === 'county' || key === 'stateName' ? 'asc' : 'desc') }
  }

  const arrow = (key: SortKey) => sortBy === key ? (sortDir === 'desc' ? ' ↓' : ' ↑') : ''

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search counties..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm w-56 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <select
          value={stateFilter}
          onChange={e => setStateFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">All States</option>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <div className="flex gap-1">
          {([['amount', 'Amount'], ['payments', 'Payments'], ['county', 'County'], ['stateName', 'State']] as [SortKey, string][]).map(([key, label]) => (
            <button key={key} onClick={() => toggleSort(key)}
              className={`px-3 py-2 text-sm rounded-lg font-medium ${sortBy === key ? 'bg-[#15803d] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {label}{arrow(key)}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-400 self-center">{filtered.length > 200 ? '200+' : filtered.length} counties</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-green-700 text-left">
              <th className="py-2 pr-4">#</th>
              <th className="py-2 pr-4 cursor-pointer select-none" onClick={() => toggleSort('county')}>County{arrow('county')}</th>
              <th className="py-2 pr-4 cursor-pointer select-none" onClick={() => toggleSort('stateName')}>State{arrow('stateName')}</th>
              <th className="py-2 pr-4 text-right cursor-pointer select-none" onClick={() => toggleSort('payments')}>Payments{arrow('payments')}</th>
              <th className="py-2 text-right cursor-pointer select-none" onClick={() => toggleSort('amount')}>Amount{arrow('amount')}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 200).map((c, i) => (
              <tr key={c.fips} className="border-b border-gray-200 hover:bg-green-50">
                <td className="py-2 pr-4 text-gray-500">{i + 1}</td>
                <td className="py-2 pr-4 font-medium"><Link href={`/counties/${c.fips}`} className="text-green-700 hover:underline">{c.county}</Link></td>
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
      {filtered.length > 200 && <p className="text-sm text-gray-500 mt-4">Showing 200 of {fmt(filtered.length)} results. Use search or state filter to narrow down.</p>}
    </>
  )
}
