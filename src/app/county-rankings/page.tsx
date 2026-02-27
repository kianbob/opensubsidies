import { loadData } from '@/lib/server-utils'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import CountyRankingsClient from '@/components/CountyRankingsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'County Rankings — Farm Subsidies by County',
  description: 'Rank U.S. counties by total farm subsidies, number of payments, and average payment size. See which counties receive the most USDA subsidies.',
  alternates: { canonical: 'https://www.opensubsidies.org/county-rankings' },
}

export default function CountyRankingsPage() {
  const counties = loadData('county-index.json') as { state: string; stateName: string; county: string; fips: string; payments: number; amount: number }[]

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'County Rankings' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">County Rankings</h1>
      <p className="text-gray-600 mb-8">Compare counties by total subsidies, payment counts, and average payment size.</p>
      <CountyRankingsClient counties={counties} />

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">Explore More</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { href: '/counties', title: 'All Counties', desc: 'Browse farm subsidy data for every U.S. county.' },
            { href: '/tools/county-finder', title: 'County Finder', desc: 'Search for any county and see its subsidy details.' },
            { href: '/analysis/county-hotspots', title: 'County Hotspots', desc: 'Which counties receive the most concentrated subsidies?' },
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
