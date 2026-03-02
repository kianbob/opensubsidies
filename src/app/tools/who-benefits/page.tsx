import { loadData } from '@/lib/server-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import WhoBenefitsClient from './WhoBenefitsClient'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Who Benefits From Farm Subsidies? — Find Your Area',
  description: 'Enter your state or ZIP code to see which farm subsidy programs are active in your area, how much is spent per capita, and who the top local recipients are.',
  alternates: { canonical: 'https://www.opensubsidies.org/tools/who-benefits' },
}

export default function WhoBenefitsPage() {
  const states = loadData('states.json')
  const counties = loadData('counties.json')

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Who Benefits?' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Who Benefits From Farm Subsidies?</h1>
      <p className="text-gray-600 mb-8">
        Enter your state or ZIP code to discover how federal farm subsidies impact your area.
      </p>
      <WhoBenefitsClient states={states} counties={counties} />

      <section className="mt-16 prose max-w-none text-gray-600">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Understanding Farm Subsidy Impact</h2>
        <p>
          Farm subsidies are funded by federal tax dollars and distributed unevenly across the country.
          Some states receive thousands of dollars per person in subsidies while others receive almost nothing.
          This tool helps you understand the local impact by showing per-capita costs and which specific
          programs operate in your state.
        </p>
        <p>
          Data covers 9 years of USDA payments (2017–2025) including commodity programs, conservation payments,
          disaster relief, and trade war assistance. Per-capita figures use 2020 Census population data.
        </p>
      </section>

      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">Explore More</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/tools/subsidy-map-explorer" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Map Explorer</h3>
            <p className="text-sm text-gray-600 mt-1">Visual map of all states</p>
          </Link>
          <Link href="/tools/taxpayer-calculator" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Taxpayer Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Your tax dollars to subsidies</p>
          </Link>
          <Link href="/tools/county-finder" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">County Finder</h3>
            <p className="text-sm text-gray-600 mt-1">Find your county&apos;s subsidies</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
