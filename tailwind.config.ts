import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  // Activates dark: utilities when <html> has data-theme="dark" OR class="dark"
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // ── Base (semantic — responds to theme via CSS variables) ──────────
        // 950 = deepest bg / 100 = primary text. Both swap in light mode.
        // Using rgb(var()/alpha-value) so opacity modifiers work: bg-base-900/60
        base: {
          50:  'rgb(var(--color-base-50)  / <alpha-value>)',
          100: 'rgb(var(--color-base-100) / <alpha-value>)',
          200: 'rgb(var(--color-base-200) / <alpha-value>)',
          700: 'rgb(var(--color-base-700) / <alpha-value>)',
          800: 'rgb(var(--color-base-800) / <alpha-value>)',
          850: 'rgb(var(--color-base-850) / <alpha-value>)',
          900: 'rgb(var(--color-base-900) / <alpha-value>)',
          950: 'rgb(var(--color-base-950) / <alpha-value>)',
        },
        // ── Light surfaces (static — only used in explicit light-mode styles)
        surface: {
          50:  'rgb(var(--color-surface-50)  / <alpha-value>)',
          100: 'rgb(var(--color-surface-100) / <alpha-value>)',
          200: 'rgb(var(--color-surface-200) / <alpha-value>)',
          300: 'rgb(var(--color-surface-300) / <alpha-value>)',
          400: 'rgb(var(--color-surface-400) / <alpha-value>)',
          700: 'rgb(var(--color-surface-700) / <alpha-value>)',
          800: 'rgb(var(--color-surface-800) / <alpha-value>)',
          900: 'rgb(var(--color-surface-900) / <alpha-value>)',
        },
        // ── Brand purple (same in both modes) ─────────────────────────────
        brand: {
          300: 'rgb(var(--color-brand-300) / <alpha-value>)',
          400: 'rgb(var(--color-brand-400) / <alpha-value>)',
          500: 'rgb(var(--color-brand-500) / <alpha-value>)',
          600: 'rgb(var(--color-brand-600) / <alpha-value>)',
          700: 'rgb(var(--color-brand-700) / <alpha-value>)',
        },
        // ── Accent orange (same in both modes) ────────────────────────────
        accent: {
          400: 'rgb(var(--color-accent-400) / <alpha-value>)',
          500: 'rgb(var(--color-accent-500) / <alpha-value>)',
          600: 'rgb(var(--color-accent-600) / <alpha-value>)',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        error:   '#EF4444',
        info:    '#3B82F6',
      },
      borderColor: {
        glass: 'var(--border-glass)',
        'glass-subtle': 'var(--border-glass-subtle)',
        'glass-hover': 'var(--border-glass-hover)',
        'glass-strong': 'var(--border-glass-strong)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Syne', 'sans-serif'],
        body:    ['var(--font-body)',    'Inter', 'sans-serif'],
        mono:    ['var(--font-mono)',    'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display':  ['clamp(2.125rem, 6vw, 5.5rem)',     { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        'h1':       ['clamp(1.75rem, 4.5vw, 3.5rem)',    { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'h2':       ['clamp(1.375rem, 3.5vw, 2.5rem)',   { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'h3':       ['1.5rem',                            { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'h4':       ['1.125rem',                          { lineHeight: '1.3'  }],
        'body-lg':  ['1.125rem',                          { lineHeight: '1.75' }],
        'body':     ['1rem',                              { lineHeight: '1.7'  }],
        'body-sm':  ['0.875rem',                          { lineHeight: '1.6'  }],
        'label':    ['0.75rem',                           { lineHeight: '1.5'  }],
        'label-xs': ['0.6875rem',                         { lineHeight: '1.4'  }],
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
        sm:          '0 1px 2px 0 rgba(0,0,0,0.4)',
        md:          '0 4px 12px 0 rgba(0,0,0,0.5)',
        lg:          '0 8px 24px 0 rgba(0,0,0,0.6)',
        xl:          '0 16px 40px 0 rgba(0,0,0,0.7)',
        brand:       '0 0 24px 0 rgba(108,99,255,0.35)',
        'brand-lg':  '0 0 48px 0 rgba(108,99,255,0.25)',
        'light-sm':  '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.06)',
        'light-md':  '0 4px 12px 0 rgba(0,0,0,0.08)',
        'light-lg':  '0 8px 24px 0 rgba(0,0,0,0.10)',
        'card-hover':'0 20px 48px 0 rgba(0,0,0,0.5)',
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
