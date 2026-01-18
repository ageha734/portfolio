#!/usr/bin/env bun

import { $ } from "bun";
import { join } from "node:path";
import { LoadingBar, logSection, logStep, logSubStep } from "./env";

const ERROR_PATTERN = /Error:\s*([^\n]+)/;

export async function generatePrismaSchema(rootDir: string, useLoadingBar = true): Promise<void> {
    logSection("🗄️  Prismaスキーマの生成");

    if (useLoadingBar) {
        const loadingBar = new LoadingBar("Prismaスキーマを生成しています");
        loadingBar.start();

        try {
            await $`bun run generate`.cwd(join(rootDir, "packages/db")).quiet();
            loadingBar.stop(true, "Prismaスキーマの生成が完了しました");
        } catch (error: unknown) {
            loadingBar.stop(false, "Prismaスキーマの生成に失敗しました");
            handleSchemaError(error);
        }
    } else {
        logStep("🗄️", "Prismaスキーマを生成しています...", "info");
        try {
            await $`bun run generate`.cwd(join(rootDir, "packages/db")).quiet();
            logStep("", "Prismaスキーマの生成が完了しました", "success");
        } catch (error: unknown) {
            logStep("", "Prismaスキーマの生成に失敗しました", "warning");
            handleSchemaError(error);
        }
    }
}

function handleSchemaError(error: unknown): void {
    if (process.env.DEBUG) {
        console.error(error);
        return;
    }

    const errorObj = error as { stderr?: { toString(): string }; message?: string };
    const errorMessage = errorObj?.stderr?.toString() ?? errorObj?.message ?? String(error);
    const match = ERROR_PATTERN.exec(errorMessage);
    if (match?.[1]) {
        const shortError = match[1].trim();
        const displayError = shortError.length > 80 ? `${shortError.substring(0, 77)}...` : shortError;
        logSubStep(displayError, "warning");
    }
}
