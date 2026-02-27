import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fmt, fmtMoney, slugify, formatProgram } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import StateYearlyChart from '@/components/StateYearlyChart'

type Program = { program: string; code: string; amount: number; payments: number }
type ProgramYearly = { program: string; yearly: { year: number; amount: number; payments: number }[] }

export const dynamicParams = true

export function generateStaticParams() {
  const programs = loadData('programs.json') as Program[]
  return programs.slice(0, 20).map(p => ({ slug: slugify(p.program) }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const programs = loadData('programs.json') as Program[]
  const program = programs.find(p => slugify(p.program) === slug)
  if (!program) return { title: 'Program Not Found' }
  return {
    title: `${formatProgram(program.program)} — ${fmtMoney(program.amount)} in Farm Subsidies`,
    description: `The ${formatProgram(program.program)} distributed ${fmtMoney(program.amount)} across ${fmt(program.payments)} payments from 2017-2025.`,
    alternates: { canonical: `https://www.opensubsidies.org/programs/${slug}` },
  }
}

function getProgramCategory(name: string): { label: string; color: string } {
  const n = name.toUpperCase()
  if (n.includes('CRP') || n.includes('CONSERVATION') || n.includes('EQIP') || n.includes('CSP') || n.includes('ACEP') || n.includes('RCPP')) return { label: 'Conservation', color: 'bg-emerald-100 text-emerald-800' }
  if (n.includes('MFP') || n.includes('MARKET FACILITATION') || n.includes('TRADE')) return { label: 'Trade War', color: 'bg-red-100 text-red-800' }
  if (n.includes('CFAP') || n.includes('CORONAVIRUS') || n.includes('EMERGENCY') || n.includes('ERP') || n.includes('ELAP') || n.includes('LFP') || n.includes('LIP') || n.includes('TAP') || n.includes('NAP') || n.includes('WHIP')) return { label: 'Emergency', color: 'bg-orange-100 text-orange-800' }
  if (n.includes('DAIRY') || n.includes('DMC') || n.includes('MPP-DAIRY')) return { label: 'Dairy', color: 'bg-blue-100 text-blue-800' }
  if (n.includes('LIVESTOCK') || n.includes('LFP') || n.includes('LIP')) return { label: 'Livestock', color: 'bg-amber-100 text-amber-800' }
  if (n.includes('PLC') || n.includes('ARC') || n.includes('PRICE LOSS') || n.includes('AGRICULTURE RISK') || n.includes('COMMODITY') || n.includes('LOAN')) return { label: 'Commodity', color: 'bg-yellow-100 text-yellow-800' }
  return { label: 'Other', color: 'bg-gray-100 text-gray-800' }
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const programs = loadData('programs.json') as Program[]
  const states = loadData('states.json') as { abbr: string; name: string; topPrograms: { program: string; amount: number }[] }[]
  const program = programs.find(p => slugify(p.program) === slug)
  if (!program) notFound()

  const rank = programs.indexOf(program) + 1
  const pctOfTotal = ((program.amount / programs.reduce((s, p) => s + p.amount, 0)) * 100).toFixed(1)
  const category = getProgramCategory(program.program)

  // Find states with this program
  const statesWithProgram = states
    .map(s => {
      const match = s.topPrograms.find(tp => tp.program === program.program)
      return match ? { abbr: s.abbr, name: s.name, amount: match.amount } : null
    })
    .filter(Boolean)
    .sort((a, b) => b!.amount - a!.amount)
    .slice(0, 20) as { abbr: string; name: string; amount: number }[]

  // Load yearly trend for this program
  const programYearly = loadData('program-yearly.json') as ProgramYearly[]
  const thisYearly = programYearly.find(p => p.program === program.program)
  const yearly = thisYearly?.yearly || []
  const peakYear = yearly.length > 0 ? yearly.reduce((a, b) => a.amount > b.amount ? a : b) : null

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Programs', href: '/programs' }, { label: formatProgram(program.program) }]} />
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)]">{formatProgram(program.program)}</h1>
        <ShareButtons title={`${program.program}: ${fmtMoney(program.amount)} in farm subsidies`} />
      </div>
      <div className="flex items-center gap-3 mb-2">
        <p className="text-gray-600">USDA Program Code: {program.code} · Ranked #{rank} of {programs.length} programs</p>
        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${category.color}`}>{category.label}</span>
      </div>
      <div className="flex flex-wrap gap-3 text-sm mb-8">
        <Link href="/program-decoder" className="text-[#15803d] hover:underline">🔍 Program Decoder →</Link>
        <Link href="/categories" className="text-[#15803d] hover:underline">📂 All Categories →</Link>
      </div>

      {/* Quick Facts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-10">
        <h3 className="font-semibold text-gray-900 mb-3">⚡ Quick Facts</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><p className="text-sm text-gray-500">Total Amount</p><p className="text-xl font-bold text-[#15803d]">{fmtMoney(program.amount)}</p></div>
          <div><p className="text-sm text-gray-500">Total Payments</p><p className="text-xl font-bold text-[#15803d]">{fmt(program.payments)}</p></div>
          <div><p className="text-sm text-gray-500">States Served</p><p className="text-xl font-bold text-[#15803d]">{statesWithProgram.length}</p></div>
          <div><p className="text-sm text-gray-500">Program Rank</p><p className="text-xl font-bold text-[#15803d]">#{rank} <span className="text-sm font-normal text-gray-500">of {programs.length}</span></p></div>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg mb-8">
        <p className="font-semibold text-gray-900">💡 Key Insight</p>
        <p className="text-sm text-gray-700 mt-1">
          This program accounts for {pctOfTotal}% of all farm subsidies, averaging {fmtMoney(program.amount / program.payments)} per payment.
          {peakYear && ` Peak year: ${peakYear.year} (${fmtMoney(peakYear.amount)}).`}
          {statesWithProgram.length > 0 && ` Top state: ${statesWithProgram[0].name} (${fmtMoney(statesWithProgram[0].amount)}).`}
        </p>
      </div>

      {yearly.length > 1 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">Spending by Year</h2>
          <StateYearlyChart data={yearly} />
        </section>
      )}

      {statesWithProgram.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">Top States</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50"><tr><th className="px-4 py-3 text-left font-semibold">#</th><th className="px-4 py-3 text-left font-semibold">State</th><th className="px-4 py-3 text-right font-semibold">Amount</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {statesWithProgram.map((s, i) => (
                  <tr key={s.abbr} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-3"><a href={`/states/${s.abbr.toLowerCase()}`} className="text-primary hover:underline font-medium">{s.name}</a></td>
                    <td className="px-4 py-3 text-right font-mono">{fmtMoney(s.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Related Programs */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">Related Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {programs.filter(p => p.program !== program.program).slice(Math.max(0, rank - 2), Math.max(0, rank - 2) + 3).map(p => (
            <Link key={p.code} href={`/programs/${slugify(p.program)}`} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow border border-gray-100">
              <p className="font-medium text-sm text-gray-900 line-clamp-2">{formatProgram(p.program)}</p>
              <p className="text-primary font-bold mt-1">{fmtMoney(p.amount)}</p>
              <p className="text-xs text-gray-500">{fmt(p.payments)} payments</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3">📊 Why This Data Matters</h2>
        <p className="text-sm text-gray-700 mb-3">
          {formatProgram(program.program)} is ranked <strong>#{rank} out of {programs.length}</strong> USDA farm subsidy programs,
          accounting for {pctOfTotal}% of all farm subsidy spending from 2017 to 2025. With {fmt(program.payments)} individual payments
          totaling {fmtMoney(program.amount)}, the average payment was {fmtMoney(program.amount / program.payments)}.
          {yearly.length > 1 && ` Annual spending ranged from ${fmtMoney(Math.min(...yearly.map(y => y.amount)))} to ${fmtMoney(Math.max(...yearly.map(y => y.amount)))}.`}
        </p>
        {category.label === 'Emergency' && (
          <p className="text-sm text-gray-700 mb-3">
            As an <strong>emergency program</strong>, this represents the kind of ad-hoc spending that has increasingly dominated 
            farm subsidies since 2018. Unlike traditional programs authorized through the Farm Bill, emergency programs are 
            created in response to specific crises — making farm spending less predictable and more politically driven.
          </p>
        )}
        {category.label === 'Conservation' && (
          <p className="text-sm text-gray-700 mb-3">
            As a <strong>conservation program</strong>, this pays farmers to protect environmental resources rather than maximize 
            production. Conservation spending is often debated as either a wise investment in long-term land stewardship or 
            a payment for &quot;not farming&quot; — understanding the actual dollar amounts helps inform that debate.
          </p>
        )}
        {category.label === 'Trade War' && (
          <p className="text-sm text-gray-700 mb-3">
            This <strong>trade war-era program</strong> was created to compensate farmers for lost export revenue due to 
            retaliatory tariffs. These payments represented a new model: executive-branch emergency spending bypassing the 
            traditional Farm Bill process, setting precedents that shaped subsequent COVID and disaster spending.
          </p>
        )}
        {category.label === 'Commodity' && (
          <p className="text-sm text-gray-700 mb-3">
            As a <strong>commodity support program</strong>, this provides the backbone of traditional farm subsidies — 
            stabilizing income for producers of major crops like corn, soybeans, wheat, rice, and cotton. These programs 
            are authorized through the Farm Bill and represent the most politically entrenched category of farm spending.
          </p>
        )}
        <p className="text-sm text-gray-700">
          All data comes from USDA Farm Service Agency payment files (2017–2025).
          Compare with <Link href="/programs" className="text-primary hover:underline">all {programs.length} programs</Link>,
          explore <Link href="/trends" className="text-primary hover:underline">spending trends</Link>, or
          see <Link href="/categories" className="text-primary hover:underline">programs by category</Link>.
        </p>
      </section>
    </main>
  )
}
