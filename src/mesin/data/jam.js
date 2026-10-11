/**
 * Tabel jam (saat) menurut kitab Betaljemur Adammakna: bab 34-37, 146-149, 157-158, 162, 164-166
 * (hlm. 22-26, 119-123, 126-127, 131-134).
 *
 * Semua tabel diperiksa dengan scan. Bab 34 (tabel diputar 90 derajat) dibaca dari gambar yang diputar.
 * Makna ditulis ulang singkat; `arah` (baik/buruk/netral) adalah klasifikasi kami.
 *
 * Tidak dimasukkan (ritual): doa pada bab 157 dan anjuran busana/ritual pada bab 158 dan 166.
 *
 * Catatan notasi jam di kitab: tabel 12 jam memakai jam 6-18 (siang), ditulis dengan angka jam 12-an
 * (1-5 berarti 13-17). Kitab tidak menyebut am/pm; jam 6-18 adalah asumsi yang cocok dengan semua
 * tabel yang memuat angka 24 jam (bab 147, 149, 164, 165).
 */

const S = (bab, halaman, verifikasi = 'scan') => ({ bab, halaman, verifikasi });

export const URUTAN_MINGGU = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

/** Jam tulisan kitab (12-an) -> 24 jam: 1-5 menjadi 13-17. */
export const jam24 = (n) => (n < 6 ? n + 12 : n);

// --- Siklus 12 jam (dasar bab 147, 148, 149, 164, 165) -------------------------------------------------------
// Tujuh saat per hari, lama (jam): 2,2,1,2,2,2,1 = 12. Hari ke-d (Minggu = 0) memulai jam 06.00 pada saat ke-d.
export const LAMA_SAAT = [2, 2, 1, 2, 2, 2, 1];

export const SAAT_AGUNG = {
  sumber: S(147, [121]),
  nama: ['Wiji', 'Cahya', 'Lara', 'Rejeki', 'Malaekat', 'Puji', 'Pati'],
  arah: { Wiji: 'baik', Cahya: 'baik', Lara: 'buruk', Rejeki: 'baik', Malaekat: 'buruk', Puji: 'buruk', Pati: 'buruk' },
  makna: {
    Wiji: 'aman, tenteram, suka, senang',
    Cahya: 'terang, pantas, maksud selalu tercapai',
    Lara: 'saat yang dihindari',
    Rejeki: 'menjadi tempat berlindung; segala hal tercapai dan baik',
    Malaekat: 'saat yang dihindari',
    Puji: 'saat yang dihindari',
    Pati: 'saat yang dihindari'
  },
  // Tabel tercetak (angka jam 12-an, [mulai, akhir]) untuk Wiji..Pati. Rabu-Wiji tercetak "1 - 1" (salah cetak
  // yang jelas; Cahya mulai 3 dan lama Wiji 2 jam), dibaca 1-3.
  cetak: {
    Minggu: [[6, 8], [8, 10], [10, 11], [11, 13], [13, 15], [15, 17], [17, 18]],
    Senin: [[4, 6], [6, 8], [8, 9], [9, 11], [11, 13], [13, 15], [15, 16]],
    Selasa: [[2, 4], [4, 6], [6, 7], [7, 9], [9, 11], [11, 13], [13, 14]],
    Rabu: [[1, 3], [3, 5], [5, 6], [6, 8], [8, 10], [10, 12], [12, 13]],
    Kamis: [[11, 1], [1, 3], [3, 4], [4, 6], [6, 8], [8, 10], [10, 11]],
    Jumat: [[9, 11], [11, 1], [1, 2], [2, 4], [4, 6], [6, 8], [8, 9]],
    Sabtu: [[7, 9], [9, 11], [11, 12], [12, 2], [2, 4], [4, 6], [6, 7]]
  }
};

