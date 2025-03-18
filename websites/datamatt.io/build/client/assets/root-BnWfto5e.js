import{r as c,j as e}from"./jsx-runtime-56DGgGmo.js";import{l as f,n as y,o as w,p as v,_ as b,M as h,L as x,S as u,O as k,q as N,t as M}from"./components-Db46JVZ8.js";/**
 * @remix-run/react v2.14.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let d="positions";function S({getKey:t,...i}){let{isSpaMode:a}=f(),s=y(),o=w();v({getKey:t,storageKey:d});let g=c.useMemo(()=>{if(!t)return null;let r=t(s,o);return r!==s.key?r:null},[]);if(a)return null;let p=((r,j)=>{if(!window.history.state||!window.history.state.key){let n=Math.random().toString(32).slice(2);window.history.replaceState({key:n},"")}try{let l=JSON.parse(sessionStorage.getItem(r)||"{}")[j||window.history.state.key];typeof l=="number"&&window.scrollTo(0,l)}catch(n){console.error(n),sessionStorage.removeItem(r)}}).toString();return c.createElement("script",b({},i,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${p})(${JSON.stringify(d)}, ${JSON.stringify(g)})`}}))}const _=[{title:"Lists Of Things To Do In Clemson, SC",description:"All things Clemson - the official bucket list, on-campus disc golf courses, and more.",link:"/clemson"},{title:"8 Bits Wiser - Tech & Data Consulting",description:"I help small businesses and startups with their tech needs.",link:"https://8bitswiser.com"},{title:"Current Resume",description:"A link to my current resume in PDF format.",link:"https://cdn.datamatt.io/Matthew_Trombley_Resume.pdf"}];function m({variant:t="not_found"}){const a={not_found:{title:"Page Not Found",message:"The page you're looking for doesn't exist. You might find what you're looking for in the links below. Otherwise, you can"},error:{title:"Oops! Something went wrong",message:"We encountered an unexpected error while processing your request. You can try refreshing the page or"}}[t];return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx("meta",{name:"robots",content:"noindex"}),e.jsx(h,{}),e.jsx(x,{}),e.jsx("title",{children:"Page Not Found"})]}),e.jsxs("body",{children:[e.jsxs("div",{className:"min-h-screen flex flex-col items-center px-4 py-12 bg-gray-900 text-gray-100",children:[e.jsxs("main",{className:"max-w-3xl w-full text-center",children:[e.jsxs("div",{className:"flex justify-between items-center w-full mb-12",children:[e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400 to-gray-700 animate-spin"}),e.jsx("img",{src:"/matt-trombley-profile-pic.webp",alt:"Matt Trombley",className:`relative w-24 h-24 rounded-full object-cover 
                       p-[3px] bg-gray-900
                       transition-transform hover:scale-105`})]}),e.jsx("h1",{className:"text-3xl font-bold",children:"Matt Trombley"})]}),e.jsx("div",{className:"mb-12",children:e.jsxs("div",{className:`space-y-6 bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-all
                         transform hover:-translate-y-1 cursor-default`,children:[e.jsx("h2",{className:"text-2xl font-semibold mb-6 text-left",children:a.title}),e.jsx("div",{children:e.jsx("div",{className:"space-y-1",children:e.jsx("div",{className:"grid grid-cols-[auto_1fr_auto] text-left gap-2",children:e.jsxs("span",{className:"text-gray-300",children:[a.message," ",e.jsx("a",{href:"/",className:"text-emerald-400 hover:text-emerald-300 transition-colors",children:"click here"})," ","to return home."]})})})})]})}),e.jsx("div",{className:"mb-12",children:e.jsxs("div",{className:`space-y-6 bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-all
                         transform hover:-translate-y-1 cursor-default`,children:[e.jsx("h2",{className:"text-2xl font-semibold mb-6 text-left",children:"Links"}),_.map((s,o)=>e.jsxs("div",{children:[e.jsx("div",{className:"grid grid-cols-[1fr_auto] items-center gap-4 mb-2",children:e.jsx("h3",{className:"text-lg font-semibold text-emerald-400 text-left",children:e.jsx("a",{href:s.link,target:"_blank",rel:"noopener",className:"hover:text-emerald-300 transition-colors",children:s.title})})}),e.jsx("div",{className:"space-y-1",children:e.jsx("div",{className:"grid grid-cols-[auto_1fr_auto] text-left gap-2",children:e.jsx("span",{className:"text-gray-300",children:s.description})})})]},o))]})}),e.jsxs("div",{className:"flex justify-center gap-8 mb-12",children:[e.jsx("a",{href:"https://www.linkedin.com/in/iamdatamatt/",target:"_blank",rel:"noopener","aria-label":"LinkedIn",className:"text-gray-400 hover:text-emerald-400 transition-colors",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M8 11v5"}),e.jsx("path",{d:"M8 8v.01"}),e.jsx("path",{d:"M12 16v-5"}),e.jsx("path",{d:"M16 16v-3a2 2 0 1 0 -4 0"}),e.jsx("path",{d:"M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z"})]})}),e.jsx("a",{href:"https://github.com/iamdatamatt",target:"_blank",rel:"noopener","aria-label":"GitHub",className:"text-gray-400 hover:text-emerald-400 transition-colors",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"})})}),e.jsx("a",{href:"https://x.com/iamdatamatt",target:"_blank",rel:"noopener","aria-label":"X (Twitter)",className:"text-gray-400 hover:text-emerald-400 transition-colors",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M4 4l11.733 16h4.267l-11.733 -16z"}),e.jsx("path",{d:"M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"})]})}),e.jsx("a",{href:"mailto:mattrtrombley@gmail.com","aria-label":"Email",className:"text-gray-400 hover:text-emerald-400 transition-colors",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"}),e.jsx("path",{d:"M3 7l9 6l9 -6"})]})})]}),e.jsx("hr",{className:"border-gray-700 my-12"}),e.jsx("footer",{className:"text-sm text-gray-500 mb-8",children:"© Matt Trombley. All rights reserved."})]}),e.jsx("style",{children:`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 3s linear infinite;
        }
      `})]}),e.jsx(u,{})]})]})}function C(){return e.jsxs("html",{lang:"en",className:"min-h-screen bg-[#0a0a0a]",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx(h,{}),e.jsx(x,{}),e.jsx("meta",{name:"author",content:"Matt Trombley"}),e.jsx("meta",{name:"apple-mobile-web-app-title",content:"Matt Trombley"})]}),e.jsxs("body",{className:"min-h-screen text-gray-300",children:[e.jsx(k,{}),e.jsx(S,{}),e.jsx(u,{})]})]})}function R(){const t=N();return M(t)&&t.status===404?e.jsx(m,{variant:"not_found"}):e.jsx(m,{variant:"error"})}export{R as ErrorBoundary,C as default};
