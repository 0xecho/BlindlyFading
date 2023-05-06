FROM node:18 as base

WORKDIR /app

COPY api-server/package.json .


FROM base as development

RUN npm install

COPY api-server .

WORKDIR /app/api-server

CMD ["npm", "run", "dev"]


FROM base as builder

RUN npm install --omit=dev

COPY api-server .

RUN npm run build


FROM alpine as production

RUN apk add nodejs ca-certificates

WORKDIR /app

COPY --from=builder /app/ .

CMD ["node", "dist/index"]