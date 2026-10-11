/**
 * Watak lanjutan menurut kitab Betaljemur Adammakna: bab 101-103, 105-108, 111, 114-117 (hlm. 64-84, 78-80).
 *
 * Bab 101-103 dan 105-108, 111 teksnya dibandingkan dengan scan; bab 114 (tabel neptu dan "jem" huruf) dan
 * bab 117 (hari dan bulan jaya/malang) diperiksa langsung pada scan. Makna ditulis ulang singkat; `arah`
 * (baik/buruk/netral) adalah klasifikasi kami.
 *
 * Tidak dimasukkan: penolak (sedekah, larangan makanan, benda yang dibuang), syarat cincin, kisah nabi pada
 * bab 108, ciri pencuri dan barang hilang, dan uraian persetubuhan. Ciri tubuh (bab 112, 113, 119) belum.
 */

const S = (bab, halaman, verifikasi = 'scan') => ({ bab, halaman, verifikasi });
const w = (makna, arah) => ({ makna, arah });

// --- Bab 101: watak menurut tanggal Jawa kelahiran ---------------------------------------------------------------------------------------
export const WATAK_TANGGAL = {
  sumber: S(101, [64, 65, 66], 'ocr-konsisten'),
  tabel: {
    1: w('Angkuh dan besar kemauan; bila maksud gagal mudah putus asa dan sulit dinasihati', 'netral'),
    2: w('Beranak dan bersahabat banyak, namun tidak semuanya dikasihi; pelupa dan cepat patah semangat', 'netral'),
    3: w('Sederhana, manis wajahnya, keras hati tetapi penyayang', 'baik'),
    4: w('Ingatan kuat, pandai bicara, banyak memikirkan hal baik', 'baik'),
    5: w('Pandai bicara, suka menyakiti dan pemarah, tetapi murah memberi uang atau makanan; tidak boros', 'netral'),
    6: w('Kurang cerdas, pelupa, ceroboh, malas', 'buruk'),
    7: w('Pandai bicara; tertarik pada hubungan yang tidak lurus', 'netral'),
    8: w('Pikiran baik, banyak sahabat, hati-hati menimbang baik dan buruk', 'baik'),
    9: w('Keras hati dan pemarah tetapi cepat reda; berpikir sedang; rela bila barangnya diminta', 'netral'),
    10: w('Pelupa tetapi pandai; suka membicarakan baik-buruknya orang', 'netral'),
    11: w('Pikiran luas, suka berlagak pandai, tahu sopan santun', 'netral'),
    12: w('Bila diam kurang menyenangkan, bila bicara tepat dan dapat menyelesaikan masalah; suka menyimpan niat tersembunyi', 'netral'),
    13: w('Pandai bicara, tepat dan banyak akal; keras hati dan cepat marah tetapi cepat reda', 'baik'),
    14: w('Percaya diri, suka bicara baik, memahami perbuatan yang bersih lahir batin', 'baik'),
    15: w('Pikiran cukupan dan terang, banyak bicara yang baik; cocok menjadi sastrawan', 'baik'),
    16: w('Ceroboh, malu bekerja, pelupa; kurang baik', 'buruk'),
    17: w('Banyak sahabat yang sepaham; baik dan bersih; sering menimbang baik-buruk', 'baik'),
    18: w('Banyak akal, pandai bicara, agak suka pada hubungan yang tidak lurus', 'netral'),
    19: w('Keras hati dan mudah marah tetapi sebentar; suka menyumbang pikiran, makanan, dan uang', 'netral'),
    20: w('Pelupa, enggan berpikir, senang menerima pengaduan orang', 'buruk'),
    21: w('Pikiran luas, suka berlagak pandai, tahu sopan santun dan tabiat orang', 'netral'),
    22: w('Suka berpikir; baik bila pendiam, bila banyak bicara perkataannya tepat dan pengetahuannya benar', 'baik'),
    23: w('Pandai bicara, tepat, banyak akal; pemarah sebentar lalu kembali tenang', 'baik'),
    24: w('Bersih hati lahir batin, bicara baik, pengetahuan luas', 'baik'),
    25: w('Bicara banyak yang baik, pengetahuan sedang, cocok menjadi sastrawan, segalanya terang', 'baik'),
    26: w('Kurang baik, pelupa, ceroboh, malas', 'buruk'),
    27: w('Banyak kerabat, suka bekerja bersama, selalu menimbang baik-buruk', 'baik'),
    28: w('Bicaranya kurang menyenangkan dan banyak; agak suka pada hubungan yang tidak lurus', 'buruk'),
    29: w('Keras hati, pemarah tetapi cepat tenang, murah memberi uang atau makanan', 'netral'),
    30: w('Angkuh, banyak untung, tidak gentar menghadapi rintangan besar', 'netral')
  }
};

