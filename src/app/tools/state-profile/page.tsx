import { loadData } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import StateProfileClient from '@/components/StateProfileClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'State Subsidy Profile Generator — Farm Subsidy Stats by State',
  description: 'Generate a shareable profile card for any U.S. state showing total farm subsidies, national rank, top program, peak year, average payment, and spending trends.',
  alternates: { canonical: 'https://www.opensubsidies.us/tools/state-profile' },
}

export default function StateProfilePage() {
  const states = loadData('states.json')
  const stateYearly = loadData('state-yearly.json')
  const countyIndex = loadData('county-index.json') as { state: string }[]

  // Count unique counties per state abbreviation
  const countyCount: Record<string, number> = {}
  for (const c of countyIndex) {
    countyCount[c.state] = (countyCount[c.state] || 0) + 1
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'State Profile' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">State Subsidy Profile</h1>
      <p className="text-gray-600 mb-8">
        Select a state to generate a profile card with key farm subsidy statistics, spending trends, and top programs.
      </p>
      <StateProfileClient states={states} stateYearly={stateYearly} countyCount={countyCount} />
    </div>
  )
}
