import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import Link from 'next/link'
import { fmtMoney, slugify } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'USDA Program Name Decoder: What Every Farm Program Actually Does',
  description: 'Plain-English guide to every major USDA farm program acronym: CRP, PLC, ARC, CFAP, MFP, DMC, EQIP, and more. What they do, who they help, and how much they cost.',
  alternates: { canonical: 'https://www.opensubsidies.org/program-decoder' },
}

type ProgramData = { program: string; amount: number; payments: number }

const CATEGORIES: { name: string; icon: string; description: string; programs: { acronym: string; fullName: string; searchKey: string; what: string; who: string }[] }[] = [
  {
    name: 'Conservation Programs',
    icon: '🌿',
    description: 'Programs that pay farmers to protect soil, water, and wildlife habitat — often by taking land out of production.',
    programs: [
      { acronym: 'CRP', fullName: 'Conservation Reserve Program', searchKey: 'CRP PAYMENT', what: 'Pays farmers annual rent to keep environmentally sensitive cropland out of production for 10-15 years. Land is planted with grasses or trees instead.', who: 'Landowners with eligible cropland, especially in erosion-prone areas. Popular in the Great Plains and Midwest.' },
      { acronym: 'EQIP', fullName: 'Environmental Quality Incentives Program', searchKey: 'EQIP', what: 'Provides cost-share payments for farmers to install conservation practices like cover crops, irrigation efficiency, and erosion control.', who: 'Active farmers and ranchers wanting to improve environmental outcomes on working land.' },
    ],
  },
  {
    name: 'Commodity Support Programs',
    icon: '🌾',
    description: 'Programs that guarantee minimum prices or revenue for major crops like corn, soybeans, wheat, and rice.',
    programs: [
      { acronym: 'PLC', fullName: 'Price Loss Coverage', searchKey: 'PRICE LOSS COVERAGE PROGRAM', what: 'Pays farmers when the national average price for a covered commodity drops below a reference price set by Congress. Payments are per-acre based on historical yields.', who: 'Farmers growing wheat, corn, rice, peanuts, sorghum, and other covered commodities. Popular in the South and Plains.' },
      { acronym: 'ARC', fullName: 'Agricultural Risk Coverage', searchKey: 'AGRICULTURAL RISK COVERAGE PROG - COUNTY', what: 'Pays farmers when county-level (or individual) crop revenue falls below a benchmark based on recent history. Alternative to PLC — farmers choose one or the other.', who: 'Corn and soybean farmers in the Midwest and Northern Plains who prefer revenue-based protection.' },
    ],
  },
  {
    name: 'Emergency & Disaster Programs',
    icon: '🚨',
    description: 'Programs created in response to natural disasters, pandemics, and other crises. Many are one-time or temporary.',
    programs: [
      { acronym: 'CFAP', fullName: 'Coronavirus Food Assistance Program', searchKey: 'CFAPCCA2', what: 'Emergency COVID-19 payments to farmers and ranchers who suffered price declines and market disruptions during the pandemic. Multiple rounds (CFAP1, CFAP2, CFAP3).', who: 'Nearly all farmers — from cattle ranchers to specialty crop growers to dairy farmers. Broadest eligibility of any recent program.' },
      { acronym: 'WHIP+', fullName: 'Wildfire and Hurricane Indemnity Program Plus', searchKey: 'WHIP PLUS', what: 'Payments to farmers who suffered losses from hurricanes, wildfires, floods, and other natural disasters in 2018-2019.', who: 'Farmers in disaster-affected areas, particularly the Southeast (hurricanes) and West (wildfires).' },
      { acronym: 'ERP', fullName: 'Emergency Relief Program', searchKey: 'EMGNCY RELIEF PRGM', what: 'Payments covering crop losses from qualifying natural disasters in 2020-2022. Two tracks: one formula-based, one for uncovered losses.', who: 'Farmers with documented crop losses from droughts, floods, hurricanes, wildfires, and freezes.' },
    ],
  },
  {
    name: 'Trade War Programs',
    icon: '⚔️',
    description: 'Programs created to compensate farmers for losses caused by retaliatory tariffs during the 2018-2019 trade disputes.',
    programs: [
      { acronym: 'MFP', fullName: 'Market Facilitation Program', searchKey: 'MARKET FACILITATION PROGRAM', what: 'Direct payments to farmers affected by retaliatory tariffs from China and other countries. Paid per-acre for crop farmers and per-head for livestock.', who: 'Soybean, corn, wheat, sorghum, cotton, dairy, and hog farmers. Iowa, Illinois, and Minnesota were top recipients.' },
    ],
  },
  {
    name: 'Dairy Programs',
    icon: '🐄',
    description: 'Programs specifically for dairy farmers, protecting against volatile milk prices and high feed costs.',
    programs: [
      { acronym: 'DMC', fullName: 'Dairy Margin Coverage', searchKey: 'DAIRY MARGIN COVERAGE', what: 'Insurance-like program that pays dairy farmers when the margin between milk prices and feed costs falls below a chosen coverage level.', who: 'Dairy farmers nationwide, with premiums subsidized for the first 5 million pounds of milk (favoring smaller operations).' },
    ],
  },
  {
    name: 'Livestock Programs',
    icon: '🐂',
    description: 'Programs for ranchers facing drought, disease, and other threats to livestock operations.',
    programs: [
      { acronym: 'LFP', fullName: 'Livestock Forage Program', searchKey: 'LIVESTOCK FORAGE PROGRAM', what: 'Payments to ranchers in drought-affected counties who face increased feed costs because pasture conditions have deteriorated.', who: 'Cattle, sheep, and goat ranchers in counties experiencing drought (as measured by the U.S. Drought Monitor).' },
      { acronym: 'ELAP', fullName: 'Emergency Assistance for Livestock, Honeybees and Farm-raised Fish', searchKey: 'EMERG ASSIST LIVESTOCK BEES FISH', what: 'Covers losses from disease, adverse weather, and feed/water shortages not covered by other programs.', who: 'Livestock producers, beekeepers, and aquaculture operations facing losses beyond what LFP covers.' },
    ],
  },
]

