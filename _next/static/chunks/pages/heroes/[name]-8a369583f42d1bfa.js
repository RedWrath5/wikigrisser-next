(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[267],{6059:function(e,s,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/heroes/[name]",function(){return l(8866)}])},8755:function(e,s,l){"use strict";l.d(s,{A:function(){return Layout}});var n=l(5893),t=l(7294),i=l(1664),r=l.n(i),a=l(7639);function Header(){return(0,t.useEffect)(()=>{var e=document.getElementById("site-menu"),s=document.getElementById("top");window.addEventListener("scroll",function(){window.scrollY>=400?(null==e||e.classList.add("nav-sticky"),null==s||s.classList.add("pt-scroll")):(null==e||e.classList.remove("nav-sticky"),null==s||s.classList.remove("pt-scroll"))})},[]),(0,n.jsx)("header",{id:"top",className:"w-full flex flex-col fixed sm:relative bg-black pin-t pin-r pin-l z-10 text-white",children:(0,n.jsxs)("nav",{id:"site-menu",className:"flex flex-col sm:flex-row w-full justify-between items-center px-4 sm:px-6 py-1 bg-black shadow sm:shadow-none border-t-4 border-red-900",children:[(0,n.jsxs)("div",{className:"w-full sm:w-auto self-start sm:self-center flex flex-row sm:flex-none flex-no-wrap justify-between items-center",children:[(0,n.jsx)(r(),{href:"/",children:(0,n.jsxs)("span",{className:"flex flex-row cursor-pointer items-center text-center",children:[(0,n.jsx)(a.E,{src:"/logo-big.jpg",width:50,height:50}),(0,n.jsx)("div",{className:"ml-2",children:"Wikigrisser Next"})]})}),(0,n.jsxs)("button",{id:"menuBtn",className:"hamburger block sm:hidden focus:outline-none",type:"button",onClick:function(){var e=document.getElementById("menuBtn"),s=document.getElementById("menu");null==e||e.classList.toggle("open"),null==s||s.classList.toggle("flex"),null==s||s.classList.toggle("hidden")},children:[(0,n.jsx)("span",{className:"hamburger__top-bun"}),(0,n.jsx)("span",{className:"hamburger__bottom-bun"})]})]}),(0,n.jsx)("div",{id:"menu",className:"w-full sm:w-auto self-end sm:self-center sm:flex flex-col sm:flex-row items-center h-full py-1 pb-4 sm:py-0 sm:pb-0 hidden",children:c.map(e=>(0,n.jsx)(r(),{href:e.url,children:(0,n.jsx)("div",{className:"text-gray-300 font-bold hover:text-white text-lg w-full no-underline sm:w-auto sm:pr-4 py-2 sm:py-1 sm:pt-2 cursor-pointer",children:e.text})},e.text))})]})})}let c=[{text:"News",url:"/news"},{text:"Heroes",url:"/heroes/gallery"},{text:"Skills",url:"/skills"},{text:"Equipment",url:"/equipment"},{text:"Soldiers",url:"/soldiers"},{text:"TSdL",url:"/tsdl"},{text:"Contact",url:"/contact"}];function Layout(e){let{children:s}=e;return(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{id:"page-container",className:"flex flex-col justify-between",children:[(0,n.jsxs)("div",{id:"content-wrap",children:[(0,n.jsx)(Header,{}),(0,n.jsx)("main",{className:"flex pt-14 sm:pt-0",children:s})]}),(0,n.jsx)("footer",{id:"footer",children:"\xa9 ".concat(new Date().getFullYear()," Wikigrisser")})]})})}},6106:function(e,s,l){"use strict";l.d(s,{m:function(){return BoundedColumn}});var n=l(5893);function BoundedColumn(e){let{children:s}=e;return(0,n.jsx)("div",{className:"flex flex-col w-full ml-3 mr-3",style:{maxWidth:"1280px"},children:s})}l(7294)},7639:function(e,s,l){"use strict";l.d(s,{E:function(){return Img}});var n=l(5893),t=l(7294);function Img(e){let{src:s,...l}=e,[i,r]=(0,t.useState)(!1),a=(0,t.useRef)(null);return(0,t.useEffect)(()=>{a.current&&i&&(a.current.src=s||"")},[s,i]),(0,t.useEffect)(()=>{r(!0)},[]),(0,n.jsx)("img",{...l,ref:a,src:s})}},8866:function(e,s,l){"use strict";l.r(s),l.d(s,{__N_SSG:function(){return p},default:function(){return _name_}});var n=l(5893),t=l(7294),i=l(8755),r=l(6106),a=l(6506),c=l(3428);let o=t.createContext(void 0);var d=l(7639);function SkillIcon(e){var s;let{skill:l}=e,i=t.useContext(o),[r,x]=t.useState(null),handlePopoverClose=()=>{x(null)};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:"mb-3",children:(0,n.jsx)(d.E,{src:"/skills/"+l.name+".png",className:"inline",width:70,height:70,onMouseEnter:e=>{x(e.currentTarget)},onMouseLeave:handlePopoverClose,onError:e=>(0,c.f)(e,"/404/skills.png")})}),(0,n.jsx)(a.ZP,{id:"mouse-over-popover",open:!!r,anchorEl:r,className:"pointer-events-none",anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},onClose:handlePopoverClose,disableRestoreFocus:!0,children:(0,n.jsxs)("div",{className:"flex flex-row items-center p-2 flex-wrap",children:[(0,n.jsx)(d.E,{src:"/skills/"+l.name+".png",className:"inline",width:70,height:70,onError:c.f}),null==i?void 0:null===(s=i[l.name])||void 0===s?void 0:s.map(e=>(0,n.jsx)(d.E,{src:"/hero cards/"+e+".png",width:70,height:70,onError:c.f},e))]})})]})}function SkillSection(e){let{skill:s,isAwakening:l}=e;return(0,n.jsxs)("div",{className:"grid grid-cols-12 items-center mt-2 mb-2",children:[(0,n.jsx)("div",{className:"col-span-12 text-center sm:col-span-1",children:(0,n.jsx)(SkillIcon,{skill:s})}),(0,n.jsxs)("div",{className:"col-span-12 text-center sm:col-span-11 sm:text-left",children:[(0,n.jsxs)("p",{className:"text-2xl",children:[l&&"Awakening: ",s.name]}),(0,n.jsxs)("p",{children:["Cost: ",s.cost," / CD: ",s.cd||0," / Range: ",s.range," / Span: ",s.span]}),(0,n.jsx)("p",{className:"whitespace-pre-line",children:s.description})]})]})}function HeroIcon(e){let{name:s}=e;return(0,n.jsx)("div",{className:"flex flex-row bg-gray-200 justify-center",children:(0,n.jsx)(r.m,{children:(0,n.jsx)("div",{className:"flex- flex-row w-full ml-2 mr-2",children:(0,n.jsxs)("div",{className:"flex mt-2 mb-2 items-center justify-center sm:justify-start",children:[(0,n.jsx)(d.E,{src:"/classes/"+s+".png",className:"inline",width:70,height:75,onError:e=>(0,c.f)(e,"/404/classes.png")}),(0,n.jsx)("div",{children:(0,n.jsx)("div",{className:"ml-2 text-2xl",children:s})})]})})})})}function ClassSection(e){let{heroClass:s}=e;return(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:"flex flex-col justify-center",children:[(0,n.jsx)(HeroIcon,{name:s.name}),(0,n.jsx)("div",{className:"flex flex-row justify-center",children:(0,n.jsx)(r.m,{children:(0,n.jsx)("div",{className:"flex flex-col mt-2 mb-2",children:s.skills.map(e=>e&&(0,n.jsx)(SkillSection,{skill:e},e.name))})})}),s.children.map(e=>(0,n.jsx)(ClassSection,{heroClass:e},e.name))]})})}function ExclusiveEquipmentSection(e){let{equipment:s}=e;return(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:"grid grid-cols-12 items-center mt-2 mb-2",children:[(0,n.jsx)("div",{className:"col-span-12 text-center sm:col-span-1",children:(0,n.jsx)("div",{className:"mb-3",children:(0,n.jsx)(d.E,{src:"/equipment/"+s.name+".png",className:"inline",width:70,height:70,onError:c.f})})}),(0,n.jsxs)("div",{className:"col-span-12 text-center sm:col-span-11 sm:text-left",children:[(0,n.jsx)("p",{className:"text-2xl",children:"Exclusive Equipment:  ".concat(s.name)}),(0,n.jsx)("p",{className:"whitespace-pre-line",children:s.effect})]})]})})}var x=l(615);function HeroSkinCarousel(e){let{hero:s}=e,l=[(0,n.jsx)("div",{children:(0,n.jsx)(d.E,{src:"/heroes/".concat(s.prettyName,"/").concat(s.prettyName,".png"),width:400,height:400,onError:c.f})},s.name)];return s.spClass&&l.push((0,n.jsx)("div",{children:(0,n.jsx)(d.E,{src:"/heroes/".concat(s.prettyName,"/").concat(s.prettyName," SP.png"),width:400,height:400,onError:c.f})},"sp")),Array.apply(null,Array(s.skinCount)).forEach((e,t)=>{l.push((0,n.jsx)("div",{children:(0,n.jsx)(d.E,{src:"/heroes/".concat(s.prettyName,"/").concat(s.prettyName," Skin ").concat(t+1,".png"),width:400,height:400,onError:c.f})},t))}),(0,n.jsx)(x.lr,{width:400,showArrows:!0,showThumbs:!1,showStatus:!1,infiniteLoop:!0,stopOnHover:!0,dynamicHeight:!0,children:l})}function SoldiersSubSection(e){let{heroClass:s,isStarting:l=!1,isSpClass:t=!1}=e,i="/unitTypeFlag/"+s.heroType+".png";return l&&(i="/unitTypeFlag/Aniki.png"),t&&(i="/unitTypeFlag/"+s.heroType+" SP.png"),(0,n.jsxs)(n.Fragment,{children:[s.soldiers.length>0&&(0,n.jsxs)("div",{className:"grid grid-cols-12 items-center mt-2 mb-2",children:[(0,n.jsx)("div",{className:"col-span-12 text-center sm:col-span-1",children:(0,n.jsx)("div",{className:"mb-3",children:(0,n.jsx)(d.E,{src:i,width:67,height:72,className:"inline",onError:c.f})})}),(0,n.jsxs)("div",{className:"col-span-12 text-center sm:col-span-11 sm:text-left",children:[(0,n.jsxs)("p",{className:"text-2xl",children:[l&&"Training Ground ",!l&&s.name]}),(0,n.jsxs)("p",{children:["Soldiers:"," ",s.soldiers.map((e,l)=>(0,n.jsxs)("span",{children:[e,l<s.soldiers.length-1&&", "]},e))]})]})]}),!l&&s.children[0]&&(0,n.jsx)(SoldiersSubSection,{heroClass:s.children[0]})]})}function SoldiersSection(e){let{hero:{startingClass:s,spClass:l}}=e;return(0,n.jsxs)("div",{className:"flex flex-col justify-center",children:[(0,n.jsx)("div",{className:"flex flex-row bg-gray-200 justify-center",children:(0,n.jsx)(r.m,{children:(0,n.jsx)("div",{className:"flex mt-2 mb-2 items-center justify-center sm:justify-start",children:(0,n.jsx)("div",{className:"ml-2 text-2xl",children:"Classes & Soldiers"})})})}),(0,n.jsx)("div",{className:"flex flex-row justify-center ",children:(0,n.jsxs)(r.m,{children:[s.children.map(e=>(0,n.jsx)(SoldiersSubSection,{heroClass:e},e.name)),(0,n.jsx)(SoldiersSubSection,{heroClass:s,isStarting:!0}),l&&(0,n.jsx)(SoldiersSubSection,{heroClass:l,isSpClass:!0})]})})]})}function SoldierBonusSection(e){let{bonus:{atk:s,hp:l,def:t,mdef:i},name:r}=e;return(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)("li",{className:"mr-2",children:r})}),(0,n.jsxs)("td",{children:["HP: ",l,"% | ATK: ",s,"% | DEF: ",t,"% | MDEF: ",i,"%"]})]})}function TalentSection(e){var s,l;let{hero:{factions:t,talent:i,name:r,prettyName:a,startingClass:o,bondRequirments:x,soldierBonus:h,spClass:u}}=e,j=function findMaxStats(e){if(!e.children)return[];let s=[];return e.maxStats&&(s=s.concat({className:e.name,stats:e.maxStats})),e.children.reduce((e,s)=>e.concat(findMaxStats(s)),s)}(o);return u&&(j=j.concat({className:u.name,stats:u.maxStats||m})),(0,n.jsxs)("div",{className:"mb-2 p-4 grid grid-cols-12 gap-2",children:[(0,n.jsx)("div",{className:"col-span-12 sm:col-span-1 text-center align-middle",children:t.map(e=>(0,n.jsx)("span",{children:(0,n.jsx)(d.E,{src:"/factions/"+e+".png",className:"inline",width:50,height:50})},e))}),(0,n.jsxs)("div",{className:"col-span-12 sm:col-span-2 text-center align-middle",children:[(0,n.jsx)(d.E,{src:"/talents/"+a+".png",className:"inline",width:175,height:158,onError:e=>(0,c.f)(e,"/404/talents.png")}),u&&(0,n.jsx)(d.E,{src:"/talents/"+a+" SP.png",className:"inline ml-3 sm:ml-0 sm:mt-3",width:175,height:158,onError:c.f})]}),(0,n.jsxs)("div",{className:"col-span-12 sm:col-span-9 pt-2",children:[(0,n.jsxs)("p",{className:"text-2xl",children:["Talent: ",null==i?void 0:i.name]}),(0,n.jsx)("p",{className:"whitespace-pre-line",children:null==i?void 0:i.description}),u&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("p",{className:"text-2xl mt-3",children:["SP Talent: ",null===(s=u.talent)||void 0===s?void 0:s.name]}),(0,n.jsx)("p",{className:"whitespace-pre-line",children:null===(l=u.talent)||void 0===l?void 0:l.description})]}),x&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("p",{className:"pt-5 font-bold",children:"Bond Requirement:"}),(0,n.jsx)("li",{children:"Glory: Level 5 Intimacy."}),(0,n.jsxs)("li",{children:["Light: Level 10 Intimacy + ",x.bond2]}),(0,n.jsxs)("li",{children:["Honor: Level 15 Intimacy + ",x.bond3]}),(0,n.jsxs)("li",{children:["Toughness: Level 23 Intimacy + ",x.bond4]}),(0,n.jsxs)("li",{children:["Strength: Level 25 Intimacy + ",x.bond5]})]}),x&&x.relatedBonds.length>0&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("p",{className:"pt-5 font-bold",children:"Related Bonds"}),x.relatedBonds.map(e=>(0,n.jsxs)("li",{children:[(0,n.jsx)("a",{href:"/heroes/"+e.name,className:"underline",children:e.prettyName}),(0,n.jsxs)("span",{className:"ml-1",children:[e.type,": ",e.text]})]},e.name+e.text))]}),j.length>0&&(0,n.jsx)("p",{className:"pt-5 font-bold",children:"Level 70 Max Stats:"}),(0,n.jsx)("table",{children:(0,n.jsx)("tbody",{children:j.map(e=>(0,n.jsxs)("tr",{className:"list-disc",children:[(0,n.jsx)("td",{children:(0,n.jsx)("li",{className:"mr-2",children:e.className})}),(0,n.jsxs)("td",{children:["HP: ",e.stats.hp," | ATK: ",e.stats.atk," | INT:"," ",e.stats.int," | DEF: ",e.stats.def," | MDEF:",e.stats.mdef," | SKL: ",e.stats.skill]})]},e.className))})}),h&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("p",{className:"pt-5 font-bold",children:"Soldier Bonus:"}),(0,n.jsx)("table",{children:(0,n.jsxs)("tbody",{children:[(0,n.jsx)(SoldierBonusSection,{name:j.map(e=>e.className).filter(e=>e!==(null==u?void 0:u.name)).join(" / "),bonus:h}),u&&(0,n.jsx)(SoldierBonusSection,{name:u.name,bonus:u.soldierBonus})]})})]})]})]})}let m={atk:"0",def:"0",hp:"0",int:"0",mdef:"0",skill:"0"};var h=l(916),u=l(44);function HeroCard(e){let{heroClass:s}=e;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(HeroIcon,{name:s.name}),(0,n.jsx)("div",{className:"flex flex-row justify-center",children:(0,n.jsx)(r.m,{children:(0,n.jsx)("div",{className:"flex flex-col mt-2 mb-2",children:s.materials.map((e,s)=>(0,n.jsx)(MaterialList,{materials:e,tier:s+1},s))})})}),(0,n.jsx)("div",{children:s.children.map(e=>(0,n.jsx)(HeroCard,{heroClass:e},e.name))})]})}function MaterialList(e){let{materials:s,tier:l}=e;return(0,n.jsxs)("div",{className:"flex- flex-row w-full",children:[(0,n.jsx)("p",{className:"mb-3 text-center sm:text-left",children:(0,n.jsx)("b",{children:"Tier ".concat(l)})}),(0,n.jsx)("div",{className:"flex flex-wrap justify-start mb-2",children:s.map(e=>(0,n.jsx)(MaterialItem,{material:e},e.name))})]})}function MaterialItem(e){let{material:s}=e;return(0,n.jsxs)("div",{className:"w-20 ml-1",children:[(0,n.jsx)(d.E,{src:"/job material/"+s.name+".png",className:"block",width:70,height:75,alt:s.name,onError:c.f}),(0,n.jsx)("div",{children:(0,n.jsxs)("b",{children:["x ",s.count]})})]})}function MaterialSection(e){let{heroClass:s}=e;return(0,n.jsx)("div",{className:"flex flex-col justify-center ",children:(0,n.jsx)(HeroCard,{heroClass:s})})}function SPSection(e){let{spClass:s}=e;return(0,n.jsxs)("div",{className:"flex flex-col justify-center ",children:[(0,n.jsx)(StageHeader,{stageNumber:1}),(0,n.jsx)(StageSection,{stage:s.unlockRequirments.stage1}),(0,n.jsx)(StageHeader,{stageNumber:2}),(0,n.jsx)(StageSection,{stage:s.unlockRequirments.stage2})]})}function StageSection(e){let{stage:s}=e;return(0,n.jsx)("div",{className:"flex flex-row justify-center",children:(0,n.jsx)(r.m,{children:s.map(e=>(0,n.jsx)("div",{className:"grid grid-cols-12 items-center mt-2 mb-2",children:(0,n.jsxs)("div",{className:"col-span-12 text-center sm:text-left",children:[(0,n.jsx)("p",{className:"text-2xl",children:e.name}),(0,n.jsx)("p",{children:e.requirement})]})}))})})}function StageHeader(e){let{stageNumber:s}=e;return(0,n.jsx)("div",{className:"flex flex-row bg-gray-200 justify-center py-3",children:(0,n.jsx)(r.m,{children:(0,n.jsx)("div",{className:"flex flex-row w-full justify-center sm:justify-start",children:(0,n.jsxs)("div",{className:"text-2xl",children:["Stage ",s]})})})})}function InscriptionSection(e){let{inscription:s}=e;return(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:"grid grid-cols-12 items-center mt-2 mb-2",children:[(0,n.jsx)("div",{className:"col-span-12 text-center sm:col-span-1",children:(0,n.jsx)("div",{className:"mb-3",children:(0,n.jsx)(d.E,{src:"/Inscription/Inscription Skill.png",className:"inline",width:70,height:70})})}),(0,n.jsxs)("div",{className:"col-span-12 text-center sm:col-span-11 sm:text-left",children:[(0,n.jsx)("p",{className:"text-2xl",children:"Casting Pattern:  ".concat(s.skillName)}),(0,n.jsx)("p",{className:"whitespace-pre-line",children:s.skillEffect})]})]})})}var j=l(7922),f=l(9747);function SkinsSection(e){let{hero:s,skins:l}=e,[i,r]=(0,t.useState)(0),a=s.includes("Matthew")?"Matthew":s;return(0,n.jsxs)("div",{className:"flex flex-col justify-center",children:[(0,n.jsx)("div",{className:"bg-gray-200",children:(0,n.jsx)("div",{className:"flex flex-row flex-wrap gap-2 justify-center m-2",children:l.map((e,s)=>(0,n.jsx)("div",{className:"flex flex-col gap-1",children:(0,n.jsx)(d.E,{src:"/hero cards - skin/".concat(a," ").concat(e.index,".png"),width:102,height:170,onError:c.f,onClick:()=>r(s),className:"cursor-pointer "+(i!==s?"opacity-60":"")},e.index)}))})}),(0,n.jsx)(f.Z,{children:(0,n.jsx)(j.Z,{timeout:750,children:(0,n.jsx)(SkinCard,{skin:l[i],hero:s})},l[i].index)})]})}function SkinCard(e){let{hero:s,skin:l}=e,{index:t}=l,i=s.includes("Matthew")?"Matthew":s,ListItem=e=>{let{label:s,value:l}=e;return(0,n.jsxs)("li",{children:[(0,n.jsxs)("span",{className:"font-bold",children:[s,": "]})," ",l]})};return(0,n.jsxs)("div",{className:"flex flex-col justify-center items-center gap-1",children:[(0,n.jsxs)("ul",{className:"list-none",children:[l.name&&(0,n.jsx)(ListItem,{label:"Name",value:l.name}),l.source&&(0,n.jsx)(ListItem,{label:"Source",value:l.source}),l.cost&&(0,n.jsx)(ListItem,{label:"Cost",value:l.cost}),l.notes&&(0,n.jsx)(ListItem,{label:"Notes",value:l.notes})]}),(0,n.jsx)(d.E,{src:"/heroes/".concat(s,"/").concat(i," ").concat(t,".png"),width:400,height:400,onError:c.f})]})}function HeartBondSection(e){let{heartBond:s}=e,row=(e,s)=>(0,n.jsxs)("div",{className:"flex flex-row",children:[(0,n.jsx)("div",{className:"font-bold mr-2",children:e}),(0,n.jsx)("div",{className:"whitespace-pre-line",children:s})]});return(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:"grid grid-cols-12 items-center mt-2 mb-2",children:[(0,n.jsx)("div",{className:"col-span-12 text-center sm:col-span-1",children:(0,n.jsx)("div",{className:"mb-3",children:(0,n.jsx)(d.E,{src:"/confession/Heart Bond.png",className:"inline",width:70,height:70})})}),(0,n.jsxs)("div",{className:"col-span-12 text-center sm:col-span-11 sm:text-left",children:[s.lvl4&&row("Level 4",s.lvl4),s.lvl7&&row("Level 7",s.lvl7)]})]})})}function HeroComponent(e){var s,l;let{hero:i}=e,[a,c]=(0,t.useState)("main"),label=e=>(0,n.jsx)("span",{className:"font-semibold text-lg",children:e});return(0,n.jsxs)("div",{className:"bg-white flex flex-grow justify-center flex-col",children:[(0,n.jsx)("h1",{className:"text-6xl text-center mt-5 mb-10 font-thin text-gray-600",children:i.prettyName}),(0,n.jsx)("div",{className:"flex flex-wrap justify-center",children:(0,n.jsx)("div",{className:"w-full px-4",style:{maxWidth:"500px"},children:(0,n.jsx)(HeroSkinCarousel,{hero:i})})}),(0,n.jsx)("div",{className:"flex bg-gray-900 text-white font-sans font-normal justify-center",children:(0,n.jsxs)(r.m,{children:[(0,n.jsx)(TalentSection,{hero:i}),(i.heartBond.lvl4||i.heartBond.lvl7)&&(0,n.jsx)(HeartBondSection,{heartBond:i.heartBond}),(null===(s=i.exclusiveEquipment)||void 0===s?void 0:s.name)&&(0,n.jsx)(ExclusiveEquipmentSection,{equipment:i.exclusiveEquipment}),i.threeCostSkill&&(0,n.jsx)(SkillSection,{skill:i.threeCostSkill,isAwakening:!0}),(null===(l=i.inscription)||void 0===l?void 0:l.skillName)&&(0,n.jsx)(InscriptionSection,{inscription:i.inscription})]})}),(0,n.jsxs)("div",{className:"flex flex-col",children:[(0,n.jsx)("div",{className:"flex flex-wrap justify-center",children:(0,n.jsxs)(h.Z,{value:a,onChange:(e,s)=>{c(s)},children:[(0,n.jsx)(u.Z,{label:label("Class"),value:"main"}),(0,n.jsx)(u.Z,{label:label("Materials"),value:"materials"}),i.spClass&&(0,n.jsx)(u.Z,{label:label("SP Quests"),value:"sp"}),i.skins&&(0,n.jsx)(u.Z,{label:label("Skins"),value:"skins"})]})}),"main"===a&&(0,n.jsxs)(t.Fragment,{children:[(0,n.jsx)(SoldiersSection,{hero:i}),(0,n.jsx)(ClassSection,{heroClass:i.startingClass}),i.spClass&&(0,n.jsx)(ClassSection,{heroClass:i.spClass})]}),"materials"===a&&(0,n.jsx)(MaterialSection,{heroClass:i.startingClass}),"sp"===a&&i.spClass&&(0,n.jsx)(SPSection,{spClass:i.spClass}),"skins"===a&&i.skins&&(0,n.jsx)(SkinsSection,{hero:i.prettyName,skins:i.skins})]})]})}var p=!0,_name_=e=>{let{heroData:s,skillsToHeroMap:l}=e;return(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(o.Provider,{value:l,children:(0,n.jsx)(i.A,{children:(0,n.jsx)(HeroComponent,{hero:s})})})})}},3428:function(e,s,l){"use strict";function addDefaultSrc(e,s){let l="/404/Card.png";s&&(l=s),e.currentTarget.src=l}l.d(s,{f:function(){return addDefaultSrc}})}},function(e){e.O(0,[664,268,218,697,428,774,888,179],function(){return e(e.s=6059)}),_N_E=e.O()}]);