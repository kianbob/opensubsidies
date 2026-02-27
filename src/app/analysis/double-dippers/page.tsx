import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { fmt, fmtMoney } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import RelatedArticles from '@/components/RelatedArticles'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Double Dippers: Recipients Collecting from Multiple Programs',
  description: 'Over 620,000 farm subsidy recipients collect from 3+ USDA programs simultaneously. Top recipients tap into 14 programs at once, raising questions about payment limit circumvention.',
  alternates: { canonical: 'https://www.opensubsidies.us/analysis/double-dippers' },
}

export default function DoubleDippersPage() {
  const data = loadData('multi-program.json') as {
    stats: { total_recipients: number; multi_2plus: number; multi_3plus: number; multi_5plus: number; multi_10plus: number }
    top: { name: string; state: string; programs: number; total: number }[]
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Double Dippers' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Double Dippers: Recipients Collecting from Multiple Programs',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.us' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Double Dippers: Recipients Collecting from Multiple Programs
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-lg text-gray-600">Over {fmt(data.stats.multi_3plus)} recipients collect from 3 or more USDA programs simultaneously.</p>
          <ShareButtons title="Double Dippers: Multi-Program Recipients" />
        </div>
      </div>

      <div className="prose max-w-none">
        {/* Stats */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: '2+ Programs', value: fmt(data.stats.multi_2plus) },
            { label: '3+ Programs', value: fmt(data.stats.multi_3plus) },
            { label: '5+ Programs', value: fmt(data.stats.multi_5plus) },
            { label: '10+ Programs', value: fmt(data.stats.multi_10plus) },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Top 20 Multi-Program Recipients</h2>
        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2">#</th>
                <th className="text-left py-3 px-2">Recipient</th>
                <th className="text-left py-3 px-2">State</th>
                <th className="text-right py-3 px-2">Programs</th>
                <th className="text-right py-3 px-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.top.map((r, i) => (
                <tr key={r.name} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-2 text-gray-500">{i + 1}</td>
                  <td className="py-2 px-2 font-medium">{r.name}</td>
                  <td className="py-2 px-2">{r.state}</td>
                  <td className="text-right py-2 px-2 font-bold text-primary">{r.programs}</td>
                  <td className="text-right py-2 px-2">{fmtMoney(r.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Why This Happens</h2>
        <p>
          The USDA operates <Link href="/analysis/program-proliferation">157 distinct programs</Link>, each with its own eligibility
          criteria, payment limits, and funding sources. A single farming operation can simultaneously collect from commodity programs
          (ARC, PLC), conservation programs (CRP, EQIP), disaster programs (ELAP, LFP), and emergency programs (CFAP, ERP) — all legally.
        </p>
        <p>
          This isn&apos;t necessarily fraud. Many of these programs serve different purposes and are designed to stack. A cattle rancher in
          Texas might legitimately receive disaster livestock payments, conservation stewardship payments, and commodity price supports
          in the same year.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Payment Limit Question</h2>
        <p>
          While individual programs have payment caps (typically $125,000/year), there&apos;s no aggregate cap across all programs.
          A recipient collecting from 10+ programs can legally receive well over $1 million annually from the USDA, far exceeding
          what any single program limit would allow.
        </p>
        <p>
          Some operations structure themselves as multiple LLCs or partnerships, with each entity qualifying independently for
          the same programs. This legal but controversial strategy effectively multiplies the payment limits.
          See our analysis on <Link href="/analysis/payment-limits">payment limits</Link> and <Link href="/analysis/corporate-farms">corporate recipients</Link>.
        </p>
      </div>

      <RelatedArticles currentSlug="double-dippers" />
    </article>
  )
}
