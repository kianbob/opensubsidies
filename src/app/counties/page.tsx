import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { loadData, fmt, fmtMoney } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import CountiesClient from '@/components/CountiesClient'

export const metadata: Metadata = {
  title: 'Farm Subsidies by County — 28,875 U.S. Counties Ranked',
  description: 'Search and explore farm subsidy payments across 28,875 U.S. counties. See which counties receive the most USDA farm subsidies.',
  alternates: { canonical: 'https://www.opensubsidies.us/counties' },
}

export default function CountiesPage() {
  const counties = loadData('counties.json') as { state: string; stateName: string; county: string; fips: string; payments: number; amount: number }[]
  const sorted = [...counties].sort((a, b) => b.amount - a.amount)
  const totalCountyAmount = sorted.reduce((s, c) => s + c.amount, 0)

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Counties' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Farm Subsidies by County</h1>
      <p className="text-gray-600 mb-6">Top {fmt(sorted.length)} counties ranked by total farm subsidy payments from 2017 to 2025.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 rounded-xl p-4"><p className="text-sm text-gray-500">Counties</p><p className="text-xl font-bold text-green-800">{fmt(sorted.length)}</p></div>
        <div className="bg-green-50 rounded-xl p-4"><p className="text-sm text-gray-500">#1 County</p><p className="text-xl font-bold text-green-800">{fmtMoney(sorted[0]?.amount)}</p></div>
        <div className="bg-green-50 rounded-xl p-4"><p className="text-sm text-gray-500">Top County</p><p className="text-xl font-bold text-green-800 text-sm">{sorted[0]?.county}, {sorted[0]?.state}</p></div>
        <div className="bg-green-50 rounded-xl p-4"><p className="text-sm text-gray-500">Avg per County</p><p className="text-xl font-bold text-green-800">{fmtMoney(totalCountyAmount / sorted.length)}</p></div>
      </div>

      <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg mb-8">
        <p className="font-semibold text-gray-900">💡 Key Insight</p>
        <p className="text-sm text-gray-700 mt-1">
          The top 100 counties received {fmtMoney(sorted.slice(0, 100).reduce((s, c) => s + c.amount, 0))} — 
          {((sorted.slice(0, 100).reduce((s, c) => s + c.amount, 0) / totalCountyAmount) * 100).toFixed(0)}% of all county-level subsidies
          from just {((100 / sorted.length) * 100).toFixed(1)}% of counties.
        </p>
      </div>

      <Suspense fallback={<p>Loading counties...</p>}>
        <CountiesClient counties={sorted} />
      </Suspense>

      <section className="mt-10 prose max-w-none text-gray-600">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Understanding County-Level Subsidies</h2>
        <p>
          Farm subsidies flow to individual recipients, but analyzing them at the county level reveals
          geographic patterns of agricultural concentration. Counties in the Great Plains and Midwest
          dominate the rankings, reflecting the concentration of commodity crop production in these regions.
        </p>
        <p>
          Use the search box above to find your county, or explore by <Link href="/states" className="text-primary hover:underline">state</Link>.
        </p>
      </section>
    </main>
  )
}
