import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Eonrisia — Community-Driven Creative Organization'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0F',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Brand gradient bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #6C63FF, #FF6B35)',
          }}
        />
        {/* Subtle background glow */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)',
          }}
        />
        {/* Eyebrow */}
        <div
          style={{
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#6C63FF',
            marginBottom: '20px',
          }}
        >
          EONRISIA.ORG
        </div>
        {/* Headline */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 800,
            color: '#F4F4F8',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '24px',
            maxWidth: '800px',
          }}
        >
          Building immersive worlds, together.
        </div>
        {/* Subtitle */}
        <div
          style={{
            fontSize: '22px',
            color: '#9494A8',
            lineHeight: 1.5,
            maxWidth: '600px',
          }}
        >
          Community-driven creative organization
        </div>
      </div>
    ),
    { ...size },
  )
}