// Bab 148: jam menurut hari. Saat ke-n (Wiji = 0 ... Pati = 6) pada hari mana pun masuk hari ke-n.
export const HARI_MENURUT_JAM = {
  sumber: S(148, [121, 122]),
  catatan: 'Tabel kitab adalah balikan bab 147: saat Wiji masuk Minggu, Cahya Senin, Lara Selasa, Rejeki Rabu, Malaekat Kamis, Puji Jumat, Pati Sabtu.',
  contohKitab: [
    { hari: 'Minggu', jam: 9, masukHari: 'Senin' }, // "setelah pukul 7 sampai 9 ..."; Minggu 8-10 = Senin
    { hari: 'Sabtu', jam: 11.5, masukHari: 'Selasa' }
  ]
};

// Bab 149: jam yang dihindari (tercetak) = saat Lara dan Pati yang masing-masing 1 jam. Dipakai untuk uji silang.
export const JAM_DIHINDARI = {
  sumber: S(149, [123]),
  // Bab 123 (hlm. 109, larangan hubungan suami istri siang atau malam) memuat tabel jam yang sama persis; tidak disalin lagi.
  serupa: S(123, [109]),
  cetak: {
    Minggu: [[10, 11], [5, 6]], Senin: [[8, 9], [3, 4]], Selasa: [[6, 7], [1, 2]], Rabu: [[12, 1], [5, 6]],
    Kamis: [[10, 11], [3, 4]], Jumat: [[8, 9], [1, 2]], Sabtu: [[6, 7], [11, 12]]
  }
};

// --- Bab 146: saat 12 menurut jumlah neptu hari + pasaran -----------------------------------------------------
export const SAAT_12 = {
  sumber: S(146, [119, 120]),
  arah: { Ayu: 'baik', Srilungguh: 'baik', Srigumelar: 'baik', Sampar: 'buruk', Pacak: 'buruk', 'Kala penganten': 'buruk', Kalaluweng: 'buruk' },
  catatanCetak: 'Neptu 9, kolom terakhir: tabel siang tercetak Srigumelar, tabel malam Srilungguh (keduanya baik).',
  siang: {
    kolom: [
      { nama: 'Pagi', jam: [6, 8] }, { nama: 'Wisang garu', jam: [8, 11] }, { nama: 'Bedug', jam: [11, 13] },
      { nama: 'Lingsir', jam: [13, 15] }, { nama: 'Sore', jam: [15, 18] }
    ],
    tabel: {
      7: ['Sampar', 'Srilungguh', 'Pacak', 'Pacak', 'Ayu'],
      8: ['Sampar', 'Srilungguh', 'Kala penganten', 'Ayu', 'Ayu'],
      9: ['Sampar', 'Ayu', 'Sampar', 'Kala penganten', 'Srigumelar'],
      10: ['Sampar', 'Srilungguh', 'Srilungguh', 'Pacak', 'Ayu'],
      11: ['Kalaluweng', 'Pacak', 'Ayu', 'Sampar', 'Srilungguh'],
      12: ['Srigumelar', 'Kala penganten', 'Sampar', 'Ayu', 'Srilungguh'],
      13: ['Pacak', 'Ayu', 'Sampar', 'Srilungguh', 'Srilungguh'],
      14: ['Ayu', 'Sampar', 'Srilungguh', 'Srigumelar', 'Kala penganten'],
      15: ['Ayu', 'Sampar', 'Srilungguh', 'Srigumelar', 'Pacak'],
      16: ['Srigumelar', 'Ayu', 'Ayu', 'Sampar', 'Pacak'],
      17: ['Ayu', 'Sampar', 'Kala penganten', 'Srigumelar', 'Srigumelar'],
      18: ['Srigumelar', 'Pacak', 'Pacak', 'Ayu', 'Sampar']
    }
  },
  // Jam malam memakai jam 24; kolom disusun menurut waktu (dari 18.00), urutan kolom kitab dibalik.
  malam: {
    kolom: [
      { nama: 'Sore', jam: [18, 20] }, { nama: 'Sirep wong', jam: [20, 23] }, { nama: 'Tengah malam', jam: [23, 25] },
      { nama: 'Lingsir malam', jam: [25, 27] }, { nama: 'Bangun', jam: [27, 30] }
    ],
    tabel: {
      7: ['Ayu', 'Pacak', 'Pacak', 'Srilungguh', 'Sampar'],
      8: ['Ayu', 'Ayu', 'Kala penganten', 'Srilungguh', 'Sampar'],
      9: ['Srilungguh', 'Kala penganten', 'Sampar', 'Ayu', 'Sampar'],
      10: ['Ayu', 'Pacak', 'Srilungguh', 'Srilungguh', 'Sampar'],
      11: ['Srilungguh', 'Sampar', 'Ayu', 'Pacak', 'Kalaluweng'],
      12: ['Srilungguh', 'Ayu', 'Sampar', 'Kala penganten', 'Srigumelar'],
      13: ['Srilungguh', 'Srilungguh', 'Sampar', 'Ayu', 'Pacak'],
      14: ['Kala penganten', 'Srigumelar', 'Srilungguh', 'Sampar', 'Ayu'],
      15: ['Pacak', 'Srigumelar', 'Srilungguh', 'Sampar', 'Ayu'],
      16: ['Pacak', 'Sampar', 'Ayu', 'Ayu', 'Srigumelar'],
      17: ['Srigumelar', 'Srigumelar', 'Kala penganten', 'Sampar', 'Ayu'],
      18: ['Sampar', 'Ayu', 'Pacak', 'Pacak', 'Srigumelar']
    }
  }
};