// --- Bab 102: watak menurut bulan Jawa kelahiran (kitab: Asyura = Sura, Rabiulawal = Mulud, dst.) -----------------------------------------
export const WATAK_BULAN = {
  sumber: S(102, [66], 'ocr-konsisten'),
  tabel: {
    Sura: w('Pendiam, cita-cita tinggi; bila pandai sangat pandai, bila bodoh sangat bodoh', 'netral'),
    Sapar: w('Pemarah dan tergesa-gesa dalam bekerja, tetapi tingkah lakunya tenang', 'netral'),
    Mulud: w('Keras dalam segala hal; dapat menjadi priyayi, kaya, suka menasihati yang baik', 'baik'),
    Bakdamulud: w('Berjiwa luas, baik dan buruk tertampung; tangkas; bila marah mengkhawatirkan', 'netral'),
    Jumadilawal: w('Kurang cerdas tetapi setia dan percaya diri', 'netral'),
    Jumadilakir: w('Berani, sopan, dan pandai', 'baik'),
    Rejeb: w('Lahirnya tampak kurang cerdas, batinnya melebihi sesama', 'netral'),
    Ruwah: w('Pendiam; bila bicara tepat dan dipuji sesama', 'baik'),
    Pasa: w('Pendiam, baik hati', 'baik'),
    Sawal: w('Keras budi; kemauannya tidak dapat dibelokkan', 'netral'),
    Dulkangidah: w('Selalu berniat berbuat baik', 'baik'),
    Besar: w('Kebaikannya melebihi bila baik; bila buruk sering mencelakakan', 'netral')
  }
};

// --- Bab 103: watak menurut mangsa kelahiran (mangsa dari kalender pranata mangsa baku, bukan dari kitab) ------------------------------------
export const WATAK_MANGSA = {
  sumber: S(103, [66, 67], 'ocr-konsisten'),
  asumsi: 'Tanggal mangsa tidak ada di kitab; dipakai kalender pranata mangsa baku (rumah.js MANGSA_AWAL). Kitab menulis Kasepuluh dan Desta; di sini Kasadasa dan Dhesta.',
  tabel: {
    Kasa: w('Wataknya di tengah-tengah', 'netral'),
    Karo: w('Ceroboh', 'buruk'),
    Katelu: w('Kikir', 'buruk'),
    Kapat: w('Suci', 'baik'),
    Kalima: w('Banyak bicara (juweh)', 'netral'),
    Kanem: w('Pandai dalam segala pekerjaan', 'baik'),
    Kapitu: w('Suka memukul (cengkiling)', 'buruk'),
    Kawolu: w('Rela memberi (blaba)', 'baik'),
    Kasanga: w('Bicaranya kotor (rusuh celatune)', 'buruk'),
    Kasadasa: w('Cepat putus asa', 'buruk'),
    Dhesta: w('Suka berbuat salah', 'buruk'),
    Sada: w('Banyak rasa iba dan belas kasih', 'baik')
  }
};

// --- Bab 105: watak menurut jumlah neptu hari + pasaran (7-18) -------------------------------------------------------------------------------
export const WATAK_NEPTU = {
  sumber: S(105, [67, 68], 'ocr-konsisten'),
  tabel: {
    7: { nama: 'Narima', ...w('Bebas dari iri dan dengki; tidak mau mengalah dalam berbicara; gemar menempuh perjalanan jauh dan bersikap laksana pendeta', 'baik') },
    8: w('Pemarah dan cepat panas hati, kurang iba, suka bertengkar; bila marah berbahaya, tetapi banyak orang terpukau', 'buruk'),
    9: { nama: 'Baranjalan', ...w('Pendiriannya tidak tetap, sering berpindah tempat dan merantau', 'netral') },
    10: w('Pendiam, cerdas, serba pantas, sabar, dapat menjadi dukun; tidak suka ditanya; sayang kepada saudara', 'baik'),
    11: w('Sederhana, berani keluar rumah malam, murah memberi, ikhlas; tetapi bila miskin suka mengambil milik tetangga', 'netral'),
    12: w('Sering kehilangan, kurang baik dalam bergaul, mudah mendapat rezeki, banyak yang menginginkan dan selalu merasa kurang', 'netral'),
    13: w('Gemar dipuji dan fasih berbicara; ramah dan akur dengan keluarga, tetapi buruk sikapnya saat marah; sering terjaga di malam hari; cakap berdagang', 'baik'),
    14: w('Mampu menguasai aneka pekerjaan dengan cepat dan menyimak penjelasan; hanya saja cenderung malas dan hartanya tidak berlimpah', 'netral'),
    15: { nama: 'Gejarah', ...w('Dapat memerintah orang, keras, tegas, usaha dan rezeki cukup, banyak sahabat; suka bertengkar soal sopan santun dan perkawinan', 'baik') },
    16: { nama: 'Sedapakan silakrama', ...w('Kaya, banyak bicara, selalu berkreasi; keinginan makan tak terhalangi', 'baik') },
    17: w('Pendiam, mudah putus asa; bila bekerja sering mencelakakan; sering difitnah; tidak senang disamai orang', 'buruk'),
    18: w('Pemberani namun ceroboh; bicaranya asal; bila bertengkar dan lawannya membalas, ia memilih mundur', 'netral')
  }
};

