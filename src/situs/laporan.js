/**
 * Model laporan Primbon: dari data lahir menjadi bagian-bagian tafsir yang siap ditampilkan.
 * Murni dan dapat diuji; tidak menyentuh DOM maupun jaringan. Isi tafsir berasal dari mesin pawukon (src/mesin),
 * yang menulis ulang kitab Betaljemur Adammakna. Yang SENGAJA tidak dibawa ke laporan:
 *  - ritual dan selamatan (mis. nama dan isi selamatan pasaran),
 *  - watak khusus perempuan menurut weton (bernorma zamannya dan menstigma),
 *  - penilaian dari penampilan atau ciri tubuh.
 * Tampilan (tata letak, warna, nuansa) milik lapisan situs; model ini hanya memberi struktur.
 */
import {
  weton, kalenderJawa, nomorHari, isoDariNomor, tafsirLahir, watakLanjut, rezeki, kesehatanLahir
} from '../mesin/index.js';
import { JAM_MAGRIB } from './masukan.js';

export const CATATAN_TRADISI =
  'Tafsir di laporan ini adalah tradisi kitab Betaljemur Adammakna yang ditulis ulang. Pakailah sebagai bahan renungan, bukan ramalan, kepastian, atau nasihat profesional.';

/** Halaman cetak kitab: [54,55,56] menjadi '54-56'; [60,73,74] menjadi '60, 73-74'. */
function ringkasHalaman(h) {
  const a = [...new Set(h)].sort((x, y) => x - y);
  const out = [];
  for (let i = 0; i < a.length; ) {
    let j = i;
    while (j + 1 < a.length && a[j + 1] === a[j] + 1) j++;
    out.push(j > i ? `${a[i]}-${a[j]}` : String(a[i]));
    i = j + 1;
  }
  return out.join(', ');
}

/** Sumber kitab: 'Bab 97, hlm. 54', 'Bab 97 dan 109, hlm. 60, 73-74'. Menerima satu sumber atau daftar sumber. */
export function sumberTeks(s) {
  if (Array.isArray(s)) {
    const ada = s.map(sumberTeks).filter(Boolean);
    return ada.join('; ');
  }
  if (!s || !s.bab) return '';
  const bab = Array.isArray(s.bab) ? s.bab.join(' dan ') : s.bab;
  const h = Array.isArray(s.halaman) ? s.halaman : [];
  return `Bab ${bab}${h.length ? `, hlm. ${ringkasHalaman(h)}` : ''}`;
}

/** Sumber dari daftar `sumber` tafsirLahir menurut kata kunci topik. */
const sumberTopik = (t, kata) => (t.sumber || []).find(x => x.topik && x.topik.includes(kata)) ?? null;

const ARAH = { baik: 'baik', buruk: 'waspada', netral: 'netral' };
const arah = a => ARAH[a] ?? null;

/** Butir tafsir: judul, teks, penilaian arah (baik, waspada, netral), sumber, catatan. */
const tafsir = (judul, teks, { a = null, sumber = null, catatan = null } = {}) =>
  teks ? { jenis: 'tafsir', judul, teks, arah: arah(a), sumber: sumberTeks(sumber), catatan } : null;
/** Butir fakta: pasangan label dan nilai (nilai kosong dilewati). */
const fakta = (judul, baris, sumber = null) => {
  const ada = baris.filter(([, v]) => v !== null && v !== undefined && v !== '' && !(Array.isArray(v) && !v.length));
  return ada.length ? { jenis: 'fakta', judul, baris: ada.map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : String(v)]), sumber: sumberTeks(sumber) } : null;
};
const daftar = (judul, item, sumber = null, catatan = null) =>
  item.length ? { jenis: 'daftar', judul, item, sumber: sumberTeks(sumber), catatan } : null;
const bersih = arr => arr.filter(Boolean);

/* ------------------------------------------------------------------ hari Jawa */

/**
 * Hari Jawa berganti saat magrib. Tanpa tempat lahir, magrib dianggap pukul 18.00: lahir pada pukul itu atau sesudahnya
 * dihitung sebagai hari Jawa berikutnya. Tanpa jam lahir, tanggal sipil dipakai apa adanya.
 */