// --- Bab 157: jam sial dan baik per hari -------------------------------------------------------------------------
// Angka = jam 12-an. Pasangan sial (a, b) dibaca dua jam berurutan; angka baik dibaca satu jam. Asumsi notasi,
// sama seperti bab 158 yang menulis "7. 8. 9." sebagai tiga jam.
export const JAM_SIAL_BAIK = {
  sumber: S(157, [126]),
  asumsi: 'Pasangan "6, 7" dibaca sebagai jam 6 dan jam 7 (dua jam berurutan); angka tunggal dibaca satu jam. Jam 1-5 = 13-17.',
  anomali: 'Selasa: angka baik kedua tercetak 1, padahal 13 baris lain mengikuti pola "satu jam setelah sial" (akan 10). Disalin apa adanya.',
  tabel: {
    Minggu: { sial: [[6, 7], [12, 1]], baik: [8, 2] },
    Senin: { sial: [[4, 5], [10, 11]], baik: [6, 12] },
    Selasa: { sial: [[3, 4], [8, 9]], baik: [5, 1] },
    Rabu: { sial: [[2, 3], [6, 7]], baik: [4, 8] },
    Kamis: { sial: [[12, 1], [4, 5]], baik: [2, 6] },
    Jumat: { sial: [[10, 11], [3, 4]], baik: [12, 5] },
    Sabtu: { sial: [[8, 9], [6, 7]], baik: [10, 8] }
  }
};

// --- Bab 158: lima saat berpenjaga (Jabarail, Akhmad, Yusup, Ibrahim, Ngijrail) ------------------------------------
export const SAAT_MALAIKAT = {
  sumber: S(158, [127]),
  asumsi: 'Jam 12-an: tiap angka = satu jam penuh dari jam itu; 1-5 = 13-17. Tiap baris menutup 12 jam (06.00-18.00).',
  makna: {
    Jabarail: { arah: 'baik', ringkas: 'baik; usaha mendapat pertolongan' },
    Akhmad: { arah: 'baik', ringkas: 'baik untuk segala hal; menang jika berperang' },
    Yusup: { arah: 'baik', ringkas: 'baik untuk berdagang dan bertemu pejabat atau orang bijak' },
    Ibrahim: { arah: 'buruk', ringkas: 'tidak baik; berdagang rugi, bepergian banyak rintangan' },
    Ngijrail: { arah: 'buruk', ringkas: 'jelek; barang hilang sulit ditemukan, berdagang rugi' }
  },
  tabel: {
    Minggu: { Jabarail: [6], Akhmad: [7, 8, 9], Yusup: [10, 11, 12], Ibrahim: [1, 2, 3], Ngijrail: [4, 5] },
    Senin: { Jabarail: [1, 2, 3], Akhmad: [4, 5], Yusup: [7, 8, 9], Ibrahim: [6], Ngijrail: [10, 11, 12] },
    Selasa: { Jabarail: [6], Akhmad: [1, 2, 3], Yusup: [10, 11, 12], Ibrahim: [4, 5], Ngijrail: [7, 8, 9] },
    Rabu: { Jabarail: [4, 5], Akhmad: [6], Yusup: [7, 8, 9], Ibrahim: [10, 11, 12], Ngijrail: [1, 2, 3] },
    Kamis: { Jabarail: [6], Akhmad: [1, 2, 3], Yusup: [10, 11, 12], Ibrahim: [4, 5], Ngijrail: [7, 8, 9] },
    Jumat: { Jabarail: [4, 5], Akhmad: [6], Yusup: [10, 11, 12], Ibrahim: [1, 2, 3], Ngijrail: [7, 8, 9] },
    Sabtu: { Jabarail: [1, 2, 3], Akhmad: [10, 11, 12], Yusup: [7, 8, 9], Ibrahim: [6], Ngijrail: [4, 5] }
  }
};

