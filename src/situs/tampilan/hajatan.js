/**
 * Hajatan: tanggal acara adat menurut kitab: memasang tarub, tingkeb, jadwal kehamilan, dan jadwal bayi (dengan nama bayi opsional).
 * Hanya tanggal acara yang dihitung; ini bukan panduan kehamilan atau perawatan anak.
 */
import { esc } from '../format.js';
import { validasiTanggal, masukanHajatanDariParam, paramDariHajatan, paramDariAlamat, MODE_HAJATAN } from '../masukan.js';
import { bangunHajatan, MODE_HAJATAN_NAMA } from '../alatLanjut.js';
import { IKON } from '../logo.js';
import { htmlBagian, htmlHeroAlat, htmlPeringatan, medanTanggal, galatTanggal, medanPilihan } from './komponen.js';

const LABEL_TANGGAL = {
  tarub: 'Tanggal yang ditinjau',
  tingkeb: 'Tanggal yang ditinjau (dihitung 30 hari ke depan)',
  kehamilan: 'Tanggal acuan (misalnya awal kehamilan)',
  bayi: 'Tanggal lahir bayi'
};

export function bukaHajatan(root, ctx) {
  const alamat = paramDariAlamat(location);
  const kAlamat = alamat.get('k');
  const k = MODE_HAJATAN.includes(kAlamat) ? kAlamat : 'tarub';
  const m = masukanHajatanDariParam(alamat) || { k, tanggal: ctx.sekarang().iso, nama: '' };
  let r;
  try {
    r = bangunHajatan(m);
  } catch {
    root.innerHTML = `<div class="halaman"><div class="kartu"><h1 class="judul-halaman" tabindex="-1">Hitungan tidak dapat disusun</h1><p class="lead">Tanggal ini di luar rentang yang dapat dihitung.</p><p class="jarak-atas"><a class="btn btn-polos" href="/hajatan">Kembali</a></p></div></div>`;
    return;
  }
  const opsi = MODE_HAJATAN.map(id => ({ id, nama: MODE_HAJATAN_NAMA[id] }));
  const spekulatif = r.spekulatif ? `<div class="pita-catatan" role="note">${IKON.info(20)}<p>Tanggal ini sesudah 25 Agustus 2052, jadi tanggal Jawanya perkiraan.</p></div>` : '';
  root.innerHTML = `${htmlHeroAlat({
    id: 'judul-hajatan',
    eyebrow: `Hajatan &middot; ${esc(r.judul)}`,
    judul: r.hero.judul,
    sub: esc(r.hero.sub),
    paragraf: 'Tanggal acara adat menurut kitab Betaljemur Adammakna. Hanya tanggal yang dihitung; isi dan tata cara acara tidak dimuat.'
  })}${spekulatif}
  <section class="panel-form panel-lebar" aria-label="Pilih jenis dan tanggal">
    <form class="formulir" id="form-hajatan" novalidate>
      ${medanPilihan('hj-k', 'Yang dihitung', opsi, m.k)}
      ${medanTanggal('hj', LABEL_TANGGAL[m.k], m.tanggal)}
      ${m.k === 'bayi' ? `<div class="medan"><label for="hj-nama">Nama bayi <small>(opsional)</small></label><input class="isian" id="hj-nama" maxlength="60" autocomplete="off" placeholder="Untuk hitungan kecocokan nama" value="${esc(m.nama)}"></div>` : ''}
      <div><button class="btn btn-utama btn-blok" type="submit">Hitung tanggal</button></div>
    </form>
  </section>
  <div class="laporan-tata laporan-satu"><div class="laporan-isi">
    ${htmlPeringatan(r.catatan, IKON.info(20))}
    ${r.bagian.map(htmlBagian).join('')}
    <p class="penutup">Hitungan mengikuti kalender Jawa Sultan Agungan menurut Keraton Ngayogyakarta. <a href="/tentang">Cara menghitung dan sumbernya</a></p>
  </div></div>`;
  document.title = `${r.judul} · Hajatan · Primbon`;
  const q = s => root.querySelector(s);
  // Mengganti jenis memuat ulang halaman dengan jenis baru agar isian (mis. nama bayi) sesuai.
  q('#hj-k').addEventListener('change', e => {
    const tgl = validasiTanggal(q('#hj-tgl').value, q('#hj-bln').value, q('#hj-thn').value);
    ctx.navigasi('/hajatan#' + paramDariHajatan({ k: e.target.value, tanggal: tgl.ok ? tgl.iso : m.tanggal, nama: '' }).toString());
    document.getElementById('hj-k')?.focus();
  });
  q('#form-hajatan').addEventListener('submit', e => {
    e.preventDefault();
    const tgl = validasiTanggal(q('#hj-tgl').value, q('#hj-bln').value, q('#hj-thn').value);
    galatTanggal(q, 'hj', tgl.ok ? '' : tgl.pesan, tgl.bidang || []);
    if (!tgl.ok) return q(`#hj-${tgl.bidang[0]}`).focus();
    ctx.navigasi('/hajatan#' + paramDariHajatan({ k: q('#hj-k').value, tanggal: tgl.iso, nama: q('#hj-nama') ? q('#hj-nama').value.trim() : '' }).toString());
  });
}
