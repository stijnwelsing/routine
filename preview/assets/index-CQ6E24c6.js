(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();function ie(e){return JSON.stringify({exported_at:new Date().toISOString(),profile:e.profile,vector:e.vector,stage:e.stage,events:e.events},null,2)}function se(e){const t=new Blob([ie(e)],{type:"application/json"}),n=URL.createObjectURL(t),i=document.createElement("a");i.href=n,i.download=`routine-${e.profile.id.slice(0,8)}.json`,i.click(),URL.revokeObjectURL(n)}const ae="geen zin",c={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140};function k(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function oe(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===ae).length}function re(e,t){const n=k(e,c.identity_new);return!n||oe(t)<2?null:n}function le(e){return!!k(e,c.identity_constraint)}function de(e,t){return t&&!k(e,c.horizon_1y)}function G(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const U=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],ce=["zo","ma","di","wo","do","vr","za"];function m(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${i}`}function b(e,t){const n=B(e);return n.setDate(n.getDate()+t),m(n)}function B(e){const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)}function ue(e){const t=B(e);return`${ce[t.getDay()]} ${t.getDate()} ${U[t.getMonth()]}`}function I(e){const t=B(e);return`${t.getDate()} ${U[t.getMonth()]}`}function Y(e){const t=B(e),n=t.getDay(),i=n===0?-6:1-n;return t.setDate(t.getDate()+i),m(t)}function V(e,t){const n=[];let i=e;for(;i<=t;)n.push(i),i=b(i,1);return n}function h(){return crypto.randomUUID()}function ve(){return new Date().toISOString()}const fe=2,pe=6;function D(e,t){return e.created_at.localeCompare(t.created_at)}function N(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(D).at(-1)}function ye(e,t){return t.filter(i=>i.kind==="set").sort(D).at(-1)?.value??e}function ge(e,t){return N(e,t,"body_sleep")?.value??null}function me(e,t){return N(e,t,"body_energy")?.value??null}function L(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip")).sort(D).at(-1)}function ke(e,t){const n=L(e,t);return n?.kind==="skip"?n.skip_reason:null}function be(e,t){return L(e,t)?.kind==="done"}function _e(e,t){return L(e,t)?.kind==="set"}function we(e,t){const n=L(e,t);return n?.kind==="set"||n?.kind==="done"}function he(e,t){return e!==null&&e<pe||t!==null&&t<=fe}function $e(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const i=Math.max(1,Math.ceil(n/2));return Math.min(t,e+i)}function j(e,t,n,i){if(t<i)return"empty";const s=L(e,t);return s?.kind==="done"||s?.kind==="set"?"done":s?.kind==="skip"?"skip":N(e,t,"miss")?"miss":t>=n?"empty":"miss"}function xe(e,t,n="1970-01-01"){let i=0,s=t;for(let a=0;a<400;a+=1){const l=j(e,s,t,n);if(l==="done")i+=1;else if(l==="skip"||l==="empty"&&s===t){s=b(s,-1);continue}else break;s=b(s,-1)}return i}function Se(e,t,n){const i=Y(t),s=!n||n<i?i:n;let a=0,l=0;for(const p of V(s,t)){const g=j(e,p,t,n??s);g==="skip"||g==="empty"||(l+=1,g==="done"&&(a+=1))}return{hits:a,eligible:l}}function Le(e,t,n="1970-01-01",i=3){const s=b(t,-1);if(s<n)return!1;const a=b(t,-i),l=n>a?n:a;return V(l,s).some(p=>j(e,p,t,n)==="miss")}function Ee(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function Te(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${H(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${H(e.milestone)}.`}function H(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function Oe(e,t,n){return t.filter(s=>s.kind==="set"&&s.date<=n).sort(D).at(-1)?.value??e}function Be(e,t,n,i){const s=ye(e.a,n),a=ge(n,i),l=me(n,i),p=be(n,i),g=_e(n,i),A=we(n,i),_=ke(n,i),E=he(a,l),T=s>=t.milestone,M=s>=e.b,C=Le(n,i,t.started_on),ee=Y(i),te=Oe(e.a,n,b(ee,-1)),ne=Ee({current:s,weekStartCurrent:te,gearDown:E,stalled:C,milestoneHit:T});return{current:s,sleep:a,energy:l,doneToday:p,plusToday:g,setLoggedToday:A,skipToday:_,gearDown:E,milestoneHit:T,atB:M,trend:ne,hitrate:Se(n,i,t.started_on),streak:xe(n,i,t.started_on),nextAction:Te({milestone:t.milestone,b:e.b,gearDown:E,milestoneHit:T,atB:M,stalled:C,doneToday:p,plusToday:g,skipToday:_}),suggestedMilestone:T&&!M&&!E?$e(t.milestone,e.b):null}}const De=["geen tijd","geen energie","vergeten","geen zin","pijn"],u={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},J="routine_loop_v3",P="routine_local_user_id",R="routine_local_tenant_id",Ae="routine_local_chosen";function Z(e,t){return{id:e,tenant_id:t,display_name:null,...G()}}function Me(e,t){return{id:h(),tenant_id:t,user_id:e,domain:u.domain,a:u.a,b:u.b,unit:u.unit,pace_constraint:null}}function Q(e,t,n=m()){return{id:h(),tenant_id:t,vector_id:e,milestone:u.milestone,started_on:n,deadline:b(n,u.windowDays),status:"active",stage_type:u.stageType}}function Ne(e,t=m(),n=h()){const i=Z(e,n),s=Me(e,n),a=Q(s.id,n,t);return{profile:i,vector:s,stage:a,events:[],rotated:!1}}function je(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,vector:{...e.vector,a:u.a,b:u.b,unit:u.unit},stage:{...e.stage,milestone:u.milestone},events:e.events.filter(n=>n.kind!=="set"&&n.kind!=="done")}:e}function ze(){const e=localStorage.getItem(P);if(e)return e;const t=h();return localStorage.setItem(P,t),t}function Ce(){const e=localStorage.getItem(R);if(e)return e;const t=h();return localStorage.setItem(R,t),t}function S(e){localStorage.setItem(J,JSON.stringify(e))}function Ie(e,t,n){return{...e,profile:{...Z(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...G(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null},vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(i=>({...i,tenant_id:i.tenant_id??n})),rotated:!!e.rotated}}function $(e,t){const n=localStorage.getItem(J);if(!n){const i=Ne(e,m(),t);return S(i),i}return je(Ie(JSON.parse(n),e,t))}function He(){localStorage.setItem(Ae,"1");const e=ze(),t=Ce();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return $(e,t)},async addEvent(n){const i=$(e,t),s={id:n.id??h(),tenant_id:t,user_id:e,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:ve()};return i.events.push(s),S(i),s},async saveProfile(n){const i=$(e,t);i.profile=n,S(i)},async saveVectorConstraint(n,i){const s=$(e,t);s.vector.id===n&&(s.vector.pace_constraint=i,S(s))},async advanceStage(n,i){const s=$(e,t),a=Q(n.vector_id,t);return a.milestone=i,s.stage=a,s.rotated=!0,S(s),a},async signOut(){}}}const W="#F0ECE4",Pe="#3D6B5A";function Re(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${W}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${W}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${Pe}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function d(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function K(e){return e==="↑"?d("status-up","ico-sage"):e==="→"?d("status-flat","ico-fog"):d("status-kink","ico-ember")}function We(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${d(n?"dot-now":"dot")}</button>`}).join("")}const Ke=`
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
</svg>`;function qe(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",Ke)}const q=()=>document.querySelector("#app"),r={screen:"vandaag",skipOpen:!1,advanceWarn:!1,busy:!1,error:null};let y=null,o=null;function X(){if(!o)throw new Error("geen snapshot");return Be(o.vector,o.stage,o.events,m())}function v(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function w(){if(!o||!y)return;const e=X(),{vector:t,stage:n}=o,i=y.mode==="local"?"Lokaal":"Supabase",s=`
    <div class="hdr">
      <div>
        ${Re()}
        <div class="date-s">${ue(m())}</div>
      </div>
      <div class="mode-pill">${i}</div>
    </div>`,a=`
    <nav class="nav">
      <button data-nav="vandaag" class="${r.screen==="vandaag"?"active":""}">${d("day")}Vandaag</button>
      <button data-nav="koers" class="${r.screen==="koers"?"active":""}">${d("mark")}Koers</button>
    </nav>`;if(r.screen==="vandaag"){const l=re(o.profile.identity_new,o.events),p=e.setLoggedToday||!!e.skipToday,g=p||e.atB,A=p;q().innerHTML=`
      ${s}
      ${y.mode==="local"?'<div class="banner">Lokaal — geen Supabase. +1 / Done / Skip blijven op dit apparaat.</div>':""}
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
          <span class="now">${f(e.current)}</span>
          <span>→</span>
          <span class="mid">${f(n.milestone)}</span>
          <span>→</span>
          <span class="end">${f(t.b)}</span>
        </div>
        <div class="actions">
          <button class="btn ico-btn ${e.plusToday?"on":""}" data-act="plus" ${g?"disabled":""}>${d("plus")}<span>+1</span></button>
          <button class="btn ico-btn ${e.doneToday?"track":""}" data-act="done" ${A?"disabled":""}>${d("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${e.skipToday?"on":""}" data-act="skip-open" ${e.setLoggedToday?"disabled":""}>${d("skip")}<span>Skip</span></button>
        </div>
        ${r.skipOpen||e.skipToday?`<div class="chips">${De.map(_=>`<button class="chip ${e.skipToday===_?"on":""}" data-act="skip" data-reason="${_}">${_}</button>`).join("")}</div>`:""}
        ${e.suggestedMilestone?`<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${f(e.suggestedMilestone)}.</div>
               ${r.advanceWarn&&o.profile.identity_constraint?`<div class="banner">Check: ${v(o.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${f(e.suggestedMilestone)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`:`<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${e.suggestedMilestone}">Volgende etappe ${f(e.suggestedMilestone)}</button>
                      </div>`}`:""}
        ${l?`<div class="note">${v(l)}</div>`:""}
      </div>
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${K(e.trend.arrow)}
          <div class="word">${e.trend.word}</div>
        </div>
      </div>
      ${r.error?`<p class="error" style="padding:0 18px">${v(r.error)}</p>`:""}
      ${a}`;return}if(r.screen==="koers"){const l=e.hitrate.eligible===0?"—":`${e.hitrate.hits}/${e.hitrate.eligible}`;q().innerHTML=`
      ${s}
      <div class="sec-hd">Strength · push-ups</div>
      <div class="card">
        <div class="kv">
          <div><div class="lbl">A</div><div class="val">${f(t.a)}</div></div>
          <div><div class="lbl">B</div><div class="val">${f(t.b)}</div></div>
          <div><div class="lbl">Nu</div><div class="val">${f(e.current)}</div></div>
          <div><div class="lbl">Etappe</div><div class="val">${f(n.milestone)}</div></div>
        </div>
      </div>
      <div class="card">
        <div class="kv">
          <div>
            <div class="lbl">Venster</div>
            <div class="val" style="font-size:1.15rem">${I(n.started_on)} → ${n.deadline?I(n.deadline):"—"}</div>
          </div>
          <div>
            <div class="lbl">Trend</div>
            <div class="val status">${K(e.trend.arrow)} ${e.trend.word}</div>
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
      ${de(o.profile.horizon_1y,o.rotated)?'<div class="banner">Zet een 1-jaars B. Etappes roteren.</div>':""}
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
      ${a}`;return}}function f(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function z(e){if(!r.busy){r.busy=!0,r.error=null;try{await e()}catch(t){r.error=t instanceof Error?t.message:"Er ging iets mis"}finally{r.busy=!1,w()}}}async function Fe(e){y=e,o=await y.load(),r.screen="vandaag",w()}async function Ge(){qe(),Ue(),await Fe(He())}function Ue(){document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(n==="vandaag"||n==="koers"){r.screen=n,r.skipOpen=!1,r.advanceWarn=!1,w();return}Ye(t)})}async function Ye(e){const t=e.dataset.act;if(!t||!y||!o)return;const n=X(),i=m();if(t==="sleep-inc"||t==="sleep-dec"){const s=n.sleep??7,a=Math.max(0,Math.min(14,s+(t==="sleep-inc"?.5:-.5)));await x({date:i,kind:"body_sleep",value:a,skip_reason:null});return}if(t==="energy"){const s=Number(e.dataset.n),a=n.energy===s?null:s;if(a===null)return;await x({date:i,kind:"body_energy",value:a,skip_reason:null});return}if(t==="plus"){if(n.setLoggedToday||n.skipToday||n.atB)return;await x({date:i,kind:"set",value:n.current+1,skip_reason:null});return}if(t==="done"){if(n.setLoggedToday||n.skipToday)return;await x({date:i,kind:"done",value:n.current,skip_reason:null});return}if(t==="skip-open"){r.skipOpen=!r.skipOpen,w();return}if(t==="skip"){if(n.setLoggedToday)return;const s=e.dataset.reason;if(!s)return;await x({date:i,kind:"skip",value:null,skip_reason:s}),r.skipOpen=!1;return}if(t==="advance"){if(!n.suggestedMilestone)return;if(le(o.profile.identity_constraint)&&!r.advanceWarn){r.advanceWarn=!0,w();return}await F(n.suggestedMilestone);return}if(t==="advance-go"){if(!n.suggestedMilestone)return;await F(n.suggestedMilestone);return}if(t==="advance-cancel"){r.advanceWarn=!1,w();return}if(t==="save-ik"){const s={...o.profile,identity_anti:k(O("identity_anti"),c.identity_anti),identity_new:k(O("identity_new"),c.identity_new),identity_constraint:k(O("identity_constraint"),c.identity_constraint),horizon_1y:k(O("horizon_1y"),c.horizon_1y)};await z(async()=>{await y.saveProfile(s),o.profile=s});return}if(t==="export"){se(o);return}}function O(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function F(e){await z(async()=>{o.stage=await y.advanceStage(o.stage,e),o.rotated=!0,r.advanceWarn=!1})}async function x(e){await z(async()=>{const t=await y.addEvent(e);o.events.push(t)})}Ge();
