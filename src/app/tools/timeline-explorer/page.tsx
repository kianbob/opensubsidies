import { loadData } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import TimelineClient from './TimelineClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Timeline Explorer — Farm Subsidy Spending Over Time',
  description: 'Interactive timeline of U.S. farm subsidy spending from 2017-2025 with annotated events: Trade War, MFP, COVID CFAP, and ERP.',
  alternates: { canonical: 'https://www.opensubsidies.us/tools/timeline-explorer' },
}

export default function TimelineExplorerPage() {
  const yearly = loadData('yearly.json')
  const programYearly = loadData('program-yearly.json')
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Timeline Explorer' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Timeline Explorer</h1>
      <p className="text-gray-600 mb-8">Explore farm subsidy spending year by year with annotated policy events. Click any year to see the top programs and spending breakdown.</p>
      <TimelineClient yearly={yearly} programYearly={programYearly} />
    </div>
  )
}
