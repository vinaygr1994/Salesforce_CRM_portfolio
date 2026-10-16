(function(){
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const money=v=>"$"+Math.round(v).toLocaleString("en-US");
const tfmt=d=>d.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"});
const dfmt=d=>d.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});
const CO="Summit Home Pros";
const ICO={
 check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>',
 sync:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M20 12a8 8 0 0 1-14 5.3M4 12a8 8 0 0 1 14-5.3M18 3v4h-4M6 21v-4h4"/></svg>',
 bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0"/></svg>',
 cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
 msg:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg>',
 dollar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M12 3v18M16 7.5C16 6 14.2 5 12 5S8 6 8 8s2 2.6 4 3 4 1.2 4 3-1.8 3-4 3-4-1-4-2.5"/></svg>',
 box:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10"/></svg>',
 lock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
 x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
 mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
 task:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M9 5h11M9 12h11M9 19h11M4 5l1 1 2-2M4 12l1 1 2-2M4 19l1 1 2-2"/></svg>',
 chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/></svg>',
 cam:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
 pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>'
};
const SERV={
 roof:{n:"Roof replacement",tr:"roof",val:15,price:21400},
 hvac:{n:"HVAC system replacement",tr:"hvac",val:12,price:11850},
 kitchen:{n:"Kitchen remodel",tr:"remodel",val:18,price:46900},
 bath:{n:"Bathroom remodel",tr:"remodel",val:10,price:24600},
 windows:{n:"Windows & doors",tr:"remodel",val:8,price:16300}
};
const TRADES={roof:"Roofing",hvac:"HVAC",remodel:"Remodeling"};
const SRC={"Google Ads":15,"Facebook / Instagram":10,"Referral from a friend":25,"Yard sign":8};
const TIMES=["Mornings","Afternoons","Evenings","Weekends"];
const REPS=[
 {n:"Alex Brooks",sk:["roof","remodel"],load:2,cap:4},
 {n:"Jordan Nguyen",sk:["hvac"],load:1,cap:4},
 {n:"Riya Silva",sk:["roof","hvac","remodel"],load:4,cap:4},
 {n:"Sam Patel",sk:["remodel","roof"],load:3,cap:4}
];
const SLOTS=[[9,0],[11,0],[13,0],[15,0],[17,30],[19,0]];
const BUSY=[[0,2,5],[1,3],[0,4]];
const PREF={Mornings:[0,1],Afternoons:[2,3],Evenings:[4,5],Weekends:[4,5]};
const STEPS=[
 {t:"Lead comes in",h:"A homeowner asks for an estimate",p:"Fill in the website form like a customer would, or keep the sample details, and submit. Then watch the activity log: Salesforce takes it from here.",c:["Web-to-Lead","Duplicate rules","Lead scoring"],hint:"Submit the form to continue"},
 {t:"Routed in seconds",h:"The lead is assigned in seconds",p:"An assignment Flow checks the territory, the trade skill and each rep's load today, then texts the homeowner and alerts the rep. Nobody has to watch an inbox.",c:["Record-triggered Flow","Round robin by capacity","SMS via Dialpad or Twilio"],hint:"Run the assignment flow to continue"},
 {t:"Visit booked",h:"Book the in-person visit",p:"Pick a slot on the assigned rep's calendar. Busy times come from their Google or Outlook calendar, and slots that match the customer's preferred time are highlighted.",c:["Site_Visit__c","Calendar sync","SMS reminders"],hint:"Pick a time slot to continue"},
 {t:"Rep's visit form",h:"The rep fills the visit form on site",p:"A mobile form built for the trade. Fields appear only when needed: Sold asks for signature and deposit, Not sold asks why. Switch the trade to see the same form adapt.",c:["Experience Cloud portal","Secure token link","Dynamic fields"],hint:"Submit the visit result to continue"},
 {t:"Automation runs",h:"Submitting triggers the automation",p:"The moment the form is submitted, a Flow updates every related record, starts the right next step for this outcome and sends the manager a summary.",c:["Record-triggered Flow","Approval process","Slack, email and SMS"],hint:"Automation running…"},
 {t:"Manager's view",h:"The manager sees it, live",p:"No chasing reps for updates. The approval, the dashboard and the full history are already in Salesforce, and marketing sees which ad produced the result.",c:["Dashboards","Approvals","Lead source ROI"],hint:""}
];
let D,timers=[],sigCtx=null;

function fresh(){
  const now=new Date();now.setHours(17,2,10,0);
  D={step:0,max:0,now,score:0,rep:null,routed:false,visit:null,vkey:null,conf:null,res:null,ran:false,ntab:"slack",appr:null,
     lead:{first:"Maria",last:"Chen",phone:"(619) 555-0148",email:"maria.chen@example.com",zip:"92104",serv:"roof",time:"Evenings",src:"Google Ads"},f:null};
}
const adv=s=>{D.now=new Date(D.now.getTime()+s*1000);};
const later=(fn,ms)=>{const t=setTimeout(fn,ms);timers.push(t);return t;};
function log(txt,sub,cls){
  const ul=$("dmLog");const e=ul.querySelector(".empty");if(e)e.remove();
  const li=document.createElement("li");li.className="new"+(cls?" "+cls:"");
  li.innerHTML=`<time>${tfmt(D.now)}</time><div>${txt}${sub?`<small>${sub}</small>`:""}</div>`;
  ul.prepend(li);
}
const svc=()=>SERV[D.lead.serv];
const repFirst=()=>D.rep?D.rep.n.split(" ")[0]:"";
const full=()=>`${esc(D.lead.first)} ${esc(D.lead.last)}`;
const initials=n=>n.split(" ").map(x=>x[0]).join("");

