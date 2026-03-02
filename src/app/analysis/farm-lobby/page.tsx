import Breadcrumbs from '@/components/Breadcrumbs'
import { fmtMoney, fmt } from '@/lib/utils'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'The Farm Lobby: How $147 Billion in Subsidies Survives Every Reform Attempt',
  description: 'The farm lobby spends $130M+/year on lobbying and millions in political donations. How the Farm Bill logrolling coalition makes reform impossible.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/farm-lobby' },
  openGraph: {
    title: 'The Farm Lobby: How $147 Billion in Subsidies Survives Every Reform Attempt',
    description: 'The farm lobby spends $130M+/year on lobbying and millions in political donations.',
    url: 'https://www.opensubsidies.org/analysis/farm-lobby',
    type: 'article',
  },
}

const lobbyGroups = [
  { name: 'American Farm Bureau Federation', spending: 12400000, members: '5.5 million', focus: 'Broad agriculture — largest farm organization', position: 'Defends all commodity programs, opposes means testing' },
  { name: 'National Corn Growers Association', spending: 8200000, members: '40,000', focus: 'Corn, ethanol mandate (RFS)', position: 'Protects RFS, PLC/ARC, crop insurance' },
  { name: 'American Soybean Association', spending: 6800000, members: '500,000+', focus: 'Soybeans, trade policy', position: 'Supports MFP, trade agreements, ARC' },
  { name: 'National Cattlemen\'s Beef Association', spending: 5900000, members: '175,000', focus: 'Beef, livestock disaster programs', position: 'Defends LFP, ELAP, country-of-origin labeling' },
  { name: 'American Sugar Alliance', spending: 4700000, members: '~4,500 growers', focus: 'Sugar price supports, import quotas', position: 'Protects sugar program at all costs' },
  { name: 'National Cotton Council', spending: 4200000, members: '~18,000', focus: 'Cotton subsidies, seed cotton PLC', position: 'Added cotton back to PLC in 2018 Farm Bill' },
  { name: 'National Wheat Growers Association', spending: 3100000, members: '~28,000', focus: 'Wheat, PLC, crop insurance', position: 'Protects reference prices, crop insurance' },
  { name: 'USA Rice Federation', spending: 2800000, members: '~6,000', focus: 'Rice subsidies, trade', position: 'Highest per-acre subsidies; defends PLC' },
  { name: 'National Milk Producers Federation', spending: 5500000, members: '~30,000', focus: 'Dairy, Dairy Margin Coverage', position: 'Expanded DMC in 2018 Farm Bill' },
  { name: 'CropLife America', spending: 9600000, members: 'Corporate', focus: 'Pesticides, GMOs, ag chemicals', position: 'Deregulation, opposing pesticide restrictions' },
]

const farmBillCoalition = [
  { component: 'SNAP (Food Stamps)', share: 76, budget: 900000000000, beneficiaries: '42 million', politicalBase: 'Urban Democrats' },
  { component: 'Crop Insurance', share: 9, budget: 106000000000, beneficiaries: '~250,000 farms', politicalBase: 'Rural Republicans' },
  { component: 'Commodity Programs', share: 7, budget: 82000000000, beneficiaries: '~350,000 farms', politicalBase: 'Rural Republicans' },
  { component: 'Conservation', share: 6, budget: 71000000000, beneficiaries: '~500,000 farms', politicalBase: 'Bipartisan' },
  { component: 'All Other', share: 2, budget: 24000000000, beneficiaries: 'Various', politicalBase: 'Various' },
]

const reformAttempts = [
  { year: '1996', name: 'Freedom to Farm Act', result: 'Passed (partial reform)', detail: 'Replaced fixed payments with "market transition" payments. Reversed within 2 years when prices dropped and Congress passed emergency bailouts.' },
  { year: '2013', name: 'Shaheen-Toomey Sugar Amendment', result: 'Failed 54-45', detail: 'Bipartisan amendment to reform sugar program. Lost despite 54 votes (needed 60). Sugar lobby donations to key senators proved decisive.' },
  { year: '2013', name: 'Flake-Durbin Subsidy Limits', result: 'Failed', detail: 'Would have capped farm subsidies at $250K and required means testing. Farm Bureau lobbied aggressively against.' },
  { year: '2014', name: 'Heritage Foundation Reforms', result: 'Ignored', detail: 'Proposed ending all commodity programs, sugar supports, and ethanol mandates. No congressional sponsor willing to introduce.' },
  { year: '2018', name: 'Farm Bill Work Requirements', result: 'Partially included', detail: 'House version added SNAP work requirements. Conference dropped most provisions to maintain the SNAP-farm coalition.' },
  { year: '2023', name: 'Farm Bill Reauthorization', result: 'Stalled', detail: 'House Agriculture Committee proposed increasing reference prices by 20%. Budget hawks objected. Bill expired without reauthorization.' },
]

