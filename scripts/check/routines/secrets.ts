import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import pc from "picocolors";
import { logStep } from "./utils";

const SECRET_FILE_PATTERNS = [
    /^infra\/Pulumi\..*\.yaml$/,
    /\.env$/,
    /\.env\.local$/,
    /\.env\..*$/,
    /^\.git\/config$/,
    /^\.git\/credentials$/,
];

const SECRET_KEY_PATTERNS = [
    /doppler:dopplerToken/i,
    /secure:/i,
    /api[_-]?key/i,
    /apikey/i,
    /password/i,
    /passwd/i,
    /pwd/i,
    /token/i,
    /access[_-]?token/i,
    /refresh[_-]?token/i,
    /secret/i,
    /secret[_-]?key/i,
    /credential/i,
    /credentials/i,
    /auth/i,
    /aws[_-]?access[_-]?key/i,
    /aws[_-]?secret[_-]?key/i,
    /private[_-]?key/i,
    /public[_-]?key/i,
    /bearer[_-]?token/i,
    /session[_-]?id/i,
    /session[_-]?secret/i,
];

const SECRET_VALUE_PATTERNS = [
    /^[A-Za-z0-9+/]{32,}={0,2}$/, // Base64エンコードされた値（32文字以上）
    /^[A-Za-z0-9_-]{20,}$/, // 長いトークンやキー（20文字以上）
    /^sk-[A-Za-z0-9_-]+$/, // Stripe APIキー
    /^pk_[A-Za-z0-9_-]+$/, // Stripe公開キー
    /^ghp_[A-Za-z0-9_-]+$/, // GitHub Personal Access Token
    /^gho_[A-Za-z0-9_-]+$/, // GitHub OAuth Token
    /^ghu_[A-Za-z0-9_-]+$/, // GitHub User-to-Server Token
    /^ghs_[A-Za-z0-9_-]+$/, // GitHub Server-to-Server Token
    /^ghr_[A-Za-z0-9_-]+$/, // GitHub Refresh Token
    /^AKIA[0-9A-Z]{16}$/, // AWS Access Key ID
    /^AIza[0-9A-Za-z_-]{35}$/, // Google API Key
    /^ya29\.[0-9A-Za-z_-]+$/, // Google OAuth Token
    /^xox[baprs]-[0-9a-zA-Z-]{10,48}$/, // Slack Token
];

const EXCLUDE_PATTERNS = [
    /\.example$/,
    /\.sample$/,
    /\.template$/,
    /\.dist$/,
    /node_modules/,
    /\.git/,
    /dist/,
    /build/,
    /coverage/,
    /\.turbo/,
];

function getStagedFiles(): string[] {
    try {
        const output = execSync("git diff --cached --name-only --diff-filter=ACM", { encoding: "utf-8" });
        return output
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.length > 0);
    } catch (error) {
        console.error("Error getting staged files:", error);
        return [];
    }
}

function shouldCheckFile(filePath: string): boolean {
    if (EXCLUDE_PATTERNS.some((pattern) => pattern.test(filePath))) {
        return false;
    }

    return SECRET_FILE_PATTERNS.some((pattern) => pattern.test(filePath));
}

function checkPulumiFile(content: string): string[] {
    const issues: string[] = [];
    if (content.includes("doppler:dopplerToken")) {
        issues.push("contains 'doppler:dopplerToken' - use DOPPLER_TOKEN environment variable instead");
    }
    if (/^\s*secure:/m.test(content)) {
        issues.push("contains encrypted secrets (secure:) - use environment variables instead");
    }
    return issues;
}

