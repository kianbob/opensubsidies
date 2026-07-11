import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'CRP Under Threat: Is Conservation Keeping Up with Emergency Spending?',
  description: 'The Conservation Reserve Program at $15.7B is the largest traditional program. But emergency spending now dwarfs it. What are the policy implications?',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/crp-under-threat' },
  openGraph: {
    title: `CRP Under Threat: Is Conservation Keeping Up with Emergency Spending?`,
    description: `The Conservation Reserve Program at $15.7B is the largest traditional program. But emergency spending now dwarfs it. What are the policy implications?`,
    url: 'https://www.opensubsidies.org/analysis/crp-under-threat',
    type: 'article',
  },
}

export default function CrpUnderThreatPage() {
  const programs = loadData('programs.json') as { program: string; amount: number; payments: number }[]
  const programYearly = loadData('program-yearly.json') as { program: string; yearly: { year: number; amount: number; payments: number }[] }[]
  const stats = loadData('stats.json')

  const crp = programs.find(p => p.program === 'CRP PAYMENT - ANNUAL RENTAL')
  const crpYearly = programYearly.find(p => p.program === 'CRP PAYMENT - ANNUAL RENTAL')?.yearly || []
  const crpTotal = crp?.amount || 0
  const crpPayments = crp?.payments || 0
  const avgCrpPayment = crpPayments > 0 ? crpTotal / crpPayments : 0
  const crpAvgAnnual = crpYearly.length > 0 ? crpTotal / crpYearly.length : 0

  const emergencyProgs = programs.filter(p =>
    /EMERGENCY|DISASTER|RELIEF|ELAP|CFAP|WHIP|ERP|ECAP/i.test(p.program)
  )
  const emergencyTotal = emergencyProgs.reduce((s, p) => s + p.amount, 0)
  const totalAll = programs.reduce((s, p) => s + p.amount, 0)
  const crpSharePct = ((crpTotal / totalAll) * 100).toFixed(1)
  const emergencySharePct = ((emergencyTotal / totalAll) * 100).toFixed(0)
  const emergencyToCrpRatio = (emergencyTotal / crpTotal).toFixed(1)

  const crpLatest = crpYearly.length > 0 ? crpYearly[crpYearly.length - 1] : null
  const crpEarliest = crpYearly.length > 0 ? crpYearly[0] : null
  const crpChange = crpEarliest && crpLatest ? ((crpLatest.amount - crpEarliest.amount) / crpEarliest.amount * 100).toFixed(1) : '0'

  // All conservation programs
  const allConservation = programs.filter(p => /CRP|CONSERVATION|ACEP|CSP/i.test(p.program))
  const allConservationTotal = allConservation.reduce((s, p) => s + p.amount, 0)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="CRP Under Threat: Is Conservation Keeping Up with Emergency Spending?" description="The Conservation Reserve Program at $15.7B is the largest traditional program. But emergency spending now dwarfs it. What are the policy implications?" slug="analysis/crp-under-threat" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'CRP Under Threat' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'CRP Under Threat: Is Conservation Keeping Up with Emergency Spending?',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.org' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the Conservation Reserve Program (CRP)?', acceptedAnswer: { '@type': 'Answer', text: `CRP pays farmers annual rental payments to take environmentally sensitive land out of crop production and plant conservation cover. With ${fmt(crpPayments)} payments totaling ${fmtMoney(crpTotal)}, it's the largest traditional farm subsidy program.` }},
          { '@type': 'Question', name: 'How does CRP spending compare to emergency farm programs?', acceptedAnswer: { '@type': 'Answer', text: `CRP represents ${crpSharePct}% of total farm spending at ${fmtMoney(crpTotal)}, while emergency programs account for ${emergencySharePct}% at ${fmtMoney(emergencyTotal)}. Emergency spending is now ${emergencyToCrpRatio}× CRP spending.` }},
          { '@type': 'Question', name: 'Is CRP enrollment declining?', acceptedAnswer: { '@type': 'Answer', text: `CRP spending has been remarkably stable at approximately ${fmtMoney(crpAvgAnnual)} per year. However, when commodity prices rise, farmers have an incentive to exit CRP contracts and return land to production, which can reduce enrollment.` }},
          { '@type': 'Question', name: 'What are the environmental benefits of CRP?', acceptedAnswer: { '@type': 'Answer', text: 'CRP prevents an estimated 325 million tons of soil erosion annually, creates habitat for grassland birds and pollinators, improves water quality by filtering runoff, and sequesters carbon in soil and vegetation. These environmental benefits have measurable economic value.' }},
        ]
      })}} />

      <div className="mb-8">
        <div className="flex items-start justify-between">
          <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
          <ShareButtons title="CRP Under Threat: Is Conservation Keeping Up with Emergency Spending?" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          CRP Under Threat: Is Conservation Keeping Up with Emergency Spending?
        </h1>
        <p className="text-lg text-gray-600">
          At {fmtMoney(crpTotal)}, the Conservation Reserve Program is the largest traditional farm subsidy program.
          But emergency spending now dwarfs it at {fmtMoney(emergencyTotal)}. What does this mean for conservation?
        </p>
      </div>

      <div className="prose max-w-none">
        {/* Key stats */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'CRP Total', value: fmtMoney(crpTotal) },
            { label: 'Emergency Total', value: fmtMoney(emergencyTotal) },
            { label: 'Emergency/CRP Ratio', value: `${emergencyToCrpRatio}×` },
            { label: 'CRP Share of Total', value: `${crpSharePct}%` },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 Key Insight</p>
          <p className="text-sm text-gray-700 mt-1">
            CRP has remained remarkably stable at ~{fmtMoney(crpAvgAnnual)}/year, while emergency programs surged to tens of billions.
            CRP now represents just {crpSharePct}% of total farm spending.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">What Is the CRP?</h2>
        <p>
          The Conservation Reserve Program pays farmers <em>not</em> to farm environmentally sensitive land. Landowners
          receive annual rental payments in exchange for removing cropland from production and planting
          conservation cover — grasses, trees, or wildlife habitat. With {fmt(crpPayments)} payments totaling
          {' '}{fmtMoney(crpTotal)}, it&apos;s the single largest traditional (non-emergency) program in the USDA portfolio.
        </p>
        <p>
          CRP contracts typically last 10 to 15 years, providing long-term stability for enrolled land. The
          average CRP payment is {fmtMoney(avgCrpPayment)}, reflecting the rental rates for marginal cropland
          in areas with high erosion risk, important wildlife habitat, or sensitive watersheds.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Environmental Case for CRP</h2>
        <p>
          Unlike most farm subsidies, CRP delivers measurable public benefits:
        </p>
        <ul>
          <li><strong>Soil conservation:</strong> An estimated 325 million tons of soil erosion prevented annually</li>
          <li><strong>Water quality:</strong> Reduced fertilizer and pesticide runoff into streams and rivers</li>
          <li><strong>Wildlife habitat:</strong> Critical habitat for grassland birds, pollinators, and other species in decline</li>
          <li><strong>Carbon sequestration:</strong> Enrolled land absorbs carbon that would otherwise enter the atmosphere</li>
          <li><strong>Flood control:</strong> Vegetative cover slows water flow and reduces downstream flooding</li>
        </ul>
        <p>
          These benefits have real economic value — cleaner water means lower treatment costs for municipalities,
          healthy pollinator populations support crop production, and reduced flooding saves billions in property damage.
          From a fiscal conservative&apos;s perspective, CRP is one of the few farm programs that can credibly claim
          to generate public value exceeding its cost.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Steady as She Goes — While Everything Else Explodes</h2>
        <p>
          CRP annual spending has been remarkably consistent:
          {crpEarliest && crpLatest && ` from ${fmtMoney(crpEarliest.amount)} in ${crpEarliest.year} to ${fmtMoney(crpLatest.amount)} in ${crpLatest.year} (${Number(crpChange) > 0 ? '+' : ''}${crpChange}%).`}
          {' '}Meanwhile, emergency spending has gone from nearly zero to dominating the entire farm subsidy budget.
        </p>

        <div className="not-prose my-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-left font-semibold">Year</th><th className="px-4 py-2 text-right font-semibold">CRP Spending</th><th className="px-4 py-2 text-right font-semibold">Payments</th><th className="px-4 py-2 text-right font-semibold">Avg Payment</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {crpYearly.map(y => (
                  <tr key={y.year} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{y.year}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtMoney(y.amount)}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmt(y.payments)}</td>
                    <td className="px-4 py-2 text-right font-mono text-gray-500">{fmtMoney(y.amount / y.payments)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Commodity Price Threat</h2>
        <p>
          CRP faces its greatest threat not from Congress, but from the market. When commodity prices rise — as
          they did during the trade-war era and post-pandemic inflation — farmers have a powerful incentive to
          exit CRP contracts and return land to production. The rental payments CRP offers can&apos;t compete with
          the income from planting corn at $7/bushel.
        </p>
        <p>
          This creates a perverse dynamic: the same crises that trigger emergency spending also undermine
          conservation. Trade disruptions push commodity prices up, which pulls land out of CRP, which
          increases erosion and habitat loss — the very problems CRP was designed to prevent. The USDA
          is effectively paying for both sides: emergency payments to producers <em>and</em> conservation
          payments to keep land out of production.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Budget Competition</h2>
        <p>
          Conservation programs compete for the same budget pie as commodity and emergency programs.
          All conservation programs combined — CRP, ACEP, CSP, and others — total {fmtMoney(allConservationTotal)}.
          Emergency programs alone are {fmtMoney(emergencyTotal)}. When Congress faces budget pressure,
          conservation is typically the first category to face cuts.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Policy Implications</h2>
        <p>
          As Congress debates Farm Bill reauthorization, CRP faces pressure from multiple directions.
          Commodity groups argue the land should return to production. Climate advocates want expanded
          conservation. And emergency spending keeps growing, competing for the same budget dollars.
        </p>
        <p>
          The fundamental tension: CRP prevents environmental damage proactively, while emergency programs
          react to crises after they occur. If climate change increases disaster frequency, the case for
          preventive conservation only gets stronger — but the political incentives favor visible crisis response.
        </p>
        <p>
          A dollar spent on CRP prevents future costs. A dollar spent on disaster relief responds to costs
          already incurred. By any rational analysis, prevention is more cost-effective than reaction. But
          Congress doesn&apos;t operate by rational analysis — it responds to political urgency. And disasters
          are always more urgent than prevention.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Enrollment Challenge</h2>
        <p>
          CRP faces a fundamental enrollment challenge: it must compete with the commodity market for
          land. The USDA sets maximum rental rates for CRP based on soil productivity and local conditions,
          but these rates can&apos;t always compete with what farmers could earn growing crops.
        </p>
        <p>
          When corn prices exceed $5/bushel, the opportunity cost of keeping land in CRP rises sharply.
          Farmers doing the math often conclude they&apos;re better off exiting CRP and planting crops —
          especially when emergency programs will cover their losses if prices drop later. The irony:
          the emergency spending system that competes with CRP for budget also undermines CRP&apos;s
          ability to retain enrolled acres.
        </p>
        <p>
          Total CRP enrollment peaked at 36.8 million acres in 2007 and has declined since, as rising
          commodity prices and rental rate competition pulled land back into production. Current enrollment
          is around 23 million acres — a 37% decline from peak. Each acre that leaves CRP represents
          lost environmental investment and increased erosion risk.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Cost-Effectiveness Argument</h2>
        <p>
          From a fiscal perspective, CRP is one of the most cost-effective federal programs in the
          USDA portfolio. At roughly {fmtMoney(crpAvgAnnual)} per year, it delivers quantifiable
          environmental benefits across millions of acres. Compare that to emergency programs that
          spend billions reacting to disasters that better conservation might have prevented.
        </p>
        <p>
          Researchers at Iowa State University estimate that CRP delivers $2-4 in environmental
          benefits for every $1 spent. Few government programs can claim that kind of return.
          Yet CRP faces budget pressure while emergency programs grow unchecked. The math doesn&apos;t
          add up — but politics rarely follows math.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Path Forward</h2>
        <p>
          For CRP to survive in the era of emergency spending, advocates need to make the economic case
          more forcefully. Every dollar of CRP spending generates measurable returns in reduced erosion,
          cleaner water, and wildlife habitat. These returns should be quantified and compared directly
          to the cost of emergency disaster spending that CRP could help prevent.
        </p>
        <p>
          Read more about <Link href="/analysis/conservation-vs-commodity">conservation vs. commodity spending</Link> or
          explore the full <Link href="/programs">programs list</Link>. For the disaster spending that&apos;s
          crowding out conservation, see our <Link href="/analysis/disaster-spending">disaster spending analysis</Link>.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Source</p>
          <p>USDA Farm Service Agency payment records, 2017–2025. CRP data based on program name &quot;CRP PAYMENT - ANNUAL RENTAL.&quot;
          See all programs on our <Link href="/programs" className="text-primary hover:underline">Programs page</Link>.</p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Bottom Line</h2>
        <p>
          CRP is a success story in an otherwise troubled farm subsidy system. It delivers
          measurable environmental benefits, operates at a stable and predictable cost, and
          enjoys bipartisan support. But it&apos;s under threat from every direction: rising commodity
          prices that lure land out of conservation, emergency spending that competes for the
          same budget, and political pressure from commodity groups that want more acreage in
          production.
        </p>
        <p>
          The fundamental irony is that CRP&apos;s stability — its greatest strength — is also its
          political weakness. In a system dominated by crisis-driven emergency spending, a program
          that quietly delivers results year after year doesn&apos;t generate headlines. Nobody holds a
          press conference for prevented erosion. Nobody tweets about habitat preservation.
        </p>
        <p>
          If CRP declines, the environmental costs won&apos;t be immediately visible. Erosion happens
          slowly. Habitat loss is gradual. Water quality degrades over years, not days. But the
          costs will be real — and future taxpayers will pay for remediation that CRP could have
          prevented at a fraction of the cost.
        </p>
        <p>
          The question facing policymakers is straightforward: Is {fmtMoney(crpAvgAnnual)} per year
          for prevention a better investment than tens of billions in emergency response? The data
          says yes. The political system says it doesn&apos;t care.
        </p>
        <p>
          For taxpayers who value both environmental stewardship and fiscal responsibility, CRP
          represents a rare program that serves both goals. Protecting it should be a priority
          for anyone who believes government spending should deliver measurable results. The
          alternative — letting conservation erode while emergency spending explodes — is the
          definition of penny-wise and pound-foolish.
        </p>

        <RelatedArticles currentSlug="crp-under-threat" />
      </div>
    </article>
  )
}
