import "~/styles/index.css";
import "./Navbar.module.css";

export default {
    title: "widgets/navbar/Navbar",
};

export const Info = () => (
    <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Navbar</h2>
        <p className="mb-4 text-color-copy-light">
            NavbarコンポーネントはRemixのuseLoaderData、useFetcher、useLocationを使用しています。
            実際の使用時はRemixのコンテキスト内で動作します。
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm font-bold mb-2">使用例:</h3>
            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
{`// root.tsxまたはルートレイアウト内で使用
<Navbar />`}
            </pre>
        </div>
        <div className="mt-4 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
            <p className="text-sm">
                ⚠️ このコンポーネントはRemixのhooksに依存しているため、
                Storybook上での完全な動作確認にはRemixのコンテキストが必要です。
            </p>
        </div>
    </div>
);
