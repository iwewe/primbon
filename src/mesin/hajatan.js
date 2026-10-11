/**
 * Hajatan menurut kitab Betaljemur Adammakna: bagian yang berupa hitungan (bab 39-42, 55-57, 65, 68-74).
 *
 * - hariTarub: tiga cara memilih hari memasang tarub (bab 39, 40, 41); saat memasangnya sama dengan akad (bab 42).
 * - tingkeb, cariTingkeb: hari selamatan tujuh bulan kehamilan (bab 56). jadwalKehamilan: bab 55-56.
 * - saatBayiLahir: jam bayi lahir (bab 57). namaBayi: kecocokan nama (bab 65).
 * - jadwalBayi: selamatan menurut usia (bab 68-74).
 *
 * Sajen, tata cara, busana, doa, dan penolak godaan tidak dimasukkan (ritual, bukan hitungan).
 * Aturan yang memakai tanggal Jawa bergantung kalender Jawa dan bisa bergeser sehari. Tafsir tradisional.
 */
import { weton as wetonDasar, kalenderJawa, nomorHari, isoDariNomor } from './kalender.js';

/** Weton beserta tanggal Masehi baku (weton() sendiri tidak memuatnya). */
const hitungWeton = (input) => ({ ...wetonDasar(input), masehi: isoDariNomor(nomorHari(input)) });
import { aksaraSemua } from './pernikahan.js';
import { NEPTU_AKSARA } from './data/pernikahan.js';
import {
  TARUB_NEPTU, TARUB_TANGGAL_5, TARUB_TANGGAL_7, TINGKEB, KEHAMILAN, BAYI_LAHIR_JAM, NAMA_BAYI, JADWAL_BAYI
} from './data/hajatan.js';

export const CATATAN_HAJATAN = 'Tafsir tradisional dari kitab Betaljemur Adammakna; bukan ramalan, dan bukan panduan kehamilan atau perawatan anak.';

// --- bab 39-42: tarub ---------------------------------------------------------------------------------------------------------
/** Tiga cara memilih hari memasang tarub. Pilih salah satu (kitab); saat memasang: lihat `saatNikah` (bab 42). */
export function hariTarub(input) {
  const k = kalenderJawa(input);
  const n = k.neptu.total;
  const dina = k.tanggal.dina;
  const bab39 = { jumlahNeptu: n, ...TARUB_NEPTU.tabel[n], sumber: TARUB_NEPTU.sumber };
  const g5 = TARUB_TANGGAL_5.tabel.find(x => x.tanggal.includes(dina));
  const bab40 = { tanggal: dina, ...g5, bergantungTanggalJawa: true, sumber: TARUB_TANGGAL_5.sumber };
  const g7 = TARUB_TANGGAL_7.tabel.find(x => x.tanggal.includes(dina));
  const bab41 = { tanggal: dina, ...g7, bergantungTanggalJawa: true, sumber: TARUB_TANGGAL_7.sumber, catatanCetak: TARUB_TANGGAL_7.catatanCetak };
  const ringkasan = { baik: 0, buruk: 0, netral: 0 };
  for (const m of [bab39, bab40, bab41]) ringkasan[m.arah] += 1;
  return {
    masehi: k.masehi, weton: k.weton, tanggalJawa: k.tanggal, spekulatif: k.spekulatif,
    metode: { bab39, bab40, bab41 }, ringkasan,
    saat: 'Saat memasang tarub sama dengan akad nikah (bab 42): pilih saat Slamet (baik) atau Rejeki (cukupan); lihat saatNikah().',
    catatan: CATATAN_HAJATAN
  };
}

// --- bab 56: tingkeb ----------------------------------------------------------------------------------------------------------------
/** Apakah tanggal ini memenuhi aturan hari tingkeb: Rabu atau Sabtu, tanggal Jawa ganjil sebelum 15. */
export function tingkeb(input) {
  const k = kalenderJawa(input);
  const hariOk = TINGKEB.hari.includes(k.hari);
  const tanggalOk = TINGKEB.tanggalJawa.includes(k.tanggal.dina);
  return {
    masehi: k.masehi, weton: k.weton, tanggalJawa: k.tanggal, hariOk, tanggalOk, memenuhi: hariOk && tanggalOk,
    bergantungTanggalJawa: true, spekulatif: k.spekulatif, asumsi: TINGKEB.asumsi, sumber: TINGKEB.sumber, catatan: CATATAN_HAJATAN
  };
}

/** Tanggal-tanggal yang memenuhi aturan tingkeb, mulai `dari` selama `hari` hari. */
export function cariTingkeb(dari, hari = 30) {
  const n0 = nomorHari(dari);
  const hasil = [];
  for (let i = 0; i < hari; i++) {
    const iso = isoDariNomor(n0 + i);
    if (tingkeb(iso).memenuhi) hasil.push(iso);
  }
  return hasil;
}