export function hariJawaDari({ tanggal, jam }) {
  const mulaiSesudahMagrib = jam ? Number(jam.slice(0, 2)) + Number(jam.slice(3)) / 60 >= JAM_MAGRIB : false;
  const iso = mulaiSesudahMagrib ? isoDariNomor(nomorHari(tanggal) + 1) : tanggal;
  return { sipil: tanggal, iso, sesudahMagrib: mulaiSesudahMagrib, jamDiketahui: Boolean(jam) };
}

/* ------------------------------------------------------------------ bagian-bagian */

function bagianWatak(t) {
  const w = t.watak;
  const hari = w.hari;
  const pas = w.pasaran;
  const wk = w.wuku;
  return {
    id: 'watak',
    judul: 'Watak kelahiran',
    pengantar: 'Lima lapis watak menurut kitab: hari, pasaran, weton, hitungan sisa tujuh, dan wuku. Lapisan-lapisan ini boleh saling berbeda; kitab memang menyusunnya berlapis.',
    butir: bersih([
      tafsir(`Hari ${t.hari}`, hari.watak, { sumber: sumberTopik(t, 'menurut hari') }),
      fakta(`Unsur hari ${t.hari}`, [['Unsur', hari.unsur]]),
      tafsir(`Pasaran ${t.pasaran}`, pas.watak, { sumber: sumberTopik(t, 'menurut pasaran'), catatan: pas.arti ? `Kitab menyebutnya: ${pas.arti.toLowerCase()}.` : null }),
      fakta(`Lambang pasaran ${t.pasaran}`, [['Sebutan', pas.sebutan], ['Hewan lambang', pas.hewan]]),
      tafsir(`Weton ${t.weton}`, w.weton?.umum, { sumber: sumberTopik(t, 'menurut weton') }),
      tafsir(`Hitungan sisa tujuh: ${w.sisa7?.nama ?? ''}`.replace(/: $/, ''), w.sisa7?.makna, { sumber: sumberTopik(t, 'sisa 7') }),
      tafsir(`Wuku ${wk.nama}`, wk.watak, { sumber: sumberTopik(t, 'menurut wuku') }),
      fakta(`Lambang wuku ${wk.nama}`, [['Nomor wuku', `ke-${wk.nomor} dari 30`], ['Dewa', wk.dewa], ['Pohon', wk.kayu], ['Burung', wk.burung], ['Arah kala', wk.kala]]),
      wk.celaka ? tafsir(`Yang diwaspadai pada wuku ${wk.nama}`, `Kitab menyebut kemalangan: ${String(wk.celaka).toLowerCase()}.`, { a: 'buruk', sumber: sumberTopik(t, 'menurut wuku') }) : null
    ])
  };
}

const LAMBANG = [['warna', 'Warna'], ['letak', 'Arah letak'], ['kota', 'Kota lambang'], ['air', 'Air'], ['kayu', 'Pohon'], ['burung', 'Burung'], ['huruf', 'Huruf'], ['pelindung', 'Pelindung']];

function bagianLambang(t) {
  const k = t.kedudukan;
  if (!k) return null;
  const baris = LAMBANG.map(([kunci, label]) => [label, k.hari?.[kunci] ?? '', k.pasaran?.[kunci] ?? '']).filter(b => b[1] || b[2]);
  return {
    id: 'lambang',
    judul: 'Lambang dan kedudukan',
    pengantar: 'Setiap hari dan pasaran punya lambang dalam kitab. Ini daftar rujukan, bukan penilaian.',
    butir: [{ jenis: 'tabel', judul: 'Lambang hari dan pasaran', kolom: ['', `Hari ${t.hari}`, `Pasaran ${t.pasaran}`], baris, sumber: sumberTeks(sumberTopik(t, 'kedudukan')) }]
  };
}

