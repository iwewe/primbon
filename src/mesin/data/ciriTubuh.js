/**
 * Ciri tubuh menurut kitab Betaljemur Adammakna: bab 112 (andeng-andeng, 57 letak), bab 113 (toh, 5 letak),
 * bab 119 (watak menurut anggota badan, 80 butir; hlm. 74-77 dan 91-98).
 *
 * Bab 112 dan 113 dicocokkan dengan scan butir demi butir (termasuk keganjilan cetakan); bab 119 teksnya
 * dibandingkan dengan scan pada beberapa halaman. Makna ditulis ulang singkat dan lebih netral daripada kitab;
 * `arah` (baik/buruk/netral) adalah klasifikasi kami.
 *
 * Ini fisiognomi tradisional: tidak ada dasar ilmiah untuk menilai watak, rezeki, keturunan, atau umur dari
 * bentuk tubuh. Jangan dipakai untuk menilai atau mendiskriminasi orang. Butir bab 119 yang berisi perkiraan
 * umur dan keturunan dicantumkan sebagai isi kitab saja.
 */

const S = (bab, halaman, verifikasi = 'scan') => ({ bab, halaman, verifikasi });

export const PERINGATAN_CIRI = 'Fisiognomi tradisional dari kitab Betaljemur Adammakna. Tidak ada dasar ilmiah untuk menilai watak, rezeki, keturunan, atau umur dari bentuk tubuh; jangan dipakai menilai atau mendiskriminasi orang.';

const a = (no, lokasi, nama, makna, arah) => ({ no, lokasi, nama, makna, arah });

