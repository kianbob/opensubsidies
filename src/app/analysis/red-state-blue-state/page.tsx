import Breadcrumbs from '@/components/Breadcrumbs'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Red State, Blue State: Farm Subsidies and Political Hypocrisy',
  description: 'States that vote against "big government" receive disproportionately more farm subsidies. Data on red vs. blue state disparities in USDA payments.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/red-state-blue-state' },
  openGraph: {
    title: 'Red State, Blue State: Farm Subsidies and Political Hypocrisy',
    description: 'States that vote against "big government" receive disproportionately more farm subsidies. Data on red vs. blue state disparities in USDA payments.',
    url: 'https://www.opensubsidies.org/analysis/red-state-blue-state',
    type: 'article',
  },
}

// Political lean based on 2020/2024 presidential voting patterns
const politicalLean: Record<string, 'red' | 'blue' | 'swing'> = {
  TX: 'red', IA: 'red', KS: 'red', IL: 'blue', MN: 'blue', NE: 'red', ND: 'red', SD: 'red',
  CA: 'blue', MO: 'red', OK: 'red', AR: 'red', IN: 'red', OH: 'red', WI: 'swing',
  GA: 'swing', MT: 'red', CO: 'blue', WA: 'blue', MS: 'red', NC: 'swing', FL: 'red',
  LA: 'red', MI: 'swing', ID: 'red', TN: 'red', KY: 'red', OR: 'blue', AL: 'red',
  PA: 'swing', NY: 'blue', NM: 'blue', VA: 'blue', WY: 'red', SC: 'red', AZ: 'swing',
  UT: 'red', MD: 'blue', NV: 'swing', VT: 'blue', NJ: 'blue', ME: 'blue', MA: 'blue',
  CT: 'blue', NH: 'swing', RI: 'blue', DE: 'blue', HI: 'blue', AK: 'red', WV: 'red',
}

// State populations (2023 estimates)
const statePopulation: Record<string, number> = {
  TX: 30503000, IA: 3207000, KS: 2940000, IL: 12583000, MN: 5737000, NE: 1978000,
  ND: 783000, SD: 910000, CA: 38965000, MO: 6178000, OK: 4019000, AR: 3046000,
  IN: 6834000, OH: 11780000, WI: 5910000, GA: 11029000, MT: 1133000, CO: 5877000,
  WA: 7812000, MS: 2940000, NC: 10835000, FL: 22610000, LA: 4590000, MI: 10037000,
  ID: 1964000, TN: 7126000, KY: 4526000, OR: 4241000, AL: 5108000, PA: 12962000,
  NY: 19571000, NM: 2114000, VA: 8683000, WY: 577000, SC: 5373000, AZ: 7431000,
  UT: 3417000, MD: 6180000, NV: 3194000, VT: 647000, NJ: 9290000, ME: 1396000,
  MA: 7001000, CT: 3617000, NH: 1402000, RI: 1096000, DE: 1018000, HI: 1436000,
  AK: 733000, WV: 1770000,
}

