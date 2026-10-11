/**
 * Watak kelahiran menurut kitab Betaljemur Adammakna.
 *
 * Isi ditulis ulang dengan kalimat sendiri (bukan salinan teks terjemahan kitab); yang dipertahankan
 * adalah fakta dan maknanya. Nama, dewa, kayu, burung, dan arah kala diambil apa adanya dari kitab.
 * Semua ini tafsir tradisional, bukan fakta ilmiah. Setiap bagian mencantumkan bab dan halaman
 * scan (nomor halaman PDF sumber, sama dengan nomor cetak).
 *
 * Kunci memakai nama yang sama dengan mesin kalender (kalender.js).
 */

// --- Hari: bab 97 (hlm. 60) dan bab 109 (hlm. 73-74) ---------------------------------
export const WATAK_HARI = {
  sumber: { bab: [97, 109], halaman: [60, 73, 74], verifikasi: 'ocr-konsisten' },
  Minggu: {
    unsur: 'Matahari',
    watak: 'Hatinya terang dan lapang, murah hati kepada kerabat, teguh, pandai bicara, dan mampu memimpin. Kelemahannya: sering tidak setia pada suara hatinya dan pendiriannya goyah.'
  },
  Senin: {
    unsur: 'Bulan',
    watak: 'Menyukai kebenaran, ikhlas, cekatan, dan ucapannya tidak bisa dipermainkan. Tingkah lakunya serba pantas dan memuaskan.'
  },
  Selasa: {
    unsur: 'Api',
    watak: 'Mudah berbohong dan kurang disukai orang. Persahabatannya singkat karena gampang bosan dan cepat meninggalkan pekerjaan. Cemburuan dan sulit percaya pada orang lain.'
  },
  Rabu: {
    unsur: 'Bumi',
    watak: 'Kebaikannya kadang berlebihan; hidupnya cukup. Bicaranya tegas tetapi pendiam, dan jarang memikirkan akibat. Bertanggung jawab dan suka bergurau.'
  },
  Kamis: {
    unsur: 'Angin dan petir',
    watak: 'Bicaranya bisa menakutkan, sulit berteman, mudah panas, dan gampang terbuai kata manis atau pujian. Pandai menafsirkan sesuatu dan suka menilai dengan memuji atau mencela, tetapi tidak senang bila ada yang mengungguli. Kitab juga menyebut pasangannya sering berpulang lebih dulu.'
  },
  Jumat: {
    unsur: 'Bintang',
    watak: 'Suka menasihati dan memberi, gemar mencari ilmu, halus wataknya, dan dicintai banyak sahabat serta kerabat. Kitab menyebutnya cenderung melarat, dan sering tampil serba bersih dan suci.'
  },
  Sabtu: {
    unsur: 'Air',
    watak: 'Sering dimusuhi dan ditakuti orang sehingga jarang punya teman. Pandai mencari nafkah, terutama berdagang, dan menuntut pekerjaan cepat selesai. Dinilai tamak dan sombong.'
  }
};

