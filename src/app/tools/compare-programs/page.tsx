import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import ProgramCompareClient from '@/components/ProgramCompareClient'

export const metadata: Metadata = {
  title: 'Compare Programs — Side-by-Side Farm Subsidy Program Comparison',
  description: 'Compare up to 4 USDA farm subsidy programs side-by-side on total spending, payment counts, and yearly trends.',
  alternates: { canonical: 'https://www.opensubsidies.org/tools/compare-programs' },
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

      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">You Might Also Like</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/tools/program-explorer" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Program Explorer</h3>
            <p className="text-sm text-gray-600 mt-1">Browse all 157 USDA programs</p>
          </Link>
          <Link href="/tools/timeline-explorer" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Timeline Explorer</h3>
            <p className="text-sm text-gray-600 mt-1">See spending over time</p>
          </Link>
          <Link href="/analysis/program-proliferation" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Program Proliferation</h3>
            <p className="text-sm text-gray-600 mt-1">Why there are so many programs</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
