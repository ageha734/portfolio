import { useEffect, useState } from "react";
import { ReportList, type ReportMetadata } from "../../components/ReportList";

export default function E2EReportsPage() {
	const [reports, setReports] = useState<
		Array<{ commitSha: string; metadata: ReportMetadata }>
	>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function loadReports() {
			try {
				const response = await fetch("/reports/e2e/list.json").catch(
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
