/**
 * Perhitungan jodoh menurut kitab Betaljemur Adammakna, bab 15-17 (hlm. 12-14).
 * Seluruh tabel ditranskripsi langsung dari scan (bukan dari OCR) dan diperiksa jumlah barisnya.
 *
 * `arah` adalah klasifikasi kami (baik / buruk / netral) supaya hasil mudah diringkas; kitab sendiri
 * hanya memberi frasa pendek. Frasa `makna` ditulis ulang singkat. Ini tafsir tradisional, bukan fakta.
 */

// --- Bab 15 (hlm. 12-13): neptu (hari + pasaran) tiap calon dibagi 9; pasangkan kedua sisa ----------
// Kunci "a&b" dengan a <= b. Sisa 0 dibaca 9 (konvensi kami; contoh kitab tidak membahas sisa 0,
// tetapi tabel memuat pasangan 9 dan 9).
export const JODOH_SISA_9 = {
  sumber: { bab: 15, halaman: [12, 13], verifikasi: 'scan' },
  pembagi: 9,
  contohKitab: { suami: 'Jumat Kliwon (6+8=14, sisa 5)', istri: 'Jumat Paing (6+9=15, sisa 6)', hasil: '5&6' },
  tabel: {
    '1&1': { makna: 'Serasi dan saling mencintai', arah: 'baik' },
    '1&2': { makna: 'Baik', arah: 'baik' },
    '1&3': { makna: 'Kuat, tetapi rezekinya jauh', arah: 'netral' },
    '1&4': { makna: 'Banyak celaka', arah: 'buruk' },
    '1&5': { makna: 'Bercerai', arah: 'buruk' },
    '1&6': { makna: 'Kehidupan sulit', arah: 'buruk' },
    '1&7': { makna: 'Banyak musuh', arah: 'buruk' },
    '1&8': { makna: 'Sengsara', arah: 'buruk' },
    '1&9': { makna: 'Menjadi tempat berlindung', arah: 'baik' },
    '2&2': { makna: 'Selamat dan rezeki banyak', arah: 'baik' },
    '2&3': { makna: 'Salah satu wafat lebih dulu', arah: 'buruk' },
    '2&4': { makna: 'Banyak godaan', arah: 'buruk' },
    '2&5': { makna: 'Banyak celaka', arah: 'buruk' },
    '2&6': { makna: 'Cepat menjadi kaya', arah: 'baik' },
    '2&7': { makna: 'Anak-anaknya banyak yang meninggal', arah: 'buruk' },
    '2&8': { makna: 'Rezeki mudah', arah: 'baik' },
    '2&9': { makna: 'Rezeki banyak', arah: 'baik' },
    '3&3': { makna: 'Melarat', arah: 'buruk' },
    '3&4': { makna: 'Banyak celaka', arah: 'buruk' },
    '3&5': { makna: 'Cepat bercerai', arah: 'buruk' },
    '3&6': { makna: 'Mendapat anugerah', arah: 'baik' },
    '3&7': { makna: 'Banyak celaka', arah: 'buruk' },
    '3&8': { makna: 'Salah satu wafat lebih dulu', arah: 'buruk' },
    '3&9': { makna: 'Rezeki banyak', arah: 'baik' },
    '4&4': { makna: 'Sering sakit', arah: 'buruk' },
    '4&5': { makna: 'Banyak godaan', arah: 'buruk' },
    '4&6': { makna: 'Rezeki banyak', arah: 'baik' },
    '4&7': { makna: 'Melarat', arah: 'buruk' },
    '4&8': { makna: 'Banyak rintangan', arah: 'buruk' },
    '4&9': { makna: 'Salah satu pihak kalah', arah: 'buruk' },
    '5&5': { makna: 'Keberuntungan yang terus-menerus', arah: 'baik' },
    '5&6': { makna: 'Rezeki mudah', arah: 'baik' },
    '5&7': { makna: 'Mata pencaharian selalu ada', arah: 'baik' },
    '5&8': { makna: 'Banyak rintangan', arah: 'buruk' },
    '5&9': { makna: 'Rezeki mudah', arah: 'baik' },
    '6&6': { makna: 'Banyak celaka', arah: 'buruk' },
    '6&7': { makna: 'Rukun, damai, tenteram', arah: 'baik' },
    '6&8': { makna: 'Banyak musuh', arah: 'buruk' },
    '6&9': { makna: 'Sengsara', arah: 'buruk' },
    '7&7': { makna: 'Terhukum oleh istrinya', arah: 'buruk' },
    '7&8': { makna: 'Terhalang atau celaka karena diri sendiri', arah: 'buruk' },
    '7&9': { makna: 'Perjodohan yang kekal', arah: 'baik' },
    '8&8': { makna: 'Dicintai orang lain', arah: 'baik' },
    '8&9': { makna: 'Banyak celaka', arah: 'buruk' },
    '9&9': { makna: 'Sulit rezeki', arah: 'buruk' }
  }
};

