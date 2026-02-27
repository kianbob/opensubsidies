import Breadcrumbs from '@/components/Breadcrumbs'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Farm Subsidies Per Capita: Which States Get the Most Per Person?',
  description: 'North Dakota receives over $6,000 per person in farm subsidies while California gets under $100. See how farm subsidy spending breaks down per capita.',
}

// Census 2024 estimated populations for state subsidy per-capita
const statePopulations: Record<string, number> = {
  TX: 30503000, IA: 3201000, KS: 2940000, MN: 5738000, NE: 1967000,
  ND: 783000, SD: 910000, IL: 12550000, MO: 6178000, GA: 10913000,
  AR: 3046000, MT: 1123000, OK: 4020000, OH: 11788000, IN: 6834000,
  WI: 5897000, CO: 5878000, CA: 38965000, LA: 4590000, MS: 2940000,
  NC: 10697000, WA: 7813000, FL: 22611000, MI: 10038000, AL: 5074000,
  OR: 4241000, ID: 1964000, VA: 8643000, PA: 12962000, KY: 4527000,
  TN: 7052000, SC: 5282000, NM: 2114000, NJ: 9290000, NY: 19572000,
  WY: 577000, AZ: 7431000, MD: 6180000, UT: 3418000, CT: 3619000,
  MA: 7002000, ME: 1396000, NH: 1396000, VT: 648000, WV: 1770000,
  RI: 1096000, HI: 1436000, NV: 3180000, DE: 1018000, DC: 678000,
}

export default function PerCapitaPage() {
  const states = loadData('states.json') as { abbr: string; name: string; amount: number; payments: number }[]

  const withPerCapita = states
    .filter(s => statePopulations[s.abbr])
    .map(s => ({
      ...s,
      pop: statePopulations[s.abbr],
      perCapita: s.amount / statePopulations[s.abbr],
    }))
    .sort((a, b) => b.perCapita - a.perCapita)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Per Capita Analysis' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Farm Subsidies Per Capita by State',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies' }, datePublished: '2026-02-27',
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Farm Subsidies Per Capita: Which States Get the Most Per Person?
        </h1>
      <ShareButtons title="" />
        <p className="text-lg text-gray-600">
          Total spending tells one story. Per-capita spending tells another. When you divide farm subsidies
          by state population, the rankings shift dramatically — rural states with small populations dominate.
        </p>
      </div>

      <div className="prose max-w-none">
        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 Key Finding</p>
          <p className="text-sm text-gray-700 mt-1">
            {withPerCapita[0]?.name} leads at ${withPerCapita[0]?.perCapita.toFixed(0)} per person —
            over {Math.round(withPerCapita[0]?.perCapita / (withPerCapita.find(s => s.abbr === 'CA')?.perCapita || 1))}x what California receives per person.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Farm Subsidies Per Capita by State</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">#</th>
              <th className="px-4 py-3 text-left font-semibold">State</th>
              <th className="px-4 py-3 text-right font-semibold">Per Capita</th>
              <th className="px-4 py-3 text-right font-semibold hidden md:table-cell">Total</th>
              <th className="px-4 py-3 text-right font-semibold hidden lg:table-cell">Population</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {withPerCapita.map((s, i) => (
              <tr key={s.abbr} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                <td className="px-4 py-3"><Link href={`/states/${s.abbr.toLowerCase()}`} className="text-primary hover:underline font-medium">{s.name}</Link></td>
                <td className="px-4 py-3 text-right font-mono font-bold text-primary">${s.perCapita.toFixed(0)}</td>
                <td className="px-4 py-3 text-right font-mono text-gray-600 hidden md:table-cell">{fmtMoney(s.amount)}</td>
                <td className="px-4 py-3 text-right text-gray-500 hidden lg:table-cell">{fmt(s.pop)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose max-w-none">
        <h2 className="font-[family-name:var(--font-heading)]">Why Per Capita Matters</h2>
        <p>
          Texas may receive the most total farm subsidy dollars, but when you account for population,
          the picture changes completely. States like North Dakota, South Dakota, and Kansas — with
          small populations and massive agricultural sectors — receive far more per person.
        </p>
        <p>
          This means that in farming states, a much larger share of the state&apos;s economic activity
          is subsidized by federal taxpayers. The per-capita view raises important questions about
          how farm policy distributes costs and benefits across the country.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Methodology</p>
          <p>Farm subsidy data from USDA FSA (2017-2025). Population estimates from U.S. Census Bureau (2024).
          Per capita = total state subsidies ÷ state population.</p>
        </div>
            <RelatedArticles currentSlug="per-capita" />
</div>
    </article>
  )
}
