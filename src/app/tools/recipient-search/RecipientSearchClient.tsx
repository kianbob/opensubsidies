'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { titleCase, fmtMoney } from '@/lib/utils'

type Recipient = {
  slug: string
  name: string
  state: string
  city: string
  amount: number
  payments: number
  programs?: number
}

export default function RecipientSearchClient() {
  const [recipients, setRecipients] = useState<Recipient[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/recipient-index.json')
      .then(r => r.json())
      .then((data: Recipient[]) => {
        setRecipients(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const [debouncedQuery, setDebouncedQuery] = useState('')
  const handleChange = useCallback((val: string) => {
    setQuery(val)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 200)
    return () => clearTimeout(t)
  }, [query])

  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase()
    if (q.length < 2) return []
    return recipients
      .filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.state.toLowerCase() === q
      )
      .slice(0, 50)
  }, [debouncedQuery, recipients])

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
        <label htmlFor="recipient-search" className="block text-sm font-medium text-gray-700 mb-2">
          Search by name, farm, or city
        </label>
        <input
          id="recipient-search"
          type="text"
          value={query}
          onChange={e => handleChange(e.target.value)}
          placeholder="e.g. Smith Farms, Bryant, Tulare"
          className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-[#15803d] focus:ring-2 focus:ring-[#15803d]/20 outline-none"
          autoComplete="off"
        />
        <p className="text-xs text-gray-400 mt-2">
          {loading
            ? 'Loading recipients…'
            : `Searching ${recipients.length.toLocaleString()} top recipients. Type at least 2 characters.`}
        </p>
      </div>

      {debouncedQuery.trim().length >= 2 && !loading && (
        <div className="mb-4 text-sm text-gray-500">
          {results.length === 0
            ? 'No matches found.'
            : `Showing ${results.length}${results.length === 50 ? '+' : ''} results`}
        </div>
      )}

      <div className="space-y-3">
        {results.map(r => (
          <Link
            key={r.slug}
            href={`/recipients/${r.slug}`}
            className="block bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md hover:border-[#15803d]/30 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-bold text-gray-900 text-base truncate">
                  {titleCase(r.name)}
                </h3>
                <p className="text-sm text-gray-500">
                  {titleCase(r.city)}, {r.state}
                  {' · '}{r.payments.toLocaleString()} payments
                  {r.programs != null && <> · {r.programs} program{r.programs !== 1 ? 's' : ''}</>}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-lg font-bold text-[#15803d]">{fmtMoney(r.amount)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
