/**
 * Model tiga alat Primbon rilis 2: Jodoh, Hari baik, dan Jam. Murni (tanpa DOM dan jaringan); memakai mesin pawukon
 * dan pembangun butir bersama (butir.js). Semua hasil adalah tafsir tradisional, bukan ramalan dan bukan nasihat.
 * Yang SENGAJA tidak dibawa: ritual dan penentuan nasib pernikahan sebagai vonis. Hasil bernada buruk ditampilkan
 * sebagai "waspada" dengan catatan bahwa keputusan tetap milik pengguna.
 */
import {
  weton, kalenderJawa, nomorHari, isoDariNomor, jodoh, jodohNama, jodohWeton, tinjauHari,
  saatAgung, saat12, jamSialBaik, saatMalaikat, saatPerkara, saatNikah, suhara, akadTigaJenis, saatAgungDi, saat12Di, saatBintang
} from '../mesin/index.js';
import { hariJawaDari } from './laporan.js';
import { TANGGAL_AWAL, TANGGAL_AKHIR } from './masukan.js';
import { tafsir, fakta, daftar, tabel, bersih, arah, jamTeks, rentangJam, rentangDariJam } from './butir.js';

export const CATATAN_JODOH =
  'Hasil bernada buruk adalah kata kitab, bukan kepastian dan bukan larangan. Keputusan tentang hubungan sepenuhnya milik Anda berdua; bila perlu, bicarakan dengan orang yang Anda percaya.';
export const CATATAN_HARI = 'Tafsir tradisional kitab Betaljemur Adammakna. Hari tanpa catatan berarti kitab tidak menyebutnya, bukan berarti hari itu baik.';
export const CATATAN_JAM = 'Tafsir tradisional kitab Betaljemur Adammakna; bukan ramalan dan bukan nasihat profesional.';

export const KEPERLUAN = [
  { id: 'semua', nama: 'Semua keperluan' },
  { id: 'umum', nama: 'Keperluan umum' },
  { id: 'nikah', nama: 'Pernikahan' },
  { id: 'bepergian', nama: 'Bepergian' }
];
const NAMA_KEPERLUAN = Object.fromEntries(KEPERLUAN.map(k => [k.id, k.nama]));

const hitungArah = temuan => {
  const r = { baik: 0, waspada: 0, netral: 0 };
  for (const t of temuan) r[arah(t.arah) ?? 'netral']++;
  return r;
};
/** Ringkasan mesin (baik, buruk, netral) menjadi istilah situs (baik, waspada, netral). */
const ringkasArah = r => ({ baik: r?.baik ?? 0, waspada: r?.buruk ?? 0, netral: r?.netral ?? 0 });

/* ------------------------------------------------------------------ Jodoh */

function orang(peran, m) {
  const hj = hariJawaDari(m);
  const w = weton(hj.iso);
  return { peran, nama: m.nama || '', tanggal: m.tanggal, jam: m.jam, hariJawa: hj, iso: hj.iso, weton: w.weton, neptu: w.neptu.total };
}

/**
 * @param {{tanggal, jam, nama}} pria pihak pertama (dihitung sebagai pria/suami dalam kitab)
 * @param {{tanggal, jam, nama}} wanita pihak kedua (dihitung sebagai wanita/istri dalam kitab)
 */
