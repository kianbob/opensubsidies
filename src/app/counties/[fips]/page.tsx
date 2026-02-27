import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fmt, fmtMoney } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import CountyYearlyChart from './CountyCharts'
import fs from 'fs'
import path from 'path'

type CountyDetail = {
  state: string
  stateName: string
  county: string
  fips: string
  totalAmount: number
  totalPayments: number
  yearly: { year: number; amount: number; payments: number }[]
}

function loadCounty(fips: string): CountyDetail | null {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'counties', `${fips}.json`)
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch { return null }
}

export const dynamicParams = true

export function generateStaticParams() {
  try {
    const index = loadData('county-index.json') as { fips: string }[]
    return index.slice(0, 100).map(c => ({ fips: c.fips }))
  } catch { return [] }
}

export async function generateMetadata({ params }: { params: Promise<{ fips: string }> }): Promise<Metadata> {
  const { fips } = await params
  const county = loadCounty(fips)
  if (!county) return { title: 'County Not Found' }
  return {
    title: `${county.county} County, ${county.stateName} Farm Subsidies — ${fmtMoney(county.totalAmount)}`,
    description: `${county.county} County, ${county.stateName} received ${fmtMoney(county.totalAmount)} in USDA farm subsidies across ${fmt(county.totalPayments)} payments from 2017 to 2025.`,
    alternates: { canonical: `https://www.opensubsidies.org/counties/${fips}` },
  }
}

