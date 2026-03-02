import Breadcrumbs from '@/components/Breadcrumbs'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'The Ethanol Subsidy Machine: How Corn Subsidies Fuel a Questionable Energy Policy',
  description: '40% of US corn goes to ethanol production, backed by billions in subsidies. The energy, environmental, and food price costs of America\'s ethanol mandate.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/ethanol-subsidy-machine' },
  openGraph: {
    title: 'The Ethanol Subsidy Machine: How Corn Subsidies Fuel a Questionable Energy Policy',
    description: '40% of US corn goes to ethanol production, backed by billions in subsidies.',
    url: 'https://www.opensubsidies.org/analysis/ethanol-subsidy-machine',
    type: 'article',
  },
}

const ethanolStats = {
  cornToEthanol: 0.40,
  totalCornAcres: 90000000,
  ethanolCornAcres: 36000000,
  ethanolProduction: 16000000000, // 16B gallons/year
  gasolineBlend: 0.10, // E10
  cornSubsidies2017_2025: 28000000000, // ~$28B in corn-related subsidies
  ethanolTaxCredit: 0.45, // 45¢/gallon (historical)
  rfsMandate: 15000000000, // 15B gallons/year mandate
  energyRatio: 1.3, // EROEI of ~1.3:1
  cornPriceImpact: 0.30, // ethanol mandate raises corn price ~30%
  foodPriceImpact: 0.03, // ~3% increase in food prices
  topCornStates: [
    { state: 'Iowa', abbr: 'IA', subsidies: 11678803399, cornShare: 0.18 },
    { state: 'Illinois', abbr: 'IL', subsidies: 8307556541, cornShare: 0.15 },
    { state: 'Nebraska', abbr: 'NE', subsidies: 7995942306, cornShare: 0.14 },
    { state: 'Minnesota', abbr: 'MN', subsidies: 8150148576, cornShare: 0.10 },
    { state: 'Indiana', abbr: 'IN', subsidies: 4025175702, cornShare: 0.08 },
    { state: 'Kansas', abbr: 'KS', subsidies: 8573305662, cornShare: 0.05 },
    { state: 'South Dakota', abbr: 'SD', subsidies: 6802760637, cornShare: 0.05 },
    { state: 'Ohio', abbr: 'OH', subsidies: 3764182192, cornShare: 0.04 },
  ],
}

const timeline = [
  { year: '1978', event: 'Energy Tax Act provides first ethanol tax exemption' },
  { year: '1980', event: 'Energy Security Act creates ethanol production incentives' },
  { year: '2005', event: 'Renewable Fuel Standard (RFS) created — mandates ethanol blending' },
  { year: '2007', event: 'RFS expanded to 36 billion gallons by 2022 (never achieved)' },
  { year: '2011', event: '$6B/year Volumetric Ethanol Excise Tax Credit (VEETC) expires' },
  { year: '2022', event: 'EPA sets RFS at 15B gallons corn ethanol (practical ceiling)' },
  { year: '2024', event: 'Inflation Reduction Act extends clean fuel production credits' },
]

const environmentalCosts = [
  { issue: 'Land Use', detail: '36 million acres of corn for fuel, not food. Grassland and wetland conversion for corn planting has destroyed habitat across the Great Plains.' },
  { issue: 'Water Pollution', detail: 'Corn is the most nitrogen-intensive major crop. Fertilizer runoff from corn belt states feeds the Gulf of Mexico "dead zone" — a 6,000+ sq mile area of oxygen-depleted water.' },
  { issue: 'Water Consumption', detail: 'Producing one gallon of ethanol requires 3-4 gallons of water in the refining process alone. Corn irrigation depletes the Ogallala Aquifer across Nebraska, Kansas, and Texas.' },
  { issue: 'Carbon Emissions', detail: 'When land-use changes are included, corn ethanol may produce MORE greenhouse gases than gasoline. A 2022 PNAS study found it\'s at least 24% more carbon-intensive.' },
  { issue: 'Soil Degradation', detail: 'Continuous corn production (incentivized by ethanol demand) degrades soil health faster than crop rotation. Iowa has lost half its topsoil since European settlement.' },
]

