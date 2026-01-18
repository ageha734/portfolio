#!/usr/bin/env bun

import { $ } from "bun";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { LoadingBar, logSection, logSubStep } from "./env";

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
        const result = await $`docker ps -a --filter name=^${containerName}$ --format {{.Names}}`.quiet();
        return result.stdout.toString().trim() === containerName;
    } catch {
        return false;
    }
}

async function checkContainerRunning(containerName: string): Promise<boolean> {
    try {
        const result = await $`docker ps --filter name=^${containerName}$ --format {{.Names}}`.quiet();
        return result.stdout.toString().trim() === containerName;
    } catch {
        return false;
    }
}

async function checkImageExists(imageName: string): Promise<boolean> {
    try {
        const result = await $`docker images --format {{.Repository}}:{{.Tag}}`.quiet();
        const images = result.stdout.toString().trim().split("\n");
        return images.some((img) => img.startsWith(`${imageName}:`) || img === imageName);
    } catch {
        return false;
    }
}

async function buildMySQLImageWithLoadingBar(rootDir: string, dbDockerfilePath: string, dbDir: string): Promise<void> {
    const loadingBar = new LoadingBar("MySQL Dockerイメージをビルドしています");
    loadingBar.start();
    try {
        await $`docker build -t db -f ${dbDockerfilePath} ${dbDir}`.cwd(rootDir).quiet();
        loadingBar.stop(true, "MySQL Dockerイメージのビルドが完了しました");
    } catch (error) {
        loadingBar.stop(false, "MySQL Dockerイメージのビルドに失敗しました");
        throw error;
    }
}

async function buildMySQLImageWithoutLoadingBar(rootDir: string, dbDockerfilePath: string, dbDir: string): Promise<void> {
    logSubStep("MySQL Dockerイメージをビルドしています...", "info");
    try {
        await $`docker build -t db -f ${dbDockerfilePath} ${dbDir}`.cwd(rootDir).quiet();
        logSubStep("MySQL Dockerイメージのビルドが完了しました", "success");
    } catch (error) {
        logSubStep("MySQL Dockerイメージのビルドに失敗しました", "warning");
        throw error;
    }
}

async function buildE2EImageWithLoadingBar(rootDir: string, e2eDockerfilePath: string): Promise<void> {
    const loadingBar = new LoadingBar("E2E用Dockerイメージをビルドしています");
    loadingBar.start();
    try {
        await $`docker build -t e2e -f ${e2eDockerfilePath} .`.cwd(rootDir).quiet();
        loadingBar.stop(true, "E2E用Dockerイメージのビルドが完了しました");
    } catch (error) {
        loadingBar.stop(false, "E2E用Dockerイメージのビルドに失敗しました");
        throw error;
    }
}

async function buildE2EImageWithoutLoadingBar(rootDir: string, e2eDockerfilePath: string): Promise<void> {
    logSubStep("E2E用Dockerイメージをビルドしています...", "info");
    try {
        await $`docker build -t e2e -f ${e2eDockerfilePath} .`.cwd(rootDir).quiet();
        logSubStep("E2E用Dockerイメージのビルドが完了しました", "success");
    } catch (error) {
        logSubStep("E2E用Dockerイメージのビルドに失敗しました", "warning");
        throw error;
    }
}

async function checkMySQLReady(containerName: string, mysqlRootPassword: string): Promise<boolean> {
    try {
        const result = await $`docker exec -e MYSQL_PWD=${mysqlRootPassword} ${containerName} mysqladmin ping -h localhost -u root`.quiet();
        return result.exitCode === 0;
    } catch {
        return false;
    }
}

function stopLoadingBar(loadingBar: LoadingBar | null, success: boolean, message: string): void {
    if (loadingBar) {
        loadingBar.stop(success, message);
    } else {
        logSubStep(message, success ? "success" : "warning");
    }
}

