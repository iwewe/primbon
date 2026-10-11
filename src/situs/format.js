/**
 * Pemformat bahasa Indonesia untuk situs Primbon. Semua tanggal Masehi berbentuk 'YYYY-MM-DD'.
 */
import { weton } from '../mesin/kalender.js';

const pecahIso = iso => {
  const [y, m, d] = iso.split('-').map(Number);
  return { y, m, d };
};

export const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
export const HARI_MINGGU_DULU = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
export const HARI_SINGKAT = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

/** Menghindari injeksi HTML dari nilai apa pun yang masuk ke templat. */
export function esc(nilai) {
  return String(nilai ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** 11 Oktober 2026 */
export function tanggalTanpaHari(iso) {
  const { y, m, d } = pecahIso(iso);
  return `${d} ${BULAN[m - 1]} ${y}`;
}

/** Minggu, 11 Oktober 2026 */
export function tanggalPanjang(iso) {
  return `${weton(iso).hari}, ${tanggalTanpaHari(iso)}`;
}

/** Oktober 2026 */
export function bulanTahun(tahun, bulan) {
  return `${BULAN[bulan - 1]} ${tahun}`;
}

/** 'HH:MM' atau 'HH.MM' menjadi 'HH.MM' (titik, seperti penulisan jam di Indonesia). */
export function jamTitik(teks) {
  return String(teks).replace(':', '.');
}

/** Angka dengan pemisah ribuan titik: 2835 menjadi 2.835. */
export function ribuan(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/** Tanggal Jawa penuh: '28 Bakdamulud 1960 AJ'. */
export function jawaPenuh(jawa) {
  return jawa ? `${jawa.dina} ${jawa.wulan} ${jawa.tahun} AJ` : '';
}

/** Tanggal lokal perangkat hari ini dan jam (desimal). */
export function sekarangLokal(date = new Date()) {
  const dua = n => String(n).padStart(2, '0');
  return { iso: `${date.getFullYear()}-${dua(date.getMonth() + 1)}-${dua(date.getDate())}`, jam: date.getHours() + date.getMinutes() / 60 };
}
