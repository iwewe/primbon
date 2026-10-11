/**
 * Rumah dan bangunan menurut kitab Betaljemur Adammakna (bab 168 dan 172-198).
 *
 * - arahRumah: arah hadap rumah menurut weton pemilik (bab 172).
 * - rumahHari: tinjauan hari mulai membangun (bab 173-181, 190).
 * - ukuranRumah: hitungan jumlah usuk, rangka, anak tangga, balai-balai, dan jarak sumur (bab 187-193, 197).
 * - pintuHalaman dan letakSumur: berdasarkan diagram kitab (bab 194-196 dan 198).
 * - halaman: bentuk dan keadaan lahan (bab 168).
 *
 * Tafsir tradisional. Aturan yang memakai bulan Jawa bergantung pada kalender Jawa (bisa bergeser sehari);
 * aturan yang memakai mangsa memakai kalender pranata mangsa baku, bukan dari kitab.
 */
import { weton as hitungWeton, kalenderJawa, nomorHari, isoDariNomor } from './kalender.js';
import { NEPTU } from './data/neptu.js';
import {
  ARAH_RUMAH, JAM_MULAI, HARI_BAGIAN, HARI_PINTU, BULAN_RUMAH, MANGSA_RUMAH, MANGSA_AWAL, NEPTU_BAB_176,
  SIKLUS_NEPTU, UKURAN, PINTU_HALAMAN, LETAK_SUMUR, HALAMAN
} from './data/rumah.js';

export const CATATAN_RUMAH = 'Tafsir tradisional dari kitab Betaljemur Adammakna. Bukan pengganti perencanaan teknik dan keselamatan bangunan.';

const berputar = (n, banyak) => n % banyak || banyak;

/** Arah hadap rumah yang baik menurut jumlah neptu hari + pasaran lahir pemilik (bab 172). */
export function arahRumah(inputLahir) {
  const w = hitungWeton(inputLahir);
  return {
    weton: w.weton,
    jumlahNeptu: w.neptu.total,
    arahBaik: ARAH_RUMAH.tabel[w.neptu.total],
    sumber: ARAH_RUMAH.sumber,
    catatan: CATATAN_RUMAH
  };
}

/** Mangsa pranata mangsa baku untuk satu tanggal Masehi (bukan dari kitab). */
export function mangsaDari(input) {
  const [, bln, tgl] = isoDariNomor(nomorHari(input)).split('-').map(Number);
  const urut = [...MANGSA_AWAL.urut].sort((a, b) => a[1] - b[1] || a[2] - b[2]);
  let hasil = 'Kapitu'; // 1 Januari - 2 Februari masih Kapitu (mulai 22 Desember)
  for (const [nama, m, d] of urut) if (bln > m || (bln === m && tgl >= d)) hasil = nama;
  return hasil;
}

/** Tinjauan hari mulai membangun, memasang atap, atau pindah rumah. */
export function rumahHari(input) {
  const k = kalenderJawa(input);
  const { wulan } = k.tanggal;
  const mangsa = mangsaDari(input);
  const kegiatan = {};
  for (const jenis of ['mendirikan', 'genteng', 'pindah']) {
    kegiatan[jenis] = {
      menurutBulan: BULAN_RUMAH[wulan][jenis]
        ? { bulan: wulan, ...BULAN_RUMAH[wulan][jenis], bergantungTanggalJawa: true, sumber: BULAN_RUMAH.sumber }
        : null,
      menurutMangsa: { mangsa, ...MANGSA_RUMAH[mangsa][jenis], asumsiKalenderMangsa: true, sumber: MANGSA_RUMAH.sumber }
    };
  }

  const neptu176 = NEPTU_BAB_176[k.hari] + NEPTU.pasaran[k.pasaran];
  const siklus = {};
  for (const [kunci, def] of Object.entries(SIKLUS_NEPTU)) {
    if (kunci === 'asumsi') continue;
    const jumlah = kunci === 'b176' ? neptu176 : k.neptu.total;
    const nomor = berputar(jumlah, def.nama.length);
    siklus[kunci] = { judul: def.judul, jumlah, nomor, ...def.nama[nomor - 1], sumber: def.sumber };
  }

  return {
    masehi: k.masehi,
    weton: k.weton,
    tanggalJawa: `${k.tanggal.dina} ${wulan} ${k.tanggal.tahun} AJ`,
    mangsa,
    kegiatan,
    siklus,
    asumsiSiklus: SIKLUS_NEPTU.asumsi,
    bagianBangunan: { bagian: HARI_BAGIAN[k.hari], sumber: HARI_BAGIAN.sumber },
    pasangPintu: HARI_PINTU[k.hari] ? { pintu: HARI_PINTU[k.hari], sumber: HARI_PINTU.sumber } : null,
    jamMulai: {
      jam: JAM_MULAI[k.hari].map(j => ({ kitab: j, jam24: j >= 1 && j <= 5 ? j + 12 : j })),
      asumsi: JAM_MULAI.asumsi,
      sumber: JAM_MULAI.sumber
    },
    catatan: CATATAN_RUMAH
  };
}

