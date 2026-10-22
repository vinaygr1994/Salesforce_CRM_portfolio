(function(){
const $=id=>document.getElementById(id);
const NAVY="#1E2A44",OR="#F26B3A",GR="#2E9E6B",GOLD="#C9973F",SL="#7C93A8",OAK="#C89B6D";
const nc=(t,col,ic,lab,title,sub,time)=>`<div class="st nc" data-t="${t}"><span class="ic" style="background:${col}">${ic}</span><div><small style="color:${col}">${lab}</small><b>${title}</b><span>${sub}</span></div><time>${time}</time></div>`;
const S=[
 {k:"01 · Speed to lead",tab:"Speed to lead",img:"sk-speed.jpg",chip:"Kitchen remodel · Irvine",shade:"dark",dur:6200,
  h:"Replies in 38 seconds. Even at 9 PM.",
  li:["Web, ad and call leads land in one list, with no duplicates","A personal text goes out from the rep's number, instantly","The visit is booked and the right rep assigned by area and load"],
  html:()=>`<div class="st" data-t="0"><div class="sk-clock">9:14 PM</div><div class="sk-sub">Tuesday night. Your office is closed.</div></div>
   ${nc(500,OR,"!","New lead","Kitchen remodel · Irvine, CA","Budget $45–60K · via Google Ads","9:14 PM")}
   ${nc(1500,OAK,"✉","Text sent","“Hi Dana, thanks! Can we visit Sat?”","Personal, from the rep's number","9:14 PM")}
   ${nc(2600,GR,"✓","Visit booked","Saturday · 10:00 AM","Dana replied “Yes” · reminder set","9:16 PM")}
   ${nc(3700,NAVY,"A","Assigned","Alex Rivera · Sales rep","On his calendar and in the CRM","9:16 PM")}
   <div class="st badge" data-t="4700"><small>BOOKED IN</small><b>2 min 04 s</b></div>`},
 {k:"02 · AI lead scoring",tab:"AI lead scoring",img:"sk-ai.jpg",chip:"New lead calling",shade:"dark",dur:6800,
  h:"Knows which lead to call first.",
  li:["Scores budget, timeline, service area and project fit","Hot leads are routed in seconds; the rest are nurtured","Your rules: ZIP codes, minimum job size, trades you want"],
  html:()=>{const r=(t,n,p,q,tags,sc,lab,col)=>`<div class="st air" data-t="${t}" data-scan="${t+700}" data-score="${t+1300}"><div><b>${n}<em>${p}</em></b><q>${q}</q><div class="tg">${tags.map(x=>`<span>${x}</span>`).join("")}</div></div><div class="sc" style="background:${col}"><b>${sc}</b><small>${lab}</small></div></div>`;
   return `<div class="st ai-h" data-t="0"><small>AI LEAD INBOX</small><b>3 new leads overnight</b></div>
   ${r(300,"Dana Whitfield","Kitchen · Irvine","Budget around $60K. Want to start in January.",["Budget fits","Start &lt; 3 mo","In area"],94,"HOT",OR)}
   ${r(1600,"Sam Ortiz","Bath · Long Beach","Just looking at ideas for next year.",["No timeline","In area"],41,"NURTURE",GOLD)}
   ${r(2900,"J. Becker","Roof patch · Reno, NV","Cheapest price for a patch?",["Out of area","Small job"],18,"LOW FIT",SL)}
   <div class="st route-bar" data-t="4900">&#9654;&nbsp; Hot lead routed to Alex · called in 40 sec</div>`;}},
 {k:"03 · Quick follow-up",tab:"Quick follow-up",img:"sk-follow.jpg",chip:"Estimate sent · Bathroom",shade:"light",dur:7600,
  h:"3 texts between “we'll think about it” and signed.",
  li:["Day 2 text, day 5 alert when it's reopened, day 9 check-in","Stops automatically the moment they reply","E-sign and deposit in one tap"],
  html:()=>`<div class="st day" data-t="0" id="skDay"><small>FOLLOW-UP</small><b>Day 2</b></div>
   <div class="phone2 st" data-t="0"><div>
    <div class="who"><i>MS</i>Mark Sullivan</div>
    <div class="st bb sys" data-t="200">Day 2 · 10:04 AM</div>
    <div class="st bb me" data-t="500">Hi Mark, it's Alex. Any questions on the bathroom quote?</div>
    <div class="st typing" data-t="1300" data-out="2300"><i></i><i></i><i></i></div>
    <div class="st bb th" data-t="2300">Honestly, it's a bit over our budget.</div>
    <div class="st bb me" data-t="3300">Totally fair. Want me to send monthly payment options?</div>
    <div class="st typing" data-t="4100" data-out="4900"><i></i><i></i><i></i></div>
    <div class="st bb th" data-t="4900">Yes please.</div>
    <div class="st bb sys" data-t="5700" data-day="Day 7">Day 7 · 6:20 PM</div>
    <div class="st bb win" data-t="6100">✓ Signed · $3,800 deposit paid</div>
   </div></div>`},
 {k:"04 · Custom forms",tab:"Custom forms",img:"sk-form.jpg",chip:"On site · Roofing visit",shade:"light",dur:6400,
  h:"One form that adapts to the visit.",
  li:["Fields built for each trade: roofing, kitchen, bath, HVAC","Smart rules: claim # if insured, signature if sold","Every answer lands in your CRM, nothing retyped"],
  html:()=>`<div class="fm st" data-t="0"><h5>Roofing visit · SV-10428</h5>
   <div class="st ff" data-t="400"><label>Roof type</label><div>Asphalt shingle</div></div>
   <div class="st ff" data-t="1000"><label>Squares</label><div>28</div></div>
   <div class="st ff" data-t="1600"><label>Insurance claim?</label><div><span class="pill">Yes</span></div></div>
   <div class="st ff cond" data-t="2300"><label>Claim #</label><div>48-1192<span class="rule">IF insured</span></div></div>
   <div class="st ff" data-t="3300"><label>Outcome</label><div><span class="pill g">Sold</span><span style="font-size:12px;color:#5F6878">$21,400</span></div></div>
   <div class="st ff cond" data-t="4000"><label>Customer signature</label><div><svg class="sig" viewBox="0 0 120 22"><path d="M2 16 L14 5 L26 17 L40 4 L54 15 L74 7 L100 12"/></svg><span class="rule">IF sold</span></div></div>
   </div>
   <div class="st badge" data-t="5100" style="align-self:flex-start"><small>SAVED TO CRM</small><b>0 fields retyped</b></div>`},
 {k:"05 · In-home visits",tab:"In-home visits",img:"sk-visit.jpg",chip:"In-home visit · 11:30 AM",shade:"light",dur:6400,
  h:"Every visit booked, confirmed and reported.",
  li:["24 h and 2 h reminders, plus “on my way” with an ETA","GPS check-in, photos and signature on site","Manager summary the moment the result is submitted"],
  html:()=>`<div class="st mapc" data-t="0"><svg viewBox="0 0 320 150" aria-hidden="true">
     <rect width="320" height="150" fill="#ECF0F7"/>
     <g stroke="#fff" stroke-width="5">${[20,66,112,158,204,250,296].map(x=>`<line x1="${x}" y1="0" x2="${x+24}" y2="150"/>`).join("")}${[18,58,98,138].map(y=>`<line x1="0" y1="${y}" x2="320" y2="${y-10}"/>`).join("")}</g>
     <line x1="0" y1="130" x2="320" y2="20" stroke="#FFE2CD" stroke-width="9"/>
     <path class="rtd" d="M18 136 L70 100 L160 40 L262 82" fill="none" stroke="${OR}" stroke-width="3.5" stroke-linecap="round"/>
     <rect x="12" y="130" width="12" height="12" fill="${NAVY}"/>
     ${[[70,100,1],[160,40,2],[262,82,3]].map(([x,y,n],i)=>`<g class="st" data-t="${900+i*1000}"><circle cx="${x}" cy="${y}" r="11" fill="${OR}" stroke="#fff" stroke-width="3"/><text x="${x}" y="${y+4}" text-anchor="middle" font-size="11" font-weight="700" fill="#fff" font-family="DM Sans,Arial">${n}</text></g>`).join("")}
   </svg></div>
   <div class="st vc" data-t="900"><i>1</i><div><b><em>9:00 AM</em>Chen · Roof replacement</b><span>✓ Confirmed by text · 24 h + 2 h reminders</span></div></div>
   <div class="st vc" data-t="1900"><i>2</i><div><b><em>11:30 AM</em>Patel · Kitchen remodel</b><span>✓ Confirmed · both owners attending</span></div></div>
   <div class="st vc" data-t="2900"><i>3</i><div><b><em>3:00 PM</em>Ortiz · Primary bath</b><span>✓ “On my way” sent · ETA 3:02 PM</span></div></div>
   <div class="st route-bar" data-t="4300">✓ Results filed from the road · manager summary sent</div>`}
];
let cur=0,timers=[],auto=true,startT=0,raf=0,visible=false;
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
function clear(){timers.forEach(clearTimeout);timers=[];cancelAnimationFrame(raf);}
function tabs(){
  $("skTabs").innerHTML=S.map((s,i)=>`<button type="button" role="tab" aria-selected="${i===cur}" data-i="${i}"><b>${i+1}</b>${s.tab}</button>`).join("");
  $("skTabs").querySelectorAll("button").forEach(b=>b.onclick=()=>{auto=false;show(+b.dataset.i);});
}
function show(i){
  clear();cur=i;tabs();const s=S[i];
  const img=$("skImg");img.classList.add("swap");
  setTimeout(()=>{img.src="img/site/"+s.img;img.alt=s.chip;img.onload=()=>img.classList.remove("swap");if(img.complete)img.classList.remove("swap");},reduce?0:220);
  $("skShade").className="sk-shade "+s.shade;
  $("skChip").querySelector("b").textContent=s.chip;
  $("skK").textContent=s.k;$("skH").textContent=s.h;$("skL").innerHTML=s.li.map(x=>`<li>${x}</li>`).join("");
  const a=$("skAnim");a.innerHTML=s.html();
  $("skVisual").classList.remove("on");void $("skVisual").offsetWidth;$("skVisual").classList.add("on");
  play(s);
}
function play(s){
  const a=$("skAnim");
  const els=[...a.querySelectorAll("[data-t]")];
  if(reduce){els.forEach(e=>{if(e.dataset.out)e.classList.add("gone");else e.classList.add("in");e.classList.add("scored");});a.querySelectorAll(".air").forEach(e=>e.classList.add("scored"));$("skBar").style.width="100%";return;}
  els.forEach(e=>{
    timers.push(setTimeout(()=>{e.classList.add("in");if(e.dataset.day){const d=document.getElementById("skDay");if(d)d.querySelector("b").textContent=e.dataset.day;}},+e.dataset.t+150));
    if(e.dataset.out)timers.push(setTimeout(()=>e.classList.add("gone"),+e.dataset.out+150));
    if(e.dataset.scan)timers.push(setTimeout(()=>e.classList.add("scan"),+e.dataset.scan+150));
    if(e.dataset.score)timers.push(setTimeout(()=>e.classList.add("scored"),+e.dataset.score+150));
  });
  startT=performance.now();
  const tick=()=>{const p=Math.min(1,(performance.now()-startT)/s.dur);$("skBar").style.width=(p*100)+"%";if(p<1)raf=requestAnimationFrame(tick);};tick();
  timers.push(setTimeout(()=>{if(auto&&visible)show((cur+1)%S.length);},s.dur+2600));
}
$("skReplay").onclick=()=>show(cur);
tabs();
const sec=document.getElementById("skills");
if("IntersectionObserver" in window){
  let started=false;
  new IntersectionObserver(es=>{es.forEach(e=>{visible=e.isIntersecting;if(visible&&!started){started=true;show(0);}else if(visible&&auto&&!timers.length)show(cur);});},{threshold:.35}).observe(sec);
}else{visible=true;show(0);}
document.addEventListener("visibilitychange",()=>{if(document.hidden)clear();});
})();
