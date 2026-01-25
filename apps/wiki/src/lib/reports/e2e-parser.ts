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
    const projectDir = join(REPORTS_BASE_DIR, "e2e", projectName);

    try {
        const entries = readdirSync(projectDir);
        const reports: ReportEntry[] = [];

        for (const entry of entries) {
            const entryPath = join(projectDir, entry);
            const stat = statSync(entryPath);

            if (stat.isDirectory()) {
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
                    console.error(`Failed to read metadata for ${entry}:`, error);
                }
            }
        }

        reports.sort((a, b) => {
            const timeA = new Date(a.metadata.timestamp).getTime();
            const timeB = new Date(b.metadata.timestamp).getTime();
            return timeB - timeA;
        });

        return reports;
    } catch (error) {
        console.error(`Failed to read project reports for ${projectName}:`, error);
        return [];
    }
}

export function getAllProjects(): string[] {
    const e2eDir = join(REPORTS_BASE_DIR, "e2e");

    try {
        const entries = readdirSync(e2eDir);
        const projects = entries.filter((entry) => {
            const entryPath = join(e2eDir, entry);
            const stat = statSync(entryPath);
            return stat.isDirectory();
        });

        return projects;
    } catch (error) {
        console.error("Failed to read e2e directory:", error);
        return [];
    }
}

export function getReportMetadata(projectName: string, reportId: string): ReportMetadata | null {
    const metadataPath = join(REPORTS_BASE_DIR, "e2e", projectName, reportId, "metadata.json");

    try {
        const metadataContent = readFileSync(metadataPath, "utf-8");
        const metadata: ReportMetadata = JSON.parse(metadataContent);

        return metadata;
    } catch (error) {
        console.error(`Failed to read metadata for ${projectName}/${reportId}:`, error);
        return null;
    }
}
