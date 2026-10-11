/**
 * Model tiga alat Primbon rilis 3: Rumah, Bepergian, dan Hajatan. Murni (tanpa DOM dan jaringan).
 * Yang SENGAJA tidak dibawa, selain yang sudah disaring di rilis sebelumnya:
 *  - "Tetesan" pada jadwal bayi (khitan perempuan; praktik yang tidak dianjurkan dunia kesehatan),
 *  - penilaian jam bayi lahir (saatBayiLahir): mendorong mengatur waktu persalinan,
 *  - isi dan tata cara selamatan (hanya tanggal acara yang dihitung), sajen, doa, dan penolak.
 */
import {
  weton, kalenderJawa, arahRumah, rumahHari, ukuranRumah, pintuHalaman, letakSumur, halaman,
  tinjauBepergian, pindahKediaman, menghadapPejabat, hariTarub, tingkeb, cariTingkeb, jadwalKehamilan, namaBayi, jadwalBayi
} from '../mesin/index.js';
import { hariJawaDari } from './laporan.js';
import { tafsir, fakta, daftar, tabel, bersih, arah, rentangJam } from './butir.js';

export const CATATAN_RUMAH = 'Tafsir tradisional kitab Betaljemur Adammakna. Bukan pengganti perencanaan teknik dan keselamatan bangunan; patuhi ketentuan bangunan dan nasihat tukang atau arsitek.';
export const CATATAN_BEPERGIAN = 'Tafsir tradisional kitab Betaljemur Adammakna. Bukan pengganti pertimbangan keselamatan perjalanan; periksa cuaca, kendaraan, dan kondisi tubuh.';
export const CATATAN_HAJATAN = 'Tafsir tradisional kitab Betaljemur Adammakna. Hanya tanggal acara adat yang dihitung. Ini bukan panduan kehamilan atau perawatan anak; untuk kehamilan dan bayi, ikuti anjuran tenaga kesehatan.';

const ringkasArah = temuan => {
  const r = { baik: 0, waspada: 0, netral: 0 };
  for (const t of temuan) r[arah(t.arah) ?? 'netral']++;
  return r;
};
const huruf = s => (s ? s[0].toUpperCase() + s.slice(1) : s);
const sel = (teks, a) => (a ? { teks, arah: arah(a) } : teks);
const jam24 = n => `${String(n).padStart(2, '0')}.00`;

/* ------------------------------------------------------------------ Rumah */

export const JENIS_UKURAN = [
  { id: 'usukAkhir', nama: 'Usuk terakhir (hitungan lima-lima)', satuan: 'jumlah usuk' },
  { id: 'usukBangunan', nama: 'Jumlah usuk menurut bangunan', satuan: 'jumlah usuk' },
  { id: 'rangka', nama: 'Rangka rumah (diukur dengan telapak kaki pemilik)', satuan: 'jumlah telapak kaki' },
  { id: 'tangga1', nama: 'Anak tangga (cara I)', satuan: 'jumlah anak tangga' },
  { id: 'tangga2', nama: 'Anak tangga (cara II)', satuan: 'jumlah anak tangga' },
  { id: 'balai', nama: 'Dlika, galar, atau plupuh balai-balai', satuan: 'jumlah' },
  { id: 'sumur', nama: 'Jarak sumur dari tengah lantai rumah', satuan: 'jarak dalam depa' }
];
export const MODE_RUMAH_NAMA = {
  arah: 'Arah hadap rumah', hari: 'Hari mulai membangun', ukuran: 'Hitungan ukuran', sumur: 'Letak sumur', pintu: 'Pintu halaman', lahan: 'Bentuk lahan'
};
const KEGIATAN_RUMAH = { mendirikan: 'Mendirikan rumah', genteng: 'Memasang genteng', pindah: 'Pindah rumah' };

