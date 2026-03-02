import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import SubsidyTrackerClient from './SubsidyTrackerClient'

export const metadata: Metadata = {
  title: 'Track Your County\'s Subsidies — County Subsidy Tracker',
  description: 'Enter a county name or FIPS code to get a detailed breakdown of farm subsidies: top programs, comparison to state and national averages, and links to full data.',
  alternates: { canonical: 'https://www.opensubsidies.org/tools/subsidy-tracker' },
}

export default function SubsidyTrackerPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Subsidy Tracker' }]} />
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">📍 Track Your County&apos;s Subsidies</h1>
        <p className="text-gray-600">Enter a county name or FIPS code to see subsidy totals, comparisons, and more.</p>
      </div>
      <Suspense fallback={<div className="text-center py-16 text-gray-400">Loading tracker…</div>}>
        <SubsidyTrackerClient />
      </Suspense>

      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">You Might Also Like</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/tools/recipient-search" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Recipient Search</h3>
            <p className="text-sm text-gray-600 mt-1">Find specific subsidy recipients</p>
          </Link>
          <Link href="/tools/timeline-explorer" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Timeline Explorer</h3>
            <p className="text-sm text-gray-600 mt-1">Year-by-year spending history</p>
          </Link>
          <Link href="/analysis/double-dippers" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Double Dippers</h3>
            <p className="text-sm text-gray-600 mt-1">Recipients collecting from multiple programs</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
