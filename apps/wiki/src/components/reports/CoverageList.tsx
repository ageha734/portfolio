import type { CoverageEntry } from "../../lib/reports/coverage-parser";

interface CoverageListProps {
    projectName: string;
    reports: CoverageEntry[];
}

function getCoverageColor(pct: number): string {
    if (pct >= 80) return "good";
    if (pct >= 60) return "warning";
    return "bad";
}

export function CoverageList({ projectName, reports }: CoverageListProps) {
    if (reports.length === 0) {
        return (
            <div className="not-content">
                <p>このプロジェクトのカバレッジレポートはまだありません。</p>
            </div>
        );
    }

    return (
        <div className="not-content">
            <h2>{projectName} - Coverage Reports</h2>
            <div className="coverage-list">
                {reports.map((report) => (
                    <div key={report.id} className="coverage-card">
                        <div className="coverage-header">
                            <h3>
                                <a href={report.reportPath} target="_blank" rel="noopener noreferrer">
                                    {new Date(report.metadata.timestamp).toLocaleString("ja-JP")}
                                </a>
                            </h3>
                            <span className="coverage-commit">{report.metadata.commitSha.substring(0, 8)}</span>
                        </div>
                        <div className="coverage-meta">
                            <span>
                                <strong>Branch:</strong> {report.metadata.branch}
                            </span>
                            {report.metadata.workflow && (
                                <span>
                                    <strong>Workflow:</strong> {report.metadata.workflow}
                                </span>
                            )}
                        </div>
                        <div className="coverage-summary">
                            <div className={`coverage-item ${getCoverageColor(report.metadata.summary.lines.pct)}`}>
                                <span className="coverage-label">Lines:</span>
                                <span className="coverage-value">{report.metadata.summary.lines.pct.toFixed(2)}%</span>
                                <span className="coverage-count">
                                    ({report.metadata.summary.lines.covered}/{report.metadata.summary.lines.total})
                                </span>
                            </div>
                            <div
                                className={`coverage-item ${getCoverageColor(report.metadata.summary.statements.pct)}`}
                            >
                                <span className="coverage-label">Statements:</span>
                                <span className="coverage-value">
                                    {report.metadata.summary.statements.pct.toFixed(2)}%
                                </span>
                                <span className="coverage-count">
                                    ({report.metadata.summary.statements.covered}/
                                    {report.metadata.summary.statements.total})
                                </span>
                            </div>
                            <div className={`coverage-item ${getCoverageColor(report.metadata.summary.functions.pct)}`}>
                                <span className="coverage-label">Functions:</span>
                                <span className="coverage-value">
                                    {report.metadata.summary.functions.pct.toFixed(2)}%
                                </span>
                                <span className="coverage-count">
                                    ({report.metadata.summary.functions.covered}/
                                    {report.metadata.summary.functions.total})
                                </span>
                            </div>
                            <div className={`coverage-item ${getCoverageColor(report.metadata.summary.branches.pct)}`}>
                                <span className="coverage-label">Branches:</span>
                                <span className="coverage-value">
                                    {report.metadata.summary.branches.pct.toFixed(2)}%
                                </span>
                                <span className="coverage-count">
                                    ({report.metadata.summary.branches.covered}/{report.metadata.summary.branches.total}
                                    )
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
