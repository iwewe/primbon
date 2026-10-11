const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const BASE = process.env.BASE || 'http://127.0.0.1:4176';
const lahir = 'd=1990-05-17&t=19:00&n=Wirya';
const HALAMAN = [['/', 'beranda'], ['/laporan#' + lahir, 'laporan'], ['/laporan#d=1990-05-17', 'laporan-polos'], ['/istilah', 'istilah'], ['/tentang', 'tentang'], ['/tidak-ada', '404']];
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: ['--no-sandbox', ...(process.env.HOST_MAP ? ['--host-resolver-rules=' + process.env.HOST_MAP] : [])] });
  const temuan = { sentuh: [], huruf: [], kontras: [], melebar: [], inggris: [], nama: [] };
  const fungsiHalaman = () => {
    const lum = ([r, g, b]) => { const f = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const rgba = s => { const m = s.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(',').map(x => parseFloat(x)); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
    const latar = el => { let n = el; while (n && n.nodeType === 1) { const c = rgba(getComputedStyle(n).backgroundColor); if (c && c.a > 0.99) return [c.r, c.g, c.b]; n = n.parentElement; } return rgba(getComputedStyle(document.body).backgroundColor) ? (() => { const c = rgba(getComputedStyle(document.body).backgroundColor); return [c.r, c.g, c.b]; })() : [255, 255, 255]; };
    const kontras = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
    const out = { sentuh: [], huruf: [], kontras: [], teks: document.body.innerText };
    // teks: ukuran dan kontras
    const walker = document.createTreeWalker(document.querySelector('#app'), NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walker.nextNode())) {
      const t = n.textContent.trim(); if (!t) continue;
      const el = n.parentElement; if (el.closest('svg')) continue;
      const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const r = el.getBoundingClientRect(); if (r.width === 0 || r.height === 0) continue;
      if (el.closest('.sr, [hidden]') ) continue;
      const px = parseFloat(cs.fontSize);
      if (px < 12) out.huruf.push(`${px}px "${t.slice(0, 24)}"`);
      const fg = rgba(cs.color); if (!fg) continue;
      const bg = latar(el);
      // campur alfa teks dengan latar
      const mix = [fg.r, fg.g, fg.b].map((c, i) => c * fg.a + bg[i] * (1 - fg.a));
      const op = parseFloat(cs.opacity);
      const rasio = kontras(mix, bg);
      const besar = px >= 24 || (px >= 18.66 && parseInt(cs.fontWeight) >= 700);
      if (rasio < (besar ? 3 : 4.5) && op >= 0.99) out.kontras.push(`${rasio.toFixed(2)} ${px}px "${t.slice(0, 26)}"`);
    }
    // sasaran sentuh
    for (const el of document.querySelectorAll('a[href], button, input:not([type=hidden]), select, [role=button], [role=option], summary')) {
      const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      if (r.width === 0 || r.height === 0 || cs.visibility === 'hidden') continue;
      if (el.closest('[hidden], .sr') || el.classList.contains('lewati')) continue;
      if (el.tagName === 'INPUT' && el.type === 'checkbox') { const lab = el.closest('label'); const rl = lab ? lab.getBoundingClientRect() : r; if (rl.height < 44) out.sentuh.push(`kotak centang ${Math.round(rl.width)}x${Math.round(rl.height)}`); continue; }
      if (el.tagName === 'A' && el.closest('p, li, dd, dt, h2, .catatan-kaki, .petunjuk, .pengantar, .lead')) { // tautan di dalam teks: dikecualikan dari aturan 44px (WCAG 2.2 pengecualian "inline")
        const sebaris = cs.display === 'inline'; if (sebaris) continue; }
      if (r.height < 43.5 || r.width < 43.5) out.sentuh.push(`${el.tagName.toLowerCase()} ${Math.round(r.width)}x${Math.round(r.height)} "${(el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 22)}"`);
    }
    return out;
  };
  for (const tema of ['light', 'dark']) {
    for (const [lebar, tinggi, label] of [[390, 900, 'ponsel'], [1280, 900, 'desktop']]) {
      for (const [jalur, nama] of HALAMAN) {
        const ctx = await b.newContext({ viewport: { width: lebar, height: tinggi }, colorScheme: tema, timezoneId: 'Asia/Jakarta', locale: 'id-ID' });
        const p = await ctx.newPage(); await p.clock.setFixedTime(new Date('2026-10-11T12:00:00+07:00'));
        await p.goto(BASE + jalur, { waitUntil: 'networkidle' }); await p.waitForTimeout(250);
        const r = await p.evaluate(fungsiHalaman);
        const kunci = `${nama}/${label}/${tema}`;
        r.sentuh.forEach(x => temuan.sentuh.push(kunci + ' ' + x)); r.huruf.forEach(x => temuan.huruf.push(kunci + ' ' + x)); r.kontras.forEach(x => temuan.kontras.push(kunci + ' ' + x));
        if (tema === 'light' && label === 'ponsel') {
          const t = r.teks;
          const kataInggris = (t.match(/\b(the|and|your|with|this|calculate|copy|save|share|loading|settings|home|calendar|birth|chart|beta|download|search|enter|click|submit|reset|back|next|today|date|time|year|month|free)\b/gi) || []);
          if (kataInggris.length) temuan.inggris.push(`${nama}: ${[...new Set(kataInggris)].join(',')}`);
          if (/natal ?engine|pawukon\.iww/i.test(t)) temuan.nama.push(`${nama}: memuat nama produk lain`);
          if (/\bgratis\b/i.test(t)) temuan.nama.push(`${nama}: memuat "gratis"`);
          if (/Karaton|Kraton\b/.test(t)) temuan.nama.push(`${nama}: ejaan Keraton salah`);
        }
        await ctx.close();
      }
    }
  }
  // gulir horizontal di tujuh lebar
  for (const lebar of [320, 360, 390, 768, 1024, 1280, 1920]) {
    for (const [jalur, nama] of HALAMAN) {
      const ctx = await b.newContext({ viewport: { width: lebar, height: 900 }, timezoneId: 'Asia/Jakarta' });
      const p = await ctx.newPage(); await p.clock.setFixedTime(new Date('2026-10-11T12:00:00+07:00'));
      await p.goto(BASE + jalur, { waitUntil: 'networkidle' });
      const l = await p.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
      if (l[0] > l[1] + 1) temuan.melebar.push(`${nama} @${lebar}: ${l[0]}`);
      await ctx.close();
    }
  }
  const unik = a => [...new Set(a)];
  for (const [k, v] of Object.entries(temuan)) { console.log(`\n== ${k}: ${unik(v).length} temuan`); (k === "sentuh" ? unik(v).filter(x => !/ g \d+x\d+ "Wuku ke/.test(x)) : unik(v)).slice(0, 40).forEach(x => console.log('  ' + x)); }
  await b.close();
})();
