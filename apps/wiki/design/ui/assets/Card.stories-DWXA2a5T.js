import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{B as H}from"./Button-BuSOFvrD.js";import{c as t}from"./Sheet-CYqYGPDf.js";import"./browser-BXStHV7s.js";import"./index-AQoCTVwo.js";import"./prism-line-numbers-DUFXGfi-.js";import{r as o}from"./index-DNOpAUGJ.js";/* empty css                 */import"./index-yBjzXJbu.js";import"./index-DTBCUgpQ.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-URNu9FD0.js";const s=o.forwardRef(({className:r,...a},d)=>e.jsx("div",{ref:d,className:t("rounded-lg border bg-card text-card-foreground shadow-sm",r),...a}));s.displayName="Card";const m=o.forwardRef(({className:r,...a},d)=>e.jsx("div",{ref:d,className:t("flex flex-col space-y-1.5 p-6",r),...a}));m.displayName="CardHeader";const l=o.forwardRef(({className:r,children:a,...d},D)=>e.jsx("h3",{ref:D,className:t("font-semibold text-2xl leading-none tracking-tight",r),...d,children:a}));l.displayName="CardTitle";const C=o.forwardRef(({className:r,...a},d)=>e.jsx("p",{ref:d,className:t("text-muted-foreground text-sm",r),...a}));C.displayName="CardDescription";const p=o.forwardRef(({className:r,...a},d)=>e.jsx("div",{ref:d,className:t("p-6 pt-0",r),...a}));p.displayName="CardContent";const h=o.forwardRef(({className:r,...a},d)=>e.jsx("div",{ref:d,className:t("flex items-center p-6 pt-0",r),...a}));h.displayName="CardFooter";s.__docgenInfo={description:"",methods:[],displayName:"Card"};m.__docgenInfo={description:"",methods:[],displayName:"CardHeader"};h.__docgenInfo={description:"",methods:[],displayName:"CardFooter"};l.__docgenInfo={description:"",methods:[],displayName:"CardTitle",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};C.__docgenInfo={description:"",methods:[],displayName:"CardDescription"};p.__docgenInfo={description:"",methods:[],displayName:"CardContent"};const q={title:"components/Card",component:s},n=()=>e.jsxs(s,{children:[e.jsxs(m,{children:[e.jsx(l,{children:"Card Title"}),e.jsx(C,{children:"Card Description"})]}),e.jsx(p,{children:e.jsx("p",{children:"Card content goes here."})}),e.jsx(h,{children:e.jsx(H,{children:"Action"})})]}),i=()=>e.jsx(s,{children:e.jsx(p,{children:e.jsx("p",{children:"Simple card with just content."})})}),c=()=>e.jsxs(s,{children:[e.jsxs(m,{children:[e.jsx(l,{children:"Card with Header"}),e.jsx(C,{children:"This card has a header section"})]}),e.jsx(p,{children:e.jsx("p",{children:"Content section"})})]});n.__docgenInfo={description:"",methods:[],displayName:"Default"};i.__docgenInfo={description:"",methods:[],displayName:"Simple"};c.__docgenInfo={description:"",methods:[],displayName:"WithHeader"};var x,f,j;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`() => <Card>
        <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Card content goes here.</p>
        </CardContent>
        <CardFooter>
            <Button>Action</Button>
        </CardFooter>
    </Card>`,...(j=(f=n.parameters)==null?void 0:f.docs)==null?void 0:j.source}}};var u,N,g;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`() => <Card>
        <CardContent>
            <p>Simple card with just content.</p>
        </CardContent>
    </Card>`,...(g=(N=i.parameters)==null?void 0:N.docs)==null?void 0:g.source}}};var _,y,w;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`() => <Card>
        <CardHeader>
            <CardTitle>Card with Header</CardTitle>
            <CardDescription>This card has a header section</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Content section</p>
        </CardContent>
    </Card>`,...(w=(y=c.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};const O=["Default","Simple","WithHeader"];export{n as Default,i as Simple,c as WithHeader,O as __namedExportsOrder,q as default};
