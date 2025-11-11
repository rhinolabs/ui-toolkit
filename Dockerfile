# Stage 1: Dependencies
FROM node:alpine AS deps

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ui/package.json ./packages/ui/
COPY packages/hooks/package.json ./packages/hooks/
COPY packages/docs/package.json ./packages/docs/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages

# Copy source code
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages ./packages

# Build all packages (hooks, ui, then docs)
RUN pnpm run build

# Stage 3: Runner
FROM node:alpine AS runner

RUN npm install -g pnpm

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy necessary files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/packages/docs/package.json ./packages/docs/
COPY --from=builder /app/packages/docs/.next ./packages/docs/.next
COPY --from=builder /app/packages/docs/public ./packages/docs/public
COPY --from=builder /app/packages/docs/next.config.ts ./packages/docs/

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

EXPOSE 3000

WORKDIR /app/packages/docs

CMD ["pnpm", "start"]
