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
