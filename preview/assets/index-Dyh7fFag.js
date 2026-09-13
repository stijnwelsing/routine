(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();const re=["geen tijd","geen energie","vergeten","geen zin","pijn"];function Pe(e){return!!(e&&re.includes(e))}const sn=["guideline","evidence-informed","public-framework","user preference","hypothesis"],rn=["vandaag","koers","voortgang","profiel"];function on(e){return!!(e&&rn.includes(e))}const h={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},oe="routine_loop_v6",rt=["routine_loop_v5","routine_loop_v4","routine_loop_v3"],We="routine_local_user_id",qe="routine_local_tenant_id",ln="routine_local_chosen";function dn(e){return JSON.stringify({exported_at:new Date().toISOString(),key:oe,profile:e.profile,items:e.items,vector:e.vector,stage:e.stage,events:e.events,rotated:e.rotated,onboarded:e.onboarded,theme_step:e.theme_step},null,2)}function cn(e){const t=new Blob([dn(e)],{type:"application/json"}),n=URL.createObjectURL(t),i=document.createElement("a");i.href=n,i.download=`routine-${e.profile.id.slice(0,8)}.json`,i.click(),URL.revokeObjectURL(n)}const ot=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],lt=["zo","ma","di","wo","do","vr","za"];function $(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${i}`}function B(e,t){const n=D(e);return n.setDate(n.getDate()+t),$(n)}function D(e){const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)}function un(e){const t=D(e);return`${lt[t.getDay()]} ${t.getDate()} ${ot[t.getMonth()]}`}function z(e){const t=D(e);return`${t.getDate()} ${ot[t.getMonth()]}`}function fn(e){return lt[D(e).getDay()]}function mn(e){const t=D(e).getDay();return t===0?7:t}function be(e){const t=D(e),n=t.getDay(),i=n===0?-6:1-n;return t.setDate(t.getDate()+i),$(t)}function ke(e,t){const n=[];let i=e;for(;i<=t;)n.push(i),i=B(i,1);return n}function P(){return crypto.randomUUID()}function pn(){return new Date().toISOString()}function vn(e){return e.trim().toLowerCase().normalize("NFC")}function gn(e){return!!(e&&sn.includes(e))}function yn(e){const t=vn(e);return t==="cafeïne 90 min na opstaan"?"public-framework":t==="wandelen na eten"?"evidence-informed":t==="low carb"||t==="scherm uit 22:00"||t==="korte rust"?"user preference":t==="vitamine d"?"guideline":t==="koud douchen"?"hypothesis":null}function he(e){return yn(e.label)??(gn(e.template)?e.template:null)}function dt(e){return he(e)!==null}function ee(){return{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:null,condition:null}}function bn(e){return{mode:e?.mode??null,clock:e?.clock??null,anchor:e?.anchor??null,offset_min:e?.offset_min??null,window_min:e?.window_min??null,frequency:e?.frequency??null,condition:e?.condition??null}}function ct(e){return e.trim().toLowerCase().normalize("NFC")}function kn(e){return ct(e)==="korte rust"?{mode:"clock",clock:"08:00",window_min:840,frequency:"daily",condition:"body"}:null}function hn(e,t){const n=kn(t);return n?{...e,...n}:e}function ut(e){return{now:e.now??new Date,today:e.today,wakeAt:e.wakeAt??null,mealAt:e.mealAt??null,sleepSet:!!e.sleepSet,energySet:!!e.energySet}}function we(e){const t=e?.trim().toLowerCase();return t==="body"||t==="energy|sleep"?"body":t==="energy"?"energy":t==="sleep"?"sleep":null}function wn(e,t){const n=we(e.condition);if(!n)return!0;const i=!!t.sleepSet,s=!!t.energySet;return n==="energy"?s:n==="sleep"?i:i||s}function ft(e,t){const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(!n)return null;const i=Number(n[1]),s=Number(n[2]);if(i>23||s>59)return null;const a=D(e);return a.setHours(i,s,0,0),a}function $n(e,t){return e==="wake"?t.wakeAt:e==="meal"?t.mealAt:null}function _n(e,t){if(e.mode==="clock"&&e.clock)return ft(t.today,e.clock);if(e.mode==="relative"&&e.anchor&&e.offset_min!==null){const n=$n(e.anchor,t);return n?new Date(n.getTime()+e.offset_min*6e4):null}return null}function mt(e,t){return!t||e.window_min===null?null:new Date(t.getTime()+e.window_min*6e4)}function pt(e,t){if(e.timing.frequency==="weekly"||e.type==="weekly"){const i=e.weekdays??[];return i.length===0?!1:i.includes(mn(t))}return!0}function W(e){return _e(e)==="constraint"}function $e(e){return _e(e)==="preference"}function vt(e){return!W(e)&&!$e(e)}function xn(e,t){if(W(e))return"silent";if(!pt(e,t.today)||!wn(e.timing,t))return"hidden";const n=e.timing;if(!n.mode)return"due";const i=_n(n,t);if(n.mode==="relative"&&!i)return"due";if(i&&t.now<i)return"wait";const s=mt(n,i);return s&&t.now>s?"closed":"due"}function te(e,t){const n=xn(e,t);return!(n==="hidden"||n==="closed"||n==="wait"&&e.timing.window_min!==null)}function He(e){return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`}function Sn(e){if(e.window_min===null)return null;if(e.mode==="clock"&&e.clock){const t=ft("2000-01-01",e.clock);if(!t)return null;const n=mt(e,t);return n?`${He(t)}–${He(n)}`:null}return`${e.window_min} min`}function In(e){const t=we(e.condition);return t==="body"?"na slaap of energie":t==="energy"?"na energie":t==="sleep"?"na slaap":null}function le(e){const t=e.timing;return we(t.condition)?null:t.condition?t.condition:t.mode==="relative"&&t.anchor==="wake"&&t.offset_min!==null?`${t.offset_min} min na opstaan`:t.mode==="relative"&&t.anchor==="meal"?"na eten":t.mode==="clock"&&t.clock?t.clock:null}function _e(e){if(e.role)return e.role;const t=ct(e.label);return t==="low carb"?"preference":t==="cafeïne 90 min na opstaan"||t==="scherm uit 22:00"?"constraint":null}const xe=["gedrag","regel","medicijn","supplement","sociaal"],Se={gedrag:"gedrag",regel:"leefregel",medicijn:"medicijn",supplement:"supplement",sociaal:"sociaal"},Ie={gedrag:"Gedrag",regel:"Regel",medicijn:"Medicijn",supplement:"Supplement",sociaal:"Sociaal"},Le=40,Ee=40;function Fe(e){return!!(e&&xe.includes(e))}function Z(e){return e.a!==null&&e.b!==null&&e.milestone!==null}function Ln(e,t){return pt(e,t)}function En(e,t){return{...e,tenant_id:e.tenant_id??t,weekdays:e.weekdays??null,times_per_week:e.times_per_week??null,timing:hn(bn(e.timing),e.label),role:_e(e),template:he(e),later:!!e.later,removed:!!e.removed}}function Te(e){return e.type==="medicijn"||e.type==="supplement"}function gt(e){return e.type==="sociaal"}function yt(e,t){return V(e,t).filter(n=>vt(n)&&!Te(n)&&!gt(n)&&!n.later)}function Tn(e,t){return V(e,t).filter(n=>$e(n)&&!n.later)}function jn(e,t){return V(e,t).filter(n=>W(n)&&!n.later)}function bt(e,t){return V(e,t).filter(n=>Te(n)&&!n.later)}function kt(e,t){return V(e,t).filter(n=>gt(n)&&!n.later)}function An(e,t){return V(e,t).filter(n=>n.later&&(vt(n)||W(n)))}function V(e,t){return e.filter(n=>!n.removed&&Ln(n,t)).sort((n,i)=>n.sort-i.sort)}function de(e){return e.find(Z)}function me(e){return e.kind==="body_sleep"||e.kind==="body_energy"||e.kind==="body_weight"}function ce(e,t,n){return e.filter(i=>me(i)?!1:!!(i.item_id===t.id||i.item_id===null&&n&&t.id===n))}function Mn(e,t){return t?[...e.filter(me),...ce(e,t,t.id)]:e.filter(me)}function ht(e){return e.a===null?null:e.unit==="sec"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} s`:e.unit==="reps"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} reps`:String(e.a)}function I(e){return e.trim().toLowerCase()}function q(e){const t=e.trim().replace(/\s+/g," ").slice(0,Le);return t.length>0?t:null}function je(e){const t=e.trim().replace(/\s+/g," ").slice(0,Ee);if(!t)return ee();const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(n){const i=Number(n[1]),s=Number(n[2]);if(i<=23&&s<=59)return{...ee(),mode:"clock",clock:`${String(i).padStart(2,"0")}:${n[2]}`,frequency:"daily"}}return{...ee(),frequency:"daily",condition:t}}function Bn(e){return e.reduce((t,n)=>Math.max(t,n.sort),-1)+1}const Nn=["Push-ups","Squats","Plank","Dead hang","Gerichte kracht","Koud douchen","Niet snoepen","Low carb","Intermittent fasting","Geen alcohol","Cafeïne 90 min na opstaan","Wandelen na eten","Medicijn ochtend","Vitamine D","Bellen met iemand","Iemand zien","Scherm uit 22:00","Korte rust"];function ue(e){const t=I(e);return Nn.some(n=>I(n)===t)}function Ae(e){return ue(e.label)}function O(e){return!Ae(e)}function H(e){return!!e.removed}function Cn(e){return e.filter(t=>O(t)&&!H(t)).sort((t,n)=>t.sort-n.sort)}function wt(e){return e.type==="leefregel"?"regel":e.type==="medicijn"?"medicijn":e.type==="supplement"?"supplement":e.type==="sociaal"?"sociaal":"gedrag"}function $t(e){return e.timing.mode==="clock"&&e.timing.clock?e.timing.clock:e.timing.condition??""}function Dn(e,t){const n=q(t);return n?!e.some(i=>!H(i)&&I(i.label)===I(n)):!1}function On(e,t,n){const i=q(n);return!i||ue(i)?!1:!e.some(s=>s.id!==t&&!H(s)&&I(s.label)===I(i))}function Kn(e,t){const n=q(t);if(n)return e.find(i=>H(i)&&O(i)&&I(i.label)===I(n))}function Rn(e){const t=q(e.label);return t?{id:P(),tenant_id:e.tenantId,type:Se[e.kind],label:t,unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:e.sort,timing:je(e.timing??""),role:"action",template:"user preference",later:!!e.later,removed:!1}:null}function Gn(e,t){if(!O(e)||H(e))return null;const n=q(t.label);return!n||ue(n)?null:{...e,type:Se[t.kind],label:n,timing:je(t.timing??""),template:"user preference"}}function zn(e,t){if(!O(e)||!H(e))return null;const n=q(t.label);return!n||ue(n)?null:{...e,type:Se[t.kind],label:n,timing:je(t.timing??""),template:"user preference",later:!1,removed:!1}}function Pn(e){return H(e)?{item:e,mode:"removed"}:O(e)?{item:{...e,removed:!0},mode:"removed"}:Ae(e)?{item:{...e,later:!0},mode:"parked"}:null}function Wn(e){const t=new Set,n=[];for(const i of e){const s=I(i.label);t.has(s)||(t.add(s),n.push(i))}return n}function Me(e,t,n){const i=Wn(e),s=new Set(i.map(r=>I(r.label))),a=t.filter(r=>!s.has(I(r.label))).map(r=>({...r,tenant_id:n}));return[...i,...a]}function _t(e){const t=new Map;for(const n of e)for(const i of n)t.has(i.id)||t.set(i.id,i);return[...t.values()].sort((n,i)=>n.created_at.localeCompare(i.created_at))}function qn(e){return e?!!(e.identity_anti||e.identity_new||e.identity_constraint||e.horizon_1y||e.display_name):!1}function Hn(e,t,n,i){if(e.length===0)return null;const s=e.reduce((f,y)=>(y.events?.length??0)>(f.events?.length??0)?y:f),a=e.find(f=>qn(f.profile))?.profile??s.profile,r=Me([s,...e.filter(f=>f!==s)].flatMap(f=>f.items??[]),t,i),d=new Map(r.map(f=>[I(f.label),f.id])),c=new Map;for(const f of e)for(const y of f.items??[]){const b=d.get(I(y.label));b&&y.id!==b&&c.set(y.id,b)}const v=_t(e.map(f=>f.events??[])).map(f=>{if(!f.item_id)return f;const y=c.get(f.item_id);return y?{...f,item_id:y}:f});return{...s,profile:{...a,id:a.id||n,tenant_id:a.tenant_id||i},items:r,events:v}}const ie=3,Be=[{id:"kracht",label:"Kracht"},{id:"eten",label:"Eten & drinken"},{id:"slaap",label:"Slaap"},{id:"stofjes",label:"Stofjes"},{id:"bewegen",label:"Bewegen"}],Ne=["18–29","30–39","40–49","50–59","60+"],Fn={kracht:["Push-ups","Squats","Plank","Dead hang"],eten:["Niet snoepen","Low carb","Intermittent fasting","Geen alcohol"],slaap:["Koud douchen"],stofjes:["Medicijn ochtend","Vitamine D"],bewegen:["Wandelen na eten"]};function Ce(e){return W(e)||e.type==="weekly"?!1:e.type==="daily"||e.type==="leefregel"||e.type==="gedrag"||e.type==="sociaal"||Te(e)}function Vn(e){return e.filter(t=>t.removed?!1:Ce(t)?!0:W(t)&&t.later).sort((t,n)=>t.sort-n.sort)}function xt(e){return!(e.onboarded!==!1||(e.events??[]).length>0)}function Un(e){return xt(e)?e.profile.goals?.length?e.profile.age_band?e.theme_step!==!0?"themes":"start":"age":"goals":null}function Yn(e,t){const n=e.filter(Ce).sort((a,r)=>a.sort-r.sort);if(t.length===0)return n;const i=new Set(t.flatMap(a=>Fn[a]??[])),s=n.filter(a=>i.has(a.label));return s.length>0?s:n}function Jn(e,t){const n=new Set(t.slice(0,ie));return e.map(i=>Ce(i)?{...i,later:!n.has(i.id)}:{...i,later:!1})}function Zn(e,t){return e.includes(t)?e.filter(n=>n!==t):[...e,t]}function Xn(e,t){return e.includes(t)?e.filter(n=>n!==t):e.length>=ie?e:[...e,t]}function St(e){return Be.some(t=>t.id===e)}function It(e){return Ne.includes(e)}const Qn="geen zin",_={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140};function A(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function ei(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===Qn).length}function ti(e,t){const n=A(e,_.identity_new);return!n||ei(t)<2?null:n}function ni(e){return!!A(e,_.identity_constraint)}function ii(e,t){return t&&!A(e,_.horizon_1y)}function Lt(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const Ve=["Military calisthenics","Kickbox","Spinnen"],Et=40;function De(e){const t=e.trim().replace(/\s+/g," ").slice(0,Et);return t.length>0?t:null}function N(e){if(!Array.isArray(e))return[];const t=new Set,n=[];for(const i of e){if(typeof i!="string")continue;const s=De(i);if(!s)continue;const a=s.toLowerCase();t.has(a)||(t.add(a),n.push(s))}return n}function ai(e,t){const n=De(t);if(!n)return e;const i=n.toLowerCase();return e.some(s=>s.toLowerCase()===i)?e.filter(s=>s.toLowerCase()!==i):[...e,n]}function si(e,t){const n=De(t);if(!n)return e;const i=n.toLowerCase();return e.some(s=>s.toLowerCase()===i)?e:[...e,n]}function ri(e){const n=N(e).filter(i=>!Ve.some(s=>s.toLowerCase()===i.toLowerCase()));return[...Ve,...n]}function Ue(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function Tt(e){const t=new Set(N(e).map(i=>i.toLowerCase()));return`<div class="chips">${ri(e).map(i=>`<button class="chip pick ${t.has(i.toLowerCase())?"on":""}" data-act="theme-toggle" data-theme="${Ue(i)}">${Ue(i)}</button>`).join("")}</div>
        <div class="theme-add">
          <input data-id="theme-custom" type="text" maxlength="${Et}" placeholder="Eigen thema" autocomplete="off" enterkeyhint="done" />
          <button class="btn ghost" data-act="theme-add">Voeg toe</button>
        </div>`}const J="Ongeldig bestand. Geen Routine-export.";function ae(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function oi(e){return e==null||e===oe?!0:rt.includes(String(e))}function li(e){return ae(e)&&typeof e.id=="string"&&e.id.length>0&&typeof e.label=="string"}function di(e){return ae(e)&&typeof e.id=="string"&&e.id.length>0&&typeof e.date=="string"&&typeof e.kind=="string"}function Ye(e){return e.trim().toLowerCase()}function Y(e,t){const n=e?.trim();if(n)return e??n;const i=t?.trim();return i?t??i:null}function ci(e,t){const n=[],i=new Set;for(const s of[e,t].flatMap(a=>Array.isArray(a)?a:[]))typeof s!="string"||!St(s)||i.has(s)||(i.add(s),n.push(s));return n}function ui(e,t,n){const i=new Map(t.map(a=>[Ye(a.label),a.id])),s=new Map;for(const a of n){const r=i.get(Ye(a.label));r&&a.id!==r&&s.set(a.id,r)}return e.map(a=>{if(!a.item_id)return a;const r=s.get(a.item_id);return r?{...a,item_id:r}:a})}function fi(e){let t;try{t=JSON.parse(e)}catch{throw new Error(J)}if(!ae(t)||!oi(t.key))throw new Error(J);if(!ae(t.profile)||!Array.isArray(t.items)||!Array.isArray(t.events))throw new Error(J);if(!t.items.every(li)||!t.events.every(di))throw new Error(J);return{profile:t.profile,items:t.items,events:t.events,onboarded:typeof t.onboarded=="boolean"?t.onboarded:void 0,theme_step:typeof t.theme_step=="boolean"?t.theme_step:void 0}}function mi(e,t){return{...e,display_name:Y(e.display_name,t.display_name),identity_anti:A(Y(e.identity_anti,t.identity_anti),_.identity_anti),identity_new:A(Y(e.identity_new,t.identity_new),_.identity_new),identity_constraint:A(Y(e.identity_constraint,t.identity_constraint),_.identity_constraint),horizon_1y:A(Y(e.horizon_1y,t.horizon_1y),_.horizon_1y),age_band:e.age_band??(t.age_band&&It(t.age_band)?t.age_band:null),goals:ci(e.goals,t.goals),themes:N([...e.themes??[],...t.themes??[]])}}function pi(e,t){const n=e.profile.tenant_id,i=Me(e.items,t.items,n),s=ui(t.events,i,t.items).map(a=>({...a,tenant_id:n,user_id:e.profile.id}));return{...e,profile:mi(e.profile,t.profile),items:i,events:_t([e.events,s]),onboarded:!!(e.onboarded||t.onboarded),theme_step:!!(e.theme_step||t.theme_step)}}const vi=2,gi=6;function X(e,t){return e.created_at.localeCompare(t.created_at)}function fe(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(X).at(-1)}function jt(e,t){return t.filter(i=>i.kind==="set").sort(X).at(-1)?.value??e}function Oe(e,t){return fe(e,t,"body_sleep")?.value??null}function Ke(e,t){return fe(e,t,"body_energy")?.value??null}const At=40,Mt=250,yi=80;function bi(e,t){return fe(e,t,"body_weight")?.value??null}function ki(e){return e.filter(t=>t.kind==="body_weight"&&t.value!==null).sort(X).at(-1)?.value??null}function hi(e,t,n){return Math.round(Math.max(At,Math.min(Mt,(e??t??yi)+n))*10)/10}function wi(e){const t=e.trim().replace(",",".");if(!t)return null;const n=Number(t);return Number.isFinite(n)?Math.round(Math.max(At,Math.min(Mt,n))*10)/10:null}function Q(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip")).sort(X).at(-1)}function Bt(e,t){const n=Q(e,t);return n?.kind==="skip"?n.skip_reason:null}function Nt(e,t){return Q(e,t)?.kind==="done"}function Ct(e,t){return Q(e,t)?.kind==="set"}function Dt(e,t){const n=Q(e,t);return n?.kind==="set"||n?.kind==="done"}function $i(e,t){return e!==null&&e<gi||t!==null&&t<=vi}function _i(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const i=Math.max(1,Math.ceil(n/2));return Math.min(t,e+i)}function se(e,t,n,i){if(t<i)return"empty";const s=Q(e,t);return s?.kind==="done"||s?.kind==="set"?"done":s?.kind==="skip"?"skip":fe(e,t,"miss")?"miss":t>=n?"empty":"miss"}function xi(e,t,n="1970-01-01"){let i=0,s=t;for(let a=0;a<400;a+=1){const r=se(e,s,t,n);if(r==="done")i+=1;else if(r==="skip"||r==="empty"&&s===t){s=B(s,-1);continue}else break;s=B(s,-1)}return i}function Si(e,t,n){const i=be(t),s=!n||n<i?i:n;let a=0,r=0;for(const d of ke(s,t)){const c=se(e,d,t,n??s);c==="skip"||c==="empty"||(r+=1,c==="done"&&(a+=1))}return{hits:a,eligible:r}}function Ii(e,t,n="1970-01-01",i=3){const s=se(e,t,t,n);if(s==="done"||s==="skip")return!1;const a=B(t,-1);if(a<n)return!1;const r=B(t,-i),d=n>r?n:r;return ke(d,a).some(c=>se(e,c,t,n)==="miss")}function Li(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled&&!e.todayLogged?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function Ei(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${Je(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${Je(e.milestone)}.`}function Je(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function Ot(e,t,n){return t.filter(s=>s.kind==="set"&&s.date<=n).sort(X).at(-1)?.value??e}function Ti(e,t,n,i){const s=jt(e.a,n),a=Oe(n,i),r=Ke(n,i),d=bi(n,i),c=Nt(n,i),v=Ct(n,i),f=Dt(n,i),y=Bt(n,i),b=$i(a,r),T=s>=t.milestone,K=s>=e.b,R=Ii(n,i,t.started_on),g=be(i),m=Ot(e.a,n,B(g,-1)),U=Li({current:s,weekStartCurrent:m,gearDown:b,stalled:R,milestoneHit:T,todayLogged:v||c||!!y});return{current:s,sleep:a,energy:r,weight:d,doneToday:c,plusToday:v,setLoggedToday:f,skipToday:y,gearDown:b,milestoneHit:T,atB:K,trend:U,hitrate:Si(n,i,t.started_on),streak:xi(n,i,t.started_on),nextAction:Ei({milestone:t.milestone,b:e.b,gearDown:b,milestoneHit:T,atB:K,stalled:R,doneToday:c,plusToday:v,skipToday:y}),suggestedMilestone:T&&!K&&!b?_i(t.milestone,e.b):null}}function ji(e,t,n,i){return ce(e,t,n).some(s=>(s.kind==="set"||s.kind==="done"||s.kind==="skip"||s.kind==="miss")&&s.date<i)}function Kt(e,t){return e.created_at.localeCompare(t.created_at)}function Ai(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(Kt).at(-1)}function Mi(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip"||n.kind==="miss")).sort(Kt).at(-1)}function Bi(e,t=[]){const n=D(e);return n.setHours(12,0,0,0),ut({today:e,now:n,sleepSet:Oe(t,e)!==null,energySet:Ke(t,e)!==null})}function pe(e,t,n=[]){const i=Bi(t,n);return[...yt(e,t),...bt(e,t),...kt(e,t)].filter(s=>te(s,i))}function ve(e,t,n,i,s){const a=ce(e,t,s),r=Mi(a,n);if(r?.kind==="set"||r?.kind==="done")return{item:t,date:n,mark:"hit",reason:null};if(r?.kind==="skip")return{item:t,date:n,mark:"skip",reason:r.skip_reason};const d=r?.kind==="miss"?r:Ai(a,n,"miss");return d?{item:t,date:n,mark:"miss",reason:d.skip_reason}:n>=i?{item:t,date:n,mark:"open",reason:null}:{item:t,date:n,mark:"idle",reason:null}}function Rt(e,t,n,i){const s=B(n,-1);return pe(e,s,t).filter(a=>ji(t,a,i,s)).map(a=>{const r=ve(t,a,s,n,i);return r.mark==="hit"||r.mark==="skip"||r.mark==="miss"?r:{...r,mark:"miss",reason:null}}).filter(a=>a.mark==="miss"&&!a.reason)}function Ni(e,t,n){return e.some(i=>i.mark==="hit")?"hit":e.some(i=>i.mark==="miss")?"miss":e.some(i=>i.mark==="skip")?"skip":t===n?"open":"idle"}function Gt(e,t,n,i){const s=be(n),a=B(s,6),r=Rt(e,t,n,i),d=new Set(r.map(g=>`${g.item.id}:${g.date}`)),c=ke(s,a).map(g=>{const m=pe(e,g,t).map(S=>{const U=ve(t,S,g,n,i);return d.has(`${S.id}:${g}`)?{...U,mark:"miss",reason:U.reason}:U});return{date:g,label:fn(g),mark:Ni(m,g,n),hits:m.filter(S=>S.mark==="hit").length,misses:m.filter(S=>S.mark==="miss").length,skips:m.filter(S=>S.mark==="skip").length}}),v=c.filter(g=>g.date<n),f=v.reduce((g,m)=>g+m.hits,0),y=v.reduce((g,m)=>g+m.misses,0),b=v.reduce((g,m)=>g+m.skips,0),T=v.flatMap(g=>pe(e,g.date,t).map(m=>{const S=ve(t,m,g.date,n,i);return d.has(`${m.id}:${g.date}`)?{...S,mark:"miss",reason:S.reason}:S}).filter(m=>m.mark==="miss")),K=v.filter(g=>g.mark!=="idle").length,R=f>0&&y===0&&K>=2?"Week staat.":null;return{start:s,end:a,range:`${z(s)} – ${z(a)}`,days:c,hits:f,misses:y,skips:b,missRows:T,note:R}}function ne(e){return de(e)?.id}function Ze(e,t){return e.created_at.localeCompare(t.created_at)}function Ci(e,t){const n=new Map;for(const i of[...e].sort(Ze))i.kind!=="body_weight"||i.value===null||i.date>t||n.set(i.date,i);return[...n.values()].sort((i,s)=>i.date.localeCompare(s.date)||Ze(i,s)).map(i=>({date:i.date,kg:i.value}))}function Di(e,t,n,i,s){const a=Gt(e,t,n,s??ne(e)),r=a.days.map(d=>({date:d.date,label:d.label,current:Ot(i,t,d.date<=n?d.date:n),mark:d.mark}));return{week:a,line:r,weight:Ci(t,n),hits:a.hits,skips:a.skips,misses:a.misses}}function zt(e,t,n,i=18,s=16){if(e.length===0)return[];const a=Math.min(...e),d=Math.max(...e)-a,c=t-i*2,v=n-s*2;return e.map((f,y)=>{const b=e.length===1?t/2:i+y/(e.length-1)*c,T=d===0?n/2:s+(1-(f-a)/d)*v;return{x:b,y:T}})}function Pt(e){return e.map(t=>`${t.x.toFixed(1)},${t.y.toFixed(1)}`).join(" ")}function Oi(e){return e.skip?null:e.plus?{text:"Set gedaan.",tone:"fog"}:e.done?e.type==="medicijn"?{text:"Genomen.",tone:"sage"}:e.track?{text:"Set staat.",tone:"sage"}:{text:"Staat.",tone:"sage"}:null}function Wt(e,t){return{id:e,tenant_id:t,display_name:null,...Lt(),age_band:null,goals:[],themes:[]}}function qt(e,t,n=$()){return{id:P(),tenant_id:t,vector_id:e,milestone:h.milestone,started_on:n,deadline:B(n,h.windowDays),status:"active",stage_type:h.stageType}}function Re(e){const t=n=>({id:P(),tenant_id:e,timing:ee(),role:null,template:null,later:!1,...n});return[t({type:"daily",label:"Push-ups",unit:"reps",a:h.a,b:h.b,milestone:h.milestone,weekdays:null,times_per_week:null,sort:0}),t({type:"daily",label:"Squats",unit:"reps",a:30,b:null,milestone:null,weekdays:null,times_per_week:null,sort:1}),t({type:"daily",label:"Plank",unit:"sec",a:60,b:null,milestone:null,weekdays:null,times_per_week:null,sort:2}),t({type:"daily",label:"Dead hang",unit:"sec",a:45,b:null,milestone:null,weekdays:null,times_per_week:null,sort:3}),t({type:"weekly",label:"Gerichte kracht",unit:null,a:null,b:null,milestone:null,weekdays:[],times_per_week:2,sort:4}),t({type:"leefregel",label:"Koud douchen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:5,template:"hypothesis"}),t({type:"leefregel",label:"Niet snoepen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:6}),t({type:"leefregel",label:"Low carb",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:7,role:"preference",template:"user preference"}),t({type:"leefregel",label:"Intermittent fasting",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:8}),t({type:"leefregel",label:"Geen alcohol",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:9}),t({type:"gedrag",label:"Cafeïne 90 min na opstaan",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:10,role:"constraint",template:"public-framework",timing:{mode:"relative",clock:null,anchor:"wake",offset_min:90,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Wandelen na eten",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:11,role:"action",template:"evidence-informed",timing:{mode:"relative",clock:null,anchor:"meal",offset_min:0,window_min:null,frequency:"daily",condition:"na eten"}}),t({type:"medicijn",label:"Medicijn ochtend",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:12,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"ochtend"}}),t({type:"supplement",label:"Vitamine D",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:13,role:"action",template:"guideline",timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Bellen met iemand",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:14,role:"action",template:null,timing:{mode:"clock",clock:"18:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Iemand zien",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:1,sort:15,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"deze week"}}),t({type:"gedrag",label:"Scherm uit 22:00",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:16,role:"constraint",template:"user preference",timing:{mode:"clock",clock:"22:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Korte rust",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:17,role:"action",template:"user preference",timing:{mode:"clock",clock:"08:00",anchor:null,offset_min:null,window_min:840,frequency:"daily",condition:"body"}})]}function Ki(e,t){return{id:e.id,tenant_id:e.tenant_id,user_id:t,domain:h.domain,a:e.a??h.a,b:e.b??h.b,unit:e.unit==="sec"?"sec":"reps",pace_constraint:null}}function Ri(e,t=$(),n=P()){const i=Wt(e,n),s=Re(n),a=de(s)??s[0],r=Ki(a,e),d=qt(r.id,n,t);return a.milestone!==null&&(d.milestone=a.milestone),{profile:i,items:s,vector:r,stage:d,events:[],rotated:!1,onboarded:!1,theme_step:!1}}function Ht(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,items:e.items.map(n=>Z(n)?{...n,a:h.a,b:h.b,milestone:h.milestone,unit:h.unit}:n),vector:{...e.vector,a:h.a,b:h.b,unit:h.unit},stage:{...e.stage,milestone:h.milestone},events:e.events}:e}function Gi(){const e=localStorage.getItem(We);if(e)return e;const t=P();return localStorage.setItem(We,t),t}function zi(){const e=localStorage.getItem(qe);if(e)return e;const t=P();return localStorage.setItem(qe,t),t}function x(e){localStorage.setItem(oe,JSON.stringify(e))}function Pi(e){if(!e)return null;try{const t=JSON.parse(e);return!t||typeof t!="object"?null:t}catch{return null}}function Wi(){return[oe,...rt].map(e=>Pi(localStorage.getItem(e))).filter(e=>e!==null)}function Ft(e,t,n){const i=Me(e.items??[],Re(n),n).map(s=>En(s,n));return{...e,profile:{...Wt(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...Lt(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null,age_band:e.profile?.age_band??null,goals:Array.isArray(e.profile?.goals)?e.profile.goals:[],themes:N(e.profile?.themes)},items:i,vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(s=>({...s,tenant_id:s.tenant_id??n,item_id:s.item_id??null})),rotated:!!e.rotated,onboarded:e.onboarded??!0,theme_step:e.theme_step??!1}}function L(e,t){const n=Wi();if(n.length===0){const a=Ri(e,$(),t);return x(a),a}const i=Hn(n,Re(t),e,t)??n[0],s=Ht(Ft(i,e,t));return x(s),s}function qi(){localStorage.setItem(ln,"1");const e=Gi(),t=zi();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return L(e,t)},async addEvent(n){const i=L(e,t),s={id:n.id??P(),tenant_id:t,user_id:e,item_id:n.item_id??null,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:pn()};return i.events.push(s),x(i),s},async saveProfile(n){const i=L(e,t);i.profile=n,x(i)},async saveOnboarding(n){const i=L(e,t);i.profile={...i.profile,goals:n.goals,age_band:n.age_band,themes:N(i.profile.themes)},i.items=Jn(i.items,n.startIds),i.onboarded=!0,i.theme_step=!0,x(i)},async saveThemes(n){const i=L(e,t);i.profile={...i.profile,themes:N(n)},i.theme_step=!0,x(i)},async setItemLater(n,i){const s=L(e,t);s.items=s.items.map(a=>a.id===n?{...a,later:i}:a),x(s)},async addItem(n){const i=L(e,t),s=Kn(i.items,n.label);if(s){const r=zn(s,{label:n.label,kind:n.kind,timing:n.timing});if(!r)throw new Error("naam ontbreekt");return i.items=i.items.map(d=>d.id===r.id?r:d),x(i),r}const a=Rn({tenantId:t,label:n.label,kind:n.kind,timing:n.timing,sort:Bn(i.items)});if(!a)throw new Error("naam ontbreekt");if(!Dn(i.items,a.label))throw new Error("item bestaat al");return i.items=[...i.items,a],x(i),a},async updateItem(n){const i=L(e,t),s=i.items.find(r=>r.id===n.id);if(!s)throw new Error("item ontbreekt");if(!q(n.label))throw new Error("naam ontbreekt");if(!On(i.items,s.id,n.label))throw new Error("item bestaat al");const a=Gn(s,n);if(!a)throw new Error("alleen eigen item");return i.items=i.items.map(r=>r.id===a.id?a:r),x(i),a},async removeItem(n){const i=L(e,t),s=i.items.find(r=>r.id===n);if(!s)throw new Error("item ontbreekt");const a=Pn(s);if(!a)throw new Error("item blijft");return i.items=i.items.map(r=>r.id===a.item.id?a.item:r),x(i),a.item},async saveVectorConstraint(n,i){const s=L(e,t);s.vector.id===n&&(s.vector.pace_constraint=i,x(s))},async advanceStage(n,i){const s=L(e,t),a=qt(n.vector_id,t);return a.milestone=i,s.stage=a,s.items=s.items.map(r=>r.id===n.vector_id?{...r,milestone:i}:r),s.rotated=!0,x(s),a},async importJson(n){const i=fi(n),s=L(e,t),a=Ht(Ft(pi(s,i),e,t));return x(a),a},async signOut(){}}}const Xe="#F0ECE4",Hi="#3D6B5A";function Vt(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${Xe}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${Xe}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${Hi}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function k(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function Fi(e){return e==="stokt"||e==="herstel"?"ember":e==="stijgt"?"sage":"fog"}function Qe(e){const t=Fi(e);return e==="stokt"||e==="herstel"||e==="zakt"?k("status-kink",`ico-${t}`):e==="stijgt"?k("status-up",`ico-${t}`):k("status-flat",`ico-${t}`)}function Vi(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${k(n?"dot-now":"dot")}</button>`}).join("")}const Ui=`
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
</svg>`;function Yi(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",Ui)}const F=()=>document.querySelector("#app"),o={screen:"vandaag",skipItemId:null,missKey:null,detailItemId:null,advanceWarn:!1,busy:!1,error:null,startIds:[],addKind:"gedrag",addLabel:"",addTiming:"",editKind:"gedrag",editLabel:"",editTiming:"",removeAsk:!1,importPaste:""};let p=null,l=null;function Ge(){if(!l)throw new Error("geen snapshot");const e=de(l.items);return Ti(l.vector,l.stage,Mn(l.events,e),$())}function G(e,t=$()){if(!l)throw new Error("geen snapshot");const n=de(l.items),i=ce(l.events,e,n?.id),s=e.a===null?null:jt(e.a,i);return{done:Nt(i,t),plus:Ct(i,t),skip:Bt(i,t),logged:Dt(i,t),current:s}}function Ut(e,t){return`${e}:${t}`}function Ji(e=$()){const t=l?.events??[];return ut({today:e,now:new Date,sleepSet:Oe(t,e)!==null,energySet:Ke(t,e)!==null})}function u(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function w(){if(!l||!p)return;const e=Un(l);if(e){F().innerHTML=da(e);return}const t=Ge(),{vector:n,stage:i}=l,s=p.mode==="local"?"Lokaal":"Supabase",a=`
    <div class="hdr">
      <div>
        ${Vt()}
        <div class="date-s">${un($())}</div>
      </div>
      <div class="mode-pill">${s}</div>
    </div>`,r=`
    <nav class="nav nav-4">
      <button data-nav="vandaag" class="${o.screen==="vandaag"?"active":""}">${k("day")}Vandaag</button>
      <button data-nav="koers" class="${o.screen==="koers"?"active":""}">${k("mark")}Koers</button>
      <button data-nav="voortgang" class="${o.screen==="voortgang"?"active":""}">${k("line")}Voortgang</button>
      <button data-nav="profiel" class="${o.screen==="profiel"?"active":""}">${k("me")}Profiel</button>
    </nav>`;if(o.detailItemId){const d=l.items.find(c=>c.id===o.detailItemId);if(d){F().innerHTML=`
      ${a}
      ${ua(d)}
      ${o.error?`<p class="error" style="padding:0 18px">${u(o.error)}</p>`:""}
      ${r}`;return}o.detailItemId=null}if(o.screen==="vandaag"){const d=ti(l.profile.identity_new,l.events),c=$(),v=Ji(c),f=yt(l.items,c).filter(m=>te(m,v)),y=jn(l.items,c),b=bt(l.items,c).filter(m=>te(m,v)),T=kt(l.items,c).filter(m=>te(m,v)),K=An(l.items,c),R=Tn(l.items,c),g=Rt(l.items,l.events,c,ne(l.items));F().innerHTML=`
      ${a}
      ${p.mode==="local"?'<div class="banner">Lokaal — geen Supabase. +1 / Done / Skip blijven op dit apparaat.</div>':""}
      ${t.gearDown?'<div class="banner hot">Lijf vraagt tempo omlaag. Etappe gaat niet omhoog.</div>':""}
      <div class="sec-hd">Lijf</div>
      <div class="card split">
        <div class="note" style="margin-top:0">Optioneel. Blokkeert de dag niet.</div>
        <div class="row">
          <div class="lbl lbl-ico">${k("moon")} Slaap</div>
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
          <div class="dots">${Vi(t.energy)}</div>
        </div>
      </div>
      ${R.length?`<div class="sec-hd">Dag</div>
      <div class="card quiet">
        <div class="day-tags">${R.map(m=>ca(m)).join("")}</div>
      </div>`:""}
      ${y.length?`<div class="sec-hd">Regel</div>${y.map(m=>pa(m)).join("")}`:""}
      ${b.length?`<div class="sec-hd">Stofjes</div>${b.map(m=>et(m)).join("")}`:""}
      ${T.length?`<div class="sec-hd">Sociaal</div>${T.map(m=>et(m)).join("")}`:""}
      ${g.length?`<div class="sec-hd">Niet gedaan</div>
      <div class="card">
        <div class="note" style="margin-top:0">Geen +1, Done of Skip. Korte reden.</div>
        ${g.map(m=>Jt(m)).join("")}
      </div>`:""}
      <div class="sec-hd">Vandaag</div>
      ${f.map(m=>va(m,t,d)).join("")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Niet in je start. Blijft bewaard.</div>
        ${K.map(m=>ea(m)).join("")}
        <button class="btn ghost later-add" data-nav="profiel">Eigen item</button>
      </div>
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${Qe(t.trend.word)}
          <div class="word">${t.trend.word}</div>
        </div>
      </div>
      ${o.error?`<p class="error" style="padding:0 18px">${u(o.error)}</p>`:""}
      ${r}`;return}if(o.screen==="koers"){F().innerHTML=`
      ${a}
      ${it(l.profile.themes,"Tik een suggestie of typ zelf. Geen vaste lijst. Later aan te passen.")}
      ${tt(Gt(l.items,l.events,$(),ne(l.items)))}
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
            <div class="val status">${Qe(t.trend.word)} ${t.trend.word}</div>
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
      ${ii(l.profile.horizon_1y,l.rotated)?'<div class="banner">Zet een 1-jaars B. Etappes roteren.</div>':""}
      <div class="sec-hd">${k("ik")} Ik</div>
      <div class="card">
        <div class="field">
          <div class="lbl">Leven dat ik weiger</div>
          <textarea data-id="identity_anti" maxlength="${_.identity_anti}">${u(l.profile.identity_anti??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wie ik word</div>
          <textarea data-id="identity_new" maxlength="${_.identity_new}">${u(l.profile.identity_new??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wat B niet mag schenden</div>
          <textarea data-id="identity_constraint" maxlength="${_.identity_constraint}">${u(l.profile.identity_constraint??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">1-jaars B</div>
          <textarea data-id="horizon_1y" maxlength="${_.horizon_1y}">${u(l.profile.horizon_1y??"")}</textarea>
        </div>
        <button class="btn primary" data-act="save-ik">Bewaar</button>
      </div>
      ${nt()}
      ${o.error?`<p class="error" style="padding:0 18px">${u(o.error)}</p>`:""}
      ${r}`;return}if(o.screen==="voortgang"){const d=Di(l.items,l.events,$(),l.vector.a,ne(l.items));F().innerHTML=`
      ${a}
      ${tt(d.week)}
      <div class="sec-hd">Lijn</div>
      <div class="card">
        <div class="note" style="margin-top:0">Huidige deze week. Geen score.</div>
        ${la(d.line.map(c=>c.current),$(),d.line)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Nu</div><div class="val">${j(t.current)}</div></div>
          <div><div class="lbl">Gedaan</div><div class="val">${d.hits}</div></div>
        </div>
      </div>
      ${oa(d.weight)}
      ${o.error?`<p class="error" style="padding:0 18px">${u(o.error)}</p>`:""}
      ${r}`;return}if(o.screen==="profiel"){const d=l.profile.goals??[],c=l.profile.age_band,v=Vn(l.items);F().innerHTML=`
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
      ${it(l.profile.themes,"Tik een suggestie of typ zelf. Later aan te passen.")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Parkeren of terughalen. Events blijven.</div>
        ${v.map(f=>ta(f)).join("")}
      </div>
      ${ia(l.items)}
      ${aa()}
      ${nt()}
      ${o.error?`<p class="error" style="padding:0 18px">${u(o.error)}</p>`:""}
      ${r}`;return}}function Yt(e){const t=G(e),n=Oi({plus:t.plus,done:t.done,skip:t.skip,type:e.type,track:Z(e)});return n?`<div class="confirm ${n.tone}" role="status">${u(n.text)}</div>`:""}function et(e){const t=G(e),n=t.logged||!!t.skip,i=e.type==="medicijn"?"Genomen":"Done",s=le(e);return`
      <div class="card stof">
        ${ze(e)}
        ${s?`<div class="note">${u(s)}</div>`:""}
        <div class="actions actions-two">
          <button class="btn ico-btn ${t.done?"track":""}" data-act="done" data-item="${e.id}" ${n?"disabled":""}>${k("done")}<span>${i}</span></button>
          <button class="btn ico-btn skip ${t.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${t.logged?"disabled":""}>${k("skip")}<span>Skip</span></button>
        </div>
        ${o.skipItemId===e.id||t.skip?`<div class="chips">${re.map(a=>`<button class="chip ${t.skip===a?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${a}">${a}</button>`).join("")}</div>`:""}
        ${Yt(e)}
      </div>`}function Zi(e,t,n,i){return`<div class="chips">${re.map(s=>`<button class="chip ${n===s?"on":""}" data-act="${i}" data-item="${e}" data-date="${t}" data-reason="${s}">${s}</button>`).join("")}</div>`}function Jt(e){const t=o.missKey===Ut(e.item.id,e.date)||!!e.reason;return`
      <div class="miss-row">
        <button class="miss-item" data-act="miss-open" data-item="${e.item.id}" data-date="${e.date}">
          <span class="ex-nm">${u(e.item.label)}</span>
          <span class="note">${e.reason?u(e.reason):z(e.date)}</span>
        </button>
        ${t?Zi(e.item.id,e.date,e.reason,"miss"):""}
      </div>`}function Xi(e){const t=[];return e.hits&&t.push(`${e.hits} gedaan`),e.skips&&t.push(`${e.skips} overgeslagen`),e.misses&&t.push(`${e.misses} niet gedaan`),t.length===0?"Nog geen dagen deze week.":t.join(" · ")}function Qi(e){return e==="skip"?"–":e==="miss"?"×":"·"}function tt(e){return`
      <div class="sec-hd">Week</div>
      <div class="card">
        <div class="note" style="margin-top:0">${u(e.range)}</div>
        <div class="week-strip" aria-label="Weekoverzicht">
          ${e.days.map(t=>`<div class="week-day ${t.mark}${t.date===$()?" today":""}">
            <span class="week-lbl">${t.label}</span>
            <span class="week-mark">${Qi(t.mark)}</span>
          </div>`).join("")}
        </div>
        <div class="note">${u(Xi(e))}</div>
        ${e.note?`<div class="week-note">${u(e.note)}</div>`:""}
        ${e.missRows.length?e.missRows.map(t=>Jt(t)).join(""):""}
      </div>`}function Zt(e){return dt(e)||O(e)?`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>`:`<div class="ex-nm">${u(e.label)}</div>`}function ea(e){return`
      <div class="later-row">
        ${Zt(e)}
        <button class="btn ghost later-now" data-act="later-now" data-item="${e.id}">Nu</button>
      </div>`}function ta(e){const t=e.later;return`
      <div class="later-row">
        <div>
          ${Zt(e)}
          <div class="note" style="margin-top:4px">${t?"Later":"Nu"}</div>
        </div>
        <button class="btn ghost later-now" data-act="${t?"later-now":"later-park"}" data-item="${e.id}">${t?"Nu":"Later"}</button>
      </div>`}function na(e){const t=Ie[wt(e)],n=$t(e);return`
      <div class="later-row">
        <div>
          <button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>
          <div class="note" style="margin-top:4px">${u(t)}${n?` · ${u(n)}`:""}</div>
        </div>
        <button class="btn ghost later-now" data-act="detail-open" data-item="${e.id}">Wijzig</button>
      </div>`}function ia(e){const t=Cn(e);return t.length===0?"":`
      <div class="sec-hd">Eigen items</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Label, type of tijd. Weg haalt het uit Vandaag. Log blijft.</div>
        ${t.map(n=>na(n)).join("")}
      </div>`}function nt(){return`
      <div class="card stack io-card">
        <button class="btn ghost ico-btn" data-act="export">${k("export")}<span>Exporteer JSON</span></button>
        <div class="note" style="margin-top:4px">Voegt toe. Bestaande rijen blijven.</div>
        <button class="btn ghost ico-btn" data-act="import-pick">${k("import")}<span>Kies bestand</span></button>
        <input data-id="import-file" class="import-file" type="file" accept="application/json,.json" />
        <div class="field">
          <div class="lbl">Of plak JSON</div>
          <textarea data-id="import-paste" placeholder='{"key":"routine_loop_v6"}'>${u(o.importPaste)}</textarea>
        </div>
        <button class="btn ghost ico-btn" data-act="import-go">${k("import")}<span>Importeer JSON</span></button>
      </div>`}function aa(){return`
      <div class="sec-hd">Eigen item</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Label, type, optioneel tijdstip. Geen dosis. Bestaande items blijven.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="item-label" type="text" maxlength="${Le}" placeholder="Bijv. Avondwandeling" autocomplete="off" enterkeyhint="done" value="${u(o.addLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${xe.map(e=>`<button class="chip pick ${o.addKind===e?"on":""}" data-act="item-kind" data-kind="${e}">${Ie[e]}</button>`).join("")}</div>
        <div class="field" style="margin-top:12px">
          <div class="lbl">Tijd</div>
          <input data-id="item-timing" type="text" maxlength="${Ee}" placeholder="22:00 of ochtend" autocomplete="off" enterkeyhint="done" value="${u(o.addTiming)}" />
        </div>
        <div class="stack">
          <button class="btn primary" data-act="item-add">Voeg toe</button>
        </div>
      </div>`}function sa(e){if(e.length===0)return"";const t=z(e[0].date),n=z(e[e.length-1].date);return t===n?t:`${t} – ${n}`}function ra(e){const i=zt(e.map(r=>r.kg),294,72);if(i.length===0)return"";const s=i.length-1,a=i.map((r,d)=>{const c=d===s;return`<circle class="${c?"prog-dot now":"prog-dot"}" cx="${r.x.toFixed(1)}" cy="${r.y.toFixed(1)}" r="${c?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${Pt(i)}" />
          ${a}
        </svg>`}function oa(e){if(e.length===0)return"";const t=e[e.length-1];return`
      <div class="sec-hd">Gewicht</div>
      <div class="card">
        <div class="note" style="margin-top:0">${u(sa(e))}</div>
        ${ra(e)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Laatst</div><div class="val">${t.kg.toFixed(1)} kg</div></div>
        </div>
      </div>`}function la(e,t,n){const a=zt(e,294,72);if(a.length===0)return'<div class="note">Nog geen lijn.</div>';const r=a.map((d,c)=>{const v=n[c]?.date===t;return`<circle class="${n[c]?.mark==="miss"?"prog-dot miss":v?"prog-dot now":"prog-dot"}" cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${v?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${Pt(a)}" />
          ${r}
        </svg>`}function it(e,t){return`
      <section class="theme-sec" data-sec="themes">
        <div class="sec-hd">Thema's</div>
        <div class="card">
          <div class="ex-nm">Trainingsrichting</div>
          <div class="note">${u(t)}</div>
          ${Tt(e)}
        </div>
      </section>`}function da(e){if(!l)return"";const t=l.profile.goals??[],n=l.profile.age_band,i=Yn(l.items,t),s=o.startIds,a=`
    <div class="hdr">
      <div>
        ${Vt()}
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
      </div>`;if(e==="themes"){const r=l.profile.themes??[];return`
      ${a}
      <div class="sec-hd">Thema's</div>
      <div class="card">
        <div class="ex-nm">Trainingsrichting</div>
        <div class="note">Tik een suggestie of typ zelf. Mag leeg. Later aan te passen.</div>
        ${Tt(r)}
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-themes-done">Verder</button>
        </div>
      </div>`}return`
    ${a}
    <div class="sec-hd">Start</div>
    <div class="card">
      <div class="ex-nm">Max ${ie} nu</div>
      <div class="note">De rest gaat naar Later. Later blijft zichtbaar.</div>
      <div class="chips">${i.map(r=>`<button class="chip pick ${s.includes(r.id)?"on":""}" data-act="onboard-start" data-item="${r.id}">${u(r.label)}</button>`).join("")}</div>
      <div class="note">${s.length} / ${ie} gekozen</div>
      <div class="stack" style="margin-top:16px">
        <button class="btn primary" data-act="onboard-done" ${s.length===0?"disabled":""}>Naar Vandaag</button>
      </div>
    </div>`}function ze(e){return!dt(e)&&!O(e)?`<div class="ex-nm">${u(e.label)}</div>`:`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>`}function ca(e){return`<button class="chip pick" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>`}function ua(e){const t=he(e),n=le(e),i=Sn(e.timing),s=In(e.timing),a=ht(e),r=$e(e),d=W(e),c=O(e);return`
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
      </div>
      ${t?`<div class="sec-hd">Bron</div>
      <div class="card quiet">
        <div class="src-tag">${u(t)}</div>
      </div>`:""}
      ${c?fa():ma(e)}`}function fa(){return`
      <div class="sec-hd">Wijzig</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Zelfde item. Geen dosis. Log blijft.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="edit-label" type="text" maxlength="${Le}" placeholder="Naam" autocomplete="off" enterkeyhint="done" value="${u(o.editLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${xe.map(e=>`<button class="chip pick ${o.editKind===e?"on":""}" data-act="edit-kind" data-kind="${e}">${Ie[e]}</button>`).join("")}</div>
        <div class="field" style="margin-top:12px">
          <div class="lbl">Tijd</div>
          <input data-id="edit-timing" type="text" maxlength="${Ee}" placeholder="22:00 of ochtend" autocomplete="off" enterkeyhint="done" value="${u(o.editTiming)}" />
        </div>
        <div class="stack">
          <button class="btn primary" data-act="item-save">Bewaar</button>
          ${o.removeAsk?`<div class="note">Weg uit Vandaag. Log blijft.</div>
          <button class="btn primary" data-act="item-remove">Bevestig</button>
          <button class="btn ghost" data-act="item-remove-cancel">Niet nu</button>`:'<button class="btn ghost" data-act="item-remove-ask">Weg</button>'}
        </div>
      </div>`}function ma(e){return Ae(e)?e.later?`
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
      </div>`:""}function pa(e){const t=le(e);return`
      <div class="card quiet">
        ${ze(e)}
        ${t?`<div class="note">${u(t)}</div>`:'<div class="note">Regel. Geen afvinken.</div>'}
      </div>`}function va(e,t,n){const i=G(e),s=Z(e),a=i.logged||!!i.skip,r=s&&i.current!==null&&e.b!==null&&i.current>=e.b,d=a||r,c=s,v=ht(e),f=le(e),y=c&&t.suggestedMilestone&&e.id===l.vector.id;return`
      <div class="card">
        ${ze(e)}
        ${f&&!v&&!s?`<div class="note">${u(f)}</div>`:""}
        ${s?`<div class="track">
          <span class="now">${j(i.current??e.a??0)}</span>
          <span>→</span>
          <span class="mid">${j(e.milestone??0)}</span>
          <span>→</span>
          <span class="end">${j(e.b??0)}</span>
        </div>`:v?`<div class="work">${u(v)}</div>`:""}
        <div class="actions ${s?"":"actions-two"}">
          ${s?`<button class="btn ico-btn ${i.plus?"on":""}" data-act="plus" data-item="${e.id}" ${d?"disabled":""}>${k("plus")}<span>+1</span></button>`:""}
          <button class="btn ico-btn ${i.done?"track":""}" data-act="done" data-item="${e.id}" ${a?"disabled":""}>${k("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${i.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${i.logged?"disabled":""}>${k("skip")}<span>Skip</span></button>
        </div>
        ${o.skipItemId===e.id||i.skip?`<div class="chips">${re.map(b=>`<button class="chip ${i.skip===b?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${b}">${b}</button>`).join("")}</div>`:""}
        ${Yt(e)}
        ${y?`<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${j(t.suggestedMilestone)}.</div>
               ${o.advanceWarn&&l.profile.identity_constraint?`<div class="banner">Check: ${u(l.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${j(t.suggestedMilestone)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`:`<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${t.suggestedMilestone}">Volgende etappe ${j(t.suggestedMilestone)}</button>
                      </div>`}`:""}
        ${c&&n?`<div class="note">${u(n)}</div>`:""}
      </div>`}function j(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function E(e){if(!o.busy){o.busy=!0,o.error=null;try{await e()}catch(t){o.error=t instanceof Error?t.message:"Er ging iets mis"}finally{o.busy=!1,w()}}}async function ga(e){p=e,l=await p.load(),o.screen="vandaag",w()}async function ya(){Yi(),ba(),await ga(qi())}function ba(){document.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const t=e.target;if(t instanceof HTMLInputElement){if(t.dataset.id==="theme-custom"){e.preventDefault(),an();return}if(t.dataset.id==="item-label"||t.dataset.id==="item-timing"){e.preventDefault(),nn();return}if(t.dataset.id==="edit-label"||t.dataset.id==="edit-timing"){e.preventDefault(),tn();return}t.dataset.id==="weight"&&(e.preventDefault(),st(t.value))}}),document.addEventListener("change",e=>{const t=e.target;if(t instanceof HTMLInputElement&&(t.dataset.id==="weight"&&st(t.value),t.dataset.id==="import-file"&&t.files?.[0])){const n=t.files[0];t.value="",n.text().then(i=>Xt(i))}}),document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(on(n)){o.screen=n,o.skipItemId=null,o.missKey=null,o.detailItemId=null,o.advanceWarn=!1,o.error=null,w();return}ka(t)})}async function ka(e){const t=e.dataset.act;if(!t)return;const n=M("import-paste");if(n!==null&&(o.importPaste=n),!p||!l)return;const i=Ge(),s=$();if(t==="sleep-inc"||t==="sleep-dec"){const a=i.sleep??7,r=Math.max(0,Math.min(14,a+(t==="sleep-inc"?.5:-.5)));await C({date:s,kind:"body_sleep",value:r,skip_reason:null,item_id:null});return}if(t==="energy"){const a=Number(e.dataset.n),r=i.energy===a?null:a;if(r===null)return;await C({date:s,kind:"body_energy",value:r,skip_reason:null,item_id:null});return}if(t==="weight-inc"||t==="weight-dec"){const a=hi(i.weight,ki(l.events),t==="weight-inc"?.1:-.1);if(i.weight===a)return;await C({date:s,kind:"body_weight",value:a,skip_reason:null,item_id:null});return}if(t==="plus"){const a=l.items.find(d=>d.id===e.dataset.item);if(!a||!Z(a))return;const r=G(a);if(r.logged||r.skip||a.b!==null&&r.current!==null&&r.current>=a.b)return;await C({date:s,kind:"set",value:(r.current??a.a??0)+1,skip_reason:null,item_id:a.id});return}if(t==="done"){const a=l.items.find(d=>d.id===e.dataset.item);if(!a)return;const r=G(a);if(r.logged||r.skip)return;await C({date:s,kind:"done",value:r.current??a.a,skip_reason:null,item_id:a.id});return}if(t==="detail-open"){const a=e.dataset.item??null,r=a?l.items.find(d=>d.id===a):void 0;if(!r)return;en(r),o.detailItemId=r.id,w();return}if(t==="detail-close"){o.detailItemId=null,w();return}if(t==="skip-open"){const a=e.dataset.item??null;o.skipItemId=o.skipItemId===a?null:a,w();return}if(t==="skip"){const a=l.items.find(c=>c.id===e.dataset.item);if(!a||G(a).logged)return;const d=e.dataset.reason;if(!Pe(d))return;await C({date:s,kind:"skip",value:null,skip_reason:d,item_id:a.id}),o.skipItemId=null;return}if(t==="miss-open"){const a=e.dataset.item,r=e.dataset.date;if(!a||!r)return;const d=Ut(a,r);o.missKey=o.missKey===d?null:d,w();return}if(t==="miss"){const a=l.items.find(v=>v.id===e.dataset.item),r=e.dataset.date,d=e.dataset.reason;if(!a||!r||r>=s||!Pe(d))return;const c=G(a,r);if(c.logged||c.skip)return;await C({date:r,kind:"miss",value:null,skip_reason:d,item_id:a.id}),o.missKey=null;return}if(t==="advance"){if(!i.suggestedMilestone)return;if(ni(l.profile.identity_constraint)&&!o.advanceWarn){o.advanceWarn=!0,w();return}await at(i.suggestedMilestone);return}if(t==="advance-go"){if(!i.suggestedMilestone)return;await at(i.suggestedMilestone);return}if(t==="advance-cancel"){o.advanceWarn=!1,w();return}if(t==="onboard-goal"){const a=e.dataset.goal;if(!a||!St(a))return;const r={...l.profile,goals:Zn(l.profile.goals??[],a)};await E(async()=>{await p.saveProfile(r),l.profile=r});return}if(t==="onboard-age"){const a=e.dataset.age;if(!a||!It(a))return;const r={...l.profile,age_band:a};await E(async()=>{await p.saveProfile(r),l.profile=r});return}if(t==="theme-toggle"){const a=e.dataset.theme;if(!a)return;await ye(ai(N(l.profile.themes),a));return}if(t==="theme-add"){await an();return}if(t==="onboard-start"){const a=e.dataset.item;if(!a)return;o.startIds=Xn(o.startIds,a),w();return}if(t==="onboard-next"){w();return}if(t==="onboard-themes-done"){await ye(l.profile.themes??[],!0);return}if(t==="onboard-done"){const a=l.profile.age_band,r=l.profile.goals??[];if(!a||r.length===0||o.startIds.length===0)return;await E(async()=>{await p.saveOnboarding({goals:r,age_band:a,startIds:o.startIds}),l=await p.load(),o.screen="vandaag"});return}if(t==="later-now"||t==="later-park"){const a=e.dataset.item;if(!a)return;await E(async()=>{await p.setItemLater(a,t==="later-park"),l=await p.load()});return}if(t==="item-kind"){const a=e.dataset.kind;if(!Fe(a))return;Qt(),o.addKind=a,w();return}if(t==="item-add"){await nn();return}if(t==="edit-kind"){const a=e.dataset.kind;if(!Fe(a))return;ge(),o.editKind=a,w();return}if(t==="item-save"){await tn();return}if(t==="item-remove-ask"){ge(),o.removeAsk=!0,w();return}if(t==="item-remove-cancel"){o.removeAsk=!1,w();return}if(t==="item-remove"){const a=o.detailItemId;if(!a)return;await E(async()=>{await p.removeItem(a),l=await p.load(),o.detailItemId=null,o.removeAsk=!1,o.screen="profiel"});return}if(t==="save-ik"){const a={...l.profile,identity_anti:A(M("identity_anti"),_.identity_anti),identity_new:A(M("identity_new"),_.identity_new),identity_constraint:A(M("identity_constraint"),_.identity_constraint),horizon_1y:A(M("horizon_1y"),_.horizon_1y)};await E(async()=>{await p.saveProfile(a),l.profile=a});return}if(t==="export"){cn(l);return}if(t==="import-pick"){document.querySelector("[data-id=import-file]")?.click();return}if(t==="import-go"){await Xt(o.importPaste);return}}async function Xt(e){const t=e.trim();if(!t){o.error=J,w();return}await E(async()=>{l=await p.importJson(t),o.importPaste=""})}function Qt(){o.addLabel=M("item-label")??o.addLabel,o.addTiming=M("item-timing")??o.addTiming}function ge(){o.editLabel=M("edit-label")??o.editLabel,o.editTiming=M("edit-timing")??o.editTiming}function en(e){o.editLabel=e.label,o.editKind=wt(e),o.editTiming=$t(e),o.removeAsk=!1}async function tn(){!p||!l||!o.detailItemId||(ge(),await E(async()=>{const e=await p.updateItem({id:o.detailItemId,label:o.editLabel,kind:o.editKind,timing:o.editTiming});l=await p.load(),en(e),o.detailItemId=e.id}))}async function nn(){!p||!l||(Qt(),await E(async()=>{await p.addItem({label:o.addLabel,kind:o.addKind,timing:o.addTiming}),l=await p.load(),o.addLabel="",o.addTiming=""}))}async function an(){if(!l)return;const e=M("theme-custom")??"",t=N(l.profile.themes),n=si(t,e);n.length===t.length&&n.every((i,s)=>i===t[s])||await ye(n)}async function ye(e,t=!1){if(!p||!l)return;const n=N(e),i={...l.profile,themes:n},s=t||!xt(l);await E(async()=>{if(s){await p.saveThemes(n),l=await p.load();return}await p.saveProfile(i),l.profile=i})}function M(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function at(e){await E(async()=>{l.stage=await p.advanceStage(l.stage,e),l.items=l.items.map(t=>t.id===l.stage.vector_id?{...t,milestone:e}:t),l.rotated=!0,o.advanceWarn=!1})}async function C(e){await E(async()=>{const t=await p.addEvent(e);l.events.push(t)})}async function st(e){if(!p||!l)return;const t=wi(e);t!==null&&Ge().weight!==t&&await C({date:$(),kind:"body_weight",value:t,skip_reason:null,item_id:null})}ya();
