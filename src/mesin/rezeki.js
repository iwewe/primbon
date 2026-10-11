/**
 * Rezeki dan mata pencaharian menurut kitab Betaljemur Adammakna (bab 91-92, 159-161).
 * Hanya memakai hari dan pasaran (weton), jadi tidak bergantung pada kalender Jawa.
 */
import { weton as hitungWeton, nomorHari, isoDariNomor } from './kalender.js';
import { MATA_PENCAHARIAN_HARI, WIJI, NAFKAH, SRI_SADANA, ARAH_BERHASIL } from './data/rezeki.js';

export const CATATAN_REZEKI = 'Tafsir tradisional dari kitab Betaljemur Adammakna, ditulis ulang. Pakailah sebagai bahan renungan, bukan kepastian.';

/** Wiji (bab 92): jumlah neptu tiga pekan berturut-turut (hari yang sama), dibagi 5; sisa 0 = wiji tengah. */
export function wiji(input) {
  const dt = nomorHari(input);
  const tiga = [0, 7, 14].map(n => hitungWeton(isoDariNomor(dt + n)));
  const jumlah = tiga.reduce((s, w) => s + w.neptu.total, 0);
  const sisa = jumlah % 5;
  const nomor = sisa || 5;
  return {
    pekan: tiga.map(w => ({ weton: w.weton, neptu: w.neptu.total })),
    jumlah, sisa, nomor,
    ...WIJI[nomor],
    sumber: WIJI.sumber
  };
}

export function rezeki(input) {
  const w = hitungWeton(input);
  const kategori = NAFKAH.tabel[w.hari][NAFKAH.pasaran.indexOf(w.pasaran)];
  const arah = SRI_SADANA.tabel[w.weton];
  const berhasil = ARAH_BERHASIL.tabel[w.weton];
  return {
    weton: w.weton,
    mataPencaharian: { hari: MATA_PENCAHARIAN_HARI[w.hari], sumber: MATA_PENCAHARIAN_HARI.sumber },
    wiji: wiji(input),
    nafkah: {
      kategori,
      hariSri: kategori === 'Sri',
      anjuran: NAFKAH.anjuran,
      sumber: NAFKAH.sumber
    },
    arah: {
      ...arah,
      anjuran: SRI_SADANA.anjuran,
      sumber: SRI_SADANA.sumber
    },
    arahBerhasil: {
      arah: berhasil,
      keterangan: berhasil.length < 2 ? 'Arah kedua tidak tercetak di kitab.' : null,
      sumber: ARAH_BERHASIL.sumber
    },
    catatan: CATATAN_REZEKI
  };
}
