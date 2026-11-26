import { profile, projects, labs, skills, honors, thoughts, stars } from './content.js';
import { articles } from './articles.js';

export const apps = {
  welcome: ['welcome.exe', 'Welcome', 'saturn', '/welcome'],
  profile: ['Player_Profile.exe', 'Player Profile', 'profile', '/profile'],
  projects: ['Project_Explorer.exe', 'Projects', 'projects', '/projects'],
  inventory: ['Inventory.exe', 'Inventory', 'inventory', '/inventory'],
  hall: ['Hall_of_Fame.exe', 'Hall of Fame', 'hall', '/achievements'],
  lab: ['The_Lab.exe', 'The Lab', 'lab', '/labs'],
  notes: ['Field_Notes.exe', 'Field Notes', 'notes', '/blog'],
  terminal: ['Terminal.exe', 'Terminal', 'terminal', '/terminal'],
  brain: ['currently_occupied_by.exe', 'Brain Task Manager', 'brain', '/brain'],
  guardian: ['Guardian.exe', 'Lil Mochi', 'moon', '/guardian'],
  stars: ['Star_Map.exe', 'Star Map', 'stars', '/star-map'],
  resume: ['résumé.pdf', 'Résumé', 'resume', '/resume'],
  contact: ['Contact.exe', 'Contact', 'contact', '/contact'],
  quick: ['Quick_Portfolio.exe', 'Quick Portfolio', 'quick', '/portfolio'],
  settings: ['Settings.exe', 'Settings', 'settings', '/settings'],
  missing: ['lost_in_space.exe', 'Lost in space', 'chest', null],
};

export const desktop = ['profile','projects','inventory','hall','lab','notes','terminal','resume','stars','contact'];
export const filters = {
  projects: ['All','Cybersecurity','Systems','Web','AI / ML'],
  lab: ['All','Completed','Ongoing','Planned'],
  notes: ['All','Networking','Project Notes','Reflection'],
  inventory: ['All','Security','Development','AI / ML','Cloud'],
};

export function escape(value) {
  return String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
}
export const icon = (name, className = '') => `<img class="pixel ${className}" src="/assets/icon-${name}.png" alt="" draggable="false">`;
const image = (name, description = '', className = '') => `<img class="pixel ${className}" src="/assets/${name}.png" alt="${escape(description)}" draggable="false">`;
const tags = values => `<ul class="tags">${values.map(x=>`<li>${escape(x)}</li>`).join('')}</ul>`;
const cover = name => image('cover-'+name,'','cover');
const route = (id, detail) => apps[id][3] + (detail ? '/'+detail : '');
export const nav = (id, label = apps[id][1], detail = '', className = 'raised') => `<a href="${route(id,detail)}" data-open="${id}"${detail ? ` data-detail="${detail}"` : ''} class="${className}">${escape(label)}</a>`;
const external = ([label,href]) => `<a class="raised" href="${escape(href)}"${href.startsWith('https:') ? ' target="_blank" rel="noopener noreferrer"' : ''}>${escape(label)}</a>`;
const heading = (title, caption) => `<header class="app-heading"><h2>${escape(title)}</h2>${caption ? `<p>${escape(caption)}</p>` : ''}</header>`;
const empty = '<p class="empty">Nothing in this orbit yet.</p>';
const bar = (id, state) => `<div class="filters" aria-label="Filter">${filters[id].map(x=>`<button class="raised" data-filter="${x}" aria-pressed="${(state.filter ?? 'All') === x}">${x}</button>`).join('')}</div>`;

function welcome() {
  return `<div class="welcome">
    <div class="welcome-grid">
      <figure class="portrait-frame">${image('portrait','Pixel portrait of Sragvi with dark glasses and long wavy hair')}<figcaption>SRAGVI / PLAYER 01</figcaption></figure>
      <div class="welcome-copy">
        ${icon('saturn','welcome-saturn')}
        <h1>Sragvi’s Vault</h1>
        <p class="tagline">One player. Endless side quests.</p>
        <p class="intro">${escape(profile.intro)}</p>
      </div>
    </div>
    <div class="welcome-actions">
      <a class="raised primary" data-open="projects" href="/projects">${icon('projects')} Explore projects</a>
      <a class="raised secondary" data-open="profile" href="/profile">${icon('profile')} Meet the player</a>
    </div>
    <div class="welcome-links">${nav('resume','Résumé','','quiet')} ${nav('contact','Contact','','quiet')} ${nav('quick','Quick Portfolio','','quiet')}</div>
  </div>`;
}

