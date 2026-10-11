/**
 * Bepergian menurut kitab Betaljemur Adammakna, bab 130-141, 143-145, 151-156 (hlm. 112-126).
 *
 * Semua tabel diperiksa dengan scan (OCR bab ini tidak dapat dipercaya). Makna ditulis ulang singkat.
 * `arah` (baik/buruk/netral) adalah klasifikasi kami; kitab hanya memberi frasa pendek.
 *
 * Tidak dimasukkan (ritual, bukan hitungan): mantra pada bab 136 dan 142, salam pada bab 139,
 * gerakan "lebur" pada bab 138, dan syarat tindakan/pengingat nabi pada bab 143.
 *
 * Nama hari memakai nama mesin kalender (Minggu, bukan Ahad). Nama bulan: kitab menulis Rabiulawal,
 * Rabiulakir, Puasa, Dulkaidah; di sini Mulud, Bakdamulud, Pasa, Dulkangidah (sama dengan data lain).
 */

const S = (bab, halaman, verifikasi = 'scan') => ({ bab, halaman, verifikasi });

export const URUTAN_MINGGU = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

// --- Bab 130: naga hari, naga rijalolah, naga pekan --------------------------------------------------------
export const NAGA_HARI = {
  sumber: S(130, [112]),
  naga: {
    Minggu: ['Selatan'], Senin: ['Barat Daya'], Selasa: ['Barat'], Rabu: ['Barat Laut'],
    Kamis: ['Utara', 'Timur Laut'], Jumat: ['Timur'], Sabtu: ['Tenggara']
  },
  rijalolah: {
    Minggu: ['Selatan'], Senin: ['Tenggara'], Selasa: ['Timur'], Rabu: ['Timur Laut'],
    Kamis: ['Utara'], Jumat: ['Barat'], Sabtu: ['Barat Daya']
  },
  pekan: { Kliwon: 'Tengah', Legi: 'Timur', Pahing: 'Selatan', Pon: 'Barat', Wage: 'Utara' }
};

// --- Bab 131: naga menurut jumlah neptu hari + pasaran ------------------------------------------------------
export const NAGA_NEPTU = {
  sumber: S(131, [112]),
  tabel: {
    7: 'Timur Laut', 12: 'Timur Laut', 17: 'Timur Laut',
    8: 'Barat Laut', 13: 'Barat Laut',
    9: 'Barat Daya', 14: 'Barat Daya',
    10: 'Tenggara', 15: 'Tenggara',
    11: 'Timur', 16: 'Timur', 18: 'Timur'
  }
};

// --- Bab 132-135: naga bulan, naga tahun, jatingarang ---------------------------------------------------------
const KELOMPOK_BULAN = (tabel) =>
  Object.fromEntries(tabel.flatMap(([bulan, arah]) => bulan.map(b => [b, arah])));

export const NAGA_BULAN = {
  sumber: S(132, [113]),
  tabel: KELOMPOK_BULAN([
    [['Pasa', 'Sawal', 'Dulkangidah'], 'Selatan'],
    [['Besar', 'Sura', 'Sapar'], 'Barat'],
    [['Mulud', 'Bakdamulud', 'Jumadilawal'], 'Utara'],
    [['Jumadilakir', 'Rejeb', 'Ruwah'], 'Timur']
  ])
};

export const NAGA_TAHUN = {
  sumber: S(133, [113]),
  tabel: KELOMPOK_BULAN([
    [['Besar', 'Sura', 'Sapar'], 'Utara'],
    [['Mulud', 'Bakdamulud', 'Jumadilawal'], 'Timur'],
    [['Jumadilakir', 'Rejeb', 'Ruwah'], 'Selatan'],
    [['Pasa', 'Sawal', 'Dulkangidah'], 'Barat']
  ])
};

export const JATINGARANG = {
  sumber: S(134, [113]),
  tabel: KELOMPOK_BULAN([
    [['Sura', 'Sapar', 'Mulud'], 'Timur'],
    [['Bakdamulud', 'Jumadilawal', 'Jumadilakir'], 'Selatan'],
    [['Rejeb', 'Ruwah', 'Pasa'], 'Barat'],
    [['Sawal', 'Dulkangidah', 'Besar'], 'Utara']
  ])
};

/** Bab 135: bulan ketika naga tahun dan jatingarang berada di satu arah (dipakai sebagai uji silang). */
export const NAGA_SATU_TEMPAT = {
  sumber: S(135, [113]),
  tabel: { Besar: 'Utara', Mulud: 'Timur', Jumadilakir: 'Selatan', Pasa: 'Barat' }
};

