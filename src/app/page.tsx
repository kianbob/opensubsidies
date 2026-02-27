import { Metadata } from 'next'
import Link from 'next/link'
import { fmtMoney, fmt, formatProgram, titleCase, slugify } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import SpendingTimeline from '@/components/SpendingTimeline'

export const metadata: Metadata = {
  title: 'OpenSubsidies — Where $147 Billion in Farm Subsidies Really Goes',
  description: 'Track every dollar of U.S. farm subsidies. 31 million+ payment records, 157 programs, every state and county. Free, open data from USDA Farm Service Agency, 2017-2025.',
  alternates: { canonical: 'https://www.opensubsidies.org' },
}

export default function HomePage() {
  const stats = loadData('stats.json')
  const states = loadData('states.json').slice(0, 10)
  const programs = loadData('programs.json').slice(0, 10)
  const recipients = loadData('top-recipients.json').slice(0, 5)
  const yearly = loadData('yearly.json')

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-6xl font-bold mb-4">
            {fmtMoney(stats.totalAmount)} in Farm Subsidies.<br className="hidden md:block" /> Every Dollar. Every Recipient.
          </h1>
          <p className="text-lg text-green-200 mb-2 max-w-2xl mx-auto">
            The most comprehensive open database of U.S. farm subsidy payments — {fmt(stats.totalPayments)} payments across {fmt(stats.totalPrograms)} programs, every state and county.
          </p>
          <p className="text-sm text-green-200 mb-2">
            Data from USDA Farm Service Agency · 2017–2025 · Open data, no paywalls
          </p>
          <p className="text-xs text-green-300 mb-6">
            🟢 9 years of data (2017–2025) · 31.8M payments · Last updated February 2026
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/states" className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-green-50 transition-colors">
              Explore by State
            </Link>
            <Link href="/programs" className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Browse Programs
            </Link>
            <Link href="/recipients" className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Top Recipients
            </Link>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Subsidies', value: fmtMoney(stats.totalAmount), href: '/dashboard' },
            { label: 'Payment Records', value: fmt(stats.totalPayments), href: '/dashboard' },
            { label: 'Programs', value: fmt(stats.totalPrograms), href: '/programs' },
            { label: 'Counties', value: fmt(stats.totalCounties), href: '/counties' },
          ].map(s => (
            <Link key={s.label} href={s.href} className="bg-white rounded-xl shadow-md p-5 text-center hover:shadow-lg transition-shadow">
              <div className="text-2xl md:text-3xl font-bold text-primary">{s.value}</div>
              <div className="text-sm text-gray-600 mt-1">{s.label}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Spending Timeline */}
      <section className="max-w-7xl mx-auto px-4 pt-12">
        <SpendingTimeline yearly={yearly} />
      </section>

      {/* Your Tax Dollars at Work */}
      <section className="max-w-7xl mx-auto px-4 pt-10">
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-center text-amber-900">Your Tax Dollars at Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <Link href="/tools/taxpayer-calculator" className="group hover:bg-amber-100 rounded-xl p-4 transition-colors">
              <div className="text-2xl font-bold text-amber-800 group-hover:text-primary">$109/year</div>
              <div className="text-sm text-gray-600 mt-1">per taxpayer goes to farm subsidies</div>
            </Link>
            <Link href="/analysis/double-dippers" className="group hover:bg-amber-100 rounded-xl p-4 transition-colors">
              <div className="text-2xl font-bold text-amber-800 group-hover:text-primary">93%</div>
              <div className="text-sm text-gray-600 mt-1">of top recipients collect from 3+ programs</div>
            </Link>
            <Link href="/analysis/zombie-programs" className="group hover:bg-amber-100 rounded-xl p-4 transition-colors">
              <div className="text-2xl font-bold text-amber-800 group-hover:text-primary">46</div>
              <div className="text-sm text-gray-600 mt-1">zombie programs still exist at USDA</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Explore by Year */}
      <section className="max-w-7xl mx-auto px-4 pt-6 text-center">
        <p className="text-sm text-gray-500">
          Explore by Year:{' '}
          {[2017,2018,2019,2020,2021,2022,2023,2024,2025].map((y, i) => (
            <span key={y}>{i > 0 && ' · '}<Link href={`/years/${y}`} className="text-primary hover:underline font-medium">{y}</Link></span>
          ))}
        </p>
      </section>

      {/* Historical Context */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-100">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4 text-center">Historical Context</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">🌐 2018–2019: Trade War</h3>
              <p>US-China tariffs triggered the Market Facilitation Program — billions in direct payments to offset lost export markets.</p>
              <Link href="/analysis/trade-war" className="text-primary text-xs hover:underline">Read analysis →</Link>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">🦠 2020: COVID Pandemic</h3>
              <p>CFAP programs pushed spending to $38.7B — the all-time peak — as supply chains collapsed and markets crashed.</p>
              <Link href="/analysis/covid-spending" className="text-primary text-xs hover:underline">Read analysis →</Link>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">🌪️ 2022–2024: Disasters</h3>
              <p>Drought, wildfires, and hurricanes drove ongoing emergency spending that kept payments elevated above pre-2018 levels.</p>
              <Link href="/analysis/disaster-spending" className="text-primary text-xs hover:underline">Read analysis →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Top States */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Top 10 States by Subsidies</h2>
          <Link href="/states" className="text-primary text-sm font-medium hover:underline">View all →</Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">State</th>
                <th className="px-4 py-3 font-semibold text-right">Total Subsidies</th>
                <th className="px-4 py-3 font-semibold text-right hidden md:table-cell">Payments</th>
                <th className="px-4 py-3 font-semibold hidden lg:table-cell">Top Program</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {states.map((s: { abbr: string; name: string; amount: number; payments: number; topPrograms: { program: string; amount: number }[] }, i: number) => (
                <tr key={s.abbr} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                  <td className="px-4 py-3">
                    <Link href={`/states/${s.abbr.toLowerCase()}`} className="font-medium text-primary hover:underline">{s.name}</Link>
                  </td>
                  <td className="px-4 py-3 text-right font-mono">{fmtMoney(s.amount)}</td>
                  <td className="px-4 py-3 text-right text-gray-600 hidden md:table-cell">{fmt(s.payments)}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs hidden lg:table-cell">{formatProgram(s.topPrograms?.[0]?.program || '')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* State Dependency Insight */}
      <section className="max-w-7xl mx-auto px-4 pb-6">
        <div className="bg-green-50 border-l-4 border-primary rounded-r-lg p-4">
          <p className="text-sm text-gray-800">
            💡 In North Dakota, farm subsidies equal 69% of total farm income — the highest dependency rate in the nation.{' '}
            <Link href="/state-dependency" className="text-primary font-medium hover:underline">See the full analysis →</Link>
          </p>
        </div>
      </section>

      {/* Top Programs */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Largest Subsidy Programs</h2>
          <Link href="/programs" className="text-primary text-sm font-medium hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((p: { program: string; amount: number; payments: number }, i: number) => (
            <Link key={i} href={`/programs/${slugify(p.program)}`} className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-primary hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-primary text-sm">{formatProgram(p.program)}</h3>
                  <p className="text-xs text-gray-500 mt-1">{fmt(p.payments)} payments</p>
                </div>
                <span className="text-lg font-bold text-primary">{fmtMoney(p.amount)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Recipients */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Top Subsidy Recipients</h2>
          <Link href="/recipients" className="text-primary text-sm font-medium hover:underline">View all →</Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">Recipient</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold text-right">Total Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recipients.map((r: { name: string; state: string; city: string; amount: number }, i: number) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                  <td className="px-4 py-3 font-medium"><Link href={`/recipients/${slugify(`${r.name}-${r.city}-${r.state}`)}`} className="text-green-700 hover:underline">{titleCase(r.name)}</Link></td>
                  <td className="px-4 py-3 text-gray-600">{titleCase(r.city)}, {r.state}</td>
                  <td className="px-4 py-3 text-right font-mono text-primary font-semibold">{fmtMoney(r.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* The Disparity */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-8 border border-red-100">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4 text-center">The Subsidy Gap</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-red-700">{fmtMoney(recipients[0]?.amount)}</div>
              <div className="text-sm text-gray-600 mt-1">Top recipient collected<br /><span className="font-medium">{titleCase(recipients[0]?.name || '')}</span></div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-700">{fmtMoney(stats.totalAmount / stats.totalPayments)}</div>
              <div className="text-sm text-gray-600 mt-1">Average payment<br />across all {fmt(stats.totalPayments)} payments</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-700">69%</div>
              <div className="text-sm text-gray-600 mt-1">of U.S. farms receive<br /><span className="font-medium">zero subsidy payments</span></div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            <Link href="/analysis/subsidy-concentration" className="text-primary hover:underline">Read our analysis →</Link>
          </p>
        </div>
      </section>

      {/* New Research */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6 text-center">New Research</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Double Dippers', desc: '93% of top recipients collect from multiple programs', href: '/analysis/double-dippers' },
            { title: 'Farm Crisis 2025', desc: 'Bankruptcies up 46% while subsidies flow to the top', href: '/analysis/farm-crisis-2025' },
            { title: 'What $147B Buys', desc: 'What farm subsidies could fund instead', href: '/analysis/what-147b-buys' },
            { title: 'Zombie Programs', desc: '46 USDA programs nobody uses', href: '/analysis/zombie-programs' },
          ].map(item => (
            <Link key={item.href} href={item.href} className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-primary hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              <span className="text-sm text-primary font-medium mt-2 inline-block">Read →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Explore Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-8 text-center">Explore the Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Browse Data */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 text-primary rounded-lg flex items-center justify-center text-sm">📊</span>
              Browse Data
            </h3>
            <div className="space-y-1.5">
              {[
                { label: 'States', href: '/states', sub: '59 states & territories' },
                { label: 'Counties', href: '/counties', sub: '28,875 counties' },
                { label: 'Programs', href: '/programs', sub: '157 USDA programs' },
                { label: 'Top Recipients', href: '/recipients', sub: '2,000 largest' },
                { label: 'Dashboard', href: '/dashboard', sub: 'Interactive overview' },
                { label: 'Entity Types', href: '/entity-types', sub: 'Who gets paid' },
              ].map(item => (
                <Link key={item.href} href={item.href} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-green-50 group transition-colors">
                  <span className="text-sm font-medium text-gray-800 group-hover:text-primary">{item.label}</span>
                  <span className="text-xs text-gray-400">{item.sub}</span>
                </Link>
              ))}
            </div>
          </div>
          {/* Analysis & Rankings */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">🔍</span>
              Analysis & Rankings
            </h3>
            <div className="space-y-1.5">
              {[
                { label: 'Analysis Articles', href: '/analysis', sub: '22+ deep dives' },
                { label: 'State Rankings', href: '/rankings', sub: 'Total, per-capita, avg' },
                { label: 'County Rankings', href: '/county-rankings', sub: 'Top subsidy counties' },
                { label: 'Categories', href: '/categories', sub: 'Program groupings' },
                { label: 'Trends', href: '/trends', sub: 'Year-over-year' },
              ].map(item => (
                <Link key={item.href} href={item.href} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-amber-50 group transition-colors">
                  <span className="text-sm font-medium text-gray-800 group-hover:text-amber-700">{item.label}</span>
                  <span className="text-xs text-gray-400">{item.sub}</span>
                </Link>
              ))}
            </div>
          </div>
          {/* Tools & Resources */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🛠️</span>
              Tools & Resources
            </h3>
            <div className="space-y-1.5">
              {[
                { label: 'Compare States', href: '/compare', sub: 'Side-by-side' },
                { label: 'Interactive Tools', href: '/tools', sub: '10+ tools' },
                { label: 'Farm Subsidy Facts', href: '/facts', sub: '25 key facts' },
                { label: 'Glossary', href: '/glossary', sub: '17 terms defined' },
                { label: 'Downloads', href: '/downloads', sub: 'Free JSON datasets' },
                { label: 'Taxpayer Calculator', href: '/tools/taxpayer-calculator', sub: 'Your cost' },
                { label: 'Farm Bill Guide', href: '/farm-bill', sub: '2024 Farm Bill' },
              ].map(item => (
                <Link key={item.href} href={item.href} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-blue-50 group transition-colors">
                  <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700">{item.label}</span>
                  <span className="text-xs text-gray-400">{item.sub}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6 text-center">Why This Data Matters</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">💰</div>
            <h3 className="font-semibold text-gray-900 mb-2">Taxpayer Accountability</h3>
            <p className="text-sm text-gray-600">$147 billion in public money — yet 69% of farms receive nothing. Who gets the rest? Now you can see every dollar.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">📊</div>
            <h3 className="font-semibold text-gray-900 mb-2">Data Transparency</h3>
            <p className="text-sm text-gray-600">USDA data is public but buried in Excel files. We process 31.8M records so you don&apos;t have to.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">🔍</div>
            <h3 className="font-semibold text-gray-900 mb-2">Policy Insight</h3>
            <p className="text-sm text-gray-600">Emergency spending now dwarfs traditional programs. Trade wars and pandemics reshaped farm policy permanently.</p>
          </div>
        </div>
        <p className="text-center mt-6 text-sm text-gray-500">
          All data from USDA Farm Service Agency · <Link href="/about" className="text-primary hover:underline">Learn more about our mission</Link>
        </p>
      </section>
    </>
  )
}
