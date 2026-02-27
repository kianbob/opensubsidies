// @ts-nocheck
'use client'
import { formatProgram } from '@/lib/format-program'
import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

type State = { abbr: string; name: string; amount: number }
type County = { state: string; stateName: string; county: string; amount: number }
type Program = { program: string; code: string; amount: number }
type Recipient = { name: string; state: string; city: string; amount: number }

function fmtMoney(n: number) {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M'
  if (Math.abs(n) >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K'
  return '$' + n.toFixed(0)
}

export default function SearchClient({ states, counties, programs, recipients }: {
  states: State[]; counties: County[]; programs: Program[]; recipients: Recipient[]
}) {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const q = query.toLowerCase().trim()

  const results = useMemo(() => {
    if (q.length < 2) return null
    return {
      states: states.filter(s => s.name.toLowerCase().includes(q) || s.abbr.toLowerCase().includes(q)).slice(0, 10),
      counties: counties.filter(c => c.county.toLowerCase().includes(q) || c.stateName.toLowerCase().includes(q)).slice(0, 10),
      programs: programs.filter(p => p.program.toLowerCase().includes(q)).slice(0, 10),
      recipients: recipients.filter(r => r.name.toLowerCase().includes(q) || r.city.toLowerCase().includes(q)).slice(0, 20),
    }
  }, [q, states, counties, programs, recipients])

  return (
    <>
      <input
        type="text"
        placeholder="Search states, counties, programs, or recipients..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full max-w-lg mb-8 px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        autoFocus
      />
      {q.length === 0 && (
        <div className="space-y-10">
          {/* Popular Searches */}
          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Popular Searches</h2>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Texas', href: '/states/tx' },
                { label: 'Iowa', href: '/states/ia' },
                { label: 'CRP', query: 'CRP' },
                { label: 'CFAP', query: 'CFAP' },
                { label: 'Conservation', query: 'Conservation' },
                { label: 'Top Recipients', href: '/recipients' },
                { label: 'Emergency Relief', query: 'Emergency' },
              ].map((item) =>
                item.href ? (
                  <Link key={item.label} href={item.href} className="px-4 py-2 bg-green-50 text-green-800 border border-green-200 rounded-full text-sm font-medium hover:bg-green-100 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <button key={item.label} onClick={() => setQuery(item.query!)} className="px-4 py-2 bg-green-50 text-green-800 border border-green-200 rounded-full text-sm font-medium hover:bg-green-100 transition-colors cursor-pointer">
                    {item.label}
                  </button>
                )
              )}
            </div>
          </section>

          {/* Browse by Category */}
          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'States', count: '59', href: '/states', icon: '🗺️' },
                { label: 'Counties', count: '28,875', href: '/counties', icon: '🏘️' },
                { label: 'Programs', count: '157', href: '/programs', icon: '🌾' },
                { label: 'Recipients', count: '5,000', href: '/recipients', icon: '👤' },
              ].map((cat) => (
                <Link key={cat.label} href={cat.href} className="border border-gray-200 rounded-xl p-5 text-center hover:shadow-md hover:border-green-300 transition-all no-underline">
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <div className="font-semibold text-gray-900">{cat.label}</div>
                  <div className="text-sm text-gray-500">{cat.count}</div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}
      {q.length > 0 && q.length < 2 && <p className="text-gray-500">Type at least 2 characters to search...</p>}
      {results && (
        <div className="space-y-8">
          {results.states.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-green-800 mb-2">States</h2>
              {results.states.map(s => (
                <Link key={s.abbr} href={`/states/${s.abbr.toLowerCase()}`} className="block py-2 px-3 hover:bg-green-50 rounded">
                  <span className="font-medium">{s.name}</span> <span className="text-gray-500">({s.abbr})</span> — {fmtMoney(s.amount)}
                </Link>
              ))}
            </section>
          )}
          {results.counties.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-green-800 mb-2">Counties</h2>
              {results.counties.map((c, i) => (
                <Link key={i} href={`/states/${c.state.toLowerCase()}`} className="block py-2 px-3 hover:bg-green-50 rounded">
                  <span className="font-medium">{c.county}</span>, {c.stateName} — {fmtMoney(c.amount)}
                </Link>
              ))}
            </section>
          )}
          {results.programs.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-green-800 mb-2">Programs</h2>
              {results.programs.map(p => (
                <div key={p.code} className="py-2 px-3">
                  <span className="font-medium">{formatProgram(p.program)}</span> — {fmtMoney(p.amount)}
                </div>
              ))}
            </section>
          )}
          {results.recipients.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-green-800 mb-2">Recipients</h2>
              {results.recipients.map((r, i) => (
                <div key={i} className="py-2 px-3">
                  <span className="font-medium">{r.name}</span> <span className="text-gray-500">— {r.city}, {r.state}</span> — {fmtMoney(r.amount)}
                </div>
              ))}
            </section>
          )}
          {results.states.length === 0 && results.counties.length === 0 && results.programs.length === 0 && results.recipients.length === 0 && (
            <p className="text-gray-500">No results found for &ldquo;{query}&rdquo;</p>
          )}
        </div>
      )}
    </>
  )
}
