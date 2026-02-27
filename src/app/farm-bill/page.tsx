import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What is the Farm Bill? Complete Guide to Farm Legislation',
  description: 'The Farm Bill is omnibus legislation reauthorized every ~5 years governing farm subsidies, nutrition (SNAP), conservation, crop insurance, and more. Currently on extension of the 2018 Farm Bill.',
  alternates: { canonical: 'https://www.opensubsidies.org/farm-bill' },
}

const timeline = [
  { year: '1933', title: 'Agricultural Adjustment Act', desc: 'FDR\'s New Deal creates first federal farm subsidies to combat the Great Depression.' },
  { year: '1938', title: 'Second AAA', desc: 'Permanent price supports and crop insurance established.' },
  { year: '1949', title: 'Agricultural Act', desc: 'Becomes the default law if a new Farm Bill isn\'t passed — still technically in force.' },
  { year: '1973', title: 'Target Prices', desc: 'Shift from supply management to deficiency payments based on target prices.' },
  { year: '1996', title: 'Freedom to Farm', desc: 'Decoupled payments from production. Promised to phase out subsidies (it didn\'t).' },
  { year: '2002', title: 'Farm Security Act', desc: 'Reversed 1996 reforms, added counter-cyclical payments.' },
  { year: '2008', title: 'Food, Conservation & Energy Act', desc: 'Expanded conservation and nutrition programs.' },
  { year: '2014', title: 'Agricultural Act', desc: 'Eliminated direct payments, created ARC and PLC programs.' },
  { year: '2018', title: 'Agriculture Improvement Act', desc: 'Current law (on extension). Legalized hemp, expanded CRP, maintained ARC/PLC.' },
  { year: '2025', title: 'Under Debate', desc: 'New Farm Bill being negotiated. Key issues: SNAP funding, conservation, climate, payment limits.' },
]

const titles = [
  { num: 'I', name: 'Commodities', desc: 'Price Loss Coverage (PLC) and Agriculture Risk Coverage (ARC) for major crops. The core subsidy programs.', link: '/programs' },
  { num: 'II', name: 'Conservation', desc: 'CRP, EQIP, CSP, and ACEP — paying farmers to protect soil, water, and habitat.', link: '/conservation' },
  { num: 'IV', name: 'Nutrition (SNAP)', desc: 'The largest title by spending (~80% of Farm Bill cost). Supplemental Nutrition Assistance Program.', link: null },
  { num: 'X', name: 'Horticulture', desc: 'Specialty crops, organic certification, farmers markets, and local food programs.', link: '/categories' },
  { num: 'XI', name: 'Crop Insurance', desc: 'Federal crop insurance subsidies — premiums subsidized at ~60%. A $17B+ annual program.', link: '/programs' },
  { num: 'XII', name: 'Miscellaneous', desc: 'Research, rural development, trade, energy, and everything else.', link: null },
]

const faqs = [
  { q: 'What is the Farm Bill?', a: 'The Farm Bill is omnibus legislation passed by Congress roughly every 5 years. It sets policy for farm subsidies, nutrition programs (SNAP), conservation, crop insurance, trade, and rural development. The current law is the 2018 Agriculture Improvement Act, operating on extension.' },
  { q: 'How much does the Farm Bill cost?', a: 'The 2018 Farm Bill authorized about $428 billion over 5 years, though ~80% goes to nutrition programs (SNAP). The farm subsidy portion tracked by OpenSubsidies totals $147 billion over 9 years (2017-2025) from FSA payment data.' },
  { q: 'Why hasn\'t a new Farm Bill been passed?', a: 'The 2018 Farm Bill expired in September 2023 and has been operating on extension. Disagreements over SNAP funding levels, conservation vs. commodity spending, climate provisions, and payment limits have stalled reauthorization.' },
  { q: 'Who benefits from the Farm Bill?', a: 'While the nutrition title benefits ~42 million SNAP recipients, the farm subsidy titles primarily benefit larger agricultural operations. Our data shows the top 10% of recipients collect ~70% of all payments.' },
  { q: 'What happens if the Farm Bill expires?', a: 'If the Farm Bill expires without extension, policy reverts to the Agricultural Act of 1949 — which would set dairy prices at roughly double current levels and wheat at 1949 parity prices. This "dairy cliff" threat typically motivates Congress to act.' },
  { q: 'How are farm subsidies different from crop insurance?', a: 'Direct farm subsidies (ARC, PLC, CRP) are payments from the USDA. Crop insurance is technically separate — run through private companies with federal premium subsidies of ~60%. Both are authorized in the Farm Bill but funded differently.' },
]

