/* ===== Integrations hub ===== */
(function(){
const $=id=>document.getElementById(id);
const hub=$("igHub");if(!hub)return;
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const IN=[["Houzz","Houzz Pro leads","#4DA02C","Hz"],["Angi","Angi / HomeAdvisor","#E8574A","An"],["Thumbtack","Quote requests","#1C93C9","Tt"],["Yelp","Request a quote","#C8312F","Yp"],["Google LSA","Local Services Ads","#3B6FD8","LS"],["Meta Lead Ads","Facebook & Instagram","#7B5CE0","Me"],["Nextdoor","Neighborhood leads","#2E9E6B","Nd"],["CallRail","Tracked calls & texts","#D9A12B","CR"]];
const OUT=[["Buildertrend","Job created","#2B6CB0","Bt","job created"],["JobTread","Project + budget","#B7791F","JT","project + budget created"],["ServiceTitan","Job booked","#C05621","ST","job booked"],["DocuSign","Contract sent","#D69E2E","DS","contract sent for e-signature"],["GreenSky","Financing offered","#2F855A","GS","financing link sent"],["QuickBooks","Invoice synced","#2C7A7B","QB","deposit invoice synced"],["Google reviews","Review requested","#3B6FD8","G★","review request texted"],["Looker Studio","Dashboard updated","#5A67D8","LK","cost per lead updated"]];
const JOBS=["Kitchen remodel · Irvine","Bath remodel · Tustin","ADU · Pasadena","Roof · San Diego","Flooring · Santa Ana","Windows · Costa Mesa","Deck · Newport Beach","Whole-home · Encinitas"];
const li=(a,side)=>`<li style="--c:${a[2]}"><i>${a[3]}</i><span>${a[0]}<small>${a[1]}</small></span></li>`;
$("igIn").innerHTML=IN.map(a=>li(a)).join("");$("igOut").innerHTML=OUT.map(a=>li(a)).join("");
const CATS=[
 ["🏠","Lead marketplaces","Shared and exclusive leads, routed the second they arrive.",["Houzz Pro","Angi","HomeAdvisor","Thumbtack","Yelp","Porch","Networx","Modernize","BuildZoom","Bark"]],
 ["📣","Ads & local listings","Every ad lead tagged with its campaign and cost.",["Google Ads","Google Local Services Ads","Google Business Profile","Meta Lead Ads","Instagram","Nextdoor","Microsoft Ads"]],
 ["📞","Calls, texts & chat","Calls logged, missed calls texted back, chats saved.",["CallRail","Dialpad","RingCentral","Twilio","Podium","Website chat","AI voice agents"]],
 ["🛠","Project & field tools","Closed Won turns into a job without retyping.",["Buildertrend","JobTread","CoConstruct","ServiceTitan","Jobber","Housecall Pro","CompanyCam","Procore"]],
 ["✍️","Estimates, e-sign & financing","Quotes, contracts and payment plans from the deal.",["DocuSign","PandaDoc","GreenSky","Hearth","Wisetack","Service Finance"]],
 ["💵","Accounting & payments","Deposits and invoices in sync with the books.",["QuickBooks Online","Xero","Stripe","Square"]],
 ["⭐","Reviews & reputation","Review requests sent automatically after every job.",["Google reviews","Yelp reviews","Houzz reviews","NiceJob","Birdeye","Podium Reviews"]],
 ["🔗","Calendar, email & reporting","Visits on calendars, email synced, numbers in one view.",["Google Workspace","Microsoft 365 / Outlook","Calendly","Zapier","Make","HubSpot","Mailchimp","Looker Studio"]]];
$("igGrid").innerHTML=CATS.map(c=>`<div class="ig-cat"><h3><span>${c[0]}</span>${c[1]}</h3><p>${c[2]}</p><div>${c[3].map(x=>`<span>${x}</span>`).join("")}</div></div>`).join("");
const svg=$("igSvg"),NS="http://www.w3.org/2000/svg";let pin=[],pout=[];
const inEls=[...$("igIn").children],outEls=[...$("igOut").children],orb=$("igOrb");
function draw(){
 svg.innerHTML="";pin=[];pout=[];if(innerWidth<=900)return;
 const H=hub.getBoundingClientRect(),O=orb.getBoundingClientRect(),cx=O.left-H.left+O.width/2,cy=O.top-H.top+O.height/2,r=O.width/2-10;
 const mk=(d)=>{const p=document.createElementNS(NS,"path");p.setAttribute("d",d);p.setAttribute("class","ln");svg.appendChild(p);return p;};
 inEls.forEach(e=>{const b=e.getBoundingClientRect(),x=b.right-H.left,y=b.top-H.top+b.height/2,ex=cx-r,ey=cy+(y-cy)*.25;pin.push(mk(`M${x} ${y} C ${x+40} ${y}, ${ex-50} ${ey}, ${ex} ${ey}`));});
 outEls.forEach(e=>{const b=e.getBoundingClientRect(),x=b.left-H.left,y=b.top-H.top+b.height/2,sx=cx+r,sy=cy+(y-cy)*.25;pout.push(mk(`M${sx} ${sy} C ${sx+50} ${sy}, ${x-40} ${y}, ${x} ${y}`));});
}
function dot(path,col,dur,done){
 if(!path||reduce){done();return;}
 path.classList.add("on");const L=path.getTotalLength(),c=document.createElementNS(NS,"circle");c.setAttribute("r",5);c.setAttribute("fill",col);c.setAttribute("stroke","#fff");c.setAttribute("stroke-width","2");svg.appendChild(c);
 const t0=performance.now();(function f(now){const t=Math.min(1,(now-t0)/dur),e=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,p=path.getPointAtLength(e*L);c.setAttribute("cx",p.x);c.setAttribute("cy",p.y);if(t<1)requestAnimationFrame(f);else{c.remove();path.classList.remove("on");done();}})(t0);
}
const feed=$("igFeed");let n=2480,clock=9*60+2;
function log(html){const t=`${Math.floor(clock/60)}:${String(clock%60).padStart(2,"0")}`;clock+=1+Math.floor(Math.random()*3);const l=document.createElement("li");l.innerHTML=`<em>${t}</em><span>${html}</span>`;feed.prepend(l);while(feed.children.length>5)feed.lastChild.remove();}
let k=0,vis=false,busy=false;
function cycle(){
 if(!vis){busy=false;return;}busy=true;
 const i=k%IN.length,o=(k*3+1)%OUT.length,job=JOBS[k%JOBS.length];k++;n++;
 const a=IN[i],b=OUT[o];inEls[i].classList.add("hot");
 dot(pin[i],a[2],1100,()=>{inEls[i].classList.remove("hot");orb.classList.remove("pulse");void orb.offsetWidth;orb.classList.add("pulse");
  log(`<b>${a[0]}</b> lead → CRM #${n} · ${job}`);
  setTimeout(()=>{outEls[o].classList.add("hot");dot(pout[o],b[2],1100,()=>{log(`CRM #${n} → <b>${b[0]}</b>: ${b[4]}`);setTimeout(()=>outEls[o].classList.remove("hot"),500);setTimeout(cycle,500);});},350);
 });
}
draw();let rt=0;addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(draw,200);});
addEventListener("load",draw);
log(`<b>Houzz</b> lead → CRM #2479 · Kitchen remodel · Irvine`);log(`CRM #2479 → <b>Google reviews</b>: review request texted`);
if("IntersectionObserver" in window)new IntersectionObserver(es=>es.forEach(e=>{vis=e.isIntersecting;if(vis){draw();if(!busy)cycle();}}),{threshold:.25}).observe(hub);else{vis=true;cycle();}
/* stats count */
document.querySelectorAll(".ig-stats b").forEach(b=>{const N=+b.dataset.n,s=b.dataset.s||"";if(b.dataset.z){b.textContent="0";return;}
 const go=()=>{const t0=performance.now();const f=t=>{const p=Math.min(1,(t-t0)/1200);b.textContent=Math.round(N*(1-Math.pow(1-p,3)))+(p===1?s:"");if(p<1)requestAnimationFrame(f);};requestAnimationFrame(f);};
 if("IntersectionObserver" in window){const o=new IntersectionObserver(es=>{if(es[0].isIntersecting){o.disconnect();go();}},{threshold:.6});o.observe(b);}else go();});
})();