// --- Bab 106 dan 107: jumlah neptu dibagi 9 dan 8 ----------------------------------------------------------------------------------------------
export const WATAK_SISA_9 = {
  sumber: S(106, [68, 69], 'ocr-konsisten'),
  asumsi: 'Jumlah lebih kecil dari pembagi dipakai apa adanya (kitab, contoh bab 107); sisa 0 dibaca pembagi (konvensi kami).',
  tabel: {
    1: { nama: 'Dangu watu', ...w('Kebahagiaannya besar sampai tua', 'baik') },
    2: { nama: 'Jagur macan', ...w('Banyak musuh dan celaka', 'buruk') },
    3: { nama: 'Gigis bumi', ...w('Pengaruhnya besar dan ditakuti orang', 'netral') },
    4: { nama: 'Kerangan srengenge', ...w('Banyak celaka; walau menjadi priyayi tetap menderita kemiskinan', 'buruk') },
    5: { nama: 'Nohan rembulan', ...w('Banyak beruntung', 'baik') },
    6: { nama: 'Wogan uler', ...w('Miskin', 'buruk') },
    7: { nama: 'Tulus banyu', ...w('Segala pekerjaan baik', 'baik') },
    8: { nama: 'Wurung geni', ...w('Celaka', 'buruk') },
    9: { nama: 'Dadi kayu', ...w('Dicintai bangsawan; keberuntungan selamanya', 'baik') }
  }
};

export const WATAK_SISA_8 = {
  sumber: S(107, [69], 'ocr-konsisten'),
  contohKitab: [{ weton: 'Kamis Pahing', jumlah: 17, nomor: 1 }, { weton: 'Selasa Wage', jumlah: 7, nomor: 7 }],
  tabel: {
    1: { nama: 'Ginuron (keringan)', ...w('Dihormati, tempat orang bertanya', 'baik') },
    2: { nama: 'Dur (raben, apesan)', ...w('Curang, sering beristri, sering celaka dan sengsara', 'buruk') },
    3: { nama: 'Nglampra (mblaur)', ...w('Tempat tinggalnya tidak menentu', 'netral') },
    4: { nama: 'Bramapanas', ...w('Tamak', 'buruk') },
    5: { nama: 'Kuat kemenangan', ...w('Kuat dan menang', 'baik') },
    6: { nama: 'Cantula', ...w('Buruk', 'buruk') },
    7: { nama: 'Punjul', ...w('Dalam segala hal berlebihan', 'netral') },
    8: { nama: 'Ilmu lantipan', ...w('Pandai dalam segala ilmu', 'baik') }
  }
};

// --- Bab 108: "hari binatang" menurut tanggal Jawa -----------------------------------------------------------------------------------------------
/**
 * mutu: sebutan kitab untuk harinya (null bila tidak disebut). anak: watak anak yang lahir pada tanggal itu.
 * kegiatan: [untuk, nilai, catatan]; berita: 'baik-benar' (kabar baik dapat dipercaya, kabar buruk bohong),
 * 'buruk-benar' (sebaliknya), 'semua-benar', 'tidak-dipercaya', atau null bila tidak disebut.
 */
const H = (hewan, mutu, anak, anakArah, kegiatan, berita = null) => ({
  hewan, mutu, anak: { makna: anak, arah: anakArah }, kegiatan: kegiatan.map(([untuk, nilai, catatan]) => ({ untuk, nilai, catatan })), berita
});

