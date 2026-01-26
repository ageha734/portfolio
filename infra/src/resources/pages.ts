import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";
import type { InfraConfig } from "../config.js";
import { getProjectName } from "../config.js";

type EnvVarConfig = cloudflare.types.input.PagesProjectDeploymentConfigsProductionEnvVars;

export interface ServiceBindingConfig {
    service: pulumi.Input<string>;
    entrypoint?: string;
    environment?: string;
}

export type ServiceBindingConfigOutput = pulumi.Output<ServiceBindingConfig | undefined>;

export interface PagesProjectConfig {
    name: pulumi.Input<string>;
    productionBranch: string;
    buildCommand?: string;
    destinationDir?: string;
    rootDir?: string;
    environmentVariables?: Record<string, string>;
    secrets?: Record<string, pulumi.Output<string>>;
    compatibilityDate?: string;
    customDomain?: string;
    serviceBinding?: ServiceBindingConfig | ServiceBindingConfigOutput;
}

export interface PagesOutputs {
    projects: Record<string, cloudflare.PagesProject>;
    domains: Record<string, cloudflare.PagesDomain>;
    subdomains: Record<string, pulumi.Output<string>>;
}

function generateRandomSuffix(resourceName: string): random.RandomString {
    return new random.RandomString(`${resourceName}-random-suffix`, {
        length: 6,
        special: false,
        upper: false,
        lower: true,
        numeric: true,
    });
}

function buildEnvVars(
    environmentVariables?: Record<string, string>,
    secrets?: Record<string, pulumi.Output<string>>,
): Record<string, pulumi.Input<EnvVarConfig>> | undefined {
    const envVars: Record<string, pulumi.Input<EnvVarConfig>> = {};
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

export function createPagesProjects(
    config: InfraConfig,
    projects: PagesProjectConfig[],
    provider?: cloudflare.Provider,
): PagesOutputs {
    const { accountId, domain } = config.cloudflare;
    const createdProjects: Record<string, cloudflare.PagesProject> = {};
    const createdDomains: Record<string, cloudflare.PagesDomain> = {};
    const createdSubdomains: Record<string, pulumi.Output<string>> = {};

    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        if (!project) continue;

        const resourceNameBase = `pages-project-${i}`;

        const productionEnvVars = buildEnvVars(project.environmentVariables, project.secrets);
        const previewEnvVars = buildEnvVars(
            { ...project.environmentVariables, NODE_ENV: "development" },
            project.secrets,
        );

        const productionServices = project.serviceBinding
            ? pulumi.output(project.serviceBinding).apply((binding) => {
                  if (!binding) {
                      return null;
                  }
                  const service = "service" in binding ? binding.service : undefined;
                  if (!service) {
                      return null;
                  }
                  return pulumi.output(service).apply((serviceName) => {
                      if (!serviceName || serviceName.trim() === "") {
                          return null;
                      }
                      return {
                          API_SERVICE: {
                              service: binding.service,
                              entrypoint: binding.entrypoint,
                              environment: binding.environment || "production",
                          },
                      };
                  });
              })
            : undefined;

        const previewServices = project.serviceBinding
            ? pulumi.output(project.serviceBinding).apply((binding) => {
                  if (!binding) {
                      return null;
                  }
                  const service = "service" in binding ? binding.service : undefined;
                  if (!service) {
                      return null;
                  }
                  return pulumi.output(service).apply((serviceName) => {
                      if (!serviceName || serviceName.trim() === "") {
                          return null;
                      }
                      return {
                          API_SERVICE: {
                              service: binding.service,
                              entrypoint: binding.entrypoint,
                              environment: binding.environment || "production",
                          },
                      };
                  });
              })
            : undefined;

        const pagesProject = new cloudflare.PagesProject(
            resourceNameBase,
            {
                accountId,
                name: project.name,
                productionBranch: project.productionBranch,
                buildConfig: {
                    buildCommand: project.buildCommand,
                    destinationDir: project.destinationDir || "dist",
                    rootDir: project.rootDir,
                },
                deploymentConfigs: pulumi
                    .all([productionServices, previewServices])
                    .apply(([prodServices, prevServices]) => {
                        const productionConfig: cloudflare.types.input.PagesProjectDeploymentConfigsProduction = {
                            envVars: productionEnvVars,
                            compatibilityDate: project.compatibilityDate || "2025-01-01",
                            compatibilityFlags: ["nodejs_compat"],
                        };

                        if (prodServices) {
                            productionConfig.services = prodServices;
                        }

                        const previewConfig: cloudflare.types.input.PagesProjectDeploymentConfigsPreview = {
                            envVars: previewEnvVars,
                            compatibilityDate: project.compatibilityDate || "2025-01-01",
                            compatibilityFlags: ["nodejs_compat"],
                        };

                        if (prevServices) {
                            previewConfig.services = prevServices;
                        }

                        return {
                            production: productionConfig,
                            preview: previewConfig,
                        };
                    }),
            },
            {
                provider,
            },
        );

        createdProjects[resourceNameBase] = pagesProject;

        const subdomain = pagesProject.name.apply((name) => `${name}.pages.dev`);
        const subdomainKey = project.customDomain || `project-${i}`;
        createdSubdomains[subdomainKey] = subdomain;

        if (project.customDomain) {
            const customDomainValue = project.customDomain;
            const domainResourceName = `${resourceNameBase}-domain`;
            createdDomains[domainResourceName] = new cloudflare.PagesDomain(
                domainResourceName,
                {
                    accountId,
                    projectName: pagesProject.name,
                    name: `${customDomainValue}.${domain}`,
                },
                {
                    dependsOn: [pagesProject],
                    provider,
                    deleteBeforeReplace: true,
                },
            );
        }
    }

    return {
        projects: createdProjects,
        domains: createdDomains,
        subdomains: createdSubdomains,
    };
}

export function createPortfolioPagesProjects(
    config: InfraConfig,
    _secrets: {
        databaseUrl: pulumi.Output<string>;
        redisUrl?: pulumi.Output<string>;
    },
    provider?: cloudflare.Provider,
    apiWorkerScriptName?: pulumi.Output<string>,
): PagesOutputs {
    const projectName = getProjectName();

    const webRandomSuffix = generateRandomSuffix(`${projectName}-web-random`);
    const adminRandomSuffix = generateRandomSuffix(`${projectName}-admin-random`);
    const wikiRandomSuffix = generateRandomSuffix(`${projectName}-wiki-random`);

    const webServiceBinding = apiWorkerScriptName
        ? pulumi.all([apiWorkerScriptName]).apply(([scriptName]) => {
              if (!scriptName || scriptName.trim() === "") {
                  return undefined;
              }
              return {
                  service: apiWorkerScriptName,
                  environment: "production",
              };
          })
        : undefined;

    const adminServiceBinding = apiWorkerScriptName
        ? pulumi.all([apiWorkerScriptName]).apply(([scriptName]) => {
              if (!scriptName || scriptName.trim() === "") {
                  return undefined;
              }
              return {
                  service: apiWorkerScriptName,
                  environment: "production",
              };
          })
        : undefined;

    const projects: PagesProjectConfig[] = [
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
            serviceBinding: webServiceBinding,
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
            serviceBinding: adminServiceBinding,
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
