/**
 * Titik masuk situs Primbon: kerangka halaman, tema, navigasi, dan penyajian rute.
 * Semua hitungan berjalan di peramban; tidak ada server yang menerima data lahir dan tidak ada akun.
 */
import './css/situs.css';
import { tandaMerek, IKON } from './logo.js';
import { buatRouter } from './router.js';
import { sekarangLokal } from './format.js';
import { bukaBeranda } from './tampilan/beranda.js';
import { bukaTentang, bukaIstilah, bukaLainnya, bukaTidakAda } from './tampilan/statis.js';

const SIMPAN_TEMA = 'primbon.tema';
const JUDUL_BAWAAN = 'Primbon: laporan tafsir weton';

/* ------------------------------------------------------------ tema */
const gelapSistem = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
function temaEfektif() {
  const t = document.documentElement.getAttribute('data-theme');
  return t === 'dark' || t === 'light' ? t : gelapSistem() ? 'dark' : 'light';
}
function perbaruiTombolTema() {
  const tombol = document.getElementById('tema');
  if (!tombol) return;
  const gelap = temaEfektif() === 'dark';
  tombol.setAttribute('aria-label', gelap ? 'Mode terang' : 'Mode gelap');
  tombol.setAttribute('title', gelap ? 'Mode terang' : 'Mode gelap');
}
function gantiTema() {
  const baru = temaEfektif() === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', baru);
  try {
    localStorage.setItem(SIMPAN_TEMA, baru);
  } catch {
    /* penyimpanan tidak tersedia: pilihan berlaku untuk tampilan ini saja */
  }
  perbaruiTombolTema();
}

/* ------------------------------------------------------------ kerangka */
const MENU = [
  { jalur: '/', nama: 'Laporan', ikon: 'weton', aktif: ['/', '/laporan'] },
  { jalur: '/jodoh', nama: 'Jodoh', ikon: 'pembanding', aktif: ['/jodoh'] },
  { jalur: '/hari', nama: 'Hari baik', ikon: 'kalender', aktif: ['/hari'] },
  { jalur: '/jam', nama: 'Jam', ikon: 'jam', aktif: ['/jam'] },
  { jalur: '/lainnya', nama: 'Lainnya', ikon: 'lainnya', aktif: ['/lainnya', '/rumah', '/bepergian', '/hajatan', '/tentang', '/istilah'] }
];

function kerangka() {
  document.getElementById('app').innerHTML = `
  <a class="lewati" href="#utama">Lewati ke isi</a>
  <header class="atas"><div class="atas-isi">
    <a class="merek" href="/" aria-label="Primbon, ke beranda">${tandaMerek(32)}<span class="merek-teks"><span class="merek-nama">IWEWE</span><span class="merek-sub">Primbon</span></span></a>
    <nav class="nav-atas" aria-label="Navigasi utama">${MENU.map(m => `<a href="${m.jalur}" data-menu="${m.jalur}">${m.nama}</a>`).join('')}</nav>
    <div class="atas-kanan">
      <a class="tautan-atas" href="/istilah">Istilah</a>
      <a class="tautan-atas" href="/tentang">Tentang</a>
      <button class="tombol-ikon" id="tema" type="button">${`<span class="i-bulan">${IKON.bulan(20)}</span><span class="i-matahari">${IKON.matahari(20)}</span>`}</button>
    </div>
  </div></header>
  <main id="utama" tabindex="-1"></main>
  <nav class="nav-bawah" aria-label="Navigasi bawah">${MENU.map(m => `<a href="${m.jalur}" data-menu="${m.jalur}"><span class="pil">${IKON[m.ikon](24)}</span><span>${m.nama}</span></a>`).join('')}</nav>
  <div id="lapisan" aria-live="polite"></div>`;
  document.getElementById('tema').addEventListener('click', gantiTema);
  perbaruiTombolTema();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', perbaruiTombolTema);
}

