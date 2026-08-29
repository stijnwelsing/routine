(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();function ne(e){return JSON.stringify({exported_at:new Date().toISOString(),profile:e.profile,vector:e.vector,stage:e.stage,events:e.events},null,2)}function ie(e){const t=new Blob([ne(e)],{type:"application/json"}),n=URL.createObjectURL(t),i=document.createElement("a");i.href=n,i.download=`routine-${e.profile.id.slice(0,8)}.json`,i.click(),URL.revokeObjectURL(n)}const se="geen zin",c={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140};function k(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function ae(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===se).length}function oe(e,t){const n=k(e,c.identity_new);return!n||ae(t)<2?null:n}function re(e){return!!k(e,c.identity_constraint)}function le(e,t){return t&&!k(e,c.horizon_1y)}function F(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const G=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],de=["zo","ma","di","wo","do","vr","za"];function g(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${i}`}function w(e,t){const n=B(e);return n.setDate(n.getDate()+t),g(n)}function B(e){const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)}function ce(e){const t=B(e);return`${de[t.getDay()]} ${t.getDate()} ${G[t.getMonth()]}`}function C(e){const t=B(e);return`${t.getDate()} ${G[t.getMonth()]}`}function U(e){const t=B(e),n=t.getDay(),i=n===0?-6:1-n;return t.setDate(t.getDate()+i),g(t)}function ue(e,t){const n=[];let i=e;for(;i<=t;)n.push(i),i=w(i,1);return n}function h(){return crypto.randomUUID()}function ve(){return new Date().toISOString()}const pe=2,fe=6;function D(e,t){return e.created_at.localeCompare(t.created_at)}function N(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(D).at(-1)}function ye(e,t){return t.filter(i=>i.kind==="set").sort(D).at(-1)?.value??e}function ge(e,t){return N(e,t,"body_sleep")?.value??null}function me(e,t){return N(e,t,"body_energy")?.value??null}function L(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip")).sort(D).at(-1)}function ke(e,t){const n=L(e,t);return n?.kind==="skip"?n.skip_reason:null}function be(e,t){return L(e,t)?.kind==="done"}function _e(e,t){return L(e,t)?.kind==="set"}function we(e,t){const n=L(e,t);return n?.kind==="set"||n?.kind==="done"}function he(e,t){return e!==null&&e<fe||t!==null&&t<=pe}function $e(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const i=Math.max(1,Math.ceil(n/2));return Math.min(t,e+i)}function Y(e,t,n,i){if(t<i)return"empty";const s=L(e,t);return s?.kind==="done"||s?.kind==="set"?"done":s?.kind==="skip"?"skip":N(e,t,"miss")?"miss":t>=n?"empty":"miss"}function xe(e,t,n="1970-01-01"){let i=0,s=t;for(let a=0;a<400;a+=1){const l=Y(e,s,t,n);if(l==="done")i+=1;else if(l==="skip"||l==="empty"&&s===t){s=w(s,-1);continue}else break;s=w(s,-1)}return i}function Se(e,t,n){const i=U(t),s=!n||n<i?i:n;let a=0,l=0;for(const m of ue(s,t)){const y=Y(e,m,t,n??s);y==="skip"||y==="empty"||(l+=1,y==="done"&&(a+=1))}return{hits:a,eligible:l}}function Le(e,t,n=3){const i=w(t,-(n-1));return!e.some(s=>s.date>=i&&s.date<=t&&(s.kind==="set"||s.kind==="done"))}function Ee(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function Te(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${I(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${I(e.milestone)}.`}function I(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function Oe(e,t,n){return t.filter(s=>s.kind==="set"&&s.date<=n).sort(D).at(-1)?.value??e}function Be(e,t,n,i){const s=ye(e.a,n),a=ge(n,i),l=me(n,i),m=be(n,i),y=_e(n,i),A=we(n,i),b=ke(n,i),E=he(a,l),T=s>=t.milestone,M=s>=e.b,z=Le(n,i),X=U(i),ee=Oe(e.a,n,w(X,-1)),te=Ee({current:s,weekStartCurrent:ee,gearDown:E,stalled:z,milestoneHit:T});return{current:s,sleep:a,energy:l,doneToday:m,plusToday:y,setLoggedToday:A,skipToday:b,gearDown:E,milestoneHit:T,atB:M,trend:te,hitrate:Se(n,i,t.started_on),streak:xe(n,i,t.started_on),nextAction:Te({milestone:t.milestone,b:e.b,gearDown:E,milestoneHit:T,atB:M,stalled:z,doneToday:m,plusToday:y,skipToday:b}),suggestedMilestone:T&&!M&&!E?$e(t.milestone,e.b):null}}const De=["geen tijd","geen energie","vergeten","geen zin","pijn"],u={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},V="routine_loop_v3",H="routine_local_user_id",P="routine_local_tenant_id",Ae="routine_local_chosen";function J(e,t){return{id:e,tenant_id:t,display_name:null,...F()}}function Me(e,t){return{id:h(),tenant_id:t,user_id:e,domain:u.domain,a:u.a,b:u.b,unit:u.unit,pace_constraint:null}}function Z(e,t,n=g()){return{id:h(),tenant_id:t,vector_id:e,milestone:u.milestone,started_on:n,deadline:w(n,u.windowDays),status:"active",stage_type:u.stageType}}function Ne(e,t=g(),n=h()){const i=J(e,n),s=Me(e,n),a=Z(s.id,n,t);return{profile:i,vector:s,stage:a,events:[],rotated:!1}}function je(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,vector:{...e.vector,a:u.a,b:u.b,unit:u.unit},stage:{...e.stage,milestone:u.milestone},events:e.events.filter(n=>n.kind!=="set"&&n.kind!=="done")}:e}function ze(){const e=localStorage.getItem(H);if(e)return e;const t=h();return localStorage.setItem(H,t),t}function Ce(){const e=localStorage.getItem(P);if(e)return e;const t=h();return localStorage.setItem(P,t),t}function S(e){localStorage.setItem(V,JSON.stringify(e))}function Ie(e,t,n){return{...e,profile:{...J(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...F(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null},vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(i=>({...i,tenant_id:i.tenant_id??n})),rotated:!!e.rotated}}function $(e,t){const n=localStorage.getItem(V);if(!n){const i=Ne(e,g(),t);return S(i),i}return je(Ie(JSON.parse(n),e,t))}function He(){localStorage.setItem(Ae,"1");const e=ze(),t=Ce();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return $(e,t)},async addEvent(n){const i=$(e,t),s={id:n.id??h(),tenant_id:t,user_id:e,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:ve()};return i.events.push(s),S(i),s},async saveProfile(n){const i=$(e,t);i.profile=n,S(i)},async saveVectorConstraint(n,i){const s=$(e,t);s.vector.id===n&&(s.vector.pace_constraint=i,S(s))},async advanceStage(n,i){const s=$(e,t),a=Z(n.vector_id,t);return a.milestone=i,s.stage=a,s.rotated=!0,S(s),a},async signOut(){}}}const R="#F0ECE4",Pe="#3D6B5A";function Re(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${R}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${R}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${Pe}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function d(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function W(e){return e==="↑"?d("status-up","ico-sage"):e==="→"?d("status-flat","ico-fog"):d("status-kink","ico-ember")}function We(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${d(n?"dot-now":"dot")}</button>`}).join("")}const Ke=`
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
    <circle class="s" cx="12" cy="12" r="3.2" />
  </symbol>
  <symbol id="i-dot-now" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3.2" fill="currentColor" />
  </symbol>
</svg>`;function qe(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",Ke)}const K=()=>document.querySelector("#app"),r={screen:"vandaag",skipOpen:!1,advanceWarn:!1,busy:!1,error:null};let f=null,o=null;function Q(){if(!o)throw new Error("geen snapshot");return Be(o.vector,o.stage,o.events,g())}function v(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function _(){if(!o||!f)return;const e=Q(),{vector:t,stage:n}=o,i=f.mode==="local"?"Lokaal":"Supabase",s=`
    <div class="hdr">
      <div>
        ${Re()}
        <div class="date-s">${ce(g())}</div>
      </div>
      <div class="mode-pill">${i}</div>
    </div>`,a=`
    <nav class="nav">
      <button data-nav="vandaag" class="${r.screen==="vandaag"?"active":""}">${d("day")}Vandaag</button>
      <button data-nav="koers" class="${r.screen==="koers"?"active":""}">${d("mark")}Koers</button>
    </nav>`;if(r.screen==="vandaag"){const l=oe(o.profile.identity_new,o.events),m=e.setLoggedToday||!!e.skipToday,y=m||e.atB,A=m;K().innerHTML=`
      ${s}
      ${f.mode==="local"?'<div class="banner">Lokaal — geen Supabase. +1 / Done / Skip blijven op dit apparaat.</div>':""}
      ${e.gearDown?'<div class="banner hot">Lijf vraagt tempo omlaag. Etappe gaat niet omhoog.</div>':""}
      <div class="sec-hd">Lijf</div>
      <div class="card split">
        <div class="row">
          <div>
            <div class="lbl lbl-ico">${d("moon")} Slaap</div>
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
          <div class="dots">${We(e.energy)}</div>
        </div>
      </div>
      <div class="sec-hd">Etappe</div>
      <div class="card">
        <div class="ex-nm">Push-ups</div>
        <div class="track">
          <span class="now">${p(e.current)}</span>
          <span>→</span>
          <span class="mid">${p(n.milestone)}</span>
          <span>→</span>
          <span class="end">${p(t.b)}</span>
        </div>
        <div class="actions">
          <button class="btn ico-btn ${e.plusToday?"on":""}" data-act="plus" ${y?"disabled":""}>${d("plus")}<span>+1</span></button>
          <button class="btn ico-btn ${e.doneToday?"track":""}" data-act="done" ${A?"disabled":""}>${d("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${e.skipToday?"on":""}" data-act="skip-open" ${e.setLoggedToday?"disabled":""}>${d("skip")}<span>Skip</span></button>
        </div>
        ${r.skipOpen||e.skipToday?`<div class="chips">${De.map(b=>`<button class="chip ${e.skipToday===b?"on":""}" data-act="skip" data-reason="${b}">${b}</button>`).join("")}</div>`:""}
        ${e.suggestedMilestone?`<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${p(e.suggestedMilestone)}.</div>
               ${r.advanceWarn&&o.profile.identity_constraint?`<div class="banner">Check: ${v(o.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${p(e.suggestedMilestone)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`:`<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${e.suggestedMilestone}">Volgende etappe ${p(e.suggestedMilestone)}</button>
                      </div>`}`:""}
        ${l?`<div class="note">${v(l)}</div>`:""}
      </div>
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${W(e.trend.arrow)}
          <div class="word">${e.trend.word}</div>
        </div>
      </div>
      ${r.error?`<p class="error" style="padding:0 18px">${v(r.error)}</p>`:""}
      ${a}`;return}if(r.screen==="koers"){const l=e.hitrate.eligible===0?"—":`${e.hitrate.hits}/${e.hitrate.eligible}`;K().innerHTML=`
      ${s}
      <div class="sec-hd">Strength · push-ups</div>
      <div class="card">
        <div class="kv">
          <div><div class="lbl">A</div><div class="val">${p(t.a)}</div></div>
          <div><div class="lbl">B</div><div class="val">${p(t.b)}</div></div>
          <div><div class="lbl">Nu</div><div class="val">${p(e.current)}</div></div>
          <div><div class="lbl">Etappe</div><div class="val">${p(n.milestone)}</div></div>
        </div>
      </div>
      <div class="card">
        <div class="kv">
          <div>
            <div class="lbl">Venster</div>
            <div class="val" style="font-size:1.15rem">${C(n.started_on)} → ${n.deadline?C(n.deadline):"—"}</div>
          </div>
          <div>
            <div class="lbl">Trend</div>
            <div class="val status">${W(e.trend.arrow)} ${e.trend.word}</div>
          </div>
          <div>
            <div class="lbl">Hitrate week</div>
            <div class="val">${l}</div>
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
      ${le(o.profile.horizon_1y,o.rotated)?'<div class="banner">Zet een 1-jaars B. Etappes roteren.</div>':""}
      <div class="sec-hd">${d("ik")} Ik</div>
      <div class="card">
        <div class="field">
          <div class="lbl">Leven dat ik weiger</div>
          <textarea data-id="identity_anti" maxlength="${c.identity_anti}">${v(o.profile.identity_anti??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wie ik word</div>
          <textarea data-id="identity_new" maxlength="${c.identity_new}">${v(o.profile.identity_new??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wat B niet mag schenden</div>
          <textarea data-id="identity_constraint" maxlength="${c.identity_constraint}">${v(o.profile.identity_constraint??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">1-jaars B</div>
          <textarea data-id="horizon_1y" maxlength="${c.horizon_1y}">${v(o.profile.horizon_1y??"")}</textarea>
        </div>
        <button class="btn primary" data-act="save-ik">Bewaar</button>
      </div>
      <div class="card stack">
        <button class="btn ghost ico-btn" data-act="export">${d("export")}<span>Exporteer JSON</span></button>
      </div>
      ${r.error?`<p class="error" style="padding:0 18px">${v(r.error)}</p>`:""}
      ${a}`;return}}function p(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function j(e){if(!r.busy){r.busy=!0,r.error=null;try{await e()}catch(t){r.error=t instanceof Error?t.message:"Er ging iets mis"}finally{r.busy=!1,_()}}}async function Fe(e){f=e,o=await f.load(),r.screen="vandaag",_()}async function Ge(){qe(),Ue(),await Fe(He())}function Ue(){document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(n==="vandaag"||n==="koers"){r.screen=n,r.skipOpen=!1,r.advanceWarn=!1,_();return}Ye(t)})}async function Ye(e){const t=e.dataset.act;if(!t||!f||!o)return;const n=Q(),i=g();if(t==="sleep-inc"||t==="sleep-dec"){const s=n.sleep??7,a=Math.max(0,Math.min(14,s+(t==="sleep-inc"?.5:-.5)));await x({date:i,kind:"body_sleep",value:a,skip_reason:null});return}if(t==="energy"){const s=Number(e.dataset.n),a=n.energy===s?null:s;if(a===null)return;await x({date:i,kind:"body_energy",value:a,skip_reason:null});return}if(t==="plus"){if(n.setLoggedToday||n.skipToday||n.atB)return;await x({date:i,kind:"set",value:n.current+1,skip_reason:null});return}if(t==="done"){if(n.setLoggedToday||n.skipToday)return;await x({date:i,kind:"done",value:n.current,skip_reason:null});return}if(t==="skip-open"){r.skipOpen=!r.skipOpen,_();return}if(t==="skip"){if(n.setLoggedToday)return;const s=e.dataset.reason;if(!s)return;await x({date:i,kind:"skip",value:null,skip_reason:s}),r.skipOpen=!1;return}if(t==="advance"){if(!n.suggestedMilestone)return;if(re(o.profile.identity_constraint)&&!r.advanceWarn){r.advanceWarn=!0,_();return}await q(n.suggestedMilestone);return}if(t==="advance-go"){if(!n.suggestedMilestone)return;await q(n.suggestedMilestone);return}if(t==="advance-cancel"){r.advanceWarn=!1,_();return}if(t==="save-ik"){const s={...o.profile,identity_anti:k(O("identity_anti"),c.identity_anti),identity_new:k(O("identity_new"),c.identity_new),identity_constraint:k(O("identity_constraint"),c.identity_constraint),horizon_1y:k(O("horizon_1y"),c.horizon_1y)};await j(async()=>{await f.saveProfile(s),o.profile=s});return}if(t==="export"){ie(o);return}}function O(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function q(e){await j(async()=>{o.stage=await f.advanceStage(o.stage,e),o.rotated=!0,r.advanceWarn=!1})}async function x(e){await j(async()=>{const t=await f.addEvent(e);o.events.push(t)})}Ge();
