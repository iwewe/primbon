/**
 * Kesehatan menurut kitab Betaljemur Adammakna (bab 318-325). Hanya aturan dan atribut tradisi;
 * ramuan dan doa tidak dimasukkan (lihat catatan di src/data/kesehatan.js).
 * Hanya memakai hari dan pasaran, jadi tidak bergantung pada kalender Jawa.
 */
import { weton as hitungWeton } from './kalender.js';
import {
  PERINGATAN_MEDIS, SEBAB_NEPTU_5, TUBUH_HARI_LAHIR, ARAH_BEROBAT, LETAK_SAKIT_HARI, AWAL_SAKIT_HARI,
  SAKIT_PASARAN_LAHIR, SUMBER_SAKIT_NEPTU
} from './data/kesehatan.js';

export { PERINGATAN_MEDIS };

/** Atribut kesehatan menurut hari dan pasaran lahir (bab 319 dan 323). */
export function kesehatanLahir(inputLahir) {
  const w = hitungWeton(inputLahir);
  return {
    weton: w.weton,
    tubuhRawan: { ...TUBUH_HARI_LAHIR[w.hari], sumber: TUBUH_HARI_LAHIR.sumber },
    sakitMenurutPasaran: { sakit: SAKIT_PASARAN_LAHIR[w.pasaran], sumber: SAKIT_PASARAN_LAHIR.sumber },
    peringatan: PERINGATAN_MEDIS
  };
}

/** Tinjauan menurut hari pertama sakit (bab 318, 321, 322, 325). */
export function kesehatanSakit(inputMulaiSakit) {
  const w = hitungWeton(inputMulaiSakit);
  const total = w.neptu.total;
  const nomor5 = total % 5 || 5;
  const kunci325 = total > 12 ? total - 6 : total;
  return {
    weton: w.weton,
    neptu: total,
    sebabNeptu: { jumlah: total, nomor: nomor5, ...SEBAB_NEPTU_5[nomor5], asumsi: SEBAB_NEPTU_5.asumsi, sumber: SEBAB_NEPTU_5.sumber },
    letakSakit: { letak: LETAK_SAKIT_HARI[w.hari], sumber: LETAK_SAKIT_HARI.sumber },
    awalSakit: { ...AWAL_SAKIT_HARI[w.hari], keterangan: AWAL_SAKIT_HARI.keterangan, sumber: AWAL_SAKIT_HARI.sumber },
    sumberSakit: { jumlah: total, ...SUMBER_SAKIT_NEPTU[kunci325], sumberKitab: SUMBER_SAKIT_NEPTU.sumber },
    peringatan: PERINGATAN_MEDIS
  };
}

/** Arah yang dianjurkan untuk mencari pengobatan pada hari tertentu (bab 320). */
export function arahBerobat(inputHari) {
  const w = hitungWeton(inputHari);
  const tabel = ARAH_BEROBAT[w.hari];
  const arah = Object.entries(tabel).map(([a, nilai]) => ({ arah: a, nilai }));
  return {
    weton: w.weton,
    arah,
    dianjurkan: arah.filter(a => a.nilai === 'Waras').map(a => a.arah),
    dihindari: arah.filter(a => a.nilai === 'Lara' || a.nilai === 'Pati').map(a => a.arah),
    anjuran: ARAH_BEROBAT.anjuran,
    sumber: ARAH_BEROBAT.sumber,
    peringatan: PERINGATAN_MEDIS
  };
}
