import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

function getWorkspaceDir(filePath: string): string | null {
    const workspacePatterns = [/^apps\/([^/]+)/, /^packages\/([^/]+)/, /^tooling\/([^/]+)/, /^testing\/([^/]+)/];

    for (const pattern of workspacePatterns) {
        const match = filePath.match(pattern);
        if (match) {
            return match[0];
        }
    }

    return null;
}

/**
 * @type {import('lint-staged').Configuration}
 */
export default {
    ".github/**/*.yml": (filenames) =>
        filenames.flatMap((f) => [`bun run fmt:actions:check -- ${f}`, `bun run lint:actions:check -- ${f}`]),
    "*.{ts,tsx,js,jsx}": (filenames) => {
        const filteredFilenames = filenames.filter((f) => !f.includes("worker-configuration.d.ts"));
        const sourceFiles = filteredFilenames.filter(
            (f) => !f.endsWith(".test.ts") && !f.endsWith(".test.tsx") && (f.endsWith(".ts") || f.endsWith(".tsx")),
        );
        const sourceFilesWithTests = sourceFiles.filter((f) => {
            const testFile = f.replace(/\.(ts|tsx)$/, ".test.$1");
            return existsSync(testFile);
        });
        const hasTsFiles = filteredFilenames.some((f) => f.endsWith(".ts") || f.endsWith(".tsx"));

        const workspaceGroups = new Map<string, string[]>();
        const rootFiles: string[] = [];

        for (const file of filteredFilenames) {
            const workspaceDir = getWorkspaceDir(file);
            if (workspaceDir) {
                if (!workspaceGroups.has(workspaceDir)) {
                    workspaceGroups.set(workspaceDir, []);
                }
                workspaceGroups.get(workspaceDir)!.push(file);
            } else {
                rootFiles.push(file);
            }
        }

        const commands = [];

        for (const [workspaceDir, _files] of workspaceGroups) {
            commands.push(`cd ${workspaceDir} && bun run fmt:check && bun run lint`);
        }

        if (rootFiles.length > 0) {
            commands.push(
                ...rootFiles.flatMap((f) => [`bun run fmt:ts:check -- ${f}`, `bun run lint:ts:check -- ${f}`]),
            );
        }

        if (sourceFilesWithTests.length > 0) {
            for (const sourceFile of sourceFilesWithTests) {
                const workspaceDir = getWorkspaceDir(sourceFile);
                const testFile = sourceFile.replace(/\.(ts|tsx)$/, ".test.$1");
                if (workspaceDir) {
                    commands.push(`cd ${workspaceDir} && bun run test -- ${testFile}`);
                    commands.push(`cd ${workspaceDir} && bun run coverage -- ${sourceFile}`);
                } else {
                    commands.push(`bun run test -- ${testFile}`);
                    commands.push(`bun run coverage -- ${sourceFile}`);
                }
            }
        }

        if (hasTsFiles) {
            commands.push("turbo run typecheck");
        }

        return commands;
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
    "**/*.test.{ts,tsx}": (filenames) => {
        const commands = [];
        for (const file of filenames) {
            const workspaceDir = getWorkspaceDir(file);
            if (workspaceDir) {
                commands.push(`cd ${workspaceDir} && bun run test -- ${file}`);
            } else {
                commands.push(`bun run test -- ${file}`);
            }
        }
        return commands;
    },
};
