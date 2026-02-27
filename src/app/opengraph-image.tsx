import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'OpenSubsidies — U.S. Farm Subsidy Data'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: 'linear-gradient(135deg, #166534 0%, #15803d 50%, #22c55e 100%)', color: 'white', fontFamily: 'system-ui' }}>
        <div style={{ fontSize: 72, fontWeight: 700, marginBottom: 16 }}>OpenSubsidies</div>
        <div style={{ fontSize: 32, opacity: 0.9, marginBottom: 32 }}>$147 Billion in Farm Subsidies. Every Dollar. Every Recipient.</div>
        <div style={{ display: 'flex', gap: 40, fontSize: 22, opacity: 0.8 }}>
          <span>8M+ Payments</span>
          <span>·</span>
          <span>157 Programs</span>
          <span>·</span>
          <span>50 States</span>
          <span>·</span>
          <span>28,875 Counties</span>
        </div>
        <div style={{ fontSize: 18, opacity: 0.6, marginTop: 32 }}>TheDataProject.ai</div>
      </div>
    ),
    { ...size }
  )
}
