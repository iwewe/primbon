/**
 * Router sederhana berbasis jalur (History API). Server menyajikan index.html untuk jalur yang tidak dikenal,
 * jadi alamat langsung seperti /kalender tetap bekerja.
 */
export function buatRouter({ rute, akar, tidakAda, setelah }) {
  const normal = p => (p.replace(/\/+$/, '') || '/');
  let pertama = true;

  let terakhir = '';
  const kunci = () => location.pathname + location.search + location.hash;

  function gambar() {
    terakhir = kunci();
    const buka = rute[normal(location.pathname)] || tidakAda;
    akar.innerHTML = '';
    buka(akar);
    setelah(normal(location.pathname), pertama);
    if (!pertama) {
      if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
      else window.scrollTo(0, 0);
      akar.querySelector('h1[tabindex="-1"]')?.focus({ preventScroll: true });
    }
    pertama = false;
  }

  function navigasi(url, { ganti = false } = {}) {
    history[ganti ? 'replaceState' : 'pushState'](null, '', url);
    gambar();
  }

  document.addEventListener('click', e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    const href = a.getAttribute('href');
    if (!href.startsWith('/') || href.startsWith('//')) return;
    if (/\.[a-z0-9]{2,5}$/i.test(href.split('?')[0].split('#')[0])) return; // berkas statis (mis. /fonts/OFL.txt)
    e.preventDefault();
    navigasi(href);
  });
  // Alamat bisa berubah tanpa memuat ulang (tombol mundur, atau menempelkan tautan lain yang hanya beda fragmen): gambar ulang bila berbeda.
  const jikaBerubah = () => { if (kunci() !== terakhir) gambar(); };
  window.addEventListener('popstate', jikaBerubah);
  window.addEventListener('hashchange', jikaBerubah);
  return { navigasi, gambar };
}
