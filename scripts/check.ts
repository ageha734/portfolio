#!/usr/bin/env bun

/**
 * リント・フォーマット・テスト・カバレッジチェックスクリプト
 *
 * コマンドオプションで動作を制御:
 * - --check-type: "lint" (デフォルト), "fmt", "test", "coverage"
 * - --lint-type: "ts" (デフォルト), "tsp", "md", "shell", "actions"
 * - --fix: 修正モード（フラグ）
 *
 * 引数なし: デフォルトパス全体をチェック/修正
 * 引数あり: 指定されたファイルのみをチェック/修正
 *
 * 例:
 * - bun scripts/check.ts --check-type=fmt --lint-type=ts
 * - bun scripts/check.ts --lint-type=md --fix file.md
 * - bun scripts/check.ts --check-type=test
 * - bun scripts/check.ts --check-type=coverage file.ts
 */

import { existsSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { $, spawn } from "bun";

type CheckType = "lint" | "fmt" | "test" | "coverage";
type LintType = "ts" | "tsp" | "md" | "shell" | "actions" | "textlint";

interface Config {
	checkType: CheckType;
	lintType: LintType;
	isFix: boolean;
}

function findRootDir(startDir: string = process.cwd()): string {
	let currentDir = resolve(startDir);
	const root = resolve("/");

	while (currentDir !== root) {
		const packageJsonPath = join(currentDir, "package.json");
		const turboJsonPath = join(currentDir, "turbo.json");

		if (existsSync(packageJsonPath) && existsSync(turboJsonPath)) {
			return currentDir;
		}

		currentDir = resolve(currentDir, "..");
	}

	return process.cwd();
}

const ROOT_DIR = findRootDir();

function parseArgs(): { config: Config; files: string[] } {
	const args = process.argv.slice(2);
	let checkType: CheckType = "lint";
	let lintType: LintType = "ts";
	let isFix = false;
	const files: string[] = [];

	for (const arg of args) {
		if (arg.startsWith("--check-type=")) {
			checkType = arg.split("=")[1] as CheckType;
		} else if (arg.startsWith("--lint-type=")) {
			lintType = arg.split("=")[1] as LintType;
		} else if (arg === "--fix") {
			isFix = true;
		} else if (!arg.startsWith("--")) {
			files.push(arg);
		}
	}

	return {
		config: { checkType, lintType, isFix },
		files,
	};
}

function getWorkspaceFromPath(filePath: string): string | null {
	const absolutePath = resolve(ROOT_DIR, filePath);
	const relativePath = relative(ROOT_DIR, absolutePath);

	const workspacePatterns = [
		/^apps\/([^/]+)/,
		/^packages\/([^/]+)/,
		/^tooling\/([^/]+)/,
		/^testing\/([^/]+)/,
	];

	for (const pattern of workspacePatterns) {
		const match = relativePath.match(pattern);
		if (match) {
			return match[1];
		}
	}

	return null;
}

function getDefaultPath(lintType: LintType): string[] {
	switch (lintType) {
		case "tsp":
			return [join(ROOT_DIR, "packages/api/"), join(ROOT_DIR, "api/")];
		case "md":
			return [join(ROOT_DIR, "docs/prompt/"), join(ROOT_DIR, "apps/docs/")];
		case "shell": {
			const scriptsDir = join(ROOT_DIR, "scripts");
			try {
				const files = readdirSync(scriptsDir)
					.filter((f) => f.endsWith(".sh"))
					.map((f) => join(ROOT_DIR, "scripts", f));
				return files.length > 0 ? files : [];
			} catch {
				return [];
			}
		}
		case "actions":
			return [join(ROOT_DIR, ".github/")];
		case "textlint":
			return [join(ROOT_DIR, "docs/prompt/"), join(ROOT_DIR, "apps/docs/")];
		default:
			return [
				join(ROOT_DIR, "apps/*/app/"),
				join(ROOT_DIR, "packages/*/src/"),
				join(ROOT_DIR, "tooling/*/src/"),
				join(ROOT_DIR, "testing/*/src/"),
			];
	}
}

function getTestFilePath(sourceFile: string): string | null {
	const testFile = sourceFile.replace(/\.(ts|tsx)$/, ".test.$1");
	return existsSync(testFile) ? testFile : null;
}

function getSourceFilePath(testFile: string): string | null {
	const sourceFile = testFile.replace(/\.test\.(ts|tsx)$/, ".$1");
	return existsSync(sourceFile) ? sourceFile : null;
}

async function checkFileCoverage(sourceFile: string): Promise<void> {
	const absoluteSourceFile = resolve(ROOT_DIR, sourceFile);
	const vitestPath = join(ROOT_DIR, "node_modules", ".bin", "vitest");
	const testFile = getTestFilePath(absoluteSourceFile);

	if (!testFile) {
		console.error(`Error: Test file not found for ${sourceFile}`);
		process.exit(1);
	}

	await $`${vitestPath} run --coverage --coverage.include=${absoluteSourceFile} --coverage.threshold.lines=100 --coverage.threshold.functions=100 --coverage.threshold.branches=100 --coverage.threshold.statements=100 ${testFile}`
		.cwd(ROOT_DIR)
		.env({
			NODE_ENV: "test",
			PATH: process.env.PATH || "",
		});
}

async function runTest(files: string[], lintType: LintType): Promise<void> {
	if (lintType !== "ts") {
		console.error(
			`Error: --lint-type=${lintType} is not supported for test. Only --lint-type=ts is supported.`,
		);
		process.exit(1);
	}
	const absoluteFiles = files.map((f) => resolve(ROOT_DIR, f));
	const vitestPath = join(ROOT_DIR, "node_modules", ".bin", "vitest");
	await $`${vitestPath} run ${absoluteFiles}`.cwd(ROOT_DIR).env({
		NODE_ENV: "test",
		PATH: process.env.PATH || "",
	});
}

async function runCoverage(files: string[], lintType: LintType): Promise<void> {
	if (lintType !== "ts") {
		console.error(
			`Error: --lint-type=${lintType} is not supported for coverage. Only --lint-type=ts is supported.`,
		);
		process.exit(1);
	}
	const vitestPath = join(ROOT_DIR, "node_modules", ".bin", "vitest");

	if (files.length > 0) {
		const sourceFiles = files
			.map((f) => {
				const absolutePath = resolve(ROOT_DIR, f);
				if (f.includes(".test.")) {
					return getSourceFilePath(absolutePath);
				}
				return absolutePath;
			})
			.filter((f): f is string => f !== null);

		if (sourceFiles.length === 0) {
			console.error("Error: No source files found");
			process.exit(1);
		}

		for (const sourceFile of sourceFiles) {
			await checkFileCoverage(relative(ROOT_DIR, sourceFile));
		}
		return;
	}

	await $`${vitestPath} run --coverage`.cwd(ROOT_DIR).env({
		NODE_ENV: "test",
		PATH: process.env.PATH || "",
	});
}

async function runTspCommand(
	tspPath: string,
	checkType: CheckType,
	isFix: boolean,
	files: string[],
): Promise<void> {
	const absoluteFiles = files.map((f) => resolve(ROOT_DIR, f));
	if (checkType === "fmt") {
		if (isFix) {
			await $`${tspPath} format ${absoluteFiles}`.cwd(ROOT_DIR);
		} else {
			await $`${tspPath} format --check ${absoluteFiles}`.cwd(ROOT_DIR);
		}
		return;
	}

	if (isFix) {
		await $`${tspPath} compile ${absoluteFiles}`.cwd(ROOT_DIR);
	} else {
		await $`${tspPath} compile ${absoluteFiles} --warn-as-error`.cwd(ROOT_DIR);
	}
}

async function runTsCommand(
	biomePath: string,
	checkType: CheckType,
	isFix: boolean,
	files: string[],
): Promise<void> {
	const workspaces = new Set<string>();
	const rootFiles: string[] = [];

	for (const file of files) {
		const absoluteFile = resolve(ROOT_DIR, file);
		const workspace = getWorkspaceFromPath(absoluteFile);
		if (workspace) {
			workspaces.add(workspace);
		} else {
			rootFiles.push(absoluteFile);
		}
	}

	if (workspaces.size > 0) {
		const workspaceList = Array.from(workspaces);
		const filter = workspaceList.map((w) => `--filter=${w}`).join(" ");
		const command =
			checkType === "fmt"
				? isFix
					? "fmt"
					: "fmt:check"
				: isFix
					? "lint:fix"
					: "lint";
		await $`turbo run ${command} ${filter}`.cwd(ROOT_DIR);
	}

	if (rootFiles.length > 0) {
		if (checkType === "fmt") {
			if (isFix) {
				await $`${biomePath} format --write ${rootFiles}`.cwd(ROOT_DIR);
			} else {
				await $`${biomePath} format ${rootFiles}`.cwd(ROOT_DIR);
			}
		} else {
			if (isFix) {
				await $`${biomePath} lint --write ${rootFiles}`.cwd(ROOT_DIR);
			} else {
				await $`${biomePath} lint ${rootFiles}`.cwd(ROOT_DIR);
			}
		}
	}
}

async function runMdCommand(
	checkType: CheckType,
	isFix: boolean,
	files: string[],
): Promise<void> {
	const absoluteFiles = files.map((f) => resolve(ROOT_DIR, f));
	if (checkType === "fmt") {
		if (isFix) {
			await $`remark ${absoluteFiles} --output`.cwd(ROOT_DIR);
		} else {
			await $`remark ${absoluteFiles} --frail --quiet`.cwd(ROOT_DIR);
		}
		return;
	}

	const markdownlintPath = join(
		ROOT_DIR,
		"node_modules",
		".bin",
		"markdownlint-cli2",
	);
	if (isFix) {
		await $`${markdownlintPath} --fix ${absoluteFiles}`.cwd(ROOT_DIR);
	} else {
		await $`${markdownlintPath} ${absoluteFiles}`.cwd(ROOT_DIR);
	}
}

async function runShellCommand(
	checkType: CheckType,
	isFix: boolean,
	files: string[],
): Promise<void> {
	const absoluteFiles = files.map((f) => resolve(ROOT_DIR, f));

	// ファイルがない場合は処理をスキップ
	if (absoluteFiles.length === 0) {
		console.log("No shell files to check");
		return;
	}

	if (checkType === "fmt") {
		if (isFix) {
			await $`go run mvdan.cc/sh/v3/cmd/shfmt@v3.12.0 -w ${absoluteFiles}`.cwd(
				ROOT_DIR,
			);
		} else {
			await $`go run mvdan.cc/sh/v3/cmd/shfmt@v3.12.0 -l -d ${absoluteFiles}`.cwd(
				ROOT_DIR,
			);
		}
		return;
	}

	const relativeFiles = absoluteFiles.map((f) => relative(ROOT_DIR, f));

	await $`docker run --rm -v ${ROOT_DIR}:/work -w /work -v ${ROOT_DIR}/node_modules:/work/node_modules koalaman/shellcheck:v0.11.0 ${relativeFiles}`;
}

async function runTextlintCommand(
	checkType: CheckType,
	isFix: boolean,
	files: string[],
): Promise<void> {
	if (checkType === "fmt") {
		console.error(
			"Error: textlint does not support formatting. Use --check-type=lint instead.",
		);
		process.exit(1);
	}

	const absoluteFiles = files.map((f) => resolve(ROOT_DIR, f));
	const textlintPath = join(ROOT_DIR, "node_modules", ".bin", "textlint");
	if (isFix) {
		await $`${textlintPath} --fix ${absoluteFiles}`.cwd(ROOT_DIR);
	} else {
		await $`${textlintPath} ${absoluteFiles}`.cwd(ROOT_DIR);
	}
}

async function runActionsCommand(
	checkType: CheckType,
	isFix: boolean,
	files: string[],
): Promise<void> {
	if (checkType === "fmt") {
		const args = isFix ? [] : ["-lint"];
		args.push("-gitignore_excludes", ...files);
		const proc = spawn(
			["go", "run", "github.com/google/yamlfmt/cmd/yamlfmt@v0.20.0", ...args],
			{
				stdout: "inherit",
				stderr: "inherit",
			},
		);
		await proc.exited;
		if (proc.exitCode !== 0) {
			process.exit(proc.exitCode || 1);
		}
		return;
	}

	const actionlintProc = spawn(
		["go", "run", "github.com/rhysd/actionlint/cmd/actionlint@v1.7.9"],
		{
			stdout: "inherit",
			stderr: "inherit",
		},
	);

	const ghalintArgs = [
		"go",
		"run",
		"github.com/suzuki-shunsuke/ghalint/cmd/ghalint@v1.5.4",
		"run",
		...files,
	];
	const ghalintProc = spawn(ghalintArgs, {
		stdout: "inherit",
		stderr: "inherit",
	});

	const [actionlintExitCode, ghalintExitCode] = await Promise.all([
		actionlintProc.exited.then(() => actionlintProc.exitCode),
		ghalintProc.exited.then(() => ghalintProc.exitCode),
	]);

	if (actionlintExitCode !== 0 || ghalintExitCode !== 0) {
		process.exit(1);
	}
}

async function runLintOrFormatCommand(
	config: Config,
	files: string[],
): Promise<void> {
	const { checkType, lintType } = config;
	const nodeModulesBin = join(ROOT_DIR, "node_modules", ".bin");

	switch (lintType) {
		case "tsp": {
			const tspPath = join(nodeModulesBin, "tsp");
			await runTspCommand(tspPath, checkType, config.isFix, files);
			break;
		}
		case "md": {
			await runMdCommand(checkType, config.isFix, files);
			break;
		}
		case "shell": {
			await runShellCommand(checkType, config.isFix, files);
			break;
		}
		case "actions": {
			await runActionsCommand(checkType, config.isFix, files);
			break;
		}
		case "textlint": {
			await runTextlintCommand(checkType, config.isFix, files);
			break;
		}
		default: {
			const biomePath = join(nodeModulesBin, "biome");
			await runTsCommand(biomePath, checkType, config.isFix, files);
		}
	}
}

const { config, files: parsedFiles } = parseArgs();

try {
	if (config.checkType === "coverage") {
		await runCoverage(parsedFiles, config.lintType);
	} else if (config.checkType === "test") {
		await runTest(parsedFiles, config.lintType);
	} else {
		const defaultPath = getDefaultPath(config.lintType);
		const files = parsedFiles.length > 0 ? parsedFiles : defaultPath;
		await runLintOrFormatCommand(config, files);
	}
	process.exit(0);
} catch {
	process.exit(1);
}
