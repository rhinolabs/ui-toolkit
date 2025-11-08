# Build stage
FROM node:24-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy workspace configuration
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
COPY packages ./packages

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build dependencies first
RUN pnpm --filter=@rhinolabs/react-hooks run build
RUN pnpm --filter=@rhinolabs/ui run build

# Build docs
RUN pnpm --filter=@rhinolabs/ui-toolkit-docs run build

# Production stage - serve static files with nginx
FROM nginx:alpine

# Copy custom nginx config
COPY packages/docs/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files
COPY --from=builder /app/packages/docs/out /usr/share/nginx/html

# Expose port
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
