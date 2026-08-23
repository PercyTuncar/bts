// Server Component para Google Maps (sin 'use client')
import { MapPin } from 'lucide-react';

type Props = {
    countryId: string;
};

export function GoogleMapsSection({ countryId }: Props) {
    const isPeru = countryId === 'peru';
    const isChile = countryId === 'chile';
    const isArgentina = countryId === 'argentina';
    const isBrazil = countryId === 'brasil';

    // Solo mostrar para países con contenido SEO optimizado
    if (!isPeru && !isChile && !isArgentina && !isBrazil) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Brasil */}
            {isBrazil && (
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-red-600" />
                            Localização do Estádio MorumBIS
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">
                            Praça Roberto Gomes Pedrosa, 1 - Morumbi, São Paulo - SP
                        </p>
                    </div>
                    <div className="relative w-full h-80">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.112697290363!2d-46.722042484502884!3d-23.600399484649234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce50433b834813%3A0x8f406b7b6f5a9e7e!2sEst%C3%A1dio%20C%C3%ADcero%20Pompeu%20de%20Toledo%20(Morumbi)!5e0!3m2!1spt-BR!2sbr!4v1629825600000!5m2!1spt-BR!2sbr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Localização Estádio MorumBIS São Paulo"
                        />
                    </div>
                    <div className="p-4 bg-blue-50 border-t border-blue-100">
                        <p className="text-sm text-slate-700">
                            <strong className="text-blue-900">Metrô:</strong> Estação São Paulo-Morumbi (Linha 4-Amarela) - 15-20 min a pé
                        </p>
                        <p className="text-xs text-slate-600 mt-1">
                            Também é possível chegar de ônibus pelas linhas 775P-10, 775M-10 e outras que passam pela região.
                        </p>
                    </div>
                </div>
            )}

            {/* Perú */}
            {isPeru && (
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-red-600" />
                            Ubicación del Estadio San Marcos
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">
                            Av. Venezuela cuadra 34, Cercado de Lima - Lima, Perú
                        </p>
                    </div>
                    <div className="relative w-full h-80">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.3355447647043!2d-77.08324408461698!3d-12.057732845165457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c9d8e8f8f8f9%3A0x8f8f8f8f8f8f8f8f!2sEstadio%20San%20Marcos!5e0!3m2!1ses!2spe!4v1629825600000!5m2!1ses!2spe"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación Estadio San Marcos Lima Perú"
                        />
                    </div>
                    <div className="p-4 bg-purple-50 border-t border-purple-100">
                        <p className="text-sm text-slate-700">
                            <strong className="text-purple-900">Metropolitano:</strong> Estación Canaval y Moreyra o Estadio Nacional - 10-15 min en bus
                        </p>
                        <p className="text-xs text-slate-600 mt-1">
                            Líneas de bus: IM-11, IM-17 y rutas del Corredor Azul que pasan cerca del estadio.
                        </p>
                    </div>
                </div>
            )}

            {/* Chile */}
            {isChile && (
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-red-600" />
                            Ubicación del Estadio Nacional
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">
                            Av. Grecia 2001, Ñuñoa, Santiago - Chile
                        </p>
                    </div>
                    <div className="relative w-full h-80">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.6847474474474!2d-70.60958908461698!3d-33.46547848076543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf7f8f8f8f8f%3A0x8f8f8f8f8f8f8f8f!2sEstadio%20Nacional%20Julio%20Mart%C3%ADnez%20Pr%C3%A1danos!5e0!3m2!1ses!2scl!4v1629825600000!5m2!1ses!2scl"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación Estadio Nacional Julio Martínez Prádanos Santiago Chile"
                        />
                    </div>
                    <div className="p-4 bg-red-50 border-t border-red-100">
                        <p className="text-sm text-slate-700">
                            <strong className="text-red-900">Metro:</strong> Línea 6 - Estación Estadio Nacional (5-10 min caminando) ⭐ Mejor opción
                        </p>
                        <p className="text-xs text-slate-600 mt-1">
                            Alternativas: Línea 5 - Estación Ñuble (15-20 min) o Línea 4 - Estación Grecia + bus.
                        </p>
                    </div>
                </div>
            )}

            {/* Argentina */}
            {isArgentina && (
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-red-600" />
                            Ubicación del Estadio Único
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">
                            Av. 32 entre 21 y 25, Bosque de La Plata - Buenos Aires, Argentina
                        </p>
                    </div>
                    <div className="relative w-full h-80">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.234567890123!2d-57.98765432109876!3d-34.90123456789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e6f8f8f8f8f8%3A0x8f8f8f8f8f8f8f8f!2sEstadio%20%C3%9Anico%20Diego%20Armando%20Maradona!5e0!3m2!1ses!2sar!4v1629825600000!5m2!1ses!2sar"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación Estadio Único Diego Armando Maradona La Plata Argentina"
                        />
                    </div>
                    <div className="p-4 bg-sky-50 border-t border-sky-100">
                        <p className="text-sm text-slate-700">
                            <strong className="text-sky-900">Tren Roca:</strong> Desde Constitución (Buenos Aires) - 1h 15min hasta La Plata
                        </p>
                        <p className="text-xs text-slate-600 mt-1">
                            Desde estación La Plata: colectivos 273, 275, 518 hasta el estadio (10-15 min adicionales).
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
