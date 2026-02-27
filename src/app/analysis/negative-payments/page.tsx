import { fmtMoney, fmt, slugify } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Clawbacks and Corrections: When the USDA Takes Money Back',
  description: 'Not all farm subsidy payments are positive. Explore the programs and recipients where the USDA clawed back or corrected overpayments.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/negative-payments' },
}

type Program = { program: string; code: string; payments: number; amount: number }
type Recipient = { name: string; state: string; city: string; amount: number; payments: number }

export default function NegativePaymentsPage() {
  const programs = loadData('programs.json') as Program[]
  const recipients = loadData('top-recipients.json') as Recipient[]

  const negativePrograms = programs.filter(p => p.amount < 0).sort((a, b) => a.amount - b.amount)
  const negativeRecipients = recipients.filter(r => r.amount < 0).sort((a, b) => a.amount - b.amount)
  const totalNegative = negativePrograms.reduce((s, p) => s + p.amount, 0)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="Clawbacks and Corrections: When the USDA Takes Money Back" description="Not all farm subsidy payments are positive. Explore the programs and recipients where the USDA clawed back or corrected overpayments." slug="negative-payments" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Negative Payments' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Clawbacks and Corrections: When the USDA Takes Money Back',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies' }, datePublished: '2026-02-27',
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Clawbacks and Corrections: When the USDA Takes Money Back
        </h1>
        <p className="text-lg text-gray-600">
          Not every farm subsidy payment goes out — some come back. Negative payments represent refunds,
          corrections, overpayment recoveries, and program clawbacks.
        </p>
      </div>

      <ShareButtons title="Clawbacks and Corrections: When the USDA Takes Money Back" />

      <div className="prose max-w-none">
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 Key Finding</p>
          <p className="text-sm text-gray-700 mt-1">
            {negativePrograms.length} programs have net negative totals, representing {fmtMoney(Math.abs(totalNegative))} in clawbacks and corrections.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">What Are Negative Payments?</h2>
        <p>
          In USDA payment data, negative amounts typically represent:
        </p>
        <ul>
          <li><strong>Overpayment recoveries</strong> — when a farmer received more than they were entitled to</li>
          <li><strong>Program corrections</strong> — adjustments to prior-year payments based on updated data</li>
          <li><strong>Contract violations</strong> — clawbacks when conservation or program requirements weren&apos;t met</li>
          <li><strong>Loan repayments</strong> — marketing assistance loan redemptions that offset earlier disbursements</li>
        </ul>

        {negativePrograms.length > 0 && (
          <>
            <h2 className="font-[family-name:var(--font-heading)]">Programs with Net Negative Totals</h2>
          </>
        )}
      </div>

      {negativePrograms.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden my-6">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Program</th>
                <th className="px-4 py-3 text-right font-semibold">Net Amount</th>
                <th className="px-4 py-3 text-right font-semibold hidden sm:table-cell">Payments</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {negativePrograms.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link href={`/programs/${slugify(p.program)}`} className="text-primary hover:underline">{p.program}</Link>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-red-600">{fmtMoney(p.amount)}</td>
                  <td className="px-4 py-3 text-right hidden sm:table-cell">{fmt(p.payments)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-green-50 border-l-4 border-primary p-4 rounded-r-lg my-6">
          <p className="text-sm text-gray-700">No programs have net negative totals — but individual payments within programs can still be negative (corrections and clawbacks).</p>
        </div>
      )}

      <div className="prose max-w-none">
        {negativeRecipients.length > 0 && (
          <>
            <h2 className="font-[family-name:var(--font-heading)]">Recipients with Net Negative Totals</h2>
            <p>These recipients have paid back more than they received overall — suggesting significant overpayment recoveries or program corrections.</p>
          </>
        )}
      </div>

      {negativeRecipients.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden my-6">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Recipient</th>
                <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">State</th>
                <th className="px-4 py-3 text-right font-semibold">Net Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {negativeRecipients.slice(0, 20).map((r, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{r.name}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">{r.state}</td>
                  <td className="px-4 py-3 text-right font-mono text-red-600">{fmtMoney(r.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="prose max-w-none">
        <h2 className="font-[family-name:var(--font-heading)]">Why This Matters</h2>
        <p>
          Negative payments are an important accountability mechanism. They show that the USDA does attempt to
          recover overpayments and enforce program rules. However, the relatively small total compared to $147B+
          in positive payments raises questions about whether oversight is sufficient.
        </p>
        <p>
          Critics argue that more aggressive auditing would uncover additional overpayments, while farm groups
          contend that most payments are properly administered and clawbacks often result from administrative
          errors rather than fraud.
        </p>
            <RelatedArticles currentSlug="negative-payments" />
</div>
    </article>
  )
}
