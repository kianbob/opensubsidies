import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { loadData } from '@/lib/server-utils'
import RelatedArticles from '@/components/RelatedArticles'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What $147 Billion in Farm Subsidies Could Buy Instead',
  description: '$147 billion in farm subsidies could fund 2.2 million teachers, 5.8 million Pell Grants, or 6 years of NASA. Here\'s what America spent on farm payments — and what else it could have bought.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/what-147b-buys' },
}

export default function What147BBuysPage() {
  const data = loadData('taxpayer-cost.json') as {
    total: number; comparisons: { label: string; count: number; unit: string }[]
  }

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
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'What $147B Buys' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'What $147 Billion in Farm Subsidies Could Buy Instead',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.org' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
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
          Between 2017 and 2025, the USDA distributed <strong>$147 billion</strong> in farm subsidy payments through the
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
          <div className="text-5xl font-bold">$147,000,000,000</div>
          <div className="text-xl mt-2 opacity-90">Total USDA farm subsidy payments, 2017–2025</div>
          <div className="text-sm mt-4 opacity-75">That&apos;s $109 per taxpayer per year — or $982 over the full period</div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Context, Not Judgment</h2>
        <p>
          These comparisons aren&apos;t meant to argue that farm subsidies should be eliminated. Agriculture is essential infrastructure,
          and some level of support helps manage risk in an inherently volatile industry. But putting the numbers in context helps
          citizens understand the scale of these programs and make informed decisions about priorities.
        </p>
        <p>
          The real question isn&apos;t whether to spend on agriculture — it&apos;s whether <em>this</em> spending is effective.
          When 70% of subsidy dollars flow to the top 10% of recipients, and the smallest farms receive almost nothing,
          it&apos;s worth asking if there&apos;s a better way to support American agriculture.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Share These Numbers</h2>
        <p>
          Think more people should see this? Share this page and help make farm subsidy spending part of the public conversation.
          Transparency is the first step toward better policy.
        </p>
      </div>

      <RelatedArticles currentSlug="what-147b-buys" />
    </article>
  )
}
