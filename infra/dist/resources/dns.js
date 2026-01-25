import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";
import { getProjectName } from "../config.js";
export function createDnsRecords(config, records) {
    const { zoneId, domain } = config.cloudflare;
    const createdRecords = {};
    for (const record of records) {
        const recordName = record.name === "@" ? domain : `${record.name}.${domain}`;
        const resourceName = `dns-${record.type.toLowerCase()}-${record.name.replaceAll(/[^a-z0-9]/gi, "-")}`;
        createdRecords[resourceName] = new cloudflare.Record(resourceName, {
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
        });
    }
    return { records: createdRecords };
}
export function createSubdomainRecords(config, subdomains) {
    const records = subdomains.map((sub) => ({
        name: sub.subdomain,
        type: "CNAME",
        content: sub.target,
        proxied: sub.proxied ?? true,
        comment: `Subdomain: ${sub.subdomain}`,
    }));
    return createDnsRecords(config, records);
}
export function createPortfolioDnsRecords(config) {
    const projectName = getProjectName();
    const records = [
        {
            name: "www",
            type: "CNAME",
            content: `${projectName}-web.pages.dev`,
            proxied: true,
            comment: "Main web application",
        },
        {
            name: "api",
            type: "CNAME",
            content: `${projectName}-api.workers.dev`,
            proxied: true,
            comment: "API endpoint",
        },
        {
            name: "admin",
            type: "CNAME",
            content: `${projectName}-admin.pages.dev`,
            proxied: true,
            comment: "Admin dashboard",
        },
        {
            name: "wiki",
            type: "CNAME",
            content: `${projectName}-wiki.pages.dev`,
            proxied: true,
            comment: "Documentation wiki",
        },
    ];
    return createDnsRecords(config, records);
}
//# sourceMappingURL=dns.js.map