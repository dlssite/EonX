# Docs Overview

This folder is the single source of truth for everything related to the Eonrisia organization website. Every decision, pattern, rule, and standard is documented here.

---

## Who This Is For

- **Developers** building or maintaining the site
- **Designers** extending or refining the visual system
- **Content editors** managing the CMS
- **Contributors** onboarding to the project for the first time
- **AI agents** (Kiro) assisting with development tasks

---

## How the Docs Are Organized

| Section | Purpose |
|---|---|
| [01 Brand](./01-brand/brand-identity.md) | Visual identity, tone, voice, color, typography, motion |
| [02 Architecture](./02-architecture/stack.md) | Tech stack, folder structure, data flow, routing, environment, infrastructure |
| [03 Design System](./03-design-system/design-tokens.md) | Design tokens, component library, page templates, accessibility |
| [04 Content](./04-content/cms-schema.md) | CMS schema, content model, editorial guide, SEO per page, media rules |
| [05 SEO](./05-seo/seo-strategy.md) | SEO strategy, structured data, sitemap, Core Web Vitals |
| [06 Sitemap](./06-sitemap/sitemap-overview.md) | Full page map, individual page specs, navigation structure |
| [07 Development](./07-development/getting-started.md) | Setup, Docker, contributing, testing, deployment, troubleshooting |
| [08 Governance](./08-governance/decision-log.md) | Decision log, changelog, roadmap |

---

## Relationship to the Constitution

The `docs/` folder is living documentation — it evolves as the project grows. The [`constitution/`](../constitution/00-constitution-overview.md) contains immutable rules that require team consensus to change. When in doubt about which applies: docs inform, constitution governs.

---

## Keeping Docs Current

- Any pull request that changes a system, pattern, or architectural decision **must** update the relevant doc file.
- Docs are written in plain Markdown. No special tooling required to read or edit them.
- Use clear headings, tables, and code blocks. Avoid prose-only walls of text.
- When a decision is made, log it in [`08-governance/decision-log.md`](./08-governance/decision-log.md).

---

*Last updated: 2026-08-28*
