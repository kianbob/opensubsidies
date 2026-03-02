import Breadcrumbs from '@/components/Breadcrumbs'
import { fmtMoney, fmt } from '@/lib/utils'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'The Sugar Subsidy Racket: America\'s Most Egregious Farm Program',
  description: 'The US sugar program costs consumers $3.7 billion/year in higher prices to benefit ~4,500 sugar farms. Import quotas, price floors, and loan forfeitures explained.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/sugar-subsidy-racket' },
  openGraph: {
    title: 'The Sugar Subsidy Racket: America\'s Most Egregious Farm Program',
    description: 'The US sugar program costs consumers $3.7 billion/year in higher prices to benefit ~4,500 sugar farms.',
    url: 'https://www.opensubsidies.org/analysis/sugar-subsidy-racket',
    type: 'article',
  },
}

// Sugar program data points
const sugarStats = {
  consumerCost: 3700000000, // $3.7B/year in higher prices
  sugarFarms: 4500,
  costPerFarm: 822222, // $3.7B / 4,500
  usPricePerPound: 0.47, // average US refined sugar price
  worldPricePerPound: 0.27, // world refined sugar price
  pricePremium: 0.20,
  annualConsumption: 11000000, // 11M tons consumed
  importQuotaShare: 0.15, // ~15% of consumption from imports
  topProducerStates: [
    { state: 'Florida', production: '49%', crop: 'Sugarcane', acres: 440000 },
    { state: 'Louisiana', production: '22%', crop: 'Sugarcane', acres: 210000 },
    { state: 'Minnesota', production: '48%', crop: 'Sugar beets', acres: 490000 },
    { state: 'North Dakota', production: '27%', crop: 'Sugar beets', acres: 275000 },
    { state: 'Texas', production: '6%', crop: 'Sugarcane', acres: 40000 },
  ],
  topRecipients: [
    { name: 'American Crystal Sugar Company', location: 'Moorhead, MN', amount: 124500000, type: 'Cooperative' },
    { name: 'Western Sugar Cooperative', location: 'Denver, CO', amount: 47200000, type: 'Cooperative' },
    { name: 'United Sugars Corporation', location: 'Edina, MN', amount: 38600000, type: 'Marketing co-op' },
    { name: 'Michigan Sugar Company', location: 'Bay City, MI', amount: 31400000, type: 'Cooperative' },
    { name: 'Minn-Dak Farmers Cooperative', location: 'Wahpeton, ND', amount: 28700000, type: 'Cooperative' },
    { name: 'Florida Crystals', location: 'West Palm Beach, FL', amount: 22100000, type: 'Private' },
    { name: 'U.S. Sugar Corporation', location: 'Clewiston, FL', amount: 19800000, type: 'Private' },
    { name: 'Southern Minnesota Beet Sugar Cooperative', location: 'Renville, MN', amount: 17500000, type: 'Cooperative' },
  ],
  lobbyingSpend: 13000000, // ~$13M/year in lobbying
  politicalDonations: 8500000, // ~$8.5M/cycle
}

const howItWorks = [
  {
    mechanism: 'Price Support Loans',
    description: 'USDA offers loans to sugar processors at guaranteed rates (24.09¢/lb for cane, 28.50¢/lb for beets). If market prices fall below these floors, processors can forfeit their sugar to the government instead of repaying loans.',
    impact: 'Creates an artificial price floor above world market prices',
  },
  {
    mechanism: 'Marketing Allotments',
    description: 'The USDA limits how much sugar domestic producers can sell each year. This supply restriction keeps prices elevated even when production is high.',
    impact: 'Prevents overproduction from lowering prices',
  },
  {
    mechanism: 'Tariff-Rate Quotas (TRQs)',
    description: 'Import quotas limit foreign sugar to ~15% of US consumption. Sugar above the quota faces a 15.36¢/lb tariff. This blocks cheap world-market sugar from reaching American consumers.',
    impact: 'US sugar prices are 74% higher than world prices',
  },
  {
    mechanism: 'Feedstock Flexibility Program',
    description: 'When excess sugar threatens to collapse prices, the USDA buys surplus sugar and sells it to ethanol producers at a loss — converting food into fuel to maintain prices.',
    impact: 'Taxpayers absorb losses to prevent price drops',
  },
]

const consumerImpact = [
  { item: 'Average US household', annualCost: 93, note: 'Higher sugar prices add ~$93/year to grocery bills' },
  { item: 'Candy manufacturers', annualCost: null, note: 'Pay 74% more for sugar than global competitors' },
  { item: 'Beverage industry', annualCost: null, note: 'Switched to high-fructose corn syrup (partly due to sugar costs)' },
  { item: 'Food manufacturers', annualCost: null, note: 'Some moved production to Canada/Mexico for cheaper sugar' },
  { item: 'Restaurant industry', annualCost: null, note: 'Higher ingredient costs passed to consumers' },
]

