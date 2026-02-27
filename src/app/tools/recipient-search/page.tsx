import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import RecipientSearchClient from './RecipientSearchClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Farm Subsidy Recipient Lookup — Search by Name',
  description: 'Look up farm subsidies by name. Search over 2,000 top USDA payment recipients to see total amounts, payment counts, programs, and locations.',
  alternates: { canonical: 'https://www.opensubsidies.us/tools/recipient-search' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I search for farm subsidy recipients?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our recipient search tool lets you look up any of the top 2,000 farm subsidy recipients by name, farm name, or city. All data comes from public USDA Farm Service Agency records covering 2017–2025.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I look up USDA payment recipients?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type a name into the search box above. Results show the recipient name, city, state, total payment amount, number of payments, and number of programs. Click any result to see their full detail page.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are farm subsidy recipients public?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Farm subsidy payment data is public information released by the USDA Farm Service Agency. Individual payment records are available through FOIA requests and published datasets. Our site aggregates 31.7 million payment records.',
      },
    },
  ],
}

export default function RecipientSearchPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Recipient Search' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">
        Farm Subsidy Recipient Lookup
      </h1>
      <p className="text-gray-600 mb-6">
        Look up farm subsidies by name. Search across the top 2,000 USDA payment recipients to find total amounts, payment counts, and program details.
      </p>
      <ShareButtons title="Farm Subsidy Recipient Lookup" />

      <RecipientSearchClient />

      <section className="mt-16 prose prose-gray max-w-none">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">
          How to Look Up Farm Subsidies by Name
        </h2>
        <p>
          This recipient search tool lets you look up any of the top 2,000 farm subsidy recipients in the
          United States. Simply type a name, farm name, or city into the search box above to find matching
          results. Each result shows the recipient&apos;s location, total subsidy amount received between
          2017 and 2025, the number of individual payments, and how many USDA programs they participated in.
        </p>
        <p>
          All data comes from the USDA Farm Service Agency and covers over 31.7 million individual payment
          records across 9 fiscal years. Click on any result to visit their full detail page with
          year-by-year breakdowns and program-level analysis.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">
          Why Farm Subsidy Recipient Data Matters
        </h2>
        <p>
          Farm subsidy payments are funded by U.S. taxpayers, and recipient-level transparency is essential
          for accountability. Journalists, researchers, and policymakers use recipient data to investigate
          payment concentration, identify potential fraud, and evaluate whether subsidies reach the farmers
          who need them most. This tool makes that data accessible to everyone.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-gray-900">
          Frequently Asked Questions
        </h3>
        <p><strong>Can I search for farm subsidy recipients?</strong><br />
          Yes — type any name, farm name, or city above. We index the top 2,000 recipients by total
          payment amount across all USDA programs from 2017–2025.
        </p>
        <p><strong>How do I look up USDA payment recipients?</strong><br />
          Enter a name into the search box. Results display the recipient name, city and state,
          total amount, payment count, and number of programs. Click a result to see their full profile.
        </p>
        <p><strong>Are farm subsidy recipients public?</strong><br />
          Yes. USDA Farm Service Agency payment data is public information. Individual payments are
          released through published datasets and FOIA requests. OpenSubsidies aggregates 31.7 million
          records to make this data easy to search and explore.
        </p>
      </section>
    </div>
  )
}
