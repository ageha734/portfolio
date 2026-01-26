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
export function createPreviewDeploymentAccess(config, pagesProjects, _workers, provider) {
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
        let domainPattern;
        if (service.type === "pages") {
            const pagesDomain = pagesProjects.subdomains[service.subdomainKey];
            if (!pagesDomain) {
                continue;
            }
            domainPattern = pagesDomain.apply((d) => {
                if (d.includes(".pages.dev")) {
                    const projectSubdomain = d.replace(".pages.dev", "");
                    return `*.${projectSubdomain}.pages.dev`;
                }
                return d;
            });
        }
        else if (service.key === "api") {
            // Workersのプレビューデプロイメント（*.workers.dev）はCloudflareのゾーンに属していないため、
            // Access Applicationのドメインとして使用できません。
            // Workersのカスタムドメインが使用されている場合でも、プレビューデプロイメントは*.workers.devになるため、
            // APIサービスについてはプレビューデプロイメント用のAccess Applicationを作成しません。
            continue;
        }
        else {
            continue;
        }
        if (!domainPattern) {
            continue;
        }
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