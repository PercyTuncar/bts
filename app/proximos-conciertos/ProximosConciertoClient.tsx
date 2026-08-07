"use client";

import { useState, useEffect } from 'react';
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import Link from "next/link";
import { Calendar, Clock, MapPin, Filter, ArrowRight, Bell } from "lucide-react";

interface Concert {
    city: string;
    country: string;
    date: string;
    venue: string;
    flag: string;
    past?: boolean;
    region?: string;
    countryId?: string;
}

interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function ProximosConciertoClient({
    concerts,
    todayConcert: initialTodayConcert,
    nextConcert: initialNextConcert,
}: {
    concerts: Concert[];
    todayConcert?: Concert;
    nextConcert?: Concert;
}) {
    const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);
    const [todayConcert, setTodayConcert] = useState(initialTodayConcert);
    const [nextConcert, setNextConcert] = useState(initialNextConcert);
    const [selectedCountry, setSelectedCountry] = useState<string>('Todos');
    const [kstTime, setKstTime] = useState<string>('');
    const [showPastDates, setShowPastDates] = useState(false);

    const futureConcerts = concerts.filter(c => !c.past);
    const pastConcerts = concerts.filter(c => c.past);

    // Obtener países únicos
    const countries = ['Todos', ...Array.from(new Set(futureConcerts.map(c => c.country)))];

    // Filtrar conciertos
    const filteredConcerts = selectedCountry === 'Todos'
        ? futureConcerts
        : futureConcerts.filter(c => c.country === selectedCountry);

    // Agrupar por región
    const concertsByRegion = filteredConcerts.reduce((acc, concert) => {
        const region = concert.region || 'Otras ciudades';
        if (!acc[region]) acc[region] = [];
        acc[region].push(concert);
        return acc;
    }, {} as Record<string, Concert[]>);

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const today = now.toISOString().split('T')[0];

            // Verificar si hay concierto hoy
            const concertToday = concerts.find(c => c.date === today && !c.past);
            setTodayConcert(concertToday);

            // Encontrar el próximo concierto
            const upcoming = concerts.filter(c => !c.past && c.date >= today);
            const next = upcoming[0];
            setNextConcert(next);

            // Calcular tiempo restante
            if (next) {
                const concertDate = new Date(next.date + 'T20:00:00');
                const diff = concertDate.getTime() - now.getTime();

                if (diff > 0) {
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                    setTimeRemaining({ days, hours, minutes, seconds });
                }
            }

            // Hora de Corea (KST)
            const kst = new Intl.DateTimeFormat('es-ES', {
                timeZone: 'Asia/Seoul',
                dateStyle: 'medium',
                timeStyle: 'short',
            }).format(now);
            setKstTime(kst);
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [concerts]);

    const formatDateLocal = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getKSTTime = (dateStr: string) => {
        const date = new Date(dateStr + 'T20:00:00');
        return new Intl.DateTimeFormat('es-ES', {
            timeZone: 'Asia/Seoul',
            dateStyle: 'short',
            timeStyle: 'short',
        }).format(date);
    };

    return (
        <div className="min-h-screen pt-24 pb-20 container mx-auto px-4 text-slate-900 selection:bg-secondary selection:text-white">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-8 border-b-4 border-slate-200 pb-8">
                <span className="bg-secondary text-white px-3 py-1.5 font-black uppercase text-xs tracking-widest mb-4 inline-block">
                    En vivo
                </span>
                <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
                    Próximo Concierto
                    <span className="block text-primary mt-2">de BTS</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mb-2">
                    Cuenta regresiva en tiempo real y calendario actualizado. Para el contexto completo de la gira, visita nuestra{' '}
                    <Link href="/gira-mundial" className="text-primary font-bold hover:underline">
                        guía de la gira mundial
                    </Link>.
                </p>
                <p className="text-sm text-slate-500 italic">
                    Última actualización: 7 de agosto de 2026 • Hora de Corea (KST): {kstTime}
                </p>
            </div>

            {/* ¿Hay concierto hoy? */}
            <section className="mb-16">
                <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 tracking-tight">¿Hay concierto de BTS hoy?</h2>
                {todayConcert ? (
                    <GlassCard className="border-4 border-primary bg-gradient-to-br from-primary/10 to-primary/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="relative">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-5xl">{todayConcert.flag}</span>
                                <div>
                                    <p className="text-3xl md:text-4xl font-black uppercase text-primary">¡Sí! Hay concierto hoy</p>
                                    <p className="text-xl font-bold text-slate-700">{todayConcert.city}, {todayConcert.country}</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-slate-700">
                                <p className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    <strong>Venue:</strong> {todayConcert.venue}
                                </p>
                                <p className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-primary" />
                                    <strong>Hora de inicio:</strong> 20:00 hrs (hora local)
                                </p>
                                <p className="text-sm text-slate-600 mt-4">
                                    <strong>Hora en Corea (KST):</strong> {getKSTTime(todayConcert.date)}
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                ) : (
                    <GlassCard className="border border-slate-200">
                        <p className="text-2xl font-bold text-slate-700 mb-4">
                            No hay concierto de BTS hoy.
                        </p>
                        <p className="text-slate-600">
                            El próximo concierto es {nextConcert && (
                                <>el <strong>{formatDateLocal(nextConcert.date)}</strong> en <strong>{nextConcert.city}, {nextConcert.country}</strong></>
                            )}.
                        </p>
                    </GlassCard>
                )}

                {/* Explicación de zona horaria */}
                <div className="mt-8">
                    <h3 className="text-xl font-black uppercase mb-4 text-slate-700">Hora de Corea (KST) vs. hora local — por qué son distintas</h3>
                    <GlassCard className="bg-slate-50 border border-slate-200">
                        <p className="text-slate-700 leading-relaxed text-sm">
                            Los conciertos de la gira Arirang se realizan en la <strong>hora local de cada ciudad</strong>, no en horario de Corea (KST, UTC+9).
                            La hora de Corea se muestra como referencia adicional porque HYBE y BIGHIT MUSIC publican anuncios, ventas de entradas y contenido en Weverse siguiendo el horario coreano.
                            Por ejemplo, un concierto en Santiago a las 20:00 hora local equivale a la mañana siguiente en Corea por la diferencia horaria de 12-13 horas.
                        </p>
                    </GlassCard>
                </div>
            </section>

            {/* Cuenta regresiva */}
            {nextConcert && timeRemaining && !todayConcert && (
                <section className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 tracking-tight text-center">
                        Próximo concierto de BTS
                    </h2>
                    <GlassCard className="border-2 border-primary bg-gradient-to-br from-slate-50 to-white">
                        <div className="text-center mb-8">
                            <p className="text-2xl md:text-3xl font-black uppercase text-slate-900 mb-2">
                                {nextConcert.city}, {nextConcert.country} {nextConcert.flag}
                            </p>
                            <p className="text-lg text-slate-600">{formatDateLocal(nextConcert.date)}</p>
                            <p className="text-sm text-slate-500 mt-1">{nextConcert.venue}</p>
                        </div>

                        {/* Contador */}
                        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                            {[
                                { value: timeRemaining.days, label: 'Días' },
                                { value: timeRemaining.hours, label: 'Horas' },
                                { value: timeRemaining.minutes, label: 'Minutos' },
                                { value: timeRemaining.seconds, label: 'Segundos' },
                            ].map((unit, index) => (
                                <div key={index} className="text-center">
                                    <div className="bg-secondary text-white rounded-2xl p-4 md:p-6 shadow-lg">
                                        <p className="text-4xl md:text-6xl font-black tabular-nums">
                                            {String(unit.value).padStart(2, '0')}
                                        </p>
                                    </div>
                                    <p className="text-xs md:text-sm font-bold uppercase text-slate-600 mt-2 tracking-wider">
                                        {unit.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <p className="text-sm text-slate-500 mb-4">
                                <Clock className="w-4 h-4 inline mr-1" />
                                Hora en Corea (KST): {getKSTTime(nextConcert.date)}
                            </p>
                            {nextConcert.countryId && (
                                <Link href={`/${nextConcert.countryId}`}>
                                    <Button variant="primary" size="lg">
                                        Comprar entradas <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </GlassCard>
                </section>
            )}

            {/* Calendario de próximas fechas */}
            <section className="mb-16">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 md:mb-0 tracking-tight">
                        Calendario de próximas fechas
                    </h2>
                    <div className="flex items-center gap-3">
                        <Filter className="w-5 h-5 text-slate-500" />
                        <select
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            className="px-4 py-2 border-2 border-slate-200 rounded-lg font-bold text-sm uppercase focus:outline-none focus:border-primary"
                        >
                            {countries.map(country => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {Object.entries(concertsByRegion).map(([region, regionConcerts]) => (
                    <div key={region} className="mb-12">
                        <h3 className="text-2xl md:text-3xl font-black uppercase mb-6 text-primary">{region}</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {regionConcerts.map((concert, index) => (
                                <div key={index} id={concert.city.toLowerCase()}>
                                    <GlassCard
                                        variant="interactive"
                                        className="border border-slate-200 h-full"
                                    >
                                        <div className="flex items-start gap-4 mb-4">
                                            <span className="text-4xl">{concert.flag}</span>
                                            <div className="flex-1">
                                                <h4 className="text-xl font-black uppercase text-slate-900 mb-1">
                                                    {concert.city}
                                                </h4>
                                                <p className="text-sm font-bold text-slate-600">{concert.country}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-2 text-slate-700 text-sm">
                                                <Calendar className="w-4 h-4 text-primary" />
                                                <span className="font-bold">{formatDateLocal(concert.date)}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600 text-sm">
                                                <MapPin className="w-4 h-4" />
                                                <span>{concert.venue}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-500 text-xs">
                                                <Clock className="w-3 h-3" />
                                                <span>KST: {getKSTTime(concert.date)}</span>
                                            </div>
                                        </div>
                                        {concert.countryId && (
                                            <Link href={`/${concert.countryId}`}>
                                                <Button variant="primary" className="w-full">
                                                    Comprar entradas <ArrowRight className="w-4 h-4 ml-2" />
                                                </Button>
                                            </Link>
                                        )}
                                    </GlassCard>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Fechas pasadas */}
                {pastConcerts.length > 0 && (
                    <div className="mt-12">
                        <button
                            onClick={() => setShowPastDates(!showPastDates)}
                            className="text-slate-600 hover:text-slate-900 font-bold text-sm uppercase flex items-center gap-2 transition-colors"
                        >
                            {showPastDates ? '▼' : '▶'} Ver fechas anteriores ({pastConcerts.length})
                        </button>
                        {showPastDates && (
                            <div className="mt-6 opacity-60">
                                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {pastConcerts.map((concert, index) => (
                                        <div key={index} className="border border-slate-200 rounded-lg p-3 text-sm">
                                            <p className="font-bold text-slate-700">{concert.flag} {concert.city}</p>
                                            <p className="text-xs text-slate-500">{new Date(concert.date).toLocaleDateString('es-ES')}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* Cómo usar */}
            <section className="mb-16">
                <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 tracking-tight">Cómo usar esta página</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <GlassCard className="border border-slate-200">
                        <div className="flex items-start gap-3 mb-3">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-white font-black text-sm">
                                1
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 mb-1">Revisa el bloque superior</p>
                                <p className="text-sm text-slate-600">
                                    Sabrás al instante si hay show hoy o cuánto falta para el próximo.
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="border border-slate-200">
                        <div className="flex items-start gap-3 mb-3">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-white font-black text-sm">
                                2
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 mb-1">Filtra por país</p>
                                <p className="text-sm text-slate-600">
                                    Usa el filtro para ver solo las fechas de tu interés.
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="border border-slate-200">
                        <div className="flex items-start gap-3 mb-3">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-white font-black text-sm">
                                3
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 mb-1">Comparte el contador</p>
                                <p className="text-sm text-slate-600">
                                    Cada tarjeta tiene un enlace directo para compartir con otros ARMY.
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="border border-slate-200">
                        <div className="flex items-start gap-3 mb-3">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-white font-black text-sm">
                                4
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 mb-1">Marca la fecha</p>
                                <p className="text-sm text-slate-600">
                                    Agrega el evento a tu calendario para no perderte la venta de entradas.
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </section>

            {/* FAQ */}
            <section className="mb-16">
                <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 tracking-tight">Preguntas frecuentes</h2>
                <div className="space-y-4">
                    {[
                        {
                            question: '¿Cuál es el próximo concierto de BTS?',
                            answer: 'El contador de esta misma página se actualiza en tiempo real con la siguiente fecha confirmada más cercana a hoy.',
                        },
                        {
                            question: '¿Hay concierto de BTS hoy?',
                            answer: 'Revisa el bloque destacado en la parte superior de esta página: se actualiza automáticamente y te lo indica sin que tengas que hacer cálculos de horario.',
                        },
                        {
                            question: '¿Los conciertos son en hora de Corea o en hora local?',
                            answer: 'En hora local de cada ciudad. La hora de Corea (KST) solo se muestra como referencia adicional, útil para contenido en Weverse.',
                        },
                        {
                            question: '¿Dónde compro entradas para la fecha que me interesa?',
                            answer: 'Para Chile: <a href="https://www.btschile.com" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">btschile.com</a> | Para Perú: <a href="https://entradasbts.com/peru" class="text-primary font-bold hover:underline">entradasbts.com/peru</a> | Para Argentina: <a href="https://entradasbts.com/argentina" class="text-primary font-bold hover:underline">entradasbts.com/argentina</a> | Para Colombia: <a href="https://entradasbts.com/colombia" class="text-primary font-bold hover:underline">entradasbts.com/colombia</a> | Para Brasil: <a href="https://entradasbts.com/brasil" class="text-primary font-bold hover:underline">entradasbts.com/brasil</a>',
                            isHtml: true,
                        },
                    ].map((faq, index) => (
                        <GlassCard key={index} className="border border-slate-200">
                            <h3 className="text-lg font-black mb-3 text-slate-900">{faq.question}</h3>
                            {faq.isHtml ? (
                                <p className="text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                            ) : (
                                <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                            )}
                        </GlassCard>
                    ))}
                </div>
            </section>

            {/* Link a gira mundial */}
            <section>
                <GlassCard className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary text-center">
                    <h2 className="text-3xl font-black uppercase mb-4 text-slate-900">
                        ¿Buscas todas las fechas y la historia de la gira?
                    </h2>
                    <p className="text-slate-700 mb-6">
                        Visita nuestra guía completa con el contexto histórico, todas las 34 ciudades, detalles de producción y más.
                    </p>
                    <Link href="/gira-mundial">
                        <Button variant="primary" size="lg">
                            Ver guía completa de la gira <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </GlassCard>
            </section>
        </div>
    );
}
