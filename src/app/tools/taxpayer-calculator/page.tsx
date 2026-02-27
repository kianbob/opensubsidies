import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { loadData } from '@/lib/utils'
import TaxpayerCalculatorClient from './TaxpayerCalculatorClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How Much of Your Taxes Goes to Farm Subsidies? Calculator',
  description: 'Interactive calculator showing how much of your federal taxes fund farm subsidies. The average taxpayer contributes $982 over 9 years — $109/year — to the $147B farm subsidy system.',
  alternates: { canonical: 'https://www.opensubsidies.us/tools/taxpayer-calculator' },
}

export default function TaxpayerCalculatorPage() {
  const data = loadData('taxpayer-cost.json')

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Taxpayer Calculator' }]} />

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          How Much of Your Taxes Goes to Farm Subsidies?
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-lg text-gray-600">The average American taxpayer contributes $109/year to farm subsidies. Enter your income to estimate your share.</p>
          <ShareButtons title="How Much of Your Taxes Goes to Farm Subsidies?" />
        </div>
      </div>

      <TaxpayerCalculatorClient data={data} />

      <section className="mt-12 prose max-w-none text-gray-600">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">How We Calculated This</h2>
        <p>
          We divided $147 billion in total FSA farm subsidy payments (2017–2025) by the approximately 150 million individual
          federal income tax filers. The per-household figure uses 131 million U.S. households. Your personalized estimate
          uses a simplified effective federal tax rate and farm subsidies&apos; share of the federal budget (~0.4%).
        </p>
        <p>
          These figures include only direct FSA payments tracked by OpenSubsidies. They do not include crop insurance premium
          subsidies (~$10B/year), SNAP/nutrition spending (~$100B/year), or other USDA programs — which would significantly
          increase the total.
        </p>
      </section>
    </div>
  )
}
