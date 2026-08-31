# Testing — Eonrisia Website

## Testing Philosophy

We test behavior, not implementation. Tests should fail when something the user experiences breaks — not when internal implementation details change.

---

## Test Stack

| Type | Tool | What it tests |
|---|---|---|
| Unit / Component | Vitest + React Testing Library | Individual UI components in isolation |
| Integration | Vitest | Server actions, data fetching, Payload queries |
| End-to-End | Playwright | Full user flows in a real browser |
| Accessibility | axe-core + pa11y | ARIA, keyboard navigation, contrast |
| Performance | Lighthouse CI | Core Web Vitals, SEO score |
| Visual | (Future — Chromatic) | Component visual regression |

---

## Running Tests

```bash
# All unit and integration tests
npm run test

# Watch mode (development)
npm run test:watch

# End-to-end tests
npm run test:e2e

# Accessibility scan on local build
npm run test:a11y

# Lighthouse CI on local build
npm run test:lighthouse
```

---

## What We Test

### Components (Vitest + RTL)
- Components render without errors
- Interactive components respond to keyboard input
- ARIA attributes are present on interactive elements
- Loading and error states render correctly
- Conditional rendering logic works correctly

### Server Actions (Vitest)
- Form validation rejects invalid inputs
- Form validation accepts valid inputs
- Honeypot field triggers rejection
- Rate limiting behavior

### End-to-End (Playwright)

Phase 1 critical paths:

| Flow | Steps |
|---|---|
| Home page load | Navigate to `/`, verify hero visible, verify CTAs present |
| Navigation | Click each nav link, verify page loads, verify active state |
| Mobile navigation | Viewport 375px, open hamburger, verify links, close menu |
| Contact form | Fill form, submit, verify success message appears |
| Volunteer page | Load `/volunteer`, verify roles appear, verify filter changes list |
| Projects page | Load `/projects`, verify projects appear, verify filter works |
| 404 page | Navigate to `/nonexistent`, verify 404 page with correct copy |

---

## Test File Location

```
src/
├── components/
│   └── ui/
│       ├── Button.tsx
│       └── Button.test.tsx    ← co-located test file
├── __tests__/
│   ├── server-actions/        ← server action tests
│   └── integration/           ← integration tests
e2e/
└── *.spec.ts                  ← Playwright E2E tests
```

---

## CI Integration

Tests run automatically on every pull request via GitHub Actions:

```yaml
# .github/workflows/ci.yml
- lint
- type-check
- test (Vitest)
- build
- test:e2e (Playwright on built app)
- lighthouse (Lighthouse CI)
```

All checks must pass before a PR can be merged.

---

## Accessibility Testing

Run `pa11y-ci` against all Phase 1 pages before launch:

```bash
npx pa11y-ci \
  http://localhost:3000 \
  http://localhost:3000/about \
  http://localhost:3000/team \
  http://localhost:3000/projects \
  http://localhost:3000/volunteer \
  http://localhost:3000/contact
```

Acceptable standard: WCAG 2.1 AA. Any errors must be fixed before launch.
