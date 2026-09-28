# ✅ CHECKLIST DE VERIFICACIÓN SEO - Post Deploy

## 🚀 PASOS INMEDIATOS DESPUÉS DEL DEPLOY

### 1. Verificar Renderizado de Hreflang Tags
**Acción**: Abrir el código fuente de cada página y verificar que los tags hreflang estén presentes.

```bash
# Verificar página de Perú
curl -s https://entradasbts.com/peru/ | grep -i "hreflang"

# Verificar página de Chile
curl -s https://entradasbts.com/chile/ | grep -i "hreflang"

# Verificar página de Brasil
curl -s https://entradasbts.com/brasil/ | grep -i "hreflang"
```

**✅ Resultado Esperado**: Deberías ver 9 líneas de hreflang (es, es-PE, es-CL, es-MX, es-CO, es-AR, es-ES, pt-BR, x-default)

---

### 2. Verificar Lang Attribute Dinámico

**Acción**: Verificar que el atributo `lang` del HTML sea correcto por país.

```bash
# Perú debe mostrar lang="es-PE"
curl -s https://entradasbts.com/peru/ | grep -i '<html'

# Brasil debe mostrar lang="pt-BR"
curl -s https://entradasbts.com/brasil/ | grep -i '<html'

# Chile debe mostrar lang="es-CL"
curl -s https://entradasbts.com/chile/ | grep -i '<html'
```

**✅ Resultado Esperado**:
- Perú: `<html lang="es-PE" dir="ltr">`
- Brasil: `<html lang="pt-BR" dir="ltr">`
- Chile: `<html lang="es-CL" dir="ltr">`

---

### 3. Verificar Geo Meta Tags

**Acción**: Verificar que los geo meta tags estén presentes.

```bash
# Verificar en Perú
curl -s https://entradasbts.com/peru/ | grep -i 'geo\.'

# Verificar en Brasil
curl -s https://entradasbts.com/brasil/ | grep -i 'geo\.'
```

**✅ Resultado Esperado**:
```html
<meta name="geo.region" content="PE">
<meta name="geo.placename" content="Lima">
```

---

### 4. Verificar Sitemaps

**Acción**: Verificar que ambos sitemaps sean accesibles.

```bash
# Sitemap principal
curl -I https://entradasbts.com/sitemap.xml

# Sitemap internacional
curl -I https://entradasbts.com/sitemap-i18n.xml

# Robots.txt
curl https://entradasbts.com/robots.txt
```

**✅ Resultado Esperado**: 
- Status 200 para ambos sitemaps
- robots.txt debe mostrar ambas líneas de Sitemap

---

## 🔍 VALIDACIÓN CON HERRAMIENTAS ONLINE

### 1. Google Rich Results Test

**URL**: https://search.google.com/test/rich-results

**Páginas a probar**:
- https://entradasbts.com/
- https://entradasbts.com/peru/
- https://entradasbts.com/chile/
- https://entradasbts.com/brasil/

**✅ Resultado Esperado**: 
- MusicEvent válido
- Breadcrumb válido
- Organization válido
- FAQPage válido
- Sin errores

---

### 2. Schema.org Validator

**URL**: https://validator.schema.org/

**Acción**: Pegar el código fuente completo de cada página.

**✅ Resultado Esperado**: Sin errores, solo warnings menores (aceptables)

---

### 3. Hreflang Checker

**URL**: https://www.sistrix.com/hreflang-validator/

**Acción**: Verificar cualquier página de país.

**✅ Resultado Esperado**:
- Todas las variantes presentes
- Return tags correctos
- x-default presente
- Sin errores

---

### 4. Meta Tags Inspector

**URL**: https://metatags.io/

**Páginas a probar**:
- https://entradasbts.com/peru/
- https://entradasbts.com/chile/
- https://entradasbts.com/brasil/

**✅ Resultado Esperado**:
- Preview de Open Graph correcto
- Twitter Card correcto
- Título y descripción apropiados

---

## 🎯 GOOGLE SEARCH CONSOLE

### 1. Agregar Propiedad

**Acción**:
1. Ir a Google Search Console
2. Agregar propiedad: https://entradasbts.com
3. Verificar dominio (varias opciones disponibles)

**Métodos de verificación**:
- HTML file upload
- DNS TXT record
- Google Analytics
- Google Tag Manager

---

### 2. Verificar Indexación

