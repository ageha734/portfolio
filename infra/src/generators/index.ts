import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import { updateDeployScript } from "./packageScripts.js";
import { generateWranglerToml, getCompatibilityDate } from "./wrangler.js";

interface AppConfig {
    name: string;
    type: "pages" | "worker";
    buildCommand?: string;
    outputDir?: string;
    watchDirs?: string[];
    main?: string;
    vars?: Record<string, string | boolean | number>;
}

interface PulumiProjectNames {
    pagesProjectNames: Record<string, string>;
    workerScriptNames: Record<string, string>;
}

function getAppsConfig(domain: string): AppConfig[] {
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

const PULUMI_PROJECT_NAME = "portfolio-infra";

function getStackConfig(configKey: string): string {
    const stackYamlPath = path.join(process.cwd(), "Pulumi.rc.yaml");

    if (!fs.existsSync(stackYamlPath)) {
        throw new Error(`Pulumi stack config not found at ${stackYamlPath}`);
    }

    const content = fs.readFileSync(stackYamlPath, "utf-8");
    const fullConfigKey = `${PULUMI_PROJECT_NAME}:${configKey}`;
    const regex = new RegExp(String.raw`^\s*${fullConfigKey}:\s*(.+)$`, "m");
    const configMatch = regex.exec(content);

    if (!configMatch?.[1]) {
        throw new Error(
            `Configuration '${fullConfigKey}' not found in ${stackYamlPath}.\n` +
                `Please set it using: pulumi config set ${PULUMI_PROJECT_NAME}:${configKey} <value>`,
        );
    }

    return configMatch[1].trim();
}

function getPulumiOutputs(): PulumiProjectNames {
    const pagesOutput = execSync("pulumi stack output pagesProjectNames --json", {
        encoding: "utf-8",
        cwd: process.cwd(),
    });
    const workerOutput = execSync("pulumi stack output workerScriptNames --json", {
        encoding: "utf-8",
        cwd: process.cwd(),
    });

    return {
        pagesProjectNames: JSON.parse(pagesOutput),
        workerScriptNames: JSON.parse(workerOutput),
    };
}

function getProjectNameFromPulumi(
    appName: string,
    appType: "pages" | "worker",
    pulumiOutputs: PulumiProjectNames,
): string {
    if (appType === "worker") {
        const workerKey = Object.keys(pulumiOutputs.workerScriptNames).find((key) =>
            key.includes(appName),
        );
        if (workerKey) {
            const workerName = pulumiOutputs.workerScriptNames[workerKey];
            if (workerName) {
                return workerName;
            }
        }
    } else {
        const appIndexMap: Record<string, string> = {
            web: "pages-project-0",
            admin: "pages-project-1",
            wiki: "pages-project-2",
        };
        const pagesKey = appIndexMap[appName];
        if (pagesKey) {
            const pagesName = pulumiOutputs.pagesProjectNames[pagesKey];
            if (pagesName) {
                return pagesName;
            }
        }
    }

    throw new Error(`Project name not found in Pulumi outputs for app: ${appName}`);
}

function generateConfigs(): void {
    const domain = getStackConfig("domain");
    const compatibilityDate = getCompatibilityDate();
    const workspaceRoot = path.resolve(process.cwd(), "..");
    const pulumiOutputs = getPulumiOutputs();

    const appsConfig = getAppsConfig(domain);

    for (const app of appsConfig) {
        const appDir = path.join(workspaceRoot, "apps", app.name);
        const wranglerPath = path.join(appDir, "wrangler.toml");
        const packageJsonPath = path.join(appDir, "package.json");

        const projectName = getProjectNameFromPulumi(app.name, app.type, pulumiOutputs);

        generateWranglerToml(
            {
                name: projectName,
                type: app.type,
                compatibilityDate,
                buildCommand: app.buildCommand,
                outputDir: app.outputDir,
                watchDirs: app.watchDirs,
                main: app.main,
                vars: app.vars,
            },
            wranglerPath,
        );

        updateDeployScript(packageJsonPath, app.type, projectName);
    }
}

generateConfigs();
