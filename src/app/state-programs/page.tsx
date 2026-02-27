import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { loadData, fmtMoney } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Top Farm Subsidy Program by State — Which Programs Dominate Where?',
  description: 'See which farm subsidy programs are the largest in each state. Emergency spending dominates some states while CRP leads in others.',
  alternates: { canonical: 'https://www.opensubsidies.us/state-programs' },
}

export default function StateProgramsPage() {
  const states = loadData('states.json') as { abbr: string; name: string; amount: number; topPrograms: { program: string; amount: number }[] }[]
  const sorted = [...states].sort((a, b) => b.amount - a.amount)

  // Count which programs are #1 in the most states
  const programLeads: Record<string, string[]> = {}
  sorted.forEach(s => {
    if (s.topPrograms?.[0]) {
      const p = s.topPrograms[0].program
      if (!programLeads[p]) programLeads[p] = []
      programLeads[p].push(s.name)
    }
  })
  const topLeaders = Object.entries(programLeads).sort((a, b) => b[1].length - a[1].length)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'State Programs' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Top Program by State</h1>
      <p className="text-gray-600 mb-6">Which farm subsidy program dominates in each state? The answer reveals regional differences in agricultural policy.</p>

      {/* Summary */}
      <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg mb-8">
        <p className="font-semibold text-gray-900">💡 Key Finding</p>
        <p className="text-sm text-gray-700 mt-1">
          {topLeaders[0]?.[0]} is the #1 program in {topLeaders[0]?.[1].length} states.
          {topLeaders[1] && ` ${topLeaders[1][0]} leads in ${topLeaders[1][1].length} states.`}
        </p>
      </div>

      {/* Which programs lead the most states */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">Programs Leading the Most States</h2>
        <div className="space-y-3">
          {topLeaders.slice(0, 8).map(([program, stateNames]) => (
            <div key={program} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-gray-900">{program}</h3>
                  <p className="text-xs text-gray-500 mt-1">{stateNames.join(', ')}</p>
                </div>
                <span className="text-lg font-bold text-primary">{stateNames.length} states</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full table */}
      <section>
        <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">Every State&apos;s Top Program</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">State</th>
                <th className="px-4 py-3 text-left font-semibold">Top Program</th>
                <th className="px-4 py-3 text-right font-semibold">Program Amount</th>
                <th className="px-4 py-3 text-right font-semibold hidden md:table-cell">State Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sorted.map(s => (
                <tr key={s.abbr} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link href={`/states/${s.abbr.toLowerCase()}`} className="text-primary hover:underline font-medium">{s.name}</Link>
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-xs">{s.topPrograms?.[0]?.program || '—'}</td>
                  <td className="px-4 py-3 text-right font-mono">{fmtMoney(s.topPrograms?.[0]?.amount || 0)}</td>
                  <td className="px-4 py-3 text-right font-mono text-gray-500 hidden md:table-cell">{fmtMoney(s.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
