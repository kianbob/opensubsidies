import { Metadata } from 'next'
import { Suspense } from 'react'
import { loadData } from '@/lib/server-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import SearchClient from '@/components/SearchClient'

export const metadata: Metadata = {
  title: 'Search Farm Subsidies',
  description: 'Search across states, counties, programs, and recipients in US farm subsidy data.',
  alternates: { canonical: 'https://www.opensubsidies.org/search' },
}

export default function SearchPage() {
  const states = loadData('states.json') as { abbr: string; name: string; amount: number }[]
  const counties = loadData('counties.json') as { state: string; stateName: string; county: string; amount: number }[]
  const programs = loadData('programs.json') as { program: string; code: string; amount: number }[]
  const recipients = loadData('top-recipients.json') as { name: string; state: string; city: string; amount: number }[]

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Search' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-6">Search</h1>
      <Suspense fallback={<p>Loading search...</p>}>
        <SearchClient states={states} counties={counties} programs={programs} recipients={recipients} />
      </Suspense>
    </main>
  )
}
