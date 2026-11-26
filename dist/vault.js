import { apps, desktop, icon, renderApp, articleRows, escape } from './apps.js';
import { profile, projects, labs, skills, stars, wishes } from './content.js';
import { articles } from './articles.js';
import { defaults, localPhase, normalizePreferences, clampRect, preferencesKey, starsKey, readStore, saveStore } from './state.js';

const $=selector=>document.querySelector(selector);
const host=$('#windows');
const taskApps=$('#open-apps');
const menu=$('#start-menu');
const start=$('#start');
const mochi=$('#mochi');
const comet=$('#comet');
const boot=$('#boot');
const reward=$('#reward');
const mobile=matchMedia('(max-width: 815px)');
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const fine=matchMedia('(hover: hover) and (pointer: fine)');
let storage;
let session;
try { storage=localStorage; session=sessionStorage; } catch { /* In-memory fallback. */ }
const storedStars=readStore(storage,starsKey,[]);
const discoveries=new Set(Array.isArray(storedStars) ? storedStars.filter(name=>stars.some(([valid])=>valid===name)) : []);
let prefs=normalizePreferences(readStore(storage,preferencesKey,{}));
const windows=new Map();
let active=null;
let nextLayer=0;
let toastTimer;
let mochiTimer;
let bootTimer;
let encounterEnd;
let encounterTimer;
let wishIndex=-1;
let lastDust;
let pendingReward=false;

const detailLists={ projects, notes:articles, lab:labs };
const triggers={ profile:'Wonder', projects:'Creation', notes:'Discovery', lab:'Courage' };

function parseRoute(path) {
  const parts=path.split('/').filter(Boolean);
  if (!parts.length) return {id:null,detail:null};
  const match=Object.entries(apps).find(([,app])=>app[3]===`/${parts[0]}`);
  if (!match || parts.length>2) return {id:'missing',detail:null};
  const [id]=match;
  const detail=parts[1] || null;
  if (detail && !detailLists[id]?.some(item=>item.id===detail)) return {id:'missing',detail:null};
  return {id,detail};
}

function updateRoute(id,detail,mode) {
  const path=id ? apps[id][3] : '/';
  if (!path || mode==='none') return;
  const next=path+(detail ? '/'+detail : '');
  if (location.pathname.replace(/\/$/,'')===(next==='/'?'':next)) return;
  history[mode==='replace'?'replaceState':'pushState']({},'',next);
}

function notify(message) {
  const toast=$('#notification');
  clearTimeout(toastTimer);
  toast.textContent=message;
  toast.classList.add('show');
  toastTimer=setTimeout(()=>{ toast.classList.remove('show'); },3900);
}

function updateCounter() {
  $('#counter').textContent=`${discoveries.size} / 7`;
  $('#counter').parentElement.setAttribute('aria-label',`Star Map, ${discoveries.size} of 7 discoveries`);
}
function discover(name) {
  if (discoveries.has(name)) return;
  discoveries.add(name);
  saveStore(storage,starsKey,[...discoveries]);
  updateCounter();
  if (windows.has('stars')) renderBody('stars');
  notify(`New discovery recorded! ${name}`);
  pendingReward=discoveries.size===7;
}
function showReward(automatic=false) {
  pendingReward=false;
  if (!automatic && discoveries.size!==7) return;
  while (!boot.hidden) hideBoot();
  reward.innerHTML=`<div class="dialog-inner">${icon('star')}<h2 id="reward-title">Celestial Explorer</h2>
    <p>You’ve restored the Lost Constellation! Wanna download a celestial wallpaper? I promise it’s not malware. (˵ ¬ᴗ¬˵)</p>
    <label>Wallpaper size <select id="reward-size"><option value="desktop">Desktop · 1920 × 1080</option><option value="phone">Phone · 1080 × 1920</option></select></label>
    <div class="actions"><a class="raised primary" id="reward-download" href="/assets/celestial-wallpaper.png" download>I trust you ♡</a><button class="raised" data-action="decline">Trust issues</button></div></div>`;
  reward.showModal();
}

