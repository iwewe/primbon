/**
 * Bepergian: satu tanggal dan tujuan arah (opsional): arah, waktu berangkat, pindah kediaman, dan menghadap pejabat.
 * Hari atau arah tanpa catatan berarti kitab tidak menyebutnya, bukan berarti baik.
 */
import { esc, tanggalPanjang } from '../format.js';
import { validasiTanggal, masukanBepergianDariParam, paramDariBepergian, paramDariAlamat, ARAH_MATA_ANGIN } from '../masukan.js';
import { bangunBepergian } from '../alatLanjut.js';
import { IKON } from '../logo.js';
import { htmlBagian, htmlHeroAlat, htmlPeringatan, medanTanggal, galatTanggal, medanPilihan } from './komponen.js';

export function bukaBepergian(root, ctx) {
  const m = masukanBepergianDariParam(paramDariAlamat(location)) || { tanggal: ctx.sekarang().iso, tujuan: null };
  let r;
  try {
    r = bangunBepergian(m);
  } catch {
    root.innerHTML = `<div class="halaman"><div class="kartu"><h1 class="judul-halaman" tabindex="-1">Tinjauan tidak dapat disusun</h1><p class="lead">Tanggal ini di luar rentang yang dapat dihitung.</p><p class="jarak-atas"><a class="btn btn-polos" href="/bepergian">Kembali</a></p></div></div>`;
    return;
  }
  const opsi = [{ id: '', nama: 'Tidak memilih arah tujuan' }, ...ARAH_MATA_ANGIN.map(a => ({ id: a, nama: a }))];
  const spekulatif = r.spekulatif ? `<div class="pita-catatan" role="note">${IKON.info(20)}<p>Tanggal ini sesudah 25 Agustus 2052, jadi tanggal Jawanya perkiraan.</p></div>` : '';
  root.innerHTML = `${htmlHeroAlat({
    id: 'judul-bepergian',
    eyebrow: `Bepergian${m.tujuan ? ` &middot; ke ${esc(m.tujuan.toLowerCase())}` : ''}`,
    judul: r.weton,
    sub: `${esc(tanggalPanjang(m.tanggal))} &middot; ${esc(r.tanggalJawa)}`,
    paragraf: 'Arah yang dihindari atau dianjurkan, waktu berangkat, pindah kediaman, dan menghadap pejabat pada tanggal ini menurut kitab.'
  })}${spekulatif}
  <section class="panel-form panel-lebar" aria-label="Pilih tanggal dan tujuan">
    <form class="formulir" id="form-bepergian" novalidate>
      ${medanTanggal('bp', 'Tanggal berangkat', m.tanggal)}
      ${medanPilihan('bp-tujuan', 'Arah tujuan', opsi, m.tujuan || '', 'Arah mata angin dari tempat Anda berangkat.')}
      <div><button class="btn btn-utama btn-blok" type="submit">Tinjau tanggal</button></div>
    </form>
  </section>
  <div class="laporan-tata laporan-satu"><div class="laporan-isi">
    ${htmlPeringatan(r.catatan, IKON.info(20))}
    ${r.bagian.map(htmlBagian).join('')}
    <p class="penutup">Hitungan mengikuti kalender Jawa Sultan Agungan menurut Keraton Ngayogyakarta. <a href="/tentang">Cara menghitung dan sumbernya</a></p>
  </div></div>`;
  document.title = `${r.weton} · Bepergian · Primbon`;
  const q = s => root.querySelector(s);
  q('#form-bepergian').addEventListener('submit', e => {
    e.preventDefault();
    const tgl = validasiTanggal(q('#bp-tgl').value, q('#bp-bln').value, q('#bp-thn').value);
    galatTanggal(q, 'bp', tgl.ok ? '' : tgl.pesan, tgl.bidang || []);
    if (!tgl.ok) return q(`#bp-${tgl.bidang[0]}`).focus();
    ctx.navigasi('/bepergian#' + paramDariBepergian({ tanggal: tgl.iso, tujuan: q('#bp-tujuan').value || null }).toString());
  });
}
