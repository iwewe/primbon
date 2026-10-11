/**
 * Masukan data lahir untuk Primbon: validasi, jam, dan pembacaan tautan.
 * Data lahir hanya hidup di FRAGMEN alamat (#d=...), yang tidak pernah dikirim peramban ke server.
 */
import { BULAN } from './format.js';

/** Rentang tanggal yang didukung: kalender Jawa Sultan Agungan ada sejak 8 Juli 1633; hitungan berhenti pada batas pasti mesin. */
export const TANGGAL_AWAL = '1633-07-08';
export const TANGGAL_AKHIR = '2052-08-25';
/** Hari Jawa berganti saat magrib; tanpa tempat lahir, magrib dianggap pukul 18.00. */
export const JAM_MAGRIB = 18;

const kabisat = y => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const dua = n => String(n).padStart(2, '0');
export const isoDari = (y, m, d) => `${String(y).padStart(4, '0')}-${dua(m)}-${dua(d)}`;

/** Memeriksa tanggal dari tiga isian. Mengembalikan { ok, iso } atau { ok:false, pesan, bidang }. */
export function validasiTanggal(tgl, bln, thn) {
  const d = Number(tgl);
  const m = Number(bln);
  const y = Number(thn);
  if (!Number.isInteger(y) || String(thn).trim() === '' || y < 1 || y > 9999) {
    return { ok: false, pesan: 'Tahun harus berupa angka empat digit, misalnya 1990.', bidang: ['thn'] };
  }
  if (!Number.isInteger(m) || m < 1 || m > 12) return { ok: false, pesan: 'Pilih bulan lahir.', bidang: ['bln'] };
  if (!Number.isInteger(d) || d < 1 || String(tgl).trim() === '') return { ok: false, pesan: 'Isi tanggal lahir.', bidang: ['tgl'] };
  const panjang = m === 2 ? (kabisat(y) ? 29 : 28) : [4, 6, 9, 11].includes(m) ? 30 : 31;
  if (d > panjang) {
    if (m === 2 && d === 29) return { ok: false, pesan: `29 Februari ${y} tidak ada karena ${y} bukan tahun kabisat. Periksa tahunnya.`, bidang: ['tgl', 'thn'] };
    return { ok: false, pesan: `${d} ${BULAN[m - 1]} tidak ada. Periksa tanggal dan bulannya.`, bidang: ['tgl', 'bln'] };
  }
  const iso = isoDari(y, m, d);
  if (iso < TANGGAL_AWAL) return { ok: false, pesan: 'Kalender Jawa Sultan Agungan baru ada sejak 8 Juli 1633. Isi tanggal sesudahnya.', bidang: ['thn'] };
  if (iso > TANGGAL_AKHIR) return { ok: false, pesan: 'Hitungan baru sampai 25 Agustus 2052; sesudahnya hanya perkiraan. Isi tanggal sebelumnya.', bidang: ['thn'] };
  return { ok: true, iso };
}

/** Jam 24 jam dari 'HH.MM' atau 'HH:MM'. Kosong berarti tidak diisi. */
export function bacaJam(teks) {
  const t = String(teks ?? '').trim();
  if (t === '') return { ok: true, jam: null };
  const m = /^(\d{1,2})[.:](\d{2})$/.exec(t);
  if (!m || Number(m[1]) > 23 || Number(m[2]) > 59) {
    return { ok: false, pesan: 'Jam tidak valid. Tulis dengan format 24 jam, misalnya 18.30.' };
  }
  return { ok: true, jam: `${dua(Number(m[1]))}:${m[2]}` };
}

