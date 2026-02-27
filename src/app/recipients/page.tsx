import { Metadata } from 'next'
import { loadData, fmt, fmtMoney } from '@/lib/utils'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Top Farm Subsidy Recipients | OpenSubsidies',
  description: 'Top 1,000 recipients of USDA farm subsidies ranked by total payments received.',
  alternates: { canonical: 'https://www.opensubsidies.us/recipients' },
}

export default function RecipientsPage() {
  const recipients = loadData('top-recipients.json') as { name: string; state: string; city: string; amount: number; payments: number; topPrograms: { program: string; amount: number }[] }[]

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Recipients' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Top Farm Subsidy Recipients</h1>
      <p className="text-gray-600 mb-8">Top {recipients.length.toLocaleString()} recipients ranked by total amount received.</p>

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
                <td className="py-2 pr-4 font-medium">{r.name}</td>
                <td className="py-2 pr-4 text-gray-600">{r.city}, {r.state}</td>
                <td className="py-2 pr-4 text-right tabular-nums font-medium">{fmtMoney(r.amount)}</td>
                <td className="py-2 text-xs text-gray-500">{r.topPrograms?.[0]?.program ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
