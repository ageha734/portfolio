import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";
import * as fs from "node:fs";
import * as path from "node:path";
import type { InfraConfig } from "../config";

export interface WorkerConfig {
	name: string;
	scriptPath?: string;
	scriptContent?: string;
	compatibilityDate?: string;
	compatibilityFlags?: string[];
	bindings?: {
		vars?: Record<string, string>;
		secrets?: Record<string, pulumi.Output<string>>;
		kvNamespaces?: Array<{ name: string; namespaceId: string }>;
		r2Buckets?: Array<{ name: string; bucketName: string }>;
		d1Databases?: Array<{ name: string; databaseId: string }>;
	};
	routes?: Array<{
		pattern: string;
		zoneId?: string;
	}>;
	customDomain?: string;
}

export interface WorkersOutputs {
	scripts: Record<string, cloudflare.WorkersScript>;
	routes: Record<string, cloudflare.WorkersRoute>;
	domains: Record<string, cloudflare.WorkersDomain>;
}

/**
 * Create Cloudflare Workers
 */
export function createWorkers(
	config: InfraConfig,
	workers: WorkerConfig[],
): WorkersOutputs {
	const { accountId, zoneId, domain } = config.cloudflare;
	const createdScripts: Record<string, cloudflare.WorkersScript> = {};
	const createdRoutes: Record<string, cloudflare.WorkersRoute> = {};
	const createdDomains: Record<string, cloudflare.WorkersDomain> = {};

	for (const worker of workers) {
		const resourceName = `worker-${worker.name}`;

		// Get script content
		let content: string;
		if (worker.scriptContent) {
			content = worker.scriptContent;
		} else if (worker.scriptPath) {
			content = fs.readFileSync(
				path.resolve(process.cwd(), worker.scriptPath),
				"utf-8",
			);
		} else {
			throw new Error(
				`Worker ${worker.name}: either scriptPath or scriptContent must be provided`,
			);
		}

		// Build bindings
		const plainTextBindings: cloudflare.types.input.WorkersScriptPlainTextBinding[] =
			[];
		const secretTextBindings: cloudflare.types.input.WorkersScriptSecretTextBinding[] =
			[];
		const kvNamespaceBindings: cloudflare.types.input.WorkersScriptKvNamespaceBinding[] =
			[];
		const r2BucketBindings: cloudflare.types.input.WorkersScriptR2BucketBinding[] =
			[];
		const d1DatabaseBindings: cloudflare.types.input.WorkersScriptD1DatabaseBinding[] =
			[];

		if (worker.bindings) {
			// Plain text variables
			if (worker.bindings.vars) {
				for (const [name, text] of Object.entries(worker.bindings.vars)) {
					plainTextBindings.push({ name, text });
				}
			}

			// Secret variables
			if (worker.bindings.secrets) {
				for (const [name, text] of Object.entries(worker.bindings.secrets)) {
					secretTextBindings.push({ name, text });
				}
			}

			// KV Namespaces
			if (worker.bindings.kvNamespaces) {
				for (const kv of worker.bindings.kvNamespaces) {
					kvNamespaceBindings.push({
						name: kv.name,
						namespaceId: kv.namespaceId,
					});
				}
			}

			// R2 Buckets
			if (worker.bindings.r2Buckets) {
				for (const r2 of worker.bindings.r2Buckets) {
					r2BucketBindings.push({
						name: r2.name,
						bucketName: r2.bucketName,
					});
				}
			}

			// D1 Databases
			if (worker.bindings.d1Databases) {
				for (const d1 of worker.bindings.d1Databases) {
					d1DatabaseBindings.push({
						name: d1.name,
						databaseId: d1.databaseId,
					});
				}
			}
		}

		// Create Worker script
		const workerScript = new cloudflare.WorkersScript(resourceName, {
			accountId,
			name: worker.name,
			content,
			module: true,
			compatibilityDate: worker.compatibilityDate || "2025-01-01",
			compatibilityFlags: worker.compatibilityFlags || ["nodejs_compat"],
			plainTextBindings:
				plainTextBindings.length > 0 ? plainTextBindings : undefined,
			secretTextBindings:
				secretTextBindings.length > 0 ? secretTextBindings : undefined,
			kvNamespaceBindings:
				kvNamespaceBindings.length > 0 ? kvNamespaceBindings : undefined,
			r2BucketBindings:
				r2BucketBindings.length > 0 ? r2BucketBindings : undefined,
			d1DatabaseBindings:
				d1DatabaseBindings.length > 0 ? d1DatabaseBindings : undefined,
		});

		createdScripts[resourceName] = workerScript;

		// Create routes
		if (worker.routes) {
			for (let i = 0; i < worker.routes.length; i++) {
				const route = worker.routes[i];
				if (route) {
					const routeResourceName = `${resourceName}-route-${i}`;
					createdRoutes[routeResourceName] = new cloudflare.WorkersRoute(
						routeResourceName,
						{
							zoneId: route.zoneId || zoneId,
							pattern: route.pattern,
							scriptName: workerScript.name,
						},
						{
							dependsOn: [workerScript],
						},
					);
				}
			}
		}

		// Create custom domain
		if (worker.customDomain) {
			const domainResourceName = `${resourceName}-domain`;
			createdDomains[domainResourceName] = new cloudflare.WorkersDomain(
				domainResourceName,
				{
					accountId,
					hostname: `${worker.customDomain}.${domain}`,
					service: workerScript.name,
					zoneId,
				},
				{
					dependsOn: [workerScript],
				},
			);
		}
	}

	return {
		scripts: createdScripts,
		routes: createdRoutes,
		domains: createdDomains,
	};
}

/**
 * Portfolio API Worker configuration
 */
export function createPortfolioApiWorker(
	config: InfraConfig,
	secrets: {
		databaseUrl: pulumi.Output<string>;
		redisUrl?: pulumi.Output<string>;
	},
): WorkersOutputs {
	const workers: WorkerConfig[] = [
		{
			name: "portfolio-api",
			// Script will be deployed via wrangler in CI/CD
			// This is just for infrastructure management
			scriptContent: `
export default {
  async fetch(request, env, ctx) {
    return new Response("Portfolio API - Deployed via CI/CD", {
      headers: { "content-type": "text/plain" },
    });
  },
};
`,
			customDomain: "api",
			bindings: {
				vars: {
					NODE_ENV: "production",
				},
				secrets: {
					DATABASE_URL: secrets.databaseUrl,
					...(secrets.redisUrl && { REDIS_URL: secrets.redisUrl }),
				},
			},
		},
	];

	return createWorkers(config, workers);
}
