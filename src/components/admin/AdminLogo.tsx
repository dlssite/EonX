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
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Hexagon mark */}
        <path
          d="M24 4L42 14V34L24 44L6 34V14L24 4Z"
          stroke="rgb(var(--color-accent-500))"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M24 12L36 19V33L24 40L12 33V19L24 12Z"
          fill="rgb(var(--color-brand-300))"
          opacity="0.2"
        />
        {/* E letterform */}
        <path
          d="M17 18H31M17 24H28M17 30H31"
          stroke="rgb(var(--color-brand-300))"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Wordmark */}
      <div
        style={{
          fontFamily: 'var(--font-display), Georgia, serif',
          fontWeight: 600,
          fontSize: '1.5rem',
          letterSpacing: '-0.03em',
          color: '#F2EFE2',
          lineHeight: 1,
        }}
      >
        Eonrisia
      </div>

      {/* Sub-label */}
      <div
        style={{
          fontFamily: 'var(--font-body), system-ui, sans-serif',
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'rgba(242,239,226,0.45)',
        }}
      >
        Content Studio
      </div>
    </div>
  )
}
