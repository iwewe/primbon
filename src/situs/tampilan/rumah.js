/**
 * Rumah: enam pemeriksaan menurut kitab: arah hadap menurut weton pemilik, hari mulai membangun, hitungan ukuran,
 * letak sumur, pintu halaman, dan bentuk lahan. Isian berubah menurut pemeriksaan yang dipilih.
 */
import { esc, jamTitik } from '../format.js';
import {
  validasiTanggal, bacaJam, masukanRumahDariParam, paramDariRumah, paramDariAlamat, MODE_RUMAH,
  ARAH_MATA_ANGIN, SISI_RUMAH, METODE_PINTU
} from '../masukan.js';
import { bangunRumah, JENIS_UKURAN, MODE_RUMAH_NAMA } from '../alatLanjut.js';
import { IKON } from '../logo.js';
import { htmlBagian, htmlHeroAlat, htmlPeringatan, medanTanggal, galatTanggal, medanJam, galatJam, medanPilihan, medanAngka, galatMedan } from './komponen.js';

const pilihan = arr => arr.map(a => ({ id: a, nama: a }));
const NAMA_METODE = { 194: 'Sisi dibagi 5 bagian (bab 194)', 195: 'Sisi dibagi 9 bagian (bab 195)', 196: 'Sisi dibagi 9 bagian, cara lain (bab 196)' };

/** Isian khusus menurut mode. `n` = nilai dari alamat (boleh kosong). */
function isianMode(k, n, hariIni) {
  if (k === 'arah') {
    return `${medanTanggal('r', 'Tanggal lahir pemilik rumah', n.tanggal || '')}${medanJam('r-jam', n.jam ? jamTitik(n.jam) : '', { petunjuk: 'Hari Jawa berganti saat magrib. Lahir pukul 18.00 atau sesudahnya dihitung dari hari berikutnya.' })}`;
  }
  if (k === 'hari') return medanTanggal('r', 'Tanggal mulai membangun', n.tanggal || hariIni);
  if (k === 'ukuran') {
    const satuan = (JENIS_UKURAN.find(j => j.id === (n.jenis || 'usukAkhir')) || JENIS_UKURAN[0]).satuan;
    return `${medanPilihan('r-jenis', 'Yang dihitung', JENIS_UKURAN.map(j => ({ id: j.id, nama: j.nama })), n.jenis || 'usukAkhir')}${medanAngka('r-jumlah', `Jumlah (${satuan})`, n.jumlah ?? '', { inputmode: 'numeric', petunjuk: 'Bilangan bulat positif. Hitungan berputar menurut banyaknya nama.' })}`;
  }
  if (k === 'sumur') {
    return `${medanPilihan('r-hadap', 'Rumah menghadap', pilihan(SISI_RUMAH), n.menghadap || 'Utara')}${medanPilihan('r-sumur', 'Sumur berada di arah (dari tengah rumah)', pilihan(ARAH_MATA_ANGIN), n.sumurDi || 'Barat Daya')}`;
  }
  if (k === 'pintu') {
    return `${medanPilihan('r-metode', 'Cara hitung', METODE_PINTU.map(m => ({ id: m, nama: NAMA_METODE[m] })), n.metode || 194)}
      ${medanPilihan('r-hadap', 'Sisi halaman yang diperiksa', pilihan(SISI_RUMAH), n.menghadap || 'Utara')}
      ${medanAngka('r-panjang', 'Panjang sisi halaman', n.panjang ?? '', { petunjuk: 'Satuan bebas (meter, depa, langkah), asal sama dengan posisi pintu.' })}
      ${medanAngka('r-posisi', 'Posisi pintu dari sudut awal hitungan', n.posisi ?? '', { petunjuk: 'Sudut awal hitungan ditunjukkan pada hasil. Isi 0 sampai sepanjang sisi.' })}`;
  }
  return '<p class="lead">Daftar bentuk lahan tidak memerlukan isian.</p>';
}

