import { Metadata } from 'next'
import Link from 'next/link'
import { fmt, fmtMoney, slugify, formatProgram } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProgramsChart from '@/components/ProgramsChart'
import ProgramsTableClient from './ProgramsTableClient'

export const metadata: Metadata = {
  title: 'All 157 USDA Farm Subsidy Programs Ranked',
  description: `All 157 USDA farm subsidy programs ranked by total payments from 2017-2025. See which programs distribute the most money.`,
  alternates: { canonical: 'https://www.opensubsidies.org/programs' },
}

export default function ProgramsPage() {
  const programs = loadData('programs.json') as { program: string; code: string; payments: number; amount: number }[]
  const sorted = [...programs].sort((a, b) => b.amount - a.amount)
  const top15 = sorted.slice(0, 15).map(p => ({ name: formatProgram(p.program).length > 30 ? formatProgram(p.program).slice(0, 30) + '…' : formatProgram(p.program), amount: p.amount }))

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Programs' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Farm Subsidy Programs</h1>
      <p className="text-gray-600 mb-6">All {sorted.length} USDA farm subsidy programs ranked by total amount from 2017 to 2025.</p>

      {/* Key Insights */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg">
          <p className="font-semibold text-gray-900">💡 Emergency Dominance</p>
          <p className="text-sm text-gray-700 mt-1">
            Emergency and ad-hoc programs (CFAP, MFP, disaster relief) now account for more spending than
            traditional programs like CRP and ARC/PLC in many years — a fundamental shift in how farm subsidies work.
          </p>
        </div>
        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg">
          <p className="font-semibold text-gray-900">💡 Program Concentration</p>
          <p className="text-sm text-gray-700 mt-1">
            The top 10 programs account for {fmtMoney(sorted.slice(0, 10).reduce((s, p) => s + p.amount, 0))} — 
            {((sorted.slice(0, 10).reduce((s, p) => s + p.amount, 0) / sorted.reduce((s, p) => s + p.amount, 0)) * 100).toFixed(0)}% of 
            all spending — while {sorted.length - 10} other programs share the remaining {((1 - sorted.slice(0, 10).reduce((s, p) => s + p.amount, 0) / sorted.reduce((s, p) => s + p.amount, 0)) * 100).toFixed(0)}%.
          </p>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">Top 15 Programs</h2>
        <ProgramsChart data={top15} />
      </section>

      <section>
        <ProgramsTableClient programs={sorted} />
      </section>

      {/* SEO Content */}
      <section className="mt-10 prose max-w-none text-gray-600">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Understanding Farm Subsidy Programs</h2>
        <p>
          The USDA Farm Service Agency administers {sorted.length} distinct subsidy programs, ranging from traditional
          commodity price supports to emergency disaster payments. Over the 9-year period from 2017 to 2025, these
          programs distributed {fmtMoney(sorted.reduce((s, p) => s + p.amount, 0))} across {fmt(sorted.reduce((s, p) => s + p.payments, 0))} individual payments.
        </p>
        <p>
          The landscape of farm subsidies shifted dramatically after 2017. Trade war tariffs in 2018-2019 triggered
          the Market Facilitation Program (MFP), and the COVID-19 pandemic led to the Coronavirus Food Assistance
          Program (CFAP) in 2020 — the largest single-year farm subsidy payout in U.S. history. These emergency
          programs now rival or exceed traditional conservation and commodity programs.
        </p>
        <p>
          Click any program to see its state-by-state breakdown and per-payment analysis. See our{' '}
          <Link href="/categories" className="text-primary hover:underline">program categories</Link> for a grouped view, or explore{' '}
          <Link href="/trends" className="text-primary hover:underline">spending trends</Link> to see how programs evolved over time.
        </p>
      </section>
    </main>
  )
}
