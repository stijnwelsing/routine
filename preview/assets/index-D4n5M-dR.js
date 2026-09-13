(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();function Rt(e){return JSON.stringify({exported_at:new Date().toISOString(),profile:e.profile,items:e.items,stage:e.stage,events:e.events},null,2)}function Gt(e){const t=new Blob([Rt(e)],{type:"application/json"}),n=URL.createObjectURL(t),i=document.createElement("a");i.href=n,i.download=`routine-${e.profile.id.slice(0,8)}.json`,i.click(),URL.revokeObjectURL(n)}const qt="geen zin",E={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140};function N(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function Pt(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===qt).length}function Wt(e,t){const n=N(e,E.identity_new);return!n||Pt(t)<2?null:n}function Ht(e){return!!N(e,E.identity_constraint)}function Vt(e,t){return t&&!N(e,E.horizon_1y)}function Je(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const Ze=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],Qe=["zo","ma","di","wo","do","vr","za"];function $(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${i}`}function B(e,t){const n=C(e);return n.setDate(n.getDate()+t),$(n)}function C(e){const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)}function Ft(e){const t=C(e);return`${Qe[t.getDay()]} ${t.getDate()} ${Ze[t.getMonth()]}`}function F(e){const t=C(e);return`${t.getDate()} ${Ze[t.getMonth()]}`}function Ut(e){return Qe[C(e).getDay()]}function Yt(e){const t=C(e).getDay();return t===0?7:t}function me(e){const t=C(e),n=t.getDay(),i=n===0?-6:1-n;return t.setDate(t.getDate()+i),$(t)}function pe(e,t){const n=[];let i=e;for(;i<=t;)n.push(i),i=B(i,1);return n}function O(){return crypto.randomUUID()}function Jt(){return new Date().toISOString()}const Zt=2,Qt=6;function te(e,t){return e.created_at.localeCompare(t.created_at)}function ve(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(te).at(-1)}function Xe(e,t){return t.filter(i=>i.kind==="set").sort(te).at(-1)?.value??e}function ge(e,t){return ve(e,t,"body_sleep")?.value??null}function ye(e,t){return ve(e,t,"body_energy")?.value??null}function U(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip")).sort(te).at(-1)}function et(e,t){const n=U(e,t);return n?.kind==="skip"?n.skip_reason:null}function tt(e,t){return U(e,t)?.kind==="done"}function nt(e,t){return U(e,t)?.kind==="set"}function it(e,t){const n=U(e,t);return n?.kind==="set"||n?.kind==="done"}function Xt(e,t){return e!==null&&e<Qt||t!==null&&t<=Zt}function en(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const i=Math.max(1,Math.ceil(n/2));return Math.min(t,e+i)}function X(e,t,n,i){if(t<i)return"empty";const s=U(e,t);return s?.kind==="done"||s?.kind==="set"?"done":s?.kind==="skip"?"skip":ve(e,t,"miss")?"miss":t>=n?"empty":"miss"}function tn(e,t,n="1970-01-01"){let i=0,s=t;for(let a=0;a<400;a+=1){const r=X(e,s,t,n);if(r==="done")i+=1;else if(r==="skip"||r==="empty"&&s===t){s=B(s,-1);continue}else break;s=B(s,-1)}return i}function nn(e,t,n){const i=me(t),s=!n||n<i?i:n;let a=0,r=0;for(const d of pe(s,t)){const f=X(e,d,t,n??s);f==="skip"||f==="empty"||(r+=1,f==="done"&&(a+=1))}return{hits:a,eligible:r}}function sn(e,t,n="1970-01-01",i=3){const s=X(e,t,t,n);if(s==="done"||s==="skip")return!1;const a=B(t,-1);if(a<n)return!1;const r=B(t,-i),d=n>r?n:r;return pe(d,a).some(f=>X(e,f,t,n)==="miss")}function an(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled&&!e.todayLogged?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function rn(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${Ne(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${Ne(e.milestone)}.`}function Ne(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function st(e,t,n){return t.filter(s=>s.kind==="set"&&s.date<=n).sort(te).at(-1)?.value??e}function on(e,t,n,i){const s=Xe(e.a,n),a=ge(n,i),r=ye(n,i),d=tt(n,i),f=nt(n,i),y=it(n,i),c=et(n,i),g=Xt(a,r),b=s>=t.milestone,j=s>=e.b,q=sn(n,i,t.started_on),P=me(i),p=st(e.a,n,B(P,-1)),_=an({current:s,weekStartCurrent:p,gearDown:g,stalled:q,milestoneHit:b,todayLogged:f||d||!!c});return{current:s,sleep:a,energy:r,doneToday:d,plusToday:f,setLoggedToday:y,skipToday:c,gearDown:g,milestoneHit:b,atB:j,trend:_,hitrate:nn(n,i,t.started_on),streak:tn(n,i,t.started_on),nextAction:rn({milestone:t.milestone,b:e.b,gearDown:g,milestoneHit:b,atB:j,stalled:q,doneToday:d,plusToday:f,skipToday:c}),suggestedMilestone:b&&!j&&!g?en(t.milestone,e.b):null}}const ne=["geen tijd","geen energie","vergeten","geen zin","pijn"];function Ke(e){return!!(e&&ne.includes(e))}const ln=["guideline","evidence-informed","public-framework","user preference","hypothesis"],dn=["vandaag","koers","voortgang","profiel"];function cn(e){return!!(e&&dn.includes(e))}const k={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},at="routine_loop_v6",un=["routine_loop_v5","routine_loop_v4","routine_loop_v3"],Oe="routine_local_user_id",ze="routine_local_tenant_id",fn="routine_local_chosen";function mn(e){return e.trim().toLowerCase().normalize("NFC")}function pn(e){return!!(e&&ln.includes(e))}function vn(e){const t=mn(e);return t==="cafeïne 90 min na opstaan"?"public-framework":t==="wandelen na eten"?"evidence-informed":t==="low carb"||t==="scherm uit 22:00"||t==="korte rust"?"user preference":null}function be(e){return vn(e.label)??(pn(e.template)?e.template:null)}function rt(e){return be(e)!==null}function J(){return{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:null,condition:null}}function gn(e){return{mode:e?.mode??null,clock:e?.clock??null,anchor:e?.anchor??null,offset_min:e?.offset_min??null,window_min:e?.window_min??null,frequency:e?.frequency??null,condition:e?.condition??null}}function ot(e){return e.trim().toLowerCase().normalize("NFC")}function yn(e){return ot(e)==="korte rust"?{mode:"clock",clock:"08:00",window_min:840,frequency:"daily",condition:"body"}:null}function bn(e,t){const n=yn(t);return n?{...e,...n}:e}function lt(e){return{now:e.now??new Date,today:e.today,wakeAt:e.wakeAt??null,mealAt:e.mealAt??null,sleepSet:!!e.sleepSet,energySet:!!e.energySet}}function ke(e){const t=e?.trim().toLowerCase();return t==="body"||t==="energy|sleep"?"body":t==="energy"?"energy":t==="sleep"?"sleep":null}function kn(e,t){const n=ke(e.condition);if(!n)return!0;const i=!!t.sleepSet,s=!!t.energySet;return n==="energy"?s:n==="sleep"?i:i||s}function dt(e,t){const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(!n)return null;const i=Number(n[1]),s=Number(n[2]);if(i>23||s>59)return null;const a=C(e);return a.setHours(i,s,0,0),a}function hn(e,t){return e==="wake"?t.wakeAt:e==="meal"?t.mealAt:null}function wn(e,t){if(e.mode==="clock"&&e.clock)return dt(t.today,e.clock);if(e.mode==="relative"&&e.anchor&&e.offset_min!==null){const n=hn(e.anchor,t);return n?new Date(n.getTime()+e.offset_min*6e4):null}return null}function ct(e,t){return!t||e.window_min===null?null:new Date(t.getTime()+e.window_min*6e4)}function ut(e,t){if(e.timing.frequency==="weekly"||e.type==="weekly"){const i=e.weekdays??[];return i.length===0?!1:i.includes(Yt(t))}return!0}function z(e){return we(e)==="constraint"}function he(e){return we(e)==="preference"}function ft(e){return!z(e)&&!he(e)}function $n(e,t){if(z(e))return"silent";if(!ut(e,t.today)||!kn(e.timing,t))return"hidden";const n=e.timing;if(!n.mode)return"due";const i=wn(n,t);if(n.mode==="relative"&&!i)return"due";if(i&&t.now<i)return"wait";const s=ct(n,i);return s&&t.now>s?"closed":"due"}function Z(e,t){const n=$n(e,t);return!(n==="hidden"||n==="closed"||n==="wait"&&e.timing.window_min!==null)}function Re(e){return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`}function _n(e){if(e.window_min===null)return null;if(e.mode==="clock"&&e.clock){const t=dt("2000-01-01",e.clock);if(!t)return null;const n=ct(e,t);return n?`${Re(t)}–${Re(n)}`:null}return`${e.window_min} min`}function Sn(e){const t=ke(e.condition);return t==="body"?"na slaap of energie":t==="energy"?"na energie":t==="sleep"?"na slaap":null}function ie(e){const t=e.timing;return ke(t.condition)?null:t.condition?t.condition:t.mode==="relative"&&t.anchor==="wake"&&t.offset_min!==null?`${t.offset_min} min na opstaan`:t.mode==="relative"&&t.anchor==="meal"?"na eten":t.mode==="clock"&&t.clock?t.clock:null}function we(e){if(e.role)return e.role;const t=ot(e.label);return t==="low carb"?"preference":t==="cafeïne 90 min na opstaan"||t==="scherm uit 22:00"?"constraint":null}const $e=["gedrag","regel","medicijn","supplement","sociaal"],_e={gedrag:"gedrag",regel:"leefregel",medicijn:"medicijn",supplement:"supplement",sociaal:"sociaal"},Se={gedrag:"Gedrag",regel:"Regel",medicijn:"Medicijn",supplement:"Supplement",sociaal:"Sociaal"},xe=40,Ie=40;function Ge(e){return!!(e&&$e.includes(e))}function Y(e){return e.a!==null&&e.b!==null&&e.milestone!==null}function xn(e,t){return ut(e,t)}function In(e,t){return{...e,tenant_id:e.tenant_id??t,weekdays:e.weekdays??null,times_per_week:e.times_per_week??null,timing:bn(gn(e.timing),e.label),role:we(e),template:be(e),later:!!e.later,removed:!!e.removed}}function Le(e){return e.type==="medicijn"||e.type==="supplement"}function mt(e){return e.type==="sociaal"}function pt(e,t){return V(e,t).filter(n=>ft(n)&&!Le(n)&&!mt(n)&&!n.later)}function Ln(e,t){return V(e,t).filter(n=>he(n)&&!n.later)}function Tn(e,t){return V(e,t).filter(n=>z(n)&&!n.later)}function vt(e,t){return V(e,t).filter(n=>Le(n)&&!n.later)}function gt(e,t){return V(e,t).filter(n=>mt(n)&&!n.later)}function En(e,t){return V(e,t).filter(n=>n.later&&(ft(n)||z(n)))}function V(e,t){return e.filter(n=>!n.removed&&xn(n,t)).sort((n,i)=>n.sort-i.sort)}function se(e){return e.find(Y)}function le(e){return e.kind==="body_sleep"||e.kind==="body_energy"||e.kind==="body_weight"}function ae(e,t,n){return e.filter(i=>le(i)?!1:!!(i.item_id===t.id||i.item_id===null&&n&&t.id===n))}function jn(e,t){return t?[...e.filter(le),...ae(e,t,t.id)]:e.filter(le)}function yt(e){return e.a===null?null:e.unit==="sec"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} s`:e.unit==="reps"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} reps`:String(e.a)}function x(e){return e.trim().toLowerCase()}function R(e){const t=e.trim().replace(/\s+/g," ").slice(0,xe);return t.length>0?t:null}function Te(e){const t=e.trim().replace(/\s+/g," ").slice(0,Ie);if(!t)return J();const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(n){const i=Number(n[1]),s=Number(n[2]);if(i<=23&&s<=59)return{...J(),mode:"clock",clock:`${String(i).padStart(2,"0")}:${n[2]}`,frequency:"daily"}}return{...J(),frequency:"daily",condition:t}}function An(e){return e.reduce((t,n)=>Math.max(t,n.sort),-1)+1}const Bn=["Push-ups","Squats","Plank","Dead hang","Gerichte kracht","Koud douchen","Niet snoepen","Low carb","Intermittent fasting","Geen alcohol","Cafeïne 90 min na opstaan","Wandelen na eten","Medicijn ochtend","Vitamine D","Bellen met iemand","Iemand zien","Scherm uit 22:00","Korte rust"];function re(e){const t=x(e);return Bn.some(n=>x(n)===t)}function Ee(e){return re(e.label)}function D(e){return!Ee(e)}function G(e){return!!e.removed}function Mn(e){return e.filter(t=>D(t)&&!G(t)).sort((t,n)=>t.sort-n.sort)}function bt(e){return e.type==="leefregel"?"regel":e.type==="medicijn"?"medicijn":e.type==="supplement"?"supplement":e.type==="sociaal"?"sociaal":"gedrag"}function kt(e){return e.timing.mode==="clock"&&e.timing.clock?e.timing.clock:e.timing.condition??""}function Cn(e,t){const n=R(t);return n?!e.some(i=>!G(i)&&x(i.label)===x(n)):!1}function Dn(e,t,n){const i=R(n);return!i||re(i)?!1:!e.some(s=>s.id!==t&&!G(s)&&x(s.label)===x(i))}function Nn(e,t){const n=R(t);if(n)return e.find(i=>G(i)&&D(i)&&x(i.label)===x(n))}function Kn(e){const t=R(e.label);return t?{id:O(),tenant_id:e.tenantId,type:_e[e.kind],label:t,unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:e.sort,timing:Te(e.timing??""),role:"action",template:"user preference",later:!!e.later,removed:!1}:null}function On(e,t){if(!D(e)||G(e))return null;const n=R(t.label);return!n||re(n)?null:{...e,type:_e[t.kind],label:n,timing:Te(t.timing??""),template:"user preference"}}function zn(e,t){if(!D(e)||!G(e))return null;const n=R(t.label);return!n||re(n)?null:{...e,type:_e[t.kind],label:n,timing:Te(t.timing??""),template:"user preference",later:!1,removed:!1}}function Rn(e){return G(e)?{item:e,mode:"removed"}:D(e)?{item:{...e,removed:!0},mode:"removed"}:Ee(e)?{item:{...e,later:!0},mode:"parked"}:null}function Gn(e){const t=new Set,n=[];for(const i of e){const s=x(i.label);t.has(s)||(t.add(s),n.push(i))}return n}function ht(e,t,n){const i=Gn(e),s=new Set(i.map(r=>x(r.label))),a=t.filter(r=>!s.has(x(r.label))).map(r=>({...r,tenant_id:n}));return[...i,...a]}function qn(e){const t=new Map;for(const n of e)for(const i of n)t.has(i.id)||t.set(i.id,i);return[...t.values()].sort((n,i)=>n.created_at.localeCompare(i.created_at))}function Pn(e){return e?!!(e.identity_anti||e.identity_new||e.identity_constraint||e.horizon_1y||e.display_name):!1}function Wn(e,t,n,i){if(e.length===0)return null;const s=e.reduce((c,g)=>(g.events?.length??0)>(c.events?.length??0)?g:c),a=e.find(c=>Pn(c.profile))?.profile??s.profile,r=ht([s,...e.filter(c=>c!==s)].flatMap(c=>c.items??[]),t,i),d=new Map(r.map(c=>[x(c.label),c.id])),f=new Map;for(const c of e)for(const g of c.items??[]){const b=d.get(x(g.label));b&&g.id!==b&&f.set(g.id,b)}const y=qn(e.map(c=>c.events??[])).map(c=>{if(!c.item_id)return c;const g=f.get(c.item_id);return g?{...c,item_id:g}:c});return{...s,profile:{...a,id:a.id||n,tenant_id:a.tenant_id||i},items:r,events:y}}function Hn(e,t,n,i){return ae(e,t,n).some(s=>(s.kind==="set"||s.kind==="done"||s.kind==="skip"||s.kind==="miss")&&s.date<i)}function wt(e,t){return e.created_at.localeCompare(t.created_at)}function Vn(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(wt).at(-1)}function Fn(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip"||n.kind==="miss")).sort(wt).at(-1)}function Un(e,t=[]){const n=C(e);return n.setHours(12,0,0,0),lt({today:e,now:n,sleepSet:ge(t,e)!==null,energySet:ye(t,e)!==null})}function de(e,t,n=[]){const i=Un(t,n);return[...pt(e,t),...vt(e,t),...gt(e,t)].filter(s=>Z(s,i))}function ce(e,t,n,i,s){const a=ae(e,t,s),r=Fn(a,n);if(r?.kind==="set"||r?.kind==="done")return{item:t,date:n,mark:"hit",reason:null};if(r?.kind==="skip")return{item:t,date:n,mark:"skip",reason:r.skip_reason};const d=r?.kind==="miss"?r:Vn(a,n,"miss");return d?{item:t,date:n,mark:"miss",reason:d.skip_reason}:n>=i?{item:t,date:n,mark:"open",reason:null}:{item:t,date:n,mark:"idle",reason:null}}function $t(e,t,n,i){const s=B(n,-1);return de(e,s,t).filter(a=>Hn(t,a,i,s)).map(a=>{const r=ce(t,a,s,n,i);return r.mark==="hit"||r.mark==="skip"||r.mark==="miss"?r:{...r,mark:"miss",reason:null}}).filter(a=>a.mark==="miss"&&!a.reason)}function Yn(e,t,n){return e.some(i=>i.mark==="hit")?"hit":e.some(i=>i.mark==="miss")?"miss":e.some(i=>i.mark==="skip")?"skip":t===n?"open":"idle"}function _t(e,t,n,i){const s=me(n),a=B(s,6),r=$t(e,t,n,i),d=new Set(r.map(p=>`${p.item.id}:${p.date}`)),f=pe(s,a).map(p=>{const m=de(e,p,t).map(_=>{const oe=ce(t,_,p,n,i);return d.has(`${_.id}:${p}`)?{...oe,mark:"miss",reason:oe.reason}:oe});return{date:p,label:Ut(p),mark:Yn(m,p,n),hits:m.filter(_=>_.mark==="hit").length,misses:m.filter(_=>_.mark==="miss").length,skips:m.filter(_=>_.mark==="skip").length}}),y=f.filter(p=>p.date<n),c=y.reduce((p,m)=>p+m.hits,0),g=y.reduce((p,m)=>p+m.misses,0),b=y.reduce((p,m)=>p+m.skips,0),j=y.flatMap(p=>de(e,p.date,t).map(m=>{const _=ce(t,m,p.date,n,i);return d.has(`${m.id}:${p.date}`)?{..._,mark:"miss",reason:_.reason}:_}).filter(m=>m.mark==="miss")),q=y.filter(p=>p.mark!=="idle").length,P=c>0&&g===0&&q>=2?"Week staat.":null;return{start:s,end:a,range:`${F(s)} – ${F(a)}`,days:f,hits:c,misses:g,skips:b,missRows:j,note:P}}function Q(e){return se(e)?.id}const ee=3,je=[{id:"kracht",label:"Kracht"},{id:"eten",label:"Eten & drinken"},{id:"slaap",label:"Slaap"},{id:"stofjes",label:"Stofjes"},{id:"bewegen",label:"Bewegen"}],Ae=["18–29","30–39","40–49","50–59","60+"],Jn={kracht:["Push-ups","Squats","Plank","Dead hang"],eten:["Niet snoepen","Low carb","Intermittent fasting","Geen alcohol"],slaap:["Koud douchen"],stofjes:["Medicijn ochtend","Vitamine D"],bewegen:["Wandelen na eten"]};function Be(e){return z(e)||e.type==="weekly"?!1:e.type==="daily"||e.type==="leefregel"||e.type==="gedrag"||e.type==="sociaal"||Le(e)}function Zn(e){return e.filter(t=>t.removed?!1:Be(t)?!0:z(t)&&t.later).sort((t,n)=>t.sort-n.sort)}function St(e){return!(e.onboarded!==!1||(e.events??[]).length>0)}function Qn(e){return St(e)?e.profile.goals?.length?e.profile.age_band?e.theme_step!==!0?"themes":"start":"age":"goals":null}function Xn(e,t){const n=e.filter(Be).sort((a,r)=>a.sort-r.sort);if(t.length===0)return n;const i=new Set(t.flatMap(a=>Jn[a]??[])),s=n.filter(a=>i.has(a.label));return s.length>0?s:n}function ei(e,t){const n=new Set(t.slice(0,ee));return e.map(i=>Be(i)?{...i,later:!n.has(i.id)}:{...i,later:!1})}function ti(e,t){return e.includes(t)?e.filter(n=>n!==t):[...e,t]}function ni(e,t){return e.includes(t)?e.filter(n=>n!==t):e.length>=ee?e:[...e,t]}function ii(e){return je.some(t=>t.id===e)}function si(e){return Ae.includes(e)}function ai(e,t,n,i,s){const a=_t(e,t,n,s??Q(e)),r=a.days.map(d=>({date:d.date,label:d.label,current:st(i,t,d.date<=n?d.date:n),mark:d.mark}));return{week:a,line:r,hits:a.hits,skips:a.skips,misses:a.misses}}function ri(e,t,n,i=18,s=16){if(e.length===0)return[];const a=Math.min(...e),d=Math.max(...e)-a,f=t-i*2,y=n-s*2;return e.map((c,g)=>{const b=e.length===1?t/2:i+g/(e.length-1)*f,j=d===0?n/2:s+(1-(c-a)/d)*y;return{x:b,y:j}})}function oi(e){return e.map(t=>`${t.x.toFixed(1)},${t.y.toFixed(1)}`).join(" ")}const qe=["Military calisthenics","Kickbox","Spinnen"],xt=40;function Me(e){const t=e.trim().replace(/\s+/g," ").slice(0,xt);return t.length>0?t:null}function M(e){if(!Array.isArray(e))return[];const t=new Set,n=[];for(const i of e){if(typeof i!="string")continue;const s=Me(i);if(!s)continue;const a=s.toLowerCase();t.has(a)||(t.add(a),n.push(s))}return n}function li(e,t){const n=Me(t);if(!n)return e;const i=n.toLowerCase();return e.some(s=>s.toLowerCase()===i)?e.filter(s=>s.toLowerCase()!==i):[...e,n]}function di(e,t){const n=Me(t);if(!n)return e;const i=n.toLowerCase();return e.some(s=>s.toLowerCase()===i)?e:[...e,n]}function ci(e){const n=M(e).filter(i=>!qe.some(s=>s.toLowerCase()===i.toLowerCase()));return[...qe,...n]}function Pe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function It(e){const t=new Set(M(e).map(i=>i.toLowerCase()));return`<div class="chips">${ci(e).map(i=>`<button class="chip pick ${t.has(i.toLowerCase())?"on":""}" data-act="theme-toggle" data-theme="${Pe(i)}">${Pe(i)}</button>`).join("")}</div>
        <div class="theme-add">
          <input data-id="theme-custom" type="text" maxlength="${xt}" placeholder="Eigen thema" autocomplete="off" enterkeyhint="done" />
          <button class="btn ghost" data-act="theme-add">Voeg toe</button>
        </div>`}function ui(e){return e.skip?null:e.plus?{text:"Set gedaan.",tone:"fog"}:e.done?e.type==="medicijn"?{text:"Genomen.",tone:"sage"}:e.track?{text:"Set staat.",tone:"sage"}:{text:"Staat.",tone:"sage"}:null}function Lt(e,t){return{id:e,tenant_id:t,display_name:null,...Je(),age_band:null,goals:[],themes:[]}}function Tt(e,t,n=$()){return{id:O(),tenant_id:t,vector_id:e,milestone:k.milestone,started_on:n,deadline:B(n,k.windowDays),status:"active",stage_type:k.stageType}}function Ce(e){const t=n=>({id:O(),tenant_id:e,timing:J(),role:null,template:null,later:!1,...n});return[t({type:"daily",label:"Push-ups",unit:"reps",a:k.a,b:k.b,milestone:k.milestone,weekdays:null,times_per_week:null,sort:0}),t({type:"daily",label:"Squats",unit:"reps",a:30,b:null,milestone:null,weekdays:null,times_per_week:null,sort:1}),t({type:"daily",label:"Plank",unit:"sec",a:60,b:null,milestone:null,weekdays:null,times_per_week:null,sort:2}),t({type:"daily",label:"Dead hang",unit:"sec",a:45,b:null,milestone:null,weekdays:null,times_per_week:null,sort:3}),t({type:"weekly",label:"Gerichte kracht",unit:null,a:null,b:null,milestone:null,weekdays:[],times_per_week:2,sort:4}),t({type:"leefregel",label:"Koud douchen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:5}),t({type:"leefregel",label:"Niet snoepen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:6}),t({type:"leefregel",label:"Low carb",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:7,role:"preference",template:"user preference"}),t({type:"leefregel",label:"Intermittent fasting",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:8}),t({type:"leefregel",label:"Geen alcohol",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:9}),t({type:"gedrag",label:"Cafeïne 90 min na opstaan",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:10,role:"constraint",template:"public-framework",timing:{mode:"relative",clock:null,anchor:"wake",offset_min:90,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Wandelen na eten",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:11,role:"action",template:"evidence-informed",timing:{mode:"relative",clock:null,anchor:"meal",offset_min:0,window_min:null,frequency:"daily",condition:"na eten"}}),t({type:"medicijn",label:"Medicijn ochtend",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:12,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"ochtend"}}),t({type:"supplement",label:"Vitamine D",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:13,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Bellen met iemand",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:14,role:"action",template:null,timing:{mode:"clock",clock:"18:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Iemand zien",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:1,sort:15,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"deze week"}}),t({type:"gedrag",label:"Scherm uit 22:00",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:16,role:"constraint",template:"user preference",timing:{mode:"clock",clock:"22:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Korte rust",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:17,role:"action",template:"user preference",timing:{mode:"clock",clock:"08:00",anchor:null,offset_min:null,window_min:840,frequency:"daily",condition:"body"}})]}function fi(e,t){return{id:e.id,tenant_id:e.tenant_id,user_id:t,domain:k.domain,a:e.a??k.a,b:e.b??k.b,unit:e.unit==="sec"?"sec":"reps",pace_constraint:null}}function mi(e,t=$(),n=O()){const i=Lt(e,n),s=Ce(n),a=se(s)??s[0],r=fi(a,e),d=Tt(r.id,n,t);return a.milestone!==null&&(d.milestone=a.milestone),{profile:i,items:s,vector:r,stage:d,events:[],rotated:!1,onboarded:!1,theme_step:!1}}function pi(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,items:e.items.map(n=>Y(n)?{...n,a:k.a,b:k.b,milestone:k.milestone,unit:k.unit}:n),vector:{...e.vector,a:k.a,b:k.b,unit:k.unit},stage:{...e.stage,milestone:k.milestone},events:e.events}:e}function vi(){const e=localStorage.getItem(Oe);if(e)return e;const t=O();return localStorage.setItem(Oe,t),t}function gi(){const e=localStorage.getItem(ze);if(e)return e;const t=O();return localStorage.setItem(ze,t),t}function S(e){localStorage.setItem(at,JSON.stringify(e))}function yi(e){if(!e)return null;try{const t=JSON.parse(e);return!t||typeof t!="object"?null:t}catch{return null}}function bi(){return[at,...un].map(e=>yi(localStorage.getItem(e))).filter(e=>e!==null)}function ki(e,t,n){const i=ht(e.items??[],Ce(n),n).map(s=>In(s,n));return{...e,profile:{...Lt(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...Je(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null,age_band:e.profile?.age_band??null,goals:Array.isArray(e.profile?.goals)?e.profile.goals:[],themes:M(e.profile?.themes)},items:i,vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(s=>({...s,tenant_id:s.tenant_id??n,item_id:s.item_id??null})),rotated:!!e.rotated,onboarded:e.onboarded??!0,theme_step:e.theme_step??!1}}function I(e,t){const n=bi();if(n.length===0){const a=mi(e,$(),t);return S(a),a}const i=Wn(n,Ce(t),e,t)??n[0],s=pi(ki(i,e,t));return S(s),s}function hi(){localStorage.setItem(fn,"1");const e=vi(),t=gi();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return I(e,t)},async addEvent(n){const i=I(e,t),s={id:n.id??O(),tenant_id:t,user_id:e,item_id:n.item_id??null,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:Jt()};return i.events.push(s),S(i),s},async saveProfile(n){const i=I(e,t);i.profile=n,S(i)},async saveOnboarding(n){const i=I(e,t);i.profile={...i.profile,goals:n.goals,age_band:n.age_band,themes:M(i.profile.themes)},i.items=ei(i.items,n.startIds),i.onboarded=!0,i.theme_step=!0,S(i)},async saveThemes(n){const i=I(e,t);i.profile={...i.profile,themes:M(n)},i.theme_step=!0,S(i)},async setItemLater(n,i){const s=I(e,t);s.items=s.items.map(a=>a.id===n?{...a,later:i}:a),S(s)},async addItem(n){const i=I(e,t),s=Nn(i.items,n.label);if(s){const r=zn(s,{label:n.label,kind:n.kind,timing:n.timing});if(!r)throw new Error("naam ontbreekt");return i.items=i.items.map(d=>d.id===r.id?r:d),S(i),r}const a=Kn({tenantId:t,label:n.label,kind:n.kind,timing:n.timing,sort:An(i.items)});if(!a)throw new Error("naam ontbreekt");if(!Cn(i.items,a.label))throw new Error("item bestaat al");return i.items=[...i.items,a],S(i),a},async updateItem(n){const i=I(e,t),s=i.items.find(r=>r.id===n.id);if(!s)throw new Error("item ontbreekt");if(!R(n.label))throw new Error("naam ontbreekt");if(!Dn(i.items,s.id,n.label))throw new Error("item bestaat al");const a=On(s,n);if(!a)throw new Error("alleen eigen item");return i.items=i.items.map(r=>r.id===a.id?a:r),S(i),a},async removeItem(n){const i=I(e,t),s=i.items.find(r=>r.id===n);if(!s)throw new Error("item ontbreekt");const a=Rn(s);if(!a)throw new Error("item blijft");return i.items=i.items.map(r=>r.id===a.item.id?a.item:r),S(i),a.item},async saveVectorConstraint(n,i){const s=I(e,t);s.vector.id===n&&(s.vector.pace_constraint=i,S(s))},async advanceStage(n,i){const s=I(e,t),a=Tt(n.vector_id,t);return a.milestone=i,s.stage=a,s.items=s.items.map(r=>r.id===n.vector_id?{...r,milestone:i}:r),s.rotated=!0,S(s),a},async signOut(){}}}const We="#F0ECE4",wi="#3D6B5A";function Et(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${We}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${We}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${wi}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function h(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function $i(e){return e==="stokt"||e==="herstel"?"ember":e==="stijgt"?"sage":"fog"}function He(e){const t=$i(e);return e==="stokt"||e==="herstel"||e==="zakt"?h("status-kink",`ico-${t}`):e==="stijgt"?h("status-up",`ico-${t}`):h("status-flat",`ico-${t}`)}function _i(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${h(n?"dot-now":"dot")}</button>`}).join("")}const Si=`
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
</svg>`;function xi(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",Si)}const W=()=>document.querySelector("#app"),l={screen:"vandaag",skipItemId:null,missKey:null,detailItemId:null,advanceWarn:!1,busy:!1,error:null,startIds:[],addKind:"gedrag",addLabel:"",addTiming:"",editKind:"gedrag",editLabel:"",editTiming:"",removeAsk:!1};let v=null,o=null;function jt(){if(!o)throw new Error("geen snapshot");const e=se(o.items);return on(o.vector,o.stage,jn(o.events,e),$())}function K(e,t=$()){if(!o)throw new Error("geen snapshot");const n=se(o.items),i=ae(o.events,e,n?.id),s=e.a===null?null:Xe(e.a,i);return{done:tt(i,t),plus:nt(i,t),skip:et(i,t),logged:it(i,t),current:s}}function At(e,t){return`${e}:${t}`}function Ii(e=$()){const t=o?.events??[];return lt({today:e,now:new Date,sleepSet:ge(t,e)!==null,energySet:ye(t,e)!==null})}function u(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function w(){if(!o||!v)return;const e=Qn(o);if(e){W().innerHTML=Ni(e);return}const t=jt(),{vector:n,stage:i}=o,s=v.mode==="local"?"Lokaal":"Supabase",a=`
    <div class="hdr">
      <div>
        ${Et()}
        <div class="date-s">${Ft($())}</div>
      </div>
      <div class="mode-pill">${s}</div>
    </div>`,r=`
    <nav class="nav nav-4">
      <button data-nav="vandaag" class="${l.screen==="vandaag"?"active":""}">${h("day")}Vandaag</button>
      <button data-nav="koers" class="${l.screen==="koers"?"active":""}">${h("mark")}Koers</button>
      <button data-nav="voortgang" class="${l.screen==="voortgang"?"active":""}">${h("line")}Voortgang</button>
      <button data-nav="profiel" class="${l.screen==="profiel"?"active":""}">${h("me")}Profiel</button>
    </nav>`;if(l.detailItemId){const d=o.items.find(f=>f.id===l.detailItemId);if(d){W().innerHTML=`
      ${a}
      ${Oi(d)}
      ${l.error?`<p class="error" style="padding:0 18px">${u(l.error)}</p>`:""}
      ${r}`;return}l.detailItemId=null}if(l.screen==="vandaag"){const d=Wt(o.profile.identity_new,o.events),f=$(),y=Ii(f),c=pt(o.items,f).filter(m=>Z(m,y)),g=Tn(o.items,f),b=vt(o.items,f).filter(m=>Z(m,y)),j=gt(o.items,f).filter(m=>Z(m,y)),q=En(o.items,f),P=Ln(o.items,f),p=$t(o.items,o.events,f,Q(o.items));W().innerHTML=`
      ${a}
      ${v.mode==="local"?'<div class="banner">Lokaal — geen Supabase. +1 / Done / Skip blijven op dit apparaat.</div>':""}
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
          <div class="dots">${_i(t.energy)}</div>
        </div>
      </div>
      ${P.length?`<div class="sec-hd">Dag</div>
      <div class="card quiet">
        <div class="day-tags">${P.map(m=>Ki(m)).join("")}</div>
      </div>`:""}
      ${g.length?`<div class="sec-hd">Regel</div>${g.map(m=>Gi(m)).join("")}`:""}
      ${b.length?`<div class="sec-hd">Stofjes</div>${b.map(m=>Ve(m)).join("")}`:""}
      ${j.length?`<div class="sec-hd">Sociaal</div>${j.map(m=>Ve(m)).join("")}`:""}
      ${p.length?`<div class="sec-hd">Niet gedaan</div>
      <div class="card">
        <div class="note" style="margin-top:0">Geen +1, Done of Skip. Korte reden.</div>
        ${p.map(m=>Mt(m)).join("")}
      </div>`:""}
      <div class="sec-hd">Vandaag</div>
      ${c.map(m=>qi(m,t,d)).join("")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Niet in je start. Blijft bewaard.</div>
        ${q.map(m=>ji(m)).join("")}
        <button class="btn ghost later-add" data-nav="profiel">Eigen item</button>
      </div>
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${He(t.trend.word)}
          <div class="word">${t.trend.word}</div>
        </div>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${u(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="koers"){W().innerHTML=`
      ${a}
      ${Ue(o.profile.themes,"Tik een suggestie of typ zelf. Geen vaste lijst. Later aan te passen.")}
      ${Fe(_t(o.items,o.events,$(),Q(o.items)))}
      <div class="sec-hd">Strength · push-ups</div>
      <div class="card">
        <div class="kv">
          <div><div class="lbl">A</div><div class="val">${L(n.a)}</div></div>
          <div><div class="lbl">B</div><div class="val">${L(n.b)}</div></div>
          <div><div class="lbl">Nu</div><div class="val">${L(t.current)}</div></div>
          <div><div class="lbl">Etappe</div><div class="val">${L(i.milestone)}</div></div>
        </div>
      </div>
      <div class="card">
        <div class="kv">
          <div>
            <div class="lbl">Venster</div>
            <div class="val" style="font-size:1.15rem">${F(i.started_on)} → ${i.deadline?F(i.deadline):"—"}</div>
          </div>
          <div>
            <div class="lbl">Trend</div>
            <div class="val status">${He(t.trend.word)} ${t.trend.word}</div>
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
      ${Vt(o.profile.horizon_1y,o.rotated)?'<div class="banner">Zet een 1-jaars B. Etappes roteren.</div>':""}
      <div class="sec-hd">${h("ik")} Ik</div>
      <div class="card">
        <div class="field">
          <div class="lbl">Leven dat ik weiger</div>
          <textarea data-id="identity_anti" maxlength="${E.identity_anti}">${u(o.profile.identity_anti??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wie ik word</div>
          <textarea data-id="identity_new" maxlength="${E.identity_new}">${u(o.profile.identity_new??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wat B niet mag schenden</div>
          <textarea data-id="identity_constraint" maxlength="${E.identity_constraint}">${u(o.profile.identity_constraint??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">1-jaars B</div>
          <textarea data-id="horizon_1y" maxlength="${E.horizon_1y}">${u(o.profile.horizon_1y??"")}</textarea>
        </div>
        <button class="btn primary" data-act="save-ik">Bewaar</button>
      </div>
      <div class="card stack">
        <button class="btn ghost ico-btn" data-act="export">${h("export")}<span>Exporteer JSON</span></button>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${u(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="voortgang"){const d=ai(o.items,o.events,$(),o.vector.a,Q(o.items));W().innerHTML=`
      ${a}
      ${Fe(d.week)}
      <div class="sec-hd">Lijn</div>
      <div class="card">
        <div class="note" style="margin-top:0">Huidige deze week. Geen score.</div>
        ${Di(d.line.map(f=>f.current),$(),d.line)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Nu</div><div class="val">${L(t.current)}</div></div>
          <div><div class="lbl">Gedaan</div><div class="val">${d.hits}</div></div>
        </div>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${u(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="profiel"){const d=o.profile.goals??[],f=o.profile.age_band,y=Zn(o.items);W().innerHTML=`
      ${a}
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
      ${Ue(o.profile.themes,"Tik een suggestie of typ zelf. Later aan te passen.")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Parkeren of terughalen. Events blijven.</div>
        ${y.map(c=>Ai(c)).join("")}
      </div>
      ${Mi(o.items)}
      ${Ci()}
      ${l.error?`<p class="error" style="padding:0 18px">${u(l.error)}</p>`:""}
      ${r}`;return}}function Bt(e){const t=K(e),n=ui({plus:t.plus,done:t.done,skip:t.skip,type:e.type,track:Y(e)});return n?`<div class="confirm ${n.tone}" role="status">${u(n.text)}</div>`:""}function Ve(e){const t=K(e),n=t.logged||!!t.skip,i=e.type==="medicijn"?"Genomen":"Done",s=ie(e);return`
      <div class="card stof">
        ${De(e)}
        ${s?`<div class="note">${u(s)}</div>`:""}
        <div class="actions actions-two">
          <button class="btn ico-btn ${t.done?"track":""}" data-act="done" data-item="${e.id}" ${n?"disabled":""}>${h("done")}<span>${i}</span></button>
          <button class="btn ico-btn skip ${t.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${t.logged?"disabled":""}>${h("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||t.skip?`<div class="chips">${ne.map(a=>`<button class="chip ${t.skip===a?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${a}">${a}</button>`).join("")}</div>`:""}
        ${Bt(e)}
      </div>`}function Li(e,t,n,i){return`<div class="chips">${ne.map(s=>`<button class="chip ${n===s?"on":""}" data-act="${i}" data-item="${e}" data-date="${t}" data-reason="${s}">${s}</button>`).join("")}</div>`}function Mt(e){const t=l.missKey===At(e.item.id,e.date)||!!e.reason;return`
      <div class="miss-row">
        <button class="miss-item" data-act="miss-open" data-item="${e.item.id}" data-date="${e.date}">
          <span class="ex-nm">${u(e.item.label)}</span>
          <span class="note">${e.reason?u(e.reason):F(e.date)}</span>
        </button>
        ${t?Li(e.item.id,e.date,e.reason,"miss"):""}
      </div>`}function Ti(e){const t=[];return e.hits&&t.push(`${e.hits} gedaan`),e.skips&&t.push(`${e.skips} overgeslagen`),e.misses&&t.push(`${e.misses} niet gedaan`),t.length===0?"Nog geen dagen deze week.":t.join(" · ")}function Ei(e){return e==="skip"?"–":e==="miss"?"×":"·"}function Fe(e){return`
      <div class="sec-hd">Week</div>
      <div class="card">
        <div class="note" style="margin-top:0">${u(e.range)}</div>
        <div class="week-strip" aria-label="Weekoverzicht">
          ${e.days.map(t=>`<div class="week-day ${t.mark}${t.date===$()?" today":""}">
            <span class="week-lbl">${t.label}</span>
            <span class="week-mark">${Ei(t.mark)}</span>
          </div>`).join("")}
        </div>
        <div class="note">${u(Ti(e))}</div>
        ${e.note?`<div class="week-note">${u(e.note)}</div>`:""}
        ${e.missRows.length?e.missRows.map(t=>Mt(t)).join(""):""}
      </div>`}function Ct(e){return rt(e)||D(e)?`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>`:`<div class="ex-nm">${u(e.label)}</div>`}function ji(e){return`
      <div class="later-row">
        ${Ct(e)}
        <button class="btn ghost later-now" data-act="later-now" data-item="${e.id}">Nu</button>
      </div>`}function Ai(e){const t=e.later;return`
      <div class="later-row">
        <div>
          ${Ct(e)}
          <div class="note" style="margin-top:4px">${t?"Later":"Nu"}</div>
        </div>
        <button class="btn ghost later-now" data-act="${t?"later-now":"later-park"}" data-item="${e.id}">${t?"Nu":"Later"}</button>
      </div>`}function Bi(e){const t=Se[bt(e)],n=kt(e);return`
      <div class="later-row">
        <div>
          <button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>
          <div class="note" style="margin-top:4px">${u(t)}${n?` · ${u(n)}`:""}</div>
        </div>
        <button class="btn ghost later-now" data-act="detail-open" data-item="${e.id}">Wijzig</button>
      </div>`}function Mi(e){const t=Mn(e);return t.length===0?"":`
      <div class="sec-hd">Eigen items</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Label, type of tijd. Weg haalt het uit Vandaag. Log blijft.</div>
        ${t.map(n=>Bi(n)).join("")}
      </div>`}function Ci(){return`
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
      </div>`}function Di(e,t,n){const a=ri(e,294,72);if(a.length===0)return'<div class="note">Nog geen lijn.</div>';const r=a.map((d,f)=>{const y=n[f]?.date===t;return`<circle class="${n[f]?.mark==="miss"?"prog-dot miss":y?"prog-dot now":"prog-dot"}" cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${y?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${oi(a)}" />
          ${r}
        </svg>`}function Ue(e,t){return`
      <section class="theme-sec" data-sec="themes">
        <div class="sec-hd">Thema's</div>
        <div class="card">
          <div class="ex-nm">Trainingsrichting</div>
          <div class="note">${u(t)}</div>
          ${It(e)}
        </div>
      </section>`}function Ni(e){if(!o)return"";const t=o.profile.goals??[],n=o.profile.age_band,i=Xn(o.items,t),s=l.startIds,a=`
    <div class="hdr">
      <div>
        ${Et()}
        <div class="date-s">Start</div>
      </div>
    </div>`;if(e==="goals")return`
      ${a}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="ex-nm">Wat is je richting?</div>
        <div class="note">Eerst doelen. Types (gedrag, regel, medicijn, supplement, sociaal) komen daarna.</div>
        <div class="chips">${je.map(r=>`<button class="chip pick ${t.includes(r.id)?"on":""}" data-act="onboard-goal" data-goal="${r.id}">${r.label}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${t.length===0?"disabled":""}>Verder</button>
        </div>
      </div>`;if(e==="age")return`
      ${a}
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="ex-nm">Kies een band</div>
        <div class="note">Geen geboortedatum. Alleen een band.</div>
        <div class="chips">${Ae.map(r=>`<button class="chip pick ${n===r?"on":""}" data-act="onboard-age" data-age="${r}">${r}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${n?"":"disabled"}>Verder</button>
        </div>
      </div>`;if(e==="themes"){const r=o.profile.themes??[];return`
      ${a}
      <div class="sec-hd">Thema's</div>
      <div class="card">
        <div class="ex-nm">Trainingsrichting</div>
        <div class="note">Tik een suggestie of typ zelf. Mag leeg. Later aan te passen.</div>
        ${It(r)}
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-themes-done">Verder</button>
        </div>
      </div>`}return`
    ${a}
    <div class="sec-hd">Start</div>
    <div class="card">
      <div class="ex-nm">Max ${ee} nu</div>
      <div class="note">De rest gaat naar Later. Later blijft zichtbaar.</div>
      <div class="chips">${i.map(r=>`<button class="chip pick ${s.includes(r.id)?"on":""}" data-act="onboard-start" data-item="${r.id}">${u(r.label)}</button>`).join("")}</div>
      <div class="note">${s.length} / ${ee} gekozen</div>
      <div class="stack" style="margin-top:16px">
        <button class="btn primary" data-act="onboard-done" ${s.length===0?"disabled":""}>Naar Vandaag</button>
      </div>
    </div>`}function De(e){return!rt(e)&&!D(e)?`<div class="ex-nm">${u(e.label)}</div>`:`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>`}function Ki(e){return`<button class="chip pick" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>`}function Oi(e){const t=be(e),n=ie(e),i=_n(e.timing),s=Sn(e.timing),a=yt(e),r=he(e),d=z(e),f=D(e);return`
      <button class="btn ghost detail-back" data-act="detail-close">Terug</button>
      <div class="sec-hd">Detail</div>
      <div class="card">
        <div class="ex-nm">${u(e.label)}</div>
        ${i?`<div class="note">${u(i)}</div>`:""}
        ${s?`<div class="note">${u(s)}</div>`:""}
        ${n&&!s?`<div class="note">${u(n)}</div>`:""}
        ${a?`<div class="work">${u(a)}</div>`:""}
        ${r?'<div class="note">Voorkeur. Geen regel.</div>':""}
        ${d&&!n&&!i&&!s?'<div class="note">Regel. Geen afvinken.</div>':""}
      </div>
      ${t?`<div class="sec-hd">Bron</div>
      <div class="card quiet">
        <div class="src-tag">${u(t)}</div>
      </div>`:""}
      ${f?zi():Ri(e)}`}function zi(){return`
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
      </div>`}function Ri(e){return Ee(e)?e.later?`
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
      </div>`:""}function Gi(e){const t=ie(e);return`
      <div class="card quiet">
        ${De(e)}
        ${t?`<div class="note">${u(t)}</div>`:'<div class="note">Regel. Geen afvinken.</div>'}
      </div>`}function qi(e,t,n){const i=K(e),s=Y(e),a=i.logged||!!i.skip,r=s&&i.current!==null&&e.b!==null&&i.current>=e.b,d=a||r,f=s,y=yt(e),c=ie(e),g=f&&t.suggestedMilestone&&e.id===o.vector.id;return`
      <div class="card">
        ${De(e)}
        ${c&&!y&&!s?`<div class="note">${u(c)}</div>`:""}
        ${s?`<div class="track">
          <span class="now">${L(i.current??e.a??0)}</span>
          <span>→</span>
          <span class="mid">${L(e.milestone??0)}</span>
          <span>→</span>
          <span class="end">${L(e.b??0)}</span>
        </div>`:y?`<div class="work">${u(y)}</div>`:""}
        <div class="actions ${s?"":"actions-two"}">
          ${s?`<button class="btn ico-btn ${i.plus?"on":""}" data-act="plus" data-item="${e.id}" ${d?"disabled":""}>${h("plus")}<span>+1</span></button>`:""}
          <button class="btn ico-btn ${i.done?"track":""}" data-act="done" data-item="${e.id}" ${a?"disabled":""}>${h("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${i.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${i.logged?"disabled":""}>${h("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||i.skip?`<div class="chips">${ne.map(b=>`<button class="chip ${i.skip===b?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${b}">${b}</button>`).join("")}</div>`:""}
        ${Bt(e)}
        ${g?`<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${L(t.suggestedMilestone)}.</div>
               ${l.advanceWarn&&o.profile.identity_constraint?`<div class="banner">Check: ${u(o.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${L(t.suggestedMilestone)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`:`<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${t.suggestedMilestone}">Volgende etappe ${L(t.suggestedMilestone)}</button>
                      </div>`}`:""}
        ${f&&n?`<div class="note">${u(n)}</div>`:""}
      </div>`}function L(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function T(e){if(!l.busy){l.busy=!0,l.error=null;try{await e()}catch(t){l.error=t instanceof Error?t.message:"Er ging iets mis"}finally{l.busy=!1,w()}}}async function Pi(e){v=e,o=await v.load(),l.screen="vandaag",w()}async function Wi(){xi(),Hi(),await Pi(hi())}function Hi(){document.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const t=e.target;if(t instanceof HTMLInputElement){if(t.dataset.id==="theme-custom"){e.preventDefault(),zt();return}if(t.dataset.id==="item-label"||t.dataset.id==="item-timing"){e.preventDefault(),Ot();return}(t.dataset.id==="edit-label"||t.dataset.id==="edit-timing")&&(e.preventDefault(),Kt())}}),document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(cn(n)){l.screen=n,l.skipItemId=null,l.missKey=null,l.detailItemId=null,l.advanceWarn=!1,w();return}Vi(t)})}async function Vi(e){const t=e.dataset.act;if(!t||!v||!o)return;const n=jt(),i=$();if(t==="sleep-inc"||t==="sleep-dec"){const s=n.sleep??7,a=Math.max(0,Math.min(14,s+(t==="sleep-inc"?.5:-.5)));await H({date:i,kind:"body_sleep",value:a,skip_reason:null,item_id:null});return}if(t==="energy"){const s=Number(e.dataset.n),a=n.energy===s?null:s;if(a===null)return;await H({date:i,kind:"body_energy",value:a,skip_reason:null,item_id:null});return}if(t==="plus"){const s=o.items.find(r=>r.id===e.dataset.item);if(!s||!Y(s))return;const a=K(s);if(a.logged||a.skip||s.b!==null&&a.current!==null&&a.current>=s.b)return;await H({date:i,kind:"set",value:(a.current??s.a??0)+1,skip_reason:null,item_id:s.id});return}if(t==="done"){const s=o.items.find(r=>r.id===e.dataset.item);if(!s)return;const a=K(s);if(a.logged||a.skip)return;await H({date:i,kind:"done",value:a.current??s.a,skip_reason:null,item_id:s.id});return}if(t==="detail-open"){const s=e.dataset.item??null,a=s?o.items.find(r=>r.id===s):void 0;if(!a)return;Nt(a),l.detailItemId=a.id,w();return}if(t==="detail-close"){l.detailItemId=null,w();return}if(t==="skip-open"){const s=e.dataset.item??null;l.skipItemId=l.skipItemId===s?null:s,w();return}if(t==="skip"){const s=o.items.find(d=>d.id===e.dataset.item);if(!s||K(s).logged)return;const r=e.dataset.reason;if(!Ke(r))return;await H({date:i,kind:"skip",value:null,skip_reason:r,item_id:s.id}),l.skipItemId=null;return}if(t==="miss-open"){const s=e.dataset.item,a=e.dataset.date;if(!s||!a)return;const r=At(s,a);l.missKey=l.missKey===r?null:r,w();return}if(t==="miss"){const s=o.items.find(f=>f.id===e.dataset.item),a=e.dataset.date,r=e.dataset.reason;if(!s||!a||a>=i||!Ke(r))return;const d=K(s,a);if(d.logged||d.skip)return;await H({date:a,kind:"miss",value:null,skip_reason:r,item_id:s.id}),l.missKey=null;return}if(t==="advance"){if(!n.suggestedMilestone)return;if(Ht(o.profile.identity_constraint)&&!l.advanceWarn){l.advanceWarn=!0,w();return}await Ye(n.suggestedMilestone);return}if(t==="advance-go"){if(!n.suggestedMilestone)return;await Ye(n.suggestedMilestone);return}if(t==="advance-cancel"){l.advanceWarn=!1,w();return}if(t==="onboard-goal"){const s=e.dataset.goal;if(!s||!ii(s))return;const a={...o.profile,goals:ti(o.profile.goals??[],s)};await T(async()=>{await v.saveProfile(a),o.profile=a});return}if(t==="onboard-age"){const s=e.dataset.age;if(!s||!si(s))return;const a={...o.profile,age_band:s};await T(async()=>{await v.saveProfile(a),o.profile=a});return}if(t==="theme-toggle"){const s=e.dataset.theme;if(!s)return;await fe(li(M(o.profile.themes),s));return}if(t==="theme-add"){await zt();return}if(t==="onboard-start"){const s=e.dataset.item;if(!s)return;l.startIds=ni(l.startIds,s),w();return}if(t==="onboard-next"){w();return}if(t==="onboard-themes-done"){await fe(o.profile.themes??[],!0);return}if(t==="onboard-done"){const s=o.profile.age_band,a=o.profile.goals??[];if(!s||a.length===0||l.startIds.length===0)return;await T(async()=>{await v.saveOnboarding({goals:a,age_band:s,startIds:l.startIds}),o=await v.load(),l.screen="vandaag"});return}if(t==="later-now"||t==="later-park"){const s=e.dataset.item;if(!s)return;await T(async()=>{await v.setItemLater(s,t==="later-park"),o=await v.load()});return}if(t==="item-kind"){const s=e.dataset.kind;if(!Ge(s))return;Dt(),l.addKind=s,w();return}if(t==="item-add"){await Ot();return}if(t==="edit-kind"){const s=e.dataset.kind;if(!Ge(s))return;ue(),l.editKind=s,w();return}if(t==="item-save"){await Kt();return}if(t==="item-remove-ask"){ue(),l.removeAsk=!0,w();return}if(t==="item-remove-cancel"){l.removeAsk=!1,w();return}if(t==="item-remove"){const s=l.detailItemId;if(!s)return;await T(async()=>{await v.removeItem(s),o=await v.load(),l.detailItemId=null,l.removeAsk=!1,l.screen="profiel"});return}if(t==="save-ik"){const s={...o.profile,identity_anti:N(A("identity_anti"),E.identity_anti),identity_new:N(A("identity_new"),E.identity_new),identity_constraint:N(A("identity_constraint"),E.identity_constraint),horizon_1y:N(A("horizon_1y"),E.horizon_1y)};await T(async()=>{await v.saveProfile(s),o.profile=s});return}if(t==="export"){Gt(o);return}}function Dt(){l.addLabel=A("item-label")??l.addLabel,l.addTiming=A("item-timing")??l.addTiming}function ue(){l.editLabel=A("edit-label")??l.editLabel,l.editTiming=A("edit-timing")??l.editTiming}function Nt(e){l.editLabel=e.label,l.editKind=bt(e),l.editTiming=kt(e),l.removeAsk=!1}async function Kt(){!v||!o||!l.detailItemId||(ue(),await T(async()=>{const e=await v.updateItem({id:l.detailItemId,label:l.editLabel,kind:l.editKind,timing:l.editTiming});o=await v.load(),Nt(e),l.detailItemId=e.id}))}async function Ot(){!v||!o||(Dt(),await T(async()=>{await v.addItem({label:l.addLabel,kind:l.addKind,timing:l.addTiming}),o=await v.load(),l.addLabel="",l.addTiming=""}))}async function zt(){if(!o)return;const e=A("theme-custom")??"",t=M(o.profile.themes),n=di(t,e);n.length===t.length&&n.every((i,s)=>i===t[s])||await fe(n)}async function fe(e,t=!1){if(!v||!o)return;const n=M(e),i={...o.profile,themes:n},s=t||!St(o);await T(async()=>{if(s){await v.saveThemes(n),o=await v.load();return}await v.saveProfile(i),o.profile=i})}function A(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function Ye(e){await T(async()=>{o.stage=await v.advanceStage(o.stage,e),o.items=o.items.map(t=>t.id===o.stage.vector_id?{...t,milestone:e}:t),o.rotated=!0,l.advanceWarn=!1})}async function H(e){await T(async()=>{const t=await v.addEvent(e);o.events.push(t)})}Wi();
