/**
 * Kesehatan dan penyakit menurut kitab Betaljemur Adammakna, bab 318-325 (hlm. 239-242).
 *
 * PENTING: ini kepercayaan tradisional, bukan informasi medis. Bagian ramuan dan obat (bab 319, 323, 324)
 * serta doa (bab 326) SENGAJA TIDAK dimasukkan: menyalin ramuan sebagai petunjuk pakai dapat menyesatkan
 * atau membahayakan. Yang dikodekan hanya aturan hitungan dan atribut tradisi, ditulis ulang dengan
 * kalimat sendiri. Aturan dan tabel diperiksa dengan scan.
 */

const S = (bab, halaman, verifikasi = 'scan') => ({ bab, halaman, verifikasi });

export const PERINGATAN_MEDIS = 'Ini kepercayaan tradisional, bukan nasihat medis. Bila sakit, periksakan ke tenaga kesehatan.';

// --- Bab 318: jumlah neptu hari + pasaran pada hari pertama sakit -> lima golongan sebab ----------------
// Kitab hanya menulis "dihitung: Sabda, Guna, Tirta, Wana, Lepas" tanpa menyebut pembagi. Kami membacanya
// sebagai hitungan berputar lima (jumlah 1 = Sabda ... 5 = Lepas, lalu mengulang), setara jumlah mod 5.
export const SEBAB_NEPTU_5 = {
  sumber: S(318, [239]),
  asumsi: 'Pembagi tidak tertulis di kitab; dibaca sebagai hitungan berputar lima (sama dengan jumlah mod 5, sisa 0 = Lepas).',
  1: { nama: 'Sabda', sebab: 'Sakit karena ucapannya sendiri', tulak: 'Selamatan bubur merah, putih, dan baro-baro, jajan pasar, serta nasi sayur' },
  2: { nama: 'Guna', sebab: 'Sakit yang dibuat orang lain (guna-guna)', tulak: 'Selamatan aneka bubur, termasuk bubur palang dan bubur pliringan' },
  3: { nama: 'Tirta', sebab: 'Sakit karena air atau angin', tulak: 'Selamatan bubur merah, baro-baro, dan hitam, dawet hitam, serta opak angin' },
  4: { nama: 'Wana', sebab: 'Sakit karena makhluk halus', tulak: 'Selamatan bubur merah, putih, dan baro-baro, serta tiwul dari dedak halus' },
  5: { nama: 'Lepas', sebab: 'Sakit karena kehendak Tuhan', tulak: 'Selamatan bubur dan nasi golong lulut agar tidak berujung kematian' }
};

// --- Bab 319 (bagian atribut saja): bagian tubuh rawan menurut hari lahir -----------------------------------
export const TUBUH_HARI_LAHIR = {
  sumber: S(319, [239, 240]),
  catatan: 'Bagian ramuan dalam bab ini tidak dimasukkan.',
  Minggu: { dewa: 'Hyang Endra', nabi: 'Adam', rawan: ['Sesak napas', 'Kepala'] },
  Senin: { dewa: 'Hyang Guru', nabi: 'Ibrahim', rawan: ['Pusar', 'Tulang'] },
  Selasa: { dewa: 'Hyang Lodra', nabi: 'Daud', rawan: ['Leher dan kaki', 'Dugal'] },
  Rabu: { dewa: 'Hyang Mahadewa', nabi: 'Musa', rawan: ['Dasar', 'Perut'] },
  Kamis: { dewa: 'Hyang Wisnu', nabi: 'Sis', rawan: ['Tangan', 'Duduk (bengkak)'] },
  Jumat: { dewa: 'Hyang Mahadewa', nabi: 'Muhammad', rawan: ['Pusing', 'Hati'] },
  Sabtu: { dewa: 'Hyang Uma', nabi: 'Isa', rawan: ['Marlesu', 'Lambung'] }
};

