import type { Reporter } from "vitest";
export interface MonorepoVitestReporterOptions {
    outputDir?: string;
    projectName?: string;
    coverageDir?: string;
}
declare class MonorepoVitestReporter implements Reporter {
    private options;
    constructor(options?: MonorepoVitestReporterOptions);
    onFinished(): Promise<void>;
    private getProjectName;
    private getCommitSha;
    private getBranch;
}
export default MonorepoVitestReporter;
//# sourceMappingURL=index.d.ts.map