import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
class MonorepoReporter {
    options;
    startTime = 0;
    testResults = [];
    targetReportDir = "";
    config = null;
    constructor(options = {}) {
        this.options = options;
    }
    onBegin(config, _suite) {
        this.startTime = Date.now();
        this.config = config;
        const baseOutputDir = this.options.outputDir || "./.reports/playwright";
        const timestamp = new Date().toISOString().replaceAll(/[:.]/g, "-");
        const commitSha = this.getCommitSha().substring(0, 8);
        const runDir = join(baseOutputDir, `${timestamp}-${commitSha}`);
        this.targetReportDir = resolve(runDir);
    }
    onTestBegin(_test) {
        // No-op: HTML reporter handles this
    }
    onTestEnd(test, result) {
        this.testResults.push({ test, result });
    }
    onEnd(_result) {
        if (!this.config || !this.targetReportDir) {
            return Promise.resolve();
        }
        const projectName = this.options.projectName || this.getProjectName();
        const duration = Date.now() - this.startTime;
        const summary = {
            total: this.testResults.length,
            passed: this.testResults.filter((r) => r.result.status === "passed").length,
            failed: this.testResults.filter((r) => r.result.status === "failed").length,
            skipped: this.testResults.filter((r) => r.result.status === "skipped").length,
            duration,
        };
        if (!existsSync(this.targetReportDir)) {
            mkdirSync(this.targetReportDir, { recursive: true });
        }
        const htmlReportDir = resolve(this.options.htmlOutputDir || "./.results/playwright");
        if (existsSync(htmlReportDir)) {
            cpSync(htmlReportDir, this.targetReportDir, { recursive: true });
        }
        const metadata = {
            project: projectName,
            timestamp: new Date().toISOString(),
            commitSha: this.getCommitSha(),
            branch: this.getBranch(),
            runId: process.env.GITHUB_RUN_ID,
            runNumber: process.env.GITHUB_RUN_NUMBER,
            workflow: process.env.GITHUB_WORKFLOW,
            event: process.env.GITHUB_EVENT_NAME,
            reportType: "e2e",
            summary,
        };
        const metadataPath = join(this.targetReportDir, "metadata.json");
        writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), "utf-8");
        return Promise.resolve();
    }
    getProjectName() {
        const cwd = process.cwd();
        if (cwd.includes("/apps/api")) {
            return "api";
        }
        if (cwd.includes("/apps/web")) {
            return "web";
        }
        if (cwd.includes("/apps/admin")) {
            return "admin";
        }
        return "unknown";
    }
    getCommitSha() {
        try {
            return execSync("git rev-parse HEAD", { encoding: "utf-8" }).trim();
        }
        catch {
            return "unknown";
        }
    }
    getBranch() {
        try {
            return execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf-8" }).trim();
        }
        catch {
            return "unknown";
        }
    }
}
export default MonorepoReporter;
