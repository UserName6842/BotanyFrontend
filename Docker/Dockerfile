# syntax = docker/dockerfile:1

ARG NODE_VERSION=18.18.0

FROM node:${NODE_VERSION}-slim as base

ENV NODE_ENV=development

WORKDIR /src

# Build
FROM base as build

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# Run
FROM base

COPY --from=build /src /src

CMD ["yarn", "start"]