// --- Pasaran: bab 99 (hlm. 61-62) dan bab 110 (hlm. 74) ----------------------------------
export const WATAK_PASARAN = {
  sumber: { bab: [99, 110], halaman: [61, 62, 74], verifikasi: 'ocr-konsisten' },
  Kliwon: {
    sebutan: 'Wisa marta durjana tengah',
    arti: 'Campuran baik dan buruk',
    hewan: ['Kera', 'Anjing'],
    watak: 'Berwatak ganda. Sisi kera: lincah, galak, banyak akal, mempermainkan orang, sukar didekati. Sisi anjing: setia, berkemauan besar, sering selamat karena kesetiaannya, tetapi kurang bersih dalam hal makan. Pandai bicara dan mengarang, pemaaf, menyimpan baik dan buruk dalam hati.',
    selamatan: { nama: 'Ketek', isi: 'Bubur lima warna' }
  },
  Legi: {
    sebutan: 'Sumendi',
    arti: 'Ibarat raja atau bupati',
    hewan: ['Kucing', 'Tikus'],
    watak: 'Sisi kucing: waspada, jinak, tidak mudah curiga kecuali telah difitnah, luwes bergaul dengan kaya maupun miskin. Sisi tikus: berjaga malam, hati-hati, sering bingung, makan sedikit, besar baik buruknya. Pemaaf, sanggup, ikhlas, suka menjamu tamu hingga puas.',
    selamatan: { nama: 'Pitik', isi: 'Aneka jajan pasar' }
  },
  Pahing: {
    sebutan: 'Cendana',
    arti: null,
    hewan: ['Harimau'],
    watak: 'Suka menyendiri dan bepergian jauh, jarang makan kecuali dipelihara penguasa, banyak musuh. Berbahaya bila didahului, tetapi aman bila ia yang mendahului. Marah karena perempuan, sering tertipu, barang yang hilang jarang kembali. Berkeinginan besar memiliki apa saja dan menjamu orang untuk mencari hasil.',
    selamatan: { nama: 'Kucing', isi: 'Nasi dan ikan' }
  },
  Pon: {
    sebutan: 'Somahita (kulon lakuning Nabi)',
    arti: null,
    hewan: ['Kambing'],
    watak: 'Suka memberi nasihat, tidak bepergian jauh, hidup dari hasil miliknya sendiri, sering marah pada istri dan keluarga, kadang berani melawan atasan. Kekayaan sedang. Suka memamerkan harta dan cenderung sombong, bertindak tanpa menjaga harga diri.',
    selamatan: { nama: 'Bulus angrem', isi: 'Kelepon dan serabi' }
  },
  Wage: {
    sebutan: 'Prabuanom (lor lakuning dandang)',
    arti: null,
    hewan: ['Sapi'],
    watak: 'Jinak dan menurut pada yang memerintah, tetapi ceroboh dan pemarah, bisa mengamuk bila diperlakukan kasar. Sedikit mencari nafkah dan lupa kerabat saat sudah makan; mudah difitnah, sombong. Keras hati dan teguh pendirian dalam ucapan.',
    selamatan: { nama: 'Banteng', isi: 'Nasi golong' }
  }
};

