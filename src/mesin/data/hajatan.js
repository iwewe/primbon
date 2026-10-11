/**
 * Hajatan menurut kitab Betaljemur Adammakna, bagian yang berupa hitungan: bab 39-42 (hari dan saat tarub),
 * 55-56 (kehamilan dan tingkeb), 57 (jam kelahiran), 65 (nama bayi), 68-74 (jadwal selamatan menurut usia).
 * Hlm. 26-27, 35-38, 42, 44-46. Tabel dari scan.
 *
 * Tidak dimasukkan (ritual, bukan hitungan): sajen, hidangan, busana, tata cara, penolak godaan, doa dan
 * mantra, dan jumlah benda persembahan (bab 38, 43-54, 55 [materi], 56 [tata cara], 58-64, 66-67, 71-74
 * [tata cara], serta bab 62). Bab 71-74 hanya dipakai untuk rentang usianya.
 */

const S = (bab, halaman, verifikasi = 'scan') => ({ bab, halaman, verifikasi });

// --- Bab 39: hari tarub menurut jumlah neptu hari + pasaran ---------------------------------------------------------------
export const TARUB_NEPTU = {
  sumber: S(39, [26]),
  contohKitab: { weton: 'Jumat Pon', jumlah: 13, arah: 'baik' },
  tabel: {
    7: { nama: 'Aman tenteram', arah: 'baik' }, 13: { nama: 'Aman tenteram', arah: 'baik' },
    8: { nama: 'Siluman pria', arah: 'buruk' }, 14: { nama: 'Siluman pria', arah: 'buruk' },
    9: { nama: 'Dodok atung', arah: 'buruk' }, 15: { nama: 'Dodok atung', arah: 'buruk' },
    10: { nama: 'Temen dan luhur', arah: 'baik' }, 16: { nama: 'Temen dan luhur', arah: 'baik' },
    11: { nama: 'Siluman wanita', arah: 'buruk' }, 17: { nama: 'Siluman wanita', arah: 'buruk' },
    12: { nama: 'Bencana', arah: 'buruk' }, 18: { nama: 'Bencana', arah: 'buruk' }
  }
};

// --- Bab 40: menurut tanggal Jawa, kelompok (tanggal - 1) mod 5 --------------------------------------------------------------
export const TARUB_TANGGAL_5 = {
  sumber: S(40, [26]),
  tanggalBaik: [4, 9, 14, 19, 24, 29],
  tabel: [
    { tanggal: [1, 6, 11, 16, 21, 26], nama: 'Milik raja', makna: 'Sering diganggu makhluk halus; cita-cita tidak tercapai', arah: 'buruk' },
    { tanggal: [2, 7, 12, 17, 22, 27], nama: 'Siluman pria', makna: 'Selalu miskin, sering kehilangan', arah: 'buruk' },
    { tanggal: [3, 8, 13, 18, 23, 28], nama: 'Siluman wanita', makna: 'Selalu miskin, sering kehilangan', arah: 'buruk' },
    { tanggal: [4, 9, 14, 19, 24, 29], nama: 'Selamat', makna: 'Selamat dan banyak rezeki', arah: 'baik' },
    { tanggal: [5, 10, 15, 20, 25, 30], nama: 'Naas keduanya', makna: 'Naas bagi kedua mempelai', arah: 'buruk' }
  ]
};

// --- Bab 41: menurut tanggal Jawa, kelompok (tanggal - 1) mod 7 ---------------------------------------------------------------
export const TARUB_TANGGAL_7 = {
  sumber: S(41, [27]),
  catatanCetak: 'Catatan kitab menunjuk "no 36, 37, 38"; yang dimaksud bab 39, 40, 41 (tiga cara memilih hari tarub; pilih salah satu).',
  tabel: [
    { tanggal: [1, 8, 15, 22, 29], nama: 'Milik raja', arah: 'buruk' },
    { tanggal: [2, 9, 16, 23, 30], nama: 'Siluman pria', arah: 'buruk' },
    { tanggal: [3, 10, 17, 24], nama: 'Siluman wanita', arah: 'buruk' },
    { tanggal: [4, 11, 18, 25], nama: 'Rahayu, senang', arah: 'baik' },
    { tanggal: [5, 12, 19, 26], nama: 'Rahayu, tenteram', arah: 'baik' },
    { tanggal: [6, 13, 20, 27], nama: 'Naasnya pria', arah: 'buruk' },
    { tanggal: [7, 14, 21, 28], nama: 'Naasnya wanita', arah: 'buruk' }
  ]
};

// --- Bab 56: hari tingkeb (selamatan tujuh bulan kehamilan) ---------------------------------------------------------------------
export const TINGKEB = {
  sumber: S(56, [37]),
  hari: ['Rabu', 'Sabtu'],
  tanggalJawa: [1, 3, 5, 7, 9, 11, 13], // tanggal ganjil sebelum tanggal 15
  asumsi: 'Kitab: "hari Rabu atau Sabtu, tanggal yang ganjil sebelum tanggal 15" (tanggal Jawa).'
};

