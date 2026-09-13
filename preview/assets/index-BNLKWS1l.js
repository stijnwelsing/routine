(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();function vt(e){return JSON.stringify({exported_at:new Date().toISOString(),profile:e.profile,items:e.items,stage:e.stage,events:e.events},null,2)}function gt(e){const t=new Blob([vt(e)],{type:"application/json"}),n=URL.createObjectURL(t),s=document.createElement("a");s.href=n,s.download=`routine-${e.profile.id.slice(0,8)}.json`,s.click(),URL.revokeObjectURL(n)}const yt="geen zin",S={identity_anti:280,identity_new:140,identity_constraint:140,horizon_1y:140};function B(e,t){const n=e?.trim()??"";return n?n.slice(0,t):null}function bt(e){return e.filter(t=>t.kind==="skip"&&t.skip_reason===yt).length}function kt(e,t){const n=B(e,S.identity_new);return!n||bt(t)<2?null:n}function ht(e){return!!B(e,S.identity_constraint)}function $t(e,t){return t&&!B(e,S.horizon_1y)}function Ae(){return{identity_anti:null,identity_new:null,identity_constraint:null,horizon_1y:null}}const Be=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],Ce=["zo","ma","di","wo","do","vr","za"];function _(e=new Date){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${s}`}function j(e,t){const n=R(e);return n.setDate(n.getDate()+t),_(n)}function R(e){const[t,n,s]=e.split("-").map(Number);return new Date(t,n-1,s)}function _t(e){const t=R(e);return`${Ce[t.getDay()]} ${t.getDate()} ${Be[t.getMonth()]}`}function P(e){const t=R(e);return`${t.getDate()} ${Be[t.getMonth()]}`}function wt(e){return Ce[R(e).getDay()]}function xt(e){const t=R(e).getDay();return t===0?7:t}function oe(e){const t=R(e),n=t.getDay(),s=n===0?-6:1-n;return t.setDate(t.getDate()+s),_(t)}function le(e,t){const n=[];let s=e;for(;s<=t;)n.push(s),s=j(s,1);return n}function O(){return crypto.randomUUID()}function St(){return new Date().toISOString()}const Lt=2,It=6;function J(e,t){return e.created_at.localeCompare(t.created_at)}function de(e,t,n){return e.filter(s=>s.date===t&&s.kind===n).sort(J).at(-1)}function De(e,t){return t.filter(s=>s.kind==="set").sort(J).at(-1)?.value??e}function Tt(e,t){return de(e,t,"body_sleep")?.value??null}function Et(e,t){return de(e,t,"body_energy")?.value??null}function H(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip")).sort(J).at(-1)}function Ne(e,t){const n=H(e,t);return n?.kind==="skip"?n.skip_reason:null}function Oe(e,t){return H(e,t)?.kind==="done"}function ze(e,t){return H(e,t)?.kind==="set"}function Ke(e,t){const n=H(e,t);return n?.kind==="set"||n?.kind==="done"}function jt(e,t){return e!==null&&e<It||t!==null&&t<=Lt}function Mt(e,t){if(e>=t)return t;const n=t-e;if(n<=5)return t;const s=Math.max(1,Math.ceil(n/2));return Math.min(t,e+s)}function U(e,t,n,s){if(t<s)return"empty";const i=H(e,t);return i?.kind==="done"||i?.kind==="set"?"done":i?.kind==="skip"?"skip":de(e,t,"miss")?"miss":t>=n?"empty":"miss"}function At(e,t,n="1970-01-01"){let s=0,i=t;for(let a=0;a<400;a+=1){const r=U(e,i,t,n);if(r==="done")s+=1;else if(r==="skip"||r==="empty"&&i===t){i=j(i,-1);continue}else break;i=j(i,-1)}return s}function Bt(e,t,n){const s=oe(t),i=!n||n<s?s:n;let a=0,r=0;for(const d of le(i,t)){const u=U(e,d,t,n??i);u==="skip"||u==="empty"||(r+=1,u==="done"&&(a+=1))}return{hits:a,eligible:r}}function Ct(e,t,n="1970-01-01",s=3){const i=U(e,t,t,n);if(i==="done"||i==="skip")return!1;const a=j(t,-1);if(a<n)return!1;const r=j(t,-s),d=n>r?n:r;return le(d,a).some(u=>U(e,u,t,n)==="miss")}function Dt(e){return e.gearDown?{arrow:"↓",word:"herstel"}:e.milestoneHit&&e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.stalled&&!e.todayLogged?{arrow:"↓",word:"stokt"}:e.current>e.weekStartCurrent?{arrow:"↑",word:"stijgt"}:e.current<e.weekStartCurrent?{arrow:"↓",word:"zakt"}:{arrow:"→",word:"stabiel"}}function Nt(e){return e.gearDown?"Geen etappe-omhoog. Kleinere set of herstel. Geen stop.":e.atB?"B staat. Houd dit, kies later een nieuwe B.":e.milestoneHit?`${he(e.milestone)} gehaald. Kies zelf de volgende etappe.`:e.plusToday?"Set gedaan. Huidige mag omhoog. Etappe blijft.":e.doneToday?"Set op het werkgetal. Huidige blijft.":e.skipToday?"Overgeslagen. Geen miss. Morgen weer.":e.stalled?"Beweging staat stil. Doe de etappe of sla over met reden.":`Eén set. Werk naar ${he(e.milestone)}.`}function he(e){return Number.isInteger(e)?String(e):e.toFixed(1)}function Ge(e,t,n){return t.filter(i=>i.kind==="set"&&i.date<=n).sort(J).at(-1)?.value??e}function Ot(e,t,n,s){const i=De(e.a,n),a=Tt(n,s),r=Et(n,s),d=Oe(n,s),u=ze(n,s),v=Ke(n,s),c=Ne(n,s),m=jt(a,r),y=i>=t.milestone,I=i>=e.b,A=Ct(n,s,t.started_on),z=oe(s),f=Ge(e.a,n,j(z,-1)),$=Dt({current:i,weekStartCurrent:f,gearDown:m,stalled:A,milestoneHit:y,todayLogged:u||d||!!c});return{current:i,sleep:a,energy:r,doneToday:d,plusToday:u,setLoggedToday:v,skipToday:c,gearDown:m,milestoneHit:y,atB:I,trend:$,hitrate:Bt(n,s,t.started_on),streak:At(n,s,t.started_on),nextAction:Nt({milestone:t.milestone,b:e.b,gearDown:m,milestoneHit:y,atB:I,stalled:A,doneToday:d,plusToday:u,skipToday:c}),suggestedMilestone:y&&!I&&!m?Mt(t.milestone,e.b):null}}const Z=["geen tijd","geen energie","vergeten","geen zin","pijn"];function $e(e){return!!(e&&Z.includes(e))}const zt=["guideline","evidence-informed","public-framework","user preference","hypothesis"],Kt=["vandaag","koers","voortgang","profiel"];function Gt(e){return!!(e&&Kt.includes(e))}const b={a:40,b:50,milestone:45,domain:"strength",unit:"reps",stageType:"Build",windowDays:21},Re="routine_loop_v6",Rt=["routine_loop_v5","routine_loop_v4","routine_loop_v3"],_e="routine_local_user_id",we="routine_local_tenant_id",qt="routine_local_chosen";function Pt(e){return e.trim().toLowerCase().normalize("NFC")}function Ht(e){return!!(e&&zt.includes(e))}function Wt(e){const t=Pt(e);return t==="cafeïne 90 min na opstaan"?"public-framework":t==="wandelen na eten"?"evidence-informed":t==="low carb"||t==="scherm uit 22:00"?"user preference":null}function ce(e){return Wt(e.label)??(Ht(e.template)?e.template:null)}function Ft(e){return ce(e)!==null}function F(){return{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:null,condition:null}}function Vt(e){return{mode:e?.mode??null,clock:e?.clock??null,anchor:e?.anchor??null,offset_min:e?.offset_min??null,window_min:e?.window_min??null,frequency:e?.frequency??null,condition:e?.condition??null}}function Ut(e,t){if(e.timing.frequency==="weekly"||e.type==="weekly"){const s=e.weekdays??[];return s.length===0?!1:s.includes(xt(t))}return!0}function Q(e){return fe(e)==="constraint"}function ue(e){return fe(e)==="preference"}function qe(e){return!Q(e)&&!ue(e)}function X(e){const t=e.timing;return t.condition?t.condition:t.mode==="relative"&&t.anchor==="wake"&&t.offset_min!==null?`${t.offset_min} min na opstaan`:t.mode==="relative"&&t.anchor==="meal"?"na eten":t.mode==="clock"&&t.clock?t.clock:null}function Yt(e){return e.trim().toLowerCase().normalize("NFC")}function fe(e){if(e.role)return e.role;const t=Yt(e.label);return t==="low carb"?"preference":t==="cafeïne 90 min na opstaan"||t==="scherm uit 22:00"?"constraint":null}const Pe=["gedrag","regel","medicijn","supplement","sociaal"],Jt={gedrag:"gedrag",regel:"leefregel",medicijn:"medicijn",supplement:"supplement",sociaal:"sociaal"},Zt={gedrag:"Gedrag",regel:"Regel",medicijn:"Medicijn",supplement:"Supplement",sociaal:"Sociaal"},He=40,We=40;function Qt(e){return!!(e&&Pe.includes(e))}function W(e){return e.a!==null&&e.b!==null&&e.milestone!==null}function Xt(e,t){return Ut(e,t)}function en(e,t){return{...e,tenant_id:e.tenant_id??t,weekdays:e.weekdays??null,times_per_week:e.times_per_week??null,timing:Vt(e.timing),role:fe(e),template:ce(e),later:!!e.later}}function pe(e){return e.type==="medicijn"||e.type==="supplement"}function Fe(e){return e.type==="sociaal"}function Ve(e,t){return q(e,t).filter(n=>qe(n)&&!pe(n)&&!Fe(n)&&!n.later)}function tn(e,t){return q(e,t).filter(n=>ue(n)&&!n.later)}function nn(e,t){return q(e,t).filter(Q)}function Ue(e,t){return q(e,t).filter(n=>pe(n)&&!n.later)}function Ye(e,t){return q(e,t).filter(n=>Fe(n)&&!n.later)}function sn(e,t){return q(e,t).filter(n=>n.later&&qe(n))}function q(e,t){return e.filter(n=>Xt(n,t)).sort((n,s)=>n.sort-s.sort)}function ee(e){return e.find(W)}function ie(e){return e.kind==="body_sleep"||e.kind==="body_energy"||e.kind==="body_weight"}function te(e,t,n){return e.filter(s=>ie(s)?!1:!!(s.item_id===t.id||s.item_id===null&&n&&t.id===n))}function an(e,t){return t?[...e.filter(ie),...te(e,t,t.id)]:e.filter(ie)}function Je(e){return e.a===null?null:e.unit==="sec"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} s`:e.unit==="reps"?`${Number.isInteger(e.a)?e.a:e.a.toFixed(1)} reps`:String(e.a)}function N(e){return e.trim().toLowerCase()}function Ze(e){const t=e.trim().replace(/\s+/g," ").slice(0,He);return t.length>0?t:null}function rn(e){const t=e.trim().replace(/\s+/g," ").slice(0,We);if(!t)return F();const n=/^(\d{1,2}):(\d{2})$/.exec(t);if(n){const s=Number(n[1]),i=Number(n[2]);if(s<=23&&i<=59)return{...F(),mode:"clock",clock:`${String(s).padStart(2,"0")}:${n[2]}`,frequency:"daily"}}return{...F(),frequency:"daily",condition:t}}function on(e){return e.reduce((t,n)=>Math.max(t,n.sort),-1)+1}function ln(e,t){const n=Ze(t);return n?!e.some(s=>N(s.label)===N(n)):!1}function dn(e){const t=Ze(e.label);return t?{id:O(),tenant_id:e.tenantId,type:Jt[e.kind],label:t,unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:e.sort,timing:rn(e.timing??""),role:"action",template:"user preference",later:!!e.later}:null}function cn(e){const t=new Set,n=[];for(const s of e){const i=N(s.label);t.has(i)||(t.add(i),n.push(s))}return n}function Qe(e,t,n){const s=cn(e),i=new Set(s.map(r=>N(r.label))),a=t.filter(r=>!i.has(N(r.label))).map(r=>({...r,tenant_id:n}));return[...s,...a]}function un(e){const t=new Map;for(const n of e)for(const s of n)t.has(s.id)||t.set(s.id,s);return[...t.values()].sort((n,s)=>n.created_at.localeCompare(s.created_at))}function fn(e){return e?!!(e.identity_anti||e.identity_new||e.identity_constraint||e.horizon_1y||e.display_name):!1}function pn(e,t,n,s){if(e.length===0)return null;const i=e.reduce((c,m)=>(m.events?.length??0)>(c.events?.length??0)?m:c),a=e.find(c=>fn(c.profile))?.profile??i.profile,r=Qe([i,...e.filter(c=>c!==i)].flatMap(c=>c.items??[]),t,s),d=new Map(r.map(c=>[N(c.label),c.id])),u=new Map;for(const c of e)for(const m of c.items??[]){const y=d.get(N(m.label));y&&m.id!==y&&u.set(m.id,y)}const v=un(e.map(c=>c.events??[])).map(c=>{if(!c.item_id)return c;const m=u.get(c.item_id);return m?{...c,item_id:m}:c});return{...i,profile:{...a,id:a.id||n,tenant_id:a.tenant_id||s},items:r,events:v}}function mn(e,t,n,s){return te(e,t,n).some(i=>(i.kind==="set"||i.kind==="done"||i.kind==="skip"||i.kind==="miss")&&i.date<s)}function Xe(e,t){return e.created_at.localeCompare(t.created_at)}function vn(e,t,n){return e.filter(s=>s.date===t&&s.kind===n).sort(Xe).at(-1)}function gn(e,t){return e.filter(n=>n.date===t&&(n.kind==="set"||n.kind==="done"||n.kind==="skip"||n.kind==="miss")).sort(Xe).at(-1)}function se(e,t){return[...Ve(e,t),...Ue(e,t),...Ye(e,t)]}function ae(e,t,n,s,i){const a=te(e,t,i),r=gn(a,n);if(r?.kind==="set"||r?.kind==="done")return{item:t,date:n,mark:"hit",reason:null};if(r?.kind==="skip")return{item:t,date:n,mark:"skip",reason:r.skip_reason};const d=r?.kind==="miss"?r:vn(a,n,"miss");return d?{item:t,date:n,mark:"miss",reason:d.skip_reason}:n>=s?{item:t,date:n,mark:"open",reason:null}:{item:t,date:n,mark:"idle",reason:null}}function et(e,t,n,s){const i=j(n,-1);return se(e,i).filter(a=>mn(t,a,s,i)).map(a=>{const r=ae(t,a,i,n,s);return r.mark==="hit"||r.mark==="skip"||r.mark==="miss"?r:{...r,mark:"miss",reason:null}}).filter(a=>a.mark==="miss"&&!a.reason)}function yn(e,t,n){return e.some(s=>s.mark==="hit")?"hit":e.some(s=>s.mark==="miss")?"miss":e.some(s=>s.mark==="skip")?"skip":t===n?"open":"idle"}function tt(e,t,n,s){const i=oe(n),a=j(i,6),r=et(e,t,n,s),d=new Set(r.map(f=>`${f.item.id}:${f.date}`)),u=le(i,a).map(f=>{const k=se(e,f).map($=>{const ne=ae(t,$,f,n,s);return d.has(`${$.id}:${f}`)?{...ne,mark:"miss",reason:ne.reason}:ne});return{date:f,label:wt(f),mark:yn(k,f,n),hits:k.filter($=>$.mark==="hit").length,misses:k.filter($=>$.mark==="miss").length,skips:k.filter($=>$.mark==="skip").length}}),v=u.filter(f=>f.date<n),c=v.reduce((f,k)=>f+k.hits,0),m=v.reduce((f,k)=>f+k.misses,0),y=v.reduce((f,k)=>f+k.skips,0),I=v.flatMap(f=>se(e,f.date).map(k=>{const $=ae(t,k,f.date,n,s);return d.has(`${k.id}:${f.date}`)?{...$,mark:"miss",reason:$.reason}:$}).filter(k=>k.mark==="miss")),A=v.filter(f=>f.mark!=="idle").length,z=c>0&&m===0&&A>=2?"Week staat.":null;return{start:i,end:a,range:`${P(i)} – ${P(a)}`,days:u,hits:c,misses:m,skips:y,missRows:I,note:z}}function V(e){return ee(e)?.id}const Y=3,me=[{id:"kracht",label:"Kracht"},{id:"eten",label:"Eten & drinken"},{id:"slaap",label:"Slaap"},{id:"stofjes",label:"Stofjes"},{id:"bewegen",label:"Bewegen"}],ve=["18–29","30–39","40–49","50–59","60+"],bn={kracht:["Push-ups","Squats","Plank","Dead hang"],eten:["Niet snoepen","Low carb","Intermittent fasting","Geen alcohol"],slaap:["Koud douchen"],stofjes:["Medicijn ochtend","Vitamine D"],bewegen:["Wandelen na eten"]};function ge(e){return Q(e)||e.type==="weekly"?!1:e.type==="daily"||e.type==="leefregel"||e.type==="gedrag"||e.type==="sociaal"||pe(e)}function kn(e){return e.filter(ge).sort((t,n)=>t.sort-n.sort)}function nt(e){return!(e.onboarded!==!1||(e.events??[]).length>0)}function hn(e){return nt(e)?e.profile.goals?.length?e.profile.age_band?e.theme_step!==!0?"themes":"start":"age":"goals":null}function $n(e,t){const n=e.filter(ge).sort((a,r)=>a.sort-r.sort);if(t.length===0)return n;const s=new Set(t.flatMap(a=>bn[a]??[])),i=n.filter(a=>s.has(a.label));return i.length>0?i:n}function _n(e,t){const n=new Set(t.slice(0,Y));return e.map(s=>ge(s)?{...s,later:!n.has(s.id)}:{...s,later:!1})}function wn(e,t){return e.includes(t)?e.filter(n=>n!==t):[...e,t]}function xn(e,t){return e.includes(t)?e.filter(n=>n!==t):e.length>=Y?e:[...e,t]}function Sn(e){return me.some(t=>t.id===e)}function Ln(e){return ve.includes(e)}function In(e,t,n,s,i){const a=tt(e,t,n,i??V(e)),r=a.days.map(d=>({date:d.date,label:d.label,current:Ge(s,t,d.date<=n?d.date:n),mark:d.mark}));return{week:a,line:r,hits:a.hits,skips:a.skips,misses:a.misses}}function Tn(e,t,n,s=18,i=16){if(e.length===0)return[];const a=Math.min(...e),d=Math.max(...e)-a,u=t-s*2,v=n-i*2;return e.map((c,m)=>{const y=e.length===1?t/2:s+m/(e.length-1)*u,I=d===0?n/2:i+(1-(c-a)/d)*v;return{x:y,y:I}})}function En(e){return e.map(t=>`${t.x.toFixed(1)},${t.y.toFixed(1)}`).join(" ")}const xe=["Military calisthenics","Kickbox","Spinnen"],it=40;function ye(e){const t=e.trim().replace(/\s+/g," ").slice(0,it);return t.length>0?t:null}function M(e){if(!Array.isArray(e))return[];const t=new Set,n=[];for(const s of e){if(typeof s!="string")continue;const i=ye(s);if(!i)continue;const a=i.toLowerCase();t.has(a)||(t.add(a),n.push(i))}return n}function jn(e,t){const n=ye(t);if(!n)return e;const s=n.toLowerCase();return e.some(i=>i.toLowerCase()===s)?e.filter(i=>i.toLowerCase()!==s):[...e,n]}function Mn(e,t){const n=ye(t);if(!n)return e;const s=n.toLowerCase();return e.some(i=>i.toLowerCase()===s)?e:[...e,n]}function An(e){const n=M(e).filter(s=>!xe.some(i=>i.toLowerCase()===s.toLowerCase()));return[...xe,...n]}function Se(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function st(e){const t=new Set(M(e).map(s=>s.toLowerCase()));return`<div class="chips">${An(e).map(s=>`<button class="chip pick ${t.has(s.toLowerCase())?"on":""}" data-act="theme-toggle" data-theme="${Se(s)}">${Se(s)}</button>`).join("")}</div>
        <div class="theme-add">
          <input data-id="theme-custom" type="text" maxlength="${it}" placeholder="Eigen thema" autocomplete="off" enterkeyhint="done" />
          <button class="btn ghost" data-act="theme-add">Voeg toe</button>
        </div>`}function Bn(e){return e.skip?null:e.plus?{text:"Set gedaan.",tone:"fog"}:e.done?e.type==="medicijn"?{text:"Genomen.",tone:"sage"}:e.track?{text:"Set staat.",tone:"sage"}:{text:"Staat.",tone:"sage"}:null}function at(e,t){return{id:e,tenant_id:t,display_name:null,...Ae(),age_band:null,goals:[],themes:[]}}function rt(e,t,n=_()){return{id:O(),tenant_id:t,vector_id:e,milestone:b.milestone,started_on:n,deadline:j(n,b.windowDays),status:"active",stage_type:b.stageType}}function be(e){const t=n=>({id:O(),tenant_id:e,timing:F(),role:null,template:null,later:!1,...n});return[t({type:"daily",label:"Push-ups",unit:"reps",a:b.a,b:b.b,milestone:b.milestone,weekdays:null,times_per_week:null,sort:0}),t({type:"daily",label:"Squats",unit:"reps",a:30,b:null,milestone:null,weekdays:null,times_per_week:null,sort:1}),t({type:"daily",label:"Plank",unit:"sec",a:60,b:null,milestone:null,weekdays:null,times_per_week:null,sort:2}),t({type:"daily",label:"Dead hang",unit:"sec",a:45,b:null,milestone:null,weekdays:null,times_per_week:null,sort:3}),t({type:"weekly",label:"Gerichte kracht",unit:null,a:null,b:null,milestone:null,weekdays:[],times_per_week:2,sort:4}),t({type:"leefregel",label:"Koud douchen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:5}),t({type:"leefregel",label:"Niet snoepen",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:6}),t({type:"leefregel",label:"Low carb",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:7,role:"preference",template:"user preference"}),t({type:"leefregel",label:"Intermittent fasting",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:8}),t({type:"leefregel",label:"Geen alcohol",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:9}),t({type:"gedrag",label:"Cafeïne 90 min na opstaan",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:10,role:"constraint",template:"public-framework",timing:{mode:"relative",clock:null,anchor:"wake",offset_min:90,window_min:null,frequency:"daily",condition:null}}),t({type:"gedrag",label:"Wandelen na eten",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:11,role:"action",template:"evidence-informed",timing:{mode:"relative",clock:null,anchor:"meal",offset_min:0,window_min:null,frequency:"daily",condition:"na eten"}}),t({type:"medicijn",label:"Medicijn ochtend",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:12,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"ochtend"}}),t({type:"supplement",label:"Vitamine D",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:13,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Bellen met iemand",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:14,role:"action",template:null,timing:{mode:"clock",clock:"18:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}}),t({type:"sociaal",label:"Iemand zien",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:1,sort:15,role:"action",template:null,timing:{mode:null,clock:null,anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:"deze week"}}),t({type:"gedrag",label:"Scherm uit 22:00",unit:null,a:null,b:null,milestone:null,weekdays:null,times_per_week:null,sort:16,role:"constraint",template:"user preference",timing:{mode:"clock",clock:"22:00",anchor:null,offset_min:null,window_min:null,frequency:"daily",condition:null}})]}function Cn(e,t){return{id:e.id,tenant_id:e.tenant_id,user_id:t,domain:b.domain,a:e.a??b.a,b:e.b??b.b,unit:e.unit==="sec"?"sec":"reps",pace_constraint:null}}function Dn(e,t=_(),n=O()){const s=at(e,n),i=be(n),a=ee(i)??i[0],r=Cn(a,e),d=rt(r.id,n,t);return a.milestone!==null&&(d.milestone=a.milestone),{profile:s,items:i,vector:r,stage:d,events:[],rotated:!1,onboarded:!1,theme_step:!1}}function Nn(e){return e.vector.a===25||e.stage.milestone===35||e.stage.milestone===25?{...e,items:e.items.map(n=>W(n)?{...n,a:b.a,b:b.b,milestone:b.milestone,unit:b.unit}:n),vector:{...e.vector,a:b.a,b:b.b,unit:b.unit},stage:{...e.stage,milestone:b.milestone},events:e.events}:e}function On(){const e=localStorage.getItem(_e);if(e)return e;const t=O();return localStorage.setItem(_e,t),t}function zn(){const e=localStorage.getItem(we);if(e)return e;const t=O();return localStorage.setItem(we,t),t}function L(e){localStorage.setItem(Re,JSON.stringify(e))}function Kn(e){if(!e)return null;try{const t=JSON.parse(e);return!t||typeof t!="object"?null:t}catch{return null}}function Gn(){return[Re,...Rt].map(e=>Kn(localStorage.getItem(e))).filter(e=>e!==null)}function Rn(e,t,n){const s=Qe(e.items??[],be(n),n).map(i=>en(i,n));return{...e,profile:{...at(t,n),...e.profile,tenant_id:e.profile?.tenant_id??n,...Ae(),identity_anti:e.profile?.identity_anti??null,identity_new:e.profile?.identity_new??null,identity_constraint:e.profile?.identity_constraint??null,horizon_1y:e.profile?.horizon_1y??null,age_band:e.profile?.age_band??null,goals:Array.isArray(e.profile?.goals)?e.profile.goals:[],themes:M(e.profile?.themes)},items:s,vector:{...e.vector,tenant_id:e.vector?.tenant_id??n},stage:{...e.stage,tenant_id:e.stage?.tenant_id??n},events:(e.events??[]).map(i=>({...i,tenant_id:i.tenant_id??n,item_id:i.item_id??null})),rotated:!!e.rotated,onboarded:e.onboarded??!0,theme_step:e.theme_step??!1}}function T(e,t){const n=Gn();if(n.length===0){const a=Dn(e,_(),t);return L(a),a}const s=pn(n,be(t),e,t)??n[0],i=Nn(Rn(s,e,t));return L(i),i}function qn(){localStorage.setItem(qt,"1");const e=On(),t=zn();return{mode:"local",userId:e,tenantId:t,email:null,async load(){return T(e,t)},async addEvent(n){const s=T(e,t),i={id:n.id??O(),tenant_id:t,user_id:e,item_id:n.item_id??null,date:n.date,kind:n.kind,value:n.value??null,skip_reason:n.skip_reason??null,created_at:St()};return s.events.push(i),L(s),i},async saveProfile(n){const s=T(e,t);s.profile=n,L(s)},async saveOnboarding(n){const s=T(e,t);s.profile={...s.profile,goals:n.goals,age_band:n.age_band,themes:M(s.profile.themes)},s.items=_n(s.items,n.startIds),s.onboarded=!0,s.theme_step=!0,L(s)},async saveThemes(n){const s=T(e,t);s.profile={...s.profile,themes:M(n)},s.theme_step=!0,L(s)},async setItemLater(n,s){const i=T(e,t);i.items=i.items.map(a=>a.id===n?{...a,later:s}:a),L(i)},async addItem(n){const s=T(e,t),i=dn({tenantId:t,label:n.label,kind:n.kind,timing:n.timing,sort:on(s.items)});if(!i)throw new Error("naam ontbreekt");if(!ln(s.items,i.label))throw new Error("item bestaat al");return s.items=[...s.items,i],L(s),i},async saveVectorConstraint(n,s){const i=T(e,t);i.vector.id===n&&(i.vector.pace_constraint=s,L(i))},async advanceStage(n,s){const i=T(e,t),a=rt(n.vector_id,t);return a.milestone=s,i.stage=a,i.items=i.items.map(r=>r.id===n.vector_id?{...r,milestone:s}:r),i.rotated=!0,L(i),a},async signOut(){}}}const Le="#F0ECE4",Pn="#3D6B5A";function ot(){return`
    <div class="wordmark" aria-label="ARETAN">
      <div class="wordmark-type">ARETAN</div>
      <svg class="wordmark-rule" viewBox="0 0 180 14" aria-hidden="true">
        <line x1="0" y1="7" x2="180" y2="7" stroke="${Le}" stroke-width="1.5" stroke-linecap="square" />
        <circle cx="75" cy="7" r="2.2" fill="${Le}" />
        <line x1="124" y1="2" x2="124" y2="12" stroke="${Pn}" stroke-width="1.5" stroke-linecap="square" />
      </svg>
    </div>`}function h(e,t=""){return`<svg class="ico ${t}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}" /></svg>`}function Hn(e){return e==="stokt"||e==="herstel"?"ember":e==="stijgt"?"sage":"fog"}function Ie(e){const t=Hn(e);return e==="stokt"||e==="herstel"||e==="zakt"?h("status-kink",`ico-${t}`):e==="stijgt"?h("status-up",`ico-${t}`):h("status-flat",`ico-${t}`)}function Wn(e){return[1,2,3,4,5].map(t=>{const n=e!==null&&e>=t;return`<button class="dot-btn ${n?"on":""}" data-act="energy" data-n="${t}" aria-label="${t}">${h(n?"dot-now":"dot")}</button>`}).join("")}const Fn=`
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
</svg>`;function Vn(){document.querySelector(".sprite")||document.body.insertAdjacentHTML("afterbegin",Fn)}const K=()=>document.querySelector("#app"),l={screen:"vandaag",skipItemId:null,missKey:null,detailItemId:null,advanceWarn:!1,busy:!1,error:null,startIds:[],addKind:"gedrag",addLabel:"",addTiming:""};let g=null,o=null;function lt(){if(!o)throw new Error("geen snapshot");const e=ee(o.items);return Ot(o.vector,o.stage,an(o.events,e),_())}function C(e,t=_()){if(!o)throw new Error("geen snapshot");const n=ee(o.items),s=te(o.events,e,n?.id),i=e.a===null?null:De(e.a,s);return{done:Oe(s,t),plus:ze(s,t),skip:Ne(s,t),logged:Ke(s,t),current:i}}function dt(e,t){return`${e}:${t}`}function p(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function w(){if(!o||!g)return;const e=hn(o);if(e){K().innerHTML=ti(e);return}const t=lt(),{vector:n,stage:s}=o,i=g.mode==="local"?"Lokaal":"Supabase",a=`
    <div class="hdr">
      <div>
        ${ot()}
        <div class="date-s">${_t(_())}</div>
      </div>
      <div class="mode-pill">${i}</div>
    </div>`,r=`
    <nav class="nav nav-4">
      <button data-nav="vandaag" class="${l.screen==="vandaag"?"active":""}">${h("day")}Vandaag</button>
      <button data-nav="koers" class="${l.screen==="koers"?"active":""}">${h("mark")}Koers</button>
      <button data-nav="voortgang" class="${l.screen==="voortgang"?"active":""}">${h("line")}Voortgang</button>
      <button data-nav="profiel" class="${l.screen==="profiel"?"active":""}">${h("me")}Profiel</button>
    </nav>`;if(l.detailItemId){const d=o.items.find(u=>u.id===l.detailItemId);if(d){K().innerHTML=`
      ${a}
      ${ii(d)}
      ${l.error?`<p class="error" style="padding:0 18px">${p(l.error)}</p>`:""}
      ${r}`;return}l.detailItemId=null}if(l.screen==="vandaag"){const d=kt(o.profile.identity_new,o.events),u=_(),v=Ve(o.items,u),c=nn(o.items,u),m=Ue(o.items,u),y=Ye(o.items,u),I=sn(o.items,u),A=tn(o.items,u),z=et(o.items,o.events,u,V(o.items));K().innerHTML=`
      ${a}
      ${g.mode==="local"?'<div class="banner">Lokaal — geen Supabase. +1 / Done / Skip blijven op dit apparaat.</div>':""}
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
          <div class="dots">${Wn(t.energy)}</div>
        </div>
      </div>
      ${A.length?`<div class="sec-hd">Dag</div>
      <div class="card quiet">
        <div class="day-tags">${A.map(f=>ni(f)).join("")}</div>
      </div>`:""}
      ${c.length?`<div class="sec-hd">Regel</div>${c.map(f=>si(f)).join("")}`:""}
      ${m.length?`<div class="sec-hd">Stofjes</div>${m.map(f=>Te(f)).join("")}`:""}
      ${y.length?`<div class="sec-hd">Sociaal</div>${y.map(f=>Te(f)).join("")}`:""}
      ${z.length?`<div class="sec-hd">Niet gedaan</div>
      <div class="card">
        <div class="note" style="margin-top:0">Geen +1, Done of Skip. Korte reden.</div>
        ${z.map(f=>ut(f)).join("")}
      </div>`:""}
      <div class="sec-hd">Vandaag</div>
      ${v.map(f=>ai(f,t,d)).join("")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Niet in je start. Blijft bewaard.</div>
        ${I.map(f=>Zn(f)).join("")}
        <button class="btn ghost later-add" data-nav="profiel">Eigen item</button>
      </div>
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${Ie(t.trend.word)}
          <div class="word">${t.trend.word}</div>
        </div>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${p(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="koers"){K().innerHTML=`
      ${a}
      ${je(o.profile.themes,"Tik een suggestie of typ zelf. Geen vaste lijst. Later aan te passen.")}
      ${Ee(tt(o.items,o.events,_(),V(o.items)))}
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
            <div class="val" style="font-size:1.15rem">${P(s.started_on)} → ${s.deadline?P(s.deadline):"—"}</div>
          </div>
          <div>
            <div class="lbl">Trend</div>
            <div class="val status">${Ie(t.trend.word)} ${t.trend.word}</div>
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
      ${$t(o.profile.horizon_1y,o.rotated)?'<div class="banner">Zet een 1-jaars B. Etappes roteren.</div>':""}
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
      ${r}`;return}if(l.screen==="voortgang"){const d=In(o.items,o.events,_(),o.vector.a,V(o.items));K().innerHTML=`
      ${a}
      ${Ee(d.week)}
      <div class="sec-hd">Lijn</div>
      <div class="card">
        <div class="note" style="margin-top:0">Huidige deze week. Geen score.</div>
        ${ei(d.line.map(u=>u.current),_(),d.line)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Nu</div><div class="val">${x(t.current)}</div></div>
          <div><div class="lbl">Gedaan</div><div class="val">${d.hits}</div></div>
        </div>
      </div>
      ${l.error?`<p class="error" style="padding:0 18px">${p(l.error)}</p>`:""}
      ${r}`;return}if(l.screen==="profiel"){const d=o.profile.goals??[],u=o.profile.age_band,v=kn(o.items);K().innerHTML=`
      ${a}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="note" style="margin-top:0">Later aan te passen. Geen wipe.</div>
        <div class="chips">${me.map(c=>`<button class="chip pick ${d.includes(c.id)?"on":""}" data-act="onboard-goal" data-goal="${c.id}">${c.label}</button>`).join("")}</div>
      </div>
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="note" style="margin-top:0">Alleen een band. Geen geboortedatum.</div>
        <div class="chips">${ve.map(c=>`<button class="chip pick ${u===c?"on":""}" data-act="onboard-age" data-age="${c}">${c}</button>`).join("")}</div>
      </div>
      ${je(o.profile.themes,"Tik een suggestie of typ zelf. Later aan te passen.")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Parkeren of terughalen. Events blijven.</div>
        ${v.map(c=>Qn(c)).join("")}
      </div>
      ${Xn()}
      ${l.error?`<p class="error" style="padding:0 18px">${p(l.error)}</p>`:""}
      ${r}`;return}}function ct(e){const t=C(e),n=Bn({plus:t.plus,done:t.done,skip:t.skip,type:e.type,track:W(e)});return n?`<div class="confirm ${n.tone}" role="status">${p(n.text)}</div>`:""}function Te(e){const t=C(e),n=t.logged||!!t.skip,s=e.type==="medicijn"?"Genomen":"Done",i=X(e);return`
      <div class="card stof">
        ${ke(e)}
        ${i?`<div class="note">${p(i)}</div>`:""}
        <div class="actions actions-two">
          <button class="btn ico-btn ${t.done?"track":""}" data-act="done" data-item="${e.id}" ${n?"disabled":""}>${h("done")}<span>${s}</span></button>
          <button class="btn ico-btn skip ${t.skip?"on":""}" data-act="skip-open" data-item="${e.id}" ${t.logged?"disabled":""}>${h("skip")}<span>Skip</span></button>
        </div>
        ${l.skipItemId===e.id||t.skip?`<div class="chips">${Z.map(a=>`<button class="chip ${t.skip===a?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${a}">${a}</button>`).join("")}</div>`:""}
        ${ct(e)}
      </div>`}function Un(e,t,n,s){return`<div class="chips">${Z.map(i=>`<button class="chip ${n===i?"on":""}" data-act="${s}" data-item="${e}" data-date="${t}" data-reason="${i}">${i}</button>`).join("")}</div>`}function ut(e){const t=l.missKey===dt(e.item.id,e.date)||!!e.reason;return`
      <div class="miss-row">
        <button class="miss-item" data-act="miss-open" data-item="${e.item.id}" data-date="${e.date}">
          <span class="ex-nm">${p(e.item.label)}</span>
          <span class="note">${e.reason?p(e.reason):P(e.date)}</span>
        </button>
        ${t?Un(e.item.id,e.date,e.reason,"miss"):""}
      </div>`}function Yn(e){const t=[];return e.hits&&t.push(`${e.hits} gedaan`),e.skips&&t.push(`${e.skips} overgeslagen`),e.misses&&t.push(`${e.misses} niet gedaan`),t.length===0?"Nog geen dagen deze week.":t.join(" · ")}function Jn(e){return e==="skip"?"–":e==="miss"?"×":"·"}function Ee(e){return`
      <div class="sec-hd">Week</div>
      <div class="card">
        <div class="note" style="margin-top:0">${p(e.range)}</div>
        <div class="week-strip" aria-label="Weekoverzicht">
          ${e.days.map(t=>`<div class="week-day ${t.mark}${t.date===_()?" today":""}">
            <span class="week-lbl">${t.label}</span>
            <span class="week-mark">${Jn(t.mark)}</span>
          </div>`).join("")}
        </div>
        <div class="note">${p(Yn(e))}</div>
        ${e.note?`<div class="week-note">${p(e.note)}</div>`:""}
        ${e.missRows.length?e.missRows.map(t=>ut(t)).join(""):""}
      </div>`}function Zn(e){return`
      <div class="later-row">
        <div class="ex-nm">${p(e.label)}</div>
        <button class="btn ghost later-now" data-act="later-now" data-item="${e.id}">Nu</button>
      </div>`}function Qn(e){const t=e.later;return`
      <div class="later-row">
        <div>
          <div class="ex-nm">${p(e.label)}</div>
          <div class="note" style="margin-top:4px">${t?"Later":"Nu"}</div>
        </div>
        <button class="btn ghost later-now" data-act="${t?"later-now":"later-park"}" data-item="${e.id}">${t?"Nu":"Later"}</button>
      </div>`}function Xn(){return`
      <div class="sec-hd">Eigen item</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Label, type, optioneel tijdstip. Geen dosis. Bestaande items blijven.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="item-label" type="text" maxlength="${He}" placeholder="Bijv. Avondwandeling" autocomplete="off" enterkeyhint="done" value="${p(l.addLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${Pe.map(e=>`<button class="chip pick ${l.addKind===e?"on":""}" data-act="item-kind" data-kind="${e}">${Zt[e]}</button>`).join("")}</div>
        <div class="field" style="margin-top:12px">
          <div class="lbl">Tijd</div>
          <input data-id="item-timing" type="text" maxlength="${We}" placeholder="22:00 of ochtend" autocomplete="off" enterkeyhint="done" value="${p(l.addTiming)}" />
        </div>
        <div class="stack">
          <button class="btn primary" data-act="item-add">Voeg toe</button>
        </div>
      </div>`}function ei(e,t,n){const a=Tn(e,294,72);if(a.length===0)return'<div class="note">Nog geen lijn.</div>';const r=a.map((d,u)=>{const v=n[u]?.date===t;return`<circle class="${n[u]?.mark==="miss"?"prog-dot miss":v?"prog-dot now":"prog-dot"}" cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${v?3.2:2.2}" />`}).join("");return`
        <svg class="prog-line" viewBox="0 0 294 72" aria-hidden="true">
          <polyline class="prog-path" points="${En(a)}" />
          ${r}
        </svg>`}function je(e,t){return`
      <section class="theme-sec" data-sec="themes">
        <div class="sec-hd">Thema's</div>
        <div class="card">
          <div class="ex-nm">Trainingsrichting</div>
          <div class="note">${p(t)}</div>
          ${st(e)}
        </div>
      </section>`}function ti(e){if(!o)return"";const t=o.profile.goals??[],n=o.profile.age_band,s=$n(o.items,t),i=l.startIds,a=`
    <div class="hdr">
      <div>
        ${ot()}
        <div class="date-s">Start</div>
      </div>
    </div>`;if(e==="goals")return`
      ${a}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="ex-nm">Wat is je richting?</div>
        <div class="note">Eerst doelen. Types (gedrag, regel, medicijn, supplement, sociaal) komen daarna.</div>
        <div class="chips">${me.map(r=>`<button class="chip pick ${t.includes(r.id)?"on":""}" data-act="onboard-goal" data-goal="${r.id}">${r.label}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${t.length===0?"disabled":""}>Verder</button>
        </div>
      </div>`;if(e==="age")return`
      ${a}
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="ex-nm">Kies een band</div>
        <div class="note">Geen geboortedatum. Alleen een band.</div>
        <div class="chips">${ve.map(r=>`<button class="chip pick ${n===r?"on":""}" data-act="onboard-age" data-age="${r}">${r}</button>`).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${n?"":"disabled"}>Verder</button>
        </div>
      </div>`;if(e==="themes"){const r=o.profile.themes??[];return`
      ${a}
      <div class="sec-hd">Thema's</div>
      <div class="card">
        <div class="ex-nm">Trainingsrichting</div>
        <div class="note">Tik een suggestie of typ zelf. Mag leeg. Later aan te passen.</div>
        ${st(r)}
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-themes-done">Verder</button>
        </div>
      </div>`}return`
    ${a}
    <div class="sec-hd">Start</div>
    <div class="card">
      <div class="ex-nm">Max ${Y} nu</div>
      <div class="note">De rest gaat naar Later. Later blijft zichtbaar.</div>
      <div class="chips">${s.map(r=>`<button class="chip pick ${i.includes(r.id)?"on":""}" data-act="onboard-start" data-item="${r.id}">${p(r.label)}</button>`).join("")}</div>
      <div class="note">${i.length} / ${Y} gekozen</div>
      <div class="stack" style="margin-top:16px">
        <button class="btn primary" data-act="onboard-done" ${i.length===0?"disabled":""}>Naar Vandaag</button>
      </div>
    </div>`}function ke(e){return Ft(e)?`<button class="ex-nm tap" data-act="detail-open" data-item="${e.id}">${p(e.label)}</button>`:`<div class="ex-nm">${p(e.label)}</div>`}function ni(e){return`<button class="chip pick" data-act="detail-open" data-item="${e.id}">${p(e.label)}</button>`}function ii(e){const t=ce(e),n=X(e),s=Je(e),i=ue(e),a=Q(e);return`
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
      </div>`:""}`}function si(e){const t=X(e);return`
      <div class="card quiet">
        ${ke(e)}
        ${t?`<div class="note">${p(t)}</div>`:'<div class="note">Regel. Geen afvinken.</div>'}
      </div>`}function ai(e,t,n){const s=C(e),i=W(e),a=s.logged||!!s.skip,r=i&&s.current!==null&&e.b!==null&&s.current>=e.b,d=a||r,u=i,v=Je(e),c=X(e),m=u&&t.suggestedMilestone&&e.id===o.vector.id;return`
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
        ${l.skipItemId===e.id||s.skip?`<div class="chips">${Z.map(y=>`<button class="chip ${s.skip===y?"on":""}" data-act="skip" data-item="${e.id}" data-reason="${y}">${y}</button>`).join("")}</div>`:""}
        ${ct(e)}
        ${m?`<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${x(t.suggestedMilestone)}.</div>
               ${l.advanceWarn&&o.profile.identity_constraint?`<div class="banner">Check: ${p(o.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${x(t.suggestedMilestone)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`:`<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${t.suggestedMilestone}">Volgende etappe ${x(t.suggestedMilestone)}</button>
                      </div>`}`:""}
        ${u&&n?`<div class="note">${p(n)}</div>`:""}
      </div>`}function x(e){return Number.isInteger(e)?String(e):e.toFixed(1)}async function E(e){if(!l.busy){l.busy=!0,l.error=null;try{await e()}catch(t){l.error=t instanceof Error?t.message:"Er ging iets mis"}finally{l.busy=!1,w()}}}async function ri(e){g=e,o=await g.load(),l.screen="vandaag",w()}async function oi(){Vn(),li(),await ri(qn())}function li(){document.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const t=e.target;if(t instanceof HTMLInputElement){if(t.dataset.id==="theme-custom"){e.preventDefault(),mt();return}(t.dataset.id==="item-label"||t.dataset.id==="item-timing")&&(e.preventDefault(),pt())}}),document.addEventListener("click",e=>{const t=e.target.closest("[data-act], [data-nav]");if(!t)return;const n=t.dataset.nav;if(Gt(n)){l.screen=n,l.skipItemId=null,l.missKey=null,l.detailItemId=null,l.advanceWarn=!1,w();return}di(t)})}async function di(e){const t=e.dataset.act;if(!t||!g||!o)return;const n=lt(),s=_();if(t==="sleep-inc"||t==="sleep-dec"){const i=n.sleep??7,a=Math.max(0,Math.min(14,i+(t==="sleep-inc"?.5:-.5)));await G({date:s,kind:"body_sleep",value:a,skip_reason:null,item_id:null});return}if(t==="energy"){const i=Number(e.dataset.n),a=n.energy===i?null:i;if(a===null)return;await G({date:s,kind:"body_energy",value:a,skip_reason:null,item_id:null});return}if(t==="plus"){const i=o.items.find(r=>r.id===e.dataset.item);if(!i||!W(i))return;const a=C(i);if(a.logged||a.skip||i.b!==null&&a.current!==null&&a.current>=i.b)return;await G({date:s,kind:"set",value:(a.current??i.a??0)+1,skip_reason:null,item_id:i.id});return}if(t==="done"){const i=o.items.find(r=>r.id===e.dataset.item);if(!i)return;const a=C(i);if(a.logged||a.skip)return;await G({date:s,kind:"done",value:a.current??i.a,skip_reason:null,item_id:i.id});return}if(t==="detail-open"){const i=e.dataset.item??null;if(!i||!o.items.some(a=>a.id===i))return;l.detailItemId=i,w();return}if(t==="detail-close"){l.detailItemId=null,w();return}if(t==="skip-open"){const i=e.dataset.item??null;l.skipItemId=l.skipItemId===i?null:i,w();return}if(t==="skip"){const i=o.items.find(d=>d.id===e.dataset.item);if(!i||C(i).logged)return;const r=e.dataset.reason;if(!$e(r))return;await G({date:s,kind:"skip",value:null,skip_reason:r,item_id:i.id}),l.skipItemId=null;return}if(t==="miss-open"){const i=e.dataset.item,a=e.dataset.date;if(!i||!a)return;const r=dt(i,a);l.missKey=l.missKey===r?null:r,w();return}if(t==="miss"){const i=o.items.find(u=>u.id===e.dataset.item),a=e.dataset.date,r=e.dataset.reason;if(!i||!a||a>=s||!$e(r))return;const d=C(i,a);if(d.logged||d.skip)return;await G({date:a,kind:"miss",value:null,skip_reason:r,item_id:i.id}),l.missKey=null;return}if(t==="advance"){if(!n.suggestedMilestone)return;if(ht(o.profile.identity_constraint)&&!l.advanceWarn){l.advanceWarn=!0,w();return}await Me(n.suggestedMilestone);return}if(t==="advance-go"){if(!n.suggestedMilestone)return;await Me(n.suggestedMilestone);return}if(t==="advance-cancel"){l.advanceWarn=!1,w();return}if(t==="onboard-goal"){const i=e.dataset.goal;if(!i||!Sn(i))return;const a={...o.profile,goals:wn(o.profile.goals??[],i)};await E(async()=>{await g.saveProfile(a),o.profile=a});return}if(t==="onboard-age"){const i=e.dataset.age;if(!i||!Ln(i))return;const a={...o.profile,age_band:i};await E(async()=>{await g.saveProfile(a),o.profile=a});return}if(t==="theme-toggle"){const i=e.dataset.theme;if(!i)return;await re(jn(M(o.profile.themes),i));return}if(t==="theme-add"){await mt();return}if(t==="onboard-start"){const i=e.dataset.item;if(!i)return;l.startIds=xn(l.startIds,i),w();return}if(t==="onboard-next"){w();return}if(t==="onboard-themes-done"){await re(o.profile.themes??[],!0);return}if(t==="onboard-done"){const i=o.profile.age_band,a=o.profile.goals??[];if(!i||a.length===0||l.startIds.length===0)return;await E(async()=>{await g.saveOnboarding({goals:a,age_band:i,startIds:l.startIds}),o=await g.load(),l.screen="vandaag"});return}if(t==="later-now"||t==="later-park"){const i=e.dataset.item;if(!i)return;await E(async()=>{await g.setItemLater(i,t==="later-park"),o=await g.load()});return}if(t==="item-kind"){const i=e.dataset.kind;if(!Qt(i))return;ft(),l.addKind=i,w();return}if(t==="item-add"){await pt();return}if(t==="save-ik"){const i={...o.profile,identity_anti:B(D("identity_anti"),S.identity_anti),identity_new:B(D("identity_new"),S.identity_new),identity_constraint:B(D("identity_constraint"),S.identity_constraint),horizon_1y:B(D("horizon_1y"),S.horizon_1y)};await E(async()=>{await g.saveProfile(i),o.profile=i});return}if(t==="export"){gt(o);return}}function ft(){l.addLabel=D("item-label")??l.addLabel,l.addTiming=D("item-timing")??l.addTiming}async function pt(){!g||!o||(ft(),await E(async()=>{await g.addItem({label:l.addLabel,kind:l.addKind,timing:l.addTiming}),o=await g.load(),l.addLabel="",l.addTiming=""}))}async function mt(){if(!o)return;const e=D("theme-custom")??"",t=M(o.profile.themes),n=Mn(t,e);n.length===t.length&&n.every((s,i)=>s===t[i])||await re(n)}async function re(e,t=!1){if(!g||!o)return;const n=M(e),s={...o.profile,themes:n},i=t||!nt(o);await E(async()=>{if(i){await g.saveThemes(n),o=await g.load();return}await g.saveProfile(s),o.profile=s})}function D(e){return document.querySelector(`[data-id="${e}"]`)?.value??null}async function Me(e){await E(async()=>{o.stage=await g.advanceStage(o.stage,e),o.items=o.items.map(t=>t.id===o.stage.vector_id?{...t,milestone:e}:t),o.rotated=!0,l.advanceWarn=!1})}async function G(e){await E(async()=>{const t=await g.addEvent(e);o.events.push(t)})}oi();
