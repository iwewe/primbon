/**
 * Jodoh lanjutan menurut kitab Betaljemur Adammakna: bab 18-25 (hlm. 14-18) dan bab 167 (hlm. 134-135).
 *
 * Bab 18-21 dan 167 memakai neptu huruf aksara Jawa (hanacaraka). Semua deret neptu aksara dibaca dari
 * scan (zoom 300 dpi), karena OCR tidak memuatnya; diagram Kraton mulyo (bab 21) juga dari scan, dan
 * contoh-contoh kitab dipakai sebagai uji silang. Tabel dan makna ditulis ulang singkat; `arah`
 * (baik/buruk/netral) adalah klasifikasi kami.
 *
 * Ritual penolak (menyembelih hewan, menanam/menyebar tanah) pada bab 22 tidak dimasukkan.
 */

const S = (bab, halaman, verifikasi = 'scan') => ({ bab, halaman, verifikasi });

/** Dua puluh aksara dasar menurut urutan hanacaraka. */
export const HANACARAKA = [
  'ha', 'na', 'ca', 'ra', 'ka', 'da', 'ta', 'sa', 'wa', 'la',
  'pa', 'dha', 'ja', 'ya', 'nya', 'ma', 'ga', 'ba', 'tha', 'nga'
];

const deret = (nilai) => Object.fromEntries(HANACARAKA.map((a, i) => [a, nilai[i]]));

// Neptu aksara: tiga skema berbeda di kitab (bab 18, bab 19, dan urutan 1-20 pada bab 20 dan 167).
export const NEPTU_AKSARA = {
  bab18: { sumber: S(18, [14]), nilai: deret([1, 3, 5, 7, 2, 4, 7, 9, 1, 1, 7, 3, 6, 5, 10, 4, 2, 4, 9, 10]) },
  bab19: { sumber: S(19, [15]), nilai: deret([6, 3, 3, 3, 3, 5, 3, 3, 6, 5, 1, 4, 3, 8, 3, 5, 1, 2, 4, 2]) },
  urut: { sumber: S(20, [16]), nilai: deret(Array.from({ length: 20 }, (_, i) => i + 1)) } // bab 20 dan 167
};