// --- Bab 55: bulan kehamilan yang diselamati; bulan ganjil = "mendeking" --------------------------------------------------------
export const KEHAMILAN = {
  sumber: S(55, [35, 36, 37]),
  asumsi: 'Kitab menyebut "usia kehamilan mencapai N bulan" tanpa menyebut cara menghitung bulan; kami memakai bulan kalender Masehi dari tanggal acuan (mis. awal kehamilan).',
  bulan: [
    { bulan: 1, ringkas: 'selamatan bulan pertama' },
    { bulan: 2, ringkas: 'selamatan' }, { bulan: 3, ringkas: 'selamatan (sama dengan bulan ke-2)' },
    { bulan: 4, ringkas: 'selamatan' }, { bulan: 5, ringkas: 'selamatan (disebut takir pontang)' },
    { bulan: 6, ringkas: 'selamatan' }, { bulan: 7, ringkas: 'tingkeb (lihat bab 56)' },
    { bulan: 8, ringkas: 'selamatan' }, { bulan: 9, ringkas: 'selamatan; bila menjelang bulan ke-10 belum ada tanda lahir, ada selamatan tambahan' }
  ],
  mendeking: [3, 5, 7, 9],
  catatanBab128: 'Bab 128 (hlm. 111) mendefinisikan hamil mendeking sebagai kehamilan "ke-3, ke-5" (hitungan ganjil, dibanding kehamilan genap yang lebih mudah); tidak jelas apakah yang dihitung urutan kehamilan atau bulan seperti bab 55. Kedua bacaan disebut, tidak dipilih.',
  makna: 'Kehamilan pada bulan ganjil (3, 5, 7, 9) disebut mendeking dan dianggap lebih sulit; ini tafsir tradisional, bukan panduan kehamilan.'
};

// --- Bab 57: jam bayi lahir (siang dan malam), jam 12-an -----------------------------------------------------------------------------
export const BAYI_LAHIR_JAM = {
  sumber: S(57, [38]),
  asumsi: 'Angka jam 12-an berlaku siang dan malam (kitab: "waktu siang/malam"). "Pukul h" dibaca jam h.00-h.59.',
  catatanBanding: 'Tabel sama dengan bab 173 (rumah.js JAM_MULAI) kecuali Rabu (kitab ini 12, bab 173: 11) dan Sabtu (kitab ini 11, bab 173: 12) pada angka ketiga.',
  tabel: {
    Minggu: [6, 7, 11, 1, 5],
    Senin: [8, 10, 1, 3, 5],
    Selasa: [7, 10, 12, 2, 5],
    Rabu: [7, 9, 12, 2, 4],
    Kamis: [8, 11, 1, 3, 4],
    Jumat: [8, 10, 12, 3, 4],
    Sabtu: [7, 9, 11, 2, 4]
  }
};

// --- Bab 65: nama bayi --------------------------------------------------------------------------------------------------------------
export const NAMA_BAYI = {
  sumber: S(65, [42]),
  asumsi: 'Kitab hanya menyebut hitungan yang cocok (tanpa sisa) sebagai baik; sisa lain tidak ditafsirkan. Neptu huruf memakai urutan 1-20 (hanacaraka). Sandhangan (cecak, layar, wignyan di akhir suku kata) tidak dihitung sebagai huruf.',
  contohKitab: { lahir: 'Kamis Pon', neptuWeton: 15, nama: 'Sukirna', huruf: ['sa', 'ka', 'na'], neptuHuruf: 15, jumlah: 30, sisa: 0 }
};

// --- Bab 68-74: jadwal selamatan bayi dan anak menurut usia ------------------------------------------------------------------------------
export const JADWAL_BAYI = {
  sumber: S(68, [44, 45, 46]),
  asumsi: 'Hari dihitung dari hari lahir (hari lahir = hari ke-0). Usia dalam bulan dan tahun memakai kalender Masehi (kitab tidak menyebut kalender).',
  hari: [
    { nama: 'Selamatan sepasar (sepekan)', hari: 5, bab: 68, halaman: [44] },
    { nama: 'Selapan (1 lapan, 35 hari): selamatan dan cukur rambut', hari: 35, bab: 69, halaman: [44, 45] },
    { nama: 'Selamatan 2 lapan', hari: 70, bab: 69, halaman: [45] },
    { nama: 'Selamatan 3 lapan', hari: 105, bab: 69, halaman: [45] },
    { nama: 'Selamatan 4 lapan', hari: 140, bab: 69, halaman: [45] },
    { nama: 'Selamatan 5 lapan', hari: 175, bab: 69, halaman: [45] },
    { nama: 'Selamatan 6 lapan', hari: 210, bab: 69, halaman: [45] },
    { nama: 'Tedak siten (7 lapan, 245 hari)', hari: 245, bab: 70, halaman: [45] }
  ],
  rentang: [
    { nama: 'Menyapih', dari: { bulan: 18 }, sampai: { bulan: 24 }, bab: 71, halaman: [45] },
    { nama: 'Tetesan (khusus anak perempuan)', dari: { tahun: 8 }, sampai: { tahun: 10 }, bab: 72, halaman: [45, 46] },
    { nama: 'Supitan (khusus anak laki-laki)', dari: { tahun: 13 }, sampai: { tahun: 15 }, bab: 74, halaman: [46, 47] }
  ]
};
