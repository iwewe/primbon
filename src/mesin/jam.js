/**
 * Tabel jam (saat) menurut kitab Betaljemur Adammakna: bab 34-37, 146-149, 157-158, 162, 164-166.
 *
 * - saatAgung, hariMenurutJam, jamDihindari: siklus 12 jam bab 147-149.
 * - saat12: bab 146 (neptu hari + pasaran, siang dan malam).
 * - saatBintang: bab 162 (kode per jam). jamSialBaik: bab 157. saatMalaikat: bab 158.
 * - saatPerkara: bab 164-165 (berangkat ke pengadilan, berunding, menyeberang laut).
 * - saatNikah, suhara, akadTigaJenis: bab 34-37 (hari dan jam akad).
 *
 * Tafsir tradisional. Fungsi yang memakai tanggal Jawa (saatNikah, akadTigaJenis) bergantung pada kalender
 * Jawa dan bisa bergeser sehari; sisanya hanya memakai hari, pasaran, dan jumlah neptu.
 * Jam memakai 24 jam. Kitab menulis jam 12-an (1-5 = 13-17); lihat `asumsi` di data.
 */
import { weton as wetonDasar, kalenderJawa, nomorHari, isoDariNomor } from './kalender.js';

/** Weton beserta tanggal Masehi baku (weton() sendiri tidak memuatnya). */
const hitungWeton = (input) => ({ ...wetonDasar(input), masehi: isoDariNomor(nomorHari(input)) });
import {
  URUTAN_MINGGU, LAMA_SAAT, SAAT_AGUNG, HARI_MENURUT_JAM, JAM_DIHINDARI, SAAT_12, JAM_SIAL_BAIK, SAAT_MALAIKAT,
  SAAT_BINTANG, SAAT_PERKARA, SAAT_PENGADILAN, BATAS_SAAT_MENIT, KELOMPOK_TANGGAL_NAMA, SAAT_PENJAGA,
  SAAT_NIKAH_PASARAN, SAAT_NIKAH_TANGGAL, SUHARA, AKAD_TIGA_JENIS, jam24
} from './data/jam.js';

export const CATATAN_JAM = 'Tafsir tradisional dari kitab Betaljemur Adammakna; bukan ramalan dan bukan nasihat profesional.';

/** Jam dalam desimal dari angka (jam, boleh pecahan) atau teks "HH:MM". */
export function jamDesimal(jam) {
  if (typeof jam === 'number' && Number.isFinite(jam) && jam >= 0 && jam < 24) return jam;
  const m = typeof jam === 'string' && /^(\d{1,2}):(\d{2})$/.exec(jam.trim());
  if (m && +m[1] < 24 && +m[2] < 60) return +m[1] + +m[2] / 60;
  throw new RangeError(`jam tidak valid: ${jam}`);
}

const teksJam = (menit) => {
  const m = Math.round(menit);
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};

// --- siklus 12 jam (bab 147-149, 164, 165) -----------------------------------------------------------------------
/** Tujuh saat hari itu mulai jam 06.00; saat ke-d (Minggu = 0) jatuh pada jam 06.00 untuk hari ke-d. */
export function siklusHari(namaHari) {
  const d = URUTAN_MINGGU.indexOf(namaHari);
  if (d < 0) throw new RangeError(`hari tidak dikenal: ${namaHari}`);
  const hasil = [];
  let t = 6;
  for (let i = 0; i < 7; i++) {
    const tipe = (d + i) % 7;
    hasil.push({ tipe, mulai: t, selesai: t + LAMA_SAAT[tipe] });
    t += LAMA_SAAT[tipe];
  }
  return hasil;
}

const dalam = (j, s) => j >= s.mulai && j < s.selesai;

/** Tujuh saat agung hari itu (bab 147), berurutan menurut waktu mulai 06.00. */
export function saatAgung(input) {
  const w = hitungWeton(input);
  const saat = siklusHari(w.hari).map(s => {
    const nama = SAAT_AGUNG.nama[s.tipe];
    return {
      nama, mulai: s.mulai, selesai: s.selesai, arah: SAAT_AGUNG.arah[nama], makna: SAAT_AGUNG.makna[nama]
    };
  });
  return { masehi: w.masehi, weton: w.weton, saat, sumber: SAAT_AGUNG.sumber, catatan: CATATAN_JAM };
}

/** Saat agung yang sedang berlaku pada jam tertentu; null di luar 06.00-18.00 (kitab tidak mengaturnya). */
export function saatAgungDi(input, jam) {
  const j = jamDesimal(jam);
  const r = saatAgung(input);
  const s = r.saat.find(x => dalam(j, x));
  return { masehi: r.masehi, weton: r.weton, jam: j, saat: s ?? null, sumber: r.sumber, catatan: CATATAN_JAM };
}