// --- Bab 136: bagian tubuh naga tahun berpindah tiap 3 bulan -----------------------------------------------
export const NAGA_BAGIAN = {
  sumber: S(136, [114]),
  makna: { Kepala: 'buruk', Perut: 'buruk', Ekor: 'baik', Punggung: 'baik' },
  kelompok: [
    { bulan: ['Sura', 'Sapar', 'Mulud'], arah: { Kepala: 'Timur', Ekor: 'Barat', Punggung: 'Utara', Perut: 'Selatan' } },
    { bulan: ['Bakdamulud', 'Jumadilawal', 'Jumadilakir'], arah: { Kepala: 'Utara', Ekor: 'Selatan', Punggung: 'Barat', Perut: 'Timur' } },
    { bulan: ['Rejeb', 'Ruwah', 'Pasa'], arah: { Kepala: 'Barat', Ekor: 'Timur', Punggung: 'Selatan', Perut: 'Utara' } },
    { bulan: ['Sawal', 'Dulkangidah', 'Besar'], arah: { Kepala: 'Selatan', Ekor: 'Utara', Punggung: 'Timur', Perut: 'Barat' } }
  ]
};

// --- Bab 137: bertamu (cuwa, suka, hewa, begja) ------------------------------------------------------------
// Kitab menyebut "neptu hari dan pekan" tanpa pembagi; urutan 4 nama dan pembaginya tidak dinyatakan.
export const BERTAMU = {
  sumber: S(137, [114]),
  asumsi: 'Kitab tidak menyebut cara menjatuhkan jumlah neptu ke empat nama; tidak dihitung oleh mesin.',
  makna: {
    Cuwa: { arah: 'buruk', ringkas: 'tuan rumah tidak dapat ditemui; kalaupun bertemu, pembicaraan tidak memuaskan' },
    Suka: { arah: 'baik', ringkas: 'tuan rumah dapat ditemui dan pembicaraan terasa memuaskan' },
    Hewa: { arah: 'buruk', ringkas: 'tidak dapat ditemui; kalaupun bertemu hanya sebentar' },
    Begja: { arah: 'baik', ringkas: 'tuan rumah dapat ditemui dan pembicaraan terasa memuaskan' }
  }
};

// --- Bab 140: rijalolah menurut tanggal Jawa -----------------------------------------------------------------
export const RIJALOLAH_TANGGAL = {
  sumber: S(140, [115]),
  tabel: [
    { tanggal: [1, 11, 21], arah: 'Langit', memanggul: 'gelap' },
    { tanggal: [2, 12, 22], arah: 'Bumi', memanggul: 'naga' },
    { tanggal: [3, 13, 23], arah: 'Barat', memanggul: 'harimau' },
    { tanggal: [4, 14, 24], arah: 'Barat Daya', memanggul: 'sapi' },
    { tanggal: [5, 15, 25], arah: 'Selatan', memanggul: 'kuldi' },
    { tanggal: [6, 16, 26], arah: 'Barat', memanggul: 'badak' },
    { tanggal: [7, 17, 27], arah: 'Timur', memanggul: 'gajah' },
    { tanggal: [8, 18, 28], arah: 'Timur Laut', memanggul: 'api' },
    { tanggal: [9, 19, 29], arah: 'Utara', memanggul: 'api' },
    { tanggal: [10, 20, 30], arah: 'Barat Laut', memanggul: 'angin' }
  ]
};

// --- Bab 141: bepergian jauh, Suku/Watu/Gajah/Baya/Ratu dan arah Kala -----------------------------------------
export const BEPERGIAN_JAUH = {
  sumber: S(141, [116]),
  asumsi: 'Kitab tidak menyebut pembagi; jumlah neptu dihitung n mod 5 (0 menjadi 5). Kedua contoh kitab cocok (13 = Gajah, 9 = Baya).',
  nama: { 1: 'Suku', 2: 'Watu', 3: 'Gajah', 4: 'Baya', 5: 'Ratu' },
  baik: ['Gajah', 'Ratu'],
  arahKala: {
    7: 'Barat Daya', 8: 'Barat Daya', 9: 'Barat Laut', 10: 'Timur Laut', 11: 'Timur', 12: 'Tenggara',
    13: 'Barat Daya', 14: 'Barat Laut', 15: 'Timur', 16: 'Timur', 17: 'Tenggara', 18: 'Barat Laut'
  },
  contohKitab: [{ jumlah: 13, nama: 'Gajah' }, { jumlah: 9, nama: 'Baya' }]
};

