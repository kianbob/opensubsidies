import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { fmt, fmtMoney , formatProgram } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import RelatedArticles from '@/components/RelatedArticles'
import type { Metadata } from 'next'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Zombie Programs: The USDA Programs Nobody Uses',
  description: '43 USDA farm programs have fewer than 100 payments each. These "zombie programs" persist through bureaucratic inertia, consuming administrative resources while serving almost nobody.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/zombie-programs' },
}

export default function ZombieProgramsPage() {
  const data = loadData('zombie-programs.json') as {
    totalPrograms: number; zombieCount: number; zombieThreshold: number
    programs: { program: string; payments: number; amount: number }[]
  }
  const totalZombieCost = data.programs.reduce((s, p) => s + p.amount, 0)
  const totalZombiePayments = data.programs.reduce((s, p) => s + p.payments, 0)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="Zombie Programs: The USDA Programs Nobody Uses" description="43 USDA farm programs have fewer than 100 payments each. These " slug="zombie-programs" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Zombie Programs' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Zombie Programs: The USDA Programs Nobody Uses',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.org' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Zombie Programs: The USDA Programs Nobody Uses
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-lg text-gray-600">{data.zombieCount} programs with fewer than 100 payments each. {fmt(totalZombiePayments)} total payments. Bureaucratic inertia in action.</p>
          <ShareButtons title="Zombie Programs: USDA Programs Nobody Uses" />
        </div>
      </div>

      <div className="prose max-w-none">
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Total Programs', value: data.totalPrograms.toString() },
            { label: 'Zombie Programs', value: data.zombieCount.toString() },
            { label: 'Total Payments', value: fmt(totalZombiePayments) },
            { label: 'Total Cost', value: fmtMoney(totalZombieCost) },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Programs with Fewer Than 100 Payments</h2>
        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2">Program</th>
                <th className="text-right py-3 px-2">Payments</th>
                <th className="text-right py-3 px-2">Total</th>
                <th className="text-right py-3 px-2">Avg Payment</th>
              </tr>
            </thead>
            <tbody>
              {data.programs.map(p => (
                <tr key={p.program} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-2">
                    <Link href={`/programs/${p.program.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`} className="text-primary hover:underline">
                      {formatProgram(p.program)}
                    </Link>
                  </td>
                  <td className="text-right py-2 px-2 font-medium">{p.payments}</td>
                  <td className="text-right py-2 px-2">{fmtMoney(p.amount)}</td>
                  <td className="text-right py-2 px-2">{fmtMoney(Math.round(p.amount / p.payments))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Why These Programs Still Exist</h2>
        <p>
          Bureaucratic inertia is powerful. Once a program is created and codified in the Farm Bill, it persists until
          Congress actively eliminates it — which rarely happens. Each program has its own regulations, staff assignments,
          and institutional knowledge. Even programs with single-digit payments per year continue because:
        </p>
        <ul>
          <li><strong>Statutory mandate:</strong> The Farm Bill authorizes them, so the USDA must administer them</li>
          <li><strong>Constituency protection:</strong> Even tiny programs have beneficiaries who lobby to keep them</li>
          <li><strong>Administrative overhead:</strong> Closing a program requires formal rulemaking and congressional approval</li>
          <li><strong>Just in case:</strong> Some disaster-specific programs exist for rare events (volcanic eruptions, etc.)</li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)]">The Reform Opportunity</h2>
        <p>
          Consolidating or eliminating zombie programs wouldn&apos;t save huge sums — {fmtMoney(totalZombieCost)} across all {data.zombieCount} programs
          is a rounding error in a $147 billion system. But it would reduce administrative complexity, free up FSA staff time, and
          simplify the bewildering landscape that farmers must navigate.
        </p>
        <p>
          The <Link href="/analysis/program-proliferation">program proliferation analysis</Link> explores the broader complexity
          problem. With {data.totalPrograms} programs, even well-informed farmers struggle to know what they qualify for.
        </p>
      </div>

      <RelatedArticles currentSlug="zombie-programs" />
    </article>
  )
}
