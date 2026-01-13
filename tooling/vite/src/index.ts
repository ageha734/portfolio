import { resolve } from "node:path";
import type { UserConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export interface ViteConfigOptions {
    root?: string;
    tsconfigPath?: string;
    additionalAliases?: Record<string, string>;
}

export function createViteConfig(options: ViteConfigOptions = {}): UserConfig {
    const { root = process.cwd(), tsconfigPath, additionalAliases = {} } = options;

    return {
        build: {
            assetsInlineLimit: 1024,
            target: "es2022",
        },
        resolve: {
            alias: {
                ...additionalAliases,
            },
        },
        plugins: [
            tsconfigPaths({
                root,
                projects: tsconfigPath ? [tsconfigPath] : undefined,
                ignoreConfigErrors: true,
            }),
        ],
    };
}
