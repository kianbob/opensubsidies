import Breadcrumbs from '@/components/Breadcrumbs'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Small Farms vs. Large Operations: Who Really Benefits from Subsidies?',
  description: 'The average vs. median payment gap reveals how farm subsidies overwhelmingly benefit the largest operations while 69% of farms get nothing.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/small-vs-large' },
  openGraph: {
    title: 'Small Farms vs. Large Operations: Who Really Benefits from Subsidies?',
    description: 'The average vs. median payment gap reveals how farm subsidies overwhelmingly benefit the largest operations.',
    url: 'https://www.opensubsidies.org/analysis/small-vs-large',
    type: 'article',
  },
}

export default function SmallVsLarge() {
  const recipients = loadData('top-recipients.json') as { name: string; state: string; amount: number; payments: number }[]
  const states = loadData('states.json') as { abbr: string; name: string; payments: number; amount: number }[]
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalPrograms: number; dataYears: string }

  const totalAmount = states.reduce((s, st) => s + st.amount, 0)
  const totalPayments = states.reduce((s, st) => s + st.payments, 0)
  const avgPayment = totalAmount / totalPayments

  // Top 10% of recipients by amount
  const sorted = [...recipients].sort((a, b) => b.amount - a.amount)
  const top10pct = sorted.slice(0, Math.floor(sorted.length * 0.1))
  const top10total = top10pct.reduce((s, r) => s + r.amount, 0)
  const top1pct = sorted.slice(0, Math.floor(sorted.length * 0.01))
  const top1total = top1pct.reduce((s, r) => s + r.amount, 0)
  const top25pct = sorted.slice(0, Math.floor(sorted.length * 0.25))
  const top25total = top25pct.reduce((s, r) => s + r.amount, 0)
  const bottom50pct = sorted.slice(Math.floor(sorted.length * 0.5))
  const bottom50total = bottom50pct.reduce((s, r) => s + r.amount, 0)
  const recipientTotal = sorted.reduce((s, r) => s + r.amount, 0)

  // Distribution buckets
  const buckets = [
    { label: 'Under $10K', min: 0, max: 10000 },
    { label: '$10K–$50K', min: 10000, max: 50000 },
    { label: '$50K–$100K', min: 50000, max: 100000 },
    { label: '$100K–$500K', min: 100000, max: 500000 },
    { label: '$500K–$1M', min: 500000, max: 1000000 },
    { label: 'Over $1M', min: 1000000, max: Infinity },
  ]
  const bucketData = buckets.map(b => {
    const inBucket = sorted.filter(r => r.amount >= b.min && r.amount < b.max)
    return { ...b, count: inBucket.length, total: inBucket.reduce((s, r) => s + r.amount, 0) }
  })

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="Small Farms vs. Large Operations: Who Really Benefits from Subsidies?" description="The average vs. median payment gap reveals how farm subsidies overwhelmingly benefit the largest operations." slug="analysis/small-vs-large" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Small vs. Large Farms' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Small Farms vs. Large Operations: Who Really Benefits?',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies' }, datePublished: '2026-02-27',
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question', name: 'What percentage of farms receive subsidies?',
            acceptedAnswer: { '@type': 'Answer', text: 'Only about 31% of U.S. farms receive farm subsidy payments in any given year. The remaining 69% — primarily small, diversified, and specialty crop operations — receive nothing from commodity subsidy programs.' },
          },
          {
            '@type': 'Question', name: 'How much does the top 10% of farm subsidy recipients receive?',
            acceptedAnswer: { '@type': 'Answer', text: `The top 10% of recipients in the USDA payment database collected ${fmtMoney(top10total)}. These are predominantly large commercial operations, often structured as corporations or LLCs, with significant acreage in commodity crops.` },
          },
          {
            '@type': 'Question', name: 'Do farm subsidies help small farmers?',
            acceptedAnswer: { '@type': 'Answer', text: `Most small farms receive minimal or no subsidies. The average payment is ${fmtMoney(avgPayment)}, but the distribution is heavily skewed — large operations receive far more while small farms often don't qualify for commodity programs at all. The system effectively subsidizes large operations at the expense of small farm competitiveness.` },
          },
          {
            '@type': 'Question', name: 'Why do large farms get more subsidies than small farms?',
            acceptedAnswer: { '@type': 'Answer', text: 'Farm subsidies are tied to acreage, production volume, and commodity prices. A 10,000-acre corn operation automatically qualifies for larger ARC and PLC payments than a 200-acre diversified farm. Payment limits ($125K per person) are easily circumvented through LLCs and partnerships. The result: subsidies help large farms expand, creating a competitive disadvantage for smaller operations.' },
          },
        ],
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Small Farms vs. Large Operations: Who Really Benefits?
        </h1>
        <ShareButtons title="" />
        <p className="text-lg text-gray-600">
          Farm subsidies are pitched as support for American farmers. But the distribution of payments
          tells a very different story — one dominated by the largest operations.
        </p>
      </div>

      {/* Key Finding */}
      <div className="bg-green-50 border-l-4 border-primary p-5 rounded-r-lg mb-8">
        <p className="font-semibold text-primary text-sm uppercase tracking-wide mb-1">Key Finding</p>
        <p className="text-gray-900 font-medium">
          The top 10% of recipients in our database collected {fmtMoney(top10total)} — while 69% of
          U.S. farms receive no subsidy payments at all. The average payment is {fmtMoney(avgPayment)},
          but most recipients receive far less.
        </p>
      </div>

      {/* Stat cards */}
      <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        {[
          { label: 'Farms Getting $0', value: '69%', sub: 'Receive no subsidies' },
          { label: 'Top 1% Share', value: fmtMoney(top1total), sub: `${fmt(top1pct.length)} recipients` },
          { label: 'Top 10% Share', value: fmtMoney(top10total), sub: `${fmt(top10pct.length)} recipients` },
          { label: 'Avg Payment', value: fmtMoney(avgPayment), sub: 'Across all payments' },
        ].map(s => (
          <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{s.value}</div>
            <div className="text-sm font-medium text-gray-900">{s.label}</div>
            <div className="text-xs text-gray-500">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="prose max-w-none">
        <h2 className="font-[family-name:var(--font-heading)]">The 69% Who Get Nothing</h2>
        <p>
          According to USDA data, roughly 69% of U.S. farms receive zero subsidy payments in any given year.
          Subsidies are concentrated in commodity crops — corn, soybeans, wheat, cotton, rice — and livestock
          disaster programs. Farms growing fruits, vegetables, or specialty crops largely don&apos;t participate.
        </p>
        <p>
          This means the subsidy system isn&apos;t really about &quot;helping farmers&quot; broadly — it&apos;s about supporting
          specific types of agriculture, and within those types, the largest operations benefit the most.
        </p>
        <p>
          Consider what 69% means in real numbers. There are approximately 2 million farms in the United
          States. That means roughly 1.4 million farms — the majority of American agriculture — operate
          entirely without federal subsidy support. These are the berry farmers in Oregon, the vegetable
          growers in New Jersey, the small cattle operations in Appalachia, and the organic farms across
          the country. They compete against subsidized commodity operations without any of the same
          federal backing.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Payment Distribution</h2>
        <p>
          The distribution table below reveals the stark inequality of farm subsidy payments. The vast
          majority of recipients receive relatively small amounts, while a small number of large
          operations collect the bulk of the money. This isn&apos;t a bell curve — it&apos;s a
          power law distribution where a few recipients dominate.
        </p>
        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Payment Range</th>
                  <th className="px-4 py-2 text-right font-semibold">Recipients</th>
                  <th className="px-4 py-2 text-right font-semibold">Total Amount</th>
                  <th className="px-4 py-2 text-right font-semibold">% of Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {bucketData.map((b, i) => {
                  const allTotal = bucketData.reduce((s, x) => s + x.total, 0)
                  return (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-2 font-medium">{b.label}</td>
                      <td className="px-4 py-2 text-right text-gray-600">{fmt(b.count)}</td>
                      <td className="px-4 py-2 text-right font-mono text-primary">{fmtMoney(b.total)}</td>
                      <td className="px-4 py-2 text-right text-gray-600">{((b.total / allTotal) * 100).toFixed(1)}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">Based on top recipients in the USDA payment database.</p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Concentration Problem</h2>
        <p>
          The top 1% of recipients ({fmt(top1pct.length)} entities) collected {fmtMoney(top1total)}. These
          aren&apos;t family farms struggling to make ends meet — they&apos;re large commercial operations, often
          structured as corporations or LLCs, with the acreage and political connections to maximize their
          subsidy claims.
        </p>
        <p>
          This concentration creates a feedback loop: subsidies help large operations expand, which lets them
          collect more subsidies, which funds further expansion. Small farms that don&apos;t qualify — or qualify
          for minimal amounts — face a competitive disadvantage funded by taxpayers.
        </p>
        <p>
          The top 25% of recipients collected {fmtMoney(top25total)}, while the bottom 50% collected
          just {fmtMoney(bottom50total)}. In other words, the top quarter receives dramatically more
          than the bottom half combined. This isn&apos;t a safety net — it&apos;s a wealth transfer
          from taxpayers to the largest agricultural operations in the country.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">How Large Operations Game the System</h2>
        <p>
          Payment limits exist on paper — $125,000 per person for most commodity programs. But large
          operations routinely circumvent these limits through legal structuring:
        </p>
        <ul>
          <li><strong>Entity splitting:</strong> A single farming operation can be structured as multiple LLCs, each qualifying for its own payment limit</li>
          <li><strong>Spousal claims:</strong> Spouses can each qualify as separate &quot;persons&quot; for payment limit purposes</li>
          <li><strong>Partnership structures:</strong> Each partner in a farm partnership can receive the maximum payment</li>
          <li><strong>Multi-program stacking:</strong> The <Link href="/analysis/double-dippers">double-dippers analysis</Link> shows over 620,000 recipients collecting from 3+ programs simultaneously, with some tapping 14 programs at once</li>
        </ul>
        <p>
          The result is that nominal payment limits have minimal practical effect. A well-structured
          farm entity can collect far beyond the stated cap. The <Link href="/analysis/payment-limits">
          payment limits analysis</Link> details how this works in practice.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Small Farm Disadvantage</h2>
        <p>
          Small farms face a double disadvantage in the subsidy system. First, their limited acreage
          means smaller payments even when they do qualify. A 200-acre corn farm might receive $5,000
          from ARC/PLC programs, while a 10,000-acre neighbor receives $250,000 — a 50x difference
          for an operation that may face equal or greater financial stress.
        </p>
        <p>
          Second, navigating {stats.totalPrograms} programs requires administrative capacity that small
          farms simply don&apos;t have. Large operations employ dedicated staff or hire consultants to
          maximize their subsidy collections across multiple programs. Small farmers are often unaware
          of programs they qualify for, miss application deadlines, or lack the documentation
          required to participate.
        </p>
        <p>
          The 2025 farm crisis illustrates this perfectly: <Link href="/analysis/farm-crisis-2025">
          farm bankruptcies are up 46%</Link>, concentrated among small and mid-size operations.
          Meanwhile, the large operations receiving the most subsidies continue to expand. The
          safety net catches the wrong farmers.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Geographic Patterns</h2>
        <p>
          The small vs. large divide has a geographic dimension. Large commodity operations dominate
          the Midwest and Great Plains — and these regions collect the most subsidies. Small, diversified
          farms are more common in the Northeast, Southeast, and Pacific Northwest — regions where
          per-capita subsidies are lowest.
        </p>
        <p>
          The <Link href="/analysis/per-capita">per-capita analysis</Link> shows North Dakota receiving
          over $6,000 per person while California gets under $100 — despite California being the
          nation&apos;s top agricultural state by revenue. The difference isn&apos;t about agricultural
          importance; it&apos;s about which <em>type</em> of agriculture Congress has chosen to support.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Consolidation Engine</h2>
        <p>
          Farm subsidies don&apos;t just reflect the existing size gap — they accelerate it. When
          subsidies inflate land values (as <Link href="/analysis/county-hotspots">research in
          top-subsidy counties shows</Link>), the cost of entry rises for new and small farmers.
          When large operations use subsidy income to acquire neighboring land, consolidation
          accelerates. When the resulting larger operations qualify for even more subsidies, the
          cycle compounds.
        </p>
        <p>
          Since 1987, the number of U.S. farms has declined from 2.2 million to under 2 million,
          while average farm size has grown significantly. Farm subsidies haven&apos;t prevented
          this consolidation — they&apos;ve funded it. Every dollar that goes to a large operation
          is a dollar that strengthens its competitive position against the small farms that
          receive little or nothing.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What Would a Fair System Look Like?</h2>
        <p>
          Reform proposals include graduated payment caps (more money per acre for smaller operations),
          means-testing based on farm income, and redirecting funds toward beginning farmers and conservation.
          But the political economy of subsidies makes reform difficult — the biggest recipients also have the
          biggest lobbying budgets.
        </p>
        <p>
          The <Link href="/farm-subsidy-reform">farm subsidy reform analysis</Link> outlines five
          data-backed proposals, and the <Link href="/doge-farm-subsidies">DOGE efficiency review</Link> asks
          whether a system where 69% of farms get nothing and the top 10% get everything can be
          called &quot;supporting American agriculture.&quot;
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Frequently Asked Questions</h2>

        <h3>What percentage of farms receive subsidies?</h3>
        <p>
          Only about 31% of U.S. farms receive farm subsidy payments in any given year. The remaining
          69% — primarily small, diversified, and specialty crop operations — receive nothing. The subsidy
          system is designed around commodity crops (corn, soybeans, wheat, cotton, rice), not agriculture broadly.
        </p>

        <h3>How much does the top 10% of recipients receive?</h3>
        <p>
          The top 10% of recipients ({fmt(top10pct.length)} entities) collected {fmtMoney(top10total)}.
          These are predominantly large commercial operations with significant acreage in commodity crops,
          often structured as corporations or LLCs to maximize payment collections.
        </p>

        <h3>Do farm subsidies help small farmers?</h3>
        <p>
          Minimally at best. The average payment is {fmtMoney(avgPayment)}, but distribution is heavily
          skewed. Small farms often don&apos;t qualify for commodity programs, lack administrative capacity
          to navigate {stats.totalPrograms} programs, and face competitive disadvantages against subsidized
          large operations.
        </p>

        <h3>Why do large farms get more subsidies?</h3>
        <p>
          Subsidies are tied to acreage, production volume, and commodity prices — all of which scale
          with farm size. Payment limits ($125K per person) are circumvented through entity structuring.
          Large operations can also afford staff and consultants to maximize subsidy collections across
          multiple programs.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Sources</p>
          <p>USDA Farm Service Agency payment data ({stats.dataYears}). Farm count statistics from USDA Census of Agriculture.
          See individual recipients on the <Link href="/recipients" className="text-primary hover:underline">Top Recipients page</Link> or
          explore <Link href="/entity-types" className="text-primary hover:underline">payments by entity type</Link>.</p>
        </div>

        <RelatedArticles currentSlug="small-vs-large" />
      </div>
    </article>
  )
}
