// @ts-nocheck
'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'

type StateData = { abbr: string; name: string; amount: number; payments: number }
type DepData = { state: string; ratio: number }

function getColor(value: number, min: number, max: number) {
  const t = max === min ? 0.5 : (value - min) / (max - min)
  const lightness = 90 - t * 55
  return `hsl(140, 50%, ${lightness}%)`
}

function fmtMoney(n: number) {
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B'
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(0) + 'M'
  return '$' + (n / 1e3).toFixed(0) + 'K'
}

const STATE_POPS: Record<string, number> = {
  TX:30503677,CA:39029342,FL:22610726,NY:19677151,PA:12972008,IL:12582032,OH:11756058,GA:10912876,NC:10698973,MI:10037261,
  NJ:9261699,VA:8683619,WA:7785786,AZ:7303398,MA:6981974,TN:7051339,IN:6833037,MO:6177957,MD:6164660,WI:5892539,
  CO:5839926,MN:5717184,SC:5282634,AL:5074296,LA:4590241,KY:4512310,OR:4240137,OK:4019800,CT:3626205,UT:3380800,
  IA:3200517,NV:3177772,AR:3045637,MS:2940057,KS:2937150,NM:2113344,NE:1967923,WV:1775156,ID:1939033,HI:1440196,
  NH:1395231,ME:1385340,MT:1122867,RI:1093734,DE:1018396,SD:909824,ND:779261,AK:733583,VT:647064,WY:576851,DC:671803,
}

export default function MapClient({ states, dependency }: { states: StateData[]; dependency: DepData[] }) {
  const [metric, setMetric] = useState<'total' | 'percapita' | 'dependency'>('total')
  const [search, setSearch] = useState('')

  const depMap = useMemo(() => Object.fromEntries(dependency.map(d => [d.state, d.ratio])), [dependency])

  const enriched = useMemo(() => {
    return states
      .filter(s => !['PR','VI','GU','AS','MP','AP','AE','AA'].includes(s.abbr))
      .map(s => ({
        ...s,
        perCapita: STATE_POPS[s.abbr] ? s.amount / STATE_POPS[s.abbr] : 0,
        dependency: depMap[s.abbr] || 0,
      }))
  }, [states, depMap])

  const sorted = useMemo(() => {
    const filtered = search
      ? enriched.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.abbr.toLowerCase().includes(search.toLowerCase()))
      : enriched
    return [...filtered].sort((a, b) => {
      if (metric === 'total') return b.amount - a.amount
      if (metric === 'percapita') return b.perCapita - a.perCapita
      return b.dependency - a.dependency
    })
  }, [enriched, metric, search])

  const values = sorted.map(s => metric === 'total' ? s.amount : metric === 'percapita' ? s.perCapita : s.dependency)
  const maxVal = Math.max(...values, 1)
  const minVal = Math.min(...values, 0)

  const totalSubsidies = enriched.reduce((s, x) => s + x.amount, 0)
  const topState = enriched.reduce((a, b) => a.amount > b.amount ? a : b, enriched[0])
  const mostDependent = enriched.reduce((a, b) => a.dependency > b.dependency ? a : b, enriched[0])

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-sm text-gray-500 mb-1">Total Farm Subsidies</div>
          <div className="text-2xl font-bold text-primary">{fmtMoney(totalSubsidies)}</div>
          <div className="text-xs text-gray-400">50 states + DC (2017–2025)</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-sm text-gray-500 mb-1">Top State by Total</div>
          <div className="text-2xl font-bold text-primary">{topState?.name}</div>
          <div className="text-xs text-gray-400">{fmtMoney(topState?.amount || 0)}</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-sm text-gray-500 mb-1">Most Dependent State</div>
          <div className="text-2xl font-bold text-primary">{mostDependent?.name}</div>
          <div className="text-xs text-gray-400">{(mostDependent?.dependency * 100).toFixed(0)}% of farm income</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {([['total', 'Total Amount'], ['percapita', 'Per Capita'], ['dependency', 'Dependency %']] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setMetric(key)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${metric === key ? 'bg-white text-primary font-medium shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Filter states..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="space-y-1">
        {sorted.map((s, i) => {
          const val = metric === 'total' ? s.amount : metric === 'percapita' ? s.perCapita : s.dependency
          const barWidth = maxVal > 0 ? (val / maxVal) * 100 : 0
          const displayVal = metric === 'total' ? fmtMoney(s.amount) : metric === 'percapita' ? `$${s.perCapita.toFixed(0)}` : `${(s.dependency * 100).toFixed(0)}%`
          return (
            <Link
              key={s.abbr}
              href={`/states/${s.abbr.toLowerCase()}`}
              className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <span className="w-6 text-xs text-gray-400 text-right">{i + 1}</span>
              <span className="w-6 font-mono text-sm font-medium text-gray-700">{s.abbr}</span>
              <span className="w-32 text-sm text-gray-600 truncate hidden sm:block">{s.name}</span>
              <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${barWidth}%`, backgroundColor: getColor(val, minVal, maxVal) }}
                />
              </div>
              <span className="w-20 text-right text-sm font-medium text-gray-700">{displayVal}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
