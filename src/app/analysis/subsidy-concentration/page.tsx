import Breadcrumbs from '@/components/Breadcrumbs'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'The 10% Problem: How Most Farm Subsidies Go to the Biggest Operations',
  description: '69% of American farms receive zero federal subsidy payments. The top 10% of recipients collect nearly three-fourths of all farm subsidies. Here\'s the data.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/subsidy-concentration' },
}

export default function SubsidyConcentration() {
  const stats = loadData('stats.json')
  const states = loadData('states.json')
  const recipients = loadData('top-recipients.json')
  const programs = loadData('programs.json')

  const top10Amount = recipients.slice(0, 100).reduce((s: number, r: { amount: number }) => s + r.amount, 0)
  const top1Amount = recipients.slice(0, 10).reduce((s: number, r: { amount: number }) => s + r.amount, 0)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="The 10% Problem: How Most Farm Subsidies Go to the Biggest Operations" description="69% of American farms receive zero federal subsidy payments. The top 10% of recipients collect nearly three-fourths of all farm subsidies. Here\" slug="analysis/subsidy-concentration" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Subsidy Concentration' }]} />
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'The 10% Problem: How Most Farm Subsidies Go to the Biggest Operations',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.org' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          The 10% Problem: How Most Farm Subsidies Go to the Biggest Operations
        </h1>
      <ShareButtons title="" />
        <p className="text-lg text-gray-600">
          The federal government distributed {fmtMoney(stats.totalAmount)} in farm subsidies from 2017 to 2025 —
          but the money is staggeringly concentrated. According to the USDA, 69% of American farms receive
          zero federal subsidy payments. The rest is dominated by the largest operations.
        </p>
      </div>

      <div className="prose max-w-none">
        <h2 className="font-[family-name:var(--font-heading)]">The Numbers Don&apos;t Lie</h2>
        <p>
          Our analysis of {fmt(stats.totalPayments)} USDA payment records reveals a subsidy system
          that overwhelmingly rewards scale over need:
        </p>

        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 Key Finding</p>
          <p className="text-sm text-gray-700 mt-1">
            The top 100 recipients in our database collected {fmtMoney(top10Amount)} — while
            the USDA reports that 69% of all U.S. farms received nothing.
          </p>
        </div>

        <p>
          This isn&apos;t a new problem. The Environmental Working Group has tracked this trend since 1995.
          But the pattern has only intensified. Emergency and disaster programs — which now account for
          over half of all farm spending — have further concentrated payments among the largest producers.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Where the Money Goes</h2>
        <p>
          The largest single program in our dataset is the <strong>Emergency Commodity Assistance Program</strong> at
          {' '}{fmtMoney(programs[0]?.amount)}, followed by disaster relief and conservation payments. These emergency
          programs were designed as safety nets, but in practice they&apos;ve become reliable income streams for the biggest operations.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Geographic Divide</h2>
        <p>
          Five states — Texas ({fmtMoney(states[0]?.amount)}), Iowa ({fmtMoney(states[1]?.amount)}),
          Kansas ({fmtMoney(states[2]?.amount)}), Minnesota ({fmtMoney(states[3]?.amount)}),
          and Nebraska ({fmtMoney(states[4]?.amount)}) — account for a massive share of total subsidies.
          States with smaller agricultural sectors receive proportionally less, creating a geographic
          concentration that mirrors the individual-level concentration.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Policy Question</h2>
        <p>
          Farm subsidies were originally designed to protect family farmers from market volatility and
          natural disasters. But when the majority of payments flow to large corporate operations,
          the question becomes: are taxpayers subsidizing agriculture, or subsidizing agricultural consolidation?
        </p>
        <p>
          Payment limits exist in theory — the 2018 Farm Bill caps most commodity payments at $125,000
          per person per year. But through partnerships, LLCs, and family attribution rules, many operations
          receive far more. Our data shows individual entities collecting millions across nine years of payment data.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What the Data Shows</h2>
        <p>
          The top recipient in our database, <strong>{recipients[0]?.name}</strong> of {recipients[0]?.city}, {recipients[0]?.state},
          collected {fmtMoney(recipients[0]?.amount)} in {recipients[0]?.payments} payments. The top 10 recipients
          averaged {fmtMoney(top1Amount / 10)} each.
        </p>
        <p>
          Meanwhile, the typical small farmer — growing vegetables for a local market, raising a few
          dozen head of cattle — qualifies for few if any of these programs. The subsidy system, as
          currently structured, rewards acreage and commodity production, not agricultural diversity
          or food security.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Source</p>
          <p>Analysis based on {fmt(stats.totalPayments)} USDA Farm Service Agency payment records from 2017-2025.
          Data downloaded directly from FSA&apos;s public payment files.</p>
        </div>
            <RelatedArticles currentSlug="subsidy-concentration" />
</div>
    </article>
  )
}
