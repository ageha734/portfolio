import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import * as pulumi from "@pulumi/pulumi";
import * as doppler from "@pulumiverse/doppler";
import { getProjectName } from "../config.js";
export function getDopplerSecrets(dopplerConfig) {
    const secretKeys = [
        "DATABASE_URL",
        "REDIS_URL",
        "CLOUDFLARE_API_TOKEN",
        "CLOUDFLARE_ACCOUNT_ID",
        "CLOUDFLARE_ZONE_ID",
        "GRAFANA_API_KEY",
        "GRAFANA_ORG_SLUG",
        "SENTRY_AUTH_TOKEN",
        "SENTRY_ORG",
        "SENTRY_DSN",
        "REDISCLOUD_ACCESS_KEY",
        "REDISCLOUD_SECRET_KEY",
        "REDISCLOUD_SUBSCRIPTION_ID",
        "REDISCLOUD_DATABASE_ID",
        "BETTER_AUTH_SECRET",
        "GOOGLE_CLIENT_ID",
        "GOOGLE_CLIENT_SECRET",
        "TIDBCLOUD_PUBLIC_KEY",
        "TIDBCLOUD_PRIVATE_KEY",
    ];
    const secrets = {};
    const syncedSecrets = {};
    const dopplerSecrets = doppler.getSecretsOutput({
        project: dopplerConfig.project,
        config: dopplerConfig.config,
    });
    for (const key of secretKeys) {
        secrets[key] = dopplerSecrets.apply((s) => s.map[key] || "");
    }
    return {
        secrets: secrets,
        syncedSecrets,
    };
}
export function getDopplerSecret(project, config, secretName) {
    const secrets = doppler.getSecretsOutput({
        project,
        config,
    });
    return secrets.apply((s) => s.map[secretName] || "");
}
export function getCloudflareEnvVars(secrets) {
    return {
        DATABASE_URL: secrets.DATABASE_URL,
        REDIS_URL: secrets.REDIS_URL,
        NODE_ENV: pulumi.output("production"),
        SENTRY_DSN: secrets.SENTRY_DSN,
        BETTER_AUTH_SECRET: secrets.BETTER_AUTH_SECRET,
        GOOGLE_CLIENT_ID: secrets.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: secrets.GOOGLE_CLIENT_SECRET,
    };
}
export const DOPPLER_CLI_COMMANDS = {
    downloadEnv: "doppler secrets download --no-file --format env > .env",
    runDev: "doppler run -- bun run dev",
    runWithConfig: (project, config, command) => `doppler run --project ${project} --config ${config} -- ${command}`,
};
export function createPortfolioDopplerConfig(environment) {
    const projectName = getProjectName();
    return {
        project: projectName,
        config: environment,
    };
}
export function getDopplerProjectStructure() {
    const projectName = getProjectName();
    return {
        project: projectName,
        configs: {
            rc: "開発環境",
            stg: "検証環境",
            prd: "本番環境",
        },
        secrets: [
            { name: "DATABASE_URL", description: "TiDB Cloud接続文字列" },
            { name: "REDIS_URL", description: "Redis Cloud接続文字列" },
            { name: "CLOUDFLARE_API_TOKEN", description: "Cloudflare APIトークン" },
            { name: "CLOUDFLARE_ACCOUNT_ID", description: "CloudflareアカウントID" },
            { name: "CLOUDFLARE_ZONE_ID", description: "CloudflareゾーンID" },
            { name: "REDISCLOUD_SUBSCRIPTION_ID", description: "Redis CloudサブスクリプションID（.envで管理）" },
            { name: "REDISCLOUD_DATABASE_ID", description: "Redis CloudデータベースID（.envで管理）" },
            { name: "GRAFANA_API_KEY", description: "Grafana Cloud APIキー" },
            { name: "GRAFANA_ORG_SLUG", description: "Grafana Cloud組織スラッグ" },
            { name: "SENTRY_AUTH_TOKEN", description: "Sentry認証トークン" },
            { name: "SENTRY_ORG", description: "Sentry組織スラッグ" },
            { name: "SENTRY_DSN", description: "Sentry DSN" },
            { name: "REDISCLOUD_ACCESS_KEY", description: "Redis Cloud Access Key" },
            { name: "REDISCLOUD_SECRET_KEY", description: "Redis Cloud Secret Key" },
            { name: "BETTER_AUTH_SECRET", description: "Better Auth シークレット" },
            { name: "GOOGLE_CLIENT_ID", description: "Google OAuth クライアントID" },
            { name: "GOOGLE_CLIENT_SECRET", description: "Google OAuth クライアントシークレット" },
            { name: "API_BASE_URL", description: "APIベースURL（DNS登録後に自動設定）" },
            { name: "APP_VERSION", description: "アプリケーションのバージョン" },
            { name: "BETTER_AUTH_URL", description: "Better Auth URL（DNS登録後に自動設定）" },
            { name: "VITE_BASE_URL", description: "ViteベースURL（DNS登録後に自動設定）" },
            { name: "VITE_GOOGLE_ANALYTICS_ENABLED", description: "Google Analytics有効化フラグ" },
            { name: "VITE_GOOGLE_TAG_MANAGER_ENABLED", description: "Google Tag Manager有効化フラグ" },
            { name: "VITE_SENTRY_DSN", description: "Vite用Sentry DSN" },
            { name: "VITE_SENTRY_ENVIRONMENT", description: "Vite用Sentry環境" },
            { name: "VITE_SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE", description: "Vite用Sentry Replay On Errorサンプルレート" },
            { name: "VITE_SENTRY_REPLAY_SAMPLE_RATE", description: "Vite用Sentry Replayサンプルレート" },
            { name: "VITE_SENTRY_TRACES_SAMPLE_RATE", description: "Vite用Sentry Tracesサンプルレート" },
            { name: "VITE_XSTATE_INSPECTOR_ENABLED", description: "XState Inspector有効化フラグ" },
        ],
    };
}
export const DOPPLER_PROJECT_STRUCTURE = getDopplerProjectStructure();
export function getSecretsFromCreatedResources(dopplerProjectResources, configName) {
    if (!dopplerProjectResources.secrets) {
        return {};
    }
    const secrets = {};
    for (const [key, secret] of Object.entries(dopplerProjectResources.secrets)) {
        if (key.startsWith(`${configName}-`)) {
            const secretName = key.replace(`${configName}-`, "");
            secrets[secretName] = secret.value;
        }
    }
    return secrets;
}
function findProjectRoot() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    let currentDir = path.resolve(__dirname);
    const root = path.resolve("/");
    while (currentDir !== root) {
        const packageJsonPath = path.join(currentDir, "package.json");
        const turboJsonPath = path.join(currentDir, "turbo.json");
        if (fs.existsSync(packageJsonPath) && fs.existsSync(turboJsonPath)) {
            return currentDir;
        }
        currentDir = path.resolve(currentDir, "..");
    }
    const fallbackRoot = path.resolve(__dirname, "../../../..");
    return fallbackRoot;
}
export function parseEnvFile(envFilePath) {
    const projectRoot = findProjectRoot();
    const defaultEnvPath = path.join(projectRoot, ".env");
    const filePath = envFilePath ?? defaultEnvPath;
    if (!fs.existsSync(filePath)) {
        return {};
    }
    const envContent = fs.readFileSync(filePath, "utf-8");
    const envVars = {};
    const lines = envContent.split("\n");
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine.startsWith("#")) {
            continue;
        }
        const equalIndex = trimmedLine.indexOf("=");
        if (equalIndex === -1) {
            continue;
        }
        const key = trimmedLine.slice(0, equalIndex).trim();
        let value = trimmedLine.slice(equalIndex + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        envVars[key] = value;
    }
    return envVars;
}
export function extractSecretsFromEnv(envVars, requiredKeys) {
    const secrets = {};
    const urlVariableKeys = new Set(["API_BASE_URL", "BETTER_AUTH_URL", "VITE_BASE_URL"]);
    for (const key of requiredKeys) {
        if (envVars[key] !== undefined && envVars[key] !== "") {
            const value = envVars[key];
            if (urlVariableKeys.has(key) && value.toLowerCase().includes("localhost")) {
                continue;
            }
            secrets[key] = value;
        }
    }
    return secrets;
}
export function createDopplerSecrets(projectName, configName, secrets) {
    const dopplerSecrets = {};
    for (const [key, value] of Object.entries(secrets)) {
        if (!value || value.trim() === "") {
            continue;
        }
        dopplerSecrets[key] = new doppler.Secret(`doppler-secret-${configName}-${key.toLowerCase()}`, {
            project: projectName,
            config: configName,
            name: key,
            value: value,
        });
    }
    return dopplerSecrets;
}
export function createDopplerSecretsOnly(projectName, envFilePath) {
    const actualProjectName = projectName || getProjectName();
    const envVars = parseEnvFile(envFilePath);
    const requiredKeys = DOPPLER_PROJECT_STRUCTURE.secrets.map((s) => s.name);
    const secretsMap = extractSecretsFromEnv(envVars, requiredKeys);
    validateNoLocalhost(secretsMap);
    const allSecrets = {};
    const environments = ["rc", "stg", "prd"];
    if (Object.keys(secretsMap).length > 0) {
        for (const envKey of environments) {
            const envSecrets = createDopplerSecrets(actualProjectName, envKey, secretsMap);
            for (const [secretKey, secret] of Object.entries(envSecrets)) {
                const uniqueKey = `${envKey}-${secretKey}`;
                allSecrets[uniqueKey] = secret;
            }
        }
    }
    return allSecrets;
}
function validateNoLocalhost(secrets) {
    const localhostKeys = [];
    for (const [key, value] of Object.entries(secrets)) {
        if (value?.toLowerCase().includes("localhost")) {
            localhostKeys.push(key);
        }
    }
    if (localhostKeys.length > 0) {
        throw new Error(`以下のシークレットにlocalhostが含まれています。本番環境では使用できません: ${localhostKeys.join(", ")}`);
    }
}
export function createDopplerProject(projectName, description, envFilePath) {
    const actualProjectName = projectName || getProjectName();
    const actualDescription = description || `${actualProjectName} infrastructure project`;
    const project = new doppler.Project(`${actualProjectName}-doppler-project`, {
        name: actualProjectName,
        description: actualDescription,
    });
    const environments = {
        rc: new doppler.Environment(`${actualProjectName}-doppler-env-rc`, {
            project: project.name,
            slug: "rc",
            name: "開発環境",
        }),
        stg: new doppler.Environment(`${actualProjectName}-doppler-env-stg`, {
            project: project.name,
            slug: "stg",
            name: "検証環境",
        }),
        prd: new doppler.Environment(`${actualProjectName}-doppler-env-prd`, {
            project: project.name,
            slug: "prd",
            name: "本番環境",
        }),
    };
    const envVars = parseEnvFile(envFilePath);
    const requiredKeys = DOPPLER_PROJECT_STRUCTURE.secrets.map((s) => s.name);
    const secretsMap = extractSecretsFromEnv(envVars, requiredKeys);
    validateNoLocalhost(secretsMap);
    const allSecrets = {};
    if (Object.keys(secretsMap).length > 0) {
        for (const envKey of Object.keys(environments)) {
            const envSecrets = createDopplerSecrets(actualProjectName, envKey, secretsMap);
            for (const [secretKey, secret] of Object.entries(envSecrets)) {
                const uniqueKey = `${envKey}-${secretKey}`;
                allSecrets[uniqueKey] = secret;
            }
        }
    }
    return {
        project,
        environments,
        secrets: allSecrets,
    };
}
//# sourceMappingURL=secrets.js.map