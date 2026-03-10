// ════════════════════════════════════════════════════════
// CH3 DEFINITIONS DATA
// ════════════════════════════════════════════════════════

function getCH3Defs() { return [
  { term:"Agent économique", cat:"agents", tag:"Agents", color:"#5b8dee", def:"Acteur du système économique (personne physique ou morale) qui participe à l'activité économique et en retire, en contrepartie, un revenu.", exemple:"Ex : une entreprise qui vend des produits, un ménage qui perçoit un salaire." },
  { term:"Secteur institutionnel", cat:"agents", tag:"Agents", color:"#5b8dee", def:"Regroupement d'agents économiques ayant un comportement similaire, une même fonction principale et des ressources analogues. L'INSEE distingue 6 secteurs." },
  { term:"Sociétés Financières (SF)", cat:"agents", tag:"Agents", color:"#5b8dee", def:"Secteur dont la fonction principale est de financer l'économie via l'intermédiation financière ou les marchés. Ressources : intérêts et commissions.", exemple:"Ex : Banque de France, Crédit Agricole, AXA." },
  { term:"Sociétés Non Financières (SNF)", cat:"agents", tag:"Agents", color:"#5b8dee", def:"Entreprises dont la fonction principale est de produire des B&S non financiers. Ressources : profit. VA = Production − CI.", exemple:"Ex : Renault, Total, une boulangerie en SARL." },
  { term:"Administrations Publiques (APU)", cat:"agents", tag:"Agents", color:"#5b8dee", def:"Secteur dont la fonction principale est de produire des services non marchands ou redistribuer les richesses. Ressources : PO (impôts, taxes, cotisations). Comprend APUC, APUL et ASSO." },
  { term:"ISBLSM", cat:"agents", tag:"Agents", color:"#5b8dee", def:"Institutions Sans But Lucratif au Service des Ménages. Produisent des services non marchands pour les ménages. Ressources : cotisations volontaires et subventions.", exemple:"Ex : associations, syndicats, partis politiques, Croix-Rouge." },
  { term:"Reste du Monde (RDM)", cat:"agents", tag:"Agents", color:"#5b8dee", def:"Permet de décrire les relations économiques entre résidents et non-résidents. Retracé dans la balance des paiements (Banque de France)." },
  { term:"Valeur Ajoutée (VA)", cat:"entreprises", tag:"Entreprises", color:"#f7c948", def:"Richesse créée par une entreprise. Partagée entre salariés, actionnaires, État et sécurité sociale.", formula:"VA = Production − Consommations intermédiaires" },
  { term:"Revenu disponible des ménages", cat:"menages", tag:"Ménages", color:"#c47ef0", def:"Revenu dont disposent les ménages après redistribution. Base de l'arbitrage consommation/épargne.", formula:"Revenu disponible = Revenus primaires − Impôts & cotisations + Prestations sociales" },
  { term:"Revenu arbitrable", cat:"menages", tag:"Ménages", color:"#c47ef0", def:"Revenu réellement disponible pour des choix à court terme, après dépenses pré-engagées.", formula:"Revenu arbitrable = Revenu disponible − Dépenses pré-engagées", exemple:"Les dépenses pré-engagées représentent >30% du revenu aujourd'hui." },
  { term:"Dépenses pré-engagées", cat:"menages", tag:"Ménages", color:"#c47ef0", def:"Dépenses résultant de contrats difficilement résiliables à court terme.", exemple:"Loyer, assurances, abonnements, remboursements d'emprunts, électricité, eau." },
  { term:"Épargne brute", cat:"menages", tag:"Ménages", color:"#c47ef0", def:"Part du revenu disponible brut non consacrée à la consommation finale.", formula:"Épargne brute = Revenu disponible brut − Dépenses de consommation" },
  { term:"Taux d'épargne", cat:"menages", tag:"Ménages", color:"#c47ef0", def:"Part du revenu disponible brut épargnée.", formula:"Taux d'épargne = (Épargne brute / RDB) × 100", exemple:"En France ≈ 15-17% en moyenne." },
  { term:"Motifs de l'épargne", cat:"menages", tag:"Ménages", color:"#c47ef0", def:`4 motifs principaux :<br><strong>1. Prévoyance</strong> : dépenses futures planifiées (retraite, études).<br><strong>2. Précaution</strong> : face aux risques imprévus (maladie, chômage).<br><strong>3. Placement/spéculation</strong> : faire fructifier son capital.<br><strong>4. Constitution d'un patrimoine</strong> : léguer, se constituer un capital.` },
  { term:"Loi d'Engel", cat:"menages", tag:"Ménages", color:"#c47ef0", def:"Plus le revenu d'un ménage augmente, plus la part consacrée à l'alimentation diminue. Indicateur du niveau de développement." },
  { term:"Coefficient budgétaire", cat:"menages", tag:"Ménages", color:"#c47ef0", def:"Part d'un poste de dépense dans le budget de consommation total.", formula:"CB = Dépenses produit X / Total budget consommé × 100" },
  { term:"Propension marginale à consommer", cat:"menages", tag:"Ménages", color:"#c47ef0", def:"Supplément de consommation quand le revenu augmente d'une unité (Keynes). Positive mais < 1.", exemple:"Si le revenu augmente de 100€ et la consommation de 80€, la PMC est de 0,8." },
  { term:"FBCF (Formation Brute de Capital Fixe)", cat:"entreprises", tag:"Entreprises", color:"#f7c948", def:"Valeur des acquisitions d'actifs fixes utilisés en production pendant ≥ 1 an. Mesure l'investissement en comptabilité nationale.", exemple:"Machines, bâtiments, logiciels, R&D." },
  { term:"Prélèvements obligatoires (PO)", cat:"etat", tag:"État", color:"#52d4a0", def:"Ensemble des impôts, taxes et cotisations sociales versés aux APU.", formula:"Taux PO = (Somme des PO / PIB) × 100", exemple:"France ≈ 43% du PIB en 2024 — 1er rang zone euro." },
  { term:"Impôt", cat:"etat", tag:"État", color:"#52d4a0", def:"Versement obligatoire et sans contrepartie directe aux APU. Peut être direct (IRPP) ou indirect (TVA), progressif ou proportionnel." },
  { term:"Taxe", cat:"etat", tag:"État", color:"#52d4a0", def:"Perçue en contrepartie de la fourniture d'un service, sans équivalence absolue.", exemple:"Taxe d'enlèvement des ordures ménagères (TEOM)." },
  { term:"Redistribution verticale", cat:"etat", tag:"État", color:"#52d4a0", def:"Réduit les inégalités de revenus via la fiscalité progressive et les prestations sociales. Transfert des ménages aisés vers les ménages modestes." },
  { term:"Redistribution horizontale", cat:"etat", tag:"État", color:"#52d4a0", def:"Maintient les revenus des personnes frappées par des risques sociaux, indépendamment du niveau de revenu.", exemple:"Remboursements maladie, allocations chômage, retraites." },
  { term:"3 fonctions de Musgrave", cat:"etat", tag:"État", color:"#52d4a0", def:`<strong>1. Allocation</strong> : corriger les défaillances de marché.<br><strong>2. Redistribution</strong> : réduire les inégalités.<br><strong>3. Régulation</strong> : stabiliser la conjoncture économique.` },
  { term:"Courbe de Laffer", cat:"etat", tag:"État", color:"#52d4a0", def:"Au-delà d'un seuil, la hausse de la pression fiscale réduit les recettes fiscales. « Trop d'impôts tue l'impôt »." },
  { term:"Monnaie", cat:"monnaie", tag:"Monnaie", color:"#f07070", def:"Tout moyen de paiement dont disposent les agents. Remplit 3 fonctions : numération (unité de compte), intermédiation (paiement), réserve de valeur. Existe en 3 formes." },
  { term:"Création monétaire", cat:"monnaie", tag:"Monnaie", color:"#f07070", def:"Les banques commerciales créent de la monnaie scripturale en accordant des crédits. « Les crédits font les dépôts. »", exemple:"Chaque nouveau crédit crée de la monnaie — sans nécessiter 100% de contrepartie préalable." },
  { term:"Intermédiation financière", cat:"monnaie", tag:"Monnaie", color:"#f07070", def:"Rôle des banques : collectent l'épargne des agents à capacité de financement et la prêtent aux agents à besoin de financement.", exemple:"Les banques finançaient 80% de l'économie en 1980, moins de 40% aujourd'hui." },
  { term:"Désintermédiation", cat:"monnaie", tag:"Monnaie", color:"#f07070", def:"Les entreprises se financent directement sur les marchés de capitaux (actions, obligations) sans passer par le crédit bancaire. Phénomène depuis les années 1980." },
  { term:"Cryptoactifs", cat:"monnaie", tag:"Monnaie", color:"#f07070", def:"Actifs numériques virtuels sur blockchain. ≠ monnaie selon l'AMF et la Banque de France : pas de cours légal, forte volatilité, acceptation limitée.", exemple:"Bitcoin, Ethereum. Considérés comme actifs spéculatifs." },
  { term:"Blockchain", cat:"monnaie", tag:"Monnaie", color:"#f07070", def:"Protocole informatique décentralisé permettant des transactions sans tiers de confiance. Chaque transaction crée un bloc validé par les mineurs." },
  { term:"Circuit économique", cat:"macro", tag:"Macro", color:"#f0a050", def:"Représentation simplifiée de l'activité économique décrivant les flux entre agents économiques sur les différents marchés." },
  { term:"Flux réels", cat:"macro", tag:"Macro", color:"#f0a050", def:"Mouvements de biens, services et facteurs de production entre agents.", exemple:"Livraison de marchandises, apport de travail d'un salarié." },
  { term:"Flux monétaires", cat:"macro", tag:"Macro", color:"#f0a050", def:"Contrepartie monétaire des flux réels : salaires, paiements, impôts, prestations. Certains sont unilatéraux (sans contrepartie)." },
  { term:"Équilibre emplois-ressources", cat:"macro", tag:"Macro", color:"#f0a050", def:"Égalité comptable fondamentale entre ressources disponibles et leurs utilisations.", formula:"PIB + M = CF + CI + FBCF + X + ΔStocks (économie ouverte)" },
  { term:"Égalité épargne = investissement", cat:"macro", tag:"Macro", color:"#f0a050", def:`En économie fermée, S = I. Deux interprétations :<br><strong>Néoclassiques</strong> : équilibre ex ante via le taux d'intérêt.<br><strong>Keynes</strong> : équilibre ex post via le multiplicateur et les revenus.`, formula:"Fermée : S = I — Ouverte : S = I + (X − M)" },
  { term:"Multiplicateur keynésien", cat:"macro", tag:"Macro", color:"#f0a050", def:"Une hausse de l'investissement entraîne une hausse plus que proportionnelle de la production via les effets en cascade sur la consommation." },
  { term:"Revenu permanent (Friedman)", cat:"macro", tag:"Macro", color:"#f0a050", def:"La consommation dépend du revenu futur anticipé (stable), pas du revenu courant. Critique des politiques keynésiennes de relance." },
  { term:"Théorie du cycle de vie (Modigliani)", cat:"macro", tag:"Macro", color:"#f0a050", def:"Consommation et épargne sont choisies sur l'ensemble de la vie : on emprunte jeune, épargne à l'âge actif, désépargne à la retraite." },
  { term:"Effet de cliquet (Duesenberry)", cat:"macro", tag:"Macro", color:"#f0a050", def:"Les habitudes de consommation baissent lentement quand le revenu diminue. On maintient son niveau de vie en puisant dans l'épargne." },
]; }


