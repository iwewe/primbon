/**
 * Mesin kalender Jawa (Sultan Agungan): weton, wuku, tanggal Jawa, windu, lambang, kurup.
 *
 * Fungsi murni, tanpa dependensi, tanpa zona waktu: semua dihitung dari nomor
 * hari kalender Gregorian (proleptik). Algoritma merujuk pada `weton.m` karya
 * François Beauducel dan artikel Karjanto & Beauducel (2020); kode ditulis ulang (lihat NOTICE.md).
 *
 * Panjang tahun dan awal bulan sudah dikoreksi agar cocok dengan tabel Keraton Yogyakarta (tahun wuntu = Ehe, Dal, Jimakir);
 * lihat docs/ilmiah/KALENDER_DAN_VERIFIKASI.md.
 *
 * Batas pemakaian:
 *  - weton, wuku, neptu: siklus murni (modulo 5/7/35/210), berlaku untuk tanggal apa pun.
 *  - tanggal Jawa, tahun, windu, lambang, kurup: hanya 8 Juli 1633 – 25 Agustus 2052.
 *    Sesudahnya `spekulatif: true` (aturan kurup berikutnya belum ditetapkan).
 */

// --- nomor hari ---------------------------------------------------------------
// datenum gaya MATLAB: datenum(1970,1,1) = 719529. Aritmetika bilangan bulat.
const DATENUM_1970 = 719529;

function daysFromCivil(y, m, d) {
  y -= m <= 2 ? 1 : 0;
  const era = Math.floor(y / 400);
  const yoe = y - era * 400;
  const doy = Math.floor((153 * (m + (m > 2 ? -3 : 9)) + 2) / 5) + d - 1;
  const doe = yoe * 365 + Math.floor(yoe / 4) - Math.floor(yoe / 100) + doy;
  return era * 146097 + doe - 719468;
}

function civilFromDays(z) {
  z += 719468;
  const era = Math.floor(z / 146097);
  const doe = z - era * 146097;
  const yoe = Math.floor((doe - Math.floor(doe / 1460) + Math.floor(doe / 36524) - Math.floor(doe / 146096)) / 365);
  const doy = doe - (365 * yoe + Math.floor(yoe / 4) - Math.floor(yoe / 100));
  const mp = Math.floor((5 * doy + 2) / 153);
  const d = doy - Math.floor((153 * mp + 2) / 5) + 1;
  const m = mp + (mp < 10 ? 3 : -9);
  return { tahun: yoe + era * 400 + (m <= 2 ? 1 : 0), bulan: m, hari: d };
}

const datenum = (y, m, d) => daysFromCivil(y, m, d) + DATENUM_1970;
const mod = (a, n) => ((a % n) + n) % n;

const pad = (n, w = 2) => String(n).padStart(w, '0');
const iso = ({ tahun, bulan, hari }) => `${pad(tahun, 4)}-${pad(bulan)}-${pad(hari)}`;

/** Terima 'YYYY-MM-DD', Date (komponen lokal), [y,m,d] atau {tahun,bulan,hari}; kembalikan datenum. */
export function nomorHari(input) {
  let y, m, d;
  if (typeof input === 'string') {
    const t = /^(\d{1,4})-(\d{1,2})-(\d{1,2})$/.exec(input.trim());
    if (!t) throw new TypeError(`Format tanggal tidak dikenal: "${input}" (pakai YYYY-MM-DD)`);
    [y, m, d] = [Number(t[1]), Number(t[2]), Number(t[3])];
  } else if (input instanceof Date) {
    if (Number.isNaN(input.getTime())) throw new TypeError('Date tidak valid');
    [y, m, d] = [input.getFullYear(), input.getMonth() + 1, input.getDate()];
  } else if (Array.isArray(input)) {
    [y, m, d] = input.map(Number);
  } else if (input && typeof input === 'object') {
    [y, m, d] = [Number(input.tahun ?? input.year), Number(input.bulan ?? input.month), Number(input.hari ?? input.day)];
  } else {
    throw new TypeError('Tanggal harus string YYYY-MM-DD, Date, [tahun, bulan, hari] atau {tahun, bulan, hari}');
  }
  if (![y, m, d].every(Number.isInteger) || m < 1 || m > 12 || d < 1 || d > 31) {
    throw new RangeError(`Tanggal tidak valid: ${y}-${m}-${d}`);
  }
  const back = civilFromDays(daysFromCivil(y, m, d));
  if (back.tahun !== y || back.bulan !== m || back.hari !== d) {
    throw new RangeError(`Tanggal tidak ada di kalender: ${y}-${pad(m)}-${pad(d)}`);
  }
  return datenum(y, m, d);
}

