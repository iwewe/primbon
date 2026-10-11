/**
 * Hari baik: tinjauan satu tanggal menurut kitab untuk suatu keperluan, plus daftar 14 hari berikutnya agar mudah membandingkan.
 * Hari tanpa catatan berarti kitab tidak menyebutnya, bukan berarti hari itu baik.
 */
import { esc, tanggalPanjang } from '../format.js';
import { validasiTanggal, masukanHariDariParam, paramDariHari, paramDariAlamat, UNTUK, TANGGAL_AWAL, TANGGAL_AKHIR } from '../masukan.js';
import { tinjauanHari, cariHari, KEPERLUAN } from '../alat.js';
import { nomorHari, isoDariNomor } from '../../mesin/index.js';
import { IKON } from '../logo.js';
import { htmlBagian, htmlHeroAlat, htmlRingkasanArah, medanTanggal, galatTanggal } from './komponen.js';

const LANGKAH = 14;

function htmlForm(m) {
  const opsi = KEPERLUAN.map(k => `<option value="${k.id}"${k.id === m.untuk ? ' selected' : ''}>${esc(k.nama)}</option>`).join('');
  return `<section class="panel-form panel-lebar" aria-label="Pilih tanggal dan keperluan">
    <form class="formulir" id="form-hari" novalidate>
      ${medanTanggal('hari', 'Tanggal yang ditinjau', m.tanggal)}
      <div class="medan"><label for="hari-untuk">Keperluan</label><select class="isian" id="hari-untuk">${opsi}</select></div>
      <div><button class="btn btn-utama btn-blok" type="submit">Tinjau hari</button></div>
    </form>
  </section>`;
}

function htmlDaftar(hari, m) {
  const baris = hari.map(h => {
    const href = `/hari#${esc(paramDariHari({ tanggal: h.iso, untuk: m.untuk }).toString())}`;
    const kini = h.iso === m.tanggal;
    const isi = h.jumlahTemuan ? htmlRingkasanArah(h.ringkasan) : '<span class="redam">tidak ada catatan</span>';
    return `<tr${kini ? ' class="kini" aria-current="true"' : ''}><th scope="row"><a href="${href}">${esc(tanggalPanjang(h.iso))}</a></th><td data-label="Weton">${esc(h.weton)}</td><td data-label="Tanggal Jawa">${esc(h.tanggalJawa)}</td><td data-label="Catatan kitab">${isi}</td></tr>`;
  }).join('');
  const awal = nomorHari(m.tanggal);
  const mundur = isoDariNomor(awal - LANGKAH);
  const maju = isoDariNomor(awal + LANGKAH);
  const tautan = (iso, label, ikon) => `<a class="btn btn-polos" href="/hari#${esc(paramDariHari({ tanggal: iso, untuk: m.untuk }).toString())}">${ikon}${label}</a>`;
  const adaMundur = mundur >= TANGGAL_AWAL;
  const adaMaju = maju <= TANGGAL_AKHIR;
  return `<section class="kartu bagian" id="daftar-hari" aria-labelledby="h-daftar"><h2 id="h-daftar">${LANGKAH} hari berikutnya</h2>
    <p class="lead">Pilih tanggal untuk melihat rinciannya. Hari tanpa catatan berarti kitab tidak menyebutnya untuk keperluan ini, bukan berarti hari itu baik.</p>
    <table class="tabel-lambang tabel-bertumpuk"><caption class="sr">Ringkasan ${LANGKAH} hari mulai ${esc(tanggalPanjang(m.tanggal))}</caption>
      <thead><tr><th scope="col">Tanggal</th><th scope="col">Weton</th><th scope="col">Tanggal Jawa</th><th scope="col">Catatan kitab</th></tr></thead><tbody>${baris}</tbody></table>
    <div class="hasil-aksi aksi-halaman">${adaMundur ? tautan(mundur, `${LANGKAH} hari sebelumnya`, IKON.kiri(18)) : ''}${adaMaju ? tautan(maju, `${LANGKAH} hari sesudahnya`, IKON.kanan(18)) : ''}</div>
  </section>`;
}

