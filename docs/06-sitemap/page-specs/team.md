# Page Spec: Team

**URL:** `/team`
**Phase:** 1
**Template:** Collection Index
**SEO Priority:** 0.7

---

## Purpose

Show the people behind Eonrisia. Build trust with partners and donors who need to know there are real, capable people running this organization. Make potential volunteers feel the team is approachable and worth joining.

---

## Primary Audiences

| Audience | What They Need |
|---|---|
| Partners / Donors | Credibility — real, identifiable people |
| Potential volunteers | Approachability — people they'd want to work with |
| Press | Named contacts and bios |

---

## Sections

### 1. Page Hero
- Eyebrow: "Our Team"
- Headline: "The people building Eonrisia"
- Lead: 1–2 sentences about the lean core team + volunteer ecosystem

### 2. Department Filter
- Filter tabs: All / Leadership / Engineering / Design / Writing / Art / Community
- Filters the team grid below
- Filter state stored in URL params: `/team?dept=design`

### 3. Team Grid
- Responsive grid: 4 columns (desktop) → 2 columns (tablet) → 1 column (mobile)
- Each card:
  - Portrait photo (square, 1:1 ratio)
  - Name
  - Role
  - Department badge
  - Social links (LinkedIn, Twitter/X, GitHub) — icons only
  - Hover: slight elevation + name underline
- Sorted by `order` field, then alphabetically within department
- Only `isPublished: true` members visible

### 4. Join Us CTA
- "Want to join this team?" section
- Brief: "We're always looking for..."
- Button: "See Open Roles →" (links to /volunteer)

---

## Data Source

`team` Payload collection. Fields used on this page:
- `name`, `role`, `department`, `photo`, `socialLinks`, `order`, `isPublished`

---

## SEO

- **Title:** `Our Team | Eonrisia`
- **Meta Description:** `Meet the Eonrisia core team — the writers, developers, designers, and community builders behind our creative ecosystem.`
- **H1:** Set via CMS page hero headline
- **Structured Data:** BreadcrumbList