export const HARI_BINATANG = {
  sumber: S(108, [69, 70, 71, 72, 73]),
  catatan: 'Nilai "menyerang" dan "diserang" menyangkut peperangan; dibawa apa adanya dari kitab dan tidak ditafsirkan untuk keadaan modern.',
  tabel: {
    1: H('Kuda', 'baik', 'Berwatak baik; bila sakit cepat sembuh', 'baik',
      [['segala pekerjaan', 'baik'], ['menyerang', 'buruk'], ['diserang', 'buruk']], 'baik-benar'),
    2: H('Kijang', null, 'Orang tuanya sakit dan kehilangan harta', 'buruk',
      [['bercocok tanam', 'baik'], ['bepergian', 'baik'], ['berdagang', 'baik']]),
    3: H('Harimau', 'sangat jelek', 'Kurang cerdas dan kurang berbakti; bila sakit lama sembuhnya', 'buruk',
      [['membuat sesuatu', 'buruk'], ['bepergian', 'buruk'], ['berperang', 'baik', 'pada tengah hari (jam 11)']]),
    4: H('Kucing', null, 'Berwatak baik, berbakti, suka bertapa; bila lahir tengah hari (jam 11) tidak baik dan sering sakit', 'baik',
      [['berburu', 'baik'], ['bepergian', 'buruk'], ['menyerang', 'netral', 'sama kuat']]),
    5: H('Sapi', 'jelek', 'Kurang berbakti; bila sakit lama sembuhnya', 'buruk',
      [['segala pekerjaan', 'buruk']]),
    6: H('Kerbau', 'sangat baik', 'Berwatak baik, berbakti kepada Tuhan dan orang tua; bila sakit lekas sembuh', 'baik',
      [['bepergian lewat darat', 'buruk'], ['berlayar', 'baik'], ['menyerang', 'buruk'], ['diserang', 'baik']]),
    7: H('Tikus', null, 'Berwatak baik dan berbakti; bila sakit lama sembuhnya', 'baik',
      [['bercocok tanam', 'baik'], ['bepergian', 'buruk']]),
    8: H('Lembuwana (rusa)', null, 'Baik, banyak untung, dicintai bangsawan', 'baik',
      [['bepergian', 'buruk'], ['berdagang', 'buruk'], ['menyerang', 'buruk', 'kedua pihak sama-sama rusak'], ['diserang', 'buruk', 'kedua pihak sama-sama rusak']], 'baik-benar'),
    9: H('Anjing', 'sangat jelek', 'Sangat buruk perangainya, kurang berbakti', 'buruk',
      [['berdagang', 'baik'], ['berperang', 'buruk', 'banyak yang tewas']], 'tidak-dipercaya'),
    10: H('Naga', null, 'Baik, tindakannya dapat dipercaya; bila sakit cepat sembuh', 'baik',
      [['menghadap raja atau menteri', 'baik']]),
    11: H('Kambing', null, 'Baik, berwibawa, banyak rezeki, panjang umur, mendapat anugerah', 'baik',
      [['menyerang', 'buruk'], ['diserang', 'baik']], 'baik-benar'),
    12: H('Mayang (bunga pinang)', null, 'Baik', 'baik',
      [['berdagang', 'baik'], ['menyerang', 'baik'], ['diserang', 'buruk']], 'baik-benar'),
    13: H('Gajah', null, 'Banyak menderita sakit; bila sakit lama sembuhnya', 'buruk',
      [['segala pekerjaan', 'buruk'], ['berdagang', 'buruk'], ['menyerang', 'baik'], ['diserang', 'buruk']], 'buruk-benar'),
    14: H('Singa', 'lebih baik', 'Sangat baik dalam segalanya', 'baik',
      [['berjualan', 'baik'], ['bepergian', 'baik'], ['menyerang', 'buruk'], ['diserang', 'baik', 'bertahan, jangan pindah dari tempat pertahanan']]),
    15: H('Ikan', 'lebih baik', 'Berbakti kepada raja dan menteri', 'baik',
      [['segala pekerjaan', 'baik'], ['menyerang', 'baik'], ['berdagang', 'baik'], ['diserang', 'buruk']]),
    16: H('Lilin (malam)', 'sangat jelek', 'Tabiatnya sangat buruk; dikhawatirkan terganggu jiwanya, mudah sakit, dan sering kehilangan barang', 'buruk',
      [['menyerang', 'buruk'], ['diserang', 'buruk']], 'buruk-benar'),
    17: H('Burung elang', null, 'Segala tindakannya lebih baik', 'baik',
      [['segala pekerjaan', 'baik', 'berdagang, berburu, diserang'], ['menyerang', 'buruk']], 'semua-benar'),
    18: H('Babi hutan (celeng)', null, 'Baik', 'baik',
      [['bepergian', 'baik'], ['menyerang', 'buruk', 'kedua pihak kalah'], ['diserang', 'buruk', 'kedua pihak kalah']]),
    19: H('Banteng', null, 'Buruk perangainya, kurang berbakti', 'buruk',
      [['menghadap raja atau menteri', 'baik'], ['bertemu orang kaya', 'baik'], ['diserang', 'baik'], ['menyerang', 'buruk']], 'semua-benar'),
    20: H('Antu', null, 'Baik, banyak rezeki, dermawan', 'baik',
      [['bepergian', 'buruk'], ['menyerang', 'buruk', 'kedua pihak kalah'], ['diserang', 'buruk', 'kedua pihak kalah']], 'semua-benar'),
    21: H('Arang', null, 'Kurang berbakti kepada orang tua', 'buruk',
      [['melakukan pekerjaan', 'buruk'], ['menghadap raja atau menteri', 'buruk'], ['berdagang', 'buruk']], 'baik-benar'),
    22: H('Udang', 'lebih baik', 'Berwatak baik', 'baik',
      [['berdagang', 'baik'], ['menghadap raja atau menteri', 'baik'], ['bepergian', 'buruk', 'tidak baik bagi keadaan setelah tiba di tujuan'],
        ['menyerang', 'buruk', 'kedua pihak sama kalah'], ['diserang', 'buruk', 'kedua pihak sama kalah']]),
    23: H('Ular laut', null, 'Kurang berbakti kepada orang tua', 'buruk',
      [['menghadap raja atau menteri', 'baik']], 'semua-benar'),
    24: H('Pare', 'sangat jelek', 'Kurang berbakti kepada Tuhan dan orang tua', 'buruk',
      [['menyerang', 'buruk', 'kedua pihak sama gagal'], ['diserang', 'buruk', 'kedua pihak sama gagal']]),
    25: H('Pande', null, 'Perlu banyak bersedekah', 'buruk',
      [['segala pekerjaan', 'buruk'], ['diserang', 'baik']]),
    26: H('Kala', null, 'Baik, berbakti kepada Tuhan dan kedua orang tua', 'baik',
      [['menyerang', 'buruk'], ['diserang', 'baik', 'selamat']]),
    27: H('Ular', 'baik', 'Berbakti kepada Tuhan dan orang tua', 'baik',
      [['segala perbuatan', 'baik'], ['berperang', 'baik', 'sama baiknya untuk kedua pihak']], 'baik-benar'),
    28: H('Padi', 'baik', 'Berwatak baik, segala perbuatannya baik', 'baik',
      [['segala perbuatan', 'baik']], 'buruk-benar'),
    29: H('Unta', null, 'Kurang baik, sering sakit, kurang berbakti', 'buruk',
      [['berperang', 'buruk', 'kedua pihak sama kalah']]),
    30: H('Sada', 'sangat jelek', 'Bila lahir pagi hari banyak menderita sakit; bila lahir luhur/asar baik, tetapi perlu banyak bersedekah', 'buruk',
      [['menanam', 'netral', 'harus banyak benih'], ['menyerang', 'baik'], ['menghadap raja atau menteri', 'baik'], ['diserang', 'buruk']])
  }
};

