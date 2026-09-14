(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();const ue=["geen tijd","geen energie","vergeten","geen zin","pijn"];function Ve(e){return!!(e&&ue.includes(e))}const mn=["guideline","evidence-informed","public-framework","user preference","hypothesis"],pn=["vandaag","koers","voortgang","profiel"];function vn(e){return!!(e&&pn.includes(e))}const w={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},fe="routine_loop_v6",ft=["routine_loop_v5","routine_loop_v4","routine_loop_v3"],Ue="routine_local_user_id",Ye="routine_local_tenant_id",gn="routine_local_chosen";function yn(e){return JSON.stringify({exported_at:new Date().toISOString(),key:fe,profile:e.profile,items:e.items,vector:e.vector,stage:e.stage,events:e.events,rotated:e.rotated,onboarded:e.onboarded,theme_step:e.theme_step},null,2)}function bn(e){const t=new Blob([yn(e)],{type:"application/json"}),n=URL.createObjectURL(t),i=document.createElement("a");i.href=n,i.download=`routine-${e.profile.id.slice(0,8)}.json`,i.click(),URL.revokeObjectURL(n)}const mt=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],pt=["zo","ma","di","wo","do","vr","za"];function b(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${i}`}function N(e,t){const n=K(e);return n.setDate(n.getDate()+t),b(n)}function K(e){const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)}function kn(e){const t=K(e);return`${pt[t.getDay()]} ${t.getDate()} ${mt[t.getMonth()]}`}function z(e){const t=K(e);return`${t.getDate()} ${mt[t.getMonth()]}`}function hn(e){return pt[K(e).getDay()]}function wn(e){const t=K(e).getDay();return t===0?7:t}function we(e){const t=K(e),n=t.getDay(),i=n===0?-6:1-n;return t.setDate(t.getDate()+i),b(t)}function $e(e,t){const n=[];let i=e;for(;i<=t;)n.push(i),i=N(i,1);return n}function W(){return crypto.randomUUID()}function $n(){return new Date().toISOString()}function _n(e){return e.trim().toLowerCase().normalize("NFC")}function xn(e){return!!(e&&mn.includes(e))}function Sn(e){const t=_n(e);return t==="cafeïne 90 min na opstaan"?"public-framework":t==="wandelen na eten"?"evidence-informed":t==="low carb"||t==="scherm uit 22:00"||t==="korte rust"?"user preference":t==="vitamine d"?"guideline":t==="koud douchen"?"hypothesis":null}function _e(e){return Sn(e.label)??(xn(e.template)?e.template:null)}function vt(e){return _e(e)!==null}function se(){return{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:null,condition:null}}function In(e){return{mode:e?.mode??null,clock:e?.clock??null,anchor:e?.anchor??null,offset_min:e?.offset_min??null,window_min:e?.window_min??null,frequency:e?.frequency??null,condition:e?.condition??null}}function gt(e){return e.trim().toLowerCase().normalize("NFC")}function Ln(e){return gt(e)==="korte rust"?{mode:"clock",clock:"08:00",window_min:840,frequency:"daily",condition:"body"}:null}function En(e,t){const n=Ln(t);return n?{...e,...n}:e}function yt(e){return{now:e.now??new Date,today:e.today,wakeAt:e.wakeAt??null,mealAt:e.mealAt??null,sleepSet:!!e.sleepSet,energySet:!!e.energySet}}function xe(e){const t=e?.trim().toLowerCase();return t==="body"||t==="energy|sleep"?"body":t==="energy"?"energy":t==="sleep"?"sleep":null}function Tn(e,t){const n=xe(e.condition);if(!n)return!0;const i=!!t.sleepSet,s=!!t.energySet;return n==="energy"?s:n==="sleep"?i:i||s}function bt(e,t){const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(!n)return null;const i=Number(n[1]),s=Number(n[2]);if(i>23||s>59)return null;const a=K(e);return a.setHours(i,s,0,0),a}function Mn(e,t){return e==="wake"?t.wakeAt:e==="meal"?t.mealAt:null}function An(e,t){if(e.mode==="clock"&&e.clock)return bt(t.today,e.clock);if(e.mode==="relative"&&e.anchor&&e.offset_min!==null){const n=Mn(e.anchor,t);return n?new Date(n.getTime()+e.offset_min*6e4):null}return null}function kt(e,t){return!t||e.window_min===null?null:new Date(t.getTime()+e.window_min*6e4)}function ht(e,t){if(e.timing.frequency==="weekly"||e.type==="weekly"){const i=e.weekdays??[];return i.length===0?!1:i.includes(wn(t))}return!0}function P(e){return Ie(e)==="constraint"}function Se(e){return Ie(e)==="preference"}function wt(e){return!P(e)&&!Se(e)}function jn(e,t){if(P(e))return"silent";if(!ht(e,t.today)||!Tn(e.timing,t))return"hidden";const n=e.timing;if(!n.mode)return"due";const i=An(n,t);if(n.mode==="relative"&&!i)return"due";if(i&&t.now<i)return"wait";const s=kt(n,i);return s&&t.now>s?"closed":"due"}function re(e,t){const n=jn(e,t);return!(n==="hidden"||n==="closed"||n==="wait"&&e.timing.window_min!==null)}function Je(e){return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`}function Bn(e){if(e.window_min===null)return null;if(e.mode==="clock"&&e.clock){const t=bt("2000-01-01",e.clock);if(!t)return null;const n=kt(e,t);return n?`${Je(t)}–${Je(n)}`:null}return`${e.window_min} min`}function Nn(e){const t=xe(e.condition);return t==="body"?"na slaap of energie":t==="energy"?"na energie":t==="sleep"?"na slaap":null}function me(e){const t=e.timing;return xe(t.condition)?null:t.condition?t.condition:t.mode==="relative"&&t.anchor==="wake"&&t.offset_min!==null?`${t.offset_min} min na opstaan`:t.mode==="relative"&&t.anchor==="meal"?"na eten":t.mode==="clock"&&t.clock?t.clock:null}function Ie(e){if(e.role)return e.role;const t=gt(e.label);return t==="low carb"?"preference":t==="cafeïne 90 min na opstaan"||t==="scherm uit 22:00"?"constraint":null}const Le=["gedrag","regel","medicijn","supplement","sociaal"],Ee={gedrag:"gedrag",regel:"leefregel",medicijn:"medicijn",supplement:"supplement",sociaal:"sociaal"},Te={gedrag:"Gedrag",regel:"Regel",medicijn:"Medicijn",supplement:"Supplement",sociaal:"Sociaal"},Me=40,Ae=40;function Ze(e){return!!(e&&Le.includes(e))}function Q(e){return e.a!==null&&e.b!==null&&e.milestone!==null}function Cn(e,t){return ht(e,t)}function Dn(e,t){return{...e,tenant_id:e.tenant_id??t,weekdays:e.weekdays??null,times_per_week:e.times_per_week??null,timing:En(In(e.timing),e.label),role:Ie(e),template:_e(e),later:!!e.later,removed:!!e.removed}}function je(e){return e.type==="medicijn"||e.type==="supplement"}function $t(e){return e.type==="sociaal"}function _t(e,t){return V(e,t).filter(n=>wt(n)&&!je(n)&&!$t(n)&&!n.later)}function On(e,t){return V(e,t).filter(n=>Se(n)&&!n.later)}function Kn(e,t){return V(e,t).filter(n=>P(n)&&!n.later)}function xt(e,t){return V(e,t).filter(n=>je(n)&&!n.later)}function St(e,t){return V(e,t).filter(n=>$t(n)&&!n.later)}function Rn(e,t){return V(e,t).filter(n=>n.later&&(wt(n)||P(n)))}function V(e,t){return e.filter(n=>!n.removed&&Cn(n,t)).sort((n,i)=>n.sort-i.sort)}function U(e){return e.find(Q)}function ge(e){return e.kind==="body_sleep"||e.kind==="body_energy"||e.kind==="body_weight"||e.kind==="body_wake"}function Y(e,t,n){return e.filter(i=>ge(i)?!1:!!(i.item_id===t.id||i.item_id===null&&n&&t.id===n))}function Gn(e,t){return t?[...e.filter(ge),...Y(e,t,t.id)]:e.filter(ge)}function It(e){return e.a===null?null:e.unit==="sec"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} s`:e.unit==="reps"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} reps`:String(e.a)}function E(e){return e.trim().toLowerCase()}function q(e){const t=e.trim().replace(/\s+/g," ").slice(0,Me);return t.length>0?t:null}function Be(e){const t=e.trim().replace(/\s+/g," ").slice(0,Ae);if(!t)return se();const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(n){const i=Number(n[1]),s=Number(n[2]);if(i<=23&&s<=59)return{...se(),mode:"clock",clock:`${String(i).padStart(2,"0")}:${n[2]}`,frequency:"daily"}}return{...se(),frequency:"daily",condition:t}}function zn(e){return e.reduce((t,n)=>Math.max(t,n.sort),-1)+1}const Wn=["Push-ups","Squats","Plank","Dead hang","Gerichte kracht","Koud douchen","Niet snoepen","Low carb","Intermittent fasting","Geen alcohol","Cafeïne 90 min na opstaan","Wandelen na eten","Medicijn ochtend","Vitamine D","Bellen met iemand","Iemand zien","Scherm uit 22:00","Korte rust"];function pe(e){const t=E(e);return Wn.some(n=>E(n)===t)}function Ne(e){return pe(e.label)}function R(e){return!Ne(e)}function H(e){return!!e.removed}function Pn(e){return e.filter(t=>R(t)&&!H(t)).sort((t,n)=>t.sort-n.sort)}function Lt(e){return e.type==="leefregel"?"regel":e.type==="medicijn"?"medicijn":e.type==="supplement"?"supplement":e.type==="sociaal"?"sociaal":"gedrag"}function Et(e){return e.timing.mode==="clock"&&e.timing.clock?e.timing.clock:e.timing.condition??""}function qn(e,t){const n=q(t);return n?!e.some(i=>!H(i)&&E(i.label)===E(n)):!1}function Hn(e,t,n){const i=q(n);return!i||pe(i)?!1:!e.some(s=>s.id!==t&&!H(s)&&E(s.label)===E(i))}function Fn(e,t){const n=q(t);if(n)return e.find(i=>H(i)&&R(i)&&E(i.label)===E(n))}function Vn(e){const t=q(e.label);return t?{id:W(),tenant_id:e.tenantId,type:Ee[e.kind],label:t,unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:e.sort,timing:Be(e.timing??""),role:"action",template:"user preference",later:!!e.later,removed:!1}:null}function Un(e,t){if(!R(e)||H(e))return null;const n=q(t.label);return!n||pe(n)?null:{...e,type:Ee[t.kind],label:n,timing:Be(t.timing??""),template:"user preference"}}function Yn(e,t){if(!R(e)||!H(e))return null;const n=q(t.label);return!n||pe(n)?null:{...e,type:Ee[t.kind],label:n,timing:Be(t.timing??""),template:"user preference",later:!1,removed:!1}}function Jn(e){return H(e)?{item:e,mode:"removed"}:R(e)?{item:{...e,removed:!0},mode:"removed"}:Ne(e)?{item:{...e,later:!0},mode:"parked"}:null}function Zn(e){const t=new Set,n=[];for(const i of e){const s=E(i.label);t.has(s)||(t.add(s),n.push(i))}return n}function Ce(e,t,n){const i=Zn(e),s=new Set(i.map(r=>E(r.label))),a=t.filter(r=>!s.has(E(r.label))).map(r=>({...r,tenant_id:n}));return[...i,...a]}function Tt(e){const t=new Map;for(const n of e)for(const i of n)t.has(i.id)||t.set(i.id,i);return[...t.values()].sort((n,i)=>n.created_at.localeCompare(i.created_at))}function Xn(e){return e?!!(e.identity_anti||e.identity_new||e.identity_constraint||e.horizon_1y||e.display_name):!1}function Qn(e,t,n,i){if(e.length===0)return null;const s=e.reduce((u,y)=>(y.events?.length??0)>(u.events?.length??0)?y:u),a=e.find(u=>Xn(u.profile))?.profile??s.profile,r=Ce([s,...e.filter(u=>u!==s)].flatMap(u=>u.items??[]),t,i),d=new Map(r.map(u=>[E(u.label),u.id])),c=new Map;for(const u of e)for(const y of u.items??[]){const k=d.get(E(y.label));k&&y.id!==k&&c.set(y.id,k)}const g=Tt(e.map(u=>u.events??[])).map(u=>{if(!u.item_id)return u;const y=c.get(u.item_id);return y?{...u,item_id:y}:u});return{...s,profile:{...a,id:a.id||n,tenant_id:a.tenant_id||i},items:r,events:g}}const le=3,De=[{id:"kracht",label:"Kracht"},{id:"eten",label:"Eten & drinken"},{id:"slaap",label:"Slaap"},{id:"stofjes",label:"Stofjes"},{id:"bewegen",label:"Bewegen"}],Oe=["18–29","30–39","40–49","50–59","60+"],ei={kracht:["Push-ups","Squats","Plank","Dead hang"],eten:["Niet snoepen","Low carb","Intermittent fasting","Geen alcohol"],slaap:["Koud douchen"],stofjes:["Medicijn ochtend","Vitamine D"],bewegen:["Wandelen na eten"]};function Ke(e){return P(e)||e.type==="weekly"?!1:e.type==="daily"||e.type==="leefregel"||e.type==="gedrag"||e.type==="sociaal"||je(e)}function ti(e){return e.filter(t=>t.removed?!1:Ke(t)?!0:P(t)&&t.later).sort((t,n)=>t.sort-n.sort)}function Mt(e){return!(e.onboarded!==!1||(e.events??[]).length>0)}function ni(e){return Mt(e)?e.profile.goals?.length?e.profile.age_band?e.theme_step!==!0?"themes":"start":"age":"goals":null}function ii(e,t){const n=e.filter(Ke).sort((a,r)=>a.sort-r.sort);if(t.length===0)return n;const i=new Set(t.flatMap(a=>ei[a]??[])),s=n.filter(a=>i.has(a.label));return s.length>0?s:n}function ai(e,t){const n=new Set(t.slice(0,le));return e.map(i=>Ke(i)?{...i,later:!n.has(i.id)}:{...i,later:!1})}function si(e,t){return e.includes(t)?e.filter(n=>n!==t):[...e,t]}function ri(e,t){return e.includes(t)?e.filter(n=>n!==t):e.length>=le?e:[...e,t]}function At(e){return De.some(t=>t.id===e)}function jt(e){return Oe.includes(e)}const oi="geen zin",x={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140};function A(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function li(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===oi).length}function di(e,t){const n=A(e,x.identity_new);return!n||li(t)<2?null:n}function ci(e){return!!A(e,x.identity_constraint)}function ui(e,t){return t&&!A(e,x.horizon_1y)}function Bt(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const Xe=["Military calisthenics","Kickbox","Spinnen"],Nt=40;function Re(e){const t=e.trim().replace(/\s+/g," ").slice(0,Nt);return t.length>0?t:null}function C(e){if(!Array.isArray(e))return[];const t=new Set,n=[];for(const i of e){if(typeof i!="string")continue;const s=Re(i);if(!s)continue;const a=s.toLowerCase();t.has(a)||(t.add(a),n.push(s))}return n}function fi(e,t){const n=Re(t);if(!n)return e;const i=n.toLowerCase();return e.some(s=>s.toLowerCase()===i)?e.filter(s=>s.toLowerCase()!==i):[...e,n]}function mi(e,t){const n=Re(t);if(!n)return e;const i=n.toLowerCase();return e.some(s=>s.toLowerCase()===i)?e:[...e,n]}function pi(e){const n=C(e).filter(i=>!Xe.some(s=>s.toLowerCase()===i.toLowerCase()));return[...Xe,...n]}function Qe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function Ct(e){const t=new Set(C(e).map(i=>i.toLowerCase()));return`<div class="chips">${pi(e).map(i=>`<button class="chip pick ${t.has(i.toLowerCase())?"on":""}" data-act="theme-toggle" data-theme="${Qe(i)}">${Qe(i)}</button>`).join("")}</div>
        <div class="theme-add">
          <input data-id="theme-custom" type="text" maxlength="${Nt}" placeholder="Eigen thema" autocomplete="off" enterkeyhint="done" />
          <button class="btn ghost" data-act="theme-add">Voeg toe</button>
        </div>`}const X="Ongeldig bestand. Geen Routine-export.";function de(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function vi(e){return e==null||e===fe?!0:ft.includes(String(e))}function gi(e){return de(e)&&typeof e.id=="string"&&e.id.length>0&&typeof e.label=="string"}function yi(e){return de(e)&&typeof e.id=="string"&&e.id.length>0&&typeof e.date=="string"&&typeof e.kind=="string"}function et(e){return e.trim().toLowerCase()}function Z(e,t){const n=e?.trim();if(n)return e??n;const i=t?.trim();return i?t??i:null}function bi(e,t){const n=[],i=new Set;for(const s of[e,t].flatMap(a=>Array.isArray(a)?a:[]))typeof s!="string"||!At(s)||i.has(s)||(i.add(s),n.push(s));return n}function ki(e,t,n){const i=new Map(t.map(a=>[et(a.label),a.id])),s=new Map;for(const a of n){const r=i.get(et(a.label));r&&a.id!==r&&s.set(a.id,r)}return e.map(a=>{if(!a.item_id)return a;const r=s.get(a.item_id);return r?{...a,item_id:r}:a})}function hi(e){let t;try{t=JSON.parse(e)}catch{throw new Error(X)}if(!de(t)||!vi(t.key))throw new Error(X);if(!de(t.profile)||!Array.isArray(t.items)||!Array.isArray(t.events))throw new Error(X);if(!t.items.every(gi)||!t.events.every(yi))throw new Error(X);return{profile:t.profile,items:t.items,events:t.events,onboarded:typeof t.onboarded=="boolean"?t.onboarded:void 0,theme_step:typeof t.theme_step=="boolean"?t.theme_step:void 0}}function wi(e,t){return{...e,display_name:Z(e.display_name,t.display_name),identity_anti:A(Z(e.identity_anti,t.identity_anti),x.identity_anti),identity_new:A(Z(e.identity_new,t.identity_new),x.identity_new),identity_constraint:A(Z(e.identity_constraint,t.identity_constraint),x.identity_constraint),horizon_1y:A(Z(e.horizon_1y,t.horizon_1y),x.horizon_1y),age_band:e.age_band??(t.age_band&&jt(t.age_band)?t.age_band:null),goals:bi(e.goals,t.goals),themes:C([...e.themes??[],...t.themes??[]])}}function $i(e,t){const n=e.profile.tenant_id,i=Ce(e.items,t.items,n),s=ki(t.events,i,t.items).map(a=>({...a,tenant_id:n,user_id:e.profile.id}));return{...e,profile:wi(e.profile,t.profile),items:i,events:Tt([e.events,s]),onboarded:!!(e.onboarded||t.onboarded),theme_step:!!(e.theme_step||t.theme_step)}}const _i=2,xi=6;function J(e,t){return e.created_at.localeCompare(t.created_at)}function ee(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(J).at(-1)}function Dt(e,t){return t.filter(i=>i.kind==="set").sort(J).at(-1)?.value??e}function Ge(e,t){return ee(e,t,"body_sleep")?.value??null}function ze(e,t){return ee(e,t,"body_energy")?.value??null}const Ot=40,Kt=250,Si=80;function Ii(e,t){return ee(e,t,"body_weight")?.value??null}function Li(e){return e.filter(t=>t.kind==="body_weight"&&t.value!==null).sort(J).at(-1)?.value??null}function Ei(e,t,n){return Math.round(Math.max(Ot,Math.min(Kt,(e??t??Si)+n))*10)/10}function Ti(e){const t=e.trim().replace(",",".");if(!t)return null;const n=Number(t);return Number.isFinite(n)?Math.round(Math.max(Ot,Math.min(Kt,n))*10)/10:null}const te=0,ne=1439,Mi=420;function We(e,t){const n=ee(e,t,"body_wake")?.value;return n==null||!Number.isFinite(n)?null:Math.max(te,Math.min(ne,Math.round(n)))}function Ai(e){const t=e.filter(n=>n.kind==="body_wake"&&n.value!==null).sort(J).at(-1)?.value;return t==null||!Number.isFinite(t)?null:Math.max(te,Math.min(ne,Math.round(t)))}function ji(e,t,n){return Math.max(te,Math.min(ne,(e??t??Mi)+n))}function Bi(e){const t=e.trim();if(!t)return null;const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(!n)return null;const i=Number(n[1]),s=Number(n[2]);return i>23||s>59?null:i*60+s}function Ni(e){const t=Math.max(te,Math.min(ne,Math.round(e))),n=Math.floor(t/60),i=t%60;return`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}`}function Rt(e,t){if(t===null)return null;const[n,i,s]=e.split("-").map(Number);if(!n||!i||!s)return null;const a=new Date(n,i-1,s),r=Math.max(te,Math.min(ne,Math.round(t)));return a.setHours(Math.floor(r/60),r%60,0,0),a}function Ci(e){return e==="set"||e==="done"||e==="skip"}function Gt(e,t){return e.date===t&&Ci(e.kind)}function Pe(e,t){return e.filter(n=>Gt(n,t)).sort(J).at(-1)}function ie(e,t){return Pe(e,t)}function zt(e,t){const n=ie(e,t);return n?.kind==="skip"?n.skip_reason:null}function Wt(e,t){return ie(e,t)?.kind==="done"}function Pt(e,t){return ie(e,t)?.kind==="set"}function qt(e,t){const n=ie(e,t);return n?.kind==="set"||n?.kind==="done"}function Di(e,t){return e!==null&&e<xi||t!==null&&t<=_i}function Oi(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const i=Math.max(1,Math.ceil(n/2));return Math.min(t,e+i)}function ce(e,t,n,i){if(t<i)return"empty";const s=ie(e,t);return s?.kind==="done"||s?.kind==="set"?"done":s?.kind==="skip"?"skip":ee(e,t,"miss")?"miss":t>=n?"empty":"miss"}function Ki(e,t,n="1970-01-01"){let i=0,s=t;for(let a=0;a<400;a+=1){const r=ce(e,s,t,n);if(r==="done")i+=1;else if(r==="skip"||r==="empty"&&s===t){s=N(s,-1);continue}else break;s=N(s,-1)}return i}function Ri(e,t,n){const i=we(t),s=!n||n<i?i:n;let a=0,r=0;for(const d of $e(s,t)){const c=ce(e,d,t,n??s);c==="skip"||c==="empty"||(r+=1,c==="done"&&(a+=1))}return{hits:a,eligible:r}}function Gi(e,t,n="1970-01-01",i=3){const s=ce(e,t,t,n);if(s==="done"||s==="skip")return!1;const a=N(t,-1);if(a<n)return!1;const r=N(t,-i),d=n>r?n:r;return $e(d,a).some(c=>ce(e,c,t,n)==="miss")}function zi(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled&&!e.todayLogged?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function Wi(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${tt(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${tt(e.milestone)}.`}function tt(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function Ht(e,t,n){return t.filter(s=>s.kind==="set"&&s.date<=n).sort(J).at(-1)?.value??e}function Pi(e,t,n,i){const s=Dt(e.a,n),a=Ge(n,i),r=ze(n,i),d=Ii(n,i),c=We(n,i),g=Wt(n,i),u=Pt(n,i),y=qt(n,i),k=zt(n,i),T=Di(a,r),D=s>=t.milestone,O=s>=e.b,v=Gi(n,i,t.started_on),m=we(i),S=Ht(e.a,n,N(m,-1)),fn=zi({current:s,weekStartCurrent:S,gearDown:T,stalled:v,milestoneHit:D,todayLogged:u||g||!!k});return{current:s,sleep:a,energy:r,weight:d,wake:c,doneToday:g,plusToday:u,setLoggedToday:y,skipToday:k,gearDown:T,milestoneHit:D,atB:O,trend:fn,hitrate:Ri(n,i,t.started_on),streak:Ki(n,i,t.started_on),nextAction:Wi({milestone:t.milestone,b:e.b,gearDown:T,milestoneHit:D,atB:O,stalled:v,doneToday:g,plusToday:u,skipToday:k}),suggestedMilestone:D&&!O&&!T?Oi(t.milestone,e.b):null}}function qi(e,t,n,i){return Y(e,t,n).some(s=>(s.kind==="set"||s.kind==="done"||s.kind==="skip"||s.kind==="miss")&&s.date<i)}function Ft(e,t){return e.created_at.localeCompare(t.created_at)}function Hi(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(Ft).at(-1)}function Fi(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip"||n.kind==="miss")).sort(Ft).at(-1)}function Vi(e,t=[]){const n=K(e);return n.setHours(12,0,0,0),yt({today:e,now:n,wakeAt:Rt(e,We(t,e)),sleepSet:Ge(t,e)!==null,energySet:ze(t,e)!==null})}function ye(e,t,n=[]){const i=Vi(t,n);return[..._t(e,t),...xt(e,t),...St(e,t)].filter(s=>re(s,i))}function be(e,t,n,i,s){const a=Y(e,t,s),r=Fi(a,n);if(r?.kind==="set"||r?.kind==="done")return{item:t,date:n,mark:"hit",reason:null};if(r?.kind==="skip")return{item:t,date:n,mark:"skip",reason:r.skip_reason};const d=r?.kind==="miss"?r:Hi(a,n,"miss");return d?{item:t,date:n,mark:"miss",reason:d.skip_reason}:n>=i?{item:t,date:n,mark:"open",reason:null}:{item:t,date:n,mark:"idle",reason:null}}function Vt(e,t,n,i){const s=N(n,-1);return ye(e,s,t).filter(a=>qi(t,a,i,s)).map(a=>{const r=be(t,a,s,n,i);return r.mark==="hit"||r.mark==="skip"||r.mark==="miss"?r:{...r,mark:"miss",reason:null}}).filter(a=>a.mark==="miss"&&!a.reason)}function Ui(e,t,n){return e.some(i=>i.mark==="hit")?"hit":e.some(i=>i.mark==="miss")?"miss":e.some(i=>i.mark==="skip")?"skip":t===n?"open":"idle"}function Ut(e,t,n,i){const s=we(n),a=N(s,6),r=Vt(e,t,n,i),d=new Set(r.map(v=>`${v.item.id}:${v.date}`)),c=$e(s,a).map(v=>{const m=ye(e,v,t).map(S=>{const ae=be(t,S,v,n,i);return d.has(`${S.id}:${v}`)?{...ae,mark:"miss",reason:ae.reason}:ae});return{date:v,label:hn(v),mark:Ui(m,v,n),hits:m.filter(S=>S.mark==="hit").length,misses:m.filter(S=>S.mark==="miss").length,skips:m.filter(S=>S.mark==="skip").length}}),g=c.filter(v=>v.date<n),u=g.reduce((v,m)=>v+m.hits,0),y=g.reduce((v,m)=>v+m.misses,0),k=g.reduce((v,m)=>v+m.skips,0),T=g.flatMap(v=>ye(e,v.date,t).map(m=>{const S=be(t,m,v.date,n,i);return d.has(`${m.id}:${v.date}`)?{...S,mark:"miss",reason:S.reason}:S}).filter(m=>m.mark==="miss")),D=g.filter(v=>v.mark!=="idle").length,O=u>0&&y===0&&D>=2?"Week staat.":null;return{start:s,end:a,range:`${z(s)} – ${z(a)}`,days:c,hits:u,misses:y,skips:k,missRows:T,note:O}}function oe(e){return U(e)?.id}function nt(e,t){return e.created_at.localeCompare(t.created_at)}function Yi(e,t){const n=new Map;for(const i of[...e].sort(nt))i.kind!=="body_weight"||i.value===null||i.date>t||n.set(i.date,i);return[...n.values()].sort((i,s)=>i.date.localeCompare(s.date)||nt(i,s)).map(i=>({date:i.date,kg:i.value}))}function Ji(e,t,n,i,s){const a=Ut(e,t,n,s??oe(e)),r=a.days.map(d=>({date:d.date,label:d.label,current:Ht(i,t,d.date<=n?d.date:n),mark:d.mark}));return{week:a,line:r,weight:Yi(t,n),hits:a.hits,skips:a.skips,misses:a.misses}}function Yt(e,t,n,i=18,s=16){if(e.length===0)return[];const a=Math.min(...e),d=Math.max(...e)-a,c=t-i*2,g=n-s*2;return e.map((u,y)=>{const k=e.length===1?t/2:i+y/(e.length-1)*c,T=d===0?n/2:s+(1-(u-a)/d)*g;return{x:k,y:T}})}function Jt(e){return e.map(t=>`${t.x.toFixed(1)},${t.y.toFixed(1)}`).join(" ")}function Zi(e){return e.skip?null:e.plus?{text:"Set gedaan.",tone:"fog"}:e.done?e.type==="medicijn"?{text:"Genomen.",tone:"sage"}:e.track?{text:"Set staat.",tone:"sage"}:{text:"Staat.",tone:"sage"}:null}function Zt(e,t){return{id:e,tenant_id:t,display_name:null,...Bt(),age_band:null,goals:[],themes:[]}}function Xt(e,t,n=b()){return{id:W(),tenant_id:t,vector_id:e,milestone:w.milestone,started_on:n,deadline:N(n,w.windowDays),status:"active",stage_type:w.stageType}}function qe(e){const t=n=>({id:W(),tenant_id:e,timing:se(),role:null,template:null,later:!1,...n});return[t({type:"daily",label:"Push-ups",unit:"reps",a:w.a,b:w.b,milestone:w.milestone,weekdays:null,times_per_week:null,sort:0}),t({type:"daily",label:"Squats",unit:"reps",a:30,b:null,milestone:null,weekdays:null,times_per_week:null,sort:1}),t({type:"daily",label:"Plank",unit:"sec",a:60,b:null,milestone:null,weekdays:null,times_per_week:null,sort:2}),t({type:"daily",label:"Dead hang",unit:"sec",a:45,b:null,milestone:null,weekdays:null,times_per_week:null,sort:3}),t({type:"weekly",label:"Gerichte kracht",unit:null,a:null,b:null,milestone:null,weekdays:[],times_per_week:2,sort:4}),t({type:"leefregel",label:"Koud douchen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:5,template:"hypothesis"}),t({type:"leefregel",label:"Niet snoepen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:6}),t({type:"leefregel",label:"Low carb",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:7,role:"preference",template:"user preference"}),t({type:"leefregel",label:"Intermittent fasting",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:8}),t({type:"leefregel",label:"Geen alcohol",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:9}),t({type:"gedrag",label:"Cafeïne 90 min na opstaan",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:10,role:"constraint",template:"public-framework",timing:{mode:"relative",clock:null,anchor:"wake",offset_min:90,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Wandelen na eten",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:11,role:"action",template:"evidence-informed",timing:{mode:"relative",clock:null,anchor:"meal",offset_min:0,window_min:null,frequency:"daily",condition:"na eten"}}),t({type:"medicijn",label:"Medicijn ochtend",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:12,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"ochtend"}}),t({type:"supplement",label:"Vitamine D",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:13,role:"action",template:"guideline",timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Bellen met iemand",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:14,role:"action",template:null,timing:{mode:"clock",clock:"18:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Iemand zien",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:1,sort:15,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"deze week"}}),t({type:"gedrag",label:"Scherm uit 22:00",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:16,role:"constraint",template:"user preference",timing:{mode:"clock",clock:"22:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Korte rust",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:17,role:"action",template:"user preference",timing:{mode:"clock",clock:"08:00",anchor:null,offset_min:null,window_min:840,frequency:"daily",condition:"body"}})]}function Xi(e,t){return{id:e.id,tenant_id:e.tenant_id,user_id:t,domain:w.domain,a:e.a??w.a,b:e.b??w.b,unit:e.unit==="sec"?"sec":"reps",pace_constraint:null}}function Qi(e,t=b(),n=W()){const i=Zt(e,n),s=qe(n),a=U(s)??s[0],r=Xi(a,e),d=Xt(r.id,n,t);return a.milestone!==null&&(d.milestone=a.milestone),{profile:i,items:s,vector:r,stage:d,events:[],rotated:!1,onboarded:!1,theme_step:!1}}function Qt(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,items:e.items.map(n=>Q(n)?{...n,a:w.a,b:w.b,milestone:w.milestone,unit:w.unit}:n),vector:{...e.vector,a:w.a,b:w.b,unit:w.unit},stage:{...e.stage,milestone:w.milestone},events:e.events}:e}function ea(){const e=localStorage.getItem(Ue);if(e)return e;const t=W();return localStorage.setItem(Ue,t),t}function ta(){const e=localStorage.getItem(Ye);if(e)return e;const t=W();return localStorage.setItem(Ye,t),t}function _(e){localStorage.setItem(fe,JSON.stringify(e))}function na(e){if(!e)return null;try{const t=JSON.parse(e);return!t||typeof t!="object"?null:t}catch{return null}}function ia(){return[fe,...ft].map(e=>na(localStorage.getItem(e))).filter(e=>e!==null)}function en(e,t,n){const i=Ce(e.items??[],qe(n),n).map(s=>Dn(s,n));return{...e,profile:{...Zt(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...Bt(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null,age_band:e.profile?.age_band??null,goals:Array.isArray(e.profile?.goals)?e.profile.goals:[],themes:C(e.profile?.themes)},items:i,vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(s=>({...s,tenant_id:s.tenant_id??n,item_id:s.item_id??null})),rotated:!!e.rotated,onboarded:e.onboarded??!0,theme_step:e.theme_step??!1}}function I(e,t){const n=ia();if(n.length===0){const a=Qi(e,b(),t);return _(a),a}const i=Qn(n,qe(t),e,t)??n[0],s=Qt(en(i,e,t));return _(s),s}function aa(){localStorage.setItem(gn,"1");const e=ea(),t=ta();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return I(e,t)},async addEvent(n){const i=I(e,t),s={id:n.id??W(),tenant_id:t,user_id:e,item_id:n.item_id??null,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:$n()};return i.events.push(s),_(i),s},async removeEvent(n){const i=I(e,t),s=i.events.find(a=>a.id===n);if(s){if(!Gt(s,b()))throw new Error("alleen vandaag");i.events=i.events.filter(a=>a.id!==n),_(i)}},async saveProfile(n){const i=I(e,t);i.profile=n,_(i)},async saveOnboarding(n){const i=I(e,t);i.profile={...i.profile,goals:n.goals,age_band:n.age_band,themes:C(i.profile.themes)},i.items=ai(i.items,n.startIds),i.onboarded=!0,i.theme_step=!0,_(i)},async saveThemes(n){const i=I(e,t);i.profile={...i.profile,themes:C(n)},i.theme_step=!0,_(i)},async setItemLater(n,i){const s=I(e,t);s.items=s.items.map(a=>a.id===n?{...a,later:i}:a),_(s)},async addItem(n){const i=I(e,t),s=Fn(i.items,n.label);if(s){const r=Yn(s,{label:n.label,kind:n.kind,timing:n.timing});if(!r)throw new Error("naam ontbreekt");return i.items=i.items.map(d=>d.id===r.id?r:d),_(i),r}const a=Vn({tenantId:t,label:n.label,kind:n.kind,timing:n.timing,sort:zn(i.items)});if(!a)throw new Error("naam ontbreekt");if(!qn(i.items,a.label))throw new Error("item bestaat al");return i.items=[...i.items,a],_(i),a},async updateItem(n){const i=I(e,t),s=i.items.find(r=>r.id===n.id);if(!s)throw new Error("item ontbreekt");if(!q(n.label))throw new Error("naam ontbreekt");if(!Hn(i.items,s.id,n.label))throw new Error("item bestaat al");const a=Un(s,n);if(!a)throw new Error("alleen eigen item");return i.items=i.items.map(r=>r.id===a.id?a:r),_(i),a},async removeItem(n){const i=I(e,t),s=i.items.find(r=>r.id===n);if(!s)throw new Error("item ontbreekt");const a=Jn(s);if(!a)throw new Error("item blijft");return i.items=i.items.map(r=>r.id===a.item.id?a.item:r),_(i),a.item},async saveVectorConstraint(n,i){const s=I(e,t);s.vector.id===n&&(s.vector.pace_constraint=i,_(s))},async advanceStage(n,i){const s=I(e,t),a=Xt(n.vector_id,t);return a.milestone=i,s.stage=a,s.items=s.items.map(r=>r.id===n.vector_id?{...r,milestone:i}:r),s.rotated=!0,_(s),a},async importJson(n){const i=hi(n),s=I(e,t),a=Qt(en($i(s,i),e,t));return _(a),a},async signOut(){}}}const it="#F0ECE4",sa="#3D6B5A";function tn(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${it}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${it}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${sa}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function h(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function ra(e){return e==="stokt"||e==="herstel"?"ember":e==="stijgt"?"sage":"fog"}function at(e){const t=ra(e);return e==="stokt"||e==="herstel"||e==="zakt"?h("status-kink",`ico-${t}`):e==="stijgt"?h("status-up",`ico-${t}`):h("status-flat",`ico-${t}`)}function oa(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${h(n?"dot-now":"dot")}</button>`}).join("")}const la=`
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
</svg>`;function da(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",la)}const F=()=>document.querySelector("#app"),l={screen:"vandaag",skipItemId:null,missKey:null,detailItemId:null,advanceWarn:!1,busy:!1,error:null,startIds:[],addKind:"gedrag",addLabel:"",addTiming:"",editKind:"gedrag",editLabel:"",editTiming:"",removeAsk:!1,importPaste:""};let p=null,o=null;function ve(){if(!o)throw new Error("geen snapshot");const e=U(o.items);return Pi(o.vector,o.stage,Gn(o.events,e),b())}function G(e,t=b()){if(!o)throw new Error("geen snapshot");const n=U(o.items),i=Y(o.events,e,n?.id),s=e.a===null?null:Dt(e.a,i);return{done:Wt(i,t),plus:Pt(i,t),skip:zt(i,t),logged:qt(i,t),current:s}}function nn(e,t){return`${e}:${t}`}function ca(e=b()){const t=o?.events??[];return yt({today:e,now:new Date,wakeAt:Rt(e,We(t,e)),sleepSet:Ge(t,e)!==null,energySet:ze(t,e)!==null})}function f(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function $(){if(!o||!p)return;const e=ni(o);if(e){F().innerHTML=Sa(e);return}const t=ve(),{vector:n,stage:i}=o,s=p.mode==="local"?"Lokaal":"Supabase",a=`
    <div class="hdr">
      <div>
        ${tn()}
        <div class="date-s">${kn(b())}</div>
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
      ${La(d)}
      ${l.error?`<p class="error" style="padding:0 18px">${f(l.error)}</p>`:""}
      ${r}`;return}l.detailItemId=null}if(l.screen==="vandaag"){const d=di(o.profile.identity_new,o.events),c=b(),g=ca(c),u=_t(o.items,c).filter(m=>re(m,g)),y=Kn(o.items,c),k=xt(o.items,c).filter(m=>re(m,g)),T=St(o.items,c).filter(m=>re(m,g)),D=Rn(o.items,c),O=On(o.items,c),v=Vt(o.items,o.events,c,oe(o.items));F().innerHTML=`
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
          <div class="lbl">Opstaan</div>
          <div class="num-row">
            <button class="nb" data-act="wake-dec" aria-label="Opstaan eerder">−</button>
            <div class="nwrap">
              <input
                class="ninp ninp-time"
                data-id="wake"
                type="time"
                enterkeyhint="done"
                aria-label="Opstaan-tijd"
                value="${t.wake===null?"":Ni(t.wake)}"
              >
            </div>
            <button class="nb" data-act="wake-inc" aria-label="Opstaan later">+</button>
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
          <div class="dots">${oa(t.energy)}</div>
        </div>
      </div>
      ${O.length?`<div class="sec-hd">Dag</div>
      <div class="card quiet">
        <div class="day-tags">${O.map(m=>Ia(m)).join("")}</div>
      </div>`:""}
      ${y.length?`<div class="sec-hd">Regel</div>${y.map(m=>Ma(m)).join("")}`:""}
      ${k.length?`<div class="sec-hd">Stofjes</div>${k.map(m=>st(m)).join("")}`:""}
      ${T.length?`<div class="sec-hd">Sociaal</div>${T.map(m=>st(m)).join("")}`:""}
      ${v.length?`<div class="sec-hd">Niet gedaan</div>
      <div class="card">
        <div class="note" style="margin-top:0">Geen +1, Done of Skip. Korte reden.</div>
        ${v.map(m=>an(m)).join("")}
      </div>`:""}
      <div class="sec-hd">Vandaag</div>
      ${u.map(m=>Aa(m,t,d)).join("")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Niet in je start. Blijft bewaard.</div>
        ${D.map(m=>ga(m)).join("")}
        <button class="btn ghost later-add" data-nav="profiel">Eigen item</button>
      </div>
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${at(t.trend.word)}
          <div class="word">${t.trend.word}</div>
        </div>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${f(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="koers"){F().innerHTML=`
      ${a}
      ${lt(o.profile.themes,"Tik een suggestie of typ zelf. Geen vaste lijst. Later aan te passen.")}
      ${rt(Ut(o.items,o.events,b(),oe(o.items)))}
      <div class="sec-hd">Strength · push-ups</div>
      <div class="card">
        <div class="kv">
          <div><div class="lbl">A</div><div class="val">${M(n.a)}</div></div>
          <div><div class="lbl">B</div><div class="val">${M(n.b)}</div></div>
          <div><div class="lbl">Nu</div><div class="val">${M(t.current)}</div></div>
          <div><div class="lbl">Etappe</div><div class="val">${M(i.milestone)}</div></div>
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
            <div class="val status">${at(t.trend.word)} ${t.trend.word}</div>
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
      ${ui(o.profile.horizon_1y,o.rotated)?'<div class="banner">Zet een 1-jaars B. Etappes roteren.</div>':""}
      <div class="sec-hd">${h("ik")} Ik</div>
      <div class="card">
        <div class="field">
          <div class="lbl">Leven dat ik weiger</div>
          <textarea data-id="identity_anti" maxlength="${x.identity_anti}">${f(o.profile.identity_anti??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wie ik word</div>
          <textarea data-id="identity_new" maxlength="${x.identity_new}">${f(o.profile.identity_new??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wat B niet mag schenden</div>
          <textarea data-id="identity_constraint" maxlength="${x.identity_constraint}">${f(o.profile.identity_constraint??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">1-jaars B</div>
          <textarea data-id="horizon_1y" maxlength="${x.horizon_1y}">${f(o.profile.horizon_1y??"")}</textarea>
        </div>
        <button class="btn primary" data-act="save-ik">Bewaar</button>
      </div>
      ${ot()}
      ${l.error?`<p class="error" style="padding:0 18px">${f(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="voortgang"){const d=Ji(o.items,o.events,b(),o.vector.a,oe(o.items));F().innerHTML=`
      ${a}
      ${rt(d.week)}
      <div class="sec-hd">Lijn</div>
      <div class="card">
        <div class="note" style="margin-top:0">Huidige deze week. Geen score.</div>
        ${xa(d.line.map(c=>c.current),b(),d.line)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Nu</div><div class="val">${M(t.current)}</div></div>
          <div><div class="lbl">Gedaan</div><div class="val">${d.hits}</div></div>
        </div>
      </div>
      ${_a(d.weight)}
      ${l.error?`<p class="error" style="padding:0 18px">${f(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="profiel"){const d=o.profile.goals??[],c=o.profile.age_band,g=ti(o.items);F().innerHTML=`
      ${a}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="note" style="margin-top:0">Later aan te passen. Geen wipe.</div>
        <div class="chips">${De.map(u=>`<button class="chip pick ${d.includes(u.id)?"on":""}" data-act="onboard-goal" data-goal="${u.id}">${u.label}</button>`).join("")}</div>
      </div>
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="note" style="margin-top:0">Alleen een band. Geen geboortedatum.</div>
        <div class="chips">${Oe.map(u=>`<button class="chip pick ${c===u?"on":""}" data-act="onboard-age" data-age="${u}">${u}</button>`).join("")}</div>
      </div>
      ${lt(o.profile.themes,"Tik een suggestie of typ zelf. Later aan te passen.")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Parkeren of terughalen. Events blijven.</div>
        ${g.map(u=>ya(u)).join("")}
      </div>
      ${ka(o.items)}
      ${ha()}
      ${ot()}
      ${l.error?`<p class="error" style="padding:0 18px">${f(l.error)}</p>`:""}
      ${r}`;return}}function ua(e){const t=G(e),n=Zi({plus:t.plus,done:t.done,skip:t.skip,type:e.type,track:Q(e)});return n?`<div class="confirm ${n.tone}" role="status">${f(n.text)}</div>`:""}function fa(e){if(!o)return"";const t=U(o.items);return Pe(Y(o.events,e,t?.id),b())?`<button class="undo" type="button" data-act="undo" data-item="${e.id}">Ongedaan</button>`:""}function He(e){return`${ua(e)}${fa(e)}`}function st(e){const t=G(e),n=t.logged||!!t.skip,i=e.type==="medicijn"?"Genomen":"Done",s=me(e);return`
      <div class="card stof">
        ${Fe(e)}
        ${s?`<div class="note">${f(s)}</div>`:""}
        <div class="actions actions-two">
          <button class="btn ico-btn ${t.done?"track":""}" data-act="done" data-item="${e.id}" ${n?"disabled":""}>${h("done")}<span>${i}</span></button>
          <button class="btn ico-btn skip ${t.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${t.logged?"disabled":""}>${h("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||t.skip?`<div class="chips">${ue.map(a=>`<button class="chip ${t.skip===a?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${a}">${a}</button>`).join("")}</div>`:""}
        ${He(e)}
      </div>`}function ma(e,t,n,i){return`<div class="chips">${ue.map(s=>`<button class="chip ${n===s?"on":""}" data-act="${i}" data-item="${e}" data-date="${t}" data-reason="${s}">${s}</button>`).join("")}</div>`}function an(e){const t=l.missKey===nn(e.item.id,e.date)||!!e.reason;return`
      <div class="miss-row">
        <button class="miss-item" data-act="miss-open" data-item="${e.item.id}" data-date="${e.date}">
          <span class="ex-nm">${f(e.item.label)}</span>
          <span class="note">${e.reason?f(e.reason):z(e.date)}</span>
        </button>
        ${t?ma(e.item.id,e.date,e.reason,"miss"):""}
      </div>`}function pa(e){const t=[];return e.hits&&t.push(`${e.hits} gedaan`),e.skips&&t.push(`${e.skips} overgeslagen`),e.misses&&t.push(`${e.misses} niet gedaan`),t.length===0?"Nog geen dagen deze week.":t.join(" · ")}function va(e){return e==="skip"?"–":e==="miss"?"×":"·"}function rt(e){return`
      <div class="sec-hd">Week</div>
      <div class="card">
        <div class="note" style="margin-top:0">${f(e.range)}</div>
        <div class="week-strip" aria-label="Weekoverzicht">
          ${e.days.map(t=>`<div class="week-day ${t.mark}${t.date===b()?" today":""}">
            <span class="week-lbl">${t.label}</span>
            <span class="week-mark">${va(t.mark)}</span>
          </div>`).join("")}
        </div>
        <div class="note">${f(pa(e))}</div>
        ${e.note?`<div class="week-note">${f(e.note)}</div>`:""}
        ${e.missRows.length?e.missRows.map(t=>an(t)).join(""):""}
      </div>`}function sn(e){return vt(e)||R(e)?`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${f(e.label)}</button>`:`<div class="ex-nm">${f(e.label)}</div>`}function ga(e){return`
      <div class="later-row">
        ${sn(e)}
        <button class="btn ghost later-now" data-act="later-now" data-item="${e.id}">Nu</button>
      </div>`}function ya(e){const t=e.later;return`
      <div class="later-row">
        <div>
          ${sn(e)}
          <div class="note" style="margin-top:4px">${t?"Later":"Nu"}</div>
        </div>
        <button class="btn ghost later-now" data-act="${t?"later-now":"later-park"}" data-item="${e.id}">${t?"Nu":"Later"}</button>
      </div>`}function ba(e){const t=Te[Lt(e)],n=Et(e);return`
      <div class="later-row">
        <div>
          <button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${f(e.label)}</button>
          <div class="note" style="margin-top:4px">${f(t)}${n?` · ${f(n)}`:""}</div>
        </div>
        <button class="btn ghost later-now" data-act="detail-open" data-item="${e.id}">Wijzig</button>
      </div>`}function ka(e){const t=Pn(e);return t.length===0?"":`
      <div class="sec-hd">Eigen items</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Label, type of tijd. Weg haalt het uit Vandaag. Log blijft.</div>
        ${t.map(n=>ba(n)).join("")}
      </div>`}function ot(){return`
      <div class="card stack io-card">
        <button class="btn ghost ico-btn" data-act="export">${h("export")}<span>Exporteer JSON</span></button>
        <div class="note" style="margin-top:4px">Voegt toe. Bestaande rijen blijven.</div>
        <button class="btn ghost ico-btn" data-act="import-pick">${h("import")}<span>Kies bestand</span></button>
        <input data-id="import-file" class="import-file" type="file" accept="application/json,.json" />
        <div class="field">
          <div class="lbl">Of plak JSON</div>
          <textarea data-id="import-paste" placeholder='{"key":"routine_loop_v6"}'>${f(l.importPaste)}</textarea>
        </div>
        <button class="btn ghost ico-btn" data-act="import-go">${h("import")}<span>Importeer JSON</span></button>
      </div>`}function ha(){return`
      <div class="sec-hd">Eigen item</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Label, type, optioneel tijdstip. Geen dosis. Bestaande items blijven.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="item-label" type="text" maxlength="${Me}" placeholder="Bijv. Avondwandeling" autocomplete="off" enterkeyhint="done" value="${f(l.addLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${Le.map(e=>`<button class="chip pick ${l.addKind===e?"on":""}" data-act="item-kind" data-kind="${e}">${Te[e]}</button>`).join("")}</div>
        <div class="field" style="margin-top:12px">
          <div class="lbl">Tijd</div>
          <input data-id="item-timing" type="text" maxlength="${Ae}" placeholder="22:00 of ochtend" autocomplete="off" enterkeyhint="done" value="${f(l.addTiming)}" />
        </div>
        <div class="stack">
          <button class="btn primary" data-act="item-add">Voeg toe</button>
        </div>
      </div>`}function wa(e){if(e.length===0)return"";const t=z(e[0].date),n=z(e[e.length-1].date);return t===n?t:`${t} – ${n}`}function $a(e){const i=Yt(e.map(r=>r.kg),294,72);if(i.length===0)return"";const s=i.length-1,a=i.map((r,d)=>{const c=d===s;return`<circle class="${c?"prog-dot now":"prog-dot"}" cx="${r.x.toFixed(1)}" cy="${r.y.toFixed(1)}" r="${c?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${Jt(i)}" />
          ${a}
        </svg>`}function _a(e){if(e.length===0)return"";const t=e[e.length-1];return`
      <div class="sec-hd">Gewicht</div>
      <div class="card">
        <div class="note" style="margin-top:0">${f(wa(e))}</div>
        ${$a(e)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Laatst</div><div class="val">${t.kg.toFixed(1)} kg</div></div>
        </div>
      </div>`}function xa(e,t,n){const a=Yt(e,294,72);if(a.length===0)return'<div class="note">Nog geen lijn.</div>';const r=a.map((d,c)=>{const g=n[c]?.date===t;return`<circle class="${n[c]?.mark==="miss"?"prog-dot miss":g?"prog-dot now":"prog-dot"}" cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${g?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${Jt(a)}" />
          ${r}
        </svg>`}function lt(e,t){return`
      <section class="theme-sec" data-sec="themes">
        <div class="sec-hd">Thema's</div>
        <div class="card">
          <div class="ex-nm">Trainingsrichting</div>
          <div class="note">${f(t)}</div>
          ${Ct(e)}
        </div>
      </section>`}function Sa(e){if(!o)return"";const t=o.profile.goals??[],n=o.profile.age_band,i=ii(o.items,t),s=l.startIds,a=`
    <div class="hdr">
      <div>
        ${tn()}
        <div class="date-s">Start</div>
      </div>
    </div>`;if(e==="goals")return`
      ${a}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="ex-nm">Wat is je richting?</div>
        <div class="note">Eerst doelen. Types (gedrag, regel, medicijn, supplement, sociaal) komen daarna.</div>
        <div class="chips">${De.map(r=>`<button class="chip pick ${t.includes(r.id)?"on":""}" data-act="onboard-goal" data-goal="${r.id}">${r.label}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${t.length===0?"disabled":""}>Verder</button>
        </div>
      </div>`;if(e==="age")return`
      ${a}
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="ex-nm">Kies een band</div>
        <div class="note">Geen geboortedatum. Alleen een band.</div>
        <div class="chips">${Oe.map(r=>`<button class="chip pick ${n===r?"on":""}" data-act="onboard-age" data-age="${r}">${r}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${n?"":"disabled"}>Verder</button>
        </div>
      </div>`;if(e==="themes"){const r=o.profile.themes??[];return`
      ${a}
      <div class="sec-hd">Thema's</div>
      <div class="card">
        <div class="ex-nm">Trainingsrichting</div>
        <div class="note">Tik een suggestie of typ zelf. Mag leeg. Later aan te passen.</div>
        ${Ct(r)}
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-themes-done">Verder</button>
        </div>
      </div>`}return`
    ${a}
    <div class="sec-hd">Start</div>
    <div class="card">
      <div class="ex-nm">Max ${le} nu</div>
      <div class="note">De rest gaat naar Later. Later blijft zichtbaar.</div>
      <div class="chips">${i.map(r=>`<button class="chip pick ${s.includes(r.id)?"on":""}" data-act="onboard-start" data-item="${r.id}">${f(r.label)}</button>`).join("")}</div>
      <div class="note">${s.length} / ${le} gekozen</div>
      <div class="stack" style="margin-top:16px">
        <button class="btn primary" data-act="onboard-done" ${s.length===0?"disabled":""}>Naar Vandaag</button>
      </div>
    </div>`}function Fe(e){return!vt(e)&&!R(e)?`<div class="ex-nm">${f(e.label)}</div>`:`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${f(e.label)}</button>`}function Ia(e){return`<button class="chip pick" data-act="detail-open" data-item="${e.id}">${f(e.label)}</button>`}function La(e){const t=_e(e),n=me(e),i=Bn(e.timing),s=Nn(e.timing),a=It(e),r=Se(e),d=P(e),c=R(e);return`
      <button class="btn ghost detail-back" data-act="detail-close">Terug</button>
      <div class="sec-hd">Detail</div>
      <div class="card">
        <div class="ex-nm">${f(e.label)}</div>
        ${i?`<div class="note">${f(i)}</div>`:""}
        ${s?`<div class="note">${f(s)}</div>`:""}
        ${n&&!s?`<div class="note">${f(n)}</div>`:""}
        ${a?`<div class="work">${f(a)}</div>`:""}
        ${r?'<div class="note">Voorkeur. Geen regel.</div>':""}
        ${d&&!n&&!i&&!s?'<div class="note">Regel. Geen afvinken.</div>':""}
        ${He(e)}
      </div>
      ${t?`<div class="sec-hd">Bron</div>
      <div class="card quiet">
        <div class="src-tag">${f(t)}</div>
      </div>`:""}
      ${c?Ea():Ta(e)}`}function Ea(){return`
      <div class="sec-hd">Wijzig</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Zelfde item. Geen dosis. Log blijft.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="edit-label" type="text" maxlength="${Me}" placeholder="Naam" autocomplete="off" enterkeyhint="done" value="${f(l.editLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${Le.map(e=>`<button class="chip pick ${l.editKind===e?"on":""}" data-act="edit-kind" data-kind="${e}">${Te[e]}</button>`).join("")}</div>
        <div class="field" style="margin-top:12px">
          <div class="lbl">Tijd</div>
          <input data-id="edit-timing" type="text" maxlength="${Ae}" placeholder="22:00 of ochtend" autocomplete="off" enterkeyhint="done" value="${f(l.editTiming)}" />
        </div>
        <div class="stack">
          <button class="btn primary" data-act="item-save">Bewaar</button>
          ${l.removeAsk?`<div class="note">Weg uit Vandaag. Log blijft.</div>
          <button class="btn primary" data-act="item-remove">Bevestig</button>
          <button class="btn ghost" data-act="item-remove-cancel">Niet nu</button>`:'<button class="btn ghost" data-act="item-remove-ask">Weg</button>'}
        </div>
      </div>`}function Ta(e){return Ne(e)?e.later?`
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
      </div>`:""}function Ma(e){const t=me(e);return`
      <div class="card quiet">
        ${Fe(e)}
        ${t?`<div class="note">${f(t)}</div>`:'<div class="note">Regel. Geen afvinken.</div>'}
      </div>`}function Aa(e,t,n){const i=G(e),s=Q(e),a=i.logged||!!i.skip,r=s&&i.current!==null&&e.b!==null&&i.current>=e.b,d=a||r,c=s,g=It(e),u=me(e),y=c&&t.suggestedMilestone&&e.id===o.vector.id;return`
      <div class="card">
        ${Fe(e)}
        ${u&&!g&&!s?`<div class="note">${f(u)}</div>`:""}
        ${s?`<div class="track">
          <span class="now">${M(i.current??e.a??0)}</span>
          <span>→</span>
          <span class="mid">${M(e.milestone??0)}</span>
          <span>→</span>
          <span class="end">${M(e.b??0)}</span>
        </div>`:g?`<div class="work">${f(g)}</div>`:""}
        <div class="actions ${s?"":"actions-two"}">
          ${s?`<button class="btn ico-btn ${i.plus?"on":""}" data-act="plus" data-item="${e.id}" ${d?"disabled":""}>${h("plus")}<span>+1</span></button>`:""}
          <button class="btn ico-btn ${i.done?"track":""}" data-act="done" data-item="${e.id}" ${a?"disabled":""}>${h("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${i.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${i.logged?"disabled":""}>${h("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||i.skip?`<div class="chips">${ue.map(k=>`<button class="chip ${i.skip===k?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${k}">${k}</button>`).join("")}</div>`:""}
        ${He(e)}
        ${y?`<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${M(t.suggestedMilestone)}.</div>
               ${l.advanceWarn&&o.profile.identity_constraint?`<div class="banner">Check: ${f(o.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${M(t.suggestedMilestone)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`:`<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${t.suggestedMilestone}">Volgende etappe ${M(t.suggestedMilestone)}</button>
                      </div>`}`:""}
        ${c&&n?`<div class="note">${f(n)}</div>`:""}
      </div>`}function M(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function L(e){if(!l.busy){l.busy=!0,l.error=null;try{await e()}catch(t){l.error=t instanceof Error?t.message:"Er ging iets mis"}finally{l.busy=!1,$()}}}async function ja(e){p=e,o=await p.load(),l.screen="vandaag",$()}async function Ba(){da(),Na(),await ja(aa())}function Na(){document.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const t=e.target;if(t instanceof HTMLInputElement){if(t.dataset.id==="theme-custom"){e.preventDefault(),un();return}if(t.dataset.id==="item-label"||t.dataset.id==="item-timing"){e.preventDefault(),cn();return}if(t.dataset.id==="edit-label"||t.dataset.id==="edit-timing"){e.preventDefault(),dn();return}if(t.dataset.id==="weight"){e.preventDefault(),ct(t.value);return}t.dataset.id==="wake"&&(e.preventDefault(),ut(t.value))}}),document.addEventListener("change",e=>{const t=e.target;if(t instanceof HTMLInputElement&&(t.dataset.id==="weight"&&ct(t.value),t.dataset.id==="wake"&&ut(t.value),t.dataset.id==="import-file"&&t.files?.[0])){const n=t.files[0];t.value="",n.text().then(i=>rn(i))}}),document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(vn(n)){l.screen=n,l.skipItemId=null,l.missKey=null,l.detailItemId=null,l.advanceWarn=!1,l.error=null,$();return}Ca(t)})}async function Ca(e){const t=e.dataset.act;if(!t)return;const n=B("import-paste");if(n!==null&&(l.importPaste=n),!p||!o)return;const i=ve(),s=b();if(t==="sleep-inc"||t==="sleep-dec"){const a=i.sleep??7,r=Math.max(0,Math.min(14,a+(t==="sleep-inc"?.5:-.5)));await j({date:s,kind:"body_sleep",value:r,skip_reason:null,item_id:null});return}if(t==="energy"){const a=Number(e.dataset.n),r=i.energy===a?null:a;if(r===null)return;await j({date:s,kind:"body_energy",value:r,skip_reason:null,item_id:null});return}if(t==="weight-inc"||t==="weight-dec"){const a=Ei(i.weight,Li(o.events),t==="weight-inc"?.1:-.1);if(i.weight===a)return;await j({date:s,kind:"body_weight",value:a,skip_reason:null,item_id:null});return}if(t==="wake-inc"||t==="wake-dec"){const a=ji(i.wake,Ai(o.events),t==="wake-inc"?15:-15);if(i.wake===a)return;await j({date:s,kind:"body_wake",value:a,skip_reason:null,item_id:null});return}if(t==="plus"){const a=o.items.find(d=>d.id===e.dataset.item);if(!a||!Q(a))return;const r=G(a);if(r.logged||r.skip||a.b!==null&&r.current!==null&&r.current>=a.b)return;await j({date:s,kind:"set",value:(r.current??a.a??0)+1,skip_reason:null,item_id:a.id});return}if(t==="done"){const a=o.items.find(d=>d.id===e.dataset.item);if(!a)return;const r=G(a);if(r.logged||r.skip)return;await j({date:s,kind:"done",value:r.current??a.a,skip_reason:null,item_id:a.id});return}if(t==="detail-open"){const a=e.dataset.item??null,r=a?o.items.find(d=>d.id===a):void 0;if(!r)return;ln(r),l.detailItemId=r.id,$();return}if(t==="detail-close"){l.detailItemId=null,$();return}if(t==="skip-open"){const a=e.dataset.item??null;l.skipItemId=l.skipItemId===a?null:a,$();return}if(t==="skip"){const a=o.items.find(c=>c.id===e.dataset.item);if(!a||G(a).logged)return;const d=e.dataset.reason;if(!Ve(d))return;await j({date:s,kind:"skip",value:null,skip_reason:d,item_id:a.id}),l.skipItemId=null;return}if(t==="undo"){const a=o.items.find(c=>c.id===e.dataset.item);if(!a)return;const r=U(o.items),d=Pe(Y(o.events,a,r?.id),s);if(!d)return;await Da(d.id),l.skipItemId=null;return}if(t==="miss-open"){const a=e.dataset.item,r=e.dataset.date;if(!a||!r)return;const d=nn(a,r);l.missKey=l.missKey===d?null:d,$();return}if(t==="miss"){const a=o.items.find(g=>g.id===e.dataset.item),r=e.dataset.date,d=e.dataset.reason;if(!a||!r||r>=s||!Ve(d))return;const c=G(a,r);if(c.logged||c.skip)return;await j({date:r,kind:"miss",value:null,skip_reason:d,item_id:a.id}),l.missKey=null;return}if(t==="advance"){if(!i.suggestedMilestone)return;if(ci(o.profile.identity_constraint)&&!l.advanceWarn){l.advanceWarn=!0,$();return}await dt(i.suggestedMilestone);return}if(t==="advance-go"){if(!i.suggestedMilestone)return;await dt(i.suggestedMilestone);return}if(t==="advance-cancel"){l.advanceWarn=!1,$();return}if(t==="onboard-goal"){const a=e.dataset.goal;if(!a||!At(a))return;const r={...o.profile,goals:si(o.profile.goals??[],a)};await L(async()=>{await p.saveProfile(r),o.profile=r});return}if(t==="onboard-age"){const a=e.dataset.age;if(!a||!jt(a))return;const r={...o.profile,age_band:a};await L(async()=>{await p.saveProfile(r),o.profile=r});return}if(t==="theme-toggle"){const a=e.dataset.theme;if(!a)return;await he(fi(C(o.profile.themes),a));return}if(t==="theme-add"){await un();return}if(t==="onboard-start"){const a=e.dataset.item;if(!a)return;l.startIds=ri(l.startIds,a),$();return}if(t==="onboard-next"){$();return}if(t==="onboard-themes-done"){await he(o.profile.themes??[],!0);return}if(t==="onboard-done"){const a=o.profile.age_band,r=o.profile.goals??[];if(!a||r.length===0||l.startIds.length===0)return;await L(async()=>{await p.saveOnboarding({goals:r,age_band:a,startIds:l.startIds}),o=await p.load(),l.screen="vandaag"});return}if(t==="later-now"||t==="later-park"){const a=e.dataset.item;if(!a)return;await L(async()=>{await p.setItemLater(a,t==="later-park"),o=await p.load()});return}if(t==="item-kind"){const a=e.dataset.kind;if(!Ze(a))return;on(),l.addKind=a,$();return}if(t==="item-add"){await cn();return}if(t==="edit-kind"){const a=e.dataset.kind;if(!Ze(a))return;ke(),l.editKind=a,$();return}if(t==="item-save"){await dn();return}if(t==="item-remove-ask"){ke(),l.removeAsk=!0,$();return}if(t==="item-remove-cancel"){l.removeAsk=!1,$();return}if(t==="item-remove"){const a=l.detailItemId;if(!a)return;await L(async()=>{await p.removeItem(a),o=await p.load(),l.detailItemId=null,l.removeAsk=!1,l.screen="profiel"});return}if(t==="save-ik"){const a={...o.profile,identity_anti:A(B("identity_anti"),x.identity_anti),identity_new:A(B("identity_new"),x.identity_new),identity_constraint:A(B("identity_constraint"),x.identity_constraint),horizon_1y:A(B("horizon_1y"),x.horizon_1y)};await L(async()=>{await p.saveProfile(a),o.profile=a});return}if(t==="export"){bn(o);return}if(t==="import-pick"){document.querySelector("[data-id=import-file]")?.click();return}if(t==="import-go"){await rn(l.importPaste);return}}async function rn(e){const t=e.trim();if(!t){l.error=X,$();return}await L(async()=>{o=await p.importJson(t),l.importPaste=""})}function on(){l.addLabel=B("item-label")??l.addLabel,l.addTiming=B("item-timing")??l.addTiming}function ke(){l.editLabel=B("edit-label")??l.editLabel,l.editTiming=B("edit-timing")??l.editTiming}function ln(e){l.editLabel=e.label,l.editKind=Lt(e),l.editTiming=Et(e),l.removeAsk=!1}async function dn(){!p||!o||!l.detailItemId||(ke(),await L(async()=>{const e=await p.updateItem({id:l.detailItemId,label:l.editLabel,kind:l.editKind,timing:l.editTiming});o=await p.load(),ln(e),l.detailItemId=e.id}))}async function cn(){!p||!o||(on(),await L(async()=>{await p.addItem({label:l.addLabel,kind:l.addKind,timing:l.addTiming}),o=await p.load(),l.addLabel="",l.addTiming=""}))}async function un(){if(!o)return;const e=B("theme-custom")??"",t=C(o.profile.themes),n=mi(t,e);n.length===t.length&&n.every((i,s)=>i===t[s])||await he(n)}async function he(e,t=!1){if(!p||!o)return;const n=C(e),i={...o.profile,themes:n},s=t||!Mt(o);await L(async()=>{if(s){await p.saveThemes(n),o=await p.load();return}await p.saveProfile(i),o.profile=i})}function B(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function dt(e){await L(async()=>{o.stage=await p.advanceStage(o.stage,e),o.items=o.items.map(t=>t.id===o.stage.vector_id?{...t,milestone:e}:t),o.rotated=!0,l.advanceWarn=!1})}async function j(e){await L(async()=>{const t=await p.addEvent(e);o.events.push(t)})}async function Da(e){await L(async()=>{await p.removeEvent(e),o.events=o.events.filter(t=>t.id!==e)})}async function ct(e){if(!p||!o)return;const t=Ti(e);t!==null&&ve().weight!==t&&await j({date:b(),kind:"body_weight",value:t,skip_reason:null,item_id:null})}async function ut(e){if(!p||!o)return;const t=Bi(e);t!==null&&ve().wake!==t&&await j({date:b(),kind:"body_wake",value:t,skip_reason:null,item_id:null})}Ba();
