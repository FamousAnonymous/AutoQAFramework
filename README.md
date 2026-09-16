# AutoQA Framework

Playwright and TypeScript test automation framework for UI and API testing.

## Prerequisites

- Node.js 20 or later
- npm
- Google Chrome, Firefox, and WebKit browsers for Playwright
- A local JSON Server for API tests

## Installation

Clone the repository, open a terminal in the project directory, and install dependencies:

```powershell
npm ci
npx playwright install chrome firefox webkit
```

## Configuration

The available test environments are defined in [`testConfig.ts`](./testConfig.ts):

| Environment | Base URL |
| --- | --- |
| `qa` | `https://demoqa.com` |
| `dev` | Not configured |
| `qaApi` | `http://127.0.0.1:3000` |
| `devApi` | Not configured |

Set the `ENV` variable before running tests. The default environment is `qa`.

## Running tests

### All tests

```powershell
$env:ENV = "qa"
npm test
```

### UI tests

```powershell
$env:ENV = "qa"
npm run test:ui
```

UI tests run against DemoQA with the `Chrome`, `Firefox`, and `WebKit` projects.

To run a specific browser project:

```powershell
npx playwright test tests/functional --project=Chrome
npx playwright test tests/functional --project=Firefox
npx playwright test tests/functional --project=WebKit
```

### API tests

```powershell
$env:ENV = "qaApi"
npm run test:api:qa
```

`test:api:qa` starts the local JSON Server automatically, waits for port 3000,
runs the tests, and stops the server when the run finishes. To start the server
manually for development, use:

```powershell
npm run mock:server
```

### Local mock API

The project includes a JSON Server database in [`mock-db.json`](./mock-db.json).
Start the local mock API with:

```powershell
npm run mock:server
```

The server runs at `http://127.0.0.1:3000` and exposes REST endpoints for the
top-level collections in the JSON file:

```text
GET    http://127.0.0.1:3000/employees
GET    http://127.0.0.1:3000/employees/1
POST   http://127.0.0.1:3000/employees
PUT    http://127.0.0.1:3000/employees/1
PATCH  http://127.0.0.1:3000/employees/1
DELETE http://127.0.0.1:3000/employees/1
```

Changes made through POST, PUT, PATCH, or DELETE are written back to
`mock-db.json`.

The `test:api:qa` command runs both API suites in one Playwright invocation:

- Local CRUD tests against `qaApi` (`http://127.0.0.1:3000`)
- Swagger Book Store tests against `qa` (`https://demoqa.com`)

The local CRUD API tests cover:

- `GET /employees`
- `GET /employees/:id`
- `POST /employees`
- `PUT /employees/:id`
- `PATCH /employees/:id`
- `DELETE /employees/:id`

The Swagger API tests cover the DemoQA Book Store API and temporary-user book
management flow.

### A single UI test file

```powershell
$env:ENV = "qa"
npm run test:single
```

### Smoke tests

```powershell
$env:ENV = "qa"
npm run test:parallel
```

To run smoke tests with one worker:

```powershell
$env:ENV = "qa"
npm run test:serial
```

### Playwright code generation

```powershell
npm run test:record
```

## Reports and test artifacts

The framework produces:

- Playwright HTML reports in `html-report/`
- Allure results in `allure-results/`
- Test failure artifacts in `test-results/`
- Framework logs in `logs/`

Open the Allure report with:

```powershell
npm run allureReport
```

The generated reports and test artifacts are ignored by Git.

## Project structure

```text
.
├── .github/workflows/playwright.yml  # GitHub Actions workflow
├── lib/                              # Shared UI, API, and base-test helpers
├── tests/api/                         # Local mock and Swagger API tests
├── tests/functional/                  # DemoQA UI tests
├── utils/api/                         # Expected API request and response values
├── playwright.config.ts               # Playwright projects and reporters
├── testConfig.ts                      # Environment URLs and test settings
└── global-setup.ts                    # Test-run initialization
```

## GitHub Actions

The workflow in [`.github/workflows/playwright.yml`](./.github/workflows/playwright.yml) runs on pushes and pull requests targeting `main`. It:

1. Installs Node.js 20 and project dependencies.
2. Installs Chrome for Playwright.
3. Runs UI tests against `qa`.
4. Starts the local JSON Server and runs API tests against `qaApi`.
5. Uploads the generated HTML report as a workflow artifact.

Slack notifications are not configured. Slack is a messaging and collaboration
service; a Slack webhook would allow GitHub Actions to post test results to a
Slack channel. This project does not use that integration.

## Useful commands

| Command | Description |
| --- | --- |
| `npm ci` | Install the locked dependencies |
| `npm test` | Run the full Playwright suite |
| `npm run test:ui` | Run functional UI tests |
| `npm run test:api` | Run API tests |
| `npm run test:single` | Run `Interactions.test.ts` |
| `npm run test:parallel` | Run `@Smoke` tests in parallel |
| `npm run test:serial` | Run `@Smoke` tests with one worker |
| `npm run allureReport` | Open the Allure report |
