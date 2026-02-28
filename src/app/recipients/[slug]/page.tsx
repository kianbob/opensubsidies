import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fmt, fmtMoney, titleCase, formatProgram, slugify } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { YearlyChart, ProgramPieChart } from './RecipientCharts'
import fs from 'fs'
import path from 'path'

type RecipientDetail = {
  slug: string
  name: string
  state: string
  city: string
  totalAmount: number
  totalPayments: number
  yearly: { year: number; amount: number; payments: number; programs: Record<string, number> }[]
  topPrograms: { program: string; amount: number }[]
}

function loadRecipient(slug: string): RecipientDetail | null {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'recipients', `${slug}.json`)
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch { return null }
}

export const dynamicParams = true

export function generateStaticParams() {
  try {
    const index = loadData('recipient-index.json') as { slug: string }[]
    return index.slice(0, 100).map(r => ({ slug: r.slug }))
  } catch { return [] }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const r = loadRecipient(slug)
  if (!r) return { title: 'Recipient Not Found' }
  const name = titleCase(r.name)
  return {
    title: `${name} — ${fmtMoney(r.totalAmount)} in Farm Subsidies`,
    description: `${name} in ${titleCase(r.city)}, ${r.state} received ${fmtMoney(r.totalAmount)} in USDA farm subsidies across ${fmt(r.totalPayments)} payments from 2017 to 2025.`,
    alternates: { canonical: `https://www.opensubsidies.org/recipients/${slug}` },
  }
}

