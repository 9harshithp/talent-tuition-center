# =============================================================
# TALENT TUITION CENTER (TTC) - PRODUCTION MULTI-STAGE DOCKERFILE
# =============================================================

# 1. Base Stage: Use Node 20 Alpine Linux image for minimum footprint
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-co-cache libc6-compat

# 2. Dependencies Stage: Install Node.js dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 3. Builder Stage: Build production application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment to production for build optimization
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# 4. Runner Stage: Minimal production runtime container
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for container security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Create persistent data directory with proper ownership
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

# Copy static assets and standalone server bundle
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
