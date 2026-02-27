import { loadData } from '@/lib/server-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import RankingsClient from '@/components/RankingsClient'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'State Rankings — Farm Subsidies by State',
  description: 'Rank all 50 states by total farm subsidies, per-capita spending, number of payments, and average payment size.',
  alternates: { canonical: 'https://www.opensubsidies.org/rankings' },
}

export default function RankingsPage() {
  const states = loadData('states.json') as { abbr: string; name: string; payments: number; amount: number }[]

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Rankings' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">State Rankings</h1>
      <p className="text-gray-600 mb-8">Compare states by total subsidies, per-capita spending, payment counts, and average payment size.</p>
      {/* AI Overview */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3">📊 Why State Rankings Matter</h2>
        <p className="text-sm text-gray-700 mb-3">
          Farm subsidies are often discussed as a single national number — $147 billion over 9 years. But <strong>the story changes completely depending on how you rank states</strong>. Texas leads in raw dollars ($12.6B), but tiny North Dakota leads per capita. The difference reveals who farm policy is really designed to help.
        </p>
        <p className="text-sm text-gray-700 mb-3">
          Switch between the tabs above to see how rankings shift. States that rank high by total spending often drop when measured per capita, because large-population states like Texas and California have so many non-farming taxpayers that the per-person figure shrinks. Meanwhile, sparsely populated agricultural states like South Dakota and Montana surge to the top.
        </p>
        <p className="text-sm text-gray-700">
          <strong>The policy implication:</strong> Every U.S. Senator has equal voting power on farm bills, regardless of state population. States with high per-capita subsidies — often with just 1-2 million residents — have outsized influence over $16+ billion in annual federal spending. Understanding these rankings is essential to understanding farm policy politics.
        </p>
      </div>

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
