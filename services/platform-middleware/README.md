# Platform Middleware

Middleware / API layer of the Platform

# Local development

```sh
yarn dev:up

# Start dev server
yarn start:dev
```

# DB

## Create new migration file

- First of all add your entities to `src/db/mikro-orm.config.ts`, because we use webpack, we cannot use dynamic entities discovery.
- Create a migration file in `./src/db/migrations` ( This is a manual process at the moment)

## Create seed file

Create a file in `./src/db/seeders`, the `up` functions must be **idempotent** because they will called multiple times.

No secrets in the code, they should be loaded from environment variables or Terraform Cloud

# Meter DB (Quest DB)

All the meter data access to QuestDB will be encapsulated by `src/modules/meter-qdb`, because we would like to access all meter data via Mikro ORM, which will require us to write [custom driver](https://mikro-orm.io/docs/custom-driver/). Having one module encapsulate all the meter data access will make the future transition easier.

## Test build docker locally

```sh
docker build -t platform-middleware --build-arg SIT_SHA=1 -f Dockerfile --progress plain ../..

```

## Test Dovu marketplace

Config DOVU link in settings
https://vetwtb.csb.app/{partner-identifier}?amount={carbon-amount}&ref={customer-reference}&callbackURl={url}&webhook={api}

- partner-identifier: the partner identifier, e.g partner123
- amount: carbon offset to buy, e.g 10
- ref: customer reference, e.g customer123
- callbackURL: link to redirect to our frontend, e.g http://localhost:3001
- webhook: API to receive message from DOVU when token is purchased, e.g http://localhost:8080/api/dovu
  headers:
  {
  "x-signature": "Qtt+sLAN4WvCMbup4feMayUepwTp0vma0Y3men4Anoo="
  }
  payload: {
  "data": {
  "context": {partner-identifier},
  "reference": {customer-reference},
  "retirement-tx": "0.0.1156-1663839551-50378818",
  "retired-kgs": {carbon-amount},
  "reserve-remaining-kg": 2000
  }
  }
