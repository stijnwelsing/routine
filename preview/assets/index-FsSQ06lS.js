(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const ue=["geen tijd","geen energie","vergeten","geen zin","pijn"];function tt(e){return!!(e&&ue.includes(e))}const An=["guideline","evidence-informed","public-framework","user preference","hypothesis"],jn=["vandaag","koers","voortgang","profiel"];function Bn(e){return!!(e&&jn.includes(e))}const w={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},fe="routine_loop_v6",wt=["routine_loop_v5","routine_loop_v4","routine_loop_v3"],nt="routine_local_user_id",it="routine_local_tenant_id",Cn="routine_local_chosen";function Nn(e){return JSON.stringify({exported_at:new Date().toISOString(),key:fe,profile:e.profile,items:e.items,vector:e.vector,stage:e.stage,events:e.events,rotated:e.rotated,onboarded:e.onboarded,theme_step:e.theme_step},null,2)}function Dn(e){const t=new Blob([Nn(e)],{type:"application/json"}),n=URL.createObjectURL(t),i=document.createElement("a");i.href=n,i.download=`routine-${e.profile.id.slice(0,8)}.json`,i.click(),URL.revokeObjectURL(n)}const $t=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],_t=["zo","ma","di","wo","do","vr","za"];function y(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${i}`}function D(e,t){const n=K(e);return n.setDate(n.getDate()+t),y(n)}function K(e){const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)}function On(e){const t=K(e);return`${_t[t.getDay()]} ${t.getDate()} ${$t[t.getMonth()]}`}function G(e){const t=K(e);return`${t.getDate()} ${$t[t.getMonth()]}`}function Kn(e){return _t[K(e).getDay()]}function Rn(e){const t=K(e).getDay();return t===0?7:t}function xe(e){const t=K(e),n=t.getDay(),i=n===0?-6:1-n;return t.setDate(t.getDate()+i),y(t)}function Se(e,t){const n=[];let i=e;for(;i<=t;)n.push(i),i=D(i,1);return n}function W(){return crypto.randomUUID()}function zn(){return new Date().toISOString()}function Gn(e){return e.trim().toLowerCase().normalize("NFC")}function Wn(e){return!!(e&&An.includes(e))}function Pn(e){const t=Gn(e);return t==="cafeïne 90 min na opstaan"?"public-framework":t==="wandelen na eten"?"evidence-informed":t==="low carb"||t==="scherm uit 22:00"||t==="korte rust"?"user preference":t==="vitamine d"?"guideline":t==="koud douchen"?"hypothesis":null}function Le(e){return Pn(e.label)??(Wn(e.template)?e.template:null)}function xt(e){return Le(e)!==null}function ae(){return{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:null,condition:null}}function qn(e){return{mode:e?.mode??null,clock:e?.clock??null,anchor:e?.anchor??null,offset_min:e?.offset_min??null,window_min:e?.window_min??null,frequency:e?.frequency??null,condition:e?.condition??null}}function St(e){return e.trim().toLowerCase().normalize("NFC")}function Hn(e){return St(e)==="korte rust"?{mode:"clock",clock:"08:00",window_min:840,frequency:"daily",condition:"body"}:null}function Fn(e,t){const n=Hn(t);return n?{...e,...n}:e}function Lt(e){return{now:e.now??new Date,today:e.today,wakeAt:e.wakeAt??null,mealAt:e.mealAt??null,sleepSet:!!e.sleepSet,energySet:!!e.energySet}}function Ie(e){const t=e?.trim().toLowerCase();return t==="body"||t==="energy|sleep"?"body":t==="energy"?"energy":t==="sleep"?"sleep":null}function Vn(e,t){const n=Ie(e.condition);if(!n)return!0;const i=!!t.sleepSet,r=!!t.energySet;return n==="energy"?r:n==="sleep"?i:i||r}function It(e,t){const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(!n)return null;const i=Number(n[1]),r=Number(n[2]);if(i>23||r>59)return null;const a=K(e);return a.setHours(i,r,0,0),a}function Un(e,t){return e==="wake"?t.wakeAt:e==="meal"?t.mealAt:null}function Yn(e,t){if(e.mode==="clock"&&e.clock)return It(t.today,e.clock);if(e.mode==="relative"&&e.anchor&&e.offset_min!==null){const n=Un(e.anchor,t);return n?new Date(n.getTime()+e.offset_min*6e4):null}return null}function Et(e,t){return!t||e.window_min===null?null:new Date(t.getTime()+e.window_min*6e4)}function Mt(e,t){if(e.timing.frequency==="weekly"||e.type==="weekly"){const i=e.weekdays??[];return i.length===0?!1:i.includes(Rn(t))}return!0}function P(e){return Me(e)==="constraint"}function Ee(e){return Me(e)==="preference"}function Tt(e){return!P(e)&&!Ee(e)}function Jn(e,t){if(P(e))return"silent";if(!Mt(e,t.today)||!Vn(e.timing,t))return"hidden";const n=e.timing;if(!n.mode)return"due";const i=Yn(n,t);if(n.mode==="relative"&&!i)return"due";if(i&&t.now<i)return"wait";const r=Et(n,i);return r&&t.now>r?"closed":"due"}function re(e,t){const n=Jn(e,t);return!(n==="hidden"||n==="closed"||n==="wait"&&e.timing.window_min!==null)}function at(e){return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`}function Zn(e){if(e.window_min===null)return null;if(e.mode==="clock"&&e.clock){const t=It("2000-01-01",e.clock);if(!t)return null;const n=Et(e,t);return n?`${at(t)}–${at(n)}`:null}return`${e.window_min} min`}function Xn(e){const t=Ie(e.condition);return t==="body"?"na slaap of energie":t==="energy"?"na energie":t==="sleep"?"na slaap":null}function me(e){const t=e.timing;return Ie(t.condition)?null:t.condition?t.condition:t.mode==="relative"&&t.anchor==="wake"&&t.offset_min!==null?`${t.offset_min} min na opstaan`:t.mode==="relative"&&t.anchor==="meal"&&t.offset_min!==null?t.offset_min===0?"na eten":`${t.offset_min} min na eten`:t.mode==="relative"&&t.anchor==="meal"?"na eten":t.mode==="clock"&&t.clock?t.clock:null}function Me(e){if(e.role)return e.role;const t=St(e.label);return t==="low carb"?"preference":t==="cafeïne 90 min na opstaan"||t==="scherm uit 22:00"?"constraint":null}const Te=["gedrag","regel","medicijn","supplement","sociaal"],Ae={gedrag:"gedrag",regel:"leefregel",medicijn:"medicijn",supplement:"supplement",sociaal:"sociaal"},je={gedrag:"Gedrag",regel:"Regel",medicijn:"Medicijn",supplement:"Supplement",sociaal:"Sociaal"},Be=40,Ce=40;function rt(e){return!!(e&&Te.includes(e))}function te(e){return e.a!==null&&e.b!==null&&e.milestone!==null}function Qn(e,t){return Mt(e,t)}function ei(e,t){return{...e,tenant_id:e.tenant_id??t,weekdays:e.weekdays??null,times_per_week:e.times_per_week??null,timing:Fn(qn(e.timing),e.label),role:Me(e),template:Le(e),later:!!e.later,removed:!!e.removed}}function Ne(e){return e.type==="medicijn"||e.type==="supplement"}function At(e){return e.type==="sociaal"}function jt(e,t){return V(e,t).filter(n=>Tt(n)&&!Ne(n)&&!At(n)&&!n.later)}function ti(e,t){return V(e,t).filter(n=>Ee(n)&&!n.later)}function ni(e,t){return V(e,t).filter(n=>P(n)&&!n.later)}function Bt(e,t){return V(e,t).filter(n=>Ne(n)&&!n.later)}function Ct(e,t){return V(e,t).filter(n=>At(n)&&!n.later)}function ii(e,t){return V(e,t).filter(n=>n.later&&(Tt(n)||P(n)))}function V(e,t){return e.filter(n=>!n.removed&&Qn(n,t)).sort((n,i)=>n.sort-i.sort)}function U(e){return e.find(te)}function ye(e){return e.kind==="body_sleep"||e.kind==="body_energy"||e.kind==="body_weight"||e.kind==="body_wake"||e.kind==="body_meal"}function Y(e,t,n){return e.filter(i=>ye(i)?!1:!!(i.item_id===t.id||i.item_id===null&&n&&t.id===n))}function ai(e,t){return t?[...e.filter(ye),...Y(e,t,t.id)]:e.filter(ye)}function Nt(e){return e.a===null?null:e.unit==="sec"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} s`:e.unit==="reps"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} reps`:String(e.a)}function I(e){return e.trim().toLowerCase()}function q(e){const t=e.trim().replace(/\s+/g," ").slice(0,Be);return t.length>0?t:null}function De(e){const t=e.trim().replace(/\s+/g," ").slice(0,Ce);if(!t)return ae();const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(n){const i=Number(n[1]),r=Number(n[2]);if(i<=23&&r<=59)return{...ae(),mode:"clock",clock:`${String(i).padStart(2,"0")}:${n[2]}`,frequency:"daily"}}return{...ae(),frequency:"daily",condition:t}}function ri(e){return e.reduce((t,n)=>Math.max(t,n.sort),-1)+1}const si=["Push-ups","Squats","Plank","Dead hang","Gerichte kracht","Koud douchen","Niet snoepen","Low carb","Intermittent fasting","Geen alcohol","Cafeïne 90 min na opstaan","Wandelen na eten","Medicijn ochtend","Vitamine D","Bellen met iemand","Iemand zien","Scherm uit 22:00","Korte rust"];function pe(e){const t=I(e);return si.some(n=>I(n)===t)}function Oe(e){return pe(e.label)}function R(e){return!Oe(e)}function H(e){return!!e.removed}function oi(e){return e.filter(t=>R(t)&&!H(t)).sort((t,n)=>t.sort-n.sort)}function Dt(e){return e.type==="leefregel"?"regel":e.type==="medicijn"?"medicijn":e.type==="supplement"?"supplement":e.type==="sociaal"?"sociaal":"gedrag"}function Ot(e){return e.timing.mode==="clock"&&e.timing.clock?e.timing.clock:e.timing.condition??""}function li(e,t){const n=q(t);return n?!e.some(i=>!H(i)&&I(i.label)===I(n)):!1}function di(e,t,n){const i=q(n);return!i||pe(i)?!1:!e.some(r=>r.id!==t&&!H(r)&&I(r.label)===I(i))}function ci(e,t){const n=q(t);if(n)return e.find(i=>H(i)&&R(i)&&I(i.label)===I(n))}function ui(e){const t=q(e.label);return t?{id:W(),tenant_id:e.tenantId,type:Ae[e.kind],label:t,unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:e.sort,timing:De(e.timing??""),role:"action",template:"user preference",later:!!e.later,removed:!1}:null}function fi(e,t){if(!R(e)||H(e))return null;const n=q(t.label);return!n||pe(n)?null:{...e,type:Ae[t.kind],label:n,timing:De(t.timing??""),template:"user preference"}}function mi(e,t){if(!R(e)||!H(e))return null;const n=q(t.label);return!n||pe(n)?null:{...e,type:Ae[t.kind],label:n,timing:De(t.timing??""),template:"user preference",later:!1,removed:!1}}function pi(e){return H(e)?{item:e,mode:"removed"}:R(e)?{item:{...e,removed:!0},mode:"removed"}:Oe(e)?{item:{...e,later:!0},mode:"parked"}:null}function vi(e){const t=new Set,n=[];for(const i of e){const r=I(i.label);t.has(r)||(t.add(r),n.push(i))}return n}function Ke(e,t,n){const i=vi(e),r=new Set(i.map(s=>I(s.label))),a=t.filter(s=>!r.has(I(s.label))).map(s=>({...s,tenant_id:n}));return[...i,...a]}function Kt(e){const t=new Map;for(const n of e)for(const i of n)t.has(i.id)||t.set(i.id,i);return[...t.values()].sort((n,i)=>n.created_at.localeCompare(i.created_at))}function gi(e){return e?!!(e.identity_anti||e.identity_new||e.identity_constraint||e.horizon_1y||e.display_name):!1}function yi(e,t,n,i){if(e.length===0)return null;const r=e.reduce((u,v)=>(v.events?.length??0)>(u.events?.length??0)?v:u),a=e.find(u=>gi(u.profile))?.profile??r.profile,s=Ke([r,...e.filter(u=>u!==r)].flatMap(u=>u.items??[]),t,i),d=new Map(s.map(u=>[I(u.label),u.id])),m=new Map;for(const u of e)for(const v of u.items??[]){const E=d.get(I(v.label));E&&v.id!==E&&m.set(v.id,E)}const g=Kt(e.map(u=>u.events??[])).map(u=>{if(!u.item_id)return u;const v=m.get(u.item_id);return v?{...u,item_id:v}:u});return{...r,profile:{...a,id:a.id||n,tenant_id:a.tenant_id||i},items:s,events:g}}const oe=3,Re=[{id:"kracht",label:"Kracht"},{id:"eten",label:"Eten & drinken"},{id:"slaap",label:"Slaap"},{id:"stofjes",label:"Stofjes"},{id:"bewegen",label:"Bewegen"}],ze=["18–29","30–39","40–49","50–59","60+"],bi={kracht:["Push-ups","Squats","Plank","Dead hang"],eten:["Niet snoepen","Low carb","Intermittent fasting","Geen alcohol"],slaap:["Koud douchen"],stofjes:["Medicijn ochtend","Vitamine D"],bewegen:["Wandelen na eten"]};function Ge(e){return P(e)||e.type==="weekly"?!1:e.type==="daily"||e.type==="leefregel"||e.type==="gedrag"||e.type==="sociaal"||Ne(e)}function ki(e){return e.filter(t=>t.removed?!1:Ge(t)?!0:P(t)&&t.later).sort((t,n)=>t.sort-n.sort)}function Rt(e){return!(e.onboarded!==!1||(e.events??[]).length>0)}function hi(e){return Rt(e)?e.profile.goals?.length?e.profile.age_band?e.theme_step!==!0?"themes":"start":"age":"goals":null}function wi(e,t){const n=e.filter(Ge).sort((a,s)=>a.sort-s.sort);if(t.length===0)return n;const i=new Set(t.flatMap(a=>bi[a]??[])),r=n.filter(a=>i.has(a.label));return r.length>0?r:n}function $i(e,t){const n=new Set(t.slice(0,oe));return e.map(i=>Ge(i)?{...i,later:!n.has(i.id)}:{...i,later:!1})}function _i(e,t){return e.includes(t)?e.filter(n=>n!==t):[...e,t]}function xi(e,t){return e.includes(t)?e.filter(n=>n!==t):e.length>=oe?e:[...e,t]}function zt(e){return Re.some(t=>t.id===e)}function Gt(e){return ze.includes(e)}const Wt="geen zin",$={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140},Si="Zet een 1-jaars B.";function T(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function Li(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===Wt).length}function Ii(e,t){const n=T(e,$.identity_new);return!n||Li(t)<2?null:n}function Ei(e,t,n){return n!==Wt?null:Ii(e,t)}function Mi(e){return!!T(e,$.identity_constraint)}function We(e,t){return t==null?!1:Mi(e)}function Ti(e){const t=T(e,$.identity_constraint);return t?`Check: ${t}.`:null}function Ai(e,t){return t&&!T(e,$.horizon_1y)}function ji(e,t){return Ai(e,t)?Si:null}function Pt(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const st=["Military calisthenics","Kickbox","Spinnen"],qt=40;function Pe(e){const t=e.trim().replace(/\s+/g," ").slice(0,qt);return t.length>0?t:null}function O(e){if(!Array.isArray(e))return[];const t=new Set,n=[];for(const i of e){if(typeof i!="string")continue;const r=Pe(i);if(!r)continue;const a=r.toLowerCase();t.has(a)||(t.add(a),n.push(r))}return n}function Bi(e,t){const n=Pe(t);if(!n)return e;const i=n.toLowerCase();return e.some(r=>r.toLowerCase()===i)?e.filter(r=>r.toLowerCase()!==i):[...e,n]}function Ci(e,t){const n=Pe(t);if(!n)return e;const i=n.toLowerCase();return e.some(r=>r.toLowerCase()===i)?e:[...e,n]}function Ni(e){const n=O(e).filter(i=>!st.some(r=>r.toLowerCase()===i.toLowerCase()));return[...st,...n]}function ot(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function Ht(e){const t=new Set(O(e).map(i=>i.toLowerCase()));return`<div class="chips">${Ni(e).map(i=>`<button class="chip pick ${t.has(i.toLowerCase())?"on":""}" data-act="theme-toggle" data-theme="${ot(i)}">${ot(i)}</button>`).join("")}</div>
        <div class="theme-add">
          <input data-id="theme-custom" type="text" maxlength="${qt}" placeholder="Eigen thema" autocomplete="off" enterkeyhint="done" />
          <button class="btn ghost" data-act="theme-add">Voeg toe</button>
        </div>`}const ee="Ongeldig bestand. Geen Routine-export.";function le(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Di(e){return e==null||e===fe?!0:wt.includes(String(e))}function Oi(e){return le(e)&&typeof e.id=="string"&&e.id.length>0&&typeof e.label=="string"}function Ki(e){return le(e)&&typeof e.id=="string"&&e.id.length>0&&typeof e.date=="string"&&typeof e.kind=="string"}function lt(e){return e.trim().toLowerCase()}function Q(e,t){const n=e?.trim();if(n)return e??n;const i=t?.trim();return i?t??i:null}function Ri(e,t){const n=[],i=new Set;for(const r of[e,t].flatMap(a=>Array.isArray(a)?a:[]))typeof r!="string"||!zt(r)||i.has(r)||(i.add(r),n.push(r));return n}function zi(e,t,n){const i=new Map(t.map(a=>[lt(a.label),a.id])),r=new Map;for(const a of n){const s=i.get(lt(a.label));s&&a.id!==s&&r.set(a.id,s)}return e.map(a=>{if(!a.item_id)return a;const s=r.get(a.item_id);return s?{...a,item_id:s}:a})}function Gi(e){let t;try{t=JSON.parse(e)}catch{throw new Error(ee)}if(!le(t)||!Di(t.key))throw new Error(ee);if(!le(t.profile)||!Array.isArray(t.items)||!Array.isArray(t.events))throw new Error(ee);if(!t.items.every(Oi)||!t.events.every(Ki))throw new Error(ee);return{profile:t.profile,items:t.items,events:t.events,onboarded:typeof t.onboarded=="boolean"?t.onboarded:void 0,theme_step:typeof t.theme_step=="boolean"?t.theme_step:void 0}}function Wi(e,t){return{...e,display_name:Q(e.display_name,t.display_name),identity_anti:T(Q(e.identity_anti,t.identity_anti),$.identity_anti),identity_new:T(Q(e.identity_new,t.identity_new),$.identity_new),identity_constraint:T(Q(e.identity_constraint,t.identity_constraint),$.identity_constraint),horizon_1y:T(Q(e.horizon_1y,t.horizon_1y),$.horizon_1y),age_band:e.age_band??(t.age_band&&Gt(t.age_band)?t.age_band:null),goals:Ri(e.goals,t.goals),themes:O([...e.themes??[],...t.themes??[]])}}function Pi(e,t){const n=e.profile.tenant_id,i=Ke(e.items,t.items,n),r=zi(t.events,i,t.items).map(a=>({...a,tenant_id:n,user_id:e.profile.id}));return{...e,profile:Wi(e.profile,t.profile),items:i,events:Kt([e.events,r]),onboarded:!!(e.onboarded||t.onboarded),theme_step:!!(e.theme_step||t.theme_step)}}const qi=2,Hi=6;function J(e,t){return e.created_at.localeCompare(t.created_at)}function Z(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(J).at(-1)}function Ft(e,t){return t.filter(i=>i.kind==="set").sort(J).at(-1)?.value??e}function qe(e,t){return Z(e,t,"body_sleep")?.value??null}function He(e,t){return Z(e,t,"body_energy")?.value??null}const Vt=40,Ut=250,Fi=80;function Vi(e,t){return Z(e,t,"body_weight")?.value??null}function Ui(e){return e.filter(t=>t.kind==="body_weight"&&t.value!==null).sort(J).at(-1)?.value??null}function Yi(e,t,n){return Math.round(Math.max(Vt,Math.min(Ut,(e??t??Fi)+n))*10)/10}function Ji(e){const t=e.trim().replace(",",".");if(!t)return null;const n=Number(t);return Number.isFinite(n)?Math.round(Math.max(Vt,Math.min(Ut,n))*10)/10:null}const ve=0,ge=1439,Zi=420,Xi=780;function Fe(e){return e==null||!Number.isFinite(e)?null:Math.max(ve,Math.min(ge,Math.round(e)))}function Yt(e,t){return Fe(e.filter(n=>n.kind===t&&n.value!==null).sort(J).at(-1)?.value)}function Ve(e,t){return Fe(Z(e,t,"body_wake")?.value)}function Qi(e){return Yt(e,"body_wake")}function Ue(e,t){return Fe(Z(e,t,"body_meal")?.value)}function ea(e){return Yt(e,"body_meal")}function Jt(e,t,n,i){return Math.max(ve,Math.min(ge,(e??t??i)+n))}function ta(e,t,n){return Jt(e,t,n,Zi)}function na(e,t,n){return Jt(e,t,n,Xi)}function Zt(e){const t=e.trim();if(!t)return null;const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(!n)return null;const i=Number(n[1]),r=Number(n[2]);return i>23||r>59?null:i*60+r}const ia=Zt;function Xt(e){const t=Math.max(ve,Math.min(ge,Math.round(e))),n=Math.floor(t/60),i=t%60;return`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}`}const aa=Xt;function Ye(e,t){if(t===null)return null;const[n,i,r]=e.split("-").map(Number);if(!n||!i||!r)return null;const a=new Date(n,i-1,r),s=Math.max(ve,Math.min(ge,Math.round(t)));return a.setHours(Math.floor(s/60),s%60,0,0),a}const Qt=Ye;function ra(e){return e==="set"||e==="done"||e==="skip"}function en(e,t){return e.date===t&&ra(e.kind)}function Je(e,t){return e.filter(n=>en(n,t)).sort(J).at(-1)}function ne(e,t){return Je(e,t)}function tn(e,t){const n=ne(e,t);return n?.kind==="skip"?n.skip_reason:null}function nn(e,t){return ne(e,t)?.kind==="done"}function an(e,t){return ne(e,t)?.kind==="set"}function rn(e,t){const n=ne(e,t);return n?.kind==="set"||n?.kind==="done"}function sa(e,t){return e!==null&&e<Hi||t!==null&&t<=qi}function oa(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const i=Math.max(1,Math.ceil(n/2));return Math.min(t,e+i)}function de(e,t,n,i){if(t<i)return"empty";const r=ne(e,t);return r?.kind==="done"||r?.kind==="set"?"done":r?.kind==="skip"?"skip":Z(e,t,"miss")?"miss":t>=n?"empty":"miss"}function la(e,t,n="1970-01-01"){let i=0,r=t;for(let a=0;a<400;a+=1){const s=de(e,r,t,n);if(s==="done")i+=1;else if(s==="skip"||s==="empty"&&r===t){r=D(r,-1);continue}else break;r=D(r,-1)}return i}function da(e,t,n){const i=xe(t),r=!n||n<i?i:n;let a=0,s=0;for(const d of Se(r,t)){const m=de(e,d,t,n??r);m==="skip"||m==="empty"||(s+=1,m==="done"&&(a+=1))}return{hits:a,eligible:s}}function ca(e,t,n="1970-01-01",i=3){const r=de(e,t,t,n);if(r==="done"||r==="skip")return!1;const a=D(t,-1);if(a<n)return!1;const s=D(t,-i),d=n>s?n:s;return Se(d,a).some(m=>de(e,m,t,n)==="miss")}function ua(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled&&!e.todayLogged?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function fa(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${dt(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${dt(e.milestone)}.`}function dt(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function sn(e,t,n){return t.filter(r=>r.kind==="set"&&r.date<=n).sort(J).at(-1)?.value??e}function ma(e,t,n,i){const r=Ft(e.a,n),a=qe(n,i),s=He(n,i),d=Vi(n,i),m=Ve(n,i),g=Ue(n,i),u=nn(n,i),v=an(n,i),E=rn(n,i),j=tn(n,i),B=sa(a,s),C=r>=t.milestone,c=r>=e.b,b=ca(n,i,t.started_on),x=xe(i),X=sn(e.a,n,D(x,-1)),Tn=ua({current:r,weekStartCurrent:X,gearDown:B,stalled:b,milestoneHit:C,todayLogged:v||u||!!j});return{current:r,sleep:a,energy:s,weight:d,wake:m,meal:g,doneToday:u,plusToday:v,setLoggedToday:E,skipToday:j,gearDown:B,milestoneHit:C,atB:c,trend:Tn,hitrate:da(n,i,t.started_on),streak:la(n,i,t.started_on),nextAction:fa({milestone:t.milestone,b:e.b,gearDown:B,milestoneHit:C,atB:c,stalled:b,doneToday:u,plusToday:v,skipToday:j}),suggestedMilestone:C&&!c&&!B?oa(t.milestone,e.b):null}}function pa(e,t,n,i){return Y(e,t,n).some(r=>(r.kind==="set"||r.kind==="done"||r.kind==="skip"||r.kind==="miss")&&r.date<i)}function on(e,t){return e.created_at.localeCompare(t.created_at)}function va(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(on).at(-1)}function ga(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip"||n.kind==="miss")).sort(on).at(-1)}function ya(e,t=[]){const n=K(e);return n.setHours(12,0,0,0),Lt({today:e,now:n,wakeAt:Ye(e,Ve(t,e)),mealAt:Qt(e,Ue(t,e)),sleepSet:qe(t,e)!==null,energySet:He(t,e)!==null})}function be(e,t,n=[]){const i=ya(t,n);return[...jt(e,t),...Bt(e,t),...Ct(e,t)].filter(r=>re(r,i))}function ke(e,t,n,i,r){const a=Y(e,t,r),s=ga(a,n);if(s?.kind==="set"||s?.kind==="done")return{item:t,date:n,mark:"hit",reason:null};if(s?.kind==="skip")return{item:t,date:n,mark:"skip",reason:s.skip_reason};const d=s?.kind==="miss"?s:va(a,n,"miss");return d?{item:t,date:n,mark:"miss",reason:d.skip_reason}:n>=i?{item:t,date:n,mark:"open",reason:null}:{item:t,date:n,mark:"idle",reason:null}}function ln(e,t,n,i){const r=D(n,-1);return be(e,r,t).filter(a=>pa(t,a,i,r)).map(a=>{const s=ke(t,a,r,n,i);return s.mark==="hit"||s.mark==="skip"||s.mark==="miss"?s:{...s,mark:"miss",reason:null}}).filter(a=>a.mark==="miss"&&!a.reason)}function ba(e,t,n){return e.some(i=>i.mark==="hit")?"hit":e.some(i=>i.mark==="miss")?"miss":e.some(i=>i.mark==="skip")?"skip":t===n?"open":"idle"}function dn(e,t,n,i){const r=xe(n),a=D(r,6),s=ln(e,t,n,i),d=new Set(s.map(c=>`${c.item.id}:${c.date}`)),m=Se(r,a).map(c=>{const b=be(e,c,t).map(x=>{const X=ke(t,x,c,n,i);return d.has(`${x.id}:${c}`)?{...X,mark:"miss",reason:X.reason}:X});return{date:c,label:Kn(c),mark:ba(b,c,n),hits:b.filter(x=>x.mark==="hit").length,misses:b.filter(x=>x.mark==="miss").length,skips:b.filter(x=>x.mark==="skip").length}}),g=m.filter(c=>c.date<n),u=g.reduce((c,b)=>c+b.hits,0),v=g.reduce((c,b)=>c+b.misses,0),E=g.reduce((c,b)=>c+b.skips,0),j=g.flatMap(c=>be(e,c.date,t).map(b=>{const x=ke(t,b,c.date,n,i);return d.has(`${b.id}:${c.date}`)?{...x,mark:"miss",reason:x.reason}:x}).filter(b=>b.mark==="miss")),B=g.filter(c=>c.mark!=="idle").length,C=u>0&&v===0&&B>=2?"Week staat.":null;return{start:r,end:a,range:`${G(r)} – ${G(a)}`,days:m,hits:u,misses:v,skips:E,missRows:j,note:C}}function se(e){return U(e)?.id}function ct(e,t){return e.created_at.localeCompare(t.created_at)}function ka(e,t){const n=new Map;for(const i of[...e].sort(ct))i.kind!=="body_weight"||i.value===null||i.date>t||n.set(i.date,i);return[...n.values()].sort((i,r)=>i.date.localeCompare(r.date)||ct(i,r)).map(i=>({date:i.date,kg:i.value}))}function ha(e,t,n,i,r){const a=dn(e,t,n,r??se(e)),s=a.days.map(d=>({date:d.date,label:d.label,current:sn(i,t,d.date<=n?d.date:n),mark:d.mark}));return{week:a,line:s,weight:ka(t,n),hits:a.hits,skips:a.skips,misses:a.misses}}function cn(e,t,n,i=18,r=16){if(e.length===0)return[];const a=Math.min(...e),d=Math.max(...e)-a,m=t-i*2,g=n-r*2;return e.map((u,v)=>{const E=e.length===1?t/2:i+v/(e.length-1)*m,j=d===0?n/2:r+(1-(u-a)/d)*g;return{x:E,y:j}})}function un(e){return e.map(t=>`${t.x.toFixed(1)},${t.y.toFixed(1)}`).join(" ")}const fn=1080;function wa(e){return e.skip?null:e.plus?{text:"Set gedaan.",tone:"fog",beat:"fade"}:e.done?e.type==="medicijn"?{text:"Genomen.",tone:"sage",beat:"check"}:e.track?{text:"Set staat.",tone:"sage",beat:"check"}:{text:"Staat.",tone:"sage",beat:"check"}:null}function mn(e,t){return{id:e,tenant_id:t,display_name:null,...Pt(),age_band:null,goals:[],themes:[]}}function pn(e,t,n=y()){return{id:W(),tenant_id:t,vector_id:e,milestone:w.milestone,started_on:n,deadline:D(n,w.windowDays),status:"active",stage_type:w.stageType}}function Ze(e){const t=n=>({id:W(),tenant_id:e,timing:ae(),role:null,template:null,later:!1,...n});return[t({type:"daily",label:"Push-ups",unit:"reps",a:w.a,b:w.b,milestone:w.milestone,weekdays:null,times_per_week:null,sort:0}),t({type:"daily",label:"Squats",unit:"reps",a:30,b:null,milestone:null,weekdays:null,times_per_week:null,sort:1}),t({type:"daily",label:"Plank",unit:"sec",a:60,b:null,milestone:null,weekdays:null,times_per_week:null,sort:2}),t({type:"daily",label:"Dead hang",unit:"sec",a:45,b:null,milestone:null,weekdays:null,times_per_week:null,sort:3}),t({type:"weekly",label:"Gerichte kracht",unit:null,a:null,b:null,milestone:null,weekdays:[],times_per_week:2,sort:4}),t({type:"leefregel",label:"Koud douchen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:5,template:"hypothesis"}),t({type:"leefregel",label:"Niet snoepen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:6}),t({type:"leefregel",label:"Low carb",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:7,role:"preference",template:"user preference"}),t({type:"leefregel",label:"Intermittent fasting",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:8}),t({type:"leefregel",label:"Geen alcohol",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:9}),t({type:"gedrag",label:"Cafeïne 90 min na opstaan",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:10,role:"constraint",template:"public-framework",timing:{mode:"relative",clock:null,anchor:"wake",offset_min:90,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Wandelen na eten",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:11,role:"action",template:"evidence-informed",timing:{mode:"relative",clock:null,anchor:"meal",offset_min:0,window_min:null,frequency:"daily",condition:"na eten"}}),t({type:"medicijn",label:"Medicijn ochtend",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:12,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"ochtend"}}),t({type:"supplement",label:"Vitamine D",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:13,role:"action",template:"guideline",timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Bellen met iemand",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:14,role:"action",template:null,timing:{mode:"clock",clock:"18:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Iemand zien",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:1,sort:15,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"deze week"}}),t({type:"gedrag",label:"Scherm uit 22:00",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:16,role:"constraint",template:"user preference",timing:{mode:"clock",clock:"22:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Korte rust",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:17,role:"action",template:"user preference",timing:{mode:"clock",clock:"08:00",anchor:null,offset_min:null,window_min:840,frequency:"daily",condition:"body"}})]}function $a(e,t){return{id:e.id,tenant_id:e.tenant_id,user_id:t,domain:w.domain,a:e.a??w.a,b:e.b??w.b,unit:e.unit==="sec"?"sec":"reps",pace_constraint:null}}function _a(e,t=y(),n=W()){const i=mn(e,n),r=Ze(n),a=U(r)??r[0],s=$a(a,e),d=pn(s.id,n,t);return a.milestone!==null&&(d.milestone=a.milestone),{profile:i,items:r,vector:s,stage:d,events:[],rotated:!1,onboarded:!1,theme_step:!1}}function vn(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,items:e.items.map(n=>te(n)?{...n,a:w.a,b:w.b,milestone:w.milestone,unit:w.unit}:n),vector:{...e.vector,a:w.a,b:w.b,unit:w.unit},stage:{...e.stage,milestone:w.milestone},events:e.events}:e}function xa(){const e=localStorage.getItem(nt);if(e)return e;const t=W();return localStorage.setItem(nt,t),t}function Sa(){const e=localStorage.getItem(it);if(e)return e;const t=W();return localStorage.setItem(it,t),t}function _(e){localStorage.setItem(fe,JSON.stringify(e))}function La(e){if(!e)return null;try{const t=JSON.parse(e);return!t||typeof t!="object"?null:t}catch{return null}}function Ia(){return[fe,...wt].map(e=>La(localStorage.getItem(e))).filter(e=>e!==null)}function gn(e,t,n){const i=Ke(e.items??[],Ze(n),n).map(r=>ei(r,n));return{...e,profile:{...mn(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...Pt(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null,age_band:e.profile?.age_band??null,goals:Array.isArray(e.profile?.goals)?e.profile.goals:[],themes:O(e.profile?.themes)},items:i,vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(r=>({...r,tenant_id:r.tenant_id??n,item_id:r.item_id??null})),rotated:!!e.rotated,onboarded:e.onboarded??!0,theme_step:e.theme_step??!1}}function S(e,t){const n=Ia();if(n.length===0){const a=_a(e,y(),t);return _(a),a}const i=yi(n,Ze(t),e,t)??n[0],r=vn(gn(i,e,t));return _(r),r}function Ea(){localStorage.setItem(Cn,"1");const e=xa(),t=Sa();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return S(e,t)},async addEvent(n){const i=S(e,t),r={id:n.id??W(),tenant_id:t,user_id:e,item_id:n.item_id??null,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:zn()};return i.events.push(r),_(i),r},async removeEvent(n){const i=S(e,t),r=i.events.find(a=>a.id===n);if(r){if(!en(r,y()))throw new Error("alleen vandaag");i.events=i.events.filter(a=>a.id!==n),_(i)}},async saveProfile(n){const i=S(e,t);i.profile=n,_(i)},async saveOnboarding(n){const i=S(e,t);i.profile={...i.profile,goals:n.goals,age_band:n.age_band,themes:O(i.profile.themes)},i.items=$i(i.items,n.startIds),i.onboarded=!0,i.theme_step=!0,_(i)},async saveThemes(n){const i=S(e,t);i.profile={...i.profile,themes:O(n)},i.theme_step=!0,_(i)},async setItemLater(n,i){const r=S(e,t);r.items=r.items.map(a=>a.id===n?{...a,later:i}:a),_(r)},async addItem(n){const i=S(e,t),r=ci(i.items,n.label);if(r){const s=mi(r,{label:n.label,kind:n.kind,timing:n.timing});if(!s)throw new Error("naam ontbreekt");return i.items=i.items.map(d=>d.id===s.id?s:d),_(i),s}const a=ui({tenantId:t,label:n.label,kind:n.kind,timing:n.timing,sort:ri(i.items)});if(!a)throw new Error("naam ontbreekt");if(!li(i.items,a.label))throw new Error("item bestaat al");return i.items=[...i.items,a],_(i),a},async updateItem(n){const i=S(e,t),r=i.items.find(s=>s.id===n.id);if(!r)throw new Error("item ontbreekt");if(!q(n.label))throw new Error("naam ontbreekt");if(!di(i.items,r.id,n.label))throw new Error("item bestaat al");const a=fi(r,n);if(!a)throw new Error("alleen eigen item");return i.items=i.items.map(s=>s.id===a.id?a:s),_(i),a},async removeItem(n){const i=S(e,t),r=i.items.find(s=>s.id===n);if(!r)throw new Error("item ontbreekt");const a=pi(r);if(!a)throw new Error("item blijft");return i.items=i.items.map(s=>s.id===a.item.id?a.item:s),_(i),a.item},async saveVectorConstraint(n,i){const r=S(e,t);r.vector.id===n&&(r.vector.pace_constraint=i,_(r))},async advanceStage(n,i){const r=S(e,t),a=pn(n.vector_id,t);return a.milestone=i,r.stage=a,r.items=r.items.map(s=>s.id===n.vector_id?{...s,milestone:i}:s),r.rotated=!0,_(r),a},async importJson(n){const i=Gi(n),r=S(e,t),a=vn(gn(Pi(r,i),e,t));return _(a),a},async signOut(){}}}const ut="#F0ECE4",Ma="#3D6B5A";function yn(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${ut}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${ut}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${Ma}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function k(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function Ta(e){return e==="stokt"||e==="herstel"?"ember":e==="stijgt"?"sage":"fog"}function ft(e){const t=Ta(e);return e==="stokt"||e==="herstel"||e==="zakt"?k("status-kink",`ico-${t}`):e==="stijgt"?k("status-up",`ico-${t}`):k("status-flat",`ico-${t}`)}function Aa(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${k(n?"dot-now":"dot")}</button>`}).join("")}const ja=`
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
</svg>`;function Ba(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",ja)}const F=()=>document.querySelector("#app"),l={screen:"vandaag",skipItemId:null,missKey:null,detailItemId:null,advanceWarn:!1,busy:!1,error:null,startIds:[],addKind:"gedrag",addLabel:"",addTiming:"",editKind:"gedrag",editLabel:"",editTiming:"",removeAsk:!1,importPaste:"",confirmBeats:{}},ce=new Map;let p=null,o=null;function ie(){if(!o)throw new Error("geen snapshot");const e=U(o.items);return ma(o.vector,o.stage,ai(o.events,e),y())}function z(e,t=y()){if(!o)throw new Error("geen snapshot");const n=U(o.items),i=Y(o.events,e,n?.id),r=e.a===null?null:Ft(e.a,i);return{done:nn(i,t),plus:an(i,t),skip:tn(i,t),logged:rn(i,t),current:r}}function bn(e,t){return`${e}:${t}`}function Ca(e=y()){const t=o?.events??[];return Lt({today:e,now:new Date,wakeAt:Ye(e,Ve(t,e)),mealAt:Qt(e,Ue(t,e)),sleepSet:qe(t,e)!==null,energySet:He(t,e)!==null})}function f(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function h(){if(!o||!p)return;const e=hi(o);if(e){F().innerHTML=Qa(e);return}const t=ie(),{vector:n,stage:i}=o,r=p.mode==="local"?"Lokaal":"Supabase",a=`
    <div class="hdr">
      <div>
        ${yn()}
        <div class="date-s">${On(y())}</div>
      </div>
      <div class="mode-pill">${r}</div>
    </div>`,s=`
    <nav class="nav nav-4">
      <button data-nav="vandaag" class="${l.screen==="vandaag"?"active":""}">${k("day")}Vandaag</button>
      <button data-nav="koers" class="${l.screen==="koers"?"active":""}">${k("mark")}Koers</button>
      <button data-nav="voortgang" class="${l.screen==="voortgang"?"active":""}">${k("line")}Voortgang</button>
      <button data-nav="profiel" class="${l.screen==="profiel"?"active":""}">${k("me")}Profiel</button>
    </nav>`;if(l.detailItemId){const d=o.items.find(m=>m.id===l.detailItemId);if(d){F().innerHTML=`
      ${a}
      ${tr(d)}
      ${l.error?`<p class="error" style="padding:0 18px">${f(l.error)}</p>`:""}
      ${s}`;return}l.detailItemId=null}if(l.screen==="vandaag"){const d=y(),m=Ca(d),g=jt(o.items,d).filter(c=>re(c,m)),u=ni(o.items,d),v=Bt(o.items,d).filter(c=>re(c,m)),E=Ct(o.items,d).filter(c=>re(c,m)),j=ii(o.items,d),B=ti(o.items,d),C=ln(o.items,o.events,d,se(o.items));F().innerHTML=`
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
                value="${t.wake===null?"":Xt(t.wake)}"
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
                value="${t.meal===null?"":aa(t.meal)}"
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
          <div class="dots">${Aa(t.energy)}</div>
        </div>
      </div>
      ${B.length?`<div class="sec-hd">Dag</div>
      <div class="card quiet">
        <div class="day-tags">${B.map(c=>er(c)).join("")}</div>
      </div>`:""}
      ${u.length?`<div class="sec-hd">Regel</div>${u.map(c=>ar(c)).join("")}`:""}
      ${v.length?`<div class="sec-hd">Stofjes</div>${v.map(c=>mt(c)).join("")}`:""}
      ${E.length?`<div class="sec-hd">Sociaal</div>${E.map(c=>mt(c)).join("")}`:""}
      ${C.length?`<div class="sec-hd">Niet gedaan</div>
      <div class="card">
        <div class="note" style="margin-top:0">Geen +1, Done of Skip. Korte reden.</div>
        ${C.map(c=>hn(c)).join("")}
      </div>`:""}
      <div class="sec-hd">Vandaag</div>
      ${g.map(c=>rr(c,t)).join("")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Niet in je start. Blijft bewaard.</div>
        ${j.map(c=>Ga(c)).join("")}
        <button class="btn ghost later-add" data-nav="profiel">Eigen item</button>
      </div>
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${ft(t.trend.word)}
          <div class="word">${t.trend.word}</div>
        </div>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${f(l.error)}</p>`:""}
      ${s}`;return}if(l.screen==="koers"){F().innerHTML=`
      ${a}
      ${t.gearDown?'<div class="banner hot">Lijf vraagt tempo omlaag. Etappe gaat niet omhoog.</div>':""}
      ${gt(o.profile.themes,"Tik een suggestie of typ zelf. Geen vaste lijst. Later aan te passen.")}
      ${pt(dn(o.items,o.events,y(),se(o.items)))}
      <div class="sec-hd">Strength · push-ups</div>
      <div class="card">
        <div class="kv">
          <div><div class="lbl">A</div><div class="val">${N(n.a)}</div></div>
          <div><div class="lbl">B</div><div class="val">${N(n.b)}</div></div>
          <div><div class="lbl">Nu</div><div class="val">${N(t.current)}</div></div>
          <div><div class="lbl">Etappe</div><div class="val">${N(i.milestone)}</div></div>
        </div>
      </div>
      <div class="card">
        <div class="kv">
          <div>
            <div class="lbl">Venster</div>
            <div class="val" style="font-size:1.15rem">${G(i.started_on)} → ${i.deadline?G(i.deadline):"—"}</div>
          </div>
          <div>
            <div class="lbl">Trend</div>
            <div class="val status">${ft(t.trend.word)} ${t.trend.word}</div>
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
      ${Va(t)}
      ${Ha(o)}
      <div class="sec-hd">${k("ik")} Ik</div>
      <div class="card">
        <div class="field">
          <div class="lbl">Leven dat ik weiger</div>
          <textarea data-id="identity_anti" maxlength="${$.identity_anti}">${f(o.profile.identity_anti??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wie ik word</div>
          <textarea data-id="identity_new" maxlength="${$.identity_new}">${f(o.profile.identity_new??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wat B niet mag schenden</div>
          <textarea data-id="identity_constraint" maxlength="${$.identity_constraint}">${f(o.profile.identity_constraint??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">1-jaars B</div>
          <textarea data-id="horizon_1y" maxlength="${$.horizon_1y}">${f(o.profile.horizon_1y??"")}</textarea>
        </div>
        <button class="btn primary" data-act="save-ik">Bewaar</button>
      </div>
      ${vt()}
      ${l.error?`<p class="error" style="padding:0 18px">${f(l.error)}</p>`:""}
      ${s}`;return}if(l.screen==="voortgang"){const d=ha(o.items,o.events,y(),o.vector.a,se(o.items));F().innerHTML=`
      ${a}
      ${pt(d.week)}
      <div class="sec-hd">Lijn</div>
      <div class="card">
        <div class="note" style="margin-top:0">Huidige deze week. Geen score.</div>
        ${Xa(d.line.map(m=>m.current),y(),d.line)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Nu</div><div class="val">${N(t.current)}</div></div>
          <div><div class="lbl">Gedaan</div><div class="val">${d.hits}</div></div>
        </div>
      </div>
      ${Za(d.weight)}
      ${l.error?`<p class="error" style="padding:0 18px">${f(l.error)}</p>`:""}
      ${s}`;return}if(l.screen==="profiel"){const d=o.profile.goals??[],m=o.profile.age_band,g=ki(o.items);F().innerHTML=`
      ${a}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="note" style="margin-top:0">Later aan te passen. Geen wipe.</div>
        <div class="chips">${Re.map(u=>`<button class="chip pick ${d.includes(u.id)?"on":""}" data-act="onboard-goal" data-goal="${u.id}">${u.label}</button>`).join("")}</div>
      </div>
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="note" style="margin-top:0">Alleen een band. Geen geboortedatum.</div>
        <div class="chips">${ze.map(u=>`<button class="chip pick ${m===u?"on":""}" data-act="onboard-age" data-age="${u}">${u}</button>`).join("")}</div>
      </div>
      ${gt(o.profile.themes,"Tik een suggestie of typ zelf. Later aan te passen.")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Parkeren of terughalen. Events blijven.</div>
        ${g.map(u=>Wa(u)).join("")}
      </div>
      ${qa(o.items)}
      ${Ua()}
      ${vt()}
      ${l.error?`<p class="error" style="padding:0 18px">${f(l.error)}</p>`:""}
      ${s}`;return}}function kn(e){const t=ce.get(e);if(t&&window.clearTimeout(t),ce.delete(e),!(e in l.confirmBeats))return;const n={...l.confirmBeats};delete n[e],l.confirmBeats=n}function Na(e){kn(e),l.confirmBeats={...l.confirmBeats,[e]:Date.now()},ce.set(e,window.setTimeout(()=>{if(ce.delete(e),!(e in l.confirmBeats))return;const t={...l.confirmBeats};delete t[e],l.confirmBeats=t,h()},fn))}function Xe(e){const t=l.confirmBeats[e.id];if(!t)return null;const n=Date.now()-t;if(n>=fn)return null;const i=z(e),r=wa({plus:i.plus,done:i.done,skip:i.skip,type:e.type,track:te(e)});return r?{confirm:r,elapsed:n}:null}function he(e,t){const n=Xe(e);return!n||n.confirm.beat!==t?"":` beat-${t}`}function we(e,t){const n=Xe(e);return!n||n.confirm.beat!==t?"":` data-confirm="${t}" style="animation-delay:-${n.elapsed}ms"`}function Da(e){const t=Xe(e);return t?`<span class="sr-only" role="status" data-confirm="${t.confirm.beat}">${f(t.confirm.text)}</span>`:""}function Oa(e){if(!o)return"";const t=U(o.items);return Je(Y(o.events,e,t?.id),y())?`<button class="undo" type="button" data-act="undo" data-item="${e.id}">Ongedaan</button>`:""}function Qe(e){return`${Da(e)}${Oa(e)}`}function mt(e){const t=z(e),n=t.logged||!!t.skip,i=e.type==="medicijn"?"Genomen":"Done",r=me(e);return`
      <div class="card stof">
        ${et(e)}
        ${r?`<div class="note">${f(r)}</div>`:""}
        <div class="actions actions-two">
          <button class="btn ico-btn ${t.done?"track":""}${he(e,"check")}" data-act="done" data-item="${e.id}" ${n?"disabled":""}${we(e,"check")}>${k("done")}<span>${i}</span></button>
          <button class="btn ico-btn skip ${t.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${t.logged?"disabled":""}>${k("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||t.skip?`<div class="chips">${ue.map(a=>`<button class="chip ${t.skip===a?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${a}">${a}</button>`).join("")}</div>`:""}
        ${$n(t.skip)}
        ${Qe(e)}
      </div>`}function Ka(e,t,n,i){return`<div class="chips">${ue.map(r=>`<button class="chip ${n===r?"on":""}" data-act="${i}" data-item="${e}" data-date="${t}" data-reason="${r}">${r}</button>`).join("")}</div>`}function hn(e){const t=l.missKey===bn(e.item.id,e.date)||!!e.reason;return`
      <div class="miss-row">
        <button class="miss-item" data-act="miss-open" data-item="${e.item.id}" data-date="${e.date}">
          <span class="ex-nm">${f(e.item.label)}</span>
          <span class="note">${e.reason?f(e.reason):G(e.date)}</span>
        </button>
        ${t?Ka(e.item.id,e.date,e.reason,"miss"):""}
      </div>`}function Ra(e){const t=[];return e.hits&&t.push(`${e.hits} gedaan`),e.skips&&t.push(`${e.skips} overgeslagen`),e.misses&&t.push(`${e.misses} niet gedaan`),t.length===0?"Nog geen dagen deze week.":t.join(" · ")}function za(e){return e==="skip"?"–":e==="miss"?"×":"·"}function pt(e){return`
      <div class="sec-hd">Week</div>
      <div class="card">
        <div class="note" style="margin-top:0">${f(e.range)}</div>
        <div class="week-strip" aria-label="Weekoverzicht">
          ${e.days.map(t=>`<div class="week-day ${t.mark}${t.date===y()?" today":""}">
            <span class="week-lbl">${t.label}</span>
            <span class="week-mark">${za(t.mark)}</span>
          </div>`).join("")}
        </div>
        <div class="note">${f(Ra(e))}</div>
        ${e.note?`<div class="week-note">${f(e.note)}</div>`:""}
        ${e.missRows.length?e.missRows.map(t=>hn(t)).join(""):""}
      </div>`}function wn(e){return xt(e)||R(e)?`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${f(e.label)}</button>`:`<div class="ex-nm">${f(e.label)}</div>`}function Ga(e){return`
      <div class="later-row">
        ${wn(e)}
        <button class="btn ghost later-now" data-act="later-now" data-item="${e.id}">Nu</button>
      </div>`}function Wa(e){const t=e.later;return`
      <div class="later-row">
        <div>
          ${wn(e)}
          <div class="note" style="margin-top:4px">${t?"Later":"Nu"}</div>
        </div>
        <button class="btn ghost later-now" data-act="${t?"later-now":"later-park"}" data-item="${e.id}">${t?"Nu":"Later"}</button>
      </div>`}function Pa(e){const t=je[Dt(e)],n=Ot(e);return`
      <div class="later-row">
        <div>
          <button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${f(e.label)}</button>
          <div class="note" style="margin-top:4px">${f(t)}${n?` · ${f(n)}`:""}</div>
        </div>
        <button class="btn ghost later-now" data-act="detail-open" data-item="${e.id}">Wijzig</button>
      </div>`}function qa(e){const t=oi(e);return t.length===0?"":`
      <div class="sec-hd">Eigen items</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Label, type of tijd. Weg haalt het uit Vandaag. Log blijft.</div>
        ${t.map(n=>Pa(n)).join("")}
      </div>`}function $n(e){if(!o)return"";const t=Ei(o.profile.identity_new,o.events,e);return t?`<div class="nudge">${f(t)}</div>`:""}function Ha(e){const t=ji(e.profile.horizon_1y,e.rotated);return t?`<div class="nudge-line">${f(t)}</div>`:""}function Fa(e){if(!o||!We(o.profile.identity_constraint,e))return"";const t=Ti(o.profile.identity_constraint);return t?`<div class="check">${f(t)}</div>`:""}function _n(e){if(!e.suggestedMilestone)return"";const t=N(e.suggestedMilestone),n=l.advanceWarn&&We(o.profile.identity_constraint,e.suggestedMilestone);return`
        <div class="note" style="margin-top:0">Etappe gehaald. Niet automatisch verder. Voorstel: ${t}.</div>
        ${n?Fa(e.suggestedMilestone):""}
        ${n?`<div class="stack" style="margin-top:10px">
                 <button class="btn primary" data-act="advance-go">Volgende etappe ${t}</button>
                 <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
               </div>`:`<div class="stack" style="margin-top:10px">
                 <button class="btn primary" data-act="advance" data-n="${e.suggestedMilestone}">Volgende etappe ${t}</button>
               </div>`}`}function Va(e){return e.suggestedMilestone?`
      <div class="card">
        ${_n(e)}
      </div>`:""}function vt(){return`
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
      </div>`}function Ua(){return`
      <div class="sec-hd">Eigen item</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Label, type, optioneel tijdstip. Geen dosis. Bestaande items blijven.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="item-label" type="text" maxlength="${Be}" placeholder="Bijv. Avondwandeling" autocomplete="off" enterkeyhint="done" value="${f(l.addLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${Te.map(e=>`<button class="chip pick ${l.addKind===e?"on":""}" data-act="item-kind" data-kind="${e}">${je[e]}</button>`).join("")}</div>
        <div class="field" style="margin-top:12px">
          <div class="lbl">Tijd</div>
          <input data-id="item-timing" type="text" maxlength="${Ce}" placeholder="22:00 of ochtend" autocomplete="off" enterkeyhint="done" value="${f(l.addTiming)}" />
        </div>
        <div class="stack">
          <button class="btn primary" data-act="item-add">Voeg toe</button>
        </div>
      </div>`}function Ya(e){if(e.length===0)return"";const t=G(e[0].date),n=G(e[e.length-1].date);return t===n?t:`${t} – ${n}`}function Ja(e){const i=cn(e.map(s=>s.kg),294,72);if(i.length===0)return"";const r=i.length-1,a=i.map((s,d)=>{const m=d===r;return`<circle class="${m?"prog-dot now":"prog-dot"}" cx="${s.x.toFixed(1)}" cy="${s.y.toFixed(1)}" r="${m?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${un(i)}" />
          ${a}
        </svg>`}function Za(e){if(e.length===0)return"";const t=e[e.length-1];return`
      <div class="sec-hd">Gewicht</div>
      <div class="card">
        <div class="note" style="margin-top:0">${f(Ya(e))}</div>
        ${Ja(e)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Laatst</div><div class="val">${t.kg.toFixed(1)} kg</div></div>
        </div>
      </div>`}function Xa(e,t,n){const a=cn(e,294,72);if(a.length===0)return'<div class="note">Nog geen lijn.</div>';const s=a.map((d,m)=>{const g=n[m]?.date===t;return`<circle class="${n[m]?.mark==="miss"?"prog-dot miss":g?"prog-dot now":"prog-dot"}" cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${g?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${un(a)}" />
          ${s}
        </svg>`}function gt(e,t){return`
      <section class="theme-sec" data-sec="themes">
        <div class="sec-hd">Thema's</div>
        <div class="card">
          <div class="ex-nm">Trainingsrichting</div>
          <div class="note">${f(t)}</div>
          ${Ht(e)}
        </div>
      </section>`}function Qa(e){if(!o)return"";const t=o.profile.goals??[],n=o.profile.age_band,i=wi(o.items,t),r=l.startIds,a=`
    <div class="hdr">
      <div>
        ${yn()}
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
        ${Ht(s)}
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-themes-done">Verder</button>
        </div>
      </div>`}return`
    ${a}
    <div class="sec-hd">Start</div>
    <div class="card">
      <div class="ex-nm">Max ${oe} nu</div>
      <div class="note">De rest gaat naar Later. Later blijft zichtbaar.</div>
      <div class="chips">${i.map(s=>`<button class="chip pick ${r.includes(s.id)?"on":""}" data-act="onboard-start" data-item="${s.id}">${f(s.label)}</button>`).join("")}</div>
      <div class="note">${r.length} / ${oe} gekozen</div>
      <div class="stack" style="margin-top:16px">
        <button class="btn primary" data-act="onboard-done" ${r.length===0?"disabled":""}>Naar Vandaag</button>
      </div>
    </div>`}function et(e){return!xt(e)&&!R(e)?`<div class="ex-nm">${f(e.label)}</div>`:`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${f(e.label)}</button>`}function er(e){return`<button class="chip pick" data-act="detail-open" data-item="${e.id}">${f(e.label)}</button>`}function tr(e){const t=Le(e),n=me(e),i=Zn(e.timing),r=Xn(e.timing),a=Nt(e),s=Ee(e),d=P(e),m=R(e);return`
      <button class="btn ghost detail-back" data-act="detail-close">Terug</button>
      <div class="sec-hd">Detail</div>
      <div class="card">
        <div class="ex-nm">${f(e.label)}</div>
        ${i?`<div class="note">${f(i)}</div>`:""}
        ${r?`<div class="note">${f(r)}</div>`:""}
        ${n&&!r?`<div class="note">${f(n)}</div>`:""}
        ${a?`<div class="work">${f(a)}</div>`:""}
        ${s?'<div class="note">Voorkeur. Geen regel.</div>':""}
        ${d&&!n&&!i&&!r?'<div class="note">Regel. Geen afvinken.</div>':""}
        ${Qe(e)}
      </div>
      ${t?`<div class="sec-hd">Bron</div>
      <div class="card quiet">
        <div class="src-tag">${f(t)}</div>
      </div>`:""}
      ${m?nr():ir(e)}`}function nr(){return`
      <div class="sec-hd">Wijzig</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Zelfde item. Geen dosis. Log blijft.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="edit-label" type="text" maxlength="${Be}" placeholder="Naam" autocomplete="off" enterkeyhint="done" value="${f(l.editLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${Te.map(e=>`<button class="chip pick ${l.editKind===e?"on":""}" data-act="edit-kind" data-kind="${e}">${je[e]}</button>`).join("")}</div>
        <div class="field" style="margin-top:12px">
          <div class="lbl">Tijd</div>
          <input data-id="edit-timing" type="text" maxlength="${Ce}" placeholder="22:00 of ochtend" autocomplete="off" enterkeyhint="done" value="${f(l.editTiming)}" />
        </div>
        <div class="stack">
          <button class="btn primary" data-act="item-save">Bewaar</button>
          ${l.removeAsk?`<div class="note">Weg uit Vandaag. Log blijft.</div>
          <button class="btn primary" data-act="item-remove">Bevestig</button>
          <button class="btn ghost" data-act="item-remove-cancel">Niet nu</button>`:'<button class="btn ghost" data-act="item-remove-ask">Weg</button>'}
        </div>
      </div>`}function ir(e){return Oe(e)?e.later?`
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
      </div>`:""}function ar(e){const t=me(e);return`
      <div class="card quiet">
        ${et(e)}
        ${t?`<div class="note">${f(t)}</div>`:'<div class="note">Regel. Geen afvinken.</div>'}
      </div>`}function rr(e,t){const n=z(e),i=te(e),r=n.logged||!!n.skip,a=i&&n.current!==null&&e.b!==null&&n.current>=e.b,s=r||a,d=i,m=Nt(e),g=me(e),u=d&&t.suggestedMilestone&&e.id===o.vector.id;return`
      <div class="card">
        ${et(e)}
        ${g&&!m&&!i?`<div class="note">${f(g)}</div>`:""}
        ${i?`<div class="track">
          <span class="now">${N(n.current??e.a??0)}</span>
          <span>→</span>
          <span class="mid">${N(e.milestone??0)}</span>
          <span>→</span>
          <span class="end">${N(e.b??0)}</span>
        </div>`:m?`<div class="work">${f(m)}</div>`:""}
        <div class="actions ${i?"":"actions-two"}">
          ${i?`<button class="btn ico-btn ${n.plus?"on":""}${he(e,"fade")}" data-act="plus" data-item="${e.id}" ${s?"disabled":""}${we(e,"fade")}>${k("plus")}<span>+1</span></button>`:""}
          <button class="btn ico-btn ${n.done?"track":""}${he(e,"check")}" data-act="done" data-item="${e.id}" ${r?"disabled":""}${we(e,"check")}>${k("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${n.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${n.logged?"disabled":""}>${k("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||n.skip?`<div class="chips">${ue.map(v=>`<button class="chip ${n.skip===v?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${v}">${v}</button>`).join("")}</div>`:""}
        ${Qe(e)}
        ${u?_n(t):""}
        ${$n(n.skip)}
      </div>`}function N(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function L(e){if(!l.busy){l.busy=!0,l.error=null;try{await e()}catch(t){l.error=t instanceof Error?t.message:"Er ging iets mis"}finally{l.busy=!1,h()}}}async function sr(e){p=e,o=await p.load(),l.screen="vandaag",h()}async function or(){Ba(),lr(),await sr(Ea())}function lr(){document.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const t=e.target;if(t instanceof HTMLInputElement){if(t.dataset.id==="theme-custom"){e.preventDefault(),Mn();return}if(t.dataset.id==="item-label"||t.dataset.id==="item-timing"){e.preventDefault(),En();return}if(t.dataset.id==="edit-label"||t.dataset.id==="edit-timing"){e.preventDefault(),In();return}if(t.dataset.id==="weight"){e.preventDefault(),bt(t.value);return}if(t.dataset.id==="wake"){e.preventDefault(),kt(t.value);return}t.dataset.id==="meal"&&(e.preventDefault(),ht(t.value))}}),document.addEventListener("change",e=>{const t=e.target;if(t instanceof HTMLInputElement&&(t.dataset.id==="weight"&&bt(t.value),t.dataset.id==="wake"&&kt(t.value),t.dataset.id==="meal"&&ht(t.value),t.dataset.id==="import-file"&&t.files?.[0])){const n=t.files[0];t.value="",n.text().then(i=>xn(i))}}),document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(Bn(n)){l.screen=n,l.skipItemId=null,l.missKey=null,l.detailItemId=null,l.advanceWarn=!1,l.error=null,h();return}dr(t)})}async function dr(e){const t=e.dataset.act;if(!t)return;const n=A("import-paste");if(n!==null&&(l.importPaste=n),!p||!o)return;const i=ie(),r=y();if(t==="sleep-inc"||t==="sleep-dec"){const a=i.sleep??7,s=Math.max(0,Math.min(14,a+(t==="sleep-inc"?.5:-.5)));await M({date:r,kind:"body_sleep",value:s,skip_reason:null,item_id:null});return}if(t==="energy"){const a=Number(e.dataset.n),s=i.energy===a?null:a;if(s===null)return;await M({date:r,kind:"body_energy",value:s,skip_reason:null,item_id:null});return}if(t==="weight-inc"||t==="weight-dec"){const a=Yi(i.weight,Ui(o.events),t==="weight-inc"?.1:-.1);if(i.weight===a)return;await M({date:r,kind:"body_weight",value:a,skip_reason:null,item_id:null});return}if(t==="wake-inc"||t==="wake-dec"){const a=ta(i.wake,Qi(o.events),t==="wake-inc"?15:-15);if(i.wake===a)return;await M({date:r,kind:"body_wake",value:a,skip_reason:null,item_id:null});return}if(t==="meal-inc"||t==="meal-dec"){const a=na(i.meal,ea(o.events),t==="meal-inc"?15:-15);if(i.meal===a)return;await M({date:r,kind:"body_meal",value:a,skip_reason:null,item_id:null});return}if(t==="plus"){const a=o.items.find(d=>d.id===e.dataset.item);if(!a||!te(a))return;const s=z(a);if(s.logged||s.skip||a.b!==null&&s.current!==null&&s.current>=a.b)return;await M({date:r,kind:"set",value:(s.current??a.a??0)+1,skip_reason:null,item_id:a.id},a.id);return}if(t==="done"){const a=o.items.find(d=>d.id===e.dataset.item);if(!a)return;const s=z(a);if(s.logged||s.skip)return;await M({date:r,kind:"done",value:s.current??a.a,skip_reason:null,item_id:a.id},a.id);return}if(t==="detail-open"){const a=e.dataset.item??null,s=a?o.items.find(d=>d.id===a):void 0;if(!s)return;Ln(s),l.detailItemId=s.id,h();return}if(t==="detail-close"){l.detailItemId=null,h();return}if(t==="skip-open"){const a=e.dataset.item??null;l.skipItemId=l.skipItemId===a?null:a,h();return}if(t==="skip"){const a=o.items.find(m=>m.id===e.dataset.item);if(!a||z(a).logged)return;const d=e.dataset.reason;if(!tt(d))return;await M({date:r,kind:"skip",value:null,skip_reason:d,item_id:a.id}),l.skipItemId=null;return}if(t==="undo"){const a=o.items.find(m=>m.id===e.dataset.item);if(!a)return;const s=U(o.items),d=Je(Y(o.events,a,s?.id),r);if(!d)return;kn(a.id),await cr(d.id),l.skipItemId=null;return}if(t==="miss-open"){const a=e.dataset.item,s=e.dataset.date;if(!a||!s)return;const d=bn(a,s);l.missKey=l.missKey===d?null:d,h();return}if(t==="miss"){const a=o.items.find(g=>g.id===e.dataset.item),s=e.dataset.date,d=e.dataset.reason;if(!a||!s||s>=r||!tt(d))return;const m=z(a,s);if(m.logged||m.skip)return;await M({date:s,kind:"miss",value:null,skip_reason:d,item_id:a.id}),l.missKey=null;return}if(t==="advance"){if(!i.suggestedMilestone)return;if(We(o.profile.identity_constraint,i.suggestedMilestone)&&!l.advanceWarn){l.advanceWarn=!0,h();return}await yt(i.suggestedMilestone);return}if(t==="advance-go"){if(!i.suggestedMilestone)return;await yt(i.suggestedMilestone);return}if(t==="advance-cancel"){l.advanceWarn=!1,h();return}if(t==="onboard-goal"){const a=e.dataset.goal;if(!a||!zt(a))return;const s={...o.profile,goals:_i(o.profile.goals??[],a)};await L(async()=>{await p.saveProfile(s),o.profile=s});return}if(t==="onboard-age"){const a=e.dataset.age;if(!a||!Gt(a))return;const s={...o.profile,age_band:a};await L(async()=>{await p.saveProfile(s),o.profile=s});return}if(t==="theme-toggle"){const a=e.dataset.theme;if(!a)return;await _e(Bi(O(o.profile.themes),a));return}if(t==="theme-add"){await Mn();return}if(t==="onboard-start"){const a=e.dataset.item;if(!a)return;l.startIds=xi(l.startIds,a),h();return}if(t==="onboard-next"){h();return}if(t==="onboard-themes-done"){await _e(o.profile.themes??[],!0);return}if(t==="onboard-done"){const a=o.profile.age_band,s=o.profile.goals??[];if(!a||s.length===0||l.startIds.length===0)return;await L(async()=>{await p.saveOnboarding({goals:s,age_band:a,startIds:l.startIds}),o=await p.load(),l.screen="vandaag"});return}if(t==="later-now"||t==="later-park"){const a=e.dataset.item;if(!a)return;await L(async()=>{await p.setItemLater(a,t==="later-park"),o=await p.load()});return}if(t==="item-kind"){const a=e.dataset.kind;if(!rt(a))return;Sn(),l.addKind=a,h();return}if(t==="item-add"){await En();return}if(t==="edit-kind"){const a=e.dataset.kind;if(!rt(a))return;$e(),l.editKind=a,h();return}if(t==="item-save"){await In();return}if(t==="item-remove-ask"){$e(),l.removeAsk=!0,h();return}if(t==="item-remove-cancel"){l.removeAsk=!1,h();return}if(t==="item-remove"){const a=l.detailItemId;if(!a)return;await L(async()=>{await p.removeItem(a),o=await p.load(),l.detailItemId=null,l.removeAsk=!1,l.screen="profiel"});return}if(t==="save-ik"){const a={...o.profile,identity_anti:T(A("identity_anti"),$.identity_anti),identity_new:T(A("identity_new"),$.identity_new),identity_constraint:T(A("identity_constraint"),$.identity_constraint),horizon_1y:T(A("horizon_1y"),$.horizon_1y)};await L(async()=>{await p.saveProfile(a),o.profile=a});return}if(t==="export"){Dn(o);return}if(t==="import-pick"){document.querySelector("[data-id=import-file]")?.click();return}if(t==="import-go"){await xn(l.importPaste);return}}async function xn(e){const t=e.trim();if(!t){l.error=ee,h();return}await L(async()=>{o=await p.importJson(t),l.importPaste=""})}function Sn(){l.addLabel=A("item-label")??l.addLabel,l.addTiming=A("item-timing")??l.addTiming}function $e(){l.editLabel=A("edit-label")??l.editLabel,l.editTiming=A("edit-timing")??l.editTiming}function Ln(e){l.editLabel=e.label,l.editKind=Dt(e),l.editTiming=Ot(e),l.removeAsk=!1}async function In(){!p||!o||!l.detailItemId||($e(),await L(async()=>{const e=await p.updateItem({id:l.detailItemId,label:l.editLabel,kind:l.editKind,timing:l.editTiming});o=await p.load(),Ln(e),l.detailItemId=e.id}))}async function En(){!p||!o||(Sn(),await L(async()=>{await p.addItem({label:l.addLabel,kind:l.addKind,timing:l.addTiming}),o=await p.load(),l.addLabel="",l.addTiming=""}))}async function Mn(){if(!o)return;const e=A("theme-custom")??"",t=O(o.profile.themes),n=Ci(t,e);n.length===t.length&&n.every((i,r)=>i===t[r])||await _e(n)}async function _e(e,t=!1){if(!p||!o)return;const n=O(e),i={...o.profile,themes:n},r=t||!Rt(o);await L(async()=>{if(r){await p.saveThemes(n),o=await p.load();return}await p.saveProfile(i),o.profile=i})}function A(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function yt(e){await L(async()=>{o.stage=await p.advanceStage(o.stage,e),o.items=o.items.map(t=>t.id===o.stage.vector_id?{...t,milestone:e}:t),o.rotated=!0,l.advanceWarn=!1})}async function M(e,t){await L(async()=>{const n=await p.addEvent(e);o.events.push(n),t&&Na(t)})}async function cr(e){await L(async()=>{await p.removeEvent(e),o.events=o.events.filter(t=>t.id!==e)})}async function bt(e){if(!p||!o)return;const t=Ji(e);t!==null&&ie().weight!==t&&await M({date:y(),kind:"body_weight",value:t,skip_reason:null,item_id:null})}async function kt(e){if(!p||!o)return;const t=Zt(e);t!==null&&ie().wake!==t&&await M({date:y(),kind:"body_wake",value:t,skip_reason:null,item_id:null})}async function ht(e){if(!p||!o)return;const t=ia(e);t!==null&&ie().meal!==t&&await M({date:y(),kind:"body_meal",value:t,skip_reason:null,item_id:null})}or();
