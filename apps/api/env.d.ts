/// <reference types="@cloudflare/workers-types" />

interface ImportMetaEnv {
    readonly NODE_ENV: "development" | "production";
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
