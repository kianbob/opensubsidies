import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { loadData, fmtMoney, fmt } from '@/lib/utils'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'

export const metadata: Metadata = {
  title: 'Trade War Fallout: $39 Billion in Tariff Bailout Payments (2018-2019)',
  description: 'The US-China trade war triggered $39B in farm subsidy payments through the Market Facilitation Program. How tariffs reshaped agricultural spending.',
}

export default function TradeWar() {
  const yearly = loadData('yearly.json') as { year: number; payments: number; amount: number }[]
  const y2017 = yearly.find(y => y.year === 2017)!
  const y2018 = yearly.find(y => y.year === 2018)!
  const y2019 = yearly.find(y => y.year === 2019)!
  const tradeWarTotal = y2018.amount + y2019.amount

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Trade War Impact' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Trade War Fallout: $39 Billion in Tariff Bailout Payments',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.us' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Trade War Fallout: {fmtMoney(tradeWarTotal)} in Tariff Bailout Payments
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-lg text-gray-600">
            When tariffs closed export markets, the government compensated farmers with unprecedented direct payments.
          </p>
          <ShareButtons title="Trade War Fallout: Tariff Bailout Payments" />
        </div>
      </div>

      <div className="prose max-w-none">
        <div className="not-prose grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
          {[
            { label: '2018 Spending', value: fmtMoney(y2018.amount), sub: `${fmt(y2018.payments)} payments` },
            { label: '2019 Spending', value: fmtMoney(y2019.amount), sub: `${fmt(y2019.payments)} payments` },
            { label: 'vs. 2017', value: `${(y2019.amount / y2017.amount).toFixed(1)}x`, sub: 'Pre-trade war baseline' },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm font-medium text-gray-900">{s.label}</div>
              <div className="text-xs text-gray-500">{s.sub}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Tariff Trigger</h2>
        <p>
          In early 2018, the Trump administration imposed tariffs on hundreds of billions of dollars&apos; worth of
          Chinese goods. China retaliated with tariffs targeting American agriculture — soybeans, pork, dairy,
          and other commodities. Overnight, U.S. farmers lost access to their largest export market for soybeans.
        </p>
        <p>
          Soybean prices crashed. China redirected purchases to Brazil. U.S. farmers, many of whom had planted
          based on expected Chinese demand, faced devastating losses. The administration&apos;s response: the Market
          Facilitation Program (MFP), which made direct payments to farmers affected by retaliatory tariffs.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 Key Insight</p>
          <p className="text-sm text-gray-700 mt-1">
            Farm subsidy spending jumped from {fmtMoney(y2017.amount)} in 2017 to {fmtMoney(y2018.amount)} in
            2018 — a {((y2018.amount / y2017.amount - 1) * 100).toFixed(0)}% increase in a single year. By 2019,
            it reached {fmtMoney(y2019.amount)}, nearly {(y2019.amount / y2017.amount).toFixed(1)}x the pre-trade
            war level.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Market Facilitation Program</h2>
        <p>
          MFP was created using the USDA&apos;s Commodity Credit Corporation (CCC) authority — bypassing the normal
          congressional appropriations process. In Round 1 (2018), the USDA authorized up to $12 billion. Round 2
          (2019) expanded the program to $16 billion. Payments were based on planted acreage and county-level
          trade damage estimates.
        </p>
        <p>
          Soybean farmers received the largest share, given that China had been the top buyer of U.S. soybeans.
          But the program also covered cotton, sorghum, wheat, dairy, hogs, and other commodities. Critics argued
          the program disproportionately benefited large operations and did little for farmers who weren&apos;t
          directly affected by Chinese tariffs.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Spending Timeline</h2>
        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Year</th>
                  <th className="px-4 py-2 text-right font-semibold">Total Spending</th>
                  <th className="px-4 py-2 text-right font-semibold">Payments</th>
                  <th className="px-4 py-2 text-left font-semibold hidden md:table-cell">Context</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {yearly.filter(y => y.year >= 2017 && y.year <= 2021).map(y => (
                  <tr key={y.year} className={(y.year === 2018 || y.year === 2019) ? 'bg-amber-50 font-semibold' : 'hover:bg-gray-50'}>
                    <td className="px-4 py-2">{y.year}{y.year === 2018 ? ' 🌐' : y.year === 2019 ? ' 🌐' : ''}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtMoney(y.amount)}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{fmt(y.payments)}</td>
                    <td className="px-4 py-2 text-gray-600 text-xs hidden md:table-cell">
                      {y.year === 2017 ? 'Pre-trade war baseline' :
                       y.year === 2018 ? 'MFP Round 1 + tariffs begin' :
                       y.year === 2019 ? 'MFP Round 2 + expanded payments' :
                       y.year === 2020 ? 'COVID eclipses trade war' :
                       'Post-pandemic drawdown'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">A Precedent for COVID</h2>
        <p>
          The trade war bailout set a crucial precedent. It demonstrated that the USDA could rapidly deploy
          billions in direct payments outside the normal farm bill process. When COVID hit in 2020, the
          infrastructure and political will for massive emergency payments was already in place. The trade
          war era proved that ad hoc, multi-billion-dollar payment programs could be created quickly —
          a lesson that would be applied on an even larger scale during the pandemic.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Winners and Losers</h2>
        <p>
          Midwestern soybean and corn states — Iowa, Illinois, Indiana, Minnesota — saw the biggest jumps
          in spending. Southern cotton states also benefited significantly. Smaller, diversified operations
          and specialty crop farmers received relatively little, despite also facing market disruptions from
          retaliatory tariffs.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Source</p>
          <p>Analysis based on USDA Farm Service Agency payment records, 2017-2025. Trade war era
          programs include Market Facilitation Program (MFP) Rounds 1 and 2, and related CCC payments.</p>
        </div>
            <RelatedArticles currentSlug="trade-war" />
</div>
    </article>
  )
}
