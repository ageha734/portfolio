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

import { existsSync } from "node:fs";
import { join } from "node:path";
import { $ } from "bun";

type CheckType = "lint" | "fmt" | "test" | "coverage";
type LintType = "ts" | "tsp" | "md" | "shell" | "actions";

interface Config {
    checkType: CheckType;
    lintType: LintType;
    isFix: boolean;
}

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

function getDefaultPath(lintType: LintType): string[] {
    switch (lintType) {
        case "tsp":
            return ["api/*.tsp"];
        case "md":
            return ["docs/prompt/*.md"];
        case "shell":
            return ["scripts/*.sh"];
        case "actions":
            return [".github/**/*.yml"];
        default:
            return ["app/**/*.{ts,tsx}"];
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
    const vitestPath = join(process.cwd(), "node_modules", ".bin", "vitest");
    const testFile = getTestFilePath(sourceFile);

    if (!testFile) {
        console.error(`Error: Test file not found for ${sourceFile}`);
        process.exit(1);
    }

    await $`${vitestPath} run --coverage --coverage.include=${sourceFile} --coverage.threshold.lines=100 --coverage.threshold.functions=100 --coverage.threshold.branches=100 --coverage.threshold.statements=100 ${testFile}`.env(
        {
            NODE_ENV: "test",
        },
    );
}

async function runTest(files: string[], lintType: LintType): Promise<void> {
    if (lintType !== "ts") {
        console.error(`Error: --lint-type=${lintType} is not supported for test. Only --lint-type=ts is supported.`);
        process.exit(1);
    }
    const vitestPath = join(process.cwd(), "node_modules", ".bin", "vitest");
    await $`${vitestPath} run ${files}`.env({
        NODE_ENV: "test",
    });
}

async function runCoverage(files: string[], lintType: LintType): Promise<void> {
    if (lintType !== "ts") {
        console.error(
            `Error: --lint-type=${lintType} is not supported for coverage. Only --lint-type=ts is supported.`,
        );
        process.exit(1);
    }
    const vitestPath = join(process.cwd(), "node_modules", ".bin", "vitest");

    if (files.length > 0) {
        const sourceFiles = files
            .map((f) => {
                if (f.includes(".test.")) {
                    return getSourceFilePath(f);
                }
                return f;
            })
            .filter((f): f is string => f !== null);

        if (sourceFiles.length === 0) {
            console.error("Error: No source files found");
            process.exit(1);
        }

        for (const sourceFile of sourceFiles) {
            await checkFileCoverage(sourceFile);
        }
        return;
    }

    await $`${vitestPath} run --coverage`.env({
        NODE_ENV: "test",
    });
}

async function runTspCommand(tspPath: string, checkType: CheckType, isFix: boolean, files: string[]): Promise<void> {
    if (checkType === "fmt") {
        if (isFix) {
            await $`${tspPath} format ${files}`;
        } else {
            await $`${tspPath} format --check ${files}`;
        }
        return;
    }

    if (isFix) {
        await $`${tspPath} compile ${files}`;
    } else {
        await $`${tspPath} compile ${files} --warn-as-error`;
    }
}

async function runTsCommand(biomePath: string, checkType: CheckType, isFix: boolean, files: string[]): Promise<void> {
    if (checkType === "fmt") {
        if (isFix) {
            await $`${biomePath} format --write ${files}`;
        } else {
            await $`${biomePath} format ${files}`;
        }
        return;
    }

    if (isFix) {
        await $`${biomePath} lint --write ${files}`;
    } else {
        await $`${biomePath} lint ${files}`;
    }
}

async function runMdCommand(checkType: CheckType, isFix: boolean, files: string[]): Promise<void> {
    if (checkType === "fmt") {
        if (isFix) {
            await $`remark ${files} --output`;
        } else {
            await $`remark ${files} --frail --quiet`;
        }
        return;
    }

    const markdownlintPath = join(process.cwd(), "node_modules", ".bin", "markdownlint-cli2");
    if (isFix) {
        await $`${markdownlintPath} --fix ${files}`;
    } else {
        await $`${markdownlintPath} ${files}`;
    }
}

async function runShellCommand(checkType: CheckType, isFix: boolean, files: string[]): Promise<void> {
    if (checkType === "fmt") {
        if (isFix) {
            await $`go run mvdan.cc/sh/v3/cmd/shfmt@v3.12.0 -w ${files}`;
        } else {
            await $`go run mvdan.cc/sh/v3/cmd/shfmt@v3.12.0 -l -d ${files}`;
        }
        return;
    }

    await $`docker run --rm -v ${process.cwd()}:/work -w /work -v ${process.cwd()}/node_modules:/work/node_modules koalaman/shellcheck:v0.11.0 ${files}`;
}

async function runActionsCommand(checkType: CheckType, isFix: boolean, files: string[]): Promise<void> {
    if (checkType === "fmt") {
        await $`go run github.com/google/yamlfmt/cmd/yamlfmt@v0.20.0 ${isFix ? "" : "-lint"} -gitignore_excludes ${files}`;
        return;
    }

    const actionlintPath = "go run github.com/rhysd/actionlint/cmd/actionlint@v1.7.9";
    const ghalintPath = `go run github.com/suzuki-shunsuke/ghalint/cmd/ghalint@v1.5.4 run ${files}`;

    await Promise.all([$`${actionlintPath}`, $`${ghalintPath}`]);
}

async function runLintOrFormatCommand(config: Config, files: string[]): Promise<void> {
    const { checkType, lintType } = config;
    const nodeModulesBin = join(process.cwd(), "node_modules", ".bin");

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
