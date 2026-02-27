// @ts-nocheck
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

type DepState = { state: string; name: string; ratio: number; farmIncome: number; subsidies: number }

function fmtMoney(n: number) {
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B'
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(0) + 'M'
  return '$' + (n / 1e3).toFixed(0) + 'K'
}

export default function DependencyClient({ data }: { data: DepState[] }) {
  const sorted = [...data].sort((a, b) => b.ratio - a.ratio)

  return (
    <div>
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-8">
        <h3 className="font-semibold text-gray-700 mb-4">Subsidies as % of Farm Income by State</h3>
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sorted} layout="vertical" margin={{ left: 80, right: 40, top: 5, bottom: 5 }}>
              <XAxis type="number" tickFormatter={v => `${(v * 100).toFixed(0)}%`} domain={[0, 'auto']} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={75} />
              <Tooltip
                formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Dependency']}
                labelFormatter={(label: string) => label}
              />
              <Bar dataKey="ratio" radius={[0, 4, 4, 0]}>
                {sorted.map((entry, i) => (
                  <Cell key={entry.state} fill={entry.ratio > 0.3 ? '#15803d' : entry.ratio > 0.15 ? '#22c55e' : '#86efac'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              <th className="py-3 px-3 font-semibold text-gray-700">Rank</th>
              <th className="py-3 px-3 font-semibold text-gray-700">State</th>
              <th className="py-3 px-3 font-semibold text-gray-700 text-right">Subsidies</th>
              <th className="py-3 px-3 font-semibold text-gray-700 text-right">Farm Income</th>
              <th className="py-3 px-3 font-semibold text-gray-700 text-right">Dependency %</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s, i) => (
              <tr key={s.state} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-2.5 px-3 text-gray-400">{i + 1}</td>
                <td className="py-2.5 px-3 font-medium">
                  <a href={`/states/${s.state.toLowerCase()}`} className="text-primary hover:underline">{s.name}</a>
                </td>
                <td className="py-2.5 px-3 text-right">{fmtMoney(s.subsidies)}</td>
                <td className="py-2.5 px-3 text-right">{fmtMoney(s.farmIncome)}</td>
                <td className="py-2.5 px-3 text-right font-medium">
                  <span className={s.ratio > 0.3 ? 'text-red-600' : s.ratio > 0.15 ? 'text-amber-600' : 'text-green-600'}>
                    {(s.ratio * 100).toFixed(0)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
