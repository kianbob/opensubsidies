// @ts-nocheck
'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { formatProgram } from '@/lib/format-program'

type Program = { program: string; code: string; payments: number; amount: number }

const CATEGORIES: Record<string, string[]> = {
  Conservation: ['CRP', 'GRASSLAND', 'EFRP', 'FOREST', 'CHESAPEAKE', 'BIOMASS', 'BCAP'],
  Commodity: ['PRICE LOSS', 'ARC ', 'AGRICULTURAL RISK', 'AVERAGE CROP', 'DCP', 'ACREAGE GRAZING', 'COTTON TRANSITION', 'ECONOMIC ADJUSTMENT'],
  Emergency: ['EMERGENCY', 'EMGNCY', 'EMRGNCY', 'WHIP', 'DISASTER', 'WILDFIRES', 'HURRICANE', 'QUALITY LOSS', 'PANDEMIC', 'SUPPLEMENTAL REVENUE', 'SUPP DISASTER'],
  'Trade War': ['MFP', 'MARKET FACILITATION', 'MARKET ACCESS', 'SEAFOOD TRADE', 'TMP/MFP'],
  Dairy: ['DAIRY', 'MARGIN PROTECTION', 'DMC', 'MILK LOSS', 'ORGANIC DAIRY', 'INCOME LOSS - MILK', 'DIPP', 'INDEMNITY PAYMENT - DAIRY'],
  Livestock: ['LIVESTOCK', 'ELAP', 'SPOT MARKET HOG', 'ORIENTAL FRUIT FLY'],
}

function categorize(name: string): string {
  const upper = name.toUpperCase()
  for (const [cat, keywords] of Object.entries(CATEGORIES)) {
    if (keywords.some(k => upper.includes(k))) return cat
  }
  return 'Other'
}

const BADGE_COLORS: Record<string, string> = {
  Conservation: 'bg-green-100 text-green-800',
  Commodity: 'bg-blue-100 text-blue-800',
  Emergency: 'bg-red-100 text-red-800',
  'Trade War': 'bg-yellow-100 text-yellow-800',
  Dairy: 'bg-purple-100 text-purple-800',
  Livestock: 'bg-orange-100 text-orange-800',
  Other: 'bg-gray-100 text-gray-700',
}

const AMOUNT_RANGES = [
  { label: 'All', min: 0, max: Infinity },
  { label: '$1B+', min: 1e9, max: Infinity },
  { label: '$100M–$1B', min: 1e8, max: 1e9 },
  { label: '$10M–$100M', min: 1e7, max: 1e8 },
  { label: 'Under $10M', min: 0, max: 1e7 },
]

function fmtMoney(n: number): string {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M'
  if (Math.abs(n) >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K'
  return '$' + n.toFixed(0)
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function ProgramExplorerClient({ programs }: { programs: Program[] }) {
  const [category, setCategory] = useState('All')
  const [amountIdx, setAmountIdx] = useState(0)
  const [sort, setSort] = useState<'amount' | 'payments' | 'name'>('amount')
  const [search, setSearch] = useState('')

  const enriched = useMemo(() => programs.map(p => ({ ...p, category: categorize(p.program) })), [programs])

  const filtered = useMemo(() => {
    const range = AMOUNT_RANGES[amountIdx]
    const q = search.toLowerCase()
    return enriched
      .filter(p => category === 'All' || p.category === category)
      .filter(p => p.amount >= range.min && p.amount < range.max)
      .filter(p => !q || p.program.toLowerCase().includes(q) || formatProgram(p.program).toLowerCase().includes(q))
      .sort((a, b) => {
        if (sort === 'amount') return b.amount - a.amount
        if (sort === 'payments') return b.payments - a.payments
        return formatProgram(a.program).localeCompare(formatProgram(b.program))
      })
  }, [enriched, category, amountIdx, sort, search])

  const allCats = ['All', 'Conservation', 'Commodity', 'Emergency', 'Trade War', 'Dairy', 'Livestock', 'Other']

  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 space-y-4">
        <div>
          <input
            type="text"
            placeholder="Search programs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {allCats.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${category === c ? 'bg-[#15803d] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Amount:</span>
            <select value={amountIdx} onChange={e => setAmountIdx(+e.target.value)} className="text-sm border border-gray-200 rounded-lg px-2 py-1">
              {AMOUNT_RANGES.map((r, i) => <option key={i} value={i}>{r.label}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Sort:</span>
            <select value={sort} onChange={e => setSort(e.target.value as any)} className="text-sm border border-gray-200 rounded-lg px-2 py-1">
              <option value="amount">Total Amount</option>
              <option value="payments">Payment Count</option>
              <option value="name">Name</option>
            </select>
          </div>
          <span className="text-xs text-gray-400 ml-auto">{filtered.length} programs</span>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-2">
        {filtered.map(p => (
          <Link
            key={p.program + p.code}
            href={`/programs/${slugify(p.program)}`}
            className="block bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm truncate">{formatProgram(p.program)}</h3>
                <p className="text-xs text-gray-400 truncate">{p.program}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${BADGE_COLORS[p.category]}`}>
                {p.category}
              </span>
              <div className="flex gap-4 sm:gap-6 text-right shrink-0">
                <div>
                  <div className="text-sm font-bold text-[#15803d]">{fmtMoney(p.amount)}</div>
                  <div className="text-xs text-gray-400">total</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-700">{p.payments.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">payments</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
