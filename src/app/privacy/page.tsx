import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'OpenSubsidies privacy policy. We collect minimal data and never sell your information.',
  alternates: { canonical: 'https://www.opensubsidies.org/privacy' },
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
      <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-6">Privacy Policy</h1>
      <div className="prose max-w-none text-gray-600">
        <p><strong>Last updated:</strong> February 2026</p>
        <h2 className="font-[family-name:var(--font-heading)]">What We Collect</h2>
        <p>OpenSubsidies uses Google Analytics to understand how visitors use the site. This collects anonymized usage data including pages visited, time on site, and general geographic location. No personally identifiable information is collected.</p>
        <h2 className="font-[family-name:var(--font-heading)]">What We Don&apos;t Do</h2>
        <ul>
          <li>We do not require registration or login</li>
          <li>We do not collect personal information</li>
          <li>We do not use cookies for advertising</li>
          <li>We do not sell any data to third parties</li>
          <li>We do not track individual users across sessions</li>
        </ul>
        <h2 className="font-[family-name:var(--font-heading)]">Public Data</h2>
        <p>All farm subsidy data displayed on this site is public information from the USDA Farm Service Agency. Recipient names and payment amounts are government records available under the Freedom of Information Act.</p>
        <h2 className="font-[family-name:var(--font-heading)]">Contact</h2>
        <p>Questions about privacy? Email <a href="mailto:info@thedataproject.ai" className="text-primary">info@thedataproject.ai</a>.</p>
      </div>
    </div>
  )
}
