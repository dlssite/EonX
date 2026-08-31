# Accessibility Law — Eonrisia Constitution

The Eonrisia website is accessible to all people. These rules are non-negotiable. Accessibility is not an optional enhancement — it is a baseline requirement.

---

## Standard

**WCAG 2.1 Level AA is the minimum.** AAA is targeted where achievable without design compromise.

> Full validation requires manual testing with assistive technologies and expert accessibility review. Automated tools catch roughly 30% of issues. Both automated and manual testing are required before any Phase 1 page goes live.

---

## 1. Color Contrast

All text and background combinations must meet WCAG AA minimums:
- Body text: 4.5:1 contrast ratio
- Large text (18px+ or 14px bold): 3:1 contrast ratio
- UI components and states (borders, icons): 3:1 contrast ratio

This is enforced by the color system in `docs/01-brand/color-system.md`. No new color combinations may be introduced without a contrast check.

---

## 2. Keyboard Navigation

- Every interactive element (links, buttons, form fields, menus) must be reachable via the `Tab` key
- Every interactive element must be operable via `Enter` or `Space`
- Tab order must match the visual reading order of the page
- No keyboard traps (except modal dialogs, which trap focus intentionally and release it correctly)
- Visible focus indicators are required on all focusable elements at all times

---

## 3. Semantic HTML

- One `<h1>` per page
- Heading levels are never skipped
- All lists use `<ul>`, `<ol>`, and `<li>`
- Navigation uses `<nav>` with a descriptive `aria-label`
- Main content uses `<main>`
- Footer uses `<footer>`
- Buttons do button things. Links do link things. Never the reverse.

---

## 4. Images

- All meaningful images have descriptive `alt` text
- Decorative images have `alt=""`
- Complex images have extended descriptions in adjacent text or via `aria-describedby`
- Alt text is required on all media uploaded through the CMS (enforced at schema level)

---

## 5. Forms

- Every input has an associated `<label>` element (not just a placeholder)
- Required fields are marked `aria-required="true"` and have a visual indicator
- Error messages are associated to inputs via `aria-describedby`
- Errors are announced to screen readers via `aria-live="polite"` region
- Success confirmations are also announced via `aria-live`

---

## 6. Motion and Animation

- All animations must respect `prefers-reduced-motion`
- No content flashes more than 3 times per second (seizure risk)
- Auto-playing video or animation can be paused by the user

---

## 7. Automated Testing

Before any Phase 1 page goes live, it must pass `pa11y` at the WCAG 2.1 AA standard with zero errors. Warnings are documented but do not block launch if they are reviewed and understood.

---

## 8. Manual Testing

Before launch, all Phase 1 pages must be manually tested with:
- A screen reader (NVDA on Windows, VoiceOver on macOS)
- Keyboard-only navigation (no mouse)
- At 200% browser zoom

Issues found must be fixed before launch.
