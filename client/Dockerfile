FROM node:18 as base

WORKDIR /app

RUN mkdir -p client api-server

COPY client/package.json .

COPY api-server/package.json .

COPY package.json .


FROM base as development

COPY client client

COPY api-server api-server

WORKDIR /app/client

RUN npm install

CMD ["npm", "run", "dev"]


FROM development as builder

RUN npm run build