// --- Bab 162: saat menurut ketentuan bintang, per hari dan jam (6..12, 1..5) ------------------------------------------
export const SAAT_BINTANG = {
  sumber: S(162, [131]),
  kode: {
    s: { nama: 'slamet', arah: 'baik', tingkat: 'lebih baik' },
    l: { nama: 'luhur', arah: 'baik', tingkat: 'lebih baik' },
    sh: { nama: 'sih', arah: 'baik', tingkat: 'baik' },
    rh: { nama: 'rahmat', arah: 'baik', tingkat: 'baik' },
    is: { nama: 'luhur sedang', arah: 'baik', tingkat: 'baik' },
    b: { nama: 'becik', arah: 'baik', tingkat: 'baik' },
    a: { nama: 'ala', arah: 'buruk', tingkat: 'tidak baik' },
    p: { nama: 'pati', arah: 'buruk', tingkat: 'tidak baik' },
    r: { nama: 'rusak', arah: 'buruk', tingkat: 'tidak baik' },
    k: { nama: 'kalah', arah: 'buruk', tingkat: 'tidak baik' }
  },
  asumsi: 'Kitab tidak mengelompokkan "b = becik" pada aturan baik/buruk di catatannya; dibaca baik menurut artinya.',
  contohKitab: [{ hari: 'Minggu', jam: 5, kode: 'p' }, { hari: 'Senin', jam: 4, kode: 'rh' }, { hari: 'Selasa', jam: 8, kode: 's' }],
  // Jam: 6 7 8 9 10 11 12 1 2 3 4 5
  tabel: {
    Minggu: ['s', 'a', 'is', 'p', 'sh', 'r', 's', 'b', 's', 'a', 'is', 'p'],
    Senin: ['a', 'r', 'p', 'rh', 'a', 'l', 'b', 's', 'is', 'p', 'rh', 'a'],
    Selasa: ['is', 'p', 's', 'r', 'l', 's', 'k', 'r', 'is', 'p', 'rh', 'r'],
    Rabu: ['p', 'l', 'r', 'is', 's', 'a', 'is', 'is', 'p', 'rh', 'a', 'b'],
    Kamis: ['a', 's', 's', 'a', 'a', 'p', 'r', 'p', 'rh', 'k', 's', 'is'],
    Jumat: ['sh', 'sh', 'is', 'is', 'is', 'a', 'p', 'sh', 'r', 'l', 's', 'k'],
    Sabtu: ['r', 's', 'k', 'k', 's', 'p', 'sh', 'r', 'rh', 's', 'k', 'is']
  }
};

