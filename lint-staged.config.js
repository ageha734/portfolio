import { existsSync } from "node:fs";

function getWorkspaceDir(filePath) {
	const workspacePatterns = [
		/^apps\/([^/]+)/,
		/^packages\/([^/]+)/,
		/^tooling\/([^/]+)/,
		/^testing\/([^/]+)/,
	];

	for (const pattern of workspacePatterns) {
		const match = filePath.match(pattern);
		if (match) {
			return match[0];
		}
	}

	return null;
}

function filterFilenames(filenames) {
	return filenames.filter(
		(f) =>
			!f.includes("worker-configuration.d.ts") &&
			!f.includes("/dist/") &&
			!f.includes("/build/") &&
			!f.includes("/.next/") &&
			!f.includes("/coverage/"),
	);
}

function getSourceFiles(filteredFilenames) {
	return filteredFilenames.filter(
		(f) =>
			!f.endsWith(".test.ts") &&
			!f.endsWith(".test.tsx") &&
			(f.endsWith(".ts") || f.endsWith(".tsx")),
	);
}

function getSourceFilesWithTests(sourceFiles) {
	return sourceFiles.filter((f) => {
		const testFile = f.replace(/\.(ts|tsx)$/, ".test.$1");
		return existsSync(testFile);
	});
}

function groupFilesByWorkspace(filteredFilenames) {
	const workspaceGroups = new Map();
	const rootFiles = [];

	for (const file of filteredFilenames) {
		const workspaceDir = getWorkspaceDir(file);
		if (workspaceDir) {
			if (!workspaceGroups.has(workspaceDir)) {
				workspaceGroups.set(workspaceDir, []);
			}
			workspaceGroups.get(workspaceDir).push(file);
		} else {
			rootFiles.push(file);
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
			(f) =>
				f.endsWith(".ts") ||
				f.endsWith(".tsx") ||
				f.endsWith(".js") ||
				f.endsWith(".jsx"),
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
		const workspaceDir = getWorkspaceDir(sourceFile);
		const testFile = sourceFile.replace(/\.(ts|tsx)$/, ".test.$1");
		if (workspaceDir) {
			commands.push(
				`cd ${workspaceDir} && bun run test -- ${testFile}`,
				`cd ${workspaceDir} && bun run coverage -- ${sourceFile}`,
			);
		} else {
			commands.push(
				`bun run test -- ${testFile}`,
				`bun run coverage -- ${sourceFile}`,
			);
		}
	}

	return commands;
}

const config = {
	".github/**/*.yml": (filenames) =>
		filenames.flatMap((f) => [
			`bun run fmt:actions:check -- ${f}`,
			`bun run lint:actions:check -- ${f}`,
		]),
	"*.{ts,tsx,js,jsx}": (filenames) => {
		const filteredFilenames = filterFilenames(filenames);
		const sourceFiles = getSourceFiles(filteredFilenames);
		const sourceFilesWithTests = getSourceFilesWithTests(sourceFiles);
		const hasTsFiles = filteredFilenames.some(
			(f) => f.endsWith(".ts") || f.endsWith(".tsx"),
		);

		const { workspaceGroups, rootFiles } =
			groupFilesByWorkspace(filteredFilenames);

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
		filenames.flatMap((f) => [
			`bun run fmt:shell:check -- ${f}`,
			`bun run lint:shell:check -- ${f}`,
		]),
	"*.tsp": (filenames) =>
		filenames.flatMap((f) => [
			`bun run fmt:tsp:check -- ${f}`,
			`bun run lint:tsp:check -- ${f}`,
		]),
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

export default config;