function bagianTanggal(wl) {
  const tg = wl.tanggal;
  const bl = wl.bulan;
  const mg = wl.mangsa;
  const j = tg.tanggalJawa;
  const b108 = tg.bab108 || {};
  const kegiatan = (b108.kegiatan || []).map(x => ({ teks: `${x.untuk[0].toUpperCase()}${x.untuk.slice(1)}${x.catatan ? ` (${x.catatan})` : ''}`, arah: x.nilai === 'baik' ? 'baik' : x.nilai === 'buruk' ? 'waspada' : 'netral' }));
  return {
    id: 'tanggal',
    judul: 'Tanggal, bulan, dan mangsa',
    pengantar: `Berdasarkan tanggal Jawa ${j.dina} ${j.wulan} ${j.tahun} AJ. Bagian ini bergantung pada kalender Jawa, jadi bisa bergeser sehari bila hari lahir dihitung lain.`,
    butir: bersih([
      tafsir(`Tanggal ${j.dina}`, tg.bab101?.makna, { a: tg.bab101?.arah, sumber: tg.bab101?.sumber }),
      b108.hewan ? fakta(`Hari binatang tanggal ${j.dina}`, [['Hewan', b108.hewan], ['Mutu', b108.mutu], ['Watak anak', b108.anak?.makna]], b108.sumber) : null,
      daftar(`Nilai tanggal ${j.dina} untuk berbagai urusan`, kegiatan, b108.sumber, b108.catatan),
      tafsir(`Bulan ${bl.bulan}`, bl.bab102?.makna, { a: bl.bab102?.arah, sumber: bl.bab102?.sumber }),
      tafsir(`Nasib bulan ${bl.bulan}`, bl.bab111?.makna, { a: bl.bab111?.arah, sumber: bl.bab111?.sumber }),
      tafsir(`Mangsa ${mg.mangsa}`, mg.makna, { a: mg.arah, sumber: mg.sumber, catatan: 'Tanggal mangsa tidak ada di kitab; dipakai kalender pranata mangsa baku.' })
    ])
  };
}

function bagianNeptu(wl, neptu) {
  const n = wl.neptu;
  const p = n.bab117 || {};
  return {
    id: 'neptu',
    judul: `Neptu ${neptu}`,
    pengantar: 'Jumlah nilai hari dan pasaran, dibaca dengan beberapa cara dalam kitab.',
    butir: bersih([
      tafsir(`Neptu ${neptu}: ${n.bab105?.nama ?? ''}`.replace(/: $/, ''), n.bab105?.makna, { a: n.bab105?.arah, sumber: n.bab105?.sumber }),
      tafsir(`Sisa ${n.bab106?.sisa} (neptu dibagi 9): ${n.bab106?.nama ?? ''}`, n.bab106?.makna, { a: n.bab106?.arah, sumber: n.bab106?.sumber }),
      tafsir(`Sisa ${n.bab107?.sisa} (neptu dibagi 8): ${n.bab107?.nama ?? ''}`, n.bab107?.makna, { a: n.bab107?.arah, sumber: n.bab107?.sumber }),
      n.bab116 ? tafsir(`Hitungan nabi: ${n.bab116.nabi}`, n.bab116.makna, { a: n.bab116.arah, sumber: n.bab116.sumber }) : null,
      p.nama ? tafsir(`Perbintangan: ${p.nama}`, p.sifat, { sumber: p.sumber, catatan: p.peringatan }) : null,
      p.nama ? fakta(`Perbintangan ${p.nama}`, [['Sekutu', p.sekutu], ['Musuh', p.musuh], ['Hari dan bulan jaya', p.jaya], ['Hari dan bulan malang', p.malang]], p.sumber) : null
    ])
  };
}

function bagianNama(wl, nama) {
  const n = wl.nama;
  if (!nama || !n) return null;
  const bb = wl.baikBurukNama;
  return {
    id: 'nama',
    judul: `Nama ${nama}`,
    pengantar: 'Menurut huruf depan dan belakang nama yang dialihkan ke aksara hanacaraka. Alih huruf ini perkiraan.',
    butir: bersih([
      tafsir(`Huruf nama: ${n.nama}`, n.makna, { a: n.arah, sumber: n.sumber }),
      fakta('Hitungan huruf', [['Huruf depan', n.depan], ['Huruf belakang', n.belakang], ['Jumlah', n.jumlah]]),
      bb?.komponen?.length
        ? daftar('Komponen nama yang dikenali kitab', bb.komponen.map(x => ({ teks: `${x.nama} (tingkat ${x.tingkat})`, arah: x.tingkat === 'baik' ? 'baik' : x.tingkat === 'buruk' ? 'waspada' : 'netral' })), bb.sumber, bb.asumsi)
        : null,
      bb?.aturan?.length ? daftar('Pertimbangan nama', bb.aturan.map(teks => ({ teks, arah: null })), bb.sumber, bb.catatanKitab) : null
    ])
  };
}

