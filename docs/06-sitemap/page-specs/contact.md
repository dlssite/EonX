# Page Spec: Contact

**URL:** `/contact`
**Phase:** 1
**Template:** Contact / Form
**SEO Priority:** 0.6

---

## Purpose

Give every audience type a direct path to reach Eonrisia. Three distinct inquiry types prevent a single generic inbox from mixing partner inquiries with volunteer questions.

---

## Inquiry Types

| Type | Audience | Stored As |
|---|---|---|
| Partner & Donor | Organizations, sponsors, funders | `inquiries` (type: `partner`) |
| General Contact | Anyone — questions, feedback | `inquiries` (type: `contact`) |
| Press | Journalists, media outlets | `inquiries` (type: `press`) |

Commission inquiries → redirected to `/work-with-us` (Phase 2) or included as a fourth type.

---

## Sections

### 1. Page Hero
- Eyebrow: "Contact"
- Headline: "Let's talk"
- Lead: "Whether you're a potential partner, a member of the press, or just curious — we'd love to hear from you."

### 2. Inquiry Type Selector
- Three cards / tabs: "Partner & Donations", "General", "Press"
- Selecting a type shows the relevant form below (or scrolls to it)
- Each form section is independently visible on the page (no tab hiding content — better for SEO and accessibility)

### 3. Contact Forms
Each form includes:
- Full name
- Email address
- Organization (required for Partner and Press)
- Message
- Honeypot field (hidden from users, catches bots)
- Submit button
- Response time note: "We typically respond within 2–3 business days."

### 4. Direct Contact Info
- General email: `hello@eonrisia.org`
- Partnership email: `partners@eonrisia.org`
- Press email: `press@eonrisia.org`

### 5. Social Links Row
- Links to all Eonrisia social profiles (from CMS `siteSettings.socialLinks`)

---

## Form Behavior

- Client-side validation: React Hook Form + Zod
- Server-side validation: Zod schema re-validated in Server Action
- Honeypot field: `<input name="website" style="display:none" tabIndex={-1} />`
- Rate limiting: 5 submissions per IP per hour
- On success: Form replaced by confirmation message (no page reload)
- On error: Error message displayed inline, form state preserved

---

## SEO

- **Title:** `Contact Eonrisia — Partnership, Press, and General Inquiries`
- **Meta Description:** `Get in touch with Eonrisia. For partnerships, donations, press inquiries, or general questions — we'd love to hear from you.`
- **H1:** Set via CMS
- **Structured Data:** BreadcrumbList
