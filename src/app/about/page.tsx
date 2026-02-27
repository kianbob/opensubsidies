import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
export const metadata: Metadata = {
  title: 'About OpenSubsidies — Free Farm Subsidy Transparency Platform',
  description: 'OpenSubsidies makes $147B in USDA farm subsidy data accessible and searchable. Learn about our mission, data sources, and methodology.',
  alternates: { canonical: 'https://www.opensubsidies.org/about' },
}

export default function AboutPage() {
  const stats = loadData('stats.json')

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'About' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Organization',
        name: 'OpenSubsidies', url: 'https://www.opensubsidies.org',
        description: 'Free, open platform for exploring U.S. farm subsidy data',
        parentOrganization: { '@type': 'Organization', name: 'TheDataProject.ai', url: 'https://thedataproject.ai' },
      })}} />

      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-6">About OpenSubsidies</h1>

      <div className="prose prose-green max-w-none">
        <p className="text-lg text-gray-600">
          OpenSubsidies is a free, open platform that makes U.S. farm subsidy data accessible to everyone.
          We process {fmtMoney(stats.totalAmount)} in USDA Farm Service Agency payment records so taxpayers,
          journalists, researchers, and policymakers can see exactly where agricultural subsidies go.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Our Mission</h2>
        <p>
          The federal government spends billions annually on farm subsidies, yet this data is buried in
          Excel spreadsheets on government websites. OpenSubsidies transforms these raw files into a
          searchable, visual platform — no data science skills required.
        </p>
        <p>
          We believe government spending data should be easy to find, easy to understand, and free for
          anyone to use. No paywalls. No registration. No ads.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What We Cover</h2>
        <ul>
          <li><strong>{fmt(stats.totalPayments)} payment records</strong> from the USDA Farm Service Agency</li>
          <li><strong>{fmt(stats.totalPrograms)} programs</strong> including crop subsidies, conservation, disaster relief, and loans</li>
          <li><strong>{fmt(stats.totalStates)} states and territories</strong> with county-level breakdowns</li>
          <li><strong>{fmt(stats.totalCounties)} counties</strong> with individual subsidy totals</li>
          <li><strong>Top 2,000 recipients</strong> with names, locations, and amounts</li>
          <li><strong>6+ analysis articles</strong> investigating concentration, geographic disparities, and policy questions</li>
          <li><strong><Link href="/entity-types" className="text-primary">Entity type analysis</Link></strong> — how subsidies flow to individuals, corporations, and partnerships</li>
          <li><strong><Link href="/tools/taxpayer-calculator" className="text-primary">Taxpayer cost calculator</Link></strong> — see how much farm subsidies cost you personally ($109/year average)</li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)]">Data Sources</h2>
        <p>
          All data comes from the <strong>USDA Farm Service Agency (FSA)</strong>, which publishes payment files
          through its{' '}
          <a href="https://www.fsa.usda.gov/tools/informational/freedom-information-act-foia/electronic-reading-room/frequently-requested/payment-files" target="_blank" rel="noopener noreferrer" className="text-primary">
            Electronic Reading Room
          </a>. These are official government records released under the Freedom of Information Act.
          Our current dataset covers 2017–2025 (83 Excel files, 2.6GB of raw data).
        </p>
        <p>
          For full details on how we process this data, see our <Link href="/methodology" className="text-primary">Methodology page</Link>.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Part of TheDataProject.ai</h2>
        <p>
          OpenSubsidies is one of 9 free data platforms built by{' '}
          <a href="https://thedataproject.ai" target="_blank" rel="noopener noreferrer" className="text-primary">TheDataProject.ai</a>.
          Our sister sites cover Medicaid spending, Medicare fraud detection, federal employee data,
          government spending, lobbying, immigration courts, and vaccine safety reporting.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Disclaimers</h2>
        <ul>
          <li>This site is not affiliated with the USDA or any government agency.</li>
          <li>Data may contain errors or omissions from the original source records.</li>
          <li>Some recipients may appear under slightly different names across payment files.</li>
          <li>Federal crop insurance (administered by RMA, not FSA) is not included in this dataset.</li>
          <li>All dollar amounts are nominal (not adjusted for inflation).</li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)]">Contact</h2>
        <p>
          For questions, corrections, or media inquiries:{' '}
          <a href="mailto:info@thedataproject.ai" className="text-primary">info@thedataproject.ai</a>
        </p>
        <p>
          Source code:{' '}
          <a href="https://github.com/kianbob/opensubsidies" target="_blank" rel="noopener noreferrer" className="text-primary">github.com/kianbob/opensubsidies</a>
        </p>
      </div>
    </main>
  )
}