// --- Bab 164 dan 165: saat untuk perkara/perundingan -------------------------------------------------------------------
// Siklus sama dengan bab 147 (Ratu = Wiji, Tangguh = Cahya, Lara, Tresna = Rejeki, Pandita = Malaekat, Cidra = Puji, Pati).
export const SAAT_PERKARA = {
  sumber: S(165, [133]),
  nama: ['Ratu', 'Tangguh', 'Lara', 'Tresna', 'Pandita', 'Cidra', 'Pati'],
  arah: { Ratu: 'baik', Tangguh: 'netral', Lara: 'buruk', Tresna: 'netral', Pandita: 'netral', Cidra: 'buruk', Pati: 'buruk' },
  tingkat: {
    Ratu: 'terbaik', Tangguh: 'tidak dinilai kitab', Lara: 'sangat jelek', Tresna: 'sedang', Pandita: 'sedang',
    Cidra: 'tidak baik', Pati: 'sangat jelek'
  },
  // Tercetak 24 jam [mulai, akhir, nama]. Dua salah cetak jelas pada Selasa (lihat selisihCetak).
  cetak: {
    Minggu: [[6, 8, 'Ratu'], [8, 10, 'Tangguh'], [10, 11, 'Lara'], [11, 13, 'Tresna'], [13, 15, 'Pandita'], [15, 17, 'Cidra'], [17, 18, 'Pati']],
    Senin: [[6, 8, 'Tangguh'], [8, 9, 'Lara'], [9, 11, 'Tresna'], [11, 13, 'Pandita'], [13, 15, 'Cidra'], [15, 16, 'Pati'], [16, 18, 'Ratu']],
    Selasa: [[6, 7, 'Lara'], [8, 9, 'Tresna'], [9, 11, 'Pandita'], [11, 13, 'Cidra'], [13, 14, 'Pati'], [14, 16, 'Ratu'], [16, 17, 'Tangguh']],
    Rabu: [[6, 8, 'Tresna'], [8, 10, 'Pandita'], [10, 12, 'Cidra'], [12, 13, 'Pati'], [13, 15, 'Ratu'], [15, 17, 'Tangguh'], [17, 18, 'Lara']],
    Kamis: [[6, 8, 'Pandita'], [8, 10, 'Cidra'], [10, 11, 'Pati'], [11, 13, 'Ratu'], [13, 15, 'Tangguh'], [15, 16, 'Lara'], [16, 18, 'Tresna']],
    Jumat: [[6, 8, 'Cidra'], [8, 9, 'Pati'], [9, 11, 'Ratu'], [11, 13, 'Tangguh'], [13, 14, 'Lara'], [14, 16, 'Tresna'], [16, 18, 'Pandita']],
    Sabtu: [[6, 7, 'Pati'], [7, 9, 'Ratu'], [9, 11, 'Tangguh'], [11, 12, 'Lara'], [12, 14, 'Tresna'], [14, 16, 'Pandita'], [16, 18, 'Cidra']]
  },
  selisihCetak: [
    { hari: 'Selasa', urutan: 1, saat: 'Tresna', cetak: [8, 9], seharusnya: [7, 9] },
    { hari: 'Selasa', urutan: 6, saat: 'Tangguh', cetak: [16, 17], seharusnya: [16, 18] }
  ]
};

/**
 * Bab 164 (berangkat ke pengadilan): sama dengan bab 165, tetapi saat Tangguh ditulis Cidra dan jam ditulis
 * sebagai jam-jam penuh. Tercetak (jam penuh 24, [mulai, selesai-termasuk, nama]); dua salah cetak jelas
 * (lihat selisihCetak).
 */
