import * as pulumi from "@pulumi/pulumi";
import * as doppler from "@pulumiverse/doppler";
const config = new pulumi.Config();
export function getDopplerSettings() {
    return {
        project: config.require("dopplerProject"),
        config: config.require("dopplerConfig"),
    };
}
export function getProjectName() {
    return config.require("dopplerProject");
}
export function getDopplerSecrets() {
    const settings = getDopplerSettings();
    const secrets = doppler.getSecretsOutput({
        project: settings.project,
        config: settings.config,
    });
    return {
        DATABASE_URL: secrets.apply((s) => {
            if (!s.map.DATABASE_URL)
                throw new Error("DATABASE_URL not found in Doppler");
            return s.map.DATABASE_URL;
        }),
        REDIS_URL: secrets.apply((s) => {
            if (!s.map.REDIS_URL)
                throw new Error("REDIS_URL not found in Doppler");
            return s.map.REDIS_URL;
        }),
        TIDB_HOST: secrets.apply((s) => {
            if (!s.map.TIDB_HOST)
                throw new Error("TIDB_HOST not found in Doppler");
            return s.map.TIDB_HOST;
        }),
        CLOUDFLARE_API_TOKEN: secrets.apply((s) => {
            if (!s.map.CLOUDFLARE_API_TOKEN)
                throw new Error("CLOUDFLARE_API_TOKEN not found in Doppler");
            return s.map.CLOUDFLARE_API_TOKEN;
        }),
        CLOUDFLARE_ACCOUNT_ID: secrets.apply((s) => {
            if (!s.map.CLOUDFLARE_ACCOUNT_ID)
                throw new Error("CLOUDFLARE_ACCOUNT_ID not found in Doppler");
            return s.map.CLOUDFLARE_ACCOUNT_ID;
        }),
        CLOUDFLARE_ZONE_ID: secrets.apply((s) => {
            if (!s.map.CLOUDFLARE_ZONE_ID)
                throw new Error("CLOUDFLARE_ZONE_ID not found in Doppler");
            return s.map.CLOUDFLARE_ZONE_ID;
        }),
        GRAFANA_API_KEY: secrets.apply((s) => {
            if (!s.map.GRAFANA_API_KEY)
                throw new Error("GRAFANA_API_KEY not found in Doppler");
            return s.map.GRAFANA_API_KEY;
        }),
        GRAFANA_ORG_SLUG: secrets.apply((s) => {
            if (!s.map.GRAFANA_ORG_SLUG)
                throw new Error("GRAFANA_ORG_SLUG not found in Doppler");
            return s.map.GRAFANA_ORG_SLUG;
        }),
        SENTRY_AUTH_TOKEN: secrets.apply((s) => {
            if (!s.map.SENTRY_AUTH_TOKEN)
                throw new Error("SENTRY_AUTH_TOKEN not found in Doppler");
            return s.map.SENTRY_AUTH_TOKEN;
        }),
        SENTRY_ORG: secrets.apply((s) => {
            if (!s.map.SENTRY_ORG)
                throw new Error("SENTRY_ORG not found in Doppler");
            return s.map.SENTRY_ORG;
        }),
        SENTRY_DSN: secrets.apply((s) => {
            if (!s.map.SENTRY_DSN)
                throw new Error("SENTRY_DSN not found in Doppler");
            return s.map.SENTRY_DSN;
        }),
        BETTER_AUTH_SECRET: secrets.apply((s) => {
            if (!s.map.BETTER_AUTH_SECRET)
                throw new Error("BETTER_AUTH_SECRET not found in Doppler");
            return s.map.BETTER_AUTH_SECRET;
        }),
        GOOGLE_CLIENT_ID: secrets.apply((s) => {
            if (!s.map.GOOGLE_CLIENT_ID)
                throw new Error("GOOGLE_CLIENT_ID not found in Doppler");
            return s.map.GOOGLE_CLIENT_ID;
        }),
        GOOGLE_CLIENT_SECRET: secrets.apply((s) => {
            if (!s.map.GOOGLE_CLIENT_SECRET)
                throw new Error("GOOGLE_CLIENT_SECRET not found in Doppler");
            return s.map.GOOGLE_CLIENT_SECRET;
        }),
    };
}
export function getConfig() {
    const environment = config.require("environment");
    const secrets = getDopplerSecrets();
    return {
        environment,
        cloudflare: {
            apiToken: secrets.CLOUDFLARE_API_TOKEN,
            accountId: secrets.CLOUDFLARE_ACCOUNT_ID,
            zoneId: secrets.CLOUDFLARE_ZONE_ID,
            domain: config.require("domain"),
        },
        grafana: {
            apiKey: secrets.GRAFANA_API_KEY,
            orgSlug: secrets.GRAFANA_ORG_SLUG,
            stackSlug: config.require("slug"),
        },
        sentry: {
            authToken: secrets.SENTRY_AUTH_TOKEN,
            org: secrets.SENTRY_ORG,
        },
    };
}
export function getTags(resourceName) {
    const environment = config.require("environment");
    return {
        Environment: environment,
        Project: config.require("dopplerProject"),
        ManagedBy: "pulumi",
        Resource: resourceName,
    };
}
//# sourceMappingURL=config.js.map