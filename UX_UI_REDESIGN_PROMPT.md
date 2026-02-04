# PROMPT REDISEÑO COMPLETO BTS - EXPERTO UX/UI

## CONTEXTO GENERAL
Eres un experto UX/UI designer de clase mundial con experiencia en plataformas musicales, eventos en vivo, y comunidades de fandom. Has trabajado en proyectos como Dice.fm, Ticketmaster, y plataformas de venta de entradas premium. Tu misión es rediseñar completamente la interfaz de usuario de la plataforma BTS manteniendo la excelencia SEO actual.

## IDENTIDAD VISUAL - COLOR MORADO BTS

### Paleta de Colores Definitiva:
- **Morado Principal BTS**: #9B59B6 (vibrante, energético, representa la identidad BTS)
- **Morado Oscuro Accent**: #6C3A7C (para elementos de enfoque y hover states)
- **Morado Claro**: #D4A5D4 (para fondos sutiles y elementos secundarios)
- **Neutral Base**: #FFFFFF (fondos limpios y contenido)
- **Neutral Oscuro**: #1A1A1A (textos, bordes, elementos de contraste)
- **Gris Suave**: #F5F5F5 (secciones alternadas, cards)
- **Accent Dorado**: #FFD700 (highlights especiales, promociones, "LIMITED EDITION")
- **Accent Verde**: #4CAF50 (confirmaciones, disponibilidad, "EN STOCK")
- **Accent Rojo**: #E74C3C (descuentos, alertas importantes)

