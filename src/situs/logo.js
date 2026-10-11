/**
 * Tanda merek Pawukon dan ikon antarmuka. Tanda merek: tiga puluh garis untuk tiga puluh wuku; garis pertama (Sinta)
 * lebih panjang dan beraksen sebagai titik mulai putaran.
 */

/** @param {number} ukuran px @param {{ warna?: string, aksen?: string, sederhana?: boolean }} o */
export function tandaMerek(ukuran = 32, { warna = 'currentColor', aksen = '#F0A860', sederhana = false } = {}) {
  const jumlah = sederhana ? 15 : 30;
  const garis = [];
  for (let i = 0; i < jumlah; i++) {
    const sudut = (-90 + (360 / jumlah) * i) * (Math.PI / 180);
    const [r1, r2, tebal, isi] = i === 0 ? [8.2, 15, sederhana ? 3.6 : 2.6, aksen] : [sederhana ? 9.6 : 10.2, 14.2, sederhana ? 2.6 : 1.5, warna];
    const x1 = (16 + r1 * Math.cos(sudut)).toFixed(2);
    const y1 = (16 + r1 * Math.sin(sudut)).toFixed(2);
    const x2 = (16 + r2 * Math.cos(sudut)).toFixed(2);
    const y2 = (16 + r2 * Math.sin(sudut)).toFixed(2);
    garis.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${isi}" stroke-width="${tebal}" stroke-linecap="round"/>`);
  }
  return `<svg width="${ukuran}" height="${ukuran}" viewBox="0 0 32 32" aria-hidden="true" focusable="false">${garis.join('')}</svg>`;
}

const ikon = (isi, ukuran = 24) =>
  `<svg width="${ukuran}" height="${ukuran}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${isi}</svg>`;

export const IKON = {
  weton: ukuran => ikon('<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M3.5 9.5h17M3.5 15h17M9.5 3.5v17M15 3.5v17"/>', ukuran),
  kalender: ukuran => ikon('<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>', ukuran),
  pembanding: ukuran => ikon('<circle cx="9" cy="12" r="5.5"/><circle cx="15" cy="12" r="5.5"/>', ukuran),
  metode: ukuran => ikon('<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3"/>', ukuran),
  bulan: ukuran => ikon('<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>', ukuran),
  matahari: ukuran => ikon('<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>', ukuran),
  kanan: ukuran => ikon('<path d="M9 5l7 7-7 7"/>', ukuran),
  kiri: ukuran => ikon('<path d="M15 5l-7 7 7 7"/>', ukuran),
  info: ukuran => ikon('<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8v.2"/>', ukuran),
  tautan: ukuran => ikon('<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>', ukuran),
  unduh: ukuran => ikon('<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>', ukuran),
  luar: ukuran => ikon('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>', ukuran)
};
