FROM alpine:latest

RUN apk add --no-cache nginx

COPY nginx.conf /etc/nginx/http.d/default.conf

COPY packages/docs/out/ /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