// --- Bab 112: andeng-andeng (tahi lalat) menurut letak -----------------------------------------------------------------------
export const ANDENG_ANDENG = {
  sumber: S(112, [74, 75, 76, 77]),
  catatanCetak: 'Nama Tujusih muncul pada butir 17 dan 18, dan Gunasakti pada butir 9 dan 21; butir 36 dan 37 tercetak dengan letak yang sama ("kedua telapak kaki", Buditama dan Weda); butir 57 tidak bernama. Semuanya disalin apa adanya.',
  tabel: [
    a(1, 'kepala bagian kanan', 'Manikharda', 'Banyak kebahagiaan dan segala kehendak tercapai', 'baik'),
    a(2, 'kepala bagian kiri', 'Jemjem', 'Tidak mantap, sering terganggu', 'buruk'),
    a(3, 'kepala bagian belakang', 'Cantuka', 'Sabar, berani, jujur, tenteram', 'baik'),
    a(4, 'embun-embun', 'Duryuti', 'Tidak jujur; wataknya tidak terus terang', 'buruk'),
    a(5, 'uyeng-uyeng (ubun-ubun)', 'Pulungjati', 'Pandai, teliti, sangat berhati-hati, hatinya sangat baik', 'baik'),
    a(6, 'bathuk (dahi) kiri atau kanan', 'Werdatama', 'Tajam pikirannya', 'baik'),
    a(7, 'tengah dahi', 'Bercara', 'Pandai dan halus bicara, berani, baik hati', 'baik'),
    a(8, 'pelipis kiri, kanan, atau keduanya', 'Srituwuh', 'Banyak rezeki; usahanya banyak membawa untung', 'baik'),
    a(9, 'kelopak mata kanan, kiri, atau keduanya', 'Gunasakti', 'Mudah bermasyarakat, tidak kekurangan, pandai budi, mudah rezeki', 'baik'),
    a(10, 'bawah kelopak mata', 'Punggung', 'Kurang cerdas, malas, hidup sulit, tidak mau menerima nasihat', 'buruk'),
    a(11, 'sudut mata kanan atau kiri', 'Tamengtuwuh', 'Pendiam; perkataannya dapat dipercaya', 'baik'),
    a(12, 'sudut mata dekat pangkal hidung', 'Sripadu', 'Rendah hati, dapat dipercaya, rela, pandai', 'baik'),
    a(13, 'bagian putih mata', 'Buta', 'Pemarah, tidak jujur, sombong', 'buruk'),
    a(14, 'alis kanan', 'Kajen', 'Baik hati, suka menolong', 'baik'),
    a(15, 'alis kiri', 'Jatmika', 'Banyak yang mencintai; setelah menikah banyak selamat dan untung', 'baik'),
    a(16, 'pipi dekat mata', 'Srigati', 'Suka bersahabat dan memberi; menjamu tamu dengan memuaskan', 'baik'),
    a(17, 'pipi kiri, kanan, atau keduanya', 'Tujusih', 'Banyak yang mencintai; rumahnya sering dikunjungi', 'baik'),
    a(18, 'tengah papah (pangkal) hidung', 'Tujusih', 'Dicintai setelah menikah; banyak untung', 'baik'),
    a(19, 'hidung (bagian mana saja)', 'Pulungsih', 'Cita-cita banyak terlaksana, untung, dicintai', 'baik'),
    a(20, 'bawah saluran hidung', 'Palguna', 'Pandai bicara dan rajin bekerja; rezeki sering seret', 'netral'),
    a(21, 'bibir atas', 'Gunasakti', 'Mudah penghidupannya dan pandai', 'baik'),
    a(22, 'bibir bawah', 'Lumer', 'Baik hati dan dicintai', 'baik'),
    a(23, 'daun telinga', 'Srikurda', 'Keras hati, pemarah', 'buruk'),
    a(24, 'ujung mulut', 'Nylarem', 'Pandai bicara; banyak kesukaran hidup', 'netral'),
    a(25, 'dagu (bagian mana saja)', 'Ciptakukila', 'Suka dan pandai bicara; perkataan sering melampaui batas', 'netral'),
    a(26, 'leher (bagian mana saja)', 'Sridaya', 'Pandai dan lapang hati', 'baik'),
    a(27, 'belakang leher', 'Punggel', 'Kurang cerdas; berpikir pendek', 'buruk'),
    a(28, 'pundak kiri', 'Jayalena', 'Pendiriannya tidak tetap', 'buruk'),
    a(29, 'pundak kanan', 'Jayakarsa', 'Mengetahui lebih dulu apa yang akan dikerjakan; keinginannya tenteram', 'baik'),
    a(30, 'dada kanan, kiri, atau keduanya', 'Tunggulrana', 'Tenteram, berani menghadapi kesukaran, dapat menyelesaikan pekerjaan', 'baik'),
    a(31, 'buah dada kiri, kanan, atau keduanya', 'Sriasih', 'Banyak yang mencintai', 'baik'),
    a(32, 'atas ulu hati (bawah tulang dada)', 'Rena', 'Cita-cita tercapai, baik budi', 'baik'),
    a(33, 'punggung kanan atau kiri', 'Reksamulya', 'Dapat menyimpan rahasia', 'baik'),
    a(34, 'pusat (pusar)', 'Manuhara', 'Baik tingkah lakunya; selalu mendapat kesenangan', 'baik'),
    a(35, 'pinggang kanan atau kiri', 'Kapita', 'Keras kemauan, dapat dipercaya', 'baik'),
    a(36, 'telapak kaki kiri atau kanan (letak tercetak sama dengan butir 37)', 'Buditama', 'Sering memberi nasihat dan pandai', 'baik'),
    a(37, 'telapak kaki kiri atau kanan (letak tercetak sama dengan butir 36)', 'Weda', 'Bersih hati dan gemar berbuat kebajikan', 'baik'),
    a(38, 'tulang punggung (ruas tulang belakang)', 'Murwat', 'Dicintai orang, dapat mencapai jabatan tinggi', 'baik'),
    a(39, 'lengan atau pangkal siku', 'Reksamuka', 'Tenteram dan setia pada pekerjaannya', 'baik'),
    a(40, 'telapak tangan', 'Rajakeleng', 'Badan kuat; bila tangannya memukul kadang membahayakan', 'netral'),
    a(41, 'punggung tangan (belakang telapak tangan)', 'Ragam', 'Dapat menyimpan harta benda', 'baik'),
    a(42, 'siku', 'Gutama', 'Suka berbuat kebaikan dan dicintai', 'baik'),
    a(43, 'tekukan siku', 'Purusa', 'Besar kemauan (tenteram)', 'baik'),
    a(44, 'ketiak', 'Tutup', 'Dapat menyimpan rahasia', 'baik'),
    a(45, 'jari tangan', 'Unggul', 'Segala yang dikerjakan mendatangkan untung', 'baik'),
    a(46, 'pergelangan tangan', 'Brasta', 'Boros, tanpa perhitungan', 'buruk'),
    a(47, 'pantat kiri atau kanan', 'Basu', 'Miskin, hidup sulit', 'buruk'),
    a(48, 'pangkal paha', 'Bimalaku', 'Besar kemauan, beruntung, cekatan bekerja', 'baik'),
    a(49, 'alat kelamin (kemaluan)', 'Gutukbrama', 'Banyak keuntungan', 'baik'),
    a(50, 'betis', 'Sitaresmi', 'Ingatannya jernih', 'baik'),
    a(51, 'tulang kering', 'Wregeng', 'Boros, tanpa perhitungan', 'buruk'),
    a(52, 'pergelangan kaki', 'Pasren', 'Tangguh menempuh perjalanan jauh dan gemar berpakaian rapi', 'baik'),
    a(53, 'kaki (kedua belah)', 'Amertani', 'Beruntung karena bertani', 'baik'),
    a(54, 'tumit', 'Juti', 'Suka berbohong dan menipu', 'buruk'),
    a(55, 'jari kaki', 'Werdiguna', 'Melaksanakan setiap kebajikan', 'baik'),
    a(56, 'lutut', 'Ancala', 'Kuat berjalan jauh, kuat menderita, ikhlas', 'baik'),
    a(57, 'tekukan lutut', null, 'Pendiriannya tidak tetap', 'buruk')
  ]
};

