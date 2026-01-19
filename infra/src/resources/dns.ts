import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";
import type { InfraConfig } from "../config";

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

/**
 * Cloudflare DNS Records Management
 *
 * IMPORTANT: This module only manages records defined here.
 * Existing records in the zone are NOT modified or deleted.
 * We use the existing Zone ID instead of importing the zone.
 */
export function createDnsRecords(
	config: InfraConfig,
	records: DnsRecordConfig[],
): DnsOutputs {
	const { zoneId, domain } = config.cloudflare;
	const createdRecords: Record<string, cloudflare.Record> = {};

	for (const record of records) {
		const recordName = record.name === "@" ? domain : `${record.name}.${domain}`;
		const resourceName = `dns-${record.type.toLowerCase()}-${record.name.replace(/[^a-z0-9]/gi, "-")}`;

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
				// Prevent accidental deletion
				protect: true,
			},
		);
	}

	return { records: createdRecords };
}

/**
 * Helper to create common DNS patterns for subdomains
 */
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

/**
 * Example DNS records for the portfolio project
 */
export function createPortfolioDnsRecords(config: InfraConfig): DnsOutputs {
	const records: DnsRecordConfig[] = [
		// Web app - pointing to Cloudflare Pages
		{
			name: "www",
			type: "CNAME",
			content: "portfolio-web.pages.dev",
			proxied: true,
			comment: "Main web application",
		},
		// API - pointing to Cloudflare Workers
		{
			name: "api",
			type: "CNAME",
			content: "portfolio-api.workers.dev",
			proxied: true,
			comment: "API endpoint",
		},
		// Admin dashboard
		{
			name: "admin",
			type: "CNAME",
			content: "portfolio-admin.pages.dev",
			proxied: true,
			comment: "Admin dashboard",
		},
		// Wiki/Documentation
		{
			name: "wiki",
			type: "CNAME",
			content: "portfolio-wiki.pages.dev",
			proxied: true,
			comment: "Documentation wiki",
		},
	];

	return createDnsRecords(config, records);
}
