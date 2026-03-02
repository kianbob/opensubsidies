// @ts-nocheck
'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { formatProgram } from '@/lib/format-program'
import { fmtMoney, titleCase } from '@/lib/utils'

type StateSummary = {
  abbr: string
  name: string
  amount: number
  payments: number
  topPrograms: { program: string; amount: number }[]
}

type DepEntry = {
  state: string
  name: string
  ratio: number
  farmIncome: number
  subsidies: number
}

const STATE_POPULATIONS: Record<string, number> = {
  AL:5024279,AK:733391,AZ:7151502,AR:3011524,CA:39538223,CO:5773714,CT:3605944,DE:989948,FL:21538187,GA:10711908,
  HI:1455271,ID:1839106,IL:12812508,IN:6785528,IA:3190369,KS:2937880,KY:4505836,LA:4657757,ME:1362359,MD:6177224,
  MA:7029917,MI:10077331,MN:5706494,MS:2961279,MO:6154913,MT:1084225,NE:1961504,NV:3104614,NH:1377529,NJ:9288994,
  NM:2117522,NY:20201249,NC:10439388,ND:779094,OH:11799448,OK:3959353,OR:4237256,PA:13002700,RI:1097379,SC:5118425,
  SD:886667,TN:6910840,TX:29145505,UT:3271616,VT:643077,VA:8631393,WA:7614893,WV:1793716,WI:5893718,WY:576851,
}

function PerCapita({ amount, abbr }: { amount: number; abbr: string }) {
  const pop = STATE_POPULATIONS[abbr]
  if (!pop) return null
  const pc = amount / pop
  return <span className="text-sm text-gray-500">(${pc.toFixed(0)}/person)</span>
}