export function bangunJodoh(pria, wanita) {
  const a = orang('Pihak pria', pria);
  const b = orang('Pihak wanita', wanita);
  const j = jodoh(a.iso, b.iso);
  const w = jodohWeton(a.iso, b.iso);
  const dasar = j.metode;
  const m = w.metode;
  const bagian = [
    {
      id: 'dasar',
      judul: 'Hitungan dasar',
      pengantar: 'Tiga hitungan dari weton kedua belah pihak: sisa sembilan, sisa empat, dan pasangan hari.',
      ringkasan: ringkasArah(j.ringkasan),
      butir: bersih([
        tafsir(`Sisa sembilan: ${dasar.sisa9.sisaA} dan ${dasar.sisa9.sisaB}`, dasar.sisa9.makna, { a: dasar.sisa9.arah, sumber: dasar.sisa9.sumber }),
        tafsir(`Sisa empat: jumlah neptu ${dasar.sisa4.jumlah}, sisa ${dasar.sisa4.sisa} (${dasar.sisa4.nama})`, dasar.sisa4.makna, { a: dasar.sisa4.arah, sumber: dasar.sisa4.sumber }),
        tafsir(`Pasangan hari: ${dasar.hari.kunci.replace('&', ' dan ')}`, dasar.hari.makna, { a: dasar.hari.arah, sumber: dasar.hari.sumber }),
        fakta('Istilah yang muncul', Object.entries(j.istilah || {}))
      ])
    },
    {
      id: 'weton',
      judul: 'Neptu weton dan tanggal Jawa',
      pengantar: 'Hitungan dari jumlah neptu weton, lalu dari neptu tanggal, bulan, dan tahun Jawa kelahiran. Bagian tanggal Jawa bisa bergeser sehari.',
      ringkasan: ringkasArah(w.ringkasan),
      butir: bersih([
        tafsir(`Jumlah neptu ${m.bab22.jumlah}, dibagi ${m.bab22.pembagi}: ${m.bab22.nama}`, m.bab22.makna, { a: m.bab22.arah, sumber: m.bab22.sumber }),
        tafsir(`Jumlah neptu ${m.bab23.jumlah}, sisa ${m.bab23.sisa}: ${m.bab23.nama}`, m.bab23.makna ?? `Kitab menamainya ${m.bab23.nama}.`, { a: m.bab23.arah, sumber: m.bab23.sumber }),
        tafsir(`Neptu tanggal, bulan, dan tahun Jawa ${m.bab24.jumlah}, sisa ${m.bab24.sisa}: ${m.bab24.nama}`, m.bab24.makna, { a: m.bab24.arah, sumber: m.bab24.sumber, catatan: 'Bergantung tanggal Jawa.' }),
        tafsir(`Jumlah yang sama, sisa ${m.bab25.sisa}: ${m.bab25.nama}`, m.bab25.makna, { a: m.bab25.arah, sumber: m.bab25.sumber, catatan: 'Bergantung tanggal Jawa.' })
      ])
    }
  ];
  const adaNama = Boolean(pria.nama && wanita.nama);
  if (adaNama) {
    const n = jodohNama(pria.nama, wanita.nama);
    const nm = n.metode;
    bagian.push({
      id: 'nama',
      judul: 'Huruf nama',
      pengantar: `Dari huruf depan dan belakang nama ${pria.nama} dan ${wanita.nama}, dialihkan ke aksara hanacaraka. Alih huruf ini perkiraan.`,
      ringkasan: ringkasArah(n.ringkasan),
      butir: bersih([
        tafsir(`Neptu huruf: sisa ${nm.bab18.sisaPria} dan ${nm.bab18.sisaWanita}`, nm.bab18.makna, { a: nm.bab18.arah, sumber: nm.bab18.sumber }),
        tafsir(`Jumlah ${nm.bab19.jumlah}, sisa ${nm.bab19.sisa}: ${nm.bab19.nama}`, nm.bab19.makna, { a: nm.bab19.arah, sumber: nm.bab19.sumber, catatan: nm.bab19.asumsi }),
        tafsir(`Jumlah ${nm.bab20.jumlah}, sisa ${nm.bab20.sisa}: ${nm.bab20.nama}`, nm.bab20.makna, { a: nm.bab20.arah, sumber: nm.bab20.sumber }),
        tafsir(`Garis ${nm.bab21.garisPria} dan ${nm.bab21.garisWanita}`, nm.bab21.makna, { a: nm.bab21.arah, sumber: nm.bab21.sumber, catatan: nm.bab21.asumsi }),
        fakta('Huruf yang dipakai', [[pria.nama, `${n.pria.depan} dan ${n.pria.belakang}`], [wanita.nama, `${n.wanita.depan} dan ${n.wanita.belakang}`]])
      ])
    });
  }
  return { pihak: [a, b], adaNama, bagian, spekulatif: Boolean(w.spekulatif), catatan: CATATAN_JODOH };
}

/* ------------------------------------------------------------------ Hari baik */

export function tinjauanHari({ tanggal, untuk = 'semua' }) {
  const t = tinjauHari(tanggal, { untuk });
  const kal = kalenderJawa(tanggal);
  const kelompok = new Map();
  for (const x of t.temuan) {
    if (!kelompok.has(x.untuk)) kelompok.set(x.untuk, []);
    kelompok.get(x.untuk).push(x);
  }
  const bagian = [...kelompok.entries()].map(([k, daftarTemuan]) => ({
    id: `hari-${k}`,
    judul: NAMA_KEPERLUAN[k] ?? k[0].toUpperCase() + k.slice(1),
    ringkasan: hitungArah(daftarTemuan),
    butir: daftarTemuan.map(x => tafsir(x.topik, x.ringkas, { a: x.arah, sumber: x.sumber, catatan: x.bergantungTanggalJawa ? 'Bergantung tanggal Jawa, bisa bergeser sehari.' : null }))
  }));
  return {
    tanggal, untuk, weton: t.weton, wuku: t.wuku, tanggalJawa: t.tanggalJawa, hariMulia: kal.hariMulia ?? [],
    spekulatif: Boolean(kal.spekulatif), ringkasan: hitungArah(t.temuan), kosong: t.temuan.length === 0, bagian, catatan: CATATAN_HARI
  };
}

