/// <reference path="./node_modules/codeceptjs/typings/index.d.ts" />

import { setHeadlessWhen, setCommonPlugins } from "@codeceptjs/configure";

setHeadlessWhen(process.env.TEST_HEADLESS);

setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
    name: "portfolio",
    tests: "./tests/e2e/**/*.spec.ts",
    output: "./docs/codecept/report",
    helpers: {
        Playwright: {
            browser: "chromium",
            url: process.env.TEST_URL || "http://localhost:3100",
            show: !process.env.TEST_HEADLESS,
            waitForTimeout: 10000,
            waitForAction: 1000,
            waitForNavigation: "load",
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