/* ---------- chrome ---------- */
function chrome(){
  $("dmSteps").innerHTML=STEPS.map((s,i)=>`<li><button type="button" data-i="${i}" ${i>D.max?"disabled":""} ${i===D.step?'aria-current="step"':""} class="${i<D.max?"ok":""}"><b>Step ${i+1}</b><span>${s.t}</span></button></li>`).join("");
  $("dmSteps").querySelectorAll("button").forEach(b=>b.onclick=()=>go(+b.dataset.i));
  const s=STEPS[D.step];
  $("dmK").textContent=`Step ${D.step+1} of ${STEPS.length}`;
  $("dmTitle").textContent=s.h;$("dmText").textContent=s.p;
  $("dmChips").innerHTML=s.c.map(c=>`<span>${c}</span>`).join("");
  $("dmBack").disabled=D.step===0;
  const nx=$("dmNext");
  if(D.step===STEPS.length-1){nx.textContent="Restart demo ↺";nx.disabled=false;$("dmHint").textContent="";}
  else{nx.textContent="Next →";nx.disabled=D.step>=D.max;$("dmHint").textContent=D.step>=D.max?s.hint:"";}
}
function complete(i){if(D.max<i+1)D.max=i+1;chrome();}
function go(i){
  timers.forEach(clearTimeout);timers=[];
  D.step=i;chrome();SCREENS[i]($("dmStage"));
  const top=$("dm").getBoundingClientRect().top;
  if(top<-40)$("dm").scrollIntoView({behavior:"smooth",block:"start"});
}
function restart(){
  timers.forEach(clearTimeout);timers=[];fresh();
  $("dmLog").innerHTML='<li class="empty">Nothing yet. Submit the form to start.</li>';go(0);
}

/* ---------- step 1: web form ---------- */
const inp=(k,l,v,t)=>`<div class="fx"><label for="f_${k}">${l} <span class="req">*</span></label><input id="f_${k}" name="${k}" type="${t||"text"}" value="${esc(v)}" autocomplete="off"><span class="em"></span></div>`;
const sel=(k,l,opts,v)=>`<div class="fx"><label for="f_${k}">${l}</label><select id="f_${k}" name="${k}">${opts.map(o=>`<option value="${esc(o[0])}" ${o[0]===v?"selected":""}>${esc(o[1])}</option>`).join("")}</select></div>`;
function leadCard(){
  const L=D.lead,s=svc();
  const f=[["Service",s.n],["Source",L.src],["ZIP",L.zip],["Preferred time",L.time],["Status",D.rep?"Assigned to "+D.rep.n:"New, assigning…"],["Duplicate check","No match found"]];
  return `<div class="rc fade"><div class="rc-h"><span class="ic">LD</span><div><small>Lead · created by Web-to-Lead</small><b>${full()}</b></div><span class="pill ${D.score>=75?"g":"w"}">Score ${D.score}</span></div><div class="fl">${f.map(x=>`<div>${x[0]}<b>${esc(x[1])}</b></div>`).join("")}</div></div>`;
}
function s0(st){
  const L=D.lead,lock=D.max>0;
  st.innerHTML=`<div class="dw"><div class="dw-bar"><i></i><i></i><i></i><span class="url">summithomepros.com/free-estimate</span></div><div class="dw-b">
  <h4 class="dw-h">Book your free in-home estimate</h4><p class="dw-p">${CO} · We'll text you within minutes to pick a time.</p>
  <form id="f0" class="g2" novalidate>
  ${inp("first","First name",L.first)}${inp("last","Last name",L.last)}${inp("phone","Mobile phone",L.phone,"tel")}${inp("email","Email",L.email,"email")}${inp("zip","ZIP code",L.zip)}
  ${sel("serv","Service needed",Object.entries(SERV).map(([k,v])=>[k,v.n]),L.serv)}
  ${sel("time","Best time for a visit",TIMES.map(t=>[t,t]),L.time)}
  ${sel("src","How did you hear about us?",Object.keys(SRC).map(k=>[k,k]),L.src)}
  <div class="span2"><button class="dbtn" type="submit" style="width:100%" ${lock?"disabled":""}>${lock?"Request sent ✓":"Request my free estimate"}</button></div>
  </form></div></div><div id="leadCard">${lock?leadCard():""}</div>`;
  const f=$("f0");
  if(lock){f.querySelectorAll("input,select").forEach(e=>e.disabled=true);return;}
  f.onsubmit=e=>{
    e.preventDefault();
    const v=k=>f.elements[k].value.trim();let ok=true;
    const chk=(k,test,msg)=>{const w=f.elements[k].closest(".fx");const bad=!test(v(k));w.classList.toggle("err",bad);w.querySelector(".em").textContent=bad?msg:"";if(bad)ok=false;};
    chk("first",x=>x.length>0,"Required");chk("last",x=>x.length>0,"Required");
    chk("phone",x=>x.replace(/\D/g,"").length>=10,"Enter a 10-digit number");
    chk("email",x=>/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x),"Enter a valid email");
    chk("zip",x=>/^\d{5}$/.test(x),"5-digit ZIP");
    if(!ok)return;
    ["first","last","phone","email","zip","serv","time","src"].forEach(k=>D.lead[k]=v(k));
    const inArea=/^9[12]/.test(D.lead.zip);
    D.score=Math.min(98,40+SRC[D.lead.src]+svc().val+(inArea?12:0)+(D.lead.time!=="Weekends"?4:0));
    log("Web-to-Lead: new Lead created",`${full()} · ${esc(svc().n)}`);adv(1);
    log("Duplicate rule checked","No existing Lead or Contact with this phone or email");adv(1);
    log(`Lead scored ${D.score} / 100`,`${esc(D.lead.src)} +${SRC[D.lead.src]}, job value +${svc().val}${inArea?", in service area +12":", outside main service area"}`);
    f.querySelectorAll("input,select,button").forEach(e=>e.disabled=true);
    f.querySelector("button").textContent="Request sent ✓";
    $("leadCard").innerHTML=leadCard();
    complete(0);
  };
}

