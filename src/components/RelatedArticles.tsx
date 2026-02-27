import Link from 'next/link'

const allArticles = [
  { slug: 'covid-spending', title: 'COVID Changed Farm Subsidies Forever', category: 'Spending' },
  { slug: 'trade-war', title: 'Trade War Fallout: $39B in Tariff Bailouts', category: 'Policy' },
  { slug: 'subsidy-concentration', title: 'The 10% Problem: Who Gets Most Subsidies', category: 'Concentration' },
  { slug: 'disaster-spending', title: 'The Disaster Money Machine', category: 'Spending' },
  { slug: 'state-disparities', title: 'The Geography of Farm Subsidies', category: 'Geography' },
  { slug: 'conservation-vs-commodity', title: 'Conservation vs. Commodity', category: 'Policy' },
  { slug: 'corporate-farms', title: 'When Corporations Collect', category: 'Recipients' },
  { slug: 'per-capita', title: 'Farm Subsidies Per Capita by State', category: 'Geography' },
  { slug: 'payment-limits', title: 'Are Payment Limits Working?', category: 'Policy' },
  { slug: 'crp-conservation', title: 'CRP: Paying Farmers Not to Farm', category: 'Conservation' },
  { slug: 'small-vs-large', title: 'Small Farms vs. Large Operations', category: 'Concentration' },
  { slug: 'county-hotspots', title: 'County Hotspots', category: 'Geography' },
  { slug: 'decade-of-disaster', title: 'A Decade of Disaster', category: 'Spending' },
  { slug: 'crp-under-threat', title: 'CRP Under Threat', category: 'Conservation' },
  { slug: 'average-farmer', title: 'What the Average Farmer Gets', category: 'Concentration' },
  { slug: 'state-winners-losers', title: 'State Winners & Losers', category: 'Geography' },
  { slug: 'negative-payments', title: 'Clawbacks and Corrections', category: 'Accountability' },
  { slug: 'program-proliferation', title: '157 Programs and Counting', category: 'Policy' },
  { slug: 'double-dippers', title: 'Double Dippers: Multi-Program Recipients', category: 'Accountability' },
  { slug: 'farm-crisis-2025', title: 'The 2025 Farm Crisis', category: 'Crisis' },
  { slug: 'zombie-programs', title: 'Zombie Programs Nobody Uses', category: 'Accountability' },
  { slug: 'what-147b-buys', title: 'What $147B Could Buy Instead', category: 'Spending' },
]

export default function RelatedArticles({ currentSlug }: { currentSlug: string }) {
  const current = allArticles.find(a => a.slug === currentSlug)
  const sameCat = allArticles.filter(a => a.slug !== currentSlug && a.category === current?.category)
  const others = allArticles.filter(a => a.slug !== currentSlug && a.category !== current?.category)
  const related = [...sameCat, ...others].slice(0, 3)

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">Related Analysis</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {related.map(a => (
          <Link key={a.slug} href={`/analysis/${a.slug}`} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <span className="text-xs font-medium bg-green-100 text-primary px-2 py-0.5 rounded-full">{a.category}</span>
            <h3 className="text-sm font-semibold text-gray-900 mt-2">{a.title}</h3>
          </Link>
        ))}
      </div>
      <p className="mt-4 text-center">
        <Link href="/analysis" className="text-primary text-sm font-medium hover:underline">View all {allArticles.length} analysis articles →</Link>
      </p>
    </section>
  )
}