export function bangunRumah(m) {
  const judul = MODE_RUMAH_NAMA[m.k];
  const dasar = { k: m.k, judul, catatan: CATATAN_RUMAH, hero: null, bagian: [] };
  if (m.k === 'arah') {
    const hj = hariJawaDari({ tanggal: m.tanggal, jam: m.jam });
    const r = arahRumah(hj.iso);
    dasar.hero = { judul: r.arahBaik.length ? `Menghadap ${r.arahBaik.join(' atau ')}` : 'Arah hadap', sub: `Pemilik ${r.weton}, neptu ${r.jumlahNeptu}`, hariJawa: hj };
    dasar.bagian = [{
      id: 'arah', judul: 'Arah hadap menurut weton pemilik', pengantar: 'Dihitung dari jumlah neptu weton pemilik rumah (bab 172).',
      butir: bersih([
        tafsir(`Arah hadap yang baik: ${r.arahBaik.join(', ')}`, `Menurut kitab, rumah milik ${r.weton} (neptu ${r.jumlahNeptu}) baik menghadap ${r.arahBaik.join(' atau ')}.`, { a: 'baik', sumber: r.sumber }),
        fakta('Dasar hitungan', [['Weton pemilik', r.weton], ['Jumlah neptu', r.jumlahNeptu]])
      ])
    }];
  } else if (m.k === 'hari') {
    const r = rumahHari(m.tanggal);
    dasar.hero = { judul: r.weton, sub: `${r.tanggalJawa} · mangsa ${r.mangsa}` };
    const kegiatan = Object.entries(r.kegiatan).map(([k, v]) => ({
      id: `rumah-${k}`,
      judul: KEGIATAN_RUMAH[k] ?? huruf(k),
      butir: bersih([
        v.menurutBulan ? tafsir(`Menurut bulan ${v.menurutBulan.bulan}`, v.menurutBulan.makna, { a: v.menurutBulan.arah, catatan: 'Bergantung tanggal Jawa, bisa bergeser sehari.' }) : null,
        v.menurutMangsa ? tafsir(`Menurut mangsa ${v.menurutMangsa.mangsa}`, v.menurutMangsa.makna, { a: v.menurutMangsa.arah, catatan: 'Mangsa dari kalender pranata mangsa baku, bukan dari kitab.' }) : null
      ])
    })).filter(b => b.butir.length);
    dasar.bagian = [
      ...kegiatan,
      {
        id: 'rumah-siklus', judul: 'Hitungan neptu hari', pengantar: 'Beberapa hitungan dari jumlah neptu hari itu (bab 176 sampai 180).',
        butir: Object.values(r.siklus || {}).filter(Boolean).map(x => tafsir(`${x.judul}: ${x.nama}`, x.makna, { a: x.arah }))
      },
      {
        id: 'rumah-bagian', judul: 'Bagian bangunan dan jam mulai',
        butir: bersih([
          r.bagianBangunan ? fakta('Bagian bangunan yang cocok dikerjakan', [['Bagian', r.bagianBangunan.bagian]]) : null,
          r.pasangPintu ? fakta('Memasang pintu', Object.entries(r.pasangPintu).map(([k, v]) => [huruf(k), typeof v === 'object' ? JSON.stringify(v) : v])) : null,
          r.jamMulai ? fakta('Jam mulai yang disebut kitab', [['Jam', r.jamMulai.jam.map(j => jam24(j.jam24)).join(', ')]], null) : null
        ])
      }
    ].filter(b => b.butir.length);
  } else if (m.k === 'ukuran') {
    const r = ukuranRumah(m.jenis, m.jumlah);
    const info = JENIS_UKURAN.find(j => j.id === m.jenis);
    dasar.hero = { judul: r.nama, sub: `${info.nama}: ${m.jumlah}` };
    dasar.bagian = [{
      id: 'ukuran', judul: info.nama, pengantar: 'Hitungan berputar: jumlah dibagi banyaknya nama, sisa nol dibaca nama terakhir.',
      butir: bersih([tafsir(`${info.satuan[0].toUpperCase()}${info.satuan.slice(1)} ${m.jumlah}: ${r.nama}`, r.makna, { a: r.arah, sumber: r.sumber }), fakta('Hitungan', [['Jumlah', m.jumlah], ['Nomor nama', r.nomor]])])
    }];
  } else if (m.k === 'sumur') {
    const r = letakSumur({ rumahMenghadap: m.menghadap, sumurDi: m.sumurDi.replace(' ', '_') });
    dasar.hero = { judul: `Sumur di ${m.sumurDi}`, sub: `Rumah menghadap ${m.menghadap}` };
    dasar.bagian = [{
      id: 'sumur', judul: 'Letak sumur terhadap rumah',
      butir: bersih([tafsir(`Sumur di ${m.sumurDi.toLowerCase()} (nomor ${r.nomor})`, r.makna, { a: r.arah, sumber: r.sumber }), tafsir('Anjuran kitab', r.anjuran, { sumber: r.sumber })])
    }];
  } else if (m.k === 'pintu') {
    const r = pintuHalaman({ metode: m.metode, menghadap: m.menghadap, panjang: m.panjang, posisi: m.posisi });
    dasar.hero = { judul: `Bagian ke-${r.nomor} dari ${r.bagian}`, sub: `Sisi ${r.menghadap}, hitungan bab ${m.metode}` };
    dasar.bagian = [{
      id: 'pintu', judul: 'Letak pintu halaman', pengantar: `Sisi dibagi ${r.bagian} bagian sama panjang; hitungan dimulai dari sudut ${r.mulaiDari}.`,
      butir: bersih([tafsir(`Bagian ke-${r.nomor}`, r.makna, { a: r.arah, sumber: r.sumber, catatan: r.keterangan }), fakta('Hitungan', [['Sisi', r.menghadap], ['Dimulai dari sudut', r.mulaiDari], ['Posisi pintu', `${m.posisi} dari ${m.panjang}`]])])
    }];
  } else {
    const r = halaman();
    dasar.hero = { judul: 'Bentuk lahan', sub: `${r.daftar.length} keadaan` };
    dasar.bagian = [{
      id: 'lahan', judul: 'Bentuk dan keadaan lahan', pengantar: 'Daftar keadaan lahan menurut kitab (bab 168).',
      ringkasan: ringkasArah(r.daftar),
      butir: r.daftar.map(x => tafsir(`${x.kondisi}: ${x.nama}`, x.makna, { a: x.arah, sumber: r.sumber }))
    }];
  }
  return dasar;
}