// --- Bab 111: nasib menurut bulan (sebutan kitab "watak bulan") ---------------------------------------------------------------------------------------
export const NASIB_BULAN = {
  sumber: S(111, [74], 'ocr-konsisten'),
  tabel: {
    Sura: w('Hera-heru; banyak kecelakaan', 'buruk'),
    Sapar: w('Baik sedang', 'netral'),
    Mulud: w('Apesan; sakit-sakitan dan kematian', 'buruk'),
    Bakdamulud: w('Selamat dalam melaksanakan segala pekerjaan', 'baik'),
    Jumadilawal: w('Sakit-sakitan berganti-ganti', 'buruk'),
    Jumadilakir: w('Mendapat rahmat dari orang tua', 'baik'),
    Rejeb: w('Banyak perkara', 'buruk'),
    Ruwah: w('Rahayu dan selamat, tetapi bila jatuh terasa berat', 'netral'),
    Pasa: w('Mendapat uang dan rezeki', 'baik'),
    Sawal: w('Banyak maksud jahat', 'buruk'),
    Dulkangidah: w('Dikasihani sanak saudara', 'baik'),
    Besar: w('Utama, patuh, dan selamat', 'baik')
  }
};

// --- Bab 114: watak menurut huruf depan dan belakang nama (neptu + "jem" tiap aksara) ---------------------------------------------------------
const deret = (urut, nilai) => Object.fromEntries(urut.map((a, i) => [a, nilai[i]]));
const AKSARA = ['ha', 'na', 'ca', 'ra', 'ka', 'da', 'ta', 'sa', 'wa', 'la', 'pa', 'dha', 'ja', 'ya', 'nya', 'ma', 'ga', 'ba', 'tha', 'nga'];
const NEPTU_114 = [7, 3, 6, 3, 5, 3, 8, 3, 6, 3, 3, 2, 6, 4, 5, 4, 4, 2, 3, 5];

export const WATAK_NAMA_HURUF = {
  sumber: S(114, [78, 79]),
  asumsi: 'Aksara hanacaraka urut: ha na ca ra ka da ta sa wa la pa dha ja ya nya ma ga ba tha nga. "Jem" tiap aksara = nomor urutnya (1-20); angka yang dijumlahkan = neptu + jem. Hasil berulang tiap 21 (5 = 26 = 47 ...); jumlah dua huruf berkisar 10-50.',
  neptu: deret(AKSARA, NEPTU_114),
  jumlahAksara: deret(AKSARA, [8, 5, 9, 7, 10, 9, 15, 11, 15, 13, 14, 14, 19, 18, 20, 20, 21, 20, 22, 25]), // tercetak "jumlah"
  contohKitab: { depan: 'sa', belakang: 'ya', jumlah: 29, nama: 'Naga ber nalare' },
  // jumlah 5..25; tiap jumlah n juga memakai entri jumlah n - 21 (26 = 5, ..., 50 = 29)
  tabel: {
    5: { nama: 'Bumi bungkil budine iku', ...w('Rendah budinya', 'buruk') },
    6: { nama: 'Sri bodo ati dadine', ...w('Kurang cerdas tetapi baik hati', 'netral') },
    7: { nama: 'Langkah lengguk lengus karepe', ...w('Sombong; seenaknya dalam bicara dan kehendak', 'buruk') },
    8: { nama: 'Naga ber nalare', ...w('Terang hatinya (pandai)', 'baik') },
    9: { nama: 'Jaran makewuh karepe', ...w('Pendiriannya tidak tetap', 'netral') },
    10: { nama: 'Banteng diri karepe', ...w('Menganggap dirinya lebih tinggi daripada sesama', 'buruk') },
    11: { nama: 'Prau angarahi karepe', ...w('Selalu mencari keuntungan', 'netral') },
    12: { nama: 'Piting iku mangandilan', ...w('Berpikirnya tidak jernih', 'buruk') },
    13: { nama: 'Macan pinter pangarahe', ...w('Siasatnya pandai untuk mencapai maksud', 'netral') },
    14: { nama: 'Gunung manggon iku', ...w('Teguh hatinya', 'baik') },
    15: { nama: 'Traju lumuh kasor karepe', ...w('Keinginannya tidak dapat dihalangi', 'netral') },
    16: { nama: 'Klabang ladak atine', ...w('Suka memfitnah', 'buruk') },
    17: { nama: 'Tiba rikating karya dadine', ...w('Ingin menyelesaikan sesuatu dengan cepat', 'netral') },
    18: { nama: 'Iwak bodo ati dadine', ...w('Kurang cerdas', 'buruk') },
    19: { nama: 'Banyu watake iya atos', ...w('Baik budi dan teguh hatinya', 'baik') },
    20: { nama: 'Panah ladak satenagane', ...w('Segalanya keras: perbuatan dan perkataan', 'buruk') },
    21: { nama: 'Cakra kakehan karsa iku', ...w('Banyak keinginannya', 'netral') },
    22: { nama: 'Bayi pinter pangarahe iku', ...w('Pandai bersiasat untuk mencapai maksud', 'netral') },
    23: { nama: 'Ratu bodo atine dadi', ...w('Kurang cerdas tetapi berpengaruh karena baik budi', 'netral') },
    24: { nama: 'Baya rikat ing karepe', ...w('Terlalu tergesa-gesa tanpa berpikir dahulu', 'buruk') },
    25: { nama: 'Pangulu galak ing wicara', ...w('Perkataannya tajam', 'buruk') }
  }
};

