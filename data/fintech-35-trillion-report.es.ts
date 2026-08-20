import type { DataReport } from './reports'

export const fintech35TrillionReportEs: DataReport = {
  slug: 'fintech-35-trillion-daily',
  title:
    'El mundo procesa más de 35 billones de dólares en transacciones diarias, y la fintech ejecuta más del 10 % de ese volumen, frente a menos del 1 % hace una década',
  seoTitle:
    'La fintech liquida más del 10 % de las transacciones globales diarias de 35 T$ | Relay Research',
  seoDescription:
    'Informe insignia de Relay Research: el volumen de transacciones globales supera los 35 billones de dólares diarios. La fintech ya liquida más del 10 %, frente a menos del 1 % hace una década. Análisis sobre billeteras digitales, pagos instantáneos, remesas y rieles en EE. UU., Europa, África, LatAm y Asia.',
  dek: 'Los volúmenes de transacciones financieras y de mercado globales superan los 35 billones de dólares cada día. La fintech captura ya más del 10 % de ese flujo, frente a menos del 1 % hace una década. Este informe mapea adónde se mueve el dinero, quién lo liquida y qué se construye a continuación.',
  kicker: 'Relay Research · Informe insignia',
  excerpt:
    'El mundo procesa más de 35 billones de dólares en transacciones diarias. La fintech ejecuta ya más del 10 % de ese volumen, frente a menos del 1 % hace una década.',
  category: 'Market maps',
  market: 'Global',
  publishedAt: '2026-08-11',
  updatedAt: '2026-08-11',
  readMinutes: 28,
  heroImage: {
    src: '/reports/fintech-volume-hero.png',
    alt: 'Interfaces fintech y tickers de mercado en vivo en un distrito financiero moderno al atardecer',
    caption:
      'Las interfaces de consumo y la infraestructura de mercado mayorista convergen: la misma pila que liquida un pago en la calle ahora compite por el valor transfronterizo.',
  },
  heroStat: {
    label: 'Participación fintech del flujo diario',
    value: 'Más del 10 %',
    delta: 'Desde menos del 1 % hace una década',
    tone: 'up',
  },
  metrics: [
    {
      label: 'Flujo global diario',
      value: '$35T+',
      delta: 'Pagos + mercados',
      tone: 'flat',
    },
    {
      label: 'Volumen FX (BIS)',
      value: '$7.5T',
      delta: 'Por día',
      tone: 'flat',
    },
    {
      label: 'Participación billeteras e-comm',
      value: '54%',
      delta: '2026',
      tone: 'up',
    },
    {
      label: 'Crecimiento de pagos instantáneos',
      value: '470%',
      delta: '2021 a 2026',
      tone: 'up',
    },
  ],
  cta: {
    title: 'Convierta este mapa en decisiones para sus mercados',
    lede: 'Este informe es una vista sistémica global. Si está expandiéndose hacia billeteras, rieles instantáneos, remesas o corredores FX, Relay le ayuda a traducir el cambio en listas cortas de socios, realidad de comisiones e introducciones, por mercado.',
    label: 'Contactar ventas',
    href: 'https://calendly.com/gratebridgelabs/30min?month=2026-08',
  },
  keyTakeaways: [
    'La fintech liquida más del 10 % de una pila diaria de más de 35 T$ que abarca FX, derivados, pagos minoristas y transferencias institucionales, frente a menos del 1 % hace una década.',
    'Asia, América Latina y África escalaron rieles mobile first con menos bloqueo de la era de tarjetas. Norteamérica aún concentra valor desproporcionado vía tarjetas y el dólar; se queda atrás en velocidad.',
    'Los rieles instantáneos públicos más las apps fintech (Pix, UPI, mobile money) son el patrón que escala. Se prevé que las tarjetas se acerquen al 15 % de las transacciones digitales hacia 2028.',
    'El premio construible es la infraestructura: tesorería B2B, liquidación con stablecoins, plomería de cumplimiento e inteligencia de flujos de pago, más que otra billetera de consumo.',
  ],
  overview:
    'Los volúmenes de transacciones financieras y de mercado globales superan los 35 billones de dólares cada día. No es una sola red minorista: son FX, derivados, pagos de consumo, transferencias B2B y rieles cripto moviéndose en la misma ventana de 24 horas. La fintech liquida ya más del 10 % de ese flujo, frente a menos del 1 % hace una década. La mayoría de las empresas que mueven ese volumen no existían hace quince años. Este informe mapea dónde se sitúan los 35 T$, qué categorías está tomando la fintech, cómo divergen las regiones y dónde se construye la infraestructura a continuación.',
  background:
    'Este informe insignia es amplio a propósito. Los operadores que abren corredores siguen preguntando si la fintech aún «disrumpe» las finanzas o si ya es la capa operativa. Los datos apuntan a lo segundo, de forma desigual por región y por riel. Nos apoyamos en BIS, Capgemini, NPCI, Banco Central do Brasil, monitores de remesas del Banco Mundial e investigación de mercado. Cuando una cifra es direccional o sensible a la definición, lo marcamos.',
  findings: [
    {
      title: 'La fintech liquida ya más de una décima parte del flujo diario global',
      body: 'Hace diez años, las plataformas de pago y de mercado no bancarias estaban por debajo del 1 % de la pila diaria combinada de más de 35 T$. Esa participación supera ya el 10 %. El volumen liquidado cada día por esos rieles supera los sistemas de pago domésticos de la mayoría de los países.',
      stat: {
        value: 'Más del 10 %',
        label: 'Participación fintech del flujo diario',
        compare: 'Desde menos del 1 % hace una década',
      },
      compareStats: [
        { value: '$35T+', label: 'Pila global diaria' },
        { value: '10×', label: 'Aumento de la participación' },
      ],
      whyItMatters:
        'Tratar la fintech como un canal lateral subestima quién ya liquida al cliente.',
    },
    {
      title: 'Las billeteras son el valor por defecto en el comercio digital; las tarjetas no',
      body: 'Las billeteras capturan alrededor del 54 % del valor del e-commerce global en 2026. Las previsiones del sector sitúan la participación de las tarjetas en las transacciones digitales cerca del 15 % hacia 2028, frente a aproximadamente el 21 % en 2023.',
      stat: {
        value: '54%',
        label: 'Participación de billeteras en el valor e-commerce',
        compare: '2026',
      },
      compareStats: [
        { value: '~21%', label: 'Tarjetas, 2023' },
        { value: '~15%', label: 'Tarjetas, 2028e' },
      ],
      whyItMatters:
        'Los modelos de acquiring, fraude y tesorería construidos solo sobre la economía de los esquemas malinterpretan los mercados donde A2A y las billeteras ya dominan el checkout.',
    },
    {
      title: 'El valor de los pagos instantáneos creció casi cinco veces en cinco años',
      body: 'Los rieles en tiempo real se proyectan cerca de 27,7 T$ en 2026, desde unos 4,8 T$ en 2021. Pix y UPI muestran el patrón: un tejido de liquidación público, interfaces fintech privadas y una adopción medida en años, no en décadas.',
      stat: {
        value: '$27.7T',
        label: 'Pagos instantáneos, 2026e',
        compare: 'Desde 4,8 T$ en 2021 (~470 %)',
      },
      compareStats: [
        { value: 'Pix', label: 'Riel masivo de Brasil' },
        { value: 'UPI', label: 'Riel masivo de India' },
      ],
      whyItMatters:
        'El float de fin de semana y las transferencias de varios días dejan de parecer productos cuando el crédito llega en segundos.',
    },
    {
      title: 'La plantilla de crecimiento viene de los mercados emergentes',
      body: 'Pix, UPI y el mobile money africano escalaron sin una capa intermedia de tarjeta de crédito. Los mercados maduros aún concentran la mayor parte del volumen absoluto. Los patrones de producto que viajan se escriben en São Paulo, Bangalore, Lagos y Nairobi.',
      stat: {
        value: '15%+',
        label: 'CAGR de pagos LatAm y África',
        compare: 'Vs ~2–5 % en mercados maduros',
      },
      compareStats: [
        { value: '2–5%', label: 'CAGR mercados maduros' },
        { value: 'ME', label: 'Fuente de la plantilla' },
      ],
      whyItMatters:
        'Las hojas de ruta que exportan la UX de tarjeta de Silicon Valley a los corredores de más rápido crecimiento seguirán fallando en el encaje.',
    },
    {
      title: 'Las stablecoins son una franja delgada de la pila, y la de movimiento más rápido',
      body: 'El flujo de cripto y stablecoins es del orden de 144 mil millones de dólares al día, cerca del 0,4 % de la pila de 35 T$. El crecimiento corre de dos a tres veces el de las categorías de pago tradicionales, con la presión más clara sobre remesas y corredores transfronterizos de pymes.',
      stat: {
        value: '~$144B',
        label: 'Flujo diario cripto / stablecoin',
        compare: '~0,4 % de la pila de 35 T$',
      },
      compareStats: [
        { value: '2–3×', label: 'Vs crecimiento tradicional' },
        { value: 'XB', label: 'Primer punto de presión' },
      ],
      whyItMatters:
        'La economía corresponsal siente primero la presión en las piernas retail y pyme transfronterizas, no en los escritorios mayoristas de FX.',
    },
  ],
  sections: [
    {
      heading: 'La pila de 35 billones: qué se mueve de verdad',
      body: 'Trate los 35 T$ como un compuesto de flujos financieros y de mercado globales en una ventana de 24 horas, no como una sola red tipo ACH. La composición explica por qué la fintech puede poseer las interfaces minoristas mientras los bancos aún dominan los escritorios mayoristas de FX.',
      paragraphs: [
        'El cambio de divisas sigue siendo la mayor franja discreta, con cifras de la encuesta trienal del BIS del orden de 7,5 billones de dólares al día. Los derivados y productos financieros relacionados añaden una capa mayorista comparable. Los pagos minoristas y de consumo, las transferencias B2B y los rieles cripto completan el resto, con estructuras de comisiones, relojes de liquidación y capas regulatorias muy distintas.',
        'La participación de la fintech se concentra donde la UX, la distribución móvil y la liquidación instantánea se refuerzan: billeteras, A2A, remesas y rieles domésticos en tiempo real. Es más delgada donde el FX de balance y los derivados institucionales aún requieren crédito bancario y membresía de clearing.',
      ],
      table: {
        columns: ['Categoría', 'Escala diaria (orden de magnitud)', 'Presión fintech'],
        rows: [
          ['Cambio de divisas', '~$7.5T (BIS)', 'Márgenes y FX pyme primero'],
          ['Derivados y mercados', '~$7–8T', 'Mayormente clearing incumbente'],
          ['Pagos retail y de consumo', '~$5.5T', 'Alta: ganan las billeteras'],
          ['Transferencias B2B e institucionales', '~$5T', 'En alza: herramientas de tesorería'],
          ['Cripto y stablecoins', '~$144B (≈0,4 %)', 'Tasa de crecimiento más rápida'],
        ],
      },
      caption:
        'Composición de orden de magnitud de la pila de flujo diario de más de 35 T$. Las definiciones varían por fuente; úsela para lectura estructural, no para contabilidad precisa.',
      pullQuote:
        'La participación de la fintech se concentra donde la UX, la distribución móvil y la liquidación instantánea se refuerzan. Es más delgada donde el crédito bancario y la membresía de clearing aún marcan la mesa.',
    },
    {
      heading: 'Pagos minoristas: la era de la billetera',
      body: 'La pila de tarjetas (pase, enrutamiento de esquema, control del emisor, comisión comercial del 2–3 %, liquidación T+1–3) está perdiendo la posición por defecto en el comercio digital.',
      paragraphs: [
        'Las billeteras digitales son el método e-commerce global más grande, con aproximadamente el 54 % del valor de las transacciones en 2026 (frente a ~49 % en 2023). En China, las plataformas de billetera dominantes aún concentran la gran mayoría del volumen en línea. En India, UPI se ha convertido en el valor por defecto nacional: los datos de NPCI muestran del orden de 18 mil millones de transacciones mensuales a inicios de 2025, con volúmenes FY25 cercanos a 186 mil millones de transacciones y un crecimiento del valor de ~30 % interanual.',
        'El Pix de Brasil, lanzado a finales de 2020, alcanzó la adopción masiva en cuatro años, con cobertura adulta casi universal, participación e-commerce en torno al 40 % y en alza, y picos de un solo día por encima de 250 millones de transacciones (252,1 millones el 20 de diciembre de 2024). En el Sudeste Asiático, las billeteras locales superan con regularidad en volumen a los esquemas de tarjetas internacionales en el ámbito doméstico.',
        'Las previsiones sitúan el procesamiento por billeteras hacia 3,1 T$ para 2027, varias veces la participación digital tradicional de las tarjetas, mientras la participación de las tarjetas en las transacciones digitales se comprime hacia ~15 % hacia 2028.',
      ],
      bullets: [
        'Se desplaza: comisiones centradas en esquemas, liquidación de varios días, bancos como guardianes exclusivos',
        'Se reemplaza: A2A instantáneo, checkout QR y nativo de app, comisiones de consumo casi nulas en rieles domésticos',
      ],
      bars: [
        { label: 'Billeteras 2026', value: 54, display: '54%' },
        { label: 'Tarjetas 2023', value: 21, display: '21%' },
        { label: 'Tarjetas 2028e', value: 15, display: '~15%' },
        { label: 'Efectivo ahora', value: 8, display: '~8%' },
      ],
      chartTitle: 'Participación de métodos de pago digitales / rastreados (direccional)',
      caption:
        'Las participaciones de billetera y tarjeta reflejan el mix de comercio digital de informes de pagos del sector; la participación de efectivo es el mix transaccional global, bajando desde ~46 % hace una década.',
    },
    {
      heading: 'Transfronterizo: remesas, spreads y rieles de stablecoin',
      body: 'Una remesa de 200 $ hacia el África subsahariana aún promedia aproximadamente un 7–9 % en comisiones, casi 3× el objetivo del 3 % de la ONU. Esa brecha es el brief de producto de los corredores fintech.',
      paragraphs: [
        'Los centros de remesas tradicionales y las transferencias bancarias incorporan opacidad y demora en el producto: comisiones del 5–7 % y crédito de varios días siguen siendo comunes en corredores de consumo. Las apps fintech y, cada vez más, la liquidación con stablecoins comprimen eso hacia dólares de un solo dígito bajo y minutos.',
        'El valor de transferencia de stablecoins ya se mide en billones anuales en los principales tokens vinculados al dólar. La participación de la pila diaria completa de 35 T$ sigue siendo pequeña, pero tasas de crecimiento de 2–3× las categorías tradicionales hacen de esto la amenaza más clara a la economía de la banca corresponsal en piernas retail y pyme transfronterizas.',
        'Las redes de tarjetas se adaptan en el borde (tarjetas vinculadas a cripto y servicios de activos digitales), lo cual es en sí una señal: los esquemas heredados integran rieles fintech en lugar de ignorarlos.',
      ],
      image: {
        src: '/reports/fintech-volume-floor.png',
        alt: 'Piso de trading y muros de datos de mercado en un hub financiero global',
        caption:
          'La infraestructura de mercado mayorista aún concentra FX y derivados. La presión fintech es más fuerte donde esos escritorios nunca sirvieron bien a pymes y corredores de diáspora.',
      },
    },
    {
      heading: 'Pagos en tiempo real: el float muere cuando el dinero se mueve en segundos',
      body: 'El valor de los pagos instantáneos se proyecta cerca de 27,7 T$ hacia 2026 frente a unos 4,8 T$ en 2021. No es un lanzamiento de función: es una reescritura de la física del capital de trabajo.',
      paragraphs: [
        'El régimen de open banking europeo obligó a los bancos a exponer rieles vía API, generando una capa de productos fintech sobre infraestructura abierta por mandato. EE. UU. lanzó en 2023 sistemas en tiempo real respaldados por el gobierno como vía alternativa para facturas y pagos gig, aún tempranos frente a la escala UPI/Pix. Asia y América Latina muestran el patrón maduro: tejido de liquidación público + UX fintech privada.',
        'Cuando un pago B2B de 1 M$ que solía llegar el lunes tras un envío el viernes ahora se liquida en segundos, el float de fin de semana y las tarifas de transferencia dejan de ser un modelo de negocio y pasan a ser un impuesto al cliente.',
      ],
      bullets: [
        'Se desplaza: transferencias T+2, capital atrapado el fin de semana, cadenas corresponsales opacas',
        'Se reemplaza: crédito en 10 segundos, API abiertas, comisiones instantáneas domésticas casi nulas',
      ],
    },
    {
      heading: 'FX y B2B pyme: comiendo los bordes del escritorio',
      body: 'El FX aún liquida del orden de 7,5–9,5 T$ al día y sigue dominado por bancos porque es intensivo en crédito y franquicia. La fintech gana los bordes: pymes que nunca justificaron un escritorio de relación.',
      paragraphs: [
        'Un importador mid-market que enfrenta spreads opacos del 1–3 % en un ticket de payables de 1 M€ es exactamente el cliente que las plataformas FX fintech suscriben con tasas mid-market más una comisión fija. El crédito el mismo día o al siguiente reemplaza flujos de varios días del escritorio.',
        'No es la muerte overnight del FX bancario. Es un desplazamiento permanente de participación en la cola larga de los pagos corporativos, el mismo patrón que las billeteras usaron contra las tarjetas en retail.',
      ],
    },
    {
      heading: 'Mapa de poder regional: dónde se sitúan los 35 T$',
      body: 'El volumen no está distribuido de forma uniforme. Asia-Pacífico y Norteamérica liquidan juntas aproximadamente tres de cada cuatro dólares movidos a nivel global, por razones opuestas.',
      paragraphs: [
        'Asia-Pacífico lidera con aproximadamente el 38 % de la participación en ingresos de transacciones de pago globales y una contribución diaria estimada de ~13 T$ a la pila de flujo: escala poblacional, rieles gubernamentales y adopción nativa fintech. China e India solas redibujan la gravedad de los pagos minoristas; en el Sudeste Asiático, las billeteras locales suelen superar a los esquemas internacionales en volumen doméstico.',
        'Norteamérica rivaliza con Asia en valor (~12 T$ diarios de orden de magnitud) con un tercio de la población: tickets altos, rieles de tarjeta maduros (~6,5 T$ de volumen anual de compra con tarjeta en EE. UU.) y dominio del dólar en FX (USD en ~88 % de las operaciones FX). La fintech gana velocidad aquí (billeteras, BNPL, A2A de la era FedNow) mientras las tarjetas aún concentran el volumen bruto.',
        'Europa (~20 %) es el laboratorio regulatorio: el open banking estilo PSD2 fuerza la cooperación. El BNPL ya ronda el 9 % del e-commerce europeo frente a ~4 % a nivel global. América Latina (~7 %) y África y Oriente Medio (~6 %) son más pequeñas hoy pero imprimen un crecimiento del 15 %+ , y es donde la fintech es infraestructura por defecto, no una categoría de app store.',
      ],
      table: {
        columns: ['Región', 'Participación del flujo', 'Diario (orden de mag.)', 'Crecimiento', 'Postura fintech'],
        rows: [
          ['Asia-Pacífico', '~38%', '~$13.2T', '10–15 % YoY', 'Nativa fintech'],
          ['Norteamérica', '~35%', '~$12.3T', '3–5 % YoY', 'Defensa de incumbentes'],
          ['Europa', '~20%', '~$7T', '2–4 % YoY', 'API abiertas reguladas'],
          ['América Latina', '~7%', '~$2.5T', '15–20 % CAGR', 'Leapfrog / modelo Pix'],
          ['África y MEA', '~6%', '~$2.1T', '~15 % CAGR', 'Fundación mobile money'],
        ],
      },
      caption:
        'Las participaciones regionales combinan ingresos de pagos y estimaciones de flujo de reportes sectoriales y de bancos centrales. Úselas de forma comparativa; las cifras diarias absolutas son estimaciones composicionales en torno al marco de 35 T$.',
      pullQuote:
        'Donde los bancos construyeron los rieles, la fintech debe competir. Donde los rieles nunca existieron, la fintech los construyó, y domina.',
    },
    {
      heading: 'Expedientes: UPI, Pix y mobile money',
      body: 'Tres sistemas ilustran el patrón público–privado ganador.',
      paragraphs: [
        'India: UPI: tejido A2A nacional con apps fintech encima. Volúmenes mensuales en la parte alta de las decenas de miles de millones de transacciones; FY25 cerca de 186 mil millones de transacciones con ~42 % de crecimiento en volumen. Los conteos diarios promedio se acercan a ~600 millones. UPI no es «una app de billetera»: es la UX de liquidación nacional.',
        'Brasil: Pix: de noviembre de 2020 a 2024, 63,4 mil millones de transacciones y ~4,6 T$ de valor en un solo año; el valor acumulado desde el lanzamiento se mide en decenas de billones de dólares. La adopción adulta está efectivamente saturada; participación e-commerce ~40 % con trayectoria hacia ~50 %+ hacia 2027. Récord de un solo día: 252,1 M de transacciones (20 dic. 2024).',
        'África: mobile money: mercados como Kenia muestran más del 90 % de dominio del mobile money en el retail doméstico. Los teléfonos superaron a las sucursales bancarias; la fintech llenó el vacío. Las entradas de remesas a África superan los 60 mil millones de dólares al año; la compresión de comisiones del 5–10 % hacia menos del 1 % es una transferencia multimillonaria de excedente hacia los hogares.',
      ],
      bars: [
        { label: 'UPI FY25 txns', value: 100, display: '~186B' },
        { label: 'Pix 2024 txns', value: 34, display: '63.4B' },
        { label: 'Pico Pix 20 dic.', value: 14, display: '252M/día' },
        { label: 'Billeteras e-comm', value: 54, display: '54%' },
      ],
      chartTitle: 'Marcadores de escala (indexados para legibilidad)',
      caption:
        'Las barras de UPI y Pix no son la misma unidad que la participación de billeteras: el gráfico es un tablero visual de escala para magnitudes titulares, no una comparación de un solo eje.',
    },
    {
      heading: 'Inmersión Asia-Pacífico: nativa fintech a escala continental',
      body: 'Asia-Pacífico lidera con aproximadamente el 38 % de la participación en ingresos de transacciones de pago globales. Casi 38 centavos de cada dólar movido a nivel global fluyen por mercados y corredores asiáticos: escala poblacional, rieles gubernamentales y adopción mobile first.',
      paragraphs: [
        'China concentra un volumen doméstico de billeteras enorme: las plataformas dominantes juntas representan más del 90 % del volumen de transacciones en línea. Dominan los pagos domésticos; lo transfronterizo crece vía stablecoins y productos de corredor.',
        'El UPI de India es la UX de liquidación nacional: del orden de 13–18 mil millones de transacciones al mes en impresiones recientes, con FY25 cerca de 186 mil millones de transacciones. El alcance rural importa: los bancos pasan a ser infraestructura de back-end, no el único guardián.',
        'Japón sigue siendo la excepción dentro de Asia: las tarjetas de crédito aún representan cerca del 55 % de los pagos en línea, aunque las billeteras están al alza. Singapur pesa por encima de su tamaño como hub financiero regional para finanzas transfronterizas, forex y flujos institucionales. En el Sudeste Asiático (Filipinas, Indonesia, Tailandia, Vietnam), las billeteras locales a menudo llevan más volumen doméstico que los esquemas de tarjetas internacionales.',
        'La fintech no solo disrumpió la banca en gran parte de Asia: reemplazó la capa de tarjetas que faltaba. Por eso la región lleva años de ventaja en rieles minoristas en tiempo real.',
      ],
      table: {
        columns: ['Mercado', 'Rol en la pila', 'Postura fintech'],
        rows: [
          ['China', 'Escala doméstica nativa de billetera', 'Concentración de plataformas'],
          ['India', 'Tejido A2A nacional UPI', 'Riel público + apps'],
          ['Japón', 'Mix en línea centrado en tarjetas', 'Billeteras alcanzando'],
          ['Singapur', 'Hub financiero regional', 'Transfronterizo / FX'],
          ['Sudeste Asiático', 'Poblaciones mobile first', 'Lideran billeteras locales'],
        ],
      },
    },
    {
      heading: 'Inmersión Norteamérica: pesada en valor, contestada en velocidad',
      body: 'Norteamérica procesa aproximadamente un tercio del flujo global pese a una fracción de la población de Asia: tickets altos, rieles de tarjeta maduros y centralidad del dólar en FX.',
      paragraphs: [
        'Estados Unidos aún opera un volumen enorme de compras con tarjeta (del orden de 6,5 T$ anuales) y ancla el FX porque el dólar aparece en la gran mayoría de las operaciones de forex. Las billeteras digitales crecen en e-commerce pero van detrás del mix global de billetera primero. La fintech gana bordes: aceptación de pequeños comercios, remesas, BNPL y rieles tempranos de pago en tiempo real.',
        'Canadá refleja hábitos de tarjeta de altos ingresos con una participación fintech en alza. México se sitúa en la bisagra de Norteamérica y América Latina: grandes entradas de remesas desde la diáspora de EE. UU. (decenas de miles de millones anuales) hacen de la compresión de comisiones un tema macro de hogares, no una historia de producto de nicho.',
        'El patrón norteamericano: los incumbentes defienden el volumen; la fintech gana velocidad. Los sistemas en tiempo real lanzados en 2023 aún son tempranos frente a la escala de UPI y Pix, pero la dirección está fijada.',
      ],
      bullets: [
        'Las tarjetas aún concentran el volumen bruto de compras en EE. UU.: la historia es la participación, no la extinción',
        'BNPL y billeteras crecen más rápido que el mix de tarjetas',
        'El corredor de remesas EE. UU.–México es un campo de batalla fintech permanente',
      ],
    },
    {
      heading: 'Inmersión Europa: la regulación como distribución',
      body: 'Europa concentra alrededor del 20 % de los pagos globales. No inventó el riel nacional más rápido, pero el open banking obligó a los incumbentes a ser fintech-friendly por ley.',
      paragraphs: [
        'Los regímenes estilo PSD2 exigen que los bancos expongan datos e iniciación de pagos vía API. La fintech construye préstamo, contabilidad y funciones de pago sobre rieles abiertos por mandato. El buy-now-pay-later ya representa cerca del 9 % del e-commerce europeo, aproximadamente el doble del promedio global.',
        'Alemania concentra el peso de los pagos B2B industriales. El Reino Unido sigue siendo un centro financiero global para forex y trading institucional. Francia y los nórdicos muestran hábitos avanzados de pago digital; los mercados nórdicos en particular se comportan como laboratorios casi sin efectivo.',
        'La ventaja de Europa es la disrupción cooperativa: la fintech gana trabajando a través de la regulación, no solo a su alrededor. Los mandatos de pago instantáneo siguen comprimiendo los tiempos de liquidación en la región.',
      ],
    },
    {
      heading: 'Inmersión América Latina: la plantilla leapfrog',
      body: 'América Latina es más pequeña en participación absoluta hoy y está entre las regiones de más rápido crecimiento, aproximadamente 15–20 % CAGR. Aquí se escribe en público el futuro sistema operativo de la fintech.',
      paragraphs: [
        'El Pix de Brasil es la arquitectura de referencia: pagos instantáneos respaldados por el gobierno, abiertos a bancos y fintech, comisiones de consumo casi nulas, adopción masiva en cuatro años. Participación e-commerce en torno al 40 % con trayectoria hacia cerca del 51 % hacia 2027; picos de un solo día por encima de 250 millones de transacciones.',
        'México combina crecimiento retail con gravedad de remesas. Colombia y Chile construyen o adoptan rieles en tiempo real con lógica similar. Argentina muestra la vía de cobertura inflacionaria: stablecoins usadas como dinero funcional cuando se dispara la volatilidad de la moneda local.',
        'Por qué funciona: poca incumbencia de tarjetas, rieles gubernamentales, alcance de smartphones y UX fintech encima. América Latina no copia el checkout de tarjetas de Silicon Valley: exporta el patrón Pix.',
      ],
      table: {
        columns: ['Mercado', 'Señal', 'Implicación'],
        rows: [
          ['Brasil', 'Adopción masiva de Pix', 'Las tarjetas pierden el estatus por defecto'],
          ['México', 'Remesas + e-comm', 'Cuña fintech de corredor'],
          ['Colombia / Chile', 'Despliegue RTP', 'Seguir la plantilla Pix'],
          ['Argentina', 'Uso de cobertura con stablecoin', 'Cripto como utilidad, no como hype'],
        ],
      },
    },
    {
      heading: 'Inmersión África y Oriente Medio: la fintech como fundación',
      body: 'África y Oriente Medio son una participación más pequeña del flujo global hoy y están entre los de más rápido crecimiento (cerca del 15 % CAGR). Aquí la fintech no es una capa opcional: es cómo la gente cobra.',
      paragraphs: [
        'Grandes poblaciones no bancarizadas se encuentran con alta penetración móvil. Los operadores de mobile money de Kenia aún dominan el retail doméstico con participaciones de mercado por encima del 90 % en casos de uso centrales. Nigeria combina una gran población, demanda de remesas y uso de cripto/stablecoin como cobertura frente a la volatilidad cambiaria; Lagos se ha convertido en un hub fintech continental.',
        'La base bancaria más desarrollada de Sudáfrica aún salta hacia la distribución fintech. La escala de Egipto y el impulso gubernamental a los pagos digitales importan para el Norte de África. Los EAU concentran actividad internacional y forex de alto ingreso per cápita, con un posicionamiento comparativamente crypto-friendly.',
        'Las iniciativas de pago panafricanas buscan habilitar la liquidación instantánea en moneda local a través de fronteras. Las entradas de remesas a África superan los 60 mil millones de dólares al año; reducir las comisiones heredadas del 5–10 % hacia menos del 1 % es uno de los resultados fintech de mayor ROI del planeta.',
      ],
      bullets: [
        'El mobile money demostró el modelo antes de que «fintech» fuera una categoría',
        'Las remesas y las coberturas cambiarias impulsan la utilidad de las stablecoins',
        'Crecimiento greenfield: cada nuevo usuario de smartphone es un usuario potencial de riel',
      ],
    },
    {
      heading: 'Qué pierde a continuación lo heredado',
      body: 'Tarjetas, efectivo, mostradores de remesas y cadenas corresponsales lentas están todos del lado equivocado del tiempo de liquidación y de la transparencia de comisiones.',
      paragraphs: [
        'El efectivo ya colapsó desde aproximadamente el 46 % de las transacciones globales hace una década hasta ~8 % hoy. Los mostradores de remesas enfrentan una compresión de comisiones de 10× y mejoras de velocidad de 100× desde corredores nativos de app. Las redes tradicionales banco a banco aún mueven billones a nivel institucional, pero pierden el referente de velocidad/costo frente a alternativas de stablecoin y A2A instantáneo en los corredores que importan a pymes y diáspora.',
        'Los incumbentes no desaparecen. Las redes de tarjetas aún comandan valoraciones enormes y procesamiento fuera de China. Están perdiendo participación y se ven obligadas a integrar capacidades fintech.',
      ],
      bullets: [
        'Tarjetas: compresión de participación hacia ~15 % de lo digital hacia 2028',
        'Efectivo: declive estructural salvo bolsillos de preferencia por efectivo en mercados emergentes',
        'Centros de remesas: brecha de comisiones y velocidad demasiado grande para defender',
        'Banca corresponsal: multi-hop de 100–500 $ en días, reemplazado por punto a punto en segundos',
      ],
    },
    {
      heading: '2027–2030: siete cambios para suscribir',
      body: 'La segunda mitad de la década trata de que el tejido de liquidación se vuelva invisible, y de que los bancos se vuelvan infraestructura commodity.',
      paragraphs: [
        '1. Las stablecoins como liquidación transfronteriza por defecto para más corredores de negocio: los pilotos de CBDC continúan (docenas de países), pero los rieles USD privados ya liquidan a escala de producción.',
        '2. Los pagos instantáneos se vuelven requisito básico en todo mercado desarrollado; los mercados emergentes siguen la plantilla de Brasil.',
        '3. Se extienden los mandatos de open banking / open finance; la fintech apila préstamo, contabilidad, seguros y KYC sobre datos bancarios.',
        '4. Los mercados emergentes siguen exportando patrones de diseño de pago a los mercados desarrollados, no al revés.',
        '5. La suscripción por flujo de pago reemplaza los expedientes de crédito estáticos; el BNPL ya escaló desde ~179 mil millones (2022) hacia 450 mil millones+ hacia 2026.',
        '6. La cripto se vuelve plomería aburrida: la especulación sigue siendo teatro retail; el uso de infraestructura se vuelve institucional.',
        '7. Las cadenas corresponsales se acortan hacia stablecoin punto a punto o A2A instantáneo: colapso de comisiones y latencia.',
      ],
      pullQuote:
        'La fintech ya no está disrumpiendo las finanzas. La fintech es las finanzas, de forma desigualmente distribuida.',
    },
    {
      heading: 'Oportunidades para builders: adónde va la fintech a continuación',
      body: 'La fintech ganó los pagos de consumo. El espacio en blanco es infraestructura, inteligencia y el medio mal atendido, exactamente donde Relay se enfoca.',
      paragraphs: [
        '1. El medio mal atendido: infraestructura de mercados emergentes: más de 2 mil millones de personas tienen teléfonos pero banca incompleta. Las plataformas de billetera existen; la UX localizada (bajo ancho de banda, offline first, multilingüe) sigue siendo delgada.',
        '2. Pagos B2B y tesorería corporativa: el FX, los payables internacionales y la nómina siguen siendo ineficientes para pymes. El P2P retail se resolvió primero; el B2B aún está fragmentado.',
        '3. Cumplimiento más fintech: cada nuevo riel multiplica la demanda de KYC, AML y reporting. La infraestructura de cumplimiento plug-in para fintechs de mercados emergentes es un trabajo incompleto.',
        '4. Automatización de pagos en tiempo real: los rieles instantáneos existen; el software pyme que liquida automáticamente al recibir la factura es la siguiente capa de software.',
        '5. Infraestructura de stablecoin: el valor transferido se compone. Los controles corporativos, el préstamo y las herramientas de tesorería sobre rieles de emisores decidirán quién posee la plomería aburrida.',
        '6. Datos y analytics: la capa de inteligencia: los datos de flujo de pago están entre los conjuntos más valiosos de la economía. Agregar costo de corredor, fiabilidad y desempeño de proveedores es la tesis central de Relay.',
      ],
      bullets: [
        'Las billeteras de consumo están saturadas: construya debajo y al lado',
        'El transfronterizo y la tesorería pyme siguen con comisiones altas y mucha fricción',
        'La inteligencia sobre quién realmente funciona en un corredor gana a otro pitch deck',
      ],
    },
  ],
  marketContext: [
    'Asia y Norteamérica representan juntas aproximadamente el 73 % del flujo global: Asia vía población y rieles nativos fintech, Norteamérica vía tamaño de ticket y centralidad del dólar. Una estrategia que ignore cualquiera de los dos lados malinterpretará tanto el volumen como la velocidad.',
    'América Latina y África son más pequeñas en participación absoluta hoy (alrededor del 13 % combinadas) pero crecen a aproximadamente un 15 % o más al año frente a dígitos bajos en mercados maduros. Hacia 2030 su participación del flujo global debería expandirse de forma material solo por el crecimiento.',
    'Las remesas siguen siendo una de las cuñas fintech más limpias: África (más de 60 mil millones anuales) y América Latina (más de 150 mil millones incluyendo grandes corredores EE. UU.–México) aún pagan impuestos de comisiones heredadas que los rieles instantáneos y de stablecoin pueden comprimir hacia menos del 1 %.',
    'Insight clave del mapa regional: donde los bancos construyeron los rieles, la fintech debe competir. Donde los rieles nunca existieron, la fintech los construyó, y domina.',
  ],
  providerLandscape: [
    {
      metric: 'Pagos retail domésticos',
      leader: 'Rieles instantáneos públicos y billeteras locales',
      value: 'Liderando',
      tone: 'up',
      signal:
        'UPI, Pix, Alipay/WeChat Pay y M-Pesa fijan el valor por defecto del checkout en sus mercados de origen',
      note: 'Tejido de liquidación público; apps privadas encima',
    },
    {
      metric: 'Transfronterizo de consumo',
      leader: 'Especialistas de corredor y rampas de stablecoin',
      value: 'Ganando',
      tone: 'up',
      signal:
        'Las comisiones de remesas heredadas aún corren al 5–10 % en muchos corredores de África y LatAm',
      note: 'La presión es comisión y velocidad, no marca',
    },
    {
      metric: 'FX mayorista y derivados',
      leader: 'Franquicias bancarias y clearing central',
      value: 'Manteniendo',
      tone: 'flat',
      signal:
        'El FX diario sigue del orden de 7,5 T$; la participación fintech es sobre todo tickets pyme y mid-market',
      note: 'Las barreras de balance y membresía siguen altas',
    },
    {
      metric: 'Redes de tarjetas',
      leader: 'Esquemas globales',
      value: 'Perdiendo participación',
      tone: 'down',
      signal:
        'Se prevé que las tarjetas se acerquen a ~15 % de las transacciones digitales hacia 2028, desde ~21 % en 2023',
      note: 'Integrando billeteras y productos vinculados a cripto en el borde',
    },
  ],
  implications: [
    'En Asia, LatAm y África, diseñe primero para checkout cuenta a cuenta y billetera. Las tarjetas son el respaldo.',
    'Precie el costo total de la liquidación (comisión, FX, demora y fallo), no solo el MDR de etiqueta. Los rieles instantáneos cambian la matemática del capital de trabajo.',
    'Trate las stablecoins como una opción de tesorería y corredor para B2B transfronterizo, no como un apartado especulativo.',
    'Entregue cumplimiento y capas de datos como productos: cada nuevo riel multiplica la demanda de KYC/AML y analytics.',
    'Observe los sistemas instantáneos gubernamentales como riesgo de plataforma y como oportunidad de distribución. La participación puede moverse en meses.',
    'Haga listas cortas de proveedores según la realidad del corredor (cobertura, rieles, comisiones, fiabilidad), no según la narrativa del pitch deck.',
  ],
  closing:
    'Las billeteras se dirigen hacia aproximadamente el 61 % de las transacciones digitales hacia 2028. Los rieles instantáneos siguen componiendo. Los mercados emergentes están exportando el playbook. La fintech ya posee gran parte de la interfaz de consumo. El próximo concurso es infraestructura, inteligencia y eficiencia B2B, frente a un flujo diario de 35 billones de dólares que no espera a liquidadores lentos.',
  methodology:
    'Este informe insignia sintetiza cifras reportadas públicamente por bancos centrales e investigación sectorial en un marco comparativo único. La cifra diaria de 35 T$ es un compuesto de flujos de transacciones financieras y de mercado globales (FX, derivados, pagos, transferencias y cripto), no el throughput de un solo operador. Las asignaciones diarias regionales son estimaciones composicionales para comparación estructural. Las estadísticas de UPI y Pix priorizan publicaciones de NPCI y Banco Central do Brasil; los benchmarks de comisiones de remesas siguen monitores de corredor al estilo Banco Mundial; los niveles de FX referencian publicaciones de la encuesta trienal del BIS. Cuando las previsiones (participación de billeteras, totales de pagos instantáneos, mix de tarjetas 2028) provienen de informes de pagos del sector, se etiquetan como direccionales. Relay no ofrece asesoramiento financiero, legal ni de inversión.',
  sources: [
    'Encuesta trienal de bancos centrales del BIS (volumen FX)',
    'Capgemini World Payments Report',
    'Estadísticas mensuales / anuales UPI de NPCI',
    'Banco Central do Brasil: estadísticas Pix',
    'Monitores de precios de remesas del Banco Mundial',
    'Materiales públicos Federal Reserve / FedNow',
    'Reporting BCE / SEPA Instant',
    'Investigación de pagos del sector (Mordor, Grand View y relacionados)',
    'Presentaciones de empresas y resúmenes de analytics blockchain para el valor de transferencia de stablecoins',
  ],
}
