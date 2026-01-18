import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";/* empty css                 */import"./index-yBjzXJbu.js";const n=o=>{const{id:r}=o,d=`https://www.googletagmanager.com/gtag/js?id=${r}`,c=`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${r}');`;return e.jsxs(e.Fragment,{children:[e.jsx("script",{async:!0,defer:!0,src:d,type:"text/javascript"}),e.jsx("script",{dangerouslySetInnerHTML:{__html:c},type:"text/javascript"})]})};n.__docgenInfo={description:`@name TrackingGA
@external https://tagmanager.google.com/
@description GTM requires a two part implementation, this script is
responsible for loading GTM which loads our Tags and Pixels`,methods:[],displayName:"TrackingGA",props:{id:{required:!0,tsType:{name:"string"},description:""}}};const p={title:"features/tracking/TrackingGA"},s=()=>e.jsxs("div",{className:"p-4",children:[e.jsx("h2",{className:"mb-4 font-bold text-xl",children:"TrackingGA"}),e.jsx("p",{className:"mb-4 text-color-copy-light",children:"Google Analyticsのスクリプトを出力するコンポーネントです。 <head>タグ内に配置します。"}),e.jsxs("div",{className:"rounded-lg bg-gray-100 p-4 dark:bg-gray-800",children:[e.jsx("h3",{className:"mb-2 font-bold text-sm",children:"使用例:"}),e.jsx("pre",{className:"overflow-x-auto text-xs",children:'<TrackingGA id="G-XXXXXXXXXX" />'})]}),e.jsx("div",{className:"mt-4 rounded-lg bg-yellow-100 p-4 dark:bg-yellow-900",children:e.jsx("p",{className:"text-sm",children:"⚠️ このコンポーネントは<script>タグを出力するため、 Ladle上での視覚的な表示はありません。"})})]}),a=()=>e.jsxs("div",{className:"p-4",children:[e.jsx("h2",{className:"mb-4 font-bold text-xl",children:"GA実装ガイド"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"rounded-lg bg-gray-100 p-4 dark:bg-gray-800",children:[e.jsx("h3",{className:"mb-2 font-bold text-sm",children:"1. root.tsxでの使用:"}),e.jsx("pre",{className:"overflow-x-auto whitespace-pre-wrap text-xs",children:`// head内
<TrackingGA id={GOOGLE_ANALYTICS_ID} />`})]}),e.jsxs("div",{className:"rounded-lg bg-gray-100 p-4 dark:bg-gray-800",children:[e.jsx("h3",{className:"mb-2 font-bold text-sm",children:"2. 環境変数:"}),e.jsx("pre",{className:"overflow-x-auto text-xs",children:"GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX"})]})]})]}),t=()=>e.jsxs("div",{className:"p-4",children:[e.jsx("h2",{className:"mb-4 font-bold text-xl",children:"実際のコンポーネント出力"}),e.jsx("p",{className:"mb-4 text-color-copy-light text-sm",children:"以下にコンポーネントがレンダリングされていますが、視覚的には表示されません。 ブラウザの開発者ツールでHTMLを確認してください。"}),e.jsxs("div",{className:"rounded-lg border border-gray-400 border-dashed p-4",children:[e.jsx(n,{id:"G-EXAMPLE"}),e.jsx("p",{className:"text-gray-500 text-xs",children:"（script タグがここに出力されています）"})]})]});s.__docgenInfo={description:"",methods:[],displayName:"GAInfo"};a.__docgenInfo={description:"",methods:[],displayName:"GAImplementation"};t.__docgenInfo={description:"",methods:[],displayName:"ActualComponent"};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => <div className="p-4">
        <h2 className="mb-4 font-bold text-xl">TrackingGA</h2>
        <p className="mb-4 text-color-copy-light">
            Google Analyticsのスクリプトを出力するコンポーネントです。 &lt;head&gt;タグ内に配置します。
        </p>
        <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="mb-2 font-bold text-sm">使用例:</h3>
            <pre className="overflow-x-auto text-xs">{\`<TrackingGA id="G-XXXXXXXXXX" />\`}</pre>
        </div>
        <div className="mt-4 rounded-lg bg-yellow-100 p-4 dark:bg-yellow-900">
            <p className="text-sm">
                ⚠️ このコンポーネントは&lt;script&gt;タグを出力するため、 Ladle上での視覚的な表示はありません。
            </p>
        </div>
    </div>`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <div className="p-4">
        <h2 className="mb-4 font-bold text-xl">GA実装ガイド</h2>
        <div className="space-y-4">
            <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                <h3 className="mb-2 font-bold text-sm">1. root.tsxでの使用:</h3>
                <pre className="overflow-x-auto whitespace-pre-wrap text-xs">
                    {\`// head内
<TrackingGA id={GOOGLE_ANALYTICS_ID} />\`}
                </pre>
            </div>
            <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                <h3 className="mb-2 font-bold text-sm">2. 環境変数:</h3>
                <pre className="overflow-x-auto text-xs">{"GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX"}</pre>
            </div>
        </div>
    </div>`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => <div className="p-4">
        <h2 className="mb-4 font-bold text-xl">実際のコンポーネント出力</h2>
        <p className="mb-4 text-color-copy-light text-sm">
            以下にコンポーネントがレンダリングされていますが、視覚的には表示されません。
            ブラウザの開発者ツールでHTMLを確認してください。
        </p>
        <div className="rounded-lg border border-gray-400 border-dashed p-4">
            <TrackingGA id="G-EXAMPLE" />
            <p className="text-gray-500 text-xs">（script タグがここに出力されています）</p>
        </div>
    </div>`,...t.parameters?.docs?.source}}};const g=["GAInfo","GAImplementation","ActualComponent"];export{t as ActualComponent,a as GAImplementation,s as GAInfo,g as __namedExportsOrder,p as default};
