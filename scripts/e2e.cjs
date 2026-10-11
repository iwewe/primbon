// Uji ujung-ke-ujung Primbon di peramban sungguhan (Chromium lewat playwright-core). Tidak ikut `npm test`.
const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const BASE = process.env.BASE || 'http://127.0.0.1:4176';
const hasil = [];
const ok = (nama, kondisi, info = '') => { hasil.push([kondisi, nama, info]); console.log((kondisi ? 'LULUS ' : 'GAGAL ') + nama + (kondisi ? '' : '  <<< ' + info)); };
const TETAP = new Date('2026-10-11T12:00:00+07:00');
const lahir = 'd=1990-05-17&t=19:00&n=Wirya';

(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: ['--no-sandbox', ...(process.env.HOST_MAP ? ['--host-resolver-rules=' + process.env.HOST_MAP] : [])] });
  const baru = async (opsi = {}) => {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, timezoneId: 'Asia/Jakarta', locale: 'id-ID', ...opsi });
    const p = await ctx.newPage();
    await p.clock.setFixedTime(TETAP);
    p.galat = []; p.urls = [];
    p.on('pageerror', e => p.galat.push(e.message));
    p.on('console', m => { if (m.type() === 'error') p.galat.push(m.text().slice(0, 120)); });
    p.on('request', r => p.urls.push(r.url()));
    return { ctx, p };
  };
  const teks = async (p, sel) => ((await p.textContent(sel)) || '').replace(/\s+/g, ' ').trim();

  /* 1. alur formulir sampai laporan */
  {
    const { ctx, p } = await baru();
    const resp = await p.goto(BASE + '/', { waitUntil: 'networkidle' });
    if (process.env.CEK_CSP) { // hanya untuk server yang memasang CSP (nginx), bukan `vite preview`
      const csp = resp.headers()['content-security-policy'] || '';
      ok('CSP: header ketat terpasang (default-src, script-src, style-src, frame-ancestors)', ["default-src 'self'", "script-src 'self'", "style-src 'self'", "frame-ancestors 'self'", "object-src 'none'"].every(k => csp.includes(k)) && !csp.includes('unsafe'), csp);
    }
    ok('beranda: judul dokumen berbahasa Indonesia', (await p.title()) === 'Primbon: laporan tafsir weton', await p.title());
    ok('beranda: halaman berbahasa id', (await p.getAttribute('html', 'lang')) === 'id');
    await p.click('button[type=submit]');
    ok('formulir: tanpa isian memberi galat tanggal dan fokus ke bidang', (await p.isVisible('#g-tanggal')) && (await p.evaluate(() => document.activeElement.id)) === 'f-thn', await teks(p, '#g-tanggal'));
    await p.fill('#f-tgl', '31'); await p.selectOption('#f-bln', '4'); await p.fill('#f-thn', '1990');
    await p.click('button[type=submit]');
    ok('formulir: 31 April ditolak dengan pesan jelas', (await teks(p, '#g-tanggal')).includes('31 April tidak ada'), await teks(p, '#g-tanggal'));
    await p.fill('#f-thn', '1500'); await p.fill('#f-tgl', '1'); await p.selectOption('#f-bln', '1');
    await p.click('button[type=submit]');
    ok('formulir: sebelum 1633 ditolak', (await teks(p, '#g-tanggal')).includes('8 Juli 1633'), await teks(p, '#g-tanggal'));
    await p.fill('#f-nama', 'Wirya'); await p.fill('#f-tgl', '17'); await p.selectOption('#f-bln', '5'); await p.fill('#f-thn', '1990'); await p.fill('#f-jam', '25.00');
    await p.click('button[type=submit]');
    ok('formulir: jam tidak valid ditolak', (await teks(p, '#g-jam')).includes('Jam tidak valid'), await teks(p, '#g-jam'));
    await p.fill('#f-jam', '19.00');
    await p.click('button[type=submit]');
    await p.waitForSelector('#judul-laporan');
    ok('laporan: alamat memakai fragmen, bukan query', /\/laporan#.*d=1990-05-17/.test(p.url()) && !p.url().includes('?'), p.url());
    ok('laporan: lahir 19.00 (sesudah magrib) = Jumat Legi', (await teks(p, '#judul-laporan')) === 'Jumat Legi', await teks(p, '#judul-laporan'));
    ok('laporan: kalimat magrib menyebut hari Jawa berikutnya', (await teks(p, '.hasil-paragraf')).includes('sesudah magrib'), await teks(p, '.hasil-paragraf'));
    ok('laporan: judul dokumen memuat weton dan nama', (await p.title()) === 'Jumat Legi, Wirya · Primbon', await p.title());
    ok('laporan: fokus pindah ke judul', await p.evaluate(() => document.activeElement && document.activeElement.id === 'judul-laporan'));
    const bagian = await p.$$eval('.bagian > h2', e => e.map(x => x.textContent));
    ok('laporan: tujuh bagian termasuk nama', bagian.length === 7 && bagian.some(x => x.startsWith('Nama')), bagian.join('|'));
    ok('laporan: setiap butir tafsir memuat sumber bab dan halaman', (await p.$$eval('.butir .meta', e => e.filter(x => /Sumber: Bab \d+/.test(x.textContent)).length)) > 15);
    const tag = await p.$$eval('.butir .tag', e => [...new Set(e.map(x => x.textContent))].sort());
    ok('laporan: penilaian berupa teks (bukan warna saja)', tag.every(t => ['Baik', 'Netral', 'Waspada'].includes(t)) && tag.length >= 2, tag.join('|'));
    ok('laporan: peringatan kesehatan tampil', (await teks(p, '#kesehatan')).includes('bukan nasihat medis'));
    ok('laporan: tidak ada kata ritual atau watak perempuan', !/(sesaji|sajen|mantra|tumbal|ramuan|selamatan|doa |bubur)/i.test(await teks(p, '.laporan-isi')));
    await p.click('.isi-nav a[data-bagian=rezeki]');
    ok('daftar isi: loncat ke bagian tanpa menghapus fragmen data', /d=1990-05-17/.test(p.url()) && (await p.evaluate(() => document.activeElement.id)) === 'rezeki', p.url());
    ok('laporan: tanpa galat skrip', p.galat.length === 0, p.galat.join('|'));
    const luar = [...new Set(p.urls.map(u => new URL(u).host))].filter(h => h !== new URL(BASE).host && h !== 'static.cloudflareinsights.com');
    ok('privasi: tidak ada permintaan ke host luar', luar.length === 0, luar.join(','));
    const bocor = p.urls.filter(u => /1990-05-17|19[:.]00|Wirya/.test(decodeURIComponent(u)));
    ok('privasi: tidak ada permintaan yang membawa data lahir atau nama', bocor.length === 0, bocor.join(' | '));
    await p.reload({ waitUntil: 'networkidle' });
    await p.waitForSelector('#judul-laporan');
    ok('laporan: muat ulang mempertahankan data', (await teks(p, '#judul-laporan')) === 'Jumat Legi');
    await p.click('a:has-text("Ubah data")');
    await p.waitForSelector('#form-lahir');
    ok('ubah data: formulir terisi kembali', (await p.inputValue('#f-thn')) === '1990' && (await p.inputValue('#f-jam')) === '19.00' && (await p.inputValue('#f-nama')) === 'Wirya');
    await p.goBack();
    await p.waitForSelector('#judul-laporan');
    ok('tombol mundur kembali ke laporan', (await teks(p, '#judul-laporan')) === 'Jumat Legi');
    await ctx.close();
  }
  /* 2. tanpa jam: dua kemungkinan disebut; contoh; tanpa nama */
  {
    const { ctx, p } = await baru();
    await p.goto(BASE + '/laporan#d=2025-06-26', { waitUntil: 'networkidle' });
    await p.waitForSelector('#judul-laporan');
    ok('tanpa jam: weton tanggal biasa dan kemungkinan hari berikutnya disebut', (await teks(p, '#judul-laporan')) === 'Kamis Wage' && (await teks(p, '.hasil-paragraf')).includes('Jumat Kliwon'), await teks(p, '.hasil-paragraf'));
    ok('tanpa nama: bagian nama tidak ada', (await p.$('#nama')) === null);
    await p.goto(BASE + '/', { waitUntil: 'networkidle' });
    await p.click('a.contoh');
    await p.waitForSelector('#judul-laporan');
    ok('contoh: 17 Agustus 1945 = Jumat Legi', (await teks(p, '#judul-laporan')) === 'Jumat Legi' && (await teks(p, '.chip-lahir')).includes('17 Agustus 1945'), await teks(p, '.chip-lahir'));
    await p.goto(BASE + '/laporan#d=1500-01-01', { waitUntil: 'networkidle' });
    await p.waitForSelector('#form-lahir');
    ok('laporan: tanggal tidak sah mengarahkan ke formulir', new URL(p.url()).pathname === '/');
    await p.goto(BASE + '/laporan', { waitUntil: 'networkidle' });
    await p.waitForSelector('#form-lahir');
    ok('laporan: tanpa data mengarahkan ke formulir', new URL(p.url()).pathname === '/');
    await ctx.close();
  }
  /* 3. halaman teks */
  {
    const { ctx, p } = await baru();
    await p.goto(BASE + '/istilah', { waitUntil: 'networkidle' });
    await p.fill('#cari', 'neptu');
    const tampil = await p.$$eval('#daftar-istilah li:not([hidden])', e => e.length);
    ok('istilah: pencarian menyaring daftar', tampil >= 2 && tampil < 18, String(tampil));
    await p.fill('#cari', 'zzzz');
    ok('istilah: tidak ada hasil diberitahukan', (await teks(p, '#hasil-cari')).includes('Tidak ada istilah'));
    await p.goto(BASE + '/tentang', { waitUntil: 'networkidle' });
    const t = await teks(p, 'main');
    ok('tentang: privasi, sumber, batas, lisensi ada', ['Privasi', 'Sumber', 'Batas', 'Lisensi dan kredit', 'Betaljemur Adammakna', 'Hak cipta'].every(k => t.includes(k)));
    ok('tentang: tautan luar dibuka di tab baru dengan rel aman', (await p.$$eval('main a[target=_blank]', a => a.length && a.every(x => /noopener/.test(x.rel)))));
    await p.goto(BASE + '/tidak-ada', { waitUntil: 'networkidle' });
    ok('404: pesan dalam bahasa Indonesia', (await teks(p, 'main')).includes('Halaman ini tidak ada'));
    await ctx.close();
  }
  /* 4. ponsel dan keadaan khusus */
  {
    const { ctx, p } = await baru({ viewport: { width: 390, height: 800 } });
    await p.goto(BASE + '/laporan#' + lahir, { waitUntil: 'networkidle' });
    await p.waitForSelector('#judul-laporan');
    ok('ponsel: navigasi bawah memuat tiga item', (await p.$$eval('.nav-bawah a', e => e.length)) === 3);
    ok('ponsel: tanpa gulir horizontal pada halaman', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1));
    await ctx.close();
  }
  {
    const { ctx, p } = await baru({ javaScriptEnabled: false });
    await p.goto(BASE + '/', { waitUntil: 'load' });
    const t = await p.textContent('body');
    ok('tanpa JavaScript: pesan dalam bahasa Indonesia', t.includes('Halaman ini menghitung di peramban Anda') && t.includes('Aktifkan JavaScript'));
    await ctx.close();
  }
  {
    const { ctx, p } = await baru({ colorScheme: 'dark' });
    await p.goto(BASE + '/', { waitUntil: 'networkidle' });
    await p.click('#tema');
    ok('tema: tombol mengganti ke terang dan menyimpannya', (await p.getAttribute('html', 'data-theme')) === 'light' && (await p.evaluate(() => localStorage.getItem('primbon.tema'))) === 'light');
    await ctx.close();
  }

  const gagal = hasil.filter(h => !h[0]);
  console.log(`\n${hasil.length - gagal.length} lulus, ${gagal.length} gagal dari ${hasil.length}`);
  await b.close();
  process.exit(gagal.length ? 1 : 0);
})().catch(e => { console.error('SKRIP GAGAL', e); process.exit(2); });
