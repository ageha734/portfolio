import { existsSync } from "node:fs";

/**
 * @type {import('lint-staged').Configuration}
 */
export default {
    ".github/**/*.yml": (filenames) =>
        filenames.flatMap((f) => [`bun run fmt:actions:check -- ${f}`, `bun run lint:actions:check -- ${f}`]),
    "*.{ts,tsx,js,jsx,json,jsonc}": (filenames) => {
        const filteredFilenames = filenames.filter((f) => !f.includes("worker-configuration.d.ts"));
        const sourceFiles = filteredFilenames.filter(
            (f) => !f.endsWith(".test.ts") && !f.endsWith(".test.tsx") && (f.endsWith(".ts") || f.endsWith(".tsx")),
        );
        const sourceFilesWithTests = sourceFiles.filter((f) => {
            const testFile = f.replace(/\.(ts|tsx)$/, ".test.$1");
            return existsSync(testFile);
        });
        const hasTsFiles = filteredFilenames.some((f) => f.endsWith(".ts") || f.endsWith(".tsx"));

        return [
            ...filteredFilenames.flatMap((f) => [`bun run fmt:ts:check -- ${f}`, `bun run lint:ts:check -- ${f}`]),
            ...sourceFilesWithTests.map((f) => {
                const testFile = f.replace(/\.(ts|tsx)$/, ".test.$1");
                return `bun run test -- ${testFile}`;
            }),
            ...sourceFilesWithTests.map((f) => `bun run coverage -- ${f}`),
            ...(hasTsFiles ? ["bun run typecheck"] : []),
        ];
    },
    "*.md": (filenames) =>
        filenames.flatMap((f) => [
            `bun run fmt:md:check -- ${f}`,
            `bun run lint:md:check -- ${f}`,
            `bun run lint:textlint:check -- ${f}`,
        ]),
    "*.sh": (filenames) =>
        filenames.flatMap((f) => [`bun run fmt:shell:check -- ${f}`, `bun run lint:shell:check -- ${f}`]),
    "*.tsp": (filenames) =>
        filenames.flatMap((f) => [`bun run fmt:tsp:check -- ${f}`, `bun run lint:tsp:check -- ${f}`]),
    "**/*.test.{ts,tsx}": (filenames) => filenames.map((f) => `bun run test -- ${f}`),
};