// --- nama-nama ----------------------------------------------------------------
export const PASARAN = ['Pon', 'Wage', 'Kliwon', 'Legi', 'Pahing'];
export const DINAPITU = ['Senen', 'Selasa', 'Rebo', 'Kemis', 'Jemuwah', 'Setu', 'Ngahad'];
export const HARI = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
export const WUKU = [
  'Sinta', 'Landep', 'Wukir', 'Kurantil', 'Tolu', 'Gumbreg',
  'Warigalit', 'Warigagung', 'Julungwangi', 'Sungsang', 'Galungan', 'Kuningan',
  'Langkir', 'Mandasiya', 'Julungpujut', 'Pahang', 'Kuruwelut', 'Marakeh',
  'Tambir', 'Medangkungan', 'Maktal', 'Wuye', 'Manahil', 'Prangbakat',
  'Bala', 'Wugu', 'Wayang', 'Kulawu', 'Dukut', 'Watugunung'
];
export const WULAN = [
  'Sura', 'Sapar', 'Mulud', 'Bakdamulud', 'Jumadilawal', 'Jumadilakir',
  'Rejeb', 'Ruwah', 'Pasa', 'Sawal', 'Dulkangidah', 'Besar'
];
export const TAUN = ['Alip', 'Ehe', 'Jimawal', 'Je', 'Dal', 'Be', 'Wawu', 'Jimakir'];
// Ejaan Keraton dan tesis Marhamah: Kuntara, Sangara, Sancaya, Adi (weton.m mengeja "Sengara").
export const WINDU = ['Adi', 'Kuntara', 'Sangara', 'Sancaya'];
export const LAMBANG = ['Langkir', 'Kulawu'];

// Neptu (Betaljemur Adammakna, bab 2), urut seperti DINAPITU dan PASARAN di atas.
const NEPTU_HARI = [4, 3, 7, 8, 6, 9, 5];
const NEPTU_PASARAN = [7, 4, 8, 5, 9];

// --- weton, wuku, neptu: siklus murni -------------------------------------------
function siklus(dt) {
  const mingguIdx = mod(dt + 4, 7);
  const pasaranIdx = mod(dt + 2, 5);
  const wukuIdx = mod(Math.floor((dt - 2) / 7) + 25, 30);
  return { mingguIdx, pasaranIdx, wukuIdx };
}

function bagianSiklus(dt) {
  const { mingguIdx, pasaranIdx, wukuIdx } = siklus(dt);
  const hariPekan = NEPTU_HARI[mingguIdx];
  const hariPasaran = NEPTU_PASARAN[pasaranIdx];
  return {
    hari: HARI[mingguIdx],
    dinapitu: DINAPITU[mingguIdx],
    pasaran: PASARAN[pasaranIdx],
    weton: `${HARI[mingguIdx]} ${PASARAN[pasaranIdx]}`,
    neptu: { hari: hariPekan, pasaran: hariPasaran, total: hariPekan + hariPasaran },
    wuku: WUKU[wukuIdx],
    nomorWuku: wukuIdx + 1
  };
}

export const weton = (input) => bagianSiklus(nomorHari(input));
export const wuku = (input) => {
  const { wuku: nama, nomorWuku } = bagianSiklus(nomorHari(input));
  return { wuku: nama, nomorWuku };
};

