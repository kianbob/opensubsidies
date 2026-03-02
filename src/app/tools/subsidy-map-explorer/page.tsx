import { loadData } from '@/lib/server-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import MapExplorerClient from './MapExplorerClient'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Subsidy Map Explorer — Interactive State Farm Subsidy Map',
  description: 'Explore an interactive map of U.S. farm subsidies by state. See top programs, per-capita spending, farm dependency ratios, and recipient rankings for all 50 states.',
  alternates: { canonical: 'https://www.opensubsidies.org/tools/subsidy-map-explorer' },
}

export default function SubsidyMapExplorerPage() {
  const states = loadData('states.json')
  const dependency = loadData('state-dependency.json')

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Subsidy Map Explorer' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Subsidy Map Explorer</h1>
      <p className="text-gray-600 mb-8">
        Click any state on the map to see total subsidies, top programs, per-capita spending, and farm dependency ratios.
      </p>
      <MapExplorerClient states={states} dependency={dependency} />

      <section className="mt-16 prose max-w-none text-gray-600">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">About This Tool</h2>
        <p>
          The Subsidy Map Explorer provides a visual overview of how $147 billion in USDA farm subsidies
          are distributed across the United States. States are color-coded by total subsidy amount, and
          clicking any state reveals detailed breakdowns including top programs and farm income dependency ratios.
        </p>
        <p>
          Per-capita figures use 2020 Census population data. Farm dependency ratios show what percentage of
          a state&apos;s total farm income comes from federal subsidy payments.
        </p>
      </section>

      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">Related Tools</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/tools/state-profile" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">State Profile</h3>
            <p className="text-sm text-gray-600 mt-1">Deep-dive into any state</p>
          </Link>
          <Link href="/tools/who-benefits" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Who Benefits?</h3>
            <p className="text-sm text-gray-600 mt-1">Find subsidies in your area</p>
          </Link>
          <Link href="/state-dependency" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">State Dependency</h3>
            <p className="text-sm text-gray-600 mt-1">Which states rely most on subsidies</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
