import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // ── Dark surfaces (default / dark mode) ─────────────────
        base: {
          50:  '#FAFAFD',
          100: '#F4F4F8',
          200: '#E8E8F0',
          700: '#252535',
          800: '#1A1A26',
          900: '#111118',
          950: '#0A0A0F',
        },
        // ── Light surfaces (light mode) ──────────────────────────
        surface: {
          50:  '#FFFFFF',
          100: '#F8F8FC',
          200: '#F0F0F8',
          300: '#E2E2EE',
          400: '#C8C8DC',
          700: '#5A5A72',
          800: '#3A3A50',
          900: '#1A1A2E',
        },
        // ── Brand purple ─────────────────────────────────────────
        brand: {
          300: '#A9A4FF',
          400: '#8A83FF',
          500: '#6C63FF',
          600: '#5148D4',
          700: '#3A33A8',
        },
        // ── Accent orange ─────────────────────────────────────────
        accent: {
          400: '#FF8A5C',
          500: '#FF6B35',
          600: '#E0531A',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        error:   '#EF4444',
        info:    '#3B82F6',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Syne', 'sans-serif'],
        body:    ['var(--font-body)',    'Inter', 'sans-serif'],
        mono:    ['var(--font-mono)',    'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        // Hero display — larger max cap for more visual impact
        'display':    ['clamp(3rem, 7vw, 5.5rem)',    { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        // Section headings
        'h1':         ['clamp(2.25rem, 5vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'h2':         ['clamp(1.75rem, 3.5vw, 2.5rem)',{ lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'h3':         ['1.5rem',                        { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'h4':         ['1.125rem',                      { lineHeight: '1.3'  }],
        // Body sizes
        'body-lg':    ['1.125rem',                      { lineHeight: '1.75' }],
        'body':       ['1rem',                          { lineHeight: '1.7'  }],
        'body-sm':    ['0.875rem',                      { lineHeight: '1.6'  }],
        'label':      ['0.75rem',                       { lineHeight: '1.5'  }],
        'label-xs':   ['0.6875rem',                     { lineHeight: '1.4'  }],
      },
      borderRadius: {
        sm:    '0.25rem',
        md:    '0.5rem',
        lg:    '0.75rem',
        xl:    '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        full:  '9999px',
      },
      boxShadow: {
        // Dark mode shadows (heavier opacity)
        sm:    '0 1px 2px 0 rgba(0,0,0,0.4)',
        md:    '0 4px 12px 0 rgba(0,0,0,0.5)',
        lg:    '0 8px 24px 0 rgba(0,0,0,0.6)',
        xl:    '0 16px 40px 0 rgba(0,0,0,0.7)',
        // Brand glow
        brand: '0 0 24px 0 rgba(108,99,255,0.35)',
        'brand-lg': '0 0 48px 0 rgba(108,99,255,0.25)',
        // Light mode shadows (softer)
        'light-sm': '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.06)',
        'light-md': '0 4px 12px 0 rgba(0,0,0,0.08)',
        'light-lg': '0 8px 24px 0 rgba(0,0,0,0.10)',
        // Card lift on hover
        'card-hover': '0 20px 48px 0 rgba(0,0,0,0.5)',
      },
      transitionDuration: {
        instant: '50ms',
        fast:    '150ms',
        normal:  '250ms',
        slow:    '400ms',
        slower:  '600ms',
      },
      maxWidth: {
        container: '1280px',
        prose:     '68ch',
      },
      zIndex: {
        raised:   '10',
        dropdown: '100',
        sticky:   '200',
        overlay:  '300',
        modal:    '400',
        toast:    '500',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.03em',
        tight:    '-0.02em',
        normal:   '0em',
        wide:     '0.05em',
        widest:   '0.12em',
      },
      // Fluid spacing helpers used in sections
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
    },
  },
  plugins: [],
}

export default config