// --- Bab 18: neptu huruf depan + belakang masing-masing mempelai dibagi 9, lalu dipasangkan ------------------------
// Kunci "a&b" dengan a <= b. Sisa 0 dibaca 9 (konvensi kami; tabel memuat sisa 9).
export const JODOH_NAMA_SISA_9 = {
  sumber: S(18, [14, 15]),
  pembagi: 9,
  contohKitab: { pria: 'Sudargo', wanita: 'Satimah', sisa: [2, 4], hasil: 'baik' },
  tabel: {
    '1&1': { makna: 'Baik', arah: 'baik' },
    '1&2': { makna: 'Baik', arah: 'baik' },
    '1&3': { makna: 'Sering bertengkar', arah: 'buruk' },
    '1&4': { makna: 'Berujung cerai', arah: 'buruk' },
    '1&5': { makna: 'Berujung cerai', arah: 'buruk' },
    '1&6': { makna: 'Berujung cerai', arah: 'buruk' },
    '1&7': { makna: 'Menjadi bermusuhan', arah: 'buruk' },
    '1&8': { makna: 'Salah satu wafat', arah: 'buruk' },
    '1&9': { makna: 'Dipandang terhormat seperti penghulu', arah: 'netral' },
    '2&2': { makna: 'Baik', arah: 'baik' },
    '2&3': { makna: 'Salah satu wafat', arah: 'buruk' },
    '2&4': { makna: 'Baik', arah: 'baik' },
    '2&5': { makna: 'Berujung cerai', arah: 'buruk' },
    '2&6': { makna: 'Kurang baik', arah: 'buruk' },
    '2&7': { makna: 'Sering berpisah lalu rujuk', arah: 'buruk' },
    '2&8': { makna: 'Awet, tidak bercerai', arah: 'baik' },
    '2&9': { makna: 'Baik', arah: 'baik' },
    '3&3': { makna: 'Berlipat (istilah kitab "lipat"; maknanya tidak dijelaskan)', arah: 'netral' },
    '3&4': { makna: 'Rencana tidak jadi', arah: 'buruk' },
    '3&5': { makna: 'Berujung cerai', arah: 'buruk' },
    '3&6': { makna: 'Baik', arah: 'baik' },
    '3&7': { makna: 'Tertimpa celaka', arah: 'buruk' },
    '3&8': { makna: 'Berujung cerai', arah: 'buruk' },
    '3&9': { makna: 'Baik', arah: 'baik' },
    '4&4': { makna: 'Buruk perangainya', arah: 'buruk' },
    '4&5': { makna: 'Berujung cerai', arah: 'buruk' },
    '4&6': { makna: 'Berujung cerai', arah: 'buruk' },
    '4&7': { makna: 'Menjadi bermusuhan', arah: 'buruk' },
    '4&8': { makna: 'Menjadi bermusuhan', arah: 'buruk' },
    '4&9': { makna: 'Dipandang buruk oleh orang lain', arah: 'buruk' },
    '5&5': { makna: 'Sial pada siang hari', arah: 'buruk' },
    '5&6': { makna: 'Berujung cerai', arah: 'buruk' },
    '5&7': { makna: 'Berujung cerai', arah: 'buruk' },
    '5&8': { makna: 'Berujung cerai', arah: 'buruk' },
    '5&9': { makna: 'Baik', arah: 'baik' },
    '6&6': { makna: 'Kurang baik, tetapi tidak sampai bercerai', arah: 'buruk' },
    '6&7': { makna: 'Baik', arah: 'baik' },
    '6&8': { makna: 'Baik', arah: 'baik' },
    '6&9': { makna: 'Berujung cerai', arah: 'buruk' },
    '7&7': { makna: 'Baik', arah: 'baik' },
    '7&8': { makna: 'Baik', arah: 'baik' },
    '7&9': { makna: 'Mudah tergoda perbuatan jahat', arah: 'buruk' },
    '8&8': { makna: 'Baik', arah: 'baik' },
    '8&9': { makna: 'Banyak anak, tetapi tertimpa celaka', arah: 'netral' },
    '9&9': { makna: 'Berpisah tetapi tidak bercerai', arah: 'netral' }
  }
};

// --- Bab 19: jumlah neptu (skema bab 19) keempat huruf dibagi 7 --------------------------------------------------------
export const JODOH_NAMA_SISA_7 = {
  sumber: S(19, [15]),
  asumsi: 'Sisa 0 dibaca 7 (konvensi kami); kitab tidak membahas sisa 0.',
  contohKitab: { pria: 'Surono', wanita: 'Martiyah', jumlah: 19, sisa: 5 },
  tabel: {
    1: { nama: 'Tunggak tan semi', makna: 'Anak banyak yang meninggal', arah: 'buruk' },
    2: { nama: 'Pisang punggel', makna: 'Berujung cerai', arah: 'buruk' },
    3: { nama: 'Lumbung gumuling', makna: 'Boros', arah: 'buruk' },
    4: { nama: 'Sanggar waringin', makna: 'Menjadi tempat berlindung', arah: 'baik' },
    5: { nama: 'Pedaringan kebak', makna: 'Kaya', arah: 'baik' },
    6: { nama: 'Satriya lelaku', makna: 'Baik untuk berdagang', arah: 'netral' },
    7: { nama: 'Pandhita mukti', makna: 'Tenteram dan selamat', arah: 'baik' }
  }
};

