import Breadcrumbs from '@/components/Breadcrumbs'
import SubsidyTimelineClient from './TimelineClient'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Subsidy Timeline — History of U.S. Farm Subsidies',
  description: 'Interactive timeline of U.S. farm subsidy history from 1933 to 2025. Explore key Farm Bills, emergency spending events, program milestones, and policy shifts.',
  alternates: { canonical: 'https://www.opensubsidies.org/tools/subsidy-timeline' },
}

export default function SubsidyTimelinePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Subsidy Timeline' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Farm Subsidy Timeline</h1>
      <p className="text-gray-600 mb-8">
        92 years of U.S. farm subsidies — from the New Deal to today&apos;s $9.4 billion emergency programs.
        Click any event to learn more.
      </p>
      <SubsidyTimelineClient />

      <section className="mt-16 prose max-w-none text-gray-600">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">About This Timeline</h2>
        <p>
          This interactive timeline traces the history of U.S. farm subsidies from the Agricultural Adjustment Act
          of 1933 through the latest emergency spending programs in 2025. Events are categorized as legislation
          (Farm Bills and major acts), crises (trade wars, COVID, natural disasters), program launches, and
          spending milestones.
        </p>
        <p>
          A recurring pattern emerges: Congress attempts market-oriented reforms (1996, 2014), but emergency
          spending consistently grows to fill the gap. Since 2018, emergency and ad-hoc programs have distributed
          over $50 billion — more than many traditional programs combined.
        </p>
      </section>

      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">Related</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/farm-bill" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Farm Bill Guide</h3>
            <p className="text-sm text-gray-600 mt-1">Understanding the Farm Bill</p>
          </Link>
          <Link href="/tools/program-compare" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Program Compare</h3>
            <p className="text-sm text-gray-600 mt-1">Compare programs side by side</p>
          </Link>
          <Link href="/trends" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Spending Trends</h3>
            <p className="text-sm text-gray-600 mt-1">Year-over-year spending data</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
