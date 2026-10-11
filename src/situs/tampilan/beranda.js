/**
 * Beranda: pengantar dan formulir data lahir. Juga dipakai untuk "Ubah data" (formulir terisi).
 */
import { esc, BULAN, jamTitik } from '../format.js';
import { validasiTanggal, bacaJam, paramDariMasukan, masukanDariParam, paramDariAlamat } from '../masukan.js';

const ISI = [
  'Watak menurut hari, pasaran, weton, wuku, dan hitungan sisa tujuh',
  'Lambang dan kedudukan hari serta pasaran',
  'Tanggal, bulan, dan mangsa menurut kalender Jawa',
  'Neptu dan hitungannya, serta nama bila Anda mengisinya',
  'Rezeki dan arah, serta keterangan kesehatan menurut kitab'
];

function opsiBulan(terpilih) {
  return `<option value="">Pilih</option>` + BULAN.map((b, n) => `<option value="${n + 1}"${Number(terpilih) === n + 1 ? ' selected' : ''}>${b}</option>`).join('');
}

function htmlHero() {
  return `
  <section class="malam beranda-hero" aria-labelledby="judul-beranda">
    <span class="eyebrow">Tafsir weton</span>
    <h1 id="judul-beranda" class="judul-besar" tabindex="-1">Primbon</h1>
    <p class="pengantar">Laporan tafsir dari hari kelahiran Anda menurut kitab Betaljemur Adammakna. Masukkan tanggal lahir; weton, wuku, dan tanggal Jawa dihitung lalu disusun menjadi satu laporan.</p>
    <ul class="isi-laporan" aria-label="Isi laporan">${ISI.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
    <a class="contoh" href="/laporan#d=1945-08-17&n=Contoh">Lihat contoh laporan</a>
    <nav class="alat-lain" aria-label="Alat lain">
      <h2>Alat lain</h2>
      <a href="/jodoh"><b>Jodoh</b><span>Kecocokan dua weton dan nama</span></a>
      <a href="/hari"><b>Hari baik</b><span>Tinjau satu tanggal untuk suatu keperluan</span></a>
      <a href="/jam"><b>Jam</b><span>Saat baik dan buruk pada suatu hari</span></a>
      <a href="/rumah"><b>Rumah</b><span>Arah hadap, hari membangun, ukuran, sumur, pintu</span></a>
      <a href="/bepergian"><b>Bepergian</b><span>Arah dan waktu berangkat</span></a>
      <a href="/hajatan"><b>Hajatan</b><span>Tarub, tingkeb, jadwal kehamilan dan bayi</span></a>
    </nav>
  </section>`;
}

function htmlFormulir(isi) {
  const [y, m, d] = isi && isi.tanggal ? isi.tanggal.split('-').map(Number) : ['', '', ''];
  const jam = isi && isi.jam ? jamTitik(isi.jam) : '';
  return `
  <section class="panel-form" aria-labelledby="judul-form" id="data-lahir">
    <form class="formulir" id="form-lahir" novalidate>
      <h2 id="judul-form">Data lahir</h2>
      <div class="medan"><label for="f-nama">Nama <small>(opsional)</small></label>
        <input class="isian" id="f-nama" name="nama" type="text" autocomplete="off" maxlength="60" placeholder="Untuk bagian tentang nama" value="${esc(isi ? isi.nama : '')}"></div>
      <fieldset class="medan" aria-describedby="g-tanggal"><legend class="label label-legend">Tanggal lahir</legend>
        <div class="baris-tanggal">
          <div class="medan"><label for="f-tgl">Tanggal</label><input class="isian" id="f-tgl" name="tgl" inputmode="numeric" maxlength="2" autocomplete="off" value="${esc(d)}"></div>
          <div class="medan"><label for="f-bln">Bulan</label><select class="isian" id="f-bln" name="bln">${opsiBulan(m)}</select></div>
          <div class="medan"><label for="f-thn">Tahun</label><input class="isian" id="f-thn" name="thn" inputmode="numeric" maxlength="4" autocomplete="off" value="${esc(y)}"></div>
        </div>
        <div class="galat" id="g-tanggal" role="alert" hidden></div>
      </fieldset>
      <div class="medan"><label for="f-jam">Jam lahir <small>(opsional)</small></label>
        <input class="isian" id="f-jam" name="jam" inputmode="decimal" autocomplete="off" placeholder="00.00" maxlength="5" value="${esc(jam)}">
        <div class="galat" id="g-jam" role="alert" hidden></div>
        <p class="petunjuk">Hari Jawa berganti saat magrib. Bila Anda lahir pukul 18.00 atau sesudahnya, weton dihitung dari hari berikutnya. Tanpa jam, tanggal biasa dipakai.</p>
      </div>
      <div><button class="btn btn-utama btn-blok" type="submit">Buat laporan</button></div>
      <p class="privasi">Dihitung di perangkat Anda. Tidak ada akun dan tidak ada data yang dikirim ke server.</p>
    </form>
  </section>`;
}

export function bukaBeranda(root, ctx) {
  const awal = masukanDariParam(paramDariAlamat(location));
  root.innerHTML = `<div class="beranda">${htmlHero()}${htmlFormulir(awal)}</div>`;
  document.title = 'Primbon: laporan tafsir weton';
  const q = s => root.querySelector(s);
  const tampilGalat = (id, pesan, bidang = []) => {
    const el = q(id);
    el.hidden = !pesan;
    el.textContent = pesan || '';
    if (id === '#g-tanggal') for (const b of ['tgl', 'bln', 'thn']) q('#f-' + b).setAttribute('aria-invalid', pesan && bidang.includes(b) ? 'true' : 'false');
    if (id === '#g-jam') q('#f-jam').setAttribute('aria-invalid', pesan ? 'true' : 'false');
  };
  q('#form-lahir').addEventListener('submit', e => {
    e.preventDefault();
    const tgl = validasiTanggal(q('#f-tgl').value, q('#f-bln').value, q('#f-thn').value);
    tampilGalat('#g-tanggal', tgl.ok ? '' : tgl.pesan, tgl.bidang || []);
    const jam = bacaJam(q('#f-jam').value);
    tampilGalat('#g-jam', jam.ok ? '' : jam.pesan);
    if (!tgl.ok) return q('#f-' + tgl.bidang[0]).focus();
    if (!jam.ok) return q('#f-jam').focus();
    ctx.navigasi('/laporan#' + paramDariMasukan({ tanggal: tgl.iso, jam: jam.jam, nama: q('#f-nama').value.trim() }).toString());
  });
  if (awal) q('#data-lahir').scrollIntoView({ block: 'start' });
}
