FROM node:alpine

RUN npm install -g http-server

COPY packages/docs/out/ /usr/share/www

EXPOSE 3000

CMD ["http-server", "/usr/share/www", "-p", "3000", "-g", "--cors", "-c-1", "--ext", "html"]
