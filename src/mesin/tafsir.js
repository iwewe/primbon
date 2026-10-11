/**
 * Tafsir kelahiran dan jodoh berdasarkan kitab Betaljemur Adammakna.
 *
 * Datanya ada di src/data/ (lengkap dengan rujukan bab dan halaman scan). Semua keluaran adalah
 * tafsir tradisional, bukan fakta ilmiah.
 */
import { weton as hitungWeton } from './kalender.js';
import { rezeki } from './rezeki.js';
import { kesehatanLahir } from './kesehatan.js';
import { KEDUDUKAN } from './data/kedudukan.js';
import { URUTAN_BAB_104 } from './data/neptu.js';
import { WATAK_HARI, WATAK_PASARAN, WATAK_WETON, WATAK_SISA_7, WATAK_WUKU } from './data/watak.js';
import { JODOH_SISA_9, JODOH_SISA_4, JODOH_HARI } from './data/jodoh.js';

export const CATATAN = 'Tafsir tradisional dari kitab Betaljemur Adammakna, ditulis ulang. Pakailah sebagai bahan renungan, bukan kepastian.';

const sisa = (n, pembagi) => n % pembagi || pembagi; // sisa 0 dibaca sebagai pembagi (konvensi)

export function tafsirLahir(input) {
  const w = hitungWeton(input);
  const jumlah7 = URUTAN_BAB_104.hari[w.hari] + URUTAN_BAB_104.pasaran[w.pasaran];
  const nomor7 = sisa(jumlah7, 7);
  const wetonWatak = WATAK_WETON[w.weton];
  const wuku = WATAK_WUKU[w.wuku];

  return {
    weton: w.weton,
    hari: w.hari,
    pasaran: w.pasaran,
    neptu: w.neptu,
    kedudukan: { hari: KEDUDUKAN.hari[w.hari], pasaran: KEDUDUKAN.pasaran[w.pasaran] },
    watak: {
      hari: { ...WATAK_HARI[w.hari] },
      pasaran: { ...WATAK_PASARAN[w.pasaran] },
      weton: { ...wetonWatak },
      sisa7: { jumlah: jumlah7, nomor: nomor7, ...WATAK_SISA_7[nomor7] },
      wuku: { nama: w.wuku, ...wuku }
    },
    rezeki: rezeki(input),
    kesehatan: kesehatanLahir(input),
    sumber: [
      { topik: 'kedudukan hari dan pasaran', ...KEDUDUKAN.sumber },
      { topik: 'watak menurut hari', ...WATAK_HARI.sumber },
      { topik: 'watak menurut pasaran', ...WATAK_PASARAN.sumber },
      { topik: 'watak menurut weton', ...WATAK_WETON.sumber },
      { topik: 'watak menurut neptu (sisa 7)', ...WATAK_SISA_7.sumber },
      { topik: 'watak menurut wuku', ...WATAK_WUKU.sumber }
    ],
    catatan: CATATAN
  };
}

const urutHari = (a, b) => {
  const u = JODOH_HARI.urutanHari;
  return u.indexOf(a) <= u.indexOf(b) ? [a, b] : [b, a];
};

/**
 * Kecocokan dua orang dengan tiga metode kitab. Urutan A/B tidak memengaruhi hasil.
 * @param {*} inputA tanggal lahir orang pertama (format apa pun yang diterima nomorHari)
 * @param {*} inputB tanggal lahir orang kedua
 */
export function jodoh(inputA, inputB) {
  const a = hitungWeton(inputA);
  const b = hitungWeton(inputB);

  // Bab 15: sisa neptu (hari + pasaran) masing-masing dibagi 9
  const sa = sisa(a.neptu.total, 9);
  const sb = sisa(b.neptu.total, 9);
  const kunci9 = `${Math.min(sa, sb)}&${Math.max(sa, sb)}`;
  const bab15 = { sisaA: sa, sisaB: sb, kunci: kunci9, ...JODOH_SISA_9.tabel[kunci9], sumber: JODOH_SISA_9.sumber };

  // Bab 16: jumlah kedua neptu dibagi 4
  const jumlah = a.neptu.total + b.neptu.total;
  const s4 = sisa(jumlah, 4);
  const bab16 = { jumlah, sisa: s4, ...JODOH_SISA_4.tabel[s4], sumber: JODOH_SISA_4.sumber };

  // Bab 17: pasangan hari lahir
  const [h1, h2] = urutHari(a.hari, b.hari);
  const kunciHari = `${h1}&${h2}`;
  const bab17 = { kunci: kunciHari, ...JODOH_HARI.tabel[kunciHari], sumber: JODOH_HARI.sumber };

  const hitung = { baik: 0, buruk: 0, netral: 0 };
  for (const m of [bab15, bab16, bab17]) hitung[m.arah] += 1;

  return {
    a: { weton: a.weton, neptu: a.neptu.total },
    b: { weton: b.weton, neptu: b.neptu.total },
    metode: { sisa9: bab15, sisa4: bab16, hari: bab17 },
    ringkasan: hitung,
    istilah: JODOH_HARI.istilah,
    catatan: CATATAN
  };
}
