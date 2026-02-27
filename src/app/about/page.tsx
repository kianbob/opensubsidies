import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'About | OpenSubsidies',
  description: 'Learn about OpenSubsidies, our data sources, methodology, and mission to bring transparency to US farm subsidies.',
  alternates: { canonical: 'https://www.opensubsidies.us/about' },
}

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'About' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-6">About OpenSubsidies</h1>

      <div className="prose prose-green max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)]">Our Mission</h2>
          <p className="text-gray-700">OpenSubsidies brings transparency to US farm subsidy payments by making public USDA data accessible, searchable, and understandable. We believe taxpayers deserve easy access to information about how agricultural subsidies are distributed.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)]">Data Sources</h2>
          <p className="text-gray-700">All data comes from the <strong>USDA Farm Service Agency (FSA)</strong> payment records, which are public information released under the Freedom of Information Act. The FSA administers farm commodity, credit, conservation, disaster, and loan programs.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)]">Methodology</h2>
          <p className="text-gray-700">We aggregate individual payment records by state, county, program, and recipient. Payment amounts reflect the total disbursements recorded by the FSA. All dollar amounts are nominal (not adjusted for inflation). Data is updated periodically as new records become available.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)]">Disclaimers</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>This site is not affiliated with the USDA or any government agency.</li>
            <li>Data may contain errors or omissions from the original source records.</li>
            <li>Some recipients may appear multiple times under slightly different names.</li>
            <li>Payment amounts include both direct payments and indirect subsidies administered by FSA.</li>
            <li>Historical data availability varies by program and time period.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)]">Contact</h2>
          <p className="text-gray-700">Have questions or feedback? We&apos;d love to hear from you. Reach out via our GitHub repository or social media channels.</p>
        </section>
      </div>
    </main>
  )
}
