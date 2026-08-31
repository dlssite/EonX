# ─────────────────────────────────────────────────────────────
# Stage 1: deps — install production + dev dependencies
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

# Install libc compat for native modules (sharp, etc.)
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

# ─────────────────────────────────────────────────────────────
# Stage 2: builder — generate types and build Next.js
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Payload TypeScript types before the Next.js build
RUN npm run payload:generate

# Build the Next.js application (includes Payload)
RUN npm run build

# ─────────────────────────────────────────────────────────────
# Stage 3: runner — minimal production image
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only what is needed to run
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Media uploads directory — will be overridden by Docker volume mount
RUN mkdir -p ./public/media && chown -R nextjs:nodejs ./public/media

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
