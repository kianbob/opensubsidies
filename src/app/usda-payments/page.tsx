import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { loadData, fmt, fmtMoney } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'USDA Payments: Complete Database of Farm Service Agency Disbursements',
  description: 'Explore $147B+ in USDA Farm Service Agency payments. Search FSA disbursements by state, county, program, or recipient. Complete database from 2017-2025.',
  alternates: { canonical: 'https://www.opensubsidies.us/usda-payments' },
}

export default function UsdaPaymentsPage() {
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalStates: number; totalCounties: number; totalPrograms: number; dataYears: string }

  const faqItems = [
    { q: 'What are USDA payments?', a: 'USDA payments are disbursements from the U.S. Department of Agriculture\'s Farm Service Agency (FSA) to farmers, ranchers, landowners, and agricultural entities. These include commodity subsidies, conservation payments, disaster relief, and emergency programs.' },
    { q: 'Who receives USDA payments?', a: 'Recipients include individual farmers, family farms, corporations, LLCs, partnerships, tribal entities, and even government agencies. The top 10% of recipients collect nearly three-fourths of all payments.' },
    { q: 'How much does USDA pay in farm subsidies?', a: `Our database tracks ${fmtMoney(stats.totalAmount)} in USDA Farm Service Agency payments from ${stats.dataYears}, across ${stats.totalPrograms} programs and ${fmt(stats.totalStates)} states and territories.` },
    { q: 'Are USDA payment records public?', a: 'Yes. USDA farm subsidy payment data is public information. OpenSubsidies makes this data freely searchable with no paywalls or registration required.' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'USDA Payments' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqItems.map(f => ({
          '@type': 'Question', name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      })}} />

      <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
        USDA Payments: Complete Farm Service Agency Database
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        {fmtMoney(stats.totalAmount)} in Farm Service Agency disbursements across {fmt(stats.totalPrograms)} programs,
        {' '}{fmt(stats.totalStates)} states, and {fmt(stats.totalCounties)} counties ({stats.dataYears}).
      </p>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Payments', value: fmtMoney(stats.totalAmount) },
          { label: 'Individual Payments', value: fmt(stats.totalPayments) },
          { label: 'Programs', value: fmt(stats.totalPrograms) },
          { label: 'States & Territories', value: fmt(stats.totalStates) },
        ].map(s => (
          <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{s.value}</div>
            <div className="text-sm text-gray-600">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="prose max-w-none">
        <h2 className="font-[family-name:var(--font-heading)]">What Are USDA Farm Payments?</h2>
        <p>
          The United States Department of Agriculture (USDA) distributes billions of dollars annually through its Farm Service Agency (FSA).
          These payments serve multiple purposes: stabilizing farm income during price drops, compensating for natural disasters,
          incentivizing conservation practices, and supporting specific commodity production.
        </p>
        <p>
          Major payment categories include:
        </p>
        <ul>
          <li><strong>Commodity subsidies</strong> — Price and income support for crops like corn, wheat, soybeans, and cotton</li>
          <li><strong>Conservation programs</strong> — Payments for land retirement (CRP), soil health, and environmental practices</li>
          <li><strong>Disaster and emergency payments</strong> — Relief for drought, floods, trade disruptions, and pandemics</li>
          <li><strong>Crop insurance premium subsidies</strong> — Government pays ~60% of crop insurance premiums</li>
          <li><strong>Loan programs</strong> — Marketing loans and loan deficiency payments</li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)]">Explore USDA Payments</h2>
        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          {[
            { label: 'By State', href: '/states', desc: 'See total USDA payments for each state and territory', icon: '🗺️' },
            { label: 'By County', href: '/counties', desc: 'County-level payment data for all 28,000+ counties', icon: '📍' },
            { label: 'By Program', href: '/programs', desc: `Browse all ${stats.totalPrograms} USDA payment programs`, icon: '📋' },
            { label: 'By Recipient', href: '/recipients', desc: 'Top recipients of USDA farm payments', icon: '👤' },
            { label: 'By Category', href: '/categories', desc: 'Payments grouped by conservation, commodity, disaster, etc.', icon: '📊' },
            { label: 'By Year', href: '/trends', desc: 'Annual spending trends from 2017 to 2025', icon: '📈' },
            { label: 'By Entity Type', href: '/entity-types', desc: 'Individuals, corporations, LLCs, and government entities', icon: '🏢' },
            { label: 'Search', href: '/search', desc: 'Search the full database by name or keyword', icon: '🔍' },
          ].map(item => (
            <Link key={item.href} href={item.href} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="font-semibold text-gray-900">{item.label}</div>
                <div className="text-sm text-gray-500">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">How to Use This Database</h2>
        <p>OpenSubsidies provides free, open access to USDA payment data with no registration required. You can:</p>
        <ol>
          <li><strong>Search</strong> for any recipient, program, or location using our <Link href="/search">search tool</Link></li>
          <li><strong>Browse</strong> by state, county, or program to see payment distributions</li>
          <li><strong>Compare</strong> states side-by-side with our <Link href="/compare">comparison tool</Link></li>
          <li><strong>Analyze</strong> patterns through our <Link href="/analysis">deep-dive analysis articles</Link></li>
          <li><strong>Download</strong> data for your own research from our <Link href="/downloads">downloads page</Link></li>
        </ol>

        <h2 className="font-[family-name:var(--font-heading)]">Key Findings from USDA Payment Data</h2>
        <ul>
          <li>The <Link href="/analysis/subsidy-concentration">top 10% of recipients collect ~75% of all payments</Link></li>
          <li><Link href="/analysis/zombie-programs">43+ programs have fewer than 100 payments each</Link></li>
          <li>Emergency spending has <Link href="/analysis/decade-of-disaster">grown to dominate the budget</Link></li>
          <li><Link href="/analysis/double-dippers">620,000+ recipients collect from 3+ programs</Link></li>
          <li>The <Link href="/analysis/average-farmer">average payment is ~$4,600</Link> but the median is far lower</li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)]">Data Source & Methodology</h2>
        <p>
          All data comes from USDA Farm Service Agency payment files, covering {stats.dataYears}.
          For details on how we process and present this data, see our <Link href="/methodology">methodology page</Link>.
          Raw data is available on our <Link href="/downloads">downloads page</Link>.
        </p>
      </div>

      {/* FAQ */}
      <div className="border-t border-gray-200 pt-10 mt-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqItems.map(f => (
            <div key={f.q}>
              <h3 className="font-semibold text-gray-900 mb-1">{f.q}</h3>
              <p className="text-gray-600 text-sm">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
