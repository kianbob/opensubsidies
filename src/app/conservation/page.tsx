import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conservation Programs: CRP, ACEP, and Farm Conservation Subsidies',
  description: 'How much goes to conservation vs commodity vs emergency farm programs? Explore CRP, ACEP, and other conservation subsidies with real USDA data.',
  alternates: { canonical: 'https://www.opensubsidies.us/conservation' },
}

export default function ConservationPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Conservation Programs' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Conservation Programs: Where Farm Subsidies Meet Environmental Protection</h1>
      <p className="text-gray-600 mb-8">
        Conservation programs are the often-overlooked side of farm subsidies. While commodity and emergency programs make headlines, conservation spending quietly protects millions of acres of sensitive land.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 text-center">
          <p className="text-3xl font-bold text-green-600">$15.7B</p>
          <p className="text-sm text-gray-500 mt-1">CRP Annual Rental</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 text-center">
          <p className="text-3xl font-bold text-blue-600">$14.2B</p>
          <p className="text-sm text-gray-500 mt-1">Price Loss Coverage</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 text-center">
          <p className="text-3xl font-bold text-red-600">$14.2B</p>
          <p className="text-sm text-gray-500 mt-1">CFAP (COVID Relief)</p>
        </div>
      </div>

      <div className="prose max-w-none text-gray-700">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Conservation Reserve Program (CRP) — The Largest Farm Program</h2>
        <p>
          The <strong>Conservation Reserve Program (CRP)</strong> is not just the largest conservation program — it&apos;s the <strong>single largest farm subsidy program</strong> in the USDA&apos;s portfolio at <strong>$15.7 billion</strong> across 6.3 million payments since 2017.
        </p>
        <p>
          CRP pays landowners an annual rental payment to voluntarily remove environmentally sensitive cropland from production for 10-15 year contracts. In return, farmers plant conservation cover — native grasses, trees, or riparian buffers — that reduces soil erosion, improves water quality, and provides wildlife habitat.
        </p>
        <p>
          CRP payments are remarkably consistent year to year, averaging approximately <strong>$1.75 billion annually</strong>:
        </p>
        <ul>
          <li>2017: $1.77B</li>
          <li>2018: $1.81B</li>
          <li>2019: $1.79B</li>
          <li>2020: $1.77B</li>
          <li>2021: $1.47B (dip during re-enrollment)</li>
          <li>2022: $1.75B</li>
          <li>2023: $1.75B</li>
          <li>2024: $1.79B</li>
          <li>2025: $1.81B</li>
        </ul>
        <p>
          This stability stands in stark contrast to commodity and emergency programs, which can swing by billions from year to year. For a deep dive, see our <Link href="/analysis/crp-conservation" className="text-primary hover:underline">CRP conservation analysis</Link>.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Which States Benefit Most from CRP?</h2>
        <p>
          CRP payments are concentrated in the Great Plains and Midwest, where large tracts of marginal cropland are enrolled:
        </p>
        <ul>
          <li><strong>Iowa</strong> — $3.15B (the largest CRP state)</li>
          <li><strong>Illinois</strong> — $1.46B</li>
          <li><strong>Minnesota</strong> — $1.17B</li>
          <li><strong>South Dakota</strong> — $914M</li>
          <li><strong>Missouri</strong> — $867M</li>
          <li><strong>Texas</strong> — $847M</li>
          <li><strong>Nebraska</strong> — $682M</li>
          <li><strong>Kansas</strong> — $669M</li>
          <li><strong>Washington</strong> — $570M</li>
          <li><strong>Colorado</strong> — $535M</li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Other Conservation Programs</h2>

        <h3 className="font-[family-name:var(--font-heading)] text-gray-900">Emergency Conservation Program (ECP)</h3>
        <p>
          ECP provides emergency funding to rehabilitate farmland damaged by natural disasters. This includes cost-sharing for debris removal, fence restoration, and water infrastructure repair. Total ECP spending: <strong>$367M+ (ECPCOF) plus $192M (FY2018)</strong>.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-gray-900">CRP Cost-Share</h3>
        <p>
          Beyond annual rental payments, CRP provides cost-share assistance for establishing conservation cover. This includes $182M in web-based cost-share payments and additional funds for specific practices like tree planting, forest management, and riparian buffers.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-gray-900">Grasslands Reserve Program</h3>
        <p>
          The Grasslands Reserve Program protects grassland ecosystems through easements and rental agreements, distributing $58.6M to keep native grasslands intact.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-gray-900">Emergency Forestry Restoration</h3>
        <p>
          The Emergency Forestry Restoration Program (EFRP) provides cost-share payments to restore privately held forests damaged by natural disasters, with $11.2M in recent spending.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Conservation vs. Commodity vs. Emergency</h2>
        <p>
          How does conservation spending compare to other categories? Here&apos;s an approximate breakdown of the $147.3B total:
        </p>
        <ul>
          <li><strong>Conservation programs</strong>: ~$17B (12%) — CRP, ECP, Grasslands, Forestry</li>
          <li><strong>Commodity programs</strong>: ~$23B (16%) — PLC, ARC, dairy programs</li>
          <li><strong>Emergency/disaster</strong>: ~$22B (15%) — LFP, ELAP, ERP, WHIP</li>
          <li><strong>Trade war (MFP)</strong>: ~$22B (15%) — One-time trade compensation</li>
          <li><strong>COVID (CFAP)</strong>: ~$25B (17%) — Pandemic relief</li>
          <li><strong>Other</strong>: ~$38B (25%) — Supplemental disaster, specialty crops, other</li>
        </ul>
        <p>
          Conservation programs provide remarkably consistent spending year after year, making them the backbone of farm subsidy spending even as emergency programs spike and recede.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">The Environmental Impact</h2>
        <p>
          CRP alone has enrolled over 20 million acres of land in conservation practices. According to the USDA, this has:
        </p>
        <ul>
          <li>Reduced soil erosion by hundreds of millions of tons</li>
          <li>Sequestered carbon equivalent to taking millions of cars off the road</li>
          <li>Restored habitat for pollinator species and grassland birds</li>
          <li>Improved water quality in watersheds across the Midwest</li>
          <li>Created riparian buffers that filter runoff before it reaches waterways</li>
        </ul>
        <p>
          Critics argue that CRP payments could be higher and that more acreage should be enrolled, especially as climate change increases the value of conservation practices.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Explore More</h2>
        <ul>
          <li><Link href="/analysis/crp-conservation" className="text-primary hover:underline">CRP Conservation Analysis</Link></li>
          <li><Link href="/analysis/conservation-vs-commodity" className="text-primary hover:underline">Conservation vs. Commodity Analysis</Link></li>
          <li><Link href="/categories" className="text-primary hover:underline">Program Categories</Link></li>
          <li><Link href="/programs" className="text-primary hover:underline">All Programs</Link></li>
          <li><Link href="/facts" className="text-primary hover:underline">25 Farm Subsidy Facts</Link></li>
        </ul>
      </div>
    </div>
  )
}
