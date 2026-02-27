import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { loadData, fmt, fmtMoney, slugify } from '@/lib/utils'
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
    title: `${program.program} — ${fmtMoney(program.amount)} in Farm Subsidies`,
    description: `The ${program.program} distributed ${fmtMoney(program.amount)} across ${fmt(program.payments)} payments from 2017-2025.`,
    alternates: { canonical: `https://www.opensubsidies.us/programs/${slug}` },
  }
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const programs = loadData('programs.json') as Program[]
  const states = loadData('states.json') as { abbr: string; name: string; topPrograms: { program: string; amount: number }[] }[]
  const program = programs.find(p => slugify(p.program) === slug)
  if (!program) notFound()

  const rank = programs.indexOf(program) + 1
  const pctOfTotal = ((program.amount / programs.reduce((s, p) => s + p.amount, 0)) * 100).toFixed(1)

  // Load yearly trend for this program
  const programYearly = loadData('program-yearly.json') as ProgramYearly[]
  const thisYearly = programYearly.find(p => p.program === program.program)
  const yearly = thisYearly?.yearly || []
  const peakYear = yearly.length > 0 ? yearly.reduce((a, b) => a.amount > b.amount ? a : b) : null

  // Find states with this program
  const statesWithProgram = states
    .map(s => {
      const match = s.topPrograms.find(tp => tp.program === program.program)
      return match ? { abbr: s.abbr, name: s.name, amount: match.amount } : null
    })
    .filter(Boolean)
    .sort((a, b) => b!.amount - a!.amount)
    .slice(0, 20) as { abbr: string; name: string; amount: number }[]

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Programs', href: '/programs' }, { label: program.program }]} />
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)]">{program.program}</h1>
        <ShareButtons title={`${program.program}: ${fmtMoney(program.amount)} in farm subsidies`} />
      </div>
      <p className="text-gray-600 mb-8">USDA Program Code: {program.code} · Ranked #{rank} of {programs.length} programs</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-green-50 rounded-xl p-4"><p className="text-sm text-gray-500">Total Distributed</p><p className="text-xl font-bold text-green-800">{fmtMoney(program.amount)}</p></div>
        <div className="bg-green-50 rounded-xl p-4"><p className="text-sm text-gray-500">Total Payments</p><p className="text-xl font-bold text-green-800">{fmt(program.payments)}</p></div>
        <div className="bg-green-50 rounded-xl p-4"><p className="text-sm text-gray-500">% of All Subsidies</p><p className="text-xl font-bold text-green-800">{pctOfTotal}%</p></div>
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
              <p className="font-medium text-sm text-gray-900 line-clamp-2">{p.program}</p>
              <p className="text-primary font-bold mt-1">{fmtMoney(p.amount)}</p>
              <p className="text-xs text-gray-500">{fmt(p.payments)} payments</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="prose max-w-none text-gray-600">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">About This Program</h2>
        <p>
          The {program.program} (code {program.code}) distributed {fmtMoney(program.amount)} in {fmt(program.payments)} payments
          from 2017 to 2025, ranking #{rank} out of {programs.length} total USDA FSA programs.
          {yearly.length > 1 && ` Spending ranged from ${fmtMoney(Math.min(...yearly.map(y => y.amount)))} to ${fmtMoney(Math.max(...yearly.map(y => y.amount)))} per year.`}
        </p>
        <p>
          All data comes from publicly available USDA Farm Service Agency payment files.
          Explore <Link href="/programs" className="text-primary hover:underline">all {programs.length} programs</Link>,
          see <Link href="/trends" className="text-primary hover:underline">spending trends</Link>, or
          check <Link href="/categories" className="text-primary hover:underline">program categories</Link>.
        </p>
      </section>
    </main>
  )
}
