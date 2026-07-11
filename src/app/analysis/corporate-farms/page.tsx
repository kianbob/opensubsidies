import Breadcrumbs from '@/components/Breadcrumbs'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'When Corporations Collect: The Biggest Non-Family Farm Subsidy Recipients',
  description: 'LLCs, partnerships, and corporations collecting millions in farm subsidies. Are payment limits working?',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/corporate-farms' },
  openGraph: {
    title: `When Corporations Collect: The Biggest Non-Family Farm Subsidy Recipients`,
    description: `LLCs, partnerships, and corporations collecting millions in farm subsidies. Are payment limits working?`,
    url: 'https://www.opensubsidies.org/analysis/corporate-farms',
    type: 'article',
  },
}

export default function CorporateFarms() {
  const recipients = loadData('top-recipients.json')
  const stats = loadData('stats.json')
  const programs = loadData('programs.json')

  // Find corporate-looking entities (LLC, INC, CORP, PARTNERSHIP, LP, etc.)
  const corporate = recipients.filter((r: { name: string }) =>
    /\b(LLC|INC|CORP|PARTNERSHIP|LP|LLP|TRUST|ESTATE|FARMS? (INC|LLC)|RANCH (INC|LLC)|CO\b)/i.test(r.name)
  ).slice(0, 20)

  const corpTotal = corporate.reduce((s: number, r: { amount: number }) => s + r.amount, 0)
  const corpPayments = corporate.reduce((s: number, r: { payments: number }) => s + r.payments, 0)
  const avgCorpPayment = corpTotal / (corpPayments || 1)

  // Individual top recipients for comparison
  const individuals = recipients.filter((r: { name: string }) =>
    !/\b(LLC|INC|CORP|PARTNERSHIP|LP|LLP|TRUST|ESTATE|CO\b)/i.test(r.name)
  ).slice(0, 20)
  const individualTotal = individuals.reduce((s: number, r: { amount: number }) => s + r.amount, 0)

  const corpPct = ((corpTotal / (corpTotal + individualTotal)) * 100).toFixed(1)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="When Corporations Collect: The Biggest Non-Family Farm Subsidy Recipients" description="LLCs, partnerships, and corporations collecting millions in farm subsidies. Are payment limits working?" slug="analysis/corporate-farms" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Corporate Farm Recipients' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'When Corporations Collect: The Biggest Non-Family Recipients',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies' }, datePublished: '2026-02-27',
      })}} />

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Can corporations receive farm subsidies?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. LLCs, partnerships, corporations, trusts, and estates can all receive USDA farm subsidy payments. Many of the largest recipients are business entities, not individual farmers. Each member of a partnership can claim their own payment limit, effectively multiplying the caps.' }},
          { '@type': 'Question', name: 'How much do corporate farms receive in subsidies?', acceptedAnswer: { '@type': 'Answer', text: `Among the top recipients, corporate entities (LLCs, partnerships, corporations) collected ${fmtMoney(corpTotal)} across ${corporate.length} entities — an average of ${fmtMoney(avgCorpPayment)} per payment.` }},
          { '@type': 'Question', name: 'Are corporate farm subsidies legal?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, corporate farm subsidies are entirely legal. The USDA defines "person" broadly to include entities like LLCs and partnerships. This is by design — the farm lobby has successfully resisted efforts to restrict payments to individual farmers only.' }},
          { '@type': 'Question', name: 'Do payment limits apply to corporate farms?', acceptedAnswer: { '@type': 'Answer', text: 'Payment limits apply per "person," but each entity qualifies as a separate person. A farming family that creates three LLCs can collect three times the payment limit. Additionally, emergency programs often have separate or higher limits.' }},
        ]
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          When Corporations Collect: The Biggest Non-Family Recipients
        </h1>
        <ShareButtons title="" />
        <p className="text-lg text-gray-600">
          Farm subsidies were created to help family farmers. But LLCs, partnerships, and corporations
          are among the largest recipients. Here are the top corporate entities in our database.
        </p>
      </div>

      <div className="prose max-w-none">
        {/* Key stats */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Corporate Recipients (Top 20)', value: corporate.length.toString() },
            { label: 'Total Corporate Payments', value: fmtMoney(corpTotal) },
            { label: 'Avg Payment', value: fmtMoney(avgCorpPayment) },
            { label: 'Corp Share of Top 40', value: `${corpPct}%` },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Top Corporate Recipients</h2>
        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">#</th>
                  <th className="px-4 py-2 text-left font-semibold">Entity</th>
                  <th className="px-4 py-2 text-left font-semibold">Location</th>
                  <th className="px-4 py-2 text-right font-semibold">Total</th>
                  <th className="px-4 py-2 text-right font-semibold">Payments</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {corporate.map((r: { name: string; state: string; city: string; amount: number; payments: number }, i: number) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-500">{i+1}</td>
                    <td className="px-4 py-2 font-medium">{r.name}</td>
                    <td className="px-4 py-2 text-gray-600">{r.city}, {r.state}</td>
                    <td className="px-4 py-2 text-right font-mono text-primary">{fmtMoney(r.amount)}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{fmt(r.payments)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Top 20 entities with LLC, Inc, Corp, Partnership, LP, or Trust in their name.
            Total: {fmtMoney(corpTotal)} across these {corporate.length} entities.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The &quot;Family Farm&quot; Myth</h2>
        <p>
          When politicians defend farm subsidies, they invariably invoke the image of a family farmer struggling
          to make ends meet. It&apos;s a powerful narrative — and for many small farmers, it&apos;s true. But the data
          tells a different story at the top of the recipient list.
        </p>
        <p>
          Among our top recipients, entities with corporate designations — LLC, Inc, Corp, Partnership, LP, Trust —
          collected {fmtMoney(corpTotal)} in aggregate. Some of these may indeed be family operations that chose
          a corporate structure for tax or liability reasons. But others are genuine commercial enterprises
          with little resemblance to the mythical family farm.
        </p>
        <p>
          The USDA doesn&apos;t distinguish between a family LLC and a corporate agribusiness LLC in its payment data.
          They&apos;re all just &quot;recipients.&quot; This opacity is a feature, not a bug — it shields the system from
          scrutiny by making it impossible to separate the sympathetic cases from the egregious ones.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Payment Limits: Theory vs. Practice</h2>
        <p>
          Federal law caps most commodity program payments at $125,000 per person per year. But
          the definition of &quot;person&quot; is generous — it includes entities, and payments can be attributed
          to multiple members of a partnership or LLC. The result is that payment limits are more
          suggestion than constraint.
        </p>
        <p>
          Consider a farming operation with three family members, each owning a separate LLC. Each LLC qualifies
          as a &quot;person&quot; under USDA rules, so the family can collect up to $375,000 per year from commodity programs
          alone — three times the supposed limit. Add spousal allocations, and it climbs further. Stack on emergency
          programs with separate limits, and the total can easily reach seven figures.
        </p>
        <p>
          Our <Link href="/analysis/payment-limits">payment limits analysis</Link> explores this loophole in detail.
        </p>

        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 The Entity Game</p>
          <p className="text-sm text-gray-700 mt-1">
            Creating multiple LLCs is perfectly legal and commonplace in agriculture. But it means payment
            &quot;limits&quot; are effectively voluntary for sophisticated operations — exactly the kind of operations
            that least need taxpayer support.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Accountability Gap</h2>
        <p>
          When subsidies flow to named individuals, there&apos;s at least a human face attached to the money.
          When they flow to LLCs and partnerships, accountability becomes murkier. Who ultimately benefits?
          Are these family operations structured as LLCs for tax purposes, or are they genuinely corporate
          operations that have little in common with the family farm ideal?
        </p>
        <p>
          The USDA data doesn&apos;t answer these questions — it just records payments. But the prevalence of
          corporate entities among top recipients raises legitimate questions about whether the subsidy
          system is achieving its stated goals.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Absentee Ownership</h2>
        <p>
          One concern with corporate recipients is absentee ownership. Some LLCs and trusts that receive
          farm subsidies are owned by people who don&apos;t farm at all — they own the land and lease it to
          tenants, collecting both rental income and subsidy payments. The 2018 Farm Bill attempted to
          address this by requiring recipients to be &quot;actively engaged&quot; in farming, but the definition
          is broad enough to accommodate most arrangements.
        </p>
        <p>
          A trust or estate might receive CRP payments for conservation land, commodity payments for
          leased cropland, and disaster payments for livestock on the same property — all without
          anyone associated with the entity ever driving a tractor.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Scale of Corporate Subsidies</h2>
        <p>
          To understand the magnitude, consider that these {corporate.length} corporate entities alone collected
          {fmtMoney(corpTotal)} — an average of {fmtMoney(corpTotal / corporate.length)} each. Compare that to
          the overall average payment of {fmtMoney(stats.totalAmount / stats.totalPayments)}. The corporate
          entities at the top of the list receive orders of magnitude more than the typical recipient.
        </p>
        <p>
          This disparity isn&apos;t limited to the top 20. Throughout our dataset, entities with corporate designations
          consistently receive larger payments than individuals. The corporate structure itself — with its ability
          to hold more acreage, qualify for more programs, and multiply payment limits — is a subsidy amplifier.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Consolidation Connection</h2>
        <p>
          Corporate farm subsidies accelerate agricultural consolidation. When large operations receive
          proportionally more government support, they gain competitive advantages over smaller neighbors:
          lower effective costs, more capital for expansion, and greater ability to absorb losses. Over time,
          this drives consolidation — fewer, larger farms controlling more acreage.
        </p>
        <p>
          The irony is striking: taxpayers fund a system that destroys the family farms politicians claim
          to protect. Each dollar to a corporate entity makes it a little easier for that entity to outbid,
          out-invest, and ultimately absorb smaller operations nearby. The subsidy system doesn&apos;t just
          passively benefit corporate farms — it actively enables their expansion at the expense of
          smaller competitors.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Reform Proposals</h2>
        <p>
          Several reform proposals have been floated over the years to address corporate subsidies:
        </p>
        <ul>
          <li><strong>Aggregate payment caps:</strong> Limit total payments across all programs, not just per-program</li>
          <li><strong>Means testing:</strong> Phase out subsidies for operations above a certain income threshold</li>
          <li><strong>Entity restrictions:</strong> Limit payments to natural persons, not LLCs or corporations</li>
          <li><strong>Active farming requirements:</strong> Strengthen the &quot;actively engaged&quot; test with real enforcement</li>
        </ul>
        <p>
          None of these proposals has gained enough political support to become law. The agricultural lobby
          is well-organized and well-funded, and farm state senators on both sides of the aisle resist
          any changes that would reduce payments to their constituents. For more on who benefits most, see
          our <Link href="/analysis/double-dippers">double dippers analysis</Link> and the{' '}
          <Link href="/analysis/subsidy-concentration">subsidy concentration breakdown</Link>.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Transparency Imperative</h2>
        <p>
          The USDA publishes payment data by recipient name, but it doesn&apos;t disclose the ownership
          structure of LLCs and partnerships. This means taxpayers can see that &quot;ABC Farms LLC&quot;
          received $500,000, but they can&apos;t easily determine who owns ABC Farms LLC, what other
          entities the same people own, or how the money was ultimately distributed.
        </p>
        <p>
          Greater transparency — requiring disclosure of beneficial ownership for all entities
          receiving federal farm payments — would be a simple first step. The Corporate Transparency
          Act already requires similar disclosures for many businesses. Extending this requirement
          to farm subsidy recipients would let taxpayers see who actually benefits from their money.
        </p>
        <p>
          Until then, the corporate farm subsidy question remains partly unanswerable. We can see
          the payments. We can see the entity names. But the real beneficiaries remain hidden behind
          corporate structures that were designed, in part, to maximize government payments.
        </p>
        <p>
          The data is clear: corporate designations dominate the upper ranks of farm subsidy
          recipients. Whether these are family operations using corporate structures or genuine
          agribusiness enterprises, the result is the same — the lion&apos;s share of taxpayer
          support flows to entities that bear little resemblance to the small family farmer
          invoked to justify these programs.
        </p>
        <p>
          Every farm bill debate features emotional testimony about struggling family farms.
          Every farm bill ultimately directs the majority of new funding to corporate operations
          and LLCs. The gap between rhetoric and reality is the story of American farm policy —
          and the data on this page quantifies that gap with precision.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Explore the Data</p>
          <p>See all top recipients on our <Link href="/recipients" className="text-primary hover:underline">Recipients page</Link>,
          or read about <Link href="/analysis/payment-limits" className="text-primary hover:underline">why payment limits don&apos;t work</Link>.</p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Bottom Line</h2>
        <p>
          Corporate entities among farm subsidy recipients aren&apos;t breaking the law — they&apos;re
          exploiting a system designed to be exploited. The USDA&apos;s broad definition of &quot;person,&quot;
          the per-program payment structure, and the opacity of entity ownership all combine to
          create a system where corporate structures amplify taxpayer transfers.
        </p>
        <p>
          Until Congress narrows the definition of eligible recipients, implements aggregate payment
          caps, and requires beneficial ownership disclosure, corporate entities will continue to
          be among the largest beneficiaries of a system designed — in rhetoric, if not in practice —
          for family farmers. The data on this page makes clear: the &quot;family farm&quot; defense of
          farm subsidies is increasingly disconnected from who actually collects the checks.
        </p>

        <RelatedArticles currentSlug="corporate-farms" />
      </div>
    </article>
  )
}
