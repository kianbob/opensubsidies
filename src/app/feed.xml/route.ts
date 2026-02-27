import fs from 'fs'
import path from 'path'

export function GET() {
  const stats = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'stats.json'), 'utf8'))
  const states = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'states.json'), 'utf8')) as { abbr: string; name: string; amount: number }[]
  const topStates = [...states].sort((a, b) => b.amount - a.amount).slice(0, 20)
  const base = 'https://www.opensubsidies.us'

  const items = topStates.map(s => `    <item>
      <title>${s.name} Farm Subsidies</title>
      <link>${base}/states/${s.abbr.toLowerCase()}</link>
      <description>${s.name} received $${(s.amount / 1e6).toFixed(1)}M in USDA farm subsidies.</description>
      <guid>${base}/states/${s.abbr.toLowerCase()}</guid>
    </item>`).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>OpenSubsidies - US Farm Subsidy Data</title>
    <link>${base}</link>
    <description>Tracking $${(stats.totalAmount / 1e9).toFixed(1)}B in US farm subsidies across ${stats.totalStates} states and ${stats.totalPrograms} programs.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}
