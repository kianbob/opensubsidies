import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.opensubsidies.us'
  const states = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'states.json'), 'utf8')) as { abbr: string }[]
  const programs = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'programs.json'), 'utf8')) as { program: string }[]
  
  function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }

  const staticRoutes = ['', '/states', '/counties', '/programs', '/recipients', '/dashboard', '/about', '/faq', '/search',
    '/analysis', '/analysis/subsidy-concentration', '/analysis/disaster-spending', '/analysis/state-disparities',
    '/analysis/conservation-vs-commodity', '/analysis/corporate-farms', '/analysis/per-capita', '/downloads']

  return [
    ...staticRoutes.map(r => ({ url: `${base}${r}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: r === '' ? 1 : 0.8 })),
    ...states.map(s => ({ url: `${base}/states/${s.abbr.toLowerCase()}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...programs.map(p => ({ url: `${base}/programs/${slugify(p.program)}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 })),
  ]
}
