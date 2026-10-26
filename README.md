# Huevos La Loma Escondida — sitio web

Sitio estático multipágina para la marca **Huevos La Loma Escondida** (Pasco, Perú).
Está construido únicamente con **HTML5, CSS3 y JavaScript vanilla**. No usa frameworks,
CDN, fuentes externas ni procesos de compilación.

## Estructura

```text
webLoma/
├── index.html                 Inicio
├── nosotros.html              Historia, quiénes somos, misión, visión y valores
├── producto.html              Producto, tamaños M/L/XL, beneficios, cómo pedir y FAQ
├── contacto.html              WhatsApp, ubicación, redes y formulario → WhatsApp
├── css/
│   └── styles.css             Estilos, diseño responsive y componentes
├── js/
│   └── main.js                Menú, idiomas ES/EN/QU, WhatsApp, animaciones
├── img/
│   ├── logoGG.png             Logo principal original (header)
│   ├── logoG.png              Emblema original (footer)
│   ├── favicon.png            Ícono del sitio
│   ├── apple-touch-icon.png   Ícono para iOS
│   ├── icon-512.png           Ícono de alta resolución
│   ├── og-cover.png           Portada para compartir en redes (1200 × 630)
│   ├── hero-sierra.svg        Ilustración referencial del hero
│   ├── nosotros-historia.svg  Ilustración referencial de la historia
│   ├── gallinas-libre.svg     Ilustración referencial de las gallinas
│   ├── huevos-detalle.svg     Ilustración referencial del producto
│   ├── sierra-atardecer.svg   Ilustración panorámica de fondo
│   ├── patron-topo.svg        Textura de curvas topográficas
│   └── trama-andina.svg       Franja decorativa andina
├── robots.txt
└── README.md
```

## Cómo previsualizar

1. Abre `index.html` con doble clic en el navegador. No necesita servidor.
2. Para probar con todas las comodidades del navegador (por ejemplo, persistencia del
   idioma entre páginas), puedes levantar un servidor estático desde esta carpeta:

   ```bash
   python -m http.server 8000
   ```

   Y visitar `http://localhost:8000`.

El sitio también funciona correctamente al abrir los archivos con `file://`.

## Funcionalidades incluidas

- Navegación responsive con menú hamburguesa en móvil y tablet.
- Selector de idioma **ES / EN / QU**:
  - **ES:** contenido original completo.
  - **EN:** traducción completa de los textos visibles y atributos accesibles.
  - **QU:** navegación y textos breves en quechua aproximado; los textos extensos se
    mantienen en español y se muestra el aviso **«Traducción al quechua en revisión»**.
  - El idioma se recuerda con `localStorage` cuando el navegador lo permite.
- Todos los pedidos se derivan al WhatsApp oficial **+51 989 166 447**.
- Botón flotante de WhatsApp en todas las páginas.
- Formulario de contacto que **no envía correos**: prepara un mensaje y abre WhatsApp.
- Enlaces de Facebook y TikTok dejados como placeholders editables (`href="#"`).
- SEO básico: título y descripción por página, Open Graph, Twitter Card, HTML semántico,
  imágenes con `alt`, datos estructurados `Farm`, `AboutPage`, `ContactPage` y `FAQPage`.
- Respeto de `prefers-reduced-motion` y navegación por teclado.

## Reemplazar las imágenes

Las ilustraciones actuales son **placeholders originales** (no fotos de stock) para que el
sitio se vea completo desde el primer día. En cada archivo HTML hay comentarios
`<!-- REEMPLAZAR: ... -->` junto a las imágenes.

Para usar fotografías reales de la granja:

1. Guarda la fotografía en `img/` con un nombre claro, por ejemplo `hero-finca.jpg`.
2. Cambia el atributo `src` de la imagen correspondiente en el HTML. Ejemplo:

   ```html
   <!-- Antes -->
   <img src="img/hero-sierra.svg" width="1600" height="1100" alt="..." data-i18n-alt="alt.hero" fetchpriority="high">

   <!-- Después -->
   <img src="img/hero-finca.jpg" width="1600" height="1100" alt="..." data-i18n-alt="alt.hero" fetchpriority="high">
   ```