/** Tanggal ISO dari nomor hari (kebalikan nomorHari). */
export const isoDariNomor = (dt) => iso(civilFromDays(dt - DATENUM_1970));

/** Tanggal (ISO) dari `n` weton berikutnya (tiap 35 hari), mulai dari tanggal itu sendiri. */
export function selapan(input, n = 10) {
  const dt = nomorHari(input);
  return Array.from({ length: n + 1 }, (_, i) => iso(civilFromDays(dt + 35 * i - DATENUM_1970)));
}

// --- tabel windu/taun (port weton.m) ----------------------------------------------
export const AWAL_KALENDER = { tahun: 1633, bulan: 7, hari: 8 }; // 1 Sura Alip 1555 AJ, Jumat Legi
export const AKHIR_KALENDER = { tahun: 2052, bulan: 8, hari: 25 }; // akhir kurup Asapon
const AJ = 1555;
const T0 = datenum(1633, 7, 8);
const TL = datenum(2052, 8, 25);

// [nama, nama pendek, taun AJ pertama]. Batas kurup menurut Keraton Yogyakarta (Marhamah 2022, hlm. 55-56): kurup pertama hanya
// 72 tahun (Sultan Agung memulai di tengah siklus), lalu 120 tahun tiap kurup. Hari-pasaran 1 Sura tahun Alip pertama tiap kurup:
// Jumat Legi (1555), Kamis Kliwon (1627), Rabu Wage (1747), Selasa Pon (1867), tiap kurup mundur satu hari dan satu pasaran.
const KURUP = [
  ['Jamingiyah', "A'ahgi", 1555],
  ['Kamsiyah', 'Amiswon', 1627],
  ['Arbangiyah', 'Aboge', 1747],
  ['Salasiyah', 'Asapon', 1867]
];

const bulan = (...tambahan) => tambahan.map(x => 29 + x);
const W354 = bulan(1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0);
const W355 = bulan(1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1);
// Pola windu Sultan Agungan, sama di semua kurup: tahun wuntu (355 hari, Besar 30) = Ehe, Dal, Jimakir (tahun ke-2, 5, 8);
// bulan ganjil 30 hari, bulan genap 29 hari. Lihat docs/ilmiah/KALENDER_DAN_VERIFIKASI.md.
const WINDU_POLA = [W354, W355, W354, W354, W355, W354, W354, W355];

const NKRP = 6; // sampai 2226 AJ: jauh melampaui 2052
const tabelCache = new Map();

function bangunTabel() {
  const kurup = KURUP.map(k => [...k]);
  const kolom = Array.from({ length: 120 * NKRP }, () => new Array(12).fill(0));
  for (let k = 1; k <= NKRP; k++) {
    // weton.m menyimpang dari pola ini: Je = 355 dan Dal = 354 pada kurup ke-3 dst., dan pola bulan khusus pada tahun Dal kurup ke-2.
    // Keduanya tidak didukung tabel Keraton maupun metode windu asli (lihat docs/ilmiah/KALENDER_DAN_VERIFIKASI.md).
    const hw = WINDU_POLA;
    const krp = Array.from({ length: 120 }, (_, i) => [...hw[i % 8]]);
    let awal, panjang;
    if (k < kurup.length) {
      awal = kurup[k - 1][2];
      panjang = kurup[k][2] - awal;
    } else {
      awal = kurup[kurup.length - 1][2] + 120 * (k - kurup.length);
      panjang = 120;
    }
    krp[panjang - 1][11] -= 1; // kurup berakhir satu hari lebih cepat (pada tahun terakhirnya)
    for (let y = awal; y < awal + panjang; y++) {
      kolom[y - AJ] = [...krp[y - awal]];
    }
  }
  const kumulatif = [];
  let total = 0;
  for (const c of kolom) for (const v of c) { total += v; kumulatif.push(total); }
  return { kurup, kumulatif };
}

function tabel() {
  if (!tabelCache.has('baku')) tabelCache.set('baku', bangunTabel());
  return tabelCache.get('baku');
}

