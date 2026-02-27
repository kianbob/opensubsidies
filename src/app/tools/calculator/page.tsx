import { loadData } from '@/lib/server-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import CalculatorClient from '@/components/CalculatorClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Subsidy Calculator — Put Farm Subsidies in Context',
  description: 'Enter any dollar amount and see how it compares to farm subsidies: recipient rankings, percentage of total spending, and real-world comparisons.',
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
    </div>
  )
}
