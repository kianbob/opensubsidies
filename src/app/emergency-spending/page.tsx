import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import EmergencySpendingChart from '@/components/EmergencySpendingChart'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Farm Emergency Payments: CFAP, MFP, and Disaster Relief — OpenSubsidies',
  description: 'How CFAP, MFP, and disaster programs reshaped farm subsidies. $60+ billion in emergency payments from COVID relief, trade war compensation, and natural disaster programs.',
  alternates: { canonical: 'https://www.opensubsidies.us/emergency-spending' },
}

export default function EmergencySpendingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Emergency Spending' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">Farm Emergency Payments: CFAP, MFP, and Disaster Relief</h1>
      <p className="text-gray-600 mb-8">
        Emergency and one-time programs have reshaped the farm subsidy landscape, often exceeding regular program spending. Here&apos;s how trade wars, COVID, and natural disasters transformed farm payments.
      </p>

      <EmergencySpendingChart />

      <div className="prose max-w-none text-gray-700 mt-10">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">The COVID Response: CFAP Payments</h2>
        <p>
          The <strong>Coronavirus Food Assistance Program (CFAP)</strong> was the largest single emergency program in farm subsidy history. Created in 2020, CFAP distributed over <strong>$14.2 billion</strong> in direct payments to farmers and ranchers affected by pandemic-related market disruptions.
        </p>
        <p>
          CFAP payments went to producers of virtually every commodity — from row crops to dairy, livestock, and specialty crops. The program operated in multiple rounds:
        </p>
        <ul>
          <li><strong>CFAP1 (CARES Act)</strong> — $5.6 billion in initial pandemic relief</li>
          <li><strong>CFAP2</strong> — $14.2 billion (the largest round, with most payments in 2020)</li>
          <li><strong>CFAP Additional</strong> — $5.1 billion in supplemental payments</li>
          <li><strong>CFAP3</strong> — $4.3 billion targeting previously underserved producers</li>
        </ul>
        <p>
          The combined impact pushed 2020 total farm subsidy spending to <strong>$38.7 billion</strong> — more than 6x the 2017 baseline. Read our full <Link href="/analysis/covid-spending" className="text-primary hover:underline">COVID spending analysis</Link>.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Trade War Compensation: MFP Payments</h2>
        <p>
          The <strong>Market Facilitation Program (MFP)</strong> was created in 2018 to compensate farmers for losses due to retaliatory tariffs during the U.S.-China trade war. Total MFP spending reached <strong>$13.5 billion for non-specialty crops</strong> and <strong>$8.2 billion overall for crops</strong>, with additional payments for dairy, hogs, and specialty crops.
        </p>
        <p>
          MFP payments were controversial because they:
        </p>
        <ul>
          <li>Were not authorized by the Farm Bill but used CCC emergency authority</li>
          <li>Were calculated per acre rather than per bushel of actual loss</li>
          <li>Disproportionately benefited large operations and certain crop regions</li>
          <li>Created payments in 2019 that rivaled regular farm programs</li>
        </ul>
        <p>
          Iowa alone received $1.48 billion in MFP payments, and Illinois received $1.4 billion. Read our <Link href="/analysis/trade-war" className="text-primary hover:underline">trade war spending analysis</Link>.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Natural Disaster Programs</h2>
        <p>
          Beyond COVID and trade wars, the USDA operates permanent disaster assistance programs:
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-gray-900">Livestock Forage Program (LFP) — $7 Billion</h3>
        <p>
          LFP compensates ranchers when drought conditions cause grazing losses on eligible land. The program surged from $166M in 2019 to <strong>$1.9 billion in 2022</strong> during the severe Western drought — a nearly 12x increase. Oklahoma, Texas, and Kansas are the top recipients.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-gray-900">Emergency Relief Programs (ERP) — $6.6 Billion</h3>
        <p>
          The Emergency Relief Program for non-specialty crops distributed $6.6 billion, primarily in 2022. These payments addressed losses from hurricanes, drought, flooding, and other qualifying disasters. A separate specialty crop ERP distributed $1.2 billion.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-gray-900">Emergency Livestock Assistance (ELAP) — $1.8 Billion</h3>
        <p>
          ELAP covers livestock losses not addressed by other programs — including losses from disease, adverse weather, and feed transportation issues. California ($469M) and Oklahoma ($190M) are among the top recipients, often related to extreme heat and drought impacts on dairy operations.
        </p>

        <h3 className="font-[family-name:var(--font-heading)] text-gray-900">Wildfire and Hurricane Indemnity (WHIP) — $2.5 Billion</h3>
        <p>
          WHIP and WHIP+ provided payments to producers affected by specific disaster events, including the 2017 hurricane season and 2018-2019 wildfires and flooding. One notable payment of $285 million went to sugar beet cooperatives under the WHIP program.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Supplemental Disaster Relief — $5.4 Billion</h2>
        <p>
          The newest major disaster program, Supplemental Disaster Relief for non-specialty crops, distributed <strong>$5.4 billion in 2025</strong> payments. This program addresses crop losses from recent disaster events and represents one of the largest single-year program disbursements outside of CFAP.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">The New Normal?</h2>
        <p>
          Emergency spending has fundamentally changed the farm subsidy landscape. Before 2018, total annual farm subsidy spending rarely exceeded $10 billion. Since then, emergency programs have routinely doubled or tripled total spending. Whether this represents a temporary response to extraordinary circumstances or a permanent shift in agricultural policy remains one of the central questions in farm policy.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Explore More</h2>
        <ul>
          <li><Link href="/analysis/disaster-spending" className="text-primary hover:underline">Disaster Spending Analysis</Link></li>
          <li><Link href="/analysis/covid-spending" className="text-primary hover:underline">COVID Spending Analysis</Link></li>
          <li><Link href="/analysis/trade-war" className="text-primary hover:underline">Trade War Spending Analysis</Link></li>
          <li><Link href="/trends" className="text-primary hover:underline">Spending Trends Over Time</Link></li>
          <li><Link href="/facts" className="text-primary hover:underline">25 Farm Subsidy Facts</Link></li>
        </ul>
      </div>
    </div>
  )
}
