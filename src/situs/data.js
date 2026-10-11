/**
 * Teks tetap situs Primbon (bahasa Indonesia): daftar istilah dan keterangan halaman Tentang.
 * Istilah mengikuti mesin dan kitab; tim UI/UX menentukan tata letak, bukan istilah.
 */
export const SITUS = 'https://primbon.iww.my.id';
export const REPO_MESIN = 'https://github.com/iwewe/pawukon';

export const NEPTU_HARI = [['Minggu', 5], ['Senin', 4], ['Selasa', 3], ['Rabu', 7], ['Kamis', 8], ['Jumat', 6], ['Sabtu', 9]];
export const NEPTU_PASARAN = [['Legi', 5], ['Pahing', 9], ['Pon', 7], ['Wage', 4], ['Kliwon', 8]];

export const ISTILAH = [
  { id: 'primbon', istilah: 'Primbon', arti: 'Kumpulan pengetahuan tradisional Jawa tentang watak, hitungan hari, dan hal-hal yang dianggap baik atau buruk, yang dicatat dalam kitab-kitab.' },
  { id: 'betaljemur', istilah: 'Betaljemur Adammakna', arti: 'Kitab primbon Jawa yang menjadi sumber tafsir di situs ini. Isinya ditulis ulang dan setiap butir memuat rujukan bab dan halaman cetaknya.' },
  { id: 'weton', istilah: 'Weton', arti: 'Gabungan hari (Minggu sampai Sabtu) dan pasaran (Legi, Pahing, Pon, Wage, Kliwon). Satu putaran weton ada 35 hari dan disebut selapan.' },
  { id: 'hari-jawa', istilah: 'Hari Jawa', arti: 'Hari menurut penanggalan Jawa berganti saat matahari terbenam (magrib), bukan tengah malam. Karena itu orang yang lahir sesudah magrib dihitung wetonnya dari hari berikutnya.' },
  { id: 'pasaran', istilah: 'Pasaran', arti: 'Siklus lima hari: Legi, Pahing, Pon, Wage, Kliwon.' },
  { id: 'neptu', istilah: 'Neptu', arti: 'Nilai hari ditambah nilai pasaran. Nilai hari: Minggu 5, Senin 4, Selasa 3, Rabu 7, Kamis 8, Jumat 6, Sabtu 9. Nilai pasaran: Legi 5, Pahing 9, Pon 7, Wage 4, Kliwon 8.' },
  { id: 'wuku', istilah: 'Wuku', arti: 'Satu dari 30 wuku, masing-masing tujuh hari. Satu putaran 30 wuku adalah 210 hari. Wuku dan pasaran tidak bergantung pada kalender bulan.' },
  { id: 'tanggal-jawa', istilah: 'Tanggal Jawa dan AJ', arti: 'Tanggal menurut kalender Jawa Sultan Agungan yang dihitung menurut Keraton Ngayogyakarta. AJ adalah Anno Javanico, tahun Jawa.' },
  { id: 'mangsa', istilah: 'Mangsa', arti: 'Musim dalam pranata mangsa, dua belas mangsa dalam setahun. Di situs ini mangsa dihitung dari kalender pranata mangsa baku, bukan dari kitab.' },
  { id: 'sisa-tujuh', istilah: 'Sisa tujuh', arti: 'Hitungan kitab (bab 104) yang menjumlahkan nilai hari dan pasaran lalu dibagi tujuh; sisanya menunjuk satu sebutan beserta maknanya.' },
  { id: 'sisa-neptu', istilah: 'Sisa neptu dibagi 9 dan 8', arti: 'Neptu dibagi sembilan (bab 106) dan dibagi delapan (bab 107). Sisa nol dibaca sebagai pembagi.' },
  { id: 'wiji', istilah: 'Wiji', arti: 'Hitungan rezeki: jumlah neptu tiga pekan berturut-turut pada hari yang sama dibagi lima. Sisa nol disebut wiji tengah.' },
  { id: 'arah-rezeki', istilah: 'Sri, Sadana, Siksa, Lara, Pati', arti: 'Lima nilai arah dalam hitungan rezeki. Menurut kitab, arah Sri dan Sadana dipakai untuk berdagang atau mencari obat; arah Lara dan Pati dihindari.' },
  { id: 'kala', istilah: 'Arah kala', arti: 'Arah tempat Batara Kala berada pada suatu wuku menurut kitab.' },
  { id: 'hari-binatang', istilah: 'Hari binatang', arti: 'Setiap tanggal Jawa dikaitkan dengan seekor hewan beserta mutu dan nilainya untuk berbagai urusan (bab 108).' },
  { id: 'perbintangan', istilah: 'Perbintangan', arti: 'Pengelompokan neptu menjadi beberapa bintang (bab 117), masing-masing dengan sekutu, musuh, serta hari dan bulan jaya atau malang. Jaya berarti dianggap beruntung, malang dianggap kurang baik.' },
  { id: 'hanacaraka', istilah: 'Aksara hanacaraka', arti: 'Huruf Jawa. Huruf depan dan belakang nama dialihkan ke aksara ini untuk hitungan nama (bab 114). Alih huruf ini perkiraan.' },
  { id: 'jodoh-hitungan', istilah: 'Sisa sembilan, sisa empat, pasangan hari', arti: 'Tiga hitungan dasar kecocokan dua orang (bab 15 sampai 17): sisa sembilan dari neptu kedua pihak, sisa empat dari jumlah neptu, dan pasangan hari kelahiran.' },
  { id: 'golongan-hari', istilah: 'Rahayu, sarju, tidak baik, sangar', arti: 'Kitab membagi hari menurut bulan Jawa ke dalam empat golongan: rahayu (baik), sarju (sedang), tidak baik, dan sangar, yaitu hari yang dilarang untuk hajat tertentu seperti pernikahan.' },
  { id: 'saat-agung', istilah: 'Saat agung', arti: 'Pembagian siang (pukul 06.00 sampai 18.00) menjadi tujuh saat bernama, misalnya Wiji, Cahya, dan Rejeki yang dianggap baik, serta Pati, Lara, Malaekat, dan Puji yang dihindari (bab 147).' },
  { id: 'saat-dua-belas', istilah: 'Siang dan malam', arti: 'Pembagian hari menjadi sepuluh bagian, lima di siang dan lima di malam. Nilainya berbeda menurut jumlah neptu hari itu: Ayu, Srilungguh, Srigumelar dianggap baik; Sampar, Pacak, Kala penganten, Kalaluweng dihindari (bab 146).' },
  { id: 'saat-malaikat', istilah: 'Saat malaikat', arti: 'Pembagian jam siang menurut nama malaikat penjaganya, masing-masing dengan keterangan baik atau kurang baik (bab 158).' },
  { id: 'akad', istilah: 'Saat dan hari akad', arti: 'Saat akad menurut penjaga, pasaran, dan tanggal Jawa (bab 35 dan 36), bintang Suhara (bab 37), serta hari akad tiga jenis menurut urutan hari dalam bulan Jawa (bab 34). Pada Suhara, sebagian hari hanya menyebut satu jam.' },
  { id: 'tarub', istilah: 'Tarub', arti: 'Tenda atau peneduh yang dipasang untuk hajatan, terutama pernikahan. Kitab memberi tiga cara memilih hari memasangnya (bab 39 sampai 41); pilih salah satu.' },
  { id: 'tingkeb', istilah: 'Tingkeb', arti: 'Peringatan usia kehamilan tujuh bulan menurut adat. Kitab menyebut harinya Rabu atau Sabtu dengan tanggal Jawa ganjil sebelum 15. Situs ini hanya menghitung tanggalnya.' },
  { id: 'sepasar-selapan', istilah: 'Sepasar, selapan, tedak siten', arti: 'Sepasar adalah lima hari (satu putaran pasaran). Selapan adalah 35 hari (satu putaran weton). Tedak siten adalah peringatan pada usia tujuh lapan (245 hari). Semuanya jadwal acara adat, bukan jadwal perawatan anak.' },
  { id: 'naga-kala', istilah: 'Naga, kala, rijalolah', arti: 'Istilah kitab untuk arah yang dihindari (naga dan kala) atau dihormati (rijalolah) saat bepergian. Situs ini hanya melaporkan arahnya menurut kitab.' },
  { id: 'kala-baya', istilah: 'Kala atau baya, saat, na’as', arti: 'Tiga hitungan waktu berangkat dalam kitab: kala atau baya dari jumlah neptu, saat berangkat menurut jumlah neptu, dan na’as, waktu yang disebut kitab sebagai sial pada hari itu.' },
  { id: 'depa', istilah: 'Depa', arti: 'Satuan panjang tradisional: rentang kedua lengan terbentang, sekitar 1,7 meter. Dipakai kitab untuk jarak sumur dari tengah rumah.' },
  { id: 'penilaian', istilah: 'Baik, waspada, netral', arti: 'Penilaian ini klasifikasi situs ini agar laporan mudah dibaca, bukan kata kitab. Waspada berarti kitab menyebutnya sebagai hal yang kurang baik.' }
];

