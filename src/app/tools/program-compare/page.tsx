import { loadData } from '@/lib/server-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProgramCompareClient from './ProgramCompareClient'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Program Compare — Side-by-Side USDA Program Comparison',
  description: 'Compare 2-3 USDA farm subsidy programs side by side. See total spending, recipient counts, average payments, and year-over-year spending trends.',
  alternates: { canonical: 'https://www.opensubsidies.org/tools/program-compare' },
}

export default function ProgramComparePage() {
  const programs = loadData('programs.json')
  const programYearly = loadData('program-yearly.json')

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Program Compare' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Program Compare</h1>
      <p className="text-gray-600 mb-8">
        Select 2–3 USDA programs to compare spending, payment counts, and year-over-year trends side by side.
      </p>
      <ProgramCompareClient programs={programs} programYearly={programYearly} />

      <section className="mt-16 prose max-w-none text-gray-600">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">About Program Comparison</h2>
        <p>
          This tool lets you compare any combination of USDA farm subsidy programs. Each program card shows
          total spending across all years (2017–2025), total payment count, average payment size, and the
          number of active years. The trend chart reveals how spending patterns differ — some programs are
          one-time emergency payments while others provide steady annual support.
        </p>
      </section>

      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">Related Tools</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/tools/compare-programs" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Compare Programs (Charts)</h3>
            <p className="text-sm text-gray-600 mt-1">Compare with state breakdowns</p>
          </Link>
          <Link href="/tools/program-explorer" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Program Explorer</h3>
            <p className="text-sm text-gray-600 mt-1">Browse all 157 programs</p>
          </Link>
          <Link href="/tools/subsidy-timeline" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Subsidy Timeline</h3>
            <p className="text-sm text-gray-600 mt-1">History of farm subsidy legislation</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
