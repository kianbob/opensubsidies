'use client'
import Link from 'next/link'
import { useState } from 'react'

const links = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'States', href: '/states' },
  { label: 'Counties', href: '/counties' },
  { label: 'Programs', href: '/programs' },
  { label: 'Top Recipients', href: '/recipients' },
  { label: 'About', href: '/about' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary font-[family-name:var(--font-heading)]">OpenSubsidies</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors">
                {l.label}
              </Link>
            ))}
            <Link href="/search" className="ml-2 p-2 text-gray-500 hover:text-primary rounded-md" aria-label="Search">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            </Link>
          </div>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4 space-y-1">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
