#!/usr/bin/env bun

import { $ } from "bun";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { LoadingBar, logSection, logSubStep } from "./env";

const ERROR_PATTERN = /Error:\s*([^\n]+)/;
const DUPLICATE_KEY_PATTERN = /Duplicate key name/i;
const NON_CRITICAL_ERRORS = [DUPLICATE_KEY_PATTERN];

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

function isNonCriticalError(error: unknown): boolean {
    const errorObj = error as { stderr?: { toString(): string }; stdout?: { toString(): string }; message?: string };
    const errorMessage =
        errorObj?.stderr?.toString() ?? errorObj?.stdout?.toString() ?? errorObj?.message ?? String(error);
    return NON_CRITICAL_ERRORS.some((pattern) => pattern.test(errorMessage));
}

function handleMigrationError(error: unknown, loadingBar: LoadingBar): void {
    const isNonCritical = isNonCriticalError(error);
    if (isNonCritical) {
        loadingBar.stop(true, "データベースマイグレーションが完了しました（一部の警告あり）");
    } else {
        loadingBar.stop(false, "データベースマイグレーションに失敗しました");
    }

    if (process.env.DEBUG) {
        console.error(error);
        return;
    }

    const shortError = extractErrorMessage(error);
    if (shortError) {
        logSubStep(formatErrorMessage(shortError), "warning");
    }
}

function buildMySQLUrl(): string {
    const mysqlUser = process.env.MYSQL_USER || "user";
    const mysqlPassword = process.env.MYSQL_PASSWORD || "password";
    const mysqlDatabase = process.env.MYSQL_DATABASE || "portfolio";
    const mysqlHost = process.env.MYSQL_HOST || "localhost";
    const mysqlPort = process.env.MYSQL_PORT || "3306";
    return `mysql://${mysqlUser}:${mysqlPassword}@${mysqlHost}:${mysqlPort}/${mysqlDatabase}`;
}

async function runMySQLMigration(rootDir: string): Promise<void> {
    const loadingBar = new LoadingBar("ローカルMySQLに対してマイグレーションを実行しています");
    loadingBar.start();
    const dbDir = join(rootDir, "packages/db");
    const schemaPath = join(dbDir, "prisma/schema/schema.prisma");

    if (!existsSync(schemaPath)) {
        loadingBar.stop(false, "スキーマファイルが見つかりません");
        return;
    }

    const mysqlUrl = buildMySQLUrl();
    const originalSchema = readFileSync(schemaPath, "utf-8");
    const mysqlSchema = originalSchema.replace(/provider\s*=\s*"sqlite"/, 'provider = "mysql"');
    writeFileSync(schemaPath, mysqlSchema);

    try {
        await $`DATABASE_URL=${mysqlUrl} bun run deploy`.cwd(dbDir).quiet();
        loadingBar.stop(true, "データベースマイグレーションが完了しました");
    } catch (error: unknown) {
        handleMigrationError(error, loadingBar);
    } finally {
        writeFileSync(schemaPath, originalSchema);
    }
}

async function runD1Migration(rootDir: string): Promise<void> {
    const loadingBar = new LoadingBar("Cloudflare D1に対してマイグレーションを実行しています");
    loadingBar.start();
    const dbDir = join(rootDir, "packages/db");

    try {
        await $`bun run migrate`.cwd(dbDir).quiet();
        loadingBar.stop(true, "データベースマイグレーションが完了しました");
    } catch (error: unknown) {
        handleMigrationError(error, loadingBar);
    }
}

export async function runDatabaseMigrations(rootDir: string): Promise<void> {
    logSection("🔄 データベースマイグレーション");
    const containerName = "db";
    const isRunning = await checkContainerRunning(containerName);

    if (isRunning) {
        await runMySQLMigration(rootDir);
    } else {
        await runD1Migration(rootDir);
    }
}