/** Ringkasan beberapa hari berurutan, agar mudah membandingkan. Berhenti di batas rentang yang dapat dihitung. */
export function cariHari({ dari, jumlah = 14, untuk = 'semua' }) {
  const hasil = [];
  const awal = nomorHari(dari);
  for (let i = 0; i < jumlah; i++) {
    const iso = isoDariNomor(awal + i);
    if (iso < TANGGAL_AWAL || iso > TANGGAL_AKHIR) break;
    const t = tinjauHari(iso, { untuk });
    hasil.push({ iso, weton: t.weton, wuku: t.wuku, tanggalJawa: t.tanggalJawa, ringkasan: hitungArah(t.temuan), jumlahTemuan: t.temuan.length });
  }
  return hasil;
}

/* ------------------------------------------------------------------ Jam */

/** Suhara di kitab: dua angka = rentang jam; satu angka = satu jam yang disebut (kitab tidak memberi rentang). */
const suharaTeks = a => (a.length >= 2 ? rentangJam(a[0], a[1]) : `sekitar pukul ${jamTeks(a[0])}`);
const dalam = (jam, mulai, selesai) => jam !== null && jam !== undefined && jam >= mulai && jam < selesai;
const sel = (teks, a) => (a ? { teks, arah: arah(a) } : teks);

