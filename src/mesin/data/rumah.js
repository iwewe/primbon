/**
 * Hari baik dan aturan untuk rumah dan bangunan menurut kitab Betaljemur Adammakna, bab 168 dan 172-198
 * (hlm. 135-151).
 *
 * Tabel diperiksa dengan scan, termasuk diagram pintu halaman (bab 194-196) dan letak sumur (bab 198)
 * yang tidak terbaca oleh OCR. Makna ditulis ulang singkat dengan kalimat sendiri. `arah` (baik/buruk/netral)
 * adalah klasifikasi kami; kitab hanya memberi frasa pendek.
 *
 * Doa, mantra, tumbal, dan tolak bala (bab 169-171, 182-184, 186, serta "penolak" di bab 168) tidak
 * dimasukkan: itu praktik ritual, bukan data hitungan.
 */

const S = (bab, halaman, verifikasi = 'scan') => ({ bab, halaman, verifikasi });

// --- Bab 172: arah rumah menurut jumlah neptu hari + pasaran lahir pemilik ---------------------------------
export const ARAH_RUMAH = {
  sumber: S(172, [138]),
  contohKitab: { lahir: 'Sabtu Pahing', jumlah: 18, arah: ['Utara', 'Timur'] },
  tabel: {
    7: ['Utara', 'Timur'], 8: ['Utara', 'Timur'], 9: ['Selatan', 'Timur'], 10: ['Selatan', 'Barat'],
    11: ['Barat'], 12: ['Utara', 'Barat'], 13: ['Utara', 'Timur'], 14: ['Selatan', 'Timur'],
    15: ['Barat'], 16: ['Barat'], 17: ['Utara', 'Barat'], 18: ['Utara', 'Timur']
  }
};

// --- Bab 173: jam memulai pekerjaan agar cepat selesai dan baik ----------------------------------------------
// Angka seperti tertulis di kitab (jam 12-an): 6-11 pagi, 12 siang, 1-5 sore. Padanan 24 jam: 1-5 = 13-17.
export const JAM_MULAI = {
  sumber: S(173, [138]),
  asumsi: 'Jam 1 sampai 5 dibaca sebagai 13.00 sampai 17.00 (jam kerja); kitab menulisnya sebagai angka 1-5.',
  Minggu: [6, 7, 11, 1, 5],
  Senin: [8, 10, 1, 3, 5],
  Selasa: [7, 10, 12, 2, 5],
  Rabu: [7, 9, 11, 2, 4],
  Kamis: [8, 11, 1, 3, 4],
  Jumat: [8, 10, 12, 3, 4],
  Sabtu: [7, 9, 12, 2, 4]
};

// --- Bab 181 dan 190: hari yang baik untuk membangun bagian tertentu --------------------------------------------
export const HARI_BAGIAN = {
  sumber: S(181, [142]),
  Minggu: 'Membuat atau memindahkan rumah dan memasang atap',
  Senin: 'Dapur',
  Selasa: 'Lesung',
  Rabu: 'Kandang',
  Kamis: 'Pendapa',
  Jumat: 'Langgar',
  Sabtu: 'Pringgitan'
};

export const HARI_PINTU = {
  sumber: S(190, [145]),
  Jumat: 'Pintu rumah',
  Sabtu: 'Pintu samping (belakang)',
  Rabu: 'Pintu gandok (rumah samping)',
  Kamis: 'Regol (pintu gerbang)'
};

