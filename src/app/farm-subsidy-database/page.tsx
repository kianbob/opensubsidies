import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import RelatedArticles from '@/components/RelatedArticles'
import ArticleSchema from '@/components/ArticleSchema'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Farm Subsidy Database — Search USDA Farm Payment Records | OpenSubsidies',
  description: 'Search the most comprehensive farm subsidy database online. Explore 31.7 million USDA farm payment records across 50 states, 157 programs, and 9 years of data.',
  keywords: ['farm subsidy database', 'USDA farm payment database', 'farm subsidy search', 'USDA payments lookup', 'farm subsidies data'],
  alternates: { canonical: 'https://www.opensubsidies.org/farm-subsidy-database' },
}

export default function FarmSubsidyDatabasePage() {
  const faqData = [
    {
      q: 'What is the farm subsidy database?',
      a: 'The OpenSubsidies farm subsidy database contains 31.7 million USDA Farm Service Agency payment records from 2017 to 2025, covering $147 billion in payments across all 50 states and U.S. territories.'
    },
    {
      q: 'How do I search farm subsidy records?',
      a: 'You can search by state, county, program name, or recipient. Use our search tool to find specific payments, or browse by state or program category.'
    },
    {
      q: 'Where does the farm subsidy data come from?',
      a: 'All data comes directly from the USDA Farm Service Agency. We process raw payment records and organize them into searchable, interactive formats.'
    },
    {
      q: 'How often is the database updated?',
      a: 'We update our database whenever the USDA releases new payment data, typically on a quarterly basis. The most recent data covers payments through 2025.'
    },
    {
      q: 'Can I download the raw data?',
      a: 'Yes. We provide downloadable JSON datasets for all states, counties, programs, and recipients. Visit our downloads page to get started.'
    },
    {
      q: 'How many farm programs are in the database?',
      a: 'The database tracks 157 distinct USDA farm programs, including commodity programs (PLC, ARC), conservation programs (CRP), disaster programs, and COVID-era payments (CFAP).'
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleSchema
        title="Farm Subsidy Database"
        description="The most comprehensive searchable database of USDA farm subsidy payments."
        slug="farm-subsidy-database"
      />
      <Breadcrumbs items={[{ label: 'Farm Subsidy Database' }]} />

      <h1 className="text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
        Farm Subsidy Database: Search $147 Billion in USDA Payments
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        The most comprehensive, free, searchable database of USDA farm subsidy payments.
        Explore 31.7 million payment records across all 50 states.
      </p>

      <ShareButtons title="Farm Subsidy Database — Search USDA Payment Records" />

      {/* Quick Access Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-8">
        <Link href="/search" className="bg-green-700 text-white rounded-lg p-4 text-center hover:bg-green-800 transition-colors font-semibold">
          🔍 Search Database
        </Link>
        <Link href="/states" className="bg-green-50 text-green-800 rounded-lg p-4 text-center hover:bg-green-100 transition-colors font-semibold">
          🗺️ Browse States
        </Link>
        <Link href="/programs" className="bg-green-50 text-green-800 rounded-lg p-4 text-center hover:bg-green-100 transition-colors font-semibold">
          📋 All Programs
        </Link>
        <Link href="/recipients" className="bg-green-50 text-green-800 rounded-lg p-4 text-center hover:bg-green-100 transition-colors font-semibold">
          👤 Top Recipients
        </Link>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-[family-name:var(--font-heading)]">What&apos;s in the Database</h2>
        <p>
          The OpenSubsidies farm subsidy database is the most comprehensive free resource for
          exploring USDA farm payments. We&apos;ve processed and organized <strong>31.7 million
          individual payment records</strong> totaling <strong>$147 billion</strong> in USDA farm
          subsidies from 2017 through 2025.
        </p>
        <p>
          Every dollar the federal government pays to farmers, ranchers, and agricultural
          operations through the USDA Farm Service Agency is tracked in this database.
          From Conservation Reserve Program (CRP) rental payments in Iowa to Price Loss
          Coverage (PLC) payments in Texas, our database covers it all.
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Database Coverage</h3>
        <ul>
          <li><strong>31.7 million</strong> individual payment records</li>
          <li><strong>$147 billion</strong> in total payments tracked</li>
          <li><strong>50 states</strong> plus U.S. territories</li>
          <li><strong>3,000+ counties</strong> with detailed breakdowns</li>
          <li><strong>157 programs</strong> from CRP to CFAP to PLC</li>
          <li><strong>9 years</strong> of data (2017–2025)</li>
          <li><strong>Thousands of recipients</strong> searchable by name</li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)]">How to Use the Farm Subsidy Database</h2>
        <p>
          Our database is designed to be accessible to everyone — journalists, researchers,
          farmers, taxpayers, and students. Here&apos;s how to get the most out of it:
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Search by State</h3>
        <p>
          Start with our <Link href="/states" className="text-green-700 underline">state pages</Link> to
          see total subsidies, top programs, year-over-year trends, and county-level breakdowns
          for any state. Texas leads with $12.6 billion, followed by Iowa ($11.7B) and
          Kansas ($8.6B).
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Search by Program</h3>
        <p>
          Explore all <Link href="/programs" className="text-green-700 underline">157 USDA programs</Link> in
          our database. See how much each program has paid out, which states receive the most,
          and how spending has changed over time. Major programs include CRP, PLC, ARC, CFAP,
          and Market Facilitation Program (MFP).
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Search by County</h3>
        <p>
          Drill down to the county level with our <Link href="/tools/county-finder" className="text-green-700 underline">County Finder</Link> or
          browse <Link href="/counties" className="text-green-700 underline">all counties</Link> to find
          payment totals for your area. Compare counties within a state or across the nation.
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Search by Recipient</h3>
        <p>
          Our <Link href="/tools/recipient-search" className="text-green-700 underline">Recipient Search</Link> lets
          you find specific farms, ranches, and organizations that receive USDA payments. See
          payment amounts, programs, and history for individual recipients.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Types of Farm Subsidies in the Database</h2>
        <p>
          The USDA operates dozens of farm subsidy programs. Our database organizes them into
          clear categories:
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Commodity Programs</h3>
        <p>
          Programs like <strong>Price Loss Coverage (PLC)</strong> and <strong>Agricultural Risk
          Coverage (ARC)</strong> make up the backbone of farm subsidies. PLC triggers payments
          when crop prices fall below reference levels. ARC provides revenue-based protection.
          Together, these programs have paid out billions to corn, wheat, soybean, and rice farmers.
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Conservation Programs</h3>
        <p>
          The <strong>Conservation Reserve Program (CRP)</strong> is the largest conservation program,
          paying farmers to take environmentally sensitive land out of production. With over
          $15.7 billion in payments, CRP is one of the biggest items in our database.
          Learn more on our <Link href="/conservation-reserve-program" className="text-green-700 underline">CRP deep dive page</Link>.
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Disaster and Emergency Programs</h3>
        <p>
          From the <strong>Livestock Forage Program</strong> to <strong>Emergency Relief Programs</strong>,
          disaster payments have surged in recent years. Our database tracks the full scope of
          emergency agriculture spending, including hurricane, wildfire, and drought relief.
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">COVID-Era Programs</h3>
        <p>
          The pandemic brought unprecedented farm payments through <strong>CFAP (Coronavirus
          Food Assistance Program)</strong> and related programs. Our database tracks every
          CFAP, CFAP2, and CFAP3 payment, totaling billions in pandemic-era agricultural relief.
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Trade War Bailouts</h3>
        <p>
          The <strong>Market Facilitation Program (MFP)</strong> and trade-related payments
          compensated farmers for losses from tariff disputes. These payments are fully
          tracked in our database with state and county breakdowns.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Why Farm Subsidy Transparency Matters</h2>
        <p>
          Farm subsidies represent one of the largest categories of federal spending. Yet most
          Americans have no idea where the money goes. Our database changes that by making
          every payment searchable and accountable.
        </p>
        <p>
          Research using farm subsidy data has revealed important patterns: the concentration
          of payments among large operations, regional disparities in who benefits, the growth
          of emergency spending, and the shifting balance between conservation and commodity
          programs.
        </p>
        <p>
          Whether you&apos;re a journalist investigating agricultural policy, a researcher studying
          rural economics, a farmer comparing your area to others, or a taxpayer curious about
          where your money goes — this database is for you.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Data Source and Methodology</h2>
        <p>
          All data in our farm subsidy database comes from the <strong>USDA Farm Service
          Agency</strong>. We download raw payment files, clean and normalize the data, geocode
          locations, and organize everything into an accessible format. For full details, see
          our <Link href="/methodology" className="text-green-700 underline">methodology page</Link>.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Interactive Tools</h2>
        <p>
          Beyond raw data, we offer <Link href="/tools" className="text-green-700 underline">interactive tools</Link> to
          explore farm subsidies in different ways:
        </p>
        <ul>
          <li><Link href="/tools/state-report-card" className="text-green-700 underline">State Report Card</Link> — Grade any state on subsidy metrics</li>
          <li><Link href="/tools/subsidy-tracker" className="text-green-700 underline">County Subsidy Tracker</Link> — Track your county&apos;s payments</li>
          <li><Link href="/tools/taxpayer-calculator" className="text-green-700 underline">Taxpayer Calculator</Link> — See your personal share of farm subsidies</li>
          <li><Link href="/compare" className="text-green-700 underline">State Comparison</Link> — Compare states side-by-side</li>
          <li><Link href="/tools/subsidy-quiz" className="text-green-700 underline">Farm Subsidy Quiz</Link> — Test your knowledge</li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)]">Key Database Statistics</h2>
        <p>
          Our farm subsidy database reveals striking patterns in how agricultural payments
          are distributed across the United States:
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Top States by Total Subsidies</h3>
        <p>
          Texas leads the nation with <strong>$12.6 billion</strong> in total farm subsidies
          from 2017-2025, driven primarily by Price Loss Coverage and Livestock Forage payments.
          Iowa follows closely at <strong>$11.7 billion</strong>, with CRP rental payments
          as its single largest program. Kansas ($8.6B), Illinois ($8.3B), and Minnesota
          ($8.2B) round out the top five.
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Payment Concentration</h3>
        <p>
          A significant finding in our database is the concentration of payments. The top
          10 states receive approximately 60% of all farm subsidies. Within states, payments
          are further concentrated among large operations. Our <Link href="/analysis/subsidy-concentration" className="text-green-700 underline">concentration analysis</Link> explores
          this pattern in detail.
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Program Distribution</h3>
        <p>
          Of the 157 programs tracked, the top 10 account for the vast majority of spending.
          CRP Annual Rental is the single largest program nationally, followed by Price Loss
          Coverage, Market Facilitation Program, CFAP payments, and Agricultural Risk Coverage.
          Emergency and disaster payments have grown dramatically, now representing over 30%
          of total spending — a sharp increase from historical norms.
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Year-Over-Year Trends</h3>
        <p>
          Farm subsidy spending has fluctuated significantly over our 9-year coverage period.
          The trade war era (2018-2019) saw massive MFP bailout payments. COVID-19 triggered
          billions in CFAP payments in 2020-2021. More recently, emergency relief programs
          for drought and natural disasters have driven spending upward. Explore these trends
          on our <Link href="/trends" className="text-green-700 underline">spending trends page</Link>.
        </p>

        <h3 className="font-[family-name:var(--font-heading)]">Geographic Patterns</h3>
        <p>
          Farm subsidies follow distinct geographic patterns. The Great Plains and Midwest
          dominate commodity and conservation payments. The Southeast receives significant
          disaster aid. California, despite being the nation&apos;s largest agricultural state
          by revenue, ranks 9th in subsidies because its specialty crop sector receives
          relatively less federal support. Our <Link href="/subsidy-map" className="text-green-700 underline">interactive subsidy map</Link> visualizes
          these patterns.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Who Uses This Database?</h2>
        <p>
          Our farm subsidy database serves a diverse audience:
        </p>
        <ul>
          <li>
            <strong>Journalists</strong> use our data to investigate agricultural policy,
            identify payment patterns, and hold policymakers accountable
          </li>
          <li>
            <strong>Researchers</strong> access our structured data for academic studies on
            rural economics, environmental policy, and food systems
          </li>
          <li>
            <strong>Farmers</strong> compare their area&apos;s subsidies to state and national
            averages and explore available programs
          </li>
          <li>
            <strong>Policymakers</strong> analyze spending patterns to inform farm bill
            negotiations and program design
          </li>
          <li>
            <strong>Taxpayers</strong> learn where their tax dollars go and how farm subsidies
            affect their communities
          </li>
          <li>
            <strong>Students</strong> use our interactive tools for research projects and
            coursework on agricultural economics and public policy
          </li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)]">Download the Data</h2>
        <p>
          Need the raw data for your own analysis? Visit our <Link href="/downloads" className="text-green-700 underline">downloads page</Link> to
          get JSON datasets for all states, counties, programs, and recipients. All data
          is free to use for research, journalism, and educational purposes.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Comparing Our Database to Other Sources</h2>
        <p>
          Several organizations track farm subsidies, but OpenSubsidies offers unique
          advantages for researchers and the public:
        </p>
        <ul>
          <li>
            <strong>Real-time accessibility:</strong> All data loads instantly in your browser.
            No registration required, no query limits, no paywalls.
          </li>
          <li>
            <strong>Interactive visualizations:</strong> Charts, maps, and comparison tools
            make the data accessible to non-technical users.
          </li>
          <li>
            <strong>Comprehensive coverage:</strong> 31.7 million records across 157 programs,
            including COVID-era and trade war payments that many databases miss.
          </li>
          <li>
            <strong>County-level detail:</strong> Drill down to any of 3,000+ counties for
            localized payment data and rankings.
          </li>
          <li>
            <strong>Analytical context:</strong> Our analysis articles explain the data in
            plain English, connecting numbers to policy implications.
          </li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)]">Understanding Farm Subsidy Programs</h2>
        <p>
          The USDA operates a complex web of farm programs, each with different purposes,
          eligibility criteria, and payment structures. Our <Link href="/program-decoder" className="text-green-700 underline">Program Decoder</Link> explains
          every major program acronym in plain English: CRP, PLC, ARC, CFAP, MFP, EQIP,
          and dozens more.
        </p>
        <p>
          Understanding these programs is essential for interpreting the database. For example,
          a large CRP payment to a county doesn&apos;t mean farmers are getting rich — it means
          they&apos;ve retired environmentally sensitive land from production. A spike in CFAP
          payments reflects pandemic-era emergency aid, not ongoing farm policy.
        </p>
        <p>
          Our <Link href="/categories" className="text-green-700 underline">program categories page</Link> organizes
          all 157 programs by type — conservation, commodity, disaster, dairy, and more —
          making it easier to understand the landscape.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Data Quality and Limitations</h2>
        <p>
          While our database is comprehensive, users should be aware of some limitations:
        </p>
        <ul>
          <li>
            Our data covers USDA Farm Service Agency payments only. It does not include
            crop insurance (administered by RMA), SNAP/food stamps, or other USDA programs
            outside the FSA.
          </li>
          <li>
            Some recipient names may appear in multiple variations due to business entity
            structures. We normalize where possible but some duplication may exist.
          </li>
          <li>
            County-level data reflects the county where the payment was recorded, which
            may differ from where the farming operation is physically located.
          </li>
          <li>
            Historical comparisons should account for inflation. A dollar in 2017 is worth
            more than a dollar in 2025.
          </li>
        </ul>
        <p>
          For complete details on our data processing approach, see our <Link href="/methodology" className="text-green-700 underline">methodology page</Link>.
        </p>

        {/* FAQ Section */}
        <h2 className="font-[family-name:var(--font-heading)]">Frequently Asked Questions</h2>
        {faqData.map((f, i) => (
          <div key={i} className="mb-6">
            <h3 className="font-[family-name:var(--font-heading)] text-lg">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <RelatedArticles currentSlug="farm-subsidy-database" />
      </div>
    </div>
  )
}
