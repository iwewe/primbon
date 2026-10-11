/**
 * Pembangun butir isi yang dipakai semua halaman tafsir (laporan, jodoh, hari baik, jam).
 * Butir adalah data murni: { jenis, judul, ... }. Tampilan (tata letak, warna) milik lapisan situs.
 *   tafsir : judul, teks, arah ('baik' | 'waspada' | 'netral' | null), sumber, catatan
 *   fakta  : judul, baris [[label, nilai]], sumber
 *   daftar : judul, item [{ teks, arah }], sumber, catatan
 *   tabel  : judul, kolom, baris (sel = teks atau { teks, arah }), sumber, catatan, tanda (baris yang ditandai)
 */

/** Halaman cetak kitab: [54,55,56] menjadi '54-56'; [60,73,74] menjadi '60, 73-74'. */
function ringkasHalaman(h) {
  const a = [...new Set(h)].sort((x, y) => x - y);
  const out = [];
  for (let i = 0; i < a.length; ) {
    let j = i;
    while (j + 1 < a.length && a[j + 1] === a[j] + 1) j++;
    out.push(j > i ? `${a[i]}-${a[j]}` : String(a[i]));
    i = j + 1;
  }
  return out.join(', ');
}

/** Sumber kitab: 'Bab 97, hlm. 54', 'Bab 97 dan 109, hlm. 60, 73-74'. Menerima satu sumber atau daftar sumber. */
export function sumberTeks(s) {
  if (Array.isArray(s)) return s.map(sumberTeks).filter(Boolean).join('; ');
  if (!s || !s.bab) return '';
  const bab = Array.isArray(s.bab) ? s.bab.join(' dan ') : s.bab;
  const h = Array.isArray(s.halaman) ? s.halaman : [];
  return `Bab ${bab}${h.length ? `, hlm. ${ringkasHalaman(h)}` : ''}`;
}

const ARAH = { baik: 'baik', buruk: 'waspada', netral: 'netral' };
/** Arah dari mesin (baik, buruk, netral) menjadi penilaian situs (baik, waspada, netral). */
export const arah = a => ARAH[a] ?? null;

export const tafsir = (judul, teks, { a = null, sumber = null, catatan = null } = {}) =>
  teks ? { jenis: 'tafsir', judul, teks, arah: arah(a), sumber: sumberTeks(sumber), catatan } : null;

/** Fakta: pasangan label dan nilai (nilai kosong dilewati). */
export const fakta = (judul, baris, sumber = null) => {
  const ada = baris.filter(([, v]) => v !== null && v !== undefined && v !== '' && !(Array.isArray(v) && !v.length));
  return ada.length ? { jenis: 'fakta', judul, baris: ada.map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : String(v)]), sumber: sumberTeks(sumber) } : null;
};

export const daftar = (judul, item, sumber = null, catatan = null) =>
  item.length ? { jenis: 'daftar', judul, item, sumber: sumberTeks(sumber), catatan } : null;

/** `tanda`: daftar boolean sepanjang `baris`; baris bertanda true ditandai pada tampilan (mis. saat yang memuat jam pengguna). */
export const tabel = (judul, kolom, baris, sumber = null, catatan = null, tanda = []) =>
  baris.length ? { jenis: 'tabel', judul, kolom, baris, sumber: sumberTeks(sumber), catatan, tanda } : null;

export const bersih = arr => arr.filter(Boolean);

/** Jam desimal (boleh >= 24 untuk dini hari berikutnya) menjadi 'HH.MM'. */
export function jamTeks(n) {
  const menit = Math.round((n % 24) * 60);
  return `${String(Math.floor(menit / 60) % 24).padStart(2, '0')}.${String(menit % 60).padStart(2, '0')}`;
}

/** Rentang jam: 'mulai'-'selesai' dalam jam desimal. */
export const rentangJam = (mulai, selesai) => `${jamTeks(mulai)}–${jamTeks(selesai)}`;

/** Daftar jam bulat berurutan [13,14,15] menjadi satu rentang '13.00–16.00'; tidak berurutan menjadi beberapa rentang. */
export function rentangDariJam(jam) {
  const a = [...new Set(jam)].sort((x, y) => x - y);
  const out = [];
  for (let i = 0; i < a.length; ) {
    let j = i;
    while (j + 1 < a.length && a[j + 1] === a[j] + 1) j++;
    out.push(rentangJam(a[i], a[j] + 1));
    i = j + 1;
  }
  return out.join(' dan ');
}
