import type { DataReport } from './reports'

export const fintech35TrillionReportFr: DataReport = {
  slug: 'fintech-35-trillion-daily',
  title:
    'Le monde traite plus de 35 000 milliards de dollars de transactions par jour, et la fintech en assure plus de 10 %, contre moins de 1 % il y a dix ans',
  seoTitle:
    'La fintech traite plus de 10 % des 35 000 Md$ de transactions quotidiennes mondiales | Relay Research',
  seoDescription:
    'Rapport phare Relay Research : le volume de transactions mondiales dépasse 35 000 milliards de dollars par jour. La fintech en traite désormais plus de 10 %, contre moins de 1 % il y a dix ans. Analyses sur les portefeuilles numériques, les paiements instantanés, les remises et les rails aux États-Unis, en Europe, en Afrique, en Amérique latine et en Asie.',
  dek: 'Les volumes de transactions financières et de marché mondiaux dépassent 35 000 milliards de dollars chaque jour. La fintech capture désormais plus de 10 % de ce flux, contre moins de 1 % il y a dix ans. Ce rapport cartographie où l’argent circule, qui le traite, et ce qui se construit ensuite.',
  kicker: 'Relay Research · Rapport phare',
  excerpt:
    'Le monde traite plus de 35 000 milliards de dollars de transactions par jour. La fintech en assure désormais plus de 10 %, contre moins de 1 % il y a dix ans.',
  category: 'Market maps',
  market: 'Global',
  publishedAt: '2026-08-11',
  updatedAt: '2026-08-11',
  readMinutes: 28,
  heroImage: {
    src: '/reports/fintech-volume-hero.png',
    alt: 'Interfaces fintech et tickers de marché en direct dans un quartier financier moderne au crépuscule',
    caption:
      'Les interfaces grand public et l’infrastructure de marché de gros convergent : la même pile qui règle un paiement de rue concurrence désormais la valeur transfrontalière.',
  },
  heroStat: {
    label: 'Part de la fintech dans le flux quotidien',
    value: 'Plus de 10 %',
    delta: 'Contre moins de 1 % il y a dix ans',
    tone: 'up',
  },
  metrics: [
    {
      label: 'Flux mondial quotidien',
      value: '$35T+',
      delta: 'Paiements + marchés',
      tone: 'flat',
    },
    {
      label: 'Volume de change (BRI)',
      value: '$7.5T',
      delta: 'Par jour',
      tone: 'flat',
    },
    {
      label: 'Part portefeuilles e-commerce',
      value: '54%',
      delta: '2026',
      tone: 'up',
    },
    {
      label: 'Croissance des paiements instantanés',
      value: '470%',
      delta: '2021 à 2026',
      tone: 'up',
    },
  ],
  cta: {
    title: 'Transformez cette carte en décisions pour vos marchés',
    lede: 'Ce rapport offre une vue systémique mondiale. Si vous vous développez dans les portefeuilles, les rails instantanés, les remises ou les corridors de change, Relay vous aide à traduire cette mutation en listes de partenaires, en réalité des frais et en introductions, marché par marché.',
    label: 'Contacter les ventes',
    href: 'https://calendly.com/gratebridgelabs/30min?month=2026-08',
  },
  keyTakeaways: [
    'La fintech traite plus de 10 % d’un empilement quotidien de plus de 35 000 Md$ couvrant le change, les dérivés, les paiements de détail et les transferts institutionnels, contre moins de 1 % il y a dix ans.',
    'L’Asie, l’Amérique latine et l’Afrique ont déployé des rails mobile first avec moins de verrouillage de l’ère carte. L’Amérique du Nord conserve une valeur disproportionnée via les cartes et le dollar ; elle accuse un retard sur la vélocité.',
    'Les rails instantanés publics plus les applications fintech (Pix, UPI, mobile money) forment le modèle qui monte en échelle. Les cartes devraient avoisiner 15 % des transactions numériques d’ici 2028.',
    'Le prize constructible est l’infrastructure : trésorerie B2B, règlement stablecoin, plomberie de conformité et intelligence des flux de paiement, plus qu’un nouveau portefeuille grand public.',
  ],
  overview:
    'Les volumes de transactions financières et de marché mondiaux dépassent 35 000 milliards de dollars chaque jour. Ce n’est pas un seul réseau de détail : ce sont le change, les dérivés, les paiements consommateurs, les transferts B2B et les rails crypto qui circulent dans la même fenêtre de 24 heures. La fintech traite désormais plus de 10 % de ce flux, contre moins de 1 % il y a dix ans. La plupart des entreprises qui déplacent ce volume n’existaient pas il y a quinze ans. Ce rapport cartographie où se situent les 35 000 Md$, quelles catégories la fintech gagne, comment les régions divergent, et où l’infrastructure se construit ensuite.',
  background:
    'Ce rapport phare est volontairement large. Les opérateurs qui ouvrent des corridors demandent encore si la fintech « disrupte » la finance ou si elle en est déjà la couche opérationnelle. Les données indiquent la seconde option, de façon inégale selon la région et le rail. Nous nous appuyons sur la BRI, Capgemini, NPCI, Banco Central do Brasil, les moniteurs de remises de la Banque mondiale et la recherche de marché. Lorsqu’un chiffre est directionnel ou sensible à la définition, nous le signalons.',
  findings: [
    {
      title: 'La fintech traite désormais plus d’un dixième du flux quotidien mondial',
      body: 'Il y a dix ans, les plateformes de paiement et de marché non bancaires représentaient moins de 1 % de l’empilement quotidien combiné de plus de 35 000 Md$. Cette part dépasse désormais 10 %. Le volume traité chaque jour via ces rails dépasse les systèmes de paiement domestiques de la plupart des pays.',
      stat: {
        value: 'Plus de 10 %',
        label: 'Part de la fintech dans le flux quotidien',
        compare: 'Contre moins de 1 % il y a dix ans',
      },
      compareStats: [
        { value: '$35T+', label: 'Empilement mondial quotidien' },
        { value: '10×', label: 'Hausse de la part' },
      ],
      whyItMatters:
        'Traiter la fintech comme un canal secondaire sous-estime qui règle déjà le client.',
    },
    {
      title: 'Les portefeuilles sont la norme du commerce numérique ; les cartes ne le sont plus',
      body: 'Les portefeuilles représentent environ 54 % de la valeur du e-commerce mondial en 2026. Les prévisions du secteur placent la part des cartes dans les transactions numériques près de 15 % d’ici 2028, contre environ 21 % en 2023.',
      stat: {
        value: '54%',
        label: 'Part des portefeuilles dans la valeur e-commerce',
        compare: '2026',
      },
      compareStats: [
        { value: '~21%', label: 'Cartes, 2023' },
        { value: '~15%', label: 'Cartes, 2028e' },
      ],
      whyItMatters:
        'Les modèles d’acquisition, de fraude et de trésorerie bâtis uniquement sur l’économie des schémas se trompent là où le compte à compte et les portefeuilles dominent déjà le checkout.',
    },
    {
      title: 'La valeur des paiements instantanés a presque quintuplé en cinq ans',
      body: 'Les rails en temps réel sont projetés près de 27 700 Md$ en 2026, contre environ 4 800 Md$ en 2021. Pix et UPI illustrent le modèle : un tissu de règlement public, des interfaces fintech privées, et une adoption mesurée en années, pas en décennies.',
      stat: {
        value: '$27.7T',
        label: 'Paiements instantanés, 2026e',
        compare: 'Depuis 4 800 Md$ en 2021 (~470 %)',
      },
      compareStats: [
        { value: 'Pix', label: 'Rail de masse Brésil' },
        { value: 'UPI', label: 'Rail de masse Inde' },
      ],
      whyItMatters:
        'Le float du week-end et les virements multi-jours cessent de ressembler à des produits dès que le crédit arrive en quelques secondes.',
    },
    {
      title: 'Le modèle de croissance vient des marchés émergents',
      body: 'Pix, UPI et le mobile money africain ont monté en échelle sans couche intermédiaire de carte de crédit. Les marchés matures détiennent encore l’essentiel du volume absolu. Les modèles produit qui voyagent s’écrivent à São Paulo, Bangalore, Lagos et Nairobi.',
      stat: {
        value: '15%+',
        label: 'TCAC paiements LatAm et Afrique',
        compare: 'Contre ~2–5 % sur les marchés matures',
      },
      compareStats: [
        { value: '2–5%', label: 'TCAC marchés matures' },
        { value: 'ME', label: 'Source du modèle' },
      ],
      whyItMatters:
        'Les feuilles de route qui exportent l’UX carte de la Silicon Valley vers les corridors à plus forte croissance continueront de manquer l’adéquation.',
    },
    {
      title: 'Les stablecoins sont une fine tranche de l’empilement, et la plus rapide',
      body: 'Les flux crypto et stablecoin sont de l’ordre de 144 Md$ par jour, soit environ 0,4 % de l’empilement de 35 000 Md$. La croissance tourne à deux ou trois fois celle des catégories de paiement traditionnelles, avec la pression la plus claire sur les remises et les corridors transfrontaliers PME.',
      stat: {
        value: '~$144B',
        label: 'Flux quotidien crypto / stablecoin',
        compare: '~0,4 % de l’empilement de 35 000 Md$',
      },
      compareStats: [
        { value: '2–3×', label: 'Vs croissance traditionnelle' },
        { value: 'XB', label: 'Premier point de pression' },
      ],
      whyItMatters:
        'L’économie correspondante sent d’abord la pression sur les jambes retail et PME transfrontalières, pas sur les desks de change de gros.',
    },
  ],
  sections: [
    {
      heading: 'L’empilement de 35 000 milliards : ce qui circule vraiment',
      body: 'Traitez les 35 000 Md$ comme un composite des flux financiers et de marché mondiaux sur une fenêtre de 24 heures, pas comme un seul réseau de type ACH. La composition explique pourquoi la fintech peut détenir les interfaces de détail tandis que les banques dominent encore les desks de change de gros.',
      paragraphs: [
        'Le change reste la plus grande tranche discrète, avec des chiffres de l’enquête triennale de la BRI de l’ordre de 7 500 milliards de dollars par jour. Les dérivés et produits financiers associés ajoutent une couche de gros comparable. Les paiements de détail et consommateurs, les transferts B2B et les rails crypto complètent le reste, avec des structures de frais, des horloges de règlement et des couches réglementaires très différentes.',
        'La part de la fintech se concentre là où l’UX, la distribution mobile et le règlement instantané se renforcent : portefeuilles, compte à compte, remises et rails domestiques en temps réel. Elle est plus fine là où le change de bilan et les dérivés institutionnels exigent encore le crédit bancaire et l’adhésion à la compensation.',
      ],
      table: {
        columns: ['Catégorie', 'Échelle quotidienne (ordre de grandeur)', 'Pression fintech'],
        rows: [
          ['Change', '~$7.5T (BRI)', 'Marges et FX PME d’abord'],
          ['Dérivés et marchés', '~$7–8T', 'Surtout compensation historique'],
          ['Paiements retail et consommateurs', '~$5.5T', 'Élevée : les portefeuilles gagnent'],
          ['Transferts B2B et institutionnels', '~$5T', 'En hausse : outils de trésorerie'],
          ['Crypto et stablecoins', '~$144B (≈0,4 %)', 'Taux de croissance le plus rapide'],
        ],
      },
      caption:
        'Composition d’ordre de grandeur de l’empilement quotidien de plus de 35 000 Md$. Les définitions varient selon les sources ; à lire pour la structure, pas pour une comptabilité précise.',
      pullQuote:
        'La part de la fintech se concentre là où l’UX, la distribution mobile et le règlement instantané se renforcent. Elle est plus fine là où le crédit bancaire et l’adhésion à la compensation fixent encore les règles.',
    },
    {
      heading: 'Paiements de détail : l’ère du portefeuille',
      body: 'La pile carte (glissement, routage de schéma, contrôle émetteur, frais commerçant de 2 à 3 %, règlement T+1 à T+3) perd sa position par défaut dans le commerce numérique.',
      paragraphs: [
        'Les portefeuilles numériques sont la principale méthode e-commerce mondiale, avec environ 54 % de la valeur des transactions en 2026 (contre ~49 % en 2023). En Chine, les plateformes de portefeuille dominantes concentrent encore la grande majorité du volume en ligne. En Inde, UPI est devenu le défaut national : les données NPCI indiquent de l’ordre de 18 milliards de transactions mensuelles début 2025, avec des volumes FY25 proches de 186 milliards de transactions et une croissance en valeur d’environ 30 % en glissement annuel.',
        'Le Pix brésilien, lancé fin 2020, a atteint l’adoption de masse en quatre ans, avec une couverture adulte quasi universelle, une part e-commerce autour de 40 % et en hausse, et des pics d’une journée au-delà de 250 millions de transactions (252,1 millions le 20 décembre 2024). En Asie du Sud-Est, les portefeuilles locaux dépassent régulièrement en volume les schémas de cartes internationaux sur le domestique.',
        'Les prévisions placent le traitement par portefeuille vers 3 100 Md$ d’ici 2027, plusieurs fois la part numérique traditionnelle des cartes, tandis que la part des cartes dans les transactions numériques se comprime vers ~15 % d’ici 2028.',
      ],
      bullets: [
        'Ce qui est déplacé : frais centrés sur les schémas, règlement multi-jours, banques comme gardiens exclusifs',
        'Ce qui remplace : compte à compte instantané, checkout QR et natif app, frais consommateur quasi nuls sur les rails domestiques',
      ],
      bars: [
        { label: 'Portefeuilles 2026', value: 54, display: '54%' },
        { label: 'Cartes 2023', value: 21, display: '21%' },
        { label: 'Cartes 2028e', value: 15, display: '~15%' },
        { label: 'Espèces aujourd’hui', value: 8, display: '~8%' },
      ],
      chartTitle: 'Part des méthodes de paiement numériques / suivies (directionnel)',
      caption:
        'Les parts portefeuille et carte reflètent le mix e-commerce numérique des rapports de paiement du secteur ; la part espèces est le mix transactionnel mondial, en baisse depuis ~46 % il y a dix ans.',
    },
    {
      heading: 'Transfrontalier : remises, spreads et rails stablecoin',
      body: 'Une remise de 200 $ vers l’Afrique subsaharienne coûte encore en moyenne environ 7 à 9 % de frais, près de 3 fois la cible de 3 % de l’ONU. Cet écart est le brief produit des corridors fintech.',
      paragraphs: [
        'Les centres de remise traditionnels et les virements bancaires intègrent l’opacité et le délai dans le produit : des frais de 5 à 7 % et un crédit multi-jours restent courants sur les corridors consommateurs. Les applications fintech et, de plus en plus, le règlement stablecoin compressent cela vers des dollars à un chiffre bas et des minutes.',
        'La valeur des transferts stablecoin se mesure déjà en milliers de milliards par an sur les principaux tokens indexés sur le dollar. La part de l’empilement quotidien complet de 35 000 Md$ reste faible, mais des taux de croissance de 2 à 3 fois les catégories traditionnelles en font la menace la plus claire pour l’économie de la banque correspondante sur les jambes retail et PME transfrontalières.',
        'Les réseaux de cartes s’adaptent en périphérie (cartes liées à la crypto et services d’actifs numériques), ce qui est en soi un signal : les schémas historiques intègrent les rails fintech plutôt que de les ignorer.',
      ],
      image: {
        src: '/reports/fintech-volume-floor.png',
        alt: 'Salle des marchés et murs de données dans un hub financier mondial',
        caption:
          'L’infrastructure de marché de gros concentre encore le change et les dérivés. La pression fintech est la plus forte là où ces desks n’ont jamais bien servi les PME et les corridors de diaspora.',
      },
    },
    {
      heading: 'Paiements en temps réel : le float meurt quand l’argent circule en secondes',
      body: 'La valeur des paiements instantanés est projetée près de 27 700 Md$ d’ici 2026, contre environ 4 800 Md$ en 2021. Ce n’est pas une livraison de fonctionnalité : c’est une réécriture de la physique du fonds de roulement.',
      paragraphs: [
        'Le régime d’open banking européen a forcé les banques à exposer les rails via API, faisant naître une couche de produits fintech sur une infrastructure ouverte par mandat. Les États-Unis ont lancé en 2023 des systèmes temps réel soutenus par l’État comme voie alternative pour factures et paiements gig, encore précoces face à l’échelle UPI/Pix. L’Asie et l’Amérique latine montrent le modèle mature : tissu de règlement public + UX fintech privée.',
        'Quand un paiement B2B d’1 M$ qui arrivait lundi après un envoi le vendredi se règle désormais en secondes, le float du week-end et les grilles de frais de virement cessent d’être un modèle économique et deviennent une taxe sur le client.',
      ],
      bullets: [
        'Ce qui est déplacé : virements T+2, capital piégé le week-end, chaînes correspondantes opaques',
        'Ce qui remplace : crédit en 10 secondes, API ouvertes, frais instantanés domestiques quasi nuls',
      ],
    },
    {
      heading: 'Change et B2B PME : grignoter les marges du desk',
      body: 'Le change traite encore de l’ordre de 7 500 à 9 500 Md$ par jour et reste dominé par les banques parce qu’il est intensif en crédit et en franchise. La fintech gagne les marges : les PME qui n’ont jamais justifié un desk de relation.',
      paragraphs: [
        'Un importateur mid-market confronté à des spreads opaques de 1 à 3 % sur un ticket de payables de 1 M€ est exactement le client que les plateformes FX fintech souscrivent avec des taux mid-market plus un forfait. Un crédit le jour même ou le lendemain remplace les workflows multi-jours du desk.',
        'Ce n’est pas la mort du FX bancaire du jour au lendemain. C’est un glissement permanent de parts sur la longue traîne des paiements d’entreprise, le même schéma que les portefeuilles ont utilisé contre les cartes en retail.',
      ],
    },
    {
      heading: 'Carte de pouvoir régionale : où se situent les 35 000 Md$',
      body: 'Le volume n’est pas réparti uniformément. L’Asie-Pacifique et l’Amérique du Nord traitent ensemble environ trois dollars sur quatre déplacés dans le monde, pour des raisons opposées.',
      paragraphs: [
        'L’Asie-Pacifique mène avec environ 38 % de la part des revenus de transactions de paiement mondiaux et une contribution quotidienne estimée à ~13 000 Md$ à l’empilement de flux : échelle démographique, rails publics et adoption native fintech. La Chine et l’Inde seules redessinent la gravité des paiements de détail ; en Asie du Sud-Est, les portefeuilles locaux battent régulièrement les schémas internationaux sur le volume domestique.',
        'L’Amérique du Nord rivalise avec l’Asie en valeur (~12 000 Md$ quotidiens d’ordre de grandeur) avec un tiers de la population : tickets élevés, rails carte matures (~6 500 Md$ de volume d’achat carte annuel aux États-Unis) et dominance du dollar en change (USD sur ~88 % des opérations FX). La fintech gagne la vélocité ici (portefeuilles, BNPL, A2A ère FedNow) tandis que les cartes détiennent encore le volume brut.',
        'L’Europe (~20 %) est le laboratoire réglementaire : l’open banking type DSP2 force la coopération. Le BNPL atteint déjà près de 9 % du e-commerce européen contre ~4 % mondialement. L’Amérique latine (~7 %) et l’Afrique et Moyen-Orient (~6 %) sont plus petites aujourd’hui mais affichent une croissance de 15 %+ , et c’est là que la fintech est l’infrastructure par défaut, pas une catégorie d’app store.',
      ],
      table: {
        columns: ['Région', 'Part du flux', 'Quotidien (ordre de mag.)', 'Croissance', 'Posture fintech'],
        rows: [
          ['Asie-Pacifique', '~38%', '~$13.2T', '10–15 % YoY', 'Native fintech'],
          ['Amérique du Nord', '~35%', '~$12.3T', '3–5 % YoY', 'Défense des incumbents'],
          ['Europe', '~20%', '~$7T', '2–4 % YoY', 'API ouvertes réglementées'],
          ['Amérique latine', '~7%', '~$2.5T', '15–20 % TCAC', 'Leapfrog / modèle Pix'],
          ['Afrique et MEA', '~6%', '~$2.1T', '~15 % TCAC', 'Fondation mobile money'],
        ],
      },
      caption:
        'Les parts régionales mêlent revenus de paiement et estimations de flux issus du reporting sectoriel et des banques centrales. À lire en comparatif ; les chiffres quotidiens absolus sont des estimations compositionnelles autour du cadre de 35 000 Md$.',
      pullQuote:
        'Là où les banques ont bâti les rails, la fintech doit rivaliser. Là où les rails n’existaient pas, la fintech les a construits, et elle domine.',
    },
    {
      heading: 'Dossiers : UPI, Pix et mobile money',
      body: 'Trois systèmes illustrent le modèle public–privé gagnant.',
      paragraphs: [
        'Inde: UPI : tissu A2A national avec applications fintech au-dessus. Volumes mensuels dans le haut de la dizaine de milliards de transactions ; FY25 près de 186 Md de transactions avec ~42 % de croissance en volume. Les décomptes quotidiens moyens approchent ~600 millions. UPI n’est pas « une app de portefeuille » : c’est l’UX de règlement national.',
        'Brésil: Pix : de novembre 2020 à 2024, 63,4 Md de transactions et ~4 600 Md$ de valeur en une seule année ; la valeur cumulée depuis le lancement se mesure en dizaines de milliers de milliards de dollars. L’adoption adulte est effectivement saturée ; part e-commerce ~40 % avec une trajectoire vers ~50 %+ d’ici 2027. Record journalier : 252,1 M de transactions (20 déc. 2024).',
        'Afrique: mobile money : des marchés comme le Kenya affichent plus de 90 % de domination du mobile money sur le retail domestique. Les téléphones ont dépassé les agences bancaires ; la fintech a comblé le vide. Les entrées de remises vers l’Afrique dépassent 60 Md$ par an ; la compression des frais de 5–10 % vers moins de 1 % est un transfert multi-milliardaire de surplus vers les ménages.',
      ],
      bars: [
        { label: 'UPI FY25 txns', value: 100, display: '~186B' },
        { label: 'Pix 2024 txns', value: 34, display: '63.4B' },
        { label: 'Pic Pix 20 déc.', value: 14, display: '252M/jour' },
        { label: 'Portefeuilles e-comm', value: 54, display: '54%' },
      ],
      chartTitle: 'Repères d’échelle (indexés pour la lisibilité)',
      caption:
        'Les barres UPI et Pix ne sont pas la même unité que la part portefeuille : le graphique est un tableau d’échelle visuelle pour les magnitudes titres, pas une comparaison sur un seul axe.',
    },
    {
      heading: 'Plongée Asie-Pacifique : native fintech à l’échelle continentale',
      body: 'L’Asie-Pacifique mène avec environ 38 % de la part des revenus de transactions de paiement mondiaux. Près de 38 cents de chaque dollar déplacé mondialement circulent via les marchés et corridors asiatiques : échelle démographique, rails publics et adoption mobile first.',
      paragraphs: [
        'La Chine concentre un volume domestique de portefeuilles énorme : les plateformes dominantes représentent ensemble plus de 90 % du volume de transactions en ligne. Les paiements domestiques dominent ; le transfrontalier croît via les stablecoins et les produits de corridor.',
        'L’UPI indien est l’UX de règlement national : de l’ordre de 13 à 18 milliards de transactions par mois dans les impressions récentes, avec FY25 près de 186 milliards de transactions. La portée rurale compte : les banques deviennent l’infrastructure de back-end, pas le seul gardien.',
        'Le Japon reste l’exception en Asie : les cartes de crédit représentent encore environ 55 % des paiements en ligne, même si les portefeuilles progressent. Singapour pèse au-delà de sa taille comme hub financier régional pour la finance transfrontalière, le forex et les flux institutionnels. En Asie du Sud-Est (Philippines, Indonésie, Thaïlande, Vietnam), les portefeuilles locaux portent souvent plus de volume domestique que les schémas de cartes internationaux.',
        'La fintech n’a pas seulement disrupté la banque dans une grande partie de l’Asie : elle a remplacé la couche carte manquante. C’est pourquoi la région a plusieurs années d’avance sur les rails retail en temps réel.',
      ],
      table: {
        columns: ['Marché', 'Rôle dans l’empilement', 'Posture fintech'],
        rows: [
          ['Chine', 'Échelle domestique native portefeuille', 'Concentration de plateformes'],
          ['Inde', 'Tissu A2A national UPI', 'Rail public + apps'],
          ['Japon', 'Mix en ligne centré carte', 'Portefeuilles qui rattrapent'],
          ['Singapour', 'Hub financier régional', 'Transfrontalier / FX'],
          ['Asie du Sud-Est', 'Populations mobile first', 'Portefeuilles locaux en tête'],
        ],
      },
    },
    {
      heading: 'Plongée Amérique du Nord : forte en valeur, contestée en vélocité',
      body: 'L’Amérique du Nord traite environ un tiers du flux mondial malgré une fraction de la population asiatique : tickets élevés, rails carte matures et centralité du dollar en change.',
      paragraphs: [
        'Les États-Unis font encore tourner un volume d’achat carte énorme (de l’ordre de 6 500 Md$ par an) et ancrent le FX parce que le dollar apparaît dans la grande majorité des opérations de change. Les portefeuilles numériques croissent en e-commerce mais restent derrière le mix mondial portefeuille first. La fintech gagne les marges : acceptation petits commerçants, remises, BNPL et rails de paiement temps réel précoces.',
        'Le Canada reflète les habitudes carte des pays à haut revenu avec une part fintech en hausse. Le Mexique siège à la charnière Amérique du Nord / Amérique latine : de vastes entrées de remises depuis la diaspora américaine (dizaines de milliards par an) font de la compression des frais un enjeu macro pour les ménages, pas une histoire de niche produit.',
        'Le modèle nord-américain : les incumbents défendent le volume ; la fintech gagne la vélocité. Les systèmes temps réel lancés en 2023 sont encore précoces face à l’échelle UPI et Pix, mais la direction est fixée.',
      ],
      bullets: [
        'Les cartes détiennent encore le volume d’achat brut aux États-Unis : l’histoire est la part, pas l’extinction',
        'BNPL et portefeuilles croissent plus vite que le mix carte',
        'Le corridor de remises États-Unis–Mexique est un champ de bataille fintech permanent',
      ],
    },
    {
      heading: 'Plongée Europe : la régulation comme distribution',
      body: 'L’Europe commande environ 20 % des paiements mondiaux. Elle n’a pas inventé le rail national le plus rapide, mais l’open banking a forcé les incumbents à être fintech-friendly par la loi.',
      paragraphs: [
        'Les régimes type DSP2 obligent les banques à exposer données et initiation de paiement via API. La fintech construit prêt, comptabilité et fonctions de paiement sur des rails ouverts par mandat. Le buy-now-pay-later représente déjà environ 9 % du e-commerce européen, soit à peu près le double de la moyenne mondiale.',
        'L’Allemagne concentre le poids des paiements B2B industriels. Le Royaume-Uni reste un centre financier mondial pour le forex et le trading institutionnel. La France et les pays nordiques montrent des habitudes de paiement numérique avancées ; les marchés nordiques en particulier se comportent comme des laboratoires quasi sans espèces.',
        'L’avantage européen est la disruption coopérative : la fintech gagne en travaillant avec la régulation, pas seulement autour. Les mandats de paiement instantané continuent de comprimer les délais de règlement dans la région.',
      ],
    },
    {
      heading: 'Plongée Amérique latine : le modèle leapfrog',
      body: 'L’Amérique latine est plus petite en part absolue aujourd’hui et parmi les régions à plus forte croissance, environ 15–20 % de TCAC. C’est là que le futur système d’exploitation de la fintech s’écrit en public.',
      paragraphs: [
        'Le Pix brésilien est l’architecture de référence : paiements instantanés soutenus par l’État, ouverts aux banques et à la fintech, frais consommateur quasi nuls, adoption de masse en quatre ans. Part e-commerce autour de 40 % avec une trajectoire vers environ 51 % d’ici 2027 ; pics d’une journée au-delà de 250 millions de transactions.',
        'Le Mexique combine croissance retail et gravité des remises. La Colombie et le Chili construisent ou adoptent des rails temps réel sur une logique similaire. L’Argentine montre la voie couverture inflation : des stablecoins utilisés comme monnaie fonctionnelle quand la volatilité de la devise locale s’emballe.',
        'Pourquoi cela fonctionne : faible incumbency carte, rails publics, portée smartphone et UX fintech au-dessus. L’Amérique latine ne copie pas le checkout carte de la Silicon Valley : elle exporte le modèle Pix.',
      ],
      table: {
        columns: ['Marché', 'Signal', 'Implication'],
        rows: [
          ['Brésil', 'Adoption de masse Pix', 'Les cartes perdent le statut par défaut'],
          ['Mexique', 'Remises + e-comm', 'Coin fintech de corridor'],
          ['Colombie / Chili', 'Déploiement RTP', 'Suivre le modèle Pix'],
          ['Argentine', 'Usage couverture stablecoin', 'Crypto comme utilité, pas comme hype'],
        ],
      },
    },
    {
      heading: 'Plongée Afrique et Moyen-Orient : la fintech comme fondation',
      body: 'L’Afrique et le Moyen-Orient représentent une part plus petite du flux mondial aujourd’hui et figurent parmi les croissances les plus rapides (environ 15 % de TCAC). Ici, la fintech n’est pas une surcouche optionnelle : c’est la façon dont les gens sont payés.',
      paragraphs: [
        'De vastes populations non bancarisées rencontrent une forte pénétration mobile. Les opérateurs de mobile money kenyans dominent encore le retail domestique avec des parts de marché au-dessus de 90 % sur les cas d’usage centraux. Le Nigeria combine une grande population, une demande de remises et un usage crypto/stablecoin comme couverture contre la volatilité monétaire ; Lagos est devenu un hub fintech continental.',
        'La base bancaire plus développée d’Afrique du Sud saute encore vers la distribution fintech. L’échelle de l’Égypte et la poussée gouvernementale vers les paiements numériques comptent pour l’Afrique du Nord. Les EAU concentrent une activité internationale et forex à fort revenu par habitant, avec un positionnement relativement crypto-friendly.',
        'Les initiatives de paiement panafricaines visent un règlement instantané en devises locales au-delà des frontières. Les entrées de remises vers l’Afrique dépassent 60 Md$ par an ; ramener les frais historiques de 5–10 % vers moins de 1 % est l’un des résultats fintech au plus fort ROI sur terre.',
      ],
      bullets: [
        'Le mobile money a prouvé le modèle avant que « fintech » soit une catégorie',
        'Remises et couvertures de change alimentent l’utilité des stablecoins',
        'Croissance greenfield : chaque nouvel utilisateur de smartphone est un utilisateur potentiel de rail',
      ],
    },
    {
      heading: 'Ce que l’héritage perd ensuite',
      body: 'Cartes, espèces, guichets de remise et chaînes correspondantes lentes sont tous du mauvais côté du délai de règlement et de la transparence des frais.',
      paragraphs: [
        'Les espèces sont déjà passées d’environ 46 % des transactions mondiales il y a dix ans à ~8 % aujourd’hui. Les guichets de remise font face à une compression des frais de 10× et des gains de vitesse de 100× via des corridors natifs app. Les réseaux banque à banque traditionnels déplacent encore des milliers de milliards au niveau institutionnel, mais perdent le benchmark vitesse/coût face aux alternatives stablecoin et A2A instantané sur les corridors qui comptent pour les PME et la diaspora.',
        'Les incumbents ne disparaissent pas. Les réseaux de cartes commandent encore d’énormes valorisations et du processing hors Chine. Ils perdent des parts et sont contraints d’intégrer des capacités fintech.',
      ],
      bullets: [
        'Cartes : compression de part vers ~15 % du numérique d’ici 2028',
        'Espèces : déclin structurel sauf poches de préférence espèces sur marchés émergents',
        'Centres de remise : écart de frais et de vitesse trop grand pour être défendu',
        'Banque correspondante : multi-hop 100–500 $ sur plusieurs jours, remplacé par du point à point en secondes',
      ],
    },
    {
      heading: '2027–2030 : sept mutations à souscrire',
      body: 'La seconde moitié de la décennie porte sur un tissu de règlement qui devient invisible, et des banques qui deviennent une infrastructure commoditisée.',
      paragraphs: [
        '1. Les stablecoins comme règlement transfrontalier par défaut pour davantage de corridors business : les pilotes MNBC continuent (des dizaines de pays), mais les rails USD privés règlent déjà à l’échelle de production.',
        '2. Les paiements instantanés deviennent un prérequis sur tous les marchés développés ; les marchés émergents suivent le modèle brésilien.',
        '3. Les mandats d’open banking / open finance se diffusent ; la fintech empile prêt, comptabilité, assurance et KYC sur les données bancaires.',
        '4. Les marchés émergents continuent d’exporter des modèles de conception de paiement vers les marchés développés, et non l’inverse.',
        '5. La souscription par flux de paiement remplace les dossiers de crédit statiques ; le BNPL est déjà passé de ~179 Md$ (2022) vers 450 Md$+ d’ici 2026.',
        '6. La crypto devient une plomberie ennuyeuse : la spéculation reste le théâtre retail ; l’usage infrastructurel devient institutionnel.',
        '7. Les chaînes correspondantes se raccourcissent vers du stablecoin point à point ou de l’A2A instantané : effondrement des frais et de la latence.',
      ],
      pullQuote:
        'La fintech ne disrupte plus la finance. La fintech est la finance, inégalement distribuée.',
    },
    {
      heading: 'Opportunités pour les builders : où va la fintech ensuite',
      body: 'La fintech a gagné les paiements consommateurs. L’espace blanc est l’infrastructure, l’intelligence et le milieu mal servi, exactement là où Relay se concentre.',
      paragraphs: [
        '1. Le milieu mal servi: infrastructure des marchés émergents : plus de 2 milliards de personnes ont un téléphone mais une bancarisation incomplète. Les plateformes de portefeuille existent ; l’UX localisée (faible bande passante, offline first, multilingue) reste fine.',
        '2. Paiements B2B et trésorerie d’entreprise : le FX, les payables internationaux et la paie restent inefficaces pour les PME. Le P2P retail a été résolu en premier ; le B2B est encore fragmenté.',
        '3. Conformité plus fintech : chaque nouveau rail multiplie la demande KYC, LBC/FT et reporting. L’infrastructure de conformité plug-in pour les fintechs des marchés émergents est un chantier inachevé.',
        '4. Automatisation des paiements temps réel : les rails instantanés existent ; le logiciel PME qui règle automatiquement à réception de facture est la prochaine couche logicielle.',
        '5. Infrastructure stablecoin : la valeur transférée se compose. Les contrôles corporate, le prêt et les outils de trésorerie au-dessus des rails d’émetteurs décideront qui possède la plomberie ennuyeuse.',
        '6. Données et analytics: la couche d’intelligence : les données de flux de paiement comptent parmi les ensembles les plus précieux de l’économie. Agréger coût de corridor, fiabilité et performance des prestataires est la thèse centrale de Relay.',
      ],
      bullets: [
        'Les portefeuilles consommateurs sont saturés : construisez en dessous et à côté',
        'Le transfrontalier et la trésorerie PME restent à frais élevés et à forte friction',
        'L’intelligence sur qui fonctionne vraiment dans un corridor bat un nouveau pitch deck',
      ],
    },
  ],
  marketContext: [
    'L’Asie et l’Amérique du Nord représentent ensemble environ 73 % du flux mondial : l’Asie via la démographie et les rails natifs fintech, l’Amérique du Nord via la taille des tickets et la centralité du dollar. Une stratégie qui ignore l’un des deux côtés se trompera sur le volume et la vélocité.',
    'L’Amérique latine et l’Afrique sont plus petites en part absolue aujourd’hui (environ 13 % combinés) mais croissent à environ 15 % ou plus par an, contre des bas chiffres à un digit sur les marchés matures. D’ici 2030, leur part du flux mondial devrait s’élargir matériellement par la seule croissance.',
    'Les remises restent l’un des coins fintech les plus nets : l’Afrique (plus de 60 Md$ par an) et l’Amérique latine (plus de 150 Md$ y compris les grands corridors États-Unis–Mexique) paient encore des taxes de frais héritées que les rails instantanés et stablecoin peuvent compresser vers moins de 1 %.',
    'Insight clé de la carte régionale : là où les banques ont bâti les rails, la fintech doit rivaliser. Là où les rails n’existaient pas, la fintech les a construits, et elle domine.',
  ],
  providerLandscape: [
    {
      metric: 'Paiements retail domestiques',
      leader: 'Rails instantanés publics et portefeuilles locaux',
      value: 'En tête',
      tone: 'up',
      signal:
        'UPI, Pix, Alipay/WeChat Pay et M-Pesa fixent le défaut de checkout sur leurs marchés d’origine',
      note: 'Tissu de règlement public ; apps privées au-dessus',
    },
    {
      metric: 'Transfrontalier consommateur',
      leader: 'Spécialistes de corridor et rampes stablecoin',
      value: 'En progression',
      tone: 'up',
      signal:
        'Les frais de remise historiques tournent encore à 5–10 % sur de nombreux corridors Afrique et LatAm',
      note: 'La pression porte sur frais et vitesse, pas sur la marque',
    },
    {
      metric: 'Change de gros et dérivés',
      leader: 'Franchises bancaires et compensation centrale',
      value: 'En maintien',
      tone: 'flat',
      signal:
        'Le FX quotidien reste de l’ordre de 7 500 Md$ ; la part fintech est surtout tickets PME et mid-market',
      note: 'Les barrières de bilan et d’adhésion restent élevées',
    },
    {
      metric: 'Réseaux de cartes',
      leader: 'Schémas mondiaux',
      value: 'Perte de parts',
      tone: 'down',
      signal:
        'Les cartes sont prévues près de ~15 % des transactions numériques d’ici 2028, contre ~21 % en 2023',
      note: 'Intégration de portefeuilles et de produits liés à la crypto en périphérie',
    },
  ],
  implications: [
    'En Asie, LatAm et Afrique, concevez d’abord pour le checkout compte à compte et portefeuille. Les cartes sont le repli.',
    'Prixez le coût total du règlement (frais, change, délai et échec), pas seulement le MDR affiché. Les rails instantanés changent la mathématique du fonds de roulement.',
    'Traitez les stablecoins comme une option de trésorerie et de corridor pour le B2B transfrontalier, pas comme une parenthèse spéculative.',
    'Livrez conformité et couches de données comme des produits : chaque nouveau rail multiplie la demande KYC/LBC-FT et analytics.',
    'Surveillez les systèmes instantanés publics à la fois comme risque de plateforme et comme opportunité de distribution. Les parts peuvent bouger en quelques mois.',
    'Shortlistez les prestataires selon la réalité du corridor (couverture, rails, frais, fiabilité), pas selon le récit du pitch deck.',
  ],
  closing:
    'Les portefeuilles devraient atteindre environ 61 % des transactions numériques d’ici 2028. Les rails instantanés continuent de se composer. Les marchés émergents exportent le playbook. La fintech détient déjà une grande part de l’interface consommateur. Le prochain concours porte sur l’infrastructure, l’intelligence et l’efficacité B2B, face à un flux quotidien de 35 000 milliards de dollars qui n’attend pas les règlements lents.',
  methodology:
    'Ce rapport phare synthétise des chiffres publiés par les banques centrales et la recherche sectorielle dans un cadre comparatif unique. Le chiffre quotidien de 35 000 Md$ est un composite des flux de transactions financières et de marché mondiaux (change, dérivés, paiements, transferts et crypto), pas le débit d’un seul opérateur. Les allocations quotidiennes régionales sont des estimations compositionnelles pour la comparaison structurelle. Les statistiques UPI et Pix privilégient les publications NPCI et Banco Central do Brasil ; les benchmarks de frais de remise suivent les moniteurs de corridor de type Banque mondiale ; les niveaux de change référencent les publications de l’enquête triennale de la BRI. Lorsque les prévisions (part portefeuille, totaux de paiements instantanés, mix carte 2028) proviennent de rapports de paiement sectoriels, elles sont étiquetées comme directionnelles. Relay ne fournit pas de conseil financier, juridique ou d’investissement.',
  sources: [
    'Enquête triennale des banques centrales de la BRI (volume de change)',
    'Capgemini World Payments Report',
    'Statistiques mensuelles / annuelles UPI du NPCI',
    'Banco Central do Brasil: statistiques Pix',
    'Moniteurs de prix des remises de la Banque mondiale',
    'Matériels publics Federal Reserve / FedNow',
    'Reporting BCE / SEPA Instant',
    'Recherche de paiement sectorielle (Mordor, Grand View et apparentés)',
    'Dépôts d’entreprises et synthèses d’analytics blockchain pour la valeur des transferts stablecoin',
  ],
}