// --- Bab 174: tiga kegiatan menurut bulan Jawa -----------------------------------------------------------------------
// mendirikan = mendirikan rumah, genteng = memasang atap, pindah = pindah rumah. null = tidak disebut kitab.
const k = (makna, arah) => ({ makna, arah });
export const BULAN_RUMAH = {
  sumber: S(174, [138, 139]),
  Sura: { mendirikan: k('Susah, ada kebakaran, cepat pindah', 'buruk'), genteng: k('Selalu ada huru-hara', 'buruk'), pindah: k('Tidur tidak nyenyak dan celaka', 'buruk') },
  Sapar: { mendirikan: k('Banyak teman, tetapi ada kerusakan', 'netral'), genteng: k('Banyak orang berbakti', 'baik'), pindah: k('Banyak orang takut', 'netral') },
  Mulud: { mendirikan: k('Selamat dan tulus', 'baik'), genteng: k('Selamat dan banyak yang mengasihi', 'baik'), pindah: null },
  Bakdamulud: { mendirikan: k('Sakit-sakitan dan keduanya cepat meninggal', 'buruk'), genteng: k('Cepat ada yang meninggal', 'buruk'), pindah: k('Banyak halangan dan kerusakan; keduanya meninggal', 'buruk') },
  Jumadilawal: { mendirikan: k('Banyak usaha orang lain (kitab tidak menjelaskan lebih jauh)', 'netral'), genteng: k('Banyak yang mengabdi, tetapi sering mendapat malu', 'netral'), pindah: k('Sakit-sakitan', 'buruk') },
  Jumadilakir: { mendirikan: k('Sering didatangi saudara dan senang, tetapi tidak lama dan sering sakit', 'netral'), genteng: k('Sakit-sakitan', 'buruk'), pindah: k('Kelak tertimpa keburukan dan penyakit', 'buruk') },
  Rejeb: { mendirikan: k('Kurang baik tetapi tulus; cocok memelihara hewan berkaki empat', 'netral'), genteng: k('Segala sesuatu selalu salah', 'buruk'), pindah: k('Mendapat kekayaan', 'baik') },
  Ruwah: { mendirikan: k('Ditakuti sesama, tetapi miskin', 'netral'), genteng: k('Dikasihi banyak orang dan selamat, tetapi miskin', 'netral'), pindah: k('Dikasihi sesama', 'baik') },
  Pasa: { mendirikan: k('Kaya harta', 'baik'), genteng: k('Lebih baik lagi', 'baik'), pindah: k('Sering mendapat harta', 'baik') },
  Sawal: { mendirikan: k('Sering pindah jauh dan berkelahi', 'buruk'), genteng: k('Banyak yang mengganggu (menyabot)', 'buruk'), pindah: k('Cepat kebakaran dan dibunuh orang', 'buruk') },
  Dulkangidah: { mendirikan: k('Kaya rezeki yang suci', 'baik'), genteng: k('Sering disiksa saudara dan selalu marah', 'buruk'), pindah: k('Dikasihi atasan, tetapi sering disiksa saudara', 'netral') },
  Besar: { mendirikan: k('Kaya kerbau dan sapi; segalanya selamat', 'baik'), genteng: k('Mendapat harta', 'baik'), pindah: k('Mendapat kerbau dan sapi', 'baik') }
};

// --- Bab 175: tiga kegiatan menurut mangsa ----------------------------------------------------------------------------
// Tanggal mangsa tidak ada di bab ini; kami memakai kalender pranata mangsa baku (lihat MANGSA_AWAL).
export const MANGSA_RUMAH = {
  sumber: S(175, [140, 141]),
  Kasa: { mendirikan: k('Baik', 'baik'), genteng: k('Kenyang dan selamat', 'baik'), pindah: k('Selamat', 'baik') },
  Karo: { mendirikan: k('Jelek', 'buruk'), genteng: k('Berkelahi dengan saudara', 'buruk'), pindah: k('Dicap sebagai orang jahat', 'buruk') },
  Katelu: { mendirikan: k('Sangat jelek', 'buruk'), genteng: k('Kebakaran dan kecurian', 'buruk'), pindah: k('Kecurian', 'buruk') },
  Kapat: { mendirikan: k('Lebih baik', 'baik'), genteng: k('Lebih baik dan disenangi orang', 'baik'), pindah: k('Bertahan sampai anak cucu', 'baik') },
  Kalima: { mendirikan: k('Baik', 'baik'), genteng: k('Mendapat hadiah dari anak cucu', 'baik'), pindah: k('Mendapat keburukan', 'buruk') },
  Kanem: { mendirikan: k('Baik', 'baik'), genteng: k('Mendapat hadiah dari anak cucu', 'baik'), pindah: k('Pemilik rumah disambar petir', 'buruk') },
  Kapitu: { mendirikan: k('Jelek', 'buruk'), genteng: k('Banyak pekerjaan, banyak perkara', 'netral'), pindah: k('Suka membuat perkara', 'buruk') },
  Kawolu: { mendirikan: k('Jelek', 'buruk'), genteng: k('Istri meninggal atau bercerai', 'buruk'), pindah: k('Sering bahagia, tetapi istri meninggal', 'netral') },
  Kasanga: { mendirikan: k('Jelek', 'buruk'), genteng: k('Sebelum atap diganti sering bersedih (memperbaiki rumah)', 'buruk'), pindah: k('Sering kesusahan', 'buruk') },
  Kasadasa: { mendirikan: k('Baik', 'baik'), genteng: k('Lebih dari baik', 'baik'), pindah: k('Lebih baik, sangat bahagia', 'baik') },
  Dhesta: { mendirikan: k('Sakit-sakitan tanpa memperoleh obat', 'buruk'), genteng: k('Keduanya meninggal', 'buruk'), pindah: k('Keduanya meninggal', 'buruk') },
  Sada: { mendirikan: k('Jelek', 'buruk'), genteng: k('Sulit berpisah dengan istri', 'buruk'), pindah: k('Niat jahatnya batal; muncul rasa malu', 'netral') }
};

