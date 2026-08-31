---
inclusion: always
---

# Eonrisia Website — Project Context

## What This Project Is

This is the official Eonrisia organization website — the institutional face of Eonrisia, the community-driven creative organization that builds immersive fictional universes. It is NOT the Sanctyria universe website.

**Live URL (target):** https://eonrisia.org
**Repository:** Eonrisia/eonrisia-web

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| CMS | Payload CMS v3 (runs inside Next.js) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion v11 |
| Database | PostgreSQL 16 (self-hosted Docker container) |
| Reverse proxy + HTTPS | Caddy 2 |
| Containerisation | Docker + Docker Compose |
| CI/CD | GitHub Actions → ghcr.io → SSH deploy |
| Hosting | Hostinger KVM VPS (Ubuntu Linux) |
| Language | TypeScript (strict) |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| Analytics | Umami (self-hosted) |

## Primary Audiences

1. Partners and donors
2. Contributors and volunteers
3. Commission clients

## Phase Status

- **Phase 1 (current):** Home, About, Mission, Team, Projects, Volunteer, Contact
- **Phase 2 (future):** Work With Us, Governance, Partnerships, Press, Blog, Donate

## Key Rules (from Constitution)

- All TypeScript — no `any` except in Payload-generated types
- All images via `next/image` — no raw `<img>` tags
- All values via design tokens — no hardcoded colors, spacing, or animations
- All public pages server-rendered — no client-side data fetching for primary content
- No lore or universe content from Sanctyria on this site
- Every public page needs: unique `<title>`, `meta description`, canonical URL, exactly one `<h1>`

## Source of Truth

- Documentation: `docs/`
- Immutable rules: `constitution/`
- When in doubt: check `constitution/` first, then `docs/`

## Folder Structure

- `src/app/(site)/` — public pages
- `src/app/(payload)/` — CMS admin
- `src/components/ui/` — primitive components
- `src/components/layout/` — Header, Footer, MobileMenu
- `src/components/sections/` — page section components
- `src/components/blocks/` — Payload-driven block components
- `src/collections/` — Payload collection definitions
- `src/globals/` — Payload global definitions
- `src/styles/tokens.css` — all design tokens as CSS custom properties
- `src/variants/index.ts` — shared Framer Motion variants
