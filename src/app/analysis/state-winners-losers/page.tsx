import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'State Winners & Losers: Who Gained Most from Emergency Spending?',
  description: 'Which states saw the biggest surge from emergency farm programs? Comparing 2017 baseline to 2020 peak ratios reveals clear winners and losers in the subsidy system.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/state-winners-losers' },
  openGraph: {
    title: 'State Winners & Losers: Who Gained Most from Emergency Spending?',
    description: 'Which states saw the biggest surge from emergency farm programs? Comparing 2017 baseline to 2020 peak ratios.',
    url: 'https://www.opensubsidies.org/analysis/state-winners-losers',
    type: 'article',
  },
}

type StateYearlyRow = { state: string; year: number; payments: number; amount: number }

export default function StateWinnersLosersPage() {
  const stateYearly = loadData('state-yearly.json') as StateYearlyRow[]
  const states = loadData('states.json') as { abbr: string; name: string; amount: number; payments: number }[]
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalPrograms: number; dataYears: string }

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
  const avgRatio = ratios.reduce((s, r) => s + r.ratio, 0) / ratios.length
  const medianRatio = ratios[Math.floor(ratios.length / 2)]?.ratio
  const totalGain = ratios.reduce((s, r) => s + r.gain, 0)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="State Winners & Losers: Who Gained Most from Emergency Spending?" description="Which states saw the biggest surge from emergency farm programs?" slug="analysis/state-winners-losers" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'State Winners & Losers' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'State Winners & Losers: Who Gained Most from Emergency Spending?',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.org' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question', name: 'Which state gained the most from emergency farm spending?',
            acceptedAnswer: { '@type': 'Answer', text: winners[0] ? `${winners[0].name} saw the largest relative increase, with farm subsidies surging ${winners[0].ratio.toFixed(1)}× from ${fmtMoney(winners[0].baseline)} in 2017 to ${fmtMoney(winners[0].peak)} in 2020 — driven primarily by CFAP pandemic relief and MFP trade war payments.` : 'Data not available.' },
          },
          {
            '@type': 'Question', name: 'Why did some states benefit more from emergency farm programs?',
            acceptedAnswer: { '@type': 'Answer', text: 'States with large commodity crop operations (corn, soybeans, cotton) and livestock producers saw the biggest gains because CFAP and MFP payments were tied to planted acreage and livestock inventory. States with diversified agriculture or specialty crops saw smaller relative increases even if their absolute subsidies remained substantial.' },
          },
          {
            '@type': 'Question', name: 'How much did total farm spending increase from 2017 to 2020?',
            acceptedAnswer: { '@type': 'Answer', text: `Across all states, the total spending increase from 2017 to 2020 was approximately ${fmtMoney(totalGain)}. The average state saw spending increase by ${avgRatio.toFixed(1)}× during this period, driven by trade war bailouts (2018-2019) and COVID relief (2020).` },
          },
        ],
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

        {/* Stat cards */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Biggest Winner', value: `${winners[0]?.ratio.toFixed(1)}×`, sub: winners[0]?.name || '' },
            { label: 'Smallest Gain', value: `${losers[0]?.ratio.toFixed(1)}×`, sub: losers[0]?.name || '' },
            { label: 'Average Increase', value: `${avgRatio.toFixed(1)}×`, sub: 'All states' },
            { label: 'Total Surge', value: fmtMoney(totalGain), sub: '2017 → 2020 increase' },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm font-medium text-gray-900">{s.label}</div>
              <div className="text-xs text-gray-500">{s.sub}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Biggest Winners (2017 → 2020)</h2>
        <p>
          These states saw the largest relative increase in farm subsidy spending from 2017 to 2020,
          driven primarily by CFAP (COVID relief), MFP (trade war payments), and other emergency programs.
          A ratio of 3.0× means the state received three times as much in 2020 as it did in 2017 —
          with the increase coming almost entirely from emergency programs.
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

        <h2 className="font-[family-name:var(--font-heading)]">Why These States Won</h2>
        <p>
          The winning states share common agricultural profiles: large-scale commodity crop production
          (corn, soybeans, cotton) and significant livestock operations. These are exactly the sectors
          targeted by both MFP trade war payments and CFAP pandemic relief. States whose agriculture
          is concentrated in these commodities saw their subsidies multiply.
        </p>
        <p>
          {winners[0] && <>{winners[0].name}&apos;s {winners[0].ratio.toFixed(1)}× increase — from {fmtMoney(winners[0].baseline)} to {fmtMoney(winners[0].peak)} — represents an additional {fmtMoney(winners[0].gain)} in
          federal farm payments. This windfall didn&apos;t just temporarily boost farm income; it
          funded land purchases, equipment upgrades, and operation expansion that permanently
          changed the state&apos;s agricultural landscape.</>}
        </p>

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

        <h2 className="font-[family-name:var(--font-heading)]">The Disparity Gap</h2>
        <p>
          The gap between winners and losers is significant. {winners[0] && losers[0] && <>While {winners[0].name} saw
          a {winners[0].ratio.toFixed(1)}× increase, {losers[0].name} saw just {losers[0].ratio.toFixed(1)}×.
          This means emergency spending amplified existing disparities rather than distributing relief
          evenly.</>}
        </p>
        <p>
          States that were already disadvantaged by the commodity-focused subsidy system — those with
          diversified agriculture, specialty crops, or smaller farm sectors — saw the smallest gains
          from emergency programs designed around the same commodity framework. Emergency spending
          didn&apos;t just temporarily boost certain states; it widened the structural gap between
          commodity-dominated states and the rest.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Permanent Baseline Shift</h2>
        <p>
          For winning states, the 2020 peak established a new reference point. When spending
          &quot;normalizes&quot; after emergencies, it often settles at a level above the pre-emergency
          baseline. States that received {fmtMoney(totalGain)} in additional spending during
          the emergency years now have constituencies — farmers, equipment dealers, land sellers —
          who depend on elevated federal payments.
        </p>
        <p>
          This dynamic makes spending cuts politically difficult. Returning to 2017 spending levels
          would feel like a &quot;cut&quot; to states that have grown accustomed to 2020-era
          payments, even though 2017 levels were already historically generous. The
          <Link href="/analysis/covid-spending"> COVID spending analysis</Link> details how
          this baseline shift works across the entire farm subsidy system.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What Drove the Differences?</h2>
        <p>
          The biggest winners tend to be states with large commodity crop operations (corn, soybeans, cotton)
          and livestock producers — exactly the sectors targeted by CFAP and MFP payments. States with more
          diversified agriculture or specialty crops saw smaller relative gains, even if their absolute
          subsidies remained substantial.
        </p>
        <p>
          Livestock states saw particularly large increases because CFAP included generous provisions for
          cattle, dairy, and hog producers. The pandemic devastated meat processing capacity — plant
          closures meant farmers couldn&apos;t sell their animals — and CFAP payments compensated
          for these losses. States with large feedlot and dairy operations saw some of the biggest
          spending surges.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Per-Capita Amplifier</h2>
        <p>
          Emergency spending amplified the existing <Link href="/analysis/per-capita">per-capita
          disparities</Link> between states. States that already received high per-capita subsidies
          (like the Dakotas, Kansas, and Montana) saw their per-person figures surge even further
          during the emergency years. States with low per-capita subsidies (like California, New York,
          and New Jersey) saw modest increases that barely moved their per-person figures.
        </p>
        <p>
          The result: emergency spending made the geographic concentration of farm subsidies even
          more extreme. The <Link href="/analysis/county-hotspots">county hotspots analysis</Link>
          shows similar concentration at the sub-state level — the same counties that dominate
          traditional programs also collected the most emergency dollars.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Implications for Policy</h2>
        <p>
          If emergency spending systematically benefits some states over others, it raises questions
          about whether these programs serve their stated purpose of broad agricultural relief or
          function as targeted transfers to specific regions and commodities.
        </p>
        <p>
          The <Link href="/farm-subsidy-reform">reform analysis</Link> proposes emergency spending
          guardrails — including automatic sunset clauses, spending caps, and broader eligibility
          criteria — that could ensure future emergency programs distribute relief more equitably.
          The <Link href="/doge-farm-subsidies">DOGE efficiency review</Link> identifies the
          state-level disparities as evidence that emergency programs need fundamental redesign.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Frequently Asked Questions</h2>

        <h3>Which state gained the most from emergency farm spending?</h3>
        <p>
          {winners[0] && <>{winners[0].name} saw the largest relative increase at {winners[0].ratio.toFixed(1)}×,
          with spending jumping from {fmtMoney(winners[0].baseline)} in 2017 to {fmtMoney(winners[0].peak)} in 2020.
          This was driven primarily by CFAP pandemic relief and MFP trade war payments.</>}
        </p>

        <h3>Why did some states benefit more from emergency programs?</h3>
        <p>
          Emergency programs (CFAP, MFP) were designed around commodity crops and livestock — exactly the
          sectors that dominate agriculture in the winning states. States with diversified agriculture or
          specialty crops saw smaller relative gains because their farmers didn&apos;t qualify for the
          largest emergency payment categories.
        </p>

        <h3>Did emergency spending change the long-term subsidy landscape?</h3>
        <p>
          Yes. The emergency years established new spending baselines that are difficult to reverse
          politically. States that received windfall emergency payments now have constituencies
          dependent on elevated federal spending, making a return to pre-2018 levels unlikely.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Sources</p>
          <p>USDA Farm Service Agency payment data ({stats.dataYears}). State-yearly aggregations from FSA records.
          For state-by-state details, explore the <Link href="/compare" className="text-primary hover:underline">state comparison tool</Link> or
          see the full <Link href="/rankings" className="text-primary hover:underline">state rankings</Link>.</p>
        </div>

        <RelatedArticles currentSlug="state-winners-losers" />
      </div>
    </article>
  )
}
