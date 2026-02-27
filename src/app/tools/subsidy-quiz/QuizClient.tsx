// @ts-nocheck
'use client'
import { useState } from 'react'
import Link from 'next/link'

interface Question {
  question: string
  options: string[]
  correct: number
  explanation: string
  link: { label: string; href: string }
}

const QUESTIONS: Question[] = [
  {
    question: 'How much does the US spend on farm subsidies (2017–2025)?',
    options: ['$50 billion', '$100 billion', '$147 billion', '$200 billion'],
    correct: 2,
    explanation: 'The U.S. has spent approximately $147 billion in farm subsidies across 157 USDA programs from 2017 to 2025.',
    link: { label: 'See the full breakdown', href: '/dashboard' },
  },
  {
    question: 'What percentage of U.S. farms receive NO subsidies?',
    options: ['30%', '50%', '69%', '85%'],
    correct: 2,
    explanation: 'About 69% of farms receive no direct USDA subsidy payments. Most payments go to large commodity operations.',
    link: { label: 'Explore payment distribution', href: '/payment-distribution' },
  },
  {
    question: 'Which state gets the most total farm subsidies?',
    options: ['California', 'Texas', 'Iowa', 'Kansas'],
    correct: 1,
    explanation: 'Texas leads in total farm subsidy payments, driven by large-scale cotton, grain, and livestock operations.',
    link: { label: 'See state rankings', href: '/rankings' },
  },
  {
    question: 'How much do farm subsidies cost each U.S. taxpayer per year?',
    options: ['$25', '$109', '$500', '$1,000'],
    correct: 1,
    explanation: 'Farm subsidies cost roughly $109 per taxpayer per year, based on total spending divided by the number of tax filers.',
    link: { label: 'Try the taxpayer calculator', href: '/tools/taxpayer-calculator' },
  },
  {
    question: 'What was the peak spending year for farm subsidies?',
    options: ['2018', '2019', '2020', '2021'],
    correct: 2,
    explanation: '2020 was the peak at $38.7 billion, driven by COVID-19 relief through the Coronavirus Food Assistance Program (CFAP).',
    link: { label: 'Explore the timeline', href: '/tools/timeline-explorer' },
  },
  {
    question: 'How many USDA subsidy programs exist?',
    options: ['25', '75', '157', '300'],
    correct: 2,
    explanation: 'There are 157 distinct USDA payment programs, ranging from massive commodity programs to tiny specialty initiatives.',
    link: { label: 'Browse all programs', href: '/programs' },
  },
  {
    question: 'What % of subsidy dollars go to the top 10% of recipients?',
    options: ['30%', '50%', '75%', '90%'],
    correct: 2,
    explanation: 'Roughly 75% of subsidy dollars flow to the top 10% of recipients — mostly large corporate farms.',
    link: { label: 'Read the concentration analysis', href: '/analysis/subsidy-concentration' },
  },
  {
    question: 'Which program received the most total money?',
    options: ['CRP (Conservation Reserve)', 'PLC (Price Loss Coverage)', 'CFAP (COVID Relief)', 'ARC (Agricultural Risk Coverage)'],
    correct: 2,
    explanation: 'The Coronavirus Food Assistance Program (CFAP) rounds totaled over $24 billion, making it the largest single program.',
    link: { label: 'Compare programs', href: '/tools/compare-programs' },
  },
  {
    question: 'How many programs have fewer than 100 total payments?',
    options: ['5', '15', '46', '100'],
    correct: 2,
    explanation: '46 "zombie programs" have fewer than 100 total payments — some with just a single payment to one recipient.',
    link: { label: 'See zombie programs', href: '/analysis/zombie-programs' },
  },
  {
    question: 'In North Dakota, subsidies equal what % of farm income?',
    options: ['20%', '45%', '69%', '90%'],
    correct: 2,
    explanation: 'North Dakota is the most subsidy-dependent state, with federal farm payments equaling 69% of farm income.',
    link: { label: 'Explore state dependency', href: '/state-dependency' },
  },
]

