import fs from 'fs'
import path from 'path'

const articles = [
  { slug: 'subsidy-concentration', title: 'The 10% Problem: How Most Farm Subsidies Go to the Biggest Operations', desc: '69% of farms get nothing. The top 10% collect nearly three-fourths of all payments.' },
  { slug: 'disaster-spending', title: 'The Disaster Money Machine: Emergency Farm Payments', desc: 'Emergency and disaster programs now dwarf traditional farm subsidies.' },
  { slug: 'state-disparities', title: 'The Geography of Farm Subsidies', desc: 'Texas gets $3.8B while Vermont gets $37M. The map tells the story.' },
  { slug: 'conservation-vs-commodity', title: 'Conservation vs. Commodity: Two Philosophies of Farm Spending', desc: 'CRP pays farmers not to farm. Commodity programs pay them to produce.' },
  { slug: 'corporate-farms', title: 'When Corporations Collect: The Biggest Non-Family Recipients', desc: 'LLCs, partnerships, and corporations collecting millions in farm subsidies.' },
  { slug: 'per-capita', title: 'Farm Subsidies Per Capita by State', desc: 'North Dakota gets $6,000+ per person. California gets under $100.' },
  { slug: 'payment-limits', title: 'Are Farm Subsidy Payment Limits Working?', desc: 'Top recipients collect far more than the $125K cap through LLCs and partnerships.' },
  { slug: 'crp-conservation', title: 'The Conservation Reserve Program: Paying Farmers Not to Farm', desc: '$5.36B to keep land out of production. Is it worth it?' },
  { slug: 'small-vs-large', title: 'Small Farms vs. Large Operations: Who Really Benefits?', desc: '69% of farms get nothing. The distribution tells the real story.' },
  { slug: 'county-hotspots', title: 'County Hotspots: Where Farm Subsidies Concentrate', desc: 'Some individual counties receive more than entire states.' },
  { slug: 'negative-payments', title: 'Clawbacks and Corrections: When the USDA Takes Money Back', desc: 'Not all farm payments are positive. What negative payments mean.' },
  { slug: 'program-proliferation', title: '157 Programs and Counting: The Complexity of Farm Subsidies', desc: 'Why are there so many programs and how do they overlap?' },
  { slug: 'covid-spending', title: 'COVID Changed Farm Subsidies Forever: The $38.7 Billion Story', desc: 'In 2020, pandemic relief shattered every spending record in USDA history.' },
  { slug: 'trade-war', title: 'Trade War Fallout: $39 Billion in Tariff Bailout Payments', desc: 'US-China tariffs triggered the Market Facilitation Program.' },
  { slug: 'decade-of-disaster', title: 'A Decade of Disaster: How Emergency Programs Took Over Farm Subsidies', desc: 'Emergency programs went from supplemental to dominant in less than a decade.' },
  { slug: 'crp-under-threat', title: 'CRP Under Threat: Is Conservation Keeping Up with Emergency Spending?', desc: 'The $15.7B Conservation Reserve Program faces pressure as emergency spending dwarfs it.' },
  { slug: 'average-farmer', title: 'What Does the Average Farmer Actually Get? The $4,600 Reality', desc: '31.8M payments / $147B = $4,600 average. But most farmers get far less.' },
  { slug: 'state-winners-losers', title: 'State Winners & Losers: Who Gained Most from Emergency Spending?', desc: 'Comparing 2017 baseline to 2020 peak reveals which states benefited most.' },
  { slug: 'double-dippers', title: 'Double Dippers: Recipients Collecting from Multiple Programs', desc: 'Over 620,000 recipients collect from 3+ USDA programs. Top recipients tap 14 programs at once.' },
  { slug: 'farm-crisis-2025', title: 'The 2025 Farm Crisis: Bankruptcies Up 46%', desc: '315 farm bankruptcies in 2025 while subsidies flow to the largest operations.' },
  { slug: 'zombie-programs', title: 'Zombie Programs: USDA Programs Nobody Uses', desc: '43 programs with fewer than 100 payments each persist through bureaucratic inertia.' },
  { slug: 'emergency-management', title: 'Why Florida Emergency Management Is the #1 Farm Subsidy Recipient', desc: '$346.6M across just 6 payments — how a state disaster agency became the biggest recipient in the system.' },
  { slug: 'what-147b-buys', title: 'What $147 Billion in Farm Subsidies Could Buy Instead', desc: '$147B could fund 2.2M teachers, 5.8M Pell Grants, or 6 years of NASA.' },
]

