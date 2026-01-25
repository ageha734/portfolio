import type { UserConfig } from "vite";
export interface ViteConfigOptions {
    root?: string;
    tsconfigPath?: string;
    additionalAliases?: Record<string, string>;
}
export declare function createViteConfig(options?: ViteConfigOptions): UserConfig;
//# sourceMappingURL=index.d.ts.map