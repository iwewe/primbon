/**
 * Jodoh: dua pihak (tanggal lahir, jam dan nama opsional), lalu hitungan dasar, neptu weton, dan huruf nama.
 * Hasil bernada buruk adalah kata kitab; halaman selalu menyertakan catatan bahwa keputusan milik pengguna.
 */
import { esc, tanggalPanjang, tanggalTanpaHari, jamTitik } from '../format.js';
import { validasiTanggal, bacaJam, masukanJodohDariParam, paramDariJodoh, paramDariAlamat } from '../masukan.js';
import { bangunJodoh } from '../alat.js';
import { IKON } from '../logo.js';
import { htmlBagian, htmlHeroAlat, medanTanggal, galatTanggal, medanJam, galatJam } from './komponen.js';

const PETUNJUK_JAM = 'Hari Jawa berganti saat magrib. Lahir pukul 18.00 atau sesudahnya dihitung dari hari berikutnya.';

function formPihak(kunci, judul, m) {
  return `<div class="pihak"><h3>${esc(judul)}</h3>
    <div class="medan"><label for="${kunci}-nama">Nama <small>(opsional)</small></label>
      <input class="isian" id="${kunci}-nama" type="text" maxlength="60" autocomplete="off" placeholder="Untuk hitungan huruf nama" value="${esc(m ? m.nama : '')}"></div>
    ${medanTanggal(kunci, 'Tanggal lahir', m ? m.tanggal : '')}
    ${medanJam(`${kunci}-jam`, m && m.jam ? jamTitik(m.jam) : '', { petunjuk: PETUNJUK_JAM })}
  </div>`;
}

function htmlForm(m, terbuka) {
  const isi = `<form class="formulir" id="form-jodoh" novalidate>
      <h2>Data kedua pihak</h2>
      <p class="lead">Kitab menyusun hitungan ini untuk pasangan pria dan wanita. Untuk pasangan lain, hasilnya hanya acuan.</p>
      <div class="dua-pihak">${formPihak('pria', 'Pihak pria', m && m.pria)}${formPihak('wanita', 'Pihak wanita', m && m.wanita)}</div>
      <div><button class="btn btn-utama btn-blok" type="submit">Hitung kecocokan</button></div>
      <p class="privasi">Dihitung di perangkat Anda. Tidak ada akun dan tidak ada data yang dikirim ke server.</p>
    </form>`;
  return terbuka
    ? `<section class="panel-form panel-lebar" id="data-jodoh" aria-label="Data kedua pihak">${isi}</section>`
    : `<details class="ubah-data" id="data-jodoh"><summary>Ubah data</summary>${isi}</details>`;
}

function kalimatPihak(p) {
  const nama = p.nama ? `${esc(p.nama)}, ` : '';
  if (!p.hariJawa.jamDiketahui) return `${nama}${esc(p.peran.toLowerCase())}: ${esc(tanggalTanpaHari(p.tanggal))}, jam tidak diisi, dipakai tanggal biasa.`;
  const ket = p.hariJawa.sesudahMagrib ? `sesudah magrib, dihitung sebagai ${esc(tanggalPanjang(p.hariJawa.iso))}` : 'sebelum magrib, sama dengan tanggal lahir';
  return `${nama}${esc(p.peran.toLowerCase())}: ${esc(tanggalTanpaHari(p.tanggal))}, pukul ${esc(jamTitik(p.jam))} (${ket}).`;
}

