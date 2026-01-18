import{j as n}from"./jsx-runtime-Cf8x2fCZ.js";import{S as i}from"./SectionExperienceDetail-CV6wjx9-.js";/* empty css                 */import"./index-yBjzXJbu.js";import"./sanitize-DgDITl05.js";import"./prism-line-numbers-Dk-insn8.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-AQoCTVwo.js";import"./index-DNOpAUGJ.js";import"./index-BFwv2nPM.js";import"./index-B4BBQDuh.js";const S={title:"widgets/sections/SectionExperienceDetail"},c={company:"Example Company",companyUrl:"https://example.com",title:"Senior Software Engineer",date:"2020 - Present",dateRange:[new Date("2020-01-01"),new Date],description:"<p>Led development of multiple web applications using modern technologies.</p>",highlights:["Built scalable frontend applications with React and TypeScript","Implemented CI/CD pipelines for automated deployments","Mentored junior developers and conducted code reviews"],image:"/images/svg/example.svg",contract:!1,tags:["TypeScript","React","Node.js"]},e=()=>n.jsx(i,{experience:c}),t=()=>n.jsx(i,{experience:{...c,contract:!0}}),r=()=>n.jsx(i,{experience:{...c,image:void 0}}),o=()=>n.jsx(i,{experience:{...c,date:"2018 - 2020",dateRange:[new Date("2018-01-01"),new Date("2020-12-31")]}}),a=()=>n.jsx(i,{experience:{...c,date:"2022 - Present",dateRange:[new Date("2022-01-01")]}});e.__docgenInfo={description:"",methods:[],displayName:"Default"};t.__docgenInfo={description:"",methods:[],displayName:"WithContract"};r.__docgenInfo={description:"",methods:[],displayName:"WithoutImage"};o.__docgenInfo={description:"",methods:[],displayName:"WithDateRange"};a.__docgenInfo={description:"",methods:[],displayName:"CurrentPosition"};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"() => <SectionExperienceDetail experience={mockExperience} />",...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => <SectionExperienceDetail experience={{
  ...mockExperience,
  contract: true
}} />`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <SectionExperienceDetail experience={{
  ...mockExperience,
  image: undefined
}} />`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => <SectionExperienceDetail experience={{
  ...mockExperience,
  date: "2018 - 2020",
  dateRange: [new Date("2018-01-01"), new Date("2020-12-31")]
}} />`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <SectionExperienceDetail experience={{
  ...mockExperience,
  date: "2022 - Present",
  dateRange: [new Date("2022-01-01")]
}} />`,...a.parameters?.docs?.source}}};const f=["Default","WithContract","WithoutImage","WithDateRange","CurrentPosition"];export{a as CurrentPosition,e as Default,t as WithContract,o as WithDateRange,r as WithoutImage,f as __namedExportsOrder,S as default};
