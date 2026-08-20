import type { DataReport } from './reports'

/** Laporan mendalam Asia Pasifik, versi Bahasa Indonesia. Tanpa tanda hubung panjang. */
export const asiaPacificReportId: DataReport = {
  slug: 'asia-pacific-payment-rails',
  title: 'Analisis Mendalam Asia Pasifik: Mesin Keuangan Dunia yang Bangkit',
  seoTitle: 'Analisis Mendalam Asia Pasifik: Fintech, Celah, dan 12 Pasar | Relay Research',
  seoDescription: 'Analisis mendalam Asia Pasifik: PDB 43T USD, volume harian 13T USD, rel fintech, celah per negara, pendirian asing, permintaan pemerintah, budaya, dan di mana operator masih bisa menang.',
  seoKeywords: ['analisis mendalam Asia Pasifik','mesin fintech Asia','UPI PromptPay PayNow BI FAST QRIS','pembayaran lintas batas UMKM Asia','hub fintech Singapura Hong Kong','fintech Indonesia Vietnam Filipina','kontrol modal China SAFE','pembiayaan rantai pasok Asia'],
  dek: 'Kawasan Asia Pasifik bukan sekadar besar. Ia adalah pusat ekonomi dunia. Berikut artinya secara operasional di produksi, fintech, celah, pendirian, dan permintaan.',
  kicker: 'Relay Research · Analisis Mendalam Asia Pasifik',
  excerpt: 'Analisis mendalam Asia Pasifik lengkap yang mencakup skala ekonomi, sejarah, pemain fintech, celah per negara, pendirian perusahaan asing, target pemerintah, budaya, dan di mana operator masih bisa menang.',
  category: 'Market maps',
  market: 'Asia-Pacific',
  publishedAt: '2026-08-18',
  updatedAt: '2026-08-18',
  readMinutes: 42,
  heroImage: { src: '/reports/asia-pacific-hero.png', alt: 'Pelabuhan dan skyline Hong Kong di golden hour, hub perdagangan dan keuangan Asia Pasifik', caption: 'Perdagangan, penyelesaian, dan kepadatan skyline di kawasan yang membersihkan porsi aktivitas global yang tidak proporsional lewat banyak sistem nasional.' },
  heroStat: { label: 'Volume harian APAC', value: '$13.17T', delta: '43% dari tumpukan harian global', tone: 'up' },
  metrics: [
    { label: 'PDB gabungan', value: '$43.12T', delta: '37% dunia', tone: 'flat' },
    { label: 'Populasi', value: '4.7B', delta: '60% dunia', tone: 'flat' },
    { label: 'Volume harian', value: '$13.17T', delta: '43% global', tone: 'up' },
    { label: 'Pasar fintech', value: '$167.7B', delta: 'Menuju 348B USD pada 2031', tone: 'up' },
  ],
  keyTakeaways: [
    'Asia Pasifik sudah menjadi pusat: PDB 43,12T USD, volume harian 13,17T USD, 4,7 miliar orang. Ini dua belas pasar lebih, bukan satu.',
    'Pemerintah membangun rel (UPI, PromptPay, PayNow, BI FAST, QRIS, DuitNow). Fintech membangun di atasnya. Koneksi lintas batas masih hilang.',
    'Modal terbukti mengikuti super app, BNPL, bank digital, dan keuangan tertanam e-commerce. Upside belum terbukti ada di lintas batas UMKM, pembiayaan rantai pasok, integrasi rel, tokenisasi, dan kredit alternatif.',
    'China matang di dalam dan terkendala keluar. Singapura dan Hong Kong tetap hub paling bersih. Asia Tenggara dan India membawa cerita pertumbuhan dan inklusi.',
  ],
  overview: 'Laporan ini memetakan Asia Pasifik sebagai peta operator: skala dan produksi, bagaimana kawasan menjadi pusat, siapa yang bermain di fintech, di mana celah per negara, bagaimana orang asing mendirikan, apa yang diinginkan pemerintah dan pasar, bagaimana budaya berbeda, dan apa artinya bagi pembangun, investor, dan korporasi.',
  findings: [
    {
      title: 'Asia adalah pasar, bukan misi sampingan',
      body: 'PDB gabungan mendekati 43T USD dan volume harian mendekati 13T USD berarti operator yang memperlakukan Asia sebagai opsional sudah terlambat.',
      stat: { value: '$43.12T', label: 'PDB nominal' },
      compareStats: [{ value: '$13.17T', label: 'Volume harian' }],
    },
    {
      title: 'Pemerintah membangun rel',
      body: 'UPI, PromptPay, PayNow, BI FAST, QRIS, dan DuitNow mendemokratisasi infrastruktur. Perusahaan bersaing di pengalaman dan kredit, bukan di kepemilikan switch.',
      stat: { value: 'Rel pemerintah', label: 'Infrastruktur publik' },
      compareStats: [{ value: 'UX fintech', label: 'Dibangun di atasnya' }],
    },
    {
      title: 'Lintas batas adalah perbatasan terakhir',
      body: 'Rel instan domestik berfungsi. Menghubungkannya tidak. Lintas batas UMKM dan pembiayaan rantai pasok tetap rusak pada skala.',
      stat: { value: '$15.8T', label: 'Pasar XB UMKM' },
      compareStats: [{ value: '$415B', label: 'SCF Asia' }],
    },
    {
      title: 'Model terbukti sudah punya modal',
      body: 'Super app, BNPL, bank digital, dan kredit e-commerce sudah didanai. Modal baru menang di celah yang belum terbukti.',
      stat: { value: 'Kelas Grab', label: 'Terbukti' },
      compareStats: [{ value: 'XB / SCF', label: 'Celah terbuka' }],
    },
  ],
  sections: [
    {
      heading: 'Asia Pasifik adalah pusat ekonomi dunia',
      body: 'Kawasan Asia Pasifik bukan sekadar besar. Ia adalah pusat ekonomi dunia. Namun banyak operator di luar kawasan masih belum sepenuhnya memahami artinya secara operasional.',
      paragraphs: [
        'PDB gabungan mencapai 43,12 triliun USD nominal dan 102,71 triliun pada daya beli. Volume transaksi harian 13,17 triliun USD. Itu 37% PDB dunia dan 43% volume transaksi harian global. Populasi: 4,7 miliar orang, 60% dunia.',
        'Jika Asia Pasifik adalah satu negara, ia akan menjadi ekonomi dunia dengan margin besar. Tapi ia bukan satu negara. Ia dua belas pasar lebih yang berbeda, masing-masing dengan regulasi, infrastruktur pembayaran, dan trajektori pertumbuhan berbeda.',
      ],
      pullQuote: 'Ini bukan kawasan dengan potensi. Ini kawasan yang sudah berproduksi pada skala yang mengerdilkan sebagian besar negara maju.',
    },
    {
      heading: 'Di mana Asia berproduksi',
      body: 'Kedalaman produksi di kawasan ini sangat mencengangkan.',
      paragraphs: [
        'China sendiri menghasilkan volume transaksi harian lebih dari 6 triliun USD. Ia memproduksi sekitar 28% seluruh barang global. Semikonduktor, elektronik, tekstil, kimia: China adalah lantai pabrik dunia. Namun untuk semua produksi itu, inovasi fintech belum menyamai skalanya.',
        'Jepang menangani 800 miliar USD transaksi harian dan menjadi rumah bagi pasar saham terbesar ketiga dunia, Nikkei 225. Ia memelopori manufaktur maju, robotika, dan keunggulan otomotif.',
        'India memproses 13 miliar transaksi per bulan lewat UPI saja (Unified Payments Interface). Ia menjadi back office bagi perusahaan teknologi global dan rumah bagi ekosistem startup dengan pertumbuhan tercepat di dunia.',
        'Indonesia memproduksi elektronik, minyak sawit, tekstil, dan bahan mentah. Populasinya 278 juta, keempat terbesar di dunia. Ekosistem fintech-nya tumbuh paling cepat di Asia Tenggara.',
        'Vietnam menjadi alternatif China untuk manufaktur. Ia menangkap rantai pasok yang berpindah akibat ketegangan perdagangan AS-China. Thailand adalah hub perdagangan regional, pusat manufaktur, dan kekuatan pariwisata, dengan lebih dari 35 juta pengunjung internasional per tahun. Singapura adalah hub keuangan Asia Tenggara, menangani 383 miliar USD perdagangan FX harian. Korea Selatan adalah pemimpin manufaktur semikonduktor dan EV, dengan Samsung dan Hyundai sebagai kekuatan global.',
      ],
    },
    {
      heading: 'Sejarah singkat: bagaimana Asia menjadi pusat',
      body: 'Untuk memahami di mana Asia sekarang, Anda perlu memahami di mana ia dulu.',
      paragraphs: [
        'Selama sebagian besar abad ke-20, Asia bukan pusat keuangan. Dunia Barat yang menjadi pusat. Eropa dan Amerika Utara menguasai perdagangan, keuangan, dan inovasi global. Ekonomi Asia yang berkembang sebagian besar menjadi pemasok bahan mentah dan tenaga kerja murah bagi perusahaan Barat. Sistem pembayaran, bank, pasar saham: semuanya dikuasai Barat.',
        'Pergeseran terjadi secara bertahap lalu tiba-tiba. Pada 1970-an dan 80-an, Jepang muncul sebagai kekuatan manufaktur. Pada 1990-an, ia menjadi ekonomi terbesar kedua dunia. Pada 2000-an, China membuka diri dan mulai menangkap manufaktur global. Pada 2010, Asia menjadi pabrik dunia. Pada 2020, ia juga menjadi pusat keuangan dunia.',
      ],
    },
    {
      heading: 'Trajektori pertumbuhan dan lompatan digital',
      body: 'Pangsa PDB naik secara stabil. Titik balik sejati adalah transformasi digital.',
      paragraphs: [
        'Dari 2000 hingga 2010, pangsa Asia dari PDB global naik dari 20% ke 30%. Dari 2010 hingga 2020 dari 30% ke 35%. Dari 2020 hingga 2026 mencapai 37% dan terus tumbuh.',
        'Tapi titik balik sejati bukan pertumbuhan PDB. Itu transformasi digital. Ketika smartphone datang, Asia tidak sekadar mengadopsinya. Ia melompati perbankan tradisional sepenuhnya. India membangun UPI, sistem pembayaran real-time yang didukung pemerintah. China membangun Alipay dan WeChat Pay, mencakup lebih dari 90% transaksi online. Asia Tenggara membangun sistem pembayaran instan di setiap negara: PromptPay, PayNow, QRIS, dan lainnya.',
        'Barat masih bergantung pada kartu kredit dan perbankan tradisional. Asia beralih ke pembayaran native digital dalam semalam.',
      ],
      table: {
        columns: ['Periode', 'Pangsa Asia dari PDB global'],
        rows: [
          ['2000 hingga 2010', '20% hingga 30%'],
          ['2010 hingga 2020', '30% hingga 35%'],
          ['2020 hingga 2026', 'Mencapai 37% dan naik'],
        ],
      },
    },
    {
      heading: 'Ke mana Asia mengarah sekarang',
      body: 'Pemerintah kawasan punya target eksplisit. Teknologi keuangan bukan lagi pelengkap. Itu strategi nasional.',
      paragraphs: [
        'India menargetkan inklusi keuangan digital untuk 500 juta lebih orang tanpa bank. Vietnam menargetkan status hub rantai pasok dengan menangkap manufaktur yang berpindah dari China. Indonesia menargetkan kepemimpinan fintech dan status unicorn bagi banyak startup. Thailand menargetkan status hub pembayaran regional, menjadikan PromptPay standar ASEAN. Singapura menargetkan status hub inovasi kripto dan blockchain sebagai strategi pemerintah eksplisit. China menargetkan dominasi teknologi domestik plus integrasi keuangan Belt and Road, mengekspor yuan. Jepang menargetkan pivot populasi menua lewat otomasi, robotika, dan fintech institusional.',
      ],
      pullQuote: 'Teknologi keuangan bukan lagi pelengkap. Itu strategi nasional.',
    },
    {
      heading: 'Opsi fintech: pemain besar dan volumenya',
      body: 'Siapa yang bermain, siapa yang tidak, dan siapa yang sudah menjadi infrastruktur.',
      paragraphs: [
        'Di China, Alipay mengambil 50 hingga 55% transaksi digital China dan WeChat Pay 35 hingga 40%. Gabungan mereka menguasai lebih dari 90% pasar. Volume harian sulit dikuantifikasi tepat, tapi perkiraan sekitar 2 hingga 3 triliun USD harian hanya di China. Mereka bukan startup. Mereka infrastruktur. Alipay berada di ekosistem Alibaba. WeChat Pay di Tencent. Mereka berfungsi sebagai rel pembayaran yang sudah matang.',
        'Di India, UPI menjalankan 13 miliar transaksi per bulan, sekitar 57% seluruh transaksi India, menjangkau 500 juta lebih populasi yang sebelumnya tanpa bank, dan gratis serta dibangun pemerintah. Volume harian sekitar 1,5 triliun USD. UPI unik. Ia bukan perusahaan. Ia sistem pembayaran yang dibangun pemerintah yang bisa dibangun di atasnya oleh fintech mana pun. Arsitekturnya memaksa inovasi, bukan konsolidasi.',
        'Di Asia Tenggara, rel pembayaran instan pemerintah mencakup PromptPay di Thailand (penyelesaian instan 24/7, gratis), PayNow di Singapura (real-time, terhubung ke telepon atau ID), BI FAST di Indonesia (sistem instan bank sentral), DuitNow di Malaysia (penyelesaian real-time 24/7), serta InstaPay dan PESONet di Filipina. Volume harian gabungan sekitar 1,2 triliun USD. Pemerintah membangun rel. Fintech membangun pengalaman konsumen di atasnya. Itu mendemokratisasi infrastruktur pembayaran.',
      ],
      table: {
        columns: ['Pasar', 'Rel atau pemain', 'Sinyal'],
        rows: [
          ['China', 'Alipay dan WeChat Pay', 'Dominasi digital 90%+'],
          ['India', 'UPI', '13 miliar transaksi sebulan'],
          ['Thailand', 'PromptPay', 'Instan gratis 24/7'],
          ['Singapura', 'PayNow', 'Real-time telepon atau ID'],
          ['Indonesia', 'BI FAST', 'Instan bank sentral'],
          ['Malaysia', 'DuitNow', 'Real-time 24/7'],
          ['Filipina', 'InstaPay dan PESONet', 'Real-time plus batch'],
        ],
      },
    },
    {
      heading: 'Fintech yang sedang skala',
      body: 'Super app, bank digital, BNPL, dan kredit e-commerce adalah tempat pertumbuhan sudah berkompon.',
      paragraphs: [
        'Super app menggabungkan pembayaran dan ekosistem. Grab di Asia Tenggara melakukan ride-hailing plus pembayaran plus layanan keuangan. Gojek di Indonesia menjalankan model serupa. Kakao di Korea Selatan menggabungkan pembayaran, sosial, dan perdagangan. Momo di Vietnam adalah dompet plus ekosistem dengan 50 juta lebih pengguna.',
        'Bank digital berkembang cepat. Tonik Bank di Filipina mencapai 2 juta pengguna dalam 3 tahun, bank digital dengan pertumbuhan tercepat di Asia Tenggara. Kakao Bank di Korea Selatan punya 40 juta lebih pengguna dengan layanan perbankan penuh. Jago di Indonesia adalah neobank yang menjangkau jutaan. OCBC Digital Bank mencakup Singapura dan wilayah lebih luas.',
        'BNPL (Bayar Nanti) mencakup Kredivo di Indonesia, Fintech di Filipina, dan Atome di lima negara. Ukuran pasar sekitar 450 miliar USD secara global dengan pertumbuhan tahunan sekitar 25%.',
        'Pada pinjaman dan kredit, platform e-commerce yang menerbitkan pinjaman UMKM (Tokopedia, Shopee di Indonesia, Lazada di Asia Tenggara) menerbitkan lebih banyak pinjaman UMKM daripada bank tradisional. Mereka memakai data transaksi, bukan biro kredit.',
      ],
      bullets: [
        'Super app: Grab, Gojek, Kakao, Momo',
        'Bank digital: Tonik, Kakao Bank, Jago, OCBC Digital',
        'BNPL: Kredivo, Fintech, Atome',
        'Kredit e-commerce: Tokopedia, Shopee, Lazada mengalahkan bank di pinjaman UMKM',
      ],
    },
    {
      heading: 'Siapa yang kurang terlayani: celah',
      body: 'Rel domestik unggul. Lintas batas, pembiayaan rantai pasok, dan kredit thin file tidak.',
      paragraphs: [
        'Pembayaran lintas batas UMKM berada di pasar tahunan sekitar 15,8 triliun USD, dan solusi saat ini semua rusak. Letter of Credit biaya 1 hingga 3%, butuh 3 hingga 5 hari, dan membutuhkan status Fortune 500 untuk akses. Alibaba Trade Assurance hanya bekerja di Alibaba dengan penyelesaian 1 hingga 2 hari. Transfer kawat cepat tapi tanpa perlindungan penipuan. PayPal mengenakan biaya 4 hingga 5% dan tidak resmi didukung di banyak negara Asia. Belum ada yang menyelesaikan ini pada skala.',
        'Pembiayaan rantai pasok untuk UMKM adalah pasar 415 miliar USD di Asia dengan pertumbuhan sekitar 7% per tahun. Hari ini sebagian besar bekerja untuk Fortune 500. Yang dibutuhkan adalah pembiayaan rantai pasok digital yang bekerja untuk perusahaan manufaktur 50 orang.',
        'B2B lintas batas antar negara Asia masih terfragmentasi. UPI, PromptPay, PayNow, QRIS, dan DuitNow ada tapi tidak saling terhubung. Project Nexus seharusnya menyelesaikan ini tapi tetap lambat. Dampaknya: volume harian lebih dari 1,2T USD di Asia Tenggara tetap tidak efisien.',
        'Tokenisasi real estate sedang muncul. Real estate tidak likuid di Vietnam, Bali, dan Filipina membuka peluang kepemilikan fraksional lewat blockchain untuk investasi 5K USD alih-alih persyaratan 500K USD. Skor kredit alternatif sudah bekerja sebagian: 500 juta lebih orang tanpa bank tidak punya riwayat kredit, namun platform e-commerce Indonesia sudah menerbitkan lebih banyak pinjaman daripada bank memakai data e-commerce, pembayaran mobile, dan tagihan utilitas, meski belum pada skala optimal.',
      ],
      pullQuote: 'Belum ada yang menyelesaikan pembayaran lintas batas UMKM pada skala. Celah itu masih terbuka.',
    },
    {
      heading: 'Negara tersembunyi dengan janji',
      body: 'Sebagian besar pendanaan fintech mengalir ke China, India, Singapura, dan Vietnam. Populasi plus permintaan kurang terlayani di tempat lain masih menunggu.',
      paragraphs: [
        'Filipina punya sekitar 120 juta orang yang muda, tumbuh, dan berbahasa Inggris. Tonik Bank mencapai 2 juta pengguna dalam 3 tahun. GCash memegang 92 juta lebih dompet. Celahnya: hub BPO yang butuh pembayaran lintas batas lebih baik untuk 1,3 juta pekerja yang mengirim remitansi, plus pembiayaan rantai pasok untuk pemasok UMKM ke perusahaan global.',
        'Pakistan punya sekitar 230 juta orang dan baru beralih dari larangan kripto ke kerangka regulasi pada 2026. Celahnya adalah inklusi keuangan digital dan pembayaran lintas batas. Bangladesh punya sekitar 170 juta orang. bKash mendominasi uang mobile dengan 100 juta lebih pengguna. Celahnya adalah pembayaran tenaga kerja lintas batas dan pembiayaan rantai pasok untuk hub manufaktur garmen terbesar di dunia.',
      ],
    },
    {
      heading: 'China: kekayaan terjebak, lintas batas rusak',
      body: 'China menghasilkan volume transaksi harian lebih dari 6 triliun USD. Kripto dilarang. SAFE membatasi uang keluar. Celahnya outbound.',
      paragraphs: [
        'Paradoksnya: China menghasilkan volume harian besar, namun kripto sepenuhnya dilarang, kontrol modal membatasi uang keluar, pembayaran RMB lintas batas membutuhkan persetujuan pemerintah, dan perusahaan fintech menghadapi pengawasan pemerintah yang meningkat.',
        'Irisan kecil volume harian China pun masif. China mengekspor lebih dari 3,5 triliun USD per tahun. UMKM yang mengimpor dari China menghadapi biaya tersembunyi 5 hingga 10% lewat biaya, markup FX, dan keterlambatan. Metode saat ini: Letter of Credit (mahal, lambat), Alibaba Trade Assurance (terbatas), transfer kawat (berisiko).',
        'Yang dibutuhkan adalah hub importir UMKM satu platform yang menangani keamanan pembayaran (escrow), FX dengan spread ketat, penyelesaian dalam hari bukan minggu, dan verifikasi pemasok. Mengapa belum dibangun: gesekan regulasi plus kontrol modal membuat pergerakan uang internasional sulit. Infrastruktur pembayaran internal China matang. Celahnya outbound, mengeluarkan uang untuk pembayaran lintas batas.',
      ],
    },
    {
      heading: 'India: emas fintech, perak tanpa bank',
      body: 'UPI mendominasi. Lintas batas, remitansi, perdagangan B2B, dan pembiayaan rantai pasok UMKM masih rusak.',
      paragraphs: [
        'Yang bekerja: UPI 13 miliar transaksi sebulan, 500 juta lebih orang mendapat akses digital, platform pinjaman fintech menerbitkan volume masif, dan ekosistem startup yang booming di Bengaluru dan Mumbai.',
        'Yang rusak: pembayaran lintas batas masih mahal dan lambat (bank mengenakan 1 hingga 3% untuk transfer kawat lintas batas); remitansi, dengan India menerima lebih dari 120 miliar USD per tahun lewat metode mahal; pembayaran perdagangan B2B masih di perbankan lama; pembiayaan rantai pasok hampir tidak ada untuk pemasok UMKM.',
        'Siapa yang kurang terlayani: pemasok pertanian, eksportir UMKM, pengirim remitansi yang saat ini membayar biaya tipe Western Union 2 hingga 5%, dan peserta rantai pasok dari petani ke distributor ke pengecer. Pemerintah ingin memperluas UPI ke pembayaran global (RBI ingin UPI menyaingi SWIFT), mencakup 500 juta lebih orang tanpa bank, mendorong pertumbuhan berorientasi ekspor, dan mengintegrasikan blockchain serta CBDC.',
        'Ukuran peluang: India punya 1,45 miliar orang. 500 juta lebih tanpa bank. Adopsi pembayaran digital 57% dari transaksi. Sisa 43% tunai mewakili triliunan volume tahunan yang masih harus didigitalkan.',
      ],
    },
    {
      heading: 'Jepang: pasar matang, peluang penuaan',
      body: 'Kaya, tepercaya, lambat. Fintech yang menyelesaikan untuk pengguna lansia punya TAM domestik paling jelas.',
      paragraphs: [
        'Yang bekerja: sistem perbankan matang, institusi stabil, Nikkei 225 sebagai salah satu pasar saham terbesar dunia, dan penetrasi kartu kredit tinggi sekitar 55% dari pembayaran online.',
        'Yang rusak: inovasi lambat dengan perbankan lama masih dominan, populasi menua dengan lebih sedikit pengguna fintech muda, regulasi konservatif dengan kripto sangat dibatasi dan tarif pajak individu 35 hingga 45%, serta pertumbuhan rendah sekitar 0,6% PDB, paling lambat di Asia maju.',
        'Siapa yang kurang terlayani: pengguna lansia yang butuh antarmuka sederhana dan tepercaya, pengguna pembayaran lintas batas yang masih membayar biaya bank mahal, dan startup teknologi dalam budaya yang lebih lambat dari Asia Tenggara. Jepang kaya. Pendapatan rumah tangga rata-rata tertinggi di Asia. Tapi ia juga menua. Perusahaan fintech yang menyelesaikan untuk pengguna lansia dengan kejelasan, kesederhanaan, dan keamanan bisa punya TAM masif. Pemerintah ingin adopsi teknologi oleh lansia, status hub fintech regional yang bersaing dengan Singapura dan Hong Kong, serta pengembangan institusional stabil alih-alih disrupsi cepat.',
      ],
    },
    {
      heading: 'Hong Kong: jembatan kripto, jalur keluar kontrol modal',
      body: 'Hong Kong adalah katup escape untuk fintech daratan dan jalur penyelesaian RMB lepas pantai yang melewati SAFE.',
      paragraphs: [
        'Yang bekerja: status hub RMB lepas pantai (CNH paling likuid), regulasi ramah kripto lewat kerangka ASPIRe, akses gerbang ke China tanpa kontrol modal daratan, dan lisensi bank digital yang sudah diterbitkan.',
        'Yang rusak: risiko geopolitik seputar otonomi, operasi mahal (biaya tertinggi di Asia Tenggara kecuali Singapura), pasar domestik terbatas hanya 7,5 juta orang, dan real estate mahal dengan imbal hasil 2 hingga 3%.',
        'Siapa yang kurang terlayani: perusahaan kripto yang bisa beroperasi di sini tapi tidak di China, eksportir China yang butuh penyelesaian RMB tanpa pembatasan daratan, dan investor institusional yang butuh akses fintech Asia. Hong Kong adalah katup escape untuk fintech daratan. Perusahaan tidak bisa beroperasi bebas di China, jadi mereka berbasis di Hong Kong. RMB bisa diselesaikan lepas pantai tanpa persetujuan SAFE. Itu peluang arbitrase regulasi. Pemerintah ingin inovasi fintech untuk bersaing dengan Singapura, kepemimpinan regulasi kripto termasuk lisensi stablecoin, dan internasionalisasi RMB.',
      ],
    },
    {
      heading: 'Singapura: hub fintech, surga mahal',
      body: 'Singapura adalah landasan peluncuran HQ regional. Mahal, kecil secara lokal, dan tetap bidang kontrol terbaik untuk ekspansi Asia Tenggara.',
      paragraphs: [
        'Yang bekerja: MAS aktif mendukung fintech dan kripto, empat bank digital berlisensi, lisensi stablecoin diterbitkan pada 2026, 80 lebih perjanjian pajak bilateral yang mencegah pajak ganda, dan PayNow sebagai sistem pembayaran instan.',
        'Yang rusak: basis biaya tertinggi di Asia Tenggara, pasar lokal kecil 5,9 juta orang, dan pertumbuhan lebih lambat dari pasar emerging. Siapa yang kurang terlayani: perusahaan regional yang butuh ekspansi Asia Tenggara alih-alih Singapura saja, dan pendiri sadar anggaran yang tidak mampu sewa sekitar 3K USD sebulan.',
        'Singapura adalah HQ regional bagi perusahaan yang menargetkan seluruh Asia Tenggara. Mahal, tapi landasan peluncuran terbaik. Perusahaan seperti Grab memakai Singapura untuk ekspansi di kawasan. Pemerintah ingin status hub kripto dan fintech, pengembangan rel pembayaran regional lewat Project Nexus, dan kantor pusat lembaga keuangan untuk wealth management dan asuransi.',
      ],
    },
    {
      heading: 'Thailand: hub pembayaran, imbal hasil real estate terbaik',
      body: 'PromptPay membuat pembayaran domestik instan. Lintas batas dengan tetangga dan gesekan Foreign Business Act adalah bab yang belum selesai.',
      paragraphs: [
        'Yang bekerja: PromptPay 24/7 dan gratis, bursa kripto diatur SEC dengan Bitcoin, Ethereum, dan Ripple disetujui, ekosistem super app lewat Grab dan GrabFinance, serta dominasi pariwisata dengan 35 juta lebih pengunjung per tahun.',
        'Yang rusak: Foreign Business Act dengan 14 sektor terbatas yang membutuhkan mitra Thailand, regulasi kompleks dengan penegakan tidak konsisten, PromptPay menghubungkan bank domestik tapi tidak lintas batas, dan B2B lintas batas masih di perbankan lama.',
        'Siapa yang kurang terlayani: wisatawan yang menghadapi gesekan pembayaran, importir UMKM asing yang mencari pemasok Thailand, perdagangan lintas batas dengan tetangga, dan peserta rantai pasok dari petani ke eksportir. Thailand adalah hub perdagangan regional di dalam volume harian Asia Tenggara lebih dari 1,2T USD. Celahnya lintas batas antara Thailand dan Vietnam, Kamboja, Laos, serta Myanmar. Pemerintah ingin status hub pembayaran regional, pembayaran digital pariwisata, daya saing manufaktur lewat pembiayaan rantai pasok, dan sektor berinsentif BOI di EV, semikonduktor, robotika, dan biotek.',
      ],
    },
    {
      heading: 'Indonesia: ledakan fintech, celah tersembunyi',
      body: 'Product market fit pada skala sudah ada di sini. Pembayaran lintas batas dan remitansi adalah celah berikutnya.',
      paragraphs: [
        'Yang bekerja: BI FAST, platform e-commerce (Tokopedia, Shopee) yang menerbitkan lebih banyak pinjaman daripada bank, super app (Grab, Gojek), bank digital (Jago, Ajaib, Kredivo yang berkembang), platform BNPL, dan 278 juta orang sebagai populasi terbesar keempat di dunia.',
        'Yang rusak: birokrasi dengan regulasi kompleks dan penegakan tidak konsisten, kerangka kripto yang baru beralih dari komoditas (Bappebti) ke produk keuangan (OJK) pada 2025, infrastruktur lintas batas terbatas, dan remitansi lebih dari 13 miliar USD masih bergerak lewat saluran tradisional yang mahal.',
        'Siapa yang kurang terlayani: pekerja garmen dan tekstil, koperasi pertanian, pengirim remitansi di Timur Tengah dan Malaysia, serta pengunjung wisata Bali yang butuh sistem pembayaran terintegrasi. Indonesia adalah tempat fintech mendapat product market fit pada skala. Celah berikutnya adalah pembayaran lintas batas ke Malaysia, Singapura, Thailand, dan Filipina. Pemerintah ingin unicorn fintech, inklusi keuangan, pembiayaan rantai pasok, dan pematangan bank digital.',
      ],
      image: {
        src: '/reports/asia-pacific-portrait.png',
        alt: 'Pemandangan vertikal pelabuhan dan skyline di kota keuangan Asia Pasifik',
        caption: 'Kepadatan adalah konstanta regional. Setiap pasar tetap menjaga registri, kode pajak, dan rel kliring sendiri.',
        layout: 'portrait',
      },
    },
    {
      heading: 'Vietnam: hub manufaktur, pertumbuhan tercepat',
      body: 'Vietnam menjadi China baru untuk pabrik. Infrastruktur fintech belum menyusul.',
      paragraphs: [
        'Yang bekerja: menangkap rantai pasok yang berpindah dari China, pertumbuhan ekonomi tercepat sekitar 7,1% per tahun, apresiasi properti tercepat sekitar 8 hingga 15% per tahun, dominasi Momo dengan 50 juta lebih pengguna dompet digital, dan 200 lebih startup fintech.',
        'Yang rusak: infrastruktur perbankan masih menyusul, infrastruktur pembayaran lintas batas terbatas untuk perdagangan, aturan kepemilikan investasi asing membaik tapi masih kompleks, dan konsentrasi fintech di sekitar Momo sementara yang lain tetap kecil.',
        'Siapa yang kurang terlayani: UMKM manufaktur yang butuh pembiayaan rantai pasok, bisnis berorientasi ekspor yang butuh rel lintas batas, dan pemasok barang impor yang butuh pembiayaan inventaris. Manufaktur bergerak ke sini dari China. Pembiayaan rantai pasok dan pembayaran B2B lintas batas semuanya kurang berkembang. Pemerintah ingin status hub manufaktur, daya tarik investasi asing, pengembangan ekonomi digital, dan penangkapan FDI dari perang dagang China.',
      ],
    },
    {
      heading: 'Bali: imbal hasil tinggi, risiko leasehold',
      body: 'Imbal hasil sewa tertinggi di Asia maju datang dengan risiko tenur leasehold dan pasokan kondominium yang mendingin.',
      paragraphs: [
        'Yang bekerja: imbal hasil sewa real estate tahunan 5 hingga 10%, hub digital nomad dengan 100 ribu lebih orang asing yang hidup dari arbitrase biaya hidup, dan infrastruktur pariwisata dengan 5 juta lebih pengunjung per tahun.',
        'Yang rusak: orang asing tidak bisa memiliki tanah, hanya sewa 25 hingga 30 tahun; kelebihan pasokan kondominium dan pendinginan pasar pada 2025 hingga 2026; likuiditas sulit saat menjual ke orang asing lain; dan ketidakpastian regulasi jika aturan kepemilikan berubah.',
        'Siapa yang kurang terlayani: investor real estate yang ingin imbal hasil jangka panjang stabil tapi menghadapi risiko leasehold, komunitas ekspatriat yang butuh perumahan dan infrastruktur pembayaran, serta wisatawan yang butuh pembayaran digital lebih baik. Tokenisasi real estate dan kepemilikan fraksional lewat blockchain bisa menyebar risiko leasehold ke banyak investor.',
      ],
    },
    {
      heading: 'Malaysia: stabil, terabaikan',
      body: 'Lima bank digital dan DuitNow membuat Malaysia lebih padat daripada perhatian pendanaan yang disarankan.',
      paragraphs: [
        'Yang bekerja: lima bank digital (terbanyak di ASEAN), DuitNow, pemerintah dan regulasi stabil, serta status pusat keuangan ASEAN. Yang rusak: pertumbuhan fintech lebih lambat dari Indonesia, Filipina, atau Vietnam; lebih mahal dari Vietnam dan kurang inovatif dari Singapura; serta perhatian pendanaan lebih sedikit secara keseluruhan.',
        'Siapa yang kurang terlayani: UMKM yang butuh infrastruktur pembayaran lintas batas, pekerja asing yang butuh solusi remitansi, dan pedagang lintas batas yang butuh integrasi dengan rel ASEAN. Malaysia stabil tapi terabaikan. Integrasi ASEAN nyata di sini. Perusahaan yang fokus pada pembayaran regional bisa memakai Malaysia sebagai basis.',
      ],
    },
    {
      heading: 'Korea Selatan: kekuatan teknologi, fintech konservatif',
      body: 'Kakao Bank dan Toss membuktikan perbankan digital pada puluhan juta pengguna. Pajak domestik dan kehati-hatian mendorong ambisi ke luar.',
      paragraphs: [
        'Yang bekerja: Kakao Bank dengan 40 juta lebih pengguna, Toss Bank sebagai pemimpin pembayaran, CAGR sekitar 25,47% di segmen neobanking, dan infrastruktur berorientasi teknologi. Yang rusak: pajak korporasi 25 hingga 27%, regulasi kripto hati-hati, dan pertumbuhan lebih lambat dari pasar emerging.',
        'Siapa yang kurang terlayani: bisnis lintas batas yang butuh fintech regional, dan eksportir UMKM yang butuh infrastruktur pembayaran internasional. Korea Selatan berorientasi teknologi tapi mahal. Perusahaan di sini fokus pada ekspansi regional ke Asia Tenggara lebih daripada saturasi domestik.',
      ],
    },
    {
      heading: 'Taiwan: kekuatan semikonduktor, risiko geopolitik',
      body: 'TSMC adalah fakta strategis. Fintech kurang berkembang dibanding Singapura, Hong Kong, atau Asia Tenggara.',
      paragraphs: [
        'Yang bekerja: TSMC dengan sekitar 90% manufaktur chip maju global, ekosistem teknologi kuat, dan pengembangan bank digital. Yang rusak: risiko geopolitik dari ketegangan China, persyaratan modal tinggi, dan pendirian lambat (2 hingga 4 bulan untuk registrasi bisnis versus Singapura dalam menit).',
        'Siapa yang kurang terlayani: bisnis kripto dalam kerangka yang masih berkembang, dan perdagangan teknologi lintas batas. Pembiayaan rantai pasok untuk perdagangan semikonduktor kurang terlayani.',
      ],
    },
    {
      heading: 'Filipina: populasi muda, pajak tinggi, hub BPO',
      body: 'Populasi siap fintech termuda di Asia Tenggara, kepadatan GCash, dan skala BPO di bawah batas kepemilikan serta pajak nominal tinggi.',
      paragraphs: [
        'Yang bekerja: 120 juta lebih orang muda, Tonik Bank 2 juta pengguna dalam 3 tahun (bank digital dengan pertumbuhan tercepat di kawasan), GCash 92 juta lebih pengguna dompet digital, hub BPO dengan 1,3 juta lebih pekerja yang menangani operasi AS dan UE, serta pertumbuhan ekonomi sekitar 5,7%.',
        'Yang rusak: pajak korporasi tertinggi di Asia pada 37% dalam kerangka sumber, batas kepemilikan asing dan sektor terbatas, serta regulasi kompleks lintas banyak lembaga. Siapa yang kurang terlayani: pekerja BPO yang butuh rel remitansi lintas batas, eksportir UMKM yang butuh infrastruktur pembayaran internasional, dan populasi muda dengan penetrasi smartphone tinggi tapi perbankan tradisional terbatas.',
        'Filipina punya populasi siap fintech termuda di Asia Tenggara. Tonik membuktikan bank digital bisa berkembang cepat. Celahnya adalah pembayaran lintas batas untuk 1,3 juta pekerja BPO dan eksportir UMKM. Pemerintah ingin unicorn fintech, kematangan bank digital, inklusi keuangan, dan dukungan pembayaran industri BPO.',
      ],
    },
    {
      heading: 'Mendirikan sebagai orang asing: pendirian cepat',
      body: 'Singapura, Hong Kong, Vietnam, dan Thailand berada di pita dua hingga delapan minggu ketika dokumen bersih.',
      paragraphs: [
        'Singapura: sekitar 15 menit online sekitar 600 USD. Secara harfiah tercepat di Bumi. Anda bisa mendirikan dari mana saja tanpa berkunjung. Tax ID otomatis. Rekening bank terbuka dalam 5 hingga 7 hari. Terbaik untuk HQ regional kripto dan fintech serta infrastruktur pembayaran.',
        'Hong Kong: 2 hingga 3 minggu sekitar 1.200 USD. Juara kedua yang sangat cepat. Tidak perlu sewa kantor (mail forwarding OK). Companies Registry memproses cepat. Terbaik untuk gerbang China, kripto, dan operasi regional.',
        'Vietnam: 6 hingga 10 minggu dengan 1.500 hingga 3.500 USD. Sistem online sekarang tersedia. Lebih sederhana dari Thailand atau Indonesia. Butuh akuntan yang familiar dengan bisnis asing. Terbaik untuk manufaktur dan pekerjaan hub rantai pasok.',
        'Thailand: 4 hingga 8 minggu dengan 1.500 hingga 3.000 USD. Relatif lurus, dengan komplikasi Foreign Business Act (cara kerja: Board of Investment). Pembukaan rekening bank lambat 4 hingga 8 minggu dan menjadi bottleneck. Terbaik untuk hub regional, investasi real estate, dan pariwisata.',
      ],
    },
    {
      heading: 'Pendirian menengah dan kompleks',
      body: 'Indonesia, Filipina, Malaysia, Taiwan, dan Korea berada di tengah. China, India, dan Jepang membawa gesekan lebih berat.',
      paragraphs: [
        'Indonesia memakan 8 hingga 12 minggu dan 2.500 hingga 5.000 USD, dengan banyak lembaga, registrasi orang asing, dan birokrasi lebih dari rata-rata Asia Tenggara. Positive Investment List sekarang memungkinkan kepemilikan asing 100% pasca 2021. Terbaik untuk fintech, manufaktur, dan kehadiran lokal. Filipina memakan 20 hingga 35 hari dan 1.000 hingga 2.000 USD, sebenarnya cukup cepat, tapi pembatasan Foreign Investment Negative List berlaku dan modal minimum 200K USD berlaku untuk kepemilikan asing 40%+. Terbaik untuk bank digital, layanan BPO, dan pasar muda. Malaysia memakan 4 hingga 8 minggu dan 1.000 hingga 1.800 USD. Taiwan bisa didirikan dalam 2 hingga 4 minggu di atas kertas, tapi ARC memperpanjang 2 hingga 4 bulan. Korea Selatan memakan 4 hingga 6 minggu dan 1.500 hingga 3.000 USD dengan modal minimum sekitar KRW 10 juta (sekitar 8.000 USD).',
        'China memakan 8 hingga 12 minggu untuk jasa dan 4 hingga 6 bulan untuk manufaktur dengan 6.500 hingga 8.500 USD. WFOE adalah standar. Persetujuan SAMR diperlukan. Pembukaan rekening bank memakan 4 hingga 8 minggu. Kontrol modal membatasi repatriasi (6 hingga 8 minggu per transaksi, bisa ditolak). Tantangan sejati adalah mengeluarkan uang, bukan masuk. India memakan 6 hingga 8 minggu dan 1.500 hingga 2.500 USD, membutuhkan direktur penduduk India (hadir 182+ hari di tahun sebelumnya), memakai pengajuan digital MCA (SPICe+), dan butuh banyak registrasi pajak. Jepang memakan 4 hingga 6 minggu dan 2.000 hingga 4.500 USD dengan notarisasi, perbankan lambat, dan registrasi banyak lembaga.',
      ],
      bullets: [
        'Umum di semua: apostille atau notarisasi, setoran modal, registrasi pajak, registrasi pemberi kerja jika merekrut, verifikasi alamat, perbankan korporat (sering langkah paling lambat), dan lisensi sektor jika diperlukan',
      ],
      table: {
        columns: ['Pasar', 'Linimasa', 'Kerangka biaya', 'Terbaik untuk'],
        rows: [
          ['Singapura', 'Menit hingga hari', 'Sekitar 600 USD', 'Kripto, HQ fintech'],
          ['Hong Kong', '2 hingga 3 minggu', 'Sekitar 1.200 USD', 'Gerbang China, kripto'],
          ['Vietnam', '6 hingga 10 minggu', '1.500 hingga 3.500 USD', 'Hub manufaktur'],
          ['Thailand', '4 hingga 8 minggu', '1.500 hingga 3.000 USD', 'Pariwisata, real estate'],
          ['Indonesia', '8 hingga 12 minggu', '2.500 hingga 5.000 USD', 'Fintech, kehadiran lokal'],
          ['Filipina', '20 hingga 35 hari', '1.000 hingga 2.000 USD', 'Bank digital, BPO'],
          ['Malaysia', '4 hingga 8 minggu', '1.000 hingga 1.800 USD', 'Hub ASEAN'],
          ['China', '8 hingga 12 minggu+', '6.500 hingga 8.500 USD', 'Manufaktur, jangka panjang'],
          ['India', '6 hingga 8 minggu', '1.500 hingga 2.500 USD', 'Teknologi, fintech'],
          ['Jepang', '4 hingga 6 minggu', '2.000 hingga 4.500 USD', 'Teknologi mapan'],
        ],
      },
    },
    {
      heading: 'Apa yang diinginkan pemerintah',
      body: 'Target pemerintah eksplisit. Fintech adalah strategi.',
      table: {
        columns: ['Negara', 'Strategi eksplisit'],
        rows: [
          ['India', 'Inklusi keuangan digital untuk 500 juta tanpa bank; UPI sebagai standar global'],
          ['Vietnam', 'Hub rantai pasok yang menangkap dari China'],
          ['Indonesia', 'Penciptaan unicorn fintech; inklusi untuk 278 juta orang'],
          ['Filipina', 'Kematangan bank digital; dukungan BPO; inovasi fintech'],
          ['Thailand', 'Hub pembayaran regional; sektor berinsentif BOI'],
          ['Singapura', 'Status hub kripto dan blockchain'],
          ['Hong Kong', 'Inovasi fintech dan kripto; internasionalisasi RMB'],
          ['Taiwan', 'Ekosistem teknologi dan rantai pasok semikonduktor'],
          ['Korea Selatan', 'Kematangan ekosistem fintech; status hub regional'],
          ['China', 'Dominasi teknologi domestik; Belt and Road; ekspor yuan'],
          ['Malaysia', 'Pusat keuangan ASEAN; kepemimpinan fintech regional'],
          ['Jepang', 'Fintech populasi menua; fintech institusional'],
        ],
      },
    },
    {
      heading: 'Apa permintaan pasar yang sebenarnya',
      body: 'Di bawah target pemerintah, berikut yang benar-benar didanai dan dibangun.',
      paragraphs: [
        'Pembayaran konsumen adalah pasar masif: super app, dompet digital (Momo 50 juta pengguna, GCash 92 juta pengguna), platform BNPL tumbuh sekitar 25% per tahun, dan bank digital seperti Tonik. Permintaan konsumen adalah kenyamanan, kecepatan, dan tanpa biaya. Pasar-pasar ini sudah bergerak melewati kartu kredit ke pembayaran digital instan.',
        'Pinjaman UMKM adalah pasar besar yang kurang terlayani. Platform e-commerce yang menerbitkan pinjaman UMKM mengalahkan bank tradisional. Platform pembiayaan rantai pasok sedang muncul. UMKM tidak butuh branding fintech. Mereka butuh kredit, dan akan mengambilnya dari siapa pun yang bisa memverifikasi mereka paling cepat. Data transaksi mengalahkan biro kredit.',
        'Perdagangan lintas batas sepenuhnya rusak. Importir UMKM membayar biaya tersembunyi 5 hingga 10% untuk dibayar dari China. Pengirim remitansi membayar biaya 2 hingga 5%. Ekspor impor masih memakai perbankan lama. Permintaan pasar adalah kecepatan, pengurangan biaya, dan keamanan. Belum ada yang menyelesaikan ini pada skala.',
        'Pembayaran B2B domestik punya rel instan yang dibangun, tapi integrasi hilang. PromptPay, PayNow, BI FAST, QRIS, dan DuitNow tidak saling terhubung. Permintaan pasar adalah satu API untuk menjangkau seluruh ASEAN.',
      ],
    },
    {
      heading: 'Apa yang sudah dibangun perusahaan, dan apa yang tidak mereka dapatkan',
      body: 'Infrastruktur pembayaran, bank digital, dan pinjaman ramai. Celah sejati masih terbuka.',
      paragraphs: [
        'Sudah membangun: Grab dan Gojek sebagai super app Asia Tenggara; Momo di Vietnam sebagai dompet plus pembayaran plus pinjaman plus investasi; Tonik, Kakao Bank, dan Jago sebagai bank digital; Kredivo, Fintech, Atome, dan platform e-commerce sebagai pinjaman dan kredit. Perusahaan-perusahaan ini mencari talenta (gaji naik 30 hingga 40% dalam 2 tahun), modal untuk model terbukti, kemitraan dengan bank, telco, dan platform e-commerce, data transaksi, dan kejelasan regulasi.',
        'Apa yang tidak mereka dapatkan: infrastruktur pembayaran lintas batas terpadu untuk Asia; pembiayaan rantai pasok yang bekerja untuk UMKM di dalam pasar 415B USD yang tumbuh 7%; kredit alternatif untuk pedagang thin file di luar platform e-commerce; tokenisasi real estate pada skala; dan produk lindung nilai mata uang untuk UMKM yang menghadapi risiko FX di kedua sisi perdagangan.',
      ],
      bullets: [
        'Celah 1: Infrastruktur pembayaran lintas batas',
        'Celah 2: Pembiayaan rantai pasok untuk UMKM',
        'Celah 3: Kredit alternatif untuk pedagang thin file',
        'Celah 4: Tokenisasi real estate',
        'Celah 5: Lindung nilai mata uang untuk UMKM',
      ],
    },
    {
      heading: 'Budaya dan lingkungan operasi',
      body: 'Budaya pembayaran, budaya bisnis, prediktabilitas regulasi, dan talenta semua berubah per pasar.',
      paragraphs: [
        'China native digital dengan transaksi online 90%+, Alipay dan WeChat Pay ada di mana-mana, tunai menghilang, pola pikir mobile first, dan skeptis terhadap sistem pembayaran Barat. India ditulis ulang oleh UPI; ponsel fitur cukup; tunai masih signifikan 40 hingga 50%; kepercayaan pada sistem pemerintah tinggi; adopsi smartphone berakselerasi. Jepang tetap berat kartu kredit online sekitar 55%, dengan kepercayaan tinggi pada perbankan, tunai masih dihormati sekitar 30%, adopsi digital lebih lambat dari Asia Tenggara, dan pengguna lansia yang butuh kesederhanaan.',
        'Asia Tenggara (Thailand, Vietnam, Indonesia, Filipina) digital first dan mobile first, native super app, dengan tunai menurun dari 30 hingga 50% tergantung negara, telah melompati kartu kredit sepenuhnya, dan usia median muda di pertengahan dua puluhan hingga tiga puluhan. Singapura dan Hong Kong sepenuhnya digital, berpikiran multi mata uang, tercepat mengadopsi fintech baru, sadar kripto (Singapura paling), dan mengutamakan kecepatan serta keamanan.',
        'Budaya bisnis: China menghargai kecepatan dan guanxi dengan kepatuhan yang naik dan norma pengawasan yang diterima. India intensif dokumen tapi sedang mendigitalkan, dengan keunggulan berbahasa Inggris. Asia Tenggara berbasis hubungan dengan pemerintah kurang intrusif dari China dan bahasa Inggris tidak merata (Filipina terkuat). Singapura, Hong Kong, Jepang, dan Korea Selatan berbasis proses, dokumentasi penting, berbasis aturan, dan bahasa Inggris banyak dipakai.',
      ],
    },
    {
      heading: 'Prediktabilitas regulasi dan talenta',
      body: 'Di mana aturan jelas, dan di mana talenta benar-benar berada.',
      paragraphs: [
        'Paling prediktabel: Singapura, Hong Kong, Jepang, Korea Selatan. Cukup prediktabel: Thailand, Malaysia, Taiwan. Kurang prediktabel: Vietnam, Indonesia, Filipina, China, India.',
        'Talenta teknologi terbaik: India (Bengaluru, Hyderabad), China (Shanghai, Beijing, Shenzhen), Singapura (terbatas tapi premium). Talenta operasional terbaik: hub BPO Filipina dengan 1,3 juta lebih pekerja berbahasa Inggris berpengalaman, dan pekerjaan back office India. Pendiri startup terbaik: konsentrasi fintech Singapura, pendiri kripto Hong Kong yang meninggalkan batasan China, pendiri generasi baru Vietnam, dan preseden super app Indonesia.',
      ],
      bullets: [
        'Paling prediktabel: Singapura, Hong Kong, Jepang, Korea Selatan',
        'Kurang prediktabel: Vietnam, Indonesia, Filipina, China, India',
        'Talenta: India dan China untuk teknologi; Filipina untuk operasi BPO; Singapura dan Hong Kong untuk pendiri dan HQ',
      ],
    },
    {
      heading: 'Skala dan titik balik',
      body: 'Volume transaksi harian Asia Pasifik 13,17 triliun USD, sekitar 43% dari tumpukan harian dunia 35T USD. Ukuran pasar fintech sekitar 167,71 miliar USD pada 2026, tumbuh menuju 348,1B USD pada 2031.',
      paragraphs: [
        'PDB Asia 43,12 triliun USD, sekitar 37% dari kerangka global 116T USD. Populasi 4,7 miliar, 60% dunia. Terjemahan: Asia bukan pasar untuk dieksplorasi. Ia adalah pasar. Ia punya peluang fintech sekitar 10x Eropa atau AS berdasarkan skala.',
        'Adopsi pembayaran digital bergerak dari infrastruktur dasar (2000 hingga 2010), ke digital penuh dengan Alipay, WeChat, dan UPI (2010 hingga 2020), ke super app dan pembayaran instan dengan PromptPay, PayNow, BI FAST, dan QRIS (2020 hingga 2026). Berikutnya: integrasi rel lintas batas, tokenisasi, dan kredit alternatif pada skala.',
        'Pemerintah bergerak dari eksperimental (2015 hingga 2020) ke all in (2020 hingga 2026), membangun rel pembayaran, menerbitkan lisensi kripto, dan menargetkan unicorn. Fintech kini strategi pemerintah. Modal mengikuti: VC hati-hati, lalu menggandakan (valuasi Grab 40B+ USD, rekor pendanaan fintech), lalu mengejar model terbukti di super app, BNPL, dan bank digital.',
      ],
    },
    {
      heading: 'Model terbukti dan peluang belum terbukti',
      body: 'Uang mengikuti model terbukti. Modal baru masih bisa menang di celah yang belum terbukti.',
      paragraphs: [
        'Terbukti: super app (Grab, Gojek) yang menggabungkan ride-hailing, pembayaran, dan keuangan menjadi parit yang bisa dipertahankan; platform BNPL (Kredivo, Fintech) dengan pertumbuhan tahunan 25% dan unit ekonomi terbukti; bank digital (Tonik, Kakao) mengisi celah bank untuk populasi muda; keuangan tertanam e-commerce (Tokopedia, Shopee) memakai data transaksi untuk mengalahkan kredit tradisional.',
        'Peluang belum terbukti di mana modal baru bisa menang: pembayaran UMKM lintas batas (pasar 15,8T USD, belum ada yang menyelesaikan); pembiayaan rantai pasok untuk UMKM (pasar 415B USD, pertumbuhan 7%, kurang terlayani); integrasi pembayaran B2B regional (1,2T+ USD harian, rel terfragmentasi); tokenisasi real estate (baru muncul, belum ada pemimpin); kredit alternatif pada skala (e-commerce sudah menemukan, sektor tradisional belum).',
      ],
      table: {
        columns: ['Peluang', 'Kerangka pasar', 'Status'],
        rows: [
          ['Pembayaran UMKM lintas batas', '15,8T USD per tahun', 'Belum diselesaikan pada skala'],
          ['Pembiayaan rantai pasok UMKM', '415B USD, tumbuh 7%', 'Hanya Fortune 500'],
          ['Integrasi rel B2B regional', '1,2T+ USD harian SE Asia', 'Terfragmentasi'],
          ['Tokenisasi real estate', 'Baru muncul', 'Belum ada pemimpin skala'],
          ['Kredit alternatif pada skala', '500 juta+ thin file', 'Parsial, dipimpin e-commerce'],
        ],
      },
    },
    {
      heading: 'Kejutan terbesar dalam data',
      body: 'Lima fakta yang menulis ulang bagaimana operator harus memikirkan Asia.',
      paragraphs: [
        'Fintech tidak mengganggu Asia seperti mengganggu Barat. Asia melewatkan kartu kredit sepenuhnya dan langsung ke digital. Itu perbedaan mendasar dalam infrastruktur.',
        'Pemerintah membangun rel pembayaran, bukan perusahaan. UPI, PromptPay, BI FAST, QRIS, PayNow: semua dibangun pemerintah. Itu mendemokratisasi inovasi.',
        'Platform e-commerce adalah disruptor fintech sejati. Mereka mengalahkan bank di pinjaman UMKM karena punya data transaksi. Tokopedia, Shopee, dan Lazada menerbitkan lebih banyak pinjaman UMKM daripada bank tradisional.',
        'Pembayaran lintas batas masih rusak. Meski semua inovasi, memindahkan uang antar negara Asia masih mahal dan lambat. Ini perbatasan terakhir.',
        'Kesuksesan China punya tanggal kedaluwarsa untuk inovasi fintech terbuka. Kontrol modal dan larangan kripto berarti inovasi fintech bergerak ke Singapura, Hong Kong, dan Asia Tenggara. China membangun infrastruktur tapi tidak bisa berinovasi bebas di dalamnya.',
      ],
    },
    {
      heading: 'Apa artinya bagi operator, investor, dan korporasi',
      body: 'Pilih pekerjaan. Lalu pilih pasar.',
      paragraphs: [
        'Jika Anda membangun fintech: pilih pasar dengan dukungan pemerintah (India, Asia Tenggara, Singapura). Hindari China kecuali Anda di manufaktur atau keuangan institusional. Pilih model terbukti (super app, BNPL, bank digital) atau celah besar yang kurang terlayani (lintas batas, pembiayaan rantai pasok). Talenta berlimpah dan lebih murah di India, Indonesia, dan Filipina. Kejelasan regulasi penting: Singapura dan Hong Kong terbaik; Vietnam dan Thailand lebih berisiko.',
        'Jika Anda mencari investasi: imbal hasil real estate menunjuk ke Thailand (7 hingga 9%), Bali (5 hingga 10% dengan risiko leasehold), dan Vietnam (imbal hasil saat ini 2 hingga 4% dengan apresiasi 8 hingga 15%). Pertumbuhan fintech menunjuk ke Filipina (model Tonik), Indonesia (super app, BNPL), dan Vietnam (200+ startup). Kerangka return saham menunjuk ke Vietnam 12 hingga 15% per tahun, India 10 hingga 14%, dengan pasar emerging mengungguli yang maju dalam rentang perencanaan.',
        'Jika Anda korporasi yang ekspansi: Singapura adalah hub (mahal tapi efisien). India adalah back office talenta (tenaga kerja masif, lebih murah). Asia Tenggara adalah pasar pertumbuhan (populasi muda, underbanked). China masih pabrik, tapi kontrol modal membuat repatriasi menyakitkan.',
      ],
    },
    {
      heading: 'Peluang sejati',
      body: 'Asia tidak butuh perusahaan pembayaran global lain. Ia butuh eksekusi pada celah.',
      paragraphs: [
        'Yang dibutuhkan: integrasi lintas batas yang menghubungkan PromptPay ke PayNow ke BI FAST; otomasi pembiayaan rantai pasok yang bekerja untuk UMKM, bukan hanya Fortune 500; kredit alternatif pada skala memakai data transaksi untuk menjangkau yang tanpa bank; tokenisasi real estate yang menyelesaikan illikuiditas di pasar emerging; dan super app regional yang memindahkan uang lintas lima negara lebih.',
        'Celah-celah ini mewakili peluang penciptaan nilai lebih dari 100B USD. Modal tersedia. Talenta fintech tersedia. Rel pembayaran ada. Yang hilang adalah eksekusi pada celah, bukan membangun kartu kredit atau aplikasi pembayaran yang lebih cepat.',
      ],
      pullQuote: 'Kawasan ini bukan emerging. Ia sudah emerged. Pertanyaan bagi operator fintech: celah mana yang akan Anda isi?',
    },
  ],
  marketContext: [
    'Asia Pasifik: PDB 43,12T USD, volume harian 13,17T USD, 4,7 miliar orang, pasar fintech mendekati 168B USD tumbuh menuju 348B USD pada 2031.',
    'Rel domestik matang di India dan ASEAN. Integrasi lintas batas, pembiayaan rantai pasok UMKM, dan kredit thin file tetap terbuka.',
    'Singapura dan Hong Kong adalah kota hub. China adalah skala dengan gesekan outbound. India dan Asia Tenggara membawa inklusi dan pertumbuhan.',
    'Modal terbukti mengikuti super app, BNPL, bank digital, dan kredit e-commerce. Upside belum terbukti ada di celah.',
  ],
  providerLandscape: [
    {
      metric: 'Dompet domestik China', leader: 'Alipay dan WeChat Pay', value: 'Memimpin', tone: 'up',
      signal: 'Dominasi digital 90%+', note: 'Outbound adalah celah',
    },
    {
      metric: 'A2A publik India', leader: 'UPI', value: 'Memimpin', tone: 'up',
      signal: '13 miliar transaksi sebulan', note: 'Fintech mana pun bisa membangun di atasnya',
    },
    {
      metric: 'Rel instan ASEAN', leader: 'PromptPay, PayNow, BI FAST, DuitNow, InstaPay', value: 'Memimpin', tone: 'up',
      signal: 'Hampir 1,2T USD harian gabungan', note: 'Belum terhubung',
    },
    {
      metric: 'Super app', leader: 'Grab, Gojek, Kakao, Momo', value: 'Memimpin', tone: 'up',
      signal: 'Pembayaran plus ekosistem', note: 'Magnet modal terbukti',
    },
    {
      metric: 'Bank digital', leader: 'Tonik, Kakao Bank, Jago', value: 'Naik', tone: 'up',
      signal: 'Skala populasi muda', note: 'Masih mengisi celah bank',
    },
  ],
  implications: [
    'Perlakukan Asia Pasifik sebagai peta pasar utama, bukan pemikiran belakangan ekspansi.',
    'Bangun di atas rel pemerintah alih-alih mencoba menggantikannya.',
    'Menang di pembayaran UMKM lintas batas, pembiayaan rantai pasok, integrasi rel, tokenisasi, atau kredit alternatif.',
    'Pakai Singapura atau Hong Kong sebagai entitas hub kecuali regulator memaksa sebaliknya.',
    'Perlakukan outbound China dan SAFE sebagai risiko produk kelas satu.',
    'Sesuaikan strategi talenta dengan pasar: India dan China untuk teknologi, Filipina untuk operasi BPO, Singapura dan Hong Kong untuk HQ.',
    'Ikuti model terbukti untuk modal jangka pendek, atau sebutkan celah belum terbukti spesifik jika Anda ingin ruang putih terbuka.',
  ],
  closing: 'Kawasan ini bukan emerging. Ia sudah emerged. Pertanyaan bagi operator fintech: celah mana yang akan Anda isi?',
  methodology: 'Analisis mendalam operator yang mencakup skala Asia Pasifik, sejarah, lanskap fintech, celah per negara, pendirian asing, permintaan pemerintah dan pasar, budaya, dan takeaway. Angka makro dan volume adalah input perencanaan arah. Bukan nasihat hukum, pajak, atau investasi.',
  sources: [
    'Brief mendalam operator Asia Pasifik (Agu 2026)',
    'NPCI UPI; NAPAS; Bank Indonesia BI FAST dan QRIS; MAS PayNow; BOT PromptPay; Bank Negara DuitNow; BSP InstaPay dan PESONet',
    'Headline perusahaan publik, pajak, dan lisensi di dua belas pasar',
    'Pelacak industri pembayaran APAC, remitansi, dan makro',
  ],
  cta: { title: 'Membangun di Asia Pasifik?', lede: 'Relay mengubah analisis mendalam ini menjadi daftar pendek koridor: ekonomi, entitas, rel, dan cakupan penyedia dalam satu bingkai.', label: 'Hubungi penjualan', href: 'https://calendly.com/gratebridgelabs/30min?month=2026-08' },
  discoverMarket: 'Asia-Pacific',
}
