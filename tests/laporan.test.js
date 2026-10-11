/**
 * Tes model laporan Primbon: nilai kunci, batas magrib, rentang tanggal, dan penyaringan isi
 * (tanpa ritual, tanpa watak perempuan menurut weton).
 */
import { test, describe } from 'node:test';
import assert from 'node:assert';
import { bangunLaporan, hariJawaDari, sumberTeks, CATATAN_TRADISI } from '../src/situs/laporan.js';
import { validasiTanggal, bacaJam, masukanDariParam, paramDariMasukan, paramDariAlamat, TANGGAL_AWAL, TANGGAL_AKHIR } from '../src/situs/masukan.js';
import { tafsirLahir, nomorHari, isoDariNomor } from '../src/mesin/index.js';

const masukan = (tanggal, jam = null, nama = '') => ({ tanggal, jam, nama });
/** Isi yang tampil (tanpa masukan mentah, yang boleh berisi null). */
const teksSemua = l => JSON.stringify({ ringkasan: l.ringkasan, bagian: l.bagian, weton: l.weton, tanggalJawa: l.tanggalJawa });

describe('sumber kitab', () => {
  test('bab dan halaman diringkas', () => {
    assert.equal(sumberTeks({ bab: 97, halaman: [54] }), 'Bab 97, hlm. 54');
    assert.equal(sumberTeks({ bab: 92, halaman: [54, 55, 56] }), 'Bab 92, hlm. 54-56');
    assert.equal(sumberTeks({ bab: [97, 109], halaman: [60, 73, 74] }), 'Bab 97 dan 109, hlm. 60, 73-74');
    assert.equal(sumberTeks(null), '');
    assert.equal(sumberTeks([{ bab: 1, halaman: [6] }, { bab: 2, halaman: [7] }]), 'Bab 1, hlm. 6; Bab 2, hlm. 7');
  });
});

describe('hari Jawa dan batas magrib', () => {
  test('sebelum 18.00 memakai tanggal sipil; 18.00 dan sesudahnya hari berikutnya; tanpa jam apa adanya', () => {
    assert.equal(hariJawaDari(masukan('2025-06-26', '17:59')).iso, '2025-06-26');
    assert.equal(hariJawaDari(masukan('2025-06-26', '18:00')).iso, '2025-06-27');
    assert.equal(hariJawaDari(masukan('2025-06-26', '23:59')).iso, '2025-06-27');
    assert.equal(hariJawaDari(masukan('2025-06-26', null)).iso, '2025-06-26');
    assert.equal(hariJawaDari(masukan('2025-12-31', '20:00')).iso, '2026-01-01');
  });
  test('weton bergeser mengikuti hari Jawa (lahir Kamis 26 Jun 2025 malam = Jumat Kliwon)', () => {
    assert.equal(bangunLaporan(masukan('2025-06-26', '18:30')).weton.teks, 'Jumat Kliwon');
    assert.equal(bangunLaporan(masukan('2025-06-26', '10:00')).weton.teks, 'Kamis Wage');
  });
});

describe('nilai kunci', () => {
  test('17 Mei 1990: Kamis Kliwon, neptu 16, Marakeh, 22 Sawal 1922 AJ', () => {
    const l = bangunLaporan(masukan('1990-05-17'));
    assert.equal(l.weton.teks, 'Kamis Kliwon');
    assert.deepEqual(l.weton.neptu, { hari: 8, pasaran: 8, total: 16 });
    assert.deepEqual([l.weton.wuku, l.weton.nomorWuku], ['Marakeh', 18]);
    assert.deepEqual([l.tanggalJawa.dina, l.tanggalJawa.wulan, l.tanggalJawa.tahun, l.tanggalJawa.taun], [22, 'Sawal', 1922, 'Jimakir']);
    assert.deepEqual(l.ringkasan.map(r => r[0]), ['Weton', 'Neptu', 'Wuku', 'Tanggal Jawa', 'Tahun']);
  });
  test('17 Agustus 1945 adalah Jumat Legi, 9 Pasa 1876 AJ', () => {
    const l = bangunLaporan(masukan('1945-08-17'));
    assert.equal(l.weton.teks, 'Jumat Legi');
    assert.deepEqual([l.tanggalJawa.dina, l.tanggalJawa.wulan, l.tanggalJawa.tahun], [9, 'Pasa', 1876]);
  });
  test('urutan bagian: watak, lambang, tanggal, neptu, rezeki, kesehatan; nama hanya bila diisi', () => {
    assert.deepEqual(bangunLaporan(masukan('1990-05-17')).bagian.map(b => b.id), ['watak', 'lambang', 'tanggal', 'neptu', 'rezeki', 'kesehatan']);
    assert.deepEqual(bangunLaporan(masukan('1990-05-17', null, 'Wirya')).bagian.map(b => b.id), ['watak', 'lambang', 'tanggal', 'neptu', 'nama', 'rezeki', 'kesehatan']);
  });
  test('catatan tradisi dan peringatan kesehatan selalu ada', () => {
    const l = bangunLaporan(masukan('1990-05-17'));
    assert.equal(l.catatan, CATATAN_TRADISI);
    assert.match(l.bagian.find(b => b.id === 'kesehatan').peringatan, /bukan nasihat medis/);
  });
  test('komponen nama dikenali diberi arah', () => {
    const n = bangunLaporan(masukan('1990-05-17', null, 'Wirya')).bagian.find(b => b.id === 'nama');
    const komponen = n.butir.find(x => x.judul.startsWith('Komponen'));
    assert.equal(komponen.item[0].teks, 'Wirya (tingkat sedang)');
    assert.equal(komponen.item[0].arah, 'netral');
  });
});

