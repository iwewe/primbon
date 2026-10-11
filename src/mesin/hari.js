/**
 * Tinjauan hari baik dan hari naas untuk satu tanggal, menurut kitab Betaljemur Adammakna
 * (bab 3-14 dan 26-33). Datanya di src/data/hari.js.
 *
 * Aturan yang hanya memakai hari, pasaran, atau wuku bersifat pasti (tidak bergantung kalender).
 * Aturan yang memakai tanggal, bulan, atau tahun Jawa ditandai `bergantungTanggalJawa: true`:
 * hasilnya bergantung pada kalender Jawa yang dipakai (selisih sehari mungkin terjadi).
 */
import { kalenderJawa, nomorHari, isoDariNomor, WULAN } from './kalender.js';
import {
  BEPERGIAN, TALIWANGKE, SAMPARWANGKE, KUNARPAWARSA, SANGARWARSA, BULAN_HARI, BULAN_NIKAH_TAHUN,
  ANGGARAKASIH, PANTANGAN_BULAN, TANGGAL_SANGAR_BULAN, TANGGAL_NABI, TANGGAL_NAAS, TANGGAL_SANGAR_AKAD,
  BANGAS_PADEWAN, TALIWANGKE_AKAD, BULAN_NIKAH
} from './data/hari.js';

export const CATATAN_HARI = 'Tafsir tradisional dari kitab Betaljemur Adammakna. Aturan bertanda bergantungTanggalJawa memakai tanggal Jawa, yang bisa bergeser sehari.';

/** Apakah bulan Jawa yang memuat `dt` memiliki hari dengan weton tertentu (mis. Selasa Kliwon). */
function bulanMemuat(dt, dina, wulan, tahun, wetonDicari) {
  const awal = dt - (dina - 1);
  for (let i = 0; i < 31; i++) {
    const k = kalenderJawa(isoDariNomor(awal + i));
    if (k.tanggal.wulan !== wulan || k.tanggal.tahun !== tahun) break;
    if (k.weton === wetonDicari) return true;
  }
  return false;
}

/**
 * @param {*} input tanggal Masehi (format apa pun yang diterima nomorHari); minimal 8 Juli 1633
 * @param {{untuk?: 'semua'|'nikah'|'umum'|'bepergian'}} [opsi]
 */
