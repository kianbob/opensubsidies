// @ts-nocheck
'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { fmt, fmtMoney, slugify, formatProgram } from '@/lib/utils'

type Program = { program: string; code: string; payments: number; amount: number }
type SortKey = 'program' | 'payments' | 'amount'

export default function ProgramsTableClient({ programs }: { programs: Program[] }) {
  const [sortBy, setSortBy] = useState<SortKey>('amount')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [search, setSearch] = useState('')

  const sorted = useMemo(() => {
    let list = programs.filter(p =>
      !search || formatProgram(p.program).toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase())
    )
    list = [...list].sort((a, b) => {
      const mul = sortDir === 'desc' ? -1 : 1
      if (sortBy === 'program') return mul * formatProgram(a.program).localeCompare(formatProgram(b.program))
      return mul * (a[sortBy] - b[sortBy])
    })
    return list
  }, [programs, sortBy, sortDir, search])

  function toggleSort(key: SortKey) {
    if (sortBy === key) setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    else { setSortBy(key); setSortDir(key === 'program' ? 'asc' : 'desc') }
  }

  const arrow = (key: SortKey) => sortBy === key ? (sortDir === 'desc' ? ' ↓' : ' ↑') : ''

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search programs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm w-56 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="flex gap-1">
          {([['amount', 'Total Amount'], ['payments', 'Payments'], ['program', 'Name']] as [SortKey, string][]).map(([key, label]) => (
            <button key={key} onClick={() => toggleSort(key)}
              className={`px-3 py-2 text-sm rounded-lg font-medium ${sortBy === key ? 'bg-[#15803d] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {label}{arrow(key)}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-400 self-center">{sorted.length} programs</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-green-700 text-left">
              <th className="py-2 pr-4">#</th>
              <th className="py-2 pr-4 cursor-pointer select-none" onClick={() => toggleSort('program')}>Program{arrow('program')}</th>
              <th className="py-2 pr-4 text-right cursor-pointer select-none" onClick={() => toggleSort('payments')}>Payments{arrow('payments')}</th>
              <th className="py-2 text-right cursor-pointer select-none" onClick={() => toggleSort('amount')}>Amount{arrow('amount')}</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => (
              <tr key={p.code} className="border-b border-gray-200 hover:bg-green-50">
                <td className="py-2 pr-4 text-gray-500">{i + 1}</td>
                <td className="py-2 pr-4"><Link href={`/programs/${slugify(p.program)}`} className="text-primary hover:underline">{formatProgram(p.program)}</Link></td>
                <td className="py-2 pr-4 text-right tabular-nums">{fmt(p.payments)}</td>
                <td className="py-2 text-right tabular-nums font-medium">{fmtMoney(p.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
