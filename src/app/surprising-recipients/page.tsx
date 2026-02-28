import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { fmtMoney, slugify, titleCase } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'The 10 Most Surprising Farm Subsidy Recipients in America',
  description: 'State emergency agencies, DC trade groups, and sugar cooperatives collecting hundreds of millions — the recipients you\'d never expect to find in the USDA farm subsidy database.',
  alternates: { canonical: 'https://www.opensubsidies.org/surprising-recipients' },
}

const recipients = [
  {
    rank: 1,
    name: 'Florida Dept of Emergency Management',
    rawName: 'FLORIDA DEPT OF EMERGENCY MANAGEMENT',
    city: 'Tallahassee', state: 'FL',
    amount: 346598388,
    payments: 6,
    program: 'Wildfires & Hurricanes Indemnity Program',
    surprise: 'A state disaster agency — not a farmer — is the #1 farm subsidy recipient in America. $346.6M across just 6 payments, all hurricane/wildfire relief funneled through the state.',
    category: '🏛️ Government Agency',
  },
  {
    rank: 2,
    name: 'Cotton Council International',
    rawName: 'COTTON COUNCIL INTERNATIONAL',
    city: 'Washington', state: 'DC',
    amount: 69000000,
    payments: 66,
    program: 'Market Access Program',
    surprise: 'A DC-based trade lobbying group collecting $69M in taxpayer money to promote US cotton exports abroad. Not a single cotton plant grown.',
    category: '🏢 Trade Association',
  },
  {
    rank: 3,
    name: 'The Western Sugar Cooperative',
    rawName: 'THE WESTERN SUGAR COOPERATIVE',
    city: 'Denver', state: 'CO',
    amount: 69000000,
    payments: 1,
    program: 'WHIP — Sugar Beet Cooperatives',
    surprise: '$69M in a single payment to a sugar beet processing company. One check, one program, one cooperative.',
    category: '🏭 Processing Cooperative',
  },
  {
    rank: 4,
    name: 'Southern Minnesota Beet Sugar Cooperative',
    rawName: 'SOUTHERN MINNESOTA BEET SUGAR COOPERATIVE',
    city: 'Moorhead', state: 'MN',
    amount: 53000000,
    payments: 1,
    program: 'WHIP — Sugar Beet Cooperatives',
    surprise: 'Another sugar cooperative, another single massive payment. Two sugar companies together collected $122M from a single program.',
    category: '🏭 Processing Cooperative',
  },
  {
    rank: 5,
    name: 'Food Export Association of the Midwest USA',
    rawName: 'FOOD EXPORT ASSOCIATION OF THE MIDWEST USA',
    city: 'Chicago', state: 'IL',
    amount: 47000000,
    payments: 556,
    program: 'Market Access Program',
    surprise: 'A Chicago-based nonprofit promoting food exports. $47M over 556 payments — averaging $85K per payment to market American food overseas.',
    category: '🏢 Trade Association',
  },
  {
    rank: 6,
    name: 'Minn-Dak Farmers Cooperative',
    rawName: 'MINN-DAK FARMERS COOPERATIVE',
    city: 'Wahpeton', state: 'ND',
    amount: 46000000,
    payments: 1,
    program: 'WHIP — Sugar Beet Cooperatives',
    surprise: 'The third sugar beet cooperative on this list. Together, three sugar companies collected $168M from hurricane relief — more than most states\' entire farm subsidy totals.',
    category: '🏭 Processing Cooperative',
  },
  {
    rank: 7,
    name: 'Agrifund LLC',
    rawName: 'AGRIFUND LLC',
    city: 'Multiple', state: 'TX/LA',
    amount: 87000000,
    payments: 9113,
    program: 'Price Loss Coverage / MFP',
    surprise: 'A single LLC entity appearing in multiple states — Texas and Louisiana — collecting $87M combined across 9,000+ payments. The scale suggests a major agricultural finance operation, not a family farm.',
    category: '💼 Agricultural LLC',
  },
  {
    rank: 8,
    name: 'US Grains Council',
    rawName: 'US GRAINS COUNCIL',
    city: 'Washington', state: 'DC',
    amount: 38000000,
    payments: 125,
    program: 'Market Access Program',
    surprise: 'Yet another DC trade group collecting millions to promote grain exports. The Market Access Program spent $38M here on marketing, not farming.',
    category: '🏢 Trade Association',
  },
  {
    rank: 9,
    name: 'State of Alaska',
    rawName: 'STATE OF ALASKA',
    city: 'Juneau', state: 'AK',
    amount: 20000000,
    payments: 64,
    program: 'Market Access Program',
    surprise: 'Alaska — not exactly known for its farmland — collecting $20M in farm subsidies to promote seafood exports through the Market Access Program.',
    category: '🏛️ Government Agency',
  },
  {
    rank: 10,
    name: 'R&G Fish, LLC',
    rawName: 'R&G FISH, LLC',
    city: 'Brownsville', state: 'TX',
    amount: 12000000,
    payments: 2,
    program: 'Emergency Assist Livestock Bees Fish (ELAP)',
    surprise: 'A fish company collecting $12M in farm subsidies across just 2 payments. The program name says it all: "Emergency Assist Livestock Bees Fish."',
    category: '🐟 Aquaculture',
  },
]

