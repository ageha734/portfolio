import { existsSync } from "node:fs";

function getWorkspaceDir(filePath) {
    const workspacePatterns = [/^apps\/([^/]+)/, /^packages\/([^/]+)/, /^tooling\/([^/]+)/, /^testing\/([^/]+)/, /^scripts\/([^/]+)/];

    for (const pattern of workspacePatterns) {
        const match = filePath.match(pattern);
        if (match) {
            return match[0];
        }
    }

    return null;
}

function filterFilenames(filenames) {
    return filenames
        .map((f) => (f.startsWith("/") ? f.replace(`${process.cwd()}/`, "") : f))
        .filter(
            (f) =>
                !f.includes("worker-configuration.d.ts") &&
                !f.includes("/.docusaurus/") &&
                !f.includes("/.turbo/") &&
                !f.includes("/.tanstack/") &&
                !f.includes("/.wrangler/") &&
                !f.includes("/build/") &&
                !f.includes("/dist/") &&
                !f.includes("/report/") &&
                !f.includes("/coverage/"),
        );
}

function getSourceFiles(filteredFilenames) {
    return filteredFilenames.filter(
        (f) => !f.endsWith(".test.ts") && !f.endsWith(".test.tsx") && (f.endsWith(".ts") || f.endsWith(".tsx")),
    );
}

function getSourceFilesWithTests(sourceFiles) {
    return sourceFiles.filter((f) => {
        const absolutePath = f.startsWith("/") ? f : `${process.cwd()}/${f}`;
        const testFile = absolutePath.replace(/\.(ts|tsx)$/, ".test.$1");
        return existsSync(testFile);
    });
}

function groupFilesByWorkspace(filteredFilenames) {
    const workspaceGroups = new Map();
    const rootFiles = [];

    for (const file of filteredFilenames) {
        const relativeFile = file.startsWith("/") ? file.replace(`${process.cwd()}/`, "") : file;
        const workspaceDir = getWorkspaceDir(relativeFile);
        if (workspaceDir) {
            if (!workspaceGroups.has(workspaceDir)) {
                workspaceGroups.set(workspaceDir, []);
            }
            workspaceGroups.get(workspaceDir).push(relativeFile);
        } else {
            rootFiles.push(relativeFile);
        }
    }

    return { workspaceGroups, rootFiles };
}

function buildFormatLintCommands(workspaceGroups, rootFiles) {
    const commands = [];

    for (const [workspaceDir] of workspaceGroups) {
        commands.push(`cd ${workspaceDir} && bun run fmt:check && bun run lint`);
    }

    if (rootFiles.length > 0) {
        const rootWorkspaceFiles = rootFiles.filter(
            (f) => f.endsWith(".ts") || f.endsWith(".tsx") || f.endsWith(".js") || f.endsWith(".jsx"),
        );
        if (rootWorkspaceFiles.length > 0) {
            commands.push("turbo run fmt:check", "turbo run lint");
        }
    }

    return commands;
}

function buildTestCoverageCommands(sourceFilesWithTests) {
    const commands = [];

    for (const sourceFile of sourceFilesWithTests) {
        const relativeSourceFile = sourceFile.startsWith("/")
            ? sourceFile.replace(`${process.cwd()}/`, "")
            : sourceFile;
        const workspaceDir = getWorkspaceDir(relativeSourceFile);
        const testFile = relativeSourceFile.replace(/\.(ts|tsx)$/, ".test.$1");
        if (workspaceDir) {
            const workspaceRelativeTestFile = testFile.replace(`${workspaceDir}/`, "");
            const workspaceRelativeSourceFile = relativeSourceFile.replace(`${workspaceDir}/`, "");
            commands.push(
                `cd ${workspaceDir} && bun run test -- ${workspaceRelativeTestFile}`,
                `cd ${workspaceDir} && bun run coverage -- ${workspaceRelativeSourceFile}`,
            );
        } else {
            console.warn(
                `Warning: Source file ${relativeSourceFile} is not in a workspace directory and will be skipped`,
            );
        }
    }

    return commands;
}

