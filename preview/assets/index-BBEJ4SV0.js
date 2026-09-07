(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();function me(e){return JSON.stringify({exported_at:new Date().toISOString(),profile:e.profile,items:e.items,stage:e.stage,events:e.events},null,2)}function ge(e){const t=new Blob([me(e)],{type:"application/json"}),n=URL.createObjectURL(t),s=document.createElement("a");s.href=n,s.download=`routine-${e.profile.id.slice(0,8)}.json`,s.click(),URL.revokeObjectURL(n)}const be="geen zin",m={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140};function w(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function _e(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===be).length}function ke(e,t){const n=w(e,m.identity_new);return!n||_e(t)<2?null:n}function we(e){return!!w(e,m.identity_constraint)}function he(e,t){return t&&!w(e,m.horizon_1y)}function Q(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const X=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],$e=["zo","ma","di","wo","do","vr","za"];function b(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${s}`}function h(e,t){const n=O(e);return n.setDate(n.getDate()+t),b(n)}function O(e){const[t,n,s]=e.split("-").map(Number);return new Date(t,n-1,s)}function xe(e){const t=O(e);return`${$e[t.getDay()]} ${t.getDate()} ${X[t.getMonth()]}`}function F(e){const t=O(e);return`${t.getDate()} ${X[t.getMonth()]}`}function Se(e){const t=O(e).getDay();return t===0?7:t}function ee(e){const t=O(e),n=t.getDay(),s=n===0?-6:1-n;return t.setDate(t.getDate()+s),b(t)}function te(e,t){const n=[];let s=e;for(;s<=t;)n.push(s),s=h(s,1);return n}function L(){return crypto.randomUUID()}function Le(){return new Date().toISOString()}const Ee=2,Be=6;function M(e,t){return e.created_at.localeCompare(t.created_at)}function z(e,t,n){return e.filter(s=>s.date===t&&s.kind===n).sort(M).at(-1)}function ne(e,t){return t.filter(s=>s.kind==="set").sort(M).at(-1)?.value??e}function Ie(e,t){return z(e,t,"body_sleep")?.value??null}function Oe(e,t){return z(e,t,"body_energy")?.value??null}function D(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip")).sort(M).at(-1)}function ie(e,t){const n=D(e,t);return n?.kind==="skip"?n.skip_reason:null}function se(e,t){return D(e,t)?.kind==="done"}function re(e,t){return D(e,t)?.kind==="set"}function ae(e,t){const n=D(e,t);return n?.kind==="set"||n?.kind==="done"}function De(e,t){return e!==null&&e<Be||t!==null&&t<=Ee}function Ae(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const s=Math.max(1,Math.ceil(n/2));return Math.min(t,e+s)}function R(e,t,n,s){if(t<s)return"empty";const i=D(e,t);return i?.kind==="done"||i?.kind==="set"?"done":i?.kind==="skip"?"skip":z(e,t,"miss")?"miss":t>=n?"empty":"miss"}function Te(e,t,n="1970-01-01"){let s=0,i=t;for(let r=0;r<400;r+=1){const a=R(e,i,t,n);if(a==="done")s+=1;else if(a==="skip"||a==="empty"&&i===t){i=h(i,-1);continue}else break;i=h(i,-1)}return s}function Me(e,t,n){const s=ee(t),i=!n||n<s?s:n;let r=0,a=0;for(const u of te(i,t)){const p=R(e,u,t,n??i);p==="skip"||p==="empty"||(a+=1,p==="done"&&(r+=1))}return{hits:r,eligible:a}}function Ne(e,t,n="1970-01-01",s=3){const i=h(t,-1);if(i<n)return!1;const r=h(t,-s),a=n>r?n:r;return te(a,i).some(u=>R(e,u,t,n)==="miss")}function Ce(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function je(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${q(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${q(e.milestone)}.`}function q(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function ze(e,t,n){return t.filter(i=>i.kind==="set"&&i.date<=n).sort(M).at(-1)?.value??e}function Re(e,t,n,s){const i=ne(e.a,n),r=Ie(n,s),a=Oe(n,s),u=se(n,s),p=re(n,s),$=ae(n,s),l=ie(n,s),c=De(r,a),k=i>=t.milestone,C=i>=e.b,K=Ne(n,s,t.started_on),pe=ee(s),ve=ze(e.a,n,h(pe,-1)),ye=Ce({current:i,weekStartCurrent:ve,gearDown:c,stalled:K,milestoneHit:k});return{current:i,sleep:r,energy:a,doneToday:u,plusToday:p,setLoggedToday:$,skipToday:l,gearDown:c,milestoneHit:k,atB:C,trend:ye,hitrate:Me(n,s,t.started_on),streak:Te(n,s,t.started_on),nextAction:je({milestone:t.milestone,b:e.b,gearDown:c,milestoneHit:k,atB:C,stalled:K,doneToday:u,plusToday:p,skipToday:l}),suggestedMilestone:k&&!C&&!c?Ae(t.milestone,e.b):null}}function N(e){return e.a!==null&&e.b!==null&&e.milestone!==null}function We(e,t){if(e.type==="weekly"){const n=e.weekdays??[];return n.length===0?!1:n.includes(Se(t))}return!0}function He(e,t){return e.filter(n=>We(n,t)).sort((n,s)=>n.sort-s.sort)}function W(e){return e.find(N)}function j(e){return e.kind==="body_sleep"||e.kind==="body_energy"||e.kind==="body_weight"}function oe(e,t,n){return e.filter(s=>j(s)?!1:!!(s.item_id===t.id||s.item_id===null&&n&&t.id===n))}function Pe(e,t){return t?[...e.filter(j),...oe(e,t,t.id)]:e.filter(j)}function Ke(e){return e.a===null?null:e.unit==="sec"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} s`:e.unit==="reps"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} reps`:String(e.a)}function I(e){return e.trim().toLowerCase()}function Fe(e){const t=new Set,n=[];for(const s of e){const i=I(s.label);t.has(i)||(t.add(i),n.push(s))}return n}function le(e,t,n){const s=Fe(e),i=new Set(s.map(a=>I(a.label))),r=t.filter(a=>!i.has(I(a.label))).map(a=>({...a,tenant_id:n}));return[...s,...r]}function qe(e){const t=new Map;for(const n of e)for(const s of n)t.has(s.id)||t.set(s.id,s);return[...t.values()].sort((n,s)=>n.created_at.localeCompare(s.created_at))}function Ge(e){return e?!!(e.identity_anti||e.identity_new||e.identity_constraint||e.horizon_1y||e.display_name):!1}function Ye(e,t,n,s){if(e.length===0)return null;const i=e.reduce((l,c)=>(c.events?.length??0)>(l.events?.length??0)?c:l),r=e.find(l=>Ge(l.profile))?.profile??i.profile,a=le([i,...e.filter(l=>l!==i)].flatMap(l=>l.items??[]),t,s),u=new Map(a.map(l=>[I(l.label),l.id])),p=new Map;for(const l of e)for(const c of l.items??[]){const k=u.get(I(c.label));k&&c.id!==k&&p.set(c.id,k)}const $=qe(e.map(l=>l.events??[])).map(l=>{if(!l.item_id)return l;const c=p.get(l.item_id);return c?{...l,item_id:c}:l});return{...i,profile:{...r,id:r.id||n,tenant_id:r.tenant_id||s},items:a,events:$}}const Ue=["geen tijd","geen energie","vergeten","geen zin","pijn"],f={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},de="routine_loop_v6",Ve=["routine_loop_v5","routine_loop_v4","routine_loop_v3"],G="routine_local_user_id",Y="routine_local_tenant_id",Je="routine_local_chosen";function ce(e,t){return{id:e,tenant_id:t,display_name:null,...Q()}}function ue(e,t,n=b()){return{id:L(),tenant_id:t,vector_id:e,milestone:f.milestone,started_on:n,deadline:h(n,f.windowDays),status:"active",stage_type:f.stageType}}function H(e){const t=n=>({id:L(),tenant_id:e,...n});return[t({type:"daily",label:"Push-ups",unit:"reps",a:f.a,b:f.b,milestone:f.milestone,weekdays:null,times_per_week:null,sort:0}),t({type:"daily",label:"Squats",unit:"reps",a:30,b:null,milestone:null,weekdays:null,times_per_week:null,sort:1}),t({type:"daily",label:"Plank",unit:"sec",a:60,b:null,milestone:null,weekdays:null,times_per_week:null,sort:2}),t({type:"daily",label:"Dead hang",unit:"sec",a:45,b:null,milestone:null,weekdays:null,times_per_week:null,sort:3}),t({type:"weekly",label:"Gerichte kracht",unit:null,a:null,b:null,milestone:null,weekdays:[],times_per_week:2,sort:4}),t({type:"leefregel",label:"Koud douchen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:5}),t({type:"leefregel",label:"Niet snoepen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:6}),t({type:"leefregel",label:"Low carb",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:7}),t({type:"leefregel",label:"Intermittent fasting",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:8}),t({type:"leefregel",label:"Geen alcohol",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:9})]}function Ze(e,t){return{id:e.id,tenant_id:e.tenant_id,user_id:t,domain:f.domain,a:e.a??f.a,b:e.b??f.b,unit:e.unit==="sec"?"sec":"reps",pace_constraint:null}}function Qe(e,t=b(),n=L()){const s=ce(e,n),i=H(n),r=W(i)??i[0],a=Ze(r,e),u=ue(a.id,n,t);return r.milestone!==null&&(u.milestone=r.milestone),{profile:s,items:i,vector:a,stage:u,events:[],rotated:!1}}function Xe(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,items:e.items.map(n=>N(n)?{...n,a:f.a,b:f.b,milestone:f.milestone,unit:f.unit}:n),vector:{...e.vector,a:f.a,b:f.b,unit:f.unit},stage:{...e.stage,milestone:f.milestone},events:e.events}:e}function et(){const e=localStorage.getItem(G);if(e)return e;const t=L();return localStorage.setItem(G,t),t}function tt(){const e=localStorage.getItem(Y);if(e)return e;const t=L();return localStorage.setItem(Y,t),t}function x(e){localStorage.setItem(de,JSON.stringify(e))}function nt(e){if(!e)return null;try{const t=JSON.parse(e);return!t||typeof t!="object"?null:t}catch{return null}}function it(){return[de,...Ve].map(e=>nt(localStorage.getItem(e))).filter(e=>e!==null)}function st(e,t,n){const s=le(e.items??[],H(n),n).map(i=>({...i,tenant_id:i.tenant_id??n,weekdays:i.weekdays??null,times_per_week:i.times_per_week??null}));return{...e,profile:{...ce(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...Q(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null},items:s,vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(i=>({...i,tenant_id:i.tenant_id??n,item_id:i.item_id??null})),rotated:!!e.rotated}}function E(e,t){const n=it();if(n.length===0){const r=Qe(e,b(),t);return x(r),r}const s=Ye(n,H(t),e,t)??n[0],i=Xe(st(s,e,t));return x(i),i}function rt(){localStorage.setItem(Je,"1");const e=et(),t=tt();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return E(e,t)},async addEvent(n){const s=E(e,t),i={id:n.id??L(),tenant_id:t,user_id:e,item_id:n.item_id??null,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:Le()};return s.events.push(i),x(s),i},async saveProfile(n){const s=E(e,t);s.profile=n,x(s)},async saveVectorConstraint(n,s){const i=E(e,t);i.vector.id===n&&(i.vector.pace_constraint=s,x(i))},async advanceStage(n,s){const i=E(e,t),r=ue(n.vector_id,t);return r.milestone=s,i.stage=r,i.items=i.items.map(a=>a.id===n.vector_id?{...a,milestone:s}:a),i.rotated=!0,x(i),r},async signOut(){}}}const U="#F0ECE4",at="#3D6B5A";function ot(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${U}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${U}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${at}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function y(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function lt(e){return e==="stokt"||e==="herstel"?"ember":e==="stijgt"?"sage":"fog"}function V(e){const t=lt(e);return e==="stokt"||e==="herstel"||e==="zakt"?y("status-kink",`ico-${t}`):e==="stijgt"?y("status-up",`ico-${t}`):y("status-flat",`ico-${t}`)}function dt(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${y(n?"dot-now":"dot")}</button>`}).join("")}const ct=`
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
</svg>`;function ut(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",ct)}const J=()=>document.querySelector("#app"),d={screen:"vandaag",skipItemId:null,advanceWarn:!1,busy:!1,error:null};let _=null,o=null;function fe(){if(!o)throw new Error("geen snapshot");const e=W(o.items);return Re(o.vector,o.stage,Pe(o.events,e),b())}function T(e){if(!o)throw new Error("geen snapshot");const t=b(),n=W(o.items),s=oe(o.events,e,n?.id),i=e.a===null?null:ne(e.a,s);return{done:se(s,t),plus:re(s,t),skip:ie(s,t),logged:ae(s,t),current:i}}function v(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function S(){if(!o||!_)return;const e=fe(),{vector:t,stage:n}=o,s=_.mode==="local"?"Lokaal":"Supabase",i=`
    <div class="hdr">
      <div>
        ${ot()}
        <div class="date-s">${xe(b())}</div>
      </div>
      <div class="mode-pill">${s}</div>
    </div>`,r=`
    <nav class="nav">
      <button data-nav="vandaag" class="${d.screen==="vandaag"?"active":""}">${y("day")}Vandaag</button>
      <button data-nav="koers" class="${d.screen==="koers"?"active":""}">${y("mark")}Koers</button>
    </nav>`;if(d.screen==="vandaag"){const a=ke(o.profile.identity_new,o.events),u=He(o.items,b());J().innerHTML=`
      ${i}
      ${_.mode==="local"?'<div class="banner">Lokaal — geen Supabase. +1 / Done / Skip blijven op dit apparaat.</div>':""}
      ${e.gearDown?'<div class="banner hot">Lijf vraagt tempo omlaag. Etappe gaat niet omhoog.</div>':""}
      <div class="sec-hd">Lijf</div>
      <div class="card split">
        <div class="row">
          <div>
            <div class="lbl lbl-ico">${y("moon")} Slaap</div>
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
          <div class="dots">${dt(e.energy)}</div>
        </div>
      </div>
      <div class="sec-hd">Vandaag</div>
      ${u.map(p=>ft(p,e,a)).join("")}
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${V(e.trend.word)}
          <div class="word">${e.trend.word}</div>
        </div>
      </div>
      ${d.error?`<p class="error" style="padding:0 18px">${v(d.error)}</p>`:""}
      ${r}`;return}if(d.screen==="koers"){const a=e.hitrate.eligible===0?"—":`${e.hitrate.hits}/${e.hitrate.eligible}`;J().innerHTML=`
      ${i}
      <div class="sec-hd">Strength · push-ups</div>
      <div class="card">
        <div class="kv">
          <div><div class="lbl">A</div><div class="val">${g(t.a)}</div></div>
          <div><div class="lbl">B</div><div class="val">${g(t.b)}</div></div>
          <div><div class="lbl">Nu</div><div class="val">${g(e.current)}</div></div>
          <div><div class="lbl">Etappe</div><div class="val">${g(n.milestone)}</div></div>
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
            <div class="val">${a}</div>
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
      ${he(o.profile.horizon_1y,o.rotated)?'<div class="banner">Zet een 1-jaars B. Etappes roteren.</div>':""}
      <div class="sec-hd">${y("ik")} Ik</div>
      <div class="card">
        <div class="field">
          <div class="lbl">Leven dat ik weiger</div>
          <textarea data-id="identity_anti" maxlength="${m.identity_anti}">${v(o.profile.identity_anti??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wie ik word</div>
          <textarea data-id="identity_new" maxlength="${m.identity_new}">${v(o.profile.identity_new??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wat B niet mag schenden</div>
          <textarea data-id="identity_constraint" maxlength="${m.identity_constraint}">${v(o.profile.identity_constraint??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">1-jaars B</div>
          <textarea data-id="horizon_1y" maxlength="${m.horizon_1y}">${v(o.profile.horizon_1y??"")}</textarea>
        </div>
        <button class="btn primary" data-act="save-ik">Bewaar</button>
      </div>
      <div class="card stack">
        <button class="btn ghost ico-btn" data-act="export">${y("export")}<span>Exporteer JSON</span></button>
      </div>
      ${d.error?`<p class="error" style="padding:0 18px">${v(d.error)}</p>`:""}
      ${r}`;return}}function ft(e,t,n){const s=T(e),i=N(e),r=s.logged||!!s.skip,a=i&&s.current!==null&&e.b!==null&&s.current>=e.b,u=r||a,p=i,$=Ke(e),l=p&&t.suggestedMilestone&&e.id===o.vector.id;return`
      <div class="card">
        <div class="ex-nm">${v(e.label)}</div>
        ${i?`<div class="track">
          <span class="now">${g(s.current??e.a??0)}</span>
          <span>→</span>
          <span class="mid">${g(e.milestone??0)}</span>
          <span>→</span>
          <span class="end">${g(e.b??0)}</span>
        </div>`:$?`<div class="work">${v($)}</div>`:""}
        <div class="actions ${i?"":"actions-two"}">
          ${i?`<button class="btn ico-btn ${s.plus?"on":""}" data-act="plus" data-item="${e.id}" ${u?"disabled":""}>${y("plus")}<span>+1</span></button>`:""}
          <button class="btn ico-btn ${s.done?"track":""}" data-act="done" data-item="${e.id}" ${r?"disabled":""}>${y("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${s.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${s.logged?"disabled":""}>${y("skip")}<span>Skip</span></button>
        </div>
        ${d.skipItemId===e.id||s.skip?`<div class="chips">${Ue.map(c=>`<button class="chip ${s.skip===c?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${c}">${c}</button>`).join("")}</div>`:""}
        ${l?`<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${g(t.suggestedMilestone)}.</div>
               ${d.advanceWarn&&o.profile.identity_constraint?`<div class="banner">Check: ${v(o.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${g(t.suggestedMilestone)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`:`<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${t.suggestedMilestone}">Volgende etappe ${g(t.suggestedMilestone)}</button>
                      </div>`}`:""}
        ${p&&n?`<div class="note">${v(n)}</div>`:""}
      </div>`}function g(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function P(e){if(!d.busy){d.busy=!0,d.error=null;try{await e()}catch(t){d.error=t instanceof Error?t.message:"Er ging iets mis"}finally{d.busy=!1,S()}}}async function pt(e){_=e,o=await _.load(),d.screen="vandaag",S()}async function vt(){ut(),yt(),await pt(rt())}function yt(){document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(n==="vandaag"||n==="koers"){d.screen=n,d.skipItemId=null,d.advanceWarn=!1,S();return}mt(t)})}async function mt(e){const t=e.dataset.act;if(!t||!_||!o)return;const n=fe(),s=b();if(t==="sleep-inc"||t==="sleep-dec"){const i=n.sleep??7,r=Math.max(0,Math.min(14,i+(t==="sleep-inc"?.5:-.5)));await B({date:s,kind:"body_sleep",value:r,skip_reason:null,item_id:null});return}if(t==="energy"){const i=Number(e.dataset.n),r=n.energy===i?null:i;if(r===null)return;await B({date:s,kind:"body_energy",value:r,skip_reason:null,item_id:null});return}if(t==="plus"){const i=o.items.find(a=>a.id===e.dataset.item);if(!i||!N(i))return;const r=T(i);if(r.logged||r.skip||i.b!==null&&r.current!==null&&r.current>=i.b)return;await B({date:s,kind:"set",value:(r.current??i.a??0)+1,skip_reason:null,item_id:i.id});return}if(t==="done"){const i=o.items.find(a=>a.id===e.dataset.item);if(!i)return;const r=T(i);if(r.logged||r.skip)return;await B({date:s,kind:"done",value:r.current??i.a,skip_reason:null,item_id:i.id});return}if(t==="skip-open"){const i=e.dataset.item??null;d.skipItemId=d.skipItemId===i?null:i,S();return}if(t==="skip"){const i=o.items.find(u=>u.id===e.dataset.item);if(!i||T(i).logged)return;const a=e.dataset.reason;if(!a)return;await B({date:s,kind:"skip",value:null,skip_reason:a,item_id:i.id}),d.skipItemId=null;return}if(t==="advance"){if(!n.suggestedMilestone)return;if(we(o.profile.identity_constraint)&&!d.advanceWarn){d.advanceWarn=!0,S();return}await Z(n.suggestedMilestone);return}if(t==="advance-go"){if(!n.suggestedMilestone)return;await Z(n.suggestedMilestone);return}if(t==="advance-cancel"){d.advanceWarn=!1,S();return}if(t==="save-ik"){const i={...o.profile,identity_anti:w(A("identity_anti"),m.identity_anti),identity_new:w(A("identity_new"),m.identity_new),identity_constraint:w(A("identity_constraint"),m.identity_constraint),horizon_1y:w(A("horizon_1y"),m.horizon_1y)};await P(async()=>{await _.saveProfile(i),o.profile=i});return}if(t==="export"){ge(o);return}}function A(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function Z(e){await P(async()=>{o.stage=await _.advanceStage(o.stage,e),o.items=o.items.map(t=>t.id===o.stage.vector_id?{...t,milestone:e}:t),o.rotated=!0,d.advanceWarn=!1})}async function B(e){await P(async()=>{const t=await _.addEvent(e);o.events.push(t)})}vt();
