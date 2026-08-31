# Contributor Code — Eonrisia Constitution

Every person contributing to the Eonrisia website repository — core team, volunteer, contractor, or AI agent — agrees to these standards.

---

## 1. Respect the Documentation

- Read the relevant docs before making changes
- If a doc exists for the area you are changing, update it as part of your contribution
- Never ship code that contradicts the docs without updating the docs first

---

## 2. No Direct Commits to Main

All changes go through a pull request. No exceptions. This applies to core team members.

---

## 3. Code Must Be Typed

All TypeScript types must be explicit. `any` is not permitted except in Payload auto-generated files. If you don't know the type, find it — don't skip it.

---

## 4. Respect the Design System

- No hardcoded color values, spacing values, or animation durations in components
- No new typefaces without an amendment
- No design patterns that contradict the component library without a documented proposal

---

## 5. Test What You Build

- New components have at least a smoke test (renders without errors)
- New interactive features have a keyboard navigation test
- New pages have SEO metadata verified before merge
- Performance regressions must be identified and addressed before merge

---

## 6. Write Meaningful Commit Messages

Follow the Conventional Commits format defined in `docs/07-development/contributing.md`. Commit messages are public record. "fixed stuff" is not acceptable.

---

## 7. Treat the Community With Respect

All code reviews, issue comments, PR discussions, and contributor interactions must be:
- Respectful and constructive
- Focused on the work, not the person
- Free of hostile, dismissive, or discriminatory language

Contributors who violate this standard will have their access reviewed.

---

## 8. Security Is Everyone's Responsibility

- Never commit secrets, API keys, or credentials
- Report security vulnerabilities privately to the core team — not in public issues
- If you discover a leaked secret in the repository history, report it immediately

---

## 9. Ask When Unsure

If you are unsure whether a change is within scope, consistent with the design system, or technically sound — ask in the `#engineering` channel before building. It is always better to ask first than to build something that needs to be undone.

---

## 10. The Constitution Is Not Optional

The rules in the constitution are not guidelines. They are requirements. If a pull request violates constitution law, it will not be merged regardless of how much work went into it. When in doubt, check the constitution first.
