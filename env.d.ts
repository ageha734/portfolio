/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types/2023-07-01" />
/// <reference types="vite/client" />
/// <reference types="codeceptjs" />

declare global {
    interface Window {
        gtag?: (
            command: "config" | "event" | "set" | "js",
            targetId: string | Date,
            config?: Record<string, unknown>
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