function positionFor(id) {
  const width=host.clientWidth;
  const height=host.clientHeight;
  if (width < 1030 && (id==='welcome' || id==='brain')) {
    const left=128;
    const gutter=10;
    const pane=(width-left-gutter)/2;
    return {x:id==='welcome'?left:left+pane+gutter,y:height*(id==='welcome'?.18:.135),w:pane,h:id==='welcome'?410:421};
  }
  if (id==='welcome') return {x:Math.max(124,width*.163),y:Math.max(50,height*.197),w:Math.min(590,width*.443),h:410};
  if (id==='brain') return {x:width*.618,y:Math.max(62,height*.113),w:Math.min(440,width*.355),h:425};
  const w=id==='quick'?740:['guardian','stars','settings','contact','missing','terminal','resume'].includes(id)?580:748;
  const h=id==='contact'||id==='missing'?405:Math.min(666,height*.83);
  return {x:(width-w)/2,y:(height-h)/2,w,h};
}
function place(state) {
  if (mobile.matches || state.max) {
    state.element.style.inset='0';
    state.element.style.width='100%';
    state.element.style.height='100%';
    return;
  }
  state.rect=clampRect({width:host.clientWidth,height:host.clientHeight},state.rect);
  const {x,y,w,h}=state.rect;
  Object.assign(state.element.style,{inset:'auto',left:x+'px',top:y+'px',width:w+'px',height:h+'px'});
}

function renderBody(id) {
  const state=windows.get(id);
  const body=state.element.querySelector('.window-body');
  const previous=body.scrollTop;
  body.innerHTML=renderApp(id,state,{prefs,discoveries});
  body.scrollTop=previous;
}
function repaintKeepingFocus(id,target) {
  const state=windows.get(id);
  const attr=['data-filter','data-view','data-item','data-pose','data-action'].find(key=>target.hasAttribute(key));
  const value=attr && target.getAttribute(attr);
  renderBody(id);
  if (attr) state.element.querySelector(`[${attr}="${CSS.escape(value)}"]`)?.focus({preventScroll:true});
}
function addWindow(id) {
  const [title,label,graphic]=apps[id];
  const element=document.createElement('section');
  element.className='window';
  element.dataset.app=id;
  element.setAttribute('aria-label',label+' window');
  element.innerHTML=`<header class="title-bar">
    <button class="window-title" type="button" aria-label="${label} window. Arrow keys move, Shift plus arrows resize." title="Drag to move. Keyboard: arrows move, Shift + arrows resize.">${icon(graphic)}<span>${title}</span></button>
    <div class="window-controls">
      <button data-window="minimize" class="caption" aria-label="Minimize ${label}" title="Minimize">−</button>
      <button data-window="maximize" class="caption maximize" aria-label="Maximize ${label}" title="Maximize">□</button>
      <button data-window="close" class="caption close" aria-label="Close ${label}" title="Close">×</button>
    </div></header><div class="window-body"></div><div class="resize-grip" aria-hidden="true"></div>`;
  host.append(element);
  const state={element,rect:positionFor(id),min:false,max:false,layer:0,detail:null,history:[]};
  windows.set(id,state);
  element.addEventListener('pointerdown',()=>activate(id));
  element.addEventListener('focusin',()=>activate(id));
  element.querySelector('.title-bar').addEventListener('pointerdown',event=>{
    if (!event.target.closest('[data-window]')) startGesture(event,state,'move');
  });
  element.querySelector('.window-title').addEventListener('keydown',event=>moveByKeyboard(event,state));
  element.querySelector('.window-title').addEventListener('dblclick',event=>{
    if (!mobile.matches) { event.preventDefault(); maximize(id); }
  });
  element.querySelector('.resize-grip').addEventListener('pointerdown',event=>startGesture(event,state,'resize'));
  place(state);
  return state;
}

