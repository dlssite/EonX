/**
 * AdminIcon — compact mark shown in the Payload nav sidebar header.
 * 'use client' is required — Payload renders graphics components client-side.
 */
'use client'

export function AdminIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Eonrisia"
    >
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
      <path
        d="M17 18H31M17 24H28M17 30H31"
        stroke="rgb(var(--color-brand-300))"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
