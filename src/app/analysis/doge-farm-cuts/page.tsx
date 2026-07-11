import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { fmtMoney, fmt } from '@/lib/utils'
import { loadData } from '@/lib/server-utils'
import type { Metadata } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import ArticleSchema from '@/components/ArticleSchema'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'DOGE Impact on Farm Programs: What Got Cut, What Survived',
  description: 'DOGE targeted USDA bureaucracy, zombie programs, and overhead. Here\'s what actually got cut, what survived scrutiny, and what the data says about farm program efficiency.',
  alternates: { canonical: 'https://www.opensubsidies.org/analysis/doge-farm-cuts' },
  openGraph: {
    title: 'DOGE Impact on Farm Programs: What Got Cut, What Survived',
    description: 'DOGE targeted USDA bureaucracy, zombie programs, and overhead. Here\'s what actually got cut, what survived scrutiny, and what the data says about farm program efficiency.',
    url: 'https://www.opensubsidies.org/analysis/doge-farm-cuts',
    type: 'article',
  },
}

export default function DogeFarmCuts() {
  const stats = loadData('stats.json') as { totalPayments: number; totalAmount: number; totalPrograms: number; dataYears: string; lastUpdated: string }
  const programs = loadData('programs.json') as { program: string; payments: number; amount: number }[]
  const zombieData = loadData('zombie-programs.json') as { totalPrograms: number; zombieCount: number; zombieThreshold: number; programs: { program: string; payments: number; amount: number; lastYear?: number }[] }
  const zombies = zombieData.programs || []

  const zombieTotal = zombies.reduce((s: number, z: { amount: number }) => s + z.amount, 0)
  const zombieCount = zombieData.zombieCount || zombies.length

  const emergencyTotal = programs.filter(p =>
    p.program.includes('EMERGENCY') || p.program.includes('EMGNCY') || p.program.includes('DISASTER') ||
    p.program.includes('CFAP') || p.program.includes('RELIEF') || p.program.includes('WHIP')
  ).reduce((s, p) => s + p.amount, 0)

  const conservationTotal = programs.filter(p =>
    p.program.includes('CRP') || p.program.includes('CONSERVATION') || p.program.includes('GRASSLAND')
  ).reduce((s, p) => s + p.amount, 0)

  const commodityTotal = programs.filter(p =>
    p.program.includes('PRICE LOSS') || p.program.includes('AGRICULTURAL RISK') || p.program.includes('ARC')
  ).reduce((s, p) => s + p.amount, 0)

  const smallPrograms = programs.filter(p => p.payments < 100)
  const smallProgramTotal = smallPrograms.reduce((s, p) => s + p.amount, 0)

  const topPrograms = programs.slice(0, 5)
  const top5Total = topPrograms.reduce((s, p) => s + p.amount, 0)
  const top5Pct = (top5Total / stats.totalAmount) * 100

  const topZombies = [...zombies].sort((a, b) => b.amount - a.amount).slice(0, 10)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What farm programs did DOGE target?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'DOGE targeted USDA administrative overhead, zombie programs with few or no recent recipients, duplicative emergency programs, and FSA field office staffing. The focus was primarily on bureaucratic costs and program proliferation rather than major commodity or conservation programs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Did DOGE cut farm subsidies to farmers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'DOGE primarily targeted administrative overhead and zombie programs rather than direct farmer payments. The major commodity programs (PLC, ARC) and conservation programs (CRP) largely survived because they have strong Congressional authorization and active constituencies. DOGE cuts focused on the bureaucratic delivery system, not the payments themselves.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are zombie farm programs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Zombie programs are USDA payment programs that continue to exist on the books despite serving few or no recipients. They were often created as one-time responses to specific crises — trade wars, hurricanes, pandemics — and never officially sunset. They consume administrative resources even when distributing minimal payments.',
        },
      },
      {
        '@type': 'Question',
        name: 'How did FSA office closures affect farmers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'USDA Farm Service Agency office consolidations and staffing reductions made it harder for some farmers to access program enrollment, certification, and payment processing in person. Critics argue this disproportionately affects older farmers and those in remote areas. Supporters counter that most services can be delivered digitally and that maintaining underutilized offices wastes taxpayer money.',
        },
      },
    ],
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <ArticleSchema
        title="DOGE Impact on Farm Programs: What Got Cut, What Survived"
        description="DOGE targeted USDA bureaucracy, zombie programs, and overhead. Here's what actually got cut, what survived scrutiny, and what the data says about farm program efficiency."
        slug="analysis/doge-farm-cuts"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'DOGE Farm Cuts' }]} />

      <div className="mb-8">
        <span className="text-sm font-medium text-primary">Analysis · July 2026</span>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mt-2 mb-4">
          DOGE Impact on Farm Programs: What Got Cut, What Survived
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-lg text-gray-600">
            The Department of Government Efficiency came for USDA. {fmt(zombieCount)} zombie programs,
            {' '}{fmt(stats.totalPrograms)} total programs, and billions in overhead faced scrutiny.
            Here&apos;s what the chainsaw actually hit.
          </p>
          <ShareButtons title="DOGE Impact on Farm Programs: What Got Cut, What Survived" />
        </div>
      </div>

      <div className="prose max-w-none">
        {/* Key stats */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Total Programs', value: fmt(stats.totalPrograms), sub: 'USDA payment programs' },
            { label: 'Zombie Programs', value: fmt(zombieCount), sub: 'Minimal/no activity' },
            { label: 'Zombie Spending', value: fmtMoney(zombieTotal), sub: 'Historical total' },
            { label: 'Emergency Spending', value: fmtMoney(emergencyTotal), sub: 'Ad hoc programs' },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm font-medium text-gray-900">{s.label}</div>
              <div className="text-xs text-gray-500">{s.sub}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">DOGE Meets the USDA</h2>
        <p>
          When the Department of Government Efficiency turned its attention to USDA, it found exactly
          what you&apos;d expect from a bureaucracy that has grown unchecked for decades:
          {' '}{fmt(stats.totalPrograms)} distinct payment programs, {fmt(zombieCount)} zombie programs
          that serve few or no recipients, and an administrative apparatus that costs billions to maintain.
        </p>
        <p>
          The reaction was predictable. Farm lobbies and rural legislators sounded the alarm about
          threats to the &quot;farm safety net.&quot; Media coverage focused on FSA office closures and potential
          disruptions to farmer services. Lost in the noise was a straightforward question: does it
          really take {fmt(stats.totalPrograms)} programs and thousands of federal employees to deliver
          {' '}{fmtMoney(stats.totalAmount)} in payments?
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">What DOGE Targeted</h2>
        <p>
          DOGE&apos;s approach to farm programs focused on three areas: administrative overhead, zombie
          programs, and duplicative structures. Notably, they largely avoided direct confrontation
          with the major commodity and conservation programs that have entrenched Congressional support.
        </p>

        <div className="not-prose space-y-4 my-8">
          {[
            {
              icon: '🏢',
              title: 'FSA Office Consolidation',
              desc: 'USDA operates over 2,100 Farm Service Agency offices — roughly one for every 900 farms. DOGE flagged offices with low utilization, proposing consolidations in areas where neighboring offices serve overlapping territories.',
              status: 'Partially implemented',
              statusColor: 'text-amber-600',
            },
            {
              icon: '💀',
              title: 'Zombie Program Elimination',
              desc: `${fmt(zombieCount)} programs identified as having minimal or no recent activity. These programs consume administrative overhead — staff time, IT systems, regulatory compliance — while delivering little to farmers.`,
              status: 'Targeted for elimination',
              statusColor: 'text-red-600',
            },
            {
              icon: '👥',
              title: 'USDA Staffing Reductions',
              desc: 'USDA employs roughly 100,000 people across dozens of agencies. DOGE identified positions in administrative, compliance, and back-office functions that could be reduced through attrition and buyouts.',
              status: 'Ongoing reductions',
              statusColor: 'text-amber-600',
            },
            {
              icon: '📋',
              title: 'Emergency Program Sunset',
              desc: `Ad hoc emergency programs totaling ${fmtMoney(emergencyTotal)} were created for specific crises but never formally ended. DOGE flagged programs where the underlying emergency (COVID, trade war) has long passed.`,
              status: 'Under review',
              statusColor: 'text-blue-600',
            },
          ].map(item => (
            <div key={item.title} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <span className={`text-xs font-medium ${item.statusColor}`}>{item.status}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Zombie Program Graveyard</h2>
        <p>
          Our <Link href="/analysis/zombie-programs">zombie programs analysis</Link> identified {fmt(zombieCount)} USDA
          payment programs that are effectively dead — minimal recent activity, few recipients, but still
          technically on the books. These are prime DOGE targets because eliminating them saves administrative
          cost with minimal political backlash (nobody lobbies for a program that serves 12 people).
        </p>

        <div className="not-prose my-8">
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-4">Top Zombie Programs by Historical Spending</h3>
          <div className="space-y-2">
            {topZombies.map((z, i) => {
              const pct = (z.amount / zombieTotal) * 100
              return (
                <div key={z.program} className="flex items-center gap-3">
                  <span className="text-sm font-mono text-gray-500 w-6">{i + 1}.</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-900 truncate max-w-xs">
                        {z.program.split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}
                      </span>
                      <span className="text-primary font-bold">{fmtMoney(z.amount)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-400 h-2 rounded-full" style={{ width: `${Math.min(pct * 3, 100)}%` }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            These {fmt(zombieCount)} zombie programs represent {fmtMoney(zombieTotal)} in historical spending
            and ongoing administrative overhead.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">What Survived — and Why</h2>
        <p>
          The major farm programs emerged from DOGE scrutiny largely intact. This wasn&apos;t an accident —
          it reflects political reality and, in some cases, genuine programmatic merit:
        </p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          <div className="bg-green-50 rounded-lg p-5 border border-green-200">
            <h4 className="font-bold text-gray-900 mb-2">✅ Survived DOGE Scrutiny</h4>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-900">Conservation Reserve Program (CRP)</span>
                <p className="text-gray-600">{fmtMoney(programs.filter(p => p.program.includes('CRP')).reduce((s, p) => s + p.amount, 0))} — Strong bipartisan support, clear environmental outcomes, well-audited.</p>
              </div>
              <div>
                <span className="font-medium text-gray-900">Price Loss Coverage (PLC)</span>
                <p className="text-gray-600">{fmtMoney(programs.find(p => p.program === 'PRICE LOSS COVERAGE PROGRAM')?.amount ?? 0)} — Core Farm Bill safety net, strong farm-state Congressional backing.</p>
              </div>
              <div>
                <span className="font-medium text-gray-900">Agricultural Risk Coverage (ARC)</span>
                <p className="text-gray-600">{fmtMoney(programs.find(p => p.program === 'AGRICULTURAL RISK COVERAGE PROG - COUNTY')?.amount ?? 0)} — Complementary to PLC, data-driven trigger mechanism.</p>
              </div>
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-5 border border-red-200">
            <h4 className="font-bold text-gray-900 mb-2">❌ Targeted for Cuts</h4>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-900">Zombie Programs</span>
                <p className="text-gray-600">{fmt(zombieCount)} programs with minimal activity — prime targets for elimination.</p>
              </div>
              <div>
                <span className="font-medium text-gray-900">Expired Emergency Programs</span>
                <p className="text-gray-600">COVID-era and trade war programs still on the books years after the emergency ended.</p>
              </div>
              <div>
                <span className="font-medium text-gray-900">Administrative Overhead</span>
                <p className="text-gray-600">2,100+ FSA offices, many with declining utilization as farming consolidates.</p>
              </div>
            </div>
          </div>
        </div>

        <p>
          The programs that survived share common traits: clear statutory authorization, active and
          vocal constituencies, strong Congressional champions, and (in most cases) measurable outcomes.
          The programs targeted for cuts lack one or more of these protections — which is precisely
          why they&apos;re ripe for elimination.
        </p>

        <h2 className="font-[family-name:var(--font-heading)]">The FSA Office Debate</h2>
        <p>
          The most politically charged DOGE action was proposing consolidation of Farm Service Agency
          field offices. With over 2,100 locations — many in small towns where the FSA office is a
          significant federal presence — closures triggered immediate backlash from rural legislators
          of both parties.
        </p>
        <p>
          The numbers tell a more nuanced story. American farming has consolidated dramatically: the
          number of farms has declined from over 6 million in the 1930s to roughly 2 million today,
          and the average farm size has tripled. Many FSA offices serve a fraction of the farmers they
          were built for. Meanwhile, digital enrollment and certification tools have made in-person
          visits less necessary for most transactions.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg my-6 not-prose">
          <p className="font-semibold text-gray-900">💡 The Rural Office Paradox</p>
          <p className="text-sm text-gray-700 mt-1">
            Critics of FSA office closures argue they hurt the farmers who most need help — older
            operators, those without reliable internet, those in remote areas. But maintaining an
            office that serves 50 farmers at a cost of $500,000/year means each farmer&apos;s in-person
            convenience costs taxpayers $10,000 annually. At some point, a mobile service van or
            a digital kiosk becomes the more responsible use of public money.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">Program Delivery vs. Program Payments</h2>
        <p>
          The critical distinction that gets lost in the DOGE debate: cutting administrative overhead
          is not the same as cutting farmer payments. DOGE&apos;s primary targets were the delivery
          mechanism — offices, staff, IT systems, compliance infrastructure — not the subsidy checks
          themselves.
        </p>
        <p>
          This distinction matters because the top 5 programs account for {top5Pct.toFixed(0)}% of
          all {fmtMoney(stats.totalAmount)} in spending. These programs are authorized by Congress,
          funded through mandatory appropriations, and legally obligated to make payments to eligible
          farmers regardless of USDA staffing levels. DOGE can&apos;t cut PLC payments by closing an
          FSA office — but it can make those payments cheaper to deliver.
        </p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          <div className="bg-gray-50 rounded-lg p-5">
            <h4 className="font-bold text-gray-900 mb-2">Program Payments</h4>
            <div className="text-3xl font-bold text-primary">{fmtMoney(stats.totalAmount)}</div>
            <div className="text-sm text-gray-500">Direct payments to recipients</div>
            <p className="text-sm text-gray-600 mt-2">
              These are the actual subsidy checks. DOGE has limited ability to reduce these — they&apos;re
              authorized by Congress through the Farm Bill. Only legislative action can change payment
              formulas and eligibility.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-5">
            <h4 className="font-bold text-gray-900 mb-2">Administrative Cost</h4>
            <div className="text-3xl font-bold text-red-600">~$8B/yr</div>
            <div className="text-sm text-gray-500">USDA operating budget (est.)</div>
            <p className="text-sm text-gray-600 mt-2">
              Staff, offices, IT, compliance, overhead. This is where DOGE has leverage — and where
              the {fmt(stats.totalPrograms)} programs create multiplicative complexity.
            </p>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">What the Data Shows</h2>
        <p>
          Our analysis of {fmt(stats.totalPayments)} payments across {fmt(stats.totalPrograms)} programs
          supports several DOGE premises — and challenges others:
        </p>

        <div className="not-prose space-y-4 my-8">
          {[
            {
              verdict: '✅ DOGE is right',
              title: 'Program Proliferation Is Real',
              desc: `${fmt(stats.totalPrograms)} distinct programs is indefensible. ${fmt(smallPrograms.length)} programs have fewer than 100 payments each, totaling ${fmtMoney(smallProgramTotal)}. The administrative cost of maintaining these programs likely exceeds their value.`,
            },
            {
              verdict: '✅ DOGE is right',
              title: 'Zombie Programs Should Be Eliminated',
              desc: `${fmt(zombieCount)} programs identified as zombies with ${fmtMoney(zombieTotal)} in historical spending. These create compliance burden and IT maintenance costs without delivering meaningful benefits.`,
            },
            {
              verdict: '⚠️ More nuanced',
              title: 'FSA Office Closures Need Care',
              desc: 'Consolidation makes fiscal sense, but implementation matters. Abrupt closures without digital alternatives hurt the most vulnerable farmers. A phased approach with mobile services would achieve savings without the disruption.',
            },
            {
              verdict: '⚠️ More nuanced',
              title: 'Emergency Programs Are Mixed',
              desc: `${fmtMoney(emergencyTotal)} in emergency spending includes both genuine disaster relief and programs that should have sunset years ago. The answer isn't eliminating all emergency authority — it's building sunset provisions into future programs.`,
            },
            {
              verdict: '❌ DOGE missed the mark',
              title: 'The Big Money Is Congressional',
              desc: `The top 5 programs at ${fmtMoney(top5Total)} (${top5Pct.toFixed(0)}% of spending) can only be reformed through legislation. DOGE can trim around the edges, but the fundamental spending structure requires Congressional action that neither party seems willing to take.`,
            },
          ].map(item => (
            <div key={item.title} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-sm font-medium whitespace-nowrap">{item.verdict}</span>
                <div>
                  <h4 className="font-bold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-heading)]">The Bigger Picture</h2>
        <p>
          DOGE&apos;s farm program scrutiny, for all the political drama, addressed the low-hanging fruit.
          Zombie programs, underutilized offices, and expired emergency authorities are easy targets
          because they have few defenders. The hard work — reforming the major commodity programs,
          means-testing payments, consolidating the program structure — requires legislation that
          Congress has consistently refused to pass.
        </p>
        <p>
          That said, DOGE accomplished something valuable: it forced a public conversation about
          {' '}{fmt(stats.totalPrograms)} programs, {fmt(zombieCount)} zombies, and billions in
          administrative overhead that most Americans didn&apos;t know existed. Transparency is the
          prerequisite for reform. For more on the programs DOGE flagged, see our
          {' '}<Link href="/doge-farm-subsidies">DOGE farm subsidies tracker</Link> and our analysis of
          {' '}<Link href="/analysis/program-proliferation">program proliferation</Link>.
        </p>
        <p>
          The question going forward: will the efficiency gains stick, or will the bureaucratic immune
          system regenerate what was cut? History suggests the latter — but the data is now public,
          the zombie programs are now named, and the case for reform is harder to ignore. See our
          analysis of <Link href="/analysis/emergency-management">emergency program management</Link> for
          how these programs accumulated in the first place.
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg my-6 not-prose text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">📊 Data Source</p>
          <p>Analysis based on USDA Farm Service Agency payment records, {stats.dataYears}. Last updated {stats.lastUpdated}.
          DOGE actions referenced from public USDA announcements, Congressional testimony, and DOGE published reports.
          Administrative cost estimates from USDA budget justifications.</p>
        </div>

        <RelatedArticles currentSlug="doge-farm-cuts" />
      </div>
    </article>
  )
}
