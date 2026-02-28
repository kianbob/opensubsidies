import Breadcrumbs from '@/components/Breadcrumbs'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'When Corporations Collect: The Biggest Non-Family Farm Subsidy Recipients',
  description: 'LLCs, partnerships, and corporations collecting millions in farm subsidies. Are payment limits working?',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/corporate-farms' },
}

export default function CorporateFarms() {
  const recipients = loadData('top-recipients.json')

  // Find corporate-looking entities (LLC, INC, CORP, PARTNERSHIP, LP, etc.)
  const corporate = recipients.filter((r: { name: string }) =>
    /\b(LLC|INC|CORP|PARTNERSHIP|LP|LLP|TRUST|ESTATE|FARMS? (INC|LLC)|RANCH (INC|LLC)|CO\b)/i.test(r.name)
  ).slice(0, 20)

  const corpTotal = corporate.reduce((s: number, r: { amount: number }) => s + r.amount, 0)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="When Corporations Collect: The Biggest Non-Family Farm Subsidy Recipients" description="LLCs, partnerships, and corporations collecting millions in farm subsidies. Are payment limits working?" slug="analysis/corporate-farms" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Corporate Farm Recipients' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'When Corporations Collect: The Biggest Non-Family Recipients',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies' }, datePublished: '2026-02-27',
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          When Corporations Collect: The Biggest Non-Family Recipients
        </h1>
      <ShareButtons title="" />
        <p className="text-lg text-gray-600">
          Farm subsidies were created to help family farmers. But LLCs, partnerships, and corporations
          are among the largest recipients. Here are the top corporate entities in our database.
        </p>
      </div>

      <div className="prose max-w-none">
        <h2 className="font-[family-name:var(--font-heading)]">Top Corporate Recipients</h2>
        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">#</th>
                  <th className="px-4 py-2 text-left font-semibold">Entity</th>
                  <th className="px-4 py-2 text-left font-semibold">Location</th>
                  <th className="px-4 py-2 text-right font-semibold">Total</th>
                  <th className="px-4 py-2 text-right font-semibold">Payments</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {corporate.map((r: { name: string; state: string; city: string; amount: number; payments: number }, i: number) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-500">{i+1}</td>
                    <td className="px-4 py-2 font-medium">{r.name}</td>
                    <td className="px-4 py-2 text-gray-600">{r.city}, {r.state}</td>
                    <td className="px-4 py-2 text-right font-mono text-primary">{fmtMoney(r.amount)}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{fmt(r.payments)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Top 20 entities with LLC, Inc, Corp, Partnership, LP, or Trust in their name.
            Total: {fmtMoney(corpTotal)} across these {corporate.length} entities.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Payment Limits: Theory vs. Practice</h2>
        <p>
          Federal law caps most commodity program payments at $125,000 per person per year. But
          the definition of &quot;person&quot; is generous — it includes entities, and payments can be attributed
          to multiple members of a partnership or LLC. The result is that payment limits are more
          suggestion than constraint.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Accountability Gap</h2>
        <p>
          When subsidies flow to named individuals, there&apos;s at least a human face attached to the money.
          When they flow to LLCs and partnerships, accountability becomes murkier. Who ultimately benefits?
          Are these family operations structured as LLCs for tax purposes, or are they genuinely corporate
          operations that have little in common with the family farm ideal?
        </p>
        <p>
          The USDA data doesn&apos;t answer these questions — it just records payments. But the prevalence of
          corporate entities among top recipients raises legitimate questions about whether the subsidy
          system is achieving its stated goals.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Explore the Data</p>
          <p>See all top recipients on our <Link href="/recipients" className="text-primary hover:underline">Recipients page</Link>.</p>
        </div>
            <RelatedArticles currentSlug="corporate-farms" />
</div>
    </article>
  )
}
