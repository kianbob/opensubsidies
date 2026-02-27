import { fmtMoney, fmt, slugify } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: '157 Programs and Counting: The Complexity of Farm Subsidies',
  description: 'Why does the USDA have 157 different farm subsidy programs? An analysis of program proliferation, overlap, and the gap between largest and smallest.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/program-proliferation' },
}

type Program = { program: string; code: string; payments: number; amount: number }

export default function ProgramProliferationPage() {
  const programs = loadData('programs.json') as Program[]
  const sorted = [...programs].sort((a, b) => b.amount - a.amount)
  const total = sorted.reduce((s, p) => s + p.amount, 0)

  const top10 = sorted.slice(0, 10)
  const top10Total = top10.reduce((s, p) => s + p.amount, 0)
  const bottom50 = sorted.slice(-50)
  const bottom50Total = bottom50.reduce((s, p) => s + p.amount, 0)
  const smallest = sorted[sorted.length - 1]
  const largest = sorted[0]

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="157 Programs and Counting: The Complexity of Farm Subsidies" description="Why does the USDA have 157 different farm subsidy programs? An analysis of program proliferation, overlap, and the gap between largest and smallest." slug="program-proliferation" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Program Proliferation' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: '157 Programs and Counting: The Complexity of Farm Subsidies',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies' }, datePublished: '2026-02-27',
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          157 Programs and Counting: The Complexity of Farm Subsidies
        </h1>
        <p className="text-lg text-gray-600">
          The USDA administers 157 distinct farm subsidy programs. Some distribute billions, others barely thousands.
          Why so many, and what does it mean for farmers and taxpayers?
        </p>
      </div>

      <ShareButtons title="157 Programs and Counting: The Complexity of Farm Subsidies" />

      <div className="prose max-w-none">
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 Key Finding</p>
          <p className="text-sm text-gray-700 mt-1">
            The top 10 programs account for {(top10Total / total * 100).toFixed(0)}% of all spending ({fmtMoney(top10Total)}).
            The bottom 50 programs combined account for just {(bottom50Total / total * 100).toFixed(1)}%.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Scale Gap</h2>
        <p>
          The largest program, {largest.program}, distributed {fmtMoney(largest.amount)} across {fmt(largest.payments)} payments.
          The smallest, {smallest.program}, totaled just {fmtMoney(Math.abs(smallest.amount))} — a ratio of over{' '}
          {Math.abs(Math.round(largest.amount / smallest.amount)).toLocaleString()} to 1.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Top 10 Programs</h2>
        <p>These 10 programs represent the vast majority of all farm subsidy spending:</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">#</th>
              <th className="px-4 py-3 text-left font-semibold">Program</th>
              <th className="px-4 py-3 text-right font-semibold">Amount</th>
              <th className="px-4 py-3 text-right font-semibold hidden sm:table-cell">% of Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {top10.map((p, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                <td className="px-4 py-3">
                  <Link href={`/programs/${slugify(p.program)}`} className="text-primary hover:underline font-medium">{p.program}</Link>
                </td>
                <td className="px-4 py-3 text-right font-mono">{fmtMoney(p.amount)}</td>
                <td className="px-4 py-3 text-right hidden sm:table-cell">{(p.amount / total * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose max-w-none">
        <h2 className="font-[family-name:var(--font-heading)]">Why So Many Programs?</h2>
        <p>Program proliferation in farm subsidies happens for several reasons:</p>
        <ul>
          <li><strong>Legislative layering:</strong> Each Farm Bill adds new programs without removing old ones. Programs created for specific crises become permanent.</li>
          <li><strong>Commodity-specific needs:</strong> Different crops, livestock, and farming types need different support mechanisms. Dairy programs don&apos;t work for cotton.</li>
          <li><strong>Political compromise:</strong> New programs are often created to satisfy specific constituencies or regions during Farm Bill negotiations.</li>
          <li><strong>Emergency response:</strong> Disasters, pandemics, and trade wars each spawn new emergency programs (CFAP, MFP, ELAP).</li>
          <li><strong>Conservation evolution:</strong> As environmental priorities shift, new conservation programs are added alongside existing ones.</li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)]">The Smallest 10 Programs</h2>
        <p>At the other end of the spectrum, these programs are barely a rounding error in the overall budget:</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Program</th>
              <th className="px-4 py-3 text-right font-semibold">Amount</th>
              <th className="px-4 py-3 text-right font-semibold hidden sm:table-cell">Payments</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sorted.slice(-10).reverse().map((p, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link href={`/programs/${slugify(p.program)}`} className="text-primary hover:underline">{p.program}</Link>
                </td>
                <td className="px-4 py-3 text-right font-mono">{fmtMoney(p.amount)}</td>
                <td className="px-4 py-3 text-right hidden sm:table-cell">{fmt(p.payments)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose max-w-none">
        <h2 className="font-[family-name:var(--font-heading)]">The Case for Simplification</h2>
        <p>
          With 157 programs, navigating the farm subsidy system is a challenge for farmers, administrators, and
          oversight bodies alike. The complexity creates:
        </p>
        <ul>
          <li><strong>Administrative burden</strong> — each program has its own rules, deadlines, and eligibility criteria</li>
          <li><strong>Inequitable access</strong> — larger operations with dedicated staff can navigate the system better</li>
          <li><strong>Oversight gaps</strong> — more programs mean more opportunities for waste and duplication</li>
          <li><strong>Confusion</strong> — even county FSA offices struggle to keep up with all active programs</li>
        </ul>
        <p>
          Every Farm Bill brings calls for consolidation, yet the number of programs tends to grow. The political
          incentive to create visible new programs outweighs the unglamorous work of streamlining existing ones.
        </p>
            <RelatedArticles currentSlug="program-proliferation" />
</div>
    </article>
  )
}
