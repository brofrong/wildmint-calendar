# syntax=docker/dockerfile:1

FROM oven/bun:1.3 AS front-builder

WORKDIR /app

COPY package.json bun.lock ./
COPY apps/wildmint-front/package.json ./apps/wildmint-front/
COPY apps/wildmint-back/package.json ./apps/wildmint-back/
RUN bun install --frozen-lockfile --filter wildmint-front

COPY apps/wildmint-front ./apps/wildmint-front
RUN bun --filter wildmint-front build

FROM oven/bun:1.3-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY package.json bun.lock ./
COPY apps/wildmint-front/package.json ./apps/wildmint-front/
COPY apps/wildmint-back/package.json ./apps/wildmint-back/
RUN bun install --production --frozen-lockfile --filter wildmint-front

COPY apps/wildmint-back/src ./apps/wildmint-back/src
COPY apps/wildmint-back/drizzle ./apps/wildmint-back/drizzle
COPY --from=front-builder /app/apps/wildmint-front/dist ./apps/wildmint-front/dist

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
	CMD bun -e "fetch('http://127.0.0.1:' + (process.env.PORT || 3000)).then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["bun", "run", "apps/wildmint-back/src/index.ts"]