function checkEnvFile(content: string): string[] {
    const issues: string[] = [];
    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]?.trim();
        if (!line || line.startsWith("#") || line.length === 0) {
            continue;
        }

        const parts = line.split("=");
        if (parts.length < 2) {
            continue;
        }
        const key = parts[0]?.trim();
        if (!key) {
            continue;
        }
        const value = parts.slice(1).join("=").trim().replaceAll(/(?:^["'])|(?:["']$)/g, "");

        if (!SECRET_KEY_PATTERNS.some((pattern) => pattern.test(key))) {
            continue;
        }

        if (value.length === 0 || value === "null" || value === "undefined" || value === "''" || value === '""') {
            continue;
        }

        if (SECRET_VALUE_PATTERNS.some((pattern) => pattern.test(value))) {
            issues.push(`line ${i + 1}: potential secret in '${key}'`);
        } else if (value.length > 10) {
            issues.push(`line ${i + 1}: potential secret in '${key}' (long value detected)`);
        }
    }
    return issues;
}

function checkOtherFiles(content: string): string[] {
    const issues: string[] = [];
    for (const pattern of SECRET_KEY_PATTERNS) {
        const regex = new RegExp(`(${pattern.source})\\s*[:=]\\s*["']?([^"'\n]{10,})["']?`, "gi");
        const matches = content.matchAll(regex);
        for (const match of matches) {
            const value = match[2];
            if (value && SECRET_VALUE_PATTERNS.some((p) => p.test(value))) {
                issues.push(`potential hardcoded secret detected: '${match[1]}'`);
            }
        }
    }
    return issues;
}

function checkFileForSecrets(filePath: string): { found: boolean; issues: string[] } {
    if (!existsSync(filePath)) {
        return { found: false, issues: [] };
    }

    const content = readFileSync(filePath, "utf-8");
    const issues: string[] = [];

    if (/^infra\/Pulumi\..*\.yaml$/.test(filePath)) {
        issues.push(...checkPulumiFile(content));
    } else if (/\.env/.test(filePath)) {
        issues.push(...checkEnvFile(content));
    } else {
        issues.push(...checkOtherFiles(content));
    }

    return { found: issues.length > 0, issues };
}

function displayFileIssues(allIssues: Array<{ file: string; issues: string[] }>): void {
    for (const { file, issues } of allIssues) {
        logStep("❌", file, "error");
        for (const issue of issues) {
            console.error(pc.red(`   ${issue}`));
        }
        console.error();
    }
}

function displayBestPractices(): void {
    console.error();
    logStep("💡", "Security best practices:", "info");
    console.error(pc.dim("   • Use environment variables instead of hardcoding secrets"));
    console.error(pc.dim("   • Never commit .env files with actual secrets"));
    console.error(pc.dim("   • Use .env.example files for documentation"));
    console.error(pc.dim("   • Use secret management services (e.g., Doppler, AWS Secrets Manager)"));
    console.error();
}

function displayPulumiAdvice(): void {
    console.error(pc.yellow("   For Pulumi config files:"));
    console.error(pc.dim("   • Remove 'doppler:dopplerToken' from config files"));
    console.error(pc.dim("   • Use DOPPLER_TOKEN environment variable instead"));
    console.error(pc.dim("   • See infra/README.md for details"));
    console.error();
}

function displayEnvAdvice(): void {
    console.error(pc.yellow("   For .env files:"));
    console.error(pc.dim("   • Add .env files to .gitignore"));
    console.error(pc.dim("   • Use .env.example for documentation"));
    console.error(pc.dim("   • Never commit actual secrets"));
    console.error();
}

function displaySecurityIssues(allIssues: Array<{ file: string; issues: string[] }>): void {
    console.error();
    logStep("❌", "Security issues detected:", "error");
    console.error();

    displayFileIssues(allIssues);
    displayBestPractices();

    const pulumiFiles = allIssues.filter(({ file }) => /^infra\/Pulumi\..*\.yaml$/.test(file));
    if (pulumiFiles.length > 0) {
        displayPulumiAdvice();
    }

    const envFiles = allIssues.filter(({ file }) => /\.env/.test(file));
    if (envFiles.length > 0) {
        displayEnvAdvice();
    }
}

export async function checkSecrets(files?: string[]): Promise<boolean> {
    const filesToCheck = files && files.length > 0 ? files : getStagedFiles();

    if (filesToCheck.length === 0) {
        logStep("ℹ️", "No files to check", "info");
        return true;
    }

    const filesToProcess = filesToCheck.filter(shouldCheckFile);

    if (filesToProcess.length === 0) {
        logStep("ℹ️", "No security-sensitive files to check", "info");
        return true;
    }

    const allIssues: Array<{ file: string; issues: string[] }> = [];

    for (const file of filesToProcess) {
        const { found, issues } = checkFileForSecrets(file);
        if (found) {
            allIssues.push({ file, issues });
        }
    }

    if (allIssues.length > 0) {
        displaySecurityIssues(allIssues);
        return false;
    }

    logStep("✓", "No security issues detected", "success");
    return true;
}
