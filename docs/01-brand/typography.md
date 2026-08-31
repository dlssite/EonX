# Typography — Eonrisia

## Philosophy

Typography is the backbone of the brand's credibility. The type system communicates authority through structure and warmth through proportional scale. Every size, weight, and line-height choice is intentional.

---

## Typefaces

### Primary — Display & Headings
**Syne** (Google Fonts / next/font)
- Weights used: 700 (Bold), 800 (ExtraBold)
- Usage: All headings (H1–H4), hero text, section titles, navigation
- Character: Geometric, distinctive, forward-looking — signals that Eonrisia is original

### Secondary — Body & UI
**Inter** (Google Fonts / next/font)
- Weights used: 400 (Regular), 500 (Medium), 600 (SemiBold)
- Usage: All body text, UI labels, form fields, captions, metadata
- Character: Neutral, highly legible at all sizes — earns trust

### Monospace — Code & Technical
**JetBrains Mono** (Google Fonts / next/font)
- Weights used: 400, 500
- Usage: Code snippets, technical labels, version numbers
- Character: Clean and functional

---

## Type Scale

All values use a modular scale (1.25 ratio) and are defined as CSS custom properties.

| Token | Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| `--text-display` | `4.5rem` (72px) | 1.05 | 800 | Hero headlines |
| `--text-h1` | `3rem` (48px) | 1.1 | 700 | Page titles |
| `--text-h2` | `2.25rem` (36px) | 1.15 | 700 | Section headings |
| `--text-h3` | `1.5rem` (24px) | 1.25 | 700 | Sub-section headings |
| `--text-h4` | `1.125rem` (18px) | 1.3 | 600 | Card titles, labels |
| `--text-body-lg` | `1.125rem` (18px) | 1.7 | 400 | Lead paragraphs |
| `--text-body` | `1rem` (16px) | 1.7 | 400 | Standard body text |
| `--text-body-sm` | `0.875rem` (14px) | 1.6 | 400 | Captions, meta |
| `--text-label` | `0.75rem` (12px) | 1.5 | 600 | Tags, badges, eyebrows |

---

## Responsive Scaling

Headings scale down on mobile using `clamp()` to maintain visual hierarchy without overflow.

```css
--text-display: clamp(2.5rem, 6vw, 4.5rem);
--text-h1:      clamp(2rem, 4.5vw, 3rem);
--text-h2:      clamp(1.5rem, 3.5vw, 2.25rem);
```

---

## Usage Rules

- **Headings always use Syne.** Never use Inter for a heading.
- **Body always uses Inter.** Never use Syne for body copy.
- **Maximum line length:** 70 characters for body text (set via `max-w-prose` in Tailwind).
- **Never use `font-weight: 900`** — it is not in our licensed weight set.
- **Tracking (letter-spacing):**
  - Display and H1: `tracking-tight` (-0.02em)
  - Labels and eyebrows: `tracking-widest` (0.12em) in ALL CAPS
  - Body: default (0)
- **Eyebrow pattern:** Small uppercase label above a heading — uses `--text-label`, `tracking-widest`, `color: brand-500`.

### Eyebrow Example
```html
<span class="eyebrow">Our Mission</span>
<h2>Building worlds that last.</h2>
```

---

## Tailwind Mapping

```ts
fontFamily: {
  display: ['Syne', 'sans-serif'],
  body:    ['Inter', 'sans-serif'],
  mono:    ['JetBrains Mono', 'monospace'],
},
```
