/**
 * Hari baik dan hari naas menurut kitab Betaljemur Adammakna, bab 3-14 dan 26-33 (hlm. 7-12, 18-21).
 *
 * Semua tabel ditranskripsi langsung dari scan (bukan dari OCR, yang merusak beberapa tabel) dan
 * diperiksa silang: lihat tes `tests/hari.test.js`. Makna ditulis ulang singkat dengan kalimat sendiri.
 *
 * Nama bulan memakai nama mesin kalender (kalender.js); kitab menulis Rabiulawal, Rabiulakir, Puasa,
 * Dulkaidah untuk Mulud, Bakdamulud, Pasa, Dulkangidah.
 *
 * `bergantungTanggalJawa`: aturan yang memakai tanggal, bulan, atau tahun Jawa bergantung pada kalender
 * Jawa yang dipakai. Kitab mengikuti sistem Aboge (Alip = Rabu Wage), sedangkan mesin kita memakai
 * Asapon sejak 1867, sehingga hari pekan yang tercatat di beberapa tabel bisa bergeser sehari.
 */

const S = (bab, halaman) => ({ bab, halaman, verifikasi: 'scan' });

// --- Hari yang tidak baik untuk bepergian: hanya weton, tidak bergantung kalender -------------
export const BEPERGIAN = {
  tidakBaik: { sumber: S(3, [7]), weton: ['Minggu Pahing', 'Sabtu Pon', 'Jumat Wage', 'Selasa Kliwon', 'Senin Legi', 'Kamis Wage'] },
  sangatJelek: { sumber: S(4, [7]), weton: ['Rabu Legi', 'Minggu Pahing', 'Kamis Pon', 'Selasa Wage', 'Sabtu Kliwon'] }
};

// --- Taliwangke dan Samparwangke: wuku + weton ----------------------------------------------------
export const TALIWANGKE = {
  sumber: S(5, [8]),
  keterangan: 'Enam hari dalam 30 wuku; usahakan tidak mengerjakan hal penting.',
  daftar: [
    { wuku: 'Wuye', weton: 'Senin Kliwon', nama: 'Somaye', lambang: 'Penangkap burung' },
    { wuku: 'Wayang', weton: 'Selasa Legi', nama: 'Anggarayang', lambang: 'Matinya sapi hutan' },
    { wuku: 'Landep', weton: 'Rabu Pahing', nama: 'Bodanep', lambang: 'Matinya ikan' },
    { wuku: 'Warigalit', weton: 'Kamis Pon', nama: 'Warigamis', lambang: 'Matinya manusia' },
    { wuku: 'Kuningan', weton: 'Jumat Wage', nama: 'Sukraingan', lambang: 'Rontoknya tumbuhan' },
    { wuku: 'Kuruwelut', weton: 'Sabtu Kliwon', nama: 'Tumpaklote', lambang: 'Kapas yang sakit' }
  ]
};

export const SAMPARWANGKE = {
  sumber: S(6, [8, 9]),
  keterangan: 'Lima hari dalam 30 wuku, hari naas seseorang; dihindari untuk mengerjakan sesuatu.',
  daftar: [
    { wuku: 'Warigalit', weton: 'Senin Kliwon' },
    { wuku: 'Bala', weton: 'Senin Legi' },
    { wuku: 'Langkir', weton: 'Senin Pahing' },
    { wuku: 'Sinta', weton: 'Senin Pon' },
    { wuku: 'Tambir', weton: 'Senin Wage' }
  ]
};

// --- Tahun bencana: tanggal Jawa (bergantung kalender) -------------------------------------------
// `weton` = hari pekan yang dicatat kitab (sistem Aboge); aturan sebenarnya: hari terakhir tahun (29/30 Besar).
export const KUNARPAWARSA = {
  sumber: S(7, [9]),
  keterangan: 'Dilarang menikahkan dan sebagainya pada tanggal 29 atau 30 bulan Besar.',
  weton: { Alip: 'Sabtu Pahing', Ehe: 'Kamis Pahing', Jimawal: 'Senin Legi', Je: 'Jumat Legi', Dal: 'Rabu Kliwon', Be: 'Minggu Wage', Wawu: 'Kamis Pon', Jimakir: 'Selasa Pon' }
};

