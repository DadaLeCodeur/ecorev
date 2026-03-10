// ════════════════════════════════════════════════════════
// DATA — CHAPTERS, THEMES, ECONOMISTS
// ════════════════════════════════════════════════════════

const CHAPTERS = [
  {
    id: 'ch1-1',
    num: 'CH1-1',
    title: 'Les ressources mobilisées pour produire',
    subtitle: 'Rareté · Biens & Services · Facteurs de production · Progrès technique',
    themes: ['micro','macro'],
    pills: ['Rareté','Facteurs de prod.','Progrès tech.'],
    totalQuestions: 30,
    totalDefs: 20,
  },
  {
    id: 'ch1-2',
    num: 'CH1-2',
    title: 'Allocation des ressources et choix économiques',
    subtitle: 'Besoins · Coût d\'opportunité · Raisonnement marginal · Valeur',
    themes: ['micro'],
    pills: ['Allocation','Coût d\'opportunité','Marginalisme'],
    totalQuestions: 25,
    totalDefs: 15,
  },
  {
    id: 'ch1-3',
    num: 'CH1-3',
    title: 'Mesure de la richesse et comparaisons internationales',
    subtitle: 'PIB · Croissance · Indicateurs alternatifs · Bien-être',
    themes: ['macro'],
    pills: ['PIB','Croissance','IDH'],
    totalQuestions: 25,
    totalDefs: 15,
  },
  {
    id: 'ch2',
    num: 'CH2',
    title: 'Transformations contemporaines du système productif',
    subtitle: 'Secteurs · Concentration · Désindustrialisation · Numérique · Mondialisation',
    themes: ['micro','macro'],
    pills: ['Système productif','Concentration','Tertiarisation'],
    totalQuestions: 30,
    totalDefs: 18,
  },
  {
    id: 'ch3',
    num: 'CH3',
    title: 'Relations d\'interdépendance entre acteurs économiques',
    subtitle: 'Agents économiques · Circuits · Monnaie · Équilibres macro',
    themes: ['macro','monnaie'],
    pills: ['Agents éco.','Monnaie','Équilibres'],
    totalQuestions: 100,
    totalDefs: 40,
  }
];

const THEMES_META = {
  macro:    { label: 'Macroéconomie',       icon: '📊', color: 'var(--a1)', sub: 'Croissance, équilibres, revenus, redistribution' },
  micro:    { label: 'Microéconomie',       icon: '🏭', color: 'var(--a3)', sub: 'Marchés, entreprises, prix, concurrence' },
  monnaie:  { label: 'Monnaie & Finance',   icon: '💰', color: 'var(--a2)', sub: 'Création monétaire, marchés financiers, banques' },
  histoire: { label: 'Économistes', icon: '📖', color: 'var(--a5)', sub: 'Smith, Keynes, Walras, Schumpeter et tous les grands théoriciens' },
};

