import "~/tailwind.css";

export default {
    title: "widgets/navbar/ThemeToggle",
};

export const Info = () => (
    <div className="p-4">
        <h2 className="text-xl font-bold mb-4">ThemeToggle</h2>
        <p className="mb-4 text-color-copy-light">
            ThemeToggleコンポーネントはRemixのuseLoaderDataとuseFetcherを使用しています。
            実際の使用時はRemixのコンテキスト内で動作します。
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm font-bold mb-2">使用例:</h3>
            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
{`// デスクトップ用
<ThemeToggle />

// モバイル用
<ThemeToggle isMobile />`}
            </pre>
        </div>
        <div className="mt-4 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
            <p className="text-sm">
                ⚠️ このコンポーネントはRemixのhooksに依存しているため、
                Ladle上での完全な動作確認にはRemixのコンテキストが必要です。
            </p>
        </div>
    </div>
);
