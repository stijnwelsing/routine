(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();function lt(e){return JSON.stringify({exported_at:new Date().toISOString(),profile:e.profile,items:e.items,stage:e.stage,events:e.events},null,2)}function dt(e){const t=new Blob([lt(e)],{type:"application/json"}),n=URL.createObjectURL(t),s=document.createElement("a");s.href=n,s.download=`routine-${e.profile.id.slice(0,8)}.json`,s.click(),URL.revokeObjectURL(n)}const ct="geen zin",S={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140};function M(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function ut(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===ct).length}function ft(e,t){const n=M(e,S.identity_new);return!n||ut(t)<2?null:n}function pt(e){return!!M(e,S.identity_constraint)}function mt(e,t){return t&&!M(e,S.horizon_1y)}function Ae(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const Be=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],Me=["zo","ma","di","wo","do","vr","za"];function _(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${s}`}function T(e,t){const n=z(e);return n.setDate(n.getDate()+t),_(n)}function z(e){const[t,n,s]=e.split("-").map(Number);return new Date(t,n-1,s)}function vt(e){const t=z(e);return`${Me[t.getDay()]} ${t.getDate()} ${Be[t.getMonth()]}`}function K(e){const t=z(e);return`${t.getDate()} ${Be[t.getMonth()]}`}function gt(e){return Me[z(e).getDay()]}function yt(e){const t=z(e).getDay();return t===0?7:t}function re(e){const t=z(e),n=t.getDay(),s=n===0?-6:1-n;return t.setDate(t.getDate()+s),_(t)}function oe(e,t){const n=[];let s=e;for(;s<=t;)n.push(s),s=T(s,1);return n}function G(){return crypto.randomUUID()}function kt(){return new Date().toISOString()}const bt=2,ht=6;function Y(e,t){return e.created_at.localeCompare(t.created_at)}function le(e,t,n){return e.filter(s=>s.date===t&&s.kind===n).sort(Y).at(-1)}function Ce(e,t){return t.filter(s=>s.kind==="set").sort(Y).at(-1)?.value??e}function $t(e,t){return le(e,t,"body_sleep")?.value??null}function _t(e,t){return le(e,t,"body_energy")?.value??null}function H(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip")).sort(Y).at(-1)}function De(e,t){const n=H(e,t);return n?.kind==="skip"?n.skip_reason:null}function Ne(e,t){return H(e,t)?.kind==="done"}function Oe(e,t){return H(e,t)?.kind==="set"}function ze(e,t){const n=H(e,t);return n?.kind==="set"||n?.kind==="done"}function wt(e,t){return e!==null&&e<ht||t!==null&&t<=bt}function xt(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const s=Math.max(1,Math.ceil(n/2));return Math.min(t,e+s)}function V(e,t,n,s){if(t<s)return"empty";const i=H(e,t);return i?.kind==="done"||i?.kind==="set"?"done":i?.kind==="skip"?"skip":le(e,t,"miss")?"miss":t>=n?"empty":"miss"}function St(e,t,n="1970-01-01"){let s=0,i=t;for(let a=0;a<400;a+=1){const r=V(e,i,t,n);if(r==="done")s+=1;else if(r==="skip"||r==="empty"&&i===t){i=T(i,-1);continue}else break;i=T(i,-1)}return s}function Lt(e,t,n){const s=re(t),i=!n||n<s?s:n;let a=0,r=0;for(const d of oe(i,t)){const u=V(e,d,t,n??i);u==="skip"||u==="empty"||(r+=1,u==="done"&&(a+=1))}return{hits:a,eligible:r}}function It(e,t,n="1970-01-01",s=3){const i=V(e,t,t,n);if(i==="done"||i==="skip")return!1;const a=T(t,-1);if(a<n)return!1;const r=T(t,-s),d=n>r?n:r;return oe(d,a).some(u=>V(e,u,t,n)==="miss")}function Tt(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled&&!e.todayLogged?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function jt(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${be(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${be(e.milestone)}.`}function be(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function Ge(e,t,n){return t.filter(i=>i.kind==="set"&&i.date<=n).sort(Y).at(-1)?.value??e}function Et(e,t,n,s){const i=Ce(e.a,n),a=$t(n,s),r=_t(n,s),d=Ne(n,s),u=Oe(n,s),v=ze(n,s),c=De(n,s),m=wt(a,r),g=i>=t.milestone,L=i>=e.b,B=It(n,s,t.started_on),D=re(s),f=Ge(e.a,n,T(D,-1)),$=Tt({current:i,weekStartCurrent:f,gearDown:m,stalled:B,milestoneHit:g,todayLogged:u||d||!!c});return{current:i,sleep:a,energy:r,doneToday:d,plusToday:u,setLoggedToday:v,skipToday:c,gearDown:m,milestoneHit:g,atB:L,trend:$,hitrate:Lt(n,s,t.started_on),streak:St(n,s,t.started_on),nextAction:jt({milestone:t.milestone,b:e.b,gearDown:m,milestoneHit:g,atB:L,stalled:B,doneToday:d,plusToday:u,skipToday:c}),suggestedMilestone:g&&!L&&!m?xt(t.milestone,e.b):null}}const J=["geen tijd","geen energie","vergeten","geen zin","pijn"];function he(e){return!!(e&&J.includes(e))}const At=["guideline","evidence-informed","public-framework","user preference","hypothesis"],Bt=["vandaag","koers","voortgang","profiel"];function Mt(e){return!!(e&&Bt.includes(e))}const k={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},Re="routine_loop_v6",Ct=["routine_loop_v5","routine_loop_v4","routine_loop_v3"],$e="routine_local_user_id",_e="routine_local_tenant_id",Dt="routine_local_chosen";function Nt(e){return e.trim().toLowerCase().normalize("NFC")}function Ot(e){return!!(e&&At.includes(e))}function zt(e){const t=Nt(e);return t==="cafeïne 90 min na opstaan"?"public-framework":t==="wandelen na eten"?"evidence-informed":t==="low carb"||t==="scherm uit 22:00"?"user preference":null}function de(e){return zt(e.label)??(Ot(e.template)?e.template:null)}function Gt(e){return de(e)!==null}function Rt(){return{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:null,condition:null}}function qt(e){return{mode:e?.mode??null,clock:e?.clock??null,anchor:e?.anchor??null,offset_min:e?.offset_min??null,window_min:e?.window_min??null,frequency:e?.frequency??null,condition:e?.condition??null}}function Kt(e,t){if(e.timing.frequency==="weekly"||e.type==="weekly"){const s=e.weekdays??[];return s.length===0?!1:s.includes(yt(t))}return!0}function Z(e){return ue(e)==="constraint"}function ce(e){return ue(e)==="preference"}function qe(e){return!Z(e)&&!ce(e)}function Q(e){const t=e.timing;return t.condition?t.condition:t.mode==="relative"&&t.anchor==="wake"&&t.offset_min!==null?`${t.offset_min} min na opstaan`:t.mode==="relative"&&t.anchor==="meal"?"na eten":t.mode==="clock"&&t.clock?t.clock:null}function Pt(e){return e.trim().toLowerCase().normalize("NFC")}function ue(e){if(e.role)return e.role;const t=Pt(e.label);return t==="low carb"?"preference":t==="cafeïne 90 min na opstaan"||t==="scherm uit 22:00"?"constraint":null}function W(e){return e.a!==null&&e.b!==null&&e.milestone!==null}function Ht(e,t){return Kt(e,t)}function Wt(e,t){return{...e,tenant_id:e.tenant_id??t,weekdays:e.weekdays??null,times_per_week:e.times_per_week??null,timing:qt(e.timing),role:ue(e),template:de(e),later:!!e.later}}function fe(e){return e.type==="medicijn"||e.type==="supplement"}function Ke(e){return e.type==="sociaal"}function Pe(e,t){return R(e,t).filter(n=>qe(n)&&!fe(n)&&!Ke(n)&&!n.later)}function Ft(e,t){return R(e,t).filter(n=>ce(n)&&!n.later)}function Vt(e,t){return R(e,t).filter(Z)}function He(e,t){return R(e,t).filter(n=>fe(n)&&!n.later)}function We(e,t){return R(e,t).filter(n=>Ke(n)&&!n.later)}function Ut(e,t){return R(e,t).filter(n=>n.later&&qe(n))}function R(e,t){return e.filter(n=>Ht(n,t)).sort((n,s)=>n.sort-s.sort)}function X(e){return e.find(W)}function ne(e){return e.kind==="body_sleep"||e.kind==="body_energy"||e.kind==="body_weight"}function ee(e,t,n){return e.filter(s=>ne(s)?!1:!!(s.item_id===t.id||s.item_id===null&&n&&t.id===n))}function Yt(e,t){return t?[...e.filter(ne),...ee(e,t,t.id)]:e.filter(ne)}function Fe(e){return e.a===null?null:e.unit==="sec"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} s`:e.unit==="reps"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} reps`:String(e.a)}function P(e){return e.trim().toLowerCase()}function Jt(e){const t=new Set,n=[];for(const s of e){const i=P(s.label);t.has(i)||(t.add(i),n.push(s))}return n}function Ve(e,t,n){const s=Jt(e),i=new Set(s.map(r=>P(r.label))),a=t.filter(r=>!i.has(P(r.label))).map(r=>({...r,tenant_id:n}));return[...s,...a]}function Zt(e){const t=new Map;for(const n of e)for(const s of n)t.has(s.id)||t.set(s.id,s);return[...t.values()].sort((n,s)=>n.created_at.localeCompare(s.created_at))}function Qt(e){return e?!!(e.identity_anti||e.identity_new||e.identity_constraint||e.horizon_1y||e.display_name):!1}function Xt(e,t,n,s){if(e.length===0)return null;const i=e.reduce((c,m)=>(m.events?.length??0)>(c.events?.length??0)?m:c),a=e.find(c=>Qt(c.profile))?.profile??i.profile,r=Ve([i,...e.filter(c=>c!==i)].flatMap(c=>c.items??[]),t,s),d=new Map(r.map(c=>[P(c.label),c.id])),u=new Map;for(const c of e)for(const m of c.items??[]){const g=d.get(P(m.label));g&&m.id!==g&&u.set(m.id,g)}const v=Zt(e.map(c=>c.events??[])).map(c=>{if(!c.item_id)return c;const m=u.get(c.item_id);return m?{...c,item_id:m}:c});return{...i,profile:{...a,id:a.id||n,tenant_id:a.tenant_id||s},items:r,events:v}}function en(e,t,n,s){return ee(e,t,n).some(i=>(i.kind==="set"||i.kind==="done"||i.kind==="skip"||i.kind==="miss")&&i.date<s)}function Ue(e,t){return e.created_at.localeCompare(t.created_at)}function tn(e,t,n){return e.filter(s=>s.date===t&&s.kind===n).sort(Ue).at(-1)}function nn(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip"||n.kind==="miss")).sort(Ue).at(-1)}function ie(e,t){return[...Pe(e,t),...He(e,t),...We(e,t)]}function se(e,t,n,s,i){const a=ee(e,t,i),r=nn(a,n);if(r?.kind==="set"||r?.kind==="done")return{item:t,date:n,mark:"hit",reason:null};if(r?.kind==="skip")return{item:t,date:n,mark:"skip",reason:r.skip_reason};const d=r?.kind==="miss"?r:tn(a,n,"miss");return d?{item:t,date:n,mark:"miss",reason:d.skip_reason}:n>=s?{item:t,date:n,mark:"open",reason:null}:{item:t,date:n,mark:"idle",reason:null}}function Ye(e,t,n,s){const i=T(n,-1);return ie(e,i).filter(a=>en(t,a,s,i)).map(a=>{const r=se(t,a,i,n,s);return r.mark==="hit"||r.mark==="skip"||r.mark==="miss"?r:{...r,mark:"miss",reason:null}}).filter(a=>a.mark==="miss"&&!a.reason)}function sn(e,t,n){return e.some(s=>s.mark==="hit")?"hit":e.some(s=>s.mark==="miss")?"miss":e.some(s=>s.mark==="skip")?"skip":t===n?"open":"idle"}function Je(e,t,n,s){const i=re(n),a=T(i,6),r=Ye(e,t,n,s),d=new Set(r.map(f=>`${f.item.id}:${f.date}`)),u=oe(i,a).map(f=>{const b=ie(e,f).map($=>{const te=se(t,$,f,n,s);return d.has(`${$.id}:${f}`)?{...te,mark:"miss",reason:te.reason}:te});return{date:f,label:gt(f),mark:sn(b,f,n),hits:b.filter($=>$.mark==="hit").length,misses:b.filter($=>$.mark==="miss").length,skips:b.filter($=>$.mark==="skip").length}}),v=u.filter(f=>f.date<n),c=v.reduce((f,b)=>f+b.hits,0),m=v.reduce((f,b)=>f+b.misses,0),g=v.reduce((f,b)=>f+b.skips,0),L=v.flatMap(f=>ie(e,f.date).map(b=>{const $=se(t,b,f.date,n,s);return d.has(`${b.id}:${f.date}`)?{...$,mark:"miss",reason:$.reason}:$}).filter(b=>b.mark==="miss")),B=v.filter(f=>f.mark!=="idle").length,D=c>0&&m===0&&B>=2?"Week staat.":null;return{start:i,end:a,range:`${K(i)} – ${K(a)}`,days:u,hits:c,misses:m,skips:g,missRows:L,note:D}}function F(e){return X(e)?.id}const U=3,pe=[{id:"kracht",label:"Kracht"},{id:"eten",label:"Eten & drinken"},{id:"slaap",label:"Slaap"},{id:"stofjes",label:"Stofjes"},{id:"bewegen",label:"Bewegen"}],me=["18–29","30–39","40–49","50–59","60+"],an={kracht:["Push-ups","Squats","Plank","Dead hang"],eten:["Niet snoepen","Low carb","Intermittent fasting","Geen alcohol"],slaap:["Koud douchen"],stofjes:["Medicijn ochtend","Vitamine D"],bewegen:["Wandelen na eten"]};function ve(e){return Z(e)||e.type==="weekly"?!1:e.type==="daily"||e.type==="leefregel"||e.type==="gedrag"||e.type==="sociaal"||fe(e)}function rn(e){return e.filter(ve).sort((t,n)=>t.sort-n.sort)}function Ze(e){return!(e.onboarded!==!1||(e.events??[]).length>0)}function on(e){return Ze(e)?e.profile.goals?.length?e.profile.age_band?e.theme_step!==!0?"themes":"start":"age":"goals":null}function ln(e,t){const n=e.filter(ve).sort((a,r)=>a.sort-r.sort);if(t.length===0)return n;const s=new Set(t.flatMap(a=>an[a]??[])),i=n.filter(a=>s.has(a.label));return i.length>0?i:n}function dn(e,t){const n=new Set(t.slice(0,U));return e.map(s=>ve(s)?{...s,later:!n.has(s.id)}:{...s,later:!1})}function cn(e,t){return e.includes(t)?e.filter(n=>n!==t):[...e,t]}function un(e,t){return e.includes(t)?e.filter(n=>n!==t):e.length>=U?e:[...e,t]}function fn(e){return pe.some(t=>t.id===e)}function pn(e){return me.includes(e)}function mn(e,t,n,s,i){const a=Je(e,t,n,i??F(e)),r=a.days.map(d=>({date:d.date,label:d.label,current:Ge(s,t,d.date<=n?d.date:n),mark:d.mark}));return{week:a,line:r,hits:a.hits,skips:a.skips,misses:a.misses}}function vn(e,t,n,s=18,i=16){if(e.length===0)return[];const a=Math.min(...e),d=Math.max(...e)-a,u=t-s*2,v=n-i*2;return e.map((c,m)=>{const g=e.length===1?t/2:s+m/(e.length-1)*u,L=d===0?n/2:i+(1-(c-a)/d)*v;return{x:g,y:L}})}function gn(e){return e.map(t=>`${t.x.toFixed(1)},${t.y.toFixed(1)}`).join(" ")}const we=["Military calisthenics","Kickbox","Spinnen"],Qe=40;function ge(e){const t=e.trim().replace(/\s+/g," ").slice(0,Qe);return t.length>0?t:null}function A(e){if(!Array.isArray(e))return[];const t=new Set,n=[];for(const s of e){if(typeof s!="string")continue;const i=ge(s);if(!i)continue;const a=i.toLowerCase();t.has(a)||(t.add(a),n.push(i))}return n}function yn(e,t){const n=ge(t);if(!n)return e;const s=n.toLowerCase();return e.some(i=>i.toLowerCase()===s)?e.filter(i=>i.toLowerCase()!==s):[...e,n]}function kn(e,t){const n=ge(t);if(!n)return e;const s=n.toLowerCase();return e.some(i=>i.toLowerCase()===s)?e:[...e,n]}function bn(e){const n=A(e).filter(s=>!we.some(i=>i.toLowerCase()===s.toLowerCase()));return[...we,...n]}function xe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function Xe(e){const t=new Set(A(e).map(s=>s.toLowerCase()));return`<div class="chips">${bn(e).map(s=>`<button class="chip pick ${t.has(s.toLowerCase())?"on":""}" data-act="theme-toggle" data-theme="${xe(s)}">${xe(s)}</button>`).join("")}</div>
        <div class="theme-add">
          <input data-id="theme-custom" type="text" maxlength="${Qe}" placeholder="Eigen thema" autocomplete="off" enterkeyhint="done" />
          <button class="btn ghost" data-act="theme-add">Voeg toe</button>
        </div>`}function hn(e){return e.skip?null:e.plus?{text:"Set gedaan.",tone:"fog"}:e.done?e.type==="medicijn"?{text:"Genomen.",tone:"sage"}:e.track?{text:"Set staat.",tone:"sage"}:{text:"Staat.",tone:"sage"}:null}function et(e,t){return{id:e,tenant_id:t,display_name:null,...Ae(),age_band:null,goals:[],themes:[]}}function tt(e,t,n=_()){return{id:G(),tenant_id:t,vector_id:e,milestone:k.milestone,started_on:n,deadline:T(n,k.windowDays),status:"active",stage_type:k.stageType}}function ye(e){const t=n=>({id:G(),tenant_id:e,timing:Rt(),role:null,template:null,later:!1,...n});return[t({type:"daily",label:"Push-ups",unit:"reps",a:k.a,b:k.b,milestone:k.milestone,weekdays:null,times_per_week:null,sort:0}),t({type:"daily",label:"Squats",unit:"reps",a:30,b:null,milestone:null,weekdays:null,times_per_week:null,sort:1}),t({type:"daily",label:"Plank",unit:"sec",a:60,b:null,milestone:null,weekdays:null,times_per_week:null,sort:2}),t({type:"daily",label:"Dead hang",unit:"sec",a:45,b:null,milestone:null,weekdays:null,times_per_week:null,sort:3}),t({type:"weekly",label:"Gerichte kracht",unit:null,a:null,b:null,milestone:null,weekdays:[],times_per_week:2,sort:4}),t({type:"leefregel",label:"Koud douchen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:5}),t({type:"leefregel",label:"Niet snoepen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:6}),t({type:"leefregel",label:"Low carb",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:7,role:"preference",template:"user preference"}),t({type:"leefregel",label:"Intermittent fasting",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:8}),t({type:"leefregel",label:"Geen alcohol",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:9}),t({type:"gedrag",label:"Cafeïne 90 min na opstaan",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:10,role:"constraint",template:"public-framework",timing:{mode:"relative",clock:null,anchor:"wake",offset_min:90,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Wandelen na eten",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:11,role:"action",template:"evidence-informed",timing:{mode:"relative",clock:null,anchor:"meal",offset_min:0,window_min:null,frequency:"daily",condition:"na eten"}}),t({type:"medicijn",label:"Medicijn ochtend",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:12,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"ochtend"}}),t({type:"supplement",label:"Vitamine D",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:13,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Bellen met iemand",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:14,role:"action",template:null,timing:{mode:"clock",clock:"18:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Iemand zien",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:1,sort:15,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"deze week"}}),t({type:"gedrag",label:"Scherm uit 22:00",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:16,role:"constraint",template:"user preference",timing:{mode:"clock",clock:"22:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}})]}function $n(e,t){return{id:e.id,tenant_id:e.tenant_id,user_id:t,domain:k.domain,a:e.a??k.a,b:e.b??k.b,unit:e.unit==="sec"?"sec":"reps",pace_constraint:null}}function _n(e,t=_(),n=G()){const s=et(e,n),i=ye(n),a=X(i)??i[0],r=$n(a,e),d=tt(r.id,n,t);return a.milestone!==null&&(d.milestone=a.milestone),{profile:s,items:i,vector:r,stage:d,events:[],rotated:!1,onboarded:!1,theme_step:!1}}function wn(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,items:e.items.map(n=>W(n)?{...n,a:k.a,b:k.b,milestone:k.milestone,unit:k.unit}:n),vector:{...e.vector,a:k.a,b:k.b,unit:k.unit},stage:{...e.stage,milestone:k.milestone},events:e.events}:e}function xn(){const e=localStorage.getItem($e);if(e)return e;const t=G();return localStorage.setItem($e,t),t}function Sn(){const e=localStorage.getItem(_e);if(e)return e;const t=G();return localStorage.setItem(_e,t),t}function I(e){localStorage.setItem(Re,JSON.stringify(e))}function Ln(e){if(!e)return null;try{const t=JSON.parse(e);return!t||typeof t!="object"?null:t}catch{return null}}function In(){return[Re,...Ct].map(e=>Ln(localStorage.getItem(e))).filter(e=>e!==null)}function Tn(e,t,n){const s=Ve(e.items??[],ye(n),n).map(i=>Wt(i,n));return{...e,profile:{...et(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...Ae(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null,age_band:e.profile?.age_band??null,goals:Array.isArray(e.profile?.goals)?e.profile.goals:[],themes:A(e.profile?.themes)},items:s,vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(i=>({...i,tenant_id:i.tenant_id??n,item_id:i.item_id??null})),rotated:!!e.rotated,onboarded:e.onboarded??!0,theme_step:e.theme_step??!1}}function j(e,t){const n=In();if(n.length===0){const a=_n(e,_(),t);return I(a),a}const s=Xt(n,ye(t),e,t)??n[0],i=wn(Tn(s,e,t));return I(i),i}function jn(){localStorage.setItem(Dt,"1");const e=xn(),t=Sn();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return j(e,t)},async addEvent(n){const s=j(e,t),i={id:n.id??G(),tenant_id:t,user_id:e,item_id:n.item_id??null,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:kt()};return s.events.push(i),I(s),i},async saveProfile(n){const s=j(e,t);s.profile=n,I(s)},async saveOnboarding(n){const s=j(e,t);s.profile={...s.profile,goals:n.goals,age_band:n.age_band,themes:A(s.profile.themes)},s.items=dn(s.items,n.startIds),s.onboarded=!0,s.theme_step=!0,I(s)},async saveThemes(n){const s=j(e,t);s.profile={...s.profile,themes:A(n)},s.theme_step=!0,I(s)},async setItemLater(n,s){const i=j(e,t);i.items=i.items.map(a=>a.id===n?{...a,later:s}:a),I(i)},async saveVectorConstraint(n,s){const i=j(e,t);i.vector.id===n&&(i.vector.pace_constraint=s,I(i))},async advanceStage(n,s){const i=j(e,t),a=tt(n.vector_id,t);return a.milestone=s,i.stage=a,i.items=i.items.map(r=>r.id===n.vector_id?{...r,milestone:s}:r),i.rotated=!0,I(i),a},async signOut(){}}}const Se="#F0ECE4",En="#3D6B5A";function nt(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${Se}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${Se}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${En}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function h(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function An(e){return e==="stokt"||e==="herstel"?"ember":e==="stijgt"?"sage":"fog"}function Le(e){const t=An(e);return e==="stokt"||e==="herstel"||e==="zakt"?h("status-kink",`ico-${t}`):e==="stijgt"?h("status-up",`ico-${t}`):h("status-flat",`ico-${t}`)}function Bn(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${h(n?"dot-now":"dot")}</button>`}).join("")}const Mn=`
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
</svg>`;function Cn(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",Mn)}const N=()=>document.querySelector("#app"),l={screen:"vandaag",skipItemId:null,missKey:null,detailItemId:null,advanceWarn:!1,busy:!1,error:null,startIds:[]};let y=null,o=null;function it(){if(!o)throw new Error("geen snapshot");const e=X(o.items);return Et(o.vector,o.stage,Yt(o.events,e),_())}function C(e,t=_()){if(!o)throw new Error("geen snapshot");const n=X(o.items),s=ee(o.events,e,n?.id),i=e.a===null?null:Ce(e.a,s);return{done:Ne(s,t),plus:Oe(s,t),skip:De(s,t),logged:ze(s,t),current:i}}function st(e,t){return`${e}:${t}`}function p(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function w(){if(!o||!y)return;const e=on(o);if(e){N().innerHTML=qn(e);return}const t=it(),{vector:n,stage:s}=o,i=y.mode==="local"?"Lokaal":"Supabase",a=`
    <div class="hdr">
      <div>
        ${nt()}
        <div class="date-s">${vt(_())}</div>
      </div>
      <div class="mode-pill">${i}</div>
    </div>`,r=`
    <nav class="nav nav-4">
      <button data-nav="vandaag" class="${l.screen==="vandaag"?"active":""}">${h("day")}Vandaag</button>
      <button data-nav="koers" class="${l.screen==="koers"?"active":""}">${h("mark")}Koers</button>
      <button data-nav="voortgang" class="${l.screen==="voortgang"?"active":""}">${h("line")}Voortgang</button>
      <button data-nav="profiel" class="${l.screen==="profiel"?"active":""}">${h("me")}Profiel</button>
    </nav>`;if(l.detailItemId){const d=o.items.find(u=>u.id===l.detailItemId);if(d){N().innerHTML=`
      ${a}
      ${Pn(d)}
      ${l.error?`<p class="error" style="padding:0 18px">${p(l.error)}</p>`:""}
      ${r}`;return}l.detailItemId=null}if(l.screen==="vandaag"){const d=ft(o.profile.identity_new,o.events),u=_(),v=Pe(o.items,u),c=Vt(o.items,u),m=He(o.items,u),g=We(o.items,u),L=Ut(o.items,u),B=Ft(o.items,u),D=Ye(o.items,o.events,u,F(o.items));N().innerHTML=`
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
          <div class="dots">${Bn(t.energy)}</div>
        </div>
      </div>
      ${B.length?`<div class="sec-hd">Dag</div>
      <div class="card quiet">
        <div class="day-tags">${B.map(f=>Kn(f)).join("")}</div>
      </div>`:""}
      ${c.length?`<div class="sec-hd">Regel</div>${c.map(f=>Hn(f)).join("")}`:""}
      ${m.length?`<div class="sec-hd">Stofjes</div>${m.map(f=>Ie(f)).join("")}`:""}
      ${g.length?`<div class="sec-hd">Sociaal</div>${g.map(f=>Ie(f)).join("")}`:""}
      ${D.length?`<div class="sec-hd">Niet gedaan</div>
      <div class="card">
        <div class="note" style="margin-top:0">Geen +1, Done of Skip. Korte reden.</div>
        ${D.map(f=>rt(f)).join("")}
      </div>`:""}
      <div class="sec-hd">Vandaag</div>
      ${v.map(f=>Wn(f,t,d)).join("")}
      ${L.length?`<div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Niet in je start. Blijft bewaard.</div>
        ${L.map(f=>zn(f)).join("")}
      </div>`:""}
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${Le(t.trend.word)}
          <div class="word">${t.trend.word}</div>
        </div>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${p(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="koers"){N().innerHTML=`
      ${a}
      ${je(o.profile.themes,"Tik een suggestie of typ zelf. Geen vaste lijst. Later aan te passen.")}
      ${Te(Je(o.items,o.events,_(),F(o.items)))}
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
            <div class="val status">${Le(t.trend.word)} ${t.trend.word}</div>
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
      ${mt(o.profile.horizon_1y,o.rotated)?'<div class="banner">Zet een 1-jaars B. Etappes roteren.</div>':""}
      <div class="sec-hd">${h("ik")} Ik</div>
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
        <button class="btn ghost ico-btn" data-act="export">${h("export")}<span>Exporteer JSON</span></button>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${p(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="voortgang"){const d=mn(o.items,o.events,_(),o.vector.a,F(o.items));N().innerHTML=`
      ${a}
      ${Te(d.week)}
      <div class="sec-hd">Lijn</div>
      <div class="card">
        <div class="note" style="margin-top:0">Huidige deze week. Geen score.</div>
        ${Rn(d.line.map(u=>u.current),_(),d.line)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Nu</div><div class="val">${x(t.current)}</div></div>
          <div><div class="lbl">Gedaan</div><div class="val">${d.hits}</div></div>
        </div>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${p(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="profiel"){const d=o.profile.goals??[],u=o.profile.age_band,v=rn(o.items);N().innerHTML=`
      ${a}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="note" style="margin-top:0">Later aan te passen. Geen wipe.</div>
        <div class="chips">${pe.map(c=>`<button class="chip pick ${d.includes(c.id)?"on":""}" data-act="onboard-goal" data-goal="${c.id}">${c.label}</button>`).join("")}</div>
      </div>
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="note" style="margin-top:0">Alleen een band. Geen geboortedatum.</div>
        <div class="chips">${me.map(c=>`<button class="chip pick ${u===c?"on":""}" data-act="onboard-age" data-age="${c}">${c}</button>`).join("")}</div>
      </div>
      ${je(o.profile.themes,"Tik een suggestie of typ zelf. Later aan te passen.")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Parkeren of terughalen. Events blijven.</div>
        ${v.map(c=>Gn(c)).join("")}
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${p(l.error)}</p>`:""}
      ${r}`;return}}function at(e){const t=C(e),n=hn({plus:t.plus,done:t.done,skip:t.skip,type:e.type,track:W(e)});return n?`<div class="confirm ${n.tone}" role="status">${p(n.text)}</div>`:""}function Ie(e){const t=C(e),n=t.logged||!!t.skip,s=e.type==="medicijn"?"Genomen":"Done",i=Q(e);return`
      <div class="card stof">
        ${ke(e)}
        ${i?`<div class="note">${p(i)}</div>`:""}
        <div class="actions actions-two">
          <button class="btn ico-btn ${t.done?"track":""}" data-act="done" data-item="${e.id}" ${n?"disabled":""}>${h("done")}<span>${s}</span></button>
          <button class="btn ico-btn skip ${t.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${t.logged?"disabled":""}>${h("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||t.skip?`<div class="chips">${J.map(a=>`<button class="chip ${t.skip===a?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${a}">${a}</button>`).join("")}</div>`:""}
        ${at(e)}
      </div>`}function Dn(e,t,n,s){return`<div class="chips">${J.map(i=>`<button class="chip ${n===i?"on":""}" data-act="${s}" data-item="${e}" data-date="${t}" data-reason="${i}">${i}</button>`).join("")}</div>`}function rt(e){const t=l.missKey===st(e.item.id,e.date)||!!e.reason;return`
      <div class="miss-row">
        <button class="miss-item" data-act="miss-open" data-item="${e.item.id}" data-date="${e.date}">
          <span class="ex-nm">${p(e.item.label)}</span>
          <span class="note">${e.reason?p(e.reason):K(e.date)}</span>
        </button>
        ${t?Dn(e.item.id,e.date,e.reason,"miss"):""}
      </div>`}function Nn(e){const t=[];return e.hits&&t.push(`${e.hits} gedaan`),e.skips&&t.push(`${e.skips} overgeslagen`),e.misses&&t.push(`${e.misses} niet gedaan`),t.length===0?"Nog geen dagen deze week.":t.join(" · ")}function On(e){return e==="skip"?"–":e==="miss"?"×":"·"}function Te(e){return`
      <div class="sec-hd">Week</div>
      <div class="card">
        <div class="note" style="margin-top:0">${p(e.range)}</div>
        <div class="week-strip" aria-label="Weekoverzicht">
          ${e.days.map(t=>`<div class="week-day ${t.mark}${t.date===_()?" today":""}">
            <span class="week-lbl">${t.label}</span>
            <span class="week-mark">${On(t.mark)}</span>
          </div>`).join("")}
        </div>
        <div class="note">${p(Nn(e))}</div>
        ${e.note?`<div class="week-note">${p(e.note)}</div>`:""}
        ${e.missRows.length?e.missRows.map(t=>rt(t)).join(""):""}
      </div>`}function zn(e){return`
      <div class="later-row">
        <div class="ex-nm">${p(e.label)}</div>
        <button class="btn ghost later-now" data-act="later-now" data-item="${e.id}">Nu</button>
      </div>`}function Gn(e){const t=e.later;return`
      <div class="later-row">
        <div>
          <div class="ex-nm">${p(e.label)}</div>
          <div class="note" style="margin-top:4px">${t?"Later":"Nu"}</div>
        </div>
        <button class="btn ghost later-now" data-act="${t?"later-now":"later-park"}" data-item="${e.id}">${t?"Nu":"Later"}</button>
      </div>`}function Rn(e,t,n){const a=vn(e,294,72);if(a.length===0)return'<div class="note">Nog geen lijn.</div>';const r=a.map((d,u)=>{const v=n[u]?.date===t;return`<circle class="${n[u]?.mark==="miss"?"prog-dot miss":v?"prog-dot now":"prog-dot"}" cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${v?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${gn(a)}" />
          ${r}
        </svg>`}function je(e,t){return`
      <section class="theme-sec" data-sec="themes">
        <div class="sec-hd">Thema's</div>
        <div class="card">
          <div class="ex-nm">Trainingsrichting</div>
          <div class="note">${p(t)}</div>
          ${Xe(e)}
        </div>
      </section>`}function qn(e){if(!o)return"";const t=o.profile.goals??[],n=o.profile.age_band,s=ln(o.items,t),i=l.startIds,a=`
    <div class="hdr">
      <div>
        ${nt()}
        <div class="date-s">Start</div>
      </div>
    </div>`;if(e==="goals")return`
      ${a}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="ex-nm">Wat is je richting?</div>
        <div class="note">Eerst doelen. Types (gedrag, regel, medicijn, supplement, sociaal) komen daarna.</div>
        <div class="chips">${pe.map(r=>`<button class="chip pick ${t.includes(r.id)?"on":""}" data-act="onboard-goal" data-goal="${r.id}">${r.label}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${t.length===0?"disabled":""}>Verder</button>
        </div>
      </div>`;if(e==="age")return`
      ${a}
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="ex-nm">Kies een band</div>
        <div class="note">Geen geboortedatum. Alleen een band.</div>
        <div class="chips">${me.map(r=>`<button class="chip pick ${n===r?"on":""}" data-act="onboard-age" data-age="${r}">${r}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${n?"":"disabled"}>Verder</button>
        </div>
      </div>`;if(e==="themes"){const r=o.profile.themes??[];return`
      ${a}
      <div class="sec-hd">Thema's</div>
      <div class="card">
        <div class="ex-nm">Trainingsrichting</div>
        <div class="note">Tik een suggestie of typ zelf. Mag leeg. Later aan te passen.</div>
        ${Xe(r)}
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-themes-done">Verder</button>
        </div>
      </div>`}return`
    ${a}
    <div class="sec-hd">Start</div>
    <div class="card">
      <div class="ex-nm">Max ${U} nu</div>
      <div class="note">De rest gaat naar Later. Later blijft zichtbaar.</div>
      <div class="chips">${s.map(r=>`<button class="chip pick ${i.includes(r.id)?"on":""}" data-act="onboard-start" data-item="${r.id}">${p(r.label)}</button>`).join("")}</div>
      <div class="note">${i.length} / ${U} gekozen</div>
      <div class="stack" style="margin-top:16px">
        <button class="btn primary" data-act="onboard-done" ${i.length===0?"disabled":""}>Naar Vandaag</button>
      </div>
    </div>`}function ke(e){return Gt(e)?`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${p(e.label)}</button>`:`<div class="ex-nm">${p(e.label)}</div>`}function Kn(e){return`<button class="chip pick" data-act="detail-open" data-item="${e.id}">${p(e.label)}</button>`}function Pn(e){const t=de(e),n=Q(e),s=Fe(e),i=ce(e),a=Z(e);return`
      <button class="btn ghost detail-back" data-act="detail-close">Terug</button>
      <div class="sec-hd">Detail</div>
      <div class="card">
        <div class="ex-nm">${p(e.label)}</div>
        ${n?`<div class="note">${p(n)}</div>`:""}
        ${s?`<div class="work">${p(s)}</div>`:""}
        ${i?'<div class="note">Voorkeur. Geen regel.</div>':""}
        ${a&&!n?'<div class="note">Regel. Geen afvinken.</div>':""}
      </div>
      ${t?`<div class="sec-hd">Bron</div>
      <div class="card quiet">
        <div class="src-tag">${p(t)}</div>
      </div>`:""}`}function Hn(e){const t=Q(e);return`
      <div class="card quiet">
        ${ke(e)}
        ${t?`<div class="note">${p(t)}</div>`:'<div class="note">Regel. Geen afvinken.</div>'}
      </div>`}function Wn(e,t,n){const s=C(e),i=W(e),a=s.logged||!!s.skip,r=i&&s.current!==null&&e.b!==null&&s.current>=e.b,d=a||r,u=i,v=Fe(e),c=Q(e),m=u&&t.suggestedMilestone&&e.id===o.vector.id;return`
      <div class="card">
        ${ke(e)}
        ${c&&!v&&!i?`<div class="note">${p(c)}</div>`:""}
        ${i?`<div class="track">
          <span class="now">${x(s.current??e.a??0)}</span>
          <span>→</span>
          <span class="mid">${x(e.milestone??0)}</span>
          <span>→</span>
          <span class="end">${x(e.b??0)}</span>
        </div>`:v?`<div class="work">${p(v)}</div>`:""}
        <div class="actions ${i?"":"actions-two"}">
          ${i?`<button class="btn ico-btn ${s.plus?"on":""}" data-act="plus" data-item="${e.id}" ${d?"disabled":""}>${h("plus")}<span>+1</span></button>`:""}
          <button class="btn ico-btn ${s.done?"track":""}" data-act="done" data-item="${e.id}" ${a?"disabled":""}>${h("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${s.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${s.logged?"disabled":""}>${h("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||s.skip?`<div class="chips">${J.map(g=>`<button class="chip ${s.skip===g?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${g}">${g}</button>`).join("")}</div>`:""}
        ${at(e)}
        ${m?`<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${x(t.suggestedMilestone)}.</div>
               ${l.advanceWarn&&o.profile.identity_constraint?`<div class="banner">Check: ${p(o.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${x(t.suggestedMilestone)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`:`<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${t.suggestedMilestone}">Volgende etappe ${x(t.suggestedMilestone)}</button>
                      </div>`}`:""}
        ${u&&n?`<div class="note">${p(n)}</div>`:""}
      </div>`}function x(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function E(e){if(!l.busy){l.busy=!0,l.error=null;try{await e()}catch(t){l.error=t instanceof Error?t.message:"Er ging iets mis"}finally{l.busy=!1,w()}}}async function Fn(e){y=e,o=await y.load(),l.screen="vandaag",w()}async function Vn(){Cn(),Un(),await Fn(jn())}function Un(){document.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const t=e.target;!(t instanceof HTMLInputElement)||t.dataset.id!=="theme-custom"||(e.preventDefault(),ot())}),document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(Mt(n)){l.screen=n,l.skipItemId=null,l.missKey=null,l.detailItemId=null,l.advanceWarn=!1,w();return}Yn(t)})}async function Yn(e){const t=e.dataset.act;if(!t||!y||!o)return;const n=it(),s=_();if(t==="sleep-inc"||t==="sleep-dec"){const i=n.sleep??7,a=Math.max(0,Math.min(14,i+(t==="sleep-inc"?.5:-.5)));await O({date:s,kind:"body_sleep",value:a,skip_reason:null,item_id:null});return}if(t==="energy"){const i=Number(e.dataset.n),a=n.energy===i?null:i;if(a===null)return;await O({date:s,kind:"body_energy",value:a,skip_reason:null,item_id:null});return}if(t==="plus"){const i=o.items.find(r=>r.id===e.dataset.item);if(!i||!W(i))return;const a=C(i);if(a.logged||a.skip||i.b!==null&&a.current!==null&&a.current>=i.b)return;await O({date:s,kind:"set",value:(a.current??i.a??0)+1,skip_reason:null,item_id:i.id});return}if(t==="done"){const i=o.items.find(r=>r.id===e.dataset.item);if(!i)return;const a=C(i);if(a.logged||a.skip)return;await O({date:s,kind:"done",value:a.current??i.a,skip_reason:null,item_id:i.id});return}if(t==="detail-open"){const i=e.dataset.item??null;if(!i||!o.items.some(a=>a.id===i))return;l.detailItemId=i,w();return}if(t==="detail-close"){l.detailItemId=null,w();return}if(t==="skip-open"){const i=e.dataset.item??null;l.skipItemId=l.skipItemId===i?null:i,w();return}if(t==="skip"){const i=o.items.find(d=>d.id===e.dataset.item);if(!i||C(i).logged)return;const r=e.dataset.reason;if(!he(r))return;await O({date:s,kind:"skip",value:null,skip_reason:r,item_id:i.id}),l.skipItemId=null;return}if(t==="miss-open"){const i=e.dataset.item,a=e.dataset.date;if(!i||!a)return;const r=st(i,a);l.missKey=l.missKey===r?null:r,w();return}if(t==="miss"){const i=o.items.find(u=>u.id===e.dataset.item),a=e.dataset.date,r=e.dataset.reason;if(!i||!a||a>=s||!he(r))return;const d=C(i,a);if(d.logged||d.skip)return;await O({date:a,kind:"miss",value:null,skip_reason:r,item_id:i.id}),l.missKey=null;return}if(t==="advance"){if(!n.suggestedMilestone)return;if(pt(o.profile.identity_constraint)&&!l.advanceWarn){l.advanceWarn=!0,w();return}await Ee(n.suggestedMilestone);return}if(t==="advance-go"){if(!n.suggestedMilestone)return;await Ee(n.suggestedMilestone);return}if(t==="advance-cancel"){l.advanceWarn=!1,w();return}if(t==="onboard-goal"){const i=e.dataset.goal;if(!i||!fn(i))return;const a={...o.profile,goals:cn(o.profile.goals??[],i)};await E(async()=>{await y.saveProfile(a),o.profile=a});return}if(t==="onboard-age"){const i=e.dataset.age;if(!i||!pn(i))return;const a={...o.profile,age_band:i};await E(async()=>{await y.saveProfile(a),o.profile=a});return}if(t==="theme-toggle"){const i=e.dataset.theme;if(!i)return;await ae(yn(A(o.profile.themes),i));return}if(t==="theme-add"){await ot();return}if(t==="onboard-start"){const i=e.dataset.item;if(!i)return;l.startIds=un(l.startIds,i),w();return}if(t==="onboard-next"){w();return}if(t==="onboard-themes-done"){await ae(o.profile.themes??[],!0);return}if(t==="onboard-done"){const i=o.profile.age_band,a=o.profile.goals??[];if(!i||a.length===0||l.startIds.length===0)return;await E(async()=>{await y.saveOnboarding({goals:a,age_band:i,startIds:l.startIds}),o=await y.load(),l.screen="vandaag"});return}if(t==="later-now"||t==="later-park"){const i=e.dataset.item;if(!i)return;await E(async()=>{await y.setItemLater(i,t==="later-park"),o=await y.load()});return}if(t==="save-ik"){const i={...o.profile,identity_anti:M(q("identity_anti"),S.identity_anti),identity_new:M(q("identity_new"),S.identity_new),identity_constraint:M(q("identity_constraint"),S.identity_constraint),horizon_1y:M(q("horizon_1y"),S.horizon_1y)};await E(async()=>{await y.saveProfile(i),o.profile=i});return}if(t==="export"){dt(o);return}}async function ot(){if(!o)return;const e=q("theme-custom")??"",t=A(o.profile.themes),n=kn(t,e);n.length===t.length&&n.every((s,i)=>s===t[i])||await ae(n)}async function ae(e,t=!1){if(!y||!o)return;const n=A(e),s={...o.profile,themes:n},i=t||!Ze(o);await E(async()=>{if(i){await y.saveThemes(n),o=await y.load();return}await y.saveProfile(s),o.profile=s})}function q(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function Ee(e){await E(async()=>{o.stage=await y.advanceStage(o.stage,e),o.items=o.items.map(t=>t.id===o.stage.vector_id?{...t,milestone:e}:t),o.rotated=!0,l.advanceWarn=!1})}async function O(e){await E(async()=>{const t=await y.addEvent(e);o.events.push(t)})}Vn();
