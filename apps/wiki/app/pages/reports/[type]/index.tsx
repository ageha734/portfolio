import { useLocation } from "@docusaurus/router";
import { useEffect, useState } from "react";
import {
	ReportList,
	type ReportMetadata,
} from "../../../components/ReportList";

export default function ReportsPage() {
	const location = useLocation();
	const type = location.pathname.split("/").pop() as
		| "e2e"
		| "coverage"
		| undefined;
	const [reports, setReports] = useState<
		Array<{ commitSha: string; metadata: ReportMetadata }>
	>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!type) {
			setError("無効なレポートタイプです");
			setLoading(false);
			return;
		}

		if (type !== "e2e" && type !== "coverage") {
			setError(
				"無効なレポートタイプです。e2e または coverage を指定してください。",
			);
			setLoading(false);
			return;
		}

		async function loadReports() {
			try {
				const response = await fetch(`/reports/${type}/list.json`).catch(
					() => null,
				);
				if (response?.ok) {
					const data = await response.json();
					setReports(data);
				} else {
					setReports([]);
				}
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "レポートの読み込みに失敗しました",
				);
			} finally {
				setLoading(false);
			}
		}

		loadReports();
	}, [type]);

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
				<div className="margin-top--md">
					<a href="/reports" className="button button--secondary">
						← レポート一覧に戻る
					</a>
				</div>
			</div>
		);
	}

	if (!type || (type !== "e2e" && type !== "coverage")) {
		return (
			<div className="container margin-vert--lg">
				<div className="alert alert--danger">
					<p>無効なレポートタイプです</p>
				</div>
				<div className="margin-top--md">
					<a href="/reports" className="button button--secondary">
						← レポート一覧に戻る
					</a>
				</div>
			</div>
		);
	}

	return <ReportList type={type} reports={reports} />;
}
