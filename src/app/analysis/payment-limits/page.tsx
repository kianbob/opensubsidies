import Breadcrumbs from '@/components/Breadcrumbs'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Are Farm Subsidy Payment Limits Working?',
  description: 'Top recipients receive far more than the $125K/yr cap through LLCs and partnerships. An analysis of USDA payment data.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/payment-limits' },
}

export default function PaymentLimits() {
  const recipients = loadData('top-recipients.json') as { name: string; state: string; city: string; amount: number; payments: number; topPrograms: { program: string; amount: number }[] }[]

  const top20 = recipients.slice(0, 20)
  const avgTop20 = top20.reduce((s, r) => s + r.amount, 0) / top20.length
  const overLimit = recipients.filter(r => r.amount > 125000)
  const llcRecipients = recipients.filter(r => /\b(LLC|LP|LLP|PARTNERSHIP|INC|CORP)/i.test(r.name))
  const llcTotal = llcRecipients.reduce((s, r) => s + r.amount, 0)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="Are Farm Subsidy Payment Limits Working?" description="Top recipients receive far more than the $125K/yr cap through LLCs and partnerships." slug="payment-limits" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Payment Limits' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Are Farm Subsidy Payment Limits Working?',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies' }, datePublished: '2026-02-27',
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Are Farm Subsidy Payment Limits Working?
        </h1>
      <ShareButtons title="" />
        <p className="text-lg text-gray-600">
          Federal law caps most commodity payments at $125,000 per person per year. Yet the top recipients
          in the USDA database have collected millions. How?
        </p>
      </div>

      {/* Key Finding */}
      <div className="bg-green-50 border-l-4 border-primary p-5 rounded-r-lg mb-8">
        <p className="font-semibold text-primary text-sm uppercase tracking-wide mb-1">Key Finding</p>
        <p className="text-gray-900 font-medium">
          The top 20 recipients averaged {fmtMoney(avgTop20)} each — more than {Math.round(avgTop20 / 125000)}x the annual cap.
          At least {fmt(overLimit.length)} recipients in our database exceeded $125K in total payments.
        </p>
      </div>

      <div className="prose max-w-none">
        <h2 className="font-[family-name:var(--font-heading)]">The $125,000 Cap — In Theory</h2>
        <p>
          Since the 1970s, Congress has tried to limit how much any single recipient can collect. The current cap
          for most commodity programs is $125,000 per &quot;person&quot; per year. For married couples, it&apos;s $250,000. Emergency
          programs like the Coronavirus Food Assistance Program had their own, often higher, limits.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The LLC Loophole</h2>
        <p>
          The key word is &quot;person.&quot; Under USDA rules, an LLC or partnership qualifies as a &quot;person.&quot; Each member
          of a partnership can claim their own $125K limit. A family operation structured as three separate LLCs
          with two partners each could theoretically collect $750,000 — six times the &quot;limit.&quot;
        </p>
        <p>
          In our data, {fmt(llcRecipients.length)} of the top recipients are LLCs, partnerships, or corporations,
          collecting a combined {fmtMoney(llcTotal)}.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Top 20 Recipients</h2>
        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">#</th>
                  <th className="px-4 py-2 text-left font-semibold">Recipient</th>
                  <th className="px-4 py-2 text-left font-semibold">Location</th>
                  <th className="px-4 py-2 text-right font-semibold">Total</th>
                  <th className="px-4 py-2 text-right font-semibold">Payments</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {top20.map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-2 font-medium">{r.name}</td>
                    <td className="px-4 py-2 text-gray-600">{r.city}, {r.state}</td>
                    <td className="px-4 py-2 text-right font-mono text-primary">{fmtMoney(r.amount)}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{fmt(r.payments)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Why Limits Don&apos;t Work</h2>
        <p>
          Payment limits have three structural weaknesses: entity restructuring (splitting into multiple LLCs),
          program stacking (limits apply per-program, not across all programs), and emergency exceptions
          (disaster programs often have separate or no limits). Until Congress addresses all three, the
          $125K cap will remain more aspiration than reality.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Sources</p>
          <p>USDA Farm Service Agency payment data (1995–2024). Recipient names and amounts from FSA payment files.
          See the full list on our <Link href="/recipients" className="text-primary hover:underline">Top Recipients page</Link>.</p>
        </div>
            <RelatedArticles currentSlug="payment-limits" />
</div>
    </article>
  )
}
