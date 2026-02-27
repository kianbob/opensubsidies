import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import CountyFinderClient from './CountyFinderClient'

export const metadata: Metadata = {
  title: 'Find Your County\'s Farm Subsidies — County Finder Tool',
  description: 'Search all U.S. counties to find farm subsidy totals, payment counts, and more. Type-ahead search across 28,000+ counties.',
  alternates: { canonical: 'https://www.opensubsidies.us/tools/county-finder' },
}

export default function CountyFinderPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'County Finder' }]} />
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">🔍 Find Your County's Farm Subsidies</h1>
        <p className="text-gray-600">Search by county name to see how much your area receives in USDA farm subsidy payments.</p>
      </div>
      <Suspense fallback={<div className="text-center py-16 text-gray-400">Loading county finder…</div>}>
        <CountyFinderClient />
      </Suspense>
    </div>
  )
}
