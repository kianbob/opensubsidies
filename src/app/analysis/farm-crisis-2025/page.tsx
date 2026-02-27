import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { fmtMoney } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import RelatedArticles from '@/components/RelatedArticles'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The 2025 Farm Crisis: Bankruptcies Up 46% While Subsidies Flow to the Top',
  description: 'Farm bankruptcies hit 315 in 2025, up 46%. Meanwhile, farm subsidies continue flowing primarily to the largest operations. The disconnect between who gets help and who needs it.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/farm-crisis-2025' },
}

export default function FarmCrisis2025Page() {
  const yearly = loadData('yearly.json') as { year: number; payments: number; amount: number }[]
  const recent = yearly.filter(y => y.year >= 2020).sort((a, b) => a.year - b.year)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: '2025 Farm Crisis' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'The 2025 Farm Crisis: Bankruptcies Up 46% While Subsidies Flow to the Top',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.org' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          The 2025 Farm Crisis: Bankruptcies Up 46% While Subsidies Flow to the Top
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-lg text-gray-600">315 farm bankruptcies in 2025. 15,000 fewer farms. $44 billion in projected losses. And subsidies still flow upward.</p>
          <ShareButtons title="The 2025 Farm Crisis" />
        </div>
      </div>

      <div className="prose max-w-none">
        {/* Crisis stats */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Bankruptcies', value: '315', sub: 'Chapter 12 filings' },
            { label: 'Year-over-Year', value: '+46%', sub: 'vs. 2024' },
            { label: 'Farms Lost', value: '15,000', sub: 'Net decline in farm count' },
            { label: 'Projected Losses', value: '$44B', sub: 'Net farm income decline' },
          ].map(s => (
            <div key={s.label} className="bg-red-50 rounded-lg p-4 text-center border border-red-100">
              <div className="text-2xl font-bold text-[#dc2626]">{s.value}</div>
              <div className="text-sm font-medium text-gray-900">{s.label}</div>
              <div className="text-xs text-gray-500">{s.sub}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Numbers Paint a Stark Picture</h2>
        <p>
          The 2025 farm crisis is unfolding in real time. Chapter 12 farm bankruptcies — a legal mechanism specifically designed
          for family farmers — surged to 315, the highest level since 2012. Net farm income is projected to fall by $44 billion,
          driven by falling commodity prices, rising input costs, persistent drought in the West, and the lingering effects of
          trade disruptions.
        </p>
        <p>
          Meanwhile, the USDA continues distributing billions in farm subsidies. But here&apos;s the disconnect: the farms going
          bankrupt are overwhelmingly small and mid-size operations, while the farms receiving the most subsidy dollars are
          the largest operations that are least likely to need the help.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Subsidy Spending Trends</h2>
        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2">Year</th>
                <th className="text-right py-3 px-2">Total Spending</th>
                <th className="text-right py-3 px-2">Payments</th>
              </tr>
            </thead>
            <tbody>
              {recent.map(y => (
                <tr key={y.year} className="border-b border-gray-100">
                  <td className="py-2 px-2 font-medium">{y.year}</td>
                  <td className="text-right py-2 px-2">{fmtMoney(y.amount)}</td>
                  <td className="text-right py-2 px-2">{(y.payments / 1e6).toFixed(1)}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Disconnect</h2>
        <p>
          The fundamental problem is structural. Farm subsidies are largely tied to production volume, acreage, and commodity prices.
          This means larger operations — which farm more acres and produce more bushels — automatically receive larger payments.
          A 10,000-acre corn operation in Iowa will always receive more from ARC and PLC programs than a 200-acre diversified farm
          in Vermont, regardless of which one is struggling more.
        </p>
        <p>
          Our data shows the <Link href="/analysis/subsidy-concentration">top 10% of recipients collect ~70% of all payments</Link>.
          These are not the operations filing for bankruptcy. The farms going under are typically too small to benefit meaningfully
          from commodity programs, too diversified to qualify for crop-specific payments, or too new to have established baselines.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What Could Be Different?</h2>
        <p>
          Some proposals in the 2025 Farm Bill debate would address this disconnect: means-testing for subsidy recipients,
          higher payment rates for small and beginning farmers, and expansion of conservation programs that serve diverse operations.
          Whether Congress acts before more farms fail remains to be seen.
        </p>
        <p>
          Explore our data on <Link href="/analysis/small-vs-large">small vs. large farm payments</Link>,
          <Link href="/analysis/payment-limits"> payment limit effectiveness</Link>, and
          <Link href="/recipients"> top recipients</Link> to understand who the current system serves.
        </p>
      </div>

      <RelatedArticles currentSlug="farm-crisis-2025" />
    </article>
  )
}
