# Primbon

Laporan tafsir weton dari kitab Betaljemur Adammakna: masukkan tanggal lahir, lalu hitung weton, neptu, wuku, dan tanggal Jawa
(kalender Sultan Agungan menurut Keraton Ngayogyakarta), kemudian susun tafsirnya menjadi satu laporan. Situs statis; seluruh hitungan
berjalan di peramban dan data lahir hanya berada di fragmen alamat (`#d=...`), yang tidak pernah dikirim ke server.

Alamat: https://primbon.iww.my.id

## Isi laporan

Watak kelahiran (hari, pasaran, weton, sisa tujuh, wuku) · lambang dan kedudukan · tanggal, bulan, mangsa · neptu · nama (bila diisi) ·
rezeki dan arah · kesehatan menurut kitab. Tiap butir memuat rujukan bab dan halaman cetak serta penilaian baik, waspada, atau netral
(klasifikasi situs ini, bukan kata kitab).

## Alat lain (rilis 2)

* **Jodoh** (`/jodoh`): kecocokan dua orang menurut kitab: sisa sembilan, sisa empat, pasangan hari; neptu weton dan tanggal Jawa; huruf nama (bila kedua nama diisi).
  Hasil bernada buruk selalu disertai catatan bahwa itu kata kitab, bukan larangan, dan keputusan milik pengguna.
* **Hari baik** (`/hari`): tinjauan satu tanggal untuk semua keperluan, keperluan umum, pernikahan, atau bepergian, ditambah daftar 14 hari berikutnya.
  Hari tanpa catatan berarti kitab tidak menyebutnya, bukan berarti hari itu baik.
* **Jam** (`/jam`): tujuh saat siang, siang dan malam, jam sial dan baik, saat malaikat, urusan perkara, dan akad nikah. Bila jam diisi, baris yang memuatnya ditandai.

Alamat: `/jodoh#a=...&b=...`, `/hari#d=YYYY-MM-DD&u=nikah`, `/jam#d=YYYY-MM-DD&t=HH:MM`; seluruh data tetap di fragmen. Rilis berikutnya: rumah, bepergian, hajatan.

**Sengaja tidak dimuat:** ritual, sesaji, doa, mantra, ramuan; watak perempuan menurut weton; penilaian dari penampilan atau ciri tubuh;
bagian yang mengaitkan kecacatan anak dengan perilaku orang tua. Tafsir adalah tradisi, bukan ramalan dan bukan fakta ilmiah.

## Menjalankan

```bash
npm install
npm run dev          # pengembangan
npm test             # tes unit (model laporan, validasi, penyaringan isi, aturan teks situs)
npm run build        # hasil statis di dist/ (butuh fallback ke index.html untuk jalur seperti /laporan)
```

Uji peramban (tidak ikut `npm test`): `scripts/e2e.cjs` dan `scripts/audit.cjs`; lihat komentar di kepala berkas
(`PLAYWRIGHT_CORE`, `CHROME_PATH`, `BASE`).

## Susunan

* `src/mesin/`: mesin kalender dan data tafsir (salinan repo pawukon; lihat `NOTICE.md`).
* `src/situs/laporan.js` (model laporan) dan `alat.js` (Jodoh, Hari baik, Jam): struktur isi tanpa HTML; `butir.js`: pembangun butir bersama; `masukan.js`: validasi dan alamat; `data.js`: istilah dan teks tetap.
* `src/situs/tampilan/`: halaman (beranda, laporan, jodoh, hari, jam, istilah, tentang) dan `komponen.js` (butir, bagian, isian tanggal). `css/situs.css`: gaya (dasar netral).
* `docs/CATATAN_UIUX.md`: catatan untuk tim UI/UX.

## Lisensi

MIT, hak cipta 2026 Iwewe (`LICENSE`). Mesin pawukon: MIT (`LICENSE.pawukon`). Huruf: SIL OFL 1.1.
