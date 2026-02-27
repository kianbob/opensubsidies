import { loadData } from '@/lib/server-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import RankingsClient from '@/components/RankingsClient'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'State Rankings — Farm Subsidies by State',
  description: 'Rank all 50 states by total farm subsidies, per-capita spending, number of payments, and average payment size.',
}

export default function RankingsPage() {
  const states = loadData('states.json') as { abbr: string; name: string; payments: number; amount: number }[]

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Rankings' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">State Rankings</h1>
      <p className="text-gray-600 mb-8">Compare states by total subsidies, per-capita spending, payment counts, and average payment size.</p>
      <RankingsClient states={states} />

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">Explore More</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { href: '/states', title: 'All States', desc: 'Browse farm subsidy data for every U.S. state and territory.' },
            { href: '/analysis/state-disparities', title: 'State Disparities', desc: 'Why some states receive far more subsidies than others.' },
            { href: '/analysis/per-capita', title: 'Per-Capita Analysis', desc: 'Farm subsidies relative to state population size.' },
            { href: '/state-dependency', title: 'State Dependency', desc: 'How dependent are states on federal farm subsidies?' },
          ].map(l => (
            <Link key={l.href} href={l.href} className="p-3 rounded-lg hover:bg-gray-50 border border-gray-100">
              <div className="font-semibold text-primary text-sm">{l.title}</div>
              <div className="text-xs text-gray-500">{l.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
