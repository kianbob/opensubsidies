import { Metadata } from 'next'
import { loadData, fmt, fmtMoney } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import CountiesClient from '@/components/CountiesClient'

export const metadata: Metadata = {
  title: 'Farm Subsidies by County | OpenSubsidies',
  description: 'Search and explore farm subsidy payments by county across the United States.',
  alternates: { canonical: 'https://www.opensubsidies.us/counties' },
}

export default function CountiesPage() {
  const counties = loadData('counties.json') as { state: string; stateName: string; county: string; fips: string; payments: number; amount: number }[]
  const sorted = [...counties].sort((a, b) => b.amount - a.amount)

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Counties' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Farm Subsidies by County</h1>
      <p className="text-gray-600 mb-8">Top counties ranked by total farm subsidy payments.</p>
      <CountiesClient counties={sorted} />
    </main>
  )
}
