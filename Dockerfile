FROM alpine:latest

RUN apk add --no-cache caddy

COPY Caddyfile /etc/caddy/Caddyfile

COPY packages/docs/out/ /usr/share/caddy

EXPOSE 3000

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
