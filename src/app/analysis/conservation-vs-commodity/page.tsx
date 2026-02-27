import Breadcrumbs from '@/components/Breadcrumbs'
import { loadData, fmtMoney, fmt } from '@/lib/utils'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Conservation vs. Commodity: Two Philosophies of Farm Spending',
  description: 'CRP pays farmers not to farm. Commodity programs pay them to produce. How do these two approaches compare in federal farm spending?',
}

export default function ConservationVsCommodity() {
  const programs = loadData('programs.json')

  const conservation = programs.filter((p: { program: string }) => /CRP|CONSERVATION|ACEP|CSP/i.test(p.program))
  const commodity = programs.filter((p: { program: string }) => /ARC|PLC|PRICE LOSS|RISK COVERAGE|LOAN DEFICIENCY/i.test(p.program))
  const conservationTotal = conservation.reduce((s: number, p: { amount: number }) => s + p.amount, 0)
  const commodityTotal = commodity.reduce((s: number, p: { amount: number }) => s + p.amount, 0)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Conservation vs. Commodity' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Conservation vs. Commodity: Two Philosophies of Farm Spending',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies' }, datePublished: '2026-02-27',
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Conservation vs. Commodity: Two Philosophies of Farm Spending
        </h1>
      <ShareButtons title="" />
      </div>

      <div className="prose max-w-none">
        <p className="text-lg text-gray-600">
          Federal farm spending is split between two fundamentally different ideas: paying farmers to produce crops
          (commodity subsidies) and paying farmers to protect the environment (conservation programs). The balance
          between them reveals our priorities.
        </p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-bold text-green-800 mb-1">🌿 Conservation Programs</h3>
            <div className="text-3xl font-bold text-green-700">{fmtMoney(conservationTotal)}</div>
            <p className="text-sm text-green-600 mt-1">{conservation.length} programs · Pays to protect land</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <h3 className="text-lg font-bold text-amber-800 mb-1">🌾 Commodity Programs</h3>
            <div className="text-3xl font-bold text-amber-700">{fmtMoney(commodityTotal)}</div>
            <p className="text-sm text-amber-600 mt-1">{commodity.length} programs · Pays to produce crops</p>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">How Conservation Works</h2>
        <p>
          The Conservation Reserve Program (CRP) is the largest conservation program, paying farmers annual
          rental payments to take environmentally sensitive land out of production. The idea is simple:
          some land is worth more to society as habitat, watershed protection, or carbon sink than as cropland.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">How Commodity Programs Work</h2>
        <p>
          Agriculture Risk Coverage (ARC) and Price Loss Coverage (PLC) are the main commodity programs.
          They pay farmers when crop prices or revenues fall below historical benchmarks. The intent is
          to smooth income volatility, but critics argue they primarily benefit large-scale commodity producers
          who could absorb market swings without taxpayer help.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Debate</h2>
        <p>
          Conservation advocates argue that CRP and similar programs provide measurable public benefits:
          cleaner water, wildlife habitat, reduced soil erosion, and carbon sequestration. Commodity program
          supporters counter that keeping farms profitable ensures food security and rural economic stability.
        </p>
        <p>
          The data shows that emergency and disaster spending has eclipsed both traditional categories.
          But when Congress writes the farm bill, the conservation vs. commodity debate still drives
          the biggest allocation decisions.
        </p>
            <RelatedArticles currentSlug="conservation-vs-commodity" />
</div>
    </article>
  )
}