// --- Bab 20: neptu huruf depan saja (skema 1-20) dibagi 5 ------------------------------------------------------------
export const JODOH_NAMA_SISA_5 = {
  sumber: S(20, [15, 16]),
  contohKitab: { pria: 'Marno', wanita: 'Dini', neptu: [16, 6], jumlah: 22, sisa: 2, nama: 'Lungguh' },
  tabel: {
    1: { nama: 'Sri', makna: 'Selamat; rezeki datang berganti-ganti', arah: 'baik' },
    2: { nama: 'Lungguh', makna: 'Berpangkat', arah: 'baik' },
    3: { nama: 'Gedhong', makna: 'Kaya', arah: 'baik' },
    4: { nama: 'Lara', makna: 'Banyak kesukaran', arah: 'buruk' },
    5: { nama: 'Pati', makna: 'Sengsara, sering kehilangan anggota keluarga', arah: 'buruk' }
  }
};

// --- Bab 21: Kraton mulyo, huruf depan dalam satu garis ----------------------------------------------------------------
export const KRATON_MULYO = {
  sumber: S(21, [16]),
  // Empat garis diagram (I kiri, II atas, III kanan, IV bawah), masing-masing lima aksara menurut urutan hanacaraka.
  garis: {
    I: ['ha', 'na', 'ca', 'ra', 'ka'],
    II: ['da', 'ta', 'sa', 'wa', 'la'],
    III: ['pa', 'dha', 'ja', 'ya', 'nya'],
    IV: ['ma', 'ga', 'ba', 'tha', 'nga']
  },
  // Garis di kiri kalah oleh garis di kanan: I kalah oleh IV, IV oleh III, III oleh II, II oleh I.
  kalahOleh: { I: 'IV', IV: 'III', III: 'II', II: 'I' },
  asumsi: 'Pasangan garis yang berhadapan (I-III, II-IV) tidak dijelaskan kitab siapa yang kalah.',
  makna: {
    segaris: { nama: 'Nunggal Kraton mulyo', makna: 'Pernikahan tulus dan saling mengasihi', arah: 'baik' },
    berbeda: { makna: 'Kurang baik', arah: 'buruk' }
  }
};

// --- Bab 22: jumlah neptu weton suami + istri dibagi 7 atau 10 ------------------------------------------------------------
export const JODOH_WETON_SISA_7 = {
  sumber: S(22, [17]),
  asumsi: 'Teks kitab: dibagi 7 atau 10, sisa tidak boleh lebih dari 7. Kami coba 10 dulu (dipakai bila sisa 1-7), selain itu 7; sisa 0 dibaca pembaginya. Contoh kitab (28) cocok: sisa 10 = 8, lalu 7 = 0, jadi 7.',
  catatanBanding: 'Urutan nama 5 dan 6 di sini (Satriya wirang, Bumi kapetak) terbalik dibanding bab 104 pada data watak.js.',
  contohKitab: { jumlah: 28, nomor: 7 },
  tabel: {
    1: { nama: 'Wasesa segara', makna: 'Pemaaf, berbudi, berwibawa, berjiwa lapang', arah: 'baik' },
    2: { nama: 'Tunggak semi', makna: 'Rezeki melimpah', arah: 'baik' },
    3: { nama: 'Satriya wibawa', makna: 'Memperoleh kemuliaan dan keluhuran', arah: 'baik' },
    4: { nama: 'Sumur sinaba', makna: 'Menjadi sumber ilmu dan tempat bertanya', arah: 'baik' },
    5: { nama: 'Satriya wirang', makna: 'Menanggung susah, malu, dan musibah kematian', arah: 'buruk' },
    6: { nama: 'Bumi kapetak', makna: 'Hati gelisah, tetapi rajin, tahan derita, dan bersih', arah: 'netral' },
    7: { nama: 'Lebu katiup angin', makna: 'Keinginan sulit terkabul, sering pindah rumah, hidup sengsara', arah: 'buruk' }
  }
};

