import { resolve } from "node:path";
import { createVitestConfig } from "@portfolio/vitest-config";

export default createVitestConfig({
    root: __dirname,
    tsconfigPath: "./tsconfig.json",
    testDir: "./app",
    coverageDir: "../wiki/reports/test/admin",
    projectName: "admin",
    additionalAliases: {
        "~": resolve(__dirname, "./app"),
    },
});
