#!/usr/bin/env bun

import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { $ } from "bun";

const rootDir = resolve(import.meta.dir, "..");

async function checkBunInstalled(): Promise<boolean> {
	try {
		await $`bun --version`.quiet();
		return true;
	} catch {
		return false;
	}
}

async function setupEnvFile(): Promise<void> {
	const envExamplePath = join(rootDir, ".env.example");
	const envPath = join(rootDir, ".env");

	if (existsSync(envPath)) {
		console.log("✓ .envファイルは既に存在します");
		return;
	}

	if (existsSync(envExamplePath)) {
		console.log("📝 .env.exampleから.envファイルを作成しています...");
		copyFileSync(envExamplePath, envPath);
		console.log("✓ .envファイルを作成しました");
	} else {
		console.log(
			"⚠️  .env.exampleが見つかりません。空の.envファイルを作成します...",
		);
		writeFileSync(envPath, "# Environment variables\n");
		console.log("✓ 空の.envファイルを作成しました");
	}
}

async function installDependencies(): Promise<void> {
	console.log("📦 依存関係をインストールしています...");
	try {
		await $`bun install`.cwd(rootDir);
		console.log("✓ 依存関係のインストールが完了しました");
	} catch (error) {
		console.error("✗ 依存関係のインストールに失敗しました:", error);
		throw error;
	}
}

async function generatePrismaSchema(): Promise<void> {
	console.log("🗄️  Prismaスキーマを生成しています...");
	try {
		await $`bun run generate`.cwd(join(rootDir, "packages/db"));
		console.log("✓ Prismaスキーマの生成が完了しました");
	} catch (error) {
		console.warn("⚠️  Prismaスキーマの生成に失敗しました（スキップ）:", error);
	}
}

async function runDatabaseMigrations(): Promise<void> {
	console.log("🔄 データベースマイグレーションを実行しています...");

	const containerName = "portfolio-mysql";
	const isRunning = await checkContainerRunning(containerName);

	if (isRunning) {
		console.log("  ローカルMySQLに対してマイグレーションを実行しています...");
		const dbDir = join(rootDir, "packages/db");
		const schemaPath = join(dbDir, "prisma/schema.prisma");
		const mysqlUser = process.env.MYSQL_USER || "portfolio";
		const mysqlPassword = process.env.MYSQL_PASSWORD || "portfolio";
		const mysqlDatabase = process.env.MYSQL_DATABASE || "portfolio";
		const mysqlHost = process.env.MYSQL_HOST || "localhost";
		const mysqlPort = process.env.MYSQL_PORT || "3306";
		const mysqlUrl = `mysql://${mysqlUser}:${mysqlPassword}@${mysqlHost}:${mysqlPort}/${mysqlDatabase}`;

		try {
			const originalSchema = readFileSync(schemaPath, "utf-8");

			const mysqlSchema = originalSchema.replace(
				/provider\s*=\s*"sqlite"/,
				'provider = "mysql"',
			);
			writeFileSync(schemaPath, mysqlSchema);

			try {
				await $`DATABASE_URL=${mysqlUrl} bun run push`.cwd(dbDir);
				console.log("✓ データベースマイグレーションが完了しました");
			} finally {
				writeFileSync(schemaPath, originalSchema);
			}
		} catch (error) {
			console.warn(
				"⚠️  データベースマイグレーションに失敗しました（スキップ）:",
				error,
			);
		}
	} else {
		console.log("  Cloudflare D1に対してマイグレーションを実行しています...");
		try {
			await $`bun run migrate`.cwd(join(rootDir, "packages/db"));
			console.log("✓ データベースマイグレーションが完了しました");
		} catch (error) {
			console.warn(
				"⚠️  データベースマイグレーションに失敗しました（スキップ）:",
				error,
			);
		}
	}
}

async function checkDockerInstalled(): Promise<boolean> {
	try {
		await $`docker --version`.quiet();
		return true;
	} catch {
		return false;
	}
}

async function checkContainerExists(containerName: string): Promise<boolean> {
	try {
		const result =
			await $`docker ps -a --filter name=^${containerName}$ --format {{.Names}}`.quiet();
		return result.stdout.toString().trim() === containerName;
	} catch {
		return false;
	}
}

async function checkContainerRunning(containerName: string): Promise<boolean> {
	try {
		const result =
			await $`docker ps --filter name=^${containerName}$ --format {{.Names}}`.quiet();
		return result.stdout.toString().trim() === containerName;
	} catch {
		return false;
	}
}

