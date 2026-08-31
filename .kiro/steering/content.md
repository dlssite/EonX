---
inclusion: always
---

# Content & CMS Guide — Eonrisia Website

## CMS Architecture

Payload CMS v3 runs inside the Next.js app. There is no separate CMS service.

- Admin panel: `/admin`
- REST API: `/api/[...payload]`
- Data fetching in server components: `getPayload()` local API (no HTTP overhead)

## Collections (src/collections/)

| Collection | Slug | Purpose |
|---|---|---|
| `Team.ts` | `team` | Team member profiles |
| `Projects.ts` | `projects` | Project showcase |
| `Opportunities.ts` | `opportunities` | Volunteer/contributor roles |
| `Inquiries.ts` | `inquiries` | Form submissions (all types) |
| `Posts.ts` | `posts` | Blog posts (Phase 2) |
| `Media.ts` | `media` | Central media library |

## Globals (src/globals/)

| Global | Slug | Purpose |
|---|---|---|
| `SiteSettings.ts` | `site-settings` | Site name, tagline, default SEO, social links |
| `Navigation.ts` | `navigation` | Header nav links and CTA |
| `Footer.ts` | `footer` | Footer columns, legal, social links |

## Content Status Lifecycle

Draft → Review → Published → Archived

- Only `isPublished: true` (or `status: 'published'`) records appear on the public site
- Never delete records — archive them

## ISR Revalidation

All pages use ISR. After publishing in the CMS, an `afterChange` hook fires `/api/revalidate` to purge the Vercel edge cache. Changes appear within seconds.

Revalidation windows per page type:
- Home, Team, Projects, Volunteer: 60s
- About, Mission, Project detail: 120–300s
- Governance, static pages: 600s

## Content Rules (from constitution/03-content-law.md)

- No lore, fiction, or universe content from Sanctyria
- No unverified statistics or claims
- No placeholder or "coming soon" pages visible publicly
- Every page that goes live must have substantive, real content
- All images require `alt` text in the CMS (enforced as required field)

## Media Uploads

- Upload originals at specified dimensions (see `docs/04-content/media-guide.md`)
- All images need `alt` text filled before they can be used
- `next/image` handles optimization, resizing, and format conversion
- Media folder: tag uploads by type (team, projects, brand, press, blog, general)

## SEO Fields Per Page

Every page/post in the CMS has a `seo` group with:
- `metaTitle` — overrides default title tag
- `metaDescription` — overrides default meta description  
- `ogImage` — overrides default OG image

If not set, these fall back to the page's headline and `siteSettings.defaultMetaDescription`.
