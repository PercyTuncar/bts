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
                <p className="font-mono text-sm text-slate-500 dark:text-gray-400 mb-6">Vigencia: A partir del 01 de Enero de 2025</p>

                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/50 p-4 rounded-lg mb-8">
                    <p className="text-red-800 dark:text-red-200 font-bold m-0">
                        Aviso Importante: Al hacer clic en "Aceptar" o al comprar cualquier producto en ravehublatam.com, usted acepta vincularse jurídicamente por estas condiciones, las cuales incluyen de manera integral las políticas de reembolso, mora y retracto detalladas a continuación.
                    </p>
                </div>

                <h2>Título I: Aspectos Generales y Mandato</h2>

                <h3>Artículo 1: Intermediación y Mandato</h3>
                <p>Ravehub Latam ("Ravehub") opera esta plataforma en calidad de mandatario mercantil con representación de los Organizadores, Productoras y Promotores de eventos ("El Organizador").</p>
                <ul>
                    <li><strong>1.1.</strong> Ravehub no es el organizador, productor, ni responsable de la ejecución del evento. Su rol se limita estrictamente a la comercialización y distribución de tickets y recaudación de fondos por cuenta y orden del Organizador.</li>
                    <li><strong>1.2.</strong> Cualquier reclamo relacionado con la seguridad, producción, visibilidad, acústica, o suspensión del evento es responsabilidad exclusiva del Organizador, cuyos datos legales se informan en el proceso de compra.</li>
                </ul>

                <h3>Artículo 2: Exclusión del Derecho a Retracto</h3>
                <p>De conformidad con lo dispuesto en el Artículo 3 bis letra b) de la Ley N° 19.496 (y legislaciones homologables en LatAm sobre comercio electrónico de espectáculos), se declara que las compras de tickets realizadas en Ravehub no están sujetas al derecho de retracto.</p>
                <ul>
                    <li><strong>2.1.</strong> El Usuario no podrá anular la compra, desistir del contrato ni solicitar devolución de dinero por arrepentimiento una vez confirmado el pago, sea este total o parcial (cuotas).</li>
                </ul>

                <h2>Título II: Sistema de Venta en Cuotas ("Abono Ravehub")</h2>

                <h3>Artículo 3: Naturaleza de la Venta en Cuotas</h3>
                <p>La modalidad de pago fraccionado ofrecida por Ravehub no constituye un crédito de consumo bancario, sino una "Reserva de Cupo Condicional".</p>
                <ul>
                    <li><strong>3.1. Reserva de Dominio:</strong> El Ticket (derecho de acceso) permanece en propiedad del Organizador/Ravehub hasta el pago íntegro (100%) del precio acordado. No se emitirán códigos QR ni e-tickets válidos hasta la cancelación total de la deuda.</li>
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
                <p>Si transcurridos los diez (10) días el Usuario no ha completado el pago, se asumirá que desiste de la compra. El Usuario reconoce que su incumplimiento genera un daño patrimonial directo a Ravehub (bloqueo de stock, gastos administrativos y lucro cesante).</p>

                <h4>5.4. Ejecución de la Penalidad</h4>
                <p>En virtud del daño reconocido, Ravehub procederá a cancelar la reserva y retendrá los montos abonados previamente en concepto de indemnización. No habrá derecho a reembolso.</p>

                <h2>Título III: Política de Cambios, Upgrades y Cancelaciones</h2>

                <h3>Artículo 6: Regla de "Solo Upgrades"</h3>
                <ul>
                    <li><strong>6.1. No Cambios:</strong> No se permiten cambios de fecha, lugar o asiento a solicitud del Usuario, salvo lo dispuesto en este artículo.</li>
                    <li><strong>6.2. Upgrades (Mejora de Ticket):</strong> Ravehub fomenta la mejora de la experiencia. El Usuario podrá solicitar cambiar su ticket a una categoría superior (ej. de General a VIP) sujeto a disponibilidad, pagando la diferencia de precio y el cargo administrativo correspondiente.</li>
                    <li><strong>6.3. Prohibición de Downgrades:</strong> No se aceptarán solicitudes de cambio a localidades de menor valor.</li>
                </ul>

                <h3>Artículo 7: Modificaciones Sustanciales y Lineup</h3>
                <ul>
                    <li><strong>7.1. Concepto de Festival:</strong> En eventos masivos, el Usuario adquiere una experiencia integral. La grilla de artistas es referencial y dinámica.</li>
                    <li><strong>7.2.</strong> La cancelación, retraso o modificación de artistas no faculta al Usuario para solicitar la devolución, salvo que la cancelación afecte a más del 60% de la programación total.</li>
                </ul>

                <h3>Artículo 8: Cancelación y Fuerza Mayor</h3>
                <ul>
                    <li><strong>8.1. Suspensión por Fuerza Mayor:</strong> En caso de que el evento no pueda realizarse por fuerza mayor, será reprogramado.</li>
                    <li><strong>8.2. Validez del Ticket:</strong> El Ticket será válido para la nueva fecha. Si el Usuario no puede asistir, tendrá un plazo de 7 días desde el anuncio para solicitar devolución.</li>
                    <li><strong>8.3. Devolución de Dinero:</strong> En caso de cancelación definitiva, se devolverá el Valor Nominal del Ticket.</li>
                    <li><strong>8.4. Protección del Cargo por Servicio:</strong> El Cargo por Servicio no será reembolsado en caso de cancelación, ya que remunera el servicio de intermediación tecnológica ya ejecutado.</li>
                </ul>

                <h3>Artículo 9: Limitación de Responsabilidad</h3>
                <p>Ravehub no será responsable por daños indirectos, lucro cesante o gastos conexos incurridos por el Usuario derivados de la cancelación o modificación del evento. La responsabilidad máxima se limita al valor nominal del ticket pagado.</p>

            </GlassCard>
        </div>
    );
}
