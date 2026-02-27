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
    </div>
  )
}
