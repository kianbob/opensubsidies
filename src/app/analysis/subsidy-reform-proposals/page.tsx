import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ArticleSchema from '@/components/ArticleSchema'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Farm Subsidy Reform Proposals: Who Wants to Change What',
  description: 'From Heritage Foundation means testing to progressive payment caps, farm subsidy reform proposals span the political spectrum. Here\'s what the data says about who\'d be affected.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/subsidy-reform-proposals' },
  openGraph: {
    title: 'Farm Subsidy Reform Proposals: Who Wants to Change What',
    description: 'From Heritage Foundation means testing to progressive payment caps, farm subsidy reform proposals span the political spectrum. Here\'s what the data says about who\'d be affected.',
    url: 'https://www.opensubsidies.org/analysis/subsidy-reform-proposals',
    type: 'article',
  },
}

export default function SubsidyReformProposals() {
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalPrograms: number; dataYears: string; lastUpdated: string }
  const programs = loadData('programs.json') as { program: string; payments: number; amount: number }[]
  const states = loadData('states.json') as { abbr: string; name: string; payments: number; amount: number }[]

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

  const topStates = [...states].sort((a, b) => b.amount - a.amount).slice(0, 10)
  const bottomStates = [...states].sort((a, b) => a.amount - b.amount).slice(0, 10)
  const topStatesPct = (topStates.reduce((s, st) => s + st.amount, 0) / stats.totalAmount) * 100

  const topPrograms = programs.slice(0, 10)
  const top5Pct = (topPrograms.slice(0, 5).reduce((s, p) => s + p.amount, 0) / stats.totalAmount) * 100
  const smallPrograms = programs.filter(p => p.payments < 100)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the main farm subsidy reform proposals?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Major proposals include means-testing subsidies so wealthy operations receive less, lowering payment caps from $125,000, expanding conservation at the expense of commodity programs, requiring crop insurance transparency, and consolidating the hundreds of overlapping USDA programs into a streamlined system.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does the Heritage Foundation support farm subsidy reform?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Heritage Foundation has proposed means-testing farm subsidies, capping total payments, eliminating marketing loan gains for large operations, and reducing premium subsidies for crop insurance. They argue current programs primarily benefit large, wealthy operations rather than struggling family farmers.',
        },
      },
      {
        '@type': 'Question',
        name: 'What do progressives want to change about farm subsidies?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Progressive reform proposals focus on lowering payment caps, shifting funding from commodity programs to conservation, requiring environmental compliance for all farm programs, increasing transparency in crop insurance, and targeting subsidies to small and mid-size operations rather than corporate farms.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there bipartisan agreement on any farm subsidy reforms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Both sides broadly agree on consolidating overlapping programs, increasing transparency in crop insurance payments, sunsetting zombie programs that serve few recipients, and reducing administrative overhead at USDA. The disagreements center on how aggressively to cut commodity support and how to handle SNAP nutrition spending.',
        },
      },
    ],
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema
        title="Farm Subsidy Reform Proposals: Who Wants to Change What"
        description="From Heritage Foundation means testing to progressive payment caps, farm subsidy reform proposals span the political spectrum. Here's what the data says about who'd be affected."
        slug="analysis/subsidy-reform-proposals"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Subsidy Reform Proposals' }]} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · July 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Farm Subsidy Reform Proposals: Who Wants to Change What
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-lg text-gray-600">
            Left, right, and center all agree farm subsidies need reform. They just disagree on everything
            else. Here&apos;s what {fmtMoney(stats.totalAmount)} in payment data reveals about the reform targets.
          </p>
          <ShareButtons title="Farm Subsidy Reform Proposals: Who Wants to Change What" />
        </div>
      </div>

      <div className="prose max-w-none">
        {/* Key stats */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Total Subsidies', value: fmtMoney(stats.totalAmount), sub: stats.dataYears },
            { label: 'Programs', value: fmt(stats.totalPrograms), sub: 'Distinct USDA programs' },
            { label: 'Top 5 Programs', value: `${top5Pct.toFixed(0)}%`, sub: 'Of all spending' },
            { label: 'Tiny Programs', value: fmt(smallPrograms.length), sub: '<100 payments each' },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm font-medium text-gray-900">{s.label}</div>
              <div className="text-xs text-gray-500">{s.sub}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Unlikely Reform Coalition</h2>
        <p>
          Farm subsidy reform is one of the rare policy areas where the Heritage Foundation and the
          Environmental Working Group (EWG) sometimes end up on the same side. Both argue that the current
          system overwhelmingly benefits large, wealthy operations at the expense of small farmers and
          taxpayers. They just disagree on what should replace it.
        </p>
        <p>
          The political difficulty is obvious: every reform proposal creates identifiable losers with
          powerful lobbies, while the winners — taxpayers, small farmers, the environment — are diffuse
          and poorly organized. That&apos;s why {fmtMoney(stats.totalAmount)} keeps flowing through a system
          that almost everyone agrees is broken.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Conservative Reform: The Heritage Foundation Approach</h2>
        <p>
          The Heritage Foundation has been among the most vocal advocates for farm subsidy reform from
          the right. Their core argument: farm programs have evolved from a Depression-era safety net
          into a permanent entitlement for some of America&apos;s wealthiest landowners. Key proposals include:
        </p>

        <div className="not-prose space-y-4 my-8">
          {[
            {
              num: '1',
              title: 'Means-Test All Farm Payments',
              desc: 'Phase out subsidy eligibility for operations with adjusted gross income above $500,000. Currently, millionaire farmers receive the same per-acre payments as struggling family operations.',
              impact: `Would affect the top tier of recipients who capture a disproportionate share of ${fmtMoney(stats.totalAmount)} in payments.`,
            },
            {
              num: '2',
              title: 'Hard Cap at $40,000 Per Person',
              desc: 'Replace the current $125,000 cap (easily circumvented through entity structures) with a hard $40,000 limit that cannot be multiplied through partnerships and LLCs.',
              impact: 'Current payment limits are a fiction. Entity structuring lets single operations collect multiples of the cap.',
            },
            {
              num: '3',
              title: 'Eliminate Marketing Loan Gains',
              desc: 'End the marketing assistance loan program that provides below-market interest rates and effective price guarantees to commodity producers.',
              impact: `Commodity programs total ${fmtMoney(commodityTotal)} in our data — this would reduce that significantly.`,
            },
            {
              num: '4',
              title: 'Reform Crop Insurance Subsidies',
              desc: 'Reduce the premium subsidy from 60% to 40% for the largest operations. Currently, taxpayers pay the majority of crop insurance premiums regardless of the policyholder\'s wealth.',
              impact: 'Federal crop insurance costs $9-15B/year in subsidies — most going to the biggest operations.',
            },
          ].map(r => (
            <div key={r.num} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-2xl font-bold text-red-600">{r.num}</span>
                <div>
                  <h4 className="font-bold text-gray-900">{r.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{r.desc}</p>
                  <p className="text-xs text-primary font-medium mt-2">📊 {r.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p>
          The Heritage approach reflects a genuine free-market philosophy: if farming is profitable (and
          for large operations, it very much is), the government shouldn&apos;t be subsidizing it. The
          challenge is that this position puts Heritage at odds with many Republican farm-state legislators
          whose constituents benefit from the status quo.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Progressive Reform: Payment Limits and Conservation</h2>
        <p>
          Organizations like the Environmental Working Group and the National Sustainable Agriculture
          Coalition approach reform from different principles but reach surprisingly similar conclusions.
          Their proposals emphasize:
        </p>

        <div className="not-prose space-y-4 my-8">
          {[
            {
              num: '1',
              title: 'Strict Payment Limitations',
              desc: 'Cap total farm payments at $125,000 per operation (not per person) and close the entity loopholes that allow a single family to collect multiples. See our analysis of payment limit circumvention.',
              impact: `Current per-person caps with entity structures mean actual payments far exceed nominal limits.`,
            },
            {
              num: '2',
              title: 'Shift Funding to Conservation',
              desc: `Redirect spending from commodity programs (${fmtMoney(commodityTotal)}) to conservation programs (${fmtMoney(conservationTotal)}). Expand CRP enrollment caps and create new climate-focused payment programs.`,
              impact: `Conservation spending is currently dwarfed by commodity and emergency programs.`,
            },
            {
              num: '3',
              title: 'Target Small and Mid-Size Farms',
              desc: 'Create a tiered payment structure that provides higher per-acre rates to the first 500 acres, declining thereafter. This would shift benefits toward smaller operations.',
              impact: 'The current flat-rate structure inherently favors the largest operations with the most base acres.',
            },
            {
              num: '4',
              title: 'Crop Insurance Transparency',
              desc: 'Require public disclosure of all crop insurance subsidy recipients and amounts. Currently, crop insurance is the only major farm program where individual payment data is hidden from taxpayers.',
              impact: 'Taxpayers spend $9-15B/year on crop insurance subsidies without knowing who receives them.',
            },
          ].map(r => (
            <div key={r.num} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-2xl font-bold text-blue-600">{r.num}</span>
                <div>
                  <h4 className="font-bold text-gray-900">{r.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{r.desc}</p>
                  <p className="text-xs text-primary font-medium mt-2">📊 {r.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Where Left and Right Agree</h2>
        <p>
          Despite different starting philosophies, there&apos;s surprising overlap in the reform agenda.
          Both sides broadly support:
        </p>

        <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">🤝 Bipartisan Reform Areas</p>
          <div className="mt-2 space-y-2 text-sm text-gray-700">
            <p>✅ <strong>Program consolidation</strong> — {fmt(stats.totalPrograms)} programs is too many. Both sides agree on consolidating overlapping initiatives.</p>
            <p>✅ <strong>Crop insurance transparency</strong> — Public disclosure of who receives premium subsidies. The current secrecy is indefensible.</p>
            <p>✅ <strong>Sunsetting zombie programs</strong> — Programs with fewer than 100 payments ({fmt(smallPrograms.length)} in our data) should be evaluated and likely eliminated.</p>
            <p>✅ <strong>Administrative streamlining</strong> — Reducing USDA overhead and duplicative bureaucracy that adds cost without improving farmer outcomes.</p>
            <p>✅ <strong>Payment limit loophole closure</strong> — Entity structures that multiply payment caps are a bipartisan embarrassment.</p>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">What the Data Shows About Reform Targets</h2>
        <p>
          Reform proposals sound good in think-tank white papers. But what does {fmtMoney(stats.totalAmount)} in
          actual payment data tell us about where reform would have the most impact?
        </p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          <div className="bg-gray-50 rounded-lg p-5">
            <h4 className="font-bold text-gray-900 mb-2">Program Concentration</h4>
            <div className="text-3xl font-bold text-primary">{top5Pct.toFixed(0)}%</div>
            <div className="text-sm text-gray-500">Spent through top 5 programs</div>
            <p className="text-sm text-gray-600 mt-2">
              The top 5 programs account for {top5Pct.toFixed(1)}% of all spending. Reform that
              targets these programs would affect the vast majority of payments. Reforming the
              remaining {stats.totalPrograms - 5} programs is important symbolically but marginal fiscally.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-5">
            <h4 className="font-bold text-gray-900 mb-2">Geographic Concentration</h4>
            <div className="text-3xl font-bold text-primary">{topStatesPct.toFixed(0)}%</div>
            <div className="text-sm text-gray-500">Goes to top 10 states</div>
            <p className="text-sm text-gray-600 mt-2">
              Any reform that meaningfully reduces payments will disproportionately affect a handful
              of farm states. These states have disproportionate Senate representation — which is
              precisely why reform is so hard.
            </p>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Top Programs Reform Would Target</h2>
        <p>
          Here are the 10 largest programs by total spending. These are the line items that dominate
          reform debates — because they&apos;re where the money is:
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

        <h2 className="font-[family-name:var(--font-heading)]">The Emergency Spending Problem</h2>
        <p>
          Perhaps the biggest reform target isn&apos;t any Farm Bill program at all — it&apos;s the
          emergency spending that has exploded outside the Farm Bill framework. At {fmtMoney(emergencyTotal)},
          emergency and disaster payments rival or exceed the core Farm Bill programs in total spending.
        </p>
        <p>
          Both Heritage and progressive reformers agree: if emergency spending is going to be a permanent
          feature of farm policy, it should be budgeted, scored, and subjected to the same scrutiny as
          Farm Bill programs. The current system — where Congress appropriates tens of billions in
          &quot;emergency&quot; supplementals that dodge budget rules — is the worst of both worlds: expensive
          and unaccountable.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 The Emergency Spending Loophole</p>
          <p className="text-sm text-gray-700 mt-1">
            Emergency designations allow Congress to spend without offsetting cuts elsewhere in the budget.
            Farm emergency programs have been declared in 7 of the last 8 years. At what point does
            &quot;emergency&quot; become &quot;routine&quot; — and when will Congress budget for it honestly?
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Why Reform Keeps Failing</h2>
        <p>
          Understanding why farm subsidy reform consistently fails despite broad intellectual support
          requires understanding the political economy:
        </p>
        <ul>
          <li>
            <strong>Concentrated benefits, diffuse costs</strong> — Farm subsidies cost every American
            roughly $450/year, but individual recipients receive tens or hundreds of thousands.
            Recipients lobby hard; taxpayers barely notice.
          </li>
          <li>
            <strong>Committee gatekeeping</strong> — The Senate and House Agriculture Committees are
            dominated by members from the top recipient states. They draft the bill. See our analysis
            of <Link href="/analysis/subsidy-concentration">subsidy concentration</Link> for the
            geographic breakdown.
          </li>
          <li>
            <strong>The SNAP coalition</strong> — Bundling farm subsidies with nutrition programs
            creates a logrolling coalition that protects both. Separating them might enable reform
            of each, but neither side wants to risk it.
          </li>
          <li>
            <strong>The &quot;family farmer&quot; narrative</strong> — Every subsidy defense invokes struggling
            family farmers. The data shows most payments flow to <Link href="/analysis/corporate-farms">large
            corporate operations</Link>, but the narrative is politically powerful.
          </li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)]">What Would Meaningful Reform Look Like?</h2>
        <p>
          Drawing from both conservative and progressive proposals, a genuinely bipartisan reform package
          might include:
        </p>

        <div className="not-prose space-y-3 my-8">
          {[
            { title: 'Hard payment cap of $75,000 per operation', desc: 'Not per person, not per entity — per operation. Close loopholes.' },
            { title: 'Means-test above $750,000 AGI', desc: 'Phase out eligibility for high-income operations that don\'t need a safety net.' },
            { title: 'Consolidate programs to under 50', desc: `Cut ${fmt(stats.totalPrograms)} programs to a manageable, transparent set. Eliminate zombie programs.` },
            { title: 'Budget emergency spending', desc: `Score disaster programs (${fmtMoney(emergencyTotal)}) in the baseline instead of using emergency designations.` },
            { title: 'Publish crop insurance data', desc: 'Require the same transparency for crop insurance that exists for FSA payments.' },
            { title: 'Tiered per-acre rates', desc: 'Higher rates for the first 500 acres, declining thereafter, to benefit small operations.' },
          ].map(item => (
            <div key={item.title} className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
              <span className="text-green-600 text-lg">✓</span>
              <div>
                <span className="font-bold text-gray-900 text-sm">{item.title}</span>
                <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p>
          Will any of this happen? The track record suggests not — at least not all at once. The 1996
          &quot;Freedom to Farm&quot; Act tried bold reform and was reversed within six years. But incremental
          progress is possible, especially if transparency measures like crop insurance disclosure build
          public awareness of where the money actually goes.
        </p>
        <p>
          For more on how subsidy payments concentrate among top recipients, see our analysis of
          {' '}<Link href="/analysis/double-dippers">double-dippers</Link> — recipients who collect from
          multiple programs simultaneously. And for a look at how recent scrutiny has affected farm
          programs, read our coverage of <Link href="/farm-subsidy-reform">ongoing reform efforts</Link>.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Source</p>
          <p>Analysis based on USDA Farm Service Agency payment records, {stats.dataYears}. Last updated {stats.lastUpdated}.
          Reform proposals referenced from Heritage Foundation, Environmental Working Group, National Sustainable
          Agriculture Coalition, and Congressional Research Service publications.</p>
        </div>

        <RelatedArticles currentSlug="subsidy-reform-proposals" />
      </div>
    </article>
  )
}
