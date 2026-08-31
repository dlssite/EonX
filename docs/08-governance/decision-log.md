# Decision Log — Eonrisia Website

This file records all significant architectural, design, and strategic decisions made for the Eonrisia website. The goal is to capture *why* decisions were made, not just *what* was decided, so future contributors understand the reasoning and don't accidentally re-litigate settled questions.

---

## Log Format

```
## YYYY-MM-DD — [Short Decision Title]

**Decision:** What was decided
**Context:** What problem or question prompted this decision
**Options Considered:** What alternatives were evaluated
**Rationale:** Why this option was chosen
**Consequences:** What this decision enables or forecloses
**Decided by:** Who made the call
```

---

## Log

---

### 2026-08-28 — Initial Stack Selection

**Decision:** Next.js 15 (App Router) + Payload CMS v3 + Tailwind CSS v4 + PostgreSQL (Neon) + Vercel

**Context:** Starting from scratch. Need to select a full stack for the Eonrisia organization website that satisfies: SEO performance, dynamic content management, premium feel with micro-interactions, fast load times, and lean team maintainability.

**Options Considered:**
- Framework: Next.js vs Astro vs Remix
- CMS: Payload CMS vs Sanity vs Contentful
- Database: Neon PostgreSQL vs MongoDB Atlas
- Hosting: Vercel vs Netlify vs Render

**Rationale:**
- Next.js App Router chosen for React Server Components (SEO + performance), file-based routing, ISR, and the `next/metadata` API for structured SEO.
- Payload CMS v3 chosen because it runs inside the Next.js repo (no external service), is TypeScript-native, is free and open-source, and gives us full data ownership. Eliminates a separate CMS hosting cost.
- PostgreSQL (Neon) chosen over MongoDB for stronger relational data model and Neon's serverless free tier.
- Vercel chosen for zero-config Next.js deployment, preview deployments per PR, edge network caching, and direct `@vercel/analytics` integration.

**Consequences:**
- The project is a monorepo — site and CMS in one. Simpler to deploy and maintain.
- Team members don't need to learn a separate CMS platform.
- Self-hosting the CMS means we own all data — no vendor lock-in on content.

**Decided by:** Founding architecture review, 2026-08-28

---

### 2026-08-28 — Phased Launch Strategy

**Decision:** Phase 1 launches with 7 core pages. Phase 2 sections unlock as content is ready.

**Context:** Full sitemap includes 13+ pages. Launching all at once risks launching with thin content on several pages, which damages credibility and SEO.

**Options Considered:**
- Launch everything at once (all or nothing)
- Phased launch (Phase 1 core, Phase 2 extended)
- Soft launch with Coming Soon pages

**Rationale:** Phased launch allows the core institutional pages (Home, About, Mission, Team, Volunteer, Projects, Contact) to launch polished and fully populated. Phase 2 pages go live only when the content is genuinely ready. Better SEO signal, better first impression.

**Consequences:**
- Phase 2 routes are built in code but not linked from navigation until content is ready.
- The team must define "content ready" criteria for each Phase 2 page before unlocking it.

**Decided by:** Founding architecture review, 2026-08-28

---

### 2026-08-28 — Org Site Scope (No Lore Content)

**Decision:** The Eonrisia org site contains zero lore, fiction, or universe content from Sanctyria. That content lives on the Sanctyria universe website.

**Context:** Sanctyria is Eonrisia's flagship universe. There is a risk of blurring the org site and universe site if lore content bleeds into the org site.

**Rationale:** Clear separation keeps the brand hierarchy clean. The org site is for the organization — mission, team, governance, partners, and contributors. Sanctyria has its own site for fans, lore, and community. Mixing them confuses both audiences.

**Consequences:**
- The Projects page can mention Sanctyria as a project (title, one-line description, link to universe site) but contains no lore content.
- Any future universe Eonrisia builds will follow the same pattern — universe site separate from org site.

**Decided by:** Founding architecture review, 2026-08-28

---

### 2026-08-28 — Self-Hosted VPS + Docker + Caddy Instead of Vercel + Neon

