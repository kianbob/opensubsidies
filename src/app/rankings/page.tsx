import { loadData } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import RankingsClient from '@/components/RankingsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'State Rankings — Farm Subsidies by State',
  description: 'Rank all 50 states by total farm subsidies, per-capita spending, number of payments, and average payment size.',
}

export default function RankingsPage() {
  const states = loadData('states.json') as { abbr: string; name: string; payments: number; amount: number }[]

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Rankings' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">State Rankings</h1>
      <p className="text-gray-600 mb-8">Compare states by total subsidies, per-capita spending, payment counts, and average payment size.</p>
      <RankingsClient states={states} />
    </div>
  )
}