export const SAAT_PENGADILAN = {
  sumber: S(164, [132]),
  baik: ['Ratu', 'Pandita'],
  cetak: {
    Selasa: [[6, 6, 'Lara'], [7, 8, 'Tresna'], [9, 10, 'Pandita'], [11, 12, 'Cidra'], [13, 13, 'Pati'], [14, 15, 'Ratu'], [16, 17, 'Cidra']],
    Rabu: [[6, 7, 'Tresna'], [8, 9, 'Pandita'], [9, 10, 'Cidra'], [12, 12, 'Pati'], [13, 14, 'Ratu'], [15, 16, 'Cidra'], [17, 17, 'Lara']],
    Kamis: [[6, 7, 'Pandita'], [8, 9, 'Cidra'], [10, 10, 'Pati'], [11, 12, 'Ratu'], [13, 14, 'Cidra'], [15, 15, 'Lara'], [16, 17, 'Tresna']],
    Jumat: [[6, 7, 'Cidra'], [8, 8, 'Pati'], [9, 10, 'Ratu'], [10, 12, 'Cidra'], [13, 13, 'Lara'], [14, 15, 'Tresna'], [16, 17, 'Pandita']],
    Sabtu: [[6, 6, 'Pati'], [7, 8, 'Ratu'], [9, 10, 'Cidra'], [11, 11, 'Lara'], [12, 13, 'Tresna'], [14, 15, 'Pandita'], [16, 17, 'Cidra']],
    Minggu: [[6, 7, 'Ratu'], [8, 9, 'Cidra'], [10, 10, 'Lara'], [11, 12, 'Tresna'], [13, 14, 'Pandita'], [15, 16, 'Cidra'], [17, 17, 'Pati']],
    Senin: [[6, 7, 'Cidra'], [8, 8, 'Lara'], [9, 10, 'Tresna'], [11, 12, 'Pandita'], [13, 14, 'Cidra'], [15, 15, 'Pati'], [16, 17, 'Ratu']]
  },
  selisihCetak: [
    { hari: 'Rabu', urutan: 2, saat: 'Cidra', cetak: [9, 10], seharusnya: [10, 11] },
    { hari: 'Jumat', urutan: 3, saat: 'Cidra', cetak: [10, 12], seharusnya: [11, 12] }
  ]
};

// --- Bab 35, 36, 166: saat menurut tanggal Jawa (dan pasaran) ---------------------------------------------------------
// Lima saat sepanjang 06.00-18.00, masing-masing 144 menit (2 jam 24 menit).
export const BATAS_SAAT_MENIT = [360, 504, 648, 792, 936, 1080];

export const KELOMPOK_TANGGAL_NAMA = ['Ahmad', 'Jibrail', 'Ibrahim', 'Yusup', 'Israil']; // urutan dasar (bab 35, 166)

export const SAAT_PENJAGA = {
  sumber: S(166, [134]),
  catatanNama: 'Kitab menulis Jibrail/Jabrail/Jabarail, Yusup/Yusuf, Israil/Ngijrail secara bergantian; di sini disatukan.',
  makna: {
    Ahmad: { arah: 'baik', ringkas: 'baik untuk segala keperluan' },
    Jibrail: { arah: 'netral', ringkas: 'sedang' },
    Ibrahim: { arah: 'buruk', ringkas: 'sangat jelek' },
    Yusup: { arah: 'netral', ringkas: 'ada baiknya, ada jeleknya' },
    Israil: { arah: 'buruk', ringkas: 'amat jelek, seperti Ibrahim' }
  }
};

export const SAAT_NIKAH_PASARAN = {
  sumber: S(35, [24]),
  nama: ['Pitutur', 'Rejeki', 'Slamet', 'Pangkalan', 'Pacakwesi'],
  baris: {
    Legi: ['Pitutur', 'Rejeki', 'Slamet', 'Pangkalan', 'Pacakwesi'],
    Pahing: ['Rejeki', 'Slamet', 'Pangkalan', 'Pacakwesi', 'Pitutur'],
    Pon: ['Slamet', 'Pangkalan', 'Pacakwesi', 'Pitutur', 'Rejeki'],
    Wage: ['Pangkalan', 'Pacakwesi', 'Pitutur', 'Rejeki', 'Slamet'],
    Kliwon: ['Pacakwesi', 'Pitutur', 'Rejeki', 'Slamet', 'Pangkalan']
  },
  contohKitab: {
    weton: 'Rabu Pon', // tanggal kelompok 1: Ahmad Slamet, Jibrail Pangkalan, Ibrahim Pacakwesi, Yusup Pitutur, Israil Rejeki
    kelompok: 1,
    hasil: ['Ahmad Slamet', 'Jibrail Pangkalan', 'Ibrahim Pacakwesi', 'Yusup Pitutur', 'Israil Rejeki']
  },
  penilaian: {
    Slamet: { arah: 'baik', ringkas: 'baik; dipakai kalangan priyayi' },
    Rejeki: { arah: 'netral', ringkas: 'cukupan; dipakai kalangan pedagang' },
    Pitutur: { arah: 'buruk', ringkas: 'jelek' },
    Pangkalan: { arah: 'buruk', ringkas: 'jelek' },
    Pacakwesi: { arah: 'buruk', ringkas: 'jelek' }
  }
};

