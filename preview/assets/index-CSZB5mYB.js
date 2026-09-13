(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();function Et(e){return JSON.stringify({exported_at:new Date().toISOString(),profile:e.profile,items:e.items,stage:e.stage,events:e.events},null,2)}function Tt(e){const t=new Blob([Et(e)],{type:"application/json"}),n=URL.createObjectURL(t),i=document.createElement("a");i.href=n,i.download=`routine-${e.profile.id.slice(0,8)}.json`,i.click(),URL.revokeObjectURL(n)}const jt="geen zin",T={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140};function N(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function At(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===jt).length}function Bt(e,t){const n=N(e,T.identity_new);return!n||At(t)<2?null:n}function Mt(e){return!!N(e,T.identity_constraint)}function Ct(e,t){return t&&!N(e,T.horizon_1y)}function He(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const Ve=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],Fe=["zo","ma","di","wo","do","vr","za"];function _(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${i}`}function B(e,t){const n=W(e);return n.setDate(n.getDate()+t),_(n)}function W(e){const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)}function Dt(e){const t=W(e);return`${Fe[t.getDay()]} ${t.getDate()} ${Ve[t.getMonth()]}`}function V(e){const t=W(e);return`${t.getDate()} ${Ve[t.getMonth()]}`}function Nt(e){return Fe[W(e).getDay()]}function zt(e){const t=W(e).getDay();return t===0?7:t}function fe(e){const t=W(e),n=t.getDay(),i=n===0?-6:1-n;return t.setDate(t.getDate()+i),_(t)}function me(e,t){const n=[];let i=e;for(;i<=t;)n.push(i),i=B(i,1);return n}function O(){return crypto.randomUUID()}function Ot(){return new Date().toISOString()}const Kt=2,Rt=6;function X(e,t){return e.created_at.localeCompare(t.created_at)}function pe(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(X).at(-1)}function Ue(e,t){return t.filter(i=>i.kind==="set").sort(X).at(-1)?.value??e}function Gt(e,t){return pe(e,t,"body_sleep")?.value??null}function qt(e,t){return pe(e,t,"body_energy")?.value??null}function F(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip")).sort(X).at(-1)}function Ye(e,t){const n=F(e,t);return n?.kind==="skip"?n.skip_reason:null}function Je(e,t){return F(e,t)?.kind==="done"}function Ze(e,t){return F(e,t)?.kind==="set"}function Qe(e,t){const n=F(e,t);return n?.kind==="set"||n?.kind==="done"}function Pt(e,t){return e!==null&&e<Rt||t!==null&&t<=Kt}function Wt(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const i=Math.max(1,Math.ceil(n/2));return Math.min(t,e+i)}function Z(e,t,n,i){if(t<i)return"empty";const a=F(e,t);return a?.kind==="done"||a?.kind==="set"?"done":a?.kind==="skip"?"skip":pe(e,t,"miss")?"miss":t>=n?"empty":"miss"}function Ht(e,t,n="1970-01-01"){let i=0,a=t;for(let s=0;s<400;s+=1){const r=Z(e,a,t,n);if(r==="done")i+=1;else if(r==="skip"||r==="empty"&&a===t){a=B(a,-1);continue}else break;a=B(a,-1)}return i}function Vt(e,t,n){const i=fe(t),a=!n||n<i?i:n;let s=0,r=0;for(const d of me(a,t)){const f=Z(e,d,t,n??a);f==="skip"||f==="empty"||(r+=1,f==="done"&&(s+=1))}return{hits:s,eligible:r}}function Ft(e,t,n="1970-01-01",i=3){const a=Z(e,t,t,n);if(a==="done"||a==="skip")return!1;const s=B(t,-1);if(s<n)return!1;const r=B(t,-i),d=n>r?n:r;return me(d,s).some(f=>Z(e,f,t,n)==="miss")}function Ut(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled&&!e.todayLogged?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function Yt(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${Be(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${Be(e.milestone)}.`}function Be(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function Xe(e,t,n){return t.filter(a=>a.kind==="set"&&a.date<=n).sort(X).at(-1)?.value??e}function Jt(e,t,n,i){const a=Ue(e.a,n),s=Gt(n,i),r=qt(n,i),d=Je(n,i),f=Ze(n,i),g=Qe(n,i),c=Ye(n,i),v=Pt(s,r),b=a>=t.milestone,j=a>=e.b,D=Ft(n,i,t.started_on),G=fe(i),m=Xe(e.a,n,B(G,-1)),w=Ut({current:a,weekStartCurrent:m,gearDown:v,stalled:D,milestoneHit:b,todayLogged:f||d||!!c});return{current:a,sleep:s,energy:r,doneToday:d,plusToday:f,setLoggedToday:g,skipToday:c,gearDown:v,milestoneHit:b,atB:j,trend:w,hitrate:Vt(n,i,t.started_on),streak:Ht(n,i,t.started_on),nextAction:Yt({milestone:t.milestone,b:e.b,gearDown:v,milestoneHit:b,atB:j,stalled:D,doneToday:d,plusToday:f,skipToday:c}),suggestedMilestone:b&&!j&&!v?Wt(t.milestone,e.b):null}}const ee=["geen tijd","geen energie","vergeten","geen zin","pijn"];function Me(e){return!!(e&&ee.includes(e))}const Zt=["guideline","evidence-informed","public-framework","user preference","hypothesis"],Qt=["vandaag","koers","voortgang","profiel"];function Xt(e){return!!(e&&Qt.includes(e))}const y={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},et="routine_loop_v6",en=["routine_loop_v5","routine_loop_v4","routine_loop_v3"],Ce="routine_local_user_id",De="routine_local_tenant_id",tn="routine_local_chosen";function nn(e){return e.trim().toLowerCase().normalize("NFC")}function an(e){return!!(e&&Zt.includes(e))}function sn(e){const t=nn(e);return t==="cafeïne 90 min na opstaan"?"public-framework":t==="wandelen na eten"?"evidence-informed":t==="low carb"||t==="scherm uit 22:00"?"user preference":null}function ve(e){return sn(e.label)??(an(e.template)?e.template:null)}function rn(e){return ve(e)!==null}function Y(){return{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:null,condition:null}}function on(e){return{mode:e?.mode??null,clock:e?.clock??null,anchor:e?.anchor??null,offset_min:e?.offset_min??null,window_min:e?.window_min??null,frequency:e?.frequency??null,condition:e?.condition??null}}function ln(e,t){if(e.timing.frequency==="weekly"||e.type==="weekly"){const i=e.weekdays??[];return i.length===0?!1:i.includes(zt(t))}return!0}function te(e){return be(e)==="constraint"}function ge(e){return be(e)==="preference"}function tt(e){return!te(e)&&!ge(e)}function ne(e){const t=e.timing;return t.condition?t.condition:t.mode==="relative"&&t.anchor==="wake"&&t.offset_min!==null?`${t.offset_min} min na opstaan`:t.mode==="relative"&&t.anchor==="meal"?"na eten":t.mode==="clock"&&t.clock?t.clock:null}function dn(e){return e.trim().toLowerCase().normalize("NFC")}function be(e){if(e.role)return e.role;const t=dn(e.label);return t==="low carb"?"preference":t==="cafeïne 90 min na opstaan"||t==="scherm uit 22:00"?"constraint":null}const ye=["gedrag","regel","medicijn","supplement","sociaal"],ke={gedrag:"gedrag",regel:"leefregel",medicijn:"medicijn",supplement:"supplement",sociaal:"sociaal"},he={gedrag:"Gedrag",regel:"Regel",medicijn:"Medicijn",supplement:"Supplement",sociaal:"Sociaal"},$e=40,we=40;function Ne(e){return!!(e&&ye.includes(e))}function U(e){return e.a!==null&&e.b!==null&&e.milestone!==null}function cn(e,t){return ln(e,t)}function un(e,t){return{...e,tenant_id:e.tenant_id??t,weekdays:e.weekdays??null,times_per_week:e.times_per_week??null,timing:on(e.timing),role:be(e),template:ve(e),later:!!e.later,removed:!!e.removed}}function _e(e){return e.type==="medicijn"||e.type==="supplement"}function nt(e){return e.type==="sociaal"}function it(e,t){return H(e,t).filter(n=>tt(n)&&!_e(n)&&!nt(n)&&!n.later)}function fn(e,t){return H(e,t).filter(n=>ge(n)&&!n.later)}function mn(e,t){return H(e,t).filter(te)}function at(e,t){return H(e,t).filter(n=>_e(n)&&!n.later)}function st(e,t){return H(e,t).filter(n=>nt(n)&&!n.later)}function pn(e,t){return H(e,t).filter(n=>n.later&&tt(n))}function H(e,t){return e.filter(n=>!n.removed&&cn(n,t)).sort((n,i)=>n.sort-i.sort)}function ie(e){return e.find(U)}function oe(e){return e.kind==="body_sleep"||e.kind==="body_energy"||e.kind==="body_weight"}function ae(e,t,n){return e.filter(i=>oe(i)?!1:!!(i.item_id===t.id||i.item_id===null&&n&&t.id===n))}function vn(e,t){return t?[...e.filter(oe),...ae(e,t,t.id)]:e.filter(oe)}function rt(e){return e.a===null?null:e.unit==="sec"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} s`:e.unit==="reps"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} reps`:String(e.a)}function S(e){return e.trim().toLowerCase()}function K(e){const t=e.trim().replace(/\s+/g," ").slice(0,$e);return t.length>0?t:null}function xe(e){const t=e.trim().replace(/\s+/g," ").slice(0,we);if(!t)return Y();const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(n){const i=Number(n[1]),a=Number(n[2]);if(i<=23&&a<=59)return{...Y(),mode:"clock",clock:`${String(i).padStart(2,"0")}:${n[2]}`,frequency:"daily"}}return{...Y(),frequency:"daily",condition:t}}function gn(e){return e.reduce((t,n)=>Math.max(t,n.sort),-1)+1}const bn=["Push-ups","Squats","Plank","Dead hang","Gerichte kracht","Koud douchen","Niet snoepen","Low carb","Intermittent fasting","Geen alcohol","Cafeïne 90 min na opstaan","Wandelen na eten","Medicijn ochtend","Vitamine D","Bellen met iemand","Iemand zien","Scherm uit 22:00"];function se(e){const t=S(e);return bn.some(n=>S(n)===t)}function Se(e){return se(e.label)}function M(e){return!Se(e)}function R(e){return!!e.removed}function yn(e){return e.filter(t=>M(t)&&!R(t)).sort((t,n)=>t.sort-n.sort)}function ot(e){return e.type==="leefregel"?"regel":e.type==="medicijn"?"medicijn":e.type==="supplement"?"supplement":e.type==="sociaal"?"sociaal":"gedrag"}function lt(e){return e.timing.mode==="clock"&&e.timing.clock?e.timing.clock:e.timing.condition??""}function kn(e,t){const n=K(t);return n?!e.some(i=>!R(i)&&S(i.label)===S(n)):!1}function hn(e,t,n){const i=K(n);return!i||se(i)?!1:!e.some(a=>a.id!==t&&!R(a)&&S(a.label)===S(i))}function $n(e,t){const n=K(t);if(n)return e.find(i=>R(i)&&M(i)&&S(i.label)===S(n))}function wn(e){const t=K(e.label);return t?{id:O(),tenant_id:e.tenantId,type:ke[e.kind],label:t,unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:e.sort,timing:xe(e.timing??""),role:"action",template:"user preference",later:!!e.later,removed:!1}:null}function _n(e,t){if(!M(e)||R(e))return null;const n=K(t.label);return!n||se(n)?null:{...e,type:ke[t.kind],label:n,timing:xe(t.timing??""),template:"user preference"}}function xn(e,t){if(!M(e)||!R(e))return null;const n=K(t.label);return!n||se(n)?null:{...e,type:ke[t.kind],label:n,timing:xe(t.timing??""),template:"user preference",later:!1,removed:!1}}function Sn(e){return R(e)?{item:e,mode:"removed"}:M(e)?{item:{...e,removed:!0},mode:"removed"}:Se(e)?{item:{...e,later:!0},mode:"parked"}:null}function In(e){const t=new Set,n=[];for(const i of e){const a=S(i.label);t.has(a)||(t.add(a),n.push(i))}return n}function dt(e,t,n){const i=In(e),a=new Set(i.map(r=>S(r.label))),s=t.filter(r=>!a.has(S(r.label))).map(r=>({...r,tenant_id:n}));return[...i,...s]}function Ln(e){const t=new Map;for(const n of e)for(const i of n)t.has(i.id)||t.set(i.id,i);return[...t.values()].sort((n,i)=>n.created_at.localeCompare(i.created_at))}function En(e){return e?!!(e.identity_anti||e.identity_new||e.identity_constraint||e.horizon_1y||e.display_name):!1}function Tn(e,t,n,i){if(e.length===0)return null;const a=e.reduce((c,v)=>(v.events?.length??0)>(c.events?.length??0)?v:c),s=e.find(c=>En(c.profile))?.profile??a.profile,r=dt([a,...e.filter(c=>c!==a)].flatMap(c=>c.items??[]),t,i),d=new Map(r.map(c=>[S(c.label),c.id])),f=new Map;for(const c of e)for(const v of c.items??[]){const b=d.get(S(v.label));b&&v.id!==b&&f.set(v.id,b)}const g=Ln(e.map(c=>c.events??[])).map(c=>{if(!c.item_id)return c;const v=f.get(c.item_id);return v?{...c,item_id:v}:c});return{...a,profile:{...s,id:s.id||n,tenant_id:s.tenant_id||i},items:r,events:g}}function jn(e,t,n,i){return ae(e,t,n).some(a=>(a.kind==="set"||a.kind==="done"||a.kind==="skip"||a.kind==="miss")&&a.date<i)}function ct(e,t){return e.created_at.localeCompare(t.created_at)}function An(e,t,n){return e.filter(i=>i.date===t&&i.kind===n).sort(ct).at(-1)}function Bn(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip"||n.kind==="miss")).sort(ct).at(-1)}function le(e,t){return[...it(e,t),...at(e,t),...st(e,t)]}function de(e,t,n,i,a){const s=ae(e,t,a),r=Bn(s,n);if(r?.kind==="set"||r?.kind==="done")return{item:t,date:n,mark:"hit",reason:null};if(r?.kind==="skip")return{item:t,date:n,mark:"skip",reason:r.skip_reason};const d=r?.kind==="miss"?r:An(s,n,"miss");return d?{item:t,date:n,mark:"miss",reason:d.skip_reason}:n>=i?{item:t,date:n,mark:"open",reason:null}:{item:t,date:n,mark:"idle",reason:null}}function ut(e,t,n,i){const a=B(n,-1);return le(e,a).filter(s=>jn(t,s,i,a)).map(s=>{const r=de(t,s,a,n,i);return r.mark==="hit"||r.mark==="skip"||r.mark==="miss"?r:{...r,mark:"miss",reason:null}}).filter(s=>s.mark==="miss"&&!s.reason)}function Mn(e,t,n){return e.some(i=>i.mark==="hit")?"hit":e.some(i=>i.mark==="miss")?"miss":e.some(i=>i.mark==="skip")?"skip":t===n?"open":"idle"}function ft(e,t,n,i){const a=fe(n),s=B(a,6),r=ut(e,t,n,i),d=new Set(r.map(m=>`${m.item.id}:${m.date}`)),f=me(a,s).map(m=>{const k=le(e,m).map(w=>{const re=de(t,w,m,n,i);return d.has(`${w.id}:${m}`)?{...re,mark:"miss",reason:re.reason}:re});return{date:m,label:Nt(m),mark:Mn(k,m,n),hits:k.filter(w=>w.mark==="hit").length,misses:k.filter(w=>w.mark==="miss").length,skips:k.filter(w=>w.mark==="skip").length}}),g=f.filter(m=>m.date<n),c=g.reduce((m,k)=>m+k.hits,0),v=g.reduce((m,k)=>m+k.misses,0),b=g.reduce((m,k)=>m+k.skips,0),j=g.flatMap(m=>le(e,m.date).map(k=>{const w=de(t,k,m.date,n,i);return d.has(`${k.id}:${m.date}`)?{...w,mark:"miss",reason:w.reason}:w}).filter(k=>k.mark==="miss")),D=g.filter(m=>m.mark!=="idle").length,G=c>0&&v===0&&D>=2?"Week staat.":null;return{start:a,end:s,range:`${V(a)} – ${V(s)}`,days:f,hits:c,misses:v,skips:b,missRows:j,note:G}}function J(e){return ie(e)?.id}const Q=3,Ie=[{id:"kracht",label:"Kracht"},{id:"eten",label:"Eten & drinken"},{id:"slaap",label:"Slaap"},{id:"stofjes",label:"Stofjes"},{id:"bewegen",label:"Bewegen"}],Le=["18–29","30–39","40–49","50–59","60+"],Cn={kracht:["Push-ups","Squats","Plank","Dead hang"],eten:["Niet snoepen","Low carb","Intermittent fasting","Geen alcohol"],slaap:["Koud douchen"],stofjes:["Medicijn ochtend","Vitamine D"],bewegen:["Wandelen na eten"]};function Ee(e){return te(e)||e.type==="weekly"?!1:e.type==="daily"||e.type==="leefregel"||e.type==="gedrag"||e.type==="sociaal"||_e(e)}function Dn(e){return e.filter(t=>Ee(t)&&!t.removed).sort((t,n)=>t.sort-n.sort)}function mt(e){return!(e.onboarded!==!1||(e.events??[]).length>0)}function Nn(e){return mt(e)?e.profile.goals?.length?e.profile.age_band?e.theme_step!==!0?"themes":"start":"age":"goals":null}function zn(e,t){const n=e.filter(Ee).sort((s,r)=>s.sort-r.sort);if(t.length===0)return n;const i=new Set(t.flatMap(s=>Cn[s]??[])),a=n.filter(s=>i.has(s.label));return a.length>0?a:n}function On(e,t){const n=new Set(t.slice(0,Q));return e.map(i=>Ee(i)?{...i,later:!n.has(i.id)}:{...i,later:!1})}function Kn(e,t){return e.includes(t)?e.filter(n=>n!==t):[...e,t]}function Rn(e,t){return e.includes(t)?e.filter(n=>n!==t):e.length>=Q?e:[...e,t]}function Gn(e){return Ie.some(t=>t.id===e)}function qn(e){return Le.includes(e)}function Pn(e,t,n,i,a){const s=ft(e,t,n,a??J(e)),r=s.days.map(d=>({date:d.date,label:d.label,current:Xe(i,t,d.date<=n?d.date:n),mark:d.mark}));return{week:s,line:r,hits:s.hits,skips:s.skips,misses:s.misses}}function Wn(e,t,n,i=18,a=16){if(e.length===0)return[];const s=Math.min(...e),d=Math.max(...e)-s,f=t-i*2,g=n-a*2;return e.map((c,v)=>{const b=e.length===1?t/2:i+v/(e.length-1)*f,j=d===0?n/2:a+(1-(c-s)/d)*g;return{x:b,y:j}})}function Hn(e){return e.map(t=>`${t.x.toFixed(1)},${t.y.toFixed(1)}`).join(" ")}const ze=["Military calisthenics","Kickbox","Spinnen"],pt=40;function Te(e){const t=e.trim().replace(/\s+/g," ").slice(0,pt);return t.length>0?t:null}function C(e){if(!Array.isArray(e))return[];const t=new Set,n=[];for(const i of e){if(typeof i!="string")continue;const a=Te(i);if(!a)continue;const s=a.toLowerCase();t.has(s)||(t.add(s),n.push(a))}return n}function Vn(e,t){const n=Te(t);if(!n)return e;const i=n.toLowerCase();return e.some(a=>a.toLowerCase()===i)?e.filter(a=>a.toLowerCase()!==i):[...e,n]}function Fn(e,t){const n=Te(t);if(!n)return e;const i=n.toLowerCase();return e.some(a=>a.toLowerCase()===i)?e:[...e,n]}function Un(e){const n=C(e).filter(i=>!ze.some(a=>a.toLowerCase()===i.toLowerCase()));return[...ze,...n]}function Oe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function vt(e){const t=new Set(C(e).map(i=>i.toLowerCase()));return`<div class="chips">${Un(e).map(i=>`<button class="chip pick ${t.has(i.toLowerCase())?"on":""}" data-act="theme-toggle" data-theme="${Oe(i)}">${Oe(i)}</button>`).join("")}</div>
        <div class="theme-add">
          <input data-id="theme-custom" type="text" maxlength="${pt}" placeholder="Eigen thema" autocomplete="off" enterkeyhint="done" />
          <button class="btn ghost" data-act="theme-add">Voeg toe</button>
        </div>`}function Yn(e){return e.skip?null:e.plus?{text:"Set gedaan.",tone:"fog"}:e.done?e.type==="medicijn"?{text:"Genomen.",tone:"sage"}:e.track?{text:"Set staat.",tone:"sage"}:{text:"Staat.",tone:"sage"}:null}function gt(e,t){return{id:e,tenant_id:t,display_name:null,...He(),age_band:null,goals:[],themes:[]}}function bt(e,t,n=_()){return{id:O(),tenant_id:t,vector_id:e,milestone:y.milestone,started_on:n,deadline:B(n,y.windowDays),status:"active",stage_type:y.stageType}}function je(e){const t=n=>({id:O(),tenant_id:e,timing:Y(),role:null,template:null,later:!1,...n});return[t({type:"daily",label:"Push-ups",unit:"reps",a:y.a,b:y.b,milestone:y.milestone,weekdays:null,times_per_week:null,sort:0}),t({type:"daily",label:"Squats",unit:"reps",a:30,b:null,milestone:null,weekdays:null,times_per_week:null,sort:1}),t({type:"daily",label:"Plank",unit:"sec",a:60,b:null,milestone:null,weekdays:null,times_per_week:null,sort:2}),t({type:"daily",label:"Dead hang",unit:"sec",a:45,b:null,milestone:null,weekdays:null,times_per_week:null,sort:3}),t({type:"weekly",label:"Gerichte kracht",unit:null,a:null,b:null,milestone:null,weekdays:[],times_per_week:2,sort:4}),t({type:"leefregel",label:"Koud douchen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:5}),t({type:"leefregel",label:"Niet snoepen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:6}),t({type:"leefregel",label:"Low carb",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:7,role:"preference",template:"user preference"}),t({type:"leefregel",label:"Intermittent fasting",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:8}),t({type:"leefregel",label:"Geen alcohol",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:9}),t({type:"gedrag",label:"Cafeïne 90 min na opstaan",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:10,role:"constraint",template:"public-framework",timing:{mode:"relative",clock:null,anchor:"wake",offset_min:90,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Wandelen na eten",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:11,role:"action",template:"evidence-informed",timing:{mode:"relative",clock:null,anchor:"meal",offset_min:0,window_min:null,frequency:"daily",condition:"na eten"}}),t({type:"medicijn",label:"Medicijn ochtend",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:12,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"ochtend"}}),t({type:"supplement",label:"Vitamine D",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:13,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Bellen met iemand",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:14,role:"action",template:null,timing:{mode:"clock",clock:"18:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Iemand zien",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:1,sort:15,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"deze week"}}),t({type:"gedrag",label:"Scherm uit 22:00",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:16,role:"constraint",template:"user preference",timing:{mode:"clock",clock:"22:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}})]}function Jn(e,t){return{id:e.id,tenant_id:e.tenant_id,user_id:t,domain:y.domain,a:e.a??y.a,b:e.b??y.b,unit:e.unit==="sec"?"sec":"reps",pace_constraint:null}}function Zn(e,t=_(),n=O()){const i=gt(e,n),a=je(n),s=ie(a)??a[0],r=Jn(s,e),d=bt(r.id,n,t);return s.milestone!==null&&(d.milestone=s.milestone),{profile:i,items:a,vector:r,stage:d,events:[],rotated:!1,onboarded:!1,theme_step:!1}}function Qn(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,items:e.items.map(n=>U(n)?{...n,a:y.a,b:y.b,milestone:y.milestone,unit:y.unit}:n),vector:{...e.vector,a:y.a,b:y.b,unit:y.unit},stage:{...e.stage,milestone:y.milestone},events:e.events}:e}function Xn(){const e=localStorage.getItem(Ce);if(e)return e;const t=O();return localStorage.setItem(Ce,t),t}function ei(){const e=localStorage.getItem(De);if(e)return e;const t=O();return localStorage.setItem(De,t),t}function x(e){localStorage.setItem(et,JSON.stringify(e))}function ti(e){if(!e)return null;try{const t=JSON.parse(e);return!t||typeof t!="object"?null:t}catch{return null}}function ni(){return[et,...en].map(e=>ti(localStorage.getItem(e))).filter(e=>e!==null)}function ii(e,t,n){const i=dt(e.items??[],je(n),n).map(a=>un(a,n));return{...e,profile:{...gt(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...He(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null,age_band:e.profile?.age_band??null,goals:Array.isArray(e.profile?.goals)?e.profile.goals:[],themes:C(e.profile?.themes)},items:i,vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(a=>({...a,tenant_id:a.tenant_id??n,item_id:a.item_id??null})),rotated:!!e.rotated,onboarded:e.onboarded??!0,theme_step:e.theme_step??!1}}function I(e,t){const n=ni();if(n.length===0){const s=Zn(e,_(),t);return x(s),s}const i=Tn(n,je(t),e,t)??n[0],a=Qn(ii(i,e,t));return x(a),a}function ai(){localStorage.setItem(tn,"1");const e=Xn(),t=ei();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return I(e,t)},async addEvent(n){const i=I(e,t),a={id:n.id??O(),tenant_id:t,user_id:e,item_id:n.item_id??null,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:Ot()};return i.events.push(a),x(i),a},async saveProfile(n){const i=I(e,t);i.profile=n,x(i)},async saveOnboarding(n){const i=I(e,t);i.profile={...i.profile,goals:n.goals,age_band:n.age_band,themes:C(i.profile.themes)},i.items=On(i.items,n.startIds),i.onboarded=!0,i.theme_step=!0,x(i)},async saveThemes(n){const i=I(e,t);i.profile={...i.profile,themes:C(n)},i.theme_step=!0,x(i)},async setItemLater(n,i){const a=I(e,t);a.items=a.items.map(s=>s.id===n?{...s,later:i}:s),x(a)},async addItem(n){const i=I(e,t),a=$n(i.items,n.label);if(a){const r=xn(a,{label:n.label,kind:n.kind,timing:n.timing});if(!r)throw new Error("naam ontbreekt");return i.items=i.items.map(d=>d.id===r.id?r:d),x(i),r}const s=wn({tenantId:t,label:n.label,kind:n.kind,timing:n.timing,sort:gn(i.items)});if(!s)throw new Error("naam ontbreekt");if(!kn(i.items,s.label))throw new Error("item bestaat al");return i.items=[...i.items,s],x(i),s},async updateItem(n){const i=I(e,t),a=i.items.find(r=>r.id===n.id);if(!a)throw new Error("item ontbreekt");if(!K(n.label))throw new Error("naam ontbreekt");if(!hn(i.items,a.id,n.label))throw new Error("item bestaat al");const s=_n(a,n);if(!s)throw new Error("alleen eigen item");return i.items=i.items.map(r=>r.id===s.id?s:r),x(i),s},async removeItem(n){const i=I(e,t),a=i.items.find(r=>r.id===n);if(!a)throw new Error("item ontbreekt");const s=Sn(a);if(!s)throw new Error("item blijft");return i.items=i.items.map(r=>r.id===s.item.id?s.item:r),x(i),s.item},async saveVectorConstraint(n,i){const a=I(e,t);a.vector.id===n&&(a.vector.pace_constraint=i,x(a))},async advanceStage(n,i){const a=I(e,t),s=bt(n.vector_id,t);return s.milestone=i,a.stage=s,a.items=a.items.map(r=>r.id===n.vector_id?{...r,milestone:i}:r),a.rotated=!0,x(a),s},async signOut(){}}}const Ke="#F0ECE4",si="#3D6B5A";function yt(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${Ke}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${Ke}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${si}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function h(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function ri(e){return e==="stokt"||e==="herstel"?"ember":e==="stijgt"?"sage":"fog"}function Re(e){const t=ri(e);return e==="stokt"||e==="herstel"||e==="zakt"?h("status-kink",`ico-${t}`):e==="stijgt"?h("status-up",`ico-${t}`):h("status-flat",`ico-${t}`)}function oi(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${h(n?"dot-now":"dot")}</button>`}).join("")}const li=`
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
</svg>`;function di(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",li)}const q=()=>document.querySelector("#app"),o={screen:"vandaag",skipItemId:null,missKey:null,detailItemId:null,advanceWarn:!1,busy:!1,error:null,startIds:[],addKind:"gedrag",addLabel:"",addTiming:"",editKind:"gedrag",editLabel:"",editTiming:"",removeAsk:!1};let p=null,l=null;function kt(){if(!l)throw new Error("geen snapshot");const e=ie(l.items);return Jt(l.vector,l.stage,vn(l.events,e),_())}function z(e,t=_()){if(!l)throw new Error("geen snapshot");const n=ie(l.items),i=ae(l.events,e,n?.id),a=e.a===null?null:Ue(e.a,i);return{done:Je(i,t),plus:Ze(i,t),skip:Ye(i,t),logged:Qe(i,t),current:a}}function ht(e,t){return`${e}:${t}`}function u(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function $(){if(!l||!p)return;const e=Nn(l);if(e){q().innerHTML=ki(e);return}const t=kt(),{vector:n,stage:i}=l,a=p.mode==="local"?"Lokaal":"Supabase",s=`
    <div class="hdr">
      <div>
        ${yt()}
        <div class="date-s">${Dt(_())}</div>
      </div>
      <div class="mode-pill">${a}</div>
    </div>`,r=`
    <nav class="nav nav-4">
      <button data-nav="vandaag" class="${o.screen==="vandaag"?"active":""}">${h("day")}Vandaag</button>
      <button data-nav="koers" class="${o.screen==="koers"?"active":""}">${h("mark")}Koers</button>
      <button data-nav="voortgang" class="${o.screen==="voortgang"?"active":""}">${h("line")}Voortgang</button>
      <button data-nav="profiel" class="${o.screen==="profiel"?"active":""}">${h("me")}Profiel</button>
    </nav>`;if(o.detailItemId){const d=l.items.find(f=>f.id===o.detailItemId);if(d){q().innerHTML=`
      ${s}
      ${$i(d)}
      ${o.error?`<p class="error" style="padding:0 18px">${u(o.error)}</p>`:""}
      ${r}`;return}o.detailItemId=null}if(o.screen==="vandaag"){const d=Bt(l.profile.identity_new,l.events),f=_(),g=it(l.items,f),c=mn(l.items,f),v=at(l.items,f),b=st(l.items,f),j=pn(l.items,f),D=fn(l.items,f),G=ut(l.items,l.events,f,J(l.items));q().innerHTML=`
      ${s}
      ${p.mode==="local"?'<div class="banner">Lokaal — geen Supabase. +1 / Done / Skip blijven op dit apparaat.</div>':""}
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
          <div class="dots">${oi(t.energy)}</div>
        </div>
      </div>
      ${D.length?`<div class="sec-hd">Dag</div>
      <div class="card quiet">
        <div class="day-tags">${D.map(m=>hi(m)).join("")}</div>
      </div>`:""}
      ${c.length?`<div class="sec-hd">Regel</div>${c.map(m=>xi(m)).join("")}`:""}
      ${v.length?`<div class="sec-hd">Stofjes</div>${v.map(m=>Ge(m)).join("")}`:""}
      ${b.length?`<div class="sec-hd">Sociaal</div>${b.map(m=>Ge(m)).join("")}`:""}
      ${G.length?`<div class="sec-hd">Niet gedaan</div>
      <div class="card">
        <div class="note" style="margin-top:0">Geen +1, Done of Skip. Korte reden.</div>
        ${G.map(m=>wt(m)).join("")}
      </div>`:""}
      <div class="sec-hd">Vandaag</div>
      ${g.map(m=>Si(m,t,d)).join("")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Niet in je start. Blijft bewaard.</div>
        ${j.map(m=>mi(m)).join("")}
        <button class="btn ghost later-add" data-nav="profiel">Eigen item</button>
      </div>
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${Re(t.trend.word)}
          <div class="word">${t.trend.word}</div>
        </div>
      </div>
      ${o.error?`<p class="error" style="padding:0 18px">${u(o.error)}</p>`:""}
      ${r}`;return}if(o.screen==="koers"){q().innerHTML=`
      ${s}
      ${Pe(l.profile.themes,"Tik een suggestie of typ zelf. Geen vaste lijst. Later aan te passen.")}
      ${qe(ft(l.items,l.events,_(),J(l.items)))}
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
            <div class="val" style="font-size:1.15rem">${V(i.started_on)} → ${i.deadline?V(i.deadline):"—"}</div>
          </div>
          <div>
            <div class="lbl">Trend</div>
            <div class="val status">${Re(t.trend.word)} ${t.trend.word}</div>
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
      ${Ct(l.profile.horizon_1y,l.rotated)?'<div class="banner">Zet een 1-jaars B. Etappes roteren.</div>':""}
      <div class="sec-hd">${h("ik")} Ik</div>
      <div class="card">
        <div class="field">
          <div class="lbl">Leven dat ik weiger</div>
          <textarea data-id="identity_anti" maxlength="${T.identity_anti}">${u(l.profile.identity_anti??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wie ik word</div>
          <textarea data-id="identity_new" maxlength="${T.identity_new}">${u(l.profile.identity_new??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wat B niet mag schenden</div>
          <textarea data-id="identity_constraint" maxlength="${T.identity_constraint}">${u(l.profile.identity_constraint??"")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">1-jaars B</div>
          <textarea data-id="horizon_1y" maxlength="${T.horizon_1y}">${u(l.profile.horizon_1y??"")}</textarea>
        </div>
        <button class="btn primary" data-act="save-ik">Bewaar</button>
      </div>
      <div class="card stack">
        <button class="btn ghost ico-btn" data-act="export">${h("export")}<span>Exporteer JSON</span></button>
      </div>
      ${o.error?`<p class="error" style="padding:0 18px">${u(o.error)}</p>`:""}
      ${r}`;return}if(o.screen==="voortgang"){const d=Pn(l.items,l.events,_(),l.vector.a,J(l.items));q().innerHTML=`
      ${s}
      ${qe(d.week)}
      <div class="sec-hd">Lijn</div>
      <div class="card">
        <div class="note" style="margin-top:0">Huidige deze week. Geen score.</div>
        ${yi(d.line.map(f=>f.current),_(),d.line)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Nu</div><div class="val">${L(t.current)}</div></div>
          <div><div class="lbl">Gedaan</div><div class="val">${d.hits}</div></div>
        </div>
      </div>
      ${o.error?`<p class="error" style="padding:0 18px">${u(o.error)}</p>`:""}
      ${r}`;return}if(o.screen==="profiel"){const d=l.profile.goals??[],f=l.profile.age_band,g=Dn(l.items);q().innerHTML=`
      ${s}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="note" style="margin-top:0">Later aan te passen. Geen wipe.</div>
        <div class="chips">${Ie.map(c=>`<button class="chip pick ${d.includes(c.id)?"on":""}" data-act="onboard-goal" data-goal="${c.id}">${c.label}</button>`).join("")}</div>
      </div>
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="note" style="margin-top:0">Alleen een band. Geen geboortedatum.</div>
        <div class="chips">${Le.map(c=>`<button class="chip pick ${f===c?"on":""}" data-act="onboard-age" data-age="${c}">${c}</button>`).join("")}</div>
      </div>
      ${Pe(l.profile.themes,"Tik een suggestie of typ zelf. Later aan te passen.")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Parkeren of terughalen. Events blijven.</div>
        ${g.map(c=>pi(c)).join("")}
      </div>
      ${gi(l.items)}
      ${bi()}
      ${o.error?`<p class="error" style="padding:0 18px">${u(o.error)}</p>`:""}
      ${r}`;return}}function $t(e){const t=z(e),n=Yn({plus:t.plus,done:t.done,skip:t.skip,type:e.type,track:U(e)});return n?`<div class="confirm ${n.tone}" role="status">${u(n.text)}</div>`:""}function Ge(e){const t=z(e),n=t.logged||!!t.skip,i=e.type==="medicijn"?"Genomen":"Done",a=ne(e);return`
      <div class="card stof">
        ${Ae(e)}
        ${a?`<div class="note">${u(a)}</div>`:""}
        <div class="actions actions-two">
          <button class="btn ico-btn ${t.done?"track":""}" data-act="done" data-item="${e.id}" ${n?"disabled":""}>${h("done")}<span>${i}</span></button>
          <button class="btn ico-btn skip ${t.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${t.logged?"disabled":""}>${h("skip")}<span>Skip</span></button>
        </div>
        ${o.skipItemId===e.id||t.skip?`<div class="chips">${ee.map(s=>`<button class="chip ${t.skip===s?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${s}">${s}</button>`).join("")}</div>`:""}
        ${$t(e)}
      </div>`}function ci(e,t,n,i){return`<div class="chips">${ee.map(a=>`<button class="chip ${n===a?"on":""}" data-act="${i}" data-item="${e}" data-date="${t}" data-reason="${a}">${a}</button>`).join("")}</div>`}function wt(e){const t=o.missKey===ht(e.item.id,e.date)||!!e.reason;return`
      <div class="miss-row">
        <button class="miss-item" data-act="miss-open" data-item="${e.item.id}" data-date="${e.date}">
          <span class="ex-nm">${u(e.item.label)}</span>
          <span class="note">${e.reason?u(e.reason):V(e.date)}</span>
        </button>
        ${t?ci(e.item.id,e.date,e.reason,"miss"):""}
      </div>`}function ui(e){const t=[];return e.hits&&t.push(`${e.hits} gedaan`),e.skips&&t.push(`${e.skips} overgeslagen`),e.misses&&t.push(`${e.misses} niet gedaan`),t.length===0?"Nog geen dagen deze week.":t.join(" · ")}function fi(e){return e==="skip"?"–":e==="miss"?"×":"·"}function qe(e){return`
      <div class="sec-hd">Week</div>
      <div class="card">
        <div class="note" style="margin-top:0">${u(e.range)}</div>
        <div class="week-strip" aria-label="Weekoverzicht">
          ${e.days.map(t=>`<div class="week-day ${t.mark}${t.date===_()?" today":""}">
            <span class="week-lbl">${t.label}</span>
            <span class="week-mark">${fi(t.mark)}</span>
          </div>`).join("")}
        </div>
        <div class="note">${u(ui(e))}</div>
        ${e.note?`<div class="week-note">${u(e.note)}</div>`:""}
        ${e.missRows.length?e.missRows.map(t=>wt(t)).join(""):""}
      </div>`}function mi(e){return`
      <div class="later-row">
        ${M(e)?`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>`:`<div class="ex-nm">${u(e.label)}</div>`}
        <button class="btn ghost later-now" data-act="later-now" data-item="${e.id}">Nu</button>
      </div>`}function pi(e){const t=e.later;return`
      <div class="later-row">
        <div>
          ${M(e)?`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>`:`<div class="ex-nm">${u(e.label)}</div>`}
          <div class="note" style="margin-top:4px">${t?"Later":"Nu"}</div>
        </div>
        <button class="btn ghost later-now" data-act="${t?"later-now":"later-park"}" data-item="${e.id}">${t?"Nu":"Later"}</button>
      </div>`}function vi(e){const t=he[ot(e)],n=lt(e);return`
      <div class="later-row">
        <div>
          <button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>
          <div class="note" style="margin-top:4px">${u(t)}${n?` · ${u(n)}`:""}</div>
        </div>
        <button class="btn ghost later-now" data-act="detail-open" data-item="${e.id}">Wijzig</button>
      </div>`}function gi(e){const t=yn(e);return t.length===0?"":`
      <div class="sec-hd">Eigen items</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Label, type of tijd. Weg haalt het uit Vandaag. Log blijft.</div>
        ${t.map(n=>vi(n)).join("")}
      </div>`}function bi(){return`
      <div class="sec-hd">Eigen item</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Label, type, optioneel tijdstip. Geen dosis. Bestaande items blijven.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="item-label" type="text" maxlength="${$e}" placeholder="Bijv. Avondwandeling" autocomplete="off" enterkeyhint="done" value="${u(o.addLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${ye.map(e=>`<button class="chip pick ${o.addKind===e?"on":""}" data-act="item-kind" data-kind="${e}">${he[e]}</button>`).join("")}</div>
        <div class="field" style="margin-top:12px">
          <div class="lbl">Tijd</div>
          <input data-id="item-timing" type="text" maxlength="${we}" placeholder="22:00 of ochtend" autocomplete="off" enterkeyhint="done" value="${u(o.addTiming)}" />
        </div>
        <div class="stack">
          <button class="btn primary" data-act="item-add">Voeg toe</button>
        </div>
      </div>`}function yi(e,t,n){const s=Wn(e,294,72);if(s.length===0)return'<div class="note">Nog geen lijn.</div>';const r=s.map((d,f)=>{const g=n[f]?.date===t;return`<circle class="${n[f]?.mark==="miss"?"prog-dot miss":g?"prog-dot now":"prog-dot"}" cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${g?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${Hn(s)}" />
          ${r}
        </svg>`}function Pe(e,t){return`
      <section class="theme-sec" data-sec="themes">
        <div class="sec-hd">Thema's</div>
        <div class="card">
          <div class="ex-nm">Trainingsrichting</div>
          <div class="note">${u(t)}</div>
          ${vt(e)}
        </div>
      </section>`}function ki(e){if(!l)return"";const t=l.profile.goals??[],n=l.profile.age_band,i=zn(l.items,t),a=o.startIds,s=`
    <div class="hdr">
      <div>
        ${yt()}
        <div class="date-s">Start</div>
      </div>
    </div>`;if(e==="goals")return`
      ${s}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="ex-nm">Wat is je richting?</div>
        <div class="note">Eerst doelen. Types (gedrag, regel, medicijn, supplement, sociaal) komen daarna.</div>
        <div class="chips">${Ie.map(r=>`<button class="chip pick ${t.includes(r.id)?"on":""}" data-act="onboard-goal" data-goal="${r.id}">${r.label}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${t.length===0?"disabled":""}>Verder</button>
        </div>
      </div>`;if(e==="age")return`
      ${s}
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="ex-nm">Kies een band</div>
        <div class="note">Geen geboortedatum. Alleen een band.</div>
        <div class="chips">${Le.map(r=>`<button class="chip pick ${n===r?"on":""}" data-act="onboard-age" data-age="${r}">${r}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${n?"":"disabled"}>Verder</button>
        </div>
      </div>`;if(e==="themes"){const r=l.profile.themes??[];return`
      ${s}
      <div class="sec-hd">Thema's</div>
      <div class="card">
        <div class="ex-nm">Trainingsrichting</div>
        <div class="note">Tik een suggestie of typ zelf. Mag leeg. Later aan te passen.</div>
        ${vt(r)}
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-themes-done">Verder</button>
        </div>
      </div>`}return`
    ${s}
    <div class="sec-hd">Start</div>
    <div class="card">
      <div class="ex-nm">Max ${Q} nu</div>
      <div class="note">De rest gaat naar Later. Later blijft zichtbaar.</div>
      <div class="chips">${i.map(r=>`<button class="chip pick ${a.includes(r.id)?"on":""}" data-act="onboard-start" data-item="${r.id}">${u(r.label)}</button>`).join("")}</div>
      <div class="note">${a.length} / ${Q} gekozen</div>
      <div class="stack" style="margin-top:16px">
        <button class="btn primary" data-act="onboard-done" ${a.length===0?"disabled":""}>Naar Vandaag</button>
      </div>
    </div>`}function Ae(e){return!rn(e)&&!M(e)?`<div class="ex-nm">${u(e.label)}</div>`:`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>`}function hi(e){return`<button class="chip pick" data-act="detail-open" data-item="${e.id}">${u(e.label)}</button>`}function $i(e){const t=ve(e),n=ne(e),i=rt(e),a=ge(e),s=te(e),r=M(e);return`
      <button class="btn ghost detail-back" data-act="detail-close">Terug</button>
      <div class="sec-hd">Detail</div>
      <div class="card">
        <div class="ex-nm">${u(e.label)}</div>
        ${n?`<div class="note">${u(n)}</div>`:""}
        ${i?`<div class="work">${u(i)}</div>`:""}
        ${a?'<div class="note">Voorkeur. Geen regel.</div>':""}
        ${s&&!n?'<div class="note">Regel. Geen afvinken.</div>':""}
      </div>
      ${t?`<div class="sec-hd">Bron</div>
      <div class="card quiet">
        <div class="src-tag">${u(t)}</div>
      </div>`:""}
      ${r?wi():_i(e)}`}function wi(){return`
      <div class="sec-hd">Wijzig</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Zelfde item. Geen dosis. Log blijft.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="edit-label" type="text" maxlength="${$e}" placeholder="Naam" autocomplete="off" enterkeyhint="done" value="${u(o.editLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${ye.map(e=>`<button class="chip pick ${o.editKind===e?"on":""}" data-act="edit-kind" data-kind="${e}">${he[e]}</button>`).join("")}</div>
        <div class="field" style="margin-top:12px">
          <div class="lbl">Tijd</div>
          <input data-id="edit-timing" type="text" maxlength="${we}" placeholder="22:00 of ochtend" autocomplete="off" enterkeyhint="done" value="${u(o.editTiming)}" />
        </div>
        <div class="stack">
          <button class="btn primary" data-act="item-save">Bewaar</button>
          ${o.removeAsk?`<div class="note">Weg uit Vandaag. Log blijft.</div>
          <button class="btn primary" data-act="item-remove">Bevestig</button>
          <button class="btn ghost" data-act="item-remove-cancel">Niet nu</button>`:'<button class="btn ghost" data-act="item-remove-ask">Weg</button>'}
        </div>
      </div>`}function _i(e){return Se(e)?e.later?`
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
      </div>`:""}function xi(e){const t=ne(e);return`
      <div class="card quiet">
        ${Ae(e)}
        ${t?`<div class="note">${u(t)}</div>`:'<div class="note">Regel. Geen afvinken.</div>'}
      </div>`}function Si(e,t,n){const i=z(e),a=U(e),s=i.logged||!!i.skip,r=a&&i.current!==null&&e.b!==null&&i.current>=e.b,d=s||r,f=a,g=rt(e),c=ne(e),v=f&&t.suggestedMilestone&&e.id===l.vector.id;return`
      <div class="card">
        ${Ae(e)}
        ${c&&!g&&!a?`<div class="note">${u(c)}</div>`:""}
        ${a?`<div class="track">
          <span class="now">${L(i.current??e.a??0)}</span>
          <span>→</span>
          <span class="mid">${L(e.milestone??0)}</span>
          <span>→</span>
          <span class="end">${L(e.b??0)}</span>
        </div>`:g?`<div class="work">${u(g)}</div>`:""}
        <div class="actions ${a?"":"actions-two"}">
          ${a?`<button class="btn ico-btn ${i.plus?"on":""}" data-act="plus" data-item="${e.id}" ${d?"disabled":""}>${h("plus")}<span>+1</span></button>`:""}
          <button class="btn ico-btn ${i.done?"track":""}" data-act="done" data-item="${e.id}" ${s?"disabled":""}>${h("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${i.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${i.logged?"disabled":""}>${h("skip")}<span>Skip</span></button>
        </div>
        ${o.skipItemId===e.id||i.skip?`<div class="chips">${ee.map(b=>`<button class="chip ${i.skip===b?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${b}">${b}</button>`).join("")}</div>`:""}
        ${$t(e)}
        ${v?`<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${L(t.suggestedMilestone)}.</div>
               ${o.advanceWarn&&l.profile.identity_constraint?`<div class="banner">Check: ${u(l.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${L(t.suggestedMilestone)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`:`<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${t.suggestedMilestone}">Volgende etappe ${L(t.suggestedMilestone)}</button>
                      </div>`}`:""}
        ${f&&n?`<div class="note">${u(n)}</div>`:""}
      </div>`}function L(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function E(e){if(!o.busy){o.busy=!0,o.error=null;try{await e()}catch(t){o.error=t instanceof Error?t.message:"Er ging iets mis"}finally{o.busy=!1,$()}}}async function Ii(e){p=e,l=await p.load(),o.screen="vandaag",$()}async function Li(){di(),Ei(),await Ii(ai())}function Ei(){document.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const t=e.target;if(t instanceof HTMLInputElement){if(t.dataset.id==="theme-custom"){e.preventDefault(),Lt();return}if(t.dataset.id==="item-label"||t.dataset.id==="item-timing"){e.preventDefault(),It();return}(t.dataset.id==="edit-label"||t.dataset.id==="edit-timing")&&(e.preventDefault(),St())}}),document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(Xt(n)){o.screen=n,o.skipItemId=null,o.missKey=null,o.detailItemId=null,o.advanceWarn=!1,$();return}Ti(t)})}async function Ti(e){const t=e.dataset.act;if(!t||!p||!l)return;const n=kt(),i=_();if(t==="sleep-inc"||t==="sleep-dec"){const a=n.sleep??7,s=Math.max(0,Math.min(14,a+(t==="sleep-inc"?.5:-.5)));await P({date:i,kind:"body_sleep",value:s,skip_reason:null,item_id:null});return}if(t==="energy"){const a=Number(e.dataset.n),s=n.energy===a?null:a;if(s===null)return;await P({date:i,kind:"body_energy",value:s,skip_reason:null,item_id:null});return}if(t==="plus"){const a=l.items.find(r=>r.id===e.dataset.item);if(!a||!U(a))return;const s=z(a);if(s.logged||s.skip||a.b!==null&&s.current!==null&&s.current>=a.b)return;await P({date:i,kind:"set",value:(s.current??a.a??0)+1,skip_reason:null,item_id:a.id});return}if(t==="done"){const a=l.items.find(r=>r.id===e.dataset.item);if(!a)return;const s=z(a);if(s.logged||s.skip)return;await P({date:i,kind:"done",value:s.current??a.a,skip_reason:null,item_id:a.id});return}if(t==="detail-open"){const a=e.dataset.item??null,s=a?l.items.find(r=>r.id===a):void 0;if(!s)return;xt(s),o.detailItemId=s.id,$();return}if(t==="detail-close"){o.detailItemId=null,$();return}if(t==="skip-open"){const a=e.dataset.item??null;o.skipItemId=o.skipItemId===a?null:a,$();return}if(t==="skip"){const a=l.items.find(d=>d.id===e.dataset.item);if(!a||z(a).logged)return;const r=e.dataset.reason;if(!Me(r))return;await P({date:i,kind:"skip",value:null,skip_reason:r,item_id:a.id}),o.skipItemId=null;return}if(t==="miss-open"){const a=e.dataset.item,s=e.dataset.date;if(!a||!s)return;const r=ht(a,s);o.missKey=o.missKey===r?null:r,$();return}if(t==="miss"){const a=l.items.find(f=>f.id===e.dataset.item),s=e.dataset.date,r=e.dataset.reason;if(!a||!s||s>=i||!Me(r))return;const d=z(a,s);if(d.logged||d.skip)return;await P({date:s,kind:"miss",value:null,skip_reason:r,item_id:a.id}),o.missKey=null;return}if(t==="advance"){if(!n.suggestedMilestone)return;if(Mt(l.profile.identity_constraint)&&!o.advanceWarn){o.advanceWarn=!0,$();return}await We(n.suggestedMilestone);return}if(t==="advance-go"){if(!n.suggestedMilestone)return;await We(n.suggestedMilestone);return}if(t==="advance-cancel"){o.advanceWarn=!1,$();return}if(t==="onboard-goal"){const a=e.dataset.goal;if(!a||!Gn(a))return;const s={...l.profile,goals:Kn(l.profile.goals??[],a)};await E(async()=>{await p.saveProfile(s),l.profile=s});return}if(t==="onboard-age"){const a=e.dataset.age;if(!a||!qn(a))return;const s={...l.profile,age_band:a};await E(async()=>{await p.saveProfile(s),l.profile=s});return}if(t==="theme-toggle"){const a=e.dataset.theme;if(!a)return;await ue(Vn(C(l.profile.themes),a));return}if(t==="theme-add"){await Lt();return}if(t==="onboard-start"){const a=e.dataset.item;if(!a)return;o.startIds=Rn(o.startIds,a),$();return}if(t==="onboard-next"){$();return}if(t==="onboard-themes-done"){await ue(l.profile.themes??[],!0);return}if(t==="onboard-done"){const a=l.profile.age_band,s=l.profile.goals??[];if(!a||s.length===0||o.startIds.length===0)return;await E(async()=>{await p.saveOnboarding({goals:s,age_band:a,startIds:o.startIds}),l=await p.load(),o.screen="vandaag"});return}if(t==="later-now"||t==="later-park"){const a=e.dataset.item;if(!a)return;await E(async()=>{await p.setItemLater(a,t==="later-park"),l=await p.load()});return}if(t==="item-kind"){const a=e.dataset.kind;if(!Ne(a))return;_t(),o.addKind=a,$();return}if(t==="item-add"){await It();return}if(t==="edit-kind"){const a=e.dataset.kind;if(!Ne(a))return;ce(),o.editKind=a,$();return}if(t==="item-save"){await St();return}if(t==="item-remove-ask"){ce(),o.removeAsk=!0,$();return}if(t==="item-remove-cancel"){o.removeAsk=!1,$();return}if(t==="item-remove"){const a=o.detailItemId;if(!a)return;await E(async()=>{await p.removeItem(a),l=await p.load(),o.detailItemId=null,o.removeAsk=!1,o.screen="profiel"});return}if(t==="save-ik"){const a={...l.profile,identity_anti:N(A("identity_anti"),T.identity_anti),identity_new:N(A("identity_new"),T.identity_new),identity_constraint:N(A("identity_constraint"),T.identity_constraint),horizon_1y:N(A("horizon_1y"),T.horizon_1y)};await E(async()=>{await p.saveProfile(a),l.profile=a});return}if(t==="export"){Tt(l);return}}function _t(){o.addLabel=A("item-label")??o.addLabel,o.addTiming=A("item-timing")??o.addTiming}function ce(){o.editLabel=A("edit-label")??o.editLabel,o.editTiming=A("edit-timing")??o.editTiming}function xt(e){o.editLabel=e.label,o.editKind=ot(e),o.editTiming=lt(e),o.removeAsk=!1}async function St(){!p||!l||!o.detailItemId||(ce(),await E(async()=>{const e=await p.updateItem({id:o.detailItemId,label:o.editLabel,kind:o.editKind,timing:o.editTiming});l=await p.load(),xt(e),o.detailItemId=e.id}))}async function It(){!p||!l||(_t(),await E(async()=>{await p.addItem({label:o.addLabel,kind:o.addKind,timing:o.addTiming}),l=await p.load(),o.addLabel="",o.addTiming=""}))}async function Lt(){if(!l)return;const e=A("theme-custom")??"",t=C(l.profile.themes),n=Fn(t,e);n.length===t.length&&n.every((i,a)=>i===t[a])||await ue(n)}async function ue(e,t=!1){if(!p||!l)return;const n=C(e),i={...l.profile,themes:n},a=t||!mt(l);await E(async()=>{if(a){await p.saveThemes(n),l=await p.load();return}await p.saveProfile(i),l.profile=i})}function A(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function We(e){await E(async()=>{l.stage=await p.advanceStage(l.stage,e),l.items=l.items.map(t=>t.id===l.stage.vector_id?{...t,milestone:e}:t),l.rotated=!0,o.advanceWarn=!1})}async function P(e){await E(async()=>{const t=await p.addEvent(e);l.events.push(t)})}Li();
