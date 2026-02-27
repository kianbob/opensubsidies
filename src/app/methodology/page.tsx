import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Methodology — How We Process Farm Subsidy Data',
  description: 'How OpenSubsidies processes USDA Farm Service Agency payment files into searchable, structured data.',
  alternates: { canonical: 'https://www.opensubsidies.org/methodology' },
}

export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Methodology' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-6">Methodology</h1>

      <div className="max-w-none space-y-6">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mt-8">Data Source</h2>
        <p>
          All data on OpenSubsidies comes from the <strong>USDA Farm Service Agency (FSA)</strong> payment files,
          publicly available through the{' '}
          <a href="https://www.fsa.usda.gov/tools/informational/freedom-information-act-foia/electronic-reading-room/frequently-requested/payment-files" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            FSA Electronic Reading Room
          </a>. These files are published as Excel (.xlsx) flat files containing individual payment records.
        </p>

        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mt-8">Data Processing Pipeline</h2>
        <ol>
          <li><strong>Download:</strong> We download all available Excel payment files from the FSA website. Our current dataset includes 83 files covering 2017–2025.</li>
          <li><strong>Parse:</strong> Each Excel file is parsed using the <code>xlsx</code> npm library. Each row represents a single payment with 16 fields including recipient name, address, state, county, amount, program code, and program year.</li>
          <li><strong>Clean:</strong> State abbreviations are mapped to full state names. County names are standardized. Program codes are matched to program descriptions.</li>
          <li><strong>Aggregate:</strong> Payments are aggregated by state, county, program, and recipient. Top recipients are identified by summing all payments to the same name within the same state.</li>
          <li><strong>Output:</strong> Structured JSON files are generated for the web application — one for each dimension (states, counties, programs, recipients, yearly trends).</li>
        </ol>

        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mt-8">Key Definitions</h2>
        <ul>
          <li><strong>Payment:</strong> A single disbursement from the USDA to a recipient for a specific program.</li>
          <li><strong>Recipient:</strong> The entity receiving the payment — may be an individual, partnership, corporation, LLC, trust, or estate.</li>
          <li><strong>Program:</strong> The USDA accounting program under which the payment was made (e.g., CRP Annual Rental, ARC-County, Emergency Commodity Assistance).</li>
          <li><strong>Program Year:</strong> The fiscal year attributed to the payment, which may differ from the disbursement date.</li>
        </ul>

        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mt-8">Limitations</h2>
        <ul>
          <li><strong>Recipient matching:</strong> Recipients are matched by name and state. The same entity may appear under slightly different names (e.g., &quot;SMITH FARMS LLC&quot; vs &quot;SMITH FARMS, LLC&quot;), which may lead to some undercounting of individual totals.</li>
          <li><strong>Historical coverage:</strong> Our current dataset covers 2017–2025. The FSA publishes data going back to 1995, and we plan to backfill historical data over time.</li>
          <li><strong>Negative payments:</strong> Some payments are negative (refunds, corrections, clawbacks). These are included in all totals.</li>
          <li><strong>Crop insurance:</strong> Federal crop insurance subsidies (administered by RMA, not FSA) are NOT included in this dataset. They represent a separate, large category of farm support.</li>
        </ul>

        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mt-8">Update Schedule</h2>
        <p>
          FSA publishes new payment files periodically as disbursements are made. We check for updates monthly
          and reprocess the entire dataset when new files are available.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6">
          <p className="font-semibold text-gray-900 mb-1">Questions?</p>
          <p className="text-sm text-gray-600">
            For questions about our methodology or data, contact us at{' '}
            <a href="mailto:info@thedataproject.ai" className="text-primary hover:underline">info@thedataproject.ai</a>.
            See also our <Link href="/faq" className="text-primary hover:underline">FAQ</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
