import { Metadata } from 'next'
import { loadData, fmt, fmtMoney } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import { YearlyTrendChart, TopStatesBarChart, TopProgramsPieChart } from '@/components/DashboardCharts'

export const metadata: Metadata = {
  title: 'Dashboard | OpenSubsidies',
  description: 'Overview dashboard of US farm subsidy data with trends, top states, and top programs.',
  alternates: { canonical: 'https://www.opensubsidies.us/dashboard' },
}

export default function DashboardPage() {
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalStates: number; totalCounties: number; totalPrograms: number }
  const yearly = loadData('yearly.json') as { year: number; payments: number; amount: number }[]
  const states = loadData('states.json') as { abbr: string; name: string; payments: number; amount: number }[]
  const programs = loadData('programs.json') as { program: string; amount: number }[]

  const topStates = [...states].sort((a, b) => b.amount - a.amount).slice(0, 10).map(s => ({ name: s.abbr, amount: s.amount }))
  const topPrograms = [...programs].sort((a, b) => b.amount - a.amount).slice(0, 8).map(p => ({ name: p.program, value: p.amount }))

  const cards = [
    { label: 'Total Payments', value: fmtMoney(stats.totalAmount) },
    { label: 'Payment Count', value: fmt(stats.totalPayments) },
    { label: 'States & Territories', value: fmt(stats.totalStates) },
    { label: 'Programs', value: fmt(stats.totalPrograms) },
  ]

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Dashboard' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {cards.map(c => (
          <div key={c.label} className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="text-2xl font-bold text-green-800">{c.value}</p>
          </div>
        ))}
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">Yearly Trends</h2>
        <YearlyTrendChart data={yearly} />
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">Top 10 States</h2>
          <TopStatesBarChart data={topStates} />
        </section>
        <section>
          <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">Top Programs</h2>
          <TopProgramsPieChart data={topPrograms} />
        </section>
      </div>
    </main>
  )
}