export default function SurprisingRecipientsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Surprising Recipients' }]} />

      <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
        The 10 Most Surprising Farm Subsidy Recipients
      </h1>
      <p className="text-gray-600 mb-2">
        State disaster agencies, DC trade groups, sugar cooperatives, and a fish company — the recipients you&apos;d never expect to find in the USDA farm subsidy database.
      </p>
      <p className="text-sm text-gray-500 mb-6">February 2026 · Data from USDA Farm Service Agency, 2017–2025</p>
      <ShareButtons title="The 10 Most Surprising Farm Subsidy Recipients" />

      <div className="mt-8 space-y-6">
        {recipients.map((r) => (
          <div key={r.rank} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 p-6">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 text-primary rounded-xl flex items-center justify-center text-xl font-bold">
                {r.rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h2 className="text-lg font-bold text-gray-900">{r.name}</h2>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{r.category}</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  {r.city}, {r.state} · {r.program}
                </p>
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="text-2xl font-bold text-primary">{fmtMoney(r.amount)}</span>
                  <span className="text-sm text-gray-500">{r.payments.toLocaleString()} payment{r.payments !== 1 ? 's' : ''}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{r.surprise}</p>
                {r.state !== 'TX/LA' && (
                  <Link
                    href={`/recipients/${slugify(`${r.rawName}-${r.city}-${r.state}`)}`}
                    className="inline-block mt-3 text-sm text-primary font-medium hover:underline"
                  >
                    View full profile →
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Takeaways */}
      <section className="mt-12 bg-amber-50 rounded-2xl p-8 border border-amber-200">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">What This Tells Us</h2>
        <div className="space-y-3 text-sm text-gray-700">
          <p><strong>Farm subsidies aren&apos;t just for farmers.</strong> Government agencies, trade associations, processing cooperatives, and LLCs collectively receive billions. The system serves a much wider network than the &ldquo;family farmer&rdquo; narrative suggests.</p>
          <p><strong>The Market Access Program is a marketing budget.</strong> At least 4 of our top 10 surprising recipients collect from MAP — a program that uses taxpayer money to promote agricultural exports. These payments go to DC trade groups for marketing campaigns, not to farmers for growing food.</p>
          <p><strong>Sugar gets special treatment.</strong> Three sugar beet cooperatives collected $168M combined, most of it in single massive payments through the WHIP program. The sugar industry&apos;s political influence is well-documented — and the subsidy data confirms it.</p>
          <p><strong>Single-payment windfalls distort the data.</strong> Several recipients received tens of millions in a single payment. When one check can equal what thousands of small farmers receive collectively, the &ldquo;average subsidy&rdquo; becomes meaningless.</p>
        </div>
      </section>

      {/* Explore More */}
      <section className="mt-8 bg-green-50 border-l-4 border-primary p-6 rounded-r-lg">
        <h3 className="font-semibold text-gray-900 mb-3">Explore More</h3>
        <ul className="space-y-2 text-sm">
          <li>→ <Link href="/analysis/emergency-management" className="text-primary hover:underline">Why FL Emergency Management Is #1</Link> — Full investigation</li>
          <li>→ <Link href="/entity-types" className="text-primary hover:underline">Who Gets Farm Subsidies by Entity Type</Link></li>
          <li>→ <Link href="/analysis/corporate-farms" className="text-primary hover:underline">When Corporations Collect</Link></li>
          <li>→ <Link href="/analysis/subsidy-concentration" className="text-primary hover:underline">The 10% Problem</Link> — How subsidies concentrate at the top</li>
          <li>→ <Link href="/recipients" className="text-primary hover:underline">Browse All 5,000 Top Recipients</Link></li>
        </ul>
      </section>

      <p className="text-xs text-gray-400 mt-8">
        All data from USDA Farm Service Agency payment files, 2017–2025. Amounts are combined across all program years. Some recipients appear in multiple states.{' '}
        <Link href="/methodology" className="text-primary hover:underline">See methodology</Link>.
      </p>
    </div>
  )
}
