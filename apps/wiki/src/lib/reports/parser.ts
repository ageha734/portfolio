import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

export interface ReportMetadata {
    project: string;
    timestamp: string;
    commitSha: string;
    branch: string;
    runId?: string;
    runNumber?: string;
    workflow?: string;
    event?: string;
    reportType: "e2e";
    summary: {
        total: number;
        passed: number;
        failed: number;
        skipped: number;
        duration: number;
    };
}

export interface ReportEntry {
    id: string;
    metadata: ReportMetadata;
    reportPath: string;
}

const REPORTS_BASE_DIR = join(process.cwd(), "reports");

export function getProjectReports(projectName: string): ReportEntry[] {
    console.log("[DEBUG_TRACE] >>> ENTRY: getProjectReports");
    console.log(`[DEBUG_TRACE] >>> STATE: projectName=${projectName}`);

    const projectDir = join(REPORTS_BASE_DIR, "e2e", projectName);
    console.log(`[DEBUG_TRACE] >>> STATE: projectDir=${projectDir}`);

    try {
        const entries = readdirSync(projectDir);
        console.log(`[DEBUG_TRACE] >>> STATE: entries=${JSON.stringify(entries)}`);

        const reports: ReportEntry[] = [];

        for (const entry of entries) {
            const entryPath = join(projectDir, entry);
            const stat = statSync(entryPath);

            if (stat.isDirectory()) {
                console.log(`[DEBUG_TRACE] >>> STATE: processing directory=${entry}`);
                const metadataPath = join(entryPath, "metadata.json");

                try {
                    const metadataContent = readFileSync(metadataPath, "utf-8");
                    const metadata: ReportMetadata = JSON.parse(metadataContent);

                    reports.push({
                        id: entry,
                        metadata,
                        reportPath: `/reports/e2e/${projectName}/${entry}/index.html`,
                    });
                } catch (error) {
                    console.log(`[DEBUG_TRACE] >>> BRANCH: failed to read metadata for ${entry}`);
                    console.error(`Failed to read metadata for ${entry}:`, error);
                }
            }
        }

        reports.sort((a, b) => {
            const timeA = new Date(a.metadata.timestamp).getTime();
            const timeB = new Date(b.metadata.timestamp).getTime();
            return timeB - timeA;
        });

        console.log(`[DEBUG_TRACE] >>> STATE: reports count=${reports.length}`);
        console.log("[DEBUG_TRACE] >>> EXIT: getProjectReports");
        return reports;
    } catch (error) {
        console.log("[DEBUG_TRACE] >>> BRANCH: failed to read project directory");
        console.error(`Failed to read project reports for ${projectName}:`, error);
        console.log("[DEBUG_TRACE] >>> EXIT: getProjectReports with empty array");
        return [];
    }
}

export function getAllProjects(): string[] {
    console.log("[DEBUG_TRACE] >>> ENTRY: getAllProjects");

    const e2eDir = join(REPORTS_BASE_DIR, "e2e");
    console.log(`[DEBUG_TRACE] >>> STATE: e2eDir=${e2eDir}`);

    try {
        const entries = readdirSync(e2eDir);
        const projects = entries.filter((entry) => {
            const entryPath = join(e2eDir, entry);
            const stat = statSync(entryPath);
            return stat.isDirectory();
        });

        console.log(`[DEBUG_TRACE] >>> STATE: projects=${JSON.stringify(projects)}`);
        console.log("[DEBUG_TRACE] >>> EXIT: getAllProjects");
        return projects;
    } catch (error) {
        console.log("[DEBUG_TRACE] >>> BRANCH: failed to read e2e directory");
        console.error("Failed to read e2e directory:", error);
        console.log("[DEBUG_TRACE] >>> EXIT: getAllProjects with empty array");
        return [];
    }
}

export function getReportMetadata(projectName: string, reportId: string): ReportMetadata | null {
    console.log("[DEBUG_TRACE] >>> ENTRY: getReportMetadata");
    console.log(`[DEBUG_TRACE] >>> STATE: projectName=${projectName}, reportId=${reportId}`);

    const metadataPath = join(REPORTS_BASE_DIR, "e2e", projectName, reportId, "metadata.json");
    console.log(`[DEBUG_TRACE] >>> STATE: metadataPath=${metadataPath}`);

    try {
        const metadataContent = readFileSync(metadataPath, "utf-8");
        const metadata: ReportMetadata = JSON.parse(metadataContent);

        console.log("[DEBUG_TRACE] >>> EXIT: getReportMetadata with metadata");
        return metadata;
    } catch (error) {
        console.log("[DEBUG_TRACE] >>> BRANCH: failed to read metadata");
        console.error(`Failed to read metadata for ${projectName}/${reportId}:`, error);
        console.log("[DEBUG_TRACE] >>> EXIT: getReportMetadata with null");
        return null;
    }
}