/** @param {{tanggal: string, jam: string|null}} masukan jam 'HH:MM' opsional: baris yang memuat jam itu ditandai */
export function bangunJam({ tanggal, jam }) {
  const jamDes = jam ? Number(jam.slice(0, 2)) + Number(jam.slice(3)) / 60 : null;
  const w = weton(tanggal);
  const kal = kalenderJawa(tanggal);
  const ag = saatAgung(tanggal);
  const s12 = saat12(tanggal);
  const sb = jamSialBaik(tanggal);
  const sm = saatMalaikat(tanggal);
  const saatMal = [...sm.saat].sort((x, y) => x.jam[0] - y.jam[0]);
  const sp = saatPerkara(tanggal);
  const sn = saatNikah(tanggal);
  const sh = suhara(tanggal);
  const ak = akadTigaJenis(tanggal);
  const menitDalam = s => dalam(jamDes, Number(s.mulai.slice(0, 2)) + Number(s.mulai.slice(3)) / 60, Number(s.selesai.slice(0, 2)) + Number(s.selesai.slice(3)) / 60);
  const tandai = (mulai, selesai) => dalam(jamDes, mulai, selesai) || (jamDes !== null && jamDes + 24 >= mulai && jamDes + 24 < selesai);

  const bagian = bersih([
    {
      id: 'saat-agung',
      judul: 'Tujuh saat siang',
      pengantar: 'Pukul 06.00 sampai 18.00 terbagi menjadi tujuh saat dengan nilainya masing-masing.',
      butir: bersih([tabel('Saat agung', ['Waktu', 'Saat', 'Makna'], ag.saat.map(s => [rentangJam(s.mulai, s.selesai), sel(s.nama, s.arah), s.makna]), ag.sumber, null, ag.saat.map(s => tandai(s.mulai, s.selesai)))])
    },
    {
      id: 'saat-12',
      judul: 'Siang dan malam',
      pengantar: 'Hari dibagi menjadi sepuluh bagian, lima di siang dan lima di malam; nilai tiap bagian bergantung pada jumlah neptu hari itu.',
      butir: bersih([
        tabel('Siang', ['Waktu', 'Bagian hari', 'Saat'], s12.siang.map(s => [rentangJam(s.mulai, s.selesai), s.nama, sel(s.saat, s.arah)]), s12.sumber, null, s12.siang.map(s => tandai(s.mulai, s.selesai))),
        tabel('Malam', ['Waktu', 'Bagian hari', 'Saat'], s12.malam.map(s => [rentangJam(s.mulai, s.selesai), s.nama, sel(s.saat, s.arah)]), s12.sumber, s12.catatanCetak, s12.malam.map(s => tandai(s.mulai, s.selesai)))
      ])
    },
    {
      id: 'jam-sial-baik',
      judul: 'Jam sial dan jam baik',
      pengantar: 'Jam yang disebut kitab sebagai sial dan baik pada hari ini.',
      butir: bersih([
        daftar('Menurut kitab', [
          ...(sb.sial?.length ? [{ teks: `Sial: ${rentangDariJam(sb.sial)}`, arah: 'waspada' }] : []),
          ...(sb.baik?.length ? [{ teks: `Baik: ${rentangDariJam(sb.baik)}`, arah: 'baik' }] : [])
        ], sb.sumber, [sb.asumsi, sb.anomali].filter(Boolean).join(' ') || null)
      ])
    },
    {
      id: 'saat-malaikat',
      judul: 'Saat malaikat',
      pengantar: 'Pembagian jam siang menurut nama malaikat penjaganya.',
      butir: bersih([tabel('Saat malaikat', ['Waktu', 'Penjaga', 'Keterangan'], saatMal.map(s => [rentangDariJam(s.jam), sel(s.nama, s.arah), s.ringkas]), sm.sumber, sm.asumsi, saatMal.map(s => s.jam.some(j => jamDes !== null && jamDes >= j && jamDes < j + 1)))])
    },
    {
      id: 'perkara',
      judul: 'Urusan perkara',
      pengantar: 'Saat berangkat ke pengadilan, berunding, dan menyeberang laut.',
      butir: bersih([tabel('Saat perkara', ['Waktu', 'Saat', 'Tingkat', 'Berangkat ke pengadilan'], sp.saat.map(s => [rentangJam(s.mulai, s.selesai), sel(s.nama, s.arah), s.tingkat, s.pengadilan?.baikUntukBerangkat ? 'baik' : 'kurang baik']), sp.sumber, null, sp.saat.map(s => tandai(s.mulai, s.selesai)))])
    },
    {
      id: 'akad',
      judul: 'Akad nikah',
      pengantar: 'Saat akad menurut penjaga, pasaran, dan tanggal Jawa, serta hari akad tiga jenis. Bagian tanggal Jawa bisa bergeser sehari.',
      butir: bersih([
        tabel('Saat akad', ['Waktu', 'Penjaga', 'Menurut pasaran', 'Menurut tanggal'], sn.saat.map(s => [`${s.mulai.replace(':', '.')}–${s.selesai.replace(':', '.')}`, sel(`${s.penjaga} (${s.penjagaMakna.ringkas})`, s.penjagaMakna.arah), sel(`${s.menurutPasaran.nama} (${s.menurutPasaran.ringkas})`, s.menurutPasaran.arah), sel(`${s.menurutTanggal.nama} (${s.menurutTanggal.ringkas})`, s.menurutTanggal.arah)]), sn.sumber, 'Bergantung tanggal Jawa.', sn.saat.map(menitDalam)),
        daftar('Hari akad tiga jenis', Object.entries(ak.jenis).map(([k, v]) => ({ teks: `Jenis ${k}: ${v.istilah}`, arah: arah(v.arah) })), ak.sumber, [ak.anjuran, ak.asumsi].filter(Boolean).join(' ')),
        fakta('Saat akad menurut bintang Suhara', [['Siang', suharaTeks(sh.siang)], ['Malam', suharaTeks(sh.malam)], ['Catatan cetak kitab', sh.catatanCetak]], sh.sumber)
      ])
    }
  ]);

  let padaJam = null;
  if (jamDes !== null) {
    const a1 = saatAgungDi(tanggal, jamDes);
    const a2 = saat12Di(tanggal, jamDes);
    const a3 = saatBintang(tanggal, jamDes);
    padaJam = {
      jam: jamTeks(jamDes),
      butir: bersih([
        a1.saat ? tafsir(`Saat agung: ${a1.saat.nama}`, a1.saat.makna, { a: a1.saat.arah, sumber: a1.sumber }) : null,
        a2.saat ? tafsir(`Siang dan malam: ${a2.saat.nama} (${a2.saat.saat})`, `Bagian ${rentangJam(a2.saat.mulai, a2.saat.selesai)}.`, { a: a2.saat.arah, sumber: a2.sumber }) : null,
        a3.saat ? tafsir(`Saat bintang: ${a3.saat.nama}`, `Jam ${rentangJam(a3.saat.mulai, a3.saat.selesai)}, ${a3.saat.tingkat}.`, { a: a3.saat.arah, sumber: a3.sumber }) : null
      ])
    };
  }
  return {
    tanggal, jam: jam || null, weton: w.weton, wuku: w.wuku, tanggalJawa: `${kal.tanggal.dina} ${kal.tanggal.wulan} ${kal.tanggal.tahun} AJ`,
    spekulatif: Boolean(kal.spekulatif), padaJam, bagian, catatan: CATATAN_JAM
  };
}
