(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();const ce=["geen tijd","geen energie","vergeten","geen zin","pijn"];function Je(e){return!!(e&&ce.includes(e))}const wn=["guideline","evidence-informed","public-framework","user preference","hypothesis"],_n=["vandaag","koers","voortgang","profiel"];function $n(e){return!!(e&&_n.includes(e))}const h={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},ue="routine_loop_v6",gt=["routine_loop_v5","routine_loop_v4","routine_loop_v3"],Ze="routine_local_user_id",Xe="routine_local_tenant_id",xn="routine_local_chosen";function Sn(e){return JSON.stringify({exported_at:new Date().toISOString(),key:ue,profile:e.profile,items:e.items,vector:e.vector,stage:e.stage,events:e.events,rotated:e.rotated,onboarded:e.onboarded,theme_step:e.theme_step},null,2)}function In(e){const t=new Blob([Sn(e)],{type:"application/json"}),n=URL.createObjectURL(t),i=document.createElement("a");i.href=n,i.download=`routine-${e.profile.id.slice(0,8)}.json`,i.click(),URL.revokeObjectURL(n)}const yt=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],bt=["zo","ma","di","wo","do","vr","za"];function b(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${i}`}function C(e,t){const n=K(e);return n.setDate(n.getDate()+t),b(n)}function K(e){const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)}function Ln(e){const t=K(e);return`${bt[t.getDay()]} ${t.getDate()} ${yt[t.getMonth()]}`}function z(e){const t=K(e);return`${t.getDate()} ${yt[t.getMonth()]}`}function En(e){return bt[K(e).getDay()]}function Mn(e){const t=K(e).getDay();return t===0?7:t}function we(e){const t=K(e),n=t.getDay(),i=n===0?-6:1-n;return t.setDate(t.getDate()+i),b(t)}function _e(e,t){const n=[];let i=e;for(;i<=t;)n.push(i),i=C(i,1);return n}function W(){return crypto.randomUUID()}function Tn(){return new Date().toISOString()}function An(e){return e.trim().toLowerCase().normalize("NFC")}function jn(e){return!!(e&&wn.includes(e))}function Bn(e){const t=An(e);return t==="cafeïne 90 min na opstaan"?"public-framework":t==="wandelen na eten"?"evidence-informed":t==="low carb"||t==="scherm uit 22:00"||t==="korte rust"?"user preference":t==="vitamine d"?"guideline":t==="koud douchen"?"hypothesis":null}function $e(e){return Bn(e.label)??(jn(e.template)?e.template:null)}function kt(e){return $e(e)!==null}function ae(){return{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:null,condition:null}}function Nn(e){return{mode:e?.mode??null,clock:e?.clock??null,anchor:e?.anchor??null,offset_min:e?.offset_min??null,window_min:e?.window_min??null,frequency:e?.frequency??null,condition:e?.condition??null}}function ht(e){return e.trim().toLowerCase().normalize("NFC")}function Cn(e){return ht(e)==="korte rust"?{mode:"clock",clock:"08:00",window_min:840,frequency:"daily",condition:"body"}:null}function Dn(e,t){const n=Cn(t);return n?{...e,...n}:e}function wt(e){return{now:e.now??new Date,today:e.today,wakeAt:e.wakeAt??null,mealAt:e.mealAt??null,sleepSet:!!e.sleepSet,energySet:!!e.energySet}}function xe(e){const t=e?.trim().toLowerCase();return t==="body"||t==="energy|sleep"?"body":t==="energy"?"energy":t==="sleep"?"sleep":null}function On(e,t){const n=xe(e.condition);if(!n)return!0;const i=!!t.sleepSet,s=!!t.energySet;return n==="energy"?s:n==="sleep"?i:i||s}function _t(e,t){const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(!n)return null;const i=Number(n[1]),s=Number(n[2]);if(i>23||s>59)return null;const a=K(e);return a.setHours(i,s,0,0),a}function Kn(e,t){return e==="wake"?t.wakeAt:e==="meal"?t.mealAt:null}function Rn(e,t){if(e.mode==="clock"&&e.clock)return _t(t.today,e.clock);if(e.mode==="relative"&&e.anchor&&e.offset_min!==null){const n=Kn(e.anchor,t);return n?new Date(n.getTime()+e.offset_min*6e4):null}return null}function $t(e,t){return!t||e.window_min===null?null:new Date(t.getTime()+e.window_min*6e4)}function xt(e,t){if(e.timing.frequency==="weekly"||e.type==="weekly"){const i=e.weekdays??[];return i.length===0?!1:i.includes(Mn(t))}return!0}function P(e){return Ie(e)==="constraint"}function Se(e){return Ie(e)==="preference"}function St(e){return!P(e)&&!Se(e)}function Gn(e,t){if(P(e))return"silent";if(!xt(e,t.today)||!On(e.timing,t))return"hidden";const n=e.timing;if(!n.mode)return"due";const i=Rn(n,t);if(n.mode==="relative"&&!i)return"due";if(i&&t.now<i)return"wait";const s=$t(n,i);return s&&t.now>s?"closed":"due"}function se(e,t){const n=Gn(e,t);return!(n==="hidden"||n==="closed"||n==="wait"&&e.timing.window_min!==null)}function Qe(e){return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`}function zn(e){if(e.window_min===null)return null;if(e.mode==="clock"&&e.clock){const t=_t("2000-01-01",e.clock);if(!t)return null;const n=$t(e,t);return n?`${Qe(t)}–${Qe(n)}`:null}return`${e.window_min} min`}function Wn(e){const t=xe(e.condition);return t==="body"?"na slaap of energie":t==="energy"?"na energie":t==="sleep"?"na slaap":null}function fe(e){const t=e.timing;return xe(t.condition)?null:t.condition?t.condition:t.mode==="relative"&&t.anchor==="wake"&&t.offset_min!==null?`${t.offset_min} min na opstaan`:t.mode==="relative"&&t.anchor==="meal"&&t.offset_min!==null?t.offset_min===0?"na eten":`${t.offset_min} min na eten`:t.mode==="relative"&&t.anchor==="meal"?"na eten":t.mode==="clock"&&t.clock?t.clock:null}function Ie(e){if(e.role)return e.role;const t=ht(e.label);return t==="low carb"?"preference":t==="cafeïne 90 min na opstaan"||t==="scherm uit 22:00"?"constraint":null}const Le=["gedrag","regel","medicijn","supplement","sociaal"],Ee={gedrag:"gedrag",regel:"leefregel",medicijn:"medicijn",supplement:"supplement",sociaal:"sociaal"},Me={gedrag:"Gedrag",regel:"Regel",medicijn:"Medicijn",supplement:"Supplement",sociaal:"Sociaal"},Te=40,Ae=40;function et(e){return!!(e&&Le.includes(e))}function te(e){return e.a!==null&&e.b!==null&&e.milestone!==null}function Pn(e,t){return xt(e,t)}function qn(e,t){return{...e,tenant_id:e.tenant_id??t,weekdays:e.weekdays??null,times_per_week:e.times_per_week??null,timing:Dn(Nn(e.timing),e.label),role:Ie(e),template:$e(e),later:!!e.later,removed:!!e.removed}}function je(e){return e.type==="medicijn"||e.type==="supplement"}function It(e){return e.type==="sociaal"}function Lt(e,t){return V(e,t).filter(n=>St(n)&&!je(n)&&!It(n)&&!n.later)}function Hn(e,t){return V(e,t).filter(n=>Se(n)&&!n.later)}function Fn(e,t){return V(e,t).filter(n=>P(n)&&!n.later)}function Et(e,t){return V(e,t).filter(n=>je(n)&&!n.later)}function Mt(e,t){return V(e,t).filter(n=>It(n)&&!n.later)}function Vn(e,t){return V(e,t).filter(n=>n.later&&(St(n)||P(n)))}function V(e,t){return e.filter(n=>!n.removed&&Pn(n,t)).sort((n,i)=>n.sort-i.sort)}function U(e){return e.find(te)}function ge(e){return e.kind==="body_sleep"||e.kind==="body_energy"||e.kind==="body_weight"||e.kind==="body_wake"||e.kind==="body_meal"}function Y(e,t,n){return e.filter(i=>ge(i)?!1:!!(i.item_id===t.id||i.item_id===null&&n&&t.id===n))}function Un(e,t){return t?[...e.filter(ge),...Y(e,t,t.id)]:e.filter(ge)}function Tt(e){return e.a===null?null:e.unit==="sec"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} s`:e.unit==="reps"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} reps`:String(e.a)}function E(e){return e.trim().toLowerCase()}function q(e){const t=e.trim().replace(/\s+/g," ").slice(0,Te);return t.length>0?t:null}function Be(e){const t=e.trim().replace(/\s+/g," ").slice(0,Ae);if(!t)return ae();const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(n){const i=Number(n[1]),s=Number(n[2]);if(i<=23&&s<=59)return{...ae(),mode:"clock",clock:`${String(i).padStart(2,"0")}:${n[2]}`,frequency:"daily"}}return{...ae(),frequency:"daily",condition:t}}function Yn(e){return e.reduce((t,n)=>Math.max(t,n.sort),-1)+1}const Jn=["Push-ups","Squats","Plank","Dead hang","Gerichte kracht","Koud douchen","Niet snoepen","Low carb","Intermittent fasting","Geen alcohol","Cafeïne 90 min na opstaan","Wandelen na eten","Medicijn ochtend","Vitamine D","Bellen met iemand","Iemand zien","Scherm uit 22:00","Korte rust"];function me(e){const t=E(e);return Jn.some(n=>E(n)===t)}function Ne(e){return me(e.label)}function R(e){return!Ne(e)}function H(e){return!!e.removed}function Zn(e){return e.filter(t=>R(t)&&!H(t)).sort((t,n)=>t.sort-n.sort)}function At(e){return e.type==="leefregel"?"regel":e.type==="medicijn"?"medicijn":e.type==="supplement"?"supplement":e.type==="sociaal"?"sociaal":"gedrag"}function jt(e){return e.timing.mode==="clock"&&e.timing.clock?e.timing.clock:e.timing.condition??""}function Xn(e,t){const n=q(t);return n?!e.some(i=>!H(i)&&E(i.label)===E(n)):!1}function Qn(e,t,n){const i=q(n);return!i||me(i)?!1:!e.some(s=>s.id!==t&&!H(s)&&E(s.label)===E(i))}function ei(e,t){const n=q(t);if(n)return e.find(i=>H(i)&&R(i)&&E(i.label)===E(n))}function ti(e){const t=q(e.label);return t?{id:W(),tenant_id:e.tenantId,type:Ee[e.kind],label:t,unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:e.sort,timing:Be(e.timing??""),role:"action",template:"user preference",later:!!e.later,removed:!1}:null}function ni(e,t){if(!R(e)||H(e))return null;const n=q(t.label);return!n||me(n)?null:{...e,type:Ee[t.kind],label:n,timing:Be(t.timing??""),template:"user preference"}}function ii(e,t){if(!R(e)||!H(e))return null;const n=q(t.label);return!n||me(n)?null:{...e,type:Ee[t.kind],label:n,timing:Be(t.timing??""),template:"user preference",later:!1,removed:!1}}function ai(e){return H(e)?{item:e,mode:"removed"}:R(e)?{item:{...e,removed:!0},mode:"removed"}:Ne(e)?{item:{...e,later:!0},mode:"parked"}:null}function si(e){const t=new Set,n=[];for(const i of e){const s=E(i.label);t.has(s)||(t.add(s),n.push(i))}return n}function Ce(e,t,n){const i=si(e),s=new Set(i.map(r=>E(r.label))),a=t.filter(r=>!s.has(E(r.label))).map(r=>({...r,tenant_id:n}));return[...i,...a]}function Bt(e){const t=new Map;for(const n of e)for(const i of n)t.has(i.id)||t.set(i.id,i);return[...t.values()].sort((n,i)=>n.created_at.localeCompare(i.created_at))}function ri(e){return e?!!(e.identity_anti||e.identity_new||e.identity_constraint||e.horizon_1y||e.display_name):!1}function oi(e,t,n,i){if(e.length===0)return null;const s=e.reduce((u,y)=>(y.events?.length??0)>(u.events?.length??0)?y:u),a=e.find(u=>ri(u.profile))?.profile??s.profile,r=Ce([s,...e.filter(u=>u!==s)].flatMap(u=>u.items??[]),t,i),d=new Map(r.map(u=>[E(u.label),u.id])),c=new Map;for(const u of e)for(const y of u.items??[]){const w=d.get(E(y.label));w&&y.id!==w&&c.set(y.id,w)}const g=Bt(e.map(u=>u.events??[])).map(u=>{if(!u.item_id)return u;const y=c.get(u.item_id);return y?{...u,item_id:y}:u});return{...s,profile:{...a,id:a.id||n,tenant_id:a.tenant_id||i},items:r,events:g}}const oe=3,De=[{id:"kracht",label:"Kracht"},{id:"eten",label:"Eten & drinken"},{id:"slaap",label:"Slaap"},{id:"stofjes",label:"Stofjes"},{id:"bewegen",label:"Bewegen"}],Oe=["18–29","30–39","40–49","50–59","60+"],li={kracht:["Push-ups","Squats","Plank","Dead hang"],eten:["Niet snoepen","Low carb","Intermittent fasting","Geen alcohol"],slaap:["Koud douchen"],stofjes:["Medicijn ochtend","Vitamine D"],bewegen:["Wandelen na eten"]};function Ke(e){return P(e)||e.type==="weekly"?!1:e.type==="daily"||e.type==="leefregel"||e.type==="gedrag"||e.type==="sociaal"||je(e)}function di(e){return e.filter(t=>t.removed?!1:Ke(t)?!0:P(t)&&t.later).sort((t,n)=>t.sort-n.sort)}function Nt(e){return!(e.onboarded!==!1||(e.events??[]).length>0)}function ci(e){return Nt(e)?e.profile.goals?.length?e.profile.age_band?e.theme_step!==!0?"themes":"start":"age":"goals":null}function ui(e,t){const n=e.filter(Ke).sort((a,r)=>a.sort-r.sort);if(t.length===0)return n;const i=new Set(t.flatMap(a=>li[a]??[])),s=n.filter(a=>i.has(a.label));return s.length>0?s:n}function fi(e,t){const n=new Set(t.slice(0,oe));return e.map(i=>Ke(i)?{...i,later:!n.has(i.id)}:{...i,later:!1})}function mi(e,t){return e.includes(t)?e.filter(n=>n!==t):[...e,t]}function pi(e,t){return e.includes(t)?e.filter(n=>n!==t):e.length>=oe?e:[...e,t]}function Ct(e){return De.some(t=>t.id===e)}function Dt(e){return Oe.includes(e)}const vi="geen zin",x={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140};function A(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function gi(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===vi).length}function yi(e,t){const n=A(e,x.identity_new);return!n||gi(t)<2?null:n}function bi(e){return!!A(e,x.identity_constraint)}function ki(e,t){return t&&!A(e,x.horizon_1y)}function Ot(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const tt=["Military calisthenics","Kickbox","Spinnen"],Kt=40;function Re(e){const t=e.trim().replace(/\s+/g," ").slice(0,Kt);return t.length>0?t:null}function D(e){if(!Array.isArray(e))return[];const t=new Set,n=[];for(const i of e){if(typeof i!="string")continue;const s=Re(i);if(!s)continue;const a=s.toLowerCase();t.has(a)||(t.add(a),n.push(s))}return n}function hi(e,t){const n=Re(t);if(!n)return e;const i=n.toLowerCase();return e.some(s=>s.toLowerCase()===i)?e.filter(s=>s.toLowerCase()!==i):[...e,n]}function wi(e,t){const n=Re(t);if(!n)return e;const i=n.toLowerCase();return e.some(s=>s.toLowerCase()===i)?e:[...e,n]}function _i(e){const n=D(e).filter(i=>!tt.some(s=>s.toLowerCase()===i.toLowerCase()));return[...tt,...n]}function nt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function Rt(e){const t=new Set(D(e).map(i=>i.toLowerCase()));return`<div class="chips">${_i(e).map(i=>`<button class="chip pick ${t.has(i.toLowerCase())?"on":""}" data-act="theme-toggle" data-theme="${nt(i)}">${nt(i)}</button>`).join("")}</div>
        <div class="theme-add">
          <input data-id="theme-custom" type="text" maxlength="${Kt}" placeholder="Eigen thema" autocomplete="off" enterkeyhint="done" />
          <button class="btn ghost" data-act="theme-add">Voeg toe</button>
        </div>`}const ee="Ongeldig bestand. Geen Routine-export.";function le(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function $i(e){return e==null||e===ue?!0:gt.includes(String(e))}function xi(e){return le(e)&&typeof e.id=="string"&&e.id.length>0&&typeof e.label=="string"}function Si(e){return le(e)&&typeof e.id=="string"&&e.id.length>0&&typeof e.date=="string"&&typeof e.kind=="string"}function it(e){return e.trim().toLowerCase()}function Q(e,t){const n=e?.trim();if(n)return e??n;const i=t?.trim();return i?t??i:null}function Ii(e,t){const n=[],i=new Set;for(const s of[e,t].flatMap(a=>Array.isArray(a)?a:[]))typeof s!="string"||!Ct(s)||i.has(s)||(i.add(s),n.push(s));return n}function Li(e,t,n){const i=new Map(t.map(a=>[it(a.label),a.id])),s=new Map;for(const a of n){const r=i.get(it(a.label));r&&a.id!==r&&s.set(a.id,r)}return e.map(a=>{if(!a.item_id)return a;const r=s.get(a.item_id);return r?{...a,item_id:r}:a})}function Ei(e){let t;try{t=JSON.parse(e)}catch{throw new Error(ee)}if(!le(t)||!$i(t.key))throw new Error(ee);if(!le(t.profile)||!Array.isArray(t.items)||!Array.isArray(t.events))throw new Error(ee);if(!t.items.every(xi)||!t.events.every(Si))throw new Error(ee);return{profile:t.profile,items:t.items,events:t.events,onboarded:typeof t.onboarded=="boolean"?t.onboarded:void 0,theme_step:typeof t.theme_step=="boolean"?t.theme_step:void 0}}function Mi(e,t){return{...e,display_name:Q(e.display_name,t.display_name),identity_anti:A(Q(e.identity_anti,t.identity_anti),x.identity_anti),identity_new:A(Q(e.identity_new,t.identity_new),x.identity_new),identity_constraint:A(Q(e.identity_constraint,t.identity_constraint),x.identity_constraint),horizon_1y:A(Q(e.horizon_1y,t.horizon_1y),x.horizon_1y),age_band:e.age_band??(t.age_band&&Dt(t.age_band)?t.age_band:null),goals:Ii(e.goals,t.goals),themes:D([...e.themes??[],...t.themes??[]])}}function Ti(e,t){const n=e.profile.tenant_id,i=Ce(e.items,t.items,n),s=Li(t.events,i,t.items).map(a=>({...a,tenant_id:n,user_id:e.profile.id}));return{...e,profile:Mi(e.profile,t.profile),items:i,events:Bt([e.events,s]),onboarded:!!(e.onboarded||t.onboarded),theme_step:!!(e.theme_step||t.theme_step)}}const Ai=2,ji=6;function J(e,t){return e.created_at.localeCompare(t.created_at)}function Z(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(J).at(-1)}function Gt(e,t){return t.filter(i=>i.kind==="set").sort(J).at(-1)?.value??e}function Ge(e,t){return Z(e,t,"body_sleep")?.value??null}function ze(e,t){return Z(e,t,"body_energy")?.value??null}const zt=40,Wt=250,Bi=80;function Ni(e,t){return Z(e,t,"body_weight")?.value??null}function Ci(e){return e.filter(t=>t.kind==="body_weight"&&t.value!==null).sort(J).at(-1)?.value??null}function Di(e,t,n){return Math.round(Math.max(zt,Math.min(Wt,(e??t??Bi)+n))*10)/10}function Oi(e){const t=e.trim().replace(",",".");if(!t)return null;const n=Number(t);return Number.isFinite(n)?Math.round(Math.max(zt,Math.min(Wt,n))*10)/10:null}const pe=0,ve=1439,Ki=420,Ri=780;function We(e){return e==null||!Number.isFinite(e)?null:Math.max(pe,Math.min(ve,Math.round(e)))}function Pt(e,t){return We(e.filter(n=>n.kind===t&&n.value!==null).sort(J).at(-1)?.value)}function Pe(e,t){return We(Z(e,t,"body_wake")?.value)}function Gi(e){return Pt(e,"body_wake")}function qe(e,t){return We(Z(e,t,"body_meal")?.value)}function zi(e){return Pt(e,"body_meal")}function qt(e,t,n,i){return Math.max(pe,Math.min(ve,(e??t??i)+n))}function Wi(e,t,n){return qt(e,t,n,Ki)}function Pi(e,t,n){return qt(e,t,n,Ri)}function Ht(e){const t=e.trim();if(!t)return null;const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(!n)return null;const i=Number(n[1]),s=Number(n[2]);return i>23||s>59?null:i*60+s}const qi=Ht;function Ft(e){const t=Math.max(pe,Math.min(ve,Math.round(e))),n=Math.floor(t/60),i=t%60;return`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}`}const Hi=Ft;function He(e,t){if(t===null)return null;const[n,i,s]=e.split("-").map(Number);if(!n||!i||!s)return null;const a=new Date(n,i-1,s),r=Math.max(pe,Math.min(ve,Math.round(t)));return a.setHours(Math.floor(r/60),r%60,0,0),a}const Vt=He;function Fi(e){return e==="set"||e==="done"||e==="skip"}function Ut(e,t){return e.date===t&&Fi(e.kind)}function Fe(e,t){return e.filter(n=>Ut(n,t)).sort(J).at(-1)}function ne(e,t){return Fe(e,t)}function Yt(e,t){const n=ne(e,t);return n?.kind==="skip"?n.skip_reason:null}function Jt(e,t){return ne(e,t)?.kind==="done"}function Zt(e,t){return ne(e,t)?.kind==="set"}function Xt(e,t){const n=ne(e,t);return n?.kind==="set"||n?.kind==="done"}function Vi(e,t){return e!==null&&e<ji||t!==null&&t<=Ai}function Ui(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const i=Math.max(1,Math.ceil(n/2));return Math.min(t,e+i)}function de(e,t,n,i){if(t<i)return"empty";const s=ne(e,t);return s?.kind==="done"||s?.kind==="set"?"done":s?.kind==="skip"?"skip":Z(e,t,"miss")?"miss":t>=n?"empty":"miss"}function Yi(e,t,n="1970-01-01"){let i=0,s=t;for(let a=0;a<400;a+=1){const r=de(e,s,t,n);if(r==="done")i+=1;else if(r==="skip"||r==="empty"&&s===t){s=C(s,-1);continue}else break;s=C(s,-1)}return i}function Ji(e,t,n){const i=we(t),s=!n||n<i?i:n;let a=0,r=0;for(const d of _e(s,t)){const c=de(e,d,t,n??s);c==="skip"||c==="empty"||(r+=1,c==="done"&&(a+=1))}return{hits:a,eligible:r}}function Zi(e,t,n="1970-01-01",i=3){const s=de(e,t,t,n);if(s==="done"||s==="skip")return!1;const a=C(t,-1);if(a<n)return!1;const r=C(t,-i),d=n>r?n:r;return _e(d,a).some(c=>de(e,c,t,n)==="miss")}function Xi(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled&&!e.todayLogged?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function Qi(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${at(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${at(e.milestone)}.`}function at(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function Qt(e,t,n){return t.filter(s=>s.kind==="set"&&s.date<=n).sort(J).at(-1)?.value??e}function ea(e,t,n,i){const s=Gt(e.a,n),a=Ge(n,i),r=ze(n,i),d=Ni(n,i),c=Pe(n,i),g=qe(n,i),u=Jt(n,i),y=Zt(n,i),w=Xt(n,i),j=Yt(n,i),O=Vi(a,r),N=s>=t.milestone,v=s>=e.b,m=Zi(n,i,t.started_on),S=we(i),X=Qt(e.a,n,C(S,-1)),hn=Xi({current:s,weekStartCurrent:X,gearDown:O,stalled:m,milestoneHit:N,todayLogged:y||u||!!j});return{current:s,sleep:a,energy:r,weight:d,wake:c,meal:g,doneToday:u,plusToday:y,setLoggedToday:w,skipToday:j,gearDown:O,milestoneHit:N,atB:v,trend:hn,hitrate:Ji(n,i,t.started_on),streak:Yi(n,i,t.started_on),nextAction:Qi({milestone:t.milestone,b:e.b,gearDown:O,milestoneHit:N,atB:v,stalled:m,doneToday:u,plusToday:y,skipToday:j}),suggestedMilestone:N&&!v&&!O?Ui(t.milestone,e.b):null}}function ta(e,t,n,i){return Y(e,t,n).some(s=>(s.kind==="set"||s.kind==="done"||s.kind==="skip"||s.kind==="miss")&&s.date<i)}function en(e,t){return e.created_at.localeCompare(t.created_at)}function na(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(en).at(-1)}function ia(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip"||n.kind==="miss")).sort(en).at(-1)}function aa(e,t=[]){const n=K(e);return n.setHours(12,0,0,0),wt({today:e,now:n,wakeAt:He(e,Pe(t,e)),mealAt:Vt(e,qe(t,e)),sleepSet:Ge(t,e)!==null,energySet:ze(t,e)!==null})}function ye(e,t,n=[]){const i=aa(t,n);return[...Lt(e,t),...Et(e,t),...Mt(e,t)].filter(s=>se(s,i))}function be(e,t,n,i,s){const a=Y(e,t,s),r=ia(a,n);if(r?.kind==="set"||r?.kind==="done")return{item:t,date:n,mark:"hit",reason:null};if(r?.kind==="skip")return{item:t,date:n,mark:"skip",reason:r.skip_reason};const d=r?.kind==="miss"?r:na(a,n,"miss");return d?{item:t,date:n,mark:"miss",reason:d.skip_reason}:n>=i?{item:t,date:n,mark:"open",reason:null}:{item:t,date:n,mark:"idle",reason:null}}function tn(e,t,n,i){const s=C(n,-1);return ye(e,s,t).filter(a=>ta(t,a,i,s)).map(a=>{const r=be(t,a,s,n,i);return r.mark==="hit"||r.mark==="skip"||r.mark==="miss"?r:{...r,mark:"miss",reason:null}}).filter(a=>a.mark==="miss"&&!a.reason)}function sa(e,t,n){return e.some(i=>i.mark==="hit")?"hit":e.some(i=>i.mark==="miss")?"miss":e.some(i=>i.mark==="skip")?"skip":t===n?"open":"idle"}function nn(e,t,n,i){const s=we(n),a=C(s,6),r=tn(e,t,n,i),d=new Set(r.map(v=>`${v.item.id}:${v.date}`)),c=_e(s,a).map(v=>{const m=ye(e,v,t).map(S=>{const X=be(t,S,v,n,i);return d.has(`${S.id}:${v}`)?{...X,mark:"miss",reason:X.reason}:X});return{date:v,label:En(v),mark:sa(m,v,n),hits:m.filter(S=>S.mark==="hit").length,misses:m.filter(S=>S.mark==="miss").length,skips:m.filter(S=>S.mark==="skip").length}}),g=c.filter(v=>v.date<n),u=g.reduce((v,m)=>v+m.hits,0),y=g.reduce((v,m)=>v+m.misses,0),w=g.reduce((v,m)=>v+m.skips,0),j=g.flatMap(v=>ye(e,v.date,t).map(m=>{const S=be(t,m,v.date,n,i);return d.has(`${m.id}:${v.date}`)?{...S,mark:"miss",reason:S.reason}:S}).filter(m=>m.mark==="miss")),O=g.filter(v=>v.mark!=="idle").length,N=u>0&&y===0&&O>=2?"Week staat.":null;return{start:s,end:a,range:`${z(s)} – ${z(a)}`,days:c,hits:u,misses:y,skips:w,missRows:j,note:N}}function re(e){return U(e)?.id}function st(e,t){return e.created_at.localeCompare(t.created_at)}function ra(e,t){const n=new Map;for(const i of[...e].sort(st))i.kind!=="body_weight"||i.value===null||i.date>t||n.set(i.date,i);return[...n.values()].sort((i,s)=>i.date.localeCompare(s.date)||st(i,s)).map(i=>({date:i.date,kg:i.value}))}function oa(e,t,n,i,s){const a=nn(e,t,n,s??re(e)),r=a.days.map(d=>({date:d.date,label:d.label,current:Qt(i,t,d.date<=n?d.date:n),mark:d.mark}));return{week:a,line:r,weight:ra(t,n),hits:a.hits,skips:a.skips,misses:a.misses}}function an(e,t,n,i=18,s=16){if(e.length===0)return[];const a=Math.min(...e),d=Math.max(...e)-a,c=t-i*2,g=n-s*2;return e.map((u,y)=>{const w=e.length===1?t/2:i+y/(e.length-1)*c,j=d===0?n/2:s+(1-(u-a)/d)*g;return{x:w,y:j}})}function sn(e){return e.map(t=>`${t.x.toFixed(1)},${t.y.toFixed(1)}`).join(" ")}function la(e){return e.skip?null:e.plus?{text:"Set gedaan.",tone:"fog"}:e.done?e.type==="medicijn"?{text:"Genomen.",tone:"sage"}:e.track?{text:"Set staat.",tone:"sage"}:{text:"Staat.",tone:"sage"}:null}function rn(e,t){return{id:e,tenant_id:t,display_name:null,...Ot(),age_band:null,goals:[],themes:[]}}function on(e,t,n=b()){return{id:W(),tenant_id:t,vector_id:e,milestone:h.milestone,started_on:n,deadline:C(n,h.windowDays),status:"active",stage_type:h.stageType}}function Ve(e){const t=n=>({id:W(),tenant_id:e,timing:ae(),role:null,template:null,later:!1,...n});return[t({type:"daily",label:"Push-ups",unit:"reps",a:h.a,b:h.b,milestone:h.milestone,weekdays:null,times_per_week:null,sort:0}),t({type:"daily",label:"Squats",unit:"reps",a:30,b:null,milestone:null,weekdays:null,times_per_week:null,sort:1}),t({type:"daily",label:"Plank",unit:"sec",a:60,b:null,milestone:null,weekdays:null,times_per_week:null,sort:2}),t({type:"daily",label:"Dead hang",unit:"sec",a:45,b:null,milestone:null,weekdays:null,times_per_week:null,sort:3}),t({type:"weekly",label:"Gerichte kracht",unit:null,a:null,b:null,milestone:null,weekdays:[],times_per_week:2,sort:4}),t({type:"leefregel",label:"Koud douchen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:5,template:"hypothesis"}),t({type:"leefregel",label:"Niet snoepen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:6}),t({type:"leefregel",label:"Low carb",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:7,role:"preference",template:"user preference"}),t({type:"leefregel",label:"Intermittent fasting",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:8}),t({type:"leefregel",label:"Geen alcohol",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:9}),t({type:"gedrag",label:"Cafeïne 90 min na opstaan",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:10,role:"constraint",template:"public-framework",timing:{mode:"relative",clock:null,anchor:"wake",offset_min:90,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Wandelen na eten",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:11,role:"action",template:"evidence-informed",timing:{mode:"relative",clock:null,anchor:"meal",offset_min:0,window_min:null,frequency:"daily",condition:"na eten"}}),t({type:"medicijn",label:"Medicijn ochtend",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:12,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"ochtend"}}),t({type:"supplement",label:"Vitamine D",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:13,role:"action",template:"guideline",timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Bellen met iemand",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:14,role:"action",template:null,timing:{mode:"clock",clock:"18:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Iemand zien",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:1,sort:15,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"deze week"}}),t({type:"gedrag",label:"Scherm uit 22:00",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:16,role:"constraint",template:"user preference",timing:{mode:"clock",clock:"22:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Korte rust",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:17,role:"action",template:"user preference",timing:{mode:"clock",clock:"08:00",anchor:null,offset_min:null,window_min:840,frequency:"daily",condition:"body"}})]}function da(e,t){return{id:e.id,tenant_id:e.tenant_id,user_id:t,domain:h.domain,a:e.a??h.a,b:e.b??h.b,unit:e.unit==="sec"?"sec":"reps",pace_constraint:null}}function ca(e,t=b(),n=W()){const i=rn(e,n),s=Ve(n),a=U(s)??s[0],r=da(a,e),d=on(r.id,n,t);return a.milestone!==null&&(d.milestone=a.milestone),{profile:i,items:s,vector:r,stage:d,events:[],rotated:!1,onboarded:!1,theme_step:!1}}function ln(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,items:e.items.map(n=>te(n)?{...n,a:h.a,b:h.b,milestone:h.milestone,unit:h.unit}:n),vector:{...e.vector,a:h.a,b:h.b,unit:h.unit},stage:{...e.stage,milestone:h.milestone},events:e.events}:e}function ua(){const e=localStorage.getItem(Ze);if(e)return e;const t=W();return localStorage.setItem(Ze,t),t}function fa(){const e=localStorage.getItem(Xe);if(e)return e;const t=W();return localStorage.setItem(Xe,t),t}function $(e){localStorage.setItem(ue,JSON.stringify(e))}function ma(e){if(!e)return null;try{const t=JSON.parse(e);return!t||typeof t!="object"?null:t}catch{return null}}function pa(){return[ue,...gt].map(e=>ma(localStorage.getItem(e))).filter(e=>e!==null)}function dn(e,t,n){const i=Ce(e.items??[],Ve(n),n).map(s=>qn(s,n));return{...e,profile:{...rn(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...Ot(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null,age_band:e.profile?.age_band??null,goals:Array.isArray(e.profile?.goals)?e.profile.goals:[],themes:D(e.profile?.themes)},items:i,vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(s=>({...s,tenant_id:s.tenant_id??n,item_id:s.item_id??null})),rotated:!!e.rotated,onboarded:e.onboarded??!0,theme_step:e.theme_step??!1}}function I(e,t){const n=pa();if(n.length===0){const a=ca(e,b(),t);return $(a),a}const i=oi(n,Ve(t),e,t)??n[0],s=ln(dn(i,e,t));return $(s),s}function va(){localStorage.setItem(xn,"1");const e=ua(),t=fa();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return I(e,t)},async addEvent(n){const i=I(e,t),s={id:n.id??W(),tenant_id:t,user_id:e,item_id:n.item_id??null,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:Tn()};return i.events.push(s),$(i),s},async removeEvent(n){const i=I(e,t),s=i.events.find(a=>a.id===n);if(s){if(!Ut(s,b()))throw new Error("alleen vandaag");i.events=i.events.filter(a=>a.id!==n),$(i)}},async saveProfile(n){const i=I(e,t);i.profile=n,$(i)},async saveOnboarding(n){const i=I(e,t);i.profile={...i.profile,goals:n.goals,age_band:n.age_band,themes:D(i.profile.themes)},i.items=fi(i.items,n.startIds),i.onboarded=!0,i.theme_step=!0,$(i)},async saveThemes(n){const i=I(e,t);i.profile={...i.profile,themes:D(n)},i.theme_step=!0,$(i)},async setItemLater(n,i){const s=I(e,t);s.items=s.items.map(a=>a.id===n?{...a,later:i}:a),$(s)},async addItem(n){const i=I(e,t),s=ei(i.items,n.label);if(s){const r=ii(s,{label:n.label,kind:n.kind,timing:n.timing});if(!r)throw new Error("naam ontbreekt");return i.items=i.items.map(d=>d.id===r.id?r:d),$(i),r}const a=ti({tenantId:t,label:n.label,kind:n.kind,timing:n.timing,sort:Yn(i.items)});if(!a)throw new Error("naam ontbreekt");if(!Xn(i.items,a.label))throw new Error("item bestaat al");return i.items=[...i.items,a],$(i),a},async updateItem(n){const i=I(e,t),s=i.items.find(r=>r.id===n.id);if(!s)throw new Error("item ontbreekt");if(!q(n.label))throw new Error("naam ontbreekt");if(!Qn(i.items,s.id,n.label))throw new Error("item bestaat al");const a=ni(s,n);if(!a)throw new Error("alleen eigen item");return i.items=i.items.map(r=>r.id===a.id?a:r),$(i),a},async removeItem(n){const i=I(e,t),s=i.items.find(r=>r.id===n);if(!s)throw new Error("item ontbreekt");const a=ai(s);if(!a)throw new Error("item blijft");return i.items=i.items.map(r=>r.id===a.item.id?a.item:r),$(i),a.item},async saveVectorConstraint(n,i){const s=I(e,t);s.vector.id===n&&(s.vector.pace_constraint=i,$(s))},async advanceStage(n,i){const s=I(e,t),a=on(n.vector_id,t);return a.milestone=i,s.stage=a,s.items=s.items.map(r=>r.id===n.vector_id?{...r,milestone:i}:r),s.rotated=!0,$(s),a},async importJson(n){const i=Ei(n),s=I(e,t),a=ln(dn(Ti(s,i),e,t));return $(a),a},async signOut(){}}}const rt="#F0ECE4",ga="#3D6B5A";function cn(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${rt}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${rt}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${ga}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function k(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function ya(e){return e==="stokt"||e==="herstel"?"ember":e==="stijgt"?"sage":"fog"}function ot(e){const t=ya(e);return e==="stokt"||e==="herstel"||e==="zakt"?k("status-kink",`ico-${t}`):e==="stijgt"?k("status-up",`ico-${t}`):k("status-flat",`ico-${t}`)}function ba(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${k(n?"dot-now":"dot")}</button>`}).join("")}const ka=`
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
</svg>`;function ha(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",ka)}const F=()=>document.querySelector("#app"),l={screen:"vandaag",skipItemId:null,missKey:null,detailItemId:null,advanceWarn:!1,busy:!1,error:null,startIds:[],addKind:"gedrag",addLabel:"",addTiming:"",editKind:"gedrag",editLabel:"",editTiming:"",removeAsk:!1,importPaste:""};let p=null,o=null;function ie(){if(!o)throw new Error("geen snapshot");const e=U(o.items);return ea(o.vector,o.stage,Un(o.events,e),b())}function G(e,t=b()){if(!o)throw new Error("geen snapshot");const n=U(o.items),i=Y(o.events,e,n?.id),s=e.a===null?null:Gt(e.a,i);return{done:Jt(i,t),plus:Zt(i,t),skip:Yt(i,t),logged:Xt(i,t),current:s}}function un(e,t){return`${e}:${t}`}function wa(e=b()){const t=o?.events??[];return wt({today:e,now:new Date,wakeAt:He(e,Pe(t,e)),mealAt:Vt(e,qe(t,e)),sleepSet:Ge(t,e)!==null,energySet:ze(t,e)!==null})}function f(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function _(){if(!o||!p)return;const e=ci(o);if(e){F().innerHTML=Da(e);return}const t=ie(),{vector:n,stage:i}=o,s=p.mode==="local"?"Lokaal":"Supabase",a=`
    <div class="hdr">
      <div>
        ${cn()}
        <div class="date-s">${Ln(b())}</div>
      </div>
      <div class="mode-pill">${s}</div>
    </div>`,r=`
    <nav class="nav nav-4">
      <button data-nav="vandaag" class="${l.screen==="vandaag"?"active":""}">${k("day")}Vandaag</button>
      <button data-nav="koers" class="${l.screen==="koers"?"active":""}">${k("mark")}Koers</button>
      <button data-nav="voortgang" class="${l.screen==="voortgang"?"active":""}">${k("line")}Voortgang</button>
      <button data-nav="profiel" class="${l.screen==="profiel"?"active":""}">${k("me")}Profiel</button>
    </nav>`;if(l.detailItemId){const d=o.items.find(c=>c.id===l.detailItemId);if(d){F().innerHTML=`
      ${a}
      ${Ka(d)}
      ${l.error?`<p class="error" style="padding:0 18px">${f(l.error)}</p>`:""}
      ${r}`;return}l.detailItemId=null}if(l.screen==="vandaag"){const d=yi(o.profile.identity_new,o.events),c=b(),g=wa(c),u=Lt(o.items,c).filter(m=>se(m,g)),y=Fn(o.items,c),w=Et(o.items,c).filter(m=>se(m,g)),j=Mt(o.items,c).filter(m=>se(m,g)),O=Vn(o.items,c),N=Hn(o.items,c),v=tn(o.items,o.events,c,re(o.items));F().innerHTML=`
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
                value="${t.wake===null?"":Ft(t.wake)}"
              >
            </div>
            <button class="nb" data-act="wake-inc" aria-label="Opstaan later">+</button>
          </div>
        </div>
        <div class="row">
          <div class="lbl">Maaltijd</div>
          <div class="num-row">
            <button class="nb" data-act="meal-dec" aria-label="Maaltijd eerder">−</button>
            <div class="nwrap">
              <input
                class="ninp ninp-time"
                data-id="meal"
                type="time"
                enterkeyhint="done"
                aria-label="Maaltijd-tijd"
                value="${t.meal===null?"":Hi(t.meal)}"
              >
            </div>
            <button class="nb" data-act="meal-inc" aria-label="Maaltijd later">+</button>
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
          <div class="dots">${ba(t.energy)}</div>
        </div>
      </div>
      ${N.length?`<div class="sec-hd">Dag</div>
      <div class="card quiet">
        <div class="day-tags">${N.map(m=>Oa(m)).join("")}</div>
      </div>`:""}
      ${y.length?`<div class="sec-hd">Regel</div>${y.map(m=>za(m)).join("")}`:""}
      ${w.length?`<div class="sec-hd">Stofjes</div>${w.map(m=>lt(m)).join("")}`:""}
      ${j.length?`<div class="sec-hd">Sociaal</div>${j.map(m=>lt(m)).join("")}`:""}
      ${v.length?`<div class="sec-hd">Niet gedaan</div>
      <div class="card">
        <div class="note" style="margin-top:0">Geen +1, Done of Skip. Korte reden.</div>
        ${v.map(m=>fn(m)).join("")}
      </div>`:""}
      <div class="sec-hd">Vandaag</div>
      ${u.map(m=>Wa(m,t,d)).join("")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Niet in je start. Blijft bewaard.</div>
        ${O.map(m=>La(m)).join("")}
        <button class="btn ghost later-add" data-nav="profiel">Eigen item</button>
      </div>
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${ot(t.trend.word)}
          <div class="word">${t.trend.word}</div>
        </div>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${f(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="koers"){F().innerHTML=`
      ${a}
      ${ut(o.profile.themes,"Tik een suggestie of typ zelf. Geen vaste lijst. Later aan te passen.")}
      ${dt(nn(o.items,o.events,b(),re(o.items)))}
      <div class="sec-hd">Strength · push-ups</div>
      <div class="card">
        <div class="kv">
          <div><div class="lbl">A</div><div class="val">${T(n.a)}</div></div>
          <div><div class="lbl">B</div><div class="val">${T(n.b)}</div></div>
          <div><div class="lbl">Nu</div><div class="val">${T(t.current)}</div></div>
          <div><div class="lbl">Etappe</div><div class="val">${T(i.milestone)}</div></div>
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
            <div class="val status">${ot(t.trend.word)} ${t.trend.word}</div>
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
      ${ki(o.profile.horizon_1y,o.rotated)?'<div class="banner">Zet een 1-jaars B. Etappes roteren.</div>':""}
      <div class="sec-hd">${k("ik")} Ik</div>
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
      ${ct()}
      ${l.error?`<p class="error" style="padding:0 18px">${f(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="voortgang"){const d=oa(o.items,o.events,b(),o.vector.a,re(o.items));F().innerHTML=`
      ${a}
      ${dt(d.week)}
      <div class="sec-hd">Lijn</div>
      <div class="card">
        <div class="note" style="margin-top:0">Huidige deze week. Geen score.</div>
        ${Ca(d.line.map(c=>c.current),b(),d.line)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Nu</div><div class="val">${T(t.current)}</div></div>
          <div><div class="lbl">Gedaan</div><div class="val">${d.hits}</div></div>
        </div>
      </div>
      ${Na(d.weight)}
      ${l.error?`<p class="error" style="padding:0 18px">${f(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="profiel"){const d=o.profile.goals??[],c=o.profile.age_band,g=di(o.items);F().innerHTML=`
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
      ${ut(o.profile.themes,"Tik een suggestie of typ zelf. Later aan te passen.")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Parkeren of terughalen. Events blijven.</div>
        ${g.map(u=>Ea(u)).join("")}
      </div>
      ${Ta(o.items)}
      ${Aa()}
      ${ct()}
      ${l.error?`<p class="error" style="padding:0 18px">${f(l.error)}</p>`:""}
      ${r}`;return}}function _a(e){const t=G(e),n=la({plus:t.plus,done:t.done,skip:t.skip,type:e.type,track:te(e)});return n?`<div class="confirm ${n.tone}" role="status">${f(n.text)}</div>`:""}function $a(e){if(!o)return"";const t=U(o.items);return Fe(Y(o.events,e,t?.id),b())?`<button class="undo" type="button" data-act="undo" data-item="${e.id}">Ongedaan</button>`:""}function Ue(e){return`${_a(e)}${$a(e)}`}function lt(e){const t=G(e),n=t.logged||!!t.skip,i=e.type==="medicijn"?"Genomen":"Done",s=fe(e);return`
      <div class="card stof">
        ${Ye(e)}
        ${s?`<div class="note">${f(s)}</div>`:""}
        <div class="actions actions-two">
          <button class="btn ico-btn ${t.done?"track":""}" data-act="done" data-item="${e.id}" ${n?"disabled":""}>${k("done")}<span>${i}</span></button>
          <button class="btn ico-btn skip ${t.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${t.logged?"disabled":""}>${k("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||t.skip?`<div class="chips">${ce.map(a=>`<button class="chip ${t.skip===a?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${a}">${a}</button>`).join("")}</div>`:""}
        ${Ue(e)}
      </div>`}function xa(e,t,n,i){return`<div class="chips">${ce.map(s=>`<button class="chip ${n===s?"on":""}" data-act="${i}" data-item="${e}" data-date="${t}" data-reason="${s}">${s}</button>`).join("")}</div>`}function fn(e){const t=l.missKey===un(e.item.id,e.date)||!!e.reason;return`
      <div class="miss-row">
        <button class="miss-item" data-act="miss-open" data-item="${e.item.id}" data-date="${e.date}">
          <span class="ex-nm">${f(e.item.label)}</span>
          <span class="note">${e.reason?f(e.reason):z(e.date)}</span>
        </button>
        ${t?xa(e.item.id,e.date,e.reason,"miss"):""}
      </div>`}function Sa(e){const t=[];return e.hits&&t.push(`${e.hits} gedaan`),e.skips&&t.push(`${e.skips} overgeslagen`),e.misses&&t.push(`${e.misses} niet gedaan`),t.length===0?"Nog geen dagen deze week.":t.join(" · ")}function Ia(e){return e==="skip"?"–":e==="miss"?"×":"·"}function dt(e){return`
      <div class="sec-hd">Week</div>
      <div class="card">
        <div class="note" style="margin-top:0">${f(e.range)}</div>
        <div class="week-strip" aria-label="Weekoverzicht">
          ${e.days.map(t=>`<div class="week-day ${t.mark}${t.date===b()?" today":""}">
            <span class="week-lbl">${t.label}</span>
            <span class="week-mark">${Ia(t.mark)}</span>
          </div>`).join("")}
        </div>
        <div class="note">${f(Sa(e))}</div>
        ${e.note?`<div class="week-note">${f(e.note)}</div>`:""}
        ${e.missRows.length?e.missRows.map(t=>fn(t)).join(""):""}
      </div>`}function mn(e){return kt(e)||R(e)?`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${f(e.label)}</button>`:`<div class="ex-nm">${f(e.label)}</div>`}function La(e){return`
      <div class="later-row">
        ${mn(e)}
        <button class="btn ghost later-now" data-act="later-now" data-item="${e.id}">Nu</button>
      </div>`}function Ea(e){const t=e.later;return`
      <div class="later-row">
        <div>
          ${mn(e)}
          <div class="note" style="margin-top:4px">${t?"Later":"Nu"}</div>
        </div>
        <button class="btn ghost later-now" data-act="${t?"later-now":"later-park"}" data-item="${e.id}">${t?"Nu":"Later"}</button>
      </div>`}function Ma(e){const t=Me[At(e)],n=jt(e);return`
      <div class="later-row">
        <div>
          <button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${f(e.label)}</button>
          <div class="note" style="margin-top:4px">${f(t)}${n?` · ${f(n)}`:""}</div>
        </div>
        <button class="btn ghost later-now" data-act="detail-open" data-item="${e.id}">Wijzig</button>
      </div>`}function Ta(e){const t=Zn(e);return t.length===0?"":`
      <div class="sec-hd">Eigen items</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Label, type of tijd. Weg haalt het uit Vandaag. Log blijft.</div>
        ${t.map(n=>Ma(n)).join("")}
      </div>`}function ct(){return`
      <div class="card stack io-card">
        <button class="btn ghost ico-btn" data-act="export">${k("export")}<span>Exporteer JSON</span></button>
        <div class="note" style="margin-top:4px">Voegt toe. Bestaande rijen blijven.</div>
        <button class="btn ghost ico-btn" data-act="import-pick">${k("import")}<span>Kies bestand</span></button>
        <input data-id="import-file" class="import-file" type="file" accept="application/json,.json" />
        <div class="field">
          <div class="lbl">Of plak JSON</div>
          <textarea data-id="import-paste" placeholder='{"key":"routine_loop_v6"}'>${f(l.importPaste)}</textarea>
        </div>
        <button class="btn ghost ico-btn" data-act="import-go">${k("import")}<span>Importeer JSON</span></button>
      </div>`}function Aa(){return`
      <div class="sec-hd">Eigen item</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Label, type, optioneel tijdstip. Geen dosis. Bestaande items blijven.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="item-label" type="text" maxlength="${Te}" placeholder="Bijv. Avondwandeling" autocomplete="off" enterkeyhint="done" value="${f(l.addLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${Le.map(e=>`<button class="chip pick ${l.addKind===e?"on":""}" data-act="item-kind" data-kind="${e}">${Me[e]}</button>`).join("")}</div>
        <div class="field" style="margin-top:12px">
          <div class="lbl">Tijd</div>
          <input data-id="item-timing" type="text" maxlength="${Ae}" placeholder="22:00 of ochtend" autocomplete="off" enterkeyhint="done" value="${f(l.addTiming)}" />
        </div>
        <div class="stack">
          <button class="btn primary" data-act="item-add">Voeg toe</button>
        </div>
      </div>`}function ja(e){if(e.length===0)return"";const t=z(e[0].date),n=z(e[e.length-1].date);return t===n?t:`${t} – ${n}`}function Ba(e){const i=an(e.map(r=>r.kg),294,72);if(i.length===0)return"";const s=i.length-1,a=i.map((r,d)=>{const c=d===s;return`<circle class="${c?"prog-dot now":"prog-dot"}" cx="${r.x.toFixed(1)}" cy="${r.y.toFixed(1)}" r="${c?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${sn(i)}" />
          ${a}
        </svg>`}function Na(e){if(e.length===0)return"";const t=e[e.length-1];return`
      <div class="sec-hd">Gewicht</div>
      <div class="card">
        <div class="note" style="margin-top:0">${f(ja(e))}</div>
        ${Ba(e)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Laatst</div><div class="val">${t.kg.toFixed(1)} kg</div></div>
        </div>
      </div>`}function Ca(e,t,n){const a=an(e,294,72);if(a.length===0)return'<div class="note">Nog geen lijn.</div>';const r=a.map((d,c)=>{const g=n[c]?.date===t;return`<circle class="${n[c]?.mark==="miss"?"prog-dot miss":g?"prog-dot now":"prog-dot"}" cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${g?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${sn(a)}" />
          ${r}
        </svg>`}function ut(e,t){return`
      <section class="theme-sec" data-sec="themes">
        <div class="sec-hd">Thema's</div>
        <div class="card">
          <div class="ex-nm">Trainingsrichting</div>
          <div class="note">${f(t)}</div>
          ${Rt(e)}
        </div>
      </section>`}function Da(e){if(!o)return"";const t=o.profile.goals??[],n=o.profile.age_band,i=ui(o.items,t),s=l.startIds,a=`
    <div class="hdr">
      <div>
        ${cn()}
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
        ${Rt(r)}
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-themes-done">Verder</button>
        </div>
      </div>`}return`
    ${a}
    <div class="sec-hd">Start</div>
    <div class="card">
      <div class="ex-nm">Max ${oe} nu</div>
      <div class="note">De rest gaat naar Later. Later blijft zichtbaar.</div>
      <div class="chips">${i.map(r=>`<button class="chip pick ${s.includes(r.id)?"on":""}" data-act="onboard-start" data-item="${r.id}">${f(r.label)}</button>`).join("")}</div>
      <div class="note">${s.length} / ${oe} gekozen</div>
      <div class="stack" style="margin-top:16px">
        <button class="btn primary" data-act="onboard-done" ${s.length===0?"disabled":""}>Naar Vandaag</button>
      </div>
    </div>`}function Ye(e){return!kt(e)&&!R(e)?`<div class="ex-nm">${f(e.label)}</div>`:`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${f(e.label)}</button>`}function Oa(e){return`<button class="chip pick" data-act="detail-open" data-item="${e.id}">${f(e.label)}</button>`}function Ka(e){const t=$e(e),n=fe(e),i=zn(e.timing),s=Wn(e.timing),a=Tt(e),r=Se(e),d=P(e),c=R(e);return`
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
        ${Ue(e)}
      </div>
      ${t?`<div class="sec-hd">Bron</div>
      <div class="card quiet">
        <div class="src-tag">${f(t)}</div>
      </div>`:""}
      ${c?Ra():Ga(e)}`}function Ra(){return`
      <div class="sec-hd">Wijzig</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Zelfde item. Geen dosis. Log blijft.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="edit-label" type="text" maxlength="${Te}" placeholder="Naam" autocomplete="off" enterkeyhint="done" value="${f(l.editLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${Le.map(e=>`<button class="chip pick ${l.editKind===e?"on":""}" data-act="edit-kind" data-kind="${e}">${Me[e]}</button>`).join("")}</div>
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
      </div>`}function Ga(e){return Ne(e)?e.later?`
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
      </div>`:""}function za(e){const t=fe(e);return`
      <div class="card quiet">
        ${Ye(e)}
        ${t?`<div class="note">${f(t)}</div>`:'<div class="note">Regel. Geen afvinken.</div>'}
      </div>`}function Wa(e,t,n){const i=G(e),s=te(e),a=i.logged||!!i.skip,r=s&&i.current!==null&&e.b!==null&&i.current>=e.b,d=a||r,c=s,g=Tt(e),u=fe(e),y=c&&t.suggestedMilestone&&e.id===o.vector.id;return`
      <div class="card">
        ${Ye(e)}
        ${u&&!g&&!s?`<div class="note">${f(u)}</div>`:""}
        ${s?`<div class="track">
          <span class="now">${T(i.current??e.a??0)}</span>
          <span>→</span>
          <span class="mid">${T(e.milestone??0)}</span>
          <span>→</span>
          <span class="end">${T(e.b??0)}</span>
        </div>`:g?`<div class="work">${f(g)}</div>`:""}
        <div class="actions ${s?"":"actions-two"}">
          ${s?`<button class="btn ico-btn ${i.plus?"on":""}" data-act="plus" data-item="${e.id}" ${d?"disabled":""}>${k("plus")}<span>+1</span></button>`:""}
          <button class="btn ico-btn ${i.done?"track":""}" data-act="done" data-item="${e.id}" ${a?"disabled":""}>${k("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${i.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${i.logged?"disabled":""}>${k("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||i.skip?`<div class="chips">${ce.map(w=>`<button class="chip ${i.skip===w?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${w}">${w}</button>`).join("")}</div>`:""}
        ${Ue(e)}
        ${y?`<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${T(t.suggestedMilestone)}.</div>
               ${l.advanceWarn&&o.profile.identity_constraint?`<div class="banner">Check: ${f(o.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${T(t.suggestedMilestone)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`:`<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${t.suggestedMilestone}">Volgende etappe ${T(t.suggestedMilestone)}</button>
                      </div>`}`:""}
        ${c&&n?`<div class="note">${f(n)}</div>`:""}
      </div>`}function T(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function L(e){if(!l.busy){l.busy=!0,l.error=null;try{await e()}catch(t){l.error=t instanceof Error?t.message:"Er ging iets mis"}finally{l.busy=!1,_()}}}async function Pa(e){p=e,o=await p.load(),l.screen="vandaag",_()}async function qa(){ha(),Ha(),await Pa(va())}function Ha(){document.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const t=e.target;if(t instanceof HTMLInputElement){if(t.dataset.id==="theme-custom"){e.preventDefault(),kn();return}if(t.dataset.id==="item-label"||t.dataset.id==="item-timing"){e.preventDefault(),bn();return}if(t.dataset.id==="edit-label"||t.dataset.id==="edit-timing"){e.preventDefault(),yn();return}if(t.dataset.id==="weight"){e.preventDefault(),mt(t.value);return}if(t.dataset.id==="wake"){e.preventDefault(),pt(t.value);return}t.dataset.id==="meal"&&(e.preventDefault(),vt(t.value))}}),document.addEventListener("change",e=>{const t=e.target;if(t instanceof HTMLInputElement&&(t.dataset.id==="weight"&&mt(t.value),t.dataset.id==="wake"&&pt(t.value),t.dataset.id==="meal"&&vt(t.value),t.dataset.id==="import-file"&&t.files?.[0])){const n=t.files[0];t.value="",n.text().then(i=>pn(i))}}),document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if($n(n)){l.screen=n,l.skipItemId=null,l.missKey=null,l.detailItemId=null,l.advanceWarn=!1,l.error=null,_();return}Fa(t)})}async function Fa(e){const t=e.dataset.act;if(!t)return;const n=B("import-paste");if(n!==null&&(l.importPaste=n),!p||!o)return;const i=ie(),s=b();if(t==="sleep-inc"||t==="sleep-dec"){const a=i.sleep??7,r=Math.max(0,Math.min(14,a+(t==="sleep-inc"?.5:-.5)));await M({date:s,kind:"body_sleep",value:r,skip_reason:null,item_id:null});return}if(t==="energy"){const a=Number(e.dataset.n),r=i.energy===a?null:a;if(r===null)return;await M({date:s,kind:"body_energy",value:r,skip_reason:null,item_id:null});return}if(t==="weight-inc"||t==="weight-dec"){const a=Di(i.weight,Ci(o.events),t==="weight-inc"?.1:-.1);if(i.weight===a)return;await M({date:s,kind:"body_weight",value:a,skip_reason:null,item_id:null});return}if(t==="wake-inc"||t==="wake-dec"){const a=Wi(i.wake,Gi(o.events),t==="wake-inc"?15:-15);if(i.wake===a)return;await M({date:s,kind:"body_wake",value:a,skip_reason:null,item_id:null});return}if(t==="meal-inc"||t==="meal-dec"){const a=Pi(i.meal,zi(o.events),t==="meal-inc"?15:-15);if(i.meal===a)return;await M({date:s,kind:"body_meal",value:a,skip_reason:null,item_id:null});return}if(t==="plus"){const a=o.items.find(d=>d.id===e.dataset.item);if(!a||!te(a))return;const r=G(a);if(r.logged||r.skip||a.b!==null&&r.current!==null&&r.current>=a.b)return;await M({date:s,kind:"set",value:(r.current??a.a??0)+1,skip_reason:null,item_id:a.id});return}if(t==="done"){const a=o.items.find(d=>d.id===e.dataset.item);if(!a)return;const r=G(a);if(r.logged||r.skip)return;await M({date:s,kind:"done",value:r.current??a.a,skip_reason:null,item_id:a.id});return}if(t==="detail-open"){const a=e.dataset.item??null,r=a?o.items.find(d=>d.id===a):void 0;if(!r)return;gn(r),l.detailItemId=r.id,_();return}if(t==="detail-close"){l.detailItemId=null,_();return}if(t==="skip-open"){const a=e.dataset.item??null;l.skipItemId=l.skipItemId===a?null:a,_();return}if(t==="skip"){const a=o.items.find(c=>c.id===e.dataset.item);if(!a||G(a).logged)return;const d=e.dataset.reason;if(!Je(d))return;await M({date:s,kind:"skip",value:null,skip_reason:d,item_id:a.id}),l.skipItemId=null;return}if(t==="undo"){const a=o.items.find(c=>c.id===e.dataset.item);if(!a)return;const r=U(o.items),d=Fe(Y(o.events,a,r?.id),s);if(!d)return;await Va(d.id),l.skipItemId=null;return}if(t==="miss-open"){const a=e.dataset.item,r=e.dataset.date;if(!a||!r)return;const d=un(a,r);l.missKey=l.missKey===d?null:d,_();return}if(t==="miss"){const a=o.items.find(g=>g.id===e.dataset.item),r=e.dataset.date,d=e.dataset.reason;if(!a||!r||r>=s||!Je(d))return;const c=G(a,r);if(c.logged||c.skip)return;await M({date:r,kind:"miss",value:null,skip_reason:d,item_id:a.id}),l.missKey=null;return}if(t==="advance"){if(!i.suggestedMilestone)return;if(bi(o.profile.identity_constraint)&&!l.advanceWarn){l.advanceWarn=!0,_();return}await ft(i.suggestedMilestone);return}if(t==="advance-go"){if(!i.suggestedMilestone)return;await ft(i.suggestedMilestone);return}if(t==="advance-cancel"){l.advanceWarn=!1,_();return}if(t==="onboard-goal"){const a=e.dataset.goal;if(!a||!Ct(a))return;const r={...o.profile,goals:mi(o.profile.goals??[],a)};await L(async()=>{await p.saveProfile(r),o.profile=r});return}if(t==="onboard-age"){const a=e.dataset.age;if(!a||!Dt(a))return;const r={...o.profile,age_band:a};await L(async()=>{await p.saveProfile(r),o.profile=r});return}if(t==="theme-toggle"){const a=e.dataset.theme;if(!a)return;await he(hi(D(o.profile.themes),a));return}if(t==="theme-add"){await kn();return}if(t==="onboard-start"){const a=e.dataset.item;if(!a)return;l.startIds=pi(l.startIds,a),_();return}if(t==="onboard-next"){_();return}if(t==="onboard-themes-done"){await he(o.profile.themes??[],!0);return}if(t==="onboard-done"){const a=o.profile.age_band,r=o.profile.goals??[];if(!a||r.length===0||l.startIds.length===0)return;await L(async()=>{await p.saveOnboarding({goals:r,age_band:a,startIds:l.startIds}),o=await p.load(),l.screen="vandaag"});return}if(t==="later-now"||t==="later-park"){const a=e.dataset.item;if(!a)return;await L(async()=>{await p.setItemLater(a,t==="later-park"),o=await p.load()});return}if(t==="item-kind"){const a=e.dataset.kind;if(!et(a))return;vn(),l.addKind=a,_();return}if(t==="item-add"){await bn();return}if(t==="edit-kind"){const a=e.dataset.kind;if(!et(a))return;ke(),l.editKind=a,_();return}if(t==="item-save"){await yn();return}if(t==="item-remove-ask"){ke(),l.removeAsk=!0,_();return}if(t==="item-remove-cancel"){l.removeAsk=!1,_();return}if(t==="item-remove"){const a=l.detailItemId;if(!a)return;await L(async()=>{await p.removeItem(a),o=await p.load(),l.detailItemId=null,l.removeAsk=!1,l.screen="profiel"});return}if(t==="save-ik"){const a={...o.profile,identity_anti:A(B("identity_anti"),x.identity_anti),identity_new:A(B("identity_new"),x.identity_new),identity_constraint:A(B("identity_constraint"),x.identity_constraint),horizon_1y:A(B("horizon_1y"),x.horizon_1y)};await L(async()=>{await p.saveProfile(a),o.profile=a});return}if(t==="export"){In(o);return}if(t==="import-pick"){document.querySelector("[data-id=import-file]")?.click();return}if(t==="import-go"){await pn(l.importPaste);return}}async function pn(e){const t=e.trim();if(!t){l.error=ee,_();return}await L(async()=>{o=await p.importJson(t),l.importPaste=""})}function vn(){l.addLabel=B("item-label")??l.addLabel,l.addTiming=B("item-timing")??l.addTiming}function ke(){l.editLabel=B("edit-label")??l.editLabel,l.editTiming=B("edit-timing")??l.editTiming}function gn(e){l.editLabel=e.label,l.editKind=At(e),l.editTiming=jt(e),l.removeAsk=!1}async function yn(){!p||!o||!l.detailItemId||(ke(),await L(async()=>{const e=await p.updateItem({id:l.detailItemId,label:l.editLabel,kind:l.editKind,timing:l.editTiming});o=await p.load(),gn(e),l.detailItemId=e.id}))}async function bn(){!p||!o||(vn(),await L(async()=>{await p.addItem({label:l.addLabel,kind:l.addKind,timing:l.addTiming}),o=await p.load(),l.addLabel="",l.addTiming=""}))}async function kn(){if(!o)return;const e=B("theme-custom")??"",t=D(o.profile.themes),n=wi(t,e);n.length===t.length&&n.every((i,s)=>i===t[s])||await he(n)}async function he(e,t=!1){if(!p||!o)return;const n=D(e),i={...o.profile,themes:n},s=t||!Nt(o);await L(async()=>{if(s){await p.saveThemes(n),o=await p.load();return}await p.saveProfile(i),o.profile=i})}function B(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function ft(e){await L(async()=>{o.stage=await p.advanceStage(o.stage,e),o.items=o.items.map(t=>t.id===o.stage.vector_id?{...t,milestone:e}:t),o.rotated=!0,l.advanceWarn=!1})}async function M(e){await L(async()=>{const t=await p.addEvent(e);o.events.push(t)})}async function Va(e){await L(async()=>{await p.removeEvent(e),o.events=o.events.filter(t=>t.id!==e)})}async function mt(e){if(!p||!o)return;const t=Oi(e);t!==null&&ie().weight!==t&&await M({date:b(),kind:"body_weight",value:t,skip_reason:null,item_id:null})}async function pt(e){if(!p||!o)return;const t=Ht(e);t!==null&&ie().wake!==t&&await M({date:b(),kind:"body_wake",value:t,skip_reason:null,item_id:null})}async function vt(e){if(!p||!o)return;const t=qi(e);t!==null&&ie().meal!==t&&await M({date:b(),kind:"body_meal",value:t,skip_reason:null,item_id:null})}qa();
