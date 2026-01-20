#!/usr/bin/env bun

import { $ } from "bun";
import { createInterface } from "node:readline";
import pc from "picocolors";
import { logSection, logStep } from "./env";

interface CommandInfo {
    name: string;
    checkCommand: string;
    installScript: string | (() => Promise<void>);
    description: string;
    required: boolean;
}

async function checkCommandInstalled(command: string): Promise<boolean> {
    try {
        await $`${command} --version`.quiet();
        return true;
    } catch {
        return false;
    }
}

async function promptUser(question: string): Promise<boolean> {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            const normalized = answer.trim().toLowerCase();
            resolve(normalized === "y" || normalized === "yes" || normalized === "はい");
        });
    });
}

async function installNode(): Promise<void> {
    logStep("", "nvmをインストールしています...", "info");
    try {
        await $`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`.quiet();
        logStep("", "nvmのインストールが完了しました", "success");
        logStep("", "シェルを再起動するか、以下のコマンドを実行してください:", "info");
        console.log(pc.dim(String.raw`    export NVM_DIR="$HOME/.nvm"`));
        console.log(pc.dim(String.raw`    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"`));
        console.log(pc.dim("    nvm install --lts"));
        console.log();
        console.log(pc.yellow("  注意: nodeのインストールにはシェルの再起動が必要です。"));
    } catch (error) {
        logStep("", "nvmのインストールに失敗しました", "error");
        throw error;
    }
}

async function installDocker(): Promise<void> {
    logStep("", "Dockerをインストールしています...", "info");
    try {
        await $`curl -fsSL https://get.docker.com/ | sh`.quiet();
        logStep("", "Dockerのインストールが完了しました", "success");
    } catch (error) {
        logStep("", "Dockerのインストールに失敗しました", "error");
        throw error;
    }
}

async function installDoppler(): Promise<void> {
    logStep("", "Doppler CLIをインストールしています...", "info");
    try {
        const archResult = await $`uname -m`.quiet();
        const arch = archResult.stdout.toString().trim() === "arm64" ? "arm64" : "amd64";
        await $`curl -Ls --tlsv1.2 --proto "=https" -o /tmp/doppler.tar.gz https://cli.doppler.com/download/darwin/${arch}`.quiet();
        await $`tar -xzf /tmp/doppler.tar.gz -C /tmp`.quiet();
        await $`sudo mv /tmp/doppler /usr/local/bin/doppler`.quiet();
        await $`rm /tmp/doppler.tar.gz`.quiet();
        logStep("", "Doppler CLIのインストールが完了しました", "success");
    } catch (error) {
        logStep("", "Doppler CLIのインストールに失敗しました", "error");
        throw error;
    }
}

async function installCodex(): Promise<void> {
    logStep("", "Codex CLIをGitHubリリースからインストールしています...", "info");
    try {
        const releaseResponse = await fetch("https://api.github.com/repos/openai/codex/releases/latest");
        if (!releaseResponse.ok) {
            throw new Error(`GitHub APIエラー: ${releaseResponse.status}`);
        }
        const releaseData = (await releaseResponse.json()) as {
            tag_name: string;
            assets: Array<{ name: string; browser_download_url: string }>;
        };
        const archResult = await $`uname -m`.quiet();
        const arch = archResult.stdout.toString().trim() === "arm64" ? "aarch64" : "x86_64";
        const assetName = `codex-${arch}-apple-darwin.tar.gz`;
        const asset = releaseData.assets.find((a) => a.name === assetName);
        if (!asset) {
            throw new Error(`アセットが見つかりません: ${assetName}`);
        }
        logStep("", `バージョン ${releaseData.tag_name} をダウンロードしています...`, "info");
        const downloadPath = `/tmp/${assetName}`;
        await $`curl -fsSL -o ${downloadPath} ${asset.browser_download_url}`.quiet();
        await $`tar -xzf ${downloadPath} -C /tmp`.quiet();
        await $`sudo mv /tmp/codex /usr/local/bin/codex`.quiet();
        await $`sudo chmod +x /usr/local/bin/codex`.quiet();
        await $`rm ${downloadPath}`.quiet();
        logStep("", `Codex CLI ${releaseData.tag_name} のインストールが完了しました`, "success");
    } catch (error) {
        logStep("", "Codex CLIのインストールに失敗しました", "error");
        if (error instanceof Error) {
            logStep("", error.message, "error");
        }
        throw error;
    }
}

