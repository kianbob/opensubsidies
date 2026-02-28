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
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'About' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Organization',
        name: 'OpenSubsidies', url: 'https://www.opensubsidies.org',
        description: 'Free, open platform for exploring U.S. farm subsidy data',
        parentOrganization: { '@type': 'Organization', name: 'TheDataProject.ai', url: 'https://thedataproject.ai' },
      })}} />

      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-4">About OpenSubsidies</h1>
        <p className="text-lg text-gray-600 mb-8">
          OpenSubsidies is a free, open platform that makes U.S. farm subsidy data accessible to everyone.
          We process {fmtMoney(stats.totalAmount)} in USDA Farm Service Agency payment records so taxpayers,
          journalists, researchers, and policymakers can see exactly where agricultural subsidies go.
        </p>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: fmt(stats.totalPayments), label: 'Payment Records' },
            { value: fmt(stats.totalPrograms), label: 'Programs' },
            { value: fmt(stats.totalStates), label: 'States & Territories' },
            { value: fmt(stats.totalCounties), label: 'Counties' },
          ].map((stat) => (
            <div key={stat.label} className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-700">{stat.value}</div>
              <div className="text-sm text-green-800 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mt-10 mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-3">
          The federal government spends billions annually on farm subsidies, yet this data is buried in
          Excel spreadsheets on government websites. OpenSubsidies transforms these raw files into a
          searchable, visual platform — no data science skills required.
        </p>
        <p className="text-gray-700">
          We believe government spending data should be easy to find, easy to understand, and free for
          anyone to use. No paywalls. No registration. No ads.
        </p>
      </section>

      {/* What We Cover — Feature Grid */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mt-10 mb-4">What We Cover</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: '📊', title: `${fmt(stats.totalPayments)} Payment Records`, desc: 'From the USDA Farm Service Agency covering 2017–2025' },
            { icon: '🌾', title: `${fmt(stats.totalPrograms)} Programs`, desc: 'Crop subsidies, conservation, disaster relief, and loans' },
            { icon: '🗺️', title: `${fmt(stats.totalStates)} States & Territories`, desc: 'With detailed county-level breakdowns' },
            { icon: '🏘️', title: `${fmt(stats.totalCounties)} Counties`, desc: 'Individual subsidy totals for every county' },
            { icon: '👤', title: 'Top 5,000 Recipients', desc: 'Names, locations, and payment amounts' },
            { icon: '📝', title: '22+ Analysis Articles', desc: 'Investigating concentration, geographic disparities, and policy questions' },
            { icon: '🏢', title: 'Entity Type Analysis', desc: 'How subsidies flow to individuals, corporations, and partnerships', href: '/entity-types' },
            { icon: '🧮', title: 'Taxpayer Cost Calculator', desc: 'See how much farm subsidies cost you personally ($109/year average)', href: '/tools/taxpayer-calculator' },
          ].map((card) => {
            const content = (
              <div key={card.title} className={`border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow ${card.href ? 'hover:border-green-300' : ''}`}>
                <div className="text-2xl mb-2">{card.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.desc}</p>
              </div>
            )
            return card.href ? <Link key={card.title} href={card.href} className="no-underline">{content}</Link> : <div key={card.title}>{content}</div>
          })}
        </div>
      </section>

      {/* Data Sources */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mt-10 mb-4">Data Sources</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <p className="text-gray-700 mb-3">
            All data comes from the <strong>USDA Farm Service Agency (FSA)</strong>, which publishes payment files
            through its{' '}
            <a href="https://www.fsa.usda.gov/tools/informational/freedom-information-act-foia/electronic-reading-room/frequently-requested/payment-files" target="_blank" rel="noopener noreferrer" className="text-[#15803d] underline">
              Electronic Reading Room
            </a>. These are official government records released under the Freedom of Information Act.
          </p>
          <p className="text-gray-700 mb-3">
            Our current dataset covers <strong>2017–2025</strong> (83 Excel files, 2.6GB of raw data).
          </p>
          <p className="text-gray-700">
            For full details on how we process this data, see our{' '}
            <Link href="/methodology" className="text-[#15803d] underline">Methodology page</Link>.
          </p>
        </div>
      </section>

      {/* Part of TheDataProject.ai */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mt-10 mb-4">Part of TheDataProject.ai</h2>
        <p className="text-gray-700 mb-4">
          OpenSubsidies is one of 9 free data platforms built by{' '}
          <a href="https://thedataproject.ai" target="_blank" rel="noopener noreferrer" className="text-[#15803d] underline font-semibold">TheDataProject.ai</a>.
          Our sister sites cover:
        </p>
        <div className="flex flex-wrap gap-2">
          {['Medicaid Spending', 'Medicare Fraud Detection', 'Federal Employee Data', 'Government Spending', 'Lobbying', 'Immigration Courts', 'Vaccine Safety Reporting', 'Farm Subsidies'].map((site) => (
            <span key={site} className="bg-green-50 text-green-800 text-sm px-3 py-1 rounded-full border border-green-200">{site}</span>
          ))}
        </div>
      </section>

      {/* Disclaimers */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mt-10 mb-4">Disclaimers</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-sm text-gray-600 space-y-2">
          <p>• This site is not affiliated with the USDA or any government agency.</p>
          <p>• Data may contain errors or omissions from the original source records.</p>
          <p>• Some recipients may appear under slightly different names across payment files.</p>
          <p>• Federal crop insurance (administered by RMA, not FSA) is not included in this dataset.</p>
          <p>• All dollar amounts are nominal (not adjusted for inflation).</p>
        </div>
      </section>

      {/* Contact */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mt-10 mb-4">Contact</h2>
        <p className="text-gray-700 mb-2">
          For questions, corrections, or media inquiries:{' '}
          <a href="mailto:info@thedataproject.ai" className="text-[#15803d] underline">info@thedataproject.ai</a>
        </p>
        <p className="text-gray-700">
          Source code:{' '}
          <a href="https://github.com/kianbob/opensubsidies" target="_blank" rel="noopener noreferrer" className="text-[#15803d] underline">github.com/kianbob/opensubsidies</a>
        </p>
      </section>
    </main>
  )
}
