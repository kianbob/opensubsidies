import Link from 'next/link'
import { loadData } from '@/lib/server-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProgramExplorerClient from './ProgramExplorerClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Program Explorer — Browse All 157 USDA Farm Subsidy Programs',
  description: 'Filter, sort, and explore all 157 USDA farm subsidy programs by category, amount, and payment count.',
  alternates: { canonical: 'https://www.opensubsidies.org/tools/program-explorer' },
}

export default function ProgramExplorerPage() {
  const programs = loadData('programs.json')
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Program Explorer' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Program Explorer</h1>
      <p className="text-gray-600 mb-8">Browse and filter all 157 USDA farm subsidy programs. Search by name, filter by category, and sort by spending or payment count.</p>
      <ProgramExplorerClient programs={programs} />

      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">You Might Also Like</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/tools/compare-programs" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Compare Programs</h3>
            <p className="text-sm text-gray-600 mt-1">Side-by-side program comparison</p>
          </Link>
          <Link href="/tools/calculator" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Subsidy Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Put spending in context</p>
          </Link>
          <Link href="/analysis/zombie-programs" className="p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition-all">
            <h3 className="font-semibold text-green-800">Zombie Programs</h3>
            <p className="text-sm text-gray-600 mt-1">Programs nobody uses</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
