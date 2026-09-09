(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function Ie(e){return JSON.stringify({exported_at:new Date().toISOString(),profile:e.profile,items:e.items,stage:e.stage,events:e.events},null,2)}function Ee(e){const t=new Blob([Ie(e)],{type:"application/json"}),n=URL.createObjectURL(t),a=document.createElement("a");a.href=n,a.download=`routine-${e.profile.id.slice(0,8)}.json`,a.click(),URL.revokeObjectURL(n)}const je="geen zin",k={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140};function I(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function Ae(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===je).length}function Be(e,t){const n=I(e,k.identity_new);return!n||Ae(t)<2?null:n}function De(e){return!!I(e,k.identity_constraint)}function Oe(e,t){return t&&!I(e,k.horizon_1y)}function ne(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const ie=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],Me=["zo","ma","di","wo","do","vr","za"];function w(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${a}`}function E(e,t){const n=O(e);return n.setDate(n.getDate()+t),w(n)}function O(e){const[t,n,a]=e.split("-").map(Number);return new Date(t,n-1,a)}function Te(e){const t=O(e);return`${Me[t.getDay()]} ${t.getDate()} ${ie[t.getMonth()]}`}function U(e){const t=O(e);return`${t.getDate()} ${ie[t.getMonth()]}`}function Ne(e){const t=O(e).getDay();return t===0?7:t}function ae(e){const t=O(e),n=t.getDay(),a=n===0?-6:1-n;return t.setDate(t.getDate()+a),w(t)}function se(e,t){const n=[];let a=e;for(;a<=t;)n.push(a),a=E(a,1);return n}function j(){return crypto.randomUUID()}function Ce(){return new Date().toISOString()}const ze=2,qe=6;function z(e,t){return e.created_at.localeCompare(t.created_at)}function W(e,t,n){return e.filter(a=>a.date===t&&a.kind===n).sort(z).at(-1)}function oe(e,t){return t.filter(a=>a.kind==="set").sort(z).at(-1)?.value??e}function Re(e,t){return W(e,t,"body_sleep")?.value??null}function Ge(e,t){return W(e,t,"body_energy")?.value??null}function M(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip")).sort(z).at(-1)}function re(e,t){const n=M(e,t);return n?.kind==="skip"?n.skip_reason:null}function le(e,t){return M(e,t)?.kind==="done"}function de(e,t){return M(e,t)?.kind==="set"}function ce(e,t){const n=M(e,t);return n?.kind==="set"||n?.kind==="done"}function Pe(e,t){return e!==null&&e<qe||t!==null&&t<=ze}function We(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const a=Math.max(1,Math.ceil(n/2));return Math.min(t,e+a)}function N(e,t,n,a){if(t<a)return"empty";const i=M(e,t);return i?.kind==="done"||i?.kind==="set"?"done":i?.kind==="skip"?"skip":W(e,t,"miss")?"miss":t>=n?"empty":"miss"}function He(e,t,n="1970-01-01"){let a=0,i=t;for(let s=0;s<400;s+=1){const o=N(e,i,t,n);if(o==="done")a+=1;else if(o==="skip"||o==="empty"&&i===t){i=E(i,-1);continue}else break;i=E(i,-1)}return a}function Ke(e,t,n){const a=ae(t),i=!n||n<a?a:n;let s=0,o=0;for(const c of se(i,t)){const u=N(e,c,t,n??i);u==="skip"||u==="empty"||(o+=1,u==="done"&&(s+=1))}return{hits:s,eligible:o}}function Fe(e,t,n="1970-01-01",a=3){const i=N(e,t,t,n);if(i==="done"||i==="skip")return!1;const s=E(t,-1);if(s<n)return!1;const o=E(t,-a),c=n>o?n:o;return se(c,s).some(u=>N(e,u,t,n)==="miss")}function Ve(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled&&!e.todayLogged?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function Ye(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${J(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${J(e.milestone)}.`}function J(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function Ue(e,t,n){return t.filter(i=>i.kind==="set"&&i.date<=n).sort(z).at(-1)?.value??e}function Je(e,t,n,a){const i=oe(e.a,n),s=Re(n,a),o=Ge(n,a),c=le(n,a),u=de(n,a),h=ce(n,a),d=re(n,a),f=Pe(s,o),m=i>=t.milestone,b=i>=e.b,Y=Fe(n,a,t.started_on),Se=ae(a),xe=Ue(e.a,n,E(Se,-1)),Le=Ve({current:i,weekStartCurrent:xe,gearDown:f,stalled:Y,milestoneHit:m,todayLogged:u||c||!!d});return{current:i,sleep:s,energy:o,doneToday:c,plusToday:u,setLoggedToday:h,skipToday:d,gearDown:f,milestoneHit:m,atB:b,trend:Le,hitrate:Ke(n,a,t.started_on),streak:He(n,a,t.started_on),nextAction:Ye({milestone:t.milestone,b:e.b,gearDown:f,milestoneHit:m,atB:b,stalled:Y,doneToday:c,plusToday:u,skipToday:d}),suggestedMilestone:m&&!b&&!f?We(t.milestone,e.b):null}}function Ze(){return{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:null,condition:null}}function Xe(e){return{mode:e?.mode??null,clock:e?.clock??null,anchor:e?.anchor??null,offset_min:e?.offset_min??null,window_min:e?.window_min??null,frequency:e?.frequency??null,condition:e?.condition??null}}function Qe(e,t){if(e.timing.frequency==="weekly"||e.type==="weekly"){const a=e.weekdays??[];return a.length===0?!1:a.includes(Ne(t))}return!0}function ue(e){return e.role==="constraint"}function fe(e){return e.role!=="constraint"}function H(e){const t=e.timing;return t.condition?t.condition:t.mode==="relative"&&t.anchor==="wake"&&t.offset_min!==null?`${t.offset_min} min na opstaan`:t.mode==="relative"&&t.anchor==="meal"?"na eten":t.mode==="clock"&&t.clock?t.clock:null}function et(e){return e.role?e.role:e.label.trim().toLowerCase()==="low carb"?"preference":null}function q(e){return e.a!==null&&e.b!==null&&e.milestone!==null}function tt(e,t){return Qe(e,t)}function nt(e,t){return{...e,tenant_id:e.tenant_id??t,weekdays:e.weekdays??null,times_per_week:e.times_per_week??null,timing:Xe(e.timing),role:et(e),template:e.template??null,later:!!e.later}}function K(e){return e.type==="medicijn"||e.type==="supplement"}function it(e,t){return R(e,t).filter(n=>fe(n)&&!K(n)&&!n.later)}function at(e,t){return R(e,t).filter(ue)}function st(e,t){return R(e,t).filter(n=>K(n)&&!n.later)}function ot(e,t){return R(e,t).filter(n=>n.later&&fe(n))}function R(e,t){return e.filter(n=>tt(n,t)).sort((n,a)=>n.sort-a.sort)}function F(e){return e.find(q)}function P(e){return e.kind==="body_sleep"||e.kind==="body_energy"||e.kind==="body_weight"}function pe(e,t,n){return e.filter(a=>P(a)?!1:!!(a.item_id===t.id||a.item_id===null&&n&&t.id===n))}function rt(e,t){return t?[...e.filter(P),...pe(e,t,t.id)]:e.filter(P)}function lt(e){return e.a===null?null:e.unit==="sec"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} s`:e.unit==="reps"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} reps`:String(e.a)}function D(e){return e.trim().toLowerCase()}function dt(e){const t=new Set,n=[];for(const a of e){const i=D(a.label);t.has(i)||(t.add(i),n.push(a))}return n}function ve(e,t,n){const a=dt(e),i=new Set(a.map(o=>D(o.label))),s=t.filter(o=>!i.has(D(o.label))).map(o=>({...o,tenant_id:n}));return[...a,...s]}function ct(e){const t=new Map;for(const n of e)for(const a of n)t.has(a.id)||t.set(a.id,a);return[...t.values()].sort((n,a)=>n.created_at.localeCompare(a.created_at))}function ut(e){return e?!!(e.identity_anti||e.identity_new||e.identity_constraint||e.horizon_1y||e.display_name):!1}function ft(e,t,n,a){if(e.length===0)return null;const i=e.reduce((d,f)=>(f.events?.length??0)>(d.events?.length??0)?f:d),s=e.find(d=>ut(d.profile))?.profile??i.profile,o=ve([i,...e.filter(d=>d!==i)].flatMap(d=>d.items??[]),t,a),c=new Map(o.map(d=>[D(d.label),d.id])),u=new Map;for(const d of e)for(const f of d.items??[]){const m=c.get(D(f.label));m&&f.id!==m&&u.set(f.id,m)}const h=ct(e.map(d=>d.events??[])).map(d=>{if(!d.item_id)return d;const f=u.get(d.item_id);return f?{...d,item_id:f}:d});return{...i,profile:{...s,id:s.id||n,tenant_id:s.tenant_id||a},items:o,events:h}}const C=3,me=[{id:"kracht",label:"Kracht"},{id:"eten",label:"Eten & drinken"},{id:"slaap",label:"Slaap"},{id:"stofjes",label:"Stofjes"},{id:"bewegen",label:"Bewegen"}],ye=["18–29","30–39","40–49","50–59","60+"],pt={kracht:["Push-ups","Squats","Plank","Dead hang"],eten:["Niet snoepen","Low carb","Intermittent fasting","Geen alcohol"],slaap:["Koud douchen"],stofjes:["Medicijn ochtend","Vitamine D"],bewegen:["Wandelen na eten"]};function ge(e){return ue(e)||e.type==="weekly"?!1:e.type==="daily"||e.type==="leefregel"||e.type==="gedrag"||K(e)}function vt(e){return!(e.onboarded!==!1||(e.events??[]).length>0)}function mt(e){return vt(e)?e.profile.goals?.length?e.profile.age_band?"start":"age":"goals":null}function yt(e,t){const n=e.filter(ge).sort((s,o)=>s.sort-o.sort);if(t.length===0)return n;const a=new Set(t.flatMap(s=>pt[s]??[])),i=n.filter(s=>a.has(s.label));return i.length>0?i:n}function gt(e,t){const n=new Set(t.slice(0,C));return e.map(a=>ge(a)?{...a,later:!n.has(a.id)}:{...a,later:!1})}function bt(e,t){return e.includes(t)?e.filter(n=>n!==t):[...e,t]}function kt(e,t){return e.includes(t)?e.filter(n=>n!==t):e.length>=C?e:[...e,t]}function _t(e){return me.some(t=>t.id===e)}function wt(e){return ye.includes(e)}const be=["geen tijd","geen energie","vergeten","geen zin","pijn"],v={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},ke="routine_loop_v6",ht=["routine_loop_v5","routine_loop_v4","routine_loop_v3"],Z="routine_local_user_id",X="routine_local_tenant_id",$t="routine_local_chosen";function _e(e,t){return{id:e,tenant_id:t,display_name:null,...ne(),age_band:null,goals:[]}}function we(e,t,n=w()){return{id:j(),tenant_id:t,vector_id:e,milestone:v.milestone,started_on:n,deadline:E(n,v.windowDays),status:"active",stage_type:v.stageType}}function V(e){const t=n=>({id:j(),tenant_id:e,timing:Ze(),role:null,template:null,later:!1,...n});return[t({type:"daily",label:"Push-ups",unit:"reps",a:v.a,b:v.b,milestone:v.milestone,weekdays:null,times_per_week:null,sort:0}),t({type:"daily",label:"Squats",unit:"reps",a:30,b:null,milestone:null,weekdays:null,times_per_week:null,sort:1}),t({type:"daily",label:"Plank",unit:"sec",a:60,b:null,milestone:null,weekdays:null,times_per_week:null,sort:2}),t({type:"daily",label:"Dead hang",unit:"sec",a:45,b:null,milestone:null,weekdays:null,times_per_week:null,sort:3}),t({type:"weekly",label:"Gerichte kracht",unit:null,a:null,b:null,milestone:null,weekdays:[],times_per_week:2,sort:4}),t({type:"leefregel",label:"Koud douchen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:5}),t({type:"leefregel",label:"Niet snoepen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:6}),t({type:"leefregel",label:"Low carb",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:7,role:"preference"}),t({type:"leefregel",label:"Intermittent fasting",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:8}),t({type:"leefregel",label:"Geen alcohol",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:9}),t({type:"gedrag",label:"Cafeïne 90 min na opstaan",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:10,role:"constraint",template:"public-framework",timing:{mode:"relative",clock:null,anchor:"wake",offset_min:90,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Wandelen na eten",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:11,role:"action",template:null,timing:{mode:"relative",clock:null,anchor:"meal",offset_min:0,window_min:null,frequency:"daily",condition:"na eten"}}),t({type:"medicijn",label:"Medicijn ochtend",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:12,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"ochtend"}}),t({type:"supplement",label:"Vitamine D",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:13,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}})]}function St(e,t){return{id:e.id,tenant_id:e.tenant_id,user_id:t,domain:v.domain,a:e.a??v.a,b:e.b??v.b,unit:e.unit==="sec"?"sec":"reps",pace_constraint:null}}function xt(e,t=w(),n=j()){const a=_e(e,n),i=V(n),s=F(i)??i[0],o=St(s,e),c=we(o.id,n,t);return s.milestone!==null&&(c.milestone=s.milestone),{profile:a,items:i,vector:o,stage:c,events:[],rotated:!1,onboarded:!1}}function Lt(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,items:e.items.map(n=>q(n)?{...n,a:v.a,b:v.b,milestone:v.milestone,unit:v.unit}:n),vector:{...e.vector,a:v.a,b:v.b,unit:v.unit},stage:{...e.stage,milestone:v.milestone},events:e.events}:e}function It(){const e=localStorage.getItem(Z);if(e)return e;const t=j();return localStorage.setItem(Z,t),t}function Et(){const e=localStorage.getItem(X);if(e)return e;const t=j();return localStorage.setItem(X,t),t}function $(e){localStorage.setItem(ke,JSON.stringify(e))}function jt(e){if(!e)return null;try{const t=JSON.parse(e);return!t||typeof t!="object"?null:t}catch{return null}}function At(){return[ke,...ht].map(e=>jt(localStorage.getItem(e))).filter(e=>e!==null)}function Bt(e,t,n){const a=ve(e.items??[],V(n),n).map(i=>nt(i,n));return{...e,profile:{..._e(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...ne(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null,age_band:e.profile?.age_band??null,goals:Array.isArray(e.profile?.goals)?e.profile.goals:[]},items:a,vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(i=>({...i,tenant_id:i.tenant_id??n,item_id:i.item_id??null})),rotated:!!e.rotated,onboarded:e.onboarded??!0}}function x(e,t){const n=At();if(n.length===0){const s=xt(e,w(),t);return $(s),s}const a=ft(n,V(t),e,t)??n[0],i=Lt(Bt(a,e,t));return $(i),i}function Dt(){localStorage.setItem($t,"1");const e=It(),t=Et();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return x(e,t)},async addEvent(n){const a=x(e,t),i={id:n.id??j(),tenant_id:t,user_id:e,item_id:n.item_id??null,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:Ce()};return a.events.push(i),$(a),i},async saveProfile(n){const a=x(e,t);a.profile=n,$(a)},async saveOnboarding(n){const a=x(e,t);a.profile={...a.profile,goals:n.goals,age_band:n.age_band},a.items=gt(a.items,n.startIds),a.onboarded=!0,$(a)},async setItemLater(n,a){const i=x(e,t);i.items=i.items.map(s=>s.id===n?{...s,later:a}:s),$(i)},async saveVectorConstraint(n,a){const i=x(e,t);i.vector.id===n&&(i.vector.pace_constraint=a,$(i))},async advanceStage(n,a){const i=x(e,t),s=we(n.vector_id,t);return s.milestone=a,i.stage=s,i.items=i.items.map(o=>o.id===n.vector_id?{...o,milestone:a}:o),i.rotated=!0,$(i),s},async signOut(){}}}const Q="#F0ECE4",Ot="#3D6B5A";function he(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${Q}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${Q}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${Ot}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function g(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function Mt(e){return e==="stokt"||e==="herstel"?"ember":e==="stijgt"?"sage":"fog"}function ee(e){const t=Mt(e);return e==="stokt"||e==="herstel"||e==="zakt"?g("status-kink",`ico-${t}`):e==="stijgt"?g("status-up",`ico-${t}`):g("status-flat",`ico-${t}`)}function Tt(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${g(n?"dot-now":"dot")}</button>`}).join("")}const Nt=`
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
</svg>`;function Ct(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",Nt)}const G=()=>document.querySelector("#app"),l={screen:"vandaag",skipItemId:null,advanceWarn:!1,busy:!1,error:null,startIds:[]};let y=null,r=null;function $e(){if(!r)throw new Error("geen snapshot");const e=F(r.items);return Je(r.vector,r.stage,rt(r.events,e),w())}function B(e){if(!r)throw new Error("geen snapshot");const t=w(),n=F(r.items),a=pe(r.events,e,n?.id),i=e.a===null?null:oe(e.a,a);return{done:le(a,t),plus:de(a,t),skip:re(a,t),logged:ce(a,t),current:i}}function p(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function S(){if(!r||!y)return;const e=mt(r);if(e){G().innerHTML=Rt(e);return}const t=$e(),{vector:n,stage:a}=r,i=y.mode==="local"?"Lokaal":"Supabase",s=`
    <div class="hdr">
      <div>
        ${he()}
        <div class="date-s">${Te(w())}</div>
      </div>
      <div class="mode-pill">${i}</div>
    </div>`,o=`
    <nav class="nav">
      <button data-nav="vandaag" class="${l.screen==="vandaag"?"active":""}">${g("day")}Vandaag</button>
      <button data-nav="koers" class="${l.screen==="koers"?"active":""}">${g("mark")}Koers</button>
    </nav>`;if(l.screen==="vandaag"){const c=Be(r.profile.identity_new,r.events),u=w(),h=it(r.items,u),d=at(r.items,u),f=st(r.items,u),m=ot(r.items,u);G().innerHTML=`
      ${s}
      ${y.mode==="local"?'<div class="banner">Lokaal — geen Supabase. +1 / Done / Skip blijven op dit apparaat.</div>':""}
      ${t.gearDown?'<div class="banner hot">Lijf vraagt tempo omlaag. Etappe gaat niet omhoog.</div>':""}
      <div class="sec-hd">Lijf</div>
      <div class="card split">
        <div class="row">
          <div>
            <div class="lbl lbl-ico">${g("moon")} Slaap</div>
            <div class="note">Optioneel. Blokkeert de dag niet.</div>
          </div>
          <div class="num-row">
            <button class="nb" data-act="sleep-dec">−</button>
            <div class="ndisp">${t.sleep===null?"—":t.sleep.toFixed(1)}</div>
            <button class="nb" data-act="sleep-inc">+</button>
          </div>
        </div>
        <div>
          <div class="lbl">Energie</div>
          <div class="dots">${Tt(t.energy)}</div>
        </div>
      </div>
      ${d.length?`<div class="sec-hd">Regel</div>${d.map(b=>Gt(b)).join("")}`:""}
      ${f.length?`<div class="sec-hd">Stofjes</div>${f.map(b=>zt(b)).join("")}`:""}
      <div class="sec-hd">Vandaag</div>
      ${h.map(b=>Pt(b,t,c)).join("")}
      ${m.length?`<div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Niet in je start. Blijft bewaard.</div>
        ${m.map(b=>qt(b)).join("")}
      </div>`:""}
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${ee(t.trend.word)}
          <div class="word">${t.trend.word}</div>
        </div>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${p(l.error)}</p>`:""}
      ${o}`;return}if(l.screen==="koers"){const c=t.hitrate.eligible===0?"—":`${t.hitrate.hits}/${t.hitrate.eligible}`;G().innerHTML=`
      ${s}
      <div class="sec-hd">Strength · push-ups</div>
      <div class="card">
        <div class="kv">
          <div><div class="lbl">A</div><div class="val">${_(n.a)}</div></div>
          <div><div class="lbl">B</div><div class="val">${_(n.b)}</div></div>
          <div><div class="lbl">Nu</div><div class="val">${_(t.current)}</div></div>
          <div><div class="lbl">Etappe</div><div class="val">${_(a.milestone)}</div></div>
        </div>
      </div>
      <div class="card">
        <div class="kv">
          <div>
            <div class="lbl">Venster</div>
            <div class="val" style="font-size:1.15rem">${U(a.started_on)} → ${a.deadline?U(a.deadline):"—"}</div>
          </div>
          <div>
            <div class="lbl">Trend</div>
            <div class="val status">${ee(t.trend.word)} ${t.trend.word}</div>
          </div>
          <div>
            <div class="lbl">Hitrate week</div>
            <div class="val">${c}</div>
          </div>
          <div>
            <div class="lbl">Rem</div>
            <div class="val" style="font-size:1.1rem">${p(n.pace_constraint||"—")}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="lbl">Volgende actie</div>
        <div class="action-line">${p(t.nextAction)}</div>
      </div>
      ${Oe(r.profile.horizon_1y,r.rotated)?'<div class="banner">Zet een 1-jaars B. Etappes roteren.</div>':""}
      <div class="sec-hd">${g("ik")} Ik</div>
      <div class="card">
        <div class="field">
          <div class="lbl">Leven dat ik weiger</div>
          <textarea data-id="identity_anti" maxlength="${k.identity_anti}">${p(r.profile.identity_anti??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wie ik word</div>
          <textarea data-id="identity_new" maxlength="${k.identity_new}">${p(r.profile.identity_new??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wat B niet mag schenden</div>
          <textarea data-id="identity_constraint" maxlength="${k.identity_constraint}">${p(r.profile.identity_constraint??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">1-jaars B</div>
          <textarea data-id="horizon_1y" maxlength="${k.horizon_1y}">${p(r.profile.horizon_1y??"")}</textarea>
        </div>
        <button class="btn primary" data-act="save-ik">Bewaar</button>
      </div>
      <div class="card stack">
        <button class="btn ghost ico-btn" data-act="export">${g("export")}<span>Exporteer JSON</span></button>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${p(l.error)}</p>`:""}
      ${o}`;return}}function zt(e){const t=B(e),n=t.logged||!!t.skip,a=e.type==="medicijn"?"Genomen":"Done",i=H(e);return`
      <div class="card stof">
        <div class="ex-nm">${p(e.label)}</div>
        ${i?`<div class="note">${p(i)}</div>`:""}
        <div class="actions actions-two">
          <button class="btn ico-btn ${t.done?"track":""}" data-act="done" data-item="${e.id}" ${n?"disabled":""}>${g("done")}<span>${a}</span></button>
          <button class="btn ico-btn skip ${t.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${t.logged?"disabled":""}>${g("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||t.skip?`<div class="chips">${be.map(s=>`<button class="chip ${t.skip===s?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${s}">${s}</button>`).join("")}</div>`:""}
      </div>`}function qt(e){return`
      <div class="later-row">
        <div class="ex-nm">${p(e.label)}</div>
        <button class="btn ghost later-now" data-act="later-now" data-item="${e.id}">Nu</button>
      </div>`}function Rt(e){if(!r)return"";const t=r.profile.goals??[],n=r.profile.age_band,a=yt(r.items,t),i=l.startIds,s=`
    <div class="hdr">
      <div>
        ${he()}
        <div class="date-s">Start</div>
      </div>
    </div>`;return e==="goals"?`
      ${s}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="ex-nm">Wat is je richting?</div>
        <div class="note">Eerst doelen. Types (gedrag, regel, medicijn, supplement) komen daarna.</div>
        <div class="chips">${me.map(o=>`<button class="chip pick ${t.includes(o.id)?"on":""}" data-act="onboard-goal" data-goal="${o.id}">${o.label}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${t.length===0?"disabled":""}>Verder</button>
        </div>
      </div>`:e==="age"?`
      ${s}
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="ex-nm">Kies een band</div>
        <div class="note">Geen geboortedatum. Alleen een band.</div>
        <div class="chips">${ye.map(o=>`<button class="chip pick ${n===o?"on":""}" data-act="onboard-age" data-age="${o}">${o}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${n?"":"disabled"}>Verder</button>
        </div>
      </div>`:`
    ${s}
    <div class="sec-hd">Start</div>
    <div class="card">
      <div class="ex-nm">Max ${C} nu</div>
      <div class="note">De rest gaat naar Later. Later blijft zichtbaar.</div>
      <div class="chips">${a.map(o=>`<button class="chip pick ${i.includes(o.id)?"on":""}" data-act="onboard-start" data-item="${o.id}">${p(o.label)}</button>`).join("")}</div>
      <div class="note">${i.length} / ${C} gekozen</div>
      <div class="stack" style="margin-top:16px">
        <button class="btn primary" data-act="onboard-done" ${i.length===0?"disabled":""}>Naar Vandaag</button>
      </div>
    </div>`}function Gt(e){const t=H(e);return`
      <div class="card quiet">
        <div class="ex-nm">${p(e.label)}</div>
        ${t?`<div class="note">${p(t)}</div>`:'<div class="note">Regel. Geen afvinken.</div>'}
      </div>`}function Pt(e,t,n){const a=B(e),i=q(e),s=a.logged||!!a.skip,o=i&&a.current!==null&&e.b!==null&&a.current>=e.b,c=s||o,u=i,h=lt(e),d=H(e),f=u&&t.suggestedMilestone&&e.id===r.vector.id;return`
      <div class="card">
        <div class="ex-nm">${p(e.label)}</div>
        ${d&&!h&&!i?`<div class="note">${p(d)}</div>`:""}
        ${i?`<div class="track">
          <span class="now">${_(a.current??e.a??0)}</span>
          <span>→</span>
          <span class="mid">${_(e.milestone??0)}</span>
          <span>→</span>
          <span class="end">${_(e.b??0)}</span>
        </div>`:h?`<div class="work">${p(h)}</div>`:""}
        <div class="actions ${i?"":"actions-two"}">
          ${i?`<button class="btn ico-btn ${a.plus?"on":""}" data-act="plus" data-item="${e.id}" ${c?"disabled":""}>${g("plus")}<span>+1</span></button>`:""}
          <button class="btn ico-btn ${a.done?"track":""}" data-act="done" data-item="${e.id}" ${s?"disabled":""}>${g("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${a.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${a.logged?"disabled":""}>${g("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||a.skip?`<div class="chips">${be.map(m=>`<button class="chip ${a.skip===m?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${m}">${m}</button>`).join("")}</div>`:""}
        ${f?`<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${_(t.suggestedMilestone)}.</div>
               ${l.advanceWarn&&r.profile.identity_constraint?`<div class="banner">Check: ${p(r.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${_(t.suggestedMilestone)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`:`<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${t.suggestedMilestone}">Volgende etappe ${_(t.suggestedMilestone)}</button>
                      </div>`}`:""}
        ${u&&n?`<div class="note">${p(n)}</div>`:""}
      </div>`}function _(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function L(e){if(!l.busy){l.busy=!0,l.error=null;try{await e()}catch(t){l.error=t instanceof Error?t.message:"Er ging iets mis"}finally{l.busy=!1,S()}}}async function Wt(e){y=e,r=await y.load(),l.screen="vandaag",S()}async function Ht(){Ct(),Kt(),await Wt(Dt())}function Kt(){document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(n==="vandaag"||n==="koers"){l.screen=n,l.skipItemId=null,l.advanceWarn=!1,S();return}Ft(t)})}async function Ft(e){const t=e.dataset.act;if(!t||!y||!r)return;const n=$e(),a=w();if(t==="sleep-inc"||t==="sleep-dec"){const i=n.sleep??7,s=Math.max(0,Math.min(14,i+(t==="sleep-inc"?.5:-.5)));await A({date:a,kind:"body_sleep",value:s,skip_reason:null,item_id:null});return}if(t==="energy"){const i=Number(e.dataset.n),s=n.energy===i?null:i;if(s===null)return;await A({date:a,kind:"body_energy",value:s,skip_reason:null,item_id:null});return}if(t==="plus"){const i=r.items.find(o=>o.id===e.dataset.item);if(!i||!q(i))return;const s=B(i);if(s.logged||s.skip||i.b!==null&&s.current!==null&&s.current>=i.b)return;await A({date:a,kind:"set",value:(s.current??i.a??0)+1,skip_reason:null,item_id:i.id});return}if(t==="done"){const i=r.items.find(o=>o.id===e.dataset.item);if(!i)return;const s=B(i);if(s.logged||s.skip)return;await A({date:a,kind:"done",value:s.current??i.a,skip_reason:null,item_id:i.id});return}if(t==="skip-open"){const i=e.dataset.item??null;l.skipItemId=l.skipItemId===i?null:i,S();return}if(t==="skip"){const i=r.items.find(c=>c.id===e.dataset.item);if(!i||B(i).logged)return;const o=e.dataset.reason;if(!o)return;await A({date:a,kind:"skip",value:null,skip_reason:o,item_id:i.id}),l.skipItemId=null;return}if(t==="advance"){if(!n.suggestedMilestone)return;if(De(r.profile.identity_constraint)&&!l.advanceWarn){l.advanceWarn=!0,S();return}await te(n.suggestedMilestone);return}if(t==="advance-go"){if(!n.suggestedMilestone)return;await te(n.suggestedMilestone);return}if(t==="advance-cancel"){l.advanceWarn=!1,S();return}if(t==="onboard-goal"){const i=e.dataset.goal;if(!i||!_t(i))return;const s={...r.profile,goals:bt(r.profile.goals??[],i)};await L(async()=>{await y.saveProfile(s),r.profile=s});return}if(t==="onboard-age"){const i=e.dataset.age;if(!i||!wt(i))return;const s={...r.profile,age_band:i};await L(async()=>{await y.saveProfile(s),r.profile=s});return}if(t==="onboard-start"){const i=e.dataset.item;if(!i)return;l.startIds=kt(l.startIds,i),S();return}if(t==="onboard-next"){S();return}if(t==="onboard-done"){const i=r.profile.age_band,s=r.profile.goals??[];if(!i||s.length===0||l.startIds.length===0)return;await L(async()=>{await y.saveOnboarding({goals:s,age_band:i,startIds:l.startIds}),r=await y.load(),l.screen="vandaag"});return}if(t==="later-now"){const i=e.dataset.item;if(!i)return;await L(async()=>{await y.setItemLater(i,!1),r=await y.load()});return}if(t==="save-ik"){const i={...r.profile,identity_anti:I(T("identity_anti"),k.identity_anti),identity_new:I(T("identity_new"),k.identity_new),identity_constraint:I(T("identity_constraint"),k.identity_constraint),horizon_1y:I(T("horizon_1y"),k.horizon_1y)};await L(async()=>{await y.saveProfile(i),r.profile=i});return}if(t==="export"){Ee(r);return}}function T(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function te(e){await L(async()=>{r.stage=await y.advanceStage(r.stage,e),r.items=r.items.map(t=>t.id===r.stage.vector_id?{...t,milestone:e}:t),r.rotated=!0,l.advanceWarn=!1})}async function A(e){await L(async()=>{const t=await y.addEvent(e);r.events.push(t)})}Ht();
