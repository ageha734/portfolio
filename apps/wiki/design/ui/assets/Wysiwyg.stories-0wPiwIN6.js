import{j as i}from"./jsx-runtime-Cf8x2fCZ.js";import{P as C}from"./prism-line-numbers-DUFXGfi-.js";import{r as n}from"./index-DNOpAUGJ.js";import{s as T}from"./sanitize-TOu4MQFz.js";/* empty css                 */import"./index-yBjzXJbu.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./browser-BXStHV7s.js";const e=_=>{const{content:W}=_,a=n.useRef(null);n.useEffect(()=>{a.current&&C.highlightAllUnder(a.current)},[]);const I=T(W);return i.jsx("div",{className:"wysiwyg",ref:a,dangerouslySetInnerHTML:{__html:I}})};e.__docgenInfo={description:"",methods:[],displayName:"Wysiwyg",props:{content:{required:!0,tsType:{name:"string"},description:""}}};const z={title:"components/Wysiwyg",component:e},t=()=>i.jsx(e,{content:"<p>This is a simple paragraph.</p>"}),s=()=>i.jsx(e,{content:"<h1>Heading 1</h1><p>This is a paragraph with a heading.</p>"}),o=()=>i.jsx(e,{content:'<pre class="line-numbers language-js"><code>const hello = "world";</code></pre>'}),r=()=>i.jsx(e,{content:`
            <h1>Title</h1>
            <p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `});t.__docgenInfo={description:"",methods:[],displayName:"Default"};s.__docgenInfo={description:"",methods:[],displayName:"WithHeading"};o.__docgenInfo={description:"",methods:[],displayName:"WithCode"};r.__docgenInfo={description:"",methods:[],displayName:"ComplexContent"};var p,c,m;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:'() => <Wysiwyg content="<p>This is a simple paragraph.</p>" />',...(m=(c=t.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var l,d,g;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:'() => <Wysiwyg content="<h1>Heading 1</h1><p>This is a paragraph with a heading.</p>" />',...(g=(d=s.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var h,u,y;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`() => <Wysiwyg content='<pre class="line-numbers language-js"><code>const hello = "world";</code></pre>' />`,...(y=(u=o.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};var f,w,x;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`() => <Wysiwyg content={\`
            <h1>Title</h1>
            <p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        \`} />`,...(x=(w=r.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};const P=["Default","WithHeading","WithCode","ComplexContent"];export{r as ComplexContent,t as Default,o as WithCode,s as WithHeading,P as __namedExportsOrder,z as default};
