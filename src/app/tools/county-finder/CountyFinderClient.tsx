// @ts-nocheck
'use client'
import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'

interface County {
  fips: string
  county: string
  state: string
  stateName?: string
  amount: number
  payments: number
}

function fmtMoney(n: number): string {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M'
  if (Math.abs(n) >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K'
  return '$' + n.toFixed(0)
}

export default function CountyFinderClient() {
  const [counties, setCounties] = useState<County[]>([])
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [selected, setSelected] = useState<County | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/county-index.json')
      .then(r => r.json())
      .then(data => { setCounties(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 200)
    return () => clearTimeout(t)
  }, [query])

  const results = useMemo(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) return []
    const q = debouncedQuery.toLowerCase()
    return counties
      .filter(c => c.county.toLowerCase().includes(q) || (c.stateName || c.state).toLowerCase().includes(q))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 50)
  }, [debouncedQuery, counties])

  return (
    <div className="max-w-2xl mx-auto">
      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder={loading ? 'Loading counties…' : 'Type a county name (e.g. "Tulare" or "Iowa")…'}
          value={query}
          onChange={e => { setQuery(e.target.value); setSelected(null) }}
          disabled={loading}
          className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15803d] focus:border-transparent disabled:opacity-50"
        />
        {query && (
          <button onClick={() => { setQuery(''); setSelected(null) }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl">
            ×
          </button>
        )}
      </div>

      {/* Results */}
      {!selected && results.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-50 max-h-96 overflow-y-auto">
          {results.map(c => (
            <button
              key={`${c.fips}-${c.state}`}
              onClick={() => setSelected(c)}
              className="w-full text-left px-4 py-3 hover:bg-green-50 transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-medium text-gray-900">{c.county}</span>
                <span className="text-gray-500 ml-2 text-sm">{c.stateName || c.state}</span>
              </div>
              <span className="text-sm font-bold text-[#15803d]">{fmtMoney(c.amount)}</span>
            </button>
          ))}
        </div>
      )}

      {!selected && debouncedQuery.length >= 2 && results.length === 0 && !loading && (
        <p className="text-center text-gray-400 py-8">No counties found matching "{debouncedQuery}"</p>
      )}

      {/* Selected County Detail */}
      {selected && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <button onClick={() => setSelected(null)} className="text-sm text-gray-400 hover:text-gray-600 mb-3">← Back to results</button>
          <h2 className="text-2xl font-bold text-gray-900">{selected.county}, {selected.stateName || selected.state}</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-[#15803d]">{fmtMoney(selected.amount)}</div>
              <div className="text-sm text-gray-600">Total Subsidies</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-700">{selected.payments.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Payments</div>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Average payment: <span className="font-bold text-gray-700">{fmtMoney(selected.amount / (selected.payments || 1))}</span>
          </div>
          <div className="mt-4 flex gap-3">
            <Link
              href={`/counties/${selected.fips}`}
              className="inline-flex items-center px-4 py-2 bg-[#15803d] text-white rounded-lg text-sm font-medium hover:bg-[#166534]"
            >
              View Full County Page →
            </Link>
            <Link
              href={`/states/${(selected.stateName || selected.state).toLowerCase().replace(/\s+/g, '-')}`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              View State
            </Link>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!query && !loading && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-500">Search {counties.length.toLocaleString()} counties to find farm subsidy data for your area.</p>
        </div>
      )}
    </div>
  )
}
