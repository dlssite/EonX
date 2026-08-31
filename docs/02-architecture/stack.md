# Tech Stack — Eonrisia Website

## Decision Summary

Every technology choice was made against four criteria:
1. **SEO capability** — can it produce fast, crawlable, metadata-rich pages?
2. **Content dynamism** — can non-developers add, edit, and remove pages without code changes?
3. **Performance** — can it achieve 90+ Lighthouse scores on mobile?
4. **Lean team DX** — is the developer experience good enough for a small, volunteer-friendly team?

---

## Stack at a Glance

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15.x |
| CMS | Payload CMS | 3.x |
| Styling | Tailwind CSS | 4.x |
| Animations | Framer Motion | 11.x |
| Database | PostgreSQL (self-hosted, Docker) | 16.x |
| Reverse proxy + HTTPS | Caddy | 2.x |
| Containerisation | Docker + Docker Compose | latest |
| CI/CD | GitHub Actions | — |
| Image registry | GitHub Container Registry (ghcr.io) | — |
| Hosting | Hostinger KVM VPS (Ubuntu Linux) | — |
| Language | TypeScript | 5.x |
| Package Manager | npm | — |
| Fonts | next/font (Google Fonts) | — |
| Icons | Lucide React | latest |
| Forms | React Hook Form + Zod | latest |
| SEO | next-sitemap + next/metadata | latest |
| Analytics | Umami (self-hosted, privacy-first) | latest |

---

## Technology Rationale

### Next.js 15 (App Router)
**Why:** Next.js App Router enables React Server Components, which means pages can fetch CMS data at build time (SSG) or on a schedule (ISR) without sending that logic to the client. This is the single biggest factor in achieving fast load times and strong SEO — search crawlers receive fully rendered HTML, not a JavaScript shell.

The file-system router maps directly to our URL structure. Dynamic routes (`[slug]`) let us generate unlimited CMS-driven pages from a single template. The `next/metadata` API provides a structured, type-safe way to set all SEO tags per page.

**Alternatives considered:** Astro (excellent for static sites but less suited for a full CMS-driven app with interactive forms), Remix (strong but adds complexity without meaningful benefit for this use case).

---

### Payload CMS v3
**Why:** Payload v3 runs *inside* the Next.js app — not a separate service. One repository, one deployment, one set of environment variables, zero external CMS cost. The admin panel is auto-generated from a TypeScript config. Adding a new content type is a matter of adding a collection file.

Payload is fully self-hosted, meaning all content data lives in our own PostgreSQL instance on our own VPS. No vendor lock-in, no monthly CMS bill.

**Alternatives considered:** Sanity (requires a separate hosted service), Contentful (expensive, external dependency, not TypeScript-native).

---

### PostgreSQL 16 (self-hosted via Docker)
**Why:** PostgreSQL has the strongest relational data model for our needs (team members, project relations, form submissions). Running it as a Docker container on our VPS means we own the data completely — no third-party managed database service. PostgreSQL 16 is stable, performant, and well-supported by Payload.

Data is persisted in a named Docker volume (`postgres_data`) that survives container restarts and is included in the backup strategy.

**Alternatives considered:** Neon (managed serverless Postgres — good free tier but adds external dependency), MongoDB (weaker relational model for our data shape).

---

### Caddy
**Why:** Caddy is the reverse proxy that sits in front of the Next.js app container and handles all inbound HTTPS traffic. It automatically provisions and renews TLS certificates from Let's Encrypt with zero configuration — no manual `certbot` runs, no cron jobs. The Caddyfile config is minimal and readable.

On the VPS, only ports 80 and 443 are exposed publicly. Caddy receives all traffic and proxies it internally to the app container on port 3000. The database and app ports are never exposed to the internet.

**Alternatives considered:** Nginx (more config overhead, manual cert management), Traefik (more complex for this use case), Vercel (managed but removes our infrastructure ownership).

---

### Docker + Docker Compose
**Why:** Docker containers give us reproducible environments across local development, CI, and the VPS. Docker Compose defines the full stack (app + postgres + caddy) in a single `docker-compose.yml`. Any developer can run the exact production stack locally with one command.

**Build strategy:** Because the VPS has 1 vCPU and 4GB RAM (shared with an existing container), Next.js builds are done on GitHub Actions — not on the VPS. GitHub Actions builds the Docker image, pushes it to ghcr.io, and the VPS simply pulls and runs the pre-built image. This keeps the VPS load low.

---

### GitHub Actions + GitHub Container Registry
**Why:** Free CI/CD tightly integrated with the repository. Every push to `main` triggers a workflow that: lints, type-checks, builds the Docker image, pushes it to ghcr.io, and deploys to the VPS via SSH. Pull requests run lint and type-check only — no full build to save minutes.

ghcr.io (GitHub Container Registry) is free for public images and included with GitHub for private images. No separate registry to manage.

---

### Caddy (Analytics replacement: Umami)
**Why:** We replaced `@vercel/analytics` with **Umami** — a self-hosted, open-source, privacy-first analytics tool. It runs as an additional Docker container on the VPS (or can be hosted separately). No third-party scripts, no GDPR concerns, no sampling, full data ownership.

**Alternatives considered:** `@vercel/analytics` (tied to Vercel hosting), Google Analytics (privacy concerns, GDPR overhead), Plausible (good but paid for self-hosting above limits).

---

### Tailwind CSS v4
**Why:** Utility-first CSS scales well with a small team. No naming conventions to argue over, no CSS file to maintain alongside components. Tailwind v4's CSS-native `@theme` configuration makes our design tokens first-class CSS custom properties.

---

### Framer Motion v11
**Why:** The most mature React animation library. Supports layout animations, scroll-triggered reveals, gesture detection, and shared element transitions. The `useReducedMotion` hook makes accessibility compliance straightforward.

---

## What We Are Not Using (and Why)

| Technology | Reason Not Used |
|---|---|
| Vercel | Replaced by self-hosted VPS + Caddy — full infrastructure ownership |
| Neon (managed Postgres) | Replaced by self-hosted PostgreSQL container on our VPS |
| `@vercel/analytics` | Replaced by Umami (self-hosted, privacy-first) |
| WordPress | No type safety, poor performance defaults, security overhead |
| GraphQL (custom) | Payload auto-generates a GraphQL API; no need to build one |
| Redux / Zustand | Server Components cover our state needs without a client store |
| CSS Modules | Tailwind covers all styling without separate CSS files |
| Jest | Vitest is faster and natively supports ES modules |

---

## Versioning Policy

- Pin all dependencies to exact versions in `package.json` (no `^` or `~`)
- Major upgrades require a decision log entry in [`docs/08-governance/decision-log.md`](../08-governance/decision-log.md)
- Security patches can be applied immediately with a dedicated PR
- Docker base image versions are pinned (e.g. `node:20.11-alpine` not `node:latest`)
