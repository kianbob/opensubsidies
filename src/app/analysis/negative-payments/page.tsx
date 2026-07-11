import { fmtMoney, fmt, slugify, formatProgram } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Clawbacks and Corrections: When the USDA Takes Money Back',
  description: 'Not all farm subsidy payments are positive. Explore the programs and recipients where the USDA clawed back or corrected overpayments — and why it doesn\'t happen more often.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/negative-payments' },
  openGraph: {
    title: 'Clawbacks and Corrections: When the USDA Takes Money Back',
    description: 'Not all farm subsidy payments are positive. Explore the programs and recipients where the USDA clawed back or corrected overpayments.',
    url: 'https://www.opensubsidies.org/analysis/negative-payments',
    type: 'article',
  },
}

type Program = { program: string; code: string; payments: number; amount: number }
type Recipient = { name: string; state: string; city: string; amount: number; payments: number }

export default function NegativePaymentsPage() {
  const programs = loadData('programs.json') as Program[]
  const recipients = loadData('top-recipients.json') as Recipient[]
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalPrograms: number; dataYears: string }

  const negativePrograms = programs.filter(p => p.amount < 0).sort((a, b) => a.amount - b.amount)
  const negativeRecipients = recipients.filter(r => r.amount < 0).sort((a, b) => a.amount - b.amount)
  const totalNegative = negativePrograms.reduce((s, p) => s + p.amount, 0)
  const clawbackRate = Math.abs(totalNegative) / stats.totalAmount * 100

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="Clawbacks and Corrections: When the USDA Takes Money Back" description="Not all farm subsidy payments are positive. Explore the programs and recipients where the USDA clawed back or corrected overpayments." slug="analysis/negative-payments" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Negative Payments' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Clawbacks and Corrections: When the USDA Takes Money Back',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies' }, datePublished: '2026-02-27',
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question', name: 'What are negative farm subsidy payments?',
            acceptedAnswer: { '@type': 'Answer', text: 'Negative payments in USDA data represent money flowing back to the government: overpayment recoveries, program corrections, contract violations (conservation clawbacks), and marketing assistance loan repayments. They show the USDA attempting to recover improperly distributed funds.' },
          },
          {
            '@type': 'Question', name: 'How much does the USDA claw back in farm subsidies?',
            acceptedAnswer: { '@type': 'Answer', text: `Programs with net negative totals account for ${fmtMoney(Math.abs(totalNegative))} in clawbacks and corrections — just ${clawbackRate.toFixed(2)}% of total positive payments. Critics argue this low recovery rate suggests insufficient oversight of the ${fmtMoney(stats.totalAmount)} farm subsidy system.` },
          },
          {
            '@type': 'Question', name: 'Why are some farm subsidy recipients shown with negative amounts?',
            acceptedAnswer: { '@type': 'Answer', text: 'Recipients with net negative totals have repaid more than they received overall, typically due to significant overpayment recoveries, loan repayments, or conservation contract violations. These cases represent situations where the USDA determined prior payments were improper and required full or partial reimbursement.' },
          },
          {
            '@type': 'Question', name: 'Is USDA farm subsidy oversight sufficient?',
            acceptedAnswer: { '@type': 'Answer', text: `The relatively small clawback total (${clawbackRate.toFixed(2)}% of total spending) raises questions. GAO reports have repeatedly identified weaknesses in USDA payment controls, including insufficient verification of eligibility, inadequate spot-checks, and limited enforcement of payment limits. More aggressive auditing would likely uncover additional overpayments.` },
          },
        ],
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
            {negativePrograms.length} programs have net negative totals, representing {fmtMoney(Math.abs(totalNegative))} in
            clawbacks and corrections — just {clawbackRate.toFixed(2)}% of the {fmtMoney(stats.totalAmount)} in total positive payments.
          </p>
        </div>

        {/* Stat cards */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Clawback Total', value: fmtMoney(Math.abs(totalNegative)), sub: 'Net negative programs' },
            { label: 'Recovery Rate', value: `${clawbackRate.toFixed(2)}%`, sub: 'Of total spending' },
            { label: 'Negative Programs', value: negativePrograms.length.toString(), sub: `Of ${stats.totalPrograms} total` },
            { label: 'Negative Recipients', value: fmt(negativeRecipients.length), sub: 'Net negative totals' },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm font-medium text-gray-900">{s.label}</div>
              <div className="text-xs text-gray-500">{s.sub}</div>
            </div>
          ))}
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
        <p>
          These negative entries are an important — if small — part of the farm subsidy story. They
          represent the government&apos;s attempt to enforce program rules and recover improperly
          distributed funds. The question isn&apos;t whether clawbacks exist, but whether they&apos;re
          happening at a scale proportional to the problem.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Oversight Gap</h2>
        <p>
          At just {clawbackRate.toFixed(2)}% of total spending, the clawback rate raises serious
          questions about USDA oversight. For context, the Government Accountability Office (GAO)
          has repeatedly flagged USDA payment controls as weak:
        </p>
        <ul>
          <li>GAO estimates improper payment rates in farm programs range from 3-10% depending on the program</li>
          <li>USDA&apos;s Office of Inspector General has identified billions in potential overpayments that were never recovered</li>
          <li>Payment limit violations are widespread but rarely enforced — the <Link href="/analysis/payment-limits">payment limits analysis</Link> shows how entity structuring circumvents caps</li>
          <li>Emergency programs like <Link href="/analysis/covid-spending">CFAP</Link> were deployed with minimal verification, creating significant overpayment risk</li>
        </ul>
        <p>
          If improper payments truly run at 3-10% of total spending — as GAO suggests — then the
          {' '}{fmtMoney(Math.abs(totalNegative))} in actual clawbacks represents recovery of a tiny
          fraction of the problem. On a {fmtMoney(stats.totalAmount)} base, even a conservative 3%
          improper payment rate implies {fmtMoney(stats.totalAmount * 0.03)} in questionable
          disbursements.
        </p>

        {negativePrograms.length > 0 && (
          <>
            <h2 className="font-[family-name:var(--font-heading)]">Programs with Net Negative Totals</h2>
            <p>
              These programs have collected more money back than they&apos;ve distributed — unusual
              situations that typically indicate systematic corrections, wind-down of legacy programs,
              or loan repayment programs where recovery is the primary function.
            </p>
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
                    <Link href={`/programs/${slugify(p.program)}`} className="text-primary hover:underline">{formatProgram(p.program)}</Link>
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
            <p>
              These recipients have paid back more than they received overall — suggesting significant
              overpayment recoveries or program corrections. Each represents a case where the USDA
              determined that prior payments were improper and required full reimbursement.
            </p>
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
        <h2 className="font-[family-name:var(--font-heading)]">Types of Clawbacks</h2>
        <p>
          Not all negative payments are created equal. Understanding the different types reveals
          how oversight works — and where it falls short:
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Conservation Violations</h3>
        <p>
          When a <Link href="/analysis/crp-conservation">CRP</Link> contract holder violates their
          conservation agreement — by grazing enrolled land, failing to maintain cover, or breaking
          the contract early — the USDA can claw back rental payments plus penalties. These clawbacks
          are relatively well-enforced because violations are detectable via satellite imagery and
          spot checks. However, limited FSA staff means many violations go undetected for years.
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Commodity Program Corrections</h3>
        <p>
          Programs like ARC and PLC make payments based on projected prices and yields. When actual
          data comes in and shows the projections were too generous, corrections are issued. These
          are typically small per-recipient adjustments that net out across large numbers of payments.
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Loan Repayments</h3>
        <p>
          Marketing assistance loans allow farmers to borrow against their crop&apos;s value. When
          the farmer sells the crop and repays the loan, a negative entry appears in the payment
          data. These aren&apos;t really &quot;clawbacks&quot; — they&apos;re normal loan mechanics.
          However, when market prices are below the loan rate, farmers can forfeit the crop and
          keep the loan proceeds, effectively converting the loan into a subsidy.
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Fraud Recovery</h3>
        <p>
          The rarest type of negative payment: recoveries from recipients found to have committed
          fraud. Despite the system&apos;s scale — {fmt(stats.totalPayments)} individual payments across
          {stats.dataYears} — fraud prosecutions are uncommon. The USDA Inspector General&apos;s office
          has limited resources relative to the volume of payments, and most cases involve small
          amounts that don&apos;t justify investigation costs.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Why This Matters for Reform</h2>
        <p>
          Negative payments are an important accountability mechanism. They show that the USDA does attempt to
          recover overpayments and enforce program rules. However, the relatively small total compared
          to {fmtMoney(stats.totalAmount)} in positive payments raises questions about whether oversight is sufficient.
        </p>
        <p>
          Critics argue that more aggressive auditing would uncover additional overpayments, while farm groups
          contend that most payments are properly administered and clawbacks often result from administrative
          errors rather than fraud. The truth likely lies between: the system is too complex (
          <Link href="/analysis/program-proliferation">{stats.totalPrograms} programs</Link>) for
          thorough oversight with current staffing, and the political will to aggressively audit
          farm recipients has historically been low.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The DOGE Perspective</h2>
        <p>
          For government efficiency advocates, the low clawback rate is a red flag. A
          {' '}{clawbackRate.toFixed(2)}% recovery rate on a {fmtMoney(stats.totalAmount)} program
          suggests either: (a) the programs are remarkably well-administered with virtually no
          errors — unlikely given their complexity — or (b) oversight is insufficient to detect
          and recover improper payments.
        </p>
        <p>
          The <Link href="/doge-farm-subsidies">DOGE farm subsidies analysis</Link> identifies
          enhanced auditing as a key efficiency opportunity. Even recovering an additional 1% of
          total spending would yield {fmtMoney(stats.totalAmount * 0.01)} — real money by any
          standard. Combined with <Link href="/analysis/zombie-programs">zombie program
          elimination</Link> and <Link href="/analysis/program-proliferation">program
          consolidation</Link>, oversight improvements could save taxpayers billions.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Frequently Asked Questions</h2>

        <h3>What are negative farm subsidy payments?</h3>
        <p>
          Negative payments represent money flowing back to the government: overpayment recoveries,
          program corrections for prior-year adjustments, conservation contract violations, and
          marketing assistance loan repayments. They&apos;re the accountability side of the farm
          subsidy system.
        </p>

        <h3>How much does the USDA claw back?</h3>
        <p>
          Programs with net negative totals account for {fmtMoney(Math.abs(totalNegative))} in
          clawbacks — just {clawbackRate.toFixed(2)}% of total positive payments. GAO estimates
          suggest improper payments run much higher, indicating significant unrecovered overpayments.
        </p>

        <h3>Is USDA oversight of farm subsidies sufficient?</h3>
        <p>
          GAO has repeatedly flagged weaknesses in USDA payment controls, including insufficient
          eligibility verification, inadequate spot-checks, and limited payment limit enforcement.
          The low clawback rate relative to estimated improper payment rates suggests oversight
          resources are inadequate for a {fmtMoney(stats.totalAmount)} system.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Sources</p>
          <p>USDA Farm Service Agency payment data ({stats.dataYears}). Negative payment analysis from FSA disbursement records.
          GAO improper payment estimates from annual reports on USDA programs. Explore all programs on the{' '}
          <Link href="/programs" className="text-primary hover:underline">Programs page</Link> or see{' '}
          <Link href="/recipients" className="text-primary hover:underline">top recipients</Link>.</p>
        </div>

        <RelatedArticles currentSlug="negative-payments" />
      </div>
    </article>
  )
}
