import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import CompareClient from '@/components/CompareClient'

export const metadata: Metadata = {
  title: 'Compare States — Side-by-Side Farm Subsidy Comparison',
  description: 'Compare up to 4 states side-by-side on farm subsidy totals, payments, and top programs.',
  alternates: { canonical: 'https://www.opensubsidies.org/compare' },
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

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">Explore More</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { href: '/tools/state-comparison', title: 'State Comparison Tool', desc: 'Advanced side-by-side state comparison with charts.' },
            { href: '/rankings', title: 'State Rankings', desc: 'Rank all 50 states by subsidies, per-capita, and more.' },
            { href: '/state-dependency', title: 'State Dependency', desc: 'How dependent are states on federal farm subsidies?' },
          ].map(l => (
            <Link key={l.href} href={l.href} className="p-3 rounded-lg hover:bg-gray-50 border border-gray-100">
              <div className="font-semibold text-primary text-sm">{l.title}</div>
              <div className="text-xs text-gray-500">{l.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
