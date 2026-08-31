# Color System — Eonrisia

## Design Philosophy

The Eonrisia color system is built around two contrasting energies:
- **Deep, dark foundations** — communicates ambition, depth, and seriousness
- **Precise, luminous accents** — communicates clarity, credibility, and forward motion

The result is a palette that feels premium and purposeful — not startup-bright, not agency-generic.

---

## Palette

### Base (Backgrounds & Surfaces)

| Token | Hex | Usage |
|---|---|---|
| `--color-base-950` | `#0A0A0F` | Page background (darkest) |
| `--color-base-900` | `#111118` | Card backgrounds, elevated surfaces |
| `--color-base-800` | `#1A1A26` | Borders, subtle dividers |
| `--color-base-700` | `#252535` | Hover states on dark surfaces |
| `--color-base-100` | `#F4F4F8` | Page background (light mode) |
| `--color-base-50`  | `#FAFAFD` | Card backgrounds (light mode) |

### Brand (Primary)

| Token | Hex | Usage |
|---|---|---|
| `--color-brand-500` | `#6C63FF` | Primary CTA buttons, links, highlights |
| `--color-brand-400` | `#8A83FF` | Hover state for brand-500 |
| `--color-brand-300` | `#A9A4FF` | Subtle tints, active states |
| `--color-brand-600` | `#5148D4` | Pressed state for brand-500 |

### Accent (Secondary)

| Token | Hex | Usage |
|---|---|---|
| `--color-accent-500` | `#FF6B35` | Secondary emphasis, tags, badges |
| `--color-accent-400` | `#FF8A5C` | Hover on accent elements |

### Semantic

| Token | Hex | Usage |
|---|---|---|
| `--color-success` | `#22C55E` | Success states, confirmations |
| `--color-warning` | `#F59E0B` | Warnings, pending states |
| `--color-error`   | `#EF4444` | Errors, destructive actions |
| `--color-info`    | `#3B82F6` | Informational states |

### Text

| Token | Value | Usage |
|---|---|---|
| `--color-text-primary` | `#F4F4F8` | Primary body text (dark mode) |
| `--color-text-secondary` | `#9494A8` | Secondary/muted text |
| `--color-text-tertiary` | `#5C5C70` | Placeholder, disabled text |
| `--color-text-inverse` | `#0A0A0F` | Text on light backgrounds |

---

## Color Modes

The site supports both **dark mode** (default) and **light mode**. Dark mode is the primary design surface — it matches the bold, cinematic identity. Light mode is fully supported for accessibility and user preference.

CSS custom properties are scoped to `:root` (dark) and `[data-theme="light"]`.

---

## Contrast Requirements

All text/background combinations must meet WCAG AA at minimum. Target AAA for body text.

| Combination | Ratio | Passes |
|---|---|---|
| `text-primary` on `base-950` | 15.2:1 | AAA |
| `text-secondary` on `base-950` | 5.1:1 | AA |
| `brand-500` on `base-950` | 4.6:1 | AA |
| `text-inverse` on `base-50` | 16.1:1 | AAA |

---

## Usage Rules

- **Never use raw hex values in components.** Always reference a CSS custom property token.
- **Brand-500 is for one CTA per viewport.** Overusing the brand color dilutes impact.
- **Accent-500 is for secondary emphasis only.** It is not a second primary color.
- **Gradients:** Only brand-to-accent gradients are permitted. No multi-stop rainbow gradients.

### Permitted Gradient
```css
background: linear-gradient(135deg, var(--color-brand-500), var(--color-accent-500));
```

---

## Tailwind CSS Mapping

These tokens are registered in `tailwind.config.ts` under `theme.extend.colors`:

```ts
colors: {
  base: {
    50:  'var(--color-base-50)',
    100: 'var(--color-base-100)',
    700: 'var(--color-base-700)',
    800: 'var(--color-base-800)',
    900: 'var(--color-base-900)',
    950: 'var(--color-base-950)',
  },
  brand: {
    300: 'var(--color-brand-300)',
    400: 'var(--color-brand-400)',
    500: 'var(--color-brand-500)',
    600: 'var(--color-brand-600)',
  },
  accent: {
    400: 'var(--color-accent-400)',
    500: 'var(--color-accent-500)',
  },
}
```
