import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import RelatedArticles from '@/components/RelatedArticles'
import type { Metadata } from 'next'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'The 2025 Farm Crisis: Bankruptcies Up 46% While Subsidies Flow to the Top',
  description: 'Farm bankruptcies hit 315 in 2025, up 46%. Meanwhile, farm subsidies continue flowing primarily to the largest operations. The disconnect between who gets help and who needs it.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/farm-crisis-2025' },
  openGraph: {
    title: 'The 2025 Farm Crisis: Bankruptcies Up 46% While Subsidies Flow to the Top',
    description: 'Farm bankruptcies hit 315 in 2025, up 46%. Meanwhile, farm subsidies continue flowing primarily to the largest operations.',
    url: 'https://www.opensubsidies.org/analysis/farm-crisis-2025',
    type: 'article',
  },
}

export default function FarmCrisis2025Page() {
  const yearly = loadData('yearly.json') as { year: number; payments: number; amount: number }[]
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalPrograms: number; dataYears: string }
  const recent = yearly.filter(y => y.year >= 2020).sort((a, b) => a.year - b.year)
  const y2020 = yearly.find(y => y.year === 2020)
  const y2024 = yearly.find(y => y.year === 2024)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="The 2025 Farm Crisis: Bankruptcies Up 46% While Subsidies Flow to the Top" description="Farm bankruptcies hit 315 in 2025, up 46%. Meanwhile, farm subsidies continue flowing primarily to the largest operations." slug="analysis/farm-crisis-2025" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: '2025 Farm Crisis' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'The 2025 Farm Crisis: Bankruptcies Up 46% While Subsidies Flow to the Top',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.org' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question', name: 'How many farm bankruptcies were filed in 2025?',
            acceptedAnswer: { '@type': 'Answer', text: '315 Chapter 12 farm bankruptcies were filed in 2025, a 46% increase over 2024. This is the highest level since 2012 and reflects falling commodity prices, rising input costs, and persistent drought conditions in the western United States.' },
          },
          {
            '@type': 'Question', name: 'Why are small farms going bankrupt while large farms get subsidies?',
            acceptedAnswer: { '@type': 'Answer', text: 'Farm subsidies are tied to production volume and acreage, so larger operations automatically receive more. Small farms are often too diversified, too small in acreage, or growing non-commodity crops that don\'t qualify. The top 10% of recipients collect roughly 70% of all payments, leaving small farms without meaningful support.' },
          },
          {
            '@type': 'Question', name: 'How much did farm income decline in 2025?',
            acceptedAnswer: { '@type': 'Answer', text: 'Net farm income is projected to fall by $44 billion in 2025, driven by falling commodity prices, rising costs for fertilizer and equipment, persistent drought in western states, and lingering effects of trade disruptions.' },
          },
          {
            '@type': 'Question', name: 'What is Chapter 12 farm bankruptcy?',
            acceptedAnswer: { '@type': 'Answer', text: 'Chapter 12 is a specialized bankruptcy mechanism created in 1986 specifically for family farmers and fishermen. It allows reorganization of debts with more favorable terms than Chapter 11, designed to help agricultural operations survive financial distress while continuing to operate.' },
          },
        ],
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
        <p>
          This isn&apos;t a new pattern, but 2025 has made the contradiction impossible to ignore. The system designed to
          &quot;protect American farmers&quot; is watching thousands of them fail while directing the majority of its
          resources to operations that are already thriving.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Anatomy of the Crisis</h2>
        <p>
          Several forces converged to create the 2025 downturn. Corn prices dropped below $4.00 per bushel —
          down from over $7.00 during the 2022 spike. Soybean prices fell similarly. Meanwhile, input costs
          remain elevated: fertilizer prices are still 40% above pre-pandemic levels, diesel costs have
          stabilized but haven&apos;t retreated, and equipment prices continue to rise with inflation.
        </p>
        <p>
          The cost-price squeeze is devastating for operations that expanded during the high-price years
          of 2021-2022, taking on debt to buy land or equipment. Now those operations face payments on
          expensive assets with commodity revenue that can&apos;t cover the bills. Chapter 12 becomes
          the last resort.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 The Boom-Bust Cycle</p>
          <p className="text-sm text-gray-700 mt-1">
            High commodity prices in 2021-2022 encouraged expansion and land purchases at peak values.
            Now prices have crashed while debt payments remain fixed — the classic agricultural boom-bust
            cycle that subsidies were supposed to prevent.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Subsidy Spending Trends</h2>
        <p>
          While farms fail, subsidy spending continues at elevated levels. The table below shows recent
          annual spending — note the COVID-era peak in 2020 and the subsequent drawdown that still
          leaves spending well above historical norms.
        </p>
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

        <h2 className="font-[family-name:var(--font-heading)]">The Disconnect: Who Gets Help vs. Who Needs It</h2>
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
        <p>
          The <Link href="/analysis/small-vs-large">small vs. large farm analysis</Link> quantifies this gap:
          69% of U.S. farms receive zero subsidy payments in any given year. The system isn&apos;t designed
          for the farms that are failing — it&apos;s designed for the farms that are already succeeding.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Insurance Gap</h2>
        <p>
          Federal crop insurance is supposed to protect farmers from exactly these conditions.
          But crop insurance premiums have risen alongside input costs, and many small operations
          have reduced coverage or dropped it entirely. The irony: emergency programs like CFAP
          undermine crop insurance by providing free disaster relief, which reduces farmers&apos;
          willingness to pay for insurance. When the emergency programs end but the risks remain,
          farmers are left exposed.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Geographic Patterns of Distress</h2>
        <p>
          Farm bankruptcies in 2025 are concentrated in specific regions. The Upper Midwest — Wisconsin,
          Minnesota, and the Dakotas — accounts for a disproportionate share of Chapter 12 filings,
          driven by the dairy downturn and grain price collapse. The southern Plains states face
          drought-related stress. Parts of the Southeast are still recovering from hurricane damage.
        </p>
        <p>
          Ironically, some of the states with the highest bankruptcy rates also receive the most
          <Link href="/analysis/per-capita"> per-capita farm subsidies</Link>. This suggests that
          even massive subsidy spending can&apos;t prevent farm failures when the money flows to
          large operations while small ones bear the brunt of market downturns.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Consolidation Accelerator</h2>
        <p>
          Every farm bankruptcy is a consolidation event. When a small operation fails, its land and
          equipment are typically purchased by larger neighbors — the same operations that receive
          the most subsidies. This creates a self-reinforcing cycle: subsidies help large farms
          expand, expansion creates economies of scale that small farms can&apos;t match, small farms
          fail, and large farms absorb them using subsidy-funded purchasing power.
        </p>
        <p>
          The result is an agricultural sector that grows more concentrated with each crisis. In 1987,
          there were 2.2 million farms in the U.S. By 2025, that number has dropped below 2 million —
          with the remaining farms averaging significantly larger acreage. Farm subsidies, far from
          preventing consolidation, accelerate it.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What Could Be Different?</h2>
        <p>
          Some proposals in the 2025 Farm Bill debate would address this disconnect: means-testing for subsidy recipients,
          higher payment rates for small and beginning farmers, and expansion of conservation programs that serve diverse operations.
          Whether Congress acts before more farms fail remains to be seen.
        </p>
        <p>
          The <Link href="/farm-subsidy-reform">farm subsidy reform analysis</Link> outlines five
          data-backed reform ideas, including graduated payment caps that would direct more money
          to smaller operations. The <Link href="/doge-farm-subsidies">DOGE efficiency review</Link> asks
          whether the current 157-program system can even be reformed, or whether it needs to be
          rebuilt from scratch.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Debt Trap</h2>
        <p>
          Farm debt reached a record $535 billion in 2024. Much of this debt was accumulated during
          the high-price years of 2021-2022, when strong commodity markets made expansion seem safe.
          Farmers borrowed to buy land at peak prices, upgrade equipment, and increase inputs. Now,
          with commodity prices down 40-50% from their highs, many operations carry debt loads their
          current revenue can&apos;t service.
        </p>
        <p>
          The federal subsidy system contributes to this dynamic. When emergency programs like
          <Link href="/analysis/covid-spending"> CFAP</Link> deliver windfall payments during good
          times, they inflate farmland values and encourage leveraged expansion. When the payments
          stop and prices normalize, the debt remains. It&apos;s a government-subsidized boom
          followed by a market-driven bust.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Human Cost</h2>
        <p>
          Behind every bankruptcy statistic is a family — often one that has farmed the same land for
          generations. Farm stress leads to depression, substance abuse, and suicide at rates far above
          the general population. Rural communities lose not just a farm but a family, a customer for
          local businesses, a member of the school board and volunteer fire department.
        </p>
        <p>
          The tragedy is compounded by the knowledge that billions in federal farm spending exist
          specifically to prevent these outcomes. When 315 farms file for bankruptcy in a year where
          the USDA distributes {y2024 ? fmtMoney(y2024.amount) : 'billions'} in subsidies, the
          system has failed at its stated purpose. The money is there — it&apos;s just going to
          the wrong places.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Frequently Asked Questions</h2>

        <h3>How many farm bankruptcies were filed in 2025?</h3>
        <p>
          315 Chapter 12 farm bankruptcies were filed in 2025, up 46% from 2024. This is the
          highest level since 2012 and reflects the combined pressures of falling commodity prices,
          elevated input costs, and drought conditions.
        </p>

        <h3>Why are small farms going bankrupt while large farms get subsidies?</h3>
        <p>
          Farm subsidies are tied to production volume and acreage. Larger operations automatically
          qualify for larger payments. Small farms often grow non-commodity crops, have insufficient
          acreage, or lack the administrative resources to navigate the {stats.totalPrograms}-program system.
          The result: the top 10% of recipients collect roughly 70% of all payments.
        </p>

        <h3>What is Chapter 12 farm bankruptcy?</h3>
        <p>
          Chapter 12 was created in 1986 specifically for family farmers and fishermen. It allows
          debt reorganization with more favorable terms than Chapter 11, including the ability to
          modify secured debt. It&apos;s designed to help agricultural operations survive financial
          distress while continuing to farm.
        </p>

        <h3>How much did farm income decline in 2025?</h3>
        <p>
          Net farm income is projected to fall by $44 billion in 2025. Corn prices dropped below
          $4.00/bushel (from $7.00+ in 2022), while input costs remain 30-40% above pre-pandemic
          levels. The cost-price squeeze is particularly devastating for operations that expanded
          during the high-price years.
        </p>

        <p>
          Explore our data on <Link href="/analysis/small-vs-large">small vs. large farm payments</Link>,{' '}
          <Link href="/analysis/payment-limits">payment limit effectiveness</Link>,{' '}
          <Link href="/analysis/program-proliferation">program proliferation</Link>, and{' '}
          <Link href="/recipients">top recipients</Link> to understand who the current system serves.
        </p>
      </div>

      <RelatedArticles currentSlug="farm-crisis-2025" />
    </article>
  )
}