// --- Bab 113: toh (tanda lahir) menurut letak ---------------------------------------------------------------------------------
export const TOH = {
  sumber: S(113, [77]),
  tabel: [
    a(1, 'pantat', 'Surung', 'Betah duduk lama tanpa lelah', 'baik'),
    a(2, 'pantat, lebih dari satu', 'Basunya', 'Miskin, hidup sulit', 'buruk'),
    a(3, 'lekukan pantat', 'Lumrang', 'Pandai dan suka menolong', 'baik'),
    a(4, 'wajah', 'Wisadesti', 'Menyusahkan orang tua (kitab: orang tua tidak panjang usia)', 'buruk'),
    a(5, 'bagian belakang tubuh', 'Brajadesti', 'Miskin dan panas hati; bila tumbuh rambut pada toh itu tidak berbahaya', 'buruk')
  ]
};

// --- Bab 119, butir 1-21: ukuran tiap anggota badan ---------------------------------------------------------------------------
const v = (varian, makna, arah, no) => ({ varian, makna, arah, no });
export const UKURAN_ANGGOTA = {
  sumber: S(119, [91, 92, 93, 94]),
  bagian: {
    kepala: [
      v('besar', 'Selalu ingat', 'baik', 1), v('sedang', 'Pandai', 'baik', 1), v('kecil', 'Rendah budinya', 'buruk', 1)
    ],
    rambut: [
      v('merah dan lemas', 'Kurang cerdas, mudah putus asa, tidak tahu malu, mudah bingung, tidak dapat dipercaya', 'buruk', 1),
      v('kaku', 'Berani', 'baik', 2),
      v('lemas', 'Rendah budinya, penakut, tidak tahu malu', 'buruk', 2),
      v('sedang dan berombak', 'Menepati janji, tabah, dapat dipercaya, lapang hati', 'baik', 2),
      v('hitam', 'Lapang budi, berani menghadapi rintangan', 'baik', 2),
      v('hitam pekat seperti keduk', 'Segala pekerjaannya sempurna', 'baik', 2),
      v('kekuningan', 'Rendah budinya, pemarah, tidak mau dinasihati', 'buruk', 2),
      v('rambut halus di bawah tulang tengkorak belakang (tulang entong)', 'Berbudi luhur, setia janji, sempurna dalam bekerja', 'baik', 2)
    ],
    dahi: [
      v('sempit', 'Rendah budinya', 'buruk', 3), v('lebar', 'Pemalas', 'buruk', 3), v('sangat lebar', 'Tidak dapat dipercaya', 'buruk', 3),
      v('sedang dan tidak berkerut', 'Mengalah dan penuh belas kasih', 'baik', 3),
      v('berkerut membujur di antara alis', 'Keras, tidak sabar, banyak kesusahan', 'buruk', 3),
      v('berkerut melintang', 'Pandai, banyak pengetahuan, ikhlas, suka mengalah', 'baik', 3)
    ],
    alis: [
      v('bulu halus', 'Selamat dan dicintai', 'baik', 4),
      v('melengkung ke bawah', 'Pemalas, suka makan, sombong', 'buruk', 4),
      v('kedua alis bertemu', 'Suka bertengkar, kurang menghargai kebaikan, suka meminta dan tidak suka memberi', 'buruk', 4),
      v('sedikit melengkung ke atas', 'Besar budi tetapi senang pujian dan berlagak', 'netral', 4),
      v('sedang', 'Lapang budi, sempurna', 'baik', 4)
    ],
    telinga: [
      v('daun telinga sempit', 'Jahil, suka berbuat buruk', 'buruk', 5),
      v('daun telinga lebar', 'Kurang cerdas dan keras kepala, tetapi baik hati', 'netral', 5),
      v('daun telinga sedang', 'Berbudi', 'baik', 5)
    ],
    mata: [
      v('lebar', 'Pemalas, pendiriannya tidak tetap', 'buruk', 6), v('sempit', 'Penakut', 'buruk', 6),
      v('sedang', 'Segala sesuatu serba lebih', 'baik', 6),
      v('bercahaya', 'Cerdik dan setia janji', 'baik', 6), v('cekung', 'Suka memfitnah', 'buruk', 6),
      v('biji mata menggembung seperti biji petai', 'Jahil dan congkak', 'buruk', 6),
      v('bulu mata halus dan kerlingan menyempit', 'Budi dan bicaranya kurang baik', 'buruk', 6),
      v('jarang berkedip', 'Bekerja sempurna, pandai bicara', 'baik', 6),
      v('bola mata sangat hitam', 'Berhati-hati', 'baik', 6),
      v('bola mata kebiruan', 'Suka memfitnah, sombong', 'buruk', 6),
      v('bola mata kemerahan', 'Berani tanpa perhitungan', 'netral', 6),
      v('bola mata kekuningan', 'Buruk wataknya', 'buruk', 6),
      v('merah dan selalu berkedip seperti sapi', 'Berbudi rendah, gemar makan dan minum, mudah tergoda', 'buruk', 6),
      v('tepi mata berkerut', 'Pendengki', 'buruk', 6),
      v('tepi berkerut dan berair (seperti leher)', 'Suka memfitnah', 'buruk', 6),
      v('menggembung bila dipejamkan dan terbelalak bila dibuka', 'Berlagak pandai tetapi kurang cerdas; senang pujian', 'buruk', 6),
      v('sering berkedip dan bulu mata tidak teratur', 'Suka berbuat buruk', 'buruk', 6),
      v('berkedip bersusulan', 'Penakut, kurang cerdas', 'buruk', 6),
      v('mengerling bercabang ke kiri dan kanan', 'Suka bertengkar mulut, kurang menghargai kebaikan', 'buruk', 6),
      v('liyep-liyep (jarang berkedip, kerling tenang)', 'Berbudi luhur, ucapannya benar, sanggup bekerja, hati-hati, sopan', 'baik', 6),
      v('bola mata hitam keabu-abuan', 'Baik', 'baik', 6),
      v('tampak bayangan anak kecil terbalik tertawa pada pupil', 'Berusia panjang (kitab)', 'baik', 6)
    ],
    hidung: [
      v('mancung', 'Cita-cita terlalu besar tanpa menimbang kemampuan', 'netral', 7),
      v('cuping tebal', 'Pembual', 'buruk', 7), v('pucuk lebar di atas', 'Tidak jujur', 'buruk', 7),
      v('lebar ke bawah', 'Dorongan syahwat besar', 'netral', 7), v('lubang lebar', 'Suka memfitnah', 'buruk', 7),
      v('sedang', 'Baik dalam bekerja', 'baik', 7)
    ],
    mulut: [
      v('lebar', 'Pemarah dan keras hati', 'buruk', 8), v('sempit', 'Penakut, picik', 'buruk', 8),
      v('sedang, seperti tersenyum kecil', 'Menyenangkan dalam pergaulan; bekerja dengan tenang hingga tuntas', 'baik', 8)
    ],
    bibir: [
      v('tebal', 'Agak kurang cerdas', 'buruk', 9), v('sedang', 'Sempurna', 'baik', 9),
      v('tipis', 'Ingatan kuat', 'baik', 9), v('kebiruan', 'Pekerjaannya tidak dapat dipercaya', 'buruk', 9),
      v('kemerahan dengan ketebalan sedang', 'Pandai dalam segala hal, pandai bicara, baik hati', 'baik', 9)
    ],
    pipi: [
      v('tebal', 'Pemalas', 'buruk', 10), v('tidak ramping', 'Mudah tersesat (menasar)', 'buruk', 10),
      v('seperti durian terbelah', 'Keinginannya selalu terpenuhi', 'baik', 10),
      v('ramping', 'Berwatak utama dan berbudi halus', 'baik', 10)
    ],
    gigi: [
      v('jarang dan kecil', 'Tidak pernah berniat baik', 'buruk', 11), v('panjang, besar, dan jarang', 'Suka memfitnah', 'buruk', 11),
      v('sedang dan rata berjajar', 'Benar dan baik kemauannya', 'baik', 11)
    ],
    dagu: [
      v('kecil', 'Suka memfitnah', 'buruk', 12), v('besar dan tebal', 'Sombong dan takabur', 'buruk', 12),
      v('sedang', 'Baik budi dan hatinya', 'baik', 12)
    ],
    kumis: [
      v('tebal, panjang, agak merah', 'Penakut, berhati kecil', 'buruk', 13),
      v('panjang tetapi jarang (seperti kucing)', 'Keinginannya tidak baik', 'buruk', 13),
      v('tebal pendek hitam teratur', 'Dapat menyelesaikan pekerjaan, tenteram', 'baik', 13),
      v('tampak baik tanpa diatur', 'Dalam bekerja dapat menyempurnakannya', 'baik', 13),
      v('panjang dan jarang', 'Agak kurang cerdas, kurang berbudi', 'buruk', 13),
      v('jarang tetapi lembut', 'Banyak akal', 'baik', 13),
      v('tumbuh tidak teratur', 'Kerap ingkar janji; maksudnya kurang baik', 'buruk', 13),
      v('cukupan tanpa diatur', 'Baik dalam bekerja', 'baik', 13)
    ],
    leher: [
      v('pendek', 'Suka berbuat tidak baik', 'buruk', 14), v('panjang', 'Tidak suka menepati janji, pendirian tidak tetap', 'buruk', 14),
      v('tebal', 'Senang makan tanpa malu', 'buruk', 14), v('sedang', 'Baik keinginannya dan banyak akal', 'baik', 14)
    ],
    bahu: [
      v('lurus', 'Penolong dan tidak gentar menghadapi halangan', 'baik', 15),
      v('condong ke depan', 'Suka berbuat kesalahan, sulit menerima kebaikan', 'buruk', 15)
    ],
    dada: [v('lebar', 'Pemalas', 'buruk', 16), v('sedang', 'Cerdas dan banyak akal, sanggup mengerjakan beragam tugas', 'baik', 16)],
    perut: [v('besar', 'Pemalas', 'buruk', 17), v('sedang', 'Tangkas dalam segala hal', 'baik', 17)],
    pantat: [v('besar', 'Pemalas dan tidak tahu malu', 'buruk', 18), v('sedang', 'Setia melaksanakan pekerjaan', 'baik', 18)],
    paha: [v('besar', 'Agak kurang cerdas dan keras watak', 'buruk', 19)],
    jari: [
      v('pendek (tangan atau kaki)', 'Iri hati dan suka memfitnah', 'buruk', 20),
      v('panjang, lurus, meruncing (tangan atau kaki)', 'Banyak akal dan berbudi halus', 'baik', 20)
    ],
    suara: [
      v('keras dan jelas', 'Berani menghadapi rintangan tanpa takut mati', 'baik', 21),
      v('lemah dan melengking (kemeng)', 'Mudah lupa, enggan bekerja, gentar menghadapi halangan', 'buruk', 21),
      v('sedang', 'Tidak sombong', 'baik', 21),
      v('berat tetapi tidak jelas', 'Sering beristri, kurang sayang keluarga, mudah bosan', 'buruk', 21)
    ]
  }
};

