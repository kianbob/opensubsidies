import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import RelatedArticles from '@/components/RelatedArticles'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Why Florida Emergency Management Is the #1 Farm Subsidy Recipient',
  description: 'Florida Dept of Emergency Management collected $346.6M in USDA farm subsidies — more than any farmer in America. How a state disaster agency became the biggest recipient in the system.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/emergency-management' },
}

export default function EmergencyManagementPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema
        title="Why Florida Emergency Management Is the #1 Farm Subsidy Recipient"
        description="Florida Dept of Emergency Management collected $346.6M in USDA farm subsidies — more than any farmer in America."
        slug="analysis/emergency-management"
      />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Emergency Management Investigation' }]} />

      <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
        Why Florida&apos;s Emergency Management Agency Is the #1 Farm Subsidy Recipient in America
      </h1>
      <p className="text-sm text-gray-500 mb-6">February 2026 · Data Analysis</p>
      <ShareButtons title="Why Florida Emergency Management Is the #1 Farm Subsidy Recipient" />

      <div className="prose prose-gray max-w-none mt-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8 not-prose">
          <div className="text-3xl font-bold text-red-700">$346,598,388</div>
          <p className="text-sm text-gray-700 mt-1">Collected by the Florida Dept of Emergency Management in USDA farm subsidies — across just <strong>6 payments</strong>.</p>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed">
          When you search our database for the largest farm subsidy recipients in America, the #1 result isn&apos;t a corn farmer in Iowa or a cattle rancher in Texas. It&apos;s the <strong>Florida Department of Emergency Management</strong> — a state government agency — which collected <strong>$346.6 million</strong> from the USDA through just six payments.
        </p>
        <p>
          That&apos;s more than any individual farmer, any agricultural corporation, and any farming cooperative in the entire country. It&apos;s 69 times larger than the average among the top 5,000 recipients. And it all came from a single program.
        </p>

        <h2>The Program: Wildfires &amp; Hurricanes Indemnity</h2>
        <p>
          All $346.6 million flowed through the <Link href="/programs/wildfires-and-hurricanes-indemnity-program" className="text-primary hover:underline">Wildfires &amp; Hurricanes Indemnity Program</Link> (WHIP), created by Congress in the 2018 Bipartisan Budget Act. WHIP was designed to compensate agricultural producers for losses caused by hurricanes, wildfires, and other natural disasters in 2017 and 2018.
        </p>
        <p>
          The program was later expanded as WHIP+ to cover 2018 and 2019 disasters. Florida was ground zero: Hurricane Irma (2017) and Hurricane Michael (2018) devastated the state&apos;s agriculture industry, destroying citrus groves, nurseries, timber operations, and livestock across dozens of counties.
        </p>

        <h2>Why a State Agency — Not Individual Farmers?</h2>
        <p>
          This is the key question. The answer lies in how disaster relief flows through government:
        </p>
        <ul>
          <li><strong>Block grant mechanism:</strong> For large-scale agricultural disasters, USDA sometimes channels payments through state agencies rather than distributing directly to individual producers. The state agency then acts as a pass-through, distributing funds to affected farmers and operations.</li>
          <li><strong>Timber and forestry losses:</strong> Hurricane Michael caused an estimated <strong>$1.3 billion in timber losses</strong> across the Florida panhandle alone. Much of this timber was on state-managed land or involved state forestry programs, making the state agency the natural recipient.</li>
          <li><strong>Scale of destruction:</strong> When disaster losses reach into the hundreds of millions across an entire state, individual farmer-by-farmer payments become administratively impractical. State-level disbursement is faster.</li>
        </ul>

        <h2>The Numbers in Context</h2>
        <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
          <div className="bg-gray-50 rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-primary">$346.6M</div>
            <div className="text-sm text-gray-600 mt-1">FL Emergency Mgmt total</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-primary">6</div>
            <div className="text-sm text-gray-600 mt-1">Total payments received</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-primary">$57.8M</div>
            <div className="text-sm text-gray-600 mt-1">Average per payment</div>
          </div>
        </div>
        <p>
          For comparison, the <strong>#2 overall recipient</strong> in our database received roughly a quarter of this amount. The average payment across all 31.8 million records is about $4,600. Florida Emergency Management&apos;s average payment of $57.8 million is <strong>12,500 times the national average</strong>.
        </p>

        <h2>Not an Anomaly — A Pattern</h2>
        <p>
          Florida Emergency Management isn&apos;t the only government agency collecting farm subsidies. Our data shows several state agencies in the top recipient lists:
        </p>
        <ul>
          <li><strong>Florida Dept of Agriculture</strong> — $9M (Biofuel Infrastructure Program)</li>
          <li><strong>Public Service Commission of WI</strong> — $4M (Biofuel Infrastructure)</li>
          <li><strong>State of Alaska</strong> — $20M (Market Access Program)</li>
          <li><strong>National Association of State Depts of Agriculture</strong> — $17M (Market Access)</li>
        </ul>
        <p>
          Government agencies collecting from programs designed for farmers isn&apos;t necessarily wrong — many of these programs explicitly include state agencies as eligible recipients. But it raises important questions about who farm subsidies actually serve.
        </p>

        <h2>The Bigger Picture</h2>
        <p>
          The Florida Emergency Management case illustrates a broader truth about farm subsidies: <strong>the system is far more complex than &ldquo;payments to farmers.&rdquo;</strong>
        </p>
        <p>
          Emergency disaster programs like WHIP have grown dramatically in recent years. Our <Link href="/analysis/disaster-spending" className="text-primary hover:underline">disaster spending analysis</Link> shows these programs now routinely account for billions in annual spending. The COVID-era <Link href="/analysis/covid-spending" className="text-primary hover:underline">CFAP programs pushed total farm subsidies to $38.7 billion in 2020</Link> — more than double the historical norm.
        </p>
        <p>
          When people debate &ldquo;farm subsidies,&rdquo; they typically imagine payments to family farmers growing crops. The reality includes state disaster agencies, commodity trade commissions, biofuel infrastructure grants, and market access programs for industry groups. Understanding where the money actually goes is the first step toward informed policy debate.
        </p>

        <div className="not-prose bg-green-50 border-l-4 border-primary p-6 rounded-r-lg my-8">
          <h3 className="font-semibold text-gray-900 mb-2">Explore the Data</h3>
          <ul className="space-y-2 text-sm">
            <li>→ <Link href="/recipients/florida-dept-of-emergency-management-tallahassee-fl" className="text-primary hover:underline">Florida Dept of Emergency Management — Full Profile</Link></li>
            <li>→ <Link href="/programs/wildfires-and-hurricanes-indemnity-program" className="text-primary hover:underline">Wildfires &amp; Hurricanes Indemnity Program</Link></li>
            <li>→ <Link href="/states/fl" className="text-primary hover:underline">All Florida Farm Subsidies</Link></li>
            <li>→ <Link href="/entity-types" className="text-primary hover:underline">Who Gets Farm Subsidies by Entity Type</Link></li>
            <li>→ <Link href="/analysis/disaster-spending" className="text-primary hover:underline">The Rise of Disaster Spending</Link></li>
          </ul>
        </div>

        <h2>Data Notes</h2>
        <p className="text-sm text-gray-500">
          All data from USDA Farm Service Agency payment files, 2017–2025. The Wildfires &amp; Hurricanes Indemnity Program (WHIP/WHIP+) was authorized under the Bipartisan Budget Act of 2018 and the Additional Supplemental Appropriations for Disaster Relief Act of 2019. State agencies receiving USDA payments may act as pass-through entities, with funds ultimately reaching individual producers. Our database records the direct USDA payee as listed in FSA disbursement files.{' '}
          <Link href="/methodology" className="text-primary hover:underline">See our methodology</Link>.
        </p>
      </div>

      <div className="mt-12">
        <RelatedArticles currentSlug="emergency-management" />
      </div>
    </div>
  )
}