async function waitForMySQL(
	containerName: string,
	maxAttempts = 30,
): Promise<boolean> {
	console.log("  MySQLの起動を待機しています...");
	const mysqlRootPassword = process.env.MYSQL_ROOT_PASSWORD || "rootpassword";
	for (let i = 0; i < maxAttempts; i++) {
		try {
			const result =
				await $`docker exec ${containerName} mysqladmin ping -h localhost -u root -p${mysqlRootPassword}`.quiet();
			if (result.exitCode === 0) {
				console.log("  ✓ MySQLが起動しました");
				return true;
			}
		} catch {
			// まだ起動していない
		}
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}
	return false;
}

async function startMySQLContainer(): Promise<void> {
	const containerName = "portfolio-mysql";
	const dbDir = join(rootDir, ".docker/db");
	const dbDockerfilePath = join(dbDir, "Dockerfile");

	if (!existsSync(dbDockerfilePath)) {
		console.log("  ⚠️  MySQL Dockerfileが見つかりません（スキップ）");
		return;
	}

	try {
		const dockerInstalled = await checkDockerInstalled();
		if (!dockerInstalled) {
			console.warn("  ⚠️  Dockerがインストールされていません（スキップ）");
			return;
		}

		console.log("  MySQL Dockerイメージをビルドしています...");
		await $`docker build -t portfolio-mysql -f ${dbDockerfilePath} ${dbDir}`.cwd(
			rootDir,
		);
		console.log("  ✓ MySQL Dockerイメージのビルドが完了しました");

		const containerExists = await checkContainerExists(containerName);

		if (containerExists) {
			const isRunning = await checkContainerRunning(containerName);
			if (isRunning) {
				console.log("  ✓ MySQLコンテナは既に起動しています");
				await waitForMySQL(containerName);
				return;
			} else {
				console.log("  MySQLコンテナを起動しています...");
				await $`docker start ${containerName}`.cwd(rootDir);
				await waitForMySQL(containerName);
				return;
			}
		}

		console.log("  MySQLコンテナを作成して起動しています...");
		const mysqlRootPassword = process.env.MYSQL_ROOT_PASSWORD || "rootpassword";
		const mysqlDatabase = process.env.MYSQL_DATABASE || "portfolio";
		const mysqlUser = process.env.MYSQL_USER || "portfolio";
		const mysqlPassword = process.env.MYSQL_PASSWORD || "portfolio";
		await $`docker run -d \
            --name ${containerName} \
            -p 3306:3306 \
            -e MYSQL_ROOT_PASSWORD=${mysqlRootPassword} \
            -e MYSQL_DATABASE=${mysqlDatabase} \
            -e MYSQL_USER=${mysqlUser} \
            -e MYSQL_PASSWORD=${mysqlPassword} \
            -v portfolio-mysql-data:/var/lib/mysql \
            portfolio-mysql`.cwd(rootDir);
		console.log("  ✓ MySQLコンテナが起動しました");

		const isReady = await waitForMySQL(containerName);
		if (!isReady) {
			console.warn("  ⚠️  MySQLの起動確認がタイムアウトしました");
		}
	} catch (error) {
		console.warn("  ⚠️  MySQLコンテナの起動に失敗しました（スキップ）:", error);
	}
}

async function buildDockerImages(): Promise<void> {
	console.log("🐳 Dockerイメージをビルドしています...");

	const e2eDockerfilePath = join(rootDir, ".docker/e2e/Dockerfile");
	if (existsSync(e2eDockerfilePath)) {
		try {
			console.log("  E2E用Dockerイメージをビルドしています...");
			await $`docker build -t portfolio-e2e -f ${e2eDockerfilePath} .`.cwd(
				rootDir,
			);
			console.log("  ✓ E2E用Dockerイメージのビルドが完了しました");
		} catch (error) {
			console.warn(
				"  ⚠️  E2E用Dockerイメージのビルドに失敗しました（スキップ）:",
				error,
			);
		}
	}

	await startMySQLContainer();
}

console.log("🚀 開発環境のセットアップを開始します...\n");

const bunInstalled = await checkBunInstalled();
if (!bunInstalled) {
	console.error("✗ Bunがインストールされていません。");
	console.error("  Bunをインストールしてください: https://bun.sh");
	process.exit(1);
}
console.log("✓ Bunがインストールされています\n");

const shouldSkipInstall =
	process.env.SKIP_INSTALL === "true" ||
	process.env.npm_lifecycle_event === "prepare";

try {
	await setupEnvFile();

	if (shouldSkipInstall) {
		console.log(
			"📦 依存関係のインストールをスキップしました（prepareスクリプトから実行中）",
		);
	} else {
		await installDependencies();
	}

	await generatePrismaSchema();
	await buildDockerImages();
	await runDatabaseMigrations();

	console.log("\n✅ セットアップが完了しました！");
	console.log("\n次のステップ:");
	console.log("  - .envファイルを編集して環境変数を設定してください");
	console.log("  - bun run dev で開発サーバーを起動できます");
} catch (error) {
	console.error("\n✗ セットアップ中にエラーが発生しました:", error);
	process.exit(1);
}
