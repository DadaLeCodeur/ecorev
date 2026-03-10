// ════════════════════════════════════════════════════════
// CHAPTERS — Page rendering, generic builder, CH1-1 to CH3
// ════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════
// RENDER CHAPTER PAGE
// ════════════════════════════════════════════════════════
function renderChapterPage(chapterId) {
  const ch = CHAPTERS.find(c => c.id === chapterId);
  if (!ch) return;

  currentTheme = ch.themes[0] || null;

  // breadcrumb
  const themeMeta = THEMES_META[currentTheme] || {};
  document.getElementById('ch-bread-theme').textContent = themeMeta.label || '';
  document.getElementById('ch-bread-title').textContent = ch.num;
  document.getElementById('ch-num-badge').textContent = ch.num + ' — ' + (themeMeta.label || '');
  document.getElementById('ch-title').textContent = ch.title;
  document.getElementById('ch-subtitle').textContent = ch.subtitle;

  // load chapter-specific content
  if (chapterId === 'ch1-1') renderCH1_1();
  else if (chapterId === 'ch1-2') renderCH1_2();
  else if (chapterId === 'ch1-3') renderCH1_3();
  else if (chapterId === 'ch2') renderCH2();
  else if (chapterId === 'ch3') renderCH3();
}

// ════════════════════════════════════════════════════════
// GENERIC CHAPTER BUILDER (tabs: cours, defs, quiz, chatbot, compte)
// ════════════════════════════════════════════════════════
function buildGenericChapter(chId, coursHTML, defs, questions, aiContext) {
  const tabs = [
    { id:'cours',   label:'📖 Cours'      },
    { id:'defs',    label:'📚 Définitions' },
    { id:'quiz',    label:'🎯 Quiz'        },
    { id:'chatbot', label:'🤖 Prof IA'     },
  ];
  const nav = document.getElementById('chapter-nav');
  nav.innerHTML = tabs.map((t,i) =>
    `<button class="ch-tab${i===0?' active':''}" onclick="switchChTab('${t.id}',this)">${t.label}</button>`
  ).join('');
  const container = document.getElementById('chapter-sections');
  container.innerHTML = tabs.map((t,i) =>
    `<div id="chs-${t.id}" class="ch-section${i===0?' active':''}"></div>`
  ).join('');

  // Cours
  document.getElementById('chs-cours').innerHTML = coursHTML + downloadBar(chId.toUpperCase() + ' — Cours');

  // Defs
  buildGenericDefs(chId, defs);

  // Quiz
  buildGenericQuiz(chId, questions);

  // Chatbot
  buildGenericChatbot(chId, aiContext);
}

function buildGenericDefs(chId, defs) {
  const sec = document.getElementById('chs-defs');
  sec.innerHTML = `
  <div class="sec-title">📚 Définitions du cours</div>
  <div class="sec-sub">Cliquez sur un terme pour afficher sa définition.</div>
  <div class="def-search-wrap">
    <span class="def-search-icon">🔍</span>
    <input class="def-search" type="text" placeholder="Rechercher une notion…" oninput="filterDefsInPage(this.value,'${chId}')"/>
  </div>
  <div class="def-count" id="def-count-${chId}"></div>
  <div class="def-list" id="def-list-${chId}"></div>
  ${downloadBar(chId.toUpperCase() + ' — Définitions')}`;
  renderDefList(chId, defs, 'all', '');
}

function buildGenericQuiz(chId, questions) {
  const sec = document.getElementById('chs-quiz');
  sec.innerHTML = `
  <div class="sec-title">🎯 Quiz flash</div>
  <div class="sec-sub">Teste tes connaissances sur ce chapitre.</div>
  <div class="score-bar">
    <span>Score :</span>
    <span class="score-val" id="qscore-val">0</span>
    <span style="color:var(--muted);font-size:13px">/ <span id="qscore-total">0</span> répondue(s)</span>
    <span id="qscore-pct" style="margin-left:auto;color:var(--muted);font-size:13px"></span>
    <button onclick="resetGenericQuiz('${chId}')" style="margin-left:12px;background:rgba(240,112,112,.15);border:1px solid rgba(240,112,112,.3);color:var(--a4);border-radius:8px;padding:5px 12px;font-size:11px;font-weight:700;cursor:pointer">↺ Reset</button>
  </div>
  <div class="quiz-wrap" id="quiz-container-${chId}"></div>
  ${downloadBar(chId.toUpperCase() + ' — Quiz')}`;
  buildGenericQuizCards(chId, questions);
}

let genericQuizScores = {};
let genericQuizQuestions = {};

function buildGenericQuizCards(chId, questions) {
  if (questions) genericQuizQuestions[chId] = questions;
  const qs = genericQuizQuestions[chId] || [];
  const container = document.getElementById(`quiz-container-${chId}`);
  if (!container) return;
  const saved = (genericQuizScores[chId] || {});
  container.innerHTML = '';
  qs.forEach((q, i) => {
    const div = document.createElement('div');
    div.className = 'quiz-card';
    div.innerHTML = `
      <div class="q-num">Question ${i+1} / ${qs.length}</div>
      <div class="q-text">${q.q}</div>
      <div class="quiz-options" id="gqopts-${chId}-${i}">
        ${q.opts.map((o,j)=>`<button class="q-opt" onclick="answerGenericQuiz('${chId}',${i},${j})" id="gqopt-${chId}-${i}-${j}">${o}</button>`).join('')}
      </div>
      <div class="q-feedback" id="gqfb-${chId}-${i}">💡 ${q.explain}</div>`;
    container.appendChild(div);
    if (saved[i] !== undefined) {
      document.querySelectorAll(`#gqopts-${chId}-${i} .q-opt`).forEach((b,j) => {
        b.classList.add('disabled');
        if (j === q.ans) b.classList.add('correct');
      });
      document.getElementById(`gqfb-${chId}-${i}`)?.classList.add('show');
    }
  });
  updateGenericScore(chId);
}

function answerGenericQuiz(chId, qi, oi) {
  const qs = genericQuizQuestions[chId] || [];
  if (!genericQuizScores[chId]) genericQuizScores[chId] = {};
  if (genericQuizScores[chId][qi] !== undefined) return;
  const correct = qs[qi].ans;
  genericQuizScores[chId][qi] = (oi === correct) ? 1 : 0;
  document.querySelectorAll(`#gqopts-${chId}-${qi} .q-opt`).forEach((b,j) => {
    b.classList.add('disabled');
    if (j === correct) b.classList.add('correct');
    else if (j === oi && oi !== correct) b.classList.add('wrong');
  });
  document.getElementById(`gqfb-${chId}-${qi}`)?.classList.add('show');
  updateGenericScore(chId);
  persistUserScores();
}

function updateGenericScore(chId) {
  const saved = genericQuizScores[chId] || {};
  const answered = Object.keys(saved).length;
  const total = Object.values(saved).reduce((a,b)=>a+b,0);
  const sv = document.getElementById('qscore-val');
  const st = document.getElementById('qscore-total');
  const sp = document.getElementById('qscore-pct');
  if (sv) sv.textContent = total;
  if (st) st.textContent = answered;
  if (sp && answered > 0) {
    const pct = Math.round(total/answered*100);
    sp.textContent = `${pct}% de bonnes réponses`;
    sv.style.color = pct>=70?'var(--a3)':pct>=40?'var(--a2)':'var(--a4)';
  }
}

function resetGenericQuiz(chId) {
  genericQuizScores[chId] = {};
  buildGenericQuizCards(chId);
  persistUserScores();
}

function buildGenericChatbot(chId, aiContext) {
  const sec = document.getElementById('chs-chatbot');
  sec.innerHTML = `
  <div class="sec-title">🤖 Professeur IA</div>
  <div class="sec-sub">Pose tes questions sur ce chapitre, demande des explications ou fais-toi interroger.</div>
  <div class="chat-wrap">
    <div class="chat-main">
      <div class="chat-messages" id="chat-msgs-${chId}"></div>
      <div class="chat-input-row">
        <textarea class="chat-input" id="chat-inp-${chId}" placeholder="Pose ta question…" rows="1"
          onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendGenericMsg('${chId}')}"
          oninput="this.style.height='auto';this.style.height=this.scrollHeight+'px'"></textarea>
        <button class="chat-send" id="chat-send-${chId}" onclick="sendGenericMsg('${chId}')">➤</button>
      </div>
    </div>
    <div class="chat-sidebar">
      <div class="chat-sidebar-title">💡 Suggestions</div>
      <div class="chat-suggs">
        <button class="chat-sugg" onclick="sendGenericSugg('${chId}',this)">Pose-moi une question de cours</button>
        <button class="chat-sugg" onclick="sendGenericSugg('${chId}',this)">Donne-moi un exemple concret</button>
        <button class="chat-sugg" onclick="sendGenericSugg('${chId}',this)">Explique-moi la notion la plus difficile</button>
        <button class="chat-sugg" onclick="sendGenericSugg('${chId}',this)">Fais un résumé du chapitre</button>
        <button class="chat-sugg" onclick="sendGenericSugg('${chId}',this)">Quels auteurs faut-il connaître ?</button>
      </div>
    </div>
  </div>`;
  genericChatState[chId] = genericChatState[chId] || { history: [], initialized: false };
  if (!genericChatState[chId].initialized) {
    genericChatState[chId].initialized = true;
    genericChatState[chId].context = aiContext;
    addGenericMsg(chId, 'bot', "Bonjour ! 👋 Je suis ton **professeur IA**. Pose-moi tes questions, demande-moi d'**expliquer une notion** ou dis **\"pose-moi une question de cours\"** pour réviser. Par où veux-tu commencer ?");
  } else {
    const container = document.getElementById(`chat-msgs-${chId}`);
    if (container) { container.innerHTML = ''; }
    genericChatState[chId].history.filter(m=>m.role!=='system').forEach(m => addGenericMsg(chId, m.role==='user'?'user':'bot', m.content, false));
  }
}

const genericChatState = {};
const genericSending = {};

