import Breadcrumbs from '@/components/Breadcrumbs'
import { fmtMoney, fmt } from '@/lib/utils'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Land Concentration: How Farm Subsidies Flow to Landowners, Not Farmers',
  description: '50% of US farmland is owned by people over 65. Bill Gates is the largest private farmland owner. Subsidies inflate land values and flow to owners through higher rents.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/land-concentration' },
  openGraph: {
    title: 'Land Concentration: How Farm Subsidies Flow to Landowners, Not Farmers',
    description: '50% of US farmland is owned by people over 65. Subsidies inflate land values and flow to owners through higher rents.',
    url: 'https://www.opensubsidies.org/analysis/land-concentration',
    type: 'article',
  },
}

const ownershipStats = {
  totalFarmland: 895000000, // 895M acres
  totalValue: 3400000000000, // $3.4 trillion
  averagePerAcre: 3800,
  percentOver65: 0.50,
  percentRented: 0.39, // 39% of farmland is rented
  percentCorporate: 0.03,
  subsidyCapitalization: 0.25, // 25% of subsidies capitalized into land values
  averageCashRent: 148, // $/acre
}

const topLandowners = [
  { name: 'Bill Gates', acres: 269000, states: '19 states', type: 'Individual (via Cascade Investment)', note: 'Largest private farmland owner in the US' },
  { name: 'The Offutt Family', acres: 190000, states: 'ND, MN, WI, ID', type: 'Family (R.D. Offutt Company)', note: 'Largest potato farmer in the US' },
  { name: 'Boswell Family (J.G. Boswell Co.)', acres: 150000, states: 'CA, AZ', type: 'Family corporation', note: 'Largest cotton/tomato operation in California' },
  { name: 'Stan Kroenke', acres: 225000, states: 'MT, AZ, WY', type: 'Individual (ranch land)', note: 'NFL owner, massive ranch holdings' },
  { name: 'Ted Turner', acres: 200000, states: 'NE, NM, MT, SD', type: 'Individual', note: 'Largest private landowner (ranches), bison' },
  { name: 'Gaylon Lawrence Jr.', acres: 148000, states: 'AR, MS, LA', type: 'Individual', note: 'Delta farmland, row crops' },
  { name: 'John Malone', acres: 130000, states: 'CO, NM, WY, ME', type: 'Individual', note: 'Media mogul, largest private landowner in US (total)' },
  { name: 'The Mormon Church (Farmland Reserve)', acres: 120000, states: 'FL, NE, various', type: 'Religious institution', note: 'Largest ranch in Florida, extensive holdings' },
]

const foreignOwnership = [
  { country: 'Canada', acres: 12800000, share: '31.5%' },
  { country: 'Netherlands', acres: 4900000, share: '12.1%' },
  { country: 'Italy', acres: 2700000, share: '6.7%' },
  { country: 'United Kingdom', acres: 2600000, share: '6.4%' },
  { country: 'Germany', acres: 2500000, share: '6.2%' },
  { country: 'Portugal', acres: 1500000, share: '3.7%' },
  { country: 'Denmark', acres: 1200000, share: '3.0%' },
  { country: 'China', acres: 380000, share: '0.9%' },
]

const landPriceTimeline = [
  { year: '2000', price: 1090 },
  { year: '2005', price: 1630 },
  { year: '2010', price: 2350 },
  { year: '2015', price: 3250 },
  { year: '2020', price: 3160 },
  { year: '2023', price: 4080 },
  { year: '2024', price: 4170 },
]

const reitData = [
  { name: 'Farmland Partners Inc. (FPI)', acres: 185000, value: 1600000000, type: 'Public REIT' },
  { name: 'Gladstone Land Corp. (LAND)', acres: 113000, value: 1400000000, type: 'Public REIT' },
  { name: 'Manulife Investment Management', acres: 500000, value: 4000000000, type: 'Institutional' },
  { name: 'TIAA-CREF (Nuveen)', acres: 900000, value: 8000000000, type: 'Institutional' },
  { name: 'UBS Farmland Investors', acres: 200000, value: 1500000000, type: 'Institutional' },
  { name: 'Hancock Agricultural Investment Group', acres: 350000, value: 3200000000, type: 'Institutional' },
]

