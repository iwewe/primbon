/**
 * Bepergian menurut kitab Betaljemur Adammakna (bab 130-141, 143-145, 151-156).
 *
 * - tinjauBepergian: arah yang dihindari/dianjurkan (naga, kala, hidup-mati), waktu (kala/baya, sa'at, na'as).
 * - pindahKediaman: bab 151. menghadapPejabat: bab 153.
 *
 * Tafsir tradisional. Aturan yang memakai bulan atau tanggal Jawa ditandai `bergantungTanggalJawa` (bisa bergeser
 * sehari menurut kalender yang dipakai). Aturan yang memakai hari, pasaran, atau jumlah neptu tidak bergantung.
 * "Naga", "kala", dan "rijalolah" adalah istilah kitab untuk arah yang dihindari atau dihormati; mesin hanya
 * melaporkannya.
 */
import { weton as wetonDasar, kalenderJawa, nomorHari, isoDariNomor } from './kalender.js';

/** Weton beserta tanggal Masehi baku (weton() sendiri tidak memuatnya). */
const hitungWeton = (input) => ({ ...wetonDasar(input), masehi: isoDariNomor(nomorHari(input)) });
import { URUTAN_BAB_104 } from './data/neptu.js';
import {
  NAGA_HARI, NAGA_NEPTU, NAGA_BULAN, NAGA_TAHUN, JATINGARANG, NAGA_SATU_TEMPAT, NAGA_BAGIAN, RIJALOLAH_TANGGAL,
  BEPERGIAN_JAUH, NAAS_HARI, BAYANGAN, SAAT_NEPTU, PINDAH_KEDIAMAN, ARAH_PINDAH_DILARANG, MENGHADAP_PEJABAT,
  HIDUP_MATI_HARI, ARAH_NAFKAH_NEPTU, ARAH_WETON
} from './data/bepergian.js';

export const CATATAN_BEPERGIAN = 'Tafsir tradisional dari kitab Betaljemur Adammakna; bukan ramalan dan bukan pengganti pertimbangan keselamatan perjalanan.';

const berputar = (n, banyak) => n % banyak || banyak;

/**
 * Tinjauan bepergian untuk satu tanggal. `tujuan` (opsional: Utara, Timur, Selatan, Barat, atau arah antara)
 * menambahkan `penilaianTujuan` yang merangkum temuan untuk arah itu.
 */
