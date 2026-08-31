# Content Model — Eonrisia

## How Pages Are Built

Pages on the Eonrisia site are assembled from two types of content:

1. **Structured collections** — Data that has a defined shape (team members, projects, opportunities). These drive collection index pages and detail pages.
2. **Flexible blocks** — CMS-assembled sections on interior pages. A content editor picks from a palette of blocks and arranges them in any order.

---

## Flexible Block System

Interior pages (About, Mission, Governance, etc.) use a `blocks` field in Payload — a flexible array where editors pick from a set of block types. This means a non-developer can build or restructure a page entirely from the CMS.

### Available Blocks

| Block Slug | Component | Description |
|---|---|---|
| `richText` | `RichTextBlock` | Formatted body text via Lexical editor |
| `cta` | `CtaBlock` | Headline + subtext + 1-2 buttons |
| `image` | `ImageBlock` | Single image with optional caption |
| `stats` | `StatsBlock` | 3-4 stat figures with labels |
| `team` | `TeamBlock` | Auto-pulls team members from collection |
| `projects` | `ProjectsBlock` | Auto-pulls projects from collection |
| `form` | `FormBlock` | Embeds a specific form by type |
| `divider` | `DividerBlock` | Visual section break |

### How a Page Is Assembled in CMS

```
Page (e.g. About)
├── title: "About Eonrisia"
├── slug: "about"
├── seo: { metaTitle, metaDescription, ogImage }
├── heroHeadline: "We build worlds together."
├── heroSubtext: "Eonrisia is a community-driven creative organization..."
└── blocks:
    ├── [0] richText: "Our story begins with a question..."
    ├── [1] stats: [{ value: "50+", label: "Contributors" }, ...]
    ├── [2] image: { src: ..., alt: "Eonrisia team at..." }
    ├── [3] team: { heading: "Our Core Team", limit: 6 }
    └── [4] cta: { headline: "Join us.", buttons: ["Volunteer", "Contact"] }
```

---

## Content Ownership Map

| Content Type | Owned By | Managed In |
|---|---|---|
| Site settings, nav, footer | Core team | Payload Globals |
| Team members | Core team | Payload `team` collection |
| Projects | Project leads | Payload `projects` collection |
| Volunteer opportunities | Community/ops team | Payload `opportunities` collection |
| Page content (interior) | Content team | Payload `pages` collection (blocks) |
| Blog posts | Any contributor | Payload `posts` collection (requires review) |
| Form submissions | Read-only inbox | Payload `inquiries` collection |

---

## Content Status Lifecycle

All public-facing collections use an `isPublished` or `status` field.

```
Draft → Review → Published → Archived
```

- **Draft:** Visible only in the CMS admin. Not queryable from the frontend.
- **Review:** Still not public. Flagged for a team member to check before publishing.
- **Published:** Live on the site. For ISR pages, visible within the revalidation window.
- **Archived:** Hidden from the site but kept in the database. Never deleted — for audit trail.

---

## Media Strategy

- All images are uploaded through the Payload media library — never hotlinked from external sources.
- Every uploaded image requires an `alt` text field to be filled before it can be used in content.
- The CMS stores the original file; `next/image` handles optimization, resizing, and format conversion on request.
- Recommended upload dimensions per usage:

| Usage | Recommended Width | Aspect Ratio |
|---|---|---|
| Team member photo | 400px | 1:1 (square) |
| Project cover image | 1200px | 16:9 |
| Blog post cover | 1200px | 16:9 |
| OG image | 1200px | 1.91:1 (1200×630) |
| Logo | SVG | — |