/** Bab 36: tanggal + nama saat (kelompok tanggal 1-5 menurut ((tanggal - 1) mod 5) + 1). Tercetak. */
export const SAAT_NIKAH_TANGGAL = {
  sumber: S(36, [25]),
  nama: ['Tutur', 'Alangan', 'Pacak', 'Slamet', 'Rejeki'],
  penilaian: {
    Slamet: { arah: 'baik', ringkas: 'baik' },
    Rejeki: { arah: 'netral', ringkas: 'cukupan' },
    Tutur: { arah: 'buruk', ringkas: 'jelek' },
    Alangan: { arah: 'buruk', ringkas: 'jelek' },
    Pacak: { arah: 'buruk', ringkas: 'jelek' }
  },
  cetak: {
    1: [['Ahmad', 'Tutur'], ['Jibrail', 'Alangan'], ['Ibrahim', 'Pacak'], ['Yusup', 'Slamet'], ['Israil', 'Rejeki']],
    2: [['Jibrail', 'Rejeki'], ['Ibrahim', 'Tutur'], ['Yusup', 'Alangan'], ['Israil', 'Pacak'], ['Ahmad', 'Slamet']],
    3: [['Ibrahim', 'Slamet'], ['Yusup', 'Rejeki'], ['Israil', 'Tutur'], ['Ahmad', 'Alangan'], ['Jibrail', 'Pacak']],
    4: [['Yusup', 'Pacak'], ['Israil', 'Slamet'], ['Ahmad', 'Rejeki'], ['Jibrail', 'Tutur'], ['Ibrahim', 'Alangan']],
    5: [['Israil', 'Alangan'], ['Ahmad', 'Pacak'], ['Jibrail', 'Slamet'], ['Ibrahim', 'Rejeki'], ['Yusup', 'Tutur']]
  },
  contohKitab: { kelompok: 5, baik: 'Jibrail Slamet', cukupan: 'Ibrahim Rejeki' }
};

// --- Bab 37: saat akad menurut terbitnya bintang Suhara -----------------------------------------------------------------
export const SUHARA = {
  sumber: S(37, [25, 26]),
  catatanCetak: 'Sabtu siang tercetak "10.00 - 18.00" (satu hari lain memakai selisih 7 jam; akan 17). Disalin apa adanya. Kitab memakai bentuk ini jarang; yang lazim bab 35.',
  tabel: {
    Minggu: { siang: [7, 14], malam: [24] },
    Senin: { siang: [11], malam: [21, 28] },
    Selasa: { siang: [8, 15], malam: [18, 25] },
    Rabu: { siang: [12], malam: [22, 29] },
    Kamis: { siang: [9, 16], malam: [19, 26] },
    Jumat: { siang: [6, 13], malam: [23] },
    Sabtu: { siang: [10, 18], malam: [20, 27] }
  }
};

// --- Bab 34: hari akad nikah, tiga jenis, menurut urutan hari itu dalam bulan Jawa ---------------------------------------
const BARIS_34 = ['Jumat', 'Sabtu', 'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis'];

// "Idem" di kitab = sama dengan sel di atasnya (baris sebelumnya, kolom sama).
const resolusiIdem = (cetak) => {
  const hasil = cetak.map(b => [...b]);
  for (let i = 0; i < hasil.length; i++) for (let k = 0; k < hasil[i].length; k++) {
    if (hasil[i][k] === 'Idem') hasil[i][k] = hasil[i - 1][k];
  }
  return hasil;
};

