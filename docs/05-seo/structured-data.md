# Structured Data (JSON-LD) — Eonrisia

All structured data is rendered via the `<JsonLd>` component in `src/components/seo/JsonLd.tsx`. Schemas are built in `src/lib/structured-data.ts`.

---

## Organization Schema (Root Layout)

Injected on every page via `app/layout.tsx`. This is the primary signal to Google about who Eonrisia is.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Eonrisia",
  "url": "https://eonrisia.org",
  "logo": "https://eonrisia.org/brand/eonrisia-mark-light.svg",
  "description": "Eonrisia is a community-driven creative organization that builds immersive fictional universes and the software, games, comics, and community infrastructure that brings them to life.",
  "foundingDate": "2024",
  "sameAs": [
    "https://twitter.com/Eonrisia",
    "https://instagram.com/Eonrisia",
    "https://youtube.com/@Eonrisia",
    "https://discord.gg/Eonrisia"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "general",
    "email": "hello@eonrisia.org"
  }
}
```

---

## WebSite Schema (Home Page)

Enables the sitelinks search box in Google results.

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Eonrisia",
  "url": "https://eonrisia.org",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://eonrisia.org/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

---

## BreadcrumbList Schema (Interior Pages)

Added to all interior pages for breadcrumb display in search results.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://eonrisia.org"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Projects",
      "item": "https://eonrisia.org/projects"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Sanctyria",
      "item": "https://eonrisia.org/projects/sanctyria"
    }
  ]
}
```

---

## Article Schema (Blog Posts — Phase 2)

Added to each blog post detail page.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Post title here",
  "description": "Post excerpt here",
  "image": "https://eonrisia.org/media/post-cover.jpg",
  "author": {
    "@type": "Person",
    "name": "Author Name",
    "url": "https://eonrisia.org/team/author-slug"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Eonrisia",
    "logo": {
      "@type": "ImageObject",
      "url": "https://eonrisia.org/brand/eonrisia-mark-light.svg"
    }
  },
  "datePublished": "2026-08-28",
  "dateModified": "2026-08-28"
}
```

---

## Implementation in Code

```tsx
// src/lib/structured-data.ts

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Eonrisia',
    url: 'https://eonrisia.org',
    // ... full schema
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
```

```tsx
// src/components/seo/JsonLd.tsx
export function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

---

## Validation

Test all structured data at: [Google Rich Results Test](https://search.google.com/test/rich-results)

Run before every Phase 1 page launch. Log results in `docs/08-governance/decision-log.md`.
