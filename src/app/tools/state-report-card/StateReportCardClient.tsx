'use client'
import { useState, useEffect, useMemo } from 'react'

interface StateData {
  abbr: string
  name: string
  payments: number
  amount: number
  topPrograms: { program: string; amount: number }[]
}

interface DepData {
  state: string
  name: string
  ratio: number
  farmIncome: number
  subsidies: number
}

function fmtMoney(n: number): string {
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B'
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M'
  if (Math.abs(n) >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K'
  return '$' + n.toFixed(0)
}

function gradeColor(g: string) {
  if (g === 'A') return 'bg-green-600'
  if (g === 'B') return 'bg-green-500'
  if (g === 'C') return 'bg-yellow-500'
  if (g === 'D') return 'bg-orange-500'
  return 'bg-red-500'
}

function gradeFromPercentile(pct: number, inverted = false) {
  const v = inverted ? 100 - pct : pct
  if (v >= 80) return 'A'
  if (v >= 60) return 'B'
  if (v >= 40) return 'C'
  if (v >= 20) return 'D'
  return 'F'
}

function percentileRank(arr: number[], val: number) {
  const below = arr.filter(v => v < val).length
  return (below / arr.length) * 100
}

interface GradeCard {
  label: string
  grade: string
  value: string
  natAvg: string
  desc: string
}

export default function StateReportCardClient() {
  const [states, setStates] = useState<StateData[]>([])
  const [deps, setDeps] = useState<DepData[]>([])
  const [selected, setSelected] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/data/states.json').then(r => r.json()),
      fetch('/data/state-dependency.json').then(r => r.json()),
    ]).then(([s, d]) => {
      setStates(s)
      setDeps(d)
      setLoading(false)
    })
  }, [])

  const realStates = useMemo(() =>
    states.filter(s => !['AP', 'AE', 'AA', 'AS', 'GU', 'MP', 'VI', 'PR', 'DC'].includes(s.abbr)),
    [states]
  )

  const grades = useMemo<GradeCard[] | null>(() => {
    if (!selected) return null
    const st = states.find(s => s.abbr === selected)
    if (!st) return null
    const dep = deps.find(d => d.state === selected)

    // 1. Subsidy Concentration — % of total going to top program (lower = better)
    const topProgramPct = st.topPrograms[0] ? (st.topPrograms[0].amount / st.amount) * 100 : 0
    const allConc = realStates.map(s => s.topPrograms[0] ? (s.topPrograms[0].amount / s.amount) * 100 : 0)
    const avgConc = allConc.reduce((a, b) => a + b, 0) / allConc.length
    const concGrade = gradeFromPercentile(percentileRank(allConc, topProgramPct), true) // lower conc = better

    // 2. Dependency Ratio (lower = better)
    const depRatio = dep ? dep.ratio * 100 : 0
    const allDep = deps.map(d => d.ratio * 100)
    const avgDep = allDep.reduce((a, b) => a + b, 0) / allDep.length
    const depGrade = dep ? gradeFromPercentile(percentileRank(allDep, depRatio), true) : 'N/A'

    // 3. Program Diversity — unique programs in top 10 that aren't emergency/COVID (higher = better)
    const emergencyKeywords = ['EMERGENCY', 'CFAP', 'COVID', 'MFP', 'TRADE', 'DISASTER', 'RELIEF', 'WHIP']
    const diverseCount = st.topPrograms.filter(p => !emergencyKeywords.some(k => p.program.includes(k))).length
    const allDiverse = realStates.map(s => s.topPrograms.filter(p => !emergencyKeywords.some(k => p.program.includes(k))).length)
    const avgDiverse = allDiverse.reduce((a, b) => a + b, 0) / allDiverse.length
    const divGrade = gradeFromPercentile(percentileRank(allDiverse, diverseCount))

    // 4. Conservation Investment — % of total from CRP (higher = better)
    const crpAmount = st.topPrograms.filter(p => p.program.includes('CRP')).reduce((s, p) => s + p.amount, 0)
    const crpPct = (crpAmount / st.amount) * 100
    const allCrp = realStates.map(s => {
      const c = s.topPrograms.filter(p => p.program.includes('CRP')).reduce((sum, p) => sum + p.amount, 0)
      return (c / s.amount) * 100
    })
    const avgCrp = allCrp.reduce((a, b) => a + b, 0) / allCrp.length
    const crpGrade = gradeFromPercentile(percentileRank(allCrp, crpPct))

    // 5. Emergency Spending Share — % from emergency programs (lower = better)
    const emergAmount = st.topPrograms.filter(p => emergencyKeywords.some(k => p.program.includes(k))).reduce((s, p) => s + p.amount, 0)
    const emergPct = (emergAmount / st.amount) * 100
    const allEmerg = realStates.map(s => {
      const e = s.topPrograms.filter(p => emergencyKeywords.some(k => p.program.includes(k))).reduce((sum, p) => sum + p.amount, 0)
      return (e / s.amount) * 100
    })
    const avgEmerg = allEmerg.reduce((a, b) => a + b, 0) / allEmerg.length
    const emergGrade = gradeFromPercentile(percentileRank(allEmerg, emergPct), true)

    return [
      { label: 'Subsidy Concentration', grade: concGrade, value: topProgramPct.toFixed(1) + '%', natAvg: avgConc.toFixed(1) + '%', desc: '% of total from top program — lower is better' },
      { label: 'Dependency Ratio', grade: typeof depGrade === 'string' ? depGrade : 'N/A', value: depRatio.toFixed(1) + '%', natAvg: avgDep.toFixed(1) + '%', desc: 'Subsidies as % of farm income — lower is better' },
      { label: 'Program Diversity', grade: divGrade, value: diverseCount + '/10', natAvg: avgDiverse.toFixed(1) + '/10', desc: 'Non-emergency programs in top 10 — higher is better' },
      { label: 'Conservation Investment', grade: crpGrade, value: crpPct.toFixed(1) + '%', natAvg: avgCrp.toFixed(1) + '%', desc: 'CRP share of total subsidies — higher is better' },
      { label: 'Emergency Spending', grade: emergGrade, value: emergPct.toFixed(1) + '%', natAvg: avgEmerg.toFixed(1) + '%', desc: 'Emergency/bailout share — lower is better' },
    ]
  }, [selected, states, deps, realStates])

  const overallGrade = useMemo(() => {
    if (!grades) return null
    const map: Record<string, number> = { A: 4, B: 3, C: 2, D: 1, F: 0 }
    const valid = grades.filter(g => g.grade in map)
    if (valid.length === 0) return 'N/A'
    const avg = valid.reduce((s, g) => s + map[g.grade], 0) / valid.length
    if (avg >= 3.5) return 'A'
    if (avg >= 2.5) return 'B'
    if (avg >= 1.5) return 'C'
    if (avg >= 0.5) return 'D'
    return 'F'
  }, [grades])

  const selectedState = states.find(s => s.abbr === selected)

  if (loading) return <div className="text-center py-16 text-gray-400">Loading data…</div>

  return (
    <div>
      <div className="max-w-md mx-auto mb-8">
        <select
          value={selected}
          onChange={e => setSelected(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="">Select a state…</option>
          {realStates.sort((a, b) => a.name.localeCompare(b.name)).map(s => (
            <option key={s.abbr} value={s.abbr}>{s.name}</option>
          ))}
        </select>
      </div>

      {selectedState && grades && overallGrade && (
        <div>
          {/* Overall Grade */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-white text-4xl font-bold ${gradeColor(overallGrade)}`}>
              {overallGrade}
            </div>
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mt-4">{selectedState.name} Report Card</h2>
            <p className="text-gray-500 mt-1">Total subsidies: {fmtMoney(selectedState.amount)} · {selectedState.payments.toLocaleString()} payments</p>
          </div>

          {/* Grade Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {grades.map(g => (
              <div key={g.label} className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{g.label}</h3>
                  <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-lg ${gradeColor(g.grade)}`}>
                    {g.grade}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">State value</span>
                    <span className="font-medium">{g.value}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">National avg</span>
                    <span className="font-medium">{g.natAvg}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">{g.desc}</p>
              </div>
            ))}
          </div>

          {/* Top Programs */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4">Top Programs in {selectedState.name}</h3>
            <div className="space-y-2">
              {selectedState.topPrograms.slice(0, 10).map((p, i) => {
                const pct = (p.amount / selectedState.amount) * 100
                return (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 truncate mr-2">{p.program}</span>
                      <span className="text-gray-500 whitespace-nowrap">{fmtMoney(p.amount)} ({pct.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${Math.min(pct, 100)}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {!selected && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-6xl mb-4">🏫</p>
          <p>Select a state above to generate its subsidy report card</p>
        </div>
      )}
    </div>
  )
}
