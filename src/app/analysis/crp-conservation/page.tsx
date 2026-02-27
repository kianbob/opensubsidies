import Breadcrumbs from '@/components/Breadcrumbs'
import { fmtMoney, fmt , formatProgram } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'The Conservation Reserve Program: Paying Farmers Not to Farm',
  description: 'A deep dive into the $5.36B CRP program — how it works, why it\'s controversial, and its environmental benefits.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/crp-conservation' },
}

export default function CRPConservation() {
  const programs = loadData('programs.json') as { program: string; code: string; payments: number; amount: number }[]

  const crpPrograms = programs.filter(p => /\bCRP\b/i.test(p.program)).sort((a, b) => b.amount - a.amount)
  const crpTotal = crpPrograms.reduce((s, p) => s + p.amount, 0)
  const crpPayments = crpPrograms.reduce((s, p) => s + p.payments, 0)
  const allTotal = programs.reduce((s, p) => s + p.amount, 0)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="The Conservation Reserve Program: Paying Farmers Not to Farm" description="A deep dive into the $5.36B CRP program — how it works, why it\" slug="crp-conservation" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'CRP Conservation' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'The Conservation Reserve Program: Paying Farmers Not to Farm',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies' }, datePublished: '2026-02-27',
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          The Conservation Reserve Program: Paying Farmers Not to Farm
        </h1>
      <ShareButtons title="" />
        <p className="text-lg text-gray-600">
          The CRP pays landowners annual rent to take environmentally sensitive cropland out of production.
          It&apos;s one of the largest farm programs — and one of the most debated.
        </p>
      </div>

      {/* Key Finding */}
      <div className="bg-green-50 border-l-4 border-primary p-5 rounded-r-lg mb-8">
        <p className="font-semibold text-primary text-sm uppercase tracking-wide mb-1">Key Finding</p>
        <p className="text-gray-900 font-medium">
          CRP and its variants account for {fmtMoney(crpTotal)} in payments — {((crpTotal / allTotal) * 100).toFixed(1)}% of
          all farm subsidies — across {fmt(crpPayments)} individual payments.
        </p>
      </div>

      <div className="prose max-w-none">
        <h2 className="font-[family-name:var(--font-heading)]">How CRP Works</h2>
        <p>
          Created in the 1985 Farm Bill, the Conservation Reserve Program offers farmers 10-15 year contracts.
          In exchange for taking fragile land out of production, the USDA pays annual rental rates based on
          the soil&apos;s productivity and local land values. Enrolled land must be planted with grasses, trees,
          or other conservation cover.
        </p>
        <p>
          At its peak, CRP enrolled over 36 million acres — an area roughly the size of Iowa. Currently,
          about 23 million acres are enrolled, with a statutory cap of 27 million.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">CRP Variants in the Data</h2>
        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Program</th>
                  <th className="px-4 py-2 text-right font-semibold">Total</th>
                  <th className="px-4 py-2 text-right font-semibold">Payments</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {crpPrograms.map((p, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{formatProgram(p.program)}</td>
                    <td className="px-4 py-2 text-right font-mono text-primary">{fmtMoney(p.amount)}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{fmt(p.payments)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 font-semibold">
                <tr>
                  <td className="px-4 py-2">Total CRP</td>
                  <td className="px-4 py-2 text-right font-mono text-primary">{fmtMoney(crpTotal)}</td>
                  <td className="px-4 py-2 text-right">{fmt(crpPayments)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Controversy: Paying to NOT Produce</h2>
        <p>
          Critics argue that CRP reduces food production at a time when global demand is rising. They
          point out that rental payments often go to landowners who don&apos;t farm at all — including
          investors and retirees. In some rural counties, so much land is enrolled in CRP that local
          economies feel the impact of reduced agricultural activity.
        </p>
        <p>
          Supporters counter that CRP delivers enormous environmental benefits: reduced soil erosion,
          improved water quality, carbon sequestration, and critical wildlife habitat. The program
          prevents an estimated 600 million tons of soil from eroding each year and has been credited
          with reviving populations of pheasants, ducks, and grassland songbirds.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Bottom Line</h2>
        <p>
          CRP represents a fundamentally different philosophy of farm spending — paying for
          environmental outcomes rather than crop production. Whether that&apos;s good policy depends on
          how you weigh food production against conservation. The dollars suggest Congress values both:
          CRP accounts for {((crpTotal / allTotal) * 100).toFixed(1)}% of the subsidy budget, while
          commodity and disaster programs claim the lion&apos;s share.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Sources</p>
          <p>USDA Farm Service Agency payment data (1995–2024). Program totals from FSA payment files.
          Explore all programs on the <Link href="/programs" className="text-primary hover:underline">Programs page</Link>.</p>
        </div>
            <RelatedArticles currentSlug="crp-conservation" />
</div>
    </article>
  )
}
