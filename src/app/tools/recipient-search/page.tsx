import { loadData } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import RecipientSearchClient from '@/components/RecipientSearchClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search Farm Subsidy Recipients — Find Any Name',
  description: 'Search over 10,000 top farm subsidy recipients by name, farm, or city. See payment amounts, programs, and state. Useful for journalists and researchers.',
  alternates: { canonical: 'https://www.opensubsidies.us/tools/recipient-search' },
}

export default function RecipientSearchPage() {
  const recipients = loadData('top-recipients.json')

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Recipient Search' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Search Subsidy Recipients</h1>
      <p className="text-gray-600 mb-8">
        Search by name, farm name, or city to find out who receives U.S. farm subsidies. Data covers 2017–2025 from USDA payment records.
      </p>
      <RecipientSearchClient recipients={recipients} />
    </div>
  )
}