export function tinjauHari(input, { untuk = 'semua' } = {}) {
  const dt = nomorHari(input);
  const k = kalenderJawa(input);
  const { dina, wulan, taun, tahun } = k.tanggal;
  const temuan = [];
  const add = (topik, jenis, arah, ringkas, sumber, bergantungTanggalJawa = false) =>
    temuan.push({ topik, untuk: jenis, arah, ringkas, sumber, bergantungTanggalJawa });

  // --- hanya weton / wuku (pasti) ---
  if (BEPERGIAN.sangatJelek.weton.includes(k.weton)) {
    add('Hari sangat jelek untuk bepergian', 'bepergian', 'buruk', `${k.weton} termasuk hari yang sangat dihindari untuk bepergian.`, BEPERGIAN.sangatJelek.sumber);
  } else if (BEPERGIAN.tidakBaik.weton.includes(k.weton)) {
    add('Hari kurang baik untuk bepergian', 'bepergian', 'buruk', `${k.weton} termasuk hari yang dihindari untuk bepergian.`, BEPERGIAN.tidakBaik.sumber);
  }
  const tali = TALIWANGKE.daftar.find(e => e.wuku === k.wuku && e.weton === k.weton);
  if (tali) add(`Taliwangke ${tali.nama}`, 'umum', 'buruk', `Hari sengkala (wuku ${tali.wuku}); sebaiknya tidak mengerjakan hal penting. Lambangnya: ${tali.lambang.toLowerCase()}.`, TALIWANGKE.sumber);
  const samp = SAMPARWANGKE.daftar.find(e => e.wuku === k.wuku && e.weton === k.weton);
  if (samp) add('Samparwangke', 'umum', 'buruk', `Hari naas seseorang (wuku ${samp.wuku}); dihindari untuk mengerjakan sesuatu.`, SAMPARWANGKE.sumber);

  // --- hari pekan menurut bulan Jawa (bab 9, 10, 26, 27) ---
  const kel = BULAN_HARI.kelompok.find(g => g.bulan.includes(wulan));
  if (kel) {
    if (kel.rahayu.includes(k.hari)) add('Bulan rahayu', 'umum', 'baik', `${k.hari} di bulan ${wulan}: hari baik untuk mengerjakan keperluan.`, BULAN_HARI.sumber.rahayu, true);
    else if (kel.sarju.includes(k.hari)) add('Bulan sarju', 'umum', 'netral', `${k.hari} di bulan ${wulan}: hari sedang untuk mengerjakan keperluan.`, BULAN_HARI.sumber.sarju, true);
    else if (kel.tidakBaik.includes(k.hari)) add('Hari tidak baik menurut bulan', 'nikah', 'buruk', `${k.hari} di bulan ${wulan}: tidak boleh untuk hajat nikah.`, BULAN_HARI.sumber.tidakBaik, true);
    else if (kel.sangar.includes(k.hari)) add('Hari sangar menurut bulan', 'nikah', 'buruk', `${k.hari} di bulan ${wulan}: hari sangar, tidak boleh untuk hajat nikah.`, BULAN_HARI.sumber.sangar, true);
  }

  // --- tanggal, bulan, dan tahun Jawa ---
  if (wulan === 'Sura' && dina === 3) {
    add(`Sangarwarsa (tahun ${taun})`, 'nikah', 'buruk', 'Tiga hari setelah tahun baru Jawa; dilarang untuk hajat nikah.', SANGARWARSA.sumber, true);
  }
  if (wulan === 'Besar') {
    const besok = kalenderJawa(isoDariNomor(dt + 1));
    if (besok.tanggal.wulan === 'Sura') {
      add(`Kunarpawarsa (tahun ${taun})`, 'nikah', 'buruk', 'Hari terakhir tahun Jawa (tahun bencana); dilarang untuk hajat nikah.', KUNARPAWARSA.sumber, true);
    }
  }
  const idx = WULAN.indexOf(wulan) + 1;
  const bt = BULAN_NIKAH_TAHUN.tabel[taun];
  if (bt?.baik.includes(idx)) add(`Bulan ${wulan} baik untuk tahun ${taun}`, 'nikah', 'baik', `Bulan ${wulan} termasuk bulan yang baik untuk hajat nikah pada tahun ${taun}.`, BULAN_NIKAH_TAHUN.sumber, true);
  if (bt?.tidakBaik.includes(idx)) add(`Bulan ${wulan} kurang baik untuk tahun ${taun}`, 'nikah', 'buruk', `Bulan ${wulan} termasuk bulan yang tidak baik untuk hajat nikah pada tahun ${taun}.`, BULAN_NIKAH_TAHUN.sumber, true);

  const pb = PANTANGAN_BULAN.tabel[taun];
  if (pb?.bulan.includes(wulan)) add(`Pantangan bulan (tahun ${taun})`, 'nikah', 'buruk', `Bulan ${wulan} tahun ${taun} dihindari untuk hajat nikah; gangguan yang disebut: ${pb.gangguan.toLowerCase()}.`, PANTANGAN_BULAN.sumber, true);

  const ts = TANGGAL_SANGAR_BULAN.tabel[wulan];
  if (ts.tanggal.includes(dina)) add('Tanggal sangar', 'umum', 'buruk', `Tanggal ${dina} ${wulan} dihindari untuk keperluan penting; akibat yang disebut: ${ts.akibat.toLowerCase()}.`, TANGGAL_SANGAR_BULAN.sumber, true);
  if (ts.weton === k.weton) add('Hari Taliwangke bulan ini', 'umum', 'buruk', `${k.weton} adalah hari Taliwangke bulan ${wulan}; akibat yang disebut: ${ts.akibat.toLowerCase()}.`, TANGGAL_SANGAR_BULAN.sumber, true);

  const nabi = TANGGAL_NABI.tabel[wulan];
  if (nabi?.tanggal.includes(dina)) add('Peristiwa nabi', 'nikah', 'buruk', `Tanggal ${dina} ${wulan} (${nabi.peristiwa.toLowerCase()}) tidak boleh untuk hajat nikah.`, TANGGAL_NABI.sumber, true);
  if (TANGGAL_NAAS.tabel[wulan].includes(dina)) add("Tanggal na'as", 'nikah', 'buruk', `Tanggal ${dina} ${wulan} termasuk tanggal na'as; dilarang untuk hajat nikah.`, TANGGAL_NAAS.sumber, true);
  if (TANGGAL_SANGAR_AKAD.tabel[wulan].includes(dina)) add('Tanggal sangar untuk akad', 'nikah', 'buruk', `Tanggal ${dina} ${wulan} jangan dipakai untuk akad nikah.`, TANGGAL_SANGAR_AKAD.sumber, true);
  if (BANGAS_PADEWAN.tabel[wulan].includes(dina)) add('Bangas Padewan', 'nikah', 'buruk', `Tanggal ${dina} ${wulan} adalah hari Bangas; jika dilanggar mendatangkan kesukaran.`, BANGAS_PADEWAN.sumber, true);
  const tk = TALIWANGKE_AKAD.tabel.find(e => e.bulan.includes(wulan) && e.weton === k.weton);
  if (tk) add('Taliwangke untuk akad', 'nikah', 'buruk', `${k.weton} di bulan ${wulan}: jangan dipakai untuk akad nikah.`, TALIWANGKE_AKAD.sumber, true);

  // --- nilai bulan untuk hajat nikah (bab 33) dan Anggarakasih (bab 12) ---
  const bn = BULAN_NIKAH.tabel[wulan];
  add(`Bulan ${wulan} untuk hajat nikah`, 'nikah', bn.arah, `${bn.makna}.`, BULAN_NIKAH.sumber, true);
  const adaSelasaKliwon = bulanMemuat(dt, dina, wulan, tahun, 'Selasa Kliwon');
  if (!adaSelasaKliwon) {
    add('Bulan tanpa Anggarakasih', 'nikah', 'buruk', `Bulan ${wulan} ${tahun} tidak memiliki hari Selasa Kliwon (Anggarakasih); dilarang untuk hajat nikah.`, ANGGARAKASIH.sumber, true);
  } else if (BULAN_NIKAH.syaratSelasaKliwon.includes(wulan)) {
    const adaJumatKliwon = bulanMemuat(dt, dina, wulan, tahun, 'Jumat Kliwon');
    add(`Bulan ${wulan} memiliki Anggarakasih`, 'nikah', 'baik', adaJumatKliwon ? 'Memiliki Selasa Kliwon dan Jumat Kliwon: sangat baik untuk hajat nikah.' : 'Memiliki Selasa Kliwon: baik untuk hajat nikah.', BULAN_NIKAH.sumber, true);
  }

  const hasil = untuk === 'semua' ? temuan : temuan.filter(t => t.untuk === untuk);
  const ringkasan = { baik: 0, buruk: 0, netral: 0 };
  for (const t of hasil) ringkasan[t.arah] += 1;
  return {
    masehi: k.masehi,
    weton: k.weton,
    wuku: k.wuku,
    tanggalJawa: `${dina} ${wulan} ${tahun} AJ`,
    temuan: hasil,
    ringkasan,
    catatan: CATATAN_HARI
  };
}
