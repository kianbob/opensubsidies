import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.opensubsidies.us'
  const states = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'states.json'), 'utf8')) as { abbr: string }[]
  const programs = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'programs.json'), 'utf8')) as { program: string }[]
  
  function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }

  const countyIndex = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'county-index.json'), 'utf8')) as { fips: string; amount: number }[]
  const topCounties = [...countyIndex].sort((a, b) => b.amount - a.amount).slice(0, 500)

  const recipientIndex = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'recipient-index.json'), 'utf8')) as { slug: string }[]

  const staticRoutes = ['', '/states', '/counties', '/programs', '/recipients', '/dashboard', '/about', '/faq', '/search',
    '/analysis', '/analysis/subsidy-concentration', '/analysis/disaster-spending', '/analysis/state-disparities',
    '/analysis/conservation-vs-commodity', '/analysis/corporate-farms', '/analysis/per-capita',
    '/analysis/payment-limits', '/analysis/crp-conservation', '/analysis/small-vs-large', '/analysis/county-hotspots',
    '/compare', '/downloads', '/methodology', '/glossary', '/tools', '/state-programs',
    '/categories', '/rankings', '/trends', '/tools/calculator',
    '/tools/recipient-search', '/tools/state-profile',
    '/facts', '/farm-subsidies-explained', '/emergency-spending', '/conservation',
    '/analysis/negative-payments', '/analysis/program-proliferation',
    '/analysis/covid-spending', '/analysis/trade-war',
    '/analysis/decade-of-disaster', '/analysis/crp-under-threat',
    '/analysis/average-farmer', '/analysis/state-winners-losers',
    '/privacy', '/county-rankings', '/tools/compare-programs',
    ...Array.from({ length: 9 }, (_, i) => `/years/${2017 + i}`)]

  return [
    ...staticRoutes.map(r => ({ url: `${base}${r}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: r === '' ? 1 : 0.8 })),
    ...states.map(s => ({ url: `${base}/states/${s.abbr.toLowerCase()}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...programs.map(p => ({ url: `${base}/programs/${slugify(p.program)}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 })),
    ...topCounties.map(c => ({ url: `${base}/counties/${c.fips}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 })),
    ...recipientIndex.map(r => ({ url: `${base}/recipients/${r.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 })),
  ]
}