// Awal tiap mangsa (kalender pranata mangsa baku, tidak dari kitab): [bulan, tanggal]. Kasa dimulai 22 Juni.
// Panjang mangsa: 41, 23, 24, 25, 27, 43, 43, 26 (27 pada tahun kabisat), 25, 24, 23, 41 hari.
export const MANGSA_AWAL = {
  sumber: { catatan: 'Kalender pranata mangsa baku; dicocokkan dengan research-system-javanese-profile (MIT). Bukan dari kitab ini.' },
  urut: [
    ['Kasa', 6, 22], ['Karo', 8, 2], ['Katelu', 8, 25], ['Kapat', 9, 18], ['Kalima', 10, 13], ['Kanem', 11, 9],
    ['Kapitu', 12, 22], ['Kawolu', 2, 3], ['Kasanga', 3, 1], ['Kasadasa', 3, 26], ['Dhesta', 4, 19], ['Sada', 5, 12]
  ]
};

// --- Bab 176-180: jumlah neptu hari + pasaran pada hari mulai, dihitung berputar menurut deretan nama -----------------
// Kitab menulis "melalui: A, B, C ..." tanpa pembagi; kami membacanya sebagai hitungan berputar sebanyak nama
// (jumlah mod banyaknya nama, sisa 0 = nama terakhir). Hanya bab 176 yang memakai neptu hari berbeda dari bab 2.
export const NEPTU_BAB_176 = { Minggu: 6, Senin: 4, Selasa: 3, Rabu: 6, Kamis: 5, Jumat: 7, Sabtu: 8 };

