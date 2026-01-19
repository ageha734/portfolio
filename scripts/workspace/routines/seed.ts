#!/usr/bin/env bun

import { $, spawn } from "bun";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { LoadingBar, logSection, logSubStep } from "./env";

const ERROR_PATTERN = /Error:\s*([^\n]+)/;

async function checkContainerRunning(containerName: string): Promise<boolean> {
    try {
        const result = await $`docker ps --filter name=^${containerName}$ --format {{.Names}}`.quiet();
        return result.stdout.toString().trim() === containerName;
    } catch {
        return false;
    }
}

function extractErrorMessage(error: unknown): string | null {
    const errorObj = error as { stderr?: { toString(): string }; message?: string };
    const errorMessage = errorObj?.stderr?.toString() ?? errorObj?.message ?? String(error);
    const match = ERROR_PATTERN.exec(errorMessage);
    return match?.[1]?.trim() ?? null;
}

function formatErrorMessage(error: string): string {
    return error.length > 80 ? `${error.substring(0, 77)}...` : error;
}

function handleSeedError(error: unknown, loadingBar: LoadingBar): void {
    loadingBar.stop(false, "シードデータの投入に失敗しました");

    if (process.env.DEBUG) {
        console.error(error);
        return;
    }

    const shortError = extractErrorMessage(error);
    if (shortError) {
        logSubStep(formatErrorMessage(shortError), "warning");
    }
}

async function runMySQLSeed(rootDir: string): Promise<void> {
    const loadingBar = new LoadingBar("ローカルMySQLにシードデータを投入しています");
    loadingBar.start();

    const seedDir = join(rootDir, ".docker/db/seed");
    if (!existsSync(seedDir)) {
        loadingBar.stop(false, "シードディレクトリが見つかりません");
        return;
    }

    const seedFiles = readdirSync(seedDir)
        .filter((file) => file.endsWith(".sql"))
        .sort((a, b) => a.localeCompare(b))
        .map((file) => join(seedDir, file));

    if (seedFiles.length === 0) {
        loadingBar.stop(false, "シードファイルが見つかりません");
        return;
    }

    const mysqlUser = process.env.MYSQL_USER || "user";
    const mysqlPassword = process.env.MYSQL_PASSWORD || "password";
    const mysqlDatabase = process.env.MYSQL_DATABASE || "portfolio";
    const containerName = "db";

    try {
        for (const seedFile of seedFiles) {
            const fileName = seedFile.split("/").pop() || seedFile;
            logSubStep(`実行中: ${fileName}`, "info");
            const sqlContent = readFileSync(seedFile, "utf-8");

            const proc = spawn([
                "docker",
                "exec",
                "-i",
                containerName,
                "mysql",
                "-u",
                mysqlUser,
                `-p${mysqlPassword}`,
                mysqlDatabase,
            ], {
                stdin: "pipe",
                stdout: "pipe",
                stderr: "pipe",
            });

            proc.stdin.write(sqlContent);
            proc.stdin.end();

            await proc.exited;

            if (proc.exitCode !== 0) {
                const stderr = await proc.stderr.text();
                throw new Error(`Failed to execute seed file ${fileName}: ${stderr}`);
            }
        }
        loadingBar.stop(true, "シードデータの投入が完了しました");
    } catch (error: unknown) {
        handleSeedError(error, loadingBar);
        throw error;
    }
}

export async function runSeed(rootDir: string): Promise<void> {
    logSection("🌱 シードデータの投入");
    const containerName = "db";
    const isRunning = await checkContainerRunning(containerName);

    if (!isRunning) {
        logSubStep("MySQLコンテナが起動していません", "warning");
        logSubStep("コンテナを起動してから再度実行してください", "info");
        return;
    }

    await runMySQLSeed(rootDir);
}
