(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();function qt(e){return JSON.stringify({exported_at:new Date().toISOString(),profile:e.profile,items:e.items,stage:e.stage,events:e.events},null,2)}function Pt(e){const t=new Blob([qt(e)],{type:"application/json"}),n=URL.createObjectURL(t),i=document.createElement("a");i.href=n,i.download=`routine-${e.profile.id.slice(0,8)}.json`,i.click(),URL.revokeObjectURL(n)}const Ht="geen zin",j={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140};function O(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function Vt(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===Ht).length}function Ft(e,t){const n=O(e,j.identity_new);return!n||Vt(t)<2?null:n}function Ut(e){return!!O(e,j.identity_constraint)}function Yt(e,t){return t&&!O(e,j.horizon_1y)}function Xe(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const Qe=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],et=["zo","ma","di","wo","do","vr","za"];function w(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${i}`}function M(e,t){const n=C(e);return n.setDate(n.getDate()+t),w(n)}function C(e){const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)}function Jt(e){const t=C(e);return`${et[t.getDay()]} ${t.getDate()} ${Qe[t.getMonth()]}`}function U(e){const t=C(e);return`${t.getDate()} ${Qe[t.getMonth()]}`}function Zt(e){return et[C(e).getDay()]}function Xt(e){const t=C(e).getDay();return t===0?7:t}function pe(e){const t=C(e),n=t.getDay(),i=n===0?-6:1-n;return t.setDate(t.getDate()+i),w(t)}function ve(e,t){const n=[];let i=e;for(;i<=t;)n.push(i),i=M(i,1);return n}function R(){return crypto.randomUUID()}function Qt(){return new Date().toISOString()}const en=2,tn=6;function Y(e,t){return e.created_at.localeCompare(t.created_at)}function ie(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(Y).at(-1)}function tt(e,t){return t.filter(i=>i.kind==="set").sort(Y).at(-1)?.value??e}function ge(e,t){return ie(e,t,"body_sleep")?.value??null}function ye(e,t){return ie(e,t,"body_energy")?.value??null}const nt=40,it=250,nn=80;function an(e,t){return ie(e,t,"body_weight")?.value??null}function sn(e){return e.filter(t=>t.kind==="body_weight"&&t.value!==null).sort(Y).at(-1)?.value??null}function rn(e,t,n){return Math.round(Math.max(nt,Math.min(it,(e??t??nn)+n))*10)/10}function on(e){const t=e.trim().replace(",",".");if(!t)return null;const n=Number(t);return Number.isFinite(n)?Math.round(Math.max(nt,Math.min(it,n))*10)/10:null}function J(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip")).sort(Y).at(-1)}function at(e,t){const n=J(e,t);return n?.kind==="skip"?n.skip_reason:null}function st(e,t){return J(e,t)?.kind==="done"}function rt(e,t){return J(e,t)?.kind==="set"}function ot(e,t){const n=J(e,t);return n?.kind==="set"||n?.kind==="done"}function ln(e,t){return e!==null&&e<tn||t!==null&&t<=en}function dn(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const i=Math.max(1,Math.ceil(n/2));return Math.min(t,e+i)}function te(e,t,n,i){if(t<i)return"empty";const a=J(e,t);return a?.kind==="done"||a?.kind==="set"?"done":a?.kind==="skip"?"skip":ie(e,t,"miss")?"miss":t>=n?"empty":"miss"}function cn(e,t,n="1970-01-01"){let i=0,a=t;for(let s=0;s<400;s+=1){const r=te(e,a,t,n);if(r==="done")i+=1;else if(r==="skip"||r==="empty"&&a===t){a=M(a,-1);continue}else break;a=M(a,-1)}return i}function un(e,t,n){const i=pe(t),a=!n||n<i?i:n;let s=0,r=0;for(const d of ve(a,t)){const f=te(e,d,t,n??a);f==="skip"||f==="empty"||(r+=1,f==="done"&&(s+=1))}return{hits:s,eligible:r}}function fn(e,t,n="1970-01-01",i=3){const a=te(e,t,t,n);if(a==="done"||a==="skip")return!1;const s=M(t,-1);if(s<n)return!1;const r=M(t,-i),d=n>r?n:r;return ve(d,s).some(f=>te(e,f,t,n)==="miss")}function mn(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled&&!e.todayLogged?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function pn(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${Ge(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${Ge(e.milestone)}.`}function Ge(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function lt(e,t,n){return t.filter(a=>a.kind==="set"&&a.date<=n).sort(Y).at(-1)?.value??e}function vn(e,t,n,i){const a=tt(e.a,n),s=ge(n,i),r=ye(n,i),d=an(n,i),f=st(n,i),g=rt(n,i),c=ot(n,i),y=at(n,i),b=ln(s,r),I=a>=t.milestone,G=a>=e.b,K=fn(n,i,t.started_on),p=pe(i),m=lt(e.a,n,M(p,-1)),F=mn({current:a,weekStartCurrent:m,gearDown:b,stalled:K,milestoneHit:I,todayLogged:g||f||!!y});return{current:a,sleep:s,energy:r,weight:d,doneToday:f,plusToday:g,setLoggedToday:c,skipToday:y,gearDown:b,milestoneHit:I,atB:G,trend:F,hitrate:un(n,i,t.started_on),streak:cn(n,i,t.started_on),nextAction:pn({milestone:t.milestone,b:e.b,gearDown:b,milestoneHit:I,atB:G,stalled:K,doneToday:f,plusToday:g,skipToday:y}),suggestedMilestone:I&&!G&&!b?dn(t.milestone,e.b):null}}const ae=["geen tijd","geen energie","vergeten","geen zin","pijn"];function Ke(e){return!!(e&&ae.includes(e))}const gn=["guideline","evidence-informed","public-framework","user preference","hypothesis"],yn=["vandaag","koers","voortgang","profiel"];function bn(e){return!!(e&&yn.includes(e))}const k={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},dt="routine_loop_v6",kn=["routine_loop_v5","routine_loop_v4","routine_loop_v3"],Oe="routine_local_user_id",ze="routine_local_tenant_id",hn="routine_local_chosen";function wn(e){return e.trim().toLowerCase().normalize("NFC")}function $n(e){return!!(e&&gn.includes(e))}function _n(e){const t=wn(e);return t==="cafeïne 90 min na opstaan"?"public-framework":t==="wandelen na eten"?"evidence-informed":t==="low carb"||t==="scherm uit 22:00"||t==="korte rust"?"user preference":null}function be(e){return _n(e.label)??($n(e.template)?e.template:null)}function ct(e){return be(e)!==null}function X(){return{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:null,condition:null}}function Sn(e){return{mode:e?.mode??null,clock:e?.clock??null,anchor:e?.anchor??null,offset_min:e?.offset_min??null,window_min:e?.window_min??null,frequency:e?.frequency??null,condition:e?.condition??null}}function ut(e){return e.trim().toLowerCase().normalize("NFC")}function xn(e){return ut(e)==="korte rust"?{mode:"clock",clock:"08:00",window_min:840,frequency:"daily",condition:"body"}:null}function In(e,t){const n=xn(t);return n?{...e,...n}:e}function ft(e){return{now:e.now??new Date,today:e.today,wakeAt:e.wakeAt??null,mealAt:e.mealAt??null,sleepSet:!!e.sleepSet,energySet:!!e.energySet}}function ke(e){const t=e?.trim().toLowerCase();return t==="body"||t==="energy|sleep"?"body":t==="energy"?"energy":t==="sleep"?"sleep":null}function Ln(e,t){const n=ke(e.condition);if(!n)return!0;const i=!!t.sleepSet,a=!!t.energySet;return n==="energy"?a:n==="sleep"?i:i||a}function mt(e,t){const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(!n)return null;const i=Number(n[1]),a=Number(n[2]);if(i>23||a>59)return null;const s=C(e);return s.setHours(i,a,0,0),s}function Tn(e,t){return e==="wake"?t.wakeAt:e==="meal"?t.mealAt:null}function En(e,t){if(e.mode==="clock"&&e.clock)return mt(t.today,e.clock);if(e.mode==="relative"&&e.anchor&&e.offset_min!==null){const n=Tn(e.anchor,t);return n?new Date(n.getTime()+e.offset_min*6e4):null}return null}function pt(e,t){return!t||e.window_min===null?null:new Date(t.getTime()+e.window_min*6e4)}function vt(e,t){if(e.timing.frequency==="weekly"||e.type==="weekly"){const i=e.weekdays??[];return i.length===0?!1:i.includes(Xt(t))}return!0}function W(e){return we(e)==="constraint"}function he(e){return we(e)==="preference"}function gt(e){return!W(e)&&!he(e)}function jn(e,t){if(W(e))return"silent";if(!vt(e,t.today)||!Ln(e.timing,t))return"hidden";const n=e.timing;if(!n.mode)return"due";const i=En(n,t);if(n.mode==="relative"&&!i)return"due";if(i&&t.now<i)return"wait";const a=pt(n,i);return a&&t.now>a?"closed":"due"}function Q(e,t){const n=jn(e,t);return!(n==="hidden"||n==="closed"||n==="wait"&&e.timing.window_min!==null)}function Re(e){return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`}function An(e){if(e.window_min===null)return null;if(e.mode==="clock"&&e.clock){const t=mt("2000-01-01",e.clock);if(!t)return null;const n=pt(e,t);return n?`${Re(t)}–${Re(n)}`:null}return`${e.window_min} min`}function Mn(e){const t=ke(e.condition);return t==="body"?"na slaap of energie":t==="energy"?"na energie":t==="sleep"?"na slaap":null}function se(e){const t=e.timing;return ke(t.condition)?null:t.condition?t.condition:t.mode==="relative"&&t.anchor==="wake"&&t.offset_min!==null?`${t.offset_min} min na opstaan`:t.mode==="relative"&&t.anchor==="meal"?"na eten":t.mode==="clock"&&t.clock?t.clock:null}function we(e){if(e.role)return e.role;const t=ut(e.label);return t==="low carb"?"preference":t==="cafeïne 90 min na opstaan"||t==="scherm uit 22:00"?"constraint":null}const $e=["gedrag","regel","medicijn","supplement","sociaal"],_e={gedrag:"gedrag",regel:"leefregel",medicijn:"medicijn",supplement:"supplement",sociaal:"sociaal"},Se={gedrag:"Gedrag",regel:"Regel",medicijn:"Medicijn",supplement:"Supplement",sociaal:"Sociaal"},xe=40,Ie=40;function We(e){return!!(e&&$e.includes(e))}function Z(e){return e.a!==null&&e.b!==null&&e.milestone!==null}function Bn(e,t){return vt(e,t)}function Nn(e,t){return{...e,tenant_id:e.tenant_id??t,weekdays:e.weekdays??null,times_per_week:e.times_per_week??null,timing:In(Sn(e.timing),e.label),role:we(e),template:be(e),later:!!e.later,removed:!!e.removed}}function Le(e){return e.type==="medicijn"||e.type==="supplement"}function yt(e){return e.type==="sociaal"}function bt(e,t){return V(e,t).filter(n=>gt(n)&&!Le(n)&&!yt(n)&&!n.later)}function Cn(e,t){return V(e,t).filter(n=>he(n)&&!n.later)}function Dn(e,t){return V(e,t).filter(n=>W(n)&&!n.later)}function kt(e,t){return V(e,t).filter(n=>Le(n)&&!n.later)}function ht(e,t){return V(e,t).filter(n=>yt(n)&&!n.later)}function Gn(e,t){return V(e,t).filter(n=>n.later&&(gt(n)||W(n)))}function V(e,t){return e.filter(n=>!n.removed&&Bn(n,t)).sort((n,i)=>n.sort-i.sort)}function re(e){return e.find(Z)}function de(e){return e.kind==="body_sleep"||e.kind==="body_energy"||e.kind==="body_weight"}function oe(e,t,n){return e.filter(i=>de(i)?!1:!!(i.item_id===t.id||i.item_id===null&&n&&t.id===n))}function Kn(e,t){return t?[...e.filter(de),...oe(e,t,t.id)]:e.filter(de)}function wt(e){return e.a===null?null:e.unit==="sec"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} s`:e.unit==="reps"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} reps`:String(e.a)}function x(e){return e.trim().toLowerCase()}function q(e){const t=e.trim().replace(/\s+/g," ").slice(0,xe);return t.length>0?t:null}function Te(e){const t=e.trim().replace(/\s+/g," ").slice(0,Ie);if(!t)return X();const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(n){const i=Number(n[1]),a=Number(n[2]);if(i<=23&&a<=59)return{...X(),mode:"clock",clock:`${String(i).padStart(2,"0")}:${n[2]}`,frequency:"daily"}}return{...X(),frequency:"daily",condition:t}}function On(e){return e.reduce((t,n)=>Math.max(t,n.sort),-1)+1}const zn=["Push-ups","Squats","Plank","Dead hang","Gerichte kracht","Koud douchen","Niet snoepen","Low carb","Intermittent fasting","Geen alcohol","Cafeïne 90 min na opstaan","Wandelen na eten","Medicijn ochtend","Vitamine D","Bellen met iemand","Iemand zien","Scherm uit 22:00","Korte rust"];function le(e){const t=x(e);return zn.some(n=>x(n)===t)}function Ee(e){return le(e.label)}function D(e){return!Ee(e)}function P(e){return!!e.removed}function Rn(e){return e.filter(t=>D(t)&&!P(t)).sort((t,n)=>t.sort-n.sort)}function $t(e){return e.type==="leefregel"?"regel":e.type==="medicijn"?"medicijn":e.type==="supplement"?"supplement":e.type==="sociaal"?"sociaal":"gedrag"}function _t(e){return e.timing.mode==="clock"&&e.timing.clock?e.timing.clock:e.timing.condition??""}function Wn(e,t){const n=q(t);return n?!e.some(i=>!P(i)&&x(i.label)===x(n)):!1}function qn(e,t,n){const i=q(n);return!i||le(i)?!1:!e.some(a=>a.id!==t&&!P(a)&&x(a.label)===x(i))}function Pn(e,t){const n=q(t);if(n)return e.find(i=>P(i)&&D(i)&&x(i.label)===x(n))}function Hn(e){const t=q(e.label);return t?{id:R(),tenant_id:e.tenantId,type:_e[e.kind],label:t,unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:e.sort,timing:Te(e.timing??""),role:"action",template:"user preference",later:!!e.later,removed:!1}:null}function Vn(e,t){if(!D(e)||P(e))return null;const n=q(t.label);return!n||le(n)?null:{...e,type:_e[t.kind],label:n,timing:Te(t.timing??""),template:"user preference"}}function Fn(e,t){if(!D(e)||!P(e))return null;const n=q(t.label);return!n||le(n)?null:{...e,type:_e[t.kind],label:n,timing:Te(t.timing??""),template:"user preference",later:!1,removed:!1}}function Un(e){return P(e)?{item:e,mode:"removed"}:D(e)?{item:{...e,removed:!0},mode:"removed"}:Ee(e)?{item:{...e,later:!0},mode:"parked"}:null}function Yn(e){const t=new Set,n=[];for(const i of e){const a=x(i.label);t.has(a)||(t.add(a),n.push(i))}return n}function St(e,t,n){const i=Yn(e),a=new Set(i.map(r=>x(r.label))),s=t.filter(r=>!a.has(x(r.label))).map(r=>({...r,tenant_id:n}));return[...i,...s]}function Jn(e){const t=new Map;for(const n of e)for(const i of n)t.has(i.id)||t.set(i.id,i);return[...t.values()].sort((n,i)=>n.created_at.localeCompare(i.created_at))}function Zn(e){return e?!!(e.identity_anti||e.identity_new||e.identity_constraint||e.horizon_1y||e.display_name):!1}function Xn(e,t,n,i){if(e.length===0)return null;const a=e.reduce((c,y)=>(y.events?.length??0)>(c.events?.length??0)?y:c),s=e.find(c=>Zn(c.profile))?.profile??a.profile,r=St([a,...e.filter(c=>c!==a)].flatMap(c=>c.items??[]),t,i),d=new Map(r.map(c=>[x(c.label),c.id])),f=new Map;for(const c of e)for(const y of c.items??[]){const b=d.get(x(y.label));b&&y.id!==b&&f.set(y.id,b)}const g=Jn(e.map(c=>c.events??[])).map(c=>{if(!c.item_id)return c;const y=f.get(c.item_id);return y?{...c,item_id:y}:c});return{...a,profile:{...s,id:s.id||n,tenant_id:s.tenant_id||i},items:r,events:g}}function Qn(e,t,n,i){return oe(e,t,n).some(a=>(a.kind==="set"||a.kind==="done"||a.kind==="skip"||a.kind==="miss")&&a.date<i)}function xt(e,t){return e.created_at.localeCompare(t.created_at)}function ei(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(xt).at(-1)}function ti(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip"||n.kind==="miss")).sort(xt).at(-1)}function ni(e,t=[]){const n=C(e);return n.setHours(12,0,0,0),ft({today:e,now:n,sleepSet:ge(t,e)!==null,energySet:ye(t,e)!==null})}function ce(e,t,n=[]){const i=ni(t,n);return[...bt(e,t),...kt(e,t),...ht(e,t)].filter(a=>Q(a,i))}function ue(e,t,n,i,a){const s=oe(e,t,a),r=ti(s,n);if(r?.kind==="set"||r?.kind==="done")return{item:t,date:n,mark:"hit",reason:null};if(r?.kind==="skip")return{item:t,date:n,mark:"skip",reason:r.skip_reason};const d=r?.kind==="miss"?r:ei(s,n,"miss");return d?{item:t,date:n,mark:"miss",reason:d.skip_reason}:n>=i?{item:t,date:n,mark:"open",reason:null}:{item:t,date:n,mark:"idle",reason:null}}function It(e,t,n,i){const a=M(n,-1);return ce(e,a,t).filter(s=>Qn(t,s,i,a)).map(s=>{const r=ue(t,s,a,n,i);return r.mark==="hit"||r.mark==="skip"||r.mark==="miss"?r:{...r,mark:"miss",reason:null}}).filter(s=>s.mark==="miss"&&!s.reason)}function ii(e,t,n){return e.some(i=>i.mark==="hit")?"hit":e.some(i=>i.mark==="miss")?"miss":e.some(i=>i.mark==="skip")?"skip":t===n?"open":"idle"}function Lt(e,t,n,i){const a=pe(n),s=M(a,6),r=It(e,t,n,i),d=new Set(r.map(p=>`${p.item.id}:${p.date}`)),f=ve(a,s).map(p=>{const m=ce(e,p,t).map(_=>{const F=ue(t,_,p,n,i);return d.has(`${_.id}:${p}`)?{...F,mark:"miss",reason:F.reason}:F});return{date:p,label:Zt(p),mark:ii(m,p,n),hits:m.filter(_=>_.mark==="hit").length,misses:m.filter(_=>_.mark==="miss").length,skips:m.filter(_=>_.mark==="skip").length}}),g=f.filter(p=>p.date<n),c=g.reduce((p,m)=>p+m.hits,0),y=g.reduce((p,m)=>p+m.misses,0),b=g.reduce((p,m)=>p+m.skips,0),I=g.flatMap(p=>ce(e,p.date,t).map(m=>{const _=ue(t,m,p.date,n,i);return d.has(`${m.id}:${p.date}`)?{..._,mark:"miss",reason:_.reason}:_}).filter(m=>m.mark==="miss")),G=g.filter(p=>p.mark!=="idle").length,K=c>0&&y===0&&G>=2?"Week staat.":null;return{start:a,end:s,range:`${U(a)} – ${U(s)}`,days:f,hits:c,misses:y,skips:b,missRows:I,note:K}}function ee(e){return re(e)?.id}const ne=3,je=[{id:"kracht",label:"Kracht"},{id:"eten",label:"Eten & drinken"},{id:"slaap",label:"Slaap"},{id:"stofjes",label:"Stofjes"},{id:"bewegen",label:"Bewegen"}],Ae=["18–29","30–39","40–49","50–59","60+"],ai={kracht:["Push-ups","Squats","Plank","Dead hang"],eten:["Niet snoepen","Low carb","Intermittent fasting","Geen alcohol"],slaap:["Koud douchen"],stofjes:["Medicijn ochtend","Vitamine D"],bewegen:["Wandelen na eten"]};function Me(e){return W(e)||e.type==="weekly"?!1:e.type==="daily"||e.type==="leefregel"||e.type==="gedrag"||e.type==="sociaal"||Le(e)}function si(e){return e.filter(t=>t.removed?!1:Me(t)?!0:W(t)&&t.later).sort((t,n)=>t.sort-n.sort)}function Tt(e){return!(e.onboarded!==!1||(e.events??[]).length>0)}function ri(e){return Tt(e)?e.profile.goals?.length?e.profile.age_band?e.theme_step!==!0?"themes":"start":"age":"goals":null}function oi(e,t){const n=e.filter(Me).sort((s,r)=>s.sort-r.sort);if(t.length===0)return n;const i=new Set(t.flatMap(s=>ai[s]??[])),a=n.filter(s=>i.has(s.label));return a.length>0?a:n}function li(e,t){const n=new Set(t.slice(0,ne));return e.map(i=>Me(i)?{...i,later:!n.has(i.id)}:{...i,later:!1})}function di(e,t){return e.includes(t)?e.filter(n=>n!==t):[...e,t]}function ci(e,t){return e.includes(t)?e.filter(n=>n!==t):e.length>=ne?e:[...e,t]}function ui(e){return je.some(t=>t.id===e)}function fi(e){return Ae.includes(e)}function mi(e,t,n,i,a){const s=Lt(e,t,n,a??ee(e)),r=s.days.map(d=>({date:d.date,label:d.label,current:lt(i,t,d.date<=n?d.date:n),mark:d.mark}));return{week:s,line:r,hits:s.hits,skips:s.skips,misses:s.misses}}function pi(e,t,n,i=18,a=16){if(e.length===0)return[];const s=Math.min(...e),d=Math.max(...e)-s,f=t-i*2,g=n-a*2;return e.map((c,y)=>{const b=e.length===1?t/2:i+y/(e.length-1)*f,I=d===0?n/2:a+(1-(c-s)/d)*g;return{x:b,y:I}})}function vi(e){return e.map(t=>`${t.x.toFixed(1)},${t.y.toFixed(1)}`).join(" ")}const qe=["Military calisthenics","Kickbox","Spinnen"],Et=40;function Be(e){const t=e.trim().replace(/\s+/g," ").slice(0,Et);return t.length>0?t:null}function N(e){if(!Array.isArray(e))return[];const t=new Set,n=[];for(const i of e){if(typeof i!="string")continue;const a=Be(i);if(!a)continue;const s=a.toLowerCase();t.has(s)||(t.add(s),n.push(a))}return n}function gi(e,t){const n=Be(t);if(!n)return e;const i=n.toLowerCase();return e.some(a=>a.toLowerCase()===i)?e.filter(a=>a.toLowerCase()!==i):[...e,n]}function yi(e,t){const n=Be(t);if(!n)return e;const i=n.toLowerCase();return e.some(a=>a.toLowerCase()===i)?e:[...e,n]}function bi(e){const n=N(e).filter(i=>!qe.some(a=>a.toLowerCase()===i.toLowerCase()));return[...qe,...n]}function Pe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function jt(e){const t=new Set(N(e).map(i=>i.toLowerCase()));return`<div class="chips">${bi(e).map(i=>`<button class="chip pick ${t.has(i.toLowerCase())?"on":""}" data-act="theme-toggle" data-theme="${Pe(i)}">${Pe(i)}</button>`).join("")}</div>
        <div class="theme-add">
          <input data-id="theme-custom" type="text" maxlength="${Et}" placeholder="Eigen thema" autocomplete="off" enterkeyhint="done" />
          <button class="btn ghost" data-act="theme-add">Voeg toe</button>
        </div>`}function ki(e){return e.skip?null:e.plus?{text:"Set gedaan.",tone:"fog"}:e.done?e.type==="medicijn"?{text:"Genomen.",tone:"sage"}:e.track?{text:"Set staat.",tone:"sage"}:{text:"Staat.",tone:"sage"}:null}function At(e,t){return{id:e,tenant_id:t,display_name:null,...Xe(),age_band:null,goals:[],themes:[]}}function Mt(e,t,n=w()){return{id:R(),tenant_id:t,vector_id:e,milestone:k.milestone,started_on:n,deadline:M(n,k.windowDays),status:"active",stage_type:k.stageType}}function Ne(e){const t=n=>({id:R(),tenant_id:e,timing:X(),role:null,template:null,later:!1,...n});return[t({type:"daily",label:"Push-ups",unit:"reps",a:k.a,b:k.b,milestone:k.milestone,weekdays:null,times_per_week:null,sort:0}),t({type:"daily",label:"Squats",unit:"reps",a:30,b:null,milestone:null,weekdays:null,times_per_week:null,sort:1}),t({type:"daily",label:"Plank",unit:"sec",a:60,b:null,milestone:null,weekdays:null,times_per_week:null,sort:2}),t({type:"daily",label:"Dead hang",unit:"sec",a:45,b:null,milestone:null,weekdays:null,times_per_week:null,sort:3}),t({type:"weekly",label:"Gerichte kracht",unit:null,a:null,b:null,milestone:null,weekdays:[],times_per_week:2,sort:4}),t({type:"leefregel",label:"Koud douchen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:5}),t({type:"leefregel",label:"Niet snoepen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:6}),t({type:"leefregel",label:"Low carb",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:7,role:"preference",template:"user preference"}),t({type:"leefregel",label:"Intermittent fasting",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:8}),t({type:"leefregel",label:"Geen alcohol",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:9}),t({type:"gedrag",label:"Cafeïne 90 min na opstaan",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:10,role:"constraint",template:"public-framework",timing:{mode:"relative",clock:null,anchor:"wake",offset_min:90,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Wandelen na eten",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:11,role:"action",template:"evidence-informed",timing:{mode:"relative",clock:null,anchor:"meal",offset_min:0,window_min:null,frequency:"daily",condition:"na eten"}}),t({type:"medicijn",label:"Medicijn ochtend",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:12,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"ochtend"}}),t({type:"supplement",label:"Vitamine D",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:13,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Bellen met iemand",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:14,role:"action",template:null,timing:{mode:"clock",clock:"18:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Iemand zien",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:1,sort:15,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"deze week"}}),t({type:"gedrag",label:"Scherm uit 22:00",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:16,role:"constraint",template:"user preference",timing:{mode:"clock",clock:"22:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Korte rust",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:17,role:"action",template:"user preference",timing:{mode:"clock",clock:"08:00",anchor:null,offset_min:null,window_min:840,frequency:"daily",condition:"body"}})]}function hi(e,t){return{id:e.id,tenant_id:e.tenant_id,user_id:t,domain:k.domain,a:e.a??k.a,b:e.b??k.b,unit:e.unit==="sec"?"sec":"reps",pace_constraint:null}}function wi(e,t=w(),n=R()){const i=At(e,n),a=Ne(n),s=re(a)??a[0],r=hi(s,e),d=Mt(r.id,n,t);return s.milestone!==null&&(d.milestone=s.milestone),{profile:i,items:a,vector:r,stage:d,events:[],rotated:!1,onboarded:!1,theme_step:!1}}function $i(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,items:e.items.map(n=>Z(n)?{...n,a:k.a,b:k.b,milestone:k.milestone,unit:k.unit}:n),vector:{...e.vector,a:k.a,b:k.b,unit:k.unit},stage:{...e.stage,milestone:k.milestone},events:e.events}:e}function _i(){const e=localStorage.getItem(Oe);if(e)return e;const t=R();return localStorage.setItem(Oe,t),t}function Si(){const e=localStorage.getItem(ze);if(e)return e;const t=R();return localStorage.setItem(ze,t),t}function S(e){localStorage.setItem(dt,JSON.stringify(e))}function xi(e){if(!e)return null;try{const t=JSON.parse(e);return!t||typeof t!="object"?null:t}catch{return null}}function Ii(){return[dt,...kn].map(e=>xi(localStorage.getItem(e))).filter(e=>e!==null)}function Li(e,t,n){const i=St(e.items??[],Ne(n),n).map(a=>Nn(a,n));return{...e,profile:{...At(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...Xe(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null,age_band:e.profile?.age_band??null,goals:Array.isArray(e.profile?.goals)?e.profile.goals:[],themes:N(e.profile?.themes)},items:i,vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(a=>({...a,tenant_id:a.tenant_id??n,item_id:a.item_id??null})),rotated:!!e.rotated,onboarded:e.onboarded??!0,theme_step:e.theme_step??!1}}function L(e,t){const n=Ii();if(n.length===0){const s=wi(e,w(),t);return S(s),s}const i=Xn(n,Ne(t),e,t)??n[0],a=$i(Li(i,e,t));return S(a),a}function Ti(){localStorage.setItem(hn,"1");const e=_i(),t=Si();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return L(e,t)},async addEvent(n){const i=L(e,t),a={id:n.id??R(),tenant_id:t,user_id:e,item_id:n.item_id??null,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:Qt()};return i.events.push(a),S(i),a},async saveProfile(n){const i=L(e,t);i.profile=n,S(i)},async saveOnboarding(n){const i=L(e,t);i.profile={...i.profile,goals:n.goals,age_band:n.age_band,themes:N(i.profile.themes)},i.items=li(i.items,n.startIds),i.onboarded=!0,i.theme_step=!0,S(i)},async saveThemes(n){const i=L(e,t);i.profile={...i.profile,themes:N(n)},i.theme_step=!0,S(i)},async setItemLater(n,i){const a=L(e,t);a.items=a.items.map(s=>s.id===n?{...s,later:i}:s),S(a)},async addItem(n){const i=L(e,t),a=Pn(i.items,n.label);if(a){const r=Fn(a,{label:n.label,kind:n.kind,timing:n.timing});if(!r)throw new Error("naam ontbreekt");return i.items=i.items.map(d=>d.id===r.id?r:d),S(i),r}const s=Hn({tenantId:t,label:n.label,kind:n.kind,timing:n.timing,sort:On(i.items)});if(!s)throw new Error("naam ontbreekt");if(!Wn(i.items,s.label))throw new Error("item bestaat al");return i.items=[...i.items,s],S(i),s},async updateItem(n){const i=L(e,t),a=i.items.find(r=>r.id===n.id);if(!a)throw new Error("item ontbreekt");if(!q(n.label))throw new Error("naam ontbreekt");if(!qn(i.items,a.id,n.label))throw new Error("item bestaat al");const s=Vn(a,n);if(!s)throw new Error("alleen eigen item");return i.items=i.items.map(r=>r.id===s.id?s:r),S(i),s},async removeItem(n){const i=L(e,t),a=i.items.find(r=>r.id===n);if(!a)throw new Error("item ontbreekt");const s=Un(a);if(!s)throw new Error("item blijft");return i.items=i.items.map(r=>r.id===s.item.id?s.item:r),S(i),s.item},async saveVectorConstraint(n,i){const a=L(e,t);a.vector.id===n&&(a.vector.pace_constraint=i,S(a))},async advanceStage(n,i){const a=L(e,t),s=Mt(n.vector_id,t);return s.milestone=i,a.stage=s,a.items=a.items.map(r=>r.id===n.vector_id?{...r,milestone:i}:r),a.rotated=!0,S(a),s},async signOut(){}}}const He="#F0ECE4",Ei="#3D6B5A";function Bt(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${He}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${He}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${Ei}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function h(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function ji(e){return e==="stokt"||e==="herstel"?"ember":e==="stijgt"?"sage":"fog"}function Ve(e){const t=ji(e);return e==="stokt"||e==="herstel"||e==="zakt"?h("status-kink",`ico-${t}`):e==="stijgt"?h("status-up",`ico-${t}`):h("status-flat",`ico-${t}`)}function Ai(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${h(n?"dot-now":"dot")}</button>`}).join("")}const Mi=`
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
</svg>`;function Bi(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",Mi)}const H=()=>document.querySelector("#app"),l={screen:"vandaag",skipItemId:null,missKey:null,detailItemId:null,advanceWarn:!1,busy:!1,error:null,startIds:[],addKind:"gedrag",addLabel:"",addTiming:"",editKind:"gedrag",editLabel:"",editTiming:"",removeAsk:!1};let v=null,o=null;function Ce(){if(!o)throw new Error("geen snapshot");const e=re(o.items);return vn(o.vector,o.stage,Kn(o.events,e),w())}function z(e,t=w()){if(!o)throw new Error("geen snapshot");const n=re(o.items),i=oe(o.events,e,n?.id),a=e.a===null?null:tt(e.a,i);return{done:st(i,t),plus:rt(i,t),skip:at(i,t),logged:ot(i,t),current:a}}function Nt(e,t){return`${e}:${t}`}function Ni(e=w()){const t=o?.events??[];return ft({today:e,now:new Date,sleepSet:ge(t,e)!==null,energySet:ye(t,e)!==null})}function u(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function $(){if(!o||!v)return;const e=ri(o);if(e){H().innerHTML=Pi(e);return}const t=Ce(),{vector:n,stage:i}=o,a=v.mode==="local"?"Lokaal":"Supabase",s=`
    <div class="hdr">
      <div>
        ${Bt()}
        <div class="date-s">${Jt(w())}</div>
      </div>
      <div class="mode-pill">${a}</div>
    </div>`,r=`
    <nav class="nav nav-4">
      <button data-nav="vandaag" class="${l.screen==="vandaag"?"active":""}">${h("day")}Vandaag</button>
      <button data-nav="koers" class="${l.screen==="koers"?"active":""}">${h("mark")}Koers</button>
      <button data-nav="voortgang" class="${l.screen==="voortgang"?"active":""}">${h("line")}Voortgang</button>
      <button data-nav="profiel" class="${l.screen==="profiel"?"active":""}">${h("me")}Profiel</button>
    </nav>`;if(l.detailItemId){const d=o.items.find(f=>f.id===l.detailItemId);if(d){H().innerHTML=`
      ${s}
      ${Vi(d)}
      ${l.error?`<p class="error" style="padding:0 18px">${u(l.error)}</p>`:""}
      ${r}`;return}l.detailItemId=null}if(l.screen==="vandaag"){const d=Ft(o.profile.identity_new,o.events),f=w(),g=Ni(f),c=bt(o.items,f).filter(m=>Q(m,g)),y=Dn(o.items,f),b=kt(o.items,f).filter(m=>Q(m,g)),I=ht(o.items,f).filter(m=>Q(m,g)),G=Gn(o.items,f),K=Cn(o.items,f),p=It(o.items,o.events,f,ee(o.items));H().innerHTML=`
      ${s}
      ${v.mode==="local"?'<div class="banner">Lokaal — geen Supabase. +1 / Done / Skip blijven op dit apparaat.</div>':""}
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
          <div class="dots">${Ai(t.energy)}</div>
        </div>
      </div>
      ${K.length?`<div class="sec-hd">Dag</div>
      <div class="card quiet">
        <div class="day-tags">${K.map(m=>Hi(m)).join("")}</div>
      </div>`:""}
      ${y.length?`<div class="sec-hd">Regel</div>${y.map(m=>Yi(m)).join("")}`:""}
      ${b.length?`<div class="sec-hd">Stofjes</div>${b.map(m=>Fe(m)).join("")}`:""}
      ${I.length?`<div class="sec-hd">Sociaal</div>${I.map(m=>Fe(m)).join("")}`:""}
      ${p.length?`<div class="sec-hd">Niet gedaan</div>
      <div class="card">
        <div class="note" style="margin-top:0">Geen +1, Done of Skip. Korte reden.</div>
        ${p.map(m=>Dt(m)).join("")}
      </div>`:""}
      <div class="sec-hd">Vandaag</div>
      ${c.map(m=>Ji(m,t,d)).join("")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Niet in je start. Blijft bewaard.</div>
        ${G.map(m=>Ki(m)).join("")}
        <button class="btn ghost later-add" data-nav="profiel">Eigen item</button>
      </div>
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${Ve(t.trend.word)}
          <div class="word">${t.trend.word}</div>
        </div>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${u(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="koers"){H().innerHTML=`
      ${s}
      ${Ye(o.profile.themes,"Tik een suggestie of typ zelf. Geen vaste lijst. Later aan te passen.")}
      ${Ue(Lt(o.items,o.events,w(),ee(o.items)))}
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
            <div class="val" style="font-size:1.15rem">${U(i.started_on)} → ${i.deadline?U(i.deadline):"—"}</div>
          </div>
          <div>
            <div class="lbl">Trend</div>
            <div class="val status">${Ve(t.trend.word)} ${t.trend.word}</div>
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
      ${Yt(o.profile.horizon_1y,o.rotated)?'<div class="banner">Zet een 1-jaars B. Etappes roteren.</div>':""}
      <div class="sec-hd">${h("ik")} Ik</div>
      <div class="card">
        <div class="field">
          <div class="lbl">Leven dat ik weiger</div>
          <textarea data-id="identity_anti" maxlength="${j.identity_anti}">${u(o.profile.identity_anti??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wie ik word</div>
          <textarea data-id="identity_new" maxlength="${j.identity_new}">${u(o.profile.identity_new??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wat B niet mag schenden</div>
          <textarea data-id="identity_constraint" maxlength="${j.identity_constraint}">${u(o.profile.identity_constraint??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">1-jaars B</div>
          <textarea data-id="horizon_1y" maxlength="${j.horizon_1y}">${u(o.profile.horizon_1y??"")}</textarea>
        </div>
        <button class="btn primary" data-act="save-ik">Bewaar</button>
      </div>
      <div class="card stack">
        <button class="btn ghost ico-btn" data-act="export">${h("export")}<span>Exporteer JSON</span></button>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${u(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="voortgang"){const d=mi(o.items,o.events,w(),o.vector.a,ee(o.items));H().innerHTML=`
      ${s}
      ${Ue(d.week)}
      <div class="sec-hd">Lijn</div>
      <div class="card">
        <div class="note" style="margin-top:0">Huidige deze week. Geen score.</div>
        ${qi(d.line.map(f=>f.current),w(),d.line)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Nu</div><div class="val">${T(t.current)}</div></div>
          <div><div class="lbl">Gedaan</div><div class="val">${d.hits}</div></div>
        </div>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${u(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="profiel"){const d=o.profile.goals??[],f=o.profile.age_band,g=si(o.items);H().innerHTML=`
      ${s}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="note" style="margin-top:0">Later aan te passen. Geen wipe.</div>
        <div class="chips">${je.map(c=>`<button class="chip pick ${d.includes(c.id)?"on":""}" data-act="onboard-goal" data-goal="${c.id}">${c.label}</button>`).join("")}</div>
      </div>
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="note" style="margin-top:0">Alleen een band. Geen geboortedatum.</div>
        <div class="chips">${Ae.map(c=>`<button class="chip pick ${f===c?"on":""}" data-act="onboard-age" data-age="${c}">${c}</button>`).join("")}</div>
      </div>
      ${Ye(o.profile.themes,"Tik een suggestie of typ zelf. Later aan te passen.")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Parkeren of terughalen. Events blijven.</div>
        ${g.map(c=>Oi(c)).join("")}
      </div>
      ${Ri(o.items)}
      ${Wi()}
      ${l.error?`<p class="error" style="padding:0 18px">${u(l.error)}</p>`:""}
      ${r}`;return}}function Ct(e){const t=z(e),n=ki({plus:t.plus,done:t.done,skip:t.skip,type:e.type,track:Z(e)});return n?`<div class="confirm ${n.tone}" role="status">${u(n.text)}</div>`:""}function Fe(e){const t=z(e),n=t.logged||!!t.skip,i=e.type==="medicijn"?"Genomen":"Done",a=se(e);return`
      <div class="card stof">
        ${De(e)}
        ${a?`<div class="note">${u(a)}</div>`:""}
        <div class="actions actions-two">
          <button class="btn ico-btn ${t.done?"track":""}" data-act="done" data-item="${e.id}" ${n?"disabled":""}>${h("done")}<span>${i}</span></button>
          <button class="btn ico-btn skip ${t.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${t.logged?"disabled":""}>${h("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||t.skip?`<div class="chips">${ae.map(s=>`<button class="chip ${t.skip===s?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${s}">${s}</button>`).join("")}</div>`:""}
        ${Ct(e)}
      </div>`}function Ci(e,t,n,i){return`<div class="chips">${ae.map(a=>`<button class="chip ${n===a?"on":""}" data-act="${i}" data-item="${e}" data-date="${t}" data-reason="${a}">${a}</button>`).join("")}</div>`}function Dt(e){const t=l.missKey===Nt(e.item.id,e.date)||!!e.reason;return`
      <div class="miss-row">
        <button class="miss-item" data-act="miss-open" data-item="${e.item.id}" data-date="${e.date}">
          <span class="ex-nm">${u(e.item.label)}</span>
          <span class="note">${e.reason?u(e.reason):U(e.date)}</span>
        </button>
        ${t?Ci(e.item.id,e.date,e.reason,"miss"):""}
      </div>`}function Di(e){const t=[];return e.hits&&t.push(`${e.hits} gedaan`),e.skips&&t.push(`${e.skips} overgeslagen`),e.misses&&t.push(`${e.misses} niet gedaan`),t.length===0?"Nog geen dagen deze week.":t.join(" · ")}function Gi(e){return e==="skip"?"–":e==="miss"?"×":"·"}function Ue(e){return`
      <div class="sec-hd">Week</div>
      <div class="card">
        <div class="note" style="margin-top:0">${u(e.range)}</div>
        <div class="week-strip" aria-label="Weekoverzicht">
          ${e.days.map(t=>`<div class="week-day ${t.mark}${t.date===w()?" today":""}">
            <span class="week-lbl">${t.label}</span>
            <span class="week-mark">${Gi(t.mark)}</span>
          </div>`).join("")}
        </div>
        <div class="note">${u(Di(e))}</div>
        ${e.note?`<div class="week-note">${u(e.note)}</div>`:""}
        ${e.missRows.length?e.missRows.map(t=>Dt(t)).join(""):""}
      </div>`}function Gt(e){return ct(e)||D(e)?`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>`:`<div class="ex-nm">${u(e.label)}</div>`}function Ki(e){return`
      <div class="later-row">
        ${Gt(e)}
        <button class="btn ghost later-now" data-act="later-now" data-item="${e.id}">Nu</button>
      </div>`}function Oi(e){const t=e.later;return`
      <div class="later-row">
        <div>
          ${Gt(e)}
          <div class="note" style="margin-top:4px">${t?"Later":"Nu"}</div>
        </div>
        <button class="btn ghost later-now" data-act="${t?"later-now":"later-park"}" data-item="${e.id}">${t?"Nu":"Later"}</button>
      </div>`}function zi(e){const t=Se[$t(e)],n=_t(e);return`
      <div class="later-row">
        <div>
          <button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>
          <div class="note" style="margin-top:4px">${u(t)}${n?` · ${u(n)}`:""}</div>
        </div>
        <button class="btn ghost later-now" data-act="detail-open" data-item="${e.id}">Wijzig</button>
      </div>`}function Ri(e){const t=Rn(e);return t.length===0?"":`
      <div class="sec-hd">Eigen items</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Label, type of tijd. Weg haalt het uit Vandaag. Log blijft.</div>
        ${t.map(n=>zi(n)).join("")}
      </div>`}function Wi(){return`
      <div class="sec-hd">Eigen item</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Label, type, optioneel tijdstip. Geen dosis. Bestaande items blijven.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="item-label" type="text" maxlength="${xe}" placeholder="Bijv. Avondwandeling" autocomplete="off" enterkeyhint="done" value="${u(l.addLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${$e.map(e=>`<button class="chip pick ${l.addKind===e?"on":""}" data-act="item-kind" data-kind="${e}">${Se[e]}</button>`).join("")}</div>
        <div class="field" style="margin-top:12px">
          <div class="lbl">Tijd</div>
          <input data-id="item-timing" type="text" maxlength="${Ie}" placeholder="22:00 of ochtend" autocomplete="off" enterkeyhint="done" value="${u(l.addTiming)}" />
        </div>
        <div class="stack">
          <button class="btn primary" data-act="item-add">Voeg toe</button>
        </div>
      </div>`}function qi(e,t,n){const s=pi(e,294,72);if(s.length===0)return'<div class="note">Nog geen lijn.</div>';const r=s.map((d,f)=>{const g=n[f]?.date===t;return`<circle class="${n[f]?.mark==="miss"?"prog-dot miss":g?"prog-dot now":"prog-dot"}" cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${g?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${vi(s)}" />
          ${r}
        </svg>`}function Ye(e,t){return`
      <section class="theme-sec" data-sec="themes">
        <div class="sec-hd">Thema's</div>
        <div class="card">
          <div class="ex-nm">Trainingsrichting</div>
          <div class="note">${u(t)}</div>
          ${jt(e)}
        </div>
      </section>`}function Pi(e){if(!o)return"";const t=o.profile.goals??[],n=o.profile.age_band,i=oi(o.items,t),a=l.startIds,s=`
    <div class="hdr">
      <div>
        ${Bt()}
        <div class="date-s">Start</div>
      </div>
    </div>`;if(e==="goals")return`
      ${s}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="ex-nm">Wat is je richting?</div>
        <div class="note">Eerst doelen. Types (gedrag, regel, medicijn, supplement, sociaal) komen daarna.</div>
        <div class="chips">${je.map(r=>`<button class="chip pick ${t.includes(r.id)?"on":""}" data-act="onboard-goal" data-goal="${r.id}">${r.label}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${t.length===0?"disabled":""}>Verder</button>
        </div>
      </div>`;if(e==="age")return`
      ${s}
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="ex-nm">Kies een band</div>
        <div class="note">Geen geboortedatum. Alleen een band.</div>
        <div class="chips">${Ae.map(r=>`<button class="chip pick ${n===r?"on":""}" data-act="onboard-age" data-age="${r}">${r}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${n?"":"disabled"}>Verder</button>
        </div>
      </div>`;if(e==="themes"){const r=o.profile.themes??[];return`
      ${s}
      <div class="sec-hd">Thema's</div>
      <div class="card">
        <div class="ex-nm">Trainingsrichting</div>
        <div class="note">Tik een suggestie of typ zelf. Mag leeg. Later aan te passen.</div>
        ${jt(r)}
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-themes-done">Verder</button>
        </div>
      </div>`}return`
    ${s}
    <div class="sec-hd">Start</div>
    <div class="card">
      <div class="ex-nm">Max ${ne} nu</div>
      <div class="note">De rest gaat naar Later. Later blijft zichtbaar.</div>
      <div class="chips">${i.map(r=>`<button class="chip pick ${a.includes(r.id)?"on":""}" data-act="onboard-start" data-item="${r.id}">${u(r.label)}</button>`).join("")}</div>
      <div class="note">${a.length} / ${ne} gekozen</div>
      <div class="stack" style="margin-top:16px">
        <button class="btn primary" data-act="onboard-done" ${a.length===0?"disabled":""}>Naar Vandaag</button>
      </div>
    </div>`}function De(e){return!ct(e)&&!D(e)?`<div class="ex-nm">${u(e.label)}</div>`:`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>`}function Hi(e){return`<button class="chip pick" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>`}function Vi(e){const t=be(e),n=se(e),i=An(e.timing),a=Mn(e.timing),s=wt(e),r=he(e),d=W(e),f=D(e);return`
      <button class="btn ghost detail-back" data-act="detail-close">Terug</button>
      <div class="sec-hd">Detail</div>
      <div class="card">
        <div class="ex-nm">${u(e.label)}</div>
        ${i?`<div class="note">${u(i)}</div>`:""}
        ${a?`<div class="note">${u(a)}</div>`:""}
        ${n&&!a?`<div class="note">${u(n)}</div>`:""}
        ${s?`<div class="work">${u(s)}</div>`:""}
        ${r?'<div class="note">Voorkeur. Geen regel.</div>':""}
        ${d&&!n&&!i&&!a?'<div class="note">Regel. Geen afvinken.</div>':""}
      </div>
      ${t?`<div class="sec-hd">Bron</div>
      <div class="card quiet">
        <div class="src-tag">${u(t)}</div>
      </div>`:""}
      ${f?Fi():Ui(e)}`}function Fi(){return`
      <div class="sec-hd">Wijzig</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Zelfde item. Geen dosis. Log blijft.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="edit-label" type="text" maxlength="${xe}" placeholder="Naam" autocomplete="off" enterkeyhint="done" value="${u(l.editLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${$e.map(e=>`<button class="chip pick ${l.editKind===e?"on":""}" data-act="edit-kind" data-kind="${e}">${Se[e]}</button>`).join("")}</div>
        <div class="field" style="margin-top:12px">
          <div class="lbl">Tijd</div>
          <input data-id="edit-timing" type="text" maxlength="${Ie}" placeholder="22:00 of ochtend" autocomplete="off" enterkeyhint="done" value="${u(l.editTiming)}" />
        </div>
        <div class="stack">
          <button class="btn primary" data-act="item-save">Bewaar</button>
          ${l.removeAsk?`<div class="note">Weg uit Vandaag. Log blijft.</div>
          <button class="btn primary" data-act="item-remove">Bevestig</button>
          <button class="btn ghost" data-act="item-remove-cancel">Niet nu</button>`:'<button class="btn ghost" data-act="item-remove-ask">Weg</button>'}
        </div>
      </div>`}function Ui(e){return Ee(e)?e.later?`
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
      </div>`:""}function Yi(e){const t=se(e);return`
      <div class="card quiet">
        ${De(e)}
        ${t?`<div class="note">${u(t)}</div>`:'<div class="note">Regel. Geen afvinken.</div>'}
      </div>`}function Ji(e,t,n){const i=z(e),a=Z(e),s=i.logged||!!i.skip,r=a&&i.current!==null&&e.b!==null&&i.current>=e.b,d=s||r,f=a,g=wt(e),c=se(e),y=f&&t.suggestedMilestone&&e.id===o.vector.id;return`
      <div class="card">
        ${De(e)}
        ${c&&!g&&!a?`<div class="note">${u(c)}</div>`:""}
        ${a?`<div class="track">
          <span class="now">${T(i.current??e.a??0)}</span>
          <span>→</span>
          <span class="mid">${T(e.milestone??0)}</span>
          <span>→</span>
          <span class="end">${T(e.b??0)}</span>
        </div>`:g?`<div class="work">${u(g)}</div>`:""}
        <div class="actions ${a?"":"actions-two"}">
          ${a?`<button class="btn ico-btn ${i.plus?"on":""}" data-act="plus" data-item="${e.id}" ${d?"disabled":""}>${h("plus")}<span>+1</span></button>`:""}
          <button class="btn ico-btn ${i.done?"track":""}" data-act="done" data-item="${e.id}" ${s?"disabled":""}>${h("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${i.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${i.logged?"disabled":""}>${h("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||i.skip?`<div class="chips">${ae.map(b=>`<button class="chip ${i.skip===b?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${b}">${b}</button>`).join("")}</div>`:""}
        ${Ct(e)}
        ${y?`<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${T(t.suggestedMilestone)}.</div>
               ${l.advanceWarn&&o.profile.identity_constraint?`<div class="banner">Check: ${u(o.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${T(t.suggestedMilestone)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`:`<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${t.suggestedMilestone}">Volgende etappe ${T(t.suggestedMilestone)}</button>
                      </div>`}`:""}
        ${f&&n?`<div class="note">${u(n)}</div>`:""}
      </div>`}function T(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function E(e){if(!l.busy){l.busy=!0,l.error=null;try{await e()}catch(t){l.error=t instanceof Error?t.message:"Er ging iets mis"}finally{l.busy=!1,$()}}}async function Zi(e){v=e,o=await v.load(),l.screen="vandaag",$()}async function Xi(){Bi(),Qi(),await Zi(Ti())}function Qi(){document.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const t=e.target;if(t instanceof HTMLInputElement){if(t.dataset.id==="theme-custom"){e.preventDefault(),Wt();return}if(t.dataset.id==="item-label"||t.dataset.id==="item-timing"){e.preventDefault(),Rt();return}if(t.dataset.id==="edit-label"||t.dataset.id==="edit-timing"){e.preventDefault(),zt();return}t.dataset.id==="weight"&&(e.preventDefault(),Ze(t.value))}}),document.addEventListener("change",e=>{const t=e.target;t instanceof HTMLInputElement&&t.dataset.id==="weight"&&Ze(t.value)}),document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(bn(n)){l.screen=n,l.skipItemId=null,l.missKey=null,l.detailItemId=null,l.advanceWarn=!1,$();return}ea(t)})}async function ea(e){const t=e.dataset.act;if(!t||!v||!o)return;const n=Ce(),i=w();if(t==="sleep-inc"||t==="sleep-dec"){const a=n.sleep??7,s=Math.max(0,Math.min(14,a+(t==="sleep-inc"?.5:-.5)));await B({date:i,kind:"body_sleep",value:s,skip_reason:null,item_id:null});return}if(t==="energy"){const a=Number(e.dataset.n),s=n.energy===a?null:a;if(s===null)return;await B({date:i,kind:"body_energy",value:s,skip_reason:null,item_id:null});return}if(t==="weight-inc"||t==="weight-dec"){const a=rn(n.weight,sn(o.events),t==="weight-inc"?.1:-.1);if(n.weight===a)return;await B({date:i,kind:"body_weight",value:a,skip_reason:null,item_id:null});return}if(t==="plus"){const a=o.items.find(r=>r.id===e.dataset.item);if(!a||!Z(a))return;const s=z(a);if(s.logged||s.skip||a.b!==null&&s.current!==null&&s.current>=a.b)return;await B({date:i,kind:"set",value:(s.current??a.a??0)+1,skip_reason:null,item_id:a.id});return}if(t==="done"){const a=o.items.find(r=>r.id===e.dataset.item);if(!a)return;const s=z(a);if(s.logged||s.skip)return;await B({date:i,kind:"done",value:s.current??a.a,skip_reason:null,item_id:a.id});return}if(t==="detail-open"){const a=e.dataset.item??null,s=a?o.items.find(r=>r.id===a):void 0;if(!s)return;Ot(s),l.detailItemId=s.id,$();return}if(t==="detail-close"){l.detailItemId=null,$();return}if(t==="skip-open"){const a=e.dataset.item??null;l.skipItemId=l.skipItemId===a?null:a,$();return}if(t==="skip"){const a=o.items.find(d=>d.id===e.dataset.item);if(!a||z(a).logged)return;const r=e.dataset.reason;if(!Ke(r))return;await B({date:i,kind:"skip",value:null,skip_reason:r,item_id:a.id}),l.skipItemId=null;return}if(t==="miss-open"){const a=e.dataset.item,s=e.dataset.date;if(!a||!s)return;const r=Nt(a,s);l.missKey=l.missKey===r?null:r,$();return}if(t==="miss"){const a=o.items.find(f=>f.id===e.dataset.item),s=e.dataset.date,r=e.dataset.reason;if(!a||!s||s>=i||!Ke(r))return;const d=z(a,s);if(d.logged||d.skip)return;await B({date:s,kind:"miss",value:null,skip_reason:r,item_id:a.id}),l.missKey=null;return}if(t==="advance"){if(!n.suggestedMilestone)return;if(Ut(o.profile.identity_constraint)&&!l.advanceWarn){l.advanceWarn=!0,$();return}await Je(n.suggestedMilestone);return}if(t==="advance-go"){if(!n.suggestedMilestone)return;await Je(n.suggestedMilestone);return}if(t==="advance-cancel"){l.advanceWarn=!1,$();return}if(t==="onboard-goal"){const a=e.dataset.goal;if(!a||!ui(a))return;const s={...o.profile,goals:di(o.profile.goals??[],a)};await E(async()=>{await v.saveProfile(s),o.profile=s});return}if(t==="onboard-age"){const a=e.dataset.age;if(!a||!fi(a))return;const s={...o.profile,age_band:a};await E(async()=>{await v.saveProfile(s),o.profile=s});return}if(t==="theme-toggle"){const a=e.dataset.theme;if(!a)return;await me(gi(N(o.profile.themes),a));return}if(t==="theme-add"){await Wt();return}if(t==="onboard-start"){const a=e.dataset.item;if(!a)return;l.startIds=ci(l.startIds,a),$();return}if(t==="onboard-next"){$();return}if(t==="onboard-themes-done"){await me(o.profile.themes??[],!0);return}if(t==="onboard-done"){const a=o.profile.age_band,s=o.profile.goals??[];if(!a||s.length===0||l.startIds.length===0)return;await E(async()=>{await v.saveOnboarding({goals:s,age_band:a,startIds:l.startIds}),o=await v.load(),l.screen="vandaag"});return}if(t==="later-now"||t==="later-park"){const a=e.dataset.item;if(!a)return;await E(async()=>{await v.setItemLater(a,t==="later-park"),o=await v.load()});return}if(t==="item-kind"){const a=e.dataset.kind;if(!We(a))return;Kt(),l.addKind=a,$();return}if(t==="item-add"){await Rt();return}if(t==="edit-kind"){const a=e.dataset.kind;if(!We(a))return;fe(),l.editKind=a,$();return}if(t==="item-save"){await zt();return}if(t==="item-remove-ask"){fe(),l.removeAsk=!0,$();return}if(t==="item-remove-cancel"){l.removeAsk=!1,$();return}if(t==="item-remove"){const a=l.detailItemId;if(!a)return;await E(async()=>{await v.removeItem(a),o=await v.load(),l.detailItemId=null,l.removeAsk=!1,l.screen="profiel"});return}if(t==="save-ik"){const a={...o.profile,identity_anti:O(A("identity_anti"),j.identity_anti),identity_new:O(A("identity_new"),j.identity_new),identity_constraint:O(A("identity_constraint"),j.identity_constraint),horizon_1y:O(A("horizon_1y"),j.horizon_1y)};await E(async()=>{await v.saveProfile(a),o.profile=a});return}if(t==="export"){Pt(o);return}}function Kt(){l.addLabel=A("item-label")??l.addLabel,l.addTiming=A("item-timing")??l.addTiming}function fe(){l.editLabel=A("edit-label")??l.editLabel,l.editTiming=A("edit-timing")??l.editTiming}function Ot(e){l.editLabel=e.label,l.editKind=$t(e),l.editTiming=_t(e),l.removeAsk=!1}async function zt(){!v||!o||!l.detailItemId||(fe(),await E(async()=>{const e=await v.updateItem({id:l.detailItemId,label:l.editLabel,kind:l.editKind,timing:l.editTiming});o=await v.load(),Ot(e),l.detailItemId=e.id}))}async function Rt(){!v||!o||(Kt(),await E(async()=>{await v.addItem({label:l.addLabel,kind:l.addKind,timing:l.addTiming}),o=await v.load(),l.addLabel="",l.addTiming=""}))}async function Wt(){if(!o)return;const e=A("theme-custom")??"",t=N(o.profile.themes),n=yi(t,e);n.length===t.length&&n.every((i,a)=>i===t[a])||await me(n)}async function me(e,t=!1){if(!v||!o)return;const n=N(e),i={...o.profile,themes:n},a=t||!Tt(o);await E(async()=>{if(a){await v.saveThemes(n),o=await v.load();return}await v.saveProfile(i),o.profile=i})}function A(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function Je(e){await E(async()=>{o.stage=await v.advanceStage(o.stage,e),o.items=o.items.map(t=>t.id===o.stage.vector_id?{...t,milestone:e}:t),o.rotated=!0,l.advanceWarn=!1})}async function B(e){await E(async()=>{const t=await v.addEvent(e);o.events.push(t)})}async function Ze(e){if(!v||!o)return;const t=on(e);t!==null&&Ce().weight!==t&&await B({date:w(),kind:"body_weight",value:t,skip_reason:null,item_id:null})}Xi();