// --- Bab 115: baik-buruknya nama (bagi orang biasa, bukan keturunan raja) -----------------------------------------------------------------------------
export const NAMA_BAIK_BURUK = {
  sumber: S(115, [79, 80]),
  tingkat: {
    baik: ['Prawira', 'Reja', 'Diharja', 'Harja'],
    sedang: ['Sura', 'Jaya', 'Dijaya', 'Yuda', 'Sastra', 'Wardaya', 'Suma', 'Danu', 'Manun', 'Sudira', 'Wira', 'Puspita',
      'Sasmita', 'Warsita', 'Wirya', 'Taruna', 'Krama', 'Yasa', 'Purwa'],
    kurangBaik: ['Subrata', 'Dibrata', 'Surya'],
    tidakBaik: ['Nata', 'Pranata', 'Dinata', 'Winata', 'Praja', 'Mangku', 'Sujana', 'Sarjana']
  },
  aturan: {
    baikDenganKurangAtauTidak: 'Nama baik tidak boleh dirangkai dengan nama kurang baik atau tidak baik.',
    baikDenganSedang: 'Sebaiknya nama baik dirangkai dengan nama sedang (contoh Prawira + Dijaya = Prawiradijaya).',
    baikDenganBaik: 'Terlebih baik bila nama baik dirangkai dengan nama baik (contoh Prawira + Harja = Prawiraharja).',
    kurangBaik: 'Nama kurang baik tetap berpengaruh kurang baik walau dirangkai dengan nama baik atau sedang, kecuali pemakainya ahli menjalankan tapabrata.',
    tidakBaik: 'Nama tidak baik tidak berfaedah walau dirangkai dengan nama baik, kecuali pemakainya ahli tapabrata, berhati suci, dan penyayang sesama.',
    saran: 'Kitab menyarankan memilih nama yang termasuk baik.'
  },
  catatan: 'Berlaku bagi orang biasa; nama pemberian raja karena pangkat dikecualikan.'
};

// --- Bab 116: "ramalan beberapa nabi" menurut jumlah neptu 7-18 -----------------------------------------------------------------------------------
export const RAMALAN_NABI = {
  sumber: S(116, [80, 81, 82], 'ocr-konsisten'),
  contohKitab: { weton: 'Sabtu Pahing', jumlah: 18, nabi: 'Yusup' },
  tabel: {
    7: { nabi: 'Yunus', ...w('Banyak anak, mata pencaharian tidak tetap, banyak godaan', 'netral') },
    8: { nabi: 'Ayub', ...w('Sering bercekcok, makan serba lezat', 'netral') },
    9: { nabi: 'Musa', ...w('Penuh keinginan dan unggul dalam peperangan, mendambakan kebaikan; namun dapat mempermalukan keluarga, berhati dengki, dan tertimpa celaka', 'netral') },
    10: { nabi: 'Nuh', ...w('Cocok berdagang atau bertani; mendapat celaka', 'netral') },
    11: { nabi: 'Idris', ...w('Jauh dari celaka, senang berbuat baik, menginginkan kenikmatan; mendapat cacat', 'baik') },
    12: { nabi: 'Ibrahim', ...w('Hidupnya dekat masjid; uang yang sah baru menjadi miliknya', 'baik') },
    13: { nabi: 'Adam', ...w('Beruntung, mendapat anugerah, banyak akal, anak banyak yang baik; tetapi mendapat jelek karena anak, sering difitnah, setengah usia berpisah dengan anak istri', 'netral') },
    14: { nabi: 'Sulaiman', ...w('Berlimpah harta dan ilmu, disegani dan digemari orang; namun sukar beranak dan kerap berselisih', 'baik') },
    15: { nabi: 'Daud', ...w('Banyak anak, banyak kesusahan dan kehilangan akal; hanya bersenang-senang bersama anak istri', 'netral') },
    16: { nabi: 'Isa', ...w('Mendapat anugerah dan dicintai orang; selalu merasa berat hati dan terkena celaka', 'netral') },
    17: { nabi: 'Muhammad', ...w('Suka berbuat baik dan beribadah, dilarang bersenang-senang; banyak musuh, tidak punya uang, besar celakanya dan besar pula anugerahnya', 'netral') },
    18: { nabi: 'Yusup', ...w('Banyak untung, kaya; dapat celaka', 'baik') }
  }
};

