# Page Spec: Projects

**URL:** `/projects`
**Phase:** 1
**Template:** Collection Index
**SEO Priority:** 0.8

---

## Purpose

Demonstrate what Eonrisia builds. Showcase Sanctyria as the flagship, alongside other internal or commissioned projects. This page is critical for partners and commission clients evaluating whether Eonrisia can deliver.

---

## Primary Audiences

| Audience | What They Need |
|---|---|
| Partners / Donors | Evidence of real work and ambition |
| Commission clients | Proof of capability across project types |
| Potential volunteers | See what they'd be contributing to |

---

## Sections

### 1. Page Hero
- Eyebrow: "Our Work"
- Headline: "What we're building"
- Lead: 1–2 sentences about the range of internal and external projects

### 2. Filter Bar
- Filter by: All / Active / Completed / Upcoming
- Secondary filter by tag (populated dynamically from CMS tags)
- Filter state in URL params

### 3. Featured Project Slot
- The one project flagged `isFeatured: true` with highest `order` value gets a wide hero card at the top
- Wide card: full-width cover image, project name, tagline, status badge, description excerpt, "Learn More →" link
- Sanctyria is this slot by default

### 4. Projects Grid
- All other published projects below the featured slot
- 3-column grid (desktop), 2-column (tablet), 1-column (mobile)
- Each card: cover image, name, tagline, status badge, tags, "View Project →" link
- Filtered dynamically via URL params

### 5. "Work With Us" Nudge
- Bottom-of-page callout (not the full CTA band)
- "Have a project in mind?" → "Work With Us →"
- Subtle — one row, not a full section

---

## Data Source

`projects` Payload collection. Fields used:
- `name`, `slug`, `tagline`, `coverImage`, `status`, `tags`, `isFeatured`, `isPublished`, `order`

---

## SEO

- **Title:** `Projects | Eonrisia`
- **Meta Description:** `Explore Eonrisia's active and completed projects — from the Sanctyria fictional universe to community tools and commissioned creative work.`
- **H1:** Set via CMS
- **Structured Data:** BreadcrumbList
