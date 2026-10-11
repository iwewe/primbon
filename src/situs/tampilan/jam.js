/**
 * Jam: saat baik dan buruk pada satu hari menurut kitab (tujuh saat siang, siang dan malam, jam sial dan baik, saat malaikat,
 * urusan perkara, dan akad nikah). Bila jam diisi, baris yang memuatnya ditandai.
 */
import { esc, tanggalPanjang, jamTitik } from '../format.js';
import { validasiTanggal, bacaJam, masukanJamDariParam, paramDariJam, paramDariAlamat } from '../masukan.js';
import { bangunJam } from '../alat.js';
import { IKON } from '../logo.js';
import { htmlBagian, htmlButir, htmlHeroAlat, medanTanggal, galatTanggal, medanJam, galatJam } from './komponen.js';

function htmlForm(m) {
  return `<section class="panel-form panel-lebar" aria-label="Pilih tanggal dan jam">
    <form class="formulir" id="form-jam" novalidate>
      ${medanTanggal('jam-hari', 'Tanggal', m.tanggal)}
      ${medanJam('jam-isi', m.jam ? jamTitik(m.jam) : '', { label: 'Jam yang ingin dicek', petunjuk: 'Isi untuk menandai saat yang memuat jam itu.' })}
      <div class="hasil-aksi aksi-form"><button class="btn btn-utama" type="submit">Tampilkan saat</button><button class="btn btn-polos" type="button" id="jam-sekarang">Pakai jam sekarang</button></div>
    </form>
  </section>`;
}

export function bukaJam(root, ctx) {
  const dariAlamat = masukanJamDariParam(paramDariAlamat(location));
  const m = dariAlamat || { tanggal: ctx.sekarang().iso, jam: null };
  let r;
  try {
    r = bangunJam(m);
  } catch {
    root.innerHTML = `<div class="halaman"><div class="kartu"><h1 class="judul-halaman" tabindex="-1">Tabel jam tidak dapat disusun</h1><p class="lead">Tanggal ini di luar rentang yang dapat dihitung.</p><p class="jarak-atas"><a class="btn btn-polos" href="/jam">Kembali</a></p></div></div>`;
    return;
  }
  const spekulatif = r.spekulatif ? `<div class="pita-catatan" role="note">${IKON.info(20)}<p>Tanggal ini sesudah 25 Agustus 2052, jadi tanggal Jawanya perkiraan.</p></div>` : '';
  const pada = r.padaJam
    ? `<section class="kartu bagian" id="pada-jam" aria-labelledby="h-pada"><h2 id="h-pada">Pada pukul ${esc(r.padaJam.jam)}</h2><p class="lead">Saat yang memuat jam itu pada ${esc(tanggalPanjang(m.tanggal))}.</p>
        <div class="butir-daftar">${r.padaJam.butir.length ? r.padaJam.butir.map(htmlButir).join('') : '<p class="butir">Tidak ada saat yang memuat jam ini pada tabel siang kitab.</p>'}</div></section>`
    : '';
  root.innerHTML = `${htmlHeroAlat({
    id: 'judul-jam',
    eyebrow: 'Jam',
    judul: r.weton,
    sub: `${esc(tanggalPanjang(m.tanggal))} &middot; ${esc(r.tanggalJawa)}`,
    paragraf: 'Saat baik dan buruk pada hari ini menurut kitab. Tabel mengikuti weton hari yang dipilih; bagian malam dicantumkan pada tabel yang sama.'
  })}${spekulatif}
  ${htmlForm(m)}
  <div class="laporan-tata laporan-satu"><div class="laporan-isi">
    <section class="kartu" aria-labelledby="h-baca"><h2 id="h-baca">Cara membaca</h2>
      <p class="lead">${esc(r.catatan)} Beberapa tabel memakai nama saat yang berbeda; semuanya tabel tersendiri dalam kitab dan boleh saling berbeda.</p></section>
    ${pada}
    ${r.bagian.map(htmlBagian).join('')}
    <p class="penutup">Hitungan mengikuti kalender Jawa Sultan Agungan menurut Keraton Ngayogyakarta. <a href="/tentang">Cara menghitung dan sumbernya</a></p>
  </div></div>`;
  document.title = `${r.weton} · Jam · Primbon`;

  const q = s => root.querySelector(s);
  q('#jam-sekarang').addEventListener('click', () => {
    const j = ctx.sekarang().jam;
    q('#jam-isi').value = `${String(Math.floor(j)).padStart(2, '0')}.${String(Math.floor((j % 1) * 60)).padStart(2, '0')}`;
    q('#jam-isi').focus();
  });
  q('#form-jam').addEventListener('submit', e => {
    e.preventDefault();
    const tgl = validasiTanggal(q('#jam-hari-tgl').value, q('#jam-hari-bln').value, q('#jam-hari-thn').value);
    galatTanggal(q, 'jam-hari', tgl.ok ? '' : tgl.pesan, tgl.bidang || []);
    const jam = bacaJam(q('#jam-isi').value);
    galatJam(q, 'jam-isi', jam.ok ? '' : jam.pesan);
    if (!tgl.ok) return q(`#jam-hari-${tgl.bidang[0]}`).focus();
    if (!jam.ok) return q('#jam-isi').focus();
    ctx.navigasi('/jam#' + paramDariJam({ tanggal: tgl.iso, jam: jam.jam }).toString());
  });
}