export const SIKLUS_NEPTU = {
  asumsi: 'Pembagi tidak tertulis; dibaca sebagai hitungan berputar sebanyak nama. Bab 177 dan 178 tidak menyebut jenis neptu; dipakai neptu bab 2.',
  b176: {
    sumber: S(176, [141]), judul: 'Membuat atau memindahkan rumah', neptuHari: 'bab 176',
    nama: [
      { nama: 'Guru', makna: 'Menjadi tempat bertanya, rezeki datang, jauh dari halangan', arah: 'baik' },
      { nama: 'Ratu', makna: 'Disegani sesama, jauh dari malapetaka, rezeki datang', arah: 'baik' },
      { nama: 'Rogoh', makna: 'Sering kecurian', arah: 'buruk' },
      { nama: 'Sempoyong', makna: 'Sering sakit dan susah', arah: 'buruk' }
    ]
  },
  b177: {
    sumber: S(177, [141]), judul: 'Membuat atau memperbaiki rumah', neptuHari: 'bab 2',
    nama: [
      { nama: 'Kerta', makna: 'Mendapat kekayaan', arah: 'baik' },
      { nama: 'Yasa', makna: 'Menjadi kuat', arah: 'baik' },
      { nama: 'Candi', makna: 'Rahayu dan selamat', arah: 'baik' },
      { nama: 'Rogoh', makna: 'Sering kehilangan', arah: 'buruk' },
      { nama: 'Sempoyong', makna: 'Sering berpindah jauh dan tidak tahan lama menempati', arah: 'buruk' }
    ]
  },
  b178: {
    sumber: S(178, [141, 142]), judul: 'Membuat atau memperbaiki rumah', neptuHari: 'bab 2',
    nama: [
      { nama: 'Sri', makna: 'Banyak yang bertamu', arah: 'baik' },
      { nama: 'Kitri', makna: 'Mendapat rezeki', arah: 'baik' },
      { nama: 'Werdi', makna: 'Banyak anak', arah: 'baik' },
      { nama: 'Candi', makna: 'Dihormati orang', arah: 'baik' },
      { nama: 'Rogoh', makna: 'Sering kehilangan atau kecurian', arah: 'buruk' },
      { nama: 'Sempoyong', makna: 'Sering mengalami kematian', arah: 'buruk' }
    ]
  },
  b179: {
    sumber: S(179, [142]), judul: 'Memindah rumah', neptuHari: 'bab 2',
    nama: [
      { nama: 'Kerta', makna: 'Terhormat', arah: 'baik' },
      { nama: 'Yasa', makna: 'Tenteram', arah: 'baik' },
      { nama: 'Rogoh', makna: 'Sering kehilangan atau kecurian', arah: 'buruk' },
      { nama: 'Sempoyong', makna: 'Sering berpindah dan tidak tahan lama menempati', arah: 'buruk' }
    ]
  },
  b180: {
    sumber: S(180, [142]), judul: 'Bangunan yang cocok dibuat pada hari itu', neptuHari: 'bab 2',
    nama: [
      { nama: 'Padu', makna: 'Cocok untuk membuat kedai', arah: 'netral' },
      { nama: 'Demang agung', makna: 'Cocok untuk membuat kandang', arah: 'netral' },
      { nama: 'Sanggar waringin', makna: 'Cocok untuk membuat langgar', arah: 'netral' },
      { nama: 'Mantri sinaroja', makna: 'Cocok untuk membuat rumah bagian belakang', arah: 'netral' },
      { nama: 'Macan ketawang', makna: 'Cocok untuk membuat rumah bagian depan', arah: 'netral' },
      { nama: 'Pati', makna: 'Cocok untuk membuat pagar', arah: 'netral' }
    ]
  }
};

