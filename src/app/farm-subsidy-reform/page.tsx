import ArticleSchema from '@/components/ArticleSchema'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import RelatedArticles from '@/components/RelatedArticles'
import Link from 'next/link'
import { fmt, fmtMoney } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Farm Subsidy Reform: What the Data Shows About Fixing American Agriculture',
  description: 'Data-driven analysis of farm subsidy reform: payment concentration, emergency spending growth, zombie programs, and 5 reform ideas backed by $147B in USDA data.',
  alternates: { canonical: 'https://www.opensubsidies.org/farm-subsidy-reform' },
}

export default function FarmSubsidyReformPage() {
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalPrograms: number; dataYears: string }
  const yearly = loadData('yearly.json') as { year: number; payments: number; amount: number }[]
  const y2017 = yearly.find(y => y.year === 2017)
  const y2020 = yearly.find(y => y.year === 2020)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Farm Subsidy Reform' }]} />
      <ArticleSchema title="Farm Subsidy Reform: What the Data Shows About Fixing American Agriculture" description="Data-driven analysis of farm subsidy reform: payment concentration, emergency spending growth, zombie programs, and 5 reform ideas backed by $147B in USDA data." slug="farm-subsidy-reform" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Farm Subsidy Reform: What the Data Shows About Fixing American Agriculture',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.org' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question', name: 'What are the biggest problems with farm subsidies?',
            acceptedAnswer: { '@type': 'Answer', text: `The five biggest problems are: (1) extreme payment concentration where the top 10% of recipients collect ~70% of all payments while 69% of farms get nothing, (2) explosive growth in emergency spending that bypasses normal budget scrutiny, (3) program proliferation with ${stats.totalPrograms} separate programs including 43+ zombie programs, (4) a widening gap between small and large farms, and (5) contradictory conservation-commodity incentives.` },
          },
          {
            '@type': 'Question', name: 'How should farm subsidies be reformed?',
            acceptedAnswer: { '@type': 'Answer', text: `Five data-backed reforms: consolidate ${stats.totalPrograms} programs into 20-30 core programs, implement real payment caps that can't be circumvented through entity structuring, create emergency spending guardrails with automatic sunset clauses, means-test large operations above $1M in revenue, and resolve the conservation-commodity conflict by integrating environmental requirements into commodity programs.` },
          },
          {
            '@type': 'Question', name: 'Why is farm subsidy reform so difficult?',
            acceptedAnswer: { '@type': 'Answer', text: 'The Farm Bill combines food stamps (SNAP) with agricultural subsidies, creating an urban-rural legislative coalition that makes reform of either component politically difficult. Large agricultural interests have significant lobbying power, disproportionate Senate representation (every state gets two senators regardless of farming activity), and the political appeal of "protecting farmers" persists even when most farmers receive nothing.' },
          },
          {
            '@type': 'Question', name: 'Do farm subsidies help small farmers?',
            acceptedAnswer: { '@type': 'Answer', text: 'Minimally. 69% of American farms receive zero subsidy payments. The subsidy system is designed around commodity crops (corn, soybeans, wheat, cotton, rice) and disproportionately benefits large operations with significant acreage. Small, diversified, and specialty crop farms — which represent the majority of American agriculture — are largely excluded from the system.' },
          },
        ],
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Farm Subsidy Reform: What the Data Shows About Fixing American Agriculture
        </h1>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-lg text-gray-600">Five data-backed reform ideas from {fmtMoney(stats.totalAmount)} in USDA payments.</p>
          <ShareButtons title="Farm Subsidy Reform: What the Data Shows About Fixing American Agriculture" />
        </div>
      </div>

      <div className="prose max-w-none">
        <p>
          Every five years, Congress debates the Farm Bill — the primary vehicle for farm subsidy policy. Every five years,
          the same arguments recur: farmers need support, spending is too high, the wrong people benefit. What&apos;s usually
          missing from these debates is data. Our database of {fmtMoney(stats.totalAmount)} in USDA payments across
          {' '}{stats.totalPrograms} programs ({stats.dataYears}) provides the evidence base for meaningful reform.
        </p>

        {/* Overview stat cards */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Total Spending', value: fmtMoney(stats.totalAmount), sub: stats.dataYears },
            { label: 'Programs', value: stats.totalPrograms.toString(), sub: 'Distinct programs' },
            { label: 'Farms Getting $0', value: '69%', sub: 'Receive nothing' },
            { label: 'Top 10% Share', value: '~70%', sub: 'Of all payments' },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm font-medium text-gray-900">{s.label}</div>
              <div className="text-xs text-gray-500">{s.sub}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Case for Reform</h2>
        <p>
          The farm subsidy system isn&apos;t broken in one way — it&apos;s broken in five distinct ways,
          each reinforcing the others. Understanding these interconnected problems is essential for
          designing reforms that actually work rather than just shuffling the deck chairs.
        </p>

        <h3>Problem 1: Extreme Payment Concentration</h3>
        <p>
          The <Link href="/analysis/subsidy-concentration">top 10% of recipients collect nearly three-fourths</Link> of all
          farm subsidy dollars. Meanwhile, 69% of American farms receive nothing. The system doesn&apos;t support &ldquo;farmers&rdquo;
          broadly — it supports the largest agricultural operations. The <Link href="/analysis/small-vs-large">small vs. large
          farm gap</Link> continues to widen with each Farm Bill cycle.
        </p>
        <p>
          This concentration creates a self-reinforcing cycle. Subsidies help large farms expand (by
          funding land purchases and equipment), expansion qualifies them for more subsidies, and
          larger operations use their political influence to maintain the system that benefits them.
          Small farms can&apos;t compete against taxpayer-subsidized competitors.
        </p>

        <h3>Problem 2: Emergency Spending Growth</h3>
        <p>
          Emergency and disaster programs have <Link href="/analysis/decade-of-disaster">gone from supplemental to dominant</Link>.
          {y2017 && y2020 && <> Spending surged from {fmtMoney(y2017.amount)} in 2017 to {fmtMoney(y2020.amount)} in 2020 —
          a {(y2020.amount / y2017.amount).toFixed(1)}× increase driven by <Link href="/analysis/trade-war">trade
          war bailouts</Link> and <Link href="/analysis/covid-spending">COVID relief</Link>.</>}
          {' '}These programs bypass normal authorization and lack the scrutiny of Farm Bill programs.
        </p>
        <p>
          Each emergency creates a new &quot;baseline&quot; that politicians are unwilling to reduce.
          The ratchet effect means spending only goes up, never back to pre-emergency levels. Without
          structural guardrails, the next crisis will push spending even higher.
        </p>

        <h3>Problem 3: Program Proliferation</h3>
        <p>
          The USDA operates <Link href="/analysis/program-proliferation">{stats.totalPrograms} separate programs</Link>,
          including <Link href="/analysis/zombie-programs">43+ zombie programs</Link> with fewer than 100 payments each.
          Administrative overhead multiplies with each program, and recipients can{' '}
          <Link href="/analysis/double-dippers">collect from 14+ programs simultaneously</Link>.
        </p>
        <p>
          The complexity itself is a form of inequity. Large operations hire consultants to navigate
          {stats.totalPrograms} programs and maximize their collections. Small farmers visit the
          county FSA office and hope someone mentions every program they qualify for. Simplification
          would be the single most impactful reform for leveling the playing field.
        </p>

        <h3>Problem 4: The Small Farm Gap</h3>
        <p>
          The <Link href="/analysis/average-farmer">average payment is about $4,600</Link> — but the median is far lower.
          Small farms that arguably need the most help receive the least. Programs designed to help family farms
          disproportionately benefit large operations with the resources to navigate complex application processes.
        </p>
        <p>
          The <Link href="/analysis/farm-crisis-2025">2025 farm crisis</Link> illustrates the consequences:
          315 farm bankruptcies (up 46%) concentrated among small operations, while the largest recipients
          continue to thrive. The safety net has a hole big enough to drive a combine through.
        </p>

        <h3>Problem 5: Conservation vs. Commodity Tension</h3>
        <p>
          The USDA simultaneously <Link href="/analysis/conservation-vs-commodity">pays farmers to produce (commodity subsidies)
          and pays them not to produce (conservation programs)</Link>. These contradictory incentives undermine both goals.
          <Link href="/analysis/crp-conservation"> CRP</Link> is increasingly under pressure as emergency commodity spending grows,
          and farmers face the absurd choice of collecting conservation payments or commodity payments —
          sometimes on adjacent fields.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Five Data-Backed Reform Ideas</h2>

        <div className="not-prose space-y-6 my-8">
          {[
            {
              num: '1',
              title: 'Consolidate into 20–30 Core Programs',
              desc: `${stats.totalPrograms} programs is unmanageable. Merge overlapping programs, eliminate zombie programs, and create clear categories. This alone could save billions in administrative costs while making the system navigable for the small farmers who need it most. Start with the 43 zombie programs that serve almost nobody, then merge overlapping commodity and conservation programs.`,
              link: '/analysis/zombie-programs',
              linkText: 'See zombie programs →',
            },
            {
              num: '2',
              title: 'Implement Real Payment Caps',
              desc: 'Current $125K payment limits are easily circumvented through LLCs, partnerships, and spousal entities. Reform should cap total household agricultural subsidies regardless of entity structure, with the savings redirected to small and mid-size operations. A hard cap of $250K per household — with no entity-structuring workarounds — would redirect billions to smaller operations or taxpayer savings.',
              link: '/analysis/payment-limits',
              linkText: 'See payment limit analysis →',
            },
            {
              num: '3',
              title: 'Create Emergency Spending Guardrails',
              desc: 'Emergency farm programs should have automatic sunset clauses (2 years max), spending caps tied to the baseline budget, and mandatory GAO review before extension. The current system treats every crisis as unprecedented, creating permanent spending. CCC authority should require congressional notification for programs exceeding $5 billion.',
              link: '/analysis/covid-spending',
              linkText: 'See COVID spending analysis →',
            },
            {
              num: '4',
              title: 'Means-Test Large Operations',
              desc: 'Operations above $1M in annual revenue shouldn\'t receive commodity subsidies. They have access to crop insurance and commercial risk management tools. Redirecting these payments to operations under $250K in revenue would better serve the Farm Bill\'s stated purpose of supporting family farms — not subsidizing profitable agribusinesses.',
              link: '/analysis/corporate-farms',
              linkText: 'See corporate farm analysis →',
            },
            {
              num: '5',
              title: 'Resolve the Conservation-Commodity Conflict',
              desc: 'Stop paying farmers to both produce and not produce. Integrate conservation requirements into commodity programs — require soil health practices, cover cropping, or buffer strips as a condition of receiving commodity payments. This would maintain conservation gains while reducing standalone conservation program costs.',
              link: '/analysis/conservation-vs-commodity',
              linkText: 'See conservation vs. commodity →',
            },
          ].map(r => (
            <div key={r.num} className="bg-gray-50 rounded-xl p-6 border-l-4 border-primary">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#15803d] text-white flex items-center justify-center font-bold shrink-0">{r.num}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{r.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{r.desc}</p>
                  <Link href={r.link} className="text-primary text-sm font-medium hover:underline">{r.linkText}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Estimated Savings</h2>
        <p>
          Implementing all five reforms wouldn&apos;t eliminate farm subsidies — nor should it. But
          the savings would be substantial:
        </p>
        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Reform</th>
                  <th className="px-4 py-2 text-right font-semibold">Est. Savings</th>
                  <th className="px-4 py-2 text-left font-semibold hidden md:table-cell">How</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2">Program consolidation</td>
                  <td className="px-4 py-2 text-right font-mono text-primary">{fmtMoney(stats.totalAmount * 0.05)}</td>
                  <td className="px-4 py-2 text-gray-600 text-xs hidden md:table-cell">Administrative overhead reduction (~5%)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2">Real payment caps</td>
                  <td className="px-4 py-2 text-right font-mono text-primary">$5-10B</td>
                  <td className="px-4 py-2 text-gray-600 text-xs hidden md:table-cell">Redirect or save excess above $250K/household</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2">Emergency guardrails</td>
                  <td className="px-4 py-2 text-right font-mono text-primary">$3-8B/yr</td>
                  <td className="px-4 py-2 text-gray-600 text-xs hidden md:table-cell">Prevent ratchet effect on baseline spending</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2">Means-testing</td>
                  <td className="px-4 py-2 text-right font-mono text-primary">$2-5B</td>
                  <td className="px-4 py-2 text-gray-600 text-xs hidden md:table-cell">Exclude operations above $1M revenue</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2">Enhanced auditing</td>
                  <td className="px-4 py-2 text-right font-mono text-primary">{fmtMoney(stats.totalAmount * 0.02)}</td>
                  <td className="px-4 py-2 text-gray-600 text-xs hidden md:table-cell">Recover 2% improper payments</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Political Reality</h2>
        <p>
          Farm subsidy reform is politically difficult. The Farm Bill combines food stamps (SNAP) with agricultural subsidies,
          creating a coalition between urban and rural legislators that makes reform of either component nearly impossible.
          Large agricultural interests have significant lobbying power, and &ldquo;protecting farmers&rdquo; remains
          politically popular even when most farmers receive nothing.
        </p>
        <p>
          But the data is clear: the current system primarily benefits large operations, encourages emergency spending binges,
          and maintains an administrative apparatus far larger than necessary. Whether reform comes from the left (equity concerns)
          or the right (efficiency concerns), the destination is similar: fewer programs, better targeting, real caps.
        </p>
        <p>
          The <Link href="/doge-farm-subsidies">DOGE efficiency analysis</Link> makes the conservative case for reform:
          {stats.totalPrograms} programs is bureaucratic bloat, 43 zombie programs are waste, and a system where the
          #1 recipient is a government agency isn&apos;t serving its stated purpose. The
          <Link href="/analysis/farm-crisis-2025"> 2025 farm crisis analysis</Link> makes the progressive case:
          small farms are going bankrupt while large operations collect the lion&apos;s share of subsidies.
          Both sides agree on the diagnosis, if not the prescription.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What Happens Without Reform?</h2>
        <p>
          Without structural reform, the trends identified in our data will continue:
        </p>
        <ul>
          <li>Farm consolidation accelerates as subsidized large operations acquire struggling small farms</li>
          <li>Each new crisis creates another emergency spending program that permanently elevates the baseline</li>
          <li>Program count continues to grow (each Farm Bill adds, none removes)</li>
          <li>The gap between subsidy-receiving and non-receiving farms widens</li>
          <li>Geographic concentration intensifies, with a handful of counties and states collecting the majority</li>
          <li>Administrative overhead grows as more programs mean more rules, staff, and oversight needs</li>
        </ul>
        <p>
          The system is on an unsustainable trajectory. The question isn&apos;t whether reform will happen,
          but whether it happens through deliberate policy choices or through the system&apos;s eventual
          collapse under its own weight.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Frequently Asked Questions</h2>

        <h3>What are the biggest problems with farm subsidies?</h3>
        <p>
          Five interconnected problems: extreme payment concentration (top 10% gets ~70%), emergency
          spending growth that permanently elevates baselines, program proliferation ({stats.totalPrograms} programs),
          the widening small-large farm gap, and contradictory conservation-commodity incentives.
        </p>

        <h3>How should farm subsidies be reformed?</h3>
        <p>
          Five data-backed reforms: consolidate to 20-30 core programs, implement real payment caps
          without entity-structuring workarounds, create emergency spending guardrails with sunset
          clauses, means-test operations above $1M revenue, and integrate conservation requirements
          into commodity programs.
        </p>

        <h3>Why is farm subsidy reform so difficult?</h3>
        <p>
          The Farm Bill&apos;s combination of SNAP and agricultural subsidies creates a political
          coalition that resists changes to either component. Large agricultural interests lobby
          effectively, and &quot;protecting farmers&quot; remains popular rhetoric even when 69%
          of farms receive nothing from the system.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Explore the Data</h2>
        <p>Every claim in this article is backed by our open database. Explore it yourself:</p>
        <div className="not-prose flex flex-wrap gap-3 my-6">
          <Link href="/search" className="bg-[#15803d] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors">Search Database</Link>
          <Link href="/analysis" className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">All Analysis →</Link>
          <Link href="/categories" className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Categories →</Link>
        </div>

        <RelatedArticles currentSlug="farm-subsidy-reform" />
      </div>
    </article>
  )
}
