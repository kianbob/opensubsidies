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
    </div>
  )
}
