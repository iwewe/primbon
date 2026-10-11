/**
 * Tes model rilis 2 (Jodoh, Hari baik, Jam), pembangun butir bersama, dan pembacaan alamat.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert';
import { bangunJodoh, tinjauanHari, cariHari, bangunJam, KEPERLUAN } from '../src/situs/alat.js';
import { jamTeks, rentangJam, rentangDariJam, sumberTeks, tafsir, tabel } from '../src/situs/butir.js';
import {
  masukanHariDariParam, paramDariHari, masukanJamDariParam, paramDariJam, masukanJodohDariParam, paramDariJodoh, TANGGAL_AWAL, TANGGAL_AKHIR
} from '../src/situs/masukan.js';
import { nomorHari, isoDariNomor } from '../src/mesin/index.js';

const orang = (tanggal, jam = null, nama = '') => ({ tanggal, jam, nama });
const ritual = /sajen|sesaji|sesajen|\bdoa\b|\bdo'a\b|mantra|tumbal|ramuan|selamatan|slametan|kenduri|jampi|azimat|bubur|\bwafak\b/i;
const rusak = /undefined|NaN|\[object|:null|,null|\[null/;
const bersihTeks = o => JSON.stringify(o).replace(/"(catatan|arah|keterangan|sumber)":(null|"")/g, '');

describe('butir bersama', () => {
  test('jam desimal menjadi HH.MM, termasuk dini hari berikutnya', () => {
    assert.equal(jamTeks(6), '06.00');
    assert.equal(jamTeks(8.4), '08.24');
    assert.equal(jamTeks(25), '01.00');
    assert.equal(jamTeks(30), '06.00');
    assert.equal(rentangJam(23, 25), '23.00–01.00');
    assert.equal(rentangDariJam([13, 14, 15]), '13.00–16.00');
    assert.equal(rentangDariJam([8, 9, 6, 7]), '06.00–10.00');
    assert.equal(rentangDariJam([10, 8]), '08.00–09.00 dan 10.00–11.00');
  });
  test('tafsir dan tabel kosong menjadi null; arah mesin diterjemahkan', () => {
    assert.equal(tafsir('x', ''), null);
    assert.equal(tafsir('x', 'isi', { a: 'buruk' }).arah, 'waspada');
    assert.equal(tafsir('x', 'isi', { a: 'baik' }).arah, 'baik');
    assert.equal(tafsir('x', 'isi').arah, null);
    assert.equal(tabel('t', ['a'], []), null);
    assert.equal(sumberTeks({ bab: 15, halaman: [12, 13] }), 'Bab 15, hlm. 12-13');
  });
});

describe('Jodoh', () => {
  const r = bangunJodoh(orang('1990-05-17'), orang('1992-11-03'));
  test('weton dan neptu kedua pihak', () => {
    assert.deepEqual(r.pihak.map(p => [p.weton, p.neptu]), [['Kamis Kliwon', 16], ['Selasa Legi', 8]]);
  });
  test('hitungan dasar: sisa sembilan 7&8 waspada, sisa empat Punggel waspada, pasangan hari Selasa&Kamis baik', () => {
    const d = r.bagian.find(b => b.id === 'dasar');
    assert.deepEqual(d.ringkasan, { baik: 1, waspada: 2, netral: 0 });
    assert.deepEqual(d.butir.slice(0, 3).map(x => x.arah), ['waspada', 'waspada', 'baik']);
    assert.match(d.butir[1].judul, /Punggel/);
    assert.match(d.butir[2].judul, /Selasa dan Kamis/);
    assert.ok(d.butir.slice(0, 3).every(x => /^Bab \d+/.test(x.sumber)));
  });
  test('bagian nama hanya bila kedua nama diisi', () => {
    assert.deepEqual(r.bagian.map(b => b.id), ['dasar', 'weton']);
    assert.equal(r.adaNama, false);
    const n = bangunJodoh(orang('1990-05-17', null, 'Budi Santoso'), orang('1992-11-03', null, 'Siti Aminah'));
    assert.deepEqual(n.bagian.map(b => b.id), ['dasar', 'weton', 'nama']);
    assert.equal(bangunJodoh(orang('1990-05-17', null, 'Budi'), orang('1992-11-03')).adaNama, false);
  });
  test('jam sesudah magrib menggeser weton pihak itu', () => {
    const g = bangunJodoh(orang('1990-05-17', '19:00'), orang('1992-11-03', '10:00'));
    assert.equal(g.pihak[0].hariJawa.iso, '1990-05-18');
    assert.equal(g.pihak[0].weton, 'Jumat Legi');
    assert.equal(g.pihak[1].weton, 'Selasa Legi');
  });
  test('catatan menegaskan hasil bukan larangan dan keputusan milik pengguna', () => {
    assert.match(r.catatan, /bukan kepastian dan bukan larangan/);
    assert.match(r.catatan, /milik Anda berdua/);
  });
});

describe('Hari baik', () => {
  test('20 Oktober 2026 untuk pernikahan: Selasa Kliwon, 8 Jumadilawal 1960 AJ, satu waspada satu netral', () => {
    const t = tinjauanHari({ tanggal: '2026-10-20', untuk: 'nikah' });
    assert.equal(t.weton, 'Selasa Kliwon');
    assert.equal(t.tanggalJawa, '8 Jumadilawal 1960 AJ');
    assert.deepEqual(t.ringkasan, { baik: 0, waspada: 1, netral: 1 });
    assert.deepEqual(t.bagian.map(b => b.judul), ['Pernikahan']);
    assert.ok(t.bagian[0].butir.every(b => b.sumber.startsWith('Bab') && b.catatan?.includes('tanggal Jawa')));
  });
  test('hari tanpa catatan ditandai kosong, bukan baik', () => {
    const t = tinjauanHari({ tanggal: '2026-10-17', untuk: 'bepergian' });
    assert.equal(t.kosong, true);
    assert.deepEqual(t.ringkasan, { baik: 0, waspada: 0, netral: 0 });
    assert.match(t.catatan, /bukan berarti hari itu baik/);
  });
  test('keperluan tersedia dan tiap keperluan dapat dihitung', () => {
    assert.deepEqual(KEPERLUAN.map(k => k.id), ['semua', 'umum', 'nikah', 'bepergian']);
    for (const k of KEPERLUAN) assert.doesNotThrow(() => tinjauanHari({ tanggal: '2026-10-20', untuk: k.id }));
  });
  test('cariHari: 14 hari berurutan; berhenti di batas rentang', () => {
    const h = cariHari({ dari: '2026-10-17', jumlah: 14, untuk: 'nikah' });
    assert.equal(h.length, 14);
    assert.equal(h[0].iso, '2026-10-17');
    assert.equal(h[13].iso, '2026-10-30');
    h.forEach((x, i) => i && assert.equal(nomorHari(x.iso), nomorHari(h[i - 1].iso) + 1));
    assert.equal(cariHari({ dari: '2052-08-20', jumlah: 14 }).length, 6);
    assert.equal(cariHari({ dari: TANGGAL_AWAL, jumlah: 3 })[0].iso, TANGGAL_AWAL);
  });
});

describe('Jam', () => {
  const rows = (r, id) => r.bagian.find(b => b.id === id).butir.filter(b => b.jenis === 'tabel');
  test('tanpa jam: enam bagian, tidak ada baris bertanda, tidak ada bagian "pada jam"', () => {
    const r = bangunJam({ tanggal: '2026-10-17', jam: null });
    assert.deepEqual(r.bagian.map(b => b.id), ['saat-agung', 'saat-12', 'jam-sial-baik', 'saat-malaikat', 'perkara', 'akad']);
    assert.equal(r.padaJam, null);
    for (const b of r.bagian) for (const x of b.butir) if (x.jenis === 'tabel') assert.ok(!x.tanda.some(Boolean), `${b.id}: ada tanda tanpa jam`);
    assert.equal(r.weton, 'Sabtu Pahing');
  });
  test('09.30: saat agung Cahya (09-11) ditandai tepat satu baris; ada ringkasan pada jam', () => {
    const r = bangunJam({ tanggal: '2026-10-17', jam: '09:30' });
    const t = rows(r, 'saat-agung')[0];
    assert.deepEqual(t.tanda.map((x, i) => (x ? i : -1)).filter(i => i >= 0), [2]);
    assert.equal(t.baris[2][1].teks, 'Cahya');
    assert.equal(r.padaJam.jam, '09.30');
    assert.match(r.padaJam.butir[0].judul, /Cahya/);
  });
  test('01.00 dini hari ditandai pada bagian malam (25-27), bukan siang', () => {
    const r = bangunJam({ tanggal: '2026-10-17', jam: '01:00' });
    const [siang, malam] = rows(r, 'saat-12');
    assert.ok(!siang.tanda.some(Boolean));
    assert.equal(malam.tanda.filter(Boolean).length, 1);
    assert.equal(malam.baris[malam.tanda.indexOf(true)][1], 'Lingsir malam');
  });
  test('18.30: tidak ada saat agung, tetapi bagian malam "Sore" ditandai', () => {
    const r = bangunJam({ tanggal: '2026-10-17', jam: '18:30' });
    assert.ok(!rows(r, 'saat-agung')[0].tanda.some(Boolean));
    const malam = rows(r, 'saat-12')[1];
    assert.equal(malam.baris[malam.tanda.indexOf(true)][1], 'Sore');
  });
  test('rentang saat agung menutup 06.00-18.00 tanpa celah', () => {
    const t = rows(bangunJam({ tanggal: '2026-10-17', jam: null }), 'saat-agung')[0];
    assert.equal(t.baris[0][0].slice(0, 5), '06.00');
    assert.equal(t.baris.at(-1)[0].slice(-5), '18.00');
    for (let i = 1; i < t.baris.length; i++) assert.equal(t.baris[i][0].slice(0, 5), t.baris[i - 1][0].slice(-5));
  });
});

describe('alamat alat', () => {
  test('hari: bolak-balik; keperluan tak dikenal menjadi semua; tanggal tidak sah ditolak', () => {
    assert.deepEqual(masukanHariDariParam(paramDariHari({ tanggal: '2026-10-17', untuk: 'nikah' })), { tanggal: '2026-10-17', untuk: 'nikah' });
    assert.equal(masukanHariDariParam('d=2026-10-17&u=lain').untuk, 'semua');
    assert.equal(paramDariHari({ tanggal: '2026-10-17', untuk: 'semua' }).toString(), 'd=2026-10-17');
    assert.equal(masukanHariDariParam('d=1500-01-01'), null);
    assert.equal(masukanHariDariParam('u=nikah'), null);
  });
  test('jam: bolak-balik; jam tidak sah menolak seluruhnya', () => {
    assert.deepEqual(masukanJamDariParam(paramDariJam({ tanggal: '2026-10-17', jam: '09:30' })), { tanggal: '2026-10-17', jam: '09:30' });
    assert.deepEqual(masukanJamDariParam('d=2026-10-17'), { tanggal: '2026-10-17', jam: null });
    assert.equal(masukanJamDariParam('d=2026-10-17&t=99:99'), null);
  });
  test('jodoh: bolak-balik dua pihak; salah satu tanggal tidak sah menolak', () => {
    const m = { pria: orang('1990-05-17', '19:00', 'Budi'), wanita: orang('1992-11-03', null, 'Siti') };
    assert.deepEqual(masukanJodohDariParam(paramDariJodoh(m)), m);
    assert.equal(masukanJodohDariParam('a=1990-05-17'), null);
    assert.equal(masukanJodohDariParam('a=1990-05-17&b=2100-01-01'), null);
    assert.equal(masukanJodohDariParam('a=1990-05-17&b=1992-11-03&ta=88:00'), null);
  });
});

describe('penyaringan isi: sapuan rentang kalender', () => {
  test('tiap 97 hari: Jam, Hari baik (semua keperluan), dan Jodoh tanpa galat, tanpa nilai rusak, tanpa ritual', () => {
    const awal = nomorHari(TANGGAL_AWAL);
    const akhir = nomorHari(TANGGAL_AKHIR);
    let n = 0;
    for (let d = awal; d <= akhir; d += 97) {
      const iso = isoDariNomor(d);
      const pasangan = isoDariNomor(Math.min(d + 1234, akhir));
      const hasil = [
        ['jam', bangunJam({ tanggal: iso, jam: n % 3 === 0 ? '10:00' : null })],
        ...KEPERLUAN.map(k => [`hari-${k.id}`, tinjauanHari({ tanggal: iso, untuk: k.id })]),
        ['jodoh', bangunJodoh(orang(iso, n % 2 ? '19:00' : null, 'Budi'), orang(pasangan, null, 'Siti'))]
      ];
      for (const [nama, x] of hasil) {
        const teks = bersihTeks(x.bagian);
        assert.ok(!rusak.test(teks), `${nama} ${iso}: nilai rusak: ${teks.match(/.{30}(undefined|NaN|\[object|:null|,null|\[null).{20}/)?.[0]}`);
        assert.ok(!ritual.test(teks), `${nama} ${iso}: kata ritual: ${teks.match(ritual)?.[0]}`);
        for (const b of x.bagian) for (const it of b.butir) assert.ok(it.judul && !/:\s*$/.test(it.judul), `${nama} ${iso}: judul rusak "${it.judul}"`);
      }
      n++;
    }
    assert.ok(n > 1500);
  });
});

describe('Jam: suhara', () => {
  test('hari dengan satu angka tidak menghasilkan rentang rusak; hari dengan dua angka menjadi rentang', () => {
    const fakta = (tgl) => bangunJam({ tanggal: tgl, jam: null }).bagian.find(b => b.id === 'akad').butir.find(b => b.jenis === 'fakta');
    const senin = fakta('2026-10-12'); // Senin Wage: siang [11], malam [21, 28]
    assert.deepEqual(senin.baris.slice(0, 2), [['Siang', 'sekitar pukul 11.00'], ['Malam', '21.00–04.00']]);
    const minggu = fakta('2026-10-11'); // Minggu Legi: siang [7, 14], malam [24]
    assert.deepEqual(minggu.baris.slice(0, 2), [['Siang', '07.00–14.00'], ['Malam', 'sekitar pukul 00.00']]);
    assert.ok(fakta('2026-10-17').baris.some(([k]) => k === 'Catatan cetak kitab')); // Sabtu
  });
});
