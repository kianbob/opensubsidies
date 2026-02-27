// @ts-nocheck
'use client'
import { useState, useMemo } from 'react'

type StateData = {
  abbr: string
  name: string
  amount: number
  payments: number
  topPrograms: { program: string; amount: number }[]
}

type StateYearly = { state: string; year: number; amount: number; payments: number }

function fmtMoney(n: number): string {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M'
  if (Math.abs(n) >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K'
  return '$' + n.toFixed(0)
}

function Sparkline({ data }: { data: { year: number; amount: number }[] }) {
  if (!data.length) return null
  const filtered = data.filter(d => d.year >= 2017)
  if (!filtered.length) return null
  const max = Math.max(...filtered.map(d => d.amount))
  const min = Math.min(...filtered.map(d => d.amount))
  const range = max - min || 1
  const w = 200
  const h = 40
  const points = filtered.map((d, i) => {
    const x = (i / (filtered.length - 1)) * w
    const y = h - ((d.amount - min) / range) * h
    return `${x},${y}`
  }).join(' ')

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-10" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
    </svg>
  )
}

export default function StateProfileClient({
  states,
  stateYearly,
  countyCount,
}: {
  states: StateData[]
  stateYearly: StateYearly[]
  countyCount: Record<string, number>
}) {
  const [selected, setSelected] = useState('')
  const sorted = useMemo(() => [...states].sort((a, b) => b.amount - a.amount), [states])
  const us50 = sorted.filter(s => s.abbr.length === 2 && !['PR', 'GU', 'AS', 'MP', 'VI', 'DC', 'AA', 'AE', 'AP'].includes(s.abbr))

  const state = sorted.find(s => s.abbr === selected)
  const rank = state ? us50.findIndex(s => s.abbr === selected) + 1 : null

  const yearly = useMemo(() => {
    if (!selected) return []
    return stateYearly.filter(d => d.state === selected).sort((a, b) => a.year - b.year)
  }, [selected, stateYearly])

  const peakYear = yearly.length ? yearly.reduce((a, b) => a.amount > b.amount ? a : b) : null
  const avgPayment = state ? state.amount / state.payments : 0
  const counties = state ? (countyCount[state.abbr] || 0) : 0

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select a State</label>
        <select
          value={selected}
          onChange={e => setSelected(e.target.value)}
          className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white"
        >
          <option value="">Choose a state...</option>
          {sorted.filter(s => !['AA', 'AE', 'AP'].includes(s.abbr)).map(s => (
            <option key={s.abbr} value={s.abbr}>{s.name} ({s.abbr})</option>
          ))}
        </select>
      </div>

      {state && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-6">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">{state.name}</h2>
            <p className="text-white/80 text-sm mt-1">Farm Subsidy Profile · 2017–2025</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Total Subsidies</p>
              <p className="text-xl font-bold text-gray-900">{fmtMoney(state.amount)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">National Rank</p>
              <p className="text-xl font-bold text-gray-900">{rank ? `#${rank}` : 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Total Payments</p>
              <p className="text-xl font-bold text-gray-900">{state.payments.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Avg Payment</p>
              <p className="text-xl font-bold text-gray-900">{fmtMoney(avgPayment)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Peak Year</p>
              <p className="text-xl font-bold text-gray-900">{peakYear ? `${peakYear.year} (${fmtMoney(peakYear.amount)})` : 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Counties</p>
              <p className="text-xl font-bold text-gray-900">{counties.toLocaleString()}</p>
            </div>
          </div>

          <div className="px-6 pb-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Spending Trend (2017–2025)</p>
            <Sparkline data={yearly} />
          </div>

          <div className="px-6 pb-6">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Top Program</p>
            {state.topPrograms && state.topPrograms[0] && (
              <p className="text-sm text-gray-700 font-medium">{state.topPrograms[0].program} — {fmtMoney(state.topPrograms[0].amount)}</p>
            )}
          </div>

          <div className="bg-gray-50 px-6 py-4 text-center">
            <a href={`/states/${state.abbr.toLowerCase()}`} className="text-primary font-medium text-sm hover:underline">
              View full {state.name} subsidy data →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