export function bukaJodoh(root, ctx) {
  const masukan = masukanJodohDariParam(paramDariAlamat(location));
  document.title = 'Jodoh · Primbon';
  if (!masukan) {
    root.innerHTML = `${htmlHeroAlat({ id: 'judul-jodoh', eyebrow: 'Jodoh', judul: 'Kecocokan dua weton', paragraf: 'Hitung kecocokan dua orang menurut kitab Betaljemur Adammakna: sisa sembilan, sisa empat, pasangan hari, neptu weton, dan huruf nama.' })}${htmlForm(null, true)}`;
    ikat(root, ctx);
    return;
  }
  let r;
  try {
    r = bangunJodoh(masukan.pria, masukan.wanita);
  } catch {
    root.innerHTML = `<div class="halaman"><div class="kartu"><h1 class="judul-halaman" tabindex="-1">Hitungan tidak dapat disusun</h1><p class="lead">Salah satu tanggal di luar rentang yang dapat dihitung.</p><p class="jarak-atas"><a class="btn btn-polos" href="/jodoh">Isi ulang</a></p></div></div>`;
    return;
  }
  const [a, b] = r.pihak;
  const samping = `<dl class="ringkas">${r.pihak.map(p => `<div><dt>${esc(p.peran)}${p.nama ? ` &middot; ${esc(p.nama)}` : ''}</dt><dd>${esc(p.weton)}</dd></div><div><dt>Neptu</dt><dd>${p.neptu}</dd></div>`).join('')}</dl>`;
  const spekulatif = r.spekulatif ? `<div class="pita-catatan" role="note">${IKON.info(20)}<p>Salah satu tanggal sesudah 25 Agustus 2052, jadi tanggal Jawanya perkiraan.</p></div>` : '';
  root.innerHTML = `${htmlHeroAlat({
    id: 'judul-jodoh',
    eyebrow: 'Jodoh',
    judul: `${a.weton} dan ${b.weton}`,
    sub: `neptu ${a.neptu} dan ${b.neptu}`,
    paragraf: `${kalimatPihak(a)} ${kalimatPihak(b)}`,
    aksi: `<button class="btn btn-hangat" type="button" data-aksi="bagikan">${IKON.tautan(18)} Bagikan tautan</button><button class="btn btn-garis" type="button" data-aksi="cetak">Cetak</button>`,
    samping
  })}${spekulatif}
  <div class="laporan-tata laporan-satu">
    <div class="laporan-isi">
      <section class="kartu" aria-labelledby="h-baca"><h2 id="h-baca">Cara membaca</h2>
        <p class="lead">${esc(r.catatan)}</p>
        <p class="lead jarak-sedang">Setiap hitungan adalah lapisan tersendiri dan boleh saling berbeda. Tiap butir memuat sumber bab dan halaman kitab. Penilaian baik, waspada, dan netral adalah klasifikasi situs ini. <a href="/istilah#penilaian">Selengkapnya</a></p></section>
      ${r.bagian.map(htmlBagian).join('')}
      ${r.adaNama ? '' : '<p class="penutup">Isi nama kedua pihak untuk menambah hitungan huruf nama.</p>'}
      ${htmlForm(masukan, false)}
      <p class="penutup">Hitungan mengikuti kalender Jawa Sultan Agungan menurut Keraton Ngayogyakarta. <a href="/tentang">Cara menghitung dan sumbernya</a></p>
    </div>
  </div>`;
  document.title = `${a.weton} dan ${b.weton} · Jodoh · Primbon`;
  ikat(root, ctx);
}

function ikat(root, ctx) {
  const q = s => root.querySelector(s);
  const form = q('#form-jodoh');
  const baca = kunci => {
    const tgl = validasiTanggal(q(`#${kunci}-tgl`).value, q(`#${kunci}-bln`).value, q(`#${kunci}-thn`).value);
    galatTanggal(q, kunci, tgl.ok ? '' : tgl.pesan, tgl.bidang || []);
    const jam = bacaJam(q(`#${kunci}-jam`).value);
    galatJam(q, `${kunci}-jam`, jam.ok ? '' : jam.pesan);
    if (!tgl.ok) return { salah: () => q(`#${kunci}-${tgl.bidang[0]}`).focus() };
    if (!jam.ok) return { salah: () => q(`#${kunci}-jam`).focus() };
    return { ok: true, m: { tanggal: tgl.iso, jam: jam.jam, nama: q(`#${kunci}-nama`).value.trim() } };
  };
  form.addEventListener('submit', e => {
    e.preventDefault();
    const a = baca('pria');
    const b = baca('wanita');
    if (!a.ok) return a.salah();
    if (!b.ok) return b.salah();
    ctx.navigasi('/jodoh#' + paramDariJodoh({ pria: a.m, wanita: b.m }).toString());
  });
  root.querySelectorAll('[data-aksi]').forEach(t =>
    t.addEventListener('click', async () => {
      if (t.dataset.aksi === 'cetak') return window.print();
      try {
        if (navigator.share) await navigator.share({ title: 'Jodoh', url: location.href });
        else {
          await navigator.clipboard.writeText(location.href);
          ctx.toast('Tautan disalin.');
        }
      } catch (e) {
        if (e && e.name !== 'AbortError') ctx.toast('Tautan tidak dapat disalin otomatis. Salin dari bilah alamat.');
      }
    })
  );
}
