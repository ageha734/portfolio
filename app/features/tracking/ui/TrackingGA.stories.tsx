import { TrackingGA } from "./TrackingGA";
import "~/tailwind.css";

export default {
    title: "features/tracking/TrackingGA",
};

export const GAInfo = () => (
    <div className="p-4">
        <h2 className="text-xl font-bold mb-4">TrackingGA</h2>
        <p className="mb-4 text-color-copy-light">
            Google Analyticsのスクリプトを出力するコンポーネントです。
            &lt;head&gt;タグ内に配置します。
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm font-bold mb-2">使用例:</h3>
            <pre className="text-xs overflow-x-auto">
                {`<TrackingGA id="G-XXXXXXXXXX" />`}
            </pre>
        </div>
        <div className="mt-4 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
            <p className="text-sm">
                ⚠️ このコンポーネントは&lt;script&gt;タグを出力するため、
                Ladle上での視覚的な表示はありません。
            </p>
        </div>
    </div>
);

export const GAImplementation = () => (
    <div className="p-4">
        <h2 className="text-xl font-bold mb-4">GA実装ガイド</h2>
        <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-sm font-bold mb-2">1. root.tsxでの使用:</h3>
                <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
{`// head内
<TrackingGA id={GOOGLE_ANALYTICS_ID} />`}
                </pre>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-sm font-bold mb-2">2. 環境変数:</h3>
                <pre className="text-xs overflow-x-auto">
{`GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX`}
                </pre>
            </div>
        </div>
    </div>
);

export const ActualComponent = () => (
    <div className="p-4">
        <h2 className="text-xl font-bold mb-4">実際のコンポーネント出力</h2>
        <p className="mb-4 text-sm text-color-copy-light">
            以下にコンポーネントがレンダリングされていますが、視覚的には表示されません。
            ブラウザの開発者ツールでHTMLを確認してください。
        </p>
        <div className="border border-dashed border-gray-400 p-4 rounded-lg">
            <TrackingGA id="G-EXAMPLE" />
            <p className="text-xs text-gray-500">
                （script タグがここに出力されています）
            </p>
        </div>
    </div>
);