/* ---------- step 2: routing ---------- */
function terr(){const z=D.lead.zip;return /^921/.test(z)?"San Diego Central":/^920/.test(z)?"North County":/^9[12]/.test(z)?"Southern California":"Out of area (manager review)";}
function pick(){
  const tr=svc().tr;const q=REPS.filter(r=>r.sk.includes(tr));const a=q.filter(r=>r.load<r.cap);
  return {tr,q,a,win:a.slice().sort((x,y)=>x.load-y.load)[0]};
}
function s1(st){
  const P=pick();
  const rules=[["Territory",`ZIP ${esc(D.lead.zip)} → ${terr()}`],["Trade skill",`${TRADES[P.tr]} → ${P.q.length} of ${REPS.length} reps qualified`],["Capacity today","Skip reps whose calendar is full"],["Round robin","Fewest visits today gets the lead"],["Notify","Text the homeowner, alert the rep"]];
  st.innerHTML=`<div class="dw"><div class="dw-bar"><i></i><i></i><i></i><span class="url">Salesforce · Flow: Lead Assignment</span></div><div class="dw-b">
  <ol class="rules" id="rules">${rules.map((r,i)=>`<li><i>${i+1}</i><div><b>${r[0]}</b><small>${r[1]}</small></div><span class="ok">✓</span></li>`).join("")}</ol>
  <div class="reps" id="reps">${REPS.map((r,i)=>`<div class="rep" data-i="${i}"><div class="rep-t"><span class="av">${initials(r.n)}</span><div><b>${r.n}</b><small>${r.sk.map(s=>TRADES[s]).join(" · ")}</small></div></div><div class="ld"><i style="width:${r.load/r.cap*100}%"></i></div><small class="rs">${r.load} of ${r.cap} visits today</small></div>`).join("")}</div>
  <button class="dbtn" id="runA" style="width:100%" ${D.routed?"hidden":""}>▶ Run assignment flow</button>
  </div></div><div id="routeOut"></div>`;
  const rl=[...st.querySelectorAll("#rules li")],rc=[...st.querySelectorAll(".rep")];
  const mark=(n)=>{
    rl.slice(0,n+1).forEach(l=>l.classList.add("on"));
    if(n>=1)REPS.forEach((r,i)=>{if(!r.sk.includes(P.tr)){rc[i].classList.add("x");rc[i].querySelector(".rs").textContent=`No ${TRADES[P.tr]} skill`;}});
    if(n>=2)REPS.forEach((r,i)=>{if(r.sk.includes(P.tr)&&r.load>=r.cap){rc[i].classList.add("x");rc[i].querySelector(".rs").textContent="Calendar full today";}});
    if(n>=3){const wi=REPS.indexOf(P.win);rc[wi].classList.add("win");rc[wi].querySelector(".rs").textContent="✓ Assigned · fewest visits today";}
  };
  const out=()=>{
    const s=svc();
    $("routeOut").innerHTML=`<div class="phones fade">
     <div class="mph"><div class="mph-s"><div class="mph-h"><b>${CO}</b><span>Homeowner's phone</span></div><div class="mph-b">
      <div class="bub">Hi ${esc(D.lead.first)}, thanks for contacting ${CO}! ${repFirst()} will text you in a few minutes to book your free ${esc(s.n.toLowerCase())} estimate. Reply STOP to opt out.<small>Text message · ${tfmt(D.now)}</small></div></div></div></div>
     <div class="mph"><div class="mph-s"><div class="mph-h"><b>Salesforce</b><span>${esc(D.rep.n)}'s phone</span></div><div class="mph-b">
      <div class="push"><div class="ph-app"><i></i>Salesforce · now</div><b>New lead assigned: ${full()}</b><br>${esc(s.n)} · ZIP ${esc(D.lead.zip)} · Score ${D.score}<br><small style="color:var(--muted)">Prefers ${esc(D.lead.time.toLowerCase())}. Call within 5 minutes.</small><div class="acts"><span>Call</span><span>Book visit</span></div></div></div></div></div>
    </div><div class="stat fade"><b>38 sec</b><span>from form submit to the first text. The industry norm is hours, and most leads go to whoever calls first.</span></div>`;
  };
  if(D.routed){mark(4);out();return;}
  $("runA").onclick=()=>{
    $("runA").disabled=true;
    rl.forEach((_,n)=>later(()=>{mark(n);
      if(n===0){adv(2);log("Assignment Flow started",`Territory: ${terr()}`);}
      if(n===3){D.rep=P.win;adv(3);log(`Lead assigned to ${esc(D.rep.n)}`,`${TRADES[P.tr]} skill, ${D.rep.load} of ${D.rep.cap} visits today`);}
      if(n===4){adv(32);log("SMS sent to homeowner","Via Dialpad, from the company number");log(`Push alert sent to ${esc(D.rep.n)}`,"Salesforce mobile app");D.routed=true;$("runA").hidden=true;out();complete(1);}
    },n*650+200));
  };
}