export function bukaRumah(root, ctx) {
  const alamat = paramDariAlamat(location);
  const kAlamat = alamat.get('k');
  const k = MODE_RUMAH.includes(kAlamat) ? kAlamat : 'arah';
  const hariIni = ctx.sekarang().iso;
  let m = masukanRumahDariParam(alamat);
  if (!m && k === 'hari') m = alamat.get('d') ? null : { k: 'hari', tanggal: hariIni };
  let r = null;
  if (m) {
    try {
      r = bangunRumah(m);
    } catch {
      m = null;
    }
  }
  const nilai = m || {};
  const hero = r
    ? htmlHeroAlat({ id: 'judul-rumah', eyebrow: `Rumah &middot; ${esc(MODE_RUMAH_NAMA[k])}`, judul: r.hero.judul, sub: esc(r.hero.sub), paragraf: '' })
    : htmlHeroAlat({ id: 'judul-rumah', eyebrow: 'Rumah', judul: MODE_RUMAH_NAMA[k], paragraf: 'Pemeriksaan arah hadap, hari mulai membangun, ukuran, sumur, pintu halaman, dan lahan menurut kitab Betaljemur Adammakna.' });
  const tombol = k === 'lahan' ? '' : `<div><button class="btn btn-utama btn-blok" type="submit">${k === 'hari' ? 'Tinjau hari' : 'Hitung'}</button></div>`;
  root.innerHTML = `${hero}
  <section class="panel-form panel-lebar" aria-label="Pilih pemeriksaan dan isi data">
    <form class="formulir" id="form-rumah" novalidate>
      ${medanPilihan('r-k', 'Yang diperiksa', MODE_RUMAH.map(id => ({ id, nama: MODE_RUMAH_NAMA[id] })), k)}
      ${isianMode(k, nilai, hariIni)}
      ${tombol}
    </form>
  </section>
  <div class="laporan-tata laporan-satu"><div class="laporan-isi">
    ${htmlPeringatan(r ? r.catatan : 'Tafsir tradisional kitab Betaljemur Adammakna. Bukan pengganti perencanaan teknik dan keselamatan bangunan.', IKON.info(20))}
    ${r ? r.bagian.map(htmlBagian).join('') : ''}
    <p class="penutup">Hitungan mengikuti kalender Jawa Sultan Agungan menurut Keraton Ngayogyakarta. <a href="/tentang">Cara menghitung dan sumbernya</a></p>
  </div></div>`;
  document.title = `${MODE_RUMAH_NAMA[k]} · Rumah · Primbon`;

  const q = s => root.querySelector(s);
  // Mengganti pemeriksaan memuat ulang isian sesuai pemeriksaan itu.
  q('#r-k').addEventListener('change', e => {
    ctx.navigasi('/rumah#' + new URLSearchParams({ k: e.target.value }).toString());
    document.getElementById('r-k')?.focus();
  });
  if (k === 'ukuran') {
    q('#r-jenis').addEventListener('change', e => {
      const satuan = JENIS_UKURAN.find(j => j.id === e.target.value).satuan;
      q('label[for="r-jumlah"]').textContent = `Jumlah (${satuan})`;
    });
  }
  q('#form-rumah').addEventListener('submit', e => {
    e.preventDefault();
    const kirim = obj => ctx.navigasi('/rumah#' + paramDariRumah(obj).toString());
    if (k === 'lahan') return kirim({ k });
    if (k === 'arah' || k === 'hari') {
      const tgl = validasiTanggal(q('#r-tgl').value, q('#r-bln').value, q('#r-thn').value);
      galatTanggal(q, 'r', tgl.ok ? '' : tgl.pesan, tgl.bidang || []);
      let jam = { ok: true, jam: null };
      if (k === 'arah') {
        jam = bacaJam(q('#r-jam').value);
        galatJam(q, 'r-jam', jam.ok ? '' : jam.pesan);
      }
      if (!tgl.ok) return q(`#r-${tgl.bidang[0]}`).focus();
      if (!jam.ok) return q('#r-jam').focus();
      return kirim({ k, tanggal: tgl.iso, jam: jam.jam });
    }
    if (k === 'ukuran') {
      const teks = q('#r-jumlah').value.trim();
      const n = Number(teks);
      if (!/^\d+$/.test(teks) || n < 1 || n > 99999) {
        galatMedan(q, 'r-jumlah', 'Isi bilangan bulat positif, misalnya 37.');
        return q('#r-jumlah').focus();
      }
      galatMedan(q, 'r-jumlah', '');
      return kirim({ k, jenis: q('#r-jenis').value, jumlah: n });
    }
    if (k === 'sumur') return kirim({ k, menghadap: q('#r-hadap').value, sumurDi: q('#r-sumur').value });
    // pintu
    const angka = id => Number(q(id).value.trim().replace(',', '.'));
    const panjang = angka('#r-panjang');
    const posisi = angka('#r-posisi');
    const okPanjang = q('#r-panjang').value.trim() !== '' && Number.isFinite(panjang) && panjang > 0;
    galatMedan(q, 'r-panjang', okPanjang ? '' : 'Isi panjang sisi dengan angka lebih dari nol.');
    const okPosisi = q('#r-posisi').value.trim() !== '' && Number.isFinite(posisi) && posisi >= 0 && posisi <= panjang;
    galatMedan(q, 'r-posisi', okPosisi || !okPanjang ? '' : 'Posisi harus di antara 0 dan panjang sisi.');
    if (!okPanjang) return q('#r-panjang').focus();
    if (!okPosisi) return q('#r-posisi').focus();
    return kirim({ k, metode: Number(q('#r-metode').value), menghadap: q('#r-hadap').value, panjang, posisi });
  });
}
