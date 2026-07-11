import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { fmt, fmtMoney, formatProgram } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import RelatedArticles from '@/components/RelatedArticles'
import type { Metadata } from 'next'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Zombie Programs: The USDA Programs Nobody Uses',
  description: '43 USDA farm programs have fewer than 100 payments each. These "zombie programs" persist through bureaucratic inertia, consuming administrative resources while serving almost nobody.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/zombie-programs' },
  openGraph: {
    title: `Zombie Programs: The USDA Programs Nobody Uses`,
    description: `43 USDA farm programs have fewer than 100 payments each. These "zombie programs" persist through bureaucratic inertia, consuming administrative resources while serving almost nobody.`,
    url: 'https://www.opensubsidies.org/analysis/zombie-programs',
    type: 'article',
  },
}

export default function ZombieProgramsPage() {
  const data = loadData('zombie-programs.json') as {
    totalPrograms: number; zombieCount: number; zombieThreshold: number
    programs: { program: string; payments: number; amount: number }[]
  }
  const stats = loadData('stats.json')
  const totalZombieCost = data.programs.reduce((s, p) => s + p.amount, 0)
  const totalZombiePayments = data.programs.reduce((s, p) => s + p.payments, 0)
  const avgZombiePayment = totalZombiePayments > 0 ? totalZombieCost / totalZombiePayments : 0
  const zombiePct = ((data.zombieCount / data.totalPrograms) * 100).toFixed(0)
  const singleDigit = data.programs.filter(p => p.payments < 10)
  const singleDigitCost = singleDigit.reduce((s, p) => s + p.amount, 0)
  const costPerProgram = totalZombieCost / (data.zombieCount || 1)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="Zombie Programs: The USDA Programs Nobody Uses" description="43 USDA farm programs have fewer than 100 payments each. These zombie programs persist through bureaucratic inertia." slug="analysis/zombie-programs" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Zombie Programs' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Zombie Programs: The USDA Programs Nobody Uses',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.org' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What are zombie farm programs?', acceptedAnswer: { '@type': 'Answer', text: `Zombie programs are USDA farm subsidy programs with fewer than 100 payments over a multi-year period. There are ${data.zombieCount} such programs out of ${data.totalPrograms} total — ${zombiePct}% of all programs. They persist through bureaucratic inertia, serving almost nobody while consuming administrative resources.` }},
          { '@type': 'Question', name: 'How much do zombie programs cost taxpayers?', acceptedAnswer: { '@type': 'Answer', text: `Zombie programs distributed ${fmtMoney(totalZombieCost)} in total across ${fmt(totalZombiePayments)} payments. While this is a small fraction of total farm spending, the administrative cost of maintaining these programs — staff, regulations, compliance — far exceeds the payments themselves.` }},
          { '@type': 'Question', name: 'Why do zombie farm programs still exist?', acceptedAnswer: { '@type': 'Answer', text: 'Programs persist because: (1) the Farm Bill authorizes them and the USDA must administer them, (2) even tiny programs have beneficiaries who lobby to keep them, (3) closing a program requires formal rulemaking, and (4) some exist for rare events. Bureaucratic inertia favors the status quo.' }},
          { '@type': 'Question', name: 'Could eliminating zombie programs save money?', acceptedAnswer: { '@type': 'Answer', text: 'The direct payment savings would be modest, but the administrative savings could be significant. Each program requires its own regulations, compliance procedures, staff training, and IT systems. Consolidating or eliminating low-use programs would simplify the system and free up FSA resources.' }},
        ]
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Zombie Programs: The USDA Programs Nobody Uses
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-lg text-gray-600">{data.zombieCount} programs with fewer than 100 payments each. {fmt(totalZombiePayments)} total payments. Bureaucratic inertia in action.</p>
          <ShareButtons title="Zombie Programs: USDA Programs Nobody Uses" />
        </div>
      </div>

      <div className="prose max-w-none">
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Total Programs', value: data.totalPrograms.toString() },
            { label: 'Zombie Programs', value: data.zombieCount.toString() },
            { label: 'Total Payments', value: fmt(totalZombiePayments) },
            { label: 'Total Cost', value: fmtMoney(totalZombieCost) },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        <p>
          The USDA administers {data.totalPrograms} distinct farm subsidy programs. That alone should raise
          eyebrows. But look closer and it gets worse: {data.zombieCount} of those programs — {zombiePct}% —
          have fewer than {data.zombieThreshold} payments <em>total</em> across our entire dataset. These
          are zombie programs: technically alive, practically dead, and costing taxpayers money just to exist.
        </p>

        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 The Hidden Cost</p>
          <p className="text-sm text-gray-700 mt-1">
            Zombie programs distributed just {fmtMoney(totalZombieCost)} in payments — but each program requires
            its own regulations, staff training, IT systems, and compliance procedures. The administrative cost
            of maintaining {data.zombieCount} low-use programs almost certainly exceeds the payments themselves.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Worst Offenders</h2>
        <p>
          Some programs are barely used at all. {singleDigit.length} programs had fewer than 10 payments total,
          distributing just {fmtMoney(singleDigitCost)}. These are programs that might serve a single recipient
          in a single year — yet the USDA maintains the regulatory infrastructure to administer them.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Programs with Fewer Than 100 Payments</h2>
        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2">Program</th>
                <th className="text-right py-3 px-2">Payments</th>
                <th className="text-right py-3 px-2">Total</th>
                <th className="text-right py-3 px-2">Avg Payment</th>
              </tr>
            </thead>
            <tbody>
              {data.programs.map(p => (
                <tr key={p.program} className={`border-b border-gray-100 hover:bg-gray-50 ${p.payments < 10 ? 'bg-red-50' : ''}`}>
                  <td className="py-2 px-2">{formatProgram(p.program)}</td>
                  <td className="text-right py-2 px-2 font-medium">{p.payments}</td>
                  <td className="text-right py-2 px-2">{fmtMoney(p.amount)}</td>
                  <td className="text-right py-2 px-2">{fmtMoney(Math.round(p.amount / p.payments))}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-2">Programs with fewer than 10 payments are highlighted in red.</p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Why These Programs Still Exist</h2>
        <p>
          Bureaucratic inertia is powerful. Once a program is created and codified in the Farm Bill, it persists until
          Congress actively eliminates it — which rarely happens. Each program has its own regulations, staff assignments,
          and institutional knowledge. Even programs with single-digit payments per year continue because:
        </p>
        <ul>
          <li><strong>Statutory mandate:</strong> The Farm Bill authorizes them, so the USDA must administer them</li>
          <li><strong>Constituency protection:</strong> Even tiny programs have beneficiaries who lobby to keep them</li>
          <li><strong>Administrative overhead:</strong> Closing a program requires formal rulemaking and congressional approval</li>
          <li><strong>Just in case:</strong> Some disaster-specific programs exist for rare events (volcanic eruptions, etc.)</li>
          <li><strong>No champion for elimination:</strong> Nobody wins political points for cutting a program most people have never heard of</li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)]">The Bureaucratic Tax</h2>
        <p>
          Every program the USDA administers requires a regulatory framework: eligibility rules, application
          procedures, compliance checks, appeals processes, and reporting requirements. FSA county offices
          must be trained on every program, even ones they may never process. IT systems must accommodate
          every program&apos;s payment codes.
        </p>
        <p>
          This complexity doesn&apos;t just waste administrative resources — it makes the entire system harder
          for farmers to navigate. When there are {data.totalPrograms} programs to choose from, even
          well-informed producers struggle to know what they qualify for. Small farmers without hired
          consultants are at a particular disadvantage, which further tilts the system toward large
          operations that can afford to navigate the bureaucracy.
        </p>
        <p>
          As our <Link href="/analysis/double-dippers">double dippers analysis</Link> shows, the most
          sophisticated recipients manage to collect from 10+ programs simultaneously. The sheer number
          of programs available is a feature for those who can exploit it, and a barrier for those who can&apos;t.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">A Case Study in Government Bloat</h2>
        <p>
          Zombie programs are a microcosm of a broader problem in federal governance: programs are easy to
          create and nearly impossible to eliminate. Every few years, Congress adds new programs to the Farm
          Bill in response to whatever crisis is in the headlines, but rarely removes old ones. The result
          is a system that grows relentlessly, becoming more complex, more expensive to administer, and
          less comprehensible to the people it&apos;s supposed to serve.
        </p>
        <p>
          This isn&apos;t unique to agriculture — the same pattern plays out across the federal government.
          But the USDA&apos;s {data.totalPrograms}-program portfolio is a particularly vivid example of what happens
          when no one is responsible for pruning.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Private Sector Comparison</h2>
        <p>
          No private company would maintain {data.zombieCount} product lines that serve almost no customers.
          A business with that many underperforming products would consolidate, sunset the worst performers,
          and redirect resources to what works. But the USDA isn&apos;t a business — it&apos;s a bureaucracy with
          no competitive pressure and no profit motive to streamline.
        </p>
        <p>
          This is a textbook example of why government programs tend to grow without bound. There&apos;s no
          natural pruning mechanism. No zombie program has a competitor that will drive it out of business.
          No USDA employee gets a bonus for eliminating a program. The incentives all point in one
          direction: keep everything running, even if nobody&apos;s using it.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Farmer&apos;s Perspective</h2>
        <p>
          Imagine you&apos;re a farmer trying to figure out which programs you qualify for. You visit your
          local FSA office and learn there are {data.totalPrograms} programs. Some have similar names
          but different eligibility rules. Some are state-specific. Some are disaster-specific. Some
          require multi-year commitments. Some are one-time payments.
        </p>
        <p>
          No one person — not even FSA staff — fully understands all {data.totalPrograms} programs.
          The complexity itself is a cost, borne disproportionately by small farmers who can&apos;t afford
          consultants to navigate the system. Large operations hire specialists who know every program
          and maximize participation. Small operations leave money on the table because they don&apos;t
          know it&apos;s there.
        </p>
        <p>
          Eliminating zombie programs would be a small but meaningful step toward simplification.
          If a program serves fewer than {data.zombieThreshold} people over nine years, it&apos;s not
          serving its purpose — and it&apos;s adding complexity that hurts everyone else.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Reform Opportunity</h2>
        <p>
          Consolidating or eliminating zombie programs wouldn&apos;t save huge sums — {fmtMoney(totalZombieCost)} across all {data.zombieCount} programs
          is a rounding error in a {fmtMoney(stats.totalAmount)} system. But it would reduce administrative complexity, free up FSA staff time, and
          simplify the bewildering landscape that farmers must navigate.
        </p>
        <p>
          A reasonable reform: require any program with fewer than 100 payments over a five-year period to be
          automatically sunset unless Congress explicitly reauthorizes it. This would shift the default from
          &quot;programs live forever&quot; to &quot;programs must prove their worth.&quot; It&apos;s the kind of common-sense
          government accountability that taxpayers deserve.
        </p>
        <p>
          The <Link href="/analysis/program-proliferation">program proliferation analysis</Link> explores the broader complexity
          problem. For how these programs interact with payment limits, see our{' '}
          <Link href="/analysis/payment-limits">payment limits analysis</Link>. With {data.totalPrograms} programs,
          even well-informed farmers struggle to know what they qualify for.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What Good Government Looks Like</h2>
        <p>
          Eliminating zombie programs isn&apos;t a radical proposal — it&apos;s basic good governance.
          The Government Accountability Office (GAO) has repeatedly recommended consolidating
          duplicative and low-use federal programs across all agencies. The USDA&apos;s farm program
          portfolio is a prime candidate for this kind of cleanup.
        </p>
        <p>
          Congress could start small: require an annual report listing all programs with fewer than
          100 payments, mandate a justification for each program&apos;s continued existence, and create
          a fast-track process for sunsetting programs that can&apos;t justify themselves. This wouldn&apos;t
          require a farm bill rewrite — just a commitment to basic accountability.
        </p>
        <p>
          The fact that this hasn&apos;t happened — despite being an obvious, low-cost reform with
          bipartisan appeal — tells you everything you need to know about the political economy
          of farm spending. Even programs that serve almost nobody are protected, because the
          system values bureaucratic inertia over taxpayer accountability.
        </p>
        <p>
          If you&apos;re a taxpayer wondering where your money goes, zombie programs are a microcosm
          of the answer: into a system that grows without bound, resists simplification, and
          prioritizes its own continuation over efficient service delivery.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Bigger Picture</h2>
        <p>
          Zombie programs are symptoms, not the disease. The disease is a farm policy apparatus
          that adds programs without removing them, creates complexity without accountability,
          and treats bureaucratic inertia as acceptable governance. With {data.totalPrograms} programs
          in the USDA portfolio, zombie programs are just the most visible manifestation of a
          system that has grown far beyond any rational design.
        </p>
        <p>
          The solution isn&apos;t just eliminating programs with fewer than {data.zombieThreshold} payments.
          It&apos;s rethinking how the USDA manages its program portfolio — with regular sunset reviews,
          consolidation authority, and performance metrics that reward simplification rather than
          expansion. Until that cultural shift happens, new zombie programs will continue to
          emerge from every farm bill and every emergency, adding to a portfolio that grows
          like kudzu and serves taxpayers about as well.
        </p>
        <p>
          The {data.zombieCount} zombie programs identified on this page represent {zombiePct}% of all
          USDA programs. They serve almost nobody. They cost more to administer than they pay out.
          And they&apos;ll probably still exist the next time you look. That&apos;s not agriculture policy.
          That&apos;s bureaucratic entropy. And taxpayers deserve better.
        </p>
        <p>
          The simplest test of government accountability: can you identify and eliminate
          programs that serve almost nobody? If the USDA can&apos;t pass that test with
          {data.zombieCount} programs that have fewer than {data.zombieThreshold} payments each,
          what hope is there for reforming the bigger, more expensive parts of the system?
          Zombie programs are the canary in the coal mine — if we can&apos;t fix these, we
          can&apos;t fix anything.
        </p>
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Explore the Data</p>
          <p>See all {data.totalPrograms} programs on our <Link href="/programs" className="text-primary hover:underline">Programs page</Link>,
          or explore <Link href="/analysis/what-147b-buys" className="text-primary hover:underline">what the full {fmtMoney(stats.totalAmount)} could buy instead</Link>.</p>
        </div>
      </div>

      <RelatedArticles currentSlug="zombie-programs" />
    </article>
  )
}
