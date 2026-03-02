// @ts-nocheck
'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { formatProgram } from '@/lib/format-program'
import { fmtMoney } from '@/lib/utils'

type StateSummary = {
  abbr: string
  name: string
  amount: number
  payments: number
  topPrograms: { program: string; amount: number }[]
}

type County = {
  state: string
  stateName: string
  county: string
  fips: string
  payments: number
  amount: number
}

const STATE_POPULATIONS: Record<string, number> = {
  AL:5024279,AK:733391,AZ:7151502,AR:3011524,CA:39538223,CO:5773714,CT:3605944,DE:989948,FL:21538187,GA:10711908,
  HI:1455271,ID:1839106,IL:12812508,IN:6785528,IA:3190369,KS:2937880,KY:4505836,LA:4657757,ME:1362359,MD:6177224,
  MA:7029917,MI:10077331,MN:5706494,MS:2961279,MO:6154913,MT:1084225,NE:1961504,NV:3104614,NH:1377529,NJ:9288994,
  NM:2117522,NY:20201249,NC:10439388,ND:779094,OH:11799448,OK:3959353,OR:4237256,PA:13002700,RI:1097379,SC:5118425,
  SD:886667,TN:6910840,TX:29145505,UT:3271616,VT:643077,VA:8631393,WA:7614893,WV:1793716,WI:5893718,WY:576851,
}

const STATE_BY_NAME: Record<string, string> = {}
const STATE_NAMES: Record<string, string> = {
  AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',CT:'Connecticut',DE:'Delaware',
  FL:'Florida',GA:'Georgia',HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',KY:'Kentucky',
  LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MS:'Mississippi',
  MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',NM:'New Mexico',
  NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',
  RI:'Rhode Island',SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',
  VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming',
}
Object.entries(STATE_NAMES).forEach(([k, v]) => { STATE_BY_NAME[v.toLowerCase()] = k })

// Simple ZIP → state mapping (first digits)
const ZIP_TO_STATE: Record<string, string> = {
  '0':'CT','01':'MA','02':'MA','03':'NH','04':'ME','05':'VT','06':'CT','07':'NJ','08':'NJ','09':'AE',
  '1':'NY','10':'NY','11':'NY','12':'NY','13':'NY','14':'NY','15':'PA','16':'PA','17':'PA','18':'PA','19':'PA',
  '2':'VA','20':'DC','21':'MD','22':'VA','23':'VA','24':'VA','25':'WV','26':'WV','27':'NC','28':'NC','29':'SC',
  '3':'FL','30':'GA','31':'GA','32':'FL','33':'FL','34':'FL','35':'AL','36':'AL','37':'TN','38':'TN','39':'MS',
  '4':'IN','40':'KY','41':'KY','42':'KY','43':'OH','44':'OH','45':'OH','46':'IN','47':'IN','48':'MI','49':'MI',
  '5':'IA','50':'IA','51':'IA','52':'IA','53':'WI','54':'WI','55':'MN','56':'MN','57':'SD','58':'ND','59':'MT',
  '6':'IL','60':'IL','61':'IL','62':'IL','63':'MO','64':'MO','65':'MO','66':'KS','67':'KS','68':'NE','69':'NE',
  '7':'TX','70':'LA','71':'LA','72':'AR','73':'OK','74':'OK','75':'TX','76':'TX','77':'TX','78':'TX','79':'TX',
  '8':'CO','80':'CO','81':'CO','82':'WY','83':'ID','84':'UT','85':'AZ','86':'AZ','87':'NM','88':'NM','89':'NV',
  '9':'WA','90':'CA','91':'CA','92':'CA','93':'CA','94':'CA','95':'CA','96':'CA','97':'OR','98':'WA','99':'WA',
}

function resolveState(input: string): string | null {
  const trimmed = input.trim()
  // Try as state abbreviation
  const upper = trimmed.toUpperCase()
  if (STATE_POPULATIONS[upper]) return upper
  // Try as state name
  const lower = trimmed.toLowerCase()
  if (STATE_BY_NAME[lower]) return STATE_BY_NAME[lower]
  // Try as ZIP
  const digits = trimmed.replace(/\D/g, '')
  if (digits.length >= 2) {
    const prefix2 = digits.slice(0, 2)
    if (ZIP_TO_STATE[prefix2]) return ZIP_TO_STATE[prefix2]
  }
  if (digits.length >= 1) {
    const prefix1 = digits.slice(0, 1)
    if (ZIP_TO_STATE[prefix1]) return ZIP_TO_STATE[prefix1]
  }
  return null
}

