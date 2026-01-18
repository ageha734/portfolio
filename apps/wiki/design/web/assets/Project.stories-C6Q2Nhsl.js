import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{c as s,B as q}from"./prism-line-numbers-Dk-insn8.js";import"./index-AQoCTVwo.js";import{r as I}from"./index-DNOpAUGJ.js";/* empty css                 */import"./index-yBjzXJbu.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-BFwv2nPM.js";import"./index-B4BBQDuh.js";const k=300;function C({title:t,description:o,linkLabel:n="Visit website",url:c,roles:l,className:h}){return e.jsx("section",{className:s("relative w-full",h),children:e.jsxs("div",{className:"flex flex-col items-center justify-center gap-8 p-12 md:p-20",children:[e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx("h1",{className:"font-extrabold font-serif text-4xl md:text-6xl",children:t}),e.jsx("p",{className:"text-lg text-muted-foreground",children:o}),!!c&&e.jsx(q,{asChild:!0,className:"mt-4 w-fit",children:e.jsx("a",{type:"button",href:c,target:"_blank",rel:"noopener noreferrer",children:n})})]}),!!l?.length&&e.jsx("ul",{className:"mt-8 flex flex-wrap gap-4",children:l.map((j,u)=>e.jsx("li",{className:"fade-in slide-in-from-bottom-4 animate-in rounded-md bg-muted px-4 py-2 text-sm",style:{animationDelay:`${k+300+u*140}ms`,animationFillMode:"forwards"},children:e.jsx("span",{children:j})},j))})]})})}const d=({className:t,...o})=>e.jsx("article",{className:s("relative flex w-full flex-col items-center justify-center",t),...o}),i=I.forwardRef(({className:t,light:o,padding:n="both",fullHeight:c,backgroundOverlayOpacity:l=.9,backgroundElement:h,children:j,...u},R)=>{const H={both:"py-12 md:py-20 lg:py-24",top:"pt-12 md:pt-20 lg:pt-24",bottom:"pb-12 md:pb-20 lg:pb-24",none:""};return e.jsxs("section",{className:s("relative grid w-full",c&&"min-h-screen",o&&"bg-muted",t),ref:R,...u,children:[!!h&&e.jsx("div",{className:"grid-area-[1/1] opacity-(--opacity)",style:{"--opacity":l},children:h}),e.jsx("div",{className:s("grid-area-[1/1] relative flex flex-col items-center justify-center",H[n]),children:j})]})});i.displayName="ProjectSection";const N={s:"max-w-md",m:"max-w-2xl",l:"max-w-4xl",xl:"max-w-6xl"},a=({className:t,width:o="l",...n})=>e.jsx("div",{className:s("mx-auto w-full px-4",N[o],t),...n}),p=({className:t,level:o=3,as:n="h2",children:c,...l})=>e.jsx(n,{className:s("mb-4 font-extrabold font-serif text-3xl md:text-4xl",t),...l,children:c}),r=({className:t,children:o,...n})=>e.jsx("p",{className:s("mb-4 text-base text-muted-foreground md:text-lg",t),...n,children:o}),D={center:"justify-center",start:"justify-start",end:"justify-end","space-between":"justify-between"},m=({center:t,stretch:o,justify:n="center",width:c="m",noMargin:l,className:h,centerMobile:j,...u})=>e.jsx("div",{className:s("flex flex-col gap-4 md:flex-row",D[n],t&&"items-center",o&&"items-stretch",j&&"md:items-center",!l&&"mb-8",N[c],h),...u}),_=({className:t,centered:o,...n})=>e.jsx(a,{className:s("grid grid-cols-1 gap-8 md:grid-cols-2",o&&"items-center",t),...n});C.__docgenInfo={description:"",methods:[],displayName:"ProjectHeader",props:{linkLabel:{defaultValue:{value:'"Visit website"',computed:!1},required:!1}}};d.__docgenInfo={description:"",methods:[],displayName:"ProjectContainer",props:{className:{required:!1,tsType:{name:"string"},description:""}},composes:["ComponentProps"]};i.__docgenInfo={description:"",methods:[],displayName:"ProjectSection",props:{className:{required:!1,tsType:{name:"string"},description:""},light:{required:!1,tsType:{name:"boolean"},description:""},padding:{required:!1,tsType:{name:"union",raw:'"both" | "top" | "bottom" | "none"',elements:[{name:"literal",value:'"both"'},{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'},{name:"literal",value:'"none"'}]},description:"",defaultValue:{value:'"both"',computed:!1}},fullHeight:{required:!1,tsType:{name:"boolean"},description:""},backgroundOverlayOpacity:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0.9",computed:!1}},backgroundElement:{required:!1,tsType:{name:"ReactNode"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""}},composes:["ComponentProps"]};a.__docgenInfo={description:"",methods:[],displayName:"ProjectSectionContent",props:{className:{required:!1,tsType:{name:"string"},description:""},width:{required:!1,tsType:{name:"union",raw:'"s" | "m" | "l" | "xl"',elements:[{name:"literal",value:'"s"'},{name:"literal",value:'"m"'},{name:"literal",value:'"l"'},{name:"literal",value:'"xl"'}]},description:"",defaultValue:{value:'"l"',computed:!1}}},composes:["ComponentProps"]};p.__docgenInfo={description:"",methods:[],displayName:"ProjectSectionHeading",props:{className:{required:!1,tsType:{name:"string"},description:""},level:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"3",computed:!1}},as:{required:!1,tsType:{name:"union",raw:'"h1" | "h2" | "h3" | "h4" | "h5" | "h6"',elements:[{name:"literal",value:'"h1"'},{name:"literal",value:'"h2"'},{name:"literal",value:'"h3"'},{name:"literal",value:'"h4"'},{name:"literal",value:'"h5"'},{name:"literal",value:'"h6"'}]},description:"",defaultValue:{value:'"h2"',computed:!1}}},composes:["ComponentProps"]};r.__docgenInfo={description:"",methods:[],displayName:"ProjectSectionText",props:{className:{required:!1,tsType:{name:"string"},description:""}},composes:["ComponentProps"]};m.__docgenInfo={description:"",methods:[],displayName:"ProjectTextRow",props:{center:{required:!1,tsType:{name:"boolean"},description:""},stretch:{required:!1,tsType:{name:"boolean"},description:""},justify:{required:!1,tsType:{name:"union",raw:'"center" | "start" | "end" | "space-between"',elements:[{name:"literal",value:'"center"'},{name:"literal",value:'"start"'},{name:"literal",value:'"end"'},{name:"literal",value:'"space-between"'}]},description:"",defaultValue:{value:'"center"',computed:!1}},width:{required:!1,tsType:{name:"union",raw:'"s" | "m" | "l" | "xl"',elements:[{name:"literal",value:'"s"'},{name:"literal",value:'"m"'},{name:"literal",value:'"l"'},{name:"literal",value:'"xl"'}]},description:"",defaultValue:{value:'"m"',computed:!1}},noMargin:{required:!1,tsType:{name:"boolean"},description:""},className:{required:!1,tsType:{name:"string"},description:""},centerMobile:{required:!1,tsType:{name:"boolean"},description:""}},composes:["ComponentProps"]};_.__docgenInfo={description:"",methods:[],displayName:"ProjectSectionColumns",props:{className:{required:!1,tsType:{name:"string"},description:""},width:{required:!1,tsType:{name:"union",raw:'"s" | "m" | "l" | "xl"',elements:[{name:"literal",value:'"s"'},{name:"literal",value:'"m"'},{name:"literal",value:'"l"'},{name:"literal",value:'"xl"'}]},description:""},centered:{required:!1,tsType:{name:"boolean"},description:""}},composes:["ComponentProps"]};const B={title:"widgets/project/Project"},x=()=>e.jsx(C,{title:"Project Title",description:"This is a description of the project. It showcases the main features and objectives."}),g=()=>e.jsx(C,{title:"E-commerce Platform",description:"A modern e-commerce platform built with React and Node.js",url:"https://example.com",linkLabel:"View Project"}),f=()=>e.jsx(C,{title:"Design System",description:"A comprehensive design system for enterprise applications",roles:["UI Design","Frontend Development","Documentation"]}),P=()=>e.jsx(d,{children:e.jsx(i,{children:e.jsxs(a,{children:[e.jsx(p,{children:"Section Heading"}),e.jsx(r,{children:"This is the section text content. It describes the details of this particular section."})]})})}),S=()=>e.jsx(d,{children:e.jsx(i,{light:!0,children:e.jsxs(a,{children:[e.jsx(p,{children:"Light Section"}),e.jsx(r,{children:"This is a light themed section."})]})})}),w=()=>e.jsx(d,{children:e.jsx(i,{padding:"top",children:e.jsxs(a,{children:[e.jsx(p,{children:"Top Padding Only"}),e.jsx(r,{children:"This section only has top padding."})]})})}),y=()=>e.jsx(d,{children:e.jsx(i,{children:e.jsx(a,{children:e.jsxs(m,{center:!0,children:[e.jsx(p,{children:"Centered Text Row"}),e.jsx(r,{children:"This text is centered in the row."})]})})})}),T=()=>e.jsx(d,{children:e.jsx(i,{children:e.jsxs(a,{children:[e.jsx(m,{width:"s",children:e.jsx(r,{children:"Small width text row"})}),e.jsx(m,{width:"m",children:e.jsx(r,{children:"Medium width text row"})}),e.jsx(m,{width:"l",children:e.jsx(r,{children:"Large width text row"})})]})})}),v=()=>e.jsx(d,{children:e.jsx(i,{children:e.jsxs(_,{centered:!0,children:[e.jsxs("div",{className:"rounded bg-gray-100 p-4 dark:bg-gray-800",children:[e.jsx("h3",{className:"font-bold",children:"Column 1"}),e.jsx("p",{children:"First column content"})]}),e.jsxs("div",{className:"rounded bg-gray-100 p-4 dark:bg-gray-800",children:[e.jsx("h3",{className:"font-bold",children:"Column 2"}),e.jsx("p",{children:"Second column content"})]})]})})}),b=()=>e.jsxs(d,{children:[e.jsx(C,{title:"Portfolio Website",description:"A modern portfolio website showcasing creative work and technical skills",url:"https://portfolio.example.com",roles:["Design","Development","Content Strategy"]}),e.jsx(i,{children:e.jsx(a,{children:e.jsxs(m,{children:[e.jsx(p,{children:"The Challenge"}),e.jsx(r,{children:"Creating a portfolio that effectively showcases work while maintaining excellent performance and accessibility standards."})]})})}),e.jsx(i,{light:!0,padding:"both",children:e.jsx(a,{children:e.jsxs(m,{center:!0,children:[e.jsx(p,{children:"The Solution"}),e.jsx(r,{children:"Built with modern technologies like React, Remix, and Tailwind CSS to deliver a fast and responsive experience."})]})})})]});x.__docgenInfo={description:"",methods:[],displayName:"Header"};g.__docgenInfo={description:"",methods:[],displayName:"HeaderWithUrl"};f.__docgenInfo={description:"",methods:[],displayName:"HeaderWithRoles"};P.__docgenInfo={description:"",methods:[],displayName:"Section"};S.__docgenInfo={description:"",methods:[],displayName:"SectionLight"};w.__docgenInfo={description:"",methods:[],displayName:"SectionWithPadding"};y.__docgenInfo={description:"",methods:[],displayName:"TextRow"};T.__docgenInfo={description:"",methods:[],displayName:"TextRowWidths"};v.__docgenInfo={description:"",methods:[],displayName:"SectionColumns"};b.__docgenInfo={description:"",methods:[],displayName:"FullExample"};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:'() => <ProjectHeader title="Project Title" description="This is a description of the project. It showcases the main features and objectives." />',...x.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:'() => <ProjectHeader title="E-commerce Platform" description="A modern e-commerce platform built with React and Node.js" url="https://example.com" linkLabel="View Project" />',...g.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:'() => <ProjectHeader title="Design System" description="A comprehensive design system for enterprise applications" roles={["UI Design", "Frontend Development", "Documentation"]} />',...f.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`() => <ProjectContainer>
        <ProjectSection>
            <ProjectSectionContent>
                <ProjectSectionHeading>Section Heading</ProjectSectionHeading>
                <ProjectSectionText>
                    This is the section text content. It describes the details of this particular section.
                </ProjectSectionText>
            </ProjectSectionContent>
        </ProjectSection>
    </ProjectContainer>`,...P.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => <ProjectContainer>
        <ProjectSection light>
            <ProjectSectionContent>
                <ProjectSectionHeading>Light Section</ProjectSectionHeading>
                <ProjectSectionText>This is a light themed section.</ProjectSectionText>
            </ProjectSectionContent>
        </ProjectSection>
    </ProjectContainer>`,...S.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`() => <ProjectContainer>
        <ProjectSection padding="top">
            <ProjectSectionContent>
                <ProjectSectionHeading>Top Padding Only</ProjectSectionHeading>
                <ProjectSectionText>This section only has top padding.</ProjectSectionText>
            </ProjectSectionContent>
        </ProjectSection>
    </ProjectContainer>`,...w.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => <ProjectContainer>
        <ProjectSection>
            <ProjectSectionContent>
                <ProjectTextRow center>
                    <ProjectSectionHeading>Centered Text Row</ProjectSectionHeading>
                    <ProjectSectionText>This text is centered in the row.</ProjectSectionText>
                </ProjectTextRow>
            </ProjectSectionContent>
        </ProjectSection>
    </ProjectContainer>`,...y.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`() => <ProjectContainer>
        <ProjectSection>
            <ProjectSectionContent>
                <ProjectTextRow width="s">
                    <ProjectSectionText>Small width text row</ProjectSectionText>
                </ProjectTextRow>
                <ProjectTextRow width="m">
                    <ProjectSectionText>Medium width text row</ProjectSectionText>
                </ProjectTextRow>
                <ProjectTextRow width="l">
                    <ProjectSectionText>Large width text row</ProjectSectionText>
                </ProjectTextRow>
            </ProjectSectionContent>
        </ProjectSection>
    </ProjectContainer>`,...T.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => <ProjectContainer>
        <ProjectSection>
            <ProjectSectionColumns centered>
                <div className="rounded bg-gray-100 p-4 dark:bg-gray-800">
                    <h3 className="font-bold">Column 1</h3>
                    <p>First column content</p>
                </div>
                <div className="rounded bg-gray-100 p-4 dark:bg-gray-800">
                    <h3 className="font-bold">Column 2</h3>
                    <p>Second column content</p>
                </div>
            </ProjectSectionColumns>
        </ProjectSection>
    </ProjectContainer>`,...v.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => <ProjectContainer>
        <ProjectHeader title="Portfolio Website" description="A modern portfolio website showcasing creative work and technical skills" url="https://portfolio.example.com" roles={["Design", "Development", "Content Strategy"]} />
        <ProjectSection>
            <ProjectSectionContent>
                <ProjectTextRow>
                    <ProjectSectionHeading>The Challenge</ProjectSectionHeading>
                    <ProjectSectionText>
                        Creating a portfolio that effectively showcases work while maintaining excellent performance and
                        accessibility standards.
                    </ProjectSectionText>
                </ProjectTextRow>
            </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light padding="both">
            <ProjectSectionContent>
                <ProjectTextRow center>
                    <ProjectSectionHeading>The Solution</ProjectSectionHeading>
                    <ProjectSectionText>
                        Built with modern technologies like React, Remix, and Tailwind CSS to deliver a fast and
                        responsive experience.
                    </ProjectSectionText>
                </ProjectTextRow>
            </ProjectSectionContent>
        </ProjectSection>
    </ProjectContainer>`,...b.parameters?.docs?.source}}};const $=["Header","HeaderWithUrl","HeaderWithRoles","Section","SectionLight","SectionWithPadding","TextRow","TextRowWidths","SectionColumns","FullExample"];export{b as FullExample,x as Header,f as HeaderWithRoles,g as HeaderWithUrl,P as Section,v as SectionColumns,S as SectionLight,w as SectionWithPadding,y as TextRow,T as TextRowWidths,$ as __namedExportsOrder,B as default};