// --- Bab 117: perbintangan menurut jumlah neptu 7-18 --------------------------------------------------------------------------------------------------
// jaya/malang: [hari, bulan]. Bulan memakai nama mesin (kitab: Rabiulawal/Maulud = Mulud, Puasa = Pasa, Syawal = Sawal, Dulkaidah = Dulkangidah).
const J = (nama, sekutu, musuh, jaya, malang, penyakit, sifat) => ({ nama, sekutu, musuh, jaya, malang, penyakit, sifat });
export const PERBINTANGAN = {
  sumber: S(117, [82, 83, 84]),
  contohKitab: [
    { weton: 'Rabu Kliwon', jumlah: 15, bintang: 'Jun' },
    { weton: 'Jumat Pon', jumlah: 13, bintang: 'Asma', malang: ['Sabtu', 'Ruwah'], setara: ['Kamis Legi', 'Minggu Kliwon'] }
  ],
  asumsi: 'Catatan kitab menyebut hari dan bulan kemalangan sebagai saat yang "harus dimulai" untuk mengerjakan sesuatu; kata itu tampaknya salah cetak, dan arti yang dimaksud tidak jelas. Mesin hanya melaporkan hari dan bulannya.',
  peringatan: 'Kitab menyebut sakit pada hari kemalangan sebagai pertanda dekat ajal. Ini tafsir tradisional, bukan fakta medis; dicantumkan hanya sebagai isi kitab.',
  tabel: {
    7: J('Mijan', 'Kuda', 'Jadi', ['Sabtu', 'Besar'], ['Jumat', 'Rejeb'], ['kepala'], 'Banyak untung dan godaan; bicara berdasar kenyataan'),
    8: J('Arab', 'Sur', 'Kuda', ['Rabu', 'Ruwah'], ['Selasa', 'Mulud'], ['tenggorokan', 'pusing', 'lesu'], 'Dicintai orang, kaya, dihormati; cocok mengabdi pada orang besar; godaan dari perempuan; mudah main tangan'),
    9: J('Kukus', 'Jun', 'Surtan', ['Kamis', 'Pasa'], ['Rabu', 'Sawal'], ['pusing'], 'Dicintai orang besar; bicara panas; budi luhur dan penyayang; dihormati tetapi mudah bermusuhan; dibenci saudara sendiri'),
    10: J('Jadi', 'Surtan', 'Sada', ['Rabu', 'Mulud'], ['Sabtu', 'Sawal'], [], 'Banyak untung; keras hati'),
    11: J('Dalu', 'Sada', 'Mijan', ['Jumat', 'Dulkangidah'], ['Selasa', 'Jumadilakir'], [], 'Sopan, enak bicara; menerima warisan tetapi tidak membawa kemuliaan; suka main tangan'),
    12: J('Kuda', 'Sumbul', 'Sada', ['Kamis', 'Besar'], ['Selasa', 'Rejeb'], [], 'Pemarah dan pencemburu, keras hati tetapi sebenarnya penakut; banyak rezeki dan anak laki-laki; sering bercerai; sekitar usia 50 sering difitnah dan rezeki berkurang'),
    13: J('Asma', 'Mijan', 'Arab', ['Minggu', 'Sawal'], ['Sabtu', 'Ruwah'], ['perut', 'panas', 'sakit kepala'], 'Pekerja keras, pemalu, dihormati; jangan merantau; musuhnya air; sakit pada usia 20 atau 30'),
    14: J('Sur', 'Arab', 'Dalu', ['Rabu', 'Sapar'], ['Sabtu', 'Ruwah'], ['perut'], 'Dihormati, bicaranya dapat dipercaya, hasil kerja baik; jodoh dari luar negeri; tidak suka bekerja pada orang lain; dilarang memaki; sakit pada usia 12 atau 18'),
    15: J('Jun', 'Kukus', 'Sada', ['Minggu', 'Mulud'], ['Rabu', 'Pasa'], ['batuk darah', 'panas', 'pusing'], 'Bicara lemah lembut, tangkas, banyak anak, rajin tetapi hati tidak tenang; kurang cocok berdagang; kurang rezeki'),
    16: J('Surtan', 'Arab', 'Dalu', ['Rabu', 'Sawal'], ['Minggu', 'Jumadilawal'], [], 'Pemarah dan pencemburu; keras bicara; sakit pada usia 7 bulan'),
    17: J('Sada', 'Arab', 'Mijan', ['Minggu', 'Jumadilawal'], ['Sabtu', 'Besar'], ['perut'], 'Sopan, sabar, ikhlas, manis tutur kata, giat bekerja; anak banyak yang meninggal; sekitar usia 40 rezeki berkurang dan kurang cocok berdagang'),
    18: J('Sumbul', 'Arab', 'Kuda', ['Rabu', 'Jumadilakir'], ['Sabtu', 'Dulkangidah'], [], 'Banyak pengetahuan, kaya, banyak istri, tanamannya berhasil; dilarang bepergian malam hari')
  }
};