async function waitForMySQLLoop(containerName: string, mysqlRootPassword: string, maxAttempts: number): Promise<boolean> {
    for (let i = 0; i < maxAttempts; i++) {
        const isReady = await checkMySQLReady(containerName, mysqlRootPassword);
        if (isReady) {
            return true;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    return false;
}

async function waitForMySQL(containerName: string, useLoadingBar = true, maxAttempts = 30): Promise<boolean> {
    const mysqlRootPassword = process.env.MYSQL_ROOT_PASSWORD || "rootpassword";
    const loadingBar = useLoadingBar ? new LoadingBar("MySQLの起動を待機しています") : null;

    if (loadingBar) {
        loadingBar.start();
    }

    try {
        const isReady = await waitForMySQLLoop(containerName, mysqlRootPassword, maxAttempts);
        if (isReady) {
            stopLoadingBar(loadingBar, true, "MySQLが起動しました");
            return true;
        }
        stopLoadingBar(loadingBar, false, "MySQLの起動確認がタイムアウトしました");
        return false;
    } catch {
        stopLoadingBar(loadingBar, false, "MySQLの起動確認に失敗しました");
        return false;
    }
}

async function handleExistingContainer(containerName: string, rootDir: string, useLoadingBar: boolean): Promise<void> {
    const isRunning = await checkContainerRunning(containerName);
    if (isRunning) {
        logSubStep("MySQLコンテナは既に起動しています", "success");
        await waitForMySQL(containerName, useLoadingBar);
        return;
    }

    logSubStep("MySQLコンテナを起動しています...", "info");
    await $`docker start ${containerName}`.cwd(rootDir).quiet();
    await waitForMySQL(containerName, useLoadingBar);
}

async function createAndStartContainer(containerName: string, rootDir: string, useLoadingBar: boolean): Promise<void> {
    logSubStep("MySQLコンテナを作成して起動しています...", "info");
    const mysqlRootPassword = process.env.MYSQL_ROOT_PASSWORD || "rootpassword";
    const mysqlDatabase = process.env.MYSQL_DATABASE || "portfolio";
    const mysqlUser = process.env.MYSQL_USER || "user";
    const mysqlPassword = process.env.MYSQL_PASSWORD || "password";
    await $`docker run -d \
        --name ${containerName} \
        -p 3306:3306 \
        -e MYSQL_ROOT_PASSWORD=${mysqlRootPassword} \
        -e MYSQL_DATABASE=${mysqlDatabase} \
        -e MYSQL_USER=${mysqlUser} \
        -e MYSQL_PASSWORD=${mysqlPassword} \
        -v db-data:/var/lib/mysql \
        db`.cwd(rootDir).quiet();
    logSubStep("MySQLコンテナが起動しました", "success");

    const isReady = await waitForMySQL(containerName, useLoadingBar);
    if (!isReady) {
        logSubStep("MySQLの起動確認がタイムアウトしました", "warning");
    }
}

async function startMySQLContainer(rootDir: string, useLoadingBar = true): Promise<void> {
    const containerName = "db";
    const dbDir = join(rootDir, ".docker/db");
    const dbDockerfilePath = join(dbDir, "Dockerfile");

    if (!existsSync(dbDockerfilePath)) {
        logSubStep("MySQL Dockerfileが見つかりません", "warning");
        return;
    }

    try {
        const dockerInstalled = await checkDockerInstalled();
        if (!dockerInstalled) {
            logSubStep("Dockerがインストールされていません", "warning");
            return;
        }

        const imageExists = await checkImageExists("db");
        if (imageExists) {
            logSubStep("MySQL Dockerイメージは既に存在します", "success");
        } else if (useLoadingBar) {
            await buildMySQLImageWithLoadingBar(rootDir, dbDockerfilePath, dbDir);
        } else {
            await buildMySQLImageWithoutLoadingBar(rootDir, dbDockerfilePath, dbDir);
        }

        const containerExists = await checkContainerExists(containerName);
        if (containerExists) {
            await handleExistingContainer(containerName, rootDir, useLoadingBar);
            return;
        }

        await createAndStartContainer(containerName, rootDir, useLoadingBar);
    } catch (error) {
        logSubStep("MySQLコンテナの起動に失敗しました", "warning");
        if (process.env.DEBUG) {
            console.error(error);
        }
    }
}

export async function buildDockerImages(rootDir: string, useLoadingBar = true): Promise<void> {
    logSection("🐳 Dockerイメージのビルド");
    const e2eDockerfilePath = join(rootDir, ".docker/e2e/Dockerfile");

    if (existsSync(e2eDockerfilePath)) {
        try {
            const imageExists = await checkImageExists("e2e");
            if (imageExists) {
                logSubStep("E2E用Dockerイメージは既に存在します", "success");
            } else if (useLoadingBar) {
                await buildE2EImageWithLoadingBar(rootDir, e2eDockerfilePath);
            } else {
                await buildE2EImageWithoutLoadingBar(rootDir, e2eDockerfilePath);
            }
        } catch (error) {
            logSubStep("E2E用Dockerイメージのビルドに失敗しました", "warning");
            if (process.env.DEBUG) {
                console.error(error);
            }
        }
    }

    await startMySQLContainer(rootDir, useLoadingBar);
}
