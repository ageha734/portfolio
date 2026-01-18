#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { $ } from "bun";

const PROJECT_NAME = "portfolio";

function parseArgs(): { environment: string; envFile: string } {
    const args = process.argv.slice(2);
    const environment = args[0] || "production";
    const envFile = args[1] || ".env";

    return { environment, envFile };
}

function parseEnvLine(line: string): { key: string; value: string } | null {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
        return null;
    }

    const pattern = /^([A-Za-z_]\w*)=(.*)$/;
    const match = pattern.exec(trimmedLine);
    if (!match) {
        return null;
    }

    const key = match[1];
    const value = match[2];

    if (!key || value === undefined) {
        return null;
    }

    let cleanValue = value;
    if (
        (cleanValue.startsWith('"') && cleanValue.endsWith('"')) ||
        (cleanValue.startsWith("'") && cleanValue.endsWith("'"))
    ) {
        cleanValue = cleanValue.slice(1, -1);
    }

    return { key, value: cleanValue };
}

async function setCloudflareSecret(key: string, value: string): Promise<boolean> {
    try {
        await $`echo ${value} | wrangler pages secret put ${key} --project-name ${PROJECT_NAME}`.quiet();
        return true;
    } catch {
        return false;
    }
}

export async function runEnv(): Promise<void> {
    const { environment, envFile } = parseArgs();
    const envFilePath = resolve(process.cwd(), envFile);

    if (!existsSync(envFilePath)) {
        console.error(`Error: ${envFile} not found`);
        process.exit(1);
    }

    console.log(`📦 Importing environment variables from ${envFile} to Cloudflare Pages (${environment})...`);
    console.log("");

    const envFileContent = readFileSync(envFilePath, "utf-8");
    const lines = envFileContent.split("\n");

    for (const line of lines) {
        const parsed = parseEnvLine(line);

        if (!parsed) {
            continue;
        }

        const { key, value } = parsed;

        if (key.startsWith("VITE_")) {
            console.log(`  Setting ${key}...`);

            const success = await setCloudflareSecret(key, value);
            if (!success) {
                console.log(`    ⚠️  Failed to set ${key} (may require interactive login)`);
            }
        }
    }

    console.log("");
    console.log("✅ Environment variables import completed!");
    console.log("");
    console.log("Note: To view or manage secrets, visit:");
    console.log(
        `  https://dash.cloudflare.com/ > Workers & Pages > ${PROJECT_NAME} > Settings > Environment variables`,
    );
}