async function installCommand(commandInfo: CommandInfo): Promise<void> {
    if (typeof commandInfo.installScript === "string") {
        logStep("", `${commandInfo.name}をインストールしています...`, "info");
        try {
            await $`${commandInfo.installScript}`.quiet();
            logStep("", `${commandInfo.name}のインストールが完了しました`, "success");
        } catch (error) {
            logStep("", `${commandInfo.name}のインストールに失敗しました`, "error");
            throw error;
        }
    } else {
        await commandInfo.installScript();
    }
}

const COMMANDS: CommandInfo[] = [
    {
        name: "node",
        checkCommand: "node",
        installScript: installNode,
        description: "Node.js (nvm経由)",
        required: true,
    },
    {
        name: "bun",
        checkCommand: "bun",
        installScript: "curl -fsSL https://bun.sh/install | bash",
        description: "Bun",
        required: true,
    },
    {
        name: "docker",
        checkCommand: "docker",
        installScript: installDocker,
        description: "Docker",
        required: true,
    },
    {
        name: "pulumi",
        checkCommand: "pulumi",
        installScript: "curl -fsSL https://get.pulumi.com | sh",
        description: "Pulumi",
        required: true,
    },
    {
        name: "doppler",
        checkCommand: "doppler",
        installScript: installDoppler,
        description: "Doppler CLI",
        required: true,
    },
    {
        name: "coderabbit",
        checkCommand: "coderabbit",
        installScript: "curl -fsSL https://cli.coderabbit.ai/install.sh | sh",
        description: "CodeRabbit CLI",
        required: false,
    },
    {
        name: "claude",
        checkCommand: "claude",
        installScript: "curl -fsSL https://claude.ai/install.sh | bash",
        description: "Claude Code",
        required: false,
    },
    {
        name: "codex",
        checkCommand: "codex",
        installScript: installCodex,
        description: "Codex CLI",
        required: false,
    },
];

async function handleCommandInstallation(commandInfo: CommandInfo, isOptional: boolean): Promise<void> {
    const isInstalled = await checkCommandInstalled(commandInfo.checkCommand);
    if (isInstalled) {
        logStep("", `${commandInfo.name}がインストールされています`, "success");
        return;
    }

    const optionalText = isOptional ? "（オプション）" : "";
    const message = `${commandInfo.name}がインストールされていません${optionalText}。インストールしますか？ (y/n): `;
    const shouldInstall = await promptUser(message);
    if (!shouldInstall) {
        const skipStatus = isOptional ? "info" : "warning";
        logStep("", `${commandInfo.name}のインストールをスキップしました`, skipStatus);
        return;
    }

    try {
        await installCommand(commandInfo);
        const verifyInstalled = await checkCommandInstalled(commandInfo.checkCommand);
        if (verifyInstalled) {
            logStep("", `${commandInfo.name}のインストールが確認されました`, "success");
        } else {
            logStep("", `${commandInfo.name}のインストール後、コマンドが見つかりません。シェルを再起動してください`, "warning");
        }
    } catch (error) {
        logStep("", `${commandInfo.name}のインストールに失敗しました`, "error");
        if (process.env.DEBUG) {
            console.error(error);
        }
    }
}

async function processCommands(commands: CommandInfo[], isOptional: boolean): Promise<void> {
    if (isOptional && commands.length > 0) {
        console.log();
        logStep("", "オプションコマンドの確認", "info");
    }

    for (const commandInfo of commands) {
        await handleCommandInstallation(commandInfo, isOptional);
    }
}

export async function checkAndInstallCommands(): Promise<void> {
    logSection("🔍 コマンドのインストール確認");

    const requiredCommands = COMMANDS.filter((cmd) => cmd.required);
    const optionalCommands = COMMANDS.filter((cmd) => !cmd.required);

    await processCommands(requiredCommands, false);
    await processCommands(optionalCommands, true);

    console.log();
    logStep("", "コマンドの確認が完了しました", "success");
}
