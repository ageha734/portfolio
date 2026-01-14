import "~/tailwind.css";

export default {
    title: "widgets/sections/SectionFireworks",
};

export const Info = () => (
    <div className="p-4">
        <h2 className="mb-4 font-bold text-xl">SectionFireworks</h2>
        <p className="mb-4 text-color-copy-light">
            SectionFireworksコンポーネントは動的にロードされるコンポーネントです。
            実際の使用時はESMモジュールとしてロードされます。
        </p>
        <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="mb-2 font-bold text-sm">使用例:</h3>
            <pre className="overflow-x-auto whitespace-pre-wrap text-xs">
                {`import { SectionFireworks } from "~/widgets/sections";

<SectionFireworks />`}
            </pre>
        </div>
        <div className="mt-4 rounded-lg bg-yellow-100 p-4 dark:bg-yellow-900">
            <p className="text-sm">
                ⚠️ このコンポーネントは動的インポートを使用しているため、
                Ladle上での完全な動作確認には実際のESMモジュールが必要です。
            </p>
        </div>
    </div>
);