export default function WhoBenefitsClient({ states, counties }: { states: StateSummary[]; counties: County[] }) {
  const [input, setInput] = useState('')
  const [resolvedState, setResolvedState] = useState<string | null>(null)
  const [error, setError] = useState('')

  const stateMap = useMemo(() => {
    const m: Record<string, StateSummary> = {}
    states.forEach(s => { m[s.abbr] = s })
    return m
  }, [states])

  const countyByState = useMemo(() => {
    const m: Record<string, County[]> = {}
    counties.forEach(c => {
      if (!m[c.state]) m[c.state] = []
      m[c.state].push(c)
    })
    // sort each by amount desc
    Object.values(m).forEach(arr => arr.sort((a, b) => b.amount - a.amount))
    return m
  }, [counties])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const st = resolveState(input)
    if (st) {
      setResolvedState(st)
      setError('')
    } else {
      setError('Could not find a state. Try a state name, abbreviation, or ZIP code.')
      setResolvedState(null)
    }
  }

  const current = resolvedState ? stateMap[resolvedState] : null
  const stateCounties = resolvedState ? (countyByState[resolvedState] || []) : []
  const pop = resolvedState ? STATE_POPULATIONS[resolvedState] : null
  const perCapita = current && pop ? current.amount / pop : null

  // National averages for comparison
  const totalNational = states.reduce((s, st) => s + st.amount, 0)
  const totalPop = Object.values(STATE_POPULATIONS).reduce((s, v) => s + v, 0)
  const nationalPerCapita = totalNational / totalPop

  return (
    <div>
      {/* Input form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter your state, abbreviation, or ZIP code:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="e.g., Iowa, IA, or 50309"
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm flex-1 max-w-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          />
          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
          >
            Explore
          </button>
        </div>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </form>

      {/* Results */}
      {current && resolvedState && (
        <div className="space-y-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-green-800 mb-1">
              {STATE_NAMES[resolvedState] || resolvedState}
            </h2>
            <p className="text-green-700 text-sm">Here&apos;s how farm subsidies affect your area.</p>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-xs text-gray-400 uppercase">Total Subsidies</div>
              <div className="text-xl font-bold text-gray-900">{fmtMoney(current.amount)}</div>
              <div className="text-xs text-gray-500 mt-1">2017–2025</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-xs text-gray-400 uppercase">Your Per-Capita Cost</div>
              <div className="text-xl font-bold text-gray-900">{perCapita ? '$' + perCapita.toFixed(0) : 'N/A'}</div>
              <div className="text-xs text-gray-500 mt-1">vs ${nationalPerCapita.toFixed(0)} national avg</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-xs text-gray-400 uppercase">Total Payments</div>
              <div className="text-xl font-bold text-gray-900">{current.payments.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">individual disbursements</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-xs text-gray-400 uppercase">Counties Active</div>
              <div className="text-xl font-bold text-gray-900">{stateCounties.length}</div>
              <div className="text-xs text-gray-500 mt-1">with subsidy payments</div>
            </div>
          </div>

          {/* Per capita context */}
          {perCapita && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-gray-900 mb-3">What This Means for You</h3>
              <p className="text-gray-600 text-sm">
                Over the past 9 years, an average of <strong>${(perCapita / 9).toFixed(0)}</strong> per person
                per year in {STATE_NAMES[resolvedState]} went to farm subsidy payments.
                {perCapita > nationalPerCapita
                  ? ` That's ${((perCapita / nationalPerCapita - 1) * 100).toFixed(0)}% above the national average.`
                  : ` That's ${((1 - perCapita / nationalPerCapita) * 100).toFixed(0)}% below the national average.`}
                {' '}For a family of 4, that&apos;s about <strong>${((perCapita * 4) / 9).toFixed(0)}</strong> per year.
              </p>
            </div>
          )}

          {/* Top programs */}
          <div>
            <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-gray-900 mb-3">Top Programs in Your State</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={current.topPrograms.slice(0, 8).map(p => ({
                  name: formatProgram(p.program).slice(0, 20),
                  amount: p.amount,
                }))}
                layout="vertical"
                margin={{ left: 5, right: 10 }}
              >
                <XAxis type="number" tickFormatter={(v: number) => fmtMoney(v)} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v: number) => ['$' + v.toLocaleString(undefined, { maximumFractionDigits: 0 }), 'Total']} />
                <Bar dataKey="amount" radius={[0, 3, 3, 0]}>
                  {current.topPrograms.slice(0, 8).map((_, i) => (
                    <Cell key={i} fill={i < 3 ? '#15803d' : '#22c55e'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top counties */}
          {stateCounties.length > 0 && (
            <div>
              <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-gray-900 mb-3">Top Counties</h3>
              <div className="space-y-2">
                {stateCounties.slice(0, 10).map((c, i) => {
                  const pct = (c.amount / current.amount) * 100
                  return (
                    <div key={c.fips}>
                      <div className="flex justify-between text-sm mb-0.5">
                        <span className="text-gray-700">
                          <span className="text-gray-400 mr-1">{i + 1}.</span>
                          <a href={`/counties/${c.fips}`} className="hover:text-green-700 hover:underline">{c.county}</a>
                        </span>
                        <span className="font-medium text-gray-900 whitespace-nowrap">{fmtMoney(c.amount)} ({pct.toFixed(1)}%)</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: `${Math.min(pct * 3, 100)}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div className="text-sm text-center">
            <a href={`/states/${resolvedState.toLowerCase()}`} className="text-green-700 hover:underline font-medium">
              View full {STATE_NAMES[resolvedState]} subsidy page →
            </a>
          </div>
        </div>
      )}

      {/* Default state - intro content */}
      {!current && !error && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🌾</div>
          <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-gray-900 mb-2">
            Who Benefits From Farm Subsidies?
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Enter your state or ZIP code above to discover how $147 billion in farm subsidies
            affects your area. See which programs are active, how much is spent per person,
            and which counties receive the most.
          </p>
          <div className="mt-8 grid md:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-2xl mb-1">💰</div>
              <div className="text-sm font-bold text-green-800">$147 Billion</div>
              <div className="text-xs text-green-700">Total subsidies 2017–2025</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-2xl mb-1">📋</div>
              <div className="text-sm font-bold text-green-800">31.7 Million</div>
              <div className="text-xs text-green-700">Individual payments</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-2xl mb-1">🏛️</div>
              <div className="text-sm font-bold text-green-800">157 Programs</div>
              <div className="text-xs text-green-700">USDA subsidy programs</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
