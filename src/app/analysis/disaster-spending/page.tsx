import Breadcrumbs from '@/components/Breadcrumbs'
import { fmtMoney, fmt, formatProgram } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import Link from 'next/link'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'The Disaster Money Machine: $20 Billion in Emergency Farm Payments',
  description: 'Emergency and disaster programs now dwarf traditional farm subsidies. ECAP, CFAP, and livestock relief programs paid out over $20 billion in 2017-2025.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/disaster-spending' },
  openGraph: {
    title: `The Disaster Money Machine: $20 Billion in Emergency Farm Payments`,
    description: `Emergency and disaster programs now dwarf traditional farm subsidies. ECAP, CFAP, and livestock relief programs paid out over $20 billion in 2017-2025.`,
    url: 'https://www.opensubsidies.org/analysis/disaster-spending',
    type: 'article',
  },
}

export default function DisasterSpending() {
  const programs = loadData('programs.json')
  const stats = loadData('stats.json')
  const yearly = loadData('yearly.json') as { year: number; amount: number; payments: number }[]

  const disasterProgs = programs.filter((p: { program: string }) =>
    /EMERGENCY|DISASTER|RELIEF|ELAP|CFAP/i.test(p.program)
  )
  const disasterTotal = disasterProgs.reduce((s: number, p: { amount: number }) => s + p.amount, 0)
  const disasterPayments = disasterProgs.reduce((s: number, p: { payments: number }) => s + p.payments, 0)
  const disasterPct = ((disasterTotal / stats.totalAmount) * 100).toFixed(0)
  const avgDisasterPayment = disasterTotal / (disasterPayments || 1)
  const nonDisasterTotal = stats.totalAmount - disasterTotal

  // Traditional programs for comparison
  const traditionalProgs = programs.filter((p: { program: string }) =>
    /CRP|ARC|PLC|PRICE LOSS|LOAN DEFICIENCY/i.test(p.program)
  )
  const traditionalTotal = traditionalProgs.reduce((s: number, p: { amount: number }) => s + p.amount, 0)

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema title="The Disaster Money Machine: $20 Billion in Emergency Farm Payments" description="Emergency and disaster programs now dwarf traditional farm subsidies. ECAP, CFAP, and livestock relief programs paid out over $20 billion in 2017-2025." slug="analysis/disaster-spending" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Disaster Spending' }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'The Disaster Money Machine: Emergency Farm Payments',
        author: { '@type': 'Organization', name: 'TheDataProject.ai' },
        publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.org' },
        datePublished: '2026-02-27', dateModified: '2026-02-27',
      })}} />

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How much does the USDA spend on emergency farm programs?', acceptedAnswer: { '@type': 'Answer', text: `Between 2017 and 2025, emergency and disaster programs distributed ${fmtMoney(disasterTotal)} — ${disasterPct}% of all farm subsidies. This includes programs like CFAP (COVID relief), ELAP (livestock emergencies), ERP (Emergency Relief Program), and various disaster assistance programs.` }},
          { '@type': 'Question', name: 'What is CFAP?', acceptedAnswer: { '@type': 'Answer', text: 'The Coronavirus Food Assistance Program (CFAP) was created in 2020 to compensate farmers for losses related to the COVID-19 pandemic. CFAP distributed billions in direct payments to agricultural producers, making it one of the largest emergency farm programs in history.' }},
          { '@type': 'Question', name: 'Are emergency farm programs subject to payment limits?', acceptedAnswer: { '@type': 'Answer', text: 'Emergency programs often have separate payment limits from regular commodity programs, and some have had higher or no caps. This means recipients can collect far more from emergency programs than from traditional subsidies, reducing the effectiveness of payment limit controls.' }},
          { '@type': 'Question', name: 'Why has emergency farm spending increased so much?', acceptedAnswer: { '@type': 'Answer', text: 'Three factors drove the surge: trade war losses (2018-2019) led to Market Facilitation Payments, the COVID-19 pandemic (2020) triggered CFAP, and increasing climate-related disasters created ongoing demand for disaster assistance. Once emergency spending infrastructure was created, it proved easy to expand for subsequent crises.' }},
        ]
      })}} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · February 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          The Disaster Money Machine: {fmtMoney(disasterTotal)} in Emergency Farm Payments
        </h1>
        <ShareButtons title="" />
        <p className="text-lg text-gray-600">
          Emergency and disaster relief programs now account for {disasterPct}% of all farm subsidy spending.
          What started as a safety net has become the primary mechanism for federal agricultural support.
        </p>
      </div>

      <div className="prose max-w-none">
        {/* Key stats */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Emergency Programs', value: disasterProgs.length.toString() },
            { label: 'Total Emergency Spending', value: fmtMoney(disasterTotal) },
            { label: 'Share of All Subsidies', value: `${disasterPct}%` },
            { label: 'Avg Emergency Payment', value: fmtMoney(avgDisasterPayment) },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Shift to Emergency Spending</h2>
        <p>
          Traditional farm subsidies — direct payments, price supports, crop insurance — used to be the backbone
          of federal agricultural spending. Not anymore. Our analysis of {fmt(stats.totalPayments)} USDA payment
          records shows that emergency and disaster programs now dominate the farm subsidy landscape.
        </p>
        <p>
          To put this in perspective: traditional programs like CRP, ARC, and PLC distributed {fmtMoney(traditionalTotal)} —
          while emergency programs distributed {fmtMoney(disasterTotal)}. The &quot;emergency&quot; category has outgrown
          the programs that were designed to be the permanent safety net.
        </p>

        <div className="bg-amber-50 border-l-4 border-accent p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 Key Finding</p>
          <p className="text-sm text-gray-700 mt-1">
            {disasterProgs.length} emergency/disaster programs paid out {fmtMoney(disasterTotal)} — that&apos;s
            {' '}{disasterPct}% of all farm subsidies in our dataset. The remaining {fmtMoney(nonDisasterTotal)} went
            through traditional programs.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Biggest Emergency Programs</h2>
        <div className="not-prose my-6">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Program</th>
                  <th className="px-4 py-2 text-right font-semibold">Amount</th>
                  <th className="px-4 py-2 text-right font-semibold">Payments</th>
                  <th className="px-4 py-2 text-right font-semibold">Avg Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {disasterProgs.sort((a: { amount: number }, b: { amount: number }) => b.amount - a.amount).slice(0, 15).map((p: { program: string; amount: number; payments: number }, i: number) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{formatProgram(p.program)}</td>
                    <td className="px-4 py-2 text-right font-mono">{fmtMoney(p.amount)}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{fmt(p.payments)}</td>
                    <td className="px-4 py-2 text-right font-mono text-gray-500">{fmtMoney(p.amount / p.payments)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Three Crises That Changed Everything</h2>
        <p>
          Three consecutive crises transformed emergency spending from occasional to dominant:
        </p>
        <ul>
          <li>
            <strong>Trade Wars (2018–2019):</strong> The Trump administration&apos;s tariffs on Chinese goods triggered
            retaliatory tariffs on U.S. agricultural exports. The USDA responded with Market Facilitation Payments
            totaling billions — direct checks to farmers affected by trade disruptions.
          </li>
          <li>
            <strong>COVID-19 Pandemic (2020):</strong> The Coronavirus Food Assistance Program (CFAP) distributed
            billions more to compensate for pandemic-related market disruptions, supply chain breakdowns, and
            price collapses.
          </li>
          <li>
            <strong>Climate Disasters (2020–present):</strong> Droughts, hurricanes, wildfires, and floods triggered
            the Emergency Relief Program (ERP) and other disaster assistance, creating an ongoing stream of
            emergency spending.
          </li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)]">The Oversight Problem</h2>
        <p>
          Emergency spending is harder to scrutinize than regular farm bill programs. When every year brings
          new &quot;emergency&quot; appropriations, the distinction between regular support and crisis response
          disappears. Farmers who once relied on crop insurance and price supports now depend on ad hoc
          disaster programs that Congress creates with less oversight and fewer guardrails.
        </p>
        <p>
          Regular farm bill programs go through years of debate, Committee hearings, and CBO scoring before
          being authorized. Emergency programs can be created by executive order or fast-tracked supplemental
          appropriations with minimal debate. The result: billions in spending with a fraction of the scrutiny.
        </p>

        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-red-800">⚠️ The Accountability Deficit</p>
          <p className="text-sm text-red-700 mt-1">
            Emergency farm programs are created faster, with less debate, and often with higher or no payment limits.
            They receive less GAO oversight and fewer performance audits than permanent programs. Yet they now
            account for {disasterPct}% of all farm spending.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Who Benefits from Emergency Spending?</h2>
        <p>
          The same operations that dominate traditional subsidies also dominate emergency spending. Large
          commodity producers — the ones growing thousands of acres of corn, soybeans, and cotton — receive
          the largest emergency payments because programs are typically proportional to production volume
          or historical revenue.
        </p>
        <p>
          Small and diversified farms, which are arguably more vulnerable to disasters, receive proportionally
          less because they produce less of the commodities covered by emergency programs. A farmer growing
          specialty vegetables for a farmers market gets little from CFAP, while a 5,000-acre corn operation
          might receive hundreds of thousands.
        </p>
        <p>
          For more on who collects the most, see our <Link href="/analysis/subsidy-concentration">subsidy concentration analysis</Link> and
          the <Link href="/analysis/corporate-farms">corporate farm recipients breakdown</Link>.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Moral Hazard Problem</h2>
        <p>
          When farmers know that every major crisis will trigger a new emergency payment program, their
          incentive to manage risk privately diminishes. Why invest in crop insurance when Congress will
          bail you out? Why diversify your operation when monoculture losses get covered by taxpayers?
        </p>
        <p>
          Economists call this moral hazard, and it&apos;s a real concern in emergency farm spending. The
          pattern of the last decade — crisis, emergency program, crisis, emergency program — has
          taught farmers that the federal government will always step in. This reduces private
          risk management and increases demand for future emergency spending, creating a self-reinforcing cycle.
        </p>
        <p>
          Private crop insurance already exists and is heavily subsidized (taxpayers pay about 60% of
          premiums). If the existing insurance system is inadequate, the answer should be fixing insurance —
          not layering ad hoc emergency programs on top. But fixing insurance is boring. Emergency programs
          let politicians announce dramatic relief packages and take credit for &quot;helping farmers.&quot;
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Permanent Emergency</h2>
        <p>
          The question isn&apos;t whether farmers need help during genuine disasters — they do. The question is
          whether a system built on perpetual emergencies is the most efficient or accountable way to
          support American agriculture. With climate change increasing the frequency of extreme weather,
          the disaster spending machine shows no signs of slowing down.
        </p>
        <p>
          If emergency is the new normal, shouldn&apos;t Congress build these costs into the regular farm bill
          instead of pretending each crisis is a one-time event? The current approach gives Congress the
          political benefit of &quot;responding to emergencies&quot; while avoiding the harder work of designing
          a permanent safety net that&apos;s properly budgeted and overseen.
        </p>
        <p>
          For the longer-term view, see our <Link href="/analysis/decade-of-disaster">decade of disaster analysis</Link>,
          or explore <Link href="/trends">spending trends over time</Link>.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The Insurance Alternative</h2>
        <p>
          The federal government already subsidizes crop insurance heavily — paying about 60% of
          farmer premiums through the Federal Crop Insurance Corporation. In theory, this should
          provide adequate protection against losses. In practice, farmers increasingly bypass
          insurance and rely on ad hoc emergency programs instead.
        </p>
        <p>
          This creates a bizarre situation: taxpayers fund crop insurance <em>and</em> emergency
          programs that duplicate what insurance should cover. It&apos;s like paying for car insurance
          and then getting a separate government check every time you have an accident. The redundancy
          benefits farmers (who get paid twice for the same loss) but costs taxpayers dearly.
        </p>
        <p>
          A rational reform would strengthen crop insurance to cover the losses currently addressed
          by emergency programs, then eliminate the emergency programs. But that would require
          taking something away from farmers — and no politician wants to be the one to do it.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Source</p>
          <p>Analysis based on USDA Farm Service Agency payment records, 2017-2025. Programs classified as
          &quot;emergency/disaster&quot; based on program name containing Emergency, Disaster, Relief, ELAP, or CFAP.
          See the full program list on our <Link href="/programs" className="text-primary hover:underline">Programs page</Link>.</p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Accountability Question</h2>
        <p>
          At {fmtMoney(disasterTotal)}, emergency farm spending is too large to operate without
          meaningful accountability. Yet emergency programs receive less scrutiny than regular
          farm bill programs — less CBO scoring, fewer hearings, and often no sunset provisions.
        </p>
        <p>
          Taxpayers deserve to know: Did emergency payments go to farmers who actually suffered
          losses? Were payments proportional to actual damage? Could the same protection have been
          achieved through existing crop insurance? These questions aren&apos;t routinely asked, let alone
          answered, in the current emergency spending framework.
        </p>
        <p>
          The disaster spending machine keeps growing because no one has the political incentive to
          slow it down. Farmers want the money. Politicians want the credit. And taxpayers don&apos;t know
          enough about the system to demand better. This page is a small step toward changing that.
        </p>
        <p>
          With {disasterProgs.length} emergency programs distributing {fmtMoney(disasterTotal)} in
          taxpayer funds, the scale of disaster spending demands the same level of scrutiny we apply
          to any other major federal expenditure. The era of &quot;emergency&quot; spending operating in the
          shadows of the farm budget should end. Transparency is the first step.
        </p>
        <p>
          Every taxpayer contributes to these programs. Every taxpayer deserves to understand
          where the money goes, why it goes there, and whether it&apos;s achieving its stated
          purpose of helping farmers survive genuine disasters — or simply enriching the
          largest operations through a system of perpetual &quot;emergencies.&quot;
        </p>

        <RelatedArticles currentSlug="disaster-spending" />
      </div>
    </article>
  )
}
