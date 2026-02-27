import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { fmt, fmtMoney } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How Much Does the US Spend on Farm Subsidies? $147B and Counting',
  description: 'The US spent $147B on farm subsidies from 2017-2025, averaging ~$16B/year and peaking at $38.7B in 2020. Year-by-year breakdown with per-taxpayer cost.',
  alternates: { canonical: 'https://www.opensubsidies.org/how-much-farm-subsidies' },
}

interface YearData {
  year: number
  payments: number
  amount: number
}

interface Stats {
  totalPayments: number
  totalAmount: number
  totalStates: number
  totalCounties: number
  totalPrograms: number
  dataYears: string
}

export default function HowMuchFarmSubsidiesPage() {
  const allYears = loadData('yearly.json') as YearData[]
  const stats = loadData('stats.json') as Stats

  // Filter to the main data years (2017-2025)
  const years = allYears.filter(y => y.year >= 2017 && y.year <= 2025)
  const peakYear = years.reduce((max, y) => y.amount > max.amount ? y : max, years[0])
  const totalAmount = years.reduce((s, y) => s + y.amount, 0)
  const avgPerYear = totalAmount / years.length

  // Context calculations
  const taxpayers = 150_000_000 // approximate US taxpayers
  const perTaxpayerPerYear = avgPerYear / taxpayers

  const faqItems = [
    {
      q: 'How much does the US spend on farm subsidies?',
      a: `From 2017 to 2025, the U.S. government distributed ${fmtMoney(totalAmount)} in farm subsidies through ${fmt(stats.totalPrograms)} USDA programs. That averages roughly ${fmtMoney(avgPerYear)} per year.`,
    },
    {
      q: 'How much has farm subsidy spending increased?',
      a: `Farm subsidy spending spiked dramatically in 2018-2020 due to the trade war with China ($13.5B in tariff bailouts) and COVID-19 ($14.2B in pandemic relief). Spending in 2020 was ${fmtMoney(peakYear.amount)} — more than double the typical year.`,
    },
    {
      q: 'What year had the most farm subsidies?',
      a: `${peakYear.year} was the peak year with ${fmtMoney(peakYear.amount)} in payments — driven primarily by COVID-19 pandemic relief programs and existing trade war bailout programs.`,
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumbs items={[{ label: 'How Much Are Farm Subsidies' }]} />

      <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-2">
        How Much Does the US Spend on Farm Subsidies?
      </h1>
      <p className="text-gray-600 mb-6 text-lg">
        A complete breakdown of U.S. farm subsidy spending from 2017 to 2025 — year by year, with context on what it means for taxpayers.
      </p>
      <ShareButtons title="How Much Does the US Spend on Farm Subsidies?" />

      {/* Quick Answer */}
      <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg my-8">
        <h2 className="font-bold text-green-900 text-lg mb-2">The Short Answer</h2>
        <p className="text-green-800">
          The U.S. spent <strong>{fmtMoney(totalAmount)}</strong> on farm subsidies from 2017–2025 — an average of <strong>{fmtMoney(avgPerYear)}/year</strong>. Spending peaked at <strong>{fmtMoney(peakYear.amount)}</strong> in {peakYear.year} due to COVID-19 relief. That&apos;s about <strong>${Math.round(perTaxpayerPerYear)}/year per taxpayer</strong>.
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total (2017–2025)', value: fmtMoney(totalAmount) },
          { label: 'Average Per Year', value: fmtMoney(avgPerYear) },
          { label: 'Peak Year', value: `${peakYear.year}` },
          { label: 'Per Taxpayer/Year', value: `$${Math.round(perTaxpayerPerYear)}` },
        ].map(stat => (
          <div key={stat.label} className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-xl font-bold text-green-700">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Year-by-Year Table */}
      <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mt-10 mb-4">
        Year-by-Year Breakdown
      </h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 pr-4 font-semibold">Year</th>
              <th className="text-right py-3 px-4 font-semibold">Payments</th>
              <th className="text-right py-3 px-4 font-semibold">Total Amount</th>
              <th className="text-right py-3 pl-4 font-semibold">% of Total</th>
            </tr>
          </thead>
          <tbody>
            {years.map(y => (
              <tr key={y.year} className={`border-b border-gray-100 hover:bg-gray-50 ${y.year === peakYear.year ? 'bg-green-50 font-semibold' : ''}`}>
                <td className="py-3 pr-4">
                  <Link href={`/years/${y.year}`} className="text-green-700 hover:underline">{y.year}</Link>
                  {y.year === peakYear.year && <span className="ml-2 text-xs text-green-600">← peak</span>}
                </td>
                <td className="py-3 px-4 text-right">{fmt(y.payments)}</td>
                <td className="py-3 px-4 text-right font-mono">{fmtMoney(y.amount)}</td>
                <td className="py-3 pl-4 text-right">{(y.amount / totalAmount * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-300 font-bold">
              <td className="py-3 pr-4">Total</td>
              <td className="py-3 px-4 text-right">{fmt(years.reduce((s, y) => s + y.payments, 0))}</td>
              <td className="py-3 px-4 text-right font-mono">{fmtMoney(totalAmount)}</td>
              <td className="py-3 pl-4 text-right">100%</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Visual bar chart */}
      <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mt-10 mb-4">
        Spending Over Time
      </h2>
      <div className="space-y-2 mb-10">
        {years.map(y => (
          <div key={y.year} className="flex items-center gap-3">
            <span className="w-12 text-sm text-gray-600 text-right">{y.year}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
              <div
                className="h-full bg-green-600 rounded-full flex items-center justify-end pr-2"
                style={{ width: `${(y.amount / peakYear.amount * 100)}%` }}
              >
                {y.amount / peakYear.amount > 0.2 && (
                  <span className="text-white text-xs font-medium">{fmtMoney(y.amount)}</span>
                )}
              </div>
            </div>
            {y.amount / peakYear.amount <= 0.2 && (
              <span className="text-xs text-gray-500">{fmtMoney(y.amount)}</span>
            )}
          </div>
        ))}
      </div>

      {/* Context */}
      <div className="prose max-w-none text-gray-700 mt-10">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Putting It in Context</h2>
        <p>
          At roughly {fmtMoney(avgPerYear)} per year, farm subsidies represent about <strong>0.3% of the federal budget</strong>. For the average American taxpayer, that works out to about <strong>${Math.round(perTaxpayerPerYear)} per year</strong> — roughly the cost of a streaming subscription.
        </p>
        <p>
          However, the spending is highly concentrated. Five states — Texas, Iowa, Illinois, Kansas, and North Dakota — receive nearly a third of all farm subsidies. And within states, the top 10% of recipients collect about 75% of the money.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Why Did Spending Spike in 2018–2020?</h2>
        <p>
          Two major events caused farm subsidy spending to roughly triple in just three years:
        </p>
        <ul>
          <li><strong>Trade War (2018–2019):</strong> The Market Facilitation Program distributed $13.5B to offset losses from U.S.-China tariffs.</li>
          <li><strong>COVID-19 (2020):</strong> The Coronavirus Food Assistance Program (CFAP) added $14.2B in pandemic relief payments, pushing 2020 to a record {fmtMoney(peakYear.amount)}.</li>
        </ul>
        <p>
          Read more in our <Link href="/analysis/covid-spending" className="text-green-700 hover:underline">COVID spending analysis</Link> and <Link href="/analysis/trade-war" className="text-green-700 hover:underline">trade war analysis</Link>.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">How Much Do You Contribute?</h2>
        <p>
          Use our <Link href="/tools/taxpayer-calculator" className="text-green-700 hover:underline">Taxpayer Calculator</Link> to see exactly how much of your federal taxes go to farm subsidies based on your income.
        </p>
      </div>

      {/* FAQ */}
      <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mt-12 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqItems.map(item => (
          <div key={item.q} className="border-b border-gray-100 pb-4">
            <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
            <p className="text-gray-600 text-sm">{item.a}</p>
          </div>
        ))}
      </div>

      {/* Related */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="font-bold text-lg mb-3">Related Pages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <Link href="/dashboard" className="text-green-700 hover:underline">Dashboard</Link>
          <Link href="/trends" className="text-green-700 hover:underline">Spending Trends</Link>
          <Link href="/tools/taxpayer-calculator" className="text-green-700 hover:underline">Taxpayer Calculator</Link>
          <Link href="/analysis/covid-spending" className="text-green-700 hover:underline">COVID Spending</Link>
          <Link href="/analysis/trade-war" className="text-green-700 hover:underline">Trade War Spending</Link>
          <Link href="/who-gets-farm-subsidies" className="text-green-700 hover:underline">Who Gets Farm Subsidies?</Link>
          <Link href="/biggest-farm-subsidies" className="text-green-700 hover:underline">Biggest Farm Subsidies</Link>
        </div>
      </div>
    </div>
  )
}