// --- aritmetika tanggal Masehi ---------------------------------------------------------------------------------------------------------
const hariDalamBulan = (y, m) => [31, (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];

/** Tambah `bulan` bulan kalender; tanggal dipangkas ke akhir bulan bila perlu (31 Januari + 1 bulan = 28/29 Februari). */
export function tambahBulan(input, bulan) {
  const [y, m, d] = isoDariNomor(nomorHari(input)).split('-').map(Number);
  const total = y * 12 + (m - 1) + bulan;
  const yy = Math.floor(total / 12);
  const mm = (total % 12) + 1;
  const dd = Math.min(d, hariDalamBulan(yy, mm));
  return `${String(yy).padStart(4, '0')}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;
}

const ringkasWeton = (iso) => { const w = hitungWeton(iso); return { masehi: w.masehi, weton: w.weton }; };

// --- bab 55-56: kehamilan -----------------------------------------------------------------------------------------------------------------
/** Tanggal selamatan tiap bulan kehamilan (bulan Masehi dari tanggal acuan) dan kandidat tingkeb. */
export function jadwalKehamilan(acuan) {
  const bulan = KEHAMILAN.bulan.map(b => {
    const tanggal = tambahBulan(acuan, b.bulan);
    return { ...b, ...ringkasWeton(tanggal), mendeking: KEHAMILAN.mendeking.includes(b.bulan) };
  });
  const tujuh = bulan[6].masehi;
  return {
    acuan: isoDariNomor(nomorHari(acuan)), bulan,
    tingkeb: {
      tanggalBulanKe7: tujuh, kandidat: cariTingkeb(tujuh, 30), bergantungTanggalJawa: true,
      asumsi: 'Kandidat dicari 30 hari sejak tanggal bulan ke-7; kitab tidak menyebut jangkauan.', sumber: TINGKEB.sumber
    },
    asumsi: KEHAMILAN.asumsi, makna: KEHAMILAN.makna, catatanBab128: KEHAMILAN.catatanBab128, sumber: KEHAMILAN.sumber, catatan: CATATAN_HAJATAN
  };
}

// --- bab 57: jam bayi lahir -----------------------------------------------------------------------------------------------------------------
/** Jam kelahiran yang dianggap baik menurut hari lahir (angka jam 12-an; berlaku siang dan malam). */
export function saatBayiLahir(input, jam) {
  const w = hitungWeton(input);
  const jam12 = BAYI_LAHIR_JAM.tabel[w.hari];
  const jam24 = [...new Set(jam12.flatMap(h => [h % 12, (h % 12) + 12]))].sort((a, b) => a - b); // 12 = 00 dan 12
  const hasil = {
    masehi: w.masehi, weton: w.weton, jam12, jam24,
    asumsi: BAYI_LAHIR_JAM.asumsi, catatanBanding: BAYI_LAHIR_JAM.catatanBanding, sumber: BAYI_LAHIR_JAM.sumber,
    catatan: CATATAN_HAJATAN
  };
  if (jam !== undefined) {
    if (typeof jam !== 'number' || !(jam >= 0 && jam < 24)) throw new RangeError(`jam tidak valid: ${jam}`);
    hasil.jam = jam;
    hasil.baik = jam24.includes(Math.floor(jam));
  }
  return hasil;
}

// --- bab 65: nama bayi ----------------------------------------------------------------------------------------------------------------------
/** Kecocokan nama bayi: neptu weton + neptu huruf nama (1-20) harus habis dibagi 5. */
export function namaBayi(lahir, nama) {
  const w = hitungWeton(lahir);
  const aksara = aksaraSemua(nama);
  const neptuHuruf = aksara.reduce((t, a) => t + NEPTU_AKSARA.urut.nilai[a], 0);
  const jumlah = w.neptu.total + neptuHuruf;
  const sisa = jumlah % 5;
  return {
    masehi: w.masehi, weton: w.weton, neptuWeton: w.neptu.total, nama: Array.isArray(nama) ? null : String(nama).trim(),
    aksara, neptuHuruf, jumlah, sisa, cocok: sisa === 0, arah: sisa === 0 ? 'baik' : 'netral',
    asumsi: NAMA_BAYI.asumsi, sumber: NAMA_BAYI.sumber, catatan: CATATAN_HAJATAN
  };
}

// --- bab 68-74: jadwal selamatan menurut usia ---------------------------------------------------------------------------------------------
/** Tanggal selamatan bayi dan rentang usia upacara anak, dari tanggal lahir. */
export function jadwalBayi(lahir) {
  const n0 = nomorHari(lahir);
  const iso0 = isoDariNomor(n0);
  const tahap = JADWAL_BAYI.hari.map(h => ({
    nama: h.nama, hariKe: h.hari, ...ringkasWeton(isoDariNomor(n0 + h.hari)), sumber: { bab: h.bab, halaman: h.halaman }
  }));
  const rentang = JADWAL_BAYI.rentang.map(r => {
    const geser = (x) => (x.bulan ? tambahBulan(iso0, x.bulan) : tambahBulan(iso0, x.tahun * 12));
    return { nama: r.nama, dari: geser(r.dari), sampai: geser(r.sampai), sumber: { bab: r.bab, halaman: r.halaman } };
  });
  return {
    lahir: { ...ringkasWeton(iso0) }, tahap, rentang,
    catatanWeton: 'Kelipatan 35 hari (selapan) jatuh pada weton yang sama dengan weton lahir; sepasar (5 hari) pada pasaran yang sama.',
    asumsi: JADWAL_BAYI.asumsi, sumber: JADWAL_BAYI.sumber, catatan: CATATAN_HAJATAN
  };
}
