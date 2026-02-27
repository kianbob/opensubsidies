import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '25 Farm Subsidy Facts That Will Surprise You',
  description: 'Surprising facts and statistics about U.S. farm subsidies: who gets them, how much they cost, and where the money goes. Backed by USDA data.',
  alternates: { canonical: 'https://www.opensubsidies.us/facts' },
}

export default function FactsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Facts' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">25 Farm Subsidy Facts That Will Surprise You</h1>
      <p className="text-gray-600 mb-8">
        The U.S. farm subsidy system distributes over $147 billion across 31.7 million payments. Here are the most surprising facts from our analysis of USDA payment data (2017–2025).
      </p>

      <ol className="space-y-6">
        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">1. Total farm subsidies exceed $147 billion</p>
          <p className="text-gray-600 mt-1">From 2017 to 2025, the USDA distributed $147.3 billion in farm subsidy payments — more than the GDP of many countries.</p>
          <Link href="/dashboard" className="text-primary text-sm hover:underline mt-2 inline-block">See the dashboard →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">2. 2020 was the biggest year ever: $38.7 billion</p>
          <p className="text-gray-600 mt-1">COVID-era spending pushed 2020 subsidies to $38.7B — more than the previous three years combined. CFAP payments alone totaled over $23 billion.</p>
          <Link href="/years/2020" className="text-primary text-sm hover:underline mt-2 inline-block">Explore 2020 data →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">3. Texas receives more subsidies than any other state: $12.6 billion</p>
          <p className="text-gray-600 mt-1">Texas leads all states with $12.6B in total payments, driven by cotton, livestock forage, and emergency programs.</p>
          <Link href="/states/tx" className="text-primary text-sm hover:underline mt-2 inline-block">See Texas data →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">4. Iowa is #2 at $11.7 billion — mostly CRP and trade war payments</p>
          <p className="text-gray-600 mt-1">Iowa&apos;s $3.15B in CRP payments alone exceeds many states&apos; total subsidy amounts. Trade war (MFP) payments added another $1.5B.</p>
          <Link href="/states/ia" className="text-primary text-sm hover:underline mt-2 inline-block">See Iowa data →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">5. The top recipient received over $2 million</p>
          <p className="text-gray-600 mt-1">Top individual recipients collected over $2 million each in subsidies from 2017–2025, while the average payment is just $4,637.</p>
          <Link href="/recipients" className="text-primary text-sm hover:underline mt-2 inline-block">See top recipients →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">6. CRP (Conservation Reserve Program) is the single biggest program: $15.7 billion</p>
          <p className="text-gray-600 mt-1">CRP pays farmers to keep environmentally sensitive land out of production. It&apos;s distributed $15.7B across 6.3 million payments.</p>
          <Link href="/analysis/crp-conservation" className="text-primary text-sm hover:underline mt-2 inline-block">Read about CRP →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">7. CFAP (COVID relief) distributed $14.2 billion in a single year</p>
          <p className="text-gray-600 mt-1">The Coronavirus Food Assistance Program (CFAP) was the second-largest single program, with most payments going out in 2020.</p>
          <Link href="/analysis/covid-spending" className="text-primary text-sm hover:underline mt-2 inline-block">Read about COVID spending →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">8. There are 157 different subsidy programs</p>
          <p className="text-gray-600 mt-1">The USDA runs 157 distinct subsidy programs — from Price Loss Coverage to the Seafood Trade Relief Program to Organic Cost Share.</p>
          <Link href="/programs" className="text-primary text-sm hover:underline mt-2 inline-block">Browse all programs →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">9. Trade war payments (MFP) totaled $13.5 billion</p>
          <p className="text-gray-600 mt-1">The Market Facilitation Program paid farmers $13.5B to offset losses from the US-China trade war — mostly in 2019.</p>
          <Link href="/analysis/trade-war" className="text-primary text-sm hover:underline mt-2 inline-block">Read about trade war spending →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">10. Price Loss Coverage distributes $14.2 billion</p>
          <p className="text-gray-600 mt-1">PLC pays farmers when crop prices fall below reference prices. It&apos;s the third-largest program, concentrated in cotton, rice, and peanut states.</p>
          <Link href="/categories" className="text-primary text-sm hover:underline mt-2 inline-block">See program categories →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">11. Subsidies flow to 28,875 counties and county-equivalents</p>
          <p className="text-gray-600 mt-1">Farm subsidies reach virtually every corner of America, spanning all 50 states plus territories.</p>
          <Link href="/counties" className="text-primary text-sm hover:underline mt-2 inline-block">Explore counties →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">12. California receives $6.2B despite not being a &ldquo;farm state&rdquo; in popular imagination</p>
          <p className="text-gray-600 mt-1">California ranks 9th nationally — its dairy, specialty crops, and emergency payments make it one of the biggest subsidy recipients.</p>
          <Link href="/states/ca" className="text-primary text-sm hover:underline mt-2 inline-block">See California data →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">13. The average payment is just $4,637</p>
          <p className="text-gray-600 mt-1">Despite billion-dollar program totals, the average individual payment is $4,637 — less than a month&apos;s rent in most major cities.</p>
          <Link href="/tools/calculator" className="text-primary text-sm hover:underline mt-2 inline-block">Try the subsidy calculator →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">14. Livestock Forage Program paid $7 billion for drought relief</p>
          <p className="text-gray-600 mt-1">LFP compensates ranchers for grazing losses due to drought. It surged to $1.9B in 2022 during severe Western drought.</p>
          <Link href="/analysis/disaster-spending" className="text-primary text-sm hover:underline mt-2 inline-block">Read about disaster spending →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">15. Emergency spending programs total over $6.5 billion</p>
          <p className="text-gray-600 mt-1">Emergency Relief Programs for non-specialty and specialty crops distributed $6.5B+ to help farmers recover from natural disasters.</p>
          <Link href="/analysis/disaster-spending" className="text-primary text-sm hover:underline mt-2 inline-block">See disaster analysis →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">16. North Dakota receives more per capita than any large state</p>
          <p className="text-gray-600 mt-1">With $7.7B going to fewer than 800,000 people, North Dakota&apos;s per-capita subsidy rate dwarfs larger states.</p>
          <Link href="/analysis/per-capita" className="text-primary text-sm hover:underline mt-2 inline-block">See per-capita analysis →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">17. Dairy Margin Coverage paid $2.4 billion to dairy farmers</p>
          <p className="text-gray-600 mt-1">DMC protects dairy farmers when the margin between milk prices and feed costs shrinks. It peaked at $1.16B in 2023.</p>
          <Link href="/programs" className="text-primary text-sm hover:underline mt-2 inline-block">Browse programs →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">18. 2025 spending is already $2.4 billion (and counting)</p>
          <p className="text-gray-600 mt-1">With data still being recorded, 2025 has already distributed $2.4B — led by emergency livestock relief and specialty crop assistance.</p>
          <Link href="/years/2025" className="text-primary text-sm hover:underline mt-2 inline-block">See 2025 data →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">19. Tulare County, CA is the #1 county: $807 million</p>
          <p className="text-gray-600 mt-1">A single California county received more than 20 entire states. Dairy and specialty crop programs drive Tulare&apos;s massive total.</p>
          <Link href="/counties" className="text-primary text-sm hover:underline mt-2 inline-block">See county rankings →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">20. The Seafood Trade Relief Program paid $292 million</p>
          <p className="text-gray-600 mt-1">Even seafood producers got trade war relief — $292M went to fisheries, primarily in Alaska and Maine.</p>
          <Link href="/programs" className="text-primary text-sm hover:underline mt-2 inline-block">Browse all programs →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">21. Sugar beet cooperatives received $285 million in a single WHIP payment</p>
          <p className="text-gray-600 mt-1">The Wildfire and Hurricane Indemnity Program made a $285M payment to sugar beet cooperatives — one of the largest single disbursements.</p>
          <Link href="/analysis/subsidy-concentration" className="text-primary text-sm hover:underline mt-2 inline-block">See concentration analysis →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">22. Puerto Rico received $463 million — mostly hurricane relief</p>
          <p className="text-gray-600 mt-1">Post-hurricane WHIP payments made up $193M of Puerto Rico&apos;s total, highlighting how disaster programs dominate territory payments.</p>
          <Link href="/states" className="text-primary text-sm hover:underline mt-2 inline-block">See all states →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">23. ARC-County covers 5.7 million payments worth $9.2 billion</p>
          <p className="text-gray-600 mt-1">Agricultural Risk Coverage (County) is a safety net that pays when county crop revenue falls below a benchmark. It covers more payments than almost any other program.</p>
          <Link href="/categories" className="text-primary text-sm hover:underline mt-2 inline-block">See categories →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">24. Spending swung from $6.4B (2017) to $38.7B (2020) — a 6x increase in 3 years</p>
          <p className="text-gray-600 mt-1">The combination of trade wars, COVID, and disaster programs created an unprecedented spending surge.</p>
          <Link href="/trends" className="text-primary text-sm hover:underline mt-2 inline-block">See spending trends →</Link>
        </li>

        <li className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-900">25. Banks and financial institutions appear among top recipients</p>
          <p className="text-gray-600 mt-1">Entities like &ldquo;First Farmers Bank &amp; Trust&rdquo; and &ldquo;AgSouth Farm Credit&rdquo; receive subsidies as lenders who hold farm payment assignments.</p>
          <Link href="/analysis/corporate-farms" className="text-primary text-sm hover:underline mt-2 inline-block">Read about corporate farms →</Link>
        </li>
      </ol>

      <section className="mt-12 prose max-w-none text-gray-600">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">About This Data</h2>
        <p>
          All facts on this page are derived from USDA Farm Service Agency payment records covering 2017–2025.
          Data includes {(31759593).toLocaleString()} individual payments totaling $147.3 billion across 157 programs.
          This data is updated regularly from official USDA sources.
        </p>
        <p>
          Want to dig deeper? Use our <Link href="/tools" className="text-primary hover:underline">interactive tools</Link> to explore, compare, and analyze farm subsidy data yourself.
        </p>
      </section>
    </div>
  )
}
