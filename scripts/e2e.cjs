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
    // Cloudflare menyisipkan skrip analitik di tepi jaringan; CSP ketat memblokirnya (itu yang diinginkan), jadi pesan khusus itu bukan galat situs.
    p.on('console', m => { if (m.type() === 'error' && !/static\.cloudflareinsights\.com/.test(m.text())) p.galat.push(m.text().slice(0, 120)); });
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
    ok('ponsel: navigasi bawah memuat lima item', (await p.$$eval('.nav-bawah a', e => e.length)) === 5);
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

  /* Rilis 2: Jodoh, Hari baik, Jam */
  {
    const { ctx, p } = await baru();
    await p.goto(BASE + '/', { waitUntil: 'networkidle' });
    ok('beranda: enam alat lain tertaut', (await p.$$eval('.alat-lain a', a => a.map(x => x.getAttribute('href')).join())) === '/jodoh,/hari,/jam,/rumah,/bepergian,/hajatan');
    ok('menu atas memuat Jodoh, Hari baik, Jam dan tautan Istilah', (await p.$$eval('.nav-atas a', a => a.map(x => x.textContent).join('|'))) === 'Laporan|Jodoh|Hari baik|Jam|Lainnya' && (await p.$$eval('.tautan-atas', a => a.map(x => x.textContent).join())) === 'Istilah,Tentang');
    /* Jodoh */
    await p.click('.alat-lain a[href="/jodoh"]');
    await p.waitForSelector('#form-jodoh');
    ok('jodoh: judul dokumen dan nama kedua pihak', (await p.title()) === 'Jodoh · Primbon' && (await p.$$eval('.pihak h3', h => h.map(x => x.textContent).join('|'))) === 'Pihak pria|Pihak wanita');
    await p.click('#form-jodoh button[type=submit]');
    ok('jodoh: tanpa isian memberi galat dan fokus ke tahun pihak pria', (await p.isVisible('#g-pria')) && (await p.evaluate(() => document.activeElement.id)) === 'pria-thn');
    await p.fill('#pria-nama', 'Budi Santoso'); await p.fill('#pria-tgl', '17'); await p.selectOption('#pria-bln', '5'); await p.fill('#pria-thn', '1990');
    await p.click('#form-jodoh button[type=submit]');
    ok('jodoh: pihak wanita yang kosong ditolak', (await p.isVisible('#g-wanita')) && (await p.evaluate(() => document.activeElement.id)) === 'wanita-thn');
    await p.fill('#wanita-nama', 'Siti Aminah'); await p.fill('#wanita-tgl', '3'); await p.selectOption('#wanita-bln', '11'); await p.fill('#wanita-thn', '1992'); await p.fill('#wanita-jam', '19.00');
    await p.click('#form-jodoh button[type=submit]');
    await p.waitForSelector('#judul-jodoh');
    await p.waitForSelector('#dasar');
    ok('jodoh: alamat memakai fragmen, bukan query', /\/jodoh#.*a=1990-05-17.*b=1992-11-03/.test(p.url()) && !p.url().includes('?'), p.url());
    ok('jodoh: weton kedua pihak (wanita lahir 19.00 digeser ke Rabu Pahing)', (await teks(p, '#judul-jodoh')) === 'Kamis Kliwon dan Rabu Pahing', await teks(p, '#judul-jodoh'));
    ok('jodoh: tiga bagian (dasar, weton, nama) dengan sumber bab', (await p.$$eval('.bagian > h2', e => e.map(x => x.textContent).join('|'))) === 'Hitungan dasar|Neptu weton dan tanggal Jawa|Huruf nama' && (await p.$$eval('.butir .meta', e => e.filter(x => /Sumber: Bab \d+/.test(x.textContent)).length)) >= 10);
    ok('jodoh: catatan keputusan milik pengguna tampil', (await teks(p, '#h-baca + .lead')).includes('milik Anda berdua'));
    ok('jodoh: penilaian berupa teks', (await p.$$eval('.butir .tag', e => e.every(x => ['Baik', 'Waspada', 'Netral'].includes(x.textContent)))));
    await p.click('.ubah-data summary');
    ok('jodoh: "Ubah data" membuka formulir terisi', (await p.inputValue('#pria-nama')) === 'Budi Santoso' && (await p.inputValue('#wanita-jam')) === '19.00' && (await p.inputValue('#wanita-thn')) === '1992');
    ok('jodoh: tanpa galat skrip', p.galat.length === 0, p.galat.join('|'));
    const luarJ = [...new Set(p.urls.map(u => new URL(u).host))].filter(h => h !== new URL(BASE).host && h !== 'static.cloudflareinsights.com');
    ok('privasi: jodoh tanpa host luar dan tanpa permintaan berisi data lahir atau nama', luarJ.length === 0 && p.urls.every(u => !/1990-05-17|1992-11-03|Budi|Siti|19[:.]00/.test(decodeURIComponent(u))), luarJ.join(','));
    await p.reload({ waitUntil: 'networkidle' });
    await p.waitForSelector('#judul-jodoh');
    ok('jodoh: muat ulang mempertahankan hasil', (await teks(p, '#judul-jodoh')) === 'Kamis Kliwon dan Rabu Pahing');
    await ctx.close();
  }
  {
    const { ctx, p } = await baru();
    /* Hari baik */
    await p.goto(BASE + '/hari', { waitUntil: 'networkidle' });
    await p.waitForSelector('#judul-hari');
    ok('hari: tanpa data memakai hari ini (Minggu Legi, 11 Oktober 2026)', (await teks(p, '#judul-hari')) === 'Minggu Legi' && (await p.inputValue('#hari-tgl')) === '11' && (await p.inputValue('#hari-thn')) === '2026', await teks(p, '#judul-hari'));
    await p.fill('#hari-tgl', '20'); await p.selectOption('#hari-untuk', 'nikah');
    await p.click('#form-hari button[type=submit]');
    await p.waitForFunction(() => document.querySelector('#judul-hari')?.textContent === 'Selasa Kliwon');
    ok('hari: alamat memuat tanggal dan keperluan di fragmen', /\/hari#d=2026-10-20&u=nikah/.test(p.url()) && !p.url().includes('?'), p.url());
    ok('hari: pernikahan 20 Okt 2026 = satu waspada satu netral, bergantung tanggal Jawa', (await teks(p, '#hari-nikah')).includes('1 waspada') && (await teks(p, '#hari-nikah')).includes('1 netral') && (await teks(p, '#hari-nikah')).includes('Bergantung tanggal Jawa'), await teks(p, '#hari-nikah'));
    ok('hari: daftar 14 hari dengan baris hari terpilih ditandai', (await p.$$eval('#daftar-hari tbody tr', r => r.length)) === 14 && (await p.$$eval('#daftar-hari tr.kini', r => r.length)) === 1);
    await p.click('#daftar-hari tbody tr:nth-child(3) a');
    await p.waitForFunction(() => document.querySelector('#judul-hari')?.textContent === 'Kamis Wage' || document.querySelector('#judul-hari')?.textContent === 'Kamis Pahing' || /Kamis/.test(document.querySelector('#judul-hari')?.textContent || ''));
    ok('hari: klik tanggal di daftar menampilkan rincian hari itu (tanpa memuat ulang halaman)', /d=2026-10-22/.test(p.url()) && (await teks(p, '#judul-hari')) === 'Kamis Pahing', p.url() + ' ' + await teks(p, '#judul-hari'));
    await p.click('#daftar-hari .aksi-halaman a:has-text("sesudahnya")');
    await p.waitForFunction(() => /d=2026-11-05/.test(location.hash));
    ok('hari: tombol 14 hari sesudahnya maju dua pekan', /d=2026-11-05/.test(p.url()));
    await p.goBack();
    ok('hari: tombol mundur kembali ke tanggal sebelumnya', /d=2026-10-22/.test(p.url()));
    await p.goto(BASE + '/hari#d=2052-08-20', { waitUntil: 'networkidle' });
    await p.waitForSelector('#judul-hari');
    ok('hari: di ujung rentang daftar berhenti dan tombol maju hilang', (await p.$$eval('#daftar-hari tbody tr', r => r.length)) === 6 && (await p.$$eval('#daftar-hari .aksi-halaman a', a => a.every(x => !/sesudahnya/.test(x.textContent)))));
    await p.goto(BASE + '/hari#d=1500-01-01', { waitUntil: 'networkidle' });
    await p.waitForSelector('#judul-hari');
    ok('hari: alamat tidak sah jatuh ke hari ini, bukan galat', (await teks(p, '#judul-hari')) === 'Minggu Legi');
    ok('hari: tanpa galat skrip', p.galat.length === 0, p.galat.join('|'));
    /* Jam */
    await p.goto(BASE + '/jam', { waitUntil: 'networkidle' });
    await p.waitForSelector('#judul-jam');
    ok('jam: enam bagian tanpa jam, tidak ada baris bertanda', (await p.$$eval('.bagian > h2', e => e.length)) === 6 && (await p.$$eval('.penanda-kini', e => e.length)) === 0);
    await p.click('#jam-sekarang');
    ok('jam: tombol "Pakai jam sekarang" mengisi 12.00 (waktu terkunci)', (await p.inputValue('#jam-isi')) === '12.00', await p.inputValue('#jam-isi'));
    await p.fill('#jam-hari-tgl', '17'); await p.fill('#jam-isi', '09.30');
    await p.click('#form-jam button[type=submit]');
    await p.waitForSelector('#pada-jam');
    ok('jam: alamat memuat tanggal dan jam di fragmen', /\/jam#d=2026-10-17&t=09%3A30|\/jam#d=2026-10-17&t=09:30/.test(p.url()) && !p.url().includes('?'), p.url());
    ok('jam: Sabtu Pahing, saat Cahya ditandai "jam Anda"', (await teks(p, '#judul-jam')) === 'Sabtu Pahing' && (await p.$$eval('#saat-agung tr.kini', r => r.length === 1 && /Cahya/.test(r[0].textContent))) && (await teks(p, '#pada-jam')).includes('Cahya'));
    ok('jam: jam tidak valid ditolak', await (async () => { await p.fill('#jam-isi', '25.00'); await p.click('#form-jam button[type=submit]'); return (await teks(p, '#g-jam-isi')).includes('Jam tidak valid'); })());
    ok('jam: tanpa galat skrip', p.galat.length === 0, p.galat.join('|'));
    await ctx.close();
  }
  {
    const { ctx, p } = await baru({ viewport: { width: 320, height: 800 } });
    for (const jalur of ['/jodoh#a=1990-05-17&na=Budi&b=1992-11-03&nb=Siti', '/hari#d=2026-10-17&u=nikah', '/jam#d=2026-10-17&t=09:30']) {
      await p.goto(BASE + jalur, { waitUntil: 'networkidle' });
      await p.waitForSelector('h1');
      await p.waitForTimeout(200);
      ok(`ponsel 320: ${jalur.split('#')[0]} tanpa gulir horizontal`, await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth));
    }
    ok('ponsel 320: tabel jam menjadi kartu bertumpuk (label kolom tampil)', await p.evaluate(() => getComputedStyle(document.querySelector('.tabel-bertumpuk td'), '::before').content !== 'none'));
    await ctx.close();
  }

  /* Rilis 3: Rumah, Bepergian, Hajatan, dan halaman Lainnya */
  {
    const { ctx, p } = await baru();
    await p.goto(BASE + '/lainnya', { waitUntil: 'networkidle' });
    ok('lainnya: lima tautan (Rumah, Bepergian, Hajatan, Istilah, Tentang) dan menu Lainnya aktif', (await p.$$eval('.menu-keterangan a', a => a.map(x => x.getAttribute('href')).join())) === '/rumah,/bepergian,/hajatan,/istilah,/tentang' && (await p.getAttribute('.nav-atas a[href="/lainnya"]', 'aria-current')) === 'page');
    /* Rumah */
    await p.click('.menu-keterangan a[href="/rumah"]');
    await p.waitForSelector('#form-rumah');
    ok('rumah: awal pada Arah hadap rumah; judul dokumen', (await p.inputValue('#r-k')) === 'arah' && (await p.title()) === 'Arah hadap rumah · Rumah · Primbon', await p.title());
    ok('lainnya: menu tetap aktif di halaman Rumah', (await p.getAttribute('.nav-atas a[href="/lainnya"]', 'aria-current')) === 'page');
    await p.click('#form-rumah button[type=submit]');
    ok('rumah arah: tanpa isian memberi galat dan fokus ke tahun', (await p.isVisible('#g-r')) && (await p.evaluate(() => document.activeElement.id)) === 'r-thn');
    await p.fill('#r-tgl', '17'); await p.selectOption('#r-bln', '5'); await p.fill('#r-thn', '1990');
    await p.click('#form-rumah button[type=submit]');
    await p.waitForSelector('#judul-rumah');
    await p.waitForFunction(() => document.querySelector('#judul-rumah')?.textContent === 'Menghadap Barat');
    ok('rumah arah: lahir 17 Mei 1990 menghadap Barat; alamat berfragmen', /\/rumah#k=arah&d=1990-05-17/.test(p.url()) && !p.url().includes('?'), p.url());
    await p.selectOption('#r-k', 'hari');
    await p.waitForFunction(() => document.querySelector('#judul-rumah')?.textContent === 'Minggu Legi');
    ok('rumah hari: mengganti pemeriksaan memuat isian hari dan memakai hari ini', (await p.inputValue('#r-tgl')) === '11' && /k=hari/.test(p.url()) && (await p.$$eval('.bagian > h2', h => h.map(x => x.textContent).join('|'))).includes('Mendirikan rumah'));
    await p.selectOption('#r-k', 'ukuran');
    await p.waitForSelector('#r-jumlah');
    await p.fill('#r-jumlah', '0');
    await p.click('#form-rumah button[type=submit]');
    ok('rumah ukuran: jumlah nol ditolak', (await teks(p, '#g-r-jumlah')).includes('bilangan bulat positif'));
    await p.fill('#r-jumlah', '37');
    await p.click('#form-rumah button[type=submit]');
    await p.waitForFunction(() => document.querySelector('#judul-rumah')?.textContent === 'Kitri');
    ok('rumah ukuran: usuk terakhir 37 = Kitri (baik)', (await teks(p, '#ukuran')).includes('Baik'));
    await p.selectOption('#r-k', 'sumur');
    await p.waitForSelector('#r-sumur');
    await p.selectOption('#r-hadap', 'Utara'); await p.selectOption('#r-sumur', 'Barat Daya');
    await p.click('#form-rumah button[type=submit]');
    await p.waitForFunction(() => document.querySelector('#judul-rumah')?.textContent === 'Sumur di Barat Daya');
    ok('rumah sumur: barat daya dinilai waspada', (await teks(p, '#sumur')).includes('Waspada'));
    await p.selectOption('#r-k', 'pintu');
    await p.waitForSelector('#r-panjang');
    await p.fill('#r-panjang', '12'); await p.fill('#r-posisi', '15');
    await p.click('#form-rumah button[type=submit]');
    ok('rumah pintu: posisi melebihi panjang ditolak', (await teks(p, '#g-r-posisi')).includes('di antara 0 dan panjang'));
    await p.fill('#r-posisi', '3');
    await p.click('#form-rumah button[type=submit]');
    await p.waitForFunction(() => document.querySelector('#judul-rumah')?.textContent === 'Bagian ke-2 dari 5');
    ok('rumah pintu: sisi Utara 12 posisi 3 = bagian ke-2 dari 5', /m=194/.test(p.url()));
    await p.selectOption('#r-k', 'lahan');
    await p.waitForSelector('#lahan'); // bentuk lahan tanpa isian: hasil langsung tampil
    ok('rumah lahan: 26 keadaan lahan', (await p.$$eval('#lahan .butir', b => b.length)) === 26);
    ok('rumah: catatan bukan pengganti perencanaan teknik tampil', (await teks(p, 'main')).includes('perencanaan teknik dan keselamatan bangunan'));
    ok('rumah: tanpa galat skrip', p.galat.length === 0, p.galat.join('|'));
    const luarR = [...new Set(p.urls.map(u => new URL(u).host))].filter(h => h !== new URL(BASE).host && h !== 'static.cloudflareinsights.com');
    ok('privasi: rumah tanpa host luar', luarR.length === 0, luarR.join(','));
    await ctx.close();
  }
  {
    const { ctx, p } = await baru();
    /* Bepergian */
    await p.goto(BASE + '/bepergian', { waitUntil: 'networkidle' });
    await p.waitForSelector('#judul-bepergian');
    ok('bepergian: tanpa data memakai hari ini dan tanpa bagian tujuan', (await teks(p, '#judul-bepergian')) === 'Minggu Legi' && (await p.$('#tujuan')) === null);
    await p.fill('#bp-tgl', '20'); await p.selectOption('#bp-tujuan', 'Timur');
    await p.click('#form-bepergian button[type=submit]');
    await p.waitForSelector('#tujuan');
    ok('bepergian: 20 Okt 2026 ke Timur; alamat memuat tujuan', (await teks(p, '#judul-bepergian')) === 'Selasa Kliwon' && /\/bepergian#d=2026-10-20&g=Timur/.test(p.url()) && !p.url().includes('?'), p.url());
    const ditandai = await p.$$eval('#arah tr.kini', r => r.length);
    const dibagian = await p.$$eval('#tujuan .butir', r => r.length);
    ok('bepergian: baris arah tujuan ditandai sama banyak dengan catatan tujuan', ditandai > 0 && ditandai === dibagian, `${ditandai} vs ${dibagian}`);
    ok('bepergian: bagian waktu, pindah kediaman, dan menghadap pejabat ada', (await p.$$eval('.bagian > h2', h => h.map(x => x.textContent).join('|'))).includes('Waktu berangkat') && (await teks(p, '#urusan')).includes('Menghadap pejabat'));
    ok('bepergian: catatan keselamatan perjalanan', (await teks(p, 'main')).includes('keselamatan perjalanan'));
    ok('bepergian: tanpa galat skrip', p.galat.length === 0, p.galat.join('|'));
    /* Hajatan */
    await p.goto(BASE + '/hajatan', { waitUntil: 'networkidle' });
    await p.waitForSelector('#judul-hajatan');
    ok('hajatan: awal pada Memasang tarub dengan hari ini', (await p.inputValue('#hj-k')) === 'tarub' && (await p.inputValue('#hj-tgl')) === '11');
    await p.selectOption('#hj-k', 'bayi');
    await p.waitForSelector('#hj-nama');
    await p.fill('#hj-tgl', '20'); await p.fill('#hj-nama', 'Arya');
    await p.click('#form-hajatan button[type=submit]');
    await p.waitForSelector('#nama-bayi');
    ok('hajatan bayi: alamat berfragmen; delapan tahap peringatan; nama dihitung', /\/hajatan#k=bayi&d=2026-10-20&n=Arya/.test(p.url()) && (await p.$$eval('#bayi tbody tr', r => r.length)) === 10 && (await teks(p, '#nama-bayi')).includes('Hitungan tidak cocok'), p.url());
    ok('hajatan bayi: Tetesan (khitan perempuan) tidak ditampilkan', !/tetesan/i.test(await teks(p, 'main')));
    ok('hajatan: catatan bukan panduan kehamilan dan anjuran tenaga kesehatan', (await teks(p, 'main')).includes('anjuran tenaga kesehatan'));
    ok('hajatan bayi: tanpa penilaian jam bayi lahir', !/jam (bayi )?lahir|saat bayi lahir/i.test(await teks(p, 'main')));
    await p.selectOption('#hj-k', 'kehamilan');
    await p.waitForFunction(() => /k=kehamilan/.test(location.hash));
    await p.click('#form-hajatan button[type=submit]');
    await p.waitForSelector('#kehamilan');
    ok('hajatan kehamilan: sembilan bulan', (await p.$$eval('#kehamilan tbody tr', r => r.length)) === 9);
    ok('hajatan: tanpa galat skrip', p.galat.length === 0, p.galat.join('|'));
    const luarH = [...new Set(p.urls.map(u => new URL(u).host))].filter(h => h !== new URL(BASE).host && h !== 'static.cloudflareinsights.com');
    ok('privasi: bepergian dan hajatan tanpa host luar dan tanpa permintaan berisi nama bayi', luarH.length === 0 && p.urls.every(u => !/Arya/.test(decodeURIComponent(u))), luarH.join(','));
    await ctx.close();
  }
  {
    const { ctx, p } = await baru({ viewport: { width: 320, height: 800 } });
    for (const jalur of ['/lainnya', '/rumah#k=hari&d=2026-10-20', '/rumah#k=lahan', '/bepergian#d=2026-10-20&g=Timur', '/hajatan#k=bayi&d=2026-10-20&n=Arya', '/hajatan#k=kehamilan&d=2026-10-11']) {
      await p.goto(BASE + jalur, { waitUntil: 'networkidle' });
      await p.waitForSelector('h1');
      await p.waitForTimeout(200);
      ok(`ponsel 320: ${jalur} tanpa gulir horizontal`, await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth));
    }
    await ctx.close();
  }

  const gagal = hasil.filter(h => !h[0]);
  console.log(`\n${hasil.length - gagal.length} lulus, ${gagal.length} gagal dari ${hasil.length}`);
  await b.close();
  process.exit(gagal.length ? 1 : 0);
})().catch(e => { console.error('SKRIP GAGAL', e); process.exit(2); });
