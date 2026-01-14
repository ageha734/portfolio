/// <reference types="@cloudflare/workers-types/2023-07-01" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_URL?: string;
}

// biome-ignore lint/correctness/noUnusedVariables: ImportMeta is used by Vite for import.meta.env typing
interface ImportMeta {
	readonly env: ImportMetaEnv;
}
