(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();function pe(e){return JSON.stringify({exported_at:new Date().toISOString(),profile:e.profile,items:e.items,stage:e.stage,events:e.events},null,2)}function ve(e){const t=new Blob([pe(e)],{type:"application/json"}),n=URL.createObjectURL(t),i=document.createElement("a");i.href=n,i.download=`routine-${e.profile.id.slice(0,8)}.json`,i.click(),URL.revokeObjectURL(n)}const ye="geen zin",v={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140};function b(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function me(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===ye).length}function ge(e,t){const n=b(e,v.identity_new);return!n||me(t)<2?null:n}function ke(e){return!!b(e,v.identity_constraint)}function be(e,t){return t&&!b(e,v.horizon_1y)}function J(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const Z=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],_e=["zo","ma","di","wo","do","vr","za"];function m(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${i}`}function _(e,t){const n=E(e);return n.setDate(n.getDate()+t),m(n)}function E(e){const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)}function we(e){const t=E(e);return`${_e[t.getDay()]} ${t.getDate()} ${Z[t.getMonth()]}`}function R(e){const t=E(e);return`${t.getDate()} ${Z[t.getMonth()]}`}function he(e){const t=E(e).getDay();return t===0?7:t}function Q(e){const t=E(e),n=t.getDay(),i=n===0?-6:1-n;return t.setDate(t.getDate()+i),m(t)}function X(e,t){const n=[];let i=e;for(;i<=t;)n.push(i),i=_(i,1);return n}function h(){return crypto.randomUUID()}function $e(){return new Date().toISOString()}const xe=2,Se=6;function T(e,t){return e.created_at.localeCompare(t.created_at)}function C(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(T).at(-1)}function ee(e,t){return t.filter(i=>i.kind==="set").sort(T).at(-1)?.value??e}function Ee(e,t){return C(e,t,"body_sleep")?.value??null}function Le(e,t){return C(e,t,"body_energy")?.value??null}function L(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip")).sort(T).at(-1)}function te(e,t){const n=L(e,t);return n?.kind==="skip"?n.skip_reason:null}function ne(e,t){return L(e,t)?.kind==="done"}function ie(e,t){return L(e,t)?.kind==="set"}function se(e,t){const n=L(e,t);return n?.kind==="set"||n?.kind==="done"}function Ie(e,t){return e!==null&&e<Se||t!==null&&t<=xe}function Be(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const i=Math.max(1,Math.ceil(n/2));return Math.min(t,e+i)}function z(e,t,n,i){if(t<i)return"empty";const s=L(e,t);return s?.kind==="done"||s?.kind==="set"?"done":s?.kind==="skip"?"skip":C(e,t,"miss")?"miss":t>=n?"empty":"miss"}function De(e,t,n="1970-01-01"){let i=0,s=t;for(let r=0;r<400;r+=1){const o=z(e,s,t,n);if(o==="done")i+=1;else if(o==="skip"||o==="empty"&&s===t){s=_(s,-1);continue}else break;s=_(s,-1)}return i}function Oe(e,t,n){const i=Q(t),s=!n||n<i?i:n;let r=0,o=0;for(const c of X(s,t)){const p=z(e,c,t,n??s);p==="skip"||p==="empty"||(o+=1,p==="done"&&(r+=1))}return{hits:r,eligible:o}}function Ae(e,t,n="1970-01-01",i=3){const s=_(t,-1);if(s<n)return!1;const r=_(t,-i),o=n>r?n:r;return X(o,s).some(c=>z(e,c,t,n)==="miss")}function Te(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function Ne(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${F(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${F(e.milestone)}.`}function F(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function Me(e,t,n){return t.filter(s=>s.kind==="set"&&s.date<=n).sort(T).at(-1)?.value??e}function je(e,t,n,i){const s=ee(e.a,n),r=Ee(n,i),o=Le(n,i),c=ne(n,i),p=ie(n,i),I=se(n,i),B=te(n,i),k=Ie(r,o),D=s>=t.milestone,M=s>=e.b,P=Ae(n,i,t.started_on),ce=Q(i),ue=Me(e.a,n,_(ce,-1)),fe=Te({current:s,weekStartCurrent:ue,gearDown:k,stalled:P,milestoneHit:D});return{current:s,sleep:r,energy:o,doneToday:c,plusToday:p,setLoggedToday:I,skipToday:B,gearDown:k,milestoneHit:D,atB:M,trend:fe,hitrate:Oe(n,i,t.started_on),streak:De(n,i,t.started_on),nextAction:Ne({milestone:t.milestone,b:e.b,gearDown:k,milestoneHit:D,atB:M,stalled:P,doneToday:c,plusToday:p,skipToday:B}),suggestedMilestone:D&&!M&&!k?Be(t.milestone,e.b):null}}function N(e){return e.a!==null&&e.b!==null&&e.milestone!==null}function Ce(e,t){if(e.type==="weekly"){const n=e.weekdays??[];return n.length===0?!1:n.includes(he(t))}return!0}function ze(e,t){return e.filter(n=>Ce(n,t)).sort((n,i)=>n.sort-i.sort)}function W(e){return e.find(N)}function j(e){return e.kind==="body_sleep"||e.kind==="body_energy"||e.kind==="body_weight"}function re(e,t,n){return e.filter(i=>j(i)?!1:!!(i.item_id===t.id||i.item_id===null&&n&&t.id===n))}function We(e,t){return t?[...e.filter(j),...re(e,t,t.id)]:e.filter(j)}function He(e){return e.a===null?null:e.unit==="sec"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} s`:e.unit==="reps"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} reps`:String(e.a)}const Pe=["geen tijd","geen energie","vergeten","geen zin","pijn"],d={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},ae="routine_loop_v5",K="routine_local_user_id",q="routine_local_tenant_id",Re="routine_local_chosen";function oe(e,t){return{id:e,tenant_id:t,display_name:null,...J()}}function le(e,t,n=m()){return{id:h(),tenant_id:t,vector_id:e,milestone:d.milestone,started_on:n,deadline:_(n,d.windowDays),status:"active",stage_type:d.stageType}}function Fe(e){const t=n=>({id:h(),tenant_id:e,...n});return[t({type:"daily",label:"Push-ups",unit:"reps",a:d.a,b:d.b,milestone:d.milestone,weekdays:null,times_per_week:null,sort:0}),t({type:"daily",label:"Squats",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:1}),t({type:"daily",label:"Plank",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:2}),t({type:"daily",label:"Dead hang",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:3}),t({type:"weekly",label:"Gerichte kracht",unit:null,a:null,b:null,milestone:null,weekdays:[],times_per_week:2,sort:4}),t({type:"leefregel",label:"Koud douchen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:5}),t({type:"leefregel",label:"Niet snoepen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:6}),t({type:"leefregel",label:"Low carb",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:7}),t({type:"leefregel",label:"Intermittent fasting",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:8})]}function Ke(e,t){return{id:e.id,tenant_id:e.tenant_id,user_id:t,domain:d.domain,a:e.a??d.a,b:e.b??d.b,unit:e.unit==="sec"?"sec":"reps",pace_constraint:null}}function qe(e,t=m(),n=h()){const i=oe(e,n),s=Fe(n),r=W(s)??s[0],o=Ke(r,e),c=le(o.id,n,t);return r.milestone!==null&&(c.milestone=r.milestone),{profile:i,items:s,vector:o,stage:c,events:[],rotated:!1}}function Ge(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,items:e.items.map(n=>N(n)?{...n,a:d.a,b:d.b,milestone:d.milestone,unit:d.unit}:n),vector:{...e.vector,a:d.a,b:d.b,unit:d.unit},stage:{...e.stage,milestone:d.milestone},events:e.events.filter(n=>n.kind!=="set"&&n.kind!=="done")}:e}function Ue(){const e=localStorage.getItem(K);if(e)return e;const t=h();return localStorage.setItem(K,t),t}function Ye(){const e=localStorage.getItem(q);if(e)return e;const t=h();return localStorage.setItem(q,t),t}function S(e){localStorage.setItem(ae,JSON.stringify(e))}function Ve(e,t,n){return{...e,profile:{...oe(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...J(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null},items:(e.items??[]).map(i=>({...i,tenant_id:i.tenant_id??n,weekdays:i.weekdays??null,times_per_week:i.times_per_week??null})),vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(i=>({...i,tenant_id:i.tenant_id??n,item_id:i.item_id??null})),rotated:!!e.rotated}}function $(e,t){const n=localStorage.getItem(ae);if(!n){const i=qe(e,m(),t);return S(i),i}return Ge(Ve(JSON.parse(n),e,t))}function Je(){localStorage.setItem(Re,"1");const e=Ue(),t=Ye();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return $(e,t)},async addEvent(n){const i=$(e,t),s={id:n.id??h(),tenant_id:t,user_id:e,item_id:n.item_id??null,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:$e()};return i.events.push(s),S(i),s},async saveProfile(n){const i=$(e,t);i.profile=n,S(i)},async saveVectorConstraint(n,i){const s=$(e,t);s.vector.id===n&&(s.vector.pace_constraint=i,S(s))},async advanceStage(n,i){const s=$(e,t),r=le(n.vector_id,t);return r.milestone=i,s.stage=r,s.items=s.items.map(o=>o.id===n.vector_id?{...o,milestone:i}:o),s.rotated=!0,S(s),r},async signOut(){}}}const G="#F0ECE4",Ze="#3D6B5A";function Qe(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${G}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${G}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${Ze}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function f(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function Xe(e){return e==="stokt"||e==="herstel"?"ember":e==="stijgt"?"sage":"fog"}function U(e){const t=Xe(e);return e==="stokt"||e==="herstel"||e==="zakt"?f("status-kink",`ico-${t}`):e==="stijgt"?f("status-up",`ico-${t}`):f("status-flat",`ico-${t}`)}function et(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${f(n?"dot-now":"dot")}</button>`}).join("")}const tt=`
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
</svg>`;function nt(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",tt)}const Y=()=>document.querySelector("#app"),l={screen:"vandaag",skipItemId:null,advanceWarn:!1,busy:!1,error:null};let g=null,a=null;function de(){if(!a)throw new Error("geen snapshot");const e=W(a.items);return je(a.vector,a.stage,We(a.events,e),m())}function A(e){if(!a)throw new Error("geen snapshot");const t=m(),n=W(a.items),i=re(a.events,e,n?.id),s=e.a===null?null:ee(e.a,i);return{done:ne(i,t),plus:ie(i,t),skip:te(i,t),logged:se(i,t),current:s}}function u(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function w(){if(!a||!g)return;const e=de(),{vector:t,stage:n}=a,i=g.mode==="local"?"Lokaal":"Supabase",s=`
    <div class="hdr">
      <div>
        ${Qe()}
        <div class="date-s">${we(m())}</div>
      </div>
      <div class="mode-pill">${i}</div>
    </div>`,r=`
    <nav class="nav">
      <button data-nav="vandaag" class="${l.screen==="vandaag"?"active":""}">${f("day")}Vandaag</button>
      <button data-nav="koers" class="${l.screen==="koers"?"active":""}">${f("mark")}Koers</button>
    </nav>`;if(l.screen==="vandaag"){const o=ge(a.profile.identity_new,a.events),c=ze(a.items,m());Y().innerHTML=`
      ${s}
      ${g.mode==="local"?'<div class="banner">Lokaal — geen Supabase. +1 / Done / Skip blijven op dit apparaat.</div>':""}
      ${e.gearDown?'<div class="banner hot">Lijf vraagt tempo omlaag. Etappe gaat niet omhoog.</div>':""}
      <div class="sec-hd">Lijf</div>
      <div class="card split">
        <div class="row">
          <div>
            <div class="lbl lbl-ico">${f("moon")} Slaap</div>
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
          <div class="dots">${et(e.energy)}</div>
        </div>
      </div>
      <div class="sec-hd">Vandaag</div>
      ${c.map(p=>it(p,e,o)).join("")}
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${U(e.trend.word)}
          <div class="word">${e.trend.word}</div>
        </div>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${u(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="koers"){const o=e.hitrate.eligible===0?"—":`${e.hitrate.hits}/${e.hitrate.eligible}`;Y().innerHTML=`
      ${s}
      <div class="sec-hd">Strength · push-ups</div>
      <div class="card">
        <div class="kv">
          <div><div class="lbl">A</div><div class="val">${y(t.a)}</div></div>
          <div><div class="lbl">B</div><div class="val">${y(t.b)}</div></div>
          <div><div class="lbl">Nu</div><div class="val">${y(e.current)}</div></div>
          <div><div class="lbl">Etappe</div><div class="val">${y(n.milestone)}</div></div>
        </div>
      </div>
      <div class="card">
        <div class="kv">
          <div>
            <div class="lbl">Venster</div>
            <div class="val" style="font-size:1.15rem">${R(n.started_on)} → ${n.deadline?R(n.deadline):"—"}</div>
          </div>
          <div>
            <div class="lbl">Trend</div>
            <div class="val status">${U(e.trend.word)} ${e.trend.word}</div>
          </div>
          <div>
            <div class="lbl">Hitrate week</div>
            <div class="val">${o}</div>
          </div>
          <div>
            <div class="lbl">Rem</div>
            <div class="val" style="font-size:1.1rem">${u(t.pace_constraint||"—")}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="lbl">Volgende actie</div>
        <div class="action-line">${u(e.nextAction)}</div>
      </div>
      ${be(a.profile.horizon_1y,a.rotated)?'<div class="banner">Zet een 1-jaars B. Etappes roteren.</div>':""}
      <div class="sec-hd">${f("ik")} Ik</div>
      <div class="card">
        <div class="field">
          <div class="lbl">Leven dat ik weiger</div>
          <textarea data-id="identity_anti" maxlength="${v.identity_anti}">${u(a.profile.identity_anti??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wie ik word</div>
          <textarea data-id="identity_new" maxlength="${v.identity_new}">${u(a.profile.identity_new??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wat B niet mag schenden</div>
          <textarea data-id="identity_constraint" maxlength="${v.identity_constraint}">${u(a.profile.identity_constraint??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">1-jaars B</div>
          <textarea data-id="horizon_1y" maxlength="${v.horizon_1y}">${u(a.profile.horizon_1y??"")}</textarea>
        </div>
        <button class="btn primary" data-act="save-ik">Bewaar</button>
      </div>
      <div class="card stack">
        <button class="btn ghost ico-btn" data-act="export">${f("export")}<span>Exporteer JSON</span></button>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${u(l.error)}</p>`:""}
      ${r}`;return}}function it(e,t,n){const i=A(e),s=N(e),r=i.logged||!!i.skip,o=s&&i.current!==null&&e.b!==null&&i.current>=e.b,c=r||o,p=s,I=He(e),B=p&&t.suggestedMilestone&&e.id===a.vector.id;return`
      <div class="card">
        <div class="ex-nm">${u(e.label)}</div>
        ${s?`<div class="track">
          <span class="now">${y(i.current??e.a??0)}</span>
          <span>→</span>
          <span class="mid">${y(e.milestone??0)}</span>
          <span>→</span>
          <span class="end">${y(e.b??0)}</span>
        </div>`:I?`<div class="work">${u(I)}</div>`:""}
        <div class="actions ${s?"":"actions-two"}">
          ${s?`<button class="btn ico-btn ${i.plus?"on":""}" data-act="plus" data-item="${e.id}" ${c?"disabled":""}>${f("plus")}<span>+1</span></button>`:""}
          <button class="btn ico-btn ${i.done?"track":""}" data-act="done" data-item="${e.id}" ${r?"disabled":""}>${f("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${i.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${i.logged?"disabled":""}>${f("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||i.skip?`<div class="chips">${Pe.map(k=>`<button class="chip ${i.skip===k?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${k}">${k}</button>`).join("")}</div>`:""}
        ${B?`<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${y(t.suggestedMilestone)}.</div>
               ${l.advanceWarn&&a.profile.identity_constraint?`<div class="banner">Check: ${u(a.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${y(t.suggestedMilestone)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`:`<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${t.suggestedMilestone}">Volgende etappe ${y(t.suggestedMilestone)}</button>
                      </div>`}`:""}
        ${p&&n?`<div class="note">${u(n)}</div>`:""}
      </div>`}function y(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function H(e){if(!l.busy){l.busy=!0,l.error=null;try{await e()}catch(t){l.error=t instanceof Error?t.message:"Er ging iets mis"}finally{l.busy=!1,w()}}}async function st(e){g=e,a=await g.load(),l.screen="vandaag",w()}async function rt(){nt(),at(),await st(Je())}function at(){document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(n==="vandaag"||n==="koers"){l.screen=n,l.skipItemId=null,l.advanceWarn=!1,w();return}ot(t)})}async function ot(e){const t=e.dataset.act;if(!t||!g||!a)return;const n=de(),i=m();if(t==="sleep-inc"||t==="sleep-dec"){const s=n.sleep??7,r=Math.max(0,Math.min(14,s+(t==="sleep-inc"?.5:-.5)));await x({date:i,kind:"body_sleep",value:r,skip_reason:null,item_id:null});return}if(t==="energy"){const s=Number(e.dataset.n),r=n.energy===s?null:s;if(r===null)return;await x({date:i,kind:"body_energy",value:r,skip_reason:null,item_id:null});return}if(t==="plus"){const s=a.items.find(o=>o.id===e.dataset.item);if(!s||!N(s))return;const r=A(s);if(r.logged||r.skip||s.b!==null&&r.current!==null&&r.current>=s.b)return;await x({date:i,kind:"set",value:(r.current??s.a??0)+1,skip_reason:null,item_id:s.id});return}if(t==="done"){const s=a.items.find(o=>o.id===e.dataset.item);if(!s)return;const r=A(s);if(r.logged||r.skip)return;await x({date:i,kind:"done",value:r.current??s.a,skip_reason:null,item_id:s.id});return}if(t==="skip-open"){const s=e.dataset.item??null;l.skipItemId=l.skipItemId===s?null:s,w();return}if(t==="skip"){const s=a.items.find(c=>c.id===e.dataset.item);if(!s||A(s).logged)return;const o=e.dataset.reason;if(!o)return;await x({date:i,kind:"skip",value:null,skip_reason:o,item_id:s.id}),l.skipItemId=null;return}if(t==="advance"){if(!n.suggestedMilestone)return;if(ke(a.profile.identity_constraint)&&!l.advanceWarn){l.advanceWarn=!0,w();return}await V(n.suggestedMilestone);return}if(t==="advance-go"){if(!n.suggestedMilestone)return;await V(n.suggestedMilestone);return}if(t==="advance-cancel"){l.advanceWarn=!1,w();return}if(t==="save-ik"){const s={...a.profile,identity_anti:b(O("identity_anti"),v.identity_anti),identity_new:b(O("identity_new"),v.identity_new),identity_constraint:b(O("identity_constraint"),v.identity_constraint),horizon_1y:b(O("horizon_1y"),v.horizon_1y)};await H(async()=>{await g.saveProfile(s),a.profile=s});return}if(t==="export"){ve(a);return}}function O(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function V(e){await H(async()=>{a.stage=await g.advanceStage(a.stage,e),a.items=a.items.map(t=>t.id===a.stage.vector_id?{...t,milestone:e}:t),a.rotated=!0,l.advanceWarn=!1})}async function x(e){await H(async()=>{const t=await g.addEvent(e);a.events.push(t)})}rt();