const config = {
    ".github/**/*.yml": (filenames) =>
        filenames.flatMap((f) => [`bun run fmt:actions:check -- ${f}`, `bun run lint:actions:check -- ${f}`]),
    "*.{ts,tsx}": (filenames) => {
        const filteredFilenames = filterFilenames(filenames);
        const sourceFiles = getSourceFiles(filteredFilenames);
        const sourceFilesWithTests = getSourceFilesWithTests(sourceFiles);
        const hasTsFiles = filteredFilenames.some((f) => f.endsWith(".ts") || f.endsWith(".tsx"));

        const { workspaceGroups, rootFiles } = groupFilesByWorkspace(filteredFilenames);

        const commands = [
            ...buildFormatLintCommands(workspaceGroups, rootFiles),
            ...buildTestCoverageCommands(sourceFilesWithTests),
        ];

        if (hasTsFiles) {
            commands.push("turbo run typecheck");
        }

        return commands;
    },
    "*.config.js": (filenames) => {
        const filteredFilenames = filterFilenames(filenames);
        const sourceFiles = getSourceFiles(filteredFilenames);
        const sourceFilesWithTests = getSourceFilesWithTests(sourceFiles);
        const hasTsFiles = filteredFilenames.some((f) => f.endsWith(".ts") || f.endsWith(".tsx"));

        const { workspaceGroups, rootFiles } = groupFilesByWorkspace(filteredFilenames);

        const commands = [
            ...buildFormatLintCommands(workspaceGroups, rootFiles),
            ...buildTestCoverageCommands(sourceFilesWithTests),
        ];

        if (hasTsFiles) {
            commands.push("turbo run typecheck");
        }

        return commands;
    },
    "*.md": (filenames) => {
        const wikiFiles = filenames.filter((f) => f.includes("apps/wiki/"));
        const otherFiles = filenames.filter((f) => !f.includes("apps/wiki/"));

        const commands = [];

        if (wikiFiles.length > 0) {
            const relativeFiles = wikiFiles.map((f) => {
                const match = f.match(/apps\/wiki\/(.+)/);
                return match ? match[1] : f;
            });
            commands.push(
                `cd apps/wiki && bun run fmt:md:check -- ${relativeFiles.join(" ")}`,
                `cd apps/wiki && bun run lint:md:check -- ${relativeFiles.join(" ")}`,
                `cd apps/wiki && bun run lint:textlint:check -- ${relativeFiles.join(" ")}`,
            );
        }

        if (otherFiles.length > 0) {
            console.warn(
                `Warning: The following markdown files are outside apps/wiki/ and will not be checked: ${otherFiles.join(", ")}`,
            );
        }

        return commands;
    },
    "*.sh": (filenames) =>
        filenames.flatMap((f) => [`bun run fmt:shell:check -- ${f}`, `bun run lint:shell:check -- ${f}`]),
    "*.tsp": (filenames) =>
        filenames.flatMap((f) => [`bun run fmt:tsp:check -- ${f}`, `bun run lint:tsp:check -- ${f}`]),
    "**/*.test.{ts,tsx}": (filenames) => {
        const commands = [];
        for (const file of filenames) {
            const relativeFile = file.startsWith("/") ? file.replace(`${process.cwd()}/`, "") : file;
            const workspaceDir = getWorkspaceDir(relativeFile);
            if (workspaceDir) {
                const workspaceRelativeFile = relativeFile.replace(`${workspaceDir}/`, "");
                commands.push(`cd ${workspaceDir} && bun run test -- ${workspaceRelativeFile}`);
            } else {
                console.warn(`Warning: Test file ${relativeFile} is not in a workspace directory and will be skipped`);
            }
        }
        return commands;
    },
};

export default config;