// --- Bab 320: arah mencari obat menurut hari (Sunan Giri) -------------------------------------------------------
// Pilih arah yang jatuh pada "waras". Hari Sabtu memiliki dua arah waras.
export const ARAH_BEROBAT = {
  sumber: S(320, [240]),
  anjuran: 'Bila pergi mencari pengobatan, pilih arah yang jatuh pada waras.',
  Minggu: { Timur: 'Waras', Selatan: 'Sunya', Barat: 'Lara', Utara: 'Pati' },
  Senin: { Timur: 'Sunya', Selatan: 'Pati', Barat: 'Lara', Utara: 'Waras' },
  Selasa: { Timur: 'Waras', Selatan: 'Lara', Barat: 'Sunya', Utara: 'Pati' },
  Rabu: { Timur: 'Pati', Selatan: 'Sunya', Barat: 'Lara', Utara: 'Waras' },
  Kamis: { Timur: 'Waras', Selatan: 'Sunya', Barat: 'Pati', Utara: 'Lara' },
  Jumat: { Timur: 'Pati', Selatan: 'Lara', Barat: 'Sunya', Utara: 'Waras' },
  Sabtu: { Timur: 'Waras', Selatan: 'Waras', Barat: 'Pati', Utara: 'Lara' }
};

// --- Bab 321: letak sakit menurut hari pertama sakit (Sunan Kalijaga) ---------------------------------------------
export const LETAK_SAKIT_HARI = {
  sumber: S(321, [241]),
  Minggu: 'Telapak kaki', Senin: 'Betis', Selasa: 'Paha', Rabu: 'Pusar atau perut', Kamis: 'Dada', Jumat: 'Leher', Sabtu: 'Muka'
};

// --- Bab 322: awal sakit menurut hari pertama sakit -----------------------------------------------------------------
export const AWAL_SAKIT_HARI = {
  sumber: S(322, [241]),
  keterangan: 'Sebab menurut kepercayaan tradisional.',
  Minggu: { sebab: 'Gangguan makhluk halus (setan); sembuhnya lama', tulak: 'Sedekah kupat' },
  Senin: { sebab: 'Ada nazar yang belum ditepati', tulak: 'Sedekah ayam yang setengah dewasa' },
  Selasa: { sebab: 'Difitnah orang; sembuhnya lama', tulak: 'Tumpeng urubing damar' },
  Rabu: { sebab: 'Gangguan makhluk halus', tulak: 'Sesaji nasi pulen' },
  Kamis: { sebab: 'Kualat dari orang tua', tulak: 'Bersuci dan bersedekah' },
  Jumat: { sebab: 'Gangguan makhluk halus penjaga tempat', tulak: 'Sesaji di kolong-kolong' },
  Sabtu: { sebab: 'Gangguan makhluk halus hutan', tulak: 'Sesaji dan memohon perlindungan Tuhan' }
};

// --- Bab 323 (bagian atribut saja): sakit menurut pasaran lahir --------------------------------------------------------
export const SAKIT_PASARAN_LAHIR = {
  sumber: S(323, [241]),
  catatan: 'Bagian ramuan boreh dalam bab ini tidak dimasukkan.',
  Legi: 'Demam (panas tis)',
  Pahing: 'Muntaber',
  Pon: 'Krekes-krekes',
  Wage: 'Sakit perut',
  Kliwon: 'Ngrayung'
};

// --- Bab 325: jumlah neptu hari + pasaran pada permulaan sakit (7 sampai 18) -----------------------------------------
// Kunci = jumlah bila 7-12; jumlah 13-18 dipetakan ke 7-12 (kitab menulis "7 atau 13", "8 atau 14", ...).
export const SUMBER_SAKIT_NEPTU = {
  sumber: S(325, [242]),
  7: { sumber: 'Tempat tidur', selamatan: 'Cengkaruk', penyembuh: 'Perempuan', catatan: 'Ganjaran dari Tuhan' },
  8: { sumber: 'Air', selamatan: 'Bubur malut', penyembuh: 'Perempuan atau tuan rumah', catatan: null },
  9: { sumber: 'Tempat sampah', selamatan: 'Beras merah', penyembuh: 'Kaum (kerabat)', catatan: null },
  10: { sumber: 'Kuburan', selamatan: 'Sesaji untuk leluhur', penyembuh: 'Tamu', catatan: null },
  11: { sumber: 'Jalan', selamatan: 'Sesaji dibuang di perempatan jalan', penyembuh: 'Tamu', catatan: 'Ganjaran dari Tuhan' },
  12: { sumber: 'Pohon', selamatan: 'Air tawar dalam selamatan', penyembuh: 'Perempuan', catatan: 'Ganjaran dari Tuhan' }
};
