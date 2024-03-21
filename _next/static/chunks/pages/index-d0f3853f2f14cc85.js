(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return s(6005)}])},8755:function(e,t,s){"use strict";s.d(t,{A:function(){return Layout}});var n=s(5893),l=s(7294),r=s(1664),c=s.n(r),a=s(7639);function Header(){return(0,l.useEffect)(()=>{var e=document.getElementById("site-menu"),t=document.getElementById("top");window.addEventListener("scroll",function(){window.scrollY>=400?(null==e||e.classList.add("nav-sticky"),null==t||t.classList.add("pt-scroll")):(null==e||e.classList.remove("nav-sticky"),null==t||t.classList.remove("pt-scroll"))})},[]),(0,n.jsx)("header",{id:"top",className:"w-full flex flex-col fixed sm:relative bg-black pin-t pin-r pin-l z-10 text-white",children:(0,n.jsxs)("nav",{id:"site-menu",className:"flex flex-col sm:flex-row w-full justify-between items-center px-4 sm:px-6 py-1 bg-black shadow sm:shadow-none border-t-4 border-red-900",children:[(0,n.jsxs)("div",{className:"w-full sm:w-auto self-start sm:self-center flex flex-row sm:flex-none flex-no-wrap justify-between items-center",children:[(0,n.jsx)(c(),{href:"/",children:(0,n.jsxs)("span",{className:"flex flex-row cursor-pointer items-center text-center",children:[(0,n.jsx)(a.E,{src:"/logo-big.jpg",width:50,height:50}),(0,n.jsx)("div",{className:"ml-2",children:"Wikigrisser Next"})]})}),(0,n.jsxs)("button",{id:"menuBtn",className:"hamburger block sm:hidden focus:outline-none",type:"button",onClick:function(){var e=document.getElementById("menuBtn"),t=document.getElementById("menu");null==e||e.classList.toggle("open"),null==t||t.classList.toggle("flex"),null==t||t.classList.toggle("hidden")},children:[(0,n.jsx)("span",{className:"hamburger__top-bun"}),(0,n.jsx)("span",{className:"hamburger__bottom-bun"})]})]}),(0,n.jsx)("div",{id:"menu",className:"w-full sm:w-auto self-end sm:self-center sm:flex flex-col sm:flex-row items-center h-full py-1 pb-4 sm:py-0 sm:pb-0 hidden",children:i.map(e=>(0,n.jsx)(c(),{href:e.url,children:(0,n.jsx)("div",{className:"text-gray-300 font-bold hover:text-white text-lg w-full no-underline sm:w-auto sm:pr-4 py-2 sm:py-1 sm:pt-2 cursor-pointer",children:e.text})},e.text))})]})})}let i=[{text:"News",url:"/news"},{text:"Heroes",url:"/heroes/gallery"},{text:"Skills",url:"/skills"},{text:"Equipment",url:"/equipment"},{text:"Soldiers",url:"/soldiers"},{text:"TSdL",url:"/tsdl"},{text:"Contact",url:"/contact"}];function Layout(e){let{children:t}=e;return(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{id:"page-container",className:"flex flex-col justify-between",children:[(0,n.jsxs)("div",{id:"content-wrap",children:[(0,n.jsx)(Header,{}),(0,n.jsx)("main",{className:"flex pt-14 sm:pt-0",children:t})]}),(0,n.jsx)("footer",{id:"footer",children:"\xa9 ".concat(new Date().getFullYear()," Wikigrisser")})]})})}},7639:function(e,t,s){"use strict";s.d(t,{E:function(){return Img}});var n=s(5893),l=s(7294);function Img(e){let{src:t,...s}=e,[r,c]=(0,l.useState)(!1),a=(0,l.useRef)(null);return(0,l.useEffect)(()=>{a.current&&r&&(a.current.src=t||"")},[t,r]),(0,l.useEffect)(()=>{c(!0)},[]),(0,n.jsx)("img",{...s,ref:a,src:t})}},6005:function(e,t,s){"use strict";s.r(t),s.d(t,{__N_SSG:function(){return i},default:function(){return pages}});var n=s(5893),l=s(8755);s(7294);var r=s(3428),c=s(7639);function PatchSection(e){let{patch:t,header:s}=e;return(0,n.jsxs)("div",{className:"justify-center text-white grid grid-cols-2 items-center pl-5 pr-5 pb-5",children:[(0,n.jsx)(c.E,{src:"/patchBanners/"+t.id+".png",className:"inline col-span-2 md:col-span-1 justify-self-center md:justify-self-end pb-2 md:pb-0",width:500,height:300,onError:e=>(0,r.f)(e,"/404/patchRateUp.png")}),(0,n.jsxs)("div",{className:"whitespace-pre-line text-left pl-4 col-span-2 md:col-span-1",children:[(0,n.jsx)("span",{className:"mb-4 text-2xl",children:s}),(0,n.jsx)("h2",{className:"mb-4 text-3xl",children:t.name}),t.info]})]})}var a=s(1413),i=!0,pages=e=>{let{patchMap:t}=e,s=new Date().valueOf(),r=Object.values(t).filter(e=>"major"===e.type),i=r.reduce((e,t)=>{let n=new Date(t.releaseDate).valueOf()-s;return n>0?e:t}),o=r.pop();return(0,n.jsx)(l.A,{children:(0,n.jsxs)("div",{className:"flex flex-grow flex-col bg-black",children:[(0,n.jsx)("div",{className:"flex flex-row justify-center",children:(0,n.jsx)(c.E,{src:"/web/banner.jpg",className:"inline",width:2300,height:850})}),(0,n.jsxs)("div",{className:"flex flex-col justify-center text-center",children:[(0,n.jsx)(PatchSection,{patch:i,header:"Most Recent Global Patch (".concat((0,a.Z)(i.releaseDate),")")}),(0,n.jsx)(PatchSection,{patch:o,header:"Most Recent CN Patch (".concat((0,a.Z)(o.cnReleaseDate),")")})]})]})})}},3428:function(e,t,s){"use strict";function addDefaultSrc(e,t){let s="/404/Card.png";t&&(s=t),e.currentTarget.src=s}s.d(t,{f:function(){return addDefaultSrc}})},1413:function(e,t,s){"use strict";function formatDate(e){return isNaN(Date.parse(e))?e:new Date(e).toLocaleDateString(void 0,{timeZone:"UTC"})}s.d(t,{Z:function(){return formatDate}})}},function(e){e.O(0,[664,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);