export const SANGARWARSA = {
  sumber: S(8, [9]),
  keterangan: 'Dilarang menikahkan dan sebagainya pada tanggal 3 bulan Sura (tiga hari setelah tahun baru Jawa).',
  weton: { Alip: 'Jumat Legi', Ehe: 'Selasa Kliwon', Jimawal: 'Minggu Kliwon', Je: 'Kamis Wage', Dal: 'Senin Pon', Be: 'Sabtu Legi', Wawu: 'Rabu Pahing', Jimakir: 'Minggu Legi' }
};

// --- Bulan x hari pekan: empat tabel yang membagi tujuh hari per kelompok bulan (bab 9, 10, 26, 27) -----
// Tiap kelompok bulan memiliki empat golongan hari: rahayu (baik), sarju (sedang), tidakBaik, sangar.
export const BULAN_HARI = {
  sumber: { rahayu: S(9, [10]), sarju: S(10, [10]), tidakBaik: S(26, [18]), sangar: S(27, [19]) },
  kelompok: [
    { bulan: ['Besar', 'Sura', 'Sapar'], rahayu: ['Rabu', 'Kamis'], sarju: ['Jumat'], tidakBaik: ['Senin', 'Selasa'], sangar: ['Sabtu', 'Minggu'] },
    { bulan: ['Mulud', 'Bakdamulud', 'Jumadilawal'], rahayu: ['Jumat'], sarju: ['Sabtu', 'Minggu'], tidakBaik: ['Rabu', 'Kamis'], sangar: ['Senin', 'Selasa'] },
    { bulan: ['Jumadilakir', 'Rejeb', 'Ruwah'], rahayu: ['Sabtu', 'Minggu'], sarju: ['Senin', 'Selasa'], tidakBaik: ['Jumat'], sangar: ['Rabu', 'Kamis'] },
    { bulan: ['Pasa', 'Sawal', 'Dulkangidah'], rahayu: ['Senin', 'Selasa'], sarju: ['Rabu', 'Kamis'], tidakBaik: ['Sabtu', 'Minggu'], sangar: ['Jumat'] }
  ]
};

// --- Bulan yang baik dan tidak baik untuk hajat nikah, menurut nama tahun (bab 11). Angka 1 = Sura ... 12 = Besar.
// Transkripsi dari scan (OCR merusak baris Alip dan Be). Bulan yang tidak tercantum di kedua daftar = netral.
export const BULAN_NIKAH_TAHUN = {
  sumber: S(11, [10]),
  tabel: {
    Alip: { baik: [1], tidakBaik: [9, 11] },
    Ehe: { baik: [1, 2, 6, 7, 8, 10], tidakBaik: [4, 9, 11, 12] },
    Jimawal: { baik: [7, 8, 10], tidakBaik: [1, 2, 3, 5, 12] },
    Je: { baik: [4, 5, 6, 7, 8, 9, 12], tidakBaik: [1, 2, 3, 10, 11] },
    Dal: { baik: [6, 7, 9, 10], tidakBaik: [2, 3, 8, 11] },
    Be: { baik: [6, 12], tidakBaik: [1, 2, 7] },
    Wawu: { baik: [2, 3, 4, 5, 9], tidakBaik: [1, 10, 11, 12] },
    Jimakir: { baik: [3, 5, 7, 8, 10, 12], tidakBaik: [1, 11] }
  }
};

// --- Anggarakasih (Selasa Kliwon): bulan tanpa Selasa Kliwon dilarang untuk hajat nikah (bab 12) ---------
// Tabel kitab (Aboge) disimpan sebagai rujukan; mesin menghitung langsung dari kalender (lebih tepat).
export const ANGGARAKASIH = {
  sumber: S(12, [11]),
  keterangan: 'Bulan yang tidak memiliki hari Anggarakasih (Selasa Kliwon) dilarang untuk hajat nikah dan sebagainya.',
  tabelKitabAboge: {
    Alip: ['Jumadilakir', 'Besar'], Ehe: ['Rejeb'], Jimawal: ['Sura', 'Ruwah'], Je: ['Sapar', 'Ruwah'],
    Dal: ['Mulud', 'Pasa'], Be: ['Bakdamulud'], Wawu: ['Bakdamulud', 'Dulkangidah'], Jimakir: ['Jumadilawal']
  }
};

