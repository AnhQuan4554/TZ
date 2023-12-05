FROM node:16.17-alpine3.15
RUN apk add --no-cache curl

ARG GIT_SHA=latest
ENV GIT_SHA="${GIT_SHA}"
ENV PORT=3000

RUN addgroup -S tymlez
RUN adduser -S -G tymlez tymlez
RUN chown -R tymlez:tymlez /home/tymlez/
USER tymlez

WORKDIR /app
RUN chown -R tymlez:tymlez /app

COPY --chown=tymlez:tymlez *.* ./
COPY --chown=tymlez:tymlez .yarn ./.yarn
COPY --chown=tymlez:tymlez yarn.lock ./yarn.lock

COPY --chown=tymlez:tymlez packages/common-libs ./packages/common-libs
COPY --chown=tymlez:tymlez packages/backend-libs ./packages/backend-libs
COPY --chown=tymlez:tymlez cli/tymlez-dev-cli ./cli/tymlez-dev-cli
COPY --chown=tymlez:tymlez cli/tymlez-dev-cli/package-fake.json ./cli/tymlez-dev-cli/package.json
COPY --chown=tymlez:tymlez packages/platform-api-interfaces ./packages/platform-api-interfaces
COPY --chown=tymlez:tymlez packages/trustchain-sdk ./packages/trustchain-sdk
COPY --chown=tymlez:tymlez patches ./patches

COPY --chown=tymlez:tymlez services/cohort-middleware ./services/cohort-middleware

RUN yarn
WORKDIR /app/services/cohort-middleware
RUN yarn build
RUN rm -rf /app/.yarn/cache
EXPOSE 3000
CMD ["yarn", "start:prod"]
