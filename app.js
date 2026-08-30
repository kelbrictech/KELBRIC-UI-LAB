
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

$('[data-action="fade"]').onclick=()=>$('#fadeBox').classList.toggle('go');
$('[data-action="spring"]').onclick=()=>{let e=$('#springDot');e.classList.remove('go');void e.offsetWidth;e.classList.add('go')};
$('[data-action="stagger"]').onclick=()=>{let e=$('#staggerStage');e.classList.remove('go');void e.offsetWidth;e.classList.add('go')};
$('[data-action="drawer"]').onclick=()=>$('#drawer').classList.toggle('open');
$('[data-action="flip"]').onclick=()=>$('#flipCard').classList.toggle('on');
$('[data-action="success"]').onclick=()=>{let e=$('#successBadge');e.textContent='DONE';e.classList.remove('go');void e.offsetWidth;e.classList.add('go');setTimeout(()=>e.textContent='READY',800)};
$('[data-action="compact"]').onclick=()=>$('#compact').classList.toggle('open');
$('[data-action="rack"]').onclick=()=>$('#rack').classList.toggle('on');
$('[data-action="inspootd"]').onclick=()=>{let e=$('#inspootd');e.classList.remove('on');void e.offsetWidth;e.classList.add('on')};

$('#reduceMotion').onclick=()=>{document.body.classList.toggle('reduced');$('#reduceMotion').textContent=document.body.classList.contains('reduced')?'Motion reduced':'Reduce motion'};

// Drag + snap
const ds=$('#dragStage'), puck=$('#dragPuck');
let pd=false, po={x:0,y:0}, start={x:0,y:0};
function point(e){let t=e.touches?e.touches[0]:e;return{x:t.clientX,y:t.clientY}}
function startDrag(e){pd=true;let p=point(e);po=p;start={x:puck.offsetLeft,y:puck.offsetTop};e.preventDefault()}
function moveDrag(e){if(!pd)return;let p=point(e),r=ds.getBoundingClientRect();let x=Math.max(0,Math.min(r.width-puck.offsetWidth,start.x+p.x-po.x));let y=Math.max(0,Math.min(r.height-puck.offsetHeight,start.y+p.y-po.y));puck.style.left=x+'px';puck.style.top=y+'px'}
function endDrag(){if(!pd)return;pd=false;let r=ds.getBoundingClientRect(),x=puck.offsetLeft;let target=x<r.width/2?8:r.width-puck.offsetWidth-8;puck.animate([{left:x+'px'},{left:target+'px'}],{duration:260,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});puck.style.left=target+'px'}
puck.addEventListener('pointerdown',startDrag);window.addEventListener('pointermove',moveDrag);window.addEventListener('pointerup',endDrag);

// Swipe card
const swipe=$('#swipeCard');let sx=0,dx=0,sw=false;
swipe.addEventListener('pointerdown',e=>{sw=true;sx=e.clientX;swipe.setPointerCapture(e.pointerId)});
swipe.addEventListener('pointermove',e=>{if(!sw)return;dx=e.clientX-sx;swipe.style.transform=`translateX(${dx}px) rotate(${dx/20}deg)`});
swipe.addEventListener('pointerup',e=>{sw=false;if(Math.abs(dx)>90){swipe.animate([{opacity:1},{opacity:0,transform:`translateX(${Math.sign(dx)*360}px) rotate(${Math.sign(dx)*20}deg)`}],{duration:280});setTimeout(()=>{swipe.style.transform='';swipe.textContent='AGAIN'},300)}else swipe.style.transform='';dx=0});

// Long press
let holdTimer;
$('#holdButton').addEventListener('pointerdown',()=>{ $('#holdStatus').textContent='Holding…'; holdTimer=setTimeout(()=>{$('#holdStatus').textContent='LONG PRESS FIRED';navigator.vibrate?.(40)},650)});
['pointerup','pointerleave','pointercancel'].forEach(ev=>$('#holdButton').addEventListener(ev,()=>{clearTimeout(holdTimer);if($('#holdStatus').textContent==='Holding…')$('#holdStatus').textContent='Released early'}));

// Studio pull-down: drag directly, tap when open = selected
const sheet=$('#studioSheet'), handle=$('#pullHandle'), state=$('#studioState');
let pull=false,py=0,base=-330,current=-330;
const CLOSED=-330, OPEN=0;
function applyStudio(y){current=Math.max(CLOSED,Math.min(OPEN,y));sheet.style.transform=`translateY(${current}px)`;handle.style.transform=`translateY(${current-CLOSED}px)`;state.textContent=current>-70?'UNFURLED — tap backdrop to SELECT':'PREVIEWING — keep pulling'}
function pstart(e){pull=true;py=e.clientY;base=current;handle.setPointerCapture?.(e.pointerId)}
function pmove(e){if(!pull)return;applyStudio(base+(e.clientY-py));e.preventDefault()}
function pend(){if(!pull)return;pull=false;let dest=current>(CLOSED/2)?OPEN:CLOSED;sheet.animate([{transform:`translateY(${current}px)`},{transform:`translateY(${dest}px)`}],{duration:300,easing:'cubic-bezier(.2,.8,.2,1)'});current=dest;sheet.style.transform=`translateY(${dest}px)`;handle.style.transform=`translateY(${dest-CLOSED}px)`;state.textContent=dest===OPEN?'UNFURLED — tap backdrop to SELECT':'ROLLED — swipe down to preview'}
handle.addEventListener('pointerdown',pstart);window.addEventListener('pointermove',pmove,{passive:false});window.addEventListener('pointerup',pend);
sheet.addEventListener('pointerdown',e=>{if(current===CLOSED)pstart(e)});
sheet.addEventListener('click',()=>{if(current===OPEN){state.textContent='SELECTED ✓ — mode switched';sheet.classList.toggle('selected')}});

// Preview / commit
let choice=null;
$$('#previewGrid button').forEach(b=>b.onclick=()=>{choice=b.dataset.choice;$$('#previewGrid button').forEach(x=>x.classList.toggle('on',x===b));$('#previewChoice').textContent=`Previewing ${choice}`;$('#commitChoice').disabled=false});
$('#commitChoice').onclick=()=>{$('#previewChoice').textContent=`SELECTED ${choice} ✓`};

// Heart and toggle
$('#heart').onclick=()=>{let h=$('#heart'),on=h.getAttribute('aria-pressed')==='true';h.setAttribute('aria-pressed',String(!on));h.textContent=!on?'♥':'♡';h.classList.toggle('on',!on)};
$('#demoToggle').onchange=e=>$('#toggleStatus').textContent=e.target.checked?'ON':'OFF';

// Compare
$('#compareRange').oninput=e=>$('#compareFront').style.clipPath=`inset(0 ${100-e.target.value}% 0 0)`;

// Lightbox
$('#openLightbox').onclick=()=>$('#lightbox').showModal();
$('#closeLightbox').onclick=()=>$('#lightbox').close();
