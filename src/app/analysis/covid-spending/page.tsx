import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'COVID Changed Farm Subsidies Forever: The $38.7 Billion Story',
  description: 'In 2020, COVID-19 triggered $38.7B in farm subsidies — more than double the previous peak. CFAP, pandemic payments, and how emergency spending reshaped agriculture.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/covid-spending' },
  openGraph: {
    title: 'COVID Changed Farm Subsidies Forever: The $38.7 Billion Story',
    description: 'In 2020, COVID-19 triggered $38.7B in farm subsidies — more than double the previous peak.',
    url: 'https://www.opensubsidies.org/analysis/covid-spending',
    type: 'article',
  },
}

export default function CovidSpending() {
  const yearly = loadData('yearly.json') as { year: number; payments: number; amount: number }[]
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalPrograms: number; dataYears: string }
  const y2020 = yearly.find(y => y.year === 2020)!
  const y2019 = yearly.find(y => y.year === 2019)!
  const y2021 = yearly.find(y => y.year === 2021)!
  const y2017 = yearly.find(y => y.year === 2017)!
  const y2022 = yearly.find(y => y.year === 2022)
  const preCovidAvg = yearly.filter(y => y.year >= 2017 && y.year <= 2019).reduce((s, y) => s + y.amount, 0) / 3
  const covidSurge = y2020.amount - preCovidAvg

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="COVID Changed Farm Subsidies Forever: The $38.7 Billion Story" description="In 2020, COVID-19 triggered $38.7B in farm subsidies — more than double the previous peak." slug="analysis/covid-spending" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'COVID Spending' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'COVID Changed Farm Subsidies Forever: The $38.7 Billion Story',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.org' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question', name: 'How much did COVID farm subsidies cost?',
            acceptedAnswer: { '@type': 'Answer', text: `In 2020, total farm subsidy spending reached ${fmtMoney(y2020.amount)} — ${(y2020.amount / preCovidAvg).toFixed(1)}x the pre-pandemic average of ${fmtMoney(preCovidAvg)}. The excess spending attributable to COVID-era programs was approximately ${fmtMoney(covidSurge)}.` },
          },
          {
            '@type': 'Question', name: 'What was CFAP (Coronavirus Food Assistance Program)?',
            acceptedAnswer: { '@type': 'Answer', text: 'CFAP was the largest emergency farm program in U.S. history, providing direct payments to farmers affected by COVID-19 market disruptions. CFAP 1 (May 2020) offered up to $250,000 per person. CFAP 2 (September 2020) expanded eligibility. Combined, the programs distributed billions in direct payments based on planted acreage, livestock inventory, and dairy production.' },
          },
          {
            '@type': 'Question', name: 'Did farm subsidies return to normal after COVID?',
            acceptedAnswer: { '@type': 'Answer', text: `No. Even after the pandemic peak, spending never fully returned to pre-COVID levels. 2021 saw ${fmtMoney(y2021.amount)} — a decline from 2020 but still well above 2017 levels of ${fmtMoney(y2017.amount)}. COVID permanently shifted the baseline for expected farm spending.` },
          },
          {
            '@type': 'Question', name: 'Who received the most COVID farm subsidies?',
            acceptedAnswer: { '@type': 'Answer', text: 'Like traditional farm subsidies, COVID payments skewed heavily toward the largest operations. Cattle ranchers, dairy producers, and row crop farmers in Texas, Iowa, and Illinois received the most. The $250,000 per-person cap was circumvented by entities with multiple qualifying members.' },
          },
        ],
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          COVID Changed Farm Subsidies Forever: The {fmtMoney(y2020.amount)} Story
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-lg text-gray-600">
            In 2020, pandemic relief programs shattered every spending record in USDA history.
          </p>
          <ShareButtons title="COVID Changed Farm Subsidies Forever" />
        </div>
      </div>

      <div className="prose max-w-none">
        {/* Key stats grid */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: '2020 Total', value: fmtMoney(y2020.amount), sub: 'Peak year' },
            { label: 'Payments', value: fmt(y2020.payments), sub: 'In 2020 alone' },
            { label: 'vs. 2019', value: `+${((y2020.amount / y2019.amount - 1) * 100).toFixed(0)}%`, sub: 'Year over year' },
            { label: 'vs. Pre-COVID Avg', value: `${(y2020.amount / preCovidAvg).toFixed(1)}x`, sub: '2017-2019 average' },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm font-medium text-gray-900">{s.label}</div>
              <div className="text-xs text-gray-500">{s.sub}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Pandemic Spending Explosion</h2>
        <p>
          When COVID-19 shut down restaurants, schools, and food processing plants in early 2020, the agricultural
          supply chain faced an unprecedented crisis. Dairy farmers dumped milk. Produce rotted in fields. Livestock
          producers had nowhere to send animals. The USDA responded with the most massive farm payment program in
          American history.
        </p>
        <p>
          The Coronavirus Food Assistance Program (CFAP) delivered direct payments to farmers and ranchers affected
          by market disruptions. CFAP 1, launched in May 2020, provided up to $250,000 per person. CFAP 2, announced
          in September 2020, expanded eligibility and added flat-rate payments for certain crops.
        </p>
        <p>
          The speed of deployment was remarkable — and the oversight was minimal. USDA used its Commodity Credit
          Corporation (CCC) authority to bypass normal congressional appropriations, distributing billions within
          weeks of program announcement. The same mechanism had been used for <Link href="/analysis/trade-war">trade
          war bailout payments</Link> just two years earlier, establishing the administrative precedent that
          made COVID spending possible at this scale.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 Key Insight</p>
          <p className="text-sm text-gray-700 mt-1">
            2020 spending of {fmtMoney(y2020.amount)} was {(y2020.amount / preCovidAvg).toFixed(1)}x the pre-pandemic
            average ({fmtMoney(preCovidAvg)}). Even after COVID, spending never returned to pre-2018 levels —
            2021 still saw {fmtMoney(y2021.amount)} in payments.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Year-by-Year Comparison</h2>
        <p>
          The table below shows the dramatic spending arc from pre-trade-war normalcy through the
          COVID peak and its aftermath. Note how the baseline permanently shifted upward — even
          &quot;normal&quot; years after 2020 remain elevated compared to 2017.
        </p>
        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Year</th>
                  <th className="px-4 py-2 text-right font-semibold">Total Spending</th>
                  <th className="px-4 py-2 text-right font-semibold">Payments</th>
                  <th className="px-4 py-2 text-right font-semibold hidden md:table-cell">vs. 2017</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {yearly.filter(y => y.year >= 2017 && y.year <= 2025).map(y => (
                  <tr key={y.year} className={y.year === 2020 ? 'bg-red-50 font-semibold' : 'hover:bg-gray-50'}>
                    <td className="px-4 py-2">{y.year}{y.year === 2020 ? ' 🦠' : ''}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtMoney(y.amount)}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{fmt(y.payments)}</td>
                    <td className="px-4 py-2 text-right text-gray-600 hidden md:table-cell">{(y.amount / y2017.amount).toFixed(1)}x</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">CFAP: The Biggest Emergency Farm Program Ever</h2>
        <p>
          CFAP wasn&apos;t just large — it was historically unprecedented. Previous emergency programs like the Market
          Facilitation Program (2018-2019 trade war era) had already pushed spending to new highs. But CFAP dwarfed
          even those records. The program paid producers based on their planted acreage, livestock inventory, and
          dairy production — effectively compensating for market losses caused by the pandemic.
        </p>
        <p>
          The program design created some unusual outcomes. Farmers who had already sold their products
          before prices crashed still qualified for payments based on planted acreage. Some operations
          received CFAP payments despite experiencing no actual losses — they had forward-contracted
          their crops at pre-pandemic prices. The broad eligibility criteria meant that CFAP acted
          more as a general income supplement than targeted disaster relief.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Precedent Problem</h2>
        <p>
          COVID didn&apos;t just create a temporary spending spike — it permanently shifted the baseline. Before 2018,
          annual farm subsidy spending in our dataset hovered around {fmtMoney(y2017.amount)}. The combination of
          trade war payments (2018-2019) and COVID relief (2020) created a &quot;new normal&quot; where Congress and
          farmers alike expected larger federal support.
        </p>
        <p>
          By 2021, spending dropped to {fmtMoney(y2021.amount)} — a decline from the peak, but still well above
          2017 levels. The precedent was set: when markets faltered, the government would step in with
          massive direct payments. This expectation now influences farm business decisions — why buy
          crop insurance when CFAP-style programs might cover your losses for free?
        </p>
        <p>
          The moral hazard is real. Farmers who witnessed the COVID bailout now factor potential emergency
          payments into their risk calculations. Plant more acres, take on more debt, expand aggressively —
          if things go wrong, Congress will likely create another emergency program. This calculus
          undermines both private risk management and the traditional crop insurance system.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Who Got the COVID Money?</h2>
        <p>
          Like traditional farm subsidies, COVID payments skewed heavily toward the largest operations. Cattle ranchers,
          dairy producers, and row crop farmers in states like Texas, Iowa, and Illinois received the lion&apos;s share.
          The payment cap of $250,000 per person sounds high — but entities with multiple members could receive
          multiples of that cap.
        </p>
        <p>
          The <Link href="/analysis/small-vs-large">small vs. large farm analysis</Link> shows this pattern
          persisted through COVID. Small farms that were actually struggling — the roadside vegetable stands
          that lost their farmers&apos; market customers, the small dairy operations that couldn&apos;t dump
          enough milk to qualify — received minimal payments compared to large commodity operations.
        </p>
        <p>
          The <Link href="/analysis/state-winners-losers">state winners and losers analysis</Link> reveals
          which states saw the biggest COVID-era spending surges. States with large livestock and commodity
          sectors saw their farm subsidies multiply several times over, while states with diversified
          agriculture saw more modest increases.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Supply Chain Myth</h2>
        <p>
          The justification for CFAP was supply chain disruption — farmers couldn&apos;t sell their products
          because the food service industry shut down. This was real for some sectors (dairy, specialty crops
          sold to restaurants) but less true for commodity crops that traded on global markets.
        </p>
        <p>
          Corn and soybean prices did dip in spring 2020 but recovered by fall. Yet CFAP payments based
          on spring planted acreage went out regardless of the recovery. By the end of 2020, many commodity
          farmers had received both CFAP payments for &quot;losses&quot; and strong market prices for
          their actual production. The combination produced record farm income in 2020 and 2021 —
          funded in large part by taxpayers.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Lasting Impact on Farm Policy</h2>
        <p>
          COVID fundamentally changed the farm subsidy landscape in several ways:
        </p>
        <ul>
          <li><strong>Elevated baseline:</strong> Post-COVID spending expectations are permanently higher, making budget-neutral reform nearly impossible</li>
          <li><strong>CCC precedent:</strong> Using USDA&apos;s commodity credit authority for massive direct payments is now an established tool, reducing congressional oversight</li>
          <li><strong>Moral hazard:</strong> Farmers now expect emergency programs during downturns, reducing incentives for private risk management</li>
          <li><strong>Political lock-in:</strong> Any attempt to reduce spending back to pre-2018 levels faces opposition from farmers who consider post-COVID levels the &quot;new normal&quot;</li>
          <li><strong>Insurance displacement:</strong> Free emergency payments undermine the value proposition of crop insurance, which farmers must pay premiums for</li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)]">What Should Have Been Different?</h2>
        <p>
          Emergency relief during genuine crises isn&apos;t inherently wrong. But the design of CFAP
          raised legitimate concerns about efficiency and targeting. Better alternatives could have included:
        </p>
        <ul>
          <li>Payments tied to <em>actual documented losses</em> rather than planted acreage</li>
          <li>Lower payment caps with no entity-structure workarounds</li>
          <li>Automatic sunset clauses requiring Congressional reauthorization</li>
          <li>Means-testing to exclude operations that didn&apos;t experience meaningful losses</li>
          <li>Integration with existing crop insurance rather than creating parallel programs</li>
        </ul>
        <p>
          The <Link href="/farm-subsidy-reform">reform analysis</Link> elaborates on these ideas, and
          the <Link href="/doge-farm-subsidies">DOGE efficiency review</Link> asks whether the emergency
          spending infrastructure can be reined in or has become a permanent feature of farm policy.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The DOGE Perspective on COVID Farm Spending</h2>
        <p>
          From a government efficiency standpoint, COVID farm spending raises difficult questions.
          Was it necessary to pay farmers who hadn&apos;t experienced actual losses? Could existing
          crop insurance programs have handled the disruption? Did the speed of deployment justify
          the lack of verification? The <Link href="/doge-farm-subsidies">DOGE analysis</Link>
          identifies emergency spending reform as the highest-priority target for farm subsidy
          efficiency improvements.
        </p>
        <p>
          The numbers are stark: {fmtMoney(covidSurge)} in excess spending above the pre-COVID
          baseline, distributed across millions of payments with minimal verification, to a
          sector that ultimately posted record income in 2020 and 2021. Whatever the justification
          at the time, the aftermath suggests the response was both too large and too poorly
          targeted.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Frequently Asked Questions</h2>

        <h3>How much did COVID farm subsidies cost?</h3>
        <p>
          Total 2020 farm subsidy spending reached {fmtMoney(y2020.amount)}, approximately {(y2020.amount / preCovidAvg).toFixed(1)}x
          the pre-pandemic average. The excess spending above the baseline was roughly {fmtMoney(covidSurge)}.
        </p>

        <h3>What was CFAP?</h3>
        <p>
          The Coronavirus Food Assistance Program was the largest emergency farm program in U.S. history,
          providing direct payments to farmers affected by pandemic market disruptions. CFAP 1 (May 2020)
          and CFAP 2 (September 2020) paid based on acreage, livestock inventory, and dairy production.
        </p>

        <h3>Did farm subsidies return to normal after COVID?</h3>
        <p>
          No. 2021 spending of {fmtMoney(y2021.amount)} remained well above pre-COVID levels. The pandemic
          permanently elevated spending expectations and established precedents for emergency programs that
          continue to influence farm policy debates.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Source</p>
          <p>Analysis based on USDA Farm Service Agency payment records, {stats.dataYears}.
          COVID-era programs include CFAP 1, CFAP 2, Pandemic Livestock Indemnity, and related emergency programs.
          Explore year-by-year trends on the <Link href="/trends" className="text-primary hover:underline">trends page</Link> or
          see <Link href="/analysis/trade-war" className="text-primary hover:underline">trade war spending</Link> for
          the pre-COVID emergency spending precedent.</p>
        </div>

        <RelatedArticles currentSlug="covid-spending" />
      </div>
    </article>
  )
}