// ════════════════════════════════════════════════════════
// CARTE ÉCONOMIQUE MONDIALE
// ════════════════════════════════════════════════════════

let carteInitialized = false;
let worldGeoData = null;
let countriesData = {};
let currentMetric = 'gdp';
let selectedCountry = null;
let svgZoom = null;
let mapSvg = null;
let mapG = null;

// ════════════════════════════════════════════════════════
// 🌍 CARTE ÉCONOMIQUE MONDIALE
// ════════════════════════════════════════════════════════

// Données économiques statiques enrichies (source: Banque Mondiale / FMI 2023)
const ECO_DATA = {
  // Format: [PIB/hab USD, PIB total Mrd USD, croissance %, IDH, population M]
  "USA":  [76330, 25460, 2.5, 0.926, 335],
  "CHN":  [12720, 17960, 5.2, 0.788, 1412],
  "DEU":  [48718, 4073, -0.3, 0.942, 84],
  "JPN":  [33950, 4231, 1.9, 0.920, 125],
  "GBR":  [45850, 3070, 0.1, 0.929, 67],
  "FRA":  [43658, 2782, 0.8, 0.910, 68],
  "IND":  [2410,  3385, 7.2, 0.633, 1428],
  "ITA":  [35658, 2010, 0.7, 0.906, 59],
  "CAN":  [52722, 2090, 1.1, 0.935, 40],
  "KOR":  [33190, 1673, 1.4, 0.929, 52],
  "AUS":  [64960, 1675, 2.0, 0.946, 26],
  "BRA":  [9130,  1920, 2.9, 0.760, 215],
  "RUS":  [14250, 2063, 3.6, 0.821, 145],
  "MEX":  [10800, 1363, 3.2, 0.781, 128],
  "ESP":  [30366, 1422, 2.5, 0.905, 47],
  "IDN":  [4940,  1319, 5.0, 0.705, 277],
  "NLD":  [57770, 1010, 0.1, 0.946, 17],
  "SAU":  [30000, 1061, -0.8, 0.875, 36],
  "TUR":  [11590, 987,  5.1, 0.838, 85],
  "CHE":  [93260, 818,  0.8, 0.962, 9],
  "POL":  [18740, 717,  0.2, 0.881, 38],
  "BEL":  [50850, 578,  1.5, 0.942, 11],
  "SWE":  [55220, 584,  -0.5, 0.952, 10],
  "ARG":  [13710, 621,  -2.5, 0.842, 45],
  "NGA":  [2190,  477,  2.9, 0.535, 220],
  "NOR":  [106150,583,  0.5, 0.966, 5],
  "ARE":  [45880, 499,  3.4, 0.911, 10],
  "EGY":  [3590,  387,  3.8, 0.731, 105],
  "ZAF":  [6690,  377,  0.6, 0.717, 60],
  "PHL":  [3430,  404,  5.6, 0.710, 115],
  "DNK":  [67330, 398,  1.8, 0.952, 6],
  "MYS":  [12100, 399,  3.6, 0.803, 33],
  "SGP":  [88450, 497,  1.1, 0.939, 6],
  "ISR":  [52170, 509,  2.0, 0.919, 10],
  "HKG":  [50040, 369,  3.5, 0.956, 7],
  "FIN":  [50260, 280,  -1.0, 0.942, 6],
  "CHL":  [16590, 301,  0.2, 0.860, 19],
  "CZE":  [26750, 290,  -0.4, 0.895, 11],
  "ROM":  [15400, 301,  2.1, 0.821, 19],
  "PRT":  [24390, 255,  2.3, 0.866, 10],
  "VNM":  [4160,  430,  5.1, 0.703, 98],
  "PER":  [6820,  243,  -0.6, 0.762, 33],
  "GRC":  [20140, 218,  2.2, 0.893, 11],
  "NZL":  [46720, 237,  0.6, 0.939, 5],
  "BGD":  [2690,  460,  6.0, 0.661, 171],
  "PAK":  [1580,  341,  2.0, 0.544, 231],
  "COL":  [6770,  343,  0.6, 0.752, 51],
  "IRQ":  [6000,  249,  1.7, 0.686, 42],
  "MAR":  [3440,  132,  3.1, 0.683, 37],
  "ECU":  [6200,  109,  2.4, 0.765, 18],
  "DZA":  [5330,  239,  4.1, 0.745, 45],
  "KAZ":  [10510, 197,  5.1, 0.802, 19],
  "LKA":  [3820,  84,   -2.0, 0.782, 22],
  "MMR":  [1110,  65,   1.0, 0.585, 54],
  "UKR":  [4180,  161,  5.3, 0.773, 38],
  "IRN":  [6030,  669,  4.7, 0.774, 87],
  "HUN":  [18510, 185,  -0.9, 0.851, 10],
  "THA":  [7300,  500,  1.9, 0.803, 71],
  "KEN":  [2180,  118,  5.5, 0.601, 55],
  "ETH":  [1030,  137,  7.2, 0.492, 127],
  "GHA":  [2200,  75,   3.2, 0.602, 33],
  "TZA":  [1170,  75,   5.0, 0.532, 64],
  "MOZ":  [530,   20,   4.5, 0.446, 33],
  "AGO":  [3340,  109,  0.9, 0.590, 36],
  "CIV":  [2360,  68,   6.2, 0.550, 27],
  "CMR":  [1570,  45,   3.6, 0.576, 28],
  "SEN":  [1610,  27,   4.3, 0.511, 17],
  "MDG":  [520,   16,   3.8, 0.476, 28],
  "ZMB":  [1050,  29,   3.5, 0.565, 19],
  "MLI":  [890,   18,   4.8, 0.428, 23],
  "BFA":  [840,   19,   1.5, 0.449, 22],
  "NER":  [590,   17,   7.5, 0.394, 26],
  "TCD":  [660,   12,   4.5, 0.394, 18],
  "SDN":  [990,   37,   0.5, 0.508, 46],
  "UGA":  [870,   42,   5.3, 0.544, 49],
  "GTM":  [5220,  95,   3.5, 0.627, 18],
  "CUB":  [9500,  107,  1.8, 0.764, 11],
  "VEN":  [4100,  117,  5.0, 0.699, 29],
  "BOL":  [3610,  44,   1.8, 0.703, 12],
  "PRY":  [5840,  43,   4.5, 0.717, 7],
  "URY":  [17680, 63,   1.5, 0.830, 3],
  "JAM":  [5890,  17,   1.5, 0.706, 3],
  "CRI":  [13840, 70,   4.2, 0.806, 5],
  "PAN":  [14950, 70,   7.3, 0.805, 4],
  "DOM":  [9100,  113,  2.4, 0.767, 11],
  "SYR":  [500,   25,   0.0, 0.577, 22],
  "JOR":  [4390,  46,   2.7, 0.736, 10],
  "LBN":  [4800,  23,   -2.0, 0.706, 5],
  "AZE":  [6880,  78,   1.1, 0.760, 10],
  "GEO":  [6920,  28,   6.0, 0.814, 4],
  "ARM":  [7030,  22,   8.7, 0.791, 3],
  "BLR":  [7800,  73,   4.7, 0.801, 9],
  "UZB":  [2440,  80,   5.3, 0.727, 36],
  "TKM":  [9800,  60,   2.0, 0.745, 6],
  "MNG":  [4550,  17,   5.4, 0.737, 3],
  "LAO":  [2200,  18,   4.0, 0.607, 7],
  "KHM":  [1800,  29,   5.2, 0.593, 17],
  "NPL":  [1240,  40,   3.9, 0.601, 30],
  "AFG":  [400,   14,   2.7, 0.478, 41],
  "LBY":  [7400,  46,   17.9, 0.718, 7],
  "TUN":  [3770,  47,   0.4, 0.731, 12],
  "ZWE":  [1400,  26,   5.3, 0.593, 16],
  "NAM":  [4900,  13,   4.2, 0.615, 3],
  "BWA":  [7800,  20,   3.6, 0.693, 3],
  "GAB":  [7400,  16,   2.4, 0.703, 2],
  "COG":  [2250,  12,   3.4, 0.594, 6],
  "SLE":  [500,   4,    3.5, 0.477, 8],
  "GIN":  [1000,  15,   5.6, 0.465, 13],
  "BEN":  [1280,  17,   5.5, 0.525, 13],
  "TGO":  [1000,  9,    5.6, 0.539, 9],
  "NIC":  [2180,  15,   4.6, 0.667, 7],
  "HND":  [2900,  28,   3.5, 0.621, 10],
  "SLV":  [4640,  32,   3.2, 0.675, 6],
};

