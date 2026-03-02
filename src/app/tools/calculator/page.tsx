import Link from 'next/link'
import { loadData } from '@/lib/server-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import CalculatorClient from '@/components/CalculatorClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Subsidy Calculator — Put Farm Subsidies in Context',
  description: 'Enter any dollar amount and see how it compares to farm subsidies: recipient rankings, percentage of total spending, and real-world comparisons.',
  alternates: { canonical: 'https://www.opensubsidies.org/tools/calculator' },
}

export default function CalculatorPage() {
  const recipients = loadData('top-recipients.json') as { name: string; amount: number }[]
  const states = loadData('states.json') as { abbr: string; name: string; amount: number; payments: number }[]
  const stats = loadData('stats.json') as { totalAmount: number; totalPayments: number }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools/calculator' }, { label: 'Subsidy Calculator' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Subsidy Calculator</h1>
      <p className="text-gray-600 mb-8">Enter any dollar amount to see how it compares to U.S. farm subsidy payments, top recipients, and everyday incomes.</p>
      <CalculatorClient recipients={recipients} states={states} stats={stats} />

      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">You Might Also Like</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/tools/taxpayer-calculator" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Taxpayer Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">See your personal share of farm subsidies</p>
          </Link>
          <Link href="/tools/compare-programs" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Compare Programs</h3>
            <p className="text-sm text-gray-600 mt-1">Side-by-side program comparison</p>
          </Link>
          <Link href="/analysis/what-147b-buys" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">What $147B Buys</h3>
            <p className="text-sm text-gray-600 mt-1">Putting farm spending in perspective</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