### Combinaciones de Colores:
- Degradados Armoniosos: Morado #9B59B6 → Morado Oscuro #6C3A7C
- Fondos: Blanco limpio con sutiles líneas en Morado Claro #D4A5D4 (máximo 5% opacidad)
- Textos sobre Morado: Blanco (#FFFFFF) con sombras sutiles
- Interactividad: Morado Principal con transiciones suaves de 0.3s

## PRINCIPIOS DE DISEÑO

### 1. ESTILO VISUAL (Inspirado en Dice.fm + BTS)
- Diseño moderno, minimalista pero con personalidad
- Cards con bordes suaves y sombras elevadas
- Tipografía limpia y legible (sans-serif premium)
- Uso estratégico de espacio en blanco
- Microinteracciones fluidas y satisfactorias
- Íconos personalizados con toque BTS
- Animaciones sutil que no distraigan del contenido

### 2. AMIGABILIDAD CON ARMY (Fandom BTS)
- Lenguaje cálido y cercano, sin ser condescendiente
- Referencias sutiles a ARMY (purple hearts 💜, "Borahae")
- Popups/Modales con mensajes motivacionales personalizados
- Notificaciones celebratorias cuando se completan compras
- Comunidad integrada: mostrar cantidad de ARMY presentes
- Easter eggs pequeños y divertidos para los fans hardcore
- Accesibilidad total: soporte para múltiples idiomas (español, inglés, etc)

### 3. ESTRUCTURA UX - NAVEGACIÓN
- Header fijo responsive con:
  - Logo BTS centered en mobile, left en desktop
  - Navegación clara: Home | Eventos | Tienda | Blog | Membresía | Contacto
  - Carrito flotante con badge de cantidad
  - Search bar integrado
  - Selector de país/idioma (arriba a la derecha)

- Breadcrumbs en todas las páginas excepto home
- Footer restructurado con links importantes y newsletter signup
- Mobile: Hamburger menu con navegación vertical clara

## REDISEÑO POR SECCIÓN

### 1. PÁGINA HOME (/)
**Objetivo**: Impacto visual inmediato, clara jerarquía de contenido

- **Hero Section**:
  - Imagen de fondo épica (BTS en concierto)
  - Overlay morado degradado (semi-transparent)
  - Texto Hero: "Vive la Experiencia BTS" con animación fade-in
  - CTA Principal: "Comprar Entradas" (botón Morado #9B59B6)
  - CTA Secundario: "Unirse a ARMY" (botón outline morado)

- **Featured Events (Sección 2)**:
  - Grid de eventos próximos (3 columnas en desktop, 1 en mobile)
  - Cada card de evento incluye:
    - Imagen del evento
    - Título del concierto
    - Fecha y ubicación en texto gris
    - Ícono de pin de ubicación
    - Botón "Ver Detalles" (hover: morado oscuro)
    - Badge "PRÓXIMAMENTE" o "ENTRADAS DISPONIBLES"
    - Precio desde (si aplica)

- **Sección Tienda**:
  - Carrusel de productos destacados
  - 4-5 productos más vendidos
  - Cada producto: imagen, nombre, precio, botón "Añadir al Carrito"
  - CTA final: "Ver Tienda Completa"

- **Sección Membresía**:
  - Beneficios de ser miembro ARMY Premium
  - 3 tarjetas: Básico | Platino | VIP
  - Precios y beneficios claros
  - Botón "Más Información" o "Comprar Ahora"

- **Blog Section**:
  - Últimos 3 artículos en cards horizontales
  - Imagen, título, fecha, resumen, botón "Leer Más"
  
- **CTA Newsletter**:
  - "Mantente Actualizado" 
  - Input email + botón "Suscribirse"
  - Mensaje: "Recibe notificaciones de nuevas entradas"

### 2. PÁGINA EVENTOS (/eventos)
**Objetivo**: Facilitar la selección y compra de entradas con máxima claridad

#### Header de Filtros:
- Sección superior sticky con:
  - "Filtrar por" - Dropdown País
  - "Ordenar por" - Dropdown (Próximos, Más Populares, Precio)
  - Vista Grid/Lista toggle
  - Contador: "X eventos encontrados"

#### Estructura Principal:
- **Lado Izquierdo (Desktop) - Filtros Avanzados**:
  - Fechas (date range picker)
  - Precio (slider)
  - Tipo de Evento (radio buttons)
  - Ubicación (checkboxes)
  - Disponibilidad (Solo con entradas disponibles)

- **Lado Derecho - Grid de Eventos**:
  - Cada card evento contiene:
    - Imagen grande del evento
    - Overlay con badge "SOLDOUT" o "ENTRADAS DISPONIBLES"
    - Información superpuesta (abajo a la derecha):
      - Artista/Evento
      - Fecha completa (ej: "25 de Marzo de 2026")
      - Ubicación (ej: "Estadio Nacional, México DF")
      - Precio desde: "$45.000"
    - Hover effect: Sombra aumenta, botón "Comprar Entradas" aparece con animación

#### Página de Detalle de Evento (/eventos/[id]):
- Breadcrumb: Home > Eventos > Nombre del Evento
- Imagen hero del evento (full width)
- Sección de Información:
  - Nombre del evento (H1)
  - Estrellas de rating (si aplica) + comentarios
  - Descripción detallada del evento

- **Selector de Entrada (Lo más importante)**:
  - Título: "Selecciona tu Entrada"
  - 3 Pasos Claramente Indicados:
    1. Selecciona FECHA (si hay múltiples fechas)
    2. Selecciona ZONA/SECTOR
    3. Selecciona FASE DE VENTA

  - **PASO 1 - FECHA**:
    - Si múltiples fechas: Calendar picker horizontal con 3 meses visibles
    - Cada fecha muestra disponibilidad en pequeño texto
    - Fechas sin entradas: grises y no clickeables
    - Selección actual: highlight morado con checkmark

  - **PASO 2 - ZONA/SECTOR**:
    - Mapa interactivo del estadio/venue
    - Al hacer hover sobre una sección: resalta en morado y muestra nombre
    - Cuando haces click: muestra en overlay:
      - Nombre del sector
      - Capacidad (ej: "250 asientos disponibles")
      - Precio (ej: "$45.000 por entrada")
      - "Seleccionar este Sector" botón

  - **PASO 3 - FASE**:
    - Mostrar diferentes fases de venta (si existen):
      - Preventa Exclusiva ARMY ✓ (morado oscuro)
      - Preventa General ✓ (morado)
      - Venta General (gris si no disponible aún)
    - Cada fase muestra:
      - Nombre de fase
      - Periodo de fechas
      - Precio especial si hay (descuento)
      - Disponibilidad ("X entradas restantes")

  - **Resumen de Selección**:
    - Recuadro lateral (desktop) o expandible (mobile) con:
      - Evento: [Nombre]
      - Fecha: [25 de Marzo 2026]
      - Zona: [Zona VIP - Platea Baja]
      - Cantidad: [Spinbox 1-10]
      - Precio unitario: $45.000
      - Subtotal: $450.000
      - Botón "Continuar al Carrito" (prominent morado)

### 3. PÁGINA CARRITO (/tienda/cart)
**Objetivo**: Experiencia clara, segura y simple

- Breadcrumb: Home > Carrito
- Título: "Tu Carrito" con contador
- 2 Columnas (Desktop):

  **Columna Izquierda - Items del Carrito**:
  - Cada item muestra:
    - Foto/miniatura del evento o producto
    - Nombre del item
    - Detalles (fecha, zona, cantidad, etc)
    - Precio individual
    - Botón X para eliminar (rojo tenue)
    - Botón para cambiar cantidad (con spinbox)
  - Cada item es un card limpio con línea divisoria
  
  **Columna Derecha - Resumen (Sticky)**:
  - "Resumen del Pedido"
  - Subtotal
  - Descuentos aplicados (si hay)
  - Impuestos (si aplica)
  - Total PROMINENTE (grande, morado)
  - Opciones de Pago:
    - Opción 1: "Pago Completo" (default)
    - Opción 2: "Pagar en Cuotas" (con dropdown)
      - "3 cuotas sin interés"
      - "6 cuotas sin interés"
      - "12 cuotas sin interés"
      - Muestra calculado: "3 x $50.000"
  - Botón "Proceder al Pago" (grande, morado)
  - Link "Continuar Comprando" (debajo)

### 4. PÁGINA CHECKOUT (Pago)
**Objetivo**: Minimizar fricción, maximizar confianza

- Indicador de progreso (3 pasos):
  1. Datos Personales (actual ✓)
  2. Información de Pago
  3. Confirmación

- **Paso 1: Datos Personales**:
  - Nombre Completo (input)
  - Email (input con validación)
  - Teléfono (input con código país)
  - Seleccionar País de Envío (si aplica)
  - Checkbox: "Recibir notificaciones ARMY"
  - Botón "Siguiente"

- **Paso 2: Método de Pago**:
  - Seleccionar Método:
    - Tarjeta Crédito/Débito
    - PayPal
    - Billetera Digital (Plin, etc)
  - Si Tarjeta:
    - Número de Tarjeta (con validación visual)
    - Nombre en Tarjeta
    - Fecha Vencimiento (MM/AA)
    - CVV
  - Si Cuotas Seleccionadas:
    - Mostrar claramente: "Pagarás en 3 cuotas de $50.000"
    - Botón "Confirmar Cuotas"
  - Icono de candado + "Pago Seguro"
  - Botón "Confirmar Pago"

- **Paso 3: Confirmación**:
  - ✓ Éxito (con animación confetti sutil morada)
  - Número de Confirmación (copiable)
  - Email de confirmación enviado
  - Resumen de compra:
    - Items comprados
    - Total pagado
    - Fecha de confirmación
  - Botones:
    - "Descargar Recibo"
    - "Volver al Home"

### 5. PÁGINA TIENDA (/tienda)
**Objetivo**: Experiencia de compra intuitiva y atractiva

- Header igual a eventos
- Grid de Productos:
  - 4 columnas (desktop), 2 (tablet), 1 (mobile)
  - Cada card producto:
    - Imagen grande con hover zoom
    - Badge "NUEVO" o "OFERTA" (morado/dorado)
    - Nombre del producto
    - Rating (estrellas)
    - Precio (grande)
    - "Precio original" tachado si hay descuento
    - Botón "Añadir al Carrito" (morado)
    - Botón "Ver Detalles" (outline morado)
    - Stock disponible ("Solo 5 disponibles" en rojo si bajo)

- **Filtros Laterales** (igual a eventos):
  - Categoría
  - Rango de Precio
  - Disponibilidad

- **Página Detalle Producto** (/tienda/[slug]):
  - Breadcrumb: Home > Tienda > Categoría > Producto
  - Galería de imágenes (left)
  - Información Producto (right):
    - Nombre (H1)
    - Rating + reviews count
    - Precio (grande, morado)
    - Descripción
    - Especificaciones (talla, material, etc)
    - Selector de Cantidad
    - Stock (ej: "5 disponibles")
    - CTA: "Añadir al Carrito" (grande, morado)
    - CTA Secundario: "Guardar para Después"
    - Info de Envío: "Envío gratis a todo el país"
    - Garantía de Satisfacción

### 6. PÁGINA BLOG (/blog)
**Objetivo**: Contenido atractivo, fácil navegación

- Header: "Blog BTS - Noticias y Updates"
- Sección destacada (featured post):
  - Imagen grande
  - Categoría badge
  - Título (H2)
  - Fecha
  - Autor (si aplica)
  - Resumen
  - "Leer Artículo Completo"

- Grid de posts (3 columnas):
  - Cada card:
    - Imagen
    - Categoría badge (morado)
    - Fecha
    - Título
    - Resumen (2-3 líneas)
    - Link "Leer Más"

- Sidebar (desktop):
  - Búsqueda de posts
  - Categorías
  - Posts recientes

- **Página Detalle Post** (/blog/[slug]):
  - Imagen hero del post
  - Breadcrumb
  - Título (H1)
  - Meta info: Fecha, Autor, Categoría, Tiempo de lectura
  - Contenido formateado
  - Share buttons (redes sociales)
  - Posts relacionados abajo
  - CTA al final: "No te pierdas las próximas noticias"

### 7. PÁGINA MEMBRESÍA (/comprar-membresia-bts)
**Objetivo**: Vender planes claramente, mostrar valor

- Breadcrumb: Home > Membresía
- Título: "Únete a la Membresía ARMY Oficial"
- Introducción: "Acceso exclusivo a eventos, descuentos y contenido especial"

- **3 Tarjetas de Planes** (lado a lado en desktop):

  **Tarjeta 1 - ARMY Básico** (gris suave):
  - Precio: "$9.999/mes"
  - Beneficios:
    - ✓ Acceso a previsualizaciones
    - ✓ Descuento 5% en tienda
    - ✓ Newsletter exclusivo
  - Botón: "Elegir Plan" (outline morado)

  **Tarjeta 2 - ARMY Platino** (morado claro, highlighted):
  - Badge: "MÁS POPULAR" (dorado)
  - Precio: "$19.999/mes"
  - Beneficios:
    - ✓ Todos del Básico
    - ✓ Preventa Exclusiva (48h antes)
    - ✓ Descuento 15% en tienda
    - ✓ Acceso a eventos privados
  - Botón: "Elegir Plan" (morado oscuro, más prominent)

  **Tarjeta 3 - ARMY VIP** (morado oscuro):
  - Badge: "PREMIUM" (dorado)
  - Precio: "$49.999/mes"
  - Beneficios:
    - ✓ Todos del Platino
    - ✓ Experiencias VIP
    - ✓ Meet & Greet (cuando disponible)
    - ✓ Descuento 25% en tienda
    - ✓ Envío gratis
  - Botón: "Elegir Plan" (dorado)

- Sección FAQ abajo:
  - Preguntas frecuentes sobre membresía
  - Acordeón expandible

- **Página Gestión Membresía** (si user logueado):
  - Mi Plan Actual
  - Opciones: Cambiar Plan / Cancelar
  - Historial de Beneficios Usados
  - Próximas Ventajas

### 8. PÁGINA UNIRSE (/unirse)
**Objetivo**: Convertir visitantes en miembros de comunidad

- Título Atractivo: "Únete a la Comunidad ARMY"
- Forma de Registro:
  - Email (input)
  - Contraseña (input, validación de seguridad)
  - Confirmar Contraseña
  - País (dropdown)
  - Checkbox: Acepto Términos
  - Checkbox: Quiero recibir notificaciones ARMY 💜
  - Botón "Crear Cuenta" (grande, morado)
  - Link: "¿Ya tienes cuenta? Inicia sesión"

- Después de registro:
  - Mensaje celebratorio: "¡Bienvenido a ARMY! 💜"
  - Email de confirmación enviado
  - Opción: "Comprar Entradas Ahora" o "Explorar Tienda"

### 9. PÁGINA REGISTRO WHATSAPP (/registro-whatsapp)
**Objetivo**: Lead generation simple

- Formulario minimalist:
  - Título: "Recibe Noticias BTS en WhatsApp"
  - Input: Número de Teléfono (con validación país)
  - Checkbox: Acepto recibir mensajes
  - Botón: "Activar WhatsApp" (verde WhatsApp #25D366)
  - QR Code opcional debajo
  - Tras submit: "¡Listo! Confirma en WhatsApp"

### 10. PÁGINAS LEGALES (/legal/*)
**Objetivo**: Transparencia, legal compliance

- Estructura limpia:
  - Breadcrumb
  - Título (H1)
  - Tabla de contenidos (si es largo)
  - Contenido formateado
  - Links internos si menciona otras políticas

## DISEÑO DE POPUPS Y MODALES

### 1. Popup Newsletter (Entrada a site)
- Aparece después de 10s o 30% scroll
- Diseño card elevado (sombra morada):
  - Título: "No te pierdas las noticias BTS"
  - Input Email
  - Botón "Suscribirse" (morado)
  - Link "Recordarme más tarde" (gris)
  - Icono X para cerrar
- Animación: fade-in suave

### 2. Popup Promocional
- Aparece al evento próximo o descuento:
  - Banner con fondo morado degradado
  - Texto: "¡PREVENTA EXCLUSIVA ARMY!"
  - Countdown timer (si aplica)
  - Botón "Comprar Ahora" (dorado)
  - Suscriptores ARMY: "Tienes acceso especial 48h antes"

### 3. Popup de Confirmación Compra (success)
- Animación confetti morado sutil
- ✓ Checkmark grande en morado
- "¡Compra Confirmada!"
- Número de referencia (copyable)
- "Hemos enviado un email a [email]"
- Botones:
  - "Descargar Recibo"
  - "Volver al Home"
- Mensaje especial ARMY: "¡Gracias por apoyar a los artistas! 💜"

### 4. Popup Error/Validación
- Icono ⚠️ en naranja/rojo
- Mensaje de error claro
- Sugerencia de qué hacer
- Botón "Intentar de Nuevo"

### 5. Popup Términos y Privacidad
- Modal large con scrollable contenido
- Título prominente
- Checkbox: "Acepto los términos"
- Botones: "Rechazar" (outline) / "Aceptar" (morado)

### 6. Popup Community/Members
- Muestra: "2.450 ARMY en línea ahora"
- Contador en tiempo real
- Icono: 💜
- Link: "Únete a la comunidad"

## HEADER DETALLADO (Todas las páginas)

### Desktop Header (fixed top):
```
[Logo BTS] [Nav: Home|Eventos|Tienda|Blog|Membresía|Contacto] 
                                          [🔍] [🛒 (3)] [País▼] [👤]
```

- Logo: 40px height, clickeable al home
- Nav items: 14px, gris oscuro, hover morado
- Search: expande al hacer click
- Cart badge: background morado, número blanco
- País: dropdown elegante
- Login icon: perfil con menu dropdown

### Mobile Header:
```
[Logo BTS]                                              [🔍] [🛒 (3)] [☰]
```

- Logo más pequeño (30px)
- Hamburger abre menu full-screen
- Search y cart igual
- Menu desplegado: overlay morado oscuro semi-transparent

## FOOTER REDESIGNED

- Background: #1A1A1A (oscuro profesional)
- Contenido en blanco
- 4 Columnas en desktop:
  1. Logo + Social Media Icons + Newsletter signup
  2. Quick Links (Home, Eventos, Tienda, Blog)
  3. Legal (Términos, Privacidad, Contacto)
  4. Community (Únete ARMY, Newsletter, WhatsApp)

- Mobile: Stack vertical, accordion para secciones

## MICROINTERACCIONES Y ANIMACIONES

- **Button Hover**: Fondo morado oscuro, sombra aumenta (0.3s)
- **Input Focus**: Border morado, glow sutil morado (box-shadow)
- **Card Hover**: Sombra aumenta, offset arriba 4px (0.2s)
- **Loading**: Spinner morado con animación suave
- **Success**: Checkmark con animación de "check" satisfactoria
- **Scroll Reveal**: Elementos fade-in sutil al scrollear
- **Página Transition**: Fade suave entre páginas (0.2s)

## TIPOGRAFÍA

- **Headlines (H1-H3)**: "Inter" o similar sans-serif bold, kerning perfecto
- **Body Text**: "Inter" o "Poppins" 16px, line-height 1.6
- **Prices**: Tamaño mayor (20-24px), morado, peso bold
- **CTAs**: 14px, weight 600, UPPERCASE lettering
- **Small Text**: 12px, gris oscuro, line-height 1.4

## ACCESIBILIDAD

- WCAG 2.1 AA compliance mínimo
- Contrast ratio 4.5:1 para texto
- Focus estados visibles (outline morado 2px)
- Alt text en todas las imágenes
- Labels en todos los inputs
- Soporte keyboard navigation (Tab, Enter, Esc)
- Aria labels para elementos complejos

## RESPONSIVE DESIGN

- **Desktop**: 1440px+
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

Breakpoints Tailwind:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

## SEO - MANTENER EXCELENCIA

### DO NOT MODIFY UNLESS CRITICAL BUG:
- Estructura de URLs actual (SEO friendly)
- Meta descriptions
- Open Graph tags
- Structured data (schema.org)
- Sitemap
- Robots.txt
- Breadcrumbs (estructura semántica)

### CRÍTICA SEO A CORREGIR (Si las encuentras):
- Imágenes sin alt text → AGREGAR alt descriptivos
- H1 duplicados por página → CONSOLIDAR a 1 por página
- Velocidad de página lenta → OPTIMIZAR assets
- Mobile responsiveness issues → FIJAR
- Links rotos → REPARAR

## FLUJOS DE USUARIO CRÍTICOS

### Flujo 1: Comprar Entradas (Completo)
1. Home → "Comprar Entradas"
2. Página Eventos (filtrar si quiere)
3. Click evento → Detalle evento
4. Selecciona Fecha → Zona → Fase
5. Especifica cantidad
6. "Continuar al Carrito"
7. Carrito (revisa, puede modificar)
8. "Proceder al Pago"
9. Checkout (datos → pago → confirmación)
10. Email confirmación + recibo

### Flujo 2: Compra en Cuotas
- En carrito: "Pagar en Cuotas"
- Selecciona cantidad de cuotas (3, 6, 12)
- Checkout igual pero muestra cuotas
- Primera cuota al confirmar, resto automático

### Flujo 3: Membresía
1. Home o Nav → "Membresía"
2. Ve 3 planes con beneficios
3. Click "Elegir Plan"
4. Si no logueado: redirige a registro
5. Si logueado: confirma plan
6. Pago (opción pago completo o cuotas)
7. Confirmación y bienvenida membresía

## IMPORTANCIA: RESPETO AL SEO

✅ NO MODIFICARÁS estructura de URLs
✅ NO TOCARÁS meta descriptions sin necesidad
✅ NO ELIMINARÁS structured data
✅ MANTENDERÁS semantic HTML
✅ RESPETARÁS breadcrumbs actuales
✅ PRESERVARÁS sitemap.ts lógica

❌ SOLO MODIFICARÁS SEO si:
- Hay H1 duplicados
- Faltan alt texts en imágenes
- Hay links rotos que detectas
- Meta descriptions están vacías
- Mobile responsiveness es crítica

## EXPORTABLES Y DELIVERABLES

- Componentes reutilizables (Buttons, Cards, Forms)
- Sistema de colores en Tailwind tokens
- Iconografía consistente
- Guía de microinteracciones
- Responsive en todos los breakpoints
- Accesibilidad AA compliance
- Performance optimizado

---

## RESUMEN EJECUTIVO

El rediseño BTS es una transformación de UX/UI manteniendo identidad morada vibrante, inspirado en plataformas premium como Dice.fm, con especial atención a:

1. **Claridad en Venta de Entradas**: Flujo de 3 pasos obvious (Fecha → Zona → Fase)
2. **Amigabilidad ARMY**: Popups cálidos, mensajes motivacionales, comunidad visible
3. **Compra en Cuotas**: Transparencia total, cálculo visible, confianza
4. **Diseño Premium**: Morado hermoso, transiciones fluidas, espacios limpios
5. **Todos los Headers**: Navegación consistente, búsqueda y carrito siempre visibles
6. **SEO Untouched**: Solo correcciones críticas, estructura URL preservada

---

**NOTA FINAL**: Este es un rediseño completo pero respetando la arquitectura y SEO existente. Enfócate en transformar la experiencia visual y de usuario mientras proteges los assets digitales y la visibilidad en buscadores que ya funcionan.
