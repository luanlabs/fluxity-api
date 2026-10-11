# Fluxity API

The backend service for [Fluxity](https://fluxity.finance) — a token-streaming and
lockup platform built on the **Stellar / Soroban** network.

It exposes a REST API for token and lockup data, mirrors on-chain lockup contract
events into MongoDB, and supports independent testnet and mainnet deployments.

---

## Tech stack

| Concern        | Choice                                          |
| -------------- | ----------------------------------------------- |
| Runtime        | Node.js **22+** (Docker image uses Node 24 LTS) |
| Language       | TypeScript 5.9 (strict)                         |
| HTTP framework | Express 5                                       |
| Database       | MongoDB via Mongoose 8                          |
| Blockchain     | `@stellar/stellar-sdk` 16 (Soroban RPC)         |
| Validation     | Zod 4 (environment + request input)             |
| Logging        | Pino (pretty in dev, JSON in prod)              |
| API docs       | Swagger / OpenAPI 3.1 (`swagger-jsdoc`)         |
| Tooling        | ESLint 9 (flat config) · Prettier · tsx         |

---

## Prerequisites

- Node.js **22 or newer**
- A reachable **MongoDB** instance
- A funded Stellar **admin secret key** used as the source account for contract queries

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# then edit .env with real values (see "Environment variables" below)

# 3. Run in development (hot-reload via tsx, no build step)
npm run dev
```

The API starts on `http://localhost:${PORT}` (default **3000**). Interactive API
docs are served at **`/swagger`**, and a health probe at **`/health`**.

### Production build

```bash
npm run build      # compile TypeScript to ./dist
npm start          # run the compiled server (node dist/index.js)
```

---

## Environment variables

All required variables are validated at startup. If any are missing or malformed, the
process prints a detailed report and exits.

| Variable                  | Required | Default       | Description                                                     |
| ------------------------- | :------: | ------------- | --------------------------------------------------------------- |
| `NODE_ENV`                |    no    | `development` | `development` \| `production` \| `test`                         |
| `PORT`                    |    no    | `3000`        | HTTP port                                                       |
| `DB_URI`                  |   yes    | —             | MongoDB connection string                                       |
| `DB_NAME`                 |   yes    | —             | MongoDB database name                                           |
| `BASE_FEE`                |    no    | `100000`      | Soroban base fee (stroops, numeric string)                      |
| `ADMIN_SECRET_KEY`        |   yes    | —             | Stellar admin secret key (`S...`) used for contract queries     |
| `TESTNET_SOROBAN_RPC_URL` |   yes    | —             | Testnet Soroban RPC URL                                         |
| `MAINNET_SOROBAN_RPC_URL` |    no    | —             | Mainnet RPC URL; requires `MAINNET_CONTRACT_ID`                 |
| `TESTNET_CONTRACT_ID`     |   yes    | —             | Testnet lockup contract id (`C...`)                             |
| `MAINNET_CONTRACT_ID`     |    no    | —             | Mainnet contract id; requires `MAINNET_SOROBAN_RPC_URL`         |
| `ADMIN_PASSWORD`          |   yes    | —             | Shared secret for the `Authorization` header on admin endpoints |
| `LOG_LEVEL`               |    no    | `info`        | `trace`…`fatal` \| `silent`                                     |
| `LOG_FILE_PATH`           |    no    | stdout        | In production, write JSON logs to this file instead of stdout   |
| `CORS_ORIGIN`             |    no    | `*`           | `*` or a comma-separated origin allowlist                       |

---

## API overview

Responses share a consistent envelope:

```json
{ "status": "success" | "error", "message": "string", "result": {} }
```

Endpoints (except `/health` and `/swagger`) are namespaced by network:
`/:network/...` where `network` is always `testnet` and is also `mainnet` when
both mainnet environment variables are configured. Without them, the service
logs a startup warning, returns `404` for mainnet routes, omits mainnet from
Swagger, and otherwise runs normally with testnet support only.

| Method | Path                     | Auth  | Description               |
| ------ | ------------------------ | ----- | ------------------------- |
| GET    | `/health`                | —     | Liveness/readiness probe  |
| GET    | `/swagger`               | —     | Swagger UI                |
| GET    | `/:network/token`        | —     | List tokens               |
| POST   | `/:network/token`        | admin | Add a token               |
| PUT    | `/:network/token/:token` | admin | Edit a token logo         |
| DELETE | `/:network/token`        | admin | Delete a token            |
| GET    | `/:network/lockup`       | —     | List lockups (filterable) |
| GET    | `/:network/lockup/:id`   | —     | Get a lockup by id        |
| POST   | `/:network/lockup`       | —     | Mirror a created lockup   |
| PUT    | `/:network/lockup`       | —     | Mirror a withdrawal       |
| DELETE | `/:network/lockup`       | —     | Mirror a cancellation     |

**Admin authentication:** send the `ADMIN_PASSWORD` value in the `Authorization`
header. The comparison is constant-time.

In the background, the service polls the lockup contract for `CREATED` /
`WITHDRAWN` / `CANCELLED` events and mirrors them into MongoDB.

---

## Docker

A multi-stage `Dockerfile` (Node 24 Alpine, non-root, healthcheck) and a
`compose.yaml` that bundles MongoDB are included.

```bash
# Build and run the whole stack (API + MongoDB)
cp .env.example .env        # edit values; DB_URI is overridden to the mongo service
docker compose up --build
```

- The API is published on `127.0.0.1:${HOST_PORT:-3000}`.
- `compose.yaml` waits for MongoDB to be healthy before starting the API.
- In production mode logs are emitted as JSON to stdout (`docker compose logs api`).

Build just the image:

```bash
docker build -t fluxity-api .
```

---

## npm scripts

| Script                 | Description                    |
| ---------------------- | ------------------------------ |
| `npm run dev`          | Hot-reloading dev server (tsx) |
| `npm run build`        | Compile TypeScript to `./dist` |
| `npm start`            | Run the compiled server        |
| `npm run typecheck`    | Type-check without emitting    |
| `npm run lint`         | ESLint                         |
| `npm run lint:fix`     | ESLint with autofix            |
| `npm run format`       | Prettier write                 |
| `npm run format:check` | Prettier check                 |

---

## Project structure

```
src/
├── index.ts            # app bootstrap, middleware, graceful shutdown
├── env.ts              # zod-validated, typed environment config
├── logger.ts           # pino logger
├── db.ts               # mongoose connection + background migration
├── constant/           # enums (networks)
├── middleware/         # auth, json envelope, network guard, error handler
├── models/             # mongoose schemas (Token, Lockup, Ledger)
├── routes/             # token, lockup and swagger routers
├── event/              # contract event listener + sync handlers
├── migrations/         # startup lockup backfill
├── swagger/            # OpenAPI JSDoc definitions
├── types/              # shared types + Express augmentation
└── utils/              # validation, error helpers, Soroban helpers
```

---

## License

MIT
