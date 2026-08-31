# Deployment — Eonrisia Website

## Hosting

The Eonrisia website runs on a **Hostinger KVM VPS** (1 vCPU, 4GB RAM, 50GB NVMe, Ubuntu Linux). The full stack runs as Docker containers orchestrated by Docker Compose. Caddy handles HTTPS and reverse proxying. PostgreSQL runs as a container on the same VPS.

See [`docs/07-development/docker.md`](./docker.md) for the full Docker setup guide.

---

## Deployment Flow

Every push to `main` on GitHub triggers an automated deployment via GitHub Actions:

```
Developer pushes to main (or PR is merged to main)
        │
        ▼
GitHub Actions: ci.yml
  ├── npm run lint
  ├── npm run type-check
  └── (if all pass) → build.yml
        │
        ▼
GitHub Actions: build.yml
  ├── docker build (Next.js + Payload, multi-stage)
  ├── docker tag → ghcr.io/eonrisia/eonrisia-web:latest
  └── docker push → GitHub Container Registry
        │
        ▼
GitHub Actions: deploy.yml
  ├── SSH into VPS
  ├── docker compose pull   (pulls new image)
  ├── docker compose up -d  (restarts app container only)
  └── docker image prune -f (clean up old images)
        │
        ▼
Caddy proxies eonrisia.org → new app container
```

The database and Caddy containers are never restarted during a normal application deployment — only the `app` container is replaced.

---

## GitHub Actions Workflow Files

```
.github/
└── workflows/
    ├── ci.yml        ← Runs on every PR: lint + type-check
    ├── build.yml     ← Runs on push to main: build + push image
    └── deploy.yml    ← Runs after build: SSH deploy to VPS
```

### Required GitHub Secrets

Set these in the repository Settings → Secrets and variables → Actions:

| Secret | Value |
|---|---|
| `VPS_HOST` | VPS IP address |
| `VPS_USER` | SSH user (e.g. `ubuntu`) |
| `VPS_SSH_KEY` | Private SSH key for VPS access |
| `VPS_DEPLOY_PATH` | Path on VPS where docker-compose.yml lives (e.g. `/opt/eonrisia`) |
| `GHCR_TOKEN` | GitHub token with `packages:write` scope (for pushing images) |

---

## First-Time VPS Setup

Run these once on a fresh VPS:

```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# 3. Create app directory
sudo mkdir -p /opt/eonrisia
sudo chown $USER:$USER /opt/eonrisia

# 4. Copy files to VPS
scp docker-compose.yml user@vps:/opt/eonrisia/
scp Caddyfile user@vps:/opt/eonrisia/
scp .env.production user@vps:/opt/eonrisia/.env.production
scp .env.docker user@vps:/opt/eonrisia/.env.docker

# 5. Pull images and start
cd /opt/eonrisia
docker compose --env-file .env.docker up -d

# 6. Verify all containers are running
docker compose ps
```

---

## Domain and DNS Setup

1. Point your domain's DNS A record to the VPS IP address:
   ```
   Type: A
   Name: @          (eonrisia.org)
   Value: [VPS IP]
   TTL: 300

   Type: A
   Name: www        (www.eonrisia.org)
   Value: [VPS IP]
   TTL: 300
   ```
2. Caddy automatically provisions a TLS certificate from Let's Encrypt once DNS propagates
3. `www.eonrisia.org` is configured in the Caddyfile to redirect to `eonrisia.org`

---

## Production Build Verification

After any deployment, verify:

- [ ] `docker compose ps` shows all 3 containers as `Up`
- [ ] `https://eonrisia.org` loads correctly
- [ ] `https://eonrisia.org/admin` shows Payload login
- [ ] `https://eonrisia.org/sitemap.xml` is accessible
- [ ] `https://eonrisia.org/robots.txt` is accessible
- [ ] A form submission stores correctly in Payload admin
- [ ] TLS certificate is valid (check browser padlock)

---

## Rollback

If a deployment causes issues, roll back to the previous image:

```bash
# On the VPS — pull a specific previous image tag
docker compose stop app
docker compose rm -f app

# Edit docker-compose.yml to point to the previous image tag
# e.g. ghcr.io/eonrisia/eonrisia-web:sha-abc1234

docker compose up -d app
```

Image tags: every build is also tagged with the Git commit SHA (`ghcr.io/eonrisia/eonrisia-web:sha-[short-sha]`). Previous tags are retained in ghcr.io for 30 days.

---

## Updating Caddy or PostgreSQL

These containers are not updated on every app deployment. Update them deliberately:

```bash
# On the VPS
cd /opt/eonrisia

# Pull new versions (as specified in docker-compose.yml)
docker compose pull caddy
docker compose pull postgres

# Restart the updated container
docker compose up -d caddy
# or
docker compose up -d postgres
```

**Always back up the database before updating PostgreSQL.** See [`infrastructure.md`](../02-architecture/infrastructure.md) for backup procedures.

---

## Logs

```bash
# All containers
docker compose logs -f

# App only
docker compose logs -f app

# Caddy only (useful for debugging HTTPS issues)
docker compose logs -f caddy

# PostgreSQL only
docker compose logs -f postgres
```