function brain() {
  const lines = [
    '0,31 9,31 15,25 22,25 29,30 37,11 43,27 51,24 58,32 64,25 71,29 78,7 85,20 91,16 99,25 106,22 115,27 121,12 128,17 137,8 145,19 156,19 163,22 171,12 180,18 189,11 200,16 210,9 220,16 232,12 242,19 252,9 263,14 274,8 286,15 300,10 320,10',
    '0,38 14,36 25,37 38,34 53,36 66,32 75,35 90,34 107,33 116,35 130,25 140,34 153,30 168,32 180,29 199,32 208,26 229,31 243,28 258,31 275,27 300,29 320,26',
  ];
  return `<div class="brain"><div class="brain-top"><div><h2>Brain Task Manager</h2><p>Playful simulation</p></div><span>USER: SRAGVI</span></div>
    <figure class="graph" aria-label="Illustrative curiosity and side quest activity">
      <svg viewBox="0 0 320 45" preserveAspectRatio="none" aria-hidden="true"><path d="M0 13H320M0 25H320M0 37H320M40 0V45M80 0V45M120 0V45M160 0V45M200 0V45M240 0V45M280 0V45"/><polyline points="${lines[1]}" class="graph-alt"/><polyline points="${lines[0]}"/></svg>
    </figure>
    <table><thead><tr><th scope="col">Process</th><th scope="col">Status</th><th scope="col" aria-label="Illustrative activity"></th></tr></thead>
      <tbody>${thoughts.map(([name,status,load])=>`<tr><td>${name}</td><td><span class="status ${status === 'Not responding' ? 'warning' : ''}">${status}</span></td><td><meter min="0" max="100" value="${load}" aria-label="Illustrative activity for ${name}"></meter></td></tr>`).join('')}</tbody>
    </table>
    <dl class="brain-foot"><div><dt>Curiosity level</dt><dd>Overclocked</dd></div><div><dt>Unfinished ideas</dt><dd>Too many</dd></div></dl>
  </div>`;
}

function player() {
  return `<div class="app-pad">
    ${heading('Meet the player')}
    <div class="console">
      <div class="console-screen"><div class="console-portrait">${image('portrait','Personalized pixel portrait of Sragvi')} ${image('player-sprite','Full-body sprite of Sragvi in a layered purple outfit')}</div></div>
      <div class="console-data"><span class="eyebrow">Player 01</span><h3>${profile.name}</h3>
        <dl><dt>Class</dt><dd>Cyber Explorer</dd><dt>Status</dt><dd>Forever Learning</dd><dt>Alignment</dt><dd>Chaotically Curious</dd></dl>
      </div>
    </div>
    <div class="prose"><p>${profile.bio}</p><h3>Professional journey</h3><ol class="timeline">${profile.timeline.map(([when,what,summary])=>`<li><span class="eyebrow">${when}</span><h4>${what}</h4><p>${summary}</p></li>`).join('')}</ol><h3>Interests</h3>${tags(profile.interests)}</div>
  </div>`;
}

function projectList(state) {
  return `<div class="app-pad">${heading('Project Explorer','Security tools, web builds, and machine learning experiments.')}
    ${bar('projects',state)}
    <div class="switcher" aria-label="Project view"><button class="raised" data-view="cartridge" aria-pressed="${state.view !== 'file'}">Cartridges</button><button class="raised" data-view="file" aria-pressed="${state.view === 'file'}">Files</button></div>
    <div class="project-list ${state.view === 'file' ? 'file-view' : ''}">${projects.filter(p=>!state.filter || state.filter==='All' || p.category===state.filter).map(p=>`<a class="cartridge" data-open="projects" data-detail="${p.id}" href="/projects/${p.id}">${state.view === 'file' ? icon(p.art) : cover(p.art)}<span><strong>${p.title}</strong><small>${p.category} · ${p.status}</small></span></a>`).join('')}</div></div>`;
}

