import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Frequently asked questions about US farm subsidies, USDA programs, and how OpenSubsidies works.',
  alternates: { canonical: 'https://www.opensubsidies.us/faq' },
}

const faqs = [
  { q: 'What are farm subsidies?', a: 'Farm subsidies are government financial assistance payments made to farmers and agricultural businesses. In the US, these are primarily administered by the USDA Farm Service Agency (FSA) and include direct payments, crop insurance subsidies, conservation payments, and disaster assistance.' },
  { q: 'Where does this data come from?', a: 'All data comes from the USDA Farm Service Agency (FSA) public payment records, released under the Freedom of Information Act. These records document payments made through various farm programs.' },
  { q: 'How often is the data updated?', a: 'We update our data periodically as new USDA FSA records become available. The current dataset covers payments from 2000 through 2025.' },
  { q: 'Why do some states receive more subsidies than others?', a: 'Subsidy amounts correlate with agricultural production. States like Texas, Iowa, and Illinois have large farming operations and are more likely to receive disaster payments, commodity payments, and conservation funds.' },
  { q: 'What is the Emergency Commodity Assistance Program?', a: 'The Emergency Commodity Assistance Program provides financial assistance to agricultural producers who have suffered losses due to natural disasters, market disruptions, or other qualifying emergencies.' },
  { q: 'Are subsidy recipients individuals or businesses?', a: 'Both. Recipients include individual farmers, farming partnerships, corporations, cooperatives, and other agricultural entities. Some large agribusiness operations receive substantial payments.' },
  { q: 'Do all farmers receive subsidies?', a: 'No. Many farmers do not participate in subsidy programs, and eligibility depends on the crop grown, farm size, income, and other factors. Specialty crop farmers historically received fewer subsidies than commodity crop producers.' },
  { q: 'How are payment amounts calculated?', a: 'Payment calculations vary by program. Some are based on historical production, others on current market prices, acreage, or documented losses. Each program has its own formula and eligibility criteria.' },
  { q: 'Can I search for a specific recipient?', a: 'Yes! Use our search page to find specific recipients, states, counties, or programs. You can also browse the top recipients page for the largest payment recipients.' },
  { q: 'Is this data adjusted for inflation?', a: 'No, all dollar amounts shown are nominal values — the actual amounts paid in each year. This means older payments may appear smaller relative to recent ones due to inflation.' },
]

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: 'FAQ' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-8">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((f, i) => (
          <details key={i} className="group border border-gray-200 rounded-lg">
            <summary className="cursor-pointer px-4 py-3 font-medium text-green-800 hover:bg-green-50 rounded-lg">{f.q}</summary>
            <p className="px-4 pb-4 text-gray-700">{f.a}</p>
          </details>
        ))}
      </div>
    </main>
  )
}
