// ════════════════════════════════════════════════════════
// HOME, THEME PAGE, ECONOMISTS, DROPDOWN
// ════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════
// RENDER HOME
// ════════════════════════════════════════════════════════
function renderHome() {
  // stats
  document.getElementById('stat-chapitres').textContent = CHAPTERS.length;
  const totalQ = CHAPTERS.reduce((a,c)=>a+(c.totalQuestions||0),0);
  const totalD = CHAPTERS.reduce((a,c)=>a+(c.totalDefs||0),0);
  document.getElementById('stat-questions').textContent = totalQ;
  document.getElementById('stat-notions').textContent = totalD;

  // theme counts
  Object.keys(THEMES_META).forEach(t => {
    const count = CHAPTERS.filter(c => c.themes.includes(t)).length;
    const el = document.getElementById('tc-' + t);

  });

  // chapters grid
  const grid = document.getElementById('home-chapters-grid');
  grid.innerHTML = CHAPTERS.map(c => chapterCardHTML(c)).join('');
}

function chapterCardHTML(c) {
  return `<div class="chapter-card" onclick="goChapter('${c.id}')">
    <div class="cc-header">
      <div class="cc-num">${c.num}</div>
      <div class="cc-title">${c.title}</div>
    </div>
    <div class="cc-desc">${c.subtitle}</div>
    <div class="cc-footer">
      ${c.pills.map(p=>`<span class="cc-pill">${p}</span>`).join('')}
      <span class="cc-arrow">→</span>
    </div>
  </div>`;
}

// ════════════════════════════════════════════════════════
// RENDER THEME PAGE
// ════════════════════════════════════════════════════════
function renderThemePage(themeId) {
  const m = THEMES_META[themeId];
  document.getElementById('tph-icon').textContent = m.icon;
  document.getElementById('tph-title').textContent = m.label;
  document.getElementById('tph-sub').textContent = m.sub;
  const chapters = CHAPTERS.filter(c => c.themes.includes(themeId));
  const grid = document.getElementById('theme-chapters-grid');
  if (chapters.length === 0) {
    grid.innerHTML = '';
  } else {
    grid.innerHTML = chapters.map(c => chapterCardHTML(c)).join('');
  }

  const ecoSection = document.getElementById('theme-economists-section');
  if (themeId === 'histoire') {
    ecoSection.style.display = 'block';
    renderEconomists('all');
  } else {
    ecoSection.style.display = 'none';
  }
}

let activeEcoFilter = 'all';

function renderEconomists(filter) {
  activeEcoFilter = filter;

  // Filter buttons
  const filterEl = document.getElementById('economists-filter');
  const schools = ['Tous', ...new Set(ECONOMISTS.map(e => e.school))];
  filterEl.innerHTML = schools.map(s => {
    const key = s === 'Tous' ? 'all' : s;
    const active = activeEcoFilter === key;
    return `<button onclick="renderEconomists('${key}')" style="
      padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700;
      font-family:'Syne',sans-serif; cursor:pointer; border: 1px solid var(--border);
      background: ${active ? 'var(--a1)' : 'var(--surface2)'};
      color: ${active ? '#fff' : 'var(--muted)'};
      transition: all .2s;
    ">${s}</button>`;
  }).join('');

  // Filtered list
  const filtered = filter === 'all' ? ECONOMISTS : ECONOMISTS.filter(e => e.school === filter);
  const grid = document.getElementById('economists-grid');
  grid.innerHTML = filtered.map(e => `
    <div onclick="window.open('${e.wiki}','_blank')" style="
      background: var(--surface); border: 1px solid var(--border); border-radius: 14px;
      padding: 18px 20px; cursor: pointer; transition: transform .18s, box-shadow .18s, border-color .18s;
      border-left: 4px solid ${e.color};
    " onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 8px 32px rgba(0,0,0,.35)';this.style.borderColor='${e.color}'"
       onmouseout="this.style.transform='';this.style.boxShadow='';this.style.borderColor='var(--border)'">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:10px">
        <div>
          <div style="font-family:'Syne',sans-serif;font-size:15px;font-weight:800;color:var(--text)">${e.flag} ${e.name}</div>
          <div style="font-size:11px;color:var(--muted);margin-top:2px">${e.period}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0">
          <span style="font-size:10px;font-weight:700;background:${e.color}22;color:${e.color};padding:3px 8px;border-radius:6px;white-space:nowrap">${e.school}</span>
          <span style="font-size:10px;color:var(--muted)">Grokipedia ↗</span>
        </div>
      </div>
      <ul style="margin:0;padding:0 0 0 14px;list-style:disc;display:flex;flex-direction:column;gap:5px">
        ${e.ideas.map(i => `<li style="font-size:12px;color:var(--muted);line-height:1.5">${i}</li>`).join('')}
      </ul>
      <div style="margin-top:12px;display:flex;gap:6px;flex-wrap:wrap">
        ${e.chapitres.map(c => `<span style="font-size:10px;background:var(--surface2);border:1px solid var(--border);color:var(--muted);padding:2px 7px;border-radius:5px">${c}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// ════════════════════════════════════════════════════════
// BUILD DROPDOWN
// ════════════════════════════════════════════════════════
function buildDropdown() {
  const dd = document.getElementById('chapters-dropdown');
  const grouped = {};
  CHAPTERS.forEach(c => {
    const t = c.themes[0] || 'other';
    if (!grouped[t]) grouped[t] = [];
    grouped[t].push(c);
  });
  let html = '';
  Object.entries(grouped).forEach(([t, chs]) => {
    const m = THEMES_META[t] || { label: t, icon:'📚' };
    html += `<div class="dropdown-section-title">${m.icon} ${m.label}</div>`;
    chs.forEach(c => {
      html += `<div class="dropdown-item" onclick="goChapter('${c.id}')">
        <span class="di-num">${c.num}</span>
        <span class="di-title">${c.title}</span>
      </div>`;
    });
  });
  dd.innerHTML = html;
}
