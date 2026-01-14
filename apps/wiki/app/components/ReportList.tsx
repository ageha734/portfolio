import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";

export interface ReportMetadata {
    run_id: string;
    run_number: string;
    workflow: string;
    commit_sha: string;
    branch: string;
    event: string;
    timestamp: string;
    report_type: "e2e" | "coverage";
}

export interface ReportListProps {
    type: "e2e" | "coverage";
    reports: Array<{
        commitSha: string;
        metadata: ReportMetadata;
    }>;
}

export function ReportList({ type, reports }: Readonly<ReportListProps>) {
    const title = type === "e2e" ? "E2Eテストレポート" : "カバレッジレポート";

    return (
        <Layout title={title}>
            <div className="container margin-vert--lg">
                <h1>{title}</h1>
                <p>CIで生成されたレポートの一覧です。</p>
                {reports.length === 0 ? (
                    <div className="alert alert--info">
                        <p>レポートがまだありません。</p>
                    </div>
                ) : (
                    <div className="margin-vert--md">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>コミットSHA</th>
                                    <th>ブランチ</th>
                                    <th>実行日時</th>
                                    <th>ワークフロー</th>
                                    <th>アクション</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report) => (
                                    <tr key={report.commitSha}>
                                        <td>
                                            <code>{report.commitSha.substring(0, 7)}</code>
                                        </td>
                                        <td>{report.metadata.branch}</td>
                                        <td>{new Date(report.metadata.timestamp).toLocaleString("ja-JP")}</td>
                                        <td>{report.metadata.workflow}</td>
                                        <td>
                                            <Link
                                                to={`/reports/view?type=${type}&commitSha=${report.commitSha}`}
                                                className="button button--primary button--sm"
                                            >
                                                表示
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Layout>
    );
}