**Decision:** Host the Eonrisia website on a self-owned Hostinger KVM VPS using Docker Compose, self-hosted PostgreSQL 16, and Caddy as the reverse proxy. Build Docker images on GitHub Actions, push to ghcr.io, deploy to VPS via SSH.

**Context:** The team already has a Hostinger KVM 1 VPS (1 vCPU, 4GB RAM, 50GB NVMe, Ubuntu Linux) running an existing Docker container. Using managed hosting (Vercel + Neon) would add recurring external costs and create vendor dependencies for data we own.

**Options Considered:**
- Vercel + Neon (managed Postgres) — original plan
- Self-hosted VPS + Docker + Caddy + self-hosted Postgres — chosen
- Hybrid: VPS app + managed Postgres — unnecessary split; adds external dependency without meaningful benefit

**Rationale:**
- Full data ownership — PostgreSQL runs in our own volume on our own VPS. No third party holds our content.
- Cost efficiency — VPS is already paid. Eliminates Vercel and Neon costs at scale.
- Caddy provides automatic HTTPS (Let's Encrypt) with zero manual cert management.
- Docker Compose gives fully reproducible environments — local dev mirrors production exactly.
- The 1 vCPU / 4GB RAM spec handles runtime fine. Builds run on GitHub Actions (free) so the VPS never spikes under build load.
- Self-hosted Umami replaces `@vercel/analytics` — privacy-first, no third-party scripts, full data ownership.

**Consequences:**
- We are responsible for container updates, backups, server health, and uptime monitoring.
- No automatic preview deployments per PR. PRs validated by CI (lint + type-check) only.
- ISR cache is process-local, not a distributed CDN edge. Acceptable at current traffic scale.
- Off-site backups (Cloudflare R2 or equivalent) must be configured — see `docs/02-architecture/infrastructure.md`.
- Rollback requires pulling a previous image tag from ghcr.io rather than a one-click dashboard action.

**Files updated:** `docs/02-architecture/stack.md`, `docs/02-architecture/data-flow.md`, `docs/02-architecture/environment.md`, `docs/02-architecture/infrastructure.md` (new), `docs/07-development/deployment.md`, `docs/07-development/docker.md` (new), `constitution/04-technical-law.md` (§3, §8)

**Decided by:** Founding architecture review, 2026-08-28

---

### 2026-08-29 — Payload Admin `db.query` Runtime Fix

**Decision:** Set `push: false` on `postgresAdapter` and create an initial migration snapshot file.

**Context:** After first user creation succeeded, all subsequent admin API calls (`/api/users/me`, `/api/payload-preferences/nav`) returned 500 with `TypeError: Cannot read properties of undefined (reading 'join')`. Root cause: Payload's dev-mode schema push (`pushDevSchema`) was re-running on every Next.js HMR cycle, causing a race condition where `db.query[tableName]` was undefined during the Drizzle relational schema registration window.

**Options Considered:**
- Upgrade Payload from 3.33.0 to 3.88.0 — would fix this and other bugs but is a significant upgrade requiring testing
- Set `push: false` on the adapter — disables `pushDevSchema` entirely, eliminating the race condition; safe because the schema already exists in Neon
- Create migration files only — necessary complement to `push: false`; ensures Payload's migration runner has a versioned baseline

**Rationale:** `push: false` is the minimal, safe fix. The schema is already correct in Neon (all 22 tables, all FKs present). There is no need for Payload to re-push it on every HMR cycle. A Payload upgrade is tracked as a separate future task per the versioning policy.

**Consequences:**
- Dev-mode schema changes (adding fields, new collections) now require `npx payload migrate:create` + `npx payload migrate` instead of being auto-pushed. This is correct behavior for a project with a real database.
- The initial migration file (`src/migrations/20260829_000000_initial.ts`) is a no-op snapshot. All future schema changes get new migration files.
- `push: false` also applies in production (where it was already effectively disabled by `NODE_ENV=production`).

**Files updated:** `src/payload.config.ts`, `src/migrations/20260829_000000_initial.ts`, `src/migrations/index.ts`

**Decided by:** Engineering review, 2026-08-29
