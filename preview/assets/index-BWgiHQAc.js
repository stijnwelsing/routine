(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function Oe(e){return JSON.stringify({exported_at:new Date().toISOString(),profile:e.profile,items:e.items,stage:e.stage,events:e.events},null,2)}function Ne(e){const t=new Blob([Oe(e)],{type:"application/json"}),n=URL.createObjectURL(t),a=document.createElement("a");a.href=n,a.download=`routine-${e.profile.id.slice(0,8)}.json`,a.click(),URL.revokeObjectURL(n)}const ze="geen zin",k={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140};function I(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function qe(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===ze).length}function Ge(e,t){const n=I(e,k.identity_new);return!n||qe(t)<2?null:n}function Pe(e){return!!I(e,k.identity_constraint)}function Re(e,t){return t&&!I(e,k.horizon_1y)}function re(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const le=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],He=["zo","ma","di","wo","do","vr","za"];function _(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${a}`}function T(e,t){const n=D(e);return n.setDate(n.getDate()+t),_(n)}function D(e){const[t,n,a]=e.split("-").map(Number);return new Date(t,n-1,a)}function We(e){const t=D(e);return`${He[t.getDay()]} ${t.getDate()} ${le[t.getMonth()]}`}function X(e){const t=D(e);return`${t.getDate()} ${le[t.getMonth()]}`}function Ke(e){const t=D(e).getDay();return t===0?7:t}function de(e){const t=D(e),n=t.getDay(),a=n===0?-6:1-n;return t.setDate(t.getDate()+a),_(t)}function ce(e,t){const n=[];let a=e;for(;a<=t;)n.push(a),a=T(a,1);return n}function A(){return crypto.randomUUID()}function Ve(){return new Date().toISOString()}const Fe=2,Ye=6;function q(e,t){return e.created_at.localeCompare(t.created_at)}function K(e,t,n){return e.filter(a=>a.date===t&&a.kind===n).sort(q).at(-1)}function ue(e,t){return t.filter(a=>a.kind==="set").sort(q).at(-1)?.value??e}function Ue(e,t){return K(e,t,"body_sleep")?.value??null}function Je(e,t){return K(e,t,"body_energy")?.value??null}function O(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip")).sort(q).at(-1)}function fe(e,t){const n=O(e,t);return n?.kind==="skip"?n.skip_reason:null}function pe(e,t){return O(e,t)?.kind==="done"}function ve(e,t){return O(e,t)?.kind==="set"}function me(e,t){const n=O(e,t);return n?.kind==="set"||n?.kind==="done"}function Ze(e,t){return e!==null&&e<Ye||t!==null&&t<=Fe}function Xe(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const a=Math.max(1,Math.ceil(n/2));return Math.min(t,e+a)}function N(e,t,n,a){if(t<a)return"empty";const i=O(e,t);return i?.kind==="done"||i?.kind==="set"?"done":i?.kind==="skip"?"skip":K(e,t,"miss")?"miss":t>=n?"empty":"miss"}function Qe(e,t,n="1970-01-01"){let a=0,i=t;for(let s=0;s<400;s+=1){const r=N(e,i,t,n);if(r==="done")a+=1;else if(r==="skip"||r==="empty"&&i===t){i=T(i,-1);continue}else break;i=T(i,-1)}return a}function et(e,t,n){const a=de(t),i=!n||n<a?a:n;let s=0,r=0;for(const c of ce(i,t)){const u=N(e,c,t,n??i);u==="skip"||u==="empty"||(r+=1,u==="done"&&(s+=1))}return{hits:s,eligible:r}}function tt(e,t,n="1970-01-01",a=3){const i=N(e,t,t,n);if(i==="done"||i==="skip")return!1;const s=T(t,-1);if(s<n)return!1;const r=T(t,-a),c=n>r?n:r;return ce(c,s).some(u=>N(e,u,t,n)==="miss")}function nt(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled&&!e.todayLogged?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function it(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${Q(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${Q(e.milestone)}.`}function Q(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function at(e,t,n){return t.filter(i=>i.kind==="set"&&i.date<=n).sort(q).at(-1)?.value??e}function st(e,t,n,a){const i=ue(e.a,n),s=Ue(n,a),r=Je(n,a),c=pe(n,a),u=ve(n,a),w=me(n,a),d=fe(n,a),p=Ze(s,r),g=i>=t.milestone,b=i>=e.b,Z=tt(n,a,t.started_on),Ce=de(a),Me=at(e.a,n,T(Ce,-1)),De=nt({current:i,weekStartCurrent:Me,gearDown:p,stalled:Z,milestoneHit:g,todayLogged:u||c||!!d});return{current:i,sleep:s,energy:r,doneToday:c,plusToday:u,setLoggedToday:w,skipToday:d,gearDown:p,milestoneHit:g,atB:b,trend:De,hitrate:et(n,a,t.started_on),streak:Qe(n,a,t.started_on),nextAction:it({milestone:t.milestone,b:e.b,gearDown:p,milestoneHit:g,atB:b,stalled:Z,doneToday:c,plusToday:u,skipToday:d}),suggestedMilestone:g&&!b&&!p?Xe(t.milestone,e.b):null}}function ot(){return{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:null,condition:null}}function rt(e){return{mode:e?.mode??null,clock:e?.clock??null,anchor:e?.anchor??null,offset_min:e?.offset_min??null,window_min:e?.window_min??null,frequency:e?.frequency??null,condition:e?.condition??null}}function lt(e,t){if(e.timing.frequency==="weekly"||e.type==="weekly"){const a=e.weekdays??[];return a.length===0?!1:a.includes(Ke(t))}return!0}function ge(e){return e.role==="constraint"}function ye(e){return e.role!=="constraint"}function V(e){const t=e.timing;return t.condition?t.condition:t.mode==="relative"&&t.anchor==="wake"&&t.offset_min!==null?`${t.offset_min} min na opstaan`:t.mode==="relative"&&t.anchor==="meal"?"na eten":t.mode==="clock"&&t.clock?t.clock:null}function dt(e){return e.role?e.role:e.label.trim().toLowerCase()==="low carb"?"preference":null}function G(e){return e.a!==null&&e.b!==null&&e.milestone!==null}function ct(e,t){return lt(e,t)}function ut(e,t){return{...e,tenant_id:e.tenant_id??t,weekdays:e.weekdays??null,times_per_week:e.times_per_week??null,timing:rt(e.timing),role:dt(e),template:e.template??null,later:!!e.later}}function F(e){return e.type==="medicijn"||e.type==="supplement"}function ft(e,t){return P(e,t).filter(n=>ye(n)&&!F(n)&&!n.later)}function pt(e,t){return P(e,t).filter(ge)}function vt(e,t){return P(e,t).filter(n=>F(n)&&!n.later)}function mt(e,t){return P(e,t).filter(n=>n.later&&ye(n))}function P(e,t){return e.filter(n=>ct(n,t)).sort((n,a)=>n.sort-a.sort)}function Y(e){return e.find(G)}function H(e){return e.kind==="body_sleep"||e.kind==="body_energy"||e.kind==="body_weight"}function be(e,t,n){return e.filter(a=>H(a)?!1:!!(a.item_id===t.id||a.item_id===null&&n&&t.id===n))}function gt(e,t){return t?[...e.filter(H),...be(e,t,t.id)]:e.filter(H)}function yt(e){return e.a===null?null:e.unit==="sec"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} s`:e.unit==="reps"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} reps`:String(e.a)}function M(e){return e.trim().toLowerCase()}function bt(e){const t=new Set,n=[];for(const a of e){const i=M(a.label);t.has(i)||(t.add(i),n.push(a))}return n}function ke(e,t,n){const a=bt(e),i=new Set(a.map(r=>M(r.label))),s=t.filter(r=>!i.has(M(r.label))).map(r=>({...r,tenant_id:n}));return[...a,...s]}function kt(e){const t=new Map;for(const n of e)for(const a of n)t.has(a.id)||t.set(a.id,a);return[...t.values()].sort((n,a)=>n.created_at.localeCompare(a.created_at))}function ht(e){return e?!!(e.identity_anti||e.identity_new||e.identity_constraint||e.horizon_1y||e.display_name):!1}function _t(e,t,n,a){if(e.length===0)return null;const i=e.reduce((d,p)=>(p.events?.length??0)>(d.events?.length??0)?p:d),s=e.find(d=>ht(d.profile))?.profile??i.profile,r=ke([i,...e.filter(d=>d!==i)].flatMap(d=>d.items??[]),t,a),c=new Map(r.map(d=>[M(d.label),d.id])),u=new Map;for(const d of e)for(const p of d.items??[]){const g=c.get(M(p.label));g&&p.id!==g&&u.set(p.id,g)}const w=kt(e.map(d=>d.events??[])).map(d=>{if(!d.item_id)return d;const p=u.get(d.item_id);return p?{...d,item_id:p}:d});return{...i,profile:{...s,id:s.id||n,tenant_id:s.tenant_id||a},items:r,events:w}}const z=3,he=[{id:"kracht",label:"Kracht"},{id:"eten",label:"Eten & drinken"},{id:"slaap",label:"Slaap"},{id:"stofjes",label:"Stofjes"},{id:"bewegen",label:"Bewegen"}],_e=["18–29","30–39","40–49","50–59","60+"],wt={kracht:["Push-ups","Squats","Plank","Dead hang"],eten:["Niet snoepen","Low carb","Intermittent fasting","Geen alcohol"],slaap:["Koud douchen"],stofjes:["Medicijn ochtend","Vitamine D"],bewegen:["Wandelen na eten"]};function we(e){return ge(e)||e.type==="weekly"?!1:e.type==="daily"||e.type==="leefregel"||e.type==="gedrag"||F(e)}function $e(e){return!(e.onboarded!==!1||(e.events??[]).length>0)}function $t(e){return $e(e)?e.profile.goals?.length?e.profile.age_band?e.theme_step!==!0?"themes":"start":"age":"goals":null}function xt(e,t){const n=e.filter(we).sort((s,r)=>s.sort-r.sort);if(t.length===0)return n;const a=new Set(t.flatMap(s=>wt[s]??[])),i=n.filter(s=>a.has(s.label));return i.length>0?i:n}function St(e,t){const n=new Set(t.slice(0,z));return e.map(a=>we(a)?{...a,later:!n.has(a.id)}:{...a,later:!1})}function Lt(e,t){return e.includes(t)?e.filter(n=>n!==t):[...e,t]}function Et(e,t){return e.includes(t)?e.filter(n=>n!==t):e.length>=z?e:[...e,t]}function It(e){return he.some(t=>t.id===e)}function Tt(e){return _e.includes(e)}const ee=["Military calisthenics","Kickbox","Spinnen"],xe=40;function U(e){const t=e.trim().replace(/\s+/g," ").slice(0,xe);return t.length>0?t:null}function E(e){if(!Array.isArray(e))return[];const t=new Set,n=[];for(const a of e){if(typeof a!="string")continue;const i=U(a);if(!i)continue;const s=i.toLowerCase();t.has(s)||(t.add(s),n.push(i))}return n}function At(e,t){const n=U(t);if(!n)return e;const a=n.toLowerCase();return e.some(i=>i.toLowerCase()===a)?e.filter(i=>i.toLowerCase()!==a):[...e,n]}function jt(e,t){const n=U(t);if(!n)return e;const a=n.toLowerCase();return e.some(i=>i.toLowerCase()===a)?e:[...e,n]}function Bt(e){const n=E(e).filter(a=>!ee.some(i=>i.toLowerCase()===a.toLowerCase()));return[...ee,...n]}function te(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function Se(e){const t=new Set(E(e).map(a=>a.toLowerCase()));return`<div class="chips">${Bt(e).map(a=>`<button class="chip pick ${t.has(a.toLowerCase())?"on":""}" data-act="theme-toggle" data-theme="${te(a)}">${te(a)}</button>`).join("")}</div>
        <div class="theme-add">
          <input data-id="theme-custom" type="text" maxlength="${xe}" placeholder="Eigen thema" autocomplete="off" enterkeyhint="done" />
          <button class="btn ghost" data-act="theme-add">Voeg toe</button>
        </div>`}const Le=["geen tijd","geen energie","vergeten","geen zin","pijn"],m={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},Ee="routine_loop_v6",Ct=["routine_loop_v5","routine_loop_v4","routine_loop_v3"],ne="routine_local_user_id",ie="routine_local_tenant_id",Mt="routine_local_chosen";function Ie(e,t){return{id:e,tenant_id:t,display_name:null,...re(),age_band:null,goals:[],themes:[]}}function Te(e,t,n=_()){return{id:A(),tenant_id:t,vector_id:e,milestone:m.milestone,started_on:n,deadline:T(n,m.windowDays),status:"active",stage_type:m.stageType}}function J(e){const t=n=>({id:A(),tenant_id:e,timing:ot(),role:null,template:null,later:!1,...n});return[t({type:"daily",label:"Push-ups",unit:"reps",a:m.a,b:m.b,milestone:m.milestone,weekdays:null,times_per_week:null,sort:0}),t({type:"daily",label:"Squats",unit:"reps",a:30,b:null,milestone:null,weekdays:null,times_per_week:null,sort:1}),t({type:"daily",label:"Plank",unit:"sec",a:60,b:null,milestone:null,weekdays:null,times_per_week:null,sort:2}),t({type:"daily",label:"Dead hang",unit:"sec",a:45,b:null,milestone:null,weekdays:null,times_per_week:null,sort:3}),t({type:"weekly",label:"Gerichte kracht",unit:null,a:null,b:null,milestone:null,weekdays:[],times_per_week:2,sort:4}),t({type:"leefregel",label:"Koud douchen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:5}),t({type:"leefregel",label:"Niet snoepen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:6}),t({type:"leefregel",label:"Low carb",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:7,role:"preference"}),t({type:"leefregel",label:"Intermittent fasting",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:8}),t({type:"leefregel",label:"Geen alcohol",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:9}),t({type:"gedrag",label:"Cafeïne 90 min na opstaan",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:10,role:"constraint",template:"public-framework",timing:{mode:"relative",clock:null,anchor:"wake",offset_min:90,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Wandelen na eten",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:11,role:"action",template:null,timing:{mode:"relative",clock:null,anchor:"meal",offset_min:0,window_min:null,frequency:"daily",condition:"na eten"}}),t({type:"medicijn",label:"Medicijn ochtend",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:12,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"ochtend"}}),t({type:"supplement",label:"Vitamine D",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:13,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}})]}function Dt(e,t){return{id:e.id,tenant_id:e.tenant_id,user_id:t,domain:m.domain,a:e.a??m.a,b:e.b??m.b,unit:e.unit==="sec"?"sec":"reps",pace_constraint:null}}function Ot(e,t=_(),n=A()){const a=Ie(e,n),i=J(n),s=Y(i)??i[0],r=Dt(s,e),c=Te(r.id,n,t);return s.milestone!==null&&(c.milestone=s.milestone),{profile:a,items:i,vector:r,stage:c,events:[],rotated:!1,onboarded:!1,theme_step:!1}}function Nt(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,items:e.items.map(n=>G(n)?{...n,a:m.a,b:m.b,milestone:m.milestone,unit:m.unit}:n),vector:{...e.vector,a:m.a,b:m.b,unit:m.unit},stage:{...e.stage,milestone:m.milestone},events:e.events}:e}function zt(){const e=localStorage.getItem(ne);if(e)return e;const t=A();return localStorage.setItem(ne,t),t}function qt(){const e=localStorage.getItem(ie);if(e)return e;const t=A();return localStorage.setItem(ie,t),t}function $(e){localStorage.setItem(Ee,JSON.stringify(e))}function Gt(e){if(!e)return null;try{const t=JSON.parse(e);return!t||typeof t!="object"?null:t}catch{return null}}function Pt(){return[Ee,...Ct].map(e=>Gt(localStorage.getItem(e))).filter(e=>e!==null)}function Rt(e,t,n){const a=ke(e.items??[],J(n),n).map(i=>ut(i,n));return{...e,profile:{...Ie(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...re(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null,age_band:e.profile?.age_band??null,goals:Array.isArray(e.profile?.goals)?e.profile.goals:[],themes:E(e.profile?.themes)},items:a,vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(i=>({...i,tenant_id:i.tenant_id??n,item_id:i.item_id??null})),rotated:!!e.rotated,onboarded:e.onboarded??!0,theme_step:e.theme_step??!1}}function x(e,t){const n=Pt();if(n.length===0){const s=Ot(e,_(),t);return $(s),s}const a=_t(n,J(t),e,t)??n[0],i=Nt(Rt(a,e,t));return $(i),i}function Ht(){localStorage.setItem(Mt,"1");const e=zt(),t=qt();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return x(e,t)},async addEvent(n){const a=x(e,t),i={id:n.id??A(),tenant_id:t,user_id:e,item_id:n.item_id??null,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:Ve()};return a.events.push(i),$(a),i},async saveProfile(n){const a=x(e,t);a.profile=n,$(a)},async saveOnboarding(n){const a=x(e,t);a.profile={...a.profile,goals:n.goals,age_band:n.age_band,themes:E(a.profile.themes)},a.items=St(a.items,n.startIds),a.onboarded=!0,a.theme_step=!0,$(a)},async saveThemes(n){const a=x(e,t);a.profile={...a.profile,themes:E(n)},a.theme_step=!0,$(a)},async setItemLater(n,a){const i=x(e,t);i.items=i.items.map(s=>s.id===n?{...s,later:a}:s),$(i)},async saveVectorConstraint(n,a){const i=x(e,t);i.vector.id===n&&(i.vector.pace_constraint=a,$(i))},async advanceStage(n,a){const i=x(e,t),s=Te(n.vector_id,t);return s.milestone=a,i.stage=s,i.items=i.items.map(r=>r.id===n.vector_id?{...r,milestone:a}:r),i.rotated=!0,$(i),s},async signOut(){}}}const ae="#F0ECE4",Wt="#3D6B5A";function Ae(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${ae}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${ae}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${Wt}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function y(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function Kt(e){return e==="stokt"||e==="herstel"?"ember":e==="stijgt"?"sage":"fog"}function se(e){const t=Kt(e);return e==="stokt"||e==="herstel"||e==="zakt"?y("status-kink",`ico-${t}`):e==="stijgt"?y("status-up",`ico-${t}`):y("status-flat",`ico-${t}`)}function Vt(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${y(n?"dot-now":"dot")}</button>`}).join("")}const Ft=`
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
</svg>`;function Yt(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",Ft)}const R=()=>document.querySelector("#app"),l={screen:"vandaag",skipItemId:null,advanceWarn:!1,busy:!1,error:null,startIds:[]};let v=null,o=null;function je(){if(!o)throw new Error("geen snapshot");const e=Y(o.items);return st(o.vector,o.stage,gt(o.events,e),_())}function C(e){if(!o)throw new Error("geen snapshot");const t=_(),n=Y(o.items),a=be(o.events,e,n?.id),i=e.a===null?null:ue(e.a,a);return{done:pe(a,t),plus:ve(a,t),skip:fe(a,t),logged:me(a,t),current:i}}function f(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function S(){if(!o||!v)return;const e=$t(o);if(e){R().innerHTML=Xt(e);return}const t=je(),{vector:n,stage:a}=o,i=v.mode==="local"?"Lokaal":"Supabase",s=`
    <div class="hdr">
      <div>
        ${Ae()}
        <div class="date-s">${We(_())}</div>
      </div>
      <div class="mode-pill">${i}</div>
    </div>`,r=`
    <nav class="nav">
      <button data-nav="vandaag" class="${l.screen==="vandaag"?"active":""}">${y("day")}Vandaag</button>
      <button data-nav="koers" class="${l.screen==="koers"?"active":""}">${y("mark")}Koers</button>
    </nav>`;if(l.screen==="vandaag"){const c=Ge(o.profile.identity_new,o.events),u=_(),w=ft(o.items,u),d=pt(o.items,u),p=vt(o.items,u),g=mt(o.items,u);R().innerHTML=`
      ${s}
      ${v.mode==="local"?'<div class="banner">Lokaal — geen Supabase. +1 / Done / Skip blijven op dit apparaat.</div>':""}
      ${t.gearDown?'<div class="banner hot">Lijf vraagt tempo omlaag. Etappe gaat niet omhoog.</div>':""}
      <div class="sec-hd">Lijf</div>
      <div class="card split">
        <div class="row">
          <div>
            <div class="lbl lbl-ico">${y("moon")} Slaap</div>
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
          <div class="dots">${Vt(t.energy)}</div>
        </div>
      </div>
      ${d.length?`<div class="sec-hd">Regel</div>${d.map(b=>Qt(b)).join("")}`:""}
      ${p.length?`<div class="sec-hd">Stofjes</div>${p.map(b=>Ut(b)).join("")}`:""}
      <div class="sec-hd">Vandaag</div>
      ${w.map(b=>en(b,t,c)).join("")}
      ${g.length?`<div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Niet in je start. Blijft bewaard.</div>
        ${g.map(b=>Jt(b)).join("")}
      </div>`:""}
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${se(t.trend.word)}
          <div class="word">${t.trend.word}</div>
        </div>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${f(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="koers"){const c=t.hitrate.eligible===0?"—":`${t.hitrate.hits}/${t.hitrate.eligible}`;R().innerHTML=`
      ${s}
      ${Zt(o.profile.themes,"Tik een suggestie of typ zelf. Geen vaste lijst. Later aan te passen.")}
      <div class="sec-hd">Strength · push-ups</div>
      <div class="card">
        <div class="kv">
          <div><div class="lbl">A</div><div class="val">${h(n.a)}</div></div>
          <div><div class="lbl">B</div><div class="val">${h(n.b)}</div></div>
          <div><div class="lbl">Nu</div><div class="val">${h(t.current)}</div></div>
          <div><div class="lbl">Etappe</div><div class="val">${h(a.milestone)}</div></div>
        </div>
      </div>
      <div class="card">
        <div class="kv">
          <div>
            <div class="lbl">Venster</div>
            <div class="val" style="font-size:1.15rem">${X(a.started_on)} → ${a.deadline?X(a.deadline):"—"}</div>
          </div>
          <div>
            <div class="lbl">Trend</div>
            <div class="val status">${se(t.trend.word)} ${t.trend.word}</div>
          </div>
          <div>
            <div class="lbl">Hitrate week</div>
            <div class="val">${c}</div>
          </div>
          <div>
            <div class="lbl">Rem</div>
            <div class="val" style="font-size:1.1rem">${f(n.pace_constraint||"—")}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="lbl">Volgende actie</div>
        <div class="action-line">${f(t.nextAction)}</div>
      </div>
      ${Re(o.profile.horizon_1y,o.rotated)?'<div class="banner">Zet een 1-jaars B. Etappes roteren.</div>':""}
      <div class="sec-hd">${y("ik")} Ik</div>
      <div class="card">
        <div class="field">
          <div class="lbl">Leven dat ik weiger</div>
          <textarea data-id="identity_anti" maxlength="${k.identity_anti}">${f(o.profile.identity_anti??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wie ik word</div>
          <textarea data-id="identity_new" maxlength="${k.identity_new}">${f(o.profile.identity_new??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wat B niet mag schenden</div>
          <textarea data-id="identity_constraint" maxlength="${k.identity_constraint}">${f(o.profile.identity_constraint??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">1-jaars B</div>
          <textarea data-id="horizon_1y" maxlength="${k.horizon_1y}">${f(o.profile.horizon_1y??"")}</textarea>
        </div>
        <button class="btn primary" data-act="save-ik">Bewaar</button>
      </div>
      <div class="card stack">
        <button class="btn ghost ico-btn" data-act="export">${y("export")}<span>Exporteer JSON</span></button>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${f(l.error)}</p>`:""}
      ${r}`;return}}function Ut(e){const t=C(e),n=t.logged||!!t.skip,a=e.type==="medicijn"?"Genomen":"Done",i=V(e);return`
      <div class="card stof">
        <div class="ex-nm">${f(e.label)}</div>
        ${i?`<div class="note">${f(i)}</div>`:""}
        <div class="actions actions-two">
          <button class="btn ico-btn ${t.done?"track":""}" data-act="done" data-item="${e.id}" ${n?"disabled":""}>${y("done")}<span>${a}</span></button>
          <button class="btn ico-btn skip ${t.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${t.logged?"disabled":""}>${y("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||t.skip?`<div class="chips">${Le.map(s=>`<button class="chip ${t.skip===s?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${s}">${s}</button>`).join("")}</div>`:""}
      </div>`}function Jt(e){return`
      <div class="later-row">
        <div class="ex-nm">${f(e.label)}</div>
        <button class="btn ghost later-now" data-act="later-now" data-item="${e.id}">Nu</button>
      </div>`}function Zt(e,t){return`
      <section class="theme-sec" data-sec="themes">
        <div class="sec-hd">Thema's</div>
        <div class="card">
          <div class="ex-nm">Trainingsrichting</div>
          <div class="note">${f(t)}</div>
          ${Se(e)}
        </div>
      </section>`}function Xt(e){if(!o)return"";const t=o.profile.goals??[],n=o.profile.age_band,a=xt(o.items,t),i=l.startIds,s=`
    <div class="hdr">
      <div>
        ${Ae()}
        <div class="date-s">Start</div>
      </div>
    </div>`;if(e==="goals")return`
      ${s}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="ex-nm">Wat is je richting?</div>
        <div class="note">Eerst doelen. Types (gedrag, regel, medicijn, supplement) komen daarna.</div>
        <div class="chips">${he.map(r=>`<button class="chip pick ${t.includes(r.id)?"on":""}" data-act="onboard-goal" data-goal="${r.id}">${r.label}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${t.length===0?"disabled":""}>Verder</button>
        </div>
      </div>`;if(e==="age")return`
      ${s}
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="ex-nm">Kies een band</div>
        <div class="note">Geen geboortedatum. Alleen een band.</div>
        <div class="chips">${_e.map(r=>`<button class="chip pick ${n===r?"on":""}" data-act="onboard-age" data-age="${r}">${r}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${n?"":"disabled"}>Verder</button>
        </div>
      </div>`;if(e==="themes"){const r=o.profile.themes??[];return`
      ${s}
      <div class="sec-hd">Thema's</div>
      <div class="card">
        <div class="ex-nm">Trainingsrichting</div>
        <div class="note">Tik een suggestie of typ zelf. Mag leeg. Later aan te passen.</div>
        ${Se(r)}
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-themes-done">Verder</button>
        </div>
      </div>`}return`
    ${s}
    <div class="sec-hd">Start</div>
    <div class="card">
      <div class="ex-nm">Max ${z} nu</div>
      <div class="note">De rest gaat naar Later. Later blijft zichtbaar.</div>
      <div class="chips">${a.map(r=>`<button class="chip pick ${i.includes(r.id)?"on":""}" data-act="onboard-start" data-item="${r.id}">${f(r.label)}</button>`).join("")}</div>
      <div class="note">${i.length} / ${z} gekozen</div>
      <div class="stack" style="margin-top:16px">
        <button class="btn primary" data-act="onboard-done" ${i.length===0?"disabled":""}>Naar Vandaag</button>
      </div>
    </div>`}function Qt(e){const t=V(e);return`
      <div class="card quiet">
        <div class="ex-nm">${f(e.label)}</div>
        ${t?`<div class="note">${f(t)}</div>`:'<div class="note">Regel. Geen afvinken.</div>'}
      </div>`}function en(e,t,n){const a=C(e),i=G(e),s=a.logged||!!a.skip,r=i&&a.current!==null&&e.b!==null&&a.current>=e.b,c=s||r,u=i,w=yt(e),d=V(e),p=u&&t.suggestedMilestone&&e.id===o.vector.id;return`
      <div class="card">
        <div class="ex-nm">${f(e.label)}</div>
        ${d&&!w&&!i?`<div class="note">${f(d)}</div>`:""}
        ${i?`<div class="track">
          <span class="now">${h(a.current??e.a??0)}</span>
          <span>→</span>
          <span class="mid">${h(e.milestone??0)}</span>
          <span>→</span>
          <span class="end">${h(e.b??0)}</span>
        </div>`:w?`<div class="work">${f(w)}</div>`:""}
        <div class="actions ${i?"":"actions-two"}">
          ${i?`<button class="btn ico-btn ${a.plus?"on":""}" data-act="plus" data-item="${e.id}" ${c?"disabled":""}>${y("plus")}<span>+1</span></button>`:""}
          <button class="btn ico-btn ${a.done?"track":""}" data-act="done" data-item="${e.id}" ${s?"disabled":""}>${y("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${a.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${a.logged?"disabled":""}>${y("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||a.skip?`<div class="chips">${Le.map(g=>`<button class="chip ${a.skip===g?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${g}">${g}</button>`).join("")}</div>`:""}
        ${p?`<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${h(t.suggestedMilestone)}.</div>
               ${l.advanceWarn&&o.profile.identity_constraint?`<div class="banner">Check: ${f(o.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${h(t.suggestedMilestone)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`:`<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${t.suggestedMilestone}">Volgende etappe ${h(t.suggestedMilestone)}</button>
                      </div>`}`:""}
        ${u&&n?`<div class="note">${f(n)}</div>`:""}
      </div>`}function h(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function L(e){if(!l.busy){l.busy=!0,l.error=null;try{await e()}catch(t){l.error=t instanceof Error?t.message:"Er ging iets mis"}finally{l.busy=!1,S()}}}async function tn(e){v=e,o=await v.load(),l.screen="vandaag",S()}async function nn(){Yt(),an(),await tn(Ht())}function an(){document.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const t=e.target;!(t instanceof HTMLInputElement)||t.dataset.id!=="theme-custom"||(e.preventDefault(),Be())}),document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(n==="vandaag"||n==="koers"){l.screen=n,l.skipItemId=null,l.advanceWarn=!1,S();return}sn(t)})}async function sn(e){const t=e.dataset.act;if(!t||!v||!o)return;const n=je(),a=_();if(t==="sleep-inc"||t==="sleep-dec"){const i=n.sleep??7,s=Math.max(0,Math.min(14,i+(t==="sleep-inc"?.5:-.5)));await j({date:a,kind:"body_sleep",value:s,skip_reason:null,item_id:null});return}if(t==="energy"){const i=Number(e.dataset.n),s=n.energy===i?null:i;if(s===null)return;await j({date:a,kind:"body_energy",value:s,skip_reason:null,item_id:null});return}if(t==="plus"){const i=o.items.find(r=>r.id===e.dataset.item);if(!i||!G(i))return;const s=C(i);if(s.logged||s.skip||i.b!==null&&s.current!==null&&s.current>=i.b)return;await j({date:a,kind:"set",value:(s.current??i.a??0)+1,skip_reason:null,item_id:i.id});return}if(t==="done"){const i=o.items.find(r=>r.id===e.dataset.item);if(!i)return;const s=C(i);if(s.logged||s.skip)return;await j({date:a,kind:"done",value:s.current??i.a,skip_reason:null,item_id:i.id});return}if(t==="skip-open"){const i=e.dataset.item??null;l.skipItemId=l.skipItemId===i?null:i,S();return}if(t==="skip"){const i=o.items.find(c=>c.id===e.dataset.item);if(!i||C(i).logged)return;const r=e.dataset.reason;if(!r)return;await j({date:a,kind:"skip",value:null,skip_reason:r,item_id:i.id}),l.skipItemId=null;return}if(t==="advance"){if(!n.suggestedMilestone)return;if(Pe(o.profile.identity_constraint)&&!l.advanceWarn){l.advanceWarn=!0,S();return}await oe(n.suggestedMilestone);return}if(t==="advance-go"){if(!n.suggestedMilestone)return;await oe(n.suggestedMilestone);return}if(t==="advance-cancel"){l.advanceWarn=!1,S();return}if(t==="onboard-goal"){const i=e.dataset.goal;if(!i||!It(i))return;const s={...o.profile,goals:Lt(o.profile.goals??[],i)};await L(async()=>{await v.saveProfile(s),o.profile=s});return}if(t==="onboard-age"){const i=e.dataset.age;if(!i||!Tt(i))return;const s={...o.profile,age_band:i};await L(async()=>{await v.saveProfile(s),o.profile=s});return}if(t==="theme-toggle"){const i=e.dataset.theme;if(!i)return;await W(At(E(o.profile.themes),i));return}if(t==="theme-add"){await Be();return}if(t==="onboard-start"){const i=e.dataset.item;if(!i)return;l.startIds=Et(l.startIds,i),S();return}if(t==="onboard-next"){S();return}if(t==="onboard-themes-done"){await W(o.profile.themes??[],!0);return}if(t==="onboard-done"){const i=o.profile.age_band,s=o.profile.goals??[];if(!i||s.length===0||l.startIds.length===0)return;await L(async()=>{await v.saveOnboarding({goals:s,age_band:i,startIds:l.startIds}),o=await v.load(),l.screen="vandaag"});return}if(t==="later-now"){const i=e.dataset.item;if(!i)return;await L(async()=>{await v.setItemLater(i,!1),o=await v.load()});return}if(t==="save-ik"){const i={...o.profile,identity_anti:I(B("identity_anti"),k.identity_anti),identity_new:I(B("identity_new"),k.identity_new),identity_constraint:I(B("identity_constraint"),k.identity_constraint),horizon_1y:I(B("horizon_1y"),k.horizon_1y)};await L(async()=>{await v.saveProfile(i),o.profile=i});return}if(t==="export"){Ne(o);return}}async function Be(){if(!o)return;const e=B("theme-custom")??"",t=E(o.profile.themes),n=jt(t,e);n.length===t.length&&n.every((a,i)=>a===t[i])||await W(n)}async function W(e,t=!1){if(!v||!o)return;const n=E(e),a={...o.profile,themes:n},i=t||!$e(o);await L(async()=>{if(i){await v.saveThemes(n),o=await v.load();return}await v.saveProfile(a),o.profile=a})}function B(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function oe(e){await L(async()=>{o.stage=await v.advanceStage(o.stage,e),o.items=o.items.map(t=>t.id===o.stage.vector_id?{...t,milestone:e}:t),o.rotated=!0,l.advanceWarn=!1})}async function j(e){await L(async()=>{const t=await v.addEvent(e);o.events.push(t)})}nn();
