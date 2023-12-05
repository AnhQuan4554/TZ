ARG BASE_IMAGE=node:16.17-alpine3.16

FROM $BASE_IMAGE as builder
RUN apk add --no-cache curl
RUN addgroup -S tymlez && adduser -S -G tymlez tymlez && chown -R tymlez:tymlez /home/tymlez/
USER tymlez
ENV PLATFORM="docker"
ENV NODE_ENV="production"

ARG GIT_SHA=latest
ENV GIT_SHA="${GIT_SHA}"
ENV PORT=3010

WORKDIR /app

COPY --chown=tymlez:tymlez *.* ./
COPY --chown=tymlez:tymlez .yarn ./.yarn
COPY --chown=tymlez:tymlez  yarn.lock ./yarn.lock
COPY --chown=tymlez:tymlez packages/common-libs ./packages/common-libs
COPY --chown=tymlez:tymlez packages/backend-libs ./packages/backend-libs
COPY --chown=tymlez:tymlez cli/tymlez-dev-cli/package-fake.json ./cli/tymlez-dev-cli/package.json
COPY --chown=tymlez:tymlez packages/platform-api-interfaces ./packages/platform-api-interfaces
COPY --chown=tymlez:tymlez packages/trustchain-sdk ./packages/trustchain-sdk
COPY --chown=tymlez:tymlez guardian/guardian-api-client ./guardian/guardian-api-client
COPY --chown=tymlez:tymlez guardian/tymlez-guardian-service ./guardian/tymlez-guardian-service

COPY --chown=tymlez:tymlez patches ./patches

RUN  yarn --inline-builds

WORKDIR /app/guardian/tymlez-guardian-service
RUN yarn build
RUN rm -rf /app/.yarn/cache

EXPOSE 3010

CMD ["yarn", "start:prod"]

# FROM $BASE_IMAGE
# RUN apk add --no-cache curl

# RUN addgroup -S tymlez && adduser -S -G tymlez tymlez && chown -R tymlez:tymlez /home/tymlez/
# USER tymlez

# WORKDIR /app
# COPY --from=builder --chown=tymlez:tymlez /app .

# EXPOSE 3010

# CMD ["yarn", "start:prod"]