// --- Bab 120 (bagian "Watak wanita menurut hari kelahiran"): 35 weton, hlm. 100-101 ---------------------------------------------------------------
// Hanya bagian ini yang berbasis kalender. Penilaian perempuan menurut warna kulit, bentuk badan, dan gerak-gerik
// (bagian lain bab 120) tidak dimasukkan: bukan hitungan, dan menstigma. Kalimat dilunakkan; mencerminkan norma zamannya.
const wn = (butir, makna, arah) => ({ butir, makna, arah });
export const WATAK_WANITA_WETON = {
  sumber: S(120, [100, 101]),
  catatan: 'Tafsir tradisional yang mencerminkan norma pernikahan pada zamannya (menilai perempuan terutama dari sikapnya kepada suami); tidak berlaku sebagai penilaian watak.',
  tabel: {
    'Sabtu Pahing': wn(1, 'Kebaikan dan keburukannya sama-sama berlebihan; mudah merasa kurang puas terhadap suami', 'netral'),
    'Minggu Pon': wn(2, 'Berbakti kepada suami, keras hati, pencemburu', 'netral'),
    'Senin Wage': wn(3, 'Berbakti, pandai, tegas dan pandai bicara; tidak suka dikalahkan suami', 'baik'),
    'Selasa Kliwon': wn(4, 'Kurang berbakti kepada suami dan mudah tergoda', 'buruk'),
    'Rabu Legi': wn(5, 'Kebaikan dan keburukannya sama-sama berlebihan', 'netral'),
    'Kamis Pahing': wn(6, 'Berbakti kepada suami tetapi mudah tergoda', 'netral'),
    'Jumat Pon': wn(7, 'Berani membantah suami, boros, banyak rintangan, tetapi selalu mendapat anugerah dan keinginannya terkabul', 'netral'),
    'Sabtu Wage': wn(8, 'Sangat berbakti, pandai, teliti, hati-hati; anaknya sering meninggal (kitab)', 'netral'),
    'Minggu Kliwon': wn(9, 'Malas, pencemburu, kurang merawat suami', 'buruk'),
    'Senin Legi': wn(10, 'Berani terhadap suami tetapi membawa rezeki', 'netral'),
    'Selasa Pahing': wn(11, 'Kurang merawat suami dan banyak memperhatikan diri sendiri', 'buruk'),
    'Rabu Pon': wn(12, 'Kurang merawat suami; cemburunya tidak tampak', 'buruk'),
    'Kamis Wage': wn(13, 'Pandai menyelesaikan masalah, banyak rezeki, keras hingga suami tunduk; mudah tergoda', 'netral'),
    'Jumat Kliwon': wn(14, 'Berbakti, memahami kehendak suami, hati-hati, berezeki; sangat pencemburu', 'baik'),
    'Sabtu Legi': wn(15, 'Berezeki, berani membantah suami, selalu ingin menang', 'netral'),
    'Minggu Pahing': wn(16, 'Banyak rezeki dan keinginan tercapai; kurang jujur, tertarik barang tidak halal, berani terhadap suami', 'netral'),
    'Senin Pon': wn(17, 'Tidak pernah merasa puas terhadap suami', 'buruk'),
    'Selasa Wage': wn(18, 'Banyak rezeki dan sahabat, berani terhadap suami; mudah menyeleweng', 'netral'),
    'Rabu Kliwon': wn(19, 'Malas dan kurang memperhatikan suami', 'buruk'),
    'Kamis Legi': wn(20, 'Sangat pencemburu, kurang berbakti, mudah menyeleweng', 'buruk'),
    'Jumat Pahing': wn(21, 'Kurang tahu malu dan kurang berbakti', 'buruk'),
    'Sabtu Pon': wn(22, 'Banyak rezeki, hati-hati, kikir, berani terhadap suami', 'netral'),
    'Minggu Wage': wn(23, 'Bersih segalanya, berbakti, tidak menyukai barang tidak halal', 'baik'),
    'Senin Kliwon': wn(24, 'Malas, kurang tahu malu, makan banyak, tetapi mencintai suami', 'netral'),
    'Selasa Legi': wn(25, 'Keras dan sombong, berani terhadap suami tetapi penuh cinta dan berhati lapang', 'netral'),
    'Rabu Pahing': wn(26, 'Malas, iri, pencemburu', 'buruk'),
    'Kamis Pon': wn(27, 'Pandai menarik hati suami sehingga dicintai, tetapi hanya lahiriah; mudah menyeleweng; banyak rezeki', 'netral'),
    'Jumat Wage': wn(28, 'Banyak rezeki, dapat kaya; kurang sayang kepada suami, ceroboh, mudah menyeleweng', 'netral'),
    'Sabtu Kliwon': wn(29, 'Malas, suka mencari perkara, pencemburu, berani terhadap suami', 'buruk'),
    'Minggu Legi': wn(30, 'Memahami kehendak suami, banyak untung, membantu suami; kurang berbakti dan agak berani', 'netral'),
    'Senin Pahing': wn(31, 'Malas, buruk tabiatnya', 'buruk'),
    'Selasa Pon': wn(32, 'Waspada, banyak untung, ikhlas berbakti; mudah marah kepada suami', 'baik'),
    'Rabu Wage': wn(33, 'Ikhlas, berbakti, sangat penyayang', 'baik'),
    'Kamis Kliwon': wn(34, 'Pandai, suka menuntut ilmu, pendiam, pura-pura bodoh, memahami keinginan suami', 'baik'),
    'Jumat Legi': wn(35, 'Ikhlas dan murah hati, tetapi jarang merasa puas terhadap suami', 'netral')
  }
};
