// ════════════════════════════════════════════════════════
// DEFINITIONS
// ════════════════════════════════════════════════════════

function getAllDefs() {
  const ch11 = [
    { term:'Rareté', tag:'Fondements', color:'var(--a1)', def:'Situation où les besoins et désirs dépassent les ressources disponibles. La rareté est le problème économique universel qui oblige à faire des choix.' },
    { term:'Coût d\'opportunité', tag:'Fondements', color:'var(--a1)', def:'La valeur de la meilleure alternative sacrifiée lors d\'un choix. Mesure le renoncement associé à toute décision économique.', exemple:'Choisir les vacances plutôt qu\'un ordinateur : l\'ordi est le coût d\'opportunité.' },
    { term:'Bien libre', tag:'Biens', color:'var(--a2)', def:'Bien disponible gratuitement sans intervention humaine, en quantité naturellement abondante.', exemple:'L\'air, le soleil, l\'eau d\'une source.' },
    { term:'Bien économique', tag:'Biens', color:'var(--a2)', def:'Bien nécessitant un travail humain pour être produit, disponible en quantité limitée et ayant un prix.' },
    { term:'Bien collectif (Samuelson 1954)', tag:'Biens', color:'var(--a2)', def:'Bien caractérisé par la non-exclusion (impossible d\'exclure quelqu\'un de son usage) et la non-rivalité (l\'usage par un individu n\'empêche pas l\'usage par un autre).', exemple:'Un phare, la défense nationale, l\'air pur.' },
    { term:'Bien commun', tag:'Biens', color:'var(--a2)', def:'Bien rival (son usage peut gêner les autres) mais non exclusif. Risque de surexploitation (Hardin, 1968 : "tragédie des biens communs").', exemple:'Un banc de poissons, une forêt communale.' },
    { term:'Facteur de production', tag:'Production', color:'var(--a3)', def:'Ressource utilisée dans le processus de production. Les deux facteurs principaux sont le travail et le capital.' },
    { term:'Facteur travail', tag:'Production', color:'var(--a3)', def:'Ensemble des ressources humaines (physiques et intellectuelles) mobilisées dans la production. Rémunéré par le salaire.' },
    { term:'Facteur capital', tag:'Production', color:'var(--a3)', def:'Ensemble des biens durables utilisés pour produire d\'autres biens. Inclut capital technique (machines) et immatériel (R&D, logiciels).', formula:'FBCF = Formation Brute de Capital Fixe' },
    { term:'Progrès technique', tag:'Production', color:'var(--a3)', def:'Amélioration des méthodes de production permettant d\'obtenir plus de production avec les mêmes facteurs, ou la même production avec moins de facteurs.' },
    { term:'Destruction créatrice (Schumpeter)', tag:'Production', color:'var(--a3)', def:'Processus par lequel les innovations rendent obsolètes les activités et structures existantes tout en créant de nouvelles. Moteur du capitalisme.', exemple:'L\'automobile a remplacé le cheval, le numérique remplace l\'imprimerie.' },
    { term:'Rendements décroissants', tag:'Production', color:'var(--a4)', def:'À court terme, avec un facteur fixe, chaque unité supplémentaire du facteur variable apporte une production additionnelle de plus en plus faible.' },
    { term:'Combinaison productive', tag:'Production', color:'var(--a4)', def:'Association des facteurs de production (capital et travail) pour obtenir un bien ou service. Vise à minimiser les coûts pour un niveau de production donné.' },
    { term:'Substituabilité capital/travail', tag:'Production', color:'var(--a4)', def:'Possibilité de remplacer un facteur par un autre. Si le coût du travail augmente, l\'entreprise peut substituer du capital (machine) au travail.' },
    { term:'Productivité', tag:'Production', color:'var(--a4)', def:'Rapport entre la production obtenue et les facteurs utilisés.', formula:'Productivité du travail = Production / Quantité de travail' },
    { term:'Innovation de produit', tag:'Progrès tech.', color:'var(--a5)', def:'Création d\'un bien ou service nouveau ou significativement amélioré.', exemple:'Le smartphone, les vaccins à ARN messager.' },
    { term:'Innovation de procédé', tag:'Progrès tech.', color:'var(--a5)', def:'Nouvelle méthode de production plus efficace permettant de réduire les coûts ou d\'augmenter la qualité.', exemple:'La chaîne de montage de Ford, les robots dans l\'automobile.' },
    { term:'Macroéconomie', tag:'Économie', color:'var(--muted)', def:'Branche de l\'économie qui étudie l\'économie comme un tout : PIB, inflation, chômage, croissance.' },
    { term:'Microéconomie', tag:'Économie', color:'var(--muted)', def:'Branche de l\'économie qui étudie le comportement des agents individuels (ménages, entreprises) sur les marchés.' },
    { term:'Capital humain', tag:'Production', color:'var(--a3)', def:'Ensemble des compétences, savoirs et savoir-faire acquis par un individu (via l\'éducation et l\'expérience) qui augmentent sa productivité.', exemple:'Un diplôme d\'ingénieur, une formation en gestion.' },
    { term:'Économie', tag:'Fondements', color:'var(--a1)', def:'Du grec "oikos" (maison) et "nomos" (gérer). Selon Robbins (1932) : science qui étudie le comportement humain en tant que relation entre les fins et les moyens rares à usages alternatifs.' },
    { term:'Loi de rareté', tag:'Fondements', color:'var(--a1)', def:'Loi naturelle découlant de l\'insuffisance des ressources par rapport aux besoins, impliquant de hiérarchiser les besoins en fonction du budget disponible.' },
    { term:'Bien public (Pigou)', tag:'Biens', color:'var(--a2)', def:'Bien n\'appartenant à personne en particulier, géré par les administrations publiques pour le bien-être de tous. Pigou (1920) justifie l\'intervention de l\'État pour le bien-être général.', exemple:'Les routes, l\'éclairage public.' },
    { term:'Bien de club', tag:'Biens', color:'var(--a2)', def:'Bien non rival mais excluable. L\'accès est réservé à ceux qui paient.', exemple:'Transports en commun, Netflix.' },
    { term:'Tragédie des communs (Hardin 1968)', tag:'Biens', color:'var(--a2)', def:'Surexploitation d\'une ressource commune car chacun agit dans son intérêt individuel. Privatisation du profit mais socialisation de la perte.', exemple:'Un pâturage commun épuisé par les éleveurs. Solution : Ostrom (1990) propose la gestion communautaire.' },
    { term:'Biens marchands / non marchands', tag:'Biens', color:'var(--a2)', def:'Marchands : produits destinés au marché (scooter, concert). Non marchands : services fournis gratuitement ou à prix non significatif par les APU et associations (justice, police, école publique).' },
    { term:'Capital fixe / Capital technique', tag:'Production', color:'var(--a3)', def:'Ensemble des moyens de production de biens et services participant à plusieurs cycles de production. Böhm-Bawerk : le capital est un détour de production.' },
    { term:'FBCF (Formation Brute de Capital Fixe)', tag:'Production', color:'var(--a3)', def:'Mesure de l\'accumulation du capital au niveau macroéconomique. Inclut capital productif (entreprises), logements (ménages), équipements collectifs (État).', formula:'Taux d\'investissement = (FBCF / PIB) × 100' },
    { term:'Investissement de productivité', tag:'Investissement', color:'var(--a5)', def:'Augmentation de capital conduisant à une hausse de la productivité sans nécessairement augmenter la production.' },
    { term:'Investissement de capacité', tag:'Investissement', color:'var(--a5)', def:'Augmentation du capital permettant de produire plus pour répondre à une hausse de la demande. Entraîne une hausse de l\'emploi.' },
    { term:'Multiplicateur d\'investissement (Keynes)', tag:'Investissement', color:'var(--a5)', def:'La variation des revenus (ΔY) est k fois plus importante que la variation de l\'investissement (ΔI).', formula:'ΔY = k × ΔI' },
    { term:'Effet de levier', tag:'Investissement', color:'var(--a5)', def:'Stratégie de financement par emprunt visant à augmenter la rentabilité des capitaux propres. Peut mettre l\'économie en danger (crise 2008).' },
    { term:'Cycle de Kondratiev', tag:'Progrès tech.', color:'var(--a3)', def:'Cycle économique long de 50-60 ans avec phase ascendante et descendante. Les innovations majeures se concentrent avant le début d\'une nouvelle phase ascendante.' },
    { term:'Grappe technologique (Zimmermann)', tag:'Progrès tech.', color:'var(--a3)', def:'Ensemble d\'innovations convergentes articulées autour d\'innovations radicales, se diffusant conjointement dans le tissu productif et favorisant une relance économique.' },
    { term:'Croissance extensive', tag:'Croissance', color:'var(--a4)', def:'Croissance basée sur l\'augmentation de la quantité de facteurs de production. Peu de progrès technique. Croissance durable impossible.' },
    { term:'Croissance intensive', tag:'Croissance', color:'var(--a4)', def:'Croissance expliquée par une meilleure utilisation des facteurs (progrès technique) et des gains de productivité. Croissance durable possible.' },
    { term:'Fonction de Cobb-Douglas (1928)', tag:'Production', color:'var(--a4)', def:'Relation mathématique entre production et facteurs. Y = c·K^α·L^β. En CPP : α + β = 1, rendements d\'échelle constants.', formula:'Y = c · K^α · L^(1-α)' },
    { term:'Économies d\'échelle', tag:'Production', color:'var(--a4)', def:'Les facteurs de production sont utilisés plus efficacement quand les quantités produites sont plus élevées : division du travail, spécialisation, utilisation à pleine capacité.' },
    { term:'Productivité marginale', tag:'Production', color:'var(--a4)', def:'Productivité de la dernière unité d\'un facteur de production. Variation de la production induite par l\'utilisation d\'une unité supplémentaire.' },
  ].map(d => ({...d, chapter:'CH1-1', chapterName:'Ressources pour produire'}));

  const ch12 = [
    { term:'Allocation des ressources', tag:'Core', color:'var(--a1)', def:'Répartition des facteurs de production (capital, travail, matières premières) vers les usages où l\'utilité sera maximale, à court et long terme.' },
    { term:'Arbitrage', tag:'Core', color:'var(--a1)', def:'Choix sous contrainte impliquant un renoncement. Faire un arbitrage = choisir entre des options mutuellement exclusives en évaluant coûts et avantages.' },
    { term:'Contrainte budgétaire', tag:'Microéco', color:'var(--a2)', def:'Limite des dépenses d\'un agent, représentée par une droite de budget. L\'agent choisit une combinaison de biens dans les limites de son revenu et des prix.' },
    { term:'Utilité marginale', tag:'Marginalisme', color:'var(--a3)', def:'Utilité procurée par la consommation d\'une unité supplémentaire d\'un bien. Décroît avec la quantité consommée (loi de l\'utilité marginale décroissante).' },
    { term:'Loi de l\'utilité marginale décroissante', tag:'Marginalisme', color:'var(--a3)', def:'Plus on consomme d\'un bien, moins chaque unité supplémentaire procure de satisfaction. Explique la demande décroissante en fonction du prix.' },
    { term:'Paradoxe de la valeur (eau vs diamant)', tag:'Marginalisme', color:'var(--a3)', def:'L\'eau, très utile, est peu chère. Le diamant, peu utile, est très cher. Explication : l\'eau a une utilité marginale faible (abondante), le diamant une utilité marginale élevée (rare).' },
    { term:'Pyramide de Maslow (1943)', tag:'Besoins', color:'var(--a5)', def:'Théorie de la hiérarchie des besoins humains en 5 niveaux : physiologiques, sécurité, appartenance, estime, accomplissement. On satisfait les besoins inférieurs avant les supérieurs.' },
    { term:'Raisonnement à la marge', tag:'Marginalisme', color:'var(--a3)', def:'Décision économique basée sur la comparaison du bénéfice marginal et du coût marginal d\'une unité supplémentaire.', formula:'Optimum : Bénéfice marginal = Coût marginal' },
    { term:'Valeur d\'usage (Adam Smith)', tag:'Valeur', color:'var(--a4)', def:'Utilité d\'un bien, ce à quoi il sert. Distincte de la valeur d\'échange.', exemple:'L\'eau a une forte valeur d\'usage (essentielle à la vie).' },
    { term:'Valeur d\'échange (Adam Smith)', tag:'Valeur', color:'var(--a4)', def:'Prix d\'un bien sur le marché, ou la quantité d\'autres biens contre lesquels il peut être échangé.', exemple:'Le diamant a une forte valeur d\'échange.' },
    { term:'Valeur travail (Smith, Ricardo)', tag:'Valeur', color:'var(--a4)', def:'Théorie selon laquelle la valeur d\'échange d\'un bien est déterminée par la quantité de travail nécessaire à sa production.' },
    { term:'Main invisible (Adam Smith)', tag:'Libéralisme', color:'var(--a2)', def:'Mécanisme selon lequel la poursuite individuelle de l\'intérêt privé conduit, via le marché, à un optimum collectif. Justifie le laisser-faire libéral.' },
    { term:'Équilibre général (Walras)', tag:'Marginalisme', color:'var(--a3)', def:'Théorie selon laquelle tous les marchés s\'équilibrent simultanément en concurrence pure et parfaite, réalisant un optimum collectif.' },
    { term:'Bénéfice marginal', tag:'Marginalisme', color:'var(--a3)', def:'Avantage supplémentaire obtenu par la production ou la consommation d\'une unité de plus.' },
    { term:'Coût marginal', tag:'Marginalisme', color:'var(--a3)', def:'Coût lié à l\'augmentation d\'un degré supplémentaire d\'une activité donnée.' },
    { term:'Homo economicus', tag:'Marginalisme', color:'var(--a3)', def:'Selon l\'analyse néoclassique, les agents économiques sont parfaitement rationnels et leur choix est issu d\'un calcul économique optimal.' },
    { term:'Avantages comparatifs (Ricardo)', tag:'Valeur', color:'var(--a4)', def:'Chaque pays doit se spécialiser dans la production du bien où il a un avantage comparatif, même s\'il est moins efficace que d\'autres dans l\'absolu.' },
  ].map(d => ({...d, chapter:'CH1-2', chapterName:'Allocation des ressources'}));

  const ch13 = [
    { term:'PIB (Produit Intérieur Brut)', tag:'Mesure', color:'var(--a1)', def:'Indicateur mesurant la valeur totale de la production annuelle des agents résidant sur un territoire. Égal au revenu national et à la somme des VA.', formula:'PIB = Σ VA + impôts sur la production − subventions' },
    { term:'PIB nominal (en valeur)', tag:'Mesure', color:'var(--a1)', def:'PIB calculé aux prix courants, incluant les effets de l\'inflation. Ne permet pas de mesurer la vraie croissance.' },
    { term:'PIB réel (en volume)', tag:'Mesure', color:'var(--a1)', def:'PIB corrigé des effets de l\'inflation. Permet de comparer la production dans le temps et entre pays.' },
    { term:'Taux de croissance économique', tag:'Mesure', color:'var(--a1)', def:'Variation du PIB réel d\'une période à l\'autre. Positif = expansion, négatif = récession.', formula:'Taux = (PIB(n) − PIB(n-1)) / PIB(n-1) × 100' },
    { term:'RNB (Revenu National Brut)', tag:'Mesure', color:'var(--a2)', def:'PIB + revenus primaires reçus du reste du monde − revenus primaires versés au reste du monde. Remplace le PNB depuis 1993.' },
    { term:'PIB/habitant', tag:'Mesure', color:'var(--a2)', def:'PIB divisé par la population. Indicateur du niveau de vie moyen. Ne tient pas compte des inégalités de répartition.' },
    { term:'Valeur Ajoutée (VA)', tag:'Production', color:'var(--a2)', def:'Richesse créée par une unité productive.', formula:'VA = Production − Consommations intermédiaires' },
    { term:'Externalité', tag:'Limites PIB', color:'var(--a4)', def:'Effet d\'une activité économique sur des tiers non parties à l\'échange, sans compensation monétaire. Négative : pollution. Positive : vaccination.' },
    { term:'IDH (Indice de Développement Humain)', tag:'Alternatifs', color:'var(--a3)', def:'Indicateur du PNUD (Amartya Sen) combinant espérance de vie, niveau d\'éducation et revenu par habitant. Classe les pays de 0 à 1.' },
    { term:'Courbe de Kuznets', tag:'Inégalités', color:'var(--a5)', def:'Kuznets montre que les inégalités augmentent d\'abord puis diminuent lors du développement économique (courbe en U inversé).' },
    { term:'Courbe de l\'éléphant (Milanovic 2014)', tag:'Inégalités', color:'var(--a5)', def:'Représentation des gains de la mondialisation (1988-2008). Gagnants : classes moyennes des émergents. Perdants : classes moyennes des pays riches.' },
    { term:'Empreinte écologique', tag:'Alternatifs', color:'var(--a3)', def:'Surface de terre productive nécessaire pour satisfaire la consommation d\'une population et absorber ses déchets. Mesure la pression sur les écosystèmes.' },
    { term:'PPA (Parité de Pouvoir d\'Achat)', tag:'Mesure', color:'var(--a2)', def:'Taux calculé par le rapport entre les quantités de monnaie nécessaires pour acquérir les mêmes biens. Permet les comparaisons internationales du niveau de vie.' },
    { term:'Optimum de Pareto', tag:'Bien-être', color:'var(--a5)', def:'Le bien-être social optimum est atteint lorsque aucun individu ne peut améliorer son bien-être sans détériorer celui d\'un autre.' },
    { term:'Bien-être (Pigou)', tag:'Bien-être', color:'var(--a5)', def:'L\'individu est seul juge de son bien-être. En raison de l\'utilité décroissante de la richesse, tout transfert des plus riches aux plus pauvres accroît le bien-être global.' },
    { term:'Happy Planet Index', tag:'Alternatifs', color:'var(--a3)', def:'Indicateur (2006) inspiré de l\'empreinte écologique.', formula:'HPI = (satisfaction × espérance de vie) / empreinte écologique' },
    { term:'ISS (Indicateur de Santé Sociale)', tag:'Alternatifs', color:'var(--a3)', def:'Indice synthétique (Miringoff) visant à compléter le PIB : 16 variables regroupées en 5 composantes associées à des catégories d\'âge.' },
    { term:'ENA (Épargne Nette Ajustée)', tag:'Alternatifs', color:'var(--a3)', def:'Indicateur de la Banque mondiale. Épargne nette + dépenses d\'éducation − épuisement des ressources et dommages environnementaux.' },
  ].map(d => ({...d, chapter:'CH1-3', chapterName:'Mesure de la richesse'}));

  const ch2 = [
    { term:'Système productif', tag:'Core', color:'var(--a1)', def:'Ensemble des facteurs et acteurs concourant à la production, la circulation et la consommation de richesses (Carroué, 2013).' },
    { term:'Branche d\'activité', tag:'Structure', color:'var(--a1)', def:'Regroupement des entreprises qui produisent le même type de bien ou service.' },
    { term:'Secteur d\'activité', tag:'Structure', color:'var(--a1)', def:'Regroupement des entreprises ayant la même activité principale. Les 3 secteurs : primaire, secondaire, tertiaire (Colin Clark). + quaternaire.' },
    { term:'Secteur quaternaire', tag:'Structure', color:'var(--a2)', def:'Secteur des services intellectuels à haute valeur ajoutée : numérique, IA, innovation, communication. Conjugue industrie + services (Michèle Debonneuil).' },
    { term:'Industrie 4.0', tag:'Numérique', color:'var(--a2)', def:'4ème révolution industrielle : usines intelligentes, robots, IA, IoT. Plus rapide et exponentielle que les révolutions précédentes.' },
    { term:'PME', tag:'Taille', color:'var(--a3)', def:'Petite et Moyenne Entreprise : moins de 250 salariés, CA annuel < 50M€ ou bilan < 43M€.' },
    { term:'ETI', tag:'Taille', color:'var(--a3)', def:'Entreprise de Taille Intermédiaire : 250-4999 salariés, CA < 1,5Md€. La France en manque par rapport à l\'Allemagne.' },
    { term:'Nationalisation', tag:'Public/Privé', color:'var(--a4)', def:'Transfert de propriété d\'une entreprise vers l\'État, avec indemnisation. En France : deux vagues majeures (1945-46 et 1981-82).' },
    { term:'Privatisation', tag:'Public/Privé', color:'var(--a4)', def:'Vente par l\'État de ses participations dans une entreprise publique à des investisseurs privés via une OPV en Bourse.' },
    { term:'Concentration économique', tag:'Marché', color:'var(--a5)', def:'Processus permettant à un nombre restreint d\'entreprises de dominer une part croissante du marché. Types : verticale, horizontale, conglomérale.' },
    { term:'Concentration verticale', tag:'Marché', color:'var(--a5)', def:'Une entreprise contrôle ses fournisseurs (amont) et/ou ses circuits de distribution (aval).', exemple:'LVMH possède boutiques et contrôle la production.' },
    { term:'Concentration horizontale', tag:'Marché', color:'var(--a5)', def:'Rachat d\'entreprises du même secteur. Génère des économies d\'échelle et augmente la part de marché.', exemple:'Alliance Renault + Nissan + Mitsubishi.' },
    { term:'Concentration conglomérale', tag:'Marché', color:'var(--a5)', def:'Rachat d\'entreprises sans liens techniques. Objectif : diversification des risques.', exemple:'Bouygues : construction + télécoms + médias.' },
    { term:'Monopole', tag:'Marché', color:'var(--a5)', def:'Un seul vendeur face à de nombreux acheteurs. Le monopoleur fixe son prix.', exemple:'SNCF Réseau pour les voies ferrées.' },
    { term:'Oligopole', tag:'Marché', color:'var(--a5)', def:'Quelques grands vendeurs face à de nombreux acheteurs. Chaque acteur influence le marché.' },
    { term:'Désindustrialisation', tag:'Mutation', color:'var(--a4)', def:'Recul de l\'industrie dans la part de l\'emploi et du PIB. Causée par l\'automatisation, les délocalisations, la faiblesse de la R&D.' },
    { term:'Tertiarisation', tag:'Mutation', color:'var(--a4)', def:'Montée en puissance des services dans l\'économie. En France, les services représentent 77% du PIB et 76% de l\'emploi.' },
    { term:'Gains de productivité', tag:'Productivité', color:'var(--a1)', def:'Augmentation du rapport production/facteurs. Permet de produire plus avec moins ou autant de facteurs. Source principale : progrès technique.', formula:'Productivité du travail = VA / Nb d\'heures travaillées' },
    { term:'Concurrence pure et parfaite (Walras)', tag:'Marché', color:'var(--a5)', def:'5 conditions : homogénéité du produit, atomicité, libre entrée/sortie, libre circulation des facteurs, information parfaite.' },
    { term:'Effet de substitution', tag:'Demande', color:'var(--a2)', def:'Quand un bien devient plus cher relativement à un autre, la demande baisse pour le premier et se reporte sur le second.', exemple:'Prix du poisson ↑ → consommateurs se rabattent sur le poulet.' },
    { term:'Effet de revenu', tag:'Demande', color:'var(--a2)', def:'Effet d\'une augmentation ou baisse du revenu sur la quantité demandée.', exemple:'Gain au loto → travailler moins, plus de temps libre.' },
    { term:'Paradoxe de Veblen', tag:'Demande', color:'var(--a2)', def:'L\'augmentation des prix d\'un bien entraîne une augmentation de la demande (biens de luxe, prestige social).' },
    { term:'Paradoxe de Giffen', tag:'Demande', color:'var(--a2)', def:'On consomme plus d\'un bien de première nécessité quand son prix augmente car on ne peut plus acheter les autres.', exemple:'Pommes de terre en Irlande pendant la grande famine (XIXe s.).' },
    { term:'Élasticité-revenu', tag:'Demande', color:'var(--a2)', def:'Mesure la sensibilité de la demande d\'un bien à une variation du revenu. Si >1, bien de luxe ; si <1, bien de nécessité.' },
    { term:'Théorie du déversement (Sauvy)', tag:'Mutation', color:'var(--a4)', def:'Le transfert d\'emplois du primaire vers le secondaire, puis du secondaire vers le tertiaire, est un phénomène normal illustrant l\'évolution d\'une société.' },
    { term:'Coûts de transaction (Coase, Williamson)', tag:'Numérique', color:'var(--a2)', def:'L\'entreprise choisit entre recours au marché ou ressources propres selon ce qui optimise ses coûts globaux. 4 types : recherche d\'info, contractualisation, exécution, litiges.' },
    { term:'Polarisation des emplois', tag:'Numérique', color:'var(--a2)', def:'La part des emplois intermédiaires diminue au profit des emplois très qualifiés et peu qualifiés. Les TIC substituent le capital au travail intermédiaire.' },
    { term:'Néo-taylorisme digital', tag:'Numérique', color:'var(--a2)', def:'Organisation du travail inspirée du taylorisme mais s\'appuyant sur les plateformes digitales, le big data et l\'IA.' },
    { term:'Mondialisation', tag:'International', color:'var(--a1)', def:'Échanges portant sur 4 facteurs : capital financier, capital productif, travailleurs et savoirs (progrès technique). Met en concurrence des territoires.' },
    { term:'Délocalisation', tag:'International', color:'var(--a1)', def:'Déplacement d\'unités de production d\'un pays vers un autre pour réduire les coûts de production (main-d\'œuvre bon marché).' },
    { term:'Niveau de vie', tag:'Productivité', color:'var(--a1)', def:'Revenu disponible du ménage divisé par le nombre d\'unités de consommation (UC). Lié à l\'augmentation du PIB par habitant.' },
    { term:'Barrières à l\'entrée', tag:'Marché', color:'var(--a5)', def:'Obstacles limitant la mise en concurrence des entreprises dominantes par de nouveaux venus (investissements énormes, brevets, réglementations).' },
  ].map(d => ({...d, chapter:'CH2', chapterName:'Système productif'}));

  const ch3raw = getCH3Defs();
  const ch3 = ch3raw.map(d => ({...d, chapter:'CH3', chapterName:'Relations d\'interdépendance'}));

  return [...ch11, ...ch12, ...ch13, ...ch2, ...ch3];
}

