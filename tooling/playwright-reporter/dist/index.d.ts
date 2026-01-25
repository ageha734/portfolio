import type { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from "@playwright/test/reporter";
export interface MonorepoReporterOptions {
    outputDir?: string;
    projectName?: string;
    htmlOutputDir?: string;
}
declare class MonorepoReporter implements Reporter {
    private readonly options;
    private startTime;
    private readonly testResults;
    private targetReportDir;
    private config;
    constructor(options?: MonorepoReporterOptions);
    onBegin(config: FullConfig, _suite: Suite): void;
    onTestBegin(_test: TestCase): void;
    onTestEnd(test: TestCase, result: TestResult): void;
    onEnd(_result: FullResult): Promise<void>;
    private getProjectName;
    private getCommitSha;
    private getBranch;
}
export default MonorepoReporter;
//# sourceMappingURL=index.d.ts.map