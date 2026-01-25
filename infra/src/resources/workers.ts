import * as fs from "node:fs";
import * as path from "node:path";
import * as pulumi from "@pulumi/pulumi";
import * as cloudflare from "@pulumi/cloudflare";
import type { InfraConfig } from "../config.js";
import { getProjectName } from "../config.js";

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

interface WorkerBindings {
	plainTextBindings?: cloudflare.types.input.WorkersScriptPlainTextBinding[];
	secretTextBindings?: cloudflare.types.input.WorkersScriptSecretTextBinding[];
	kvNamespaceBindings?: cloudflare.types.input.WorkersScriptKvNamespaceBinding[];
	r2BucketBindings?: cloudflare.types.input.WorkersScriptR2BucketBinding[];
	d1DatabaseBindings?: cloudflare.types.input.WorkersScriptD1DatabaseBinding[];
}

function getScriptContent(worker: WorkerConfig): string {
	if (worker.scriptContent) {
		return worker.scriptContent;
	}
	if (worker.scriptPath) {
		return fs.readFileSync(
			path.resolve(process.cwd(), worker.scriptPath),
			"utf-8",
		);
	}
	throw new Error(
		`Worker ${worker.name}: either scriptPath or scriptContent must be provided`,
	);
}

function buildWorkerBindings(worker: WorkerConfig): WorkerBindings {
	const bindings: WorkerBindings = {};

	if (!worker.bindings) {
		return bindings;
	}

	if (worker.bindings.vars) {
		bindings.plainTextBindings = Object.entries(worker.bindings.vars).map(
			([name, text]) => ({ name, text }),
		);
	}

	if (worker.bindings.secrets) {
		bindings.secretTextBindings = Object.entries(worker.bindings.secrets).map(
			([name, text]) => ({ name, text }),
		);
	}

	if (worker.bindings.kvNamespaces) {
		bindings.kvNamespaceBindings = worker.bindings.kvNamespaces.map((kv) => ({
			name: kv.name,
			namespaceId: kv.namespaceId,
		}));
	}

	if (worker.bindings.r2Buckets) {
		bindings.r2BucketBindings = worker.bindings.r2Buckets.map((r2) => ({
			name: r2.name,
			bucketName: r2.bucketName,
		}));
	}

	if (worker.bindings.d1Databases) {
		bindings.d1DatabaseBindings = worker.bindings.d1Databases.map((d1) => ({
			name: d1.name,
			databaseId: d1.databaseId,
		}));
	}

	return bindings;
}

function createWorkerScript(
	worker: WorkerConfig,
	accountId: pulumi.Input<string>,
	resourceName: string,
): cloudflare.WorkersScript {
	const content = getScriptContent(worker);
	const bindings = buildWorkerBindings(worker);

	return new cloudflare.WorkersScript(resourceName, {
		accountId,
		name: worker.name,
		content,
		module: true,
		compatibilityDate: worker.compatibilityDate || "2025-01-01",
		compatibilityFlags: worker.compatibilityFlags || ["nodejs_compat"],
		...bindings,
	});
}

function createWorkerRoutes(
	worker: WorkerConfig,
	workerScript: cloudflare.WorkersScript,
	resourceName: string,
	zoneId: pulumi.Input<string>,
): Record<string, cloudflare.WorkersRoute> {
	const routes: Record<string, cloudflare.WorkersRoute> = {};

	if (!worker.routes) {
		return routes;
	}

	for (let i = 0; i < worker.routes.length; i++) {
		const route = worker.routes[i];
		if (route) {
			const routeResourceName = `${resourceName}-route-${i}`;
			routes[routeResourceName] = new cloudflare.WorkersRoute(
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

	return routes;
}

function createWorkerDomain(
	worker: WorkerConfig,
	workerScript: cloudflare.WorkersScript,
	resourceName: string,
	accountId: pulumi.Input<string>,
	domain: string,
	zoneId: pulumi.Input<string>,
): cloudflare.WorkersDomain | null {
	if (!worker.customDomain) {
		return null;
	}

	const domainResourceName = `${resourceName}-domain`;
	return new cloudflare.WorkersDomain(
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

		const workerScript = createWorkerScript(worker, accountId, resourceName);
		createdScripts[resourceName] = workerScript;

		const routes = createWorkerRoutes(worker, workerScript, resourceName, zoneId);
		Object.assign(createdRoutes, routes);

		const workerDomain = createWorkerDomain(
			worker,
			workerScript,
			resourceName,
			accountId,
			domain,
			zoneId,
		);
		if (workerDomain) {
			createdDomains[`${resourceName}-domain`] = workerDomain;
		}
	}

	return {
		scripts: createdScripts,
		routes: createdRoutes,
		domains: createdDomains,
	};
}

export function createPortfolioApiWorker(
	config: InfraConfig,
	secrets: {
		databaseUrl: pulumi.Output<string>;
		redisUrl?: pulumi.Output<string>;
	},
): WorkersOutputs {
	const projectName = getProjectName();
	const workers: WorkerConfig[] = [
		{
			name: `${projectName}-api`,
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
