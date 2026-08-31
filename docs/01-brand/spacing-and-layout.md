# Spacing & Layout — Eonrisia

## Philosophy

Generous whitespace is a premium signal. The layout breathes. Sections have room to land. We never crowd content together to fit more on the screen — we prioritize clarity and visual weight.

---

## Spacing Scale

Built on a base-4 system (4px unit). All spacing tokens are multiples of 4.

| Token | Value | Tailwind Class | Usage |
|---|---|---|---|
| `--space-1` | `4px` | `p-1`, `m-1` | Micro gaps, icon padding |
| `--space-2` | `8px` | `p-2`, `m-2` | Tight inline spacing |
| `--space-3` | `12px` | `p-3`, `m-3` | Form field padding |
| `--space-4` | `16px` | `p-4`, `m-4` | Standard component padding |
| `--space-6` | `24px` | `p-6`, `m-6` | Card padding, list gaps |
| `--space-8` | `32px` | `p-8`, `m-8` | Section inner padding |
| `--space-12` | `48px` | `p-12`, `m-12` | Between related sections |
| `--space-16` | `64px` | `p-16`, `m-16` | Between major sections |
| `--space-24` | `96px` | `p-24`, `m-24` | Page section vertical padding |
| `--space-32` | `128px` | `p-32`, `m-32` | Hero vertical padding |

---

## Grid System

### Container
- Max width: `1280px`
- Horizontal padding: `24px` (mobile), `40px` (tablet), `80px` (desktop)
- Centered with `mx-auto`

```css
.container {
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: clamp(1.5rem, 5vw, 5rem);
}
```

### Column Grid
- Desktop: 12-column grid, `24px` gap
- Tablet: 8-column grid, `20px` gap
- Mobile: 4-column grid, `16px` gap

### Common Layout Patterns

| Pattern | Desktop Columns | Mobile |
|---|---|---|
| Full width text block | 8 of 12 (centered) | Full width |
| Hero with media | 6/6 split | Stacked |
| Three-column cards | 4/4/4 | Full width stacked |
| Two-column cards | 6/6 | Full width stacked |
| Sidebar layout | 8/4 | Full width stacked |

---

## Breakpoints

| Name | Min Width | Tailwind Prefix |
|---|---|---|
| `sm` | `640px` | `sm:` |
| `md` | `768px` | `md:` |
| `lg` | `1024px` | `lg:` |
| `xl` | `1280px` | `xl:` |
| `2xl` | `1536px` | `2xl:` |

Mobile-first approach. Base styles are for mobile. Breakpoint prefixes layer in larger screen behavior.

---

## Section Spacing Pattern

Every page section uses consistent vertical rhythm:

```html
<section class="py-24 md:py-32">
  <div class="container">
    <!-- content -->
  </div>
</section>
```

- `py-24` on mobile (96px top + bottom)
- `py-32` on desktop (128px top + bottom)

---

## Z-Index Scale

| Token | Value | Usage |
|---|---|---|
| `--z-base` | `0` | Default document flow |
| `--z-raised` | `10` | Cards on hover |
| `--z-dropdown` | `100` | Dropdowns, tooltips |
| `--z-sticky` | `200` | Sticky header |
| `--z-overlay` | `300` | Modal overlays |
| `--z-modal` | `400` | Modal dialogs |
| `--z-toast` | `500` | Toast notifications |

---

## Rules

- **Never hardcode pixel values in components.** Use the spacing scale.
- **Sections must never touch each other.** Minimum `py-16` between any two sections.
- **Text blocks have a max width.** Body text: `max-w-prose` (65ch). Headings: `max-w-2xl`.
- **Mobile layout is never just "shrunk desktop."** All layouts are designed mobile-first.