3. Actualiza también el texto alternativo (`alt` y la traducción en `js/main.js`) si la
   foto muestra otra cosa.
4. Conserva las proporciones recomendadas y ajusta `width` y `height` según la imagen real
   para evitar saltos de maquetación:

| Uso | Archivo actual | Proporción recomendada |
|---|---|---|
| Hero de inicio | `hero-sierra.svg` | 1600 × 1100 (horizontal) |
| Historia | `nosotros-historia.svg` | 1100 × 1300 (vertical 4:5) |
| Gallinas | `gallinas-libre.svg` | 1200 × 900 (4:3) |
| Huevos | `huevos-detalle.svg` | 1200 × 900 (4:3) |
| Fondos internos / CTA | `sierra-atardecer.svg` | 1600 × 900 (16:9) |
| Portada para redes | `og-cover.png` | 1200 × 630 |

**No reemplaces** `logoGG.png` ni `logoG.png`: son los logos originales de la marca.

## Reemplazar los enlaces de Facebook y TikTok

Los enlaces están marcados con comentarios HTML para localizarlos fácilmente:

```html
<!-- Reemplazar con el enlace real de Facebook -->
<a href="#" data-placeholder-link ...>Facebook</a>

<!-- Reemplazar con el enlace real de TikTok -->
<a href="#" data-placeholder-link ...>TikTok</a>
```

Deben cambiarse en:

- El footer de **todas** las páginas (`index.html`, `nosotros.html`, `producto.html`, `contacto.html`).
- La tarjeta de redes de `contacto.html`.

Sustituye `href="#"` por la URL real. Si la página ya tiene el enlace real, puedes quitar
`data-placeholder-link`; si se deja, el aviso automático solo aparece cuando el enlace sigue
siendo `#`.

## Correo electrónico futuro

No se ha incluido ningún correo visible ni inventado. En `contacto.html` y en el footer hay
un comentario **«CORREO ELECTRÓNICO (APARTADO PARA EL FUTURO)»** con la estructura exacta
para agregar la tarjeta cuando exista un correo oficial. Busca ese comentario y reemplaza el
placeholder `AQUI_VA_EL_CORREO`.

## Editar traducciones

- El **texto base en español** está directamente en los archivos HTML.
- Las traducciones al **inglés** y la base de **quechua** están en `js/main.js`, dentro del
  objeto `translations`.
- Si cambias un texto español, conserva la clave `data-i18n` y actualiza su equivalente en
  `translations.en` (y `translations.qu` cuando corresponda).
- El aviso de quechua está controlado por el atributo `data-lang-note` y la clase
  `.lang-note`. No elimines el aviso mientras la traducción quechua siga en revisión.

## Cambiar el número de WhatsApp

El número está en:

- `js/main.js`: constante `WA_NUMBER`.
- Enlaces estáticos `https://wa.me/51989166447...` de los archivos HTML (header, CTAs,
  footer y botón flotante).
- El número visible `+51 989 166 447` en `contacto.html` y en los bloques CTA/footer.

Actualiza **todas** las apariciones para no dejar enlaces desincronizados.

## SEO y dominio

Antes de publicar con un dominio definitivo:

1. Agrega la etiqueta canónica en cada página.
2. Convierte `og:image` y `twitter:image` en URLs absolutas, por ejemplo
   `https://tudominio.com/img/og-cover.png`.
3. Agrega un `sitemap.xml` con las URLs absolutas y referencia su ubicación en `robots.txt`.
4. Revisa que los datos estructurados sigan siendo fieles a la información real de la marca.

No se incluyeron certificaciones, premios, sellos orgánicos, años de experiencia ni cifras
de producción que no hayan sido proporcionados.
