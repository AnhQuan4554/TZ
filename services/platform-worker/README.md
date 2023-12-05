# platform-worker

## Description

Platform worker for background tasks like:

- Data collection
- Data integrity check
- Database data ingestion 
- Emails

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```


## Build docker locally

```bash

docker build -t platform-worker -f services/platform-worker/Dockerfile --progress plain

```