/* ---------- step 3: booking ---------- */
function days(){
  const out=[];const d=new Date();d.setHours(0,0,0,0);
  while(out.length<3){d.setDate(d.getDate()+1);const w=d.getDay();if(w!==0&&w!==6)out.push(new Date(d));}
  return out;
}
function visitCard(){
  const v=D.visit;
  const f=[["Customer",`${D.lead.first} ${D.lead.last}`],["Assigned rep",D.rep.n],["When",`${dfmt(v)}, ${tfmt(v)}`],["Type","In-home estimate"],["Status",D.conf==="C"?"Confirmed by customer":D.conf==="R"?"Reschedule requested":"Scheduled"],["Reminders","24 hrs + 2 hrs before"]];
  return `<div class="rc fade"><div class="rc-h"><span class="ic">SV</span><div><small>Site Visit</small><b>SV-10428</b></div><span class="pill ${D.conf==="C"?"g":D.conf==="R"?"w":"b"}">${D.conf==="C"?"Confirmed":D.conf==="R"?"Rescheduling":"Scheduled"}</span></div><div class="fl">${f.map(x=>`<div>${x[0]}<b>${esc(x[1])}</b></div>`).join("")}</div></div>`;
}
function smsBook(){
  const v=D.visit;
  let h=`<div class="bub">Hi ${esc(D.lead.first)}, your free ${esc(svc().n.toLowerCase())} estimate with ${esc(D.rep.n)} is booked for ${dfmt(v)} at ${tfmt(v)}. Reply C to confirm or R to reschedule.<small>Text message</small></div>`;
  if(D.conf==="C")h+=`<div class="bub me">C</div><div class="bub">Thanks, you're confirmed! We'll text you 2 hours before, and ${repFirst()} will send an "on my way" message.</div>`;
  if(D.conf==="R")h+=`<div class="bub me">R</div><div class="bub">No problem. Pick a new time here: summit.link/r/8KQ2 (the slot is held for 24 hours).</div>`;
  return `<div class="mph fade"><div class="mph-s"><div class="mph-h"><b>${CO}</b><span>Homeowner's phone</span></div><div class="mph-b">${h}
   ${D.conf||D.res?"":`<div class="replies"><button class="dbtn sec" data-r="C">Reply "C"</button><button class="dbtn sec" data-r="R">Reply "R"</button></div>`}</div></div></div>`;
}
function s2(st){
  const ds=days(),pref=PREF[D.lead.time];const lock=!!D.res;
  st.innerHTML=`<div class="dw"><div class="dw-bar"><i></i><i></i><i></i><span class="url">Salesforce · Book Site Visit · ${esc(D.rep.n)}</span></div><div class="dw-b">
   <p style="margin:0 0 6px;font-size:14px"><b>${esc(D.rep.n)}'s availability</b> · customer prefers <b>${esc(D.lead.time.toLowerCase())}</b>${D.lead.time==="Weekends"?" (no weekend slots this week, so evenings are suggested)":""}</p>
   <div class="legend"><span><i class="s"></i>Matches preference</span><span><i class="b"></i>Busy (from Google Calendar)</span><span><i></i>Open</span></div>
   <div class="cal">${ds.map((d,di)=>`<div class="col"><h5>${dfmt(d)}</h5>${SLOTS.map((s,si)=>{const busy=BUSY[di].includes(si);const t=new Date(d);t.setHours(s[0],s[1]);const key=di+"-"+si;
     return `<button type="button" class="slot ${busy?"busy":""} ${!busy&&pref.includes(si)?"sug":""}" data-k="${key}" data-t="${t.getTime()}" ${busy?'aria-disabled="true" title="Busy"':""} aria-pressed="${D.vkey===key}" ${lock?"disabled":""}>${busy?"Busy":tfmt(t)}</button>`;}).join("")}</div>`).join("")}</div>
   </div></div><div id="bookOut"></div>`;
  const out=()=>{
    $("bookOut").innerHTML=`<div style="display:grid;gap:12px">${visitCard()}${smsBook()}</div>`;
    $("bookOut").querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>{
      D.conf=b.dataset.r;adv(240);
      if(D.conf==="C")log("Customer confirmed by SMS reply","Visit status → Confirmed");
      else log("Customer asked to reschedule","Self-service link sent; slot held 24 hrs","warn");
      out();
    });
  };
  if(D.visit)out();
  st.querySelectorAll(".slot").forEach(b=>b.onclick=()=>{
    if(b.classList.contains("busy")||lock)return;
    const first=!D.visit;D.vkey=b.dataset.k;D.visit=new Date(+b.dataset.t);D.conf=null;
    st.querySelectorAll(".slot").forEach(x=>x.setAttribute("aria-pressed",x===b));
    adv(first?95:20);
    log(`${first?"Site Visit SV-10428 created":"Site Visit rescheduled"}`,`${dfmt(D.visit)}, ${tfmt(D.visit)} · ${esc(D.rep.n)}`);
    log("Event added to rep's Google Calendar");
    log("Confirmation SMS sent","Reminders scheduled 24 hrs and 2 hrs before");
    D.f=null;out();complete(2);
  });
}

