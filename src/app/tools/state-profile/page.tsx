import { loadData } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import StateProfileClient from './StateProfileClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'State Subsidy Profile — Interactive State Deep-Dive',
  description: 'Select any U.S. state to see a rich profile: total subsidies, national rank, top programs, top counties, top recipients, and year-over-year spending chart.',
  alternates: { canonical: 'https://www.opensubsidies.us/tools/state-profile' },
}

export default function StateProfilePage() {
  const states = loadData('states.json')

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'State Profile' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">State Subsidy Profile</h1>
      <p className="text-gray-600 mb-8">
        Select a state to instantly see a rich profile card with key statistics, top programs, counties, recipients, and spending trends.
      </p>
      <StateProfileClient states={states} />

      <section className="mt-16 prose max-w-none text-gray-600">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">About State Profiles</h2>
        <p>
          Each state profile provides a comprehensive snapshot of farm subsidy activity. Data covers payments from 2000 through 2025
          across all USDA programs tracked by the Farm Subsidy Database. The national rank reflects total subsidy amounts across
          all 59 tracked jurisdictions including states, territories, and armed forces regions.
        </p>
        <p>
          Top programs, counties, and recipients are ranked by total payment amount. Year-over-year charts show spending trends
          with 2025 data marked as partial since the fiscal year is still in progress.
        </p>
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">How to Use This Tool</h2>
        <p>
          Choose a state from the dropdown to load its profile. Data is fetched on demand so the page stays fast.
          For deeper analysis, click the &quot;View full state page&quot; link to see county-level breakdowns, all programs, and more.
        </p>
      </section>
    </div>
  )
}
