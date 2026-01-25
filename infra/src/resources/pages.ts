import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";
import type { InfraConfig } from "../config.js";
import { getProjectName } from "../config.js";

export interface PagesProjectConfig {
	name: string;
	productionBranch: string;
	buildCommand?: string;
	destinationDir?: string;
	rootDir?: string;
	environmentVariables?: Record<string, string>;
	secrets?: Record<string, pulumi.Output<string>>;
	compatibilityDate?: string;
	customDomain?: string;
}

export interface PagesOutputs {
	projects: Record<string, cloudflare.PagesProject>;
	domains: Record<string, cloudflare.PagesDomain>;
}

export function createPagesProjects(
	config: InfraConfig,
	projects: PagesProjectConfig[],
): PagesOutputs {
	const { accountId, domain } = config.cloudflare;
	const createdProjects: Record<string, cloudflare.PagesProject> = {};
	const createdDomains: Record<string, cloudflare.PagesDomain> = {};

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
			createdDomains[domainResourceName] = new cloudflare.PagesDomain(
				domainResourceName,
				{
					accountId,
					projectName: pagesProject.name,
					domain: `${project.customDomain}.${domain}`,
				},
				{
					dependsOn: [pagesProject],
				},
			);
		}
	}

	return {
		projects: createdProjects,
		domains: createdDomains,
	};
}

export function createPortfolioPagesProjects(
	config: InfraConfig,
	_secrets: {
		databaseUrl: pulumi.Output<string>;
		redisUrl?: pulumi.Output<string>;
	},
): PagesOutputs {
	const projectName = getProjectName();
	const projects: PagesProjectConfig[] = [
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