function projectDetail(p, isLab = false) {
  const fields = [['Objective',p.objective],['My contributions',p.contributions],['Challenges',p.challenges],['Results',p.result],['XP gained',p.xp]];
  return `<article class="app-pad prose case-file">
    ${nav(isLab?'lab':'projects',isLab?'All labs':'All projects','','back-link')}
    <header class="case-header">${cover(p.art)}<div>${tags([p.category,p.status,...(p.caseId?[p.caseId]:[])])}<h2>${p.title}</h2><p>${p.summary}</p></div></header>
    <div class="actions">${(p.links ?? []).map(external).join('')}${p.caseId === 'SEC-001' ? nav('notes','Related Field Note','notes-on-ai-security-scanner') : ''}</div>
    ${p.screenshots?.length ? `<h3>Project screenshots</h3><div class="case-shots">${p.screenshots.map(({src,alt})=>`<figure><img src="${escape(src)}" alt="${escape(alt)}" loading="lazy"><figcaption>${escape(alt)}</figcaption></figure>`).join('')}</div>` : ''}
    <h3>Tools</h3>${tags(p.tools)}
    <h3>Architecture</h3><ol class="workflow" aria-label="Architecture flow">${p.architecture.map(step=>`<li>${step}</li>`).join('')}</ol>
    ${fields.map(([title,body])=>`<h3>${title}</h3><p>${body}</p>`).join('')}
  </article>`;
}

function inventory(state) {
  const filtered = skills.map((item,index)=>({item,index})).filter(({item})=>!state.filter || state.filter==='All' || item[1]===state.filter);
  const selected = skills[state.item];
  return `<div class="app-pad">${heading('Inventory','Inspect tools and the projects where I’ve used them.')}${bar('inventory',state)}
    <div class="item-grid">${filtered.map(({item,index})=>`<button class="item-slot" data-item="${index}" aria-pressed="${state.item===index}">${icon(item[2])}<span>${item[0]}</span></button>`).join('')}${(!state.filter || state.filter==='All') ? '<div class="item-slot empty-slot" aria-label="Empty inventory slot"></div>'.repeat(2) : ''}</div>
    ${selected ? `<section class="item-detail"><h3>${selected[0]}</h3><p>${selected[3]}</p>${selected[4] ? nav('projects','Related project',selected[4]) : ''} ${selected[5] ? nav('lab','Related lab',selected[5]) : ''}${selected[0]==='Azure fundamentals' ? nav('hall','View certification') : ''}</section>` : ''}</div>`;
}

function hall(state) {
  const selected=honors[state.item];
  return `<div class="app-pad">${heading('Hall of Fame','Hackathons, competition milestones, and a certification.')}
    <div class="trophy-shelf">${honors.map(([nickname,,date,,art],index)=>`<button class="item-slot" data-item="${index}" aria-pressed="${state.item===index}">${icon(art)}<strong>${nickname}</strong><small>${date}</small></button>`).join('')}</div>
    ${selected ? `<section class="item-detail"><h3>${selected[1]}</h3><p>${selected[3]}</p>${selected[5] ? nav('projects','View project',selected[5]) : ''}</section>` : ''}</div>`;
}

function lab(state) {
  const selected=labs.find(item=>item.id===state.detail);
  if (selected?.project) return projectDetail(projects.find(p=>p.id===selected.project),true);
  if (selected) return `<article class="app-pad prose">${nav('lab','All labs','','back-link')}${heading(selected.title,selected.summary)}${tags([selected.status])}${selected.status==='Ongoing' ? '<h3>Investigation scope</h3><p>Observe traffic across lab segments, review what the sensor captures, and validate how detection rules record events in the monitoring console.</p>' : ''}</article>`;
  return `<div class="app-pad">${heading('The Lab','Authorized coursework, defensive investigations, and CTF practice.')}${bar('lab',state)}
    <div class="file-list">${labs.filter(p=>!state.filter || state.filter==='All' || p.status===state.filter).map(p=>`<a class="file-row" data-open="lab" data-detail="${p.id}" href="/labs/${p.id}">${icon(p.art)}<span><strong>${p.title}</strong><small>${p.summary}</small></span><span class="status-label">${p.status}</span></a>`).join('')}</div></div>`;
}

