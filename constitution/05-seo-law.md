# SEO Law — Eonrisia Constitution

Every public page on the Eonrisia website must satisfy all of these requirements before it goes live. These are non-negotiable.

---

## 1. Every Page Must Have a Unique Title Tag

- Length: 50–60 characters
- Contains the primary keyword for that page
- Ends with `| Eonrisia` or `— Eonrisia`
- No two pages share a title tag

---

## 2. Every Page Must Have a Unique Meta Description

- Length: 120–155 characters
- Summarizes the page's primary value
- Includes a soft call-to-action where appropriate
- No two pages share a meta description

---

## 3. Every Page Must Set a Canonical URL

Every page sets its own canonical URL via `alternates.canonical` in the Next.js metadata object. Duplicate content from pagination, filters, or query parameters must canonicalize to the clean URL.

---

## 4. Every Page Must Have Exactly One H1

- The H1 contains the primary keyword for that page
- The H1 is visible to users — not hidden or visually empty
- The H1 matches or is closely related to the page title tag

---

## 5. Every Page Must Be Server-Rendered

Search crawlers must receive fully rendered HTML for every public page. Client-side rendered pages are prohibited (see Technical Law §6).

---

## 6. All Images Must Have Alt Text

Every `<Image>` on a public page must have a descriptive `alt` attribute. Empty `alt=""` is only acceptable for decorative images that convey no information.

Images uploaded through the CMS must have the `alt` field filled before they can be used on a page. This is enforced by the Payload schema (`required: true` on the `alt` field in the `media` collection).

---

## 7. The Sitemap Must Include All Published Pages

`/sitemap.xml` must be auto-generated and include every published, indexable page. Draft, archived, and admin pages are excluded. The sitemap must be reachable and parseable.

---

## 8. Organization Structured Data on Every Page

The `Organization` JSON-LD schema is injected on every page via the root layout. It must always be present and reflect current, accurate information (name, URL, logo, social links, contact).

---

## 9. No Broken Internal Links

Every internal link must resolve to a real page. Broken links are crawled by search engines and signal low quality. Before any deployment, internal links on new pages must be verified.

---

## 10. Core Web Vitals Must Meet Targets

| Metric | Required Minimum |
|---|---|
| LCP | < 2.5 seconds |
| INP | < 200ms |
| CLS | < 0.1 |

Pages that fail these thresholds on production may not remain in that state for more than 7 days after discovery. Performance regression is a blocker for new releases if it pushes any Phase 1 page below these thresholds.
