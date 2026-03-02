import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'The 2025 Farm Bill Debate: What\'s at Stake for $147 Billion in Subsidies',
  description: 'The Farm Bill shapes every dollar of farm subsidies, conservation, SNAP, and crop insurance. What the data shows about current programs and what reform proposals would change.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/farm-bill-2025' },
  openGraph: {
    title: `The 2025 Farm Bill Debate: What's at Stake for $147 Billion in Subsidies`,
    description: `The Farm Bill shapes every dollar of farm subsidies, conservation, SNAP, and crop insurance. What the data shows about current programs and what reform proposals would change.`,
    url: 'https://www.opensubsidies.org/analysis/farm-bill-2025',
    type: 'article',
  },
}

export default function FarmBill2025() {
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalPrograms: number }
  const yearly = loadData('yearly.json') as { year: number; payments: number; amount: number }[]
  const programs = loadData('programs.json') as { program: string; payments: number; amount: number }[]
  const states = loadData('states.json') as { abbr: string; name: string; payments: number; amount: number }[]

  const topPrograms = programs.slice(0, 15)
  const crpTotal = programs.filter(p => p.program.includes('CRP')).reduce((s, p) => s + p.amount, 0)
  const conservationTotal = programs.filter(p =>
    p.program.includes('CRP') || p.program.includes('CONSERVATION') || p.program.includes('GRASSLAND')
  ).reduce((s, p) => s + p.amount, 0)
  const commodityTotal = programs.filter(p =>
    p.program.includes('PRICE LOSS') || p.program.includes('AGRICULTURAL RISK') || p.program.includes('ARC')
  ).reduce((s, p) => s + p.amount, 0)
  const emergencyTotal = programs.filter(p =>
    p.program.includes('EMERGENCY') || p.program.includes('EMGNCY') || p.program.includes('DISASTER') ||
    p.program.includes('CFAP') || p.program.includes('RELIEF') || p.program.includes('WHIP')
  ).reduce((s, p) => s + p.amount, 0)

  const avg2017_2019 = yearly.filter(y => y.year >= 2017 && y.year <= 2019).reduce((s, y) => s + y.amount, 0) / 3
  const avg2020_2024 = yearly.filter(y => y.year >= 2020 && y.year <= 2024).reduce((s, y) => s + y.amount, 0) / 5
  const topStates = [...states].sort((a, b) => b.amount - a.amount).slice(0, 10)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema
        title="The 2025 Farm Bill Debate: What's at Stake for $147 Billion in Subsidies"
        description="The Farm Bill shapes every dollar of farm subsidies, conservation, SNAP, and crop insurance. What the data shows about current programs and what reform proposals would change."
        slug="analysis/farm-bill-2025"
      />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: '2025 Farm Bill' }]} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · March 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          The 2025 Farm Bill Debate: What&apos;s at Stake for {fmtMoney(stats.totalAmount)} in Subsidies
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-lg text-gray-600">
            The most consequential piece of agricultural legislation in a generation is being rewritten. Here&apos;s what the data says about what works, what doesn&apos;t, and what&apos;s on the chopping block.
          </p>
          <ShareButtons title="The 2025 Farm Bill Debate: What's at Stake" />
        </div>
      </div>

      <div className="prose max-w-none">
        {/* Key stats */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Total Spending', value: fmtMoney(stats.totalAmount), sub: '2017-2025' },
            { label: 'Programs', value: fmt(stats.totalPrograms), sub: 'Active USDA programs' },
            { label: 'Conservation', value: fmtMoney(conservationTotal), sub: 'CRP & related' },
            { label: 'Emergency', value: fmtMoney(emergencyTotal), sub: 'Disaster & COVID' },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm font-medium text-gray-900">{s.label}</div>
              <div className="text-xs text-gray-500">{s.sub}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">What Is the Farm Bill?</h2>
        <p>
          The Farm Bill is the single most important piece of legislation governing American agriculture, nutrition, and
          conservation. Reauthorized roughly every five years, it sets the rules for everything from commodity price
          supports to SNAP (food stamps), crop insurance, conservation programs, and rural development.
        </p>
        <p>
          The 2018 Farm Bill expired in September 2023, and Congress has been operating on extensions ever since. The
          debate over the next version — commonly called the 2025 Farm Bill — carries enormous stakes: it will determine
          how approximately {fmtMoney(avg2020_2024)} per year in farm payments flows, and to whom.
        </p>

        <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">📋 Farm Bill Timeline</p>
          <div className="mt-2 space-y-1 text-sm text-gray-700">
            <p><strong>1933</strong> — First Farm Bill (Agricultural Adjustment Act), New Deal era price supports</p>
            <p><strong>1973</strong> — Shift from price supports to deficiency payments; target prices introduced</p>
            <p><strong>1985</strong> — Conservation Reserve Program (CRP) created — now {fmtMoney(crpTotal)} in our data</p>
            <p><strong>1996</strong> — &quot;Freedom to Farm&quot; Act — attempted to phase out subsidies (they came back)</p>
            <p><strong>2002</strong> — Reversed 1996 reforms, restored counter-cyclical payments</p>
            <p><strong>2014</strong> — Created Price Loss Coverage (PLC) and Agricultural Risk Coverage (ARC)</p>
            <p><strong>2018</strong> — Current law (expired 2023). Expanded crop insurance, maintained CRP, reformed SNAP work requirements</p>
            <p><strong>2025</strong> — Pending. Extensions keep 2018 rules alive while Congress negotiates</p>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Title I: Commodity Programs — The Core Subsidy Engine</h2>
        <p>
          Title I is the heart of farm subsidies. It authorizes the Price Loss Coverage (PLC) program
          at {fmtMoney(programs.find(p => p.program === 'PRICE LOSS COVERAGE PROGRAM')?.amount ?? 0)} and the
          Agricultural Risk Coverage (ARC) program
          at {fmtMoney(programs.find(p => p.program === 'AGRICULTURAL RISK COVERAGE PROG - COUNTY')?.amount ?? 0)} in
          our dataset. Together, these two programs guarantee farmers a minimum revenue floor.
        </p>
        <p>
          The key debate: <strong>should reference prices be updated?</strong> Farm-state legislators want higher reference
          prices — which trigger larger payments. Budget hawks note that PLC and ARC already delivered {fmtMoney(commodityTotal)} in
          payments from 2017-2025 and raising reference prices could add tens of billions in new costs.
        </p>

        <div className="not-prose my-8">
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-4">Top 10 Programs by Total Spending (2017-2025)</h3>
          <div className="space-y-2">
            {topPrograms.slice(0, 10).map((p, i) => {
              const pct = (p.amount / stats.totalAmount) * 100
              return (
                <div key={p.program} className="flex items-center gap-3">
                  <span className="text-sm font-mono text-gray-500 w-6">{i + 1}.</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-900 truncate max-w-xs">{p.program.split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}</span>
                      <span className="text-primary font-bold">{fmtMoney(p.amount)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${Math.min(pct * 4, 100)}%` }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Title II: Conservation — CRP and the Green Debate</h2>
        <p>
          Conservation programs are the environmental counterweight to commodity subsidies. The Conservation Reserve
          Program (CRP) — at {fmtMoney(crpTotal)} — pays farmers annual rent to take environmentally sensitive
          land out of production. It&apos;s the single largest traditional program in our entire dataset.
        </p>
        <p>
          The 2025 Farm Bill debate pits two visions against each other:
        </p>
        <ul>
          <li><strong>Expand CRP</strong> — Environmental groups want to raise the enrollment cap from 27 million acres
          to 30+ million, targeting climate benefits and water quality.</li>
          <li><strong>Shrink CRP</strong> — Commodity groups argue CRP takes productive land out of farming,
          raising food prices and reducing their production base. They want lower caps and shorter contracts.</li>
        </ul>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 The Conservation Paradox</p>
          <p className="text-sm text-gray-700 mt-1">
            Our data shows conservation spending at {fmtMoney(conservationTotal)} total — impressive, but dwarfed
            by {fmtMoney(emergencyTotal)} in emergency and disaster spending. Congress debates conservation caps while
            emergency spending faces virtually no limits.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Title IV: SNAP — The Largest Line Item Nobody Debates (in the Farm Bill)</h2>
        <p>
          SNAP (Supplemental Nutrition Assistance Program) typically accounts for roughly 80% of total Farm Bill
          spending — around $120 billion per year. It dwarfs all farm subsidy programs combined. Yet in our dataset
          of USDA Farm Service Agency payments, SNAP doesn&apos;t appear at all — it&apos;s administered by a different
          branch of the USDA.
        </p>
        <p>
          The Farm Bill bundles SNAP with farm subsidies for a strategic reason: it builds a coalition between
          urban (nutrition) and rural (agriculture) legislators. Reform proposals that would separate SNAP from the
          Farm Bill threaten this coalition — and potentially both programs.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Title XI: Crop Insurance — The Quiet Giant</h2>
        <p>
          Federal crop insurance is the single most expensive farm safety net program — costing taxpayers roughly
          $9-15 billion per year in premium subsidies and administrative costs. Like SNAP, crop insurance payments
          are administered separately from FSA programs and don&apos;t appear in our direct payment data.
        </p>
        <p>
          Key reform proposals include:
        </p>
        <ul>
          <li><strong>Means-testing premium subsidies</strong> — Currently, operations of any size receive the same
          premium subsidy percentage. Reformers want to cap subsidies for the largest operations.</li>
          <li><strong>Transparency</strong> — Unlike FSA payments, crop insurance recipient data is largely secret.
          Reform proposals would require disclosure of the biggest recipients.</li>
          <li><strong>Conservation compliance</strong> — Linking crop insurance subsidies to conservation practices,
          similar to existing requirements for FSA programs.</li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)]">What the Data Shows: The Emergency Spending Problem</h2>
        <p>
          Perhaps the most important Farm Bill debate isn&apos;t about any specific title — it&apos;s about the explosion
          of <em>ad hoc</em> emergency spending that bypasses the Farm Bill entirely.
        </p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          <div className="bg-gray-50 rounded-lg p-5">
            <h4 className="font-bold text-gray-900 mb-2">Pre-Emergency Era (2017-2019)</h4>
            <div className="text-3xl font-bold text-primary">{fmtMoney(avg2017_2019)}</div>
            <div className="text-sm text-gray-500">Average annual spending</div>
            <p className="text-sm text-gray-600 mt-2">
              Farm Bill programs operating as designed. CRP, PLC, ARC delivering predictable payments.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-5">
            <h4 className="font-bold text-gray-900 mb-2">Emergency Era (2020-2024)</h4>
            <div className="text-3xl font-bold text-red-600">{fmtMoney(avg2020_2024)}</div>
            <div className="text-sm text-gray-500">Average annual spending</div>
            <p className="text-sm text-gray-600 mt-2">
              Trade war bailouts, COVID relief, and disaster programs more than doubled the baseline.
            </p>
          </div>
        </div>

        <p>
          Annual spending jumped from {fmtMoney(avg2017_2019)} to {fmtMoney(avg2020_2024)} — a {((avg2020_2024 / avg2017_2019 - 1) * 100).toFixed(0)}%
          increase. Much of this spending was authorized outside the Farm Bill through emergency supplemental
          appropriations. The Farm Bill sets the baseline, but emergency spending has become the real driver.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Geographic Winners and Losers</h2>
        <p>
          The Farm Bill&apos;s structure inherently favors certain states over others. Commodity programs flow to
          corn, soybean, wheat, and cotton states. Conservation programs flow to states with CRP-eligible land.
          The top 10 states capture a disproportionate share:
        </p>

        <div className="not-prose my-8">
          <div className="space-y-2">
            {topStates.map((s, i) => {
              const pct = (s.amount / stats.totalAmount) * 100
              return (
                <div key={s.abbr} className="flex items-center gap-3">
                  <span className="text-sm font-mono text-gray-500 w-6">{i + 1}.</span>
                  <span className="w-20 text-sm font-medium text-gray-900">{s.name}</span>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${pct * 3}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-primary w-20 text-right">{fmtMoney(s.amount)}</span>
                  <span className="text-xs text-gray-500 w-12 text-right">{pct.toFixed(1)}%</span>
                </div>
              )
            })}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Top 10 states account for {((topStates.reduce((s, st) => s + st.amount, 0) / stats.totalAmount) * 100).toFixed(1)}% of all farm subsidy spending.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Five Key Reform Proposals</h2>

        <div className="not-prose space-y-4 my-8">
          {[
            {
              num: '1',
              title: 'Update Reference Prices',
              desc: 'Farm-state legislators want PLC reference prices raised to reflect higher input costs. This could add $20-50B over 10 years.',
              data: `Current PLC spending: ${fmtMoney(programs.find(p => p.program === 'PRICE LOSS COVERAGE PROGRAM')?.amount ?? 0)}`,
            },
            {
              num: '2',
              title: 'Expand CRP Enrollment',
              desc: 'Environmental groups want to raise the 27M acre cap. Each additional million acres costs roughly $300M/year in rental payments.',
              data: `Current CRP spending: ${fmtMoney(crpTotal)}`,
            },
            {
              num: '3',
              title: 'Payment Limit Reform',
              desc: 'Current $125K/person caps are easily circumvented through entity structures. Proposals would tighten loopholes and add means testing.',
              data: `${fmt(stats.totalPrograms)} programs, many with separate limits`,
            },
            {
              num: '4',
              title: 'Permanent Disaster Authority',
              desc: 'Instead of ad hoc emergency bills, create standing authority for disaster payments — with caps and triggers.',
              data: `Emergency spending: ${fmtMoney(emergencyTotal)}`,
            },
            {
              num: '5',
              title: 'Separate SNAP',
              desc: 'Some legislators want to decouple SNAP from the Farm Bill. This would break the urban-rural coalition but could allow more targeted debate on each.',
              data: 'SNAP = ~80% of Farm Bill cost',
            },
          ].map(r => (
            <div key={r.num} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-2xl font-bold text-primary">{r.num}</span>
                <div>
                  <h4 className="font-bold text-gray-900">{r.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{r.desc}</p>
                  <p className="text-xs text-primary font-medium mt-2">📊 {r.data}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Program Proliferation Problem</h2>
        <p>
          Our data reveals {fmt(stats.totalPrograms)} distinct USDA payment programs. Many were created as
          one-off responses to specific crises — trade wars, hurricanes, pandemics — and never sunset. The Farm Bill
          is an opportunity to consolidate overlapping programs, sunset unused ones, and create a more rational system.
        </p>
        <p>
          Consider: the top 10 programs account for {fmtMoney(topPrograms.slice(0, 10).reduce((s, p) => s + p.amount, 0))} — that&apos;s {((topPrograms.slice(0, 10).reduce((s, p) => s + p.amount, 0) / stats.totalAmount) * 100).toFixed(1)}%
          of all spending. The remaining {stats.totalPrograms - 10} programs split the rest, with dozens receiving
          fewer than 100 payments total.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What&apos;s Really at Stake</h2>
        <p>
          The 2025 Farm Bill will determine the trajectory of American agricultural policy for the next five years
          and beyond. The core tension hasn&apos;t changed since the 1930s: how much should the federal government
          support farmers, and which farmers should benefit?
        </p>
        <p>
          Our data paints a clear picture of the status quo: {fmtMoney(stats.totalAmount)} in payments over
          9 years, heavily concentrated in the largest operations and a handful of states, with emergency spending
          overwhelming the carefully designed Farm Bill baseline. Whatever Congress decides, the data will be
          here to measure the results.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Source</p>
          <p>Analysis based on USDA Farm Service Agency payment records, 2017-2025. Farm Bill provisions also
          govern crop insurance and SNAP, which are administered separately and not included in these figures.
          Total Farm Bill cost including SNAP and crop insurance exceeds $1 trillion over 10 years.</p>
        </div>

        <RelatedArticles currentSlug="farm-bill-2025" />
      </div>
    </article>
  )
}
