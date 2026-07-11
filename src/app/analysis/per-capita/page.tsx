import Breadcrumbs from '@/components/Breadcrumbs'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Farm Subsidies Per Capita: Which States Get the Most Per Person?',
  description: 'North Dakota receives over $6,000 per person in farm subsidies while California gets under $100. See how farm subsidy spending breaks down per capita by state.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/per-capita' },
  openGraph: {
    title: 'Farm Subsidies Per Capita: Which States Get the Most Per Person?',
    description: 'North Dakota receives over $6,000 per person in farm subsidies while California gets under $100. See how farm subsidy spending breaks down per capita.',
    url: 'https://www.opensubsidies.org/analysis/per-capita',
    type: 'article',
  },
}

// Census 2024 estimated populations for state subsidy per-capita
const statePopulations: Record<string, number> = {
  TX: 30503000, IA: 3201000, KS: 2940000, MN: 5738000, NE: 1967000,
  ND: 783000, SD: 910000, IL: 12550000, MO: 6178000, GA: 10913000,
  AR: 3046000, MT: 1123000, OK: 4020000, OH: 11788000, IN: 6834000,
  WI: 5897000, CO: 5878000, CA: 38965000, LA: 4590000, MS: 2940000,
  NC: 10697000, WA: 7813000, FL: 22611000, MI: 10038000, AL: 5074000,
  OR: 4241000, ID: 1964000, VA: 8643000, PA: 12962000, KY: 4527000,
  TN: 7052000, SC: 5282000, NM: 2114000, NJ: 9290000, NY: 19572000,
  WY: 577000, AZ: 7431000, MD: 6180000, UT: 3418000, CT: 3619000,
  MA: 7002000, ME: 1396000, NH: 1396000, VT: 648000, WV: 1770000,
  RI: 1096000, HI: 1436000, NV: 3180000, DE: 1018000, DC: 678000,
}

