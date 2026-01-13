import React, { useEffect, useState } from "react";
import { useLocation } from "@docusaurus/router";
import { ReportViewer, type ReportMetadata } from "../../components/ReportViewer";

export default function ReportViewPage() {
    const location = useLocation();
    const [metadata, setMetadata] = useState<ReportMetadata | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // URLからパラメータを抽出
    // /reports/view?type=e2e&commitSha=abc123 のような形式
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get("type") as "e2e" | "coverage" | null;
    const commitSha = searchParams.get("commitSha");

    useEffect(() => {
        if (!type || !commitSha) {
            setError("無効なパラメータです");
            setLoading(false);
            return;
        }

        if (type !== "e2e" && type !== "coverage") {
            setError("無効なレポートタイプです");
            setLoading(false);
            return;
        }

        async function loadReport() {
            try {
                // metadata.jsonを読み込む
                const response = await fetch(`/reports/${type}/${commitSha}/metadata.json`).catch(() => null);

                if (response?.ok) {
                    const data = await response.json();
                    setMetadata(data as ReportMetadata);
                } else {
                    setError("レポートが見つかりません");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "レポートの読み込みに失敗しました");
            } finally {
                setLoading(false);
            }
        }

        loadReport();
    }, [type, commitSha]);

    if (loading) {
        return (
            <div className="container margin-vert--lg">
                <p>読み込み中...</p>
            </div>
        );
    }

    if (error || !type || !commitSha || !metadata) {
        return (
            <div className="container margin-vert--lg">
                <div className="alert alert--danger">
                    <p>{error || "レポートが見つかりません"}</p>
                </div>
                <div className="margin-top--md">
                    <a href="/reports" className="button button--secondary">
                        ← レポート一覧に戻る
                    </a>
                </div>
            </div>
        );
    }

    return <ReportViewer type={type} commitSha={commitSha} metadata={metadata} />;
}
