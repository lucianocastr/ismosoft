import { defineConfig } from 'astro/config';

// Para deploy en cPanel: subir el contenido de dist/ a public_html/
// Si el sitio está en un subdirectorio, agregar: base: '/nombre-del-subdirectorio'

export default defineConfig({
  output: 'static',
  compressHTML: true,
});
