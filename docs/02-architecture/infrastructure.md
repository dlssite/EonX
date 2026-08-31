# Infrastructure — Eonrisia Website

## Server

| Spec | Value |
|---|---|
| Provider | Hostinger |
| Plan | KVM 1 |
| CPU | 1 vCPU |
| RAM | 4GB |
| Disk | 50GB NVMe |
| Bandwidth | 4TB/month |
| OS | Ubuntu Linux (LTS) |
| Location | Choose closest to primary audience |

The VPS runs two applications:
1. Eonrisia website (this project)
2. Internal workspace software (existing, already deployed)

---

## Container Layout

All Eonrisia containers are managed by a single `docker-compose.yml` at `/opt/eonrisia/` on the VPS.

```
/opt/eonrisia/
├── docker-compose.yml
├── Caddyfile
├── .env.production      ← app environment variables (gitignored)
├── .env.docker          ← docker compose variables (gitignored)
└── backups/             ← local backup staging directory
```

### Containers

| Container | Image | Internal Port | Exposed |
|---|---|---|---|
| `caddy` | `caddy:2-alpine` | 80, 443 | Yes — public |
| `app` | `ghcr.io/eonrisia/eonrisia-web:latest` | 3000 | No — internal only |
| `postgres` | `postgres:16-alpine` | 5432 | No — internal only |

### Docker Networks

```
eonrisia_network (bridge)
  ├── caddy    (can reach app:3000)
  ├── app      (can reach postgres:5432)
  └── postgres (no outbound access needed)
```

Caddy cannot reach postgres directly — only via app. This is intentional. Postgres is accessible only from the app container.

### Docker Volumes

| Volume | Mounted At | Purpose |
|---|---|---|
| `postgres_data` | `/var/lib/postgresql/data` | PostgreSQL data files |
| `media_uploads` | `/app/public/media` | Payload uploaded media files |
| `caddy_data` | `/data` | TLS certificates (must persist) |
| `caddy_config` | `/config` | Caddy runtime config |

---

## Caddyfile

```caddy
eonrisia.org {
    reverse_proxy app:3000

    # Compress responses
    encode gzip

    # Security headers
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        Referrer-Policy "strict-origin-when-cross-origin"
        Permissions-Policy "camera=(), microphone=(), geolocation=()"
        -Server
    }
}

# Redirect www to non-www
www.eonrisia.org {
    redir https://eonrisia.org{uri} permanent
}
```

Caddy automatically:
- Obtains and renews TLS certificates from Let's Encrypt
- Redirects HTTP (port 80) to HTTPS (port 443)
- Serves all traffic with HTTP/2

---

## docker-compose.yml

```yaml
version: "3.9"

services:
  caddy:
    image: caddy:2-alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
      - caddy_config:/config
    networks:
      - eonrisia_network
    depends_on:
      - app

  app:
    image: ${IMAGE_TAG:-ghcr.io/eonrisia/eonrisia-web:latest}
    restart: unless-stopped
    env_file:
      - .env.production
    volumes:
      - media_uploads:/app/public/media
    networks:
      - eonrisia_network
    depends_on:
      postgres:
        condition: service_healthy

  postgres:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - eonrisia_network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
  media_uploads:
  caddy_data:
  caddy_config:

networks:
  eonrisia_network:
    driver: bridge
```

---

## Firewall Rules

Only two ports should be open to the public internet on the VPS:

```bash
# Allow SSH (change 22 to your custom SSH port if hardened)
ufw allow 22/tcp

# Allow HTTP and HTTPS (Caddy handles both)
ufw allow 80/tcp
ufw allow 443/tcp

# Enable firewall
ufw enable
```

All other ports — including 3000 (app) and 5432 (postgres) — are blocked externally. They are only accessible within the Docker internal network.

---

## Backup Strategy

### What Gets Backed Up

| Data | Method | Frequency | Retention |
|---|---|---|---|
| PostgreSQL database | `pg_dump` → compressed `.sql.gz` | Daily at 02:00 UTC | 30 days |
| Media uploads volume | `tar.gz` of `/opt/eonrisia/media_uploads` | Daily at 02:30 UTC | 14 days |
| Caddyfile + compose config | Committed to a private `Eonrisia-infra` repo | On every change | Git history |

### Backup Script

```bash
#!/bin/bash
# /opt/eonrisia/backup.sh

DATE=$(date +%Y-%m-%d)
BACKUP_DIR="/opt/eonrisia/backups"

# PostgreSQL dump
docker compose exec -T postgres pg_dump \
  -U $POSTGRES_USER $POSTGRES_DB \
  | gzip > "$BACKUP_DIR/postgres-$DATE.sql.gz"

# Media uploads
tar -czf "$BACKUP_DIR/media-$DATE.tar.gz" \
  -C /var/lib/docker/volumes/Eonrisia_media_uploads/_data .

# Remove old backups (keep 30 days for DB, 14 for media)
find $BACKUP_DIR -name "postgres-*.sql.gz" -mtime +30 -delete
find $BACKUP_DIR -name "media-*.tar.gz" -mtime +14 -delete

echo "Backup complete: $DATE"
```

Add to crontab:
```bash
crontab -e
# Add:
0 2 * * * /opt/eonrisia/backup.sh >> /var/log/Eonrisia-backup.log 2>&1
```

### Off-Site Backup

Local backups in `/opt/eonrisia/backups/` are not sufficient alone — if the VPS is lost, the backups go with it. Set up daily sync to an off-site location:

- **Option A:** Cloudflare R2 (free 10GB) — use `rclone` to sync the backups directory
- **Option B:** Backblaze B2 — `rclone` sync, very cheap storage
- **Option C:** A second VPS or a team member's storage via `rsync` over SSH

At minimum, a manual database restore must be tested once per quarter.

---

## Resource Monitoring

Check container resource usage periodically:

```bash
# Live stats
docker stats

# Disk usage
df -h
docker system df
```

If RAM usage consistently exceeds 3.5GB, it is time to either optimise containers or upgrade the VPS plan. Log the decision in [`docs/08-governance/decision-log.md`](../08-governance/decision-log.md).

---

## SSH Hardening (Recommended)

```bash
# Disable password auth, use SSH keys only
sudo nano /etc/ssh/sshd_config
# Set: PasswordAuthentication no
# Set: PermitRootLogin no
sudo systemctl restart sshd
```

Only team members with their SSH public key added to `~/.ssh/authorized_keys` can access the server.