export function bukaHari(root, ctx) {
  const dariAlamat = masukanHariDariParam(paramDariAlamat(location));
  const m = dariAlamat || { tanggal: ctx.sekarang().iso, untuk: 'semua' };
  let r;
  let hari;
  try {
    r = tinjauanHari(m);
    hari = cariHari({ dari: m.tanggal, jumlah: LANGKAH, untuk: m.untuk });
  } catch {
    root.innerHTML = `<div class="halaman"><div class="kartu"><h1 class="judul-halaman" tabindex="-1">Tinjauan tidak dapat disusun</h1><p class="lead">Tanggal ini di luar rentang yang dapat dihitung.</p><p class="jarak-atas"><a class="btn btn-polos" href="/hari">Kembali</a></p></div></div>`;
    return;
  }
  const namaUntuk = KEPERLUAN.find(k => k.id === m.untuk).nama;
  const paragraf = r.kosong
    ? 'Kitab tidak menyebut apa pun untuk hari ini pada keperluan yang dipilih. Itu berarti tidak ada catatan, bukan berarti hari ini baik.'
    : 'Catatan di bawah dikelompokkan menurut keperluan. Beberapa aturan memakai tanggal Jawa dan bisa bergeser sehari.';
  const samping = `<dl class="ringkas"><div><dt>Tanggal Jawa</dt><dd>${esc(r.tanggalJawa)}</dd></div><div><dt>Wuku</dt><dd>${esc(r.wuku)}</dd></div>${r.hariMulia.length ? `<div><dt>Hari mulia</dt><dd>${esc(r.hariMulia.join(', '))}</dd></div>` : ''}</dl>`;
  const spekulatif = r.spekulatif ? `<div class="pita-catatan" role="note">${IKON.info(20)}<p>Tanggal ini sesudah 25 Agustus 2052, jadi tanggal Jawanya perkiraan.</p></div>` : '';
  root.innerHTML = `${htmlHeroAlat({
    id: 'judul-hari',
    eyebrow: `Hari baik &middot; ${esc(namaUntuk)}`,
    judul: r.weton,
    sub: esc(tanggalPanjang(m.tanggal)),
    paragraf: esc(paragraf),
    samping
  })}${spekulatif}
  ${htmlForm(m)}
  <div class="laporan-tata laporan-satu"><div class="laporan-isi">
    <section class="kartu" aria-labelledby="h-baca"><h2 id="h-baca">Cara membaca</h2>
      <p class="lead">${esc(r.catatan)}</p>
      ${r.kosong ? '' : `<div class="jarak-sedang">${htmlRingkasanArah(r.ringkasan)}</div>`}</section>
    ${r.bagian.map(htmlBagian).join('')}
    ${htmlDaftar(hari, m)}
    <p class="penutup">Hitungan mengikuti kalender Jawa Sultan Agungan menurut Keraton Ngayogyakarta. <a href="/tentang">Cara menghitung dan sumbernya</a></p>
  </div></div>`;
  document.title = `${r.weton} · Hari baik · Primbon`;

  const q = s => root.querySelector(s);
  q('#form-hari').addEventListener('submit', e => {
    e.preventDefault();
    const tgl = validasiTanggal(q('#hari-tgl').value, q('#hari-bln').value, q('#hari-thn').value);
    galatTanggal(q, 'hari', tgl.ok ? '' : tgl.pesan, tgl.bidang || []);
    if (!tgl.ok) return q(`#hari-${tgl.bidang[0]}`).focus();
    const untuk = q('#hari-untuk').value;
    ctx.navigasi('/hari#' + paramDariHari({ tanggal: tgl.iso, untuk: UNTUK.includes(untuk) ? untuk : 'semua' }).toString());
  });
}
