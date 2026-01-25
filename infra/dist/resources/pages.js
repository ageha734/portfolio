import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";
import { getProjectName } from "../config.js";
export function createPagesProjects(config, projects) {
    const { accountId, domain } = config.cloudflare;
    const createdProjects = {};
    const createdDomains = {};
    for (const project of projects) {
        const resourceName = `pages-${project.name}`;
        const pagesProject = new cloudflare.PagesProject(resourceName, {
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
                    environmentVariables: project.environmentVariables,
                    secrets: project.secrets,
                    compatibilityDate: project.compatibilityDate || "2025-01-01",
                    compatibilityFlags: ["nodejs_compat"],
                },
                preview: {
                    environmentVariables: {
                        ...project.environmentVariables,
                        NODE_ENV: "development",
                    },
                    secrets: project.secrets,
                    compatibilityDate: project.compatibilityDate || "2025-01-01",
                    compatibilityFlags: ["nodejs_compat"],
                },
            },
        });
        createdProjects[resourceName] = pagesProject;
        if (project.customDomain) {
            const domainResourceName = `pages-domain-${project.name}`;
            createdDomains[domainResourceName] = new cloudflare.PagesDomain(domainResourceName, {
                accountId,
                projectName: pagesProject.name,
                domain: `${project.customDomain}.${domain}`,
            }, {
                dependsOn: [pagesProject],
            });
        }
    }
    return {
        projects: createdProjects,
        domains: createdDomains,
    };
}
export function createPortfolioPagesProjects(config, _secrets) {
    const projectName = getProjectName();
    const projects = [
        {
            name: `${projectName}-web`,
            productionBranch: "master",
            buildCommand: "bun run build",
            destinationDir: "dist",
            rootDir: "apps/web",
            customDomain: "www",
            environmentVariables: {
                NODE_ENV: "production",
            },
        },
        {
            name: `${projectName}-admin`,
            productionBranch: "master",
            buildCommand: "bun run build",
            destinationDir: "dist",
            rootDir: "apps/admin",
            customDomain: "admin",
            environmentVariables: {
                NODE_ENV: "production",
            },
        },
        {
            name: `${projectName}-wiki`,
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
    return createPagesProjects(config, projects);
}
//# sourceMappingURL=pages.js.map