export default function PerCapitaPage() {
  const states = loadData('states.json') as { abbr: string; name: string; amount: number; payments: number }[]
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalPrograms: number; dataYears: string }

  const withPerCapita = states
    .filter(s => statePopulations[s.abbr])
    .map(s => ({
      ...s,
      pop: statePopulations[s.abbr],
      perCapita: s.amount / statePopulations[s.abbr],
    }))
    .sort((a, b) => b.perCapita - a.perCapita)

  const totalPop = Object.values(statePopulations).reduce((s, p) => s + p, 0)
  const nationalPerCapita = stats.totalAmount / totalPop
  const top5 = withPerCapita.slice(0, 5)
  const bottom5 = withPerCapita.slice(-5)
  const medianState = withPerCapita[Math.floor(withPerCapita.length / 2)]
  const top5Total = top5.reduce((s, st) => s + st.amount, 0)
  const top5Pop = top5.reduce((s, st) => s + st.pop, 0)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="Farm Subsidies Per Capita: Which States Get the Most Per Person?" description="North Dakota receives over $6,000 per person in farm subsidies while California gets under $100." slug="analysis/per-capita" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Per Capita Analysis' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Farm Subsidies Per Capita by State',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies' }, datePublished: '2026-02-27',
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question', name: 'Which state receives the most farm subsidies per person?',
            acceptedAnswer: { '@type': 'Answer', text: `${withPerCapita[0]?.name} leads all states at $${withPerCapita[0]?.perCapita.toFixed(0)} per person in farm subsidies (2017-2025), driven by a small population and massive agricultural output in wheat, corn, and soybeans.` },
          },
          {
            '@type': 'Question', name: 'How much does the average American pay in farm subsidies?',
            acceptedAnswer: { '@type': 'Answer', text: `The national per-capita farm subsidy cost is approximately $${nationalPerCapita.toFixed(0)} per person based on total USDA FSA payments (2017-2025) divided by the estimated U.S. population.` },
          },
          {
            '@type': 'Question', name: 'Why do small states get more farm subsidies per capita?',
            acceptedAnswer: { '@type': 'Answer', text: 'States like North Dakota, South Dakota, and Montana have small populations but enormous agricultural land areas. Farm subsidies are tied to acreage and production, not population, so per-capita figures in farming states appear dramatically higher.' },
          },
          {
            '@type': 'Question', name: 'Does California receive fewer farm subsidies per capita than North Dakota?',
            acceptedAnswer: { '@type': 'Answer', text: `Yes. Despite being the nation's top agricultural producer by revenue, California receives under $100 per person in farm subsidies because its 39 million residents dilute the per-capita figure. North Dakota receives over 60 times more per person.` },
          },
        ],
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Farm Subsidies Per Capita: Which States Get the Most Per Person?
        </h1>
        <ShareButtons title="" />
        <p className="text-lg text-gray-600">
          Total spending tells one story. Per-capita spending tells another. When you divide farm subsidies
          by state population, the rankings shift dramatically — rural states with small populations dominate.
        </p>
      </div>

      <div className="prose max-w-none">
        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 Key Finding</p>
          <p className="text-sm text-gray-700 mt-1">
            {withPerCapita[0]?.name} leads at ${withPerCapita[0]?.perCapita.toFixed(0)} per person —
            over {Math.round(withPerCapita[0]?.perCapita / (withPerCapita.find(s => s.abbr === 'CA')?.perCapita || 1))}x what California receives per person.
          </p>
        </div>

        {/* Stat cards */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'National Per Capita', value: `$${nationalPerCapita.toFixed(0)}`, sub: 'All states combined' },
            { label: 'Highest Per Capita', value: `$${withPerCapita[0]?.perCapita.toFixed(0)}`, sub: withPerCapita[0]?.name },
            { label: 'Lowest Per Capita', value: `$${withPerCapita[withPerCapita.length - 1]?.perCapita.toFixed(0)}`, sub: withPerCapita[withPerCapita.length - 1]?.name },
            { label: 'Median State', value: `$${medianState?.perCapita.toFixed(0)}`, sub: medianState?.name },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm font-medium text-gray-900">{s.label}</div>
              <div className="text-xs text-gray-500">{s.sub}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Farm Subsidies Per Capita by State</h2>
        <p>
          The table below ranks every state by farm subsidy dollars received per person. The gap between
          top and bottom is staggering — a taxpayer in {withPerCapita[0]?.name} effectively &quot;receives&quot;
          {' '}${withPerCapita[0]?.perCapita.toFixed(0)} in agricultural support, while a resident
          of {withPerCapita[withPerCapita.length - 1]?.name} sees just ${withPerCapita[withPerCapita.length - 1]?.perCapita.toFixed(0)}.
          This disparity raises fundamental questions about whether farm policy serves national interests
          or narrow regional ones.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">#</th>
              <th className="px-4 py-3 text-left font-semibold">State</th>
              <th className="px-4 py-3 text-right font-semibold">Per Capita</th>
              <th className="px-4 py-3 text-right font-semibold hidden md:table-cell">Total</th>
              <th className="px-4 py-3 text-right font-semibold hidden lg:table-cell">Population</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {withPerCapita.map((s, i) => (
              <tr key={s.abbr} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                <td className="px-4 py-3"><Link href={`/states/${s.abbr.toLowerCase()}`} className="text-primary hover:underline font-medium">{s.name}</Link></td>
                <td className="px-4 py-3 text-right font-mono font-bold text-primary">${s.perCapita.toFixed(0)}</td>
                <td className="px-4 py-3 text-right font-mono text-gray-600 hidden md:table-cell">{fmtMoney(s.amount)}</td>
                <td className="px-4 py-3 text-right text-gray-500 hidden lg:table-cell">{fmt(s.pop)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose max-w-none">
        <h2 className="font-[family-name:var(--font-heading)]">Why Per Capita Matters</h2>
        <p>
          Texas may receive the most total farm subsidy dollars, but when you account for population,
          the picture changes completely. States like North Dakota, South Dakota, and Kansas — with
          small populations and massive agricultural sectors — receive far more per person.
        </p>
        <p>
          This means that in farming states, a much larger share of the state&apos;s economic activity
          is subsidized by federal taxpayers. The per-capita view raises important questions about
          how farm policy distributes costs and benefits across the country.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Top 5 vs. Bottom 5</h2>
        <p>
          The five states with the highest per-capita subsidies — {top5.map(s => s.name).join(', ')} —
          have a combined population of just {fmt(top5Pop)} but received {fmtMoney(top5Total)} in
          farm subsidies. That&apos;s a per-capita average of ${(top5Total / top5Pop).toFixed(0)}.
        </p>
        <p>
          Meanwhile, the five lowest per-capita states — {bottom5.map(s => s.name).join(', ')} — are
          home to tens of millions of taxpayers who fund these programs through federal taxes but see
          virtually no direct benefit. A resident of {bottom5[bottom5.length - 1]?.name} receives
          just ${bottom5[bottom5.length - 1]?.perCapita.toFixed(0)} per person — less than the cost
          of a single fast-food meal.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The California Paradox</h2>
        <p>
          California is America&apos;s largest agricultural state by revenue, producing over $50 billion
          in farm output annually. Yet it ranks near the bottom in per-capita farm subsidies. Why?
          Because California&apos;s agriculture is dominated by fruits, vegetables, and nuts — crops
          that largely don&apos;t receive commodity subsidies. The subsidy system overwhelmingly favors
          corn, soybeans, wheat, cotton, and rice — the commodity crops of the Midwest and South.
        </p>
        <p>
          This means the per-capita subsidy map is really a map of <em>which crops Congress has chosen
          to subsidize</em>, not a map of agricultural importance. California&apos;s farmers produce
          more value with less federal support, while Plains states rely heavily on taxpayer payments
          to maintain their agricultural economies.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Population Trends and Subsidy Concentration</h2>
        <p>
          Rural depopulation compounds the per-capita effect. As young people leave farming states for
          cities, the remaining population collects an ever-larger per-person share of farm subsidies.
          North Dakota&apos;s population has barely grown in decades, while its farm subsidies have surged
          with emergency programs and trade war bailouts. The result: a shrinking population collecting
          a growing pile of federal dollars.
        </p>
        <p>
          This dynamic creates perverse political incentives. States with the smallest populations —
          and thus the fewest voters — receive the most per-capita farm spending. Yet each of these
          states gets two U.S. senators, giving them outsized influence over agricultural policy.
          The <Link href="/analysis/state-winners-losers">state winners and losers analysis</Link> shows
          how emergency spending has amplified these disparities.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What the Per-Capita View Reveals About Reform</h2>
        <p>
          If farm subsidies were truly about supporting American agriculture broadly, per-capita spending
          would be more evenly distributed. The extreme concentration in a handful of low-population states
          suggests these programs serve narrow interests rather than national food security. Reform proposals
          that include <Link href="/farm-subsidy-reform">means-testing</Link> and payment caps could
          help address this imbalance.
        </p>
        <p>
          The <Link href="/analysis/subsidy-concentration">subsidy concentration analysis</Link> reveals
          a parallel pattern at the recipient level: the top 10% of recipients collect roughly 70% of
          all payments. When you combine geographic concentration (a few states) with recipient concentration
          (a few large operations), the reality becomes clear — farm subsidies are a targeted wealth
          transfer, not a broad safety net.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">How Emergency Spending Changed the Map</h2>
        <p>
          The per-capita rankings shifted notably during the trade war (2018-2019) and COVID pandemic (2020).
          States with large soybean and livestock operations saw their per-capita subsidies surge as
          <Link href="/analysis/trade-war"> MFP trade bailout payments</Link> and
          <Link href="/analysis/covid-spending"> CFAP pandemic relief</Link> flooded the system. Some
          states saw their per-capita figures double or triple in a single year, only to partially
          recede afterward — leaving a permanently elevated baseline.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Frequently Asked Questions</h2>

        <h3>Which state receives the most farm subsidies per person?</h3>
        <p>
          {withPerCapita[0]?.name} receives the most at ${withPerCapita[0]?.perCapita.toFixed(0)} per
          person, driven by its small population ({fmt(withPerCapita[0]?.pop)}) and large-scale wheat,
          corn, and soybean production. The state&apos;s per-capita figure is over {Math.round(withPerCapita[0]?.perCapita / nationalPerCapita)}x
          the national average.
        </p>

        <h3>How much does the average American pay in farm subsidies?</h3>
        <p>
          Nationally, farm subsidy spending works out to approximately ${nationalPerCapita.toFixed(0)} per
          person across all states. This figure covers the {stats.dataYears} period and includes
          all {stats.totalPrograms} USDA Farm Service Agency programs — from commodity payments to
          conservation to disaster relief.
        </p>

        <h3>Why do small states get more farm subsidies per capita?</h3>
        <p>
          Farm subsidies are tied to acreage and production volume, not population. States with vast
          farmland but few people — like the Dakotas, Montana, and Wyoming — naturally show higher
          per-capita figures. A single large wheat farm in North Dakota might receive more in subsidies
          than an entire neighborhood of taxpayers in New Jersey contribute.
        </p>

        <h3>Does California receive fewer farm subsidies per capita than North Dakota?</h3>
        <p>
          Yes — dramatically fewer. Despite producing more agricultural revenue than any other state,
          California receives under $100 per person because its 39 million residents dilute the figure,
          and its specialty crop agriculture (fruits, vegetables, nuts) doesn&apos;t qualify for most
          commodity subsidy programs. North Dakota receives over 60x more per person.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Methodology</p>
          <p>Farm subsidy data from USDA FSA ({stats.dataYears}). Population estimates from U.S. Census Bureau (2024).
          Per capita = total state subsidies ÷ state population. Explore individual states on the{' '}
          <Link href="/rankings" className="text-primary hover:underline">state rankings page</Link> or
          compare states with the <Link href="/compare" className="text-primary hover:underline">comparison tool</Link>.</p>
        </div>

        <div className="not-prose bg-green-50 border-l-4 border-primary p-6 rounded-r-lg my-8">
          <h3 className="font-semibold text-gray-900 mb-2">Related Analysis</h3>
          <ul className="space-y-2 text-sm">
            <li>→ <Link href="/analysis/state-winners-losers" className="text-primary hover:underline">State Winners &amp; Losers from Emergency Spending</Link></li>
            <li>→ <Link href="/analysis/small-vs-large" className="text-primary hover:underline">Small Farms vs. Large Operations</Link></li>
            <li>→ <Link href="/analysis/subsidy-concentration" className="text-primary hover:underline">Subsidy Concentration: Who Gets the Most?</Link></li>
            <li>→ <Link href="/analysis/county-hotspots" className="text-primary hover:underline">County Hotspots: Where Subsidies Concentrate</Link></li>
            <li>→ <Link href="/doge-farm-subsidies" className="text-primary hover:underline">DOGE and Farm Subsidies</Link></li>
          </ul>
        </div>

        <RelatedArticles currentSlug="per-capita" />
      </div>
    </article>
  )
}
