'use client'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface County {
  fips: string
  county: string
  state: string
  stateName: string
  amount: number
  payments: number
}

interface StateData {
  abbr: string
  name: string
  payments: number
  amount: number
  topPrograms: { program: string; amount: number }[]
}

function fmtMoney(n: number): string {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M'
  if (Math.abs(n) >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K'
  return '$' + n.toFixed(0)
}

export default function SubsidyTrackerClient() {
  const [counties, setCounties] = useState<County[]>([])
  const [states, setStates] = useState<StateData[]>([])
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<County | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/data/county-index.json').then(r => r.json()),
      fetch('/data/states.json').then(r => r.json()),
    ]).then(([c, s]) => {
      setCounties(c)
      setStates(s)
      setLoading(false)
    })
  }, [])

  const results = useMemo(() => {
    if (!query || query.length < 2) return []
    const q = query.toLowerCase()
    return counties
      .filter(c => c.county.toLowerCase().includes(q) || c.fips === q || (c.stateName || c.state).toLowerCase().includes(q))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 20)
  }, [query, counties])

  const nationalAvg = useMemo(() => {
    if (counties.length === 0) return 0
    const total = counties.reduce((s, c) => s + c.amount, 0)
    return total / counties.length
  }, [counties])

  const stateData = useMemo(() => {
    if (!selected) return null
    return states.find(s => s.abbr === selected.state)
  }, [selected, states])

  const stateCounties = useMemo(() => {
    if (!selected) return []
    return counties.filter(c => c.state === selected.state)
  }, [selected, counties])

  const stateAvg = useMemo(() => {
    if (stateCounties.length === 0) return 0
    return stateCounties.reduce((s, c) => s + c.amount, 0) / stateCounties.length
  }, [stateCounties])

  const stateRank = useMemo(() => {
    if (!selected) return 0
    const sorted = [...stateCounties].sort((a, b) => b.amount - a.amount)
    return sorted.findIndex(c => c.fips === selected.fips) + 1
  }, [selected, stateCounties])

  const nationalRank = useMemo(() => {
    if (!selected) return 0
    const sorted = [...counties].sort((a, b) => b.amount - a.amount)
    return sorted.findIndex(c => c.fips === selected.fips) + 1
  }, [selected, counties])

  const comparisonData = useMemo(() => {
    if (!selected) return []
    return [
      { name: selected.county, value: selected.amount },
      { name: 'State Avg', value: stateAvg },
      { name: 'National Avg', value: nationalAvg },
    ]
  }, [selected, stateAvg, nationalAvg])

  if (loading) return <div className="text-center py-16 text-gray-400">Loading data…</div>

  return (
    <div>
      <div className="max-w-lg mx-auto mb-8">
        <input
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setSelected(null) }}
          placeholder="Type a county name or FIPS code…"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        {results.length > 0 && !selected && (
          <div className="border border-gray-200 rounded-lg mt-1 max-h-64 overflow-y-auto bg-white shadow-lg">
            {results.map(c => (
              <button
                key={c.fips}
                onClick={() => { setSelected(c); setQuery(c.county + ', ' + c.stateName) }}
                className="w-full text-left px-4 py-2 hover:bg-green-50 border-b border-gray-50 last:border-0"
              >
                <span className="font-medium">{c.county}</span>
                <span className="text-gray-500 ml-1">{c.stateName}</span>
                <span className="text-gray-400 text-sm float-right">{fmtMoney(c.amount)}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div>
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-green-700">{fmtMoney(selected.amount)}</p>
              <p className="text-sm text-gray-500">Total Subsidies</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-green-700">{selected.payments.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Total Payments</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-green-700">#{stateRank}</p>
              <p className="text-sm text-gray-500">Rank in {selected.stateName}</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-green-700">#{nationalRank}</p>
              <p className="text-sm text-gray-500">National Rank</p>
            </div>
          </div>

          {/* Comparison Chart */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 mb-8">
            <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4">How {selected.county} Compares</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} layout="vertical">
                  <XAxis type="number" tickFormatter={(v) => fmtMoney(v)} />
                  <YAxis type="category" dataKey="name" width={120} />
                  <Tooltip formatter={(v) => fmtMoney(Number(v))} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {comparisonData.map((_, i) => (
                      <Cell key={i} fill={i === 0 ? '#15803d' : i === 1 ? '#86efac' : '#d1d5db'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* State Top Programs */}
          {stateData && (
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 mb-8">
              <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4">
                Top Programs in {stateData.name}
              </h3>
              <p className="text-sm text-gray-500 mb-3">The biggest programs statewide that likely contribute to {selected.county}&apos;s total.</p>
              <div className="space-y-2">
                {stateData.topPrograms.slice(0, 7).map((p, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700 truncate mr-2">{p.program}</span>
                    <span className="text-gray-500 whitespace-nowrap">{fmtMoney(p.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Link to full county page */}
          <div className="text-center">
            <Link
              href={`/counties/${selected.fips}`}
              className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
            >
              View Full {selected.county} County Page →
            </Link>
          </div>
        </div>
      )}

      {!selected && !query && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-6xl mb-4">🏘️</p>
          <p>Search for a county to track its subsidy data</p>
        </div>
      )}
    </div>
  )
}