function getScoreMessage(score: number, total: number) {
  const pct = score / total
  if (pct === 1) return '🏆 Perfect! You know more about farm subsidies than most members of Congress.'
  if (pct >= 0.8) return '🌾 Impressive! You really know your subsidies.'
  if (pct >= 0.6) return '🌱 Not bad! You know more than most Americans.'
  if (pct >= 0.4) return '🤔 Room to grow — but that\'s why we built this site!'
  return '😬 Don\'t worry — most people have no idea where $147 billion goes. Now you do!'
}

export default function QuizClient() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [finished, setFinished] = useState(false)

  const q = QUESTIONS[current]

  function handleSelect(idx: number) {
    if (selected !== null) return
    setSelected(idx)
    if (idx === q.correct) setScore(s => s + 1)
    setAnswers(a => [...a, idx])
  }

  function handleNext() {
    if (current < QUESTIONS.length - 1) {
      setCurrent(c => c + 1)
      setSelected(null)
    } else {
      setFinished(true)
    }
  }

  function handleRestart() {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setAnswers([])
    setFinished(false)
  }

  if (finished) {
    const shareText = `I scored ${score}/${QUESTIONS.length} on the Farm Subsidy Quiz! 🌾 How much do YOU know about where $147 billion goes? Take the quiz:`
    const shareUrl = 'https://www.opensubsidies.us/tools/subsidy-quiz'
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center max-w-xl mx-auto">
        <div className="text-6xl mb-4">{score === QUESTIONS.length ? '🏆' : score >= 7 ? '🌾' : '🌱'}</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">You scored {score}/{QUESTIONS.length}</h2>
        <p className="text-gray-600 mb-6">{getScoreMessage(score, QUESTIONS.length)}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800"
          >
            Share on 𝕏
          </a>
          <button onClick={handleRestart} className="px-4 py-2 bg-[#15803d] text-white rounded-lg text-sm font-medium hover:bg-[#166534]">
            Try Again
          </button>
        </div>
        <Link href="/tools" className="text-sm text-[#15803d] hover:underline">← Back to Tools</Link>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-medium text-gray-500">Question {current + 1} of {QUESTIONS.length}</span>
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#15803d] transition-all duration-300 rounded-full" style={{ width: `${((current + (selected !== null ? 1 : 0)) / QUESTIONS.length) * 100}%` }} />
        </div>
        <span className="text-sm font-bold text-[#15803d]">{score}/{current + (selected !== null ? 1 : 0)}</span>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">{q.question}</h2>
        <div className="space-y-2">
          {q.options.map((opt, i) => {
            let cls = 'w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all '
            if (selected === null) {
              cls += 'border-gray-200 hover:border-[#15803d] hover:bg-green-50 text-gray-700 cursor-pointer'
            } else if (i === q.correct) {
              cls += 'border-green-500 bg-green-50 text-green-800'
            } else if (i === selected) {
              cls += 'border-red-400 bg-red-50 text-red-700'
            } else {
              cls += 'border-gray-100 text-gray-400'
            }
            return (
              <button key={i} onClick={() => handleSelect(i)} className={cls} disabled={selected !== null}>
                <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                {opt}
                {selected !== null && i === q.correct && <span className="ml-2">✓</span>}
                {selected !== null && i === selected && i !== q.correct && <span className="ml-2">✗</span>}
              </button>
            )
          })}
        </div>

        {selected !== null && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">{q.explanation}</p>
            <Link href={q.link.href} className="text-sm text-[#15803d] hover:underline mt-1 inline-block">{q.link.label} →</Link>
          </div>
        )}

        {selected !== null && (
          <button onClick={handleNext} className="mt-4 w-full py-2 bg-[#15803d] text-white rounded-lg font-medium hover:bg-[#166534]">
            {current < QUESTIONS.length - 1 ? 'Next Question →' : 'See My Score'}
          </button>
        )}
      </div>
    </div>
  )
}
