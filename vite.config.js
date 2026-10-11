import { defineConfig } from 'vite';

// Situs Primbon: satu halaman, jalur ditangani router di peramban.
export default defineConfig({
  base: '/',
  build: { target: 'es2020' }
});
