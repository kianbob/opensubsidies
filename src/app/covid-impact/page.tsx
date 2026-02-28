import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import CovidCharts from './CovidCharts'

export const metadata: Metadata = {
  title: 'Before & After COVID: How the Pandemic Changed Farm Subsidies Forever',
  description: 'Farm subsidies jumped 63% in 2020 — from $23.7B to $38.7B. Compare every metric before and after COVID reshaped USDA spending.',
  alternates: { canonical: 'https://www.opensubsidies.org/covid-impact' },
}

export default function CovidImpactPage() {
  const yearly = loadData('yearly.json') as { year: number; amount: number; payments: number }[]
  const stateYearly = loadData('state-yearly.json') as { state: string; year: number; amount: number; payments: number }[]

  const pre = yearly.filter(y => y.year >= 2017 && y.year <= 2019)
  const post = yearly.filter(y => y.year >= 2020 && y.year <= 2022)
  const preAvg = { amount: pre.reduce((s,y)=>s+y.amount,0)/3, payments: pre.reduce((s,y)=>s+y.payments,0)/3 }
  const postAvg = { amount: post.reduce((s,y)=>s+y.amount,0)/3, payments: post.reduce((s,y)=>s+y.payments,0)/3 }
  const y2019 = yearly.find(y => y.year === 2019)!
  const y2020 = yearly.find(y => y.year === 2020)!
  const pctChange = ((y2020.amount / y2019.amount - 1) * 100).toFixed(0)

  // State changes
  const s19: Record<string,number> = {}, s20: Record<string,number> = {}
  stateYearly.filter(s=>s.year===2019).forEach(s => s19[s.state]=s.amount)
  stateYearly.filter(s=>s.year===2020).forEach(s => s20[s.state]=s.amount)
  const stateChanges = Object.keys(s20)
    .filter(st => (s19[st]||0) > 1e8 || s20[st] > 1e8)
    .map(st => ({ state: st, before: s19[st]||0, after: s20[st], pct: s19[st] ? ((s20[st]/s19[st]-1)*100) : 999 }))
    .sort((a,b) => b.pct - a.pct)

  const chartData = yearly.filter(y => y.year >= 2017 && y.year <= 2024).sort((a,b) => a.year - b.year)

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <ArticleSchema slug="covid-impact" title="Before & After COVID: How the Pandemic Changed Farm Subsidies Forever" description="Farm subsidies jumped 63% in 2020. Compare every metric before and after." />
      <Breadcrumbs items={[{ label: 'COVID Impact' }]} />

      <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
        Before &amp; After COVID: How the Pandemic Changed Farm Subsidies
      </h1>
      <p className="text-gray-600 mb-6">
        In 2020, COVID-19 triggered emergency farm payments that shattered every spending record. Here&apos;s how every metric changed — and what never went back to normal.
      </p>
      <ShareButtons title="Before & After COVID: How the Pandemic Changed Farm Subsidies" />

      {/* The Big Number */}
      <div className="mt-8 bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-8 border border-red-200 text-center">
        <div className="text-5xl md:text-6xl font-bold text-red-700">+{pctChange}%</div>
        <p className="text-lg text-gray-700 mt-2">Farm subsidy spending increase in 2020</p>
        <p className="text-sm text-gray-500 mt-1">{fmtMoney(y2019.amount)} → {fmtMoney(y2020.amount)} in a single year</p>
      </div>

      {/* Before/After Comparison Grid */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6 text-center">The Before &amp; After</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <div className="text-center mb-4">
              <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">BEFORE: 2017–2019 Average</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Annual Spending</span>
                <span className="text-xl font-bold text-gray-900">{fmtMoney(preAvg.amount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Annual Payments</span>
                <span className="text-xl font-bold text-gray-900">{fmt(Math.round(preAvg.payments))}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg Payment Size</span>
                <span className="text-xl font-bold text-gray-900">{fmtMoney(preAvg.amount / preAvg.payments)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Top Programs</span>
                <span className="text-sm text-gray-700">CRP, PLC, ARC</span>
              </div>
            </div>
          </div>

          {/* After */}
          <div className="bg-white rounded-xl border-2 border-red-300 p-6 ring-2 ring-red-100">
            <div className="text-center mb-4">
              <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">AFTER: 2020–2022 Average</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Annual Spending</span>
                <div className="text-right">
                  <span className="text-xl font-bold text-red-700">{fmtMoney(postAvg.amount)}</span>
                  <span className="text-xs text-red-600 ml-2">+{((postAvg.amount/preAvg.amount-1)*100).toFixed(0)}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Annual Payments</span>
                <div className="text-right">
                  <span className="text-xl font-bold text-gray-900">{fmt(Math.round(postAvg.payments))}</span>
                  <span className="text-xs text-green-600 ml-2">{((postAvg.payments/preAvg.payments-1)*100).toFixed(0)}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg Payment Size</span>
                <div className="text-right">
                  <span className="text-xl font-bold text-red-700">{fmtMoney(postAvg.amount / postAvg.payments)}</span>
                  <span className="text-xs text-red-600 ml-2">+{((postAvg.amount/postAvg.payments)/(preAvg.amount/preAvg.payments)*100-100).toFixed(0)}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Top Programs</span>
                <span className="text-sm text-red-700 font-medium">CFAP, MFP, Emergency</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chart */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">Spending Over Time</h2>
        <CovidCharts data={chartData} />
      </section>

      {/* Key Shifts */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">5 Things That Changed</h2>
        <div className="space-y-4">
          {[
            { num: '01', title: 'Emergency programs became the norm', desc: 'Before COVID, traditional programs (CRP, PLC, ARC) dominated. After 2020, emergency programs like CFAP, WHIP+, and supplemental disaster relief routinely outspend traditional programs.' },
            { num: '02', title: 'Average payment size exploded', desc: `The average payment jumped from ${fmtMoney(preAvg.amount/preAvg.payments)} to ${fmtMoney(postAvg.amount/postAvg.payments)}. Larger emergency checks replaced the smaller, steadier traditional payments.` },
            { num: '03', title: 'Geographic winners shifted', desc: 'States like California (+377%), Florida (+417%), and New York (+376%) saw the biggest increases — states that historically received less in traditional farm programs.' },
            { num: '04', title: 'Spending never fully returned to baseline', desc: 'Even in 2022–2024, annual spending remained well above pre-2018 levels. The new baseline is higher, with disaster relief and emergency programs creating a permanent spending floor.' },
            { num: '05', title: 'The political calculus changed', desc: 'When every state receives emergency farm payments, farm subsidies gain broader political support. COVID made farm spending a national issue, not just a Midwest one.' },
          ].map(item => (
            <div key={item.num} className="flex gap-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-sm">{item.num}</div>
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* State Changes Table */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">Biggest State Changes: 2019 → 2020</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">State</th>
                <th className="px-4 py-3 text-right font-semibold">2019</th>
                <th className="px-4 py-3 text-right font-semibold">2020</th>
                <th className="px-4 py-3 text-right font-semibold">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stateChanges.slice(0, 15).map(s => (
                <tr key={s.state} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <Link href={`/states/${s.state.toLowerCase()}`} className="text-primary font-medium hover:underline">{s.state}</Link>
                  </td>
                  <td className="px-4 py-2 text-right font-mono text-gray-600">{fmtMoney(s.before)}</td>
                  <td className="px-4 py-2 text-right font-mono">{fmtMoney(s.after)}</td>
                  <td className={`px-4 py-2 text-right font-semibold ${s.pct > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {s.pct > 0 ? '+' : ''}{s.pct.toFixed(0)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Explore */}
      <section className="mt-8 bg-green-50 border-l-4 border-primary p-6 rounded-r-lg">
        <h3 className="font-semibold text-gray-900 mb-3">Related Analysis</h3>
        <ul className="space-y-2 text-sm">
          <li>→ <Link href="/analysis/covid-spending" className="text-primary hover:underline">COVID Changed Farm Subsidies Forever</Link> — Full deep dive</li>
          <li>→ <Link href="/years/2020" className="text-primary hover:underline">2020: The Record Year</Link> — Every detail</li>
          <li>→ <Link href="/analysis/disaster-spending" className="text-primary hover:underline">The Disaster Money Machine</Link></li>
          <li>→ <Link href="/surprising-recipients" className="text-primary hover:underline">Most Surprising Recipients</Link></li>
          <li>→ <Link href="/analysis/trade-war" className="text-primary hover:underline">Trade War Fallout</Link> — The spending spike that preceded COVID</li>
        </ul>
      </section>
    </div>
  )
}
