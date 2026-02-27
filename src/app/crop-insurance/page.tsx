import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crop Insurance Subsidies: The Hidden Half of Farm Support',
  description: 'Federal crop insurance adds $10-13 billion/year in subsidies beyond FSA payments. How crop insurance works, who benefits, and how it compares to direct farm subsidies.',
  alternates: { canonical: 'https://www.opensubsidies.org/crop-insurance' },
}

export default function CropInsurancePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Crop Insurance' }]} />
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)]">Crop Insurance: The Hidden Half of Farm Subsidies</h1>
        <ShareButtons title="Crop Insurance: The Hidden Half of Farm Subsidies" />
      </div>
      <p className="text-gray-600 mb-8">
        The $147 billion tracked by OpenSubsidies is only part of the story. Federal crop insurance adds another
        $10–13 billion per year in taxpayer-funded premium subsidies — a parallel system most people never see.
      </p>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-blue-50 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-blue-700">$10-13B</p>
          <p className="text-sm text-gray-600 mt-1">Annual crop insurance premium subsidies</p>
        </div>
        <div className="bg-green-50 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-green-700">$147B</p>
          <p className="text-sm text-gray-600 mt-1">FSA direct payments (our data)</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-amber-700">120+</p>
          <p className="text-sm text-gray-600 mt-1">Crops covered by federal insurance</p>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-8">
        <p className="font-semibold text-gray-900">📋 Transparency Note</p>
        <p className="text-sm text-gray-700 mt-1">
          OpenSubsidies tracks <strong>FSA (Farm Service Agency) direct payments</strong> — the $147 billion in
          commodity support, conservation, disaster relief, and trade war payments. Crop insurance premium subsidies
          are administered by a different agency (USDA Risk Management Agency) and are <strong>not included</strong> in
          our database. We present this page for complete transparency about what our data does and doesn&apos;t cover.
        </p>
      </div>

      <div className="prose max-w-none text-gray-700">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">What Is Federal Crop Insurance?</h2>
        <p>
          The <strong>Federal Crop Insurance Corporation (FCIC)</strong>, created during the Great Depression in 1938,
          provides subsidized insurance policies to farmers through private insurance companies. The government pays
          approximately <strong>60% of insurance premiums</strong> on behalf of farmers, plus administrative and
          operating costs to insurance companies.
        </p>
        <p>
          In 2024, total crop insurance premiums were <strong>$17.3 billion</strong>, of which the federal government
          subsidized approximately <strong>$10.5 billion</strong>. When a crop is damaged by drought, flood, hail,
          or other covered events, farmers receive indemnity payments from their insurance policies.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">How Crop Insurance Differs from FSA Payments</h2>
        <table className="w-full text-sm border border-gray-200 my-6">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left font-semibold border-b">Feature</th>
              <th className="p-3 text-left font-semibold border-b">FSA Payments (Our Data)</th>
              <th className="p-3 text-left font-semibold border-b">Crop Insurance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr><td className="p-3 font-medium">Agency</td><td className="p-3">Farm Service Agency</td><td className="p-3">Risk Management Agency</td></tr>
            <tr><td className="p-3 font-medium">Annual Cost</td><td className="p-3">$6–39B (varies wildly)</td><td className="p-3">$10–13B (more stable)</td></tr>
            <tr><td className="p-3 font-medium">Payment Type</td><td className="p-3">Direct payments to farmers</td><td className="p-3">Premium subsidies + indemnities</td></tr>
            <tr><td className="p-3 font-medium">Recipient Transparency</td><td className="p-3">Names publicly available</td><td className="p-3">Individual names often hidden</td></tr>
            <tr><td className="p-3 font-medium">Programs</td><td className="p-3">157 programs (CRP, PLC, ARC, etc.)</td><td className="p-3">Revenue Protection, Yield Protection, etc.</td></tr>
            <tr><td className="p-3 font-medium">Crops Covered</td><td className="p-3">Primarily corn, wheat, soybeans, cotton, rice</td><td className="p-3">120+ commodities</td></tr>
            <tr><td className="p-3 font-medium">Our Coverage</td><td className="p-3"><strong>✅ Fully tracked</strong></td><td className="p-3">❌ Not included</td></tr>
          </tbody>
        </table>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">The Full Picture of Farm Support</h2>
        <p>
          When you add crop insurance subsidies to FSA direct payments, the true cost of federal farm support is significantly
          higher than either number alone. In a typical year:
        </p>
        <ul>
          <li><strong>FSA direct payments:</strong> $6–17 billion (baseline years) or $20–39 billion (crisis years)</li>
          <li><strong>Crop insurance premium subsidies:</strong> $10–13 billion</li>
          <li><strong>Crop insurance company A&O subsidies:</strong> $1–2 billion</li>
          <li><strong>Total federal farm support:</strong> approximately $20–50+ billion per year</li>
        </ul>
        <p>
          The 2020 peak year saw approximately <strong>$55 billion</strong> in total farm support when combining our
          $38.7 billion in FSA payments with crop insurance subsidies and indemnities.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Most Subsidized Crops</h2>
        <p>
          In 2024, farm subsidies (both FSA and crop insurance) disproportionately supported a handful of commodity crops:
        </p>
        <ul>
          <li><strong>Corn:</strong> $3.2 billion in FSA subsidies (30.5% of total) + largest crop insurance coverage</li>
          <li><strong>Soybeans:</strong> $1.9 billion in FSA subsidies (17.9%)</li>
          <li><strong>Cotton:</strong> Major recipient of both PLC payments and crop insurance</li>
          <li><strong>Wheat:</strong> Significant PLC and ARC coverage</li>
          <li><strong>Rice:</strong> Among the most subsidized per acre</li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Why This Matters</h2>
        <p>
          Understanding the full scope of farm support requires looking at <em>both</em> FSA direct payments and crop
          insurance. Policy debates about farm subsidy reform often focus on one while ignoring the other. Our FSA
          database — with named recipients, county-level detail, and 9 years of data — provides the most transparent
          view of direct farm payments available. For crop insurance data,{' '}
          <a href="https://www.rma.usda.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            USDA&apos;s Risk Management Agency
          </a>{' '}
          publishes summary-level data by state, crop, and cause of loss.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Explore Our Data</h2>
        <ul>
          <li><Link href="/programs" className="text-primary hover:underline">Browse all 157 FSA programs</Link></li>
          <li><Link href="/categories" className="text-primary hover:underline">Programs by category</Link></li>
          <li><Link href="/analysis/conservation-vs-commodity" className="text-primary hover:underline">Conservation vs. Commodity spending</Link></li>
          <li><Link href="/farm-subsidies-explained" className="text-primary hover:underline">Farm Subsidies Explained</Link></li>
          <li><Link href="/farm-bill" className="text-primary hover:underline">The Farm Bill: Complete Guide</Link></li>
          <li><Link href="/entity-types" className="text-primary hover:underline">Who Gets Farm Subsidies?</Link></li>
          <li><Link href="/dashboard" className="text-primary hover:underline">Interactive Dashboard</Link></li>
        </ul>
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How much does the government spend on crop insurance?',
                acceptedAnswer: { '@type': 'Answer', text: 'The federal government spends approximately $10-13 billion per year on crop insurance premium subsidies, covering about 60% of farmers\' insurance premiums. This is separate from the $147 billion in FSA direct payments tracked by OpenSubsidies.' },
              },
              {
                '@type': 'Question',
                name: 'What is the difference between farm subsidies and crop insurance?',
                acceptedAnswer: { '@type': 'Answer', text: 'Farm subsidies (FSA payments) are direct payments to farmers for conservation, commodity support, and disaster relief. Crop insurance subsidies pay part of farmers\' insurance premiums through private insurance companies. Both are taxpayer-funded but administered by different USDA agencies.' },
              },
              {
                '@type': 'Question',
                name: 'Are crop insurance recipients public?',
                acceptedAnswer: { '@type': 'Answer', text: 'Unlike FSA payment recipients, individual crop insurance policyholder names are generally not publicly disclosed. The USDA publishes summary data by state, crop, and county, but not individual recipient names — a transparency gap that advocacy groups like EWG have criticized.' },
              },
              {
                '@type': 'Question',
                name: 'What crops are most subsidized?',
                acceptedAnswer: { '@type': 'Answer', text: 'Corn receives the most subsidies ($3.2 billion in 2024, 30.5% of total), followed by soybeans ($1.9 billion, 17.9%). Cotton, wheat, and pastureland round out the top five. These five categories account for about 74% of all farm subsidy dollars.' },
              },
            ],
          }),
        }}
      />
    </div>
  )
}