const CETAK_34 = {
  I: [
    ['Harja', 'Musuh Allah', 'Pati', 'Beruntung', 'Mendapat sahabat'],
    ['Serba tak tercapai', 'Musuh Allah', 'Besar nasfunya', 'Harja', 'Beruntung'],
    ['Idem', 'Harja', 'Pati', 'Berbahagia', 'Berdosa besar'],
    ['Musuh Allah', 'Idem', 'Sering tertimpa hal tak menyenangkan', 'Beruntung', 'Aral melintang'],
    ['Serba tak tercapai', 'Musuh Allah', 'Berdosa besar', 'Harja', 'Aral melintang'], // tercetak "Arah Melintang"
    ['Idem', 'Harja', 'Pati', 'Senang', 'Sering tertimpa hal tak menyenangkan'],
    ['Idem', 'Musuh Allah', 'Harja', 'Minta dihormat', 'Berdosa besar']
  ],
  II: [
    ['Harja', 'Musuh Allah', 'Pati', 'Tercapai maksudnya', 'Harja'],
    ['Musuh Allah', 'Serba tak tercapai', 'Banyak senang', 'Beruntung', 'Harja'],
    ['Serba tak tercapai', 'Harja', 'Musuh Allah', 'Idem', 'Harja'],
    ['Idem', 'Harja', 'Banyak senang', 'Musuh Allah', 'Mendapat kesenangan'],
    ['Idem', 'Banyak senang', 'Sering tertimpa hal tak menyenangkan', 'Harja', 'Makmur'],
    ['Banyak senang', 'Harja', 'Pati', 'Harja', 'Musuh Allah'],
    ['Serba tak tercapai', 'Musuh Allah', 'Harja', 'Mendapat sahabat', 'Pati']
  ],
  III: [
    ['Harja', 'Musuh Allah', 'Rintangan besar', 'Pati', 'Harja'],
    ['Musuh Allah', 'Serba tak tercapai', 'Murka', 'Harja', 'Harja'],
    ['Serba tak tercapai', 'Harja', 'Susah', 'Harja', 'Harja'],
    ['Serba tak tercapai', 'Harja', 'Susah', 'Harja', 'Musuh Allah'],
    ['Musuh Allah', 'Serba tak tercapai', 'Sering tertimpa hal tak menyenangkan', 'Harja', 'Pati'],
    ['Kikir', 'Harja', 'Pati', 'Harja', 'Musuh Allah'],
    ['Serba tak tercapai', 'Musuh Allah', 'Harja', 'Sering dikerumuni orang', 'Musuh Allah']
  ]
};

export const AKAD_TIGA_JENIS = {
  sumber: S(34, [22, 23]),
  baris: BARIS_34,
  asumsi: '"Yang ke-n" dibaca urutan hari itu dalam bulan Jawa: tanggal 1-7 = ke-1, 8-14 = ke-2, 15-21 = ke-3, 22-28 = ke-4, 29-30 = ke-5 (sesuai contoh Jumat pada catatan kitab).',
  anjuran: 'Pilih hari yang jatuh pada Harja di ketiga jenis sekaligus (contoh kitab: Selasa ke-4).',
  arah: {
    baik: ['Harja', 'Banyak senang', 'Beruntung', 'Berbahagia', 'Senang', 'Minta dihormat', 'Mendapat sahabat',
      'Tercapai maksudnya', 'Mendapat kesenangan', 'Makmur'],
    buruk: ['Musuh Allah', 'Pati', 'Serba tak tercapai', 'Besar nasfunya', 'Berdosa besar', 'Aral melintang',
      'Sering tertimpa hal tak menyenangkan', 'Rintangan besar', 'Murka', 'Susah', 'Kikir'],
    netral: ['Sering dikerumuni orang']
  },
  cetak: CETAK_34,
  tabel: {
    I: resolusiIdem(CETAK_34.I),
    II: resolusiIdem(CETAK_34.II),
    III: resolusiIdem(CETAK_34.III)
  }
};
