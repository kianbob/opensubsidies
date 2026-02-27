// @ts-nocheck
'use client'
import { useState } from 'react'
import Link from 'next/link'

type State = { abbr: string; name: string; payments: number; amount: number }
type RankingTab = 'total' | 'percapita' | 'payments' | 'average'

const statePopulations: Record<string, number> = {
  TX: 30503000, IA: 3201000, KS: 2940000, MN: 5738000, NE: 1967000,
  ND: 783000, SD: 910000, IL: 12550000, MO: 6178000, GA: 10913000,
  AR: 3046000, MT: 1123000, OK: 4020000, OH: 11788000, IN: 6834000,
  WI: 5897000, CO: 5878000, CA: 38965000, LA: 4590000, MS: 2940000,
  NC: 10697000, WA: 7813000, FL: 22611000, MI: 10038000, AL: 5074000,
  OR: 4241000, ID: 1964000, VA: 8643000, PA: 12962000, KY: 4527000,
  TN: 7052000, SC: 5282000, NM: 2114000, NJ: 9290000, NY: 19572000,
  WY: 577000, AZ: 7431000, MD: 6180000, UT: 3418000, CT: 3619000,
  MA: 7002000, ME: 1396000, NH: 1396000, VT: 648000, WV: 1770000,
  RI: 1096000, HI: 1436000, NV: 3180000, DE: 1018000, DC: 678000,
}

function fmtMoney(n: number): string {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M'
  if (Math.abs(n) >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K'
  return '$' + n.toFixed(0)
}

function fmt(n: number) { return n.toLocaleString() }

const tabs: { key: RankingTab; label: string }[] = [
  { key: 'total', label: 'Total Subsidies' },
  { key: 'percapita', label: 'Per Capita' },
  { key: 'payments', label: '# of Payments' },
  { key: 'average', label: 'Avg Payment' },
]

export default function RankingsClient({ states }: { states: State[] }) {
  const [tab, setTab] = useState<RankingTab>('total')

  const ranked = [...states]
    .filter(s => tab !== 'percapita' || statePopulations[s.abbr])
    .map(s => ({
      ...s,
      perCapita: statePopulations[s.abbr] ? s.amount / statePopulations[s.abbr] : 0,
      avg: s.payments > 0 ? s.amount / s.payments : 0,
    }))
    .sort((a, b) => {
      if (tab === 'total') return b.amount - a.amount
      if (tab === 'percapita') return b.perCapita - a.perCapita
      if (tab === 'payments') return b.payments - a.payments
      return b.avg - a.avg
    })

  function getValue(s: typeof ranked[0]) {
    if (tab === 'total') return fmtMoney(s.amount)
    if (tab === 'percapita') return '$' + s.perCapita.toFixed(0)
    if (tab === 'payments') return fmt(s.payments)
    return fmtMoney(s.avg)
  }

  function getLabel() {
    if (tab === 'total') return 'Total'
    if (tab === 'percapita') return 'Per Capita'
    if (tab === 'payments') return 'Payments'
    return 'Avg Payment'
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t.key ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold w-12">#</th>
              <th className="px-4 py-3 text-left font-semibold">State</th>
              <th className="px-4 py-3 text-right font-semibold">{getLabel()}</th>
              <th className="px-4 py-3 text-right font-semibold hidden md:table-cell">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ranked.map((s, i) => (
              <tr key={s.abbr} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500 font-mono">{i + 1}</td>
                <td className="px-4 py-3">
                  <Link href={`/states/${s.abbr.toLowerCase()}`} className="text-primary hover:underline font-medium">{s.name}</Link>
                </td>
                <td className="px-4 py-3 text-right font-mono font-medium">{getValue(s)}</td>
                <td className="px-4 py-3 text-right hidden md:table-cell text-gray-500">{fmtMoney(s.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
