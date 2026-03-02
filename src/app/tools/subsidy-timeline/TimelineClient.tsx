'use client'
import { useState, useRef, useEffect } from 'react'

type TimelineEvent = {
  year: number
  title: string
  description: string
  type: 'legislation' | 'milestone' | 'program' | 'crisis'
  amount?: string
}

const EVENTS: TimelineEvent[] = [
  { year: 1933, title: 'Agricultural Adjustment Act', description: 'FDR signs the first major farm subsidy legislation as part of the New Deal. Paid farmers to reduce production to raise crop prices during the Great Depression.', type: 'legislation' },
  { year: 1938, title: 'Agricultural Adjustment Act of 1938', description: 'Established permanent farm support programs including price supports, acreage allotments, and the Federal Crop Insurance Corporation.', type: 'legislation' },
  { year: 1949, title: 'Agricultural Act of 1949', description: 'Created permanent law that still serves as the baseline if Farm Bills expire. Includes high fixed price supports that would trigger if no new legislation passes.', type: 'legislation' },
  { year: 1954, title: 'CCC Charter Act', description: 'Formally chartered the Commodity Credit Corporation as a government-owned entity to stabilize farm income and prices.', type: 'program' },
  { year: 1956, title: 'Soil Bank Program', description: 'First major conservation-through-retirement program. Paid farmers to take cropland out of production — a precursor to CRP.', type: 'program' },
  { year: 1965, title: 'Food and Agriculture Act of 1965', description: 'Introduced direct payments to farmers and voluntary acreage reduction programs. Shifted from price supports toward income support.', type: 'legislation' },
  { year: 1970, title: 'Agricultural Act of 1970', description: 'Set payment limitations for the first time ($55,000 per person) and expanded the concept of target prices.', type: 'legislation' },
  { year: 1973, title: 'Agriculture and Consumer Protection Act', description: 'Introduced target prices and deficiency payments. Ended supply management in favor of market-oriented production with a safety net.', type: 'legislation' },
  { year: 1980, title: 'Farm Crisis Begins', description: 'Interest rates spike, land values collapse, and thousands of farms go bankrupt. Farm debt reaches $215 billion. Triggers massive government intervention.', type: 'crisis' },
  { year: 1985, title: 'Food Security Act of 1985', description: 'Created the Conservation Reserve Program (CRP), one of the largest environmental programs in U.S. history. Now pays $1.7B/year to retire sensitive cropland.', type: 'legislation', amount: '$1.7B/year' },
  { year: 1996, title: 'Freedom to Farm Act', description: 'Attempted to phase out subsidies with fixed "transition payments." Instead, Congress passed emergency bailouts every year when prices dropped, spending more than before.', type: 'legislation' },
  { year: 1998, title: 'Emergency Farm Spending', description: 'Congress passes the first of many emergency supplemental appropriations for farmers: $5.9 billion. Emergency spending continues annually through 2001.', type: 'crisis', amount: '$5.9B' },
  { year: 2002, title: 'Farm Security and Rural Investment Act', description: 'Reversed the 1996 reforms. Reintroduced countercyclical payments, increased loan rates, and added new programs. Total cost: $190 billion over 10 years.', type: 'legislation', amount: '$190B/10yr' },
  { year: 2008, title: 'Food, Conservation, and Energy Act', description: 'Added ACRE (Average Crop Revenue Election) as a revenue-based alternative to price supports. Expanded conservation and nutrition programs.', type: 'legislation' },
  { year: 2014, title: 'Agricultural Act of 2014', description: 'Eliminated direct payments. Created ARC (Agriculture Risk Coverage) and PLC (Price Loss Coverage) as the new safety net. ARC has paid $9.2B since 2017.', type: 'legislation', amount: '$9.2B via ARC' },
  { year: 2017, title: 'OpenSubsidies Data Begins', description: 'The earliest payment records in our database. Covers ARC, PLC, CRP, and dozens of other ongoing programs across all 50 states.', type: 'milestone' },
  { year: 2018, title: 'Trade War Begins', description: 'Retaliatory tariffs from China hammer U.S. agriculture. USDA creates the Market Facilitation Program (MFP) to compensate farmers: $8.2B in emergency payments.', type: 'crisis', amount: '$8.2B MFP' },
  { year: 2019, title: 'MFP Round 2', description: 'Second round of Market Facilitation Program payments as trade war continues. Total MFP spending reaches $13.5B — more than most annual farm programs.', type: 'crisis', amount: '$13.5B total MFP' },
  { year: 2020, title: 'COVID-19: CFAP Created', description: 'Coronavirus Food Assistance Program (CFAP) distributes $23.5B in emergency payments. Largest single-year farm spending event in history. Top recipients receive millions.', type: 'crisis', amount: '$23.5B CFAP' },
  { year: 2021, title: 'Emergency Relief Program', description: 'ERP provides $6.6B for crop losses from natural disasters in 2020-2021. Combined with ongoing CFAP payments, total emergency spending exceeds $30B in two years.', type: 'program', amount: '$6.6B ERP' },
  { year: 2022, title: 'Inflation Reduction Act', description: 'Allocates $19.5B for USDA conservation programs — the largest-ever conservation investment. Expands EQIP, CSP, ACEP, and RCPP.', type: 'legislation', amount: '$19.5B conservation' },
  { year: 2023, title: 'Farm Bill Expires', description: 'The 2018 Farm Bill expires without a replacement. Congress passes one-year extensions while debating the next bill. Permanent law from 1938/1949 looms as a backstop.', type: 'legislation' },
  { year: 2024, title: 'Dairy Margin Coverage Boom', description: 'Low milk margins trigger record Dairy Margin Coverage payments of $2.4B. Program created in 2018 Farm Bill as replacement for Margin Protection Program.', type: 'milestone', amount: '$2.4B DMC' },
  { year: 2025, title: 'ECAP: $9.4B Emergency Program', description: 'Emergency Commodity Assistance Program distributes $9.4B in a single year — the largest single-program payout in our database. Farm Bill negotiations continue.', type: 'crisis', amount: '$9.4B ECAP' },
]

