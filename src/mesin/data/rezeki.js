/**
 * Rezeki dan mata pencaharian menurut kitab Betaljemur Adammakna, bab 91-92 dan 159-161 (hlm. 54-55, 128-130).
 *
 * Tabel dibandingkan baris demi baris dengan scan. Semua hanya memakai hari dan pasaran (weton), sehingga
 * tidak bergantung pada kalender Jawa. Makna ditulis ulang singkat dengan kalimat sendiri.
 * Kunci weton memakai nama mesin kalender (Minggu, Jumat, Pahing).
 */

const S = (bab, halaman, verifikasi = 'scan') => ({ bab, halaman, verifikasi });

// --- Bab 91: mata pencaharian menurut hari lahir ----------------------------------------------------
export const MATA_PENCAHARIAN_HARI = {
  sumber: S(91, [54]),
  Minggu: 'Bercocok tanam dan pertukangan',
  Senin: 'Bekerja pada pemerintahan',
  Selasa: 'Menjadi prajurit atau pelaut',
  Rabu: 'Bekerja di bidang pengadilan atau seni suara',
  Kamis: 'Menjadi pujangga dan bertani',
  Jumat: 'Berdagang dan bertani',
  Sabtu: 'Menjadi pujangga dan bertani'
};

// --- Bab 92: "wiji" ----------------------------------------------------------------------------------------
// Jumlahkan neptu (hari + pasaran) dari weton lahir dan dua weton dengan hari yang sama pada pekan berikutnya
// (tujuh hari dan empat belas hari sesudahnya), bagi 5. Sisa 0 = wiji tengah (tertulis di kitab: "tidak bersisa").
export const WIJI = {
  sumber: S(92, [54, 55, 56], 'scan (hlm. 54-55); hlm. 56 ocr-konsisten'),
  contohKitab: [
    { lahir: 'Jumat Pon', jumlah: 42, sisa: 2, wiji: 'Selatan' },
    { lahir: 'Minggu Legi', jumlah: 35, sisa: 0, wiji: 'Tengah' }
  ],
  1: { arah: 'Timur', sebutan: 'Wijining kaprayayen', dewa: 'Batara Endra', kota: 'Emas', burung: 'Atat kembang', kayu: 'Nagapuspa',
    pekerjaan: 'Menjadi pekerja atau abdi (misalnya pegawai pemerintah); rezeki datang dari pengabdian.' },
  2: { arah: 'Selatan', sebutan: 'Wijining saudagar', dewa: 'Batara Brama', kota: 'Tembaga', burung: 'Rang-urangan', kayu: 'Ingas',
    pekerjaan: 'Berdagang; rezeki datang dari mencari untung.' },
  3: { arah: 'Barat', sebutan: 'Wijining kapanditan', dewa: 'Batara Mahadewa', kota: 'Perak', burung: 'Kuntul', kayu: null,
    pekerjaan: 'Menjadi guru atau pendeta; rezeki datang dari tutur kata.' },
  4: { arah: 'Utara', sebutan: 'Wijining patanen', dewa: 'Batara Wisnumurti', kota: 'Besi', burung: 'Gagak', kayu: 'Asam',
    pekerjaan: 'Bercocok tanam; rezeki datang dari tanah dan tanamannya.' },
  5: { arah: 'Tengah', sebutan: 'Wijining paugeran', dewa: 'Hyang Guru', kota: 'Emas suwasa', burung: 'Burung dewata', kayu: 'Gurda kemantyan',
    pekerjaan: 'Pekerjaan apa pun mendatangkan kebahagiaan.' }
};

// --- Bab 159: perhitungan mencari nafkah (35 weton) ---------------------------------------------------------
// Kitab hanya menegaskan satu anjuran: untuk berdagang pilih hari yang jatuh pada "Sri".
export const NAFKAH = {
  sumber: S(159, [128]),
  anjuran: 'Untuk berdagang, pilih hari dan pasaran yang jatuh pada Sri.',
  hariSri: ['Minggu Pon', 'Senin Kliwon', 'Selasa Pahing', 'Rabu Wage', 'Kamis Pahing', 'Jumat Wage', 'Sabtu Legi'],
  // urut pasaran: Legi, Pahing, Pon, Wage, Kliwon
  pasaran: ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'],
  tabel: {
    Minggu: ['Suwung', 'Pacak', 'Sri', 'Carik jalan', 'Gigis'],
    Senin: ['Carik jalan', 'Gigis', 'Suwung', 'Pacak', 'Sri'],
    Selasa: ['Pacak', 'Sri', 'Carik jalan', 'Gigis', 'Suwung'],
    Rabu: ['Gigis', 'Suwung', 'Pacak', 'Sri', 'Carik jalan'],
    Kamis: ['Pacak', 'Sri', 'Carik jalan', 'Gigis', 'Suwung'],
    Jumat: ['Gigis', 'Suwung', 'Pacak', 'Sri', 'Carik jalan'],
    Sabtu: ['Sri', 'Carik jalan', 'Gigis', 'Suwung', 'Pacak']
  }
};