**Acción**: Una vez verificado el sitio.

1. Ir a "Páginas" (Pages)
2. Verificar que las páginas de país estén indexadas
3. Buscar errores de cobertura

**Páginas críticas a monitorear**:
- /peru/
- /chile/
- /brasil/
- /mexico/
- /colombia/
- /argentina/
- /madrid/

---

### 3. Verificar Hreflang (International Targeting)

**Acción**:
1. Ir a "Legacy tools and reports" → "International Targeting"
2. Verificar la pestaña "Language"
3. Revisar errores de hreflang

**✅ Sin errores esperados**:
- No missing return tags
- No conflicting hreflang values
- No invalid language codes

---

### 4. Solicitar Indexación Manual

**Acción**: Para acelerar la indexación inicial.

1. Usar la herramienta "URL Inspection"
2. Ingresar cada URL de país
3. Clic en "Request Indexing"

**URLs a indexar manualmente**:
```
https://entradasbts.com/
https://entradasbts.com/peru/
https://entradasbts.com/chile/
https://entradasbts.com/brasil/
https://entradasbts.com/mexico/
https://entradasbts.com/colombia/
https://entradasbts.com/argentina/
https://entradasbts.com/madrid/
https://entradasbts.com/eventos/
```

---

## 🌍 TESTING CON VPN

### Objetivo
Verificar que Google muestra la página correcta según la ubicación del usuario.

### 1. Test desde Perú
**Setup**: VPN → Lima, Perú

**Búsqueda en Google**: "entradas bts 2026"

**✅ Resultado Esperado**: 
- Primer resultado debe ser https://entradasbts.com/peru/
- Título: "Entradas BTS Perú 2026 - Disponibles | Estadio San Marcos"
- Descripción en español (es-PE)

---

### 2. Test desde Chile
**Setup**: VPN → Santiago, Chile

**Búsqueda en Google**: "entradas bts chile 2026"

**✅ Resultado Esperado**:
- Primer resultado debe ser https://entradasbts.com/chile/
- Título: "Entradas BTS Chile 2026 - Compra Segura | Estadio Nacional Santiago"

---

### 3. Test desde Brasil
**Setup**: VPN → São Paulo, Brasil

**Búsqueda en Google**: "ingressos bts brasil 2026"

**✅ Resultado Esperado**:
- Primer resultado debe ser https://entradasbts.com/brasil/
- Título: "Ingressos BTS Brasil 2026 - Disponíveis | Estádio MorumBIS"
- Descripción en PORTUGUÉS

---

## 📊 MÉTRICAS A MONITOREAR

### Google Search Console (Semanalmente)

1. **Impresiones por país**
   - Performance → Countries
   - Verificar que Perú, Chile y Brasil estén aumentando

2. **CTR por página**
   - Performance → Pages
   - Monitorear /peru/, /chile/, /brasil/

3. **Errores de indexación**
   - Coverage → Excluded
   - Debe ser 0 errores

4. **Core Web Vitals**
   - Experience → Core Web Vitals
   - Todas las URLs deben estar en "Good"

---

### Google Analytics 4 (Semanalmente)

1. **Tráfico por país**
   - Reports → User → Demographics → Country
   - Verificar crecimiento de PE, CL, BR

2. **Páginas más vistas**
   - Reports → Engagement → Pages and screens
   - Verificar tráfico a páginas de país

3. **Bounce Rate**
   - Por página de país
   - Debería reducirse con contenido localizado

4. **Conversiones por país**
   - Si tienes eventos configurados
   - Monitorear conversiones de cada país

---

## 🐛 PROBLEMAS COMUNES Y SOLUCIONES

### Problema 1: Hreflang tags no aparecen en el HTML

**Diagnóstico**:
```bash
curl -s https://entradasbts.com/peru/ | grep 'hreflang'
```

**Posibles causas**:
- Build no completado
- Componente HreflangTags no importado
- Error de compilación

**Solución**:
1. Verificar que el build sea exitoso: `npm run build`
2. Verificar imports en `app/[country]/page.tsx`
3. Limpiar cache: `rm -rf .next && npm run build`

---

### Problema 2: Lang attribute no cambia por país

**Diagnóstico**:
```bash
curl -s https://entradasbts.com/brasil/ | grep '<html'
# Si muestra lang="es" en lugar de "pt-BR"
```

**Posibles causas**:
- Middleware no está funcionando
- Header x-lang no se pasa correctamente

