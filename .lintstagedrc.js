/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
    '.github/**/*.yml': (filenames) => {
        const files = filenames.map((f) => `"${f}"`).join(' ');
        return [
            `bun run fmt:actions:fix -- ${files}`,
            `bun run lint:actions:check`,
        ];
    },
    '*.{ts,tsx,js,jsx,json,jsonc}': (filenames) => {
        const files = filenames.map((f) => `"${f}"`).join(' ');
        return [
            `bun run fmt:ts:fix -- ${files}`,
            `bun run lint:ts:fix -- ${files}`,
        ];
    },
    '*.md': (filenames) => {
        const files = filenames.map((f) => `"${f}"`).join(' ');
        return [
            `bun run fmt:md:fix -- ${files}`,
            `bun run lint:md:fix -- ${files}`,
        ];
    },
    '*.sh': (filenames) => {
        const files = filenames.map((f) => `"${f}"`).join(' ');
        return [
            `bun run fmt:shell:fix -- ${files}`,
            `bun run lint:shell:check -- ${files}`,
        ];
    },
    '*.tsp': (filenames) => {
        const files = filenames.map((f) => `"${f}"`).join(' ');
        return [
            `bun run fmt:tsp:fix -- ${files}`,
            `bun run lint:tsp:fix -- ${files}`,
        ];
    },
    '**/*.test.{ts,tsx}': ['bun run test'],
};
