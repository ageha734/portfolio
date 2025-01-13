import { setHeadlessWhen, setCommonPlugins } from "@codeceptjs/configure";

setHeadlessWhen(process.env.TEST_HEADLESS);

setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
    name: "portfolio",
    gherkin: {
        features: "./src/test/functional/features/**/*.feature",
        steps: ["./src/test/steps/common.ts"],
    },
    tests: "./*_test.ts",
    output: "./output/reports",
    helpers: {
        Playwright: {
            browser: "chromium",
            url: process.env.TEST_URL || "http://localhost:3100",
            show: !process.env.TEST_HEADLESS,
            waitForTimeout: 10000,
            waitForAction: 1000,
            waitForNavigation: "networkidle0",
            ignoreHTTPSErrors: true,
        },
    },
    plugins: {
        allure: {
            enabled: true,
            require: "@codeceptjs/allure-legacy",
        },
        pauseOnFail: {
            enabled: !process.env.TEST_HEADLESS,
        },
        retryFailedStep: {
            enabled: true,
        },
        tryTo: {
            enabled: true,
        },
        screenshotOnFail: {
            enabled: true,
            fullPageScreenshots: true,
        },
    },
};
