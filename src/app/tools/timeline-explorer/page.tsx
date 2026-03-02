import Link from 'next/link'
import { loadData } from '@/lib/server-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import TimelineClient from './TimelineClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Timeline Explorer — Farm Subsidy Spending Over Time',
  description: 'Interactive timeline of U.S. farm subsidy spending from 2017-2025 with annotated events: Trade War, MFP, COVID CFAP, and ERP.',
  alternates: { canonical: 'https://www.opensubsidies.org/tools/timeline-explorer' },
}

export default function TimelineExplorerPage() {
  const yearly = loadData('yearly.json')
  const programYearly = loadData('program-yearly.json')
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Timeline Explorer' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Timeline Explorer</h1>
      <p className="text-gray-600 mb-8">Explore farm subsidy spending year by year with annotated policy events. Click any year to see the top programs and spending breakdown.</p>
      <TimelineClient yearly={yearly} programYearly={programYearly} />

      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">You Might Also Like</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/tools/compare-programs" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Compare Programs</h3>
            <p className="text-sm text-gray-600 mt-1">Side-by-side program comparison</p>
          </Link>
          <Link href="/tools/subsidy-tracker" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Subsidy Tracker</h3>
            <p className="text-sm text-gray-600 mt-1">Track payments over time</p>
          </Link>
          <Link href="/analysis/decade-of-disaster" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Decade of Disaster</h3>
            <p className="text-sm text-gray-600 mt-1">Emergency spending trends</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
