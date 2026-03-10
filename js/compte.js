// ════════════════════════════════════════════════════════
// COMPTE PAGE
// ════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════
// COMPTE PAGE
// ════════════════════════════════════════════════════════
const QUIZ_THEME_META = {
  all:         { label:'📚 Toutes', color:'var(--a1)', total:100 },
  agents:      { label:'🏛 Agents', color:'var(--a1)', total:15 },
  menages:     { label:'👨‍👩‍👧 Ménages', color:'var(--a5)', total:25 },
  entreprises: { label:'🏭 Entreprises', color:'var(--a2)', total:15 },
  etat:        { label:'⚖️ État', color:'var(--a3)', total:20 },
  monnaie:     { label:'💰 Monnaie', color:'var(--a4)', total:15 },
  macro:       { label:'📊 Macro', color:'var(--a6)', total:10 },
};

function renderCompte(targetId) {
  const targetEl = targetId ? document.getElementById(targetId) : document.getElementById('compte-content');
  if (!targetEl || !currentUser) return;

  const cats = ['agents','menages','entreprises','etat','monnaie','macro'];
  let totalAns = 0, totalOk = 0;
  const catStats = {};
  cats.forEach(c => {
    const s = quizScores[c] || {};
    const ans = Object.keys(s).length;
    const ok = Object.values(s).reduce((a,b)=>a+b,0);
    totalAns += ans; totalOk += ok;
    catStats[c] = { ans, ok, total: QUIZ_THEME_META[c].total };
  });
  const globalPct = totalAns > 0 ? Math.round(totalOk/totalAns*100) : 0;
  const completed = cats.filter(c => catStats[c].ans >= QUIZ_THEME_META[c].total).length;
  let level = '🌱 Débutant';
  if (totalAns >= 80) level = '🏆 Expert';
  else if (totalAns >= 50) level = '🎓 Avancé';
  else if (totalAns >= 20) level = '📘 Intermédiaire';

  targetEl.innerHTML = `
    <div class="compte-hero">
      <div class="compte-av">👤</div>
      <div class="compte-info">
        <h2>${currentUser.pseudo}</h2>
        <p>Membre ÉcoRev</p>
        <div class="compte-lvl">${level}</div>
      </div>
    </div>
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-v" style="color:var(--a1)">${totalAns}<span style="font-size:14px;color:var(--muted)">/100</span></div><div class="stat-l">Questions</div></div>
      <div class="stat-card"><div class="stat-v" style="color:var(--a3)">${totalOk}</div><div class="stat-l">Bonnes rép.</div></div>
      <div class="stat-card"><div class="stat-v" style="color:${globalPct>=70?'var(--a3)':globalPct>=40?'var(--a2)':'var(--a4)'}">${globalPct}<span style="font-size:14px">%</span></div><div class="stat-l">Score global</div></div>
      <div class="stat-card"><div class="stat-v" style="color:var(--a5)">${completed}<span style="font-size:14px;color:var(--muted)">/6</span></div><div class="stat-l">Thèmes finis</div></div>
    </div>
    <div class="prog-section">
      <h3>Progression par thème — CH3</h3>
      ${cats.map(c => {
        const s = catStats[c];
        const pct = Math.round(s.ans/s.total*100);
        const acc = s.ans > 0 ? Math.round(s.ok/s.ans*100) : 0;
        const m = QUIZ_THEME_META[c];
        return `<div class="prog-row">
          <div class="prog-lbl" style="font-size:12px">${m.label}</div>
          <div class="prog-bar-bg"><div class="prog-bar" style="width:${pct}%;background:${m.color}"></div></div>
          <div class="prog-pct" style="color:${m.color}">${pct}%</div>
          <div class="prog-n">${s.ans}/${s.total}</div>
        </div>
        ${s.ans > 0 ? `<div style="margin:-6px 0 10px 134px;font-size:11px;color:var(--muted)">Précision : <strong style="color:${acc>=70?'var(--a3)':acc>=40?'var(--a2)':'var(--a4)'}">${acc}%</strong></div>` : ''}`;
      }).join('')}
    </div>
    <div class="compte-actions">
      <button class="action-btn" onclick="togglePwFormInline('${targetId||''}')">🔑 Changer le mot de passe</button>
      <button class="action-btn danger" onclick="confirmResetProgress()">🗑 Réinitialiser la progression</button>
      <button class="action-btn danger" onclick="doLogout()">🚪 Se déconnecter</button>
    </div>
    <div class="pw-form" id="pw-form-inline">
      <div class="auth-field"><label>Mot de passe actuel</label><input type="password" id="pw-old" placeholder="••••••••"/></div>
      <div class="auth-field"><label>Nouveau mot de passe</label><input type="password" id="pw-new" placeholder="Min. 4 caractères"/></div>
      <button class="pw-save" onclick="changePw('${targetId||''}')">Enregistrer</button>
      <div class="pw-msg" id="pw-msg-inline"></div>
    </div>`;
}

function togglePwFormInline(tid) { document.getElementById('pw-form-inline')?.classList.toggle('show'); }

async function changePw(tid) {
  const oldPw = document.getElementById('pw-old')?.value || '';
  const newPw = document.getElementById('pw-new')?.value || '';
  const msg = document.getElementById('pw-msg-inline');
  if (!oldPw || !newPw) { msg.style.color='var(--a4)'; msg.textContent='Remplis les deux champs.'; return; }
  if (newPw.length < 4) { msg.style.color='var(--a4)'; msg.textContent='Nouveau mot de passe trop court.'; return; }
  const users = await loadUsers();
  if (!users[currentUser.pseudo] || users[currentUser.pseudo].pw !== btoa(oldPw)) { msg.style.color='var(--a4)'; msg.textContent='Mot de passe actuel incorrect.'; return; }
  await db.ref(`users/${currentUser.pseudo}/pw`).set(btoa(newPw));
  msg.style.color='var(--a3)'; msg.textContent='✓ Mot de passe mis à jour !';
  document.getElementById('pw-old').value = ''; document.getElementById('pw-new').value = '';
}

async function confirmResetProgress() {
  if (!confirm('Réinitialiser toute ta progression ? Action irréversible.')) return;
  quizScores = {};
  currentUser.scores = {};
  await db.ref(`users/${currentUser.pseudo}/scores`).set({});
  updateBadge();
  renderCompte('chs-compte-inner');
  buildQuizCards();
  updateQuizScore();
}
