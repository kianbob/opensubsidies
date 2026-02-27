import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fmtMoney, fmt } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import StateYearlyChart from '@/components/StateYearlyChart'
import fs from 'fs'
import path from 'path'

type CountyDetail = {
  state: string; stateName: string; county: string; fips: string
  totalAmount: number; totalPayments: number
  yearly: { year: number; amount: number; payments: number }[]
}

type CountyIndex = { state: string; stateName: string; county: string; fips: string; amount: number; payments: number }

function loadCountyDetail(fips: string): CountyDetail | null {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'counties', `${fips}.json`)
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch { return null }
}

export const dynamicParams = true

export function generateStaticParams() {
  const index = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'county-index.json'), 'utf8')
  ) as CountyIndex[]
  return [...index].sort((a, b) => b.amount - a.amount).slice(0, 50).map(c => ({ fips: c.fips }))
}

export async function generateMetadata({ params }: { params: Promise<{ fips: string }> }): Promise<Metadata> {
  const { fips } = await params
  const county = loadCountyDetail(fips)
  if (!county) return { title: 'County Not Found' }
  return {
    title: `${county.county}, ${county.stateName} Farm Subsidies — ${fmtMoney(county.totalAmount)}`,
    description: `${county.county}, ${county.stateName} received ${fmtMoney(county.totalAmount)} in USDA farm subsidies across ${fmt(county.totalPayments)} payments from 2017–2025.`,
    alternates: { canonical: `https://www.opensubsidies.us/counties/${fips}` },
  }
}

export default async function CountyDetailPage({ params }: { params: Promise<{ fips: string }> }) {
  const { fips } = await params
  const county = loadCountyDetail(fips)
  if (!county) notFound()

  const { yearly } = county
  const avgPayment = county.totalPayments > 0 ? county.totalAmount / county.totalPayments : 0
  const peakYear = yearly.length > 0 ? yearly.reduce((a, b) => a.amount > b.amount ? a : b) : null

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs items={[
        { label: 'Counties', href: '/counties' },
        { label: county.stateName, href: `/states/${county.state.toLowerCase()}` },
        { label: county.county },
      ]} />
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)]">{county.county}, {county.stateName} Farm Subsidies</h1>
        <ShareButtons title={`${county.county}, ${county.stateName} received ${fmtMoney(county.totalAmount)} in farm subsidies`} />
      </div>
      <p className="text-gray-600 mb-8">
        {county.county} County in {county.stateName} ({county.state}) received {fmtMoney(county.totalAmount)} across {fmt(county.totalPayments)} USDA Farm Service Agency payments from 2017 to 2025.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-green-50 rounded-xl p-4"><p className="text-sm text-gray-500">Total Subsidies</p><p className="text-xl font-bold text-green-800">{fmtMoney(county.totalAmount)}</p></div>
        <div className="bg-green-50 rounded-xl p-4"><p className="text-sm text-gray-500">Payments</p><p className="text-xl font-bold text-green-800">{fmt(county.totalPayments)}</p></div>
        <div className="bg-green-50 rounded-xl p-4"><p className="text-sm text-gray-500">Avg Payment</p><p className="text-xl font-bold text-green-800">{fmtMoney(avgPayment)}</p></div>
        <div className="bg-green-50 rounded-xl p-4"><p className="text-sm text-gray-500">Years of Data</p><p className="text-xl font-bold text-green-800">{yearly.length}</p></div>
      </div>

      {peakYear && (
        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg mb-6">
          <p className="font-semibold text-gray-900">💡 Key Insight</p>
          <p className="text-sm text-gray-700 mt-1">
            {county.county}&apos;s peak subsidy year was <strong>{peakYear.year}</strong> at {fmtMoney(peakYear.amount)} across {fmt(peakYear.payments)} payments.
            {yearly.length >= 2 && (() => {
              const first = yearly[0]
              const last = yearly[yearly.length - 1]
              const change = last.amount / first.amount
              return change > 2
                ? ` Spending grew ${change.toFixed(1)}× from ${first.year} to ${last.year}.`
                : change < 0.5
                ? ` Spending fell ${((1 - change) * 100).toFixed(0)}% from ${first.year} to ${last.year}.`
                : ''
            })()}
          </p>
        </div>
      )}

      {yearly.length > 1 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">Yearly Trends</h2>
          <StateYearlyChart data={yearly} />
        </section>
      )}

      {/* Yearly data table */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">Annual Breakdown</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr><th className="px-4 py-3 text-left font-semibold">Year</th><th className="px-4 py-3 text-right font-semibold">Payments</th><th className="px-4 py-3 text-right font-semibold">Amount</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {yearly.map(y => (
                <tr key={y.year} className="hover:bg-gray-50">
                  <td className="px-4 py-3"><Link href={`/years/${y.year}`} className="text-primary hover:underline">{y.year}</Link></td>
                  <td className="px-4 py-3 text-right font-mono">{fmt(y.payments)}</td>
                  <td className="px-4 py-3 text-right font-mono">{fmtMoney(y.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SEO Content */}
      <section className="mt-10 prose max-w-none text-gray-600">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">About {county.county} County Farm Subsidies</h2>
        <p>
          From 2017 to 2025, the USDA Farm Service Agency distributed {fmtMoney(county.totalAmount)} in farm subsidy
          payments to recipients in {county.county} County, {county.stateName}. The average payment was {fmtMoney(avgPayment)} across {fmt(county.totalPayments)} individual payments.
        </p>
        <p>
          Explore more subsidy data for <Link href={`/states/${county.state.toLowerCase()}`}>{county.stateName}</Link> or
          browse all <Link href="/counties">counties</Link>. This data comes from publicly available USDA FSA payment files.
          <Link href="/about"> Learn more about our data sources</Link>.
        </p>
      </section>
    </main>
  )
}
