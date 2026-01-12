/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types/2023-07-01" />
/// <reference types="vite/client" />
/// <reference types="codeceptjs" />
/// <reference path="./worker-configuration.d.ts" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string;
    readonly VITE_GOOGLE_ANALYTICS: string;
    readonly VITE_GOOGLE_TAG_MANAGER: string;
    readonly VITE_GOOGLE_ANALYTICS_ENABLED: string;
    readonly VITE_GOOGLE_TAG_MANAGER_ENABLED: string;
    readonly VITE_GRAPHCMS_ADMIN: string;
    readonly VITE_GRAPHCMS_TOKEN: string;
    readonly VITE_GRAPHCMS_URL: string;
    readonly VITE_XSTATE_INSPECTOR_ENABLED: string;
    readonly VITE_SENTRY_DSN: string;
    readonly VITE_SENTRY_ENVIRONMENT: string;
    readonly VITE_SENTRY_TRACES_SAMPLE_RATE: string;
    readonly VITE_SENTRY_REPLAY_SAMPLE_RATE: string;
    readonly VITE_SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE: string;
}

// biome-ignore lint/correctness/noUnusedVariables: ImportMeta is used by Vite for import.meta.env typing
interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare global {
    interface Window {
        gtag?: (
            command: "config" | "event" | "set" | "js",
            targetId: string | Date,
            config?: Record<string, unknown>,
        ) => void;
        dataLayer?: unknown[];
    }
}

export {};

declare module "@mapbox/rehype-prism" {
    type RehypePrismOptions = {
        alias?: Record<string, string | string[]>;
    };
    type RehypePrism = (options?: RehypePrismOptions) => (tree: unknown) => void;
    const rehypePrism: RehypePrism;
    export default rehypePrism;
}
