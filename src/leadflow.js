/* ===== Lead flow: paper planes into the CRM ===== */
(function(){
const $=id=>document.getElementById(id);
const stage=$("lfStage");if(!stage)return;
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const NS="http://www.w3.org/2000/svg";
const I={
 search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>',
 social:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M3 10v4h4l6 4V6L7 10z"/><path d="M17 9a4 4 0 0 1 0 6"/></svg>',
 web:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M7 13h6M7 16h4"/></svg>',
 phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
 ref:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="8" cy="8" r="3.2"/><circle cx="17" cy="9" r="2.6"/><path d="M2.5 19c.8-3.4 3-5 5.5-5s4.7 1.6 5.5 5M14 14.5c2.6-.6 5.6.6 6.5 4.5"/></svg>'};
const SRC=[
 {n:"Google Ads",d:"Search ad form",c:"#3B6FD8",ic:I.search},
 {n:"Meta Ads",d:"Instant form",c:"#8A5CF5",ic:I.social},
 {n:"Website",d:"Free-estimate form",c:"#F26B3A",ic:I.web},
 {n:"Phone call",d:"Tracked number",c:"#2E9E6B",ic:I.phone},
 {n:"Referral",d:"Past customer",c:"#D9A12B",ic:I.ref}];
const BASE=[
 {s:0,f:"Dana",l:"Whitfield",job:"Kitchen remodel",city:"Irvine",bud:"$60K",score:94,rep:"Alex Rivera",area:"Orange County",sec:38,visit:"Sat 10:00 AM"},
 {s:1,f:"Priya",l:"Patel",job:"Bathroom remodel",city:"Tustin",bud:"$28K",score:83,rep:"Alex Rivera",area:"Orange County",sec:41,visit:"Mon 5:30 PM"},
 {s:2,f:"Mark",l:"Chen",job:"Roof replacement",city:"San Diego",bud:"$21K",score:88,rep:"Maya Lopez",area:"San Diego",sec:35,visit:"Tue 9:00 AM",dup:1},
 {s:3,f:"Luis",l:"Ortiz",job:"HVAC install",city:"Anaheim",bud:"$14K",score:79,rep:"Alex Rivera",area:"Orange County",sec:44,visit:"Wed 2:00 PM"},
 {s:4,f:"Emma",l:"Brooks",job:"ADU build",city:"Pasadena",bud:"$180K",score:97,rep:"Jordan Kim",area:"Los Angeles",sec:31,visit:"Thu 11:00 AM"}];
const POOL=[["Sofia","Ramirez"],["Ben","Carter"],["Aisha","Khan"],["Tom","Walsh"],["Grace","Liu"],["Noah","Diaz"],["Olivia","Reed"],["Sam","Nguyen"]];
const STEP=[["Lead created",'<path d="M12 5v14M5 12h14"/>'],["Duplicate check",'<path d="M9 9h10v10H9zM5 15V5h10"/>'],["AI lead score",'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>'],["Assigned to a rep",'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>'],["Personal text sent",'<path d="M4 5h16v11H9l-5 4z"/>'],["Visit booked",'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>']];
const ck='<path d="m5 12 4.5 4.5L19 7"/>';
const svgI=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const cnt=[0,0,0,0,0];let total=0,booked=0,secSum=0,nextAuto=0,busy=false,queue=[],visible=false,autoT=0,used=0;
const btns=$("lfSrc"),list=$("lfList"),drop=$("lfDrop"),sky=$("lfSky"),steps=$("lfSteps");
btns.innerHTML=SRC.map((s,i)=>`<button type="button" class="lf-btn" style="--c:${s.c}" data-i="${i}"><span class="ic">${s.ic}</span><span>${s.n}<small>${s.d}</small></span><span class="n" id="lfN${i}"></span></button>`).join("");
steps.innerHTML=STEP.map(s=>`<li class="lf-step"><span class="lf-dot">${svgI(s[1])}</span><div><b>${s[0]}</b><div class="d"></div></div></li>`).join("");
drop.classList.add("wait");
const stepEls=[...steps.children];
btns.querySelectorAll("button").forEach(b=>b.onclick=()=>{clearTimeout(autoT);enqueue(+b.dataset.i,true);});

function makeLead(si){const b=BASE[si];const L={...b};if(cnt[si]>0){const p=POOL[used++%POOL.length];L.f=p[0];L.l=p[1];L.dup=0;L.score=Math.max(72,Math.min(98,b.score+((used*7)%11)-5));L.sec=b.sec+((used*5)%9)-4;}return L;}
function enqueue(si,user){if(queue.length>=3)return;queue.push(si);if(user){const b=btns.children[si];b.classList.remove("fire");void b.offsetWidth;b.classList.add("fire");}if(!busy)run();}
function rel(el,side){const r=el.getBoundingClientRect(),s=stage.getBoundingClientRect();
 const x=side==="r"?r.right-s.left-6:side==="b"?r.left-s.left+r.width/2:r.left-s.left+r.width/2;
 const y=side==="b"?r.bottom-s.top-4:r.top-s.top+r.height/2;return[x,y];}
const narrow=()=>stage.clientWidth<760;
function fly(si,done){
 const b=btns.children[si];const [sx,sy]=rel(b,narrow()?"b":"r");const [ex,ey]=rel(drop,"c");
 const c=SRC[si].c;const dx=ex-sx;
 const lift=narrow()?-50:-Math.min(140,60+Math.abs(sy-ey)*.3);
 const d=narrow()?`M${sx} ${sy} C ${sx+ (si<2?-60:60)} ${sy+70}, ${ex+(si<2?-90:90)} ${ey-90}, ${ex} ${ey}`
                 :`M${sx} ${sy} C ${sx+dx*.45} ${Math.min(sy,ey)+lift}, ${ex-dx*.35} ${ey-110}, ${ex} ${ey}`;
 const path=document.createElementNS(NS,"path");path.setAttribute("d",d);path.setAttribute("fill","none");
 sky.appendChild(path);const len=path.getTotalLength();
 const g=document.createElementNS(NS,"g");g.setAttribute("class","lf-plane");
 g.innerHTML=`<path d="M-15 -10 L17 0 L-15 10 L-8 0 Z" fill="${c}"/><path d="M-8 0 L17 0 L-15 10 Z" fill="#000" opacity=".22"/><path d="M-8 0 L17 0" stroke="#fff" stroke-width="1" opacity=".7"/>`;
 sky.appendChild(g);
 const dur=1500,t0=performance.now();let lastDot=0;
 const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
 (function step(now){const t=Math.min(1,(now-t0)/dur),e=ease(t),L=e*len;
  const p=path.getPointAtLength(L),q=path.getPointAtLength(Math.min(len,L+1.5));
  const ang=Math.atan2(q.y-p.y,q.x-p.x)*180/Math.PI+Math.sin(t*Math.PI*3)*6;
  const sc=.75+Math.sin(t*Math.PI)*.45-(t>.85?(t-.85)*3:0);
  g.setAttribute("transform",`translate(${p.x} ${p.y}) rotate(${ang}) scale(${Math.max(.3,sc)})`);
  if(L-lastDot>13){lastDot=L;const dt=document.createElementNS(NS,"circle");dt.setAttribute("cx",p.x);dt.setAttribute("cy",p.y);dt.setAttribute("r",2.6);dt.setAttribute("fill",c);dt.setAttribute("class","lf-dotp");sky.insertBefore(dt,g);setTimeout(()=>dt.remove(),950);}
  if(t<1)requestAnimationFrame(step);else{g.remove();path.remove();
   const pf=document.createElementNS(NS,"circle");pf.setAttribute("cx",ex);pf.setAttribute("cy",ey);pf.setAttribute("r",16);pf.setAttribute("fill","none");pf.setAttribute("stroke",c);pf.setAttribute("stroke-width",3);pf.setAttribute("class","lf-poof");sky.appendChild(pf);setTimeout(()=>pf.remove(),650);done();}
 })(t0);
}
function bump(id,v){const e=$(id);e.textContent=v;e.classList.remove("bump");void e.offsetWidth;e.classList.add("bump");}
function run(){
 if(!queue.length){busy=false;schedule();return;}
 busy=true;const si=queue.shift();const L=makeLead(si),S=SRC[si];
 cnt[si]++;$("lfN"+si).textContent=cnt[si];
 drop.classList.remove("wait");drop.querySelector("span").textContent=`Incoming from ${S.n}…`;
 stepEls.forEach(s=>{s.className="lf-step";s.querySelector(".d").innerHTML="";});
 $("lfWho").textContent=`${L.f} ${L.l}`;
 const go=()=>{
  drop.classList.add("hit");setTimeout(()=>drop.classList.remove("hit"),450);
  drop.querySelector("span").textContent="Lead received";
  list.querySelectorAll(".act").forEach(x=>x.classList.remove("act"));
  const li=document.createElement("li");li.className="lf-card new act";li.style.setProperty("--c",S.c);
  li.innerHTML=`<i>${L.f[0]}${L.l[0]}</i><div><b>${L.f} ${L.l}</b><span>${L.job} · ${L.city} · ${L.bud}</span><em class="tg">${S.n}</em></div><mark>New</mark>`;
  list.prepend(li);const items=[...list.children];
  if(items.length>4){const o=items[items.length-1];o.classList.add("out");setTimeout(()=>o.remove(),420);}
  total++;bump("lfK1",total);
  const mk=li.querySelector("mark");
  const D=[`Source: ${S.n} · ${L.job}`,
   L.dup?"Existing customer found · merged, no duplicate":"No match · new Contact and Account",
   `${L.score} / 100 · ${L.score>=90?"Hot":L.score>=82?"Warm-hot":"Warm"}<span class="lf-bar"><i></i></span>`,
   `${L.rep} · ${L.area} territory`,
   `“Hi ${L.f}, it's ${L.rep.split(" ")[0]}. Can we come by…”<em>${L.sec}s</em>`,
   `${L.visit} · on ${L.rep.split(" ")[0]}'s calendar · manager notified`];
  const marks=[null,null,()=>{mk.textContent=`Score ${L.score}`;mk.className=L.score>=88?"hot":"";},()=>{mk.textContent=L.rep.split(" ")[0];},()=>{mk.textContent="Texted";},()=>{mk.textContent="Visit booked ✓";mk.className="ok";}];
  const T=reduce?60:560;
  stepEls.forEach((s,i)=>{
   setTimeout(()=>{s.classList.add("act");s.querySelector(".d").innerHTML=D[i];if(i===2)requestAnimationFrame(()=>requestAnimationFrame(()=>{const b=s.querySelector(".lf-bar i");if(b)b.style.width=L.score+"%";}));},200+i*T);
   setTimeout(()=>{s.classList.remove("act");s.classList.add("done");s.querySelector(".lf-dot").innerHTML=svgI(ck);if(marks[i])marks[i]();
     if(i===4){secSum+=L.sec;bump("lfK2",Math.round(secSum/total)+"s");}
     if(i===5){booked++;bump("lfK3",booked);drop.classList.add("wait");drop.querySelector("span").textContent="Waiting for the next lead…";setTimeout(run,reduce?300:1500);}
   },200+i*T+T-80);
  });
  setTimeout(()=>stepEls.forEach((s,i)=>s.querySelector(".lf-dot").innerHTML=svgI(i<6&&s.classList.contains("done")?ck:STEP[i][1])),0);
 };
 if(reduce)go();else fly(si,go);
}
function schedule(){clearTimeout(autoT);if(!visible)return;autoT=setTimeout(()=>{if(!busy&&visible)enqueue(nextAuto++%SRC.length);},900);}
if("IntersectionObserver" in window){new IntersectionObserver(es=>es.forEach(e=>{visible=e.isIntersecting;if(visible&&!busy)schedule();}),{threshold:.3}).observe(stage);}else{visible=true;schedule();}
})();

/* ===== Data model story ===== */
(function(){
const erd=document.querySelector(".erd");if(!erd)return;
const svg=erd.querySelector("svg");const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const E=[...svg.querySelectorAll(".ee")],N=[...svg.querySelectorAll(".en")];
E.forEach((e,i)=>{e.setAttribute("pathLength","1");e.style.animationDelay=(.5+i*.12)+"s";});
N.forEach((n,i)=>n.style.animationDelay=(i*.08)+"s");
const cap=document.createElement("div");cap.className="erd-cap";cap.innerHTML='<i id="erdI">1/9</i><b id="erdT">A web lead lands in Salesforce as a Lead.</b><button type="button" id="erdP" aria-label="Pause story">❚❚</button>';erd.appendChild(cap);
const NS="http://www.w3.org/2000/svg";
const halo=document.createElementNS(NS,"circle");halo.setAttribute("r",11);halo.setAttribute("fill","rgba(242,107,58,.25)");
const pk=document.createElementNS(NS,"circle");pk.setAttribute("r",5.5);pk.setAttribute("fill","#F26B3A");pk.setAttribute("stroke","#fff");pk.setAttribute("stroke-width","2");
const pg=document.createElementNS(NS,"g");pg.append(halo,pk);pg.style.opacity=0;svg.appendChild(pg);
// [edge index or -1, node index, caption]
const ST=[[-1,0,"A web lead lands in Salesforce as a Lead."],
 [0,1,"Converted once: one Account and Contact, duplicates blocked."],
 [1,2,"An Opportunity tracks the deal value and stage."],
 [3,4,"The in-home Site Visit is booked and linked to the deal."],
 [2,3,"A Quote with line items goes out for e-signature."],
 [4,5,"Closed Won creates the Job for the crew automatically."],
 [5,6,"Change orders are tracked against the same deal."],
 [6,8,"The finished job is invoiced through accounting."],
 [7,7,"Assets and maintenance agreements renew on their own."]];
let k=0,paused=false,timer=0,started=false;
const T=$=>document.getElementById($);
function at(i){const n=N[ST[i][1]];N.forEach(x=>x.classList.remove("hit"));void n.getBBox();n.classList.add("hit","seen");}
function caption(i){const t=T("erdT");t.classList.add("fade");setTimeout(()=>{t.textContent=ST[i][2];T("erdI").textContent=(i+1)+"/"+ST.length;t.classList.remove("fade");},220);}
function travel(e,cb){const len=e.getTotalLength();const t0=performance.now(),dur=900;E.forEach(x=>x.classList.remove("on"));e.classList.add("on");pg.style.opacity=1;
 (function f(now){const t=Math.min(1,(now-t0)/dur),q=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;const p=e.getPointAtLength(q*len);pg.setAttribute("transform",`translate(${p.x} ${p.y})`);if(t<1)requestAnimationFrame(f);else cb();})(t0);}
function step(){if(paused)return;const s=ST[k];caption(k);
 const after=()=>{at(k);k=(k+1)%ST.length;if(k===0){timer=setTimeout(()=>{N.forEach(n=>n.classList.remove("seen","hit"));E.forEach(x=>x.classList.remove("on"));pg.style.opacity=0;step();},2600);}else timer=setTimeout(step,1500);};
 if(s[0]<0){const b=N[0].getBBox();pg.setAttribute("transform",`translate(${b.x+b.width-6} ${b.y+b.height/2})`);pg.style.opacity=1;after();}
 else travel(E[s[0]],after);}
T("erdP").onclick=function(){paused=!paused;this.textContent=paused?"▶":"❚❚";this.setAttribute("aria-label",paused?"Play story":"Pause story");if(!paused){clearTimeout(timer);step();}};
if(reduce){N.forEach(n=>n.classList.add("seen"));return;}
erd.classList.add("anim");
new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting&&!started){started=true;erd.classList.add("go");timer=setTimeout(step,1800);o.disconnect();}}),{threshold:.35}).observe(erd);
})();

/* ===== Case study build-up ===== */
(function(){
const c=document.querySelector(".case");if(!c)return;
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const items=[...c.querySelectorAll(".built>div")],res=[...c.querySelectorAll(".res span")];
const pb=c.querySelector(".bprog i"),pv=c.querySelector(".bprog b");
c.classList.add("play");
if(reduce){if(pb){pb.style.width="100%";pv.textContent="100%";}return;}
c.classList.add("anim");
new IntersectionObserver((es,o)=>es.forEach(e=>{if(!e.isIntersecting)return;o.disconnect();
 items.forEach((it,i)=>setTimeout(()=>{it.classList.add("on");const p=Math.round((i+1)/items.length*100);if(pb){pb.style.width=p+"%";pv.textContent=p+"%";}},500+i*750));
 res.forEach((r,i)=>setTimeout(()=>r.classList.add("on"),500+items.length*750+i*180));
}),{threshold:.3}).observe(c);
})();
