ARG BASE_IMAGE=node:16.17-alpine3.16
FROM $BASE_IMAGE AS builder
WORKDIR /app

COPY *.* ./
COPY .yarn ./.yarn
COPY yarn.lock ./yarn.lock

COPY packages/common-libs ./packages/common-libs
COPY packages/backend-libs ./packages/backend-libs
COPY cli/tymlez-dev-cli ./cli/tymlez-dev-cli
COPY packages/platform-api-interfaces ./packages/platform-api-interfaces
COPY packages/trustchain-sdk ./packages/trustchain-sdk

COPY patches ./patches

COPY services/platform-middleware ./services/platform-middleware

RUN yarn
WORKDIR /app/services/platform-middleware
RUN yarn build
RUN yarn cache clean

FROM $BASE_IMAGE
RUN apk add --no-cache curl

ARG GIT_SHA=latest
ENV GIT_SHA="${GIT_SHA}"
ENV PORT=3000

RUN addgroup -S tymlez && adduser -S -G tymlez tymlez && chown -R tymlez:tymlez /home/tymlez/
USER tymlez

WORKDIR /app
COPY --from=builder --chown=tymlez:tymlez /app .

EXPOSE 3000
CMD ["yarn", "start:prod"]