// --- Bab 16 (hlm. 13): jumlah neptu kedua calon (masing-masing hari + pasaran) dibagi 4 -----------
// Sisa 0 dibaca 4 (sesuai urutan kitab: 1 Gonto, 2 Gembili, 3 Sri, 4 Punggel).
export const JODOH_SISA_4 = {
  sumber: { bab: 16, halaman: [13], verifikasi: 'scan' },
  pembagi: 4,
  contohKitab: { suami: 'Jumat Pon (6+7)', istri: 'Rabu Paing (7+9)', jumlah: 29, sisa: 1, hasil: 'Gonto' },
  tabel: {
    1: { nama: 'Gonto', makna: 'Jarang memiliki anak (kitab menilai kurang baik)', arah: 'buruk' },
    2: { nama: 'Gembili', makna: 'Banyak anak', arah: 'baik' },
    3: { nama: 'Sri', makna: 'Rezeki banyak', arah: 'baik' },
    4: { nama: 'Punggel', makna: 'Salah satu meninggal', arah: 'buruk' }
  }
};

// --- Bab 17 (hlm. 13-14): pasangan hari lahir kedua calon ----------------------------------------
// Kunci "A&B" mengikuti urutan Minggu, Senin, Selasa, Rabu, Kamis, Jumat, Sabtu (A lebih dulu).
// Yuwana = selamat meski difitnah orang. Berekat = selalu cukup meski penghasilan sedikit.
export const JODOH_HARI = {
  sumber: { bab: 17, halaman: [13, 14], verifikasi: 'scan' },
  urutanHari: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
  istilah: {
    Yuwana: 'Selamat, meskipun difitnah orang',
    Berekat: 'Selalu cukup, meskipun penghasilannya sedikit'
  },
  tabel: {
    'Minggu&Minggu': { makna: 'Sering sakit', arah: 'buruk' },
    'Minggu&Senin': { makna: 'Banyak penyakit', arah: 'buruk' },
    'Minggu&Selasa': { makna: 'Miskin', arah: 'buruk' },
    'Minggu&Rabu': { makna: 'Yuwana', arah: 'baik' },
    'Minggu&Kamis': { makna: 'Bertengkar', arah: 'buruk' },
    'Minggu&Jumat': { makna: 'Yuwana', arah: 'baik' },
    'Minggu&Sabtu': { makna: 'Miskin', arah: 'buruk' },
    'Senin&Senin': { makna: 'Tidak baik', arah: 'buruk' },
    'Senin&Selasa': { makna: 'Yuwana', arah: 'baik' },
    'Senin&Rabu': { makna: 'Anaknya perempuan', arah: 'netral' },
    'Senin&Kamis': { makna: 'Dicintai banyak orang', arah: 'baik' },
    'Senin&Jumat': { makna: 'Yuwana', arah: 'baik' },
    'Senin&Sabtu': { makna: 'Berekat', arah: 'baik' },
    'Selasa&Selasa': { makna: 'Tidak baik', arah: 'buruk' },
    'Selasa&Rabu': { makna: 'Kaya', arah: 'baik' },
    'Selasa&Kamis': { makna: 'Kaya', arah: 'baik' },
    'Selasa&Jumat': { makna: 'Bercerai', arah: 'buruk' },
    'Selasa&Sabtu': { makna: 'Sering bertengkar', arah: 'buruk' },
    'Rabu&Rabu': { makna: 'Tidak baik', arah: 'buruk' },
    'Rabu&Kamis': { makna: 'Yuwana', arah: 'baik' },
    'Rabu&Jumat': { makna: 'Yuwana', arah: 'baik' },
    'Rabu&Sabtu': { makna: 'Baik', arah: 'baik' },
    'Kamis&Kamis': { makna: 'Yuwana', arah: 'baik' },
    'Kamis&Jumat': { makna: 'Yuwana', arah: 'baik' },
    'Kamis&Sabtu': { makna: 'Bercerai', arah: 'buruk' },
    'Jumat&Jumat': { makna: 'Miskin', arah: 'buruk' },
    'Jumat&Sabtu': { makna: 'Celaka', arah: 'buruk' },
    'Sabtu&Sabtu': { makna: 'Tidak baik', arah: 'buruk' }
  }
};
