import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { loadData } from '@/lib/utils'
import DependencyClient from './DependencyClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Farm Subsidy Dependency: Which States Rely Most on Federal Payments?',
  description: 'North Dakota gets 69% of farm income from subsidies. California gets 2%. See which states are most dependent on federal farm payments and what it means for policy.',
  alternates: { canonical: 'https://www.opensubsidies.us/state-dependency' },
}

export default function StateDependencyPage() {
  const data = loadData('state-dependency.json')

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'State Dependency' }]} />

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Farm Subsidy Dependency: Which States Rely Most on Federal Payments?
        </h1>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-lg text-gray-600">
            North Dakota receives 69% of its farm income from federal subsidies. California receives just 2%.
          </p>
          <ShareButtons title="Farm Subsidy Dependency by State" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-sm text-gray-500 mb-1">Most Dependent</div>
          <div className="text-2xl font-bold text-red-700">North Dakota — 69%</div>
          <div className="text-xs text-gray-400">of farm income from subsidies</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-sm text-gray-500 mb-1">Least Dependent</div>
          <div className="text-2xl font-bold text-green-700">California — 2%</div>
          <div className="text-xs text-gray-400">of farm income from subsidies</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
          <div className="text-sm text-gray-500 mb-1">Key Gap</div>
          <div className="text-2xl font-bold text-amber-700">34.5× Difference</div>
          <div className="text-xs text-gray-400">between most and least dependent</div>
        </div>
      </div>

      <DependencyClient data={data} />

      <section className="mt-12 prose max-w-none text-gray-600">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">What Dependency Means for Farm Policy</h2>
        <p>
          &quot;Dependency&quot; measures how much of a state&apos;s total farm income comes from federal subsidy payments rather than
          market sales. A high dependency ratio means farmers in that state would face dramatic income drops if subsidies
          were reduced or eliminated.
        </p>
        <p>
          North Dakota&apos;s 69% dependency rate is staggering — nearly seven out of every ten dollars in farm income come from
          the federal government. This is driven by a combination of low commodity prices for wheat and pulse crops,
          extensive CRP enrollment, and multiple rounds of disaster and trade war payments.
        </p>
        <p>
          By contrast, California&apos;s 2% dependency reflects its $308 billion farm economy dominated by high-value fruits,
          vegetables, nuts, and dairy — products that receive relatively little subsidy support compared to commodity crops.
        </p>
        <p>
          The states with the highest dependency tend to grow commodity crops (wheat, corn, soybeans) in regions prone to
          drought and price volatility. This creates a policy feedback loop: subsidies are designed to support these exact
          crops and conditions, which in turn makes these states more dependent on continued support.
        </p>
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Related Analysis</h2>
        <ul>
          <li><Link href="/states" className="text-primary hover:underline">All States Overview</Link></li>
          <li><Link href="/analysis/state-disparities" className="text-primary hover:underline">State Disparities in Farm Subsidies</Link></li>
          <li><Link href="/analysis/per-capita" className="text-primary hover:underline">Per Capita Subsidy Analysis</Link></li>
          <li><Link href="/subsidy-map" className="text-primary hover:underline">Interactive Subsidy Map</Link></li>
        </ul>
      </section>
    </div>
  )
}
