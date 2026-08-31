# Troubleshooting — Eonrisia Website

## Common Issues

---

### Dev server won't start

**Symptom:** `npm run dev` fails immediately

**Checks:**
1. Is `DATABASE_URI` set in `.env.local`? Payload will fail without it.
2. Is Node.js version 20 or higher? Run `node --version`.
3. Did you run `npm install` after pulling new changes?
4. Is port 3000 in use? Kill the process: `npx kill-port 3000`

---

### Payload admin shows "Unauthorized"

**Symptom:** Going to `/admin` shows an auth error or redirect loop

**Checks:**
1. Have you created the first admin user? On a fresh DB, visit `/admin` and create one.
2. Is `PAYLOAD_SECRET` set? Without it, Payload can't sign auth tokens.
3. Try clearing browser cookies and refreshing.

---

### Database connection error

**Symptom:** `Error: Cannot connect to database` or `ECONNREFUSED`

**Checks:**
1. Check your `DATABASE_URI` is correct in `.env.local`.
2. Make sure your Neon database is not paused (Neon free tier pauses after inactivity). Go to the Neon dashboard and wake it.
3. Make sure your IP is not blocked in the Neon connection settings.

---

### TypeScript errors after pulling

**Symptom:** Type errors in `payload-types.ts` or in components after a schema change

**Fix:**
```bash
npm run payload:generate
```

Payload auto-generates TypeScript types from the collection schema. This file should never be edited manually — it's overwritten on each generation.

---

### Changes in CMS not showing on the site

**Symptom:** Content updated in Payload admin but the site still shows old content

**Explanation:** Pages use ISR. After the revalidation window, the next request will show fresh content. This can take up to 60 seconds for frequently updated pages.

**Faster fix:** Trigger a manual revalidation by saving a change in the CMS (the `afterChange` hook fires the revalidation webhook). Or in development, stop and restart the dev server.

---

### Images not loading in development

**Symptom:** Images uploaded to Payload admin return 404 in the Next.js dev server

**Checks:**
1. Is `BLOB_READ_WRITE_TOKEN` set? Media uploads go to Vercel Blob.
2. For local development without Blob, configure Payload to use local disk storage and serve via `/api/media/[filename]`.

---

### Build fails with "Module not found"

**Symptom:** `npm run build` fails with module import errors

**Checks:**
1. Did you add a new file and forget to export it?
2. Are all import paths using the `@/` alias? Relative paths that cross more than one directory cause issues.
3. Run `npm run type-check` first — TypeScript errors prevent builds.

---

### ESLint errors blocking commit

**Symptom:** Commit hook fails with ESLint errors

**Fix:** Run `npm run lint -- --fix` to auto-fix what can be fixed automatically. Remaining errors need manual fixes.

---

## Getting Help

1. Check this file first
2. Search existing GitHub Issues in the repository
3. Ask in the `#engineering` channel on Discord
4. Open a new GitHub Issue with: what you were doing, what you expected, what happened, and the error message
