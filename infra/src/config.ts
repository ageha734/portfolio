import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
const cloudflareConfig = new pulumi.Config("cloudflare");

export interface InfraConfig {
	environment: string;
	cloudflare: {
		apiToken: pulumi.Output<string>;
		accountId: string;
		zoneId: string;
		domain: string;
	};
	tidb: {
		publicKey: pulumi.Output<string>;
		privateKey: pulumi.Output<string>;
		projectId: string;
		region: string;
	};
	redis: {
		apiKey: pulumi.Output<string>;
		secretKey: pulumi.Output<string>;
		subscriptionId?: string;
	};
	grafana: {
		apiKey: pulumi.Output<string>;
		orgSlug: string;
		stackSlug: string;
	};
	sentry: {
		authToken: pulumi.Output<string>;
		org: string;
	};
}

export function getConfig(): InfraConfig {
	const environment = config.require("environment");

	return {
		environment,
		cloudflare: {
			apiToken: cloudflareConfig.requireSecret("apiToken"),
			accountId: config.require("cloudflareAccountId"),
			zoneId: config.require("cloudflareZoneId"),
			domain: config.get("cloudflareDomain") || "ageha734.jp",
		},
		tidb: {
			publicKey: config.requireSecret("tidbPublicKey"),
			privateKey: config.requireSecret("tidbPrivateKey"),
			projectId: config.require("tidbProjectId"),
			region: config.get("tidbRegion") || "ap-northeast-1",
		},
		redis: {
			apiKey: config.requireSecret("redisApiKey"),
			secretKey: config.requireSecret("redisSecretKey"),
			subscriptionId: config.get("redisSubscriptionId"),
		},
		grafana: {
			apiKey: config.requireSecret("grafanaApiKey"),
			orgSlug: config.require("grafanaOrgSlug"),
			stackSlug: config.get("grafanaStackSlug") || "portfolio",
		},
		sentry: {
			authToken: config.requireSecret("sentryAuthToken"),
			org: config.require("sentryOrg"),
		},
	};
}

export function getTags(
	resourceName: string,
): Record<string, string> {
	const cfg = getConfig();
	return {
		Environment: cfg.environment,
		Project: "portfolio",
		ManagedBy: "pulumi",
		Resource: resourceName,
	};
}
