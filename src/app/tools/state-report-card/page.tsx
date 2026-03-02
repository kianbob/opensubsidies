import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import StateReportCardClient from './StateReportCardClient'

export const metadata: Metadata = {
  title: 'State Subsidy Report Card — Grade Your State\'s Farm Subsidies',
  description: 'Get a report card for any state with A-F grades on subsidy concentration, dependency, program diversity, conservation investment, and emergency spending.',
  alternates: { canonical: 'https://www.opensubsidies.org/tools/state-report-card' },
}

export default function StateReportCardPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'State Report Card' }]} />
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">📊 State Subsidy Report Card</h1>
        <p className="text-gray-600">Select a state to see how it grades on subsidy concentration, dependency, program diversity, and more.</p>
      </div>
      <Suspense fallback={<div className="text-center py-16 text-gray-400">Loading report card…</div>}>
        <StateReportCardClient />
      </Suspense>

      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">You Might Also Like</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/tools/state-profile" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">State Profile</h3>
            <p className="text-sm text-gray-600 mt-1">Deep dive into any state</p>
          </Link>
          <Link href="/tools/state-comparison" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">State Comparison</h3>
            <p className="text-sm text-gray-600 mt-1">Compare states side by side</p>
          </Link>
          <Link href="/analysis/state-winners-losers" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Winners & Losers</h3>
            <p className="text-sm text-gray-600 mt-1">Which states benefit most?</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
