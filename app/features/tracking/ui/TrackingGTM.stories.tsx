import { TrackingGTMScript } from "./TrackingGTMScript";
import { TrackingGTMIFrame } from "./TrackingGTMIFrame";
import "~/tailwind.css";

export default {
    title: "features/tracking/TrackingGTM",
};

export const GTMScriptInfo = () => (
    <div className="p-4">
        <h2 className="text-xl font-bold mb-4">TrackingGTMScript</h2>
        <p className="mb-4 text-color-copy-light">
            Google Tag Managerのスクリプトを出力するコンポーネントです。
            &lt;head&gt;タグ内に配置します。
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm font-bold mb-2">使用例:</h3>
            <pre className="text-xs overflow-x-auto">
                {`<TrackingGTMScript id="GTM-XXXXXXX" />`}
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

export const GTMIFrameInfo = () => (
    <div className="p-4">
        <h2 className="text-xl font-bold mb-4">TrackingGTMIFrame</h2>
        <p className="mb-4 text-color-copy-light">
            Google Tag Managerのnoscript用iframeを出力するコンポーネントです。
            &lt;body&gt;タグ直後に配置します。
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm font-bold mb-2">使用例:</h3>
            <pre className="text-xs overflow-x-auto">
                {`<TrackingGTMIFrame id="GTM-XXXXXXX" />`}
            </pre>
        </div>
        <div className="mt-4 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
            <p className="text-sm">
                ⚠️ このコンポーネントは&lt;noscript&gt;タグ内にiframeを出力するため、
                Ladle上での視覚的な表示はありません。
            </p>
        </div>
    </div>
);

export const GTMImplementation = () => (
    <div className="p-4">
        <h2 className="text-xl font-bold mb-4">GTM実装ガイド</h2>
        <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-sm font-bold mb-2">1. root.tsxでの使用:</h3>
                <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
{`// head内
<TrackingGTMScript id={GOOGLE_TAG_MANAGER} />

// body直後
<TrackingGTMIFrame id={GOOGLE_TAG_MANAGER} />`}
                </pre>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-sm font-bold mb-2">2. 環境変数:</h3>
                <pre className="text-xs overflow-x-auto">
{`GOOGLE_TAG_MANAGER=GTM-XXXXXXX`}
                </pre>
            </div>
        </div>
    </div>
);

export const ActualComponents = () => (
    <div className="p-4">
        <h2 className="text-xl font-bold mb-4">実際のコンポーネント出力</h2>
        <p className="mb-4 text-sm text-color-copy-light">
            以下にコンポーネントがレンダリングされていますが、視覚的には表示されません。
            ブラウザの開発者ツールでHTMLを確認してください。
        </p>
        <div className="border border-dashed border-gray-400 p-4 rounded-lg">
            <TrackingGTMScript id="GTM-EXAMPLE" />
            <TrackingGTMIFrame id="GTM-EXAMPLE" />
            <p className="text-xs text-gray-500">
                （script と noscript タグがここに出力されています）
            </p>
        </div>
    </div>
);