const topPACDonors = [
  { name: 'American Crystal Sugar', amount: 3850000, cycles: '2018-2024', lean: '55% R / 45% D' },
  { name: 'American Farm Bureau', amount: 2900000, cycles: '2018-2024', lean: '68% R / 32% D' },
  { name: 'Dairy Farmers of America', amount: 2300000, cycles: '2018-2024', lean: '52% R / 48% D' },
  { name: 'National Cattlemen\'s Beef Assn', amount: 2100000, cycles: '2018-2024', lean: '82% R / 18% D' },
  { name: 'American Sugar Cane League', amount: 1800000, cycles: '2018-2024', lean: '65% R / 35% D' },
  { name: 'Land O\'Lakes', amount: 1600000, cycles: '2018-2024', lean: '50% R / 50% D' },
  { name: 'National Corn Growers Assn', amount: 1400000, cycles: '2018-2024', lean: '62% R / 38% D' },
  { name: 'Deere & Company', amount: 1200000, cycles: '2018-2024', lean: '58% R / 42% D' },
]

export default function FarmLobby() {
  const totalLobby = lobbyGroups.reduce((s, g) => s + g.spending, 0)
  const totalPAC = topPACDonors.reduce((s, d) => s + d.amount, 0)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema
        title="The Farm Lobby: How $147 Billion in Subsidies Survives Every Reform Attempt"
        description="The farm lobby spends $130M+/year on lobbying and millions in political donations."
        slug="analysis/farm-lobby"
        date="March 2026"
      />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Farm Lobby' }]} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · March 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          The Farm Lobby: How $147 Billion in Subsidies Survives Every Reform Attempt
        </h1>
        <ShareButtons title="The Farm Lobby: How $147 Billion in Subsidies Survives Every Reform Attempt" />
        <p className="text-lg text-gray-600">
          Farm groups spend over <strong>$130 million per year</strong> on lobbying — making
          agriculture one of the most politically protected sectors in America. Here&apos;s how
          the farm lobby keeps reform at bay.
        </p>
      </div>

      <div className="prose max-w-none">

        {/* Key stats */}
        <div className="not-prose my-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">$130M+</div>
            <div className="text-xs text-gray-600 mt-1">Annual ag lobbying spend</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">600+</div>
            <div className="text-xs text-gray-600 mt-1">Registered ag lobbyists</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">$147B</div>
            <div className="text-xs text-gray-600 mt-1">Farm subsidies protected</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">0</div>
            <div className="text-xs text-gray-600 mt-1">Major reforms since 1996</div>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Lobby Landscape</h2>
        <p>
          The farm lobby isn&apos;t a single organization — it&apos;s a constellation of commodity groups,
          trade associations, and cooperatives, each defending its own slice of the subsidy pie. Together,
          they form one of the most effective lobbying coalitions in Washington.
        </p>

        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Organization</th>
                  <th className="px-4 py-2 text-right font-semibold">Annual Lobbying</th>
                  <th className="px-4 py-2 text-left font-semibold">Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {lobbyGroups.map((g, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{g.name}</td>
                    <td className="px-4 py-2 text-right font-mono text-primary">{fmtMoney(g.spending)}</td>
                    <td className="px-4 py-2 text-gray-600 text-xs">{g.focus}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-bold">
                  <td className="px-4 py-2">Top 10 Total</td>
                  <td className="px-4 py-2 text-right font-mono text-primary">{fmtMoney(totalLobby)}</td>
                  <td className="px-4 py-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Source: OpenSecrets.org lobbying data. Total ag sector lobbying exceeds $130M/year including
            food/beverage and forestry.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Farm Bill: America&apos;s Greatest Logroll</h2>
        <p>
          The <strong>Farm Bill</strong> — reauthorized roughly every 5 years — is the legislative vehicle
          for farm subsidies. But here&apos;s the key: farm subsidies are only about <strong>7-9%</strong> of
          the Farm Bill&apos;s budget. The vast majority goes to <strong>SNAP (food stamps)</strong>.
        </p>
        <p>
          This is by design. By bundling SNAP with farm programs, the Farm Bill creates a coalition that
          neither urban Democrats nor rural Republicans can break:
        </p>

        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Component</th>
                  <th className="px-4 py-2 text-right font-semibold">Share</th>
                  <th className="px-4 py-2 text-left font-semibold">Political Base</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {farmBillCoalition.map((c, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{c.component}</td>
                    <td className="px-4 py-2 text-right font-mono text-primary">{c.share}%</td>
                    <td className="px-4 py-2 text-gray-600">{c.politicalBase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="not-prose my-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-amber-800 mb-2">
            The Logrolling Deal
          </h3>
          <p className="text-amber-700">
            <strong>Urban Democrats</strong> vote for farm subsidies they might otherwise oppose →
            <strong> Rural Republicans</strong> vote for SNAP they might otherwise cut. Neither side
            can get what it wants without the other. This is why every attempt to &quot;split&quot;
            the Farm Bill into separate SNAP and farm legislation has failed — it would destroy
            the coalition that passes both.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Political Donations: Buying Bipartisan Protection</h2>
        <p>
          The farm lobby donates strategically to <em>both parties</em>. This isn&apos;t about ideology —
          it&apos;s about ensuring no party has an incentive to reform the system.
        </p>

        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">PAC / Organization</th>
                  <th className="px-4 py-2 text-right font-semibold">Total (3 cycles)</th>
                  <th className="px-4 py-2 text-right font-semibold">Lean</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {topPACDonors.map((d, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{d.name}</td>
                    <td className="px-4 py-2 text-right font-mono text-primary">{fmtMoney(d.amount)}</td>
                    <td className="px-4 py-2 text-right text-xs text-gray-600">{d.lean}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-bold">
                  <td className="px-4 py-2">Top 8 Total</td>
                  <td className="px-4 py-2 text-right font-mono text-primary">{fmtMoney(totalPAC)}</td>
                  <td className="px-4 py-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p>
          Notice the pattern: most farm PACs donate to <em>both</em> parties, with a lean toward
          whichever party controls the relevant committee. The goal isn&apos;t to elect Republicans
          or Democrats — it&apos;s to ensure that <em>whoever</em> chairs the Agriculture Committee
          is a friend.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Revolving Door</h2>
        <p>
          The farm lobby&apos;s influence extends beyond direct spending. Former USDA officials,
          congressional staffers, and Agriculture Committee members routinely become lobbyists for
          the industries they once regulated. Key examples:
        </p>
        <ul>
          <li>Former House Agriculture Committee chairs from both parties join farm lobby boards</li>
          <li>USDA undersecretaries move to commodity group leadership positions</li>
          <li>Congressional agriculture staffers become registered lobbyists at 3-5x their government salary</li>
          <li>Farm state governors join corporate agricultural boards after leaving office</li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)]">A History of Failed Reforms</h2>
        <p>
          Despite criticism from across the political spectrum — the Heritage Foundation, the Cato
          Institute, the Environmental Working Group, and many economists — meaningful farm subsidy
          reform has never succeeded.
        </p>

        <div className="not-prose my-6 space-y-4">
          {reformAttempts.map((r, i) => (
            <div key={i} className="bg-white rounded-lg border p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-mono font-bold text-primary">{r.year}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  r.result.includes('Failed') || r.result.includes('Ignored') || r.result.includes('Stalled')
                    ? 'bg-red-100 text-red-700'
                    : 'bg-amber-100 text-amber-700'
                }`}>{r.result}</span>
              </div>
              <h3 className="font-bold text-gray-900">{r.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{r.detail}</p>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Why Reform is So Difficult</h2>
        <p>
          The farm lobby benefits from several structural advantages that make reform nearly impossible:
        </p>

        <div className="not-prose my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Concentrated Benefits', desc: 'The top 10% of farms receive most subsidies. These large operations are highly organized and motivated to lobby.' },
            { title: 'Diffuse Costs', desc: 'Each taxpayer pays ~$109/year for farm subsidies. Nobody organizes to fight a $109 annual cost.' },
            { title: 'SNAP Coalition', desc: 'The Farm Bill links food stamps to farm subsidies, creating a voting coalition that neither party will break.' },
            { title: 'Committee Control', desc: 'Farm-state members dominate the Agriculture Committees in both chambers, controlling what legislation even gets a vote.' },
            { title: 'Emotional Appeal', desc: '"Family farmers" is a powerful narrative. The lobby successfully frames all subsidy cuts as attacks on struggling families — even though most subsidies go to large operations.' },
            { title: 'Iowa Caucuses', desc: 'Presidential candidates must pledge support for ethanol and corn subsidies to survive the first primary contest.' },
          ].map((a, i) => (
            <div key={i} className="bg-white rounded-lg border p-4">
              <h3 className="font-bold text-gray-900 text-sm">{a.title}</h3>
              <p className="text-xs text-gray-600 mt-1">{a.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Bottom Line</h2>
        <p>
          The farm lobby isn&apos;t uniquely evil — it&apos;s uniquely <em>effective</em>. With relatively
          modest spending (about $130M/year in lobbying plus $30-40M in PAC donations per cycle), the
          agricultural industry protects over <strong>$147 billion</strong> in government payments. That&apos;s
          a return of roughly <strong>1,000:1</strong> on their political investment.
        </p>
        <p>
          Until the structural incentives change — the Farm Bill coalition is broken, the Agriculture
          Committees are reformed, or public awareness reaches a tipping point — the subsidy system
          will continue largely unchanged. The data shows {' '}
          <Link href="/analysis/subsidy-concentration" className="text-primary hover:underline">
          who really benefits</Link>, but the political system shows why it doesn&apos;t matter.
        </p>

        <div className="not-prose my-8 bg-gray-50 border rounded-xl p-6">
          <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-3">Key Takeaways</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              The ag sector spends $130M+/year on lobbying with 600+ registered lobbyists
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              The Farm Bill&apos;s SNAP-farm coalition creates a bipartisan voting bloc that blocks reform
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              Farm PACs donate to both parties, ensuring whoever controls committees is friendly
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">4.</span>
              Every major reform attempt since 1996 has failed or been reversed
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">5.</span>
              The lobby&apos;s ROI is ~1,000:1 — $130M protects $147B in subsidies
            </li>
          </ul>
        </div>

      </div>

      <RelatedArticles currentSlug="farm-lobby" />
    </article>
  )
}
