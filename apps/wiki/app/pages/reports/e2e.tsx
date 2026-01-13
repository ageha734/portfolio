import React, { useEffect, useState } from "react";
import { ReportList, type ReportMetadata } from "../../components/ReportList";

export default function E2EReportsPage() {
    const [reports, setReports] = useState<Array<{ commitSha: string; metadata: ReportMetadata }>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadReports() {
            try {
                // static/reports/e2e/ ディレクトリからレポート一覧を取得
                // 実際の実装では、APIエンドポイントから取得するか、
                // ビルド時にレポート一覧を生成する必要があります
                // ここでは簡易的に実装します
                const response = await fetch("/reports/e2e/list.json").catch(() => null);
                if (response?.ok) {
                    const data = await response.json();
                    setReports(data);
                } else {
                    // フォールバック: 空のリストを表示
                    setReports([]);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "レポートの読み込みに失敗しました");
            } finally {
                setLoading(false);
            }
        }

        loadReports();
    }, []);

    if (loading) {
        return (
            <div className="container margin-vert--lg">
                <p>読み込み中...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container margin-vert--lg">
                <div className="alert alert--danger">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return <ReportList type="e2e" reports={reports} />;
}
