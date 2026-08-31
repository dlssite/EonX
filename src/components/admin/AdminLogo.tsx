/**
 * AdminLogo — shown on the Payload login page.
 * 'use client' is required — Payload renders graphics components client-side.
 */
'use client'

export function AdminLogo() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 0 4px',
      }}
    >
      {/* Gradient mark */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6C63FF" />
            <stop offset="100%" stopColor="#FF6B35" />
          </linearGradient>
        </defs>
        {/* Hexagon mark */}
        <path
          d="M24 4L42 14V34L24 44L6 34V14L24 4Z"
          stroke="url(#logo-grad)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M24 12L36 19V33L24 40L12 33V19L24 12Z"
          fill="url(#logo-grad)"
          opacity="0.15"
        />
        {/* E letterform */}
        <path
          d="M17 18H31M17 24H28M17 30H31"
          stroke="url(#logo-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Wordmark */}
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: '1.5rem',
          letterSpacing: '-0.03em',
          background: 'linear-gradient(135deg, #A9A4FF 0%, #FF8A5C 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
        }}
      >
        Eonrisia
      </div>

      {/* Sub-label */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'rgba(244,244,248,0.30)',
        }}
      >
        Content Studio
      </div>
    </div>
  )
}
