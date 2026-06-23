# PayPal Integration para Chile - Pago al Contado

## Descripción
Esta implementación añade un flujo de pago seguro con PayPal específico para clientes en Chile que seleccionan la opción de pago "al contado" (efectivo/transferencia) en la compra de entradas BTS.

## Flujo del Usuario

1. **Selección de País**: El usuario accede a `https://entradasbts.com/chile/`
2. **Selección de Entradas**: Elige la zona "Cancha Andes" (última disponible) y cantidad
3. **Pago al Contado**: Selecciona "Al contado" (sin cuotas)
4. **Redirección PayPal**: Al hacer clic en "Comprar entradas ahora", se redirige a PayPal
5. **Confirmación Pago**: Después del pago en PayPal, se redirige a la página de éxito
6. **WhatsApp**: Se le solicita enviar captura de pantalla al +56 9 5194 47844

## Rutas Nuevas

### 1. `/app/pago-paypal/page.tsx`
Página de pago con PayPal para Chile.
- Valida que sea una orden de Chile con pago al contado
- Muestra resumen del pedido
- Integra botones de pago de PayPal
- Procesa el pago y redirige a página de éxito

### 2. `/app/compra-exitosa/page.tsx`
Página de confirmación post-pago.
- Diseño tipo boleta/factura
- Muestra el poster de BTS
- Agradece por la compra
- Indica enviar captura a WhatsApp: +56 9 5194 47844
- Muestra ID de transacción de PayPal

## Cambios Realizados

### 1. Modificado: `/app/tienda/cart/page.tsx`
- Actualizado `handleCheckout()` para detectar Chile con pago al contado
- Redirige a `/pago-paypal` en lugar de WhatsApp para este caso específico
- Mantiene flujo normal de WhatsApp para otros países o pagos en cuotas

### 2. Modificado: `/app/[country]/CountryClient.tsx`
- Añadida notificación de PayPal para Chile con pago al contado
- Muestra mensaje informativo sobre redirección a PayPal

## Configuración PayPal

⚠️ **IMPORTANTE**: La integración usa credenciales de sandbox por defecto.

Para producción, actualizar en `/app/pago-paypal/page.tsx`:

```typescript
<PayPalScriptProvider options={{
  "client-id": "sb", // REEMPLAZAR CON CLIENT-ID REAL
  currency: "USD",
  intent: "capture"
}}>
```

Obtener credenciales en: https://developer.paypal.com/

## Variables de Entorno

Añadir al archivo `.env.local`:

```bash
NEXT_PUBLIC_PAYPAL_CLIENT_ID=tu_client_id_aqui
```

## URLs Importantes

- **Chile**: https://entradasbts.com/chile/
- **Carrito**: /tienda/cart
- **PayPal Pago**: /pago-paypal
- **Éxito**: /compra-exitosa

## Notas

- El pago incluye 3.5% de comisión de PayPal
- Solo aplica para Chile con pago "al contado" (sin cuotas)
- Otros países y pagos en cuotas usan WhatsApp como antes
- La entrada Cancha Andes está limitada a 1 por persona

## Testing

1. Acceder a https://entradasbts.com/chile/
2. Seleccionar "Cancha Andes"
3. Elegir pago "Al contado"
4. Añadir al carrito
5. Ir al carrito y hacer checkout
6. Debería redirigir a PayPal
7. Después del pago, redirige a /compra-exitosa
