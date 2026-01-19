import{j as t}from"./jsx-runtime-Cf8x2fCZ.js";/* empty css                 */import"./index-yBjzXJbu.js";const e=d=>{const{data:a}=d,h=`Follow me on ${a.title}`,l=14;return t.jsxs("a",{className:"wrap-break-word flex items-center gap-4 break-all text-color-copy-light text-sm",href:a.url,rel:"noopener noreferrer",target:"_blank",children:[t.jsx("img",{alt:h,height:l,src:a.icon,width:l}),a.title]},a.title)};e.__docgenInfo={description:"",methods:[],displayName:"SocialLink",props:{data:{required:!0,tsType:{name:"Social"},description:""}}};const k={title:"components/SocialLink",component:e},o=()=>t.jsx(e,{data:{icon:"https://via.placeholder.com/14",title:"Twitter",url:"https://twitter.com/example"}}),i=()=>t.jsxs("div",{className:"flex flex-col gap-2",children:[t.jsx(e,{data:{icon:"https://via.placeholder.com/14",title:"Twitter",url:"https://twitter.com/example"}}),t.jsx(e,{data:{icon:"https://via.placeholder.com/14",title:"GitHub",url:"https://github.com/example"}}),t.jsx(e,{data:{icon:"https://via.placeholder.com/14",title:"LinkedIn",url:"https://linkedin.com/in/example"}})]});o.__docgenInfo={description:"",methods:[],displayName:"Default"};i.__docgenInfo={description:"",methods:[],displayName:"Multiple"};var r,n,c;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`() => <SocialLink data={{
  icon: "https://via.placeholder.com/14",
  title: "Twitter",
  url: "https://twitter.com/example"
}} />`,...(c=(n=o.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};var s,p,m;i.parameters={...i.parameters,docs:{...(s=i.parameters)==null?void 0:s.docs,source:{originalSource:`() => <div className="flex flex-col gap-2">
        <SocialLink data={{
    icon: "https://via.placeholder.com/14",
    title: "Twitter",
    url: "https://twitter.com/example"
  }} />
        <SocialLink data={{
    icon: "https://via.placeholder.com/14",
    title: "GitHub",
    url: "https://github.com/example"
  }} />
        <SocialLink data={{
    icon: "https://via.placeholder.com/14",
    title: "LinkedIn",
    url: "https://linkedin.com/in/example"
  }} />
    </div>`,...(m=(p=i.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const g=["Default","Multiple"];export{o as Default,i as Multiple,g as __namedExportsOrder,k as default};
