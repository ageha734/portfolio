import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";

export default function ReportsIndexPage() {
    return (
        <Layout title="レポート">
            <div className="margin-vert--lg container">
                <h1>レポート</h1>
                <p>CIで生成されたテストレポートとカバレッジレポートを確認できます。</p>
                <div className="margin-vert--lg">
                    <div className="row">
                        <div className="col margin-bottom--md col--6">
                            <div className="card">
                                <div className="card__header">
                                    <h2>E2Eテストレポート</h2>
                                </div>
                                <div className="card__body">
                                    <p>Playwrightで実行されたE2Eテストの結果を確認できます。</p>
                                    <Link to="/reports/e2e" className="button button--primary button--block">
                                        E2Eレポートを見る
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col margin-bottom--md col--6">
                            <div className="card">
                                <div className="card__header">
                                    <h2>カバレッジレポート</h2>
                                </div>
                                <div className="card__body">
                                    <p>Vitestで生成されたコードカバレッジの結果を確認できます。</p>
                                    <Link to="/reports/coverage" className="button button--primary button--block">
                                        カバレッジレポートを見る
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
