import Breadcrumbs from '@/components/Breadcrumbs'
import { fmtMoney, fmt , formatProgram } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'The Disaster Money Machine: $20 Billion in Emergency Farm Payments',
  description: 'Emergency and disaster programs now dwarf traditional farm subsidies. ECAP, CFAP, and livestock relief programs paid out over $20 billion in 2017-2025.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/disaster-spending' },
}

export default function DisasterSpending() {
  const programs = loadData('programs.json')
  const stats = loadData('stats.json')

  const disasterProgs = programs.filter((p: { program: string }) =>
    /EMERGENCY|DISASTER|RELIEF|ELAP|CFAP/i.test(p.program)
  )
  const disasterTotal = disasterProgs.reduce((s: number, p: { amount: number }) => s + p.amount, 0)
  const disasterPct = ((disasterTotal / stats.totalAmount) * 100).toFixed(0)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="The Disaster Money Machine: $20 Billion in Emergency Farm Payments" description="Emergency and disaster programs now dwarf traditional farm subsidies. ECAP, CFAP, and livestock relief programs paid out over $20 billion in 2017-2025." slug="analysis/disaster-spending" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Disaster Spending' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'The Disaster Money Machine: Emergency Farm Payments',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.org' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          The Disaster Money Machine: {fmtMoney(disasterTotal)} in Emergency Farm Payments
        </h1>
      <ShareButtons title="" />
        <p className="text-lg text-gray-600">
          Emergency and disaster relief programs now account for {disasterPct}% of all farm subsidy spending.
          What started as a safety net has become the primary mechanism for federal agricultural support.
        </p>
      </div>

      <div className="prose max-w-none">
        <h2 className="font-[family-name:var(--font-heading)]">The Shift to Emergency Spending</h2>
        <p>
          Traditional farm subsidies — direct payments, price supports, crop insurance — used to be the backbone
          of federal agricultural spending. Not anymore. Our analysis of {fmt(stats.totalPayments)} USDA payment
          records shows that emergency and disaster programs now dominate the farm subsidy landscape.
        </p>

        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 Key Finding</p>
          <p className="text-sm text-gray-700 mt-1">
            {disasterProgs.length} emergency/disaster programs paid out {fmtMoney(disasterTotal)} — that&apos;s
            {' '}{disasterPct}% of all farm subsidies in our dataset.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Biggest Emergency Programs</h2>
        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Program</th>
                  <th className="px-4 py-2 text-right font-semibold">Amount</th>
                  <th className="px-4 py-2 text-right font-semibold">Payments</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {disasterProgs.slice(0, 15).map((p: { program: string; amount: number; payments: number }, i: number) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{formatProgram(p.program)}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtMoney(p.amount)}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{fmt(p.payments)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Why It Matters</h2>
        <p>
          Emergency spending is harder to scrutinize than regular farm bill programs. When every year brings
          new &quot;emergency&quot; appropriations, the distinction between regular support and crisis response
          disappears. Farmers who once relied on crop insurance and price supports now depend on ad hoc
          disaster programs that Congress creates with less oversight and fewer guardrails.
        </p>
        <p>
          The question isn&apos;t whether farmers need help during genuine disasters — they do. The question is
          whether a system built on perpetual emergencies is the most efficient or accountable way to
          support American agriculture. With climate change increasing the frequency of extreme weather,
          the disaster spending machine shows no signs of slowing down.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Source</p>
          <p>Analysis based on USDA Farm Service Agency payment records, 2017-2025. Programs classified as
          &quot;emergency/disaster&quot; based on program name containing Emergency, Disaster, Relief, ELAP, or CFAP.</p>
        </div>
            <RelatedArticles currentSlug="disaster-spending" />
</div>
    </article>
  )
}
