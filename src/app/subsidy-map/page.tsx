import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { loadData } from '@/lib/server-utils'
import MapClient from './MapClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Farm Subsidy Map: Every State Ranked by USDA Payments (2017–2025)',
  description: 'Interactive ranking of all 50 states by total farm subsidies, per-capita spending, and dependency on federal payments. Texas leads with $12.6B, but North Dakota is most dependent at 69%.',
  alternates: { canonical: 'https://www.opensubsidies.org/subsidy-map' },
}

export default function SubsidyMapPage() {
  const states = loadData('states.json')
  const dependency = loadData('state-dependency.json')

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Subsidy Map' }]} />

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Farm Subsidy Map: Every State Ranked by USDA Payments
        </h1>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-lg text-gray-600">Explore $147B+ in farm subsidies across all 50 states. Sort by total amount, per capita, or dependency percentage.</p>
          <ShareButtons title="Farm Subsidy Map: Every State Ranked" />
        </div>
      </div>

      <MapClient states={states} dependency={dependency} />

      <section className="mt-12 prose max-w-none text-gray-600">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Geographic Distribution of Farm Subsidies</h2>
        <p>
          Farm subsidies in the United States are far from evenly distributed. The top 10 states account for roughly 60% of
          all USDA subsidy payments, with Texas, Iowa, and Kansas leading the pack. This concentration reflects the geographic
          reality of American agriculture — the Great Plains and Midwest dominate commodity crop production.
        </p>
        <p>
          But raw totals don&apos;t tell the whole story. When measured per capita, rural states like North Dakota and South Dakota
          surge to the top. And when measured as a percentage of total farm income, North Dakota&apos;s 69% dependency rate reveals
          how deeply some state economies rely on federal payments — compared to California&apos;s mere 2%.
        </p>
        <p>
          This geographic disparity has major implications for farm policy debates. States that receive the most subsidies per
          capita tend to have outsized political influence on farm bill negotiations, particularly through the Senate where every
          state gets equal representation regardless of population.
        </p>
        <p>
          For deeper analysis, see <Link href="/analysis/state-disparities" className="text-primary hover:underline">State Disparities</Link>,{' '}
          <Link href="/analysis/per-capita" className="text-primary hover:underline">Per Capita Analysis</Link>, and{' '}
          <Link href="/state-dependency" className="text-primary hover:underline">State Dependency Rankings</Link>.
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Dataset',
          name: 'U.S. Farm Subsidy Payments by State (2017–2025)',
          description: 'Total USDA farm subsidy payments to all 50 states and territories from 2017 to 2025.',
          url: 'https://www.opensubsidies.org/subsidy-map',
          creator: { '@type': 'Organization', name: 'OpenSubsidies' },
        }) }}
      />
    </div>
  )
}
