import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";/* empty css                 */import"./index-yBjzXJbu.js";const l=n=>{const{id:o}=n,i=`https://www.googletagmanager.com/ns.html?id=${o}`;return e.jsx("noscript",{children:e.jsx("iframe",{height:"0",src:i,style:{display:"none",visibility:"hidden"},title:"Google Tag Manager",width:"0"})})};l.__docgenInfo={description:`@name TrackingGTMIFrame
@external https://tagmanager.google.com/
@description GTM requires a two part implementation, this noscript iframe
is responsible for loading GTM which loads our Tags and Pixels`,methods:[],displayName:"TrackingGTMIFrame",props:{id:{required:!0,tsType:{name:"string"},description:""}}};const d=n=>{const{id:o}=n,i=`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${o}');`;return e.jsx("script",{dangerouslySetInnerHTML:{__html:i},type:"text/javascript"})};d.__docgenInfo={description:`@name TrackingGTMScript
@external https://tagmanager.google.com/
@description GTM requires a two part implementation, this script is
responsible for loading GTM which loads our Tags and Pixels`,methods:[],displayName:"TrackingGTMScript",props:{id:{required:!0,tsType:{name:"string"},description:""}}};const g={title:"features/tracking/TrackingGTM"},a=()=>e.jsxs("div",{className:"p-4",children:[e.jsx("h2",{className:"mb-4 font-bold text-xl",children:"TrackingGTMScript"}),e.jsx("p",{className:"mb-4 text-color-copy-light",children:"Google Tag Managerのスクリプトを出力するコンポーネントです。 <head>タグ内に配置します。"}),e.jsxs("div",{className:"rounded-lg bg-gray-100 p-4 dark:bg-gray-800",children:[e.jsx("h3",{className:"mb-2 font-bold text-sm",children:"使用例:"}),e.jsx("pre",{className:"overflow-x-auto text-xs",children:'<TrackingGTMScript id="GTM-XXXXXXX" />'})]}),e.jsx("div",{className:"mt-4 rounded-lg bg-yellow-100 p-4 dark:bg-yellow-900",children:e.jsx("p",{className:"text-sm",children:"⚠️ このコンポーネントは<script>タグを出力するため、 Ladle上での視覚的な表示はありません。"})})]}),s=()=>e.jsxs("div",{className:"p-4",children:[e.jsx("h2",{className:"mb-4 font-bold text-xl",children:"TrackingGTMIFrame"}),e.jsx("p",{className:"mb-4 text-color-copy-light",children:"Google Tag Managerのnoscript用iframeを出力するコンポーネントです。 <body>タグ直後に配置します。"}),e.jsxs("div",{className:"rounded-lg bg-gray-100 p-4 dark:bg-gray-800",children:[e.jsx("h3",{className:"mb-2 font-bold text-sm",children:"使用例:"}),e.jsx("pre",{className:"overflow-x-auto text-xs",children:'<TrackingGTMIFrame id="GTM-XXXXXXX" />'})]}),e.jsx("div",{className:"mt-4 rounded-lg bg-yellow-100 p-4 dark:bg-yellow-900",children:e.jsx("p",{className:"text-sm",children:"⚠️ このコンポーネントは<noscript>タグ内にiframeを出力するため、 Ladle上での視覚的な表示はありません。"})})]}),r=()=>e.jsxs("div",{className:"p-4",children:[e.jsx("h2",{className:"mb-4 font-bold text-xl",children:"GTM実装ガイド"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"rounded-lg bg-gray-100 p-4 dark:bg-gray-800",children:[e.jsx("h3",{className:"mb-2 font-bold text-sm",children:"1. root.tsxでの使用:"}),e.jsx("pre",{className:"overflow-x-auto whitespace-pre-wrap text-xs",children:`// head内
<TrackingGTMScript id={GOOGLE_TAG_MANAGER} />

