# ISMO Soft — Stack tecnológico y requerimientos del sitio web

---

## Resumen del proyecto

| Ítem | Detalle |
|---|---|
| **Tipo** | Sitio web institucional estático |
| **Framework** | Astro 4.x |
| **Modo de salida** | Static Site Generation (SSG) |
| **Estilos** | CSS puro con custom properties |
| **JavaScript** | Vanilla JS mínimo |
| **Deploy destino** | cPanel — subir `dist/` a `public_html/` |
| **Páginas** | 6 (Home, Servicios, Soluciones, Nosotros, Contacto, Privacidad) |

---

## Stack tecnológico

### Framework principal

**[Astro](https://astro.build) v4.16.18**

- Genera HTML/CSS/JS estático puro en `dist/`
- Sin JavaScript en el cliente salvo donde es explícitamente necesario
- Componentes `.astro` con scoped styles
- Integrado con Vite para bundling y optimización

### Estilos

**CSS puro — design system propio** (`src/styles/global.css`)

- Variables CSS (`--token: value`) como sistema de tokens de diseño
- Sin frameworks CSS externos (sin Tailwind, Bootstrap, etc.)
- Paleta derivada del logotipo oficial de ISMO Soft
- Responsive con breakpoints en 720px y 900px

**Paleta de colores del brand:**

| Token | Valor | Uso |
|---|---|---|
| `--navy` | `#1e3461` | Botones primarios, énfasis |
| `--accent` | `#1d4ed8` | Links, badges, acentos |
| `--accent-light` | `#3b82f6` | Elementos secundarios |
| `--bg` | `#ffffff` | Fondo base |
| `--surface` | `#f8fafc` | Secciones alternadas |
| `--surface-blue` | `#eef2ff` | Hero, page heroes |
| `--text` | `#0f172a` | Texto principal |
| `--muted` | `#64748b` | Texto secundario |

### Tipografía

**Inter** — cargada desde Google Fonts (pesos: 400, 500, 600, 700)

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

### JavaScript

Vanilla JS mínimo, embebido en etiquetas `<script>` de los componentes Astro:

| Archivo | Funcionalidad |
|---|---|
| `Nav.astro` | Toggle menú hamburger (mobile) |
| `contacto.astro` | Validación de formulario de contacto |

**No hay dependencias JS externas** en el cliente.

### Imágenes y assets

| Archivo | Uso |
|---|---|
| `public/icono.png` | Favicon del sitio (app icon) |
| `public/imagenfull.png` | Logo horizontal (nav, footer, hero) |

### Herramientas de desarrollo

| Herramienta | Versión recomendada |
|---|---|
| Node.js | >= 18.x |
| npm | >= 9.x |
| Astro CLI | 4.16.18 |

---

## Estructura de archivos

```
ismoSoft/
├── astro.config.mjs          # Configuración de Astro (output: 'static')
├── package.json              # Dependencias
├── tsconfig.json             # TypeScript base config (requerido por Astro)
├── .gitignore
│
├── public/                   # Assets estáticos (copiados tal cual al build)
│   ├── icono.png             # Favicon
│   └── imagenfull.png        # Logo horizontal
│
└── src/
    ├── styles/
    │   └── global.css        # Design system completo
    │
    ├── layouts/
    │   └── Base.astro        # Shell HTML: <head>, Nav, slot, Footer
    │
    ├── components/
    │   ├── Nav.astro          # Navegación sticky con hamburger mobile
    │   └── Footer.astro       # Footer con logo y columnas de links
    │
    └── pages/                # Cada archivo = una ruta del sitio
        ├── index.astro       # / — Home
        ├── servicios.astro   # /servicios
        ├── soluciones.astro  # /soluciones
        ├── nosotros.astro    # /nosotros
        ├── contacto.astro    # /contacto
        └── privacidad.astro  # /privacidad
```

---

## Comandos de desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo en localhost:4321
npm run dev

# Generar build estático en dist/
npm run build

# Previsualizar el build localmente
npm run preview
```

---

## Requerimientos para deploy en cPanel

### Requisito mínimo del servidor

Servidor HTTP estático. No requiere PHP, Node.js, ni ningún runtime en el servidor.
El sitio es HTML/CSS/JS puro una vez construido.

### Proceso de deploy

1. Ejecutar `npm run build` en la máquina de desarrollo
2. El comando genera la carpeta `dist/` con todos los archivos del sitio
3. Subir **el contenido de `dist/`** (no la carpeta en sí) a `public_html/` vía FTP
4. El servidor sirve `index.html` para cada ruta (Astro genera `ruta/index.html`)

### Estructura generada en `dist/`

```
dist/
├── index.html
├── servicios/index.html
├── soluciones/index.html
├── nosotros/index.html
├── contacto/index.html
├── privacidad/index.html
├── icono.png
├── imagenfull.png
└── _astro/
    └── *.js   (bundles JS mínimos del sitio)
```

### Consideraciones de routing

Apache/cPanel sirve correctamente las rutas tipo `/servicios/` porque Astro genera
`servicios/index.html`. No se requiere `.htaccess` especial para el routing.

Si el sitio se aloja en un **subdirectorio** (ej: `dominio.com/ismosoft/`), agregar en `astro.config.mjs`:

```js
export default defineConfig({
  output: 'static',
  base: '/ismosoft',   // nombre del subdirectorio
});
```

---

## Formulario de contacto

El formulario en `/contacto` actualmente tiene **validación frontend únicamente**.
Para enviar los mensajes por email en producción se requiere una de estas opciones:

| Opción | Implementación |
|---|---|
| **PHP mailer** | Crear `contact.php` en cPanel y apuntar `action` del form ahí |
| **FormSubmit.co** | Servicio gratuito — cambiar `action` del form a `https://formsubmit.co/[email]` |
| **cPanel Webmail forms** | Configurar desde el panel de cPanel |

---

## Contenido del sitio

El archivo `contenido-sitio-web.md` contiene todo el texto del sitio estructurado con títulos H1/H2/H3,
listo como referencia para futuras ediciones o para versiones adicionales del sitio.

---

## Pendientes / próximos pasos sugeridos

- [ ] Reemplazar `[email@ismosoft.com]` por el email real en todo el sitio
- [ ] Configurar el formulario de contacto con backend (PHP o servicio externo)
- [ ] Configurar dominio en cPanel y subir `dist/`
- [ ] Agregar Google Analytics o similar si se requieren métricas
- [ ] Configurar sitemap y meta Open Graph para redes sociales

---

*Generado en el contexto del proyecto ISMO Soft — sitio web institucional v1.0*