function addGenericMsg(chId, role, text, push = true) {
  const container = document.getElementById(`chat-msgs-${chId}`);
  if (!container) return;
  const div = document.createElement('div');
  div.className = 'msg ' + role;
  div.innerHTML = `<div class="msg-av">${role==='bot'?'🎓':'👤'}</div><div class="msg-bubble">${fmtMsg(text)}</div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  if (push) {
    if (!genericChatState[chId]) genericChatState[chId] = { history:[], initialized:true };
    genericChatState[chId].history.push({ role: role==='bot'?'assistant':'user', content: text });
  }
}

async function sendGenericMsg(chId, text) {
  if (genericSending[chId]) return;
  const input = document.getElementById(`chat-inp-${chId}`);
  const msg = (text || input?.value || '').trim();
  if (!msg) return;
  if (input) { input.value = ''; input.style.height = 'auto'; }
  genericSending[chId] = true;
  const btn = document.getElementById(`chat-send-${chId}`);
  if (btn) btn.disabled = true;
  addGenericMsg(chId, 'user', msg);

  // typing indicator
  const c = document.getElementById(`chat-msgs-${chId}`);
  const tDiv = document.createElement('div');
  tDiv.className = 'msg bot'; tDiv.id = `typing-${chId}`;
  tDiv.innerHTML = `<div class="msg-av">🎓</div><div class="typing-ind"><div class="t-dot"></div><div class="t-dot"></div><div class="t-dot"></div></div>`;
  c?.appendChild(tDiv); if(c) c.scrollTop = c.scrollHeight;

  try {
    const state = genericChatState[chId] || {};
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: state.context || 'Tu es un professeur d\'économie bienveillant. Réponds toujours en français, de manière concise avec des exemples concrets.',
        messages: state.history || []
      })
    });
    const data = await resp.json();
    document.getElementById(`typing-${chId}`)?.remove();
    const reply = data.content?.[0]?.text || "Désolé, une erreur s'est produite.";
    addGenericMsg(chId, 'bot', reply);
  } catch {
    document.getElementById(`typing-${chId}`)?.remove();
    addGenericMsg(chId, 'bot', "Oups, une erreur s'est produite. Vérifie ta connexion !");
  }
  genericSending[chId] = false;
  if (btn) btn.disabled = false;
  document.getElementById(`chat-inp-${chId}`)?.focus();
}
function sendGenericSugg(chId, btn) { sendGenericMsg(chId, btn.textContent.trim()); }

// ════════════════════════════════════════════════════════
// CH1-1 — RESSOURCES POUR PRODUIRE
// ════════════════════════════════════════════════════════
function renderCH1_1() {
  const coursHTML = `
  <div class="sec-title">I. L'économie face à la rareté des ressources</div>
  <div class="sec-sub">La rareté est le problème économique universel. Elle implique des choix.</div>
  <div class="cards-grid">
    <div class="card a1"><h3>📌 Définition de l'économie</h3><p>Science qui étudie le comportement humain en tant que relation entre les fins et les <strong>moyens rares à usages alternatifs</strong> (L. Robbins, 1932).</p><ul><li><strong>Macroéco</strong> : agrégats (PIB, chômage, inflation)</li><li><strong>Microéco</strong> : individus, ménages, marchés</li></ul></div>
    <div class="card a2"><h3>⚠️ La rareté</h3><ul><li><strong>Rareté absolue</strong> : limites des ressources naturelles</li><li><strong>Rareté relative</strong> : capacité limitée à produire</li><li>Les désirs sont illimités, les ressources sont limitées</li><li>Implique de <strong>hiérarchiser</strong> les besoins</li></ul></div>
    <div class="card a3"><h3>📚 Theories de la rareté</h3><ul><li><strong>Classiques</strong> (Ricardo, Smith) : le travail crée la valeur</li><li><strong>Malthus</strong> : rendements décroissants, contrôle des naissances</li><li><strong>Néoclassiques</strong> : l'utilité marginale crée la valeur (1870)</li><li><strong>Keynes</strong> : le capitalisme pourrait créer l'abondance mais la course au profit l'empêche</li></ul></div>
    <div class="card a4"><h3>💡 Coût d'opportunité</h3><p>Le sacrifice consenti pour un choix = la meilleure option à laquelle on a <strong>renoncé</strong>.</p><p style="margin-top:8px;font-style:italic;color:var(--a3)">Ex : choisir des vacances plutôt qu'un ordi → le coût d'opportunité est l'ordi.</p></div>
  </div>

  <div class="sec-title" style="margin-top:32px">II. Classifications des biens et services</div>
  <div class="cards-grid">
    <div class="card a1"><h3>Biens libres vs Biens économiques</h3><ul><li><strong>Biens libres</strong> : gratuits, abondants (air, soleil)</li><li><strong>Biens économiques</strong> : nécessitent travail humain, payants, limités</li></ul></div>
    <div class="card a2"><h3>Marchands vs Non marchands</h3><ul><li><strong>Marchands</strong> : vendus sur un marché (voiture, concert)</li><li><strong>Non marchands</strong> : APU/ISBLSM, sans but lucratif (justice, police, école publique)</li></ul></div>
    <div class="card a3"><h3>Biens privés vs Biens publics (Samuelson 1954)</h3><ul><li><strong>Privés</strong> : droit de propriété, valeur marchande</li><li><strong>Publics</strong> : <em>non-exclusion</em> + <em>non-rivalité</em></li><li><strong>Biens communs</strong> : rivaux + non-exclusifs (Hardin 1968)</li></ul></div>
    <div class="card a5"><h3>Classification selon la durabilité</h3><ul><li><strong>Non durables</strong> : se détruisent à l'usage (pain)</li><li><strong>Semi-durables</strong> : usure régulière (vêtements)</li><li><strong>Durables</strong> : longue durée de vie (équipement)</li></ul></div>
  </div>

  <div class="sec-title" style="margin-top:32px">III. Facteurs de production</div>
  <div class="cards-grid">
    <div class="card a1"><h3>🧑‍💼 Facteur Travail</h3><ul><li><strong>Quantitatif</strong> : population active, taux d'emploi, durée du travail</li><li><strong>Qualitatif</strong> : formation, compétences, capital humain</li><li>Rémunéré par le <strong>salaire</strong></li></ul></div>
    <div class="card a2"><h3>🏭 Facteur Capital</h3><ul><li><strong>Capital technique</strong> : machines, bâtiments, équipements</li><li><strong>Capital immatériel</strong> : R&D, brevets, logiciels</li><li>Rémunéré par le <strong>profit/intérêt</strong></li><li>Mesuré par la <strong>FBCF</strong></li></ul></div>
    <div class="card a3"><h3>⚡ Progrès technique</h3><ul><li><strong>Innovation de produit</strong> : nouveau bien ou service</li><li><strong>Innovation de procédé</strong> : nouvelle méthode de production</li><li>Schumpeter : <em>destruction créatrice</em></li><li>Augmente la productivité des deux facteurs</li></ul></div>
    <div class="card a4"><h3>🔗 Combinaison productive</h3><ul><li><strong>Court terme</strong> : un seul facteur variable (loi des rendements décroissants)</li><li><strong>Long terme</strong> : deux facteurs variables</li><li>Substituabilité capital/travail selon les prix relatifs</li></ul></div>
  </div>
  ${downloadBar('CH1-1 — Ressources pour produire')}`;

  const defs = [
    { term:'Rareté', cat:'all', tag:'Fondements', color:'var(--a1)', def:'Situation où les besoins et désirs dépassent les ressources disponibles. La rareté est le problème économique universel qui oblige à faire des choix.' },
    { term:'Coût d\'opportunité', cat:'all', tag:'Fondements', color:'var(--a1)', def:'La valeur de la meilleure alternative sacrifiée lors d\'un choix. Mesure le renoncement associé à toute décision économique.', exemple:'Choisir les vacances plutôt qu\'un ordinateur : l\'ordi est le coût d\'opportunité.' },
    { term:'Bien libre', cat:'all', tag:'Biens', color:'var(--a2)', def:'Bien disponible gratuitement sans intervention humaine, en quantité naturellement abondante.', exemple:'L\'air, le soleil, l\'eau d\'une source.' },
    { term:'Bien économique', cat:'all', tag:'Biens', color:'var(--a2)', def:'Bien nécessitant un travail humain pour être produit, disponible en quantité limitée et ayant un prix.' },
    { term:'Bien collectif (Samuelson 1954)', cat:'all', tag:'Biens', color:'var(--a2)', def:'Bien caractérisé par la non-exclusion (impossible d\'exclure quelqu\'un de son usage) et la non-rivalité (l\'usage par un individu n\'empêche pas l\'usage par un autre).', exemple:'Un phare, la défense nationale, l\'air pur.' },
    { term:'Bien commun', cat:'all', tag:'Biens', color:'var(--a2)', def:'Bien rival (son usage peut gêner les autres) mais non exclusif. Risque de surexploitation (Hardin, 1968 : "tragédie des biens communs").', exemple:'Un banc de poissons, une forêt communale.' },
    { term:'Facteur de production', cat:'all', tag:'Production', color:'var(--a3)', def:'Ressource utilisée dans le processus de production. Les deux facteurs principaux sont le travail et le capital.' },
    { term:'Facteur travail', cat:'all', tag:'Production', color:'var(--a3)', def:'Ensemble des ressources humaines (physiques et intellectuelles) mobilisées dans la production. Rémunéré par le salaire.' },
    { term:'Facteur capital', cat:'all', tag:'Production', color:'var(--a3)', def:'Ensemble des biens durables utilisés pour produire d\'autres biens. Inclut capital technique (machines) et immatériel (R&D, logiciels).', formula:'FBCF = Formation Brute de Capital Fixe' },
    { term:'Progrès technique', cat:'all', tag:'Production', color:'var(--a3)', def:'Amélioration des méthodes de production permettant d\'obtenir plus de production avec les mêmes facteurs, ou la même production avec moins de facteurs.' },
    { term:'Destruction créatrice (Schumpeter)', cat:'all', tag:'Production', color:'var(--a3)', def:'Processus par lequel les innovations obsolètes les activités et structures existantes tout en créant de nouvelles. Moteur du capitalisme.', exemple:'L\'automobile a remplacé le cheval, le numérique remplace l\'imprimerie.' },
    { term:'Rendements décroissants', cat:'all', tag:'Production', color:'var(--a4)', def:'À court terme, avec un facteur fixe, chaque unité supplémentaire du facteur variable apporte une production additionnelle de plus en plus faible.' },
    { term:'Combinaison productive', cat:'all', tag:'Production', color:'var(--a4)', def:'Association des facteurs de production (capital et travail) pour obtenir un bien ou service. Vise à minimiser les coûts pour un niveau de production donné.' },
    { term:'Substituabilité capital/travail', cat:'all', tag:'Production', color:'var(--a4)', def:'Possibilité de remplacer un facteur par un autre. Si le coût du travail augmente, l\'entreprise peut substituer du capital (machine) au travail.' },
    { term:'Productivité', cat:'all', tag:'Production', color:'var(--a4)', def:'Rapport entre la production obtenue et les facteurs utilisés.', formula:'Productivité du travail = Production / Quantité de travail' },
    { term:'Innovation de produit', cat:'all', tag:'Progrès tech.', color:'var(--a5)', def:'Création d\'un bien ou service nouveau ou significativement amélioré.', exemple:'Le smartphone, les vaccins à ARN messager.' },
    { term:'Innovation de procédé', cat:'all', tag:'Progrès tech.', color:'var(--a5)', def:'Nouvelle méthode de production plus efficace permettant de réduire les coûts ou d\'augmenter la qualité.', exemple:'La chaîne de montage de Ford, les robots dans l\'automobile.' },
    { term:'Macroéconomie', cat:'all', tag:'Économie', color:'var(--muted)', def:'Branche de l\'économie qui étudie l\'économie comme un tout : PIB, inflation, chômage, croissance.' },
    { term:'Microéconomie', cat:'all', tag:'Économie', color:'var(--muted)', def:'Branche de l\'économie qui étudie le comportement des agents individuels (ménages, entreprises) sur les marchés.' },
    { term:'Capital humain', cat:'all', tag:'Production', color:'var(--a3)', def:'Ensemble des compétences, savoirs et savoir-faire acquis par un individu (via l\'éducation et l\'expérience) qui augmentent sa productivité.', exemple:'Un diplôme d\'ingénieur, une formation en gestion.' },
  ];

  const questions = [
    { q:"Selon L. Robbins, l'économie est :", opts:["La gestion de la maison","L'étude des comportements humains face aux moyens rares","La science du profit","L'allocation des taxes"], ans:1, explain:"Robbins (1932) définit l'économie comme la science étudiant le comportement humain entre fins et moyens rares à usages alternatifs." },
    { q:"La rareté absolue concerne :", opts:["La capacité limitée de produire","Les limites des ressources naturelles","Le manque de travail","Le faible budget des ménages"], ans:1, explain:"Rareté absolue = limites physiques des ressources naturelles (pétrole, eau douce). Rareté relative = capacité limitée à produire." },
    { q:"Qu'est-ce que le coût d'opportunité ?", opts:["Le coût de production","La valeur de la meilleure option sacrifiée","Le bénéfice attendu","Le coût du capital"], ans:1, explain:"Coût d'opportunité = ce à quoi on renonce en faisant un choix. C'est la mesure du sacrifice économique." },
    { q:"Un bien public au sens de Samuelson (1954) est caractérisé par :", opts:["La rivalité et l'exclusion","La non-rivalité et la non-exclusion","La gratuité seulement","L'appartenance à l'État"], ans:1, explain:"Samuelson définit le bien collectif par 2 critères : non-exclusion (nul ne peut être exclu) et non-rivalité (usage d'un agent n'empêche pas les autres)." },
    { q:"Qu'est-ce qu'un bien commun (Hardin) ?", opts:["Un bien non rival et non exclusif","Un bien rival et non exclusif","Un bien public pur","Un bien privé partagé"], ans:1, explain:"Le bien commun est rival (l'usage diminue la disponibilité) et non exclusif (difficile d'exclure). Risque de surexploitation." },
    { q:"Le facteur travail est rémunéré par :", opts:["Le profit","Le loyer","Le salaire","L'intérêt"], ans:2, explain:"Le salaire rémunère le facteur travail. Le profit/intérêt rémunère le capital, le loyer rémunère la terre." },
    { q:"La FBCF mesure :", opts:["La variation des stocks","L'investissement en capital fixe","Le revenu disponible","Les exportations nettes"], ans:1, explain:"La Formation Brute de Capital Fixe mesure la valeur des acquisitions d'actifs fixes (machines, bâtiments, logiciels) par les agents." },
    { q:"La 'destruction créatrice' est le concept de :", opts:["Ricardo","Keynes","Schumpeter","Malthus"], ans:2, explain:"Schumpeter : les innovations détruisent les activités obsolètes et créent de nouvelles. C'est le moteur du capitalisme dynamique." },
    { q:"À court terme, en ajoutant du travail à un capital fixe, on observe :", opts:["Des rendements croissants","Des rendements constants","Des rendements décroissants","Des rendements nuls"], ans:2, explain:"Loi des rendements décroissants : à court terme (capital fixe), chaque unité supplémentaire de travail produit de moins en moins." },
    { q:"L'innovation de procédé consiste à :", opts:["Créer un nouveau produit","Améliorer la méthode de production","Lancer une nouvelle marque","Former les salariés"], ans:1, explain:"Innovation de procédé = nouvelle façon de produire (chaîne de montage, robot). Réduit les coûts ou améliore la qualité." },
    { q:"La substituabilité capital/travail signifie qu'on peut :", opts:["Augmenter la production sans facteurs","Remplacer un facteur par l'autre","Utiliser la même combinaison toujours","Fusionner les deux facteurs en un seul"], ans:1, explain:"Si le coût du travail ↑ : l'entreprise peut substituer du capital (automatisation) au travail pour réduire les coûts." },
    { q:"La macroéconomie étudie :", opts:["Les comportements individuels","Les marchés de niche","Les agrégats économiques (PIB, chômage)","Les prix des biens spécifiques"], ans:2, explain:"La macroéconomie s'intéresse aux grands agrégats : PIB, inflation, chômage, balance des paiements, croissance." },
    { q:"Quel économiste lie la valeur à la rareté absolue et relative ?", opts:["Smith","Marx","Ricardo","Walras"], ans:2, explain:"Ricardo : la valeur d'un bien dépend de la rareté absolue (ressources naturelles) + rareté relative (travail humain pour le produire)." },
    { q:"Le capital humain inclut :", opts:["Les machines","Les brevets","Les compétences et savoirs acquis par un individu","Les bâtiments"], ans:2, explain:"Le capital humain = compétences, diplômes, expérience. Augmente la productivité du travailleur." },
    { q:"Les biens non marchands sont essentiellement produits par :", opts:["Les SNF","Les SF","Les APU et ISBLSM","Les ménages"], ans:2, explain:"Les services non marchands (éducation, santé, police) sont produits par les APU et les ISBLSM, sans but lucratif." },
    { q:"Un bien non durable est :", opts:["Une machine","Un vêtement","Une baguette de pain","Un smartphone"], ans:2, explain:"Bien non durable : se détruit lors de son usage immédiat (pain, essence). Le vêtement est semi-durable, la machine et le smartphone sont durables." },
    { q:"Malthus préconise pour éviter la famine :", opts:["L'augmentation de la production","Le contrôle des naissances","La redistribution des richesses","Le libre-échange"], ans:1, explain:"Malthus : production = travail × terre, avec rendements décroissants. Plus de population → moins par tête → il faut contrôler les naissances." },
    { q:"L'utilité marginale est un concept central pour :", opts:["Les classiques","Les néoclassiques","Les institutionnalistes","Les marxistes"], ans:1, explain:"La révolution marginaliste (1870, Walras, Jevons, Menger) : la valeur dépend de l'utilité de la dernière unité consommée." },
    { q:"La productivité du travail se calcule comme :", opts:["Salaire / Production","Production / Nombre de travailleurs","Capital / Travail","Revenu / PIB"], ans:1, explain:"Productivité du travail = Production / Quantité de travail. Mesure l'efficacité du facteur travail." },
    { q:"Un service non marchand est :", opts:["Vendu à prix de marché","Produit pour générer du profit","Fourni gratuitement ou à prix non significatif","Produit uniquement par les entreprises privées"], ans:2, explain:"Services non marchands : fournis gratuitement ou à un prix inférieur au coût (éducation publique, santé publique)." },
    { q:"Quelle est la différence entre biens privés et biens publics ?", opts:["Les biens publics sont gratuits, les privés payants","Les biens privés ont exclusion+rivalité, les publics non-exclusion+non-rivalité","Les biens publics sont toujours de meilleure qualité","Aucune différence économique"], ans:1, explain:"Biens privés : exclusifs + rivaux. Biens publics (Samuelson) : non-exclusifs + non-rivaux. Cette distinction justifie l'intervention de l'État." },
    { q:"L'investissement en R&D est un exemple de :", opts:["Capital technique","Capital immatériel","Capital humain","Capital naturel"], ans:1, explain:"R&D, brevets, logiciels, marques = capital immatériel. De plus en plus important dans les économies de la connaissance." },
    { q:"La loi de Malthus implique que :", opts:["La croissance de la population stimule la production","Plus de population → rendements décroissants par tête","L'innovation compense toujours les rendements décroissants","La rareté n'existe pas si la technologie progresse"], ans:1, explain:"Malthus : la production agricole croît moins vite que la population → rendements décroissants → famines sans contrôle des naissances." },
    { q:"La combinaison productive vise à :", opts:["Maximiser les prix","Minimiser les coûts pour un niveau de production donné","Maximiser le nombre d'emplois","Minimiser la quantité produite"], ans:1, explain:"La combinaison productive recherche la combinaison de facteurs qui permet de produire au moindre coût — objectif de toute entreprise rationnelle." },
    { q:"Quel bien est à la fois rival et non exclusif ?", opts:["Le bien public pur","Le bien privé","Le bien commun","Le service non marchand"], ans:2, explain:"Le bien commun (Hardin 1968) est rival (l'usage par A réduit la disponibilité pour B) et non exclusif (impossible d'exclure quelqu'un)." },
    { q:"L'automatisation est un exemple de :", opts:["Substitution du capital au travail","Substitution du travail au capital","Innovation de produit","Rareté absolue"], ans:0, explain:"L'automatisation remplace le travail humain par des machines : c'est une substitution capital → travail, souvent déclenchée par la hausse des salaires." },
    { q:"La notion d'utilité totale vs marginale permet d'expliquer :", opts:["Pourquoi les diamants coûtent plus cher que l'eau malgré une moindre utilité totale","Pourquoi les salaires augmentent","Comment l'État fixe les prix","Pourquoi les entreprises font des profits"], ans:0, explain:"Paradoxe de Smith (eau vs diamant) : l'eau a une utilité totale élevée mais une utilité MARGINALE faible (abondante). Le diamant a une utilité marginale élevée (rare)." },
    { q:"Le capital naturel désigne :", opts:["Les machines achetées par l'État","Les ressources naturelles utilisées en production","Les brevets et logiciels","Les investissements publics"], ans:1, explain:"Capital naturel = stock de ressources naturelles (forêts, eau, minerais, biodiversité) qui fournissent des services à l'économie." },
    { q:"Qu'est-ce que le capital immatériel ?", opts:["Machines et bâtiments","Brevets, R&D, logiciels, formations","Actions en bourse","Stocks de marchandises"], ans:1, explain:"Capital immatériel = actifs non physiques à longue durée de vie : R&D, brevets, logiciels, marques, formation professionnelle." },
    { q:"Laquelle de ces affirmations est FAUSSE sur le progrès technique ?", opts:["Il augmente la productivité","Il peut créer du chômage à court terme","Il diminue toujours le bien-être de la population","Il est le moteur de la croissance à long terme"], ans:2, explain:"Faux : le progrès technique augmente généralement le bien-être à long terme (baisse des prix, nouveaux produits, meilleure santé). À court terme il peut créer des déséquilibres." },
  ];

  const context = `Tu es un professeur d'économie bienveillant. Tu aides un étudiant à réviser CH1-1 : "Les ressources mobilisées pour produire des biens et des services". Réponds TOUJOURS en français, de manière concise et pédagogique. Cours : rareté (absolue/relative), coût d'opportunité, classifications des biens (libres/économiques, marchands/non marchands, publics/privés/communs, Samuelson 1954, Hardin 1968), facteurs de production (travail : quantitatif+qualitatif ; capital : technique+immatériel, FBCF), progrès technique (Schumpeter, destruction créatrice, innovation produit/procédé), combinaison productive (court/long terme, rendements décroissants, substituabilité). Théoriciens : Smith, Ricardo, Malthus, Keynes, Walras, Jevons, Menger, Schumpeter, Samuelson.`;

  buildGenericChapter('ch1-1', coursHTML, defs, questions, context);
}

// ════════════════════════════════════════════════════════
// CH1-2 — ALLOCATION DES RESSOURCES
// ════════════════════════════════════════════════════════
function renderCH1_2() {
  const coursHTML = `
  <div class="sec-title">I. Les besoins humains</div>
  <div class="sec-sub">La rareté oblige à hiérarchiser les besoins pour faire des choix rationnels.</div>
  <div class="cards-grid">
    <div class="card a5"><h3>🧠 Pyramide de Maslow (1943)</h3><p>Théorie de la hiérarchie des besoins : on satisfait d'abord les besoins d'un niveau avant ceux du niveau supérieur.</p><ul><li>Niveau 1 : Besoins physiologiques (nourriture, sommeil)</li><li>Niveau 2 : Sécurité (logement, emploi)</li><li>Niveau 3 : Appartenance (famille, amis)</li><li>Niveau 4 : Estime (reconnaissance)</li><li>Niveau 5 : Accomplissement de soi</li></ul><p style="margin-top:8px;color:var(--muted);font-size:12px">⚠️ Critiqué : sans base scientifique, occidental, hiérarchie contestable.</p></div>
    <div class="card a3"><h3>🌐 Max-Neef : besoins fondamentaux</h3><p>Classification alternative : <strong>être, avoir, faire, interagir</strong>. Besoins : subsistance, protection, affection, compréhension, participation, loisirs, création, identité, liberté.</p></div>
    <div class="card a1"><h3>⚠️ Rareté et besoins illimités</h3><p>Les agents économiques ont des ressources limitées mais des besoins potentiellement illimités. Cette tension rend <strong>l'allocation des ressources</strong> indispensable.</p></div>
  </div>

  <div class="sec-title" style="margin-top:32px">II. L'allocation des ressources</div>
  <div class="cards-grid">
    <div class="card a1"><h3>📌 Définition</h3><p>Répartition des facteurs de production (capital, travail, matières premières) vers les usages où <strong>l'utilité sera maximale</strong>, à court et long terme.</p><p style="margin-top:8px">Deux écoles : <strong>libéraux</strong> (le marché = "main invisible") vs <strong>interventionnistes</strong> (l'État si nécessaire).</p></div>
    <div class="card a2"><h3>📊 Contrainte budgétaire</h3><p>Représentée par une droite de budget. L'agent choisit une combinaison de deux biens en fonction de son <strong>revenu</strong> et des <strong>prix relatifs</strong>.</p><ul><li>Si revenu ↑ : droite se déplace vers le haut</li><li>La pente dépend du rapport des prix</li></ul></div>
    <div class="card a3"><h3>💸 Coût d'opportunité</h3><p>"Opportunity cost" = manque à gagner de ce qu'on sacrifie lors d'un choix.</p><p style="margin-top:8px;color:var(--a3);font-style:italic">Ex transport : voiture (1,50€) vs bus (1,00€) → coût d'opportunité de la voiture = 0,50€ par trajet.</p></div>
    <div class="card a4"><h3>⚖️ Arbitrage sous contraintes</h3><p>Les besoins sont concurrents. Satisfaire l'un empêche de satisfaire un autre. L'agent doit <strong>hiérarchiser</strong> ses besoins et faire des compromis.</p></div>
  </div>

  <div class="sec-title" style="margin-top:32px">III. Raisonnement à la marge — La révolution marginaliste</div>
  <div class="cards-grid">
    <div class="card a1"><h3>⚖️ Valeur travail (Smith, Ricardo, Marx)</h3><p>La valeur d'un bien dépend de la <strong>quantité de travail</strong> nécessaire pour le produire.</p><p style="margin-top:8px;color:var(--muted);font-size:12px">Limite : le paradoxe de l'eau et du diamant. L'eau est plus utile mais moins chère.</p></div>
    <div class="card a2"><h3>🔬 Révolution marginaliste (1870)</h3><p><strong>Jevons, Menger, Walras</strong> : la valeur dépend de l'<strong>utilité marginale</strong> (utilité de la dernière unité), pas de l'utilité totale.</p><ul><li>Eau : utilité totale élevée, marginale faible (abondante)</li><li>Diamant : utilité totale faible, marginale élevée (rare)</li></ul></div>
    <div class="card a3"><h3>📉 Loi de l'utilité marginale décroissante</h3><p>Plus on consomme d'un bien, moins chaque unité supplémentaire apporte de satisfaction. La demande est donc <strong>décroissante</strong> avec le prix.</p></div>
    <div class="card a5"><h3>🧮 Raisonnement à la marge</h3><p>Décision rationnelle : comparer le <strong>bénéfice marginal</strong> et le <strong>coût marginal</strong> de chaque unité supplémentaire.</p><ul><li>Si Bm > Cm → produire/consommer davantage</li><li>Si Bm &lt; Cm → réduire la production/consommation</li><li>Optimum : Bm = Cm</li></ul></div>
  </div>
  ${downloadBar('CH1-2 — Allocation des ressources')}`;

  const defs = [
    { term:'Allocation des ressources', cat:'all', tag:'Core', color:'var(--a1)', def:'Répartition des facteurs de production (capital, travail, matières premières) vers les usages où l\'utilité sera maximale, à court et long terme.' },
    { term:'Arbitrage', cat:'all', tag:'Core', color:'var(--a1)', def:'Choix sous contrainte impliquant un renoncement. Faire un arbitrage = choisir entre des options mutuellement exclusives en évaluant coûts et avantages.' },
    { term:'Contrainte budgétaire', cat:'all', tag:'Microéco', color:'var(--a2)', def:'Limite des dépenses d\'un agent, représentée par une droite de budget. L\'agent choisit une combinaison de biens dans les limites de son revenu et des prix.', exemple:'Si je consacre tout à A (point A) ou tout à B (point B), je peux choisir tout point sur la droite AB.' },
    { term:'Utilité marginale', cat:'all', tag:'Marginalisme', color:'var(--a3)', def:'Utilité procurée par la consommation d\'une unité supplémentaire d\'un bien. Décroît avec la quantité consommée (loi de l\'utilité marginale décroissante).', exemple:'La 1ère baguette rassasie beaucoup, la 5ème beaucoup moins.' },
    { term:'Loi de l\'utilité marginale décroissante', cat:'all', tag:'Marginalisme', color:'var(--a3)', def:'Plus on consomme d\'un bien, moins chaque unité supplémentaire procure de satisfaction. Explique la demande décroissante en fonction du prix.' },
    { term:'Paradoxe de la valeur (eau vs diamant)', cat:'all', tag:'Marginalisme', color:'var(--a3)', def:'L\'eau, très utile (forte utilité totale), est peu chère. Le diamant, peu utile (faible utilité totale), est très cher. Explication : l\'eau a une utilité marginale faible (abondante), le diamant une utilité marginale élevée (rare).', exemple:'Posé par Adam Smith, résolu par les marginalistes en 1870.' },
    { term:'Coût d\'opportunité', cat:'all', tag:'Core', color:'var(--a1)', def:'Valeur de la meilleure alternative à laquelle on renonce lors d\'un choix. Mesure le coût réel d\'une décision économique.', formula:'Coût d\'opportunité = valeur de la meilleure option non choisie' },
    { term:'Pyramide de Maslow (1943)', cat:'all', tag:'Besoins', color:'var(--a5)', def:'Théorie de la hiérarchie des besoins humains en 5 niveaux : physiologiques, sécurité, appartenance, estime, accomplissement. On satisfait les besoins inférieurs avant les supérieurs.', exemple:'Critique : pas de base scientifique, culturellement biaisée.' },
    { term:'Raisonnement à la marge', cat:'all', tag:'Marginalisme', color:'var(--a3)', def:'Décision économique basée sur la comparaison du bénéfice marginal et du coût marginal d\'une unité supplémentaire.', formula:'Optimum : Bénéfice marginal = Coût marginal' },
    { term:'Valeur d\'usage', cat:'all', tag:'Valeur', color:'var(--a4)', def:'Utilité d\'un bien, ce à quoi il sert (Adam Smith). Distincte de la valeur d\'échange.', exemple:'L\'eau a une forte valeur d\'usage (essentielle à la vie).' },
    { term:'Valeur d\'échange', cat:'all', tag:'Valeur', color:'var(--a4)', def:'Prix d\'un bien sur le marché, ou la quantité d\'autres biens contre lesquels il peut être échangé (Adam Smith).', exemple:'Le diamant a une forte valeur d\'échange (prix élevé sur le marché).' },
    { term:'Valeur travail (Smith, Ricardo)', cat:'all', tag:'Valeur', color:'var(--a4)', def:'Théorie selon laquelle la valeur d\'échange d\'un bien est déterminée par la quantité de travail nécessaire à sa production. Précède la révolution marginaliste.' },
    { term:'Main invisible (Adam Smith)', cat:'all', tag:'Libéralisme', color:'var(--a2)', def:'Mécanisme selon lequel la poursuite individuelle de l\'intérêt privé conduit, via le marché, à un optimum collectif. Justifie le laisser-faire libéral.', exemple:'Le vendeur cherche son profit, l\'acheteur son utilité → le marché alloue efficacement.' },
    { term:'Équilibre général (Walras)', cat:'all', tag:'Marginalisme', color:'var(--a3)', def:'Théorie selon laquelle tous les marchés s\'équilibrent simultanément en concurrence pure et parfaite, réalisant un optimum collectif (plein emploi).', exemple:'La valeur d\'un bien est fixée par l\'équilibre offre/demande sur le marché.' },
    { term:'Bénéfice marginal', cat:'all', tag:'Marginalisme', color:'var(--a3)', def:'Avantage supplémentaire obtenu par la production ou la consommation d\'une unité de plus.', exemple:'Le bénéfice marginal du 3ème employé = la production qu\'il ajoute.' },
  ];

  const questions = [
    { q:"L'allocation des ressources consiste à :", opts:["Distribuer les revenus aux ménages","Répartir les facteurs de production vers leurs usages les plus utiles","Fixer les prix par l'État","Calculer le PIB"], ans:1, explain:"L'allocation des ressources = répartir le capital, le travail et les matières premières vers les usages où l'utilité sera maximale, à CT et LT." },
    { q:"La pyramide de Maslow (1943) hiérarchise :", opts:["Les formes de production","Les besoins humains du plus primaire au plus élevé","Les niveaux de revenus","Les types de biens économiques"], ans:1, explain:"Maslow : 5 niveaux de besoins à satisfaire dans l'ordre : physiologiques → sécurité → appartenance → estime → accomplissement." },
    { q:"La révolution marginaliste est associée à :", opts:["Smith, Ricardo, Marx","Keynes, Friedman, Modigliani","Walras, Jevons, Menger (1870)","Musgrave, Laffer, Engel"], ans:2, explain:"En 1870, trois économistes indépendants créent le marginalisme : Walras (France), Jevons (Angleterre), Menger (Autriche)." },
    { q:"L'utilité marginale est :", opts:["L'utilité totale d'un bien","L'utilité de la dernière unité consommée","Le prix du bien sur le marché","Le coût de production"], ans:1, explain:"L'utilité marginale = satisfaction procurée par la consommation d'une unité supplémentaire d'un bien." },
    { q:"Le paradoxe de l'eau et du diamant pose la question suivante :", opts:["Pourquoi l'eau est plus rare que le diamant","Pourquoi un bien moins utile (diamant) peut être plus cher qu'un bien plus utile (eau)","Pourquoi l'eau n'est pas un bien économique","Pourquoi les prix ne reflètent pas les coûts"], ans:1, explain:"Smith : l'eau est essentielle mais peu chère, le diamant est superflu mais très cher. Résolution par les marginalistes : utilité MARGINALE (pas totale) détermine la valeur." },
    { q:"La contrainte budgétaire d'un agent peut être représentée par :", opts:["Une courbe d'indifférence","Une droite de budget","Un histogramme","Une courbe d'offre"], ans:1, explain:"La contrainte budgétaire = droite de budget. Si revenu = R, prix de A = Pa, prix de B = Pb → combinaisons possibles sur la droite R = Pa.Qa + Pb.Qb." },
    { q:"Si le revenu d'un ménage augmente, sa droite de budget :", opts:["Pivote vers le haut","Se déplace parallèlement vers l'extérieur","Se réduit","Devient une courbe"], ans:1, explain:"Une hausse de revenu déplace la droite de budget parallèlement vers le haut (vers l'extérieur) : on peut acheter plus de chaque bien." },
    { q:"Le raisonnement à la marge prescrit de continuer une activité si :", opts:["Le coût marginal > bénéfice marginal","Le bénéfice marginal > coût marginal","L'utilité totale est maximale","Le profit est nul"], ans:1, explain:"Règle d'or : si Bm > Cm → continuer. Si Bm < Cm → arrêter. Optimum : Bm = Cm." },
    { q:"Pour Adam Smith, quelle grandeur fixe la valeur d'un bien ?", opts:["Son utilité marginale","La quantité de travail nécessaire à le produire","Le prix d'équilibre sur le marché","Sa rareté absolue"], ans:1, explain:"Théorie de la valeur travail (Smith, Ricardo) : la valeur d'échange est déterminée par la quantité de travail incorporé dans le bien." },
    { q:"La 'main invisible' d'Adam Smith représente :", opts:["L'intervention de l'État dans l'économie","Le mécanisme de marché qui alloue efficacement les ressources","Le rôle des syndicats","La politique monétaire de la banque centrale"], ans:1, explain:"Main invisible : les agents cherchent leur intérêt privé → le marché concurrentiel alloue les ressources efficacement sans coordination centrale." },
    { q:"Selon les marginalistes, la valeur d'échange d'un bien dépend de :", opts:["La quantité de travail incorporé","Son utilité marginale","Son utilité totale","Son coût de production"], ans:1, explain:"Les marginalistes (1870) : valeur d'échange = utilité marginale. Le diamant (rare) a une UM élevée → prix élevé. L'eau (abondante) a une UM faible → prix bas." },
    { q:"L'utilité marginale est généralement :", opts:["Constante","Croissante","Décroissante","Nulle"], ans:2, explain:"Loi de l'utilité marginale décroissante : plus on consomme d'un bien, moins chaque unité supplémentaire apporte de satisfaction." },
    { q:"Les libéraux considèrent que l'allocation des ressources doit se faire par :", opts:["L'État planificateur","Le mécanisme de marché","La démocratie directe","Les syndicats"], ans:1, explain:"Les libéraux : le marché (prix, offre, demande) assure la meilleure allocation des ressources via la 'main invisible' de Smith." },
    { q:"Quelle est la principale critique de la pyramide de Maslow ?", opts:["Elle ignore les besoins économiques","Elle ne repose sur aucune étude scientifique et est culturellement biaisée","Elle est trop complexe","Elle ne concerne que les pays en développement"], ans:1, explain:"La pyramide de Maslow est critiquée car elle n'a pas de validation empirique, est centrée sur la culture occidentale, et la hiérarchie des besoins est contestable." },
    { q:"Ricardo détermine la valeur d'un bien par :", opts:["Son utilité totale","La quantité de travail nécessaire + la rareté","Son prix de marché","L'offre et la demande seulement"], ans:1, explain:"Ricardo : valeur = rareté absolue (ressources naturelles, ex: diamant) + rareté relative (quantité de travail humain appliqué)." },
    { q:"L'équilibre général de Walras suppose :", opts:["Une intervention de l'État","La concurrence pure et parfaite sur tous les marchés","Des salaires rigides","Une information imparfaite"], ans:1, explain:"L'équilibre général de Walras : en CPP, tous les marchés s'équilibrent simultanément → optimum économique et plein emploi." },
    { q:"Un arbitrage économique implique nécessairement :", opts:["Un gain sans perte","Un renoncement à une autre option","Une intervention de l'État","Une hausse des prix"], ans:1, explain:"Tout arbitrage = choisir entre des alternatives incompatibles → renoncement à au moins une option. Toujours associé à un coût d'opportunité." },
    { q:"Le coût d'opportunité de prendre la voiture plutôt que le bus est :", opts:["Le prix de l'essence","La différence de coût entre les deux modes de transport","Le temps de trajet","Le prix total du billet de bus"], ans:1, explain:"Coût d'opportunité = valeur de l'option non choisie. Si voiture = 1,50€ et bus = 1,00€ → choisir la voiture coûte 0,50€ de plus que l'alternative." },
    { q:"Selon les marginalistes, comment la demande d'un bien évolue-t-elle avec son prix ?", opts:["Elle augmente","Elle est constante","Elle diminue","Elle est imprévisible"], ans:2, explain:"Loi de la demande : si le prix augmente, l'utilité marginale obtenue par euro dépensé diminue → on consomme moins → la demande est décroissante." },
    { q:"Quel est le critère d'optimum dans le raisonnement à la marge ?", opts:["Maximiser la production totale","Équilibrer bénéfice marginal et coût marginal","Minimiser les coûts fixes","Maximiser les revenus"], ans:1, explain:"L'optimum est atteint quand Bénéfice marginal = Coût marginal. Au-delà : Cm > Bm → il n'est plus rentable de continuer." },
    { q:"Les besoins fondamentaux selon Max-Neef sont classés selon :", opts:["5 niveaux comme Maslow","9 besoins + 4 catégories (être, avoir, faire, interagir)","3 types uniquement","Le niveau de revenu"], ans:1, explain:"Max-Neef propose 9 besoins (subsistance, protection, affection, etc.) × 4 catégories (être, avoir, faire, interagir) = grille 9×4." },
    { q:"La notion d'arbitrage est liée à :", opts:["L'abondance des ressources","La rareté des ressources qui force à hiérarchiser","La politique fiscale","Le comportement des producteurs seulement"], ans:1, explain:"Arbitrage existe parce que les ressources sont rares → on ne peut pas tout satisfaire → on doit choisir et hiérarchiser." },
    { q:"Jevons, Menger et Walras ont chacun développé le marginalisme :", opts:["En collaboration étroite","De façon indépendante et simultanée","En s'appuyant sur les travaux de Marx","Après s'être accordés sur une approche commune"], ans:1, explain:"La 'révolution marginaliste' de 1870 est une découverte quasi simultanée et indépendante par trois économistes de nationalités différentes." },
    { q:"La valeur en usage et la valeur en échange sont-elles toujours proportionnelles pour Adam Smith ?", opts:["Oui, toujours","Non, le paradoxe de l'eau/diamant le prouve","Oui, si les marchés sont parfaits","Non, car l'État fixe les prix"], ans:1, explain:"Non : Smith lui-même reconnaît le paradoxe — l'eau (grande valeur d'usage) est moins chère que le diamant (faible valeur d'usage). D'où le recours à la valeur travail." },
    { q:"Le bénéfice marginal d'une heure de travail supplémentaire peut être :", opts:["Toujours croissant","Toujours nul","Décroissant selon la loi de l'utilité marginale","Toujours égal au salaire"], ans:2, explain:"Le bénéfice marginal d'une heure supplémentaire est décroissant : les premières heures sont les plus productives, les dernières apportent moins de satisfaction." },
  ];

  const context = `Tu es un professeur d'économie bienveillant. Tu aides un étudiant à réviser CH1-2 : "Allocation des ressources et choix économiques". Réponds TOUJOURS en français, de manière concise et pédagogique avec des exemples. Cours : besoins humains (Maslow 1943, Max-Neef), allocation des ressources, contrainte budgétaire, arbitrage, coût d'opportunité, raisonnement à la marge, valeur d'usage vs d'échange (Smith), valeur travail (Smith, Ricardo), révolution marginaliste 1870 (Walras, Jevons, Menger), utilité marginale décroissante, paradoxe eau/diamant, équilibre général de Walras, main invisible.`;

  buildGenericChapter('ch1-2', coursHTML, defs, questions, context);
}

// ════════════════════════════════════════════════════════
// CH1-3 — MESURE DE LA RICHESSE
// ════════════════════════════════════════════════════════
function renderCH1_3() {
  const coursHTML = `
  <div class="sec-title">I. Le PIB : instrument de mesure conventionnel</div>
  <div class="sec-sub">Simon Kuznets (1901-1985), père des comptes nationaux, crée l'agrégat PIB en 1934. Prix Nobel 1971.</div>
  <div class="cards-grid">
    <div class="card a1"><h3>📐 3 approches du PIB</h3><ul>
      <li><strong>Production</strong> : Σ VA + impôts − subventions</li>
      <li><strong>Revenus</strong> : salaires + EBE + impôts prod. − subventions</li>
      <li><strong>Dépense</strong> : CF + FBCF + Δstocks + X − M</li>
    </ul><p style="margin-top:8px;color:var(--a3);font-size:12px">⚠️ Les 3 méthodes donnent le même résultat.</p></div>
    <div class="card a2"><h3>📊 PIB nominal vs réel</h3><ul>
      <li><strong>Nominal (valeur)</strong> : prix courants, inclut l'inflation</li>
      <li><strong>Réel (volume)</strong> : corrigé de l'inflation → mesure la vraie croissance</li>
      <li>Taux de croissance = variation du PIB réel</li>
    </ul><p style="margin-top:8px;color:var(--muted);font-size:12px">Trente glorieuses (1950-1973) : ~5% de croissance réelle/an</p></div>
    <div class="card a3"><h3>🌍 PIB, PNB, RNB</h3><ul>
      <li><strong>PIB</strong> : production sur le territoire (résidents)</li>
      <li><strong>PNB</strong> : production des nationaux (où qu'ils soient)</li>
      <li><strong>RNB</strong> : PIB + revenus reçus du RDM − revenus versés au RDM</li>
      <li>Depuis 1993, le RNB remplace le PNB</li>
    </ul></div>
    <div class="card a4"><h3>📈 Intérêt du PIB</h3><ul>
      <li>Mesure l'activité économique d'un pays</li><li>Taux de croissance = ΔPIBréel/PIBréel(n-1) × 100</li>
      <li>PIB/habitant = indicateur du niveau de vie moyen</li>
      <li>Permet les comparaisons internationales</li>
    </ul></div>
  </div>

  <div class="sec-title" style="margin-top:32px">II. Les limites du PIB</div>
  <div class="cards-grid">
    <div class="card a4"><h3>⬇️ PIB sous-évalué</h3><ul>
      <li>Services non marchands évalués au coût de production</li><li>Auto-production (jardinage, bricolage)</li>
      <li>Bénévolat, économie souterraine</li>
    </ul></div>
    <div class="card a2"><h3>⬆️ PIB sur-évalué</h3><ul>
      <li>Pollutions et dépenses de dépollution comptées positivement</li><li>Catastrophes → reconstruction → PIB ↑</li>
      <li>Dépenses médicales liées au stress</li>
    </ul></div>
    <div class="card a5"><h3>📉 PIB et inégalités (Kuznets)</h3><ul>
      <li>Courbe de Kuznets : inégalités ↑ puis ↓ avec le développement</li>
      <li>Courbe de l'éléphant (Milanovic 2014) : remet en cause Kuznets</li>
      <li>PIB/hab moyen ≠ distribution des revenus</li>
    </ul></div>
    <div class="card a3"><h3>🚫 Ce que le PIB ne mesure pas</h3><ul>
      <li>Le bien-être, la qualité de vie</li><li>Les inégalités de répartition</li>
      <li>Les externalités négatives</li><li>Le patrimoine et les stocks</li>
    </ul></div>
  </div>

  <div class="sec-title" style="margin-top:32px">III. Indicateurs alternatifs</div>
  <div style="display:flex;flex-direction:column;gap:12px;margin-top:8px">
    ${[
      ['IDH (PNUD, Amartya Sen)', 'var(--a1)', 'Indice de Développement Humain : combine espérance de vie, éducation (alphabétisation + scolarisation) et revenu par habitant. Classe les pays en développement humain faible/moyen/élevé/très élevé.'],
      ['Empreinte écologique', 'var(--a3)', 'Mesure la superficie de terre productive nécessaire pour satisfaire la consommation d\'une population et absorber ses déchets. Compare avec la biocapacité disponible.'],
      ['Bonheur National Brut (BNB) — Bhoutan', 'var(--a2)', 'Alternative au PIB mesurant le bien-être subjectif, la préservation culturelle, l\'environnement et la bonne gouvernance.'],
      ['Indicateur de bien-être (OCDE)', 'var(--a5)', 'Better Life Index : 11 dimensions (logement, revenu, emploi, communauté, éducation, environnement, civisme, santé, satisfaction, sécurité, équilibre vie/travail).'],
      ['IBEST / ISEW / GPI', 'var(--a4)', 'Indicateurs corrigés qui déduisent les coûts sociaux et environnementaux du PIB et ajoutent les bénéfices non marchands (bénévolat, loisirs).'],
    ].map(([t,c,d])=>`<div style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:14px 16px;border-left:4px solid ${c}">
      <div style="font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:${c};margin-bottom:6px">${t}</div>
      <div style="font-size:13px;color:var(--muted)">${d}</div></div>`).join('')}
  </div>
  ${downloadBar('CH1-3 — Mesure de la richesse')}`;

  const defs = [
    { term:'PIB (Produit Intérieur Brut)', cat:'all', tag:'Mesure', color:'var(--a1)', def:'Indicateur mesurant la valeur totale de la production annuelle des agents résidant sur un territoire. Égal au revenu national et à la somme des VA.', formula:'PIB = Σ VA + impôts sur la production − subventions' },
    { term:'PIB nominal (en valeur)', cat:'all', tag:'Mesure', color:'var(--a1)', def:'PIB calculé aux prix courants, incluant les effets de l\'inflation. Ne permet pas de mesurer la vraie croissance.' },
    { term:'PIB réel (en volume)', cat:'all', tag:'Mesure', color:'var(--a1)', def:'PIB corrigé des effets de l\'inflation. Permet de comparer la production dans le temps et entre pays.', exemple:'Si PIB nominal +3% et inflation +1% → PIB réel ≈ +2%.' },
    { term:'Taux de croissance économique', cat:'all', tag:'Mesure', color:'var(--a1)', def:'Variation du PIB réel d\'une période à l\'autre. Positif = expansion, négatif = récession.', formula:'Taux croissance = (PIB(n) − PIB(n-1)) / PIB(n-1) × 100' },
    { term:'RNB (Revenu National Brut)', cat:'all', tag:'Mesure', color:'var(--a2)', def:'PIB + revenus primaires reçus du reste du monde − revenus primaires versés au reste du monde. Remplace le PNB depuis 1993.', exemple:'Un pays avec beaucoup de travailleurs à l\'étranger peut avoir RNB > PIB.' },
    { term:'PIB/habitant', cat:'all', tag:'Mesure', color:'var(--a2)', def:'PIB divisé par la population. Indicateur du niveau de vie moyen. Ne tient pas compte des inégalités de répartition.' },
    { term:'Valeur Ajoutée (VA)', cat:'all', tag:'Production', color:'var(--a2)', def:'Richesse créée par une unité productive. Somme des VA = PIB (approche production).', formula:'VA = Production − Consommations intermédiaires' },
    { term:'Approche du PIB par la production', cat:'all', tag:'Mesure', color:'var(--a1)', def:'PIB = Somme des valeurs ajoutées de toutes les unités productrices résidentes + impôts sur la production − subventions.' },
    { term:'Approche du PIB par la demande', cat:'all', tag:'Mesure', color:'var(--a1)', def:'PIB = Consommation finale + FBCF + Variation de stocks + Exportations − Importations.', formula:'PIB = CF + FBCF + ΔS + X − M' },
    { term:'Externalité', cat:'all', tag:'Limites PIB', color:'var(--a4)', def:'Effet d\'une activité économique sur des tiers non parties à l\'échange, sans compensation monétaire. Externalité négative : pollution. Positive : vaccination.' },
    { term:'IDH (Indice de Développement Humain)', cat:'all', tag:'Alternatifs', color:'var(--a3)', def:'Indicateur du PNUD (Amartya Sen) combinant espérance de vie, niveau d\'éducation et revenu par habitant. Classe les pays de 0 à 1.' },
    { term:'Courbe de Kuznets', cat:'all', tag:'Inégalités', color:'var(--a5)', def:'Kuznets montre que les inégalités augmentent d\'abord puis diminuent lors du développement économique (courbe en U inversé).', exemple:'Pays émergents : d\'abord plus d\'inégalités, puis réduction avec la croissance.' },
    { term:'Courbe de l\'éléphant (Milanovic 2014)', cat:'all', tag:'Inégalités', color:'var(--a5)', def:'Représentation de la répartition des gains de la mondialisation (1988-2008). Gagnants : classes moyennes des pays émergents. Perdants : classes moyennes des pays riches.', exemple:'Remet en cause la courbe de Kuznets au niveau mondial.' },
    { term:'PIB constant / PIB courant', cat:'all', tag:'Mesure', color:'var(--a2)', def:'PIB courant = prix de l\'année en cours (nominal). PIB constant = prix d\'une année de référence (réel, corrigé de l\'inflation).', exemple:'Pour comparer sur 50 ans, on utilise toujours le PIB constant.' },
    { term:'Empreinte écologique', cat:'all', tag:'Alternatifs', color:'var(--a3)', def:'Surface de terre productive nécessaire pour satisfaire la consommation d\'une population et absorber ses déchets. Mesure la pression sur les écosystèmes.' },
  ];

  const questions = [
    { q:"Qui a créé l'agrégat PIB en 1934 ?", opts:["Keynes","Simon Kuznets","Adam Smith","Walras"], ans:1, explain:"Simon Kuznets (1901-1985), économiste américain, crée le PIB en 1934. Prix Nobel d'économie en 1971." },
    { q:"L'approche du PIB par la production donne :", opts:["CF + FBCF + ΔS + X − M","Salaires + EBE + impôts − subventions","Σ VA + impôts − subventions","PIB + transferts reçus du RDM"], ans:2, explain:"Approche production : PIB = Somme des valeurs ajoutées + impôts sur la production − subventions." },
    { q:"La croissance économique est mesurée par :", opts:["La variation du PIB nominal","La variation du PIB réel","Le PIB/habitant","La variation des exportations"], ans:1, explain:"La croissance = variation du PIB réel (en volume), corrigé de l'inflation. Expansion si positive, récession si négative." },
    { q:"Le RNB (Revenu National Brut) est égal à :", opts:["PIB uniquement","PIB + revenus du RDM reçus − revenus versés au RDM","PIB/habitant","PIB − importations"], ans:1, explain:"RNB = PIB + solde des revenus primaires avec le reste du monde. Remplace le PNB depuis 1993." },
    { q:"Pourquoi le PIB réel est-il préférable au PIB nominal pour comparer la croissance ?", opts:["Car il est toujours plus élevé","Car il est corrigé de l'inflation, reflétant la vraie production","Car il est plus simple à calculer","Car il prend en compte les inégalités"], ans:1, explain:"PIB réel = PIB en volume, corrigé des effets de l'inflation. Si les prix augmentent de 3% mais la production de 1%, le PIB nominal ↑ 4% mais la vraie croissance est de 1%." },
    { q:"Quel indicateur corrige le PIB avec l'espérance de vie et l'éducation ?", opts:["PNB","IDH","Empreinte écologique","BNB"], ans:1, explain:"L'IDH (PNUD, Amartya Sen) combine revenu par habitant + espérance de vie + éducation. Classe les pays de 0 (très faible) à 1 (très élevé)." },
    { q:"Une des critiques du PIB est qu'il ne mesure pas :", opts:["La valeur de la production marchande","Le chiffre d'affaires des entreprises","Le bien-être et les inégalités de répartition","Les revenus des salariés"], ans:2, explain:"Le PIB mesure la production, pas le bien-être ni la répartition. Un PIB/hab élevé peut coexister avec de fortes inégalités et un faible bien-être." },
    { q:"Pourquoi le PIB est-il parfois SOUS-ÉVALUÉ ?", opts:["Car il inclut les activités polluantes","Car il ignore l'auto-production, le bénévolat et l'économie souterraine","Car il surpondère les exportations","Car il ne tient pas compte de l'inflation"], ans:1, explain:"PIB sous-évalué : ne comptabilise pas l'auto-production (jardinage, bricolage), le bénévolat, les activités non déclarées, la production non marchande." },
    { q:"La courbe de Kuznets sur les inégalités prédit que :", opts:["Les inégalités augmentent toujours avec le développement","Les inégalités diminuent toujours","Les inégalités augmentent puis diminuent avec le développement","Les inégalités ne sont pas liées au développement"], ans:2, explain:"Kuznets : en U inversé. Les inégalités ↑ avec l'industrialisation (secteurs à forte productivité vs faible), puis ↓ quand les gains se généralisent." },
    { q:"La courbe de l'éléphant de Milanovic (2014) montre que les perdants de la mondialisation 1988-2008 sont :", opts:["Les pays les plus pauvres","Les classes moyennes des pays riches occidentaux","Les pays émergents","Les grandes entreprises"], ans:1, explain:"Milanovic : gagnants = classes moyennes des émergents (Chine, Inde). Perdants = classes moyennes des anciens pays industrialisés (USA, Europe)." },
    { q:"L'approche du PIB par la dépense est :", opts:["Σ VA + impôts − subventions","CF + FBCF + ΔStocks + X − M","Salaires + EBE + impôts","PIB + transferts du RDM"], ans:1, explain:"Approche dépense : PIB = Consommation finale + FBCF + Variation de stocks + Exportations − Importations." },
    { q:"Qu'est-ce qu'une externalité négative ?", opts:["Un effet positif non compensé d'une activité sur des tiers","Un effet négatif non compensé d'une activité sur des tiers","Une taxe sur la production","Une baisse du PIB"], ans:1, explain:"Externalité négative : effet néfaste d'une activité sur des tiers sans compensation (pollution industrielle, bruit, congestion routière)." },
    { q:"Pendant les Trente Glorieuses (1950-1973), le taux de croissance moyen était de :", opts:["0-1% par an","2-3% par an","~5% par an","10% par an"], ans:2, explain:"Les Trente Glorieuses : croissance réelle élevée, ~5%/an en France. Après le 1er choc pétrolier (1973), PIB réel baisse, PIB nominal augmente (inflation)." },
    { q:"Le PIB est-il un bon indicateur du bien-être des populations ?", opts:["Oui, toujours","Non, il ignore les inégalités, les externalités et le bien-être subjectif","Oui, car il mesure le revenu moyen","Non, car il est difficile à calculer"], ans:1, explain:"Non : le PIB mesure la production marchande mais ignore les inégalités, le bien-être subjectif, les externalités négatives, les activités non marchandes." },
    { q:"Le Bonheur National Brut (BNB) est utilisé par :", opts:["La France","Les États-Unis","Le Bhoutan","La Chine"], ans:2, explain:"Le Bhoutan est le premier pays à avoir adopté le BNB comme objectif politique officiel, intégrant bien-être, culture, environnement et gouvernance." },
    { q:"Pourquoi une catastrophe naturelle peut faire augmenter le PIB ?", opts:["Car elle réduit la population","Car les dépenses de reconstruction sont comptabilisées dans le PIB","Car elle augmente les exportations","Car elle réduit les importations"], ans:1, explain:"PIB sur-évalué : une catastrophe génère des dépenses médicales, de reconstruction, de sécurité → PIB ↑ sans que le bien-être s'améliore." },
    { q:"Le PIB/habitant est un indicateur du :", opts:["Niveau de vie moyen","Répartition des revenus","Bien-être subjectif","Taux d'emploi"], ans:0, explain:"PIB/habitant = niveau de vie moyen. Mais un PIB/hab élevé peut masquer de fortes inégalités (ex : pays pétroliers avec forte pauvreté)." },
    { q:"Le PIB inclut-il les activités souterraines (non déclarées) ?", opts:["Toujours","Jamais","Certaines (trafic de drogue depuis 2014 en France)","Seulement si formelles"], ans:2, explain:"L'INSEE a intégré en 2014 certaines activités illicites (trafic de drogue, prostitution) pour harmoniser avec les normes européennes." },
    { q:"L'empreinte écologique mesure :", opts:["Le PIB vert","La surface de terre nécessaire pour soutenir la consommation d'une population","Le coût des externalités négatives","Le nombre d'espèces menacées"], ans:1, explain:"L'empreinte écologique = surface productive nécessaire pour la consommation + absorption des déchets. Si >biocapacité → insoutenable." },
    { q:"Quelle est la différence entre PIB et PNB ?", opts:["Aucune différence","PIB = production sur le territoire ; PNB = production des nationaux (où qu'ils soient)","PIB inclut les transferts sociaux, pas le PNB","Le PNB est toujours plus élevé que le PIB"], ans:1, explain:"PIB : critère géographique (territoire). PNB : critère de nationalité. Ex : Renault produisant en Espagne → dans le PIB espagnol, pas français." },
    { q:"L'IDH de l'ONU (PNUD) combine :", opts:["PIB + importations + exportations","Espérance de vie + éducation + revenu/habitant","Taux d'emploi + PIB + natalité","Inégalités + croissance + inflation"], ans:1, explain:"IDH = 3 composantes : santé (espérance de vie), éducation (alphabétisation + scolarisation), niveau de vie (RNB/habitant en PPA)." },
    { q:"Selon Pareto (analyse du bien-être), l'optimum social est atteint quand :", opts:["Le PIB est maximal","Aucun individu ne peut améliorer son bien-être sans détériorer celui d'un autre","Tout le monde a le même revenu","Le chômage est nul"], ans:1, explain:"Optimum de Pareto : situation où on ne peut améliorer le bien-être d'un individu sans détériorer celui d'un autre. Équilibre en CPP." },
    { q:"Quel passage du cours illustre les limites du PIB : « le Japon va mieux, les Japonais moins bien » ?", opts:["Le PIB peut augmenter grâce aux exportations","Le PIB peut progresser alors que le bien-être décline","Le PIB mesure toujours le bien-être","Le PIB est sur-évalué en cas de déflation"], ans:1, explain:"(Le Monde, 2003) : le PIB japonais progresse mais les Japonais sont moins satisfaits. Illustre le découplage entre croissance du PIB et bien-être ressenti." },
    { q:"Le PIB en prix CONSTANTS permet de :", opts:["Inclure les effets de l'inflation","Comparer la production dans le temps en neutralisant l'inflation","Mesurer les inégalités","Calculer les dépenses publiques"], ans:1, explain:"PIB constant = prix d'une année de référence. Neutralise l'inflation pour ne refléter que les variations de production réelle." },
    { q:"La notion d'externalité positive est illustrée par :", opts:["La pollution industrielle","La vaccination qui protège aussi les non-vaccinés","Les embouteillages","La déforestation"], ans:1, explain:"Externalité positive : la vaccination procure des bénéfices à des tiers (immunité collective) sans qu'ils paient. Ces bénéfices ne sont pas captés par le PIB." },
  ];

  const context = `Tu es un professeur d'économie bienveillant. Tu aides un étudiant à réviser CH1-3 : "La mesure de la richesse et comparaisons internationales". Réponds TOUJOURS en français, de manière concise et pédagogique. Cours : PIB (3 approches : production, revenus, dépenses), PIB nominal vs réel, taux de croissance, PIB/habitant, PIB vs PNB vs RNB, limites du PIB (sous/sur-évaluation, externalités, inégalités, bien-être), courbe de Kuznets, courbe de l'éléphant de Milanovic 2014, indicateurs alternatifs (IDH/PNUD, empreinte écologique, BNB Bhoutan, indicateur OCDE). Théoriciens : Kuznets, Pareto, Pigou, Milanovic, Amartya Sen, Mill, Jevons.`;

  buildGenericChapter('ch1-3', coursHTML, defs, questions, context);
}

// ════════════════════════════════════════════════════════
// CH2 — TRANSFORMATIONS DU SYSTÈME PRODUCTIF
// ════════════════════════════════════════════════════════
function renderCH2() {
  const coursHTML = `
  <div class="sec-title">I. Caractéristiques du système productif</div>
  <div class="sec-sub">"L'ensemble des facteurs et acteurs concourant à la production, circulation et consommation de richesses" (Carroué, 2013)</div>
  <div class="cards-grid">
    <div class="card a1"><h3>🌿 Les secteurs d'activité (Colin Clark)</h3><ul>
      <li><strong>Primaire</strong> : exploitation des ressources naturelles (agriculture, mines)</li>
      <li><strong>Secondaire</strong> : transformation (industrie, BTP)</li>
      <li><strong>Tertiaire</strong> : services (commerce, banques, conseil)</li>
      <li><strong>Quaternaire</strong> (Debonneuil) : services intellectuels + numérique (industrie 4.0)</li>
    </ul></div>
    <div class="card a2"><h3>🏢 Taille des entreprises (INSEE)</h3><ul>
      <li><strong>Microentreprise</strong> : &lt;10 salariés, CA &lt;2M€</li>
      <li><strong>PME</strong> : &lt;250 salariés, CA &lt;50M€</li>
      <li><strong>ETI</strong> : 250-4999 salariés, CA &lt;1,5Md€</li>
      <li><strong>Grande entreprise</strong> : ≥5000 salariés</li>
      <li>France : 5 400 ETI vs 12 500 en Allemagne (INSEE 2022)</li>
    </ul></div>
    <div class="card a3"><h3>🏛 Secteur public vs privé</h3><ul>
      <li><strong>Nationalisations 1</strong> : 1945-1946 (Gaulle) — Air France, EDF-GDF</li>
      <li><strong>Nationalisations 2</strong> : 1981-1982 (Mitterrand) — Matra, BNP, Paribas</li>
      <li><strong>Privatisations</strong> : 1986 → aujourd'hui</li>
      <li>APE gère 86 participations (209Md€ en 2025)</li>
      <li>EDF renationalisée 100% en 2023</li>
    </ul></div>
    <div class="card a4"><h3>📍 Espaces productifs</h3><ul>
      <li>France : 7ème puissance mondiale (FMI 2024)</li>
      <li>Industrie : 10% du PIB, 11% des emplois</li>
      <li>Services : 77% du PIB, 76% des emplois</li>
      <li>Tourisme : 8% du PIB, 2M d'emplois</li>
      <li>Pôles de compétitivité + territoires d'innovation</li>
    </ul></div>
  </div>

  <div class="sec-title" style="margin-top:32px">II. Concentration de l'offre</div>
  <div class="cards-grid">
    <div class="card a1"><h3>📌 Définition</h3><p>Processus permettant à un nombre restreint de grandes firmes de dominer une part importante des marchés.</p><ul>
      <li>Modifie la structure du marché</li><li>Renforce le pouvoir économique</li>
    </ul></div>
    <div class="card a2"><h3>Types de concentration</h3><ul>
      <li><strong>Verticale</strong> : contrôle des fournisseurs (amont) et distributeurs (aval)</li>
      <li><strong>Horizontale</strong> : rachat d'entreprises similaires → économies d'échelle</li>
      <li><strong>Conglomérale</strong> : diversification, répartition des risques</li>
    </ul></div>
    <div class="card a3"><h3>Structures de marché</h3><ul>
      <li><strong>Monopole</strong> : 1 offreur (SNCF Réseau)</li>
      <li><strong>Oligopole</strong> : quelques offreurs (automobile)</li>
      <li><strong>Monopsone</strong> : 1 acheteur (tabac/SEITA)</li>
      <li><strong>Oligopsone</strong> : quelques acheteurs (centrales d'achat GMS)</li>
    </ul></div>
    <div class="card a5"><h3>5 conditions CPP (Walras)</h3><ul>
      <li>Homogénéité du produit</li><li>Atomicité (nombreux offreurs/demandeurs)</li>
      <li>Libre entrée et sortie</li><li>Libre circulation des facteurs</li>
      <li>Information parfaite</li>
    </ul></div>
  </div>

  <div class="sec-title" style="margin-top:32px">III. Mutations du système productif</div>
  <div class="cards-grid">
    <div class="card a1"><h3>📉 Désindustrialisation</h3><ul>
      <li>Industrie : 40% emplois (1960) → 11% (2024)</li>
      <li>Causes : automatisation, délocalisation, recherche de productivité</li>
      <li>Faiblesse R&D, positionnement moyen de gamme concurrentiel</li>
    </ul></div>
    <div class="card a2"><h3>🌐 Tertiarisation</h3><ul>
      <li>Services = 77% PIB et 76% des emplois</li>
      <li>Industrie de services : Amazon, logistique standardisée</li>
      <li>Services s'industrialisent (standardisation des tâches)</li>
    </ul></div>
    <div class="card a3"><h3>💻 Numérisation (Industrie 4.0)</h3><ul>
      <li>Usines intelligentes, robots, IA</li><li>Secteur quaternaire transversal</li>
      <li>Économies d'échelle sur les données</li>
      <li>GAFAM : domination par les données + réseau</li>
    </ul></div>
    <div class="card a4"><h3>🌍 Défis sociaux</h3><ul>
      <li>Lutte contre les inégalités renforcées par la mondialisation</li>
      <li>Chômage technologique</li><li>Éducation/formation à adapter</li>
      <li>Délocalisation vs relocalisation ("Made in France")</li>
    </ul></div>
  </div>

  <div class="sec-title" style="margin-top:32px">IV. Gains de productivité</div>
  <div class="cards-grid">
    <div class="card a1"><h3>📐 Définitions</h3>
      <ul><li><strong>Productivité du travail</strong> = VA / Quantité de travail</li>
      <li><strong>Productivité du capital</strong> = VA / Capital utilisé</li>
      <li><strong>Gain de productivité</strong> : le rapport ↑ dans le temps</li></ul>
    </div>
    <div class="card a2"><h3>💰 Partage des gains</h3><p>Les gains de productivité peuvent être répartis entre :</p><ul>
      <li>Salariés (↑ salaires)</li><li>Consommateurs (↓ prix)</li>
      <li>Actionnaires (↑ dividendes)</li><li>Investissement futur</li>
    </ul></div>
    <div class="card a3"><h3>🔬 Nordhaus (2008)</h3><p>Les industries à forte croissance de productivité baissent leurs prix relatifs. Les gains de productivité sont <strong>transférés aux consommateurs</strong> via des prix plus bas.</p></div>
  </div>
  ${downloadBar('CH2 — Transformations du système productif')}`;

  const defs = [
    { term:'Système productif', cat:'all', tag:'Core', color:'var(--a1)', def:'Ensemble des facteurs et acteurs concourant à la production, la circulation et la consommation de richesses (Carroué, 2013).' },
    { term:'Branche d\'activité', cat:'all', tag:'Structure', color:'var(--a1)', def:'Regroupement des entreprises qui produisent le même type de bien ou service. Ex : industrie manufacturière, tourisme.' },
    { term:'Secteur d\'activité', cat:'all', tag:'Structure', color:'var(--a1)', def:'Regroupement des entreprises ayant la même activité principale. Moins homogène que la branche (une entreprise multiactivité ≠ branche unique).', exemple:'Les 3 secteurs traditionnels : primaire, secondaire, tertiaire (Colin Clark). + quaternaire (Debonneuil).' },
    { term:'Secteur quaternaire', cat:'all', tag:'Structure', color:'var(--a2)', def:'Secteur des services intellectuels à haute valeur ajoutée : numérique, IA, innovation, communication. Conjugue industrie + services. Transversal aux autres secteurs (Michèle Debonneuil).' },
    { term:'Industrie 4.0', cat:'all', tag:'Numérique', color:'var(--a2)', def:'4ème révolution industrielle : usines intelligentes, robots, IA, IoT. Plus rapide et exponentielle que les révolutions précédentes. Transforme la production dans tous les secteurs.' },
    { term:'PME', cat:'all', tag:'Taille', color:'var(--a3)', def:'Petite et Moyenne Entreprise : moins de 250 salariés, CA annuel < 50M€ ou bilan < 43M€.' },
    { term:'ETI', cat:'all', tag:'Taille', color:'var(--a3)', def:'Entreprise de Taille Intermédiaire : 250-4999 salariés, CA < 1,5Md€. La France en manque par rapport à l\'Allemagne (5 400 vs 12 500).' },
    { term:'Nationalisation', cat:'all', tag:'Public/Privé', color:'var(--a4)', def:'Transfert de propriété d\'une entreprise vers l\'État, avec indemnisation. En France : deux vagues majeures (1945-46 et 1981-82).' },
    { term:'Privatisation', cat:'all', tag:'Public/Privé', color:'var(--a4)', def:'Vente par l\'État de ses participations dans une entreprise publique à des investisseurs privés via une Offre Publique de Vente (OPV).' },
    { term:'Concentration économique', cat:'all', tag:'Marché', color:'var(--a5)', def:'Processus permettant à un nombre restreint d\'entreprises de dominer une part croissante du marché. Types : verticale, horizontale, conglomérale.' },
    { term:'Concentration verticale', cat:'all', tag:'Marché', color:'var(--a5)', def:'Une entreprise contrôle ses fournisseurs (amont) et/ou ses circuits de distribution (aval). Réduit la dépendance.', exemple:'LVMH possède ses boutiques (aval) et contrôle la production de ses matières premières (amont).' },
    { term:'Concentration horizontale', cat:'all', tag:'Marché', color:'var(--a5)', def:'Rachat d\'entreprises du même secteur. Génère des économies d\'échelle et augmente la part de marché.', exemple:'Renault + Nissan + Mitsubishi = Alliance automobile.' },
    { term:'Concentration conglomérale', cat:'all', tag:'Marché', color:'var(--a5)', def:'Rachat d\'entreprises sans liens techniques entre elles. Objectif : diversification des risques.', exemple:'Bouygues : construction + télécoms + médias.' },
    { term:'Monopole', cat:'all', tag:'Marché', color:'var(--a5)', def:'Structure de marché avec un seul vendeur face à de nombreux acheteurs. Le monopoleur fixe son prix.', exemple:'SNCF Réseau pour les voies ferrées françaises.' },
    { term:'Oligopole', cat:'all', tag:'Marché', color:'var(--a5)', def:'Quelques grands vendeurs face à de nombreux acheteurs. Chaque acteur influence le marché.', exemple:'Renault + Peugeot + quelques firmes étrangères sur le marché automobile français.' },
    { term:'Désindustrialisation', cat:'all', tag:'Mutation', color:'var(--a4)', def:'Recul de l\'industrie dans la part de l\'emploi et du PIB. Causée par l\'automatisation, les délocalisations, la faiblesse de la R&D.', exemple:'France : industrie = 40% emplois (1960) → 11% (2024).' },
    { term:'Tertiarisation', cat:'all', tag:'Mutation', color:'var(--a4)', def:'Montée en puissance des services dans l\'économie. En France, les services représentent 77% du PIB et 76% de l\'emploi en 2024.' },
    { term:'Gains de productivité', cat:'all', tag:'Productivité', color:'var(--a1)', def:'Augmentation du rapport production/facteurs. Permet de produire plus avec moins ou autant de facteurs. Source principale : progrès technique.', formula:'Productivité du travail = VA / Nombre d\'heures travaillées' },
  ];

  const questions = [
    { q:"Qu'est-ce qu'une branche d'activité ?", opts:["Regroupement d'entreprises par taille","Regroupement d'entreprises produisant le même type de B&S","Une division administrative","L'ensemble des PME"], ans:1, explain:"Une branche = toutes les entreprises qui produisent le même type de bien ou service (ex : industrie alimentaire, assurances)." },
    { q:"Le secteur quaternaire désigne :", opts:["L'agriculture avancée","Les services intellectuels et numériques (IA, innovation)","L'industrie lourde","Le commerce de détail"], ans:1, explain:"Secteur quaternaire (Debonneuil) : services intellectuels à haute valeur ajoutée, numérique, IA. Transversal aux autres secteurs." },
    { q:"En France, combien d'ETI y a-t-il environ (INSEE 2022) ?", opts:["500","5 400","12 500","50 000"], ans:1, explain:"France ≈ 5 400 ETI contre 12 500 en Allemagne. Ce déficit explique en partie la faiblesse de l'industrie française à l'export." },
    { q:"La première vague de nationalisations en France date de :", opts:["1936","1945-1946","1968","1981-1982"], ans:1, explain:"1ère vague 1945-46 sous de Gaulle : reconstruction nationale, indépendance stratégique. Création Air France, EDF-GDF, Charbonnages." },
    { q:"La nationalisation consiste à :", opts:["Vendre une entreprise publique au privé","Transférer la propriété d'une entreprise à l'État avec indemnisation","Fusionner deux entreprises privées","Fermer une entreprise en faillite"], ans:1, explain:"Nationalisation = l'État prend le contrôle d'une entreprise en indemnisant les propriétaires. Opposite = privatisation." },
    { q:"La concentration verticale consiste à :", opts:["Racheter des concurrents directs","Contrôler les fournisseurs en amont et distributeurs en aval","Diversifier dans des secteurs différents","Réduire le nombre de salariés"], ans:1, explain:"Concentration verticale : l'entreprise contrôle sa chaîne de valeur de bout en bout (fournisseurs + distribution)." },
    { q:"Un oligopsone, c'est :", opts:["Quelques vendeurs, beaucoup d'acheteurs","Beaucoup de vendeurs, un seul acheteur","Beaucoup de vendeurs, quelques acheteurs","Un seul vendeur, beaucoup d'acheteurs"], ans:2, explain:"Oligopsone : beaucoup de producteurs (PME) face à quelques acheteurs puissants (centrales d'achat des grandes surfaces)." },
    { q:"Les 5 conditions de la concurrence pure et parfaite (Walras) incluent :", opts:["Monopole naturel, taxes, subventions","Homogénéité, atomicité, libre entrée, libre circulation, info parfaite","Économies d'échelle, barrières à l'entrée, brevets","Prix fixes, quotas, réglementation"], ans:1, explain:"CPP (Walras) : 1) Homogénéité du produit 2) Atomicité (nombreux agents) 3) Libre entrée/sortie 4) Libre circulation des facteurs 5) Info parfaite." },
    { q:"La désindustrialisation en France est causée notamment par :", opts:["Une surproduction industrielle","L'automatisation, les délocalisations, la faible R&D","Un excès de PME industrielles","Une trop forte protection tarifaire"], ans:1, explain:"Causes de la désindustrialisation française : automatisation, délocalisation (textiles, sidérurgie), faible R&D, positionnement moyen de gamme très concurrentiel." },
    { q:"En France, les services représentent quelle part du PIB en 2024 ?", opts:["40%","57%","77%","90%"], ans:2, explain:"Services = 77% du PIB et 76% des emplois en France (2024). La tertiarisation est massive depuis les années 1970." },
    { q:"L'Agence des Participations de l'État (APE) gère :", opts:["Toutes les entreprises françaises","Les participations de l'État dans ~86 entreprises","Uniquement les banques publiques","Les collectivités locales"], ans:1, explain:"L'APE (créée 2004) gère ~86 participations de l'État dans des secteurs stratégiques : défense, énergie, transport, aéronautique, audiovisuel." },
    { q:"EDF a été renationalisée à 100% en :", opts:["2011","2017","2022-2023","2014"], ans:2, explain:"L'État a décidé fin 2022 de rachat total d'EDF → 100% public depuis juin 2023, pour soutenir le développement du nucléaire." },
    { q:"La productivité du travail est calculée comme :", opts:["Salaire / Effectif","VA / Quantité de travail (heures ou effectif)","PIB / Population","CA / Nombre de clients"], ans:1, explain:"Productivité du travail = VA / Quantité de travail. Mesure l'efficacité du facteur travail dans la création de valeur." },
    { q:"Selon Nordhaus (2008), les gains de productivité d'une industrie sont principalement :", opts:["Captés par les actionnaires","Transférés aux consommateurs via des prix plus bas","Absorbés par les salaires","Réinvestis en R&D"], ans:1, explain:"Nordhaus : les industries à forte productivité baissent leurs prix relatifs → les consommateurs bénéficient des gains via des prix plus bas." },
    { q:"La concentration conglomérale vise surtout à :", opts:["Réduire les coûts de production","Contrôler la chaîne de valeur","Diversifier les risques sur des marchés différents","Dominer un seul marché"], ans:2, explain:"Conglomérat = diversification dans des secteurs non liés pour répartir les risques (si un secteur chute, d'autres compensent)." },
    { q:"Le tourisme représente en France :", opts:["2% du PIB et 500 000 emplois","8% du PIB et 2 millions d'emplois","15% du PIB et 5 millions d'emplois","4% du PIB et 1 million d'emplois"], ans:1, explain:"Le tourisme = 8% du PIB français et 2M d'emplois. La France est régulièrement le pays le plus visité au monde (~100M de touristes/an)." },
    { q:"L'industrie 4.0 se caractérise principalement par :", opts:["Le retour à la production artisanale","Les usines intelligentes, robots, IA et connexion numérique","La délocalisation massive","La suppression de la concurrence"], ans:1, explain:"Industrie 4.0 = 4ème révolution industrielle : usines intelligentes, robots, IA, IoT, big data. Plus rapide et transversale que les précédentes." },
    { q:"Un monopole naturel existe quand :", opts:["L'État décide d'intervenir","Les coûts fixes sont si élevés qu'un seul producteur est optimal","Un seul producteur fait faillite","La demande est très faible"], ans:1, explain:"Monopole naturel : les coûts fixes très élevés rendent une seule infrastructure plus efficace (voies ferrées, réseaux eau, électricité)." },
    { q:"La France se classe comment au classement FMI des puissances économiques en 2024 ?", opts:["3ème","5ème","7ème","10ème"], ans:2, explain:"France = 7ème puissance économique mondiale en 2024 (FMI), derrière USA, Chine, Japon, Allemagne, Inde, Royaume-Uni. 3ème en Europe." },
    { q:"Les pôles de compétitivité visent à :", opts:["Concentrer les PME dans les zones rurales","Regrouper entreprises, universités et centres R&D sur un territoire pour innover","Privatiser les services publics","Réduire le nombre d'ETI"], ans:1, explain:"Les pôles de compétitivité regroupent entreprises + universités + centres de recherche sur des thématiques d'innovation pour renforcer la compétitivité." },
    { q:"La 2ème vague de nationalisations (1981-82) visait à :", opts:["Préparer les privatisations","Relancer la croissance et l'emploi dans une optique keynésienne","Réduire la dette publique","Libéraliser les marchés financiers"], ans:1, explain:"Mitterrand 1981 : nationalisations massives (Matra, Dassault, BNP, Paribas...) pour que l'État relance la croissance et l'emploi — logique keynésienne." },
    { q:"Le secteur primaire comprend :", opts:["Les services financiers","L'industrie de transformation","L'exploitation des ressources naturelles","La construction"], ans:2, explain:"Secteur primaire (Colin Clark) = collecte et exploitation des ressources naturelles : agriculture, pêche, mines, sylviculture." },
    { q:"Pourquoi la frontière industrie/services est-elle de plus en plus floue ?", opts:["Car les services sont en déclin","Car l'industrie offre des services (ex: financement auto) et les services s'industrialisent (ex: Amazon)","Car les deux secteurs fusionnent légalement","Car les statistiques ne les distinguent plus"], ans:1, explain:"Frontière floue : les industriels proposent des services (financements, maintenance, connectivité) et les services rationalisent leur production (Amazon, McDo)." },
    { q:"Quelle est la part de l'industrie dans le PIB français en 2025 ?", opts:["40%","25%","10%","5%"], ans:2, explain:"L'industrie ne représente plus que ~10% du PIB en 2025 (contre 30%+ dans les années 1960-70). Recul massif dû à la désindustrialisation." },
    { q:"Les entreprises réalisent des gains de productivité grâce à :", opts:["L'augmentation des salaires uniquement","Le progrès technique, la meilleure organisation du travail et les économies d'échelle","La baisse du capital","La réduction des exportations"], ans:1, explain:"Gains de productivité : progrès technique (taylorisme, robots, IA), meilleure organisation, qualification des travailleurs, économies d'échelle." },
    { q:"Qu'est-ce qui explique le déficit d'ETI en France vs Allemagne ?", opts:["La taille plus petite de la France","La faible croissance des PME et les barrières à l'entrée des marchés","La trop forte présence de l'État","La préférence française pour les grandes entreprises"], ans:1, explain:"Déficit ETI France : PME qui ne parviennent pas à grandir (barrières à l'entrée, financement insuffisant, manque de marchés à l'international)." },
    { q:"La relocalisation consiste à :", opts:["Délocaliser davantage d'usines","Rapatrier des activités productives précédemment délocalisées","Fermer des usines en France","Augmenter les importations"], ans:1, explain:"Relocalisation = retour d'activités précédemment délocalisées. Motivations : coûts logistiques, qualité, souveraineté, image 'Made in France'." },
    { q:"La productivité du capital mesure :", opts:["Le salaire par unité de capital","La production obtenue divisée par le capital utilisé","Le bénéfice net par action","Le taux de rentabilité financière"], ans:1, explain:"Productivité du capital = Volume de production / Volume du capital utilisé. Mesure l'efficacité du facteur capital." },
    { q:"La concurrence pure et parfaite (CPP) est dans la réalité :", opts:["La règle générale","L'exception — la concurrence imparfaite est souvent la règle","Toujours vérifiée dans les marchés numériques","Imposée par la loi en France"], ans:1, explain:"CPP = idéal théorique. En réalité, les marchés sont souvent oligopolistiques ou monopolistiques. La concurrence imparfaite est la norme." },
    { q:"La Française des Jeux (FDJ) est un exemple de :", opts:["Nationalisation récente","Privatisation partielle (l'État conserve ~20% du capital)","Concentration conglomérale","ETI française typique"], ans:1, explain:"La FDJ a été privatisée : l'État a vendu la majorité du capital tout en conservant ~20% et un droit de regard. Exemple de privatisation partielle." },
  ];

  const context = `Tu es un professeur d'économie bienveillant. Tu aides un étudiant à réviser CH2 : "Quelles sont les transformations contemporaines du système productif ?". Réponds TOUJOURS en français, de manière concise et pédagogique. Cours : définition système productif (Carroué), branches vs secteurs d'activité, 4 secteurs (Clark : primaire/secondaire/tertiaire + quaternaire Debonneuil, industrie 4.0), tailles d'entreprises (INSEE), secteur public vs privé (nationalisations 1945+1981, privatisations 1986→), APE (86 entreprises), désindustrialisation, tertiarisation, numérique, concentration (verticale/horizontale/conglomérale, monopole/oligopole/monopsone/oligopsone), 5 conditions CPP (Walras), gains de productivité (Nordhaus), mondialisation et défis sociaux. Théoriciens : Colin Clark, Debonneuil, Walras, Nordhaus.`;

  buildGenericChapter('ch2', coursHTML, defs, questions, context);
}

// ════════════════════════════════════════════════════════
//  CH3 — FULL CONTENT
// ════════════════════════════════════════════════════════
function renderCH3() {
  const tabs = [
    { id:'agents',    label:'🏛 Agents'      },
    { id:'fonctions', label:'⚙️ Fonctions'    },
    { id:'formules',  label:'📐 Formules'     },
    { id:'theories',  label:'📚 Théoriciens'  },
    { id:'circuit',   label:'🔄 Circuit'      },
    { id:'defs',      label:'📖 Définitions'  },
    { id:'quiz',      label:'🎯 Quiz'         },
    { id:'chatbot',   label:'🤖 Prof IA'      },
  ];

  // Build tab bar
  const nav = document.getElementById('chapter-nav');
  nav.innerHTML = tabs.map((t,i) =>
    `<button class="ch-tab${i===0?' active':''}" onclick="switchChTab('${t.id}',this)">${t.label}</button>`
  ).join('');

  // Build sections container
  const container = document.getElementById('chapter-sections');
  container.innerHTML = tabs.map((t,i) =>
    `<div id="chs-${t.id}" class="ch-section${i===0?' active':''}"></div>`
  ).join('');

  // Populate each section
  buildAgentsSec();
  buildFonctionsSec();
  buildFormulesSec();
  buildTheoriesSec();
  buildCircuitSec();
  buildDefsSec();
  buildQuizSec();
  buildChatbotSec();
}

function switchChTab(id, btn) {
  document.querySelectorAll('.ch-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.ch-section').forEach(s => s.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('chs-' + id).classList.add('active');
}

// ── AGENTS section ──
function buildAgentsSec() {
  document.getElementById('chs-agents').innerHTML = `
  <div class="sec-title">Les 6 secteurs institutionnels (INSEE)</div>
  <div class="sec-sub">Chaque agent a une fonction principale et des ressources spécifiques.</div>
  <div class="cards-grid">
    <div class="card a1"><h3>🏦 Sociétés Financières (SF)</h3><p>Financement de l'économie via l'intermédiation financière (banques, assurances) et les marchés.</p><ul><li>Banques commerciales, BCE</li><li>Sociétés d'assurance, mutuelles</li><li>Ressources : <strong>intérêts & commissions</strong></li></ul></div>
    <div class="card a2"><h3>🏭 Sociétés Non Financières (SNF)</h3><p>Production de biens et services non financiers — crée l'essentiel de la valeur ajoutée.</p><ul><li>Entreprises privées et publiques</li><li>VA = Production − CI</li><li>Ressources : <strong>profit</strong></li></ul></div>
    <div class="card a3"><h3>⚖️ Administrations Publiques (APU)</h3><p>Production de services non marchands et redistribution des richesses.</p><ul><li>APUC (État, ODAC)</li><li>APUL (collectivités locales)</li><li>ASSO (Sécu, hôpitaux)</li><li>Ressources : <strong>impôts et taxes</strong></li></ul></div>
    <div class="card a4"><h3>🤝 ISBLSM</h3><p>Institutions Sans But Lucratif au Service des Ménages. Produisent des services non marchands pour les ménages.</p><ul><li>Associations, syndicats, fondations</li><li>Ressources : <strong>cotisations volontaires + subventions</strong></li></ul></div>
    <div class="card a5"><h3>👨‍👩‍👧 Ménages</h3><p>Personnes physiques partageant une résidence principale. Fonction principale : consommer.</p><ul><li>Revenus primaires : salaires, dividendes, loyers</li><li>Peuvent aussi produire (entreprises individuelles)</li><li>Ressources : <strong>revenus d'activité + propriété</strong></li></ul></div>
    <div class="card"><h3>🌍 Reste du Monde (RDM)</h3><p>Décrit les relations entre résidents et non-résidents. Quantifié dans la balance des paiements.</p></div>
  </div>`;
}

// ── FONCTIONS section ──
function buildFonctionsSec() {
  document.getElementById('chs-fonctions').innerHTML = `
  <div class="sec-title">Fonctions des principaux agents</div>
  <div class="sec-sub">Ce que fait chaque acteur dans le circuit économique.</div>
  <div class="cards-grid">
    <div class="card a5"><h3>🛒 Ménages : Consommer & Épargner</h3><ul>
      <li><strong>Revenu disponible</strong> = Revenus primaires − PO + Prestations</li>
      <li><strong>Revenu arbitrable</strong> = Revenu dispo − Dépenses pré-engagées (&gt;30%)</li>
      <li><strong>Épargne brute</strong> = Revenu dispo brut − Consommation</li>
      <li>4 motifs d'épargne : prévoyance, précaution, spéculation, patrimoine</li>
      <li>Loi d'Engel : ↑ revenu → ↓ part alimentaire</li>
    </ul></div>
    <div class="card a2"><h3>🏭 Entreprises : Produire & Investir</h3><ul>
      <li>Combinaison travail + capital → production de B&S</li>
      <li><strong>Investissement (FBCF)</strong> : matériel, immatériel, remplacement, capacité, productivité</li>
      <li>4 déterminants : profit accumulé, profit espéré, niveau demande, prix relatif des facteurs</li>
      <li>Économies d'échelle (leader) vs courbe d'expérience (pionnier)</li>
    </ul></div>
    <div class="card a1"><h3>🏦 Banques : Financer</h3><ul>
      <li>Collectent l'épargne des agents à <strong>capacité de financement</strong></li>
      <li>Prêtent aux agents à <strong>besoin de financement</strong></li>
      <li>Création monétaire scripturale : « les crédits font les dépôts »</li>
      <li>Désintermédiation : 80% (1980) → &lt;40% (aujourd'hui)</li>
    </ul></div>
    <div class="card a3"><h3>⚖️ État : Redistribuer & Réguler</h3><ul>
      <li>3 fonctions de <strong>Musgrave</strong> : Allocation, Redistribution, Régulation</li>
      <li>Redistribution verticale (↓ inégalités) + horizontale (risques sociaux)</li>
      <li>Dépenses publiques ≈ 57% du PIB — PO ≈ 43% du PIB</li>
      <li>Courbe de Laffer : « Trop d'impôts tue l'impôt »</li>
    </ul></div>
    <div class="card a4"><h3>💰 Monnaie</h3><ul>
      <li>3 fonctions : numération, intermédiation, réserve de valeur</li>
      <li>3 formes : divisionnaire (pièces), fiduciaire (billets), scripturale (comptes)</li>
      <li>Cryptoactifs ≠ monnaie : pas de cours légal, volatile, faible acceptation</li>
      <li>Blockchain = registre décentralisé validé par les mineurs</li>
    </ul></div>
  </div>`;
}

// ── FORMULES section ──
function buildFormulesSec() {
  const formules = [
    { label:'Revenu disponible', f:'Revenus primaires − Impôts/cotisations + Prestations sociales', color:'var(--a5)' },
    { label:'Revenu arbitrable', f:'Revenu disponible − Dépenses pré-engagées', color:'var(--a5)' },
    { label:'Épargne brute', f:'Revenu disponible brut − Dépenses de consommation', color:'var(--a3)' },
    { label:'Taux d\'épargne', f:'(Épargne brute / RDB) × 100', color:'var(--a3)' },
    { label:'Valeur Ajoutée', f:'Production − Consommations intermédiaires', color:'var(--a2)' },
    { label:'Taux PO', f:'(Impôts + Taxes + Cotisations) / PIB × 100', color:'var(--a4)' },
    { label:'Équilibre E-R (ouvert)', f:'PIB + M = CF + CI + FBCF + X + ΔStocks', color:'var(--a1)' },
    { label:'Épargne = Investissement (fermée)', f:'S = I', color:'var(--a1)' },
    { label:'S = I (ouverte)', f:'S = I + (X − M)', color:'var(--a1)' },
    { label:'Coefficient budgétaire', f:'Dépenses produit X / Total budget consommé × 100', color:'var(--a2)' },
  ];
  document.getElementById('chs-formules').innerHTML = `
  <div class="sec-title">📐 Formules clés</div>
  <div class="sec-sub">Toutes les équations à maîtriser pour le chapitre 3.</div>
  <div style="display:flex;flex-direction:column;gap:12px;margin-top:8px">
    ${formules.map(f=>`
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:16px 20px;border-left:4px solid ${f.color};display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
      <span style="font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.8px;min-width:200px">${f.label}</span>
      <span style="font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:${f.color}">${f.f}</span>
    </div>`).join('')}
  </div>`;
}

// ── THÉORICIENS section ──
function buildTheoriesSec() {
  const th = [
    { nom:'Keynes', period:'1883–1946', tag:'Keynésien', color:'var(--a1)', text:'La consommation dépend du <strong>revenu disponible</strong>. L\'épargne est le résidu. L\'égalité S=I s\'établit ex post via le multiplicateur. Action sur les revenus pour relancer la demande.' },
    { nom:'Friedman', period:'1912–2006', tag:'Monétariste', color:'var(--a4)', text:'<strong>Théorie du revenu permanent</strong> : la consommation dépend du revenu anticipé futur, pas du revenu courant. Critique les politiques keynésiennes de relance.' },
    { nom:'Modigliani', period:'1918–2003', tag:'Néoclassique', color:'var(--a2)', text:'<strong>Théorie du cycle de vie</strong> : consommation et épargne sont choisies sur l\'ensemble de la vie. On emprunte jeune, épargne à l\'âge actif, désépargne à la retraite.' },
    { nom:'Duesenberry', period:'1918–2009', tag:'Institutionnaliste', color:'var(--a3)', text:'Consommation <strong>ostentatoire</strong> (imitation des groupes supérieurs) et <strong>effet de cliquet</strong> : les habitudes de consommation baissent lentement quand le revenu diminue.' },
    { nom:'Musgrave', period:'1910–2007', tag:'Finances publiques', color:'var(--a5)', text:'L\'État a <strong>3 fonctions</strong> : Allocation (corriger les défaillances), Redistribution (réduire les inégalités), Régulation (stabiliser la conjoncture).' },
    { nom:'Laffer', period:'Contemporain', tag:'Libéral', color:'var(--a4)', text:'<strong>Courbe de Laffer</strong> : au-delà d\'un seuil, la hausse de la pression fiscale réduit les recettes. « Trop d\'impôts tue l\'impôt ».' },
    { nom:'Engel', period:'1821–1896', tag:'Statisticien', color:'var(--muted)', text:'<strong>Loi d\'Engel</strong> : plus le revenu augmente, plus la part du budget consacrée à l\'alimentation diminue. Indicateur du niveau de vie.' },
  ];
  document.getElementById('chs-theories').innerHTML = `
  <div class="sec-title">📚 Théoriciens</div>
  <div class="sec-sub">Les grands économistes à connaître pour ce chapitre.</div>
  <div style="display:flex;flex-direction:column;gap:14px;margin-top:8px">
    ${th.map(t=>`
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:14px;padding:20px;display:flex;gap:16px;align-items:flex-start">
      <div style="width:50px;height:50px;border-radius:12px;background:color-mix(in srgb,${t.color} 20%,transparent);border:1px solid color-mix(in srgb,${t.color} 35%,transparent);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:11px;font-weight:800;color:${t.color};flex-shrink:0">${t.nom.slice(0,3).toUpperCase()}</div>
      <div>
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:6px">
          <span style="font-family:'Syne',sans-serif;font-size:15px;font-weight:800">${t.nom}</span>
          <span style="font-size:12px;color:var(--muted)">${t.period}</span>
          <span style="font-size:10px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;padding:2px 8px;border-radius:4px;background:color-mix(in srgb,${t.color} 15%,transparent);color:${t.color}">${t.tag}</span>
        </div>
        <p style="font-size:13.5px;color:var(--muted);line-height:1.65">${t.text}</p>
      </div>
    </div>`).join('')}
  </div>`;
}

// ── CIRCUIT section ──
function buildCircuitSec() {
  document.getElementById('chs-circuit').innerHTML = `
  <div class="sec-title">🔄 Le circuit économique complet</div>
  <div class="sec-sub">Tous les flux réels et monétaires entre les 4 grands agents.</div>
  <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px">
    <span style="background:rgba(91,141,238,.15);color:var(--a1);padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600">🔵 Travail & salaires</span>
    <span style="background:rgba(247,201,72,.15);color:var(--a2);padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600">🟡 B&S & consommation</span>
    <span style="background:rgba(82,212,160,.15);color:var(--a3);padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600">🟢 Épargne & crédit</span>
    <span style="background:rgba(196,126,240,.15);color:var(--a5);padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600">🟣 Ménages ↔ État</span>
    <span style="background:rgba(240,112,112,.15);color:var(--a4);padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600">🔴 Entreprises ↔ État</span>
  </div>
  <div style="background:var(--surface2);border:1px solid var(--border);border-radius:16px;padding:16px;overflow-x:auto">
  <svg viewBox="0 0 820 560" xmlns="http://www.w3.org/2000/svg" font-family="'DM Sans',sans-serif" style="width:100%;min-width:600px">
    <defs>
      <marker id="ab" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#5b8dee"/></marker>
      <marker id="ay" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#f7c948"/></marker>
      <marker id="ag" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#52d4a0"/></marker>
      <marker id="ap" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#c47ef0"/></marker>
      <marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#f07070"/></marker>
      <marker id="ao" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#f0a050"/></marker>
    </defs>
    <rect width="820" height="560" fill="#13161f" rx="12"/>
    <!-- AGENTS -->
    <rect x="30" y="230" width="155" height="85" rx="10" fill="#1a1e2e" stroke="#5b8dee" stroke-width="2"/>
    <text x="107" y="262" text-anchor="middle" fill="#5b8dee" font-size="13" font-weight="bold">MÉNAGES</text>
    <text x="107" y="280" text-anchor="middle" fill="#6b7494" font-size="10">Consomment, épargnent</text>
    <text x="107" y="295" text-anchor="middle" fill="#6b7494" font-size="10">Offrent du travail</text>
    <text x="107" y="309" text-anchor="middle" fill="#6b7494" font-size="10">Paient impôts</text>
    <rect x="635" y="230" width="155" height="85" rx="10" fill="#1a1e2e" stroke="#f7c948" stroke-width="2"/>
    <text x="712" y="262" text-anchor="middle" fill="#f7c948" font-size="13" font-weight="bold">ENTREPRISES</text>
    <text x="712" y="280" text-anchor="middle" fill="#6b7494" font-size="10">Produisent des B&amp;S</text>
    <text x="712" y="295" text-anchor="middle" fill="#6b7494" font-size="10">Investissent</text>
    <text x="712" y="309" text-anchor="middle" fill="#6b7494" font-size="10">Paient impôts sociétés</text>
    <rect x="320" y="30" width="180" height="75" rx="10" fill="#1a1e2e" stroke="#52d4a0" stroke-width="2"/>
    <text x="410" y="62" text-anchor="middle" fill="#52d4a0" font-size="13" font-weight="bold">BANQUES</text>
    <text x="410" y="79" text-anchor="middle" fill="#6b7494" font-size="10">Collectent épargne, accordent crédits</text>
    <rect x="310" y="440" width="200" height="85" rx="10" fill="#1a1e2e" stroke="#c47ef0" stroke-width="2"/>
    <text x="410" y="470" text-anchor="middle" fill="#c47ef0" font-size="13" font-weight="bold">ÉTAT (APU)</text>
    <text x="410" y="488" text-anchor="middle" fill="#6b7494" font-size="10">Redistribution / Services</text>
    <text x="410" y="503" text-anchor="middle" fill="#6b7494" font-size="10">Subventions</text>
    <!-- FLUX -->
    <line x1="185" y1="248" x2="633" y2="248" stroke="#5b8dee" stroke-width="1.8" stroke-dasharray="7,4" marker-end="url(#ab)"/>
    <text x="409" y="240" text-anchor="middle" fill="#5b8dee" font-size="11" font-weight="600">Travail (flux réel)</text>
    <line x1="635" y1="270" x2="187" y2="270" stroke="#f7c948" stroke-width="1.8" stroke-dasharray="7,4" marker-end="url(#ay)"/>
    <text x="409" y="286" text-anchor="middle" fill="#f7c948" font-size="11">Salaires + dividendes</text>
    <path d="M 712 230 Q 712 170 410 155 Q 108 140 107 230" fill="none" stroke="#f7c948" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#ay)"/>
    <text x="320" y="147" text-anchor="middle" fill="#f7c948" font-size="10">B&amp;S fournis</text>
    <path d="M 107 315 Q 107 380 410 395 Q 712 380 712 315" fill="none" stroke="#f7c948" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#ay)"/>
    <text x="560" y="400" text-anchor="middle" fill="#f7c948" font-size="10">Dépenses consommation</text>
    <path d="M 107 230 Q 107 110 318 85" fill="none" stroke="#52d4a0" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#ag)"/>
    <text x="172" y="145" text-anchor="middle" fill="#52d4a0" font-size="10">Épargne</text>
    <path d="M 320 95 Q 200 110 155 230" fill="none" stroke="#52d4a0" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#ag)"/>
    <text x="208" y="183" text-anchor="middle" fill="#52d4a0" font-size="10">Crédit conso.</text>
    <path d="M 500 85 Q 620 100 680 230" fill="none" stroke="#52d4a0" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#ag)"/>
    <text x="627" y="140" text-anchor="middle" fill="#52d4a0" font-size="10">Crédit invest.</text>
    <path d="M 700 230 Q 660 100 502 75" fill="none" stroke="#52d4a0" stroke-width="1.3" stroke-dasharray="4,3" marker-end="url(#ag)"/>
    <text x="680" y="108" text-anchor="middle" fill="#52d4a0" font-size="10">Rembours.</text>
    <path d="M 70 315 Q 60 430 308 462" fill="none" stroke="#c47ef0" stroke-width="1.8" marker-end="url(#ap)"/>
    <text x="82" y="410" text-anchor="middle" fill="#c47ef0" font-size="10">IR + cotis.</text>
    <text x="82" y="422" text-anchor="middle" fill="#c47ef0" font-size="10">salariales</text>
    <path d="M 310 478 Q 160 470 107 317" fill="none" stroke="#c47ef0" stroke-width="1.8" marker-end="url(#ap)"/>
    <text x="172" y="455" text-anchor="middle" fill="#c47ef0" font-size="10">Prestations</text>
    <text x="172" y="467" text-anchor="middle" fill="#c47ef0" font-size="10">(alloc, retraites…)</text>
    <path d="M 750 315 Q 760 430 512 468" fill="none" stroke="#f07070" stroke-width="1.8" marker-end="url(#ar)"/>
    <text x="748" y="400" text-anchor="middle" fill="#f07070" font-size="10">IS + cotis.</text>
    <text x="748" y="412" text-anchor="middle" fill="#f07070" font-size="10">patronales + TVA</text>
    <path d="M 510 462 Q 660 475 712 317" fill="none" stroke="#f0a050" stroke-width="1.8" marker-end="url(#ao)"/>
    <text x="672" y="460" text-anchor="middle" fill="#f0a050" font-size="10">Subventions &amp;</text>
    <text x="672" y="472" text-anchor="middle" fill="#f0a050" font-size="10">commandes pub.</text>
    <rect x="10" y="538" width="800" height="16" rx="4" fill="#1a1e2e"/>
    <text x="18" y="550" fill="#5b8dee" font-size="9">■</text><text x="26" y="550" fill="#6b7494" font-size="9">Travail/salaires</text>
    <text x="105" y="550" fill="#f7c948" font-size="9">■</text><text x="113" y="550" fill="#6b7494" font-size="9">B&amp;S/conso</text>
    <text x="187" y="550" fill="#52d4a0" font-size="9">■</text><text x="195" y="550" fill="#6b7494" font-size="9">Épargne/crédit</text>
    <text x="280" y="550" fill="#c47ef0" font-size="9">■</text><text x="288" y="550" fill="#6b7494" font-size="9">Ménages↔État</text>
    <text x="372" y="550" fill="#f07070" font-size="9">■</text><text x="380" y="550" fill="#6b7494" font-size="9">Entreprises→État</text>
    <text x="470" y="550" fill="#f0a050" font-size="9">■</text><text x="478" y="550" fill="#6b7494" font-size="9">Subventions</text>
  </svg>
  </div>
  <div class="cards-grid" style="margin-top:20px">
    <div class="card a1"><h3>Flux réels vs Monétaires</h3><ul>
      <li><strong>Flux réels</strong> : mouvements de B&S, travail</li>
      <li><strong>Flux monétaires</strong> : salaires, paiements, impôts</li>
      <li>Certains sont <strong>unilatéraux</strong> (sans contrepartie)</li>
    </ul></div>
    <div class="card a2"><h3>3 types de marchés</h3><ul>
      <li><strong>B&S</strong> : offre (entrep.) ↔ demande (ménages, État)</li>
      <li><strong>Travail</strong> : offre (ménages) ↔ demande (entrep.)</li>
      <li><strong>Capitaux</strong> : offre (épargnants) ↔ demande (entrep.)</li>
    </ul></div>
  </div>
  ${downloadBar('CH3 — Relations d\'interdépendance')}`;
}

// ── DÉFINITIONS section ──
function buildDefsSec() {
  const defs = getCH3Defs();
  const sec = document.getElementById('chs-defs');
  sec.innerHTML = `
  <div class="sec-title">📖 Définitions du cours</div>
  <div class="sec-sub">Cliquez sur un terme pour afficher sa définition. Recherchez ou filtrez par thème.</div>
  <div class="def-search-wrap">
    <span class="def-search-icon">🔍</span>
    <input class="def-search" type="text" placeholder="Rechercher une notion…" oninput="filterDefsInPage(this.value,'ch3')"/>
  </div>
  <div class="filter-row" id="def-filters-ch3">
    <button class="fpill active" onclick="filterDefCat('all',this,'ch3')">Toutes</button>
    <button class="fpill" onclick="filterDefCat('agents',this,'ch3')">🏛 Agents</button>
    <button class="fpill" onclick="filterDefCat('menages',this,'ch3')">👨‍👩‍👧 Ménages</button>
    <button class="fpill" onclick="filterDefCat('entreprises',this,'ch3')">🏭 Entreprises</button>
    <button class="fpill" onclick="filterDefCat('etat',this,'ch3')">⚖️ État</button>
    <button class="fpill" onclick="filterDefCat('monnaie',this,'ch3')">💰 Monnaie</button>
    <button class="fpill" onclick="filterDefCat('macro',this,'ch3')">📊 Macro</button>
  </div>
  <div class="def-count" id="def-count-ch3"></div>
  <div class="def-list" id="def-list-ch3"></div>
  ${downloadBar('CH3 — Définitions')}`;
  renderDefList('ch3', defs, 'all', '');
}

let defState = {}; // { chapterId: { cat, search } }

function renderDefList(chId, defs, cat, search) {
  defState[chId] = { cat, search };
  const list = document.getElementById('def-list-' + chId);
  const countEl = document.getElementById('def-count-' + chId);
  let visible = 0;
  list.innerHTML = defs.map((d, i) => {
    const matchCat = cat === 'all' || d.cat === cat;
    const matchSearch = !search || d.term.toLowerCase().includes(search.toLowerCase()) || d.def.toLowerCase().includes(search.toLowerCase());
    const show = matchCat && matchSearch;
    if (show) visible++;
    return `<div class="def-item${show ? '' : ' hidden'}" id="def-${chId}-${i}">
      <div class="def-header" onclick="toggleDef('def-${chId}-${i}')">
        <span class="def-tag" style="background:${d.color}22;color:${d.color}">${d.tag}</span>
        <span class="def-term">${d.term}</span>
        <span class="def-chevron">▼</span>
      </div>
      <div class="def-body">
        <p>${d.def}</p>
        ${d.formula ? `<div class="def-formula">📐 ${d.formula}</div>` : ''}
        ${d.exemple ? `<div class="def-exemple">💡 ${d.exemple}</div>` : ''}
      </div>
    </div>`;
  }).join('');
  countEl.textContent = `${visible} notion${visible > 1 ? 's' : ''} affichée${visible > 1 ? 's' : ''}`;
}

function toggleDef(id) { document.getElementById(id)?.classList.toggle('open'); }

function filterDefsInPage(val, chId) {
  const state = defState[chId] || { cat: 'all', search: '' };
  const defs = chId === 'ch3' ? getCH3Defs() : [];
  renderDefList(chId, defs, state.cat, val);
}

function filterDefCat(cat, btn, chId) {
  document.querySelectorAll(`#def-filters-${chId} .fpill`).forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const state = defState[chId] || { cat: 'all', search: '' };
  const defs = chId === 'ch3' ? getCH3Defs() : [];
  renderDefList(chId, defs, cat, state.search || '');
}