// --- Hitungan ukuran: jumlah (usuk, telapak kaki, anak tangga, depa) dihitung berputar ----------------------------------
// n mod banyaknya nama; sisa 0 = nama terakhir. Contoh kitab: 18, 23, 28 usuk jatuh pada Naga (dapur); 19, 24, 29 depa
// jatuh pada suwarga (sumur baik).
export const UKURAN = {
  asumsi: 'Hitungan berputar: jumlah mod banyaknya nama, sisa 0 = nama terakhir (sesuai contoh kitab).',
  usukAkhir: {
    sumber: S(187, [144]), judul: 'Usuk terakhir pada hitungan lima-lima',
    nama: [
      { nama: 'Sri', makna: 'Baik', arah: 'baik' }, { nama: 'Kitri', makna: 'Baik', arah: 'baik' },
      { nama: 'Gana', makna: 'Cukupan', arah: 'netral' }, { nama: 'Liyu', makna: 'Tidak baik', arah: 'buruk' },
      { nama: 'Pokah', makna: 'Jelek', arah: 'buruk' }
    ]
  },
  usukBangunan: {
    sumber: S(188, [144]), judul: 'Jumlah usuk menurut bangunan',
    nama: [
      { nama: 'Sri', makna: 'Cocok untuk usuk lumbung', arah: 'netral' },
      { nama: 'Werdi', makna: 'Cocok untuk usuk kandang atau gandok', arah: 'netral' },
      { nama: 'Naga', makna: 'Cocok untuk usuk dapur', arah: 'netral' },
      { nama: 'Mas', makna: 'Cocok untuk usuk rumah belakang', arah: 'netral' },
      { nama: 'Perak', makna: 'Cocok untuk usuk pendapa atau teras', arah: 'netral' }
    ]
  },
  rangka: {
    sumber: S(189, [145]), judul: 'Rangka rumah (diukur dengan telapak kaki pemilik)',
    nama: [
      { nama: 'Sri', makna: 'Buat rangka untuk rumah belakang', arah: 'netral' },
      { nama: 'Kitri', makna: 'Buat rangka untuk pendapa atau teras', arah: 'netral' },
      { nama: 'Gana', makna: 'Buat rangka untuk dapur, gandok, atau kandang', arah: 'netral' },
      { nama: 'Liyu', makna: 'Buat rangka untuk regol (pintu gerbang) dan bangsal pasowanan', arah: 'netral' },
      { nama: 'Pokah', makna: 'Buat rangka untuk lumbung atau gudang', arah: 'netral' }
    ]
  },
  tangga1: {
    sumber: S(191, [146]), judul: 'Jumlah anak tangga (cara I)',
    nama: [
      { nama: 'Anda', makna: 'Baik', arah: 'baik' },
      { nama: 'Ende', makna: 'Cepat rusak dan sering dipinjam', arah: 'buruk' },
      { nama: 'Deyog', makna: 'Tangga yang jahat: sering membuat orang jatuh', arah: 'buruk' }
    ]
  },
  tangga2: {
    sumber: S(192, [146]), judul: 'Jumlah anak tangga (cara II)',
    nama: [
      { nama: 'Anda', makna: 'Sering dipinjam', arah: 'netral' },
      { nama: 'Ende', makna: 'Sering dipakai untuk memikul jenazah', arah: 'buruk' },
      { nama: 'Undu', makna: 'Pemiliknya sering jatuh sakit', arah: 'buruk' }
    ]
  },
  balai: {
    sumber: S(193, [146, 147]), judul: 'Jumlah dlika, galar, atau plupuh balai-balai',
    nama: [
      { nama: 'Dlika', makna: 'Pemiliknya sering sakit', arah: 'buruk' },
      { nama: 'Wangke', makna: 'Pemiliknya sering mengalami kematian', arah: 'buruk' },
      { nama: 'Wangkong', makna: 'Balai-balai sering menjadi tempat tidur kerabat', arah: 'netral' }
    ]
  },
  sumur: {
    sumber: S(197, [150]), judul: 'Jarak sumur dari tengah lantai rumah (dalam depa)',
    nama: [
      { nama: 'Sri', makna: 'Air sumur sering diambil orang', arah: 'netral' },
      { nama: 'Donya', makna: 'Sering kehilangan', arah: 'buruk' },
      { nama: 'Arta', makna: 'Sering kering', arah: 'buruk' },
      { nama: 'Suwarga', makna: 'Baik', arah: 'baik' },
      { nama: 'Neraka', makna: 'Sering kemasukan orang', arah: 'buruk' }
    ]
  }
};

