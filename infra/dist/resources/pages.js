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
function buildEnvVars(environmentVariables, secrets) {
    const envVars = {};
    let hasEnvVars = false;
    if (environmentVariables) {
        for (const [key, value] of Object.entries(environmentVariables)) {
            envVars[key] = { type: "plain_text", value };
            hasEnvVars = true;
        }
    }
    if (secrets) {
        for (const [key, value] of Object.entries(secrets)) {
            envVars[key] = { type: "secret_text", value };
            hasEnvVars = true;
        }
    }
    return hasEnvVars ? envVars : undefined;
}
export function createPagesProjects(config, projects, provider) {
    const { accountId, domain } = config.cloudflare;
    const createdProjects = {};
    const createdDomains = {};
    const createdSubdomains = {};
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        if (!project)
            continue;
        const resourceNameBase = `pages-project-${i}`;
        const productionEnvVars = buildEnvVars(project.environmentVariables, project.secrets);
        const previewEnvVars = buildEnvVars({ ...project.environmentVariables, NODE_ENV: "development" }, project.secrets);
        const productionServices = project.serviceBinding
            ? {
                API_SERVICE: {
                    service: project.serviceBinding.service,
                    entrypoint: project.serviceBinding.entrypoint,
                    environment: project.serviceBinding.environment || "production",
                },
            }
            : undefined;
        const previewServices = project.serviceBinding
            ? {
                API_SERVICE: {
                    service: project.serviceBinding.service,
                    entrypoint: project.serviceBinding.entrypoint,
                    environment: project.serviceBinding.environment || "production",
                },
            }
            : undefined;
        const pagesProject = new cloudflare.PagesProject(resourceNameBase, {
            accountId,
            name: project.name,
            productionBranch: project.productionBranch,
            buildConfig: {
                buildCommand: project.buildCommand,
                destinationDir: project.destinationDir || "dist",
                rootDir: project.rootDir,
            },
            deploymentConfigs: {
                production: {
                    envVars: productionEnvVars,
                    compatibilityDate: project.compatibilityDate || "2025-01-01",
                    compatibilityFlags: ["nodejs_compat"],
                    services: productionServices,
                },
                preview: {
                    envVars: previewEnvVars,
                    compatibilityDate: project.compatibilityDate || "2025-01-01",
                    compatibilityFlags: ["nodejs_compat"],
                    services: previewServices,
                },
            },
        }, {
            provider,
        });
        createdProjects[resourceNameBase] = pagesProject;
        const subdomain = pagesProject.name.apply((name) => `${name}.pages.dev`);
        const subdomainKey = project.customDomain || `project-${i}`;
        createdSubdomains[subdomainKey] = subdomain;
        if (project.customDomain) {
            const customDomainValue = project.customDomain;
            const domainResourceName = `${resourceNameBase}-domain`;
            createdDomains[domainResourceName] = new cloudflare.PagesDomain(domainResourceName, {
                accountId,
                projectName: pagesProject.name,
                name: `${customDomainValue}.${domain}`,
            }, {
                dependsOn: [pagesProject],
                provider,
                deleteBeforeReplace: true,
            });
        }
    }
    return {
        projects: createdProjects,
        domains: createdDomains,
        subdomains: createdSubdomains,
    };
}
export function createPortfolioPagesProjects(config, _secrets, provider, apiWorkerScriptName) {
    const projectName = getProjectName();
    const webRandomSuffix = generateRandomSuffix(`${projectName}-web-random`);
    const adminRandomSuffix = generateRandomSuffix(`${projectName}-admin-random`);
    const wikiRandomSuffix = generateRandomSuffix(`${projectName}-wiki-random`);
    const projects = [
        {
            name: pulumi.all([projectName, webRandomSuffix.result]).apply(([name, suffix]) => `${name}-web-${suffix}`),
            productionBranch: "master",
            buildCommand: "bun run build",
            destinationDir: "dist",
            rootDir: "apps/web",
            customDomain: "www",
            environmentVariables: {
                NODE_ENV: "production",
            },
            serviceBinding: apiWorkerScriptName
                ? {
                    service: apiWorkerScriptName,
                    environment: "production",
                }
                : undefined,
        },
        {
            name: pulumi
                .all([projectName, adminRandomSuffix.result])
                .apply(([name, suffix]) => `${name}-admin-${suffix}`),
            productionBranch: "master",
            buildCommand: "bun run build",
            destinationDir: "dist",
            rootDir: "apps/admin",
            customDomain: "admin",
            environmentVariables: {
                NODE_ENV: "production",
            },
            serviceBinding: apiWorkerScriptName
                ? {
                    service: apiWorkerScriptName,
                    environment: "production",
                }
                : undefined,
        },
        {
            name: pulumi
                .all([projectName, wikiRandomSuffix.result])
                .apply(([name, suffix]) => `${name}-wiki-${suffix}`),
            productionBranch: "master",
            buildCommand: "bun run build",
            destinationDir: "dist",
            rootDir: "apps/wiki",
            customDomain: "wiki",
            environmentVariables: {
                NODE_ENV: "production",
            },
        },
    ];
    return createPagesProjects(config, projects, provider);
}
//# sourceMappingURL=pages.js.map