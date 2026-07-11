import Breadcrumbs from '@/components/Breadcrumbs'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'County Hotspots: Where Farm Subsidies Concentrate',
  description: 'Some individual counties receive more in farm subsidies than entire states. A look at the top 20 county hotspots and why billions flow to a handful of places.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/county-hotspots' },
  openGraph: {
    title: 'County Hotspots: Where Farm Subsidies Concentrate',
    description: 'Some individual counties receive more in farm subsidies than entire states. A look at the top 20 county hotspots.',
    url: 'https://www.opensubsidies.org/analysis/county-hotspots',
    type: 'article',
  },
}

export default function CountyHotspots() {
  const counties = loadData('counties.json') as { state: string; stateName: string; county: string; fips: string; payments: number; amount: number }[]
  const states = loadData('states.json') as { abbr: string; name: string; amount: number }[]
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalPrograms: number; dataYears: string }

  const top20 = counties.sort((a, b) => b.amount - a.amount).slice(0, 20)
  const topCountyAmount = top20[0].amount
  const allCountyTotal = counties.reduce((s, c) => s + c.amount, 0)
  const top20total = top20.reduce((s, c) => s + c.amount, 0)
  const top100 = counties.slice(0, 100)
  const top100total = top100.reduce((s, c) => s + c.amount, 0)
  const avgCounty = allCountyTotal / counties.length
  const medianIdx = Math.floor(counties.length / 2)

  // Find states that receive less than the #1 county
  const statesSorted = [...states].sort((a, b) => a.amount - b.amount)
  const statesBelowTopCounty = statesSorted.filter(s => s.amount < topCountyAmount)

  // State concentration among top 20
  const stateFreq: Record<string, number> = {}
  top20.forEach(c => { stateFreq[c.stateName] = (stateFreq[c.stateName] || 0) + 1 })
  const topStatesInTop20 = Object.entries(stateFreq).sort((a, b) => b[1] - a[1])

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="County Hotspots: Where Farm Subsidies Concentrate" description="Some individual counties receive more in farm subsidies than entire states. A look at the top 20 county hotspots." slug="analysis/county-hotspots" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'County Hotspots' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'County Hotspots: Where Farm Subsidies Concentrate',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies' }, datePublished: '2026-02-27',
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question', name: 'Which county receives the most farm subsidies in the United States?',
            acceptedAnswer: { '@type': 'Answer', text: `${top20[0].county} County, ${top20[0].stateName} is the top farm subsidy county, receiving ${fmtMoney(topCountyAmount)} — more than ${statesBelowTopCounty.length} entire states.` },
          },
          {
            '@type': 'Question', name: 'How concentrated are farm subsidies at the county level?',
            acceptedAnswer: { '@type': 'Answer', text: `Extremely concentrated. The top 20 counties account for ${fmtMoney(top20total)} (${((top20total / allCountyTotal) * 100).toFixed(1)}% of all county payments), while thousands of counties receive minimal or no farm subsidy dollars.` },
          },
          {
            '@type': 'Question', name: 'Why do some counties receive more farm subsidies than entire states?',
            acceptedAnswer: { '@type': 'Answer', text: 'Counties in the agricultural heartland — Great Plains, Central Valley, Mississippi Delta — have ideal conditions for commodity crops and large farm operations. Subsidies are tied to production and acreage, so these counties naturally dominate. States with smaller or more diversified agricultural sectors receive less overall.' },
          },
          {
            '@type': 'Question', name: 'Do farm subsidies help the economies of top-receiving counties?',
            acceptedAnswer: { '@type': 'Answer', text: 'Research suggests subsidies largely capitalize into land values rather than raising local incomes or reducing poverty. Landowners (who may not live in the county) benefit most, while local communities see limited economic uplift despite billions in federal payments flowing through.' },
          },
        ],
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          County Hotspots: Where Farm Subsidies Concentrate
        </h1>
        <ShareButtons title="" />
        <p className="text-lg text-gray-600">
          Farm subsidy dollars don&apos;t spread evenly across America&apos;s 3,000+ counties.
          A handful of agricultural powerhouses collect outsized shares — some individual counties
          receive more than entire states.
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

      {/* Stat cards */}
      <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        {[
          { label: 'Total Counties', value: fmt(counties.length), sub: 'In USDA data' },
          { label: 'Top County', value: fmtMoney(topCountyAmount), sub: `${top20[0].county}, ${top20[0].stateName}` },
          { label: 'Top 100 Share', value: `${((top100total / allCountyTotal) * 100).toFixed(0)}%`, sub: fmtMoney(top100total) },
          { label: 'Avg Per County', value: fmtMoney(avgCounty), sub: 'Across all counties' },
        ].map(s => (
          <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{s.value}</div>
            <div className="text-sm font-medium text-gray-900">{s.label}</div>
            <div className="text-xs text-gray-500">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="prose max-w-none">
        <h2 className="font-[family-name:var(--font-heading)]">The Top 20 Counties</h2>
        <p>
          These twenty counties represent the epicenter of American farm subsidy spending. Together they
          received {fmtMoney(top20total)} — an amount that would fund entire federal agencies. The
          concentration is remarkable: just 20 out of {fmt(counties.length)} counties account
          for {((top20total / allCountyTotal) * 100).toFixed(1)}% of all county-level payments.
        </p>
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
        <p>
          Consider the implication: a single county with a few thousand residents can attract more federal
          farm dollars than states with millions of people. States like Connecticut, New Hampshire, and
          Rhode Island — with their combined populations of over 6 million — receive less in total farm
          subsidies than one county in the Texas panhandle. This is what happens when federal spending
          is tied to acreage rather than population or need.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Which States Dominate the Top 20?</h2>
        <p>
          The top 20 county list isn&apos;t evenly distributed across the country.
          {topStatesInTop20.slice(0, 3).map(([state, count]) => ` ${state} has ${count} counties in the top 20.`).join('')}
          {' '}This geographic clustering reflects the commodities that dominate subsidy payments: wheat and
          cattle in the southern Plains, corn and soybeans in the Corn Belt, and cotton in the Mississippi Delta.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What Drives Concentration?</h2>
        <p>
          Several factors create county hotspots: soil quality and climate suited for commodity crops,
          large average farm sizes, historical enrollment in conservation programs, and proximity to
          disaster-prone regions. Counties in Texas and the southern Plains benefit disproportionately
          from livestock disaster programs, while Corn Belt counties dominate commodity payments.
        </p>
        <p>
          Farm size plays a crucial role. The average farm in top-subsidy counties tends to be significantly
          larger than the national average. Larger farms mean more eligible acres, which means larger payments
          under programs like ARC (Agriculture Risk Coverage) and PLC (Price Loss Coverage). The
          <Link href="/analysis/small-vs-large"> small vs. large farm analysis</Link> shows this pattern
          plays out at the recipient level too.
        </p>
        <p>
          Disaster programs amplify concentration further. When a hurricane hits the Gulf Coast or drought
          strikes the Plains, entire counties receive massive influxes of disaster payments. These events
          can push a county from middle-of-the-pack to top-20 status in a single year. The
          <Link href="/analysis/disaster-spending"> disaster spending analysis</Link> details how these
          programs have grown over time.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Rural Paradox</h2>
        <p>
          Despite billions flowing to these counties, many remain economically challenged. Farm
          subsidies tend to capitalize into land values rather than raising local incomes — meaning
          the money benefits landowners (who may live elsewhere) more than the communities themselves.
          This is the central paradox of place-based farm spending.
        </p>
        <p>
          Economic research consistently finds that farm subsidy payments inflate farmland prices by
          3-5% for every dollar of expected annual payment. In top-subsidy counties, this means land
          prices reflect not just productive value but embedded subsidy expectations. New farmers face
          higher entry costs, while existing landowners enjoy capital gains funded by taxpayers.
        </p>
        <p>
          Absentee ownership compounds the problem. In many top-subsidy counties, a significant share
          of farmland is owned by investors, retirees, or out-of-state entities who collect subsidy
          payments without living in or contributing to the local economy. The community sees trucks
          hauling grain, but the subsidy checks go elsewhere.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Bottom Half</h2>
        <p>
          While the top counties collect billions, the bottom half of all counties combined receive
          a fraction of total spending. These are counties with smaller farms, diversified agriculture,
          or specialty crops that don&apos;t qualify for major commodity programs. Many are in the
          Northeast, Pacific Northwest, or Southeast — regions with substantial agriculture but
          not the commodity-focused operations that dominate subsidy rolls.
        </p>
        <p>
          This distribution pattern means farm subsidy spending is even more concentrated than
          the <Link href="/analysis/per-capita">per-capita state analysis</Link> suggests. Within
          states, a handful of counties collect the majority of payments while most counties receive
          modest amounts or nothing at all.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Consolidation Pipeline</h2>
        <p>
          County-level concentration mirrors and accelerates farm consolidation. In top-subsidy
          counties, subsidy-inflated land values create barriers to entry for new farmers.
          When a small operation fails, its land is purchased by the large operation next door —
          the same operation that benefits most from subsidy payments. The county hotspot becomes
          a consolidation engine, reducing the number of farms while increasing average size.
        </p>
        <p>
          USDA Census of Agriculture data confirms this pattern. Counties with the highest subsidy
          payments have seen the fastest decline in farm count and the fastest growth in average
          farm size over the past two decades. Subsidies didn&apos;t prevent consolidation in
          these counties — they funded it.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Implications for Reform</h2>
        <p>
          The extreme geographic concentration of farm subsidies undermines the &quot;helping
          farmers&quot; narrative. If the goal is food security, subsidies could be distributed
          more broadly. If the goal is environmental stewardship, conservation programs like
          <Link href="/analysis/crp-conservation"> CRP</Link> could be prioritized over
          commodity payments. If the goal is rural economic development, the evidence suggests
          subsidies are a poor tool — they inflate land values without creating jobs or reducing
          poverty.
        </p>
        <p>
          The <Link href="/farm-subsidy-reform">farm subsidy reform analysis</Link> explores
          five data-backed proposals for addressing concentration, while the
          <Link href="/doge-farm-subsidies"> DOGE efficiency review</Link> asks whether 157
          programs delivering money to a handful of counties represents good governance.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Frequently Asked Questions</h2>

        <h3>Which county receives the most farm subsidies?</h3>
        <p>
          {top20[0].county} County, {top20[0].stateName} leads all U.S. counties with {fmtMoney(topCountyAmount)} in
          total farm subsidy payments. This single county receives more than {statesBelowTopCounty.length} entire states.
        </p>

        <h3>How concentrated are farm subsidies at the county level?</h3>
        <p>
          Extremely concentrated. The top 20 counties account for {((top20total / allCountyTotal) * 100).toFixed(1)}% of
          all county payments, and the top 100 counties collect {((top100total / allCountyTotal) * 100).toFixed(0)}%.
          Meanwhile, thousands of counties receive minimal or no farm subsidy dollars.
        </p>

        <h3>Do farm subsidies help local county economies?</h3>
        <p>
          Research suggests the economic benefits to local communities are limited. Subsidies primarily capitalize
          into higher land values, benefiting landowners rather than the broader community. Many top-subsidy
          counties continue to experience population decline and economic challenges despite billions in
          federal farm payments.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Sources</p>
          <p>USDA Farm Service Agency payment data ({stats.dataYears}). County-level aggregations from FSA payment files.
          Explore all counties on the <Link href="/counties" className="text-primary hover:underline">Counties page</Link> or
          search specific counties in the <Link href="/search" className="text-primary hover:underline">database</Link>.</p>
        </div>

        <RelatedArticles currentSlug="county-hotspots" />
      </div>
    </article>
  )
}
