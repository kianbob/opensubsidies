import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { fmt, fmtMoney } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Farm Subsidy Reform: What the Data Shows About Fixing American Agriculture',
  description: 'Data-driven analysis of farm subsidy reform: payment concentration, emergency spending growth, zombie programs, and 5 reform ideas backed by $147B in USDA data.',
  alternates: { canonical: 'https://www.opensubsidies.us/farm-subsidy-reform' },
}

export default function FarmSubsidyReformPage() {
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalPrograms: number; dataYears: string }

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Farm Subsidy Reform' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Farm Subsidy Reform: What the Data Shows About Fixing American Agriculture',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.us' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Farm Subsidy Reform: What the Data Shows About Fixing American Agriculture
        </h1>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-lg text-gray-600">Five data-backed reform ideas from {fmtMoney(stats.totalAmount)} in USDA payments.</p>
          <ShareButtons title="Farm Subsidy Reform: What the Data Shows About Fixing American Agriculture" />
        </div>
      </div>

      <div className="prose max-w-none">
        <p>
          Every five years, Congress debates the Farm Bill — the primary vehicle for farm subsidy policy. Every five years,
          the same arguments recur: farmers need support, spending is too high, the wrong people benefit. What&apos;s usually
          missing from these debates is data. Our database of {fmtMoney(stats.totalAmount)} in USDA payments across
          {' '}{stats.totalPrograms} programs ({stats.dataYears}) provides the evidence base for meaningful reform.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Case for Reform</h2>

        <h3>Problem 1: Extreme Payment Concentration</h3>
        <p>
          The <Link href="/analysis/subsidy-concentration">top 10% of recipients collect nearly three-fourths</Link> of all
          farm subsidy dollars. Meanwhile, 69% of American farms receive nothing. The system doesn&apos;t support &ldquo;farmers&rdquo;
          broadly — it supports the largest agricultural operations. The <Link href="/analysis/small-vs-large">small vs. large
          farm gap</Link> continues to widen.
        </p>

        <h3>Problem 2: Emergency Spending Growth</h3>
        <p>
          Emergency and disaster programs have <Link href="/analysis/decade-of-disaster">gone from supplemental to dominant</Link>.
          Trade war bailouts, COVID relief, and recurring disaster payments now exceed traditional program spending in many years.
          These programs bypass normal authorization and lack the scrutiny of Farm Bill programs.
        </p>

        <h3>Problem 3: Program Proliferation</h3>
        <p>
          The USDA operates <Link href="/analysis/program-proliferation">{stats.totalPrograms} separate programs</Link>,
          including <Link href="/analysis/zombie-programs">43+ zombie programs</Link> with fewer than 100 payments each.
          Administrative overhead multiplies with each program, and recipients can{' '}
          <Link href="/analysis/double-dippers">collect from 14+ programs simultaneously</Link>.
        </p>

        <h3>Problem 4: The Small Farm Gap</h3>
        <p>
          The <Link href="/analysis/average-farmer">average payment is about $4,600</Link> — but the median is far lower.
          Small farms that arguably need the most help receive the least. Programs designed to help family farms
          disproportionately benefit large operations with the resources to navigate complex application processes.
        </p>

        <h3>Problem 5: Conservation vs. Commodity Tension</h3>
        <p>
          The USDA simultaneously <Link href="/analysis/conservation-vs-commodity">pays farmers to produce (commodity subsidies)
          and pays them not to produce (conservation programs)</Link>. These contradictory incentives undermine both goals.
          <Link href="/analysis/crp-under-threat"> CRP is increasingly under pressure</Link> as emergency commodity spending grows.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Five Data-Backed Reform Ideas</h2>

        <div className="not-prose space-y-6 my-8">
          {[
            {
              num: '1',
              title: 'Consolidate into 20–30 Core Programs',
              desc: `${stats.totalPrograms} programs is unmanageable. Merge overlapping programs, eliminate zombie programs, and create clear categories. This alone could save billions in administrative costs while making the system navigable for the small farmers who need it most.`,
              link: '/analysis/zombie-programs',
              linkText: 'See zombie programs →',
            },
            {
              num: '2',
              title: 'Implement Real Payment Caps',
              desc: 'Current $125K payment limits are easily circumvented through LLCs, partnerships, and spousal entities. Reform should cap total household agricultural subsidies regardless of entity structure, with the savings redirected to small and mid-size operations.',
              link: '/analysis/payment-limits',
              linkText: 'See payment limit analysis →',
            },
            {
              num: '3',
              title: 'Create Emergency Spending Guardrails',
              desc: 'Emergency farm programs should have automatic sunset clauses (2 years max), spending caps tied to the baseline budget, and mandatory GAO review before extension. The current system treats every crisis as unprecedented, creating permanent spending.',
              link: '/analysis/covid-spending',
              linkText: 'See COVID spending analysis →',
            },
            {
              num: '4',
              title: 'Means-Test Large Operations',
              desc: 'Operations above $1M in annual revenue shouldn\'t receive commodity subsidies. They have access to crop insurance and commercial risk management tools. Redirecting these payments to operations under $250K in revenue would better serve the Farm Bill\'s stated purpose.',
              link: '/analysis/corporate-farms',
              linkText: 'See corporate farm analysis →',
            },
            {
              num: '5',
              title: 'Resolve the Conservation-Commodity Conflict',
              desc: 'Stop paying farmers to both produce and not produce. Integrate conservation requirements into commodity programs — require soil health practices, cover cropping, or buffer strips as a condition of receiving commodity payments.',
              link: '/analysis/conservation-vs-commodity',
              linkText: 'See conservation vs. commodity →',
            },
          ].map(r => (
            <div key={r.num} className="bg-gray-50 rounded-xl p-6 border-l-4 border-primary">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#15803d] text-white flex items-center justify-center font-bold shrink-0">{r.num}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{r.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{r.desc}</p>
                  <Link href={r.link} className="text-primary text-sm font-medium hover:underline">{r.linkText}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Political Reality</h2>
        <p>
          Farm subsidy reform is politically difficult. The Farm Bill combines food stamps (SNAP) with agricultural subsidies,
          creating a coalition between urban and rural legislators that makes reform of either component nearly impossible.
          Large agricultural interests have significant lobbying power, and &ldquo;protecting farmers&rdquo; remains
          politically popular even when most farmers receive nothing.
        </p>
        <p>
          But the data is clear: the current system primarily benefits large operations, encourages emergency spending binges,
          and maintains an administrative apparatus far larger than necessary. Whether reform comes from the left (equity concerns)
          or the right (efficiency concerns), the destination is similar: fewer programs, better targeting, real caps.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Explore the Data</h2>
        <p>Every claim in this article is backed by our open database. Explore it yourself:</p>
        <div className="not-prose flex flex-wrap gap-3 my-6">
          <Link href="/search" className="bg-[#15803d] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors">Search Database</Link>
          <Link href="/analysis" className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">All Analysis →</Link>
          <Link href="/categories" className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Categories →</Link>
        </div>
      </div>
    </article>
  )
}