/* ------------------------------------------------------------------ Bepergian */

export function bangunBepergian({ tanggal, tujuan }) {
  const t = tinjauBepergian(tanggal);
  const kal = kalenderJawa(tanggal);
  const pk = pindahKediaman(tanggal);
  const mp = menghadapPejabat(tanggal);
  const dibandingTujuan = x => Boolean(tujuan) && x.arah === tujuan;
  const bagian = [];
  if (tujuan) {
    const untukTujuan = t.arah.filter(x => x.arah === tujuan);
    bagian.push({
      id: 'tujuan', judul: `Tujuan ke arah ${tujuan}`,
      pengantar: untukTujuan.length ? 'Catatan kitab yang menyebut arah ini pada tanggal tersebut.' : 'Kitab tidak menyebut arah ini pada tanggal tersebut; itu berarti tidak ada catatan, bukan berarti arah ini baik.',
      ringkasan: ringkasArah(untukTujuan.map(x => ({ arah: x.nilai }))),
      butir: untukTujuan.map(x => tafsir(huruf(x.jenis), x.ringkas, { a: x.nilai, sumber: x.sumber, catatan: x.bergantungTanggalJawa ? 'Bergantung tanggal Jawa, bisa bergeser sehari.' : null }))
    });
  }
  bagian.push({
    id: 'arah', judul: 'Arah menurut kitab', pengantar: 'Semua arah yang disebut kitab pada tanggal ini: naga, kala, rijalolah, hari hidup dan mati, serta arah nafkah. Baris arah tujuan Anda ditandai.',
    ringkasan: ringkasArah(t.arah.map(x => ({ arah: x.nilai }))),
    butir: bersih([tabel('Arah dan jenisnya', ['Arah', 'Jenis', 'Keterangan'], t.arah.map(x => [x.arah, sel(huruf(x.jenis), x.nilai), x.ringkas]), t.arah[0]?.sumber, 'Sebagian bergantung tanggal Jawa dan bisa bergeser sehari.', t.arah.map(dibandingTujuan))])
  });
  const w = t.waktu;
  bagian.push({
    id: 'waktu', judul: 'Waktu berangkat',
    butir: bersih([
      w.kalaBaya ? tafsir(`Kala atau baya: ${w.kalaBaya.nama}`, w.kalaBaya.baik ? 'Menurut kitab baik untuk berangkat.' : 'Menurut kitab kurang baik untuk berangkat.', { a: w.kalaBaya.baik ? 'baik' : 'buruk', catatan: w.kalaBaya.asumsi }) : null,
      w.saat ? daftar(`Saat: ${w.saat.nama}`, (w.saat.saat || []).map(s => ({ teks: `${huruf(s.nama)}${s.jam && s.jam.length ? `, pukul ${s.jam.length > 1 ? rentangJam(s.jam[0], s.jam[1]) : jam24(s.jam[0])}` : ''}`, arah: null })), null, w.saat.catatan) : null,
      w.naas ? fakta("Na'as", [['Waktu', w.naas.waktu], ['Jam', w.naas.jam ? rentangJam(w.naas.jam[0], w.naas.jam[1]) : '']]) : null,
      w.bayanganKaki ? fakta('Bayangan kaki', [['Panjang', `${w.bayanganKaki.panjang} telapak kaki`]]) : null
    ])
  });
  bagian.push({
    id: 'urusan', judul: 'Pindah kediaman dan menghadap pejabat',
    butir: bersih([
      tafsir(`Pindah kediaman: ${pk.nama}`, pk.ringkas, { a: pk.arah, sumber: pk.sumber, catatan: pk.asumsi }),
      tafsir(`Menghadap pejabat: ${mp.nama}`, mp.ringkas, { a: mp.arah, sumber: mp.sumber, catatan: 'Bergantung tanggal Jawa, bisa bergeser sehari.' })
    ])
  });
  return { tanggal, tujuan, weton: t.weton, tanggalJawa: `${kal.tanggal.dina} ${kal.tanggal.wulan} ${kal.tanggal.tahun} AJ`, spekulatif: Boolean(kal.spekulatif), bagian: bagian.filter(b => b.butir.length), catatan: CATATAN_BEPERGIAN };
}

