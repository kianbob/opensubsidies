import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { loadData, fmt, fmtMoney } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Farm Subsidy Lookup: Search Recipients by Name, State, or County',
  description: 'Look up farm subsidies by recipient name, state, county, or program. Search our database of $147B+ in USDA farm payments across 157 programs.',
  alternates: { canonical: 'https://www.opensubsidies.us/farm-subsidy-lookup' },
}

export default function FarmSubsidyLookupPage() {
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalStates: number; totalCounties: number; totalPrograms: number; dataYears: string }

  const faqItems = [
    { q: 'How do I look up farm subsidies?', a: 'Use our search tool to find farm subsidy payments by recipient name, state, county, or program. All data comes from USDA Farm Service Agency payment records and is fully searchable.' },
    { q: 'Are farm subsidy records public?', a: 'Yes. USDA farm subsidy payment data is public information available through the Farm Service Agency. OpenSubsidies makes this data searchable and easy to explore.' },
    { q: 'Can I search farm subsidies by name?', a: 'Yes. You can search for any individual, farm, LLC, corporation, or government entity that has received USDA farm subsidy payments. Visit our Recipients page or use the search tool.' },
    { q: 'Can I search farm subsidies by ZIP code?', a: 'We don\'t currently support ZIP code search, but you can search by county, which provides similar geographic precision. Our Counties page lists all 28,000+ counties with farm subsidy data.' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Farm Subsidy Lookup' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqItems.map(f => ({
          '@type': 'Question', name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      })}} />

      <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
        Farm Subsidy Lookup
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Search {fmtMoney(stats.totalAmount)} in USDA farm subsidy payments across {fmt(stats.totalPrograms)} programs and {fmt(stats.totalStates)} states ({stats.dataYears}).
      </p>

      {/* Search Box */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-3">Search Farm Subsidies</h2>
        <p className="text-gray-600 text-sm mb-4">Search by recipient name, state, county, or program name.</p>
        <Link href="/search" className="inline-flex items-center gap-2 bg-[#15803d] text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
          Go to Search Tool
        </Link>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: 'By State', href: '/states', icon: '🗺️', desc: `${stats.totalStates} states & territories` },
          { label: 'By County', href: '/counties', icon: '📍', desc: `${fmt(stats.totalCounties)} counties` },
          { label: 'By Recipient', href: '/recipients', icon: '👤', desc: 'Top recipients ranked' },
          { label: 'By Program', href: '/programs', icon: '📋', desc: `${stats.totalPrograms} programs` },
        ].map(link => (
          <Link key={link.href} href={link.href} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center">
            <div className="text-2xl mb-2">{link.icon}</div>
            <div className="font-semibold text-gray-900">{link.label}</div>
            <div className="text-xs text-gray-500 mt-1">{link.desc}</div>
          </Link>
        ))}
      </div>

      {/* Step-by-step guide */}
      <div className="prose max-w-none mb-12">
        <h2 className="font-[family-name:var(--font-heading)]">How to Look Up Farm Subsidies</h2>
        <p>OpenSubsidies provides free, open access to USDA Farm Service Agency payment data. Here&apos;s how to find the information you need:</p>

        <div className="not-prose space-y-4 my-6">
          {[
            { step: '1', title: 'Choose Your Search Method', desc: 'Search by recipient name if you know who you\'re looking for, or browse by state, county, or program to explore payments in a specific area.' },
            { step: '2', title: 'Use the Search Tool', desc: 'Our search page lets you type any name, program, or location. Results show payment amounts, programs, and years.' },
            { step: '3', title: 'Explore Results', desc: 'Click on any recipient to see their full payment history across all programs and years. Click on any state or county for a geographic breakdown.' },
            { step: '4', title: 'Compare and Analyze', desc: 'Use our Compare tool to compare states side-by-side, or explore our Analysis section for deep dives into spending patterns.' },
          ].map(s => (
            <div key={s.step} className="flex gap-4 items-start bg-gray-50 rounded-lg p-4">
              <div className="w-8 h-8 rounded-full bg-[#15803d] text-white flex items-center justify-center font-bold shrink-0">{s.step}</div>
              <div>
                <div className="font-semibold text-gray-900">{s.title}</div>
                <div className="text-sm text-gray-600">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">What Data Is Available?</h2>
        <p>Our database includes {fmtMoney(stats.totalAmount)} in payments from {stats.dataYears}, covering:</p>
        <ul>
          <li><strong>{fmt(stats.totalPayments)} individual payments</strong> from the USDA Farm Service Agency</li>
          <li><strong>{stats.totalPrograms} programs</strong> including commodity subsidies, conservation, disaster relief, and more</li>
          <li><strong>{fmt(stats.totalStates)} states and territories</strong> with county-level detail</li>
          <li><strong>Individual and corporate recipients</strong> including farms, LLCs, partnerships, and government entities</li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)]">Additional Tools</h2>
        <ul>
          <li><Link href="/tools/calculator">Subsidy Calculator</Link> — Estimate subsidies for your area</li>
          <li><Link href="/tools/compare-programs">Compare Programs</Link> — Side-by-side program analysis</li>
          <li><Link href="/program-decoder">Program Decoder</Link> — Understand what each USDA program does</li>
          <li><Link href="/subsidy-map">Subsidy Map</Link> — Visual map of payments by state</li>
          <li><Link href="/analysis">Analysis</Link> — Deep dives into spending patterns</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="border-t border-gray-200 pt-10">
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
