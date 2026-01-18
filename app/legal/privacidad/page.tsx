import { GlassCard } from "@/components/GlassCard";

export default function Privacidad() {
    return (
        <div className="max-w-4xl mx-auto py-10 pt-24 px-4">
            <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>
            <GlassCard className="prose prose-invert max-w-none">
                <p>Última actualización: Enero 2026</p>
                <p>En entradasbts.com, nos tomamos muy en serio la privacidad de ARMY.</p>
                <h3>1. Recolección de Datos</h3>
                <p>Solo recolectamos datos necesarios para la compra de entradas y análisis de tráfico anónimo.</p>
                <h3>2. Cookies</h3>
                <p>Usamos cookies para mejorar la experiencia de usuario y recordar tu selección de país.</p>
            </GlassCard>
        </div>
    );
}