/* ---------- step 4: rep form ---------- */
function initForm(){
  if(D.f)return;
  const tr=svc().tr;
  D.f={trade:tr,checkin:null,dm:"",roofType:"Asphalt shingle",squares:"28",layers:"1",ins:"No",claim:"",sys:"Heat pump",tons:"3",age:"17",opt:"Better",room:D.lead.serv==="bath"?"Bathroom":"Kitchen",sqft:"180",finish:"Premium",budget:"$40k to $60k",
   photos:[false,false,false],price:String(svc().price),priceEdited:false,disc:0,outcome:"",deposit:"$1,000",sig:null,d2:"",who:"",reason:"",nurture:true,notes:""};
}
const segH=(k,opts,cls)=>`<div class="seg ${cls||""}" data-k="${k}" role="group">${opts.map(o=>`<button type="button" data-v="${o[0]}" aria-pressed="${D.f[k]===o[0]}">${o[1]}</button>`).join("")}</div>`;
const fsel=(k,l,opts)=>`<div class="fx"><label for="p_${k}">${l}</label><select id="p_${k}" data-k="${k}">${opts.map(o=>`<option ${D.f[k]===o?"selected":""}>${esc(o)}</option>`).join("")}</select></div>`;
const finp=(k,l,t,extra)=>`<div class="fx"><label for="p_${k}">${l}</label><input id="p_${k}" data-k="${k}" type="${t||"text"}" value="${esc(D.f[k])}" ${extra||""}></div>`;
function d2opts(){
  const v=D.visit;const o=[];[[2,18,0],[3,18,0],[4,10,0],[5,18,30]].forEach(a=>{const d=new Date(v);d.setDate(d.getDate()+a[0]);d.setHours(a[1],a[2]);o.push(`${dfmt(d)}, ${tfmt(d)}`);});return o;
}
function s3(st){
  initForm();const F=D.f,lock=!!D.res;
  const ph=[["Front of home"],["Problem area"],["Measure-ments"]];
  st.innerHTML=`<div class="trade-pick">Form preset: ${segH("trade",Object.entries(TRADES))}</div>
  <div class="phone"><div class="phone-s">
   <div class="phone-top"><span>${tfmt(D.visit)}</span><span>5G ▮▮▮</span></div>
   <div class="phone-app"><small>${CO} · Rep Portal</small><b>Visit SV-10428 · ${full()}</b></div>
   <div class="phone-body" id="pb">
    ${lock?`<div class="subm">✓ Submitted ${tfmt(new Date(D.visit.getTime()+48*60000))}. View only.</div>`:""}
    <div class="pcard"><h6>1 · Arrival</h6>
      <div id="ckw">${F.checkin?`<div class="ckin">${ICO.pin.replace('aria-hidden','style="width:18px;height:18px" aria-hidden')} Checked in ${F.checkin} · GPS matches address</div>`:`<button type="button" class="dbtn" id="ck" style="width:100%">Check in at property</button>`}</div>
      <div class="fx"><span class="lb">Decision makers present <span class="req">*</span></span>${segH("dm",[["All","All present"],["Some","Only some"],["None","None"]])}</div>
    </div>
    <div class="pcard"><h6>2 · ${TRADES[F.trade]} details</h6>
     <div data-tr="roof" class="g2" ${F.trade!=="roof"?"hidden":""}>
      ${fsel("roofType","Roof type",["Asphalt shingle","Tile","Metal","Flat / TPO"])}${finp("squares","Squares","number",'min="1"')}
      ${fsel("layers","Layers to remove",["1","2","3"])}
      <div class="fx"><span class="lb">Insurance claim?</span>${segH("ins",[["No","No"],["Yes","Yes"]])}</div>
      <div class="span2" data-show="claim" ${F.ins!=="Yes"?"hidden":""}>${finp("claim","Claim number")}</div>
     </div>
     <div data-tr="hvac" class="g2" ${F.trade!=="hvac"?"hidden":""}>
      ${fsel("sys","Current system",["Heat pump","AC + furnace","Mini-split","Boiler"])}${fsel("tons","Tonnage",["2","2.5","3","4","5"])}
      ${finp("age","Equipment age (yrs)","number",'min="0"')}
      <div class="fx"><span class="lb">Option chosen</span>${segH("opt",[["Good","Good"],["Better","Better"],["Best","Best"]])}</div>
     </div>
     <div data-tr="remodel" class="g2" ${F.trade!=="remodel"?"hidden":""}>
      ${fsel("room","Room",["Kitchen","Bathroom","Basement","Whole home","Windows & doors"])}${finp("sqft","Area (sq ft)","number",'min="1"')}
      <div class="fx span2"><span class="lb">Finish level</span>${segH("finish",[["Standard","Standard"],["Premium","Premium"],["Luxury","Luxury"]])}</div>
      <div class="span2">${fsel("budget","Customer budget",["Under $20k","$20k to $40k","$40k to $60k","$60k+"])}</div>
     </div>
    </div>
    <div class="pcard"><h6>3 · Photos</h6><div class="phs">${ph.map((p,i)=>`<button type="button" class="pt ${F.photos[i]?"on":""}" data-p="${i}" aria-pressed="${F.photos[i]}">${ICO.cam}${p[0]}</button>`).join("")}</div></div>
    <div class="pcard"><h6>4 · Quote</h6>
      ${finp("price","Price quoted ($) <span class=\"req\">*</span>","number",'min="0" step="50"')}
      <div class="fx"><span class="lb">Discount</span><div class="disc"><input type="range" min="0" max="20" step="1" data-k="disc" value="${F.disc}" aria-label="Discount percent"><output id="dOut">${F.disc}%</output></div></div>
      <div class="wbox" id="dWarn" ${F.disc>10?"":"hidden"}>Over 10% needs manager approval before the quote is final.</div>
    </div>
    <div class="pcard"><h6>5 · Result</h6>
      <div class="fx"><span class="lb">Outcome <span class="req">*</span></span>${segH("outcome",[["sold","Sold"],["second","2nd meeting"],["lost","Not sold"]],"oc")}</div>
      <div data-oc="sold" class="g2" ${F.outcome!=="sold"?"hidden":""}>
        <div class="span2">${fsel("deposit","Deposit collected",["$500","$1,000","$2,500"])}</div>
        <div class="span2 fx"><span class="lb">Customer signature <span class="req">*</span></span><canvas class="sig" id="sig" aria-label="Signature pad: draw with mouse or finger"></canvas><div class="sigrow"><span id="sigS">${F.sig?"Signed ✓":"Sign above"}</span><button type="button" id="sigC">Clear</button></div></div>
      </div>
      <div data-oc="second" class="g2" ${F.outcome!=="second"?"hidden":""}>
        <div class="span2">${fsel("d2","2nd meeting time *",["",...d2opts()])}</div>
        <div class="span2">${finp("who","Who needs to be there")}</div>
      </div>
      <div data-oc="lost" class="g2" ${F.outcome!=="lost"?"hidden":""}>
        <div class="span2">${fsel("reason","Main reason *",["","Price too high","Not ready yet","Chose another company","Needs financing","Just collecting quotes"])}</div>
        <label class="chk span2"><input type="checkbox" data-k="nurture" ${F.nurture?"checked":""}> Add to 90-day follow-up (email + SMS)</label>
      </div>
      <div class="fx"><label for="p_notes">Notes for the office</label><textarea id="p_notes" data-k="notes" placeholder="e.g. wants to start before rainy season">${esc(F.notes)}</textarea></div>
    </div>
    <div id="pErr"></div>
    ${lock?"":`<button type="button" class="dbtn" id="pSub" style="width:100%">Submit visit result</button>`}
   </div></div></div>`;
  const pb=$("pb");
  // trade switch stays live even after submit? only before submit
  st.querySelectorAll(".seg").forEach(g=>g.querySelectorAll("button").forEach(b=>{
    if(lock&&g.dataset.k!=="trade"){b.disabled=true;return;}
    if(lock&&g.dataset.k==="trade"){b.disabled=true;return;}
    b.onclick=()=>{
      const k=g.dataset.k;F[k]=b.dataset.v;
      g.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b));
      if(k==="trade"){st.querySelectorAll("[data-tr]").forEach(x=>x.hidden=x.dataset.tr!==F.trade);
        if(!F.priceEdited){F.price=String({roof:21400,hvac:11850,remodel:46900}[F.trade]);$("p_price").value=F.price;}}
      if(k==="ins")st.querySelector('[data-show="claim"]').hidden=F.ins!=="Yes";
      if(k==="outcome"){st.querySelectorAll("[data-oc]").forEach(x=>x.hidden=x.dataset.oc!==F.outcome);if(F.outcome==="sold")initSig();}
    };
  }));
  pb.querySelectorAll("[data-k]").forEach(el=>{
    if(el.classList.contains("seg"))return;
    if(lock){el.disabled=true;return;}
    const k=el.dataset.k;
    const h=()=>{F[k]=el.type==="checkbox"?el.checked:el.value;
      if(k==="price")F.priceEdited=true;
      if(k==="disc"){F.disc=+el.value;$("dOut").textContent=F.disc+"%";$("dWarn").hidden=F.disc<=10;}};
    el.addEventListener("input",h);el.addEventListener("change",h);
  });
  pb.querySelectorAll(".pt").forEach(b=>{if(lock){b.disabled=true;return;}b.onclick=()=>{const i=+b.dataset.p;F.photos[i]=!F.photos[i];b.classList.toggle("on",F.photos[i]);b.setAttribute("aria-pressed",F.photos[i]);};});
  const ck=$("ck");
  if(ck&&!lock)ck.onclick=()=>{const t=new Date(D.visit.getTime()-3*60000);D.now=t;F.checkin=tfmt(t);
    $("ckw").innerHTML=`<div class="ckin">${ICO.pin.replace('aria-hidden','style="width:18px;height:18px" aria-hidden')} Checked in ${F.checkin} · GPS matches address</div>`;
    log(`${esc(D.rep.n)} checked in on site`,"GPS within 0.1 mi of the address");};
  if(ck&&lock)ck.disabled=true;
  if(F.outcome==="sold")initSig();
  const sub=$("pSub");
  if(sub)sub.onclick=()=>{
    const er=[];const price=+F.price;
    if(!F.checkin)er.push("Check in at the property");
    if(!F.dm)er.push("Who was present");
    if(!(price>0))er.push("Price quoted");
    if(!F.outcome)er.push("Outcome");
    if(F.outcome==="sold"&&!F.sig)er.push("Customer signature");
    if(F.outcome==="second"&&!F.d2)er.push("2nd meeting time");
    if(F.outcome==="lost"&&!F.reason)er.push("Main reason");
    if(er.length){$("pErr").innerHTML=`<div class="perr">Please complete: ${er.join(", ")}.</div>`;$("pErr").scrollIntoView({block:"nearest"});return;}
    $("pErr").innerHTML="";
    const net=price*(1-F.disc/100);
    D.res={o:F.outcome,price,net,disc:F.disc,need:F.disc>10&&F.outcome!=="lost"};
    D.now=new Date(D.visit.getTime()+48*60000);
    log("Visit result submitted from rep portal",`${{sold:"Sold",second:"2nd meeting",lost:"Not sold"}[F.outcome]} · ${money(price)}${F.disc?` · ${F.disc}% discount`:""} · ${F.photos.filter(Boolean).length} photos`);
    complete(3);go(4);
  };
}
function initSig(){
  const c=$("sig");if(!c||c.dataset.ok)return;c.dataset.ok=1;
  const r=c.getBoundingClientRect();if(!r.width){return;}
  const dpr=window.devicePixelRatio||1;c.width=r.width*dpr;c.height=r.height*dpr;
  const x=c.getContext("2d");x.scale(dpr,dpr);x.lineWidth=2.2;x.lineCap="round";x.lineJoin="round";x.strokeStyle="#0D1B2A";
  if(D.f.sig){const im=new Image();im.onload=()=>x.drawImage(im,0,0,r.width,r.height);im.src=D.f.sig;}
  if(D.res)return;
  let down=false;
  const pos=e=>{const b=c.getBoundingClientRect();return[e.clientX-b.left,e.clientY-b.top];};
  c.onpointerdown=e=>{down=true;c.setPointerCapture(e.pointerId);const p=pos(e);x.beginPath();x.moveTo(p[0],p[1]);};
  c.onpointermove=e=>{if(!down)return;const p=pos(e);x.lineTo(p[0],p[1]);x.stroke();};
  c.onpointerup=()=>{if(!down)return;down=false;D.f.sig=c.toDataURL();$("sigS").textContent="Signed ✓";};
  $("sigC").onclick=()=>{x.clearRect(0,0,c.width,c.height);D.f.sig=null;$("sigS").textContent="Sign above";};
}

