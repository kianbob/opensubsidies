import { Metadata } from 'next'
import Link from 'next/link'
import { loadData, fmtMoney, fmt, formatProgram, titleCase } from '@/lib/utils'
import SpendingTimeline from '@/components/SpendingTimeline'

export const metadata: Metadata = {
  title: 'OpenSubsidies — Where $147 Billion in Farm Subsidies Really Goes',
  description: 'Track every dollar of U.S. farm subsidies. 31 million+ payment records, 157 programs, every state and county. Free, open data from USDA Farm Service Agency, 2017-2025.',
  alternates: { canonical: 'https://www.opensubsidies.us' },
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

      {/* Top Programs */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Largest Subsidy Programs</h2>
          <Link href="/programs" className="text-primary text-sm font-medium hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((p: { program: string; amount: number; payments: number }, i: number) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-primary">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{formatProgram(p.program)}</h3>
                  <p className="text-xs text-gray-500 mt-1">{fmt(p.payments)} payments</p>
                </div>
                <span className="text-lg font-bold text-primary">{fmtMoney(p.amount)}</span>
              </div>
            </div>
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
                  <td className="px-4 py-3 font-medium">{titleCase(r.name)}</td>
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

      {/* Explore Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6 text-center">Explore the Data</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'All States', href: '/states', icon: '🗺️' },
            { label: 'Top Counties', href: '/counties', icon: '📍' },
            { label: 'Programs', href: '/programs', icon: '📋' },
            { label: 'Top Recipients', href: '/recipients', icon: '👤' },
            { label: 'Dashboard', href: '/dashboard', icon: '📊' },
            { label: 'Analysis', href: '/analysis', icon: '🔍' },
            { label: 'Rankings', href: '/rankings', icon: '🏆' },
            { label: 'Categories', href: '/categories', icon: '📂' },
            { label: 'Trends', href: '/trends', icon: '📈' },
            { label: 'Tools', href: '/tools', icon: '🛠️' },
            { label: 'Glossary', href: '/glossary', icon: '📖' },
            { label: 'Downloads', href: '/downloads', icon: '📥' },
          ].map(item => (
            <Link key={item.href} href={item.href} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100">
              <span className="text-2xl">{item.icon}</span>
              <div className="text-sm font-medium text-gray-900 mt-1">{item.label}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why This Matters */}
      <section className="max-w-3xl mx-auto px-4 pb-16 text-center">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">Why This Data Matters</h2>
        <div className="space-y-4 text-gray-600">
          <p>
            The federal government spends billions of dollars every year on farm subsidies — payments to agricultural producers
            for crop insurance, conservation, disaster relief, and commodity support. But <strong>69% of farms receive zero subsidy payments</strong>.
            The vast majority of money flows to the largest operations.
          </p>
          <p>
            OpenSubsidies makes this data accessible and searchable so taxpayers can see exactly where their money goes —
            by state, county, program, and individual recipient. All data comes directly from the USDA Farm Service Agency.
          </p>
        </div>
      </section>
    </>
  )
}
