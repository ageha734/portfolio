import { createPlaywrightConfig } from "@portfolio/playwright-config";
import "dotenv/config";

function getPortFromBaseUrl(baseUrl: string): string {
    try {
        const url = new URL(baseUrl);
        return url.port || "8787";
    } catch {
        return "8787";
    }
}

const baseUrl = process.env.VITE_API_URL ?? "http://localhost:8787";
const PORT = getPortFromBaseUrl(baseUrl);

export default createPlaywrightConfig({
    testDir: "./e2e",
    outputDir: "./.results/playwright",
    baseURL: baseUrl,
    port: PORT,
    webServerCommand: process.env.CI ? "bun run start" : "bun run dev",
    reportOutputDir: "../wiki/reports/e2e/api",
    projectName: "api",
    projects: [
        {
            name: "chromium",
            use: {},
        },
    ],
});
