import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import { loadData, fmtMoney, fmt } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Texas Gets $3.8B, Vermont Gets $37M: The Geography of Farm Subsidies',
  description: 'Farm subsidy payments vary enormously by state. Texas receives 100x more than Vermont. Explore the geographic distribution.',
}

export default function StateDisparities() {
  const states = loadData('states.json')
  const stats = loadData('stats.json')
  const top5 = states.slice(0, 5)
  const bottom5 = states.filter((s: { abbr: string }) => !['PR','GU','VI','AS','MP','DC'].includes(s.abbr)).slice(-5).reverse()

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'State Disparities' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'The Geography of Farm Subsidies', author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies' }, datePublished: '2026-02-27',
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Texas Gets {fmtMoney(states[0]?.amount)}, Vermont Gets {fmtMoney(bottom5[bottom5.length-1]?.amount)}: The Geography of Farm Subsidies
        </h1>
        <p className="text-lg text-gray-600">
          Farm subsidies aren&apos;t spread evenly across America. A handful of agricultural powerhouses receive
          the vast majority of federal dollars, while smaller states get a fraction.
        </p>
      </div>

      <div className="prose max-w-none">
        <h2 className="font-[family-name:var(--font-heading)]">The Top 5 States</h2>
        <p>Five states account for a disproportionate share of the {fmtMoney(stats.totalAmount)} in farm subsidies:</p>
        <div className="not-prose my-6 space-y-3">
          {top5.map((s: { abbr: string; name: string; amount: number; payments: number }, i: number) => (
            <Link key={s.abbr} href={`/states/${s.abbr.toLowerCase()}`} className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="text-lg font-bold text-primary mr-2">#{i+1}</span>
                <span className="font-semibold">{s.name}</span>
                <span className="text-sm text-gray-500 ml-2">{fmt(s.payments)} payments</span>
              </div>
              <span className="text-xl font-bold text-primary">{fmtMoney(s.amount)}</span>
            </Link>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Bottom 5 States</h2>
        <p>At the other end, some states receive very little in farm subsidies:</p>
        <div className="not-prose my-6 space-y-3">
          {bottom5.map((s: { abbr: string; name: string; amount: number; payments: number }) => (
            <Link key={s.abbr} href={`/states/${s.abbr.toLowerCase()}`} className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="font-semibold">{s.name}</span>
                <span className="text-sm text-gray-500 ml-2">{fmt(s.payments)} payments</span>
              </div>
              <span className="text-lg font-bold text-gray-600">{fmtMoney(s.amount)}</span>
            </Link>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Why It Matters</h2>
        <p>
          The geographic concentration of farm subsidies reflects the geographic concentration of commodity agriculture.
          States that grow corn, soybeans, wheat, and cotton — the crops most heavily subsidized — receive the most money.
          States with diversified agriculture, smaller farms, or non-commodity crops receive far less federal support.
        </p>
        <p>
          This creates a policy feedback loop: subsidies incentivize commodity monocultures, which concentrates more
          subsidy dollars in fewer states, which gives those states more political influence over farm policy.
          The result is a farm bill that serves commodity agriculture first and everyone else second.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Explore the Data</p>
          <p>See the full breakdown for every state on our <Link href="/states" className="text-primary hover:underline">States page</Link>.</p>
        </div>
      </div>
    </article>
  )
}
