import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";
import { getProjectName } from "../config.js";
function createAccessApplication(config, accountId, resourceName, provider) {
    return new cloudflare.ZeroTrustAccessApplication(resourceName, {
        accountId,
        name: config.name,
        domain: config.domain,
        allowedIdps: config.allowedIdps,
        sessionDuration: config.sessionDuration || "24h",
        type: "self_hosted",
        policies: config.policies,
    }, {
        provider,
    });
}
export function createPreviewDeploymentAccess(config, pagesProjects, workers, provider) {
    const environment = config.environment;
    if (environment !== "rc" && environment !== "stg") {
        return null;
    }
    const { accountId } = config.cloudflare;
    const projectName = getProjectName();
    const createdApplications = {};
    const services = [
        { key: "admin", subdomainKey: "admin", type: "pages" },
        { key: "api", subdomainKey: "api", type: "workers" },
        { key: "web", subdomainKey: "www", type: "pages" },
        { key: "wiki", subdomainKey: "wiki", type: "pages" },
    ];
    for (const service of services) {
        let domain;
        if (service.type === "pages") {
            domain = pagesProjects.subdomains[service.subdomainKey];
        }
        else if (service.key === "api") {
            const workerKey = Object.keys(workers.subdomains).find((key) => key.includes("api"));
            domain = workerKey ? workers.subdomains[workerKey] : undefined;
        }
        else {
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
        const application = createAccessApplication({
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
        }, accountId, applicationResourceName, provider);
        createdApplications[applicationResourceName] = application;
    }
    return {
        applications: createdApplications,
    };
}
//# sourceMappingURL=access.js.map