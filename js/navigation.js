// ════════════════════════════════════════════════════════
// NAVIGATION
// ════════════════════════════════════════════════════════

let currentTheme = null;
let currentChapter = null;

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  window.scrollTo(0, 0);
}

function goHome() { showPage('home'); renderHome(); }

function goTheme(themeId) {
  currentTheme = themeId;
  showPage('theme');
  renderThemePage(themeId);
}
function goThemeFromChapter() {
  if (currentTheme) goTheme(currentTheme);
  else goHome();
}

function goChapter(chapterId) {
  currentChapter = chapterId;
  showPage('chapter');
  renderChapterPage(chapterId);
}

function goCompte() { showPage('compte'); renderCompte(); }

function goClassement() { showPage('classement'); loadClassement(); }

function goCarte() { showPage('carte'); initCarte(); drawMapIfNeeded(); }

function goDefinitions() { showPage('definitions'); renderAllDefinitions(); }

// ── Mobile menu ──
function toggleMobileMenu() {
  const btn = document.getElementById('hamburger-btn');
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');
  const isOpen = menu.classList.contains('open');
  btn.classList.toggle('open', !isOpen);
  menu.classList.toggle('open', !isOpen);
  overlay.classList.toggle('open', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
}
function closeMobileMenu() {
  document.getElementById('hamburger-btn').classList.remove('open');
  document.getElementById('mobile-menu').classList.remove('open');
  document.getElementById('mobile-menu-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
function populateMobileChapters() {
  const list = document.getElementById('mobile-chapters-list');
  if (!list) return;
  list.innerHTML = CHAPTERS.map(c =>
    `<button class="mobile-menu-item" onclick="closeMobileMenu();goChapter('${c.id}')">${c.num} — ${c.title}</button>`
  ).join('');
}
