import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { loadData, fmtMoney, fmt } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What Does the Average Farmer Actually Get? The $4,600 Reality',
  description: '31.8M payments divided by $147B = ~$4,600 average. But the median is far lower. The inequality of farm subsidies explained.',
  alternates: { canonical: 'https://www.opensubsidies.us/analysis/average-farmer' },
}

export default function AverageFarmerPage() {
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalStates: number; totalPrograms: number }
  const programs = loadData('programs.json') as { program: string; amount: number; payments: number }[]

  const avgPayment = stats.totalAmount / stats.totalPayments
  const topPrograms = [...programs].sort((a, b) => b.amount - a.amount).slice(0, 5)
  const topProgramAvgs = topPrograms.map(p => ({ ...p, avg: p.amount / p.payments }))

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'The Average Farmer' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'What Does the Average Farmer Actually Get?',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.us' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
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
        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 Key Insight</p>
          <p className="text-sm text-gray-700 mt-1">
            The average farm subsidy payment is {fmtMoney(avgPayment)}, but this average is pulled up dramatically
            by large operations receiving millions. Most individual payments are far smaller — and 69% of farms receive nothing at all.
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
                    <td className="px-4 py-2 text-xs">{p.program}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtMoney(p.amount)}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmt(p.payments)}</td>
                    <td className="px-4 py-2 text-right font-mono font-semibold">{fmtMoney(p.avg)}</td>
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

        <h2 className="font-[family-name:var(--font-heading)]">Who Are the Big Recipients?</h2>
        <p>
          Explore our <Link href="/recipients">top recipients page</Link> to see who&apos;s collecting the most.
          For more on the concentration of payments, read our analysis of{' '}
          <Link href="/analysis/subsidy-concentration">the 10% problem</Link> or{' '}
          <Link href="/analysis/small-vs-large">small farms vs. large operations</Link>.
        </p>
      </div>
    </article>
  )
}
