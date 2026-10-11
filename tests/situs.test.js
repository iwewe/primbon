/**
 * Aturan teks dan privasi pada kode situs Primbon (pemeriksaan sumber, tanpa peramban).
 */
import { test, describe } from 'node:test';
import assert from 'node:assert';
import { readFileSync, readdirSync } from 'node:fs';
import { ISTILAH, LANGKAH, BATAS, TIDAK_DIMUAT } from '../src/situs/data.js';

const sumber = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => (e.isDirectory() ? sumber(`${dir}/${e.name}`) : [`${dir}/${e.name}`]));
const berkas = sumber('src/situs').filter(f => f.endsWith('.js'));

describe('aturan teks situs', () => {
  test('tidak ada nama produk lain, kata "gratis", atau ejaan Karaton/Kraton pada teks situs', () => {
    for (const f of [...berkas, 'index.html']) {
      const isi = readFileSync(f, 'utf8').split('\n').filter(l => !/^\s*(\*|\/\/|\/\*)/.test(l)).join('\n');
      assert.ok(!/natal ?engine/i.test(isi), `${f}: menyebut NatalEngine`);
      assert.ok(!/\bgratis\b/i.test(isi), `${f}: memuat "gratis"`);
      assert.ok(!/Karaton|Kraton\b/.test(isi), `${f}: ejaan Keraton salah`);
    }
  });
  test('index.html berbahasa Indonesia dan memakai kunci tema Primbon', () => {
    const h = readFileSync('index.html', 'utf8');
    assert.match(h, /<html lang="id">/);
    assert.match(h, /primbon\.tema/);
  });
  test('istilah: id unik, semua terisi, penilaian dijelaskan', () => {
    const id = ISTILAH.map(i => i.id);
    assert.equal(new Set(id).size, id.length);
    for (const i of ISTILAH) assert.ok(i.istilah && i.arti.length > 20, i.id);
    assert.ok(id.includes('penilaian') && id.includes('hari-jawa') && id.includes('neptu'));
  });
  test('teks tetap: batas memuat rentang kalender dan penafian medis; yang tidak dimuat menyebut ritual', () => {
    assert.ok(BATAS.some(t => t.includes('8 Juli 1633') && t.includes('25 Agustus 2052')));
    assert.ok(BATAS.some(t => /nasihat medis/.test(t)));
    assert.ok(TIDAK_DIMUAT.some(t => /ritual/i.test(t)));
    assert.equal(LANGKAH.length, 4);
  });
});

describe('privasi: data lahir tidak keluar dari peramban', () => {
  test('kode situs tidak memanggil jaringan (fetch, XMLHttpRequest, sendBeacon, WebSocket)', () => {
    for (const f of berkas) {
      const isi = readFileSync(f, 'utf8');
      assert.ok(!/\bfetch\s*\(|XMLHttpRequest|sendBeacon|WebSocket|new Image\s*\(/.test(isi.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')), `${f}: memanggil jaringan`);
    }
  });
  test('tidak ada tautan yang menaruh data lahir pada query string', () => {
    for (const f of berkas) {
      const isi = readFileSync(f, 'utf8');
      assert.ok(!/['"`]\/laporan\?/.test(isi), `${f}: tautan /laporan? berisi query`);
      assert.ok(!/['"`]\/\?d=/.test(isi), `${f}: tautan /?d= berisi query`);
    }
  });
  test('tautan keluar memakai rel noopener', () => {
    for (const f of berkas.filter(x => x.endsWith('statis.js'))) {
      const isi = readFileSync(f, 'utf8');
      assert.match(isi, /rel="noopener noreferrer"/);
    }
  });
});
