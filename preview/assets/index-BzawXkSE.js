(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();function nt(e){return JSON.stringify({exported_at:new Date().toISOString(),profile:e.profile,items:e.items,stage:e.stage,events:e.events},null,2)}function it(e){const t=new Blob([nt(e)],{type:"application/json"}),n=URL.createObjectURL(t),s=document.createElement("a");s.href=n,s.download=`routine-${e.profile.id.slice(0,8)}.json`,s.click(),URL.revokeObjectURL(n)}const st="geen zin",S={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140};function C(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function at(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===st).length}function ot(e,t){const n=C(e,S.identity_new);return!n||at(t)<2?null:n}function rt(e){return!!C(e,S.identity_constraint)}function lt(e,t){return t&&!C(e,S.horizon_1y)}function Le(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const je=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],Ee=["zo","ma","di","wo","do","vr","za"];function w(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${s}`}function I(e,t){const n=O(e);return n.setDate(n.getDate()+t),w(n)}function O(e){const[t,n,s]=e.split("-").map(Number);return new Date(t,n-1,s)}function dt(e){const t=O(e);return`${Ee[t.getDay()]} ${t.getDate()} ${je[t.getMonth()]}`}function K(e){const t=O(e);return`${t.getDate()} ${je[t.getMonth()]}`}function ct(e){return Ee[O(e).getDay()]}function ut(e){const t=O(e).getDay();return t===0?7:t}function se(e){const t=O(e),n=t.getDay(),s=n===0?-6:1-n;return t.setDate(t.getDate()+s),w(t)}function ae(e,t){const n=[];let s=e;for(;s<=t;)n.push(s),s=I(s,1);return n}function z(){return crypto.randomUUID()}function ft(){return new Date().toISOString()}const pt=2,mt=6;function U(e,t){return e.created_at.localeCompare(t.created_at)}function oe(e,t,n){return e.filter(s=>s.date===t&&s.kind===n).sort(U).at(-1)}function Ie(e,t){return t.filter(s=>s.kind==="set").sort(U).at(-1)?.value??e}function vt(e,t){return oe(e,t,"body_sleep")?.value??null}function gt(e,t){return oe(e,t,"body_energy")?.value??null}function P(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip")).sort(U).at(-1)}function Te(e,t){const n=P(e,t);return n?.kind==="skip"?n.skip_reason:null}function Ae(e,t){return P(e,t)?.kind==="done"}function Be(e,t){return P(e,t)?.kind==="set"}function Me(e,t){const n=P(e,t);return n?.kind==="set"||n?.kind==="done"}function yt(e,t){return e!==null&&e<mt||t!==null&&t<=pt}function kt(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const s=Math.max(1,Math.ceil(n/2));return Math.min(t,e+s)}function F(e,t,n,s){if(t<s)return"empty";const i=P(e,t);return i?.kind==="done"||i?.kind==="set"?"done":i?.kind==="skip"?"skip":oe(e,t,"miss")?"miss":t>=n?"empty":"miss"}function bt(e,t,n="1970-01-01"){let s=0,i=t;for(let a=0;a<400;a+=1){const o=F(e,i,t,n);if(o==="done")s+=1;else if(o==="skip"||o==="empty"&&i===t){i=I(i,-1);continue}else break;i=I(i,-1)}return s}function ht(e,t,n){const s=se(t),i=!n||n<s?s:n;let a=0,o=0;for(const l of ae(i,t)){const u=F(e,l,t,n??i);u==="skip"||u==="empty"||(o+=1,u==="done"&&(a+=1))}return{hits:a,eligible:o}}function $t(e,t,n="1970-01-01",s=3){const i=F(e,t,t,n);if(i==="done"||i==="skip")return!1;const a=I(t,-1);if(a<n)return!1;const o=I(t,-s),l=n>o?n:o;return ae(l,a).some(u=>F(e,u,t,n)==="miss")}function _t(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled&&!e.todayLogged?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function wt(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${me(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${me(e.milestone)}.`}function me(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function Ce(e,t,n){return t.filter(i=>i.kind==="set"&&i.date<=n).sort(U).at(-1)?.value??e}function xt(e,t,n,s){const i=Ie(e.a,n),a=vt(n,s),o=gt(n,s),l=Ae(n,s),u=Be(n,s),v=Me(n,s),d=Te(n,s),p=yt(a,o),g=i>=t.milestone,L=i>=e.b,M=$t(n,s,t.started_on),$=se(s),m=Ce(e.a,n,I($,-1)),_=_t({current:i,weekStartCurrent:m,gearDown:p,stalled:M,milestoneHit:g,todayLogged:u||l||!!d});return{current:i,sleep:a,energy:o,doneToday:l,plusToday:u,setLoggedToday:v,skipToday:d,gearDown:p,milestoneHit:g,atB:L,trend:_,hitrate:ht(n,s,t.started_on),streak:bt(n,s,t.started_on),nextAction:wt({milestone:t.milestone,b:e.b,gearDown:p,milestoneHit:g,atB:L,stalled:M,doneToday:l,plusToday:u,skipToday:d}),suggestedMilestone:g&&!L&&!p?kt(t.milestone,e.b):null}}function St(){return{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:null,condition:null}}function Lt(e){return{mode:e?.mode??null,clock:e?.clock??null,anchor:e?.anchor??null,offset_min:e?.offset_min??null,window_min:e?.window_min??null,frequency:e?.frequency??null,condition:e?.condition??null}}function jt(e,t){if(e.timing.frequency==="weekly"||e.type==="weekly"){const s=e.weekdays??[];return s.length===0?!1:s.includes(ut(t))}return!0}function De(e){return e.role==="constraint"}function Ne(e){return e.role!=="constraint"}function re(e){const t=e.timing;return t.condition?t.condition:t.mode==="relative"&&t.anchor==="wake"&&t.offset_min!==null?`${t.offset_min} min na opstaan`:t.mode==="relative"&&t.anchor==="meal"?"na eten":t.mode==="clock"&&t.clock?t.clock:null}function Et(e){return e.role?e.role:e.label.trim().toLowerCase()==="low carb"?"preference":null}function Y(e){return e.a!==null&&e.b!==null&&e.milestone!==null}function It(e,t){return jt(e,t)}function Tt(e,t){return{...e,tenant_id:e.tenant_id??t,weekdays:e.weekdays??null,times_per_week:e.times_per_week??null,timing:Lt(e.timing),role:Et(e),template:e.template??null,later:!!e.later}}function le(e){return e.type==="medicijn"||e.type==="supplement"}function Oe(e){return e.type==="sociaal"}function ze(e,t){return H(e,t).filter(n=>Ne(n)&&!le(n)&&!Oe(n)&&!n.later)}function At(e,t){return H(e,t).filter(De)}function Re(e,t){return H(e,t).filter(n=>le(n)&&!n.later)}function Ge(e,t){return H(e,t).filter(n=>Oe(n)&&!n.later)}function Bt(e,t){return H(e,t).filter(n=>n.later&&Ne(n))}function H(e,t){return e.filter(n=>It(n,t)).sort((n,s)=>n.sort-s.sort)}function J(e){return e.find(Y)}function ee(e){return e.kind==="body_sleep"||e.kind==="body_energy"||e.kind==="body_weight"}function Z(e,t,n){return e.filter(s=>ee(s)?!1:!!(s.item_id===t.id||s.item_id===null&&n&&t.id===n))}function Mt(e,t){return t?[...e.filter(ee),...Z(e,t,t.id)]:e.filter(ee)}function Ct(e){return e.a===null?null:e.unit==="sec"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} s`:e.unit==="reps"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} reps`:String(e.a)}function q(e){return e.trim().toLowerCase()}function Dt(e){const t=new Set,n=[];for(const s of e){const i=q(s.label);t.has(i)||(t.add(i),n.push(s))}return n}function Ke(e,t,n){const s=Dt(e),i=new Set(s.map(o=>q(o.label))),a=t.filter(o=>!i.has(q(o.label))).map(o=>({...o,tenant_id:n}));return[...s,...a]}function Nt(e){const t=new Map;for(const n of e)for(const s of n)t.has(s.id)||t.set(s.id,s);return[...t.values()].sort((n,s)=>n.created_at.localeCompare(s.created_at))}function Ot(e){return e?!!(e.identity_anti||e.identity_new||e.identity_constraint||e.horizon_1y||e.display_name):!1}function zt(e,t,n,s){if(e.length===0)return null;const i=e.reduce((d,p)=>(p.events?.length??0)>(d.events?.length??0)?p:d),a=e.find(d=>Ot(d.profile))?.profile??i.profile,o=Ke([i,...e.filter(d=>d!==i)].flatMap(d=>d.items??[]),t,s),l=new Map(o.map(d=>[q(d.label),d.id])),u=new Map;for(const d of e)for(const p of d.items??[]){const g=l.get(q(p.label));g&&p.id!==g&&u.set(p.id,g)}const v=Nt(e.map(d=>d.events??[])).map(d=>{if(!d.item_id)return d;const p=u.get(d.item_id);return p?{...d,item_id:p}:d});return{...i,profile:{...a,id:a.id||n,tenant_id:a.tenant_id||s},items:o,events:v}}function Rt(e,t,n,s){return Z(e,t,n).some(i=>(i.kind==="set"||i.kind==="done"||i.kind==="skip"||i.kind==="miss")&&i.date<s)}function qe(e,t){return e.created_at.localeCompare(t.created_at)}function Gt(e,t,n){return e.filter(s=>s.date===t&&s.kind===n).sort(qe).at(-1)}function Kt(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip"||n.kind==="miss")).sort(qe).at(-1)}function te(e,t){return[...ze(e,t),...Re(e,t),...Ge(e,t)]}function ne(e,t,n,s,i){const a=Z(e,t,i),o=Kt(a,n);if(o?.kind==="set"||o?.kind==="done")return{item:t,date:n,mark:"hit",reason:null};if(o?.kind==="skip")return{item:t,date:n,mark:"skip",reason:o.skip_reason};const l=o?.kind==="miss"?o:Gt(a,n,"miss");return l?{item:t,date:n,mark:"miss",reason:l.skip_reason}:n>=s?{item:t,date:n,mark:"open",reason:null}:{item:t,date:n,mark:"idle",reason:null}}function Pe(e,t,n,s){const i=I(n,-1);return te(e,i).filter(a=>Rt(t,a,s,i)).map(a=>{const o=ne(t,a,i,n,s);return o.mark==="hit"||o.mark==="skip"||o.mark==="miss"?o:{...o,mark:"miss",reason:null}}).filter(a=>a.mark==="miss"&&!a.reason)}function qt(e,t,n){return e.some(s=>s.mark==="hit")?"hit":e.some(s=>s.mark==="miss")?"miss":e.some(s=>s.mark==="skip")?"skip":t===n?"open":"idle"}function He(e,t,n,s){const i=se(n),a=I(i,6),o=Pe(e,t,n,s),l=new Set(o.map(m=>`${m.item.id}:${m.date}`)),u=ae(i,a).map(m=>{const b=te(e,m).map(_=>{const X=ne(t,_,m,n,s);return l.has(`${_.id}:${m}`)?{...X,mark:"miss",reason:X.reason}:X});return{date:m,label:ct(m),mark:qt(b,m,n),hits:b.filter(_=>_.mark==="hit").length,misses:b.filter(_=>_.mark==="miss").length,skips:b.filter(_=>_.mark==="skip").length}}),v=u.filter(m=>m.date<n),d=v.reduce((m,b)=>m+b.hits,0),p=v.reduce((m,b)=>m+b.misses,0),g=v.reduce((m,b)=>m+b.skips,0),L=v.flatMap(m=>te(e,m.date).map(b=>{const _=ne(t,b,m.date,n,s);return l.has(`${b.id}:${m.date}`)?{..._,mark:"miss",reason:_.reason}:_}).filter(b=>b.mark==="miss")),M=v.filter(m=>m.mark!=="idle").length,$=d>0&&p===0&&M>=2?"Week staat.":null;return{start:i,end:a,range:`${K(i)} – ${K(a)}`,days:u,hits:d,misses:p,skips:g,missRows:L,note:$}}function W(e){return J(e)?.id}const V=3,de=[{id:"kracht",label:"Kracht"},{id:"eten",label:"Eten & drinken"},{id:"slaap",label:"Slaap"},{id:"stofjes",label:"Stofjes"},{id:"bewegen",label:"Bewegen"}],ce=["18–29","30–39","40–49","50–59","60+"],Pt={kracht:["Push-ups","Squats","Plank","Dead hang"],eten:["Niet snoepen","Low carb","Intermittent fasting","Geen alcohol"],slaap:["Koud douchen"],stofjes:["Medicijn ochtend","Vitamine D"],bewegen:["Wandelen na eten"]};function ue(e){return De(e)||e.type==="weekly"?!1:e.type==="daily"||e.type==="leefregel"||e.type==="gedrag"||e.type==="sociaal"||le(e)}function Ht(e){return e.filter(ue).sort((t,n)=>t.sort-n.sort)}function We(e){return!(e.onboarded!==!1||(e.events??[]).length>0)}function Wt(e){return We(e)?e.profile.goals?.length?e.profile.age_band?e.theme_step!==!0?"themes":"start":"age":"goals":null}function Ft(e,t){const n=e.filter(ue).sort((a,o)=>a.sort-o.sort);if(t.length===0)return n;const s=new Set(t.flatMap(a=>Pt[a]??[])),i=n.filter(a=>s.has(a.label));return i.length>0?i:n}function Vt(e,t){const n=new Set(t.slice(0,V));return e.map(s=>ue(s)?{...s,later:!n.has(s.id)}:{...s,later:!1})}function Ut(e,t){return e.includes(t)?e.filter(n=>n!==t):[...e,t]}function Yt(e,t){return e.includes(t)?e.filter(n=>n!==t):e.length>=V?e:[...e,t]}function Jt(e){return de.some(t=>t.id===e)}function Zt(e){return ce.includes(e)}function Qt(e,t,n,s,i){const a=He(e,t,n,i??W(e)),o=a.days.map(l=>({date:l.date,label:l.label,current:Ce(s,t,l.date<=n?l.date:n),mark:l.mark}));return{week:a,line:o,hits:a.hits,skips:a.skips,misses:a.misses}}function Xt(e,t,n,s=18,i=16){if(e.length===0)return[];const a=Math.min(...e),l=Math.max(...e)-a,u=t-s*2,v=n-i*2;return e.map((d,p)=>{const g=e.length===1?t/2:s+p/(e.length-1)*u,L=l===0?n/2:i+(1-(d-a)/l)*v;return{x:g,y:L}})}function en(e){return e.map(t=>`${t.x.toFixed(1)},${t.y.toFixed(1)}`).join(" ")}const ve=["Military calisthenics","Kickbox","Spinnen"],Fe=40;function fe(e){const t=e.trim().replace(/\s+/g," ").slice(0,Fe);return t.length>0?t:null}function B(e){if(!Array.isArray(e))return[];const t=new Set,n=[];for(const s of e){if(typeof s!="string")continue;const i=fe(s);if(!i)continue;const a=i.toLowerCase();t.has(a)||(t.add(a),n.push(i))}return n}function tn(e,t){const n=fe(t);if(!n)return e;const s=n.toLowerCase();return e.some(i=>i.toLowerCase()===s)?e.filter(i=>i.toLowerCase()!==s):[...e,n]}function nn(e,t){const n=fe(t);if(!n)return e;const s=n.toLowerCase();return e.some(i=>i.toLowerCase()===s)?e:[...e,n]}function sn(e){const n=B(e).filter(s=>!ve.some(i=>i.toLowerCase()===s.toLowerCase()));return[...ve,...n]}function ge(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function Ve(e){const t=new Set(B(e).map(s=>s.toLowerCase()));return`<div class="chips">${sn(e).map(s=>`<button class="chip pick ${t.has(s.toLowerCase())?"on":""}" data-act="theme-toggle" data-theme="${ge(s)}">${ge(s)}</button>`).join("")}</div>
        <div class="theme-add">
          <input data-id="theme-custom" type="text" maxlength="${Fe}" placeholder="Eigen thema" autocomplete="off" enterkeyhint="done" />
          <button class="btn ghost" data-act="theme-add">Voeg toe</button>
        </div>`}const Q=["geen tijd","geen energie","vergeten","geen zin","pijn"];function ye(e){return!!(e&&Q.includes(e))}const an=["vandaag","koers","voortgang","profiel"];function on(e){return!!(e&&an.includes(e))}const k={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},Ue="routine_loop_v6",rn=["routine_loop_v5","routine_loop_v4","routine_loop_v3"],ke="routine_local_user_id",be="routine_local_tenant_id",ln="routine_local_chosen";function Ye(e,t){return{id:e,tenant_id:t,display_name:null,...Le(),age_band:null,goals:[],themes:[]}}function Je(e,t,n=w()){return{id:z(),tenant_id:t,vector_id:e,milestone:k.milestone,started_on:n,deadline:I(n,k.windowDays),status:"active",stage_type:k.stageType}}function pe(e){const t=n=>({id:z(),tenant_id:e,timing:St(),role:null,template:null,later:!1,...n});return[t({type:"daily",label:"Push-ups",unit:"reps",a:k.a,b:k.b,milestone:k.milestone,weekdays:null,times_per_week:null,sort:0}),t({type:"daily",label:"Squats",unit:"reps",a:30,b:null,milestone:null,weekdays:null,times_per_week:null,sort:1}),t({type:"daily",label:"Plank",unit:"sec",a:60,b:null,milestone:null,weekdays:null,times_per_week:null,sort:2}),t({type:"daily",label:"Dead hang",unit:"sec",a:45,b:null,milestone:null,weekdays:null,times_per_week:null,sort:3}),t({type:"weekly",label:"Gerichte kracht",unit:null,a:null,b:null,milestone:null,weekdays:[],times_per_week:2,sort:4}),t({type:"leefregel",label:"Koud douchen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:5}),t({type:"leefregel",label:"Niet snoepen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:6}),t({type:"leefregel",label:"Low carb",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:7,role:"preference"}),t({type:"leefregel",label:"Intermittent fasting",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:8}),t({type:"leefregel",label:"Geen alcohol",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:9}),t({type:"gedrag",label:"Cafeïne 90 min na opstaan",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:10,role:"constraint",template:"public-framework",timing:{mode:"relative",clock:null,anchor:"wake",offset_min:90,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Wandelen na eten",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:11,role:"action",template:null,timing:{mode:"relative",clock:null,anchor:"meal",offset_min:0,window_min:null,frequency:"daily",condition:"na eten"}}),t({type:"medicijn",label:"Medicijn ochtend",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:12,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"ochtend"}}),t({type:"supplement",label:"Vitamine D",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:13,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Bellen met iemand",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:14,role:"action",template:null,timing:{mode:"clock",clock:"18:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Iemand zien",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:1,sort:15,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"deze week"}})]}function dn(e,t){return{id:e.id,tenant_id:e.tenant_id,user_id:t,domain:k.domain,a:e.a??k.a,b:e.b??k.b,unit:e.unit==="sec"?"sec":"reps",pace_constraint:null}}function cn(e,t=w(),n=z()){const s=Ye(e,n),i=pe(n),a=J(i)??i[0],o=dn(a,e),l=Je(o.id,n,t);return a.milestone!==null&&(l.milestone=a.milestone),{profile:s,items:i,vector:o,stage:l,events:[],rotated:!1,onboarded:!1,theme_step:!1}}function un(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,items:e.items.map(n=>Y(n)?{...n,a:k.a,b:k.b,milestone:k.milestone,unit:k.unit}:n),vector:{...e.vector,a:k.a,b:k.b,unit:k.unit},stage:{...e.stage,milestone:k.milestone},events:e.events}:e}function fn(){const e=localStorage.getItem(ke);if(e)return e;const t=z();return localStorage.setItem(ke,t),t}function pn(){const e=localStorage.getItem(be);if(e)return e;const t=z();return localStorage.setItem(be,t),t}function j(e){localStorage.setItem(Ue,JSON.stringify(e))}function mn(e){if(!e)return null;try{const t=JSON.parse(e);return!t||typeof t!="object"?null:t}catch{return null}}function vn(){return[Ue,...rn].map(e=>mn(localStorage.getItem(e))).filter(e=>e!==null)}function gn(e,t,n){const s=Ke(e.items??[],pe(n),n).map(i=>Tt(i,n));return{...e,profile:{...Ye(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...Le(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null,age_band:e.profile?.age_band??null,goals:Array.isArray(e.profile?.goals)?e.profile.goals:[],themes:B(e.profile?.themes)},items:s,vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(i=>({...i,tenant_id:i.tenant_id??n,item_id:i.item_id??null})),rotated:!!e.rotated,onboarded:e.onboarded??!0,theme_step:e.theme_step??!1}}function T(e,t){const n=vn();if(n.length===0){const a=cn(e,w(),t);return j(a),a}const s=zt(n,pe(t),e,t)??n[0],i=un(gn(s,e,t));return j(i),i}function yn(){localStorage.setItem(ln,"1");const e=fn(),t=pn();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return T(e,t)},async addEvent(n){const s=T(e,t),i={id:n.id??z(),tenant_id:t,user_id:e,item_id:n.item_id??null,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:ft()};return s.events.push(i),j(s),i},async saveProfile(n){const s=T(e,t);s.profile=n,j(s)},async saveOnboarding(n){const s=T(e,t);s.profile={...s.profile,goals:n.goals,age_band:n.age_band,themes:B(s.profile.themes)},s.items=Vt(s.items,n.startIds),s.onboarded=!0,s.theme_step=!0,j(s)},async saveThemes(n){const s=T(e,t);s.profile={...s.profile,themes:B(n)},s.theme_step=!0,j(s)},async setItemLater(n,s){const i=T(e,t);i.items=i.items.map(a=>a.id===n?{...a,later:s}:a),j(i)},async saveVectorConstraint(n,s){const i=T(e,t);i.vector.id===n&&(i.vector.pace_constraint=s,j(i))},async advanceStage(n,s){const i=T(e,t),a=Je(n.vector_id,t);return a.milestone=s,i.stage=a,i.items=i.items.map(o=>o.id===n.vector_id?{...o,milestone:s}:o),i.rotated=!0,j(i),a},async signOut(){}}}const he="#F0ECE4",kn="#3D6B5A";function Ze(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${he}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${he}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${kn}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function h(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function bn(e){return e==="stokt"||e==="herstel"?"ember":e==="stijgt"?"sage":"fog"}function $e(e){const t=bn(e);return e==="stokt"||e==="herstel"||e==="zakt"?h("status-kink",`ico-${t}`):e==="stijgt"?h("status-up",`ico-${t}`):h("status-flat",`ico-${t}`)}function hn(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${h(n?"dot-now":"dot")}</button>`}).join("")}const $n=`
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
</svg>`;function _n(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",$n)}const R=()=>document.querySelector("#app"),c={screen:"vandaag",skipItemId:null,missKey:null,advanceWarn:!1,busy:!1,error:null,startIds:[]};let y=null,r=null;function Qe(){if(!r)throw new Error("geen snapshot");const e=J(r.items);return xt(r.vector,r.stage,Mt(r.events,e),w())}function N(e,t=w()){if(!r)throw new Error("geen snapshot");const n=J(r.items),s=Z(r.events,e,n?.id),i=e.a===null?null:Ie(e.a,s);return{done:Ae(s,t),plus:Be(s,t),skip:Te(s,t),logged:Me(s,t),current:i}}function Xe(e,t){return`${e}:${t}`}function f(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function E(){if(!r||!y)return;const e=Wt(r);if(e){R().innerHTML=In(e);return}const t=Qe(),{vector:n,stage:s}=r,i=y.mode==="local"?"Lokaal":"Supabase",a=`
    <div class="hdr">
      <div>
        ${Ze()}
        <div class="date-s">${dt(w())}</div>
      </div>
      <div class="mode-pill">${i}</div>
    </div>`,o=`
    <nav class="nav nav-4">
      <button data-nav="vandaag" class="${c.screen==="vandaag"?"active":""}">${h("day")}Vandaag</button>
      <button data-nav="koers" class="${c.screen==="koers"?"active":""}">${h("mark")}Koers</button>
      <button data-nav="voortgang" class="${c.screen==="voortgang"?"active":""}">${h("line")}Voortgang</button>
      <button data-nav="profiel" class="${c.screen==="profiel"?"active":""}">${h("me")}Profiel</button>
    </nav>`;if(c.screen==="vandaag"){const l=ot(r.profile.identity_new,r.events),u=w(),v=ze(r.items,u),d=At(r.items,u),p=Re(r.items,u),g=Ge(r.items,u),L=Bt(r.items,u),M=Pe(r.items,r.events,u,W(r.items));R().innerHTML=`
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
          <div class="dots">${hn(t.energy)}</div>
        </div>
      </div>
      ${d.length?`<div class="sec-hd">Regel</div>${d.map($=>Tn($)).join("")}`:""}
      ${p.length?`<div class="sec-hd">Stofjes</div>${p.map($=>_e($)).join("")}`:""}
      ${g.length?`<div class="sec-hd">Sociaal</div>${g.map($=>_e($)).join("")}`:""}
      ${M.length?`<div class="sec-hd">Niet gedaan</div>
      <div class="card">
        <div class="note" style="margin-top:0">Geen +1, Done of Skip. Korte reden.</div>
        ${M.map($=>et($)).join("")}
      </div>`:""}
      <div class="sec-hd">Vandaag</div>
      ${v.map($=>An($,t,l)).join("")}
      ${L.length?`<div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Niet in je start. Blijft bewaard.</div>
        ${L.map($=>Ln($)).join("")}
      </div>`:""}
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${$e(t.trend.word)}
          <div class="word">${t.trend.word}</div>
        </div>
      </div>
      ${c.error?`<p class="error" style="padding:0 18px">${f(c.error)}</p>`:""}
      ${o}`;return}if(c.screen==="koers"){R().innerHTML=`
      ${a}
      ${xe(r.profile.themes,"Tik een suggestie of typ zelf. Geen vaste lijst. Later aan te passen.")}
      ${we(He(r.items,r.events,w(),W(r.items)))}
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
            <div class="val" style="font-size:1.15rem">${K(s.started_on)} → ${s.deadline?K(s.deadline):"—"}</div>
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
      ${lt(r.profile.horizon_1y,r.rotated)?'<div class="banner">Zet een 1-jaars B. Etappes roteren.</div>':""}
      <div class="sec-hd">${h("ik")} Ik</div>
      <div class="card">
        <div class="field">
          <div class="lbl">Leven dat ik weiger</div>
          <textarea data-id="identity_anti" maxlength="${S.identity_anti}">${f(r.profile.identity_anti??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wie ik word</div>
          <textarea data-id="identity_new" maxlength="${S.identity_new}">${f(r.profile.identity_new??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wat B niet mag schenden</div>
          <textarea data-id="identity_constraint" maxlength="${S.identity_constraint}">${f(r.profile.identity_constraint??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">1-jaars B</div>
          <textarea data-id="horizon_1y" maxlength="${S.horizon_1y}">${f(r.profile.horizon_1y??"")}</textarea>
        </div>
        <button class="btn primary" data-act="save-ik">Bewaar</button>
      </div>
      <div class="card stack">
        <button class="btn ghost ico-btn" data-act="export">${h("export")}<span>Exporteer JSON</span></button>
      </div>
      ${c.error?`<p class="error" style="padding:0 18px">${f(c.error)}</p>`:""}
      ${o}`;return}if(c.screen==="voortgang"){const l=Qt(r.items,r.events,w(),r.vector.a,W(r.items));R().innerHTML=`
      ${a}
      ${we(l.week)}
      <div class="sec-hd">Lijn</div>
      <div class="card">
        <div class="note" style="margin-top:0">Huidige deze week. Geen score.</div>
        ${En(l.line.map(u=>u.current),w(),l.line)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Nu</div><div class="val">${x(t.current)}</div></div>
          <div><div class="lbl">Gedaan</div><div class="val">${l.hits}</div></div>
        </div>
      </div>
      ${c.error?`<p class="error" style="padding:0 18px">${f(c.error)}</p>`:""}
      ${o}`;return}if(c.screen==="profiel"){const l=r.profile.goals??[],u=r.profile.age_band,v=Ht(r.items);R().innerHTML=`
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
      ${xe(r.profile.themes,"Tik een suggestie of typ zelf. Later aan te passen.")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Parkeren of terughalen. Events blijven.</div>
        ${v.map(d=>jn(d)).join("")}
      </div>
      ${c.error?`<p class="error" style="padding:0 18px">${f(c.error)}</p>`:""}
      ${o}`;return}}function _e(e){const t=N(e),n=t.logged||!!t.skip,s=e.type==="medicijn"?"Genomen":"Done",i=re(e);return`
      <div class="card stof">
        <div class="ex-nm">${f(e.label)}</div>
        ${i?`<div class="note">${f(i)}</div>`:""}
        <div class="actions actions-two">
          <button class="btn ico-btn ${t.done?"track":""}" data-act="done" data-item="${e.id}" ${n?"disabled":""}>${h("done")}<span>${s}</span></button>
          <button class="btn ico-btn skip ${t.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${t.logged?"disabled":""}>${h("skip")}<span>Skip</span></button>
        </div>
        ${c.skipItemId===e.id||t.skip?`<div class="chips">${Q.map(a=>`<button class="chip ${t.skip===a?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${a}">${a}</button>`).join("")}</div>`:""}
      </div>`}function wn(e,t,n,s){return`<div class="chips">${Q.map(i=>`<button class="chip ${n===i?"on":""}" data-act="${s}" data-item="${e}" data-date="${t}" data-reason="${i}">${i}</button>`).join("")}</div>`}function et(e){const t=c.missKey===Xe(e.item.id,e.date)||!!e.reason;return`
      <div class="miss-row">
        <button class="miss-item" data-act="miss-open" data-item="${e.item.id}" data-date="${e.date}">
          <span class="ex-nm">${f(e.item.label)}</span>
          <span class="note">${e.reason?f(e.reason):K(e.date)}</span>
        </button>
        ${t?wn(e.item.id,e.date,e.reason,"miss"):""}
      </div>`}function xn(e){const t=[];return e.hits&&t.push(`${e.hits} gedaan`),e.skips&&t.push(`${e.skips} overgeslagen`),e.misses&&t.push(`${e.misses} niet gedaan`),t.length===0?"Nog geen dagen deze week.":t.join(" · ")}function Sn(e){return e==="skip"?"–":e==="miss"?"×":"·"}function we(e){return`
      <div class="sec-hd">Week</div>
      <div class="card">
        <div class="note" style="margin-top:0">${f(e.range)}</div>
        <div class="week-strip" aria-label="Weekoverzicht">
          ${e.days.map(t=>`<div class="week-day ${t.mark}${t.date===w()?" today":""}">
            <span class="week-lbl">${t.label}</span>
            <span class="week-mark">${Sn(t.mark)}</span>
          </div>`).join("")}
        </div>
        <div class="note">${f(xn(e))}</div>
        ${e.note?`<div class="week-note">${f(e.note)}</div>`:""}
        ${e.missRows.length?e.missRows.map(t=>et(t)).join(""):""}
      </div>`}function Ln(e){return`
      <div class="later-row">
        <div class="ex-nm">${f(e.label)}</div>
        <button class="btn ghost later-now" data-act="later-now" data-item="${e.id}">Nu</button>
      </div>`}function jn(e){const t=e.later;return`
      <div class="later-row">
        <div>
          <div class="ex-nm">${f(e.label)}</div>
          <div class="note" style="margin-top:4px">${t?"Later":"Nu"}</div>
        </div>
        <button class="btn ghost later-now" data-act="${t?"later-now":"later-park"}" data-item="${e.id}">${t?"Nu":"Later"}</button>
      </div>`}function En(e,t,n){const a=Xt(e,294,72);if(a.length===0)return'<div class="note">Nog geen lijn.</div>';const o=a.map((l,u)=>{const v=n[u]?.date===t;return`<circle class="${n[u]?.mark==="miss"?"prog-dot miss":v?"prog-dot now":"prog-dot"}" cx="${l.x.toFixed(1)}" cy="${l.y.toFixed(1)}" r="${v?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${en(a)}" />
          ${o}
        </svg>`}function xe(e,t){return`
      <section class="theme-sec" data-sec="themes">
        <div class="sec-hd">Thema's</div>
        <div class="card">
          <div class="ex-nm">Trainingsrichting</div>
          <div class="note">${f(t)}</div>
          ${Ve(e)}
        </div>
      </section>`}function In(e){if(!r)return"";const t=r.profile.goals??[],n=r.profile.age_band,s=Ft(r.items,t),i=c.startIds,a=`
    <div class="hdr">
      <div>
        ${Ze()}
        <div class="date-s">Start</div>
      </div>
    </div>`;if(e==="goals")return`
      ${a}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="ex-nm">Wat is je richting?</div>
        <div class="note">Eerst doelen. Types (gedrag, regel, medicijn, supplement, sociaal) komen daarna.</div>
        <div class="chips">${de.map(o=>`<button class="chip pick ${t.includes(o.id)?"on":""}" data-act="onboard-goal" data-goal="${o.id}">${o.label}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${t.length===0?"disabled":""}>Verder</button>
        </div>
      </div>`;if(e==="age")return`
      ${a}
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="ex-nm">Kies een band</div>
        <div class="note">Geen geboortedatum. Alleen een band.</div>
        <div class="chips">${ce.map(o=>`<button class="chip pick ${n===o?"on":""}" data-act="onboard-age" data-age="${o}">${o}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${n?"":"disabled"}>Verder</button>
        </div>
      </div>`;if(e==="themes"){const o=r.profile.themes??[];return`
      ${a}
      <div class="sec-hd">Thema's</div>
      <div class="card">
        <div class="ex-nm">Trainingsrichting</div>
        <div class="note">Tik een suggestie of typ zelf. Mag leeg. Later aan te passen.</div>
        ${Ve(o)}
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-themes-done">Verder</button>
        </div>
      </div>`}return`
    ${a}
    <div class="sec-hd">Start</div>
    <div class="card">
      <div class="ex-nm">Max ${V} nu</div>
      <div class="note">De rest gaat naar Later. Later blijft zichtbaar.</div>
      <div class="chips">${s.map(o=>`<button class="chip pick ${i.includes(o.id)?"on":""}" data-act="onboard-start" data-item="${o.id}">${f(o.label)}</button>`).join("")}</div>
      <div class="note">${i.length} / ${V} gekozen</div>
      <div class="stack" style="margin-top:16px">
        <button class="btn primary" data-act="onboard-done" ${i.length===0?"disabled":""}>Naar Vandaag</button>
      </div>
    </div>`}function Tn(e){const t=re(e);return`
      <div class="card quiet">
        <div class="ex-nm">${f(e.label)}</div>
        ${t?`<div class="note">${f(t)}</div>`:'<div class="note">Regel. Geen afvinken.</div>'}
      </div>`}function An(e,t,n){const s=N(e),i=Y(e),a=s.logged||!!s.skip,o=i&&s.current!==null&&e.b!==null&&s.current>=e.b,l=a||o,u=i,v=Ct(e),d=re(e),p=u&&t.suggestedMilestone&&e.id===r.vector.id;return`
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
        ${c.skipItemId===e.id||s.skip?`<div class="chips">${Q.map(g=>`<button class="chip ${s.skip===g?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${g}">${g}</button>`).join("")}</div>`:""}
        ${p?`<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${x(t.suggestedMilestone)}.</div>
               ${c.advanceWarn&&r.profile.identity_constraint?`<div class="banner">Check: ${f(r.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${x(t.suggestedMilestone)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`:`<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${t.suggestedMilestone}">Volgende etappe ${x(t.suggestedMilestone)}</button>
                      </div>`}`:""}
        ${u&&n?`<div class="note">${f(n)}</div>`:""}
      </div>`}function x(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function A(e){if(!c.busy){c.busy=!0,c.error=null;try{await e()}catch(t){c.error=t instanceof Error?t.message:"Er ging iets mis"}finally{c.busy=!1,E()}}}async function Bn(e){y=e,r=await y.load(),c.screen="vandaag",E()}async function Mn(){_n(),Cn(),await Bn(yn())}function Cn(){document.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const t=e.target;!(t instanceof HTMLInputElement)||t.dataset.id!=="theme-custom"||(e.preventDefault(),tt())}),document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(on(n)){c.screen=n,c.skipItemId=null,c.missKey=null,c.advanceWarn=!1,E();return}Dn(t)})}async function Dn(e){const t=e.dataset.act;if(!t||!y||!r)return;const n=Qe(),s=w();if(t==="sleep-inc"||t==="sleep-dec"){const i=n.sleep??7,a=Math.max(0,Math.min(14,i+(t==="sleep-inc"?.5:-.5)));await D({date:s,kind:"body_sleep",value:a,skip_reason:null,item_id:null});return}if(t==="energy"){const i=Number(e.dataset.n),a=n.energy===i?null:i;if(a===null)return;await D({date:s,kind:"body_energy",value:a,skip_reason:null,item_id:null});return}if(t==="plus"){const i=r.items.find(o=>o.id===e.dataset.item);if(!i||!Y(i))return;const a=N(i);if(a.logged||a.skip||i.b!==null&&a.current!==null&&a.current>=i.b)return;await D({date:s,kind:"set",value:(a.current??i.a??0)+1,skip_reason:null,item_id:i.id});return}if(t==="done"){const i=r.items.find(o=>o.id===e.dataset.item);if(!i)return;const a=N(i);if(a.logged||a.skip)return;await D({date:s,kind:"done",value:a.current??i.a,skip_reason:null,item_id:i.id});return}if(t==="skip-open"){const i=e.dataset.item??null;c.skipItemId=c.skipItemId===i?null:i,E();return}if(t==="skip"){const i=r.items.find(l=>l.id===e.dataset.item);if(!i||N(i).logged)return;const o=e.dataset.reason;if(!ye(o))return;await D({date:s,kind:"skip",value:null,skip_reason:o,item_id:i.id}),c.skipItemId=null;return}if(t==="miss-open"){const i=e.dataset.item,a=e.dataset.date;if(!i||!a)return;const o=Xe(i,a);c.missKey=c.missKey===o?null:o,E();return}if(t==="miss"){const i=r.items.find(u=>u.id===e.dataset.item),a=e.dataset.date,o=e.dataset.reason;if(!i||!a||a>=s||!ye(o))return;const l=N(i,a);if(l.logged||l.skip)return;await D({date:a,kind:"miss",value:null,skip_reason:o,item_id:i.id}),c.missKey=null;return}if(t==="advance"){if(!n.suggestedMilestone)return;if(rt(r.profile.identity_constraint)&&!c.advanceWarn){c.advanceWarn=!0,E();return}await Se(n.suggestedMilestone);return}if(t==="advance-go"){if(!n.suggestedMilestone)return;await Se(n.suggestedMilestone);return}if(t==="advance-cancel"){c.advanceWarn=!1,E();return}if(t==="onboard-goal"){const i=e.dataset.goal;if(!i||!Jt(i))return;const a={...r.profile,goals:Ut(r.profile.goals??[],i)};await A(async()=>{await y.saveProfile(a),r.profile=a});return}if(t==="onboard-age"){const i=e.dataset.age;if(!i||!Zt(i))return;const a={...r.profile,age_band:i};await A(async()=>{await y.saveProfile(a),r.profile=a});return}if(t==="theme-toggle"){const i=e.dataset.theme;if(!i)return;await ie(tn(B(r.profile.themes),i));return}if(t==="theme-add"){await tt();return}if(t==="onboard-start"){const i=e.dataset.item;if(!i)return;c.startIds=Yt(c.startIds,i),E();return}if(t==="onboard-next"){E();return}if(t==="onboard-themes-done"){await ie(r.profile.themes??[],!0);return}if(t==="onboard-done"){const i=r.profile.age_band,a=r.profile.goals??[];if(!i||a.length===0||c.startIds.length===0)return;await A(async()=>{await y.saveOnboarding({goals:a,age_band:i,startIds:c.startIds}),r=await y.load(),c.screen="vandaag"});return}if(t==="later-now"||t==="later-park"){const i=e.dataset.item;if(!i)return;await A(async()=>{await y.setItemLater(i,t==="later-park"),r=await y.load()});return}if(t==="save-ik"){const i={...r.profile,identity_anti:C(G("identity_anti"),S.identity_anti),identity_new:C(G("identity_new"),S.identity_new),identity_constraint:C(G("identity_constraint"),S.identity_constraint),horizon_1y:C(G("horizon_1y"),S.horizon_1y)};await A(async()=>{await y.saveProfile(i),r.profile=i});return}if(t==="export"){it(r);return}}async function tt(){if(!r)return;const e=G("theme-custom")??"",t=B(r.profile.themes),n=nn(t,e);n.length===t.length&&n.every((s,i)=>s===t[i])||await ie(n)}async function ie(e,t=!1){if(!y||!r)return;const n=B(e),s={...r.profile,themes:n},i=t||!We(r);await A(async()=>{if(i){await y.saveThemes(n),r=await y.load();return}await y.saveProfile(s),r.profile=s})}function G(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function Se(e){await A(async()=>{r.stage=await y.advanceStage(r.stage,e),r.items=r.items.map(t=>t.id===r.stage.vector_id?{...t,milestone:e}:t),r.rotated=!0,c.advanceWarn=!1})}async function D(e){await A(async()=>{const t=await y.addEvent(e);r.events.push(t)})}Mn();
