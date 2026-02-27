import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { fmt, fmtMoney } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DOGE and Farm Subsidies: What Government Efficiency Means for USDA Payments',
  description: 'How would DOGE (Department of Government Efficiency) evaluate $147B in USDA farm subsidies? 157 programs, 46 zombie programs, and billions in emergency spending.',
  alternates: { canonical: 'https://www.opensubsidies.org/doge-farm-subsidies' },
}

export default function DogeFarmSubsidiesPage() {
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalPrograms: number; dataYears: string }

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"How much does the US spend on farm subsidies?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"From 2017 to 2025, the USDA distributed $147.29 billion in farm subsidy payments across 157 programs and 31.8 million individual payments through the Farm Service Agency.\"}},{\"@type\":\"Question\",\"name\":\"What are zombie programs in farm subsidies?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Zombie programs are USDA subsidy programs that have fewer than 100 payments each but persist through bureaucratic inertia. At least 43 such programs exist, consuming administrative overhead while serving almost nobody.\"}},{\"@type\":\"Question\",\"name\":\"Could DOGE cut farm subsidies?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"The Department of Government Efficiency could target several areas: consolidating the 157 separate programs, eliminating zombie programs with minimal recipients, and reviewing the top recipients who collect from multiple programs simultaneously.\"}}]}" }} />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'DOGE and Farm Subsidies' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'DOGE and Farm Subsidies: What Government Efficiency Means for USDA Payments',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.org' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          DOGE and Farm Subsidies: What Government Efficiency Means for USDA Payments
        </h1>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-lg text-gray-600">Is {fmtMoney(stats.totalAmount)} in farm subsidies well-spent? The data raises hard questions.</p>
          <ShareButtons title="DOGE and Farm Subsidies: What Government Efficiency Means for USDA Payments" />
        </div>
      </div>

      <div className="prose max-w-none">
        <p>
          The Department of Government Efficiency (DOGE) has made waves reviewing federal spending for waste, fraud, and redundancy.
          USDA farm subsidies — {fmtMoney(stats.totalAmount)} across {stats.totalPrograms} programs — represent one of the largest
          discretionary spending categories in the federal budget. Our dataset covering {stats.dataYears} reveals exactly where
          efficiency-minded reformers should look.
        </p>

        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Total Spending', value: fmtMoney(stats.totalAmount) },
            { label: 'Programs', value: stats.totalPrograms.toString() },
            { label: 'Zombie Programs', value: '43+' },
            { label: 'Total Payments', value: fmt(stats.totalPayments) },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Efficiency Problem: 157 Programs</h2>
        <p>
          The USDA doesn&apos;t run one farm subsidy program — it runs {stats.totalPrograms}. Many overlap, some contradict each other,
          and <Link href="/analysis/zombie-programs">at least 43 &ldquo;zombie programs&rdquo;</Link> have fewer than 100 payments each.
          These programs persist through bureaucratic inertia, consuming administrative overhead while serving almost nobody.
        </p>
        <p>
          For efficiency advocates, the program count alone signals bloat. The question isn&apos;t whether farm subsidies exist —
          it&apos;s whether 157 separate bureaucratic channels are the right way to deliver them. See our full{' '}
          <Link href="/analysis/program-proliferation">analysis of program proliferation</Link>.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Who Gets the Money?</h2>
        <p>
          Farm subsidies don&apos;t just go to farmers. Our <Link href="/entity-types">entity type breakdown</Link> shows payments
          flowing to corporations, LLCs, government entities, and partnerships. <Link href="/analysis/double-dippers">Over 620,000
          recipients collect from 3 or more programs simultaneously</Link>, with some tapping into 14 programs at once.
        </p>
        <p>
          The <Link href="/analysis/subsidy-concentration">concentration problem</Link> is stark: the top 10% of recipients
          collect nearly three-fourths of all payments. 69% of American farms receive nothing at all.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Emergency Spending: The Budget Buster</h2>
        <p>
          Traditional farm subsidies are large but predictable. What&apos;s blown up the budget is emergency spending —
          trade war bailouts, COVID relief, and disaster programs that now dwarf the baseline. In 2020 alone,
          farm subsidy spending roughly doubled due to pandemic relief programs.
        </p>
        <p>
          Emergency programs bypass normal budget scrutiny. They&apos;re created fast, spend big, and often become permanent.
          The <Link href="/analysis/decade-of-disaster">decade of disaster spending</Link> shows how what started as
          exceptions became the rule.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What DOGE Should Examine</h2>
        <p>If the goal is genuine efficiency in farm spending, the data points to several areas:</p>
        <ol>
          <li><strong>Consolidate programs:</strong> {stats.totalPrograms} programs is indefensible. Many could be merged or eliminated. Start with the <Link href="/analysis/zombie-programs">43 zombie programs</Link>.</li>
          <li><strong>Audit entity types:</strong> Why are <Link href="/entity-types">government entities receiving farm subsidies</Link>? What&apos;s the public interest case?</li>
          <li><strong>Cap emergency spending:</strong> Emergency programs need sunset clauses and spending caps, not open-ended authorizations.</li>
          <li><strong>Address concentration:</strong> If 69% of farms get nothing, the programs aren&apos;t serving &ldquo;farmers&rdquo; — they&apos;re serving large agricultural operations.</li>
          <li><strong>Examine <Link href="/categories">spending by category</Link>:</strong> Compare the ROI of commodity subsidies vs. conservation vs. disaster relief.</li>
        </ol>

        <h2 className="font-[family-name:var(--font-heading)]">The Data Is Public — Explore It Yourself</h2>
        <p>
          Every number in this article comes from our open database of USDA Farm Service Agency payments. No paywalls, no gatekeeping.
          Whether you think farm subsidies are essential safety nets or wasteful spending, the data should be accessible to everyone.
        </p>
        <div className="not-prose flex flex-wrap gap-3 my-6">
          <Link href="/search" className="bg-[#15803d] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors">Search the Database</Link>
          <Link href="/analysis" className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">All Analysis →</Link>
          <Link href="/downloads" className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Download Data →</Link>
        </div>
      </div>
    </article>
  )
}
