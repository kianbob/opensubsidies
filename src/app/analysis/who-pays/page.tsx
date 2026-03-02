import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Who Pays for Farm Subsidies? The Taxpayer Burden by State',
  description: 'Every American taxpayer pays $109/year for farm subsidies. But some states pay far more than they receive. The net donors, net recipients, and what your money could buy instead.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/who-pays' },
  openGraph: {
    title: `Who Pays for Farm Subsidies? The Taxpayer Burden by State`,
    description: `Every American taxpayer pays $109/year for farm subsidies. But some states pay far more than they receive. The net donors, net recipients, and what your money could buy instead.`,
    url: 'https://www.opensubsidies.org/analysis/who-pays',
    type: 'article',
  },
}

// State population estimates for per-capita calculations
const statePopulations: Record<string, number> = {
  CA: 39030000, TX: 30500000, FL: 22610000, NY: 19680000, PA: 12970000, IL: 12580000,
  OH: 11760000, GA: 10910000, NC: 10700000, MI: 10040000, NJ: 9260000, VA: 8640000,
  WA: 7890000, AZ: 7360000, MA: 7030000, TN: 7050000, IN: 6840000, MO: 6180000,
  MD: 6180000, WI: 5900000, CO: 5840000, MN: 5710000, SC: 5280000, AL: 5100000,
  LA: 4620000, KY: 4530000, OR: 4240000, OK: 4020000, CT: 3630000, UT: 3420000,
  IA: 3200000, NV: 3190000, AR: 3050000, KS: 2940000, MS: 2950000, NE: 1970000,
  NM: 2120000, ID: 1960000, WV: 1780000, HI: 1440000, NH: 1400000, ME: 1390000,
  MT: 1120000, RI: 1100000, DE: 1020000, SD: 910000, ND: 780000, AK: 740000,
  VT: 650000, WY: 580000, DC: 690000,
}

// Approximate federal tax revenue contribution by state (billions, annual)
const stateTaxContributions: Record<string, number> = {
  CA: 472, TX: 280, NY: 310, FL: 210, IL: 135, PA: 125, OH: 100, NJ: 115,
  GA: 90, WA: 95, MA: 100, VA: 85, NC: 80, MI: 75, MD: 72, MN: 65,
  CO: 62, IN: 52, TN: 55, WI: 50, MO: 48, CT: 52, AZ: 50, OR: 42,
  AL: 33, SC: 35, KY: 30, LA: 35, OK: 30, IA: 28, UT: 28, NV: 25,
  KS: 25, AR: 20, NE: 18, MS: 16, NM: 13, ID: 14, WV: 10, NH: 14,
  ME: 11, HI: 13, MT: 9, RI: 10, DE: 12, SD: 9, ND: 8, AK: 8,
  VT: 6, WY: 6, DC: 30,
}

