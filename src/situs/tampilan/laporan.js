/**
 * Laporan: weton dan ringkasan di atas, lalu bagian-bagian tafsir dengan daftar isi.
 * Struktur isi datang dari model (../laporan.js); berkas ini hanya mengubahnya menjadi HTML.
 */
import { esc, tanggalPanjang, tanggalTanpaHari, jamTitik } from '../format.js';
import { masukanDariParam, paramDariAlamat, paramDariMasukan } from '../masukan.js';
import { bangunLaporan } from '../laporan.js';
import { weton, nomorHari, isoDariNomor } from '../../mesin/index.js';
import { IKON } from '../logo.js';
import { htmlBagian, tag } from './komponen.js';

function kalimatMagrib(l) {
  const m = l.masukan;
  const hj = l.hariJawa;
  const besok = weton(isoDariNomor(nomorHari(hj.sipil) + 1)).weton;
  if (!hj.jamDiketahui) {
    return `Jam lahir tidak diisi, jadi tanggal biasa dipakai (${tanggalPanjang(hj.sipil)}). Bila Anda lahir sesudah magrib (sekitar pukul 18.00), weton Anda adalah ${besok}.`;
  }
  if (hj.sesudahMagrib) {
    return `Anda lahir pukul ${jamTitik(m.jam)}, sesudah magrib (dianggap pukul 18.00), jadi hari Jawa Anda dihitung sebagai ${tanggalPanjang(hj.iso)}.`;
  }
  return `Anda lahir pukul ${jamTitik(m.jam)}, sebelum magrib (dianggap pukul 18.00), jadi hari Jawa Anda sama dengan tanggal lahir.`;
}

export function bukaLaporan(root, ctx) {
  // Fokus ikut pindah ke judul laporan hanya bila judul sementara tadi memegang fokus (perpindahan halaman); pada muat langsung tidak.
  const mauFokus = document.activeElement === root.querySelector('h1[tabindex="-1"]');
  const masukan = masukanDariParam(paramDariAlamat(location));
  if (!masukan) {
    ctx.navigasi('/', { ganti: true });
    return;
  }
  let l;
  try {
    l = bangunLaporan(masukan);
  } catch {
    root.innerHTML = `<div class="halaman"><div class="kartu"><h1 class="judul-halaman" tabindex="-1">Laporan tidak dapat disusun</h1><p class="lead">Tanggal ini di luar rentang yang dapat dihitung.</p><p class="jarak-atas"><a class="btn btn-polos" href="/">Ubah data</a></p></div></div>`;
    return;
  }
  const dasar = paramDariMasukan(masukan).toString();
  const bagian = [masukan.jam ? jamTitik(masukan.jam) : null].filter(Boolean);
  const lahir = `Lahir ${tanggalTanpaHari(masukan.tanggal)}${bagian.length ? `, ${bagian.join(', ')}` : ''}`;
  const spekulatif = l.spekulatif
    ? `<div class="pita-catatan" role="note">${IKON.info(20)}<p>Tanggal ini sesudah 25 Agustus 2052, jadi tanggal Jawa di sini perkiraan dan belum ditetapkan oleh siapa pun.</p></div>`
    : '';
  root.innerHTML = `
  <section class="malam laporan-hero" aria-labelledby="judul-laporan">
    <div class="hero-teks">
      <div class="judul-hasil-baris"><span class="eyebrow">Laporan${masukan.nama ? ` ${esc(masukan.nama)}` : ''}</span><span class="chip-lahir">${esc(lahir)}</span></div>
      <h1 id="judul-laporan" class="judul-besar" tabindex="-1">${esc(l.weton.teks)}</h1>
      <p class="sub">neptu ${l.weton.neptu.total} (${l.weton.neptu.hari} + ${l.weton.neptu.pasaran}) &middot; wuku ${esc(l.weton.wuku)}</p>
      <p class="hasil-paragraf">${esc(kalimatMagrib(l))}</p>
      <div class="hasil-aksi">
        <button class="btn btn-hangat" type="button" data-aksi="bagikan">${IKON.tautan(18)} Bagikan tautan</button>
        <button class="btn btn-garis" type="button" data-aksi="cetak">Cetak</button>
        <a class="btn btn-garis" href="/#${esc(dasar)}">Ubah data</a>
      </div>
    </div>
    <dl class="ringkas">${l.ringkasan.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
  </section>
  ${spekulatif}
  <div class="laporan-tata">
    <nav class="isi-nav" aria-label="Isi laporan">${l.bagian.map(b => `<a href="#${esc(b.id)}" data-bagian="${esc(b.id)}">${esc(b.judul)}</a>`).join('')}</nav>
    <div class="laporan-isi">
      <section class="kartu" aria-labelledby="h-baca"><h2 id="h-baca">Cara membaca</h2>
        <p class="lead">${esc(l.catatan)} Lapisan tafsir bisa saling bertentangan; kitab memang berlapis. Tiap butir memuat sumber bab dan halaman cetak kitab.</p>
        <p class="lead jarak-sedang">Penilaian di setiap butir adalah klasifikasi situs ini agar mudah dibaca:
          ${tag('baik')} kitab menyebutnya baik, ${tag('waspada')} kitab menyebutnya kurang baik, ${tag('netral')} tidak condong ke salah satu. <a href="/istilah#penilaian">Selengkapnya</a></p></section>
      ${l.bagian.map(htmlBagian).join('')}
      <p class="penutup">Hitungan mengikuti kalender Jawa Sultan Agungan menurut Keraton Ngayogyakarta. Tafsir berasal dari kitab Betaljemur Adammakna yang ditulis ulang. <a href="/tentang">Cara menghitung dan sumbernya</a></p>
    </div>
  </div>`;
  if (mauFokus) root.querySelector('#judul-laporan').focus({ preventScroll: true });
  document.title = `${l.weton.teks}${masukan.nama ? `, ${masukan.nama}` : ''} · Primbon`;

  root.querySelectorAll('[data-aksi]').forEach(b =>
    b.addEventListener('click', async () => {
      if (b.dataset.aksi === 'cetak') return window.print();
      const url = location.href;
      try {
        if (navigator.share) await navigator.share({ title: 'Laporan primbon', url });
        else {
          await navigator.clipboard.writeText(url);
          ctx.toast('Tautan disalin.');
        }
      } catch (e) {
        if (e && e.name !== 'AbortError') ctx.toast('Tautan tidak dapat disalin otomatis. Salin dari bilah alamat.');
      }
    })
  );
  // Daftar isi: loncat ke bagian tanpa mengganti fragmen (fragmen berisi data lahir).
  root.querySelectorAll('[data-bagian]').forEach(a =>
    a.addEventListener('click', e => {
      e.preventDefault();
      const el = root.querySelector('#' + a.dataset.bagian);
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    })
  );
}
