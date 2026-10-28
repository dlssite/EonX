# Typography — Eonrisia

## Status

The website currently uses the **Field Notes / Living Atlas** visual direction. The type system below is part of the redesign proposal and is pending formal ratification through the constitution's amendment process.

## Typefaces

### Display — Fraunces

- Weights: 400, 500, 600, 700
- Usage: Editorial headlines, page titles, and section headings
- Character: Warm, expressive, and literary

### Body and UI — DM Sans

- Weights: 400, 500, 600, 700
- Usage: Body copy, navigation, controls, captions, and metadata
- Character: Clear and highly legible across screen sizes

### Monospace — DM Mono

- Weights: 400, 500
- Usage: Technical labels, code, and compact metadata
- Character: Quiet and functional

## Type Scale

Type sizes and line heights are defined as CSS custom properties in `src/styles/tokens.css`.

| Token | Size | Usage |
|---|---|---|
| `--text-display` | `clamp(2.125rem, 6.5vw, 5rem)` | Hero headlines |
| `--text-h1` | `clamp(1.75rem, 4.5vw, 3.25rem)` | Page titles |
| `--text-h2` | `clamp(1.375rem, 3.25vw, 2.25rem)` | Section headings |
| `--text-h3` | `1.5rem` | Subsection headings |
| `--text-h4` | `1.125rem` | Card titles and labels |
| `--text-body-lg` | `1.125rem` | Lead paragraphs |
| `--text-body` | `1rem` | Standard body copy |
| `--text-body-sm` | `0.875rem` | Captions and metadata |
| `--text-label` | `0.75rem` | Tags, badges, and eyebrows |

## Usage Rules

- Use Fraunces for display and editorial headings; use DM Sans for body text and interface controls.
- Keep body copy to a readable line length and use generous line height.
- Scale large headings responsively to avoid overflow on narrow viewports.
- Use uppercase labels sparingly, with increased tracking for clear hierarchy.

## Tailwind Mapping

```ts
fontFamily: {
  display: ['Fraunces', 'Georgia', 'serif'],
  body: ['DM Sans', 'system-ui', 'sans-serif'],
  mono: ['DM Mono', 'monospace'],
},
```