let allDefsChFilter = 'all';

function renderAllDefinitions() {
  const allDefs = getAllDefs();
  const chapters = [...new Set(allDefs.map(d => d.chapter))];
  const filtersEl = document.getElementById('all-defs-chapter-filters');
  filtersEl.innerHTML = `<button class="fpill active" onclick="setAllDefsChFilter('all',this)">Tous (${allDefs.length})</button>` +
    chapters.map(ch => {
      const count = allDefs.filter(d => d.chapter === ch).length;
      return `<button class="fpill" onclick="setAllDefsChFilter('${ch}',this)">${ch} (${count})</button>`;
    }).join('');
  document.getElementById('all-defs-total').textContent = allDefs.length + ' définitions';
  document.getElementById('all-defs-search').value = '';
  allDefsChFilter = 'all';
  renderFilteredAllDefs();
}

function setAllDefsChFilter(ch, btn) {
  allDefsChFilter = ch;
  document.querySelectorAll('#all-defs-chapter-filters .fpill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderFilteredAllDefs();
}

function filterAllDefs() { renderFilteredAllDefs(); }

function renderFilteredAllDefs() {
  const allDefs = getAllDefs();
  const search = (document.getElementById('all-defs-search')?.value || '').toLowerCase();
  const list = document.getElementById('all-defs-list');
  const countEl = document.getElementById('all-defs-count');
  let visible = 0;
  list.innerHTML = allDefs.map((d, i) => {
    const matchCh = allDefsChFilter === 'all' || d.chapter === allDefsChFilter;
    const matchSearch = !search || d.term.toLowerCase().includes(search) || d.def.toLowerCase().includes(search) || (d.exemple && d.exemple.toLowerCase().includes(search)) || (d.formula && d.formula.toLowerCase().includes(search));
    const show = matchCh && matchSearch;
    if (show) visible++;
    return `<div class="def-item${show ? '' : ' hidden'}" id="def-all-${i}">
      <div class="def-header" onclick="toggleDef('def-all-${i}')">
        <span class="def-tag" style="background:${d.color}22;color:${d.color}">${d.tag}</span>
        <span class="def-term">${d.term}</span>
        <span class="def-ch-badge">${d.chapter}</span>
        <span class="def-chevron">▼</span>
      </div>
      <div class="def-body">
        <p>${d.def}</p>
        ${d.formula ? `<div class="def-formula">📐 ${d.formula}</div>` : ''}
        ${d.exemple ? `<div class="def-exemple">💡 ${d.exemple}</div>` : ''}
        <div class="def-source">📘 ${d.chapter} — ${d.chapterName}</div>
      </div>
    </div>`;
  }).join('');
  countEl.textContent = `${visible} notion${visible > 1 ? 's' : ''} affichée${visible > 1 ? 's' : ''}`;
}