// --- Bab 194-196: letak pintu halaman ------------------------------------------------------------------------------------
// Sisi tempat pintu dibagi 5 (bab 194) atau 9 (bab 195 dan 196) bagian sama panjang, dinomori dari sudut tertentu.
// `mulaiDari`: sudut tempat hitungan dimulai untuk pintu yang menghadap ke arah itu.
export const PINTU_HALAMAN = {
  b194: {
    sumber: S(194, [147]), bagian: 5,
    mulaiDari: { Selatan: 'Timur', Barat: 'Selatan', Utara: 'Barat', Timur: 'Utara' },
    makna: [
      { makna: 'Baik dan selamat', arah: 'baik' },
      { makna: 'Segala yang dilakukan baik dan menguntungkan', arah: 'baik' },
      { makna: 'Terkena sengkala (jelek)', arah: 'buruk' },
      { makna: 'Sering mendapat malu', arah: 'buruk' },
      { makna: 'Sangar dan kurang baik', arah: 'buruk' }
    ]
  },
  b195: {
    sumber: S(195, [148], 'scan (diperbesar)'), bagian: 9,
    keterangan: 'Cara menghitung sama dengan bab 194; makna berbeda untuk tiap sisi.',
    mulaiDari: { Selatan: 'Timur', Barat: 'Selatan', Utara: 'Barat', Timur: 'Utara' },
    makna: {
      Utara: ['Mudah sakit', 'Sering ada tamu', 'Banyak anak', 'Mendapat yang hendak mencelakai', 'Kecurian', 'Susah karena anak', 'Kuat pikirannya', 'Mendapat dosa dari anak', 'Kecurian'],
      Timur: ['Mendapat dosa dari orang lain', 'Mendapat istri yang baik', 'Mendapat banyak hadiah', 'Segalanya terselesaikan', 'Kaya', 'Hatinya rusak', 'Sering berkelahi', 'Mantap', 'Sering kecurian'],
      Selatan: ['Punya kebaikan', 'Tidak berutang', 'Suka mencipta', 'Makin pintar', 'Sering kematian', 'Kuat pikirannya', 'Kaya', 'Mendapat berkah batin', 'Mendapat nasihat suci'],
      Barat: ['Dapat uang', 'Kekayaan', 'Kaya anak cucu', 'Menang dan angkuh', 'Sering kecurian', 'Dapat harta', 'Dosa karena perempuan', 'Mudah rezekinya', 'Sakit-sakitan']
    }
  },
  b196: {
    sumber: S(196, [149]), bagian: 9,
    keterangan: 'Cara menghitung berbeda dari bab 194 dan 195 (sudut awal untuk Timur dan Barat bertukar). Kitab: pilih salah satu dari tiga cara asalkan jatuh pada yang baik.',
    mulaiDari: { Selatan: 'Timur', Barat: 'Utara', Utara: 'Barat', Timur: 'Selatan' },
    makna: [
      { nama: 'Bumi', makna: 'Baik', arah: 'baik' }, { nama: 'Kreta', makna: 'Baik', arah: 'baik' },
      { nama: 'Kala', makna: 'Jelek', arah: 'buruk' }, { nama: 'Kali', makna: 'Jelek', arah: 'buruk' },
      { nama: 'Bumi', makna: 'Baik', arah: 'baik' }, { nama: 'Kreta', makna: 'Baik', arah: 'baik' },
      { nama: 'Kala', makna: 'Jelek', arah: 'buruk' }, { nama: 'Kali', makna: 'Jelek', arah: 'buruk' },
      { nama: 'Bumi', makna: 'Baik', arah: 'baik' }
    ]
  }
};

// --- Bab 198: letak sumur terhadap rumah ---------------------------------------------------------------------------------------
// Delapan posisi di sekeliling rumah (arah mata angin dari tengah rumah), bergantung arah hadap rumah. Nomor 1-8.
export const LETAK_SUMUR = {
  sumber: S(198, [150, 151], 'scan (diagram)'),
  anjuran: 'Sumur yang baik adalah yang berada pada nomor 1 dan 8.',
  nomor: {
    Selatan: { Barat_Daya: 1, Selatan: 2, Tenggara: 3, Timur: 4, Timur_Laut: 5, Utara: 6, Barat_Laut: 7, Barat: 8 },
    Utara: { Timur_Laut: 1, Utara: 2, Barat_Laut: 3, Barat: 4, Barat_Daya: 5, Selatan: 6, Tenggara: 7, Timur: 8 },
    Timur: { Tenggara: 1, Timur: 2, Timur_Laut: 3, Utara: 4, Barat_Laut: 5, Barat: 6, Barat_Daya: 7, Selatan: 8 },
    Barat: { Barat_Laut: 1, Barat: 2, Barat_Daya: 3, Selatan: 4, Tenggara: 5, Timur: 6, Timur_Laut: 7, Utara: 8 }
  },
  makna: {
    1: { makna: 'Tempat mandi orang yang suci', arah: 'baik' },
    2: { makna: 'Tempat mandi orang yang buruk perbuatannya', arah: 'buruk' },
    3: { makna: 'Tempat mandi orang yang celaka dan gemar makan yang haram', arah: 'buruk' },
    4: { makna: 'Tempat mandi orang yang kesusahan', arah: 'buruk' },
    5: { makna: 'Tempat mandi orang mati', arah: 'buruk' },
    6: { makna: 'Tempat mandi orang sakit keras', arah: 'buruk' },
    7: { makna: 'Tempat mandi orang sakit', arah: 'buruk' },
    8: { makna: 'Tempat mandi pengantin', arah: 'baik' }
  }
};