export default function RedStateBlueState() {
  const statesData = loadData('states.json') as { abbr: string; name: string; amount: number; payments: number }[]
  const depData = loadData('state-dependency.json') as { state: string; name: string; ratio: number; subsidies: number; farmIncome: number }[]

  // Filter to actual 50 states
  const states50 = statesData.filter(s => politicalLean[s.abbr])

  const redStates = states50.filter(s => politicalLean[s.abbr] === 'red')
  const blueStates = states50.filter(s => politicalLean[s.abbr] === 'blue')
  const swingStates = states50.filter(s => politicalLean[s.abbr] === 'swing')

  const redTotal = redStates.reduce((s, r) => s + r.amount, 0)
  const blueTotal = blueStates.reduce((s, r) => s + r.amount, 0)
  const swingTotal = swingStates.reduce((s, r) => s + r.amount, 0)

  const redPop = redStates.reduce((s, r) => s + (statePopulation[r.abbr] || 0), 0)
  const bluePop = blueStates.reduce((s, r) => s + (statePopulation[r.abbr] || 0), 0)

  const redPerCapita = redTotal / redPop
  const bluePerCapita = blueTotal / bluePop

  // Top 10 red states by total subsidies
  const topRed = [...redStates].sort((a, b) => b.amount - a.amount).slice(0, 10)
  const topBlue = [...blueStates].sort((a, b) => b.amount - a.amount).slice(0, 10)

  // Per capita calculations
  const perCapita = states50
    .filter(s => statePopulation[s.abbr])
    .map(s => ({
      ...s,
      lean: politicalLean[s.abbr],
      perCapita: s.amount / statePopulation[s.abbr],
      population: statePopulation[s.abbr],
    }))
    .sort((a, b) => b.perCapita - a.perCapita)

  // Dependency data merged
  const depMap = Object.fromEntries(depData.map(d => [d.state, d]))
  const topDependent = depData
    .filter(d => politicalLean[d.state])
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, 15)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema
        title="Red State, Blue State: Farm Subsidies and Political Hypocrisy"
        description="States that vote against big government receive disproportionately more farm subsidies."
        slug="analysis/red-state-blue-state"
        date="March 2026"
      />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Red State, Blue State' }]} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · March 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Red State, Blue State: Farm Subsidies and Political Hypocrisy
        </h1>
        <ShareButtons title="Red State, Blue State: Farm Subsidies and Political Hypocrisy" />
        <p className="text-lg text-gray-600">
          The states most vocal about cutting government spending are often the most dependent on government farm payments.
          Here&apos;s what $147 billion in USDA data reveals about the politics of farm subsidies.
        </p>
      </div>

      <div className="prose max-w-none">

        {/* Key stat callout */}
        <div className="not-prose my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-red-700">{fmtMoney(redTotal)}</div>
            <div className="text-sm text-red-600 mt-1">Red state subsidies</div>
            <div className="text-xs text-gray-500 mt-1">{redStates.length} states</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-700">{fmtMoney(blueTotal)}</div>
            <div className="text-sm text-blue-600 mt-1">Blue state subsidies</div>
            <div className="text-xs text-gray-500 mt-1">{blueStates.length} states</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-700">{fmtMoney(swingTotal)}</div>
            <div className="text-sm text-purple-600 mt-1">Swing state subsidies</div>
            <div className="text-xs text-gray-500 mt-1">{swingStates.length} states</div>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Big Picture: Red States Dominate</h2>
        <p>
          Red states — those that voted Republican in recent presidential elections — received{' '}
          <strong>{fmtMoney(redTotal)}</strong> in farm subsidies from 2017–2025, compared to just{' '}
          <strong>{fmtMoney(blueTotal)}</strong> for blue states. That means red states received{' '}
          <strong>{(redTotal / blueTotal).toFixed(1)}x</strong> more in total farm subsidies.
        </p>
        <p>
          Of course, red states tend to have more farmland. But even on a <strong>per-capita</strong> basis,
          the disparity is stark: red state residents received <strong>${redPerCapita.toFixed(0)}</strong> per
          person vs. <strong>${bluePerCapita.toFixed(0)}</strong> per person in blue states — a{' '}
          <strong>{(redPerCapita / bluePerCapita).toFixed(1)}x</strong> difference.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Top 10 Red States by Farm Subsidies</h2>
        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-red-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">#</th>
                  <th className="px-4 py-2 text-left font-semibold">State</th>
                  <th className="px-4 py-2 text-right font-semibold">Total Subsidies</th>
                  <th className="px-4 py-2 text-right font-semibold">Per Capita</th>
                  <th className="px-4 py-2 text-right font-semibold">Dependency</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {topRed.map((s, i) => (
                  <tr key={s.abbr} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-2 font-medium">
                      <Link href={`/states/${s.abbr.toLowerCase()}`} className="text-primary hover:underline">
                        {s.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-red-700">{fmtMoney(s.amount)}</td>
                    <td className="px-4 py-2 text-right font-mono">
                      ${statePopulation[s.abbr] ? (s.amount / statePopulation[s.abbr]).toFixed(0) : 'N/A'}
                    </td>
                    <td className="px-4 py-2 text-right">
                      {depMap[s.abbr] ? `${(depMap[s.abbr].ratio * 100).toFixed(0)}%` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Top 10 Blue States by Farm Subsidies</h2>
        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">#</th>
                  <th className="px-4 py-2 text-left font-semibold">State</th>
                  <th className="px-4 py-2 text-right font-semibold">Total Subsidies</th>
                  <th className="px-4 py-2 text-right font-semibold">Per Capita</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {topBlue.map((s, i) => (
                  <tr key={s.abbr} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-2 font-medium">
                      <Link href={`/states/${s.abbr.toLowerCase()}`} className="text-primary hover:underline">
                        {s.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-blue-700">{fmtMoney(s.amount)}</td>
                    <td className="px-4 py-2 text-right font-mono">
                      ${statePopulation[s.abbr] ? (s.amount / statePopulation[s.abbr]).toFixed(0) : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Per Capita: The Real Story</h2>
        <p>
          Total dollars favor big agricultural states. But per-capita spending reveals which states are
          truly <em>dependent</em> on farm subsidies. The top 15 states by per-capita farm subsidies
          are overwhelmingly red.
        </p>

        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">#</th>
                  <th className="px-4 py-2 text-left font-semibold">State</th>
                  <th className="px-4 py-2 text-center font-semibold">Lean</th>
                  <th className="px-4 py-2 text-right font-semibold">Per Capita</th>
                  <th className="px-4 py-2 text-right font-semibold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {perCapita.slice(0, 15).map((s, i) => (
                  <tr key={s.abbr} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-2 font-medium">
                      <Link href={`/states/${s.abbr.toLowerCase()}`} className="text-primary hover:underline">
                        {s.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        s.lean === 'red' ? 'bg-red-100 text-red-700' :
                        s.lean === 'blue' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {s.lean === 'red' ? 'R' : s.lean === 'blue' ? 'D' : 'S'}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right font-mono font-bold">${s.perCapita.toFixed(0)}</td>
                    <td className="px-4 py-2 text-right font-mono text-gray-600">{fmtMoney(s.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Subsidy Dependency: Who Needs Government Most?</h2>
        <p>
          The state-dependency ratio measures what percentage of a state&apos;s total farm income comes from
          federal subsidies. States with the highest dependency ratios are the ones whose agricultural
          economies would collapse without government payments.
        </p>

        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">#</th>
                  <th className="px-4 py-2 text-left font-semibold">State</th>
                  <th className="px-4 py-2 text-center font-semibold">Lean</th>
                  <th className="px-4 py-2 text-right font-semibold">Dependency</th>
                  <th className="px-4 py-2 text-right font-semibold">Subsidies</th>
                  <th className="px-4 py-2 text-right font-semibold">Farm Income</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {topDependent.map((d, i) => (
                  <tr key={d.state} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-2 font-medium">
                      <Link href={`/states/${d.state.toLowerCase()}`} className="text-primary hover:underline">
                        {d.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        politicalLean[d.state] === 'red' ? 'bg-red-100 text-red-700' :
                        politicalLean[d.state] === 'blue' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {politicalLean[d.state] === 'red' ? 'R' : politicalLean[d.state] === 'blue' ? 'D' : 'S'}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right font-mono font-bold text-primary">
                      {(d.ratio * 100).toFixed(0)}%
                    </td>
                    <td className="px-4 py-2 text-right font-mono">{fmtMoney(d.subsidies)}</td>
                    <td className="px-4 py-2 text-right font-mono text-gray-600">{fmtMoney(d.farmIncome)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="not-prose my-8 bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-red-800 mb-2">
            The Irony in the Data
          </h3>
          <p className="text-red-700">
            North Dakota — which voted for Trump by 33 points in 2020 — has a subsidy dependency
            ratio of <strong>69%</strong>. That means 69 cents of every dollar of farm income comes from
            federal payments. South Dakota (58%), Kansas (42%), and Montana (55%) are similarly dependent.
            These are states whose politicians routinely vote to cut SNAP, Medicaid, and other &quot;big government&quot;
            programs while defending every dollar of farm subsidies.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Why the Disparity Exists</h2>
        <p>
          The red state advantage in farm subsidies isn&apos;t purely political — it&apos;s also geographic.
          Farm subsidies flow disproportionately to <strong>commodity crops</strong> like corn, soybeans,
          wheat, cotton, and rice. These crops are concentrated in the Great Plains and the Midwest,
          which happen to be deeply red.
        </p>
        <p>
          Blue states tend to grow specialty crops — fruits, vegetables, nuts — which historically
          receive less in direct subsidies. California, the nation&apos;s largest agricultural state by
          revenue ($308B farm income), receives just <strong>{fmtMoney(
            states50.find(s => s.abbr === 'CA')?.amount || 0
          )}</strong> in subsidies — a dependency ratio of only 2%.
        </p>
        <p>
          But this geographic coincidence doesn&apos;t excuse the political hypocrisy. The same
          congressional delegations that fight to preserve and expand commodity subsidies are often the
          loudest voices calling for cuts to social safety net programs.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Farm Bill Coalition</h2>
        <p>
          The political survival of farm subsidies depends on a bipartisan bargain: the Farm Bill bundles
          <strong> SNAP (food stamps)</strong> with farm subsidies. Urban Democrats vote for farm subsidies
          in exchange for rural Republican votes on SNAP. This logrolling arrangement has protected farm
          subsidies from reform for decades.
        </p>
        <p>
          The irony deepens when you consider that <Link href="/analysis/who-pays" className="text-primary hover:underline">
          blue state taxpayers disproportionately fund</Link> the farm subsidies that flow to red states.
          States like New York, California, New Jersey, and Massachusetts are net donors — their taxpayers
          send more to Washington than they receive in farm subsidies. Meanwhile, North Dakota, South
          Dakota, Kansas, and Iowa are massive net recipients.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What Reform Would Look Like</h2>
        <p>
          Means-testing farm subsidies — limiting payments to farmers with genuine need — would
          disproportionately affect red states. <Link href="/analysis/payment-limits" className="text-primary hover:underline">
          Payment limits</Link> of $125,000/year are routinely circumvented through LLCs and
          partnerships. Shifting subsidy dollars toward conservation programs would redirect money away
          from commodity-heavy red states toward broader environmental goals.
        </p>
        <p>
          None of these reforms are likely as long as the Farm Bill coalition holds. But the data is
          clear: the states that benefit most from government farm spending are the same ones whose
          elected officials argue most loudly against government spending.
        </p>

        <div className="not-prose my-8 bg-gray-50 border rounded-xl p-6">
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-3">Methodology</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Political lean based on 2020 and 2024 presidential election results</li>
            <li>• Subsidy data covers 2017–2025 USDA Farm Service Agency payments ({fmtMoney(147286964900)} total)</li>
            <li>• State populations from 2023 Census Bureau estimates</li>
            <li>• Dependency ratios from USDA Economic Research Service farm income data</li>
            <li>• Swing states (GA, WI, NC, PA, MI, AZ, NV, NH) excluded from red/blue totals</li>
          </ul>
        </div>

      </div>

      <RelatedArticles currentSlug="red-state-blue-state" />
    </article>
  )
}
