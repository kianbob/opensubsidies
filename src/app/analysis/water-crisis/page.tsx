import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Farm Subsidies and the Water Crisis: Subsidizing Drought',
  description: 'How farm subsidies encourage water-intensive crops in drought-stricken states. The Colorado River, Ogallala Aquifer, and California\'s water wars — follow the subsidy money.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/water-crisis' },
  openGraph: {
    title: `Farm Subsidies and the Water Crisis: Subsidizing Drought`,
    description: `How farm subsidies encourage water-intensive crops in drought-stricken states. The Colorado River, Ogallala Aquifer, and California's water wars — follow the subsidy money.`,
    url: 'https://www.opensubsidies.org/analysis/water-crisis',
    type: 'article',
  },
}

export default function WaterCrisis() {
  const states = loadData('states.json') as { abbr: string; name: string; payments: number; amount: number; topPrograms: { program: string; amount: number }[] }[]
  const stats = loadData('stats.json') as { totalAmount: number; totalPayments: number }

  // Drought-prone western states
  const droughtStates = ['CA', 'AZ', 'NV', 'CO', 'UT', 'NM', 'TX', 'KS', 'NE', 'OK', 'ID', 'MT', 'WY', 'OR', 'WA', 'SD', 'ND']
  const droughtData = states.filter(s => droughtStates.includes(s.abbr)).sort((a, b) => b.amount - a.amount)
  const droughtTotal = droughtData.reduce((s, st) => s + st.amount, 0)

  // Colorado River basin states
  const coloradoRiverStates = ['CO', 'WY', 'UT', 'NM', 'AZ', 'NV', 'CA']
  const coloradoData = states.filter(s => coloradoRiverStates.includes(s.abbr)).sort((a, b) => b.amount - a.amount)
  const coloradoTotal = coloradoData.reduce((s, st) => s + st.amount, 0)

  // Ogallala Aquifer states
  const ogallalaStates = ['TX', 'KS', 'NE', 'OK', 'SD', 'CO', 'NM', 'WY']
  const ogallalaData = states.filter(s => ogallalaStates.includes(s.abbr)).sort((a, b) => b.amount - a.amount)
  const ogallalaTotal = ogallalaData.reduce((s, st) => s + st.amount, 0)

  const ca = states.find(s => s.abbr === 'CA')!
  const az = states.find(s => s.abbr === 'AZ')!
  const tx = states.find(s => s.abbr === 'TX')!
  const ks = states.find(s => s.abbr === 'KS')!
  const ne = states.find(s => s.abbr === 'NE')!
  const co = states.find(s => s.abbr === 'CO')!

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema
        title="Farm Subsidies and the Water Crisis: Subsidizing Drought"
        description="How farm subsidies encourage water-intensive crops in drought-stricken states. The Colorado River, Ogallala Aquifer, and California's water wars."
        slug="analysis/water-crisis"
      />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Water Crisis' }]} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · March 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          Farm Subsidies and the Water Crisis: Subsidizing Drought
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-lg text-gray-600">
            {fmtMoney(droughtTotal)} in farm subsidies flow to drought-prone states — encouraging water-intensive
            agriculture in the driest parts of America.
          </p>
          <ShareButtons title="Farm Subsidies and the Water Crisis" />
        </div>
      </div>

      <div className="prose max-w-none">
        {/* Key stats */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Drought State Subsidies', value: fmtMoney(droughtTotal), sub: '17 water-stressed states' },
            { label: 'Colorado River Basin', value: fmtMoney(coloradoTotal), sub: '7 basin states' },
            { label: 'Ogallala Aquifer', value: fmtMoney(ogallalaTotal), sub: '8 aquifer states' },
            { label: 'California Alone', value: fmtMoney(ca.amount), sub: `${fmt(ca.payments)} payments` },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm font-medium text-gray-900">{s.label}</div>
              <div className="text-xs text-gray-500">{s.sub}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Paradox: Subsidizing Water-Intensive Farming in Dry Places</h2>
        <p>
          The American West is running out of water. The Colorado River no longer reaches the sea. The Ogallala
          Aquifer — the underground ocean beneath the Great Plains — is being pumped dry faster than it can recharge.
          California endures mega-drought cycles that threaten the most productive agricultural region on Earth.
        </p>
        <p>
          And yet, billions in federal farm subsidies continue to flow to these very states, incentivizing the
          water-intensive crops that drive the crisis. Our USDA payment data reveals the scale:
          drought-prone states received {fmtMoney(droughtTotal)} — that&apos;s {((droughtTotal / stats.totalAmount) * 100).toFixed(1)}%
          of all farm subsidies — from 2017-2025.
        </p>

        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">🚨 The Core Problem</p>
          <p className="text-sm text-gray-700 mt-1">
            Farm subsidies don&apos;t account for water scarcity. A farmer growing water-intensive alfalfa in the
            Arizona desert receives the same subsidy structure as one growing rain-fed wheat in Ohio. The market
            signal to conserve water is muted by federal payments.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Colorado River: Subsidizing Depletion</h2>
        <p>
          The Colorado River supplies water to 40 million people across seven states and Mexico. Agriculture
          consumes roughly 70-80% of that water. And the states draining it receive significant farm subsidies:
        </p>

        <div className="not-prose my-8">
          <h3 className="text-lg font-bold mb-3">Colorado River Basin States — Farm Subsidy Receipts</h3>
          <div className="space-y-3">
            {coloradoData.map(s => {
              const pct = (s.amount / coloradoTotal) * 100
              return (
                <div key={s.abbr} className="flex items-center gap-3">
                  <span className="w-28 text-sm font-medium text-gray-900">{s.name}</span>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-primary w-20 text-right">{fmtMoney(s.amount)}</span>
                </div>
              )
            })}
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Total: {fmtMoney(coloradoTotal)} in farm subsidies to Colorado River basin states.
            California alone accounts for {((ca.amount / coloradoTotal) * 100).toFixed(1)}% of the basin total.
          </p>
        </div>

        <p>
          California&apos;s top subsidized programs include CFAP payments ({fmtMoney(ca.topPrograms[0]?.amount ?? 0)}),
          specialty crop marketing assistance, and livestock emergency programs. Many of these support water-intensive
          operations: dairies, nut orchards, and irrigated row crops in the Central Valley.
        </p>
        <p>
          Arizona — home to one of the most contentious water conflicts in the West — received {fmtMoney(az.amount)} in
          farm subsidies. Its top program is Price Loss Coverage at {fmtMoney(az.topPrograms[0]?.amount ?? 0)},
          supporting crops like cotton and alfalfa that consume massive quantities of Colorado River water.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 The Alfalfa Problem</p>
          <p className="text-sm text-gray-700 mt-1">
            Alfalfa — a thirsty forage crop used primarily to feed cattle — is one of the largest water consumers
            in the Colorado River basin. It&apos;s grown extensively in Arizona, California, and Colorado, often
            on subsidized land using subsidized water from federal irrigation projects. Some of this alfalfa is
            exported to water-scarce countries like Saudi Arabia and the UAE.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Ogallala Aquifer: Mining Water for Subsidized Crops</h2>
        <p>
          The Ogallala (High Plains) Aquifer underlies eight states from South Dakota to Texas. It provides roughly
          30% of all irrigation water in the United States. And it&apos;s being depleted at an alarming rate —
          some areas have lost over 150 feet of water table since the 1950s, with recharge rates of less than
          one inch per year.
        </p>
        <p>
          The states atop the Ogallala received {fmtMoney(ogallalaTotal)} in farm subsidies — {((ogallalaTotal / stats.totalAmount) * 100).toFixed(1)}%
          of all USDA payments in our dataset.
        </p>

        <div className="not-prose my-8">
          <h3 className="text-lg font-bold mb-3">Ogallala Aquifer States — Farm Subsidy Receipts</h3>
          <div className="space-y-3">
            {ogallalaData.map(s => {
              const pct = (s.amount / ogallalaTotal) * 100
              return (
                <div key={s.abbr} className="flex items-center gap-3">
                  <span className="w-28 text-sm font-medium text-gray-900">{s.name}</span>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-amber-500 h-3 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-primary w-20 text-right">{fmtMoney(s.amount)}</span>
                </div>
              )
            })}
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Texas ({fmtMoney(tx.amount)}), Kansas ({fmtMoney(ks.amount)}), and Nebraska ({fmtMoney(ne.amount)}) are
            the top three — together accounting for {fmtMoney(tx.amount + ks.amount + ne.amount)} or {(((tx.amount + ks.amount + ne.amount) / ogallalaTotal) * 100).toFixed(1)}% of Ogallala-region subsidies.
          </p>
        </div>

        <p>
          Kansas and Nebraska are the epicenter of irrigated corn production on the High Plains. Their top programs —
          ARC, MFP (trade war), and emergency payments — all support corn and soybeans, crops that require
          significant irrigation in the semi-arid climate. Each acre of irrigated corn on the Ogallala consumes
          roughly 12-18 inches of water per season — water that took thousands of years to accumulate underground.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">California&apos;s Water Wars</h2>
        <p>
          California presents the starkest case of the subsidy-water nexus. The state is the nation&apos;s top
          agricultural producer, generating $50+ billion in farm revenue annually. It also faces chronic water
          shortages, mandatory cutbacks, and bitter political fights over allocation.
        </p>
        <p>
          California received {fmtMoney(ca.amount)} in farm subsidies across {fmt(ca.payments)} payments.
          Its top programs tell the water story:
        </p>

        <div className="not-prose my-8">
          <h3 className="text-lg font-bold mb-3">California&apos;s Top 10 Subsidy Programs</h3>
          <div className="space-y-2">
            {ca.topPrograms.map((p, i) => (
              <div key={p.program} className="flex items-center gap-3">
                <span className="text-sm font-mono text-gray-500 w-6">{i + 1}.</span>
                <span className="flex-1 text-sm text-gray-900 truncate">{p.program.split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}</span>
                <span className="text-sm font-bold text-primary">{fmtMoney(p.amount)}</span>
              </div>
            ))}
          </div>
        </div>

        <p>
          COVID relief (CFAP) dominates at {fmtMoney(ca.topPrograms[0]?.amount ?? 0)} — reflecting the disruption to
          California&apos;s specialty crop and dairy industries. But programs like Dairy Margin Coverage
          ({fmtMoney(ca.topPrograms.find(p => p.program.includes('DAIRY'))?.amount ?? 0)}) directly support one of
          the most water-intensive agricultural sectors. A single dairy cow requires 30-50 gallons of drinking water
          per day, plus the water to grow its feed.
        </p>

        <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">🌾 Water-Intensive Crops Receiving Subsidies</p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-700">
            <div><strong>Alfalfa:</strong> 4-6 acre-feet/year</div>
            <div><strong>Rice:</strong> 5-7 acre-feet/year</div>
            <div><strong>Cotton:</strong> 2.5-4 acre-feet/year</div>
            <div><strong>Corn (irrigated):</strong> 1.5-2.5 acre-feet/year</div>
            <div><strong>Almonds/Walnuts:</strong> 3-4 acre-feet/year</div>
            <div><strong>Dairy (feed):</strong> 3-5 acre-feet/cow/year</div>
          </div>
          <p className="text-xs text-gray-500 mt-2">1 acre-foot = 325,851 gallons — enough for 1-2 households for a year.</p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Livestock Forage Paradox</h2>
        <p>
          The Livestock Forage Program (LFP) — at {fmtMoney(7003903700)} across our dataset — deserves special
          attention in the water crisis context. LFP pays ranchers when drought reduces grazing capacity.
          Texas alone received {fmtMoney(tx.topPrograms.find(p => p.program.includes('LIVESTOCK FORAGE'))?.amount ?? 0)} in
          LFP payments, and Oklahoma {fmtMoney(states.find(s => s.abbr === 'OK')?.topPrograms.find(p => p.program.includes('LIVESTOCK FORAGE'))?.amount ?? 0)}.
        </p>
        <p>
          The paradox: LFP compensates ranchers for drought damage without requiring any water conservation measures.
          It treats drought as an unpredictable disaster rather than a structural reality of the semi-arid West.
          As climate change makes droughts more frequent and severe, LFP payments will only grow — subsidizing
          the continuation of water-intensive ranching in places where water is disappearing.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">Conservation Programs: The Counter-Current</h2>
        <p>
          Not all subsidy spending worsens the water crisis. The Conservation Reserve Program (CRP) pays farmers to
          retire environmentally sensitive land — and in water-stressed regions, CRP can reduce irrigation demand.
          Colorado received {fmtMoney(co.topPrograms.find(p => p.program.includes('CRP'))?.amount ?? 0)} in CRP
          payments, helping take marginal land out of irrigated production.
        </p>
        <p>
          But CRP is dwarfed by production-oriented programs. For every dollar spent retiring water-intensive
          farmland through conservation, multiple dollars flow through PLC, ARC, and emergency programs that
          incentivize continued production — even in places running out of water.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What Would Water-Smart Subsidies Look Like?</h2>

        <div className="not-prose space-y-4 my-8">
          {[
            {
              title: 'Water Pricing Reform',
              desc: 'Tie subsidy eligibility to efficient water use. Farmers using flood irrigation on subsidized land in drought zones would face reduced payments — incentivizing drip irrigation and other conservation technology.',
            },
            {
              title: 'Aquifer Depletion Surcharge',
              desc: 'Reduce subsidies in regions where groundwater is being pumped faster than it recharges. The Ogallala states would see payment reductions unless they adopt sustainable pumping rates.',
            },
            {
              title: 'Crop Switching Incentives',
              desc: 'Pay farmers to switch from water-intensive crops (alfalfa, cotton, rice) to drought-resistant alternatives. A "reverse subsidy" that pays for conservation rather than production.',
            },
            {
              title: 'Expand CRP in Water-Critical Zones',
              desc: 'Target CRP enrollment to aquifer recharge areas and riparian corridors. Pay higher rental rates for land retirement in the most water-stressed regions.',
            },
            {
              title: 'Transparency on Water Use',
              desc: 'Require subsidy recipients to report water consumption alongside payment data. Currently, there\'s no linkage between USDA payment records and water usage — making it impossible to assess the water cost of each subsidy dollar.',
            },
          ].map((r, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💧</span>
                <div>
                  <h4 className="font-bold text-gray-900">{r.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{r.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Bottom Line</h2>
        <p>
          The United States spends {fmtMoney(droughtTotal)} subsidizing agriculture in water-stressed states — {((droughtTotal / stats.totalAmount) * 100).toFixed(1)}%
          of all farm subsidy dollars. These payments encourage the continuation of water-intensive farming in regions
          where aquifers are depleting, rivers are shrinking, and cities are rationing.
        </p>
        <p>
          Farm subsidies were designed in an era of water abundance. The 21st century demands a rethink. Without
          reform, taxpayers will continue paying twice: once for the subsidies that encourage unsustainable water use,
          and again for the infrastructure projects, water imports, and disaster relief that result from depletion.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Source</p>
          <p>Farm subsidy data from USDA Farm Service Agency payment records, 2017-2025. Water consumption estimates
          from USGS, Bureau of Reclamation, and state water agency reports. Aquifer depletion data from the
          Kansas Geological Survey and USGS High Plains Aquifer monitoring network.</p>
        </div>

        <RelatedArticles currentSlug="water-crisis" />
      </div>
    </article>
  )
}
