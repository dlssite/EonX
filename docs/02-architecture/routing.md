# Routing — Eonrisia Website

## URL Structure

All URLs follow these principles:
- Lowercase, hyphen-separated slugs
- No trailing slashes
- Descriptive, keyword-rich paths for SEO
- Stable — once a URL is live, it never changes without a redirect

---

## Full URL Map

### Phase 1 (Launch)

| Page | URL | Type |
|---|---|---|
| Home | `/` | Static page |
| About | `/about` | CMS page |
| Mission & Vision | `/mission` | CMS page |
| Team | `/team` | CMS collection |
| Volunteer | `/volunteer` | CMS collection |
| Projects | `/projects` | CMS collection |
| Project detail | `/projects/[slug]` | Dynamic CMS page |
| Contact | `/contact` | Static + Server Action |

### Phase 2 (Phased unlock)

| Page | URL | Type |
|---|---|---|
| Work With Us | `/work-with-us` | CMS page + form |
| Governance | `/governance` | CMS page |
| Partnerships | `/partnerships` | CMS page |
| Press | `/press` | CMS page |
| Updates (blog) | `/updates` | CMS collection |
| Blog post | `/updates/[slug]` | Dynamic CMS page |
| Donate | `/donate` | CMS page |

### System URLs

| URL | Purpose |
|---|---|
| `/admin` | Payload CMS admin panel |
| `/api/[...payload]` | Payload REST API |
| `/api/graphql` | Payload GraphQL API |
| `/api/revalidate` | ISR webhook (protected) |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | Auto-generated robots file |
| `/feed.xml` | RSS feed (Phase 2) |

---

## Dynamic Routes

### `/projects/[slug]`

The `slug` is the project's unique identifier set in Payload. All project slugs are generated from the project name and validated for uniqueness in the CMS.

```ts
// app/(site)/projects/[slug]/page.tsx
export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'projects',
    select: { slug: true },
  })
  return docs.map((doc) => ({ slug: doc.slug }))
}
```

### `/updates/[slug]` (Phase 2)

Same pattern. Slugs auto-generated from post title, editable in CMS, validated unique.

---

## Redirects

Redirects are defined in `next.config.ts`. They are permanent (308) by default.

```ts
// next.config.ts
async redirects() {
  return [
    // Example: old URL → new URL
    { source: '/team-members', destination: '/team', permanent: true },
  ]
}
```

**Rule:** Any time a live URL changes, a redirect must be added. URLs do not die.

---

## 404 Handling

`app/not-found.tsx` renders the 404 page. It includes:
- A clear "page not found" message
- Links back to Home, About, and Contact
- The same header and footer as the rest of the site
- Correct HTTP 404 status code (handled automatically by Next.js)

---

## Canonical URLs

Every page sets a canonical URL via the `next/metadata` API to prevent duplicate content issues:

```ts
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://eonrisia.org/about',
  },
}
```

For dynamic pages, the canonical is generated from the slug:
```ts
alternates: {
  canonical: `https://eonrisia.org/projects/${params.slug}`,
}
```