export default async function RecipientDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const r = loadRecipient(slug)
  if (!r) notFound()

  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number }
  const name = titleCase(r.name)
  const rawName = r.name.toUpperCase()
  const entityType = rawName.includes(' DEPT ') || rawName.includes(' DEPARTMENT') || rawName.includes(' COUNTY ') || rawName.includes(' STATE OF ') || rawName.includes(' CITY OF ') || rawName.includes(' COMMISSION') || rawName.includes(' AUTHORITY') || rawName.includes(' DISTRICT') ? 'Government Entity'
    : rawName.includes(' LLC') || rawName.includes(' L L C') ? 'LLC'
    : rawName.includes(' INC') || rawName.includes(' INCORPORATED') ? 'Corporation'
    : rawName.includes(' LTD') || rawName.includes(' LIMITED') ? 'Corporation'
    : rawName.includes(' LP') || rawName.includes(' PARTNERSHIP') ? 'Partnership'
    : rawName.includes(' TRUST') ? 'Trust'
    : rawName.includes(' ESTATE') ? 'Estate'
    : rawName.includes(' FARM') || rawName.includes(' RANCH') || rawName.includes(' DAIRY') ? 'Farm/Ranch'
    : rawName.includes(' CO-OP') || rawName.includes(' COOPERATIVE') ? 'Cooperative'
    : 'Individual'
  const isMultiProgram = r.topPrograms.length >= 3
  const city = titleCase(r.city)
  const avgPayment = r.totalPayments > 0 ? r.totalAmount / r.totalPayments : 0
  const nationalAvg = stats.totalAmount / stats.totalPayments
  const avgRatio = avgPayment / nationalAvg
  const peakYear = r.yearly.length > 0 ? r.yearly.reduce((a, b) => a.amount > b.amount ? a : b) : null
  const activeYears = r.yearly.filter(y => y.amount > 0).length
  const stateSlug = r.state.toLowerCase()

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Recipients', href: '/recipients' }, { label: name }]} />
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)]">{name}</h1>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">{entityType}</span>
            {isMultiProgram && <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">Multi-Program ({r.topPrograms.length})</span>}
          </div>
          <p className="text-gray-500 mt-1">📍 {city}, <Link href={`/states/${stateSlug}`} className="text-green-700 hover:underline">{r.state}</Link> · <Link href="/entity-types" className="text-[#15803d] hover:underline">Entity Types</Link></p>
        </div>
        <ShareButtons title={`${name} received ${fmtMoney(r.totalAmount)} in farm subsidies`} />
      </div>
      <p className="text-gray-600 mb-8">
        {name} received <strong>{fmtMoney(r.totalAmount)}</strong> in USDA Farm Service Agency payments across {fmt(r.totalPayments)} individual payments from 2017 to 2025.
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Received</p>
          <p className="text-xl font-bold text-green-800">{fmtMoney(r.totalAmount)}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-sm text-gray-500">Payments</p>
          <p className="text-xl font-bold text-green-800">{fmt(r.totalPayments)}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-sm text-gray-500">Active Years</p>
          <p className="text-xl font-bold text-green-800">{activeYears > 0 ? `${activeYears} of 9` : 'N/A'}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-sm text-gray-500">Avg Payment</p>
          <p className="text-xl font-bold text-green-800">{fmtMoney(avgPayment)}</p>
          <p className="text-xs text-gray-500 mt-0.5">{avgRatio > 100 ? `${Math.round(avgRatio).toLocaleString()}x` : avgRatio > 1.1 ? `${((avgRatio - 1) * 100).toFixed(0)}% above` : avgRatio < 0.9 ? `${((1 - avgRatio) * 100).toFixed(0)}% below` : 'Near'} national avg</p>
        </div>
      </div>

      {/* Key Insight */}
      {peakYear && (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mb-8">
          <p className="font-semibold text-gray-900">💡 Key Insight</p>
          <p className="text-sm text-gray-700 mt-1">
            {name}&apos;s peak subsidy year was <strong>{peakYear.year}</strong> at {fmtMoney(peakYear.amount)},
            accounting for {((peakYear.amount / r.totalAmount) * 100).toFixed(0)}% of all payments received.
            {r.topPrograms.length > 0 && ` The largest program was ${formatProgram(r.topPrograms[0].program)} at ${fmtMoney(r.topPrograms[0].amount)}.`}
          </p>
        </div>
      )}

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {r.yearly.length > 1 && <YearlyChart data={r.yearly} />}
        {r.topPrograms.length > 1 && <ProgramPieChart data={r.topPrograms} />}
      </div>

      {/* Programs table */}
      {r.topPrograms.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">Programs</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2 px-3 font-semibold">#</th>
                  <th className="py-2 px-3 font-semibold">Program</th>
                  <th className="py-2 px-3 font-semibold text-right">Amount</th>
                  <th className="py-2 px-3 font-semibold text-right">% of Total</th>
                </tr>
              </thead>
              <tbody>
                {r.topPrograms.map((p, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3 text-gray-500">{i + 1}</td>
                    <td className="py-2 px-3">
                      <Link href={`/programs/${slugify(p.program)}`} className="text-green-700 hover:underline">{formatProgram(p.program)}</Link>
                    </td>
                    <td className="py-2 px-3 text-right font-mono">{fmtMoney(p.amount)}</td>
                    <td className="py-2 px-3 text-right text-gray-500">{((p.amount / r.totalAmount) * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
                <th className="py-2 px-3 font-semibold text-right">Amount</th>
                <th className="py-2 px-3 font-semibold text-right">Payments</th>
                <th className="py-2 px-3 font-semibold text-right">Avg Payment</th>
              </tr>
            </thead>
            <tbody>
              {[...r.yearly].sort((a, b) => b.year - a.year).map(y => (
                <tr key={y.year} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3">
                    <Link href={`/years/${y.year}`} className="text-green-700 hover:underline font-medium">{y.year}</Link>
                  </td>
                  <td className="py-2 px-3 text-right font-mono">{fmtMoney(y.amount)}</td>
                  <td className="py-2 px-3 text-right">{fmt(y.payments)}</td>
                  <td className="py-2 px-3 text-right">{y.payments > 0 ? fmtMoney(y.amount / y.payments) : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Related links */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">Explore More</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href={`/states/${stateSlug}`} className="bg-green-50 rounded-xl p-4 hover:bg-green-100 transition">
            <p className="font-semibold text-green-800">📍 {r.state} Farm Subsidies</p>
            <p className="text-sm text-gray-600">See all subsidies in {r.state}</p>
          </Link>
          <Link href="/recipients" className="bg-green-50 rounded-xl p-4 hover:bg-green-100 transition">
            <p className="font-semibold text-green-800">🏆 Top Recipients</p>
            <p className="text-sm text-gray-600">Compare the largest recipients</p>
          </Link>
          <Link href="/analysis/subsidy-concentration" className="bg-green-50 rounded-xl p-4 hover:bg-green-100 transition">
            <p className="font-semibold text-green-800">📊 Subsidy Concentration</p>
            <p className="text-sm text-gray-600">Who gets the most?</p>
          </Link>
        </div>
      </div>

      {/* SEO content */}
      <section className="prose max-w-none mb-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">About {name}</h2>
        <p>
          {name}, based in {city}, {r.state}, is one of the top 5,000 recipients of USDA farm subsidy payments in the United States.
          Over the nine-year period from 2017 to 2025, they received {fmtMoney(r.totalAmount)} across {fmt(r.totalPayments)} payments
          from {r.topPrograms.length} different Farm Service Agency programs.
        </p>
        {r.topPrograms.length > 0 && (
          <p>
            Their largest program was {formatProgram(r.topPrograms[0].program)}, which accounted for {((r.topPrograms[0].amount / r.totalAmount) * 100).toFixed(0)}% of
            total payments. {r.topPrograms.length > 1 && `The second largest was ${formatProgram(r.topPrograms[1].program)} at ${fmtMoney(r.topPrograms[1].amount)}.`}
          </p>
        )}
        <p>
          All data comes from USDA Farm Service Agency payment files, which are public records.
          Recipient names appear exactly as reported by USDA. For questions about specific payments,
          contact the <a href="https://www.fsa.usda.gov" className="text-green-700 hover:underline" target="_blank" rel="noopener noreferrer">Farm Service Agency</a>.
        </p>
      </section>
    </main>
  )
}