export default function EthanolSubsidyMachine() {
  const statesData = loadData('states.json') as { abbr: string; name: string; amount: number }[]
  const stateMap = Object.fromEntries(statesData.map(s => [s.abbr, s]))

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema
        title="The Ethanol Subsidy Machine: How Corn Subsidies Fuel a Questionable Energy Policy"
        description="40% of US corn goes to ethanol production, backed by billions in subsidies."
        slug="analysis/ethanol-subsidy-machine"
        date="March 2026"
      />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Ethanol Subsidy Machine' }]} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · March 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          The Ethanol Subsidy Machine: How Corn Subsidies Fuel a Questionable Energy Policy
        </h1>
        <ShareButtons title="The Ethanol Subsidy Machine: How Corn Subsidies Fuel a Questionable Energy Policy" />
        <p className="text-lg text-gray-600">
          Forty percent of America&apos;s corn crop — 36 million acres — goes to producing ethanol,
          a fuel that barely breaks even on energy and may be worse for the climate than gasoline.
          Billions in subsidies keep the machine running.
        </p>
      </div>

      <div className="prose max-w-none">

        {/* Key stats */}
        <div className="not-prose my-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">40%</div>
            <div className="text-xs text-gray-600 mt-1">Of US corn → ethanol</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">16B gal</div>
            <div className="text-xs text-gray-600 mt-1">Annual ethanol production</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">1.3:1</div>
            <div className="text-xs text-gray-600 mt-1">Energy return on investment</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">~$28B</div>
            <div className="text-xs text-gray-600 mt-1">Corn subsidies (2017–2025)</div>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Corn-to-Ethanol Pipeline</h2>
        <p>
          The United States produces about 15 billion bushels of corn per year. Of that, roughly
          <strong> 5.5 billion bushels (40%) go straight to ethanol plants</strong> — not food, not
          animal feed, not exports. This single use of corn is larger than all corn exports combined.
        </p>
        <p>
          The ethanol mandate — the <strong>Renewable Fuel Standard (RFS)</strong> — requires oil
          refiners to blend 15 billion gallons of corn ethanol into the nation&apos;s gasoline supply
          every year. This isn&apos;t a market demand. It&apos;s a government-mandated purchase that
          guarantees a market for corn regardless of ethanol&apos;s actual value.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Follow the Subsidies</h2>
        <p>
          The corn-ethanol complex is supported by multiple layers of government intervention:
        </p>

        <div className="not-prose my-6 space-y-3">
          <div className="bg-white rounded-lg border p-5">
            <h3 className="font-bold text-gray-900">Layer 1: Direct Corn Subsidies</h3>
            <p className="text-sm text-gray-600 mt-1">
              Corn farmers receive billions through Price Loss Coverage (PLC), Agricultural Risk Coverage (ARC),
              CRP, and emergency programs. Iowa alone received <strong>{fmtMoney(stateMap['IA']?.amount || 0)}</strong> in
              total farm subsidies from 2017–2025.
            </p>
          </div>
          <div className="bg-white rounded-lg border p-5">
            <h3 className="font-bold text-gray-900">Layer 2: The RFS Mandate</h3>
            <p className="text-sm text-gray-600 mt-1">
              By requiring 15 billion gallons of corn ethanol, the RFS guarantees demand for ~40% of the corn
              crop. Without this mandate, corn prices would drop significantly, and many ethanol plants would close.
            </p>
          </div>
          <div className="bg-white rounded-lg border p-5">
            <h3 className="font-bold text-gray-900">Layer 3: Tax Credits</h3>
            <p className="text-sm text-gray-600 mt-1">
              The 45¢/gallon ethanol tax credit (VEETC) cost taxpayers $6 billion/year before expiring in 2011.
              New clean fuel production credits in the Inflation Reduction Act continue indirect support.
            </p>
          </div>
          <div className="bg-white rounded-lg border p-5">
            <h3 className="font-bold text-gray-900">Layer 4: Trade Protection</h3>
            <p className="text-sm text-gray-600 mt-1">
              A 54¢/gallon tariff on imported ethanol (expired 2011) previously blocked cheaper Brazilian
              sugarcane ethanol, which has 8x better energy returns than corn ethanol.
            </p>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Energy Math Doesn&apos;t Work</h2>
        <p>
          Corn ethanol&apos;s energy return on investment (EROEI) is roughly <strong>1.3:1</strong> — meaning
          you get 1.3 units of energy out for every 1 unit you put in. Compare that to gasoline (5:1),
          solar panels (10:1), or Brazilian sugarcane ethanol (8:1). Corn ethanol barely produces more
          energy than it consumes.
        </p>

        <div className="not-prose my-6 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-amber-800 mb-3">
            Energy Return Comparison
          </h3>
          <div className="space-y-3">
            {[
              { fuel: 'Corn Ethanol', eroei: 1.3, bar: 13 },
              { fuel: 'Gasoline (conventional)', eroei: 5.0, bar: 50 },
              { fuel: 'Sugarcane Ethanol (Brazil)', eroei: 8.0, bar: 80 },
              { fuel: 'Solar PV', eroei: 10.0, bar: 100 },
              { fuel: 'Wind', eroei: 18.0, bar: 100 },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm w-44 text-gray-700 flex-shrink-0">{f.fuel}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-4 rounded-full ${i === 0 ? 'bg-red-400' : 'bg-primary'}`}
                    style={{ width: `${f.bar}%` }}
                  />
                </div>
                <span className="text-sm font-mono w-12 text-right">{f.eroei}:1</span>
              </div>
            ))}
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Environmental Costs</h2>
        <p>
          Proponents sold ethanol as a &quot;green&quot; fuel. The reality is far more complicated — and
          likely net negative for the environment.
        </p>

        <div className="not-prose my-6 space-y-4">
          {environmentalCosts.map((e, i) => (
            <div key={i} className="bg-white rounded-lg border p-5">
              <h3 className="font-bold text-red-700">{e.issue}</h3>
              <p className="text-sm text-gray-600 mt-1">{e.detail}</p>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Food Price Impact</h2>
        <p>
          Diverting 40% of the corn crop to fuel has predictable consequences for food prices.
          Corn is the foundation of the American food system — it feeds cattle, pigs, and chickens;
          it&apos;s processed into corn syrup, corn starch, and corn oil; it&apos;s in virtually
          every packaged food.
        </p>
        <p>
          The ethanol mandate raises corn prices by an estimated <strong>30%</strong> above what they
          would be without mandated ethanol production. This translates to roughly a <strong>3%
          increase in overall food prices</strong> — about $150/year for the average household. The
          impact falls hardest on lower-income families who spend a larger share of their income on food.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Top Corn Subsidy States</h2>
        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">#</th>
                  <th className="px-4 py-2 text-left font-semibold">State</th>
                  <th className="px-4 py-2 text-right font-semibold">Total Subsidies</th>
                  <th className="px-4 py-2 text-right font-semibold">Corn Share</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {ethanolStats.topCornStates.map((s, i) => (
                  <tr key={s.abbr} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-2 font-medium">
                      <Link href={`/states/${s.abbr.toLowerCase()}`} className="text-primary hover:underline">
                        {s.state}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-primary">{fmtMoney(s.subsidies)}</td>
                    <td className="px-4 py-2 text-right">{(s.cornShare * 100).toFixed(0)}% of US corn</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Iowa Problem</h2>
        <p>
          No state benefits more from the corn-ethanol complex than <strong>Iowa</strong>. Iowa is the
          nation&apos;s #1 corn producer, #1 ethanol producer, and home to 42 ethanol plants. Iowa also
          holds the first-in-the-nation presidential caucuses — giving its corn and ethanol interests
          outsized political influence.
        </p>
        <p>
          Every presidential candidate must pledge support for the RFS to survive the Iowa caucuses.
          In 2016, Ted Cruz won Iowa despite opposing ethanol mandates — a rare exception. In 2020,
          Trump expanded the RFS and approved year-round E15 sales to shore up Iowa support. The ethanol
          mandate has become a political third rail specifically because of Iowa&apos;s electoral calendar.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">A Timeline of Ethanol Policy</h2>
        <div className="not-prose my-6">
          <div className="space-y-4">
            {timeline.map((t, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="flex-shrink-0 text-sm font-mono font-bold text-primary w-12">{t.year}</span>
                <div className="flex-1 bg-white rounded-lg border p-3">
                  <p className="text-sm text-gray-700">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">What Alternatives Exist</h2>
        <p>
          If the goal is reducing carbon emissions, corn ethanol is one of the worst tools available.
          Dollar for dollar, <strong>electric vehicles</strong> reduce 3-5x more emissions.{' '}
          <strong>Solar and wind</strong> produce 8-14x more energy per dollar invested. Even{' '}
          <strong>Brazilian sugarcane ethanol</strong> — which we import restrictions against — has
          6x better energy returns.
        </p>
        <p>
          The $28 billion spent on corn subsidies from 2017–2025, combined with the hidden costs
          of the RFS mandate (higher food prices, environmental damage), could have funded the
          equivalent of 2 million residential solar installations or 500,000 public EV charging stations.
        </p>

        <div className="not-prose my-8 bg-gray-50 border rounded-xl p-6">
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-3">Key Takeaways</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              40% of US corn goes to ethanol — more than exports, more than direct human consumption
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              Corn ethanol&apos;s energy return (1.3:1) is the worst of any major fuel source
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              The RFS mandate guarantees demand regardless of ethanol&apos;s actual value
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">4.</span>
              Environmental costs include the Gulf dead zone, aquifer depletion, and potentially higher carbon emissions
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">5.</span>
              Iowa&apos;s caucus calendar gives corn/ethanol interests disproportionate political protection
            </li>
          </ul>
        </div>

      </div>

      <RelatedArticles currentSlug="ethanol-subsidy-machine" />
    </article>
  )
}
