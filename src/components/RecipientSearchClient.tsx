// @ts-nocheck
'use client'
import { formatProgram } from '@/lib/format-program'
import { useState, useMemo } from 'react'

type Recipient = {
  name: string
  state: string
  city: string
  amount: number
  payments: number
  topPrograms: { program: string; amount: number }[]
}

function fmtMoney(n: number): string {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M'
  if (Math.abs(n) >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K'
  return '$' + n.toFixed(0)
}

export default function RecipientSearchClient({ recipients }: { recipients: Recipient[] }) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return []
    return recipients.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.city.toLowerCase().includes(q)
    ).slice(0, 50)
  }, [query, recipients])

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Search by name, farm, or city</label>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="e.g. Smith, Jones Dairy, or Tulare"
          className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
        />
        <p className="text-xs text-gray-400 mt-2">
          Searching {recipients.length.toLocaleString()} top recipients. Type at least 2 characters.
        </p>
      </div>

      {query.trim().length >= 2 && (
        <div className="mb-4 text-sm text-gray-500">
          {results.length === 0 ? 'No matches found.' : `Showing ${results.length}${results.length === 50 ? '+' : ''} results`}
        </div>
      )}

      <div className="space-y-3">
        {results.map((r, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-bold text-gray-900 text-base truncate">{r.name}</h3>
                <p className="text-sm text-gray-500">{r.city}, {r.state} · {r.payments} payments</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-lg font-bold text-primary">{fmtMoney(r.amount)}</p>
              </div>
            </div>
            {r.topPrograms && r.topPrograms.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-50">
                <p className="text-xs text-gray-400 mb-1">Top Program</p>
                <p className="text-sm text-gray-700">{formatProgram(r.topPrograms[0].program)} — {fmtMoney(r.topPrograms[0].amount)}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
