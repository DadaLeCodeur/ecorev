// ════════════════════════════════════════════════════════
// QUIZ SYSTEM (CH3)
// ════════════════════════════════════════════════════════

// ── QUIZ section ──
let quizScores = {};
let activeQuizCat = 'all';

function buildQuizSec() {
  document.getElementById('chs-quiz').innerHTML = `
  <div class="sec-title">🎯 Quiz flash — 100 questions</div>
  <div class="sec-sub">Teste tes connaissances. Filtre par thème ou réponds à tout.</div>
  <div class="score-bar">
    <span>Score :</span>
    <span class="score-val" id="qscore-val">0</span>
    <span style="color:var(--muted);font-size:13px">/ <span id="qscore-total">0</span> répondue(s)</span>
    <span id="qscore-pct" style="margin-left:auto;color:var(--muted);font-size:13px"></span>
    <button onclick="resetQuiz()" style="margin-left:12px;background:rgba(240,112,112,.15);border:1px solid rgba(240,112,112,.3);color:var(--a4);border-radius:8px;padding:5px 12px;font-size:11px;font-weight:700;cursor:pointer">↺ Reset</button>
  </div>
  <div class="filter-row" id="quiz-filters-ch3" style="margin-bottom:18px">
    <button class="fpill active" onclick="filterQuiz('all',this)">Toutes (100)</button>
    <button class="fpill" onclick="filterQuiz('agents',this)">🏛 Agents</button>
    <button class="fpill" onclick="filterQuiz('menages',this)">👨‍👩‍👧 Ménages</button>
    <button class="fpill" onclick="filterQuiz('entreprises',this)">🏭 Entreprises</button>
    <button class="fpill" onclick="filterQuiz('etat',this)">⚖️ État</button>
    <button class="fpill" onclick="filterQuiz('monnaie',this)">💰 Monnaie</button>
    <button class="fpill" onclick="filterQuiz('macro',this)">📊 Macro</button>
  </div>
  <div class="quiz-wrap" id="quiz-container-ch3"></div>
  ${downloadBar('CH3 — Quiz')}`;
  buildQuizCards();
}

function buildQuizCards() {
  const container = document.getElementById('quiz-container-ch3');
  const qs = activeQuizCat === 'all' ? CH3_QUESTIONS : CH3_QUESTIONS.filter(q => q.cat === activeQuizCat);
  container.innerHTML = '';
  qs.forEach((q, i) => {
    const div = document.createElement('div');
    div.className = 'quiz-card';
    div.innerHTML = `
      <div class="q-num">Question ${i+1}</div>
      <div class="q-text">${q.q}</div>
      <div class="quiz-options" id="qopts-${i}">
        ${q.opts.map((o,j)=>`<button class="q-opt" onclick="answerQuiz(${i},${j})" id="qopt-${i}-${j}">${o}</button>`).join('')}
      </div>
      <div class="q-feedback" id="qfb-${i}">💡 <strong>Explication :</strong> ${q.explain}</div>`;
    container.appendChild(div);
  });
  // restore saved scores
  const saved = quizScores[activeQuizCat] || {};
  Object.entries(saved).forEach(([qi, result]) => {
    const idx = parseInt(qi);
    if (!qs[idx]) return;
    const correct = qs[idx].ans;
    document.querySelectorAll(`#qopts-${idx} .q-opt`).forEach((b,j) => {
      b.classList.add('disabled');
      if (j === correct) b.classList.add('correct');
    });
    document.getElementById(`qfb-${idx}`)?.classList.add('show');
  });
  updateQuizScore();
}

function answerQuiz(qi, oi) {
  const qs = activeQuizCat === 'all' ? CH3_QUESTIONS : CH3_QUESTIONS.filter(q => q.cat === activeQuizCat);
  if ((quizScores[activeQuizCat] || {})[qi] !== undefined) return;
  const correct = qs[qi].ans;
  const result = (oi === correct) ? 1 : 0;
  if (!quizScores[activeQuizCat]) quizScores[activeQuizCat] = {};
  quizScores[activeQuizCat][qi] = result;
  // Always store by actual category so classement can read it
  const cat = qs[qi].cat;
  if (activeQuizCat === 'all' && cat) {
    if (!quizScores[cat]) quizScores[cat] = {};
    const catQs = CH3_QUESTIONS.filter(q => q.cat === cat);
    const catIdx = catQs.indexOf(qs[qi]);
    if (catIdx >= 0) quizScores[cat][catIdx] = result;
  }
  document.querySelectorAll(`#qopts-${qi} .q-opt`).forEach((b,j) => {
    b.classList.add('disabled');
    if (j === correct) b.classList.add('correct');
    else if (j === oi && oi !== correct) b.classList.add('wrong');
  });
  document.getElementById(`qfb-${qi}`)?.classList.add('show');
  updateQuizScore();
  persistUserScores();
}