function tandaiMenu(jalur) {
  document.querySelectorAll('[data-menu]').forEach(a => {
    const m = MENU.find(x => x.jalur === a.dataset.menu);
    if (m.aktif.includes(jalur)) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

function toast(pesan) {
  const lapisan = document.getElementById('lapisan');
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.textContent = pesan;
  lapisan.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

/* ------------------------------------------------------------ halaman tafsir (dimuat malas) */
// Mesin tafsir dan datanya hanya dimuat saat halaman tafsir dibuka, agar beranda tetap ringan.
const MALAS = {
  '/laporan': { judul: 'Menyusun laporan…', impor: () => import('./tampilan/laporan.js'), fungsi: 'bukaLaporan' },
  '/jodoh': { judul: 'Memuat jodoh…', impor: () => import('./tampilan/jodoh.js'), fungsi: 'bukaJodoh' },
  '/hari': { judul: 'Memuat hari baik…', impor: () => import('./tampilan/hari.js'), fungsi: 'bukaHari' },
  '/jam': { judul: 'Memuat jam…', impor: () => import('./tampilan/jam.js'), fungsi: 'bukaJam' },
  '/rumah': { judul: 'Memuat rumah…', impor: () => import('./tampilan/rumah.js'), fungsi: 'bukaRumah' },
  '/bepergian': { judul: 'Memuat bepergian…', impor: () => import('./tampilan/bepergian.js'), fungsi: 'bukaBepergian' },
  '/hajatan': { judul: 'Memuat hajatan…', impor: () => import('./tampilan/hajatan.js'), fungsi: 'bukaHajatan' }
};
let muatTerakhir = 0;
function bukaMalas(jalur, akar) {
  const { judul, impor, fungsi } = MALAS[jalur];
  const giliran = ++muatTerakhir;
  akar.innerHTML = `<div class="halaman"><h1 class="judul-halaman" tabindex="-1" role="status">${judul}</h1></div>`;
  impor()
    .then(m => {
      // Pengguna sudah pindah halaman selama modul dimuat: jangan menimpa halaman lain.
      if (giliran === muatTerakhir && location.pathname.replace(/\/+$/, '') === jalur) m[fungsi](akar, ctx);
    })
    .catch(() => {
      if (giliran !== muatTerakhir) return;
      akar.innerHTML = '<div class="halaman"><div class="kartu"><h1 class="judul-halaman" tabindex="-1">Halaman belum dapat dimuat</h1><p class="lead">Bagian ini perlu diunduh dan tampaknya sambungan internet terputus. Coba lagi setelah tersambung.</p><p class="jarak-atas"><a class="btn btn-polos" href="/">Kembali ke beranda</a></p></div></div>';
    });
}

/* ------------------------------------------------------------ mulai */
const ctx = { sekarang: () => sekarangLokal(), navigasi: null, toast };

function mulai() {
  kerangka();
  const akar = document.getElementById('utama');
  const router = buatRouter({
    akar,
    rute: {
      '/': a => bukaBeranda(a, ctx),
      '/laporan': a => bukaMalas('/laporan', a),
      '/jodoh': a => bukaMalas('/jodoh', a),
      '/hari': a => bukaMalas('/hari', a),
      '/jam': a => bukaMalas('/jam', a),
      '/rumah': a => bukaMalas('/rumah', a),
      '/bepergian': a => bukaMalas('/bepergian', a),
      '/hajatan': a => bukaMalas('/hajatan', a),
      '/lainnya': a => bukaLainnya(a, ctx),
      '/istilah': a => bukaIstilah(a, ctx),
      '/tentang': a => bukaTentang(a, ctx)
    },
    tidakAda: a => bukaTidakAda(a, ctx),
    setelah: jalur => {
      tandaiMenu(jalur);
      if (jalur === '/') document.title = JUDUL_BAWAAN;
    }
  });
  ctx.navigasi = router.navigasi;
  router.gambar();
}

mulai();
