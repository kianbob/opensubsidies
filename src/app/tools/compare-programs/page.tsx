import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import ProgramCompareClient from '@/components/ProgramCompareClient'

export const metadata: Metadata = {
  title: 'Compare Programs — Side-by-Side Farm Subsidy Program Comparison',
  description: 'Compare up to 4 USDA farm subsidy programs side-by-side on total spending, payment counts, and yearly trends.',
  alternates: { canonical: 'https://www.opensubsidies.us/tools/compare-programs' },
}

export default function CompareProgramsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Compare Programs' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Compare Programs</h1>
      <p className="text-gray-600 mb-8">Select up to 4 USDA farm subsidy programs to compare spending totals, payment counts, and yearly trends side-by-side.</p>
      <Suspense fallback={<div className="text-center py-16 text-gray-400">Loading comparison tool…</div>}>
        <ProgramCompareClient />
      </Suspense>
    </div>
  )
}
