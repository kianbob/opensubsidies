import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Interactive Tools — Explore Farm Subsidy Data',
  description: 'Interactive tools to explore, compare, and analyze U.S. farm subsidy data. Compare states, calculate subsidy context, and more.',
  alternates: { canonical: 'https://www.opensubsidies.org/tools' },
}

const tools = [
  { href: '/compare', title: 'Compare States', desc: 'Side-by-side comparison of up to 4 states with charts and program overlap analysis.', icon: '⚖️' },
  { href: '/tools/calculator', title: 'Subsidy Calculator', desc: 'Enter any dollar amount and see how it compares to farm subsidy payments.', icon: '🧮' },
  { href: '/tools/recipient-search', title: 'Recipient Search', desc: 'Search top recipients by name, farm, or city. Find out who receives farm subsidies.', icon: '🔎' },
  { href: '/tools/state-profile', title: 'State Profile Generator', desc: 'Generate a shareable profile card for any state with key subsidy stats and trends.', icon: '🗺️' },
  { href: '/tools/compare-programs', title: 'Compare Programs', desc: 'Compare up to 4 USDA programs side-by-side with spending charts and state breakdowns.', icon: '📊' },
  { href: '/tools/taxpayer-calculator', title: 'Taxpayer Calculator', desc: 'How much of your taxes go to farm subsidies? Enter your income to find out.', icon: '💰' },
  { href: '/rankings', title: 'State Rankings', desc: 'Rank all states by total subsidies, per-capita spending, payment count, or average payment.', icon: '🏆' },
  { href: '/categories', title: 'Program Categories', desc: 'Browse 157 farm programs organized by type: conservation, disaster, commodity, and loans.', icon: '📂' },
  { href: '/trends', title: 'Spending Trends', desc: 'See how farm subsidy spending has changed over time with interactive charts.', icon: '📈' },
  { href: '/search', title: 'Search Everything', desc: 'Search across all states, counties, programs, and recipients.', icon: '🔍' },
  { href: '/downloads', title: 'Download Data', desc: 'Download raw JSON datasets for your own analysis.', icon: '📥' },
  { href: '/program-decoder', title: 'Program Decoder', desc: 'Plain-English guide to every USDA program acronym: CRP, PLC, ARC, CFAP, MFP, and more.', icon: '🔤' },
  { href: '/state-dependency', title: 'State Dependency', desc: 'Which states rely most on federal farm payments? North Dakota at 69% vs California at 2%.', icon: '📉' },
  { href: '/subsidy-map', title: 'Subsidy Map', desc: 'Rank all 50 states by total subsidies, per capita, or dependency percentage.', icon: '🗺️' },
  { href: '/tools/program-explorer', title: 'Program Explorer', desc: 'Browse and filter all 157 USDA programs by category, amount, and payment count.', icon: '🧭' },
  { href: '/tools/state-comparison', title: 'State Comparison', desc: 'Compare 2-4 states side-by-side with per-capita spending, emergency breakdowns, and charts.', icon: '📋' },
  { href: '/tools/timeline-explorer', title: 'Timeline Explorer', desc: 'Interactive timeline of farm subsidy spending with annotated policy events.', icon: '⏳' },
  { href: '/tools/subsidy-quiz', title: 'Farm Subsidy Quiz', desc: 'Test your knowledge with 10 data-driven questions about where $147 billion really goes.', icon: '🧠' },
  { href: '/tools/county-finder', title: 'County Finder', desc: 'Search all U.S. counties to find farm subsidy totals and payment counts for your area.', icon: '📍' },
  { href: '/tools/state-report-card', title: 'State Report Card', desc: 'Grade any state A-F on subsidy concentration, dependency, program diversity, conservation, and emergency spending.', icon: '📊' },
  { href: '/tools/subsidy-tracker', title: 'County Subsidy Tracker', desc: 'Track your county\'s subsidies with comparisons to state and national averages.', icon: '📍' },
]

export default function ToolsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.opensubsidies.org"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://www.opensubsidies.org/tools"}]}` }} />
      <Breadcrumbs items={[{ label: 'Tools' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Interactive Tools</h1>
      <p className="text-gray-600 mb-8">Tools to explore, compare, and analyze farm subsidy data.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map(t => (
          <Link key={t.href} href={t.href} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
            <span className="text-3xl">{t.icon}</span>
            <h2 className="text-lg font-bold text-gray-900 mt-2">{t.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{t.desc}</p>
          </Link>
        ))}
      </div>

      <section className="mt-12 prose max-w-none text-gray-600">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">About These Tools</h2>
        <p>
          These interactive tools let you explore over 31.7 million USDA farm subsidy
          payment records in different ways. All tools run entirely in your browser — no server requests needed
          after the page loads. Data comes from the USDA Farm Service Agency, covering 9 years (2017–2025).
        </p>
      </section>
    </div>
  )
}
