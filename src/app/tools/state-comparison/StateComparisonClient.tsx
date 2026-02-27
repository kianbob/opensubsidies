// @ts-nocheck
'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatProgram } from '@/lib/format-program'

type State = { abbr: string; name: string; payments: number; amount: number; topPrograms: { program: string; amount: number }[] }
type StateYear = { state: string; year: number; payments: number; amount: number }

const POPULATIONS: Record<string, number> = {
  TX: 30503301, CA: 38965193, IA: 3207004, IL: 12549689, KS: 2940865,
  MN: 5737915, NE: 1978379, ND: 783926, SD: 919318, GA: 11029227,
  AR: 3067732, MS: 2939690, OK: 4019800, CO: 5877610, WI: 5910955,
  IN: 6862199, MO: 6178664, OH: 11780017, NC: 10835491, MT: 1132812,
}

const EMERGENCY_KEYWORDS = ['EMERGENCY', 'EMGNCY', 'EMRGNCY', 'WHIP', 'DISASTER', 'WILDFIRES', 'HURRICANE', 'PANDEMIC', 'CFAP', 'SUPP DISASTER']

function fmtMoney(n: number): string {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M'
  if (Math.abs(n) >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K'
  return '$' + n.toFixed(0)
}

function emergencyPct(topPrograms: { program: string; amount: number }[], totalAmount: number): number {
  const emergencyAmount = topPrograms.filter(p => EMERGENCY_KEYWORDS.some(k => p.program.toUpperCase().includes(k))).reduce((s, p) => s + p.amount, 0)
  return totalAmount > 0 ? (emergencyAmount / totalAmount) * 100 : 0
}

const COLORS = ['#15803d', '#ca8a04', '#2563eb', '#dc2626']

export default function StateComparisonClient({ states }: { states: State[] }) {
  const sorted = useMemo(() => [...states].sort((a, b) => a.name.localeCompare(b.name)), [states])
  const [selected, setSelected] = useState<string[]>(['TX', 'IA'])

  const toggle = (abbr: string) => {
    setSelected(prev => {
      if (prev.includes(abbr)) return prev.filter(s => s !== abbr)
      if (prev.length >= 4) return prev
      return [...prev, abbr]
    })
  }

  const selectedStates = useMemo(() => selected.map(a => states.find(s => s.abbr === a)!).filter(Boolean), [selected, states])

  const chartData = useMemo(() => selectedStates.map(s => ({
    name: s.abbr,
    'Total Subsidies': s.amount,
    'Per Capita': POPULATIONS[s.abbr] ? Math.round(s.amount / POPULATIONS[s.abbr]) : 0,
  })), [selectedStates])

  return (
    <div>
      {/* Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <label className="text-sm font-medium text-gray-700 mb-2 block">Select 2–4 states to compare:</label>
        <div className="flex flex-wrap gap-2">
          {sorted.filter(s => s.abbr.length === 2 && s.abbr === s.abbr.toUpperCase() && !['AA','AE','AP','AS','DC','GU','MP','PR','VI'].includes(s.abbr)).map(s => (
            <button
              key={s.abbr}
              onClick={() => toggle(s.abbr)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${selected.includes(s.abbr) ? 'bg-[#15803d] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {s.abbr}
            </button>
          ))}
        </div>
      </div>

      {selectedStates.length < 2 ? (
        <p className="text-gray-500 text-center py-12">Select at least 2 states to compare.</p>
      ) : (
        <>
          {/* Cards */}
          <div className={`grid gap-4 mb-8 ${selectedStates.length <= 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
            {selectedStates.map((s, i) => {
              const pop = POPULATIONS[s.abbr]
              const perCapita = pop ? s.amount / pop : null
              const emergPct = emergencyPct(s.topPrograms, s.amount)
              return (
                <div key={s.abbr} className="bg-white rounded-xl shadow-sm border-2 p-5" style={{ borderColor: COLORS[i] }}>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{s.name} ({s.abbr})</h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between"><dt className="text-gray-500">Total Subsidies</dt><dd className="font-bold text-[#15803d]">{fmtMoney(s.amount)}</dd></div>
                    <div className="flex justify-between"><dt className="text-gray-500">Payments</dt><dd className="font-semibold">{s.payments.toLocaleString()}</dd></div>
                    <div className="flex justify-between"><dt className="text-gray-500">Per Capita</dt><dd className="font-semibold">{perCapita ? fmtMoney(perCapita) : 'N/A'}</dd></div>
                    <div className="flex justify-between"><dt className="text-gray-500">Emergency %</dt><dd className="font-semibold">{emergPct.toFixed(1)}%</dd></div>
                    <div><dt className="text-gray-500 mb-1">Top Program</dt><dd className="font-semibold text-xs">{formatProgram(s.topPrograms[0]?.program || '')}</dd></div>
                  </dl>
                </div>
              )
            })}
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Total Subsidies Comparison</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(v) => fmtMoney(v)} />
                  <Tooltip formatter={(v: number) => fmtMoney(v)} />
                  <Legend />
                  <Bar dataKey="Total Subsidies" fill="#15803d" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
