import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { loadData, fmtMoney, fmt } from '@/lib/utils'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'

export const metadata: Metadata = {
  title: 'State Winners & Losers: Who Gained Most from Emergency Spending?',
  description: 'Which states saw the biggest surge from emergency farm programs? Comparing 2017 baseline to 2020 peak ratios reveals clear winners and losers.',
  alternates: { canonical: 'https://www.opensubsidies.us/analysis/state-winners-losers' },
}

type StateYearlyRow = { state: string; year: number; payments: number; amount: number }

export default function StateWinnersLosersPage() {
  const stateYearly = loadData('state-yearly.json') as StateYearlyRow[]
  const states = loadData('states.json') as { abbr: string; name: string; amount: number; payments: number }[]

  const stateMap = Object.fromEntries(states.map(s => [s.abbr, s]))

  // Compare 2017 baseline to 2020 peak
  const baseline2017 = Object.fromEntries(
    stateYearly.filter(r => r.year === 2017).map(r => [r.state, r.amount])
  )
  const peak2020 = Object.fromEntries(
    stateYearly.filter(r => r.year === 2020).map(r => [r.state, r.amount])
  )

  const ratios = states
    .filter(s => baseline2017[s.abbr] && baseline2017[s.abbr] > 1000000 && peak2020[s.abbr])
    .map(s => ({
      abbr: s.abbr,
      name: s.name,
      baseline: baseline2017[s.abbr],
      peak: peak2020[s.abbr],
      ratio: peak2020[s.abbr] / baseline2017[s.abbr],
      gain: peak2020[s.abbr] - baseline2017[s.abbr],
    }))
    .sort((a, b) => b.ratio - a.ratio)

  const winners = ratios.slice(0, 10)
  const losers = [...ratios].sort((a, b) => a.ratio - b.ratio).slice(0, 10)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'State Winners & Losers' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'State Winners & Losers: Who Gained Most from Emergency Spending?',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.us' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      <div className="mb-8">
        <div className="flex items-start justify-between">
          <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
          <ShareButtons title="State Winners & Losers: Who Gained Most from Emergency Spending?" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          State Winners &amp; Losers: Who Gained Most from Emergency Spending?
        </h1>
        <p className="text-lg text-gray-600">
          The explosion of emergency farm programs didn&apos;t affect all states equally. Comparing 2017 baseline
          spending to the 2020 peak reveals which states rode the emergency wave — and which were left behind.
        </p>
      </div>

      <div className="prose max-w-none">
        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 Key Insight</p>
          <p className="text-sm text-gray-700 mt-1">
            {winners[0] && <>The biggest winner was <strong>{winners[0].name}</strong>, which saw spending surge {winners[0].ratio.toFixed(1)}× from {fmtMoney(winners[0].baseline)} in 2017 to {fmtMoney(winners[0].peak)} in 2020.</>}
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Biggest Winners (2017 → 2020)</h2>
        <p>
          These states saw the largest relative increase in farm subsidy spending from 2017 to 2020,
          driven primarily by CFAP (COVID relief), MFP (trade war payments), and other emergency programs.
        </p>

        <div className="not-prose my-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">#</th>
                  <th className="px-4 py-2 text-left font-semibold">State</th>
                  <th className="px-4 py-2 text-right font-semibold">2017</th>
                  <th className="px-4 py-2 text-right font-semibold">2020</th>
                  <th className="px-4 py-2 text-right font-semibold">Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {winners.map((s, i) => (
                  <tr key={s.abbr} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-2"><Link href={`/states/${s.abbr.toLowerCase()}`} className="text-primary hover:underline font-medium">{s.name}</Link></td>
                    <td className="px-4 py-2 text-right font-mono">{fmtMoney(s.baseline)}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtMoney(s.peak)}</td>
                    <td className="px-4 py-2 text-right font-mono font-bold text-green-700">{s.ratio.toFixed(1)}×</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Smallest Gains</h2>
        <p>
          Not every state benefited equally from emergency spending. These states saw the smallest relative
          increases — in some cases because they were already large recipients of traditional programs, and
          in others because their agricultural sectors didn&apos;t qualify for the biggest emergency programs.
        </p>

        <div className="not-prose my-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">#</th>
                  <th className="px-4 py-2 text-left font-semibold">State</th>
                  <th className="px-4 py-2 text-right font-semibold">2017</th>
                  <th className="px-4 py-2 text-right font-semibold">2020</th>
                  <th className="px-4 py-2 text-right font-semibold">Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {losers.map((s, i) => (
                  <tr key={s.abbr} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-2"><Link href={`/states/${s.abbr.toLowerCase()}`} className="text-primary hover:underline font-medium">{s.name}</Link></td>
                    <td className="px-4 py-2 text-right font-mono">{fmtMoney(s.baseline)}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtMoney(s.peak)}</td>
                    <td className="px-4 py-2 text-right font-mono font-bold text-red-600">{s.ratio.toFixed(1)}×</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">What Drove the Differences?</h2>
        <p>
          The biggest winners tend to be states with large commodity crop operations (corn, soybeans, cotton)
          and livestock producers — exactly the sectors targeted by CFAP and MFP payments. States with more
          diversified agriculture or specialty crops saw smaller relative gains, even if their absolute
          subsidies remained substantial.
        </p>
        <p>
          For state-by-state details, explore our <Link href="/compare">state comparison tool</Link> or
          see the full <Link href="/rankings">state rankings</Link>.
        </p>
            <RelatedArticles currentSlug="state-winners-losers" />
</div>
    </article>
  )
}
