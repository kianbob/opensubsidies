import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import RelatedArticles from '@/components/RelatedArticles'
import ArticleSchema from '@/components/ArticleSchema'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conservation Reserve Program (CRP) — $15.7 Billion in Payments | OpenSubsidies',
  description: 'Deep dive into the Conservation Reserve Program: $15.7B in CRP payments, how it works, who participates, state-by-state breakdown, and yearly trends.',
  keywords: ['conservation reserve program', 'CRP program', 'CRP payments', 'CRP rental payments', 'USDA CRP', 'CRP land retirement'],
  alternates: { canonical: 'https://www.opensubsidies.org/conservation-reserve-program' },
}

const topCrpStates = [
  { state: 'Iowa', amount: 3150816542, abbr: 'ia' },
  { state: 'Illinois', amount: 1464467432, abbr: 'il' },
  { state: 'Minnesota', amount: 1171129397, abbr: 'mn' },
  { state: 'South Dakota', amount: 913961935, abbr: 'sd' },
  { state: 'Missouri', amount: 867097705, abbr: 'mo' },
  { state: 'Texas', amount: 847338608, abbr: 'tx' },
  { state: 'Nebraska', amount: 681569726, abbr: 'ne' },
  { state: 'Kansas', amount: 668542146, abbr: 'ks' },
  { state: 'Washington', amount: 569562646, abbr: 'wa' },
  { state: 'Colorado', amount: 535023132, abbr: 'co' },
  { state: 'North Dakota', amount: 533348264, abbr: 'nd' },
  { state: 'Ohio', amount: 409018797, abbr: 'oh' },
  { state: 'Indiana', amount: 366773209, abbr: 'in' },
  { state: 'Mississippi', amount: 335444422, abbr: 'ms' },
  { state: 'Wisconsin', amount: 314868937, abbr: 'wi' },
]

function fmtMoney(n: number): string {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(0) + 'M'
  return '$' + n.toFixed(0)
}

