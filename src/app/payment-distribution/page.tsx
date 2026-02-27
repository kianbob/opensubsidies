import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { loadData } from '@/lib/utils'
import DistributionClient from './DistributionClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Power Law of Farm Subsidies: Most Get Little, Few Get Millions',
  description: 'Farm subsidy payment distribution analysis: the median payment is $1,847 while the average is $4,623. Most recipients get small payments while a few collect millions.',
  alternates: { canonical: 'https://www.opensubsidies.us/payment-distribution' },
}

export default function PaymentDistributionPage() {
  const data = loadData('payment-distribution.json')

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Payment Distribution' }]} />

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          The Power Law of Farm Subsidies: Most Get Little, Few Get Millions
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-lg text-gray-600">The median farm subsidy payment is $1,847. The average is $4,623. That 2.5x gap reveals deep inequality.</p>
          <ShareButtons title="The Power Law of Farm Subsidies" />
        </div>
      </div>

      <DistributionClient data={data} />

      <section className="mt-8 prose max-w-none text-gray-600">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">The Inequality Paradox</h2>
        <p>
          Farm subsidies were originally designed to protect small family farms from price volatility and natural disasters.
          But the distribution tells a different story: a classic power law where the bulk of money flows upward to the
          largest operations.
        </p>
        <p>
          The average payment ($4,623) is 2.5 times the median ($1,847) — a clear sign of right-skew in the distribution.
          While millions of small payments go to individual farmers for modest amounts, a handful of recipients at the top
          collect payments exceeding $1 million. The top 10% of recipients by payment size account for roughly 70% of all
          subsidy dollars.
        </p>
        <p>
          This isn&apos;t necessarily intentional — larger farms produce more, so production-linked programs naturally pay them more.
          But it raises the question: should taxpayer-funded subsidies be structured to primarily benefit operations that may
          not need the support?
        </p>
        <p>
          For deeper analysis, see <Link href="/analysis/subsidy-concentration" className="text-primary hover:underline">The 10% Problem</Link> and
          our <Link href="/recipients" className="text-primary hover:underline">top recipients database</Link>.
        </p>
      </section>
    </div>
  )
}
