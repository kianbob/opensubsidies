import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import TrendsCharts from '@/components/TrendsCharts'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Program Trends — Farm Subsidy Spending Over Time',
  description: 'Track how U.S. farm subsidy spending has changed year by year. See which programs and emergency spending drove the biggest shifts.',
}

type YearData = { year: number; payments: number; amount: number }

export default function TrendsPage() {
  const yearly = loadData('yearly.json') as YearData[]
  const meaningful = yearly.filter(y => y.amount > 100000)
  const totalAll = yearly.reduce((s, y) => s + y.amount, 0)
  const peakYear = meaningful.reduce((a, b) => a.amount > b.amount ? a : b)
  const recent = meaningful.filter(y => y.year >= 2020)
  const recentTotal = recent.reduce((s, y) => s + y.amount, 0)

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Trends' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Program Trends</h1>
      <p className="text-gray-600 mb-8">How farm subsidy spending has shifted over time — from traditional commodity programs to emergency disaster payments.</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5 text-center">
          <p className="text-sm text-gray-500">Total All Years</p>
          <p className="text-2xl font-bold text-primary">{fmtMoney(totalAll)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 text-center">
          <p className="text-sm text-gray-500">Peak Year</p>
          <p className="text-2xl font-bold text-primary">{peakYear.year}</p>
          <p className="text-sm text-gray-500">{fmtMoney(peakYear.amount)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 text-center">
          <p className="text-sm text-gray-500">Since 2020</p>
          <p className="text-2xl font-bold text-primary">{fmtMoney(recentTotal)}</p>
        </div>
      </div>

      <TrendsCharts yearly={yearly} />

      <div className="prose max-w-none mt-10">
        <h2 className="font-[family-name:var(--font-heading)]">Key Findings</h2>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">🔑 The Emergency Spending Era</p>
          <p className="text-sm text-gray-700 mt-1">
            Recent years have been dominated by emergency and disaster programs — CFAP, MFP, and supplemental disaster relief — 
            that dwarf traditional commodity support in many years.
          </p>
        </div>

        <h3 className="font-[family-name:var(--font-heading)]">What Drove the Changes</h3>
        <ul>
          <li><strong>2018-2019:</strong> Market Facilitation Program (MFP) — trade war payments to offset tariff impacts</li>
          <li><strong>2020-2021:</strong> Coronavirus Food Assistance Program (CFAP) — pandemic emergency payments</li>
          <li><strong>2022-2024:</strong> Supplemental disaster relief — extreme weather events</li>
          <li><strong>Traditional programs</strong> like CRP annual rental and ARC/PLC remain steady but are increasingly overshadowed</li>
        </ul>

        <h3 className="font-[family-name:var(--font-heading)]">The Shift from Predictable to Emergency</h3>
        <p>
          Farm subsidies used to be relatively predictable — commodity price supports, conservation rentals, and crop insurance.
          The post-2018 era has been defined by massive one-time emergency programs, making total spending far more volatile
          and harder to budget.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">Explore More</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { href: '/tools/timeline-explorer', title: 'Timeline Explorer', desc: 'Interactive tool to explore spending trends by program and year.' },
            { href: '/analysis/covid-spending', title: 'COVID Spending Analysis', desc: 'How pandemic relief reshaped farm subsidies in 2020.' },
            { href: '/analysis/trade-war', title: 'Trade War Analysis', desc: 'The impact of MFP trade war payments on farm spending.' },
            { href: '/years/2020', title: '2020: The Record Year', desc: 'Explore the biggest farm subsidy year in history.' },
          ].map(l => (
            <Link key={l.href} href={l.href} className="p-3 rounded-lg hover:bg-gray-50 border border-gray-100">
              <div className="font-semibold text-primary text-sm">{l.title}</div>
              <div className="text-xs text-gray-500">{l.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
