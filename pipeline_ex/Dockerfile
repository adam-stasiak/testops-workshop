FROM node:16-bullseye-slim AS build
WORKDIR /app
COPY package*.json .
RUN npm install

FROM cypress/included:12.12.0 AS executor
WORKDIR /app

COPY cypress cypress
COPY --from=build app/node_modules ./node_modules
COPY --from=build app/package.json .
COPY cypress.config.js .
COPY cypress.env.json .
COPY *Agent.js .
RUN npx cypress install
CMD ["npx", "cypress", "run"]