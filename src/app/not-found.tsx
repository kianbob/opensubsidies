import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <span className="text-8xl font-bold text-primary font-[family-name:var(--font-heading)]">404</span>
        <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">Page not found</h1>
        <p className="text-gray-600 mb-8">We couldn&apos;t find what you&apos;re looking for.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">Home</Link>
          <Link href="/search" className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Search</Link>
        </div>
      </div>
    </div>
  )
}
