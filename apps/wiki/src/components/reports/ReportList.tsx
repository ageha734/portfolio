import type { ReportEntry } from "../../lib/reports/parser";

interface ReportListProps {
    projectName: string;
    reports: ReportEntry[];
}

export function ReportList({ projectName, reports }: ReportListProps) {
    if (reports.length === 0) {
        return (
            <div className="not-content">
                <p>このプロジェクトのレポートはまだありません。</p>
            </div>
        );
    }

    return (
        <div className="not-content">
            <h2>{projectName} - E2E Test Reports</h2>
            <div className="report-list">
                {reports.map((report) => (
                    <div key={report.id} className="report-card">
                        <div className="report-header">
                            <h3>
                                <a href={report.reportPath} target="_blank" rel="noopener noreferrer">
                                    {new Date(report.metadata.timestamp).toLocaleString("ja-JP")}
                                </a>
                            </h3>
                            <span className="report-commit">{report.metadata.commitSha.substring(0, 8)}</span>
                        </div>
                        <div className="report-meta">
                            <span>
                                <strong>Branch:</strong> {report.metadata.branch}
                            </span>
                            {report.metadata.workflow && (
                                <span>
                                    <strong>Workflow:</strong> {report.metadata.workflow}
                                </span>
                            )}
                        </div>
                        <div className="report-summary">
                            <div className="summary-item">
                                <span className="summary-label">Total:</span>
                                <span className="summary-value">{report.metadata.summary.total}</span>
                            </div>
                            <div className="summary-item passed">
                                <span className="summary-label">Passed:</span>
                                <span className="summary-value">{report.metadata.summary.passed}</span>
                            </div>
                            <div className="summary-item failed">
                                <span className="summary-label">Failed:</span>
                                <span className="summary-value">{report.metadata.summary.failed}</span>
                            </div>
                            <div className="summary-item skipped">
                                <span className="summary-label">Skipped:</span>
                                <span className="summary-value">{report.metadata.summary.skipped}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">Duration:</span>
                                <span className="summary-value">
                                    {(report.metadata.summary.duration / 1000).toFixed(2)}s
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
