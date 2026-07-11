import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Texas Gets $3.8B, Vermont Gets $37M: The Geography of Farm Subsidies',
  description: 'Farm subsidy payments vary enormously by state. Texas receives 100x more than Vermont. Explore the geographic distribution.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/state-disparities' },
  openGraph: {
    title: `Texas Gets $3.8B, Vermont Gets $37M: The Geography of Farm Subsidies`,
    description: `Farm subsidy payments vary enormously by state. Texas receives 100x more than Vermont. Explore the geographic distribution.`,
    url: 'https://www.opensubsidies.org/analysis/state-disparities',
    type: 'article',
  },
}

export default function StateDisparities() {
  const states = loadData('states.json')
  const stats = loadData('stats.json')
  const programs = loadData('programs.json')
  const top5 = states.slice(0, 5)
  const bottom5 = states.filter((s: { abbr: string }) => !['PR','GU','VI','AS','MP','DC'].includes(s.abbr)).slice(-5).reverse()
  const top5Total = top5.reduce((s: number, st: { amount: number }) => s + st.amount, 0)
  const top5Pct = ((top5Total / stats.totalAmount) * 100).toFixed(1)
  const bottom5Total = bottom5.reduce((s: number, st: { amount: number }) => s + st.amount, 0)
  const ratio = Math.round(top5Total / bottom5Total)
  const avgPerState = stats.totalAmount / states.length
  const midStates = states.slice(Math.floor(states.length / 2) - 3, Math.floor(states.length / 2) + 3)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="Texas Gets $3.8B, Vermont Gets $37M: The Geography of Farm Subsidies" description="Farm subsidy payments vary enormously by state. Texas receives 100x more than Vermont. Explore the geographic distribution." slug="analysis/state-disparities" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'State Disparities' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'The Geography of Farm Subsidies', author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies' }, datePublished: '2026-02-27',
      })}} />

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Which states receive the most farm subsidies?', acceptedAnswer: { '@type': 'Answer', text: `The top 5 states by total farm subsidy payments are ${top5.map((s: { name: string }) => s.name).join(', ')}. Together they account for ${top5Pct}% of all farm subsidies.` }},
          { '@type': 'Question', name: 'Why do some states get so much more in farm subsidies?', acceptedAnswer: { '@type': 'Answer', text: 'Farm subsidies flow primarily to states that produce commodity crops — corn, soybeans, wheat, cotton, and rice. States with large acreage in these crops dominate subsidy payments. States with diversified agriculture, specialty crops, or smaller farm sectors receive far less.' }},
          { '@type': 'Question', name: 'Do farm subsidies affect what crops states grow?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Because subsidies primarily support commodity crops (corn, soybeans, wheat, cotton, rice), they incentivize farmers to grow these crops rather than fruits, vegetables, or specialty products that receive little or no subsidy support. This creates a policy feedback loop where subsidized states grow more subsidized crops.' }},
          { '@type': 'Question', name: 'How much does the average state receive in farm subsidies?', acceptedAnswer: { '@type': 'Answer', text: `The average across all states is ${fmtMoney(avgPerState)}, but this average is misleading. The top state receives more than 100x the bottom state, showing extreme geographic concentration.` }},
        ]
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Texas Gets {fmtMoney(states[0]?.amount)}, Vermont Gets {fmtMoney(bottom5[bottom5.length-1]?.amount)}: The Geography of Farm Subsidies
        </h1>
        <ShareButtons title="" />
        <p className="text-lg text-gray-600">
          Farm subsidies aren&apos;t spread evenly across America. A handful of agricultural powerhouses receive
          the vast majority of federal dollars, while smaller states get a fraction. The top 5 states collect
          {' '}{top5Pct}% of all subsidies — that&apos;s {fmtMoney(top5Total)} out of {fmtMoney(stats.totalAmount)}.
        </p>
      </div>

      <div className="prose max-w-none">
        {/* Key stats grid */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Total Distributed', value: fmtMoney(stats.totalAmount) },
            { label: 'Top 5 States Share', value: `${top5Pct}%` },
            { label: 'Top-to-Bottom Ratio', value: `${ratio}×` },
            { label: 'States in Dataset', value: fmt(states.length) },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Top 5 States</h2>
        <p>Five states account for a disproportionate share of the {fmtMoney(stats.totalAmount)} in farm subsidies:</p>
        <div className="not-prose my-6 space-y-3">
          {top5.map((s: { abbr: string; name: string; amount: number; payments: number }, i: number) => (
            <Link key={s.abbr} href={`/states/${s.abbr.toLowerCase()}`} className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="text-lg font-bold text-primary mr-2">#{i+1}</span>
                <span className="font-semibold">{s.name}</span>
                <span className="text-sm text-gray-500 ml-2">{fmt(s.payments)} payments</span>
              </div>
              <span className="text-xl font-bold text-primary">{fmtMoney(s.amount)}</span>
            </Link>
          ))}
        </div>

        <p>
          These five states alone collected {fmtMoney(top5Total)} — that&apos;s {top5Pct}% of all farm subsidies
          distributed by the USDA between 2017 and 2025. This concentration isn&apos;t an accident; it&apos;s a direct
          reflection of which states grow the most heavily subsidized commodity crops: corn, soybeans, wheat, cotton, and rice.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Bottom 5 States</h2>
        <p>At the other end, some states receive very little in farm subsidies:</p>
        <div className="not-prose my-6 space-y-3">
          {bottom5.map((s: { abbr: string; name: string; amount: number; payments: number }) => (
            <Link key={s.abbr} href={`/states/${s.abbr.toLowerCase()}`} className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="font-semibold">{s.name}</span>
                <span className="text-sm text-gray-500 ml-2">{fmt(s.payments)} payments</span>
              </div>
              <span className="text-lg font-bold text-gray-600">{fmtMoney(s.amount)}</span>
            </Link>
          ))}
        </div>

        <p>
          Combined, the bottom 5 states received just {fmtMoney(bottom5Total)} — meaning the top 5 states received
          roughly {ratio}× more than the bottom 5. These bottom states tend to have smaller agricultural sectors,
          more diversified farming, or crops that don&apos;t qualify for major commodity programs.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Middle of the Pack</h2>
        <p>
          Between the billion-dollar behemoths and the relative have-nots, there&apos;s a large middle tier of
          states receiving moderate subsidy amounts:
        </p>
        <div className="not-prose my-6 space-y-2">
          {midStates.map((s: { abbr: string; name: string; amount: number; payments: number }) => (
            <Link key={s.abbr} href={`/states/${s.abbr.toLowerCase()}`} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow text-sm">
              <span className="font-semibold">{s.name}</span>
              <span className="font-bold text-primary">{fmtMoney(s.amount)}</span>
            </Link>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Policy Feedback Loop</h2>
        <p>
          The geographic concentration of farm subsidies reflects the geographic concentration of commodity agriculture.
          States that grow corn, soybeans, wheat, and cotton — the crops most heavily subsidized — receive the most money.
          States with diversified agriculture, smaller farms, or non-commodity crops receive far less federal support.
        </p>
        <p>
          This creates a policy feedback loop: subsidies incentivize commodity monocultures, which concentrates more
          subsidy dollars in fewer states, which gives those states more political influence over farm policy.
          The result is a farm bill that serves commodity agriculture first and everyone else second.
        </p>

        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 The Feedback Loop</p>
          <p className="text-sm text-gray-700 mt-1">
            More subsidies → more commodity production → more political power → more subsidies. States outside
            this loop — those growing fruits, vegetables, or raising livestock — have less influence over the
            farm bill that determines where billions flow.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">What This Means for Taxpayers</h2>
        <p>
          Every American taxpayer contributes roughly $109 per year to farm subsidies regardless of where they live.
          But the benefits flow overwhelmingly to a handful of states. A taxpayer in Connecticut is subsidizing
          corn production in Iowa. A taxpayer in Hawaii is funding cotton subsidies in Texas. Whether this is
          a reasonable bargain depends on whether you think commodity crop production is a national public good
          worth subsidizing — or a regional industry that should stand on its own.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Representation Question</h2>
        <p>
          The geographic concentration also raises questions about democratic representation. Senators from
          top farm states sit on the Agriculture Committee, shaping the farm bill to benefit their constituents.
          Senators from states that receive minimal subsidies have less incentive to scrutinize farm spending.
          The result: a program with minimal opposition in Congress despite its cost and concentration.
        </p>
        <p>
          As our <Link href="/analysis/subsidy-concentration">subsidy concentration analysis</Link> shows,
          the same pattern repeats at the individual level — the top 10% of recipients collect the vast majority
          of all subsidies. Geographic and individual concentration reinforce each other, creating a system
          that&apos;s remarkably resistant to reform.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Per-Capita Perspective</h2>
        <p>
          Raw dollar amounts tell one story. Per-capita numbers tell another. States with large populations
          but modest agricultural sectors — like California, New York, or Florida — contribute far more in
          tax revenue than they receive in farm subsidies. States with small populations and large farm
          sectors — like North Dakota, South Dakota, and Nebraska — receive far more per capita.
        </p>
        <p>
          This creates an implicit wealth transfer from urban taxpayers to rural landowners. Whether
          you view this as a reasonable investment in food security or an unjustifiable subsidy to
          a wealthy industry depends on your political philosophy. But the data is clear: the flow
          of farm subsidy dollars runs counter to population density.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Emergency Spending Amplifies Disparities</h2>
        <p>
          The rise of emergency farm spending has made geographic disparities worse, not better.
          Emergency programs like CFAP and ERP distribute payments based on production volume —
          meaning the states that already receive the most from regular programs also receive the
          most from emergency programs. It&apos;s a double concentration effect.
        </p>
        <p>
          A state like Iowa, already receiving billions in commodity subsidies, also received massive
          CFAP payments during COVID and trade-war MFP payments. A state like Vermont, with its
          diversified small farms, qualified for almost nothing from these emergency programs.
          The gap between top and bottom states has likely widened since 2018.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What Would Fair Distribution Look Like?</h2>
        <p>
          If farm subsidies were distributed proportional to the number of farms rather than acreage or
          production volume, the map would look very different. States with many small, diversified farms
          would receive more. States with fewer but larger commodity operations would receive less.
        </p>
        <p>
          No one is seriously proposing equal distribution — different states have different agricultural
          needs. But the current 100×+ ratio between top and bottom states strains any reasonable
          definition of geographic equity. At minimum, policymakers should ask whether the current
          distribution reflects national priorities or just political power.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Looking Forward</h2>
        <p>
          The 2024 Farm Bill debate highlighted growing frustration with geographic disparities. Some
          lawmakers proposed per-state caps or formulas that would distribute more funding to specialty crop
          states. But entrenched interests fought back, and the basic distribution pattern remains intact.
        </p>
        <p>
          For a detailed look at how disaster spending exacerbates these disparities, see our{' '}
          <Link href="/analysis/disaster-spending">disaster spending analysis</Link>. For the full state-by-state
          breakdown, explore the <Link href="/states">States page</Link>.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Program Mix Varies by State</h2>
        <p>
          Not all states receive their subsidies from the same programs. Texas, with its massive cattle
          industry, receives significant livestock disaster payments alongside commodity subsidies.
          Iowa&apos;s subsidies are dominated by commodity programs for corn and soybeans. Montana and
          the Dakotas receive substantial CRP conservation payments for their marginal grasslands.
        </p>
        <p>
          These program-mix differences mean that changes to any single program affect states
          differently. Cutting CRP would disproportionately affect Great Plains states. Cutting
          commodity programs would hit the Corn Belt hardest. This makes reform politically
          difficult, because every proposed change creates a different set of winners and losers
          among the states.
        </p>
        <p>
          Understanding state-level program composition is essential for evaluating reform proposals.
          A change that looks modest in aggregate could devastate a state whose economy depends on
          a specific program category. This is why farm bill negotiations are among the most
          geographically contentious in Congress.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Population Mismatch</h2>
        <p>
          The states receiving the most farm subsidies are not the most populous states. Texas is
          an exception, but Iowa, Kansas, Nebraska, and the Dakotas have relatively small
          populations. This means farm subsidies represent a much larger share of economic
          activity in these states — and a much larger source of political influence.
        </p>
        <p>
          In states where farm subsidies are a major economic driver, senators and representatives
          have strong incentives to protect farm spending — and constituents who will punish them
          for cutting it. In states where farm subsidies are negligible, lawmakers have little
          incentive to fight for reform. This asymmetry of motivation explains why farm spending
          is so resistant to cuts despite representing a small fraction of the federal budget.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Explore the Data</p>
          <p>See the full breakdown for every state on our <Link href="/states" className="text-primary hover:underline">States page</Link>,
          or see <Link href="/analysis/what-147b-buys" className="text-primary hover:underline">what $147 billion could buy instead</Link>.</p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Congressional Math</h2>
        <p>
          Every state gets two senators, regardless of population or farm output. This gives
          low-population farm states outsized influence in the Senate Agriculture Committee.
          A senator from North Dakota, representing 780,000 people, has the same vote as a senator
          from California, representing 39 million. When farm bills come to the floor, rural state
          senators leverage this power to protect subsidies flowing to their constituents.
        </p>
        <p>
          The House tells a different story — farm districts are a minority, which is why farm bills
          are bundled with SNAP (food stamps) to build urban support. But the Senate dynamic ensures
          that the geographic distribution of farm subsidies remains heavily tilted toward
          commodity-producing states, regardless of broader national interests.
        </p>

        <p>
          For rural communities in top subsidy states, farm payments represent a significant portion
          of local economic activity. Subsidy dollars flow to landowners, who spend at local businesses,
          generating multiplier effects. Cutting subsidies would have real economic consequences in
          these communities — a reality that makes reform politically perilous for any lawmaker
          representing agricultural districts.
        </p>

        <RelatedArticles currentSlug="state-disparities" />
      </div>
    </article>
  )
}
