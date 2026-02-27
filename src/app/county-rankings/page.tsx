import { loadData } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import CountyRankingsClient from '@/components/CountyRankingsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'County Rankings — Farm Subsidies by County',
  description: 'Rank U.S. counties by total farm subsidies, number of payments, and average payment size. See which counties receive the most USDA subsidies.',
  alternates: { canonical: 'https://www.opensubsidies.us/county-rankings' },
}

export default function CountyRankingsPage() {
  const counties = loadData('county-index.json') as { state: string; stateName: string; county: string; fips: string; payments: number; amount: number }[]

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'County Rankings' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">County Rankings</h1>
      <p className="text-gray-600 mb-8">Compare counties by total subsidies, payment counts, and average payment size.</p>
      <CountyRankingsClient counties={counties} />
    </div>
  )
}