/* ---------- step 5: automation ---------- */
function flowSteps(){
  const R=D.res,F=D.f,s=[];
  s.push(["check","Site Visit SV-10428 → Completed","Check-in time, answers and photos saved on the record"]);
  s.push(["sync","Results synced to the Lead and Opportunity","Nobody retypes anything; the customer's history stays complete"]);
  if(R.need)s.push(["lock",`Approval request: ${R.disc}% discount`,"Over the 10% limit, so the quote is locked until the sales manager approves","w"]);
  if(R.o==="sold"){
    if(R.need){s.push(["dollar","Opportunity → Contract signed, pending approval",`${money(R.net)} after discount · Closed Won once approved`,"w"]);
      s.push(["box","Job creation waiting for approval","Starts automatically the moment the discount is approved"]);}
    else{s.push(["dollar",`Opportunity → Closed Won · ${money(R.net)}`,R.disc?`${R.disc}% discount applied`:"No discount"]);
      s.push(["box","Job J-2231 created","Production checklist, material order and crew tasks assigned"]);
      s.push(["sync",`${esc(F.deposit)} deposit invoice sent to QuickBooks`,"Payment link texted to the customer"]);}
    s.push(["msg","Welcome text and email to the homeowner","What happens next and who their project coordinator is"]);
  }else if(R.o==="second"){
    s.push(["dollar","Opportunity → 2nd meeting",`${money(R.net)} quoted`]);
    s.push(["cal",`2nd meeting booked: ${esc(F.d2)}`,`Added to ${esc(D.rep.n)}'s calendar, invite sent to the homeowner`]);
    s.push(["msg","Confirmation SMS to the homeowner","Reminders 24 hrs and 2 hrs before, same as the first visit"]);
    s.push(["task","Prep task for the rep","Bring financing options and the photo report"]);
  }else{
    s.push(["x",`Opportunity → Closed Lost · ${esc(F.reason)}`,"Loss reason captured for reporting, not buried in a text","r"]);
    if(F.reason==="Price too high"||F.reason==="Needs financing")s.push(["mail","Financing offer email in 2 days","Monthly-payment options often bring price objections back"]);
    if(F.nurture)s.push(["mail","Added to 90-day follow-up","Email and SMS check-ins, stops automatically if they reply"]);
    s.push(["task",`Re-engage task for ${esc(D.rep.n)} in 60 days`,"With the visit notes and photos attached"]);
  }
  s.push(["bell","Sales manager notified","Slack, email and SMS summary sent instantly"]);
  return s;
}
const OUT={sold:["SOLD","g",""],second:["2ND MEETING","w","w"],lost:["NOT SOLD","r","r"]};
function kv(){
  const F=D.f,R=D.res;
  const tr={roof:[["Roof",`${F.roofType}, ${F.squares} sq, ${F.layers} layer(s)`],["Insurance",F.ins==="Yes"?`Claim ${F.claim||"pending"}`:"No"]],
   hvac:[["System",`${F.sys}, ${F.tons} ton, ${F.age} yrs`],["Option",F.opt]],
   remodel:[["Project",`${F.room}, ${F.sqft} sq ft`],["Finish / budget",`${F.finish}, ${F.budget}`]]}[F.trade];
  const o=[["Customer",`${D.lead.first} ${D.lead.last}`],["Service",svc().n],["Rep",D.rep.n],["Present",{All:"All decision makers",Some:"Only some",None:"No decision makers"}[F.dm]],...tr,
   ["Quoted",money(R.price)+(R.disc?` (${R.disc}% off → ${money(R.net)})`:"")]];
  if(R.o==="sold")o.push(["Deposit",F.deposit]);
  if(R.o==="second")o.push(["2nd meeting",F.d2]);
  if(R.o==="lost")o.push(["Reason",F.reason]);
  o.push(["Photos",`${F.photos.filter(Boolean).length} attached`],["Lead source",D.lead.src]);
  return o;
}
function apprBtns(){return D.res.need&&D.appr===null?`<div class="btns"><button class="dbtn" data-a="1">Approve ${D.res.disc}%</button><button class="dbtn red" data-a="0">Reject</button></div>`:D.res.need?`<div class="pill ${D.appr?"g":"r"}" style="margin-top:6px">${D.appr?"Approved":"Rejected"} by you</div>`:"";}
function notif(){
  const R=D.res,F=D.f,O=OUT[R.o],t=D.ntab;
  if(t==="slack")return `<div class="slk"><span class="av">SF</span><div><div class="who">Salesforce Visit Bot<small>#sales-results · ${tfmt(D.now)}</small></div>
    <div class="att ${O[2]}"><b><span class="pill ${O[1]}">${O[0]}</span> ${full()} · ${esc(R.o==="lost"?svc().n:money(R.net))}</b>
    <div class="kv">${kv().map(x=>`<span>${esc(x[0])}: <b>${esc(x[1])}</b></span>`).join("")}</div>
    ${F.notes?`<div style="font-size:13px;margin-top:4px"><span style="color:var(--muted)">Notes:</span> ${esc(F.notes)}</div>`:""}
    ${R.need?`<div class="wbox" style="margin-top:6px">${R.disc}% discount needs your approval</div>`:""}
    <div class="btns">${R.need&&D.appr===null?`<button class="dbtn" data-a="1">Approve</button><button class="dbtn red" data-a="0">Reject</button>`:""}<button class="dbtn sec" type="button">Open in Salesforce</button></div></div></div></div>`;
  if(t==="email")return `<div class="em-mock"><div class="eh"><b>Visit result: ${full()} · ${O[0]}${R.o!=="lost"?" · "+money(R.net):""}</b><span>From: Salesforce &lt;noreply@summithomepros.com&gt;</span><span>To: Sales Manager</span></div>
    <table>${kv().map(x=>`<tr><td>${esc(x[0])}</td><td>${esc(x[1])}</td></tr>`).join("")}${F.notes?`<tr><td>Notes</td><td>${esc(F.notes)}</td></tr>`:""}</table>${apprBtns()}</div>`;
  return `<div class="mph" style="max-width:340px"><div class="mph-s"><div class="mph-h"><b>Salesforce Alerts</b><span>Manager's phone</span></div><div class="mph-b"><div class="bub">${O[0]}: ${full()}, ${esc(svc().n.toLowerCase())}${R.o!=="lost"?`, ${money(R.net)}`:""}. Rep ${esc(D.rep.n)}.${R.need?` ${R.disc}% discount needs approval.`:""} Open: sfdc.link/SV10428<small>Text message</small></div></div></div></div>`;
}
function bindNotif(){
  const w=$("ntf");if(!w)return;
  w.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{D.ntab=b.dataset.t;renderNotif();});
  w.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>approve(b.dataset.a==="1"));
}
function renderNotif(){
  const w=$("ntf");if(!w)return;
  w.innerHTML=`<div class="dw fade"><div class="dw-bar"><i></i><i></i><i></i><span class="url">What the sales manager receives</span></div><div class="dw-b">
   <div class="tabs" role="tablist">${[["slack","Slack"],["email","Email"],["sms","SMS"]].map(x=>`<button role="tab" data-t="${x[0]}" aria-selected="${D.ntab===x[0]}">${x[1]}</button>`).join("")}</div>${notif()}</div></div>`;
  bindNotif();
}
function s4(st){
  const fs=flowSteps();
  st.innerHTML=`<div class="dw"><div class="dw-bar"><i></i><i></i><i></i><span class="url">Salesforce · Flow: Visit Result Submitted</span></div><div class="dw-b">
   <ol class="fr">${fs.map(s=>`<li class="${s[3]||""}"><i>${ICO[s[0]]}</i><div><b>${s[1]}</b><small>${s[2]}</small></div></li>`).join("")}</ol></div></div><div id="ntf"></div>`;
  const li=[...st.querySelectorAll(".fr li")];
  if(D.ran){li.forEach(l=>l.classList.add("on"));renderNotif();return;}
  li.forEach((l,i)=>later(()=>{l.classList.add("on");adv(2);
    const tmp=document.createElement("div");tmp.innerHTML=fs[i][1];log(tmp.textContent,null,fs[i][3]==="w"?"warn":"");
    if(i===li.length-1){D.ran=true;renderNotif();complete(4);}
  },500+i*600));
}

