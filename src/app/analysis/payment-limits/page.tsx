import Breadcrumbs from '@/components/Breadcrumbs'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Are Farm Subsidy Payment Limits Working?',
  description: 'Top recipients receive far more than the $125K/yr cap through LLCs and partnerships. An analysis of USDA payment data.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/payment-limits' },
  openGraph: {
    title: `Are Farm Subsidy Payment Limits Working?`,
    description: `Top recipients receive far more than the $125K/yr cap through LLCs and partnerships. An analysis of USDA payment data.`,
    url: 'https://www.opensubsidies.org/analysis/payment-limits',
    type: 'article',
  },
}

export default function PaymentLimits() {
  const recipients = loadData('top-recipients.json') as { name: string; state: string; city: string; amount: number; payments: number; topPrograms: { program: string; amount: number }[] }[]
  const stats = loadData('stats.json')

  const top20 = recipients.slice(0, 20)
  const avgTop20 = top20.reduce((s, r) => s + r.amount, 0) / top20.length
  const top20Total = top20.reduce((s, r) => s + r.amount, 0)
  const overLimit = recipients.filter(r => r.amount > 125000)
  const overLimitTotal = overLimit.reduce((s, r) => s + r.amount, 0)
  const llcRecipients = recipients.filter(r => /\b(LLC|LP|LLP|PARTNERSHIP|INC|CORP)/i.test(r.name))
  const llcTotal = llcRecipients.reduce((s, r) => s + r.amount, 0)
  const individualRecipients = recipients.filter(r => !/\b(LLC|LP|LLP|PARTNERSHIP|INC|CORP)/i.test(r.name))
  const topRecipient = recipients[0]
  const yearsInData = 9 // 2017-2025
  const annualCap = 125000
  const theoreticalMax = annualCap * yearsInData

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="Are Farm Subsidy Payment Limits Working?" description="Top recipients receive far more than the $125K/yr cap through LLCs and partnerships." slug="analysis/payment-limits" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Payment Limits' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Are Farm Subsidy Payment Limits Working?',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies' }, datePublished: '2026-02-27',
      })}} />

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the farm subsidy payment limit?', acceptedAnswer: { '@type': 'Answer', text: 'The current cap for most commodity programs is $125,000 per "person" per year. For married couples, it\'s $250,000. Emergency programs like CFAP have had separate, often higher limits. Conservation programs like CRP have their own payment limits.' }},
          { '@type': 'Question', name: 'How do farmers exceed the $125,000 payment limit?', acceptedAnswer: { '@type': 'Answer', text: 'Three main strategies: (1) Entity restructuring — creating multiple LLCs or partnerships, each qualifying as a separate "person" with its own $125K limit; (2) Program stacking — limits apply per-program, so collecting from multiple programs bypasses any single cap; (3) Emergency exceptions — disaster programs often have separate or no limits.' }},
          { '@type': 'Question', name: 'How much do top farm subsidy recipients actually receive?', acceptedAnswer: { '@type': 'Answer', text: `The top 20 recipients averaged ${fmtMoney(avgTop20)} each over our data period — more than ${Math.round(avgTop20 / theoreticalMax)}× what the theoretical 9-year cap of ${fmtMoney(theoreticalMax)} would allow from commodity programs alone.` }},
          { '@type': 'Question', name: 'Should farm subsidy payment limits be reformed?', acceptedAnswer: { '@type': 'Answer', text: 'Payment limits have three structural weaknesses: entity restructuring, program stacking, and emergency exceptions. Reformers propose aggregate caps across all programs, means testing based on income, and restrictions on entity-based limit multiplication. The farm lobby opposes all such reforms.' }},
        ]
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Are Farm Subsidy Payment Limits Working?
        </h1>
        <ShareButtons title="" />
        <p className="text-lg text-gray-600">
          Federal law caps most commodity payments at $125,000 per person per year. Yet the top recipients
          in the USDA database have collected millions. How?
        </p>
      </div>

      {/* Key Finding */}
      <div className="bg-green-50 border-l-4 border-primary p-5 rounded-r-lg mb-8">
        <p className="font-semibold text-primary text-sm uppercase tracking-wide mb-1">Key Finding</p>
        <p className="text-gray-900 font-medium">
          The top 20 recipients averaged {fmtMoney(avgTop20)} each — more than {Math.round(avgTop20 / 125000)}× the annual cap.
          At least {fmt(overLimit.length)} recipients in our database exceeded $125K in total payments.
        </p>
      </div>

      <div className="prose max-w-none">
        {/* Stats grid */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Annual Cap (Commodity)', value: '$125,000' },
            { label: 'Top 20 Average', value: fmtMoney(avgTop20) },
            { label: 'Recipients Over $125K', value: fmt(overLimit.length) },
            { label: 'LLC/Corp Recipients', value: fmt(llcRecipients.length) },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The $125,000 Cap — In Theory</h2>
        <p>
          Since the 1970s, Congress has tried to limit how much any single recipient can collect. The current cap
          for most commodity programs is $125,000 per &quot;person&quot; per year. For married couples, it&apos;s $250,000. Emergency
          programs like the Coronavirus Food Assistance Program had their own, often higher, limits.
        </p>
        <p>
          If payment limits worked as intended, no single recipient could collect more than {fmtMoney(theoreticalMax)} from
          commodity programs over our nine-year data period (2017–2025). Yet the top recipient, {topRecipient?.name},
          collected {fmtMoney(topRecipient?.amount)} — {(topRecipient?.amount / theoreticalMax).toFixed(1)}× the theoretical maximum.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Three Loopholes</h2>
        <p>
          Payment limits fail for three distinct reasons, and sophisticated operations exploit all three:
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">1. The LLC Loophole</h3>
        <p>
          The key word is &quot;person.&quot; Under USDA rules, an LLC or partnership qualifies as a &quot;person.&quot; Each member
          of a partnership can claim their own $125K limit. A family operation structured as three separate LLCs
          with two partners each could theoretically collect $750,000 — six times the &quot;limit.&quot;
        </p>
        <p>
          In our data, {fmt(llcRecipients.length)} of the top recipients are LLCs, partnerships, or corporations,
          collecting a combined {fmtMoney(llcTotal)}. The corporate entity structure isn&apos;t just for liability
          protection — it&apos;s a payment limit multiplier.
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">2. Program Stacking</h3>
        <p>
          Payment limits apply per-program, not across all programs. A recipient collecting from ARC, CRP,
          ELAP, and CFAP has four separate limits. As our <Link href="/analysis/double-dippers">double dippers analysis</Link> shows,
          some recipients collect from 10+ programs simultaneously, effectively eliminating any meaningful cap
          on total payments.
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">3. Emergency Exceptions</h3>
        <p>
          Emergency programs often have their own, separate payment limits — or none at all. CFAP initially had
          a $250,000 limit but was later expanded. Trade war payments had different caps. When emergency
          programs <Link href="/analysis/decade-of-disaster">dominate the spending landscape</Link>, regular program
          limits become increasingly irrelevant.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Top 20 Recipients</h2>
        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">#</th>
                  <th className="px-4 py-2 text-left font-semibold">Recipient</th>
                  <th className="px-4 py-2 text-left font-semibold">Location</th>
                  <th className="px-4 py-2 text-right font-semibold">Total</th>
                  <th className="px-4 py-2 text-right font-semibold">× Annual Cap</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {top20.map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-2 font-medium">{r.name}</td>
                    <td className="px-4 py-2 text-gray-600">{r.city}, {r.state}</td>
                    <td className="px-4 py-2 text-right font-mono text-primary">{fmtMoney(r.amount)}</td>
                    <td className="px-4 py-2 text-right font-mono text-red-600">{(r.amount / annualCap).toFixed(1)}×</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            &quot;× Annual Cap&quot; shows total payments as a multiple of the $125,000 annual commodity payment limit.
            Note: not all payments are commodity payments, and limits apply per year, not cumulatively.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Political Economy of Limits</h2>
        <p>
          Payment limits have been debated in every farm bill since the 1970s. Reformers push for lower limits
          and tighter enforcement. The farm lobby pushes back, arguing that limits hurt &quot;family farms&quot; —
          conveniently defined to include multi-million-dollar operations.
        </p>
        <p>
          The result is a bipartisan charade: Congress passes limits that look meaningful on paper, then
          carves out enough exceptions and definitions to render them toothless in practice. Voters see
          a &quot;$125,000 cap&quot; and assume it works. Recipients know better.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Why Limits Don&apos;t Work</h2>
        <p>
          Payment limits have three structural weaknesses: entity restructuring (splitting into multiple LLCs),
          program stacking (limits apply per-program, not across all programs), and emergency exceptions
          (disaster programs often have separate or no limits). Until Congress addresses all three, the
          $125K cap will remain more aspiration than reality.
        </p>
        <p>
          The simplest reform would be an aggregate annual cap across all programs — say, $500,000 per entity
          and all related entities. This would be harder to circumvent than per-program limits and would
          ensure that no single operation receives an outsized share of taxpayer support. But simplicity
          is the enemy of the farm lobby, which profits from complexity.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The History of Limit Evasion</h2>
        <p>
          Payment limits have been part of farm policy since 1970, when Congress first capped direct
          payments at $55,000 per person. Over the following decades, a predictable pattern emerged:
          Congress sets a limit, the farm lobby finds workarounds, Congress tightens the rules, the
          farm lobby finds new workarounds.
        </p>
        <p>
          The 1987 &quot;person&quot; rule expanded the definition to include entities. The 1996 Freedom to Farm
          Act loosened limits. The 2002 Farm Bill tried to tighten them. The 2014 Farm Bill introduced
          the current $125,000 framework. At every stage, the limits looked meaningful on paper but
          proved porous in practice.
        </p>
        <p>
          After fifty years of limit evasion, the evidence is clear: per-program, per-entity limits
          don&apos;t work. They create an arms race between regulators and recipients, with recipients
          consistently winning because they have more at stake and more resources to devote to
          compliance creativity.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The International Comparison</h2>
        <p>
          Other countries take different approaches. The European Union caps Common Agricultural Policy
          payments and applies &quot;degressivity&quot; — reducing payment rates above certain thresholds. Some
          EU members also apply &quot;capping&quot; — hard limits on total payments per farm. These policies
          have proven more effective than the U.S. approach, partly because they apply across all
          programs and partly because entity restructuring is harder under EU rules.
        </p>
        <p>
          New Zealand eliminated farm subsidies entirely in the 1980s. Its agricultural sector,
          after an initial adjustment period, became more efficient and globally competitive.
          The lesson: farming can thrive without subsidies — and without the elaborate payment
          limit games that subsidies create.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What Meaningful Reform Looks Like</h2>
        <p>
          Genuine payment limit reform would include:
        </p>
        <ul>
          <li><strong>Aggregate caps:</strong> A single limit across all programs, not just commodity payments</li>
          <li><strong>Entity attribution:</strong> All related entities (same ownership, same land) counted as one recipient</li>
          <li><strong>Means testing:</strong> Phaseout for operations with adjusted gross income above $900,000 (current threshold, but with loopholes)</li>
          <li><strong>Emergency alignment:</strong> Same limits for emergency programs as regular programs</li>
        </ul>
        <p>
          For more on the corporate entities benefiting from weak limits, see our{' '}
          <Link href="/analysis/corporate-farms">corporate farm recipients analysis</Link>. To understand the
          full scale of spending, explore <Link href="/analysis/what-147b-buys">what $147 billion could buy instead</Link>.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Sources</p>
          <p>USDA Farm Service Agency payment data (2017–2025). Recipient names and amounts from FSA payment files.
          See the full list on our <Link href="/recipients" className="text-primary hover:underline">Top Recipients page</Link>.</p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Bottom Line</h2>
        <p>
          After fifty years of payment limits, the evidence is clear: they don&apos;t work as
          designed. Per-program caps with entity-based definitions are too easily circumvented
          by sophisticated operations. Emergency exceptions undermine the limits further.
          Program stacking allows total payments far beyond any individual cap.
        </p>
        <p>
          The result is a system that looks like it has guardrails but doesn&apos;t. The $125,000 cap
          gives politicians cover (&quot;we limit payments!&quot;) while allowing the biggest operations
          to collect millions. It&apos;s the worst of both worlds: enough regulation to create
          compliance costs for small farmers, but not enough to actually limit payments to
          large ones.
        </p>
        <p>
          Genuine reform requires starting from the other direction: set a meaningful aggregate
          cap that applies across all programs and all related entities, then design the
          rules around enforcement rather than evasion. Until that happens, the $125,000
          &quot;limit&quot; will remain what it has always been — a political fiction that protects the
          status quo while pretending to constrain it.
        </p>
        <p>
          The data on this page makes the case plainly: with top recipients collecting
          {fmtMoney(avgTop20)} on average and {fmt(overLimit.length)} recipients exceeding the
          supposed cap, payment limits are a mirage. Taxpayers deserve to know that the &quot;limits&quot;
          their representatives voted for exist on paper only — and that the biggest beneficiaries
          of the farm subsidy system have always found ways around them.
        </p>
        <p>
          The farm subsidy payment limit is perhaps the most successful piece of political theater
          in federal spending policy. It satisfies reformers who want to see limits on paper. It
          satisfies the farm lobby because it doesn&apos;t limit anything in practice. And it leaves
          taxpayers funding a system where the $125,000 &quot;cap&quot; is exceeded routinely by the
          operations that need it least.
        </p>
        <p>
          If you believe government spending should be accountable, transparent, and effective,
          the farm subsidy payment limit is exhibit A in the case for reform. The $125,000 cap
          sounds reasonable. The data proves it&apos;s meaningless. And until voters understand that
          gap, nothing will change.
        </p>
        <RelatedArticles currentSlug="payment-limits" />
      </div>
    </article>
  )
}
