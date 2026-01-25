import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import pc from "picocolors";
import { LoadingBar, logStep } from "./utils";

declare const Bun: {
    spawn: (args: string[], options?: { stdout?: "inherit" | "pipe"; stderr?: "inherit" | "pipe"; cwd?: string }) => {
        exited: Promise<number>;
        exitCode: number | null;
        stdout: ReadableStream | null;
        stderr: ReadableStream | null;
    };
};

export interface PackageInfo {
    dir: string;
    name: string;
    files: string[];
}

export function findRepoRoot(startDir: string = process.cwd()): string {
    let currentDir = resolve(startDir);
    const root = resolve("/");

    while (currentDir !== root) {
        const packageJsonPath = join(currentDir, "package.json");
        if (existsSync(packageJsonPath)) {
            return currentDir;
        }
        currentDir = resolve(currentDir, "..");
    }

    return process.cwd();
}

export function findNearestPackage(filePath: string, repoRoot: string): string | null {
    if (!existsSync(filePath)) {
        return null;
    }

    let currentDir = dirname(filePath);
    while (currentDir.startsWith(repoRoot)) {
        const packageJsonPath = join(currentDir, "package.json");
        if (existsSync(packageJsonPath)) {
            return currentDir;
        }
        if (currentDir === repoRoot) {
            break;
        }
        currentDir = resolve(currentDir, "..");
    }

    return null;
}

export function hasScript(packageDir: string, scriptName: string): boolean {
    try {
        const pkgPath = join(packageDir, "package.json");
        const pkgContent = readFileSync(pkgPath, "utf-8");
        const pkg = JSON.parse(pkgContent);
        return Boolean(pkg.scripts?.[scriptName]);
    } catch {
        return false;
    }
}

export function groupFilesByPackage(files: string[], repoRoot: string): Map<string, PackageInfo> {
    const packageMap = new Map<string, PackageInfo>();

    for (const file of files) {
        const absolutePath = file.startsWith("/") ? file : resolve(repoRoot, file);
        const packageDir = findNearestPackage(absolutePath, repoRoot);

        if (!packageDir) {
            logStep("⚠️", `Skipping ${file}: no package.json found`, "warning");
            continue;
        }

        const packageName = relative(repoRoot, packageDir) || "root";
        const relPath = relative(packageDir, absolutePath);

        if (!packageMap.has(packageDir)) {
            packageMap.set(packageDir, {
                dir: packageDir,
                name: packageName,
                files: [],
            });
        }

        packageMap.get(packageDir)!.files.push(relPath);
    }

    return packageMap;
}

export async function runPackageCommand(
    packageInfo: PackageInfo,
    commandName: string,
    _repoRoot: string,
): Promise<{ success: boolean; skipped: boolean; exitCode?: number }> {
    if (!hasScript(packageInfo.dir, commandName)) {
        logStep("⚠️", `${packageInfo.name}: script "${commandName}" not found`, "warning");
        return { success: false, skipped: true };
    }

    const loadingBar = new LoadingBar(`Running ${commandName} in ${packageInfo.name}...`);
    loadingBar.start();

    try {
        const child = Bun.spawn(["bun", "run", commandName, "--", ...packageInfo.files], {
            cwd: packageInfo.dir,
            stdout: "pipe",
            stderr: "pipe",
        });

        const result = await child.exited;
        loadingBar.stop(result === 0, `${packageInfo.name}: ${commandName} ${result === 0 ? "completed" : "failed"}`);

        if (result !== 0) {
            const stderr = await new Response(child.stderr).text();
            if (stderr) {
                console.error(pc.red(`\nError in ${packageInfo.name}:`));
                console.error(stderr);
            }
            return { success: false, skipped: false, exitCode: result };
        }

        return { success: true, skipped: false };
    } catch (error) {
        loadingBar.stop(false, `${packageInfo.name}: ${commandName} failed`);
        console.error(pc.red(`\nError in ${packageInfo.name}:`), error);
        return { success: false, skipped: false };
    }
}

export async function runPackageCommands(
    packageMap: Map<string, PackageInfo>,
    commandName: string,
    repoRoot: string,
    parallel: boolean = true,
): Promise<boolean> {
    if (packageMap.size === 0) {
        logStep("ℹ️", "No packages to process", "info");
        return true;
    }

    const packages = Array.from(packageMap.values());

    if (parallel) {
        const results = await Promise.all(
            packages.map((pkg) => runPackageCommand(pkg, commandName, repoRoot)),
        );

        const successful = results
            .map((r, i) => ({ result: r, package: packages[i] }))
            .filter((item): item is { result: { success: boolean; skipped: boolean; exitCode?: number }; package: PackageInfo } => 
                item.result.success && item.package !== undefined
            )
            .map(({ package: pkg }) => pkg.name);
        const hasError = results.some((r) => !r.success && !r.skipped);

        if (successful.length > 0) {
            logStep("✓", `Processed ${successful.length} package(s): ${successful.join(", ")}`, "success");
        }

        return !hasError;
    } else {
        let hasError = false;
        const successful: string[] = [];

        for (const pkg of packages) {
            const result = await runPackageCommand(pkg, commandName, repoRoot);
            if (result.success) {
                successful.push(pkg.name);
            } else if (!result.skipped) {
                hasError = true;
            }
        }

        if (successful.length > 0) {
            logStep("✓", `Processed ${successful.length} package(s): ${successful.join(", ")}`, "success");
        }

        return !hasError;
    }
}
