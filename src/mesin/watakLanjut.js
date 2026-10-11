/**
 * Watak lanjutan menurut kitab Betaljemur Adammakna (bab 101-108, 111, 114-117).
 *
 * - watakTanggal: bab 101 dan 108 (tanggal Jawa). watakBulan: bab 102 dan 111. watakMangsa: bab 103.
 * - watakNeptu: bab 105, 106, 107, 116, dan 117 (jumlah neptu hari + pasaran). bintangHari: hari dan bulan jaya/malang bab 117.
 * - watakNama: bab 114 (huruf depan dan belakang). tinjauNama: bab 115 (baik-buruknya nama).
 * - watakWanitaWeton: bab 120 (bagian watak wanita menurut weton lahir).
 * - watakLanjut: gabungan untuk satu tanggal lahir (dan nama).
 *
 * Tafsir tradisional, bukan ramalan dan bukan penilaian psikologis. Bab yang memakai tanggal atau bulan Jawa bergantung
 * pada kalender Jawa (bisa bergeser sehari); mangsa memakai kalender pranata mangsa baku, bukan dari kitab.
 * Ciri tubuh (bab 112, 113, 119) belum dikodekan.
 */
import { kalenderJawa, nomorHari, isoDariNomor } from './kalender.js';
import { mangsaDari } from './rumah.js';
import { aksaraNama } from './pernikahan.js';
import {
  WATAK_TANGGAL, WATAK_BULAN, WATAK_MANGSA, WATAK_NEPTU, WATAK_SISA_9, WATAK_SISA_8, HARI_BINATANG, NASIB_BULAN,
  WATAK_NAMA_HURUF, NAMA_BAIK_BURUK, RAMALAN_NABI, PERBINTANGAN, WATAK_WANITA_WETON
} from './data/watakLanjut.js';

export const CATATAN_WATAK = 'Tafsir tradisional dari kitab Betaljemur Adammakna; bukan ramalan dan bukan penilaian psikologis.';

const sisa = (n, pembagi) => n % pembagi || pembagi;
const iso = (input) => isoDariNomor(nomorHari(input));

// --- tanggal, bulan, mangsa ----------------------------------------------------------------------------------------------------------------
/** Watak menurut tanggal Jawa (bab 101) dan "hari binatang" tanggal itu (bab 108). */
export function watakTanggal(input) {
  const k = kalenderJawa(input);
  const d = k.tanggal.dina;
  return {
    masehi: k.masehi, weton: k.weton, tanggalJawa: k.tanggal, spekulatif: k.spekulatif,
    bab101: { tanggal: d, ...WATAK_TANGGAL.tabel[d], sumber: WATAK_TANGGAL.sumber },
    bab108: { tanggal: d, ...HARI_BINATANG.tabel[d], catatan: HARI_BINATANG.catatan, sumber: HARI_BINATANG.sumber },
    bergantungTanggalJawa: true, catatan: CATATAN_WATAK
  };
}

/** Watak menurut bulan Jawa (bab 102) dan nasib bulan (bab 111). */
export function watakBulan(input) {
  const k = kalenderJawa(input);
  const b = k.tanggal.wulan;
  return {
    masehi: k.masehi, weton: k.weton, bulan: b, spekulatif: k.spekulatif,
    bab102: { ...WATAK_BULAN.tabel[b], sumber: WATAK_BULAN.sumber },
    bab111: { ...NASIB_BULAN.tabel[b], sumber: NASIB_BULAN.sumber },
    bergantungTanggalJawa: true, catatan: CATATAN_WATAK
  };
}

/** Watak menurut mangsa (bab 103); mangsa dari kalender pranata mangsa baku, bukan dari kitab. */
export function watakMangsa(input) {
  const m = mangsaDari(input);
  return {
    masehi: iso(input), mangsa: m, ...WATAK_MANGSA.tabel[m],
    asumsi: WATAK_MANGSA.asumsi, sumber: WATAK_MANGSA.sumber, catatan: CATATAN_WATAK
  };
}

// --- jumlah neptu ---------------------------------------------------------------------------------------------------------------------------
/** Bab 105, 106, 107, 116, 117: semuanya memakai jumlah neptu hari + pasaran kelahiran. */
export function watakNeptu(input) {
  const k = kalenderJawa(input);
  const n = k.neptu.total;
  const s9 = sisa(n, 9);
  const s8 = sisa(n, 8);
  return {
    masehi: k.masehi, weton: k.weton, jumlahNeptu: n,
    bab105: { ...WATAK_NEPTU.tabel[n], sumber: WATAK_NEPTU.sumber },
    bab106: { sisa: s9, ...WATAK_SISA_9.tabel[s9], asumsi: WATAK_SISA_9.asumsi, sumber: WATAK_SISA_9.sumber },
    bab107: { sisa: s8, ...WATAK_SISA_8.tabel[s8], sumber: WATAK_SISA_8.sumber },
    bab116: { ...RAMALAN_NABI.tabel[n], sumber: RAMALAN_NABI.sumber },
    bab117: { ...PERBINTANGAN.tabel[n], sumber: PERBINTANGAN.sumber, peringatan: PERBINTANGAN.peringatan },
    catatan: CATATAN_WATAK
  };
}

