/**
 * Neptu menurut kitab Betaljemur Adammakna, bab 2 (hlm. 7). Fakta angka; dicocokkan dengan scan.
 * Kunci memakai nama yang sama dengan mesin kalender (kalender.js).
 */
export const NEPTU = {
  sumber: { bab: 2, halaman: [7], verifikasi: 'scan' },
  hari: { Minggu: 5, Senin: 4, Selasa: 3, Rabu: 7, Kamis: 8, Jumat: 6, Sabtu: 9 },
  pasaran: { Kliwon: 8, Legi: 5, Pahing: 9, Pon: 7, Wage: 4 },
  // Kitab menulis Rabiulawal, Rabiulakir, Puasa, Dulkaidah: padanannya Mulud, Bakdamulud, Pasa, Dulkangidah.
  wulan: {
    Sura: 7, Sapar: 2, Mulud: 3, Bakdamulud: 5, Jumadilawal: 6, Jumadilakir: 1,
    Rejeb: 2, Ruwah: 4, Pasa: 5, Sawal: 7, Dulkangidah: 1, Besar: 3
  },
  taun: { Alip: 1, Ehe: 5, Jimawal: 3, Je: 7, Dal: 4, Be: 2, Wawu: 6, Jimakir: 3 }
};

/**
 * Urutan bilangan yang dipakai khusus oleh bab 104 (sisa 7). BUKAN neptu biasa:
 * Jumat 1, Sabtu 2, Minggu 3, Senin 4, Selasa 5, Rabu 6, Kamis 7; Kliwon 1 ... Wage 5.
 */
export const URUTAN_BAB_104 = {
  hari: { Jumat: 1, Sabtu: 2, Minggu: 3, Senin: 4, Selasa: 5, Rabu: 6, Kamis: 7 },
  pasaran: { Kliwon: 1, Legi: 2, Pahing: 3, Pon: 4, Wage: 5 }
};
