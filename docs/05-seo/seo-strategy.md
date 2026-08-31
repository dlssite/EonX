# SEO Strategy — Eonrisia

## Goal

Establish `eonrisia.org` as the authoritative web presence for the Eonrisia organization. Rank for branded searches immediately. Build topical authority in the "creative community organization" and "community-driven creative projects" space over time.

---

## SEO Foundation (Technical)

These are non-negotiable. Every page launch must satisfy all of these.

### Rendering
- All public pages are pre-rendered (SSG or ISR). Crawlers receive fully rendered HTML.
- No significant content is rendered client-side only.
- JavaScript is not required for a search crawler to read any page's primary content.

### Core Web Vitals Targets

| Metric | Target | Meaning |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | How fast the main content loads |
| FID / INP (Interaction to Next Paint) | < 200ms | How fast the page responds to input |
| CLS (Cumulative Layout Shift) | < 0.1 | How stable the layout is during load |
| FCP (First Contentful Paint) | < 1.8s | When the first content is visible |

### Technical Checklist

- [ ] `sitemap.xml` auto-generated and submitted to Google Search Console
- [ ] `robots.txt` allows all public pages, disallows `/admin`
- [ ] All pages have unique `<title>` and `meta description`
- [ ] Canonical URLs set on all pages
- [ ] No duplicate content (no `?page=1` URLs indexable)
- [ ] All images have `width` and `height` attributes (prevents CLS)
- [ ] All images served in modern formats (WebP/AVIF via `next/image`)
- [ ] No render-blocking resources
- [ ] HTTPS enforced (handled by Vercel)
- [ ] Mobile-friendly (tested via Google Search Console)
- [ ] Structured data (JSON-LD) on all applicable pages

---

## Structured Data Strategy

JSON-LD structured data is injected into every page to improve rich results in Google Search.

| Schema Type | Pages | Benefit |
|---|---|---|
| `Organization` | All pages (via root layout) | Knowledge panel, sitelinks |
| `WebSite` | Home (via root layout) | Sitelinks search box |
| `Person` | Team member pages (Phase 2) | Rich team snippets |
| `Article` | Blog posts (Phase 2) | Article rich results |
| `BreadcrumbList` | Interior pages | Breadcrumb in search results |
| `FAQPage` | Volunteer, Work With Us | FAQ accordion in results |

---

## Content SEO Priorities

### Phase 1 (Launch)
1. Rank for `Eonrisia` brand searches — ensure home page is the dominant result
2. Rank for `Eonrisia volunteer` — drive contributor recruitment
3. Rank for `Eonrisia projects` — establish credibility with partners

### Phase 2 (Growth)
4. Blog content targeting creative community adjacent keywords
5. Project pages targeting Sanctyria-adjacent searches that route to the org site
6. Partnership and press pages for institutional credibility signals

---

## Off-Page SEO Plan

- Submit sitemap to Google Search Console on launch
- Submit to Bing Webmaster Tools
- List organization on Crunchbase, LinkedIn company page
- Link from all Eonrisia social media bios to `eonrisia.org`
- Cross-link from Sanctyria universe website to `eonrisia.org`
- Guest appearances, press mentions, and community posts that link back to the org site

---

## Monitoring

Once live, review in Google Search Console monthly:
- Indexed pages count
- Core Web Vitals report
- Search queries and click-through rates
- Manual actions (penalties)
- Mobile usability issues
