# Technical Law — Eonrisia Constitution

These are the core technical decisions that are locked in for the Eonrisia website. Changing any of these requires the amendment process.

---

## 1. Framework

**Next.js (App Router) is the only permitted frontend framework for this website.**

The App Router architecture — React Server Components, file-based routing, ISR, the `next/metadata` API — is foundational to the site's SEO performance and rendering strategy. Migrating to another framework is a full rewrite that requires an amendment.

---

## 2. CMS

**Payload CMS v3 is the content management system for this website.**

All content that can change without a code deployment must be managed through Payload. Hardcoding content that belongs in the CMS is a violation.

Payload is the source of truth for:
- All page content managed via blocks
- Team members, projects, opportunities, inquiries, and posts
- Site globals (navigation, footer, site settings)

---

## 3. Database

**PostgreSQL is the database.** It runs as a self-hosted Docker container on the Eonrisia VPS, with data persisted in a named Docker volume (`postgres_data`).

Switching from PostgreSQL to another database engine requires an amendment. Switching hosting provider for PostgreSQL (e.g. moving to a managed service) does not require an amendment but must be logged in the decision log. The `postgres_data` volume must be backed up before any migration.

---

## 4. Design Token System

**All visual values (color, spacing, typography, motion) must be expressed as CSS custom property tokens defined in `src/styles/tokens.css`.**

No component may hardcode a color value, pixel dimension, or animation duration. All values must reference a token. This is a non-negotiable rule for maintainability and design consistency.

---

## 5. TypeScript

**TypeScript is required on all source files.** No `.js` files in `src/`. No `any` types except in Payload-generated files.

The TypeScript configuration is strict (`strict: true` in `tsconfig.json`). This cannot be relaxed.

---

## 6. All Pages Are Server-Rendered

**No public-facing page may rely on client-side rendering for its primary content.**

Search crawlers must receive fully rendered HTML for all content. Using Client Components for data fetching on public pages is prohibited. Interactive UI (forms, animations, filters) may use Client Components, but only after the page's primary content has been rendered on the server.

---

## 7. Images Via next/image Only

**All images rendered in the public site must use the `next/image` component.**

Direct `<img>` tags are prohibited in public-facing components. `next/image` is required for:
- Automatic WebP/AVIF format serving
- Responsive srcset generation
- Layout stability (CLS prevention via explicit width/height)
- Lazy loading defaults

---

## 8. Hosting on the Eonrisia VPS

**The production website is hosted on the Eonrisia Hostinger KVM VPS running Ubuntu Linux.**

The stack runs as Docker containers (app, postgres, caddy) orchestrated by Docker Compose. Caddy handles TLS and reverse proxying. The application image is built on GitHub Actions and pulled to the VPS — the VPS never builds from source.

Migrating to a different hosting provider requires an amendment. Upgrading the VPS plan or switching to a different VPS provider while keeping the same Docker + Caddy architecture does not require an amendment but must be logged in the decision log.

---

## 9. No Direct Database Access from Client Components

**Client Components may not query the database directly.**

All data fetching happens in Server Components via the Payload local API (`getPayload()`), or via Server Actions for mutations. Client Components receive data as props or via React Query/SWR from Server Action responses.

---

## 10. Environment Variables Are Never Committed

**No secret, API key, connection string, or credential may ever be committed to the repository.**

The `.env.local` file is gitignored. If a secret is ever accidentally committed, it must be rotated immediately and the commit must be removed from history. This is a security non-negotiable.