/** Bab 148: pada jam tertentu, jam itu dihitung masuk hari apa. Null di luar 06.00-18.00. */
export function hariMenurutJam(input, jam) {
  const j = jamDesimal(jam);
  const w = hitungWeton(input);
  const s = siklusHari(w.hari).find(x => dalam(j, x));
  return {
    masehi: w.masehi, weton: w.weton, jam: j,
    masukHari: s ? URUTAN_MINGGU[s.tipe] : null,
    sumber: HARI_MENURUT_JAM.sumber, catatan: HARI_MENURUT_JAM.catatan
  };
}

/** Bab 149: dua jam yang dihindari (saat Lara dan Pati, masing-masing satu jam). */
export function jamDihindari(input) {
  const r = saatAgung(input);
  return {
    masehi: r.masehi, weton: r.weton,
    jam: r.saat.filter(s => s.nama === 'Lara' || s.nama === 'Pati').map(s => ({ nama: s.nama, mulai: s.mulai, selesai: s.selesai })),
    sumber: JAM_DIHINDARI.sumber, sumberSerupa: JAM_DIHINDARI.serupa, catatan: CATATAN_JAM
  };
}

// --- bab 146: saat 12 --------------------------------------------------------------------------------------------
function tafsirSaat12(neptu, bagian) {
  const baris = SAAT_12[bagian].tabel[neptu];
  return SAAT_12[bagian].kolom.map((k, i) => ({
    nama: k.nama, mulai: k.jam[0], selesai: k.jam[1], saat: baris[i], arah: SAAT_12.arah[baris[i]]
  }));
}

/** Saat 12 untuk bepergian atau bercocok tanam (bab 146). Jam malam melewati tengah malam ditulis > 24. */
export function saat12(input) {
  const w = hitungWeton(input);
  const n = w.neptu.total;
  return {
    masehi: w.masehi, weton: w.weton, jumlahNeptu: n,
    siang: tafsirSaat12(n, 'siang'), malam: tafsirSaat12(n, 'malam'),
    catatanCetak: n === 9 ? SAAT_12.catatanCetak : undefined,
    sumber: SAAT_12.sumber, catatan: CATATAN_JAM
  };
}

/** Saat 12 pada jam tertentu (siang 06-18, malam 18-06 hari berikutnya; jam sebelum 06.00 dihitung malam semalam). */
export function saat12Di(input, jam) {
  const j = jamDesimal(jam);
  const r = saat12(input);
  const jj = j < 6 ? j + 24 : j;
  const s = [...r.siang, ...r.malam].find(x => jj >= x.mulai && jj < x.selesai) ?? null;
  return { masehi: r.masehi, weton: r.weton, jam: j, saat: s, sumber: r.sumber, catatan: CATATAN_JAM };
}

// --- bab 162: saat menurut ketentuan bintang ----------------------------------------------------------------------
/** Kode saat untuk 12 jam hari itu (06.00-17.00); `jam` opsional memilih satu jam penuh. */
export function saatBintang(input, jam) {
  const w = hitungWeton(input);
  const kode = SAAT_BINTANG.tabel[w.hari];
  const daftar = kode.map((k, i) => {
    const mulai = jam24(i < 7 ? i + 6 : i - 6);
    return { mulai, selesai: mulai + 1, kode: k, ...SAAT_BINTANG.kode[k] };
  });
  const dasar = { masehi: w.masehi, weton: w.weton, sumber: SAAT_BINTANG.sumber, catatan: CATATAN_JAM };
  if (jam === undefined) return { ...dasar, saat: daftar };
  const j = Math.floor(jamDesimal(jam));
  return { ...dasar, jam: j, saat: daftar.find(x => x.mulai === j) ?? null };
}

// --- bab 157: jam sial dan baik ---------------------------------------------------------------------------------------
export function jamSialBaik(input) {
  const w = hitungWeton(input);
  const t = JAM_SIAL_BAIK.tabel[w.hari];
  return {
    masehi: w.masehi, weton: w.weton,
    sial: t.sial.flat().map(jam24), baik: t.baik.map(jam24),
    anomali: w.hari === 'Selasa' ? JAM_SIAL_BAIK.anomali : undefined,
    asumsi: JAM_SIAL_BAIK.asumsi, sumber: JAM_SIAL_BAIK.sumber, catatan: CATATAN_JAM
  };
}

// --- bab 158: lima saat berpenjaga ------------------------------------------------------------------------------------
export function saatMalaikat(input) {
  const w = hitungWeton(input);
  const t = SAAT_MALAIKAT.tabel[w.hari];
  const saat = Object.entries(t).map(([nama, jam]) => ({
    nama, jam: jam.map(jam24).sort((a, b) => a - b), ...SAAT_MALAIKAT.makna[nama]
  }));
  return {
    masehi: w.masehi, weton: w.weton, saat, asumsi: SAAT_MALAIKAT.asumsi, sumber: SAAT_MALAIKAT.sumber,
    catatan: CATATAN_JAM
  };
}

// --- bab 164-165: saat perkara ----------------------------------------------------------------------------------------
/**
 * Saat untuk perundingan/menyeberang laut (bab 165). Untuk berangkat ke pengadilan (bab 164) kitab memakai
 * siklus yang sama dengan saat Tangguh ditulis Cidra; kolom `pengadilan` memuat nama dan penilaiannya.
 */
