import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { fmtMoney, fmt, formatProgram } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'What Does the Average Farmer Actually Get? The $4,600 Reality',
  description: '31.8M payments divided by $147B = ~$4,600 average. But the median is far lower. The inequality of farm subsidies explained.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/average-farmer' },
  openGraph: {
    title: `What Does the Average Farmer Actually Get? The $4,600 Reality`,
    description: `31.8M payments divided by $147B = ~$4,600 average. But the median is far lower. The inequality of farm subsidies explained.`,
    url: 'https://www.opensubsidies.org/analysis/average-farmer',
    type: 'article',
  },
}

export default function AverageFarmerPage() {
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalStates: number; totalPrograms: number }
  const programs = loadData('programs.json') as { program: string; amount: number; payments: number }[]
  const recipients = loadData('top-recipients.json') as { name: string; state: string; city: string; amount: number; payments: number }[]
  const states = loadData('states.json') as { name: string; abbr: string; amount: number; payments: number }[]

  const avgPayment = stats.totalAmount / stats.totalPayments
  const topPrograms = [...programs].sort((a, b) => b.amount - a.amount).slice(0, 10)
  const topProgramAvgs = topPrograms.map(p => ({ ...p, avg: p.amount / p.payments }))
  const highestAvg = [...programs].filter(p => p.payments > 100).sort((a, b) => (b.amount / b.payments) - (a.amount / a.payments)).slice(0, 5)
  const lowestAvg = [...programs].filter(p => p.payments > 100).sort((a, b) => (a.amount / a.payments) - (b.amount / b.payments)).slice(0, 5)
  const topRecipient = recipients[0]
  const top10Avg = recipients.slice(0, 10).reduce((s, r) => s + r.amount, 0) / 10
  const ratio = Math.round(top10Avg / avgPayment)
  const totalFarms = 2_000_000 // USDA estimate ~2M farms
  const farmsGettingSubsidies = Math.round(totalFarms * 0.31)
  const avgPerFarm = stats.totalAmount / farmsGettingSubsidies

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="What Does the Average Farmer Actually Get? The $4,600 Reality" description="31.8M payments divided by $147B = ~$4,600 average. But the median is far lower. The inequality of farm subsidies explained." slug="analysis/average-farmer" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'The Average Farmer' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'What Does the Average Farmer Actually Get?',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.org' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the average farm subsidy payment?', acceptedAnswer: { '@type': 'Answer', text: `The average payment is ${fmtMoney(avgPayment)} across ${fmt(stats.totalPayments)} total payments. However, this average is heavily skewed by large operations receiving millions. The median payment is significantly lower, and 69% of farms receive no subsidies at all.` }},
          { '@type': 'Question', name: 'How much does the average farmer who receives subsidies get?', acceptedAnswer: { '@type': 'Answer', text: `Among the ~31% of farms that receive subsidies (about ${fmt(farmsGettingSubsidies)} farms), the average total over 2017-2025 is roughly ${fmtMoney(avgPerFarm)}. But even this is misleading — the top 10% of recipients collect roughly 75% of all payments.` }},
          { '@type': 'Question', name: 'Do most farmers receive government subsidies?', acceptedAnswer: { '@type': 'Answer', text: 'No. According to USDA data, approximately 69% of U.S. farms receive zero federal subsidy payments. Subsidies primarily flow to operations growing commodity crops — corn, soybeans, wheat, cotton, and rice. Farms growing fruits, vegetables, or raising small livestock typically receive little or nothing.' }},
          { '@type': 'Question', name: 'Which farm programs have the highest average payments?', acceptedAnswer: { '@type': 'Answer', text: 'Emergency and disaster programs tend to have the highest average payments, as they are often proportional to production volume. Traditional programs like CRP have lower averages because they pay modest annual rental rates for conservation land.' }},
        ]
      })}} />

      <div className="mb-8">
        <div className="flex items-start justify-between">
          <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
          <ShareButtons title="What Does the Average Farmer Actually Get? The $4,600 Reality" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          What Does the Average Farmer Actually Get? The {fmtMoney(avgPayment)} Reality
        </h1>
        <p className="text-lg text-gray-600">
          {fmtMoney(stats.totalAmount)} divided by {fmt(stats.totalPayments)} payments = {fmtMoney(avgPayment)} average.
          But averages hide a stunning inequality in how farm subsidies are distributed.
        </p>
      </div>

      <div className="prose max-w-none">
        {/* Key stats grid */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Average Payment', value: fmtMoney(avgPayment) },
            { label: 'Total Payments', value: fmt(stats.totalPayments) },
            { label: 'Farms Getting $0', value: '69%' },
            { label: 'Top 10 Avg', value: fmtMoney(top10Avg) },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 Key Insight</p>
          <p className="text-sm text-gray-700 mt-1">
            The average farm subsidy payment is {fmtMoney(avgPayment)}, but this average is pulled up dramatically
            by large operations receiving millions. The top 10 recipients averaged {fmtMoney(top10Avg)} —
            {' '}{ratio}× the overall average. And 69% of farms receive nothing at all.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Numbers</h2>
        <p>
          Across {fmt(stats.totalPayments)} individual USDA FSA payments from 2017–2025, the government distributed
          {' '}{fmtMoney(stats.totalAmount)} through {stats.totalPrograms} different programs to recipients in {stats.totalStates} states.
          Simple division gives us {fmtMoney(avgPayment)} per payment.
        </p>
        <p>
          But &quot;per payment&quot; isn&apos;t &quot;per farmer.&quot; Many recipients receive multiple payments across
          different programs and years. The top recipients — large corporate operations, cooperatives, and
          multi-entity partnerships — accumulate millions over time.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Two Averages</h2>
        <p>
          There are really two ways to think about the &quot;average&quot; farmer and subsidies:
        </p>
        <ul>
          <li><strong>Average per payment:</strong> {fmtMoney(avgPayment)} — but one recipient can receive dozens of payments</li>
          <li><strong>Average per farm that receives subsidies:</strong> Roughly {fmtMoney(avgPerFarm)} over the 2017-2025 period
          (among the ~{fmt(farmsGettingSubsidies)} farms that receive anything at all)</li>
        </ul>
        <p>
          Neither number captures the reality for a &quot;typical&quot; farmer, because there is no typical farmer in
          this system. There are small operations getting a few thousand dollars from CRP, and there are
          massive operations collecting millions from multiple programs. The average blends them all into
          a meaningless number.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Average Payment by Top Programs</h2>
        <div className="not-prose my-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Program</th>
                  <th className="px-4 py-2 text-right font-semibold">Total</th>
                  <th className="px-4 py-2 text-right font-semibold">Payments</th>
                  <th className="px-4 py-2 text-right font-semibold">Avg</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {topProgramAvgs.map(p => (
                  <tr key={p.program} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-xs">{formatProgram(p.program)}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtMoney(p.amount)}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmt(p.payments)}</td>
                    <td className="px-4 py-2 text-right font-mono font-semibold">{fmtMoney(p.avg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Programs with the Highest Average Payments</h2>
        <p>
          Some programs pay dramatically more per payment than others. The highest average payments tend to come
          from emergency and disaster programs, which distribute large lump sums:
        </p>
        <div className="not-prose my-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Program</th>
                  <th className="px-4 py-2 text-right font-semibold">Avg Payment</th>
                  <th className="px-4 py-2 text-right font-semibold"># Payments</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {highestAvg.map(p => (
                  <tr key={p.program} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-xs">{formatProgram(p.program)}</td>
                    <td className="px-4 py-2 text-right font-mono font-semibold text-primary">{fmtMoney(p.amount / p.payments)}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{fmt(p.payments)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Programs with the Lowest Average Payments</h2>
        <p>
          At the other end, some programs distribute modest payments to many recipients:
        </p>
        <div className="not-prose my-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Program</th>
                  <th className="px-4 py-2 text-right font-semibold">Avg Payment</th>
                  <th className="px-4 py-2 text-right font-semibold"># Payments</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {lowestAvg.map(p => (
                  <tr key={p.program} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-xs">{formatProgram(p.program)}</td>
                    <td className="px-4 py-2 text-right font-mono font-semibold">{fmtMoney(p.amount / p.payments)}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{fmt(p.payments)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Inequality Problem</h2>
        <p>
          According to USDA data, approximately 69% of U.S. farms receive no direct subsidy payments at all.
          Among those that do, the distribution is heavily skewed: the top 10% of recipients collect roughly
          three-quarters of all subsidy dollars. This means the &quot;average&quot; is a poor representation of
          what a typical farmer actually receives.
        </p>
        <p>
          A small family farm might receive a $2,000 CRP payment for keeping 40 acres in conservation.
          Meanwhile, a large corporate operation might receive $500,000+ in a single year from multiple
          emergency programs. Both show up in the same average.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Top vs. Bottom Divide</h2>
        <p>
          The gap between top and typical recipients is staggering. The top recipient, {topRecipient?.name},
          collected {fmtMoney(topRecipient?.amount)} — equivalent to {fmt(Math.round(topRecipient?.amount / avgPayment))} average
          payments. The top 10 averaged {fmtMoney(top10Avg)}, or {ratio}× the per-payment average.
        </p>
        <p>
          This isn&apos;t just an academic observation — it reveals who the system is actually designed for.
          Politicians defend farm subsidies by invoking the family farmer getting a modest CRP check.
          But the system&apos;s design — tied to commodity production, with per-program limits and entity
          loopholes — ensures that the vast majority of money flows upward.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What Would Equality Look Like?</h2>
        <p>
          If the {fmtMoney(stats.totalAmount)} in farm subsidies were distributed equally among all ~2 million
          U.S. farms, each would receive roughly {fmtMoney(stats.totalAmount / totalFarms)} over the nine-year
          period — about {fmtMoney(stats.totalAmount / totalFarms / 9)} per year. That&apos;s a meaningful amount
          for a small operation but a fraction of what large recipients currently collect.
        </p>
        <p>
          Nobody&apos;s proposing equal distribution — the point is to highlight how far the current system
          deviates from any reasonable definition of fairness. When 69% get nothing and the top 10%
          get three-quarters, the &quot;average&quot; is a fig leaf covering a system designed for the few.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The State-Level View</h2>
        <p>
          Average payments vary significantly by state. States with large commodity operations —
          Texas, Iowa, Kansas — have higher averages because their recipients tend to be larger.
          States with smaller, diversified farms have lower averages.
        </p>
        <div className="not-prose my-6 space-y-2">
          {states.slice(0, 5).map((s: { name: string; abbr: string; amount: number; payments: number }) => (
            <Link key={s.abbr} href={`/states/${s.abbr.toLowerCase()}`} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow text-sm">
              <span className="font-semibold">{s.name}</span>
              <div className="text-right">
                <span className="font-mono text-primary">{fmtMoney(s.amount / s.payments)} avg</span>
                <span className="text-gray-400 ml-2">({fmt(s.payments)} payments)</span>
              </div>
            </Link>
          ))}
        </div>
        <p>
          The state-level averages reveal the same concentration pattern visible at the individual level.
          Top states have higher per-payment averages because they have more large operations pulling
          the average up. For the full state breakdown, see our{' '}
          <Link href="/analysis/state-disparities">state disparities analysis</Link>.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Who Are the Big Recipients?</h2>
        <p>
          Explore our <Link href="/recipients">top recipients page</Link> to see who&apos;s collecting the most.
          For more on the concentration of payments, read our analysis of{' '}
          <Link href="/analysis/subsidy-concentration">the 10% problem</Link>,{' '}
          <Link href="/analysis/corporate-farms">corporate farm recipients</Link>, or{' '}
          <Link href="/analysis/payment-limits">why payment limits don&apos;t work</Link>.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Source</p>
          <p>USDA Farm Service Agency payment records, 2017–2025. {fmt(stats.totalPayments)} total payments across
          {' '}{stats.totalPrograms} programs. USDA Census of Agriculture estimates approximately 2 million farms nationwide.</p>
        </div>


        <h2 className="font-[family-name:var(--font-heading)]">The Bottom Line</h2>
        <p>
          The average payment of {fmtMoney(avgPayment)} tells you almost nothing about American farm
          subsidies. The median is far lower. The top recipients collect orders of magnitude more.
          And the majority of farms receive nothing at all. If you want to understand farm subsidies,
          forget the average — look at the distribution.
        </p>
        <p>
          The distribution reveals a system that rewards scale, sophistication, and political
          connections over genuine need. It&apos;s a system where the &quot;average farmer&quot; politicians
          invoke doesn&apos;t actually exist — there are just millions of small operations getting
          little or nothing, and a few thousand large operations getting the lion&apos;s share.
          The {fmtMoney(avgPayment)} average is a statistical fiction that obscures the reality
          of who farm subsidies actually serve.
        </p>        <RelatedArticles currentSlug="average-farmer" />
      </div>
    </article>
  )
}
