import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'COVID Changed Farm Subsidies Forever: The $38.7 Billion Story',
  description: 'In 2020, COVID-19 triggered $38.7B in farm subsidies — more than double the previous peak. CFAP, pandemic payments, and how emergency spending reshaped agriculture.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/covid-spending' },
}

export default function CovidSpending() {
  const yearly = loadData('yearly.json') as { year: number; payments: number; amount: number }[]
  const y2020 = yearly.find(y => y.year === 2020)!
  const y2019 = yearly.find(y => y.year === 2019)!
  const y2021 = yearly.find(y => y.year === 2021)!
  const y2017 = yearly.find(y => y.year === 2017)!
  const preCovidAvg = yearly.filter(y => y.year >= 2017 && y.year <= 2019).reduce((s, y) => s + y.amount, 0) / 3

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="COVID Changed Farm Subsidies Forever: The $38.7 Billion Story" description="In 2020, COVID-19 triggered $38.7B in farm subsidies — more than double the previous peak. CFAP, pandemic payments, and how emergency spending reshaped agricult" slug="analysis/covid-spending" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'COVID Spending' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'COVID Changed Farm Subsidies Forever: The $38.7 Billion Story',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.org' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
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

        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 Key Insight</p>
          <p className="text-sm text-gray-700 mt-1">
            2020 spending of {fmtMoney(y2020.amount)} was {(y2020.amount / preCovidAvg).toFixed(1)}x the pre-pandemic
            average ({fmtMoney(preCovidAvg)}). Even after COVID, spending never returned to pre-2018 levels —
            2021 still saw {fmtMoney(y2021.amount)} in payments.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Year-by-Year Comparison</h2>
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

        <h2 className="font-[family-name:var(--font-heading)]">The Lasting Impact</h2>
        <p>
          COVID didn&apos;t just create a temporary spending spike — it permanently shifted the baseline. Before 2018,
          annual farm subsidy spending in our dataset hovered around {fmtMoney(y2017.amount)}. The combination of
          trade war payments (2018-2019) and COVID relief (2020) created a &quot;new normal&quot; where Congress and
          farmers alike expected larger federal support.
        </p>
        <p>
          By 2021, spending dropped to {fmtMoney(y2021.amount)} — a decline from the peak, but still 45% above
          2017 levels. The precedent was set: when markets faltered, the government would step in with
          massive direct payments.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Who Got the COVID Money?</h2>
        <p>
          Like traditional farm subsidies, COVID payments skewed heavily toward the largest operations. Cattle ranchers,
          dairy producers, and row crop farmers in states like Texas, Iowa, and Illinois received the lion&apos;s share.
          The payment cap of $250,000 per person sounds high — but entities with multiple members could receive
          multiples of that cap.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Source</p>
          <p>Analysis based on USDA Farm Service Agency payment records, 2017-2025.
          COVID-era programs include CFAP 1, CFAP 2, Pandemic Livestock Indemnity, and related emergency programs.</p>
        </div>
            <RelatedArticles currentSlug="covid-spending" />
</div>
    </article>
  )
}
