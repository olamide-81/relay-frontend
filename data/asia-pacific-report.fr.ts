import type { DataReport } from './reports'

/** Analyse Asie Pacifique, version française. Tirets longs exclus du texte. */
export const asiaPacificReportFr: DataReport = {
  slug: 'asia-pacific-payment-rails',
  title: 'Analyse Asie Pacifique: la puissance financière mondiale qui s\'éveille',
  seoTitle: 'Analyse Asie Pacifique: fintech, lacunes et 12 marchés | Relay Research',
  seoDescription: 'Analyse Asie Pacifique: 43T$ de PIB, 13T$ de volume quotidien, rails fintech, lacunes nationales, implantation étrangère, demande publique, culture, et où les opérateurs peuvent encore gagner.',
  seoKeywords: ['analyse Asie Pacifique','puissance fintech Asie','UPI PromptPay PayNow BI FAST QRIS','paiements transfrontaliers PME Asie','hub fintech Singapour Hong Kong','fintech Indonésie Vietnam Philippines','contrôles de capitaux Chine SAFE','finance de chaîne d\'approvisionnement Asie'],
  dek: 'La région Asie Pacifique n\'est pas seulement vaste. Elle est le centre économique du monde. Voici ce que cela signifie opérationnellement en production, fintech, lacunes, implantation et demande.',
  kicker: 'Relay Research · Analyse Asie Pacifique',
  excerpt: 'Une analyse complète de l\'Asie Pacifique couvrant l\'échelle économique, l\'histoire, les acteurs fintech, les lacunes par pays, l\'implantation des entreprises étrangères, les cibles gouvernementales, la culture, et où les opérateurs peuvent encore gagner.',
  category: 'Market maps',
  market: 'Asia-Pacific',
  publishedAt: '2026-08-18',
  updatedAt: '2026-08-18',
  readMinutes: 42,
  heroImage: { src: '/reports/asia-pacific-hero.png', alt: 'Port et skyline de Hong Kong à l\'heure dorée, hub commercial et financier d\'Asie Pacifique', caption: 'Commerce, règlement et densité urbaine dans une région qui traite une part disproportionnée de l\'activité mondiale à travers de nombreux systèmes nationaux.' },
  heroStat: { label: 'Volume quotidien APAC', value: '$13.17T', delta: '43% du stack quotidien mondial', tone: 'up' },
  metrics: [
    { label: 'PIB combiné', value: '$43.12T', delta: '37% du monde', tone: 'flat' },
    { label: 'Population', value: '4.7B', delta: '60% du monde', tone: 'flat' },
    { label: 'Volume quotidien', value: '$13.17T', delta: '43% du mondial', tone: 'up' },
    { label: 'Marché fintech', value: '$167.7B', delta: 'Vers 348B$ d\'ici 2031', tone: 'up' },
  ],
  keyTakeaways: [
    'L\'Asie Pacifique est déjà le centre: 43,12T$ de PIB, 13,17T$ de volume quotidien, 4,7 milliards d\'habitants. Ce sont douze marchés et plus, pas un seul.',
    'Les États ont construit les rails (UPI, PromptPay, PayNow, BI FAST, QRIS, DuitNow). La fintech construit par dessus. La connexion transfrontalière manque encore.',
    'Les modèles éprouvés attirent le capital: super apps, BNPL, banques digitales et finance embarquée e commerce. Le potentiel non prouvé se trouve dans le transfrontalier PME, la finance de chaîne d\'approvisionnement, l\'intégration des rails, la tokenisation et le crédit alternatif.',
    'La Chine est mature en interne et contrainte à l\'outbound. Singapour et Hong Kong restent les hubs les plus propres. L\'Asie du Sud Est et l\'Inde portent la croissance et l\'inclusion.',
  ],
  overview: 'Ce rapport cartographie l\'Asie Pacifique pour les opérateurs: échelle et production, comment la région est devenue le centre, qui joue en fintech, où sont les lacunes par pays, comment les étrangers s\'implantent, ce que veulent les États et les marchés, comment la culture diffère, et ce que cela implique pour les bâtisseurs, les investisseurs et les entreprises.',
  findings: [
    {
      title: 'L\'Asie est le marché, pas une quête secondaire',
      body: 'Un PIB combiné près de 43T$ et un volume quotidien près de 13T$ signifient que les opérateurs qui traitent l\'Asie comme optionnelle sont déjà en retard.',
      stat: { value: '$43.12T', label: 'PIB nominal' },
      compareStats: [{ value: '$13.17T', label: 'Volume quotidien' }],
    },
    {
      title: 'Les États ont construit les rails',
      body: 'UPI, PromptPay, PayNow, BI FAST, QRIS et DuitNow démocratisent l\'infrastructure. Les entreprises concurrencent sur l\'expérience et le crédit, pas sur la propriété du switch.',
      stat: { value: 'Rails publics', label: 'Infrastructure publique' },
      compareStats: [{ value: 'UX fintech', label: 'Construit par dessus' }],
    },
    {
      title: 'Le transfrontalier est la dernière frontière',
      body: 'Les rails instantanés domestiques fonctionnent. Les connecter, non. Les paiements transfrontaliers PME et la finance de chaîne d\'approvisionnement restent cassés à l\'échelle.',
      stat: { value: '$15.8T', label: 'Marché XB PME' },
      compareStats: [{ value: '$415B', label: 'SCF Asie' }],
    },
    {
      title: 'Les modèles éprouvés ont déjà le capital',
      body: 'Super apps, BNPL, banques digitales et crédit e commerce sont financés. Le nouveau capital gagne sur les lacunes non prouvées.',
      stat: { value: 'Classe Grab', label: 'Éprouvé' },
      compareStats: [{ value: 'XB / SCF', label: 'Lacunes ouvertes' }],
    },
  ],
  sections: [
    {
      heading: 'L\'Asie Pacifique est le centre économique du monde',
      body: 'La région Asie Pacifique n\'est pas seulement vaste. Elle est le centre économique du monde. Pourtant, de nombreux opérateurs hors de cette région ne saisissent pas encore pleinement ce que cela signifie opérationnellement.',
      paragraphs: [
        'Le PIB combiné s\'élève à 43,12 billions de dollars nominaux et à 102,71 billions en parité de pouvoir d\'achat. Le volume transactionnel quotidien est de 13,17 billions. Soit 37% du PIB mondial et 43% du volume transactionnel quotidien mondial. Population: 4,7 milliards d\'habitants, 60% du monde.',
        'Si l\'Asie Pacifique était un seul pays, elle serait l\'économie mondiale avec une marge massive. Mais ce n\'est pas un pays. Ce sont douze marchés distincts et plus, chacun avec des réglementations, des infrastructures de paiement et des trajectoires de croissance différentes.',
      ],
      pullQuote: 'Ce n\'est pas une région au potentiel. C\'est une région qui produit déjà à une échelle qui éclipse la plupart des nations développées.',
    },
    {
      heading: 'Où l\'Asie produit',
      body: 'La profondeur de la production dans cette région est stupéfiante.',
      paragraphs: [
        'La Chine produit à elle seule plus de 6 billions de dollars de volume transactionnel quotidien. Elle fabrique environ 28% de tous les biens mondiaux. Semi conducteurs, électronique, textiles, chimie: la Chine est l\'usine du monde. Pourtant, pour toute cette production, l\'innovation fintech n\'a pas égalé l\'échelle.',
        'Le Japon traite 800 milliards de dollars de transactions quotidiennes et abrite le troisième plus grand marché boursier mondial, le Nikkei 225. Il a été pionnier de la manufacture avancée, de la robotique et de l\'excellence automobile.',
        'L\'Inde traite 13 milliards de transactions par mois via UPI seule (Unified Payments Interface). Elle devient le back office des entreprises tech mondiales et abrite l\'écosystème de startups à la croissance la plus rapide au monde.',
        'L\'Indonésie produit électronique, huile de palme, textiles et matières premières. Elle compte 278 millions d\'habitants, la 4e population mondiale. Son écosystème fintech est le plus dynamique d\'Asie du Sud Est.',
        'Le Vietnam devient l\'alternative à la Chine pour la manufacture. Il capte les chaînes d\'approvisionnement déplacées par les tensions commerciales États Unis Chine. La Thaïlande est un hub commercial régional, un centre manufacturier et une puissance touristique, avec plus de 35 millions de visiteurs internationaux par an. Singapour est le hub financier de l\'Asie du Sud Est, avec 383 milliards de dollars de trading FX quotidien. La Corée du Sud est un leader en semi conducteurs et véhicules électriques, avec Samsung et Hyundai comme puissances mondiales.',
      ],
    },
    {
      heading: 'Une histoire rapide: comment l\'Asie est devenue le centre',
      body: 'Pour comprendre où en est l\'Asie, il faut comprendre d\'où elle vient.',
      paragraphs: [
        'Pendant la majeure partie du XXe siècle, l\'Asie n\'était pas le centre financier. Le monde occidental l\'était. L\'Europe et l\'Amérique du Nord contrôlaient le commerce, la finance et l\'innovation mondiaux. Les économies asiatiques en développement étaient surtout fournisseurs de matières premières et de main d\'œuvre bon marché pour les entreprises occidentales. Les systèmes de paiement, les banques, les marchés boursiers: tout était sous contrôle occidental.',
        'Le basculement s\'est fait progressivement, puis soudainement. Dans les années 1970 et 1980, le Japon a émergé comme puissance manufacturière. Dans les années 1990, il était la deuxième économie mondiale. Dans les années 2000, la Chine s\'est ouverte et a commencé à capturer la manufacture mondiale. En 2010, l\'Asie était devenue l\'usine du monde. En 2020, elle est aussi devenue le centre financier du monde.',
      ],
    },
    {
      heading: 'La trajectoire de croissance et le saut digital',
      body: 'La part du PIB a augmenté régulièrement. Le vrai point d\'inflexion a été la transformation digitale.',
      paragraphs: [
        'De 2000 à 2010, la part de l\'Asie dans le PIB mondial est passée de 20% à 30%. De 2010 à 2020, de 30% à 35%. De 2020 à 2026, elle a atteint 37% et continue de croître.',
        'Mais le vrai point d\'inflexion n\'était pas la croissance du PIB. C\'était la transformation digitale. Quand les smartphones sont arrivés, l\'Asie ne s\'est pas contentée de les adopter. Elle a sauté entièrement la banque traditionnelle. L\'Inde a construit UPI, un système de paiements en temps réel soutenu par l\'État. La Chine a construit Alipay et WeChat Pay, couvrant plus de 90% des transactions en ligne. L\'Asie du Sud Est a construit des systèmes de paiement instantané dans chaque pays: PromptPay, PayNow, QRIS, et d\'autres.',
        'L\'Occident s\'appuyait encore sur les cartes de crédit et la banque traditionnelle. L\'Asie est passée aux paiements natifs digitaux du jour au lendemain.',
      ],
      table: {
        columns: ['Période', 'Part de l\'Asie dans le PIB mondial'],
        rows: [
          ['2000 à 2010', '20% à 30%'],
          ['2010 à 2020', '30% à 35%'],
          ['2020 à 2026', 'Atteint 37% et en hausse'],
        ],
      },
    },
    {
      heading: 'Où l\'Asie vise maintenant',
      body: 'Les gouvernements de la région ont des cibles explicites. La technologie financière n\'est plus un bonus. C\'est une stratégie nationale.',
      paragraphs: [
        'L\'Inde vise l\'inclusion financière digitale pour plus de 500 millions de personnes non bancarisées. Le Vietnam vise le statut de hub de chaîne d\'approvisionnement en captant la manufacture déplacée de Chine. L\'Indonésie vise le leadership fintech et le statut de licorne pour plusieurs startups. La Thaïlande vise le statut de hub de paiements régional, faisant de PromptPay la norme pour l\'ASEAN. Singapour vise le statut de hub d\'innovation crypto et blockchain comme stratégie gouvernementale explicite. La Chine vise la dominance tech domestique plus l\'intégration financière de la Belt and Road, en exportant le yuan. Le Japon vise un pivot démographique via l\'automatisation, la robotique et la fintech institutionnelle.',
      ],
      pullQuote: 'La technologie financière n\'est plus un bonus. C\'est une stratégie nationale.',
    },
    {
      heading: 'Options fintech: les grands acteurs et leurs volumes',
      body: 'Qui joue, qui ne joue pas, et qui est déjà de l\'infrastructure.',
      paragraphs: [
        'En Chine, Alipay prend 50 à 55% des transactions digitales chinoises et WeChat Pay 35 à 40%. Combinés, ils détiennent plus de 90% de dominance. Le volume quotidien qu\'ils traitent est difficile à quantifier précisément, mais les estimations tournent autour de 2 à 3 billions de dollars par jour rien qu\'en Chine. Ce ne sont pas des startups. Ce sont de l\'infrastructure. Alipay s\'inscrit dans l\'écosystème Alibaba. WeChat Pay dans Tencent. Ils fonctionnent comme des rails de paiement déjà matures.',
        'En Inde, UPI traite 13 milliards de transactions par mois, environ 57% de toutes les transactions indiennes, atteint plus de 500 millions de personnes auparavant non bancarisées, et est sans frais et construit par l\'État. Le volume quotidien approche 1,5 billion de dollars. UPI est unique. Ce n\'est pas une entreprise. C\'est un système de paiement public sur lequel toute fintech peut construire. L\'architecture force l\'innovation plutôt que la consolidation.',
        'En Asie du Sud Est, les rails de paiement instantané publics incluent PromptPay en Thaïlande (règlement instantané 24/7, gratuit), PayNow à Singapour (temps réel, lié au téléphone ou à l\'identité), BI FAST en Indonésie (système instantané de la banque centrale), DuitNow en Malaisie (règlement temps réel 24/7), et InstaPay et PESONet aux Philippines. Le volume quotidien combiné approche 1,2 billion de dollars. Les États construisent les rails. La fintech construit l\'expérience consommateur par dessus. Cela démocratise l\'infrastructure de paiement.',
      ],
      table: {
        columns: ['Marché', 'Rail ou acteur', 'Signal'],
        rows: [
          ['Chine', 'Alipay et WeChat Pay', 'Dominance digitale 90%+'],
          ['Inde', 'UPI', '13B de transactions par mois'],
          ['Thaïlande', 'PromptPay', 'Instantané gratuit 24/7'],
          ['Singapour', 'PayNow', 'Temps réel téléphone ou ID'],
          ['Indonésie', 'BI FAST', 'Instantané banque centrale'],
          ['Malaisie', 'DuitNow', 'Temps réel 24/7'],
          ['Philippines', 'InstaPay et PESONet', 'Temps réel plus batch'],
        ],
      },
    },
    {
      heading: 'Les fintechs en scale',
      body: 'Super apps, banques digitales, BNPL et crédit e commerce sont là où la croissance se compose déjà.',
      paragraphs: [
        'Les super apps combinent paiement et écosystème. Grab en Asie du Sud Est fait VTC plus paiements plus services financiers. Gojek en Indonésie suit un modèle similaire. Kakao en Corée du Sud combine paiement, social et commerce. Momo au Vietnam est un wallet plus écosystème avec plus de 50 millions d\'utilisateurs.',
        'Les banques digitales scalent vite. Tonik Bank aux Philippines a atteint 2 millions d\'utilisateurs en 3 ans, la banque digitale à la croissance la plus rapide d\'Asie du Sud Est. Kakao Bank en Corée du Sud a plus de 40 millions d\'utilisateurs avec des services bancaires complets. Jago en Indonésie est une néobanque qui atteint des millions. OCBC Digital Bank couvre Singapour et la région élargie.',
        'Le BNPL (Buy Now Pay Later) inclut Kredivo en Indonésie, Fintech aux Philippines, et Atome dans cinq pays. La taille de marché est estimée près de 450 milliards de dollars mondiaux avec environ 25% de croissance annuelle.',
        'Sur le crédit, les plateformes e commerce qui originent des prêts PME (Tokopedia, Shopee en Indonésie, Lazada en Asie du Sud Est) originent plus de prêts PME que les banques traditionnelles. Elles utilisent les données de transaction plutôt que les bureaux de crédit.',
      ],
      bullets: [
        'Super apps: Grab, Gojek, Kakao, Momo',
        'Banques digitales: Tonik, Kakao Bank, Jago, OCBC Digital',
        'BNPL: Kredivo, Fintech, Atome',
        'Crédit e commerce: Tokopedia, Shopee, Lazada battent les banques sur les prêts PME',
      ],
    },
    {
      heading: 'Qui est sous servi: les lacunes',
      body: 'Les rails domestiques sont en avance. Le transfrontalier, la finance de chaîne d\'approvisionnement et le crédit thin file ne le sont pas.',
      paragraphs: [
        'Les paiements transfrontaliers PME représentent près de 15,8 billions de dollars de marché annuel, et les solutions actuelles sont toutes cassées. Les lettres de crédit coûtent 1 à 3%, prennent 3 à 5 jours, et exigent un statut Fortune 500 pour y accéder. Alibaba Trade Assurance ne fonctionne que sur Alibaba avec un règlement en 1 à 2 jours. Le virement est rapide mais sans protection contre la fraude. PayPal facture 4 à 5% de frais et n\'est pas officiellement supporté dans de nombreux pays asiatiques. Personne n\'a résolu cela à l\'échelle.',
        'La finance de chaîne d\'approvisionnement pour PME est un marché de 415 milliards de dollars en Asie, en croissance d\'environ 7% par an. Aujourd\'hui, elle fonctionne surtout pour le Fortune 500. Ce qu\'il faut, c\'est un financement digital de chaîne d\'approvisionnement pour des manufactures de 50 personnes.',
        'Le B2B transfrontalier entre pays asiatiques reste fragmenté. UPI, PromptPay, PayNow, QRIS et DuitNow existent tous mais ne se connectent pas entre eux. Project Nexus devait résoudre cela mais reste lent. L\'impact: plus de 1,2T$ de volume quotidien en Asie du Sud Est reste inefficient.',
        'La tokenisation immobilière émerge. L\'immobilier illiquide au Vietnam, à Bali et aux Philippines ouvre la voie à la propriété fractionnée via blockchain pour des investissements de 5K$ au lieu d\'une exigence de 500K$. Le scoring de crédit alternatif fonctionne déjà par morceaux: plus de 500 millions de non bancarisés n\'ont pas d\'historique de crédit, pourtant les plateformes e commerce indonésiennes originent déjà plus de prêts que les banques via données e commerce, paiements mobiles et factures d\'utilités, mais pas encore à l\'échelle optimale.',
      ],
      pullQuote: 'Personne n\'a résolu les paiements transfrontaliers PME à l\'échelle. Cette lacune reste ouverte.',
    },
    {
      heading: 'Pays cachés à fort potentiel',
      body: 'La plupart des financements fintech vont à la Chine, l\'Inde, Singapour et le Vietnam. Population plus demande sous servie ailleurs attend encore.',
      paragraphs: [
        'Les Philippines comptent environ 120 millions d\'habitants, jeunes, en croissance et anglophones. Tonik Bank a atteint 2 millions d\'utilisateurs en 3 ans. GCash détient plus de 92 millions de wallets. La lacune: un hub BPO qui a besoin de meilleurs paiements transfrontaliers pour 1,3 million de travailleurs envoyant des remises, plus de la finance de chaîne d\'approvisionnement pour les PME fournisseurs de groupes mondiaux.',
        'Le Pakistan compte environ 230 millions d\'habitants et vient de passer d\'une interdiction crypto à un cadre régulé en 2026. La lacune est l\'inclusion financière digitale et les paiements transfrontaliers. Le Bangladesh compte environ 170 millions d\'habitants. bKash domine le mobile money avec plus de 100 millions d\'utilisateurs. La lacune est les paiements de main d\'œuvre transfrontaliers et la finance de chaîne d\'approvisionnement pour le plus grand hub de confection mondial.',
      ],
    },
    {
      heading: 'Chine: richesse piégée, transfrontalier cassé',
      body: 'La Chine produit plus de 6 billions de dollars de volume transactionnel quotidien. La crypto est interdite. SAFE restreint la sortie des fonds. La lacune est l\'outbound.',
      paragraphs: [
        'Le paradoxe: la Chine produit un volume quotidien énorme, pourtant la crypto est totalement interdite, les contrôles de capitaux restreignent la sortie des fonds, les paiements RMB transfrontaliers exigent une approbation gouvernementale, et les entreprises fintech font face à un contrôle public croissant.',
        'Une petite tranche du volume quotidien chinois est massive. La Chine exporte plus de 3,5 billions de dollars par an. Les PME qui importent de Chine font face à 5 à 10% de coûts cachés via frais, markup FX et retards. Méthodes actuelles: lettre de crédit (chère, lente), Alibaba Trade Assurance (restreinte), virement (risqué).',
        'Ce qu\'il faut, c\'est une plateforme hub unique pour importateurs PME qui gère la sécurité des paiements (escrow), le FX à spreads serrés, le règlement en jours et non en semaines, et la vérification des fournisseurs. Pourquoi cela n\'a pas été construit: la friction réglementaire plus les contrôles de capitaux rendent difficile le mouvement international des fonds. L\'infrastructure de paiement interne chinoise est mature. La lacune est l\'outbound, sortir l\'argent pour les paiements transfrontaliers.',
      ],
    },
    {
      heading: 'Inde: or fintech, argent non bancarisé',
      body: 'UPI domine. Transfrontalier, remises, commerce B2B et finance de chaîne d\'approvisionnement pour PME restent cassés.',
      paragraphs: [
        'Ce qui fonctionne: UPI à 13 milliards de transactions par mois, plus de 500 millions de personnes avec un accès digital, des plateformes de prêt fintech qui originent des volumes massifs, et un écosystème startup en plein boom à Bengaluru et Mumbai.',
        'Ce qui est cassé: les paiements transfrontaliers encore chers et lents (les banques facturent 1 à 3% pour un virement transfrontalier); les remises, l\'Inde recevant plus de 120 milliards de dollars par an via des méthodes coûteuses; les paiements B2B encore sur la banque héritée; la finance de chaîne d\'approvisionnement à peine existante pour les fournisseurs PME.',
        'Qui est sous servi: les fournisseurs agricoles, les PME exportatrices, les expéditeurs de remises qui paient encore 2 à 5% de frais type Western Union, et les participants de la chaîne d\'approvisionnement du fermier au distributeur au détaillant. Le gouvernement veut étendre UPI aux paiements mondiaux (la RBI veut qu\'UPI rivalise avec SWIFT), inclure plus de 500 millions de non bancarisés, piloter une croissance tirée par l\'export, et intégrer blockchain et CBDC.',
        'Taille d\'opportunité: l\'Inde compte 1,45 milliard d\'habitants. Plus de 500 millions sont non bancarisés. L\'adoption des paiements digitaux représente 57% des transactions. Les 43% restants en cash représentent des billions de volume annuel encore à digitaliser.',
      ],
    },
    {
      heading: 'Japon: marché mature, opportunité du vieillissement',
      body: 'Riche, de confiance, lent. La fintech qui résout pour les utilisateurs âgés a le TAM domestique le plus clair.',
      paragraphs: [
        'Ce qui fonctionne: un système bancaire mature, des institutions stables, le Nikkei 225 parmi les plus grands marchés boursiers mondiaux, et une pénétration carte de crédit élevée à environ 55% des paiements en ligne.',
        'Ce qui est cassé: une innovation lente avec la banque héritée encore dominante, une population vieillissante avec moins de jeunes utilisateurs fintech, une régulation conservatrice avec la crypto fortement restreinte et des taux d\'imposition individuels de 35 à 45%, et une faible croissance près de 0,6% du PIB, la plus lente d\'Asie développée.',
        'Qui est sous servi: les utilisateurs âgés qui ont besoin d\'interfaces simples et de confiance, les utilisateurs de paiements transfrontaliers qui paient encore des frais bancaires élevés, et les startups tech dans une culture plus lente que l\'Asie du Sud Est. Le Japon est riche. Le revenu moyen des ménages est le plus élevé d\'Asie. Mais il vieillit aussi. Les entreprises fintech qui résolvent pour les utilisateurs âgés avec clarté, simplicité et sécurité pourraient avoir un TAM massif. Le gouvernement veut l\'adoption technologique par les seniors, le statut de hub fintech régional face à Singapour et Hong Kong, et un développement institutionnel stable plutôt qu\'une disruption rapide.',
      ],
    },
    {
      heading: 'Hong Kong: pont crypto, échappatoire aux contrôles de capitaux',
      body: 'Hong Kong est la soupape pour la fintech continentale et le chemin de règlement RMB offshore qui contourne SAFE.',
      paragraphs: [
        'Ce qui fonctionne: statut de hub RMB offshore (le CNH est le plus liquide), régulation crypto friendly via le cadre ASPI Re, accès passerelle à la Chine sans contrôles de capitaux continentaux, et licences de banque digitale déjà délivrées.',
        'Ce qui est cassé: risque géopolitique autour de l\'autonomie, opérations coûteuses (coûts les plus élevés d\'Asie du Sud Est sauf Singapour), un marché domestique limité de seulement 7,5 millions d\'habitants, et un immobilier cher avec des rendements de 2 à 3%.',
        'Qui est sous servi: les entreprises crypto qui peuvent opérer ici mais pas en Chine, les exportateurs chinois qui ont besoin de règlement RMB sans restrictions continentales, et les investisseurs institutionnels qui ont besoin d\'accès fintech Asie. Hong Kong est la soupape pour la fintech continentale. Les entreprises ne peuvent pas opérer librement en Chine, donc elles se basent à Hong Kong. Le RMB peut être réglé offshore sans approbation SAFE. C\'est une opportunité d\'arbitrage réglementaire. Le gouvernement veut l\'innovation fintech face à Singapour, le leadership en régulation crypto y compris les licences stablecoin, et l\'internationalisation du RMB.',
      ],
    },
    {
      heading: 'Singapour: hub fintech, refuge coûteux',
      body: 'Singapour est la rampe de lancement HQ régionale. Coûteuse, petite localement, et toujours le meilleur plan de contrôle pour l\'expansion en Asie du Sud Est.',
      paragraphs: [
        'Ce qui fonctionne: la MAS soutient activement la fintech et la crypto, quatre banques digitales licenciées, licences stablecoin délivrées en 2026, plus de 80 traités fiscaux bilatéraux qui évitent la double imposition, et PayNow comme système de paiement instantané.',
        'Ce qui est cassé: la base de coûts la plus élevée d\'Asie du Sud Est, un petit marché local de 5,9 millions d\'habitants, et une croissance plus lente que les marchés émergents. Qui est sous servi: les entreprises régionales qui ont besoin d\'une expansion en Asie du Sud Est plutôt que Singapour seul, et les fondateurs soucieux du budget qui ne peuvent pas se permettre 3K$ de loyer mensuel.',
        'Singapour est le HQ régional pour les entreprises ciblant toute l\'Asie du Sud Est. C\'est cher, mais c\'est la meilleure rampe de lancement. Des entreprises comme Grab utilisent Singapour pour s\'étendre dans la région. Le gouvernement veut le statut de hub crypto et fintech, le développement des rails de paiement régionaux via Project Nexus, et le siège d\'institutions financières pour la gestion de fortune et l\'assurance.',
      ],
    },
    {
      heading: 'Thaïlande: hub de paiements, meilleurs rendements immobiliers',
      body: 'PromptPay a rendu les paiements domestiques instantanés. Les voisins transfrontaliers et la friction du Foreign Business Act sont les chapitres inachevés.',
      paragraphs: [
        'Ce qui fonctionne: PromptPay 24/7 et gratuit, exchanges crypto régulés par la SEC avec Bitcoin, Ethereum et Ripple approuvés, un écosystème super app via Grab et GrabFinance, et une domination touristique avec plus de 35 millions de visiteurs par an.',
        'Ce qui est cassé: le Foreign Business Act avec 14 secteurs restreints exigeant un partenaire thaïlandais, des réglementations complexes avec une application inconsistante, PromptPay connectant les banques domestiques mais pas le transfrontalier, et le B2B transfrontalier encore sur la banque héritée.',
        'Qui est sous servi: les touristes confrontés à la friction de paiement, les PME importatrices étrangères cherchant des fournisseurs thaïlandais, le commerce transfrontalier avec les voisins, et les participants de la chaîne d\'approvisionnement du fermier à l\'exportateur. La Thaïlande est un hub commercial régional dans plus de 1,2T$ de volume quotidien en Asie du Sud Est. La lacune est le transfrontalier entre la Thaïlande et le Vietnam, le Cambodge, le Laos et le Myanmar. Le gouvernement veut le statut de hub de paiements régional, les paiements digitaux touristiques, la compétitivité manufacturière via la finance de chaîne d\'approvisionnement, et des secteurs incentivés BOI en VE, semi conducteurs, robotique et biotech.',
      ],
    },
    {
      heading: 'Indonésie: boom fintech, lacunes cachées',
      body: 'Le product market fit à l\'échelle est déjà là. Les paiements transfrontaliers et les remises sont la prochaine lacune.',
      paragraphs: [
        'Ce qui fonctionne: BI FAST, plateformes e commerce (Tokopedia, Shopee) originant plus de prêts que les banques, super apps (Grab, Gojek), banques digitales (Jago, Ajaib, Kredivo en scale), plateformes BNPL, et 278 millions d\'habitants comme 4e population mondiale.',
        'Ce qui est cassé: bureaucratie avec réglementations complexes et application inconsistante, un cadre crypto qui vient de passer des commodities (Bappebti) aux produits financiers (OJK) en 2025, une infrastructure transfrontalière limitée, et plus de 13B$ de remises encore via des canaux traditionnels coûteux.',
        'Qui est sous servi: les travailleurs du textile, les coopératives agricoles, les expéditeurs de remises au Moyen Orient et en Malaisie, et les visiteurs touristiques de Bali qui ont besoin de systèmes de paiement intégrés. L\'Indonésie est là où la fintech obtient le product market fit à l\'échelle. La prochaine lacune est les paiements transfrontaliers vers la Malaisie, Singapour, la Thaïlande et les Philippines. Le gouvernement veut des licornes fintech, l\'inclusion financière, la finance de chaîne d\'approvisionnement, et la maturation des banques digitales.',
      ],
      image: {
        src: '/reports/asia-pacific-portrait.png',
        alt: 'Vue verticale du port et du skyline d\'une ville financière d\'Asie Pacifique',
        caption: 'La densité est la constante régionale. Chaque marché garde son propre registre, code fiscal et rail de compensation.',
        layout: 'portrait',
      },
    },
    {
      heading: 'Vietnam: hub manufacturier, croissance la plus rapide',
      body: 'Le Vietnam devient la nouvelle Chine pour les usines. L\'infrastructure fintech n\'a pas suivi.',
      paragraphs: [
        'Ce qui fonctionne: captation des chaînes d\'approvisionnement déplacées de Chine, croissance économique la plus rapide près de 7,1% par an, appréciation immobilière la plus rapide près de 8 à 15% par an, dominance de Momo avec plus de 50 millions d\'utilisateurs de wallet digital, et plus de 200 startups fintech.',
        'Ce qui est cassé: infrastructure bancaire encore en rattrapage, infrastructure de paiement transfrontalier limitée pour le commerce, règles de propriété d\'investissement étranger en amélioration mais encore complexes, et concentration fintech autour de Momo tandis que les autres restent petites.',
        'Qui est sous servi: les PME manufacturières ayant besoin de finance de chaîne d\'approvisionnement, les entreprises orientées export ayant besoin de rails transfrontaliers, et les fournisseurs de biens importés ayant besoin de financement de stock. La manufacture se déplace ici depuis la Chine. La finance de chaîne d\'approvisionnement et les paiements B2B transfrontaliers sont tous sous développés. Le gouvernement veut le statut de hub manufacturier, l\'attraction d\'investissement étranger, le développement de l\'économie digitale, et la captation d\'IDE de la guerre commerciale Chine.',
      ],
    },
    {
      heading: 'Bali: hauts rendements, risque de leasehold',
      body: 'Les rendements locatifs les plus élevés d\'Asie développée s\'accompagnent d\'un risque de tenure en leasehold et d\'un refroidissement de l\'offre de condos.',
      paragraphs: [
        'Ce qui fonctionne: 5 à 10% de rendements locatifs immobiliers annuels, un hub de digital nomads avec plus de 100K étrangers vivant sur l\'arbitrage du coût de la vie, et une infrastructure touristique avec plus de 5 millions de visiteurs annuels.',
        'Ce qui est cassé: les étrangers ne peuvent pas posséder de terrain, seulement louer pour 25 à 30 ans; suroffre de condos et refroidissement du marché en 2025 à 2026; liquidité difficile à la revente à d\'autres étrangers; et incertitude réglementaire si les règles de propriété changent.',
        'Qui est sous servi: les investisseurs immobiliers qui veulent des rendements stables à long terme mais font face au risque de leasehold, la communauté expat ayant besoin de logement et d\'infrastructure de paiement, et les touristes ayant besoin de meilleurs paiements digitaux. Tokeniser l\'immobilier et la propriété fractionnée via blockchain peut répartir le risque de leasehold entre de nombreux investisseurs.',
      ],
    },
    {
      heading: 'Malaisie: stable, sous estimée',
      body: 'Cinq banques digitales et DuitNow rendent la Malaisie plus dense que l\'attention de financement ne le suggère.',
      paragraphs: [
        'Ce qui fonctionne: cinq banques digitales (le plus en ASEAN), DuitNow, gouvernement et réglementations stables, et statut de centre financier ASEAN. Ce qui est cassé: croissance fintech plus lente que l\'Indonésie, les Philippines ou le Vietnam; plus chère que le Vietnam et moins innovante que Singapour; et moins d\'attention de financement dans l\'ensemble.',
        'Qui est sous servi: les PME ayant besoin d\'infrastructure de paiement transfrontalier, les travailleurs étrangers ayant besoin de solutions de remises, et les traders transfrontaliers ayant besoin d\'intégration avec les rails ASEAN. La Malaisie est stable mais sous estimée. L\'intégration ASEAN est réelle ici. Les entreprises axées sur les paiements régionaux pourraient utiliser la Malaisie comme base.',
      ],
    },
    {
      heading: 'Corée du Sud: puissance tech, fintech conservatrice',
      body: 'Kakao Bank et Toss prouvent la banque digitale à des dizaines de millions d\'utilisateurs. La fiscalité domestique et la prudence poussent l\'ambition vers l\'extérieur.',
      paragraphs: [
        'Ce qui fonctionne: Kakao Bank avec plus de 40 millions d\'utilisateurs, Toss Bank comme leader de paiement, environ 25,47% de CAGR dans le segment néobanque, et une infrastructure tech forward. Ce qui est cassé: impôt sur les sociétés de 25 à 27%, régulation crypto prudente, et croissance plus lente que les marchés émergents.',
        'Qui est sous servi: les entreprises transfrontalières ayant besoin de fintech régionale, et les PME exportatrices ayant besoin d\'infrastructure de paiement internationale. La Corée du Sud est tech forward mais chère. Les entreprises ici se concentrent sur l\'expansion régionale en Asie du Sud Est plus que sur la saturation domestique.',
      ],
    },
    {
      heading: 'Taïwan: puissance semi conducteur, risque géopolitique',
      body: 'TSMC est le fait stratégique. La fintech est moins développée qu\'à Singapour, Hong Kong ou en Asie du Sud Est.',
      paragraphs: [
        'Ce qui fonctionne: TSMC avec environ 90% de la fabrication de puces avancées mondiale, un écosystème tech fort, et le développement de la banque digitale. Ce qui est cassé: risque géopolitique des tensions avec la Chine, exigences de capital élevées, et setup lent (2 à 4 mois pour l\'enregistrement d\'entreprise versus Singapour en minutes).',
        'Qui est sous servi: les entreprises crypto dans un cadre encore en développement, et le commerce tech transfrontalier. La finance de chaîne d\'approvisionnement pour le commerce de semi conducteurs est sous servie.',
      ],
    },
    {
      heading: 'Philippines: population jeune, fiscalité élevée, hub BPO',
      body: 'Population la plus jeune prête pour la fintech en Asie du Sud Est, densité GCash, et échelle BPO sous plafonds de propriété et fiscalité nominale élevée.',
      paragraphs: [
        'Ce qui fonctionne: plus de 120 millions de jeunes, Tonik Bank à 2 millions d\'utilisateurs en 3 ans (banque digitale à la croissance la plus rapide de la région), GCash à plus de 92 millions d\'utilisateurs de wallet digital, un hub BPO avec plus de 1,3 million de travailleurs gérant des opérations US et UE, et environ 5,7% de croissance économique.',
        'Ce qui est cassé: l\'impôt sur les sociétés le plus élevé d\'Asie à 37% dans le cadre source, plafonds de propriété étrangère et secteurs restreints, et réglementations complexes à travers plusieurs agences. Qui est sous servi: les travailleurs BPO ayant besoin de rails de remises transfrontalières, les PME exportatrices ayant besoin d\'infrastructure de paiement internationale, et une population jeune avec une forte pénétration smartphone mais une banque traditionnelle limitée.',
        'Les Philippines ont la population la plus jeune prête pour la fintech en Asie du Sud Est. Tonik a prouvé que la banque digitale peut scaler vite. La lacune est les paiements transfrontaliers pour 1,3 million de travailleurs BPO et pour les PME exportatrices. Le gouvernement veut des licornes fintech, la maturité de la banque digitale, l\'inclusion financière, et le soutien des paiements de l\'industrie BPO.',
      ],
    },
    {
      heading: 'S\'implanter en tant qu\'étranger: les setups rapides',
      body: 'Singapour, Hong Kong, Vietnam et Thaïlande se situent dans la bande de deux à huit semaines quand les dépôts sont propres.',
      paragraphs: [
        'Singapour: environ 15 minutes en ligne pour environ 600$. Littéralement le plus rapide sur Terre. Vous pouvez incorporer de n\'importe où sans vous déplacer. L\'identifiant fiscal est automatique. Le compte bancaire s\'ouvre en 5 à 7 jours. Idéal pour crypto et HQ fintech régional et infrastructure de paiement.',
        'Hong Kong: 2 à 3 semaines pour environ 1 200$. Très rapide, deuxième place. Pas de bail de bureau requis (réacheminement de courrier OK). Le Companies Registry traite rapidement. Idéal pour passerelle Chine, crypto et opérations régionales.',
        'Vietnam: 6 à 10 semaines pour 1 500$ à 3 500$. Système en ligne désormais disponible. Plus simple que la Thaïlande ou l\'Indonésie. Besoin d\'un comptable familier avec les entreprises étrangères. Idéal pour manufacture et travail de hub de chaîne d\'approvisionnement.',
        'Thaïlande: 4 à 8 semaines pour 1 500$ à 3 000$. Relativement simple, avec complications Foreign Business Act (contournement: Board of Investment). L\'ouverture de compte bancaire est lente à 4 à 8 semaines et constitue le goulot. Idéal pour hub régional, investissement immobilier et tourisme.',
      ],
    },
    {
      heading: 'Setups moyens et complexes',
      body: 'Indonésie, Philippines, Malaisie, Taïwan et Corée sont au milieu. Chine, Inde et Japon portent une friction plus lourde.',
      paragraphs: [
        'L\'Indonésie prend 8 à 12 semaines et 2 500$ à 5 000$, avec plusieurs agences, enregistrement d\'étranger, et plus de bureaucratie que la moyenne d\'Asie du Sud Est. La Positive Investment List permet désormais 100% de propriété étrangère depuis 2021. Idéal pour fintech, manufacture et présence locale. Les Philippines prennent 20 à 35 jours et 1 000$ à 2 000$, en fait assez rapide, mais les restrictions Foreign Investment Negative List s\'appliquent et un capital minimum de 200K$ s\'applique pour plus de 40% de propriété étrangère. Idéal pour banque digitale, services BPO et marché jeune. La Malaisie prend 4 à 8 semaines et 1 000$ à 1 800$. Taïwan peut s\'incorporer en 2 à 4 semaines sur le papier, mais l\'ARC s\'étire sur 2 à 4 mois. La Corée du Sud prend 4 à 6 semaines et 1 500$ à 3 000$ avec un capital minimum près de KRW 10M (environ 8 000$).',
        'La Chine prend 8 à 12 semaines pour les services et 4 à 6 mois pour la manufacture à 6 500$ à 8 500$. La WFOE est standard. L\'approbation SAMR est requise. L\'ouverture de compte bancaire prend 4 à 8 semaines. Les contrôles de capitaux restreignent le rapatriement (6 à 8 semaines par transaction, peut être refusé). Le vrai défi est de sortir l\'argent, pas d\'entrer. L\'Inde prend 6 à 8 semaines et 1 500$ à 2 500$, exige un directeur résident indien (présence 182+ jours l\'année précédente), utilise le dépôt digital MCA (SPICe+), et nécessite plusieurs enregistrements fiscaux. Le Japon prend 4 à 6 semaines et 2 000$ à 4 500$ avec notarisation, banque lente, et enregistrements multi agences.',
      ],
      bullets: [
        'Commun à tous: apostille ou notarisation, dépôt de capital, enregistrement fiscal, enregistrement employeur si embauche, vérification d\'adresse, banque corporate (souvent l\'étape la plus lente), et licences sectorielles si requises',
      ],
      table: {
        columns: ['Marché', 'Délai', 'Cadre de coût', 'Idéal pour'],
        rows: [
          ['Singapour', 'Minutes à jours', 'Environ 600$', 'Crypto, HQ fintech'],
          ['Hong Kong', '2 à 3 semaines', 'Environ 1 200$', 'Passerelle Chine, crypto'],
          ['Vietnam', '6 à 10 semaines', '1 500$ à 3 500$', 'Hub manufacturier'],
          ['Thaïlande', '4 à 8 semaines', '1 500$ à 3 000$', 'Tourisme, immobilier'],
          ['Indonésie', '8 à 12 semaines', '2 500$ à 5 000$', 'Fintech, présence locale'],
          ['Philippines', '20 à 35 jours', '1 000$ à 2 000$', 'Banque digitale, BPO'],
          ['Malaisie', '4 à 8 semaines', '1 000$ à 1 800$', 'Hub ASEAN'],
          ['Chine', '8 à 12 semaines+', '6 500$ à 8 500$', 'Manufacture, long terme'],
          ['Inde', '6 à 8 semaines', '1 500$ à 2 500$', 'Tech, fintech'],
          ['Japon', '4 à 6 semaines', '2 000$ à 4 500$', 'Tech établie'],
        ],
      },
    },
    {
      heading: 'Ce que veulent les gouvernements',
      body: 'Les cibles gouvernementales sont explicites. La fintech est une stratégie.',
      table: {
        columns: ['Pays', 'Stratégie explicite'],
        rows: [
          ['Inde', 'Inclusion financière digitale pour 500M non bancarisés; UPI comme standard mondial'],
          ['Vietnam', 'Hub de chaîne d\'approvisionnement captant depuis la Chine'],
          ['Indonésie', 'Création de licornes fintech; inclusion pour 278M d\'habitants'],
          ['Philippines', 'Maturité banque digitale; soutien BPO; innovation fintech'],
          ['Thaïlande', 'Hub de paiements régional; secteurs incentivés BOI'],
          ['Singapour', 'Statut de hub crypto et blockchain'],
          ['Hong Kong', 'Innovation fintech et crypto; internationalisation du RMB'],
          ['Taïwan', 'Écosystème tech et chaîne d\'approvisionnement semi conducteurs'],
          ['Corée du Sud', 'Maturité écosystème fintech; statut de hub régional'],
          ['Chine', 'Dominance tech domestique; Belt and Road; export du yuan'],
          ['Malaisie', 'Centre financier ASEAN; leadership fintech régional'],
          ['Japon', 'Fintech pour population vieillissante; fintech institutionnelle'],
        ],
      },
    },
    {
      heading: 'Ce qu\'est réellement la demande de marché',
      body: 'Sous les cibles gouvernementales, voici ce qui est réellement financé et construit.',
      paragraphs: [
        'Les paiements consommateurs sont un marché massif: super apps, wallets digitaux (Momo 50M utilisateurs, GCash 92M utilisateurs), plateformes BNPL en croissance près de 25% par an, et banques digitales comme Tonik. La demande consommateur est la commodité, la vitesse et l\'absence de frais. Ces marchés ont déjà dépassé les cartes de crédit pour les paiements digitaux instantanés.',
        'Le prêt PME est un marché sous servi énorme. Les plateformes e commerce qui originent des prêts PME battent les banques traditionnelles. Les plateformes de finance de chaîne d\'approvisionnement émergent. Les PME n\'ont pas besoin de branding fintech. Elles ont besoin de crédit, et elles le prendront de quiconque peut les vérifier le plus vite. Les données de transaction battent un bureau de crédit.',
        'Le commerce transfrontalier est entièrement cassé. Les importateurs PME paient 5 à 10% de coûts cachés pour être payés depuis la Chine. Les expéditeurs de remises paient 2 à 5% de frais. L\'import export utilise encore la banque héritée. La demande de marché est vitesse, réduction de coût et sécurité. Personne n\'a résolu cela à l\'échelle.',
        'Les paiements B2B domestiques ont des rails instantanés construits, mais l\'intégration manque. PromptPay, PayNow, BI FAST, QRIS et DuitNow ne se connectent pas entre eux. La demande de marché est une API pour atteindre toute l\'ASEAN.',
      ],
    },
    {
      heading: 'Ce que les entreprises construisent déjà, et ce qu\'elles n\'obtiennent pas',
      body: 'Infrastructure de paiements, banques digitales et prêt sont saturés. Les vraies lacunes restent ouvertes.',
      paragraphs: [
        'Déjà en construction: Grab et Gojek comme super apps d\'Asie du Sud Est; Momo au Vietnam comme wallet plus paiements plus prêt plus investissement; Tonik, Kakao Bank et Jago comme banques digitales; Kredivo, Fintech, Atome et plateformes e commerce comme prêt et crédit. Ces entreprises cherchent du talent (hausse de rémunération de 30 à 40% en 2 ans), du capital pour modèles éprouvés, des partenariats avec banques, telcos et plateformes e commerce, des données de transaction, et de la clarté réglementaire.',
        'Ce qu\'elles n\'obtiennent pas: une infrastructure de paiement transfrontalier unifiée pour l\'Asie; une finance de chaîne d\'approvisionnement qui fonctionne pour les PME dans un marché de 415B$ en croissance de 7%; un crédit alternatif pour les commerçants thin file au delà des plateformes e commerce; la tokenisation immobilière à l\'échelle; et des produits de couverture de change pour les PME confrontées au risque FX des deux côtés du commerce.',
      ],
      bullets: [
        'Lacune 1: Infrastructure de paiement transfrontalier',
        'Lacune 2: Finance de chaîne d\'approvisionnement pour PME',
        'Lacune 3: Crédit alternatif pour commerçants thin file',
        'Lacune 4: Tokenisation immobilière',
        'Lacune 5: Couverture de change pour PME',
      ],
    },
    {
      heading: 'Culture et environnement opérationnel',
      body: 'Culture de paiement, culture d\'affaires, prévisibilité réglementaire et talent changent tous selon le marché.',
      paragraphs: [
        'La Chine est digitale native avec plus de 90% de transactions en ligne, Alipay et WeChat Pay ubiquitaires, le cash qui disparaît, un mindset mobile first, et un scepticisme envers les systèmes de paiement occidentaux. L\'Inde a été réécrite par UPI; les feature phones suffisent; le cash reste significatif à 40 à 50%; la confiance dans les systèmes publics est élevée; l\'adoption smartphone s\'accélère. Le Japon reste lourd en cartes de crédit en ligne à environ 55%, avec une haute confiance dans la banque, le cash encore respecté près de 30%, une adoption digitale plus lente que l\'Asie du Sud Est, et des utilisateurs âgés qui ont besoin de simplicité.',
        'L\'Asie du Sud Est (Thaïlande, Vietnam, Indonésie, Philippines) est digital first et mobile first, native super app, avec le cash en déclin de 30 à 50% selon le pays, ayant sauté entièrement les cartes de crédit, et des âges médians jeunes dans la vingtaine à la trentaine. Singapour et Hong Kong sont pleinement digitaux, multi devises, les plus rapides à adopter la nouvelle fintech, crypto aware (Singapour le plus), et mettent une prime sur la vitesse et la sécurité.',
        'Culture d\'affaires: la Chine valorise la vitesse et le guanxi avec une conformité croissante et des normes de surveillance acceptées. L\'Inde est intensive en paperasse mais se digitalise, avec un avantage anglophone. L\'Asie du Sud Est est relationnelle avec un gouvernement moins intrusif que la Chine et un anglais inégal (Philippines le plus fort). Singapour, Hong Kong, Japon et Corée du Sud sont basés sur les processus, documentation essentielle, fondés sur les règles, et l\'anglais largement parlé.',
      ],
    },
    {
      heading: 'Prévisibilité réglementaire et talent',
      body: 'Où les règles sont claires, et où le talent se trouve réellement.',
      paragraphs: [
        'Les plus prévisibles: Singapour, Hong Kong, Japon, Corée du Sud. Modérément prévisibles: Thaïlande, Malaisie, Taïwan. Moins prévisibles: Vietnam, Indonésie, Philippines, Chine, Inde.',
        'Meilleur talent tech: Inde (Bengaluru, Hyderabad), Chine (Shanghai, Beijing, Shenzhen), Singapour (limité mais premium). Meilleur talent opérationnel: hub BPO Philippines avec plus de 1,3 million de travailleurs anglophones expérimentés, et back office Inde. Meilleurs fondateurs de startups: concentration fintech Singapour, fondateurs crypto Hong Kong quittant les contraintes chinoises, nouvelle génération de fondateurs Vietnam, et précédent super app Indonésie.',
      ],
      bullets: [
        'Les plus prévisibles: Singapour, Hong Kong, Japon, Corée du Sud',
        'Moins prévisibles: Vietnam, Indonésie, Philippines, Chine, Inde',
        'Talent: Inde et Chine pour la tech; Philippines pour les ops BPO; Singapour et Hong Kong pour fondateurs et HQ',
      ],
    },
    {
      heading: 'L\'échelle et les points d\'inflexion',
      body: 'Le volume transactionnel quotidien Asie Pacifique est de 13,17 billions de dollars, environ 43% du stack mondial de 35T$ quotidien. La taille du marché fintech approche 167,71 milliards de dollars en 2026, en croissance vers 348,1B$ d\'ici 2031.',
      paragraphs: [
        'Le PIB asiatique est de 43,12 billions de dollars, environ 37% d\'un cadre mondial de 116T$. La population est de 4,7 milliards, 60% du monde. Traduction: l\'Asie n\'est pas un marché à explorer. C\'est le marché. Elle a environ 10x l\'opportunité fintech de l\'Europe ou des États Unis par échelle.',
        'L\'adoption des paiements digitaux est passée de l\'infrastructure de base (2000 à 2010), au full digital avec Alipay, WeChat et UPI (2010 à 2020), aux super apps et paiements instantanés avec PromptPay, PayNow, BI FAST et QRIS (2020 à 2026). Ensuite: intégration des rails transfrontaliers, tokenisation et crédit alternatif à l\'échelle.',
        'Les gouvernements sont passés de l\'expérimental (2015 à 2020) au tout in (2020 à 2026), construisant des rails de paiement, délivrant des licences crypto, et ciblant des licornes. La fintech est désormais stratégie gouvernementale. Le capital a suivi: VC prudent, puis doubling down (valorisation Grab 40B$+, records de financement fintech), puis chasse des modèles éprouvés en super apps, BNPL et banques digitales.',
      ],
    },
    {
      heading: 'Modèles éprouvés et opportunités non prouvées',
      body: 'Le capital suit les modèles éprouvés. Le nouveau capital peut encore gagner sur les lacunes non prouvées.',
      paragraphs: [
        'Éprouvé: super apps (Grab, Gojek) combinant VTC, paiements et finance en un fossé défendable; plateformes BNPL (Kredivo, Fintech) avec 25% de croissance annuelle et unit economics prouvées; banques digitales (Tonik, Kakao) comblant le gap bancaire pour les jeunes populations; finance embarquée e commerce (Tokopedia, Shopee) utilisant les données de transaction pour battre le crédit traditionnel.',
        'Opportunités non prouvées où le nouveau capital peut gagner: paiements PME transfrontaliers (marché 15,8T$, personne n\'a résolu); finance de chaîne d\'approvisionnement pour PME (marché 415B$, croissance 7%, sous servi); intégration de paiements B2B régionaux (plus de 1,2T$ quotidien, rails fragmentés); tokenisation immobilière (émergente, pas encore de leaders); crédit alternatif à l\'échelle (l\'e commerce l\'a compris, le secteur traditionnel non).',
      ],
      table: {
        columns: ['Opportunité', 'Cadre de marché', 'Statut'],
        rows: [
          ['Paiements PME transfrontaliers', '15,8T$ annuellement', 'Personne n\'a résolu à l\'échelle'],
          ['Finance de chaîne d\'approvisionnement PME', '415B$, croissance 7%', 'Fortune 500 seulement'],
          ['Intégration rails B2B régionaux', 'Plus de 1,2T$ quotidien Asie SE', 'Fragmenté'],
          ['Tokenisation immobilière', 'Émergente', 'Pas de leaders à l\'échelle'],
          ['Crédit alternatif à l\'échelle', 'Plus de 500M thin file', 'Partiel, mené par e commerce'],
        ],
      },
    },
    {
      heading: 'Les plus grandes surprises dans les données',
      body: 'Cinq faits qui réécrivent comment les opérateurs devraient penser l\'Asie.',
      paragraphs: [
        'La fintech n\'a pas disrupté l\'Asie comme elle a disrupté l\'Occident. L\'Asie a sauté entièrement les cartes de crédit et est allée directement au digital. C\'est une différence fondamentale d\'infrastructure.',
        'Les États ont construit les rails de paiement, pas les entreprises. UPI, PromptPay, BI FAST, QRIS, PayNow: tous construits par l\'État. Cela démocratise l\'innovation.',
        'Les plateformes e commerce sont les vrais disrupteurs fintech. Elles battent les banques sur le prêt PME parce qu\'elles ont les données de transaction. Tokopedia, Shopee et Lazada originent plus de prêts PME que les banques traditionnelles.',
        'Les paiements transfrontaliers sont encore cassés. Malgré toute l\'innovation, déplacer de l\'argent entre pays asiatiques reste cher et lent. C\'est la dernière frontière.',
        'Le succès chinois a une date d\'expiration pour l\'innovation fintech ouverte. Les contrôles de capitaux et l\'interdiction crypto signifient que l\'innovation fintech se déplace vers Singapour, Hong Kong et l\'Asie du Sud Est. La Chine a construit l\'infrastructure mais ne peut pas innover librement à l\'intérieur.',
      ],
    },
    {
      heading: 'Ce que cela signifie pour opérateurs, investisseurs et entreprises',
      body: 'Choisissez le job. Puis choisissez le marché.',
      paragraphs: [
        'Si vous construisez de la fintech: choisissez un marché avec soutien gouvernemental (Inde, Asie du Sud Est, Singapour). Évitez la Chine sauf si vous êtes en manufacture ou finance institutionnelle. Choisissez des modèles éprouvés (super apps, BNPL, banques digitales) ou des lacunes sous servies massives (transfrontalier, finance de chaîne d\'approvisionnement). Le talent est abondant et moins cher en Inde, Indonésie et aux Philippines. La clarté réglementaire compte: Singapour et Hong Kong meilleurs; Vietnam et Thaïlande plus risqués.',
        'Si vous cherchez à investir: les rendements immobiliers pointent vers la Thaïlande (7 à 9%), Bali (5 à 10% avec risque de leasehold), et le Vietnam (2 à 4% de rendement actuel avec 8 à 15% d\'appréciation). La croissance fintech pointe vers les Philippines (modèle Tonik), l\'Indonésie (super apps, BNPL), et le Vietnam (plus de 200 startups). Les cadres de rendement boursier pointent vers le Vietnam 12 à 15% annuel, l\'Inde 10 à 14%, les marchés émergents surperformant les développés dans les fourchettes de planification.',
        'Si vous êtes une entreprise en expansion: Singapour est le hub (cher mais efficient). L\'Inde est le back office talent (main d\'œuvre massive, moins chère). L\'Asie du Sud Est est le marché de croissance (population jeune, sous bancarisée). La Chine est encore l\'usine, mais les contrôles de capitaux rendent le rapatriement douloureux.',
      ],
    },
    {
      heading: 'La vraie opportunité',
      body: 'L\'Asie n\'a pas besoin d\'une autre entreprise de paiements mondiaux. Elle a besoin d\'exécution sur les lacunes.',
      paragraphs: [
        'Ce qu\'il faut: intégration transfrontalière connectant PromptPay à PayNow à BI FAST; automatisation de la finance de chaîne d\'approvisionnement qui fonctionne pour les PME, pas seulement le Fortune 500; crédit alternatif à l\'échelle utilisant les données transactionnelles pour atteindre les non bancarisés; tokenisation immobilière résolvant l\'illiquidité des marchés émergents; et super apps régionales qui déplacent l\'argent à travers cinq pays et plus.',
        'Ces lacunes représentent plus de 100B$ d\'opportunité de création de valeur. Le capital est disponible. Le talent fintech est disponible. Les rails de paiement existent. Ce qui manque, c\'est l\'exécution sur les lacunes, pas construire une carte de crédit plus rapide ou une app de paiement.',
      ],
      pullQuote: 'Cette région n\'est pas émergente. Elle a déjà émergé. La question pour les opérateurs fintech est: quelle lacune allez vous combler?',
    },
  ],
  marketContext: [
    'Asie Pacifique: 43,12T$ de PIB, 13,17T$ de volume quotidien, 4,7 milliards d\'habitants, marché fintech près de 168B$ en croissance vers 348B$ d\'ici 2031.',
    'Les rails domestiques sont matures en Inde et ASEAN. L\'intégration transfrontalière, la finance de chaîne d\'approvisionnement PME et le crédit thin file restent ouverts.',
    'Singapour et Hong Kong sont des villes hub. La Chine est l\'échelle avec friction outbound. L\'Inde et l\'Asie du Sud Est portent l\'inclusion et la croissance.',
    'Le capital éprouvé suit super apps, BNPL, banques digitales et crédit e commerce. Le potentiel non prouvé se trouve dans les lacunes.',
  ],
  providerLandscape: [
    {
      metric: 'Wallets domestiques Chine', leader: 'Alipay et WeChat Pay', value: 'Leading', tone: 'up',
      signal: 'Dominance digitale 90%+', note: 'L\'outbound est la lacune',
    },
    {
      metric: 'A2A public Inde', leader: 'UPI', value: 'Leading', tone: 'up',
      signal: '13B de transactions par mois', note: 'Toute fintech peut construire par dessus',
    },
    {
      metric: 'Rails instantanés ASEAN', leader: 'PromptPay, PayNow, BI FAST, DuitNow, InstaPay', value: 'Leading', tone: 'up',
      signal: 'Près de 1,2T$ quotidien combiné', note: 'Pas encore connectés',
    },
    {
      metric: 'Super apps', leader: 'Grab, Gojek, Kakao, Momo', value: 'Leading', tone: 'up',
      signal: 'Paiements plus écosystème', note: 'Aimant de capital éprouvé',
    },
    {
      metric: 'Banques digitales', leader: 'Tonik, Kakao Bank, Jago', value: 'Gaining', tone: 'up',
      signal: 'Échelle population jeune', note: 'Comblent encore les gaps bancaires',
    },
  ],
  implications: [
    'Traitez l\'Asie Pacifique comme la carte de marché primaire, pas une expansion après coup.',
    'Construisez sur les rails publics au lieu d\'essayer de les remplacer.',
    'Gagnez sur les paiements PME transfrontaliers, la finance de chaîne d\'approvisionnement, l\'intégration des rails, la tokenisation ou le crédit alternatif.',
    'Utilisez Singapour ou Hong Kong comme entités hub sauf si un régulateur force autrement.',
    'Traitez l\'outbound Chine et SAFE comme risque produit de premier ordre.',
    'Alignez la stratégie talent au marché: Inde et Chine pour la tech, Philippines pour les ops BPO, Singapour et Hong Kong pour le HQ.',
    'Suivez les modèles éprouvés pour le capital court terme, ou nommez une lacune non prouvée spécifique si vous voulez de l\'espace blanc ouvert.',
  ],
  closing: 'Cette région n\'est pas émergente. Elle a déjà émergé. La question pour les opérateurs fintech est: quelle lacune allez vous combler?',
  methodology: 'Analyse opérateur couvrant l\'échelle Asie Pacifique, l\'histoire, le paysage fintech, les lacunes par pays, l\'implantation étrangère, la demande publique et de marché, la culture, et les enseignements. Les chiffres macro et de volume sont des inputs de planification directionnels. Pas un conseil juridique, fiscal ou d\'investissement.',
  sources: [
    'Brief d\'analyse opérateur Asie Pacifique (août 2026)',
    'NPCI UPI; NAPAS; Bank Indonesia BI FAST and QRIS; MAS PayNow; BOT PromptPay; Bank Negara DuitNow; BSP InstaPay and PESONet',
    'Titres publics sur entreprises, fiscalité et licences à travers les douze marchés',
    'Trackers industrie paiements APAC, remises et macro',
  ],
  cta: { title: 'Vous construisez en Asie Pacifique?', lede: 'Relay transforme cette analyse en shortlists de corridors: économie, entité, rail et couverture fournisseurs dans un seul cadre.', label: 'Contacter les ventes', href: 'https://calendly.com/gratebridgelabs/30min?month=2026-08' },
  discoverMarket: 'Asia-Pacific',
}
