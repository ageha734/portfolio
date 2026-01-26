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
    records: Record<string, cloudflare.DnsRecord>;
}
export declare function createDnsRecords(config: InfraConfig, records: DnsRecordConfig[], provider?: cloudflare.Provider): DnsOutputs;
export declare function createSubdomainRecords(config: InfraConfig, subdomains: Array<{
    subdomain: string;
    target: string | pulumi.Output<string>;
    proxied?: boolean;
}>, provider?: cloudflare.Provider): DnsOutputs;
export declare function createPortfolioDnsRecords(config: InfraConfig, provider?: cloudflare.Provider, pagesSubdomains?: Record<string, pulumi.Output<string>>, workerSubdomains?: Record<string, pulumi.Output<string>>): DnsOutputs;
//# sourceMappingURL=dns.d.ts.map