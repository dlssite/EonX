# Getting Started — Eonrisia Website

## Prerequisites

Before you begin, make sure you have:

| Tool | Version | Install |
|---|---|---|
| Node.js | 20.x LTS or later | [nodejs.org](https://nodejs.org) |
| npm | 10.x or later | Included with Node.js |
| Git | Any recent version | [git-scm.com](https://git-scm.com) |
| A Neon account | — | [neon.tech](https://neon.tech) (free tier) |
| A Vercel account | — | [vercel.com](https://vercel.com) (free tier) |

---

## 1. Clone the Repository

```bash
git clone https://github.com/Eonrisia/eonrisia-web.git
cd eonrisia-web
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Set Up Environment Variables

Copy the example file:

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in the required values:

```bash
# Required for local dev
DATABASE_URI=your_neon_postgres_connection_string
PAYLOAD_SECRET=any_random_string_at_least_32_chars
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

See [`environment.md`](./environment.md) for the full variable reference.

---

## 4. Set Up the Database

Payload will automatically create all tables on first run using your `DATABASE_URI`. No manual migrations needed for a fresh setup.

If you need to reset your local database:
```bash
npm run payload:reset
```

---

## 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the Payload CMS admin panel.

On first run, Payload will prompt you to create the first admin user.

---

## 6. Seed Demo Content (Optional)

To populate the CMS with sample content for local development:

```bash
npm run seed
```

This creates:
- 4 sample team members
- 2 sample projects (including Sanctyria)
- 3 sample volunteer opportunities
- Navigation and footer globals

---

## Key Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Build the production bundle |
| `npm run start` | Run the production build locally |
| `npm run lint` | Run ESLint across all source files |
| `npm run type-check` | Run TypeScript compiler checks |
| `npm run test` | Run test suite with Vitest |
| `npm run test:e2e` | Run end-to-end tests with Playwright |
| `npm run payload:generate` | Regenerate Payload TypeScript types |
| `npm run seed` | Seed the database with demo content |

---

## Editor Setup (Recommended)

VS Code with the following extensions:
- **ESLint** — inline linting feedback
- **Tailwind CSS IntelliSense** — class autocomplete
- **Prettier** — code formatting on save
- **Prisma** — if using Prisma for DB migrations

Add to your VS Code settings:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

## Troubleshooting

See [`troubleshooting.md`](./troubleshooting.md) for common issues and fixes.
