/**
 * Halaman teks: Istilah, Tentang (cara menghitung, sumber, batas, privasi, lisensi), dan 404.
 */
import { esc } from '../format.js';
import { IKON } from '../logo.js';
import { ISTILAH, LANGKAH, BATAS, TIDAK_DIMUAT, PENAFIAN, NEPTU_HARI, NEPTU_PASARAN, REPO_MESIN, SITUS } from '../data.js';

const luar = (href, teks) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${teks}</a>`;

/* ---------------------------------------------------------------- Istilah */
export function bukaIstilah(root) {
  const butir = ISTILAH.map(i => `<li id="${i.id}" data-cari="${esc((i.istilah + ' ' + i.arti).toLowerCase())}"><dl><dt>${esc(i.istilah)}</dt><dd>${esc(i.arti)}</dd></dl></li>`).join('');
  root.innerHTML = `
  <div class="teks-halaman">
    <header><h1 class="judul-halaman" id="judul-istilah" tabindex="-1">Istilah</h1><p class="lead">Istilah yang dipakai di laporan dan artinya.</p></header>
    <div class="medan cari-istilah"><label for="cari">Cari istilah</label><input class="isian" id="cari" type="search" autocomplete="off" placeholder="Misalnya: neptu"></div>
    <p class="petunjuk" id="hasil-cari" role="status" aria-live="polite"></p>
    <ul class="glos-daftar" id="daftar-istilah">${butir}</ul>
  </div>`;
  document.title = 'Istilah · Primbon';
  const cari = root.querySelector('#cari');
  const info = root.querySelector('#hasil-cari');
  cari.addEventListener('input', () => {
    const q = cari.value.trim().toLowerCase();
    let ada = 0;
    root.querySelectorAll('#daftar-istilah li').forEach(li => {
      const cocok = !q || li.dataset.cari.includes(q);
      li.hidden = !cocok;
      if (cocok) ada += 1;
    });
    info.textContent = q ? (ada ? `${ada} istilah ditemukan.` : `Tidak ada istilah yang cocok dengan “${cari.value.trim()}”.`) : '';
  });
  if (location.hash && !location.hash.includes('=')) document.getElementById(location.hash.slice(1))?.scrollIntoView();
}

/* ---------------------------------------------------------------- Tentang */
export function bukaTentang(root) {
  const tabel = (judul, baris) =>
    `<table class="tabel-kecil"><caption>${judul}</caption><tbody>${baris.map(([k, n]) => `<tr><th scope="row">${k}</th><td>${n}</td></tr>`).join('')}</tbody></table>`;
  root.innerHTML = `
  <div class="teks-halaman">
    <header><h1 class="judul-halaman" id="judul-tentang" tabindex="-1">Tentang</h1><p class="lead">Cara menghitung, sumber tafsir, dan batas yang perlu Anda ketahui.</p></header>
    <section class="kartu" aria-labelledby="h-cara"><h2 id="h-cara">Cara menyusun laporan</h2><p class="lead">Dalam empat langkah.</p>
      <ol class="langkah">${LANGKAH.map((l, n) => `<li><span class="no" aria-hidden="true">${n + 1}</span><div><h3>${esc(l.judul)}</h3><p>${esc(l.teks)}</p></div></li>`).join('')}</ol>
      <div class="dua-kolom">${tabel('Neptu hari', NEPTU_HARI)}${tabel('Neptu pasaran', NEPTU_PASARAN)}</div>
    </section>
    <section class="kartu" aria-labelledby="h-sumber"><h2 id="h-sumber">Sumber</h2>
      <ul class="daftar-batas">
        <li><b>Tafsir:</b> kitab Betaljemur Adammakna, ditulis ulang dengan rujukan bab dan halaman cetak pada tiap butir.</li>
        <li><b>Hitungan kalender:</b> mesin pawukon (${luar(REPO_MESIN, 'github.com/iwewe/pawukon')}) yang diuji terhadap tabel kalender Keraton Ngayogyakarta. Di sana tersedia rumusan, bukti, dan batasnya.</li>
      </ul></section>
    <section class="kartu" aria-labelledby="h-batas"><h2 id="h-batas">Batas</h2><p class="lead">Yang tidak bisa atau tidak kami klaim.</p>
      <ul class="daftar-batas">${BATAS.map(t => `<li>${esc(t)}</li>`).join('')}</ul></section>
    <section class="kartu" aria-labelledby="h-tidak"><h2 id="h-tidak">Yang sengaja tidak dimuat</h2>
      <ul class="daftar-batas">${TIDAK_DIMUAT.map(t => `<li>${esc(t)}</li>`).join('')}</ul></section>
    <section class="kartu" aria-labelledby="h-privasi"><h2 id="h-privasi">Privasi</h2>
      <p class="paragraf-kartu">Semua hitungan berjalan di peramban Anda. Tidak ada akun, dan data lahir tidak dikirim ke server mana pun: data hanya ada di bagian setelah tanda # pada alamat laporan, yang tidak pernah dikirim peramban. Siapa pun yang Anda beri tautan laporan akan melihat data itu.</p></section>
    <section class="kartu" aria-labelledby="h-lisensi"><h2 id="h-lisensi">Lisensi dan kredit</h2>
      <p class="kutipan">Hak cipta &copy; 2026 Iwewe. Lisensi MIT.</p>
      <dl class="baris-info">
        <dt>Mesin pawukon</dt><dd>MIT, hak cipta &copy; 2026 Iwewe. ${luar(`${REPO_MESIN}/blob/main/LICENSE`, 'Baca lisensinya')}.</dd>
        <dt>Huruf</dt><dd>Newsreader dan Plus Jakarta Sans, lisensi SIL Open Font 1.1 (${luar('/fonts/OFL-Newsreader.txt', 'Newsreader')}, ${luar('/fonts/OFL-PlusJakartaSans.txt', 'Plus Jakarta Sans')}).</dd>
      </dl></section>
    <p class="catatan-kaki">${esc(PENAFIAN)} Situs: ${esc(SITUS.replace('https://', ''))}</p>
    <ul class="menu-daftar"><li><a href="/istilah"><span>Daftar istilah</span>${IKON.kanan(20)}</a></li></ul>
  </div>`;
  document.title = 'Tentang · Primbon';
}

/* ---------------------------------------------------------------- 404 */
export function bukaTidakAda(root) {
  root.innerHTML = `
  <div class="status-halaman">
    <span class="angka" aria-hidden="true">404</span>
    <h1 class="judul-halaman" id="judul-404" tabindex="-1">Halaman ini tidak ada</h1>
    <p class="redam">Mungkin tautannya salah ketik atau sudah dipindah.</p>
    <a class="btn btn-utama" href="/">Kembali ke beranda</a>
  </div>`;
  document.title = 'Halaman tidak ada · Primbon';
}
