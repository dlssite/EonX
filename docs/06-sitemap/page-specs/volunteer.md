# Page Spec: Volunteer

**URL:** `/volunteer`
**Phase:** 1
**Template:** Collection Index
**SEO Priority:** 0.8

---

## Purpose

Recruit contributors. This is the most important conversion page for building the Eonrisia community. It should feel like an invitation from peers, not an HR portal.

---

## Primary Audiences

| Audience | What They Need |
|---|---|
| Writers | See that their craft has a home here |
| Developers | See real technical work they could contribute to |
| Artists / Designers | See creative work and visual direction |
| Community managers | Understand the community's scale and needs |
| All contributors | Know what they're committing to and what they'll get |

---

## Sections

### 1. Page Hero
- Eyebrow: "Volunteer"
- Headline: "Help build something that lasts"
- Lead: 2 sentences — what it means to volunteer with Eonrisia, what contributors gain

### 2. Why Volunteer (3-column block)
- Column 1: What you'll work on (real projects, real impact)
- Column 2: What you'll get (experience, community, token rewards)
- Column 3: How it works (flexible, async, no minimum hours required)

### 3. Open Roles (Opportunities Grid)
- Eyebrow: "Open Roles"
- Department filter tabs: All / Engineering / Design / Writing / Art / Community / Other
- Each role card: title, department badge, skills needed, time commitment, "Apply →" button
- Only `isOpen: true` opportunities visible
- Empty state: "No open roles right now — check back soon or reach out."

### 4. Token System Teaser
- Brief section: "Earn tokens for your contributions"
- Explains the contribution → token → benefit loop in 3 simple steps
- "Learn more about how tokens work →" (links to /mission or a dedicated section)

### 5. FAQ (optional, Phase 2)
- 4–6 common volunteer questions
- Enables FAQPage structured data in search results

### 6. CTA Band
- "Don't see a role that fits?"
- "Reach out anyway" button → /contact

---

## Data Source

`opportunities` Payload collection. Fields used:
- `title`, `department`, `description`, `skills`, `timeCommitment`, `applyUrl`, `isOpen`

---

## SEO

- **Title:** `Volunteer With Eonrisia — Join Our Creative Community`
- **Meta Description:** `Find open volunteer roles at Eonrisia. We're looking for writers, developers, artists, and community builders. Flexible, remote, and rewarding.`
- **H1:** Set via CMS
- **Structured Data:** BreadcrumbList, FAQPage (Phase 2)
