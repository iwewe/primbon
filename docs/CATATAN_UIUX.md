# Catatan untuk tim UI/UX

Tampilan saat ini sengaja **dasar netral**: token Malam Aura dari hd.iww.my.id dan tata letak sederhana. Nuansa Jawa belum ada dan
disusun bersama tim. Berkas ini menjelaskan apa yang tetap dan apa yang bebas diubah.

## Yang bebas diubah
Tata letak, warna, huruf, ilustrasi, ornamen, ikon, gerak, dan bentuk daftar isi. Seluruh gaya ada di `src/situs/css/situs.css`
(token di bagian atas). Markup dibuat oleh `src/situs/tampilan/*.js`.

## Yang tetap (aturan proyek)
* Bahasa Indonesia saja; tidak ada sakelar bahasa. Istilah mengikuti `src/situs/data.js` dan mesin; tim memberi tata letak dan visual, bukan istilah.
* Tidak menulis "gratis". Baris privasi "tanpa akun, tidak ada data dikirim ke server" dipertahankan.
* Penilaian baik, waspada, netral selalu berupa **teks**, tidak hanya warna atau bentuk (`.tag`).
* Peringatan kesehatan dan catatan "tradisi, bukan ramalan" harus tetap terlihat. Butir bernada berat (tag Waspada, perbintangan, kemalangan wuku)
  perlu perlakuan yang tidak menakut-nakuti: jangan pakai warna alarm, ikon tengkorak, atau bahasa visual ramalan.
* Sasaran sentuh minimal 44 px, teks minimal 12 px, kontras AA terang dan gelap (diperiksa `scripts/audit.cjs`).

## Bentuk isi (model)
`bangunLaporan()` di `src/situs/laporan.js` mengembalikan `{ weton, ringkasan, bagian[] }`. Setiap bagian punya `butir[]` dengan jenis
`tafsir` (judul, teks, arah, sumber, catatan), `fakta` (pasangan label-nilai), `daftar` (item dengan arah), dan `tabel`
(lambang hari dan pasaran). Perubahan tampilan tidak perlu menyentuh model.

## Halaman
Beranda (pengantar, tautan alat, formulir) · Laporan (hero weton, ringkasan lima fakta, daftar isi, tujuh bagian) · Jodoh (dua formulir pihak,
tiga bagian hasil) · Hari baik (formulir, rincian per keperluan, daftar 14 hari) · Jam (formulir, enam tabel saat, baris yang memuat jam pengguna ditandai) ·
Istilah · Tentang · 404.

Model alat (`alat.js`) memakai butir yang sama dengan laporan, ditambah `ringkasan` ({baik, waspada, netral}) per bagian dan `tanda` pada butir tabel
(baris yang ditandai). Tabel jam memakai kelas `.tabel-bertumpuk`: tabel di layar lebar, kartu bertumpuk dengan label kolom di ponsel.
Bahan visual yang cocok untuk tim: garis waktu 06.00-18.00 dan 18.00-06.00 untuk Saat agung dan Siang dan malam (saat ini hanya tabel),
dan susunan dua kolom untuk Jodoh. Hati-hati dengan butir bernada berat (mis. "Salah satu meninggal" pada hitungan sisa empat): perlakuan visualnya harus tenang.
Pertimbangan yang terbuka: tanda merek (saat ini memakai cincin 30 garis milik Pawukon), gambar OG, dan cara memperkenalkan lapisan tafsir yang bisa
saling bertentangan.