describe('batas rentang tanggal', () => {
  test('ujung rentang dapat dihitung, termasuk bergeser ke hari berikutnya', () => {
    assert.doesNotThrow(() => bangunLaporan(masukan(TANGGAL_AWAL)));
    assert.doesNotThrow(() => bangunLaporan(masukan(TANGGAL_AWAL, '23:00')));
    const akhir = bangunLaporan(masukan(TANGGAL_AKHIR, '19:00'));
    assert.equal(akhir.hariJawa.iso, '2052-08-26');
    assert.equal(akhir.spekulatif, true);
  });
  test('validasi menolak di luar rentang dan tanggal mustahil', () => {
    assert.equal(validasiTanggal(7, 7, 1633).ok, false);
    assert.equal(validasiTanggal(8, 7, 1633).ok, true);
    assert.equal(validasiTanggal(25, 8, 2052).ok, true);
    assert.equal(validasiTanggal(26, 8, 2052).ok, false);
    assert.equal(validasiTanggal(29, 2, 2023).ok, false);
    assert.equal(validasiTanggal(29, 2, 2024).ok, true);
    assert.equal(validasiTanggal(31, 4, 1990).ok, false);
    assert.equal(validasiTanggal('', 4, 1990).ok, false);
    assert.equal(validasiTanggal(1, 4, '').ok, false);
  });
  test('jam: format 24 jam, kosong diizinkan', () => {
    assert.deepEqual(bacaJam(''), { ok: true, jam: null });
    assert.deepEqual(bacaJam('7.05'), { ok: true, jam: '07:05' });
    assert.equal(bacaJam('24.00').ok, false);
    assert.equal(bacaJam('18.60').ok, false);
    assert.equal(bacaJam('abc').ok, false);
  });
});

describe('alamat: data lahir di fragmen', () => {
  test('bolak-balik masukan dan parameter', () => {
    const m = { tanggal: '1990-05-17', jam: '14:30', nama: 'Budi' };
    assert.deepEqual(masukanDariParam(paramDariMasukan(m)), m);
    assert.deepEqual(masukanDariParam('d=1990-05-17'), { tanggal: '1990-05-17', jam: null, nama: '' });
    assert.equal(masukanDariParam('d=1500-01-01'), null);
    assert.equal(masukanDariParam('d=salah'), null);
    assert.equal(masukanDariParam('t=10:00'), null);
  });
  test('hanya fragmen yang dibaca; query dan jangkar biasa tidak', () => {
    assert.equal(paramDariAlamat({ hash: '#d=1990-05-17', search: '?d=1999-01-01' }).get('d'), '1990-05-17');
    assert.equal(paramDariAlamat({ hash: '', search: '?d=1999-01-01' }).get('d'), null);
    assert.equal(paramDariAlamat({ hash: '#watak', search: '' }).get('d'), null);
  });
});

describe('penyaringan isi: sapuan seluruh rentang kalender', () => {
  const ritual = /sajen|sesaji|sesajen|\bdoa\b|\bdo'a\b|mantra|tumbal|ramuan|selamatan|slametan|kenduri|jampi|azimat|bubur|\bwafak\b/i;
  test('tiap 97 hari dari 1633 sampai 2052: tanpa galat, tanpa nilai rusak, tanpa ritual', () => {
    const awal = nomorHari(TANGGAL_AWAL);
    const akhir = nomorHari(TANGGAL_AKHIR);
    const wetonTampil = new Set();
    let n = 0;
    for (let d = awal; d <= akhir; d += 97) {
      const iso = isoDariNomor(d);
      const l = bangunLaporan(masukan(iso));
      const teks = teksSemua(l);
      const sisa = teks.replace(/"(catatan|arah|keterangan)":null|"sumber":""/g, '');
      assert.ok(!/undefined|NaN|\[object|:null|,null|\[null/.test(sisa), `${iso}: nilai rusak: ${sisa.match(/.{40}(undefined|NaN|\[object|:null|,null|\[null).{20}/)?.[0]}`);
      assert.ok(!ritual.test(teks), `${iso}: kata ritual: ${teks.match(ritual)?.[0]}`);
      assert.ok(l.bagian.length >= 6 && l.bagian.every(b => b.butir.length > 0), `${iso}: bagian kosong`);
      for (const b of l.bagian) for (const x of b.butir) assert.ok(x.judul && !/:\s*$/.test(x.judul), `${iso}: judul rusak "${x.judul}"`);
      wetonTampil.add(l.weton.teks);
      n++;
    }
    assert.equal(wetonTampil.size, 35);
    assert.ok(n > 1500); // 97 saling prima dengan 35 dan 210: semua weton dan wuku tersapu
  });
  test('watak perempuan menurut weton tidak ikut ke laporan', () => {
    for (let d = nomorHari('2024-01-01'); d < nomorHari('2024-01-01') + 35; d++) {
      const iso = isoDariNomor(d);
      const wanita = tafsirLahir(iso).watak.weton?.wanita;
      if (!wanita) continue;
      assert.ok(!teksSemua(bangunLaporan(masukan(iso))).includes(wanita), `${iso}: teks khusus perempuan muncul`);
    }
  });
});
