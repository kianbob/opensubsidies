import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.opensubsidies.us'),
  title: {
    default: 'OpenSubsidies — Where $147 Billion in Farm Subsidies Really Goes',
    template: '%s | OpenSubsidies',
  },
  description: 'Track every dollar of U.S. farm subsidies. 31 million+ payment records, 157 programs, every state and county. Free, open data from USDA.',
  alternates: { canonical: './' },
  openGraph: {
    siteName: 'OpenSubsidies',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@thedataproject0',
    creator: '@thedataproject0',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'OpenSubsidies',
              url: 'https://www.opensubsidies.us',
              potentialAction: {
                '@type': 'SearchAction',
                target: { '@type': 'EntryPoint', urlTemplate: 'https://www.opensubsidies.us/search?q={search_term_string}' },
                'query-input': 'required name=search_term_string',
              },
              publisher: { '@type': 'Organization', name: 'TheDataProject.ai', url: 'https://thedataproject.ai' },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-gray-50 text-gray-900`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  )
}