export function articleRows(state) {
  const query=(state.query || '').toLowerCase().trim();
  return articles.filter(a=>(!state.filter || state.filter==='All' || state.filter===a.category) && [a.title,a.summary,a.category].join(' ').toLowerCase().includes(query)).map(a=>`<a class="file-row" data-open="notes" data-detail="${a.id}" href="/blog/${a.id}">${icon('notes')}<span><strong>${a.title}</strong><small>${a.date} · ${a.category}</small><p>${a.summary}</p></span></a>`).join('') || empty;
}
function notes(state) {
  const a = articles.find(a=>a.id===state.detail);
  if (!a) return `<div class="app-pad">${heading('Field Notes','Notes on building, debugging, and learning in public.')}
    <label class="search-label">Search Field Notes <input type="search" data-search value="${escape(state.query ?? '')}" placeholder="Try ARP or scanner"></label>${bar('notes',state)}
    <div class="file-list" data-article-rows>${articleRows(state)}</div></div>`;
  return `<article class="app-pad prose document">${nav('notes','All field notes','','back-link')}<p class="eyebrow">${a.date} · ${a.category}</p><h2>${a.title}</h2><p class="lede">${a.summary}</p>
    ${a.body.map(line=>{
      if (typeof line==='string') return `<p>${escape(line)}</p>`;
      const [kind,value]=line;
      const open={ h:'<h3>', quote:'<blockquote>', code:'<pre><code>' };
      const close={ h:'</h3>', quote:'</blockquote>', code:'</code></pre>' };
      return open[kind]+escape(value)+close[kind];
    }).join('')}
    ${nav('notes','Read more notes')}
  </article>`;
}

function guardian(state) {
  const pose=state.pose || 'sleep';
  const descriptions={
    sleep:'Lil Mochi is currently performing a critical system nap.',
    fly:'Lil Mochi is checking the edges of the Vault.',
    happy:'Lil Mochi leans into the head pats.',
    collect:'Lil Mochi carefully picks up a piece of stardust.',
  };
  return `<div class="app-pad guardian">${heading('Lil Mochi','Baby moon dragon and guardian of the Vault.')}
    <div class="pet-display"><button class="pet-pat" data-pose="happy" aria-label="Pat Lil Mochi">${image('mochi-'+pose,'Lil Mochi, a lavender dragon with gold horns and pink wings','pose-'+pose)}</button>
    <dl><dt>Class</dt><dd>Celestial Guardian</dd><dt>Alignment</dt><dd>Sleepy but loyal</dd></dl></div>
    <p class="pet-status" role="status">${descriptions[pose]}</p>
    <div class="filters">${['sleep','fly','happy','collect'].map(x=>`<button class="raised" data-pose="${x}" aria-pressed="${pose===x}">${({sleep:'Nap',fly:'Fly',happy:'Head pats',collect:'Collect'})[x]}</button>`).join('')}</div></div>`;
}

const starPoints=[[48,16],[72,24],[84,45],[65,66],[47,54],[26,72],[16,42]];
const starLines=[[0,1],[1,2],[2,3],[3,4],[4,0],[4,5],[5,6],[6,0]];
function map(discoveries) {
  return `<div class="app-pad map-app">${heading('The Lost Constellation','Explore the Vault to restore seven stars.')}<div class="constellation" aria-label="${discoveries.size} of 7 stars restored">
    <svg viewBox="0 0 100 85" preserveAspectRatio="none" aria-hidden="true">${starLines.map(([a,b])=>`<line x1="${starPoints[a][0]}" y1="${starPoints[a][1]}" x2="${starPoints[b][0]}" y2="${starPoints[b][1]}" class="${discoveries.has(stars[a][0]) && discoveries.has(stars[b][0]) ? 'discovered' : ''}"/>`).join('')}</svg>
    ${stars.map(([name],i)=>`<div class="map-point ${discoveries.has(name)?'discovered':''}" style="--x:${starPoints[i][0]}%;--y:${100*starPoints[i][1]/85}%">${icon('star')}<span>${name}</span></div>`).join('')}</div>
    ${discoveries.size===7 ? '<div class="reward-ready"><h3>Celestial Explorer</h3><button class="raised primary" data-action="reward">Claim celestial wallpaper</button></div>' : ''}
    <ul class="discovery-log">${stars.map(([name,clue])=>`<li><strong>${name}</strong><span>${discoveries.has(name)?'Restored':clue}</span></li>`).join('')}</ul></div>`;
}

