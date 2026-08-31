# Amendment Process — Eonrisia Constitution

## Why Amendments Exist

The constitution protects foundational decisions from being changed casually. But it is not immutable forever — the world changes, the organization grows, and some locked-in decisions may eventually need to change.

The amendment process ensures that changes to the constitution are deliberate, documented, and broadly agreed upon. It is not designed to make change impossible. It is designed to make change intentional.

---

## When an Amendment Is Required

An amendment is required to change:
- Any rule in files `01` through `07` of the constitution
- The amendment process itself (file `08`)
- The core technology choices (framework, CMS, database, hosting)
- The brand identity (typefaces, primary brand color, logo rules)
- The accessibility standard (raising or lowering the WCAG target)

An amendment is **not** required for:
- Changes to the `docs/` folder
- Adding new pages or content within existing rules
- Bug fixes and performance improvements
- Changes to hosting provider within the same technology (e.g. switching Neon for Supabase while keeping PostgreSQL)

---

## Amendment Process

### Step 1: Proposal

Open a GitHub Issue titled:
```
[AMENDMENT] [Short title of the proposed change]
```

The proposal must include:
- **Which constitution file and section** is being changed
- **What the current rule says**
- **What the proposed new rule says**
- **Why this change is needed** (what problem does it solve?)
- **What the consequences are** (what does this change enable or foreclose?)
- **Who is affected** (contributors, users, partners?)

---

### Step 2: Discussion Period

The proposal remains open for a minimum of **7 days**. Any contributor may comment. The author must respond to substantive questions and objections.

For amendments affecting the core technology stack, the discussion period is **14 days**.

---

### Step 3: Vote

After the discussion period:
- All **core team members** must vote: `approve`, `reject`, or `abstain`
- The amendment passes with a **simple majority of non-abstaining core team votes**
- If any core team member raises a blocking concern during the discussion period, the vote is deferred until the concern is resolved or the proposer withdraws the concern

---

### Step 4: Ratification

If the vote passes:
1. The proposer (or an assigned core team member) updates the constitution file
2. The change is committed directly to `main` with the commit message: `constitution: [amendment title]`
3. The GitHub Issue is closed with a link to the commit
4. A new entry is added to `docs/08-governance/decision-log.md` documenting the amendment

---

### Step 5: Communication

After ratification, the amendment is announced in the `#engineering` channel on Discord so all contributors are aware of the change.

---

## Emergency Amendments

In exceptional circumstances (security vulnerability, legal issue, platform shutdown), an emergency amendment may be proposed and ratified within 48 hours with approval from at least two core team members. Emergency amendments must still be documented in the decision log and retrospectively follow the proposal format within 7 days of the emergency change.

---

## Amendment History

All ratified amendments are recorded in `docs/08-governance/decision-log.md`.
