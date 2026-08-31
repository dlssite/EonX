# Accessibility — Eonrisia

## Standard

Eonrisia targets **WCAG 2.1 Level AA** compliance across all pages. Select patterns target AAA where achievable without design compromise.

> Full validation requires manual testing with assistive technologies and expert accessibility review. Automated tools catch roughly 30% of issues.

---

## Color Contrast

All text/background combinations must pass WCAG AA (4.5:1 for body text, 3:1 for large text and UI components).

See [`../01-brand/color-system.md`](../01-brand/color-system.md) for the full contrast table.

**Enforcement:** Run `axe-core` in development via the `@axe-core/react` package. CI checks with `pa11y` on all Phase 1 pages.

---

## Keyboard Navigation

- All interactive elements must be reachable via `Tab` and operable via `Enter`/`Space`
- Focus order must match visual reading order
- Visible focus indicators on all focusable elements (brand-500 outline, 2px offset)
- Modal dialogs trap focus while open and return focus to trigger on close
- Mobile menu traps focus while open

```css
/* Global focus style */
:focus-visible {
  outline: 2px solid var(--color-brand-500);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
/* Remove focus ring for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

---

## Semantic HTML

- Pages use a single `<h1>` per page
- Heading hierarchy is never skipped (h1 → h2 → h3, never h1 → h3)
- Navigation uses `<nav>` with `aria-label`
- Main content area uses `<main>`
- Footer uses `<footer>`
- Interactive elements use correct semantic elements (`<button>` not `<div onClick>`)
- Lists use `<ul>` / `<ol>` + `<li>`

---

## Images

- Every `<Image>` component requires a non-empty `alt` prop
- Decorative images use `alt=""`
- Complex images (diagrams, charts) have extended descriptions in adjacent text or `aria-describedby`
- All images from the CMS require an `alt` field — it is marked required in Payload

---

## Forms

- Every input has an associated `<label>` (not just a placeholder)
- Error messages are associated to inputs via `aria-describedby`
- Required fields are marked with `aria-required="true"` and a visual indicator
- Form submission errors are announced to screen readers via `aria-live="polite"` region
- Success messages are also announced via `aria-live`

---

## Motion

- All animations respect `prefers-reduced-motion`
- No content flashes or rapid blinking
- Auto-playing content (if any) can be paused

```tsx
// In components using Framer Motion
const shouldReduceMotion = useReducedMotion()

const variants = shouldReduceMotion
  ? { hidden: {}, visible: {} }  // instant, no animation
  : fadeUpVariants
```

---

## Screen Reader Testing Checklist

Before any page ships to production, verify with a screen reader (NVDA on Windows, VoiceOver on macOS/iOS):

- [ ] Page title is announced correctly
- [ ] Heading structure makes sense when navigating by headings
- [ ] All images have appropriate alt text
- [ ] All buttons and links have descriptive labels (not just "click here")
- [ ] Forms can be completed without a mouse
- [ ] Error messages are announced automatically
- [ ] Navigation landmarks are announced (nav, main, footer)
- [ ] Modal dialogs announce their title and trap focus correctly

---

## Automated Testing

Run accessibility checks as part of the development workflow:

```bash
# Lint for accessibility issues in components
npx axe-cli https://localhost:3000

# Check all Phase 1 pages in CI
npx pa11y-ci --sitemap https://eonrisia.org/sitemap.xml
```