// --- Bab 119, butir 22-80: tanda gabungan -------------------------------------------------------------------------------------------
const t = (no, bagian, tanda, makna, arah) => ({ no, bagian, tanda, makna, arah });
export const TANDA_GABUNGAN = {
  sumber: S(119, [92, 93, 94, 95, 96, 97, 98]),
  catatan: 'Beberapa butir menyebut umur dan keturunan; dicantumkan sebagai isi kitab, bukan fakta.',
  tabel: [
    t('22a', ['badan', 'rambut'], 'Badan pendek kecil agak bungkuk, rambut kemerahan', 'Suka berbuat jahat', 'buruk'),
    t('22b', ['badan'], 'Badan tinggi besar dan seimbang', 'Bijaksana dan berbudi halus', 'baik'),
    t('22c', ['mata', 'dagu', 'dahi', 'suara'], 'Mata kebiruan dengan putih mata merah atau kuning, dagu runcing, dahi lebar, jenggot tidak teratur, suara berat tidak jelas', 'Dinilai kitab sebagai pertanda sangat buruk', 'buruk'),
    t(23, ['wajah', 'mata', 'hidung', 'dagu'], 'Wajah baik, mata lebar dan bercahaya, hidung mancung seimbang, dagu panjang', 'Kebahagiaan penuh, hidup senang dan selamat', 'baik'),
    t(24, ['tangan', 'kaki'], 'Tangan dan kaki halus, jari seimbang, daging lembut', 'Hidup senang; cocok untuk pekerjaan halus', 'baik'),
    t(25, ['tangan', 'kaki', 'badan'], 'Tangan dan kaki kasar, jari besar pendek, kaki panjang, badan kurus kering', 'Hidup susah; hanya mampu pekerjaan kasar', 'buruk'),
    t(26, ['rambut', 'dahi', 'kulit'], 'Rambut tumbuh rendah sehingga dahi sempit, kulit kasar kering berkerut', 'Kurang cerdas, budi rendah', 'buruk'),
    t(27, ['dagu', 'leher', 'dahi', 'mata', 'mulut'], 'Dagu besar dan pantas, leher gemuk tebal, dahi lebar pantas, mata dan mulut seimbang (daging bawah dagu berlapis menambah)', 'Disegani dan berpangkat tinggi', 'baik'),
    t(28, ['dagu'], 'Dagu besar, panjang, tebal', 'Di usia tua mendapat kesenangan', 'baik'),
    t('28b', ['dagu'], 'Dagu sangat besar dan panjang hingga terlihat dari belakang', 'Kurang iba dan tamak', 'buruk'),
    t('28c', ['dagu'], 'Dagu kecil dan runcing', 'Banyak kesusahan', 'buruk'),
    t(29, ['mata', 'bibir'], 'Mata lebar seimbang, bibir lebar dan rata', 'Dapat kaya dan baik hati', 'baik'),
    t(30, ['mata', 'hidung'], 'Kelopak bawah mata cekung, tepi mata tebal, puncak hidung melengkung ke bawah', 'Setengah usia sulit mendapat keturunan (kitab)', 'buruk'),
    t(31, ['mata', 'hidung'], 'Hitam dan putih mata kurang bersih dan tak bersinar, hidung kecil tidak mancung', 'Miskin selamanya (kitab)', 'buruk'),
    t(32, ['mata', 'alis'], 'Mata bersinar bersih, alis cukup panjang, halus, kehitaman', 'Pandai', 'baik'),
    t(33, ['mata'], 'Mata panjang, hitam putihnya bercahaya', 'Berpangkat tinggi', 'baik'),
    t('34a', ['mata'], 'Mata tak bercahaya, tergenang air, selalu mengerling', 'Suka berbuat buruk', 'buruk'),
    t('34b', ['mata', 'hidung'], 'Bola mata menggembung dan hidung seperti paruh betet', 'Jahil dan suka memfitnah', 'buruk'),
    t('34c', ['mata'], 'Bola mata menggembung bulat seperti mata ikan, tak bersinar; atau tak tahan lama melihat, sering berkedip, wajah gelap', 'Berumur pendek (kitab)', 'buruk'),
    t('35a', ['mata'], 'Mata tajam dan lurus saat melihat', 'Keras hati tetapi jujur, adil, berterus terang', 'baik'),
    t('35b', ['mata', 'wajah'], 'Melihat tahan lama, jarang berkedip, wajah dan penglihatan tajam', 'Panjang usia (kitab)', 'baik'),
    t('36a', ['mata'], 'Daging di bawah kelopak dekat pangkal hidung tebal', 'Masih muda sudah memiliki anak (kitab)', 'netral'),
    t('36b', ['mata', 'wajah'], 'Daging di sudut mata dekat pangkal hidung menurun tebal, wajah gelap', 'Jarang memiliki anak; anak sering meninggal (kitab)', 'buruk'),
    t('36c', ['mata'], 'Daging bawah kelopak tebal dan lebar', 'Terlambat memiliki anak (kitab)', 'netral'),
    t(37, ['hidung'], 'Hidung kecil, tidak mancung, membengkok', 'Boros, miskin, berusia pendek (kitab)', 'buruk'),
    t('38a', ['hidung'], 'Hidung tidak mancung dengan lubang menghadap atas', 'Banyak susah; pangkat kecil', 'buruk'),
    t('38b', ['hidung'], 'Puncak hidung membengkok seperti paruh betet', 'Kurang iba', 'buruk'),
    t('39a', ['hidung'], 'Hidung besar, seimbang, lurus, mancung', 'Pada usia 45-50 tahun berpangkat tinggi (kitab)', 'baik'),
    t('39b', ['hidung'], 'Puncak hidung besar dan merata', 'Baik hati', 'baik'),
    t(40, ['hidung', 'bibir', 'leher'], 'Hidung menghadap atas hingga lubang dalam terlihat, bibir atas pendek membalik hingga gigi tampak, jakun menonjol', 'Banyak mengalami celaka', 'buruk'),
    t(41, ['kulit', 'alis'], 'Kulit kuning (tidak hitam dan tidak putih), alis panjang melengkung tipis seperti bulan muda', 'Berpangkat, berani, pandai, banyak akal; sebagai prajurit gagah perwira', 'baik'),
    t(42, ['wajah', 'kulit'], 'Kulit muka tipis, kurang daging, urat dan tulang terlihat', 'Tidak panjang usia (kitab)', 'buruk'),
    t(43, ['leher'], 'Pada orang tua: dua urat bawah leher jelas, daging sisi leher menggelantung', 'Banyak beruntung dan lebih panjang usia (kitab)', 'baik'),
    t(44, ['kepala'], 'Tulang menonjol pada kepala', 'Terhindar dari marabahaya; hidup selamat', 'baik'),
    t('45a', ['wajah', 'hidung'], 'Muka sangat lebar dan hidung kecil', 'Sangat bersusah payah mencari penghidupan', 'buruk'),
    t('45b', ['wajah', 'hidung'], 'Muka lebar, hidung mancung, daging tipis', 'Boros', 'buruk'),
    t('45c', ['wajah', 'hidung'], 'Muka lebar dengan hidung seimbang', 'Banyak untung', 'baik'),
    t('46a', ['wajah'], 'Dari bawah hidung sampai dagu panjang', 'Walau kaya tetap hidup sengsara', 'buruk'),
    t('46b', ['wajah'], 'Muka seimbang dari dahi sampai dagu (mata, hidung, bibir, pipi, dagu)', 'Selamat dan beruntung sejak kecil hingga tua', 'baik'),
    t('46c', ['wajah', 'dahi'], 'Muka panjang pada bagian dahi sampai alis', 'Masa muda enak', 'baik'),
    t('46d', ['wajah', 'alis', 'hidung'], 'Muka panjang pada bagian alis sampai hidung', 'Di paruh hidup beruntung dan jenjang pangkatnya mudah naik', 'baik'),
    t('47a', ['wajah', 'kulit'], 'Muka kasar seperti kulit jeruk, berkerut, pori besar', 'Selalu berselisih dengan anak istri', 'buruk'),
    t('47b', ['wajah', 'kulit'], 'Kulit muka putih dadu dan sangat halus', 'Kurang setia', 'buruk'),
    t(48, ['wajah', 'pipi', 'kulit'], 'Muka dan kedua pipi penuh panu', 'Tidak iba; sewenang-wenang', 'buruk'),
    t(49, ['wajah', 'kulit', 'alis', 'rambut'], 'Kulit muka halus lemas, jarak antara alis sedang (tidak bertemu), rambut mengkilat', 'Pandai dan suka menuntut ilmu', 'baik'),
    t(50, ['wajah'], 'Muka, pipi, dahi, hidung, mulut, dan dagu serasi proporsinya', 'Dapat kaya', 'baik'),
    t(51, ['alis', 'suara'], 'Alis jarang dengan tepi naik, bicara seperti menangis', 'Selamanya miskin dan susah (kitab)', 'buruk'),
    t(52, ['alis'], 'Bulu alis tumbuh berdiri seperti rumput', 'Suka bertengkar', 'buruk'),
    t(53, ['badan'], 'Urat dan tulang menonjol, tampak kasar', 'Miskin', 'buruk'),
    t(54, ['badan', 'kulit'], 'Kerangka tidak seimbang dengan badan, kulit kasar dan kencang', 'Tidak berusia panjang (kitab)', 'buruk'),
    t(55, ['dahi', 'dagu', 'pipi'], 'Dahi lebar persegi dan rata tanpa lipatan, dagu dan pipi ramping', 'Sejak muda dapat memegang jabatan besar', 'baik'),
    t('56a', ['bibir'], 'Bibir atas dan bawah kurang lebar hingga gigi tampak walau mulut tertutup', 'Suka membicarakan orang lain', 'buruk'),
    t('56b', ['bibir', 'leher'], 'Bibir atas kurang lebar, bibir bawah melebihi, gigi tampak, jakun menonjol', 'Penghidupan sulit dan terpisah dari orang tua (kitab)', 'buruk'),
    t('56c', ['bibir'], 'Cekungan di tengah bibir atas dangkal sehingga nyaris tak tampak', 'Sulit mencari nafkah', 'buruk'),
    t(57, ['alis', 'mata'], 'Alis berkerut seperti kulit jeruk nipis, mata selalu berlinang', 'Masa muda tanpa kesengsaraan; masa tua semua keturunan meninggal lebih dahulu (kitab)', 'buruk'),
    t('58a', ['mata', 'hidung'], 'Bawah mata cekung tetapi kulit tebal, puncak hidung membengkok seperti paruh betet', 'Sangat sulit mendapat keturunan (kitab)', 'buruk'),
    t('58b', ['mata', 'hidung'], 'Bagian bawah mata berisi dan tebal, kelopak rata, hidung lurus (tidak membengkok)', 'Selamat dan banyak keturunan (kitab)', 'baik'),
    t(59, ['telinga', 'alis'], 'Daun telinga bagus dan seimbang, sama tinggi dengan alis', 'Dapat menjadi kepala negara dan disegani', 'baik'),
    t(60, ['senyum'], 'Suka tersenyum atau tertawa dengan menyindir', 'Tidak jujur', 'buruk'),
    t(61, ['cara berjalan'], 'Berjalan dengan telapak kaki belakang seakan tidak menginjak tanah', 'Kurang jujur, rewel, kikir, suka bertengkar, boros', 'buruk'),
    t(62, ['cara berjalan'], 'Berjalan dengan badan bergerak, kepala menggeleng seperti ulat, kaki tak teratur, sering berpaling', 'Tidak jujur', 'buruk'),
    t(63, ['cara berjalan'], 'Berjalan melihat ke bawah, menoleh kiri kanan dan belakang, wajah tidak menyenangkan', 'Tidak jujur dan kurang iba', 'buruk'),
    t(64, ['cara berjalan'], 'Berjalan tegak lurus tanpa menggoyangkan badan, menatap ke depan, tidak menoleh-noleh', 'Utama dan baik hati', 'baik'),
    t(65, ['pipi'], 'Pipi gemuk menonjol', 'Tidak jujur, kurang cerdas, suka bicara menurut dirinya sendiri', 'buruk'),
    t('66a', ['garis hidung-mulut'], 'Garis di tepi hidung yang melewati mulut tampak melingkari mulut', 'Hidup susah, dapat kelaparan', 'buruk'),
    t('66b', ['garis hidung-mulut'], 'Garis di tepi hidung kiri dan kanan yang melewati mulut jelas', 'Selamat, tidak kekurangan', 'baik'),
    t('66c', ['garis hidung-mulut'], 'Putusnya garis tidak terlihat terang', 'Pada usia 48 tahun mendapat kesusahan (kitab)', 'buruk'),
    t(67, ['cara makan'], 'Makan tergesa-gesa karena khawatir tidak kebagian', 'Kikir dan hanya berpangkat kecil', 'buruk'),
    t(68, ['mata'], 'Tengah kelopak mata kedua sisi berwarna biru atau hampir hitam', 'Istrinya mendapat kesusahan', 'buruk'),
    t(69, ['alis', 'hidung', 'cahaya wajah'], 'Cahaya merah kekuningan di atas kedua alis dan puncak hidung', 'Mendadak menjadi kaya', 'baik'),
    t('70a', ['cahaya wajah'], 'Wajah bersinar kuning', 'Tidak kekurangan; memperoleh keselamatan', 'baik'),
    t('70b', ['cahaya wajah'], 'Wajah pucat berminyak, putih berkilat', 'Banyak mendapat kesusahan', 'buruk'),
    t('71a', ['pepasu', 'cahaya wajah'], 'Pangkal hidung di tengah alis (pepasu) tidak bersinar', 'Mudah mengalami celaka', 'buruk'),
    t('71b', ['pepasu', 'cahaya wajah'], 'Pepasu bercahaya', 'Jauh dari celaka dan selamat', 'baik'),
    t(72, ['alis', 'cahaya wajah'], 'Bagian atas alis kiri dan kanan terang kuning kemerahan', 'Memperoleh kesenangan dan keuntungan', 'baik'),
    t(73, ['wajah', 'cahaya wajah'], 'Wajah tampak suram', 'Miskin dan susah', 'buruk'),
    t('74a', ['pepasu', 'cahaya wajah'], 'Pepasu mendadak bercahaya kuning', 'Mendapat keuntungan', 'baik'),
    t('74b', ['pepasu', 'mata', 'cahaya wajah'], 'Pepasu bersinar hitam dan tampak di bawah mata', 'Celaka atau bahaya besar pada usia 34-38 tahun (kitab)', 'buruk'),
    t(75, ['mata', 'cahaya wajah'], 'Cahaya hitam tampak di bawah mata', 'Mengalami celaka', 'buruk'),
    t(76, ['pipi', 'dagu', 'cahaya wajah'], 'Sisi bawah kedua pipi, dekat dagu, tampak kusam', 'Mengalami kecelakaan', 'buruk'),
    t(77, ['wajah', 'cahaya wajah'], 'Muka tidak bersinar', 'Usianya tidak panjang (kitab)', 'buruk'),
    t(78, ['mata', 'cahaya wajah'], 'Mata tampak suram', 'Mendapat bahaya', 'buruk'),
    t(79, ['wajah', 'cahaya wajah'], 'Wajah bersinar merah kekuningan', 'Pekerjaannya berhasil memuaskan', 'baik'),
    t(80, ['hidung', 'cahaya wajah'], 'Dari pangkal sampai ujung hidung bersinar berkilat', 'Mendapat keuntungan dan selamat', 'baik')
  ]
};
