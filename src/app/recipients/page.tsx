import { Metadata } from 'next'
import Link from 'next/link'
import { loadData, fmt, fmtMoney, formatProgram, titleCase, slugify } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Top 2,000 Farm Subsidy Recipients — Who Gets the Most?',
  description: 'The top 2,000 recipients of USDA farm subsidies collected billions in taxpayer dollars from 2017-2025. See every name, location, and amount.',
  alternates: { canonical: 'https://www.opensubsidies.us/recipients' },
}

export default function RecipientsPage() {
  const recipients = loadData('top-recipients.json') as { name: string; state: string; city: string; amount: number; payments: number; topPrograms: { program: string; amount: number }[] }[]
  const totalTop1000 = recipients.reduce((s, r) => s + r.amount, 0)
  const avgPayment = totalTop1000 / recipients.reduce((s, r) => s + r.payments, 0)

  // Count by state
  const stateCounts: Record<string, number> = {}
  recipients.forEach(r => { stateCounts[r.state] = (stateCounts[r.state] || 0) + 1 })
  const topStates = Object.entries(stateCounts).sort((a, b) => b[1] - a[1]).slice(0, 5)

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Recipients' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Top Farm Subsidy Recipients</h1>
      <p className="text-gray-600 mb-6">The top {recipients.length.toLocaleString()} recipients of USDA farm subsidies from 2017 to 2025, ranked by total amount.</p>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 rounded-xl p-4"><p className="text-sm text-gray-500">Top Recipients Total</p><p className="text-xl font-bold text-green-800">{fmtMoney(totalTop1000)}</p></div>
        <div className="bg-green-50 rounded-xl p-4"><p className="text-sm text-gray-500">#1 Recipient</p><p className="text-xl font-bold text-green-800">{fmtMoney(recipients[0]?.amount)}</p></div>
        <div className="bg-green-50 rounded-xl p-4"><p className="text-sm text-gray-500">Avg per Payment</p><p className="text-xl font-bold text-green-800">{fmtMoney(avgPayment)}</p></div>
        <div className="bg-green-50 rounded-xl p-4"><p className="text-sm text-gray-500">States Represented</p><p className="text-xl font-bold text-green-800">{Object.keys(stateCounts).length}</p></div>
      </div>

      {/* Key Insight */}
      <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg mb-8">
        <p className="font-semibold text-gray-900">💡 Key Insight</p>
        <p className="text-sm text-gray-700 mt-1">
          The top recipient, {recipients[0]?.name} ({recipients[0]?.city}, {recipients[0]?.state}), collected {fmtMoney(recipients[0]?.amount)} — 
          more than {fmtMoney(recipients[0]?.amount - recipients[recipients.length - 1]?.amount)} above the lowest ranked recipient.
          {topStates[0] && ` ${topStates[0][0]} leads with ${topStates[0][1]} recipients in the top 2,000.`}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-green-700 text-left">
              <th className="py-2 pr-4">#</th>
              <th className="py-2 pr-4">Recipient</th>
              <th className="py-2 pr-4">Location</th>
              <th className="py-2 pr-4 text-right">Amount</th>
              <th className="py-2">Top Program</th>
            </tr>
          </thead>
          <tbody>
            {recipients.map((r, i) => (
              <tr key={i} className="border-b border-gray-200 hover:bg-green-50">
                <td className="py-2 pr-4 text-gray-500">{i + 1}</td>
                <td className="py-2 pr-4 font-medium"><Link href={`/recipients/${slugify(`${r.name}-${r.city}-${r.state}`)}`} className="text-green-700 hover:underline">{titleCase(r.name)}</Link></td>
                <td className="py-2 pr-4 text-gray-600">{titleCase(r.city)}, {r.state}</td>
                <td className="py-2 pr-4 text-right tabular-nums font-medium">{fmtMoney(r.amount)}</td>
                <td className="py-2 text-xs text-gray-500">{formatProgram(r.topPrograms?.[0]?.program ?? '—')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SEO Content */}
      <section className="mt-10 prose max-w-none text-gray-600">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">About Farm Subsidy Recipients</h2>
        <p>
          The USDA Farm Service Agency distributes subsidy payments to individual farmers, partnerships, corporations,
          and other entities. Payment limits technically cap most commodity payments at $125,000 per person per year,
          but through entity structures and family attribution rules, many operations receive far more.
        </p>
        <p>
          This data comes from publicly available USDA FSA payment files covering 2017-2025. All recipient names
          and payment amounts are public records. See our <Link href="/analysis/corporate-farms" className="text-primary hover:underline">analysis of corporate recipients</Link> for
          more context on how payment limits work in practice.
        </p>
      </section>
    </main>
  )
}
