(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const ue=["geen tijd","geen energie","vergeten","geen zin","pijn"];function et(e){return!!(e&&ue.includes(e))}const In=["guideline","evidence-informed","public-framework","user preference","hypothesis"],En=["vandaag","koers","voortgang","profiel"];function Mn(e){return!!(e&&En.includes(e))}const w={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},fe="routine_loop_v6",ht=["routine_loop_v5","routine_loop_v4","routine_loop_v3"],tt="routine_local_user_id",nt="routine_local_tenant_id",Tn="routine_local_chosen";function An(e){return JSON.stringify({exported_at:new Date().toISOString(),key:fe,profile:e.profile,items:e.items,vector:e.vector,stage:e.stage,events:e.events,rotated:e.rotated,onboarded:e.onboarded,theme_step:e.theme_step},null,2)}function jn(e){const t=new Blob([An(e)],{type:"application/json"}),n=URL.createObjectURL(t),i=document.createElement("a");i.href=n,i.download=`routine-${e.profile.id.slice(0,8)}.json`,i.click(),URL.revokeObjectURL(n)}const wt=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],$t=["zo","ma","di","wo","do","vr","za"];function b(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${i}`}function N(e,t){const n=K(e);return n.setDate(n.getDate()+t),b(n)}function K(e){const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)}function Bn(e){const t=K(e);return`${$t[t.getDay()]} ${t.getDate()} ${wt[t.getMonth()]}`}function z(e){const t=K(e);return`${t.getDate()} ${wt[t.getMonth()]}`}function Cn(e){return $t[K(e).getDay()]}function Nn(e){const t=K(e).getDay();return t===0?7:t}function xe(e){const t=K(e),n=t.getDay(),i=n===0?-6:1-n;return t.setDate(t.getDate()+i),b(t)}function Se(e,t){const n=[];let i=e;for(;i<=t;)n.push(i),i=N(i,1);return n}function W(){return crypto.randomUUID()}function Dn(){return new Date().toISOString()}function On(e){return e.trim().toLowerCase().normalize("NFC")}function Kn(e){return!!(e&&In.includes(e))}function Rn(e){const t=On(e);return t==="cafeïne 90 min na opstaan"?"public-framework":t==="wandelen na eten"?"evidence-informed":t==="low carb"||t==="scherm uit 22:00"||t==="korte rust"?"user preference":t==="vitamine d"?"guideline":t==="koud douchen"?"hypothesis":null}function Le(e){return Rn(e.label)??(Kn(e.template)?e.template:null)}function _t(e){return Le(e)!==null}function ae(){return{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:null,condition:null}}function Gn(e){return{mode:e?.mode??null,clock:e?.clock??null,anchor:e?.anchor??null,offset_min:e?.offset_min??null,window_min:e?.window_min??null,frequency:e?.frequency??null,condition:e?.condition??null}}function xt(e){return e.trim().toLowerCase().normalize("NFC")}function zn(e){return xt(e)==="korte rust"?{mode:"clock",clock:"08:00",window_min:840,frequency:"daily",condition:"body"}:null}function Wn(e,t){const n=zn(t);return n?{...e,...n}:e}function St(e){return{now:e.now??new Date,today:e.today,wakeAt:e.wakeAt??null,mealAt:e.mealAt??null,sleepSet:!!e.sleepSet,energySet:!!e.energySet}}function Ie(e){const t=e?.trim().toLowerCase();return t==="body"||t==="energy|sleep"?"body":t==="energy"?"energy":t==="sleep"?"sleep":null}function Pn(e,t){const n=Ie(e.condition);if(!n)return!0;const i=!!t.sleepSet,r=!!t.energySet;return n==="energy"?r:n==="sleep"?i:i||r}function Lt(e,t){const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(!n)return null;const i=Number(n[1]),r=Number(n[2]);if(i>23||r>59)return null;const a=K(e);return a.setHours(i,r,0,0),a}function qn(e,t){return e==="wake"?t.wakeAt:e==="meal"?t.mealAt:null}function Hn(e,t){if(e.mode==="clock"&&e.clock)return Lt(t.today,e.clock);if(e.mode==="relative"&&e.anchor&&e.offset_min!==null){const n=qn(e.anchor,t);return n?new Date(n.getTime()+e.offset_min*6e4):null}return null}function It(e,t){return!t||e.window_min===null?null:new Date(t.getTime()+e.window_min*6e4)}function Et(e,t){if(e.timing.frequency==="weekly"||e.type==="weekly"){const i=e.weekdays??[];return i.length===0?!1:i.includes(Nn(t))}return!0}function P(e){return Me(e)==="constraint"}function Ee(e){return Me(e)==="preference"}function Mt(e){return!P(e)&&!Ee(e)}function Fn(e,t){if(P(e))return"silent";if(!Et(e,t.today)||!Pn(e.timing,t))return"hidden";const n=e.timing;if(!n.mode)return"due";const i=Hn(n,t);if(n.mode==="relative"&&!i)return"due";if(i&&t.now<i)return"wait";const r=It(n,i);return r&&t.now>r?"closed":"due"}function re(e,t){const n=Fn(e,t);return!(n==="hidden"||n==="closed"||n==="wait"&&e.timing.window_min!==null)}function it(e){return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`}function Vn(e){if(e.window_min===null)return null;if(e.mode==="clock"&&e.clock){const t=Lt("2000-01-01",e.clock);if(!t)return null;const n=It(e,t);return n?`${it(t)}–${it(n)}`:null}return`${e.window_min} min`}function Un(e){const t=Ie(e.condition);return t==="body"?"na slaap of energie":t==="energy"?"na energie":t==="sleep"?"na slaap":null}function me(e){const t=e.timing;return Ie(t.condition)?null:t.condition?t.condition:t.mode==="relative"&&t.anchor==="wake"&&t.offset_min!==null?`${t.offset_min} min na opstaan`:t.mode==="relative"&&t.anchor==="meal"&&t.offset_min!==null?t.offset_min===0?"na eten":`${t.offset_min} min na eten`:t.mode==="relative"&&t.anchor==="meal"?"na eten":t.mode==="clock"&&t.clock?t.clock:null}function Me(e){if(e.role)return e.role;const t=xt(e.label);return t==="low carb"?"preference":t==="cafeïne 90 min na opstaan"||t==="scherm uit 22:00"?"constraint":null}const Te=["gedrag","regel","medicijn","supplement","sociaal"],Ae={gedrag:"gedrag",regel:"leefregel",medicijn:"medicijn",supplement:"supplement",sociaal:"sociaal"},je={gedrag:"Gedrag",regel:"Regel",medicijn:"Medicijn",supplement:"Supplement",sociaal:"Sociaal"},Be=40,Ce=40;function at(e){return!!(e&&Te.includes(e))}function te(e){return e.a!==null&&e.b!==null&&e.milestone!==null}function Yn(e,t){return Et(e,t)}function Jn(e,t){return{...e,tenant_id:e.tenant_id??t,weekdays:e.weekdays??null,times_per_week:e.times_per_week??null,timing:Wn(Gn(e.timing),e.label),role:Me(e),template:Le(e),later:!!e.later,removed:!!e.removed}}function Ne(e){return e.type==="medicijn"||e.type==="supplement"}function Tt(e){return e.type==="sociaal"}function At(e,t){return V(e,t).filter(n=>Mt(n)&&!Ne(n)&&!Tt(n)&&!n.later)}function Zn(e,t){return V(e,t).filter(n=>Ee(n)&&!n.later)}function Xn(e,t){return V(e,t).filter(n=>P(n)&&!n.later)}function jt(e,t){return V(e,t).filter(n=>Ne(n)&&!n.later)}function Bt(e,t){return V(e,t).filter(n=>Tt(n)&&!n.later)}function Qn(e,t){return V(e,t).filter(n=>n.later&&(Mt(n)||P(n)))}function V(e,t){return e.filter(n=>!n.removed&&Yn(n,t)).sort((n,i)=>n.sort-i.sort)}function U(e){return e.find(te)}function ye(e){return e.kind==="body_sleep"||e.kind==="body_energy"||e.kind==="body_weight"||e.kind==="body_wake"||e.kind==="body_meal"}function Y(e,t,n){return e.filter(i=>ye(i)?!1:!!(i.item_id===t.id||i.item_id===null&&n&&t.id===n))}function ei(e,t){return t?[...e.filter(ye),...Y(e,t,t.id)]:e.filter(ye)}function Ct(e){return e.a===null?null:e.unit==="sec"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} s`:e.unit==="reps"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} reps`:String(e.a)}function E(e){return e.trim().toLowerCase()}function q(e){const t=e.trim().replace(/\s+/g," ").slice(0,Be);return t.length>0?t:null}function De(e){const t=e.trim().replace(/\s+/g," ").slice(0,Ce);if(!t)return ae();const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(n){const i=Number(n[1]),r=Number(n[2]);if(i<=23&&r<=59)return{...ae(),mode:"clock",clock:`${String(i).padStart(2,"0")}:${n[2]}`,frequency:"daily"}}return{...ae(),frequency:"daily",condition:t}}function ti(e){return e.reduce((t,n)=>Math.max(t,n.sort),-1)+1}const ni=["Push-ups","Squats","Plank","Dead hang","Gerichte kracht","Koud douchen","Niet snoepen","Low carb","Intermittent fasting","Geen alcohol","Cafeïne 90 min na opstaan","Wandelen na eten","Medicijn ochtend","Vitamine D","Bellen met iemand","Iemand zien","Scherm uit 22:00","Korte rust"];function pe(e){const t=E(e);return ni.some(n=>E(n)===t)}function Oe(e){return pe(e.label)}function R(e){return!Oe(e)}function H(e){return!!e.removed}function ii(e){return e.filter(t=>R(t)&&!H(t)).sort((t,n)=>t.sort-n.sort)}function Nt(e){return e.type==="leefregel"?"regel":e.type==="medicijn"?"medicijn":e.type==="supplement"?"supplement":e.type==="sociaal"?"sociaal":"gedrag"}function Dt(e){return e.timing.mode==="clock"&&e.timing.clock?e.timing.clock:e.timing.condition??""}function ai(e,t){const n=q(t);return n?!e.some(i=>!H(i)&&E(i.label)===E(n)):!1}function ri(e,t,n){const i=q(n);return!i||pe(i)?!1:!e.some(r=>r.id!==t&&!H(r)&&E(r.label)===E(i))}function si(e,t){const n=q(t);if(n)return e.find(i=>H(i)&&R(i)&&E(i.label)===E(n))}function oi(e){const t=q(e.label);return t?{id:W(),tenant_id:e.tenantId,type:Ae[e.kind],label:t,unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:e.sort,timing:De(e.timing??""),role:"action",template:"user preference",later:!!e.later,removed:!1}:null}function li(e,t){if(!R(e)||H(e))return null;const n=q(t.label);return!n||pe(n)?null:{...e,type:Ae[t.kind],label:n,timing:De(t.timing??""),template:"user preference"}}function di(e,t){if(!R(e)||!H(e))return null;const n=q(t.label);return!n||pe(n)?null:{...e,type:Ae[t.kind],label:n,timing:De(t.timing??""),template:"user preference",later:!1,removed:!1}}function ci(e){return H(e)?{item:e,mode:"removed"}:R(e)?{item:{...e,removed:!0},mode:"removed"}:Oe(e)?{item:{...e,later:!0},mode:"parked"}:null}function ui(e){const t=new Set,n=[];for(const i of e){const r=E(i.label);t.has(r)||(t.add(r),n.push(i))}return n}function Ke(e,t,n){const i=ui(e),r=new Set(i.map(s=>E(s.label))),a=t.filter(s=>!r.has(E(s.label))).map(s=>({...s,tenant_id:n}));return[...i,...a]}function Ot(e){const t=new Map;for(const n of e)for(const i of n)t.has(i.id)||t.set(i.id,i);return[...t.values()].sort((n,i)=>n.created_at.localeCompare(i.created_at))}function fi(e){return e?!!(e.identity_anti||e.identity_new||e.identity_constraint||e.horizon_1y||e.display_name):!1}function mi(e,t,n,i){if(e.length===0)return null;const r=e.reduce((u,y)=>(y.events?.length??0)>(u.events?.length??0)?y:u),a=e.find(u=>fi(u.profile))?.profile??r.profile,s=Ke([r,...e.filter(u=>u!==r)].flatMap(u=>u.items??[]),t,i),d=new Map(s.map(u=>[E(u.label),u.id])),c=new Map;for(const u of e)for(const y of u.items??[]){const $=d.get(E(y.label));$&&y.id!==$&&c.set(y.id,$)}const g=Ot(e.map(u=>u.events??[])).map(u=>{if(!u.item_id)return u;const y=c.get(u.item_id);return y?{...u,item_id:y}:u});return{...r,profile:{...a,id:a.id||n,tenant_id:a.tenant_id||i},items:s,events:g}}const oe=3,Re=[{id:"kracht",label:"Kracht"},{id:"eten",label:"Eten & drinken"},{id:"slaap",label:"Slaap"},{id:"stofjes",label:"Stofjes"},{id:"bewegen",label:"Bewegen"}],Ge=["18–29","30–39","40–49","50–59","60+"],pi={kracht:["Push-ups","Squats","Plank","Dead hang"],eten:["Niet snoepen","Low carb","Intermittent fasting","Geen alcohol"],slaap:["Koud douchen"],stofjes:["Medicijn ochtend","Vitamine D"],bewegen:["Wandelen na eten"]};function ze(e){return P(e)||e.type==="weekly"?!1:e.type==="daily"||e.type==="leefregel"||e.type==="gedrag"||e.type==="sociaal"||Ne(e)}function vi(e){return e.filter(t=>t.removed?!1:ze(t)?!0:P(t)&&t.later).sort((t,n)=>t.sort-n.sort)}function Kt(e){return!(e.onboarded!==!1||(e.events??[]).length>0)}function gi(e){return Kt(e)?e.profile.goals?.length?e.profile.age_band?e.theme_step!==!0?"themes":"start":"age":"goals":null}function yi(e,t){const n=e.filter(ze).sort((a,s)=>a.sort-s.sort);if(t.length===0)return n;const i=new Set(t.flatMap(a=>pi[a]??[])),r=n.filter(a=>i.has(a.label));return r.length>0?r:n}function bi(e,t){const n=new Set(t.slice(0,oe));return e.map(i=>ze(i)?{...i,later:!n.has(i.id)}:{...i,later:!1})}function ki(e,t){return e.includes(t)?e.filter(n=>n!==t):[...e,t]}function hi(e,t){return e.includes(t)?e.filter(n=>n!==t):e.length>=oe?e:[...e,t]}function Rt(e){return Re.some(t=>t.id===e)}function Gt(e){return Ge.includes(e)}const wi="geen zin",x={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140};function A(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function $i(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===wi).length}function _i(e,t){const n=A(e,x.identity_new);return!n||$i(t)<2?null:n}function xi(e){return!!A(e,x.identity_constraint)}function Si(e,t){return t&&!A(e,x.horizon_1y)}function zt(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const rt=["Military calisthenics","Kickbox","Spinnen"],Wt=40;function We(e){const t=e.trim().replace(/\s+/g," ").slice(0,Wt);return t.length>0?t:null}function D(e){if(!Array.isArray(e))return[];const t=new Set,n=[];for(const i of e){if(typeof i!="string")continue;const r=We(i);if(!r)continue;const a=r.toLowerCase();t.has(a)||(t.add(a),n.push(r))}return n}function Li(e,t){const n=We(t);if(!n)return e;const i=n.toLowerCase();return e.some(r=>r.toLowerCase()===i)?e.filter(r=>r.toLowerCase()!==i):[...e,n]}function Ii(e,t){const n=We(t);if(!n)return e;const i=n.toLowerCase();return e.some(r=>r.toLowerCase()===i)?e:[...e,n]}function Ei(e){const n=D(e).filter(i=>!rt.some(r=>r.toLowerCase()===i.toLowerCase()));return[...rt,...n]}function st(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function Pt(e){const t=new Set(D(e).map(i=>i.toLowerCase()));return`<div class="chips">${Ei(e).map(i=>`<button class="chip pick ${t.has(i.toLowerCase())?"on":""}" data-act="theme-toggle" data-theme="${st(i)}">${st(i)}</button>`).join("")}</div>
        <div class="theme-add">
          <input data-id="theme-custom" type="text" maxlength="${Wt}" placeholder="Eigen thema" autocomplete="off" enterkeyhint="done" />
          <button class="btn ghost" data-act="theme-add">Voeg toe</button>
        </div>`}const ee="Ongeldig bestand. Geen Routine-export.";function le(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Mi(e){return e==null||e===fe?!0:ht.includes(String(e))}function Ti(e){return le(e)&&typeof e.id=="string"&&e.id.length>0&&typeof e.label=="string"}function Ai(e){return le(e)&&typeof e.id=="string"&&e.id.length>0&&typeof e.date=="string"&&typeof e.kind=="string"}function ot(e){return e.trim().toLowerCase()}function Q(e,t){const n=e?.trim();if(n)return e??n;const i=t?.trim();return i?t??i:null}function ji(e,t){const n=[],i=new Set;for(const r of[e,t].flatMap(a=>Array.isArray(a)?a:[]))typeof r!="string"||!Rt(r)||i.has(r)||(i.add(r),n.push(r));return n}function Bi(e,t,n){const i=new Map(t.map(a=>[ot(a.label),a.id])),r=new Map;for(const a of n){const s=i.get(ot(a.label));s&&a.id!==s&&r.set(a.id,s)}return e.map(a=>{if(!a.item_id)return a;const s=r.get(a.item_id);return s?{...a,item_id:s}:a})}function Ci(e){let t;try{t=JSON.parse(e)}catch{throw new Error(ee)}if(!le(t)||!Mi(t.key))throw new Error(ee);if(!le(t.profile)||!Array.isArray(t.items)||!Array.isArray(t.events))throw new Error(ee);if(!t.items.every(Ti)||!t.events.every(Ai))throw new Error(ee);return{profile:t.profile,items:t.items,events:t.events,onboarded:typeof t.onboarded=="boolean"?t.onboarded:void 0,theme_step:typeof t.theme_step=="boolean"?t.theme_step:void 0}}function Ni(e,t){return{...e,display_name:Q(e.display_name,t.display_name),identity_anti:A(Q(e.identity_anti,t.identity_anti),x.identity_anti),identity_new:A(Q(e.identity_new,t.identity_new),x.identity_new),identity_constraint:A(Q(e.identity_constraint,t.identity_constraint),x.identity_constraint),horizon_1y:A(Q(e.horizon_1y,t.horizon_1y),x.horizon_1y),age_band:e.age_band??(t.age_band&&Gt(t.age_band)?t.age_band:null),goals:ji(e.goals,t.goals),themes:D([...e.themes??[],...t.themes??[]])}}function Di(e,t){const n=e.profile.tenant_id,i=Ke(e.items,t.items,n),r=Bi(t.events,i,t.items).map(a=>({...a,tenant_id:n,user_id:e.profile.id}));return{...e,profile:Ni(e.profile,t.profile),items:i,events:Ot([e.events,r]),onboarded:!!(e.onboarded||t.onboarded),theme_step:!!(e.theme_step||t.theme_step)}}const Oi=2,Ki=6;function J(e,t){return e.created_at.localeCompare(t.created_at)}function Z(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(J).at(-1)}function qt(e,t){return t.filter(i=>i.kind==="set").sort(J).at(-1)?.value??e}function Pe(e,t){return Z(e,t,"body_sleep")?.value??null}function qe(e,t){return Z(e,t,"body_energy")?.value??null}const Ht=40,Ft=250,Ri=80;function Gi(e,t){return Z(e,t,"body_weight")?.value??null}function zi(e){return e.filter(t=>t.kind==="body_weight"&&t.value!==null).sort(J).at(-1)?.value??null}function Wi(e,t,n){return Math.round(Math.max(Ht,Math.min(Ft,(e??t??Ri)+n))*10)/10}function Pi(e){const t=e.trim().replace(",",".");if(!t)return null;const n=Number(t);return Number.isFinite(n)?Math.round(Math.max(Ht,Math.min(Ft,n))*10)/10:null}const ve=0,ge=1439,qi=420,Hi=780;function He(e){return e==null||!Number.isFinite(e)?null:Math.max(ve,Math.min(ge,Math.round(e)))}function Vt(e,t){return He(e.filter(n=>n.kind===t&&n.value!==null).sort(J).at(-1)?.value)}function Fe(e,t){return He(Z(e,t,"body_wake")?.value)}function Fi(e){return Vt(e,"body_wake")}function Ve(e,t){return He(Z(e,t,"body_meal")?.value)}function Vi(e){return Vt(e,"body_meal")}function Ut(e,t,n,i){return Math.max(ve,Math.min(ge,(e??t??i)+n))}function Ui(e,t,n){return Ut(e,t,n,qi)}function Yi(e,t,n){return Ut(e,t,n,Hi)}function Yt(e){const t=e.trim();if(!t)return null;const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(!n)return null;const i=Number(n[1]),r=Number(n[2]);return i>23||r>59?null:i*60+r}const Ji=Yt;function Jt(e){const t=Math.max(ve,Math.min(ge,Math.round(e))),n=Math.floor(t/60),i=t%60;return`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}`}const Zi=Jt;function Ue(e,t){if(t===null)return null;const[n,i,r]=e.split("-").map(Number);if(!n||!i||!r)return null;const a=new Date(n,i-1,r),s=Math.max(ve,Math.min(ge,Math.round(t)));return a.setHours(Math.floor(s/60),s%60,0,0),a}const Zt=Ue;function Xi(e){return e==="set"||e==="done"||e==="skip"}function Xt(e,t){return e.date===t&&Xi(e.kind)}function Ye(e,t){return e.filter(n=>Xt(n,t)).sort(J).at(-1)}function ne(e,t){return Ye(e,t)}function Qt(e,t){const n=ne(e,t);return n?.kind==="skip"?n.skip_reason:null}function en(e,t){return ne(e,t)?.kind==="done"}function tn(e,t){return ne(e,t)?.kind==="set"}function nn(e,t){const n=ne(e,t);return n?.kind==="set"||n?.kind==="done"}function Qi(e,t){return e!==null&&e<Ki||t!==null&&t<=Oi}function ea(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const i=Math.max(1,Math.ceil(n/2));return Math.min(t,e+i)}function de(e,t,n,i){if(t<i)return"empty";const r=ne(e,t);return r?.kind==="done"||r?.kind==="set"?"done":r?.kind==="skip"?"skip":Z(e,t,"miss")?"miss":t>=n?"empty":"miss"}function ta(e,t,n="1970-01-01"){let i=0,r=t;for(let a=0;a<400;a+=1){const s=de(e,r,t,n);if(s==="done")i+=1;else if(s==="skip"||s==="empty"&&r===t){r=N(r,-1);continue}else break;r=N(r,-1)}return i}function na(e,t,n){const i=xe(t),r=!n||n<i?i:n;let a=0,s=0;for(const d of Se(r,t)){const c=de(e,d,t,n??r);c==="skip"||c==="empty"||(s+=1,c==="done"&&(a+=1))}return{hits:a,eligible:s}}function ia(e,t,n="1970-01-01",i=3){const r=de(e,t,t,n);if(r==="done"||r==="skip")return!1;const a=N(t,-1);if(a<n)return!1;const s=N(t,-i),d=n>s?n:s;return Se(d,a).some(c=>de(e,c,t,n)==="miss")}function aa(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled&&!e.todayLogged?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function ra(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${lt(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${lt(e.milestone)}.`}function lt(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function an(e,t,n){return t.filter(r=>r.kind==="set"&&r.date<=n).sort(J).at(-1)?.value??e}function sa(e,t,n,i){const r=qt(e.a,n),a=Pe(n,i),s=qe(n,i),d=Gi(n,i),c=Fe(n,i),g=Ve(n,i),u=en(n,i),y=tn(n,i),$=nn(n,i),j=Qt(n,i),O=Qi(a,s),C=r>=t.milestone,v=r>=e.b,m=ia(n,i,t.started_on),S=xe(i),X=an(e.a,n,N(S,-1)),Ln=aa({current:r,weekStartCurrent:X,gearDown:O,stalled:m,milestoneHit:C,todayLogged:y||u||!!j});return{current:r,sleep:a,energy:s,weight:d,wake:c,meal:g,doneToday:u,plusToday:y,setLoggedToday:$,skipToday:j,gearDown:O,milestoneHit:C,atB:v,trend:Ln,hitrate:na(n,i,t.started_on),streak:ta(n,i,t.started_on),nextAction:ra({milestone:t.milestone,b:e.b,gearDown:O,milestoneHit:C,atB:v,stalled:m,doneToday:u,plusToday:y,skipToday:j}),suggestedMilestone:C&&!v&&!O?ea(t.milestone,e.b):null}}function oa(e,t,n,i){return Y(e,t,n).some(r=>(r.kind==="set"||r.kind==="done"||r.kind==="skip"||r.kind==="miss")&&r.date<i)}function rn(e,t){return e.created_at.localeCompare(t.created_at)}function la(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(rn).at(-1)}function da(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip"||n.kind==="miss")).sort(rn).at(-1)}function ca(e,t=[]){const n=K(e);return n.setHours(12,0,0,0),St({today:e,now:n,wakeAt:Ue(e,Fe(t,e)),mealAt:Zt(e,Ve(t,e)),sleepSet:Pe(t,e)!==null,energySet:qe(t,e)!==null})}function be(e,t,n=[]){const i=ca(t,n);return[...At(e,t),...jt(e,t),...Bt(e,t)].filter(r=>re(r,i))}function ke(e,t,n,i,r){const a=Y(e,t,r),s=da(a,n);if(s?.kind==="set"||s?.kind==="done")return{item:t,date:n,mark:"hit",reason:null};if(s?.kind==="skip")return{item:t,date:n,mark:"skip",reason:s.skip_reason};const d=s?.kind==="miss"?s:la(a,n,"miss");return d?{item:t,date:n,mark:"miss",reason:d.skip_reason}:n>=i?{item:t,date:n,mark:"open",reason:null}:{item:t,date:n,mark:"idle",reason:null}}function sn(e,t,n,i){const r=N(n,-1);return be(e,r,t).filter(a=>oa(t,a,i,r)).map(a=>{const s=ke(t,a,r,n,i);return s.mark==="hit"||s.mark==="skip"||s.mark==="miss"?s:{...s,mark:"miss",reason:null}}).filter(a=>a.mark==="miss"&&!a.reason)}function ua(e,t,n){return e.some(i=>i.mark==="hit")?"hit":e.some(i=>i.mark==="miss")?"miss":e.some(i=>i.mark==="skip")?"skip":t===n?"open":"idle"}function on(e,t,n,i){const r=xe(n),a=N(r,6),s=sn(e,t,n,i),d=new Set(s.map(v=>`${v.item.id}:${v.date}`)),c=Se(r,a).map(v=>{const m=be(e,v,t).map(S=>{const X=ke(t,S,v,n,i);return d.has(`${S.id}:${v}`)?{...X,mark:"miss",reason:X.reason}:X});return{date:v,label:Cn(v),mark:ua(m,v,n),hits:m.filter(S=>S.mark==="hit").length,misses:m.filter(S=>S.mark==="miss").length,skips:m.filter(S=>S.mark==="skip").length}}),g=c.filter(v=>v.date<n),u=g.reduce((v,m)=>v+m.hits,0),y=g.reduce((v,m)=>v+m.misses,0),$=g.reduce((v,m)=>v+m.skips,0),j=g.flatMap(v=>be(e,v.date,t).map(m=>{const S=ke(t,m,v.date,n,i);return d.has(`${m.id}:${v.date}`)?{...S,mark:"miss",reason:S.reason}:S}).filter(m=>m.mark==="miss")),O=g.filter(v=>v.mark!=="idle").length,C=u>0&&y===0&&O>=2?"Week staat.":null;return{start:r,end:a,range:`${z(r)} – ${z(a)}`,days:c,hits:u,misses:y,skips:$,missRows:j,note:C}}function se(e){return U(e)?.id}function dt(e,t){return e.created_at.localeCompare(t.created_at)}function fa(e,t){const n=new Map;for(const i of[...e].sort(dt))i.kind!=="body_weight"||i.value===null||i.date>t||n.set(i.date,i);return[...n.values()].sort((i,r)=>i.date.localeCompare(r.date)||dt(i,r)).map(i=>({date:i.date,kg:i.value}))}function ma(e,t,n,i,r){const a=on(e,t,n,r??se(e)),s=a.days.map(d=>({date:d.date,label:d.label,current:an(i,t,d.date<=n?d.date:n),mark:d.mark}));return{week:a,line:s,weight:fa(t,n),hits:a.hits,skips:a.skips,misses:a.misses}}function ln(e,t,n,i=18,r=16){if(e.length===0)return[];const a=Math.min(...e),d=Math.max(...e)-a,c=t-i*2,g=n-r*2;return e.map((u,y)=>{const $=e.length===1?t/2:i+y/(e.length-1)*c,j=d===0?n/2:r+(1-(u-a)/d)*g;return{x:$,y:j}})}function dn(e){return e.map(t=>`${t.x.toFixed(1)},${t.y.toFixed(1)}`).join(" ")}const cn=1080;function pa(e){return e.skip?null:e.plus?{text:"Set gedaan.",tone:"fog",beat:"fade"}:e.done?e.type==="medicijn"?{text:"Genomen.",tone:"sage",beat:"check"}:e.track?{text:"Set staat.",tone:"sage",beat:"check"}:{text:"Staat.",tone:"sage",beat:"check"}:null}function un(e,t){return{id:e,tenant_id:t,display_name:null,...zt(),age_band:null,goals:[],themes:[]}}function fn(e,t,n=b()){return{id:W(),tenant_id:t,vector_id:e,milestone:w.milestone,started_on:n,deadline:N(n,w.windowDays),status:"active",stage_type:w.stageType}}function Je(e){const t=n=>({id:W(),tenant_id:e,timing:ae(),role:null,template:null,later:!1,...n});return[t({type:"daily",label:"Push-ups",unit:"reps",a:w.a,b:w.b,milestone:w.milestone,weekdays:null,times_per_week:null,sort:0}),t({type:"daily",label:"Squats",unit:"reps",a:30,b:null,milestone:null,weekdays:null,times_per_week:null,sort:1}),t({type:"daily",label:"Plank",unit:"sec",a:60,b:null,milestone:null,weekdays:null,times_per_week:null,sort:2}),t({type:"daily",label:"Dead hang",unit:"sec",a:45,b:null,milestone:null,weekdays:null,times_per_week:null,sort:3}),t({type:"weekly",label:"Gerichte kracht",unit:null,a:null,b:null,milestone:null,weekdays:[],times_per_week:2,sort:4}),t({type:"leefregel",label:"Koud douchen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:5,template:"hypothesis"}),t({type:"leefregel",label:"Niet snoepen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:6}),t({type:"leefregel",label:"Low carb",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:7,role:"preference",template:"user preference"}),t({type:"leefregel",label:"Intermittent fasting",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:8}),t({type:"leefregel",label:"Geen alcohol",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:9}),t({type:"gedrag",label:"Cafeïne 90 min na opstaan",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:10,role:"constraint",template:"public-framework",timing:{mode:"relative",clock:null,anchor:"wake",offset_min:90,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Wandelen na eten",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:11,role:"action",template:"evidence-informed",timing:{mode:"relative",clock:null,anchor:"meal",offset_min:0,window_min:null,frequency:"daily",condition:"na eten"}}),t({type:"medicijn",label:"Medicijn ochtend",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:12,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"ochtend"}}),t({type:"supplement",label:"Vitamine D",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:13,role:"action",template:"guideline",timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Bellen met iemand",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:14,role:"action",template:null,timing:{mode:"clock",clock:"18:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Iemand zien",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:1,sort:15,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"deze week"}}),t({type:"gedrag",label:"Scherm uit 22:00",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:16,role:"constraint",template:"user preference",timing:{mode:"clock",clock:"22:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Korte rust",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:17,role:"action",template:"user preference",timing:{mode:"clock",clock:"08:00",anchor:null,offset_min:null,window_min:840,frequency:"daily",condition:"body"}})]}function va(e,t){return{id:e.id,tenant_id:e.tenant_id,user_id:t,domain:w.domain,a:e.a??w.a,b:e.b??w.b,unit:e.unit==="sec"?"sec":"reps",pace_constraint:null}}function ga(e,t=b(),n=W()){const i=un(e,n),r=Je(n),a=U(r)??r[0],s=va(a,e),d=fn(s.id,n,t);return a.milestone!==null&&(d.milestone=a.milestone),{profile:i,items:r,vector:s,stage:d,events:[],rotated:!1,onboarded:!1,theme_step:!1}}function mn(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,items:e.items.map(n=>te(n)?{...n,a:w.a,b:w.b,milestone:w.milestone,unit:w.unit}:n),vector:{...e.vector,a:w.a,b:w.b,unit:w.unit},stage:{...e.stage,milestone:w.milestone},events:e.events}:e}function ya(){const e=localStorage.getItem(tt);if(e)return e;const t=W();return localStorage.setItem(tt,t),t}function ba(){const e=localStorage.getItem(nt);if(e)return e;const t=W();return localStorage.setItem(nt,t),t}function _(e){localStorage.setItem(fe,JSON.stringify(e))}function ka(e){if(!e)return null;try{const t=JSON.parse(e);return!t||typeof t!="object"?null:t}catch{return null}}function ha(){return[fe,...ht].map(e=>ka(localStorage.getItem(e))).filter(e=>e!==null)}function pn(e,t,n){const i=Ke(e.items??[],Je(n),n).map(r=>Jn(r,n));return{...e,profile:{...un(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...zt(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null,age_band:e.profile?.age_band??null,goals:Array.isArray(e.profile?.goals)?e.profile.goals:[],themes:D(e.profile?.themes)},items:i,vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(r=>({...r,tenant_id:r.tenant_id??n,item_id:r.item_id??null})),rotated:!!e.rotated,onboarded:e.onboarded??!0,theme_step:e.theme_step??!1}}function L(e,t){const n=ha();if(n.length===0){const a=ga(e,b(),t);return _(a),a}const i=mi(n,Je(t),e,t)??n[0],r=mn(pn(i,e,t));return _(r),r}function wa(){localStorage.setItem(Tn,"1");const e=ya(),t=ba();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return L(e,t)},async addEvent(n){const i=L(e,t),r={id:n.id??W(),tenant_id:t,user_id:e,item_id:n.item_id??null,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:Dn()};return i.events.push(r),_(i),r},async removeEvent(n){const i=L(e,t),r=i.events.find(a=>a.id===n);if(r){if(!Xt(r,b()))throw new Error("alleen vandaag");i.events=i.events.filter(a=>a.id!==n),_(i)}},async saveProfile(n){const i=L(e,t);i.profile=n,_(i)},async saveOnboarding(n){const i=L(e,t);i.profile={...i.profile,goals:n.goals,age_band:n.age_band,themes:D(i.profile.themes)},i.items=bi(i.items,n.startIds),i.onboarded=!0,i.theme_step=!0,_(i)},async saveThemes(n){const i=L(e,t);i.profile={...i.profile,themes:D(n)},i.theme_step=!0,_(i)},async setItemLater(n,i){const r=L(e,t);r.items=r.items.map(a=>a.id===n?{...a,later:i}:a),_(r)},async addItem(n){const i=L(e,t),r=si(i.items,n.label);if(r){const s=di(r,{label:n.label,kind:n.kind,timing:n.timing});if(!s)throw new Error("naam ontbreekt");return i.items=i.items.map(d=>d.id===s.id?s:d),_(i),s}const a=oi({tenantId:t,label:n.label,kind:n.kind,timing:n.timing,sort:ti(i.items)});if(!a)throw new Error("naam ontbreekt");if(!ai(i.items,a.label))throw new Error("item bestaat al");return i.items=[...i.items,a],_(i),a},async updateItem(n){const i=L(e,t),r=i.items.find(s=>s.id===n.id);if(!r)throw new Error("item ontbreekt");if(!q(n.label))throw new Error("naam ontbreekt");if(!ri(i.items,r.id,n.label))throw new Error("item bestaat al");const a=li(r,n);if(!a)throw new Error("alleen eigen item");return i.items=i.items.map(s=>s.id===a.id?a:s),_(i),a},async removeItem(n){const i=L(e,t),r=i.items.find(s=>s.id===n);if(!r)throw new Error("item ontbreekt");const a=ci(r);if(!a)throw new Error("item blijft");return i.items=i.items.map(s=>s.id===a.item.id?a.item:s),_(i),a.item},async saveVectorConstraint(n,i){const r=L(e,t);r.vector.id===n&&(r.vector.pace_constraint=i,_(r))},async advanceStage(n,i){const r=L(e,t),a=fn(n.vector_id,t);return a.milestone=i,r.stage=a,r.items=r.items.map(s=>s.id===n.vector_id?{...s,milestone:i}:s),r.rotated=!0,_(r),a},async importJson(n){const i=Ci(n),r=L(e,t),a=mn(pn(Di(r,i),e,t));return _(a),a},async signOut(){}}}const ct="#F0ECE4",$a="#3D6B5A";function vn(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${ct}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${ct}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${$a}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function k(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function _a(e){return e==="stokt"||e==="herstel"?"ember":e==="stijgt"?"sage":"fog"}function ut(e){const t=_a(e);return e==="stokt"||e==="herstel"||e==="zakt"?k("status-kink",`ico-${t}`):e==="stijgt"?k("status-up",`ico-${t}`):k("status-flat",`ico-${t}`)}function xa(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${k(n?"dot-now":"dot")}</button>`}).join("")}const Sa=`
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
</svg>`;function La(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",Sa)}const F=()=>document.querySelector("#app"),o={screen:"vandaag",skipItemId:null,missKey:null,detailItemId:null,advanceWarn:!1,busy:!1,error:null,startIds:[],addKind:"gedrag",addLabel:"",addTiming:"",editKind:"gedrag",editLabel:"",editTiming:"",removeAsk:!1,importPaste:"",confirmBeats:{}},ce=new Map;let p=null,l=null;function ie(){if(!l)throw new Error("geen snapshot");const e=U(l.items);return sa(l.vector,l.stage,ei(l.events,e),b())}function G(e,t=b()){if(!l)throw new Error("geen snapshot");const n=U(l.items),i=Y(l.events,e,n?.id),r=e.a===null?null:qt(e.a,i);return{done:en(i,t),plus:tn(i,t),skip:Qt(i,t),logged:nn(i,t),current:r}}function gn(e,t){return`${e}:${t}`}function Ia(e=b()){const t=l?.events??[];return St({today:e,now:new Date,wakeAt:Ue(e,Fe(t,e)),mealAt:Zt(e,Ve(t,e)),sleepSet:Pe(t,e)!==null,energySet:qe(t,e)!==null})}function f(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function h(){if(!l||!p)return;const e=gi(l);if(e){F().innerHTML=Pa(e);return}const t=ie(),{vector:n,stage:i}=l,r=p.mode==="local"?"Lokaal":"Supabase",a=`
    <div class="hdr">
      <div>
        ${vn()}
        <div class="date-s">${Bn(b())}</div>
      </div>
      <div class="mode-pill">${r}</div>
    </div>`,s=`
    <nav class="nav nav-4">
      <button data-nav="vandaag" class="${o.screen==="vandaag"?"active":""}">${k("day")}Vandaag</button>
      <button data-nav="koers" class="${o.screen==="koers"?"active":""}">${k("mark")}Koers</button>
      <button data-nav="voortgang" class="${o.screen==="voortgang"?"active":""}">${k("line")}Voortgang</button>
      <button data-nav="profiel" class="${o.screen==="profiel"?"active":""}">${k("me")}Profiel</button>
    </nav>`;if(o.detailItemId){const d=l.items.find(c=>c.id===o.detailItemId);if(d){F().innerHTML=`
      ${a}
      ${Ha(d)}
      ${o.error?`<p class="error" style="padding:0 18px">${f(o.error)}</p>`:""}
      ${s}`;return}o.detailItemId=null}if(o.screen==="vandaag"){const d=_i(l.profile.identity_new,l.events),c=b(),g=Ia(c),u=At(l.items,c).filter(m=>re(m,g)),y=Xn(l.items,c),$=jt(l.items,c).filter(m=>re(m,g)),j=Bt(l.items,c).filter(m=>re(m,g)),O=Qn(l.items,c),C=Zn(l.items,c),v=sn(l.items,l.events,c,se(l.items));F().innerHTML=`
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
                value="${t.wake===null?"":Jt(t.wake)}"
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
                value="${t.meal===null?"":Zi(t.meal)}"
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
          <div class="dots">${xa(t.energy)}</div>
        </div>
      </div>
      ${C.length?`<div class="sec-hd">Dag</div>
      <div class="card quiet">
        <div class="day-tags">${C.map(m=>qa(m)).join("")}</div>
      </div>`:""}
      ${y.length?`<div class="sec-hd">Regel</div>${y.map(m=>Ua(m)).join("")}`:""}
      ${$.length?`<div class="sec-hd">Stofjes</div>${$.map(m=>ft(m)).join("")}`:""}
      ${j.length?`<div class="sec-hd">Sociaal</div>${j.map(m=>ft(m)).join("")}`:""}
      ${v.length?`<div class="sec-hd">Niet gedaan</div>
      <div class="card">
        <div class="note" style="margin-top:0">Geen +1, Done of Skip. Korte reden.</div>
        ${v.map(m=>bn(m)).join("")}
      </div>`:""}
      <div class="sec-hd">Vandaag</div>
      ${u.map(m=>Ya(m,t,d)).join("")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Niet in je start. Blijft bewaard.</div>
        ${O.map(m=>Ca(m)).join("")}
        <button class="btn ghost later-add" data-nav="profiel">Eigen item</button>
      </div>
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${ut(t.trend.word)}
          <div class="word">${t.trend.word}</div>
        </div>
      </div>
      ${o.error?`<p class="error" style="padding:0 18px">${f(o.error)}</p>`:""}
      ${s}`;return}if(o.screen==="koers"){F().innerHTML=`
      ${a}
      ${vt(l.profile.themes,"Tik een suggestie of typ zelf. Geen vaste lijst. Later aan te passen.")}
      ${mt(on(l.items,l.events,b(),se(l.items)))}
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
            <div class="val status">${ut(t.trend.word)} ${t.trend.word}</div>
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
      ${Si(l.profile.horizon_1y,l.rotated)?'<div class="banner">Zet een 1-jaars B. Etappes roteren.</div>':""}
      <div class="sec-hd">${k("ik")} Ik</div>
      <div class="card">
        <div class="field">
          <div class="lbl">Leven dat ik weiger</div>
          <textarea data-id="identity_anti" maxlength="${x.identity_anti}">${f(l.profile.identity_anti??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wie ik word</div>
          <textarea data-id="identity_new" maxlength="${x.identity_new}">${f(l.profile.identity_new??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wat B niet mag schenden</div>
          <textarea data-id="identity_constraint" maxlength="${x.identity_constraint}">${f(l.profile.identity_constraint??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">1-jaars B</div>
          <textarea data-id="horizon_1y" maxlength="${x.horizon_1y}">${f(l.profile.horizon_1y??"")}</textarea>
        </div>
        <button class="btn primary" data-act="save-ik">Bewaar</button>
      </div>
      ${pt()}
      ${o.error?`<p class="error" style="padding:0 18px">${f(o.error)}</p>`:""}
      ${s}`;return}if(o.screen==="voortgang"){const d=ma(l.items,l.events,b(),l.vector.a,se(l.items));F().innerHTML=`
      ${a}
      ${mt(d.week)}
      <div class="sec-hd">Lijn</div>
      <div class="card">
        <div class="note" style="margin-top:0">Huidige deze week. Geen score.</div>
        ${Wa(d.line.map(c=>c.current),b(),d.line)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Nu</div><div class="val">${T(t.current)}</div></div>
          <div><div class="lbl">Gedaan</div><div class="val">${d.hits}</div></div>
        </div>
      </div>
      ${za(d.weight)}
      ${o.error?`<p class="error" style="padding:0 18px">${f(o.error)}</p>`:""}
      ${s}`;return}if(o.screen==="profiel"){const d=l.profile.goals??[],c=l.profile.age_band,g=vi(l.items);F().innerHTML=`
      ${a}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="note" style="margin-top:0">Later aan te passen. Geen wipe.</div>
        <div class="chips">${Re.map(u=>`<button class="chip pick ${d.includes(u.id)?"on":""}" data-act="onboard-goal" data-goal="${u.id}">${u.label}</button>`).join("")}</div>
      </div>
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="note" style="margin-top:0">Alleen een band. Geen geboortedatum.</div>
        <div class="chips">${Ge.map(u=>`<button class="chip pick ${c===u?"on":""}" data-act="onboard-age" data-age="${u}">${u}</button>`).join("")}</div>
      </div>
      ${vt(l.profile.themes,"Tik een suggestie of typ zelf. Later aan te passen.")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Parkeren of terughalen. Events blijven.</div>
        ${g.map(u=>Na(u)).join("")}
      </div>
      ${Oa(l.items)}
      ${Ka()}
      ${pt()}
      ${o.error?`<p class="error" style="padding:0 18px">${f(o.error)}</p>`:""}
      ${s}`;return}}function yn(e){const t=ce.get(e);if(t&&window.clearTimeout(t),ce.delete(e),!(e in o.confirmBeats))return;const n={...o.confirmBeats};delete n[e],o.confirmBeats=n}function Ea(e){yn(e),o.confirmBeats={...o.confirmBeats,[e]:Date.now()},ce.set(e,window.setTimeout(()=>{if(ce.delete(e),!(e in o.confirmBeats))return;const t={...o.confirmBeats};delete t[e],o.confirmBeats=t,h()},cn))}function Ze(e){const t=o.confirmBeats[e.id];if(!t)return null;const n=Date.now()-t;if(n>=cn)return null;const i=G(e),r=pa({plus:i.plus,done:i.done,skip:i.skip,type:e.type,track:te(e)});return r?{confirm:r,elapsed:n}:null}function he(e,t){const n=Ze(e);return!n||n.confirm.beat!==t?"":` beat-${t}`}function we(e,t){const n=Ze(e);return!n||n.confirm.beat!==t?"":` data-confirm="${t}" style="animation-delay:-${n.elapsed}ms"`}function Ma(e){const t=Ze(e);return t?`<span class="sr-only" role="status" data-confirm="${t.confirm.beat}">${f(t.confirm.text)}</span>`:""}function Ta(e){if(!l)return"";const t=U(l.items);return Ye(Y(l.events,e,t?.id),b())?`<button class="undo" type="button" data-act="undo" data-item="${e.id}">Ongedaan</button>`:""}function Xe(e){return`${Ma(e)}${Ta(e)}`}function ft(e){const t=G(e),n=t.logged||!!t.skip,i=e.type==="medicijn"?"Genomen":"Done",r=me(e);return`
      <div class="card stof">
        ${Qe(e)}
        ${r?`<div class="note">${f(r)}</div>`:""}
        <div class="actions actions-two">
          <button class="btn ico-btn ${t.done?"track":""}${he(e,"check")}" data-act="done" data-item="${e.id}" ${n?"disabled":""}${we(e,"check")}>${k("done")}<span>${i}</span></button>
          <button class="btn ico-btn skip ${t.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${t.logged?"disabled":""}>${k("skip")}<span>Skip</span></button>
        </div>
        ${o.skipItemId===e.id||t.skip?`<div class="chips">${ue.map(a=>`<button class="chip ${t.skip===a?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${a}">${a}</button>`).join("")}</div>`:""}
        ${Xe(e)}
      </div>`}function Aa(e,t,n,i){return`<div class="chips">${ue.map(r=>`<button class="chip ${n===r?"on":""}" data-act="${i}" data-item="${e}" data-date="${t}" data-reason="${r}">${r}</button>`).join("")}</div>`}function bn(e){const t=o.missKey===gn(e.item.id,e.date)||!!e.reason;return`
      <div class="miss-row">
        <button class="miss-item" data-act="miss-open" data-item="${e.item.id}" data-date="${e.date}">
          <span class="ex-nm">${f(e.item.label)}</span>
          <span class="note">${e.reason?f(e.reason):z(e.date)}</span>
        </button>
        ${t?Aa(e.item.id,e.date,e.reason,"miss"):""}
      </div>`}function ja(e){const t=[];return e.hits&&t.push(`${e.hits} gedaan`),e.skips&&t.push(`${e.skips} overgeslagen`),e.misses&&t.push(`${e.misses} niet gedaan`),t.length===0?"Nog geen dagen deze week.":t.join(" · ")}function Ba(e){return e==="skip"?"–":e==="miss"?"×":"·"}function mt(e){return`
      <div class="sec-hd">Week</div>
      <div class="card">
        <div class="note" style="margin-top:0">${f(e.range)}</div>
        <div class="week-strip" aria-label="Weekoverzicht">
          ${e.days.map(t=>`<div class="week-day ${t.mark}${t.date===b()?" today":""}">
            <span class="week-lbl">${t.label}</span>
            <span class="week-mark">${Ba(t.mark)}</span>
          </div>`).join("")}
        </div>
        <div class="note">${f(ja(e))}</div>
        ${e.note?`<div class="week-note">${f(e.note)}</div>`:""}
        ${e.missRows.length?e.missRows.map(t=>bn(t)).join(""):""}
      </div>`}function kn(e){return _t(e)||R(e)?`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${f(e.label)}</button>`:`<div class="ex-nm">${f(e.label)}</div>`}function Ca(e){return`
      <div class="later-row">
        ${kn(e)}
        <button class="btn ghost later-now" data-act="later-now" data-item="${e.id}">Nu</button>
      </div>`}function Na(e){const t=e.later;return`
      <div class="later-row">
        <div>
          ${kn(e)}
          <div class="note" style="margin-top:4px">${t?"Later":"Nu"}</div>
        </div>
        <button class="btn ghost later-now" data-act="${t?"later-now":"later-park"}" data-item="${e.id}">${t?"Nu":"Later"}</button>
      </div>`}function Da(e){const t=je[Nt(e)],n=Dt(e);return`
      <div class="later-row">
        <div>
          <button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${f(e.label)}</button>
          <div class="note" style="margin-top:4px">${f(t)}${n?` · ${f(n)}`:""}</div>
        </div>
        <button class="btn ghost later-now" data-act="detail-open" data-item="${e.id}">Wijzig</button>
      </div>`}function Oa(e){const t=ii(e);return t.length===0?"":`
      <div class="sec-hd">Eigen items</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Label, type of tijd. Weg haalt het uit Vandaag. Log blijft.</div>
        ${t.map(n=>Da(n)).join("")}
      </div>`}function pt(){return`
      <div class="card stack io-card">
        <button class="btn ghost ico-btn" data-act="export">${k("export")}<span>Exporteer JSON</span></button>
        <div class="note" style="margin-top:4px">Voegt toe. Bestaande rijen blijven.</div>
        <button class="btn ghost ico-btn" data-act="import-pick">${k("import")}<span>Kies bestand</span></button>
        <input data-id="import-file" class="import-file" type="file" accept="application/json,.json" />
        <div class="field">
          <div class="lbl">Of plak JSON</div>
          <textarea data-id="import-paste" placeholder='{"key":"routine_loop_v6"}'>${f(o.importPaste)}</textarea>
        </div>
        <button class="btn ghost ico-btn" data-act="import-go">${k("import")}<span>Importeer JSON</span></button>
      </div>`}function Ka(){return`
      <div class="sec-hd">Eigen item</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Label, type, optioneel tijdstip. Geen dosis. Bestaande items blijven.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="item-label" type="text" maxlength="${Be}" placeholder="Bijv. Avondwandeling" autocomplete="off" enterkeyhint="done" value="${f(o.addLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${Te.map(e=>`<button class="chip pick ${o.addKind===e?"on":""}" data-act="item-kind" data-kind="${e}">${je[e]}</button>`).join("")}</div>
        <div class="field" style="margin-top:12px">
          <div class="lbl">Tijd</div>
          <input data-id="item-timing" type="text" maxlength="${Ce}" placeholder="22:00 of ochtend" autocomplete="off" enterkeyhint="done" value="${f(o.addTiming)}" />
        </div>
        <div class="stack">
          <button class="btn primary" data-act="item-add">Voeg toe</button>
        </div>
      </div>`}function Ra(e){if(e.length===0)return"";const t=z(e[0].date),n=z(e[e.length-1].date);return t===n?t:`${t} – ${n}`}function Ga(e){const i=ln(e.map(s=>s.kg),294,72);if(i.length===0)return"";const r=i.length-1,a=i.map((s,d)=>{const c=d===r;return`<circle class="${c?"prog-dot now":"prog-dot"}" cx="${s.x.toFixed(1)}" cy="${s.y.toFixed(1)}" r="${c?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${dn(i)}" />
          ${a}
        </svg>`}function za(e){if(e.length===0)return"";const t=e[e.length-1];return`
      <div class="sec-hd">Gewicht</div>
      <div class="card">
        <div class="note" style="margin-top:0">${f(Ra(e))}</div>
        ${Ga(e)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Laatst</div><div class="val">${t.kg.toFixed(1)} kg</div></div>
        </div>
      </div>`}function Wa(e,t,n){const a=ln(e,294,72);if(a.length===0)return'<div class="note">Nog geen lijn.</div>';const s=a.map((d,c)=>{const g=n[c]?.date===t;return`<circle class="${n[c]?.mark==="miss"?"prog-dot miss":g?"prog-dot now":"prog-dot"}" cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${g?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${dn(a)}" />
          ${s}
        </svg>`}function vt(e,t){return`
      <section class="theme-sec" data-sec="themes">
        <div class="sec-hd">Thema's</div>
        <div class="card">
          <div class="ex-nm">Trainingsrichting</div>
          <div class="note">${f(t)}</div>
          ${Pt(e)}
        </div>
      </section>`}function Pa(e){if(!l)return"";const t=l.profile.goals??[],n=l.profile.age_band,i=yi(l.items,t),r=o.startIds,a=`
    <div class="hdr">
      <div>
        ${vn()}
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
      </div>`;if(e==="themes"){const s=l.profile.themes??[];return`
      ${a}
      <div class="sec-hd">Thema's</div>
      <div class="card">
        <div class="ex-nm">Trainingsrichting</div>
        <div class="note">Tik een suggestie of typ zelf. Mag leeg. Later aan te passen.</div>
        ${Pt(s)}
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
    </div>`}function Qe(e){return!_t(e)&&!R(e)?`<div class="ex-nm">${f(e.label)}</div>`:`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${f(e.label)}</button>`}function qa(e){return`<button class="chip pick" data-act="detail-open" data-item="${e.id}">${f(e.label)}</button>`}function Ha(e){const t=Le(e),n=me(e),i=Vn(e.timing),r=Un(e.timing),a=Ct(e),s=Ee(e),d=P(e),c=R(e);return`
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
        ${Xe(e)}
      </div>
      ${t?`<div class="sec-hd">Bron</div>
      <div class="card quiet">
        <div class="src-tag">${f(t)}</div>
      </div>`:""}
      ${c?Fa():Va(e)}`}function Fa(){return`
      <div class="sec-hd">Wijzig</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Zelfde item. Geen dosis. Log blijft.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="edit-label" type="text" maxlength="${Be}" placeholder="Naam" autocomplete="off" enterkeyhint="done" value="${f(o.editLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${Te.map(e=>`<button class="chip pick ${o.editKind===e?"on":""}" data-act="edit-kind" data-kind="${e}">${je[e]}</button>`).join("")}</div>
        <div class="field" style="margin-top:12px">
          <div class="lbl">Tijd</div>
          <input data-id="edit-timing" type="text" maxlength="${Ce}" placeholder="22:00 of ochtend" autocomplete="off" enterkeyhint="done" value="${f(o.editTiming)}" />
        </div>
        <div class="stack">
          <button class="btn primary" data-act="item-save">Bewaar</button>
          ${o.removeAsk?`<div class="note">Weg uit Vandaag. Log blijft.</div>
          <button class="btn primary" data-act="item-remove">Bevestig</button>
          <button class="btn ghost" data-act="item-remove-cancel">Niet nu</button>`:'<button class="btn ghost" data-act="item-remove-ask">Weg</button>'}
        </div>
      </div>`}function Va(e){return Oe(e)?e.later?`
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
      </div>`:""}function Ua(e){const t=me(e);return`
      <div class="card quiet">
        ${Qe(e)}
        ${t?`<div class="note">${f(t)}</div>`:'<div class="note">Regel. Geen afvinken.</div>'}
      </div>`}function Ya(e,t,n){const i=G(e),r=te(e),a=i.logged||!!i.skip,s=r&&i.current!==null&&e.b!==null&&i.current>=e.b,d=a||s,c=r,g=Ct(e),u=me(e),y=c&&t.suggestedMilestone&&e.id===l.vector.id;return`
      <div class="card">
        ${Qe(e)}
        ${u&&!g&&!r?`<div class="note">${f(u)}</div>`:""}
        ${r?`<div class="track">
          <span class="now">${T(i.current??e.a??0)}</span>
          <span>→</span>
          <span class="mid">${T(e.milestone??0)}</span>
          <span>→</span>
          <span class="end">${T(e.b??0)}</span>
        </div>`:g?`<div class="work">${f(g)}</div>`:""}
        <div class="actions ${r?"":"actions-two"}">
          ${r?`<button class="btn ico-btn ${i.plus?"on":""}${he(e,"fade")}" data-act="plus" data-item="${e.id}" ${d?"disabled":""}${we(e,"fade")}>${k("plus")}<span>+1</span></button>`:""}
          <button class="btn ico-btn ${i.done?"track":""}${he(e,"check")}" data-act="done" data-item="${e.id}" ${a?"disabled":""}${we(e,"check")}>${k("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${i.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${i.logged?"disabled":""}>${k("skip")}<span>Skip</span></button>
        </div>
        ${o.skipItemId===e.id||i.skip?`<div class="chips">${ue.map($=>`<button class="chip ${i.skip===$?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${$}">${$}</button>`).join("")}</div>`:""}
        ${Xe(e)}
        ${y?`<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${T(t.suggestedMilestone)}.</div>
               ${o.advanceWarn&&l.profile.identity_constraint?`<div class="banner">Check: ${f(l.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${T(t.suggestedMilestone)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`:`<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${t.suggestedMilestone}">Volgende etappe ${T(t.suggestedMilestone)}</button>
                      </div>`}`:""}
        ${c&&n?`<div class="note">${f(n)}</div>`:""}
      </div>`}function T(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function I(e){if(!o.busy){o.busy=!0,o.error=null;try{await e()}catch(t){o.error=t instanceof Error?t.message:"Er ging iets mis"}finally{o.busy=!1,h()}}}async function Ja(e){p=e,l=await p.load(),o.screen="vandaag",h()}async function Za(){La(),Xa(),await Ja(wa())}function Xa(){document.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const t=e.target;if(t instanceof HTMLInputElement){if(t.dataset.id==="theme-custom"){e.preventDefault(),Sn();return}if(t.dataset.id==="item-label"||t.dataset.id==="item-timing"){e.preventDefault(),xn();return}if(t.dataset.id==="edit-label"||t.dataset.id==="edit-timing"){e.preventDefault(),_n();return}if(t.dataset.id==="weight"){e.preventDefault(),yt(t.value);return}if(t.dataset.id==="wake"){e.preventDefault(),bt(t.value);return}t.dataset.id==="meal"&&(e.preventDefault(),kt(t.value))}}),document.addEventListener("change",e=>{const t=e.target;if(t instanceof HTMLInputElement&&(t.dataset.id==="weight"&&yt(t.value),t.dataset.id==="wake"&&bt(t.value),t.dataset.id==="meal"&&kt(t.value),t.dataset.id==="import-file"&&t.files?.[0])){const n=t.files[0];t.value="",n.text().then(i=>hn(i))}}),document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(Mn(n)){o.screen=n,o.skipItemId=null,o.missKey=null,o.detailItemId=null,o.advanceWarn=!1,o.error=null,h();return}Qa(t)})}async function Qa(e){const t=e.dataset.act;if(!t)return;const n=B("import-paste");if(n!==null&&(o.importPaste=n),!p||!l)return;const i=ie(),r=b();if(t==="sleep-inc"||t==="sleep-dec"){const a=i.sleep??7,s=Math.max(0,Math.min(14,a+(t==="sleep-inc"?.5:-.5)));await M({date:r,kind:"body_sleep",value:s,skip_reason:null,item_id:null});return}if(t==="energy"){const a=Number(e.dataset.n),s=i.energy===a?null:a;if(s===null)return;await M({date:r,kind:"body_energy",value:s,skip_reason:null,item_id:null});return}if(t==="weight-inc"||t==="weight-dec"){const a=Wi(i.weight,zi(l.events),t==="weight-inc"?.1:-.1);if(i.weight===a)return;await M({date:r,kind:"body_weight",value:a,skip_reason:null,item_id:null});return}if(t==="wake-inc"||t==="wake-dec"){const a=Ui(i.wake,Fi(l.events),t==="wake-inc"?15:-15);if(i.wake===a)return;await M({date:r,kind:"body_wake",value:a,skip_reason:null,item_id:null});return}if(t==="meal-inc"||t==="meal-dec"){const a=Yi(i.meal,Vi(l.events),t==="meal-inc"?15:-15);if(i.meal===a)return;await M({date:r,kind:"body_meal",value:a,skip_reason:null,item_id:null});return}if(t==="plus"){const a=l.items.find(d=>d.id===e.dataset.item);if(!a||!te(a))return;const s=G(a);if(s.logged||s.skip||a.b!==null&&s.current!==null&&s.current>=a.b)return;await M({date:r,kind:"set",value:(s.current??a.a??0)+1,skip_reason:null,item_id:a.id},a.id);return}if(t==="done"){const a=l.items.find(d=>d.id===e.dataset.item);if(!a)return;const s=G(a);if(s.logged||s.skip)return;await M({date:r,kind:"done",value:s.current??a.a,skip_reason:null,item_id:a.id},a.id);return}if(t==="detail-open"){const a=e.dataset.item??null,s=a?l.items.find(d=>d.id===a):void 0;if(!s)return;$n(s),o.detailItemId=s.id,h();return}if(t==="detail-close"){o.detailItemId=null,h();return}if(t==="skip-open"){const a=e.dataset.item??null;o.skipItemId=o.skipItemId===a?null:a,h();return}if(t==="skip"){const a=l.items.find(c=>c.id===e.dataset.item);if(!a||G(a).logged)return;const d=e.dataset.reason;if(!et(d))return;await M({date:r,kind:"skip",value:null,skip_reason:d,item_id:a.id}),o.skipItemId=null;return}if(t==="undo"){const a=l.items.find(c=>c.id===e.dataset.item);if(!a)return;const s=U(l.items),d=Ye(Y(l.events,a,s?.id),r);if(!d)return;yn(a.id),await er(d.id),o.skipItemId=null;return}if(t==="miss-open"){const a=e.dataset.item,s=e.dataset.date;if(!a||!s)return;const d=gn(a,s);o.missKey=o.missKey===d?null:d,h();return}if(t==="miss"){const a=l.items.find(g=>g.id===e.dataset.item),s=e.dataset.date,d=e.dataset.reason;if(!a||!s||s>=r||!et(d))return;const c=G(a,s);if(c.logged||c.skip)return;await M({date:s,kind:"miss",value:null,skip_reason:d,item_id:a.id}),o.missKey=null;return}if(t==="advance"){if(!i.suggestedMilestone)return;if(xi(l.profile.identity_constraint)&&!o.advanceWarn){o.advanceWarn=!0,h();return}await gt(i.suggestedMilestone);return}if(t==="advance-go"){if(!i.suggestedMilestone)return;await gt(i.suggestedMilestone);return}if(t==="advance-cancel"){o.advanceWarn=!1,h();return}if(t==="onboard-goal"){const a=e.dataset.goal;if(!a||!Rt(a))return;const s={...l.profile,goals:ki(l.profile.goals??[],a)};await I(async()=>{await p.saveProfile(s),l.profile=s});return}if(t==="onboard-age"){const a=e.dataset.age;if(!a||!Gt(a))return;const s={...l.profile,age_band:a};await I(async()=>{await p.saveProfile(s),l.profile=s});return}if(t==="theme-toggle"){const a=e.dataset.theme;if(!a)return;await _e(Li(D(l.profile.themes),a));return}if(t==="theme-add"){await Sn();return}if(t==="onboard-start"){const a=e.dataset.item;if(!a)return;o.startIds=hi(o.startIds,a),h();return}if(t==="onboard-next"){h();return}if(t==="onboard-themes-done"){await _e(l.profile.themes??[],!0);return}if(t==="onboard-done"){const a=l.profile.age_band,s=l.profile.goals??[];if(!a||s.length===0||o.startIds.length===0)return;await I(async()=>{await p.saveOnboarding({goals:s,age_band:a,startIds:o.startIds}),l=await p.load(),o.screen="vandaag"});return}if(t==="later-now"||t==="later-park"){const a=e.dataset.item;if(!a)return;await I(async()=>{await p.setItemLater(a,t==="later-park"),l=await p.load()});return}if(t==="item-kind"){const a=e.dataset.kind;if(!at(a))return;wn(),o.addKind=a,h();return}if(t==="item-add"){await xn();return}if(t==="edit-kind"){const a=e.dataset.kind;if(!at(a))return;$e(),o.editKind=a,h();return}if(t==="item-save"){await _n();return}if(t==="item-remove-ask"){$e(),o.removeAsk=!0,h();return}if(t==="item-remove-cancel"){o.removeAsk=!1,h();return}if(t==="item-remove"){const a=o.detailItemId;if(!a)return;await I(async()=>{await p.removeItem(a),l=await p.load(),o.detailItemId=null,o.removeAsk=!1,o.screen="profiel"});return}if(t==="save-ik"){const a={...l.profile,identity_anti:A(B("identity_anti"),x.identity_anti),identity_new:A(B("identity_new"),x.identity_new),identity_constraint:A(B("identity_constraint"),x.identity_constraint),horizon_1y:A(B("horizon_1y"),x.horizon_1y)};await I(async()=>{await p.saveProfile(a),l.profile=a});return}if(t==="export"){jn(l);return}if(t==="import-pick"){document.querySelector("[data-id=import-file]")?.click();return}if(t==="import-go"){await hn(o.importPaste);return}}async function hn(e){const t=e.trim();if(!t){o.error=ee,h();return}await I(async()=>{l=await p.importJson(t),o.importPaste=""})}function wn(){o.addLabel=B("item-label")??o.addLabel,o.addTiming=B("item-timing")??o.addTiming}function $e(){o.editLabel=B("edit-label")??o.editLabel,o.editTiming=B("edit-timing")??o.editTiming}function $n(e){o.editLabel=e.label,o.editKind=Nt(e),o.editTiming=Dt(e),o.removeAsk=!1}async function _n(){!p||!l||!o.detailItemId||($e(),await I(async()=>{const e=await p.updateItem({id:o.detailItemId,label:o.editLabel,kind:o.editKind,timing:o.editTiming});l=await p.load(),$n(e),o.detailItemId=e.id}))}async function xn(){!p||!l||(wn(),await I(async()=>{await p.addItem({label:o.addLabel,kind:o.addKind,timing:o.addTiming}),l=await p.load(),o.addLabel="",o.addTiming=""}))}async function Sn(){if(!l)return;const e=B("theme-custom")??"",t=D(l.profile.themes),n=Ii(t,e);n.length===t.length&&n.every((i,r)=>i===t[r])||await _e(n)}async function _e(e,t=!1){if(!p||!l)return;const n=D(e),i={...l.profile,themes:n},r=t||!Kt(l);await I(async()=>{if(r){await p.saveThemes(n),l=await p.load();return}await p.saveProfile(i),l.profile=i})}function B(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function gt(e){await I(async()=>{l.stage=await p.advanceStage(l.stage,e),l.items=l.items.map(t=>t.id===l.stage.vector_id?{...t,milestone:e}:t),l.rotated=!0,o.advanceWarn=!1})}async function M(e,t){await I(async()=>{const n=await p.addEvent(e);l.events.push(n),t&&Ea(t)})}async function er(e){await I(async()=>{await p.removeEvent(e),l.events=l.events.filter(t=>t.id!==e)})}async function yt(e){if(!p||!l)return;const t=Pi(e);t!==null&&ie().weight!==t&&await M({date:b(),kind:"body_weight",value:t,skip_reason:null,item_id:null})}async function bt(e){if(!p||!l)return;const t=Yt(e);t!==null&&ie().wake!==t&&await M({date:b(),kind:"body_wake",value:t,skip_reason:null,item_id:null})}async function kt(e){if(!p||!l)return;const t=Ji(e);t!==null&&ie().meal!==t&&await M({date:b(),kind:"body_meal",value:t,skip_reason:null,item_id:null})}Za();
