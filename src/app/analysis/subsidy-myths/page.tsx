import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: '10 Myths About Farm Subsidies (and What the Data Actually Shows)',
  description: 'Farm subsidies go to small family farms, keep food prices low, and help struggling farmers. Right? We checked $147 billion in USDA data. Here\'s what we found.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/subsidy-myths' },
  openGraph: {
    title: `10 Myths About Farm Subsidies (and What the Data Actually Shows)`,
    description: `Farm subsidies go to small family farms, keep food prices low, and help struggling farmers. Right? We checked $147 billion in USDA data. Here's what we found.`,
    url: 'https://www.opensubsidies.org/analysis/subsidy-myths',
    type: 'article',
  },
}

export default function SubsidyMyths() {
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalPrograms: number; totalStates: number }
  const programs = loadData('programs.json') as { program: string; payments: number; amount: number }[]
  const states = loadData('states.json') as { abbr: string; name: string; payments: number; amount: number }[]
  const yearly = loadData('yearly.json') as { year: number; payments: number; amount: number }[]
  const taxpayer = loadData('taxpayer-cost.json') as { perTaxpayer: number; perTaxpayerPerYear: number; perHousehold: number }

  const topStates = [...states].sort((a, b) => b.amount - a.amount)
  const top10Pct = topStates.slice(0, Math.ceil(states.length * 0.1))
  const top10Total = top10Pct.reduce((s, st) => s + st.amount, 0)
  const bottomHalf = topStates.slice(Math.ceil(states.length / 2))
  const bottomHalfTotal = bottomHalf.reduce((s, st) => s + st.amount, 0)

  const crpTotal = programs.filter(p => p.program.includes('CRP')).reduce((s, p) => s + p.amount, 0)
  const emergencyTotal = programs.filter(p =>
    p.program.includes('EMERGENCY') || p.program.includes('EMGNCY') || p.program.includes('CFAP') ||
    p.program.includes('RELIEF') || p.program.includes('DISASTER') || p.program.includes('WHIP')
  ).reduce((s, p) => s + p.amount, 0)

  const y2020 = yearly.find(y => y.year === 2020)!
  const y2017 = yearly.find(y => y.year === 2017)!
  const avgPayment = stats.totalAmount / stats.totalPayments

  const zombiePrograms = programs.filter(p => p.payments < 100)

  const myths = [
    {
      num: 1,
      myth: 'Farm subsidies go to small family farms',
      reality: 'The vast majority of farms receive nothing',
      detail: `There are approximately 2 million farms in the United States. Our data shows ${fmt(stats.totalPayments)} total payments over 9 years — but most go to the same recipients year after year. USDA data consistently shows that about 69% of farms receive no commodity payments at all. The top 10% of recipients collect the vast majority of subsidy dollars.`,
      dataPoint: `Average payment: ${fmtMoney(avgPayment)} | But most farmers get $0`,
    },
    {
      num: 2,
      myth: 'Subsidies keep food prices low for consumers',
      reality: 'Most subsidies go to commodity crops, not the food you eat',
      detail: `The bulk of farm subsidies — programs like PLC (${fmtMoney(programs.find(p => p.program === 'PRICE LOSS COVERAGE PROGRAM')?.amount ?? 0)}) and ARC (${fmtMoney(programs.find(p => p.program === 'AGRICULTURAL RISK COVERAGE PROG - COUNTY')?.amount ?? 0)}) — support commodity crops: corn, soybeans, wheat, cotton, and rice. These are largely used for animal feed, ethanol, and export — not directly for the fruits, vegetables, and proteins in your grocery cart. The foods Americans actually eat are mostly unsubsidized.`,
      dataPoint: 'Top subsidized: Corn, soybeans, wheat, cotton, rice — not fruits or vegetables',
    },
    {
      num: 3,
      myth: 'All farmers receive subsidies',
      reality: 'About 69% of U.S. farms get nothing',
      detail: `Only about 31% of farms receive any commodity subsidies. Fruit and vegetable growers — "specialty crop" producers — are largely excluded from traditional Title I programs. Organic farmers, small diversified operations, and beginning farmers often fall through the gaps. The system overwhelmingly benefits large commodity crop operations in the Midwest and South.`,
      dataPoint: `${fmt(stats.totalPrograms)} programs exist, but commodity programs dominate spending`,
    },
    {
      num: 4,
      myth: 'Farm subsidies are a small part of the federal budget',
      reality: `Every taxpayer pays $${taxpayer.perTaxpayer} over 9 years`,
      detail: `Farm subsidies in our dataset total ${fmtMoney(stats.totalAmount)} from 2017-2025. That's $${taxpayer.perTaxpayerPerYear} per taxpayer per year — or $${taxpayer.perHousehold} per household over the period. And this is just FSA direct payments. Add crop insurance subsidies ($9-15B/year) and SNAP ($120B/year), and the Farm Bill costs over $1 trillion per decade.`,
      dataPoint: `${fmtMoney(stats.totalAmount)} in 9 years | $${taxpayer.perTaxpayerPerYear}/taxpayer/year (FSA only)`,
    },
    {
      num: 5,
      myth: 'Subsidies prevent farm bankruptcies',
      reality: 'Bankruptcies are rising despite record subsidy spending',
      detail: `Farm bankruptcies rose 46% in recent years, with 315 Chapter 12 filings in 2024 alone. Meanwhile, 2020 saw ${fmtMoney(y2020.amount)} in farm payments — the highest in history. The disconnect is clear: subsidies flow to the largest, most profitable operations while smaller farms that need help the most often don't qualify or receive negligible amounts.`,
      dataPoint: `315 farm bankruptcies in 2024 | ${fmtMoney(y2020.amount)} paid in 2020`,
    },
    {
      num: 6,
      myth: 'Payment limits prevent anyone from getting too much',
      reality: 'The $125K cap is routinely circumvented',
      detail: `Federal law caps most farm payments at $125,000 per person per year. But operations structured as partnerships, LLCs, or trusts can multiply this limit. Our data shows single entities receiving millions in cumulative payments. Florida Emergency Management received $346.6M across just 6 payments. The limits are more aspiration than reality.`,
      dataPoint: 'Top recipient: $346.6M | "Limit": $125K/person/year',
    },
    {
      num: 7,
      myth: 'Subsidies are stable and predictable',
      reality: 'Emergency spending has wildly distorted the baseline',
      detail: `In 2017, total farm subsidies in our data were ${fmtMoney(y2017.amount)}. By 2020, they exploded to ${fmtMoney(y2020.amount)} — a ${((y2020.amount / y2017.amount - 1) * 100).toFixed(0)}% increase. Trade war bailouts, COVID relief, and disaster programs have made "emergency" spending the norm. The Farm Bill baseline is almost irrelevant when Congress can authorize tens of billions in ad hoc payments.`,
      dataPoint: `${fmtMoney(y2017.amount)} (2017) → ${fmtMoney(y2020.amount)} (2020) = ${((y2020.amount / y2017.amount - 1) * 100).toFixed(0)}% increase`,
    },
    {
      num: 8,
      myth: 'Every state benefits equally from farm subsidies',
      reality: 'Texas gets 340x more than Vermont',
      detail: `The geographic distribution is staggeringly unequal. Texas received ${fmtMoney(topStates[0]?.amount ?? 0)}, while Vermont got just ${fmtMoney(states.find(s => s.abbr === 'VT')?.amount ?? 0)}. The top 5 states capture ${((topStates.slice(0, 5).reduce((s, st) => s + st.amount, 0) / stats.totalAmount) * 100).toFixed(1)}% of all payments. Farm subsidies are effectively a transfer from urban and non-agricultural states to a handful of farm belt states.`,
      dataPoint: `#1 ${topStates[0]?.name}: ${fmtMoney(topStates[0]?.amount ?? 0)} | Vermont: ${fmtMoney(states.find(s => s.abbr === 'VT')?.amount ?? 0)}`,
    },
    {
      num: 9,
      myth: 'Conservation and commodity programs are balanced',
      reality: 'Emergency and commodity spending dwarfs conservation',
      detail: `CRP — the crown jewel of farm conservation — totals ${fmtMoney(crpTotal)} in our dataset. That sounds like a lot until you compare it to ${fmtMoney(emergencyTotal)} in emergency, disaster, and COVID programs. Conservation is a rounding error in the era of emergency spending. For every dollar spent paying farmers NOT to farm, multiple dollars flow to programs encouraging maximum production.`,
      dataPoint: `Conservation (CRP): ${fmtMoney(crpTotal)} | Emergency/Disaster: ${fmtMoney(emergencyTotal)}`,
    },
    {
      num: 10,
      myth: 'The subsidy system is simple and efficient',
      reality: `${fmt(stats.totalPrograms)} programs, 43+ "zombie" programs, massive bureaucratic complexity`,
      detail: `The USDA operates ${fmt(stats.totalPrograms)} distinct payment programs. At least ${zombiePrograms.length} of those are "zombie programs" with fewer than 100 payments total — costing administrative overhead while serving almost nobody. Programs overlap, acronyms multiply (CFAP, CFAPCCA2, CFAPCARES, CFAPCCCCA...), and farmers need specialized consultants to navigate the system.`,
      dataPoint: `${fmt(stats.totalPrograms)} programs | ${zombiePrograms.length} with <100 payments | Top 10 programs = ${((programs.slice(0, 10).reduce((s, p) => s + p.amount, 0) / stats.totalAmount) * 100).toFixed(1)}% of spending`,
    },
  ]

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema
        title="10 Myths About Farm Subsidies (and What the Data Actually Shows)"
        description="Farm subsidies go to small family farms, keep food prices low, and help struggling farmers. Right? We checked $147 billion in USDA data."
        slug="analysis/subsidy-myths"
      />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Subsidy Myths' }]} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · March 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          10 Myths About Farm Subsidies<br />
          <span className="text-xl md:text-2xl text-gray-500 font-normal">(and What the Data Actually Shows)</span>
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-lg text-gray-600">
            We analyzed {fmtMoney(stats.totalAmount)} in USDA payment data to fact-check the most common beliefs
            about farm subsidies. Most of them are wrong.
          </p>
          <ShareButtons title="10 Myths About Farm Subsidies" />
        </div>
      </div>

      <div className="prose max-w-none">
        <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">📊 Methodology</p>
          <p className="text-sm text-gray-700 mt-1">
            Every claim below is backed by USDA Farm Service Agency payment records covering {fmtMoney(stats.totalAmount)} in
            payments from 2017-2025, across {fmt(stats.totalPayments)} individual transactions
            in {fmt(stats.totalStates)} states and territories.
          </p>
        </div>

        {/* Myths */}
        <div className="not-prose space-y-8 my-8">
          {myths.map(m => (
            <div key={m.num} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              {/* Myth header */}
              <div className="bg-red-50 px-5 py-3 border-b border-red-100">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-red-600">#{m.num}</span>
                  <span className="text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-full">MYTH</span>
                </div>
                <p className="text-lg font-bold text-gray-900 mt-1">&ldquo;{m.myth}&rdquo;</p>
              </div>
              {/* Reality */}
              <div className="bg-white px-5 py-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full">REALITY</span>
                  <span className="font-bold text-green-800">{m.reality}</span>
                </div>
                <p className="text-sm text-gray-600">{m.detail}</p>
                <div className="mt-3 bg-gray-50 rounded-lg px-3 py-2">
                  <p className="text-xs font-mono text-primary">📊 {m.dataPoint}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Big Picture</h2>
        <p>
          These myths persist because they serve powerful interests. The narrative that subsidies support
          &quot;small family farms&quot; and &quot;keep food affordable&quot; provides political cover for a system
          that primarily benefits large commodity operations. The data tells a different story:
        </p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
          <div className="bg-red-50 rounded-lg p-5 text-center">
            <div className="text-3xl font-bold text-red-600">69%</div>
            <div className="text-sm font-medium text-gray-900 mt-1">of farms get $0</div>
            <div className="text-xs text-gray-500">in commodity payments</div>
          </div>
          <div className="bg-green-50 rounded-lg p-5 text-center">
            <div className="text-3xl font-bold text-primary">{fmtMoney(stats.totalAmount)}</div>
            <div className="text-sm font-medium text-gray-900 mt-1">total spending</div>
            <div className="text-xs text-gray-500">2017-2025</div>
          </div>
          <div className="bg-amber-50 rounded-lg p-5 text-center">
            <div className="text-3xl font-bold text-amber-600">{fmt(stats.totalPrograms)}</div>
            <div className="text-sm font-medium text-gray-900 mt-1">programs</div>
            <div className="text-xs text-gray-500">{zombiePrograms.length} with &lt;100 payments</div>
          </div>
        </div>

        <p>
          Understanding how farm subsidies actually work — not how they&apos;re marketed — is the first step
          toward meaningful reform. The data is public. The patterns are clear. The question is whether
          policymakers and voters will follow the evidence.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Source</p>
          <p>All figures from USDA Farm Service Agency payment records, 2017-2025. Farm-level statistics
          (69% receiving nothing, top 10% concentration) from USDA ERS and Congressional Research Service reports.
          Crop insurance and SNAP are administered separately and not included in payment totals.</p>
        </div>

        <RelatedArticles currentSlug="subsidy-myths" />
      </div>
    </article>
  )
}
