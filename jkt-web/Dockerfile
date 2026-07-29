# jkt-web — Angular 22 SSR
# Build context: jkt-web/

ARG BUILD_ID=1

# ─── deps ────────────────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ─── build ───────────────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS build
ARG BUILD_ID
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=development
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN echo "BUILD_ID=${BUILD_ID}" \
  && npm run build \
  && test -f dist/jkt-web/server/server.mjs \
  && test -d dist/jkt-web/browser \
  && ls -la dist/jkt-web/server \
  && ls -la dist/jkt-web/browser | head

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
RUN test -f dist/jkt-web/server/server.mjs

USER app
EXPOSE 4000

CMD ["node", "dist/jkt-web/server/server.mjs"]
