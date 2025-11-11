FROM caddy:2-alpine

COPY Caddyfile /etc/caddy/Caddyfile

COPY packages/docs/out/ /usr/share/caddy

EXPOSE 3000