// --- Bab 23: jumlah neptu weton suami + istri dibagi 5 --------------------------------------------------------------------
export const JODOH_WETON_SISA_5 = {
  sumber: S(23, [17]),
  contohKitab: { suami: 'Minggu Wage', istri: 'Selasa Legi', jumlah: 17, sisa: 2, nama: 'Dana' },
  tabel: {
    1: { nama: 'Sri', arah: 'baik' },
    2: { nama: 'Dana', arah: 'baik' },
    3: { nama: 'Lara', arah: 'buruk' },
    4: { nama: 'Pati', arah: 'buruk' },
    5: { nama: 'Lungguh', arah: 'baik' }
  }
};

// --- Bab 24 dan 25: weton + bulan + tahun + tanggal Jawa kelahiran, dibagi 9 dan 3 ------------------------------------------------
export const JODOH_TANGGAL_SISA_9 = {
  sumber: S(24, [17, 18]),
  asumsi: 'Neptu tanggal dibaca sebagai nomor tanggal Jawa kelahiran (contoh kitab: 20 dan 14). Neptu bulan dan tahun dari data neptu.js.',
  contohKitab: {
    pria: { hari: 'Rabu', pasaran: 'Kliwon', wulan: 'Sura', taun: 'Alip', tanggal: 20, jumlah: 43 },
    wanita: { hari: 'Jumat', pasaran: 'Pon', wulan: 'Sapar', taun: 'Wawu', tanggal: 14, jumlah: 35 },
    jumlah: 78, sisa: 6, nama: 'Pengantin'
  },
  tabel: {
    1: { nama: 'Wali', arah: 'buruk', makna: 'Tidak baik' }, 4: { nama: 'Wali', arah: 'buruk', makna: 'Tidak baik' },
    7: { nama: 'Wali', arah: 'buruk', makna: 'Tidak baik' },
    2: { nama: 'Penghulu', arah: 'netral', makna: 'Sedang' }, 5: { nama: 'Penghulu', arah: 'netral', makna: 'Sedang' },
    8: { nama: 'Penghulu', arah: 'netral', makna: 'Sedang' },
    3: { nama: 'Pengantin', arah: 'baik', makna: 'Baik' }, 6: { nama: 'Pengantin', arah: 'baik', makna: 'Baik' },
    9: { nama: 'Pengantin', arah: 'baik', makna: 'Baik' }
  }
};

export const JODOH_TANGGAL_SISA_3 = {
  sumber: S(25, [18]),
  asumsi: 'Jumlah sama dengan bab 24. Sisa 0 dibaca 3 (kitab menyebut sisa 3).',
  tabel: {
    1: { nama: 'Begja', arah: 'baik', makna: 'Baik' },
    2: { nama: 'Lara', arah: 'buruk', makna: 'Tidak baik' },
    3: { nama: 'Pati', arah: 'buruk', makna: 'Sangat jelek' }
  }
};

// --- Bab 167: tempat tinggal menurut huruf nama diri dan nama desa ------------------------------------------------------------
export const TEMPAT_TINGGAL_HURUF = {
  sumber: S(167, [134, 135]),
  contohKitab: {
    diri: 'Surajaya', desa: 'Karangnangka',
    depan: { neptu: [8, 5], jumlah: 13, sisa: 3, nama: 'Donya' },
    belakang: { neptu: [14, 5], jumlah: 19, sisa: 4, nama: 'Pandita' }
  },
  tabel: {
    1: { nama: 'Sonya', makna: 'Tidak memiliki rezeki', arah: 'buruk' },
    2: { nama: 'Antaka', makna: 'Sering mengalami kesusahan', arah: 'buruk' },
    3: { nama: 'Donya', makna: 'Banyak rezeki', arah: 'baik' },
    4: { nama: 'Pandita', makna: 'Tenteram', arah: 'baik' },
    5: { nama: 'Ratu', makna: 'Terhormat; perintahnya terlaksana', arah: 'baik' }
  }
};
