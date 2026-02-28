import ArticleSchema from '@/components/ArticleSchema'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { fmt, fmtMoney, formatProgram, titleCase } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biggest Farm Subsidies: Largest Programs and Top Recipients',
  description: 'The biggest farm subsidy programs and largest recipients. CRP leads at $15.7B, followed by CFAP and Price Loss Coverage. See the top 15 programs and recipients.',
  alternates: { canonical: 'https://www.opensubsidies.org/biggest-farm-subsidies' },
}

interface Program {
  program: string
  code: string
  payments: number
  amount: number
}

interface TopRecipient {
  name: string
  state: string
  city: string
  amount: number
  payments: number
  topPrograms: { program: string; amount: number }[]
}

const programDescriptions: Record<string, string> = {
  'CRP PAYMENT - ANNUAL RENTAL': 'Pays landowners annual rent to keep environmentally sensitive cropland out of production.',
  'CFAPCCA2': 'COVID-era Coronavirus Food Assistance Program providing direct payments to farmers affected by the pandemic.',
  'PRICE LOSS COVERAGE PROGRAM': 'Pays farmers when crop prices fall below a statutory reference price.',
  'TMP/MFP 2019 NON SPECIALTY CROPS': 'Trade war bailout payments to offset losses from U.S.-China tariffs on non-specialty crops.',
  'EMERGENCY COMMODITY ASSISTANCE PROGRAM': 'Emergency payments to commodity producers facing market disruptions.',
  'AGRICULTURAL RISK COVERAGE PROG - COUNTY': 'Revenue protection that pays when county crop revenue falls below a benchmark.',
  'MARKET FACILITATION PROGRAM - CROPS': 'Direct payments to crop farmers impacted by retaliatory tariffs during the 2018-2019 trade war.',
  'LIVESTOCK FORAGE PROGRAM': 'Drought relief for ranchers who graze livestock on drought-affected pasture or rangeland.',
  'EMGNCY RELIEF PRGM-NONSPECIALITY CROPS': 'Emergency payments for non-specialty crop losses from natural disasters.',
  'CFAPCARES': 'CARES Act funding for agricultural producers impacted by COVID-19 market disruptions.',
  'SUPP DISASTER RELIEF NON-SPEC CROPS 1': 'Supplemental disaster payments for non-specialty crop producers affected by qualifying disasters.',
  'CFAPCCCCA': 'Additional CFAP payments under the CCC Charter Act for pandemic-affected producers.',
  'CFAP3 - TUP': 'Third round of CFAP payments for producers who had not yet received pandemic assistance.',
  'WHIP PLUS 3 ASSISTANCE': 'Wildfire and Hurricane Indemnity Program payments for disaster-affected producers.',
  'DAIRY MARGIN COVERAGE': 'Insurance-like program that pays dairy farmers when milk margins fall below a coverage level.',
}

