import { fmtMoney, fmt, slugify, formatProgram } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Program Categories — Farm Subsidy Programs by Type',
  description: 'Browse 157 USDA farm subsidy programs organized by category: Conservation, Disaster/Emergency, Commodity, Loans, and more.',
}

type Program = { program: string; code: string; payments: number; amount: number }

function categorize(programs: Program[]) {
  const categories: Record<string, { label: string; description: string; emoji: string; programs: Program[] }> = {
    conservation: { label: 'Conservation', description: 'Programs that pay farmers to protect land, water, and wildlife habitat.', emoji: '🌿', programs: [] },
    disaster: { label: 'Disaster & Emergency', description: 'Emergency payments for natural disasters, livestock losses, and crop failures.', emoji: '🌪️', programs: [] },
    commodity: { label: 'Commodity Support', description: 'Price supports and revenue protection for major commodity crops.', emoji: '🌾', programs: [] },
    loans: { label: 'Loans & Interest', description: 'Marketing assistance loans and interest-related payments.', emoji: '🏦', programs: [] },
    other: { label: 'Other Programs', description: 'Specialty programs, administrative payments, and other categories.', emoji: '📋', programs: [] },
  }

  for (const p of programs) {
    const name = p.program.toUpperCase()
    if (/CRP|ACEP|CSP|CONSERVATION|WETLAND|EQIP/.test(name)) categories.conservation.programs.push(p)
    else if (/EMERGENCY|DISASTER|RELIEF|ELAP|CFAP|LIVESTOCK FORAGE|LFP|LIP|EMER/.test(name)) categories.disaster.programs.push(p)
    else if (/ARC[\s-]|PLC|PRICE LOSS|RISK COVERAGE|LOAN DEFICIENCY|COUNTER.?CYCL|MFP|MARKET FAC/.test(name)) categories.commodity.programs.push(p)
    else if (/LOAN|INTEREST/.test(name)) categories.loans.programs.push(p)
    else categories.other.programs.push(p)
  }

  return Object.entries(categories).filter(([, cat]) => cat.programs.length > 0).map(([key, cat]) => ({
    key,
    ...cat,
    totalAmount: cat.programs.reduce((s, p) => s + p.amount, 0),
    totalPayments: cat.programs.reduce((s, p) => s + p.payments, 0),
    programs: cat.programs.sort((a, b) => b.amount - a.amount),
  })).sort((a, b) => b.totalAmount - a.totalAmount)
}

export default function CategoriesPage() {
  const programs = loadData('programs.json') as Program[]
  const cats = categorize(programs)

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Categories' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Program Categories</h1>
      <p className="text-gray-600 mb-8">157 USDA farm subsidy programs organized into {cats.length} categories by purpose and type.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {cats.map(c => (
          <a key={c.key} href={`#${c.key}`} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow border-t-4 border-primary">
            <div className="text-2xl mb-2">{c.emoji}</div>
            <h2 className="text-lg font-bold text-gray-900">{c.label}</h2>
            <p className="text-sm text-gray-500 mt-1">{c.programs.length} programs</p>
            <p className="text-xl font-bold text-primary mt-2">{fmtMoney(c.totalAmount)}</p>
            <p className="text-xs text-gray-500">{fmt(c.totalPayments)} payments</p>
          </a>
        ))}
      </div>

      {cats.map(c => (
        <section key={c.key} id={c.key} className="mb-10">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-1 flex items-center gap-2">
            <span>{c.emoji}</span> {c.label}
          </h2>
          <p className="text-gray-600 text-sm mb-4">{c.description}</p>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Program</th>
                  <th className="px-4 py-3 text-right font-semibold">Total Amount</th>
                  <th className="px-4 py-3 text-right font-semibold hidden sm:table-cell">Payments</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {c.programs.map((p, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Link href={`/programs/${slugify(p.program)}`} className="text-primary hover:underline font-medium">
                        {formatProgram(p.program)}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-right font-mono">{fmtMoney(p.amount)}</td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell">{fmt(p.payments)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">Explore More</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { href: '/program-decoder', title: 'Program Decoder', desc: 'Look up any USDA program code and see what it means.' },
            { href: '/programs', title: 'All Programs', desc: 'Browse all 157 USDA farm subsidy programs.' },
            { href: '/analysis/conservation-vs-commodity', title: 'Conservation vs. Commodity', desc: 'How conservation spending compares to commodity support.' },
            { href: '/analysis/program-proliferation', title: 'Program Proliferation', desc: 'Why the number of farm subsidy programs keeps growing.' },
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
