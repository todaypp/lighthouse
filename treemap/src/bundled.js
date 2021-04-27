/*
* @license Copyright 2020 The Lighthouse Authors. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
* or implied. See the License for the specific language governing
* permissions and limitations under the License.
*/
"use strict";window.LH_CURRENT_VERSION="7.4.0";var webtreemap=function(e){const t="webtreemap-node";function r(e){return e.classList.contains(t)}function n(e){let t=0,n=e;for(;n=n.previousElementSibling;)r(n)&&t++;return t}function o(e){let t=[],o=e;for(;o&&r(o);)t.unshift(n(o)),o=o.parentElement;return t.shift(),t}function i(e){return Math.round(e)+"px"}class s{constructor(e,t){this.node=e,this.options=function(e){const t={padding:e.padding||[14,3,3,3],spacing:e.spacing||0,lowerBound:void 0===e.lowerBound?.1:e.lowerBound,applyMutations:e.applyMutations||(()=>null),caption:e.caption||(e=>e.id||""),showNode:e.showNode||((e,r,n)=>r>20&&n>=t.padding[0]),showChildren:e.showChildren||((e,t,r)=>t>40&&r>40)};return t}(t)}ensureDOM(e){if(e.dom)return e.dom;const r=document.createElement("div");if(r.className=t,this.options.caption){const t=document.createElement("div");t.className="webtreemap-caption",t.innerText=this.options.caption(e),r.appendChild(t)}return e.dom=r,this.options.applyMutations(e),r}selectSpan(e,t,r){let n=e[r].size,o=n,i=0,s=0,a=r;for(;a<e.length;a++){const r=e[a].size;r<n&&(n=r),r>o&&(o=r);const d=i+r,l=Math.max(o*t*t/(d*d),d*d/(n*t*t));if(s&&l>s)break;s=l,i=d}return{end:a,sum:i}}layoutChildren(e,t,r,n){const o=e.size,s=e.children;if(!s)return;let a=-1,d=-1,l=r-1,c=n-1;const h=this.options.spacing,p=this.options.padding;d+=p[0],p[1]&&(l-=p[1]+1),c-=p[2],a+=p[3];let u=0;if(this.options.showChildren(e,l-a,c-d)){const r=Math.sqrt(o/((l-a)*(c-d)));var m=a,f=d;e:for(let n=0;n<s.length;){m=a;const d=r*(l-a),{end:c,sum:p}=this.selectSpan(s,d,n);if(p/o<this.options.lowerBound)break;const w=p/d,y=Math.round(w/r)+1;for(u=n;u<c;u++){const n=s[u],o=n.size/w,a=Math.round(o/r)+1;if(!this.options.showNode(n,a-h,y-h))break e;const d=null==n.dom,l=this.ensureDOM(n),c=l.style;c.left=i(m),c.width=i(a-h),c.top=i(f),c.height=i(y-h),d&&e.dom.appendChild(l),this.layoutChildren(n,t+1,a,y),m+=a-1}f+=y-1,n=c}}for(;u<s.length&&s[u].dom;u++)s[u].dom.parentNode.removeChild(s[u].dom),s[u].dom=void 0}render(e){const t=this.ensureDOM(this.node);t.onclick=e=>{let t=e.target;for(;!r(t);)if(t=t.parentElement,!t)return;let n=o(t);this.zoom(n)},e.appendChild(t),this.layout(this.node,e)}layout(e,t){const r=t.offsetWidth,n=t.offsetHeight;e.dom.style.width=r+"px",e.dom.style.height=n+"px",this.layoutChildren(this.node,0,r,n)}zoom(e){let t=this.node;const[r,n,o,s]=this.options.padding;let a=t.dom.offsetWidth,d=t.dom.offsetHeight;for(const l of e){if(a-=s+n,d-=r+o,!t.children)throw new Error("bad address");for(const e of t.children)e.dom&&(e.dom.style.zIndex="0");t=t.children[l];const e=t.dom.style;e.zIndex="1",e.left=i(s-1),e.width=i(a),e.top=i(r-1),e.height=i(d)}this.layoutChildren(t,0,a,d)}}return e.TreeMap=s,e.flatten=function e(t,r=((e,t)=>`${e}/${t}`)){if(t.children){for(const n of t.children)e(n,r);if(1===t.children.length){const e=t.children[0];t.id+="/"+e.id,t.children=e.children}}},e.getAddress=o,e.isDOMNode=r,e.render=function(e,t,r){new s(t,r).render(e)},e.rollup=function e(t){if(!t.children)return;let r=0;for(const n of t.children)e(n),r+=n.size;r>t.size&&(t.size=r)},e.sort=function e(t){if(t.children){for(const r of t.children)e(r);t.children.sort(((e,t)=>t.size-e.size))}},e.treeify=function(e){const t={size:0};for(const[r,n]of e){const e=r.replace(/\/$/,"").split("/");let o=t;for(;e.length>0;){const t=e.shift();o.children||(o.children=[]);let i=o.children.find((e=>e.id===t));if(i||(i={id:t,size:0},o.children.push(i)),0===e.length){if(0!==i.size)throw new Error(`duplicate path ${r} ${i.size}`);i.size=n}o=i}}return t},e}({});const UNUSED_BYTES_IGNORE_THRESHOLD=20480,UNUSED_BYTES_IGNORE_BUNDLE_SOURCE_RATIO=.5;let treemapViewer;class TreemapViewer{constructor(e,t){const r=e.lhr.audits["script-treemap-data"].details;if(!r||!r.treemapData)throw new Error("missing script-treemap-data");const n=r.treemapData;this.depthOneNodesByGroup={scripts:n},this.nodeToDepthOneNodeMap=new WeakMap;for(const e of Object.values(this.depthOneNodesByGroup))for(const t of e)TreemapUtil.walk(t,(e=>this.nodeToDepthOneNodeMap.set(e,t)));this.nodeToPathMap=new WeakMap,this.documentUrl=e.lhr.requestedUrl,this.el=t,this.getHueForKey=TreemapUtil.stableHasher(TreemapUtil.COLOR_HUES),this.currentTreemapRoot,this.currentViewMode,this.selector,this.viewModes,this.previousRenderState,this.treemap,this.createHeader(),this.initListeners(),this.setSelector({type:"group",value:"scripts"}),this.render()}createHeader(){const e=TreemapUtil.find("a.lh-header--url");e.textContent=this.documentUrl,e.href=this.documentUrl;const t=this.wrapNodesInNewRootNode(this.depthOneNodesByGroup.scripts).resourceBytes;TreemapUtil.find(".lh-header--size").textContent=TreemapUtil.formatBytes(t),this.createBundleSelector()}createBundleSelector(){const e=TreemapUtil.find("select.bundle-selector");e.innerHTML="";const t=[];function r(r,n){const o=TreemapUtil.createChildOf(e,"option");o.value=String(t.length),t.push(r),o.textContent=n}for(const[e,t]of Object.entries(this.depthOneNodesByGroup)){r({type:"group",value:e},"All "+e);for(const e of t)e.children&&r({type:"depthOneNode",value:e.name},e.name)}const n=t.findIndex((e=>this.selector&&e.type===this.selector.type&&e.value===this.selector.value));e.value=String(-1!==n?n:0),e.addEventListener("change",(()=>{const r=Number(e.value),n=t[r];this.setSelector(n),this.render()}))}initListeners(){window.addEventListener("resize",(()=>{this.resize()}));const e=TreemapUtil.find(".lh-treemap");e.addEventListener("click",(e=>{if(!(e.target instanceof HTMLElement))return;e.target.closest(".webtreemap-node")&&this.updateColors()})),e.addEventListener("mouseover",(e=>{if(!(e.target instanceof HTMLElement))return;const t=e.target.closest(".webtreemap-node");t&&t.classList.add("webtreemap-node--hover")})),e.addEventListener("mouseout",(e=>{if(!(e.target instanceof HTMLElement))return;const t=e.target.closest(".webtreemap-node");t&&t.classList.remove("webtreemap-node--hover")}))}wrapNodesInNewRootNode(e){const t=[...e];return{name:this.documentUrl,resourceBytes:t.reduce(((e,t)=>t.resourceBytes+e),0),unusedBytes:t.reduce(((e,t)=>(t.unusedBytes||0)+e),0),children:t}}createViewModes(){const e=[];e.push({id:"all",label:"All",subLabel:TreemapUtil.formatBytes(this.currentTreemapRoot.resourceBytes)});const t=function(e){if(void 0===e.unusedBytes)return;const t=[];for(const r of e.children||[])!r.unusedBytes||r.unusedBytes<20480||TreemapUtil.walk(r,((r,n)=>{r.children||r.unusedBytes&&r.resourceBytes&&(r.unusedBytes/r.resourceBytes<.5||t.push([e.name,...n]))}));return{id:"unused-bytes",label:"Unused Bytes",subLabel:TreemapUtil.formatBytes(e.unusedBytes),highlightNodePaths:t}}(this.currentTreemapRoot);return t&&e.push(t),e}setSelector(e){if(this.selector=e,"group"===e.type)this.currentTreemapRoot=this.wrapNodesInNewRootNode(this.depthOneNodesByGroup[e.value]);else{if("depthOneNode"!==e.type)throw new Error("unknown selector: "+JSON.stringify(e));{let t;e:for(const r of Object.values(this.depthOneNodesByGroup))for(const n of r)if(n.name===e.value){t=n;break e}if(!t)throw new Error("unknown depthOneNode: "+e.value);this.currentTreemapRoot=t}}this.viewModes=this.createViewModes(),this.currentViewMode||(this.currentViewMode=this.viewModes[0])}setViewMode(e){this.currentViewMode=e}render(){const e=!this.previousRenderState||this.previousRenderState.root!==this.currentTreemapRoot,t=!this.previousRenderState||this.previousRenderState.viewMode!==this.currentViewMode;e&&(this.nodeToPathMap=new Map,TreemapUtil.walk(this.currentTreemapRoot,((e,t)=>this.nodeToPathMap.set(e,t))),renderViewModeButtons(this.viewModes),TreemapUtil.walk(this.currentTreemapRoot,(e=>{delete e.dom,e.size=e[this.currentViewMode.partitionBy||"resourceBytes"]||0})),webtreemap.sort(this.currentTreemapRoot),this.treemap=new webtreemap.TreeMap(this.currentTreemapRoot,{padding:[16,3,3,3],spacing:10,caption:e=>this.makeCaption(e)}),this.el.innerHTML="",this.treemap.render(this.el),TreemapUtil.find(".webtreemap-node").classList.add("webtreemap-node--root")),(e||t)&&(this.updateColors(),applyActiveClass(this.currentViewMode.id)),this.previousRenderState={root:this.currentTreemapRoot,viewMode:this.currentViewMode}}resize(){if(!this.treemap)throw new Error("must call .render() first");this.treemap.layout(this.currentTreemapRoot,this.el),this.updateColors()}makeCaption(e){const t=this.currentViewMode.partitionBy||"resourceBytes",r=e[t],n=this.currentTreemapRoot[t],o=[TreemapUtil.elide(e.name,60)];if(void 0!==r&&void 0!==n){let i=`${TreemapUtil.formatBytes(r)} (${Math.round(r/n*100)}%)`;e===this.currentTreemapRoot&&(i=`${t}: ${i}`),o.push(i)}return o.join(" · ")}updateColors(){TreemapUtil.walk(this.currentTreemapRoot,(e=>{const t=this.nodeToDepthOneNodeMap.get(e),r=t?t.name:e.name,n=this.getHueForKey(r);let o="white",i="black";if(void 0!==n){const e=60,t=90;o=TreemapUtil.hsl(n,e,t),i=t>50?"black":"white"}if(this.currentViewMode.highlightNodePaths){const t=this.nodeToPathMap.get(e);t&&this.currentViewMode.highlightNodePaths.some((e=>TreemapUtil.pathsAreEqual(e,t)))||(o="white")}const s=e.dom;s&&(s.style.backgroundColor=o,s.style.color=i)}))}}function renderViewModeButtons(e){const t=TreemapUtil.find(".lh-modes");t.innerHTML="",e.forEach((function(e){const r=TreemapUtil.createChildOf(t,"div","view-mode");r.id="view-mode--"+e.id;const n=TreemapUtil.createChildOf(r,"label");TreemapUtil.createChildOf(n,"span","view-mode__label").textContent=e.label,TreemapUtil.createChildOf(n,"span","view-mode__sublabel lh-text-dim").textContent=` (${e.subLabel})`,TreemapUtil.createChildOf(n,"input","view-mode__button",{type:"radio",name:"view-mode"}).addEventListener("click",(()=>{treemapViewer.setViewMode(e),treemapViewer.render()}))}))}function applyActiveClass(e){const t=TreemapUtil.find(".lh-modes");for(const r of t.querySelectorAll(".view-mode"))r instanceof HTMLElement&&r.classList.toggle("view-mode--active",r.id==="view-mode--"+e)}function injectOptions(e){if(window.__treemapOptions)return;const t=document.createElement("script");t.textContent=`\n    window.__treemapOptions = ${JSON.stringify(e)};\n  `,document.head.append(t)}function init(e){treemapViewer=new TreemapViewer(e,TreemapUtil.find("div.lh-treemap")),injectOptions(e),console.log("window.__treemapOptions",window.__treemapOptions)}function showError(e){document.body.textContent=e}async function main(){if(window.__treemapOptions)init(window.__treemapOptions);else if(new URLSearchParams(window.location.search).has("debug")){const e=await fetch("debug.json");init(await e.json())}else window.addEventListener("message",(e=>{if(e.source!==self.opener)return;const t=e.data,{lhr:r}=t;if(!r)return showError("Error: Invalid options");if(!r.requestedUrl)return showError("Error: Invalid options");init(t)}));self.opener&&!self.opener.closed&&self.opener.postMessage({opened:!0},"*")}document.addEventListener("DOMContentLoaded",main);const KiB=1024,MiB=1048576;class TreemapUtil{static walk(e,t,r){if(r||(r=[]),r.push(e.name),t(e,r),e.children)for(const n of e.children)TreemapUtil.walk(n,t,[...r])}static pathsAreEqual(e,t){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(e[r]!==t[r])return!1;return!0}static pathIsSubpath(e,t){if(e.length>t.length)return!1;for(let r=0;r<e.length;r++)if(e[r]!==t[r])return!1;return!0}static elide(e,t){return e.length<=t?e:e.slice(0,t-1)+"…"}static createElement(e,t,r={}){const n=document.createElement(e);return t&&(n.className=t),Object.keys(r).forEach((e=>{const t=r[e];void 0!==t&&n.setAttribute(e,t)})),n}static createChildOf(e,t,r,n){const o=this.createElement(t,r,n);return e.appendChild(o),o}static find(e,t=document){const r=t.querySelector(e);if(null===r)throw new Error(`query ${e} not found`);return r}static formatBytes(e){return e>=MiB?(e/MiB).toFixed(2)+" MiB":e>=KiB?(e/KiB).toFixed(0)+" KiB":e+" B"}static format(e,t){return"bytes"===t?TreemapUtil.formatBytes(e):"time"===t?e+" ms":`${e} ${t}`}static stableHasher(e){e=[...e];const t=new Map;return r=>{if(t.has(r))return t.get(r);if(0===e.length)return;const n=[...r].reduce(((e,t)=>e+t.charCodeAt(0)),0),[o]=e.splice(n%e.length,1);return t.set(r,o),o}}static hsl(e,t,r){return`hsl(${e}, ${t}%, ${r}%)`}}TreemapUtil.COLOR_HUES=[4.1,339.6,291.2,261.6,230.8,198.7,186.8,174.4,122.4,87.8,65.5,45,35.8,14.4,15.9,0,199.5],"undefined"!=typeof module&&module.exports&&(module.exports=TreemapUtil);