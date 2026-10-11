/**
 * Jodoh lanjutan (bab 18-25) dan tempat tinggal menurut huruf nama (bab 167), kitab Betaljemur Adammakna.
 *
 * - aksaraNama: huruf depan dan belakang nama (alih huruf Latin ke aksara hanacaraka, perkiraan).
 * - jodohNama: bab 18-21, memakai neptu huruf depan/belakang nama.
 * - jodohWeton: bab 22-25, memakai weton (dan tanggal Jawa untuk bab 24-25) kelahiran.
 * - desaTinggal: bab 167.
 *
 * Tafsir tradisional. Alih huruf Latin ke aksara Jawa adalah perkiraan kami (kitab memberi nama dalam
 * aksara Jawa); jika ejaan nama berbeda dari pelafalannya, berikan aksara langsung: { depan: 'sa', belakang: 'ga' }.
 * Bab 24-25 memakai tanggal Jawa dan bergantung kalender Jawa.
 */
import { kalenderJawa } from './kalender.js';
import { NEPTU } from './data/neptu.js';
import {
  HANACARAKA, NEPTU_AKSARA, JODOH_NAMA_SISA_9, JODOH_NAMA_SISA_7, JODOH_NAMA_SISA_5, KRATON_MULYO,
  JODOH_WETON_SISA_7, JODOH_WETON_SISA_5, JODOH_TANGGAL_SISA_9, JODOH_TANGGAL_SISA_3, TEMPAT_TINGGAL_HURUF
} from './data/pernikahan.js';

export const CATATAN_PERNIKAHAN = 'Tafsir tradisional dari kitab Betaljemur Adammakna; bukan ramalan dan bukan nasihat pernikahan.';

const sisa = (n, pembagi) => n % pembagi || pembagi;

// --- alih huruf nama Latin -> aksara dasar -------------------------------------------------------------------------
const VOKAL = 'aiueo';
const DIGRAF = { ng: 'nga', ny: 'nya', th: 'tha', dh: 'dha', kh: 'ka', sy: 'sa', ch: 'ca', tj: 'ca', dj: 'ja' };
const TUNGGAL = {
  b: 'ba', c: 'ca', d: 'da', f: 'pa', g: 'ga', h: 'ha', j: 'ja', k: 'ka', l: 'la', m: 'ma', n: 'na', p: 'pa',
  q: 'ka', r: 'ra', s: 'sa', t: 'ta', v: 'wa', w: 'wa', x: 'sa', y: 'ya', z: 'ja'
};

const kataDari = (nama) => String(nama)
  .normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
  .replace(/[^a-z\s]/g, ' ').trim().split(/\s+/).filter(Boolean);

function aksaraPertama(kata) {
  if (VOKAL.includes(kata[0])) return 'ha'; // vokal awal ditulis dengan ha (perkiraan)
  const dua = kata.slice(0, 2);
  if (DIGRAF[dua] && kata[2] && VOKAL.includes(kata[2])) return DIGRAF[dua];
  return TUNGGAL[kata[0]];
}

function aksaraTerakhir(kata) {
  let s = kata;
  // wignyan (h), cecak (ng), dan layar (r) di akhir kata ditulis sebagai sandhangan, bukan aksara tersendiri
  s = s.replace(/([aiueo])(h|ng|r)$/, '$1');
  while (s.length > 1 && VOKAL.includes(s[s.length - 1])) s = s.slice(0, -1);
  if (VOKAL.includes(s[s.length - 1])) return 'ha';
  const dua = s.slice(-2);
  if (DIGRAF[dua] && s.length > 2) return DIGRAF[dua];
  return TUNGGAL[s[s.length - 1]];
}

/**
 * Huruf depan dan belakang nama (seluruh nama: huruf pertama kata pertama, huruf terakhir kata terakhir).
 * Menerima juga { depan, belakang } berisi aksara dasar (ha na ca ...).
 */
export function aksaraNama(nama) {
  if (nama && typeof nama === 'object') {
    for (const k of ['depan', 'belakang']) {
      if (!HANACARAKA.includes(nama[k])) throw new RangeError(`aksara tidak dikenal: ${nama[k]}`);
    }
    return { nama: null, depan: nama.depan, belakang: nama.belakang, asumsi: [] };
  }
  const kata = kataDari(nama);
  if (!kata.length) throw new RangeError('nama kosong');
  return {
    nama: String(nama).trim(),
    depan: aksaraPertama(kata[0]),
    belakang: aksaraTerakhir(kata[kata.length - 1]),
    asumsi: ['Alih huruf Latin ke aksara hanacaraka adalah perkiraan; sandhangan vokal, cecak, layar, dan wignyan diabaikan.']
  };
}

/**
 * Semua aksara dasar sebuah nama, berurutan (untuk bab 65). Cecak (ng), layar (r), dan wignyan (h) di akhir
 * suku kata (sesudah vokal dan tidak diikuti vokal) ditulis sebagai sandhangan sehingga tidak dihitung;
 * vokal tanpa konsonan pembawa dibaca ha. Perkiraan: contoh kitab (Sukirna = sa, ka, na) cocok.
 */
