# Color System — Eonrisia

## Status

The website currently uses the **Field Notes / Living Atlas** visual direction: forest ink, warm paper, lime, and vermilion. This is a website redesign proposal, not an amendment to the constitution's brand law. Formal ratification remains pending through the amendment process.

## Design Philosophy

The palette pairs the depth of forest ink with the clarity of warm paper. Lime marks actions and active states; vermilion is reserved for occasional emphasis. The result is editorial and tactile rather than glossy or technology-generic.

## Palette

### Base

| Token | Hex | Usage |
|---|---|---|
| `--color-base-950` | `#0F1D17` | Dark page background |
| `--color-base-900` | `#192A21` | Dark elevated surfaces |
| `--color-base-800` | `#2B3B2F` | Dark borders and dividers |
| `--color-base-700` | `#435244` | Dark hover surfaces |
| `--color-base-100` | `#F2EFE2` | Warm light-mode ink |
| `--color-base-50` | `#FAF7EE` | Warm light-mode paper |

### Brand and Accent

| Token | Hex | Usage |
|---|---|---|
| `--color-brand-500` | `#226F48` | Forest-green primary actions |
| `--color-brand-400` | `#B3DC5C` | Lime highlights and focus states |
| `--color-brand-300` | `#D7EF7C` | Lime emphasis on dark surfaces |
| `--color-brand-600` | `#195638` | Pressed primary actions |
| `--color-accent-500` | `#E6654A` | Vermilion editorial emphasis |
| `--color-accent-400` | `#FFA377` | Lighter accent on dark surfaces |

### Semantic

| Token | Value | Usage |
|---|---|---|
| `--color-success` | `#22C55E` | Success states, confirmations |
| `--color-warning` | `#F59E0B` | Warnings, pending states |
| `--color-error` | `#EF4444` | Errors, destructive actions |
| `--color-info` | `#3B82F6` | Informational states |

## Color Modes

Both dark and light modes are supported. Dark mode uses forest ink and warm text; light mode uses warm paper and forest-ink text. Theme values are defined in `src/styles/tokens.css`.

## Usage Rules

- Prefer the shared CSS custom properties and Tailwind color utilities over raw values.
- Use lime deliberately for high-priority actions, focus indicators, and selected states.
- Reserve vermilion for small editorial accents rather than primary actions.
- Favor flat, legible surfaces and clear borders over glass, glow, or decorative gradients.
- Verify text and control contrast against WCAG AA before shipping.
