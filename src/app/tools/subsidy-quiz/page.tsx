import Breadcrumbs from '@/components/Breadcrumbs'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import QuizClient from './QuizClient'

export const metadata: Metadata = {
  title: 'Farm Subsidy Quiz — How Much Do You Really Know?',
  description: 'Test your knowledge of U.S. farm subsidies with 10 data-driven questions. How much does the government spend? Who benefits most? Find out.',
  alternates: { canonical: 'https://www.opensubsidies.us/tools/subsidy-quiz' },
}

export default function SubsidyQuizPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Subsidy Quiz' }]} />
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">🌾 Farm Subsidy Quiz</h1>
        <p className="text-gray-600">How much do you really know about where $147 billion in farm subsidies goes? 10 questions, all from real data.</p>
      </div>
      <Suspense fallback={<div className="text-center py-16 text-gray-400">Loading quiz…</div>}>
        <QuizClient />
      </Suspense>
    </div>
  )
}
