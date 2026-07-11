import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ArticleSchema from '@/components/ArticleSchema'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '2026 Farm Bill Debates: What\'s at Stake for America\'s Farmers',
  description: 'The 2018 Farm Bill has been extended three times. Congress is still debating the next one. Here\'s what the data says about Title I commodity programs, conservation funding, SNAP, and who really benefits.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/farm-bill-2026' },
  openGraph: {
    title: '2026 Farm Bill Debates: What\'s at Stake for America\'s Farmers',
    description: 'The 2018 Farm Bill has been extended three times. Congress is still debating the next one. Here\'s what the data says about Title I commodity programs, conservation funding, SNAP, and who really benefits.',
    url: 'https://www.opensubsidies.org/analysis/farm-bill-2026',
    type: 'article',
  },
}

export default function FarmBill2026() {
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalPrograms: number; dataYears: string; lastUpdated: string }
  const programs = loadData('programs.json') as { program: string; payments: number; amount: number }[]
  const states = loadData('states.json') as { abbr: string; name: string; payments: number; amount: number }[]
  const yearly = loadData('yearly.json') as { year: number; payments: number; amount: number }[]

  const conservationTotal = programs.filter(p =>
    p.program.includes('CRP') || p.program.includes('CONSERVATION') || p.program.includes('GRASSLAND')
  ).reduce((s, p) => s + p.amount, 0)

  const commodityTotal = programs.filter(p =>
    p.program.includes('PRICE LOSS') || p.program.includes('AGRICULTURAL RISK') || p.program.includes('ARC')
  ).reduce((s, p) => s + p.amount, 0)

  const emergencyTotal = programs.filter(p =>
    p.program.includes('EMERGENCY') || p.program.includes('EMGNCY') || p.program.includes('DISASTER') ||
    p.program.includes('CFAP') || p.program.includes('RELIEF') || p.program.includes('WHIP')
  ).reduce((s, p) => s + p.amount, 0)

  const crpTotal = programs.filter(p => p.program.includes('CRP')).reduce((s, p) => s + p.amount, 0)

  const plcAmount = programs.find(p => p.program === 'PRICE LOSS COVERAGE PROGRAM')?.amount ?? 0
  const arcAmount = programs.find(p => p.program === 'AGRICULTURAL RISK COVERAGE PROG - COUNTY')?.amount ?? 0

  const topStates = [...states].sort((a, b) => b.amount - a.amount).slice(0, 10)
  const topStatesPct = (topStates.reduce((s, st) => s + st.amount, 0) / stats.totalAmount) * 100

  const avg2017_2019 = yearly.filter(y => y.year >= 2017 && y.year <= 2019).reduce((s, y) => s + y.amount, 0) / 3
  const avg2020_2024 = yearly.filter(y => y.year >= 2020 && y.year <= 2024).reduce((s, y) => s + y.amount, 0) / 5

  const topPrograms = programs.slice(0, 5)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why hasn\'t the 2018 Farm Bill been replaced yet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The 2018 Farm Bill expired in September 2023 and has been extended multiple times. Congressional disagreements over SNAP work requirements, conservation spending levels, reference price increases, and overall budget constraints have prevented passage of a new bill.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Title I and Title II of the Farm Bill?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Title I covers commodity programs like Price Loss Coverage (PLC) and Agricultural Risk Coverage (ARC), which guarantee revenue floors for farmers growing major crops. Title II covers conservation programs like CRP that pay farmers to protect environmentally sensitive land. The two titles compete for limited budget resources.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are reference prices in the Farm Bill?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Reference prices are the minimum price levels set by Congress for major commodities. When market prices fall below these reference prices, the government pays farmers the difference through the Price Loss Coverage program. Raising reference prices increases taxpayer costs but provides more downside protection for farmers.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does the Farm Bill cost taxpayers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The full Farm Bill including SNAP, crop insurance, and farm subsidies costs over $1 trillion per decade. USDA direct farm subsidy payments alone totaled over $147 billion from 2017-2025, with emergency spending more than doubling the baseline during 2020-2024.',
        },
      },
    ],
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema
        title="2026 Farm Bill Debates: What's at Stake for America's Farmers"
        description="The 2018 Farm Bill has been extended three times. Congress is still debating the next one. Here's what the data says about Title I commodity programs, conservation funding, SNAP, and who really benefits."
        slug="analysis/farm-bill-2026"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: '2026 Farm Bill Debates' }]} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · July 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          2026 Farm Bill Debates: What&apos;s at Stake for America&apos;s Farmers
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-lg text-gray-600">
            The 2018 Farm Bill has been extended three times. Congress still can&apos;t agree on the next one.
            Here&apos;s why — and what {fmtMoney(stats.totalAmount)} in subsidy data tells us about who really
            benefits from the status quo.
          </p>
          <ShareButtons title="2026 Farm Bill Debates: What's at Stake for America's Farmers" />
        </div>
      </div>

      <div className="prose max-w-none">
        {/* Key stats */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Total Subsidies', value: fmtMoney(stats.totalAmount), sub: stats.dataYears },
            { label: 'Commodity Programs', value: fmtMoney(commodityTotal), sub: 'PLC + ARC spending' },
            { label: 'Conservation', value: fmtMoney(conservationTotal), sub: 'CRP & related' },
            { label: 'Extensions', value: '3', sub: 'Since 2023 expiration' },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm font-medium text-gray-900">{s.label}</div>
              <div className="text-xs text-gray-500">{s.sub}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Three Years of Extensions — and Counting</h2>
        <p>
          The 2018 Farm Bill officially expired on September 30, 2023. Since then, Congress has passed three
          separate extensions, each kicking the can further down the road. The reason is simple: every major
          interest group — from corn growers to conservation advocates to anti-hunger organizations — has
          drawn a line in the sand, and nobody wants to blink first.
        </p>
        <p>
          Meanwhile, the programs keep running on autopilot. {fmtMoney(stats.totalAmount)} has flowed to
          recipients across {fmt(stats.totalPrograms)} programs. The lack of a new Farm Bill doesn&apos;t
          mean the money stops — it means nobody&apos;s modernizing, consolidating, or questioning how it flows.
          That&apos;s convenient for incumbents who benefit from the current structure, and terrible for
          taxpayers who fund it.
        </p>
        <p>
          As we covered in our <Link href="/analysis/farm-bill-2025">2025 Farm Bill analysis</Link>, the
          fundamental tensions haven&apos;t changed. If anything, they&apos;ve intensified. Input costs are
          higher, commodity prices have fluctuated wildly, and emergency spending has created a new baseline
          that dwarfs the Farm Bill&apos;s carefully scored programs.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Title I vs. Title II: The Budget War</h2>
        <p>
          Every dollar allocated to commodity price supports is a dollar not available for conservation —
          and vice versa. This zero-sum dynamic defines the core Farm Bill debate, and the numbers tell
          the story:
        </p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          <div className="bg-gray-50 rounded-lg p-5">
            <h4 className="font-bold text-gray-900 mb-2">Title I: Commodity Programs</h4>
            <div className="text-3xl font-bold text-primary">{fmtMoney(commodityTotal)}</div>
            <div className="text-sm text-gray-500">PLC + ARC total spending</div>
            <p className="text-sm text-gray-600 mt-2">
              Price Loss Coverage ({fmtMoney(plcAmount)}) and Agricultural Risk Coverage ({fmtMoney(arcAmount)}) guarantee
              revenue floors for corn, wheat, soybeans, cotton, rice, and peanut growers. Farm-state legislators
              want these reference prices raised — significantly.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-5">
            <h4 className="font-bold text-gray-900 mb-2">Title II: Conservation</h4>
            <div className="text-3xl font-bold text-primary">{fmtMoney(conservationTotal)}</div>
            <div className="text-sm text-gray-500">CRP & related programs</div>
            <p className="text-sm text-gray-600 mt-2">
              The Conservation Reserve Program alone accounts for {fmtMoney(crpTotal)}. Environmental advocates
              want higher enrollment caps and new climate-focused programs. Commodity groups see every CRP acre
              as land taken out of production.
            </p>
          </div>
        </div>

        <p>
          The Congressional Budget Office (CBO) scores every Farm Bill provision against a baseline. Raising
          commodity reference prices could add $30-50 billion over 10 years. Expanding CRP enrollment by
          3 million acres adds roughly $900 million annually. In a tight budget environment, these numbers
          matter — and every lobby is fighting over the same pie.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Reference Price Debate</h2>
        <p>
          Reference prices are the trigger for PLC payments. When market prices fall below the reference
          price, taxpayers cover the difference. Congress set current reference prices in the 2014 Farm Bill,
          and they haven&apos;t been updated since. Farm-state senators argue that input costs — fertilizer,
          fuel, equipment, labor — have risen 30-50% since then, making the existing safety net inadequate.
        </p>
        <p>
          The counterargument is straightforward: raising reference prices doesn&apos;t just help struggling
          farmers. It sends larger checks to the biggest operations that already receive the lion&apos;s share
          of payments. Our data on <Link href="/analysis/subsidy-concentration">subsidy concentration</Link> shows
          how top recipients dominate program payments. Higher reference prices would amplify that concentration.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 The Reference Price Ratchet</p>
          <p className="text-sm text-gray-700 mt-1">
            Reference prices have never been lowered in the history of the Farm Bill. Once raised, they
            become the new floor — locking in higher taxpayer costs permanently. The 1996 &quot;Freedom to Farm&quot;
            Act tried to phase out price supports entirely. Within six years, Congress reversed course
            and added new ones.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">SNAP: The 800-Pound Gorilla</h2>
        <p>
          SNAP (food stamps) accounts for roughly 80% of total Farm Bill spending — over $120 billion
          per year. It doesn&apos;t appear in our farm payment data because it&apos;s administered separately,
          but it dominates every Farm Bill negotiation.
        </p>
        <p>
          The current debate centers on work requirements. House Republicans want to expand mandatory
          work provisions for able-bodied adults without dependents (ABAWDs), raising the age threshold
          and tightening exemptions. Democrats and anti-hunger groups resist, arguing these provisions
          primarily create bureaucratic barriers rather than encouraging employment.
        </p>
        <p>
          From a taxpayer perspective, the question is whether SNAP belongs in the Farm Bill at all.
          The bundling serves a political purpose — building the urban-rural coalition needed for passage —
          but it means nutrition policy and agricultural policy are held hostage to each other. Proposals
          to <Link href="/farm-subsidy-reform">separate SNAP from the Farm Bill</Link> would allow
          each to be debated on its merits, but neither side&apos;s leadership has embraced the idea.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Who Benefits from the Status Quo?</h2>
        <p>
          Extensions aren&apos;t neutral — they freeze the current distribution of benefits in place. And
          that distribution heavily favors specific states and specific types of operations:
        </p>

        <div className="not-prose my-8">
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-4">Top 10 States by Farm Subsidy Payments</h3>
          <div className="space-y-2">
            {topStates.map((s, i) => {
              const pct = (s.amount / stats.totalAmount) * 100
              return (
                <div key={s.abbr} className="flex items-center gap-3">
                  <span className="text-sm font-mono text-gray-500 w-6">{i + 1}.</span>
                  <span className="w-24 text-sm font-medium text-gray-900">{s.name}</span>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${pct * 3}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-primary w-20 text-right">{fmtMoney(s.amount)}</span>
                  <span className="text-xs text-gray-500 w-12 text-right">{pct.toFixed(1)}%</span>
                </div>
              )
            })}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Top 10 states capture {topStatesPct.toFixed(1)}% of all farm subsidy payments. Each extension
            locks this distribution in for another year.
          </p>
        </div>

        <p>
          The states that dominate this list — Texas, Iowa, Illinois, Kansas, Nebraska — have outsized
          influence in the Senate Agriculture Committee. Their senators chair or rank on the committees
          that draft the bill. The result is a self-reinforcing cycle: the states that receive the most
          have the most power over the bill that determines who receives payments.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What the Data Shows</h2>
        <p>
          Our database of {fmt(stats.totalPayments)} payments across {fmt(stats.totalPrograms)} programs
          reveals several patterns that should inform the Farm Bill debate:
        </p>

        <div className="not-prose space-y-4 my-8">
          {[
            {
              icon: '📈',
              title: 'Emergency Spending Dwarfs the Baseline',
              desc: `Average annual spending jumped from ${fmtMoney(avg2017_2019)} (2017-2019) to ${fmtMoney(avg2020_2024)} (2020-2024) — a ${((avg2020_2024 / avg2017_2019 - 1) * 100).toFixed(0)}% increase driven by ad hoc programs that bypassed Farm Bill guardrails.`,
            },
            {
              icon: '🏭',
              title: 'Program Proliferation Is Out of Control',
              desc: `${fmt(stats.totalPrograms)} distinct programs exist in our data. Many overlap, duplicate, or serve a handful of recipients. The Farm Bill is an opportunity to consolidate — if Congress has the will.`,
            },
            {
              icon: '🌾',
              title: 'Conservation Loses the Budget Fight',
              desc: `Conservation programs total ${fmtMoney(conservationTotal)} vs ${fmtMoney(emergencyTotal)} in emergency spending. Congress debates CRP acre caps while writing blank checks for disaster payments.`,
            },
            {
              icon: '🗺️',
              title: 'Geographic Concentration Is Extreme',
              desc: `The top 10 states capture ${topStatesPct.toFixed(1)}% of all payments. The bottom 20 states combined receive a fraction of what Texas or Iowa gets alone.`,
            },
          ].map(item => (
            <div key={item.title} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h4 className="font-bold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Biggest Programs at Stake</h2>
        <p>
          These are the programs that will be most affected by Farm Bill decisions. Each represents
          billions in taxpayer spending and thousands of recipients whose payments hang on legislative
          outcomes:
        </p>

        <div className="not-prose my-8">
          <div className="space-y-2">
            {topPrograms.map((p, i) => {
              const pct = (p.amount / stats.totalAmount) * 100
              return (
                <div key={p.program} className="flex items-center gap-3">
                  <span className="text-sm font-mono text-gray-500 w-6">{i + 1}.</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-900 truncate max-w-xs">
                        {p.program.split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}
                      </span>
                      <span className="text-primary font-bold">{fmtMoney(p.amount)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${Math.min(pct * 4, 100)}%` }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">What Needs to Happen</h2>
        <p>
          A responsible Farm Bill would do several things that the extensions have avoided:
        </p>
        <ul>
          <li>
            <strong>Sunset emergency programs</strong> — Ad hoc programs created during COVID and the trade war
            should have clear expiration dates. Our analysis of <Link href="/farm-bill">Farm Bill programs</Link> shows
            dozens of zombie programs still on the books.
          </li>
          <li>
            <strong>Consolidate overlapping programs</strong> — {fmt(stats.totalPrograms)} programs is absurd.
            Many serve identical purposes with different acronyms, creating administrative overhead that benefits
            bureaucrats more than farmers.
          </li>
          <li>
            <strong>Means-test payment limits</strong> — Current $125,000 per-person caps are routinely circumvented
            through entity structures. Real reform would tie payments to actual need, not accounting creativity.
            See our deep dive on <Link href="/analysis/subsidy-concentration">subsidy concentration</Link>.
          </li>
          <li>
            <strong>Score emergency spending honestly</strong> — If disaster payments are going to be a permanent
            fixture at {fmtMoney(emergencyTotal)}, they should be scored and budgeted — not passed as
            &quot;emergency&quot; supplementals that dodge budget rules.
          </li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)]">The Path Forward</h2>
        <p>
          Congress faces a choice: pass another extension and preserve a system that benefits entrenched
          interests, or actually reform farm programs based on what the data shows. The political incentives
          favor extension — every reform creates losers, and losers lobby harder than winners celebrate.
        </p>
        <p>
          But the cost of inaction is real. Every year under extension is another year of {fmtMoney(avg2020_2024)} flowing
          through a program structure designed for a different era. The 2018 Farm Bill was written before
          COVID, before the trade war bailouts, before DOGE, and before input cost inflation transformed
          farm economics. Running on its autopilot indefinitely isn&apos;t prudent stewardship — it&apos;s legislative
          negligence.
        </p>
        <p>
          For a deeper look at what reform could look like, see our analysis of <Link href="/farm-subsidy-reform">farm
          subsidy reform proposals</Link> and the tension between <Link href="/analysis/conservation-vs-commodity">conservation
          and commodity spending</Link>.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Source</p>
          <p>Analysis based on USDA Farm Service Agency payment records, {stats.dataYears}. Last updated {stats.lastUpdated}.
          Farm Bill provisions also govern crop insurance and SNAP, which are administered separately and not included
          in these figures. Total Farm Bill cost including all titles exceeds $1 trillion over 10 years.</p>
        </div>

        <RelatedArticles currentSlug="farm-bill-2026" />
      </div>
    </article>
  )
}
