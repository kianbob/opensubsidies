import Link from 'next/link'

interface Crumb { label: string; href?: string }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.opensubsidies.org' },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.label,
        ...(item.href ? { item: `https://www.opensubsidies.org${item.href}` } : {}),
      }))],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        {items.map((item, i) => (
          <span key={i}>
            <span className="mx-2">›</span>
            {item.href ? <Link href={item.href} className="hover:text-primary">{item.label}</Link> : <span className="text-gray-700">{item.label}</span>}
          </span>
        ))}
      </nav>
    </>
  )
}