// --- Bab 143: hari na'as dan waktu yang dihindari -------------------------------------------------------------
// `jam` hanya diisi bila kitab menyebut angka jam; selain itu hanya sebutan waktunya.
export const NAAS_HARI = {
  sumber: S(143, [117]),
  tabel: {
    Minggu: { waktu: 'semalam penuh', jam: null },
    Senin: { waktu: 'saat matahari di tengah', jam: null },
    Selasa: { waktu: 'pagi hari', jam: [6, 8] },
    Rabu: { waktu: 'saat matahari di tengah', jam: null },
    Kamis: { waktu: 'lingsir wetan', jam: [8, 10] },
    Jumat: { waktu: 'saat ashar', jam: null },
    Sabtu: { waktu: 'lingsir kulon', jam: [14, 16] }
  }
};

// --- Bab 144: bayangan badan (dalam telapak kaki) yang menandai saat berangkat ---------------------------------
export const BAYANGAN = {
  sumber: S(144, [117]),
  tabel: { Minggu: 10, Senin: 6, Selasa: 2, Rabu: 4, Kamis: 11, Jumat: 13, Sabtu: 12 }
};

// --- Bab 145: sa'at menurut jumlah neptu hari + pasaran --------------------------------------------------------
export const SAAT_NEPTU = {
  sumber: S(145, [118]),
  catatan: 'Jam hanya diisi bila kitab menyebut angka; "pagi" dan "sore" tidak diberi jam di bab ini.',
  tabel: {
    7: { nama: 'Bumi', saat: [{ nama: 'lingsir kulon', jam: [14, 16.5] }] },
    8: { nama: 'Api', saat: [{ nama: 'pagi', jam: null }, { nama: 'lingsir wetan', jam: [8, 10] }, { nama: 'tengange', jam: [11, 12] }] },
    9: { nama: 'Angin', saat: [{ nama: 'tengange', jam: [11, 12] }] },
    10: { nama: 'Ngaras pepet', saat: [{ nama: 'pagi', jam: null }, { nama: 'sore', jam: null }] },
    11: { nama: 'Ngaras tuding', saat: [{ nama: 'lingsir wetan', jam: [8, 10] }, { nama: 'tengange', jam: [11, 12] }] },
    12: { nama: 'Ngaras kembang', saat: [{ nama: 'pagi', jam: null }, { nama: 'sore', jam: null }] },
    13: { nama: 'Bintang', saat: [{ nama: 'pagi', jam: null }, { nama: 'tengange', jam: [11, 12] }] },
    14: { nama: 'Bulan', saat: [{ nama: 'lingsir wetan', jam: [8, 10] }, { nama: 'tengange', jam: [11, 12] }] },
    15: { nama: 'Matahari', saat: [{ nama: 'pagi', jam: null }, { nama: 'sore', jam: null }] },
    16: { nama: 'Air', saat: [{ nama: 'lingsir wetan', jam: [8, 10] }] },
    17: { nama: 'Bumi', saat: [{ nama: 'lingsir kulon', jam: [14, 16.5] }, { nama: 'sore', jam: null }] },
    18: { nama: 'Api', saat: [{ nama: 'pagi', jam: null }, { nama: 'lingsir wetan', jam: [8, 10] }] }
  }
};

// --- Bab 151: berpindah kediaman I ------------------------------------------------------------------------------
// Memakai urutan bilangan khusus (sama dengan bab 104): Jumat 1 ... Kamis 7; Kliwon 1 ... Wage 5.
export const PINDAH_KEDIAMAN = {
  sumber: S(151, [124]),
  asumsi: 'Kitab menyebut enam nama tanpa pembagi; jumlah dihitung n mod 6 (0 menjadi 6). Tidak ada contoh hitungan di kitab.',
  nama: {
    1: { nama: 'Pitutur', arah: 'buruk', ringkas: 'banyak masalah' },
    2: { nama: 'Demangkaduruan', arah: 'buruk', ringkas: 'sering sakit' },
    3: { nama: 'Satryapinayungan', arah: 'baik', ringkas: 'keinginan tercapai, dicintai dan dihormati orang' },
    4: { nama: 'Mantrisinaroja', arah: 'baik', ringkas: 'disukai orang' },
    5: { nama: 'Macanketawang', arah: 'buruk', ringkas: 'sering bercekcok dan memperkarakan hal sepele' },
    6: { nama: 'Nujupati', arah: 'buruk', ringkas: 'sengsara, sering berduka' }
  }
};

// --- Bab 152: arah yang tidak dianjurkan untuk pindah ------------------------------------------------------------
export const ARAH_PINDAH_DILARANG = {
  sumber: S(152, [124]),
  tabel: {
    7: 'Barat', 8: 'Utara', 9: 'Timur', 10: 'Selatan', 11: 'Timur', 12: 'Barat',
    13: 'Utara', 14: 'Selatan', 15: 'Barat', 16: 'Selatan', 17: 'Barat', 18: 'Utara'
  }
};