/** Indeks pertama dalam `arr` (naik) yang nilainya >= x. */
function cariPertama(arr, x) {
  let lo = 0, hi = arr.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] >= x) hi = mid; else lo = mid + 1;
  }
  return lo;
}

// --- hari mulia ------------------------------------------------------------------
// Hanya yang syaratnya lengkap di weton.m. "Aboge" dan "Daltugi" di sumber hanya
// memeriksa sebagian syarat (tanpa hari/tanggal), jadi sengaja tidak dimasukkan.
function hariMulia({ dina, wulanIdx, wukuNama, dinapitu, pasaran }) {
  const out = [];
  if (dina === 1 && wulanIdx === 0) out.push('Siji Sura');
  if (wukuNama === 'Kuningan' && dinapitu === 'Setu' && pasaran === 'Kliwon') out.push('Kuningan');
  if (wukuNama === 'Dukut' && dinapitu === 'Selasa' && pasaran === 'Kliwon') out.push('Hanggara Asih');
  if (wukuNama === 'Watugunung' && dinapitu === 'Jemuwah' && pasaran === 'Kliwon') out.push('Dina Mulya');
  if (dinapitu === 'Jemuwah' && pasaran === 'Legi') out.push('Dina Purnama');
  return out;
}

/**
 * Kalender Jawa lengkap untuk satu tanggal Masehi.
 * @param {string|Date|number[]|object} input
 */
export function kalenderJawa(input) {
  const dt = nomorHari(input);
  if (dt < T0) throw new RangeError('Kalender Jawa Sultan Agungan dimulai 8 Juli 1633 (1 Sura 1555 AJ)');
  const dasar = bagianSiklus(dt);
  const { kurup, kumulatif } = tabel();

  const dti = dt - T0 + 1;
  const kk = cariPertama(kumulatif, dti);
  const wulanIdx = kk % 12;
  const taunAj = Math.floor(kk / 12) + 1;
  const dina = dti - (kk > 0 ? kumulatif[kk - 1] : 0);
  const tahun = taunAj + AJ - 1;

  // Windu = blok 8 tahun Jawa (bukan blok 2835 hari: koreksi kurup memendekkan kalender, sehingga blok hari melenceng 1-3 hari dari batas tahun).
  const putaranWindu = Math.floor((tahun - AJ) / 8);
  const kft = kurup.map(k => k[2]);
  let kurupIdx;
  if (tahun < kft[kft.length - 1] + 120) {
    kurupIdx = kft.reduce((acc, f, i) => (tahun >= f ? i : acc), 0);
  } else {
    kurupIdx = Math.floor((tahun - kft[kft.length - 1]) / 120) + kurup.length - 1;
  }
  const dikenal = kurupIdx < kurup.length;

  const tanggal = {
    dina,
    wulan: WULAN[wulanIdx],
    tahun,
    taun: TAUN[(taunAj - 1) % 8],
    windu: WINDU[(putaranWindu + 1) % 4],
    lambang: LAMBANG[(putaranWindu + 1) % 2],
    kurup: dikenal ? kurup[kurupIdx][0] : `Kurup ${kurupIdx + 1}`,
    kurupPendek: dikenal ? kurup[kurupIdx][1] : ''
  };
  const mulia = hariMulia({ dina, wulanIdx, wukuNama: dasar.wuku, dinapitu: dasar.dinapitu, pasaran: dasar.pasaran });
  const masehi = civilFromDays(dt - DATENUM_1970);

  return {
    masehi: iso(masehi),
    ...dasar,
    tanggal,
    hariMulia: mulia,
    spekulatif: dt > TL,
    teks: `${DINAPITU[mod(dt + 4, 7)]} ${dasar.pasaran} ${dasar.wuku} ${dina} ${tanggal.wulan} ${tahun} AJ ` +
      `${tanggal.taun} ${tanggal.windu} ${tanggal.lambang} ${tanggal.kurup}` +
      `${tanggal.kurupPendek ? ` (${tanggal.kurupPendek})` : ''}` +
      `${mulia.length ? ` [${mulia.join(', ')}]` : ''}`
  };
}
