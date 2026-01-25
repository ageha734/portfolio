import * as fs from "node:fs";
import * as path from "node:path";
import { getCompatibilityDate, getProjectName, generateWranglerToml } from "./wrangler.js";
import { updateDeployScript } from "./packageScripts.js";
function getAppsConfig(domain) {
    return [
        {
            name: "web",
            type: "pages",
            buildCommand: "bun run build:remix",
            outputDir: "build/client",
            watchDirs: ["app", "public", "functions"],
            vars: {
                NODE_ENV: "production",
                VITE_BASE_URL: `https://${domain}`,
                VITE_GOOGLE_ANALYTICS_ENABLED: true,
                VITE_GOOGLE_TAG_MANAGER_ENABLED: true,
                VITE_XSTATE_INSPECTOR_ENABLED: false,
                VITE_SENTRY_ENVIRONMENT: "production",
                VITE_SENTRY_TRACES_SAMPLE_RATE: "1",
                VITE_SENTRY_REPLAY_SAMPLE_RATE: "0",
                VITE_SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE: "0",
            },
        },
        {
            name: "api",
            type: "worker",
            main: "src/index.ts",
            vars: {
                NODE_ENV: "development",
            },
        },
        {
            name: "admin",
            type: "pages",
            outputDir: "./dist",
            vars: {
                NODE_ENV: "development",
            },
        },
        {
            name: "wiki",
            type: "pages",
            outputDir: "./dist",
            vars: {
                NODE_ENV: "development",
            },
        },
    ];
}
function getStackConfig(projectName, configKey) {
    const stackYamlPath = path.join(process.cwd(), "Pulumi.rc.yaml");
    if (!fs.existsSync(stackYamlPath)) {
        throw new Error(`Pulumi stack config not found at ${stackYamlPath}`);
    }
    const content = fs.readFileSync(stackYamlPath, "utf-8");
    const fullConfigKey = `${projectName}:${configKey}`;
    const regex = new RegExp(String.raw `^\s*${fullConfigKey}:\s*(.+)$`, "m");
    const configMatch = regex.exec(content);
    if (!configMatch?.[1]) {
        throw new Error(`Configuration '${fullConfigKey}' not found in ${stackYamlPath}.\n` +
            `Please set it using: pulumi config set ${projectName}:${configKey} <value>`);
    }
    return configMatch[1].trim();
}
function generateConfigs() {
    const projectName = getProjectName();
    const domain = getStackConfig(projectName, "domain");
    const compatibilityDate = getCompatibilityDate();
    const workspaceRoot = path.resolve(process.cwd(), "..");
    const appsConfig = getAppsConfig(domain);
    for (const app of appsConfig) {
        const appDir = path.join(workspaceRoot, "apps", app.name);
        const wranglerPath = path.join(appDir, "wrangler.toml");
        const packageJsonPath = path.join(appDir, "package.json");
        generateWranglerToml({
            name: `${projectName}-${app.name}`,
            type: app.type,
            compatibilityDate,
            buildCommand: app.buildCommand,
            outputDir: app.outputDir,
            watchDirs: app.watchDirs,
            main: app.main,
            vars: app.vars,
        }, wranglerPath);
        updateDeployScript(packageJsonPath, app.type, projectName, app.name);
    }
}
generateConfigs();
//# sourceMappingURL=index.js.map