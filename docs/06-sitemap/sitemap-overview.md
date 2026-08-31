# Sitemap Overview — Eonrisia Website

## Page Status Legend

| Status | Meaning |
|---|---|
| Phase 1 | Launches with the initial site |
| Phase 2 | Unlocked when content is ready |
| Planned | Identified but not yet scoped |

---

## Full Page Map

```
eonrisia.org
│
├── /                           Home                    Phase 1
├── /about                      About                   Phase 1
├── /mission                    Mission & Vision         Phase 1
├── /team                       Team                    Phase 1
├── /projects                   Projects (index)        Phase 1
│   └── /projects/[slug]        Project detail          Phase 1
├── /volunteer                  Volunteer               Phase 1
├── /contact                    Contact                 Phase 1
│
├── /work-with-us               Work With Us (commissions) Phase 2
├── /governance                 Governance              Phase 2
├── /partnerships               Partnerships            Phase 2
├── /press                      Press / Media Kit       Phase 2
├── /updates                    Blog / Updates (index)  Phase 2
│   └── /updates/[slug]         Blog post detail        Phase 2
└── /donate                     Donate                  Phase 2
```

---

## Navigation Structure

### Primary Navigation (Header)
Phase 1 (launch):
```
About  |  Projects  |  Team  |  Volunteer  |  [Get Involved →]
```

Phase 2 (expanded):
```
About  |  Projects  |  Team  |  Volunteer  |  Updates  |  [Get Involved →]
```

"Get Involved" is the primary CTA — links to `/volunteer` or `/contact` (configurable in CMS).

### Footer Navigation

**Column 1: Eonrisia**
- Home
- About
- Mission & Vision
- Governance (Phase 2)

**Column 2: Get Involved**
- Volunteer
- Work With Us (Phase 2)
- Donate (Phase 2)
- Contact

**Column 3: Work**
- Projects
- Sanctyria (links to universe site)
- Press (Phase 2)
- Partnerships (Phase 2)

**Column 4: Connect**
- Social media links (YouTube, Instagram, TikTok, X, Discord)

---

## Page Spec Files

Individual page specs live in `docs/06-sitemap/page-specs/`. Each spec defines the page's purpose, sections, CTAs, and SEO intent.

| Page | Spec File |
|---|---|
| Home | [home.md](./page-specs/home.md) |
| About | [about.md](./page-specs/about.md) |
| Mission & Vision | [mission-vision.md](./page-specs/mission-vision.md) |
| Team | [team.md](./page-specs/team.md) |
| Volunteer | [volunteer.md](./page-specs/volunteer.md) |
| Projects | [projects.md](./page-specs/projects.md) |
| Contact | [contact.md](./page-specs/contact.md) |
| Work With Us | [work-with-us.md](./page-specs/work-with-us.md) |
| Governance | [governance.md](./page-specs/governance.md) |
| Partnerships | [partnerships.md](./page-specs/partnerships.md) |
| Press | [press.md](./page-specs/press.md) |
| Blog | [blog.md](./page-specs/blog.md) |
| Donate | [donate.md](./page-specs/donate.md) |
