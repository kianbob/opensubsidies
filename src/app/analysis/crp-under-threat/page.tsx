import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { loadData, fmtMoney, fmt } from '@/lib/utils'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'

export const metadata: Metadata = {
  title: 'CRP Under Threat: Is Conservation Keeping Up with Emergency Spending?',
  description: 'The Conservation Reserve Program at $15.7B is the largest traditional program. But emergency spending now dwarfs it. What are the policy implications?',
  alternates: { canonical: 'https://www.opensubsidies.us/analysis/crp-under-threat' },
}

export default function CrpUnderThreatPage() {
  const programs = loadData('programs.json') as { program: string; amount: number; payments: number }[]
  const programYearly = loadData('program-yearly.json') as { program: string; yearly: { year: number; amount: number; payments: number }[] }[]

  const crp = programs.find(p => p.program === 'CRP PAYMENT - ANNUAL RENTAL')
  const crpYearly = programYearly.find(p => p.program === 'CRP PAYMENT - ANNUAL RENTAL')?.yearly || []
  const crpTotal = crp?.amount || 0
  const crpPayments = crp?.payments || 0

  const emergencyProgs = programs.filter(p =>
    /EMERGENCY|DISASTER|RELIEF|ELAP|CFAP|WHIP|ERP|ECAP/i.test(p.program)
  )
  const emergencyTotal = emergencyProgs.reduce((s, p) => s + p.amount, 0)
  const totalAll = programs.reduce((s, p) => s + p.amount, 0)

  const crpLatest = crpYearly.length > 0 ? crpYearly[crpYearly.length - 1] : null
  const crpEarliest = crpYearly.length > 0 ? crpYearly[0] : null

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'CRP Under Threat' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'CRP Under Threat: Is Conservation Keeping Up with Emergency Spending?',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.us' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      <div className="mb-8">
        <div className="flex items-start justify-between">
          <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
          <ShareButtons title="CRP Under Threat: Is Conservation Keeping Up with Emergency Spending?" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          CRP Under Threat: Is Conservation Keeping Up with Emergency Spending?
        </h1>
        <p className="text-lg text-gray-600">
          At {fmtMoney(crpTotal)}, the Conservation Reserve Program is the largest traditional farm subsidy program.
          But emergency spending now dwarfs it at {fmtMoney(emergencyTotal)}. What does this mean for conservation?
        </p>
      </div>

      <div className="prose max-w-none">
        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 Key Insight</p>
          <p className="text-sm text-gray-700 mt-1">
            CRP has remained remarkably stable at ~$1.7–1.8B/year, while emergency programs surged to tens of billions.
            CRP now represents just {((crpTotal / totalAll) * 100).toFixed(1)}% of total farm spending.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">What Is the CRP?</h2>
        <p>
          The Conservation Reserve Program pays farmers <em>not</em> to farm environmentally sensitive land. Landowners
          receive annual rental payments in exchange for removing cropland from production and planting
          conservation cover — grasses, trees, or wildlife habitat. With {fmt(crpPayments)} payments totaling
          {' '}{fmtMoney(crpTotal)}, it&apos;s the single largest traditional (non-emergency) program in the USDA portfolio.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Steady as She Goes — While Everything Else Explodes</h2>
        <p>
          CRP annual spending has been remarkably consistent:
          {crpEarliest && crpLatest && ` from ${fmtMoney(crpEarliest.amount)} in ${crpEarliest.year} to ${fmtMoney(crpLatest.amount)} in ${crpLatest.year}.`}
          {' '}Meanwhile, emergency spending has gone from nearly zero to dominating the entire farm subsidy budget.
        </p>

        <div className="not-prose my-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-left font-semibold">Year</th><th className="px-4 py-2 text-right font-semibold">CRP Spending</th><th className="px-4 py-2 text-right font-semibold">Payments</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {crpYearly.map(y => (
                  <tr key={y.year} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{y.year}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtMoney(y.amount)}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmt(y.payments)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Policy Implications</h2>
        <p>
          As Congress debates Farm Bill reauthorization, CRP faces pressure from multiple directions.
          Commodity groups argue the land should return to production. Climate advocates want expanded
          conservation. And emergency spending keeps growing, competing for the same budget dollars.
        </p>
        <p>
          The fundamental tension: CRP prevents environmental damage proactively, while emergency programs
          react to crises after they occur. If climate change increases disaster frequency, the case for
          preventive conservation only gets stronger — but the political incentives favor visible crisis response.
        </p>
        <p>
          Read more about <Link href="/analysis/conservation-vs-commodity">conservation vs. commodity spending</Link> or
          explore the full <Link href="/programs">programs list</Link>.
        </p>
            <RelatedArticles currentSlug="crp-under-threat" />
</div>
    </article>
  )
}
