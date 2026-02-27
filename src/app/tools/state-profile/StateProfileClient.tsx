// @ts-nocheck
'use client'
import { useState, useMemo, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { formatProgram } from '@/lib/format-program'
import { titleCase } from '@/lib/utils'

type StateSummary = {
  abbr: string
  name: string
  amount: number
  payments: number
  topPrograms: { program: string; amount: number }[]
}

type StateDetail = {
  abbr: string
  name: string
  amount: number
  payments: number
  topPrograms: { program: string; amount: number }[]
  counties: { county: string; amount: number; payments: number }[]
  yearly: { year: number; amount: number; payments: number }[]
  topRecipients: { name: string; city: string; amount: number; payments: number }[]
}

function fmtMoney(n: number): string {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M'
  if (Math.abs(n) >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K'
  return '$' + n.toFixed(0)
}

function YearlyChart({ data }: { data: { year: number; amount: number }[] }) {
  const chartData = data.map(d => ({
    year: d.year === 2025 ? '2025*' : String(d.year),
    amount: d.amount,
  }))

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <XAxis dataKey="year" tick={{ fontSize: 11 }} interval={Math.max(0, Math.floor(chartData.length / 8) - 1)} />
        <YAxis tickFormatter={(v: number) => fmtMoney(v)} tick={{ fontSize: 11 }} width={70} />
        <Tooltip formatter={(v: number) => ['$' + v.toLocaleString(undefined, { maximumFractionDigits: 0 }), 'Amount']} />
        <Bar dataKey="amount" radius={[3, 3, 0, 0]}>
          {chartData.map((entry, i) => (
            <Cell key={i} fill={entry.year === '2025*' ? '#22c55e' : '#15803d'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

function TopList({ title, items }: { title: string; items: { label: string; value: number }[] }) {
  return (
    <div>
      <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-2">{title}</h3>
      <ol className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex justify-between text-sm">
            <span className="text-gray-700 truncate mr-2">
              <span className="text-gray-400 mr-1">{i + 1}.</span>
              {item.label}
            </span>
            <span className="text-gray-900 font-medium whitespace-nowrap">{fmtMoney(item.value)}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function StateProfileClient({ states }: { states: StateSummary[] }) {
  const [selected, setSelected] = useState('')
  const [detail, setDetail] = useState<StateDetail | null>(null)
  const [loading, setLoading] = useState(false)

  const sorted = useMemo(() => [...states].sort((a, b) => b.amount - a.amount), [states])
  const rankMap = useMemo(() => {
    const m: Record<string, number> = {}
    sorted.forEach((s, i) => { m[s.abbr] = i + 1 })
    return m
  }, [sorted])

  const summary = sorted.find(s => s.abbr === selected)

  useEffect(() => {
    if (!selected) { setDetail(null); return }
    let cancelled = false
    setLoading(true)
    fetch(`/data/states/${selected.toLowerCase()}.json`)
      .then(r => r.json())
      .then(d => { if (!cancelled) setDetail(d) })
      .catch(() => { if (!cancelled) setDetail(null) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [selected])

  const avgPayment = summary ? summary.amount / summary.payments : 0

  const topPrograms = detail
    ? detail.topPrograms.slice(0, 5).map(p => ({ label: formatProgram(p.program), value: p.amount }))
    : []

  const topCounties = detail
    ? [...detail.counties].sort((a, b) => b.amount - a.amount).slice(0, 5).map(c => ({ label: titleCase(c.county), value: c.amount }))
    : []

  const topRecipients = detail
    ? detail.topRecipients.slice(0, 5).map(r => ({ label: titleCase(r.name), value: r.amount }))
    : []

  const yearly = detail
    ? [...detail.yearly].sort((a, b) => a.year - b.year)
    : []

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select a State</label>
        <select
          value={selected}
          onChange={e => setSelected(e.target.value)}
          className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-[#15803d] focus:ring-2 focus:ring-[#15803d]/20 outline-none bg-white"
        >
          <option value="">Choose a state...</option>
          {sorted.filter(s => !['AA', 'AE', 'AP'].includes(s.abbr)).map(s => (
            <option key={s.abbr} value={s.abbr}>{s.name} ({s.abbr})</option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="text-center py-12 text-gray-400">Loading state data…</div>
      )}

      {summary && detail && !loading && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#15803d] to-[#16a34a] text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">{summary.name}</h2>
                <p className="text-white/80 text-sm mt-1">Farm Subsidy Profile</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">#{rankMap[selected]}</p>
                <p className="text-white/70 text-xs">of {sorted.length} by total</p>
              </div>
            </div>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-3 gap-4 p-6 border-b border-gray-100">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Total Subsidies</p>
              <p className="text-xl font-bold text-gray-900">{fmtMoney(summary.amount)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Payments</p>
              <p className="text-xl font-bold text-gray-900">{summary.payments.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Avg Payment</p>
              <p className="text-xl font-bold text-gray-900">{fmtMoney(avgPayment)}</p>
            </div>
          </div>

          {/* Top lists */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border-b border-gray-100">
            <TopList title="Top 5 Programs" items={topPrograms} />
            <TopList title="Top 5 Counties" items={topCounties} />
            <TopList title="Top 5 Recipients" items={topRecipients} />
          </div>

          {/* Chart */}
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-3">Year-over-Year Spending</h3>
            {yearly.length > 0 && <YearlyChart data={yearly} />}
            <p className="text-xs text-gray-400 mt-2">* 2025 data is partial / year-to-date</p>
          </div>

          {/* Link */}
          <div className="bg-gray-50 px-6 py-4 text-center">
            <a href={`/states/${summary.abbr.toLowerCase()}`} className="text-[#15803d] font-medium text-sm hover:underline">
              View full {summary.name} page →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