export default async function CountyDetailPage({ params }: { params: Promise<{ fips: string }> }) {
  const { fips } = await params
  const county = loadCounty(fips)
  if (!county) notFound()

  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number }
  const countyIndex = loadData('county-index.json') as { fips: string; county: string; state: string; amount: number }[]
  const sortedCounties = [...countyIndex].sort((a, b) => b.amount - a.amount)
  const nationalRank = sortedCounties.findIndex(c => c.fips === fips) + 1
  const stateCounties = sortedCounties.filter(c => c.state === county.state)
  const stateRank = stateCounties.findIndex(c => c.fips === fips) + 1
  const { yearly } = county
  const peakYear = yearly.reduce((a, b) => a.amount > b.amount ? a : b)
  const avgPayment = county.totalPayments > 0 ? county.totalAmount / county.totalPayments : 0
  const nationalAvg = stats.totalAmount / stats.totalPayments
  const avgRatio = avgPayment / nationalAvg
  const covid = yearly.find(y => y.year === 2020)
  const baseline = yearly.find(y => y.year === 2017)
  const stateSlug = county.state.toLowerCase()

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Counties', href: '/counties' }, { label: `${county.county}, ${county.state}` }]} />
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)]">{county.county} County, {county.stateName} Farm Subsidies</h1>
        <ShareButtons title={`${county.county} County, ${county.stateName} received ${fmtMoney(county.totalAmount)} in farm subsidies`} />
      </div>
      <p className="text-gray-600 mb-8">
        {county.county} County in {county.stateName} received <strong>{fmtMoney(county.totalAmount)}</strong> in USDA Farm Service Agency payments across {fmt(county.totalPayments)} individual payments from 2017 to 2025.
      </p>

      {/* County Rank */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-8">
        <h2 className="font-semibold text-gray-900 mb-3">📊 County Rank</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">National Rank</p>
            <p className="text-2xl font-bold text-[#15803d]">#{nationalRank || '—'} <span className="text-sm font-normal text-gray-500">of {sortedCounties.length}</span></p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Rank in {county.stateName}</p>
            <p className="text-2xl font-bold text-[#15803d]">#{stateRank || '—'} <span className="text-sm font-normal text-gray-500">of {stateCounties.length}</span></p>
          </div>
          <div className="flex items-end gap-3">
            <Link href="/counties" className="text-sm text-[#15803d] hover:underline">🏘️ All Counties →</Link>
            <Link href={`/states/${stateSlug}`} className="text-sm text-[#15803d] hover:underline">📍 {county.stateName} →</Link>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Subsidies</p>
          <p className="text-xl font-bold text-green-800">{fmtMoney(county.totalAmount)}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-sm text-gray-500">Payments</p>
          <p className="text-xl font-bold text-green-800">{fmt(county.totalPayments)}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-sm text-gray-500">Peak Year</p>
          <p className="text-xl font-bold text-green-800">{peakYear.year}</p>
          <p className="text-xs text-gray-500">{fmtMoney(peakYear.amount)}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-sm text-gray-500">Avg Payment</p>
          <p className="text-xl font-bold text-green-800">{fmtMoney(avgPayment)}</p>
          <p className="text-xs text-gray-500 mt-0.5">{avgRatio > 1.1 ? `${((avgRatio - 1) * 100).toFixed(0)}% above` : avgRatio < 0.9 ? `${((1 - avgRatio) * 100).toFixed(0)}% below` : 'Near'} national avg</p>
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mb-8">
        <p className="font-semibold text-gray-900">💡 Key Insight</p>
        <p className="text-sm text-gray-700 mt-1">
          {county.county} County&apos;s peak subsidy year was <strong>{peakYear.year}</strong> at {fmtMoney(peakYear.amount)}
          {covid && baseline && covid.amount > baseline.amount * 2
            ? `. COVID-era spending in 2020 (${fmtMoney(covid.amount)}) was ${(covid.amount / baseline.amount).toFixed(1)}× the 2017 baseline.`
            : peakYear.year === 2020 ? ' — driven by COVID-era CFAP emergency payments.' : '.'}
          {' '}The average payment of {fmtMoney(avgPayment)} is {avgRatio > 1.1 ? `${((avgRatio - 1) * 100).toFixed(0)}% above` : avgRatio < 0.9 ? `${((1 - avgRatio) * 100).toFixed(0)}% below` : 'near'} the national average.
        </p>
      </div>

      {/* Chart */}
      {yearly.length > 1 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">Yearly Trend</h2>
          <CountyYearlyChart data={yearly} />
        </div>
      )}

      {/* Year-by-year table */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">Year-by-Year Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2 px-3 font-semibold">Year</th>
                <th className="py-2 px-3 font-semibold text-right">Subsidies</th>
                <th className="py-2 px-3 font-semibold text-right">Payments</th>
                <th className="py-2 px-3 font-semibold text-right">Avg Payment</th>
              </tr>
            </thead>
            <tbody>
              {[...yearly].sort((a, b) => b.year - a.year).map(y => (
                <tr key={y.year} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3">
                    <Link href={`/years/${y.year}`} className="text-green-700 hover:underline font-medium">{y.year}</Link>
                  </td>
                  <td className="py-2 px-3 text-right">{fmtMoney(y.amount)}</td>
                  <td className="py-2 px-3 text-right">{fmt(y.payments)}</td>
                  <td className="py-2 px-3 text-right">{y.payments > 0 ? fmtMoney(y.amount / y.payments) : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Other counties in this state */}
      {stateCounties.length > 1 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">Other {county.stateName} Counties</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stateCounties.filter(c => c.fips !== fips).slice(0, 8).map((c, i) => (
              <Link key={c.fips} href={`/counties/${c.fips}`} className="bg-white rounded-lg border border-gray-200 p-3 hover:border-green-300 hover:shadow-sm transition">
                <p className="font-medium text-sm text-gray-900">{c.county}</p>
                <p className="text-xs text-gray-500">{fmtMoney(c.amount)}</p>
                <p className="text-xs text-gray-400">#{i + (stateCounties[0]?.fips === fips ? 1 : 0) + 1} in {county.state}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related links */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">Explore More</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href={`/states/${stateSlug}`} className="bg-green-50 rounded-xl p-4 hover:bg-green-100 transition">
            <p className="font-semibold text-green-800">📍 {county.stateName}</p>
            <p className="text-sm text-gray-600">View all {county.stateName} farm subsidies</p>
          </Link>
          <Link href="/counties" className="bg-green-50 rounded-xl p-4 hover:bg-green-100 transition">
            <p className="font-semibold text-green-800">🏘️ All Counties</p>
            <p className="text-sm text-gray-600">Compare counties nationwide</p>
          </Link>
          <Link href="/analysis/county-hotspots" className="bg-green-50 rounded-xl p-4 hover:bg-green-100 transition">
            <p className="font-semibold text-green-800">📊 County Hotspots</p>
            <p className="text-sm text-gray-600">Where subsidies concentrate</p>
          </Link>
        </div>
      </div>

      {/* SEO content */}
      <section className="prose max-w-none mb-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">About Farm Subsidies in {county.county} County</h2>
        <p>
          {county.county} County, {county.stateName} is one of {fmt(sortedCounties.length)} U.S. counties receiving USDA farm subsidy payments.
          Over the nine-year period from 2017 to 2025, the county received {fmtMoney(county.totalAmount)} across {fmt(county.totalPayments)} individual payments
          from Farm Service Agency programs including Conservation Reserve Program (CRP), Price Loss Coverage (PLC), Agriculture Risk Coverage (ARC), and emergency assistance programs.
        </p>
        <p>
          {peakYear.year === 2020
            ? `Like many agricultural counties, ${county.county} County saw its peak subsidy payments in 2020 when the Coronavirus Food Assistance Program (CFAP) distributed emergency payments to offset pandemic-related losses.`
            : peakYear.year >= 2018 && peakYear.year <= 2019
            ? `${county.county} County's peak in ${peakYear.year} coincided with the Market Facilitation Program (MFP) payments designed to offset losses from trade tensions.`
            : `${county.county} County's subsidy payments peaked in ${peakYear.year} at ${fmtMoney(peakYear.amount)}.`}
        </p>
        <p>
          Data on this page comes from USDA Farm Service Agency payment files, which are public records available under the Freedom of Information Act.
          All payment data is aggregated at the county level — individual recipient details are available on our <Link href="/recipients" className="text-green-700 hover:underline">top recipients</Link> page.
        </p>
      </section>
    </main>
  )
}
