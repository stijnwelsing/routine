(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();function Ue(e){return JSON.stringify({exported_at:new Date().toISOString(),profile:e.profile,items:e.items,stage:e.stage,events:e.events},null,2)}function Je(e){const t=new Blob([Ue(e)],{type:"application/json"}),n=URL.createObjectURL(t),s=document.createElement("a");s.href=n,s.download=`routine-${e.profile.id.slice(0,8)}.json`,s.click(),URL.revokeObjectURL(n)}const Ze="geen zin",S={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140};function C(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function Xe(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===Ze).length}function Qe(e,t){const n=C(e,S.identity_new);return!n||Xe(t)<2?null:n}function et(e){return!!C(e,S.identity_constraint)}function tt(e,t){return t&&!C(e,S.horizon_1y)}function he(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const _e=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],$e=["zo","ma","di","wo","do","vr","za"];function w(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${s}`}function I(e,t){const n=O(e);return n.setDate(n.getDate()+t),w(n)}function O(e){const[t,n,s]=e.split("-").map(Number);return new Date(t,n-1,s)}function nt(e){const t=O(e);return`${$e[t.getDay()]} ${t.getDate()} ${_e[t.getMonth()]}`}function R(e){const t=O(e);return`${t.getDate()} ${_e[t.getMonth()]}`}function it(e){return $e[O(e).getDay()]}function st(e){const t=O(e).getDay();return t===0?7:t}function ie(e){const t=O(e),n=t.getDay(),s=n===0?-6:1-n;return t.setDate(t.getDate()+s),w(t)}function se(e,t){const n=[];let s=e;for(;s<=t;)n.push(s),s=I(s,1);return n}function N(){return crypto.randomUUID()}function at(){return new Date().toISOString()}const rt=2,ot=6;function W(e,t){return e.created_at.localeCompare(t.created_at)}function ae(e,t,n){return e.filter(s=>s.date===t&&s.kind===n).sort(W).at(-1)}function we(e,t){return t.filter(s=>s.kind==="set").sort(W).at(-1)?.value??e}function lt(e,t){return ae(e,t,"body_sleep")?.value??null}function dt(e,t){return ae(e,t,"body_energy")?.value??null}function G(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip")).sort(W).at(-1)}function Se(e,t){const n=G(e,t);return n?.kind==="skip"?n.skip_reason:null}function xe(e,t){return G(e,t)?.kind==="done"}function Le(e,t){return G(e,t)?.kind==="set"}function Ee(e,t){const n=G(e,t);return n?.kind==="set"||n?.kind==="done"}function ct(e,t){return e!==null&&e<ot||t!==null&&t<=rt}function ut(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const s=Math.max(1,Math.ceil(n/2));return Math.min(t,e+s)}function q(e,t,n,s){if(t<s)return"empty";const i=G(e,t);return i?.kind==="done"||i?.kind==="set"?"done":i?.kind==="skip"?"skip":ae(e,t,"miss")?"miss":t>=n?"empty":"miss"}function ft(e,t,n="1970-01-01"){let s=0,i=t;for(let a=0;a<400;a+=1){const r=q(e,i,t,n);if(r==="done")s+=1;else if(r==="skip"||r==="empty"&&i===t){i=I(i,-1);continue}else break;i=I(i,-1)}return s}function pt(e,t,n){const s=ie(t),i=!n||n<s?s:n;let a=0,r=0;for(const c of se(i,t)){const u=q(e,c,t,n??i);u==="skip"||u==="empty"||(r+=1,u==="done"&&(a+=1))}return{hits:a,eligible:r}}function mt(e,t,n="1970-01-01",s=3){const i=q(e,t,t,n);if(i==="done"||i==="skip")return!1;const a=I(t,-1);if(a<n)return!1;const r=I(t,-s),c=n>r?n:r;return se(c,a).some(u=>q(e,u,t,n)==="miss")}function vt(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled&&!e.todayLogged?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function gt(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${ce(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${ce(e.milestone)}.`}function ce(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function yt(e,t,n){return t.filter(i=>i.kind==="set"&&i.date<=n).sort(W).at(-1)?.value??e}function kt(e,t,n,s){const i=we(e.a,n),a=lt(n,s),r=dt(n,s),c=xe(n,s),u=Le(n,s),b=Ee(n,s),d=Se(n,s),m=ct(a,r),g=i>=t.milestone,j=i>=e.b,h=mt(n,s,t.started_on),J=ie(s),f=yt(e.a,n,I(J,-1)),_=vt({current:i,weekStartCurrent:f,gearDown:m,stalled:h,milestoneHit:g,todayLogged:u||c||!!d});return{current:i,sleep:a,energy:r,doneToday:c,plusToday:u,setLoggedToday:b,skipToday:d,gearDown:m,milestoneHit:g,atB:j,trend:_,hitrate:pt(n,s,t.started_on),streak:ft(n,s,t.started_on),nextAction:gt({milestone:t.milestone,b:e.b,gearDown:m,milestoneHit:g,atB:j,stalled:h,doneToday:c,plusToday:u,skipToday:d}),suggestedMilestone:g&&!j&&!m?ut(t.milestone,e.b):null}}function bt(){return{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:null,condition:null}}function ht(e){return{mode:e?.mode??null,clock:e?.clock??null,anchor:e?.anchor??null,offset_min:e?.offset_min??null,window_min:e?.window_min??null,frequency:e?.frequency??null,condition:e?.condition??null}}function _t(e,t){if(e.timing.frequency==="weekly"||e.type==="weekly"){const s=e.weekdays??[];return s.length===0?!1:s.includes(st(t))}return!0}function Ie(e){return e.role==="constraint"}function je(e){return e.role!=="constraint"}function re(e){const t=e.timing;return t.condition?t.condition:t.mode==="relative"&&t.anchor==="wake"&&t.offset_min!==null?`${t.offset_min} min na opstaan`:t.mode==="relative"&&t.anchor==="meal"?"na eten":t.mode==="clock"&&t.clock?t.clock:null}function $t(e){return e.role?e.role:e.label.trim().toLowerCase()==="low carb"?"preference":null}function H(e){return e.a!==null&&e.b!==null&&e.milestone!==null}function wt(e,t){return _t(e,t)}function St(e,t){return{...e,tenant_id:e.tenant_id??t,weekdays:e.weekdays??null,times_per_week:e.times_per_week??null,timing:ht(e.timing),role:$t(e),template:e.template??null,later:!!e.later}}function oe(e){return e.type==="medicijn"||e.type==="supplement"}function Te(e,t){return V(e,t).filter(n=>je(n)&&!oe(n)&&!n.later)}function xt(e,t){return V(e,t).filter(Ie)}function Ae(e,t){return V(e,t).filter(n=>oe(n)&&!n.later)}function Lt(e,t){return V(e,t).filter(n=>n.later&&je(n))}function V(e,t){return e.filter(n=>wt(n,t)).sort((n,s)=>n.sort-s.sort)}function F(e){return e.find(H)}function Q(e){return e.kind==="body_sleep"||e.kind==="body_energy"||e.kind==="body_weight"}function Y(e,t,n){return e.filter(s=>Q(s)?!1:!!(s.item_id===t.id||s.item_id===null&&n&&t.id===n))}function Et(e,t){return t?[...e.filter(Q),...Y(e,t,t.id)]:e.filter(Q)}function It(e){return e.a===null?null:e.unit==="sec"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} s`:e.unit==="reps"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} reps`:String(e.a)}function K(e){return e.trim().toLowerCase()}function jt(e){const t=new Set,n=[];for(const s of e){const i=K(s.label);t.has(i)||(t.add(i),n.push(s))}return n}function Be(e,t,n){const s=jt(e),i=new Set(s.map(r=>K(r.label))),a=t.filter(r=>!i.has(K(r.label))).map(r=>({...r,tenant_id:n}));return[...s,...a]}function Tt(e){const t=new Map;for(const n of e)for(const s of n)t.has(s.id)||t.set(s.id,s);return[...t.values()].sort((n,s)=>n.created_at.localeCompare(s.created_at))}function At(e){return e?!!(e.identity_anti||e.identity_new||e.identity_constraint||e.horizon_1y||e.display_name):!1}function Bt(e,t,n,s){if(e.length===0)return null;const i=e.reduce((d,m)=>(m.events?.length??0)>(d.events?.length??0)?m:d),a=e.find(d=>At(d.profile))?.profile??i.profile,r=Be([i,...e.filter(d=>d!==i)].flatMap(d=>d.items??[]),t,s),c=new Map(r.map(d=>[K(d.label),d.id])),u=new Map;for(const d of e)for(const m of d.items??[]){const g=c.get(K(m.label));g&&m.id!==g&&u.set(m.id,g)}const b=Tt(e.map(d=>d.events??[])).map(d=>{if(!d.item_id)return d;const m=u.get(d.item_id);return m?{...d,item_id:m}:d});return{...i,profile:{...a,id:a.id||n,tenant_id:a.tenant_id||s},items:r,events:b}}function Ct(e,t,n,s){return Y(e,t,n).some(i=>(i.kind==="set"||i.kind==="done"||i.kind==="skip"||i.kind==="miss")&&i.date<s)}function Ce(e,t){return e.created_at.localeCompare(t.created_at)}function Mt(e,t,n){return e.filter(s=>s.date===t&&s.kind===n).sort(Ce).at(-1)}function Dt(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip"||n.kind==="miss")).sort(Ce).at(-1)}function ee(e,t){return[...Te(e,t),...Ae(e,t)]}function te(e,t,n,s,i){const a=Y(e,t,i),r=Dt(a,n);if(r?.kind==="set"||r?.kind==="done")return{item:t,date:n,mark:"hit",reason:null};if(r?.kind==="skip")return{item:t,date:n,mark:"skip",reason:r.skip_reason};const c=r?.kind==="miss"?r:Mt(a,n,"miss");return c?{item:t,date:n,mark:"miss",reason:c.skip_reason}:n>=s?{item:t,date:n,mark:"open",reason:null}:{item:t,date:n,mark:"idle",reason:null}}function Me(e,t,n,s){const i=I(n,-1);return ee(e,i).filter(a=>Ct(t,a,s,i)).map(a=>{const r=te(t,a,i,n,s);return r.mark==="hit"||r.mark==="skip"||r.mark==="miss"?r:{...r,mark:"miss",reason:null}}).filter(a=>a.mark==="miss"&&!a.reason)}function Ot(e,t,n){return e.some(s=>s.mark==="hit")?"hit":e.some(s=>s.mark==="miss")?"miss":e.some(s=>s.mark==="skip")?"skip":t===n?"open":"idle"}function Nt(e,t,n,s){const i=ie(n),a=I(i,6),r=Me(e,t,n,s),c=new Set(r.map(f=>`${f.item.id}:${f.date}`)),u=se(i,a).map(f=>{const k=ee(e,f).map(_=>{const Z=te(t,_,f,n,s);return c.has(`${_.id}:${f}`)?{...Z,mark:"miss",reason:Z.reason}:Z});return{date:f,label:it(f),mark:Ot(k,f,n),hits:k.filter(_=>_.mark==="hit").length,misses:k.filter(_=>_.mark==="miss").length,skips:k.filter(_=>_.mark==="skip").length}}),b=u.filter(f=>f.date<n),d=b.reduce((f,k)=>f+k.hits,0),m=b.reduce((f,k)=>f+k.misses,0),g=b.reduce((f,k)=>f+k.skips,0),j=b.flatMap(f=>ee(e,f.date).map(k=>{const _=te(t,k,f.date,n,s);return c.has(`${k.id}:${f.date}`)?{..._,mark:"miss",reason:_.reason}:_}).filter(k=>k.mark==="miss")),h=b.filter(f=>f.mark!=="idle").length,J=d>0&&m===0&&h>=2?"Week staat.":null;return{start:i,end:a,range:`${R(i)} – ${R(a)}`,days:u,hits:d,misses:m,skips:g,missRows:j,note:J}}function ue(e){return F(e)?.id}const P=3,De=[{id:"kracht",label:"Kracht"},{id:"eten",label:"Eten & drinken"},{id:"slaap",label:"Slaap"},{id:"stofjes",label:"Stofjes"},{id:"bewegen",label:"Bewegen"}],Oe=["18–29","30–39","40–49","50–59","60+"],zt={kracht:["Push-ups","Squats","Plank","Dead hang"],eten:["Niet snoepen","Low carb","Intermittent fasting","Geen alcohol"],slaap:["Koud douchen"],stofjes:["Medicijn ochtend","Vitamine D"],bewegen:["Wandelen na eten"]};function Ne(e){return Ie(e)||e.type==="weekly"?!1:e.type==="daily"||e.type==="leefregel"||e.type==="gedrag"||oe(e)}function ze(e){return!(e.onboarded!==!1||(e.events??[]).length>0)}function Rt(e){return ze(e)?e.profile.goals?.length?e.profile.age_band?e.theme_step!==!0?"themes":"start":"age":"goals":null}function Kt(e,t){const n=e.filter(Ne).sort((a,r)=>a.sort-r.sort);if(t.length===0)return n;const s=new Set(t.flatMap(a=>zt[a]??[])),i=n.filter(a=>s.has(a.label));return i.length>0?i:n}function Gt(e,t){const n=new Set(t.slice(0,P));return e.map(s=>Ne(s)?{...s,later:!n.has(s.id)}:{...s,later:!1})}function qt(e,t){return e.includes(t)?e.filter(n=>n!==t):[...e,t]}function Pt(e,t){return e.includes(t)?e.filter(n=>n!==t):e.length>=P?e:[...e,t]}function Wt(e){return De.some(t=>t.id===e)}function Ht(e){return Oe.includes(e)}const fe=["Military calisthenics","Kickbox","Spinnen"],Re=40;function le(e){const t=e.trim().replace(/\s+/g," ").slice(0,Re);return t.length>0?t:null}function B(e){if(!Array.isArray(e))return[];const t=new Set,n=[];for(const s of e){if(typeof s!="string")continue;const i=le(s);if(!i)continue;const a=i.toLowerCase();t.has(a)||(t.add(a),n.push(i))}return n}function Vt(e,t){const n=le(t);if(!n)return e;const s=n.toLowerCase();return e.some(i=>i.toLowerCase()===s)?e.filter(i=>i.toLowerCase()!==s):[...e,n]}function Ft(e,t){const n=le(t);if(!n)return e;const s=n.toLowerCase();return e.some(i=>i.toLowerCase()===s)?e:[...e,n]}function Yt(e){const n=B(e).filter(s=>!fe.some(i=>i.toLowerCase()===s.toLowerCase()));return[...fe,...n]}function pe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function Ke(e){const t=new Set(B(e).map(s=>s.toLowerCase()));return`<div class="chips">${Yt(e).map(s=>`<button class="chip pick ${t.has(s.toLowerCase())?"on":""}" data-act="theme-toggle" data-theme="${pe(s)}">${pe(s)}</button>`).join("")}</div>
        <div class="theme-add">
          <input data-id="theme-custom" type="text" maxlength="${Re}" placeholder="Eigen thema" autocomplete="off" enterkeyhint="done" />
          <button class="btn ghost" data-act="theme-add">Voeg toe</button>
        </div>`}const U=["geen tijd","geen energie","vergeten","geen zin","pijn"];function me(e){return!!(e&&U.includes(e))}const y={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},Ge="routine_loop_v6",Ut=["routine_loop_v5","routine_loop_v4","routine_loop_v3"],ve="routine_local_user_id",ge="routine_local_tenant_id",Jt="routine_local_chosen";function qe(e,t){return{id:e,tenant_id:t,display_name:null,...he(),age_band:null,goals:[],themes:[]}}function Pe(e,t,n=w()){return{id:N(),tenant_id:t,vector_id:e,milestone:y.milestone,started_on:n,deadline:I(n,y.windowDays),status:"active",stage_type:y.stageType}}function de(e){const t=n=>({id:N(),tenant_id:e,timing:bt(),role:null,template:null,later:!1,...n});return[t({type:"daily",label:"Push-ups",unit:"reps",a:y.a,b:y.b,milestone:y.milestone,weekdays:null,times_per_week:null,sort:0}),t({type:"daily",label:"Squats",unit:"reps",a:30,b:null,milestone:null,weekdays:null,times_per_week:null,sort:1}),t({type:"daily",label:"Plank",unit:"sec",a:60,b:null,milestone:null,weekdays:null,times_per_week:null,sort:2}),t({type:"daily",label:"Dead hang",unit:"sec",a:45,b:null,milestone:null,weekdays:null,times_per_week:null,sort:3}),t({type:"weekly",label:"Gerichte kracht",unit:null,a:null,b:null,milestone:null,weekdays:[],times_per_week:2,sort:4}),t({type:"leefregel",label:"Koud douchen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:5}),t({type:"leefregel",label:"Niet snoepen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:6}),t({type:"leefregel",label:"Low carb",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:7,role:"preference"}),t({type:"leefregel",label:"Intermittent fasting",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:8}),t({type:"leefregel",label:"Geen alcohol",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:9}),t({type:"gedrag",label:"Cafeïne 90 min na opstaan",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:10,role:"constraint",template:"public-framework",timing:{mode:"relative",clock:null,anchor:"wake",offset_min:90,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Wandelen na eten",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:11,role:"action",template:null,timing:{mode:"relative",clock:null,anchor:"meal",offset_min:0,window_min:null,frequency:"daily",condition:"na eten"}}),t({type:"medicijn",label:"Medicijn ochtend",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:12,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"ochtend"}}),t({type:"supplement",label:"Vitamine D",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:13,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}})]}function Zt(e,t){return{id:e.id,tenant_id:e.tenant_id,user_id:t,domain:y.domain,a:e.a??y.a,b:e.b??y.b,unit:e.unit==="sec"?"sec":"reps",pace_constraint:null}}function Xt(e,t=w(),n=N()){const s=qe(e,n),i=de(n),a=F(i)??i[0],r=Zt(a,e),c=Pe(r.id,n,t);return a.milestone!==null&&(c.milestone=a.milestone),{profile:s,items:i,vector:r,stage:c,events:[],rotated:!1,onboarded:!1,theme_step:!1}}function Qt(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,items:e.items.map(n=>H(n)?{...n,a:y.a,b:y.b,milestone:y.milestone,unit:y.unit}:n),vector:{...e.vector,a:y.a,b:y.b,unit:y.unit},stage:{...e.stage,milestone:y.milestone},events:e.events}:e}function en(){const e=localStorage.getItem(ve);if(e)return e;const t=N();return localStorage.setItem(ve,t),t}function tn(){const e=localStorage.getItem(ge);if(e)return e;const t=N();return localStorage.setItem(ge,t),t}function L(e){localStorage.setItem(Ge,JSON.stringify(e))}function nn(e){if(!e)return null;try{const t=JSON.parse(e);return!t||typeof t!="object"?null:t}catch{return null}}function sn(){return[Ge,...Ut].map(e=>nn(localStorage.getItem(e))).filter(e=>e!==null)}function an(e,t,n){const s=Be(e.items??[],de(n),n).map(i=>St(i,n));return{...e,profile:{...qe(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...he(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null,age_band:e.profile?.age_band??null,goals:Array.isArray(e.profile?.goals)?e.profile.goals:[],themes:B(e.profile?.themes)},items:s,vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(i=>({...i,tenant_id:i.tenant_id??n,item_id:i.item_id??null})),rotated:!!e.rotated,onboarded:e.onboarded??!0,theme_step:e.theme_step??!1}}function T(e,t){const n=sn();if(n.length===0){const a=Xt(e,w(),t);return L(a),a}const s=Bt(n,de(t),e,t)??n[0],i=Qt(an(s,e,t));return L(i),i}function rn(){localStorage.setItem(Jt,"1");const e=en(),t=tn();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return T(e,t)},async addEvent(n){const s=T(e,t),i={id:n.id??N(),tenant_id:t,user_id:e,item_id:n.item_id??null,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:at()};return s.events.push(i),L(s),i},async saveProfile(n){const s=T(e,t);s.profile=n,L(s)},async saveOnboarding(n){const s=T(e,t);s.profile={...s.profile,goals:n.goals,age_band:n.age_band,themes:B(s.profile.themes)},s.items=Gt(s.items,n.startIds),s.onboarded=!0,s.theme_step=!0,L(s)},async saveThemes(n){const s=T(e,t);s.profile={...s.profile,themes:B(n)},s.theme_step=!0,L(s)},async setItemLater(n,s){const i=T(e,t);i.items=i.items.map(a=>a.id===n?{...a,later:s}:a),L(i)},async saveVectorConstraint(n,s){const i=T(e,t);i.vector.id===n&&(i.vector.pace_constraint=s,L(i))},async advanceStage(n,s){const i=T(e,t),a=Pe(n.vector_id,t);return a.milestone=s,i.stage=a,i.items=i.items.map(r=>r.id===n.vector_id?{...r,milestone:s}:r),i.rotated=!0,L(i),a},async signOut(){}}}const ye="#F0ECE4",on="#3D6B5A";function We(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${ye}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${ye}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${on}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function $(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function ln(e){return e==="stokt"||e==="herstel"?"ember":e==="stijgt"?"sage":"fog"}function ke(e){const t=ln(e);return e==="stokt"||e==="herstel"||e==="zakt"?$("status-kink",`ico-${t}`):e==="stijgt"?$("status-up",`ico-${t}`):$("status-flat",`ico-${t}`)}function dn(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${$(n?"dot-now":"dot")}</button>`}).join("")}const cn=`
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
    <circle class="s" cx="12" cy="12" r="7" />
  </symbol>
  <symbol id="i-dot-now" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="7" fill="currentColor" />
  </symbol>
</svg>`;function un(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",cn)}const X=()=>document.querySelector("#app"),l={screen:"vandaag",skipItemId:null,missKey:null,advanceWarn:!1,busy:!1,error:null,startIds:[]};let v=null,o=null;function He(){if(!o)throw new Error("geen snapshot");const e=F(o.items);return kt(o.vector,o.stage,Et(o.events,e),w())}function D(e,t=w()){if(!o)throw new Error("geen snapshot");const n=F(o.items),s=Y(o.events,e,n?.id),i=e.a===null?null:we(e.a,s);return{done:xe(s,t),plus:Le(s,t),skip:Se(s,t),logged:Ee(s,t),current:i}}function Ve(e,t){return`${e}:${t}`}function p(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function E(){if(!o||!v)return;const e=Rt(o);if(e){X().innerHTML=bn(e);return}const t=He(),{vector:n,stage:s}=o,i=v.mode==="local"?"Lokaal":"Supabase",a=`
    <div class="hdr">
      <div>
        ${We()}
        <div class="date-s">${nt(w())}</div>
      </div>
      <div class="mode-pill">${i}</div>
    </div>`,r=`
    <nav class="nav">
      <button data-nav="vandaag" class="${l.screen==="vandaag"?"active":""}">${$("day")}Vandaag</button>
      <button data-nav="koers" class="${l.screen==="koers"?"active":""}">${$("mark")}Koers</button>
    </nav>`;if(l.screen==="vandaag"){const c=Qe(o.profile.identity_new,o.events),u=w(),b=Te(o.items,u),d=xt(o.items,u),m=Ae(o.items,u),g=Lt(o.items,u),j=Me(o.items,o.events,u,ue(o.items));X().innerHTML=`
      ${a}
      ${v.mode==="local"?'<div class="banner">Lokaal — geen Supabase. +1 / Done / Skip blijven op dit apparaat.</div>':""}
      ${t.gearDown?'<div class="banner hot">Lijf vraagt tempo omlaag. Etappe gaat niet omhoog.</div>':""}
      <div class="sec-hd">Lijf</div>
      <div class="card split">
        <div class="row">
          <div>
            <div class="lbl lbl-ico">${$("moon")} Slaap</div>
            <div class="note">Optioneel. Blokkeert de dag niet.</div>
          </div>
          <div class="num-row">
            <button class="nb" data-act="sleep-dec">−</button>
            <div class="ndisp">${t.sleep===null?"—":t.sleep.toFixed(1)}</div>
            <button class="nb" data-act="sleep-inc">+</button>
          </div>
        </div>
        <div>
          <div class="lbl">Energie</div>
          <div class="dots">${dn(t.energy)}</div>
        </div>
      </div>
      ${d.length?`<div class="sec-hd">Regel</div>${d.map(h=>hn(h)).join("")}`:""}
      ${m.length?`<div class="sec-hd">Stofjes</div>${m.map(h=>fn(h)).join("")}`:""}
      ${j.length?`<div class="sec-hd">Niet gedaan</div>
      <div class="card">
        <div class="note" style="margin-top:0">Geen +1, Done of Skip. Korte reden.</div>
        ${j.map(h=>Fe(h)).join("")}
      </div>`:""}
      <div class="sec-hd">Vandaag</div>
      ${b.map(h=>_n(h,t,c)).join("")}
      ${g.length?`<div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Niet in je start. Blijft bewaard.</div>
        ${g.map(h=>yn(h)).join("")}
      </div>`:""}
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${ke(t.trend.word)}
          <div class="word">${t.trend.word}</div>
        </div>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${p(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="koers"){X().innerHTML=`
      ${a}
      ${kn(o.profile.themes,"Tik een suggestie of typ zelf. Geen vaste lijst. Later aan te passen.")}
      ${gn(Nt(o.items,o.events,w(),ue(o.items)))}
      <div class="sec-hd">Strength · push-ups</div>
      <div class="card">
        <div class="kv">
          <div><div class="lbl">A</div><div class="val">${x(n.a)}</div></div>
          <div><div class="lbl">B</div><div class="val">${x(n.b)}</div></div>
          <div><div class="lbl">Nu</div><div class="val">${x(t.current)}</div></div>
          <div><div class="lbl">Etappe</div><div class="val">${x(s.milestone)}</div></div>
        </div>
      </div>
      <div class="card">
        <div class="kv">
          <div>
            <div class="lbl">Venster</div>
            <div class="val" style="font-size:1.15rem">${R(s.started_on)} → ${s.deadline?R(s.deadline):"—"}</div>
          </div>
          <div>
            <div class="lbl">Trend</div>
            <div class="val status">${ke(t.trend.word)} ${t.trend.word}</div>
          </div>
          <div>
            <div class="lbl">Rem</div>
            <div class="val" style="font-size:1.1rem">${p(n.pace_constraint||"—")}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="lbl">Volgende actie</div>
        <div class="action-line">${p(t.nextAction)}</div>
      </div>
      ${tt(o.profile.horizon_1y,o.rotated)?'<div class="banner">Zet een 1-jaars B. Etappes roteren.</div>':""}
      <div class="sec-hd">${$("ik")} Ik</div>
      <div class="card">
        <div class="field">
          <div class="lbl">Leven dat ik weiger</div>
          <textarea data-id="identity_anti" maxlength="${S.identity_anti}">${p(o.profile.identity_anti??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wie ik word</div>
          <textarea data-id="identity_new" maxlength="${S.identity_new}">${p(o.profile.identity_new??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wat B niet mag schenden</div>
          <textarea data-id="identity_constraint" maxlength="${S.identity_constraint}">${p(o.profile.identity_constraint??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">1-jaars B</div>
          <textarea data-id="horizon_1y" maxlength="${S.horizon_1y}">${p(o.profile.horizon_1y??"")}</textarea>
        </div>
        <button class="btn primary" data-act="save-ik">Bewaar</button>
      </div>
      <div class="card stack">
        <button class="btn ghost ico-btn" data-act="export">${$("export")}<span>Exporteer JSON</span></button>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${p(l.error)}</p>`:""}
      ${r}`;return}}function fn(e){const t=D(e),n=t.logged||!!t.skip,s=e.type==="medicijn"?"Genomen":"Done",i=re(e);return`
      <div class="card stof">
        <div class="ex-nm">${p(e.label)}</div>
        ${i?`<div class="note">${p(i)}</div>`:""}
        <div class="actions actions-two">
          <button class="btn ico-btn ${t.done?"track":""}" data-act="done" data-item="${e.id}" ${n?"disabled":""}>${$("done")}<span>${s}</span></button>
          <button class="btn ico-btn skip ${t.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${t.logged?"disabled":""}>${$("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||t.skip?`<div class="chips">${U.map(a=>`<button class="chip ${t.skip===a?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${a}">${a}</button>`).join("")}</div>`:""}
      </div>`}function pn(e,t,n,s){return`<div class="chips">${U.map(i=>`<button class="chip ${n===i?"on":""}" data-act="${s}" data-item="${e}" data-date="${t}" data-reason="${i}">${i}</button>`).join("")}</div>`}function Fe(e){const t=l.missKey===Ve(e.item.id,e.date)||!!e.reason;return`
      <div class="miss-row">
        <button class="miss-item" data-act="miss-open" data-item="${e.item.id}" data-date="${e.date}">
          <span class="ex-nm">${p(e.item.label)}</span>
          <span class="note">${e.reason?p(e.reason):R(e.date)}</span>
        </button>
        ${t?pn(e.item.id,e.date,e.reason,"miss"):""}
      </div>`}function mn(e){const t=[];return e.hits&&t.push(`${e.hits} gedaan`),e.skips&&t.push(`${e.skips} overgeslagen`),e.misses&&t.push(`${e.misses} niet gedaan`),t.length===0?"Nog geen dagen deze week.":t.join(" · ")}function vn(e){return e==="skip"?"–":e==="miss"?"×":"·"}function gn(e){return`
      <div class="sec-hd">Week</div>
      <div class="card">
        <div class="note" style="margin-top:0">${p(e.range)}</div>
        <div class="week-strip" aria-label="Weekoverzicht">
          ${e.days.map(t=>`<div class="week-day ${t.mark}${t.date===w()?" today":""}">
            <span class="week-lbl">${t.label}</span>
            <span class="week-mark">${vn(t.mark)}</span>
          </div>`).join("")}
        </div>
        <div class="note">${p(mn(e))}</div>
        ${e.note?`<div class="week-note">${p(e.note)}</div>`:""}
        ${e.missRows.length?e.missRows.map(t=>Fe(t)).join(""):""}
      </div>`}function yn(e){return`
      <div class="later-row">
        <div class="ex-nm">${p(e.label)}</div>
        <button class="btn ghost later-now" data-act="later-now" data-item="${e.id}">Nu</button>
      </div>`}function kn(e,t){return`
      <section class="theme-sec" data-sec="themes">
        <div class="sec-hd">Thema's</div>
        <div class="card">
          <div class="ex-nm">Trainingsrichting</div>
          <div class="note">${p(t)}</div>
          ${Ke(e)}
        </div>
      </section>`}function bn(e){if(!o)return"";const t=o.profile.goals??[],n=o.profile.age_band,s=Kt(o.items,t),i=l.startIds,a=`
    <div class="hdr">
      <div>
        ${We()}
        <div class="date-s">Start</div>
      </div>
    </div>`;if(e==="goals")return`
      ${a}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="ex-nm">Wat is je richting?</div>
        <div class="note">Eerst doelen. Types (gedrag, regel, medicijn, supplement) komen daarna.</div>
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
        ${Ke(r)}
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-themes-done">Verder</button>
        </div>
      </div>`}return`
    ${a}
    <div class="sec-hd">Start</div>
    <div class="card">
      <div class="ex-nm">Max ${P} nu</div>
      <div class="note">De rest gaat naar Later. Later blijft zichtbaar.</div>
      <div class="chips">${s.map(r=>`<button class="chip pick ${i.includes(r.id)?"on":""}" data-act="onboard-start" data-item="${r.id}">${p(r.label)}</button>`).join("")}</div>
      <div class="note">${i.length} / ${P} gekozen</div>
      <div class="stack" style="margin-top:16px">
        <button class="btn primary" data-act="onboard-done" ${i.length===0?"disabled":""}>Naar Vandaag</button>
      </div>
    </div>`}function hn(e){const t=re(e);return`
      <div class="card quiet">
        <div class="ex-nm">${p(e.label)}</div>
        ${t?`<div class="note">${p(t)}</div>`:'<div class="note">Regel. Geen afvinken.</div>'}
      </div>`}function _n(e,t,n){const s=D(e),i=H(e),a=s.logged||!!s.skip,r=i&&s.current!==null&&e.b!==null&&s.current>=e.b,c=a||r,u=i,b=It(e),d=re(e),m=u&&t.suggestedMilestone&&e.id===o.vector.id;return`
      <div class="card">
        <div class="ex-nm">${p(e.label)}</div>
        ${d&&!b&&!i?`<div class="note">${p(d)}</div>`:""}
        ${i?`<div class="track">
          <span class="now">${x(s.current??e.a??0)}</span>
          <span>→</span>
          <span class="mid">${x(e.milestone??0)}</span>
          <span>→</span>
          <span class="end">${x(e.b??0)}</span>
        </div>`:b?`<div class="work">${p(b)}</div>`:""}
        <div class="actions ${i?"":"actions-two"}">
          ${i?`<button class="btn ico-btn ${s.plus?"on":""}" data-act="plus" data-item="${e.id}" ${c?"disabled":""}>${$("plus")}<span>+1</span></button>`:""}
          <button class="btn ico-btn ${s.done?"track":""}" data-act="done" data-item="${e.id}" ${a?"disabled":""}>${$("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${s.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${s.logged?"disabled":""}>${$("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||s.skip?`<div class="chips">${U.map(g=>`<button class="chip ${s.skip===g?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${g}">${g}</button>`).join("")}</div>`:""}
        ${m?`<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${x(t.suggestedMilestone)}.</div>
               ${l.advanceWarn&&o.profile.identity_constraint?`<div class="banner">Check: ${p(o.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${x(t.suggestedMilestone)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`:`<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${t.suggestedMilestone}">Volgende etappe ${x(t.suggestedMilestone)}</button>
                      </div>`}`:""}
        ${u&&n?`<div class="note">${p(n)}</div>`:""}
      </div>`}function x(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function A(e){if(!l.busy){l.busy=!0,l.error=null;try{await e()}catch(t){l.error=t instanceof Error?t.message:"Er ging iets mis"}finally{l.busy=!1,E()}}}async function $n(e){v=e,o=await v.load(),l.screen="vandaag",E()}async function wn(){un(),Sn(),await $n(rn())}function Sn(){document.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const t=e.target;!(t instanceof HTMLInputElement)||t.dataset.id!=="theme-custom"||(e.preventDefault(),Ye())}),document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(n==="vandaag"||n==="koers"){l.screen=n,l.skipItemId=null,l.missKey=null,l.advanceWarn=!1,E();return}xn(t)})}async function xn(e){const t=e.dataset.act;if(!t||!v||!o)return;const n=He(),s=w();if(t==="sleep-inc"||t==="sleep-dec"){const i=n.sleep??7,a=Math.max(0,Math.min(14,i+(t==="sleep-inc"?.5:-.5)));await M({date:s,kind:"body_sleep",value:a,skip_reason:null,item_id:null});return}if(t==="energy"){const i=Number(e.dataset.n),a=n.energy===i?null:i;if(a===null)return;await M({date:s,kind:"body_energy",value:a,skip_reason:null,item_id:null});return}if(t==="plus"){const i=o.items.find(r=>r.id===e.dataset.item);if(!i||!H(i))return;const a=D(i);if(a.logged||a.skip||i.b!==null&&a.current!==null&&a.current>=i.b)return;await M({date:s,kind:"set",value:(a.current??i.a??0)+1,skip_reason:null,item_id:i.id});return}if(t==="done"){const i=o.items.find(r=>r.id===e.dataset.item);if(!i)return;const a=D(i);if(a.logged||a.skip)return;await M({date:s,kind:"done",value:a.current??i.a,skip_reason:null,item_id:i.id});return}if(t==="skip-open"){const i=e.dataset.item??null;l.skipItemId=l.skipItemId===i?null:i,E();return}if(t==="skip"){const i=o.items.find(c=>c.id===e.dataset.item);if(!i||D(i).logged)return;const r=e.dataset.reason;if(!me(r))return;await M({date:s,kind:"skip",value:null,skip_reason:r,item_id:i.id}),l.skipItemId=null;return}if(t==="miss-open"){const i=e.dataset.item,a=e.dataset.date;if(!i||!a)return;const r=Ve(i,a);l.missKey=l.missKey===r?null:r,E();return}if(t==="miss"){const i=o.items.find(u=>u.id===e.dataset.item),a=e.dataset.date,r=e.dataset.reason;if(!i||!a||a>=s||!me(r))return;const c=D(i,a);if(c.logged||c.skip)return;await M({date:a,kind:"miss",value:null,skip_reason:r,item_id:i.id}),l.missKey=null;return}if(t==="advance"){if(!n.suggestedMilestone)return;if(et(o.profile.identity_constraint)&&!l.advanceWarn){l.advanceWarn=!0,E();return}await be(n.suggestedMilestone);return}if(t==="advance-go"){if(!n.suggestedMilestone)return;await be(n.suggestedMilestone);return}if(t==="advance-cancel"){l.advanceWarn=!1,E();return}if(t==="onboard-goal"){const i=e.dataset.goal;if(!i||!Wt(i))return;const a={...o.profile,goals:qt(o.profile.goals??[],i)};await A(async()=>{await v.saveProfile(a),o.profile=a});return}if(t==="onboard-age"){const i=e.dataset.age;if(!i||!Ht(i))return;const a={...o.profile,age_band:i};await A(async()=>{await v.saveProfile(a),o.profile=a});return}if(t==="theme-toggle"){const i=e.dataset.theme;if(!i)return;await ne(Vt(B(o.profile.themes),i));return}if(t==="theme-add"){await Ye();return}if(t==="onboard-start"){const i=e.dataset.item;if(!i)return;l.startIds=Pt(l.startIds,i),E();return}if(t==="onboard-next"){E();return}if(t==="onboard-themes-done"){await ne(o.profile.themes??[],!0);return}if(t==="onboard-done"){const i=o.profile.age_band,a=o.profile.goals??[];if(!i||a.length===0||l.startIds.length===0)return;await A(async()=>{await v.saveOnboarding({goals:a,age_band:i,startIds:l.startIds}),o=await v.load(),l.screen="vandaag"});return}if(t==="later-now"){const i=e.dataset.item;if(!i)return;await A(async()=>{await v.setItemLater(i,!1),o=await v.load()});return}if(t==="save-ik"){const i={...o.profile,identity_anti:C(z("identity_anti"),S.identity_anti),identity_new:C(z("identity_new"),S.identity_new),identity_constraint:C(z("identity_constraint"),S.identity_constraint),horizon_1y:C(z("horizon_1y"),S.horizon_1y)};await A(async()=>{await v.saveProfile(i),o.profile=i});return}if(t==="export"){Je(o);return}}async function Ye(){if(!o)return;const e=z("theme-custom")??"",t=B(o.profile.themes),n=Ft(t,e);n.length===t.length&&n.every((s,i)=>s===t[i])||await ne(n)}async function ne(e,t=!1){if(!v||!o)return;const n=B(e),s={...o.profile,themes:n},i=t||!ze(o);await A(async()=>{if(i){await v.saveThemes(n),o=await v.load();return}await v.saveProfile(s),o.profile=s})}function z(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function be(e){await A(async()=>{o.stage=await v.advanceStage(o.stage,e),o.items=o.items.map(t=>t.id===o.stage.vector_id?{...t,milestone:e}:t),o.rotated=!0,l.advanceWarn=!1})}async function M(e){await A(async()=>{const t=await v.addEvent(e);o.events.push(t)})}wn();
