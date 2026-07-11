import Breadcrumbs from '@/components/Breadcrumbs'
import { fmtMoney, fmt, formatProgram } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'The Conservation Reserve Program: Paying Farmers Not to Farm',
  description: 'A deep dive into the CRP program — how it works, why it\'s controversial, its environmental benefits, and what the data reveals about who gets paid not to farm.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/crp-conservation' },
  openGraph: {
    title: 'The Conservation Reserve Program: Paying Farmers Not to Farm',
    description: 'A deep dive into the CRP program — how it works, why it\'s controversial, and its environmental benefits.',
    url: 'https://www.opensubsidies.org/analysis/crp-conservation',
    type: 'article',
  },
}

export default function CRPConservation() {
  const programs = loadData('programs.json') as { program: string; code: string; payments: number; amount: number }[]
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalPrograms: number; dataYears: string }

  const crpPrograms = programs.filter(p => /\bCRP\b/i.test(p.program)).sort((a, b) => b.amount - a.amount)
  const crpTotal = crpPrograms.reduce((s, p) => s + p.amount, 0)
  const crpPayments = crpPrograms.reduce((s, p) => s + p.payments, 0)
  const allTotal = programs.reduce((s, p) => s + p.amount, 0)
  const avgCrpPayment = crpTotal / crpPayments

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="The Conservation Reserve Program: Paying Farmers Not to Farm" description="A deep dive into the CRP program — how it works, why it's controversial, and what the data reveals." slug="analysis/crp-conservation" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'CRP Conservation' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'The Conservation Reserve Program: Paying Farmers Not to Farm',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies' }, datePublished: '2026-02-27',
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question', name: 'What is the Conservation Reserve Program (CRP)?',
            acceptedAnswer: { '@type': 'Answer', text: 'The Conservation Reserve Program pays landowners annual rental payments to take environmentally sensitive cropland out of production for 10-15 years. Created in the 1985 Farm Bill, CRP currently enrolls about 23 million acres nationwide. Enrolled land must be planted with grasses, trees, or other conservation cover to reduce erosion and improve water quality.' },
          },
          {
            '@type': 'Question', name: 'How much does CRP cost taxpayers?',
            acceptedAnswer: { '@type': 'Answer', text: `CRP and its variants account for ${fmtMoney(crpTotal)} in total payments (${((crpTotal / allTotal) * 100).toFixed(1)}% of all farm subsidies) across ${fmt(crpPayments)} individual payments. The average CRP payment is approximately $${avgCrpPayment.toFixed(0)}.` },
          },
          {
            '@type': 'Question', name: 'Why is CRP controversial?',
            acceptedAnswer: { '@type': 'Answer', text: 'Critics argue CRP reduces food production while paying landowners who may not farm at all — including investors and retirees. In some rural counties, so much land is enrolled that local economies suffer from reduced agricultural activity. Supporters counter that CRP prevents 600 million tons of annual soil erosion and provides critical wildlife habitat.' },
          },
          {
            '@type': 'Question', name: 'How many acres are enrolled in CRP?',
            acceptedAnswer: { '@type': 'Answer', text: 'Currently about 23 million acres are enrolled in CRP, down from a peak of 36 million acres. The statutory cap is 27 million acres. Enrollment has declined as rental rates have lagged behind rising commodity prices, making farming more profitable than conservation payments for many landowners.' },
          },
        ],
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          The Conservation Reserve Program: Paying Farmers Not to Farm
        </h1>
        <ShareButtons title="" />
        <p className="text-lg text-gray-600">
          The CRP pays landowners annual rent to take environmentally sensitive cropland out of production.
          It&apos;s one of the largest farm programs — and one of the most debated.
        </p>
      </div>

      {/* Key Finding */}
      <div className="bg-green-50 border-l-4 border-primary p-5 rounded-r-lg mb-8">
        <p className="font-semibold text-primary text-sm uppercase tracking-wide mb-1">Key Finding</p>
        <p className="text-gray-900 font-medium">
          CRP and its variants account for {fmtMoney(crpTotal)} in payments — {((crpTotal / allTotal) * 100).toFixed(1)}% of
          all farm subsidies — across {fmt(crpPayments)} individual payments.
        </p>
      </div>

      {/* Stat cards */}
      <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        {[
          { label: 'Total CRP Spending', value: fmtMoney(crpTotal), sub: `${((crpTotal / allTotal) * 100).toFixed(1)}% of all subsidies` },
          { label: 'CRP Payments', value: fmt(crpPayments), sub: 'Individual payments' },
          { label: 'Avg Payment', value: `$${avgCrpPayment.toFixed(0)}`, sub: 'Per CRP payment' },
          { label: 'CRP Variants', value: crpPrograms.length.toString(), sub: 'Distinct programs' },
        ].map(s => (
          <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{s.value}</div>
            <div className="text-sm font-medium text-gray-900">{s.label}</div>
            <div className="text-xs text-gray-500">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="prose max-w-none">
        <h2 className="font-[family-name:var(--font-heading)]">How CRP Works</h2>
        <p>
          Created in the 1985 Farm Bill, the Conservation Reserve Program offers farmers 10-15 year contracts.
          In exchange for taking fragile land out of production, the USDA pays annual rental rates based on
          the soil&apos;s productivity and local land values. Enrolled land must be planted with grasses, trees,
          or other conservation cover.
        </p>
        <p>
          At its peak, CRP enrolled over 36 million acres — an area roughly the size of Iowa. Currently,
          about 23 million acres are enrolled, with a statutory cap of 27 million.
        </p>
        <p>
          The enrollment process is competitive. Landowners submit offers to their local Farm Service Agency
          office, specifying which acres they want to enroll and at what rental rate. USDA ranks offers using
          an Environmental Benefits Index (EBI) that considers soil erosion, water quality, wildlife habitat,
          and other factors. The highest-scoring offers are accepted until the acreage cap is reached.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">CRP Variants in the Data</h2>
        <p>
          CRP isn&apos;t a single program — it has evolved into a family of variants, each targeting
          specific conservation goals. The main CRP (general signup) accounts for the bulk of spending,
          but continuous signup options, grasslands initiatives, and state-specific programs create a
          complex web of conservation payments.
        </p>
        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Program</th>
                  <th className="px-4 py-2 text-right font-semibold">Total</th>
                  <th className="px-4 py-2 text-right font-semibold">Payments</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {crpPrograms.map((p, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{formatProgram(p.program)}</td>
                    <td className="px-4 py-2 text-right font-mono text-primary">{fmtMoney(p.amount)}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{fmt(p.payments)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 font-semibold">
                <tr>
                  <td className="px-4 py-2">Total CRP</td>
                  <td className="px-4 py-2 text-right font-mono text-primary">{fmtMoney(crpTotal)}</td>
                  <td className="px-4 py-2 text-right">{fmt(crpPayments)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Controversy: Paying to NOT Produce</h2>
        <p>
          Critics argue that CRP reduces food production at a time when global demand is rising. They
          point out that rental payments often go to landowners who don&apos;t farm at all — including
          investors and retirees. In some rural counties, so much land is enrolled in CRP that local
          economies feel the impact of reduced agricultural activity.
        </p>
        <p>
          Supporters counter that CRP delivers enormous environmental benefits: reduced soil erosion,
          improved water quality, carbon sequestration, and critical wildlife habitat. The program
          prevents an estimated 600 million tons of soil from eroding each year and has been credited
          with reviving populations of pheasants, ducks, and grassland songbirds.
        </p>
        <p>
          The tension between these views has intensified as commodity prices rose in the early 2020s.
          Higher crop prices make CRP rental payments less competitive — why accept $200/acre from
          the government when you can earn $400/acre growing corn? Enrollment has declined steadily,
          and some worry that decades of conservation gains could be lost as CRP contracts expire
          and landowners return sensitive acres to production.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Who Gets CRP Payments?</h2>
        <p>
          CRP is often portrayed as a program for small family farmers, but the data tells a more
          nuanced story. Large landholdings can enroll substantial acreage, and absentee landowners —
          including investors who purchased farmland as an asset class — are eligible for CRP
          rental payments as long as the land meets environmental criteria.
        </p>
        <p>
          In the Great Plains states, CRP enrollment is particularly high. Kansas, Montana, and the
          Dakotas have millions of acres enrolled, with some counties seeing 20-30% of total cropland
          in CRP. For these communities, CRP isn&apos;t just a conservation program — it&apos;s a
          major source of income that substitutes for the farming activity it displaced.
        </p>
        <p>
          The <Link href="/analysis/per-capita">per-capita subsidy analysis</Link> shows that the
          same states dominating CRP enrollment also top the per-capita subsidy rankings. These
          states receive both commodity payments for the acres they farm and CRP payments for the
          acres they don&apos;t — a dynamic the <Link href="/analysis/conservation-vs-commodity">
          conservation vs. commodity analysis</Link> explores in detail.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">CRP and the Environment</h2>
        <p>
          Whatever the critics say about CRP&apos;s economics, the environmental results are
          well-documented. USDA research shows CRP has:
        </p>
        <ul>
          <li>Reduced soil erosion by an estimated 600 million tons annually</li>
          <li>Sequestered approximately 12 million tons of CO2 equivalent per year</li>
          <li>Created or restored millions of acres of wetlands and grassland habitat</li>
          <li>Significantly improved water quality in watersheds with high CRP enrollment</li>
          <li>Boosted populations of pheasants, ducks, and grassland songbirds by 25-30%</li>
        </ul>
        <p>
          For environmental advocates, CRP is one of the few farm programs that delivers measurable
          public benefits beyond agricultural production. The question is whether the same environmental
          outcomes could be achieved at lower cost or through different mechanisms — like requiring
          conservation practices as a condition of receiving commodity subsidies, rather than paying
          separately for each.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">CRP Under Pressure</h2>
        <p>
          The 2025 farm crisis puts CRP in a difficult position. As commodity prices fall and farm
          incomes decline, pressure mounts to let CRP contracts expire and return land to production.
          Farm groups argue that maximizing planted acreage is essential for food security and export
          competitiveness. Conservation groups worry that releasing 23 million acres of CRP land
          would reverse decades of environmental progress.
        </p>
        <p>
          Congress faces a choice in the next Farm Bill: maintain CRP at current levels, expand it
          to capture more environmental benefits, or shrink it to boost production. The
          <Link href="/farm-subsidy-reform"> reform analysis</Link> argues for integrating
          conservation requirements into commodity programs — a compromise that could maintain
          environmental gains while reducing CRP&apos;s standalone cost.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Opportunity Cost</h2>
        <p>
          At {fmtMoney(crpTotal)}, CRP represents a significant investment of taxpayer money in
          paying farmers <em>not</em> to produce. From a government efficiency perspective, the
          question is straightforward: is the environmental return worth the cost?
        </p>
        <p>
          Compare CRP to other environmental spending: the entire EPA budget is about $10 billion
          per year. The National Park Service operates on $4 billion. CRP — a single USDA program —
          distributes {fmtMoney(crpTotal)} over the {stats.dataYears} period. On a per-acre basis,
          it may be one of the most cost-effective conservation tools available. On a total-dollar
          basis, it&apos;s one of the largest environmental expenditures in the federal budget.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Bottom Line</h2>
        <p>
          CRP represents a fundamentally different philosophy of farm spending — paying for
          environmental outcomes rather than crop production. Whether that&apos;s good policy depends on
          how you weigh food production against conservation. The dollars suggest Congress values both:
          CRP accounts for {((crpTotal / allTotal) * 100).toFixed(1)}% of the subsidy budget, while
          commodity and disaster programs claim the lion&apos;s share.
        </p>
        <p>
          For those skeptical of government spending, CRP is a complicated case. Unlike commodity
          subsidies that primarily benefit large operations, CRP delivers measurable environmental
          outcomes. But like all farm programs, it comes with bureaucratic overhead, questionable
          distribution (absentee landowners collecting payments), and the fundamental oddity of
          paying people <em>not</em> to do something. The <Link href="/doge-farm-subsidies">DOGE
          efficiency analysis</Link> and <Link href="/analysis/program-proliferation">program
          proliferation review</Link> provide additional context on whether the current structure
          makes sense.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Frequently Asked Questions</h2>

        <h3>What is the Conservation Reserve Program?</h3>
        <p>
          CRP pays landowners annual rental payments to take environmentally sensitive cropland out
          of production for 10-15 year contracts. Created in 1985, it currently enrolls about 23 million
          acres. Land must be planted with conservation cover — grasses, trees, or wetland vegetation.
        </p>

        <h3>How much does CRP cost taxpayers?</h3>
        <p>
          CRP and its variants total {fmtMoney(crpTotal)} in payments across {fmt(crpPayments)} individual
          disbursements during {stats.dataYears}. This represents {((crpTotal / allTotal) * 100).toFixed(1)}%
          of all farm subsidy spending.
        </p>

        <h3>Why is CRP controversial?</h3>
        <p>
          Critics say it reduces food production and pays landowners who may not farm at all. Supporters
          point to 600 million tons of prevented soil erosion annually and significant wildlife habitat
          restoration. The debate intensifies when commodity prices rise, making CRP payments less
          competitive with farming revenue.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Sources</p>
          <p>USDA Farm Service Agency payment data ({stats.dataYears}). Program totals from FSA payment files.
          CRP enrollment statistics from USDA FSA. Explore all programs on the <Link href="/programs" className="text-primary hover:underline">Programs page</Link> or
          browse <Link href="/categories" className="text-primary hover:underline">spending by category</Link>.</p>
        </div>

        <RelatedArticles currentSlug="crp-conservation" />
      </div>
    </article>
  )
}