function updateQuizScore() {
  const saved = quizScores[activeQuizCat] || {};
  const answered = Object.keys(saved).length;
  const total = Object.values(saved).reduce((a,b)=>a+b,0);
  document.getElementById('qscore-val').textContent = total;
  document.getElementById('qscore-total').textContent = answered;
  if (answered > 0) {
    const pct = Math.round(total/answered*100);
    document.getElementById('qscore-pct').textContent = `${pct}% de bonnes réponses`;
    document.getElementById('qscore-val').style.color = pct>=70?'var(--a3)':pct>=40?'var(--a2)':'var(--a4)';
  }
}

function filterQuiz(cat, btn) {
  activeQuizCat = cat;
  document.querySelectorAll('#quiz-filters-ch3 .fpill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  buildQuizCards();
}

function resetQuiz() {
  if (activeQuizCat === 'all') {
    // Clear all categories too
    Object.keys(quizScores).forEach(k => { quizScores[k] = {}; });
  } else {
    quizScores[activeQuizCat] = {};
    // Also clear matching entries from 'all' bucket
    if (quizScores['all']) {
      const catQs = CH3_QUESTIONS.filter(q => q.cat === activeQuizCat);
      catQs.forEach(q => {
        const globalIdx = CH3_QUESTIONS.indexOf(q);
        if (globalIdx >= 0) delete quizScores['all'][globalIdx];
      });
    }
  }
  buildQuizCards();
  persistUserScores();
}

// ════════════════════════════════════════════════════════
// CH3 QUIZ QUESTIONS (100)
// ════════════════════════════════════════════════════════
const CH3_QUESTIONS = [
  { cat:"agents", q:"Quelle est la ressource principale des SNF ?", opts:["Les impôts","Le profit","Les cotisations volontaires","Les intérêts"], ans:1, explain:"Les SNF tirent leurs ressources du profit généré par la production de B&S non financiers." },
  { cat:"agents", q:"Quelle est la ressource principale des APU ?", opts:["Le profit","Les cotisations volontaires","Les impôts et taxes","Les intérêts bancaires"], ans:2, explain:"Les APU se financent via les prélèvements obligatoires : impôts, taxes et cotisations sociales." },
  { cat:"agents", q:"Quelle est la ressource principale des ISBLSM ?", opts:["Le profit","Les impôts","Les cotisations volontaires et subventions","Les intérêts"], ans:2, explain:"Les ISBLSM se financent par des cotisations volontaires et des subventions des APU." },
  { cat:"agents", q:"Combien de secteurs institutionnels l'INSEE distingue-t-il ?", opts:["4","5","6","7"], ans:2, explain:"6 secteurs : SF, SNF, APU, ISBLSM, Ménages et Reste du Monde." },
  { cat:"agents", q:"Qu'est-ce que la Valeur Ajoutée (VA) ?", opts:["Le chiffre d'affaires","Production moins consommations intermédiaires","Le bénéfice net","Le salaire total versé"], ans:1, explain:"VA = Production − Consommations intermédiaires. C'est la richesse créée par l'entreprise." },
  { cat:"agents", q:"Quel document retrace les flux entre résidents et non-résidents ?", opts:["Le tableau de bord","La balance des paiements","Le TOF","Le bilan national"], ans:1, explain:"La balance des paiements, élaborée par la Banque de France." },
  { cat:"agents", q:"Les APUC comprennent :", opts:["Les communes","L'État et les ODAC","La Sécurité sociale","Les associations"], ans:1, explain:"APUC = État + Organismes Divers d'Administration Centrale (universités, etc.)." },
  { cat:"agents", q:"Les ASSO comprennent :", opts:["Les collectivités territoriales","Les entreprises publiques","Les administrations distribuant des prestations sociales","Les banques publiques"], ans:2, explain:"Les ASSO distribuent des prestations sociales à partir de cotisations obligatoires." },
  { cat:"agents", q:"Qu'est-ce qu'un agent économique ?", opts:["Uniquement une entreprise","Un acteur du système économique qui participe à l'activité et en tire un revenu","Un salarié de l'État","Un intermédiaire financier"], ans:1, explain:"Un agent éco est toute personne physique ou morale participant à l'activité économique." },
  { cat:"agents", q:"Comment est répartie la VA des SNF ?", opts:["Uniquement entre salariés et actionnaires","Entre salariés, actionnaires, État et sécurité sociale","Elle est intégralement réinvestie","Elle va entièrement à l'État"], ans:1, explain:"La VA est partagée entre salariés (salaires), actionnaires (dividendes), État (impôts) et sécu (cotisations)." },
  { cat:"agents", q:"Les SNF publiques sont contrôlées par :", opts:["Des actionnaires privés","Une APU","Des résidents étrangers","Les ménages"], ans:1, explain:"Les SNF publiques sont des entreprises contrôlées par une Administration Publique." },
  { cat:"agents", q:"Quel secteur peut être qualifié d'entreprise individuelle ?", opts:["Les SF","Les APU","Les Ménages","Les ISBLSM"], ans:2, explain:"Les ménages peuvent produire des B&S : exploitants agricoles, professions libérales, artisans." },
  { cat:"agents", q:"Quelle institution élabore la balance des paiements en France ?", opts:["L'INSEE","Le ministère des Finances","La Banque de France","La BCE"], ans:2, explain:"La balance des paiements est élaborée par la Banque de France." },
  { cat:"agents", q:"Le Reste du Monde est-il un secteur institutionnel comme les autres ?", opts:["Oui, il fonctionne exactement comme les autres","Non, il sert à décrire les relations avec l'extérieur","Oui, il a des ressources propres","Non, il n'est pas pris en compte"], ans:1, explain:"Le RDM n'est pas un secteur institutionnel à proprement parler : il décrit les relations résidents/non-résidents." },
  { cat:"agents", q:"La SF inclut :", opts:["Uniquement les banques commerciales","Banques, assurances, auxiliaires financiers","Les APU qui gèrent la dette","Les ménages qui épargnent"], ans:1, explain:"Les SF comprennent : banques, assurances, mutuelles, auxiliaires financiers (holdings, gérants de portefeuille)." },
  { cat:"menages", q:"Quelle formule définit le Revenu Disponible ?", opts:["Revenus primaires − dépenses pré-engagées","Revenus primaires − PO + Prestations","PIB − CI","Épargne + Consommation"], ans:1, explain:"Revenu dispo = Revenus primaires − Impôts/cotisations + Prestations sociales." },
  { cat:"menages", q:"Qu'est-ce que le revenu arbitrable ?", opts:["Le revenu avant impôts","Le revenu disponible moins les dépenses pré-engagées","Le revenu du patrimoine","Le revenu + épargne"], ans:1, explain:"Revenu arbitrable = Revenu disponible − Dépenses pré-engagées." },
  { cat:"menages", q:"Quelle formule définit l'épargne brute ?", opts:["RDB + Dépenses conso","RDB − Dépenses consommation","Revenus primaires − Impôts","Investissement − Consommation"], ans:1, explain:"Épargne brute = Revenu disponible brut − Dépenses de consommation." },
  { cat:"menages", q:"Qu'est-ce que la Loi d'Engel ?", opts:["Plus le revenu augmente, plus on épargne","Plus le revenu augmente, plus la part alimentaire diminue","La conso dépend du revenu permanent","Trop d'impôts tue l'impôt"], ans:1, explain:"Engel (1821-1896) : la part alimentaire dans le budget diminue quand le revenu augmente." },
  { cat:"menages", q:"Selon KEYNES, quel est le principal déterminant de la consommation ?", opts:["Le taux d'intérêt","Le revenu permanent","Le revenu disponible actuel","Le taux de chômage"], ans:2, explain:"Pour Keynes, la consommation est une fonction du revenu disponible (PMC). L'épargne est le résidu." },
  { cat:"menages", q:"Selon FRIEDMAN, la consommation dépend de :", opts:["Du revenu courant","Du revenu futur anticipé (revenu permanent)","Du taux d'épargne","Du taux d'intérêt"], ans:1, explain:"Friedman : la consommation dépend du revenu permanent (stable), pas du revenu transitoire." },
  { cat:"menages", q:"La théorie de MODIGLIANI porte sur :", opts:["Le taux d'intérêt optimal","Le cycle de vie — consommation sur l'ensemble de la vie","La seule consommation ostentatoire","Le revenu permanent"], ans:1, explain:"Modigliani : on emprunte jeune, épargne à l'âge actif, désépargne à la retraite." },
  { cat:"menages", q:"L'effet de cliquet de DUESENBERRY signifie :", opts:["L'épargne augmente avec les taux","Les habitudes de consommation baissent lentement quand le revenu baisse","La conso ostentatoire est irrationnelle","On consomme proportionnellement au revenu"], ans:1, explain:"Effet de cliquet : les habitudes résistent à la baisse. On maintient son niveau de vie quand le revenu baisse." },
  { cat:"menages", q:"Qu'est-ce qu'une dépense contrainte ?", opts:["Une dépense choisie librement","Un contrat difficilement résiliable à court terme","Une dépense d'investissement","Une dépense de luxe"], ans:1, explain:"Dépenses pré-engagées : loyer, assurances, abonnements, remboursements — difficiles à éviter." },
  { cat:"menages", q:"Quelle part représentent les dépenses pré-engagées aujourd'hui ?", opts:["Environ 12%","Environ 20%","Plus de 30%","Environ 50%"], ans:2, explain:"Plus de 30% du revenu disponible — contre 12% dans les années 1960." },
  { cat:"menages", q:"Quel est le taux d'épargne moyen français ?", opts:["5-7%","15-17%","25-30%","2-3%"], ans:1, explain:"En France ≈ 15-17% du revenu disponible brut en moyenne." },
  { cat:"menages", q:"Quel n'est PAS un motif classique de l'épargne ?", opts:["Précaution","Prévoyance","Productivité","Spéculation"], ans:2, explain:"4 motifs : prévoyance, précaution, spéculation/placement, patrimoine. La productivité n'en est pas un." },
  { cat:"menages", q:"Pour les néoclassiques, qu'est-ce qui détermine l'arbitrage épargne/conso ?", opts:["Le revenu disponible","Le taux d'intérêt réel","Le taux d'inflation","Le chômage"], ans:1, explain:"Pour les néoclassiques, le taux d'intérêt est le prix de la renonciation à consommer." },
  { cat:"menages", q:"Qu'est-ce que le coefficient budgétaire du logement ?", opts:["Le prix du loyer","La part du budget consacrée au logement","Les aides au logement","Le taux d'endettement"], ans:1, explain:"CB logement = Dépenses logement / Total budget consommé. Passé de 9,8% (1960) à 27,8% (2024)." },
  { cat:"menages", q:"La conso effective des ménages inclut :", opts:["Uniquement les achats en magasin","Dépenses de conso + services non marchands des APU/ISBLSM","Le RDB moins l'épargne","La conso finale des entreprises"], ans:1, explain:"Conso effective = dépenses directes + éducation et santé gratuites fournies par les APU et ISBLSM." },
  { cat:"menages", q:"Qu'est-ce que la propension marginale à consommer ?", opts:["La part totale du revenu consommée","Le supplément de conso quand le revenu ↑ d'1€","La part épargnée","Le taux d'épargne moyen"], ans:1, explain:"PMC = supplément consommé / augmentation du revenu. Pour Keynes, 0 < PMC < 1." },
  { cat:"menages", q:"L'épargne non financière correspond à :", opts:["Un livret A ou des actions","Des biens immobiliers, objets d'art","Des obligations d'État","Un PER"], ans:1, explain:"L'épargne non financière est placée dans des actifs réels : immobilier, objets d'art, collections…" },
  { cat:"menages", q:"Quel poste de consommation a le plus augmenté depuis 1960 ?", opts:["Alimentation","Habillement","Logement","Loisirs"], ans:2, explain:"Le logement est passé de 9,8% à 32,1% du budget entre 1960 et 2024." },
  { cat:"menages", q:"Le motif de précaution de l'épargne correspond à :", opts:["Épargner pour des dépenses planifiées","Se prémunir contre les risques imprévus","Faire fructifier son capital","Transmettre un patrimoine"], ans:1, explain:"Motif de précaution : on épargne pour faire face aux imprévus (maladie, chômage, panne…)." },
  { cat:"menages", q:"Les revenus primaires des ménages comprennent :", opts:["Uniquement les salaires","Revenus d'activité + revenus de la propriété","Salaires + prestations sociales","Revenus d'activité + allocations chômage"], ans:1, explain:"Revenus primaires = revenus d'activité (salaires, bénéfices) + revenus de la propriété (loyers, dividendes, intérêts)." },
  { cat:"menages", q:"Le premier poste de consommation des ménages français en 2024 est :", opts:["L'alimentation","Les transports","Le logement","Les loisirs"], ans:2, explain:"Le logement représente 32,1% du budget des ménages en 2024." },
  { cat:"menages", q:"Qu'est-ce que la consommation ostentatoire selon DUESENBERRY ?", opts:["Acheter pour des besoins réels","Acheter pour imiter les groupes sociaux supérieurs","Acheter par précaution","Acheter des biens de première nécessité"], ans:1, explain:"Consommation ostentatoire : on consomme pour afficher son statut social et imiter les classes supérieures." },
  { cat:"menages", q:"KUZNETS (1946) a montré que sur le long terme :", opts:["La PMC est décroissante","La propension moyenne à consommer est constante","L'épargne augmente indéfiniment","La conso dépend des taux"], ans:1, explain:"Kuznets : sur le long terme (1869-1938), la propension moyenne à consommer est stable, contrairement à Keynes." },
  { cat:"menages", q:"L'élasticité-revenu mesure :", opts:["Le rapport revenu/épargne","La sensibilité de la conso d'un bien à une variation du revenu","Le taux de croissance du PIB","La part du revenu pour un bien"], ans:1, explain:"Élasticité-revenu = (Δ% consommation) / (Δ% revenu). Positive pour biens normaux, >1 pour biens de luxe." },
  { cat:"menages", q:"Le motif de prévoyance de l'épargne consiste à :", opts:["Faire face aux imprévus","Épargner pour des dépenses futures planifiées","Spéculer sur les marchés","Transmettre un patrimoine"], ans:1, explain:"Motif de prévoyance : épargner pour des dépenses futures connues à l'avance (retraite, études des enfants)." },
  { cat:"entreprises", q:"Comment mesure-t-on l'investissement en comptabilité nationale ?", opts:["Par le PIB","Par la FBCF","Par le taux de profit","Par les exportations nettes"], ans:1, explain:"La FBCF mesure la valeur des acquisitions d'actifs fixes utilisés en production pendant au moins 1 an." },
  { cat:"entreprises", q:"Quel élément N'est PAS un déterminant de l'investissement ?", opts:["Le profit accumulé","Le niveau de la demande","Le niveau de la population","Le prix relatif des facteurs"], ans:2, explain:"4 déterminants : profit accumulé, profit espéré, niveau de la demande, prix relatif des facteurs." },
  { cat:"entreprises", q:"Qu'est-ce qu'une économie d'échelle ?", opts:["Une économie sans dettes","La baisse du coût unitaire quand la production augmente","La hausse de productivité via la R&D","L'avantage du pionnier"], ans:1, explain:"Économie d'échelle : coût unitaire diminue quand la quantité produite augmente. Avantage du leader de volume." },
  { cat:"entreprises", q:"La courbe d'expérience signifie que :", opts:["Le coût baisse avec la taille de l'entreprise","Le coût baisse avec le cumul des quantités produites","C'est l'avantage du leader de prix","Les stocks réduisent les coûts"], ans:0, explain:"Courbe d'expérience : le coût de revient diminue avec le cumul historique de production. Avantage du pionnier." },
  { cat:"entreprises", q:"L'accélérateur d'AFTALION lie :", opts:["Taux d'intérêt et investissement","Niveau de la demande et investissement","Profit et consommation","Exportations et PIB"], ans:1, explain:"L'accélérateur d'Aftalion (1908) : une variation de la demande entraîne une variation plus que proportionnelle de l'investissement." },
  { cat:"entreprises", q:"La citation 'Les profits d'aujourd'hui font les investissements de demain' est de :", opts:["Keynes","Friedman","Helmut Schmidt","Musgrave"], ans:2, explain:"Cette citation du chancelier Helmut Schmidt illustre le rôle du profit accumulé dans le financement de l'investissement." },
  { cat:"entreprises", q:"L'investissement de productivité vise à :", opts:["Augmenter la capacité","Remplacer le capital usé","Réduire les coûts et améliorer l'efficacité","Augmenter les stocks"], ans:2, explain:"Investissement de productivité : automatisation, robotisation pour réduire les coûts de production." },
  { cat:"entreprises", q:"L'investissement immatériel comprend :", opts:["Machines et équipements","R&D, formation, logiciels, publicité","Bâtiments et terrains","Véhicules"], ans:1, explain:"Investissement immatériel = R&D, formation, logiciels, marques, publicité. De plus en plus important." },
  { cat:"entreprises", q:"Si le taux d'intérêt > taux de rentabilité attendu, l'entreprise doit :", opts:["Investir davantage","Renoncer à l'investissement","Augmenter ses prix","Recruter"], ans:1, explain:"Si taux d'intérêt > rentabilité : le coût de l'emprunt dépasse le gain attendu → on renonce à l'investissement." },
  { cat:"entreprises", q:"BÖHM-BAWERK définit l'investissement comme :", opts:["Un simple achat de machines","Un détour de production pour mieux produire dans le futur","Un transfert vers les actionnaires","Une consommation différée"], ans:1, explain:"Böhm-Bawerk : l'investissement est un 'détour de production' — on sacrifie du présent pour mieux produire plus tard." },
  { cat:"entreprises", q:"La productivité des facteurs, c'est :", opts:["Le nombre d'employés par unité","Le rapport production / facteurs utilisés","Le CA divisé par les coûts","Le taux de croissance du capital"], ans:1, explain:"Productivité = Quantité produite / Facteurs utilisés. Détermine le coût de revient et la compétitivité." },
  { cat:"entreprises", q:"L'investissement de capacité a pour but de :", opts:["Remplacer le capital usé","Réduire les coûts","Augmenter la capacité de production","Améliorer les conditions de travail"], ans:2, explain:"Investissement de capacité : augmenter la capacité pour répondre à une demande croissante." },
  { cat:"entreprises", q:"L'investissement de remplacement a pour but de :", opts:["Augmenter la capacité","Réduire les coûts","Compenser la dépréciation du capital existant","Améliorer la productivité"], ans:2, explain:"Investissement de remplacement (ou de renouvellement) : remplace le capital usé ou obsolète." },
  { cat:"entreprises", q:"Le plan France Relance (2020) a mobilisé :", opts:["10 milliards","50 milliards","100 milliards","200 milliards"], ans:2, explain:"Le plan France Relance 2020 = 100 milliards d'euros pour compétitivité, baisses d'impôts de production et innovation." },
  { cat:"entreprises", q:"La production des SNF vise avant tout à :", opts:["Satisfaire un besoin social","Répondre à une demande solvable","Réduire les inégalités","Financer l'État"], ans:1, explain:"Les SNF combinent facteurs de production pour produire des B&S répondant à une demande solvable." },
  { cat:"etat", q:"Que mesure le taux de prélèvements obligatoires ?", opts:["La part des dépenses pub dans le PIB","(Impôts + Taxes + Cotisations) / PIB × 100","La part de l'épargne","Le solde budgétaire"], ans:1, explain:"Taux PO = (PO / PIB) × 100. France ≈ 43% en 2024 — 1er rang zone euro." },
  { cat:"etat", q:"La fonction de régulation de l'État selon MUSGRAVE, c'est :", opts:["Redistribuer les revenus","Corriger les défaillances du marché","Stabiliser la conjoncture économique","Financer les entreprises publiques"], ans:2, explain:"Régulation = stabilisation conjoncturelle (chômage, inflation, croissance). Différent d'allocation et redistribution." },
  { cat:"etat", q:"La redistribution verticale :", opts:["Maintient les revenus face aux risques sociaux","Réduit les inégalités sur l'échelle des revenus","Finance uniquement l'éducation","Concerne uniquement les ménages aisés"], ans:1, explain:"Redistribution verticale : transferts des riches vers les pauvres via fiscalité progressive et prestations." },
  { cat:"etat", q:"La redistribution horizontale :", opts:["Réduit les inégalités riches/pauvres","Maintient les revenus face aux risques sociaux","Finance la dette publique","Favorise les exportateurs"], ans:1, explain:"Redistribution horizontale : couvre les risques sociaux (maladie, vieillesse, chômage) sans égard au revenu." },
  { cat:"etat", q:"La courbe de LAFFER indique que :", opts:["Plus les impôts augmentent, plus les recettes augmentent","Au-delà d'un seuil, la hausse du taux réduit les recettes","L'impôt proportionnel est toujours plus efficace","Les cotisations sont injustes"], ans:1, explain:"Laffer : 'Trop d'impôts tue l'impôt' — au-delà d'un seuil, les agents réduisent leur activité." },
  { cat:"etat", q:"L'école du Job Search de STIGLER affirme que :", opts:["Les allocations chômage réduisent le chômage","Les allocations chômage allongent la recherche d'emploi","Les impôts sur les sociétés stimulent l'investissement","La redistribution est toujours efficace"], ans:1, explain:"Stigler : les allocations créent un effet désincitatif — les chômeurs cherchent plus longtemps car partiellement couverts." },
  { cat:"etat", q:"L'impôt progressif :", opts:["A un taux identique pour tous","A un taux qui croît avec la base imposable","Est un impôt sur la consommation","Est sans contrepartie directe"], ans:1, explain:"Impôt progressif : taux croît par tranches avec le revenu imposable. Ex : l'IRPP." },
  { cat:"etat", q:"La TVA est un impôt :", opts:["Progressif","Proportionnel","Forfaitaire","Direct"], ans:1, explain:"TVA = impôt proportionnel (20% en France) et indirect (inclus dans le prix des B&S)." },
  { cat:"etat", q:"Différence entre impôt et taxe :", opts:["L'impôt finance la sécu, la taxe l'État","L'impôt est sans contrepartie directe, la taxe liée à un service","L'impôt est proportionnel, la taxe progressive","Aucune différence"], ans:1, explain:"Impôt = sans contrepartie directe. Taxe = liée à un service fourni (ex : taxe ordures ménagères)." },
  { cat:"etat", q:"Les dépenses publiques représentent quelle part du PIB en France ?", opts:["Moins de 40%","Environ 45%","Environ 57%","Plus de 70%"], ans:2, explain:"Dépenses publiques ≈ 57% du PIB en France (2024). Parmi les plus élevées d'Europe." },
  { cat:"etat", q:"Quel était le ratio dépenses pub / PIB en 2020 ?", opts:["55,6%","57,1%","61,6%","45%"], ans:2, explain:"En 2020 : 61,6% du PIB à cause de la crise Covid (hausse des dépenses + chute du PIB de -7,9%)." },
  { cat:"etat", q:"L'assiette fiscale de la TVA est :", opts:["Le revenu du contribuable","La valeur des transactions (consommation)","Le patrimoine immobilier","Le bénéfice des entreprises"], ans:1, explain:"La TVA s'applique sur la valeur des transactions commerciales. C'est un impôt sur la consommation." },
  { cat:"etat", q:"Qui sont ATKINSON, STIGLITZ et PIKETTY ?", opts:["Défenseurs d'un État minimal","Partisans de la redistribution et justice sociale","Théoriciens de la monnaie","Économistes néoclassiques"], ans:1, explain:"Atkinson, Stiglitz et Piketty défendent la redistribution comme instrument de justice sociale." },
  { cat:"etat", q:"Les cotisations sociales se distinguent des impôts car :", opts:["Elles sont facultatives","Elles sont affectées au financement de la protection sociale","Elles sont payées uniquement par les entreprises","Elles sont calculées sur la fortune"], ans:1, explain:"Cotisations sociales = affectées à la protection sociale (santé, vieillesse, famille, chômage)." },
  { cat:"etat", q:"La décentralisation a entraîné :", opts:["Une baisse des dépenses des collectivités","Un transfert de responsabilités vers les APUL","Une réduction des PO","La suppression des APU centrales"], ans:1, explain:"Les lois de décentralisation ont transféré des compétences aux collectivités locales, augmentant leurs dépenses." },
  { cat:"etat", q:"L'IRPP est un impôt :", opts:["Indirect et proportionnel","Direct et progressif","Indirect et forfaitaire","Direct et proportionnel"], ans:1, explain:"L'IRPP est direct (payé directement) et progressif (taux croissant par tranches)." },
  { cat:"etat", q:"L'effet d'éviction dans le financement, c'est :", opts:["L'État refuse de financer certains secteurs","Les agents avec moins de garanties sont exclus ou paient plus cher","Les banques refusent les dépôts","L'épargne des ménages disparaît"], ans:1, explain:"Effet d'éviction : si l'offre de capitaux est insuffisante, les agents les moins solides sont pénalisés." },
  { cat:"etat", q:"Quel est le taux normal de TVA en France ?", opts:["5,5%","10%","20%","25%"], ans:2, explain:"Taux normal = 20%. Taux réduits : 10%, 5,5%, 2,1% pour certains produits." },
  { cat:"etat", q:"La redistribution horizontale est _____ développée que la redistribution verticale en France :", opts:["Moins","Autant","Plus","Infiniment plus"], ans:2, explain:"En France, la couverture des risques sociaux (horizontale) reste plus développée que la réduction des inégalités (verticale)." },
  { cat:"monnaie", q:"Quelles sont les 3 formes de monnaie ?", opts:["Fiduciaire, scripturale et virtuelle","Divisionnaire (pièces), fiduciaire (billets), scripturale (comptes)","Liquide, semi-liquide et illiquide","Publique, privée et internationale"], ans:1, explain:"3 formes : divisionnaire (pièces/Trésor), fiduciaire (billets/BCE), scripturale (comptes courants/banques commerciales)." },
  { cat:"monnaie", q:"Pourquoi les cryptoactifs ne sont-ils pas de la monnaie ?", opts:["Ils ne sont pas dématérialisés","Pas de cours légal, forte volatilité, acceptation limitée","Ils sont trop liquides","Ils sont émis par des banques centrales étrangères"], ans:1, explain:"Les cryptoactifs ne remplissent pas les 3 fonctions monétaires selon l'AMF et la Banque de France." },
  { cat:"monnaie", q:"La monnaie scripturale, c'est :", opts:["Les billets de banque","Les pièces de monnaie","La monnaie inscrite sur les comptes à vue","Les cryptomonnaies"], ans:2, explain:"Monnaie scripturale = inscrite sur les comptes courants. Circule via chèques, virements, cartes bancaires." },
  { cat:"monnaie", q:"Comment les banques créent-elles de la monnaie ?", opts:["En imprimant des billets","En accordant des crédits","En achetant des devises","En prélevant des cotisations"], ans:1, explain:"'Les crédits font les dépôts' : chaque crédit accordé crée de la monnaie scripturale nouvelle." },
  { cat:"monnaie", q:"Qui crée la monnaie matérielle (billets et pièces) ?", opts:["Les banques commerciales","La Banque Centrale","Le Trésor public uniquement","Les marchés financiers"], ans:1, explain:"Les billets sont créés par la Banque Centrale (BCE), les pièces par le Trésor public." },
  { cat:"monnaie", q:"La monnaie centrale, c'est :", opts:["Uniquement les billets","Billets + pièces + comptes des banques de second rang à la BCE","Les comptes courants des ménages","Les cryptos validées par la BCE"], ans:1, explain:"Monnaie centrale = billets + pièces + comptes des banques commerciales à la Banque Centrale." },
  { cat:"monnaie", q:"La fonction de réserve de valeur de la monnaie, c'est :", opts:["Comparer les prix","Faciliter les échanges","Transférer du pouvoir d'achat dans le temps","Créer de la richesse"], ans:2, explain:"Réserve de valeur : la monnaie garde sa valeur et peut être dépensée ultérieurement." },
  { cat:"monnaie", q:"La blockchain, c'est :", opts:["Une banque en ligne","Un protocole décentralisé sans tiers de confiance central","Un compte bancaire sécurisé","Un système de paiement de la BCE"], ans:1, explain:"Blockchain = registre décentralisé. Chaque transaction crée un bloc vérifié par les mineurs." },
  { cat:"monnaie", q:"La désintermédiation financière, c'est :", opts:["Le financement direct sur les marchés sans les banques","La suppression des banques centrales","L'augmentation du rôle des banques","La dématérialisation des billets"], ans:0, explain:"Désintermédiation : les entreprises se financent directement sur les marchés de capitaux." },
  { cat:"monnaie", q:"Les banques assuraient quelle part du financement en 1980 ?", opts:["40%","60%","80%","95%"], ans:2, explain:"80% en 1980 → moins de 40% aujourd'hui suite à la désintermédiation." },
  { cat:"monnaie", q:"Un agent à capacité de financement est :", opts:["Un agent dont les dépenses > revenus","Un agent dont l'épargne > besoins d'investissement","Une banque qui accorde des crédits","L'État qui lève des impôts"], ans:1, explain:"Agent à capacité de financement = épargne excédentaire. En France, les ménages sont typiquement dans ce cas." },
  { cat:"monnaie", q:"Économie d'endettement (Hicks) = :", opts:["Une économie sans banques","Le financement passe principalement par le crédit bancaire","Une économie à fort endettement public","Une économie en récession"], ans:1, explain:"Économie d'endettement : le financement passe par les banques via le crédit. Mode dominant pendant les Trente Glorieuses." },
  { cat:"monnaie", q:"La création monétaire excessive risque principalement de provoquer :", opts:["Une récession","De l'inflation","Une déflation","Une baisse du chômage"], ans:1, explain:"Masse monétaire qui croît plus vite que la production → inflation. C'est pourquoi la BCE régule la création monétaire." },
  { cat:"monnaie", q:"Les mineurs dans le système blockchain sont :", opts:["Des ouvriers qui travaillent pour les banques","Des ordinateurs qui valident les transactions","Des investisseurs en cryptoactifs","Des employés de la BCE"], ans:1, explain:"Les mineurs mettent leur puissance de calcul pour valider les blocs et sont rémunérés en cryptoactifs." },
  { cat:"monnaie", q:"Qu'est-ce que l'effet de fuite devant la monnaie ?", opts:["Les ménages fuient vers l'épargne en cas d'inflation","On préfère dépenser maintenant si on anticipe de l'inflation","Les banques réduisent les crédits","La BCE réduit la masse monétaire"], ans:1, explain:"Effet de fuite : si on anticipe de l'inflation, on préfère dépenser maintenant plutôt que garder une monnaie qui se déprécie." },
  { cat:"macro", q:"Dans l'équilibre E-R en économie ouverte, les 'ressources' = ?", opts:["CF + CI + FBCF + X","PIB uniquement","PIB + Importations","Épargne + Investissements"], ans:2, explain:"Ressources = PIB + Importations. Emplois = CF + CI + FBCF + X + Variation de stocks." },
  { cat:"macro", q:"En éco fermée, l'égalité S=I s'établit comment selon KEYNES ?", opts:["Ex ante, via les taux d'intérêt","Ex post, via l'ajustement des revenus et le multiplicateur","Automatiquement","Par décision de l'État"], ans:1, explain:"Keynes : ex post. Si I > S, le multiplicateur ↑ production → ↑ revenus → ↑ S jusqu'à l'égalité." },
  { cat:"macro", q:"En économie ouverte, l'égalité S=I devient :", opts:["S = I","S = I + (X − M)","S = PIB − C","S = I + G"], ans:1, explain:"Économie ouverte : S = I + (X − M). Solde commercial = transfert d'épargne entre pays." },
  { cat:"macro", q:"Pour les néoclassiques, S=I s'établit :", opts:["Ex post via les revenus","Ex ante via les taux d'intérêt","Par l'État","Via la politique monétaire"], ans:1, explain:"Néoclassiques : équilibre ex ante. Le taux d'intérêt assure S=I : si S>I, le taux baisse → ↑ investissement." },
  { cat:"macro", q:"Un flux unilatéral, c'est :", opts:["Un flux avec contrepartie monétaire","Un flux sans contrepartie (don, service gratuit)","Un flux entre pays","Un flux financier"], ans:1, explain:"Flux unilatéral = sans contrepartie. Ex : service gratuit d'une APU, don d'un ménage à une association." },
  { cat:"macro", q:"Le circuit économique, c'est :", opts:["Un marché financier international","Une représentation simplifiée des relations entre agents via des flux","Le système bancaire mondial","La comptabilité d'une entreprise"], ans:1, explain:"Circuit économique = représentation imagée et simplifiée des flux entre agents sur les différents marchés." },
  { cat:"macro", q:"Qui a créé le premier circuit économique connu ?", opts:["Smith (1776)","Quesnay (1758)","Ricardo (1817)","Walras (1874)"], ans:1, explain:"François Quesnay (physiocrate) a créé le Tableau économique en 1758." },
  { cat:"macro", q:"Le TES (Tableau des Entrées-Sorties) synthétise :", opts:["Les opérations financières","Les opérations sur produits (production, conso, investissement)","Les échanges avec l'extérieur","La redistribution des revenus"], ans:1, explain:"Le TES synthétise les opérations sur produits et établit l'équilibre ressources-emplois pour chaque bien." },
  { cat:"macro", q:"Le TOF (Tableau des Opérations Financières) synthétise :", opts:["Les échanges commerciaux","Les créances et dettes entre agents","La production nationale","Les dépenses publiques"], ans:1, explain:"Le TOF retrace les opérations financières : créances, dettes, et moyens de paiement entre les agents." },
  { cat:"macro", q:"Un solde positif de la balance commerciale signifie que :", opts:["On importe plus qu'on exporte","On exporte plus qu'on importe — accumulation de richesse","Le pays est endetté","La production est insuffisante"], ans:1, explain:"Solde positif (X > M) : le pays exporte plus qu'il n'importe, il s'est enrichi net vis-à-vis du monde." },
];