/* ---------- step 6: manager ---------- */
function approve(ok){
  if(D.appr!==null)return;D.appr=ok;adv(420);
  if(ok){log(`Discount ${D.res.disc}% approved by sales manager`,"Quote unlocked");
    if(D.res.o==="sold"){log(`Opportunity → Closed Won · ${money(D.res.net)}`);log("Job J-2231 created","Production checklist and crew tasks assigned");}
    else log("Revised quote sent to the homeowner for e-signature");}
  else log(`Discount ${D.res.disc}% rejected`,`${esc(D.rep.n)} asked to re-quote at 10% or less`,"warn");
  if(D.step===4)renderNotif();else SCREENS[D.step]($("dmStage"));
}
function s5(st){
  const R=D.res,F=D.f;
  const won=R.o==="sold"&&(!R.need||D.appr===true);
  const base=[{n:"Alex Brooks",v:2,s:1,r:18900},{n:"Jordan Nguyen",v:2,s:1,r:11850},{n:"Riya Silva",v:1,s:0,r:0},{n:"Sam Patel",v:1,s:0,r:0}];
  base.forEach(b=>{if(b.n===D.rep.n){b.v++;if(won){b.s++;b.r+=R.net;}}});
  base.sort((a,b)=>b.r-a.r||b.s-a.s);
  const V=base.reduce((a,b)=>a+b.v,0),S=base.reduce((a,b)=>a+b.s,0),REV=base.reduce((a,b)=>a+b.r,0);
  const pipe=R.o==="second"||(R.o==="sold"&&!won&&D.appr!==false)?R.net:0;
  let ap="";
  if(R.need){
    if(D.appr===null)ap=`<div class="apv"><b>Approval needed: ${R.disc}% discount</b><p>${esc(D.rep.n)} quoted ${money(R.price)} with ${R.disc}% off (${money(R.net)}) for ${full()}. Your limit for reps is 10%.</p><div class="btns"><button class="dbtn" data-a="1">Approve</button><button class="dbtn red" data-a="0">Reject</button></div></div>`;
    else ap=`<div class="apv ${D.appr?"done":"no"}"><b>${D.appr?"Approved":"Rejected"}: ${R.disc}% discount</b><p>${D.appr?(R.o==="sold"?"Opportunity moved to Closed Won and the Job was created automatically.":"Revised quote sent to the homeowner for e-signature."):`${esc(D.rep.n)} has a task to re-quote at 10% or less.`}</p></div>`;
  }
  const oc={sold:won?`${money(R.net)} sale`:"signed sale pending approval",second:"2nd meeting booked",lost:"closed lost, now in follow-up"}[R.o];
  st.innerHTML=`<div class="dw"><div class="dw-bar"><i></i><i></i><i></i><span class="url">Salesforce · Sales Manager Dashboard · Today</span></div><div class="dw-b" style="display:grid;gap:12px">
   ${ap}
   <div class="mgr-k">
    <div><small>Visits completed</small><b>${V}</b><em>+1 just now</em></div>
    <div><small>Sold today</small><b>${S}</b><em>${won?"+1 just now":"&nbsp;"}</em></div>
    <div><small>Close rate today</small><b>${Math.round(S/V*100)}%</b><em>target 35%</em></div>
    <div><small>Revenue sold</small><b>${money(REV)}</b><em>${pipe?`+${money(pipe)} pipeline`:"&nbsp;"}</em></div>
   </div>
   <table class="lb"><thead><tr><th>Rep</th><th>Visits</th><th>Sold</th><th>Revenue</th></tr></thead><tbody>${base.map(b=>`<tr class="${b.n===D.rep.n?"me":""}"><td>${b.n}</td><td>${b.v}</td><td>${b.s}</td><td>${money(b.r)}</td></tr>`).join("")}</tbody></table>
   <div class="attr">${ICO.chart}<span><b>${esc(D.lead.src)}</b> lead → ${oc}. Cost per lead and return on ad spend for ${esc(D.lead.src)} update on the marketing dashboard automatically.</span></div>
   <div class="attr">${ICO.check}<span>Total time from web form to a result on this screen: <b>no manual data entry</b>. Every step is in the record's history for coaching and audits.</span></div>
   <div class="endcta"><button class="dbtn sec" id="again">↺ Try another outcome</button><a class="dbtn" href="https://processiqautomation.com/contact" target="_blank" rel="noopener" style="text-decoration:none">I want this for my team →</a></div>
  </div></div>`;
  st.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>approve(b.dataset.a==="1"));
  $("again").onclick=()=>{
    // keep lead, rep and visit; reopen the form
    D.res=null;D.ran=false;D.appr=null;D.ntab="slack";D.max=3;const tr=D.f.trade;D.f=null;initForm();D.f.trade=tr;D.f.price=String({roof:21400,hvac:11850,remodel:46900}[tr]);
    D.now=new Date(D.visit.getTime()-5*60000);log("Demo reset to the visit form","Try a different outcome or a bigger discount");go(3);
  };
}
const SCREENS=[s0,s1,s2,s3,s4,s5];
$("dmBack").onclick=()=>{if(D.step>0)go(D.step-1);};
$("dmNext").onclick=()=>{if(D.step===STEPS.length-1){restart();return;}if(D.step<D.max)go(D.step+1);};
fresh();$("dmLog").innerHTML='<li class="empty">Nothing yet. Submit the form to start.</li>';
D.step=0;chrome();s0($("dmStage"));
})();
