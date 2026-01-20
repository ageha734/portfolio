import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";
import type { InfraConfig } from "../config";
import { getProjectName } from "../config";

export interface DnsRecordConfig {
	name: string;
	type: "A" | "AAAA" | "CNAME" | "TXT" | "MX" | "SRV";
	content: string | pulumi.Output<string>;
	ttl?: number;
	proxied?: boolean;
	priority?: number;
	comment?: string;
}

export interface DnsOutputs {
	records: Record<string, cloudflare.Record>;
}

export function createDnsRecords(
	config: InfraConfig,
	records: DnsRecordConfig[],
): DnsOutputs {
	const { zoneId, domain } = config.cloudflare;
	const createdRecords: Record<string, cloudflare.Record> = {};

	for (const record of records) {
		const recordName = record.name === "@" ? domain : `${record.name}.${domain}`;
		const resourceName = `dns-${record.type.toLowerCase()}-${record.name.replaceAll(/[^a-z0-9]/gi, "-")}`;

		createdRecords[resourceName] = new cloudflare.Record(
			resourceName,
			{
				zoneId,
				name: recordName,
				type: record.type,
				content: record.content,
				ttl: record.proxied ? 1 : record.ttl || 3600,
				proxied: record.proxied ?? false,
				priority: record.priority,
				comment: record.comment || `Managed by Pulumi - ${resourceName}`,
			},
			{
				protect: true,
			},
		);
	}

	return { records: createdRecords };
}

export function createSubdomainRecords(
	config: InfraConfig,
	subdomains: Array<{
		subdomain: string;
		target: string | pulumi.Output<string>;
		proxied?: boolean;
	}>,
): DnsOutputs {
	const records: DnsRecordConfig[] = subdomains.map((sub) => ({
		name: sub.subdomain,
		type: "CNAME" as const,
		content: sub.target,
		proxied: sub.proxied ?? true,
		comment: `Subdomain: ${sub.subdomain}`,
	}));

	return createDnsRecords(config, records);
}

export function createPortfolioDnsRecords(config: InfraConfig): DnsOutputs {
	const projectName = getProjectName();

	const records: DnsRecordConfig[] = [
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
