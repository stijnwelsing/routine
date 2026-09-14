(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const ue=["geen tijd","geen energie","vergeten","geen zin","pijn"];function tt(e){return!!(e&&ue.includes(e))}const Cn=["guideline","evidence-informed","public-framework","user preference","hypothesis"],Dn=["vandaag","koers","voortgang","profiel"];function On(e){return!!(e&&Dn.includes(e))}const $={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},fe="routine_loop_v6",_t=["routine_loop_v5","routine_loop_v4","routine_loop_v3"],nt="routine_local_user_id",it="routine_local_tenant_id",Kn="routine_local_chosen";function Rn(e){return JSON.stringify({exported_at:new Date().toISOString(),key:fe,profile:e.profile,items:e.items,vector:e.vector,stage:e.stage,events:e.events,rotated:e.rotated,onboarded:e.onboarded,theme_step:e.theme_step},null,2)}function zn(e){const t=new Blob([Rn(e)],{type:"application/json"}),n=URL.createObjectURL(t),i=document.createElement("a");i.href=n,i.download=`routine-${e.profile.id.slice(0,8)}.json`,i.click(),URL.revokeObjectURL(n)}const xt=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],St=["zo","ma","di","wo","do","vr","za"];function b(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${i}`}function D(e,t){const n=K(e);return n.setDate(n.getDate()+t),b(n)}function K(e){const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)}function Wn(e){const t=K(e);return`${St[t.getDay()]} ${t.getDate()} ${xt[t.getMonth()]}`}function W(e){const t=K(e);return`${t.getDate()} ${xt[t.getMonth()]}`}function Gn(e){return St[K(e).getDay()]}function Pn(e){const t=K(e).getDay();return t===0?7:t}function xe(e){const t=K(e),n=t.getDay(),i=n===0?-6:1-n;return t.setDate(t.getDate()+i),b(t)}function Se(e,t){const n=[];let i=e;for(;i<=t;)n.push(i),i=D(i,1);return n}function G(){return crypto.randomUUID()}function qn(){return new Date().toISOString()}function Hn(e){return e.trim().toLowerCase().normalize("NFC")}function Vn(e){return!!(e&&Cn.includes(e))}function Fn(e){const t=Hn(e);return t==="cafeïne 90 min na opstaan"?"public-framework":t==="wandelen na eten"?"evidence-informed":t==="low carb"||t==="scherm uit 22:00"||t==="korte rust"?"user preference":t==="vitamine d"?"guideline":t==="koud douchen"?"hypothesis":null}function Le(e){return Fn(e.label)??(Vn(e.template)?e.template:null)}function Lt(e){return Le(e)!==null}function re(){return{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:null,condition:null}}function Un(e){return{mode:e?.mode??null,clock:e?.clock??null,anchor:e?.anchor??null,offset_min:e?.offset_min??null,window_min:e?.window_min??null,frequency:e?.frequency??null,condition:e?.condition??null}}function It(e){return e.trim().toLowerCase().normalize("NFC")}function Yn(e){return It(e)==="korte rust"?{mode:"clock",clock:"08:00",window_min:840,frequency:"daily",condition:"body"}:null}function Jn(e,t){const n=Yn(t);return n?{...e,...n}:e}function Et(e){return{now:e.now??new Date,today:e.today,wakeAt:e.wakeAt??null,mealAt:e.mealAt??null,sleepSet:!!e.sleepSet,energySet:!!e.energySet}}function Ie(e){const t=e?.trim().toLowerCase();return t==="body"||t==="energy|sleep"?"body":t==="energy"?"energy":t==="sleep"?"sleep":null}function Zn(e,t){const n=Ie(e.condition);if(!n)return!0;const i=!!t.sleepSet,r=!!t.energySet;return n==="energy"?r:n==="sleep"?i:i||r}function Mt(e,t){const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(!n)return null;const i=Number(n[1]),r=Number(n[2]);if(i>23||r>59)return null;const a=K(e);return a.setHours(i,r,0,0),a}function Xn(e,t){return e==="wake"?t.wakeAt:e==="meal"?t.mealAt:null}function Qn(e,t){if(e.mode==="clock"&&e.clock)return Mt(t.today,e.clock);if(e.mode==="relative"&&e.anchor&&e.offset_min!==null){const n=Xn(e.anchor,t);return n?new Date(n.getTime()+e.offset_min*6e4):null}return null}function Tt(e,t){return!t||e.window_min===null?null:new Date(t.getTime()+e.window_min*6e4)}function At(e,t){if(e.timing.frequency==="weekly"||e.type==="weekly"){const i=e.weekdays??[];return i.length===0?!1:i.includes(Pn(t))}return!0}function P(e){return Me(e)==="constraint"}function Ee(e){return Me(e)==="preference"}function jt(e){return!P(e)&&!Ee(e)}function ei(e,t){if(P(e))return"silent";if(!At(e,t.today)||!Zn(e.timing,t))return"hidden";const n=e.timing;if(!n.mode)return"due";const i=Qn(n,t);if(n.mode==="relative"&&!i)return"due";if(i&&t.now<i)return"wait";const r=Tt(n,i);return r&&t.now>r?"closed":"due"}function se(e,t){const n=ei(e,t);return!(n==="hidden"||n==="closed"||n==="wait"&&e.timing.window_min!==null)}function at(e){return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`}function ti(e){if(e.window_min===null)return null;if(e.mode==="clock"&&e.clock){const t=Mt("2000-01-01",e.clock);if(!t)return null;const n=Tt(e,t);return n?`${at(t)}–${at(n)}`:null}return`${e.window_min} min`}function ni(e){const t=Ie(e.condition);return t==="body"?"na slaap of energie":t==="energy"?"na energie":t==="sleep"?"na slaap":null}function me(e){const t=e.timing;return Ie(t.condition)?null:t.condition?t.condition:t.mode==="relative"&&t.anchor==="wake"&&t.offset_min!==null?`${t.offset_min} min na opstaan`:t.mode==="relative"&&t.anchor==="meal"&&t.offset_min!==null?t.offset_min===0?"na eten":`${t.offset_min} min na eten`:t.mode==="relative"&&t.anchor==="meal"?"na eten":t.mode==="clock"&&t.clock?t.clock:null}function Me(e){if(e.role)return e.role;const t=It(e.label);return t==="low carb"?"preference":t==="cafeïne 90 min na opstaan"||t==="scherm uit 22:00"?"constraint":null}const Te=["gedrag","regel","medicijn","supplement","sociaal"],Ae={gedrag:"gedrag",regel:"leefregel",medicijn:"medicijn",supplement:"supplement",sociaal:"sociaal"},je={gedrag:"Gedrag",regel:"Regel",medicijn:"Medicijn",supplement:"Supplement",sociaal:"Sociaal"},Be=40,Ne=40;function rt(e){return!!(e&&Te.includes(e))}function ne(e){return e.a!==null&&e.b!==null&&e.milestone!==null}function ii(e,t){return At(e,t)}function ai(e,t){return{...e,tenant_id:e.tenant_id??t,weekdays:e.weekdays??null,times_per_week:e.times_per_week??null,timing:Jn(Un(e.timing),e.label),role:Me(e),template:Le(e),later:!!e.later,removed:!!e.removed}}function Ce(e){return e.type==="medicijn"||e.type==="supplement"}function Bt(e){return e.type==="sociaal"}function Nt(e,t){return F(e,t).filter(n=>jt(n)&&!Ce(n)&&!Bt(n)&&!n.later)}function ri(e,t){return F(e,t).filter(n=>Ee(n)&&!n.later)}function si(e,t){return F(e,t).filter(n=>P(n)&&!n.later)}function Ct(e,t){return F(e,t).filter(n=>Ce(n)&&!n.later)}function Dt(e,t){return F(e,t).filter(n=>Bt(n)&&!n.later)}function oi(e,t){return F(e,t).filter(n=>n.later&&(jt(n)||P(n)))}function F(e,t){return e.filter(n=>!n.removed&&ii(n,t)).sort((n,i)=>n.sort-i.sort)}function U(e){return e.find(ne)}function ye(e){return e.kind==="body_sleep"||e.kind==="body_energy"||e.kind==="body_weight"||e.kind==="body_wake"||e.kind==="body_meal"}function Y(e,t,n){return e.filter(i=>ye(i)?!1:!!(i.item_id===t.id||i.item_id===null&&n&&t.id===n))}function li(e,t){return t?[...e.filter(ye),...Y(e,t,t.id)]:e.filter(ye)}function Ot(e){return e.a===null?null:e.unit==="sec"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} s`:e.unit==="reps"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} reps`:String(e.a)}function E(e){return e.trim().toLowerCase()}function q(e){const t=e.trim().replace(/\s+/g," ").slice(0,Be);return t.length>0?t:null}function De(e){const t=e.trim().replace(/\s+/g," ").slice(0,Ne);if(!t)return re();const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(n){const i=Number(n[1]),r=Number(n[2]);if(i<=23&&r<=59)return{...re(),mode:"clock",clock:`${String(i).padStart(2,"0")}:${n[2]}`,frequency:"daily"}}return{...re(),frequency:"daily",condition:t}}function di(e){return e.reduce((t,n)=>Math.max(t,n.sort),-1)+1}const ci=["Push-ups","Squats","Plank","Dead hang","Gerichte kracht","Koud douchen","Niet snoepen","Low carb","Intermittent fasting","Geen alcohol","Cafeïne 90 min na opstaan","Wandelen na eten","Medicijn ochtend","Vitamine D","Bellen met iemand","Iemand zien","Scherm uit 22:00","Korte rust"];function pe(e){const t=E(e);return ci.some(n=>E(n)===t)}function Oe(e){return pe(e.label)}function R(e){return!Oe(e)}function H(e){return!!e.removed}function ui(e){return e.filter(t=>R(t)&&!H(t)).sort((t,n)=>t.sort-n.sort)}function Kt(e){return e.type==="leefregel"?"regel":e.type==="medicijn"?"medicijn":e.type==="supplement"?"supplement":e.type==="sociaal"?"sociaal":"gedrag"}function Rt(e){return e.timing.mode==="clock"&&e.timing.clock?e.timing.clock:e.timing.condition??""}function fi(e,t){const n=q(t);return n?!e.some(i=>!H(i)&&E(i.label)===E(n)):!1}function mi(e,t,n){const i=q(n);return!i||pe(i)?!1:!e.some(r=>r.id!==t&&!H(r)&&E(r.label)===E(i))}function pi(e,t){const n=q(t);if(n)return e.find(i=>H(i)&&R(i)&&E(i.label)===E(n))}function vi(e){const t=q(e.label);return t?{id:G(),tenant_id:e.tenantId,type:Ae[e.kind],label:t,unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:e.sort,timing:De(e.timing??""),role:"action",template:"user preference",later:!!e.later,removed:!1}:null}function gi(e,t){if(!R(e)||H(e))return null;const n=q(t.label);return!n||pe(n)?null:{...e,type:Ae[t.kind],label:n,timing:De(t.timing??""),template:"user preference"}}function yi(e,t){if(!R(e)||!H(e))return null;const n=q(t.label);return!n||pe(n)?null:{...e,type:Ae[t.kind],label:n,timing:De(t.timing??""),template:"user preference",later:!1,removed:!1}}function bi(e,t){return e.removed?null:{...e,later:!!t}}function ki(e){return H(e)?{item:e,mode:"removed"}:R(e)?{item:{...e,removed:!0},mode:"removed"}:Oe(e)?{item:{...e,later:!0},mode:"parked"}:null}function hi(e){const t=new Set,n=[];for(const i of e){const r=E(i.label);t.has(r)||(t.add(r),n.push(i))}return n}function Ke(e,t,n){const i=hi(e),r=new Set(i.map(s=>E(s.label))),a=t.filter(s=>!r.has(E(s.label))).map(s=>({...s,tenant_id:n}));return[...i,...a]}function zt(e){const t=new Map;for(const n of e)for(const i of n)t.has(i.id)||t.set(i.id,i);return[...t.values()].sort((n,i)=>n.created_at.localeCompare(i.created_at))}function wi(e){return e?!!(e.identity_anti||e.identity_new||e.identity_constraint||e.horizon_1y||e.display_name):!1}function $i(e,t,n,i){if(e.length===0)return null;const r=e.reduce((m,v)=>(v.events?.length??0)>(m.events?.length??0)?v:m),a=e.find(m=>wi(m.profile))?.profile??r.profile,s=Ke([r,...e.filter(m=>m!==r)].flatMap(m=>m.items??[]),t,i),d=new Map(s.map(m=>[E(m.label),m.id])),f=new Map;for(const m of e)for(const v of m.items??[]){const y=d.get(E(v.label));y&&v.id!==y&&f.set(v.id,y)}const g=zt(e.map(m=>m.events??[])).map(m=>{if(!m.item_id)return m;const v=f.get(m.item_id);return v?{...m,item_id:v}:m});return{...r,profile:{...a,id:a.id||n,tenant_id:a.tenant_id||i},items:s,events:g}}const te=3,Re=[{id:"kracht",label:"Kracht"},{id:"eten",label:"Eten & drinken"},{id:"slaap",label:"Slaap"},{id:"stofjes",label:"Stofjes"},{id:"bewegen",label:"Bewegen"}],ze=["18–29","30–39","40–49","50–59","60+"],_i={kracht:["Push-ups","Squats","Plank","Dead hang"],eten:["Niet snoepen","Low carb","Intermittent fasting","Geen alcohol"],slaap:["Koud douchen"],stofjes:["Medicijn ochtend","Vitamine D"],bewegen:["Wandelen na eten"]};function We(e){return P(e)||e.type==="weekly"?!1:e.type==="daily"||e.type==="leefregel"||e.type==="gedrag"||e.type==="sociaal"||Ce(e)}function Wt(e){return e.filter(t=>t.removed?!1:We(t)?!0:P(t)&&t.later).sort((t,n)=>t.sort-n.sort)}function st(e){return Wt(e).filter(t=>t.later)}function xi(e){return Wt(e).filter(t=>!t.later)}function Si(e){return e<=te?null:"Meer dan drie is oké. Parkeren kan."}function Gt(e){return!(e.onboarded!==!1||(e.events??[]).length>0)}function Li(e){return Gt(e)?e.profile.goals?.length?e.profile.age_band?e.theme_step!==!0?"themes":"start":"age":"goals":null}function Ii(e,t){const n=e.filter(We).sort((a,s)=>a.sort-s.sort);if(t.length===0)return n;const i=new Set(t.flatMap(a=>_i[a]??[])),r=n.filter(a=>i.has(a.label));return r.length>0?r:n}function Ei(e,t){const n=new Set(t.slice(0,te));return e.map(i=>We(i)?{...i,later:!n.has(i.id)}:{...i,later:!1})}function Mi(e,t){return e.includes(t)?e.filter(n=>n!==t):[...e,t]}function Ti(e,t){return e.includes(t)?e.filter(n=>n!==t):e.length>=te?e:[...e,t]}function Pt(e){return Re.some(t=>t.id===e)}function qt(e){return ze.includes(e)}const Ht="geen zin",_={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140},Ai="Zet een 1-jaars B.";function T(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function ji(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===Ht).length}function Bi(e,t){const n=T(e,_.identity_new);return!n||ji(t)<2?null:n}function Ni(e,t,n){return n!==Ht?null:Bi(e,t)}function Ci(e){return!!T(e,_.identity_constraint)}function Ge(e,t){return t==null?!1:Ci(e)}function Di(e){const t=T(e,_.identity_constraint);return t?`Check: ${t}.`:null}function Oi(e,t){return t&&!T(e,_.horizon_1y)}function Ki(e,t){return Oi(e,t)?Ai:null}function Vt(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const ot=["Military calisthenics","Kickbox","Spinnen"],Ft=40;function Pe(e){const t=e.trim().replace(/\s+/g," ").slice(0,Ft);return t.length>0?t:null}function O(e){if(!Array.isArray(e))return[];const t=new Set,n=[];for(const i of e){if(typeof i!="string")continue;const r=Pe(i);if(!r)continue;const a=r.toLowerCase();t.has(a)||(t.add(a),n.push(r))}return n}function Ri(e,t){const n=Pe(t);if(!n)return e;const i=n.toLowerCase();return e.some(r=>r.toLowerCase()===i)?e.filter(r=>r.toLowerCase()!==i):[...e,n]}function zi(e,t){const n=Pe(t);if(!n)return e;const i=n.toLowerCase();return e.some(r=>r.toLowerCase()===i)?e:[...e,n]}function Wi(e){const n=O(e).filter(i=>!ot.some(r=>r.toLowerCase()===i.toLowerCase()));return[...ot,...n]}function lt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function Ut(e){const t=new Set(O(e).map(i=>i.toLowerCase()));return`<div class="chips">${Wi(e).map(i=>`<button class="chip pick ${t.has(i.toLowerCase())?"on":""}" data-act="theme-toggle" data-theme="${lt(i)}">${lt(i)}</button>`).join("")}</div>
        <div class="theme-add">
          <input data-id="theme-custom" type="text" maxlength="${Ft}" placeholder="Eigen thema" autocomplete="off" enterkeyhint="done" />
          <button class="btn ghost" data-act="theme-add">Voeg toe</button>
        </div>`}const ee="Ongeldig bestand. Geen Routine-export.";function le(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Gi(e){return e==null||e===fe?!0:_t.includes(String(e))}function Pi(e){return le(e)&&typeof e.id=="string"&&e.id.length>0&&typeof e.label=="string"}function qi(e){return le(e)&&typeof e.id=="string"&&e.id.length>0&&typeof e.date=="string"&&typeof e.kind=="string"}function dt(e){return e.trim().toLowerCase()}function Q(e,t){const n=e?.trim();if(n)return e??n;const i=t?.trim();return i?t??i:null}function Hi(e,t){const n=[],i=new Set;for(const r of[e,t].flatMap(a=>Array.isArray(a)?a:[]))typeof r!="string"||!Pt(r)||i.has(r)||(i.add(r),n.push(r));return n}function Vi(e,t,n){const i=new Map(t.map(a=>[dt(a.label),a.id])),r=new Map;for(const a of n){const s=i.get(dt(a.label));s&&a.id!==s&&r.set(a.id,s)}return e.map(a=>{if(!a.item_id)return a;const s=r.get(a.item_id);return s?{...a,item_id:s}:a})}function Fi(e){let t;try{t=JSON.parse(e)}catch{throw new Error(ee)}if(!le(t)||!Gi(t.key))throw new Error(ee);if(!le(t.profile)||!Array.isArray(t.items)||!Array.isArray(t.events))throw new Error(ee);if(!t.items.every(Pi)||!t.events.every(qi))throw new Error(ee);return{profile:t.profile,items:t.items,events:t.events,onboarded:typeof t.onboarded=="boolean"?t.onboarded:void 0,theme_step:typeof t.theme_step=="boolean"?t.theme_step:void 0}}function Ui(e,t){return{...e,display_name:Q(e.display_name,t.display_name),identity_anti:T(Q(e.identity_anti,t.identity_anti),_.identity_anti),identity_new:T(Q(e.identity_new,t.identity_new),_.identity_new),identity_constraint:T(Q(e.identity_constraint,t.identity_constraint),_.identity_constraint),horizon_1y:T(Q(e.horizon_1y,t.horizon_1y),_.horizon_1y),age_band:e.age_band??(t.age_band&&qt(t.age_band)?t.age_band:null),goals:Hi(e.goals,t.goals),themes:O([...e.themes??[],...t.themes??[]])}}function Yi(e,t){const n=e.profile.tenant_id,i=Ke(e.items,t.items,n),r=Vi(t.events,i,t.items).map(a=>({...a,tenant_id:n,user_id:e.profile.id}));return{...e,profile:Ui(e.profile,t.profile),items:i,events:zt([e.events,r]),onboarded:!!(e.onboarded||t.onboarded),theme_step:!!(e.theme_step||t.theme_step)}}const Ji=2,Zi=6;function J(e,t){return e.created_at.localeCompare(t.created_at)}function Z(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(J).at(-1)}function Yt(e,t){return t.filter(i=>i.kind==="set").sort(J).at(-1)?.value??e}function qe(e,t){return Z(e,t,"body_sleep")?.value??null}function He(e,t){return Z(e,t,"body_energy")?.value??null}const Jt=40,Zt=250,Xi=80;function Qi(e,t){return Z(e,t,"body_weight")?.value??null}function ea(e){return e.filter(t=>t.kind==="body_weight"&&t.value!==null).sort(J).at(-1)?.value??null}function ta(e,t,n){return Math.round(Math.max(Jt,Math.min(Zt,(e??t??Xi)+n))*10)/10}function na(e){const t=e.trim().replace(",",".");if(!t)return null;const n=Number(t);return Number.isFinite(n)?Math.round(Math.max(Jt,Math.min(Zt,n))*10)/10:null}const ve=0,ge=1439,ia=420,aa=780;function Ve(e){return e==null||!Number.isFinite(e)?null:Math.max(ve,Math.min(ge,Math.round(e)))}function Xt(e,t){return Ve(e.filter(n=>n.kind===t&&n.value!==null).sort(J).at(-1)?.value)}function Fe(e,t){return Ve(Z(e,t,"body_wake")?.value)}function ra(e){return Xt(e,"body_wake")}function Ue(e,t){return Ve(Z(e,t,"body_meal")?.value)}function sa(e){return Xt(e,"body_meal")}function Qt(e,t,n,i){return Math.max(ve,Math.min(ge,(e??t??i)+n))}function oa(e,t,n){return Qt(e,t,n,ia)}function la(e,t,n){return Qt(e,t,n,aa)}function en(e){const t=e.trim();if(!t)return null;const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(!n)return null;const i=Number(n[1]),r=Number(n[2]);return i>23||r>59?null:i*60+r}const da=en;function tn(e){const t=Math.max(ve,Math.min(ge,Math.round(e))),n=Math.floor(t/60),i=t%60;return`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}`}const ca=tn;function Ye(e,t){if(t===null)return null;const[n,i,r]=e.split("-").map(Number);if(!n||!i||!r)return null;const a=new Date(n,i-1,r),s=Math.max(ve,Math.min(ge,Math.round(t)));return a.setHours(Math.floor(s/60),s%60,0,0),a}const nn=Ye;function ua(e){return e==="set"||e==="done"||e==="skip"}function an(e,t){return e.date===t&&ua(e.kind)}function Je(e,t){return e.filter(n=>an(n,t)).sort(J).at(-1)}function ie(e,t){return Je(e,t)}function rn(e,t){const n=ie(e,t);return n?.kind==="skip"?n.skip_reason:null}function sn(e,t){return ie(e,t)?.kind==="done"}function on(e,t){return ie(e,t)?.kind==="set"}function ln(e,t){const n=ie(e,t);return n?.kind==="set"||n?.kind==="done"}function fa(e,t){return e!==null&&e<Zi||t!==null&&t<=Ji}function ma(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const i=Math.max(1,Math.ceil(n/2));return Math.min(t,e+i)}function de(e,t,n,i){if(t<i)return"empty";const r=ie(e,t);return r?.kind==="done"||r?.kind==="set"?"done":r?.kind==="skip"?"skip":Z(e,t,"miss")?"miss":t>=n?"empty":"miss"}function pa(e,t,n="1970-01-01"){let i=0,r=t;for(let a=0;a<400;a+=1){const s=de(e,r,t,n);if(s==="done")i+=1;else if(s==="skip"||s==="empty"&&r===t){r=D(r,-1);continue}else break;r=D(r,-1)}return i}function va(e,t,n){const i=xe(t),r=!n||n<i?i:n;let a=0,s=0;for(const d of Se(r,t)){const f=de(e,d,t,n??r);f==="skip"||f==="empty"||(s+=1,f==="done"&&(a+=1))}return{hits:a,eligible:s}}function ga(e,t,n="1970-01-01",i=3){const r=de(e,t,t,n);if(r==="done"||r==="skip")return!1;const a=D(t,-1);if(a<n)return!1;const s=D(t,-i),d=n>s?n:s;return Se(d,a).some(f=>de(e,f,t,n)==="miss")}function ya(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled&&!e.todayLogged?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function ba(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${ct(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${ct(e.milestone)}.`}function ct(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function dn(e,t,n){return t.filter(r=>r.kind==="set"&&r.date<=n).sort(J).at(-1)?.value??e}function ka(e,t,n,i){const r=Yt(e.a,n),a=qe(n,i),s=He(n,i),d=Qi(n,i),f=Fe(n,i),g=Ue(n,i),m=sn(n,i),v=on(n,i),y=ln(n,i),j=rn(n,i),B=fa(a,s),N=r>=t.milestone,c=r>=e.b,k=ga(n,i,t.started_on),S=xe(i),X=dn(e.a,n,D(S,-1)),Nn=ya({current:r,weekStartCurrent:X,gearDown:B,stalled:k,milestoneHit:N,todayLogged:v||m||!!j});return{current:r,sleep:a,energy:s,weight:d,wake:f,meal:g,doneToday:m,plusToday:v,setLoggedToday:y,skipToday:j,gearDown:B,milestoneHit:N,atB:c,trend:Nn,hitrate:va(n,i,t.started_on),streak:pa(n,i,t.started_on),nextAction:ba({milestone:t.milestone,b:e.b,gearDown:B,milestoneHit:N,atB:c,stalled:k,doneToday:m,plusToday:v,skipToday:j}),suggestedMilestone:N&&!c&&!B?ma(t.milestone,e.b):null}}function ha(e,t,n,i){return Y(e,t,n).some(r=>(r.kind==="set"||r.kind==="done"||r.kind==="skip"||r.kind==="miss")&&r.date<i)}function cn(e,t){return e.created_at.localeCompare(t.created_at)}function wa(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(cn).at(-1)}function $a(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip"||n.kind==="miss")).sort(cn).at(-1)}function _a(e,t=[]){const n=K(e);return n.setHours(12,0,0,0),Et({today:e,now:n,wakeAt:Ye(e,Fe(t,e)),mealAt:nn(e,Ue(t,e)),sleepSet:qe(t,e)!==null,energySet:He(t,e)!==null})}function be(e,t,n=[]){const i=_a(t,n);return[...Nt(e,t),...Ct(e,t),...Dt(e,t)].filter(r=>se(r,i))}function ke(e,t,n,i,r){const a=Y(e,t,r),s=$a(a,n);if(s?.kind==="set"||s?.kind==="done")return{item:t,date:n,mark:"hit",reason:null};if(s?.kind==="skip")return{item:t,date:n,mark:"skip",reason:s.skip_reason};const d=s?.kind==="miss"?s:wa(a,n,"miss");return d?{item:t,date:n,mark:"miss",reason:d.skip_reason}:n>=i?{item:t,date:n,mark:"open",reason:null}:{item:t,date:n,mark:"idle",reason:null}}function un(e,t,n,i){const r=D(n,-1);return be(e,r,t).filter(a=>ha(t,a,i,r)).map(a=>{const s=ke(t,a,r,n,i);return s.mark==="hit"||s.mark==="skip"||s.mark==="miss"?s:{...s,mark:"miss",reason:null}}).filter(a=>a.mark==="miss"&&!a.reason)}function xa(e,t,n){return e.some(i=>i.mark==="hit")?"hit":e.some(i=>i.mark==="miss")?"miss":e.some(i=>i.mark==="skip")?"skip":t===n?"open":"idle"}function fn(e,t,n,i){const r=xe(n),a=D(r,6),s=un(e,t,n,i),d=new Set(s.map(c=>`${c.item.id}:${c.date}`)),f=Se(r,a).map(c=>{const k=be(e,c,t).map(S=>{const X=ke(t,S,c,n,i);return d.has(`${S.id}:${c}`)?{...X,mark:"miss",reason:X.reason}:X});return{date:c,label:Gn(c),mark:xa(k,c,n),hits:k.filter(S=>S.mark==="hit").length,misses:k.filter(S=>S.mark==="miss").length,skips:k.filter(S=>S.mark==="skip").length}}),g=f.filter(c=>c.date<n),m=g.reduce((c,k)=>c+k.hits,0),v=g.reduce((c,k)=>c+k.misses,0),y=g.reduce((c,k)=>c+k.skips,0),j=g.flatMap(c=>be(e,c.date,t).map(k=>{const S=ke(t,k,c.date,n,i);return d.has(`${k.id}:${c.date}`)?{...S,mark:"miss",reason:S.reason}:S}).filter(k=>k.mark==="miss")),B=g.filter(c=>c.mark!=="idle").length,N=m>0&&v===0&&B>=2?"Week staat.":null;return{start:r,end:a,range:`${W(r)} – ${W(a)}`,days:f,hits:m,misses:v,skips:y,missRows:j,note:N}}function oe(e){return U(e)?.id}function ut(e,t){return e.created_at.localeCompare(t.created_at)}function Sa(e,t){const n=new Map;for(const i of[...e].sort(ut))i.kind!=="body_weight"||i.value===null||i.date>t||n.set(i.date,i);return[...n.values()].sort((i,r)=>i.date.localeCompare(r.date)||ut(i,r)).map(i=>({date:i.date,kg:i.value}))}function La(e,t,n,i,r){const a=fn(e,t,n,r??oe(e)),s=a.days.map(d=>({date:d.date,label:d.label,current:dn(i,t,d.date<=n?d.date:n),mark:d.mark}));return{week:a,line:s,weight:Sa(t,n),hits:a.hits,skips:a.skips,misses:a.misses}}function mn(e,t,n,i=18,r=16){if(e.length===0)return[];const a=Math.min(...e),d=Math.max(...e)-a,f=t-i*2,g=n-r*2;return e.map((m,v)=>{const y=e.length===1?t/2:i+v/(e.length-1)*f,j=d===0?n/2:r+(1-(m-a)/d)*g;return{x:y,y:j}})}function pn(e){return e.map(t=>`${t.x.toFixed(1)},${t.y.toFixed(1)}`).join(" ")}const vn=1080;function Ia(e){return e.skip?null:e.plus?{text:"Set gedaan.",tone:"fog",beat:"fade"}:e.done?e.type==="medicijn"?{text:"Genomen.",tone:"sage",beat:"check"}:e.track?{text:"Set staat.",tone:"sage",beat:"check"}:{text:"Staat.",tone:"sage",beat:"check"}:null}function gn(e,t){return{id:e,tenant_id:t,display_name:null,...Vt(),age_band:null,goals:[],themes:[]}}function yn(e,t,n=b()){return{id:G(),tenant_id:t,vector_id:e,milestone:$.milestone,started_on:n,deadline:D(n,$.windowDays),status:"active",stage_type:$.stageType}}function Ze(e){const t=n=>({id:G(),tenant_id:e,timing:re(),role:null,template:null,later:!1,...n});return[t({type:"daily",label:"Push-ups",unit:"reps",a:$.a,b:$.b,milestone:$.milestone,weekdays:null,times_per_week:null,sort:0}),t({type:"daily",label:"Squats",unit:"reps",a:30,b:null,milestone:null,weekdays:null,times_per_week:null,sort:1}),t({type:"daily",label:"Plank",unit:"sec",a:60,b:null,milestone:null,weekdays:null,times_per_week:null,sort:2}),t({type:"daily",label:"Dead hang",unit:"sec",a:45,b:null,milestone:null,weekdays:null,times_per_week:null,sort:3}),t({type:"weekly",label:"Gerichte kracht",unit:null,a:null,b:null,milestone:null,weekdays:[],times_per_week:2,sort:4}),t({type:"leefregel",label:"Koud douchen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:5,template:"hypothesis"}),t({type:"leefregel",label:"Niet snoepen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:6}),t({type:"leefregel",label:"Low carb",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:7,role:"preference",template:"user preference"}),t({type:"leefregel",label:"Intermittent fasting",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:8}),t({type:"leefregel",label:"Geen alcohol",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:9}),t({type:"gedrag",label:"Cafeïne 90 min na opstaan",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:10,role:"constraint",template:"public-framework",timing:{mode:"relative",clock:null,anchor:"wake",offset_min:90,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Wandelen na eten",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:11,role:"action",template:"evidence-informed",timing:{mode:"relative",clock:null,anchor:"meal",offset_min:0,window_min:null,frequency:"daily",condition:"na eten"}}),t({type:"medicijn",label:"Medicijn ochtend",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:12,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"ochtend"}}),t({type:"supplement",label:"Vitamine D",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:13,role:"action",template:"guideline",timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Bellen met iemand",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:14,role:"action",template:null,timing:{mode:"clock",clock:"18:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Iemand zien",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:1,sort:15,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"deze week"}}),t({type:"gedrag",label:"Scherm uit 22:00",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:16,role:"constraint",template:"user preference",timing:{mode:"clock",clock:"22:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Korte rust",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:17,role:"action",template:"user preference",timing:{mode:"clock",clock:"08:00",anchor:null,offset_min:null,window_min:840,frequency:"daily",condition:"body"}})]}function Ea(e,t){return{id:e.id,tenant_id:e.tenant_id,user_id:t,domain:$.domain,a:e.a??$.a,b:e.b??$.b,unit:e.unit==="sec"?"sec":"reps",pace_constraint:null}}function Ma(e,t=b(),n=G()){const i=gn(e,n),r=Ze(n),a=U(r)??r[0],s=Ea(a,e),d=yn(s.id,n,t);return a.milestone!==null&&(d.milestone=a.milestone),{profile:i,items:r,vector:s,stage:d,events:[],rotated:!1,onboarded:!1,theme_step:!1}}function bn(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,items:e.items.map(n=>ne(n)?{...n,a:$.a,b:$.b,milestone:$.milestone,unit:$.unit}:n),vector:{...e.vector,a:$.a,b:$.b,unit:$.unit},stage:{...e.stage,milestone:$.milestone},events:e.events}:e}function Ta(){const e=localStorage.getItem(nt);if(e)return e;const t=G();return localStorage.setItem(nt,t),t}function Aa(){const e=localStorage.getItem(it);if(e)return e;const t=G();return localStorage.setItem(it,t),t}function x(e){localStorage.setItem(fe,JSON.stringify(e))}function ja(e){if(!e)return null;try{const t=JSON.parse(e);return!t||typeof t!="object"?null:t}catch{return null}}function Ba(){return[fe,..._t].map(e=>ja(localStorage.getItem(e))).filter(e=>e!==null)}function kn(e,t,n){const i=Ke(e.items??[],Ze(n),n).map(r=>ai(r,n));return{...e,profile:{...gn(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...Vt(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null,age_band:e.profile?.age_band??null,goals:Array.isArray(e.profile?.goals)?e.profile.goals:[],themes:O(e.profile?.themes)},items:i,vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(r=>({...r,tenant_id:r.tenant_id??n,item_id:r.item_id??null})),rotated:!!e.rotated,onboarded:e.onboarded??!0,theme_step:e.theme_step??!1}}function L(e,t){const n=Ba();if(n.length===0){const a=Ma(e,b(),t);return x(a),a}const i=$i(n,Ze(t),e,t)??n[0],r=bn(kn(i,e,t));return x(r),r}function Na(){localStorage.setItem(Kn,"1");const e=Ta(),t=Aa();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return L(e,t)},async addEvent(n){const i=L(e,t),r={id:n.id??G(),tenant_id:t,user_id:e,item_id:n.item_id??null,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:qn()};return i.events.push(r),x(i),r},async removeEvent(n){const i=L(e,t),r=i.events.find(a=>a.id===n);if(r){if(!an(r,b()))throw new Error("alleen vandaag");i.events=i.events.filter(a=>a.id!==n),x(i)}},async saveProfile(n){const i=L(e,t);i.profile=n,x(i)},async saveOnboarding(n){const i=L(e,t);i.profile={...i.profile,goals:n.goals,age_band:n.age_band,themes:O(i.profile.themes)},i.items=Ei(i.items,n.startIds),i.onboarded=!0,i.theme_step=!0,x(i)},async saveThemes(n){const i=L(e,t);i.profile={...i.profile,themes:O(n)},i.theme_step=!0,x(i)},async setItemLater(n,i){const r=L(e,t);r.items=r.items.map(a=>a.id!==n?a:bi(a,i)??a),x(r)},async addItem(n){const i=L(e,t),r=pi(i.items,n.label);if(r){const s=yi(r,{label:n.label,kind:n.kind,timing:n.timing});if(!s)throw new Error("naam ontbreekt");return i.items=i.items.map(d=>d.id===s.id?s:d),x(i),s}const a=vi({tenantId:t,label:n.label,kind:n.kind,timing:n.timing,sort:di(i.items)});if(!a)throw new Error("naam ontbreekt");if(!fi(i.items,a.label))throw new Error("item bestaat al");return i.items=[...i.items,a],x(i),a},async updateItem(n){const i=L(e,t),r=i.items.find(s=>s.id===n.id);if(!r)throw new Error("item ontbreekt");if(!q(n.label))throw new Error("naam ontbreekt");if(!mi(i.items,r.id,n.label))throw new Error("item bestaat al");const a=gi(r,n);if(!a)throw new Error("alleen eigen item");return i.items=i.items.map(s=>s.id===a.id?a:s),x(i),a},async removeItem(n){const i=L(e,t),r=i.items.find(s=>s.id===n);if(!r)throw new Error("item ontbreekt");const a=ki(r);if(!a)throw new Error("item blijft");return i.items=i.items.map(s=>s.id===a.item.id?a.item:s),x(i),a.item},async saveVectorConstraint(n,i){const r=L(e,t);r.vector.id===n&&(r.vector.pace_constraint=i,x(r))},async advanceStage(n,i){const r=L(e,t),a=yn(n.vector_id,t);return a.milestone=i,r.stage=a,r.items=r.items.map(s=>s.id===n.vector_id?{...s,milestone:i}:s),r.rotated=!0,x(r),a},async importJson(n){const i=Fi(n),r=L(e,t),a=bn(kn(Yi(r,i),e,t));return x(a),a},async signOut(){}}}const ft="#F0ECE4",Ca="#3D6B5A";function hn(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${ft}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${ft}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${Ca}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function h(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function Da(e){return e==="stokt"||e==="herstel"?"ember":e==="stijgt"?"sage":"fog"}function mt(e){const t=Da(e);return e==="stokt"||e==="herstel"||e==="zakt"?h("status-kink",`ico-${t}`):e==="stijgt"?h("status-up",`ico-${t}`):h("status-flat",`ico-${t}`)}function Oa(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${h(n?"dot-now":"dot")}</button>`}).join("")}const Ka=`
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
</svg>`;function Ra(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",Ka)}const V=()=>document.querySelector("#app"),l={screen:"vandaag",skipItemId:null,missKey:null,detailItemId:null,advanceWarn:!1,busy:!1,error:null,startIds:[],addKind:"gedrag",addLabel:"",addTiming:"",editKind:"gedrag",editLabel:"",editTiming:"",removeAsk:!1,importPaste:"",confirmBeats:{}},ce=new Map;let p=null,o=null;function ae(){if(!o)throw new Error("geen snapshot");const e=U(o.items);return ka(o.vector,o.stage,li(o.events,e),b())}function z(e,t=b()){if(!o)throw new Error("geen snapshot");const n=U(o.items),i=Y(o.events,e,n?.id),r=e.a===null?null:Yt(e.a,i);return{done:sn(i,t),plus:on(i,t),skip:rn(i,t),logged:ln(i,t),current:r}}function wn(e,t){return`${e}:${t}`}function za(e=b()){const t=o?.events??[];return Et({today:e,now:new Date,wakeAt:Ye(e,Fe(t,e)),mealAt:nn(e,Ue(t,e)),sleepSet:qe(t,e)!==null,energySet:He(t,e)!==null})}function u(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function w(){if(!o||!p)return;const e=Li(o);if(e){V().innerHTML=ar(e);return}const t=ae(),{vector:n,stage:i}=o,r=p.mode==="local"?"Lokaal":"Supabase",a=`
    <div class="hdr">
      <div>
        ${hn()}
        <div class="date-s">${Wn(b())}</div>
      </div>
      <div class="mode-pill">${r}</div>
    </div>`,s=`
    <nav class="nav nav-4">
      <button data-nav="vandaag" class="${l.screen==="vandaag"?"active":""}">${h("day")}Vandaag</button>
      <button data-nav="koers" class="${l.screen==="koers"?"active":""}">${h("mark")}Koers</button>
      <button data-nav="voortgang" class="${l.screen==="voortgang"?"active":""}">${h("line")}Voortgang</button>
      <button data-nav="profiel" class="${l.screen==="profiel"?"active":""}">${h("me")}Profiel</button>
    </nav>`;if(l.detailItemId){const d=o.items.find(f=>f.id===l.detailItemId);if(d){V().innerHTML=`
      ${a}
      ${sr(d)}
      ${l.error?`<p class="error" style="padding:0 18px">${u(l.error)}</p>`:""}
      ${s}`;return}l.detailItemId=null}if(l.screen==="vandaag"){const d=b(),f=za(d),g=Nt(o.items,d).filter(c=>se(c,f)),m=si(o.items,d),v=Ct(o.items,d).filter(c=>se(c,f)),y=Dt(o.items,d).filter(c=>se(c,f)),j=oi(o.items,d),B=ri(o.items,d),N=un(o.items,o.events,d,oe(o.items));V().innerHTML=`
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
                value="${t.wake===null?"":tn(t.wake)}"
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
                value="${t.meal===null?"":ca(t.meal)}"
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
          <div class="dots">${Oa(t.energy)}</div>
        </div>
      </div>
      ${B.length?`<div class="sec-hd">Dag</div>
      <div class="card quiet">
        <div class="day-tags">${B.map(c=>rr(c)).join("")}</div>
      </div>`:""}
      ${m.length?`<div class="sec-hd">Regel</div>${m.map(c=>cr(c)).join("")}`:""}
      ${v.length?`<div class="sec-hd">Stofjes</div>${v.map(c=>pt(c)).join("")}`:""}
      ${y.length?`<div class="sec-hd">Sociaal</div>${y.map(c=>pt(c)).join("")}`:""}
      ${N.length?`<div class="sec-hd">Niet gedaan</div>
      <div class="card">
        <div class="note" style="margin-top:0">Geen +1, Done of Skip. Korte reden.</div>
        ${N.map(c=>_n(c)).join("")}
      </div>`:""}
      <div class="sec-hd">Vandaag</div>
      ${g.map(c=>ur(c,t)).join("")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Niet in Vandaag. Terughalen laat het log staan.</div>
        ${j.map(c=>Sn(c)).join("")}
        <button class="btn ghost later-add" data-nav="profiel">Eigen item</button>
      </div>
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${mt(t.trend.word)}
          <div class="word">${t.trend.word}</div>
        </div>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${u(l.error)}</p>`:""}
      ${s}`;return}if(l.screen==="koers"){V().innerHTML=`
      ${a}
      ${t.gearDown?'<div class="banner hot">Lijf vraagt tempo omlaag. Etappe gaat niet omhoog.</div>':""}
      ${bt(o.profile.themes,"Tik een suggestie of typ zelf. Geen vaste lijst. Later aan te passen.")}
      ${vt(fn(o.items,o.events,b(),oe(o.items)))}
      ${gt(st(o.items),"Niet in Vandaag. Terughalen laat het log staan.")}
      <div class="sec-hd">Strength · push-ups</div>
      <div class="card">
        <div class="kv">
          <div><div class="lbl">A</div><div class="val">${C(n.a)}</div></div>
          <div><div class="lbl">B</div><div class="val">${C(n.b)}</div></div>
          <div><div class="lbl">Nu</div><div class="val">${C(t.current)}</div></div>
          <div><div class="lbl">Etappe</div><div class="val">${C(i.milestone)}</div></div>
        </div>
      </div>
      <div class="card">
        <div class="kv">
          <div>
            <div class="lbl">Venster</div>
            <div class="val" style="font-size:1.15rem">${W(i.started_on)} → ${i.deadline?W(i.deadline):"—"}</div>
          </div>
          <div>
            <div class="lbl">Trend</div>
            <div class="val status">${mt(t.trend.word)} ${t.trend.word}</div>
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
      ${Xa(t)}
      ${Ja(o)}
      <div class="sec-hd">${h("ik")} Ik</div>
      <div class="card">
        <div class="field">
          <div class="lbl">Leven dat ik weiger</div>
          <textarea data-id="identity_anti" maxlength="${_.identity_anti}">${u(o.profile.identity_anti??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wie ik word</div>
          <textarea data-id="identity_new" maxlength="${_.identity_new}">${u(o.profile.identity_new??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wat B niet mag schenden</div>
          <textarea data-id="identity_constraint" maxlength="${_.identity_constraint}">${u(o.profile.identity_constraint??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">1-jaars B</div>
          <textarea data-id="horizon_1y" maxlength="${_.horizon_1y}">${u(o.profile.horizon_1y??"")}</textarea>
        </div>
        <button class="btn primary" data-act="save-ik">Bewaar</button>
      </div>
      ${yt()}
      ${l.error?`<p class="error" style="padding:0 18px">${u(l.error)}</p>`:""}
      ${s}`;return}if(l.screen==="voortgang"){const d=La(o.items,o.events,b(),o.vector.a,oe(o.items));V().innerHTML=`
      ${a}
      ${vt(d.week)}
      <div class="sec-hd">Lijn</div>
      <div class="card">
        <div class="note" style="margin-top:0">Huidige deze week. Geen score.</div>
        ${ir(d.line.map(f=>f.current),b(),d.line)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Nu</div><div class="val">${C(t.current)}</div></div>
          <div><div class="lbl">Gedaan</div><div class="val">${d.hits}</div></div>
        </div>
      </div>
      ${nr(d.weight)}
      ${l.error?`<p class="error" style="padding:0 18px">${u(l.error)}</p>`:""}
      ${s}`;return}if(l.screen==="profiel"){const d=o.profile.goals??[],f=o.profile.age_band,g=xi(o.items),m=st(o.items),v=Si(g.length);V().innerHTML=`
      ${a}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="note" style="margin-top:0">Later aan te passen. Geen wipe.</div>
        <div class="chips">${Re.map(y=>`<button class="chip pick ${d.includes(y.id)?"on":""}" data-act="onboard-goal" data-goal="${y.id}">${y.label}</button>`).join("")}</div>
      </div>
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="note" style="margin-top:0">Alleen een band. Geen geboortedatum.</div>
        <div class="chips">${ze.map(y=>`<button class="chip pick ${f===y?"on":""}" data-act="onboard-age" data-age="${y}">${y}</button>`).join("")}</div>
      </div>
      ${bt(o.profile.themes,"Tik een suggestie of typ zelf. Later aan te passen.")}
      <div class="sec-hd">Nu</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">${v??"In Vandaag. Parkeren laat het log staan."}</div>
        ${g.length?g.map(y=>Fa(y)).join(""):'<div class="note">Niets in Nu.</div>'}
      </div>
      ${gt(m,"Niet in Vandaag. Terughalen laat het log staan.")}
      ${Ya(o.items)}
      ${Qa()}
      ${yt()}
      ${l.error?`<p class="error" style="padding:0 18px">${u(l.error)}</p>`:""}
      ${s}`;return}}function $n(e){const t=ce.get(e);if(t&&window.clearTimeout(t),ce.delete(e),!(e in l.confirmBeats))return;const n={...l.confirmBeats};delete n[e],l.confirmBeats=n}function Wa(e){$n(e),l.confirmBeats={...l.confirmBeats,[e]:Date.now()},ce.set(e,window.setTimeout(()=>{if(ce.delete(e),!(e in l.confirmBeats))return;const t={...l.confirmBeats};delete t[e],l.confirmBeats=t,w()},vn))}function Xe(e){const t=l.confirmBeats[e.id];if(!t)return null;const n=Date.now()-t;if(n>=vn)return null;const i=z(e),r=Ia({plus:i.plus,done:i.done,skip:i.skip,type:e.type,track:ne(e)});return r?{confirm:r,elapsed:n}:null}function he(e,t){const n=Xe(e);return!n||n.confirm.beat!==t?"":` beat-${t}`}function we(e,t){const n=Xe(e);return!n||n.confirm.beat!==t?"":` data-confirm="${t}" style="animation-delay:-${n.elapsed}ms"`}function Ga(e){const t=Xe(e);return t?`<span class="sr-only" role="status" data-confirm="${t.confirm.beat}">${u(t.confirm.text)}</span>`:""}function Pa(e){if(!o)return"";const t=U(o.items);return Je(Y(o.events,e,t?.id),b())?`<button class="undo" type="button" data-act="undo" data-item="${e.id}">Ongedaan</button>`:""}function Qe(e){return`${Ga(e)}${Pa(e)}`}function pt(e){const t=z(e),n=t.logged||!!t.skip,i=e.type==="medicijn"?"Genomen":"Done",r=me(e);return`
      <div class="card stof">
        ${et(e)}
        ${r?`<div class="note">${u(r)}</div>`:""}
        <div class="actions actions-two">
          <button class="btn ico-btn ${t.done?"track":""}${he(e,"check")}" data-act="done" data-item="${e.id}" ${n?"disabled":""}${we(e,"check")}>${h("done")}<span>${i}</span></button>
          <button class="btn ico-btn skip ${t.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${t.logged?"disabled":""}>${h("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||t.skip?`<div class="chips">${ue.map(a=>`<button class="chip ${t.skip===a?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${a}">${a}</button>`).join("")}</div>`:""}
        ${Ln(t.skip)}
        ${Qe(e)}
      </div>`}function qa(e,t,n,i){return`<div class="chips">${ue.map(r=>`<button class="chip ${n===r?"on":""}" data-act="${i}" data-item="${e}" data-date="${t}" data-reason="${r}">${r}</button>`).join("")}</div>`}function _n(e){const t=l.missKey===wn(e.item.id,e.date)||!!e.reason;return`
      <div class="miss-row">
        <button class="miss-item" data-act="miss-open" data-item="${e.item.id}" data-date="${e.date}">
          <span class="ex-nm">${u(e.item.label)}</span>
          <span class="note">${e.reason?u(e.reason):W(e.date)}</span>
        </button>
        ${t?qa(e.item.id,e.date,e.reason,"miss"):""}
      </div>`}function Ha(e){const t=[];return e.hits&&t.push(`${e.hits} gedaan`),e.skips&&t.push(`${e.skips} overgeslagen`),e.misses&&t.push(`${e.misses} niet gedaan`),t.length===0?"Nog geen dagen deze week.":t.join(" · ")}function Va(e){return e==="skip"?"–":e==="miss"?"×":"·"}function vt(e){return`
      <div class="sec-hd">Week</div>
      <div class="card">
        <div class="note" style="margin-top:0">${u(e.range)}</div>
        <div class="week-strip" aria-label="Weekoverzicht">
          ${e.days.map(t=>`<div class="week-day ${t.mark}${t.date===b()?" today":""}">
            <span class="week-lbl">${t.label}</span>
            <span class="week-mark">${Va(t.mark)}</span>
          </div>`).join("")}
        </div>
        <div class="note">${u(Ha(e))}</div>
        ${e.note?`<div class="week-note">${u(e.note)}</div>`:""}
        ${e.missRows.length?e.missRows.map(t=>_n(t)).join(""):""}
      </div>`}function xn(e){return Lt(e)||R(e)?`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>`:`<div class="ex-nm">${u(e.label)}</div>`}function Sn(e){return`
      <div class="later-row">
        ${xn(e)}
        <button class="btn ghost later-now" data-act="later-now" data-item="${e.id}">Nu</button>
      </div>`}function gt(e,t){return`
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">${u(t)}</div>
        ${e.length?e.map(n=>Sn(n)).join(""):'<div class="note">Niets in Later.</div>'}
      </div>`}function Fa(e){const t=e.later;return`
      <div class="later-row">
        <div>
          ${xn(e)}
          <div class="note" style="margin-top:4px">${t?"Later":"Nu"}</div>
        </div>
        <button class="btn ghost later-now" data-act="${t?"later-now":"later-park"}" data-item="${e.id}">${t?"Nu":"Later"}</button>
      </div>`}function Ua(e){const t=je[Kt(e)],n=Rt(e);return`
      <div class="later-row">
        <div>
          <button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>
          <div class="note" style="margin-top:4px">${u(t)}${n?` · ${u(n)}`:""}</div>
        </div>
        <button class="btn ghost later-now" data-act="detail-open" data-item="${e.id}">Wijzig</button>
      </div>`}function Ya(e){const t=ui(e);return t.length===0?"":`
      <div class="sec-hd">Eigen items</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Label, type of tijd. Weg haalt het uit Vandaag. Log blijft.</div>
        ${t.map(n=>Ua(n)).join("")}
      </div>`}function Ln(e){if(!o)return"";const t=Ni(o.profile.identity_new,o.events,e);return t?`<div class="nudge">${u(t)}</div>`:""}function Ja(e){const t=Ki(e.profile.horizon_1y,e.rotated);return t?`<div class="nudge-line">${u(t)}</div>`:""}function Za(e){if(!o||!Ge(o.profile.identity_constraint,e))return"";const t=Di(o.profile.identity_constraint);return t?`<div class="check">${u(t)}</div>`:""}function In(e){if(!e.suggestedMilestone)return"";const t=C(e.suggestedMilestone),n=l.advanceWarn&&Ge(o.profile.identity_constraint,e.suggestedMilestone);return`
        <div class="note" style="margin-top:0">Etappe gehaald. Niet automatisch verder. Voorstel: ${t}.</div>
        ${n?Za(e.suggestedMilestone):""}
        ${n?`<div class="stack" style="margin-top:10px">
                 <button class="btn primary" data-act="advance-go">Volgende etappe ${t}</button>
                 <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
               </div>`:`<div class="stack" style="margin-top:10px">
                 <button class="btn primary" data-act="advance" data-n="${e.suggestedMilestone}">Volgende etappe ${t}</button>
               </div>`}`}function Xa(e){return e.suggestedMilestone?`
      <div class="card">
        ${In(e)}
      </div>`:""}function yt(){return`
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
      </div>`}function Qa(){return`
      <div class="sec-hd">Eigen item</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Label, type, optioneel tijdstip. Geen dosis. Bestaande items blijven.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="item-label" type="text" maxlength="${Be}" placeholder="Bijv. Avondwandeling" autocomplete="off" enterkeyhint="done" value="${u(l.addLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${Te.map(e=>`<button class="chip pick ${l.addKind===e?"on":""}" data-act="item-kind" data-kind="${e}">${je[e]}</button>`).join("")}</div>
        <div class="field" style="margin-top:12px">
          <div class="lbl">Tijd</div>
          <input data-id="item-timing" type="text" maxlength="${Ne}" placeholder="22:00 of ochtend" autocomplete="off" enterkeyhint="done" value="${u(l.addTiming)}" />
        </div>
        <div class="stack">
          <button class="btn primary" data-act="item-add">Voeg toe</button>
        </div>
      </div>`}function er(e){if(e.length===0)return"";const t=W(e[0].date),n=W(e[e.length-1].date);return t===n?t:`${t} – ${n}`}function tr(e){const i=mn(e.map(s=>s.kg),294,72);if(i.length===0)return"";const r=i.length-1,a=i.map((s,d)=>{const f=d===r;return`<circle class="${f?"prog-dot now":"prog-dot"}" cx="${s.x.toFixed(1)}" cy="${s.y.toFixed(1)}" r="${f?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${pn(i)}" />
          ${a}
        </svg>`}function nr(e){if(e.length===0)return"";const t=e[e.length-1];return`
      <div class="sec-hd">Gewicht</div>
      <div class="card">
        <div class="note" style="margin-top:0">${u(er(e))}</div>
        ${tr(e)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Laatst</div><div class="val">${t.kg.toFixed(1)} kg</div></div>
        </div>
      </div>`}function ir(e,t,n){const a=mn(e,294,72);if(a.length===0)return'<div class="note">Nog geen lijn.</div>';const s=a.map((d,f)=>{const g=n[f]?.date===t;return`<circle class="${n[f]?.mark==="miss"?"prog-dot miss":g?"prog-dot now":"prog-dot"}" cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${g?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${pn(a)}" />
          ${s}
        </svg>`}function bt(e,t){return`
      <section class="theme-sec" data-sec="themes">
        <div class="sec-hd">Thema's</div>
        <div class="card">
          <div class="ex-nm">Trainingsrichting</div>
          <div class="note">${u(t)}</div>
          ${Ut(e)}
        </div>
      </section>`}function ar(e){if(!o)return"";const t=o.profile.goals??[],n=o.profile.age_band,i=Ii(o.items,t),r=l.startIds,a=`
    <div class="hdr">
      <div>
        ${hn()}
        <div class="date-s">Start</div>
      </div>
    </div>`;if(e==="goals")return`
      ${a}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="ex-nm">Wat is je richting?</div>
        <div class="note">Eerst doelen. Types (gedrag, regel, medicijn, supplement, sociaal) komen daarna.</div>
        <div class="chips">${Re.map(s=>`<button class="chip pick ${t.includes(s.id)?"on":""}" data-act="onboard-goal" data-goal="${s.id}">${s.label}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${t.length===0?"disabled":""}>Verder</button>
        </div>
      </div>`;if(e==="age")return`
      ${a}
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="ex-nm">Kies een band</div>
        <div class="note">Geen geboortedatum. Alleen een band.</div>
        <div class="chips">${ze.map(s=>`<button class="chip pick ${n===s?"on":""}" data-act="onboard-age" data-age="${s}">${s}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${n?"":"disabled"}>Verder</button>
        </div>
      </div>`;if(e==="themes"){const s=o.profile.themes??[];return`
      ${a}
      <div class="sec-hd">Thema's</div>
      <div class="card">
        <div class="ex-nm">Trainingsrichting</div>
        <div class="note">Tik een suggestie of typ zelf. Mag leeg. Later aan te passen.</div>
        ${Ut(s)}
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-themes-done">Verder</button>
        </div>
      </div>`}return`
    ${a}
    <div class="sec-hd">Start</div>
    <div class="card">
      <div class="ex-nm">Max ${te} nu</div>
      <div class="note">De rest gaat naar Later. Later blijft zichtbaar.</div>
      <div class="chips">${i.map(s=>`<button class="chip pick ${r.includes(s.id)?"on":""}" data-act="onboard-start" data-item="${s.id}">${u(s.label)}</button>`).join("")}</div>
      <div class="note">${r.length} / ${te} gekozen</div>
      <div class="stack" style="margin-top:16px">
        <button class="btn primary" data-act="onboard-done" ${r.length===0?"disabled":""}>Naar Vandaag</button>
      </div>
    </div>`}function et(e){return!Lt(e)&&!R(e)?`<div class="ex-nm">${u(e.label)}</div>`:`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>`}function rr(e){return`<button class="chip pick" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>`}function sr(e){const t=Le(e),n=me(e),i=ti(e.timing),r=ni(e.timing),a=Ot(e),s=Ee(e),d=P(e),f=R(e);return`
      <button class="btn ghost detail-back" data-act="detail-close">Terug</button>
      <div class="sec-hd">Detail</div>
      <div class="card">
        <div class="ex-nm">${u(e.label)}</div>
        ${i?`<div class="note">${u(i)}</div>`:""}
        ${r?`<div class="note">${u(r)}</div>`:""}
        ${n&&!r?`<div class="note">${u(n)}</div>`:""}
        ${a?`<div class="work">${u(a)}</div>`:""}
        ${s?'<div class="note">Voorkeur. Geen regel.</div>':""}
        ${d&&!n&&!i&&!r?'<div class="note">Regel. Geen afvinken.</div>':""}
        ${Qe(e)}
      </div>
      ${t?`<div class="sec-hd">Bron</div>
      <div class="card quiet">
        <div class="src-tag">${u(t)}</div>
      </div>`:""}
      ${f?lr(e):dr(e)}
      ${f?or():""}`}function or(){return`
      <div class="sec-hd">Wijzig</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Zelfde item. Geen dosis. Log blijft.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="edit-label" type="text" maxlength="${Be}" placeholder="Naam" autocomplete="off" enterkeyhint="done" value="${u(l.editLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${Te.map(e=>`<button class="chip pick ${l.editKind===e?"on":""}" data-act="edit-kind" data-kind="${e}">${je[e]}</button>`).join("")}</div>
        <div class="field" style="margin-top:12px">
          <div class="lbl">Tijd</div>
          <input data-id="edit-timing" type="text" maxlength="${Ne}" placeholder="22:00 of ochtend" autocomplete="off" enterkeyhint="done" value="${u(l.editTiming)}" />
        </div>
        <div class="stack">
          <button class="btn primary" data-act="item-save">Bewaar</button>
          ${l.removeAsk?`<div class="note">Weg uit Vandaag. Log blijft.</div>
          <button class="btn primary" data-act="item-remove">Bevestig</button>
          <button class="btn ghost" data-act="item-remove-cancel">Niet nu</button>`:'<button class="btn ghost" data-act="item-remove-ask">Weg</button>'}
        </div>
      </div>`}function lr(e){return e.later?`
      <div class="card quiet">
        <div class="note" style="margin-top:0">In Later. Weg is apart. Log blijft.</div>
        <div class="stack">
          <button class="btn ghost" data-act="later-now" data-item="${e.id}">Nu</button>
        </div>
      </div>`:`
      <div class="card quiet">
        <div class="note" style="margin-top:0">Parkeren haalt het uit Vandaag. Weg is apart. Log blijft.</div>
        <div class="stack">
          <button class="btn ghost" data-act="later-park" data-item="${e.id}">Naar Later</button>
        </div>
      </div>`}function dr(e){return Oe(e)?e.later?`
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
      </div>`:""}function cr(e){const t=me(e);return`
      <div class="card quiet">
        ${et(e)}
        ${t?`<div class="note">${u(t)}</div>`:'<div class="note">Regel. Geen afvinken.</div>'}
      </div>`}function ur(e,t){const n=z(e),i=ne(e),r=n.logged||!!n.skip,a=i&&n.current!==null&&e.b!==null&&n.current>=e.b,s=r||a,d=i,f=Ot(e),g=me(e),m=d&&t.suggestedMilestone&&e.id===o.vector.id;return`
      <div class="card">
        ${et(e)}
        ${g&&!f&&!i?`<div class="note">${u(g)}</div>`:""}
        ${i?`<div class="track">
          <span class="now">${C(n.current??e.a??0)}</span>
          <span>→</span>
          <span class="mid">${C(e.milestone??0)}</span>
          <span>→</span>
          <span class="end">${C(e.b??0)}</span>
        </div>`:f?`<div class="work">${u(f)}</div>`:""}
        <div class="actions ${i?"":"actions-two"}">
          ${i?`<button class="btn ico-btn ${n.plus?"on":""}${he(e,"fade")}" data-act="plus" data-item="${e.id}" ${s?"disabled":""}${we(e,"fade")}>${h("plus")}<span>+1</span></button>`:""}
          <button class="btn ico-btn ${n.done?"track":""}${he(e,"check")}" data-act="done" data-item="${e.id}" ${r?"disabled":""}${we(e,"check")}>${h("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${n.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${n.logged?"disabled":""}>${h("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||n.skip?`<div class="chips">${ue.map(v=>`<button class="chip ${n.skip===v?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${v}">${v}</button>`).join("")}</div>`:""}
        ${Qe(e)}
        ${m?In(t):""}
        ${Ln(n.skip)}
      </div>`}function C(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function I(e){if(!l.busy){l.busy=!0,l.error=null;try{await e()}catch(t){l.error=t instanceof Error?t.message:"Er ging iets mis"}finally{l.busy=!1,w()}}}async function fr(e){p=e,o=await p.load(),l.screen="vandaag",w()}async function mr(){Ra(),pr(),await fr(Na())}function pr(){document.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const t=e.target;if(t instanceof HTMLInputElement){if(t.dataset.id==="theme-custom"){e.preventDefault(),Bn();return}if(t.dataset.id==="item-label"||t.dataset.id==="item-timing"){e.preventDefault(),jn();return}if(t.dataset.id==="edit-label"||t.dataset.id==="edit-timing"){e.preventDefault(),An();return}if(t.dataset.id==="weight"){e.preventDefault(),ht(t.value);return}if(t.dataset.id==="wake"){e.preventDefault(),wt(t.value);return}t.dataset.id==="meal"&&(e.preventDefault(),$t(t.value))}}),document.addEventListener("change",e=>{const t=e.target;if(t instanceof HTMLInputElement&&(t.dataset.id==="weight"&&ht(t.value),t.dataset.id==="wake"&&wt(t.value),t.dataset.id==="meal"&&$t(t.value),t.dataset.id==="import-file"&&t.files?.[0])){const n=t.files[0];t.value="",n.text().then(i=>En(i))}}),document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(On(n)){l.screen=n,l.skipItemId=null,l.missKey=null,l.detailItemId=null,l.advanceWarn=!1,l.error=null,w();return}vr(t)})}async function vr(e){const t=e.dataset.act;if(!t)return;const n=A("import-paste");if(n!==null&&(l.importPaste=n),!p||!o)return;const i=ae(),r=b();if(t==="sleep-inc"||t==="sleep-dec"){const a=i.sleep??7,s=Math.max(0,Math.min(14,a+(t==="sleep-inc"?.5:-.5)));await M({date:r,kind:"body_sleep",value:s,skip_reason:null,item_id:null});return}if(t==="energy"){const a=Number(e.dataset.n),s=i.energy===a?null:a;if(s===null)return;await M({date:r,kind:"body_energy",value:s,skip_reason:null,item_id:null});return}if(t==="weight-inc"||t==="weight-dec"){const a=ta(i.weight,ea(o.events),t==="weight-inc"?.1:-.1);if(i.weight===a)return;await M({date:r,kind:"body_weight",value:a,skip_reason:null,item_id:null});return}if(t==="wake-inc"||t==="wake-dec"){const a=oa(i.wake,ra(o.events),t==="wake-inc"?15:-15);if(i.wake===a)return;await M({date:r,kind:"body_wake",value:a,skip_reason:null,item_id:null});return}if(t==="meal-inc"||t==="meal-dec"){const a=la(i.meal,sa(o.events),t==="meal-inc"?15:-15);if(i.meal===a)return;await M({date:r,kind:"body_meal",value:a,skip_reason:null,item_id:null});return}if(t==="plus"){const a=o.items.find(d=>d.id===e.dataset.item);if(!a||!ne(a))return;const s=z(a);if(s.logged||s.skip||a.b!==null&&s.current!==null&&s.current>=a.b)return;await M({date:r,kind:"set",value:(s.current??a.a??0)+1,skip_reason:null,item_id:a.id},a.id);return}if(t==="done"){const a=o.items.find(d=>d.id===e.dataset.item);if(!a)return;const s=z(a);if(s.logged||s.skip)return;await M({date:r,kind:"done",value:s.current??a.a,skip_reason:null,item_id:a.id},a.id);return}if(t==="detail-open"){const a=e.dataset.item??null,s=a?o.items.find(d=>d.id===a):void 0;if(!s)return;Tn(s),l.detailItemId=s.id,w();return}if(t==="detail-close"){l.detailItemId=null,w();return}if(t==="skip-open"){const a=e.dataset.item??null;l.skipItemId=l.skipItemId===a?null:a,w();return}if(t==="skip"){const a=o.items.find(f=>f.id===e.dataset.item);if(!a||z(a).logged)return;const d=e.dataset.reason;if(!tt(d))return;await M({date:r,kind:"skip",value:null,skip_reason:d,item_id:a.id}),l.skipItemId=null;return}if(t==="undo"){const a=o.items.find(f=>f.id===e.dataset.item);if(!a)return;const s=U(o.items),d=Je(Y(o.events,a,s?.id),r);if(!d)return;$n(a.id),await gr(d.id),l.skipItemId=null;return}if(t==="miss-open"){const a=e.dataset.item,s=e.dataset.date;if(!a||!s)return;const d=wn(a,s);l.missKey=l.missKey===d?null:d,w();return}if(t==="miss"){const a=o.items.find(g=>g.id===e.dataset.item),s=e.dataset.date,d=e.dataset.reason;if(!a||!s||s>=r||!tt(d))return;const f=z(a,s);if(f.logged||f.skip)return;await M({date:s,kind:"miss",value:null,skip_reason:d,item_id:a.id}),l.missKey=null;return}if(t==="advance"){if(!i.suggestedMilestone)return;if(Ge(o.profile.identity_constraint,i.suggestedMilestone)&&!l.advanceWarn){l.advanceWarn=!0,w();return}await kt(i.suggestedMilestone);return}if(t==="advance-go"){if(!i.suggestedMilestone)return;await kt(i.suggestedMilestone);return}if(t==="advance-cancel"){l.advanceWarn=!1,w();return}if(t==="onboard-goal"){const a=e.dataset.goal;if(!a||!Pt(a))return;const s={...o.profile,goals:Mi(o.profile.goals??[],a)};await I(async()=>{await p.saveProfile(s),o.profile=s});return}if(t==="onboard-age"){const a=e.dataset.age;if(!a||!qt(a))return;const s={...o.profile,age_band:a};await I(async()=>{await p.saveProfile(s),o.profile=s});return}if(t==="theme-toggle"){const a=e.dataset.theme;if(!a)return;await _e(Ri(O(o.profile.themes),a));return}if(t==="theme-add"){await Bn();return}if(t==="onboard-start"){const a=e.dataset.item;if(!a)return;l.startIds=Ti(l.startIds,a),w();return}if(t==="onboard-next"){w();return}if(t==="onboard-themes-done"){await _e(o.profile.themes??[],!0);return}if(t==="onboard-done"){const a=o.profile.age_band,s=o.profile.goals??[];if(!a||s.length===0||l.startIds.length===0)return;await I(async()=>{await p.saveOnboarding({goals:s,age_band:a,startIds:l.startIds}),o=await p.load(),l.screen="vandaag"});return}if(t==="later-now"||t==="later-park"){const a=e.dataset.item;if(!a)return;await I(async()=>{await p.setItemLater(a,t==="later-park"),o=await p.load()});return}if(t==="item-kind"){const a=e.dataset.kind;if(!rt(a))return;Mn(),l.addKind=a,w();return}if(t==="item-add"){await jn();return}if(t==="edit-kind"){const a=e.dataset.kind;if(!rt(a))return;$e(),l.editKind=a,w();return}if(t==="item-save"){await An();return}if(t==="item-remove-ask"){$e(),l.removeAsk=!0,w();return}if(t==="item-remove-cancel"){l.removeAsk=!1,w();return}if(t==="item-remove"){const a=l.detailItemId;if(!a)return;await I(async()=>{await p.removeItem(a),o=await p.load(),l.detailItemId=null,l.removeAsk=!1,l.screen="profiel"});return}if(t==="save-ik"){const a={...o.profile,identity_anti:T(A("identity_anti"),_.identity_anti),identity_new:T(A("identity_new"),_.identity_new),identity_constraint:T(A("identity_constraint"),_.identity_constraint),horizon_1y:T(A("horizon_1y"),_.horizon_1y)};await I(async()=>{await p.saveProfile(a),o.profile=a});return}if(t==="export"){zn(o);return}if(t==="import-pick"){document.querySelector("[data-id=import-file]")?.click();return}if(t==="import-go"){await En(l.importPaste);return}}async function En(e){const t=e.trim();if(!t){l.error=ee,w();return}await I(async()=>{o=await p.importJson(t),l.importPaste=""})}function Mn(){l.addLabel=A("item-label")??l.addLabel,l.addTiming=A("item-timing")??l.addTiming}function $e(){l.editLabel=A("edit-label")??l.editLabel,l.editTiming=A("edit-timing")??l.editTiming}function Tn(e){l.editLabel=e.label,l.editKind=Kt(e),l.editTiming=Rt(e),l.removeAsk=!1}async function An(){!p||!o||!l.detailItemId||($e(),await I(async()=>{const e=await p.updateItem({id:l.detailItemId,label:l.editLabel,kind:l.editKind,timing:l.editTiming});o=await p.load(),Tn(e),l.detailItemId=e.id}))}async function jn(){!p||!o||(Mn(),await I(async()=>{await p.addItem({label:l.addLabel,kind:l.addKind,timing:l.addTiming}),o=await p.load(),l.addLabel="",l.addTiming=""}))}async function Bn(){if(!o)return;const e=A("theme-custom")??"",t=O(o.profile.themes),n=zi(t,e);n.length===t.length&&n.every((i,r)=>i===t[r])||await _e(n)}async function _e(e,t=!1){if(!p||!o)return;const n=O(e),i={...o.profile,themes:n},r=t||!Gt(o);await I(async()=>{if(r){await p.saveThemes(n),o=await p.load();return}await p.saveProfile(i),o.profile=i})}function A(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function kt(e){await I(async()=>{o.stage=await p.advanceStage(o.stage,e),o.items=o.items.map(t=>t.id===o.stage.vector_id?{...t,milestone:e}:t),o.rotated=!0,l.advanceWarn=!1})}async function M(e,t){await I(async()=>{const n=await p.addEvent(e);o.events.push(n),t&&Wa(t)})}async function gr(e){await I(async()=>{await p.removeEvent(e),o.events=o.events.filter(t=>t.id!==e)})}async function ht(e){if(!p||!o)return;const t=na(e);t!==null&&ae().weight!==t&&await M({date:b(),kind:"body_weight",value:t,skip_reason:null,item_id:null})}async function wt(e){if(!p||!o)return;const t=en(e);t!==null&&ae().wake!==t&&await M({date:b(),kind:"body_wake",value:t,skip_reason:null,item_id:null})}async function $t(e){if(!p||!o)return;const t=da(e);t!==null&&ae().meal!==t&&await M({date:b(),kind:"body_meal",value:t,skip_reason:null,item_id:null})}mr();
