#!/usr/bin/env bun

/**
 * Cloudflare Pages環境変数インポートスクリプト
 *
 * .envファイルから環境変数を読み込み、Cloudflare Pagesに設定します。
 * VITE_*で始まる環境変数のみを設定します。
 *
 * 使用方法:
 *   bun run scripts/env.ts [environment] [env-file]
 *
 * 引数:
 *   environment: 環境名（デフォルト: production）
 *   env-file: 環境変数ファイルのパス（デフォルト: .env）
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { $ } from "bun";

const PROJECT_NAME = "portfolio";
const ENVIRONMENT = process.argv[2] || "production";
const ENV_FILE = process.argv[3] || ".env";

const envFilePath = resolve(process.cwd(), ENV_FILE);

if (!existsSync(envFilePath)) {
    console.error(`Error: ${ENV_FILE} not found`);
    process.exit(1);
}

console.log(`📦 Importing environment variables from ${ENV_FILE} to Cloudflare Pages (${ENVIRONMENT})...`);
console.log("");

const envFileContent = readFileSync(envFilePath, "utf-8");
const lines = envFileContent.split("\n");

for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
        continue;
    }

    const match = trimmedLine.match(/^([A-Za-z_]\w*)=(.*)$/);
    if (!match) {
        continue;
    }

    const [, key, value] = match;

    let cleanValue = value;
    if (
        (cleanValue.startsWith('"') && cleanValue.endsWith('"')) ||
        (cleanValue.startsWith("'") && cleanValue.endsWith("'"))
    ) {
        cleanValue = cleanValue.slice(1, -1);
    }

    if (key.startsWith("VITE_")) {
        console.log(`  Setting ${key}...`);

        try {
            await $`echo ${cleanValue} | wrangler pages secret put ${key} --project-name ${PROJECT_NAME}`.quiet();
        } catch {
            console.log(`    ⚠️  Failed to set ${key} (may require interactive login)`);
        }
    }
}

console.log("");
console.log("✅ Environment variables import completed!");
console.log("");
console.log("Note: To view or manage secrets, visit:");
console.log(`  https://dash.cloudflare.com/ > Workers & Pages > ${PROJECT_NAME} > Settings > Environment variables`);
