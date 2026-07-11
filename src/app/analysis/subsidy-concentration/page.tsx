import Breadcrumbs from '@/components/Breadcrumbs'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'The 10% Problem: How Most Farm Subsidies Go to the Biggest Operations',
  description: '69% of American farms receive zero federal subsidy payments. The top 10% of recipients collect nearly three-fourths of all farm subsidies. Here\'s the data.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/subsidy-concentration' },
  openGraph: {
    title: `The 10% Problem: How Most Farm Subsidies Go to the Biggest Operations`,
    description: `69% of American farms receive zero federal subsidy payments. The top 10% of recipients collect nearly three-fourths of all farm subsidies. Here's the data.`,
    url: 'https://www.opensubsidies.org/analysis/subsidy-concentration',
    type: 'article',
  },
}

export default function SubsidyConcentration() {
  const stats = loadData('stats.json')
  const states = loadData('states.json')
  const recipients = loadData('top-recipients.json')
  const programs = loadData('programs.json')

  const top10Amount = recipients.slice(0, 100).reduce((s: number, r: { amount: number }) => s + r.amount, 0)
  const top1Amount = recipients.slice(0, 10).reduce((s: number, r: { amount: number }) => s + r.amount, 0)
  const top50Amount = recipients.slice(0, 50).reduce((s: number, r: { amount: number }) => s + r.amount, 0)
  const avgTop10 = top1Amount / 10
  const top5States = states.slice(0, 5)
  const top5StatesTotal = top5States.reduce((s: number, st: { amount: number }) => s + st.amount, 0)
  const top5StatesPct = ((top5StatesTotal / stats.totalAmount) * 100).toFixed(1)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="The 10% Problem: How Most Farm Subsidies Go to the Biggest Operations" description="69% of American farms receive zero federal subsidy payments. The top 10% of recipients collect nearly three-fourths of all farm subsidies." slug="analysis/subsidy-concentration" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Subsidy Concentration' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'The 10% Problem: How Most Farm Subsidies Go to the Biggest Operations',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.org' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What percentage of farms receive subsidies?', acceptedAnswer: { '@type': 'Answer', text: 'According to USDA data, approximately 69% of U.S. farms receive zero federal subsidy payments. Among those that do receive subsidies, the distribution is heavily skewed — the top 10% of recipients collect roughly three-quarters of all subsidy dollars.' }},
          { '@type': 'Question', name: 'How much do top farm subsidy recipients receive?', acceptedAnswer: { '@type': 'Answer', text: `The top 10 recipients in our database collected ${fmtMoney(top1Amount)} combined, averaging ${fmtMoney(avgTop10)} each. The top 100 recipients collected ${fmtMoney(top10Amount)}.` }},
          { '@type': 'Question', name: 'Why are farm subsidies so concentrated?', acceptedAnswer: { '@type': 'Answer', text: 'Farm subsidies are tied to commodity production — corn, soybeans, wheat, cotton, and rice. Larger operations grow more of these crops and therefore qualify for larger payments. The subsidy system rewards scale, not need, which concentrates payments among the biggest producers.' }},
          { '@type': 'Question', name: 'Do farm subsidies help family farmers?', acceptedAnswer: { '@type': 'Answer', text: 'Some family farmers benefit, but the system disproportionately helps large operations. A typical small farm might receive a few thousand dollars in CRP payments, while large commodity operations receive hundreds of thousands or millions. The structure of the programs — based on production volume and acreage — inherently favors scale.' }},
        ]
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          The 10% Problem: How Most Farm Subsidies Go to the Biggest Operations
        </h1>
        <ShareButtons title="" />
        <p className="text-lg text-gray-600">
          The federal government distributed {fmtMoney(stats.totalAmount)} in farm subsidies from 2017 to 2025 —
          but the money is staggeringly concentrated. According to the USDA, 69% of American farms receive
          zero federal subsidy payments. The rest is dominated by the largest operations.
        </p>
      </div>

      <div className="prose max-w-none">
        {/* Key stats grid */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Total Distributed', value: fmtMoney(stats.totalAmount) },
            { label: 'Farms Getting $0', value: '69%' },
            { label: 'Top 10 Recipients', value: fmtMoney(top1Amount) },
            { label: 'Top 100 Recipients', value: fmtMoney(top10Amount) },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Numbers Don&apos;t Lie</h2>
        <p>
          Our analysis of {fmt(stats.totalPayments)} USDA payment records reveals a subsidy system
          that overwhelmingly rewards scale over need:
        </p>

        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 Key Finding</p>
          <p className="text-sm text-gray-700 mt-1">
            The top 100 recipients in our database collected {fmtMoney(top10Amount)} — while
            the USDA reports that 69% of all U.S. farms received nothing. The top 50 alone collected {fmtMoney(top50Amount)}.
          </p>
        </div>

        <p>
          This isn&apos;t a new problem. The Environmental Working Group has tracked this trend since 1995.
          But the pattern has only intensified. Emergency and disaster programs — which now account for
          over half of all farm spending — have further concentrated payments among the largest producers.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Concentration Pyramid</h2>
        <p>
          Think of farm subsidies as a pyramid:
        </p>
        <ul>
          <li><strong>Top 10 recipients:</strong> {fmtMoney(top1Amount)} — averaging {fmtMoney(avgTop10)} each</li>
          <li><strong>Top 50 recipients:</strong> {fmtMoney(top50Amount)}</li>
          <li><strong>Top 100 recipients:</strong> {fmtMoney(top10Amount)}</li>
          <li><strong>Bottom 69% of farms:</strong> $0</li>
        </ul>
        <p>
          The shape of this pyramid hasn&apos;t changed in decades. If anything, emergency spending has made it
          pointier. Programs like CFAP and ERP distribute payments proportional to production volume —
          meaning the biggest producers automatically get the biggest checks.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Where the Money Goes</h2>
        <p>
          The largest single program in our dataset is the <strong>{programs[0]?.program}</strong> at
          {' '}{fmtMoney(programs[0]?.amount)}, followed by disaster relief and conservation payments. These emergency
          programs were designed as safety nets, but in practice they&apos;ve become reliable income streams for the biggest operations.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Geographic Divide</h2>
        <p>
          Five states — {top5States.map((s: { name: string; amount: number }, i: number) => (
            <span key={s.name}>{s.name} ({fmtMoney(s.amount)}){i < 4 ? ', ' : ''}</span>
          ))} — account for {top5StatesPct}% of total subsidies.
          States with smaller agricultural sectors receive proportionally less, creating a geographic
          concentration that mirrors the individual-level concentration.
        </p>
        <p>
          Our <Link href="/analysis/state-disparities">state disparities analysis</Link> explores this geographic
          divide in detail, showing how the top subsidy states receive 100× more than the bottom states.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Why Concentration Matters</h2>
        <p>
          Concentrated subsidies don&apos;t just raise fairness questions — they actively accelerate the consolidation
          of American agriculture. When large operations receive more government support, they can:
        </p>
        <ul>
          <li>Outbid smaller farms for land leases (subsidies inflate land values)</li>
          <li>Absorb losses that would bankrupt smaller competitors</li>
          <li>Invest in equipment and expansion that further increases their cost advantage</li>
          <li>Afford the consultants and accountants needed to maximize program participation</li>
        </ul>
        <p>
          The result is a feedback loop: subsidies help large operations get larger, which qualifies them
          for even more subsidies, which helps them get even larger. Taxpayers are effectively funding
          the consolidation of an industry — the opposite of what &quot;family farm&quot; rhetoric suggests.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Policy Question</h2>
        <p>
          Farm subsidies were originally designed to protect family farmers from market volatility and
          natural disasters. But when the majority of payments flow to large corporate operations,
          the question becomes: are taxpayers subsidizing agriculture, or subsidizing agricultural consolidation?
        </p>
        <p>
          Payment limits exist in theory — the 2018 Farm Bill caps most commodity payments at $125,000
          per person per year. But through partnerships, LLCs, and family attribution rules, many operations
          receive far more. Our <Link href="/analysis/payment-limits">payment limits analysis</Link> shows how
          top recipients routinely exceed the supposed caps.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What the Data Shows</h2>
        <p>
          The top recipient in our database, <strong>{recipients[0]?.name}</strong> of {recipients[0]?.city}, {recipients[0]?.state},
          collected {fmtMoney(recipients[0]?.amount)} in {recipients[0]?.payments} payments. The top 10 recipients
          averaged {fmtMoney(avgTop10)} each.
        </p>
        <p>
          Meanwhile, the typical small farmer — growing vegetables for a local market, raising a few
          dozen head of cattle — qualifies for few if any of these programs. The subsidy system, as
          currently structured, rewards acreage and commodity production, not agricultural diversity
          or food security.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The International Perspective</h2>
        <p>
          The United States isn&apos;t unique in concentrating farm subsidies among large operations, but
          it&apos;s among the worst offenders. The European Union has implemented payment degression —
          reducing per-hectare payments above certain thresholds — to push more money toward smaller
          farms. Some EU countries cap total payments per farm.
        </p>
        <p>
          These approaches aren&apos;t perfect, but they at least acknowledge the concentration problem
          and attempt to address it. U.S. farm policy, by contrast, has per-program payment limits
          that are easily circumvented and no structural mechanism to prevent concentration.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Food Security Argument</h2>
        <p>
          Defenders of the current system argue that subsidizing large operations ensures food security
          through scale and efficiency. There&apos;s a kernel of truth here — large operations do produce
          food more cheaply per unit. But the argument confuses correlation with causation.
        </p>
        <p>
          Large operations would exist without subsidies. The question is whether subsidies make them
          larger than they would otherwise be, and whether that additional scale serves the public
          interest or just private profit. When the top 10% of operations collect 75% of subsidies,
          it&apos;s hard to argue the money is targeting food security rather than rewarding political
          connections and bureaucratic savvy.
        </p>
        <p>
          Indeed, most food security experts argue that agricultural <em>diversity</em> — not
          concentration — is the key to resilient food systems. A system that concentrates production
          in fewer hands and fewer crops is more vulnerable to disruption, not less.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Path to Reform</h2>
        <p>
          Reducing concentration would require fundamental changes to how subsidies are structured:
        </p>
        <ul>
          <li><strong>Tiered payments:</strong> Higher per-acre rates for smaller operations, declining as acreage increases</li>
          <li><strong>Aggregate caps:</strong> A meaningful limit on total payments across all programs</li>
          <li><strong>Means testing:</strong> Phasing out subsidies for operations above an income threshold</li>
          <li><strong>Diversification incentives:</strong> Programs that reward crop diversity rather than commodity monocultures</li>
        </ul>
        <p>
          For more on how the biggest recipients game the system, see our analysis of{' '}
          <Link href="/analysis/corporate-farms">corporate farm recipients</Link> and{' '}
          <Link href="/analysis/double-dippers">multi-program recipients</Link>. For the human story behind
          the averages, read about <Link href="/analysis/average-farmer">what the average farmer actually gets</Link>.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Source</p>
          <p>Analysis based on {fmt(stats.totalPayments)} USDA Farm Service Agency payment records from 2017-2025.
          Data downloaded directly from FSA&apos;s public payment files. See the full recipient list on our{' '}
          <Link href="/recipients" className="text-primary hover:underline">Recipients page</Link>.</p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Historical Trend</h2>
        <p>
          Subsidy concentration has worsened over time, not improved. In the 1990s, a larger
          share of farms received some form of federal payment. Direct payments (eliminated in
          2014) went to a broad base of producers regardless of current prices. Their elimination
          narrowed the recipient base.
        </p>
        <p>
          The shift to counter-cyclical programs (ARC, PLC) and emergency spending has further
          concentrated payments. These programs pay based on production volume and market
          conditions — both of which favor larger operations. Emergency programs amplify the
          effect because they distribute based on historical production, meaning the biggest
          producers automatically receive the biggest checks.
        </p>
        <p>
          Without structural reform, concentration will continue to worsen as agriculture
          consolidates and programs increasingly favor scale. Each farm bill perpetuates the
          pattern, and each emergency program reinforces it.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Bottom Line</h2>
        <p>
          The 10% problem isn&apos;t a bug — it&apos;s a feature of how farm subsidies are designed.
          Programs tied to commodity production inherently favor the biggest producers.
          Payment limits are too porous to counteract this concentration. Emergency programs
          make it worse. And the political power of large farm operations ensures the system
          remains unchanged.
        </p>
        <p>
          For taxpayers funding this system, the question is simple: Are you comfortable
          with a program where 69% of farms get nothing and the top 10% get three-quarters?
          If not, the data on this page shows exactly why reform is needed — and exactly
          how far the current system falls from the &quot;family farm&quot; ideal that justifies it.
        </p>
        <p>
          The {fmtMoney(stats.totalAmount)} distributed through {fmt(stats.totalPayments)} payments
          represents an enormous transfer of public wealth. How that wealth is distributed —
          who gets it, how much, and whether it serves the public interest — should be a central
          question in every farm bill debate. The concentration data on this page makes clear
          that the current answer isn&apos;t serving most farmers, most taxpayers, or most Americans.
        </p>
        <p>
          Change starts with transparency. When voters can see that 69% of farms get nothing
          while a relative handful collects millions, the &quot;family farm&quot; defense of unlimited
          subsidies loses its power. That&apos;s why data like this matters — and why the beneficiaries
          of the current system prefer to keep it out of the spotlight.
        </p>
        <p>
          OpenSubsidies exists to shine that spotlight. Every payment in our database is
          searchable, sortable, and downloadable. The concentration of farm subsidies isn&apos;t
          a secret — it&apos;s just inconvenient for those who benefit from it. Armed with data,
          taxpayers can hold their representatives accountable and demand a system that serves
          all of agriculture, not just the biggest ten percent.
        </p>
        <RelatedArticles currentSlug="subsidy-concentration" />
      </div>
    </article>
  )
}