// --- Pantangan bulan menurut tahun: dua bulan per tahun beserta gangguannya (bab 13) --------------------
export const PANTANGAN_BULAN = {
  sumber: S(13, [11, 12]),
  keterangan: 'Hajat nikah dan keperluan penting dihindari pada bulan-bulan ini.',
  tabel: {
    Alip: { bulan: ['Jumadilakir', 'Dulkangidah'], gangguan: 'Sakit, terkena racun' },
    Ehe: { bulan: ['Mulud', 'Pasa'], gangguan: 'Sakit tulang' },
    Jimawal: { bulan: ['Mulud', 'Besar'], gangguan: 'Tewas, hanyut di sungai' },
    Je: { bulan: ['Sura', 'Sawal'], gangguan: 'Sakit kusta' },
    Dal: { bulan: ['Ruwah'], gangguan: 'Demam, panas' },
    Be: { bulan: ['Sapar', 'Rejeb'], gangguan: 'Tersangkut perkara besar' },
    Wawu: { bulan: ['Jumadilawal'], gangguan: 'Sakit kepala' },
    Jimakir: { bulan: ['Sura', 'Dulkangidah'], gangguan: 'Gangguan jiwa (sakit ingatan)' }
  }
};

// --- Tanggal sangar dan hari Taliwangke tiap bulan (bab 14) --------------------------------------------
export const TANGGAL_SANGAR_BULAN = {
  sumber: S(14, [12]),
  keterangan: 'Hindari tanggal dan hari Taliwangke berikut untuk keperluan penting.',
  tabel: {
    Sura: { tanggal: [11, 14, 17, 27], weton: 'Rabu Pahing', akibat: 'Halangan yang lebih besar' },
    Sapar: { tanggal: [1, 12, 20, 22], weton: 'Kamis Pon', akibat: 'Sering sakit' },
    Mulud: { tanggal: [10, 13, 15, 23], weton: 'Jumat Wage', akibat: 'Sakit perut' },
    Bakdamulud: { tanggal: [10, 15, 20, 25], weton: 'Sabtu Kliwon', akibat: 'Sakit tulang' },
    Jumadilawal: { tanggal: [10, 11, 16, 26], weton: 'Senin Kliwon', akibat: 'Sakit tulang' },
    Jumadilakir: { tanggal: [3, 11, 14, 21], weton: 'Selasa Legi', akibat: 'Gangguan jiwa (sakit ingatan)' },
    Rejeb: { tanggal: [2, 11, 22], weton: 'Rabu Pahing', akibat: 'Terkena racun' },
    Ruwah: { tanggal: [14, 19, 24, 28], weton: 'Kamis Pon', akibat: 'Keracunan' },
    Pasa: { tanggal: [10, 15, 20, 25], weton: 'Jumat Wage', akibat: 'Sakit mata' },
    Sawal: { tanggal: [2, 17, 20, 27], weton: 'Sabtu Kliwon', akibat: 'Terkena perkara' },
    Dulkangidah: { tanggal: [6, 11, 12, 21], weton: 'Senin Kliwon', akibat: 'Penghuni rumah bergantian sakit' },
    Besar: { tanggal: [1, 13, 20, 23], weton: 'Selasa Legi', akibat: 'Kesusahan' }
  }
};

// --- Tanggal-tanggal terlarang untuk hajat nikah (bab 28-31) -----------------------------------------
// bab 28: peristiwa para nabi (Puasa: 21; catatan kitab menetapkan 12 dan 21).
export const TANGGAL_NABI = {
  sumber: S(28, [19]),
  tabel: {
    Sura: { tanggal: [13], peristiwa: 'Nabi Ibrahim dibakar oleh Raja Namrud' },
    Mulud: { tanggal: [3], peristiwa: 'Nabi Adam diturunkan ke dunia' },
    Bakdamulud: { tanggal: [16], peristiwa: 'Nabi Yusuf dimasukkan ke sumur' },
    Jumadilawal: { tanggal: [5], peristiwa: 'Nabi Nuh ditenggelamkan banjir' },
    Pasa: { tanggal: [12, 21], peristiwa: 'Nabi Musa berperang melawan Firaun' },
    Dulkangidah: { tanggal: [24], peristiwa: 'Nabi Yunus ditelan ikan paus' },
    Besar: { tanggal: [25], peristiwa: 'Nabi Muhammad masuk ke gua' }
  }
};

export const TANGGAL_NAAS = {
  sumber: S(29, [19]),
  tabel: {
    Sura: [6, 11], Sapar: [1, 20], Mulud: [10, 20], Bakdamulud: [10, 20], Jumadilawal: [1, 11], Jumadilakir: [10, 14],
    Rejeb: [2, 14], Ruwah: [12, 13], Pasa: [9, 20], Sawal: [10, 20], Dulkangidah: [12, 13], Besar: [6, 10]
  }
};

