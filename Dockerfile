# syntax=docker/dockerfile:1

# ---- Build stage: install all deps and compile TypeScript ----
FROM node:24-alpine AS builder
WORKDIR /app

# Install dependencies first to maximize layer caching.
COPY package.json package-lock.json ./
RUN npm ci

# Compile to ./dist
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ---- Runtime stage: production deps + compiled output only ----
FROM node:24-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app

# Only production dependencies end up in the final image.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Compiled JavaScript (includes the Swagger JSDoc used at runtime).
COPY --from=builder /app/dist ./dist

# Drop root privileges (the `node` user ships with the base image).
USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "dist/index.js"]
