import Link from 'next/link'
import { loadData } from '@/lib/server-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import StateComparisonClient from './StateComparisonClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'State Comparison Tool — Compare Farm Subsidies Across States',
  description: 'Compare farm subsidy data across 2-4 states side-by-side with per-capita spending, emergency program breakdowns, and bar charts.',
  alternates: { canonical: 'https://www.opensubsidies.org/tools/state-comparison' },
}

export default function StateComparisonPage() {
  const states = loadData('states.json')
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'State Comparison' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">State Comparison</h1>
      <p className="text-gray-600 mb-8">Compare farm subsidies across states with per-capita spending, emergency program breakdowns, and interactive charts.</p>
      <StateComparisonClient states={states} />

      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">You Might Also Like</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/tools/state-profile" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">State Profile</h3>
            <p className="text-sm text-gray-600 mt-1">Deep dive into any state</p>
          </Link>
          <Link href="/tools/state-report-card" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">State Report Card</h3>
            <p className="text-sm text-gray-600 mt-1">Grade your state on subsidies</p>
          </Link>
          <Link href="/analysis/per-capita" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Per Capita Analysis</h3>
            <p className="text-sm text-gray-600 mt-1">Subsidies per person by state</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
