import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import type { ReportMetadata } from "./ReportList";

export interface ReportViewerProps {
    type: "e2e" | "coverage";
    commitSha: string;
    metadata: ReportMetadata;
}

export function ReportViewer({ type, commitSha, metadata }: Readonly<ReportViewerProps>) {
    const title =
        type === "e2e"
            ? `E2Eテストレポート - ${commitSha.substring(0, 7)}`
            : `カバレッジレポート - ${commitSha.substring(0, 7)}`;

    const reportPath = `/reports/${type}/${commitSha}/index.html`;

    return (
        <Layout title={title}>
            <div className="container margin-vert--lg">
                <div className="margin-bottom--md">
                    <Link to="/reports" className="button button--secondary">
                        ← レポート一覧に戻る
                    </Link>
                </div>
                <div className="margin-bottom--md">
                    <h1>{title}</h1>
                    <div className="margin-top--sm">
                        <p>
                            <strong>コミット:</strong> <code>{commitSha}</code>
                        </p>
                        <p>
                            <strong>ブランチ:</strong> {metadata.branch}
                        </p>
                        <p>
                            <strong>実行日時:</strong> {new Date(metadata.timestamp).toLocaleString("ja-JP")}
                        </p>
                        <p>
                            <strong>ワークフロー:</strong> {metadata.workflow}
                        </p>
                        <p>
                            <strong>実行ID:</strong> {metadata.run_id}
                        </p>
                    </div>
                </div>
                <div className="margin-top--lg">
                    <iframe
                        src={reportPath}
                        style={{
                            width: "100%",
                            height: "800px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                        title={`${type} report for ${commitSha}`}
                    />
                </div>
            </div>
        </Layout>
    );
}
