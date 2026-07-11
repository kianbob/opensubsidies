import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { fmt, fmtMoney, titleCase } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import RelatedArticles from '@/components/RelatedArticles'
import type { Metadata } from 'next'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Double Dippers: Recipients Collecting from Multiple Programs',
  description: 'Over 620,000 farm subsidy recipients collect from 3+ USDA programs simultaneously. Top recipients tap into 14 programs at once, raising questions about payment limit circumvention.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/double-dippers' },
  openGraph: {
    title: `Double Dippers: Recipients Collecting from Multiple Programs`,
    description: `Over 620,000 farm subsidy recipients collect from 3+ USDA programs simultaneously. Top recipients tap into 14 programs at once, raising questions about payment limit circumvention.`,
    url: 'https://www.opensubsidies.org/analysis/double-dippers',
    type: 'article',
  },
}

export default function DoubleDippersPage() {
  const data = loadData('multi-program.json') as {
    stats: { total_recipients: number; multi_2plus: number; multi_3plus: number; multi_5plus: number; multi_10plus: number }
    top: { name: string; state: string; programs: number; total: number }[]
  }
  const stats = loadData('stats.json')

  const multiPct2 = ((data.stats.multi_2plus / data.stats.total_recipients) * 100).toFixed(1)
  const multiPct3 = ((data.stats.multi_3plus / data.stats.total_recipients) * 100).toFixed(1)
  const topRecipient = data.top[0]
  const top20Total = data.top.reduce((s, r) => s + r.total, 0)
  const top20AvgPrograms = (data.top.reduce((s, r) => s + r.programs, 0) / data.top.length).toFixed(1)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="Double Dippers: Recipients Collecting from Multiple Programs" description="Over 620,000 farm subsidy recipients collect from 3+ USDA programs simultaneously." slug="analysis/double-dippers" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Double Dippers' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Double Dippers: Recipients Collecting from Multiple Programs',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.org' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How many farm subsidy recipients collect from multiple programs?', acceptedAnswer: { '@type': 'Answer', text: `${fmt(data.stats.multi_2plus)} recipients (${multiPct2}% of all recipients) collect from 2 or more programs. ${fmt(data.stats.multi_3plus)} collect from 3+, and ${fmt(data.stats.multi_10plus)} collect from 10+ programs simultaneously.` }},
          { '@type': 'Question', name: 'Is collecting from multiple farm programs illegal?', acceptedAnswer: { '@type': 'Answer', text: 'No. Collecting from multiple USDA programs is entirely legal. Programs like ARC, CRP, ELAP, and CFAP serve different purposes and are designed to stack. A rancher might legitimately qualify for disaster livestock payments, conservation payments, and commodity supports in the same year.' }},
          { '@type': 'Question', name: 'Is there a cap on total farm subsidies across all programs?', acceptedAnswer: { '@type': 'Answer', text: 'No. While individual programs have payment caps (typically $125,000/year for commodity programs), there is no aggregate cap across all programs. A recipient collecting from 10+ programs can legally receive well over $1 million annually from the USDA.' }},
          { '@type': 'Question', name: 'Who collects from the most farm programs?', acceptedAnswer: { '@type': 'Answer', text: topRecipient ? `The top multi-program recipient is ${titleCase(topRecipient.name)} of ${topRecipient.state}, collecting from ${topRecipient.programs} programs for a total of ${fmtMoney(topRecipient.total)}.` : 'Data not available.' }},
        ]
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Double Dippers: Recipients Collecting from Multiple Programs
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-lg text-gray-600">Over {fmt(data.stats.multi_3plus)} recipients collect from 3 or more USDA programs simultaneously.</p>
          <ShareButtons title="Double Dippers: Multi-Program Recipients" />
        </div>
      </div>

      <div className="prose max-w-none">
        {/* Stats */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: '2+ Programs', value: fmt(data.stats.multi_2plus) },
            { label: '3+ Programs', value: fmt(data.stats.multi_3plus) },
            { label: '5+ Programs', value: fmt(data.stats.multi_5plus) },
            { label: '10+ Programs', value: fmt(data.stats.multi_10plus) },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        <p>
          The USDA operates {stats.totalPrograms} distinct farm subsidy programs. Most recipients collect from
          just one or two. But a significant minority — {fmt(data.stats.multi_3plus)} recipients, or {multiPct3}% of
          all recipients — have figured out how to tap into three or more programs simultaneously. At the extreme,
          some recipients collect from {topRecipient?.programs || 'over a dozen'} programs at once.
        </p>

        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 Key Insight</p>
          <p className="text-sm text-gray-700 mt-1">
            While {multiPct2}% of recipients collect from 2+ programs, the top 20 multi-program recipients average
            {' '}{top20AvgPrograms} programs each and collected {fmtMoney(top20Total)} combined. Program stacking
            is legal — but it raises serious questions about who the system is really designed for.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Top 20 Multi-Program Recipients</h2>
        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2">#</th>
                <th className="text-left py-3 px-2">Recipient</th>
                <th className="text-left py-3 px-2">State</th>
                <th className="text-right py-3 px-2">Programs</th>
                <th className="text-right py-3 px-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.top.map((r, i) => (
                <tr key={r.name} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-2 text-gray-500">{i + 1}</td>
                  <td className="py-2 px-2 font-medium">{titleCase(r.name)}</td>
                  <td className="py-2 px-2">{r.state}</td>
                  <td className="text-right py-2 px-2 font-bold text-primary">{r.programs}</td>
                  <td className="text-right py-2 px-2">{fmtMoney(r.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Why This Happens</h2>
        <p>
          The USDA operates <Link href="/analysis/program-proliferation">{stats.totalPrograms} distinct programs</Link>, each with its own eligibility
          criteria, payment limits, and funding sources. A single farming operation can simultaneously collect from commodity programs
          (ARC, PLC), conservation programs (CRP, EQIP), disaster programs (ELAP, LFP), and emergency programs (CFAP, ERP) — all legally.
        </p>
        <p>
          This isn&apos;t necessarily fraud. Many of these programs serve different purposes and are designed to stack. A cattle rancher in
          Texas might legitimately receive disaster livestock payments, conservation stewardship payments, and commodity price supports
          in the same year. The programs were created independently to address different risks, and no one designed them to work
          as a coordinated system.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Sophistication Advantage</h2>
        <p>
          Navigating {stats.totalPrograms} programs requires expertise that most small farmers don&apos;t have.
          Large operations employ consultants, farm management companies, and accountants who specialize in
          maximizing program participation. They know which programs stack, which have separate payment limits,
          and how to structure entities to qualify for more.
        </p>
        <p>
          A small family farmer might know about CRP and maybe ARC/PLC. A sophisticated operation knows
          about ELAP, LFP, TAP, NAP, EQIP, CSP, and dozens of other programs — and has the staff to
          apply for all of them. The result: the complexity of the system itself becomes a barrier that
          concentrates benefits among the largest, most well-resourced operations.
        </p>
        <p>
          This is the opposite of what a well-designed safety net should do. Instead of directing resources
          to those who need them most, the system rewards those who are best at navigating bureaucracy.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Payment Limit Question</h2>
        <p>
          While individual programs have payment caps (typically $125,000/year), there&apos;s no aggregate cap across all programs.
          A recipient collecting from 10+ programs can legally receive well over $1 million annually from the USDA, far exceeding
          what any single program limit would allow.
        </p>
        <p>
          Some operations structure themselves as multiple LLCs or partnerships, with each entity qualifying independently for
          the same programs. This legal but controversial strategy effectively multiplies the payment limits.
          See our analysis on <Link href="/analysis/payment-limits">payment limits</Link> and <Link href="/analysis/corporate-farms">corporate recipients</Link>.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Case for an Aggregate Cap</h2>
        <p>
          If Congress is serious about payment limits, the obvious reform is an aggregate cap — a maximum
          total payment across all USDA programs per recipient per year. This would close the stacking
          loophole that allows sophisticated operations to collect far more than any individual program
          limit would suggest.
        </p>
        <p>
          The farm lobby opposes aggregate caps precisely because they would work. Current per-program
          limits are easy to circumvent through entity restructuring and program stacking. An aggregate
          cap would force a genuine conversation about how much any single operation should receive from
          taxpayers — and that&apos;s a conversation the biggest beneficiaries want to avoid.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Geographic Pattern</h2>
        <p>
          Multi-program recipients aren&apos;t distributed randomly across the country. They cluster in
          states with large, diversified agricultural operations — states where a single operation
          might raise cattle, grow row crops, and maintain conservation land simultaneously.
        </p>
        <p>
          Texas, with its enormous cattle industry and crop production, is heavily represented among
          multi-program recipients. The Great Plains states — Kansas, Nebraska, the Dakotas — also
          appear frequently, as operations there often combine commodity crop production with
          livestock and conservation programs.
        </p>
        <p>
          States with smaller, more specialized agricultural sectors tend to have fewer multi-program
          recipients. A dairy farm in Vermont or an orchard in Washington typically qualifies for
          far fewer programs than a diversified Great Plains operation. This geographic pattern
          reinforces the <Link href="/analysis/state-disparities">state disparities</Link> visible
          across the broader subsidy system.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Transparency Deficit</h2>
        <p>
          One of the most troubling aspects of multi-program collection is the difficulty of tracking
          total payments. The USDA reports payments by program, not by recipient across programs.
          A recipient collecting from 12 different programs appears in 12 different payment files,
          making it hard for journalists, researchers, or taxpayers to see the full picture.
        </p>
        <p>
          Our analysis cross-references these payment files to build a complete picture of multi-program
          collection. The results are eye-opening — but the fact that this cross-referencing isn&apos;t
          done by the USDA itself suggests a system that prefers opacity over accountability.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What the Data Tells Us</h2>
        <p>
          The multi-program data reveals a two-tier subsidy system. Most recipients — the small and mid-sized
          operations that politicians invoke when defending subsidies — collect from one or two programs and
          receive modest payments. But a class of sophisticated recipients has figured out how to maximize
          the system, collecting from many programs simultaneously and accumulating far larger totals.
        </p>
        <p>
          This isn&apos;t a bug in the system — it&apos;s the predictable result of {stats.totalPrograms} programs
          with no aggregate oversight. As long as programs are designed and administered independently,
          stacking will continue. The only question is whether taxpayers are comfortable subsidizing
          the expertise required to exploit it.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Reform Argument</h2>
        <p>
          The multi-program data makes the strongest case for an aggregate payment cap. If Congress
          believes $125,000 per year is a reasonable limit for commodity programs, why should
          recipients be able to collect unlimited amounts by stacking programs?
        </p>
        <p>
          An aggregate cap — say, $500,000 per year across all USDA programs per recipient and
          related entities — would be harder to evade than per-program limits and would ensure
          that no single operation receives an outsized share of taxpayer support. It would also
          be simpler to administer and easier for the public to understand.
        </p>
        <p>
          The farm lobby opposes aggregate caps because they would actually work. Current
          per-program limits are a political fig leaf — they let Congress claim to cap payments
          while allowing sophisticated operations to collect far more through stacking. An
          aggregate cap would expose this charade and force a genuine conversation about how
          much any single operation should receive from taxpayers.
        </p>
        <p>
          Until that conversation happens, multi-program collection will continue — and the
          gap between the most sophisticated recipients and everyone else will keep growing.
          The system rewards those who understand it best, not those who need it most.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Explore More</p>
          <p>See the top overall recipients on our <Link href="/recipients" className="text-primary hover:underline">Recipients page</Link>,
          or read about <Link href="/analysis/average-farmer" className="text-primary hover:underline">what the average farmer actually receives</Link>.</p>
        </div>
      </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Bottom Line</h2>
        <p>
          Multi-program collection isn&apos;t illegal, and in many cases it&apos;s a rational response
          to a system with {stats.totalPrograms} programs and per-program payment limits. But the
          scale of stacking — with top recipients tapping into {topRecipient?.programs || 'over a dozen'} programs
          and collecting {fmtMoney(topRecipient?.total || 0)} — raises fundamental questions about
          whether the system serves its intended purpose.
        </p>
        <p>
          When the most sophisticated recipients collect orders of magnitude more than typical
          farmers, the subsidy system isn&apos;t a safety net — it&apos;s a profit center. And when the
          complexity that enables this concentration is a feature rather than a bug, reform
          will require more than tweaking individual program rules. It will require rethinking
          the entire multi-program architecture that makes double (and triple, and quadruple)
          dipping not just possible, but easy for those who know the system.
        </p>
        <p>
          The data speaks for itself: {fmt(data.stats.multi_2plus)} recipients in 2+ programs,
          {' '}{fmt(data.stats.multi_5plus)} in 5+, and {fmt(data.stats.multi_10plus)} in 10+.
          These aren&apos;t edge cases — they&apos;re the predictable result of a {stats.totalPrograms}-program
          system with no aggregate limits. Until Congress addresses the structural incentives that
          reward program stacking, double dipping will remain a feature, not a bug, of American
          farm policy.
        </p>

        <p>
          Transparency is the antidote to program stacking. When taxpayers can see the total
          payments flowing to individual recipients across all programs, the scale of multi-program
          collection becomes impossible to ignore. This database exists to provide that transparency
          — and to arm voters with the data they need to demand better from their representatives.
        </p>      <RelatedArticles currentSlug="double-dippers" />
        <p>
          The {fmt(data.stats.multi_10plus)} recipients collecting from 10+ programs are a small
          group — but they represent the system working exactly as designed: rewarding those who
          understand it best, not those who need it most.
        </p>    </article>
  )
}
