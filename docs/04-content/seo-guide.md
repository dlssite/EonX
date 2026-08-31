# SEO Content Guide — Eonrisia

## Per-Page SEO Checklist

Every page that goes live must have all of the following completed in the CMS or code before publishing.

### Required for Every Page

- [ ] `<title>` — unique, 50–60 characters, includes primary keyword
- [ ] `meta description` — unique, 120–155 characters, includes CTA
- [ ] `canonical URL` — set to the page's live URL
- [ ] `og:title` — same as or variant of `<title>`
- [ ] `og:description` — same as or variant of meta description
- [ ] `og:image` — 1200×630px, brand-consistent, readable thumbnail
- [ ] `og:url` — canonical URL
- [ ] `twitter:card` — `summary_large_image`
- [ ] `<h1>` — exactly one per page, includes primary keyword naturally
- [ ] All images have descriptive `alt` text

---

## Title Tag Formula

```
[Primary Keyword] — [Brand Name]
[Page Topic] | Eonrisia
```

Examples:
- `Volunteer With Eonrisia — Join Our Creative Community`
- `Our Projects | Eonrisia`
- `About Eonrisia — Community-Driven Creative Organization`

Max 60 characters. Always ends with `| Eonrisia` or `— Eonrisia`.

---

## Meta Description Formula

One to two sentences. Lead with the value, end with an action.

Examples:
- `Eonrisia builds immersive fictional universes with a global community of writers, artists, and developers. See our active projects.`
- `Join Eonrisia as a volunteer contributor. Find open roles in writing, design, engineering, music, and community management.`

---

## Heading Hierarchy

```
<h1>  — Page title (1 per page, primary keyword)
  <h2> — Major sections
    <h3> — Sub-sections within h2
      <h4> — Labels, card headings (use sparingly)
```

Never skip levels. Never use headings for visual styling — use a styled `<span>` or CSS class instead.

---

## Internal Linking Strategy

- Every page should link to at least 2 other relevant pages
- Anchor text is descriptive — never "click here" or "read more"
- The home page links to all primary sections
- Blog posts (Phase 2) link to relevant project pages and volunteer page

---

## Image SEO

- File names are descriptive and hyphen-separated: `Eonrisia-team-2026.jpg` not `IMG_4821.jpg`
- Alt text describes the image content: `"Eonrisia core team at the 2026 community event"` not `"team photo"`
- All images served via `next/image` — WebP/AVIF auto-conversion, responsive srcset
- No images exceed 200KB after optimization

---

## Page-Specific Keyword Targets

| Page | Primary Keyword | Secondary Keywords |
|---|---|---|
| Home | `Eonrisia` | creative organization, fictional universe, community-driven |
| About | `Eonrisia organization` | creative ecosystem, who we are |
| Mission | `Eonrisia mission` | community-driven creativity, open creative organization |
| Team | `Eonrisia team` | team members, core team |
| Volunteer | `volunteer with Eonrisia` | contribute, open roles, creative volunteer |
| Projects | `Eonrisia projects` | Sanctyria, community projects |
| Work With Us | `commission Eonrisia` | creative tech team, hire for projects |
| Contact | `contact Eonrisia` | get in touch, partner with Eonrisia |
