import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import CompareClient from '@/components/CompareClient'

export const metadata: Metadata = {
  title: 'Compare States — Side-by-Side Farm Subsidy Comparison',
  description: 'Compare up to 4 states side-by-side on farm subsidy totals, payments, and top programs.',
}

export default function ComparePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Compare States' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Compare States</h1>
      <p className="text-gray-600 mb-8">Select up to 4 states to compare farm subsidy totals, payment counts, and top programs side-by-side.</p>
      <Suspense fallback={<div className="text-center py-16 text-gray-400">Loading comparison tool…</div>}>
        <CompareClient />
      </Suspense>
    </div>
  )
}
