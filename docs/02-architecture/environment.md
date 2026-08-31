# Environment Variables — Eonrisia Website

## Overview

All secrets and environment-specific configuration are stored in environment variables. They are never hardcoded in source code. The `.env.example` file in the repository root is the canonical reference — it contains all variable names with placeholder values and descriptions.

There are two separate env contexts:
- **Application** (`.env.local` / `.env.production`) — consumed by Next.js and Payload
- **Docker Compose** (`.env.docker`) — consumed by Docker Compose to configure containers

---

## Application Variables

### `.env.local` (development) / `.env.production` (production on VPS)

```bash
# ─────────────────────────────────────────
# DATABASE
# ─────────────────────────────────────────

# PostgreSQL connection string pointing to the postgres container
# Local dev:  postgresql://Eonrisia:password@localhost:5432/eonrisia_db
# Docker:     postgresql://Eonrisia:password@postgres:5432/eonrisia_db
#             (uses Docker internal service name "postgres" as host)
DATABASE_URI=postgresql://Eonrisia:your_db_password@postgres:5432/eonrisia_db

# ─────────────────────────────────────────
# PAYLOAD CMS
# ─────────────────────────────────────────

# Random secret used to sign Payload authentication tokens
# Generate with: openssl rand -base64 32
PAYLOAD_SECRET=your_payload_secret_min_32_chars

# ─────────────────────────────────────────
# SITE
# ─────────────────────────────────────────

# Public base URL — no trailing slash
# Local dev:   http://localhost:3000
# Production:  https://eonrisia.org
NEXT_PUBLIC_SITE_URL=https://eonrisia.org

# ─────────────────────────────────────────
# EMAIL (form submission notifications)
# ─────────────────────────────────────────

# Resend API key for transactional email
RESEND_API_KEY=your_resend_api_key

# Email address that receives form submission notifications
NOTIFY_EMAIL=team@eonrisia.org

# ─────────────────────────────────────────
# ISR REVALIDATION
# ─────────────────────────────────────────

# Secret token to authenticate the /api/revalidate webhook
# Generate with: openssl rand -hex 32
REVALIDATION_SECRET=your_revalidation_secret

# ─────────────────────────────────────────
# MEDIA
# ─────────────────────────────────────────

# Absolute URL path where Payload serves uploaded media
# Local dev:   http://localhost:3000/media
# Production:  https://eonrisia.org/media
NEXT_PUBLIC_MEDIA_URL=https://eonrisia.org/media
```

---

## Docker Compose Variables

### `.env.docker` (used only by `docker-compose.yml`)

```bash
# ─────────────────────────────────────────
# POSTGRES CONTAINER
# ─────────────────────────────────────────

# These three variables initialise the PostgreSQL container on first run.
# They must match the credentials in DATABASE_URI above.
POSTGRES_USER=Eonrisia
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=eonrisia_db

# ─────────────────────────────────────────
# APP CONTAINER IMAGE
# ─────────────────────────────────────────

# Docker image tag to pull and run (set by CI/CD on each deploy)
IMAGE_TAG=ghcr.io/eonrisia/eonrisia-web:latest

# ─────────────────────────────────────────
# CADDY
# ─────────────────────────────────────────

# The public domain Caddy will serve and provision TLS for
CADDY_DOMAIN=eonrisia.org
```

---

## Environment Files Reference

| File | Committed | Purpose |
|---|---|---|
| `.env.example` | Yes | Template — all application keys with placeholders |
| `.env.docker.example` | Yes | Template — all Docker Compose keys with placeholders |
| `.env.local` | No | Local dev application secrets |
| `.env.production` | No | Production application secrets (on VPS only, never in repo) |
| `.env.docker` | No | Production Docker Compose secrets (on VPS only, never in repo) |
| `.env.test` | No | Test environment overrides |

---

## Local Development Without Docker

For local development, point `DATABASE_URI` at `localhost:5432` instead of `postgres:5432`. You can run just the PostgreSQL container without the full stack:

```bash
# Start only the database for local dev
docker compose up postgres -d

# Then run Next.js natively
npm run dev
```

This avoids the overhead of building and running the full Docker stack locally while still using a real PostgreSQL instance.

---

## Adding a New Variable

1. Add it to `.env.example` with a descriptive comment and placeholder value
2. Add it to your local `.env.local` with the real value
3. Add it to the production `.env.production` on the VPS
4. If it is consumed by Docker Compose, add it to `.env.docker.example` and `.env.docker` on the VPS
5. Document it in this file under the correct section
6. **Never put secrets in `NEXT_PUBLIC_` variables** — they are embedded in the client bundle and visible to anyone

---

## Rules

- **Never commit any `.env.*` file** except `.env.example` and `.env.docker.example`
- **Never put secrets in `NEXT_PUBLIC_` variables**
- **Rotate `PAYLOAD_SECRET` only during a maintenance window** — changing it invalidates all active admin sessions
- **Rotate `POSTGRES_PASSWORD` via the amendment process** — requires updating `.env.production`, `.env.docker`, and the database user simultaneously
- **All team members generate their own local secrets** — never share `.env.local` files