const resume = () => `<div class="app-pad prose">${heading('Résumé',profile.intro)}${profile.resume ? `<a class="raised primary" href="${escape(profile.resume)}" download>Acquire résumé.pdf</a>` : '<p>The résumé PDF isn’t available in this preview.</p>'}
  <h3>Education and experience</h3><ul>${profile.timeline.map(([,role,detail])=>`<li><strong>${role}</strong><br>${detail}</li>`).join('')}</ul><div class="actions">${nav('quick')}${external(profile.contact[1])}${nav('contact')}</div></div>`;
const contact = () => `<div class="app-pad prose">${heading('Let’s connect.','Open to cybersecurity internships, early-career opportunities, and project collaborations.')}<div class="actions">${profile.contact.map(external).join('')}</div><h3>Current interests</h3>${tags(profile.interests)}</div>`;
const quick = () => `<div class="app-pad prose quick-portfolio">${heading(profile.name,profile.intro)}
  <div class="actions">${nav('resume')}${nav('contact')}${external(profile.contact[0])}${external(profile.contact[1])}</div>
  <h3>Projects</h3><ul class="quick-list">${projects.map(p=>`<li>${nav('projects',p.title,p.id,'text-link')}<p>${p.summary}</p></li>`).join('')}</ul>
  <h3>Field Notes</h3><ul class="quick-list">${articles.map(a=>`<li>${nav('notes',a.title,a.id,'text-link')} <small>${a.date}</small></li>`).join('')}</ul>
  <h3>Experience and leadership</h3><ul>${profile.timeline.map(([,role])=>`<li>${role}</li>`).join('')}</ul></div>`;
const terminal = state => `<div class="terminal"><h2>Vault Terminal</h2><p>Simulated shell. Type <code>help</code> for available commands.</p>
  <div class="terminal-log" data-terminal-log role="log" aria-live="polite">${state.history.map(line=>`<p>${escape(line)}</p>`).join('')}</div>
  <form data-terminal><label for="command">vault:~ $</label><input id="command" name="command" autocomplete="off" autocapitalize="none" spellcheck="false" aria-label="Command"><button class="raised" type="submit">Run</button></form></div>`;

function settings(prefs) {
  return `<div class="app-pad">${heading('Settings','Make this little corner of the sky yours.')}
    <label class="setting"><span><strong>Wallpaper lighting</strong><small>Auto follows your local clock.</small></span><select data-pref="phase">${[['auto','Auto'],['dawn','Dawn'],['daylight','Daylight'],['twilight','Twilight'],['moonlight','Moonlight']].map(([value,label])=>`<option value="${value}"${prefs.phase===value?' selected':''}>${label}</option>`).join('')}</select></label>
    ${[['motion','Ambient motion','Cloud drift, encounters, and sprite movement.'],['trail','Stardust cursor','Fine pointers only.'],['dragon','Desktop Lil Mochi','Keep the dragon in view at the cottage.']].map(([key,label,description])=>`<label class="setting"><span><strong>${label}</strong><small>${description}</small></span><input type="checkbox" data-pref="${key}" ${prefs[key]?'checked':''}></label>`).join('')}
    <div class="actions"><button class="raised" data-action="wish">Make a wish</button><button class="raised" data-action="reset">Restore the universe</button></div></div>`;
}

const missing = () => `<div class="app-pad lost">${image('mochi-sleep','Sleeping Lil Mochi')}${icon('chest')}<h2>404 — Lost in space.</h2><p>Lil Mochi was supposed to guard this page. Unfortunately, nap time took priority.</p><a class="raised primary" data-action="return-home" href="/">Return to the Vault</a></div>`;

export function renderApp(id,state,context) {
  const views = {
    welcome, brain, profile:player, inventory, hall, lab, notes, guardian,
    terminal, resume, contact, quick, missing,
    stars:()=>map(context.discoveries), settings:()=>settings(context.prefs),
    projects:() => state.detail ? projectDetail(projects.find(p=>p.id===state.detail)) : projectList(state),
  };
  return views[id](state);
}
