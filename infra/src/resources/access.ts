import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";
import type { InfraConfig } from "../config.js";
import { getProjectName } from "../config.js";

export interface AccessOutputs {
    applications: Record<string, cloudflare.ZeroTrustAccessApplication>;
}

interface AccessApplicationConfig {
    name: string;
    domain: pulumi.Input<string>;
    allowedIdps?: pulumi.Input<string[]>;
    sessionDuration?: string;
    policies?: cloudflare.types.input.ZeroTrustAccessApplicationPolicy[];
}

function createAccessApplication(
    config: AccessApplicationConfig,
    accountId: pulumi.Input<string>,
    resourceName: string,
    provider?: cloudflare.Provider,
): cloudflare.ZeroTrustAccessApplication {
    return new cloudflare.ZeroTrustAccessApplication(
        resourceName,
        {
            accountId,
            name: config.name,
            domain: config.domain,
            allowedIdps: config.allowedIdps,
            sessionDuration: config.sessionDuration || "24h",
            type: "self_hosted",
            policies: config.policies,
        },
        {
            provider,
        },
    );
}

export function createPreviewDeploymentAccess(
    config: InfraConfig,
    pagesProjects: {
        projects: Record<string, cloudflare.PagesProject>;
        subdomains: Record<string, pulumi.Output<string>>;
    },
    workers: {
        scripts: Record<string, cloudflare.WorkersScript>;
        subdomains: Record<string, pulumi.Output<string>>;
    },
    provider?: cloudflare.Provider,
): AccessOutputs | null {
    const environment = config.environment;

    if (environment !== "rc" && environment !== "stg") {
        return null;
    }

    const { accountId } = config.cloudflare;
    const projectName = getProjectName();
    const createdApplications: Record<string, cloudflare.ZeroTrustAccessApplication> = {};

    const services = [
        { key: "admin", subdomainKey: "admin", type: "pages" as const },
        { key: "api", subdomainKey: "api", type: "workers" as const },
        { key: "web", subdomainKey: "www", type: "pages" as const },
        { key: "wiki", subdomainKey: "wiki", type: "pages" as const },
    ];

    for (const service of services) {
        let domain: pulumi.Output<string> | undefined;

        if (service.type === "pages") {
            domain = pagesProjects.subdomains[service.subdomainKey];
        } else if (service.key === "api") {
            const workerKey = Object.keys(workers.subdomains).find((key) => key.includes("api"));
            domain = workerKey ? workers.subdomains[workerKey] : undefined;
        } else {
            continue;
        }

        if (!domain) {
            continue;
        }

        const domainPattern = domain.apply((d) => {
            if (d.includes(".pages.dev")) {
                const projectSubdomain = d.replace(".pages.dev", "");
                return `*.${projectSubdomain}.pages.dev`;
            }
            if (d.includes(".workers.dev")) {
                const workerSubdomain = d.replace(".workers.dev", "");
                return `*-${workerSubdomain}.workers.dev`;
            }
            return d;
        });

        const applicationResourceName = `access-app-${service.key}-preview-${environment}`;
        const application = createAccessApplication(
            {
                name: `${projectName}-${service.key}-preview-${environment}`,
                domain: domainPattern,
                sessionDuration: "24h",
                policies: [
                    {
                        name: `${projectName}-${service.key}-preview-policy-${environment}`,
                        decision: "allow",
                        precedence: 1,
                        includes: [{ everyone: {} }],
                    },
                ],
            },
            accountId,
            applicationResourceName,
            provider,
        );

        createdApplications[applicationResourceName] = application;
    }

    return {
        applications: createdApplications,
    };
}
