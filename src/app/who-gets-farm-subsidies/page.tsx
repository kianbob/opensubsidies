import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { loadData, fmt, fmtMoney, titleCase } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Who Gets Farm Subsidies? The Complete Breakdown by Recipient Type',
  description: 'Find out who gets farm subsidies in the U.S. Individual farmers receive 79% of payments, but corporations and LLCs collect the largest checks. Explore $147B in USDA data.',
  alternates: { canonical: 'https://www.opensubsidies.us/who-gets-farm-subsidies' },
}

interface EntityType {
  type: string
  count: number
  amount: number
  topRecipient: string
  topAmount: number
}

interface TopRecipient {
  name: string
  state: string
  city: string
  amount: number
  payments: number
  topPrograms: { program: string; amount: number }[]
}

interface Stats {
  totalPayments: number
  totalAmount: number
  totalStates: number
  totalCounties: number
  totalPrograms: number
  dataYears: string
}

export default function WhoGetsFarmSubsidiesPage() {
  const stats = loadData('stats.json') as Stats
  const topRecipients = loadData('top-recipients.json') as TopRecipient[]
  const entityTypes = loadData('entity-types.json') as EntityType[]

  const totalEntityCount = entityTypes.reduce((s, e) => s + e.count, 0)
  const top10 = topRecipients.slice(0, 10)
  const avgPayment = stats.totalAmount / stats.totalPayments

  const faqItems = [
    {
      q: 'Who gets the most farm subsidies?',
      a: `The largest individual recipients are typically large farming operations, dairies, and ranches. The top recipient in our database received ${fmtMoney(top10[0]?.amount ?? 0)}. But on a category basis, corporations and LLCs collect disproportionately large payments relative to their numbers.`,
    },
    {
      q: 'Do corporations get farm subsidies?',
      a: `Yes. Corporations and LLCs account for about ${((entityTypes.find(e => e.type === 'Corporation/LLC')?.count ?? 0) / totalEntityCount * 100).toFixed(0)}% of recipients but receive ${((entityTypes.find(e => e.type === 'Corporation/LLC')?.amount ?? 0) / stats.totalAmount * 100).toFixed(0)}% of total payments (${fmtMoney(entityTypes.find(e => e.type === 'Corporation/LLC')?.amount ?? 0)}).`,
    },
    {
      q: 'Can I look up farm subsidy recipients?',
      a: 'Yes. OpenSubsidies provides a free, searchable database of all USDA farm subsidy recipients. Visit our Recipients page or use the Farm Subsidy Lookup tool to search by name, state, or county.',
    },
    {
      q: 'How much does the average farmer get?',
      a: `The average payment is about ${fmtMoney(avgPayment)} per transaction. However, this is misleading — 69% of farms receive nothing at all, and the top 10% of recipients collect nearly three-fourths of all payments.`,
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
      <Breadcrumbs items={[{ label: 'Who Gets Farm Subsidies' }]} />

      <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-2">
        Who Gets Farm Subsidies?
      </h1>
      <p className="text-gray-600 mb-6 text-lg">
        A data-driven breakdown of who receives U.S. farm subsidies — from individual farmers to corporations, LLCs, and government entities. Based on {fmt(stats.totalPayments)} USDA payments totaling {fmtMoney(stats.totalAmount)}.
      </p>
      <ShareButtons title="Who Gets Farm Subsidies? The Complete Breakdown" />

      {/* Quick Answer */}
      <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg my-8">
        <h2 className="font-bold text-green-900 text-lg mb-2">The Short Answer</h2>
        <p className="text-green-800">
          <strong>Individual farmers</strong> receive the most payments by count (~{((entityTypes.find(e => e.type === 'Individual')?.count ?? 0) / totalEntityCount * 100).toFixed(0)}% of recipients), but <strong>corporations and LLCs</strong> receive the largest share of money (~{((entityTypes.find(e => e.type === 'Corporation/LLC')?.amount ?? 0) / stats.totalAmount * 100).toFixed(0)}% of total dollars). The largest single recipient collected {fmtMoney(top10[0]?.amount ?? 0)}.
        </p>
      </div>

      {/* Entity Type Breakdown */}
      <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mt-10 mb-4">
        Breakdown by Recipient Type
      </h2>
      <p className="text-gray-600 mb-4">
        Farm subsidies go to a wide range of entity types. Here&apos;s how the {fmtMoney(stats.totalAmount)} breaks down:
      </p>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 pr-4 font-semibold">Entity Type</th>
              <th className="text-right py-3 px-4 font-semibold">Recipients</th>
              <th className="text-right py-3 px-4 font-semibold">% of Recipients</th>
              <th className="text-right py-3 px-4 font-semibold">Total Amount</th>
              <th className="text-right py-3 pl-4 font-semibold">% of Dollars</th>
            </tr>
          </thead>
          <tbody>
            {entityTypes.sort((a, b) => b.amount - a.amount).map(entity => (
              <tr key={entity.type} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 pr-4 font-medium">{entity.type}</td>
                <td className="py-3 px-4 text-right">{fmt(entity.count)}</td>
                <td className="py-3 px-4 text-right">{(entity.count / totalEntityCount * 100).toFixed(1)}%</td>
                <td className="py-3 px-4 text-right">{fmtMoney(entity.amount)}</td>
                <td className="py-3 pl-4 text-right">{(entity.amount / stats.totalAmount * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-gray-500 text-sm mb-8">
        <Link href="/entity-types" className="text-green-700 hover:underline">View the full entity types breakdown →</Link>
      </p>

      {/* Top 10 Recipients */}
      <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mt-10 mb-4">
        Top 10 Largest Recipients
      </h2>
      <p className="text-gray-600 mb-4">
        These are the recipients who have collected the most in USDA farm subsidies from {stats.dataYears}:
      </p>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 pr-4 font-semibold">#</th>
              <th className="text-left py-3 pr-4 font-semibold">Recipient</th>
              <th className="text-left py-3 px-4 font-semibold">Location</th>
              <th className="text-right py-3 px-4 font-semibold">Total Received</th>
              <th className="text-right py-3 pl-4 font-semibold">Payments</th>
            </tr>
          </thead>
          <tbody>
            {top10.map((r, i) => (
              <tr key={r.name} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 pr-4 text-gray-500">{i + 1}</td>
                <td className="py-3 pr-4 font-medium">{titleCase(r.name)}</td>
                <td className="py-3 px-4 text-gray-600">{titleCase(r.city)}, {r.state}</td>
                <td className="py-3 px-4 text-right font-mono text-green-700">{fmtMoney(r.amount)}</td>
                <td className="py-3 pl-4 text-right">{fmt(r.payments)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-gray-500 text-sm mb-8">
        <Link href="/recipients" className="text-green-700 hover:underline">Search all recipients →</Link>
      </p>

      {/* Key Statistics */}
      <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mt-10 mb-4">
        Key Statistics
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Payments', value: fmt(stats.totalPayments) },
          { label: 'Total Distributed', value: fmtMoney(stats.totalAmount) },
          { label: 'Avg. Per Payment', value: fmtMoney(avgPayment) },
          { label: 'Programs', value: fmt(stats.totalPrograms) },
        ].map(stat => (
          <div key={stat.label} className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-xl font-bold text-green-700">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Prose */}
      <div className="prose max-w-none text-gray-700 mt-10">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Who Actually Benefits?</h2>
        <p>
          While individual farmers make up the majority of recipients, the distribution of money tells a different story. Large operations — often structured as LLCs, partnerships, or corporations — receive disproportionately larger payments. The top 10% of recipients collect nearly <strong>three-fourths</strong> of all farm subsidy dollars.
        </p>
        <p>
          This concentration raises questions about whether farm subsidies are achieving their stated goals of supporting family farmers and stabilizing rural economies. Critics argue the system primarily benefits large agribusinesses, while defenders note that larger operations produce more food and face proportionally greater risks.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Government Entities and Banks</h2>
        <p>
          Perhaps surprisingly, government entities and banks also appear in farm subsidy records. Government agencies may receive payments as part of conservation programs or land management. Banks appear when they hold crop liens or manage farm accounts — the USDA sometimes directs payments to lenders who then credit the farmer&apos;s account.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Look Up Any Recipient</h2>
        <p>
          All farm subsidy payment data is public information. You can <Link href="/farm-subsidy-lookup" className="text-green-700 hover:underline">look up any farm subsidy recipient</Link> in our free database, or <Link href="/recipients" className="text-green-700 hover:underline">browse the top recipients</Link> by state and amount.
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

      {/* Related Pages */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="font-bold text-lg mb-3">Related Pages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <Link href="/entity-types" className="text-green-700 hover:underline">Entity Types Breakdown</Link>
          <Link href="/recipients" className="text-green-700 hover:underline">Top Recipients</Link>
          <Link href="/farm-subsidy-lookup" className="text-green-700 hover:underline">Farm Subsidy Lookup</Link>
          <Link href="/analysis/subsidy-concentration" className="text-green-700 hover:underline">Subsidy Concentration Analysis</Link>
          <Link href="/analysis/corporate-farms" className="text-green-700 hover:underline">Corporate Farm Subsidies</Link>
          <Link href="/how-much-farm-subsidies" className="text-green-700 hover:underline">How Much Are Farm Subsidies?</Link>
          <Link href="/biggest-farm-subsidies" className="text-green-700 hover:underline">Biggest Farm Subsidies</Link>
        </div>
      </div>
    </div>
  )
}
