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
  description: 'The average vs. median payment gap reveals how farm subsidies overwhelmingly benefit the largest operations.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/small-vs-large' },
}

export default function SmallVsLarge() {
  const recipients = loadData('top-recipients.json') as { name: string; state: string; amount: number; payments: number }[]
  const states = loadData('states.json') as { abbr: string; name: string; payments: number; amount: number }[]

  const totalAmount = states.reduce((s, st) => s + st.amount, 0)
  const totalPayments = states.reduce((s, st) => s + st.payments, 0)
  const avgPayment = totalAmount / totalPayments

  // Top 10% of recipients by amount
  const sorted = [...recipients].sort((a, b) => b.amount - a.amount)
  const top10pct = sorted.slice(0, Math.floor(sorted.length * 0.1))
  const top10total = top10pct.reduce((s, r) => s + r.amount, 0)
  const top1pct = sorted.slice(0, Math.floor(sorted.length * 0.01))
  const top1total = top1pct.reduce((s, r) => s + r.amount, 0)

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
      <ArticleSchema title="Small Farms vs. Large Operations: Who Really Benefits from Subsidies?" description="The average vs. median payment gap reveals how farm subsidies overwhelmingly benefit the largest operations." slug="small-vs-large" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Small vs. Large Farms' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Small Farms vs. Large Operations: Who Really Benefits?',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies' }, datePublished: '2026-02-27',
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

        <h2 className="font-[family-name:var(--font-heading)]">Payment Distribution</h2>
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

        <h2 className="font-[family-name:var(--font-heading)]">What Would a Fair System Look Like?</h2>
        <p>
          Reform proposals include graduated payment caps (more money per acre for smaller operations),
          means-testing based on farm income, and redirecting funds toward beginning farmers and conservation.
          But the political economy of subsidies makes reform difficult — the biggest recipients also have the
          biggest lobbying budgets.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Sources</p>
          <p>USDA Farm Service Agency payment data (1995–2024). Farm count statistics from USDA Census of Agriculture.
          See individual recipients on the <Link href="/recipients" className="text-primary hover:underline">Top Recipients page</Link>.</p>
        </div>
            <RelatedArticles currentSlug="small-vs-large" />
</div>
    </article>
  )
}
