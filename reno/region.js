/* Region mode: ?rg=on switches demo place names and platforms to Ontario.
   Remembered for the visit. Real case-study text (#case) is never changed. */
(function(){
var on=false;
try{
  var q=new URLSearchParams(location.search).get("rg");
  if(q==="on")sessionStorage.setItem("rg","on");
  if(q==="us")sessionStorage.removeItem("rg");
  on=sessionStorage.getItem("rg")==="on";
}catch(e){on=new URLSearchParams(location.search).get("rg")==="on";}
if(!on)return;
window.RG="on";document.documentElement.setAttribute("data-rg","on");
var MAP=[
 [/Angi, Yelp and Thumbtack/g,"HomeStars, Houzz and Google"],
 [/Angi \/ HomeAdvisor/g,"Quotes & reviews"],[/US remodeling stack/gi,"Canadian remodeling stack"],[/\bUS\b home-improvement platforms/g,"Canadian home-improvement platforms"],
 [/Irvine, CA/g,"Oakville, ON"],[/Irvine/g,"Oakville"],[/Tustin/g,"Burlington"],
 [/Long Beach/g,"Mississauga"],[/Newport Beach/g,"Oakville"],[/Huntington Beach/g,"Burlington"],
 [/Santa Ana/g,"Brampton"],[/Costa Mesa/g,"Milton"],[/Anaheim/g,"Vaughan"],[/Pasadena/g,"Markham"],
 [/San Diego/g,"Toronto"],[/Los Angeles/g,"Toronto"],[/Orange County/g,"Halton Region"],
 [/Reno, NV/g,"Barrie"],[/\bAngi\b/g,"HomeStars"],[/\bZIP codes\b/g,"postal codes"],[/\bZIPs\b/g,"postal codes"],[/\bZIP\b/g,"postal code"]
];
var SKIP="#case,script,style,textarea,input,select,code,pre";
function fix(node){
  var w=document.createTreeWalker(node,NodeFilter.SHOW_TEXT),n,list=[];
  while((n=w.nextNode()))list.push(n);
  list.forEach(function(t){
    if(!t.nodeValue||!/[A-Za-z]/.test(t.nodeValue))return;
    var p=t.parentElement;if(!p||p.closest(SKIP))return;
    var v=t.nodeValue,o=v;MAP.forEach(function(m){v=v.replace(m[0],m[1]);});
    if(v!==o)t.nodeValue=v;
  });
  var src=document.querySelector('#pqForm input[name="source"]');
  if(src&&!/Ontario/.test(src.value))src.value+=" (Ontario)";
}
function start(){
  fix(document.body);
  var busy=false;
  new MutationObserver(function(ms){
    if(busy)return;busy=true;
    ms.forEach(function(m){
      if(m.type==="characterData")fix(m.target.parentNode||document.body);
      else m.addedNodes.forEach(function(a){if(a.nodeType===1)fix(a);else if(a.nodeType===3&&a.parentNode)fix(a.parentNode);});
    });
    busy=false;
  }).observe(document.body,{childList:true,subtree:true,characterData:true});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();
