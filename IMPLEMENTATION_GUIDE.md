# GUÍA DE IMPLEMENTACIÓN - REDISEÑO BTS UX/UI

## ESTADO ACTUAL DEL PROYECTO

### Completado ✅
1. **Color System & Design Tokens**
   - Paleta morada BTS implementada en `tailwind.config.ts`
   - Variables CSS root configuradas en `globals.css`
   - Colores de soporte: verde (#4CAF50), dorado (#FFD700), rojo (#E74C3C)

2. **Header & Navigation Redesign**
   - Navbar rediseñado con morados elegantes
   - Links con subrayado hover animado
   - Mobile menu con gradiente y tipografía mejorada
   - Busca + Carrito + Usuario visibles en desktop

### Por Completar (En Orden de Prioridad)

## 📋 TAREAS PENDIENTES

### TAREA 3: Redesign Home Page & Hero
**Archivo**: `/app/page.tsx`

**Cambios necesarios**:
1. Hero Section:
   - Overlay morado degradado (en lugar de blanco)
   - Texto "Vive la Experiencia BTS" prominente
   - CTAs: "Comprar Entradas" (morado sólido) + "Unirse a ARMY" (outline morado)
   - Animación fade-in en textos

2. Featured Events Section:
   - Grid 3 columnas (desktop)
   - Cards de eventos con imagen, fecha, ubicación
   - Badges "PRÓXIMAMENTE" o "ENTRADAS DISPONIBLES"
   - Botón "Ver Detalles" con hover morado

3. Tienda Preview:
   - Carrusel de 4-5 productos
   - Cada producto: imagen, nombre, precio, "Añadir al Carrito"
   - Link "Ver Tienda Completa" al final

4. Membresía Section:
   - 3 tarjetas: Básico | Platino | VIP
   - Platino con badge "MÁS POPULAR"
   - Beneficios en checkmarks
   - Precios destacados en morado

5. Blog Section:
   - Grid 3 artículos últimos
   - Fecha, resumen, "Leer Más"

6. Newsletter CTA:
   - Input email + botón "Suscribirse"
   - Mensaje: "Recibe notificaciones de nuevas entradas"

**Componentes a crear/modificar**:
- `components/HeroSection.tsx` (nuevo)
- `components/FeaturedEventsSection.tsx` (nuevo)
- `components/MembershipCards.tsx` (nuevo)
- `components/BlogPreview.tsx` (nuevo)
- `components/NewsletterCTA.tsx` (nuevo)

---

### TAREA 4: Redesign Eventos Pages
**Archivos**: 
- `/app/eventos/page.tsx`
- `/app/eventos/[id]/page.tsx`

**Cambios necesarios**:

#### Eventos List (/eventos)
1. Header sticky con filtros:
   - Dropdown: País
   - Dropdown: Ordenar (Próximos, Populares, Precio)
   - Toggle: Grid/Lista view
   - Contador: "X eventos encontrados"

2. Sidebar filtros (desktop):
   - Date range picker
   - Slider de precio
   - Radio buttons tipo evento
   - Checkboxes ubicación
   - Checkbox disponibilidad

3. Grid de eventos:
   - Cada card: imagen, badge, nombre, fecha, ubicación, precio
   - Hover: sombra aumenta + botón "Comprar Entradas" aparece

#### Detalle Evento (/eventos/[id])
1. Breadcrumb
2. Imagen hero full-width
3. Información del evento (ratings, descripción)
4. **Selector de Entrada (CRÍTICO)**:
   - Paso 1: FECHA (calendar picker, si múltiples)
   - Paso 2: ZONA/SECTOR (mapa interactivo del stadio)
   - Paso 3: FASE (Preventa ARMY, Preventa General, Venta General)
   - Resumen lateral: evento, fecha, zona, cantidad, precio total

5. Botón "Continuar al Carrito"

**Componentes a crear**:
- `components/EventsFilterSidebar.tsx` (nuevo)
- `components/EventCard.tsx` (nuevo)
- `components/DatePicker.tsx` (nuevo)
- `components/StadiumMap.tsx` (nuevo)
- `components/TicketPhaseSelector.tsx` (nuevo)

---

### TAREA 5: Redesign Tienda Pages
**Archivos**:
- `/app/tienda/page.tsx`
- `/app/tienda/[slug]/page.tsx`
- `/app/tienda/cart/page.tsx`

**Cambios necesarios**:

#### Tienda List (/tienda)
1. Grid de productos 4 columnas (desktop)
2. Cada card: imagen con hover zoom, nombre, rating, precio
3. Badges: "NUEVO", "OFERTA"
4. Stock bajo en rojo
5. Botón "Añadir al Carrito" + "Ver Detalles"
6. Filtros laterales: categoría, precio, disponibilidad

#### Detalle Producto (/tienda/[slug])
1. Breadcrumb
2. Galería de imágenes (left)
3. Información (right):
   - Nombre (H1)
   - Rating + reviews
   - Precio (grande, morado)
   - Descripción
   - Especificaciones
   - Selector cantidad
   - Stock info
   - CTAs: "Añadir al Carrito" + "Guardar para Después"
   - Info envío gratis + garantía

#### Carrito (/tienda/cart)
1. Breadcrumb
2. Columna izquierda - Items del carrito:
   - Cada item: foto, nombre, detalles, precio
   - Botón X eliminar
   - Spinbox cambiar cantidad
3. Columna derecha - Resumen (sticky):
   - Subtotal, descuentos, impuestos, TOTAL
   - Opción pago completo vs cuotas
   - Si cuotas: dropdown 3/6/12 cuotas, muestra cálculo
   - Botón "Proceder al Pago"

**Componentes a crear**:
- `components/ProductCard.tsx` (nuevo)
- `components/ImageGallery.tsx` (nuevo)
- `components/CartItem.tsx` (nuevo)
- `components/CartSummary.tsx` (nuevo)
- `components/InstallmentSelector.tsx` (nuevo)

---

### TAREA 6: Redesign Blog & Legal Pages
**Archivos**:
- `/app/blog/page.tsx`
- `/app/blog/[slug]/page.tsx`
- `/app/legal/*/page.tsx`

**Cambios necesarios**:

#### Blog List (/blog)
1. Featured post grande con imagen
2. Grid 3 columnas posts
3. Sidebar: búsqueda, categorías, posts recientes
4. Cards post: imagen, categoría badge, fecha, título, resumen, "Leer Más"

#### Blog Post Detail (/blog/[slug])
1. Imagen hero
2. Breadcrumb
3. Título (H1), meta info (fecha, autor, categoría, tiempo lectura)
4. Contenido formateado
5. Share buttons redes sociales
6. Posts relacionados abajo
7. CTA newsletter

#### Legal Pages
1. Estructura limpia: breadcrumb, H1, tabla contenidos, contenido
2. Links internos si menciona otros docs

**Componentes a crear**:
- `components/BlogCard.tsx` (nuevo)
- `components/FeaturedPost.tsx` (nuevo)
- `components/BlogSidebar.tsx` (nuevo)
- `components/ShareButtons.tsx` (nuevo)

---

### TAREA 7: Redesign Membresía & Forms
**Archivos**:
- `/app/comprar-membresia-bts/page.tsx`
- `/app/unirse/page.tsx`
- `/app/registro-whatsapp/page.tsx`

**Cambios necesarios**:

#### Membresía (/comprar-membresia-bts)
1. Titulo + intro
2. 3 Tarjetas Plans lado a lado:
   - **Tarjeta 1 - ARMY Básico**: $9.999/mes, beneficios, botón outline
   - **Tarjeta 2 - ARMY Platino**: $19.999/mes, badge "MÁS POPULAR", botón morado oscuro
   - **Tarjeta 3 - ARMY VIP**: $49.999/mes, badge "PREMIUM", botón dorado
3. FAQ Acordeón
4. Si logueado: mostrar plan actual + opciones cambiar

#### Unirse (/unirse)
1. Formulario registro: email, contraseña, país
2. Checkboxes: términos, notificaciones ARMY
3. Botón "Crear Cuenta" morado
4. Link "¿Ya tienes cuenta? Inicia sesión"
5. Tras submit: confirmación con CTA "Comprar Entradas"

#### WhatsApp (/registro-whatsapp)
1. Card minimalist: teléfono input
2. Checkbox aceptación
3. Botón "Activar WhatsApp" (verde #25D366)
4. QR code opcional
5. Tras submit: "¡Listo! Confirma en WhatsApp"

**Componentes a crear**:
- `components/MembershipPlanCards.tsx` (nuevo)
- `components/MembershipFAQ.tsx` (nuevo)
- `components/RegistrationForm.tsx` (nuevo)
- `components/WhatsAppForm.tsx` (nuevo)

---

### TAREA 8: Redesign Popups & Modals
**Archivos**:
- `/components/PopupManager.tsx`
- Crear nuevos componentes popup

**Popups a implementar**:
1. **Newsletter Popup**: fade-in a los 10s
2. **Promotional Popup**: morado, con countdown timer
3. **Success Confirmation**: confetti morado sutil, checkmark animado
4. **Error/Validation**: icono alerta, mensaje claro
5. **Terms Modal**: scrollable, checkbox aceptación
6. **Community Counter**: "X ARMY en línea"

**Componentes a crear**:
- `components/NewsletterPopup.tsx` (nuevo)
- `components/PromoPopup.tsx` (nuevo)
- `components/SuccessPopup.tsx` (nuevo)
- `components/ErrorPopup.tsx` (nuevo)

---

### TAREA 9: Optimize Performance & SEO
**Checklist**:
- [ ] Verificar imágenes tienen alt text descriptivo
- [ ] Revisar no hay H1 duplicados por página
- [ ] Validar estructura de breadcrumbs
- [ ] Asegurar responsive en todos breakpoints
- [ ] Optimizar velocidad de carga (lazy loading, compresión)
- [ ] Validar WCAG 2.1 AA contrast ratios
- [ ] Keyboard navigation completa
- [ ] Mobile performance (Lighthouse)

---

### TAREA 10: Final Testing & Polish
**Checklist**:
- [ ] Testear todos los flows críticos (compra, membresía)
- [ ] Verificar consistency visual en todas las páginas
- [ ] Probar responsive en múltiples devices
- [ ] Validar animaciones suaves y performantes
- [ ] Testing accesibilidad completo
- [ ] Cross-browser testing

---

## 🎨 PATRONES DE DISEÑO A MANTENER

### Colors
- Morado Principal: `#9B59B6` (botones, highlights, borders)
- Morado Oscuro: `#6C3A7C` (hover, active, accents)
- Morado Claro: `#D4A5D4` (backgrounds sutiles, borders suaves)
- Neutros: Blanco, grises, #1A1A1A para texto

### Typography
- Headlines: Fuerte, uppercase cuando apropiado, kerning perfecto
- Body: 16px, line-height 1.6, legible
- Precios: Tamaño mayor (20-24px), peso bold, morado

### Layout Method Priority
1. Flexbox para layouts (items-center, justify-between, gap-*)
2. CSS Grid solo para layouts 2D complejos
3. NUNCA floats o absolute positioning (salvo excepciones)

### Responsive
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Desktop: 4 columnas, Tablet: 2-3 columnas, Mobile: 1-2 columnas

### Microinteracciones
- Button hover: morado oscuro + sombra (0.3s)
- Input focus: border morado + glow sutil
- Card hover: sombra aumenta (0.2s)
- Página transition: fade suave (0.2s)

---

## 🔧 HERRAMIENTAS ÚTILES

### Colores CSS
```css
--bts-purple: #9B59B6;
--bts-purple-dark: #6C3A7C;
--bts-purple-light: #D4A5D4;
--success: #4CAF50;
--warning: #FFD700;
--error: #E74C3C;
```

### Tailwind Classes
```
- text-bts-purple, bg-bts-purple
- hover:text-bts-purple, hover:bg-bts-purple-dark
- border-bts-purple
- shadow-purple-glow
- bg-bts-gradient
```

### Common Button Pattern
```tsx
className="bg-bts-purple hover:bg-bts-purple-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
```

### Common Card Pattern
```tsx
className="bg-white rounded-lg border border-bts-purple-light/20 shadow-card hover:shadow-card-hover p-6 transition-all duration-300"
```

---

## 📝 NOTAS IMPORTANTES

1. **SEO PRESERVATION**: No modificar URLs, meta descriptions, structured data (schema.org) a menos que haya crítica bug
2. **ARMY Friendly**: Mensajes cálidos, referencias sutiles (💜), sensación de comunidad
3. **Accesibilidad**: WCAG 2.1 AA compliance (contrast 4.5:1, focus estados visibles)
4. **Performance**: Lazy load imágenes, optimize assets, monitor Lighthouse
5. **Mobile First**: Diseñar mobile primero, luego mejorar en desktop

---

## 🚀 PRÓXIMOS PASOS

1. Leer este documento en la siguiente sesión de trabajo
2. Comenzar con TAREA 3 (Home Page)
3. Seguir el orden de tareas para coherencia
4. Testear después de cada tarea mayor
5. Hacer deploy incremental, no todo de una

---

**Última Actualización**: 2026-02-04
**Estado General**: 20% Completado (Color System + Header)
**Próxima Tarea**: Redesign Home Page & Hero
