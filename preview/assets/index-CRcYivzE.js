(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const me=["geen tijd","geen energie","vergeten","geen zin","pijn"];function at(e){return!!(e&&me.includes(e))}const Rn=["guideline","evidence-informed","public-framework","user preference","hypothesis"],Gn=["vandaag","koers","voortgang","profiel"];function Pn(e){return!!(e&&Gn.includes(e))}const $={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},pe="routine_loop_v6",It=["routine_loop_v5","routine_loop_v4","routine_loop_v3"],rt="routine_local_user_id",st="routine_local_tenant_id",qn="routine_local_chosen";function Hn(e){return JSON.stringify({exported_at:new Date().toISOString(),key:pe,profile:e.profile,items:e.items,vector:e.vector,stage:e.stage,events:e.events,rotated:e.rotated,onboarded:e.onboarded,theme_step:e.theme_step},null,2)}function Vn(e){const t=new Blob([Hn(e)],{type:"application/json"}),n=URL.createObjectURL(t),i=document.createElement("a");i.href=n,i.download=`routine-${e.profile.id.slice(0,8)}.json`,i.click(),URL.revokeObjectURL(n)}const Lt=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],Et=["zo","ma","di","wo","do","vr","za"],Mt=[{iso:1,short:"ma"},{iso:2,short:"di"},{iso:3,short:"wo"},{iso:4,short:"do"},{iso:5,short:"vr"},{iso:6,short:"za"},{iso:7,short:"zo"}];function Tt(e){return Number.isInteger(e)&&e>=1&&e<=7}function b(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${i}`}function D(e,t){const n=W(e);return n.setDate(n.getDate()+t),b(n)}function W(e){const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)}function Fn(e){const t=W(e);return`${Et[t.getDay()]} ${t.getDate()} ${Lt[t.getMonth()]}`}function z(e){const t=W(e);return`${t.getDate()} ${Lt[t.getMonth()]}`}function Un(e){return Et[W(e).getDay()]}function Yn(e){const t=W(e).getDay();return t===0?7:t}function Ie(e){const t=W(e),n=t.getDay(),i=n===0?-6:1-n;return t.setDate(t.getDate()+i),b(t)}function Le(e,t){const n=[];let i=e;for(;i<=t;)n.push(i),i=D(i,1);return n}function R(){return crypto.randomUUID()}function Jn(){return new Date().toISOString()}function Zn(e){return e.trim().toLowerCase().normalize("NFC")}function Xn(e){return!!(e&&Rn.includes(e))}function Qn(e){const t=Zn(e);return t==="cafeïne 90 min na opstaan"?"public-framework":t==="wandelen na eten"?"evidence-informed":t==="low carb"||t==="scherm uit 22:00"||t==="korte rust"?"user preference":t==="vitamine d"?"guideline":t==="koud douchen"?"hypothesis":null}function Ee(e){return Qn(e.label)??(Xn(e.template)?e.template:null)}function ei(e){return Ee(e)!==null}function se(){return{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:null,condition:null}}function ti(e){return{mode:e?.mode??null,clock:e?.clock??null,anchor:e?.anchor??null,offset_min:e?.offset_min??null,window_min:e?.window_min??null,frequency:e?.frequency??null,condition:e?.condition??null}}function At(e){return e.trim().toLowerCase().normalize("NFC")}function ni(e){return At(e)==="korte rust"?{mode:"clock",clock:"08:00",window_min:840,frequency:"daily",condition:"body"}:null}function ii(e,t){const n=ni(t);return n?{...e,...n}:e}function jt(e){return{now:e.now??new Date,today:e.today,wakeAt:e.wakeAt??null,mealAt:e.mealAt??null,sleepSet:!!e.sleepSet,energySet:!!e.energySet}}function Me(e){const t=e?.trim().toLowerCase();return t==="body"||t==="energy|sleep"?"body":t==="energy"?"energy":t==="sleep"?"sleep":null}function ai(e,t){const n=Me(e.condition);if(!n)return!0;const i=!!t.sleepSet,r=!!t.energySet;return n==="energy"?r:n==="sleep"?i:i||r}function Bt(e,t){const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(!n)return null;const i=Number(n[1]),r=Number(n[2]);if(i>23||r>59)return null;const a=W(e);return a.setHours(i,r,0,0),a}function ri(e,t){return e==="wake"?t.wakeAt:e==="meal"?t.mealAt:null}function si(e,t){if(e.mode==="clock"&&e.clock)return Bt(t.today,e.clock);if(e.mode==="relative"&&e.anchor&&e.offset_min!==null){const n=ri(e.anchor,t);return n?new Date(n.getTime()+e.offset_min*6e4):null}return null}function Nt(e,t){return!t||e.window_min===null?null:new Date(t.getTime()+e.window_min*6e4)}function Ct(e,t){if(e.timing.frequency==="weekly"||e.type==="weekly"){const i=e.weekdays??[];return i.length===0?!1:i.includes(Yn(t))}return!0}function G(e){return Ae(e)==="constraint"}function Te(e){return Ae(e)==="preference"}function Dt(e){return!G(e)&&!Te(e)}function oi(e,t){if(G(e))return"silent";if(!Ct(e,t.today)||!ai(e.timing,t))return"hidden";const n=e.timing;if(!n.mode)return"due";const i=si(n,t);if(n.mode==="relative"&&!i)return"due";if(i&&t.now<i)return"wait";const r=Nt(n,i);return r&&t.now>r?"closed":"due"}function oe(e,t){const n=oi(e,t);return!(n==="hidden"||n==="closed"||n==="wait"&&e.timing.window_min!==null)}function ot(e){return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`}function li(e){if(e.window_min===null)return null;if(e.mode==="clock"&&e.clock){const t=Bt("2000-01-01",e.clock);if(!t)return null;const n=Nt(e,t);return n?`${ot(t)}–${ot(n)}`:null}return`${e.window_min} min`}function di(e){const t=Me(e.condition);return t==="body"?"na slaap of energie":t==="energy"?"na energie":t==="sleep"?"na slaap":null}function ve(e){const t=e.timing;return Me(t.condition)?null:t.condition?t.condition:t.mode==="relative"&&t.anchor==="wake"&&t.offset_min!==null?`${t.offset_min} min na opstaan`:t.mode==="relative"&&t.anchor==="meal"&&t.offset_min!==null?t.offset_min===0?"na eten":`${t.offset_min} min na eten`:t.mode==="relative"&&t.anchor==="meal"?"na eten":t.mode==="clock"&&t.clock?t.clock:null}function Ae(e){if(e.role)return e.role;const t=At(e.label);return t==="low carb"?"preference":t==="cafeïne 90 min na opstaan"||t==="scherm uit 22:00"?"constraint":null}const je=["gedrag","regel","medicijn","supplement","sociaal"],Be={gedrag:"gedrag",regel:"leefregel",medicijn:"medicijn",supplement:"supplement",sociaal:"sociaal"},Ne={gedrag:"Gedrag",regel:"Regel",medicijn:"Medicijn",supplement:"Supplement",sociaal:"Sociaal"},Ce=40,De=40;function lt(e){return!!(e&&je.includes(e))}function ne(e){return e.a!==null&&e.b!==null&&e.milestone!==null}function ci(e,t){return Ct(e,t)}function ie(e){return e.type==="weekly"||e.timing?.frequency==="weekly"}function de(e){const t=new Set;for(const n of e??[])Tt(n)&&t.add(n);return[...t].sort((n,i)=>n-i)}function ui(e,t){if(!Tt(t))return de(e);const n=new Set(de(e));return n.has(t)?n.delete(t):n.add(t),[...n].sort((i,r)=>i-r)}function fi(e,t){return e.removed||!ie(e)?null:{...e,weekdays:de(t)}}function mi(e){const t=new Set(de(e));return Mt.filter(n=>t.has(n.iso)).map(n=>n.short).join(" · ")}function pi(e,t){return{...e,tenant_id:e.tenant_id??t,weekdays:e.weekdays??null,times_per_week:e.times_per_week??null,timing:ii(ti(e.timing),e.label),role:Ae(e),template:Ee(e),later:!!e.later,removed:!!e.removed}}function Oe(e){return e.type==="medicijn"||e.type==="supplement"}function Ot(e){return e.type==="sociaal"}function Wt(e,t){return F(e,t).filter(n=>Dt(n)&&!Oe(n)&&!Ot(n)&&!n.later)}function vi(e,t){return F(e,t).filter(n=>Te(n)&&!n.later)}function gi(e,t){return F(e,t).filter(n=>G(n)&&!n.later)}function Kt(e,t){return F(e,t).filter(n=>Oe(n)&&!n.later)}function zt(e,t){return F(e,t).filter(n=>Ot(n)&&!n.later)}function yi(e,t){return F(e,t).filter(n=>n.later&&(Dt(n)||G(n)))}function F(e,t){return e.filter(n=>!n.removed&&ci(n,t)).sort((n,i)=>n.sort-i.sort)}function U(e){return e.find(ne)}function ke(e){return e.kind==="body_sleep"||e.kind==="body_energy"||e.kind==="body_weight"||e.kind==="body_wake"||e.kind==="body_meal"}function Y(e,t,n){return e.filter(i=>ke(i)?!1:!!(i.item_id===t.id||i.item_id===null&&n&&t.id===n))}function bi(e,t){return t?[...e.filter(ke),...Y(e,t,t.id)]:e.filter(ke)}function Rt(e){return e.a===null?null:e.unit==="sec"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} s`:e.unit==="reps"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} reps`:String(e.a)}function E(e){return e.trim().toLowerCase()}function P(e){const t=e.trim().replace(/\s+/g," ").slice(0,Ce);return t.length>0?t:null}function We(e){const t=e.trim().replace(/\s+/g," ").slice(0,De);if(!t)return se();const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(n){const i=Number(n[1]),r=Number(n[2]);if(i<=23&&r<=59)return{...se(),mode:"clock",clock:`${String(i).padStart(2,"0")}:${n[2]}`,frequency:"daily"}}return{...se(),frequency:"daily",condition:t}}function ki(e){return e.reduce((t,n)=>Math.max(t,n.sort),-1)+1}const hi=["Push-ups","Squats","Plank","Dead hang","Gerichte kracht","Koud douchen","Niet snoepen","Low carb","Intermittent fasting","Geen alcohol","Cafeïne 90 min na opstaan","Wandelen na eten","Medicijn ochtend","Vitamine D","Bellen met iemand","Iemand zien","Scherm uit 22:00","Korte rust"];function ge(e){const t=E(e);return hi.some(n=>E(n)===t)}function Ke(e){return ge(e.label)}function q(e){return!Ke(e)}function H(e){return!!e.removed}function wi(e){return e.filter(t=>q(t)&&!H(t)).sort((t,n)=>t.sort-n.sort)}function Gt(e){return e.type==="leefregel"?"regel":e.type==="medicijn"?"medicijn":e.type==="supplement"?"supplement":e.type==="sociaal"?"sociaal":"gedrag"}function Pt(e){return e.timing.mode==="clock"&&e.timing.clock?e.timing.clock:e.timing.condition??""}function $i(e,t){const n=P(t);return n?!e.some(i=>!H(i)&&E(i.label)===E(n)):!1}function _i(e,t,n){const i=P(n);return!i||ge(i)?!1:!e.some(r=>r.id!==t&&!H(r)&&E(r.label)===E(i))}function xi(e,t){const n=P(t);if(n)return e.find(i=>H(i)&&q(i)&&E(i.label)===E(n))}function Si(e){const t=P(e.label);return t?{id:R(),tenant_id:e.tenantId,type:Be[e.kind],label:t,unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:e.sort,timing:We(e.timing??""),role:"action",template:"user preference",later:!!e.later,removed:!1}:null}function Ii(e,t){if(!q(e)||H(e))return null;const n=P(t.label);return!n||ge(n)?null:{...e,type:Be[t.kind],label:n,timing:We(t.timing??""),template:"user preference"}}function Li(e,t){if(!q(e)||!H(e))return null;const n=P(t.label);return!n||ge(n)?null:{...e,type:Be[t.kind],label:n,timing:We(t.timing??""),template:"user preference",later:!1,removed:!1}}function Ei(e,t){return e.removed?null:{...e,later:!!t}}function Mi(e){return H(e)?{item:e,mode:"removed"}:q(e)?{item:{...e,removed:!0},mode:"removed"}:Ke(e)?{item:{...e,later:!0},mode:"parked"}:null}function Ti(e){const t=new Set,n=[];for(const i of e){const r=E(i.label);t.has(r)||(t.add(r),n.push(i))}return n}function ze(e,t,n){const i=Ti(e),r=new Set(i.map(s=>E(s.label))),a=t.filter(s=>!r.has(E(s.label))).map(s=>({...s,tenant_id:n}));return[...i,...a]}function qt(e){const t=new Map;for(const n of e)for(const i of n)t.has(i.id)||t.set(i.id,i);return[...t.values()].sort((n,i)=>n.created_at.localeCompare(i.created_at))}function Ai(e){return e?!!(e.identity_anti||e.identity_new||e.identity_constraint||e.horizon_1y||e.display_name):!1}function ji(e,t,n,i){if(e.length===0)return null;const r=e.reduce((m,v)=>(v.events?.length??0)>(m.events?.length??0)?v:m),a=e.find(m=>Ai(m.profile))?.profile??r.profile,s=ze([r,...e.filter(m=>m!==r)].flatMap(m=>m.items??[]),t,i),d=new Map(s.map(m=>[E(m.label),m.id])),f=new Map;for(const m of e)for(const v of m.items??[]){const y=d.get(E(v.label));y&&v.id!==y&&f.set(v.id,y)}const g=qt(e.map(m=>m.events??[])).map(m=>{if(!m.item_id)return m;const v=f.get(m.item_id);return v?{...m,item_id:v}:m});return{...r,profile:{...a,id:a.id||n,tenant_id:a.tenant_id||i},items:s,events:g}}const te=3,Re=[{id:"kracht",label:"Kracht"},{id:"eten",label:"Eten & drinken"},{id:"slaap",label:"Slaap"},{id:"stofjes",label:"Stofjes"},{id:"bewegen",label:"Bewegen"}],Ge=["18–29","30–39","40–49","50–59","60+"],Bi={kracht:["Push-ups","Squats","Plank","Dead hang"],eten:["Niet snoepen","Low carb","Intermittent fasting","Geen alcohol"],slaap:["Koud douchen"],stofjes:["Medicijn ochtend","Vitamine D"],bewegen:["Wandelen na eten"]};function Pe(e){return G(e)||e.type==="weekly"?!1:e.type==="daily"||e.type==="leefregel"||e.type==="gedrag"||e.type==="sociaal"||Oe(e)}function Ht(e){return e.filter(t=>t.removed?!1:ie(t)||Pe(t)?!0:G(t)&&t.later).sort((t,n)=>t.sort-n.sort)}function dt(e){return Ht(e).filter(t=>t.later)}function Vt(e){return Ht(e).filter(t=>!t.later)}function Ni(e){return Vt(e).filter(t=>!ie(t))}function Ci(e){return e<=te?null:"Meer dan drie is oké. Parkeren kan."}function Ft(e){return!(e.onboarded!==!1||(e.events??[]).length>0)}function Di(e){return Ft(e)?e.profile.goals?.length?e.profile.age_band?e.theme_step!==!0?"themes":"start":"age":"goals":null}function Oi(e,t){const n=e.filter(Pe).sort((a,s)=>a.sort-s.sort);if(t.length===0)return n;const i=new Set(t.flatMap(a=>Bi[a]??[])),r=n.filter(a=>i.has(a.label));return r.length>0?r:n}function Wi(e,t){const n=new Set(t.slice(0,te));return e.map(i=>Pe(i)?{...i,later:!n.has(i.id)}:{...i,later:!1})}function Ki(e,t){return e.includes(t)?e.filter(n=>n!==t):[...e,t]}function zi(e,t){return e.includes(t)?e.filter(n=>n!==t):e.length>=te?e:[...e,t]}function Ut(e){return Re.some(t=>t.id===e)}function Yt(e){return Ge.includes(e)}const Jt="geen zin",x={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140},Ri="Zet een 1-jaars B.";function T(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function Gi(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===Jt).length}function Pi(e,t){const n=T(e,x.identity_new);return!n||Gi(t)<2?null:n}function qi(e,t,n){return n!==Jt?null:Pi(e,t)}function Hi(e){return!!T(e,x.identity_constraint)}function qe(e,t){return t==null?!1:Hi(e)}function Vi(e){const t=T(e,x.identity_constraint);return t?`Check: ${t}.`:null}function Fi(e,t){return t&&!T(e,x.horizon_1y)}function Ui(e,t){return Fi(e,t)?Ri:null}function Zt(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const ct=["Military calisthenics","Kickbox","Spinnen"],Xt=40;function He(e){const t=e.trim().replace(/\s+/g," ").slice(0,Xt);return t.length>0?t:null}function O(e){if(!Array.isArray(e))return[];const t=new Set,n=[];for(const i of e){if(typeof i!="string")continue;const r=He(i);if(!r)continue;const a=r.toLowerCase();t.has(a)||(t.add(a),n.push(r))}return n}function Yi(e,t){const n=He(t);if(!n)return e;const i=n.toLowerCase();return e.some(r=>r.toLowerCase()===i)?e.filter(r=>r.toLowerCase()!==i):[...e,n]}function Ji(e,t){const n=He(t);if(!n)return e;const i=n.toLowerCase();return e.some(r=>r.toLowerCase()===i)?e:[...e,n]}function Zi(e){const n=O(e).filter(i=>!ct.some(r=>r.toLowerCase()===i.toLowerCase()));return[...ct,...n]}function ut(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function Qt(e){const t=new Set(O(e).map(i=>i.toLowerCase()));return`<div class="chips">${Zi(e).map(i=>`<button class="chip pick ${t.has(i.toLowerCase())?"on":""}" data-act="theme-toggle" data-theme="${ut(i)}">${ut(i)}</button>`).join("")}</div>
        <div class="theme-add">
          <input data-id="theme-custom" type="text" maxlength="${Xt}" placeholder="Eigen thema" autocomplete="off" enterkeyhint="done" />
          <button class="btn ghost" data-act="theme-add">Voeg toe</button>
        </div>`}const ee="Ongeldig bestand. Geen Routine-export.";function ce(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Xi(e){return e==null||e===pe?!0:It.includes(String(e))}function Qi(e){return ce(e)&&typeof e.id=="string"&&e.id.length>0&&typeof e.label=="string"}function ea(e){return ce(e)&&typeof e.id=="string"&&e.id.length>0&&typeof e.date=="string"&&typeof e.kind=="string"}function ft(e){return e.trim().toLowerCase()}function Q(e,t){const n=e?.trim();if(n)return e??n;const i=t?.trim();return i?t??i:null}function ta(e,t){const n=[],i=new Set;for(const r of[e,t].flatMap(a=>Array.isArray(a)?a:[]))typeof r!="string"||!Ut(r)||i.has(r)||(i.add(r),n.push(r));return n}function na(e,t,n){const i=new Map(t.map(a=>[ft(a.label),a.id])),r=new Map;for(const a of n){const s=i.get(ft(a.label));s&&a.id!==s&&r.set(a.id,s)}return e.map(a=>{if(!a.item_id)return a;const s=r.get(a.item_id);return s?{...a,item_id:s}:a})}function ia(e){let t;try{t=JSON.parse(e)}catch{throw new Error(ee)}if(!ce(t)||!Xi(t.key))throw new Error(ee);if(!ce(t.profile)||!Array.isArray(t.items)||!Array.isArray(t.events))throw new Error(ee);if(!t.items.every(Qi)||!t.events.every(ea))throw new Error(ee);return{profile:t.profile,items:t.items,events:t.events,onboarded:typeof t.onboarded=="boolean"?t.onboarded:void 0,theme_step:typeof t.theme_step=="boolean"?t.theme_step:void 0}}function aa(e,t){return{...e,display_name:Q(e.display_name,t.display_name),identity_anti:T(Q(e.identity_anti,t.identity_anti),x.identity_anti),identity_new:T(Q(e.identity_new,t.identity_new),x.identity_new),identity_constraint:T(Q(e.identity_constraint,t.identity_constraint),x.identity_constraint),horizon_1y:T(Q(e.horizon_1y,t.horizon_1y),x.horizon_1y),age_band:e.age_band??(t.age_band&&Yt(t.age_band)?t.age_band:null),goals:ta(e.goals,t.goals),themes:O([...e.themes??[],...t.themes??[]])}}function ra(e,t){const n=e.profile.tenant_id,i=ze(e.items,t.items,n),r=na(t.events,i,t.items).map(a=>({...a,tenant_id:n,user_id:e.profile.id}));return{...e,profile:aa(e.profile,t.profile),items:i,events:qt([e.events,r]),onboarded:!!(e.onboarded||t.onboarded),theme_step:!!(e.theme_step||t.theme_step)}}const sa=2,oa=6;function J(e,t){return e.created_at.localeCompare(t.created_at)}function Z(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(J).at(-1)}function en(e,t){return t.filter(i=>i.kind==="set").sort(J).at(-1)?.value??e}function Ve(e,t){return Z(e,t,"body_sleep")?.value??null}function Fe(e,t){return Z(e,t,"body_energy")?.value??null}const tn=40,nn=250,la=80;function da(e,t){return Z(e,t,"body_weight")?.value??null}function ca(e){return e.filter(t=>t.kind==="body_weight"&&t.value!==null).sort(J).at(-1)?.value??null}function ua(e,t,n){return Math.round(Math.max(tn,Math.min(nn,(e??t??la)+n))*10)/10}function fa(e){const t=e.trim().replace(",",".");if(!t)return null;const n=Number(t);return Number.isFinite(n)?Math.round(Math.max(tn,Math.min(nn,n))*10)/10:null}const ye=0,be=1439,ma=420,pa=780;function Ue(e){return e==null||!Number.isFinite(e)?null:Math.max(ye,Math.min(be,Math.round(e)))}function an(e,t){return Ue(e.filter(n=>n.kind===t&&n.value!==null).sort(J).at(-1)?.value)}function Ye(e,t){return Ue(Z(e,t,"body_wake")?.value)}function va(e){return an(e,"body_wake")}function Je(e,t){return Ue(Z(e,t,"body_meal")?.value)}function ga(e){return an(e,"body_meal")}function rn(e,t,n,i){return Math.max(ye,Math.min(be,(e??t??i)+n))}function ya(e,t,n){return rn(e,t,n,ma)}function ba(e,t,n){return rn(e,t,n,pa)}function sn(e){const t=e.trim();if(!t)return null;const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(!n)return null;const i=Number(n[1]),r=Number(n[2]);return i>23||r>59?null:i*60+r}const ka=sn;function on(e){const t=Math.max(ye,Math.min(be,Math.round(e))),n=Math.floor(t/60),i=t%60;return`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}`}const ha=on;function Ze(e,t){if(t===null)return null;const[n,i,r]=e.split("-").map(Number);if(!n||!i||!r)return null;const a=new Date(n,i-1,r),s=Math.max(ye,Math.min(be,Math.round(t)));return a.setHours(Math.floor(s/60),s%60,0,0),a}const ln=Ze;function wa(e){return e==="set"||e==="done"||e==="skip"}function dn(e,t){return e.date===t&&wa(e.kind)}function Xe(e,t){return e.filter(n=>dn(n,t)).sort(J).at(-1)}function ae(e,t){return Xe(e,t)}function cn(e,t){const n=ae(e,t);return n?.kind==="skip"?n.skip_reason:null}function un(e,t){return ae(e,t)?.kind==="done"}function fn(e,t){return ae(e,t)?.kind==="set"}function mn(e,t){const n=ae(e,t);return n?.kind==="set"||n?.kind==="done"}function $a(e,t){return e!==null&&e<oa||t!==null&&t<=sa}function _a(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const i=Math.max(1,Math.ceil(n/2));return Math.min(t,e+i)}function ue(e,t,n,i){if(t<i)return"empty";const r=ae(e,t);return r?.kind==="done"||r?.kind==="set"?"done":r?.kind==="skip"?"skip":Z(e,t,"miss")?"miss":t>=n?"empty":"miss"}function xa(e,t,n="1970-01-01"){let i=0,r=t;for(let a=0;a<400;a+=1){const s=ue(e,r,t,n);if(s==="done")i+=1;else if(s==="skip"||s==="empty"&&r===t){r=D(r,-1);continue}else break;r=D(r,-1)}return i}function Sa(e,t,n){const i=Ie(t),r=!n||n<i?i:n;let a=0,s=0;for(const d of Le(r,t)){const f=ue(e,d,t,n??r);f==="skip"||f==="empty"||(s+=1,f==="done"&&(a+=1))}return{hits:a,eligible:s}}function Ia(e,t,n="1970-01-01",i=3){const r=ue(e,t,t,n);if(r==="done"||r==="skip")return!1;const a=D(t,-1);if(a<n)return!1;const s=D(t,-i),d=n>s?n:s;return Le(d,a).some(f=>ue(e,f,t,n)==="miss")}function La(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled&&!e.todayLogged?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function Ea(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${mt(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${mt(e.milestone)}.`}function mt(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function pn(e,t,n){return t.filter(r=>r.kind==="set"&&r.date<=n).sort(J).at(-1)?.value??e}function Ma(e,t,n,i){const r=en(e.a,n),a=Ve(n,i),s=Fe(n,i),d=da(n,i),f=Ye(n,i),g=Je(n,i),m=un(n,i),v=fn(n,i),y=mn(n,i),j=cn(n,i),B=$a(a,s),N=r>=t.milestone,u=r>=e.b,k=Ia(n,i,t.started_on),S=Ie(i),X=pn(e.a,n,D(S,-1)),zn=La({current:r,weekStartCurrent:X,gearDown:B,stalled:k,milestoneHit:N,todayLogged:v||m||!!j});return{current:r,sleep:a,energy:s,weight:d,wake:f,meal:g,doneToday:m,plusToday:v,setLoggedToday:y,skipToday:j,gearDown:B,milestoneHit:N,atB:u,trend:zn,hitrate:Sa(n,i,t.started_on),streak:xa(n,i,t.started_on),nextAction:Ea({milestone:t.milestone,b:e.b,gearDown:B,milestoneHit:N,atB:u,stalled:k,doneToday:m,plusToday:v,skipToday:j}),suggestedMilestone:N&&!u&&!B?_a(t.milestone,e.b):null}}function Ta(e,t,n,i){return Y(e,t,n).some(r=>(r.kind==="set"||r.kind==="done"||r.kind==="skip"||r.kind==="miss")&&r.date<i)}function vn(e,t){return e.created_at.localeCompare(t.created_at)}function Aa(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(vn).at(-1)}function ja(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip"||n.kind==="miss")).sort(vn).at(-1)}function Ba(e,t=[]){const n=W(e);return n.setHours(12,0,0,0),jt({today:e,now:n,wakeAt:Ze(e,Ye(t,e)),mealAt:ln(e,Je(t,e)),sleepSet:Ve(t,e)!==null,energySet:Fe(t,e)!==null})}function he(e,t,n=[]){const i=Ba(t,n);return[...Wt(e,t),...Kt(e,t),...zt(e,t)].filter(r=>oe(r,i))}function we(e,t,n,i,r){const a=Y(e,t,r),s=ja(a,n);if(s?.kind==="set"||s?.kind==="done")return{item:t,date:n,mark:"hit",reason:null};if(s?.kind==="skip")return{item:t,date:n,mark:"skip",reason:s.skip_reason};const d=s?.kind==="miss"?s:Aa(a,n,"miss");return d?{item:t,date:n,mark:"miss",reason:d.skip_reason}:n>=i?{item:t,date:n,mark:"open",reason:null}:{item:t,date:n,mark:"idle",reason:null}}function gn(e,t,n,i){const r=D(n,-1);return he(e,r,t).filter(a=>Ta(t,a,i,r)).map(a=>{const s=we(t,a,r,n,i);return s.mark==="hit"||s.mark==="skip"||s.mark==="miss"?s:{...s,mark:"miss",reason:null}}).filter(a=>a.mark==="miss"&&!a.reason)}function Na(e,t,n){return e.some(i=>i.mark==="hit")?"hit":e.some(i=>i.mark==="miss")?"miss":e.some(i=>i.mark==="skip")?"skip":t===n?"open":"idle"}function yn(e,t,n,i){const r=Ie(n),a=D(r,6),s=gn(e,t,n,i),d=new Set(s.map(u=>`${u.item.id}:${u.date}`)),f=Le(r,a).map(u=>{const k=he(e,u,t).map(S=>{const X=we(t,S,u,n,i);return d.has(`${S.id}:${u}`)?{...X,mark:"miss",reason:X.reason}:X});return{date:u,label:Un(u),mark:Na(k,u,n),hits:k.filter(S=>S.mark==="hit").length,misses:k.filter(S=>S.mark==="miss").length,skips:k.filter(S=>S.mark==="skip").length}}),g=f.filter(u=>u.date<n),m=g.reduce((u,k)=>u+k.hits,0),v=g.reduce((u,k)=>u+k.misses,0),y=g.reduce((u,k)=>u+k.skips,0),j=g.flatMap(u=>he(e,u.date,t).map(k=>{const S=we(t,k,u.date,n,i);return d.has(`${k.id}:${u.date}`)?{...S,mark:"miss",reason:S.reason}:S}).filter(k=>k.mark==="miss")),B=g.filter(u=>u.mark!=="idle").length,N=m>0&&v===0&&B>=2?"Week staat.":null;return{start:r,end:a,range:`${z(r)} – ${z(a)}`,days:f,hits:m,misses:v,skips:y,missRows:j,note:N}}function le(e){return U(e)?.id}function pt(e,t){return e.created_at.localeCompare(t.created_at)}function Ca(e,t){const n=new Map;for(const i of[...e].sort(pt))i.kind!=="body_weight"||i.value===null||i.date>t||n.set(i.date,i);return[...n.values()].sort((i,r)=>i.date.localeCompare(r.date)||pt(i,r)).map(i=>({date:i.date,kg:i.value}))}function Da(e,t,n,i,r){const a=yn(e,t,n,r??le(e)),s=a.days.map(d=>({date:d.date,label:d.label,current:pn(i,t,d.date<=n?d.date:n),mark:d.mark}));return{week:a,line:s,weight:Ca(t,n),hits:a.hits,skips:a.skips,misses:a.misses}}function bn(e,t,n,i=18,r=16){if(e.length===0)return[];const a=Math.min(...e),d=Math.max(...e)-a,f=t-i*2,g=n-r*2;return e.map((m,v)=>{const y=e.length===1?t/2:i+v/(e.length-1)*f,j=d===0?n/2:r+(1-(m-a)/d)*g;return{x:y,y:j}})}function kn(e){return e.map(t=>`${t.x.toFixed(1)},${t.y.toFixed(1)}`).join(" ")}const hn=1080;function Oa(e){return e.skip?null:e.plus?{text:"Set gedaan.",tone:"fog",beat:"fade"}:e.done?e.type==="medicijn"?{text:"Genomen.",tone:"sage",beat:"check"}:e.track?{text:"Set staat.",tone:"sage",beat:"check"}:{text:"Staat.",tone:"sage",beat:"check"}:null}function wn(e,t){return{id:e,tenant_id:t,display_name:null,...Zt(),age_band:null,goals:[],themes:[]}}function $n(e,t,n=b()){return{id:R(),tenant_id:t,vector_id:e,milestone:$.milestone,started_on:n,deadline:D(n,$.windowDays),status:"active",stage_type:$.stageType}}function Qe(e){const t=n=>({id:R(),tenant_id:e,timing:se(),role:null,template:null,later:!1,...n});return[t({type:"daily",label:"Push-ups",unit:"reps",a:$.a,b:$.b,milestone:$.milestone,weekdays:null,times_per_week:null,sort:0}),t({type:"daily",label:"Squats",unit:"reps",a:30,b:null,milestone:null,weekdays:null,times_per_week:null,sort:1}),t({type:"daily",label:"Plank",unit:"sec",a:60,b:null,milestone:null,weekdays:null,times_per_week:null,sort:2}),t({type:"daily",label:"Dead hang",unit:"sec",a:45,b:null,milestone:null,weekdays:null,times_per_week:null,sort:3}),t({type:"weekly",label:"Gerichte kracht",unit:null,a:null,b:null,milestone:null,weekdays:[],times_per_week:2,sort:4}),t({type:"leefregel",label:"Koud douchen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:5,template:"hypothesis"}),t({type:"leefregel",label:"Niet snoepen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:6}),t({type:"leefregel",label:"Low carb",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:7,role:"preference",template:"user preference"}),t({type:"leefregel",label:"Intermittent fasting",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:8}),t({type:"leefregel",label:"Geen alcohol",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:9}),t({type:"gedrag",label:"Cafeïne 90 min na opstaan",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:10,role:"constraint",template:"public-framework",timing:{mode:"relative",clock:null,anchor:"wake",offset_min:90,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Wandelen na eten",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:11,role:"action",template:"evidence-informed",timing:{mode:"relative",clock:null,anchor:"meal",offset_min:0,window_min:null,frequency:"daily",condition:"na eten"}}),t({type:"medicijn",label:"Medicijn ochtend",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:12,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"ochtend"}}),t({type:"supplement",label:"Vitamine D",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:13,role:"action",template:"guideline",timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Bellen met iemand",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:14,role:"action",template:null,timing:{mode:"clock",clock:"18:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Iemand zien",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:1,sort:15,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"deze week"}}),t({type:"gedrag",label:"Scherm uit 22:00",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:16,role:"constraint",template:"user preference",timing:{mode:"clock",clock:"22:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Korte rust",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:17,role:"action",template:"user preference",timing:{mode:"clock",clock:"08:00",anchor:null,offset_min:null,window_min:840,frequency:"daily",condition:"body"}})]}function Wa(e,t){return{id:e.id,tenant_id:e.tenant_id,user_id:t,domain:$.domain,a:e.a??$.a,b:e.b??$.b,unit:e.unit==="sec"?"sec":"reps",pace_constraint:null}}function Ka(e,t=b(),n=R()){const i=wn(e,n),r=Qe(n),a=U(r)??r[0],s=Wa(a,e),d=$n(s.id,n,t);return a.milestone!==null&&(d.milestone=a.milestone),{profile:i,items:r,vector:s,stage:d,events:[],rotated:!1,onboarded:!1,theme_step:!1}}function _n(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,items:e.items.map(n=>ne(n)?{...n,a:$.a,b:$.b,milestone:$.milestone,unit:$.unit}:n),vector:{...e.vector,a:$.a,b:$.b,unit:$.unit},stage:{...e.stage,milestone:$.milestone},events:e.events}:e}function za(){const e=localStorage.getItem(rt);if(e)return e;const t=R();return localStorage.setItem(rt,t),t}function Ra(){const e=localStorage.getItem(st);if(e)return e;const t=R();return localStorage.setItem(st,t),t}function _(e){localStorage.setItem(pe,JSON.stringify(e))}function Ga(e){if(!e)return null;try{const t=JSON.parse(e);return!t||typeof t!="object"?null:t}catch{return null}}function Pa(){return[pe,...It].map(e=>Ga(localStorage.getItem(e))).filter(e=>e!==null)}function xn(e,t,n){const i=ze(e.items??[],Qe(n),n).map(r=>pi(r,n));return{...e,profile:{...wn(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...Zt(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null,age_band:e.profile?.age_band??null,goals:Array.isArray(e.profile?.goals)?e.profile.goals:[],themes:O(e.profile?.themes)},items:i,vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(r=>({...r,tenant_id:r.tenant_id??n,item_id:r.item_id??null})),rotated:!!e.rotated,onboarded:e.onboarded??!0,theme_step:e.theme_step??!1}}function I(e,t){const n=Pa();if(n.length===0){const a=Ka(e,b(),t);return _(a),a}const i=ji(n,Qe(t),e,t)??n[0],r=_n(xn(i,e,t));return _(r),r}function qa(){localStorage.setItem(qn,"1");const e=za(),t=Ra();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return I(e,t)},async addEvent(n){const i=I(e,t),r={id:n.id??R(),tenant_id:t,user_id:e,item_id:n.item_id??null,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:Jn()};return i.events.push(r),_(i),r},async removeEvent(n){const i=I(e,t),r=i.events.find(a=>a.id===n);if(r){if(!dn(r,b()))throw new Error("alleen vandaag");i.events=i.events.filter(a=>a.id!==n),_(i)}},async saveProfile(n){const i=I(e,t);i.profile=n,_(i)},async saveOnboarding(n){const i=I(e,t);i.profile={...i.profile,goals:n.goals,age_band:n.age_band,themes:O(i.profile.themes)},i.items=Wi(i.items,n.startIds),i.onboarded=!0,i.theme_step=!0,_(i)},async saveThemes(n){const i=I(e,t);i.profile={...i.profile,themes:O(n)},i.theme_step=!0,_(i)},async setItemLater(n,i){const r=I(e,t);r.items=r.items.map(a=>a.id!==n?a:Ei(a,i)??a),_(r)},async toggleItemWeekday(n,i){const r=I(e,t),a=r.items.find(d=>d.id===n);if(!a)throw new Error("item ontbreekt");const s=fi(a,ui(a.weekdays,i));if(!s)throw new Error("geen weekdagen");return r.items=r.items.map(d=>d.id===s.id?s:d),_(r),s},async addItem(n){const i=I(e,t),r=xi(i.items,n.label);if(r){const s=Li(r,{label:n.label,kind:n.kind,timing:n.timing});if(!s)throw new Error("naam ontbreekt");return i.items=i.items.map(d=>d.id===s.id?s:d),_(i),s}const a=Si({tenantId:t,label:n.label,kind:n.kind,timing:n.timing,sort:ki(i.items)});if(!a)throw new Error("naam ontbreekt");if(!$i(i.items,a.label))throw new Error("item bestaat al");return i.items=[...i.items,a],_(i),a},async updateItem(n){const i=I(e,t),r=i.items.find(s=>s.id===n.id);if(!r)throw new Error("item ontbreekt");if(!P(n.label))throw new Error("naam ontbreekt");if(!_i(i.items,r.id,n.label))throw new Error("item bestaat al");const a=Ii(r,n);if(!a)throw new Error("alleen eigen item");return i.items=i.items.map(s=>s.id===a.id?a:s),_(i),a},async removeItem(n){const i=I(e,t),r=i.items.find(s=>s.id===n);if(!r)throw new Error("item ontbreekt");const a=Mi(r);if(!a)throw new Error("item blijft");return i.items=i.items.map(s=>s.id===a.item.id?a.item:s),_(i),a.item},async saveVectorConstraint(n,i){const r=I(e,t);r.vector.id===n&&(r.vector.pace_constraint=i,_(r))},async advanceStage(n,i){const r=I(e,t),a=$n(n.vector_id,t);return a.milestone=i,r.stage=a,r.items=r.items.map(s=>s.id===n.vector_id?{...s,milestone:i}:s),r.rotated=!0,_(r),a},async importJson(n){const i=ia(n),r=I(e,t),a=_n(xn(ra(r,i),e,t));return _(a),a},async signOut(){}}}const vt="#F0ECE4",Ha="#3D6B5A";function Sn(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${vt}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${vt}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${Ha}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function h(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function Va(e){return e==="stokt"||e==="herstel"?"ember":e==="stijgt"?"sage":"fog"}function gt(e){const t=Va(e);return e==="stokt"||e==="herstel"||e==="zakt"?h("status-kink",`ico-${t}`):e==="stijgt"?h("status-up",`ico-${t}`):h("status-flat",`ico-${t}`)}function Fa(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${h(n?"dot-now":"dot")}</button>`}).join("")}const Ua=`
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
</svg>`;function Ya(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",Ua)}const V=()=>document.querySelector("#app"),l={screen:"vandaag",skipItemId:null,missKey:null,detailItemId:null,advanceWarn:!1,busy:!1,error:null,startIds:[],addKind:"gedrag",addLabel:"",addTiming:"",editKind:"gedrag",editLabel:"",editTiming:"",removeAsk:!1,importPaste:"",confirmBeats:{}},fe=new Map;let p=null,o=null;function re(){if(!o)throw new Error("geen snapshot");const e=U(o.items);return Ma(o.vector,o.stage,bi(o.events,e),b())}function K(e,t=b()){if(!o)throw new Error("geen snapshot");const n=U(o.items),i=Y(o.events,e,n?.id),r=e.a===null?null:en(e.a,i);return{done:un(i,t),plus:fn(i,t),skip:cn(i,t),logged:mn(i,t),current:r}}function In(e,t){return`${e}:${t}`}function Ja(e=b()){const t=o?.events??[];return jt({today:e,now:new Date,wakeAt:Ze(e,Ye(t,e)),mealAt:ln(e,Je(t,e)),sleepSet:Ve(t,e)!==null,energySet:Fe(t,e)!==null})}function c(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function w(){if(!o||!p)return;const e=Di(o);if(e){V().innerHTML=pr(e);return}const t=re(),{vector:n,stage:i}=o,r=p.mode==="local"?"Lokaal":"Supabase",a=`
    <div class="hdr">
      <div>
        ${Sn()}
        <div class="date-s">${Fn(b())}</div>
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
      ${gr(d)}
      ${l.error?`<p class="error" style="padding:0 18px">${c(l.error)}</p>`:""}
      ${s}`;return}l.detailItemId=null}if(l.screen==="vandaag"){const d=b(),f=Ja(d),g=Wt(o.items,d).filter(u=>oe(u,f)),m=gi(o.items,d),v=Kt(o.items,d).filter(u=>oe(u,f)),y=zt(o.items,d).filter(u=>oe(u,f)),j=yi(o.items,d),B=vi(o.items,d),N=gn(o.items,o.events,d,le(o.items));V().innerHTML=`
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
                value="${t.wake===null?"":on(t.wake)}"
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
                value="${t.meal===null?"":ha(t.meal)}"
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
          <div class="dots">${Fa(t.energy)}</div>
        </div>
      </div>
      ${B.length?`<div class="sec-hd">Dag</div>
      <div class="card quiet">
        <div class="day-tags">${B.map(u=>vr(u)).join("")}</div>
      </div>`:""}
      ${m.length?`<div class="sec-hd">Regel</div>${m.map(u=>hr(u)).join("")}`:""}
      ${v.length?`<div class="sec-hd">Stofjes</div>${v.map(u=>yt(u)).join("")}`:""}
      ${y.length?`<div class="sec-hd">Sociaal</div>${y.map(u=>yt(u)).join("")}`:""}
      ${N.length?`<div class="sec-hd">Niet gedaan</div>
      <div class="card">
        <div class="note" style="margin-top:0">Geen +1, Done of Skip. Korte reden.</div>
        ${N.map(u=>En(u)).join("")}
      </div>`:""}
      <div class="sec-hd">Vandaag</div>
      ${g.map(u=>wr(u,t)).join("")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Niet in Vandaag. Terughalen laat het log staan.</div>
        ${j.map(u=>An(u)).join("")}
        <button class="btn ghost later-add" data-nav="profiel">Eigen item</button>
      </div>
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${gt(t.trend.word)}
          <div class="word">${t.trend.word}</div>
        </div>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${c(l.error)}</p>`:""}
      ${s}`;return}if(l.screen==="koers"){V().innerHTML=`
      ${a}
      ${t.gearDown?'<div class="banner hot">Lijf vraagt tempo omlaag. Etappe gaat niet omhoog.</div>':""}
      ${wt(o.profile.themes,"Tik een suggestie of typ zelf. Geen vaste lijst. Later aan te passen.")}
      ${bt(yn(o.items,o.events,b(),le(o.items)))}
      ${kt(dt(o.items),"Niet in Vandaag. Terughalen laat het log staan.")}
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
            <div class="val" style="font-size:1.15rem">${z(i.started_on)} → ${i.deadline?z(i.deadline):"—"}</div>
          </div>
          <div>
            <div class="lbl">Trend</div>
            <div class="val status">${gt(t.trend.word)} ${t.trend.word}</div>
          </div>
          <div>
            <div class="lbl">Rem</div>
            <div class="val" style="font-size:1.1rem">${c(n.pace_constraint||"—")}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="lbl">Volgende actie</div>
        <div class="action-line">${c(t.nextAction)}</div>
      </div>
      ${lr(t)}
      ${sr(o)}
      <div class="sec-hd">${h("ik")} Ik</div>
      <div class="card">
        <div class="field">
          <div class="lbl">Leven dat ik weiger</div>
          <textarea data-id="identity_anti" maxlength="${x.identity_anti}">${c(o.profile.identity_anti??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wie ik word</div>
          <textarea data-id="identity_new" maxlength="${x.identity_new}">${c(o.profile.identity_new??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wat B niet mag schenden</div>
          <textarea data-id="identity_constraint" maxlength="${x.identity_constraint}">${c(o.profile.identity_constraint??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">1-jaars B</div>
          <textarea data-id="horizon_1y" maxlength="${x.horizon_1y}">${c(o.profile.horizon_1y??"")}</textarea>
        </div>
        <button class="btn primary" data-act="save-ik">Bewaar</button>
      </div>
      ${ht()}
      ${l.error?`<p class="error" style="padding:0 18px">${c(l.error)}</p>`:""}
      ${s}`;return}if(l.screen==="voortgang"){const d=Da(o.items,o.events,b(),o.vector.a,le(o.items));V().innerHTML=`
      ${a}
      ${bt(d.week)}
      <div class="sec-hd">Lijn</div>
      <div class="card">
        <div class="note" style="margin-top:0">Huidige deze week. Geen score.</div>
        ${mr(d.line.map(f=>f.current),b(),d.line)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Nu</div><div class="val">${C(t.current)}</div></div>
          <div><div class="lbl">Gedaan</div><div class="val">${d.hits}</div></div>
        </div>
      </div>
      ${fr(d.weight)}
      ${l.error?`<p class="error" style="padding:0 18px">${c(l.error)}</p>`:""}
      ${s}`;return}if(l.screen==="profiel"){const d=o.profile.goals??[],f=o.profile.age_band,g=Vt(o.items),m=dt(o.items),v=Ci(Ni(o.items).length);V().innerHTML=`
      ${a}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="note" style="margin-top:0">Later aan te passen. Geen wipe.</div>
        <div class="chips">${Re.map(y=>`<button class="chip pick ${d.includes(y.id)?"on":""}" data-act="onboard-goal" data-goal="${y.id}">${y.label}</button>`).join("")}</div>
      </div>
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="note" style="margin-top:0">Alleen een band. Geen geboortedatum.</div>
        <div class="chips">${Ge.map(y=>`<button class="chip pick ${f===y?"on":""}" data-act="onboard-age" data-age="${y}">${y}</button>`).join("")}</div>
      </div>
      ${wt(o.profile.themes,"Tik een suggestie of typ zelf. Later aan te passen.")}
      <div class="sec-hd">Nu</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">${v??"In Vandaag. Parkeren laat het log staan."}</div>
        ${g.length?g.map(y=>ir(y)).join(""):'<div class="note">Niets in Nu.</div>'}
      </div>
      ${kt(m,"Niet in Vandaag. Terughalen laat het log staan.")}
      ${rr(o.items)}
      ${dr()}
      ${ht()}
      ${l.error?`<p class="error" style="padding:0 18px">${c(l.error)}</p>`:""}
      ${s}`;return}}function Ln(e){const t=fe.get(e);if(t&&window.clearTimeout(t),fe.delete(e),!(e in l.confirmBeats))return;const n={...l.confirmBeats};delete n[e],l.confirmBeats=n}function Za(e){Ln(e),l.confirmBeats={...l.confirmBeats,[e]:Date.now()},fe.set(e,window.setTimeout(()=>{if(fe.delete(e),!(e in l.confirmBeats))return;const t={...l.confirmBeats};delete t[e],l.confirmBeats=t,w()},hn))}function et(e){const t=l.confirmBeats[e.id];if(!t)return null;const n=Date.now()-t;if(n>=hn)return null;const i=K(e),r=Oa({plus:i.plus,done:i.done,skip:i.skip,type:e.type,track:ne(e)});return r?{confirm:r,elapsed:n}:null}function $e(e,t){const n=et(e);return!n||n.confirm.beat!==t?"":` beat-${t}`}function _e(e,t){const n=et(e);return!n||n.confirm.beat!==t?"":` data-confirm="${t}" style="animation-delay:-${n.elapsed}ms"`}function Xa(e){const t=et(e);return t?`<span class="sr-only" role="status" data-confirm="${t.confirm.beat}">${c(t.confirm.text)}</span>`:""}function Qa(e){if(!o)return"";const t=U(o.items);return Xe(Y(o.events,e,t?.id),b())?`<button class="undo" type="button" data-act="undo" data-item="${e.id}">Ongedaan</button>`:""}function tt(e){return`${Xa(e)}${Qa(e)}`}function yt(e){const t=K(e),n=t.logged||!!t.skip,i=e.type==="medicijn"?"Genomen":"Done",r=ve(e);return`
      <div class="card stof">
        ${it(e)}
        ${r?`<div class="note">${c(r)}</div>`:""}
        <div class="actions actions-two">
          <button class="btn ico-btn ${t.done?"track":""}${$e(e,"check")}" data-act="done" data-item="${e.id}" ${n?"disabled":""}${_e(e,"check")}>${h("done")}<span>${i}</span></button>
          <button class="btn ico-btn skip ${t.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${t.logged?"disabled":""}>${h("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||t.skip?`<div class="chips">${me.map(a=>`<button class="chip ${t.skip===a?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${a}">${a}</button>`).join("")}</div>`:""}
        ${jn(t.skip)}
        ${tt(e)}
      </div>`}function er(e,t,n,i){return`<div class="chips">${me.map(r=>`<button class="chip ${n===r?"on":""}" data-act="${i}" data-item="${e}" data-date="${t}" data-reason="${r}">${r}</button>`).join("")}</div>`}function En(e){const t=l.missKey===In(e.item.id,e.date)||!!e.reason;return`
      <div class="miss-row">
        <button class="miss-item" data-act="miss-open" data-item="${e.item.id}" data-date="${e.date}">
          <span class="ex-nm">${c(e.item.label)}</span>
          <span class="note">${e.reason?c(e.reason):z(e.date)}</span>
        </button>
        ${t?er(e.item.id,e.date,e.reason,"miss"):""}
      </div>`}function tr(e){const t=[];return e.hits&&t.push(`${e.hits} gedaan`),e.skips&&t.push(`${e.skips} overgeslagen`),e.misses&&t.push(`${e.misses} niet gedaan`),t.length===0?"Nog geen dagen deze week.":t.join(" · ")}function nr(e){return e==="skip"?"–":e==="miss"?"×":"·"}function bt(e){return`
      <div class="sec-hd">Week</div>
      <div class="card">
        <div class="note" style="margin-top:0">${c(e.range)}</div>
        <div class="week-strip" aria-label="Weekoverzicht">
          ${e.days.map(t=>`<div class="week-day ${t.mark}${t.date===b()?" today":""}">
            <span class="week-lbl">${t.label}</span>
            <span class="week-mark">${nr(t.mark)}</span>
          </div>`).join("")}
        </div>
        <div class="note">${c(tr(e))}</div>
        ${e.note?`<div class="week-note">${c(e.note)}</div>`:""}
        ${e.missRows.length?e.missRows.map(t=>En(t)).join(""):""}
      </div>`}function Mn(e){return ei(e)||q(e)||ie(e)}function Tn(e){return Mn(e)?`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${c(e.label)}</button>`:`<div class="ex-nm">${c(e.label)}</div>`}function nt(e){if(!ie(e))return"";const t=e.weekdays??[];return`
      <div class="weekday-edit">
        <div class="lbl">Dagen</div>
        <div class="chips weekday-chips">
          ${Mt.map(n=>`<button class="chip pick ${t.includes(n.iso)?"on":""}" data-act="weekday-toggle" data-item="${e.id}" data-day="${n.iso}">${n.short}</button>`).join("")}
        </div>
        <div class="note">${t.length?"Alleen op die dagen.":"Leeg = niet op Vandaag."}</div>
      </div>`}function An(e){return`
      <div class="later-block">
        <div class="later-row">
          ${Tn(e)}
          <button class="btn ghost later-now" data-act="later-now" data-item="${e.id}">Nu</button>
        </div>
        ${nt(e)}
      </div>`}function kt(e,t){return`
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">${c(t)}</div>
        ${e.length?e.map(n=>An(n)).join(""):'<div class="note">Niets in Later.</div>'}
      </div>`}function ir(e){const t=e.later,n=mi(e.weekdays),i=t?"Later":"Nu";return`
      <div class="later-block">
        <div class="later-row">
          <div>
            ${Tn(e)}
            <div class="note" style="margin-top:4px">${i}${n?` · ${c(n)}`:""}</div>
          </div>
          <button class="btn ghost later-now" data-act="${t?"later-now":"later-park"}" data-item="${e.id}">${t?"Nu":"Later"}</button>
        </div>
        ${nt(e)}
      </div>`}function ar(e){const t=Ne[Gt(e)],n=Pt(e);return`
      <div class="later-row">
        <div>
          <button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${c(e.label)}</button>
          <div class="note" style="margin-top:4px">${c(t)}${n?` · ${c(n)}`:""}</div>
        </div>
        <button class="btn ghost later-now" data-act="detail-open" data-item="${e.id}">Wijzig</button>
      </div>`}function rr(e){const t=wi(e);return t.length===0?"":`
      <div class="sec-hd">Eigen items</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Label, type of tijd. Weg haalt het uit Vandaag. Log blijft.</div>
        ${t.map(n=>ar(n)).join("")}
      </div>`}function jn(e){if(!o)return"";const t=qi(o.profile.identity_new,o.events,e);return t?`<div class="nudge">${c(t)}</div>`:""}function sr(e){const t=Ui(e.profile.horizon_1y,e.rotated);return t?`<div class="nudge-line">${c(t)}</div>`:""}function or(e){if(!o||!qe(o.profile.identity_constraint,e))return"";const t=Vi(o.profile.identity_constraint);return t?`<div class="check">${c(t)}</div>`:""}function Bn(e){if(!e.suggestedMilestone)return"";const t=C(e.suggestedMilestone),n=l.advanceWarn&&qe(o.profile.identity_constraint,e.suggestedMilestone);return`
        <div class="note" style="margin-top:0">Etappe gehaald. Niet automatisch verder. Voorstel: ${t}.</div>
        ${n?or(e.suggestedMilestone):""}
        ${n?`<div class="stack" style="margin-top:10px">
                 <button class="btn primary" data-act="advance-go">Volgende etappe ${t}</button>
                 <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
               </div>`:`<div class="stack" style="margin-top:10px">
                 <button class="btn primary" data-act="advance" data-n="${e.suggestedMilestone}">Volgende etappe ${t}</button>
               </div>`}`}function lr(e){return e.suggestedMilestone?`
      <div class="card">
        ${Bn(e)}
      </div>`:""}function ht(){return`
      <div class="card stack io-card">
        <button class="btn ghost ico-btn" data-act="export">${h("export")}<span>Exporteer JSON</span></button>
        <div class="note" style="margin-top:4px">Voegt toe. Bestaande rijen blijven.</div>
        <button class="btn ghost ico-btn" data-act="import-pick">${h("import")}<span>Kies bestand</span></button>
        <input data-id="import-file" class="import-file" type="file" accept="application/json,.json" />
        <div class="field">
          <div class="lbl">Of plak JSON</div>
          <textarea data-id="import-paste" placeholder='{"key":"routine_loop_v6"}'>${c(l.importPaste)}</textarea>
        </div>
        <button class="btn ghost ico-btn" data-act="import-go">${h("import")}<span>Importeer JSON</span></button>
      </div>`}function dr(){return`
      <div class="sec-hd">Eigen item</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Label, type, optioneel tijdstip. Geen dosis. Bestaande items blijven.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="item-label" type="text" maxlength="${Ce}" placeholder="Bijv. Avondwandeling" autocomplete="off" enterkeyhint="done" value="${c(l.addLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${je.map(e=>`<button class="chip pick ${l.addKind===e?"on":""}" data-act="item-kind" data-kind="${e}">${Ne[e]}</button>`).join("")}</div>
        <div class="field" style="margin-top:12px">
          <div class="lbl">Tijd</div>
          <input data-id="item-timing" type="text" maxlength="${De}" placeholder="22:00 of ochtend" autocomplete="off" enterkeyhint="done" value="${c(l.addTiming)}" />
        </div>
        <div class="stack">
          <button class="btn primary" data-act="item-add">Voeg toe</button>
        </div>
      </div>`}function cr(e){if(e.length===0)return"";const t=z(e[0].date),n=z(e[e.length-1].date);return t===n?t:`${t} – ${n}`}function ur(e){const i=bn(e.map(s=>s.kg),294,72);if(i.length===0)return"";const r=i.length-1,a=i.map((s,d)=>{const f=d===r;return`<circle class="${f?"prog-dot now":"prog-dot"}" cx="${s.x.toFixed(1)}" cy="${s.y.toFixed(1)}" r="${f?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${kn(i)}" />
          ${a}
        </svg>`}function fr(e){if(e.length===0)return"";const t=e[e.length-1];return`
      <div class="sec-hd">Gewicht</div>
      <div class="card">
        <div class="note" style="margin-top:0">${c(cr(e))}</div>
        ${ur(e)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Laatst</div><div class="val">${t.kg.toFixed(1)} kg</div></div>
        </div>
      </div>`}function mr(e,t,n){const a=bn(e,294,72);if(a.length===0)return'<div class="note">Nog geen lijn.</div>';const s=a.map((d,f)=>{const g=n[f]?.date===t;return`<circle class="${n[f]?.mark==="miss"?"prog-dot miss":g?"prog-dot now":"prog-dot"}" cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${g?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${kn(a)}" />
          ${s}
        </svg>`}function wt(e,t){return`
      <section class="theme-sec" data-sec="themes">
        <div class="sec-hd">Thema's</div>
        <div class="card">
          <div class="ex-nm">Trainingsrichting</div>
          <div class="note">${c(t)}</div>
          ${Qt(e)}
        </div>
      </section>`}function pr(e){if(!o)return"";const t=o.profile.goals??[],n=o.profile.age_band,i=Oi(o.items,t),r=l.startIds,a=`
    <div class="hdr">
      <div>
        ${Sn()}
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
        <div class="chips">${Ge.map(s=>`<button class="chip pick ${n===s?"on":""}" data-act="onboard-age" data-age="${s}">${s}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${n?"":"disabled"}>Verder</button>
        </div>
      </div>`;if(e==="themes"){const s=o.profile.themes??[];return`
      ${a}
      <div class="sec-hd">Thema's</div>
      <div class="card">
        <div class="ex-nm">Trainingsrichting</div>
        <div class="note">Tik een suggestie of typ zelf. Mag leeg. Later aan te passen.</div>
        ${Qt(s)}
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-themes-done">Verder</button>
        </div>
      </div>`}return`
    ${a}
    <div class="sec-hd">Start</div>
    <div class="card">
      <div class="ex-nm">Max ${te} nu</div>
      <div class="note">De rest gaat naar Later. Later blijft zichtbaar.</div>
      <div class="chips">${i.map(s=>`<button class="chip pick ${r.includes(s.id)?"on":""}" data-act="onboard-start" data-item="${s.id}">${c(s.label)}</button>`).join("")}</div>
      <div class="note">${r.length} / ${te} gekozen</div>
      <div class="stack" style="margin-top:16px">
        <button class="btn primary" data-act="onboard-done" ${r.length===0?"disabled":""}>Naar Vandaag</button>
      </div>
    </div>`}function it(e){return Mn(e)?`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${c(e.label)}</button>`:`<div class="ex-nm">${c(e.label)}</div>`}function vr(e){return`<button class="chip pick" data-act="detail-open" data-item="${e.id}">${c(e.label)}</button>`}function gr(e){const t=Ee(e),n=ve(e),i=li(e.timing),r=di(e.timing),a=Rt(e),s=Te(e),d=G(e),f=q(e);return`
      <button class="btn ghost detail-back" data-act="detail-close">Terug</button>
      <div class="sec-hd">Detail</div>
      <div class="card">
        <div class="ex-nm">${c(e.label)}</div>
        ${i?`<div class="note">${c(i)}</div>`:""}
        ${r?`<div class="note">${c(r)}</div>`:""}
        ${n&&!r?`<div class="note">${c(n)}</div>`:""}
        ${a?`<div class="work">${c(a)}</div>`:""}
        ${s?'<div class="note">Voorkeur. Geen regel.</div>':""}
        ${d&&!n&&!i&&!r?'<div class="note">Regel. Geen afvinken.</div>':""}
        ${tt(e)}
        ${nt(e)}
      </div>
      ${t?`<div class="sec-hd">Bron</div>
      <div class="card quiet">
        <div class="src-tag">${c(t)}</div>
      </div>`:""}
      ${f?br(e):kr(e)}
      ${f?yr():""}`}function yr(){return`
      <div class="sec-hd">Wijzig</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Zelfde item. Geen dosis. Log blijft.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="edit-label" type="text" maxlength="${Ce}" placeholder="Naam" autocomplete="off" enterkeyhint="done" value="${c(l.editLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${je.map(e=>`<button class="chip pick ${l.editKind===e?"on":""}" data-act="edit-kind" data-kind="${e}">${Ne[e]}</button>`).join("")}</div>
        <div class="field" style="margin-top:12px">
          <div class="lbl">Tijd</div>
          <input data-id="edit-timing" type="text" maxlength="${De}" placeholder="22:00 of ochtend" autocomplete="off" enterkeyhint="done" value="${c(l.editTiming)}" />
        </div>
        <div class="stack">
          <button class="btn primary" data-act="item-save">Bewaar</button>
          ${l.removeAsk?`<div class="note">Weg uit Vandaag. Log blijft.</div>
          <button class="btn primary" data-act="item-remove">Bevestig</button>
          <button class="btn ghost" data-act="item-remove-cancel">Niet nu</button>`:'<button class="btn ghost" data-act="item-remove-ask">Weg</button>'}
        </div>
      </div>`}function br(e){return e.later?`
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
      </div>`}function kr(e){return Ke(e)?e.later?`
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
      </div>`:""}function hr(e){const t=ve(e);return`
      <div class="card quiet">
        ${it(e)}
        ${t?`<div class="note">${c(t)}</div>`:'<div class="note">Regel. Geen afvinken.</div>'}
      </div>`}function wr(e,t){const n=K(e),i=ne(e),r=n.logged||!!n.skip,a=i&&n.current!==null&&e.b!==null&&n.current>=e.b,s=r||a,d=i,f=Rt(e),g=ve(e),m=d&&t.suggestedMilestone&&e.id===o.vector.id;return`
      <div class="card">
        ${it(e)}
        ${g&&!f&&!i?`<div class="note">${c(g)}</div>`:""}
        ${i?`<div class="track">
          <span class="now">${C(n.current??e.a??0)}</span>
          <span>→</span>
          <span class="mid">${C(e.milestone??0)}</span>
          <span>→</span>
          <span class="end">${C(e.b??0)}</span>
        </div>`:f?`<div class="work">${c(f)}</div>`:""}
        <div class="actions ${i?"":"actions-two"}">
          ${i?`<button class="btn ico-btn ${n.plus?"on":""}${$e(e,"fade")}" data-act="plus" data-item="${e.id}" ${s?"disabled":""}${_e(e,"fade")}>${h("plus")}<span>+1</span></button>`:""}
          <button class="btn ico-btn ${n.done?"track":""}${$e(e,"check")}" data-act="done" data-item="${e.id}" ${r?"disabled":""}${_e(e,"check")}>${h("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${n.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${n.logged?"disabled":""}>${h("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||n.skip?`<div class="chips">${me.map(v=>`<button class="chip ${n.skip===v?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${v}">${v}</button>`).join("")}</div>`:""}
        ${tt(e)}
        ${m?Bn(t):""}
        ${jn(n.skip)}
      </div>`}function C(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function L(e){if(!l.busy){l.busy=!0,l.error=null;try{await e()}catch(t){l.error=t instanceof Error?t.message:"Er ging iets mis"}finally{l.busy=!1,w()}}}async function $r(e){p=e,o=await p.load(),l.screen="vandaag",w()}async function _r(){Ya(),xr(),await $r(qa())}function xr(){document.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const t=e.target;if(t instanceof HTMLInputElement){if(t.dataset.id==="theme-custom"){e.preventDefault(),Kn();return}if(t.dataset.id==="item-label"||t.dataset.id==="item-timing"){e.preventDefault(),Wn();return}if(t.dataset.id==="edit-label"||t.dataset.id==="edit-timing"){e.preventDefault(),On();return}if(t.dataset.id==="weight"){e.preventDefault(),_t(t.value);return}if(t.dataset.id==="wake"){e.preventDefault(),xt(t.value);return}t.dataset.id==="meal"&&(e.preventDefault(),St(t.value))}}),document.addEventListener("change",e=>{const t=e.target;if(t instanceof HTMLInputElement&&(t.dataset.id==="weight"&&_t(t.value),t.dataset.id==="wake"&&xt(t.value),t.dataset.id==="meal"&&St(t.value),t.dataset.id==="import-file"&&t.files?.[0])){const n=t.files[0];t.value="",n.text().then(i=>Nn(i))}}),document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(Pn(n)){l.screen=n,l.skipItemId=null,l.missKey=null,l.detailItemId=null,l.advanceWarn=!1,l.error=null,w();return}Sr(t)})}async function Sr(e){const t=e.dataset.act;if(!t)return;const n=A("import-paste");if(n!==null&&(l.importPaste=n),!p||!o)return;const i=re(),r=b();if(t==="sleep-inc"||t==="sleep-dec"){const a=i.sleep??7,s=Math.max(0,Math.min(14,a+(t==="sleep-inc"?.5:-.5)));await M({date:r,kind:"body_sleep",value:s,skip_reason:null,item_id:null});return}if(t==="energy"){const a=Number(e.dataset.n),s=i.energy===a?null:a;if(s===null)return;await M({date:r,kind:"body_energy",value:s,skip_reason:null,item_id:null});return}if(t==="weight-inc"||t==="weight-dec"){const a=ua(i.weight,ca(o.events),t==="weight-inc"?.1:-.1);if(i.weight===a)return;await M({date:r,kind:"body_weight",value:a,skip_reason:null,item_id:null});return}if(t==="wake-inc"||t==="wake-dec"){const a=ya(i.wake,va(o.events),t==="wake-inc"?15:-15);if(i.wake===a)return;await M({date:r,kind:"body_wake",value:a,skip_reason:null,item_id:null});return}if(t==="meal-inc"||t==="meal-dec"){const a=ba(i.meal,ga(o.events),t==="meal-inc"?15:-15);if(i.meal===a)return;await M({date:r,kind:"body_meal",value:a,skip_reason:null,item_id:null});return}if(t==="plus"){const a=o.items.find(d=>d.id===e.dataset.item);if(!a||!ne(a))return;const s=K(a);if(s.logged||s.skip||a.b!==null&&s.current!==null&&s.current>=a.b)return;await M({date:r,kind:"set",value:(s.current??a.a??0)+1,skip_reason:null,item_id:a.id},a.id);return}if(t==="done"){const a=o.items.find(d=>d.id===e.dataset.item);if(!a)return;const s=K(a);if(s.logged||s.skip)return;await M({date:r,kind:"done",value:s.current??a.a,skip_reason:null,item_id:a.id},a.id);return}if(t==="detail-open"){const a=e.dataset.item??null,s=a?o.items.find(d=>d.id===a):void 0;if(!s)return;Dn(s),l.detailItemId=s.id,w();return}if(t==="detail-close"){l.detailItemId=null,w();return}if(t==="skip-open"){const a=e.dataset.item??null;l.skipItemId=l.skipItemId===a?null:a,w();return}if(t==="skip"){const a=o.items.find(f=>f.id===e.dataset.item);if(!a||K(a).logged)return;const d=e.dataset.reason;if(!at(d))return;await M({date:r,kind:"skip",value:null,skip_reason:d,item_id:a.id}),l.skipItemId=null;return}if(t==="undo"){const a=o.items.find(f=>f.id===e.dataset.item);if(!a)return;const s=U(o.items),d=Xe(Y(o.events,a,s?.id),r);if(!d)return;Ln(a.id),await Ir(d.id),l.skipItemId=null;return}if(t==="miss-open"){const a=e.dataset.item,s=e.dataset.date;if(!a||!s)return;const d=In(a,s);l.missKey=l.missKey===d?null:d,w();return}if(t==="miss"){const a=o.items.find(g=>g.id===e.dataset.item),s=e.dataset.date,d=e.dataset.reason;if(!a||!s||s>=r||!at(d))return;const f=K(a,s);if(f.logged||f.skip)return;await M({date:s,kind:"miss",value:null,skip_reason:d,item_id:a.id}),l.missKey=null;return}if(t==="advance"){if(!i.suggestedMilestone)return;if(qe(o.profile.identity_constraint,i.suggestedMilestone)&&!l.advanceWarn){l.advanceWarn=!0,w();return}await $t(i.suggestedMilestone);return}if(t==="advance-go"){if(!i.suggestedMilestone)return;await $t(i.suggestedMilestone);return}if(t==="advance-cancel"){l.advanceWarn=!1,w();return}if(t==="onboard-goal"){const a=e.dataset.goal;if(!a||!Ut(a))return;const s={...o.profile,goals:Ki(o.profile.goals??[],a)};await L(async()=>{await p.saveProfile(s),o.profile=s});return}if(t==="onboard-age"){const a=e.dataset.age;if(!a||!Yt(a))return;const s={...o.profile,age_band:a};await L(async()=>{await p.saveProfile(s),o.profile=s});return}if(t==="theme-toggle"){const a=e.dataset.theme;if(!a)return;await Se(Yi(O(o.profile.themes),a));return}if(t==="theme-add"){await Kn();return}if(t==="onboard-start"){const a=e.dataset.item;if(!a)return;l.startIds=zi(l.startIds,a),w();return}if(t==="onboard-next"){w();return}if(t==="onboard-themes-done"){await Se(o.profile.themes??[],!0);return}if(t==="onboard-done"){const a=o.profile.age_band,s=o.profile.goals??[];if(!a||s.length===0||l.startIds.length===0)return;await L(async()=>{await p.saveOnboarding({goals:s,age_band:a,startIds:l.startIds}),o=await p.load(),l.screen="vandaag"});return}if(t==="later-now"||t==="later-park"){const a=e.dataset.item;if(!a)return;await L(async()=>{await p.setItemLater(a,t==="later-park"),o=await p.load()});return}if(t==="weekday-toggle"){const a=e.dataset.item,s=Number(e.dataset.day);if(!a||!Number.isInteger(s))return;await L(async()=>{await p.toggleItemWeekday(a,s),o=await p.load()});return}if(t==="item-kind"){const a=e.dataset.kind;if(!lt(a))return;Cn(),l.addKind=a,w();return}if(t==="item-add"){await Wn();return}if(t==="edit-kind"){const a=e.dataset.kind;if(!lt(a))return;xe(),l.editKind=a,w();return}if(t==="item-save"){await On();return}if(t==="item-remove-ask"){xe(),l.removeAsk=!0,w();return}if(t==="item-remove-cancel"){l.removeAsk=!1,w();return}if(t==="item-remove"){const a=l.detailItemId;if(!a)return;await L(async()=>{await p.removeItem(a),o=await p.load(),l.detailItemId=null,l.removeAsk=!1,l.screen="profiel"});return}if(t==="save-ik"){const a={...o.profile,identity_anti:T(A("identity_anti"),x.identity_anti),identity_new:T(A("identity_new"),x.identity_new),identity_constraint:T(A("identity_constraint"),x.identity_constraint),horizon_1y:T(A("horizon_1y"),x.horizon_1y)};await L(async()=>{await p.saveProfile(a),o.profile=a});return}if(t==="export"){Vn(o);return}if(t==="import-pick"){document.querySelector("[data-id=import-file]")?.click();return}if(t==="import-go"){await Nn(l.importPaste);return}}async function Nn(e){const t=e.trim();if(!t){l.error=ee,w();return}await L(async()=>{o=await p.importJson(t),l.importPaste=""})}function Cn(){l.addLabel=A("item-label")??l.addLabel,l.addTiming=A("item-timing")??l.addTiming}function xe(){l.editLabel=A("edit-label")??l.editLabel,l.editTiming=A("edit-timing")??l.editTiming}function Dn(e){l.editLabel=e.label,l.editKind=Gt(e),l.editTiming=Pt(e),l.removeAsk=!1}async function On(){!p||!o||!l.detailItemId||(xe(),await L(async()=>{const e=await p.updateItem({id:l.detailItemId,label:l.editLabel,kind:l.editKind,timing:l.editTiming});o=await p.load(),Dn(e),l.detailItemId=e.id}))}async function Wn(){!p||!o||(Cn(),await L(async()=>{await p.addItem({label:l.addLabel,kind:l.addKind,timing:l.addTiming}),o=await p.load(),l.addLabel="",l.addTiming=""}))}async function Kn(){if(!o)return;const e=A("theme-custom")??"",t=O(o.profile.themes),n=Ji(t,e);n.length===t.length&&n.every((i,r)=>i===t[r])||await Se(n)}async function Se(e,t=!1){if(!p||!o)return;const n=O(e),i={...o.profile,themes:n},r=t||!Ft(o);await L(async()=>{if(r){await p.saveThemes(n),o=await p.load();return}await p.saveProfile(i),o.profile=i})}function A(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function $t(e){await L(async()=>{o.stage=await p.advanceStage(o.stage,e),o.items=o.items.map(t=>t.id===o.stage.vector_id?{...t,milestone:e}:t),o.rotated=!0,l.advanceWarn=!1})}async function M(e,t){await L(async()=>{const n=await p.addEvent(e);o.events.push(n),t&&Za(t)})}async function Ir(e){await L(async()=>{await p.removeEvent(e),o.events=o.events.filter(t=>t.id!==e)})}async function _t(e){if(!p||!o)return;const t=fa(e);t!==null&&re().weight!==t&&await M({date:b(),kind:"body_weight",value:t,skip_reason:null,item_id:null})}async function xt(e){if(!p||!o)return;const t=sn(e);t!==null&&re().wake!==t&&await M({date:b(),kind:"body_wake",value:t,skip_reason:null,item_id:null})}async function St(e){if(!p||!o)return;const t=ka(e);t!==null&&re().meal!==t&&await M({date:b(),kind:"body_meal",value:t,skip_reason:null,item_id:null})}_r();
