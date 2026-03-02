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
    </div>
  )
}
