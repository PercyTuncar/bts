import { GlassCard } from "@/components/GlassCard";

export const metadata = {
    title: 'Política de Privacidad | BTS World Tour 2026',
    description: 'Política de Privacidad y Protección de Datos de Ravehub y EntradasBTS.',
};

export default function Privacidad() {
    return (
        <div className="max-w-4xl mx-auto py-10 pt-24 px-4 text-gray-200">
            <h1 className="text-4xl md:text-5xl font-black uppercase italic mb-8 text-white">
                Política de <span className="text-acid-pink">Privacidad</span>
            </h1>

            <GlassCard className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:uppercase prose-p:text-gray-300 prose-strong:text-white">
                <p className="font-mono text-sm text-gray-400 mb-6">Última actualización: Diciembre 2025</p>

                <p>
                    En Ravehub Latam ("Nosotros", "La Plataforma"), valoramos su privacidad tanto como su experiencia en el evento. Esta Política describe cómo recopilamos, utilizamos y compartimos su información personal al utilizar nuestro sitio web ravehublatam.com.
                </p>
                <p>
                    Al comprar una entrada o registrarse en nuestra plataforma, usted autoriza expresamente el tratamiento de sus datos según los términos aquí descritos.
                </p>

                <h3>1. Información que Recopilamos</h3>
                <p>Para gestionar la venta de entradas y garantizar la seguridad de los eventos, recopilamos los siguientes datos:</p>
                <ul>
                    <li><strong>Datos de Identificación:</strong> Nombre completo, número de documento de identidad (DNI, RUT, Pasaporte), fecha de nacimiento y nacionalidad.</li>
                    <li><strong>Datos de Contacto:</strong> Correo electrónico, número de teléfono móvil (para envío de tickets y notificaciones vía WhatsApp/SMS) y domicilio.</li>
                    <li><strong>Datos Transaccionales:</strong> Historial de compras, método de pago utilizado y detalles de facturación. (Nota: Ravehub NO almacena números completos de tarjetas de crédito; estos son procesados por pasarelas de pago certificadas PCI-DSS).</li>
                    <li><strong>Datos de Navegación:</strong> Dirección IP, tipo de dispositivo, navegador y comportamiento en el sitio (a través de Cookies y Píxeles).</li>
                </ul>

                <h3>2. Finalidad del Tratamiento (¿Para qué usamos sus datos?)</h3>
                <p>Usted autoriza a Ravehub a utilizar sus datos para las siguientes finalidades:</p>
                <ul>
                    <li><strong>Gestión del Servicio:</strong> Procesar la compra, emitir el E-Ticket nominativo y controlar el acceso al evento (validación QR).</li>
                    <li><strong>Comunicación Transaccional:</strong> Enviarle sus entradas, notificaciones de cambios de horario, o avisos de pago de cuotas pendientes.</li>
                    <li><strong>Marketing y Publicidad:</strong> Enviarle novedades, preventas exclusivas, ofertas de futuros eventos y promociones de terceros aliados, a través de correo electrónico, mensajería instantánea (WhatsApp Business API, Bots) y SMS.</li>
                    <li><strong>Perfilamiento Comercial:</strong> Analizar sus preferencias musicales y de compra para personalizar la publicidad que ve en nuestras redes y sitio web.</li>
                </ul>

                <h3>3. Compartición de Datos con Terceros</h3>
                <p>Para la ejecución del servicio, sus datos serán compartidos obligatoriamente con:</p>
                <ul>
                    <li><strong>Organizadores y Productoras:</strong> El Organizador del evento (ej. Productora del Festival) recibirá su nombre, DNI y correo para gestionar la seguridad, el ingreso y cumplir con normativas legales locales.</li>
                    <li><strong>Autoridades:</strong> En caso de requerimiento legal o por razones de seguridad sanitaria/pública.</li>
                    <li><strong>Proveedores de Servicios:</strong> Servidores de hosting (AWS/Vercel), herramientas de mailing y plataformas de atención al cliente.</li>
                </ul>

                <h3>4. Política de Cookies y Rastreo</h3>
                <p>Nuestro sitio utiliza cookies propias y de terceros (como Google Analytics, Meta Pixel, TikTok Pixel) para:</p>
                <ul>
                    <li>Recordar su sesión y carrito de compras.</li>
                    <li>Mostrarle anuncios relevantes en otras páginas web y redes sociales (Retargeting).</li>
                    <li>Analizar el tráfico del sitio para mejorar nuestra plataforma.</li>
                </ul>
                <p>Al navegar en Ravehub, usted acepta el uso de estas tecnologías de rastreo.</p>

                <h3>5. Seguridad de la Información</h3>
                <p>Implementamos medidas de seguridad técnicas (cifrado SSL, firewalls) para proteger sus datos. Sin embargo, ninguna transmisión por Internet es 100% segura. Ravehub no se hace responsable por interceptaciones ilegales o violación de sus sistemas por parte de terceros no autorizados (hackers), siempre que hayamos actuado con la diligencia debida.</p>

                <h3>6. Derechos ARCO</h3>
                <p>Dependiendo de su país de residencia, usted tiene derecho a acceder, corregir o solicitar la eliminación de sus datos personales de nuestra base de marketing.</p>
                <p>Para ejercer estos derechos, debe enviar una solicitud formal a: <a href="mailto:contacto@ravehublatam.com" className="text-acid-pink hover:underline">contacto@ravehublatam.com</a>.</p>
                <p className="text-sm italic">Nota: No es posible eliminar datos fiscales o transaccionales de compras activas o pasadas si la ley nos obliga a conservarlos por un periodo determinado.</p>

                <h3>7. Cambios en la Política</h3>
                <p>Ravehub se reserva el derecho de modificar esta política en cualquier momento para adaptarla a nuevas prácticas comerciales o legislativas. Las modificaciones serán efectivas inmediatamente tras su publicación en el sitio.</p>

            </GlassCard>
        </div>
    );
}
