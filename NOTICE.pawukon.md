# Rujukan dan kredit

Proyek ini berlisensi MIT (lihat [LICENSE](LICENSE)). Seluruh kode ditulis ulang dalam JavaScript; tidak ada kode sumber
pihak lain yang disalin.

**Algoritma kalender.** Logika perhitungan di `src/kalender.js` (tabel windu/taun/kurup, rumus wuku, pasaran, dan aturan
hari mulia) merujuk pada cara kerja `weton.m` karya François Beauducel (https://github.com/beaudu/weton) dan artikel
Karjanto & Beauducel (2020). Rujukan ini dicantumkan sebagai kredit; kodenya independen dan diuji terhadap port Python
pada 3344 tanggal.

**Data tafsir.** Fakta (angka, nama, pasangan, arah, urutan) berasal dari kitab Betaljemur Adammakna (terjemahan Indonesia
modern). Kalimat makna ditulis ulang dengan kata sendiri dan tidak disalin; teks OCR mentah tidak disertakan. Lihat bagian
"Cara menulis data" pada [Asumsi dan anomali](docs/ilmiah/ASUMSI_DAN_ANOMALI.md).

**Kalender Keraton.** Tabel awal bulan kurup Aboge dan Asapon (`tests/data-kraton.js`) dan tanggal Almanak Jawa serta kalender Keraton pada Tabel 6-15 (`tests/data-almanak.js`) berasal dari Siti Marhamah, *Kalender Jawa Islam
Sultan Agungan di Kesultanan Yogyakarta* (Tesis, UIN Walisongo Semarang, 2022), yang mengutip KRT Rintaiswara (2015). Dipakai sebagai data uji; fakta tanggal, bukan teks.

**Pembanding.** `research-system-javanese-profile` (MIT) dan `almanak` dipakai hanya sebagai pembanding hasil, bukan sumber kode.
