(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();function _e(e){return JSON.stringify({exported_at:new Date().toISOString(),profile:e.profile,items:e.items,stage:e.stage,events:e.events},null,2)}function we(e){const t=new Blob([_e(e)],{type:"application/json"}),n=URL.createObjectURL(t),s=document.createElement("a");s.href=n,s.download=`routine-${e.profile.id.slice(0,8)}.json`,s.click(),URL.revokeObjectURL(n)}const he="geen zin",g={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140};function h(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function $e(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===he).length}function xe(e,t){const n=h(e,g.identity_new);return!n||$e(t)<2?null:n}function Se(e){return!!h(e,g.identity_constraint)}function Le(e,t){return t&&!h(e,g.horizon_1y)}function ee(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const te=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],Ee=["zo","ma","di","wo","do","vr","za"];function _(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${s}`}function $(e,t){const n=D(e);return n.setDate(n.getDate()+t),_(n)}function D(e){const[t,n,s]=e.split("-").map(Number);return new Date(t,n-1,s)}function Be(e){const t=D(e);return`${Ee[t.getDay()]} ${t.getDate()} ${te[t.getMonth()]}`}function K(e){const t=D(e);return`${t.getDate()} ${te[t.getMonth()]}`}function Ie(e){const t=D(e).getDay();return t===0?7:t}function ne(e){const t=D(e),n=t.getDay(),s=n===0?-6:1-n;return t.setDate(t.getDate()+s),_(t)}function ie(e,t){const n=[];let s=e;for(;s<=t;)n.push(s),s=$(s,1);return n}function L(){return crypto.randomUUID()}function je(){return new Date().toISOString()}const De=2,Ae=6;function M(e,t){return e.created_at.localeCompare(t.created_at)}function q(e,t,n){return e.filter(s=>s.date===t&&s.kind===n).sort(M).at(-1)}function se(e,t){return t.filter(s=>s.kind==="set").sort(M).at(-1)?.value??e}function Oe(e,t){return q(e,t,"body_sleep")?.value??null}function Te(e,t){return q(e,t,"body_energy")?.value??null}function A(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip")).sort(M).at(-1)}function oe(e,t){const n=A(e,t);return n?.kind==="skip"?n.skip_reason:null}function le(e,t){return A(e,t)?.kind==="done"}function ae(e,t){return A(e,t)?.kind==="set"}function re(e,t){const n=A(e,t);return n?.kind==="set"||n?.kind==="done"}function Me(e,t){return e!==null&&e<Ae||t!==null&&t<=De}function Ce(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const s=Math.max(1,Math.ceil(n/2));return Math.min(t,e+s)}function T(e,t,n,s){if(t<s)return"empty";const i=A(e,t);return i?.kind==="done"||i?.kind==="set"?"done":i?.kind==="skip"?"skip":q(e,t,"miss")?"miss":t>=n?"empty":"miss"}function Ne(e,t,n="1970-01-01"){let s=0,i=t;for(let o=0;o<400;o+=1){const l=T(e,i,t,n);if(l==="done")s+=1;else if(l==="skip"||l==="empty"&&i===t){i=$(i,-1);continue}else break;i=$(i,-1)}return s}function ze(e,t,n){const s=ne(t),i=!n||n<s?s:n;let o=0,l=0;for(const u of ie(i,t)){const f=T(e,u,t,n??i);f==="skip"||f==="empty"||(l+=1,f==="done"&&(o+=1))}return{hits:o,eligible:l}}function qe(e,t,n="1970-01-01",s=3){const i=T(e,t,t,n);if(i==="done"||i==="skip")return!1;const o=$(t,-1);if(o<n)return!1;const l=$(t,-s),u=n>l?n:l;return ie(u,o).some(f=>T(e,f,t,n)==="miss")}function Re(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled&&!e.todayLogged?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function We(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${Y(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${Y(e.milestone)}.`}function Y(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function He(e,t,n){return t.filter(i=>i.kind==="set"&&i.date<=n).sort(M).at(-1)?.value??e}function Pe(e,t,n,s){const i=se(e.a,n),o=Oe(n,s),l=Te(n,s),u=le(n,s),f=ae(n,s),k=re(n,s),r=oe(n,s),c=Me(o,l),y=i>=t.milestone,N=i>=e.b,G=qe(n,s,t.started_on),ge=ne(s),ke=He(e.a,n,$(ge,-1)),be=Re({current:i,weekStartCurrent:ke,gearDown:c,stalled:G,milestoneHit:y,todayLogged:f||u||!!r});return{current:i,sleep:o,energy:l,doneToday:u,plusToday:f,setLoggedToday:k,skipToday:r,gearDown:c,milestoneHit:y,atB:N,trend:be,hitrate:ze(n,s,t.started_on),streak:Ne(n,s,t.started_on),nextAction:We({milestone:t.milestone,b:e.b,gearDown:c,milestoneHit:y,atB:N,stalled:G,doneToday:u,plusToday:f,skipToday:r}),suggestedMilestone:y&&!N&&!c?Ce(t.milestone,e.b):null}}function Fe(){return{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:null,condition:null}}function Ge(e){return{mode:e?.mode??null,clock:e?.clock??null,anchor:e?.anchor??null,offset_min:e?.offset_min??null,window_min:e?.window_min??null,frequency:e?.frequency??null,condition:e?.condition??null}}function Ke(e,t){if(e.timing.frequency==="weekly"||e.type==="weekly"){const s=e.weekdays??[];return s.length===0?!1:s.includes(Ie(t))}return!0}function Ye(e){return e.role==="constraint"}function Ue(e){return e.role!=="constraint"}function R(e){const t=e.timing;return t.condition?t.condition:t.mode==="relative"&&t.anchor==="wake"&&t.offset_min!==null?`${t.offset_min} min na opstaan`:t.mode==="relative"&&t.anchor==="meal"?"na eten":t.mode==="clock"&&t.clock?t.clock:null}function Ve(e){return e.role?e.role:e.label.trim().toLowerCase()==="low carb"?"preference":null}function C(e){return e.a!==null&&e.b!==null&&e.milestone!==null}function Je(e,t){return Ke(e,t)}function Ze(e,t){return{...e,tenant_id:e.tenant_id??t,weekdays:e.weekdays??null,times_per_week:e.times_per_week??null,timing:Ge(e.timing),role:Ve(e),template:e.template??null}}function de(e){return e.type==="medicijn"||e.type==="supplement"}function Qe(e,t){return W(e,t).filter(n=>Ue(n)&&!de(n))}function Xe(e,t){return W(e,t).filter(Ye)}function et(e,t){return W(e,t).filter(de)}function W(e,t){return e.filter(n=>Je(n,t)).sort((n,s)=>n.sort-s.sort)}function H(e){return e.find(C)}function z(e){return e.kind==="body_sleep"||e.kind==="body_energy"||e.kind==="body_weight"}function ce(e,t,n){return e.filter(s=>z(s)?!1:!!(s.item_id===t.id||s.item_id===null&&n&&t.id===n))}function tt(e,t){return t?[...e.filter(z),...ce(e,t,t.id)]:e.filter(z)}function nt(e){return e.a===null?null:e.unit==="sec"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} s`:e.unit==="reps"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} reps`:String(e.a)}function j(e){return e.trim().toLowerCase()}function it(e){const t=new Set,n=[];for(const s of e){const i=j(s.label);t.has(i)||(t.add(i),n.push(s))}return n}function ue(e,t,n){const s=it(e),i=new Set(s.map(l=>j(l.label))),o=t.filter(l=>!i.has(j(l.label))).map(l=>({...l,tenant_id:n}));return[...s,...o]}function st(e){const t=new Map;for(const n of e)for(const s of n)t.has(s.id)||t.set(s.id,s);return[...t.values()].sort((n,s)=>n.created_at.localeCompare(s.created_at))}function ot(e){return e?!!(e.identity_anti||e.identity_new||e.identity_constraint||e.horizon_1y||e.display_name):!1}function lt(e,t,n,s){if(e.length===0)return null;const i=e.reduce((r,c)=>(c.events?.length??0)>(r.events?.length??0)?c:r),o=e.find(r=>ot(r.profile))?.profile??i.profile,l=ue([i,...e.filter(r=>r!==i)].flatMap(r=>r.items??[]),t,s),u=new Map(l.map(r=>[j(r.label),r.id])),f=new Map;for(const r of e)for(const c of r.items??[]){const y=u.get(j(c.label));y&&c.id!==y&&f.set(c.id,y)}const k=st(e.map(r=>r.events??[])).map(r=>{if(!r.item_id)return r;const c=f.get(r.item_id);return c?{...r,item_id:c}:r});return{...i,profile:{...o,id:o.id||n,tenant_id:o.tenant_id||s},items:l,events:k}}const fe=["geen tijd","geen energie","vergeten","geen zin","pijn"],p={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},pe="routine_loop_v6",at=["routine_loop_v5","routine_loop_v4","routine_loop_v3"],U="routine_local_user_id",V="routine_local_tenant_id",rt="routine_local_chosen";function me(e,t){return{id:e,tenant_id:t,display_name:null,...ee()}}function ve(e,t,n=_()){return{id:L(),tenant_id:t,vector_id:e,milestone:p.milestone,started_on:n,deadline:$(n,p.windowDays),status:"active",stage_type:p.stageType}}function P(e){const t=n=>({id:L(),tenant_id:e,timing:Fe(),role:null,template:null,...n});return[t({type:"daily",label:"Push-ups",unit:"reps",a:p.a,b:p.b,milestone:p.milestone,weekdays:null,times_per_week:null,sort:0}),t({type:"daily",label:"Squats",unit:"reps",a:30,b:null,milestone:null,weekdays:null,times_per_week:null,sort:1}),t({type:"daily",label:"Plank",unit:"sec",a:60,b:null,milestone:null,weekdays:null,times_per_week:null,sort:2}),t({type:"daily",label:"Dead hang",unit:"sec",a:45,b:null,milestone:null,weekdays:null,times_per_week:null,sort:3}),t({type:"weekly",label:"Gerichte kracht",unit:null,a:null,b:null,milestone:null,weekdays:[],times_per_week:2,sort:4}),t({type:"leefregel",label:"Koud douchen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:5}),t({type:"leefregel",label:"Niet snoepen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:6}),t({type:"leefregel",label:"Low carb",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:7,role:"preference"}),t({type:"leefregel",label:"Intermittent fasting",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:8}),t({type:"leefregel",label:"Geen alcohol",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:9}),t({type:"gedrag",label:"Cafeïne 90 min na opstaan",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:10,role:"constraint",template:"public-framework",timing:{mode:"relative",clock:null,anchor:"wake",offset_min:90,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Wandelen na eten",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:11,role:"action",template:null,timing:{mode:"relative",clock:null,anchor:"meal",offset_min:0,window_min:null,frequency:"daily",condition:"na eten"}}),t({type:"medicijn",label:"Medicijn ochtend",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:12,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"ochtend"}}),t({type:"supplement",label:"Vitamine D",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:13,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}})]}function dt(e,t){return{id:e.id,tenant_id:e.tenant_id,user_id:t,domain:p.domain,a:e.a??p.a,b:e.b??p.b,unit:e.unit==="sec"?"sec":"reps",pace_constraint:null}}function ct(e,t=_(),n=L()){const s=me(e,n),i=P(n),o=H(i)??i[0],l=dt(o,e),u=ve(l.id,n,t);return o.milestone!==null&&(u.milestone=o.milestone),{profile:s,items:i,vector:l,stage:u,events:[],rotated:!1}}function ut(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,items:e.items.map(n=>C(n)?{...n,a:p.a,b:p.b,milestone:p.milestone,unit:p.unit}:n),vector:{...e.vector,a:p.a,b:p.b,unit:p.unit},stage:{...e.stage,milestone:p.milestone},events:e.events}:e}function ft(){const e=localStorage.getItem(U);if(e)return e;const t=L();return localStorage.setItem(U,t),t}function pt(){const e=localStorage.getItem(V);if(e)return e;const t=L();return localStorage.setItem(V,t),t}function x(e){localStorage.setItem(pe,JSON.stringify(e))}function mt(e){if(!e)return null;try{const t=JSON.parse(e);return!t||typeof t!="object"?null:t}catch{return null}}function vt(){return[pe,...at].map(e=>mt(localStorage.getItem(e))).filter(e=>e!==null)}function yt(e,t,n){const s=ue(e.items??[],P(n),n).map(i=>Ze(i,n));return{...e,profile:{...me(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...ee(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null},items:s,vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(i=>({...i,tenant_id:i.tenant_id??n,item_id:i.item_id??null})),rotated:!!e.rotated}}function E(e,t){const n=vt();if(n.length===0){const o=ct(e,_(),t);return x(o),o}const s=lt(n,P(t),e,t)??n[0],i=ut(yt(s,e,t));return x(i),i}function gt(){localStorage.setItem(rt,"1");const e=ft(),t=pt();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return E(e,t)},async addEvent(n){const s=E(e,t),i={id:n.id??L(),tenant_id:t,user_id:e,item_id:n.item_id??null,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:je()};return s.events.push(i),x(s),i},async saveProfile(n){const s=E(e,t);s.profile=n,x(s)},async saveVectorConstraint(n,s){const i=E(e,t);i.vector.id===n&&(i.vector.pace_constraint=s,x(i))},async advanceStage(n,s){const i=E(e,t),o=ve(n.vector_id,t);return o.milestone=s,i.stage=o,i.items=i.items.map(l=>l.id===n.vector_id?{...l,milestone:s}:l),i.rotated=!0,x(i),o},async signOut(){}}}const J="#F0ECE4",kt="#3D6B5A";function bt(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${J}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${J}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${kt}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function v(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function _t(e){return e==="stokt"||e==="herstel"?"ember":e==="stijgt"?"sage":"fog"}function Z(e){const t=_t(e);return e==="stokt"||e==="herstel"||e==="zakt"?v("status-kink",`ico-${t}`):e==="stijgt"?v("status-up",`ico-${t}`):v("status-flat",`ico-${t}`)}function wt(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${v(n?"dot-now":"dot")}</button>`}).join("")}const ht=`
<svg xmlns="http://www.w3.org/2000/svg" class="sprite" aria-hidden="true">
  <defs>
    <style>
      .s { fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: square; stroke-linejoin: miter; }
    </style>
  </defs>
  <symbol id="i-mark" viewBox="0 0 24 24">
    <g class="s">
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="16" y1="9.5" x2="16" y2="14.5" />
    </g>
    <circle cx="8" cy="12" r="1.6" fill="currentColor" />
  </symbol>
  <symbol id="i-day" viewBox="0 0 24 24">
    <g fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter">
      <rect x="5" y="7" width="14" height="13" />
      <line x1="9" y1="4" x2="9" y2="8" />
      <line x1="15" y1="4" x2="15" y2="8" />
      <line x1="5" y1="11" x2="19" y2="11" />
    </g>
  </symbol>
  <symbol id="i-plus" viewBox="0 0 24 24">
    <g class="s">
      <rect x="5" y="5" width="14" height="14" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </g>
  </symbol>
  <symbol id="i-done" viewBox="0 0 24 24">
    <polyline class="s" points="6 12 10 16 18 8" />
  </symbol>
  <symbol id="i-skip" viewBox="0 0 24 24">
    <g class="s">
      <line x1="7" y1="7" x2="17" y2="17" />
      <line x1="17" y1="7" x2="7" y2="17" />
    </g>
  </symbol>
  <symbol id="i-moon" viewBox="0 0 24 24">
    <path class="s" d="M15 5.5 A7.5 7.5 0 1 0 15 18.5 A5.5 5.5 0 0 1 15 5.5 Z" />
  </symbol>
  <symbol id="i-status-up" viewBox="0 0 24 24">
    <polyline class="s" points="4 17 9 11 13 14 20 6" />
  </symbol>
  <symbol id="i-status-flat" viewBox="0 0 24 24">
    <line class="s" x1="3" y1="12" x2="21" y2="12" />
  </symbol>
  <symbol id="i-status-kink" viewBox="0 0 24 24">
    <polyline class="s" points="3 17 9 8 14 12 21 12" />
  </symbol>
  <symbol id="i-export" viewBox="0 0 24 24">
    <g class="s">
      <path d="M6 14 v5 h12 v-5" />
      <line x1="12" y1="16" x2="12" y2="5" />
      <polyline points="8 9 12 5 16 9" />
    </g>
  </symbol>
  <symbol id="i-ik" viewBox="0 0 24 24">
    <line class="s" x1="4" y1="12" x2="20" y2="12" />
  </symbol>
  <symbol id="i-dot" viewBox="0 0 24 24">
    <circle class="s" cx="12" cy="12" r="7" />
  </symbol>
  <symbol id="i-dot-now" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="7" fill="currentColor" />
  </symbol>
</svg>`;function $t(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",ht)}const Q=()=>document.querySelector("#app"),d={screen:"vandaag",skipItemId:null,advanceWarn:!1,busy:!1,error:null};let w=null,a=null;function ye(){if(!a)throw new Error("geen snapshot");const e=H(a.items);return Pe(a.vector,a.stage,tt(a.events,e),_())}function I(e){if(!a)throw new Error("geen snapshot");const t=_(),n=H(a.items),s=ce(a.events,e,n?.id),i=e.a===null?null:se(e.a,s);return{done:le(s,t),plus:ae(s,t),skip:oe(s,t),logged:re(s,t),current:i}}function m(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function S(){if(!a||!w)return;const e=ye(),{vector:t,stage:n}=a,s=w.mode==="local"?"Lokaal":"Supabase",i=`
    <div class="hdr">
      <div>
        ${bt()}
        <div class="date-s">${Be(_())}</div>
      </div>
      <div class="mode-pill">${s}</div>
    </div>`,o=`
    <nav class="nav">
      <button data-nav="vandaag" class="${d.screen==="vandaag"?"active":""}">${v("day")}Vandaag</button>
      <button data-nav="koers" class="${d.screen==="koers"?"active":""}">${v("mark")}Koers</button>
    </nav>`;if(d.screen==="vandaag"){const l=xe(a.profile.identity_new,a.events),u=_(),f=Qe(a.items,u),k=Xe(a.items,u),r=et(a.items,u);Q().innerHTML=`
      ${i}
      ${w.mode==="local"?'<div class="banner">Lokaal — geen Supabase. +1 / Done / Skip blijven op dit apparaat.</div>':""}
      ${e.gearDown?'<div class="banner hot">Lijf vraagt tempo omlaag. Etappe gaat niet omhoog.</div>':""}
      <div class="sec-hd">Lijf</div>
      <div class="card split">
        <div class="row">
          <div>
            <div class="lbl lbl-ico">${v("moon")} Slaap</div>
            <div class="note">Optioneel. Blokkeert de dag niet.</div>
          </div>
          <div class="num-row">
            <button class="nb" data-act="sleep-dec">−</button>
            <div class="ndisp">${e.sleep===null?"—":e.sleep.toFixed(1)}</div>
            <button class="nb" data-act="sleep-inc">+</button>
          </div>
        </div>
        <div>
          <div class="lbl">Energie</div>
          <div class="dots">${wt(e.energy)}</div>
        </div>
      </div>
      ${k.length?`<div class="sec-hd">Regel</div>${k.map(c=>St(c)).join("")}`:""}
      ${r.length?`<div class="sec-hd">Stofjes</div>${r.map(c=>xt(c)).join("")}`:""}
      <div class="sec-hd">Vandaag</div>
      ${f.map(c=>Lt(c,e,l)).join("")}
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${Z(e.trend.word)}
          <div class="word">${e.trend.word}</div>
        </div>
      </div>
      ${d.error?`<p class="error" style="padding:0 18px">${m(d.error)}</p>`:""}
      ${o}`;return}if(d.screen==="koers"){const l=e.hitrate.eligible===0?"—":`${e.hitrate.hits}/${e.hitrate.eligible}`;Q().innerHTML=`
      ${i}
      <div class="sec-hd">Strength · push-ups</div>
      <div class="card">
        <div class="kv">
          <div><div class="lbl">A</div><div class="val">${b(t.a)}</div></div>
          <div><div class="lbl">B</div><div class="val">${b(t.b)}</div></div>
          <div><div class="lbl">Nu</div><div class="val">${b(e.current)}</div></div>
          <div><div class="lbl">Etappe</div><div class="val">${b(n.milestone)}</div></div>
        </div>
      </div>
      <div class="card">
        <div class="kv">
          <div>
            <div class="lbl">Venster</div>
            <div class="val" style="font-size:1.15rem">${K(n.started_on)} → ${n.deadline?K(n.deadline):"—"}</div>
          </div>
          <div>
            <div class="lbl">Trend</div>
            <div class="val status">${Z(e.trend.word)} ${e.trend.word}</div>
          </div>
          <div>
            <div class="lbl">Hitrate week</div>
            <div class="val">${l}</div>
          </div>
          <div>
            <div class="lbl">Rem</div>
            <div class="val" style="font-size:1.1rem">${m(t.pace_constraint||"—")}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="lbl">Volgende actie</div>
        <div class="action-line">${m(e.nextAction)}</div>
      </div>
      ${Le(a.profile.horizon_1y,a.rotated)?'<div class="banner">Zet een 1-jaars B. Etappes roteren.</div>':""}
      <div class="sec-hd">${v("ik")} Ik</div>
      <div class="card">
        <div class="field">
          <div class="lbl">Leven dat ik weiger</div>
          <textarea data-id="identity_anti" maxlength="${g.identity_anti}">${m(a.profile.identity_anti??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wie ik word</div>
          <textarea data-id="identity_new" maxlength="${g.identity_new}">${m(a.profile.identity_new??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wat B niet mag schenden</div>
          <textarea data-id="identity_constraint" maxlength="${g.identity_constraint}">${m(a.profile.identity_constraint??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">1-jaars B</div>
          <textarea data-id="horizon_1y" maxlength="${g.horizon_1y}">${m(a.profile.horizon_1y??"")}</textarea>
        </div>
        <button class="btn primary" data-act="save-ik">Bewaar</button>
      </div>
      <div class="card stack">
        <button class="btn ghost ico-btn" data-act="export">${v("export")}<span>Exporteer JSON</span></button>
      </div>
      ${d.error?`<p class="error" style="padding:0 18px">${m(d.error)}</p>`:""}
      ${o}`;return}}function xt(e){const t=I(e),n=t.logged||!!t.skip,s=e.type==="medicijn"?"Genomen":"Done",i=R(e);return`
      <div class="card stof">
        <div class="ex-nm">${m(e.label)}</div>
        ${i?`<div class="note">${m(i)}</div>`:""}
        <div class="actions actions-two">
          <button class="btn ico-btn ${t.done?"track":""}" data-act="done" data-item="${e.id}" ${n?"disabled":""}>${v("done")}<span>${s}</span></button>
          <button class="btn ico-btn skip ${t.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${t.logged?"disabled":""}>${v("skip")}<span>Skip</span></button>
        </div>
        ${d.skipItemId===e.id||t.skip?`<div class="chips">${fe.map(o=>`<button class="chip ${t.skip===o?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${o}">${o}</button>`).join("")}</div>`:""}
      </div>`}function St(e){const t=R(e);return`
      <div class="card quiet">
        <div class="ex-nm">${m(e.label)}</div>
        ${t?`<div class="note">${m(t)}</div>`:'<div class="note">Regel. Geen afvinken.</div>'}
      </div>`}function Lt(e,t,n){const s=I(e),i=C(e),o=s.logged||!!s.skip,l=i&&s.current!==null&&e.b!==null&&s.current>=e.b,u=o||l,f=i,k=nt(e),r=R(e),c=f&&t.suggestedMilestone&&e.id===a.vector.id;return`
      <div class="card">
        <div class="ex-nm">${m(e.label)}</div>
        ${r&&!k&&!i?`<div class="note">${m(r)}</div>`:""}
        ${i?`<div class="track">
          <span class="now">${b(s.current??e.a??0)}</span>
          <span>→</span>
          <span class="mid">${b(e.milestone??0)}</span>
          <span>→</span>
          <span class="end">${b(e.b??0)}</span>
        </div>`:k?`<div class="work">${m(k)}</div>`:""}
        <div class="actions ${i?"":"actions-two"}">
          ${i?`<button class="btn ico-btn ${s.plus?"on":""}" data-act="plus" data-item="${e.id}" ${u?"disabled":""}>${v("plus")}<span>+1</span></button>`:""}
          <button class="btn ico-btn ${s.done?"track":""}" data-act="done" data-item="${e.id}" ${o?"disabled":""}>${v("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${s.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${s.logged?"disabled":""}>${v("skip")}<span>Skip</span></button>
        </div>
        ${d.skipItemId===e.id||s.skip?`<div class="chips">${fe.map(y=>`<button class="chip ${s.skip===y?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${y}">${y}</button>`).join("")}</div>`:""}
        ${c?`<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${b(t.suggestedMilestone)}.</div>
               ${d.advanceWarn&&a.profile.identity_constraint?`<div class="banner">Check: ${m(a.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${b(t.suggestedMilestone)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`:`<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${t.suggestedMilestone}">Volgende etappe ${b(t.suggestedMilestone)}</button>
                      </div>`}`:""}
        ${f&&n?`<div class="note">${m(n)}</div>`:""}
      </div>`}function b(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function F(e){if(!d.busy){d.busy=!0,d.error=null;try{await e()}catch(t){d.error=t instanceof Error?t.message:"Er ging iets mis"}finally{d.busy=!1,S()}}}async function Et(e){w=e,a=await w.load(),d.screen="vandaag",S()}async function Bt(){$t(),It(),await Et(gt())}function It(){document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(n==="vandaag"||n==="koers"){d.screen=n,d.skipItemId=null,d.advanceWarn=!1,S();return}jt(t)})}async function jt(e){const t=e.dataset.act;if(!t||!w||!a)return;const n=ye(),s=_();if(t==="sleep-inc"||t==="sleep-dec"){const i=n.sleep??7,o=Math.max(0,Math.min(14,i+(t==="sleep-inc"?.5:-.5)));await B({date:s,kind:"body_sleep",value:o,skip_reason:null,item_id:null});return}if(t==="energy"){const i=Number(e.dataset.n),o=n.energy===i?null:i;if(o===null)return;await B({date:s,kind:"body_energy",value:o,skip_reason:null,item_id:null});return}if(t==="plus"){const i=a.items.find(l=>l.id===e.dataset.item);if(!i||!C(i))return;const o=I(i);if(o.logged||o.skip||i.b!==null&&o.current!==null&&o.current>=i.b)return;await B({date:s,kind:"set",value:(o.current??i.a??0)+1,skip_reason:null,item_id:i.id});return}if(t==="done"){const i=a.items.find(l=>l.id===e.dataset.item);if(!i)return;const o=I(i);if(o.logged||o.skip)return;await B({date:s,kind:"done",value:o.current??i.a,skip_reason:null,item_id:i.id});return}if(t==="skip-open"){const i=e.dataset.item??null;d.skipItemId=d.skipItemId===i?null:i,S();return}if(t==="skip"){const i=a.items.find(u=>u.id===e.dataset.item);if(!i||I(i).logged)return;const l=e.dataset.reason;if(!l)return;await B({date:s,kind:"skip",value:null,skip_reason:l,item_id:i.id}),d.skipItemId=null;return}if(t==="advance"){if(!n.suggestedMilestone)return;if(Se(a.profile.identity_constraint)&&!d.advanceWarn){d.advanceWarn=!0,S();return}await X(n.suggestedMilestone);return}if(t==="advance-go"){if(!n.suggestedMilestone)return;await X(n.suggestedMilestone);return}if(t==="advance-cancel"){d.advanceWarn=!1,S();return}if(t==="save-ik"){const i={...a.profile,identity_anti:h(O("identity_anti"),g.identity_anti),identity_new:h(O("identity_new"),g.identity_new),identity_constraint:h(O("identity_constraint"),g.identity_constraint),horizon_1y:h(O("horizon_1y"),g.horizon_1y)};await F(async()=>{await w.saveProfile(i),a.profile=i});return}if(t==="export"){we(a);return}}function O(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function X(e){await F(async()=>{a.stage=await w.advanceStage(a.stage,e),a.items=a.items.map(t=>t.id===a.stage.vector_id?{...t,milestone:e}:t),a.rotated=!0,d.advanceWarn=!1})}async function B(e){await F(async()=>{const t=await w.addEvent(e);a.events.push(t)})}Bt();
