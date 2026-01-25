import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";
import type { InfraConfig } from "../config.js";
export interface DnsRecordConfig {
    name: string;
    type: "A" | "AAAA" | "CNAME";
    content: string | pulumi.Output<string>;
    ttl?: number;
    proxied?: boolean;
    priority?: number;
    comment?: string;
}
export interface DnsOutputs {
    records: Record<string, cloudflare.Record>;
}
export declare function createDnsRecords(config: InfraConfig, records: DnsRecordConfig[]): DnsOutputs;
export declare function createSubdomainRecords(config: InfraConfig, subdomains: Array<{
    subdomain: string;
    target: string | pulumi.Output<string>;
    proxied?: boolean;
}>): DnsOutputs;
export declare function createPortfolioDnsRecords(config: InfraConfig): DnsOutputs;
//# sourceMappingURL=dns.d.ts.map