// Couleurs par métrique
const METRIC_CONFIG = {
  gdp:       { label: 'PIB / habitant', unit: '$', scale: [400, 110000], colors: ['#0a2a4a','#0077b6','#00b4d8','#90e0ef','#caf0f8'], fmt: v => v >= 1000 ? `${(v/1000).toFixed(1)}k$` : `${v}$` },
  gdp_total: { label: 'PIB Total', unit: 'Mrd$', scale: [4, 30000], colors: ['#0a2a1a','#1b4332','#2d6a4f','#52b788','#b7e4c7'], fmt: v => v >= 1000 ? `${(v/1000).toFixed(1)}T$` : `${v}Mrd$` },
  growth:    { label: 'Croissance PIB', unit: '%', scale: [-3, 10], colors: ['#7f1d1d','#991b1b','#b45309','#4d7c0f','#166534'], fmt: v => `${v > 0 ? '+' : ''}${v}%` },
  hdi:       { label: 'IDH', unit: '', scale: [0.39, 0.97], colors: ['#1e1b4b','#3730a3','#6366f1','#a5b4fc','#e0e7ff'], fmt: v => v.toFixed(3) },
  pop:       { label: 'Population', unit: 'M', scale: [0.5, 1500], colors: ['#1c1917','#44403c','#78716c','#d6d3d1','#f5f5f4'], fmt: v => v >= 1000 ? `${(v/1000).toFixed(1)}Md` : `${v}M` },
};