// --- Weton (hari + pasaran): bab 100 (hlm. 62-64) ------------------------------------------
// `pria` / `wanita`: catatan khusus jenis kelamin yang disebut kitab (tafsir tradisional).
export const WATAK_WETON = {
  sumber: { bab: 100, halaman: [62, 63, 64], verifikasi: 'ocr-konsisten' },
  'Jumat Kliwon': { pria: 'Pendiam, sedikit bicara.', wanita: 'Banyak bicara tanpa menghiraukan laki-laki.' },
  'Sabtu Legi': { umum: 'Teguh pendirian, pandai mencari harta hingga kaya dan dermawan. Kitab menyarankan memelihara kuda.' },
  'Minggu Pahing': { umum: 'Tampak angkuh, tetapi pandai, banyak akal, berhati-hati, dan berperasaan halus ("pandai memutar dunia").' },
  'Senin Pon': { umum: 'Manis tutur katanya, pandai merebut hati orang, dan mudah mendapat rezeki.' },
  'Selasa Wage': { umum: 'Tidak suka dinasihati dan sulit diatur bicaranya.', wanita: 'Baik, dan pandai menyimpan uang.' },
  'Rabu Kliwon': { umum: 'Pandai bicara; pikirannya sering tertuju pada perempuan, sulit bersikap tenang seperti pertapa.' },
  'Kamis Legi': { umum: 'Berpandangan luas dan tidak suka dikalahkan.', wanita: 'Kurang baik: sering bertengkar dan tidak menghormati laki-laki.' },
  'Jumat Pahing': { umum: 'Pendiam. Bila tidak terasah bisa sangat kurang, tetapi bila pandai, sangat pandai: menjadi teladan dan berpengetahuan luas.' },
  'Sabtu Pon': { pria: 'Berbakat di bidang teknik.', wanita: 'Pandai mencari penghasilan tanpa sungkan.' },
  'Minggu Wage': { umum: 'Berkemauan besar; bila sudah berniat sulit dihalangi.', wanita: 'Kurang baik.' },
  'Senin Kliwon': { umum: 'Berpikir tenang. Saat muda nakal, setelah tua pikirannya makin halus.' },
  'Selasa Legi': { umum: 'Tidak banyak bicara, kaya akal, gagasannya bagus. Ia merendahkan dirinya sendiri, namun hidupnya selamat.' },
  'Rabu Pahing': { umum: 'Agak angkuh, tidak suka disaingi, senang dipuji, dan keras pendapat; sebenarnya mudah mencapai kecocokan.' },
  'Kamis Pon': { umum: 'Gemar bersolek, angkuh, pendiam, dan berhemat. Isi kepalanya sulit ditebak, meski sikapnya tenang.' },
  'Jumat Wage': { umum: 'Banyak bicara tetapi tepat, ikhlas, terang, dan selalu berhati-hati; namun sering menemui rintangan.' },
  'Sabtu Kliwon': { umum: 'Kitab menilai: tampak lebih pandai daripada kenyataannya, malas bekerja, dan pelupa. Kelebihannya: bersungguh hati bila sudah berniat.' },
  'Minggu Legi': { umum: 'Pelupa dan kurang memakai kepandaiannya; tertarik pada perempuan yang kurang baik atau suka serong.' },
  'Senin Pahing': { umum: 'Tamak dan bekerja secukupnya.', wanita: 'Pikirannya lebih baik.' },
  'Selasa Pon': { umum: 'Kurang berpikir panjang dan tidak senang membesar-besarkan masalah.', wanita: 'Lebih baik; cocok menjadi istri maupun selir priyayi.' },
  'Rabu Wage': { umum: 'Berpikir secukupnya dan maju di bidang pekerjaan.', wanita: 'Sering berbuat curang kepada suami.' },
  'Kamis Kliwon': { umum: 'Kurang berpikir panjang tetapi bekerja bersungguh-sungguh.', wanita: 'Pikirannya cukupan.' },
  'Jumat Legi': { umum: 'Pendiriannya goyah bila ada yang melebihi; hatinya sering kurang senang dan kecewa.' },
  'Sabtu Pahing': { umum: 'Pria maupun wanita dapat memperoleh keuntungan dan pandai menyimpan rahasia.' },
  'Minggu Pon': { umum: 'Kurang berpikir panjang dan mudah percaya pada orang lain.', wanita: 'Lebih baik; mampu menjaga harta suaminya.' },
  'Senin Wage': { umum: 'Kurang menimbang dengan matang dan enggan menerima pendapat orang lain, tetapi nekat hingga siap mati dan sanggup menanggung derita.', wanita: 'Baik.' },
  'Selasa Kliwon': { umum: 'Ekstrem: tanpa pendidikan sangat tertinggal, dengan kepandaian bisa tumbuh menjadi pujangga atau pemuka agama.' },
  'Rabu Legi': { umum: 'Sederhana, mau memberi dan menerima.', wanita: 'Pikirannya baik.' },
  'Kamis Pahing': { umum: 'Tak banyak bicara dan tak banyak menimbang, tetapi bekerja dengan tekun. Ia bisa menjadi priyayi yang dikasihi bangsawan, dengan pekerjaan yang sedang-sedang saja.' },
  'Jumat Pon': { umum: 'Banyak akal; bila sudah tidak suka pada seseorang, tidak mau bergaul lagi selamanya.' },
  'Sabtu Wage': { umum: 'Mudah lupa, wataknya keras dan pergaulannya kurang enak, meski amarahnya cepat padam.' },
  'Minggu Kliwon': { umum: 'Tamak dan banyak keinginan.', wanita: 'Boros.' },
  'Senin Legi': { umum: 'Pendiam, tidak banyak kemauan, dan tenang berpikir.', wanita: 'Bekerja dengan baik.' },
  'Selasa Pahing': { umum: 'Pemalu, malas, kaku hatinya, dan rendah perbuatannya.', wanita: 'Baik dan berbakti kepada suami.' },
  'Rabu Pon': { umum: 'Kuat berpikir, suka bekerja, dan berpendirian tetap.', wanita: 'Hemat, tetapi keras kemauan.' },
  'Kamis Wage': { umum: 'Bertanggung jawab, tahan menderita, dan keras budi.', wanita: 'Berpikir setengah-setengah.' }
};

