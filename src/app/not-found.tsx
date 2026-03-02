import Link from 'next/link'

export default function NotFound() {
  const popularPages = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'States', href: '/states', icon: '🗺️' },
    { label: 'Programs', href: '/programs', icon: '📋' },
    { label: 'Recipients', href: '/recipients', icon: '👤' },
    { label: 'Analysis', href: '/analysis', icon: '📰' },
  ]

  const suggestions = [
    { label: 'Top Counties', href: '/counties' },
    { label: 'Spending Trends', href: '/trends' },
    { label: 'Download Data', href: '/downloads' },
    { label: 'Methodology', href: '/methodology' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        <span className="text-8xl font-bold text-primary font-[family-name:var(--font-heading)]">404</span>
        <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">Page not found</h1>
        <p className="text-gray-600 mb-8">We couldn&apos;t find what you&apos;re looking for. Try one of these pages instead.</p>

        <div className="flex gap-3 justify-center mb-10">
          <Link href="/" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">Home</Link>
          <Link href="/search" className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Search</Link>
        </div>

        {/* Popular Pages */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Popular Pages</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {popularPages.map(p => (
              <Link key={p.href} href={p.href} className="bg-green-50 rounded-xl p-4 hover:bg-green-100 transition-colors text-center">
                <span className="text-2xl block mb-1">{p.icon}</span>
                <span className="text-sm font-medium text-green-800">{p.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* You might be looking for */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">You might be looking for</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map(s => (
              <Link key={s.href} href={s.href} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-green-300 hover:text-green-700 transition-colors">
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