export function aksaraSemua(nama) {
  if (Array.isArray(nama)) {
    for (const a of nama) if (!HANACARAKA.includes(a)) throw new RangeError(`aksara tidak dikenal: ${a}`);
    return [...nama];
  }
  const kata = kataDari(nama);
  if (!kata.length) throw new RangeError('nama kosong');
  const hasil = [];
  for (const k of kata) {
    let i = 0;
    while (i < k.length) {
      const c = k[i];
      if (VOKAL.includes(c)) {
        if (i === 0 || VOKAL.includes(k[i - 1])) hasil.push('ha');
        i++;
        continue;
      }
      const dua = k.slice(i, i + 2);
      const digraf = DIGRAF[dua] ? dua : null;
      const token = digraf ?? c;
      const aksara = digraf ? DIGRAF[dua] : TUNGGAL[c];
      const sesudah = k[i + token.length];
      const sandhangan = i > 0 && VOKAL.includes(k[i - 1]) && ['r', 'ng', 'h'].includes(token) &&
        !(sesudah && VOKAL.includes(sesudah));
      if (!sandhangan) hasil.push(aksara);
      i += token.length;
    }
  }
  return hasil;
}

const neptuAksara = (skema, a) => NEPTU_AKSARA[skema].nilai[a];

// --- bab 18-21 ----------------------------------------------------------------------------------------------------------
/** Jodoh menurut nama (bab 18, 19, 20, 21). `pria` dan `wanita` berupa nama atau { depan, belakang }. */
export function jodohNama(pria, wanita) {
  const p = aksaraNama(pria);
  const w = aksaraNama(wanita);

  // bab 18: neptu depan + belakang masing-masing, dibagi 9, dipasangkan
  const jumlah18 = (x) => neptuAksara('bab18', x.depan) + neptuAksara('bab18', x.belakang);
  const sp = sisa(jumlah18(p), 9);
  const sw = sisa(jumlah18(w), 9);
  const kunci = `${Math.min(sp, sw)}&${Math.max(sp, sw)}`;
  const bab18 = {
    jumlahPria: jumlah18(p), jumlahWanita: jumlah18(w), sisaPria: sp, sisaWanita: sw, kunci,
    ...JODOH_NAMA_SISA_9.tabel[kunci], sumber: JODOH_NAMA_SISA_9.sumber
  };

  // bab 19: empat huruf, skema bab 19, dibagi 7
  const jumlah19 = neptuAksara('bab19', p.depan) + neptuAksara('bab19', p.belakang) +
    neptuAksara('bab19', w.depan) + neptuAksara('bab19', w.belakang);
  const s19 = sisa(jumlah19, 7);
  const bab19 = { jumlah: jumlah19, sisa: s19, ...JODOH_NAMA_SISA_7.tabel[s19], sumber: JODOH_NAMA_SISA_7.sumber, asumsi: JODOH_NAMA_SISA_7.asumsi };

  // bab 20: huruf depan saja, skema 1-20, dibagi 5
  const jumlah20 = neptuAksara('urut', p.depan) + neptuAksara('urut', w.depan);
  const s20 = sisa(jumlah20, 5);
  const bab20 = { jumlah: jumlah20, sisa: s20, ...JODOH_NAMA_SISA_5.tabel[s20], sumber: JODOH_NAMA_SISA_5.sumber };

  // bab 21: Kraton mulyo, garis huruf depan
  const garisDari = (a) => Object.keys(KRATON_MULYO.garis).find(g => KRATON_MULYO.garis[g].includes(a));
  const gp = garisDari(p.depan);
  const gw = garisDari(w.depan);
  const bab21 = { garisPria: gp, garisWanita: gw, sumber: KRATON_MULYO.sumber };
  if (gp === gw) Object.assign(bab21, KRATON_MULYO.makna.segaris);
  else {
    Object.assign(bab21, KRATON_MULYO.makna.berbeda);
    if (KRATON_MULYO.kalahOleh[gp] === gw) bab21.kalah = 'pria';
    else if (KRATON_MULYO.kalahOleh[gw] === gp) bab21.kalah = 'wanita';
    else { bab21.kalah = null; bab21.asumsi = KRATON_MULYO.asumsi; }
  }

  const ringkasan = { baik: 0, buruk: 0, netral: 0 };
  for (const m of [bab18, bab19, bab20, bab21]) ringkasan[m.arah] += 1;

  return {
    pria: p, wanita: w,
    metode: { bab18, bab19, bab20, bab21 },
    ringkasan, catatan: CATATAN_PERNIKAHAN
  };
}

