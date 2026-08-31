# Docker Setup — Eonrisia Website

## Overview

The Eonrisia website runs as three Docker containers in production:

| Container | Role |
|---|---|
| `app` | Next.js + Payload CMS (the full application) |
| `postgres` | PostgreSQL 16 database |
| `caddy` | Reverse proxy + automatic HTTPS |

In local development you have two options:
1. **Native dev** — run `npm run dev` normally, but use a local Postgres container for the database
2. **Full Docker dev** — run the entire stack in Docker (mirrors production exactly, slightly slower DX)

Most developers use option 1 day-to-day and option 2 for final integration checks.

---

## Prerequisites

Install on your machine:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose)
- Node.js 20 LTS (for native dev option)

---

## Option 1 — Native Dev (Recommended for Daily Work)

Run only the PostgreSQL container, and run Next.js natively on your machine.

```bash
# 1. Copy environment files
cp .env.example .env.local
cp .env.docker.example .env.docker

# 2. Start only the database
docker compose up postgres -d

# 3. Install dependencies
npm install

# 4. Run the dev server
npm run dev
```

The app runs at `http://localhost:3000`.
The Payload admin panel is at `http://localhost:3000/admin`.

In `.env.local`, `DATABASE_URI` should point to `localhost`:
```bash
DATABASE_URI=postgresql://Eonrisia:your_password@localhost:5432/eonrisia_db
```

To stop the database:
```bash
docker compose down postgres
```

---

## Option 2 — Full Docker Dev (Production Mirror)

Run the complete stack (app + postgres + caddy) in Docker. Use this when testing deployment-related behaviour or Caddy configuration.

```bash
# 1. Copy environment files
cp .env.example .env.production
cp .env.docker.example .env.docker

# 2. Build the app image locally
docker compose build app

# 3. Start all containers
docker compose up -d

# 4. Check all containers are healthy
docker compose ps
```

The app is served at `http://localhost` (via Caddy on port 80).

> Note: In local full-Docker mode, Caddy uses HTTP only (no HTTPS) since it cannot provision Let's Encrypt certs for `localhost`. In production, HTTPS is automatic.

In `.env.production`, `DATABASE_URI` should use the Docker service name:
```bash
DATABASE_URI=postgresql://Eonrisia:your_password@postgres:5432/eonrisia_db
```

---

## Dockerfile

The Dockerfile uses a **multi-stage build** to keep the final image small:

```dockerfile
# ─── Stage 1: Dependencies ─────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

# ─── Stage 2: Builder ──────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Generate Payload types before build
RUN npm run payload:generate
# Build Next.js app
RUN npm run build

# ─── Stage 3: Runner (final image) ─────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Only copy what is needed to run
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Media uploads directory (will be overridden by volume mount)
RUN mkdir -p ./public/media

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

**Why multi-stage?**
- The `deps` and `builder` stages are discarded after the build
- The final `runner` image contains only the compiled output — no source code, no dev dependencies, no build tools
- Target image size: ~200–300MB (vs ~1GB+ with a naive single-stage build)

---

## Useful Docker Commands

```bash
# Start all containers in background
docker compose up -d

# Stop all containers (data preserved in volumes)
docker compose down

# Stop all containers AND delete volumes (WARNING: deletes database)
docker compose down -v

# View running containers and their health
docker compose ps

# Follow logs for all containers
docker compose logs -f

# Follow logs for one container
docker compose logs -f app
docker compose logs -f postgres
docker compose logs -f caddy

# Open a shell inside the app container
docker compose exec app sh

# Open a PostgreSQL shell
docker compose exec postgres psql -U Eonrisia -d eonrisia_db

# Rebuild the app image after code changes (full Docker dev only)
docker compose build app
docker compose up -d app

# Remove unused images to free disk space
docker image prune -f
```

---

## Database Management

### Access the database directly

```bash
docker compose exec postgres psql -U Eonrisia -d eonrisia_db
```

### Manual backup

```bash
docker compose exec -T postgres pg_dump -U Eonrisia eonrisia_db \
  | gzip > backup-$(date +%Y-%m-%d).sql.gz
```

### Restore from backup

```bash
# Stop the app first to prevent writes during restore
docker compose stop app

gunzip -c backup-2026-08-28.sql.gz \
  | docker compose exec -T postgres psql -U Eonrisia -d eonrisia_db

docker compose start app
```

### Reset local database (development only)

```bash
docker compose down postgres
docker volume rm Eonrisia_postgres_data
docker compose up postgres -d
# Payload will recreate all tables on next app start
```

---

## Deploying a New Version

This happens automatically via GitHub Actions on every push to `main`. To trigger manually from the VPS:

```bash
cd /opt/eonrisia

# Pull the latest image
docker compose pull app

# Restart app container with new image (zero-downtime for Caddy and Postgres)
docker compose up -d app

# Verify it started correctly
docker compose ps
docker compose logs app --tail=50
```

---

## Troubleshooting

### App container keeps restarting

```bash
docker compose logs app --tail=100
```

Most common causes:
- `DATABASE_URI` is wrong — the app cannot reach postgres
- `PAYLOAD_SECRET` is not set
- The postgres container is not yet healthy when app starts (the `depends_on: condition: service_healthy` in docker-compose.yml handles this, but check postgres logs)

### Caddy not serving HTTPS

```bash
docker compose logs caddy --tail=50
```

Most common causes:
- DNS A record not yet pointing to the VPS IP — Caddy cannot get a cert until DNS resolves
- Port 80 is blocked by the firewall — Let's Encrypt needs port 80 for HTTP challenge
- The `caddy_data` volume was deleted — Caddy will re-provision certs automatically but needs a moment

### Postgres data lost after restart

If `postgres_data` volume exists, data persists across restarts. If you ran `docker compose down -v`, the volume was deleted. Check:

```bash
docker volume ls | grep postgres
```

If the volume is gone, restore from backup. See the backup restore section above.
