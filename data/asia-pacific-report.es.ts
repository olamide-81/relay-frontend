import type { DataReport } from './reports'

/** Analisis Asia Pacifico, version espanola. Sin guiones largos en el texto. */
export const asiaPacificReportEs: DataReport = {
  slug: 'asia-pacific-payment-rails',
  title: 'Analisis Asia Pacifico: la potencia financiera mundial que despierta',
  seoTitle: 'Analisis Asia Pacifico: fintech, brechas y 12 mercados | Relay Research',
  seoDescription: 'Analisis Asia Pacifico: 43T$ de PIB, 13T$ de volumen diario, rieles fintech, brechas por pais, constitucion extranjera, demanda gubernamental, cultura, y donde los operadores aun pueden ganar.',
  seoKeywords: ['analisis Asia Pacifico','potencia fintech Asia','UPI PromptPay PayNow BI FAST QRIS','pagos transfronterizos PyME Asia','hub fintech Singapur Hong Kong','fintech Indonesia Vietnam Filipinas','controles de capital China SAFE','financiamiento de cadena de suministro Asia'],
  dek: 'La region Asia Pacifico no es solo grande. Es el centro economico del mundo. Aqui esta lo que eso significa operacionalmente en produccion, fintech, brechas, constitucion y demanda.',
  kicker: 'Relay Research · Analisis Asia Pacifico',
  excerpt: 'Un analisis completo de Asia Pacifico que cubre escala economica, historia, actores fintech, brechas por pais, constitucion de empresas extranjeras, objetivos gubernamentales, cultura, y donde los operadores aun pueden ganar.',
  category: 'Market maps',
  market: 'Asia-Pacific',
  publishedAt: '2026-08-18',
  updatedAt: '2026-08-18',
  readMinutes: 42,
  heroImage: { src: '/reports/asia-pacific-hero.png', alt: 'Puerto y skyline de Hong Kong a la hora dorada, hub comercial y financiero de Asia Pacifico', caption: 'Comercio, liquidacion y densidad urbana en una region que liquida una parte desproporcionada de la actividad global a traves de muchos sistemas nacionales.' },
  heroStat: { label: 'Volumen diario APAC', value: '$13.17T', delta: '43% del stack diario global', tone: 'up' },
  metrics: [
    { label: 'PIB combinado', value: '$43.12T', delta: '37% del mundo', tone: 'flat' },
    { label: 'Poblacion', value: '4.7B', delta: '60% del mundo', tone: 'flat' },
    { label: 'Volumen diario', value: '$13.17T', delta: '43% del global', tone: 'up' },
    { label: 'Mercado fintech', value: '$167.7B', delta: 'Hacia 348B$ para 2031', tone: 'up' },
  ],
  keyTakeaways: [
    'Asia Pacifico ya es el centro: 43,12T$ de PIB, 13,17T$ de volumen diario, 4,7 mil millones de personas. Son doce mercados o mas, no uno solo.',
    'Los gobiernos construyeron los rieles (UPI, PromptPay, PayNow, BI FAST, QRIS, DuitNow). La fintech construye encima. La conexion transfronteriza aun falta.',
    'El capital comprobado sigue a las super apps, BNPL, bancos digitales y finanzas embebidas de e commerce. El upside no comprobado esta en PyME transfronterizo, financiamiento de cadena de suministro, integracion de rieles, tokenizacion y credito alternativo.',
    'China es madura por dentro y restringida en outbound. Singapur y Hong Kong siguen siendo los hubs mas limpios. El Sudeste Asiatico e India llevan la historia de crecimiento e inclusion.',
  ],
  overview: 'Este informe recorre Asia Pacifico como mapa para operadores: escala y produccion, como la region se convirtio en el centro, quien juega en fintech, donde estan las brechas por pais, como se constituyen los extranjeros, que quieren gobiernos y mercados, como difiere la cultura, y que significa eso para constructores, inversores y corporaciones.',
  findings: [
    {
      title: 'Asia es el mercado, no una mision secundaria',
      body: 'Un PIB combinado cerca de 43T$ y un volumen diario cerca de 13T$ significan que los operadores que tratan Asia como opcional ya llegan tarde.',
      stat: { value: '$43.12T', label: 'PIB nominal' },
      compareStats: [{ value: '$13.17T', label: 'Volumen diario' }],
    },
    {
      title: 'Los gobiernos construyeron los rieles',
      body: 'UPI, PromptPay, PayNow, BI FAST, QRIS y DuitNow democratizan la infraestructura. Las empresas compiten en experiencia y credito, no en poseer el switch.',
      stat: { value: 'Rieles publicos', label: 'Infraestructura publica' },
      compareStats: [{ value: 'UX fintech', label: 'Construido encima' }],
    },
    {
      title: 'Lo transfronterizo es la ultima frontera',
      body: 'Los rieles instantaneos domesticos funcionan. Conectarlos, no. Los pagos transfronterizos PyME y el financiamiento de cadena de suministro siguen rotos a escala.',
      stat: { value: '$15.8T', label: 'Mercado XB PyME' },
      compareStats: [{ value: '$415B', label: 'SCF Asia' }],
    },
    {
      title: 'Los modelos comprobados ya tienen capital',
      body: 'Super apps, BNPL, bancos digitales y credito e commerce estan financiados. El capital nuevo gana en las brechas no comprobadas.',
      stat: { value: 'Clase Grab', label: 'Comprobado' },
      compareStats: [{ value: 'XB / SCF', label: 'Brechas abiertas' }],
    },
  ],
  sections: [
    {
      heading: 'Asia Pacifico es el centro economico del mundo',
      body: 'La region Asia Pacifico no es solo grande. Es el centro economico del mundo. Sin embargo, muchos operadores fuera de esta region aun no comprenden del todo lo que eso significa operacionalmente.',
      paragraphs: [
        'El PIB combinado se situa en 43,12 billones de dolares nominales y 102,71 billones en paridad de poder adquisitivo. El volumen transaccional diario es de 13,17 billones. Eso es 37% del PIB mundial y 43% del volumen transaccional diario global. Poblacion: 4,7 mil millones de personas, 60% del mundo.',
        'Si Asia Pacifico fuera un solo pais, seria la economia mundial por un margen masivo. Pero no es un pais. Son doce mercados distintos o mas, cada uno con regulaciones, infraestructura de pagos y trayectorias de crecimiento diferentes.',
      ],
      pullQuote: 'Esta no es una region con potencial. Es una region que ya produce a una escala que empequeñece a la mayoria de las naciones desarrolladas.',
    },
    {
      heading: 'Donde produce Asia',
      body: 'La profundidad de la produccion en esta region es asombrosa.',
      paragraphs: [
        'China produce por si sola mas de 6 billones de dolares en volumen transaccional diario. Fabrica aproximadamente el 28% de todos los bienes globales. Semiconductores, electronica, textiles, quimicos: China es el piso de fabrica del mundo. Sin embargo, con toda esa produccion, la innovacion fintech no ha igualado la escala.',
        'Japon maneja 800 mil millones de dolares diarios en transacciones y alberga el tercer mercado bursatil mas grande del mundo, el Nikkei 225. Fue pionero en manufactura avanzada, robotica y excelencia automotriz.',
        'India procesa 13 mil millones de transacciones al mes solo a traves de UPI (Unified Payments Interface). Se esta convirtiendo en el back office de las empresas tech globales y alberga el ecosistema de startups de mayor crecimiento del mundo.',
        'Indonesia produce electronica, aceite de palma, textiles y materias primas. Tiene 278 millones de personas, la 4a poblacion mas grande del mundo. Su ecosistema fintech es el de mayor crecimiento en el Sudeste Asiatico.',
        'Vietnam se esta convirtiendo en la alternativa a China para la manufactura. Captura cadenas de suministro desplazadas por las tensiones comerciales Estados Unidos China. Tailandia es un hub comercial regional, centro manufacturero y potencia turistica, con mas de 35 millones de visitantes internacionales al año. Singapur es el hub financiero del Sudeste Asiatico, con 383 mil millones de dolares en trading FX diario. Corea del Sur es lider en semiconductores y vehiculos electricos, con Samsung y Hyundai como potencias globales.',
      ],
    },
    {
      heading: 'Una historia rapida: como Asia se convirtio en el centro',
      body: 'Para entender donde esta Asia ahora, hay que entender de donde vino.',
      paragraphs: [
        'Durante la mayor parte del siglo XX, Asia no era el centro financiero. El mundo occidental lo era. Europa y America del Norte controlaban el comercio, la finanza y la innovacion globales. Las economias asiaticas en desarrollo eran sobre todo proveedoras de materias primas y mano de obra barata para empresas occidentales. Los sistemas de pago, los bancos, las bolsas: todo bajo control occidental.',
        'El cambio ocurrio gradualmente y luego de golpe. En los años 1970 y 1980, Japon emergio como potencia manufacturera. En los años 1990, era la segunda economia del mundo. En los años 2000, China se abrio y comenzo a capturar la manufactura global. Para 2010, Asia se habia convertido en la fabrica del mundo. Para 2020, tambien se convirtio en el centro financiero del mundo.',
      ],
    },
    {
      heading: 'La trayectoria de crecimiento y el salto digital',
      body: 'La participacion en el PIB subio de forma constante. El verdadero punto de inflexion fue la transformacion digital.',
      paragraphs: [
        'De 2000 a 2010, la participacion de Asia en el PIB global paso de 20% a 30%. De 2010 a 2020 crecio de 30% a 35%. De 2020 a 2026 alcanzo 37% y sigue creciendo.',
        'Pero el verdadero punto de inflexion no fue el crecimiento del PIB. Fue la transformacion digital. Cuando llegaron los smartphones, Asia no solo los adopto. Dio un salto por encima de la banca tradicional. India construyo UPI, un sistema de pagos en tiempo real respaldado por el gobierno. China construyo Alipay y WeChat Pay, cubriendo mas del 90% de las transacciones en linea. El Sudeste Asiatico construyo sistemas de pago instantaneo en cada pais: PromptPay, PayNow, QRIS y mas.',
        'Occidente aun dependia de tarjetas de credito y banca tradicional. Asia paso a pagos nativos digitales de la noche a la mañana.',
      ],
      table: {
        columns: ['Periodo', 'Participacion de Asia en el PIB global'],
        rows: [
          ['2000 a 2010', '20% a 30%'],
          ['2010 a 2020', '30% a 35%'],
          ['2020 a 2026', 'Alcanzo 37% y en alza'],
        ],
      },
    },
    {
      heading: 'Hacia donde apunta Asia ahora',
      body: 'Los gobiernos de la region tienen objetivos explicitos. La tecnologia financiera ya no es un nice to have. Es una estrategia nacional.',
      paragraphs: [
        'India apunta a la inclusion financiera digital para mas de 500 millones de personas no bancarizadas. Vietnam apunta al estatus de hub de cadena de suministro capturando manufactura desplazada de China. Indonesia apunta al liderazgo fintech y al estatus unicornio para multiples startups. Tailandia apunta al estatus de hub de pagos regional, haciendo de PromptPay el estandar para ASEAN. Singapur apunta al estatus de hub de innovacion crypto y blockchain como estrategia gubernamental explicita. China apunta a la dominancia tech domestica mas la integracion financiera de Belt and Road, exportando el yuan. Japon apunta a un pivote demografico mediante automatizacion, robotica y fintech institucional.',
      ],
      pullQuote: 'La tecnologia financiera ya no es un nice to have. Es una estrategia nacional.',
    },
    {
      heading: 'Opciones fintech: los grandes jugadores y sus volumenes',
      body: 'Quien juega, quien no, y quien ya es infraestructura.',
      paragraphs: [
        'En China, Alipay toma 50 a 55% de las transacciones digitales chinas y WeChat Pay 35 a 40%. Combinados, tienen mas del 90% de dominancia. El volumen diario que manejan es dificil de cuantificar con precision, pero las estimaciones rondan 2 a 3 billones de dolares diarios solo en China. No son startups. Son infraestructura. Alipay se sitúa en el ecosistema Alibaba. WeChat Pay en Tencent. Funcionan como rieles de pago ya maduros.',
        'En India, UPI procesa 13 mil millones de transacciones al mes, cerca del 57% de todas las transacciones indias, alcanza a mas de 500 millones de la poblacion antes no bancarizada, y es sin comision y construido por el gobierno. El volumen diario se situa cerca de 1,5 billones de dolares. UPI es unico. No es una empresa. Es un sistema de pago publico sobre el que cualquier fintech puede construir. La arquitectura fuerza la innovacion en lugar de la consolidacion.',
        'En el Sudeste Asiatico, los rieles de pago instantaneo publicos incluyen PromptPay en Tailandia (liquidacion instantanea 24/7, gratis), PayNow en Singapur (tiempo real, vinculado a telefono o ID), BI FAST en Indonesia (sistema instantaneo del banco central), DuitNow en Malasia (liquidacion tiempo real 24/7), e InstaPay y PESONet en Filipinas. El volumen diario combinado se situa cerca de 1,2 billones de dolares. Los gobiernos construyen los rieles. La fintech construye la experiencia del consumidor encima. Eso democratiza la infraestructura de pagos.',
      ],
      table: {
        columns: ['Mercado', 'Riel o jugador', 'Señal'],
        rows: [
          ['China', 'Alipay y WeChat Pay', 'Dominancia digital 90%+'],
          ['India', 'UPI', '13B transacciones al mes'],
          ['Tailandia', 'PromptPay', 'Instantaneo gratis 24/7'],
          ['Singapur', 'PayNow', 'Tiempo real telefono o ID'],
          ['Indonesia', 'BI FAST', 'Instantaneo banco central'],
          ['Malasia', 'DuitNow', 'Tiempo real 24/7'],
          ['Filipinas', 'InstaPay y PESONet', 'Tiempo real mas batch'],
        ],
      },
    },
    {
      heading: 'Las fintechs en escala',
      body: 'Super apps, bancos digitales, BNPL y credito e commerce son donde el crecimiento ya se compone.',
      paragraphs: [
        'Las super apps combinan pago y ecosistema. Grab en el Sudeste Asiatico hace ride hailing mas pagos mas servicios financieros. Gojek en Indonesia corre un modelo similar. Kakao en Corea del Sur combina pago, social y comercio. Momo en Vietnam es un wallet mas ecosistema con mas de 50 millones de usuarios.',
        'Los bancos digitales escalan rapido. Tonik Bank en Filipinas alcanzo 2 millones de usuarios en 3 años, el banco digital de mayor crecimiento en el Sudeste Asiatico. Kakao Bank en Corea del Sur tiene mas de 40 millones de usuarios con servicios bancarios completos. Jago en Indonesia es un neobanco que alcanza millones. OCBC Digital Bank cubre Singapur y la region mas amplia.',
        'BNPL (Buy Now Pay Later) incluye Kredivo en Indonesia, Fintech en Filipinas y Atome en cinco paises. El tamaño de mercado se estima cerca de 450 mil millones de dolares a nivel global con cerca de 25% de crecimiento anual.',
        'En prestamos y credito, las plataformas e commerce que originan prestamos PyME (Tokopedia, Shopee en Indonesia, Lazada en el Sudeste Asiatico) originan mas prestamos PyME que los bancos tradicionales. Usan datos de transaccion en lugar de burós de credito.',
      ],
      bullets: [
        'Super apps: Grab, Gojek, Kakao, Momo',
        'Bancos digitales: Tonik, Kakao Bank, Jago, OCBC Digital',
        'BNPL: Kredivo, Fintech, Atome',
        'Credito e commerce: Tokopedia, Shopee, Lazada superan a los bancos en prestamos PyME',
      ],
    },
    {
      heading: 'Quien esta desatendido: las brechas',
      body: 'Los rieles domesticos van adelante. Lo transfronterizo, el financiamiento de cadena de suministro y el credito thin file no.',
      paragraphs: [
        'Los pagos transfronterizos PyME se situan cerca de un mercado anual de 15,8 billones de dolares, y las soluciones actuales estan todas rotas. Las cartas de credito cuestan 1 a 3%, tardan 3 a 5 dias y requieren estatus Fortune 500 para acceder. Alibaba Trade Assurance solo funciona en Alibaba con liquidacion de 1 a 2 dias. La transferencia bancaria es rapida pero sin proteccion contra fraude. PayPal cobra 4 a 5% de comisiones y no esta oficialmente soportado en muchos paises asiaticos. Nadie ha resuelto esto a escala.',
        'El financiamiento de cadena de suministro para PyME es un mercado de 415 mil millones de dolares en Asia con crecimiento de cerca del 7% anual. Hoy funciona sobre todo para Fortune 500. Lo que se necesita es financiamiento digital de cadena de suministro que funcione para empresas manufactureras de 50 personas.',
        'El B2B transfronterizo entre paises asiaticos sigue fragmentado. UPI, PromptPay, PayNow, QRIS y DuitNow existen pero no se conectan entre si. Project Nexus debia resolver esto pero sigue lento. El impacto: mas de 1,2T$ en volumen diario del Sudeste Asiatico permanece ineficiente.',
        'La tokenizacion inmobiliaria esta emergiendo. El inmobiliario iliquido en Vietnam, Bali y Filipinas abre espacio para propiedad fraccionada via blockchain con inversiones de 5K$ en lugar de un requisito de 500K$. El scoring de credito alternativo ya funciona por piezas: mas de 500 millones de no bancarizados no tienen historial crediticio, sin embargo las plataformas e commerce de Indonesia ya originan mas prestamos que los bancos usando datos e commerce, pagos moviles y facturas de servicios, aunque aun no a escala optima.',
      ],
      pullQuote: 'Nadie ha resuelto los pagos transfronterizos PyME a escala. Esa brecha sigue abierta.',
    },
    {
      heading: 'Paises ocultos con potencial',
      body: 'La mayor parte del financiamiento fintech fluye a China, India, Singapur y Vietnam. Poblacion mas demanda desatendida en otros lugares aun espera.',
      paragraphs: [
        'Filipinas tiene cerca de 120 millones de personas jovenes, en crecimiento y de habla inglesa. Tonik Bank alcanzo 2 millones de usuarios en 3 años. GCash tiene mas de 92 millones de wallets. La brecha: un hub BPO que necesita mejores pagos transfronterizos para 1,3 millones de trabajadores que envian remesas, mas financiamiento de cadena de suministro para PyME proveedoras de empresas globales.',
        'Pakistan tiene cerca de 230 millones de personas y acaba de pasar de una prohibicion crypto a un marco regulado en 2026. La brecha es inclusion financiera digital y pagos transfronterizos. Bangladesh tiene cerca de 170 millones de personas. bKash domina el mobile money con mas de 100 millones de usuarios. La brecha es pagos laborales transfronterizos y financiamiento de cadena de suministro para el mayor hub de manufactura de prendas del mundo.',
      ],
    },
    {
      heading: 'China: riqueza atrapada, transfronterizo roto',
      body: 'China produce mas de 6 billones de dolares diarios en volumen transaccional. El crypto esta prohibido. SAFE restringe la salida de dinero. La brecha es el outbound.',
      paragraphs: [
        'La paradoja: China produce un volumen diario enorme, sin embargo el crypto esta totalmente prohibido, los controles de capital restringen la salida de dinero, los pagos RMB transfronterizos requieren aprobacion gubernamental, y las empresas fintech enfrentan un escrutinio gubernamental creciente.',
        'Una pequena porcion del volumen diario de China es masiva. China exporta mas de 3,5 billones de dolares al año. Las PyME que importan de China enfrentan 5 a 10% de costos ocultos via comisiones, markup FX y demoras. Metodos actuales: carta de credito (cara, lenta), Alibaba Trade Assurance (restringida), transferencia bancaria (riesgosa).',
        'Lo que se necesita es un hub de plataforma unica para importadores PyME que maneje seguridad de pagos (escrow), FX con spreads ajustados, liquidacion en dias y no en semanas, y verificacion de proveedores. Por que no se ha construido: la friccion regulatoria mas los controles de capital dificultan mover dinero internacionalmente. La infraestructura de pagos interna de China es madura. La brecha es el outbound, sacar dinero para pagos transfronterizos.',
      ],
    },
    {
      heading: 'India: oro fintech, plata no bancarizada',
      body: 'UPI domina. Lo transfronterizo, remesas, comercio B2B y financiamiento de cadena de suministro para PyME siguen rotos.',
      paragraphs: [
        'Lo que funciona: UPI a 13 mil millones de transacciones al mes, mas de 500 millones de personas con acceso digital, plataformas de prestamo fintech que originan volumenes masivos, y un ecosistema startup en auge en Bengaluru y Mumbai.',
        'Lo que esta roto: pagos transfronterizos aun caros y lentos (los bancos cobran 1 a 3% por transferencia transfronteriza); remesas, con India recibiendo mas de 120 mil millones de dolares al año por metodos caros; pagos B2B de comercio aun en banca legacy; financiamiento de cadena de suministro que apenas existe para proveedores PyME.',
        'Quien esta desatendido: proveedores agricolas, PyME exportadoras, remitentes de remesas que hoy pagan 2 a 5% de comisiones tipo Western Union, y participantes de la cadena de suministro desde agricultores hasta distribuidores y minoristas. El gobierno quiere expandir UPI a pagos globales (el RBI quiere que UPI rivalice con SWIFT), incluir a mas de 500 millones de no bancarizados, impulsar crecimiento liderado por exportaciones, e integrar blockchain y CBDC.',
        'Tamaño de oportunidad: India tiene 1,45 mil millones de personas. Mas de 500 millones estan no bancarizados. La adopcion de pagos digitales es 57% de las transacciones. El 43% restante en efectivo representa billones en volumen anual aun por digitalizar.',
      ],
    },
    {
      heading: 'Japon: mercado maduro, oportunidad del envejecimiento',
      body: 'Rico, confiable, lento. La fintech que resuelve para usuarios mayores tiene el TAM domestico mas claro.',
      paragraphs: [
        'Lo que funciona: un sistema bancario maduro, instituciones estables, el Nikkei 225 como uno de los mercados bursatiles mas grandes del mundo, y alta penetracion de tarjetas de credito a cerca del 55% de los pagos en linea.',
        'Lo que esta roto: innovacion lenta con banca legacy aun dominante, una poblacion envejecida con menos usuarios fintech jovenes, regulacion conservadora con crypto muy restringido e impuestos individuales de 35 a 45%, y bajo crecimiento cerca de 0,6% del PIB, el mas lento de Asia desarrollada.',
        'Quien esta desatendido: usuarios mayores que necesitan interfaces simples y confiables, usuarios de pagos transfronterizos que aun pagan comisiones bancarias caras, y startups tech en una cultura mas lenta que el Sudeste Asiatico. Japon es rico. El ingreso promedio de los hogares es el mas alto de Asia. Pero tambien envejece. Las empresas fintech que resuelvan para usuarios mayores con claridad, simplicidad y seguridad podrian tener un TAM masivo. El gobierno quiere adopcion tecnologica por los mayores, estatus de hub fintech regional compitiendo con Singapur y Hong Kong, y desarrollo institucional estable en lugar de disrupcion rapida.',
      ],
    },
    {
      heading: 'Hong Kong: puente crypto, escape de controles de capital',
      body: 'Hong Kong es la valvula de escape para la fintech continental y la ruta de liquidacion RMB offshore que evita SAFE.',
      paragraphs: [
        'Lo que funciona: estatus de hub RMB offshore (el CNH es el mas liquido), regulacion crypto friendly mediante el marco ASPI Re, acceso de puerta de entrada a China sin controles de capital continentales, y licencias de banca digital ya emitidas.',
        'Lo que esta roto: riesgo geopolítico alrededor de la autonomia, operaciones caras (costos mas altos del Sudeste Asiatico excepto Singapur), un mercado domestico limitado de solo 7,5 millones de personas, e inmobiliario caro con rendimientos de 2 a 3%.',
        'Quien esta desatendido: empresas crypto que pueden operar aqui pero no en China, exportadores chinos que necesitan liquidacion RMB sin restricciones continentales, e inversores institucionales que necesitan acceso fintech a Asia. Hong Kong es la valvula de escape para la fintech continental. Las empresas no pueden operar libremente en China, asi que se basan en Hong Kong. El RMB puede liquidarse offshore sin aprobacion SAFE. Esa es una oportunidad de arbitraje regulatorio. El gobierno quiere innovacion fintech para competir con Singapur, liderazgo en regulacion crypto incluyendo licencias de stablecoin, e internacionalizacion del RMB.',
      ],
    },
    {
      heading: 'Singapur: hub fintech, refugio caro',
      body: 'Singapur es la rampa de lanzamiento de HQ regional. Cara, pequeña localmente, y aun el mejor plano de control para la expansion en el Sudeste Asiatico.',
      paragraphs: [
        'Lo que funciona: MAS apoya activamente fintech y crypto, cuatro bancos digitales licenciados, licencias de stablecoin emitidas en 2026, mas de 80 tratados fiscales bilaterales que evitan la doble tributacion, y PayNow como sistema de pago instantaneo.',
        'Lo que esta roto: la base de costos mas alta del Sudeste Asiatico, un mercado local pequeño de 5,9 millones de personas, y crecimiento mas lento que los mercados emergentes. Quien esta desatendido: empresas regionales que necesitan expansion en el Sudeste Asiatico en lugar de solo Singapur, y fundadores conscientes del presupuesto que no pueden pagar 3K$ de alquiler mensual.',
        'Singapur es el HQ regional para empresas que apuntan a todo el Sudeste Asiatico. Es caro, pero es la mejor rampa de lanzamiento. Empresas como Grab usan Singapur para expandirse por la region. El gobierno quiere estatus de hub crypto y fintech, desarrollo de rieles de pago regionales via Project Nexus, y sedes de instituciones financieras para wealth management y seguros.',
      ],
    },
    {
      heading: 'Tailandia: hub de pagos, mejores rendimientos inmobiliarios',
      body: 'PromptPay hizo instantaneos los pagos domesticos. Los vecinos transfronterizos y la friccion del Foreign Business Act son los capitulos incompletos.',
      paragraphs: [
        'Lo que funciona: PromptPay 24/7 y gratis, exchanges crypto regulados por la SEC con Bitcoin, Ethereum y Ripple aprobados, un ecosistema super app via Grab y GrabFinance, y dominancia turistica con mas de 35 millones de visitantes anuales.',
        'Lo que esta roto: el Foreign Business Act con 14 sectores restringidos que requieren un socio tailandes, regulaciones complejas con aplicacion inconsistente, PromptPay conectando bancos domesticos pero no lo transfronterizo, y B2B transfronterizo aun en banca legacy.',
        'Quien esta desatendido: turistas que enfrentan friccion de pago, PyME importadoras extranjeras buscando proveedores tailandeses, comercio transfronterizo con vecinos, y participantes de la cadena de suministro desde agricultores hasta exportadores. Tailandia es un hub comercial regional dentro de mas de 1,2T$ de volumen diario del Sudeste Asiatico. La brecha es lo transfronterizo entre Tailandia y Vietnam, Camboya, Laos y Myanmar. El gobierno quiere estatus de hub de pagos regional, pagos digitales turisticos, competitividad manufacturera via financiamiento de cadena de suministro, y sectores incentivados por BOI en VE, semiconductores, robotica y biotech.',
      ],
    },
    {
      heading: 'Indonesia: boom fintech, brechas ocultas',
      body: 'El product market fit a escala ya esta aqui. Los pagos transfronterizos y las remesas son la siguiente brecha.',
      paragraphs: [
        'Lo que funciona: BI FAST, plataformas e commerce (Tokopedia, Shopee) originando mas prestamos que los bancos, super apps (Grab, Gojek), bancos digitales (Jago, Ajaib, Kredivo en escala), plataformas BNPL, y 278 millones de personas como la 4a poblacion mas grande del mundo.',
        'Lo que esta roto: burocracia con regulaciones complejas y aplicacion inconsistente, un marco crypto que acaba de pasar de commodities (Bappebti) a productos financieros (OJK) en 2025, infraestructura transfronteriza limitada, y mas de 13B$ en remesas que aun se mueven por canales tradicionales caros.',
        'Quien esta desatendido: trabajadores de textiles y confeccion, cooperativas agricolas, remitentes de remesas en Medio Oriente y Malasia, y visitantes turisticos de Bali que necesitan sistemas de pago integrados. Indonesia es donde la fintech obtiene product market fit a escala. La siguiente brecha es pagos transfronterizos a Malasia, Singapur, Tailandia y Filipinas. El gobierno quiere unicornios fintech, inclusion financiera, financiamiento de cadena de suministro y maduracion de bancos digitales.',
      ],
      image: {
        src: '/reports/asia-pacific-portrait.png',
        alt: 'Vista vertical del puerto y skyline de una ciudad financiera de Asia Pacifico',
        caption: 'La densidad es la constante regional. Cada mercado conserva su propio registro, codigo fiscal y riel de clearing.',
        layout: 'portrait',
      },
    },
    {
      heading: 'Vietnam: hub manufacturero, crecimiento mas rapido',
      body: 'Vietnam se esta convirtiendo en la nueva China para fabricas. La infraestructura fintech no ha alcanzado.',
      paragraphs: [
        'Lo que funciona: captura de cadenas de suministro desplazadas de China, crecimiento economico mas rapido cerca de 7,1% anual, apreciacion inmobiliaria mas rapida cerca de 8 a 15% anual, dominancia de Momo con mas de 50 millones de usuarios de wallet digital, y mas de 200 startups fintech.',
        'Lo que esta roto: infraestructura bancaria aun poniendose al dia, infraestructura de pagos transfronterizos limitada para el comercio, reglas de propiedad de inversion extranjera mejorando pero aun complejas, y concentracion fintech alrededor de Momo mientras otros se mantienen pequeños.',
        'Quien esta desatendido: PyME manufactureras que necesitan financiamiento de cadena de suministro, negocios orientados a exportacion que necesitan rieles transfronterizos, y proveedores de bienes importados que necesitan financiamiento de inventario. La manufactura se esta moviendo aqui desde China. El financiamiento de cadena de suministro y los pagos B2B transfronterizos estan todos subdesarrollados. El gobierno quiere estatus de hub manufacturero, atraccion de inversion extranjera, desarrollo de la economia digital y captura de IED de la guerra comercial con China.',
      ],
    },
    {
      heading: 'Bali: altos rendimientos, riesgo de leasehold',
      body: 'Los rendimientos de alquiler mas altos de Asia desarrollada vienen con riesgo de tenure en leasehold y enfriamiento de la oferta de condominios.',
      paragraphs: [
        'Lo que funciona: 5 a 10% de rendimientos anuales de alquiler inmobiliario, un hub de nomadas digitales con mas de 100K extranjeros viviendo del arbitraje de costo de vida, e infraestructura turistica con mas de 5 millones de visitantes anuales.',
        'Lo que esta roto: los extranjeros no pueden poseer tierra, solo arrendar por 25 a 30 años; sobreoferta de condominios y enfriamiento del mercado en 2025 a 2026; liquidez dificil al vender a otros extranjeros; e incertidumbre regulatoria si cambian las reglas de propiedad.',
        'Quien esta desatendido: inversores inmobiliarios que quieren rendimientos estables a largo plazo pero enfrentan riesgo de leasehold, la comunidad expat que necesita vivienda e infraestructura de pagos, y turistas que necesitan mejores pagos digitales. Tokenizar inmobiliario y propiedad fraccionada via blockchain puede repartir el riesgo de leasehold entre muchos inversores.',
      ],
    },
    {
      heading: 'Malasia: estable, subestimada',
      body: 'Cinco bancos digitales y DuitNow hacen a Malasia mas densa de lo que sugiere la atencion de financiamiento.',
      paragraphs: [
        'Lo que funciona: cinco bancos digitales (los mas en ASEAN), DuitNow, gobierno y regulaciones estables, y estatus de centro financiero ASEAN. Lo que esta roto: crecimiento fintech mas lento que Indonesia, Filipinas o Vietnam; mas cara que Vietnam y menos innovadora que Singapur; y menos atencion de financiamiento en general.',
        'Quien esta desatendido: PyME que necesitan infraestructura de pagos transfronterizos, trabajadores extranjeros que necesitan soluciones de remesas, y traders transfronterizos que necesitan integracion con rieles ASEAN. Malasia es estable pero subestimada. La integracion ASEAN es real aqui. Las empresas enfocadas en pagos regionales podrian usar Malasia como base.',
      ],
    },
    {
      heading: 'Corea del Sur: potencia tech, fintech conservadora',
      body: 'Kakao Bank y Toss prueban la banca digital a decenas de millones de usuarios. El impuesto domestico y la cautela empujan la ambicion hacia afuera.',
      paragraphs: [
        'Lo que funciona: Kakao Bank con mas de 40 millones de usuarios, Toss Bank como lider de pagos, cerca de 25,47% de CAGR en el segmento neobanca, e infraestructura tech forward. Lo que esta roto: impuesto corporativo de 25 a 27%, regulacion crypto cautelosa, y crecimiento mas lento que los mercados emergentes.',
        'Quien esta desatendido: negocios transfronterizos que necesitan fintech regional, y PyME exportadoras que necesitan infraestructura de pagos internacionales. Corea del Sur es tech forward pero cara. Las empresas aqui se enfocan en expansion regional hacia el Sudeste Asiatico mas que en saturacion domestica.',
      ],
    },
    {
      heading: 'Taiwan: potencia de semiconductores, riesgo geopolitico',
      body: 'TSMC es el hecho estrategico. La fintech esta menos desarrollada que en Singapur, Hong Kong o el Sudeste Asiatico.',
      paragraphs: [
        'Lo que funciona: TSMC con cerca del 90% de la fabricacion avanzada de chips a nivel global, un ecosistema tech fuerte, y desarrollo de banca digital. Lo que esta roto: riesgo geopolitico por tensiones con China, altos requisitos de capital, y setup lento (2 a 4 meses para registro de empresa versus Singapur en minutos).',
        'Quien esta desatendido: negocios crypto en un marco aun en desarrollo, y comercio tech transfronterizo. El financiamiento de cadena de suministro para comercio de semiconductores esta desatendido.',
      ],
    },
    {
      heading: 'Filipinas: poblacion joven, alto impuesto, hub BPO',
      body: 'La poblacion mas joven lista para fintech del Sudeste Asiatico, densidad GCash y escala BPO bajo topes de propiedad e impuesto nominal alto.',
      paragraphs: [
        'Lo que funciona: mas de 120 millones de jovenes, Tonik Bank a 2 millones de usuarios en 3 años (banco digital de mayor crecimiento en la region), GCash a mas de 92 millones de usuarios de wallet digital, un hub BPO con mas de 1,3 millones de trabajadores manejando operaciones de EE.UU. y UE, y cerca de 5,7% de crecimiento economico.',
        'Lo que esta roto: el impuesto corporativo mas alto de Asia a 37% en el marco fuente, topes de propiedad extranjera y sectores restringidos, y regulaciones complejas a traves de multiples agencias. Quien esta desatendido: trabajadores BPO que necesitan rieles de remesas transfronterizas, PyME exportadoras que necesitan infraestructura de pagos internacionales, y una poblacion joven con alta penetracion de smartphones pero banca tradicional limitada.',
        'Filipinas tiene la poblacion mas joven lista para fintech del Sudeste Asiatico. Tonik demostro que la banca digital puede escalar rapido. La brecha es pagos transfronterizos para 1,3 millones de trabajadores BPO y para PyME exportadoras. El gobierno quiere unicornios fintech, madurez de banca digital, inclusion financiera y soporte de pagos a la industria BPO.',
      ],
    },
    {
      heading: 'Constituirse como extranjero: los setups rapidos',
      body: 'Singapur, Hong Kong, Vietnam y Tailandia estan en la banda de dos a ocho semanas cuando los tramites estan limpios.',
      paragraphs: [
        'Singapur: cerca de 15 minutos en linea por aproximadamente 600$. Literalmente el mas rapido de la Tierra. Puede incorporarse desde cualquier lugar sin visitar. El ID fiscal es automatico. La cuenta bancaria se abre en 5 a 7 dias. Ideal para crypto y HQ fintech regional e infraestructura de pagos.',
        'Hong Kong: 2 a 3 semanas por cerca de 1.200$. Muy rapido, segundo lugar. No se requiere arrendamiento de oficina (reenvio de correo OK). Companies Registry procesa rapido. Ideal para puerta de entrada a China, crypto y operaciones regionales.',
        'Vietnam: 6 a 10 semanas por 1.500$ a 3.500$. Sistema en linea ahora disponible. Mas simple que Tailandia o Indonesia. Se necesita un contador familiarizado con negocios extranjeros. Ideal para manufactura y trabajo de hub de cadena de suministro.',
        'Tailandia: 4 a 8 semanas por 1.500$ a 3.000$. Relativamente sencillo, con complicaciones del Foreign Business Act (solucion alternativa: Board of Investment). La apertura de cuenta bancaria es lenta a 4 a 8 semanas y es el cuello de botella. Ideal para hub regional, inversion inmobiliaria y turismo.',
      ],
    },
    {
      heading: 'Setups medios y complejos',
      body: 'Indonesia, Filipinas, Malasia, Taiwan y Corea estan en el medio. China, India y Japon cargan con mas friccion.',
      paragraphs: [
        'Indonesia toma 8 a 12 semanas y 2.500$ a 5.000$, con multiples agencias, registro de extranjero y mas burocracia que el promedio del Sudeste Asiatico. La Positive Investment List ahora permite 100% de propiedad extranjera desde 2021. Ideal para fintech, manufactura y presencia local. Filipinas toma 20 a 35 dias y 1.000$ a 2.000$, de hecho bastante rapido, pero aplican restricciones de Foreign Investment Negative List y un capital minimo de 200K$ para mas de 40% de propiedad extranjera. Ideal para banca digital, servicios BPO y el mercado joven. Malasia toma 4 a 8 semanas y 1.000$ a 1.800$. Taiwan puede incorporarse en 2 a 4 semanas en el papel, pero el ARC se estira 2 a 4 meses. Corea del Sur toma 4 a 6 semanas y 1.500$ a 3.000$ con capital minimo cerca de KRW 10M (cerca de 8.000$).',
        'China toma 8 a 12 semanas para servicios y 4 a 6 meses para manufactura a 6.500$ a 8.500$. WFOE es el estandar. Se requiere aprobacion SAMR. La apertura de cuenta bancaria toma 4 a 8 semanas. Los controles de capital restringen la repatriacion (6 a 8 semanas por transaccion, puede denegarse). El verdadero desafio es sacar el dinero, no entrar. India toma 6 a 8 semanas y 1.500$ a 2.500$, requiere un director residente en India (presencia 182+ dias el año anterior), usa presentacion digital MCA (SPICe+), y necesita multiples registros fiscales. Japon toma 4 a 6 semanas y 2.000$ a 4.500$ con notarizacion, banca lenta y registros en multiples agencias.',
      ],
      bullets: [
        'Comun a todos: apostilla o notarizacion, deposito de capital, registro fiscal, registro de empleador si hay contratacion, verificacion de direccion, banca corporativa (a menudo el paso mas lento), y licencias sectoriales si se requieren',
      ],
      table: {
        columns: ['Mercado', 'Plazo', 'Marco de costo', 'Ideal para'],
        rows: [
          ['Singapur', 'Minutos a dias', 'Cerca de 600$', 'Crypto, HQ fintech'],
          ['Hong Kong', '2 a 3 semanas', 'Cerca de 1.200$', 'Puerta China, crypto'],
          ['Vietnam', '6 a 10 semanas', '1.500$ a 3.500$', 'Hub manufacturero'],
          ['Tailandia', '4 a 8 semanas', '1.500$ a 3.000$', 'Turismo, inmobiliario'],
          ['Indonesia', '8 a 12 semanas', '2.500$ a 5.000$', 'Fintech, presencia local'],
          ['Filipinas', '20 a 35 dias', '1.000$ a 2.000$', 'Banca digital, BPO'],
          ['Malasia', '4 a 8 semanas', '1.000$ a 1.800$', 'Hub ASEAN'],
          ['China', '8 a 12 semanas+', '6.500$ a 8.500$', 'Manufactura, largo plazo'],
          ['India', '6 a 8 semanas', '1.500$ a 2.500$', 'Tech, fintech'],
          ['Japon', '4 a 6 semanas', '2.000$ a 4.500$', 'Tech establecida'],
        ],
      },
    },
    {
      heading: 'Lo que quieren los gobiernos',
      body: 'Los objetivos gubernamentales son explicitos. La fintech es estrategia.',
      table: {
        columns: ['Pais', 'Estrategia explicita'],
        rows: [
          ['India', 'Inclusion financiera digital para 500M no bancarizados; UPI como estandar global'],
          ['Vietnam', 'Hub de cadena de suministro capturando desde China'],
          ['Indonesia', 'Creacion de unicornios fintech; inclusion para 278M personas'],
          ['Filipinas', 'Madurez de banca digital; soporte BPO; innovacion fintech'],
          ['Tailandia', 'Hub de pagos regional; sectores incentivados por BOI'],
          ['Singapur', 'Estatus de hub crypto y blockchain'],
          ['Hong Kong', 'Innovacion fintech y crypto; internacionalizacion del RMB'],
          ['Taiwan', 'Ecosistema tech y cadena de suministro de semiconductores'],
          ['Corea del Sur', 'Madurez del ecosistema fintech; estatus de hub regional'],
          ['China', 'Dominancia tech domestica; Belt and Road; exportacion del yuan'],
          ['Malasia', 'Centro financiero ASEAN; liderazgo fintech regional'],
          ['Japon', 'Fintech para poblacion envejecida; fintech institucional'],
        ],
      },
    },
    {
      heading: 'Lo que realmente es la demanda de mercado',
      body: 'Debajo de los objetivos gubernamentales, esto es lo que realmente se financia y se construye.',
      paragraphs: [
        'Los pagos al consumidor son un mercado masivo: super apps, wallets digitales (Momo 50M usuarios, GCash 92M usuarios), plataformas BNPL creciendo cerca de 25% anual, y bancos digitales como Tonik. La demanda del consumidor es conveniencia, velocidad y sin comisiones. Estos mercados ya dejaron atras las tarjetas de credito por pagos digitales instantaneos.',
        'El prestamo PyME es un mercado desatendido enorme. Las plataformas e commerce que originan prestamos PyME estan superando a los bancos tradicionales. Emergen plataformas de financiamiento de cadena de suministro. Las PyME no necesitan branding fintech. Necesitan credito, y lo tomaran de quien pueda verificarlas mas rapido. Los datos de transaccion vencen a un buro de credito.',
        'El comercio transfronterizo esta totalmente roto. Los importadores PyME pagan 5 a 10% de costos ocultos para cobrar desde China. Los remitentes de remesas pagan 2 a 5% de comisiones. La importacion exportacion aun usa banca legacy. La demanda de mercado es velocidad, reduccion de costos y seguridad. Nadie ha resuelto esto a escala.',
        'Los pagos B2B domesticos tienen rieles instantaneos construidos, pero falta la integracion. PromptPay, PayNow, BI FAST, QRIS y DuitNow no se conectan entre si. La demanda de mercado es una API para alcanzar toda ASEAN.',
      ],
    },
    {
      heading: 'Lo que las empresas ya estan construyendo, y lo que no estan obteniendo',
      body: 'Infraestructura de pagos, bancos digitales y prestamos estan saturados. Las verdaderas brechas siguen abiertas.',
      paragraphs: [
        'Ya construyendo: Grab y Gojek como super apps del Sudeste Asiatico; Momo en Vietnam como wallet mas pagos mas prestamos mas inversion; Tonik, Kakao Bank y Jago como bancos digitales; Kredivo, Fintech, Atome y plataformas e commerce como prestamos y credito. Estas empresas buscan talento (subidas de pago de 30 a 40% en 2 años), capital para modelos comprobados, alianzas con bancos, telcos y plataformas e commerce, datos de transaccion y claridad regulatoria.',
        'Lo que no estan obteniendo: infraestructura unificada de pagos transfronterizos para Asia; financiamiento de cadena de suministro que funcione para PyME dentro de un mercado de 415B$ creciendo 7%; credito alternativo para comerciantes thin file mas alla de las plataformas e commerce; tokenizacion inmobiliaria a escala; y productos de cobertura cambiaria para PyME que enfrentan riesgo FX en ambos lados del comercio.',
      ],
      bullets: [
        'Brecha 1: Infraestructura de pagos transfronterizos',
        'Brecha 2: Financiamiento de cadena de suministro para PyME',
        'Brecha 3: Credito alternativo para comerciantes thin file',
        'Brecha 4: Tokenizacion inmobiliaria',
        'Brecha 5: Cobertura cambiaria para PyME',
      ],
    },
    {
      heading: 'Cultura y entorno operativo',
      body: 'Cultura de pagos, cultura de negocios, previsibilidad regulatoria y talento cambian todos segun el mercado.',
      paragraphs: [
        'China es digital native con mas del 90% de transacciones en linea, Alipay y WeChat Pay ubiquitous, efectivo desapareciendo, mentalidad mobile first, y escepticismo hacia los sistemas de pago occidentales. India fue reescrita por UPI; los feature phones bastan; el efectivo sigue significativo al 40 a 50%; la confianza en sistemas gubernamentales es alta; la adopcion de smartphones se acelera. Japon sigue pesado en tarjetas de credito en linea a cerca del 55%, con alta confianza en la banca, efectivo aun respetado cerca del 30%, adopcion digital mas lenta que el Sudeste Asiatico, y usuarios mayores que necesitan simplicidad.',
        'El Sudeste Asiatico (Tailandia, Vietnam, Indonesia, Filipinas) es digital first y mobile first, nativo de super apps, con efectivo en declive del 30 al 50% segun el pais, habiendo saltado por completo las tarjetas de credito, y edades medianas jovenes entre los veinte y treinta. Singapur y Hong Kong son plenamente digitales, multi divisa, los mas rapidos en adoptar nueva fintech, crypto aware (Singapur el mas), y priorizan velocidad y seguridad.',
        'Cultura de negocios: China valora velocidad y guanxi con cumplimiento creciente y normas de vigilancia aceptadas. India es intensiva en papeleo pero se digitaliza, con ventaja de habla inglesa. El Sudeste Asiatico es basado en relaciones con gobierno menos intrusivo que China e ingles desigual (Filipinas el mas fuerte). Singapur, Hong Kong, Japon y Corea del Sur son basados en procesos, documentacion esencial, basados en reglas, e ingles ampliamente hablado.',
      ],
    },
    {
      heading: 'Previsibilidad regulatoria y talento',
      body: 'Donde las reglas son claras, y donde realmente esta el talento.',
      paragraphs: [
        'Mas predecibles: Singapur, Hong Kong, Japon, Corea del Sur. Moderadamente predecibles: Tailandia, Malasia, Taiwan. Menos predecibles: Vietnam, Indonesia, Filipinas, China, India.',
        'Mejor talento tech: India (Bengaluru, Hyderabad), China (Shanghai, Beijing, Shenzhen), Singapur (limitado pero premium). Mejor talento operativo: hub BPO Filipinas con mas de 1,3 millones de trabajadores experimentados de habla inglesa, y back office India. Mejores fundadores de startups: concentracion fintech Singapur, fundadores crypto Hong Kong saliendo de restricciones chinas, nueva generacion de fundadores Vietnam, y precedente de super apps Indonesia.',
      ],
      bullets: [
        'Mas predecibles: Singapur, Hong Kong, Japon, Corea del Sur',
        'Menos predecibles: Vietnam, Indonesia, Filipinas, China, India',
        'Talento: India y China para tech; Filipinas para ops BPO; Singapur y Hong Kong para fundadores y HQ',
      ],
    },
    {
      heading: 'La escala y los puntos de inflexion',
      body: 'El volumen transaccional diario de Asia Pacifico es 13,17 billones de dolares, cerca del 43% del stack mundial de 35T$ diarios. El tamaño del mercado fintech se situa cerca de 167,71 mil millones de dolares en 2026, creciendo hacia 348,1B$ para 2031.',
      paragraphs: [
        'El PIB de Asia es 43,12 billones de dolares, cerca del 37% de un marco global de 116T$. La poblacion es 4,7 mil millones, 60% del mundo. Traduccion: Asia no es un mercado a explorar. Es el mercado. Tiene aproximadamente 10x la oportunidad fintech de Europa o EE.UU. por escala.',
        'La adopcion de pagos digitales paso de infraestructura basica (2000 a 2010), a full digital con Alipay, WeChat y UPI (2010 a 2020), a super apps y pagos instantaneos con PromptPay, PayNow, BI FAST y QRIS (2020 a 2026). Siguiente: integracion de rieles transfronterizos, tokenizacion y credito alternativo a escala.',
        'Los gobiernos pasaron de experimental (2015 a 2020) a all in (2020 a 2026), construyendo rieles de pago, emitiendo licencias crypto y apuntando a unicornios. La fintech es ahora estrategia gubernamental. El capital siguio: VC cauteloso, luego doubling down (valoracion Grab 40B$+, records de financiamiento fintech), luego persiguiendo modelos comprobados en super apps, BNPL y bancos digitales.',
      ],
    },
    {
      heading: 'Modelos comprobados y oportunidades no comprobadas',
      body: 'El dinero sigue modelos comprobados. El capital nuevo aun puede ganar en las brechas no comprobadas.',
      paragraphs: [
        'Comprobado: super apps (Grab, Gojek) combinando ride hailing, pagos y finanzas en un foso defendible; plataformas BNPL (Kredivo, Fintech) con 25% de crecimiento anual y unit economics comprobadas; bancos digitales (Tonik, Kakao) llenando la brecha bancaria para poblaciones jovenes; finanzas embebidas e commerce (Tokopedia, Shopee) usando datos de transaccion para vencer al credito tradicional.',
        'Oportunidades no comprobadas donde el capital nuevo puede ganar: pagos PyME transfronterizos (mercado 15,8T$, nadie resolvio); financiamiento de cadena de suministro para PyME (mercado 415B$, crecimiento 7%, desatendido); integracion de pagos B2B regionales (mas de 1,2T$ diario, rieles fragmentados); tokenizacion inmobiliaria (emergente, sin lideres aun); credito alternativo a escala (el e commerce lo resolvio, el sector tradicional no).',
      ],
      table: {
        columns: ['Oportunidad', 'Marco de mercado', 'Estado'],
        rows: [
          ['Pagos PyME transfronterizos', '15,8T$ anuales', 'Nadie resolvio a escala'],
          ['Financiamiento cadena suministro PyME', '415B$, creciendo 7%', 'Solo Fortune 500'],
          ['Integracion rieles B2B regionales', 'Mas de 1,2T$ diario SE Asia', 'Fragmentado'],
          ['Tokenizacion inmobiliaria', 'Emergente', 'Sin lideres a escala'],
          ['Credito alternativo a escala', 'Mas de 500M thin file', 'Parcial, liderado por e commerce'],
        ],
      },
    },
    {
      heading: 'Las mayores sorpresas en los datos',
      body: 'Cinco hechos que reescriben como los operadores deberian pensar Asia.',
      paragraphs: [
        'La fintech no disrumpio Asia como disrumpio Occidente. Asia salto por completo las tarjetas de credito y fue directo a digital. Esa es una diferencia fundamental de infraestructura.',
        'Los gobiernos construyeron los rieles de pago, no las empresas. UPI, PromptPay, BI FAST, QRIS, PayNow: todos construidos por el gobierno. Eso democratiza la innovacion.',
        'Las plataformas e commerce son los verdaderos disruptores fintech. Vencen a los bancos en prestamos PyME porque tienen los datos de transaccion. Tokopedia, Shopee y Lazada originan mas prestamos PyME que los bancos tradicionales.',
        'Los pagos transfronterizos siguen rotos. A pesar de toda la innovacion, mover dinero entre paises asiaticos sigue siendo caro y lento. Esta es la ultima frontera.',
        'El exito de China tiene fecha de vencimiento para la innovacion fintech abierta. Los controles de capital y la prohibicion crypto significan que la innovacion fintech se mueve a Singapur, Hong Kong y el Sudeste Asiatico. China construyo la infraestructura pero no puede innovar libremente dentro de ella.',
      ],
    },
    {
      heading: 'Lo que esto significa para operadores, inversores y corporaciones',
      body: 'Elija el trabajo. Luego elija el mercado.',
      paragraphs: [
        'Si esta construyendo fintech: elija un mercado con apoyo gubernamental (India, Sudeste Asiatico, Singapur). Evite China salvo que este en manufactura o finanzas institucionales. Elija modelos comprobados (super apps, BNPL, bancos digitales) o brechas masivas desatendidas (transfronterizo, financiamiento de cadena de suministro). El talento es abundante y mas barato en India, Indonesia y Filipinas. La claridad regulatoria importa: Singapur y Hong Kong mejores; Vietnam y Tailandia mas riesgosos.',
        'Si busca invertir: los rendimientos inmobiliarios apuntan a Tailandia (7 a 9%), Bali (5 a 10% con riesgo de leasehold) y Vietnam (2 a 4% de rendimiento actual con 8 a 15% de apreciacion). El crecimiento fintech apunta a Filipinas (modelo Tonik), Indonesia (super apps, BNPL) y Vietnam (mas de 200 startups). Los marcos de retorno bursatil apuntan a Vietnam 12 a 15% anual, India 10 a 14%, con mercados emergentes superando a desarrollados en los rangos de planificacion.',
        'Si es una corporacion en expansion: Singapur es el hub (caro pero eficiente). India es el back office de talento (fuerza laboral masiva, mas barata). El Sudeste Asiatico es el mercado de crecimiento (poblacion joven, subbancarizada). China sigue siendo la fabrica, pero los controles de capital hacen dolorosa la repatriacion.',
      ],
    },
    {
      heading: 'La verdadera oportunidad',
      body: 'Asia no necesita otra empresa global de pagos. Necesita ejecucion sobre las brechas.',
      paragraphs: [
        'Lo que se necesita: integracion transfronteriza conectando PromptPay a PayNow a BI FAST; automatizacion de financiamiento de cadena de suministro que funcione para PyME, no solo Fortune 500; credito alternativo a escala usando datos transaccionales para alcanzar a los no bancarizados; tokenizacion inmobiliaria resolviendo la iliquidez en mercados emergentes; y super apps regionales que muevan dinero a traves de cinco paises o mas.',
        'Estas brechas representan mas de 100B$ en oportunidad de creacion de valor. El capital esta disponible. El talento fintech esta disponible. Los rieles de pago existen. Lo que falta es ejecucion sobre las brechas, no construir una tarjeta de credito mas rapida o una app de pagos.',
      ],
      pullQuote: 'Esta region no esta emergiendo. Ya emergio. La pregunta para los operadores fintech es: que brecha va a llenar?',
    },
  ],
  marketContext: [
    'Asia Pacifico: 43,12T$ de PIB, 13,17T$ de volumen diario, 4,7 mil millones de personas, mercado fintech cerca de 168B$ creciendo hacia 348B$ para 2031.',
    'Los rieles domesticos estan maduros en India y ASEAN. La integracion transfronteriza, el financiamiento de cadena de suministro PyME y el credito thin file siguen abiertos.',
    'Singapur y Hong Kong son ciudades hub. China es escala con friccion outbound. India y el Sudeste Asiatico llevan inclusion y crecimiento.',
    'El capital comprobado sigue super apps, BNPL, bancos digitales y credito e commerce. El upside no comprobado esta en las brechas.',
  ],
  providerLandscape: [
    {
      metric: 'Wallets domesticos China', leader: 'Alipay y WeChat Pay', value: 'Leading', tone: 'up',
      signal: 'Dominancia digital 90%+', note: 'El outbound es la brecha',
    },
    {
      metric: 'A2A publico India', leader: 'UPI', value: 'Leading', tone: 'up',
      signal: '13B transacciones al mes', note: 'Cualquier fintech puede construir encima',
    },
    {
      metric: 'Rieles instantaneos ASEAN', leader: 'PromptPay, PayNow, BI FAST, DuitNow, InstaPay', value: 'Leading', tone: 'up',
      signal: 'Cerca de 1,2T$ diario combinado', note: 'Aun no conectados',
    },
    {
      metric: 'Super apps', leader: 'Grab, Gojek, Kakao, Momo', value: 'Leading', tone: 'up',
      signal: 'Pagos mas ecosistema', note: 'Iman de capital comprobado',
    },
    {
      metric: 'Bancos digitales', leader: 'Tonik, Kakao Bank, Jago', value: 'Gaining', tone: 'up',
      signal: 'Escala poblacion joven', note: 'Aun llenando brechas bancarias',
    },
  ],
  implications: [
    'Trate Asia Pacifico como el mapa de mercado primario, no como una expansion de segundo pensamiento.',
    'Construya sobre rieles gubernamentales en lugar de intentar reemplazarlos.',
    'Gane en pagos PyME transfronterizos, financiamiento de cadena de suministro, integracion de rieles, tokenizacion o credito alternativo.',
    'Use Singapur o Hong Kong como entidades hub salvo que un regulador fuerce lo contrario.',
    'Trate el outbound de China y SAFE como riesgo de producto de primer orden.',
    'Alinee la estrategia de talento al mercado: India y China para tech, Filipinas para ops BPO, Singapur y Hong Kong para HQ.',
    'Siga modelos comprobados para capital de corto plazo, o nombre una brecha no comprobada especifica si quiere espacio en blanco abierto.',
  ],
  closing: 'Esta region no esta emergiendo. Ya emergio. La pregunta para los operadores fintech es: que brecha va a llenar?',
  methodology: 'Analisis profundo de operador que cubre escala Asia Pacifico, historia, panorama fintech, brechas por pais, constitucion extranjera, demanda gubernamental y de mercado, cultura y conclusiones. Las cifras macro y de volumen son inputs direccionales de planificacion. No es asesoramiento legal, fiscal ni de inversion.',
  sources: [
    'Brief de analisis profundo de operador Asia Pacifico (ago 2026)',
    'NPCI UPI; NAPAS; Bank Indonesia BI FAST and QRIS; MAS PayNow; BOT PromptPay; Bank Negara DuitNow; BSP InstaPay and PESONet',
    'Titulares publicos de empresas, impuestos y licencias en los doce mercados',
    'Trackers de industria de pagos APAC, remesas y macro',
  ],
  cta: { title: 'Construyendo en Asia Pacifico?', lede: 'Relay convierte este analisis en shortlists de corredores: economia, entidad, riel y cobertura de proveedores en un solo marco.', label: 'Contactar ventas', href: 'https://calendly.com/gratebridgelabs/30min?month=2026-08' },
  discoverMarket: 'Asia-Pacific',
}