let geoDataLoaded = false;
let mapDrawn = false;

function initCarte() {
  if (carteInitialized) return;
  carteInitialized = true;
  loadWorldMap();
}

async function loadWorldMap() {
  try {
    // Load GeoJSON from CDN
    const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    const world = await response.json();
    const topojson = window.topojson || await loadTopojson();
    worldGeoData = topojson.feature(world, world.objects.countries);
    geoDataLoaded = true;
    drawHomeGlobe();
    // Only draw the full map if carte page is currently visible
    if (document.getElementById('page-carte').classList.contains('active')) {
      drawMapIfNeeded();
    }
  } catch(e) {
    document.getElementById('map-loading').innerHTML = `<p style="color:var(--muted)">⚠️ Impossible de charger la carte. Vérifie ta connexion.</p>`;
  }
}

function drawMapIfNeeded() {
  if (!geoDataLoaded || mapDrawn) return;
  mapDrawn = true;
  drawMap();
  document.getElementById('map-loading').style.display = 'none';
  renderLegend();
}

function loadTopojson() {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js';
    s.onload = () => resolve(window.topojson);
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

// ISO numeric → ISO alpha3 mapping (subset for our data)
const NUM_TO_A3 = {
  "840":"USA","156":"CHN","276":"DEU","392":"JPN","826":"GBR","250":"FRA",
  "356":"IND","380":"ITA","124":"CAN","410":"KOR","036":"AUS","076":"BRA",
  "643":"RUS","484":"MEX","724":"ESP","360":"IDN","528":"NLD","682":"SAU",
  "792":"TUR","756":"CHE","616":"POL","056":"BEL","752":"SWE","032":"ARG",
  "566":"NGA","578":"NOR","784":"ARE","818":"EGY","710":"ZAF","608":"PHL",
  "208":"DNK","458":"MYS","702":"SGP","376":"ISR","344":"HKG","246":"FIN",
  "152":"CHL","203":"CZE","642":"ROM","620":"PRT","704":"VNM","604":"PER",
  "300":"GRC","554":"NZL","050":"BGD","586":"PAK","170":"COL","368":"IRQ",
  "504":"MAR","218":"ECU","012":"DZA","398":"KAZ","144":"LKA","104":"MMR",
  "804":"UKR","364":"IRN","348":"HUN","764":"THA","404":"KEN","231":"ETH",
  "288":"GHA","834":"TZA","508":"MOZ","024":"AGO","384":"CIV","120":"CMR",
  "686":"SEN","450":"MDG","894":"ZMB","466":"MLI","854":"BFA","562":"NER",
  "148":"TCD","729":"SDN","800":"UGA","320":"GTM","192":"CUB","862":"VEN",
  "068":"BOL","600":"PRY","858":"URY","388":"JAM","188":"CRI","591":"PAN",
  "214":"DOM","760":"SYR","400":"JOR","422":"LBN","031":"AZE","268":"GEO",
  "051":"ARM","112":"BLR","860":"UZB","795":"TKM","496":"MNG","418":"LAO",
  "116":"KHM","524":"NPL","004":"AFG","434":"LBY","788":"TUN","716":"ZWE",
  "516":"NAM","072":"BWA","266":"GAB","178":"COG","694":"SLE","324":"GIN",
  "204":"BEN","768":"TGO","558":"NIC","340":"HND","222":"SLV","826":"GBR",
  "040":"AUT","100":"BGR","191":"HRV","703":"SVK","705":"SVN","233":"EST",
  "428":"LVA","440":"LTU","196":"CYP","442":"LUX","470":"MLT","352":"ISL",
  "620":"PRT","858":"URY","630":"PRI","760":"SYR",
};

// Country flags map
const FLAGS = {
  "USA":"🇺🇸","CHN":"🇨🇳","DEU":"🇩🇪","JPN":"🇯🇵","GBR":"🇬🇧","FRA":"🇫🇷",
  "IND":"🇮🇳","ITA":"🇮🇹","CAN":"🇨🇦","KOR":"🇰🇷","AUS":"🇦🇺","BRA":"🇧🇷",
  "RUS":"🇷🇺","MEX":"🇲🇽","ESP":"🇪🇸","IDN":"🇮🇩","NLD":"🇳🇱","SAU":"🇸🇦",
  "TUR":"🇹🇷","CHE":"🇨🇭","POL":"🇵🇱","BEL":"🇧🇪","SWE":"🇸🇪","ARG":"🇦🇷",
  "NGA":"🇳🇬","NOR":"🇳🇴","ARE":"🇦🇪","EGY":"🇪🇬","ZAF":"🇿🇦","PHL":"🇵🇭",
  "DNK":"🇩🇰","MYS":"🇲🇾","SGP":"🇸🇬","ISR":"🇮🇱","HKG":"🇭🇰","FIN":"🇫🇮",
  "CHL":"🇨🇱","CZE":"🇨🇿","ROM":"🇷🇴","PRT":"🇵🇹","VNM":"🇻🇳","PER":"🇵🇪",
  "GRC":"🇬🇷","NZL":"🇳🇿","BGD":"🇧🇩","PAK":"🇵🇰","COL":"🇨🇴","IRQ":"🇮🇶",
  "MAR":"🇲🇦","ECU":"🇪🇨","DZA":"🇩🇿","KAZ":"🇰🇿","LKA":"🇱🇰","MMR":"🇲🇲",
  "UKR":"🇺🇦","IRN":"🇮🇷","HUN":"🇭🇺","THA":"🇹🇭","KEN":"🇰🇪","ETH":"🇪🇹",
  "GHA":"🇬🇭","TZA":"🇹🇿","MOZ":"🇲🇿","AGO":"🇦🇴","CIV":"🇨🇮","CMR":"🇨🇲",
  "SEN":"🇸🇳","MDG":"🇲🇬","ZMB":"🇿🇲","MLI":"🇲🇱","BFA":"🇧🇫","NER":"🇳🇪",
  "TCD":"🇹🇩","SDN":"🇸🇩","UGA":"🇺🇬","GTM":"🇬🇹","CUB":"🇨🇺","VEN":"🇻🇪",
  "BOL":"🇧🇴","PRY":"🇵🇾","URY":"🇺🇾","JAM":"🇯🇲","CRI":"🇨🇷","PAN":"🇵🇦",
  "DOM":"🇩🇴","SYR":"🇸🇾","JOR":"🇯🇴","LBN":"🇱🇧","AZE":"🇦🇿","GEO":"🇬🇪",
  "ARM":"🇦🇲","BLR":"🇧🇾","UZB":"🇺🇿","TKM":"🇹🇲","MNG":"🇲🇳","LAO":"🇱🇦",
  "KHM":"🇰🇭","NPL":"🇳🇵","AFG":"🇦🇫","LBY":"🇱🇾","TUN":"🇹🇳","ZWE":"🇿🇼",
  "NAM":"🇳🇦","BWA":"🇧🇼","GAB":"🇬🇦","COG":"🇨🇬","SLE":"🇸🇱","GIN":"🇬🇳",
  "BEN":"🇧🇯","TGO":"🇹🇬","NIC":"🇳🇮","HND":"🇭🇳","SLV":"🇸🇻",
  "AUT":"🇦🇹","BGR":"🇧🇬","HRV":"🇭🇷","SVK":"🇸🇰","SVN":"🇸🇮","EST":"🇪🇪",
  "LVA":"🇱🇻","LTU":"🇱🇹","CYP":"🇨🇾","LUX":"🇱🇺","MLT":"🇲🇹","ISL":"🇮🇸",
};

const COUNTRY_NAMES_FR = {
  "USA":"États-Unis","CHN":"Chine","DEU":"Allemagne","JPN":"Japon","GBR":"Royaume-Uni",
  "FRA":"France","IND":"Inde","ITA":"Italie","CAN":"Canada","KOR":"Corée du Sud",
  "AUS":"Australie","BRA":"Brésil","RUS":"Russie","MEX":"Mexique","ESP":"Espagne",
  "IDN":"Indonésie","NLD":"Pays-Bas","SAU":"Arabie Saoudite","TUR":"Turquie","CHE":"Suisse",
  "POL":"Pologne","BEL":"Belgique","SWE":"Suède","ARG":"Argentine","NGA":"Nigeria",
  "NOR":"Norvège","ARE":"Émirats Arabes Unis","EGY":"Égypte","ZAF":"Afrique du Sud",
  "PHL":"Philippines","DNK":"Danemark","MYS":"Malaisie","SGP":"Singapour","ISR":"Israël",
  "HKG":"Hong Kong","FIN":"Finlande","CHL":"Chili","CZE":"République Tchèque","ROM":"Roumanie",
  "PRT":"Portugal","VNM":"Vietnam","PER":"Pérou","GRC":"Grèce","NZL":"Nouvelle-Zélande",
  "BGD":"Bangladesh","PAK":"Pakistan","COL":"Colombie","IRQ":"Irak","MAR":"Maroc",
  "ECU":"Équateur","DZA":"Algérie","KAZ":"Kazakhstan","LKA":"Sri Lanka","MMR":"Myanmar",
  "UKR":"Ukraine","IRN":"Iran","HUN":"Hongrie","THA":"Thaïlande","KEN":"Kenya",
  "ETH":"Éthiopie","GHA":"Ghana","TZA":"Tanzanie","MOZ":"Mozambique","AGO":"Angola",
  "CIV":"Côte d'Ivoire","CMR":"Cameroun","SEN":"Sénégal","MDG":"Madagascar","ZMB":"Zambie",
  "MLI":"Mali","BFA":"Burkina Faso","NER":"Niger","TCD":"Tchad","SDN":"Soudan",
  "UGA":"Ouganda","GTM":"Guatemala","CUB":"Cuba","VEN":"Venezuela","BOL":"Bolivie",
  "PRY":"Paraguay","URY":"Uruguay","JAM":"Jamaïque","CRI":"Costa Rica","PAN":"Panama",
  "DOM":"Rép. Dominicaine","SYR":"Syrie","JOR":"Jordanie","LBN":"Liban","AZE":"Azerbaïdjan",
  "GEO":"Géorgie","ARM":"Arménie","BLR":"Biélorussie","UZB":"Ouzbékistan","TKM":"Turkménistan",
  "MNG":"Mongolie","LAO":"Laos","KHM":"Cambodge","NPL":"Népal","AFG":"Afghanistan",
  "LBY":"Libye","TUN":"Tunisie","ZWE":"Zimbabwe","NAM":"Namibie","BWA":"Botswana",
  "GAB":"Gabon","COG":"Congo","SLE":"Sierra Leone","GIN":"Guinée","BEN":"Bénin",
  "TGO":"Togo","NIC":"Nicaragua","HND":"Honduras","SLV":"El Salvador",
  "AUT":"Autriche","BGR":"Bulgarie","HRV":"Croatie","SVK":"Slovaquie","SVN":"Slovénie",
  "EST":"Estonie","LVA":"Lettonie","LTU":"Lituanie","CYP":"Chypre","LUX":"Luxembourg",
  "MLT":"Malte","ISL":"Islande",
};

const REGIONS = {
  "USA":"Amérique du Nord","CHN":"Asie de l'Est","DEU":"Europe","JPN":"Asie de l'Est","GBR":"Europe",
  "FRA":"Europe","IND":"Asie du Sud","ITA":"Europe","CAN":"Amérique du Nord","KOR":"Asie de l'Est",
  "AUS":"Océanie","BRA":"Amérique du Sud","RUS":"Europe / Asie","MEX":"Amérique Centrale",
  "ESP":"Europe","IDN":"Asie du Sud-Est","NLD":"Europe","SAU":"Moyen-Orient","TUR":"Moyen-Orient",
  "CHE":"Europe","POL":"Europe","BEL":"Europe","SWE":"Europe","ARG":"Amérique du Sud",
  "NGA":"Afrique","NOR":"Europe","ARE":"Moyen-Orient","EGY":"Afrique du Nord","ZAF":"Afrique",
  "PHL":"Asie du Sud-Est","DNK":"Europe","MYS":"Asie du Sud-Est","SGP":"Asie du Sud-Est",
  "ISR":"Moyen-Orient","HKG":"Asie de l'Est","FIN":"Europe","CHL":"Amérique du Sud",
  "CZE":"Europe","ROM":"Europe","PRT":"Europe","VNM":"Asie du Sud-Est","PER":"Amérique du Sud",
  "GRC":"Europe","NZL":"Océanie","BGD":"Asie du Sud","PAK":"Asie du Sud","COL":"Amérique du Sud",
  "IRQ":"Moyen-Orient","MAR":"Afrique du Nord","ECU":"Amérique du Sud","DZA":"Afrique du Nord",
  "KAZ":"Asie Centrale","LKA":"Asie du Sud","MMR":"Asie du Sud-Est","UKR":"Europe",
  "IRN":"Moyen-Orient","HUN":"Europe","THA":"Asie du Sud-Est",
};

function getCountryA3(feature) {
  const numId = feature.id ? String(feature.id).padStart(3,'0') : null;
  return numId ? NUM_TO_A3[numId] : null;
}

function getColor(a3) {
  const cfg = METRIC_CONFIG[currentMetric];
  const d = ECO_DATA[a3];
  if (!d) return '#1a2535';
  const idx = [0,1,2,3,4][currentMetric === 'gdp' ? 0 : currentMetric === 'gdp_total' ? 1 : currentMetric === 'growth' ? 2 : currentMetric === 'hdi' ? 3 : 4];
  const val = currentMetric === 'gdp' ? d[0] : currentMetric === 'gdp_total' ? d[1] : currentMetric === 'growth' ? d[2] : currentMetric === 'hdi' ? d[3] : d[4];
  const [mn, mx] = cfg.scale;
  const t = Math.max(0, Math.min(1, (val - mn) / (mx - mn)));
  return d3.interpolateRgbBasis(cfg.colors)(t);
}

function drawHomeGlobe() {
  const wrap = document.getElementById('home-globe-wrap');
  if (!wrap || !worldGeoData) return;
  const w = wrap.clientWidth, h = wrap.clientHeight;
  if (w === 0 || h === 0) return;
  const svg = d3.select('#home-globe-svg').attr('viewBox', `0 0 ${w} ${h}`);
  svg.selectAll('*').remove();

  const scale = Math.min(w, h) * 0.42;
  let rotation = [0, -20, 0];

  const projection = d3.geoOrthographic()
    .scale(scale)
    .translate([w / 2, h / 2])
    .rotate(rotation)
    .clipAngle(90);

  const path = d3.geoPath().projection(projection);

  // Ocean
  svg.append('circle')
    .attr('cx', w/2).attr('cy', h/2).attr('r', scale)
    .attr('fill', '#061525');

  // Graticule
  const graticule = d3.geoGraticule().step([20, 20]);
  const gratPath = svg.append('path')
    .datum(graticule())
    .attr('fill', 'none')
    .attr('stroke', '#0d2540')
    .attr('stroke-width', '0.5')
    .attr('d', path);

  // Countries
  const countryPaths = svg.append('g').selectAll('path')
    .data(worldGeoData.features)
    .join('path')
    .attr('fill', d => getColor(getCountryA3(d)))
    .attr('stroke', '#0a1628')
    .attr('stroke-width', 0.3)
    .attr('d', path);

  // Border
  svg.append('circle')
    .attr('cx', w/2).attr('cy', h/2).attr('r', scale)
    .attr('fill', 'none')
    .attr('stroke', '#1a4a7a')
    .attr('stroke-width', 1)
    .attr('pointer-events', 'none');

  // Auto-rotate (only when home page is visible)
  function spin() {
    if (!document.getElementById('page-home').classList.contains('active')) {
      requestAnimationFrame(spin);
      return;
    }
    rotation[0] += 0.3;
    projection.rotate(rotation);
    gratPath.attr('d', path);
    countryPaths.attr('d', path);
    requestAnimationFrame(spin);
  }
  spin();
}

function drawMap() {
  const wrap = document.getElementById('map-wrap');
  const w = wrap.clientWidth, h = wrap.clientHeight;
  const svg = d3.select('#world-map').attr('viewBox', `0 0 ${w} ${h}`);
  mapSvg = svg;

  const tooltip = document.getElementById('map-tooltip');

  // Globe state
  let rotation = [10, -20, 0]; // [λ, φ, γ]
  let scale = Math.min(w, h) * 0.42;
  const minScale = Math.min(w, h) * 0.3;
  const maxScale = Math.min(w, h) * 2.2;

  const projection = d3.geoOrthographic()
    .scale(scale)
    .translate([w / 2, h / 2])
    .rotate(rotation)
    .clipAngle(90);

  const path = d3.geoPath().projection(projection);

  // ── Atmosphere glow (defs)
  const defs = svg.append('defs');
  const glowId = 'globe-glow';
  const radGrad = defs.append('radialGradient')
    .attr('id', glowId)
    .attr('cx','50%').attr('cy','50%').attr('r','50%');
  radGrad.append('stop').attr('offset','70%').attr('stop-color','#0a1628').attr('stop-opacity','0');
  radGrad.append('stop').attr('offset','100%').attr('stop-color','#1a6fc4').attr('stop-opacity','0.55');

  // Ocean sphere
  svg.append('circle')
    .attr('cx', w/2).attr('cy', h/2)
    .attr('r', scale)
    .attr('id','globe-ocean')
    .attr('fill','#061525');

  // Graticule layer
  const graticule = d3.geoGraticule().step([15, 15]);
  const gratPath = svg.append('path')
    .datum(graticule())
    .attr('class','globe-graticule')
    .attr('fill','none')
    .attr('stroke','#0d2540')
    .attr('stroke-width','0.5');

  // Countries layer
  const countriesGroup = svg.append('g').attr('id','globe-countries');
  const countryPaths = countriesGroup.selectAll('.country-path')
    .data(worldGeoData.features)
    .join('path')
    .attr('class','country-path')
    .attr('fill', d => getColor(getCountryA3(d)));

  // Atmosphere glow overlay
  svg.append('circle')
    .attr('cx', w/2).attr('cy', h/2)
    .attr('r', scale)
    .attr('id','globe-atmo')
    .attr('fill', `url(#${glowId})`)
    .attr('pointer-events','none');

  // Sphere border
  svg.append('circle')
    .attr('cx', w/2).attr('cy', h/2)
    .attr('r', scale)
    .attr('id','globe-border')
    .attr('fill','none')
    .attr('stroke','#1a4a7a')
    .attr('stroke-width','1.5')
    .attr('pointer-events','none');

  mapG = countriesGroup;

  // ── Label "Make France Great Again" sur la France
  // Centroïde approximatif de la France métropolitaine
  const FRANCE_CENTROID = [2.2, 46.2];
  const franceLabel = svg.append('text')
    .attr('id', 'france-label')
    .attr('text-anchor', 'middle')
    .attr('font-family', 'Syne, sans-serif')
    .attr('font-size', '11px')
    .attr('font-weight', '800')
    .attr('fill', '#ffffff')
    .attr('stroke', '#000')
    .attr('stroke-width', '2.5')
    .attr('paint-order', 'stroke')
    .attr('pointer-events', 'none')
    .attr('letter-spacing', '0.5')
    .text('Make France Great Again');

  function redraw() {
    projection.rotate(rotation).scale(scale).translate([w/2, h/2]);
    path.projection(projection);
    svg.select('#globe-ocean').attr('r', scale);
    svg.select('#globe-atmo').attr('r', scale);
    svg.select('#globe-border').attr('r', scale);
    gratPath.attr('d', path);
    countryPaths.attr('d', path);

    // Repositionner le label France
    const proj = projection(FRANCE_CENTROID);
    if (proj) {
      // Vérifier si la France est sur la face visible du globe
      const visible = d3.geoDistance(FRANCE_CENTROID, [-rotation[0], -rotation[1]]) < Math.PI / 2;
      franceLabel
        .attr('x', proj[0])
        .attr('y', proj[1])
        .attr('opacity', visible ? 1 : 0)
        .attr('font-size', Math.max(7, Math.min(14, scale / 30)) + 'px');
    }
  }

  // ── Tooltip & click on countries
  countryPaths
    .on('mousemove', (event, d) => {
      const a3 = getCountryA3(d);
      const name = COUNTRY_NAMES_FR[a3] || 'Pays inconnu';
      const data = ECO_DATA[a3];
      const cfg = METRIC_CONFIG[currentMetric];
      let valStr = '—';
      if (data) {
        const val = currentMetric === 'gdp' ? data[0] : currentMetric === 'gdp_total' ? data[1] : currentMetric === 'growth' ? data[2] : currentMetric === 'hdi' ? data[3] : data[4];
        valStr = cfg.fmt(val);
      }
      const flag = FLAGS[a3] || '🏳️';
      tooltip.innerHTML = `<strong>${flag} ${name}</strong><br><span style="color:var(--muted)">${cfg.label} :</span> <strong style="color:var(--a1)">${valStr}</strong>`;
      tooltip.style.opacity = '1';
      tooltip.style.left = (event.offsetX + 14) + 'px';
      tooltip.style.top = (event.offsetY - 10) + 'px';
    })
    .on('mouseleave', () => { tooltip.style.opacity = '0'; })
    .on('click', (event, d) => {
      const a3 = getCountryA3(d);
      if (!a3 || !ECO_DATA[a3]) return;
      countryPaths.classed('selected', false);
      d3.select(event.currentTarget).classed('selected', true);
      selectedCountry = a3;
      openPanel(a3);
    });

  // ── Drag to rotate with inertia
  let dragStart = null;
  let rotStart = null;
  let velX = 0, velY = 0;
  let lastX = 0, lastY = 0;
  let inertiaRaf = null;

  function stopInertia() {
    if (inertiaRaf) { cancelAnimationFrame(inertiaRaf); inertiaRaf = null; }
  }

  function startInertia() {
    stopInertia();
    function tick() {
      velX *= 0.94;
      velY *= 0.94;
      if (Math.abs(velX) < 0.01 && Math.abs(velY) < 0.01) { inertiaRaf = null; return; }
      rotation[0] += velX;
      rotation[1] = Math.max(-90, Math.min(90, rotation[1] - velY));
      redraw();
      inertiaRaf = requestAnimationFrame(tick);
    }
    inertiaRaf = requestAnimationFrame(tick);
  }

  const drag = d3.drag()
    .on('start', (event) => {
      stopInertia();
      dragStart = [event.x, event.y];
      rotStart = [...rotation];
      lastX = event.x; lastY = event.y;
      velX = 0; velY = 0;
      svg.style('cursor', 'grabbing');
    })
    .on('drag', (event) => {
      const sens = 0.3 / (scale / (Math.min(w,h)*0.42));
      const dx = event.x - dragStart[0];
      const dy = event.y - dragStart[1];
      rotation[0] = rotStart[0] + dx * sens;
      rotation[1] = Math.max(-90, Math.min(90, rotStart[1] - dy * sens));
      velX = (event.x - lastX) * sens * 0.6;
      velY = (event.y - lastY) * sens * 0.6;
      lastX = event.x; lastY = event.y;
      redraw();
    })
    .on('end', () => {
      svg.style('cursor', 'grab');
      startInertia();
    });

  svg.call(drag);

  // ── Scroll to zoom
  svg.on('wheel', (event) => {
    event.preventDefault();
    const delta = event.deltaY < 0 ? 1.12 : 0.89;
    scale = Math.max(minScale, Math.min(maxScale, scale * delta));
    redraw();
  });

  svgZoom = { scale: () => scale };

  // Globe reset handler
  svg.node().addEventListener('globe-reset', () => {
    rotation = [10, -20, 0];
    scale = Math.min(w, h) * 0.42;
    redraw();
  });

  redraw();
}

function setMetric(metric) {
  currentMetric = metric;
  document.querySelectorAll('.cmetric').forEach(b => b.classList.toggle('active', b.dataset.metric === metric));
  if (mapG) {
    mapG.selectAll('.country-path')
      .transition().duration(500)
      .attr('fill', d => getColor(getCountryA3(d)));
  }
  renderLegend();
  if (selectedCountry) openPanel(selectedCountry);
}

function renderLegend() {
  const cfg = METRIC_CONFIG[currentMetric];
  const [mn, mx] = cfg.scale;
  const legendEl = document.getElementById('carte-legend');
  const gradId = 'leg-grad-' + currentMetric;
  legendEl.innerHTML = `
    <div style="font-size:11px;color:var(--muted);margin-right:8px">${cfg.label}</div>
    <div>
      <svg width="200" height="10" style="display:block;border-radius:6px;overflow:hidden">
        <defs><linearGradient id="${gradId}" x1="0" x2="1" y1="0" y2="0">
          ${cfg.colors.map((c,i)=>`<stop offset="${i/(cfg.colors.length-1)*100}%" stop-color="${c}"/>`).join('')}
        </linearGradient></defs>
        <rect width="200" height="10" fill="url(#${gradId})"/>
      </svg>
      <div style="display:flex;justify-content:space-between;width:200px;font-size:10px;color:var(--muted);margin-top:2px">
        <span>${cfg.fmt(mn)}</span><span>${cfg.fmt(mx)}</span>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:6px;margin-left:12px">
      <span style="width:12px;height:12px;background:#1a2535;border-radius:3px;display:inline-block;border:1px solid var(--border)"></span>
      <span style="font-size:10px;color:var(--muted)">Données indisponibles</span>
    </div>
  `;
}

function openPanel(a3) {
  const panel = document.getElementById('carte-panel');
  panel.classList.remove('panel-hidden');
  panel.classList.add('panel-open');
  const d = ECO_DATA[a3];
  const name = COUNTRY_NAMES_FR[a3] || a3;
  const flag = FLAGS[a3] || '🏳️';
  const region = REGIONS[a3] || '';

  document.getElementById('panel-flag').textContent = flag;
  document.getElementById('panel-country-name').textContent = name;
  document.getElementById('panel-region').textContent = region;

  // Stats grid
  const gdpHab = d[0], gdpTot = d[1], growth = d[2], hdi = d[3], pop = d[4];
  const growthColor = growth > 3 ? '#22c55e' : growth > 0 ? '#86efac' : growth > -1 ? '#fb923c' : '#f87171';
  const hdiColor = hdi > 0.8 ? '#6366f1' : hdi > 0.7 ? '#60a5fa' : hdi > 0.55 ? '#f59e0b' : '#f87171';

  document.getElementById('panel-stats-grid').innerHTML = `
    <div class="pstat">
      <div class="pstat-val">${gdpHab >= 1000 ? `${(gdpHab/1000).toFixed(1)}k` : gdpHab}$</div>
      <div class="pstat-lbl">PIB / habitant</div>
      <div class="pstat-sub">${gdpHab >= 30000 ? 'Pays riche' : gdpHab >= 12000 ? 'Revenu élevé' : gdpHab >= 4000 ? 'Revenu intermédiaire' : 'Pays pauvre'}</div>
    </div>
    <div class="pstat">
      <div class="pstat-val">${gdpTot >= 1000 ? `${(gdpTot/1000).toFixed(1)}T$` : `${gdpTot}Md$`}</div>
      <div class="pstat-lbl">PIB Total</div>
    </div>
    <div class="pstat">
      <div class="pstat-val" style="color:${growthColor}">${growth > 0 ? '+' : ''}${growth}%</div>
      <div class="pstat-lbl">Croissance PIB</div>
      <div class="pstat-sub">${growth > 5 ? 'Forte croissance' : growth > 2 ? 'Croissance soutenue' : growth > 0 ? 'Croissance faible' : 'Récession'}</div>
    </div>
    <div class="pstat">
      <div class="pstat-val" style="color:${hdiColor}">${hdi.toFixed(3)}</div>
      <div class="pstat-lbl">IDH</div>
      <div class="pstat-sub">${hdi > 0.8 ? 'Très élevé' : hdi > 0.7 ? 'Élevé' : hdi > 0.55 ? 'Moyen' : 'Faible'}</div>
    </div>
    <div class="pstat" style="grid-column:1/-1">
      <div class="pstat-val">${pop >= 1000 ? `${(pop/1000).toFixed(2)}Md` : `${pop}M`}</div>
      <div class="pstat-lbl">Population</div>
    </div>
  `;

  // Eco note
  const notes = {
    "USA": "1ère économie mondiale. Modèle libéral, fort secteur tertiaire (80% PIB). Réserve mondiale du dollar.",
    "CHN": "2ème économie mondiale. Croissance tirée par l'industrie et les exportations. Modèle capitaliste d'État.",
    "DEU": "1ère économie européenne. Spécialisation dans l'industrie manufacturière (Mittelstand). Modèle rhénan.",
    "JPN": "Vieillissement démographique prononcé. Déflation structurelle, politique monétaire expansive (Abenomics).",
    "FRA": "Modèle mixte à forte intervention étatique. Services 77% PIB. Déficit public persistant.",
    "IND": "Croissance la plus rapide parmi les grandes économies. Dividende démographique. Tertiarisation rapide.",
    "BRA": "Plus grande économie d'Amérique du Sud. Ressources naturelles abondantes. Forte inégalité (coefficient Gini élevé).",
    "NOR": "Modèle de bien-être financé par le pétrole. Fonds souverain = 1400Md$. IDH parmi les plus élevés du monde.",
    "CHE": "Spécialisation dans la finance, pharmacie, luxe. Neutralité monétaire historique. PIB/hab. parmi les plus élevés.",
    "SGP": "Cité-État, hub financier et logistique d'Asie. Politique d'attractivité fiscale. Croissance fondée sur l'ouverture.",
  };
  const note = notes[a3] || `${name} : données issues du FMI / Banque Mondiale 2023. Cliquer sur un indicateur pour l'explorer.`;
  document.getElementById('panel-eco-note').textContent = note;

  // Comparison bars
  const worldAvgGdp = 13200, worldAvgHdi = 0.73, worldAvgGrowth = 3.0;
  document.getElementById('panel-bar-section').innerHTML = `
    <div style="font-size:11px;font-weight:700;color:var(--muted);margin-bottom:10px;text-transform:uppercase;letter-spacing:.08em">Comparaison mondiale</div>
    ${barRow('PIB/hab vs moyenne mondiale', gdpHab, worldAvgGdp * 2.5, '#6366f1')}
    ${barRow('IDH vs seuil élevé (0.8)', hdi * 100, 80, '#22c55e')}
    ${barRow('Croissance vs moyenne (3%)', Math.max(0, growth + 3), 13, '#f59e0b')}
  `;
}

function barRow(label, val, max, color) {
  const pct = Math.min(100, Math.max(0, (val / max) * 100));
  return `
    <div class="pbar-row">
      <div class="pbar-label"><span>${label}</span><span style="color:${color}">${Math.round(pct)}%</span></div>
      <div class="pbar-track"><div class="pbar-fill" style="width:${pct}%;background:${color}"></div></div>
    </div>`;
}

function closePanel() {
  document.getElementById('carte-panel').classList.remove('panel-open');
  document.getElementById('carte-panel').classList.add('panel-hidden');
  if (mapG) mapG.selectAll('.country-path').classed('selected', false);
  selectedCountry = null;
}

function filterCarteSearch(query) {
  if (!mapG || !query.trim()) {
    if (mapG) mapG.selectAll('.country-path').style('opacity', null);
    return;
  }
  const q = query.toLowerCase();
  mapG.selectAll('.country-path').style('opacity', d => {
    const a3 = getCountryA3(d);
    const name = (COUNTRY_NAMES_FR[a3] || '').toLowerCase();
    return name.includes(q) ? 1 : 0.15;
  });
  const match = worldGeoData.features.find(d => {
    const a3 = getCountryA3(d);
    const name = (COUNTRY_NAMES_FR[a3] || '').toLowerCase();
    return name.includes(q) && ECO_DATA[a3];
  });
  if (match && query.length > 2) openPanel(getCountryA3(match));
}

function zoomIn()    { if(mapSvg) mapSvg.node().dispatchEvent(new WheelEvent('wheel', { deltaY: -120, bubbles: true })); }
function zoomOut()   { if(mapSvg) mapSvg.node().dispatchEvent(new WheelEvent('wheel', { deltaY: 120, bubbles: true })); }
function resetZoom() { if(mapSvg) mapSvg.node().dispatchEvent(new CustomEvent('globe-reset')); }
