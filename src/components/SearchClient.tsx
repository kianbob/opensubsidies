// @ts-nocheck
'use client'

import { useState, useMemo } from 'react'
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
  const [query, setQuery] = useState('')
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
                  <span className="font-medium">{p.program}</span> — {fmtMoney(p.amount)}
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
