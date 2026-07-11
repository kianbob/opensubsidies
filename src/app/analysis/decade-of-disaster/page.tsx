import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { fmtMoney, fmt, formatProgram } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'A Decade of Disaster: How Emergency Programs Took Over Farm Subsidies',
  description: 'Emergency and disaster programs went from supplemental to dominant in US farm spending. Pre-2018 vs post-2018 data tells the story.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/decade-of-disaster' },
  openGraph: {
    title: `A Decade of Disaster: How Emergency Programs Took Over Farm Subsidies`,
    description: `Emergency and disaster programs went from supplemental to dominant in US farm spending. Pre-2018 vs post-2018 data tells the story.`,
    url: 'https://www.opensubsidies.org/analysis/decade-of-disaster',
    type: 'article',
  },
}

export default function DecadeOfDisasterPage() {
  const yearly = loadData('yearly.json') as { year: number; amount: number; payments: number }[]
  const programs = loadData('programs.json') as { program: string; amount: number; payments: number }[]
  const stats = loadData('stats.json')

  const pre2018 = yearly.filter(y => y.year >= 2017 && y.year <= 2018)
  const post2018 = yearly.filter(y => y.year >= 2019 && y.year <= 2025)
  const pre2018Avg = pre2018.reduce((s, y) => s + y.amount, 0) / (pre2018.length || 1)
  const post2018Avg = post2018.reduce((s, y) => s + y.amount, 0) / (post2018.length || 1)
  const peak = yearly.reduce((a, b) => a.amount > b.amount ? a : b)
  const low = yearly.reduce((a, b) => a.amount < b.amount ? a : b)
  const multiplier = (post2018Avg / pre2018Avg).toFixed(1)

  const disasterProgs = programs.filter(p =>
    /EMERGENCY|DISASTER|RELIEF|ELAP|CFAP|WHIP|ERP|ECAP/i.test(p.program)
  )
  const disasterTotal = disasterProgs.reduce((s, p) => s + p.amount, 0)
  const totalAmount = programs.reduce((s, p) => s + p.amount, 0)
  const disasterPct = ((disasterTotal / totalAmount) * 100).toFixed(0)
  const pre2018Total = pre2018.reduce((s, y) => s + y.amount, 0)
  const post2018Total = post2018.reduce((s, y) => s + y.amount, 0)
  const surgeAmount = post2018Total - (pre2018Avg * post2018.length)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="A Decade of Disaster: How Emergency Programs Took Over Farm Subsidies" description="Emergency and disaster programs went from supplemental to dominant in US farm spending. Pre-2018 vs post-2018 data tells the story." slug="analysis/decade-of-disaster" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'A Decade of Disaster' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'A Decade of Disaster: How Emergency Programs Took Over Farm Subsidies',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.org' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How much did emergency farm spending increase after 2018?', acceptedAnswer: { '@type': 'Answer', text: `Average annual farm spending jumped from ${fmtMoney(pre2018Avg)} (2017-2018) to ${fmtMoney(post2018Avg)} (2019-2025) — a ${multiplier}× increase. The peak year was ${peak.year} at ${fmtMoney(peak.amount)}.` }},
          { '@type': 'Question', name: 'What caused the surge in emergency farm spending?', acceptedAnswer: { '@type': 'Answer', text: 'Three cascading crises drove the surge: trade war retaliation (2018-2019) led to Market Facilitation Payments, the COVID-19 pandemic (2020) triggered CFAP, and ongoing climate disasters fueled the Emergency Relief Program. Each crisis built on the spending infrastructure of the previous one.' }},
          { '@type': 'Question', name: 'What percentage of farm subsidies are emergency programs?', acceptedAnswer: { '@type': 'Answer', text: `Emergency and disaster programs now account for ${disasterPct}% of all farm subsidy spending, totaling ${fmtMoney(disasterTotal)} out of ${fmtMoney(totalAmount)}.` }},
          { '@type': 'Question', name: 'Will emergency farm spending return to pre-2018 levels?', acceptedAnswer: { '@type': 'Answer', text: 'Unlikely. Even in the most recent years, spending remains well above the 2017 baseline. Climate change is increasing disaster frequency, trade disruptions continue, and the political infrastructure for emergency farm spending is now well-established.' }},
        ]
      })}} />

      <div className="mb-8">
        <div className="flex items-start justify-between">
          <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
          <ShareButtons title="A Decade of Disaster: How Emergency Programs Took Over Farm Subsidies" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          A Decade of Disaster: How Emergency Programs Took Over Farm Subsidies
        </h1>
        <p className="text-lg text-gray-600">
          In less than a decade, emergency and disaster programs went from a supplemental safety net to the
          dominant form of federal agricultural spending — accounting for {fmtMoney(disasterTotal)} of the total.
        </p>
      </div>

      <div className="prose max-w-none">
        {/* Key stats grid */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Pre-2019 Annual Avg', value: fmtMoney(pre2018Avg) },
            { label: 'Post-2018 Annual Avg', value: fmtMoney(post2018Avg) },
            { label: 'Spending Multiplier', value: `${multiplier}×` },
            { label: 'Peak Year', value: `${peak.year}` },
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
            Average annual spending jumped from {fmtMoney(pre2018Avg)} (2017–2018) to {fmtMoney(post2018Avg)} (2019–2025) — a {multiplier}× increase. The peak year was {peak.year} at {fmtMoney(peak.amount)}.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Before and After</h2>
        <p>
          In 2017, total USDA farm subsidy spending stood at {fmtMoney(yearly.find(y => y.year === 2017)?.amount || 0)}.
          By {peak.year}, it had exploded to {fmtMoney(peak.amount)} — a
          {' '}{((peak.amount) / (yearly.find(y => y.year === 2017)?.amount || 1)).toFixed(1)}× increase.
          The culprit? A cascade of crises: trade wars in 2018–2019, the COVID-19 pandemic
          in 2020, and ongoing climate disasters that triggered billions in emergency relief.
        </p>
        <p>
          Had spending remained at pre-2019 levels, taxpayers would have saved approximately {fmtMoney(surgeAmount)} over
          the post-2018 period. That&apos;s the &quot;emergency premium&quot; — the extra cost of a system that now treats
          perpetual crisis as the baseline.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Year-by-Year Breakdown</h2>
        <div className="not-prose my-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Year</th>
                  <th className="px-4 py-2 text-right font-semibold">Total Spending</th>
                  <th className="px-4 py-2 text-right font-semibold">Payments</th>
                  <th className="px-4 py-2 text-right font-semibold">vs. 2017</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {yearly.map(y => {
                  const baseline = yearly.find(yr => yr.year === 2017)?.amount || 1
                  const change = ((y.amount - baseline) / baseline * 100).toFixed(0)
                  return (
                    <tr key={y.year} className={`hover:bg-gray-50 ${y.year === peak.year ? 'bg-amber-50' : ''}`}>
                      <td className="px-4 py-2 font-medium">{y.year} {y.year === peak.year ? '📈' : ''}</td>
                      <td className="px-4 py-2 text-right font-mono">{fmtMoney(y.amount)}</td>
                      <td className="px-4 py-2 text-right text-gray-600">{fmt(y.payments)}</td>
                      <td className={`px-4 py-2 text-right font-mono ${Number(change) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {Number(change) > 0 ? '+' : ''}{change}%
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Emergency Spending by the Numbers</h2>
        <p>
          Our analysis identified {disasterProgs.length} emergency and disaster programs that collectively paid
          out {fmtMoney(disasterTotal)} — that&apos;s {disasterPct}% of all farm
          subsidies in the dataset. The largest include:
        </p>

        <div className="not-prose my-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-left font-semibold">Program</th><th className="px-4 py-2 text-right font-semibold">Amount</th><th className="px-4 py-2 text-right font-semibold">Payments</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {disasterProgs.sort((a, b) => b.amount - a.amount).slice(0, 10).map(p => (
                  <tr key={p.program} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-xs">{formatProgram(p.program)}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtMoney(p.amount)}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{fmt(p.payments)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Crisis Cascade</h2>
        <p>
          What makes the post-2018 era unique isn&apos;t any single crisis — it&apos;s the cascade effect. Each
          emergency built on the spending infrastructure of the previous one:
        </p>
        <ul>
          <li><strong>2018–2019:</strong> Trade war retaliation triggered Market Facilitation Payments. The USDA proved it could distribute billions quickly outside the normal farm bill process.</li>
          <li><strong>2020:</strong> COVID-19 hit, and the USDA used its trade-war playbook to create CFAP — the largest emergency farm program in history. Direct payments to producers were normalized.</li>
          <li><strong>2021–present:</strong> Climate disasters triggered ERP and ongoing disaster assistance. The precedent was set: if something goes wrong, farmers expect (and receive) emergency federal payments.</li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)]">The Ratchet Effect</h2>
        <p>
          Government spending has a well-known ratchet effect: it goes up during crises and never fully
          comes back down. The farm subsidy data illustrates this perfectly. Even as the immediate crises
          pass, spending remains elevated because:
        </p>
        <ul>
          <li>New programs created during emergencies become semi-permanent</li>
          <li>Farmers restructure their operations around expected federal support</li>
          <li>Political coalitions form around maintaining elevated spending</li>
          <li>Each new crisis provides justification for the next emergency program</li>
        </ul>
        <p>
          The low year in our dataset was {low.year} at {fmtMoney(low.amount)}. Even the most recent years
          remain well above this baseline, suggesting that the era of emergency-dominated farm spending is
          far from over.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Budget Impact</h2>
        <p>
          The surge in emergency spending has enormous fiscal implications. Pre-2019, farm subsidies
          were a relatively predictable budget item. Congressional Budget Office projections could
          reasonably estimate farm spending based on farm bill authorizations.
        </p>
        <p>
          Post-2018, farm spending has become wildly unpredictable. Emergency programs are funded
          through supplemental appropriations that bypass the normal budgeting process. CBO baseline
          projections — which form the foundation of farm bill negotiations — systematically
          underestimate actual spending because they can&apos;t predict future emergencies.
        </p>
        <p>
          The practical effect: farm spending is effectively unbudgeted. Congress authorizes a farm bill
          with projected costs, then spends multiples of that through emergency channels. Taxpayers
          have no way to know in advance what agriculture will cost them in any given year. In {peak.year},
          actual spending hit {fmtMoney(peak.amount)} — a figure that would have been unthinkable
          in the pre-emergency era.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Who Wins in the Emergency Era?</h2>
        <p>
          Emergency spending favors the same recipients who benefit from regular programs — large
          commodity producers in top farm states. But emergency programs often have weaker targeting,
          fewer payment limits, and less oversight than regular programs. The result: emergency
          spending concentrates even more heavily among the biggest operations.
        </p>
        <p>
          Small and diversified farms, which are often more resilient to individual disasters but
          less adept at navigating government programs, tend to receive less from emergency spending.
          The very operations that most need a safety net are the least likely to benefit from
          emergency programs designed for commodity agriculture.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The New Normal?</h2>
        <p>
          The shift to emergency spending raises fundamental questions about U.S. farm policy. Traditional programs
          like <Link href="/analysis/crp-under-threat">CRP</Link> and Price Loss Coverage were designed for
          predictable support. But when emergencies become the norm — trade wars, pandemics, climate disasters — the
          &quot;emergency&quot; label starts to feel permanent.
        </p>
        <p>
          If we&apos;re going to spend at emergency levels every year, shouldn&apos;t that spending be formally authorized
          through the farm bill, with proper CBO scoring, payment limits, and accountability mechanisms? Or do we
          prefer the current system where billions flow through ad hoc programs with minimal oversight?
        </p>
        <p>
          The answer reveals a lot about our appetite for fiscal accountability in agriculture. For now, the
          disaster money machine keeps running.
        </p>
        <p>
          Explore <Link href="/analysis/disaster-spending">our disaster spending analysis</Link> for program-level
          details, or see <Link href="/trends">spending trends</Link> over time. For the broader context,
          read about <Link href="/analysis/what-147b-buys">what $147 billion could buy instead</Link>.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Lesson for Taxpayers</h2>
        <p>
          The decade of disaster teaches a clear lesson about government spending: emergency programs
          are easy to create, hard to end, and almost impossible to shrink once established. Every
          crisis creates its own constituency — recipients who expect the program to continue, staff
          who administer it, and politicians who take credit for it.
        </p>
        <p>
          For taxpayers who believe in fiscal discipline, the farm subsidy trajectory should be
          alarming. A spending level that would have been considered outrageous in 2017 is now
          the baseline. And the next crisis — whatever it is — will push spending higher still,
          creating a new baseline that future Congresses will treat as normal.
        </p>
        <p>
          The only way to break this cycle is to subject emergency farm spending to the same
          scrutiny as regular farm bill programs: formal authorization, CBO scoring, payment
          limits, and sunset provisions. If a program is needed, authorize it properly. If it&apos;s
          not, let it expire. The era of blank-check emergency spending should end.
        </p>
        <p>
          The decade of disaster didn&apos;t just change how much the government spends on agriculture.
          It changed the fundamental relationship between farmers and the federal government.
          What was once a safety net is now an expectation. What was once emergency is now
          routine. And until policymakers acknowledge this shift and build proper accountability
          into the new reality, taxpayers will continue footing an ever-growing bill.
        </p>
        <p>
          The numbers are stark: from {fmtMoney(low.amount)} in {low.year} to {fmtMoney(peak.amount)} in
          {' '}{peak.year}. A {multiplier}× increase in average annual spending. {disasterProgs.length} emergency
          programs consuming {disasterPct}% of the budget. These aren&apos;t just statistics — they&apos;re a
          warning that the emergency spending infrastructure, once built, becomes permanent.
        </p>
        <p>
          Every crisis creates its own spending constituency. Every spending constituency fights to
          maintain its programs. And every new farm bill accommodates the old programs while creating
          new ones. The trajectory is clear, and without deliberate reform, it will continue
          in only one direction: up.
        </p>
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Source</p>
          <p>USDA Farm Service Agency payment records, 2017–2025. {fmt(stats.totalPayments)} total payments
          across {stats.totalPrograms} programs. Year-over-year analysis based on payment date.</p>
        </div>

        <RelatedArticles currentSlug="decade-of-disaster" />
      </div>
    </article>
  )
}