/** Apakah `tanggal` jatuh pada hari/bulan jaya atau malang bintang kelahiran (bab 117). Bulan: bulan Jawa pada tanggal itu. */
export function bintangHari(lahir, tanggal) {
  const l = kalenderJawa(lahir);
  const b = PERBINTANGAN.tabel[l.neptu.total];
  const t = kalenderJawa(tanggal);
  const cek = ([hari, bulan]) => {
    const h = t.hari === hari;
    const bl = t.tanggal.wulan === bulan;
    return { hari: h, bulan: bl, penuh: h && bl, rujukan: { hari, bulan } };
  };
  return {
    lahir: { masehi: l.masehi, weton: l.weton, jumlahNeptu: l.neptu.total, bintang: b.nama },
    tanggal: { masehi: t.masehi, weton: t.weton, tanggalJawa: t.tanggal },
    jaya: cek(b.jaya), malang: cek(b.malang),
    bergantungTanggalJawa: true, spekulatif: t.spekulatif,
    asumsi: PERBINTANGAN.asumsi, peringatan: PERBINTANGAN.peringatan, sumber: PERBINTANGAN.sumber, catatan: CATATAN_WATAK
  };
}

/** Bab 120 (bagian watak wanita menurut hari kelahiran): weton lahir seorang perempuan. Tafsir yang mencerminkan norma zamannya. */
export function watakWanitaWeton(lahir) {
  const k = kalenderJawa(lahir);
  return {
    masehi: k.masehi, weton: k.weton, ...WATAK_WANITA_WETON.tabel[k.weton],
    catatanKitab: WATAK_WANITA_WETON.catatan, sumber: WATAK_WANITA_WETON.sumber, catatan: CATATAN_WATAK
  };
}

// --- nama -----------------------------------------------------------------------------------------------------------------------------------
/** Bab 114: neptu + jem huruf depan dan belakang nama; hasil berulang tiap 21. Menerima nama atau { depan, belakang }. */
export function watakNama(nama) {
  const a = aksaraNama(nama);
  const jumlah = WATAK_NAMA_HURUF.jumlahAksara[a.depan] + WATAK_NAMA_HURUF.jumlahAksara[a.belakang];
  const kunci = ((jumlah - 5) % 21) + 5;
  return {
    nama: a.nama, depan: a.depan, belakang: a.belakang, jumlah, kunci, ...WATAK_NAMA_HURUF.tabel[kunci],
    asumsi: [...a.asumsi, WATAK_NAMA_HURUF.asumsi], sumber: WATAK_NAMA_HURUF.sumber, catatan: CATATAN_WATAK
  };
}

const KOMPONEN = Object.entries(NAMA_BAIK_BURUK.tingkat)
  .flatMap(([tingkat, daftar]) => daftar.map(n => ({ nama: n, kunci: n.toLowerCase(), tingkat })))
  .sort((a, b) => b.kunci.length - a.kunci.length);

/** Bab 115: baik-buruknya nama menurut komponen yang dikenal (pencarian terpanjang dahulu; perkiraan). */
export function tinjauNama(nama) {
  const teks = String(nama).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z]/g, '');
  if (!teks) throw new RangeError('nama kosong');
  const komponen = [];
  for (let i = 0; i < teks.length;) {
    const k = KOMPONEN.find(x => teks.startsWith(x.kunci, i));
    if (k) { komponen.push({ nama: k.nama, tingkat: k.tingkat }); i += k.kunci.length; } else i++;
  }
  const ada = (t) => komponen.some(k => k.tingkat === t);
  const aturan = [];
  let arah = null;
  if (komponen.length) {
    if (ada('tidakBaik')) { arah = 'buruk'; aturan.push(NAMA_BAIK_BURUK.aturan.tidakBaik); }
    if (ada('kurangBaik')) { arah = 'buruk'; aturan.push(NAMA_BAIK_BURUK.aturan.kurangBaik); }
    if (ada('baik') && (ada('kurangBaik') || ada('tidakBaik'))) aturan.push(NAMA_BAIK_BURUK.aturan.baikDenganKurangAtauTidak);
    if (arah === null) {
      if (ada('baik')) {
        arah = 'baik';
        aturan.push(komponen.every(k => k.tingkat === 'baik') ? NAMA_BAIK_BURUK.aturan.baikDenganBaik : NAMA_BAIK_BURUK.aturan.baikDenganSedang);
      } else arah = 'netral';
    }
    if (arah !== 'baik') aturan.push(NAMA_BAIK_BURUK.aturan.saran);
  }
  return {
    nama: String(nama).trim(), komponen, arah, aturan,
    asumsi: 'Komponen dikenali dari daftar kitab dengan pencarian terpanjang dahulu; nama lain tidak dinilai. Bisa keliru pada nama yang kebetulan memuat komponen itu.',
    catatanKitab: NAMA_BAIK_BURUK.catatan, sumber: NAMA_BAIK_BURUK.sumber, catatan: CATATAN_WATAK
  };
}

// --- gabungan ---------------------------------------------------------------------------------------------------------------------------------
/** Semua watak untuk satu tanggal lahir, dan bila `nama` diberikan, bab 114 dan 115. */
export function watakLanjut(lahir, { nama } = {}) {
  const hasil = {
    tanggal: watakTanggal(lahir), bulan: watakBulan(lahir), mangsa: watakMangsa(lahir), neptu: watakNeptu(lahir),
    catatan: CATATAN_WATAK
  };
  if (nama) { hasil.nama = watakNama(nama); hasil.baikBurukNama = tinjauNama(nama); }
  return hasil;
}
