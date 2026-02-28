// @ts-nocheck
'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { fmt, fmtMoney } from '@/lib/utils'

type State = { abbr: string; name: string; payments: number; amount: number }
type SortKey = 'name' | 'payments' | 'amount'

export default function StatesTableClient({ states }: { states: State[] }) {
  const [sortBy, setSortBy] = useState<SortKey>('amount')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [search, setSearch] = useState('')

  const sorted = useMemo(() => {
    let list = states.filter(s =>
      !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.abbr.toLowerCase().includes(search.toLowerCase())
    )
    list = [...list].sort((a, b) => {
      const mul = sortDir === 'desc' ? -1 : 1
      if (sortBy === 'name') return mul * a.name.localeCompare(b.name)
      return mul * (a[sortBy] - b[sortBy])
    })
    return list
  }, [states, sortBy, sortDir, search])

  function toggleSort(key: SortKey) {
    if (sortBy === key) setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    else { setSortBy(key); setSortDir(key === 'name' ? 'asc' : 'desc') }
  }

  const arrow = (key: SortKey) => sortBy === key ? (sortDir === 'desc' ? ' ↓' : ' ↑') : ''

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search states..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="flex gap-1">
          {([['amount', 'Total Amount'], ['payments', 'Payments'], ['name', 'Name']] as [SortKey, string][]).map(([key, label]) => (
            <button key={key} onClick={() => toggleSort(key)}
              className={`px-3 py-2 text-sm rounded-lg font-medium ${sortBy === key ? 'bg-[#15803d] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {label}{arrow(key)}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-400 self-center">{sorted.length} states</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-green-700 text-left">
              <th className="py-2 pr-4">#</th>
              <th className="py-2 pr-4 cursor-pointer select-none" onClick={() => toggleSort('name')}>State{arrow('name')}</th>
              <th className="py-2 pr-4 text-right cursor-pointer select-none" onClick={() => toggleSort('payments')}>Payments{arrow('payments')}</th>
              <th className="py-2 text-right cursor-pointer select-none" onClick={() => toggleSort('amount')}>Total Amount{arrow('amount')}</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s, i) => (
              <tr key={s.abbr} className="border-b border-gray-200 hover:bg-green-50">
                <td className="py-2 pr-4 text-gray-500">{i + 1}</td>
                <td className="py-2 pr-4">
                  <Link href={`/states/${s.abbr.toLowerCase()}`} className="text-green-700 hover:underline font-medium">{s.name}</Link>
                  <span className="text-gray-400 ml-1">({s.abbr})</span>
                </td>
                <td className="py-2 pr-4 text-right tabular-nums">{fmt(s.payments)}</td>
                <td className="py-2 text-right tabular-nums font-medium">{fmtMoney(s.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