/**
 * Hitungan berputar untuk satu ukuran.
 * @param {'usukAkhir'|'usukBangunan'|'rangka'|'tangga1'|'tangga2'|'balai'|'sumur'} jenis
 * @param {number} jumlah bilangan bulat positif (jumlah usuk, telapak kaki, anak tangga, depa, dan sebagainya)
 */
export function ukuranRumah(jenis, jumlah) {
  const def = UKURAN[jenis];
  if (!def || jenis === 'asumsi') throw new RangeError(`Jenis ukuran tidak dikenal: ${jenis}`);
  if (!Number.isInteger(jumlah) || jumlah < 1) throw new RangeError('Jumlah harus bilangan bulat positif');
  const nomor = berputar(jumlah, def.nama.length);
  return { jenis, judul: def.judul, jumlah, nomor, ...def.nama[nomor - 1], asumsi: UKURAN.asumsi, sumber: def.sumber, catatan: CATATAN_RUMAH };
}

const SISI = ['Utara', 'Timur', 'Selatan', 'Barat'];
const baku = (s) => String(s).trim().replace(/[\s-]+/g, '_').replace(/^./, c => c.toUpperCase()).replace(/_(.)/g, (_, c) => `_${c.toUpperCase()}`);

/**
 * Letak pintu halaman: sisi dibagi 5 (bab 194) atau 9 (bab 195 dan 196) bagian sama panjang.
 * @param {{metode: 194|195|196, menghadap: 'Utara'|'Timur'|'Selatan'|'Barat', panjang: number, posisi: number}} p
 *   posisi = jarak pintu dari sudut awal hitungan (lihat `mulaiDari` pada hasil), dalam satuan yang sama dengan panjang
 */
export function pintuHalaman({ metode, menghadap, panjang, posisi }) {
  const def = PINTU_HALAMAN[`b${metode}`];
  if (!def) throw new RangeError('metode harus 194, 195, atau 196');
  const sisi = baku(menghadap);
  if (!SISI.includes(sisi)) throw new RangeError('menghadap harus Utara, Timur, Selatan, atau Barat');
  if (!(panjang > 0) || !(posisi >= 0) || posisi > panjang) throw new RangeError('posisi harus di antara 0 dan panjang');
  const nomor = Math.min(def.bagian, Math.max(1, Math.ceil((posisi / panjang) * def.bagian)));
  const isi = metode === 195 ? { makna: def.makna[sisi][nomor - 1] } : def.makna[nomor - 1];
  return { metode, menghadap: sisi, bagian: def.bagian, nomor, mulaiDari: def.mulaiDari[sisi], ...isi, keterangan: def.keterangan ?? null, sumber: def.sumber, catatan: CATATAN_RUMAH };
}

/**
 * Letak sumur terhadap rumah (bab 198).
 * @param {{rumahMenghadap: 'Utara'|'Timur'|'Selatan'|'Barat', sumurDi: string}} p sumurDi = arah dari tengah rumah,
 *   mis. 'Barat Daya'
 */
export function letakSumur({ rumahMenghadap, sumurDi }) {
  const hadap = baku(rumahMenghadap);
  const arah = baku(sumurDi);
  const peta = LETAK_SUMUR.nomor[hadap];
  if (!peta) throw new RangeError('rumahMenghadap harus Utara, Timur, Selatan, atau Barat');
  const nomor = peta[arah];
  if (!nomor) throw new RangeError(`sumurDi tidak dikenal: ${sumurDi} (pakai Utara, Timur_Laut, Timur, Tenggara, Selatan, Barat_Daya, Barat, Barat_Laut)`);
  return { rumahMenghadap: hadap, sumurDi: arah, nomor, ...LETAK_SUMUR.makna[nomor], anjuran: LETAK_SUMUR.anjuran, sumber: LETAK_SUMUR.sumber, catatan: CATATAN_RUMAH };
}

/** Daftar bentuk dan keadaan lahan beserta maknanya (bab 168). */
export function halaman() {
  return { daftar: HALAMAN.daftar, sumber: HALAMAN.sumber, catatan: CATATAN_RUMAH };
}