const ECONOMISTS = [
  {
    name: 'Adam Smith', period: '1723–1790', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', school: 'Classique',
    color: 'var(--a1)',
    ideas: ['Valeur travail : la valeur d\'un bien est déterminée par le travail nécessaire à sa production', 'Main invisible : la poursuite de l\'intérêt privé conduit à l\'optimum collectif via le marché', 'Division du travail : spécialisation → gains de productivité', 'Père du libéralisme économique'],
    chapitres: ['CH1-1', 'CH1-2'],
    wiki: 'https://grokipedia.com/page/Adam_Smith'
  },
  {
    name: 'David Ricardo', period: '1772–1823', flag: '🇬🇧', school: 'Classique',
    color: 'var(--a1)',
    ideas: ['Valeur travail : valeur = quantité de travail incorporé', 'Théorie des avantages comparatifs : chaque pays doit se spécialiser dans ce qu\'il produit relativement mieux', 'Équivalence ricardienne : dette publique = impôt futur', 'Rareté absolue + relative déterminent la valeur'],
    chapitres: ['CH1-1', 'CH1-2'],
    wiki: 'https://grokipedia.com/page/David_Ricardo'
  },
  {
    name: 'Thomas Malthus', period: '1766–1834', flag: '🇬🇧', school: 'Classique',
    color: 'var(--a1)',
    ideas: ['Rendements décroissants de la terre : plus on est nombreux, moins la production par tête est élevée', 'La croissance de la population dépasse celle de la production alimentaire → risque de famine', 'Préconise le contrôle des naissances pour éviter la surpopulation'],
    chapitres: ['CH1-1'],
    wiki: 'https://grokipedia.com/page/Thomas_Malthus'
  },
  {
    name: 'Karl Marx', period: '1818–1883', flag: '🇩🇪', school: 'Marxisme',
    color: 'var(--a4)',
    ideas: ['Valeur travail : la valeur est créée uniquement par le travail humain', 'Plus-value : les capitalistes s\'approprient une partie du travail non payé aux ouvriers', 'Lutte des classes : moteur de l\'histoire', 'Le capitalisme porte en lui les germes de sa propre destruction'],
    chapitres: ['CH1-2'],
    wiki: 'https://grokipedia.com/page/Karl_Marx'
  },
  {
    name: 'Léon Walras', period: '1834–1910', flag: '🇫🇷', school: 'Néoclassique',
    color: 'var(--a2)',
    ideas: ['Révolution marginaliste (1874) : valeur = utilité marginale', 'Théorie de l\'équilibre général : tous les marchés s\'équilibrent simultanément en CPP', '5 conditions de la concurrence pure et parfaite', 'La valeur d\'un bien est fixée par l\'équilibre offre/demande'],
    chapitres: ['CH1-2', 'CH2'],
    wiki: 'https://grokipedia.com/page/Leon_Walras'
  },
  {
    name: 'Stanley Jevons', period: '1835–1882', flag: '🇬🇧', school: 'Néoclassique',
    color: 'var(--a2)',
    ideas: ['Co-fondateur de la révolution marginaliste (1871)', 'Utilité marginale décroissante : plus on consomme, moins chaque unité apporte de satisfaction', 'La valeur dépend de l\'utilité de la dernière unité consommée'],
    chapitres: ['CH1-2'],
    wiki: 'https://grokipedia.com/page/William_Stanley_Jevons'
  },
  {
    name: 'Carl Menger', period: '1840–1921', flag: '🇦🇹', school: 'Néoclassique',
    color: 'var(--a2)',
    ideas: ['Co-fondateur de la révolution marginaliste (1871)', 'École autrichienne d\'économie', 'La valeur subjective est déterminée par l\'utilité marginale', 'Théorie des biens d\'ordre supérieur et inférieur'],
    chapitres: ['CH1-2'],
    wiki: 'https://grokipedia.com/page/Carl_Menger'
  },
  {
    name: 'Vilfredo Pareto', period: '1848–1923', flag: '🇮🇹', school: 'Néoclassique',
    color: 'var(--a2)',
    ideas: ['Optimum de Pareto : situation où nul ne peut améliorer son bien-être sans détériorer celui d\'un autre', 'L\'équilibre général en CPP est un optimum de Pareto', 'Loi de Pareto (80/20) : 20% des individus détiennent 80% des richesses'],
    chapitres: ['CH1-3'],
    wiki: 'https://grokipedia.com/page/Vilfredo_Pareto'
  },
  {
    name: 'Arthur Cecil Pigou', period: '1877–1959', flag: '🇬🇧', school: 'Néoclassique',
    color: 'var(--a2)',
    ideas: ['Économie du bien-être : l\'individu est seul juge de son bien-être', 'Utilité marginale décroissante de la richesse : transférer des riches vers les pauvres ↑ bien-être global', 'Taxe pigouvienne : taxer les externalités négatives pour les internaliser', 'Intervention de l\'État justifiée si elle améliore le bien-être général'],
    chapitres: ['CH1-1', 'CH1-3'],
    wiki: 'https://grokipedia.com/page/Arthur_Cecil_Pigou'
  },
  {
    name: 'John Maynard Keynes', period: '1883–1946', flag: '🇬🇧', school: 'Keynésien',
    color: 'var(--a5)',
    ideas: ['La consommation dépend du revenu disponible actuel (propension marginale à consommer PMC)', 'Épargne = résidu de la consommation', 'Égalité S=I ex post via le multiplicateur keynésien', 'Intervention de l\'État pour relancer la demande en période de récession', 'Capitalisme peut créer l\'abondance mais la course au profit l\'en empêche'],
    chapitres: ['CH1-1', 'CH3'],
    wiki: 'https://grokipedia.com/page/John_Maynard_Keynes'
  },
  {
    name: 'Joseph Schumpeter', period: '1883–1950', flag: '🇦🇹', school: 'Évolutionniste',
    color: 'var(--a3)',
    ideas: ['Destruction créatrice : les innovations détruisent les activités obsolètes et créent de nouvelles', 'L\'entrepreneur innovateur est le moteur du capitalisme dynamique', '5 types d\'innovations : produit, procédé, marché, matière première, organisation', 'Les cycles économiques sont liés aux vagues d\'innovations (cycles Kondratiev)'],
    chapitres: ['CH1-1'],
    wiki: 'https://grokipedia.com/page/Joseph_Schumpeter'
  },
  {
    name: 'Simon Kuznets', period: '1901–1985', flag: '🇺🇸', school: 'Institutionnaliste',
    color: 'var(--a3)',
    ideas: ['Père des comptes nationaux et inventeur du PIB (1934)', 'Prix Nobel d\'économie 1971', 'Courbe de Kuznets : les inégalités augmentent puis diminuent avec le développement économique (U inversé)', 'PIB mondialisé après Bretton Woods pour les comparaisons internationales'],
    chapitres: ['CH1-3'],
    wiki: 'https://grokipedia.com/page/Simon_Kuznets'
  },
  {
    name: 'Paul Samuelson', period: '1915–2009', flag: '🇺🇸', school: 'Néoclassique',
    color: 'var(--a2)',
    ideas: ['Définit le bien collectif (1954) par deux critères : non-exclusion et non-rivalité', 'Synthèse néoclassique : intégration de Keynes dans le cadre néoclassique', 'Premier américain Prix Nobel d\'économie (1970)', 'Manuel "Economics" : le plus vendu dans le monde'],
    chapitres: ['CH1-1'],
    wiki: 'https://grokipedia.com/page/Paul_Samuelson'
  },
  {
    name: 'Milton Friedman', period: '1912–2006', flag: '🇺🇸', school: 'Monétariste',
    color: 'var(--a6)',
    ideas: ['Théorie du revenu permanent : la consommation dépend du revenu futur anticipé, pas du revenu courant', 'La politique monétaire est plus efficace que la politique budgétaire', 'Règle des k% : la masse monétaire doit croître à un taux fixe', 'Chef de file de l\'École de Chicago'],
    chapitres: ['CH3'],
    wiki: 'https://grokipedia.com/page/Milton_Friedman'
  },
  {
    name: 'Franco Modigliani', period: '1918–2003', flag: '🇮🇹', school: 'Keynésien',
    color: 'var(--a5)',
    ideas: ['Théorie du cycle de vie : on emprunte jeune, épargne à l\'âge actif, désépargne à la retraite', 'L\'épargne est influencée par les anticipations de revenu futur et la richesse accumulée', 'Prix Nobel d\'économie 1985'],
    chapitres: ['CH3'],
    wiki: 'https://grokipedia.com/page/Franco_Modigliani'
  },
  {
    name: 'James Duesenberry', period: '1918–2009', flag: '🇺🇸', school: 'Institutionnaliste',
    color: 'var(--a3)',
    ideas: ['Consommation ostentatoire : les ménages cherchent à imiter les modes de consommation des classes supérieures ("keeping up with the Joneses")', 'Effet de cliquet : les habitudes de consommation baissent lentement car difficile de réduire son niveau de vie', 'La consommation est relative au groupe social de référence'],
    chapitres: ['CH3'],
    wiki: 'https://fr.wikipedia.org/wiki/James_Duesenberry'
  },
  {
    name: 'Richard Musgrave', period: '1910–2007', flag: '🇩🇪', school: 'Économie publique',
    color: 'var(--a4)',
    ideas: ['3 fonctions de l\'État : Allocation (production de biens collectifs), Redistribution (réduire les inégalités), Régulation (stabilisation de l\'économie)', 'Théorie des finances publiques', 'L\'État doit intervenir là où le marché échoue'],
    chapitres: ['CH3'],
    wiki: 'https://fr.wikipedia.org/wiki/Richard_Musgrave'
  },
  {
    name: 'Arthur Laffer', period: '1940–', flag: '🇺🇸', school: 'Offre',
    color: 'var(--a4)',
    ideas: ['Courbe de Laffer : "Trop d\'impôts tue l\'impôt"', 'Au-delà d\'un certain taux d\'imposition, les recettes fiscales diminuent car l\'activité économique se réduit', 'Favorable à la baisse des impôts pour stimuler l\'offre (économie du ruissellement)', 'Théoricien de l\'économie de l\'offre (supply-side economics)'],
    chapitres: ['CH3'],
    wiki: 'https://grokipedia.com/page/Arthur_Laffer'
  },
  {
    name: 'Ernst Engel', period: '1821–1896', flag: '🇩🇪', school: 'Statisticien',
    color: 'var(--a3)',
    ideas: ['Loi d\'Engel : plus le revenu d\'un ménage augmente, plus la part consacrée à l\'alimentation dans son budget diminue', 'Les dépenses alimentaires sont un indicateur de richesse relative', 'Fondateur de la statistique des ménages'],
    chapitres: ['CH3'],
    wiki: 'https://grokipedia.com/page/Ernst_Engel'
  },
  {
    name: 'François Quesnay', period: '1694–1774', flag: '🇫🇷', school: 'Physiocrate',
    color: 'var(--a1)',
    ideas: ['Tableau économique (1758) : premier circuit économique de l\'histoire', 'Seule l\'agriculture crée de la richesse (physiocratie)', 'Précurseur de la comptabilité nationale', 'La richesse circule entre les classes sociales comme le sang dans le corps'],
    chapitres: ['CH3'],
    wiki: 'https://fr.wikipedia.org/wiki/Fran%C3%A7ois_Quesnay'
  },
  {
    name: 'Lionel Robbins', period: '1898–1984', flag: '🇬🇧', school: 'Néoclassique',
    color: 'var(--a2)',
    ideas: ['Définition de l\'économie (1932) : "science qui étudie le comportement humain en tant que relation entre les fins et les moyens rares à usages alternatifs"', 'La rareté est le problème économique fondamental', 'Défenseur du libéralisme et de l\'ordre spontané du marché'],
    chapitres: ['CH1-1'],
    wiki: 'https://grokipedia.com/page/Lionel_Robbins'
  },
  {
    name: 'Garrett Hardin', period: '1915–2003', flag: '🇺🇸', school: 'Écologie politique',
    color: 'var(--a3)',
    ideas: ['"Tragédie des biens communs" (1968) : les ressources communes sont surexploitées car chacun a intérêt à maximiser son usage individuel', 'Les biens communs sont rivaux et non exclusifs → risque d\'épuisement', 'Solution : privatisation ou régulation publique'],
    chapitres: ['CH1-1'],
    wiki: 'https://grokipedia.com/page/Garrett_Hardin'
  },
  {
    name: 'Abraham Maslow', period: '1908–1970', flag: '🇺🇸', school: 'Psychologie humaniste',
    color: 'var(--a5)',
    ideas: ['Pyramide des besoins (1943) : hiérarchie en 5 niveaux : physiologiques → sécurité → appartenance → estime → accomplissement', 'On satisfait les besoins inférieurs avant les supérieurs', 'Critiquée : absence de base scientifique, biais occidental, hiérarchie contestable'],
    chapitres: ['CH1-2'],
    wiki: 'https://grokipedia.com/page/Abraham_Maslow'
  },
  {
    name: 'Amartya Sen', period: '1933–', flag: '🇮🇳', school: 'Économie du développement',
    color: 'var(--a3)',
    ideas: ['Créateur de l\'IDH (Indice de Développement Humain) avec le PNUD', 'Approche par les capabilités : le développement = expansion des libertés réelles des individus', 'Prix Nobel d\'économie 1998', 'Le PIB ne suffit pas à mesurer le bien-être : il faut prendre en compte santé, éducation, liberté'],
    chapitres: ['CH1-3'],
    wiki: 'https://grokipedia.com/page/Amartya_Sen'
  },
  {
    name: 'Branko Milanovic', period: '1953–', flag: '🇷🇸', school: 'Économie des inégalités',
    color: 'var(--a4)',
    ideas: ['Courbe de l\'éléphant (2014) : représentation de la redistribution des gains de la mondialisation 1988-2008', 'Gagnants : classes moyennes des pays émergents (Chine, Inde)', 'Perdants : classes moyennes des anciens pays industrialisés (Occident)', 'Remet en cause la courbe de Kuznets au niveau mondial'],
    chapitres: ['CH1-3'],
    wiki: 'https://grokipedia.com/page/Branko_Milanovic'
  },
  {
    name: 'William Nordhaus', period: '1941–', flag: '🇺🇸', school: 'Économie de l\'environnement',
    color: 'var(--a3)',
    ideas: ['Les industries à forte croissance de productivité transfèrent les gains aux consommateurs via des prix plus bas', 'Économie du changement climatique : intégrer les coûts environnementaux dans le calcul économique', 'Prix Nobel d\'économie 2018 (avec Paul Romer)', 'Conclut que les gains de productivité bénéficient principalement aux consommateurs'],
    chapitres: ['CH2'],
    wiki: 'https://grokipedia.com/page/William_Nordhaus'
  },
  {
    name: 'Colin Clark', period: '1905–1989', flag: '🇬🇧', school: 'Institutionnaliste',
    color: 'var(--a3)',
    ideas: ['Classification des activités économiques en 3 secteurs : primaire (agriculture/mines), secondaire (industrie), tertiaire (services)', 'Cette classification est aujourd\'hui la base de toute la comptabilité nationale', 'A mis en évidence la tertiarisation progressive des économies développées'],
    chapitres: ['CH2'],
     wiki: 'https://grokipedia.com/page/Colin_Clark_(economist)'
  },
  {
    name: 'John Stuart Mill', period: '1806–1873', flag: '🇬🇧', school: 'Classique / Utilitarisme',
    color: 'var(--a1)',
    ideas: ['Utilitarisme : le bien-être est la somme des intérêts particuliers', 'Si chaque individu cherche son bien-être, cela conduit à l\'optimum collectif', 'Libéralisme politique et économique', 'Le principe du plus grand bonheur pour le plus grand nombre'],
    chapitres: ['CH1-3'],
    wiki: 'https://grokipedia.com/page/John_Stuart_Mill'
  },
  {
    name: 'Michèle Debonneuil', period: '1951–', flag: '🇫🇷', school: 'Économie contemporaine',
    color: 'var(--a2)',
    ideas: ['Théorisation du secteur quaternaire : services intellectuels à haute valeur ajoutée (numérique, IA, innovation)', 'Le secteur quaternaire conjugue industrie et services : ses produits ne sont ni des biens ni des services mais une combinaison des deux', 'L\'industrie 4.0 est transversale à tous les secteurs'],
    chapitres: ['CH2'],
    wiki: 'https://fr.wikipedia.org/wiki/Mich%C3%A8le_Debonneuil'
  },
];

const ECO_SCHOOLS = ['Tous', 'Classique', 'Néoclassique', 'Keynésien', 'Monétariste', 'Marxisme', 'Institutionnaliste', 'Évolutionniste', 'Économie publique'];

