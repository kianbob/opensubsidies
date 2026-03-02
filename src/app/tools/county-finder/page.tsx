import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import CountyFinderClient from './CountyFinderClient'

export const metadata: Metadata = {
  title: 'Find Your County\'s Farm Subsidies — County Finder Tool',
  description: 'Search all U.S. counties to find farm subsidy totals, payment counts, and more. Type-ahead search across 28,000+ counties.',
  alternates: { canonical: 'https://www.opensubsidies.org/tools/county-finder' },
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

      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">You Might Also Like</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/tools/recipient-search" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Recipient Search</h3>
            <p className="text-sm text-gray-600 mt-1">Find specific subsidy recipients</p>
          </Link>
          <Link href="/counties" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">All Counties</h3>
            <p className="text-sm text-gray-600 mt-1">Browse all county rankings</p>
          </Link>
          <Link href="/analysis/county-hotspots" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">County Hotspots</h3>
            <p className="text-sm text-gray-600 mt-1">Where subsidies concentrate</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
