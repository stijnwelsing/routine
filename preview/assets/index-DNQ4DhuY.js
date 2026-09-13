(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();const le=["geen tijd","geen energie","vergeten","geen zin","pijn"];function qe(e){return!!(e&&le.includes(e))}const on=["guideline","evidence-informed","public-framework","user preference","hypothesis"],ln=["vandaag","koers","voortgang","profiel"];function dn(e){return!!(e&&ln.includes(e))}const w={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},de="routine_loop_v6",lt=["routine_loop_v5","routine_loop_v4","routine_loop_v3"],He="routine_local_user_id",Fe="routine_local_tenant_id",cn="routine_local_chosen";function un(e){return JSON.stringify({exported_at:new Date().toISOString(),key:de,profile:e.profile,items:e.items,vector:e.vector,stage:e.stage,events:e.events,rotated:e.rotated,onboarded:e.onboarded,theme_step:e.theme_step},null,2)}function fn(e){const t=new Blob([un(e)],{type:"application/json"}),n=URL.createObjectURL(t),i=document.createElement("a");i.href=n,i.download=`routine-${e.profile.id.slice(0,8)}.json`,i.click(),URL.revokeObjectURL(n)}const dt=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],ct=["zo","ma","di","wo","do","vr","za"];function k(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${i}`}function B(e,t){const n=D(e);return n.setDate(n.getDate()+t),k(n)}function D(e){const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)}function mn(e){const t=D(e);return`${ct[t.getDay()]} ${t.getDate()} ${dt[t.getMonth()]}`}function z(e){const t=D(e);return`${t.getDate()} ${dt[t.getMonth()]}`}function pn(e){return ct[D(e).getDay()]}function vn(e){const t=D(e).getDay();return t===0?7:t}function be(e){const t=D(e),n=t.getDay(),i=n===0?-6:1-n;return t.setDate(t.getDate()+i),k(t)}function he(e,t){const n=[];let i=e;for(;i<=t;)n.push(i),i=B(i,1);return n}function P(){return crypto.randomUUID()}function gn(){return new Date().toISOString()}function yn(e){return e.trim().toLowerCase().normalize("NFC")}function bn(e){return!!(e&&on.includes(e))}function hn(e){const t=yn(e);return t==="cafeïne 90 min na opstaan"?"public-framework":t==="wandelen na eten"?"evidence-informed":t==="low carb"||t==="scherm uit 22:00"||t==="korte rust"?"user preference":t==="vitamine d"?"guideline":t==="koud douchen"?"hypothesis":null}function ke(e){return hn(e.label)??(bn(e.template)?e.template:null)}function ut(e){return ke(e)!==null}function ne(){return{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:null,condition:null}}function kn(e){return{mode:e?.mode??null,clock:e?.clock??null,anchor:e?.anchor??null,offset_min:e?.offset_min??null,window_min:e?.window_min??null,frequency:e?.frequency??null,condition:e?.condition??null}}function ft(e){return e.trim().toLowerCase().normalize("NFC")}function wn(e){return ft(e)==="korte rust"?{mode:"clock",clock:"08:00",window_min:840,frequency:"daily",condition:"body"}:null}function $n(e,t){const n=wn(t);return n?{...e,...n}:e}function mt(e){return{now:e.now??new Date,today:e.today,wakeAt:e.wakeAt??null,mealAt:e.mealAt??null,sleepSet:!!e.sleepSet,energySet:!!e.energySet}}function we(e){const t=e?.trim().toLowerCase();return t==="body"||t==="energy|sleep"?"body":t==="energy"?"energy":t==="sleep"?"sleep":null}function _n(e,t){const n=we(e.condition);if(!n)return!0;const i=!!t.sleepSet,s=!!t.energySet;return n==="energy"?s:n==="sleep"?i:i||s}function pt(e,t){const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(!n)return null;const i=Number(n[1]),s=Number(n[2]);if(i>23||s>59)return null;const a=D(e);return a.setHours(i,s,0,0),a}function xn(e,t){return e==="wake"?t.wakeAt:e==="meal"?t.mealAt:null}function Sn(e,t){if(e.mode==="clock"&&e.clock)return pt(t.today,e.clock);if(e.mode==="relative"&&e.anchor&&e.offset_min!==null){const n=xn(e.anchor,t);return n?new Date(n.getTime()+e.offset_min*6e4):null}return null}function vt(e,t){return!t||e.window_min===null?null:new Date(t.getTime()+e.window_min*6e4)}function gt(e,t){if(e.timing.frequency==="weekly"||e.type==="weekly"){const i=e.weekdays??[];return i.length===0?!1:i.includes(vn(t))}return!0}function W(e){return _e(e)==="constraint"}function $e(e){return _e(e)==="preference"}function yt(e){return!W(e)&&!$e(e)}function In(e,t){if(W(e))return"silent";if(!gt(e,t.today)||!_n(e.timing,t))return"hidden";const n=e.timing;if(!n.mode)return"due";const i=Sn(n,t);if(n.mode==="relative"&&!i)return"due";if(i&&t.now<i)return"wait";const s=vt(n,i);return s&&t.now>s?"closed":"due"}function ie(e,t){const n=In(e,t);return!(n==="hidden"||n==="closed"||n==="wait"&&e.timing.window_min!==null)}function Ve(e){return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`}function Ln(e){if(e.window_min===null)return null;if(e.mode==="clock"&&e.clock){const t=pt("2000-01-01",e.clock);if(!t)return null;const n=vt(e,t);return n?`${Ve(t)}–${Ve(n)}`:null}return`${e.window_min} min`}function En(e){const t=we(e.condition);return t==="body"?"na slaap of energie":t==="energy"?"na energie":t==="sleep"?"na slaap":null}function ce(e){const t=e.timing;return we(t.condition)?null:t.condition?t.condition:t.mode==="relative"&&t.anchor==="wake"&&t.offset_min!==null?`${t.offset_min} min na opstaan`:t.mode==="relative"&&t.anchor==="meal"?"na eten":t.mode==="clock"&&t.clock?t.clock:null}function _e(e){if(e.role)return e.role;const t=ft(e.label);return t==="low carb"?"preference":t==="cafeïne 90 min na opstaan"||t==="scherm uit 22:00"?"constraint":null}const xe=["gedrag","regel","medicijn","supplement","sociaal"],Se={gedrag:"gedrag",regel:"leefregel",medicijn:"medicijn",supplement:"supplement",sociaal:"sociaal"},Ie={gedrag:"Gedrag",regel:"Regel",medicijn:"Medicijn",supplement:"Supplement",sociaal:"Sociaal"},Le=40,Ee=40;function Ue(e){return!!(e&&xe.includes(e))}function Q(e){return e.a!==null&&e.b!==null&&e.milestone!==null}function Tn(e,t){return gt(e,t)}function jn(e,t){return{...e,tenant_id:e.tenant_id??t,weekdays:e.weekdays??null,times_per_week:e.times_per_week??null,timing:$n(kn(e.timing),e.label),role:_e(e),template:ke(e),later:!!e.later,removed:!!e.removed}}function Te(e){return e.type==="medicijn"||e.type==="supplement"}function bt(e){return e.type==="sociaal"}function ht(e,t){return V(e,t).filter(n=>yt(n)&&!Te(n)&&!bt(n)&&!n.later)}function An(e,t){return V(e,t).filter(n=>$e(n)&&!n.later)}function Mn(e,t){return V(e,t).filter(n=>W(n)&&!n.later)}function kt(e,t){return V(e,t).filter(n=>Te(n)&&!n.later)}function wt(e,t){return V(e,t).filter(n=>bt(n)&&!n.later)}function Bn(e,t){return V(e,t).filter(n=>n.later&&(yt(n)||W(n)))}function V(e,t){return e.filter(n=>!n.removed&&Tn(n,t)).sort((n,i)=>n.sort-i.sort)}function U(e){return e.find(Q)}function me(e){return e.kind==="body_sleep"||e.kind==="body_energy"||e.kind==="body_weight"}function Y(e,t,n){return e.filter(i=>me(i)?!1:!!(i.item_id===t.id||i.item_id===null&&n&&t.id===n))}function Nn(e,t){return t?[...e.filter(me),...Y(e,t,t.id)]:e.filter(me)}function $t(e){return e.a===null?null:e.unit==="sec"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} s`:e.unit==="reps"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} reps`:String(e.a)}function E(e){return e.trim().toLowerCase()}function q(e){const t=e.trim().replace(/\s+/g," ").slice(0,Le);return t.length>0?t:null}function je(e){const t=e.trim().replace(/\s+/g," ").slice(0,Ee);if(!t)return ne();const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(n){const i=Number(n[1]),s=Number(n[2]);if(i<=23&&s<=59)return{...ne(),mode:"clock",clock:`${String(i).padStart(2,"0")}:${n[2]}`,frequency:"daily"}}return{...ne(),frequency:"daily",condition:t}}function Cn(e){return e.reduce((t,n)=>Math.max(t,n.sort),-1)+1}const Dn=["Push-ups","Squats","Plank","Dead hang","Gerichte kracht","Koud douchen","Niet snoepen","Low carb","Intermittent fasting","Geen alcohol","Cafeïne 90 min na opstaan","Wandelen na eten","Medicijn ochtend","Vitamine D","Bellen met iemand","Iemand zien","Scherm uit 22:00","Korte rust"];function ue(e){const t=E(e);return Dn.some(n=>E(n)===t)}function Ae(e){return ue(e.label)}function O(e){return!Ae(e)}function H(e){return!!e.removed}function On(e){return e.filter(t=>O(t)&&!H(t)).sort((t,n)=>t.sort-n.sort)}function _t(e){return e.type==="leefregel"?"regel":e.type==="medicijn"?"medicijn":e.type==="supplement"?"supplement":e.type==="sociaal"?"sociaal":"gedrag"}function xt(e){return e.timing.mode==="clock"&&e.timing.clock?e.timing.clock:e.timing.condition??""}function Kn(e,t){const n=q(t);return n?!e.some(i=>!H(i)&&E(i.label)===E(n)):!1}function Rn(e,t,n){const i=q(n);return!i||ue(i)?!1:!e.some(s=>s.id!==t&&!H(s)&&E(s.label)===E(i))}function Gn(e,t){const n=q(t);if(n)return e.find(i=>H(i)&&O(i)&&E(i.label)===E(n))}function zn(e){const t=q(e.label);return t?{id:P(),tenant_id:e.tenantId,type:Se[e.kind],label:t,unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:e.sort,timing:je(e.timing??""),role:"action",template:"user preference",later:!!e.later,removed:!1}:null}function Pn(e,t){if(!O(e)||H(e))return null;const n=q(t.label);return!n||ue(n)?null:{...e,type:Se[t.kind],label:n,timing:je(t.timing??""),template:"user preference"}}function Wn(e,t){if(!O(e)||!H(e))return null;const n=q(t.label);return!n||ue(n)?null:{...e,type:Se[t.kind],label:n,timing:je(t.timing??""),template:"user preference",later:!1,removed:!1}}function qn(e){return H(e)?{item:e,mode:"removed"}:O(e)?{item:{...e,removed:!0},mode:"removed"}:Ae(e)?{item:{...e,later:!0},mode:"parked"}:null}function Hn(e){const t=new Set,n=[];for(const i of e){const s=E(i.label);t.has(s)||(t.add(s),n.push(i))}return n}function Me(e,t,n){const i=Hn(e),s=new Set(i.map(r=>E(r.label))),a=t.filter(r=>!s.has(E(r.label))).map(r=>({...r,tenant_id:n}));return[...i,...a]}function St(e){const t=new Map;for(const n of e)for(const i of n)t.has(i.id)||t.set(i.id,i);return[...t.values()].sort((n,i)=>n.created_at.localeCompare(i.created_at))}function Fn(e){return e?!!(e.identity_anti||e.identity_new||e.identity_constraint||e.horizon_1y||e.display_name):!1}function Vn(e,t,n,i){if(e.length===0)return null;const s=e.reduce((f,y)=>(y.events?.length??0)>(f.events?.length??0)?y:f),a=e.find(f=>Fn(f.profile))?.profile??s.profile,r=Me([s,...e.filter(f=>f!==s)].flatMap(f=>f.items??[]),t,i),d=new Map(r.map(f=>[E(f.label),f.id])),c=new Map;for(const f of e)for(const y of f.items??[]){const b=d.get(E(y.label));b&&y.id!==b&&c.set(y.id,b)}const v=St(e.map(f=>f.events??[])).map(f=>{if(!f.item_id)return f;const y=c.get(f.item_id);return y?{...f,item_id:y}:f});return{...s,profile:{...a,id:a.id||n,tenant_id:a.tenant_id||i},items:r,events:v}}const se=3,Be=[{id:"kracht",label:"Kracht"},{id:"eten",label:"Eten & drinken"},{id:"slaap",label:"Slaap"},{id:"stofjes",label:"Stofjes"},{id:"bewegen",label:"Bewegen"}],Ne=["18–29","30–39","40–49","50–59","60+"],Un={kracht:["Push-ups","Squats","Plank","Dead hang"],eten:["Niet snoepen","Low carb","Intermittent fasting","Geen alcohol"],slaap:["Koud douchen"],stofjes:["Medicijn ochtend","Vitamine D"],bewegen:["Wandelen na eten"]};function Ce(e){return W(e)||e.type==="weekly"?!1:e.type==="daily"||e.type==="leefregel"||e.type==="gedrag"||e.type==="sociaal"||Te(e)}function Yn(e){return e.filter(t=>t.removed?!1:Ce(t)?!0:W(t)&&t.later).sort((t,n)=>t.sort-n.sort)}function It(e){return!(e.onboarded!==!1||(e.events??[]).length>0)}function Jn(e){return It(e)?e.profile.goals?.length?e.profile.age_band?e.theme_step!==!0?"themes":"start":"age":"goals":null}function Zn(e,t){const n=e.filter(Ce).sort((a,r)=>a.sort-r.sort);if(t.length===0)return n;const i=new Set(t.flatMap(a=>Un[a]??[])),s=n.filter(a=>i.has(a.label));return s.length>0?s:n}function Xn(e,t){const n=new Set(t.slice(0,se));return e.map(i=>Ce(i)?{...i,later:!n.has(i.id)}:{...i,later:!1})}function Qn(e,t){return e.includes(t)?e.filter(n=>n!==t):[...e,t]}function ei(e,t){return e.includes(t)?e.filter(n=>n!==t):e.length>=se?e:[...e,t]}function Lt(e){return Be.some(t=>t.id===e)}function Et(e){return Ne.includes(e)}const ti="geen zin",x={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140};function A(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function ni(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===ti).length}function ii(e,t){const n=A(e,x.identity_new);return!n||ni(t)<2?null:n}function ai(e){return!!A(e,x.identity_constraint)}function si(e,t){return t&&!A(e,x.horizon_1y)}function Tt(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const Ye=["Military calisthenics","Kickbox","Spinnen"],jt=40;function De(e){const t=e.trim().replace(/\s+/g," ").slice(0,jt);return t.length>0?t:null}function N(e){if(!Array.isArray(e))return[];const t=new Set,n=[];for(const i of e){if(typeof i!="string")continue;const s=De(i);if(!s)continue;const a=s.toLowerCase();t.has(a)||(t.add(a),n.push(s))}return n}function ri(e,t){const n=De(t);if(!n)return e;const i=n.toLowerCase();return e.some(s=>s.toLowerCase()===i)?e.filter(s=>s.toLowerCase()!==i):[...e,n]}function oi(e,t){const n=De(t);if(!n)return e;const i=n.toLowerCase();return e.some(s=>s.toLowerCase()===i)?e:[...e,n]}function li(e){const n=N(e).filter(i=>!Ye.some(s=>s.toLowerCase()===i.toLowerCase()));return[...Ye,...n]}function Je(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function At(e){const t=new Set(N(e).map(i=>i.toLowerCase()));return`<div class="chips">${li(e).map(i=>`<button class="chip pick ${t.has(i.toLowerCase())?"on":""}" data-act="theme-toggle" data-theme="${Je(i)}">${Je(i)}</button>`).join("")}</div>
        <div class="theme-add">
          <input data-id="theme-custom" type="text" maxlength="${jt}" placeholder="Eigen thema" autocomplete="off" enterkeyhint="done" />
          <button class="btn ghost" data-act="theme-add">Voeg toe</button>
        </div>`}const X="Ongeldig bestand. Geen Routine-export.";function re(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function di(e){return e==null||e===de?!0:lt.includes(String(e))}function ci(e){return re(e)&&typeof e.id=="string"&&e.id.length>0&&typeof e.label=="string"}function ui(e){return re(e)&&typeof e.id=="string"&&e.id.length>0&&typeof e.date=="string"&&typeof e.kind=="string"}function Ze(e){return e.trim().toLowerCase()}function Z(e,t){const n=e?.trim();if(n)return e??n;const i=t?.trim();return i?t??i:null}function fi(e,t){const n=[],i=new Set;for(const s of[e,t].flatMap(a=>Array.isArray(a)?a:[]))typeof s!="string"||!Lt(s)||i.has(s)||(i.add(s),n.push(s));return n}function mi(e,t,n){const i=new Map(t.map(a=>[Ze(a.label),a.id])),s=new Map;for(const a of n){const r=i.get(Ze(a.label));r&&a.id!==r&&s.set(a.id,r)}return e.map(a=>{if(!a.item_id)return a;const r=s.get(a.item_id);return r?{...a,item_id:r}:a})}function pi(e){let t;try{t=JSON.parse(e)}catch{throw new Error(X)}if(!re(t)||!di(t.key))throw new Error(X);if(!re(t.profile)||!Array.isArray(t.items)||!Array.isArray(t.events))throw new Error(X);if(!t.items.every(ci)||!t.events.every(ui))throw new Error(X);return{profile:t.profile,items:t.items,events:t.events,onboarded:typeof t.onboarded=="boolean"?t.onboarded:void 0,theme_step:typeof t.theme_step=="boolean"?t.theme_step:void 0}}function vi(e,t){return{...e,display_name:Z(e.display_name,t.display_name),identity_anti:A(Z(e.identity_anti,t.identity_anti),x.identity_anti),identity_new:A(Z(e.identity_new,t.identity_new),x.identity_new),identity_constraint:A(Z(e.identity_constraint,t.identity_constraint),x.identity_constraint),horizon_1y:A(Z(e.horizon_1y,t.horizon_1y),x.horizon_1y),age_band:e.age_band??(t.age_band&&Et(t.age_band)?t.age_band:null),goals:fi(e.goals,t.goals),themes:N([...e.themes??[],...t.themes??[]])}}function gi(e,t){const n=e.profile.tenant_id,i=Me(e.items,t.items,n),s=mi(t.events,i,t.items).map(a=>({...a,tenant_id:n,user_id:e.profile.id}));return{...e,profile:vi(e.profile,t.profile),items:i,events:St([e.events,s]),onboarded:!!(e.onboarded||t.onboarded),theme_step:!!(e.theme_step||t.theme_step)}}const yi=2,bi=6;function ee(e,t){return e.created_at.localeCompare(t.created_at)}function fe(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(ee).at(-1)}function Mt(e,t){return t.filter(i=>i.kind==="set").sort(ee).at(-1)?.value??e}function Oe(e,t){return fe(e,t,"body_sleep")?.value??null}function Ke(e,t){return fe(e,t,"body_energy")?.value??null}const Bt=40,Nt=250,hi=80;function ki(e,t){return fe(e,t,"body_weight")?.value??null}function wi(e){return e.filter(t=>t.kind==="body_weight"&&t.value!==null).sort(ee).at(-1)?.value??null}function $i(e,t,n){return Math.round(Math.max(Bt,Math.min(Nt,(e??t??hi)+n))*10)/10}function _i(e){const t=e.trim().replace(",",".");if(!t)return null;const n=Number(t);return Number.isFinite(n)?Math.round(Math.max(Bt,Math.min(Nt,n))*10)/10:null}function xi(e){return e==="set"||e==="done"||e==="skip"}function Ct(e,t){return e.date===t&&xi(e.kind)}function Re(e,t){return e.filter(n=>Ct(n,t)).sort(ee).at(-1)}function te(e,t){return Re(e,t)}function Dt(e,t){const n=te(e,t);return n?.kind==="skip"?n.skip_reason:null}function Ot(e,t){return te(e,t)?.kind==="done"}function Kt(e,t){return te(e,t)?.kind==="set"}function Rt(e,t){const n=te(e,t);return n?.kind==="set"||n?.kind==="done"}function Si(e,t){return e!==null&&e<bi||t!==null&&t<=yi}function Ii(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const i=Math.max(1,Math.ceil(n/2));return Math.min(t,e+i)}function oe(e,t,n,i){if(t<i)return"empty";const s=te(e,t);return s?.kind==="done"||s?.kind==="set"?"done":s?.kind==="skip"?"skip":fe(e,t,"miss")?"miss":t>=n?"empty":"miss"}function Li(e,t,n="1970-01-01"){let i=0,s=t;for(let a=0;a<400;a+=1){const r=oe(e,s,t,n);if(r==="done")i+=1;else if(r==="skip"||r==="empty"&&s===t){s=B(s,-1);continue}else break;s=B(s,-1)}return i}function Ei(e,t,n){const i=be(t),s=!n||n<i?i:n;let a=0,r=0;for(const d of he(s,t)){const c=oe(e,d,t,n??s);c==="skip"||c==="empty"||(r+=1,c==="done"&&(a+=1))}return{hits:a,eligible:r}}function Ti(e,t,n="1970-01-01",i=3){const s=oe(e,t,t,n);if(s==="done"||s==="skip")return!1;const a=B(t,-1);if(a<n)return!1;const r=B(t,-i),d=n>r?n:r;return he(d,a).some(c=>oe(e,c,t,n)==="miss")}function ji(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled&&!e.todayLogged?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function Ai(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${Xe(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${Xe(e.milestone)}.`}function Xe(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function Gt(e,t,n){return t.filter(s=>s.kind==="set"&&s.date<=n).sort(ee).at(-1)?.value??e}function Mi(e,t,n,i){const s=Mt(e.a,n),a=Oe(n,i),r=Ke(n,i),d=ki(n,i),c=Ot(n,i),v=Kt(n,i),f=Rt(n,i),y=Dt(n,i),b=Si(a,r),T=s>=t.milestone,K=s>=e.b,R=Ti(n,i,t.started_on),g=be(i),m=Gt(e.a,n,B(g,-1)),J=ji({current:s,weekStartCurrent:m,gearDown:b,stalled:R,milestoneHit:T,todayLogged:v||c||!!y});return{current:s,sleep:a,energy:r,weight:d,doneToday:c,plusToday:v,setLoggedToday:f,skipToday:y,gearDown:b,milestoneHit:T,atB:K,trend:J,hitrate:Ei(n,i,t.started_on),streak:Li(n,i,t.started_on),nextAction:Ai({milestone:t.milestone,b:e.b,gearDown:b,milestoneHit:T,atB:K,stalled:R,doneToday:c,plusToday:v,skipToday:y}),suggestedMilestone:T&&!K&&!b?Ii(t.milestone,e.b):null}}function Bi(e,t,n,i){return Y(e,t,n).some(s=>(s.kind==="set"||s.kind==="done"||s.kind==="skip"||s.kind==="miss")&&s.date<i)}function zt(e,t){return e.created_at.localeCompare(t.created_at)}function Ni(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(zt).at(-1)}function Ci(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip"||n.kind==="miss")).sort(zt).at(-1)}function Di(e,t=[]){const n=D(e);return n.setHours(12,0,0,0),mt({today:e,now:n,sleepSet:Oe(t,e)!==null,energySet:Ke(t,e)!==null})}function pe(e,t,n=[]){const i=Di(t,n);return[...ht(e,t),...kt(e,t),...wt(e,t)].filter(s=>ie(s,i))}function ve(e,t,n,i,s){const a=Y(e,t,s),r=Ci(a,n);if(r?.kind==="set"||r?.kind==="done")return{item:t,date:n,mark:"hit",reason:null};if(r?.kind==="skip")return{item:t,date:n,mark:"skip",reason:r.skip_reason};const d=r?.kind==="miss"?r:Ni(a,n,"miss");return d?{item:t,date:n,mark:"miss",reason:d.skip_reason}:n>=i?{item:t,date:n,mark:"open",reason:null}:{item:t,date:n,mark:"idle",reason:null}}function Pt(e,t,n,i){const s=B(n,-1);return pe(e,s,t).filter(a=>Bi(t,a,i,s)).map(a=>{const r=ve(t,a,s,n,i);return r.mark==="hit"||r.mark==="skip"||r.mark==="miss"?r:{...r,mark:"miss",reason:null}}).filter(a=>a.mark==="miss"&&!a.reason)}function Oi(e,t,n){return e.some(i=>i.mark==="hit")?"hit":e.some(i=>i.mark==="miss")?"miss":e.some(i=>i.mark==="skip")?"skip":t===n?"open":"idle"}function Wt(e,t,n,i){const s=be(n),a=B(s,6),r=Pt(e,t,n,i),d=new Set(r.map(g=>`${g.item.id}:${g.date}`)),c=he(s,a).map(g=>{const m=pe(e,g,t).map(S=>{const J=ve(t,S,g,n,i);return d.has(`${S.id}:${g}`)?{...J,mark:"miss",reason:J.reason}:J});return{date:g,label:pn(g),mark:Oi(m,g,n),hits:m.filter(S=>S.mark==="hit").length,misses:m.filter(S=>S.mark==="miss").length,skips:m.filter(S=>S.mark==="skip").length}}),v=c.filter(g=>g.date<n),f=v.reduce((g,m)=>g+m.hits,0),y=v.reduce((g,m)=>g+m.misses,0),b=v.reduce((g,m)=>g+m.skips,0),T=v.flatMap(g=>pe(e,g.date,t).map(m=>{const S=ve(t,m,g.date,n,i);return d.has(`${m.id}:${g.date}`)?{...S,mark:"miss",reason:S.reason}:S}).filter(m=>m.mark==="miss")),K=v.filter(g=>g.mark!=="idle").length,R=f>0&&y===0&&K>=2?"Week staat.":null;return{start:s,end:a,range:`${z(s)} – ${z(a)}`,days:c,hits:f,misses:y,skips:b,missRows:T,note:R}}function ae(e){return U(e)?.id}function Qe(e,t){return e.created_at.localeCompare(t.created_at)}function Ki(e,t){const n=new Map;for(const i of[...e].sort(Qe))i.kind!=="body_weight"||i.value===null||i.date>t||n.set(i.date,i);return[...n.values()].sort((i,s)=>i.date.localeCompare(s.date)||Qe(i,s)).map(i=>({date:i.date,kg:i.value}))}function Ri(e,t,n,i,s){const a=Wt(e,t,n,s??ae(e)),r=a.days.map(d=>({date:d.date,label:d.label,current:Gt(i,t,d.date<=n?d.date:n),mark:d.mark}));return{week:a,line:r,weight:Ki(t,n),hits:a.hits,skips:a.skips,misses:a.misses}}function qt(e,t,n,i=18,s=16){if(e.length===0)return[];const a=Math.min(...e),d=Math.max(...e)-a,c=t-i*2,v=n-s*2;return e.map((f,y)=>{const b=e.length===1?t/2:i+y/(e.length-1)*c,T=d===0?n/2:s+(1-(f-a)/d)*v;return{x:b,y:T}})}function Ht(e){return e.map(t=>`${t.x.toFixed(1)},${t.y.toFixed(1)}`).join(" ")}function Gi(e){return e.skip?null:e.plus?{text:"Set gedaan.",tone:"fog"}:e.done?e.type==="medicijn"?{text:"Genomen.",tone:"sage"}:e.track?{text:"Set staat.",tone:"sage"}:{text:"Staat.",tone:"sage"}:null}function Ft(e,t){return{id:e,tenant_id:t,display_name:null,...Tt(),age_band:null,goals:[],themes:[]}}function Vt(e,t,n=k()){return{id:P(),tenant_id:t,vector_id:e,milestone:w.milestone,started_on:n,deadline:B(n,w.windowDays),status:"active",stage_type:w.stageType}}function Ge(e){const t=n=>({id:P(),tenant_id:e,timing:ne(),role:null,template:null,later:!1,...n});return[t({type:"daily",label:"Push-ups",unit:"reps",a:w.a,b:w.b,milestone:w.milestone,weekdays:null,times_per_week:null,sort:0}),t({type:"daily",label:"Squats",unit:"reps",a:30,b:null,milestone:null,weekdays:null,times_per_week:null,sort:1}),t({type:"daily",label:"Plank",unit:"sec",a:60,b:null,milestone:null,weekdays:null,times_per_week:null,sort:2}),t({type:"daily",label:"Dead hang",unit:"sec",a:45,b:null,milestone:null,weekdays:null,times_per_week:null,sort:3}),t({type:"weekly",label:"Gerichte kracht",unit:null,a:null,b:null,milestone:null,weekdays:[],times_per_week:2,sort:4}),t({type:"leefregel",label:"Koud douchen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:5,template:"hypothesis"}),t({type:"leefregel",label:"Niet snoepen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:6}),t({type:"leefregel",label:"Low carb",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:7,role:"preference",template:"user preference"}),t({type:"leefregel",label:"Intermittent fasting",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:8}),t({type:"leefregel",label:"Geen alcohol",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:9}),t({type:"gedrag",label:"Cafeïne 90 min na opstaan",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:10,role:"constraint",template:"public-framework",timing:{mode:"relative",clock:null,anchor:"wake",offset_min:90,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Wandelen na eten",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:11,role:"action",template:"evidence-informed",timing:{mode:"relative",clock:null,anchor:"meal",offset_min:0,window_min:null,frequency:"daily",condition:"na eten"}}),t({type:"medicijn",label:"Medicijn ochtend",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:12,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"ochtend"}}),t({type:"supplement",label:"Vitamine D",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:13,role:"action",template:"guideline",timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Bellen met iemand",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:14,role:"action",template:null,timing:{mode:"clock",clock:"18:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Iemand zien",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:1,sort:15,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"deze week"}}),t({type:"gedrag",label:"Scherm uit 22:00",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:16,role:"constraint",template:"user preference",timing:{mode:"clock",clock:"22:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Korte rust",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:17,role:"action",template:"user preference",timing:{mode:"clock",clock:"08:00",anchor:null,offset_min:null,window_min:840,frequency:"daily",condition:"body"}})]}function zi(e,t){return{id:e.id,tenant_id:e.tenant_id,user_id:t,domain:w.domain,a:e.a??w.a,b:e.b??w.b,unit:e.unit==="sec"?"sec":"reps",pace_constraint:null}}function Pi(e,t=k(),n=P()){const i=Ft(e,n),s=Ge(n),a=U(s)??s[0],r=zi(a,e),d=Vt(r.id,n,t);return a.milestone!==null&&(d.milestone=a.milestone),{profile:i,items:s,vector:r,stage:d,events:[],rotated:!1,onboarded:!1,theme_step:!1}}function Ut(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,items:e.items.map(n=>Q(n)?{...n,a:w.a,b:w.b,milestone:w.milestone,unit:w.unit}:n),vector:{...e.vector,a:w.a,b:w.b,unit:w.unit},stage:{...e.stage,milestone:w.milestone},events:e.events}:e}function Wi(){const e=localStorage.getItem(He);if(e)return e;const t=P();return localStorage.setItem(He,t),t}function qi(){const e=localStorage.getItem(Fe);if(e)return e;const t=P();return localStorage.setItem(Fe,t),t}function _(e){localStorage.setItem(de,JSON.stringify(e))}function Hi(e){if(!e)return null;try{const t=JSON.parse(e);return!t||typeof t!="object"?null:t}catch{return null}}function Fi(){return[de,...lt].map(e=>Hi(localStorage.getItem(e))).filter(e=>e!==null)}function Yt(e,t,n){const i=Me(e.items??[],Ge(n),n).map(s=>jn(s,n));return{...e,profile:{...Ft(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...Tt(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null,age_band:e.profile?.age_band??null,goals:Array.isArray(e.profile?.goals)?e.profile.goals:[],themes:N(e.profile?.themes)},items:i,vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(s=>({...s,tenant_id:s.tenant_id??n,item_id:s.item_id??null})),rotated:!!e.rotated,onboarded:e.onboarded??!0,theme_step:e.theme_step??!1}}function I(e,t){const n=Fi();if(n.length===0){const a=Pi(e,k(),t);return _(a),a}const i=Vn(n,Ge(t),e,t)??n[0],s=Ut(Yt(i,e,t));return _(s),s}function Vi(){localStorage.setItem(cn,"1");const e=Wi(),t=qi();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return I(e,t)},async addEvent(n){const i=I(e,t),s={id:n.id??P(),tenant_id:t,user_id:e,item_id:n.item_id??null,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:gn()};return i.events.push(s),_(i),s},async removeEvent(n){const i=I(e,t),s=i.events.find(a=>a.id===n);if(s){if(!Ct(s,k()))throw new Error("alleen vandaag");i.events=i.events.filter(a=>a.id!==n),_(i)}},async saveProfile(n){const i=I(e,t);i.profile=n,_(i)},async saveOnboarding(n){const i=I(e,t);i.profile={...i.profile,goals:n.goals,age_band:n.age_band,themes:N(i.profile.themes)},i.items=Xn(i.items,n.startIds),i.onboarded=!0,i.theme_step=!0,_(i)},async saveThemes(n){const i=I(e,t);i.profile={...i.profile,themes:N(n)},i.theme_step=!0,_(i)},async setItemLater(n,i){const s=I(e,t);s.items=s.items.map(a=>a.id===n?{...a,later:i}:a),_(s)},async addItem(n){const i=I(e,t),s=Gn(i.items,n.label);if(s){const r=Wn(s,{label:n.label,kind:n.kind,timing:n.timing});if(!r)throw new Error("naam ontbreekt");return i.items=i.items.map(d=>d.id===r.id?r:d),_(i),r}const a=zn({tenantId:t,label:n.label,kind:n.kind,timing:n.timing,sort:Cn(i.items)});if(!a)throw new Error("naam ontbreekt");if(!Kn(i.items,a.label))throw new Error("item bestaat al");return i.items=[...i.items,a],_(i),a},async updateItem(n){const i=I(e,t),s=i.items.find(r=>r.id===n.id);if(!s)throw new Error("item ontbreekt");if(!q(n.label))throw new Error("naam ontbreekt");if(!Rn(i.items,s.id,n.label))throw new Error("item bestaat al");const a=Pn(s,n);if(!a)throw new Error("alleen eigen item");return i.items=i.items.map(r=>r.id===a.id?a:r),_(i),a},async removeItem(n){const i=I(e,t),s=i.items.find(r=>r.id===n);if(!s)throw new Error("item ontbreekt");const a=qn(s);if(!a)throw new Error("item blijft");return i.items=i.items.map(r=>r.id===a.item.id?a.item:r),_(i),a.item},async saveVectorConstraint(n,i){const s=I(e,t);s.vector.id===n&&(s.vector.pace_constraint=i,_(s))},async advanceStage(n,i){const s=I(e,t),a=Vt(n.vector_id,t);return a.milestone=i,s.stage=a,s.items=s.items.map(r=>r.id===n.vector_id?{...r,milestone:i}:r),s.rotated=!0,_(s),a},async importJson(n){const i=pi(n),s=I(e,t),a=Ut(Yt(gi(s,i),e,t));return _(a),a},async signOut(){}}}const et="#F0ECE4",Ui="#3D6B5A";function Jt(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${et}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${et}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${Ui}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function h(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function Yi(e){return e==="stokt"||e==="herstel"?"ember":e==="stijgt"?"sage":"fog"}function tt(e){const t=Yi(e);return e==="stokt"||e==="herstel"||e==="zakt"?h("status-kink",`ico-${t}`):e==="stijgt"?h("status-up",`ico-${t}`):h("status-flat",`ico-${t}`)}function Ji(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${h(n?"dot-now":"dot")}</button>`}).join("")}const Zi=`
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
  <symbol id="i-import" viewBox="0 0 24 24">
    <g class="s">
      <path d="M6 14 v5 h12 v-5" />
      <line x1="12" y1="5" x2="12" y2="16" />
      <polyline points="8 12 12 16 16 12" />
    </g>
  </symbol>
  <symbol id="i-ik" viewBox="0 0 24 24">
    <line class="s" x1="4" y1="12" x2="20" y2="12" />
  </symbol>
  <symbol id="i-line" viewBox="0 0 24 24">
    <polyline class="s" points="3 17 8 12 13 14 21 7" />
  </symbol>
  <symbol id="i-me" viewBox="0 0 24 24">
    <g class="s">
      <circle cx="12" cy="8" r="3" />
      <path d="M6 19 A6 6 0 0 1 18 19" />
    </g>
  </symbol>
  <symbol id="i-dot" viewBox="0 0 24 24">
    <circle class="s" cx="12" cy="12" r="7" />
  </symbol>
  <symbol id="i-dot-now" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="7" fill="currentColor" />
  </symbol>
</svg>`;function Xi(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",Zi)}const F=()=>document.querySelector("#app"),l={screen:"vandaag",skipItemId:null,missKey:null,detailItemId:null,advanceWarn:!1,busy:!1,error:null,startIds:[],addKind:"gedrag",addLabel:"",addTiming:"",editKind:"gedrag",editLabel:"",editTiming:"",removeAsk:!1,importPaste:""};let p=null,o=null;function ze(){if(!o)throw new Error("geen snapshot");const e=U(o.items);return Mi(o.vector,o.stage,Nn(o.events,e),k())}function G(e,t=k()){if(!o)throw new Error("geen snapshot");const n=U(o.items),i=Y(o.events,e,n?.id),s=e.a===null?null:Mt(e.a,i);return{done:Ot(i,t),plus:Kt(i,t),skip:Dt(i,t),logged:Rt(i,t),current:s}}function Zt(e,t){return`${e}:${t}`}function Qi(e=k()){const t=o?.events??[];return mt({today:e,now:new Date,sleepSet:Oe(t,e)!==null,energySet:Ke(t,e)!==null})}function u(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function $(){if(!o||!p)return;const e=Jn(o);if(e){F().innerHTML=pa(e);return}const t=ze(),{vector:n,stage:i}=o,s=p.mode==="local"?"Lokaal":"Supabase",a=`
    <div class="hdr">
      <div>
        ${Jt()}
        <div class="date-s">${mn(k())}</div>
      </div>
      <div class="mode-pill">${s}</div>
    </div>`,r=`
    <nav class="nav nav-4">
      <button data-nav="vandaag" class="${l.screen==="vandaag"?"active":""}">${h("day")}Vandaag</button>
      <button data-nav="koers" class="${l.screen==="koers"?"active":""}">${h("mark")}Koers</button>
      <button data-nav="voortgang" class="${l.screen==="voortgang"?"active":""}">${h("line")}Voortgang</button>
      <button data-nav="profiel" class="${l.screen==="profiel"?"active":""}">${h("me")}Profiel</button>
    </nav>`;if(l.detailItemId){const d=o.items.find(c=>c.id===l.detailItemId);if(d){F().innerHTML=`
      ${a}
      ${ga(d)}
      ${l.error?`<p class="error" style="padding:0 18px">${u(l.error)}</p>`:""}
      ${r}`;return}l.detailItemId=null}if(l.screen==="vandaag"){const d=ii(o.profile.identity_new,o.events),c=k(),v=Qi(c),f=ht(o.items,c).filter(m=>ie(m,v)),y=Mn(o.items,c),b=kt(o.items,c).filter(m=>ie(m,v)),T=wt(o.items,c).filter(m=>ie(m,v)),K=Bn(o.items,c),R=An(o.items,c),g=Pt(o.items,o.events,c,ae(o.items));F().innerHTML=`
      ${a}
      ${p.mode==="local"?'<div class="banner">Lokaal — geen Supabase. +1 / Done / Skip blijven op dit apparaat.</div>':""}
      ${t.gearDown?'<div class="banner hot">Lijf vraagt tempo omlaag. Etappe gaat niet omhoog.</div>':""}
      <div class="sec-hd">Lijf</div>
      <div class="card split">
        <div class="note" style="margin-top:0">Optioneel. Blokkeert de dag niet.</div>
        <div class="row">
          <div class="lbl lbl-ico">${h("moon")} Slaap</div>
          <div class="num-row">
            <button class="nb" data-act="sleep-dec" aria-label="Slaap omlaag">−</button>
            <div class="ndisp">${t.sleep===null?"—":t.sleep.toFixed(1)}</div>
            <button class="nb" data-act="sleep-inc" aria-label="Slaap omhoog">+</button>
          </div>
        </div>
        <div class="row">
          <div class="lbl">Gewicht</div>
          <div class="num-row">
            <button class="nb" data-act="weight-dec" aria-label="Gewicht omlaag">−</button>
            <div class="nwrap">
              <input
                class="ninp"
                data-id="weight"
                type="text"
                inputmode="decimal"
                enterkeyhint="done"
                aria-label="Gewicht in kilogram"
                placeholder="—"
                value="${t.weight===null?"":t.weight.toFixed(1)}"
              >
              <div class="nunit">kg</div>
            </div>
            <button class="nb" data-act="weight-inc" aria-label="Gewicht omhoog">+</button>
          </div>
        </div>
        <div>
          <div class="lbl">Energie</div>
          <div class="dots">${Ji(t.energy)}</div>
        </div>
      </div>
      ${R.length?`<div class="sec-hd">Dag</div>
      <div class="card quiet">
        <div class="day-tags">${R.map(m=>va(m)).join("")}</div>
      </div>`:""}
      ${y.length?`<div class="sec-hd">Regel</div>${y.map(m=>ha(m)).join("")}`:""}
      ${b.length?`<div class="sec-hd">Stofjes</div>${b.map(m=>nt(m)).join("")}`:""}
      ${T.length?`<div class="sec-hd">Sociaal</div>${T.map(m=>nt(m)).join("")}`:""}
      ${g.length?`<div class="sec-hd">Niet gedaan</div>
      <div class="card">
        <div class="note" style="margin-top:0">Geen +1, Done of Skip. Korte reden.</div>
        ${g.map(m=>Xt(m)).join("")}
      </div>`:""}
      <div class="sec-hd">Vandaag</div>
      ${f.map(m=>ka(m,t,d)).join("")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Niet in je start. Blijft bewaard.</div>
        ${K.map(m=>sa(m)).join("")}
        <button class="btn ghost later-add" data-nav="profiel">Eigen item</button>
      </div>
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${tt(t.trend.word)}
          <div class="word">${t.trend.word}</div>
        </div>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${u(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="koers"){F().innerHTML=`
      ${a}
      ${st(o.profile.themes,"Tik een suggestie of typ zelf. Geen vaste lijst. Later aan te passen.")}
      ${it(Wt(o.items,o.events,k(),ae(o.items)))}
      <div class="sec-hd">Strength · push-ups</div>
      <div class="card">
        <div class="kv">
          <div><div class="lbl">A</div><div class="val">${j(n.a)}</div></div>
          <div><div class="lbl">B</div><div class="val">${j(n.b)}</div></div>
          <div><div class="lbl">Nu</div><div class="val">${j(t.current)}</div></div>
          <div><div class="lbl">Etappe</div><div class="val">${j(i.milestone)}</div></div>
        </div>
      </div>
      <div class="card">
        <div class="kv">
          <div>
            <div class="lbl">Venster</div>
            <div class="val" style="font-size:1.15rem">${z(i.started_on)} → ${i.deadline?z(i.deadline):"—"}</div>
          </div>
          <div>
            <div class="lbl">Trend</div>
            <div class="val status">${tt(t.trend.word)} ${t.trend.word}</div>
          </div>
          <div>
            <div class="lbl">Rem</div>
            <div class="val" style="font-size:1.1rem">${u(n.pace_constraint||"—")}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="lbl">Volgende actie</div>
        <div class="action-line">${u(t.nextAction)}</div>
      </div>
      ${si(o.profile.horizon_1y,o.rotated)?'<div class="banner">Zet een 1-jaars B. Etappes roteren.</div>':""}
      <div class="sec-hd">${h("ik")} Ik</div>
      <div class="card">
        <div class="field">
          <div class="lbl">Leven dat ik weiger</div>
          <textarea data-id="identity_anti" maxlength="${x.identity_anti}">${u(o.profile.identity_anti??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wie ik word</div>
          <textarea data-id="identity_new" maxlength="${x.identity_new}">${u(o.profile.identity_new??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wat B niet mag schenden</div>
          <textarea data-id="identity_constraint" maxlength="${x.identity_constraint}">${u(o.profile.identity_constraint??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">1-jaars B</div>
          <textarea data-id="horizon_1y" maxlength="${x.horizon_1y}">${u(o.profile.horizon_1y??"")}</textarea>
        </div>
        <button class="btn primary" data-act="save-ik">Bewaar</button>
      </div>
      ${at()}
      ${l.error?`<p class="error" style="padding:0 18px">${u(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="voortgang"){const d=Ri(o.items,o.events,k(),o.vector.a,ae(o.items));F().innerHTML=`
      ${a}
      ${it(d.week)}
      <div class="sec-hd">Lijn</div>
      <div class="card">
        <div class="note" style="margin-top:0">Huidige deze week. Geen score.</div>
        ${ma(d.line.map(c=>c.current),k(),d.line)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Nu</div><div class="val">${j(t.current)}</div></div>
          <div><div class="lbl">Gedaan</div><div class="val">${d.hits}</div></div>
        </div>
      </div>
      ${fa(d.weight)}
      ${l.error?`<p class="error" style="padding:0 18px">${u(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="profiel"){const d=o.profile.goals??[],c=o.profile.age_band,v=Yn(o.items);F().innerHTML=`
      ${a}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="note" style="margin-top:0">Later aan te passen. Geen wipe.</div>
        <div class="chips">${Be.map(f=>`<button class="chip pick ${d.includes(f.id)?"on":""}" data-act="onboard-goal" data-goal="${f.id}">${f.label}</button>`).join("")}</div>
      </div>
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="note" style="margin-top:0">Alleen een band. Geen geboortedatum.</div>
        <div class="chips">${Ne.map(f=>`<button class="chip pick ${c===f?"on":""}" data-act="onboard-age" data-age="${f}">${f}</button>`).join("")}</div>
      </div>
      ${st(o.profile.themes,"Tik een suggestie of typ zelf. Later aan te passen.")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Parkeren of terughalen. Events blijven.</div>
        ${v.map(f=>ra(f)).join("")}
      </div>
      ${la(o.items)}
      ${da()}
      ${at()}
      ${l.error?`<p class="error" style="padding:0 18px">${u(l.error)}</p>`:""}
      ${r}`;return}}function ea(e){const t=G(e),n=Gi({plus:t.plus,done:t.done,skip:t.skip,type:e.type,track:Q(e)});return n?`<div class="confirm ${n.tone}" role="status">${u(n.text)}</div>`:""}function ta(e){if(!o)return"";const t=U(o.items);return Re(Y(o.events,e,t?.id),k())?`<button class="undo" type="button" data-act="undo" data-item="${e.id}">Ongedaan</button>`:""}function Pe(e){return`${ea(e)}${ta(e)}`}function nt(e){const t=G(e),n=t.logged||!!t.skip,i=e.type==="medicijn"?"Genomen":"Done",s=ce(e);return`
      <div class="card stof">
        ${We(e)}
        ${s?`<div class="note">${u(s)}</div>`:""}
        <div class="actions actions-two">
          <button class="btn ico-btn ${t.done?"track":""}" data-act="done" data-item="${e.id}" ${n?"disabled":""}>${h("done")}<span>${i}</span></button>
          <button class="btn ico-btn skip ${t.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${t.logged?"disabled":""}>${h("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||t.skip?`<div class="chips">${le.map(a=>`<button class="chip ${t.skip===a?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${a}">${a}</button>`).join("")}</div>`:""}
        ${Pe(e)}
      </div>`}function na(e,t,n,i){return`<div class="chips">${le.map(s=>`<button class="chip ${n===s?"on":""}" data-act="${i}" data-item="${e}" data-date="${t}" data-reason="${s}">${s}</button>`).join("")}</div>`}function Xt(e){const t=l.missKey===Zt(e.item.id,e.date)||!!e.reason;return`
      <div class="miss-row">
        <button class="miss-item" data-act="miss-open" data-item="${e.item.id}" data-date="${e.date}">
          <span class="ex-nm">${u(e.item.label)}</span>
          <span class="note">${e.reason?u(e.reason):z(e.date)}</span>
        </button>
        ${t?na(e.item.id,e.date,e.reason,"miss"):""}
      </div>`}function ia(e){const t=[];return e.hits&&t.push(`${e.hits} gedaan`),e.skips&&t.push(`${e.skips} overgeslagen`),e.misses&&t.push(`${e.misses} niet gedaan`),t.length===0?"Nog geen dagen deze week.":t.join(" · ")}function aa(e){return e==="skip"?"–":e==="miss"?"×":"·"}function it(e){return`
      <div class="sec-hd">Week</div>
      <div class="card">
        <div class="note" style="margin-top:0">${u(e.range)}</div>
        <div class="week-strip" aria-label="Weekoverzicht">
          ${e.days.map(t=>`<div class="week-day ${t.mark}${t.date===k()?" today":""}">
            <span class="week-lbl">${t.label}</span>
            <span class="week-mark">${aa(t.mark)}</span>
          </div>`).join("")}
        </div>
        <div class="note">${u(ia(e))}</div>
        ${e.note?`<div class="week-note">${u(e.note)}</div>`:""}
        ${e.missRows.length?e.missRows.map(t=>Xt(t)).join(""):""}
      </div>`}function Qt(e){return ut(e)||O(e)?`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>`:`<div class="ex-nm">${u(e.label)}</div>`}function sa(e){return`
      <div class="later-row">
        ${Qt(e)}
        <button class="btn ghost later-now" data-act="later-now" data-item="${e.id}">Nu</button>
      </div>`}function ra(e){const t=e.later;return`
      <div class="later-row">
        <div>
          ${Qt(e)}
          <div class="note" style="margin-top:4px">${t?"Later":"Nu"}</div>
        </div>
        <button class="btn ghost later-now" data-act="${t?"later-now":"later-park"}" data-item="${e.id}">${t?"Nu":"Later"}</button>
      </div>`}function oa(e){const t=Ie[_t(e)],n=xt(e);return`
      <div class="later-row">
        <div>
          <button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>
          <div class="note" style="margin-top:4px">${u(t)}${n?` · ${u(n)}`:""}</div>
        </div>
        <button class="btn ghost later-now" data-act="detail-open" data-item="${e.id}">Wijzig</button>
      </div>`}function la(e){const t=On(e);return t.length===0?"":`
      <div class="sec-hd">Eigen items</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Label, type of tijd. Weg haalt het uit Vandaag. Log blijft.</div>
        ${t.map(n=>oa(n)).join("")}
      </div>`}function at(){return`
      <div class="card stack io-card">
        <button class="btn ghost ico-btn" data-act="export">${h("export")}<span>Exporteer JSON</span></button>
        <div class="note" style="margin-top:4px">Voegt toe. Bestaande rijen blijven.</div>
        <button class="btn ghost ico-btn" data-act="import-pick">${h("import")}<span>Kies bestand</span></button>
        <input data-id="import-file" class="import-file" type="file" accept="application/json,.json" />
        <div class="field">
          <div class="lbl">Of plak JSON</div>
          <textarea data-id="import-paste" placeholder='{"key":"routine_loop_v6"}'>${u(l.importPaste)}</textarea>
        </div>
        <button class="btn ghost ico-btn" data-act="import-go">${h("import")}<span>Importeer JSON</span></button>
      </div>`}function da(){return`
      <div class="sec-hd">Eigen item</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Label, type, optioneel tijdstip. Geen dosis. Bestaande items blijven.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="item-label" type="text" maxlength="${Le}" placeholder="Bijv. Avondwandeling" autocomplete="off" enterkeyhint="done" value="${u(l.addLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${xe.map(e=>`<button class="chip pick ${l.addKind===e?"on":""}" data-act="item-kind" data-kind="${e}">${Ie[e]}</button>`).join("")}</div>
        <div class="field" style="margin-top:12px">
          <div class="lbl">Tijd</div>
          <input data-id="item-timing" type="text" maxlength="${Ee}" placeholder="22:00 of ochtend" autocomplete="off" enterkeyhint="done" value="${u(l.addTiming)}" />
        </div>
        <div class="stack">
          <button class="btn primary" data-act="item-add">Voeg toe</button>
        </div>
      </div>`}function ca(e){if(e.length===0)return"";const t=z(e[0].date),n=z(e[e.length-1].date);return t===n?t:`${t} – ${n}`}function ua(e){const i=qt(e.map(r=>r.kg),294,72);if(i.length===0)return"";const s=i.length-1,a=i.map((r,d)=>{const c=d===s;return`<circle class="${c?"prog-dot now":"prog-dot"}" cx="${r.x.toFixed(1)}" cy="${r.y.toFixed(1)}" r="${c?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${Ht(i)}" />
          ${a}
        </svg>`}function fa(e){if(e.length===0)return"";const t=e[e.length-1];return`
      <div class="sec-hd">Gewicht</div>
      <div class="card">
        <div class="note" style="margin-top:0">${u(ca(e))}</div>
        ${ua(e)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Laatst</div><div class="val">${t.kg.toFixed(1)} kg</div></div>
        </div>
      </div>`}function ma(e,t,n){const a=qt(e,294,72);if(a.length===0)return'<div class="note">Nog geen lijn.</div>';const r=a.map((d,c)=>{const v=n[c]?.date===t;return`<circle class="${n[c]?.mark==="miss"?"prog-dot miss":v?"prog-dot now":"prog-dot"}" cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${v?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${Ht(a)}" />
          ${r}
        </svg>`}function st(e,t){return`
      <section class="theme-sec" data-sec="themes">
        <div class="sec-hd">Thema's</div>
        <div class="card">
          <div class="ex-nm">Trainingsrichting</div>
          <div class="note">${u(t)}</div>
          ${At(e)}
        </div>
      </section>`}function pa(e){if(!o)return"";const t=o.profile.goals??[],n=o.profile.age_band,i=Zn(o.items,t),s=l.startIds,a=`
    <div class="hdr">
      <div>
        ${Jt()}
        <div class="date-s">Start</div>
      </div>
    </div>`;if(e==="goals")return`
      ${a}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="ex-nm">Wat is je richting?</div>
        <div class="note">Eerst doelen. Types (gedrag, regel, medicijn, supplement, sociaal) komen daarna.</div>
        <div class="chips">${Be.map(r=>`<button class="chip pick ${t.includes(r.id)?"on":""}" data-act="onboard-goal" data-goal="${r.id}">${r.label}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${t.length===0?"disabled":""}>Verder</button>
        </div>
      </div>`;if(e==="age")return`
      ${a}
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="ex-nm">Kies een band</div>
        <div class="note">Geen geboortedatum. Alleen een band.</div>
        <div class="chips">${Ne.map(r=>`<button class="chip pick ${n===r?"on":""}" data-act="onboard-age" data-age="${r}">${r}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${n?"":"disabled"}>Verder</button>
        </div>
      </div>`;if(e==="themes"){const r=o.profile.themes??[];return`
      ${a}
      <div class="sec-hd">Thema's</div>
      <div class="card">
        <div class="ex-nm">Trainingsrichting</div>
        <div class="note">Tik een suggestie of typ zelf. Mag leeg. Later aan te passen.</div>
        ${At(r)}
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-themes-done">Verder</button>
        </div>
      </div>`}return`
    ${a}
    <div class="sec-hd">Start</div>
    <div class="card">
      <div class="ex-nm">Max ${se} nu</div>
      <div class="note">De rest gaat naar Later. Later blijft zichtbaar.</div>
      <div class="chips">${i.map(r=>`<button class="chip pick ${s.includes(r.id)?"on":""}" data-act="onboard-start" data-item="${r.id}">${u(r.label)}</button>`).join("")}</div>
      <div class="note">${s.length} / ${se} gekozen</div>
      <div class="stack" style="margin-top:16px">
        <button class="btn primary" data-act="onboard-done" ${s.length===0?"disabled":""}>Naar Vandaag</button>
      </div>
    </div>`}function We(e){return!ut(e)&&!O(e)?`<div class="ex-nm">${u(e.label)}</div>`:`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>`}function va(e){return`<button class="chip pick" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>`}function ga(e){const t=ke(e),n=ce(e),i=Ln(e.timing),s=En(e.timing),a=$t(e),r=$e(e),d=W(e),c=O(e);return`
      <button class="btn ghost detail-back" data-act="detail-close">Terug</button>
      <div class="sec-hd">Detail</div>
      <div class="card">
        <div class="ex-nm">${u(e.label)}</div>
        ${i?`<div class="note">${u(i)}</div>`:""}
        ${s?`<div class="note">${u(s)}</div>`:""}
        ${n&&!s?`<div class="note">${u(n)}</div>`:""}
        ${a?`<div class="work">${u(a)}</div>`:""}
        ${r?'<div class="note">Voorkeur. Geen regel.</div>':""}
        ${d&&!n&&!i&&!s?'<div class="note">Regel. Geen afvinken.</div>':""}
        ${Pe(e)}
      </div>
      ${t?`<div class="sec-hd">Bron</div>
      <div class="card quiet">
        <div class="src-tag">${u(t)}</div>
      </div>`:""}
      ${c?ya():ba(e)}`}function ya(){return`
      <div class="sec-hd">Wijzig</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Zelfde item. Geen dosis. Log blijft.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="edit-label" type="text" maxlength="${Le}" placeholder="Naam" autocomplete="off" enterkeyhint="done" value="${u(l.editLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${xe.map(e=>`<button class="chip pick ${l.editKind===e?"on":""}" data-act="edit-kind" data-kind="${e}">${Ie[e]}</button>`).join("")}</div>
        <div class="field" style="margin-top:12px">
          <div class="lbl">Tijd</div>
          <input data-id="edit-timing" type="text" maxlength="${Ee}" placeholder="22:00 of ochtend" autocomplete="off" enterkeyhint="done" value="${u(l.editTiming)}" />
        </div>
        <div class="stack">
          <button class="btn primary" data-act="item-save">Bewaar</button>
          ${l.removeAsk?`<div class="note">Weg uit Vandaag. Log blijft.</div>
          <button class="btn primary" data-act="item-remove">Bevestig</button>
          <button class="btn ghost" data-act="item-remove-cancel">Niet nu</button>`:'<button class="btn ghost" data-act="item-remove-ask">Weg</button>'}
        </div>
      </div>`}function ba(e){return Ae(e)?e.later?`
      <div class="card quiet">
        <div class="note" style="margin-top:0">Suggestie in Later. Niet wissen.</div>
        <div class="stack">
          <button class="btn ghost" data-act="later-now" data-item="${e.id}">Nu</button>
        </div>
      </div>`:`
      <div class="card quiet">
        <div class="note" style="margin-top:0">Suggestie. Niet wissen, wel parkeren.</div>
        <div class="stack">
          <button class="btn ghost" data-act="later-park" data-item="${e.id}">Naar Later</button>
        </div>
      </div>`:""}function ha(e){const t=ce(e);return`
      <div class="card quiet">
        ${We(e)}
        ${t?`<div class="note">${u(t)}</div>`:'<div class="note">Regel. Geen afvinken.</div>'}
      </div>`}function ka(e,t,n){const i=G(e),s=Q(e),a=i.logged||!!i.skip,r=s&&i.current!==null&&e.b!==null&&i.current>=e.b,d=a||r,c=s,v=$t(e),f=ce(e),y=c&&t.suggestedMilestone&&e.id===o.vector.id;return`
      <div class="card">
        ${We(e)}
        ${f&&!v&&!s?`<div class="note">${u(f)}</div>`:""}
        ${s?`<div class="track">
          <span class="now">${j(i.current??e.a??0)}</span>
          <span>→</span>
          <span class="mid">${j(e.milestone??0)}</span>
          <span>→</span>
          <span class="end">${j(e.b??0)}</span>
        </div>`:v?`<div class="work">${u(v)}</div>`:""}
        <div class="actions ${s?"":"actions-two"}">
          ${s?`<button class="btn ico-btn ${i.plus?"on":""}" data-act="plus" data-item="${e.id}" ${d?"disabled":""}>${h("plus")}<span>+1</span></button>`:""}
          <button class="btn ico-btn ${i.done?"track":""}" data-act="done" data-item="${e.id}" ${a?"disabled":""}>${h("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${i.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${i.logged?"disabled":""}>${h("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||i.skip?`<div class="chips">${le.map(b=>`<button class="chip ${i.skip===b?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${b}">${b}</button>`).join("")}</div>`:""}
        ${Pe(e)}
        ${y?`<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${j(t.suggestedMilestone)}.</div>
               ${l.advanceWarn&&o.profile.identity_constraint?`<div class="banner">Check: ${u(o.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${j(t.suggestedMilestone)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`:`<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${t.suggestedMilestone}">Volgende etappe ${j(t.suggestedMilestone)}</button>
                      </div>`}`:""}
        ${c&&n?`<div class="note">${u(n)}</div>`:""}
      </div>`}function j(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function L(e){if(!l.busy){l.busy=!0,l.error=null;try{await e()}catch(t){l.error=t instanceof Error?t.message:"Er ging iets mis"}finally{l.busy=!1,$()}}}async function wa(e){p=e,o=await p.load(),l.screen="vandaag",$()}async function $a(){Xi(),_a(),await wa(Vi())}function _a(){document.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const t=e.target;if(t instanceof HTMLInputElement){if(t.dataset.id==="theme-custom"){e.preventDefault(),rn();return}if(t.dataset.id==="item-label"||t.dataset.id==="item-timing"){e.preventDefault(),sn();return}if(t.dataset.id==="edit-label"||t.dataset.id==="edit-timing"){e.preventDefault(),an();return}t.dataset.id==="weight"&&(e.preventDefault(),ot(t.value))}}),document.addEventListener("change",e=>{const t=e.target;if(t instanceof HTMLInputElement&&(t.dataset.id==="weight"&&ot(t.value),t.dataset.id==="import-file"&&t.files?.[0])){const n=t.files[0];t.value="",n.text().then(i=>en(i))}}),document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(dn(n)){l.screen=n,l.skipItemId=null,l.missKey=null,l.detailItemId=null,l.advanceWarn=!1,l.error=null,$();return}xa(t)})}async function xa(e){const t=e.dataset.act;if(!t)return;const n=M("import-paste");if(n!==null&&(l.importPaste=n),!p||!o)return;const i=ze(),s=k();if(t==="sleep-inc"||t==="sleep-dec"){const a=i.sleep??7,r=Math.max(0,Math.min(14,a+(t==="sleep-inc"?.5:-.5)));await C({date:s,kind:"body_sleep",value:r,skip_reason:null,item_id:null});return}if(t==="energy"){const a=Number(e.dataset.n),r=i.energy===a?null:a;if(r===null)return;await C({date:s,kind:"body_energy",value:r,skip_reason:null,item_id:null});return}if(t==="weight-inc"||t==="weight-dec"){const a=$i(i.weight,wi(o.events),t==="weight-inc"?.1:-.1);if(i.weight===a)return;await C({date:s,kind:"body_weight",value:a,skip_reason:null,item_id:null});return}if(t==="plus"){const a=o.items.find(d=>d.id===e.dataset.item);if(!a||!Q(a))return;const r=G(a);if(r.logged||r.skip||a.b!==null&&r.current!==null&&r.current>=a.b)return;await C({date:s,kind:"set",value:(r.current??a.a??0)+1,skip_reason:null,item_id:a.id});return}if(t==="done"){const a=o.items.find(d=>d.id===e.dataset.item);if(!a)return;const r=G(a);if(r.logged||r.skip)return;await C({date:s,kind:"done",value:r.current??a.a,skip_reason:null,item_id:a.id});return}if(t==="detail-open"){const a=e.dataset.item??null,r=a?o.items.find(d=>d.id===a):void 0;if(!r)return;nn(r),l.detailItemId=r.id,$();return}if(t==="detail-close"){l.detailItemId=null,$();return}if(t==="skip-open"){const a=e.dataset.item??null;l.skipItemId=l.skipItemId===a?null:a,$();return}if(t==="skip"){const a=o.items.find(c=>c.id===e.dataset.item);if(!a||G(a).logged)return;const d=e.dataset.reason;if(!qe(d))return;await C({date:s,kind:"skip",value:null,skip_reason:d,item_id:a.id}),l.skipItemId=null;return}if(t==="undo"){const a=o.items.find(c=>c.id===e.dataset.item);if(!a)return;const r=U(o.items),d=Re(Y(o.events,a,r?.id),s);if(!d)return;await Sa(d.id),l.skipItemId=null;return}if(t==="miss-open"){const a=e.dataset.item,r=e.dataset.date;if(!a||!r)return;const d=Zt(a,r);l.missKey=l.missKey===d?null:d,$();return}if(t==="miss"){const a=o.items.find(v=>v.id===e.dataset.item),r=e.dataset.date,d=e.dataset.reason;if(!a||!r||r>=s||!qe(d))return;const c=G(a,r);if(c.logged||c.skip)return;await C({date:r,kind:"miss",value:null,skip_reason:d,item_id:a.id}),l.missKey=null;return}if(t==="advance"){if(!i.suggestedMilestone)return;if(ai(o.profile.identity_constraint)&&!l.advanceWarn){l.advanceWarn=!0,$();return}await rt(i.suggestedMilestone);return}if(t==="advance-go"){if(!i.suggestedMilestone)return;await rt(i.suggestedMilestone);return}if(t==="advance-cancel"){l.advanceWarn=!1,$();return}if(t==="onboard-goal"){const a=e.dataset.goal;if(!a||!Lt(a))return;const r={...o.profile,goals:Qn(o.profile.goals??[],a)};await L(async()=>{await p.saveProfile(r),o.profile=r});return}if(t==="onboard-age"){const a=e.dataset.age;if(!a||!Et(a))return;const r={...o.profile,age_band:a};await L(async()=>{await p.saveProfile(r),o.profile=r});return}if(t==="theme-toggle"){const a=e.dataset.theme;if(!a)return;await ye(ri(N(o.profile.themes),a));return}if(t==="theme-add"){await rn();return}if(t==="onboard-start"){const a=e.dataset.item;if(!a)return;l.startIds=ei(l.startIds,a),$();return}if(t==="onboard-next"){$();return}if(t==="onboard-themes-done"){await ye(o.profile.themes??[],!0);return}if(t==="onboard-done"){const a=o.profile.age_band,r=o.profile.goals??[];if(!a||r.length===0||l.startIds.length===0)return;await L(async()=>{await p.saveOnboarding({goals:r,age_band:a,startIds:l.startIds}),o=await p.load(),l.screen="vandaag"});return}if(t==="later-now"||t==="later-park"){const a=e.dataset.item;if(!a)return;await L(async()=>{await p.setItemLater(a,t==="later-park"),o=await p.load()});return}if(t==="item-kind"){const a=e.dataset.kind;if(!Ue(a))return;tn(),l.addKind=a,$();return}if(t==="item-add"){await sn();return}if(t==="edit-kind"){const a=e.dataset.kind;if(!Ue(a))return;ge(),l.editKind=a,$();return}if(t==="item-save"){await an();return}if(t==="item-remove-ask"){ge(),l.removeAsk=!0,$();return}if(t==="item-remove-cancel"){l.removeAsk=!1,$();return}if(t==="item-remove"){const a=l.detailItemId;if(!a)return;await L(async()=>{await p.removeItem(a),o=await p.load(),l.detailItemId=null,l.removeAsk=!1,l.screen="profiel"});return}if(t==="save-ik"){const a={...o.profile,identity_anti:A(M("identity_anti"),x.identity_anti),identity_new:A(M("identity_new"),x.identity_new),identity_constraint:A(M("identity_constraint"),x.identity_constraint),horizon_1y:A(M("horizon_1y"),x.horizon_1y)};await L(async()=>{await p.saveProfile(a),o.profile=a});return}if(t==="export"){fn(o);return}if(t==="import-pick"){document.querySelector("[data-id=import-file]")?.click();return}if(t==="import-go"){await en(l.importPaste);return}}async function en(e){const t=e.trim();if(!t){l.error=X,$();return}await L(async()=>{o=await p.importJson(t),l.importPaste=""})}function tn(){l.addLabel=M("item-label")??l.addLabel,l.addTiming=M("item-timing")??l.addTiming}function ge(){l.editLabel=M("edit-label")??l.editLabel,l.editTiming=M("edit-timing")??l.editTiming}function nn(e){l.editLabel=e.label,l.editKind=_t(e),l.editTiming=xt(e),l.removeAsk=!1}async function an(){!p||!o||!l.detailItemId||(ge(),await L(async()=>{const e=await p.updateItem({id:l.detailItemId,label:l.editLabel,kind:l.editKind,timing:l.editTiming});o=await p.load(),nn(e),l.detailItemId=e.id}))}async function sn(){!p||!o||(tn(),await L(async()=>{await p.addItem({label:l.addLabel,kind:l.addKind,timing:l.addTiming}),o=await p.load(),l.addLabel="",l.addTiming=""}))}async function rn(){if(!o)return;const e=M("theme-custom")??"",t=N(o.profile.themes),n=oi(t,e);n.length===t.length&&n.every((i,s)=>i===t[s])||await ye(n)}async function ye(e,t=!1){if(!p||!o)return;const n=N(e),i={...o.profile,themes:n},s=t||!It(o);await L(async()=>{if(s){await p.saveThemes(n),o=await p.load();return}await p.saveProfile(i),o.profile=i})}function M(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function rt(e){await L(async()=>{o.stage=await p.advanceStage(o.stage,e),o.items=o.items.map(t=>t.id===o.stage.vector_id?{...t,milestone:e}:t),o.rotated=!0,l.advanceWarn=!1})}async function C(e){await L(async()=>{const t=await p.addEvent(e);o.events.push(t)})}async function Sa(e){await L(async()=>{await p.removeEvent(e),o.events=o.events.filter(t=>t.id!==e)})}async function ot(e){if(!p||!o)return;const t=_i(e);t!==null&&ze().weight!==t&&await C({date:k(),kind:"body_weight",value:t,skip_reason:null,item_id:null})}$a();
