import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { loadData, fmt, fmtMoney } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import StateYearlyChart from '@/components/StateYearlyChart'

type State = { abbr: string; name: string; payments: number; amount: number; topPrograms: { program: string; amount: number }[] }
type County = { state: string; stateName: string; county: string; fips: string; payments: number; amount: number }
type StateYear = { state: string; year: number; payments: number; amount: number }

export const dynamicParams = true

export function generateStaticParams() {
  const states = loadData('states.json') as State[]
  const sorted = [...states].sort((a, b) => b.amount - a.amount)
  return sorted.slice(0, 20).map(s => ({ slug: s.abbr.toLowerCase() }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const states = loadData('states.json') as State[]
  const state = states.find(s => s.abbr.toLowerCase() === slug)
  if (!state) return { title: 'State Not Found' }
  return {
    title: `${state.name} Farm Subsidies | OpenSubsidies`,
    description: `${state.name} received ${fmtMoney(state.amount)} in USDA farm subsidies across ${fmt(state.payments)} payments.`,
    alternates: { canonical: `https://www.opensubsidies.us/states/${slug}` },
  }
}

export default async function StateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const states = loadData('states.json') as State[]
  const state = states.find(s => s.abbr.toLowerCase() === slug)
  if (!state) notFound()

  const stateYearly = (loadData('state-yearly.json') as StateYear[])
    .filter(sy => sy.state === state.abbr)
    .sort((a, b) => a.year - b.year)

  const counties = (loadData('counties.json') as County[])
    .filter(c => c.state === state.abbr)
    .sort((a, b) => b.amount - a.amount)

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'States', href: '/states' }, { label: state.name }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">{state.name} Farm Subsidies</h1>
      <p className="text-gray-600 mb-8">{state.name} ({state.abbr}) received {fmtMoney(state.amount)} across {fmt(state.payments)} payments.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-green-50 rounded-lg p-4"><p className="text-sm text-gray-500">Total Amount</p><p className="text-xl font-bold text-green-800">{fmtMoney(state.amount)}</p></div>
        <div className="bg-green-50 rounded-lg p-4"><p className="text-sm text-gray-500">Payments</p><p className="text-xl font-bold text-green-800">{fmt(state.payments)}</p></div>
        <div className="bg-green-50 rounded-lg p-4"><p className="text-sm text-gray-500">Counties</p><p className="text-xl font-bold text-green-800">{fmt(counties.length)}</p></div>
        <div className="bg-green-50 rounded-lg p-4"><p className="text-sm text-gray-500">Programs</p><p className="text-xl font-bold text-green-800">{state.topPrograms.length}</p></div>
      </div>

      {stateYearly.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">Yearly Trends</h2>
          <StateYearlyChart data={stateYearly} />
        </section>
      )}

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">Top Programs</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b-2 border-green-700 text-left"><th className="py-2 pr-4">#</th><th className="py-2 pr-4">Program</th><th className="py-2 text-right">Amount</th></tr></thead>
            <tbody>
              {state.topPrograms.map((p, i) => (
                <tr key={i} className="border-b border-gray-200 hover:bg-green-50">
                  <td className="py-2 pr-4 text-gray-500">{i + 1}</td>
                  <td className="py-2 pr-4">{p.program}</td>
                  <td className="py-2 text-right tabular-nums font-medium">{fmtMoney(p.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {counties.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">Counties in {state.name}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-green-700 text-left"><th className="py-2 pr-4">#</th><th className="py-2 pr-4">County</th><th className="py-2 pr-4 text-right">Payments</th><th className="py-2 text-right">Amount</th></tr></thead>
              <tbody>
                {counties.map((c, i) => (
                  <tr key={c.fips} className="border-b border-gray-200 hover:bg-green-50">
                    <td className="py-2 pr-4 text-gray-500">{i + 1}</td>
                    <td className="py-2 pr-4">{c.county}</td>
                    <td className="py-2 pr-4 text-right tabular-nums">{fmt(c.payments)}</td>
                    <td className="py-2 text-right tabular-nums font-medium">{fmtMoney(c.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  )
}