const standalonArticles = [
  { path: '/doge-farm-subsidies', title: 'DOGE and Farm Subsidies: What Government Efficiency Means for USDA Payments', desc: 'How would DOGE evaluate $147B in USDA farm subsidies? 157 programs, zombie programs, and emergency spending.' },
  { path: '/farm-subsidy-reform', title: 'Farm Subsidy Reform: What the Data Shows About Fixing American Agriculture', desc: 'Five data-backed reform ideas from $147B in USDA payment data.' },
  { path: '/farm-subsidy-lookup', title: 'Farm Subsidy Lookup: Search Recipients by Name, State, or County', desc: 'Look up farm subsidies by recipient name, state, county, or program.' },
  { path: '/usda-payments', title: 'USDA Payments: Complete Database of Farm Service Agency Disbursements', desc: 'Explore $147B+ in USDA Farm Service Agency payments.' },
  { path: '/who-gets-farm-subsidies', title: 'Who Gets Farm Subsidies? The Complete Breakdown by Recipient Type', desc: 'Individual farmers receive 79% of payments, but corporations and LLCs collect the largest checks.' },
  { path: '/how-much-farm-subsidies', title: 'How Much Does the US Spend on Farm Subsidies? $147B and Counting', desc: 'The US spent $147B on farm subsidies from 2017-2025, averaging ~$16B/year and peaking at $38.7B in 2020.' },
  { path: '/biggest-farm-subsidies', title: 'Biggest Farm Subsidies: Largest Programs and Top Recipients', desc: 'CRP leads at $15.7B. See the top 15 programs and top 15 recipients.' },
  { path: '/surprising-recipients', title: 'The 10 Most Surprising Farm Subsidy Recipients', desc: 'State disaster agencies, DC trade groups, sugar cooperatives, and a fish company — the recipients you\'d never expect.' },
  { path: '/covid-impact', title: 'Before & After COVID: How the Pandemic Changed Farm Subsidies', desc: 'Farm subsidies jumped 63% in 2020. Compare every metric before and after COVID reshaped USDA spending.' },
]

export function GET() {
  const stats = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'stats.json'), 'utf8'))
  const states = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'states.json'), 'utf8')) as { abbr: string; name: string; amount: number }[]
  const topStates = [...states].sort((a, b) => b.amount - a.amount).slice(0, 20)
  const base = 'https://www.opensubsidies.org'

  const articleItems = articles.map(a => `    <item>
      <title>${a.title}</title>
      <link>${base}/analysis/${a.slug}</link>
      <description>${a.desc}</description>
      <guid>${base}/analysis/${a.slug}</guid>
      <pubDate>${new Date('2026-02-27').toUTCString()}</pubDate>
    </item>`).join('\n')

  const stateItems = topStates.map(s => `    <item>
      <title>${s.name} Farm Subsidies</title>
      <link>${base}/states/${s.abbr.toLowerCase()}</link>
      <description>${s.name} received $${(s.amount / 1e6).toFixed(1)}M in USDA farm subsidies.</description>
      <guid>${base}/states/${s.abbr.toLowerCase()}</guid>
    </item>`).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>OpenSubsidies — U.S. Farm Subsidy Data</title>
    <link>${base}</link>
    <description>Tracking $${(stats.totalAmount / 1e9).toFixed(1)}B in U.S. farm subsidies across ${stats.totalStates} states and ${stats.totalPrograms} programs.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>
${articleItems}
${standalonArticles.map(a => `    <item>
      <title>${a.title}</title>
      <link>${base}${a.path}</link>
      <description>${a.desc}</description>
      <guid>${base}${a.path}</guid>
      <pubDate>${new Date('2026-02-27').toUTCString()}</pubDate>
    </item>`).join('\n')}
${stateItems}
  </channel>
</rss>`

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}
