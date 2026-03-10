// ════════════════════════════════════════════════════════
// AUTH SYSTEM + FIREBASE
// ════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════
// AUTH SYSTEM
// ════════════════════════════════════════════════════════
let currentUser = null;

// ════════════════════════════════════════════════════════
// FIREBASE — Realtime Database
// ════════════════════════════════════════════════════════
const firebaseConfig = {
  apiKey: "AIzaSyCHbnBuEaJ6QbcQ-GQJVjfKf8531M28QnM",
  authDomain: "ecorev-9f3eb.firebaseapp.com",
  databaseURL: "https://ecorev-9f3eb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ecorev-9f3eb",
  storageBucket: "ecorev-9f3eb.firebasestorage.app",
  messagingSenderId: "129367341519",
  appId: "1:129367341519:web:4c5206cc46e3d14ba3baba"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

async function loadUsers() {
  try {
    const snap = await db.ref('users').get();
    return snap.exists() ? snap.val() : {};
  } catch { return {}; }
}

async function saveUsers(u) {
  try { await db.ref('users').set(u); } catch(e) { console.error('saveUsers', e); }
}

async function loadSession() {
  try {
    const raw = localStorage.getItem('ecorev-session');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

async function saveSession(p) {
  try { localStorage.setItem('ecorev-session', JSON.stringify({ pseudo: p })); } catch {}
}

async function clearSession() {
  try { localStorage.removeItem('ecorev-session'); } catch {}
}

function switchAuth(tab) {
  document.getElementById('auth-login-form').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('auth-reg-form').style.display = tab === 'register' ? 'block' : 'none';
  document.getElementById('atab-login').classList.toggle('active', tab === 'login');
  document.getElementById('atab-reg').classList.toggle('active', tab === 'register');
  setAuthErr('');
}
function setAuthErr(msg) { const e = document.getElementById('auth-err'); e.textContent = msg; e.classList.toggle('show', !!msg); }

async function doLogin() {
  const pseudo = document.getElementById('l-pseudo').value.trim();
  const pw = document.getElementById('l-pw').value;
  if (!pseudo || !pw) { setAuthErr('Remplis tous les champs.'); return; }
  const users = await loadUsers();
  if (!users[pseudo]) { setAuthErr('Pseudo introuvable. Crée un compte !'); return; }
  if (users[pseudo].pw !== btoa(pw)) { setAuthErr('Mot de passe incorrect.'); return; }
  await connectUser(pseudo, users[pseudo].scores || {});
}

async function doRegister() {
  const pseudo = document.getElementById('r-pseudo').value.trim();
  const pw = document.getElementById('r-pw').value;
  if (!pseudo || !pw) { setAuthErr('Remplis tous les champs.'); return; }
  if (pseudo.length < 2) { setAuthErr('Pseudo trop court (min. 2 car.).'); return; }
  if (pw.length < 4) { setAuthErr('Mot de passe trop court (min. 4 car.).'); return; }
  const users = await loadUsers();
  if (users[pseudo]) { setAuthErr('Ce pseudo est déjà pris.'); return; }
  try {
    await db.ref(`users/${pseudo}`).set({ pw: btoa(pw), scores: {} });
  } catch(e) { setAuthErr('Erreur réseau. Réessaie.'); return; }
  await connectUser(pseudo, {});
}

async function connectUser(pseudo, savedScores) {
  currentUser = { pseudo, scores: savedScores };
  quizScores = savedScores.ch3_quiz || {};
  // Restore generic chapter quiz scores
  if (typeof genericQuizScores !== 'undefined') {
    ['ch1-1','ch1-2','ch1-3','ch2'].forEach(chId => {
      if (savedScores[chId]) genericQuizScores[chId] = savedScores[chId];
    });
  }
  await saveSession(pseudo);
  document.getElementById('auth-overlay').classList.add('hidden');
  updateBadge();
}

async function doLogout() {
  currentUser = null; quizScores = {};
  if (typeof genericQuizScores !== 'undefined') {
    ['ch1-1','ch1-2','ch1-3','ch2'].forEach(chId => { genericQuizScores[chId] = {}; });
  }
  await clearSession();
  document.getElementById('user-badge').style.display = 'none';
  document.getElementById('l-pseudo').value = '';
  document.getElementById('l-pw').value = '';
  switchAuth('login');
  document.getElementById('auth-overlay').classList.remove('hidden');
}

function updateBadge() {
  if (!currentUser) return;
  const badge = document.getElementById('user-badge');
  badge.style.display = 'flex';
  document.getElementById('badge-name').textContent = currentUser.pseudo;
  const s = quizScores['all'] || {};
  const total = Object.values(s).reduce((a,b)=>a+b,0);
  const ans = Object.keys(s).length;
  document.getElementById('badge-score').textContent = ans > 0 ? `${total}/${ans} ✓` : '';
}

async function persistUserScores() {
  if (!currentUser) return;
  currentUser.scores.ch3_quiz = { ...quizScores };
  // Save generic chapter quiz scores
  ['ch1-1','ch1-2','ch1-3','ch2'].forEach(chId => {
    if (typeof genericQuizScores !== 'undefined' && genericQuizScores[chId]) {
      currentUser.scores[chId] = { ...genericQuizScores[chId] };
    }
  });
  try {
    await db.ref(`users/${currentUser.pseudo}/scores`).set(currentUser.scores);
  } catch(e) { console.error('persistUserScores', e); }
  updateBadge();
}