// body直後
<TrackingGTMIFrame id={GOOGLE_TAG_MANAGER} />`})]}),e.jsxs("div",{className:"rounded-lg bg-gray-100 p-4 dark:bg-gray-800",children:[e.jsx("h3",{className:"mb-2 font-bold text-sm",children:"2. 環境変数:"}),e.jsx("pre",{className:"overflow-x-auto text-xs",children:"GOOGLE_TAG_MANAGER=GTM-XXXXXXX"})]})]})]}),t=()=>e.jsxs("div",{className:"p-4",children:[e.jsx("h2",{className:"mb-4 font-bold text-xl",children:"実際のコンポーネント出力"}),e.jsx("p",{className:"mb-4 text-color-copy-light text-sm",children:"以下にコンポーネントがレンダリングされていますが、視覚的には表示されません。 ブラウザの開発者ツールでHTMLを確認してください。"}),e.jsxs("div",{className:"rounded-lg border border-gray-400 border-dashed p-4",children:[e.jsx(d,{id:"GTM-EXAMPLE"}),e.jsx(l,{id:"GTM-EXAMPLE"}),e.jsx("p",{className:"text-gray-500 text-xs",children:"（script と noscript タグがここに出力されています）"})]})]});a.__docgenInfo={description:"",methods:[],displayName:"GTMScriptInfo"};s.__docgenInfo={description:"",methods:[],displayName:"GTMIFrameInfo"};r.__docgenInfo={description:"",methods:[],displayName:"GTMImplementation"};t.__docgenInfo={description:"",methods:[],displayName:"ActualComponents"};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <div className="p-4">
        <h2 className="mb-4 font-bold text-xl">TrackingGTMScript</h2>
        <p className="mb-4 text-color-copy-light">
            Google Tag Managerのスクリプトを出力するコンポーネントです。 &lt;head&gt;タグ内に配置します。
        </p>
        <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="mb-2 font-bold text-sm">使用例:</h3>
            <pre className="overflow-x-auto text-xs">{\`<TrackingGTMScript id="GTM-XXXXXXX" />\`}</pre>
        </div>
        <div className="mt-4 rounded-lg bg-yellow-100 p-4 dark:bg-yellow-900">
            <p className="text-sm">
                ⚠️ このコンポーネントは&lt;script&gt;タグを出力するため、 Ladle上での視覚的な表示はありません。
            </p>
        </div>
    </div>`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => <div className="p-4">
        <h2 className="mb-4 font-bold text-xl">TrackingGTMIFrame</h2>
        <p className="mb-4 text-color-copy-light">
            Google Tag Managerのnoscript用iframeを出力するコンポーネントです。 &lt;body&gt;タグ直後に配置します。
        </p>
        <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="mb-2 font-bold text-sm">使用例:</h3>
            <pre className="overflow-x-auto text-xs">{\`<TrackingGTMIFrame id="GTM-XXXXXXX" />\`}</pre>
        </div>
        <div className="mt-4 rounded-lg bg-yellow-100 p-4 dark:bg-yellow-900">
            <p className="text-sm">
                ⚠️ このコンポーネントは&lt;noscript&gt;タグ内にiframeを出力するため、
                Ladle上での視覚的な表示はありません。
            </p>
        </div>
    </div>`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <div className="p-4">
        <h2 className="mb-4 font-bold text-xl">GTM実装ガイド</h2>
        <div className="space-y-4">
            <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                <h3 className="mb-2 font-bold text-sm">1. root.tsxでの使用:</h3>
                <pre className="overflow-x-auto whitespace-pre-wrap text-xs">
                    {\`// head内
<TrackingGTMScript id={GOOGLE_TAG_MANAGER} />

// body直後
<TrackingGTMIFrame id={GOOGLE_TAG_MANAGER} />\`}
                </pre>
            </div>
            <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                <h3 className="mb-2 font-bold text-sm">2. 環境変数:</h3>
                <pre className="overflow-x-auto text-xs">{"GOOGLE_TAG_MANAGER=GTM-XXXXXXX"}</pre>
            </div>
        </div>
    </div>`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => <div className="p-4">
        <h2 className="mb-4 font-bold text-xl">実際のコンポーネント出力</h2>
        <p className="mb-4 text-color-copy-light text-sm">
            以下にコンポーネントがレンダリングされていますが、視覚的には表示されません。
            ブラウザの開発者ツールでHTMLを確認してください。
        </p>
        <div className="rounded-lg border border-gray-400 border-dashed p-4">
            <TrackingGTMScript id="GTM-EXAMPLE" />
            <TrackingGTMIFrame id="GTM-EXAMPLE" />
            <p className="text-gray-500 text-xs">（script と noscript タグがここに出力されています）</p>
        </div>
    </div>`,...t.parameters?.docs?.source}}};const x=["GTMScriptInfo","GTMIFrameInfo","GTMImplementation","ActualComponents"];export{t as ActualComponents,s as GTMIFrameInfo,r as GTMImplementation,a as GTMScriptInfo,x as __namedExportsOrder,g as default};
