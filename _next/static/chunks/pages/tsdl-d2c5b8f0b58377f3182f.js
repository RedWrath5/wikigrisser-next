(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[124],{9790:function(e,n,t){"use strict";t.d(n,{A:function(){return a}});var s=t(5893),r=t(7294),i=t(1664),l=t(4932);function o(){return(0,r.useEffect)((function(){var e=document.getElementById("site-menu"),n=document.getElementById("top");window.addEventListener("scroll",(function(){window.scrollY>=400?(null===e||void 0===e||e.classList.add("nav-sticky"),null===n||void 0===n||n.classList.add("pt-scroll")):(null===e||void 0===e||e.classList.remove("nav-sticky"),null===n||void 0===n||n.classList.remove("pt-scroll"))}))}),[]),(0,s.jsx)("header",{id:"top",className:"w-full flex flex-col fixed sm:relative bg-black pin-t pin-r pin-l z-10 text-white",children:(0,s.jsxs)("nav",{id:"site-menu",className:"flex flex-col sm:flex-row w-full justify-between items-center px-4 sm:px-6 py-1 bg-black shadow sm:shadow-none border-t-4 border-red-900",children:[(0,s.jsxs)("div",{className:"w-full sm:w-auto self-start sm:self-center flex flex-row sm:flex-none flex-no-wrap justify-between items-center",children:[(0,s.jsx)(i.default,{href:"/",children:(0,s.jsxs)("span",{className:"flex flex-row cursor-pointer items-center text-center",children:[(0,s.jsx)(l.E,{src:"/logo-big.jpg",width:50,height:50}),(0,s.jsx)("div",{className:"ml-2",children:"Wikigrisser Next"})]})}),(0,s.jsxs)("button",{id:"menuBtn",className:"hamburger block sm:hidden focus:outline-none",type:"button",onClick:function(){var e=document.getElementById("menuBtn"),n=document.getElementById("menu");null===e||void 0===e||e.classList.toggle("open"),null===n||void 0===n||n.classList.toggle("flex"),null===n||void 0===n||n.classList.toggle("hidden")},children:[(0,s.jsx)("span",{className:"hamburger__top-bun"}),(0,s.jsx)("span",{className:"hamburger__bottom-bun"})]})]}),(0,s.jsx)("div",{id:"menu",className:"w-full sm:w-auto self-end sm:self-center sm:flex flex-col sm:flex-row items-center h-full py-1 pb-4 sm:py-0 sm:pb-0 hidden",children:c.map((function(e){return(0,s.jsx)(i.default,{href:e.url,children:(0,s.jsx)("div",{className:"text-gray-300 font-bold hover:text-white text-lg w-full no-underline sm:w-auto sm:pr-4 py-2 sm:py-1 sm:pt-2 cursor-pointer",children:e.text})},e.text)}))})]})})}var c=[{text:"News",url:"/news"},{text:"Heroes",url:"/heroes/gallery"},{text:"Equipment",url:"/equipment"},{text:"Soldiers",url:"/soldiers"},{text:"TSdL",url:"/tsdl"}];function a(e){var n=e.children;return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{id:"page-container",className:"flex flex-col justify-between",children:[(0,s.jsxs)("div",{id:"content-wrap",children:[(0,s.jsx)(o,{}),(0,s.jsx)("main",{className:"flex pt-14 sm:pt-0",children:n})]}),(0,s.jsx)("footer",{id:"footer",children:"\xa9 ".concat((new Date).getFullYear()," Wikigrisser")})]})})}},4932:function(e,n,t){"use strict";t.d(n,{E:function(){return a}});var s=t(6265),r=t(5893),i=t(8347),l=t(7294);function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);n&&(s=s.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,s)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){(0,s.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e){var n=e.src,t=(0,i.Z)(e,["src"]),s=(0,l.useState)(!1),o=s[0],a=s[1],d=(0,l.useRef)(null);return(0,l.useEffect)((function(){d.current&&o&&(d.current.src=n||"")}),[n,o]),(0,l.useEffect)((function(){a(!0)}),[]),(0,r.jsx)("img",c(c({},t),{},{ref:d,src:n}))}},6071:function(e,n,t){"use strict";var s=t(3848),r=t(9448);n.default=void 0;var i=r(t(7294)),l=t(1689),o=t(2441),c=t(5749),a={};function d(e,n,t,s){if(e&&(0,l.isLocalURL)(n)){e.prefetch(n,t,s).catch((function(e){0}));var r=s&&"undefined"!==typeof s.locale?s.locale:e&&e.locale;a[n+"%"+t+(r?"%"+r:"")]=!0}}var u=function(e){var n=!1!==e.prefetch,t=(0,o.useRouter)(),r=t&&t.asPath||"/",u=i.default.useMemo((function(){var n=(0,l.resolveHref)(r,e.href,!0),t=s(n,2),i=t[0],o=t[1];return{href:i,as:e.as?(0,l.resolveHref)(r,e.as):o||i}}),[r,e.href,e.as]),p=u.href,h=u.as,f=e.children,x=e.replace,j=e.shallow,m=e.scroll,g=e.locale;"string"===typeof f&&(f=i.default.createElement("a",null,f));var v=i.Children.only(f),y=v&&"object"===typeof v&&v.ref,w=(0,c.useIntersection)({rootMargin:"200px"}),b=s(w,2),E=b[0],P=b[1],k=i.default.useCallback((function(e){E(e),y&&("function"===typeof y?y(e):"object"===typeof y&&(y.current=e))}),[y,E]);(0,i.useEffect)((function(){var e=P&&n&&(0,l.isLocalURL)(p),s="undefined"!==typeof g?g:t&&t.locale,r=a[p+"%"+h+(s?"%"+s:"")];e&&!r&&d(t,p,h,{locale:s})}),[h,p,P,g,n,t]);var O={ref:k,onClick:function(e){v.props&&"function"===typeof v.props.onClick&&v.props.onClick(e),e.defaultPrevented||function(e,n,t,s,r,i,o,c){("A"!==e.currentTarget.nodeName||!function(e){var n=e.currentTarget.target;return n&&"_self"!==n||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,l.isLocalURL)(t))&&(e.preventDefault(),null==o&&(o=s.indexOf("#")<0),n[r?"replace":"push"](t,s,{shallow:i,locale:c,scroll:o}))}(e,t,p,h,x,j,m,g)},onMouseEnter:function(e){(0,l.isLocalURL)(p)&&(v.props&&"function"===typeof v.props.onMouseEnter&&v.props.onMouseEnter(e),d(t,p,h,{priority:!0}))}};if(e.passHref||"a"===v.type&&!("href"in v.props)){var L="undefined"!==typeof g?g:t&&t.locale,N=t&&t.isLocaleDomain&&(0,l.getDomainLocale)(h,L,t&&t.locales,t&&t.domainLocales);O.href=N||(0,l.addBasePath)((0,l.addLocale)(h,L,t&&t.defaultLocale))}return i.default.cloneElement(v,O)};n.default=u},5749:function(e,n,t){"use strict";var s=t(3848);n.__esModule=!0,n.useIntersection=function(e){var n=e.rootMargin,t=e.disabled||!l,c=(0,r.useRef)(),a=(0,r.useState)(!1),d=s(a,2),u=d[0],p=d[1],h=(0,r.useCallback)((function(e){c.current&&(c.current(),c.current=void 0),t||u||e&&e.tagName&&(c.current=function(e,n,t){var s=function(e){var n=e.rootMargin||"",t=o.get(n);if(t)return t;var s=new Map,r=new IntersectionObserver((function(e){e.forEach((function(e){var n=s.get(e.target),t=e.isIntersecting||e.intersectionRatio>0;n&&t&&n(t)}))}),e);return o.set(n,t={id:n,observer:r,elements:s}),t}(t),r=s.id,i=s.observer,l=s.elements;return l.set(e,n),i.observe(e),function(){l.delete(e),i.unobserve(e),0===l.size&&(i.disconnect(),o.delete(r))}}(e,(function(e){return e&&p(e)}),{rootMargin:n}))}),[t,n,u]);return(0,r.useEffect)((function(){if(!l&&!u){var e=(0,i.requestIdleCallback)((function(){return p(!0)}));return function(){return(0,i.cancelIdleCallback)(e)}}}),[u]),[h,u]};var r=t(7294),i=t(8391),l="undefined"!==typeof IntersectionObserver;var o=new Map},2954:function(e,n,t){"use strict";t.r(n);var s=t(5893),r=(t(7294),t(9790)),i=t(4932);n.default=function(){return(0,s.jsx)(r.A,{children:(0,s.jsxs)("div",{className:"flex flex-col text-center items-center justify-self-center w-full px-2 mt-5",children:[(0,s.jsx)(i.E,{src:"tsdl/goddess.png",width:200,height:200,className:"inline"}),(0,s.jsx)("div",{children:(0,s.jsx)("a",{href:"https://discord.gg/kGauTDGD7V",className:"text-blue-800 underline text-xl",children:"Discord Server"})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{children:(0,s.jsx)("span",{children:"Group Stage: Round Robin"})}),(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{children:"Players will be divided into multiple"}),(0,s.jsx)("strong",{children:(0,s.jsx)("span",{children:"\xa0groups\xa0"})}),(0,s.jsx)("span",{children:"and into 3 different regions (NA, Europe, Asia) to play round robin."})]}),(0,s.jsx)("p",{children:(0,s.jsx)("span",{children:"\xa0"})}),(0,s.jsx)("div",{children:(0,s.jsx)("ul",{children:(0,s.jsx)("li",{children:(0,s.jsxs)("span",{children:["You will play ",(0,s.jsx)("strong",{children:"2 games"})," with each opponent for points. Each win will count as 1 point:"]})})})}),(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:(0,s.jsx)("span",{children:"Win: 3\xa0"})}),(0,s.jsx)("span",{children:"pts (2-0)\xa0"})]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:(0,s.jsx)("span",{children:"Tie: 1"})}),(0,s.jsx)("span",{children:"\xa0pt (1-1)"})]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:(0,s.jsx)("span",{children:"Lose:"})}),(0,s.jsxs)("span",{children:["\xa0",(0,s.jsx)("strong",{children:"0"})," pt (0-2)\xa0"]})]}),(0,s.jsx)("p",{children:(0,s.jsx)("span",{children:"\xa0"})}),(0,s.jsx)("div",{children:(0,s.jsx)("ul",{children:(0,s.jsx)("li",{children:(0,s.jsxs)("span",{children:["The player with the most points from each group will move on to"," ",(0,s.jsx)("strong",{children:"Stage 2"})," ( 1 or 2 depending on how many register)."]})})})}),(0,s.jsx)("p",{children:(0,s.jsx)("span",{children:"\xa0"})}),(0,s.jsx)("p",{children:(0,s.jsx)("span",{children:"*Please note that date and format may change depending on how many players sign up.\xa0"})}),(0,s.jsx)("p",{children:(0,s.jsx)("span",{children:"Final Stage: Single Elimination\xa0"})}),(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:(0,s.jsx)("span",{children:"Best of 3"})}),(0,s.jsx)("span",{children:". Players will be assigned according to results from stage 1. The finals will be Best of 5."})]}),(0,s.jsxs)("li",{children:[(0,s.jsx)("strong",{children:(0,s.jsx)("span",{children:"Top 8 players\xa0"})}),(0,s.jsx)("span",{children:"will be seeded in the next season!"})]}),(0,s.jsx)("p",{children:(0,s.jsx)("span",{children:"Prizes:"})}),(0,s.jsxs)("ul",{children:[(0,s.jsx)("li",{children:(0,s.jsxs)("span",{children:["1st Place",(0,s.jsx)("strong",{children:"\xa0- $300"})]})}),(0,s.jsx)("li",{children:(0,s.jsxs)("span",{children:["2nd Place ",(0,s.jsx)("strong",{children:"- $150"})]})}),(0,s.jsx)("li",{children:(0,s.jsxs)("span",{children:["3",(0,s.jsx)("sup",{children:"rd"}),"/4th Place",(0,s.jsx)("strong",{children:"\xa0- $50"})]})})]}),(0,s.jsx)("p",{children:(0,s.jsx)("span",{children:"\xa0"})}),(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:(0,s.jsx)("span",{children:"*Money prizes will depend on the donations and the ticket rewards may increase."})}),(0,s.jsxs)("span",{children:[(0,s.jsx)("br",{}),"\xa0"]})]}),(0,s.jsx)("p",{children:(0,s.jsx)("span",{children:"Thank you to all our contributors, streamers, participants, and the viewers. Please support us by donating! We can't make this possible without your support. Every dollar counts!"})}),(0,s.jsx)("p",{children:(0,s.jsxs)("span",{children:["Please PM ",(0,s.jsx)("strong",{children:"Maebari#7146\xa0"})," on discord with your in game name and the amount you wish to donate before making donations so we know who is donating.\xa0"]})}),(0,s.jsx)("p",{children:(0,s.jsx)("em",{children:(0,s.jsx)("span",{children:"We will publicly announce your name to thank you (unless you wish to stay anonymous)."})})}),(0,s.jsx)("p",{children:(0,s.jsx)("span",{children:"\xa0"})}),(0,s.jsx)("p",{children:(0,s.jsxs)("span",{children:["Directly support us using the ",(0,s.jsx)("strong",{children:"Donate"})," button below:"]})})]}),(0,s.jsx)("div",{children:(0,s.jsxs)("form",{action:"https://www.paypal.com/donate",method:"post",target:"_top",children:[(0,s.jsx)("input",{type:"hidden",name:"hosted_button_id",value:"VSRMGLKTQQFWS"}),(0,s.jsx)("input",{type:"image",src:"https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif",name:"submit",title:"PayPal - The safer, easier way to pay online!",alt:"Donate with PayPal button"})]})}),(0,s.jsx)("div",{children:(0,s.jsx)("iframe",{src:"https://docs.google.com/forms/d/e/1FAIpQLSetyktcao1y_evr4F_vYM3PkExRtG38CG2YLNPQ6icpZJguYQ/viewform?embedded=true",className:"flex",style:{minHeight:2500,overflow:"hidden"},scrolling:"no",onLoad:function(e){return e.currentTarget.width=screen.width.toString()},children:"Loading\u2026"})})]})})}},9479:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tsdl",function(){return t(2954)}])},1664:function(e,n,t){e.exports=t(6071)},8347:function(e,n,t){"use strict";function s(e,n){if(null==e)return{};var t,s,r=function(e,n){if(null==e)return{};var t,s,r={},i=Object.keys(e);for(s=0;s<i.length;s++)t=i[s],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(s=0;s<i.length;s++)t=i[s],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}t.d(n,{Z:function(){return s}})}},function(e){e.O(0,[774,888,179],(function(){return n=9479,e(e.s=n);var n}));var n=e.O();_N_E=n}]);