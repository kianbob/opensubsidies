// @ts-nocheck
'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { fmt, fmtMoney, formatProgram, titleCase, slugify } from '@/lib/utils'

type Recipient = { name: string; state: string; city: string; amount: number; payments: number; topPrograms: { program: string; amount: number }[] }
type SortKey = 'name' | 'amount' | 'payments' | 'state'

export default function RecipientsTableClient({ recipients }: { recipients: Recipient[] }) {
  const [sortBy, setSortBy] = useState<SortKey>('amount')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [search, setSearch] = useState('')
  const [stateFilter, setStateFilter] = useState('')

  const states = useMemo(() => {
    const s = new Set(recipients.map(r => r.state))
    return [...s].sort()
  }, [recipients])

  const sorted = useMemo(() => {
    let list = recipients.filter(r => {
      if (stateFilter && r.state !== stateFilter) return false
      if (search) {
        const q = search.toLowerCase()
        return r.name.toLowerCase().includes(q) || r.city.toLowerCase().includes(q)
      }
      return true
    })
    list = [...list].sort((a, b) => {
      const mul = sortDir === 'desc' ? -1 : 1
      if (sortBy === 'name') return mul * a.name.localeCompare(b.name)
      if (sortBy === 'state') return mul * a.state.localeCompare(b.state)
      return mul * (a[sortBy] - b[sortBy])
    })
    return list
  }, [recipients, sortBy, sortDir, search, stateFilter])

  function toggleSort(key: SortKey) {
    if (sortBy === key) setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    else { setSortBy(key); setSortDir(key === 'name' || key === 'state' ? 'asc' : 'desc') }
  }

  const arrow = (key: SortKey) => sortBy === key ? (sortDir === 'desc' ? ' ↓' : ' ↑') : ''

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search recipients..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm w-56 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select
          value={stateFilter}
          onChange={e => setStateFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All States</option>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <div className="flex gap-1">
          {([['amount', 'Amount'], ['payments', 'Payments'], ['name', 'Name'], ['state', 'State']] as [SortKey, string][]).map(([key, label]) => (
            <button key={key} onClick={() => toggleSort(key)}
              className={`px-3 py-2 text-sm rounded-lg font-medium ${sortBy === key ? 'bg-[#15803d] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {label}{arrow(key)}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-400 self-center">{sorted.length} recipients</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-green-700 text-left">
              <th className="py-2 pr-4">#</th>
              <th className="py-2 pr-4 cursor-pointer select-none" onClick={() => toggleSort('name')}>Recipient{arrow('name')}</th>
              <th className="py-2 pr-4 cursor-pointer select-none" onClick={() => toggleSort('state')}>Location{arrow('state')}</th>
              <th className="py-2 pr-4 text-right cursor-pointer select-none" onClick={() => toggleSort('amount')}>Amount{arrow('amount')}</th>
              <th className="py-2">Top Program</th>
            </tr>
          </thead>
          <tbody>
            {sorted.slice(0, 200).map((r, i) => (
              <tr key={i} className="border-b border-gray-200 hover:bg-green-50">
                <td className="py-2 pr-4 text-gray-500">{i + 1}</td>
                <td className="py-2 pr-4 font-medium"><Link href={`/recipients/${slugify(`${r.name}-${r.city}-${r.state}`)}`} className="text-green-700 hover:underline">{titleCase(r.name)}</Link></td>
                <td className="py-2 pr-4 text-gray-600">{titleCase(r.city)}, {r.state}</td>
                <td className="py-2 pr-4 text-right tabular-nums font-medium">{fmtMoney(r.amount)}</td>
                <td className="py-2 text-xs text-gray-500">{formatProgram(r.topPrograms?.[0]?.program ?? '—')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {sorted.length > 200 && (
          <p className="text-sm text-gray-400 mt-2 text-center">Showing top 200 of {sorted.length} results. Use search or state filter to narrow down.</p>
        )}
      </div>
    </div>
  )
}
