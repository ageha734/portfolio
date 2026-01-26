import * as fs from "node:fs";
import * as path from "node:path";
import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";
import { getProjectName } from "../config.js";
function generateRandomSuffix(resourceName) {
    return new random.RandomString(`${resourceName}-random-suffix`, {
        length: 6,
        special: false,
        upper: false,
        lower: true,
        numeric: true,
    });
}
function getScriptContent(worker) {
    if (worker.scriptContent) {
        return worker.scriptContent;
    }
    if (worker.scriptPath) {
        return fs.readFileSync(path.resolve(process.cwd(), worker.scriptPath), "utf-8");
    }
    throw new Error(`Worker ${worker.name}: either scriptPath or scriptContent must be provided`);
}
function buildVarBindings(vars) {
    const bindings = [];
    for (const [name, text] of Object.entries(vars)) {
        bindings.push({ name, text, type: "plain_text" });
    }
    return bindings;
}
function buildSecretBindings(secrets) {
    const bindings = [];
    for (const [name, text] of Object.entries(secrets)) {
        bindings.push({ name, text, type: "secret_text" });
    }
    return bindings;
}
function buildKvNamespaceBindings(kvNamespaces) {
    const bindings = [];
    for (const kv of kvNamespaces) {
        bindings.push({
            name: kv.name,
            namespaceId: kv.namespaceId,
            type: "kv_namespace",
        });
    }
    return bindings;
}
function buildR2BucketBindings(r2Buckets) {
    const bindings = [];
    for (const r2 of r2Buckets) {
        bindings.push({
            name: r2.name,
            bucketName: r2.bucketName,
            type: "r2_bucket",
        });
    }
    return bindings;
}
function buildD1DatabaseBindings(d1Databases) {
    const bindings = [];
    for (const d1 of d1Databases) {
        bindings.push({
            name: d1.name,
            id: d1.databaseId,
            type: "d1",
        });
    }
    return bindings;
}
function buildWorkerBindings(worker) {
    const bindings = [];
    if (!worker.bindings) {
        return bindings;
    }
    if (worker.bindings.vars) {
        bindings.push(...buildVarBindings(worker.bindings.vars));
    }
    if (worker.bindings.secrets) {
        bindings.push(...buildSecretBindings(worker.bindings.secrets));
    }
    if (worker.bindings.kvNamespaces) {
        bindings.push(...buildKvNamespaceBindings(worker.bindings.kvNamespaces));
    }
    if (worker.bindings.r2Buckets) {
        bindings.push(...buildR2BucketBindings(worker.bindings.r2Buckets));
    }
    if (worker.bindings.d1Databases) {
        bindings.push(...buildD1DatabaseBindings(worker.bindings.d1Databases));
    }
    return bindings;
}
function createWorkerScript(worker, accountId, resourceName, provider) {
    const content = getScriptContent(worker);
    const bindings = buildWorkerBindings(worker);
    return new cloudflare.WorkersScript(resourceName, {
        accountId,
        scriptName: worker.name,
        content,
        mainModule: "worker.js",
        compatibilityDate: worker.compatibilityDate || "2025-01-01",
        compatibilityFlags: worker.compatibilityFlags || ["nodejs_compat"],
        bindings: bindings.length > 0 ? bindings : undefined,
    }, {
        provider,
    });
}
function createWorkerRoutes(worker, workerScript, resourceName, zoneId, provider) {
    const routes = {};
    if (!worker.routes) {
        return routes;
    }
    for (let i = 0; i < worker.routes.length; i++) {
        const route = worker.routes[i];
        if (route) {
            const routeResourceName = `${resourceName}-route-${i}`;
            routes[routeResourceName] = new cloudflare.WorkersRoute(routeResourceName, {
                zoneId: route.zoneId || zoneId,
                pattern: route.pattern,
                script: workerScript.scriptName,
            }, {
                dependsOn: [workerScript],
                provider,
            });
        }
    }
    return routes;
}
function createWorkerDomain(worker, workerScript, resourceName, accountId, domain, zoneId, provider) {
    if (!worker.customDomain) {
        return null;
    }
    const domainResourceName = `${resourceName}-domain`;
    return new cloudflare.WorkersCustomDomain(domainResourceName, {
        accountId,
        hostname: `${worker.customDomain}.${domain}`,
        service: workerScript.scriptName,
        zoneId,
    }, {
        dependsOn: [workerScript],
        provider,
    });
}
export function createWorkers(config, workers, provider) {
    const { accountId, zoneId, domain } = config.cloudflare;
    const createdScripts = {};
    const createdRoutes = {};
    const createdDomains = {};
    const createdSubdomains = {};
    for (const worker of workers) {
        const resourceName = `worker-${worker.name}`;
        const workerScript = createWorkerScript(worker, accountId, resourceName, provider);
        createdScripts[resourceName] = workerScript;
        const subdomain = workerScript.scriptName.apply((name) => `${name}.workers.dev`);
        createdSubdomains[resourceName] = subdomain;
        const routes = createWorkerRoutes(worker, workerScript, resourceName, zoneId, provider);
        Object.assign(createdRoutes, routes);
        const workerDomain = createWorkerDomain(worker, workerScript, resourceName, accountId, domain, zoneId, provider);
        if (workerDomain) {
            createdDomains[`${resourceName}-domain`] = workerDomain;
        }
    }
    return {
        scripts: createdScripts,
        routes: createdRoutes,
        domains: createdDomains,
        subdomains: createdSubdomains,
    };
}
export function createPortfolioApiWorker(config, secrets, provider) {
    const projectName = getProjectName();
    const { accountId, zoneId, domain } = config.cloudflare;
    const resourceName = `worker-${projectName}-api`;
    const apiRandomSuffix = generateRandomSuffix(`${projectName}-api-random`);
    const workerScriptName = pulumi
        .all([projectName, apiRandomSuffix.result])
        .apply(([name, suffix]) => `${name}-api-${suffix}`);
    const staticBindings = [
        {
            name: "NODE_ENV",
            text: "production",
            type: "plain_text",
        },
    ];
    const secretBindings = [
        {
            name: "DATABASE_URL",
            text: secrets.databaseUrl,
            type: "secret_text",
        },
    ];
    if (secrets.redisUrl) {
        secretBindings.push({
            name: "REDIS_URL",
            text: secrets.redisUrl,
            type: "secret_text",
        });
    }
    const allBindings = [...staticBindings, ...secretBindings];
    const workerScript = new cloudflare.WorkersScript(resourceName, {
        accountId,
        scriptName: workerScriptName,
        content: `
export default {
  async fetch(request, env, ctx) {
    return new Response("Portfolio API - Deployed via CI/CD", {
      headers: { "content-type": "text/plain" },
    });
  },
};
`,
        mainModule: "worker.js",
        compatibilityDate: "2025-01-01",
        compatibilityFlags: ["nodejs_compat"],
        bindings: allBindings,
    }, {
        provider,
    });
    const createdScripts = {};
    createdScripts[resourceName] = workerScript;
    const createdRoutes = {};
    const createdDomains = {};
    const workerDomain = new cloudflare.WorkersCustomDomain(`${resourceName}-domain`, {
        accountId,
        hostname: `api.${domain}`,
        service: workerScript.scriptName,
        zoneId,
    }, {
        dependsOn: [workerScript],
        provider,
    });
    createdDomains[`${resourceName}-domain`] = workerDomain;
    const subdomain = workerScript.scriptName.apply((name) => `${name}.workers.dev`);
    const createdSubdomains = {};
    createdSubdomains[resourceName] = subdomain;
    return {
        scripts: createdScripts,
        routes: createdRoutes,
        domains: createdDomains,
        subdomains: createdSubdomains,
    };
}
//# sourceMappingURL=workers.js.map