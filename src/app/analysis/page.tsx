import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analysis — Farm Subsidy Deep Dives',
  description: 'Data-driven analysis of U.S. farm subsidies: concentration, disaster spending, conservation, and the biggest recipients.',
}

const articles = [
  {
    slug: 'subsidy-concentration',
    title: 'The 10% Problem: How Most Farm Subsidies Go to the Biggest Operations',
    desc: '69% of farms get nothing. The top 10% collect nearly three-fourths of all payments. Who are they?',
    date: 'February 2026',
    category: 'Concentration',
  },
  {
    slug: 'disaster-spending',
    title: 'The Disaster Money Machine: $20 Billion in Emergency Farm Payments',
    desc: 'Emergency and disaster programs now dwarf traditional subsidies. Is this the new normal?',
    date: 'February 2026',
    category: 'Spending',
  },
  {
    slug: 'state-disparities',
    title: 'Texas Gets $3.8 Billion, Vermont Gets $37 Million: The Geography of Farm Subsidies',
    desc: 'A handful of states receive the vast majority of farm subsidy dollars. The map tells the story.',
    date: 'February 2026',
    category: 'Geography',
  },
  {
    slug: 'conservation-vs-commodity',
    title: 'Conservation vs. Commodity: Two Philosophies of Farm Spending',
    desc: 'CRP pays farmers NOT to farm. Commodity programs pay them to produce. Which approach wins?',
    date: 'February 2026',
    category: 'Policy',
  },
  {
    slug: 'corporate-farms',
    title: 'When Corporations Collect: The Biggest Non-Family Recipients',
    desc: 'LLCs, partnerships, and corporations collecting millions. Are payment limits working?',
    date: 'February 2026',
    category: 'Recipients',
  },
  {
    slug: 'per-capita',
    title: 'Farm Subsidies Per Capita: Which States Get the Most Per Person?',
    desc: 'North Dakota gets $6,000+ per person. California gets under $100. The per-capita view tells a different story.',
    date: 'February 2026',
    category: 'Geography',
  },
]

export default function AnalysisPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Analysis' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Analysis & Deep Dives</h1>
      <p className="text-gray-600 mb-8">Data-driven investigations into how farm subsidies are distributed, who benefits, and what the numbers reveal about U.S. agricultural policy.</p>
      <div className="space-y-6">
        {articles.map(a => (
          <Link key={a.slug} href={`/analysis/${a.slug}`} className="block bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border-l-4 border-primary">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-medium bg-green-100 text-primary px-2 py-0.5 rounded-full">{a.category}</span>
              <span className="text-xs text-gray-500">{a.date}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{a.title}</h2>
            <p className="text-gray-600 text-sm">{a.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
