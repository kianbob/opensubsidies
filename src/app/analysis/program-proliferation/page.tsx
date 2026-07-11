import { fmtMoney, fmt, slugify, formatProgram } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: '157 Programs and Counting: The Complexity of Farm Subsidies',
  description: 'Why does the USDA have 157 different farm subsidy programs? An analysis of program proliferation, overlap, administrative burden, and the case for consolidation.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/program-proliferation' },
  openGraph: {
    title: '157 Programs and Counting: The Complexity of Farm Subsidies',
    description: 'Why does the USDA have 157 different farm subsidy programs? An analysis of program proliferation, overlap, and the gap between largest and smallest.',
    url: 'https://www.opensubsidies.org/analysis/program-proliferation',
    type: 'article',
  },
}

type Program = { program: string; code: string; payments: number; amount: number }

export default function ProgramProliferationPage() {
  const programs = loadData('programs.json') as Program[]
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalPrograms: number; dataYears: string }
  const sorted = [...programs].sort((a, b) => b.amount - a.amount)
  const total = sorted.reduce((s, p) => s + p.amount, 0)

  const top10 = sorted.slice(0, 10)
  const top10Total = top10.reduce((s, p) => s + p.amount, 0)
  const bottom50 = sorted.slice(-50)
  const bottom50Total = bottom50.reduce((s, p) => s + p.amount, 0)
  const smallest = sorted[sorted.length - 1]
  const largest = sorted[0]
  const zombieCount = sorted.filter(p => p.payments < 100).length
  const under1000 = sorted.filter(p => p.payments < 1000).length
  const top3Total = sorted.slice(0, 3).reduce((s, p) => s + p.amount, 0)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="157 Programs and Counting: The Complexity of Farm Subsidies" description="Why does the USDA have 157 different farm subsidy programs?" slug="analysis/program-proliferation" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Program Proliferation' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: '157 Programs and Counting: The Complexity of Farm Subsidies',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies' }, datePublished: '2026-02-27',
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question', name: 'How many farm subsidy programs does the USDA have?',
            acceptedAnswer: { '@type': 'Answer', text: `The USDA administers ${stats.totalPrograms} distinct farm subsidy programs through the Farm Service Agency. These range from massive commodity programs distributing billions to tiny niche programs with fewer than 100 payments. The top 10 programs account for ${(top10Total / total * 100).toFixed(0)}% of all spending.` },
          },
          {
            '@type': 'Question', name: 'What are zombie farm programs?',
            acceptedAnswer: { '@type': 'Answer', text: `Zombie programs are USDA subsidy programs with fewer than 100 total payments — programs that persist through bureaucratic inertia despite serving almost nobody. There are ${zombieCount} such programs, each consuming administrative overhead (rules, staff training, reporting) while distributing minimal benefits.` },
          },
          {
            '@type': 'Question', name: 'Why are there so many farm subsidy programs?',
            acceptedAnswer: { '@type': 'Answer', text: 'Program proliferation results from legislative layering (each Farm Bill adds without removing), commodity-specific needs, political compromise during negotiations, emergency response creating new programs, and evolving conservation priorities. The political incentive to create visible new programs outweighs the unglamorous work of streamlining.' },
          },
          {
            '@type': 'Question', name: 'Should farm subsidy programs be consolidated?',
            acceptedAnswer: { '@type': 'Answer', text: `Yes, according to most reform proposals. With ${stats.totalPrograms} programs, the system creates massive administrative burden, inequitable access (large operations navigate it better), oversight gaps, and confusion even among county FSA offices. Consolidating to 20-30 core programs could save billions in administrative costs while making the system navigable for small farmers.` },
          },
        ],
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          {stats.totalPrograms} Programs and Counting: The Complexity of Farm Subsidies
        </h1>
        <p className="text-lg text-gray-600">
          The USDA administers {stats.totalPrograms} distinct farm subsidy programs. Some distribute billions, others barely thousands.
          Why so many, and what does it mean for farmers and taxpayers?
        </p>
      </div>

      <ShareButtons title={`${stats.totalPrograms} Programs and Counting: The Complexity of Farm Subsidies`} />

      <div className="prose max-w-none">
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 Key Finding</p>
          <p className="text-sm text-gray-700 mt-1">
            The top 10 programs account for {(top10Total / total * 100).toFixed(0)}% of all spending ({fmtMoney(top10Total)}).
            The bottom 50 programs combined account for just {(bottom50Total / total * 100).toFixed(1)}%.
          </p>
        </div>

        {/* Stat cards */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Total Programs', value: stats.totalPrograms.toString(), sub: 'Distinct programs' },
            { label: 'Top 10 Share', value: `${(top10Total / total * 100).toFixed(0)}%`, sub: fmtMoney(top10Total) },
            { label: 'Zombie Programs', value: zombieCount.toString(), sub: '<100 payments each' },
            { label: 'Size Ratio', value: `${Math.abs(Math.round(largest.amount / smallest.amount)).toLocaleString()}:1`, sub: 'Largest to smallest' },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm font-medium text-gray-900">{s.label}</div>
              <div className="text-xs text-gray-500">{s.sub}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Scale Gap</h2>
        <p>
          The largest program, {formatProgram(largest.program)}, distributed {fmtMoney(largest.amount)} across {fmt(largest.payments)} payments.
          The smallest, {formatProgram(smallest.program)}, totaled just {fmtMoney(Math.abs(smallest.amount))} — a ratio of over{' '}
          {Math.abs(Math.round(largest.amount / smallest.amount)).toLocaleString()} to 1.
        </p>
        <p>
          This scale gap is staggering. The top 3 programs alone account for {fmtMoney(top3Total)} —
          more than the bottom {sorted.length - 3} programs combined. Yet each of those small
          programs requires its own set of regulations, eligibility criteria, application forms,
          staff training, reporting requirements, and oversight mechanisms. The administrative
          cost of maintaining a program is largely fixed regardless of its size — meaning tiny
          programs consume proportionally enormous overhead.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Top 10 Programs</h2>
        <p>These 10 programs represent the vast majority of all farm subsidy spending:</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">#</th>
              <th className="px-4 py-3 text-left font-semibold">Program</th>
              <th className="px-4 py-3 text-right font-semibold">Amount</th>
              <th className="px-4 py-3 text-right font-semibold hidden sm:table-cell">% of Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {top10.map((p, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                <td className="px-4 py-3">
                  <Link href={`/programs/${slugify(p.program)}`} className="text-primary hover:underline font-medium">{formatProgram(p.program)}</Link>
                </td>
                <td className="px-4 py-3 text-right font-mono">{fmtMoney(p.amount)}</td>
                <td className="px-4 py-3 text-right hidden sm:table-cell">{(p.amount / total * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose max-w-none">
        <h2 className="font-[family-name:var(--font-heading)]">Why So Many Programs?</h2>
        <p>Program proliferation in farm subsidies happens for several reasons:</p>
        <ul>
          <li><strong>Legislative layering:</strong> Each Farm Bill adds new programs without removing old ones. Programs created for specific crises become permanent.</li>
          <li><strong>Commodity-specific needs:</strong> Different crops, livestock, and farming types need different support mechanisms. Dairy programs don&apos;t work for cotton.</li>
          <li><strong>Political compromise:</strong> New programs are often created to satisfy specific constituencies or regions during Farm Bill negotiations.</li>
          <li><strong>Emergency response:</strong> Disasters, pandemics, and trade wars each spawn new emergency programs (CFAP, MFP, ELAP).</li>
          <li><strong>Conservation evolution:</strong> As environmental priorities shift, new conservation programs are added alongside existing ones.</li>
        </ul>
        <p>
          The result is a system that grows in one direction only — more programs, never fewer.
          No Congress wants to be responsible for eliminating a program that some constituency
          depends on, even if that constituency is a handful of recipients. The path of least
          political resistance is always to add, never to subtract.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Zombie Problem</h2>
        <p>
          Of the {stats.totalPrograms} programs in our data, {zombieCount} have fewer than 100
          payments each — what we call &quot;zombie programs.&quot; These programs persist through
          bureaucratic inertia, consuming administrative overhead while serving almost nobody.
          The <Link href="/analysis/zombie-programs">full zombie programs analysis</Link> details
          each one.
        </p>
        <p>
          Beyond zombies, {under1000} programs have fewer than 1,000 payments each. These micro-programs
          collectively represent a significant administrative burden relative to their impact.
          Each requires FSA county office staff to understand eligibility rules, process applications,
          and handle reporting — time that could be spent on programs that actually serve significant
          numbers of farmers.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Smallest 10 Programs</h2>
        <p>At the other end of the spectrum, these programs are barely a rounding error in the overall budget:</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Program</th>
              <th className="px-4 py-3 text-right font-semibold">Amount</th>
              <th className="px-4 py-3 text-right font-semibold hidden sm:table-cell">Payments</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sorted.slice(-10).reverse().map((p, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link href={`/programs/${slugify(p.program)}`} className="text-primary hover:underline">{formatProgram(p.program)}</Link>
                </td>
                <td className="px-4 py-3 text-right font-mono">{fmtMoney(p.amount)}</td>
                <td className="px-4 py-3 text-right hidden sm:table-cell">{fmt(p.payments)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose max-w-none">
        <h2 className="font-[family-name:var(--font-heading)]">The Administrative Burden</h2>
        <p>
          With {stats.totalPrograms} programs, navigating the farm subsidy system is a challenge for farmers, administrators, and
          oversight bodies alike. The complexity creates:
        </p>
        <ul>
          <li><strong>Administrative burden</strong> — each program has its own rules, deadlines, and eligibility criteria</li>
          <li><strong>Inequitable access</strong> — larger operations with dedicated staff can navigate the system better</li>
          <li><strong>Oversight gaps</strong> — more programs mean more opportunities for waste and duplication</li>
          <li><strong>Confusion</strong> — even county FSA offices struggle to keep up with all active programs</li>
        </ul>
        <p>
          The inequitable access problem deserves emphasis. A 10,000-acre corn operation can hire a
          consultant who knows every program, every deadline, and every strategy for maximizing
          payments across multiple programs. The <Link href="/analysis/double-dippers">double-dippers
          analysis</Link> shows over 620,000 recipients collecting from 3 or more programs
          simultaneously — with some tapping 14 programs at once.
        </p>
        <p>
          A 200-acre diversified farm, meanwhile, relies on the farmer walking into the county
          FSA office and hoping the staff mentions every program they qualify for. In a system
          with {stats.totalPrograms} programs, the odds of missing eligible programs are high.
          Complexity becomes a de facto subsidy for those who can afford to navigate it.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Cost of Complexity</h2>
        <p>
          USDA Farm Service Agency employs approximately 10,000 staff across county and state
          offices to administer farm programs. Training, compliance monitoring, and reporting
          for {stats.totalPrograms} programs consumes enormous resources. Each new program added
          during Farm Bill negotiations or emergency responses creates permanent administrative
          cost — even programs that distribute minimal payments.
        </p>
        <p>
          Conservative estimates suggest administrative costs run 5-8% of total program spending
          for well-established programs, and significantly higher for small or new programs.
          On a {fmtMoney(stats.totalAmount)} base, even 5% administrative overhead represents
          {fmtMoney(stats.totalAmount * 0.05)} in bureaucratic costs. Consolidating from
          {stats.totalPrograms} to 25-30 core programs could save billions while improving
          service to farmers.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Case for Simplification</h2>
        <p>
          Every Farm Bill brings calls for consolidation, yet the number of programs tends to grow. The political
          incentive to create visible new programs outweighs the unglamorous work of streamlining existing ones.
        </p>
        <p>
          The <Link href="/farm-subsidy-reform">reform analysis</Link> proposes consolidating to
          20-30 core programs as the first reform priority. The <Link href="/doge-farm-subsidies">DOGE
          efficiency review</Link> identifies program proliferation as a prime target for government
          right-sizing. And the <Link href="/analysis/zombie-programs">zombie programs analysis</Link> provides
          a ready-made hit list for immediate elimination.
        </p>
        <p>
          The question isn&apos;t whether simplification would benefit farmers and taxpayers — it
          obviously would. The question is whether the political will exists to eliminate programs
          that specific constituencies depend on, however small those constituencies may be.
          With {stats.totalPrograms} programs, every consolidation proposal threatens someone&apos;s
          favorite program — and every threatened constituency has a representative in Congress.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Frequently Asked Questions</h2>

        <h3>How many farm subsidy programs does the USDA have?</h3>
        <p>
          The USDA administers {stats.totalPrograms} distinct farm subsidy programs through the Farm
          Service Agency. The top 10 account for {(top10Total / total * 100).toFixed(0)}% of all spending,
          while dozens of micro-programs distribute minimal amounts.
        </p>

        <h3>What are zombie farm programs?</h3>
        <p>
          Zombie programs are USDA subsidy programs with fewer than 100 total payments — programs that
          persist through bureaucratic inertia despite serving almost nobody. There are {zombieCount} such
          programs. Each consumes administrative resources disproportionate to its impact.
        </p>

        <h3>Why are there so many programs?</h3>
        <p>
          Legislative layering (each Farm Bill adds without removing), commodity-specific designs,
          political compromises, emergency responses, and evolving conservation priorities all
          contribute. The political incentive to create new programs outweighs the work of
          streamlining, so the count only grows.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Sources</p>
          <p>USDA Farm Service Agency payment data ({stats.dataYears}). Program totals from FSA disbursement records.
          Explore all {stats.totalPrograms} programs on the <Link href="/programs" className="text-primary hover:underline">Programs page</Link> or
          see <Link href="/analysis/zombie-programs" className="text-primary hover:underline">zombie programs</Link> and{' '}
          <Link href="/categories" className="text-primary hover:underline">spending by category</Link>.</p>
        </div>

        <RelatedArticles currentSlug="program-proliferation" />
      </div>
    </article>
  )
}
