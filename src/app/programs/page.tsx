import { Metadata } from 'next'
import { loadData, fmt, fmtMoney } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProgramsChart from '@/components/ProgramsChart'

export const metadata: Metadata = {
  title: 'Farm Subsidy Programs | OpenSubsidies',
  description: 'All 107 USDA farm subsidy programs ranked by total payments. See which programs distribute the most money.',
  alternates: { canonical: 'https://www.opensubsidies.us/programs' },
}

export default function ProgramsPage() {
  const programs = loadData('programs.json') as { program: string; code: string; payments: number; amount: number }[]
  const sorted = [...programs].sort((a, b) => b.amount - a.amount)
  const top15 = sorted.slice(0, 15).map(p => ({ name: p.program.length > 30 ? p.program.slice(0, 30) + '…' : p.program, amount: p.amount }))

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Programs' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Farm Subsidy Programs</h1>
      <p className="text-gray-600 mb-8">All {sorted.length} USDA farm subsidy programs ranked by total amount.</p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">Top 15 Programs</h2>
        <ProgramsChart data={top15} />
      </section>

      <section>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-green-700 text-left">
                <th className="py-2 pr-4">#</th>
                <th className="py-2 pr-4">Program</th>
                <th className="py-2 pr-4">Code</th>
                <th className="py-2 pr-4 text-right">Payments</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p, i) => (
                <tr key={p.code} className="border-b border-gray-200 hover:bg-green-50">
                  <td className="py-2 pr-4 text-gray-500">{i + 1}</td>
                  <td className="py-2 pr-4">{p.program}</td>
                  <td className="py-2 pr-4 text-gray-500">{p.code}</td>
                  <td className="py-2 pr-4 text-right tabular-nums">{fmt(p.payments)}</td>
                  <td className="py-2 text-right tabular-nums font-medium">{fmtMoney(p.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
