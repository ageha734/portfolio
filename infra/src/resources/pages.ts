import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";
import type { InfraConfig } from "../config";

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

/**
 * Create Cloudflare Pages projects
 */
export function createPagesProjects(
	config: InfraConfig,
	projects: PagesProjectConfig[],
): PagesOutputs {
	const { accountId, zoneId, domain } = config.cloudflare;
	const createdProjects: Record<string, cloudflare.PagesProject> = {};
	const createdDomains: Record<string, cloudflare.PagesDomain> = {};

	for (const project of projects) {
		const resourceName = `pages-${project.name}`;

		// Create Pages project
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

		// Create custom domain if specified
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

/**
 * Portfolio Pages projects configuration
 */
export function createPortfolioPagesProjects(
	config: InfraConfig,
	secrets: {
		databaseUrl: pulumi.Output<string>;
		redisUrl?: pulumi.Output<string>;
	},
): PagesOutputs {
	const projects: PagesProjectConfig[] = [
		{
			name: "portfolio-web",
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
			name: "portfolio-admin",
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
			name: "portfolio-wiki",
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