export function saatPerkara(input) {
  const w = hitungWeton(input);
  const saat = siklusHari(w.hari).map(s => {
    const nama = SAAT_PERKARA.nama[s.tipe];
    const namaPengadilan = nama === 'Tangguh' ? 'Cidra' : nama;
    return {
      nama, mulai: s.mulai, selesai: s.selesai, arah: SAAT_PERKARA.arah[nama], tingkat: SAAT_PERKARA.tingkat[nama],
      pengadilan: { nama: namaPengadilan, baikUntukBerangkat: SAAT_PENGADILAN.baik.includes(namaPengadilan) }
    };
  });
  return {
    masehi: w.masehi, weton: w.weton, saat,
    sumber: [SAAT_PERKARA.sumber, SAAT_PENGADILAN.sumber], catatan: CATATAN_JAM
  };
}

// --- bab 35, 36, 166: saat akad menurut tanggal Jawa dan pasaran ------------------------------------------------------
/** Penjaga lima saat (Ahmad, Jibrail, ...) menurut kelompok tanggal 1-5; indeks 0-4. */
export const kelompokTanggal = (dina) => ((dina - 1) % 5) + 1;
const penjagaSaat = (g) => Array.from({ length: 5 }, (_, s) => KELOMPOK_TANGGAL_NAMA[(g - 1 + s) % 5]);

/** Lima saat akad nikah: penjaga (bab 166), saat menurut pasaran (bab 35), dan saat menurut tanggal (bab 36). */
export function saatNikah(input) {
  const k = kalenderJawa(input);
  const g = kelompokTanggal(k.tanggal.dina);
  const penjaga = penjagaSaat(g);
  const sub35 = SAAT_NIKAH_PASARAN.baris[k.pasaran];
  const sub36 = SAAT_NIKAH_TANGGAL.cetak[g];
  const saat = penjaga.map((p, s) => ({
    mulai: teksJam(BATAS_SAAT_MENIT[s]), selesai: teksJam(BATAS_SAAT_MENIT[s + 1]),
    penjaga: p, penjagaMakna: SAAT_PENJAGA.makna[p],
    menurutPasaran: { nama: sub35[s], ...SAAT_NIKAH_PASARAN.penilaian[sub35[s]] },
    menurutTanggal: { nama: sub36[s][1], ...SAAT_NIKAH_TANGGAL.penilaian[sub36[s][1]] }
  }));
  return {
    masehi: k.masehi, weton: k.weton, tanggalJawa: k.tanggal, kelompokTanggal: g, saat,
    bergantungTanggalJawa: true, spekulatif: k.spekulatif,
    sumber: [SAAT_NIKAH_PASARAN.sumber, SAAT_NIKAH_TANGGAL.sumber, SAAT_PENJAGA.sumber],
    catatan: `${CATATAN_JAM} Saat lain di luar yang baik atau cukupan dianggap jelek oleh kitab.`
  };
}

/** Saat akad menurut terbitnya bintang Suhara (bab 37); jam > 24 jatuh pada dini hari berikutnya. */
export function suhara(input) {
  const w = hitungWeton(input);
  return {
    masehi: w.masehi, weton: w.weton, ...SUHARA.tabel[w.hari],
    catatanCetak: w.hari === 'Sabtu' ? SUHARA.catatanCetak : undefined,
    sumber: SUHARA.sumber, catatan: CATATAN_JAM
  };
}

// --- bab 34: akad tiga jenis -----------------------------------------------------------------------------------------
const nilaiAkad = (teks) => (AKAD_TIGA_JENIS.arah.baik.includes(teks) ? 'baik' : AKAD_TIGA_JENIS.arah.buruk.includes(teks) ? 'buruk' : 'netral');

/** Urutan hari itu dalam bulan Jawa (1-5) dan hasil pada tiga jenis tabel bab 34. */
export function akadTigaJenis(input) {
  const k = kalenderJawa(input);
  const urutan = Math.ceil(k.tanggal.dina / 7);
  const baris = AKAD_TIGA_JENIS.baris.indexOf(k.hari);
  const jenis = Object.fromEntries(['I', 'II', 'III'].map(j => {
    const teks = AKAD_TIGA_JENIS.tabel[j][baris][urutan - 1];
    return [j, { istilah: teks, arah: nilaiAkad(teks) }];
  }));
  return {
    masehi: k.masehi, weton: k.weton, tanggalJawa: k.tanggal, urutanHariDalamBulan: urutan, jenis,
    semuaHarja: Object.values(jenis).every(x => x.istilah === 'Harja'),
    bergantungTanggalJawa: true, spekulatif: k.spekulatif,
    asumsi: AKAD_TIGA_JENIS.asumsi, anjuran: AKAD_TIGA_JENIS.anjuran, sumber: AKAD_TIGA_JENIS.sumber,
    catatan: CATATAN_JAM
  };
}
