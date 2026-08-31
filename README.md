# Eonrisen — Official Organization Website

The official website of **Eonrisen**, the organization behind the community-driven creative ecosystem and the fictional universe **Sanctyria**.

This repository contains the full source code, documentation, and constitutional rules for the Eonrisen organization website at [eonrisen.org](https://eonrisen.org).

---

## What This Site Is

The Eonrisen organization website is the institutional face of the organization. It is **not** the Sanctyria universe website. It exists to:

- Attract and onboard **partners and donors**
- Recruit **volunteers and contributors**
- Surface Eonrisen as a capable team available for **creative-tech commissions**
- Communicate the organization's **mission, vision, governance, and team**

---

## Repository Structure

```
eonrisen-web/
├── README.md                   ← You are here
├── docs/                       ← All project documentation
├── constitution/               ← Immutable organizational and technical law
├── .kiro/                      ← Kiro AI steering context
└── src/                        ← Application source code (Next.js + Payload CMS)
```

---

## Documentation

All documentation lives in [`docs/`](./docs/00-overview.md). Start there.

| Section | What It Covers |
|---|---|
| [01 Brand](./docs/01-brand/brand-identity.md) | Visual identity, tone, color, typography, motion |
| [02 Architecture](./docs/02-architecture/stack.md) | Stack rationale, folder structure, data flow |
| [03 Design System](./docs/03-design-system/design-tokens.md) | Tokens, components, templates, accessibility |
| [04 Content](./docs/04-content/cms-schema.md) | CMS schema, content model, editorial guide |
| [05 SEO](./docs/05-seo/seo-strategy.md) | SEO strategy, structured data, sitemap, performance |
| [06 Sitemap](./docs/06-sitemap/sitemap-overview.md) | Full page map and individual page specs |
| [07 Development](./docs/07-development/getting-started.md) | Getting started, contributing, deployment |
| [08 Governance](./docs/08-governance/decision-log.md) | Decision log, changelog, roadmap |

---

## Constitution

The [`constitution/`](./constitution/00-constitution-overview.md) contains immutable rules that govern the site. These cannot be changed by a single contributor — they require team consensus and a formal amendment process.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| CMS | Payload CMS v3 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Database | PostgreSQL (Neon) |
| Hosting | Vercel |

---

## Getting Started

See [`docs/07-development/getting-started.md`](./docs/07-development/getting-started.md) for full setup instructions.

```bash
git clone https://github.com/eonrisen/eonrisen-web.git
cd eonrisen-web
cp .env.example .env.local
npm install
npm run dev
```

---

## Contributing

See [`docs/07-development/contributing.md`](./docs/07-development/contributing.md) for branch strategy, commit conventions, and PR rules.

---

*Eonrisen — Building immersive worlds, together.*
