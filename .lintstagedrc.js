import { existsSync } from "node:fs";

/**
 * @type {import('lint-staged').Configuration}
 */
export default {
    ".github/**/*.yml": (filenames) =>
        filenames.flatMap((f) => [`bun run fmt:actions:check -- ${f}`, `bun run lint:actions:check -- ${f}`]),
    "*.{ts,tsx,js,jsx,json,jsonc}": (filenames) => {
        const testFiles = filenames
            .filter((f) => !f.endsWith(".test.ts") && !f.endsWith(".test.tsx"))
            .map((f) => f.replace(/\.(ts|tsx)$/, ".test.$1"))
            .filter((f) => existsSync(f));

        return [
            ...filenames.flatMap((f) => [`bun run fmt:ts:check -- ${f}`, `bun run lint:ts:check -- ${f}`]),
            ...testFiles.map((f) => `bun run test -- ${f}`),
            "bun run typecheck",
        ];
    },
    "*.md": (filenames) => filenames.flatMap((f) => [`bun run fmt:md:check -- ${f}`, `bun run lint:md:check -- ${f}`]),
    "*.sh": (filenames) => filenames.flatMap((f) => [`bun run fmt:shell:check -- ${f}`]),
    "*.tsp": (filenames) =>
        filenames.flatMap((f) => [`bun run fmt:tsp:check -- ${f}`, `bun run lint:tsp:check -- ${f}`]),
    "**/*.test.{ts,tsx}": (filenames) => filenames.map((f) => `bun run test -- ${f}`),
};
