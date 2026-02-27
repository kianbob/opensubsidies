import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analysis — Farm Subsidy Deep Dives',
  description: 'Data-driven analysis of U.S. farm subsidies: concentration, disaster spending, conservation, and the biggest recipients.',
}

const articles = [
  {
    slug: 'covid-spending',
    title: 'COVID Changed Farm Subsidies Forever: The $38.7 Billion Story',
    desc: 'In 2020, pandemic relief programs shattered every spending record in USDA history. CFAP, emergency payments, and the new baseline.',
    date: 'February 2026',
    category: 'Spending',
  },
  {
    slug: 'trade-war',
    title: 'Trade War Fallout: $39 Billion in Tariff Bailout Payments (2018-2019)',
    desc: 'US-China tariffs triggered the Market Facilitation Program — billions in direct payments to offset lost export markets.',
    date: 'February 2026',
    category: 'Policy',
  },
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
  {
    slug: 'payment-limits',
    title: 'Are Farm Subsidy Payment Limits Working?',
    desc: 'Top recipients receive far more than the $125K/yr cap through LLCs and partnerships. The limits are more aspiration than reality.',
    date: 'February 2026',
    category: 'Policy',
  },
  {
    slug: 'crp-conservation',
    title: 'The Conservation Reserve Program: Paying Farmers Not to Farm',
    desc: 'A $5.36B program that pays landowners NOT to produce. How CRP works, why it\'s controversial, and its environmental impact.',
    date: 'February 2026',
    category: 'Conservation',
  },
  {
    slug: 'small-vs-large',
    title: 'Small Farms vs. Large Operations: Who Really Benefits?',
    desc: 'The average vs. median payment gap tells the story. 69% of farms get nothing while the top 10% collect the vast majority.',
    date: 'February 2026',
    category: 'Concentration',
  },
  {
    slug: 'county-hotspots',
    title: 'County Hotspots: Where Farm Subsidies Concentrate',
    desc: 'Some individual counties receive more than entire states. A deep dive into the top 20 county hotspots.',
    date: 'February 2026',
    category: 'Geography',
  },
  {
    slug: 'decade-of-disaster',
    title: 'A Decade of Disaster: How Emergency Programs Took Over Farm Subsidies',
    desc: 'Emergency and disaster programs went from supplemental to dominant in less than a decade. Pre-2018 vs post-2018 spending patterns tell the story.',
    date: 'February 2026',
    category: 'Spending',
  },
  {
    slug: 'crp-under-threat',
    title: 'CRP Under Threat: Is Conservation Keeping Up with Emergency Spending?',
    desc: 'The Conservation Reserve Program at $15.7B is the largest traditional program. But emergency spending now dwarfs it.',
    date: 'February 2026',
    category: 'Conservation',
  },
  {
    slug: 'average-farmer',
    title: 'What Does the Average Farmer Actually Get? The $4,600 Reality',
    desc: '31.8M payments divided by $147B = ~$4,600 average. But the median is far lower. The inequality of farm subsidies.',
    date: 'February 2026',
    category: 'Concentration',
  },
  {
    slug: 'state-winners-losers',
    title: 'State Winners & Losers: Who Gained Most from Emergency Spending?',
    desc: 'Which states saw the biggest surge from emergency farm programs? Comparing 2017 baseline to 2020 peak ratios.',
    date: 'February 2026',
    category: 'Geography',
  },
  {
    slug: 'negative-payments',
    title: 'Clawbacks and Corrections: When the USDA Takes Money Back',
    desc: 'Not all farm subsidy payments are positive. Explore programs and recipients where the USDA clawed back overpayments.',
    date: 'February 2026',
    category: 'Accountability',
  },
  {
    slug: 'program-proliferation',
    title: '157 Programs and Counting: The Complexity of Farm Subsidies',
    desc: 'Why does the USDA have 157 different programs? An analysis of proliferation, overlap, and the gap between largest and smallest.',
    date: 'February 2026',
    category: 'Policy',
  },
  {
    slug: 'double-dippers',
    title: 'Double Dippers: Recipients Collecting from Multiple Programs',
    desc: 'Over 620,000 recipients collect from 3+ USDA programs simultaneously. Top recipients tap into 14 programs at once.',
    date: 'February 2026',
    category: 'Accountability',
  },
  {
    slug: 'farm-crisis-2025',
    title: 'The 2025 Farm Crisis: Bankruptcies Up 46% While Subsidies Flow to the Top',
    desc: '315 farm bankruptcies in 2025, 15K fewer farms, $44B in projected losses — and subsidies still flow to the biggest operations.',
    date: 'February 2026',
    category: 'Crisis',
  },
  {
    slug: 'zombie-programs',
    title: 'Zombie Programs: The USDA Programs Nobody Uses',
    desc: '43 programs with fewer than 100 payments each. Bureaucratic inertia keeps them alive while serving almost nobody.',
    date: 'February 2026',
    category: 'Accountability',
  },
  {
    slug: '../doge-farm-subsidies',
    title: 'DOGE and Farm Subsidies: What Government Efficiency Means for USDA Payments',
    desc: 'How would DOGE evaluate $147B in USDA farm subsidies? 157 programs, 43+ zombie programs, and billions in emergency spending.',
    date: 'February 2026',
    category: 'Policy',
  },
  {
    slug: '../farm-subsidy-reform',
    title: 'Farm Subsidy Reform: What the Data Shows About Fixing American Agriculture',
    desc: 'Five data-backed reform ideas from $147B in USDA payment data: consolidate programs, cap spending, means-test large operations.',
    date: 'February 2026',
    category: 'Policy',
  },
  {
    slug: 'what-147b-buys',
    title: 'What $147 Billion in Farm Subsidies Could Buy Instead',
    desc: '$147B could fund 2.2M teachers, 5.8M Pell Grants, or 6 years of NASA. Putting farm subsidies in perspective.',
    date: 'February 2026',
    category: 'Spending',
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