/** Parameter dari alamat: fragmen (#d=...). Jangkar biasa seperti #bab-3 tidak dianggap parameter. */
export function paramDariAlamat(alamat) {
  const frag = (alamat.hash || '').replace(/^#/, '');
  return frag.includes('=') ? new URLSearchParams(frag) : new URLSearchParams();
}

/** Masukan menjadi parameter alamat: d, t, n. */
export function paramDariMasukan(m) {
  const p = new URLSearchParams();
  p.set('d', m.tanggal);
  if (m.jam) p.set('t', m.jam);
  if (m.nama) p.set('n', m.nama);
  return p;
}

/** Parameter alamat menjadi masukan, atau null bila tidak sah. */
export function masukanDariParam(p) {
  const params = p instanceof URLSearchParams ? p : new URLSearchParams(p);
  const d = params.get('d');
  if (!d || !/^\d{4}-\d{2}-\d{2}$/.test(d)) return null;
  const [y, m, t] = d.split('-').map(Number);
  if (!validasiTanggal(t, m, y).ok) return null;
  const j = bacaJam(params.get('t'));
  if (!j.ok) return null;
  return { tanggal: d, jam: j.jam, nama: (params.get('n') || '').trim().slice(0, 60) };
}

/* ------------------------------------------------------------------ alat rilis 2: hari baik, jam, jodoh */

export const UNTUK = ['semua', 'umum', 'nikah', 'bepergian'];

const tanggalSah = d => {
  if (!d || !/^\d{4}-\d{2}-\d{2}$/.test(d)) return false;
  const [y, m, t] = d.split('-').map(Number);
  return validasiTanggal(t, m, y).ok;
};
const jamSah = t => {
  const j = bacaJam(t);
  return j.ok ? { ok: true, jam: j.jam } : { ok: false };
};
const params = p => (p instanceof URLSearchParams ? p : new URLSearchParams(p));

/** Hari baik: d (tanggal) dan u (keperluan: semua, umum, nikah, bepergian). */
export function paramDariHari(m) {
  const p = new URLSearchParams();
  p.set('d', m.tanggal);
  if (m.untuk && m.untuk !== 'semua') p.set('u', m.untuk);
  return p;
}
export function masukanHariDariParam(p) {
  const q = params(p);
  if (!tanggalSah(q.get('d'))) return null;
  const u = q.get('u') || 'semua';
  return { tanggal: q.get('d'), untuk: UNTUK.includes(u) ? u : 'semua' };
}

/** Jam: d (tanggal) dan t (jam, opsional). */
export function paramDariJam(m) {
  const p = new URLSearchParams();
  p.set('d', m.tanggal);
  if (m.jam) p.set('t', m.jam);
  return p;
}
export function masukanJamDariParam(p) {
  const q = params(p);
  if (!tanggalSah(q.get('d'))) return null;
  const j = jamSah(q.get('t'));
  if (!j.ok) return null;
  return { tanggal: q.get('d'), jam: j.jam };
}

/** Jodoh: a, ta, na (pihak pria: tanggal, jam, nama) dan b, tb, nb (pihak wanita). */
export function paramDariJodoh(m) {
  const p = new URLSearchParams();
  p.set('a', m.pria.tanggal);
  if (m.pria.jam) p.set('ta', m.pria.jam);
  if (m.pria.nama) p.set('na', m.pria.nama);
  p.set('b', m.wanita.tanggal);
  if (m.wanita.jam) p.set('tb', m.wanita.jam);
  if (m.wanita.nama) p.set('nb', m.wanita.nama);
  return p;
}
export function masukanJodohDariParam(p) {
  const q = params(p);
  if (!tanggalSah(q.get('a')) || !tanggalSah(q.get('b'))) return null;
  const ja = jamSah(q.get('ta'));
  const jb = jamSah(q.get('tb'));
  if (!ja.ok || !jb.ok) return null;
  const nama = k => (q.get(k) || '').trim().slice(0, 60);
  return {
    pria: { tanggal: q.get('a'), jam: ja.jam, nama: nama('na') },
    wanita: { tanggal: q.get('b'), jam: jb.jam, nama: nama('nb') }
  };
}

/* ------------------------------------------------------------------ rilis 3: rumah, bepergian, hajatan */

export const ARAH_MATA_ANGIN = ['Utara', 'Timur Laut', 'Timur', 'Tenggara', 'Selatan', 'Barat Daya', 'Barat', 'Barat Laut'];
export const SISI_RUMAH = ['Utara', 'Timur', 'Selatan', 'Barat'];
export const MODE_RUMAH = ['arah', 'hari', 'ukuran', 'sumur', 'pintu', 'lahan'];
export const JENIS_UKURAN = ['usukAkhir', 'usukBangunan', 'rangka', 'tangga1', 'tangga2', 'balai', 'sumur'];
export const METODE_PINTU = [194, 195, 196];
export const MODE_HAJATAN = ['tarub', 'tingkeb', 'kehamilan', 'bayi'];

const bilangan = (teks, min, maks) => {
  if (teks === null || teks === undefined || String(teks).trim() === '') return null;
  const n = Number(String(teks).trim().replace(',', '.'));
  return Number.isFinite(n) && n >= min && n <= maks ? n : null;
};

/** Rumah: k (mode) dan parameter menurut mode. Mengembalikan null bila tidak sah. */
export function paramDariRumah(m) {
  const p = new URLSearchParams();
  p.set('k', m.k);
  if (m.k === 'arah') {
    p.set('d', m.tanggal);
    if (m.jam) p.set('t', m.jam);
  } else if (m.k === 'hari') p.set('d', m.tanggal);
  else if (m.k === 'ukuran') { p.set('j', m.jenis); p.set('n', String(m.jumlah)); }
  else if (m.k === 'sumur') { p.set('h', m.menghadap); p.set('s', m.sumurDi); }
  else if (m.k === 'pintu') { p.set('m', String(m.metode)); p.set('h', m.menghadap); p.set('p', String(m.panjang)); p.set('x', String(m.posisi)); }
  return p;
}
export function masukanRumahDariParam(p) {
  const q = params(p);
  const k = q.get('k');
  if (!MODE_RUMAH.includes(k)) return null;
  if (k === 'lahan') return { k };
  if (k === 'arah') {
    const j = jamSah(q.get('t'));
    return tanggalSah(q.get('d')) && j.ok ? { k, tanggal: q.get('d'), jam: j.jam } : null;
  }
  if (k === 'hari') return tanggalSah(q.get('d')) ? { k, tanggal: q.get('d') } : null;
  if (k === 'ukuran') {
    const n = bilangan(q.get('n'), 1, 99999);
    return JENIS_UKURAN.includes(q.get('j')) && n !== null && Number.isInteger(n) ? { k, jenis: q.get('j'), jumlah: n } : null;
  }
  if (k === 'sumur') {
    return SISI_RUMAH.includes(q.get('h')) && ARAH_MATA_ANGIN.includes(q.get('s')) ? { k, menghadap: q.get('h'), sumurDi: q.get('s') } : null;
  }
  const panjang = bilangan(q.get('p'), 0.01, 100000);
  const posisi = bilangan(q.get('x'), 0, 100000);
  const metode = Number(q.get('m'));
  if (!METODE_PINTU.includes(metode) || !SISI_RUMAH.includes(q.get('h')) || panjang === null || posisi === null || posisi > panjang) return null;
  return { k, metode, menghadap: q.get('h'), panjang, posisi };
}

/** Bepergian: d (tanggal) dan g (tujuan arah mata angin, opsional). */
export function paramDariBepergian(m) {
  const p = new URLSearchParams();
  p.set('d', m.tanggal);
  if (m.tujuan) p.set('g', m.tujuan);
  return p;
}
export function masukanBepergianDariParam(p) {
  const q = params(p);
  if (!tanggalSah(q.get('d'))) return null;
  const g = q.get('g');
  return { tanggal: q.get('d'), tujuan: ARAH_MATA_ANGIN.includes(g) ? g : null };
}

/** Hajatan: k (mode), d (tanggal) dan n (nama bayi, opsional). */
export function paramDariHajatan(m) {
  const p = new URLSearchParams();
  p.set('k', m.k);
  p.set('d', m.tanggal);
  if (m.k === 'bayi' && m.nama) p.set('n', m.nama);
  return p;
}
export function masukanHajatanDariParam(p) {
  const q = params(p);
  const k = q.get('k');
  if (!MODE_HAJATAN.includes(k) || !tanggalSah(q.get('d'))) return null;
  return { k, tanggal: q.get('d'), nama: k === 'bayi' ? (q.get('n') || '').trim().slice(0, 60) : '' };
}