// --- Bab 160: Sri, Sadana, Siksa, Lara, Pati (arah per weton) ------------------------------------------------
// Untuk berdagang, orang sakit yang mencari obat (tetirah), dan berperang. Berdagang atau tetirah: menuju
// arah Sri atau Sadana. Berperang: arah Siksa. Lara dan Pati adalah arah yang dihindari.
export const SRI_SADANA = {
  sumber: S(160, [128, 129]),
  anjuran: 'Berdagang atau tetirah (mencari obat): menuju arah Sri atau Sadana. Berperang: arah Siksa. Hindari arah Lara dan Pati.',
  tabel: {
    "Minggu Legi": {
      "sri": "Selatan",
      "sadana": "Barat",
      "siksa": "Barat",
      "lara": "Utara",
      "pati": "Timur"
    },
    "Minggu Pahing": {
      "sri": "Barat",
      "sadana": "Timur",
      "siksa": "Barat",
      "lara": "Selatan",
      "pati": "Utara"
    },
    "Minggu Pon": {
      "sri": "Barat",
      "sadana": "Timur",
      "siksa": "Barat",
      "lara": "Selatan",
      "pati": "Utara"
    },
    "Minggu Wage": {
      "sri": "Barat",
      "sadana": "Timur",
      "siksa": "Timur",
      "lara": "Selatan",
      "pati": "Utara"
    },
    "Minggu Kliwon": {
      "sri": "Timur",
      "sadana": "Barat",
      "siksa": "Timur",
      "lara": "Selatan",
      "pati": "Utara"
    },
    "Senin Legi": {
      "sri": "Utara",
      "sadana": "Selatan",
      "siksa": "Timur",
      "lara": "Timur",
      "pati": "Barat"
    },
    "Senin Pahing": {
      "sri": "Barat",
      "sadana": "Selatan",
      "siksa": "Timur",
      "lara": "Timur",
      "pati": "Utara"
    },
    "Senin Pon": {
      "sri": "Utara",
      "sadana": "Selatan",
      "siksa": "Selatan",
      "lara": "Timur",
      "pati": "Barat"
    },
    "Senin Wage": {
      "sri": "Selatan",
      "sadana": "Selatan",
      "siksa": "Utara",
      "lara": "Timur",
      "pati": "Barat"
    },
    "Senin Kliwon": {
      "sri": "Timur",
      "sadana": "Selatan",
      "siksa": "Utara",
      "lara": "Barat",
      "pati": "Timur"
    },
    "Selasa Legi": {
      "sri": "Barat",
      "sadana": "Utara",
      "siksa": "Utara",
      "lara": "Timur",
      "pati": "Selatan"
    },
    "Selasa Pahing": {
      "sri": "Barat",
      "sadana": "Selatan",
      "siksa": "Utara",
      "lara": "Timur",
      "pati": "Utara"
    },
    "Selasa Pon": {
      "sri": "Barat",
      "sadana": "Selatan",
      "siksa": "Barat",
      "lara": "Utara",
      "pati": "Timur"
    },
    "Selasa Wage": {
      "sri": "Timur",
      "sadana": "Selatan",
      "siksa": "Barat",
      "lara": "Utara",
      "pati": "Barat"
    },
    "Selasa Kliwon": {
      "sri": "Timur",
      "sadana": "Selatan",
      "siksa": "Barat",
      "lara": "Barat",
      "pati": "Barat"
    },
    "Rabu Legi": {
      "sri": "Utara",
      "sadana": "Selatan",
      "siksa": "Utara",
      "lara": "Timur",
      "pati": "Barat"
    },
    "Rabu Pahing": {
      "sri": "Barat",
      "sadana": "Timur",
      "siksa": "Utara",
      "lara": "Selatan",
      "pati": "Utara"
    },
    "Rabu Pon": {
      "sri": "Utara",
      "sadana": "Selatan",
      "siksa": "Barat",
      "lara": "Timur",
      "pati": "Barat"
    },
    "Rabu Wage": {
      "sri": "Selatan",
      "sadana": "Utara",
      "siksa": "Selatan",
      "lara": "Timur",
      "pati": "Barat"
    },
    "Rabu Kliwon": {
      "sri": "Timur",
      "sadana": "Utara",
      "siksa": "Utara",
      "lara": "Selatan",
      "pati": "Barat"
    },
    "Kamis Legi": {
      "sri": "Utara",
      "sadana": "Timur",
      "siksa": "Barat",
      "lara": "Selatan",
      "pati": "Barat"
    },
    "Kamis Pahing": {
      "sri": "Timur",
      "sadana": "Barat",
      "siksa": "Utara",
      "lara": "Selatan",
      "pati": "Utara"
    },
    "Kamis Pon": {
      "sri": "Barat",
      "sadana": "Timur",
      "siksa": "Selatan",
      "lara": "Selatan",
      "pati": "Utara"
    },
    "Kamis Wage": {
      "sri": "Barat",
      "sadana": "Timur",
      "siksa": "Selatan",
      "lara": "Selatan",
      "pati": "Utara"
    },
    "Kamis Kliwon": {
      "sri": "Timur",
      "sadana": "Barat",
      "siksa": "Utara",
      "lara": "Selatan",
      "pati": "Utara"
    },
    "Jumat Legi": {
      "sri": "Utara",
      "sadana": "Barat",
      "siksa": "Selatan",
      "lara": "Selatan",
      "pati": "Timur"
    },
    "Jumat Pahing": {
      "sri": "Timur",
      "sadana": "Barat",
      "siksa": "Timur",
      "lara": "Selatan",
      "pati": "Utara"
    },
    "Jumat Pon": {
      "sri": "Barat",
      "sadana": "Timur",
      "siksa": "Timur",
      "lara": "Selatan",
      "pati": "Utara"
    },
    "Jumat Wage": {
      "sri": "Selatan",
      "sadana": "Barat",
      "siksa": "Barat",
      "lara": "Utara",
      "pati": "Timur"
    },
    "Jumat Kliwon": {
      "sri": "Timur",
      "sadana": "Barat",
      "siksa": "Selatan",
      "lara": "Selatan",
      "pati": "Utara"
    },
    "Sabtu Legi": {
      "sri": "Timur",
      "sadana": "Selatan",
      "siksa": "Timur",
      "lara": "Utara",
      "pati": "Barat"
    },
    "Sabtu Pahing": {
      "sri": "Utara",
      "sadana": "Selatan",
      "siksa": "Utara",
      "lara": "Timur",
      "pati": "Barat"
    },
    "Sabtu Pon": {
      "sri": "Barat",
      "sadana": "Selatan",
      "siksa": "Timur",
      "lara": "Timur",
      "pati": "Utara"
    },
    "Sabtu Wage": {
      "sri": "Selatan",
      "sadana": "Utara",
      "siksa": "Timur",
      "lara": "Timur",
      "pati": "Barat"
    },
    "Sabtu Kliwon": {
      "sri": "Barat",
      "sadana": "Selatan",
      "siksa": "Timur",
      "lara": "Timur",
      "pati": "Utara"
    }
  }
};