function order() {
  return [...windows.entries()].filter(([,state])=>!state.min).sort((a,b)=>b[1].layer-a[1].layer);
}
function syncVisibility() {
  for (const [id,state] of windows) {
    state.element.hidden=state.min || (mobile.matches && active!==id);
    state.element.classList.toggle('foreground',active===id);
  }
  document.body.classList.toggle('app-active',mobile.matches && active!==null);
  $('#desktop-apps').inert=mobile.matches && active!==null;
  mochi.inert=mobile.matches && active!==null;
}
function syncTaskbar() {
  const items=[...windows];
  const existing=new Map([...taskApps.children].map(button=>[button.dataset.task,button]));
  for (const [id,state] of items) {
    let button=existing.get(id);
    if (!button) {
      button=document.createElement('button');
      button.className='raised task';
      button.dataset.task=id;
      button.innerHTML=icon(apps[id][2])+`<span>${apps[id][0]}</span>`;
      taskApps.append(button);
    }
    button.setAttribute('aria-pressed',String(active===id && !state.min));
    button.title=(state.min?'Restore ':'Switch to ')+apps[id][1];
    existing.delete(id);
  }
  for (const button of existing.values()) button.remove();
  if (taskApps.querySelector('[data-task=welcome]')) {
    const welcome=taskApps.querySelector('[data-task=welcome]');
    if (taskApps.firstElementChild!==welcome) taskApps.prepend(welcome);
  }
}
function activate(id) {
  const state=windows.get(id);
  if (!state || state.min || active===id) return;
  active=id;
  state.layer=++nextLayer;
  state.element.style.zIndex=String(state.layer);
  syncVisibility();
  syncTaskbar();
}
function openApp(id,detail=null,{ routeMode='push',focus=true,initial=false }={}) {
  if (!apps[id]) return;
  const state=windows.get(id) || addWindow(id);
  const changed=state.detail!==detail;
  state.detail=detail;
  state.min=false;
  if (changed) state.element.querySelector('.window-body').scrollTop=0;
  if (changed || !state.element.querySelector('.window-body').hasChildNodes()) renderBody(id);
  activate(id);
  syncVisibility();
  syncTaskbar();
  updateRoute(id,detail,routeMode);
  const detailTitle=detailLists[id]?.find(item=>item.id===detail)?.title;
  document.title=id==='welcome'||id==='brain'&&initial ? 'Sragvi’s Vault' : `${detailTitle || apps[id][1]} · Sragvi’s Vault`;
  if (focus) (changed ? state.element.querySelector('.window-body h2') : null)?.setAttribute('tabindex','-1');
  if (focus) (state.element.querySelector('.window-body h2[tabindex="-1"]') || state.element.querySelector('.window-title')).focus({preventScroll:true});
  const award=triggers[id];
  const allowed= id==='profile' || detail && (id!=='lab' || labs.find(x=>x.id===detail)?.status!=='Planned');
  if (award && allowed) discover(award);
  if (pendingReward) showReward(true);
  return state;
}

function settle(preferred) {
  active=order()[0]?.[0] ?? null;
  syncVisibility();
  syncTaskbar();
  const visible=active && windows.get(active);
  const isWelcomeDesktop=active==='welcome' || active==='brain';
  if (visible && !isWelcomeDesktop) updateRoute(active,visible.detail,'replace');
  else updateRoute(null,null,'replace');
  document.title=visible && !isWelcomeDesktop ? apps[active][1]+' · Sragvi’s Vault' : 'Sragvi’s Vault';
  if (preferred?.isConnected && !preferred.closest('[hidden],[inert]')) preferred.focus({preventScroll:true});
  else (visible?.element.querySelector('.window-title') ?? (mobile.matches ? $('#home') : start)).focus({preventScroll:true});
}
function minimize(id,preferred) {
  const state=windows.get(id);
  state.min=true;
  if (active===id) settle(preferred);
  else { syncVisibility(); syncTaskbar(); preferred?.focus({preventScroll:true}); }
}
function closeApp(id) {
  windows.get(id).element.remove();
  windows.delete(id);
  settle(document.querySelector(`#desktop-apps [data-open="${id}"]`));
}
function maximize(id) {
  const state=windows.get(id);
  state.max=!state.max;
  const button=state.element.querySelector('.maximize');
  button.textContent=state.max?'❐':'□';
  button.setAttribute('aria-label',`${state.max?'Restore':'Maximize'} ${apps[id][1]}`);
  button.title=state.max?'Restore size':'Maximize';
  place(state);
}
function clearSkies() {
  for (const state of windows.values()) state.min=true;
  settle(mobile.matches?$('#home'):start);
  closeMenu(false);
}
function returnHome() {
  clearSkies();
  if (!mobile.matches) {
    openApp('brain',null,{routeMode:'none',focus:false,initial:true});
    openApp('welcome',null,{routeMode:'none'});
  }
}

