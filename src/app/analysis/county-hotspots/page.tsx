import Breadcrumbs from '@/components/Breadcrumbs'
import { loadData, fmtMoney, fmt } from '@/lib/utils'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'County Hotspots: Where Farm Subsidies Concentrate',
  description: 'Some individual counties receive more in farm subsidies than entire states. A look at the top 20 county hotspots.',
}

export default function CountyHotspots() {
  const counties = loadData('counties.json') as { state: string; stateName: string; county: string; fips: string; payments: number; amount: number }[]
  const states = loadData('states.json') as { abbr: string; name: string; amount: number }[]

  const top20 = counties.sort((a, b) => b.amount - a.amount).slice(0, 20)
  const topCountyAmount = top20[0].amount
  const allCountyTotal = counties.reduce((s, c) => s + c.amount, 0)
  const top20total = top20.reduce((s, c) => s + c.amount, 0)

  // Find states that receive less than the #1 county
  const statesSorted = [...states].sort((a, b) => a.amount - b.amount)
  const statesBelowTopCounty = statesSorted.filter(s => s.amount < topCountyAmount)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'County Hotspots' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'County Hotspots: Where Farm Subsidies Concentrate',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies' }, datePublished: '2026-02-27',
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          County Hotspots: Where Farm Subsidies Concentrate
        </h1>
        <p className="text-lg text-gray-600">
          Farm subsidy dollars don&apos;t spread evenly across America&apos;s 3,000+ counties.
          A handful of agricultural powerhouses collect outsized shares.
        </p>
      </div>

      {/* Key Finding */}
      <div className="bg-green-50 border-l-4 border-primary p-5 rounded-r-lg mb-8">
        <p className="font-semibold text-primary text-sm uppercase tracking-wide mb-1">Key Finding</p>
        <p className="text-gray-900 font-medium">
          {top20[0].county} County, {top20[0].stateName} alone received {fmtMoney(topCountyAmount)} —
          more than {statesBelowTopCounty.length} entire states. The top 20 counties account
          for {fmtMoney(top20total)} ({((top20total / allCountyTotal) * 100).toFixed(1)}% of all county payments).
        </p>
      </div>

      <div className="prose max-w-none">
        <h2 className="font-[family-name:var(--font-heading)]">The Top 20 Counties</h2>
        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">#</th>
                  <th className="px-4 py-2 text-left font-semibold">County</th>
                  <th className="px-4 py-2 text-left font-semibold">State</th>
                  <th className="px-4 py-2 text-right font-semibold">Total</th>
                  <th className="px-4 py-2 text-right font-semibold">Payments</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {top20.map((c, i) => (
                  <tr key={c.fips} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-2 font-medium">{c.county}</td>
                    <td className="px-4 py-2 text-gray-600">{c.stateName}</td>
                    <td className="px-4 py-2 text-right font-mono text-primary">{fmtMoney(c.amount)}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{fmt(c.payments)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Counties vs. States</h2>
        <p>
          The geographic concentration is striking. {top20[0].county} County ({top20[0].stateName})
          with {fmtMoney(topCountyAmount)} in total payments exceeds the entire state totals
          of {statesBelowTopCounty.length} states. This happens because subsidy-heavy counties tend to be
          in the agricultural heartland — the Great Plains, Central Valley of California, and the Mississippi
          Delta — where large-scale commodity farming dominates.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What Drives Concentration?</h2>
        <p>
          Several factors create county hotspots: soil quality and climate suited for commodity crops,
          large average farm sizes, historical enrollment in conservation programs, and proximity to
          disaster-prone regions. Counties in Texas and the southern Plains benefit disproportionately
          from livestock disaster programs, while Corn Belt counties dominate commodity payments.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Rural Paradox</h2>
        <p>
          Despite billions flowing to these counties, many remain economically challenged. Farm
          subsidies tend to capitalize into land values rather than raising local incomes — meaning
          the money benefits landowners (who may live elsewhere) more than the communities themselves.
          This is the central paradox of place-based farm spending.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Sources</p>
          <p>USDA Farm Service Agency payment data (1995–2024). County-level aggregations from FSA payment files.
          Explore all counties on the <Link href="/counties" className="text-primary hover:underline">Counties page</Link>.</p>
        </div>
      </div>
    </article>
  )
}