// --- Bab 153: menghadap pejabat menurut tanggal Jawa -------------------------------------------------------------
export const MENGHADAP_PEJABAT = {
  sumber: S(153, [124]),
  tabel: [
    { nama: 'Sri', arah: 'baik', ringkas: 'lebih baik', tanggal: [1, 5, 9, 13, 17, 21, 25, 29] },
    { nama: 'Sareh', arah: 'baik', ringkas: 'baik', tanggal: [2, 6, 10, 14, 18, 22, 26, 30] },
    { nama: 'Susah', arah: 'buruk', ringkas: 'tidak baik', tanggal: [3, 7, 11, 15, 19, 23, 27] },
    { nama: 'Duka', arah: 'buruk', ringkas: 'jelek', tanggal: [4, 8, 12, 16, 20, 24, 28] }
  ]
};

// --- Bab 154: hari hidup dan mati menurut arah -------------------------------------------------------------------
export const HIDUP_MATI_HARI = {
  sumber: S(154, [125]),
  tabel: {
    Minggu: { hidup: ['Selatan', 'Timur'], dilarang: ['Utara'], mati: ['Barat'] },
    Senin: { hidup: ['Selatan'], dilarang: ['Timur', 'Barat'], mati: ['Utara'] },
    Selasa: { hidup: ['Utara'], dilarang: ['Selatan', 'Timur'], mati: ['Barat'] },
    Rabu: { hidup: ['Utara', 'Timur'], dilarang: ['Barat'], mati: ['Selatan'] },
    Kamis: { hidup: ['Selatan', 'Timur'], dilarang: ['Barat'], mati: ['Utara'] },
    Jumat: { hidup: ['Utara'], dilarang: ['Timur', 'Barat'], mati: ['Selatan'] },
    Sabtu: { hidup: ['Barat'], dilarang: ['Selatan', 'Timur'], mati: ['Utara'] }
  }
};

// --- Bab 155: arah mencari nafkah menurut jumlah neptu (Utara, Timur, Selatan, Barat) -------------------------------
const ARAH_4 = ['Utara', 'Timur', 'Selatan', 'Barat'];
const baris = (...v) => Object.fromEntries(ARAH_4.map((a, i) => [a, v[i]]));
export const ARAH_NAFKAH_NEPTU = {
  sumber: S(155, [125]),
  baik: ['Hidup', 'Selamat'],
  contohKitab: { weton: 'Sabtu Pahing', jumlah: 18, arah: 'Utara' },
  tabel: {
    7: baris('Mati', 'Sakit', 'Hidup', 'Selamat'), 8: baris('Selamat', 'Mati', 'Sakit', 'Hidup'),
    9: baris('Sakit', 'Hidup', 'Selamat', 'Mati'), 10: baris('Hidup', 'Selamat', 'Mati', 'Sakit'),
    11: baris('Mati', 'Sakit', 'Hidup', 'Selamat'), 12: baris('Selamat', 'Mati', 'Sakit', 'Hidup'),
    13: baris('Sakit', 'Hidup', 'Selamat', 'Mati'), 14: baris('Hidup', 'Selamat', 'Mati', 'Sakit'),
    15: baris('Mati', 'Sakit', 'Hidup', 'Selamat'), 16: baris('Selamat', 'Mati', 'Sakit', 'Hidup'),
    17: baris('Sakit', 'Hidup', 'Selamat', 'Mati'), 18: baris('Hidup', 'Selamat', 'Mati', 'Sakit')
  }
};

// --- Bab 156: weton menurut arah mencari nafkah / berjualan ------------------------------------------------------
export const ARAH_WETON = {
  sumber: S(156, [126]),
  anomali: 'Cetakan memuat "Rabu Kliwon" dua kali (Barat dan Selatan) dan tidak memuat "Rabu Legi". Disalin apa adanya; tidak ada dasar untuk menebak koreksinya.',
  tabel: {
    Barat: ['Jumat Legi', 'Rabu Kliwon', 'Minggu Kliwon', 'Selasa Pahing', 'Minggu Pahing', 'Kamis Legi', 'Kamis Pon',
      'Jumat Wage', 'Sabtu Kliwon', 'Minggu Legi', 'Kamis Kliwon'],
    Timur: ['Selasa Legi', 'Jumat Pahing', 'Jumat Kliwon', 'Senin Legi', 'Jumat Pon', 'Kamis Pahing'],
    Selatan: ['Selasa Kliwon', 'Kamis Wage', 'Rabu Kliwon', 'Senin Kliwon', 'Rabu Pahing', 'Rabu Wage'],
    Utara: ['Sabtu Pahing', 'Minggu Pon', 'Senin Wage', 'Sabtu Wage', 'Rabu Pon', 'Sabtu Legi', 'Senin Pon',
      'Selasa Wage', 'Sabtu Pon', 'Minggu Wage', 'Senin Pahing', 'Selasa Pon']
  }
};