export const LANGKAH = [
  { judul: 'Tanggal menjadi hari Jawa', teks: 'Hari Jawa berganti saat magrib. Bila Anda mengisi jam lahir pukul 18.00 atau sesudahnya, weton dihitung dari hari berikutnya. Tanpa tempat lahir, magrib dianggap pukul 18.00.' },
  { judul: 'Weton, neptu, wuku, dan tanggal Jawa', teks: 'Hari dan pasaran dihitung dari nomor hari berurutan. Wuku berputar tiap 210 hari. Tanggal Jawa dihitung menurut kalender Sultan Agungan Keraton Ngayogyakarta.' },
  { judul: 'Tafsir dari kitab', teks: 'Setiap hasil dicari pada tabel kitab Betaljemur Adammakna: watak, lambang, tanggal dan bulan, neptu, nama, rezeki, dan kesehatan.' },
  { judul: 'Disusun menjadi laporan', teks: 'Butir tafsir dikelompokkan per bagian, diberi penilaian baik, waspada, atau netral, dan memuat rujukan bab dan halaman. Jodoh, hari baik, dan jam memakai cara yang sama untuk dua orang, satu tanggal, dan satu hari.' }
];

export const BATAS = [
  'Tafsir adalah tradisi, bukan fakta ilmiah dan bukan ramalan. Tafsir tidak diuji kebenarannya, dan lapisan-lapisannya boleh saling bertentangan.',
  'Hitungan hanya berlaku untuk 8 Juli 1633 sampai 25 Agustus 2052, rentang kalender Jawa Sultan Agungan yang dapat dihitung.',
  'Tanpa tempat lahir, magrib dianggap pukul 18.00; orang yang lahir dekat magrib mungkin mendapat weton hari sebelum atau sesudahnya.',
  'Bagian yang bergantung pada tanggal dan bulan Jawa bisa bergeser sehari bila kalender dihitung dengan cara lain.',
  'Alih huruf nama ke aksara hanacaraka adalah perkiraan, dan komponen nama hanya dikenali dari daftar kitab.',
  'Keterangan kesehatan adalah kepercayaan tradisional, bukan nasihat medis. Hasil jodoh, hari baik, dan jam bukan nasihat pernikahan atau profesional; hasil bernada buruk bukan larangan.',
  'Hari yang tidak punya catatan dalam kitab berarti kitab tidak menyebutnya, bukan berarti hari itu baik.'
];

export const TIDAK_DIMUAT = [
  'Ritual, sesaji, doa, mantra, penolak, tumbal, dan ramuan.',
  'Watak perempuan menurut weton dan penilaian orang dari penampilan atau ciri tubuh.',
  'Bagian kitab yang mengaitkan kecacatan anak dengan perilaku orang tuanya.',
  'Tetesan (khitan perempuan) pada jadwal bayi, dan penilaian jam bayi lahir, karena bertentangan dengan anjuran tenaga kesehatan.',
  'Isi dan tata cara selamatan: pada hajatan hanya tanggal acara yang dihitung.'
];

export const PENAFIAN = 'Tafsir adalah tradisi kitab Betaljemur Adammakna yang ditulis ulang, bukan ramalan, kepastian, atau nasihat profesional.';
