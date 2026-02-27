import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fmt, fmtMoney, formatProgram, titleCase } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import StateYearlyChart from '@/components/StateYearlyChart'
import fs from 'fs'
import path from 'path'

type State = { abbr: string; name: string; payments: number; amount: number; topPrograms: { program: string; amount: number }[] }
type StateDetail = State & { counties: { county: string; fips: string; payments: number; amount: number }[]; yearly: { year: number; payments: number; amount: number }[]; topRecipients: { name: string; city: string; state: string; amount: number; payments: number }[] }

function loadStateDetail(slug: string): StateDetail | null {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'states', `${slug}.json`)
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch { return null }
}

export const dynamicParams = true

export function generateStaticParams() {
  const states = loadData('states.json') as State[]
  return [...states].sort((a, b) => b.amount - a.amount).slice(0, 20).map(s => ({ slug: s.abbr.toLowerCase() }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const state = loadStateDetail(slug)
  if (!state) return { title: 'State Not Found' }
  return {
    title: `${state.name} Farm Subsidies — ${fmtMoney(state.amount)} in USDA Payments`,
    description: `${state.name} received ${fmtMoney(state.amount)} in USDA farm subsidies across ${fmt(state.payments)} payments. See top programs, counties, and recipients.`,
    alternates: { canonical: `https://www.opensubsidies.org/states/${slug}` },
  }
}

const STATE_POPULATIONS: Record<string, number> = {
  TX:30503301, CA:38965193, FL:22610726, NY:19571216, PA:12961683, IL:12549689, OH:11780017, GA:11029227, NC:10835491, MI:10037261,
  NJ:9290841, VA:8631393, WA:7812880, AZ:7303398, MA:7001399, TN:7051339, IN:6862199, MO:6178664, MD:6180253, WI:5910955,
  CO:5877610, MN:5737915, SC:5373555, AL:5108468, LA:4590241, KY:4526154, OR:4233358, OK:4019800, CT:3617176, IA:3207004,
  MS:2939690, AR:3067732, KS:2940865, UT:3417734, NV:3194176, NE:1978379, NM:2114371, WV:1770071, ID:1964726, HI:1435138,
  NH:1402054, ME:1395722, MT:1132812, RI:1095610, DE:1018396, SD:919318, ND:783926, AK:733536, VT:647464, WY:584057,
}

export default async function StateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const state = loadStateDetail(slug)
  if (!state) notFound()

  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number }
  const allStates = loadData('states.json') as State[]
  const sortedByAmount = [...allStates].sort((a, b) => b.amount - a.amount)
  const stateRank = sortedByAmount.findIndex(s => s.abbr === state.abbr) + 1
  const population = STATE_POPULATIONS[state.abbr]
  const perCapita = population ? state.amount / population : null
  const top20Dependent = sortedByAmount.slice(0, 20).map(s => s.abbr)
  const isTop20 = top20Dependent.includes(state.abbr)

  const { counties, yearly, topRecipients, topPrograms } = state
  const nationalAvg = stats.totalAmount / stats.totalPayments
  const stateAvg = state.amount / state.payments
  const avgRatio = stateAvg / nationalAvg

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'States', href: '/states' }, { label: state.name }]} />
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)]">{state.name} Farm Subsidies</h1>
        <ShareButtons title={`${state.name} received ${fmtMoney(state.amount)} in farm subsidies`} />
      </div>
      <p className="text-gray-600 mb-8">{state.name} ({state.abbr}) received {fmtMoney(state.amount)} across {fmt(state.payments)} USDA Farm Service Agency payments from 2017 to 2025.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-green-50 rounded-xl p-4"><p className="text-sm text-gray-500">Total Subsidies</p><p className="text-xl font-bold text-green-800">{fmtMoney(state.amount)}</p></div>
        <div className="bg-green-50 rounded-xl p-4"><p className="text-sm text-gray-500">Payments</p><p className="text-xl font-bold text-green-800">{fmt(state.payments)}</p></div>
        <div className="bg-green-50 rounded-xl p-4"><p className="text-sm text-gray-500">Counties</p><p className="text-xl font-bold text-green-800">{fmt(counties.length)}</p></div>
        <div className="bg-green-50 rounded-xl p-4"><p className="text-sm text-gray-500">Avg Payment</p><p className="text-xl font-bold text-green-800">{fmtMoney(stateAvg)}</p><p className="text-xs text-gray-500 mt-0.5">{avgRatio > 1.1 ? `${((avgRatio - 1) * 100).toFixed(0)}% above` : avgRatio < 0.9 ? `${((1 - avgRatio) * 100).toFixed(0)}% below` : 'Near'} national avg</p></div>
      </div>

      {/* How This State Compares */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-10">
        <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">How {state.name} Compares</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">National Rank</p>
            <p className="text-2xl font-bold text-[#15803d]">#{stateRank} <span className="text-sm font-normal text-gray-500">of {allStates.length} states</span></p>
          </div>
          {perCapita !== null && (
            <div>
              <p className="text-sm text-gray-500">Subsidy Per Capita</p>
              <p className="text-2xl font-bold text-[#15803d]">{fmtMoney(perCapita)}</p>
            </div>
          )}
          <div>
            <p className="text-sm text-gray-500">Share of National Total</p>
            <p className="text-2xl font-bold text-[#15803d]">{((state.amount / stats.totalAmount) * 100).toFixed(1)}%</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100">
          {isTop20 && <Link href="/analysis/state-dependency" className="text-sm text-[#15803d] hover:underline">📊 State Dependency Rankings →</Link>}
          <Link href="/analysis/per-capita" className="text-sm text-[#15803d] hover:underline">💰 Per Capita Analysis →</Link>
          <Link href="/analysis/state-disparities" className="text-sm text-[#15803d] hover:underline">📈 State Disparities →</Link>
        </div>
      </div>

      {yearly.length > 1 && (() => {
        const peakYear = yearly.reduce((a, b) => a.amount > b.amount ? a : b);
        const covid = yearly.find(y => y.year === 2020);
        const baseline = yearly.find(y => y.year === 2017);
        return (
          <>
            {/* Key Insight */}
            <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg mb-6">
              <p className="font-semibold text-gray-900">💡 Key Insight</p>
              <p className="text-sm text-gray-700 mt-1">
                {state.name}&apos;s peak subsidy year was <strong>{peakYear.year}</strong> at {fmtMoney(peakYear.amount)}
                {covid && baseline && covid.amount > baseline.amount * 2
                  ? `. COVID-era spending in 2020 (${fmtMoney(covid.amount)}) was ${(covid.amount / (baseline?.amount || 1)).toFixed(1)}× the 2017 baseline.`
                  : '.'}
              </p>
            </div>
            <section className="mb-10">
              <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">Yearly Trends</h2>
              <StateYearlyChart data={yearly} />
            </section>
          </>
        );
      })()}

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">Top Programs in {state.name}</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50"><tr><th className="px-4 py-3 text-left font-semibold">#</th><th className="px-4 py-3 text-left font-semibold">Program</th><th className="px-4 py-3 text-right font-semibold">Amount</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {topPrograms.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                  <td className="px-4 py-3">{formatProgram(p.program)}</td>
                  <td className="px-4 py-3 text-right font-mono">{fmtMoney(p.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {topRecipients.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">Top Recipients in {state.name}</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50"><tr><th className="px-4 py-3 text-left font-semibold">#</th><th className="px-4 py-3 text-left font-semibold">Recipient</th><th className="px-4 py-3 text-left font-semibold hidden md:table-cell">City</th><th className="px-4 py-3 text-right font-semibold">Total</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {topRecipients.slice(0, 25).map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-3 font-medium">{titleCase(r.name)}</td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{titleCase(r.city)}</td>
                    <td className="px-4 py-3 text-right font-mono text-primary">{fmtMoney(r.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {counties.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">Counties in {state.name}</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50"><tr><th className="px-4 py-3 text-left font-semibold">#</th><th className="px-4 py-3 text-left font-semibold">County</th><th className="px-4 py-3 text-right font-semibold">Payments</th><th className="px-4 py-3 text-right font-semibold">Amount</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {counties.map((c, i) => (
                  <tr key={c.fips || i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-3"><Link href={`/counties/${c.fips}`} className="text-green-700 hover:underline">{c.county}</Link></td>
                    <td className="px-4 py-3 text-right font-mono">{fmt(c.payments)}</td>
                    <td className="px-4 py-3 text-right font-mono">{fmtMoney(c.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* SEO Content */}
      <section className="mt-10 prose max-w-none text-gray-600">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">About {state.name} Farm Subsidies</h2>
        <p>
          From 2017 to 2025, the USDA Farm Service Agency distributed {fmtMoney(state.amount)} in farm subsidy
          payments to recipients in {state.name}. The state&apos;s largest program was {formatProgram(topPrograms[0]?.program || '')} at
          {' '}{fmtMoney(topPrograms[0]?.amount)}. {counties.length > 0 ? `Payments went to recipients in ${counties.length} counties.` : ''}
        </p>
        <p>
          This data comes from publicly available USDA FSA payment files. All payment amounts, recipient names,
          and program details are public records. <Link href="/about">Learn more about our data sources</Link>.
        </p>
      </section>
    </main>
  )
}
