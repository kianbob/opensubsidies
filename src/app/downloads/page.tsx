import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Download Farm Subsidy Data — Free JSON Datasets',
  description: 'Download free JSON datasets of U.S. farm subsidy payments by state, county, program, and recipient.',
}

const datasets = [
  { name: 'stats.json', desc: 'Summary statistics: total payments, amounts, counts', size: '1 KB' },
  { name: 'states.json', desc: 'All 59 states/territories with subsidy totals and top programs', size: '40 KB' },
  { name: 'counties.json', desc: 'Top 5,000 counties by subsidy amount with FIPS codes', size: '527 KB' },
  { name: 'county-index.json', desc: 'Top 500 counties index for detailed county pages', size: '45 KB' },
  { name: 'programs.json', desc: 'All 157 USDA farm subsidy programs with totals', size: '14 KB' },
  { name: 'program-yearly.json', desc: 'Top 50 programs with yearly spending trends', size: '18 KB' },
  { name: 'yearly.json', desc: 'Yearly payment totals (program years 2000-2025)', size: '2 KB' },
  { name: 'state-yearly.json', desc: 'State-by-year payment totals for trend analysis', size: '82 KB' },
  { name: 'top-recipients.json', desc: 'Top 2,000 subsidy recipients with amounts and programs', size: '771 KB' },
]

export default function DownloadsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Downloads' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Download Farm Subsidy Data</h1>
      <p className="text-gray-600 mb-8">
        All data is free to download and use. Processed from USDA Farm Service Agency payment files (2017-2025).
        JSON format, ready for analysis.
      </p>

      <div className="space-y-4">
        {datasets.map(d => (
          <a key={d.name} href={`/data/${d.name}`} download className="flex items-center justify-between bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-200">
            <div>
              <h3 className="font-semibold text-gray-900">{d.name}</h3>
              <p className="text-sm text-gray-600">{d.desc}</p>
            </div>
            <div className="text-right flex-shrink-0 ml-4">
              <span className="text-sm text-gray-500">{d.size}</span>
              <div className="text-primary font-medium text-sm mt-1">Download →</div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-10 bg-gray-50 rounded-lg p-6 border">
        <h2 className="font-semibold text-gray-900 mb-2">Data Source</h2>
        <p className="text-sm text-gray-600">
          All data is derived from USDA Farm Service Agency (FSA) payment files, publicly available at{' '}
          <a href="https://www.fsa.usda.gov/tools/informational/freedom-information-act-foia/electronic-reading-room/frequently-requested/payment-files" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            fsa.usda.gov
          </a>. We processed 83 Excel files covering 2017-2025 into these JSON datasets.
        </p>
        <h3 className="font-semibold text-gray-900 mt-4 mb-1">License</h3>
        <p className="text-sm text-gray-600">
          This data is derived from U.S. government public records and is in the public domain.
          You are free to use it for any purpose.
        </p>
      </div>
    </div>
  )
}
