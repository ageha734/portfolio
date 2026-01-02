import "~/styles/index.css";

export default {
    title: "widgets/sections/SectionFireworks",
};

export const Info = () => (
    <div className="p-4">
        <h2 className="text-xl font-bold mb-4">SectionFireworks</h2>
        <p className="mb-4 text-color-copy-light">
            SectionFireworksコンポーネントは動的にロードされるコンポーネントです。
            実際の使用時はESMモジュールとしてロードされます。
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm font-bold mb-2">使用例:</h3>
            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
{`import { SectionFireworks } from "~/widgets/sections";

<SectionFireworks />`}
            </pre>
        </div>
        <div className="mt-4 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
            <p className="text-sm">
                ⚠️ このコンポーネントは動的インポートを使用しているため、
                Ladle上での完全な動作確認には実際のESMモジュールが必要です。
            </p>
        </div>
    </div>
);