**Solución**:
1. Verificar que `middleware.ts` esté en la raíz
2. Verificar que el matcher incluya las rutas
3. Revisar logs del servidor

---

### Problema 3: Structured Data con errores

**Diagnóstico**: Usar Google Rich Results Test

**Posibles errores**:
- Campo requerido faltante
- Tipo de dato incorrecto
- URL inválida

**Solución**:
1. Verificar que todos los campos requeridos estén presentes
2. Validar URLs (deben ser absolutas)
3. Verificar tipos de datos (string, number, date)

---

### Problema 4: Sitemaps no accesibles

**Diagnóstico**:
```bash
curl -I https://entradasbts.com/sitemap.xml
curl -I https://entradasbts.com/sitemap-i18n.xml
```

**Posibles causas**:
- Rutas no configuradas en Next.js
- Build estático no generó los sitemaps
- Conflicto de rutas

**Solución**:
1. Verificar que `app/sitemap.ts` exista
2. Verificar que `app/sitemap-i18n.xml/route.ts` exista
3. Rebuild y redeploy

---

## 📈 TIMELINE DE RESULTADOS ESPERADOS

### Semana 1-2 (Indexación)
- ✅ Google indexa las páginas actualizadas
- ✅ Hreflang tags reconocidos en GSC
- ✅ Sin errores en Coverage

### Semana 3-4 (Mejoras iniciales)
- 📈 +10-20% en impresiones por país
- 📈 CTR mejora en 5-10%
- 📈 Primeras apariciones en Top 10 para keywords específicas

### Mes 2-3 (Consolidación)
- 📈 +30-50% en tráfico orgánico total
- 📈 Rankings Top 5 para keywords principales por país
- 📈 Rich results aparecen en SERPs
- 📈 Reducción de bounce rate 10-15%

### Mes 3-6 (Dominio)
- 🎯 Posición #1 para "entradas bts [país] 2026"
- 🎯 Aparición en "Eventos cerca de ti" de Google
- 🎯 Sitelinks en resultados principales
- 🎯 Knowledge panel (si se obtienen backlinks de autoridad)

---

## 🎯 KEYWORDS OBJETIVO POR PAÍS

### Perú 🇵🇪
**Keywords principales**:
- entradas bts peru 2026
- show bts lima 2026
- concierto bts estadio san marcos
- comprar entradas bts peru
- entradas bts lima octubre 2026

**Posición objetivo**: #1-3

---

### Chile 🇨🇱
**Keywords principales**:
- entradas bts chile 2026
- concierto bts santiago 2026
- bts estadio nacional chile
- comprar entradas bts chile
- entradas bts santiago octubre 2026

**Posición objetivo**: #1-3

---

### Brasil 🇧🇷
**Keywords principales** (en PORTUGUÉS):
- ingressos bts brasil 2026
- show bts são paulo 2026
- bts morumbi ingressos
- comprar ingressos bts brasil
- show bts brasil outubro 2026

**Posición objetivo**: #1-3

---

## ✅ CHECKLIST FINAL

- [ ] Build exitoso sin errores
- [ ] Deploy completado
- [ ] Hreflang tags visibles en HTML (verificado con curl)
- [ ] Lang attribute dinámico (verificado por país)
- [ ] Geo meta tags presentes (verificado)
- [ ] Sitemaps accesibles (200 status)
- [ ] robots.txt actualizado
- [ ] Google Rich Results Test: PASS
- [ ] Schema.org Validator: PASS
- [ ] Hreflang Validator: PASS
- [ ] Meta Tags preview correcto
- [ ] Google Search Console configurado
- [ ] Propiedad verificada en GSC
- [ ] Indexación manual solicitada
- [ ] Analytics configurado correctamente
- [ ] Test con VPN desde 3 países
- [ ] Monitoreo semanal configurado

---

## 📞 SOPORTE

Si encuentras algún problema durante la verificación:

1. **Revisar documentación**:
   - SEO_AUDIT_REPORT.md
   - Next.js Metadata API docs
   - Google Search Central

2. **Herramientas de debugging**:
   - Google Search Console
   - Chrome DevTools (Network, Elements)
   - View Page Source

3. **Community resources**:
   - Next.js Discord
   - Stack Overflow
   - Google Search Central Community

---

**Última actualización**: Septiembre 2026  
**Versión**: 1.0
