---
inclusion: always
---

# Code Conventions — Eonrisia Website

## TypeScript

- Strict TypeScript everywhere (`strict: true` in tsconfig.json)
- No `any` types except in Payload auto-generated files (`src/types/payload-types.ts`)
- Explicit return types on all functions that are not trivially inferred
- Prefer `type` over `interface` for component props (either is acceptable, be consistent)
- Use Zod for all runtime validation (form schemas, API response validation)

## Component Rules

- All components are functional — no class components
- Server Components by default — only add `'use client'` when interactivity is required
- Component files are PascalCase: `HeroSection.tsx`
- One component per file
- Props are defined as a `type` above the component: `type HeroSectionProps = { ... }`
- Never use inline styles — always use Tailwind classes
- Never hardcode design values — always use token-based Tailwind classes (`text-brand-500`, `bg-base-900`, etc.)

## Import Aliases

Always use `@/` aliases — never traverse more than one level with relative paths:

```ts
// ✅ Correct
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

// ❌ Wrong
import { Button } from '../../components/ui/Button'
```

## Tailwind

- Use Tailwind utility classes exclusively for styling
- Custom values go in `src/styles/tokens.css` as CSS custom properties, then referenced in `tailwind.config.ts`
- Never use `style={{}}` for values that could be expressed as Tailwind classes
- Use `cn()` from `@/lib/utils` (clsx + tailwind-merge) for conditional class names

```ts
// ✅ Correct
<div className={cn('base-classes', isActive && 'active-class', className)}>

// ❌ Wrong
<div className={`base-classes ${isActive ? 'active-class' : ''}`}>
```

## Framer Motion

- All shared animation variants live in `src/variants/index.ts`
- Never define inline animation objects in components — import from variants
- Always use `once: true` in `viewport` for scroll animations
- Always check `useReducedMotion()` and pass static/empty variants when true

## Data Fetching

- All data fetching in Server Components via `getPayload()` (Payload local API)
- Client Components receive data as props
- Mutations use Server Actions
- Never fetch data in Client Components directly from the database

## File Naming

| Type | Convention |
|---|---|
| React components | `PascalCase.tsx` |
| Utility files | `camelCase.ts` |
| Page files | `page.tsx` (lowercase, required by Next.js) |
| Layout files | `layout.tsx` |
| Payload collections | `PascalCase.ts` (singular noun) |
| Test files | `ComponentName.test.tsx` (co-located) |

## Git Commits

Follow Conventional Commits:
```
feat(scope): short description
fix(scope): short description
content(scope): short description
docs(scope): short description
chore(scope): short description
```

## Accessibility

- Every `<Image>` has a non-empty `alt` prop (unless decorative: `alt=""`)
- Every interactive element has a visible focus style
- Every button has a text label or `aria-label`
- Every form input has an associated `<label>`
- Never use `onClick` on non-interactive elements — use `<button>` or `<a>`
