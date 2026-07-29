# jkt-web — Angular 22 SSR
# Build context must be the jkt-web/ directory (see root docker-compose.yml)

# ─── deps ────────────────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ─── build ───────────────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Keep devDependencies available for `ng build`
ENV NODE_ENV=development
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build

# ─── runtime ─────────────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000
ENV HOST=0.0.0.0

RUN groupadd -r app && useradd -r -g app app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist

USER app
EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=8s --start-period=60s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||4000)+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "dist/jkt-web/server/server.mjs"]