// --- Bab 168: memilih halaman (bentuk dan keadaan lahan) -----------------------------------------------------------------------------
// Bagian "penolak" (ritual) tidak dimasukkan.
export const HALAMAN = {
  sumber: S(168, [135, 136, 137], 'scan (hlm. 136); ocr-konsisten (hlm. 135, 137)'),
  daftar: [
    { kondisi: 'Miring ke timur', nama: 'Manikmaya', makna: 'Jauh dari penyakit, banyak rezeki, selamat, tenteram', arah: 'baik' },
    { kondisi: 'Miring ke barat', nama: 'Sri Sadana', makna: 'Cemburuan, banyak keinginan, sering berkelahi, banyak penyakit', arah: 'buruk' },
    { kondisi: 'Miring ke selatan', nama: 'Gelagah', makna: 'Harta hilang, sering ada kematian', arah: 'buruk' },
    { kondisi: 'Miring ke utara', nama: 'Indraprasta', makna: 'Cita-cita tercapai; kekayaan dinikmati anak cucu', arah: 'baik' },
    { kondisi: 'Miring ke timur dan barat (tengah tinggi seperti punuk sapi)', nama: 'Darmalungit', makna: 'Memperoleh banyak harta', arah: 'baik' },
    { kondisi: 'Miring ke selatan dan bagian selatan berupa rawa', nama: 'Sekarsinom', makna: 'Uang banyak, tetapi sering kehilangan', arah: 'netral' },
    { kondisi: 'Barat tinggi, utara rendah', nama: 'Danarasa', makna: 'Banyak harta dan istri', arah: 'baik' },
    { kondisi: 'Barat tinggi, timur rendah', nama: 'Srinugraha', makna: 'Mendapat berkat agung', arah: 'baik' },
    { kondisi: 'Timur tinggi, barat rendah', nama: 'Kalawisa', makna: 'Sering sakit dan ada kematian', arah: 'buruk' },
    { kondisi: 'Bagian utara menurun', nama: 'Wisnumanitis', makna: 'Banyak rezeki sampai anak cucu', arah: 'baik' },
    { kondisi: 'Bagian selatan menurun', nama: 'Siwahboja', makna: 'Selalu mengalami kerusakan', arah: 'buruk' },
    { kondisi: 'Rata dan bercahaya merah kekuningan', nama: 'Bramapadhem', makna: 'Tanah sangar, sering ada kematian', arah: 'buruk' },
    { kondisi: 'Rata dan bercahaya hijau', nama: 'Endragana', makna: 'Rahayu dan selamat', arah: 'baik' },
    { kondisi: 'Terkurung gunung', nama: 'Kawula katubing bala', makna: 'Banyak harta benda', arah: 'baik' },
    { kondisi: 'Terkurung air', nama: 'Sigarpenjalin', makna: 'Selalu bertengkar', arah: 'buruk' },
    { kondisi: 'Di sebelah barat gunung', nama: 'Asungelak', makna: 'Sering diamuk orang', arah: 'buruk' },
    { kondisi: 'Mengeluarkan air', nama: 'Singameta', makna: 'Sering sakit', arah: 'buruk' },
    { kondisi: 'Bagian atasnya terkurung tanah basah', nama: 'Suniyalayu', makna: 'Banyak anak', arah: 'baik' },
    { kondisi: 'Terapit air, sebelahnya tanah basah', nama: 'Srimangepel', makna: 'Banyak padi dan beras', arah: 'baik' },
    { kondisi: 'Terapit gunung', nama: 'Lamurwangke', makna: 'Ternak berkembang', arah: 'baik' },
    { kondisi: 'Miring ke timur, di utara dan selatan gunung', nama: 'Arjuna', makna: 'Terhormat dan lapang hati', arah: 'baik' },
    { kondisi: 'Tertutup bayangan gunung', nama: 'Tigawarna', makna: 'Tenteram dan suka bertapa', arah: 'baik' },
    { kondisi: 'Tanah putih, rasanya manis, baunya harum', nama: null, makna: 'Baik; banyak memperoleh harta', arah: 'baik' },
    { kondisi: 'Tanah hijau, rasanya manis pedas, baunya amis', nama: null, makna: 'Lebih baik; selamat dan kaya', arah: 'baik' },
    { kondisi: 'Tanah merah, rasanya manis, baunya pedas', nama: null, makna: 'Baik; cocok memelihara aneka hewan', arah: 'baik' },
    { kondisi: 'Tanah hitam, rasanya pahit, baunya amis', nama: null, makna: 'Sangat jelek', arah: 'buruk' }
  ]
};
