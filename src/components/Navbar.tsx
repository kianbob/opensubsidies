'use client'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  {
    label: 'Explore',
    items: [
      { label: 'States', href: '/states' },
      { label: 'Counties', href: '/counties' },
      { label: 'Programs', href: '/programs' },
      { label: 'Top Recipients', href: '/recipients' },
      { label: 'Rankings', href: '/rankings' },
      { label: 'County Rankings', href: '/county-rankings' },
      { label: 'Categories', href: '/categories' },
      { label: 'Trends', href: '/trends' },
      { label: 'Entity Types', href: '/entity-types' },
      { label: 'Payment Distribution', href: '/payment-distribution' },
      { label: 'Subsidy Map', href: '/subsidy-map' },
      { label: 'State Dependency', href: '/state-dependency' },
    ],
  },
  { label: 'Compare', href: '/compare' },
  {
    label: 'Analysis',
    items: [
      { label: 'All Analysis', href: '/analysis' },
      { label: 'COVID Spending', href: '/analysis/covid-spending' },
      { label: 'Trade War', href: '/analysis/trade-war' },
      { label: 'Subsidy Concentration', href: '/analysis/subsidy-concentration' },
      { label: 'Disaster Spending', href: '/analysis/disaster-spending' },
      { label: 'Farm Subsidy Facts', href: '/facts' },
      { label: 'Subsidies Explained', href: '/farm-subsidies-explained' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { label: 'All Tools', href: '/tools' },
      { label: 'Subsidy Calculator', href: '/tools/calculator' },
      { label: 'Compare Programs', href: '/tools/compare-programs' },
      { label: 'State Profile', href: '/tools/state-profile' },
      { label: 'Recipient Search', href: '/tools/recipient-search' },
      { label: 'Program Explorer', href: '/tools/program-explorer' },
      { label: 'Program Decoder', href: '/program-decoder' },
      { label: 'Farm Subsidy Lookup', href: '/farm-subsidy-lookup' },
      { label: 'USDA Payments', href: '/usda-payments' },
    ],
  },
  { label: 'About', href: '/about' },
]

function DesktopDropdown({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false)
  const timeout = useRef<NodeJS.Timeout>(null)

  const enter = () => { if (timeout.current) clearTimeout(timeout.current); setOpen(true) }
  const leave = () => { timeout.current = setTimeout(() => setOpen(false), 150) }

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button className="px-3 py-4 text-sm font-medium text-gray-700 hover:text-primary transition-colors flex items-center gap-1">
        {label}
        <svg className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-0 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
          {items.map(item => (
            <Link key={item.href} href={item.href} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-primary transition-colors" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  // Close mobile nav on route change
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl font-bold text-primary font-[family-name:var(--font-heading)]">OpenSubsidies</span>
          </Link>
          <div className="hidden lg:flex items-center">
            {navItems.map(item =>
              'items' in item && item.items ? (
                <DesktopDropdown key={item.label} label={item.label} items={item.items} />
              ) : (
                <Link key={item.href} href={item.href} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors">
                  {item.label}
                </Link>
              )
            )}
            <Link href="/search" className="ml-2 p-2 text-gray-500 hover:text-primary rounded-md" aria-label="Search">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            </Link>
          </div>
          <button className="lg:hidden p-2 text-gray-700" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18 18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            )}
          </button>
        </div>
        {open && (
          <div className="lg:hidden pb-4 border-t border-gray-100 max-h-[80vh] overflow-y-auto">
            {navItems.map(item => {
              if ('items' in item && item.items) {
                const isExpanded = mobileExpanded === item.label
                return (
                  <div key={item.label}>
                    <button
                      className="w-full flex items-center justify-between px-3 py-3 text-sm font-semibold text-gray-800"
                      onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                    >
                      {item.label}
                      <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" /></svg>
                    </button>
                    {isExpanded && (
                      <div className="pl-4 pb-2 space-y-0.5">
                        {item.items.map(sub => (
                          <Link key={sub.href} href={sub.href} className="block px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-green-50 rounded-md" onClick={() => setOpen(false)}>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
              return (
                <Link key={item.href} href={item.href} className="block px-3 py-3 text-sm font-medium text-gray-700 hover:text-primary hover:bg-green-50 rounded-md" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              )
            })}
            <Link href="/search" className="block px-3 py-3 text-sm font-medium text-gray-700 hover:text-primary hover:bg-green-50 rounded-md" onClick={() => setOpen(false)}>
              🔍 Search
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
