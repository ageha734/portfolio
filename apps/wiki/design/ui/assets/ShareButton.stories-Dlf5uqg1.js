import{j as i}from"./jsx-runtime-Cf8x2fCZ.js";import{c as C}from"./Sheet-CYqYGPDf.js";import"./browser-BXStHV7s.js";import"./index-AQoCTVwo.js";import"./prism-line-numbers-DUFXGfi-.js";import"./index-DNOpAUGJ.js";import"./index-yBjzXJbu.js";import"./index-DTBCUgpQ.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-URNu9FD0.js";const w=({url:n,title:q,text:T,className:N,showLabel:P=!1,disabled:o=!1,onShare:l,isAvailable:j=!0,iconSrc:L="/images/svg/share.svg",iconAlt:O="Share"})=>{if(!j)return null;const V=()=>{o||!l||l({url:n,title:q,text:T})};return i.jsxs("button",{type:"button",className:C("ui-btn custom-bg-gradient whitespace-nowrap rounded-2xl px-4 py-2 font-normal text-sm text-white",o&&"cursor-not-allowed opacity-50",N),onClick:V,disabled:o,children:[i.jsx("img",{alt:O,height:20,src:L,width:20}),P&&i.jsx("span",{children:"Share"})]})};w.__docgenInfo={description:"",methods:[],displayName:"ShareButton",props:{url:{required:!1,tsType:{name:"string"},description:""},title:{required:!1,tsType:{name:"string"},description:""},text:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""},showLabel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onShare:{required:!0,tsType:{name:"signature",type:"function",raw:"(options: ShareOptions) => void | Promise<void>",signature:{arguments:[{type:{name:"ShareOptions"},name:"options"}],return:{name:"union",raw:"void | Promise<void>",elements:[{name:"void"},{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}]}}},description:""},isAvailable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},iconSrc:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"/images/svg/share.svg"',computed:!1}},iconAlt:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Share"',computed:!1}}}};const z={title:"components/ShareButton",component:w,parameters:{layout:"centered"},tags:["autodocs"]},e={args:{onShare:()=>{alert("Share clicked!")},isAvailable:!0}},a={args:{onShare:()=>{alert("Share clicked!")},isAvailable:!0,showLabel:!0}},r={args:{url:"https://example.com",title:"Example Page",text:"Check out this page!",onShare:n=>{alert(`Sharing: ${JSON.stringify(n)}`)},isAvailable:!0}},t={args:{onShare:()=>{alert("Share clicked!")},isAvailable:!0,disabled:!0}},s={args:{onShare:()=>{alert("Share clicked!")},isAvailable:!1}};var c,u,p;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    onShare: () => {
      alert("Share clicked!");
    },
    isAvailable: true
  }
}`,...(p=(u=e.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var m,d,h;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    onShare: () => {
      alert("Share clicked!");
    },
    isAvailable: true,
    showLabel: true
  }
}`,...(h=(d=a.parameters)==null?void 0:d.docs)==null?void 0:h.source}}};var g,f,S;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    url: "https://example.com",
    title: "Example Page",
    text: "Check out this page!",
    onShare: options => {
      alert(\`Sharing: \${JSON.stringify(options)}\`);
    },
    isAvailable: true
  }
}`,...(S=(f=r.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};var v,b,y;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    onShare: () => {
      alert("Share clicked!");
    },
    isAvailable: true,
    disabled: true
  }
}`,...(y=(b=t.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var x,A,k;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    onShare: () => {
      alert("Share clicked!");
    },
    isAvailable: false
  }
}`,...(k=(A=s.parameters)==null?void 0:A.docs)==null?void 0:k.source}}};const F=["Default","WithLabel","WithUrl","Disabled","NotAvailable"];export{e as Default,t as Disabled,s as NotAvailable,a as WithLabel,r as WithUrl,F as __namedExportsOrder,z as default};
