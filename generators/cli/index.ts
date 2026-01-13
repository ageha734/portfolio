#!/usr/bin/env bun

/**
 * スキャフォールディングCLI
 *
 * Plop.jsを使用してFSD Feature、DDD Domain、UI Componentを生成します。
 *
 * 使用方法:
 * - bun run generate fsd:feature
 * - bun run generate fsd:entity
 * - bun run generate fsd:widget
 * - bun run generate ddd:domain
 * - bun run generate ddd:usecase
 * - bun run generate ddd:repository
 * - bun run generate ddd:router
 * - bun run generate component
 */

import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const plopfilePath = resolve(__dirname, "plopfile.ts");

const plop = spawn("bunx", ["plop", "--plopfile", plopfilePath, ...process.argv.slice(2)], {
    stdio: "inherit",
    cwd: resolve(__dirname, ".."),
});

plop.on("error", (err) => {
    console.error("Plop.jsの実行に失敗しました:", err);
    process.exit(1);
});

plop.on("exit", (code) => {
    process.exit(code ?? 0);
});