export default function ProgramDecoderPage() {
  const programs: ProgramData[] = loadData('programs.json')
  const programMap = new Map(programs.map(p => [p.program, p]))

  function findAmount(searchKey: string): number {
    let total = 0
    for (const p of programs) {
      if (p.program.includes(searchKey)) total += p.amount
    }
    return total
  }

  function findProgramSlug(searchKey: string): string | null {
    // Find the best matching program (highest amount) and return its slug
    let best: ProgramData | null = null
    for (const p of programs) {
      if (p.program.includes(searchKey) && (!best || p.amount > best.amount)) best = p
    }
    return best ? slugify(best.program) : null
  }

  const faqItems = [
    { q: 'What is CRP (Conservation Reserve Program)?', a: 'CRP pays farmers annual rent to take environmentally sensitive cropland out of production for 10-15 years. It\'s the largest conservation program at over $15.7 billion since 2017.' },
    { q: 'What is PLC (Price Loss Coverage)?', a: 'PLC is a commodity support program that pays farmers when national average crop prices fall below Congress-set reference prices. It\'s one of the two main "safety net" programs in the Farm Bill.' },
    { q: 'What is CFAP (Coronavirus Food Assistance Program)?', a: 'CFAP was an emergency COVID-19 relief program that provided direct payments to farmers and ranchers who suffered price declines during the pandemic. Multiple rounds distributed over $30 billion.' },
    { q: 'What is the difference between PLC and ARC?', a: 'PLC protects against low prices (nationally), while ARC protects against low revenue (at the county or individual level). Farmers must choose one or the other for each crop. PLC is popular for wheat/rice; ARC for corn/soybeans.' },
    { q: 'What is MFP (Market Facilitation Program)?', a: 'MFP was created in 2018-2019 to compensate farmers for losses caused by retaliatory tariffs during the U.S.-China trade war. It distributed over $23 billion, primarily to soybean and corn farmers.' },
    { q: 'What is DMC (Dairy Margin Coverage)?', a: 'DMC is an insurance-like program for dairy farmers that pays when the margin between milk prices and feed costs falls below a chosen level. It replaced the older Margin Protection Program.' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Program Decoder' }]} />

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          USDA Program Name Decoder
        </h1>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-lg text-gray-600">What every farm program acronym actually means — in plain English.</p>
          <ShareButtons title="USDA Program Name Decoder" />
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-10">
        <p className="text-sm text-amber-800">
          <strong>Why this page exists:</strong> USDA programs have some of the most confusing acronyms in government.
          CRP, PLC, ARC-CO, CFAP, MFP, DMC, LFP, ELAP, ERP, WHIP+ — even farmers struggle to keep them straight.
          This guide explains each one in plain English.
        </p>
      </div>

      {CATEGORIES.map(cat => (
        <section key={cat.name} className="mb-10">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-2 flex items-center gap-2">
            <span>{cat.icon}</span> {cat.name}
          </h2>
          <p className="text-gray-600 mb-4">{cat.description}</p>
          <div className="space-y-4">
            {cat.programs.map(prog => {
              const amount = findAmount(prog.searchKey)
              const progSlug = findProgramSlug(prog.searchKey)
              return (
                <div key={prog.acronym} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-green-300 transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-primary">{prog.acronym}</h3>
                      <p className="text-sm text-gray-500">{prog.fullName}</p>
                    </div>
                    {amount > 0 && (
                      <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded-lg whitespace-nowrap">
                        {fmtMoney(amount)}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm mb-2"><strong>What it does:</strong> {prog.what}</p>
                  <p className="text-gray-700 text-sm mb-3"><strong>Who it helps:</strong> {prog.who}</p>
                  {progSlug && (
                    <Link href={`/programs/${progSlug}`} className="text-sm text-primary hover:underline">
                      View full program details →
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      ))}

      <section className="mt-12 prose max-w-none text-gray-600">
        <h2 className="font-[family-name:var(--font-heading)] text-gray-900">Understanding USDA Program Names</h2>
        <p>
          The USDA administers over 150 distinct farm payment programs, many with overlapping purposes and confusing acronyms.
          This complexity isn&apos;t accidental — each program was created by different farm bills, emergency legislation, or
          executive action, often layering on top of existing programs rather than replacing them.
        </p>
        <p>
          The result is a patchwork system where a single farmer might receive payments from PLC (for low wheat prices),
          CRP (for retired land), CFAP (for COVID losses), and ERP (for drought damage) — all from different legislative
          authorities with different eligibility rules.
        </p>
        <p>
          Browse all programs in our <Link href="/programs" className="text-primary hover:underline">complete program database</Link> or
          use the <Link href="/tools/compare-programs" className="text-primary hover:underline">program comparison tool</Link>.
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }) }}
      />
    </div>
  )
}
