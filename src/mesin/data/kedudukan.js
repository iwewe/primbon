/**
 * "Kedudukan hari dan pasaran" (Betaljemur Adammakna, bab 1, hlm. 6): atribut tiap hari dan pasaran.
 * Fakta berupa kata-kata pendek; dicocokkan dengan scan. Kolom aksara Jawa pada pasaran
 * (kolom "huruf") tidak ditranskripsi.
 */
export const KEDUDUKAN = {
  sumber: { bab: 1, halaman: [6], verifikasi: 'scan' },
  hari: {
    Minggu: { warna: 'Abu-abu', letak: 'Timur Laut', kota: 'Merah', air: 'Laut', kayu: 'Beringin', burung: 'Hantu', huruf: 'Kitab 10', pelindung: 'Adam' },
    Senin: { warna: 'Kuning', letak: 'Barat Laut', kota: 'Emas', air: 'Air masak', kayu: 'Kunir', burung: 'Kuniran', huruf: 'Kitab 4', pelindung: 'Ibrahim' },
    Selasa: { warna: 'Biru', letak: 'Barat Daya', kota: 'Perak', air: 'Biru amis', kayu: 'Tangan', burung: 'Bubut', huruf: 'Kitab 20', pelindung: 'Isa' },
    Rabu: { warna: 'Dhadhu', letak: 'Barat', kota: 'Besi', air: 'Hujan', kayu: 'Nagasari', burung: 'Ulung', huruf: 'Kitab 10', pelindung: 'Musa' },
    Kamis: { warna: 'Merah', letak: 'Tenggara', kota: 'Tembaga', air: 'Galuga', kayu: 'Secang', burung: 'Perkutut', huruf: 'Kitab 30', pelindung: 'Idris' },
    Jumat: { warna: 'Hitam', letak: 'Utara', kota: 'Baja', air: 'Mangsi', kayu: 'Arang', burung: 'Bethet', huruf: 'Alip', pelindung: 'Muhammad' },
    Sabtu: { warna: 'Putih', letak: 'Selatan', kota: 'Rejasa', air: 'Leri', kayu: 'Widara', burung: 'Wangan', huruf: 'Kitab 51', pelindung: 'Sis' }
  },
  pasaran: {
    Kliwon: { warna: 'Abu-abu', letak: 'Tengah', kota: 'Majupat', air: 'Madu', kayu: 'Gurdha', burung: 'Gogik', pelindung: 'Guru' },
    Legi: { warna: 'Putih', letak: 'Timur', kota: 'Perak', air: 'Santan', kayu: 'Putih', burung: 'Kuntul', pelindung: 'Narada' },
    Pahing: { warna: 'Merah', letak: 'Selatan', kota: 'Tembaga', air: 'Darah', kayu: 'Ingas', burung: 'Engkuk', pelindung: 'Brama' },
    Pon: { warna: 'Kuning', letak: 'Barat', kota: 'Emas', air: 'Manis (sarkara)', kayu: 'Kemuning', burung: 'Podhang', pelindung: 'Kamajaya' },
    Wage: { warna: 'Hitam', letak: 'Utara', kota: 'Besi', air: 'Nila', kayu: 'Tlasih', burung: 'Gagak', pelindung: 'Wisnu' }
  }
};
