# Data Flow — Eonrisia Website

## Overview

```
Content Editor (Payload Admin /admin)
        │
        ▼
  PostgreSQL 16 (Docker container — postgres:5432)
        │
        ▼
  Payload CMS (in-process with Next.js — app:3000)
        │
        ├─── REST API (/api/...)
        ├─── GraphQL API (/api/graphql)
        └─── Direct Node.js query (getPayload())
                    │
                    ▼
         Next.js App Router
                    │
          ┌─────────┼──────────┐
          ▼         ▼          ▼
        SSG        ISR      Dynamic
    (build time) (revalidate) (per-request)
          │         │          │
          └─────────┴──────────┘
                    │
                    ▼
            Caddy (port 443)
          Reverse proxy + TLS
                    │
                    ▼
               Browser
```

---

## Infrastructure Layer

```
Internet
    │
    ▼  port 443 (HTTPS)
  Caddy container
    │  internal Docker network
    ▼  port 3000
  app container (Next.js + Payload)
    │  internal Docker network
    ▼  port 5432
  postgres container
```

All traffic enters through Caddy on port 443. The app and database ports are bound only to the internal Docker network — never exposed to the internet.

---

## Rendering Strategy Per Page Type

| Page | Strategy | Revalidation |
|---|---|---|
| Home | ISR | 60 seconds |
| About | ISR | 300 seconds |
| Mission & Vision | ISR | 300 seconds |
| Team | ISR | 60 seconds |
| Projects index | ISR | 60 seconds |
| Project `[slug]` | ISR | 120 seconds |
| Volunteer | ISR | 60 seconds |
| Contact | Static (form handled server-side) | No revalidation needed |
| Blog index | ISR | 60 seconds |
| Blog `[slug]` | ISR | 300 seconds |
| Governance | ISR | 600 seconds |

**ISR** (Incremental Static Regeneration): The page is pre-rendered at build time and cached in the Node.js process. After `revalidate` seconds, the next request triggers a background regeneration. Users always receive a cached response — never a blocking server render.

> Note: Without Vercel's edge CDN, ISR cache is local to the running container. On a single VPS this behaves correctly. If we ever add a second VPS for load balancing, we will need a shared cache layer (Redis). This is a future consideration, not a current concern.

---

## How Pages Fetch Data

All data fetching in Server Components uses the Payload local API (`getPayload()`). This is a direct in-process call to the database — no HTTP overhead, no rate limits, no API keys needed for server-side fetches.

```ts
// Example: fetching the team page data
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function TeamPage() {
  const payload = await getPayload({ config })

  const { docs: teamMembers } = await payload.find({
    collection: 'team',
    where: { isPublished: { equals: true } },
    sort: 'order',
  })

  return <TeamGrid members={teamMembers} />
}
```

---

## How CMS Globals Work

Site-wide settings (navigation, footer, site name) are stored as Payload **Globals** — singleton documents. They are fetched once per request and cached in the Next.js data cache:

```ts
const navigation = await payload.findGlobal({ slug: 'navigation' })
const footer = await payload.findGlobal({ slug: 'footer' })
```

These are fetched in the root `layout.tsx` so they are available to every page without prop drilling.

---

## Form Submission Flow

```
User fills form (client component)
        │
        ▼
React Hook Form validates (client-side Zod schema)
        │
        ▼
Next.js Server Action called
        │
        ▼
Server-side Zod schema validates again (never trust client)
        │
        ▼
Honeypot field checked (spam prevention)
        │
        ▼
Rate limit checked (per IP, 5 submissions/hour)
        │
        ▼
payload.create() stores submission in PostgreSQL
        │
        ▼
Email notification sent (Resend API)
        │
        ▼
Success response returned to client
```

---

## ISR Revalidation

When a content editor publishes a change in Payload admin, an `afterChange` hook triggers revalidation:

```
Payload afterChange hook
        │
        ▼
POST /api/revalidate (internal Next.js route, auth via REVALIDATION_SECRET)
        │
        ▼
revalidatePath() or revalidateTag() called
        │
        ▼
Next.js ISR cache cleared for affected pages
        │
        ▼
Next request regenerates fresh content from PostgreSQL
```

Changes appear on the live site within seconds of publishing.

---

## Media Handling

Images uploaded via Payload admin are stored in a Docker volume (`media_uploads`) mounted at `/app/public/media` inside the container. They are served as static files by Next.js and processed through `next/image` for:
- Automatic WebP/AVIF conversion
- Responsive `srcset` generation
- Lazy loading with blur placeholder
- Correct `width` and `height` to prevent CLS

```tsx
<Image
  src={member.photo.url}
  alt={member.photo.alt}
  width={member.photo.width}
  height={member.photo.height}
  placeholder="blur"
  blurDataURL={member.photo.blurDataURL}
/>
```

The `media_uploads` volume is included in the daily backup strategy. See [`infrastructure.md`](./infrastructure.md) for backup details.
