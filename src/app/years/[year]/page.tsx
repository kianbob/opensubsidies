import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'

type YearEntry = { year: number; payments: number; amount: number }
type StateYearEntry = { state: string; year: number; payments: number; amount: number }

type Props = { params: Promise<{ year: string }> }

export async function generateStaticParams() {
  return Array.from({ length: 9 }, (_, i) => ({ year: String(2017 + i) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params
  return {
    title: `${year} Farm Subsidies — Spending, Payments & Top States`,
    description: `Explore USDA farm subsidy spending in ${year}. Total payments, top states, and how ${year} compares to other years.`,
  }
}

export default async function YearPage({ params }: Props) {
  const { year: yearStr } = await params
  const yearNum = parseInt(yearStr)

  const yearly = loadData('yearly.json') as YearEntry[]
  const stateYearly = loadData('state-yearly.json') as StateYearEntry[]

  const thisYear = yearly.find(y => y.year === yearNum)
  if (!thisYear) return <div className="max-w-4xl mx-auto px-4 py-10">Year not found.</div>

  const statesThisYear = stateYearly
    .filter(s => s.year === yearNum && s.amount > 0)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 20)

  const allYears = yearly.filter(y => y.year >= 2017 && y.year <= 2025).sort((a, b) => a.year - b.year)
  const rank = [...allYears].sort((a, b) => b.amount - a.amount).findIndex(y => y.year === yearNum) + 1
  const avg = allYears.reduce((s, y) => s + y.amount, 0) / allYears.length

  const context = yearNum === 2020 ? '🦠 COVID-19 pandemic response drove record spending'
    : yearNum === 2018 ? '🌐 Trade war tariffs triggered Market Facilitation Program'
    : yearNum === 2019 ? '🌐 Expanded MFP payments as trade war continued'
    : yearNum === 2022 ? '🌪️ Drought and disaster relief programs'
    : null

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Years', href: '/years/2017' }, { label: yearStr }]} />

      <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-2">
        {yearStr} Farm Subsidies
      </h1>
      <p className="text-gray-600 mb-6">
        USDA farm subsidy spending and payments for fiscal year {yearStr}.
      </p>

      {context && (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mb-6">
          <p className="text-sm text-gray-800">{context}</p>
        </div>
      )}

      {/* Key stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Spending', value: fmtMoney(thisYear.amount) },
          { label: 'Payment Records', value: fmt(thisYear.payments) },
          { label: 'Rank (2017–2025)', value: `#${rank} of 9` },
          { label: 'vs. Average', value: `${thisYear.amount > avg ? '+' : ''}${((thisYear.amount / avg - 1) * 100).toFixed(0)}%` },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl shadow-sm p-5 text-center">
            <div className="text-2xl font-bold text-primary">{s.value}</div>
            <div className="text-sm text-gray-600 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Top states */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">Top States in {yearStr}</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">State</th>
                <th className="px-4 py-3 font-semibold text-right">Amount</th>
                <th className="px-4 py-3 font-semibold text-right hidden md:table-cell">Payments</th>
                <th className="px-4 py-3 font-semibold text-right hidden md:table-cell">% of Year Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {statesThisYear.map((s, i) => (
                <tr key={s.state} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                  <td className="px-4 py-2">
                    <Link href={`/states/${s.state.toLowerCase()}`} className="font-medium text-primary hover:underline">{s.state}</Link>
                  </td>
                  <td className="px-4 py-2 text-right font-mono">{fmtMoney(s.amount)}</td>
                  <td className="px-4 py-2 text-right text-gray-600 hidden md:table-cell">{fmt(s.payments)}</td>
                  <td className="px-4 py-2 text-right text-gray-600 hidden md:table-cell">{((s.amount / thisYear.amount) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* All years comparison */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">All Years Comparison</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Year</th>
                <th className="px-4 py-3 font-semibold text-right">Total Spending</th>
                <th className="px-4 py-3 font-semibold text-right">Payments</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allYears.map(y => (
                <tr key={y.year} className={y.year === yearNum ? 'bg-green-50 font-semibold' : 'hover:bg-gray-50'}>
                  <td className="px-4 py-2">
                    {y.year === yearNum ? y.year : <Link href={`/years/${y.year}`} className="text-primary hover:underline">{y.year}</Link>}
                  </td>
                  <td className="px-4 py-2 text-right font-mono">{fmtMoney(y.amount)}</td>
                  <td className="px-4 py-2 text-right text-gray-600">{fmt(y.payments)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* AI Overview */}
      <section className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-bold text-gray-900 mb-3">📊 Why {yearStr} Data Matters</h2>
        {yearNum === 2020 ? (
          <p className="text-sm text-gray-700">
            2020 was the <strong>single largest year for farm subsidies in American history</strong>. The COVID-19 pandemic triggered the Coronavirus Food Assistance Program (CFAP), which alone distributed over $23 billion. Combined with ongoing trade war payments and traditional programs, total spending hit {fmtMoney(thisYear.amount)} — more than the previous three years combined. This year permanently changed the baseline expectation for farm spending: once farmers received emergency payments at this scale, political pressure to maintain elevated support levels became enormous. Understanding 2020 is essential to understanding everything that followed.
          </p>
        ) : yearNum === 2018 || yearNum === 2019 ? (
          <p className="text-sm text-gray-700">
            {yearNum === 2018 ? 'The US-China trade war began in 2018' : '2019 saw expanded trade war payments'}, triggering the Market Facilitation Program (MFP) — a direct payment program to farmers affected by retaliatory tariffs. <strong>MFP represented a new model of farm subsidies</strong>: ad-hoc emergency payments decided by the executive branch rather than through the traditional Farm Bill legislative process. This year marked the beginning of a structural shift in how farm subsidies work, with emergency spending increasingly dwarfing the traditional programs that were designed to provide stable, predictable support.
          </p>
        ) : yearNum <= 2017 ? (
          <p className="text-sm text-gray-700">
            {yearStr} represents the <strong>pre-crisis baseline</strong> for farm subsidies — before trade war tariffs, before COVID, before the era of massive emergency spending. At {fmtMoney(thisYear.amount)}, spending was driven primarily by traditional programs: CRP conservation payments, ARC/PLC commodity support, and routine disaster assistance. Comparing any post-2017 year to this baseline reveals just how dramatically the farm subsidy landscape has changed. The programs that dominated in {yearStr} — CRP, PLC, ARC — still exist, but they&apos;ve been overshadowed by emergency spending that didn&apos;t exist yet.
          </p>
        ) : yearNum >= 2021 && yearNum <= 2023 ? (
          <p className="text-sm text-gray-700">
            {yearStr} shows the <strong>aftermath of crisis-era spending</strong>. After the record $38.7B in 2020, spending declined but didn&apos;t return to pre-2018 levels. Emergency programs continued — disaster relief for drought, wildfires, and hurricanes kept spending elevated. The question this year&apos;s data raises is whether the elevated spending baseline established during the trade war and pandemic has become the &quot;new normal&quot; for farm subsidies, or whether it will eventually return to pre-crisis levels.
          </p>
        ) : yearNum === 2024 ? (
          <p className="text-sm text-gray-700">
            {yearStr} data shows farm subsidies <strong>climbing back toward elevated levels</strong> after a brief post-COVID decline. Emergency Relief Program (ERP) payments for ongoing drought and extreme weather, combined with traditional commodity support, pushed spending above {fmtMoney(thisYear.amount)}. With the 2018 Farm Bill still operating on extension and no new legislation in sight, spending patterns in {yearStr} reflect political inertia as much as agricultural need.
          </p>
        ) : (
          <p className="text-sm text-gray-700">
            {yearStr} is a <strong>partial year</strong> — only payments with a {yearStr} program year are included so far. As the USDA continues processing payments throughout the fiscal year, this total will grow. Compare against previous complete years to understand the trajectory of farm subsidy spending. Watch this page for updates as new payment files are released.
          </p>
        )}
      </section>

      {/* Year navigation */}
      <div className="text-center text-sm text-gray-500">
        Explore by Year:{' '}
        {allYears.map((y, i) => (
          <span key={y.year}>
            {i > 0 && ' · '}
            {y.year === yearNum ? (
              <strong>{y.year}</strong>
            ) : (
              <Link href={`/years/${y.year}`} className="text-primary hover:underline">{y.year}</Link>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