/* ------------------------------------------------------------------ Hajatan */

export const MODE_HAJATAN_NAMA = { tarub: 'Memasang tarub', tingkeb: 'Tingkeb', kehamilan: 'Jadwal kehamilan', bayi: 'Jadwal bayi' };

/** Bersihkan istilah ritual dari keterangan jadwal: tanggal acara saja, tanpa nama sesaji atau wadahnya. */
const bersihkanAcara = teks => String(teks).replace(/\s*\((disebut|dinamai)[^)]*\)/gi, '').trim();
/** Jadwal bayi yang tidak dibawa: tetesan (khitan perempuan). */
const DISARING = /tetesan/i;

export function bangunHajatan({ k, tanggal, nama }) {
  const kal = kalenderJawa(tanggal);
  const w = weton(tanggal);
  const jawa = `${kal.tanggal.dina} ${kal.tanggal.wulan} ${kal.tanggal.tahun} AJ`;
  const dasar = { k, judul: MODE_HAJATAN_NAMA[k], tanggal, spekulatif: Boolean(kal.spekulatif), catatan: CATATAN_HAJATAN, bagian: [] };
  if (k === 'tarub') {
    const r = hariTarub(tanggal);
    const m = r.metode;
    dasar.hero = { judul: w.weton, sub: jawa };
    dasar.bagian = [{
      id: 'tarub', judul: 'Hari memasang tarub',
      pengantar: 'Kitab memberi tiga cara memilih hari; pilih salah satu. Bagian yang memakai tanggal Jawa bisa bergeser sehari.',
      ringkasan: ringkasArah(Object.values(m).map(x => ({ arah: x.arah }))),
      butir: bersih([
        tafsir(`Cara pertama (jumlah neptu ${m.bab39.jumlahNeptu}): ${m.bab39.nama}`, `Hasil hitungan: ${m.bab39.nama}.`, { a: m.bab39.arah, sumber: m.bab39.sumber }),
        tafsir(`Cara kedua (tanggal ${kal.tanggal.dina}): ${m.bab40.nama}`, m.bab40.makna, { a: m.bab40.arah, sumber: m.bab40.sumber, catatan: 'Bergantung tanggal Jawa.' }),
        tafsir(`Cara ketiga: ${m.bab41.nama}`, `Hasil hitungan: ${m.bab41.nama}.`, { a: m.bab41.arah, sumber: m.bab41.sumber, catatan: m.bab41.catatanCetak }),
        tafsir('Saat memasang', 'Saat memasang tarub sama dengan saat akad nikah (bab 42): pilih saat Slamet (baik) atau Rejeki (cukupan). Lihat bagian Akad nikah di halaman Jam.', { sumber: null })
      ])
    }];
  } else if (k === 'tingkeb') {
    const r = tingkeb(tanggal);
    const kandidat = cariTingkeb(tanggal, 30).map(iso => ({ iso, w: weton(iso).weton, j: kalenderJawa(iso).tanggal }));
    dasar.hero = { judul: w.weton, sub: jawa };
    dasar.bagian = [{
      id: 'tingkeb', judul: 'Tanggal tingkeb',
      pengantar: 'Menurut kitab, tingkeb pada bulan ketujuh kehamilan jatuh pada hari Rabu atau Sabtu, dengan tanggal Jawa ganjil sebelum tanggal 15.',
      butir: bersih([
        tafsir(r.memenuhi ? 'Tanggal ini memenuhi syarat kitab' : 'Tanggal ini tidak memenuhi syarat kitab', `Hari ${r.hariOk ? 'sesuai' : 'tidak sesuai'} (Rabu atau Sabtu); tanggal Jawa ${r.tanggalOk ? 'sesuai' : 'tidak sesuai'} (ganjil, sebelum 15).`, { a: r.memenuhi ? 'baik' : 'netral', catatan: 'Bergantung tanggal Jawa, bisa bergeser sehari.' }),
        daftar('Tanggal yang memenuhi dalam 30 hari berikutnya', kandidat.map(c => ({ teks: `${w2(c.iso)} · ${c.w} · ${c.j.dina} ${c.j.wulan} ${c.j.tahun} AJ`, arah: 'baik' })), null, kandidat.length ? null : 'Tidak ada tanggal yang memenuhi dalam 30 hari ini.')
      ])
    }];
  } else if (k === 'kehamilan') {
    const r = jadwalKehamilan(tanggal);
    dasar.hero = { judul: 'Jadwal kehamilan', sub: `Acuan ${w2(tanggal)}` };
    dasar.bagian = [{
      id: 'kehamilan', judul: 'Tanggal acara adat tiap bulan',
      pengantar: 'Tanggal peringatan tiap bulan kehamilan menurut kitab, dihitung dari tanggal acuan. Ini jadwal acara adat, bukan perkiraan persalinan dan bukan panduan kehamilan.',
      butir: bersih([
        tabel('Jadwal bulanan', ['Bulan ke', 'Tanggal', 'Weton', 'Keterangan'], r.bulan.map(b => [`Bulan ke-${b.bulan}`, w2(b.masehi), b.weton, bersihkanAcara(b.ringkas)]), r.sumber, r.asumsi),
        r.tingkeb ? fakta('Tingkeb (bulan ke-7)', [['Tanggal bulan ke-7', w2(r.tingkeb.tanggalBulanKe7)], ['Tanggal yang memenuhi syarat kitab', (r.tingkeb.kandidat || []).map(w2).join(', ') || 'tidak ada dalam 30 hari']]) : null
      ])
    }];
  } else {
    const r = jadwalBayi(tanggal);
    const tahap = r.tahap.filter(t => !DISARING.test(t.nama));
    const rentang = r.rentang.filter(t => !DISARING.test(t.nama));
    dasar.hero = { judul: w.weton, sub: `Lahir ${w2(tanggal)}` };
    dasar.bagian = [{
      id: 'bayi', judul: 'Jadwal acara adat menurut usia',
      pengantar: 'Tanggal peringatan menurut usia bayi, dihitung dari hari lahir sebagai hari ke-0. Ini jadwal acara adat, bukan jadwal perawatan atau imunisasi.',
      butir: bersih([
        tabel('Peringatan menurut usia', ['Tahap', 'Hari ke', 'Tanggal', 'Weton'], tahap.map(t => [bersihkanAcara(t.nama), String(t.hariKe), w2(t.masehi), t.weton]), r.sumber, r.catatanWeton),
        tabel('Rentang usia', ['Tahap', 'Dari', 'Sampai'], rentang.map(t => [t.nama, w2(t.dari), w2(t.sampai)]), r.sumber, 'Usia dalam bulan dan tahun memakai kalender Masehi (kitab tidak menyebut kalender).')
      ])
    }];
    if (nama) {
      const n = namaBayi(tanggal, nama);
      dasar.bagian.push({
        id: 'nama-bayi', judul: `Nama ${nama}`, pengantar: 'Kecocokan nama dengan weton lahir menurut huruf nama. Alih huruf ke aksara hanacaraka adalah perkiraan.',
        butir: bersih([
          tafsir(n.cocok ? 'Hitungan cocok' : 'Hitungan tidak cocok', n.cocok ? 'Menurut kitab, jumlah neptu weton dan huruf nama cocok.' : 'Hitungan ini tidak menghasilkan kecocokan; kitab tidak menafsirkan sisa yang lain.', { a: n.cocok ? 'baik' : 'netral', sumber: n.sumber, catatan: n.asumsi }),
          fakta('Hitungan', [['Neptu weton', n.neptuWeton], ['Huruf yang dipakai', n.aksara.join(' dan ')], ['Neptu huruf', n.neptuHuruf], ['Jumlah', n.jumlah], ['Sisa', n.sisa]])
        ])
      });
    }
  }
  return dasar;
}

/** Tanggal Masehi lengkap dengan hari: '2026-10-20' menjadi 'Selasa, 20 Oktober 2026'. */
const BULAN_PANJANG = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
function w2(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${weton(iso).hari}, ${d} ${BULAN_PANJANG[m - 1]} ${y}`;
}