export default function MapExplorerClient({ states, dependency }: { states: StateSummary[]; dependency: DepEntry[] }) {
  const [selected, setSelected] = useState('')
  const [hoveredState, setHoveredState] = useState('')

  const sorted = useMemo(() => [...states].sort((a, b) => b.amount - a.amount), [states])
  const depMap = useMemo(() => {
    const m: Record<string, DepEntry> = {}
    dependency.forEach(d => { m[d.state] = d })
    return m
  }, [dependency])

  const stateMap = useMemo(() => {
    const m: Record<string, StateSummary> = {}
    states.forEach(s => { m[s.abbr] = s })
    return m
  }, [states])

  const current = selected ? stateMap[selected] : null
  const dep = selected ? depMap[selected] : null

  // Color scale for the grid map
  const maxAmount = sorted[0]?.amount || 1
  function getColor(abbr: string): string {
    const s = stateMap[abbr]
    if (!s) return '#f3f4f6'
    const intensity = Math.pow(s.amount / maxAmount, 0.4)
    const r = Math.round(255 - intensity * (255 - 21))
    const g = Math.round(255 - intensity * (255 - 128))
    const b = Math.round(255 - intensity * (255 - 61))
    return `rgb(${r},${g},${b})`
  }

  // Grid layout for US state map
  const grid: (string | null)[][] = [
    [null,null,null,null,null,null,null,null,null,null,'ME'],
    [null,null,null,null,null,null,'WI',null,null,'VT','NH'],
    ['WA','MT','ND','MN','IL','MI',null,'NY','MA','RI','CT'],
    ['OR','ID','SD','IA','IN','OH','PA','NJ','DE','MD',null],
    ['CA','NV','WY','NE','MO','KY','WV','VA','NC','SC','DC'],
    ['AK','UT','CO','KS','AR','TN','GA','AL','FL',null,null],
    ['HI','AZ','NM','OK','LA','MS',null,null,null,null,null],
    [null,null,null,'TX',null,null,null,null,null,null,null],
  ]

  const yearlyData = current ? [] : sorted.slice(0, 15).map(s => ({
    name: s.abbr,
    amount: s.amount,
  }))

  return (
    <div>
      {/* Grid Map */}
      <div className="mb-8">
        <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-gray-900 mb-3">Click a State to Explore</h2>
        <div className="overflow-x-auto">
          <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(11, 48px)` }}>
            {grid.flat().map((abbr, i) => {
              if (!abbr || abbr === 'DC') return <div key={i} className="w-12 h-10" />
              const isSelected = abbr === selected
              const isHovered = abbr === hoveredState
              return (
                <button
                  key={i}
                  onClick={() => setSelected(abbr === selected ? '' : abbr)}
                  onMouseEnter={() => setHoveredState(abbr)}
                  onMouseLeave={() => setHoveredState('')}
                  className={`w-12 h-10 rounded text-xs font-bold transition-all ${
                    isSelected ? 'ring-2 ring-green-800 scale-110 z-10' : isHovered ? 'ring-1 ring-green-600' : ''
                  }`}
                  style={{ backgroundColor: getColor(abbr), color: (stateMap[abbr]?.amount || 0) > maxAmount * 0.3 ? '#fff' : '#374151' }}
                  title={stateMap[abbr] ? `${stateMap[abbr].name}: ${fmtMoney(stateMap[abbr].amount)}` : abbr}
                >
                  {abbr}
                </button>
              )
            })}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
          <span>Less</span>
          <div className="flex gap-0.5">
            {[0.05, 0.2, 0.4, 0.6, 0.8, 1].map(v => (
              <div key={v} className="w-6 h-3 rounded-sm" style={{
                backgroundColor: `rgb(${Math.round(255 - Math.pow(v, 0.4) * (255 - 21))},${Math.round(255 - Math.pow(v, 0.4) * (255 - 128))},${Math.round(255 - Math.pow(v, 0.4) * (255 - 61))})`
              }} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      {/* State Detail */}
      {current ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-green-800">{current.name}</h2>
            <button onClick={() => setSelected('')} className="text-sm text-gray-400 hover:text-gray-600">✕ Close</button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-gray-400 uppercase">Total Subsidies</div>
              <div className="text-xl font-bold text-gray-900">{fmtMoney(current.amount)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase">Payments</div>
              <div className="text-xl font-bold text-gray-900">{current.payments.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase">Per Capita</div>
              <div className="text-xl font-bold text-gray-900">
                {STATE_POPULATIONS[current.abbr] ? '$' + (current.amount / STATE_POPULATIONS[current.abbr]).toFixed(0) : 'N/A'}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase">Farm Dependency</div>
              <div className="text-xl font-bold text-gray-900">
                {dep ? (dep.ratio * 100).toFixed(0) + '%' : 'N/A'}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-3">Top Programs</h3>
            <div className="space-y-2">
              {current.topPrograms.slice(0, 8).map((p, i) => {
                const pct = (p.amount / current.amount) * 100
                return (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-0.5">
                      <span className="text-gray-700 truncate mr-2">{formatProgram(p.program)}</span>
                      <span className="font-medium text-gray-900 whitespace-nowrap">{fmtMoney(p.amount)}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-600 rounded-full" style={{ width: `${Math.min(pct, 100)}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="text-sm">
            <a href={`/states/${current.abbr.toLowerCase()}`} className="text-green-700 hover:underline font-medium">
              View full {current.name} page →
            </a>
          </div>
        </div>
      ) : (
        /* Top 15 states bar chart */
        <div>
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-gray-900 mb-3">Top 15 States by Total Subsidies</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={yearlyData} layout="vertical" margin={{ left: 5, right: 10 }}>
              <XAxis type="number" tickFormatter={(v: number) => fmtMoney(v)} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={35} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => ['$' + v.toLocaleString(undefined, { maximumFractionDigits: 0 }), 'Total']} />
              <Bar dataKey="amount" radius={[0, 3, 3, 0]}>
                {yearlyData.map((_, i) => (
                  <Cell key={i} fill={i < 3 ? '#15803d' : '#22c55e'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Ranking table */}
      <div className="mt-8">
        <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-gray-900 mb-3">All States Ranked</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-gray-500 font-medium">#</th>
                <th className="text-left py-2 text-gray-500 font-medium">State</th>
                <th className="text-right py-2 text-gray-500 font-medium">Total</th>
                <th className="text-right py-2 text-gray-500 font-medium">Per Capita</th>
                <th className="text-right py-2 text-gray-500 font-medium">Dependency</th>
              </tr>
            </thead>
            <tbody>
              {sorted.filter(s => STATE_POPULATIONS[s.abbr]).map((s, i) => (
                <tr
                  key={s.abbr}
                  className={`border-b border-gray-50 cursor-pointer hover:bg-green-50 transition-colors ${s.abbr === selected ? 'bg-green-50 font-semibold' : ''}`}
                  onClick={() => setSelected(s.abbr)}
                >
                  <td className="py-1.5 text-gray-400">{i + 1}</td>
                  <td className="py-1.5">{s.name}</td>
                  <td className="py-1.5 text-right">{fmtMoney(s.amount)}</td>
                  <td className="py-1.5 text-right">${STATE_POPULATIONS[s.abbr] ? (s.amount / STATE_POPULATIONS[s.abbr]).toFixed(0) : 'N/A'}</td>
                  <td className="py-1.5 text-right">{depMap[s.abbr] ? (depMap[s.abbr].ratio * 100).toFixed(0) + '%' : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
