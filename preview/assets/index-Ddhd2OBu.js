(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();function Xe(e){return JSON.stringify({exported_at:new Date().toISOString(),profile:e.profile,items:e.items,stage:e.stage,events:e.events},null,2)}function et(e){const t=new Blob([Xe(e)],{type:"application/json"}),n=URL.createObjectURL(t),s=document.createElement("a");s.href=n,s.download=`routine-${e.profile.id.slice(0,8)}.json`,s.click(),URL.revokeObjectURL(n)}const tt="geen zin",S={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140};function M(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function nt(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===tt).length}function it(e,t){const n=M(e,S.identity_new);return!n||nt(t)<2?null:n}function st(e){return!!M(e,S.identity_constraint)}function at(e,t){return t&&!M(e,S.horizon_1y)}function Se(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const Le=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],je=["zo","ma","di","wo","do","vr","za"];function w(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${s}`}function I(e,t){const n=N(e);return n.setDate(n.getDate()+t),w(n)}function N(e){const[t,n,s]=e.split("-").map(Number);return new Date(t,n-1,s)}function rt(e){const t=N(e);return`${je[t.getDay()]} ${t.getDate()} ${Le[t.getMonth()]}`}function G(e){const t=N(e);return`${t.getDate()} ${Le[t.getMonth()]}`}function ot(e){return je[N(e).getDay()]}function lt(e){const t=N(e).getDay();return t===0?7:t}function se(e){const t=N(e),n=t.getDay(),s=n===0?-6:1-n;return t.setDate(t.getDate()+s),w(t)}function ae(e,t){const n=[];let s=e;for(;s<=t;)n.push(s),s=I(s,1);return n}function O(){return crypto.randomUUID()}function dt(){return new Date().toISOString()}const ct=2,ut=6;function F(e,t){return e.created_at.localeCompare(t.created_at)}function re(e,t,n){return e.filter(s=>s.date===t&&s.kind===n).sort(F).at(-1)}function Ee(e,t){return t.filter(s=>s.kind==="set").sort(F).at(-1)?.value??e}function ft(e,t){return re(e,t,"body_sleep")?.value??null}function pt(e,t){return re(e,t,"body_energy")?.value??null}function P(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip")).sort(F).at(-1)}function Ie(e,t){const n=P(e,t);return n?.kind==="skip"?n.skip_reason:null}function Te(e,t){return P(e,t)?.kind==="done"}function Ae(e,t){return P(e,t)?.kind==="set"}function Be(e,t){const n=P(e,t);return n?.kind==="set"||n?.kind==="done"}function mt(e,t){return e!==null&&e<ut||t!==null&&t<=ct}function vt(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const s=Math.max(1,Math.ceil(n/2));return Math.min(t,e+s)}function q(e,t,n,s){if(t<s)return"empty";const i=P(e,t);return i?.kind==="done"||i?.kind==="set"?"done":i?.kind==="skip"?"skip":re(e,t,"miss")?"miss":t>=n?"empty":"miss"}function gt(e,t,n="1970-01-01"){let s=0,i=t;for(let a=0;a<400;a+=1){const r=q(e,i,t,n);if(r==="done")s+=1;else if(r==="skip"||r==="empty"&&i===t){i=I(i,-1);continue}else break;i=I(i,-1)}return s}function yt(e,t,n){const s=se(t),i=!n||n<s?s:n;let a=0,r=0;for(const l of ae(i,t)){const u=q(e,l,t,n??i);u==="skip"||u==="empty"||(r+=1,u==="done"&&(a+=1))}return{hits:a,eligible:r}}function kt(e,t,n="1970-01-01",s=3){const i=q(e,t,t,n);if(i==="done"||i==="skip")return!1;const a=I(t,-1);if(a<n)return!1;const r=I(t,-s),l=n>r?n:r;return ae(l,a).some(u=>q(e,u,t,n)==="miss")}function bt(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled&&!e.todayLogged?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function ht(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${me(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${me(e.milestone)}.`}function me(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function Me(e,t,n){return t.filter(i=>i.kind==="set"&&i.date<=n).sort(F).at(-1)?.value??e}function $t(e,t,n,s){const i=Ee(e.a,n),a=ft(n,s),r=pt(n,s),l=Te(n,s),u=Ae(n,s),v=Be(n,s),d=Ie(n,s),p=mt(a,r),g=i>=t.milestone,L=i>=e.b,$=kt(n,s,t.started_on),Q=se(s),m=Me(e.a,n,I(Q,-1)),_=bt({current:i,weekStartCurrent:m,gearDown:p,stalled:$,milestoneHit:g,todayLogged:u||l||!!d});return{current:i,sleep:a,energy:r,doneToday:l,plusToday:u,setLoggedToday:v,skipToday:d,gearDown:p,milestoneHit:g,atB:L,trend:_,hitrate:yt(n,s,t.started_on),streak:gt(n,s,t.started_on),nextAction:ht({milestone:t.milestone,b:e.b,gearDown:p,milestoneHit:g,atB:L,stalled:$,doneToday:l,plusToday:u,skipToday:d}),suggestedMilestone:g&&!L&&!p?vt(t.milestone,e.b):null}}function _t(){return{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:null,condition:null}}function wt(e){return{mode:e?.mode??null,clock:e?.clock??null,anchor:e?.anchor??null,offset_min:e?.offset_min??null,window_min:e?.window_min??null,frequency:e?.frequency??null,condition:e?.condition??null}}function xt(e,t){if(e.timing.frequency==="weekly"||e.type==="weekly"){const s=e.weekdays??[];return s.length===0?!1:s.includes(lt(t))}return!0}function Ce(e){return e.role==="constraint"}function De(e){return e.role!=="constraint"}function oe(e){const t=e.timing;return t.condition?t.condition:t.mode==="relative"&&t.anchor==="wake"&&t.offset_min!==null?`${t.offset_min} min na opstaan`:t.mode==="relative"&&t.anchor==="meal"?"na eten":t.mode==="clock"&&t.clock?t.clock:null}function St(e){return e.role?e.role:e.label.trim().toLowerCase()==="low carb"?"preference":null}function V(e){return e.a!==null&&e.b!==null&&e.milestone!==null}function Lt(e,t){return xt(e,t)}function jt(e,t){return{...e,tenant_id:e.tenant_id??t,weekdays:e.weekdays??null,times_per_week:e.times_per_week??null,timing:wt(e.timing),role:St(e),template:e.template??null,later:!!e.later}}function le(e){return e.type==="medicijn"||e.type==="supplement"}function Ne(e,t){return U(e,t).filter(n=>De(n)&&!le(n)&&!n.later)}function Et(e,t){return U(e,t).filter(Ce)}function Oe(e,t){return U(e,t).filter(n=>le(n)&&!n.later)}function It(e,t){return U(e,t).filter(n=>n.later&&De(n))}function U(e,t){return e.filter(n=>Lt(n,t)).sort((n,s)=>n.sort-s.sort)}function Y(e){return e.find(V)}function ee(e){return e.kind==="body_sleep"||e.kind==="body_energy"||e.kind==="body_weight"}function J(e,t,n){return e.filter(s=>ee(s)?!1:!!(s.item_id===t.id||s.item_id===null&&n&&t.id===n))}function Tt(e,t){return t?[...e.filter(ee),...J(e,t,t.id)]:e.filter(ee)}function At(e){return e.a===null?null:e.unit==="sec"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} s`:e.unit==="reps"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} reps`:String(e.a)}function K(e){return e.trim().toLowerCase()}function Bt(e){const t=new Set,n=[];for(const s of e){const i=K(s.label);t.has(i)||(t.add(i),n.push(s))}return n}function ze(e,t,n){const s=Bt(e),i=new Set(s.map(r=>K(r.label))),a=t.filter(r=>!i.has(K(r.label))).map(r=>({...r,tenant_id:n}));return[...s,...a]}function Mt(e){const t=new Map;for(const n of e)for(const s of n)t.has(s.id)||t.set(s.id,s);return[...t.values()].sort((n,s)=>n.created_at.localeCompare(s.created_at))}function Ct(e){return e?!!(e.identity_anti||e.identity_new||e.identity_constraint||e.horizon_1y||e.display_name):!1}function Dt(e,t,n,s){if(e.length===0)return null;const i=e.reduce((d,p)=>(p.events?.length??0)>(d.events?.length??0)?p:d),a=e.find(d=>Ct(d.profile))?.profile??i.profile,r=ze([i,...e.filter(d=>d!==i)].flatMap(d=>d.items??[]),t,s),l=new Map(r.map(d=>[K(d.label),d.id])),u=new Map;for(const d of e)for(const p of d.items??[]){const g=l.get(K(p.label));g&&p.id!==g&&u.set(p.id,g)}const v=Mt(e.map(d=>d.events??[])).map(d=>{if(!d.item_id)return d;const p=u.get(d.item_id);return p?{...d,item_id:p}:d});return{...i,profile:{...a,id:a.id||n,tenant_id:a.tenant_id||s},items:r,events:v}}function Nt(e,t,n,s){return J(e,t,n).some(i=>(i.kind==="set"||i.kind==="done"||i.kind==="skip"||i.kind==="miss")&&i.date<s)}function Re(e,t){return e.created_at.localeCompare(t.created_at)}function Ot(e,t,n){return e.filter(s=>s.date===t&&s.kind===n).sort(Re).at(-1)}function zt(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip"||n.kind==="miss")).sort(Re).at(-1)}function te(e,t){return[...Ne(e,t),...Oe(e,t)]}function ne(e,t,n,s,i){const a=J(e,t,i),r=zt(a,n);if(r?.kind==="set"||r?.kind==="done")return{item:t,date:n,mark:"hit",reason:null};if(r?.kind==="skip")return{item:t,date:n,mark:"skip",reason:r.skip_reason};const l=r?.kind==="miss"?r:Ot(a,n,"miss");return l?{item:t,date:n,mark:"miss",reason:l.skip_reason}:n>=s?{item:t,date:n,mark:"open",reason:null}:{item:t,date:n,mark:"idle",reason:null}}function Ge(e,t,n,s){const i=I(n,-1);return te(e,i).filter(a=>Nt(t,a,s,i)).map(a=>{const r=ne(t,a,i,n,s);return r.mark==="hit"||r.mark==="skip"||r.mark==="miss"?r:{...r,mark:"miss",reason:null}}).filter(a=>a.mark==="miss"&&!a.reason)}function Rt(e,t,n){return e.some(s=>s.mark==="hit")?"hit":e.some(s=>s.mark==="miss")?"miss":e.some(s=>s.mark==="skip")?"skip":t===n?"open":"idle"}function Ke(e,t,n,s){const i=se(n),a=I(i,6),r=Ge(e,t,n,s),l=new Set(r.map(m=>`${m.item.id}:${m.date}`)),u=ae(i,a).map(m=>{const b=te(e,m).map(_=>{const X=ne(t,_,m,n,s);return l.has(`${_.id}:${m}`)?{...X,mark:"miss",reason:X.reason}:X});return{date:m,label:ot(m),mark:Rt(b,m,n),hits:b.filter(_=>_.mark==="hit").length,misses:b.filter(_=>_.mark==="miss").length,skips:b.filter(_=>_.mark==="skip").length}}),v=u.filter(m=>m.date<n),d=v.reduce((m,b)=>m+b.hits,0),p=v.reduce((m,b)=>m+b.misses,0),g=v.reduce((m,b)=>m+b.skips,0),L=v.flatMap(m=>te(e,m.date).map(b=>{const _=ne(t,b,m.date,n,s);return l.has(`${b.id}:${m.date}`)?{..._,mark:"miss",reason:_.reason}:_}).filter(b=>b.mark==="miss")),$=v.filter(m=>m.mark!=="idle").length,Q=d>0&&p===0&&$>=2?"Week staat.":null;return{start:i,end:a,range:`${G(i)} – ${G(a)}`,days:u,hits:d,misses:p,skips:g,missRows:L,note:Q}}function H(e){return Y(e)?.id}const W=3,de=[{id:"kracht",label:"Kracht"},{id:"eten",label:"Eten & drinken"},{id:"slaap",label:"Slaap"},{id:"stofjes",label:"Stofjes"},{id:"bewegen",label:"Bewegen"}],ce=["18–29","30–39","40–49","50–59","60+"],Gt={kracht:["Push-ups","Squats","Plank","Dead hang"],eten:["Niet snoepen","Low carb","Intermittent fasting","Geen alcohol"],slaap:["Koud douchen"],stofjes:["Medicijn ochtend","Vitamine D"],bewegen:["Wandelen na eten"]};function ue(e){return Ce(e)||e.type==="weekly"?!1:e.type==="daily"||e.type==="leefregel"||e.type==="gedrag"||le(e)}function Kt(e){return e.filter(ue).sort((t,n)=>t.sort-n.sort)}function Pe(e){return!(e.onboarded!==!1||(e.events??[]).length>0)}function Pt(e){return Pe(e)?e.profile.goals?.length?e.profile.age_band?e.theme_step!==!0?"themes":"start":"age":"goals":null}function Ht(e,t){const n=e.filter(ue).sort((a,r)=>a.sort-r.sort);if(t.length===0)return n;const s=new Set(t.flatMap(a=>Gt[a]??[])),i=n.filter(a=>s.has(a.label));return i.length>0?i:n}function qt(e,t){const n=new Set(t.slice(0,W));return e.map(s=>ue(s)?{...s,later:!n.has(s.id)}:{...s,later:!1})}function Wt(e,t){return e.includes(t)?e.filter(n=>n!==t):[...e,t]}function Ft(e,t){return e.includes(t)?e.filter(n=>n!==t):e.length>=W?e:[...e,t]}function Vt(e){return de.some(t=>t.id===e)}function Ut(e){return ce.includes(e)}function Yt(e,t,n,s,i){const a=Ke(e,t,n,i??H(e)),r=a.days.map(l=>({date:l.date,label:l.label,current:Me(s,t,l.date<=n?l.date:n),mark:l.mark}));return{week:a,line:r,hits:a.hits,skips:a.skips,misses:a.misses}}function Jt(e,t,n,s=18,i=16){if(e.length===0)return[];const a=Math.min(...e),l=Math.max(...e)-a,u=t-s*2,v=n-i*2;return e.map((d,p)=>{const g=e.length===1?t/2:s+p/(e.length-1)*u,L=l===0?n/2:i+(1-(d-a)/l)*v;return{x:g,y:L}})}function Zt(e){return e.map(t=>`${t.x.toFixed(1)},${t.y.toFixed(1)}`).join(" ")}const ve=["Military calisthenics","Kickbox","Spinnen"],He=40;function fe(e){const t=e.trim().replace(/\s+/g," ").slice(0,He);return t.length>0?t:null}function B(e){if(!Array.isArray(e))return[];const t=new Set,n=[];for(const s of e){if(typeof s!="string")continue;const i=fe(s);if(!i)continue;const a=i.toLowerCase();t.has(a)||(t.add(a),n.push(i))}return n}function Qt(e,t){const n=fe(t);if(!n)return e;const s=n.toLowerCase();return e.some(i=>i.toLowerCase()===s)?e.filter(i=>i.toLowerCase()!==s):[...e,n]}function Xt(e,t){const n=fe(t);if(!n)return e;const s=n.toLowerCase();return e.some(i=>i.toLowerCase()===s)?e:[...e,n]}function en(e){const n=B(e).filter(s=>!ve.some(i=>i.toLowerCase()===s.toLowerCase()));return[...ve,...n]}function ge(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function qe(e){const t=new Set(B(e).map(s=>s.toLowerCase()));return`<div class="chips">${en(e).map(s=>`<button class="chip pick ${t.has(s.toLowerCase())?"on":""}" data-act="theme-toggle" data-theme="${ge(s)}">${ge(s)}</button>`).join("")}</div>
        <div class="theme-add">
          <input data-id="theme-custom" type="text" maxlength="${He}" placeholder="Eigen thema" autocomplete="off" enterkeyhint="done" />
          <button class="btn ghost" data-act="theme-add">Voeg toe</button>
        </div>`}const Z=["geen tijd","geen energie","vergeten","geen zin","pijn"];function ye(e){return!!(e&&Z.includes(e))}const tn=["vandaag","koers","voortgang","profiel"];function nn(e){return!!(e&&tn.includes(e))}const k={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},We="routine_loop_v6",sn=["routine_loop_v5","routine_loop_v4","routine_loop_v3"],ke="routine_local_user_id",be="routine_local_tenant_id",an="routine_local_chosen";function Fe(e,t){return{id:e,tenant_id:t,display_name:null,...Se(),age_band:null,goals:[],themes:[]}}function Ve(e,t,n=w()){return{id:O(),tenant_id:t,vector_id:e,milestone:k.milestone,started_on:n,deadline:I(n,k.windowDays),status:"active",stage_type:k.stageType}}function pe(e){const t=n=>({id:O(),tenant_id:e,timing:_t(),role:null,template:null,later:!1,...n});return[t({type:"daily",label:"Push-ups",unit:"reps",a:k.a,b:k.b,milestone:k.milestone,weekdays:null,times_per_week:null,sort:0}),t({type:"daily",label:"Squats",unit:"reps",a:30,b:null,milestone:null,weekdays:null,times_per_week:null,sort:1}),t({type:"daily",label:"Plank",unit:"sec",a:60,b:null,milestone:null,weekdays:null,times_per_week:null,sort:2}),t({type:"daily",label:"Dead hang",unit:"sec",a:45,b:null,milestone:null,weekdays:null,times_per_week:null,sort:3}),t({type:"weekly",label:"Gerichte kracht",unit:null,a:null,b:null,milestone:null,weekdays:[],times_per_week:2,sort:4}),t({type:"leefregel",label:"Koud douchen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:5}),t({type:"leefregel",label:"Niet snoepen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:6}),t({type:"leefregel",label:"Low carb",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:7,role:"preference"}),t({type:"leefregel",label:"Intermittent fasting",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:8}),t({type:"leefregel",label:"Geen alcohol",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:9}),t({type:"gedrag",label:"Cafeïne 90 min na opstaan",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:10,role:"constraint",template:"public-framework",timing:{mode:"relative",clock:null,anchor:"wake",offset_min:90,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Wandelen na eten",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:11,role:"action",template:null,timing:{mode:"relative",clock:null,anchor:"meal",offset_min:0,window_min:null,frequency:"daily",condition:"na eten"}}),t({type:"medicijn",label:"Medicijn ochtend",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:12,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"ochtend"}}),t({type:"supplement",label:"Vitamine D",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:13,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}})]}function rn(e,t){return{id:e.id,tenant_id:e.tenant_id,user_id:t,domain:k.domain,a:e.a??k.a,b:e.b??k.b,unit:e.unit==="sec"?"sec":"reps",pace_constraint:null}}function on(e,t=w(),n=O()){const s=Fe(e,n),i=pe(n),a=Y(i)??i[0],r=rn(a,e),l=Ve(r.id,n,t);return a.milestone!==null&&(l.milestone=a.milestone),{profile:s,items:i,vector:r,stage:l,events:[],rotated:!1,onboarded:!1,theme_step:!1}}function ln(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,items:e.items.map(n=>V(n)?{...n,a:k.a,b:k.b,milestone:k.milestone,unit:k.unit}:n),vector:{...e.vector,a:k.a,b:k.b,unit:k.unit},stage:{...e.stage,milestone:k.milestone},events:e.events}:e}function dn(){const e=localStorage.getItem(ke);if(e)return e;const t=O();return localStorage.setItem(ke,t),t}function cn(){const e=localStorage.getItem(be);if(e)return e;const t=O();return localStorage.setItem(be,t),t}function j(e){localStorage.setItem(We,JSON.stringify(e))}function un(e){if(!e)return null;try{const t=JSON.parse(e);return!t||typeof t!="object"?null:t}catch{return null}}function fn(){return[We,...sn].map(e=>un(localStorage.getItem(e))).filter(e=>e!==null)}function pn(e,t,n){const s=ze(e.items??[],pe(n),n).map(i=>jt(i,n));return{...e,profile:{...Fe(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...Se(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null,age_band:e.profile?.age_band??null,goals:Array.isArray(e.profile?.goals)?e.profile.goals:[],themes:B(e.profile?.themes)},items:s,vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(i=>({...i,tenant_id:i.tenant_id??n,item_id:i.item_id??null})),rotated:!!e.rotated,onboarded:e.onboarded??!0,theme_step:e.theme_step??!1}}function T(e,t){const n=fn();if(n.length===0){const a=on(e,w(),t);return j(a),a}const s=Dt(n,pe(t),e,t)??n[0],i=ln(pn(s,e,t));return j(i),i}function mn(){localStorage.setItem(an,"1");const e=dn(),t=cn();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return T(e,t)},async addEvent(n){const s=T(e,t),i={id:n.id??O(),tenant_id:t,user_id:e,item_id:n.item_id??null,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:dt()};return s.events.push(i),j(s),i},async saveProfile(n){const s=T(e,t);s.profile=n,j(s)},async saveOnboarding(n){const s=T(e,t);s.profile={...s.profile,goals:n.goals,age_band:n.age_band,themes:B(s.profile.themes)},s.items=qt(s.items,n.startIds),s.onboarded=!0,s.theme_step=!0,j(s)},async saveThemes(n){const s=T(e,t);s.profile={...s.profile,themes:B(n)},s.theme_step=!0,j(s)},async setItemLater(n,s){const i=T(e,t);i.items=i.items.map(a=>a.id===n?{...a,later:s}:a),j(i)},async saveVectorConstraint(n,s){const i=T(e,t);i.vector.id===n&&(i.vector.pace_constraint=s,j(i))},async advanceStage(n,s){const i=T(e,t),a=Ve(n.vector_id,t);return a.milestone=s,i.stage=a,i.items=i.items.map(r=>r.id===n.vector_id?{...r,milestone:s}:r),i.rotated=!0,j(i),a},async signOut(){}}}const he="#F0ECE4",vn="#3D6B5A";function Ue(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${he}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${he}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${vn}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function h(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function gn(e){return e==="stokt"||e==="herstel"?"ember":e==="stijgt"?"sage":"fog"}function $e(e){const t=gn(e);return e==="stokt"||e==="herstel"||e==="zakt"?h("status-kink",`ico-${t}`):e==="stijgt"?h("status-up",`ico-${t}`):h("status-flat",`ico-${t}`)}function yn(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${h(n?"dot-now":"dot")}</button>`}).join("")}const kn=`
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
</svg>`;function bn(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",kn)}const z=()=>document.querySelector("#app"),c={screen:"vandaag",skipItemId:null,missKey:null,advanceWarn:!1,busy:!1,error:null,startIds:[]};let y=null,o=null;function Ye(){if(!o)throw new Error("geen snapshot");const e=Y(o.items);return $t(o.vector,o.stage,Tt(o.events,e),w())}function D(e,t=w()){if(!o)throw new Error("geen snapshot");const n=Y(o.items),s=J(o.events,e,n?.id),i=e.a===null?null:Ee(e.a,s);return{done:Te(s,t),plus:Ae(s,t),skip:Ie(s,t),logged:Be(s,t),current:i}}function Je(e,t){return`${e}:${t}`}function f(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function E(){if(!o||!y)return;const e=Pt(o);if(e){z().innerHTML=jn(e);return}const t=Ye(),{vector:n,stage:s}=o,i=y.mode==="local"?"Lokaal":"Supabase",a=`
    <div class="hdr">
      <div>
        ${Ue()}
        <div class="date-s">${rt(w())}</div>
      </div>
      <div class="mode-pill">${i}</div>
    </div>`,r=`
    <nav class="nav nav-4">
      <button data-nav="vandaag" class="${c.screen==="vandaag"?"active":""}">${h("day")}Vandaag</button>
      <button data-nav="koers" class="${c.screen==="koers"?"active":""}">${h("mark")}Koers</button>
      <button data-nav="voortgang" class="${c.screen==="voortgang"?"active":""}">${h("line")}Voortgang</button>
      <button data-nav="profiel" class="${c.screen==="profiel"?"active":""}">${h("me")}Profiel</button>
    </nav>`;if(c.screen==="vandaag"){const l=it(o.profile.identity_new,o.events),u=w(),v=Ne(o.items,u),d=Et(o.items,u),p=Oe(o.items,u),g=It(o.items,u),L=Ge(o.items,o.events,u,H(o.items));z().innerHTML=`
      ${a}
      ${y.mode==="local"?'<div class="banner">Lokaal — geen Supabase. +1 / Done / Skip blijven op dit apparaat.</div>':""}
      ${t.gearDown?'<div class="banner hot">Lijf vraagt tempo omlaag. Etappe gaat niet omhoog.</div>':""}
      <div class="sec-hd">Lijf</div>
      <div class="card split">
        <div class="row">
          <div>
            <div class="lbl lbl-ico">${h("moon")} Slaap</div>
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
          <div class="dots">${yn(t.energy)}</div>
        </div>
      </div>
      ${d.length?`<div class="sec-hd">Regel</div>${d.map($=>En($)).join("")}`:""}
      ${p.length?`<div class="sec-hd">Stofjes</div>${p.map($=>hn($)).join("")}`:""}
      ${L.length?`<div class="sec-hd">Niet gedaan</div>
      <div class="card">
        <div class="note" style="margin-top:0">Geen +1, Done of Skip. Korte reden.</div>
        ${L.map($=>Ze($)).join("")}
      </div>`:""}
      <div class="sec-hd">Vandaag</div>
      ${v.map($=>In($,t,l)).join("")}
      ${g.length?`<div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Niet in je start. Blijft bewaard.</div>
        ${g.map($=>xn($)).join("")}
      </div>`:""}
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${$e(t.trend.word)}
          <div class="word">${t.trend.word}</div>
        </div>
      </div>
      ${c.error?`<p class="error" style="padding:0 18px">${f(c.error)}</p>`:""}
      ${r}`;return}if(c.screen==="koers"){z().innerHTML=`
      ${a}
      ${we(o.profile.themes,"Tik een suggestie of typ zelf. Geen vaste lijst. Later aan te passen.")}
      ${_e(Ke(o.items,o.events,w(),H(o.items)))}
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
            <div class="val" style="font-size:1.15rem">${G(s.started_on)} → ${s.deadline?G(s.deadline):"—"}</div>
          </div>
          <div>
            <div class="lbl">Trend</div>
            <div class="val status">${$e(t.trend.word)} ${t.trend.word}</div>
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
      ${at(o.profile.horizon_1y,o.rotated)?'<div class="banner">Zet een 1-jaars B. Etappes roteren.</div>':""}
      <div class="sec-hd">${h("ik")} Ik</div>
      <div class="card">
        <div class="field">
          <div class="lbl">Leven dat ik weiger</div>
          <textarea data-id="identity_anti" maxlength="${S.identity_anti}">${f(o.profile.identity_anti??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wie ik word</div>
          <textarea data-id="identity_new" maxlength="${S.identity_new}">${f(o.profile.identity_new??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wat B niet mag schenden</div>
          <textarea data-id="identity_constraint" maxlength="${S.identity_constraint}">${f(o.profile.identity_constraint??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">1-jaars B</div>
          <textarea data-id="horizon_1y" maxlength="${S.horizon_1y}">${f(o.profile.horizon_1y??"")}</textarea>
        </div>
        <button class="btn primary" data-act="save-ik">Bewaar</button>
      </div>
      <div class="card stack">
        <button class="btn ghost ico-btn" data-act="export">${h("export")}<span>Exporteer JSON</span></button>
      </div>
      ${c.error?`<p class="error" style="padding:0 18px">${f(c.error)}</p>`:""}
      ${r}`;return}if(c.screen==="voortgang"){const l=Yt(o.items,o.events,w(),o.vector.a,H(o.items));z().innerHTML=`
      ${a}
      ${_e(l.week)}
      <div class="sec-hd">Lijn</div>
      <div class="card">
        <div class="note" style="margin-top:0">Huidige deze week. Geen score.</div>
        ${Ln(l.line.map(u=>u.current),w(),l.line)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Nu</div><div class="val">${x(t.current)}</div></div>
          <div><div class="lbl">Gedaan</div><div class="val">${l.hits}</div></div>
        </div>
      </div>
      ${c.error?`<p class="error" style="padding:0 18px">${f(c.error)}</p>`:""}
      ${r}`;return}if(c.screen==="profiel"){const l=o.profile.goals??[],u=o.profile.age_band,v=Kt(o.items);z().innerHTML=`
      ${a}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="note" style="margin-top:0">Later aan te passen. Geen wipe.</div>
        <div class="chips">${de.map(d=>`<button class="chip pick ${l.includes(d.id)?"on":""}" data-act="onboard-goal" data-goal="${d.id}">${d.label}</button>`).join("")}</div>
      </div>
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="note" style="margin-top:0">Alleen een band. Geen geboortedatum.</div>
        <div class="chips">${ce.map(d=>`<button class="chip pick ${u===d?"on":""}" data-act="onboard-age" data-age="${d}">${d}</button>`).join("")}</div>
      </div>
      ${we(o.profile.themes,"Tik een suggestie of typ zelf. Later aan te passen.")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Parkeren of terughalen. Events blijven.</div>
        ${v.map(d=>Sn(d)).join("")}
      </div>
      ${c.error?`<p class="error" style="padding:0 18px">${f(c.error)}</p>`:""}
      ${r}`;return}}function hn(e){const t=D(e),n=t.logged||!!t.skip,s=e.type==="medicijn"?"Genomen":"Done",i=oe(e);return`
      <div class="card stof">
        <div class="ex-nm">${f(e.label)}</div>
        ${i?`<div class="note">${f(i)}</div>`:""}
        <div class="actions actions-two">
          <button class="btn ico-btn ${t.done?"track":""}" data-act="done" data-item="${e.id}" ${n?"disabled":""}>${h("done")}<span>${s}</span></button>
          <button class="btn ico-btn skip ${t.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${t.logged?"disabled":""}>${h("skip")}<span>Skip</span></button>
        </div>
        ${c.skipItemId===e.id||t.skip?`<div class="chips">${Z.map(a=>`<button class="chip ${t.skip===a?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${a}">${a}</button>`).join("")}</div>`:""}
      </div>`}function $n(e,t,n,s){return`<div class="chips">${Z.map(i=>`<button class="chip ${n===i?"on":""}" data-act="${s}" data-item="${e}" data-date="${t}" data-reason="${i}">${i}</button>`).join("")}</div>`}function Ze(e){const t=c.missKey===Je(e.item.id,e.date)||!!e.reason;return`
      <div class="miss-row">
        <button class="miss-item" data-act="miss-open" data-item="${e.item.id}" data-date="${e.date}">
          <span class="ex-nm">${f(e.item.label)}</span>
          <span class="note">${e.reason?f(e.reason):G(e.date)}</span>
        </button>
        ${t?$n(e.item.id,e.date,e.reason,"miss"):""}
      </div>`}function _n(e){const t=[];return e.hits&&t.push(`${e.hits} gedaan`),e.skips&&t.push(`${e.skips} overgeslagen`),e.misses&&t.push(`${e.misses} niet gedaan`),t.length===0?"Nog geen dagen deze week.":t.join(" · ")}function wn(e){return e==="skip"?"–":e==="miss"?"×":"·"}function _e(e){return`
      <div class="sec-hd">Week</div>
      <div class="card">
        <div class="note" style="margin-top:0">${f(e.range)}</div>
        <div class="week-strip" aria-label="Weekoverzicht">
          ${e.days.map(t=>`<div class="week-day ${t.mark}${t.date===w()?" today":""}">
            <span class="week-lbl">${t.label}</span>
            <span class="week-mark">${wn(t.mark)}</span>
          </div>`).join("")}
        </div>
        <div class="note">${f(_n(e))}</div>
        ${e.note?`<div class="week-note">${f(e.note)}</div>`:""}
        ${e.missRows.length?e.missRows.map(t=>Ze(t)).join(""):""}
      </div>`}function xn(e){return`
      <div class="later-row">
        <div class="ex-nm">${f(e.label)}</div>
        <button class="btn ghost later-now" data-act="later-now" data-item="${e.id}">Nu</button>
      </div>`}function Sn(e){const t=e.later;return`
      <div class="later-row">
        <div>
          <div class="ex-nm">${f(e.label)}</div>
          <div class="note" style="margin-top:4px">${t?"Later":"Nu"}</div>
        </div>
        <button class="btn ghost later-now" data-act="${t?"later-now":"later-park"}" data-item="${e.id}">${t?"Nu":"Later"}</button>
      </div>`}function Ln(e,t,n){const a=Jt(e,294,72);if(a.length===0)return'<div class="note">Nog geen lijn.</div>';const r=a.map((l,u)=>{const v=n[u]?.date===t;return`<circle class="${n[u]?.mark==="miss"?"prog-dot miss":v?"prog-dot now":"prog-dot"}" cx="${l.x.toFixed(1)}" cy="${l.y.toFixed(1)}" r="${v?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${Zt(a)}" />
          ${r}
        </svg>`}function we(e,t){return`
      <section class="theme-sec" data-sec="themes">
        <div class="sec-hd">Thema's</div>
        <div class="card">
          <div class="ex-nm">Trainingsrichting</div>
          <div class="note">${f(t)}</div>
          ${qe(e)}
        </div>
      </section>`}function jn(e){if(!o)return"";const t=o.profile.goals??[],n=o.profile.age_band,s=Ht(o.items,t),i=c.startIds,a=`
    <div class="hdr">
      <div>
        ${Ue()}
        <div class="date-s">Start</div>
      </div>
    </div>`;if(e==="goals")return`
      ${a}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="ex-nm">Wat is je richting?</div>
        <div class="note">Eerst doelen. Types (gedrag, regel, medicijn, supplement) komen daarna.</div>
        <div class="chips">${de.map(r=>`<button class="chip pick ${t.includes(r.id)?"on":""}" data-act="onboard-goal" data-goal="${r.id}">${r.label}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${t.length===0?"disabled":""}>Verder</button>
        </div>
      </div>`;if(e==="age")return`
      ${a}
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="ex-nm">Kies een band</div>
        <div class="note">Geen geboortedatum. Alleen een band.</div>
        <div class="chips">${ce.map(r=>`<button class="chip pick ${n===r?"on":""}" data-act="onboard-age" data-age="${r}">${r}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${n?"":"disabled"}>Verder</button>
        </div>
      </div>`;if(e==="themes"){const r=o.profile.themes??[];return`
      ${a}
      <div class="sec-hd">Thema's</div>
      <div class="card">
        <div class="ex-nm">Trainingsrichting</div>
        <div class="note">Tik een suggestie of typ zelf. Mag leeg. Later aan te passen.</div>
        ${qe(r)}
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-themes-done">Verder</button>
        </div>
      </div>`}return`
    ${a}
    <div class="sec-hd">Start</div>
    <div class="card">
      <div class="ex-nm">Max ${W} nu</div>
      <div class="note">De rest gaat naar Later. Later blijft zichtbaar.</div>
      <div class="chips">${s.map(r=>`<button class="chip pick ${i.includes(r.id)?"on":""}" data-act="onboard-start" data-item="${r.id}">${f(r.label)}</button>`).join("")}</div>
      <div class="note">${i.length} / ${W} gekozen</div>
      <div class="stack" style="margin-top:16px">
        <button class="btn primary" data-act="onboard-done" ${i.length===0?"disabled":""}>Naar Vandaag</button>
      </div>
    </div>`}function En(e){const t=oe(e);return`
      <div class="card quiet">
        <div class="ex-nm">${f(e.label)}</div>
        ${t?`<div class="note">${f(t)}</div>`:'<div class="note">Regel. Geen afvinken.</div>'}
      </div>`}function In(e,t,n){const s=D(e),i=V(e),a=s.logged||!!s.skip,r=i&&s.current!==null&&e.b!==null&&s.current>=e.b,l=a||r,u=i,v=At(e),d=oe(e),p=u&&t.suggestedMilestone&&e.id===o.vector.id;return`
      <div class="card">
        <div class="ex-nm">${f(e.label)}</div>
        ${d&&!v&&!i?`<div class="note">${f(d)}</div>`:""}
        ${i?`<div class="track">
          <span class="now">${x(s.current??e.a??0)}</span>
          <span>→</span>
          <span class="mid">${x(e.milestone??0)}</span>
          <span>→</span>
          <span class="end">${x(e.b??0)}</span>
        </div>`:v?`<div class="work">${f(v)}</div>`:""}
        <div class="actions ${i?"":"actions-two"}">
          ${i?`<button class="btn ico-btn ${s.plus?"on":""}" data-act="plus" data-item="${e.id}" ${l?"disabled":""}>${h("plus")}<span>+1</span></button>`:""}
          <button class="btn ico-btn ${s.done?"track":""}" data-act="done" data-item="${e.id}" ${a?"disabled":""}>${h("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${s.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${s.logged?"disabled":""}>${h("skip")}<span>Skip</span></button>
        </div>
        ${c.skipItemId===e.id||s.skip?`<div class="chips">${Z.map(g=>`<button class="chip ${s.skip===g?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${g}">${g}</button>`).join("")}</div>`:""}
        ${p?`<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${x(t.suggestedMilestone)}.</div>
               ${c.advanceWarn&&o.profile.identity_constraint?`<div class="banner">Check: ${f(o.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${x(t.suggestedMilestone)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`:`<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${t.suggestedMilestone}">Volgende etappe ${x(t.suggestedMilestone)}</button>
                      </div>`}`:""}
        ${u&&n?`<div class="note">${f(n)}</div>`:""}
      </div>`}function x(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function A(e){if(!c.busy){c.busy=!0,c.error=null;try{await e()}catch(t){c.error=t instanceof Error?t.message:"Er ging iets mis"}finally{c.busy=!1,E()}}}async function Tn(e){y=e,o=await y.load(),c.screen="vandaag",E()}async function An(){bn(),Bn(),await Tn(mn())}function Bn(){document.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const t=e.target;!(t instanceof HTMLInputElement)||t.dataset.id!=="theme-custom"||(e.preventDefault(),Qe())}),document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(nn(n)){c.screen=n,c.skipItemId=null,c.missKey=null,c.advanceWarn=!1,E();return}Mn(t)})}async function Mn(e){const t=e.dataset.act;if(!t||!y||!o)return;const n=Ye(),s=w();if(t==="sleep-inc"||t==="sleep-dec"){const i=n.sleep??7,a=Math.max(0,Math.min(14,i+(t==="sleep-inc"?.5:-.5)));await C({date:s,kind:"body_sleep",value:a,skip_reason:null,item_id:null});return}if(t==="energy"){const i=Number(e.dataset.n),a=n.energy===i?null:i;if(a===null)return;await C({date:s,kind:"body_energy",value:a,skip_reason:null,item_id:null});return}if(t==="plus"){const i=o.items.find(r=>r.id===e.dataset.item);if(!i||!V(i))return;const a=D(i);if(a.logged||a.skip||i.b!==null&&a.current!==null&&a.current>=i.b)return;await C({date:s,kind:"set",value:(a.current??i.a??0)+1,skip_reason:null,item_id:i.id});return}if(t==="done"){const i=o.items.find(r=>r.id===e.dataset.item);if(!i)return;const a=D(i);if(a.logged||a.skip)return;await C({date:s,kind:"done",value:a.current??i.a,skip_reason:null,item_id:i.id});return}if(t==="skip-open"){const i=e.dataset.item??null;c.skipItemId=c.skipItemId===i?null:i,E();return}if(t==="skip"){const i=o.items.find(l=>l.id===e.dataset.item);if(!i||D(i).logged)return;const r=e.dataset.reason;if(!ye(r))return;await C({date:s,kind:"skip",value:null,skip_reason:r,item_id:i.id}),c.skipItemId=null;return}if(t==="miss-open"){const i=e.dataset.item,a=e.dataset.date;if(!i||!a)return;const r=Je(i,a);c.missKey=c.missKey===r?null:r,E();return}if(t==="miss"){const i=o.items.find(u=>u.id===e.dataset.item),a=e.dataset.date,r=e.dataset.reason;if(!i||!a||a>=s||!ye(r))return;const l=D(i,a);if(l.logged||l.skip)return;await C({date:a,kind:"miss",value:null,skip_reason:r,item_id:i.id}),c.missKey=null;return}if(t==="advance"){if(!n.suggestedMilestone)return;if(st(o.profile.identity_constraint)&&!c.advanceWarn){c.advanceWarn=!0,E();return}await xe(n.suggestedMilestone);return}if(t==="advance-go"){if(!n.suggestedMilestone)return;await xe(n.suggestedMilestone);return}if(t==="advance-cancel"){c.advanceWarn=!1,E();return}if(t==="onboard-goal"){const i=e.dataset.goal;if(!i||!Vt(i))return;const a={...o.profile,goals:Wt(o.profile.goals??[],i)};await A(async()=>{await y.saveProfile(a),o.profile=a});return}if(t==="onboard-age"){const i=e.dataset.age;if(!i||!Ut(i))return;const a={...o.profile,age_band:i};await A(async()=>{await y.saveProfile(a),o.profile=a});return}if(t==="theme-toggle"){const i=e.dataset.theme;if(!i)return;await ie(Qt(B(o.profile.themes),i));return}if(t==="theme-add"){await Qe();return}if(t==="onboard-start"){const i=e.dataset.item;if(!i)return;c.startIds=Ft(c.startIds,i),E();return}if(t==="onboard-next"){E();return}if(t==="onboard-themes-done"){await ie(o.profile.themes??[],!0);return}if(t==="onboard-done"){const i=o.profile.age_band,a=o.profile.goals??[];if(!i||a.length===0||c.startIds.length===0)return;await A(async()=>{await y.saveOnboarding({goals:a,age_band:i,startIds:c.startIds}),o=await y.load(),c.screen="vandaag"});return}if(t==="later-now"||t==="later-park"){const i=e.dataset.item;if(!i)return;await A(async()=>{await y.setItemLater(i,t==="later-park"),o=await y.load()});return}if(t==="save-ik"){const i={...o.profile,identity_anti:M(R("identity_anti"),S.identity_anti),identity_new:M(R("identity_new"),S.identity_new),identity_constraint:M(R("identity_constraint"),S.identity_constraint),horizon_1y:M(R("horizon_1y"),S.horizon_1y)};await A(async()=>{await y.saveProfile(i),o.profile=i});return}if(t==="export"){et(o);return}}async function Qe(){if(!o)return;const e=R("theme-custom")??"",t=B(o.profile.themes),n=Xt(t,e);n.length===t.length&&n.every((s,i)=>s===t[i])||await ie(n)}async function ie(e,t=!1){if(!y||!o)return;const n=B(e),s={...o.profile,themes:n},i=t||!Pe(o);await A(async()=>{if(i){await y.saveThemes(n),o=await y.load();return}await y.saveProfile(s),o.profile=s})}function R(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function xe(e){await A(async()=>{o.stage=await y.advanceStage(o.stage,e),o.items=o.items.map(t=>t.id===o.stage.vector_id?{...t,milestone:e}:t),o.rotated=!0,c.advanceWarn=!1})}async function C(e){await A(async()=>{const t=await y.addEvent(e);o.events.push(t)})}An();
