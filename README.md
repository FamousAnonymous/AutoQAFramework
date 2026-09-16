# AutoQA Framework

Playwright and TypeScript test automation framework for UI and API testing.

## Prerequisites

- Node.js 20 or later
- npm
- Google Chrome, Firefox, and WebKit browsers for Playwright
- A ReqRes API key for API tests

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
| `qaApi` | `https://reqres.in` |
| `devApi` | Not configured |

Set the `ENV` variable before running tests. The default environment is `qa`.

### ReqRes API key

ReqRes requires an `x-api-key` header for the API tests. Set `REQRES_API_KEY` in your local shell using a key created in the [ReqRes console](https://app.reqres.in/console).

PowerShell:

```powershell
$env:REQRES_API_KEY = "<your-reqres-api-key>"
$env:ENV = "qaApi"
```

Do not commit API keys or add them directly to source files. In GitHub Actions, configure a repository secret named `REQRES_API_KEY`; the workflow passes that secret to the API test step.

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
$env:REQRES_API_KEY = "<your-reqres-api-key>"
npm run test:api
```

API tests run serially against ReqRes and currently cover:

- `GET /api/users?per_page=1`
- `POST /api/users`

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
├── tests/api/                         # ReqRes API tests
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
4. Runs API tests against `qaApi` using the `REQRES_API_KEY` repository secret.
5. Uploads the generated HTML report as a workflow artifact.

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
