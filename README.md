# Tymlez Platform

Tymlez Platform Monorepo

```
tymlez-platform
├── clients
│   └── cohort-web                (Next.js/React web app for the Client Cohort)
│   └── [client name]-web 			 (Next.js/React web app for the Client Dashboard)
│   └── platform-admin-web        (Next.js/React web app for the Platform Admin UI)
│   └── platform-trustchain-web   (Next.js/React web app for the Trustchain UI)
├── packages
│   └── backend-libs              (TypeScript libraries for backend, can refer to NestJS)
│   └── common-libs               (TypeScript libraries common for both frontend and backend, must not refer to NestJS or React)
│   └── devias-material-kit       (Devias Material Kit Pro v5, components library for all the clients, must not modify)
│   └── platform-api-interfaces   (TypeScript interfaces for Platform API)
│   └── frontend-libs             (TypeScript storybook library for frontend)
├── services
│   └── [client name]-middleware  (NestJS API backend for the Client)
│   └── platform-worker           (NestJS application for the background data jobs)
│   └── platform-middleware       (NestJS middleware for the Tymlez platform)
├── local                         (Tools for local development)

```

# Design Decisions

1. This is a monorepo managed by Lerna and yarn workspaces. One major benefit of using a monorepo is that it can share dependencies among projects, e.g., [packages/backend-libs](packages/backend-libs), [packages/platform-api-interfaces](packages/platform-api-interfaces). We are not using Lerna's publishing and versioning features at the moment because we always build and deploy at the same time. However, we use `learn run` and `lerna exec` to run command in the sub-packages.
2. Avoid shell script, use TypeScript for CLI instead. Refer to [clients/cohort-web/tools](clients/cohort-web/tools) and [cli/tymlez-dev-cli](cli/tymlez-dev-cli). This is because TypeScript is much more powerful, can be type checked and unit tested.
3. Do not use `npm`. Use `yarn` instead
4. Do not use TypeScript specific features that are not in JavaScript, e.g., `paths`. Because it will require us to configure many tools to understand the non-JS syntax, and it will increase complicity.
5. Never use the [Non-null assertion operator "!"](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator), it is always better to check `null/undefined` before using the variables, which will prevent one of most common JavaScript error: `Cannot access xxx of undefined.`
6. Do not disable eslint rule: `react-hooks/exhaustive-deps`, it will cause bug. Please refer to [React Hook Pitfalls - Kent C. Dodds](https://youtu.be/VIRcX2X7EUk?t=360), [Tips](https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects) and [Performance Optimizations](https://reactjs.org/docs/hooks-faq.html#performance-optimizations)
7. Do not set `err` in `catch(err)` to `any`, handle it using [type guard](https://www.typescriptlang.org/docs/handbook/2/narrowing.html). Please refer to [How can I safely access caught Error properties in TypeScript?](https://stackoverflow.com/a/64452744)
8. Do not use `redux`, use [React Hooks](https://reactjs.org/docs/hooks-reference.html) instead. You can still use reducers, please refer to [clients/cohort-web/src/features/auth.tsx](clients/cohort-web/src/features/auth.tsx)
9. NestJS controllers should accept input as DTO but return only interfaces, and the interfaces should be defined in [packages/platform-api-interfaces](packages/platform-api-interfaces/README.md)

   ```ts
   async create(createUserDto: createUserDto): Promise<IUser> {
     return this.userService.create(createUserDto);
   }
   ```

10. Only use `class-transformer` in NestJS controllers, they are useful for converting `unknown` types from the network to DTO classes, but not suitable for converting database types to DTO classes because they will prevent TypeScript type checking.
11. Do not share Input DTOs and output DTOs, they may look similar, but the validation rules and constraints are different.
12. No need to use `propTypes` or `defaultProps`, because TypeScript already checks props at build time.
13. Try to find utility functions from [lodash](https://lodash.com/) before writing your own.
14. If you only need types from a package, you can use `import type` to solve the eslint error from `import/no-extraneous-dependencies`, e.g.,

    ```
    import type { TransactionResponse } from '@ethersproject/abstract-provider';
    ```

# Development

## Prerequisites

- NodeJs 16+
- Yarn 3.2.3+
- Docker (Docker Desktop)

## For Docker on Mac

Please enable the following features to speed up your local development environment.

- Enable Enable VirtioFS accelerated directory sharing( please read https://www.docker.com/blog/speed-boost-achievement-unlocked-on-docker-desktop-4-6-for-mac/)
- Increase default resources for docker engines (Docker preferences/engine)

## Bootstrap (run once only)

```sh
# Set node and yarn versions
nvm install 16
nvm use
yarn set version berry

# Bootstrap tools and libs
yarn
yarn bootstrap

yarn lint
yarn test

```

## Workspace cleanup

THe project setup using yarn workspace with flatten node_modules structure, thus if there some node_modules inside under sub-folders may cause error or performance issues. TO keep workspace clean up we can use the following command:

```sh
npx npkill
```

## Get Started

A client name is required to start the local environment. This decides which web frontend and backend middleware will run.
To set/update the client for your local development, update/set the environment variables `CLIENT_NAME` in file `local/.env`:

```
CLIENT_NAME=magnum
```

To customise other environmental settings, update thhe `local/docker.env` file.

You can build the docker images for the local stack by (Note: it will take about 10 minutes for the first build):

```
yarn build:dev
```

You can start up a local stack by:

```
yarn start:dev
```

To force rebuild the base image before starting: (Required only to fix problems with your local development)

```
yarn start:dev --build
```

To stop the containers:

```
yarn stop:dev
```

Visit page (http://localhost:3000/start.html)[http://localhost:3000/start.html] for a list of services running locally.
The major frontend services include:

- http://localhost:3000 -> client dashboard. this is alias of - http://localhost:3001
- http://localhost:3000/admin -> platform admin website - alias of http://localhost:3002/admin
- http://localhost:3000/trustchain -> client website. this is alias of - http://localhost:3003/trustchain
- http://localhost:4000 -> Guardian Dashboard

If you need a username/password to log in, you can use the default username (admin@tymlez.com) and password (admin1):
The user to automatically run Newrelic script has the same email and password as NewRelic's

For local docker development please make sure you have done below step to get best performance

## Bootstrap guardian on local

- go to http://localhost:3000/admin/guardian
- publish all entity in order (root authority, owner, project, site, installer and device)

## Connect to the local database

To connect to the local database, use the following configuration:

```
host: localhost
port: 5432
database: [client name] or test
username: test
password: test
```

## Reset local database

To reset the local database, you can remove the Docker data volumen: `local_platform_db`

## Starting client-specific services manually

You can start the core services ONLY with the below command. it will start only mongo/redist/postgres.

```
yarn start:core

```

## local development commands

- yarn start:dev --core -> only run the backend database and core service
- yarn start:dev --backend -> run the core services and backend APIs
- yarn start:dev --web -> run the backend, plus frontend React Apps
- yarn start:dev --guardian -> run the guardian stack and tymlez guardian api
- yarn start:dev -> run fullstack include everything

You can then selectively start the sub package you want by following the package specific documentations. e.g., [clients/cohort-web](clients/cohort-web/README.md), [services/platform-middleware](services/cohort-middleware/README.md)
**NOTICE**

- If the code has compile error it will cause the build loops and make your local development restart in loops, it will increase CPU usage and slow down everything. when you see CPU is too heavy make sure all the code is good

### Vault setup

After start local development with `yarn start:dev` or `yarn start:dev --guardian` we need to intialise vault before using it.

1. open the vault initialization page at: http://localhost:8200/ui
2. If you don't see the initialization page (e.g. a login form instead), try deleting the vault volumn and restarting the vault container)
3. Enter '1' into the two input fields in the initialization form
4. Copy token & key
5. Update local/.env with token & key in steps 3 as below

```
  VAULT_TOKEN=[root token from step 3]
  VAULT_KEY=[]

```

6. Go to next step using VAULT_KEY to unseal the vault. if it is in sealed status (this step will be happen automatically if the local/.env is setup property upon the next start:dev)

7. Log in to the vault using the VAULT_TOKEN above.

8. Click 'Enable new engine' -> Generic -> KV -> Next

9. Enter 'secret' for Path input, leave other fields as default and click 'Enable Engine'

10. Restart vault containers.

More information about the vault please read more at: [https://www.vaultproject.io/docs](https://www.vaultproject.io/docs)

# Troubleshoots

Refer to [TROUBLESHOOTS](docs/TROUBLESHOOTS.md)

# Contribution

Our development workflow uses [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/), [Smart Commit](https://confluence.atlassian.com/fisheye/using-smart-commits-960155400.html) and [GitHub Actions](https://github.com/features/actions).

1. Set up your local git. For Smart Commit to work, the email address with git must match the JIRA user email address.

   ```
   git config user.email "your.name@tymlez.com"
   ```

1. To start coding and contribute to this project. Run the following command to set up local git hooks:

   ```yarn
   yarn prepare
   ```

1. Create a feature branch named containting the JIRA ticket. For example:

   ```
   git checkout -b TYM-123-new-feature-branch-name
   git checkout -b feature/TYM-123-new-feature-branch-name
   ```

1. Commit your code as with conventional commit message. The local commit git hooks will set your commit message scope with the JIRA ticket id. For example:

   ```
   git commit -m "feat: My first commit message"

   # shows feat(TYM-123): My first commit message
   git log HEAD^..HEAD

   ```

1. Push your local feature branch to the origin as usual. Create a PR with a title containing the JIRA ticket ID. For example: `TYM-123: My first PR`

1. CI will check the PR title. Your PR will be reviewed and eventually merged to the 'main' branch.

1. Your feature will be deployed upon the next release cycle.
