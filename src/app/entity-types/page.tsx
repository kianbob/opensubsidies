import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { loadData } from '@/lib/server-utils'
import EntityTypesClient from './EntityTypesClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Who Gets Farm Subsidies? Individual Farmers vs Corporations vs Government',
  description: 'Breakdown of farm subsidy recipients by entity type: individuals, corporations, LLCs, partnerships, trusts, and government entities. Corporations collect disproportionate shares.',
  alternates: { canonical: 'https://www.opensubsidies.org/entity-types' },
}

export default function EntityTypesPage() {
  const data = loadData('entity-types.json')

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"Do corporations really receive farm subsidies?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Yes. Corporations and LLCs receive about 17.9% of all farm subsidy recipients but collect approximately 35.4% of total dollars — a disproportionate share compared to individual farmers.\"}},{\"@type\":\"Question\",\"name\":\"What types of entities receive USDA farm subsidies?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Farm subsidies go to individuals (64.5% of recipients), corporations/LLCs (17.9%), partnerships (8.4%), joint operations (4.7%), trusts/estates (2.5%), and government entities (1.1%).\"}},{\"@type\":\"Question\",\"name\":\"Why do government entities receive farm subsidies?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Government entities receiving subsidies typically include state conservation programs, tribal governments participating in USDA programs, and emergency disaster payments to public agricultural operations.\"}}]}" }} />
      <Breadcrumbs items={[{ label: 'Entity Types' }]} />

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Who Gets Farm Subsidies? Individual Farmers vs Corporations
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-lg text-gray-600">Not all farm subsidy recipients are family farmers. Here&apos;s the breakdown by entity type.</p>
          <ShareButtons title="Who Gets Farm Subsidies?" />
        </div>
      </div>

      <EntityTypesClient data={data} />

      <section className="mt-12 prose max-w-none text-gray-600">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Understanding Entity Types in Farm Subsidies</h2>
        <p>
          When the USDA distributes farm subsidies, payments go to various types of legal entities — not just individual farmers.
          Corporations, LLCs, partnerships, and trusts can all receive payments, often at significantly higher average amounts
          than individual recipients. This structure allows some operations to collect from multiple programs through related entities,
          effectively circumventing per-person payment limits.
        </p>
        <p>
          Government entities receiving farm subsidies may seem surprising, but these typically represent state-level conservation
          programs, tribal governments participating in USDA programs, or emergency disaster payments to public agricultural operations.
        </p>
        <p>
          For more on corporate recipients, see our analysis of <Link href="/analysis/corporate-farms" className="text-primary hover:underline">corporate farm subsidies</Link>.
          Browse all <Link href="/recipients" className="text-primary hover:underline">top recipients</Link> to see who collects the most.
        </p>
      </section>
    </div>
  )
}
