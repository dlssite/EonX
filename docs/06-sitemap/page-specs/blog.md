# Page Spec: Blog / Updates

**URL:** `/updates` (index), `/updates/[slug]` (post detail)
**Phase:** 2
**Template:** Collection Index + Detail
**SEO Priority:** 0.7 (index), 0.5 (individual posts)

---

## Purpose

Publish organizational updates, milestone announcements, thought pieces, and community news. Builds topical authority for SEO over time and gives the community a reason to return to the site regularly.

---

## Content Categories

| Category | Description |
|---|---|
| `org-updates` | Official announcements, milestones, changes |
| `community` | Community spotlights, volunteer stories |
| `projects` | Development updates on active projects |
| `thoughts` | Opinion and perspective pieces from the team |

---

## Index Page Sections

### 1. Page Hero
- Eyebrow: "Updates"
- Headline: "What's happening at Eonrisia"

### 2. Featured Post
- The most recent post (or manually pinned post) in a wide card
- Cover image, title, excerpt, author name + avatar, publish date, "Read →"

### 3. Posts Grid
- 3-column grid of remaining posts
- Each card: cover image, category badge, title, excerpt, date
- Pagination: 12 posts per page, page-number pagination

### 4. RSS Link
- Small footer notice: "Subscribe via RSS" with link to `/feed.xml`

---

## Post Detail Page Sections

### 1. Breadcrumb
- `Updates → Post Title`

### 2. Article Hero
- Cover image (full width)
- Category badge
- Title (H1)
- Author name + avatar + date + estimated read time

### 3. Article Body
- Lexical rich text content from Payload
- Headings, lists, inline images, blockquotes supported

### 4. Related Posts
- 3 posts from the same category
- "More from Updates →" link

---

## Data Source

`posts` Payload collection. Only `status: published` and `publishedAt` not null visible publicly.

---

## SEO (Per Post)

Each post has dedicated SEO fields in Payload:
- Custom meta title (default: post title)
- Custom meta description (default: excerpt)
- Custom OG image (default: cover image)
- Dynamic OG image generated via `next/og` if no image provided

---

## RSS Feed

Generated at `/feed.xml` via a Next.js route handler. Includes all published posts sorted by date descending. Valid RSS 2.0 format.
