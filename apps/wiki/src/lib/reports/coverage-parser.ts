import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

export interface CoverageSummary {
    lines: {
        total: number;
        covered: number;
        skipped: number;
        pct: number;
    };
    statements: {
        total: number;
        covered: number;
        skipped: number;
        pct: number;
    };
    functions: {
        total: number;
        covered: number;
        skipped: number;
        pct: number;
    };
    branches: {
        total: number;
        covered: number;
        skipped: number;
        pct: number;
    };
}

export interface CoverageMetadata {
    project: string;
    timestamp: string;
    commitSha: string;
    branch: string;
    runId?: string;
    runNumber?: string;
    workflow?: string;
    event?: string;
    reportType: "coverage";
    summary: CoverageSummary;
}

export interface CoverageEntry {
    id: string;
    metadata: CoverageMetadata;
    reportPath: string;
}

const REPORTS_BASE_DIR = join(process.cwd(), "reports");

export function getProjectCoverageReports(projectName: string): CoverageEntry[] {
    const projectDir = join(REPORTS_BASE_DIR, "test", projectName);

    try {
        const entries = readdirSync(projectDir);
        const reports: CoverageEntry[] = [];

        for (const entry of entries) {
            const entryPath = join(projectDir, entry);
            const stat = statSync(entryPath);

            if (stat.isDirectory() && entry !== "." && entry !== "..") {
                const metadataPath = join(entryPath, "metadata.json");

                try {
                    const metadataContent = readFileSync(metadataPath, "utf-8");
                    const metadata: CoverageMetadata = JSON.parse(metadataContent);

                    reports.push({
                        id: entry,
                        metadata,
                        reportPath: `/reports/test/${projectName}/${entry}/index.html`,
                    });
                } catch (error) {
                    console.error(`Failed to read coverage metadata for ${entry}:`, error);
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
        console.error(`Failed to read coverage reports for ${projectName}:`, error);
        return [];
    }
}

export function getAllCoverageProjects(): string[] {
    const testDir = join(REPORTS_BASE_DIR, "test");

    try {
        const entries = readdirSync(testDir);
        const projects = entries.filter((entry) => {
            const entryPath = join(testDir, entry);
            const stat = statSync(entryPath);
            return stat.isDirectory() && entry !== "." && entry !== "..";
        });

        return projects;
    } catch (error) {
        console.error("Failed to read test directory:", error);
        return [];
    }
}

export function getCoverageMetadata(projectName: string, reportId: string): CoverageMetadata | null {
    const metadataPath = join(REPORTS_BASE_DIR, "test", projectName, reportId, "metadata.json");

    try {
        const metadataContent = readFileSync(metadataPath, "utf-8");
        const metadata: CoverageMetadata = JSON.parse(metadataContent);

        return metadata;
    } catch (error) {
        console.error(`Failed to read coverage metadata for ${projectName}/${reportId}:`, error);
        return null;
    }
}
