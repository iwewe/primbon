/**
 * Titik masuk situs Primbon: kerangka halaman, tema, navigasi, dan penyajian rute.
 * Semua hitungan berjalan di peramban; tidak ada server yang menerima data lahir dan tidak ada akun.
 */
import './css/situs.css';
import { tandaMerek, IKON } from './logo.js';
import { buatRouter } from './router.js';
import { bukaBeranda } from './tampilan/beranda.js';
import { bukaTentang, bukaIstilah, bukaTidakAda } from './tampilan/statis.js';

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
  { jalur: '/istilah', nama: 'Istilah', ikon: 'metode', aktif: ['/istilah'] },
  { jalur: '/tentang', nama: 'Tentang', ikon: 'info', aktif: ['/tentang'] }
];

function kerangka() {
  document.getElementById('app').innerHTML = `
  <a class="lewati" href="#utama">Lewati ke isi</a>
  <header class="atas"><div class="atas-isi">
    <a class="merek" href="/" aria-label="Primbon, ke beranda">${tandaMerek(32)}<span class="merek-teks"><span class="merek-nama">IWEWE</span><span class="merek-sub">Primbon</span></span></a>
    <nav class="nav-atas" aria-label="Navigasi utama">${MENU.map(m => `<a href="${m.jalur}" data-menu="${m.jalur}">${m.nama}</a>`).join('')}</nav>
    <div class="atas-kanan">
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

/* ------------------------------------------------------------ laporan (dimuat malas) */
// Mesin tafsir dan datanya hanya dimuat saat laporan dibuka, agar beranda tetap ringan.
let muatLaporan = 0;
function bukaLaporanMalas(akar) {
  const giliran = ++muatLaporan;
  akar.innerHTML = '<div class="halaman"><h1 class="judul-halaman" tabindex="-1" role="status">Menyusun laporan…</h1></div>';
  import('./tampilan/laporan.js')
    .then(m => {
      // Pengguna sudah pindah halaman selama modul dimuat: jangan menimpa halaman lain.
      if (giliran === muatLaporan && /^\/laporan\/?$/.test(location.pathname)) m.bukaLaporan(akar, ctx);
    })
    .catch(() => {
      if (giliran !== muatLaporan) return;
      akar.innerHTML = '<div class="halaman"><div class="kartu"><h1 class="judul-halaman" tabindex="-1">Laporan belum dapat dimuat</h1><p class="lead">Bagian ini perlu diunduh dan tampaknya sambungan internet terputus. Coba lagi setelah tersambung.</p><p class="jarak-atas"><a class="btn btn-polos" href="/">Kembali ke beranda</a></p></div></div>';
    });
}

/* ------------------------------------------------------------ mulai */
const ctx = { navigasi: null, toast };

function mulai() {
  kerangka();
  const akar = document.getElementById('utama');
  const router = buatRouter({
    akar,
    rute: {
      '/': a => bukaBeranda(a, ctx),
      '/laporan': a => bukaLaporanMalas(a),
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
