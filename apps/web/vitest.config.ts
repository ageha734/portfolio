import { resolve } from "node:path";
import { createVitestConfig } from "@portfolio/vitest-config";

export default createVitestConfig({
    root: __dirname,
    tsconfigPath: "./tsconfig.json",
    testDir: "./app",
    coverageDir: "../../wiki/reports/test/web",
    projectName: "web",
    additionalAliases: {
        "~": resolve(__dirname, "./app"),
    },
});