function bagianRezeki(r) {
  const wj = r.wiji;
  const nf = r.nafkah;
  const ar = r.arah;
  const ab = r.arahBerhasil;
  return {
    id: 'rezeki',
    judul: 'Rezeki dan arah',
    pengantar: 'Mata pencaharian, wiji, dan arah menurut kitab.',
    butir: bersih([
      tafsir('Mata pencaharian menurut hari', r.mataPencaharian?.hari, { sumber: r.mataPencaharian?.sumber }),
      wj ? tafsir(`Wiji: ${wj.sebutan}`, wj.pekerjaan, { sumber: wj.sumber }) : null,
      wj ? fakta('Lambang wiji', [['Jumlah neptu tiga pekan berturut-turut', wj.jumlah], ['Sisa dibagi 5', wj.sisa], ['Arah', wj.arah], ['Dewa', wj.dewa], ['Kota', wj.kota], ['Burung', wj.burung], ['Pohon', wj.kayu]], wj.sumber) : null,
      nf ? tafsir(`Nafkah: ${nf.kategori}`, nf.anjuran, { sumber: nf.sumber, catatan: nf.hariSri ? 'Hari lahir jatuh pada Sri.' : null }) : null,
      ar ? fakta('Arah menurut kitab', [['Sri', ar.sri], ['Sadana', ar.sadana], ['Siksa', ar.siksa], ['Lara', ar.lara], ['Pati', ar.pati]], ar.sumber) : null,
      ar ? tafsir('Memakai arah', ar.anjuran, { sumber: ar.sumber }) : null,
      ab?.arah?.length ? fakta('Arah yang membawa hasil', [['Arah', ab.arah], ['Keterangan', ab.keterangan]], ab.sumber) : null
    ])
  };
}

function bagianKesehatan(k) {
  const tb = k.tubuhRawan;
  const sk = k.sakitMenurutPasaran;
  return {
    id: 'kesehatan',
    judul: 'Kesehatan menurut kitab',
    pengantar: k.peringatan,
    peringatan: k.peringatan,
    butir: bersih([
      tb ? fakta('Bagian tubuh yang dianggap rawan', [['Bagian tubuh', tb.rawan], ['Dewa', tb.dewa], ['Nabi', tb.nabi]]) : null,
      sk?.sakit ? fakta('Sakit menurut pasaran', [['Nama sakit', sk.sakit]]) : null
    ])
  };
}

/* ------------------------------------------------------------------ pintu masuk */

/**
 * @param {{tanggal: string, jam: string|null, nama: string}} masukan tanggal sipil 'YYYY-MM-DD'
 */
export function bangunLaporan(masukan) {
  const hj = hariJawaDari(masukan);
  const iso = hj.iso;
  const w = weton(iso);
  const kal = kalenderJawa(iso);
  const t = tafsirLahir(iso);
  const wl = watakLanjut(iso, masukan.nama ? { nama: masukan.nama } : {});
  const r = rezeki(iso);
  const k = kesehatanLahir(iso);
  const bagian = bersih([
    bagianWatak(t),
    bagianLambang(t),
    bagianTanggal(wl),
    bagianNeptu(wl, w.neptu.total),
    bagianNama(wl, masukan.nama),
    bagianRezeki(r),
    bagianKesehatan(k)
  ]);
  return {
    masukan,
    hariJawa: hj,
    weton: { teks: w.weton, hari: w.hari, pasaran: w.pasaran, neptu: w.neptu, wuku: w.wuku, nomorWuku: w.nomorWuku },
    tanggalJawa: kal.tanggal,
    spekulatif: Boolean(kal.spekulatif),
    ringkasan: [
      ['Weton', w.weton],
      ['Neptu', `${w.neptu.total} (${w.neptu.hari} + ${w.neptu.pasaran})`],
      ['Wuku', `${w.wuku}, ke-${w.nomorWuku} dari 30`],
      ['Tanggal Jawa', `${kal.tanggal.dina} ${kal.tanggal.wulan} ${kal.tanggal.tahun} AJ`],
      ['Tahun', `${kal.tanggal.taun}, windu ${kal.tanggal.windu}`]
    ],
    bagian,
    catatan: CATATAN_TRADISI
  };
}
