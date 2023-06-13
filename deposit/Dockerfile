FROM node:19-alpine as base

WORKDIR /base

COPY src ./src
COPY abis ./abis
COPY ["package*.json", "declarations.d.ts", "tsconfig.json", "./"]

RUN npm ci --quiet && npm run build

FROM node:19-alpine as production

WORKDIR /app

COPY --from=base /base/build ./build
COPY "package*.json" ./

RUN npm ci --quiet --omit=dev --ignore-scripts

CMD npm run start