export default function BiggestFarmSubsidiesPage() {
  const programs = loadData('programs.json') as Program[]
  const topRecipients = loadData('top-recipients.json') as TopRecipient[]

  const top15Programs = programs.slice(0, 15)
  const top15Recipients = topRecipients.slice(0, 15)
  const totalAmount = programs.reduce((s, p) => s + p.amount, 0)

  const faqItems = [
    {
      q: 'What is the biggest farm subsidy program?',
      a: `The Conservation Reserve Program (CRP) is the largest at ${fmtMoney(top15Programs[0]?.amount ?? 0)}, paying landowners to keep environmentally sensitive cropland out of production. It's followed by CFAP (COVID relief) and Price Loss Coverage.`,
    },
    {
      q: 'Who is the biggest farm subsidy recipient?',
      a: `The largest recipient in our database is ${titleCase(top15Recipients[0]?.name ?? '')} in ${titleCase(top15Recipients[0]?.city ?? '')}, ${top15Recipients[0]?.state ?? ''}, who received ${fmtMoney(top15Recipients[0]?.amount ?? 0)} across ${fmt(top15Recipients[0]?.payments ?? 0)} payments.`,
    },
    {
      q: 'What crops get the most subsidies?',
      a: 'Corn, soybeans, wheat, cotton, and rice receive the most commodity subsidies through Price Loss Coverage and Agricultural Risk Coverage. However, the largest overall programs (CRP, CFAP, trade war bailouts) aren\'t crop-specific.',
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
      <Breadcrumbs items={[{ label: 'Biggest Farm Subsidies' }]} />
      <ArticleSchema title="Biggest Farm Subsidies: Largest Programs and Top Recipients" description="The biggest farm subsidy programs and largest recipients. CRP leads at $15.7B, followed by CFAP and Price Loss Coverage. See the top 15 programs and recipients." slug="biggest-farm-subsidies" />

      <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-2">
        Biggest Farm Subsidies: Programs &amp; Recipients
      </h1>
      <p className="text-gray-600 mb-6 text-lg">
        The largest farm subsidy programs and the top recipients. See where the money goes — from {fmtMoney(totalAmount)} across {fmt(programs.length)} USDA programs.
      </p>
      <ShareButtons title="Biggest Farm Subsidies: Largest Programs and Top Recipients" />

      {/* Quick Answer */}
      <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg my-8">
        <h2 className="font-bold text-green-900 text-lg mb-2">The Short Answer</h2>
        <p className="text-green-800">
          The <strong>Conservation Reserve Program (CRP)</strong> is the single biggest program at {fmtMoney(top15Programs[0]?.amount ?? 0)}. The biggest recipient is <strong>{titleCase(top15Recipients[0]?.name ?? '')}</strong> with {fmtMoney(top15Recipients[0]?.amount ?? 0)} total. The top 15 programs account for over 85% of all spending.
        </p>
      </div>

      {/* Top 15 Programs */}
      <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mt-10 mb-4">
        Top 15 Biggest Programs
      </h2>
      <p className="text-gray-600 mb-4">
        These 15 programs account for the vast majority of USDA farm subsidy spending:
      </p>
      <div className="space-y-4 mb-8">
        {top15Programs.map((p, i) => {
          const desc = programDescriptions[p.program] ?? ''
          return (
            <div key={p.program} className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm font-mono">#{i + 1}</span>
                    <h3 className="font-semibold text-gray-900">{formatProgram(p.program)}</h3>
                  </div>
                  {desc && <p className="text-gray-500 text-sm mt-1">{desc}</p>}
                  <div className="text-xs text-gray-400 mt-1">{fmt(p.payments)} payments</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-bold text-green-700 font-mono">{fmtMoney(p.amount)}</div>
                  <div className="text-xs text-gray-400">{(p.amount / totalAmount * 100).toFixed(1)}% of total</div>
                </div>
              </div>
              {/* Progress bar */}
              <div className="mt-2 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(p.amount / top15Programs[0].amount * 100)}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
      <p className="text-gray-500 text-sm mb-8">
        <Link href="/programs" className="text-green-700 hover:underline">View all {fmt(programs.length)} programs →</Link>
      </p>

      {/* Top 15 Recipients */}
      <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mt-12 mb-4">
        Top 15 Biggest Recipients
      </h2>
      <p className="text-gray-600 mb-4">
        These individuals and entities received the most in total farm subsidy payments:
      </p>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 pr-2 font-semibold">#</th>
              <th className="text-left py-3 pr-4 font-semibold">Recipient</th>
              <th className="text-left py-3 px-4 font-semibold">Location</th>
              <th className="text-right py-3 px-4 font-semibold">Total</th>
              <th className="text-right py-3 pl-4 font-semibold">Payments</th>
            </tr>
          </thead>
          <tbody>
            {top15Recipients.map((r, i) => (
              <tr key={r.name} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 pr-2 text-gray-400">{i + 1}</td>
                <td className="py-3 pr-4 font-medium">{titleCase(r.name)}</td>
                <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{titleCase(r.city)}, {r.state}</td>
                <td className="py-3 px-4 text-right font-mono text-green-700">{fmtMoney(r.amount)}</td>
                <td className="py-3 pl-4 text-right">{fmt(r.payments)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-gray-500 text-sm mb-8">
        <Link href="/recipients" className="text-green-700 hover:underline">Browse all top recipients →</Link>
      </p>

      {/* Context */}
      <div className="prose max-w-none text-gray-700 mt-10">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">What These Numbers Tell Us</h2>
        <p>
          The dominance of CRP, CFAP, and trade war programs at the top of the list reflects a fundamental shift in farm subsidies. Traditional commodity programs like Price Loss Coverage and ARC-County — the programs most people think of as &ldquo;farm subsidies&rdquo; — are now overshadowed by conservation, emergency, and one-time relief programs.
        </p>
        <p>
          Three of the top five programs didn&apos;t exist before 2018. The <Link href="/analysis/trade-war" className="text-green-700 hover:underline">Market Facilitation Program</Link> and <Link href="/analysis/covid-spending" className="text-green-700 hover:underline">CFAP programs</Link> were created as emergency responses, yet they distributed more money than decades-old commodity programs.
        </p>
        <p>
          For a deeper look at who benefits most, see our <Link href="/entity-types" className="text-green-700 hover:underline">entity types breakdown</Link> and <Link href="/analysis/subsidy-concentration" className="text-green-700 hover:underline">concentration analysis</Link>.
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
          <Link href="/programs" className="text-green-700 hover:underline">All Programs</Link>
          <Link href="/recipients" className="text-green-700 hover:underline">Top Recipients</Link>
          <Link href="/entity-types" className="text-green-700 hover:underline">Entity Types</Link>
          <Link href="/who-gets-farm-subsidies" className="text-green-700 hover:underline">Who Gets Farm Subsidies?</Link>
          <Link href="/how-much-farm-subsidies" className="text-green-700 hover:underline">How Much Are Farm Subsidies?</Link>
          <Link href="/analysis/subsidy-concentration" className="text-green-700 hover:underline">Subsidy Concentration</Link>
        </div>
      </div>
    </div>
  )
}