export default function SugarSubsidyRacket() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema
        title="The Sugar Subsidy Racket: America's Most Egregious Farm Program"
        description="The US sugar program costs consumers $3.7 billion/year in higher prices to benefit ~4,500 sugar farms."
        slug="analysis/sugar-subsidy-racket"
        date="March 2026"
      />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Sugar Subsidy Racket' }]} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · March 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          The Sugar Subsidy Racket: America&apos;s Most Egregious Farm Program
        </h1>
        <ShareButtons title="The Sugar Subsidy Racket: America's Most Egregious Farm Program" />
        <p className="text-lg text-gray-600">
          The U.S. sugar program costs American consumers <strong>$3.7 billion per year</strong> in
          higher prices — all to benefit roughly 4,500 sugar farms. It&apos;s a masterclass in how
          concentrated benefits and diffuse costs keep bad policy alive.
        </p>
      </div>

      <div className="prose max-w-none">

        {/* Key stats */}
        <div className="not-prose my-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">$3.7B</div>
            <div className="text-xs text-gray-600 mt-1">Annual cost to consumers</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">~4,500</div>
            <div className="text-xs text-gray-600 mt-1">Sugar farms that benefit</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">$822K</div>
            <div className="text-xs text-gray-600 mt-1">Cost per farm per year</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">74%</div>
            <div className="text-xs text-gray-600 mt-1">US price premium vs. world</div>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">How the Sugar Racket Works</h2>
        <p>
          Unlike most farm subsidies, the sugar program doesn&apos;t primarily cost taxpayers through
          direct USDA payments. Instead, it operates through a Byzantine system of <strong>price
          supports, import quotas, and marketing allotments</strong> that artificially inflate the price
          of sugar. The cost is hidden in every candy bar, soft drink, and baked good Americans buy.
        </p>

        <div className="not-prose my-6 space-y-4">
          {howItWorks.map((h, i) => (
            <div key={i} className="bg-white rounded-lg border p-5">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-gray-900">{h.mechanism}</h3>
                  <p className="text-sm text-gray-600 mt-1">{h.description}</p>
                  <p className="text-xs text-primary font-medium mt-2">→ {h.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Price You Pay</h2>
        <p>
          Americans pay roughly <strong>47¢ per pound</strong> for refined sugar — compared to a world
          price of about <strong>27¢ per pound</strong>. That 20¢ premium doesn&apos;t sound like much,
          but across 11 million tons of annual consumption, it adds up to $3.7 billion.
        </p>

        <div className="not-prose my-6 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-amber-800 mb-3">
            What Sugar Costs You
          </h3>
          <div className="space-y-3">
            {consumerImpact.map((c, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-amber-600 mt-1">•</span>
                <div>
                  <span className="font-medium text-gray-900">{c.item}:</span>{' '}
                  <span className="text-gray-600">{c.note}</span>
                  {c.annualCost && (
                    <span className="ml-2 text-sm font-mono text-amber-700">(${c.annualCost}/yr)</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p>
          The sugar program has contributed to the dominance of <strong>high-fructose corn syrup
          (HFCS)</strong> in American food. When sugar prices are artificially inflated, food
          manufacturers switch to cheaper alternatives. This isn&apos;t a free market at work — it&apos;s
          a distorted market where one sweetener is made artificially expensive through government
          intervention.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Who Benefits: The Sugar Oligopoly</h2>
        <p>
          The sugar program&apos;s benefits are remarkably concentrated. Only about 4,500 operations
          grow sugar in the United States — sugarcane in Florida, Louisiana, and Texas, and sugar beets
          in Minnesota, North Dakota, and a few other northern states.
        </p>

        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">#</th>
                  <th className="px-4 py-2 text-left font-semibold">Recipient</th>
                  <th className="px-4 py-2 text-left font-semibold">Location</th>
                  <th className="px-4 py-2 text-left font-semibold">Type</th>
                  <th className="px-4 py-2 text-right font-semibold">Est. Benefits</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sugarStats.topRecipients.map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-2 font-medium">{r.name}</td>
                    <td className="px-4 py-2 text-gray-600">{r.location}</td>
                    <td className="px-4 py-2 text-gray-600">{r.type}</td>
                    <td className="px-4 py-2 text-right font-mono text-primary">{fmtMoney(r.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            * Estimated benefits include both direct USDA payments and implicit benefits from inflated prices.
            USDA direct payments data may not capture the full value of price supports.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Where Sugar Grows</h2>
        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">State</th>
                  <th className="px-4 py-2 text-left font-semibold">Crop</th>
                  <th className="px-4 py-2 text-right font-semibold">Share</th>
                  <th className="px-4 py-2 text-right font-semibold">Acres</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sugarStats.topProducerStates.map((s, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{s.state}</td>
                    <td className="px-4 py-2 text-gray-600">{s.crop}</td>
                    <td className="px-4 py-2 text-right font-mono text-primary">{s.production}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{fmt(s.acres)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Florida Connection</h2>
        <p>
          Florida&apos;s Everglades Agricultural Area (EAA) — about 700,000 acres south of Lake
          Okeechobee — is ground zero for American sugarcane production. Two companies dominate:
          <strong> Florida Crystals</strong> (owned by the Fanjul family) and <strong>U.S. Sugar
          Corporation</strong>.
        </p>
        <p>
          These companies benefit doubly: they receive inflated prices for their sugar <em>and</em>
          they farm on land that environmental groups argue should be restored as part of the
          Everglades ecosystem. The <strong>phosphorus runoff</strong> from sugar farming is a major
          contributor to algal blooms that have devastated Florida&apos;s waterways.
        </p>
        <p>
          The Fanjul family has been among the largest political donors in Florida for decades. Their
          sugar empire benefits from a program that costs every American family roughly $93/year —
          a transfer from 130 million households to a few thousand sugar operations.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Lobbying Machine</h2>
        <p>
          The sugar industry spends approximately <strong>$13 million per year</strong> on lobbying and
          donates about <strong>$8.5 million per election cycle</strong> to political campaigns. That
          might seem like a lot — until you realize it&apos;s a spectacular return on investment.
        </p>

        <div className="not-prose my-6 bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-green-800 mb-3">
            The Sugar Lobby&apos;s ROI
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">$21.5M</div>
              <div className="text-xs text-gray-600">Annual lobbying + donations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">$3.7B</div>
              <div className="text-xs text-gray-600">Annual benefit (higher prices)</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">172x</div>
              <div className="text-xs text-gray-600">Return on investment</div>
            </div>
          </div>
        </div>

        <p>
          For every dollar the sugar industry spends on political influence, it receives roughly <strong>
          $172 in benefits</strong>. This is why the program persists despite near-universal opposition
          from economists. The benefits are concentrated among a few thousand operations who are highly
          motivated to lobby, while the costs are spread across 330 million consumers who barely notice
          the extra few dollars per year.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Why Reform Never Happens</h2>
        <p>
          The sugar program is a textbook case of <strong>concentrated benefits vs. diffuse costs</strong>.
          Each sugar farm receives an average of $822,000 per year in implicit benefits. Each American
          household pays just $93 per year. No household will organize to fight a $93/year tax, but
          every sugar farm will fight to keep an $822,000 annual benefit.
        </p>
        <p>
          Bipartisan reform efforts have repeatedly failed. In 2013, Senators Jeanne Shaheen (D-NH) and
          Pat Toomey (R-PA) proposed ending sugar price supports. The amendment lost 54-45 in the
          Senate — despite support from both liberal and conservative groups. The sugar lobby&apos;s
          political donations ensured enough votes from both parties to kill reform.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">International Comparison</h2>
        <p>
          The sugar program makes the US an outlier among developed nations. While the EU reformed its
          sugar regime in 2006 (eliminating production quotas), and Australia and Brazil operate
          competitive sugar markets, the US maintains a system that dates back to the 1930s.
        </p>
        <p>
          American candy makers have responded by moving production abroad. <strong>Brach&apos;s</strong>
          moved its Chicago factory to Mexico. <strong>Lifesavers</strong> production went to Canada.
          The Commerce Department estimates the sugar program destroys three manufacturing jobs for
          every one sugar-growing job it protects.
        </p>

        <div className="not-prose my-8 bg-gray-50 border rounded-xl p-6">
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-3">Key Takeaways</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              The sugar program costs consumers $3.7B/year through artificially inflated prices — not direct taxpayer subsidies
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              Only ~4,500 sugar operations benefit, receiving an average of $822K/year each
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              US sugar prices are 74% higher than world prices due to import quotas and price supports
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">4.</span>
              The sugar lobby&apos;s $21.5M annual political spending yields a 172x return
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">5.</span>
              The program has driven candy manufacturing offshore and promoted HFCS over sugar
            </li>
          </ul>
        </div>

      </div>

      <RelatedArticles currentSlug="sugar-subsidy-racket" />
    </article>
  )
}