// --- Bab 161: arah agar keperluan berhasil (dua arah per weton) ----------------------------------------------
// Enam weton hanya memuat satu arah: arah kedua memang tidak tercetak di kitab (ditandai di scan "atau ke").
export const ARAH_BERHASIL = {
  sumber: S(161, [130]),
  tidakTercetak: ['Rabu Legi', 'Senin Legi', 'Rabu Pon', 'Senin Pahing', 'Selasa Pon', 'Rabu Wage'],
  tabel: {
    "Sabtu Pahing": [
      "Selatan",
      "Utara"
    ],
    "Minggu Pon": [
      "Selatan",
      "Barat"
    ],
    "Senin Wage": [
      "Utara",
      "Timur"
    ],
    "Selasa Kliwon": [
      "Barat",
      "Utara"
    ],
    "Rabu Legi": [
      "Timur"
    ],
    "Kamis Pahing": [
      "Utara",
      "Barat"
    ],
    "Jumat Pon": [
      "Timur",
      "Barat"
    ],
    "Sabtu Wage": [
      "Utara",
      "Selatan"
    ],
    "Minggu Kliwon": [
      "Utara",
      "Timur"
    ],
    "Senin Legi": [
      "Selatan"
    ],
    "Selasa Pahing": [
      "Timur",
      "Selatan"
    ],
    "Rabu Pon": [
      "Utara"
    ],
    "Kamis Wage": [
      "Barat",
      "Utara"
    ],
    "Jumat Kliwon": [
      "Utara",
      "Barat"
    ],
    "Sabtu Legi": [
      "Selatan",
      "Barat"
    ],
    "Minggu Pahing": [
      "Utara",
      "Timur"
    ],
    "Senin Pon": [
      "Utara",
      "Barat"
    ],
    "Selasa Wage": [
      "Tenggara",
      "Utara"
    ],
    "Rabu Kliwon": [
      "Utara",
      "Timur"
    ],
    "Kamis Legi": [
      "Utara",
      "Timur"
    ],
    "Jumat Pahing": [
      "Barat",
      "Timur"
    ],
    "Sabtu Pon": [
      "Selatan",
      "Barat"
    ],
    "Minggu Wage": [
      "Barat",
      "Utara"
    ],
    "Senin Kliwon": [
      "Utara",
      "Barat"
    ],
    "Selasa Legi": [
      "Timur",
      "Barat"
    ],
    "Rabu Pahing": [
      "Selatan",
      "Timur"
    ],
    "Kamis Pon": [
      "Utara",
      "Timur"
    ],
    "Jumat Wage": [
      "Utara",
      "Timur"
    ],
    "Sabtu Kliwon": [
      "Utara",
      "Timur"
    ],
    "Minggu Legi": [
      "Timur",
      "Barat"
    ],
    "Senin Pahing": [
      "Selatan"
    ],
    "Selasa Pon": [
      "Barat"
    ],
    "Rabu Wage": [
      "Timur"
    ],
    "Kamis Kliwon": [
      "Timur",
      "Barat"
    ],
    "Jumat Legi": [
      "Selatan",
      "Barat"
    ]
  }
};
