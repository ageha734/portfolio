import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";
import { getProjectName } from "../config.js";
export function createDnsRecords(config, records, provider) {
    const { zoneId, domain } = config.cloudflare;
    const createdRecords = {};
    for (const record of records) {
        const recordName = record.name === "@" ? domain : `${record.name}.${domain}`;
        const resourceName = `dns-${record.type.toLowerCase()}-${record.name.replaceAll(/[^a-z0-9]/gi, "-")}`;
        createdRecords[resourceName] = new cloudflare.DnsRecord(resourceName, {
            zoneId,
            name: recordName,
            type: record.type,
            content: record.content,
            ttl: record.proxied ? 1 : record.ttl || 3600,
            proxied: record.proxied ?? false,
            priority: record.priority,
            comment: record.comment || `Managed by Pulumi - ${resourceName}`,
        }, {
            protect: true,
            provider,
        });
    }
    return { records: createdRecords };
}
export function createSubdomainRecords(config, subdomains, provider) {
    const records = subdomains.map((sub) => ({
        name: sub.subdomain,
        type: "CNAME",
        content: sub.target,
        proxied: sub.proxied ?? true,
        comment: `Subdomain: ${sub.subdomain}`,
    }));
    return createDnsRecords(config, records, provider);
}
export function createPortfolioDnsRecords(config, provider, pagesSubdomains, workerSubdomains, workerCustomDomains) {
    const projectName = getProjectName();
    const defaultWebSubdomain = `${projectName}-web.pages.dev`;
    const defaultAdminSubdomain = `${projectName}-admin.pages.dev`;
    const defaultWikiSubdomain = `${projectName}-wiki.pages.dev`;
    const defaultApiSubdomain = `${projectName}-api.workers.dev`;
    let webSubdomain;
    let adminSubdomain;
    let wikiSubdomain;
    if (pagesSubdomains) {
        webSubdomain = pagesSubdomains["www"] ?? pulumi.output(defaultWebSubdomain);
        adminSubdomain = pagesSubdomains["admin"] ?? pulumi.output(defaultAdminSubdomain);
        wikiSubdomain = pagesSubdomains["wiki"] ?? pulumi.output(defaultWikiSubdomain);
    }
    else {
        webSubdomain = pulumi.output(defaultWebSubdomain);
        adminSubdomain = pulumi.output(defaultAdminSubdomain);
        wikiSubdomain = pulumi.output(defaultWikiSubdomain);
    }
    let apiSubdomain;
    if (workerSubdomains) {
        const apiKey = Object.keys(workerSubdomains)[0];
        apiSubdomain =
            apiKey && workerSubdomains[apiKey] ? workerSubdomains[apiKey] : pulumi.output(defaultApiSubdomain);
    }
    else {
        apiSubdomain = pulumi.output(defaultApiSubdomain);
    }
    const records = [
        {
            name: "www",
            type: "CNAME",
            content: webSubdomain,
            proxied: true,
            comment: "Main web application",
        },
        {
            name: "admin",
            type: "CNAME",
            content: adminSubdomain,
            proxied: true,
            comment: "Admin dashboard",
        },
        {
            name: "wiki",
            type: "CNAME",
            content: wikiSubdomain,
            proxied: true,
            comment: "Documentation wiki",
        },
    ];
    const hasApiCustomDomain = workerCustomDomains && Object.keys(workerCustomDomains).length > 0;
    if (!hasApiCustomDomain) {
        records.push({
            name: "api",
            type: "CNAME",
            content: apiSubdomain,
            proxied: true,
            comment: "API worker",
        });
    }
    return createDnsRecords(config, records, provider);
}
//# sourceMappingURL=dns.js.map