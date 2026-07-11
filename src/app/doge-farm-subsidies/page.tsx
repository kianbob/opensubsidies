import ArticleSchema from '@/components/ArticleSchema'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import RelatedArticles from '@/components/RelatedArticles'
import Link from 'next/link'
import { fmt, fmtMoney } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DOGE and Farm Subsidies: What Government Efficiency Means for USDA Payments',
  description: 'How would DOGE (Department of Government Efficiency) evaluate $147B in USDA farm subsidies? 157 programs, 46 zombie programs, and billions in emergency spending.',
  alternates: { canonical: 'https://www.opensubsidies.org/doge-farm-subsidies' },
}

export default function DogeFarmSubsidiesPage() {
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalPrograms: number; dataYears: string }
  const yearly = loadData('yearly.json') as { year: number; payments: number; amount: number }[]
  const y2017 = yearly.find(y => y.year === 2017)
  const y2020 = yearly.find(y => y.year === 2020)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question', name: 'How much does the US spend on farm subsidies?',
            acceptedAnswer: { '@type': 'Answer', text: `From ${stats.dataYears}, the USDA distributed ${fmtMoney(stats.totalAmount)} in farm subsidy payments across ${stats.totalPrograms} programs and ${fmt(stats.totalPayments)} individual payments through the Farm Service Agency.` },
          },
          {
            '@type': 'Question', name: 'What are zombie programs in farm subsidies?',
            acceptedAnswer: { '@type': 'Answer', text: 'Zombie programs are USDA subsidy programs that have fewer than 100 payments each but persist through bureaucratic inertia. At least 43 such programs exist, consuming administrative overhead while serving almost nobody. Each requires its own rules, staff training, and reporting — costs that vastly exceed their disbursements.' },
          },
          {
            '@type': 'Question', name: 'Could DOGE cut farm subsidies?',
            acceptedAnswer: { '@type': 'Answer', text: `The Department of Government Efficiency could target several areas: consolidating the ${stats.totalPrograms} separate programs into 20-30 core programs, eliminating zombie programs with minimal recipients, capping emergency spending with sunset clauses, and addressing the concentration problem where the top 10% of recipients collect roughly 70% of all payments.` },
          },
          {
            '@type': 'Question', name: 'How many farm subsidy programs does the USDA have?',
            acceptedAnswer: { '@type': 'Answer', text: `The USDA administers ${stats.totalPrograms} distinct farm subsidy programs through the Farm Service Agency. The top 10 programs account for the vast majority of spending, while dozens of small programs serve minimal recipients. This program proliferation creates enormous administrative overhead relative to benefits delivered.` },
          },
        ],
      })}} />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'DOGE and Farm Subsidies' }]} />
      <ArticleSchema title="DOGE and Farm Subsidies: What Government Efficiency Means for USDA Payments" description="How would DOGE (Department of Government Efficiency) evaluate $147B in USDA farm subsidies?" slug="doge-farm-subsidies" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'DOGE and Farm Subsidies: What Government Efficiency Means for USDA Payments',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.org' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          DOGE and Farm Subsidies: What Government Efficiency Means for USDA Payments
        </h1>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-lg text-gray-600">Is {fmtMoney(stats.totalAmount)} in farm subsidies well-spent? The data raises hard questions.</p>
          <ShareButtons title="DOGE and Farm Subsidies: What Government Efficiency Means for USDA Payments" />
        </div>
      </div>

      <div className="prose max-w-none">
        <p>
          The Department of Government Efficiency (DOGE) has made waves reviewing federal spending for waste, fraud, and redundancy.
          USDA farm subsidies — {fmtMoney(stats.totalAmount)} across {stats.totalPrograms} programs — represent one of the largest
          discretionary spending categories in the federal budget. Our dataset covering {stats.dataYears} reveals exactly where
          efficiency-minded reformers should look.
        </p>

        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Total Spending', value: fmtMoney(stats.totalAmount) },
            { label: 'Programs', value: stats.totalPrograms.toString() },
            { label: 'Zombie Programs', value: '43+' },
            { label: 'Total Payments', value: fmt(stats.totalPayments) },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Efficiency Problem: {stats.totalPrograms} Programs</h2>
        <p>
          The USDA doesn&apos;t run one farm subsidy program — it runs {stats.totalPrograms}. Many overlap, some contradict each other,
          and <Link href="/analysis/zombie-programs">at least 43 &ldquo;zombie programs&rdquo;</Link> have fewer than 100 payments each.
          These programs persist through bureaucratic inertia, consuming administrative overhead while serving almost nobody.
        </p>
        <p>
          For efficiency advocates, the program count alone signals bloat. The question isn&apos;t whether farm subsidies exist —
          it&apos;s whether {stats.totalPrograms} separate bureaucratic channels are the right way to deliver them. See our full{' '}
          <Link href="/analysis/program-proliferation">analysis of program proliferation</Link>.
        </p>
        <p>
          Each program requires its own set of federal regulations, eligibility determinations, application
          forms, staff training manuals, reporting requirements, and oversight mechanisms. The FSA employs
          approximately 10,000 staff across county and state offices to administer this web of programs.
          Consolidating to 25-30 core programs could dramatically reduce overhead while actually improving
          service to farmers by making the system navigable.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Who Gets the Money?</h2>
        <p>
          Farm subsidies don&apos;t just go to farmers. Our <Link href="/entity-types">entity type breakdown</Link> shows payments
          flowing to corporations, LLCs, government entities, and partnerships. <Link href="/analysis/double-dippers">Over 620,000
          recipients collect from 3 or more programs simultaneously</Link>, with some tapping into 14 programs at once.
        </p>
        <p>
          The <Link href="/analysis/subsidy-concentration">concentration problem</Link> is stark: the top 10% of recipients
          collect nearly three-fourths of all payments. 69% of American farms receive nothing at all. The system that
          politicians describe as supporting &quot;family farmers&quot; overwhelmingly serves large commercial operations.
        </p>
        <p>
          Perhaps most surprisingly, the <Link href="/analysis/emergency-management">#1 recipient in the entire database</Link> is
          the Florida Department of Emergency Management — a state government agency — which collected $346.6 million. When a
          government bureaucracy is the top &quot;farmer&quot; in your farming subsidy program, it&apos;s time for a serious
          efficiency review.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Emergency Spending: The Budget Buster</h2>
        <p>
          Traditional farm subsidies are large but predictable. What&apos;s blown up the budget is emergency spending —
          trade war bailouts, COVID relief, and disaster programs that now dwarf the baseline.
          {y2017 && y2020 && <> Spending surged from {fmtMoney(y2017.amount)} in 2017 to {fmtMoney(y2020.amount)} in
          2020 — a {(y2020.amount / y2017.amount).toFixed(1)}× increase driven almost entirely by emergency programs.</>}
        </p>
        <p>
          Emergency programs bypass normal budget scrutiny. They&apos;re created fast, spend big, and often become permanent.
          The <Link href="/analysis/decade-of-disaster">decade of disaster spending</Link> shows how what started as
          exceptions became the rule. The <Link href="/analysis/trade-war">trade war bailout</Link> established the
          precedent, and <Link href="/analysis/covid-spending">COVID spending</Link> amplified it to unprecedented levels.
        </p>
        <p>
          From a DOGE perspective, emergency farm spending is the prime target. These programs use USDA&apos;s
          Commodity Credit Corporation authority to bypass congressional appropriations — meaning billions
          are spent without the normal authorization and oversight process. Each emergency creates a new
          &quot;baseline&quot; that makes returning to pre-emergency spending politically impossible.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Oversight Deficit</h2>
        <p>
          The <Link href="/analysis/negative-payments">clawback and corrections analysis</Link> reveals that the
          USDA recovers a tiny fraction of its disbursements through overpayment recoveries. GAO has repeatedly
          identified weaknesses in USDA payment controls — insufficient eligibility verification, inadequate
          spot-checks, and limited enforcement of payment limits.
        </p>
        <p>
          On a {fmtMoney(stats.totalAmount)} program, even small improvements in oversight could yield
          significant savings. If improper payments run at just 3% (GAO&apos;s conservative estimate),
          that&apos;s {fmtMoney(stats.totalAmount * 0.03)} in potentially recoverable overpayments.
          DOGE-style efficiency reviews should prioritize audit capacity alongside program consolidation.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What DOGE Should Examine</h2>
        <p>If the goal is genuine efficiency in farm spending, the data points to several areas:</p>
        <ol>
          <li><strong>Consolidate programs:</strong> {stats.totalPrograms} programs is indefensible. Many could be merged or eliminated. Start with the <Link href="/analysis/zombie-programs">43 zombie programs</Link>.</li>
          <li><strong>Audit entity types:</strong> Why are <Link href="/entity-types">government entities receiving farm subsidies</Link>? What&apos;s the public interest case?</li>
          <li><strong>Cap emergency spending:</strong> Emergency programs need sunset clauses and spending caps, not open-ended authorizations.</li>
          <li><strong>Address concentration:</strong> If 69% of farms get nothing, the programs aren&apos;t serving &ldquo;farmers&rdquo; — they&apos;re serving large agricultural operations.</li>
          <li><strong>Examine <Link href="/categories">spending by category</Link>:</strong> Compare the ROI of commodity subsidies vs. conservation vs. disaster relief.</li>
          <li><strong>Enforce payment limits:</strong> Current $125K caps are widely circumvented through entity structuring. Close the loopholes or raise the cap and reduce eligibility.</li>
          <li><strong>Strengthen auditing:</strong> Increase audit coverage from its current minimal levels. The savings from reduced improper payments would far exceed the audit costs.</li>
        </ol>

        <h2 className="font-[family-name:var(--font-heading)]">The Political Challenge</h2>
        <p>
          Farm subsidies have survived decades of reform attempts because they benefit from a powerful
          political coalition. The Farm Bill combines agricultural subsidies with food stamps (SNAP),
          creating an urban-rural legislative alliance that makes reform of either component nearly
          impossible. Agricultural interests have disproportionate representation in Congress (every
          state gets two senators, regardless of farming activity), and campaign contributions from
          large agricultural operations flow to both parties.
        </p>
        <p>
          DOGE-style efficiency reviews face an additional challenge: farm subsidies are often defended
          as &quot;national security&quot; spending — essential for food production. But when 69% of
          farms receive nothing and the top 10% collect 70%, the national security argument rings hollow.
          The current system doesn&apos;t secure the food supply; it secures the profits of the
          largest agricultural operations.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Administrative Cost Problem</h2>
        <p>
          Running {stats.totalPrograms} programs requires approximately 10,000 FSA staff across
          county and state offices. Each program needs its own regulations, training materials,
          compliance checklists, and reporting pipelines. Conservative estimates put administrative
          costs at 5-8% of total program spending — that&apos;s {fmtMoney(stats.totalAmount * 0.05)} to
          {fmtMoney(stats.totalAmount * 0.08)} in bureaucratic overhead on a {fmtMoney(stats.totalAmount)} system.
        </p>
        <p>
          Consolidating to 25-30 core programs would dramatically reduce these costs while actually
          improving farmer access. When even county FSA office staff can&apos;t keep track of all
          active programs, the system is working against its stated purpose.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What Would Real Efficiency Look Like?</h2>
        <p>
          A truly efficient farm subsidy system would have 25-30 well-designed programs (not {stats.totalPrograms}),
          meaningful payment caps that can&apos;t be circumvented, automatic sunset clauses on emergency
          programs, robust auditing that catches improper payments, and eligibility criteria that direct
          support to the farms that actually need it — not the ones that are already profitable.
        </p>
        <p>
          The savings from these reforms could be substantial. Conservative estimates suggest:
        </p>
        <ul>
          <li><strong>Zombie program elimination:</strong> Minimal direct savings, but significant administrative overhead reduction</li>
          <li><strong>Program consolidation:</strong> 5-8% administrative cost savings ({fmtMoney(stats.totalAmount * 0.05)} to {fmtMoney(stats.totalAmount * 0.08)})</li>
          <li><strong>Payment cap enforcement:</strong> Redirects billions from large operations to smaller ones or to deficit reduction</li>
          <li><strong>Emergency spending caps:</strong> Prevents future spending spikes that permanently inflate the baseline</li>
          <li><strong>Enhanced auditing:</strong> 1-3% recovery of improper payments ({fmtMoney(stats.totalAmount * 0.01)} to {fmtMoney(stats.totalAmount * 0.03)})</li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)]">The Bipartisan Case for Efficiency</h2>
        <p>
          Farm subsidy reform shouldn&apos;t be a partisan issue. Conservatives see {stats.totalPrograms} programs
          as bureaucratic bloat, zombie programs as waste, and emergency spending as budget-busting
          excess. Progressives see payment concentration as inequitable, small farm exclusion as
          unjust, and corporate welfare masquerading as farmer support.
        </p>
        <p>
          Both sides arrive at similar conclusions: fewer programs, real payment caps, emergency
          spending guardrails, and better targeting. The <Link href="/farm-subsidy-reform">reform
          analysis</Link> details five specific proposals that draw support from both fiscal
          conservatives and agricultural equity advocates.
        </p>
        <p>
          The question isn&apos;t whether the current system can be defended on efficiency grounds —
          it can&apos;t. The question is whether the political will exists to overcome the lobbying
          power of large agricultural interests that benefit from the status quo. DOGE-style
          transparency — making the data publicly accessible and the inefficiencies visible —
          is a necessary first step.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Data Is Public — Explore It Yourself</h2>
        <p>
          Every number in this article comes from our open database of USDA Farm Service Agency payments. No paywalls, no gatekeeping.
          Whether you think farm subsidies are essential safety nets or wasteful spending, the data should be accessible to everyone.
        </p>
        <div className="not-prose flex flex-wrap gap-3 my-6">
          <Link href="/search" className="bg-[#15803d] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors">Search the Database</Link>
          <Link href="/analysis" className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">All Analysis →</Link>
          <Link href="/downloads" className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Download Data →</Link>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Frequently Asked Questions</h2>

        <h3>How much does the US spend on farm subsidies?</h3>
        <p>
          From {stats.dataYears}, the USDA distributed {fmtMoney(stats.totalAmount)} across {stats.totalPrograms} programs
          and {fmt(stats.totalPayments)} individual payments. Annual spending varies significantly — from
          {y2017 && <> {fmtMoney(y2017.amount)} in 2017</>}{y2020 && <> to {fmtMoney(y2020.amount)} in 2020</>} — driven
          by emergency programs.
        </p>

        <h3>What are zombie programs?</h3>
        <p>
          Zombie programs are USDA subsidy programs with fewer than 100 payments each — programs that persist
          through bureaucratic inertia despite serving almost nobody. At least 43 exist, each consuming
          administrative resources disproportionate to their minimal disbursements.
        </p>

        <h3>Could DOGE actually cut farm subsidies?</h3>
        <p>
          DOGE could target several areas: consolidating {stats.totalPrograms} programs into 25-30 core programs,
          eliminating zombie programs, enforcing payment caps, requiring sunset clauses on emergency programs,
          and strengthening audit capacity. The political challenge is significant — farm interests have
          powerful lobbying operations — but the data case for reform is clear.
        </p>

        <h3>Who benefits most from farm subsidies?</h3>
        <p>
          The top 10% of recipients collect roughly 70% of all payments. 69% of American farms receive
          nothing. The #1 recipient in the database is a state government agency, not a farmer.
          The system primarily serves large commercial commodity operations, not the &quot;family
          farmers&quot; typically invoked in political rhetoric.
        </p>

        <div className="not-prose bg-green-50 border-l-4 border-primary p-6 rounded-r-lg my-8">
          <h3 className="font-semibold text-gray-900 mb-2">Related Analysis</h3>
          <ul className="space-y-2 text-sm">
            <li>→ <Link href="/farm-subsidy-reform" className="text-primary hover:underline">Farm Subsidy Reform: Five Data-Backed Ideas</Link></li>
            <li>→ <Link href="/analysis/program-proliferation" className="text-primary hover:underline">157 Programs and Counting</Link></li>
            <li>→ <Link href="/analysis/zombie-programs" className="text-primary hover:underline">Zombie Programs</Link></li>
            <li>→ <Link href="/analysis/subsidy-concentration" className="text-primary hover:underline">Subsidy Concentration</Link></li>
            <li>→ <Link href="/analysis/negative-payments" className="text-primary hover:underline">Clawbacks and Corrections</Link></li>
            <li>→ <Link href="/analysis/emergency-management" className="text-primary hover:underline">Florida Emergency Management: #1 Recipient</Link></li>
          </ul>
        </div>

        <RelatedArticles currentSlug="doge-farm-subsidies" />
      </div>
    </article>
  )
}
