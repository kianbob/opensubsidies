import { Metadata } from 'next'
import Link from 'next/link'
import { loadData, fmt, fmtMoney } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import StatesChart from '@/components/StatesChart'

export const metadata: Metadata = {
  title: 'Farm Subsidies by State | OpenSubsidies',
  description: 'Explore farm subsidy payments across all 50 US states. See which states receive the most in USDA farm subsidies.',
  alternates: { canonical: 'https://www.opensubsidies.us/states' },
}

export default function StatesPage() {
  const states = loadData('states.json') as { abbr: string; name: string; payments: number; amount: number; topPrograms: { program: string; amount: number }[] }[]
  const sorted = [...states].sort((a, b) => b.amount - a.amount)
  const top15 = sorted.slice(0, 15).map(s => ({ name: s.abbr, amount: s.amount }))

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'States' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Farm Subsidies by State</h1>
      <p className="text-gray-600 mb-6">All {sorted.length} states and territories ranked by total subsidy payments from 2017 to 2025.</p>

      {/* Key Insights */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg">
          <p className="font-semibold text-gray-900">💡 Geographic Concentration</p>
          <p className="text-sm text-gray-700 mt-1">
            The top 5 states ({sorted.slice(0, 5).map(s => s.name).join(', ')}) received {fmtMoney(sorted.slice(0, 5).reduce((s, x) => s + x.amount, 0))} — 
            that&apos;s {((sorted.slice(0, 5).reduce((s, x) => s + x.amount, 0) / sorted.reduce((s, x) => s + x.amount, 0)) * 100).toFixed(0)}% of all farm subsidies
            going to just 5 states.
          </p>
        </div>
        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg">
          <p className="font-semibold text-gray-900">💡 9 Years of Data</p>
          <p className="text-sm text-gray-700 mt-1">
            Our dataset covers 2017–2025, capturing the trade war payments (2018-19), COVID emergency spending (2020),
            and the return to baseline — revealing which states depend most on emergency programs vs traditional subsidies.
          </p>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">Top 15 States</h2>
        <StatesChart data={top15} />
      </section>

      <section>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-green-700 text-left">
                <th className="py-2 pr-4">#</th>
                <th className="py-2 pr-4">State</th>
                <th className="py-2 pr-4 text-right">Payments</th>
                <th className="py-2 text-right">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((s, i) => (
                <tr key={s.abbr} className="border-b border-gray-200 hover:bg-green-50">
                  <td className="py-2 pr-4 text-gray-500">{i + 1}</td>
                  <td className="py-2 pr-4">
                    <Link href={`/states/${s.abbr.toLowerCase()}`} className="text-green-700 hover:underline font-medium">{s.name}</Link>
                    <span className="text-gray-400 ml-1">({s.abbr})</span>
                  </td>
                  <td className="py-2 pr-4 text-right tabular-nums">{fmt(s.payments)}</td>
                  <td className="py-2 text-right tabular-nums font-medium">{fmtMoney(s.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 prose max-w-none text-gray-600">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Why State-Level Data Matters</h2>
        <p>
          Farm subsidies are a federal program, but their impact is profoundly local. States with large-scale commodity
          agriculture — corn, soybeans, wheat, cotton — receive the vast majority of subsidy dollars. This geographic
          concentration shapes agricultural policy: the states that receive the most subsidies also have the most
          political influence over farm bill negotiations.
        </p>
        <p>
          Click any state to see its county-level breakdown, top programs, and biggest individual recipients. Or see our{' '}
          <Link href="/analysis/state-disparities" className="text-primary hover:underline">geographic analysis</Link> and{' '}
          <Link href="/analysis/per-capita" className="text-primary hover:underline">per-capita breakdown</Link> for deeper context.
        </p>
      </section>
    </main>
  )
}
