/**
 * Tes model rilis 3 (Rumah, Bepergian, Hajatan) dan pembacaan alamatnya, termasuk penyaringan isi.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert';
import { bangunRumah, bangunBepergian, bangunHajatan, JENIS_UKURAN } from '../src/situs/alatLanjut.js';
import {
  masukanRumahDariParam, paramDariRumah, masukanBepergianDariParam, paramDariBepergian, masukanHajatanDariParam, paramDariHajatan,
  TANGGAL_AWAL, TANGGAL_AKHIR, SISI_RUMAH, ARAH_MATA_ANGIN, METODE_PINTU, MODE_HAJATAN, JENIS_UKURAN as ID_UKURAN
} from '../src/situs/masukan.js';
import { tinjauBepergian, nomorHari, isoDariNomor } from '../src/mesin/index.js';

// "selamatan" boleh pada Hajatan (nama acara); isi dan wadahnya tidak.
const ritual = /sajen|sesaji|sesajen|\bdoa\b|\bdo'a\b|mantra|tumbal|ramuan|jampi|azimat|bubur|takir|tetesan|khitan perempuan|\bwafak\b/i;
const rusak = /undefined|NaN|\[object|:null|,null|\[null/;
const bersihTeks = o => JSON.stringify(o).replace(/"(catatan|arah|keterangan|sumber|ringkasan|sub)":(null|"")/g, '');
const semuaTeks = r => bersihTeks({ hero: r.hero, bagian: r.bagian });

describe('Rumah', () => {
  test('arah hadap menurut weton pemilik: lahir 17 Mei 1990 (Kamis Kliwon, neptu 16) menghadap Barat', () => {
    const r = bangunRumah({ k: 'arah', tanggal: '1990-05-17', jam: null });
    assert.equal(r.hero.judul, 'Menghadap Barat');
    assert.match(r.hero.sub, /Kamis Kliwon, neptu 16/);
    assert.equal(r.bagian[0].butir[0].arah, 'baik');
    assert.match(r.bagian[0].butir[0].sumber, /^Bab 172/);
  });
  test('jam sesudah magrib menggeser weton pemilik', () => {
    assert.match(bangunRumah({ k: 'arah', tanggal: '1990-05-17', jam: '19:00' }).hero.sub, /Jumat Legi/);
  });
  test('hari mulai membangun 20 Okt 2026: tiga kegiatan, lima hitungan neptu, bagian bangunan', () => {
    const r = bangunRumah({ k: 'hari', tanggal: '2026-10-20' });
    assert.equal(r.hero.judul, 'Selasa Kliwon');
    assert.deepEqual(r.bagian.map(b => b.id), ['rumah-mendirikan', 'rumah-genteng', 'rumah-pindah', 'rumah-siklus', 'rumah-bagian']);
    assert.equal(r.bagian[3].butir.length, 5);
    assert.deepEqual(r.bagian[2].butir.map(b => b.arah), ['waspada', 'waspada']); // pindah: sakit-sakitan, keburukan
    assert.match(r.bagian[0].butir[0].judul, /Jumadilawal/);
  });
  test('ukuran: usuk terakhir 37 = nomor 2 (Kitri, baik); jumlah berputar', () => {
    const r = bangunRumah({ k: 'ukuran', jenis: 'usukAkhir', jumlah: 37 });
    assert.equal(r.hero.judul, 'Kitri');
    assert.equal(r.bagian[0].butir[0].arah, 'baik');
    assert.equal(bangunRumah({ k: 'ukuran', jenis: 'usukAkhir', jumlah: 40 }).hero.judul, 'Pokah'); // sisa 0 = nama terakhir
    assert.equal(JENIS_UKURAN.length, ID_UKURAN.length);
  });
  test('sumur: rumah menghadap Utara, sumur di Barat Daya waspada; di Timur Laut baik', () => {
    assert.equal(bangunRumah({ k: 'sumur', menghadap: 'Utara', sumurDi: 'Barat Daya' }).bagian[0].butir[0].arah, 'waspada');
    assert.equal(bangunRumah({ k: 'sumur', menghadap: 'Utara', sumurDi: 'Timur Laut' }).bagian[0].butir[0].arah, 'baik');
  });
  test('pintu halaman: bab 194, sisi Timur 12 posisi 3 = bagian 2 dari 5', () => {
    const r = bangunRumah({ k: 'pintu', metode: 194, menghadap: 'Timur', panjang: 12, posisi: 3 });
    assert.equal(r.hero.judul, 'Bagian ke-2 dari 5');
    assert.match(r.bagian[0].pengantar, /sudut Utara/);
  });
  test('lahan: 26 keadaan dengan ringkasan arah', () => {
    const r = bangunRumah({ k: 'lahan' });
    assert.equal(r.bagian[0].butir.length, 26);
    assert.equal(r.bagian[0].ringkasan.baik + r.bagian[0].ringkasan.waspada + r.bagian[0].ringkasan.netral, 26);
  });
  test('catatan menegaskan bukan pengganti perencanaan teknik', () => {
    assert.match(bangunRumah({ k: 'lahan' }).catatan, /perencanaan teknik dan keselamatan bangunan/);
  });
});

describe('Bepergian', () => {
  const t = '2026-10-20';
  test('tanpa tujuan: tidak ada bagian tujuan; tabel arah memuat semua arah mesin', () => {
    const r = bangunBepergian({ tanggal: t, tujuan: null });
    assert.deepEqual(r.bagian.map(b => b.id), ['arah', 'waktu', 'urusan']);
    const tab = r.bagian[0].butir[0];
    assert.equal(tab.baris.length, tinjauBepergian(t).arah.length);
    assert.ok(!tab.tanda.some(Boolean));
  });
  test('dengan tujuan Timur: bagian tujuan memuat catatan arah itu dan baris tabel ditandai', () => {
    const r = bangunBepergian({ tanggal: t, tujuan: 'Timur' });
    assert.equal(r.bagian[0].id, 'tujuan');
    const dariMesin = tinjauBepergian(t).arah.filter(x => x.arah === 'Timur').length;
    assert.equal(r.bagian[0].butir.length, dariMesin);
    const tab = r.bagian.find(b => b.id === 'arah').butir[0];
    assert.equal(tab.tanda.filter(Boolean).length, dariMesin);
    assert.ok(r.bagian[0].ringkasan.waspada >= 1);
  });
  test('tujuan tanpa catatan dinyatakan sebagai tidak ada catatan, bukan baik', () => {
    const r = bangunBepergian({ tanggal: t, tujuan: 'Barat Laut' });
    if (r.bagian[0].butir.length === 0) assert.match(r.bagian[0].pengantar, /bukan berarti arah ini baik/);
  });
  test('catatan keselamatan perjalanan', () => assert.match(bangunBepergian({ tanggal: t, tujuan: null }).catatan, /keselamatan perjalanan/));
});

describe('Hajatan', () => {
  test('tarub 20 Okt 2026: tiga cara, ketiganya waspada; saat memasang merujuk halaman Jam', () => {
    const r = bangunHajatan({ k: 'tarub', tanggal: '2026-10-20', nama: '' });
    const b = r.bagian[0];
    assert.deepEqual(b.butir.slice(0, 3).map(x => x.arah), ['waspada', 'waspada', 'waspada']);
    assert.match(b.butir[3].teks, /halaman Jam/);
    assert.deepEqual(b.ringkasan, { baik: 0, waspada: 3, netral: 0 });
  });
  test('tingkeb: Sabtu 17 Okt 2026 (5 Jumadilawal) memenuhi syarat; kandidat 30 hari memuat 17 dan 21 Okt', () => {
    const r = bangunHajatan({ k: 'tingkeb', tanggal: '2026-10-17', nama: '' });
    assert.equal(r.bagian[0].butir[0].arah, 'baik');
    const daftar = r.bagian[0].butir[1].item.map(i => i.teks);
    assert.ok(daftar.some(x => x.includes('17 Oktober 2026')) && daftar.some(x => x.includes('21 Oktober 2026')));
    assert.equal(bangunHajatan({ k: 'tingkeb', tanggal: '2026-10-20', nama: '' }).bagian[0].butir[0].arah, 'netral');
  });
  test('kehamilan: sembilan bulan, tanggal bulan ke-1 = 11 Nov 2026 dari acuan 11 Okt; tanpa istilah wadah acara', () => {
    const r = bangunHajatan({ k: 'kehamilan', tanggal: '2026-10-11', nama: '' });
    const tab = r.bagian[0].butir[0];
    assert.equal(tab.baris.length, 9);
    assert.match(tab.baris[0][1], /11 November 2026/);
    assert.ok(!/takir|disebut/i.test(JSON.stringify(tab.baris)));
  });
  test('bayi: delapan tahap peringatan; Tetesan disaring; Supitan dan Menyapih tetap; nama bayi opsional', () => {
    const r = bangunHajatan({ k: 'bayi', tanggal: '2026-10-20', nama: '' });
    assert.equal(r.bagian[0].butir[0].baris.length, 8);
    assert.deepEqual(r.bagian[0].butir[1].baris.map(x => x[0].split(' ')[0]), ['Menyapih', 'Supitan']);
    assert.ok(!/tetesan/i.test(JSON.stringify(r)));
    assert.deepEqual(r.bagian.map(b => b.id), ['bayi']);
    const n = bangunHajatan({ k: 'bayi', tanggal: '2026-10-20', nama: 'Arya' });
    assert.deepEqual(n.bagian.map(b => b.id), ['bayi', 'nama-bayi']);
    assert.equal(n.bagian[1].butir[0].arah, 'netral'); // sisa 1: tidak cocok, tidak ditafsirkan
  });
  test('jam lahir bayi tidak pernah dinilai (tidak mendorong mengatur waktu persalinan)', () => {
    for (const k of MODE_HAJATAN) assert.ok(!/jam (bayi )?lahir|saat bayi lahir/i.test(semuaTeks(bangunHajatan({ k, tanggal: '2026-10-20', nama: 'Arya' }))), k);
  });
  test('catatan: bukan panduan kehamilan dan anjuran tenaga kesehatan', () => {
    assert.match(bangunHajatan({ k: 'bayi', tanggal: '2026-10-20', nama: '' }).catatan, /anjuran tenaga kesehatan/);
  });
});

describe('alamat rilis 3', () => {
  test('rumah: bolak-balik tiap mode', () => {
    const kasus = [
      { k: 'arah', tanggal: '1990-05-17', jam: '19:00' }, { k: 'hari', tanggal: '2026-10-20' }, { k: 'ukuran', jenis: 'rangka', jumlah: 23 },
      { k: 'sumur', menghadap: 'Timur', sumurDi: 'Barat Daya' }, { k: 'pintu', metode: 195, menghadap: 'Selatan', panjang: 12.5, posisi: 3 }, { k: 'lahan' }
    ];
    for (const m of kasus) {
      const lengkap = m.k === 'arah' ? m : m;
      assert.deepEqual(masukanRumahDariParam(paramDariRumah(lengkap)), lengkap, m.k);
    }
  });
  test('rumah: masukan tidak sah ditolak', () => {
    assert.equal(masukanRumahDariParam('k=ukuran&j=salah&n=3'), null);
    assert.equal(masukanRumahDariParam('k=ukuran&j=rangka&n=0'), null);
    assert.equal(masukanRumahDariParam('k=ukuran&j=rangka&n=2.5'), null);
    assert.equal(masukanRumahDariParam('k=pintu&m=194&h=Timur&p=10&x=11'), null);
    assert.equal(masukanRumahDariParam('k=pintu&m=999&h=Timur&p=10&x=1'), null);
    assert.equal(masukanRumahDariParam('k=sumur&h=Tengah&s=Barat'), null);
    assert.equal(masukanRumahDariParam('k=hari'), null);
    assert.equal(masukanRumahDariParam('k=lain'), null);
    assert.equal(masukanRumahDariParam('d=2026-10-20'), null);
  });
  test('bepergian dan hajatan: bolak-balik dan penolakan', () => {
    assert.deepEqual(masukanBepergianDariParam(paramDariBepergian({ tanggal: '2026-10-20', tujuan: 'Barat Daya' })), { tanggal: '2026-10-20', tujuan: 'Barat Daya' });
    assert.equal(masukanBepergianDariParam('d=2026-10-20&g=Atas').tujuan, null);
    assert.equal(masukanBepergianDariParam('d=1500-01-01'), null);
    const h = { k: 'bayi', tanggal: '2026-10-20', nama: 'Arya' };
    assert.deepEqual(masukanHajatanDariParam(paramDariHajatan(h)), h);
    assert.equal(masukanHajatanDariParam('k=tarub&d=2026-10-20&n=Arya').nama, '');
    assert.equal(masukanHajatanDariParam('k=lain&d=2026-10-20'), null);
  });
});

describe('ujung rentang kalender', () => {
  test('tanggal paling awal dan paling akhir dapat dihitung di semua alat', () => {
    for (const tanggal of [TANGGAL_AWAL, TANGGAL_AKHIR]) {
      assert.doesNotThrow(() => bangunRumah({ k: 'hari', tanggal }), `rumah ${tanggal}`);
      assert.doesNotThrow(() => bangunRumah({ k: 'arah', tanggal, jam: '19:00' }), `rumah arah ${tanggal}`);
      assert.doesNotThrow(() => bangunBepergian({ tanggal, tujuan: 'Timur' }), `bepergian ${tanggal}`);
      for (const k of MODE_HAJATAN) assert.doesNotThrow(() => bangunHajatan({ k, tanggal, nama: 'Arya' }), `hajatan ${k} ${tanggal}`);
    }
  });
});

describe('penyaringan isi: sapuan', () => {
  test('semua kombinasi sumur, pintu, ukuran, lahan: tanpa galat, nilai rusak, atau ritual', () => {
    for (const h of SISI_RUMAH) for (const s of ARAH_MATA_ANGIN) {
      const x = semuaTeks(bangunRumah({ k: 'sumur', menghadap: h, sumurDi: s }));
      assert.ok(!rusak.test(x) && !ritual.test(x), `sumur ${h}/${s}`);
    }
    for (const metode of METODE_PINTU) for (const h of SISI_RUMAH) for (const frac of [0, 0.1, 0.35, 0.5, 0.99, 1]) {
      const x = semuaTeks(bangunRumah({ k: 'pintu', metode, menghadap: h, panjang: 20, posisi: 20 * frac }));
      assert.ok(!rusak.test(x) && !ritual.test(x), `pintu ${metode}/${h}/${frac}`);
    }
    for (const j of ID_UKURAN) for (let n = 1; n <= 60; n++) {
      const x = semuaTeks(bangunRumah({ k: 'ukuran', jenis: j, jumlah: n }));
      assert.ok(!rusak.test(x) && !ritual.test(x), `ukuran ${j}/${n}`);
    }
    assert.ok(!ritual.test(semuaTeks(bangunRumah({ k: 'lahan' }))));
  });
  test('tiap 97 hari: rumah (hari, arah), bepergian, dan empat mode hajatan bersih', () => {
    const awal = nomorHari(TANGGAL_AWAL);
    const akhir = nomorHari(TANGGAL_AKHIR) - 400; // ruang untuk jadwal bayi yang melampaui tanggal
    let n = 0;
    for (let d = awal; d <= akhir; d += 97) {
      const iso = isoDariNomor(d);
      const hasil = [
        ['rumah-hari', bangunRumah({ k: 'hari', tanggal: iso })],
        ['rumah-arah', bangunRumah({ k: 'arah', tanggal: iso, jam: n % 2 ? '19:00' : null })],
        ['bepergian', bangunBepergian({ tanggal: iso, tujuan: n % 3 ? ARAH_MATA_ANGIN[n % 8] : null })],
        ...MODE_HAJATAN.map(k => [`hajatan-${k}`, bangunHajatan({ k, tanggal: iso, nama: k === 'bayi' && n % 2 ? 'Arya' : '' })])
      ];
      for (const [nama, x] of hasil) {
        const teks = bersihTeks(x.bagian);
        assert.ok(!rusak.test(teks), `${nama} ${iso}: nilai rusak: ${teks.match(/.{30}(undefined|NaN|\[object|:null|,null|\[null).{20}/)?.[0]}`);
        assert.ok(!ritual.test(teks), `${nama} ${iso}: kata ritual: ${teks.match(ritual)?.[0]}`);
        for (const b of x.bagian) for (const it of b.butir) assert.ok(it.judul && !/:\s*$/.test(it.judul), `${nama} ${iso}: judul rusak "${it.judul}"`);
      }
      n++;
    }
    assert.ok(n > 1400);
  });
});