// --- bab 22-25 ----------------------------------------------------------------------------------------------------------
/** Komponen kelahiran: dari tanggal Masehi, atau diberikan langsung { hari, pasaran, wulan, taun, tanggal }. */
function komponenLahir(input) {
  if (input && typeof input === 'object' && 'hari' in input && !(input instanceof Date)) {
    const { hari, pasaran, wulan, taun, tanggal } = input;
    return {
      weton: `${hari} ${pasaran}`, hari, pasaran, wulan, taun, tanggal, spekulatif: false,
      neptuWeton: NEPTU.hari[hari] + NEPTU.pasaran[pasaran]
    };
  }
  const k = kalenderJawa(input);
  return {
    weton: k.weton, hari: k.hari, pasaran: k.pasaran, wulan: k.tanggal.wulan, taun: k.tanggal.taun,
    tanggal: k.tanggal.dina, spekulatif: k.spekulatif, neptuWeton: k.neptu.total
  };
}

const neptuTanggalan = (x) => x.neptuWeton + NEPTU.wulan[x.wulan] + NEPTU.taun[x.taun] + x.tanggal;

/**
 * Jodoh menurut weton suami dan istri (bab 22, 23) dan, bila tanggal Jawa tersedia, bab 24 dan 25.
 * Masukan: tanggal Masehi lahir atau { hari, pasaran, wulan, taun, tanggal } (tanggal = nomor tanggal Jawa).
 */
export function jodohWeton(suami, istri) {
  const a = komponenLahir(suami);
  const b = komponenLahir(istri);
  const jumlah = a.neptuWeton + b.neptuWeton;

  // bab 22: dibagi 10 (dipakai bila sisa 1-7), selain itu dibagi 7
  const s10 = sisa(jumlah, 10);
  const s7 = sisa(jumlah, 7);
  const dipakai = s10 <= 7 ? { pembagi: 10, nomor: s10 } : { pembagi: 7, nomor: s7 };
  const bab22 = {
    jumlah, kandidat: { bagi10: s10, bagi7: s7 }, ...dipakai, ...JODOH_WETON_SISA_7.tabel[dipakai.nomor],
    asumsi: JODOH_WETON_SISA_7.asumsi, catatanBanding: JODOH_WETON_SISA_7.catatanBanding, sumber: JODOH_WETON_SISA_7.sumber
  };

  // bab 23: dibagi 5
  const s5 = sisa(jumlah, 5);
  const bab23 = { jumlah, sisa: s5, ...JODOH_WETON_SISA_5.tabel[s5], sumber: JODOH_WETON_SISA_5.sumber };

  // bab 24 dan 25: + bulan, tahun, tanggal Jawa kelahiran
  const jumlahLengkap = neptuTanggalan(a) + neptuTanggalan(b);
  const s9 = sisa(jumlahLengkap, 9);
  const s3 = sisa(jumlahLengkap, 3);
  const bab24 = {
    jumlah: jumlahLengkap, sisa: s9, ...JODOH_TANGGAL_SISA_9.tabel[s9],
    bergantungTanggalJawa: true, asumsi: JODOH_TANGGAL_SISA_9.asumsi, sumber: JODOH_TANGGAL_SISA_9.sumber
  };
  const bab25 = {
    jumlah: jumlahLengkap, sisa: s3, ...JODOH_TANGGAL_SISA_3.tabel[s3],
    bergantungTanggalJawa: true, asumsi: JODOH_TANGGAL_SISA_3.asumsi, sumber: JODOH_TANGGAL_SISA_3.sumber
  };

  const ringkasan = { baik: 0, buruk: 0, netral: 0 };
  for (const m of [bab22, bab23, bab24, bab25]) ringkasan[m.arah] += 1;

  const ringkas = (x) => ({ weton: x.weton, neptu: x.neptuWeton, wulan: x.wulan, taun: x.taun, tanggalJawa: x.tanggal });
  return {
    suami: ringkas(a), istri: ringkas(b),
    metode: { bab22, bab23, bab24, bab25 },
    ringkasan,
    spekulatif: a.spekulatif || b.spekulatif,
    catatan: `${CATATAN_PERNIKAHAN} Bab 24 dan 25 bergantung tanggal Jawa dan bisa bergeser sehari.`
  };
}

// --- bab 167 ------------------------------------------------------------------------------------------------------------
/** Tempat tinggal (desa/kampung) menurut huruf nama diri dan nama desa. */
export function desaTinggal(namaDiri, namaDesa) {
  const d = aksaraNama(namaDiri);
  const k = aksaraNama(namaDesa);
  const hitung = (a, b) => {
    const jumlah = neptuAksara('urut', a) + neptuAksara('urut', b);
    const nomor = sisa(jumlah, 5);
    return { aksara: [a, b], jumlah, sisa: nomor, ...TEMPAT_TINGGAL_HURUF.tabel[nomor] };
  };
  const depan = hitung(d.depan, k.depan);
  const belakang = hitung(d.belakang, k.belakang);
  const ringkasan = { baik: 0, buruk: 0, netral: 0 };
  for (const m of [depan, belakang]) ringkasan[m.arah] += 1;
  return {
    diri: d, desa: k, depan, belakang, ringkasan,
    sumber: TEMPAT_TINGGAL_HURUF.sumber, catatan: CATATAN_PERNIKAHAN
  };
}
