(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();function ke(e){return JSON.stringify({exported_at:new Date().toISOString(),profile:e.profile,items:e.items,stage:e.stage,events:e.events},null,2)}function _e(e){const t=new Blob([ke(e)],{type:"application/json"}),n=URL.createObjectURL(t),s=document.createElement("a");s.href=n,s.download=`routine-${e.profile.id.slice(0,8)}.json`,s.click(),URL.revokeObjectURL(n)}const be="geen zin",g={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140};function h(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function we(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===be).length}function he(e,t){const n=h(e,g.identity_new);return!n||we(t)<2?null:n}function $e(e){return!!h(e,g.identity_constraint)}function xe(e,t){return t&&!h(e,g.horizon_1y)}function Q(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const X=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],Se=["zo","ma","di","wo","do","vr","za"];function b(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${s}`}function $(e,t){const n=A(e);return n.setDate(n.getDate()+t),b(n)}function A(e){const[t,n,s]=e.split("-").map(Number);return new Date(t,n-1,s)}function Le(e){const t=A(e);return`${Se[t.getDay()]} ${t.getDate()} ${X[t.getMonth()]}`}function F(e){const t=A(e);return`${t.getDate()} ${X[t.getMonth()]}`}function Ee(e){const t=A(e).getDay();return t===0?7:t}function ee(e){const t=A(e),n=t.getDay(),s=n===0?-6:1-n;return t.setDate(t.getDate()+s),b(t)}function te(e,t){const n=[];let s=e;for(;s<=t;)n.push(s),s=$(s,1);return n}function L(){return crypto.randomUUID()}function Be(){return new Date().toISOString()}const Ie=2,Ae=6;function C(e,t){return e.created_at.localeCompare(t.created_at)}function q(e,t,n){return e.filter(s=>s.date===t&&s.kind===n).sort(C).at(-1)}function ne(e,t){return t.filter(s=>s.kind==="set").sort(C).at(-1)?.value??e}function Oe(e,t){return q(e,t,"body_sleep")?.value??null}function De(e,t){return q(e,t,"body_energy")?.value??null}function O(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip")).sort(C).at(-1)}function ie(e,t){const n=O(e,t);return n?.kind==="skip"?n.skip_reason:null}function se(e,t){return O(e,t)?.kind==="done"}function oe(e,t){return O(e,t)?.kind==="set"}function re(e,t){const n=O(e,t);return n?.kind==="set"||n?.kind==="done"}function Te(e,t){return e!==null&&e<Ae||t!==null&&t<=Ie}function Me(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const s=Math.max(1,Math.ceil(n/2));return Math.min(t,e+s)}function M(e,t,n,s){if(t<s)return"empty";const i=O(e,t);return i?.kind==="done"||i?.kind==="set"?"done":i?.kind==="skip"?"skip":q(e,t,"miss")?"miss":t>=n?"empty":"miss"}function Ce(e,t,n="1970-01-01"){let s=0,i=t;for(let o=0;o<400;o+=1){const r=M(e,i,t,n);if(r==="done")s+=1;else if(r==="skip"||r==="empty"&&i===t){i=$(i,-1);continue}else break;i=$(i,-1)}return s}function Ne(e,t,n){const s=ee(t),i=!n||n<s?s:n;let o=0,r=0;for(const c of te(i,t)){const u=M(e,c,t,n??i);u==="skip"||u==="empty"||(r+=1,u==="done"&&(o+=1))}return{hits:o,eligible:r}}function je(e,t,n="1970-01-01",s=3){const i=M(e,t,t,n);if(i==="done"||i==="skip")return!1;const o=$(t,-1);if(o<n)return!1;const r=$(t,-s),c=n>r?n:r;return te(c,o).some(u=>M(e,u,t,n)==="miss")}function ze(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled&&!e.todayLogged?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function qe(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${K(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${K(e.milestone)}.`}function K(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function Re(e,t,n){return t.filter(i=>i.kind==="set"&&i.date<=n).sort(C).at(-1)?.value??e}function We(e,t,n,s){const i=ne(e.a,n),o=Oe(n,s),r=De(n,s),c=se(n,s),u=oe(n,s),k=re(n,s),l=ie(n,s),p=Te(o,r),y=i>=t.milestone,j=i>=e.b,P=je(n,s,t.started_on),ye=ee(s),me=Re(e.a,n,$(ye,-1)),ge=ze({current:i,weekStartCurrent:me,gearDown:p,stalled:P,milestoneHit:y,todayLogged:u||c||!!l});return{current:i,sleep:o,energy:r,doneToday:c,plusToday:u,setLoggedToday:k,skipToday:l,gearDown:p,milestoneHit:y,atB:j,trend:ge,hitrate:Ne(n,s,t.started_on),streak:Ce(n,s,t.started_on),nextAction:qe({milestone:t.milestone,b:e.b,gearDown:p,milestoneHit:y,atB:j,stalled:P,doneToday:c,plusToday:u,skipToday:l}),suggestedMilestone:y&&!j&&!p?Me(t.milestone,e.b):null}}function He(){return{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:null,condition:null}}function Pe(e){return{mode:e?.mode??null,clock:e?.clock??null,anchor:e?.anchor??null,offset_min:e?.offset_min??null,window_min:e?.window_min??null,frequency:e?.frequency??null,condition:e?.condition??null}}function Fe(e,t){if(e.timing.frequency==="weekly"||e.type==="weekly"){const s=e.weekdays??[];return s.length===0?!1:s.includes(Ee(t))}return!0}function Ke(e){return e.role==="constraint"}function Ge(e){return e.role!=="constraint"}function ae(e){const t=e.timing;return t.condition?t.condition:t.mode==="relative"&&t.anchor==="wake"&&t.offset_min!==null?`${t.offset_min} min na opstaan`:t.mode==="relative"&&t.anchor==="meal"?"na eten":t.mode==="clock"&&t.clock?t.clock:null}function Ye(e){return e.role?e.role:e.label.trim().toLowerCase()==="low carb"?"preference":null}function N(e){return e.a!==null&&e.b!==null&&e.milestone!==null}function Ue(e,t){return Fe(e,t)}function Ve(e,t){return{...e,tenant_id:e.tenant_id??t,weekdays:e.weekdays??null,times_per_week:e.times_per_week??null,timing:Pe(e.timing),role:Ye(e),template:e.template??null}}function Je(e,t){return le(e,t).filter(Ge)}function Ze(e,t){return le(e,t).filter(Ke)}function le(e,t){return e.filter(n=>Ue(n,t)).sort((n,s)=>n.sort-s.sort)}function R(e){return e.find(N)}function z(e){return e.kind==="body_sleep"||e.kind==="body_energy"||e.kind==="body_weight"}function de(e,t,n){return e.filter(s=>z(s)?!1:!!(s.item_id===t.id||s.item_id===null&&n&&t.id===n))}function Qe(e,t){return t?[...e.filter(z),...de(e,t,t.id)]:e.filter(z)}function Xe(e){return e.a===null?null:e.unit==="sec"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} s`:e.unit==="reps"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} reps`:String(e.a)}function I(e){return e.trim().toLowerCase()}function et(e){const t=new Set,n=[];for(const s of e){const i=I(s.label);t.has(i)||(t.add(i),n.push(s))}return n}function ce(e,t,n){const s=et(e),i=new Set(s.map(r=>I(r.label))),o=t.filter(r=>!i.has(I(r.label))).map(r=>({...r,tenant_id:n}));return[...s,...o]}function tt(e){const t=new Map;for(const n of e)for(const s of n)t.has(s.id)||t.set(s.id,s);return[...t.values()].sort((n,s)=>n.created_at.localeCompare(s.created_at))}function nt(e){return e?!!(e.identity_anti||e.identity_new||e.identity_constraint||e.horizon_1y||e.display_name):!1}function it(e,t,n,s){if(e.length===0)return null;const i=e.reduce((l,p)=>(p.events?.length??0)>(l.events?.length??0)?p:l),o=e.find(l=>nt(l.profile))?.profile??i.profile,r=ce([i,...e.filter(l=>l!==i)].flatMap(l=>l.items??[]),t,s),c=new Map(r.map(l=>[I(l.label),l.id])),u=new Map;for(const l of e)for(const p of l.items??[]){const y=c.get(I(p.label));y&&p.id!==y&&u.set(p.id,y)}const k=tt(e.map(l=>l.events??[])).map(l=>{if(!l.item_id)return l;const p=u.get(l.item_id);return p?{...l,item_id:p}:l});return{...i,profile:{...o,id:o.id||n,tenant_id:o.tenant_id||s},items:r,events:k}}const st=["geen tijd","geen energie","vergeten","geen zin","pijn"],f={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},ue="routine_loop_v6",ot=["routine_loop_v5","routine_loop_v4","routine_loop_v3"],G="routine_local_user_id",Y="routine_local_tenant_id",rt="routine_local_chosen";function fe(e,t){return{id:e,tenant_id:t,display_name:null,...Q()}}function pe(e,t,n=b()){return{id:L(),tenant_id:t,vector_id:e,milestone:f.milestone,started_on:n,deadline:$(n,f.windowDays),status:"active",stage_type:f.stageType}}function W(e){const t=n=>({id:L(),tenant_id:e,timing:He(),role:null,template:null,...n});return[t({type:"daily",label:"Push-ups",unit:"reps",a:f.a,b:f.b,milestone:f.milestone,weekdays:null,times_per_week:null,sort:0}),t({type:"daily",label:"Squats",unit:"reps",a:30,b:null,milestone:null,weekdays:null,times_per_week:null,sort:1}),t({type:"daily",label:"Plank",unit:"sec",a:60,b:null,milestone:null,weekdays:null,times_per_week:null,sort:2}),t({type:"daily",label:"Dead hang",unit:"sec",a:45,b:null,milestone:null,weekdays:null,times_per_week:null,sort:3}),t({type:"weekly",label:"Gerichte kracht",unit:null,a:null,b:null,milestone:null,weekdays:[],times_per_week:2,sort:4}),t({type:"leefregel",label:"Koud douchen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:5}),t({type:"leefregel",label:"Niet snoepen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:6}),t({type:"leefregel",label:"Low carb",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:7,role:"preference"}),t({type:"leefregel",label:"Intermittent fasting",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:8}),t({type:"leefregel",label:"Geen alcohol",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:9}),t({type:"gedrag",label:"Cafeïne 90 min na opstaan",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:10,role:"constraint",template:"public-framework",timing:{mode:"relative",clock:null,anchor:"wake",offset_min:90,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Wandelen na eten",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:11,role:"action",template:null,timing:{mode:"relative",clock:null,anchor:"meal",offset_min:0,window_min:null,frequency:"daily",condition:"na eten"}})]}function at(e,t){return{id:e.id,tenant_id:e.tenant_id,user_id:t,domain:f.domain,a:e.a??f.a,b:e.b??f.b,unit:e.unit==="sec"?"sec":"reps",pace_constraint:null}}function lt(e,t=b(),n=L()){const s=fe(e,n),i=W(n),o=R(i)??i[0],r=at(o,e),c=pe(r.id,n,t);return o.milestone!==null&&(c.milestone=o.milestone),{profile:s,items:i,vector:r,stage:c,events:[],rotated:!1}}function dt(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,items:e.items.map(n=>N(n)?{...n,a:f.a,b:f.b,milestone:f.milestone,unit:f.unit}:n),vector:{...e.vector,a:f.a,b:f.b,unit:f.unit},stage:{...e.stage,milestone:f.milestone},events:e.events}:e}function ct(){const e=localStorage.getItem(G);if(e)return e;const t=L();return localStorage.setItem(G,t),t}function ut(){const e=localStorage.getItem(Y);if(e)return e;const t=L();return localStorage.setItem(Y,t),t}function x(e){localStorage.setItem(ue,JSON.stringify(e))}function ft(e){if(!e)return null;try{const t=JSON.parse(e);return!t||typeof t!="object"?null:t}catch{return null}}function pt(){return[ue,...ot].map(e=>ft(localStorage.getItem(e))).filter(e=>e!==null)}function vt(e,t,n){const s=ce(e.items??[],W(n),n).map(i=>Ve(i,n));return{...e,profile:{...fe(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...Q(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null},items:s,vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(i=>({...i,tenant_id:i.tenant_id??n,item_id:i.item_id??null})),rotated:!!e.rotated}}function E(e,t){const n=pt();if(n.length===0){const o=lt(e,b(),t);return x(o),o}const s=it(n,W(t),e,t)??n[0],i=dt(vt(s,e,t));return x(i),i}function yt(){localStorage.setItem(rt,"1");const e=ct(),t=ut();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return E(e,t)},async addEvent(n){const s=E(e,t),i={id:n.id??L(),tenant_id:t,user_id:e,item_id:n.item_id??null,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:Be()};return s.events.push(i),x(s),i},async saveProfile(n){const s=E(e,t);s.profile=n,x(s)},async saveVectorConstraint(n,s){const i=E(e,t);i.vector.id===n&&(i.vector.pace_constraint=s,x(i))},async advanceStage(n,s){const i=E(e,t),o=pe(n.vector_id,t);return o.milestone=s,i.stage=o,i.items=i.items.map(r=>r.id===n.vector_id?{...r,milestone:s}:r),i.rotated=!0,x(i),o},async signOut(){}}}const U="#F0ECE4",mt="#3D6B5A";function gt(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${U}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${U}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${mt}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function m(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function kt(e){return e==="stokt"||e==="herstel"?"ember":e==="stijgt"?"sage":"fog"}function V(e){const t=kt(e);return e==="stokt"||e==="herstel"||e==="zakt"?m("status-kink",`ico-${t}`):e==="stijgt"?m("status-up",`ico-${t}`):m("status-flat",`ico-${t}`)}function _t(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${m(n?"dot-now":"dot")}</button>`}).join("")}const bt=`
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
</svg>`;function wt(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",bt)}const J=()=>document.querySelector("#app"),d={screen:"vandaag",skipItemId:null,advanceWarn:!1,busy:!1,error:null};let w=null,a=null;function ve(){if(!a)throw new Error("geen snapshot");const e=R(a.items);return We(a.vector,a.stage,Qe(a.events,e),b())}function T(e){if(!a)throw new Error("geen snapshot");const t=b(),n=R(a.items),s=de(a.events,e,n?.id),i=e.a===null?null:ne(e.a,s);return{done:se(s,t),plus:oe(s,t),skip:ie(s,t),logged:re(s,t),current:i}}function v(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function S(){if(!a||!w)return;const e=ve(),{vector:t,stage:n}=a,s=w.mode==="local"?"Lokaal":"Supabase",i=`
    <div class="hdr">
      <div>
        ${gt()}
        <div class="date-s">${Le(b())}</div>
      </div>
      <div class="mode-pill">${s}</div>
    </div>`,o=`
    <nav class="nav">
      <button data-nav="vandaag" class="${d.screen==="vandaag"?"active":""}">${m("day")}Vandaag</button>
      <button data-nav="koers" class="${d.screen==="koers"?"active":""}">${m("mark")}Koers</button>
    </nav>`;if(d.screen==="vandaag"){const r=he(a.profile.identity_new,a.events),c=b(),u=Je(a.items,c),k=Ze(a.items,c);J().innerHTML=`
      ${i}
      ${w.mode==="local"?'<div class="banner">Lokaal — geen Supabase. +1 / Done / Skip blijven op dit apparaat.</div>':""}
      ${e.gearDown?'<div class="banner hot">Lijf vraagt tempo omlaag. Etappe gaat niet omhoog.</div>':""}
      <div class="sec-hd">Lijf</div>
      <div class="card split">
        <div class="row">
          <div>
            <div class="lbl lbl-ico">${m("moon")} Slaap</div>
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
          <div class="dots">${_t(e.energy)}</div>
        </div>
      </div>
      ${k.length?`<div class="sec-hd">Regel</div>${k.map(l=>ht(l)).join("")}`:""}
      <div class="sec-hd">Vandaag</div>
      ${u.map(l=>$t(l,e,r)).join("")}
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${V(e.trend.word)}
          <div class="word">${e.trend.word}</div>
        </div>
      </div>
      ${d.error?`<p class="error" style="padding:0 18px">${v(d.error)}</p>`:""}
      ${o}`;return}if(d.screen==="koers"){const r=e.hitrate.eligible===0?"—":`${e.hitrate.hits}/${e.hitrate.eligible}`;J().innerHTML=`
      ${i}
      <div class="sec-hd">Strength · push-ups</div>
      <div class="card">
        <div class="kv">
          <div><div class="lbl">A</div><div class="val">${_(t.a)}</div></div>
          <div><div class="lbl">B</div><div class="val">${_(t.b)}</div></div>
          <div><div class="lbl">Nu</div><div class="val">${_(e.current)}</div></div>
          <div><div class="lbl">Etappe</div><div class="val">${_(n.milestone)}</div></div>
        </div>
      </div>
      <div class="card">
        <div class="kv">
          <div>
            <div class="lbl">Venster</div>
            <div class="val" style="font-size:1.15rem">${F(n.started_on)} → ${n.deadline?F(n.deadline):"—"}</div>
          </div>
          <div>
            <div class="lbl">Trend</div>
            <div class="val status">${V(e.trend.word)} ${e.trend.word}</div>
          </div>
          <div>
            <div class="lbl">Hitrate week</div>
            <div class="val">${r}</div>
          </div>
          <div>
            <div class="lbl">Rem</div>
            <div class="val" style="font-size:1.1rem">${v(t.pace_constraint||"—")}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="lbl">Volgende actie</div>
        <div class="action-line">${v(e.nextAction)}</div>
      </div>
      ${xe(a.profile.horizon_1y,a.rotated)?'<div class="banner">Zet een 1-jaars B. Etappes roteren.</div>':""}
      <div class="sec-hd">${m("ik")} Ik</div>
      <div class="card">
        <div class="field">
          <div class="lbl">Leven dat ik weiger</div>
          <textarea data-id="identity_anti" maxlength="${g.identity_anti}">${v(a.profile.identity_anti??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wie ik word</div>
          <textarea data-id="identity_new" maxlength="${g.identity_new}">${v(a.profile.identity_new??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wat B niet mag schenden</div>
          <textarea data-id="identity_constraint" maxlength="${g.identity_constraint}">${v(a.profile.identity_constraint??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">1-jaars B</div>
          <textarea data-id="horizon_1y" maxlength="${g.horizon_1y}">${v(a.profile.horizon_1y??"")}</textarea>
        </div>
        <button class="btn primary" data-act="save-ik">Bewaar</button>
      </div>
      <div class="card stack">
        <button class="btn ghost ico-btn" data-act="export">${m("export")}<span>Exporteer JSON</span></button>
      </div>
      ${d.error?`<p class="error" style="padding:0 18px">${v(d.error)}</p>`:""}
      ${o}`;return}}function ht(e){const t=ae(e);return`
      <div class="card quiet">
        <div class="ex-nm">${v(e.label)}</div>
        ${t?`<div class="note">${v(t)}</div>`:'<div class="note">Regel. Geen afvinken.</div>'}
      </div>`}function $t(e,t,n){const s=T(e),i=N(e),o=s.logged||!!s.skip,r=i&&s.current!==null&&e.b!==null&&s.current>=e.b,c=o||r,u=i,k=Xe(e),l=ae(e),p=u&&t.suggestedMilestone&&e.id===a.vector.id;return`
      <div class="card">
        <div class="ex-nm">${v(e.label)}</div>
        ${l&&!k&&!i?`<div class="note">${v(l)}</div>`:""}
        ${i?`<div class="track">
          <span class="now">${_(s.current??e.a??0)}</span>
          <span>→</span>
          <span class="mid">${_(e.milestone??0)}</span>
          <span>→</span>
          <span class="end">${_(e.b??0)}</span>
        </div>`:k?`<div class="work">${v(k)}</div>`:""}
        <div class="actions ${i?"":"actions-two"}">
          ${i?`<button class="btn ico-btn ${s.plus?"on":""}" data-act="plus" data-item="${e.id}" ${c?"disabled":""}>${m("plus")}<span>+1</span></button>`:""}
          <button class="btn ico-btn ${s.done?"track":""}" data-act="done" data-item="${e.id}" ${o?"disabled":""}>${m("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${s.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${s.logged?"disabled":""}>${m("skip")}<span>Skip</span></button>
        </div>
        ${d.skipItemId===e.id||s.skip?`<div class="chips">${st.map(y=>`<button class="chip ${s.skip===y?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${y}">${y}</button>`).join("")}</div>`:""}
        ${p?`<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${_(t.suggestedMilestone)}.</div>
               ${d.advanceWarn&&a.profile.identity_constraint?`<div class="banner">Check: ${v(a.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${_(t.suggestedMilestone)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`:`<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${t.suggestedMilestone}">Volgende etappe ${_(t.suggestedMilestone)}</button>
                      </div>`}`:""}
        ${u&&n?`<div class="note">${v(n)}</div>`:""}
      </div>`}function _(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function H(e){if(!d.busy){d.busy=!0,d.error=null;try{await e()}catch(t){d.error=t instanceof Error?t.message:"Er ging iets mis"}finally{d.busy=!1,S()}}}async function xt(e){w=e,a=await w.load(),d.screen="vandaag",S()}async function St(){wt(),Lt(),await xt(yt())}function Lt(){document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(n==="vandaag"||n==="koers"){d.screen=n,d.skipItemId=null,d.advanceWarn=!1,S();return}Et(t)})}async function Et(e){const t=e.dataset.act;if(!t||!w||!a)return;const n=ve(),s=b();if(t==="sleep-inc"||t==="sleep-dec"){const i=n.sleep??7,o=Math.max(0,Math.min(14,i+(t==="sleep-inc"?.5:-.5)));await B({date:s,kind:"body_sleep",value:o,skip_reason:null,item_id:null});return}if(t==="energy"){const i=Number(e.dataset.n),o=n.energy===i?null:i;if(o===null)return;await B({date:s,kind:"body_energy",value:o,skip_reason:null,item_id:null});return}if(t==="plus"){const i=a.items.find(r=>r.id===e.dataset.item);if(!i||!N(i))return;const o=T(i);if(o.logged||o.skip||i.b!==null&&o.current!==null&&o.current>=i.b)return;await B({date:s,kind:"set",value:(o.current??i.a??0)+1,skip_reason:null,item_id:i.id});return}if(t==="done"){const i=a.items.find(r=>r.id===e.dataset.item);if(!i)return;const o=T(i);if(o.logged||o.skip)return;await B({date:s,kind:"done",value:o.current??i.a,skip_reason:null,item_id:i.id});return}if(t==="skip-open"){const i=e.dataset.item??null;d.skipItemId=d.skipItemId===i?null:i,S();return}if(t==="skip"){const i=a.items.find(c=>c.id===e.dataset.item);if(!i||T(i).logged)return;const r=e.dataset.reason;if(!r)return;await B({date:s,kind:"skip",value:null,skip_reason:r,item_id:i.id}),d.skipItemId=null;return}if(t==="advance"){if(!n.suggestedMilestone)return;if($e(a.profile.identity_constraint)&&!d.advanceWarn){d.advanceWarn=!0,S();return}await Z(n.suggestedMilestone);return}if(t==="advance-go"){if(!n.suggestedMilestone)return;await Z(n.suggestedMilestone);return}if(t==="advance-cancel"){d.advanceWarn=!1,S();return}if(t==="save-ik"){const i={...a.profile,identity_anti:h(D("identity_anti"),g.identity_anti),identity_new:h(D("identity_new"),g.identity_new),identity_constraint:h(D("identity_constraint"),g.identity_constraint),horizon_1y:h(D("horizon_1y"),g.horizon_1y)};await H(async()=>{await w.saveProfile(i),a.profile=i});return}if(t==="export"){_e(a);return}}function D(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function Z(e){await H(async()=>{a.stage=await w.advanceStage(a.stage,e),a.items=a.items.map(t=>t.id===a.stage.vector_id?{...t,milestone:e}:t),a.rotated=!0,d.advanceWarn=!1})}async function B(e){await H(async()=>{const t=await w.addEvent(e);a.events.push(t)})}St();
