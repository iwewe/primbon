/**
 * Ciri tubuh menurut kitab Betaljemur Adammakna (bab 112, 113, 119).
 *
 * Berbeda dari modul lain, ini bukan hitungan dari tanggal: tidak ada masukan kalender. Fungsinya mencari tafsir
 * kitab untuk ciri yang Anda sebut.
 *
 * - andengAndeng: 57 letak andeng-andeng (tahi lalat) dengan namanya (bab 112). toh: 5 letak toh (bab 113).
 * - ciriAnggota: ukuran 21 anggota badan beserta variannya (bab 119 butir 1-21).
 * - tandaGabungan: tanda gabungan wajah, badan, dan cara berjalan (bab 119 butir 22-80; 84 entri karena beberapa butir bercabang).
 * - cariCiri: pencarian di semuanya dengan kata kunci.
 *
 * Fisiognomi tradisional; tidak ada dasar ilmiah. Jangan dipakai menilai atau mendiskriminasi orang.
 */
import { ANDENG_ANDENG, TOH, UKURAN_ANGGOTA, TANDA_GABUNGAN, PERINGATAN_CIRI } from './data/ciriTubuh.js';

export { PERINGATAN_CIRI };

const norm = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const kataKunci = (q) => norm(q).split(/[^a-z0-9]+/).filter(Boolean);
const cocok = (teks, kata) => { const t = norm(teks); return kata.every(k => t.includes(k)); };

const butirDari = (no) => parseInt(no, 10);
const bungkus = (hasil, sumber) => ({ hasil, jumlah: hasil.length, sumber, peringatan: PERINGATAN_CIRI });

/** Andeng-andeng menurut letak: `cari` kata kunci pada letak atau nama, atau nomor butir (1-57). Tanpa argumen: semuanya. */
export function andengAndeng(cari) {
  let hasil = ANDENG_ANDENG.tabel;
  if (typeof cari === 'number') hasil = hasil.filter(x => x.no === cari);
  else if (cari !== undefined) {
    const k = kataKunci(cari);
    hasil = hasil.filter(x => cocok(`${x.lokasi} ${x.nama ?? ''}`, k));
  }
  return { ...bungkus(hasil, ANDENG_ANDENG.sumber), catatanCetak: ANDENG_ANDENG.catatanCetak };
}

/** Toh menurut letak (bab 113), dengan argumen seperti `andengAndeng`. */
export function toh(cari) {
  let hasil = TOH.tabel;
  if (typeof cari === 'number') hasil = hasil.filter(x => x.no === cari);
  else if (cari !== undefined) {
    const k = kataKunci(cari);
    hasil = hasil.filter(x => cocok(`${x.lokasi} ${x.nama}`, k));
  }
  return bungkus(hasil, TOH.sumber);
}

/** Ukuran anggota badan (bab 119 butir 1-21). Tanpa argumen: daftar nama anggota badan yang tersedia. */
export function ciriAnggota(bagian) {
  if (bagian === undefined) return { bagian: Object.keys(UKURAN_ANGGOTA.bagian), sumber: UKURAN_ANGGOTA.sumber, peringatan: PERINGATAN_CIRI };
  const b = norm(bagian).trim();
  const daftar = UKURAN_ANGGOTA.bagian[b];
  if (!daftar) throw new RangeError(`bagian tidak dikenal: ${bagian}`);
  return { bagian: b, ...bungkus(daftar.map(x => ({ ...x, butir: x.no })), UKURAN_ANGGOTA.sumber) };
}

/** Tanda gabungan (bab 119 butir 22-80), disaring dengan kata kunci pada bagian, tanda, atau makna. */
export function tandaGabungan(cari) {
  let hasil = TANDA_GABUNGAN.tabel;
  if (typeof cari === 'number') hasil = hasil.filter(x => butirDari(x.no) === cari);
  else if (cari !== undefined) {
    const k = kataKunci(cari);
    hasil = hasil.filter(x => cocok(`${x.bagian.join(' ')} ${x.tanda} ${x.makna}`, k));
  }
  return { ...bungkus(hasil.map(x => ({ ...x, butir: butirDari(x.no) })), TANDA_GABUNGAN.sumber), catatanKitab: TANDA_GABUNGAN.catatan };
}

/** Cari kata kunci (semua kata harus ada) di andeng-andeng, toh, ukuran anggota badan, dan tanda gabungan. */
export function cariCiri(kata) {
  const k = kataKunci(kata);
  if (!k.length) throw new RangeError('kata kunci kosong');
  const anggota = Object.entries(UKURAN_ANGGOTA.bagian).flatMap(([bagian, daftar]) =>
    daftar.filter(x => cocok(`${bagian} ${x.varian} ${x.makna}`, k)).map(x => ({ bagian, ...x, butir: x.no })));
  const hasil = {
    andengAndeng: ANDENG_ANDENG.tabel.filter(x => cocok(`${x.lokasi} ${x.nama ?? ''} ${x.makna}`, k)),
    toh: TOH.tabel.filter(x => cocok(`${x.lokasi} ${x.nama} ${x.makna}`, k)),
    anggota,
    tanda: TANDA_GABUNGAN.tabel.filter(x => cocok(`${x.bagian.join(' ')} ${x.tanda} ${x.makna}`, k)).map(x => ({ ...x, butir: butirDari(x.no) }))
  };
  const total = Object.values(hasil).reduce((n, d) => n + d.length, 0);
  return {
    kata: k.join(' '), ...hasil, total,
    sumber: [ANDENG_ANDENG.sumber, TOH.sumber, UKURAN_ANGGOTA.sumber, TANDA_GABUNGAN.sumber], peringatan: PERINGATAN_CIRI
  };
}