export function tinjauBepergian(input, { tujuan } = {}) {
  const k = kalenderJawa(input);
  const { hari, pasaran, weton: namaWeton } = k;
  const n = k.neptu.total;
  const { wulan, dina } = k.tanggal;
  const arah = [];
  const tambah = (a, jenis, nilai, ringkas, sumber, bergantungTanggalJawa = false) =>
    arah.push({ arah: a, jenis, nilai, ringkas, sumber, bergantungTanggalJawa });

  // Naga: kitab melarang menuju kediaman naga (bab 136, catatan). Kediaman rijalolah: hanya dilaporkan.
  for (const a of NAGA_HARI.naga[hari]) tambah(a, 'naga hari', 'buruk', 'kediaman naga hari', NAGA_HARI.sumber);
  for (const a of NAGA_HARI.rijalolah[hari]) tambah(a, 'rijalolah hari', 'netral', 'kediaman rijalolah hari', NAGA_HARI.sumber);
  tambah(NAGA_HARI.pekan[pasaran], 'naga pekan', 'buruk', 'kediaman naga pekan', NAGA_HARI.sumber);
  tambah(NAGA_NEPTU.tabel[n], 'naga neptu', 'buruk', `kediaman naga menurut jumlah neptu ${n}`, NAGA_NEPTU.sumber);
  tambah(NAGA_BULAN.tabel[wulan], 'naga bulan', 'buruk', `kediaman naga bulan ${wulan}`, NAGA_BULAN.sumber, true);
  tambah(NAGA_TAHUN.tabel[wulan], 'naga tahun', 'buruk', `kediaman naga tahun (bulan ${wulan})`, NAGA_TAHUN.sumber, true);
  tambah(JATINGARANG.tabel[wulan], 'jatingarang', 'buruk', `kediaman jatingarang (bulan ${wulan})`, JATINGARANG.sumber, true);
  const satu = NAGA_SATU_TEMPAT.tabel[wulan];
  if (satu) tambah(satu, 'naga tahun dan jatingarang sekaligus', 'buruk', 'naga tahun dan jatingarang berada di satu arah; kitab menyebutnya sering berakibat kematian', NAGA_SATU_TEMPAT.sumber, true);
  const kel = NAGA_BAGIAN.kelompok.find(g => g.bulan.includes(wulan));
  for (const [bagian, a] of Object.entries(kel.arah)) {
    tambah(a, `bagian naga: ${bagian.toLowerCase()}`, NAGA_BAGIAN.makna[bagian] === 'baik' ? 'baik' : 'buruk',
      `${bagian} naga tahun di arah ini (bulan ${wulan})`, NAGA_BAGIAN.sumber, true);
  }
  const rij = RIJALOLAH_TANGGAL.tabel.find(t => t.tanggal.includes(dina));
  tambah(rij.arah, 'rijalolah tanggal', 'netral', `rijalolah tanggal ${dina} (memanggul ${rij.memanggul})`, RIJALOLAH_TANGGAL.sumber, true);

  // Kala (bab 141), arah dilarang pindah (152), hidup/mati (154), hidup-mati menurut neptu (155), nafkah (156).
  tambah(BEPERGIAN_JAUH.arahKala[n], 'kala', 'buruk', 'arah tempat Kala; jangan berangkat ke sini', BEPERGIAN_JAUH.sumber);
  tambah(ARAH_PINDAH_DILARANG.tabel[n], 'dilarang untuk pindah', 'buruk', 'arah yang tidak dianjurkan untuk pindah', ARAH_PINDAH_DILARANG.sumber);
  const hm = HIDUP_MATI_HARI.tabel[hari];
  for (const a of hm.hidup) tambah(a, 'hari hidup', 'baik', 'arah hidup untuk mencari nafkah', HIDUP_MATI_HARI.sumber);
  for (const a of hm.dilarang) tambah(a, 'hari dilarang', 'buruk', 'arah yang dilarang untuk mencari nafkah', HIDUP_MATI_HARI.sumber);
  for (const a of hm.mati) tambah(a, 'hari mati', 'buruk', 'arah mati untuk mencari nafkah', HIDUP_MATI_HARI.sumber);
  for (const [a, h] of Object.entries(ARAH_NAFKAH_NEPTU.tabel[n])) {
    tambah(a, `nafkah menurut neptu: ${h.toLowerCase()}`, ARAH_NAFKAH_NEPTU.baik.includes(h) ? 'baik' : 'buruk',
      `arah ${h.toLowerCase()} untuk mencari sandang pangan`, ARAH_NAFKAH_NEPTU.sumber);
  }
  for (const [a, daftar] of Object.entries(ARAH_WETON.tabel)) {
    if (daftar.includes(namaWeton)) tambah(a, 'arah berjualan menurut weton', 'baik', 'arah yang dianjurkan untuk berjualan atau mencari nafkah', ARAH_WETON.sumber);
  }

  const urut = berputar(n, 5);
  const waktu = {
    kalaBaya: {
      jumlahNeptu: n, nama: BEPERGIAN_JAUH.nama[urut], baik: BEPERGIAN_JAUH.baik.includes(BEPERGIAN_JAUH.nama[urut]),
      asumsi: BEPERGIAN_JAUH.asumsi, sumber: BEPERGIAN_JAUH.sumber
    },
    saat: { jumlahNeptu: n, ...SAAT_NEPTU.tabel[n], catatan: SAAT_NEPTU.catatan, sumber: SAAT_NEPTU.sumber },
    naas: { ...NAAS_HARI.tabel[hari], sumber: NAAS_HARI.sumber },
    bayanganKaki: { panjang: BAYANGAN.tabel[hari], sumber: BAYANGAN.sumber }
  };
  if (namaWeton === 'Rabu Kliwon' || namaWeton === 'Rabu Legi') waktu.anomaliCetak = ARAH_WETON.anomali;

  const hasil = {
    masehi: k.masehi, weton: namaWeton, jumlahNeptu: n, tanggalJawa: k.tanggal, spekulatif: k.spekulatif,
    arah, waktu, catatan: CATATAN_BEPERGIAN
  };
  if (tujuan) {
    const t = String(tujuan);
    const cocok = arah.filter(x => x.arah === t);
    const hitung = (nilai) => cocok.filter(x => x.nilai === nilai);
    hasil.penilaianTujuan = {
      tujuan: t, baik: hitung('baik'), buruk: hitung('buruk'), netral: hitung('netral'),
      ringkasan: { baik: hitung('baik').length, buruk: hitung('buruk').length, netral: hitung('netral').length }
    };
  }
  return hasil;
}

/** Bab 151: berpindah kediaman, dengan urutan bilangan khusus kitab. */
export function pindahKediaman(input) {
  const w = hitungWeton(input);
  const jumlah = URUTAN_BAB_104.hari[w.hari] + URUTAN_BAB_104.pasaran[w.pasaran];
  const nomor = berputar(jumlah, 6);
  return {
    masehi: w.masehi, weton: w.weton, jumlah, nomor, ...PINDAH_KEDIAMAN.nama[nomor],
    asumsi: PINDAH_KEDIAMAN.asumsi, sumber: PINDAH_KEDIAMAN.sumber, catatan: CATATAN_BEPERGIAN
  };
}

/** Bab 153: menghadap pejabat menurut tanggal Jawa. */
export function menghadapPejabat(input) {
  const k = kalenderJawa(input);
  const t = MENGHADAP_PEJABAT.tabel.find(x => x.tanggal.includes(k.tanggal.dina));
  return {
    masehi: k.masehi, weton: k.weton, tanggalJawa: k.tanggal, nama: t.nama, arah: t.arah, ringkas: t.ringkas,
    bergantungTanggalJawa: true, spekulatif: k.spekulatif, sumber: MENGHADAP_PEJABAT.sumber, catatan: CATATAN_BEPERGIAN
  };
}