// --- Neptu bab 104 (hlm. 67): jumlah urutan hari + pasaran (lihat URUTAN_BAB_104), dibagi 7 ------
export const WATAK_SISA_7 = {
  sumber: { bab: 104, halaman: [67], verifikasi: 'ocr-konsisten' },
  asumsi: 'Jumlah kurang dari 7 dipakai apa adanya (kitab). Sisa 0 (jumlah 7 atau 14) dibaca 7; ini konvensi kami, tidak tertulis eksplisit.',
  1: { nama: 'Segara wasesa', makna: 'Banyak rezeki dan perbuatannya baik.' },
  2: { nama: 'Tunggak semi', makna: 'Rezeki selalu ada.' },
  3: { nama: 'Satriya wibawa', makna: 'Selalu menemukan kenyamanan.' },
  4: { nama: 'Sumur sinaba', makna: 'Menjadi tempat orang berlindung dan mengungsi.' },
  5: { nama: 'Bumi kapetak', makna: 'Cocok menjadi petani.' },
  6: { nama: 'Satriya wirang', makna: 'Sering mendapat rintangan atau rasa malu.' },
  7: { nama: 'Lebu katiup angin', makna: 'Hidupnya kekurangan dan kerap berpindah-pindah tempat.' }
};

// --- Wuku: bab 118 (hlm. 84-90) ---------------------------------------------------------------
// `kala`: letak Kala menurut diagram hlm. 90 (arah yang dihindari selama sepekan wuku itu;
// "Atas"/"Bawah" berarti menghindari memanjat). Kuningan tidak disebut di uraian, tetapi ada di diagram.
export const WATAK_WUKU = {
  sumber: { bab: 118, halaman: [84, 85, 86, 87, 88, 89, 90], verifikasi: 'scan (sebagian halaman) dan ocr-konsisten' },
  Sinta: { nomor: 1, dewa: 'Yamadipati', kayu: 'Gendayakan', burung: 'Gagak', kala: 'Timur Laut',
    watak: 'Pelindung bagi orang sakit, paham akan petunjuk, dan tampil dengan harta yang terlihat. Di usia setengah tua hatinya gelisah dan banyak hambatan; usahanya sering kandas di tengah jalan.', celaka: 'Hambatan di tengah jalan' },
  Landep: { nomor: 2, dewa: 'Mahadewa', kayu: 'Gendayakan', burung: 'Atat kembang', kala: 'Barat',
    watak: 'Pelindung orang sakit, sering bekerja untuk orang lain, hartanya tampak, dan perintahnya membawa kebaikan. Ibarat sinar matahari yang menerangi hati.', celaka: 'Tertimpa pohon' },
  Wukir: { nomor: 3, dewa: 'Mahayekti', kayu: 'Nagasari', burung: 'Manyar', kala: 'Tenggara',
    watak: 'Prihatin, sopan, tidak suka disaingi, dan di mana pun cenderung menjadi pemimpin. Indah dari jauh, tetapi budinya sulit dipercaya.', celaka: 'Difitnah' },
  Kurantil: { nomor: 4, dewa: 'Langsur', kayu: 'Ingas', burung: 'Slinditan', kala: 'Bawah',
    watak: 'Cepat panas tetapi sebentar, tidak betah diam, boros, suka serong, dan pendiriannya tidak tetap. Punya kehormatan.', celaka: 'Saat memanjat' },
  Tolu: { nomor: 5, dewa: 'Bayu', kayu: null, burung: 'Branjangan', kala: 'Barat Laut',
    watak: 'Tidak tenang seperti angin dan angkuh; kemuliaannya datang kemudian hari.', celaka: 'Terkena taring atau tanduk tanpa terduga' },
  Gumbreg: { nomor: 6, dewa: 'Cakra', kayu: 'Waringin', burung: 'Ayam hutan', kala: 'Selatan',
    watak: 'Tempat berlindung, disayang bangsawan, dan ikhlas. Perintahnya tenang tetapi wajib dilaksanakan; orang segan membantahnya.', celaka: 'Tenggelam' },
  Warigalit: { nomor: 7, dewa: 'Asmara', kayu: 'Sulastri', burung: 'Kepodang', kala: 'Atas',
    watak: 'Pencemburu dan sering bersusah hati; hidup cenderung kekurangan sandang dan pangan.', celaka: 'Tersangkut atau terjerat' },
  Warigagung: { nomor: 8, dewa: 'Maharesi', kayu: 'Cemara', burung: 'Betet', kala: 'Utara',
    watak: 'Bicaranya ramai, angkuh, dan suka berbuat buruk; hemat, tetapi royal bila perlu. Sangat memperhatikan kehidupannya; kemuliaan datang kemudian hari.', celaka: 'Dicelakai sahabat sendiri' },
  Julungwangi: { nomor: 9, dewa: 'Sambo', kayu: 'Cempaka', burung: 'Ketilang', kala: 'Barat Daya',
    watak: 'Banyak yang menyukai, pandai bicara, baik hati, ikhlas memberi, dan tidak suka menimbun harta. Disayang bangsawan.', celaka: 'Diterkam singa' },
  Sungsang: { nomor: 10, dewa: 'Gana', kayu: 'Tangan', burung: 'Nuri', kala: 'Timur',
    watak: 'Selalu bekerja dengan tangannya, boros, ikhlas bila hartanya diminta tetapi tidak pernah merasa bahagia. Hatinya digambarkan seperti mendung.', celaka: 'Terkena besi' },
  Galungan: { nomor: 11, dewa: 'Kamajaya', kayu: 'Tangan', burung: 'Bido', kala: 'Timur Laut',
    watak: 'Keras hati, menyayangi miliknya meski buruk, dermawan sekaligus boros. Pendiriannya tidak tetap.', celaka: 'Berkelahi' },
  Kuningan: { nomor: 12, dewa: 'Indra', kayu: 'Wijayakusuma', burung: 'Urang-urangan', kala: 'Barat',
    watak: 'Berwajah menarik tetapi kikir. Hatinya selamat.', celaka: 'Diamuk' },
  Langkir: { nomor: 13, dewa: 'Kala', kayu: 'Cemara sol dan ingas', burung: 'Gemak', kala: 'Tenggara',
    watak: 'Tidak cocok menjadi pelindung; temperamennya sangat panas, nekat, dan lancang. Perilakunya dinilai buruk serta sulit dipercaya, dan nasihat yang baik jarang didengarnya.', celaka: 'Kecurian dan berkelahi' },
  Mandasiya: { nomor: 14, dewa: 'Brahma', kayu: 'Asam', burung: 'Platuk bawang', kala: 'Bawah',
    watak: 'Tempat berlindung, kuat bekerja, hemat, tetapi gila hormat dan senang dipuji. Sulit akur dengan saudara.', celaka: 'Terkena taring' },
  Julungpujut: { nomor: 15, dewa: 'Guritna', kayu: 'Rembuyut', burung: 'Emprit tondang', kala: 'Barat Laut',
    watak: 'Beruntung, menjadi bahan pembicaraan yang baik, dan menyenangkan hati orang.', celaka: 'Ditenung atau terkena guna-guna' },
  Pahang: { nomor: 16, dewa: 'Tantra', kayu: 'Gendayakan', burung: 'Cocak', kala: 'Selatan',
    watak: 'Pelindung orang sakit, mudah berucap, berkedudukan. Ucapannya bisa memanaskan pendengar; suka serong dan iri hati.', celaka: 'Dianiaya' },
  Kuruwelut: { nomor: 17, dewa: 'Wisnu', kayu: 'Parijata', burung: 'Sepahan', kala: 'Atas',
    watak: 'Halus budinya tetapi sering salah dan mudah bersedih. Ibarat air jernih dalam pasu: akhirnya selamat.', celaka: 'Terkena peluru' },
  Marakeh: { nomor: 18, dewa: 'Suranggana', kayu: 'Trengguli', burung: null, kala: 'Utara',
    watak: 'Tidak bisa disuruh pergi jauh, buahnya indah dan dipuji orang, kehormatan datang dekat, baik hati dan selalu ingat.', celaka: 'Dianiaya' },
  Tambir: { nomor: 19, dewa: 'Siwa', kayu: 'Beracun (tidak dapat jadi pelindung)', burung: 'Prenjak', kala: 'Barat Daya',
    watak: 'Besar kemauan; tampak baik tetapi batinnya mengharap hasil. Suka memuji diri dan budinya kurang baik.', celaka: 'Difitnah' },
  Medangkungan: { nomor: 20, dewa: 'Basuki', kayu: 'Plasa', burung: 'Pelung', kala: 'Timur',
    watak: 'Mencari nafkah lewat air atau laut, akhirnya berbudi baik, pasrah pada takdir, dan suka bicara banyak.', celaka: 'Terbunuh pada malam hari' },
  Maktal: { nomor: 21, dewa: 'Sakri', kayu: 'Nagasari', burung: 'Ayam hutan', kala: 'Timur Laut',
    watak: 'Disenangi banyak orang, manis tutur kata, pengabdiannya diterima; kekayaan dan pangkat datang bersamaan. Hatinya lapang.', celaka: 'Berkelahi' },
  Wuye: { nomor: 22, dewa: 'Kuwera', kayu: 'Tal', burung: 'Gogik', kala: 'Barat',
    watak: 'Panjang umur, pencemburu, tajam berpikir, ikhlas kepada kekasih, menyenangkan sesama. Cepat putus asa bila perintahnya tidak diikuti.', celaka: null },
  Manahil: { nomor: 23, dewa: 'Gatra', kayu: 'Tigaron', burung: 'Sepahan', kala: 'Tenggara',
    watak: 'Firasatnya tajam, mudah curiga, baik dalam urusan makanan. Perintahnya dingin tetapi harus terlaksana.', celaka: 'Terkena besi' },
  Prangbakat: { nomor: 24, dewa: 'Bisma', kayu: 'Tirisan', burung: 'Urang-urangan', kala: 'Bawah',
    watak: 'Panjang umur, banyak rezeki, angkuh, tangkas, dan kaku hatinya. Perintahnya mula-mula dingin lalu panas.', celaka: 'Saat memanjat' },
  Bala: { nomor: 25, dewa: 'Durga', kayu: 'Cemara', burung: 'Ayam hutan', kala: 'Barat Laut',
    watak: 'Senang mengobrol, angkuh, perbuatannya jelek, dan tidak kenal takut; acap membuat huru-hara. Disayang bangsawan.', celaka: 'Ditenung atau diracun' },
  Wugu: { nomor: 26, dewa: 'Singajanma', kayu: 'Wuni', burung: 'Kepodang', kala: 'Selatan',
    watak: 'Menarik dilihat, pencemburu, kurang pergaulan, dan kikir; hatinya terbuka.', celaka: 'Terkena racun' },
  Wayang: { nomor: 27, dewa: 'Sri', kayu: 'Cempaka', burung: 'Ayam hutan', kala: 'Atas',
    watak: 'Banyak disukai, berpengaruh, cantik atau mulia, ikhlas berbakti, dan hatinya tenteram. Awalnya lancar tetapi akhirnya ruwet; membuat segalanya jelas.', celaka: 'Dibunuh' },
  Kulawu: { nomor: 28, dewa: 'Sadana', kayu: 'Tal', burung: 'Nuri', kala: 'Utara',
    watak: 'Berumur panjang, memberi tanpa pamrih, berwibawa, berhati lapang, dan luwes menyesuaikan diri.', celaka: 'Terkena racun atau digigit ular' },
  Dukut: { nomor: 29, dewa: 'Sakri', kayu: 'Pandan', burung: 'Ayam hutan', kala: 'Barat Daya',
    watak: 'Kediamannya sulit dilacak. Keinginannya banyak namun perasaannya halus; pelit, tetapi pasrah pada takdir. Disukai kalangan bangsawan.', celaka: 'Di medan perang' },
  Watugunung: { nomor: 30, dewa: 'Anantaboga', kayu: 'Wijayakusuma', burung: 'Gogik', kala: 'Timur',
    watak: 'Menyukai ketenangan, bersikap seperti pendeta dan gemar bersemedi, tetapi banyak tingkah.', celaka: 'Dianiaya' }
};
