import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Farm Subsidies Explained: What They Are, Who Gets Them, and How Much',
  description: 'A comprehensive guide to USDA farm subsidies: what they are, who gets them, how much the government spends, the biggest programs, and why they\'re controversial. Backed by real data.',
  alternates: { canonical: 'https://www.opensubsidies.us/farm-subsidies-explained' },
}

export default function FarmSubsidiesExplainedPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Farm Subsidies Explained' }]} />

      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Farm Subsidies Explained: The Complete Guide</h1>
      <p className="text-gray-600 mb-8">
        Everything you need to know about U.S. farm subsidies — what they are, who receives them, how much they cost, and why they matter. Updated with the latest USDA data.
      </p>

      <div className="prose max-w-none text-gray-700">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900" id="what-are-farm-subsidies">What Are Farm Subsidies?</h2>
        <p>
          Farm subsidies are government financial assistance programs that provide payments to agricultural producers. In the United States, these subsidies are primarily administered by the <strong>USDA Farm Service Agency (FSA)</strong> and authorized through the Farm Bill, which Congress reauthorizes approximately every five years.
        </p>
        <p>
          The stated goals of farm subsidies include stabilizing food prices, ensuring a reliable food supply, supporting farmers during economic downturns, conserving natural resources, and helping producers manage risk from weather and market volatility.
        </p>
        <p>
          According to our analysis of USDA payment records, the federal government distributed <strong>$147.3 billion</strong> in farm subsidy payments from 2017 to 2025 across <Link href="/programs" className="text-primary hover:underline">157 different programs</Link>.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900" id="types-of-subsidies">Types of Farm Subsidies</h2>
        <p>Farm subsidies fall into several major categories:</p>

        <h3 className="font-[family-name:var(--font-heading)] text-gray-900">Commodity Programs</h3>
        <p>
          These are the traditional &ldquo;farm subsidies&rdquo; that most people think of. They provide price and revenue protection for major crops like corn, soybeans, wheat, cotton, rice, and peanuts. The two main programs are:
        </p>
        <ul>
          <li><strong>Price Loss Coverage (PLC)</strong> — pays farmers when crop prices fall below a reference price. PLC has distributed <strong>$14.2 billion</strong> since 2017.</li>
          <li><strong>Agricultural Risk Coverage (ARC)</strong> — pays when county or individual crop revenue falls below a benchmark. ARC-County has distributed <strong>$9.2 billion</strong>.</li>
        </ul>
        <p>
          Farmers must choose between PLC and ARC for each crop. These programs are <Link href="/categories" className="text-primary hover:underline">detailed in our program categories</Link>.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-gray-900">Conservation Programs</h3>
        <p>
          Conservation programs pay farmers to protect environmentally sensitive land, improve water quality, and reduce soil erosion. The largest is the <strong>Conservation Reserve Program (CRP)</strong>, which pays landowners an annual rental payment to keep cropland out of production and plant conservation cover instead.
        </p>
        <p>
          CRP is the single largest farm subsidy program at <strong>$15.7 billion</strong> — larger than any commodity or emergency program. Learn more in our <Link href="/analysis/crp-conservation" className="text-primary hover:underline">CRP analysis</Link>.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-gray-900">Disaster &amp; Emergency Programs</h3>
        <p>
          When natural disasters strike — droughts, floods, hurricanes, wildfires — the USDA activates emergency programs to help farmers recover. Key programs include:
        </p>
        <ul>
          <li><strong>Livestock Forage Program (LFP)</strong> — $7 billion for drought-affected ranchers</li>
          <li><strong>Emergency Relief Programs</strong> — $6.6 billion for crop losses from natural disasters</li>
          <li><strong>Emergency Livestock Assistance (ELAP)</strong> — $1.8 billion for livestock losses</li>
          <li><strong>Wildfire and Hurricane Indemnity (WHIP)</strong> — $497 million for specific disaster events</li>
        </ul>
        <p>
          Explore our <Link href="/analysis/disaster-spending" className="text-primary hover:underline">disaster spending analysis</Link> for more detail.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-gray-900">Trade War &amp; COVID Programs</h3>
        <p>
          Recent years saw unprecedented one-time programs created in response to trade disputes and the pandemic:
        </p>
        <ul>
          <li><strong>Market Facilitation Program (MFP)</strong> — $13.5 billion to offset losses from U.S.-China trade tariffs (2018–2019)</li>
          <li><strong>Coronavirus Food Assistance Program (CFAP)</strong> — $14.2 billion in COVID relief payments (2020)</li>
          <li><strong>Emergency Commodity Assistance Program</strong> — $9.4 billion (2025)</li>
        </ul>
        <p>
          Read about <Link href="/analysis/trade-war" className="text-primary hover:underline">trade war spending</Link> and <Link href="/analysis/covid-spending" className="text-primary hover:underline">COVID spending</Link>.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-gray-900">Dairy Programs</h3>
        <p>
          Dairy farmers have their own safety net through <strong>Dairy Margin Coverage (DMC)</strong>, which pays when the margin between milk prices and feed costs drops below an insured level. DMC has distributed $2.4 billion since its creation.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900" id="who-gets-subsidies">Who Gets Farm Subsidies?</h2>
        <p>
          Farm subsidies go to a wide range of recipients — from small family farms to large corporate operations, from individual ranchers to banks that hold farm payment assignments. Our data shows payments going to entities in <strong>all 50 states</strong>, the District of Columbia, and U.S. territories.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-gray-900">By State</h3>
        <p>The top 10 states by total farm subsidy payments (2017–2025):</p>
        <ol>
          <li><Link href="/states/tx" className="text-primary hover:underline">Texas</Link> — $12.6 billion</li>
          <li><Link href="/states/ia" className="text-primary hover:underline">Iowa</Link> — $11.7 billion</li>
          <li><Link href="/states/ks" className="text-primary hover:underline">Kansas</Link> — $8.6 billion</li>
          <li><Link href="/states/il" className="text-primary hover:underline">Illinois</Link> — $8.3 billion</li>
          <li><Link href="/states/mn" className="text-primary hover:underline">Minnesota</Link> — $8.2 billion</li>
          <li><Link href="/states/ne" className="text-primary hover:underline">Nebraska</Link> — $8.0 billion</li>
          <li><Link href="/states/nd" className="text-primary hover:underline">North Dakota</Link> — $7.7 billion</li>
          <li><Link href="/states/sd" className="text-primary hover:underline">South Dakota</Link> — $6.8 billion</li>
          <li><Link href="/states/ca" className="text-primary hover:underline">California</Link> — $6.2 billion</li>
          <li><Link href="/states/mo" className="text-primary hover:underline">Missouri</Link> — $5.7 billion</li>
        </ol>
        <p>
          <Link href="/rankings" className="text-primary hover:underline">See the full state rankings →</Link>
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-gray-900">Concentration of Payments</h3>
        <p>
          Farm subsidy payments are highly concentrated. The top recipients each receive over $2 million, while the average payment is just $4,637. This disparity reflects the structure of American agriculture — large operations produce most of the food and receive most of the subsidies.
        </p>
        <p>
          Read our <Link href="/analysis/subsidy-concentration" className="text-primary hover:underline">subsidy concentration analysis</Link> and <Link href="/analysis/small-vs-large" className="text-primary hover:underline">small vs. large farm comparison</Link>.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900" id="how-much">How Much Do Farm Subsidies Cost?</h2>
        <p>
          Annual farm subsidy spending has varied dramatically:
        </p>
        <ul>
          <li><strong>2017</strong>: $6.4 billion — a relatively normal year</li>
          <li><strong>2018</strong>: $15.2 billion — trade war payments begin</li>
          <li><strong>2019</strong>: $23.7 billion — peak trade war spending</li>
          <li><strong>2020</strong>: $38.7 billion — COVID emergency spending</li>
          <li><strong>2021</strong>: $9.2 billion — post-pandemic wind-down</li>
          <li><strong>2022</strong>: $7.2 billion — return toward baseline</li>
          <li><strong>2023</strong>: $9.1 billion — new emergency programs</li>
          <li><strong>2024</strong>: $17.0 billion — emergency spending resurges</li>
          <li><strong>2025</strong>: $2.4 billion — (year in progress)</li>
        </ul>
        <p>
          <Link href="/trends" className="text-primary hover:underline">View interactive spending trends →</Link>
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900" id="biggest-programs">The Biggest Programs</h2>
        <p>The top 10 farm subsidy programs by total payments (2017–2025):</p>
        <ol>
          <li><strong>CRP Annual Rental</strong> — $15.7B (6.3M payments)</li>
          <li><strong>CFAP (COVID Relief)</strong> — $14.2B (1.1M payments)</li>
          <li><strong>Price Loss Coverage</strong> — $14.2B (5.4M payments)</li>
          <li><strong>MFP Trade War (Non-Specialty Crops)</strong> — $13.5B (1.7M payments)</li>
          <li><strong>Emergency Commodity Assistance</strong> — $9.4B (1.1M payments)</li>
          <li><strong>ARC-County</strong> — $9.2B (5.7M payments)</li>
          <li><strong>MFP Trade War (Crops)</strong> — $8.2B (1.0M payments)</li>
          <li><strong>Livestock Forage Program</strong> — $7.0B (1.1M payments)</li>
          <li><strong>Emergency Relief (Non-Specialty)</strong> — $6.6B (598K payments)</li>
          <li><strong>CFAP (CARES Act)</strong> — $5.6B (932K payments)</li>
        </ol>
        <p>
          <Link href="/programs" className="text-primary hover:underline">Browse all 157 programs →</Link>
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900" id="history">A Brief History</h2>
        <p>
          U.S. farm subsidies date back to the <strong>Agricultural Adjustment Act of 1933</strong>, part of FDR&apos;s New Deal. The original goal was to raise crop prices during the Great Depression by paying farmers to reduce production.
        </p>
        <p>
          Over the decades, subsidies evolved through multiple Farm Bills. The 1996 &ldquo;Freedom to Farm&rdquo; Act attempted to phase out subsidies but was followed by emergency payments. The 2014 Farm Bill replaced direct payments with the current PLC/ARC system. The 2018 Farm Bill continued these programs and authorized the trade war-era MFP payments.
        </p>
        <p>
          COVID-19 brought an unprecedented expansion through CFAP, and recent years have seen continued growth in disaster and emergency programs as extreme weather events become more frequent.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900" id="controversy">Why Are Farm Subsidies Controversial?</h2>
        <p>Farm subsidies face criticism from across the political spectrum:</p>
        <ul>
          <li><strong>Concentration</strong> — Critics argue that subsidies disproportionately benefit large, wealthy operations while small farms get little. Our <Link href="/analysis/subsidy-concentration" className="text-primary hover:underline">concentration analysis</Link> shows significant disparities.</li>
          <li><strong>Environmental concerns</strong> — Commodity subsidies can incentivize monoculture farming and overuse of land, while conservation programs (like CRP) aim to counterbalance this.</li>
          <li><strong>Market distortion</strong> — Subsidies can keep inefficient farms in business and distort crop choices, with farmers planting subsidized crops rather than what the market demands.</li>
          <li><strong>Trade impacts</strong> — U.S. subsidies affect global markets, potentially harming farmers in developing countries who can&apos;t compete with subsidized American exports.</li>
          <li><strong>Cost to taxpayers</strong> — At $147B over 8 years, farm subsidies represent a significant commitment of public funds.</li>
        </ul>
        <p>
          Supporters counter that subsidies ensure food security, keep food prices stable for consumers, protect against catastrophic farm losses, and maintain rural communities and the agricultural workforce.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900" id="explore">Explore the Data Yourself</h2>
        <p>
          OpenSubsidies makes all of this data freely available. Here are some ways to dig deeper:
        </p>
        <ul>
          <li><Link href="/tools/recipient-search" className="text-primary hover:underline">Search recipients</Link> — Find any farm or individual</li>
          <li><Link href="/compare" className="text-primary hover:underline">Compare states</Link> — Side-by-side state analysis</li>
          <li><Link href="/tools/calculator" className="text-primary hover:underline">Subsidy calculator</Link> — Put any dollar amount in context</li>
          <li><Link href="/tools/state-profile" className="text-primary hover:underline">State profiles</Link> — Generate shareable state cards</li>
          <li><Link href="/downloads" className="text-primary hover:underline">Download data</Link> — Get raw datasets for your own analysis</li>
          <li><Link href="/analysis" className="text-primary hover:underline">Analysis articles</Link> — Deep dives into subsidy patterns</li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900" id="faq">Frequently Asked Questions</h2>

        <h3 className="font-[family-name:var(--font-heading)] text-gray-900">What is the largest farm subsidy program?</h3>
        <p>
          The Conservation Reserve Program (CRP) is the largest at $15.7 billion, followed by CFAP COVID relief ($14.2B) and Price Loss Coverage ($14.2B).
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-gray-900">Which state receives the most farm subsidies?</h3>
        <p>
          Texas receives the most at $12.6 billion, followed by Iowa ($11.7B) and Kansas ($8.6B).
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-gray-900">How much does the average farmer receive in subsidies?</h3>
        <p>
          The average payment is $4,637 per transaction, but this varies enormously. Many farmers receive multiple payments per year across different programs.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-gray-900">Are farm subsidies increasing or decreasing?</h3>
        <p>
          Spending spiked dramatically in 2019–2020 due to trade wars and COVID, reaching $38.7B in 2020. It has since decreased but remains well above pre-2018 levels due to ongoing emergency programs.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-gray-900">Where does farm subsidy data come from?</h3>
        <p>
          All data on OpenSubsidies comes from USDA Farm Service Agency payment files, which are public records. We process and present this data to make it accessible. Read our <Link href="/methodology" className="text-primary hover:underline">methodology</Link>.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-gray-900">Do farm subsidies go to individuals or corporations?</h3>
        <p>
          Both. Recipients include individual farmers, family partnerships, LLCs, cooperatives, and even banks that hold payment assignments. Our <Link href="/analysis/corporate-farms" className="text-primary hover:underline">corporate farm analysis</Link> explores this.
        </p>
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
                name: 'What is the largest farm subsidy program?',
                acceptedAnswer: { '@type': 'Answer', text: 'The Conservation Reserve Program (CRP) is the largest at $15.7 billion, followed by CFAP COVID relief ($14.2B) and Price Loss Coverage ($14.2B).' },
              },
              {
                '@type': 'Question',
                name: 'Which state receives the most farm subsidies?',
                acceptedAnswer: { '@type': 'Answer', text: 'Texas receives the most at $12.6 billion, followed by Iowa ($11.7B) and Kansas ($8.6B).' },
              },
              {
                '@type': 'Question',
                name: 'How much does the average farmer receive in subsidies?',
                acceptedAnswer: { '@type': 'Answer', text: 'The average payment is $4,637 per transaction, but this varies enormously. Many farmers receive multiple payments per year across different programs.' },
              },
              {
                '@type': 'Question',
                name: 'Are farm subsidies increasing or decreasing?',
                acceptedAnswer: { '@type': 'Answer', text: 'Spending spiked dramatically in 2019-2020 due to trade wars and COVID, reaching $38.7B in 2020. It has since decreased but remains well above pre-2018 levels.' },
              },
              {
                '@type': 'Question',
                name: 'Where does farm subsidy data come from?',
                acceptedAnswer: { '@type': 'Answer', text: 'All data comes from USDA Farm Service Agency payment files, which are public records.' },
              },
              {
                '@type': 'Question',
                name: 'Do farm subsidies go to individuals or corporations?',
                acceptedAnswer: { '@type': 'Answer', text: 'Both. Recipients include individual farmers, family partnerships, LLCs, cooperatives, and even banks that hold payment assignments.' },
              },
            ],
          }),
        }}
      />
    </div>
  )
}
