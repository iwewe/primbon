/**
 * Komponen tampilan bersama (HTML string) untuk halaman tafsir: butir, bagian, ringkasan arah, dan isian tanggal.
 * Semua nilai di-escape. Tata letak dan gaya ada di css/situs.css; berkas ini hanya menyusun markup.
 */
import { esc, BULAN } from '../format.js';

const TAG = { baik: 'Baik', waspada: 'Waspada', netral: 'Netral' };
export const tag = a => (a && TAG[a] ? `<span class="tag tag-${a}">${TAG[a]}</span>` : '');

const sel = c => (c && typeof c === 'object' ? `${esc(c.teks)} ${tag(c.arah)}` : esc(c));

export function htmlButir(b) {
  const meta = [b.sumber ? `Sumber: ${esc(b.sumber)}` : '', b.catatan ? esc(b.catatan) : ''].filter(Boolean).join(' &middot; ');
  const metaHtml = meta ? `<p class="meta">${meta}</p>` : '';
  if (b.jenis === 'tafsir') return `<article class="butir"><h3>${esc(b.judul)} ${tag(b.arah)}</h3><p>${esc(b.teks)}</p>${metaHtml}</article>`;
  if (b.jenis === 'fakta') {
    return `<article class="butir"><h3>${esc(b.judul)}</h3><dl class="rincian">${b.baris.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>${metaHtml}</article>`;
  }
  if (b.jenis === 'daftar') {
    return `<article class="butir"><h3>${esc(b.judul)}</h3><ul class="daftar-item">${b.item.map(i => `<li><span>${esc(i.teks)}</span>${tag(i.arah)}</li>`).join('')}</ul>${metaHtml}</article>`;
  }
  if (b.jenis === 'tabel') {
    const kepala = b.kolom.map(k => `<th scope="col">${esc(k)}</th>`).join('');
    const isi = b.baris
      .map((r, n) => {
        const kini = Boolean(b.tanda && b.tanda[n]);
        const kelas = kini ? ' class="kini" aria-current="true"' : '';
        return `<tr${kelas}><th scope="row">${esc(typeof r[0] === 'object' ? r[0].teks : r[0])}${kini ? ' <span class="penanda-kini">jam Anda</span>' : ''}</th>${r.slice(1).map((c, i) => `<td data-label="${esc(b.kolom[i + 1])}">${sel(c)}</td>`).join('')}</tr>`;
      })
      .join('');
    return `<article class="butir"><h3>${esc(b.judul)}</h3><table class="tabel-lambang tabel-bertumpuk"><caption class="sr">${esc(b.judul)}</caption><thead><tr>${kepala}</tr></thead><tbody>${isi}</tbody></table>${metaHtml}</article>`;
  }
  return '';
}

/** Hitungan arah, mis. '1 baik, 2 waspada'. Kosong bila semuanya nol. */
export function htmlRingkasanArah(r) {
  if (!r) return '';
  const bagian = [['baik', r.baik], ['waspada', r.waspada ?? r.buruk], ['netral', r.netral]].filter(([, n]) => n > 0);
  return bagian.length ? `<p class="hitung-arah" aria-label="Ringkasan penilaian">${bagian.map(([a, n]) => `<span class="tag tag-${a}">${n} ${a}</span>`).join(' ')}</p>` : '';
}

export function htmlBagian(s) {
  return `<section class="kartu bagian" id="${esc(s.id)}" aria-labelledby="h-${esc(s.id)}">
    <h2 id="h-${esc(s.id)}">${esc(s.judul)}</h2>
    ${s.pengantar ? `<p class="lead">${esc(s.pengantar)}</p>` : ''}
    ${htmlRingkasanArah(s.ringkasan)}
    <div class="butir-daftar">${s.butir.map(htmlButir).join('')}</div>
  </section>`;
}

/* ---------------------------------------------------------------- isian tanggal dan jam */

export function opsiBulan(terpilih) {
  return `<option value="">Pilih</option>` + BULAN.map((b, n) => `<option value="${n + 1}"${Number(terpilih) === n + 1 ? ' selected' : ''}>${b}</option>`).join('');
}

/** Tiga isian tanggal dengan id `${id}-tgl`, `${id}-bln`, `${id}-thn` dan pesan galat `#g-${id}`. */
export function medanTanggal(id, judul, iso) {
  const [y, m, d] = iso ? iso.split('-').map(Number) : ['', '', ''];
  return `<fieldset class="medan" aria-describedby="g-${id}"><legend class="label label-legend">${esc(judul)}</legend>
    <div class="baris-tanggal">
      <div class="medan"><label for="${id}-tgl">Tanggal</label><input class="isian" id="${id}-tgl" inputmode="numeric" maxlength="2" autocomplete="off" value="${esc(d)}"></div>
      <div class="medan"><label for="${id}-bln">Bulan</label><select class="isian" id="${id}-bln">${opsiBulan(m)}</select></div>
      <div class="medan"><label for="${id}-thn">Tahun</label><input class="isian" id="${id}-thn" inputmode="numeric" maxlength="4" autocomplete="off" value="${esc(y)}"></div>
    </div>
    <div class="galat" id="g-${id}" role="alert" hidden></div>
  </fieldset>`;
}

/** Tampilkan atau sembunyikan galat suatu medan tanggal dan tandai isiannya. */
export function galatTanggal(q, id, pesan, bidang = []) {
  const el = q(`#g-${id}`);
  el.hidden = !pesan;
  el.textContent = pesan || '';
  for (const b of ['tgl', 'bln', 'thn']) q(`#${id}-${b}`).setAttribute('aria-invalid', pesan && bidang.includes(b) ? 'true' : 'false');
}

export function medanJam(id, nilai, { label = 'Jam lahir', petunjuk = '' } = {}) {
  return `<div class="medan"><label for="${id}">${esc(label)} <small>(opsional)</small></label>
    <input class="isian" id="${id}" inputmode="decimal" autocomplete="off" placeholder="00.00" maxlength="5" value="${esc(nilai || '')}">
    <div class="galat" id="g-${id}" role="alert" hidden></div>${petunjuk ? `<p class="petunjuk">${esc(petunjuk)}</p>` : ''}</div>`;
}

export function galatJam(q, id, pesan) {
  const el = q(`#g-${id}`);
  el.hidden = !pesan;
  el.textContent = pesan || '';
  q(`#${id}`).setAttribute('aria-invalid', pesan ? 'true' : 'false');
}

/** Pita malam di atas halaman alat: eyebrow, judul besar, subjudul, paragraf, dan tombol. */
export function htmlHeroAlat({ id, eyebrow, judul, sub = '', paragraf = '', aksi = '', samping = '' }) {
  return `<section class="malam laporan-hero" aria-labelledby="${id}">
    <div class="hero-teks">
      <div class="judul-hasil-baris"><span class="eyebrow">${eyebrow}</span></div>
      <h1 id="${id}" class="judul-besar" tabindex="-1">${esc(judul)}</h1>
      ${sub ? `<p class="sub">${sub}</p>` : ''}
      ${paragraf ? `<p class="hasil-paragraf">${paragraf}</p>` : ''}
      ${aksi ? `<div class="hasil-aksi">${aksi}</div>` : ''}
    </div>
    ${samping}
  </section>`;
}