const TYPE_COLORS: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  legislation: { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-800', icon: '🏛️' },
  milestone: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-800', icon: '📌' },
  program: { bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-800', icon: '📋' },
  crisis: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-800', icon: '⚠️' },
}

export default function SubsidyTimelineClient() {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const filtered = activeFilter === 'all' ? EVENTS : EVENTS.filter(e => e.type === activeFilter)

  const filters = [
    { key: 'all', label: 'All Events' },
    { key: 'legislation', label: '🏛️ Legislation' },
    { key: 'crisis', label: '⚠️ Crises' },
    { key: 'program', label: '📋 Programs' },
    { key: 'milestone', label: '📌 Milestones' },
  ]

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => { setActiveFilter(f.key); setExpandedIdx(null) }}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeFilter === f.key
                ? 'bg-green-700 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className="relative">
        {/* Center line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-green-200 -translate-x-1/2" />

        <div className="space-y-6">
          {filtered.map((event, i) => {
            const colors = TYPE_COLORS[event.type]
            const isExpanded = expandedIdx === i
            const isLeft = i % 2 === 0

            return (
              <div key={i} className={`relative flex items-start ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-green-600 border-2 border-white shadow z-10 mt-5" />

                {/* Spacer for mobile */}
                <div className="w-12 md:hidden flex-shrink-0" />

                {/* Content */}
                <div className={`flex-1 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'} md:w-1/2`}>
                  <button
                    onClick={() => setExpandedIdx(isExpanded ? null : i)}
                    className={`w-full text-left md:${isLeft ? 'text-right' : 'text-left'} ${colors.bg} ${colors.border} border rounded-xl p-4 hover:shadow-md transition-all`}
                  >
                    <div className={`flex items-center gap-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                      <span className="text-lg">{colors.icon}</span>
                      <span className="text-sm font-bold text-gray-500">{event.year}</span>
                      {event.amount && (
                        <span className="text-xs font-bold bg-white/80 px-2 py-0.5 rounded-full text-gray-700">{event.amount}</span>
                      )}
                    </div>
                    <h3 className={`font-bold ${colors.text} mt-1`}>{event.title}</h3>
                    {isExpanded && (
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">{event.description}</p>
                    )}
                    {!isExpanded && (
                      <p className="text-xs text-gray-400 mt-1">Click to read more</p>
                    )}
                  </button>
                </div>

                {/* Other side spacer */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            )
          })}
        </div>
      </div>

      {/* Summary stats */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-800">92</div>
          <div className="text-xs text-green-700">Years of Farm Subsidies</div>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-800">18</div>
          <div className="text-xs text-green-700">Major Farm Bills</div>
        </div>
        <div className="bg-red-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-800">$50B+</div>
          <div className="text-xs text-red-700">Emergency Spending (2018–25)</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-800">$147B</div>
          <div className="text-xs text-blue-700">Total in Our Database</div>
        </div>
      </div>
    </div>
  )
}
