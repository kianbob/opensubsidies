import Breadcrumbs from '@/components/Breadcrumbs'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Conservation vs. Commodity: Two Philosophies of Farm Spending',
  description: 'CRP pays farmers not to farm. Commodity programs pay them to produce. How do these two approaches compare in federal farm spending?',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/conservation-vs-commodity' },
  openGraph: {
    title: `Conservation vs. Commodity: Two Philosophies of Farm Spending`,
    description: `CRP pays farmers not to farm. Commodity programs pay them to produce. How do these two approaches compare in federal farm spending?`,
    url: 'https://www.opensubsidies.org/analysis/conservation-vs-commodity',
    type: 'article',
  },
}

export default function ConservationVsCommodity() {
  const programs = loadData('programs.json')
  const stats = loadData('stats.json')

  const conservation = programs.filter((p: { program: string }) => /CRP|CONSERVATION|ACEP|CSP/i.test(p.program))
  const commodity = programs.filter((p: { program: string }) => /ARC|PLC|PRICE LOSS|RISK COVERAGE|LOAN DEFICIENCY/i.test(p.program))
  const conservationTotal = conservation.reduce((s: number, p: { amount: number }) => s + p.amount, 0)
  const commodityTotal = commodity.reduce((s: number, p: { amount: number }) => s + p.amount, 0)
  const conservationPayments = conservation.reduce((s: number, p: { payments: number }) => s + p.payments, 0)
  const commodityPayments = commodity.reduce((s: number, p: { payments: number }) => s + p.payments, 0)
  const conservationPct = ((conservationTotal / stats.totalAmount) * 100).toFixed(1)
  const commodityPct = ((commodityTotal / stats.totalAmount) * 100).toFixed(1)
  const avgConservation = conservationPayments > 0 ? conservationTotal / conservationPayments : 0
  const avgCommodity = commodityPayments > 0 ? commodityTotal / commodityPayments : 0

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="Conservation vs. Commodity: Two Philosophies of Farm Spending" description="CRP pays farmers not to farm. Commodity programs pay them to produce. How do these two approaches compare in federal farm spending?" slug="analysis/conservation-vs-commodity" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Conservation vs. Commodity' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Conservation vs. Commodity: Two Philosophies of Farm Spending',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies' }, datePublished: '2026-02-27',
      })}} />

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the difference between conservation and commodity farm programs?', acceptedAnswer: { '@type': 'Answer', text: 'Conservation programs like CRP pay farmers to protect environmentally sensitive land by taking it out of production. Commodity programs like ARC and PLC pay farmers when crop prices or revenues fall below historical benchmarks, subsidizing production of major crops like corn, soybeans, and wheat.' }},
          { '@type': 'Question', name: 'How much does the federal government spend on conservation vs commodity programs?', acceptedAnswer: { '@type': 'Answer', text: `Between 2017 and 2025, conservation programs received ${fmtMoney(conservationTotal)} while commodity programs received ${fmtMoney(commodityTotal)}. Both categories have been eclipsed by emergency and disaster spending.` }},
          { '@type': 'Question', name: 'What is CRP and how does it work?', acceptedAnswer: { '@type': 'Answer', text: 'The Conservation Reserve Program (CRP) pays farmers annual rental payments to remove environmentally sensitive land from crop production and plant conservation cover like grasses, trees, or wildlife habitat. Contracts typically last 10-15 years.' }},
          { '@type': 'Question', name: 'Do conservation programs actually help the environment?', acceptedAnswer: { '@type': 'Answer', text: 'CRP alone has prevented an estimated 325 million tons of soil erosion annually and created habitat for declining grassland bird species. However, critics argue the program takes productive farmland out of use and inflates land rental rates in rural areas.' }},
        ]
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Conservation vs. Commodity: Two Philosophies of Farm Spending
        </h1>
        <ShareButtons title="" />
      </div>

      <div className="prose max-w-none">
        <p className="text-lg text-gray-600">
          Federal farm spending is split between two fundamentally different ideas: paying farmers to produce crops
          (commodity subsidies) and paying farmers to protect the environment (conservation programs). The balance
          between them reveals our priorities — and our contradictions.
        </p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-bold text-green-800 mb-1">🌿 Conservation Programs</h3>
            <div className="text-3xl font-bold text-green-700">{fmtMoney(conservationTotal)}</div>
            <p className="text-sm text-green-600 mt-1">{conservation.length} programs · Pays to protect land</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <h3 className="text-lg font-bold text-amber-800 mb-1">🌾 Commodity Programs</h3>
            <div className="text-3xl font-bold text-amber-700">{fmtMoney(commodityTotal)}</div>
            <p className="text-sm text-amber-600 mt-1">{commodity.length} programs · Pays to produce crops</p>
          </div>
        </div>

        {/* Additional stat cards */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Conservation Share', value: `${conservationPct}%` },
            { label: 'Commodity Share', value: `${commodityPct}%` },
            { label: 'Avg Conservation Payment', value: fmtMoney(avgConservation) },
            { label: 'Avg Commodity Payment', value: fmtMoney(avgCommodity) },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">How Conservation Works</h2>
        <p>
          The Conservation Reserve Program (CRP) is the largest conservation program, paying farmers annual
          rental payments to take environmentally sensitive land out of production. The idea is simple:
          some land is worth more to society as habitat, watershed protection, or carbon sink than as cropland.
        </p>
        <p>
          Farmers who enroll in CRP sign 10- to 15-year contracts, agreeing to plant conservation cover —
          native grasses, trees, or pollinator habitat — instead of row crops. In return, the USDA pays an
          annual rental rate based on the soil productivity and local land values. With {fmt(conservationPayments)} payments
          totaling {fmtMoney(conservationTotal)}, conservation represents a significant but shrinking share of total farm spending.
        </p>
        <p>
          Other conservation programs include the Agricultural Conservation Easement Program (ACEP), which pays
          for permanent conservation easements on wetlands and farmland, and the Conservation Stewardship Program
          (CSP), which rewards farmers for maintaining existing conservation practices. Together, these programs
          form the environmental wing of the farm bill.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">How Commodity Programs Work</h2>
        <p>
          Agriculture Risk Coverage (ARC) and Price Loss Coverage (PLC) are the main commodity programs.
          They pay farmers when crop prices or revenues fall below historical benchmarks. The intent is
          to smooth income volatility, but critics argue they primarily benefit large-scale commodity producers
          who could absorb market swings without taxpayer help.
        </p>
        <p>
          ARC triggers payments when county-level revenue falls below a benchmark based on recent history.
          PLC triggers when national commodity prices drop below a fixed reference price. Farmers choose between
          the two programs for each commodity they grow, creating a complex web of coverage that the average taxpayer
          would struggle to navigate — let alone evaluate for cost-effectiveness.
        </p>
        <p>
          Commodity programs distributed {fmt(commodityPayments)} payments averaging {fmtMoney(avgCommodity)} each.
          Compared to conservation&apos;s average payment of {fmtMoney(avgConservation)}, commodity payments tend to be
          {avgCommodity > avgConservation ? ' larger' : ' smaller'} on a per-payment basis — reflecting the larger
          scale of commodity farming operations.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Philosophical Divide</h2>
        <p>
          At their core, these two categories represent fundamentally different views of what taxpayers should
          subsidize. Conservation programs say: &quot;Some land shouldn&apos;t be farmed, and we&apos;ll pay you to leave it alone.&quot;
          Commodity programs say: &quot;Keep producing, and if prices drop, we&apos;ll cover the difference.&quot;
        </p>
        <p>
          One rewards restraint. The other rewards production. And therein lies the central tension of American
          farm policy. We simultaneously pay farmers to grow more corn <em>and</em> pay other farmers to stop growing
          anything at all. Whether this makes fiscal sense depends entirely on which philosophy you subscribe to.
        </p>

        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 The Contradiction</p>
          <p className="text-sm text-gray-700 mt-1">
            The USDA simultaneously funds CRP to take land out of production and commodity programs that incentivize
            maximum production. When commodity prices rise, farmers rush to exit CRP contracts and plant crops —
            undermining years of conservation investment.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Who Benefits from Each Approach?</h2>
        <p>
          Conservation programs tend to benefit landowners in areas with marginal cropland — the Great Plains,
          parts of the Southeast, and areas with high erosion risk. These tend to be smaller operations that
          can&apos;t compete with the corn-belt giants on commodity production.
        </p>
        <p>
          Commodity programs, by contrast, flow heavily to the largest producers of corn, soybeans, wheat,
          rice, and cotton. As our <Link href="/analysis/subsidy-concentration">subsidy concentration analysis</Link> shows,
          the top 10% of recipients collect the vast majority of commodity payments. A 10,000-acre corn operation
          in Iowa benefits far more from ARC/PLC than a 200-acre diversified farm in Vermont.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Elephant in the Room: Emergency Spending</h2>
        <p>
          The conservation-vs-commodity debate, while important, has been overtaken by a third category:
          emergency and disaster spending. As our <Link href="/analysis/decade-of-disaster">decade of disaster analysis</Link> shows,
          ad hoc emergency programs now dwarf both conservation and commodity spending combined.
        </p>
        <p>
          This matters because emergency spending gets even less scrutiny than regular farm bill programs.
          At least CRP and ARC/PLC go through formal authorization and appropriation processes. Emergency programs
          are often created by executive action or supplemental appropriations with minimal debate about whether
          the money is well-targeted.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Reform Opportunity</h2>
        <p>
          A growing number of policy analysts — from both the libertarian and environmental camps — argue that
          conservation programs deliver better bang for the buck than commodity subsidies. The logic: commodity
          programs subsidize operations that would largely survive without federal help (large-scale corn and
          soybean farms are profitable enterprises), while conservation programs fund public goods that the
          market wouldn&apos;t provide on its own (wildlife habitat, water quality, carbon sequestration).
        </p>
        <p>
          But reform faces a fundamental political obstacle: commodity program beneficiaries are concentrated in
          politically powerful states, and they have well-funded lobbying operations. Conservation programs, by
          contrast, lack a natural constituency with the same political muscle. The result: every farm bill
          fight starts with commodity programs protected and conservation programs on the chopping block.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Numbers Behind the Debate</h2>
        <p>
          Let&apos;s be specific about what each dollar buys. Conservation programs distributed {fmt(conservationPayments)} payments
          to landowners across the country, with an average payment of {fmtMoney(avgConservation)}. These payments typically
          cover annual rental costs for taking land out of production — a modest but steady income stream for participating
          landowners.
        </p>
        <p>
          Commodity programs distributed {fmt(commodityPayments)} payments averaging {fmtMoney(avgCommodity)} each. These
          payments activate only when prices or revenues fall below benchmarks, meaning they can be zero in good years
          and substantial in bad ones. The volatility of commodity payments makes them harder to budget and easier
          to hide in the overall numbers.
        </p>
        <p>
          Together, conservation and commodity programs account for {conservationPct}% and {commodityPct}% of
          total farm spending respectively. The remaining majority goes to emergency, disaster, and other
          programs — a category that has exploded since 2018.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What Taxpayers Should Know</h2>
        <p>
          For taxpayers evaluating whether their money is well spent, the conservation-commodity comparison
          offers a useful lens. Conservation programs produce measurable environmental outcomes: acres of
          habitat restored, tons of erosion prevented, gallons of clean water preserved. These outcomes
          can be audited and quantified.
        </p>
        <p>
          Commodity programs are harder to evaluate. They claim to support &quot;food security&quot; and &quot;rural
          stability,&quot; but most economists agree that the United States would produce ample food without
          commodity subsidies. The programs primarily smooth income for producers of five major crops —
          crops that would be profitable in most years even without government support.
        </p>
        <p>
          The uncomfortable question: if commodity farmers can survive without subsidies in most years,
          why are taxpayers paying them {fmtMoney(commodityTotal)} over nine years? And if the answer is
          &quot;insurance against bad years,&quot; why isn&apos;t the existing crop insurance system sufficient?
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Historical Context</h2>
        <p>
          The conservation-commodity split dates back to the 1930s Dust Bowl, when the federal government
          first paid farmers to take eroded land out of production. The original Soil Bank program was
          genuinely needed — millions of acres of marginal land had been plowed up during World War I
          and the 1920s boom, creating the conditions for ecological catastrophe.
        </p>
        <p>
          CRP, created in the 1985 Farm Bill, modernized this approach. Commodity programs have even
          deeper roots, stretching back to New Deal price supports in the 1930s. Both categories have
          evolved significantly, but their philosophical foundations haven&apos;t changed: one pays for
          environmental stewardship, the other for production.
        </p>
        <p>
          Nearly a century later, the fundamental question remains the same: should taxpayers subsidize
          production of crops the market already incentivizes, or invest in environmental protection
          the market systematically underprovides?
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Bottom Line</h2>
        <p>
          The conservation-commodity split isn&apos;t just about money — it&apos;s about what kind of agriculture
          taxpayers want to support. One path leads to continued consolidation and commodity monocultures.
          The other invests in environmental resilience. Right now, the data shows we&apos;re choosing both,
          plus an ever-expanding emergency spending machine on top.
        </p>
        <p>
          For more on how conservation fares in the current budget, see our{' '}
          <Link href="/analysis/crp-under-threat">CRP under threat analysis</Link>. For the full program
          breakdown, explore the <Link href="/programs">programs page</Link>.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">State-Level Differences</h2>
        <p>
          The conservation-commodity balance varies dramatically by state. Great Plains states like
          Kansas and Nebraska have high CRP enrollment because their marginal grasslands are ideal
          for conservation. Corn Belt states like Iowa and Illinois receive far more from commodity
          programs because nearly every acre is in row crop production.
        </p>
        <p>
          This geographic pattern means the conservation-commodity debate is also a regional debate.
          States with more CRP acreage fight to protect conservation funding. States with more commodity
          acreage fight to protect ARC/PLC. The farm bill becomes a turf war between regions with
          fundamentally different agricultural landscapes and priorities.
        </p>
        <p>
          See our <Link href="/analysis/state-disparities">state disparities analysis</Link> for the
          full geographic breakdown of farm subsidy spending.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Explore the Data</p>
          <p>See the full breakdown of all {stats.totalPrograms} programs on our <Link href="/programs" className="text-primary hover:underline">Programs page</Link>,
          or explore <Link href="/analysis/what-147b-buys" className="text-primary hover:underline">what $147 billion could buy instead</Link>.</p>
        </div>

        <RelatedArticles currentSlug="conservation-vs-commodity" />
      </div>
    </article>
  )
}