export default function FarmBillPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Farm Bill' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question', name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      })}} />

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          What is the Farm Bill? Complete Guide to Farm Legislation
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-lg text-gray-600">How a single piece of legislation controls $147 billion in farm subsidies, feeds 42 million Americans, and shapes the future of agriculture.</p>
          <ShareButtons title="What is the Farm Bill?" />
        </div>
      </div>

      <div className="prose max-w-none">
        <p>
          The <strong>Farm Bill</strong> is the most important piece of agricultural legislation in the United States.
          Reauthorized by Congress roughly every five years, it sets policy for everything from commodity price supports
          and conservation programs to the Supplemental Nutrition Assistance Program (SNAP) that feeds 42 million Americans.
        </p>
        <p>
          The current law — the <strong>2018 Agriculture Improvement Act</strong> — expired in September 2023 and is operating
          on extension while Congress debates a replacement. OpenSubsidies tracks <Link href="/programs" className="text-primary font-medium hover:underline">157 FSA programs</Link> that
          distributed <strong>$147 billion</strong> across 9 years (2017–2025), all authorized under the Farm Bill.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Key Titles of the Farm Bill</h2>
        <div className="not-prose grid gap-4 my-6">
          {titles.map(t => (
            <div key={t.num} className="bg-gray-50 rounded-lg p-5 border-l-4 border-primary">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-bold bg-primary text-white px-2 py-0.5 rounded">Title {t.num}</span>
                <h3 className="text-lg font-bold text-gray-900">{t.name}</h3>
              </div>
              <p className="text-sm text-gray-600">{t.desc}</p>
              {t.link && <Link href={t.link} className="text-primary text-sm font-medium hover:underline mt-1 inline-block">Explore data →</Link>}
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Farm Bill History: 1933 to Today</h2>
        <div className="not-prose my-6">
          <div className="relative border-l-2 border-primary ml-4">
            {timeline.map(t => (
              <div key={t.year} className="mb-6 ml-6 relative">
                <div className="absolute -left-[33px] w-4 h-4 bg-primary rounded-full border-2 border-white"></div>
                <span className="text-sm font-bold text-primary">{t.year}</span>
                <h3 className="text-base font-bold text-gray-900">{t.title}</h3>
                <p className="text-sm text-gray-600">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">How Farm Bill Programs Connect to Our Data</h2>
        <p>
          OpenSubsidies tracks $147 billion in USDA Farm Service Agency payments — the direct subsidy programs
          authorized by the Farm Bill. Here&apos;s how our data connects:
        </p>
        <ul>
          <li><Link href="/programs" className="text-primary hover:underline">All 157 Programs</Link> — Browse every FSA program, from ARC-CO to Wool &amp; Mohair</li>
          <li><Link href="/categories" className="text-primary hover:underline">Program Categories</Link> — See how programs group into conservation, commodity, disaster, and loan categories</li>
          <li><Link href="/conservation" className="text-primary hover:underline">Conservation Programs</Link> — CRP, EQIP, and other Title II programs</li>
          <li><Link href="/emergency-spending" className="text-primary hover:underline">Emergency Spending</Link> — Disaster and pandemic programs that now dominate spending</li>
          <li><Link href="/analysis" className="text-primary hover:underline">Analysis</Link> — Deep dives into who benefits, concentration, and policy implications</li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)]">Frequently Asked Questions</h2>
        <div className="not-prose space-y-4 my-6">
          {faqs.map((f, i) => (
            <details key={i} className="bg-gray-50 rounded-lg p-4 group">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                {f.q}
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" /></svg>
              </summary>
              <p className="mt-3 text-sm text-gray-600">{f.a}</p>
            </details>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The 2025 Farm Bill Debate</h2>
        <p>
          As of early 2025, Congress is actively debating a new Farm Bill. Key battleground issues include:
        </p>
        <ul>
          <li><strong>SNAP funding:</strong> Whether to expand or restrict nutrition assistance</li>
          <li><strong>Climate provisions:</strong> How aggressively to tie conservation spending to climate goals</li>
          <li><strong>Payment limits:</strong> Whether the $125,000/year cap should be tightened or loosened</li>
          <li><strong>Reference prices:</strong> Commodity program baseline prices that trigger payments</li>
          <li><strong>Crop insurance reform:</strong> Whether to cap premium subsidies for the largest operations</li>
        </ul>
        <p>
          Whatever Congress decides will shape farm subsidies for the next five years — and you can track the results
          right here on OpenSubsidies as new payment data becomes available.
        </p>
      </div>
    </article>
  )
}
