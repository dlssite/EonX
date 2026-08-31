# Contributing — Eonrisia Website

## Who Can Contribute

Any Eonrisia volunteer with repository access. All contributions go through pull requests — no one commits directly to `main`, including core team members.

---

## Branch Strategy

We use a simplified GitHub Flow:

```
main (production)
  └── feat/[feature-name]     ← new features
  └── fix/[bug-description]   ← bug fixes
  └── content/[page-name]     ← content or copy updates
  └── docs/[doc-name]         ← documentation updates
  └── chore/[task-name]       ← maintenance, dependency updates
```

### Rules
- Always branch from `main`
- Branch names are lowercase, hyphen-separated
- One concern per branch — no "while I was in here" changes
- Never commit directly to `main`

---

## Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]
[optional footer]
```

### Types

| Type | When to use |
|---|---|
| `feat` | A new feature or page |
| `fix` | A bug fix |
| `content` | Copy, CMS schema, or content updates |
| `style` | Visual/CSS changes that don't affect logic |
| `refactor` | Code restructuring without behavior change |
| `docs` | Documentation changes |
| `chore` | Build, dependencies, tooling |
| `perf` | Performance improvements |
| `test` | Adding or fixing tests |

### Examples

```
feat(team): add department filter to team grid
fix(nav): mobile menu not closing on route change
content(home): update hero headline and CTA copy
docs(architecture): add data flow diagram
chore(deps): update next to 15.1.2
```

---

## Pull Request Process

1. **Open a PR** from your branch to `main`
2. **Title:** Follow the same format as commit messages (`feat(team): add filter`)
3. **Description:** Use the PR template:
   - What does this PR do?
   - What was tested?
   - Screenshots (for visual changes)
   - Any blocked issues or open questions?
4. **Assign at least one reviewer** (core team member for all PRs)
5. **Check all CI checks pass** — lint, type check, Lighthouse, build
6. **Squash and merge** — keep `main` history clean

---

## Code Review Standards

Reviewers check for:
- Correctness: Does it do what the PR says?
- Design system compliance: No hardcoded colors or spacing
- Accessibility: New interactive elements have ARIA labels, keyboard navigation
- SEO: New pages have title, meta, canonical
- Performance: No unnecessary client components, images use `next/image`
- Docs: Is a doc file update needed?

---

## Definition of Done

A task is done when:
- [ ] Code builds without errors (`npm run build`)
- [ ] All TypeScript types pass (`npm run type-check`)
- [ ] ESLint passes (`npm run lint`)
- [ ] New UI components are keyboard-navigable
- [ ] New pages have complete SEO metadata
- [ ] Relevant docs have been updated
- [ ] PR reviewed and approved by at least 1 core team member
- [ ] Merged to `main` and Vercel preview deployment verified
