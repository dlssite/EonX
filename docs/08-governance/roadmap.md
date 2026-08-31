# Roadmap — Eonrisia Website

## Phase 1 — Core Launch

**Goal:** A polished, credible, fast organization website with the seven essential pages live, fully CMS-driven, and scoring 90+ on Lighthouse.

### Tasks

- [ ] Repository scaffolding (Next.js + Payload CMS + Tailwind + Neon)
- [ ] Docs and constitution structure (this repo)
- [ ] Design token system and base CSS
- [ ] Global layout: Header + Footer + mobile navigation
- [ ] SEO infrastructure: metadata API, JSON-LD, sitemap, robots.txt
- [ ] Home page
- [ ] About page
- [ ] Mission & Vision page
- [ ] Team page + Payload `team` collection
- [ ] Projects page + project detail pages + Payload `projects` collection
- [ ] Volunteer page + Payload `opportunities` collection
- [ ] Contact page + contact form + Payload `inquiries` collection
- [ ] 404 page
- [ ] Payload CMS globals: SiteSettings, Navigation, Footer
- [ ] ISR revalidation webhook
- [ ] Lighthouse CI in GitHub Actions
- [ ] Vercel production deployment
- [ ] Custom domain setup (eonrisia.org)
- [ ] Google Search Console + sitemap submission
- [ ] Performance hardening (images, fonts, bundle size audit)
- [ ] Accessibility review (pa11y + manual screen reader check)

---

## Phase 2 — Extended Content

**Goal:** Unlock the remaining pages as content is ready. Build the blog system. Improve SEO with content marketing.

### Tasks

- [ ] Work With Us page + commission inquiry form
- [ ] Governance page
- [ ] Partnerships page
- [ ] Press / Media kit page + downloadable press kit
- [ ] Blog/Updates system (Payload `posts` collection + index + detail pages)
- [ ] RSS feed
- [ ] Donate page + donation platform integration
- [ ] FAQ structured data on Volunteer and Work With Us pages
- [ ] Team member detail pages (`/team/[slug]`) with Person schema
- [ ] Visual regression testing (Chromatic)
- [ ] Search functionality (if traffic warrants it)

---

## Phase 3 — Scale and Optimize

**Goal:** Build on the foundation as the org grows.

### Tasks

- [ ] Multi-language support (if community growth demands it)
- [ ] Dark/light mode toggle (dark is default; light mode already supported in tokens)
- [ ] Community portal (login, token balance, contribution history)
- [ ] Event listing page
- [ ] Newsletter integration
- [ ] Advanced analytics (conversion tracking, funnel analysis)
- [ ] A/B testing framework for CTA optimization

---

## Release History

See [`changelog.md`](./changelog.md) for released version history.
