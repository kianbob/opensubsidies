import { loadData } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProgramExplorerClient from './ProgramExplorerClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Program Explorer — Browse All 157 USDA Farm Subsidy Programs',
  description: 'Filter, sort, and explore all 157 USDA farm subsidy programs by category, amount, and payment count.',
  alternates: { canonical: 'https://www.opensubsidies.us/tools/program-explorer' },
}

export default function ProgramExplorerPage() {
  const programs = loadData('programs.json')
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Program Explorer' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Program Explorer</h1>
      <p className="text-gray-600 mb-8">Browse and filter all 157 USDA farm subsidy programs. Search by name, filter by category, and sort by spending or payment count.</p>
      <ProgramExplorerClient programs={programs} />
    </div>
  )
}