export default function WhoPays() {
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalPrograms: number }
  const states = loadData('states.json') as { abbr: string; name: string; payments: number; amount: number }[]
  const taxpayer = loadData('taxpayer-cost.json') as {
    total: number; years: number; taxpayers: number; households: number
    perTaxpayer: number; perTaxpayerPerYear: number; perHousehold: number; perHouseholdPerYear: number
    comparisons: { label: string; count: number; unit: string }[]
    federalComparisons: { label: string; amount: number }[]
  }

  // Calculate net donor/recipient status
  const stateData = states
    .filter(s => statePopulations[s.abbr] && stateTaxContributions[s.abbr])
    .map(s => {
      const pop = statePopulations[s.abbr]
      const annualTax = stateTaxContributions[s.abbr] * 1e9
      const totalBudget = 4.7e12 // approximate annual federal budget
      const totalTaxRevenue = 4.4e12
      const farmSubsidyAnnual = stats.totalAmount / 9
      const stateShareOfTax = annualTax / totalTaxRevenue
      const statePaysTowardSubsidies = stateShareOfTax * farmSubsidyAnnual * 9
      const netBalance = s.amount - statePaysTowardSubsidies
      const perCapitaReceived = s.amount / pop
      const perCapitaPaid = statePaysTowardSubsidies / pop

      return {
        ...s,
        pop,
        perCapitaReceived,
        perCapitaPaid,
        paid: statePaysTowardSubsidies,
        netBalance,
        isRecipient: netBalance > 0,
      }
    })
    .sort((a, b) => b.netBalance - a.netBalance)

  const topRecipients = stateData.filter(s => s.isRecipient).slice(0, 10)
  const topDonors = stateData.filter(s => !s.isRecipient).sort((a, b) => a.netBalance - b.netBalance).slice(0, 10)

  const perCapitaRanking = [...stateData].sort((a, b) => b.perCapitaReceived - a.perCapitaReceived)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema
        title="Who Pays for Farm Subsidies? The Taxpayer Burden by State"
        description="Every American taxpayer pays $109/year for farm subsidies. Some states pay far more than they receive."
        slug="analysis/who-pays"
      />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Who Pays' }]} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · March 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Who Pays for Farm Subsidies?
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-lg text-gray-600">
            Every American household pays ${taxpayer.perHouseholdPerYear}/year for farm subsidies.
            But some states pay in far more than they get back.
          </p>
          <ShareButtons title="Who Pays for Farm Subsidies?" />
        </div>
      </div>

      <div className="prose max-w-none">
        {/* Key stats */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Total Cost', value: fmtMoney(taxpayer.total), sub: `${taxpayer.years} years (2017-2025)` },
            { label: 'Per Taxpayer', value: `$${fmt(taxpayer.perTaxpayer)}`, sub: 'Over 9 years' },
            { label: 'Per Year', value: `$${fmt(taxpayer.perTaxpayerPerYear)}`, sub: 'Per taxpayer' },
            { label: 'Per Household', value: `$${fmt(taxpayer.perHousehold)}`, sub: 'Over 9 years' },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm font-medium text-gray-900">{s.label}</div>
              <div className="text-xs text-gray-500">{s.sub}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Your Tax Dollars at Work</h2>
        <p>
          The federal government spent {fmtMoney(taxpayer.total)} on farm subsidies from 2017-2025, funded by
          the approximately {fmt(taxpayer.taxpayers)} federal income tax payers. That works out
          to ${fmt(taxpayer.perTaxpayerPerYear)} per taxpayer per year — or about $9 per month.
        </p>
        <p>
          That might sound modest. But farm subsidies are just one small slice of the federal budget. What makes
          them unusual is <em>who receives the money</em>: a small number of agricultural operations, concentrated
          in a handful of states, receiving payments that most Americans never see or benefit from directly.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What {fmtMoney(taxpayer.total)} Could Buy Instead</h2>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          {taxpayer.comparisons.map(c => (
            <div key={c.label} className="bg-green-50 rounded-lg p-4 flex items-center gap-4">
              <div className="text-3xl font-bold text-primary">{fmt(c.count)}</div>
              <div>
                <div className="font-medium text-gray-900">{c.label}</div>
                <div className="text-sm text-gray-500">{c.unit}</div>
              </div>
            </div>
          ))}
        </div>

        <p>
          {fmtMoney(taxpayer.total)} could fund {fmt(taxpayer.comparisons[0]?.count ?? 0)} {taxpayer.comparisons[0]?.unit ?? 'teachers'},
          or {fmt(taxpayer.comparisons[1]?.count ?? 0)} {taxpayer.comparisons[1]?.unit ?? 'Pell Grants'}.
          It could pay for {taxpayer.comparisons[4]?.count ?? 6} {taxpayer.comparisons[4]?.unit ?? 'years of NASA'}. These
          aren&apos;t hypotheticals — they&apos;re real opportunity costs of choosing to direct this money to
          agricultural operations.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Farm Subsidies vs. Other Federal Spending</h2>

        <div className="not-prose my-8">
          <div className="space-y-3">
            {taxpayer.federalComparisons.map(c => {
              const maxAmount = Math.max(...taxpayer.federalComparisons.map(fc => fc.amount))
              const pct = (c.amount / maxAmount) * 100
              const isFarm = c.label.includes('Farm')
              return (
                <div key={c.label} className="flex items-center gap-3">
                  <span className={`w-40 text-sm font-medium ${isFarm ? 'text-primary font-bold' : 'text-gray-900'}`}>
                    {c.label}
                  </span>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${isFarm ? 'bg-green-600' : 'bg-gray-400'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <span className={`text-sm w-24 text-right ${isFarm ? 'text-primary font-bold' : 'text-gray-600'}`}>
                    {fmtMoney(c.amount)}/yr
                  </span>
                </div>
              )
            })}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Farm subsidies (annual): {fmtMoney(taxpayer.federalComparisons.find(c => c.label.includes('Farm'))?.amount ?? 0)}/year.
            Shown alongside other major federal spending categories for scale.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Net Donors vs. Net Recipients</h2>
        <p>
          Not all states are created equal in the farm subsidy equation. States with large populations and
          high tax bases — California, New York, New Jersey — pay far more in federal taxes (which fund subsidies)
          than they receive back in farm payments. Meanwhile, agricultural states with smaller populations —
          Iowa, Kansas, the Dakotas — receive far more than their taxpayers contribute.
        </p>

        <div className="not-prose my-8">
          <h3 className="text-lg font-bold mb-3 text-green-800">🟢 Top 10 Net Recipients (Get More Than They Pay)</h3>
          <div className="space-y-2 mb-6">
            {topRecipients.map((s, i) => (
              <div key={s.abbr} className="flex items-center gap-3 bg-green-50 rounded-lg px-4 py-2">
                <span className="text-sm font-mono text-gray-500 w-6">{i + 1}.</span>
                <span className="w-28 text-sm font-medium text-gray-900">{s.name}</span>
                <div className="flex-1 text-sm text-gray-600">
                  Receives {fmtMoney(s.amount)} · Pays ~{fmtMoney(s.paid)}
                </div>
                <span className="text-sm font-bold text-green-700">+{fmtMoney(s.netBalance)}</span>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold mb-3 text-red-700">🔴 Top 10 Net Donors (Pay More Than They Get)</h3>
          <div className="space-y-2">
            {topDonors.map((s, i) => (
              <div key={s.abbr} className="flex items-center gap-3 bg-red-50 rounded-lg px-4 py-2">
                <span className="text-sm font-mono text-gray-500 w-6">{i + 1}.</span>
                <span className="w-28 text-sm font-medium text-gray-900">{s.name}</span>
                <div className="flex-1 text-sm text-gray-600">
                  Receives {fmtMoney(s.amount)} · Pays ~{fmtMoney(s.paid)}
                </div>
                <span className="text-sm font-bold text-red-700">{fmtMoney(s.netBalance)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 The Transfer Pattern</p>
          <p className="text-sm text-gray-700 mt-1">
            Farm subsidies represent a transfer from urban, coastal, and non-agricultural states to rural
            farm belt states. New York, California, and New Jersey collectively subsidize Iowa, Kansas, and
            the Dakotas. This geographic redistribution is a feature, not a bug — but it means most Americans
            are paying for programs that benefit a small, geographically concentrated group.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Per Capita: Who Gets the Most Per Person?</h2>
        <p>
          The per-capita view reveals the starkest inequality. States with small populations and large agricultural
          sectors receive thousands of dollars per resident, while populous states get pennies.
        </p>

        <div className="not-prose my-8">
          <h3 className="text-lg font-bold mb-3">Top 15 States by Farm Subsidies Per Capita (2017-2025)</h3>
          <div className="space-y-2">
            {perCapitaRanking.slice(0, 15).map((s, i) => {
              const maxPC = perCapitaRanking[0].perCapitaReceived
              return (
                <div key={s.abbr} className="flex items-center gap-3">
                  <span className="text-sm font-mono text-gray-500 w-6">{i + 1}.</span>
                  <span className="w-24 text-sm font-medium text-gray-900">{s.name}</span>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(s.perCapitaReceived / maxPC) * 100}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-primary w-24 text-right">
                    ${fmt(Math.round(s.perCapitaReceived))}/person
                  </span>
                </div>
              )
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-bold text-gray-500 mb-2">Bottom 5 (Lowest Per Capita)</h4>
            {perCapitaRanking.slice(-5).reverse().map(s => (
              <div key={s.abbr} className="flex items-center gap-3 py-1">
                <span className="w-24 text-sm text-gray-600">{s.name}</span>
                <span className="text-sm text-gray-400">${fmt(Math.round(s.perCapitaReceived))}/person</span>
              </div>
            ))}
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">What Does $109/Year Buy You?</h2>
        <p>
          As an individual taxpayer, your ${taxpayer.perTaxpayerPerYear}/year contribution to farm subsidies buys:
        </p>
        <ul>
          <li><strong>No direct benefit</strong> — unless you&apos;re one of the ~600,000 operations receiving payments</li>
          <li><strong>No lower food prices</strong> — most subsidies go to commodity crops, not consumer food</li>
          <li><strong>No food security guarantee</strong> — the U.S. would produce food without subsidies (most countries do)</li>
          <li><strong>Conservation funding</strong> — CRP and related programs do provide environmental benefits</li>
          <li><strong>A safety net</strong> — for farmers facing genuine disasters (drought, floods, pandemics)</li>
        </ul>
        <p>
          The question isn&apos;t whether farm safety nets have value — it&apos;s whether {fmtMoney(stats.totalAmount)} over
          9 years, distributed the way it is, represents the best use of those tax dollars.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Monthly Cost Breakdown</h2>

        <div className="not-prose bg-gray-50 rounded-xl p-6 my-8">
          <h3 className="font-bold text-gray-900 mb-4">Your Monthly Farm Subsidy Bill: ~$9</h3>
          <div className="space-y-3">
            {[
              { label: 'Emergency & Disaster Programs', pct: 40, amount: 3.60, color: 'bg-red-500' },
              { label: 'Commodity Programs (PLC/ARC)', pct: 20, amount: 1.80, color: 'bg-amber-500' },
              { label: 'Conservation (CRP)', pct: 15, amount: 1.35, color: 'bg-green-500' },
              { label: 'Trade War Bailouts', pct: 12, amount: 1.08, color: 'bg-blue-500' },
              { label: 'COVID Relief (CFAP)', pct: 8, amount: 0.72, color: 'bg-purple-500' },
              { label: 'Other (157 programs)', pct: 5, amount: 0.45, color: 'bg-gray-400' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="flex-1 text-sm text-gray-700">{item.label}</span>
                <span className="text-sm text-gray-500">{item.pct}%</span>
                <span className="text-sm font-bold text-gray-900 w-16 text-right">${item.amount.toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-gray-300 pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>~$9.00/mo</span>
            </div>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Is It Worth It?</h2>
        <p>
          That&apos;s the fundamental question. ${taxpayer.perTaxpayerPerYear}/year per taxpayer supports a system
          where 69% of farms get nothing, the top 10% of recipients collect most payments, emergency spending
          has overwhelmed the planned safety net, and {fmt(stats.totalPrograms)} programs create a bureaucratic maze.
        </p>
        <p>
          Defenders argue the cost is modest and the alternative — farm failures, food supply disruption, rural
          economic collapse — would be far more expensive. Critics counter that the money doesn&apos;t reach the
          farmers who need it, subsidizes overproduction, and distorts markets.
        </p>
        <p>
          The data doesn&apos;t answer the political question. But it does show exactly where your {fmtMoney(taxpayer.perTaxpayer)} went.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Source & Methodology</p>
          <p>Farm subsidy data from USDA Farm Service Agency, 2017-2025. Taxpayer cost calculations use
          {fmt(taxpayer.taxpayers)} federal income tax filers and {fmt(taxpayer.households)} households. State tax
          contributions are estimates based on IRS data. Net donor/recipient calculations are approximate —
          federal taxes fund the entire government, not specific programs. Per-capita figures use 2023 Census
          population estimates.</p>
        </div>

        <RelatedArticles currentSlug="who-pays" />
      </div>
    </article>
  )
}