function moveByKeyboard(event,state) {
  if (mobile.matches || state.max) return;
  const delta={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[event.key];
  if (!delta) return;
  event.preventDefault();
  const [x,y]=delta.map(n=>n*(event.altKey?1:16));
  if (event.shiftKey) { state.rect.w+=x; state.rect.h+=y; }
  else { state.rect.x+=x; state.rect.y+=y; }
  place(state);
}
function startGesture(event,state,kind) {
  if (mobile.matches || state.max || event.button!==0) return;
  const pointer=event.pointerId;
  const origin={x:event.clientX,y:event.clientY};
  const reference={...state.rect};
  const surface=event.currentTarget;
  let captured=false;
  const move=next=>{
    if (next.pointerId!==pointer) return;
    const dx=next.clientX-origin.x;
    const dy=next.clientY-origin.y;
    if (!captured && Math.abs(dx)+Math.abs(dy)<4) return;
    if (!captured) {
      surface.setPointerCapture(pointer);
      captured=true;
      state.element.classList.add('moving');
    }
    state.rect=kind==='move' ? {...reference,x:reference.x+dx,y:reference.y+dy}
      : {...reference,w:Math.min(reference.w+dx,host.clientWidth-reference.x),h:Math.min(reference.h+dy,host.clientHeight-reference.y)};
    place(state);
  };
  const finish=next=>{
    if (next.pointerId!==pointer) return;
    window.removeEventListener('pointermove',move);
    window.removeEventListener('pointerup',finish);
    window.removeEventListener('pointercancel',finish);
    state.element.classList.remove('moving');
  };
  window.addEventListener('pointermove',move);
  window.addEventListener('pointerup',finish);
  window.addEventListener('pointercancel',finish);
}

const tile = (id, mode) => `<a class="${mode}" href="${apps[id][3]}" data-open="${id}">${icon(apps[id][2])}<span>${escape(apps[id][1])}</span></a>`;
$('#desktop-apps').innerHTML=desktop.map(id=>tile(id,'desktop-icon')).join('') + `<div class="mobile-extra">${['welcome','brain','guardian','quick','settings'].map(id=>tile(id,'desktop-icon')).join('')}</div>`;
menu.innerHTML=`<div class="menu-head">${icon('saturn')}<span>Sragvi’s Vault</span></div><div class="menu-apps">${['welcome',...desktop.slice(0,7),'brain','guardian','stars','resume','contact','quick','settings'].map(id=>tile(id,'menu-item')).join('')}</div>
  <div class="menu-bottom"><button data-action="wish">Make a wish</button><button data-action="skies">Clear the Skies</button></div>`;

function closeMenu(restore) {
  if (menu.hidden) return;
  menu.hidden=true;
  start.setAttribute('aria-expanded','false');
  if (restore) start.focus();
}
function toggleMenu() {
  if (!menu.hidden) {closeMenu(true);return;}
  menu.hidden=false;
  start.setAttribute('aria-expanded','true');
  menu.querySelector('.menu-item').focus();
}
menu.addEventListener('keydown',event=>{
  const keys=['ArrowDown','ArrowUp','Home','End'];
  if (!keys.includes(event.key)) return;
  const items=[...menu.querySelectorAll('a,button')];
  const index=items.indexOf(document.activeElement);
  const next={ArrowDown:(index+1)%items.length,ArrowUp:(index-1+items.length)%items.length,Home:0,End:items.length-1};
  event.preventDefault();
  items[next[event.key]].focus();
});

function tick() {
  const now=new Date();
  const clock=$('#clock');
  clock.dateTime=now.toISOString();
  clock.textContent=Intl.DateTimeFormat(undefined,{hour:'numeric',minute:'2-digit'}).format(now);
  const phase=prefs.phase==='auto'?localPhase(now.getHours()):prefs.phase;
  document.documentElement.dataset.phase=phase;
}
function motionEnabled() { return prefs.motion && !reduce.matches; }
function applyPreferences() {
  const motion=motionEnabled();
  document.documentElement.classList.toggle('no-motion',!motion);
  mochi.hidden=!prefs.dragon;
  if (!motion) comet.hidden=true;
  if (!motion || !prefs.trail) {
    lastDust=undefined;
    document.querySelectorAll('.dust').forEach(particle=>particle.remove());
  }
  tick();
}
function setPreference(target) {
  const key=target.dataset.pref;
  prefs=normalizePreferences({...prefs,[key]:key==='phase'?target.value:target.checked});
  saveStore(storage,preferencesKey,prefs);
  applyPreferences();
}
function poseDragon(pose,userAction=true) {
  const sprite=mochi.querySelector('img');
  mochi.classList.toggle('dragon-flight',pose==='fly');
  sprite.src=`/assets/mochi-${pose}.png`;
  clearTimeout(mochiTimer);
  if (pose!=='sleep') mochiTimer=setTimeout(()=>poseDragon('sleep',false),pose==='fly'?6200:2600);
  if (userAction) {
    discover('Magic');
    if (pendingReward) showReward(true);
  }
}
function scheduleEncounter() {
  clearTimeout(encounterTimer);
  encounterTimer=setTimeout(()=>{
    if (motionEnabled() && !document.hidden) {
      comet.hidden=false;
      clearTimeout(encounterEnd);
      encounterEnd=setTimeout(()=>{ comet.hidden=true; },9000);
      if (prefs.dragon && !mobile.matches) poseDragon('fly',false);
    }
    scheduleEncounter();
  },47000);
}
function wish() {
  comet.hidden=true;
  wishIndex=(wishIndex+1)%wishes.length;
  notify(wishes[wishIndex]);
}
function dust(event) {
  if (!prefs.trail || !motionEnabled() || !fine.matches || event.pointerType!=='mouse' || !boot.hidden) return;
  const now=performance.now();
  if (lastDust && now-lastDust.time<16) return;
  const end={x:event.clientX,y:event.clientY,time:now};
  const start=lastDust && now-lastDust.time<100 ? lastDust : end;
  const dx=end.x-start.x;
  const dy=end.y-start.y;
  const distance=Math.hypot(dx,dy);
  if (start!==end && distance<3) return;
  lastDust=end;

  const count=Math.max(1,Math.min(3,Math.ceil(distance/8)));
  for (let i=1;i<=count;i++) addDust(start.x+dx*i/count,start.y+dy*i/count);
}
function addDust(x,y) {
  const chance=Math.random();
  const size=chance<.72 ? 3 : chance<.96 ? 6 : 13;
  const life=360+Math.random()*240;
  const opacity=(size===3 ? .26 : .5)+Math.random()*.36;
  const particle=document.createElement('span');
  particle.className='dust';
  particle.toggleAttribute('data-sparkle',size>3);
  particle.setAttribute('aria-hidden','true');
  particle.style.left=`${x+(Math.random()-.5)*7}px`;
  particle.style.top=`${y+(Math.random()-.5)*7}px`;
  particle.style.setProperty('--dust-size',`${size}px`);
  particle.style.setProperty('--dust-life',`${life}ms`);
  particle.style.setProperty('--dust-opacity',opacity);
  particle.style.setProperty('--dust-angle',`${Math.random()*50-25}deg`);
  particle.style.setProperty('--dust-drift',`${(Math.random()-.5)*15}px`);
  document.body.append(particle);
  setTimeout(()=>particle.remove(),life+50);
}

const commands={
  help:'help  whoami  ls  projects  skills  contact  clear',
  whoami:`${profile.name} · Cybersecurity M.S. student · Cyber Explorer`,
  ls:'Player_Profile.exe  Project_Explorer.exe  Inventory.exe  The_Lab.exe  Field_Notes.exe  Star_Map.exe',
  projects:projects.map(p=>p.title).join('\n'),
  skills:skills.map(([name])=>name).join(' · '),
  contact:profile.contact.map(([label,url])=>`${label}: ${url.replace('mailto:','')}`).join('\n'),
};
function runCommand(form) {
  const input=form.elements.command;
  const command=input.value.trim().toLowerCase();
  input.value='';
  if (!command) return;
  const state=windows.get('terminal');
  const log=state.element.querySelector('[data-terminal-log]');
  if (command==='clear') {
    log.replaceChildren();
    state.history=[];
  } else {
    const result=Object.hasOwn(commands,command)?commands[command]:'Unknown command. Try help.';
    for (const line of [`vault:~ $ ${command}`,result]) {
      state.history.push(line);
      const item=document.createElement('p');
      item.textContent=line;
      log.append(item);
    }
    if (state.history.length>100) {
      state.history.splice(0,2);
      log.firstChild.remove();
      log.firstChild.remove();
    }
    log.scrollIntoView({block:'end'});
  }
  input.focus({preventScroll:true});
}

function hideBoot() {
  if (boot.hidden) return;
  boot.hidden=true;
  clearTimeout(bootTimer);
  $('#vault').inert=false;
  $('#taskbar').inert=false;
  if (boot.contains(document.activeElement)) (mobile.matches ? start : windows.get('welcome')?.element.querySelector('.window-title'))?.focus();
}
function maybeBoot() {
  if (readStore(session,'vault.boot',false)) return;
  saveStore(session,'vault.boot',true);
  if (!motionEnabled()) return;
  boot.hidden=false;
  $('#vault').inert=true;
  $('#taskbar').inert=true;
  bootTimer=setTimeout(hideBoot,1450);
}

document.addEventListener('click',event=>{
  const target=event.target.closest('button,a');
  if (!menu.hidden && !event.target.closest('#start-menu,#start')) closeMenu(false);
  if (!target) return;
  if (target.tagName==='A' && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return;
  const {open,detail,task,window:control,action,filter,view,item,pose}=target.dataset;
  const id=target.closest('.window')?.dataset.app;
  if (open) { event.preventDefault(); closeMenu(false); openApp(open,detail); return; }
  if (task) {
    const state=windows.get(task);
    if (task===active && !state.min) minimize(task,target);
    else openApp(task,state.detail,{routeMode:'replace'});
    return;
  }
  if (control) {
    if (control==='minimize') minimize(id,taskApps.querySelector(`[data-task="${id}"]`));
    if (control==='maximize') maximize(id);
    if (control==='close') closeApp(id);
    return;
  }
  if (target===start) { toggleMenu(); return; }
  if (target===mochi) {
    const alreadyDiscovered=discoveries.has('Magic');
    poseDragon('happy');
    if (alreadyDiscovered) notify('Lil Mochi appreciates the head pats.');
    return;
  }
  if (target===comet) { wish(); return; }
  if (action) {
    if (action==='skies') clearSkies();
    if (action==='return-home') { event.preventDefault(); returnHome(); }
    if (action==='skip-boot') hideBoot();
    if (action==='reward') showReward();
    if (action==='decline') { reward.close(); notify('Fair enough. Good security instincts. ♡'); }
    if (action==='wish') { closeMenu(true); wish(); }
    if (action==='reset') {
      prefs={...defaults};
      saveStore(storage,preferencesKey,prefs);
      applyPreferences();
      repaintKeepingFocus('settings',target);
      notify('Visual preferences restored.');
    }
    return;
  }
  if (target.id==='reward-download') { setTimeout(()=>reward.close(),120); return; }
  if (!id) return;
  const state=windows.get(id);
  if (filter) {
    state.filter=filter;
    if (id==='inventory') state.item=undefined;
    repaintKeepingFocus(id,target);
  }
  if (view) { state.view=view; repaintKeepingFocus(id,target); }
  if (item!==undefined) {
    state.item=Number(item);
    repaintKeepingFocus(id,target);
    discover(id==='hall'?'Connection':'Growth');
    if (pendingReward) showReward(true);
  }
  if (pose) {
    state.pose=pose;
    repaintKeepingFocus(id,target);
    poseDragon(pose);
  }
});

document.addEventListener('input',event=>{
  const target=event.target;
  if (!target.matches('[data-search]')) return;
  const state=windows.get('notes');
  state.query=target.value;
  state.element.querySelector('[data-article-rows]').innerHTML=articleRows(state);
});
document.addEventListener('change',event=>{
  if (event.target.matches('[data-pref]')) setPreference(event.target);
  if (event.target.id==='reward-size') {
    $('#reward-download').href=event.target.value==='phone'?'/assets/celestial-wallpaper-phone.png':'/assets/celestial-wallpaper.png';
  }
});
document.addEventListener('submit',event=>{
  if (event.target.matches('[data-terminal]')) {
    event.preventDefault();
    runCommand(event.target);
  }
});
document.addEventListener('keydown',event=>{
  if (event.key!=='Escape' || reward.open) return;
  if (!boot.hidden) hideBoot();
  else if (!menu.hidden) closeMenu(true);
  else if (active) minimize(active,taskApps.querySelector(`[data-task="${active}"]`));
});
document.addEventListener('pointermove',dust,{passive:true});
window.addEventListener('resize',()=>{ for (const state of windows.values()) place(state); });
window.addEventListener('popstate',()=>{
  const {id,detail}=parseRoute(location.pathname);
  if (id) openApp(id,detail,{routeMode:'none'});
  else returnHome();
});
mobile.addEventListener('change',()=>{
  for (const state of windows.values()) place(state);
  syncVisibility();
});
reduce.addEventListener('change',()=>{
  applyPreferences();
  if (reduce.matches) hideBoot();
});

applyPreferences();
updateCounter();
setInterval(tick,15000);
scheduleEncounter();
const initial=parseRoute(location.pathname);
if (initial.id) openApp(initial.id,initial.detail,{routeMode:'none',focus:true,initial:true});
else {
  if (!mobile.matches) {
    openApp('brain',null,{routeMode:'none',focus:false,initial:true});
    openApp('welcome',null,{routeMode:'none',focus:false,initial:true});
  }
  maybeBoot();
}
