import { GlassCard } from "@/components/GlassCard";

export const metadata = {
    title: 'Términos y Condiciones | BTS World Tour 2026',
    description: 'Términos y Condiciones de Venta, Uso y Sistema de Cuotas de Ravehub para el BTS World Tour 2026.',
};

export default function Terminos() {
    return (
        <div className="max-w-4xl mx-auto py-10 pt-24 px-4 text-slate-900 dark:text-gray-200">
            <h1 className="text-4xl md:text-5xl font-black uppercase italic mb-8 text-slate-900 dark:text-white">
                Términos y <span className="text-acid-pink">Condiciones</span>
            </h1>

            <GlassCard className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-headings:uppercase prose-p:text-slate-600 dark:prose-p:text-gray-300 prose-strong:text-slate-900 dark:prose-strong:text-white">
                <p className="font-mono text-sm text-slate-500 dark:text-gray-400 mb-6">Vigencia: A partir de Enero de 2025 | Última actualización: Febrero de 2026</p>

                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/50 p-4 rounded-lg mb-8">
                    <p className="text-red-800 dark:text-red-200 font-bold m-0">
                        Aviso Importante y Declaración de Independencia:
                        Al hacer clic en "Aceptar" o al adquirir cualquier servicio en nuestras plataformas (Ravehub Latam, entradasbts.com / ARMY PERU), usted acepta vincularse jurídicamente por estas condiciones.
                    </p>
                    <p className="text-red-800 dark:text-red-200 font-bold m-0 mt-4">
                        DECLARACIÓN DE INDEPENDENCIA: Percy Edgar Tuncar Patrocinio (DNI 73630895), en adelante "El Gestor", opera estas plataformas de manera exclusiva como un proveedor de servicios de intermediación independiente. Nuestra labor se ejerce de forma externa a las ticketeras oficiales y organizadores de eventos. Toda gestión se realiza con absoluta autonomía, operando al margen de vínculos comerciales, patrocinios o contratos de representación directos con productoras, artistas (incluyendo a BTS y talentos de la música electrónica) o administradores de los recintos.
                    </p>
                </div>

                <h2>Título I: Aspectos Generales y Naturaleza del Servicio</h2>

                <h3>Artículo 1: Servicio de Personal Shopper y Mercado Secundario</h3>
                <ul>
                    <li><strong>1.1.</strong> El Gestor ofrece un servicio especializado de Gestión de Compra (Personal Shopper) y Adquisición en Mercado Secundario. Nuestro trabajo consiste en invertir tiempo, tecnología y recursos para asegurar y facilitar la compra de accesos a eventos de alta demanda en nombre del Usuario.</li>
                    <li><strong>1.2. Tarifa de Gestión:</strong> El precio final pagado por el Usuario incluye el Valor Nominal de la entrada (establecido por el organizador oficial) más una Tarifa de Gestión y Procura por nuestros servicios. Debido a la dificultad de adquisición y la demanda del mercado, el precio final en nuestra plataforma puede ser superior al precio de taquilla oficial. Al aceptar estos términos, el Usuario comprende y acepta la estructura de este cobro por servicio.</li>
                    <li><strong>1.3.</strong> El Gestor no es responsable de la ejecución, seguridad, acústica, visibilidad o realización del evento. Cualquier reclamo sobre la producción del espectáculo recae exclusivamente sobre la empresa productora oficial del mismo.</li>
                </ul>

                <h3>Artículo 2: Exclusión del Derecho a Retracto</h3>
                <p>De conformidad con las normativas vigentes sobre comercio electrónico de espectáculos y prestación de servicios ya ejecutados (gestión de compra), se declara que los servicios adquiridos a través del Gestor no están sujetos al derecho de retracto.</p>
                <ul>
                    <li><strong>2.1.</strong> El Usuario no podrá anular el encargo de compra, desistir del contrato ni solicitar devolución de dinero por arrepentimiento una vez confirmado el pago (sea total o la cuota inicial), ya que el servicio de búsqueda, bloqueo o adquisición de la entrada se inicia de manera inmediata.</li>
                </ul>

                <h2>Título II: Sistema de Venta en Cuotas ("Abono El Gestor")</h2>

                <h3>Artículo 3: Naturaleza de la Venta en Cuotas</h3>
                <p>La modalidad de pago fraccionado ofrecida por El Gestor no constituye un crédito de consumo bancario, sino una "Reserva de Cupo Condicional".</p>
                <ul>
                    <li><strong>3.1. Condición de Asignación y Entrega:</strong> Debido a la naturaleza operativa de nuestros servicios (ya sea mediante la asignación desde un inventario previamente adquirido por El Gestor o mediante la gestión de compra directa en taquilla oficial tras el encargo del Usuario), el ticket o derecho de acceso final no será asignado, transferido ni entregado al Usuario hasta que se confirme el pago íntegro (100%) del monto total acordado. Durante el periodo de pago en cuotas, el Usuario posee una "reserva de gestión", pero el acceso no se consolida hasta la cancelación total. En ningún caso se emitirán códigos QR, e-tickets, ni se realizarán transferencias de titularidad hasta liquidar la deuda.</li>
                </ul>

                <h3>Artículo 4: Pagos y Plazos</h3>
                <ul>
                    <li><strong>4.1. Cuota Inicial (Pie):</strong> El Usuario deberá pagar una cuota inicial no reembolsable que incluye el 100% del Cargo por Servicio más un porcentaje del valor del ticket.</li>
                    <li><strong>4.2. Calendario de Pagos:</strong> Es obligación esencial del Usuario cumplir con las fechas de pago estipuladas en su panel de usuario. El seguimiento es responsabilidad exclusiva del comprador.</li>
                </ul>

                <h3>Artículo 5: Mora, Actualización de Precio y Abandono (Cláusula Especial)</h3>
                <p>Para proteger la integridad del inventario de tickets y compensar el bloqueo de stock, se establecen las siguientes consecuencias escalonadas en caso de impago:</p>

                <h4>5.1. Mora y Pérdida del Precio Congelado (Regla de los 3 Días)</h4>
                <p>Si el Usuario no realiza el pago de una cuota en la fecha pactada, dispondrá de un plazo de gracia de tres (3) días corridos para regularizar su situación manteniendo el precio original. Si vencido este plazo el pago no se ha acreditado, el Usuario perderá el beneficio del precio promocional.</p>
                <p><strong>Consecuencia:</strong> El saldo pendiente se recalculará al valor de la fase de venta vigente.</p>

                <h4>5.2. Plazo Final de Regularización (Regla de los 10 Días)</h4>
                <p>Una vez actualizado el precio, el Usuario dispondrá de un plazo final de diez (10) días corridos para abonar el nuevo saldo ajustado.</p>

                <h4>5.3. Presunción de Desistimiento y Daño Patrimonial</h4>
                <p>Si transcurridos los diez (10) días el Usuario no ha completado el pago, se asumirá que desiste de la compra. El Usuario reconoce que su incumplimiento genera un daño patrimonial directo a El Gestor (bloqueo de stock, gastos administrativos y lucro cesante).</p>

                <h4>5.4. Ejecución de la Penalidad</h4>
                <p>En virtud del daño reconocido, El Gestor procederá a cancelar la reserva y retendrá los montos abonados previamente en concepto de indemnización. No habrá derecho a reembolso.</p>

                <h2>Título III: Política de Cambios, Upgrades y Cancelaciones</h2>

                <h3>Artículo 6: Regla de "Solo Upgrades"</h3>
                <ul>
                    <li><strong>6.1. No Cambios:</strong> No se permiten cambios de fecha, lugar o asiento a solicitud del Usuario, salvo lo dispuesto en este artículo.</li>
                    <li><strong>6.2. Upgrades (Mejora de Ticket):</strong> El Gestor fomenta la mejora de la experiencia. El Usuario podrá solicitar cambiar su ticket a una categoría superior (ej. de General a VIP) sujeto a disponibilidad, pagando la diferencia de precio y el cargo administrativo correspondiente.</li>
                    <li><strong>6.3. Prohibición de Downgrades:</strong> No se aceptarán solicitudes de cambio a localidades de menor valor.</li>
                </ul>

                <h3>Artículo 7: Modificaciones Sustanciales y Lineup</h3>
                <ul>
                    <li><strong>7.1. Concepto de Festival:</strong> En eventos masivos, el Usuario adquiere una experiencia integral. La grilla de artistas es referencial y dinámica.</li>
                    <li><strong>7.2. Responsabilidad sobre el Lineup:</strong> La cancelación, retraso o modificación de la parrilla de artistas es decisión y responsabilidad exclusiva de la empresa productora u organizador oficial. El Gestor, en su calidad de intermediario de compra, se someterá y trasladará al Usuario estrictamente las políticas de compensación o devolución que el organizador oficial determine y anuncie públicamente para dichos casos.</li>
                </ul>

                <h3>Artículo 8: Cancelación y Fuerza Mayor</h3>
                <ul>
                    <li><strong>8.1. Decisiones del Organizador Oficial:</strong> Cualquier suspensión, reprogramación o cancelación por fuerza mayor es declarada y gestionada única y exclusivamente por el organizador oficial del evento.</li>
                    <li><strong>8.2. Validez del Ticket Reprogramado:</strong> Si el organizador oficial determina que el ticket sigue siendo válido para una nueva fecha, dicha política aplicará automáticamente al ticket gestionado. Si el Usuario no puede asistir a la nueva fecha, dependerá de los plazos y condiciones de reembolso que habilite la ticketera u organizador oficial.</li>
                    <li><strong>8.3. Devolución de Dinero:</strong> En caso de cancelación definitiva, se devolverá el Valor Nominal del Ticket.</li>
                    <li><strong>8.4. Protección de la Tarifa de Gestión:</strong> En el escenario de una cancelación definitiva del evento por parte de la productora oficial, El Gestor asistirá al Usuario en el proceso de solicitud de reembolso del Valor Nominal de la entrada ante los canales oficiales. Sin embargo, la Tarifa de Gestión y Procura (y cualquier cargo por servicio de cuotas) NO será reembolsable bajo ninguna circunstancia, dado que remunera el servicio de intermediación, tecnología y adquisición que ya fue exitosamente prestado por El Gestor.</li>
                </ul>

                <h3>Artículo 9: Limitación de Responsabilidad</h3>
                <p>El Gestor no será responsable por daños indirectos, lucro cesante o gastos conexos incurridos por el Usuario derivados de la cancelación o modificación del evento. La responsabilidad máxima se limita al valor nominal del ticket pagado.</p>

            </GlassCard>
        </div>
    );
}
