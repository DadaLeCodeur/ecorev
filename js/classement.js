// ════════════════════════════════════════════════════════
// CLASSEMENT / LEADERBOARD
// ════════════════════════════════════════════════════════

async function loadClassement() {
  document.getElementById('classement-loading').style.display = 'block';
  document.getElementById('classement-list').style.display = 'none';
  document.getElementById('classement-empty').style.display = 'none';

  try {
    const users = await loadUsers();
    const entries = [];

    Object.entries(users).forEach(([pseudo, data]) => {
      const scores = data.scores || {};

      // CH3 quiz scores (keyed by theme category)
      const ch3cats = ['agents','menages','entreprises','etat','monnaie','macro'];
      let ch3ans = 0, ch3ok = 0;
      ch3cats.forEach(c => {
        const s = scores[`ch3_quiz`]?.[c] || scores[c] || {};
        const ans = Object.keys(s).length;
        const ok = Object.values(s).reduce((a,b)=>a+b,0);
        ch3ans += ans; ch3ok += ok;
      });

      // Generic chapter quiz scores
      let genAns = 0, genOk = 0;
      ['ch1-1','ch1-2','ch1-3','ch2'].forEach(chId => {
        const s = scores[chId] || {};
        const ans = Object.keys(s).length;
        const ok = Object.values(s).reduce((a,b)=>a+b,0);
        genAns += ans; genOk += ok;
      });

      const totalAns = ch3ans + genAns;
      const totalOk = ch3ok + genOk;
      const pct = totalAns > 0 ? Math.round(totalOk / totalAns * 100) : 0;

      let level = '🌱';
      if (totalAns >= 200) level = '🏆';
      else if (totalAns >= 100) level = '🎓';
      else if (totalAns >= 40) level = '📘';

      entries.push({ pseudo, totalAns, totalOk, pct, level });
    });

    // Sort: by score % desc, then by totalAns desc
    entries.sort((a, b) => b.pct - a.pct || b.totalAns - a.totalAns);

    document.getElementById('classement-loading').style.display = 'none';

    if (entries.length === 0) {
      document.getElementById('classement-empty').style.display = 'block';
      return;
    }

    const medals = ['🥇','🥈','🥉'];
    const list = document.getElementById('classement-list');
    list.style.display = 'flex';
    list.innerHTML = entries.map((e, i) => {
      const isMe = currentUser && e.pseudo === currentUser.pseudo;
      const rank = i + 1;
      const medal = medals[i] || `<span style="color:var(--muted);font-weight:700;font-size:14px">#${rank}</span>`;
      const barW = e.pct;
      const barColor = e.pct >= 70 ? 'var(--a3)' : e.pct >= 40 ? 'var(--a2)' : 'var(--a4)';
      return `
      <div style="
        background:${isMe ? 'rgba(91,141,238,.10)' : 'var(--surface)'};
        border:1px solid ${isMe ? 'var(--a1)' : 'var(--border)'};
        border-radius:14px; padding:16px 20px;
        display:flex; align-items:center; gap:16px; flex-wrap:wrap;
        transition: transform .15s;
      " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform=''">
        <div style="font-size:22px;width:32px;text-align:center;flex-shrink:0">${medal}</div>
        <div style="flex:1;min-width:120px">
          <div style="font-family:'Syne',sans-serif;font-weight:700;font-size:15px;display:flex;align-items:center;gap:8px">
            ${e.level} ${e.pseudo}
            ${isMe ? '<span style="font-size:11px;background:var(--a1);color:#fff;border-radius:6px;padding:2px 8px;font-weight:700">Toi</span>' : ''}
          </div>
          <div style="margin-top:8px;display:flex;align-items:center;gap:8px">
            <div style="flex:1;height:6px;background:var(--surface2);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${barW}%;background:${barColor};border-radius:3px;transition:width .6s ease"></div>
            </div>
            <span style="font-size:12px;color:${barColor};font-weight:700;width:36px;text-align:right">${e.pct}%</span>
          </div>
        </div>
        <div style="display:flex;gap:16px;flex-shrink:0;text-align:center">
          <div>
            <div style="font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:var(--a3)">${e.totalOk}</div>
            <div style="font-size:11px;color:var(--muted)">Bonnes rép.</div>
          </div>
          <div>
            <div style="font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:var(--a1)">${e.totalAns}</div>
            <div style="font-size:11px;color:var(--muted)">Répondues</div>
          </div>
        </div>
      </div>`;
    }).join('');

  } catch(err) {
    document.getElementById('classement-loading').innerHTML = `<div style="font-size:32px;margin-bottom:12px">⚠️</div><div style="color:var(--a4)">Erreur lors du chargement du classement.</div>`;
  }
}