export default function LandConcentration() {
  const foreignTotal = foreignOwnership.reduce((s, f) => s + f.acres, 0)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema
        title="Land Concentration: How Farm Subsidies Flow to Landowners, Not Farmers"
        description="50% of US farmland is owned by people over 65. Subsidies inflate land values and flow to owners through higher rents."
        slug="analysis/land-concentration"
        date="March 2026"
      />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Land Concentration' }]} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · March 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Land Concentration: How Farm Subsidies Flow to Landowners, Not Farmers
        </h1>
        <ShareButtons title="Land Concentration: How Farm Subsidies Flow to Landowners, Not Farmers" />
        <p className="text-lg text-gray-600">
          America&apos;s 895 million acres of farmland are worth <strong>$3.4 trillion</strong>.
          Half is owned by people over 65. Institutional investors, REITs, and billionaires are
          buying up the rest. And farm subsidies make this concentration worse — not better.
        </p>
      </div>

      <div className="prose max-w-none">

        {/* Key stats */}
        <div className="not-prose my-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">895M</div>
            <div className="text-xs text-gray-600 mt-1">Acres of US farmland</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">$3.4T</div>
            <div className="text-xs text-gray-600 mt-1">Total farmland value</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">50%</div>
            <div className="text-xs text-gray-600 mt-1">Owned by people 65+</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">39%</div>
            <div className="text-xs text-gray-600 mt-1">Of farmland is rented</div>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Aging Landlord Problem</h2>
        <p>
          Half of all U.S. farmland is owned by someone over 65. Many of these owners no longer farm
          the land themselves — they rent it out. This creates a fundamental disconnect: the people who
          receive the economic benefit of farm subsidies (through higher land values and cash rents)
          are often <strong>not the people doing the farming</strong>.
        </p>
        <p>
          The average age of a farmland owner is 62. The average age of a principal farm operator is 58.
          As the current generation of landowners passes, the <strong>largest intergenerational transfer
          of agricultural wealth in history</strong> is underway — and much of that land is being sold
          not to young farmers, but to investors.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">How Subsidies Inflate Land Values</h2>
        <p>
          Economists have long documented that farm subsidies get &quot;capitalized&quot; into land values.
          When the government guarantees a revenue floor for crops, the land that grows those crops
          becomes more valuable. Studies estimate that <strong>25-30% of subsidy payments</strong> end
          up reflected in higher land prices and rents.
        </p>

        <div className="not-prose my-6 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-amber-800 mb-3">
            The Subsidy-to-Rent Pipeline
          </h3>
          <div className="space-y-3 text-sm text-amber-800">
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center font-bold">1</span>
              <span>Government announces subsidy programs (PLC, ARC, crop insurance)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center font-bold">2</span>
              <span>Guaranteed revenue makes farmland a safer investment</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center font-bold">3</span>
              <span>Higher perceived returns → land prices increase (~25% of subsidy value)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center font-bold">4</span>
              <span>Landowners raise cash rents to reflect higher land values</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center font-bold">5</span>
              <span>Tenant farmers pay higher rent — the subsidy flows <em>through</em> them to landowners</span>
            </div>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Farmland Prices: A Four-Decade Boom</h2>
        <p>
          Average U.S. cropland prices have nearly quadrupled since 2000, far outpacing inflation.
          This makes farmland increasingly inaccessible to new and young farmers while enriching
          existing landowners.
        </p>

        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Year</th>
                  <th className="px-4 py-2 text-right font-semibold">Avg. $/Acre</th>
                  <th className="px-4 py-2 text-left font-semibold">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {landPriceTimeline.map((y, i) => (
                  <tr key={y.year} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-mono font-medium">{y.year}</td>
                    <td className="px-4 py-2 text-right font-mono text-primary">${fmt(y.price)}</td>
                    <td className="px-4 py-2">
                      {i > 0 && (
                        <span className={y.price > landPriceTimeline[i-1].price ? 'text-green-600' : 'text-red-600'}>
                          {y.price > landPriceTimeline[i-1].price ? '↑' : '↓'}{' '}
                          {Math.abs(((y.price - landPriceTimeline[i-1].price) / landPriceTimeline[i-1].price * 100)).toFixed(0)}%
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">Source: USDA National Agricultural Statistics Service</p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Billionaire Buyers</h2>
        <p>
          The rising value of farmland has attracted a new class of buyer: billionaires, investment
          funds, and institutional investors who see farmland as a stable, inflation-hedged asset.
        </p>

        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">#</th>
                  <th className="px-4 py-2 text-left font-semibold">Owner</th>
                  <th className="px-4 py-2 text-right font-semibold">Acres</th>
                  <th className="px-4 py-2 text-left font-semibold">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {topLandowners.map((o, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-2">
                      <div className="font-medium">{o.name}</div>
                      <div className="text-xs text-gray-500">{o.note}</div>
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-primary">{fmt(o.acres)}</td>
                    <td className="px-4 py-2 text-gray-600 text-xs">{o.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Bill Gates: America&apos;s Largest Farmland Owner</h2>
        <p>
          Through his investment vehicle <strong>Cascade Investment LLC</strong>, Bill Gates has
          quietly accumulated <strong>269,000 acres</strong> of farmland across 19 states — making
          him the largest private farmland owner in the United States. His holdings span from
          Louisiana cotton fields to Nebraska corn farms to Washington potato land.
        </p>
        <p>
          Gates&apos; farmland generates revenue in two ways: <strong>cash rent</strong> from tenant
          farmers (averaging $148/acre nationally) and <strong>appreciation</strong> in land value.
          Because the land is subsidized — both directly through USDA programs and indirectly
          through government-guaranteed crop revenue — Gates benefits from the same subsidy system
          that was designed to help struggling family farmers.
        </p>
        <p>
          At average national rates, Gates&apos; 269,000 acres generate roughly <strong>$39.8 million
          per year in cash rent</strong> alone. And because subsidies are capitalized into land values,
          some portion of that rent is effectively a transfer from taxpayers to one of the world&apos;s
          richest people.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Institutional Investors: REITs and Pension Funds</h2>
        <p>
          Even more significant than billionaire buyers are <strong>institutional investors</strong> —
          REITs, pension funds, and investment managers that treat farmland as an asset class.
        </p>

        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Investor</th>
                  <th className="px-4 py-2 text-right font-semibold">Acres</th>
                  <th className="px-4 py-2 text-right font-semibold">Est. Value</th>
                  <th className="px-4 py-2 text-left font-semibold">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {reitData.map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{r.name}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmt(r.acres)}</td>
                    <td className="px-4 py-2 text-right font-mono text-primary">{fmtMoney(r.value)}</td>
                    <td className="px-4 py-2 text-gray-600 text-xs">{r.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            TIAA-CREF (Nuveen) alone manages 900,000 acres of farmland — more than any single family.
            These institutional holders benefit from subsidized crop revenue through tenant rents.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Foreign Ownership</h2>
        <p>
          Foreign investors own approximately <strong>{fmt(foreignTotal)} acres</strong> of U.S.
          agricultural land — about 4.5% of total farmland. While the total percentage is modest,
          foreign ownership has been increasing and has become politically controversial, particularly
          regarding Chinese purchases near military installations.
        </p>

        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Country</th>
                  <th className="px-4 py-2 text-right font-semibold">Acres</th>
                  <th className="px-4 py-2 text-right font-semibold">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {foreignOwnership.map((f, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{f.country}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmt(f.acres)}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{f.share}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Source: USDA Agricultural Foreign Investment Disclosure Act (AFIDA) data.
            China&apos;s 380,000 acres represents just 0.9% of foreign-held farmland.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The New Farmer Crisis</h2>
        <p>
          Rising land prices — inflated partly by subsidies — create an enormous barrier to entry for
          new farmers. The math is brutal:
        </p>

        <div className="not-prose my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-700">$4,170</div>
            <div className="text-xs text-gray-600 mt-1">Average price per acre (2024)</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-700">$2.1M</div>
            <div className="text-xs text-gray-600 mt-1">Cost to buy 500 acres</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-700">7.5%</div>
            <div className="text-xs text-gray-600 mt-1">Farm land loan interest rate</div>
          </div>
        </div>

        <p>
          A young farmer wanting to buy a modest 500-acre corn/soybean operation in Iowa (where
          land averages $10,000+/acre) would need <strong>over $5 million</strong> — before buying
          any equipment. Most new farmers can&apos;t afford to buy; they rent. And their rents include
          a subsidy premium that flows straight to landowners.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Subsidy Paradox</h2>
        <p>
          Farm subsidies were created to help farmers. But through the mechanism of <strong>land value
          capitalization</strong>, they increasingly help <em>landowners</em> — many of whom are
          retirees, investors, billionaires, or foreign entities who have never touched a plow.
        </p>
        <p>
          The USDA&apos;s own research confirms this: a{' '}
          <Link href="/analysis/subsidy-concentration" className="text-primary hover:underline">
          2019 ERS study</Link> found that subsidy payments significantly increase both land values
          and cash rents, with the largest effects in regions with the highest subsidy rates.
        </p>
        <p>
          This creates a perverse cycle: subsidies inflate land values → higher land values make farming
          more expensive → more farmers can&apos;t afford land and must rent → rents include a subsidy
          premium → the subsidy effectively flows to the landowner, not the farmer.
        </p>

        <div className="not-prose my-8 bg-gray-50 border rounded-xl p-6">
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-3">Key Takeaways</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              50% of US farmland is owned by people over 65, many of whom rent to tenant farmers
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              25-30% of farm subsidies get capitalized into higher land values and rents
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              Bill Gates owns 269,000 acres, earning ~$40M/year in rent partly subsidized by taxpayers
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">4.</span>
              Institutional investors (TIAA, Nuveen, REITs) manage millions of acres as an asset class
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">5.</span>
              Rising land prices create a barrier to entry that subsidies worsen, not improve
            </li>
          </ul>
        </div>

      </div>

      <RelatedArticles currentSlug="land-concentration" />
    </article>
  )
}
