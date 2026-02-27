import { Metadata } from 'next'
import { loadData, fmt, fmtMoney } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import { YearlyTrendChart, TopStatesBarChart, TopProgramsPieChart } from '@/components/DashboardCharts'

export const metadata: Metadata = {
  title: 'Farm Subsidy Dashboard — Interactive Overview',
  description: 'Interactive dashboard showing farm subsidy trends, top states, and biggest programs. $147B across 31M+ payments visualized.',
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
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Farm Subsidy Dashboard</h1>
      <p className="text-gray-600 mb-8">Interactive overview of {fmtMoney(stats.totalAmount)} in USDA farm subsidy payments from 2017 to 2025.</p>

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

      <section className="mt-10 prose max-w-none text-gray-600">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Understanding the Dashboard</h2>
        <p>
          This dashboard provides a high-level view of U.S. farm subsidy spending based on {fmt(stats.totalPayments)} USDA
          Farm Service Agency payment records. The yearly trends show how spending has shifted over time, with emergency
          programs increasingly dominating the landscape. The state and program breakdowns reveal where money concentrates.
        </p>
        <p>
          Drill into any state on the <a href="/states" className="text-primary hover:underline">States page</a>, or explore
          individual <a href="/programs" className="text-primary hover:underline">programs</a> for detailed breakdowns.
        </p>
      </section>
    </main>
  )
}
