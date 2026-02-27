export default function ArticleSchema({ title, description, slug, date = 'February 2026' }: {
  title: string
  description: string
  slug: string
  date?: string
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: '2026-02-01',
    dateModified: '2026-02-27',
    url: `https://www.opensubsidies.org/analysis/${slug}`,
    author: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.org' },
    publisher: { '@type': 'Organization', name: 'OpenSubsidies', url: 'https://www.opensubsidies.org' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.opensubsidies.org/analysis/${slug}` },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