export default function ConservationReserveProgramPage() {
  const faqData = [
    {
      q: 'What is the Conservation Reserve Program (CRP)?',
      a: 'CRP is a voluntary USDA program that pays farmers annual rental payments to remove environmentally sensitive farmland from production and plant species that improve environmental health and quality for 10-15 years.'
    },
    {
      q: 'How much does CRP pay per acre?',
      a: 'CRP rental rates are based on local soil rental rates and can range from under $50 to over $300 per acre annually, depending on the county and land quality. The national average is approximately $80-90 per acre.'
    },
    {
      q: 'How much has CRP paid out in total?',
      a: 'From 2017 to 2025, CRP annual rental payments totaled approximately $15.7 billion across all 50 states. Iowa received the most at $3.15 billion.'
    },
    {
      q: 'Which states get the most CRP payments?',
      a: 'Iowa leads with $3.15B, followed by Illinois ($1.46B), Minnesota ($1.17B), South Dakota ($914M), and Missouri ($867M). The Great Plains and Midwest dominate CRP enrollment.'
    },
    {
      q: 'Can anyone enroll in CRP?',
      a: 'Landowners and operators with eligible cropland may enroll through general signups (periodic) or continuous signups (ongoing for high-priority practices). Land must have been cropped 4 of the previous 6 years.'
    },
    {
      q: 'What happens to CRP land?',
      a: 'Enrolled land is planted with grasses, trees, or other cover that reduces erosion, improves water quality, and provides wildlife habitat. Farmers cannot crop or hay the land during the contract period (with some emergency exceptions).'
    },
    {
      q: 'Is CRP under threat?',
      a: 'CRP enrollment has declined from a peak of 36.8 million acres to under 23 million acres. Budget pressures, rising crop prices, and competition for land have reduced participation. Read our analysis on CRP under threat.'
    },
    {
      q: 'How is CRP different from other conservation programs?',
      a: 'Unlike EQIP and CSP which pay farmers to implement practices on working land, CRP takes land completely out of production. It is a land retirement program focused on the most environmentally sensitive acres.'
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleSchema
        title="Conservation Reserve Program (CRP)"
        description="Deep dive into the Conservation Reserve Program: $15.7B in payments, how it works, and who benefits."
        slug="conservation-reserve-program"
      />
      <Breadcrumbs items={[{ label: 'Conservation Reserve Program' }]} />

      <h1 className="text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
        Conservation Reserve Program (CRP): $15.7 Billion in Payments
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        The CRP is America&apos;s largest voluntary conservation program, paying farmers to
        retire environmentally sensitive cropland. Here&apos;s everything you need to know.
      </p>

      <ShareButtons title="Conservation Reserve Program — $15.7B in CRP Payments" />

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-8">
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-700">$15.7B</p>
          <p className="text-sm text-green-800">Total CRP Payments</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-700">50</p>
          <p className="text-sm text-green-800">States with CRP</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-700">~23M</p>
          <p className="text-sm text-green-800">Acres Enrolled</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-700">10-15yr</p>
          <p className="text-sm text-green-800">Contract Length</p>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-[family-name:var(--font-heading)]">What Is the Conservation Reserve Program?</h2>
        <p>
          The <strong>Conservation Reserve Program (CRP)</strong> is a voluntary federal program
          administered by the USDA Farm Service Agency. It pays farmers and ranchers an annual
          rental payment to remove environmentally sensitive cropland from agricultural production
          and plant species that will improve environmental health and quality.
        </p>
        <p>
          Created by the Food Security Act of 1985, CRP has become one of the most important
          conservation tools in American agriculture. At its peak, the program enrolled over
          36.8 million acres — an area larger than the state of Iowa. Today, enrollment sits
          around 23 million acres, down significantly from historical highs.
        </p>
        <p>
          Between 2017 and 2025, the USDA paid approximately <strong>$15.7 billion</strong> in
          CRP annual rental payments alone, making it one of the single largest line items in
          the farm subsidy database.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">How CRP Works</h2>
        <p>
          CRP operates through a straightforward mechanism: farmers voluntarily agree to remove
          eligible cropland from production for 10 to 15 years. In exchange, the USDA pays
          annual rental payments based on the agricultural rental value of the land. The USDA
          also provides cost-share assistance (up to 50%) to establish approved conservation
          cover on the enrolled land.
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Enrollment Types</h3>
        <p>There are two main ways to enroll in CRP:</p>
        <ul>
          <li>
            <strong>General Signup:</strong> Periodic enrollment periods where farmers offer
            land competitively. The USDA ranks offers using an Environmental Benefits Index
            (EBI) that considers wildlife, water quality, erosion, and other factors.
          </li>
          <li>
            <strong>Continuous Signup:</strong> Ongoing enrollment for specific high-priority
            conservation practices like filter strips, riparian buffers, wetland restoration,
            and pollinator habitat. These do not compete in the EBI ranking.
          </li>
        </ul>

        <h3 className="font-[family-name:var(--font-heading)]">What Gets Planted</h3>
        <p>
          When cropland enters CRP, farmers must establish approved conservation cover. Common
          practices include:
        </p>
        <ul>
          <li>Native grass plantings for wildlife habitat</li>
          <li>Tree plantings for windbreaks and carbon sequestration</li>
          <li>Riparian buffers along streams and waterways</li>
          <li>Wetland restoration in former floodplains</li>
          <li>Pollinator habitat with wildflower mixes</li>
          <li>Filter strips to reduce agricultural runoff</li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)]">CRP Payments by State</h2>
        <p>
          CRP payments are heavily concentrated in the Great Plains and Midwest, where large
          amounts of environmentally sensitive cropland overlap with the program&apos;s eligibility
          criteria. Iowa alone has received over <strong>$3.15 billion</strong> in CRP payments
          since 2017.
        </p>

        <div className="not-prose my-8">
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Rank</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">State</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-700">CRP Payments (2017–2025)</th>
                </tr>
              </thead>
              <tbody>
                {topCrpStates.map((s, i) => (
                  <tr key={s.abbr} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-2">
                      <Link href={`/states/${s.abbr}`} className="text-green-700 hover:underline font-medium">
                        {s.state}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-right font-mono">{fmtMoney(s.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Why CRP Matters</h2>
        <p>
          The Conservation Reserve Program delivers significant environmental benefits that
          extend far beyond the enrolled acres:
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Erosion Prevention</h3>
        <p>
          CRP prevents an estimated 600 million tons of soil from eroding each year. The
          program specifically targets highly erodible land, which without conservation cover
          would lose topsoil at unsustainable rates. This protects long-term agricultural
          productivity and keeps sediment out of waterways.
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Water Quality</h3>
        <p>
          By establishing buffers along streams and retiring land near waterways, CRP
          significantly reduces nitrogen and phosphorus runoff. This is particularly important
          in the Mississippi River basin, where agricultural runoff contributes to the
          Gulf of Mexico &quot;dead zone.&quot;
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Wildlife Habitat</h3>
        <p>
          CRP provides critical habitat for hundreds of species. Studies have shown that CRP
          grasslands support pheasant and quail populations, provide nesting habitat for
          waterfowl and songbirds, and maintain pollinator populations. The program has been
          credited with stabilizing populations of grassland birds that were in steep decline.
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Carbon Sequestration</h3>
        <p>
          CRP lands sequester an estimated 12 million metric tons of CO₂ equivalent per year
          through soil carbon storage and tree growth. As climate policy becomes more important,
          CRP&apos;s role in carbon markets and climate mitigation may grow.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">CRP&apos;s Declining Enrollment</h2>
        <p>
          Despite its benefits, CRP enrollment has dropped significantly from its peak of
          36.8 million acres in 2007 to approximately 23 million acres today. Several factors
          drive this decline:
        </p>
        <ul>
          <li>
            <strong>Rising crop prices</strong> make farming more profitable than CRP rental
            payments, especially for corn and soybeans
          </li>
          <li>
            <strong>Statutory caps</strong> limit total enrolled acreage (currently 27 million
            acres maximum)
          </li>
          <li>
            <strong>Competition for land</strong> from biofuel mandates and export demand
          </li>
          <li>
            <strong>Contract expirations</strong> without sufficient re-enrollment incentives
          </li>
          <li>
            <strong>Budget pressures</strong> in farm bill negotiations
          </li>
        </ul>
        <p>
          Read our detailed analysis: <Link href="/analysis/crp-under-threat" className="text-green-700 underline">Is CRP Under Threat?</Link>
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">CRP vs. Other Conservation Programs</h2>
        <p>
          The USDA operates several conservation programs, each with a different approach:
        </p>
        <ul>
          <li>
            <strong>CRP (Conservation Reserve Program):</strong> Land retirement. Takes land
            out of production entirely. Pays annual rental payments.
          </li>
          <li>
            <strong>EQIP (Environmental Quality Incentives Program):</strong> Working lands.
            Provides cost-share for conservation practices on actively farmed land.
          </li>
          <li>
            <strong>CSP (Conservation Stewardship Program):</strong> Working lands. Rewards
            farmers for maintaining and improving existing conservation practices.
          </li>
          <li>
            <strong>ACEP (Agricultural Conservation Easement Program):</strong> Permanent
            easements for wetlands, grasslands, and farmland protection.
          </li>
        </ul>
        <p>
          For more context, see our analysis of <Link href="/analysis/conservation-vs-commodity" className="text-green-700 underline">conservation vs. commodity spending</Link>.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Future of CRP</h2>
        <p>
          The 2025 Farm Bill debate will shape CRP&apos;s future. Key questions include whether
          the acreage cap will increase, whether rental rates will keep pace with rising
          farmland values, and whether new climate-focused provisions will be added.
        </p>
        <p>
          Some advocates push for expanding CRP to 30+ million acres as a climate tool.
          Others argue the program needs modernization — shifting from simple land retirement
          to more targeted, practice-based approaches that deliver measurable environmental
          outcomes.
        </p>
        <p>
          Whatever the outcome, CRP remains one of the most consequential environmental
          programs in American agriculture. At $15.7 billion over nine years, it represents
          a significant investment in conservation that affects millions of acres across
          the nation.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Explore CRP Data</h2>
        <p>
          Want to dive deeper into CRP data? Here are some useful starting points:
        </p>
        <ul>
          <li><Link href="/search" className="text-green-700 underline">Search for CRP payments</Link> by state or county</li>
          <li><Link href="/states" className="text-green-700 underline">Browse state pages</Link> to see CRP as part of the full subsidy picture</li>
          <li><Link href="/analysis/crp-conservation" className="text-green-700 underline">CRP Conservation Analysis</Link> — a deep data analysis</li>
          <li><Link href="/analysis/crp-under-threat" className="text-green-700 underline">Is CRP Under Threat?</Link> — enrollment trends and risks</li>
          <li><Link href="/tools/state-report-card" className="text-green-700 underline">State Report Card</Link> — grade states on conservation investment</li>
        </ul>

        {/* FAQ Section */}
        <h2 className="font-[family-name:var(--font-heading)]">Frequently Asked Questions</h2>
        {faqData.map((f, i) => (
          <div key={i} className="mb-6">
            <h3 className="font-[family-name:var(--font-heading)] text-lg">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <RelatedArticles />
      </div>
    </div>
  )
}
