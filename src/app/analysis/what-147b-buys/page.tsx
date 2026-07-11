import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import RelatedArticles from '@/components/RelatedArticles'
import type { Metadata } from 'next'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'What $147 Billion in Farm Subsidies Could Buy Instead',
  description: '$147 billion in farm subsidies could fund 2.2 million teachers, 5.8 million Pell Grants, or 6 years of NASA. Here\'s what America spent on farm payments — and what else it could have bought.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/what-147b-buys' },
  openGraph: {
    title: `What $147 Billion in Farm Subsidies Could Buy Instead`,
    description: `$147 billion in farm subsidies could fund 2.2 million teachers, 5.8 million Pell Grants, or 6 years of NASA. Here's what America spent on farm payments — and what else it could have bought.`,
    url: 'https://www.opensubsidies.org/analysis/what-147b-buys',
    type: 'article',
  },
}

export default function What147BBuysPage() {
  const data = loadData('taxpayer-cost.json') as {
    total: number; comparisons: { label: string; count: number; unit: string }[]
  }
  const stats = loadData('stats.json')
  const yearly = loadData('yearly.json') as { year: number; amount: number; payments: number }[]

  const perTaxpayer = Math.round(stats.totalAmount / 150_000_000) // ~150M taxpayers
  const perTaxpayerPerYear = Math.round(perTaxpayer / 9) // 2017-2025 = 9 years
  const peakYear = yearly.reduce((a, b) => a.amount > b.amount ? a : b)
  const lowYear = yearly.reduce((a, b) => a.amount < b.amount ? a : b)

  const emojis: Record<string, string> = {
    'School teachers\' salaries': '👩‍🏫',
    'Pell Grants': '🎓',
    'VA hospital beds': '🏥',
    'Miles of highway': '🛣️',
    'NASA budgets': '🚀',
    'National parks': '🏞️',
    'Clean water projects': '💧',
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="What $147 Billion in Farm Subsidies Could Buy Instead" description="$147 billion in farm subsidies could fund 2.2 million teachers, 5.8 million Pell Grants, or 6 years of NASA. Here" slug="analysis/what-147b-buys" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'What $147B Buys' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'What $147 Billion in Farm Subsidies Could Buy Instead',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.org' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How much do farm subsidies cost each taxpayer?', acceptedAnswer: { '@type': 'Answer', text: `With approximately 150 million taxpayers, the $147 billion in farm subsidies from 2017-2025 cost roughly $${perTaxpayer} per taxpayer, or about $${perTaxpayerPerYear} per year.` }},
          { '@type': 'Question', name: 'What could $147 billion in farm subsidies buy instead?', acceptedAnswer: { '@type': 'Answer', text: 'The same money could fund over 2 million teacher salaries, nearly 6 million Pell Grants for college students, or 6 years of NASA\'s entire budget. These comparisons help put the scale of farm spending in perspective.' }},
          { '@type': 'Question', name: 'Are farm subsidies worth the cost?', acceptedAnswer: { '@type': 'Answer', text: 'That depends on your priorities. Farm subsidies provide income stability for agricultural producers and arguably keep food prices lower. But 69% of farms receive no subsidies, and the top 10% of recipients collect most of the money. Whether this is efficient use of taxpayer dollars is a legitimate policy debate.' }},
          { '@type': 'Question', name: 'How much do farm subsidies cost per year?', acceptedAnswer: { '@type': 'Answer', text: `Annual farm subsidy spending varied from ${fmtMoney(lowYear.amount)} in ${lowYear.year} to ${fmtMoney(peakYear.amount)} in ${peakYear.year}. The wide variation is driven by emergency programs that spike during crises like the COVID-19 pandemic and trade wars.` }},
        ]
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          What $147 Billion in Farm Subsidies Could Buy Instead
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-lg text-gray-600">Putting $147 billion in perspective — from teacher salaries to space exploration.</p>
          <ShareButtons title="What $147B in Farm Subsidies Could Buy Instead" />
        </div>
      </div>

      <div className="prose max-w-none">
        <p>
          Between 2017 and 2025, the USDA distributed <strong>{fmtMoney(stats.totalAmount)}</strong> in farm subsidy payments through the
          Farm Service Agency. That&apos;s an enormous sum — but how enormous? Here&apos;s what the same money could have funded instead.
        </p>

        <div className="not-prose grid md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
          {data.comparisons.map(c => (
            <div key={c.label} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">{emojis[c.label] || '📊'}</div>
              <div className="text-3xl font-bold text-primary">{c.count.toLocaleString()}</div>
              <div className="text-base font-medium text-gray-900 mt-1">{c.unit}</div>
              <div className="text-xs text-gray-400 mt-2 uppercase tracking-wide">{c.label}</div>
            </div>
          ))}
        </div>

        <div className="not-prose bg-primary text-white rounded-2xl p-8 my-10 text-center">
          <div className="text-5xl font-bold">${(stats.totalAmount / 1e9).toFixed(0)},000,000,000</div>
          <div className="text-xl mt-2 opacity-90">Total USDA farm subsidy payments, 2017–2025</div>
          <div className="text-sm mt-4 opacity-75">That&apos;s ~${perTaxpayerPerYear} per taxpayer per year — or ~${perTaxpayer.toLocaleString()} over the full period</div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Your Personal Tab</h2>
        <p>
          If you filed a federal tax return between 2017 and 2025, you contributed roughly ${perTaxpayer.toLocaleString()} to
          farm subsidy programs — about ${perTaxpayerPerYear} per year. That&apos;s not nothing. It&apos;s a monthly streaming
          subscription&apos;s worth of money, every year, going to a system where 69% of farms don&apos;t receive a dime and
          the top 10% of recipients collect three-quarters of all payments.
        </p>
        <p>
          The question isn&apos;t whether you can afford it. The question is whether you&apos;re getting your money&apos;s worth.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Yearly Rollercoaster</h2>
        <p>
          Farm subsidy spending isn&apos;t steady. It swings wildly based on emergency programs:
        </p>
        <div className="not-prose my-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Year</th>
                  <th className="px-4 py-2 text-right font-semibold">Total Spending</th>
                  <th className="px-4 py-2 text-right font-semibold">Payments</th>
                  <th className="px-4 py-2 text-right font-semibold">Per Taxpayer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {yearly.map((y: { year: number; amount: number; payments: number }) => (
                  <tr key={y.year} className={`hover:bg-gray-50 ${y.year === peakYear.year ? 'bg-amber-50' : ''}`}>
                    <td className="px-4 py-2 font-medium">{y.year}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtMoney(y.amount)}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{fmt(y.payments)}</td>
                    <td className="px-4 py-2 text-right font-mono">${Math.round(y.amount / 150_000_000)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Peak year ({peakYear.year}) was {(peakYear.amount / lowYear.amount).toFixed(1)}× the lowest year ({lowYear.year}),
            driven primarily by emergency pandemic and trade war programs.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Where the Money Actually Goes</h2>
        <p>
          Before asking what else $147 billion could buy, it&apos;s worth understanding where it actually went.
          As our <Link href="/analysis/subsidy-concentration">concentration analysis</Link> shows, the vast
          majority of farm subsidies flow to the largest operations growing commodity crops in a handful of states.
        </p>
        <p>
          Emergency and disaster programs — created ad hoc during crises — now{' '}
          <Link href="/analysis/decade-of-disaster">dominate the farm spending landscape</Link>. The traditional
          farm safety net of crop insurance and price supports has been eclipsed by reactive crisis spending
          with less oversight and fewer guardrails.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Efficiency Question</h2>
        <p>
          Opportunity cost comparisons don&apos;t argue that farm subsidies should be eliminated entirely.
          Agriculture is critical infrastructure, and some level of public support may be justified. But
          the comparisons do highlight scale — and scale demands scrutiny.
        </p>
        <p>
          When 70% of subsidy dollars flow to the top 10% of recipients, and the smallest farms receive almost nothing,
          it&apos;s worth asking if there&apos;s a better way to support American agriculture. Could the same $147 billion
          achieve more if it were targeted differently — toward beginning farmers, conservation, local food systems,
          or agricultural research?
        </p>

        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 Consider This</p>
          <p className="text-sm text-gray-700 mt-1">
            The USDA&apos;s total farm subsidy spending over nine years could fund NASA for six years. NASA employs
            18,000 people and advances human knowledge. Farm subsidies primarily enrich operations that would
            be profitable without federal help. Which is the better investment?
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Political Reality</h2>
        <p>
          Despite bipartisan concern about farm spending, reform remains elusive. The farm bill combines agricultural
          subsidies with nutrition programs (SNAP), creating a coalition between rural and urban lawmakers that makes
          the overall package nearly impossible to defeat. Agricultural interests in{' '}
          <Link href="/analysis/state-disparities">the top subsidy states</Link> lobby fiercely to maintain the
          status quo, and the complexity of the system makes it hard for voters to understand what they&apos;re paying for.
        </p>
        <p>
          That&apos;s why transparency matters. When taxpayers can see exactly where their money goes — down to
          individual recipients and programs — the conversation changes. It&apos;s harder to defend a system
          that sends millions to <Link href="/analysis/corporate-farms">corporate entities</Link> when voters
          can see the data for themselves.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What Other Countries Spend</h2>
        <p>
          For additional perspective, consider how other countries approach farm spending. The European Union
          spends roughly €55 billion annually on its Common Agricultural Policy — but covers 27 countries
          with 10 million farms. On a per-farm basis, EU spending is far more distributed than the U.S. system.
        </p>
        <p>
          Australia and New Zealand have largely eliminated direct farm subsidies, forcing their agricultural
          sectors to compete on world markets without government support. Both countries have thriving
          agricultural exports. The existence of subsidy-free agricultural powerhouses raises an uncomfortable
          question: does American agriculture actually <em>need</em> $147 billion, or has it simply grown
          accustomed to receiving it?
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Compounding Effect</h2>
        <p>
          $147 billion over nine years isn&apos;t just $147 billion. That money, if invested differently, would
          have generated returns. At a modest 5% annual return, the same funds invested in a sovereign
          wealth fund would be worth over $180 billion today. Or if directed to agricultural research —
          which has historically generated 20-60% returns through productivity gains — the payoff could
          be many multiples of the original spending.
        </p>
        <p>
          Instead, most of the $147 billion went to supplement the income of operations that were already
          profitable. It didn&apos;t fund innovation. It didn&apos;t build infrastructure. It didn&apos;t develop new
          markets. It mostly maintained the status quo — which is exactly what incumbent beneficiaries want.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Farm Bill Lock-In</h2>
        <p>
          Why does farm spending persist at these levels despite questionable returns? The answer lies in
          the farm bill&apos;s unique political structure. Farm subsidies are bundled with SNAP (food stamps)
          in the same legislation, creating a coalition between rural and urban lawmakers that makes the
          overall package nearly unassailable.
        </p>
        <p>
          Rural lawmakers vote for SNAP to secure urban support for farm subsidies. Urban lawmakers vote
          for farm subsidies to secure rural support for SNAP. Neither side has incentive to scrutinize
          the other&apos;s spending. The result: a trillion-dollar package that sails through Congress every
          five years with minimal reform.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The State-Level View</h2>
        <p>
          The $147 billion isn&apos;t distributed evenly. As our <Link href="/analysis/state-disparities">state
          disparities analysis</Link> shows, the top 5 states receive many times more than the bottom 5.
          A taxpayer in Connecticut subsidizes Iowa&apos;s corn production. A taxpayer in Hawaii funds
          Texas&apos;s cattle disaster payments. The geographic mismatch between who pays and who benefits
          adds another dimension to the opportunity cost question.
        </p>
        <p>
          If farm subsidies primarily benefit a handful of states, shouldn&apos;t those states bear more of
          the cost? Or does the entire nation benefit from a stable food supply? These are questions
          that $147 billion demands we answer.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Share These Numbers</h2>
        <p>
          Think more people should see this? Share this page and help make farm subsidy spending part of the public conversation.
          Transparency is the first step toward better policy. Every dollar of the {fmtMoney(stats.totalAmount)} is searchable
          on our <Link href="/recipients">recipients page</Link>.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Generational Cost</h2>
        <p>
          Farm subsidies aren&apos;t funded by current revenue alone — they contribute to the national
          debt. Every dollar spent on farm subsidies that isn&apos;t offset by revenue becomes debt that
          future generations will repay with interest. The $147 billion price tag is just the
          principal; the true cost includes decades of interest payments.
        </p>
        <p>
          At current interest rates, the interest cost alone on $147 billion in debt over 30 years
          would exceed the original spending. Future taxpayers will pay for today&apos;s farm subsidies
          long after the crops have been harvested and the cattle sold. Whether this intergenerational
          transfer is justified depends on whether today&apos;s spending creates lasting value — and
          for most emergency and commodity programs, the evidence suggests it doesn&apos;t.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What Would Smart Farm Spending Look Like?</h2>
        <p>
          The question isn&apos;t just &quot;what could $147 billion buy instead?&quot; — it&apos;s &quot;what would
          $147 billion buy if we spent it smarter within agriculture?&quot; Options include:
        </p>
        <ul>
          <li><strong>Agricultural research:</strong> Every $1 invested in ag research generates $20+ in productivity gains</li>
          <li><strong>Beginning farmer programs:</strong> Help new farmers start operations, reversing the aging of the farm workforce</li>
          <li><strong>Rural broadband:</strong> Modern agriculture depends on connectivity that many rural areas lack</li>
          <li><strong>Conservation with measurable outcomes:</strong> Pay for environmental results, not just land retirement</li>
          <li><strong>Local food infrastructure:</strong> Processing facilities, cold storage, and distribution for regional food systems</li>
        </ul>
        <p>
          Any of these investments would generate better returns than sending checks to operations
          that are already profitable. But they would also disrupt the political equilibrium that
          keeps farm spending flowing to its current beneficiaries.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Explore More Analysis</p>
          <p>See who collects the most on our <Link href="/recipients" className="text-primary hover:underline">Top Recipients page</Link>,
          or read about <Link href="/analysis/payment-limits" className="text-primary hover:underline">why payment limits don&apos;t work</Link>.</p>
        </div>
      </div>

      <RelatedArticles currentSlug="what-147b-buys" />
    </article>
  )
}
