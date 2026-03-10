// ════════════════════════════════════════════════════════
// APP INIT
// ════════════════════════════════════════════════════════

buildDropdown();
renderHome();
initCarte(); // précharge la carte dès le démarrage

// Auto-login
(async function initAuth() {
  const session = await loadSession();
  if (session?.pseudo) {
    const users = await loadUsers();
    if (users[session.pseudo]) { await connectUser(session.pseudo, users[session.pseudo].scores || {}); return; }
  }
  document.getElementById('auth-overlay').classList.remove('hidden');
})();

populateMobileChapters();
