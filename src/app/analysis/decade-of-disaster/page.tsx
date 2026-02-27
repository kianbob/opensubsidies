import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { loadData, fmtMoney, fmt } from '@/lib/utils'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'

export const metadata: Metadata = {
  title: 'A Decade of Disaster: How Emergency Programs Took Over Farm Subsidies',
  description: 'Emergency and disaster programs went from supplemental to dominant in US farm spending. Pre-2018 vs post-2018 data tells the story.',
  alternates: { canonical: 'https://www.opensubsidies.us/analysis/decade-of-disaster' },
}

export default function DecadeOfDisasterPage() {
  const yearly = loadData('yearly.json') as { year: number; amount: number; payments: number }[]
  const programs = loadData('programs.json') as { program: string; amount: number; payments: number }[]

  const pre2018 = yearly.filter(y => y.year >= 2017 && y.year <= 2018)
  const post2018 = yearly.filter(y => y.year >= 2019 && y.year <= 2025)
  const pre2018Avg = pre2018.reduce((s, y) => s + y.amount, 0) / (pre2018.length || 1)
  const post2018Avg = post2018.reduce((s, y) => s + y.amount, 0) / (post2018.length || 1)
  const peak = yearly.reduce((a, b) => a.amount > b.amount ? a : b)

  const disasterProgs = programs.filter(p =>
    /EMERGENCY|DISASTER|RELIEF|ELAP|CFAP|WHIP|ERP|ECAP/i.test(p.program)
  )
  const disasterTotal = disasterProgs.reduce((s, p) => s + p.amount, 0)
  const totalAmount = programs.reduce((s, p) => s + p.amount, 0)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'A Decade of Disaster' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'A Decade of Disaster: How Emergency Programs Took Over Farm Subsidies',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.us' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      <div className="mb-8">
        <div className="flex items-start justify-between">
          <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
          <ShareButtons title="A Decade of Disaster: How Emergency Programs Took Over Farm Subsidies" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          A Decade of Disaster: How Emergency Programs Took Over Farm Subsidies
        </h1>
        <p className="text-lg text-gray-600">
          In less than a decade, emergency and disaster programs went from a supplemental safety net to the
          dominant form of federal agricultural spending — accounting for {fmtMoney(disasterTotal)} of the total.
        </p>
      </div>

      <div className="prose max-w-none">
        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 Key Insight</p>
          <p className="text-sm text-gray-700 mt-1">
            Average annual spending jumped from {fmtMoney(pre2018Avg)} (2017–2018) to {fmtMoney(post2018Avg)} (2019–2025) — a {(post2018Avg / pre2018Avg).toFixed(1)}× increase. The peak year was {peak.year} at {fmtMoney(peak.amount)}.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Before and After</h2>
        <p>
          In 2017, total USDA farm subsidy spending stood at {fmtMoney(yearly.find(y => y.year === 2017)?.amount || 0)}.
          By 2020, it had exploded to {fmtMoney(yearly.find(y => y.year === 2020)?.amount || 0)} — a
          {' '}{((yearly.find(y => y.year === 2020)?.amount || 0) / (yearly.find(y => y.year === 2017)?.amount || 1)).toFixed(1)}× increase
          in just three years. The culprit? A cascade of crises: trade wars in 2018–2019, the COVID-19 pandemic
          in 2020, and ongoing climate disasters that triggered billions in emergency relief.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Emergency Spending by the Numbers</h2>
        <p>
          Our analysis identified {disasterProgs.length} emergency and disaster programs that collectively paid
          out {fmtMoney(disasterTotal)} — that&apos;s {((disasterTotal / totalAmount) * 100).toFixed(0)}% of all farm
          subsidies in the dataset. The largest include:
        </p>

        <div className="not-prose my-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-left font-semibold">Program</th><th className="px-4 py-2 text-right font-semibold">Amount</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {disasterProgs.sort((a, b) => b.amount - a.amount).slice(0, 10).map(p => (
                  <tr key={p.program} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-xs">{p.program}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtMoney(p.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The New Normal?</h2>
        <p>
          The shift to emergency spending raises fundamental questions about U.S. farm policy. Traditional programs
          like <Link href="/analysis/crp-conservation">CRP</Link> and Price Loss Coverage were designed for
          predictable support. But when emergencies become the norm — trade wars, pandemics, climate disasters — the
          &quot;emergency&quot; label starts to feel permanent.
        </p>
        <p>
          Even in the more recent years of 2023–2024, spending remains elevated well above the 2017 baseline,
          suggesting the era of emergency-dominated farm spending is far from over.
        </p>
        <p>
          Explore <Link href="/analysis/disaster-spending">our disaster spending analysis</Link> for program-level
          details, or see <Link href="/trends">spending trends</Link> over time.
        </p>
            <RelatedArticles currentSlug="decade-of-disaster" />
</div>
    </article>
  )
}
