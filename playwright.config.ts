import { PlaywrightTestConfig } from '@playwright/test';
import { testConfig } from './testConfig';
import { OrtoniReportConfig } from 'ortoni-report';

const ENV = process.env.ENV || process.env.npm_config_ENV || `qa`; // Use QA for IDE test discovery when no environment is supplied
const validEnvironments = [`qa`, `dev`, `qaApi`, `devApi`] as const;
type TestEnvironment = typeof validEnvironments[number];

if (!validEnvironments.includes(ENV as TestEnvironment)) {
  throw new Error(`Please provide a correct environment value: qa, dev, qaApi, or devApi.`);
}

const currentEnvironment = ENV as TestEnvironment;
const ignoreHTTPSErrorsByEnvironment: Record<TestEnvironment, boolean> = {
  qa: false,
  dev: true,
  qaApi: true,
  devApi: true,
};
const ignoreHTTPSErrors = ignoreHTTPSErrorsByEnvironment[currentEnvironment];

const reportConfig: OrtoniReportConfig = {
  open: `never`,
  base64Image: true,
  title: "AutoQA Framework",
  filename: "OrtoniHtmlReport",
  authorName: "Pradeep Kumar H N",
  folderPath: "html-report",
  projectName: "AutoQA Framework:End-to-End Test Automation using Playwright and TypeScript",
};

const browserProjects = [
  {
    name: `Chrome`,
    use: {
      browserName: `chromium` as const,
      channel: `chrome` as const,
    },
  },
  {
    name: `Firefox`,
    use: {
      browserName: `firefox` as const,
    },
  },
  {
    name: `WebKit`,
    use: {
      browserName: `webkit` as const,
    },
  },
];

const config: PlaywrightTestConfig = {

  //Global Setup to run before all tests
  globalSetup: `./global-setup`,

  //sets timeout for each test case
  timeout: 120000,

  //number of retries if test case fails
  retries: 0,

  //Reporters
  reporter: [[`./CustomReporterConfig.ts`], [`allure-playwright`], [`html`, { outputFolder: 'html-report', open: 'never' }], [`ortoni-report`, reportConfig]],

  projects: [
    ...browserProjects.map(({ name, use: browserOptions }) => ({
      name,
      testMatch: `**/tests/functional/**/*.test.ts`,
      use: {
        ...browserOptions,
        baseURL: testConfig[currentEnvironment],
        headless: true,
        viewport: { width: 1920, height: 1080 },
        ignoreHTTPSErrors,
        acceptDownloads: true,
        screenshot: `only-on-failure` as const,
        video: `retain-on-failure` as const,
        trace: `retain-on-failure` as const,
        launchOptions: {
          slowMo: 0
        }
      },
    })),
    {
      name: `API`,
      testMatch: `**/tests/api/MockCrud.test.ts`,
      use: {
        baseURL: testConfig.qaApi
      }
    },
    {
      name: `SwaggerAPI`,
      testMatch: `**/tests/api/SwaggerBookStore.test.ts`,
      use: {
        baseURL: testConfig.qa
      }
    }
  ],
};
export default config;
