import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Farm Subsidy Glossary — Key Terms Explained',
  description: 'Definitions of key farm subsidy terms: CRP, ARC, PLC, commodity payments, conservation programs, and more.',
  alternates: { canonical: 'https://www.opensubsidies.us/glossary' },
}

const terms = [
  { term: 'ARC (Agriculture Risk Coverage)', def: 'A commodity program that provides payments when actual county crop revenue falls below a guaranteed level. Farmers choose between ARC-County and ARC-Individual coverage.' },
  { term: 'CCC (Commodity Credit Corporation)', def: 'A government-owned corporation within USDA that finances most federal farm subsidy programs. Nearly all FSA payments flow through the CCC.' },
  { term: 'Commodity Payments', def: 'Direct subsidies tied to the production of specific crops like corn, soybeans, wheat, rice, and cotton. The major commodity programs are ARC and PLC.' },
  { term: 'Conservation Reserve Program (CRP)', def: 'Pays farmers annual rental payments to take environmentally sensitive cropland out of production for 10-15 years. The largest conservation program at $5.36 billion.' },
  { term: 'Crop Insurance', def: 'Federal subsidies that reduce the cost of crop insurance premiums. Administered by USDA\'s Risk Management Agency (RMA), NOT the FSA. Not included in our dataset.' },
  { term: 'Direct Payments', def: 'Fixed per-acre payments to farmers regardless of market prices. Eliminated by the 2014 Farm Bill but were historically one of the largest subsidy categories.' },
  { term: 'ECAP (Emergency Commodity Assistance Program)', def: 'Emergency payments to agricultural producers affected by market disruptions or supply chain issues. The single largest program in our dataset at $9.36 billion.' },
  { term: 'ELAP (Emergency Livestock Assistance Program)', def: 'Provides payments to livestock producers for losses due to disease, adverse weather, or feed shortages not covered by other programs.' },
  { term: 'Farm Bill', def: 'Comprehensive legislation reauthorized roughly every 5 years that sets farm subsidy policy. The current 2018 Farm Bill governs most programs in our dataset.' },
  { term: 'Farm Service Agency (FSA)', def: 'The USDA agency that administers farm commodity, credit, conservation, disaster, and loan programs. The source of all data on OpenSubsidies.' },
  { term: 'LDP (Loan Deficiency Payment)', def: 'Payment to a farmer who is eligible for a marketing assistance loan but agrees to forgo the loan. Paid when market prices fall below the loan rate.' },
  { term: 'LFP (Livestock Forage Program)', def: 'Provides payments to livestock producers in counties affected by drought. Triggered automatically based on U.S. Drought Monitor data.' },
  { term: 'Marketing Assistance Loans', def: 'Low-interest loans that allow farmers to use harvested crops as collateral. If market prices fall, farmers can repay at the lower price, effectively receiving a subsidy.' },
  { term: 'Payment Limitations', def: 'Federal caps on subsidy payments: $125,000 per person per year for most commodity programs. Often circumvented through entity structures and family attribution rules.' },
  { term: 'PLC (Price Loss Coverage)', def: 'A commodity program that provides payments when the national average market price falls below a reference price set by Congress. Alternative to ARC.' },
  { term: 'Program Year', def: 'The crop year or fiscal year to which a payment is attributed, which may differ from when the payment was actually disbursed.' },
  { term: 'Supplemental Disaster Relief', def: 'Ad hoc disaster payments authorized by Congress outside the regular farm bill framework. Has grown dramatically in recent years.' },
]

export default function GlossaryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Glossary' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'DefinedTermSet',
        name: 'Farm Subsidy Glossary',
        description: 'Key terms used in U.S. farm subsidy programs',
        hasDefinedTerm: terms.map(t => ({
          '@type': 'DefinedTerm', name: t.term, description: t.def,
        })),
      })}} />

      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Farm Subsidy Glossary</h1>
      <p className="text-gray-600 mb-8">{terms.length} key terms and acronyms used in U.S. farm subsidy programs, explained in plain language.</p>

      <div className="space-y-6">
        {terms.map(t => (
          <div key={t.term} id={t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="scroll-mt-20">
            <h2 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-heading)]">{t.term}</h2>
            <p className="text-gray-600 mt-1">{t.def}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">Explore More</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { href: '/program-decoder', title: 'Program Decoder', desc: 'Look up any USDA program code and see what it means.' },
            { href: '/farm-bill', title: 'The Farm Bill', desc: 'How the Farm Bill shapes subsidy programs and spending.' },
            { href: '/farm-subsidies-explained', title: 'Farm Subsidies Explained', desc: 'A beginner\'s guide to how U.S. farm subsidies work.' },
            { href: '/faq', title: 'FAQ', desc: 'Frequently asked questions about farm subsidy data.' },
          ].map(l => (
            <Link key={l.href} href={l.href} className="p-3 rounded-lg hover:bg-gray-50 border border-gray-100">
              <div className="font-semibold text-primary text-sm">{l.title}</div>
              <div className="text-xs text-gray-500">{l.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
