/* Terapkan pilihan tema sebelum halaman digambar, supaya tidak berkedip. Berkas terpisah agar CSP tidak perlu 'unsafe-inline'. */
try {
  var t = localStorage.getItem('primbon.tema');
  if (t === 'dark' || t === 'light') document.documentElement.setAttribute('data-theme', t);
} catch (e) { /* penyimpanan tidak tersedia */ }
