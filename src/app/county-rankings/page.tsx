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
      {/* AI Overview */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3">📊 Why County-Level Data Matters</h2>
        <p className="text-sm text-gray-700 mb-3">
          State-level data hides enormous variation. Within Texas, a handful of Panhandle counties receive hundreds of millions in subsidies while urban counties like Harris (Houston) receive almost nothing. <strong>County rankings reveal the true geography of American farm subsidies</strong> — and it&apos;s far more concentrated than most people realize.
        </p>
        <p className="text-sm text-gray-700 mb-3">
          The top 100 counties by subsidy amount — just 0.3% of all U.S. counties — receive a disproportionate share of total farm payments. These counties cluster in the Great Plains (Kansas, Nebraska, the Dakotas) and the Mississippi Delta, reflecting the geography of commodity crop production. Counties dominated by fruits, vegetables, or livestock receive far less.
        </p>
        <p className="text-sm text-gray-700">
          <strong>What to look for:</strong> Compare counties by total amount to find the biggest recipients, or sort by average payment to see where individual payments are largest. High average payments often indicate larger farming operations or heavy emergency spending — both worth investigating.
        </p>
      </div>

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