// Untuk akad nikah. Bulan Besar tidak memiliki tanggal sangar (kosong di scan).
export const TANGGAL_SANGAR_AKAD = {
  sumber: S(30, [20]),
  tabel: {
    Sura: [18], Sapar: [10], Mulud: [8], Bakdamulud: [28], Jumadilawal: [28], Jumadilakir: [18],
    Rejeb: [18], Ruwah: [26], Pasa: [24], Sawal: [2], Dulkangidah: [28], Besar: []
  }
};

// Bangas Padewan. Untuk bulan Pasa kitab menetapkan 7, 9, dan 20 (catatan hlm. 20).
export const BANGAS_PADEWAN = {
  sumber: S(31, [20]),
  tabel: {
    Sura: [11], Sapar: [20], Mulud: [1, 15], Bakdamulud: [10, 20], Jumadilawal: [10, 11], Jumadilakir: [10, 14],
    Rejeb: [13, 27], Ruwah: [4, 28], Pasa: [7, 9, 20], Sawal: [10], Dulkangidah: [2, 22], Besar: [6, 20]
  }
};

// --- Taliwangke untuk akad nikah: bulan -> weton (bab 32) ------------------------------------------------
export const TALIWANGKE_AKAD = {
  sumber: S(32, [21]),
  tabel: [
    { bulan: ['Dulkangidah', 'Jumadilawal'], weton: 'Senin Kliwon' },
    { bulan: ['Besar', 'Jumadilakir'], weton: 'Selasa Legi' },
    { bulan: ['Sura', 'Rejeb'], weton: 'Rabu Pahing' },
    { bulan: ['Sapar', 'Ruwah'], weton: 'Kamis Pon' },
    { bulan: ['Mulud', 'Pasa'], weton: 'Jumat Wage' },
    { bulan: ['Bakdamulud', 'Sawal'], weton: 'Sabtu Kliwon' }
  ]
};

// --- Nilai tiap bulan untuk hajat nikah (bab 33) --------------------------------------------------------
// `boleh`: false = "jangan dilanggar", true = "boleh dilanggar walau ada akibatnya".
export const BULAN_NIKAH = {
  sumber: S(33, [21]),
  tabel: {
    Sura: { sikap: 'jangan', arah: 'buruk', makna: 'Bila dilanggar, hidup sulit dan sering bertengkar' },
    Sapar: { sikap: 'boleh', arah: 'netral', makna: 'Dapat dijalani meski dilarang, dengan risiko serba kurang dan banyak berutang' },
    Mulud: { sikap: 'jangan', arah: 'buruk', makna: 'Bila dilanggar, salah satu pasangan akan meninggal' },
    Bakdamulud: { sikap: 'boleh', arah: 'netral', makna: 'Dapat dijalani meski dilarang, dengan risiko sering digunjingkan dan dicaci' },
    Jumadilawal: { sikap: 'boleh', arah: 'netral', makna: 'Dapat dijalani meski dilarang, dengan risiko sering tertipu, kehilangan, dan banyak lawan' },
    Jumadilakir: { sikap: 'baik', arah: 'baik', makna: 'Kaya harta benda' },
    Rejeb: { sikap: 'baik', arah: 'baik', makna: 'Selamat dan banyak anak' },
    Ruwah: { sikap: 'baik', arah: 'baik', makna: 'Selamat dan selalu damai' },
    Pasa: { sikap: 'jangan', arah: 'buruk', makna: 'Bila dilanggar, mendapat celaka besar' },
    Sawal: { sikap: 'boleh', arah: 'netral', makna: 'Dapat dijalani meski dilarang, dengan risiko sering kekurangan dan berutang' },
    Dulkangidah: { sikap: 'jangan', arah: 'buruk', makna: 'Bila dilanggar, sering sakit dan bertengkar dengan teman' },
    Besar: { sikap: 'baik', arah: 'baik', makna: 'Kaya dan memperoleh kebahagiaan' }
  },
  // Catatan kitab: empat bulan "baik" hanya baik bila memiliki Selasa Kliwon (lebih baik lagi bila juga ada Jumat Kliwon).
  syaratSelasaKliwon: ['Jumadilakir', 'Rejeb', 'Ruwah', 'Besar'],
  gantiBilaTerpaksa: ['Sapar', 'Mulud', 'Jumadilawal', 'Sawal']
};
