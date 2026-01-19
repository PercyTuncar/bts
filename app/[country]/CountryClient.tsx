"use client";

import { useState, useEffect } from "react";
import { CountryData } from "@/lib/data/countries";
import { Calendar, MapPin, Ticket, CreditCard, Minus, Plus, Music, ArrowRight, X, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, Variants } from "framer-motion";
import { CommunityModal } from "@/components/CommunityModal";
import { MembershipModal } from "@/components/MembershipModal";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
    country: CountryData;
};

// Sales Phases Configuration
const PHASES = [
    {
        id: 'early-bird',
        name: 'Early Bird',
        dates: '17 Ene - 22 Ene',
        start: new Date(2026, 0, 17),
        end: new Date(2026, 0, 22, 23, 59, 59),
        color: 'bg-acid-pink',
        textColor: 'text-acid-pink',
        supply: 85
    },
    {
        id: 'preventa-1',
        name: 'Preventa 1',
        dates: '23 Ene - 15 Feb',
        start: new Date(2026, 0, 23),
        end: new Date(2026, 1, 15, 23, 59, 59),
        color: 'bg-acid-yellow',
        textColor: 'text-acid-yellow',
        supply: 0
    },
    {
        id: 'preventa-3',
        name: 'Venta General',
        dates: '16 Feb - 08 Oct',
        start: new Date(2026, 1, 16),
        end: new Date(2026, 9, 8, 20, 0, 0),
        color: 'bg-neon-green',
        textColor: 'text-neon-green',
        supply: 0
    }
];

const INSTALLMENT_CONFIG: Record<string, { fee: number; reservation: number }> = {
    'peru': { fee: 100, reservation: 100 }, // 100 PEN
    'chile': { fee: 31000, reservation: 31000 }, // ~110 PEN
    'mexico': { fee: 660, reservation: 660 }, // ~110 PEN
    'colombia': { fee: 121000, reservation: 121000 }, // ~110 PEN
};

export default function CountryClient({ country }: Props) {
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const formatDateRange = (dates: string[]) => {
        if (!dates.length) return '';
        // Append T12:00:00 to prevent timezone shifts (UTC vs Local)
        const parseDate = (d: string) => new Date(d + "T12:00:00");

        const d1 = parseDate(dates[0]);
        const month = d1.toLocaleDateString('es-ES', { month: 'long' });
        const year = d1.getFullYear();

        if (dates.length === 1) {
            // Capitalize first letter of the day
            const weekday = d1.toLocaleDateString('es-ES', { weekday: 'long' });
            const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
            return `${capitalizedWeekday}, ${d1.getDate()} de ${month} de ${year}`;
        } else {
            const days = dates.map(d => parseDate(d).getDate()).join(' y ');
            return `${days} de ${month.charAt(0).toUpperCase() + month.slice(1)} de ${year}`;
        }
    };

    const primaryDate = formatDateRange(country.dates);
    const whatsappNumber = "51944784488";

    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [isInstallment, setIsInstallment] = useState(false);
    const [isCommunityOpen, setIsCommunityOpen] = useState(false);
    const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
    const [installmentMonths, setInstallmentMonths] = useState(3);
    const [mounted, setMounted] = useState(false);

    // Initial tick to avoid hydration mismatch
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const router = useRouter();

    // JSON-LD Structured Data
    const minPrice = Math.min(...country.prices.map(p => p.price));
    const maxPrice = Math.max(...country.prices.map(p => p.price));

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": `Concierto BTS ${country.name} 2026`,
        "description": country.description,
        "image": [
            `https://entradasbts.com${country.openGraphImage}`,
            "https://entradasbts.com/images/concert-bg.png"
        ],
        "startDate": `${country.dates[0]}T20:00:00-05:00`,
        "endDate": `${country.dates[country.dates.length - 1]}T23:00:00-05:00`,
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
            "@type": "Place",
            "name": country.venue,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": country.id === 'peru' ? 'C. José Díaz s/n' :
                    country.id === 'chile' ? 'Av. Marathon 5300' :
                        country.id === 'mexico' ? 'Calz. de Tlalpan 3465' : 'Cra. 57a #30-97',
                "addressLocality": country.city,
                "postalCode": country.id === 'peru' ? '15046' :
                    country.id === 'chile' ? '7820919' :
                        country.id === 'mexico' ? '04610' : '111311',
                "addressCountry": country.isoCode
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": country.id === 'peru' ? -12.0673 :
                    country.id === 'chile' ? -33.5131 :
                        country.id === 'mexico' ? 19.3029 : 4.6459,
                "longitude": country.id === 'peru' ? -77.0337 :
                    country.id === 'chile' ? -70.6112 :
                        country.id === 'mexico' ? -99.1505 : -74.0775
            }
        },
        "organizer": {
            "@type": "Organization",
            "name": "Hybe Corporation",
            "url": "https://ibighit.com"
        },
        "performer": {
            "@type": "PerformingGroup",
            "name": "BTS",
            "sameAs": [
                "https://ibighit.com/bts",
                "https://en.wikipedia.org/wiki/BTS",
                "https://open.spotify.com/artist/3Nrfpe0tUJi4K4DXYWgMUX"
            ]
        },
        "offers": {
            "@type": "AggregateOffer",
            "url": `https://entradasbts.com/${country.id}/`,
            "priceCurrency": country.currency,
            "lowPrice": minPrice.toString(),
            "highPrice": maxPrice.toString(),
            "offerCount": country.prices.length.toString(),
            "availability": "https://schema.org/InStock",
            "validFrom": "2025-01-01",
            "seller": {
                "@type": "Organization",
                "name": "RaveHub Latam",
                "url": "https://www.ravehublatam.com",
                "image": "https://www.ravehublatam.com/logo.png"
            },
            "offers": country.prices.map(p => ({
                "@type": "Offer",
                "name": p.zone,
                "category": p.price >= 1000 ? "VIP" : "Seating",
                "price": p.price.toString(),
                "priceCurrency": country.currency,
                "availability": "https://schema.org/InStock",
                "url": `https://entradasbts.com/${country.id}/`
            }))
        }
    };


    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [{
            "@type": "Question",
            "name": "¿Cómo es el proceso de compra segura con RaveHub?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nuestro proceso de Compra Segura utiliza tecnología anti-fraude y verificación de tres pasos para asegurar que cada fan tenga acceso legítimo a sus entradas, eliminando la incertidumbre del mercado secundario."
            }
        }, {
            "@type": "Question",
            "name": "¿Es seguro comprar entradas de reventa para BTS?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sí, con la Garantía RaveHub. Eliminamos los riesgos porque verificamos a los vendedores y protegemos tu dinero hasta que ingresas al evento. Ofrecemos soporte local en Lima."
            }
        }]
    };

    useEffect(() => {
        setMounted(true);
        const target = new Date(country.dates[0] + "T20:00:00").getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = target - now;

            if (distance < 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [country.dates]);

    const currentDate = mounted ? new Date() : new Date('2026-01-16');

    const activePhaseIndex = PHASES.findIndex(p => currentDate >= p.start && currentDate <= p.end);
    const activePhase = activePhaseIndex !== -1 ? PHASES[activePhaseIndex] : (currentDate < PHASES[0].start ? null : PHASES[PHASES.length - 1]);
    const config = INSTALLMENT_CONFIG[country.id] || { fee: 100, reservation: 100 };

    const updateQuantity = (zone: string, delta: number) => {
        setQuantities(prev => {
            const current = prev[zone] || 0;
            const next = Math.max(0, current + delta);
            return { ...prev, [zone]: next };
        });
    };

    const getPrice = (basePrice: number) => isInstallment ? basePrice + config.fee : basePrice;
    const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0);

    const calculateTotal = () => {
        let total = 0;
        country.prices.forEach(z => {
            const count = quantities[z.zone] || 0;
            total += getPrice(z.price) * count;
        });
        return total;
    };

    const totalAmount = calculateTotal();
    const reservationAmount = isInstallment ? totalTickets * config.reservation : 0;
    const remainingAmount = totalAmount - reservationAmount;
    const monthlyPayment = isInstallment && installmentMonths > 0 ? remainingAmount / installmentMonths : 0;

    const getPaymentDates = () => {
        const dates = [];
        const start = new Date();
        for (let i = 1; i <= installmentMonths; i++) {
            const d = new Date(start);
            d.setMonth(start.getMonth() + i);
            dates.push(d);
        }
        return dates;
    };
    const paymentDates = getPaymentDates();

    const generateWhatsAppLink = () => {
        if (!selectedDate) return '#';
        const dateObj = new Date(selectedDate);
        const dateStr = dateObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });

        const items = country.prices.filter(z => (quantities[z.zone] || 0) > 0).map(z => `• ${quantities[z.zone]}x ${z.zone}`).join('\n');
        const breakdown = isInstallment
            ? `\nReserva inicial (HOY): ${country.currencySymbol}${reservationAmount.toLocaleString('en-US')}\nRestante: ${installmentMonths} cuotas de ${country.currencySymbol}${Math.ceil(monthlyPayment).toLocaleString('en-US')} (Primera cuota: ${paymentDates[0].toLocaleDateString('es-ES')})`
            : '';

        const fullMessage = `Hola, quiero entradas para BTS en ${country.city} el fan *${dateStr}*.\n\n${items}\n${breakdown}\n\nTotal a Pagar: ${country.currencySymbol}${totalAmount.toLocaleString('en-US')}`;
        return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;
    };

    // Brutalist Clock Component
    // Brutalist Clock Component
    const Digit = ({ val, label }: { val: number, label: string }) => (
        <div className="flex flex-col items-center">
            <div className="w-16 h-20 md:w-24 md:h-32 bg-black border-2 border-acid-yellow flex items-center justify-center relative overflow-hidden">
                <span className="text-3xl md:text-6xl font-black text-white font-mono z-10 tracking-tighter">{val.toString().padStart(2, '0')}</span>
                <div className="absolute inset-0 bg-acid-yellow/10 mix-blend-difference"></div>
            </div>
            <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest mt-2 bg-white text-black px-1">{label}</span>
        </div>
    );

    return (
        <div className="min-h-screen text-white font-sans selection:bg-acid-pink selection:text-black overflow-x-hidden">

            {/* NOISE & GRID BACKGROUND */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-noise mix-blend-overlay"></div>
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>

            {/* MARQUEE HEADER */}
            <div className="fixed top-20 left-0 w-full bg-acid-yellow text-black z-40 border-y-2 border-black overflow-hidden py-1">
                <div className="flex whitespace-nowrap animate-marquee">
                    {[...Array(10)].map((_, i) => (
                        <span key={i} className="text-sm font-black uppercase tracking-widest mx-4">
                            Gira Mundial 2026 • En Vivo desde {country.city} • Compra tus Entradas • {selectedDate ? new Date(selectedDate).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }) : 'Selecciona una Fecha'} •
                        </span>
                    ))}
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
            />

            {/* HERO SECTION */}
            <section className="relative min-h-[90vh] flex flex-col pt-32 pb-20 overflow-hidden border-b-2 border-white/20">
                <motion.div style={{ y: heroY, opacity }} className="absolute inset-0 w-screen h-full z-0 opacity-60">
                    <Image
                        src="https://images.prestigeonline.com/wp-content/uploads/sites/6/2022/08/09215459/BTS-members-1600x900.jpg"
                        alt={`Concierto BTS ${country.name} ${country.venue} lleno Army Kpop`}
                        fill
                        className="object-cover grayscale contrast-125"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-black/30"></div>
                </motion.div>

                <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col justify-between flex-1">
                    <div className="max-w-5xl">
                        <motion.h1
                            initial={{ x: 0, opacity: 1 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "anticipate" }}
                            className="text-[8rem] md:text-[16rem] leading-[0.8] font-black tracking-tighter text-white mix-blend-overlay opacity-90"
                            style={{ fontFamily: '"Arial Black", sans-serif' }}
                        >
                            <span className="sr-only">ENTRADAS BTS {country.name.toUpperCase()} </span>BTS
                        </motion.h1>

                        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-4 md:-mt-12 ml-2 md:ml-4">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, type: "spring" }}
                                className="bg-acid-pink text-black px-4 py-1 text-xl md:text-2xl font-black uppercase -rotate-2 shadow-[4px_4px_0px_white]"
                            >
                                World Tour '26
                            </motion.div>

                            <h2 className="text-6xl md:text-8xl font-serif italic text-acid-yellow z-20 relative drop-shadow-[0_4px_0_rgba(0,0,0,0.5)]">
                                {country.city}
                            </h2>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mt-20">
                        {/* INFO BLOCK */}
                        <div className="bg-black border-2 border-white p-6 max-w-md w-full relative group">
                            <div className="absolute top-0 right-0 w-full h-full bg-white transition-transform group-hover:translate-x-2 group-hover:translate-y-2 -z-10 border-2 border-white"></div>

                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <p className="font-serif italic text-gray-400 text-lg">Próximo Evento</p>
                                    <p className="text-2xl font-bold uppercase">{primaryDate}</p>
                                </div>
                                <MapPin className="text-acid-yellow w-8 h-8" />
                            </div>

                            <div className="flex items-center gap-4 border-t border-white/20 pt-4">
                                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">
                                    <ArrowRight className="-rotate-45" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Lugar</p>
                                    <p className="text-lg font-bold">{country.venue}</p>
                                </div>
                            </div>
                        </div>

                        {/* CLOCK */}
                        <div className="flex gap-2 md:gap-4">
                            <Digit val={timeLeft.days} label="Días" />
                            <Digit val={timeLeft.hours} label="Hrs" />
                            <Digit val={timeLeft.minutes} label="Min" />
                            <Digit val={timeLeft.seconds} label="Seg" />
                        </div>
                    </div>
                </div>
            </section>

            {/* TICKETS & STAGES */}
            <section id="tickets" className="py-20 container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row gap-12">

                    {/* LEFT COL: TICKETS */}
                    <div className="flex-1">
                        <div className="mb-12 flex flex-col gap-8 border-b-4 border-white pb-8">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                                <h3 className="text-5xl font-black uppercase italic">Entradas</h3>

                                <div className="flex gap-2 w-full md:w-auto">
                                    <button onClick={() => setIsInstallment(false)} className={`flex-1 md:flex-none px-4 py-2 text-xs md:text-sm font-bold uppercase border-2 border-white transition-colors ${!isInstallment ? 'bg-white text-black' : 'hover:bg-white/10 text-white'}`}>
                                        Contado
                                    </button>
                                    <button onClick={() => setIsInstallment(true)} className={`flex-1 md:flex-none px-4 py-2 text-xs md:text-sm font-bold uppercase border-2 border-white transition-colors ${isInstallment ? 'bg-acid-yellow text-black border-acid-yellow' : 'hover:bg-white/10 text-white'}`}>
                                        Cuotas
                                    </button>
                                </div>
                            </div>

                            {/* INSTALLMENT SELECTOR (Only if Cuotas selected) */}
                            {isInstallment && (
                                <div className="animate-fade-in-up">
                                    <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">2. Elige tus cuotas</p>
                                    <div className="flex gap-2">
                                        {[2, 3].map(m => (
                                            <button
                                                key={m}
                                                onClick={() => setInstallmentMonths(m)}
                                                className={`flex-1 py-3 text-lg font-black uppercase border-2 transition-all ${installmentMonths === m ? 'bg-white text-black border-white' : 'border-white/20 text-gray-500 hover:border-white hover:text-white'}`}
                                            >
                                                {m} Cuotas
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-acid-yellow mt-2 font-mono">
                                        * Reserva inicial de {country.currencySymbol}{config.reservation.toLocaleString('en-US')} por entrada (incluye fee)
                                    </p>
                                </div>
                            )}

                            {/* DATE SELECTOR */}
                            <div className="space-y-4">
                                <p className="text-sm font-bold uppercase tracking-widest text-gray-400">1. Selecciona la Fecha</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {country.dates.map((date) => {
                                        const d = new Date(date + "T12:00:00");
                                        const isSelected = selectedDate === date;
                                        return (
                                            <button
                                                key={date}
                                                onClick={() => setSelectedDate(date)}
                                                className={`p-4 border-2 flex flex-col items-center justify-center transition-all ${isSelected ? 'bg-acid-pink border-acid-pink text-black shadow-[4px_4px_0_white]' : 'border-white/30 text-gray-400 hover:border-white hover:text-white'}`}
                                            >
                                                <span className="text-3xl font-black uppercase leading-none">{d.getDate()}</span>
                                                <span className="text-xs font-bold uppercase tracking-widest">{d.toLocaleDateString('es-ES', { month: 'short' })}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {country.prices.map((zone, i) => (
                                <div key={zone.zone} className="group relative">
                                    <div className="absolute inset-0 bg-white translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative bg-[#111] border-2 border-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 bg-clip-padding">

                                        <div className="flex items-center gap-6 flex-1">
                                            <span className="text-4xl font-serif italic text-gray-600 group-hover:text-acid-pink transition-colors">0{i + 1}</span>
                                            <div>
                                                <h4 className="text-2xl font-black uppercase leading-none mb-2">{zone.zone}</h4>
                                                <div className="flex gap-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                                                    <span className="bg-white/10 px-2 py-1">Verificado</span>
                                                    {i === 0 && <span className="bg-acid-yellow text-black px-2 py-1">Best Seller</span>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-8">
                                            <div className="text-right">
                                                <p className="text-3xl font-bold font-mono">{country.currencySymbol}{getPrice(zone.price).toLocaleString('en-US')}</p>
                                                {isInstallment && <p className="text-[10px] text-gray-400 uppercase">+ Fee {country.currencySymbol}{config.fee}</p>}
                                            </div>

                                            <div className={`flex items-center border-2 ${!selectedDate ? 'border-gray-800 opacity-30 cursor-not-allowed' : 'border-white bg-black'}`}>
                                                <button onClick={() => updateQuantity(zone.zone, -1)} disabled={!activePhase || !selectedDate} className="w-10 h-10 flex items-center justify-center hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-current">
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-12 text-center font-mono font-bold text-lg">{quantities[zone.zone] || 0}</span>
                                                <button onClick={() => updateQuantity(zone.zone, 1)} disabled={!activePhase || !selectedDate} className="w-10 h-10 flex items-center justify-center hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-current">
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COL: MAP & SUMMARY */}
                    <div className="w-full md:w-[400px] space-y-8">
                        <div className="border-4 border-white p-2">
                            <div className="bg-[#1a1a1a] relative aspect-square grayscale hover:grayscale-0 transition-all duration-500">
                                <Image src="/images/stadium-map.png" alt={`Mapa de zonas y precios ${country.venue} concierto BTS ${country.city}`} fill className="object-contain p-4 mix-blend-lighten" />
                                <div className="absolute bottom-0 left-0 bg-acid-yellow text-black px-3 py-1 text-xs font-black uppercase">
                                    Mapa del Escenario
                                </div>
                            </div>
                        </div>

                        {/* COMMUNITY CARD */}
                        <div
                            onClick={() => setIsCommunityOpen(true)}
                            className="bg-[#25D366] text-black p-6 cursor-pointer hover:bg-[#128C7E] hover:text-white transition-colors group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-50">
                                <Image src="/images/whatsapp.svg" alt="WhatsApp" width={48} height={48} className="w-12 h-12" />
                            </div>
                            <h4 className="text-2xl font-black uppercase italic mb-2 relative z-10">
                                Grupos de WhatsApp
                            </h4>
                            <p className="font-medium text-sm leading-tight relative z-10 max-w-[90%]">
                                Únete a la comunidad oficial y organiza tu viaje al concierto.
                            </p>
                            <div className="mt-4 inline-flex items-center gap-2 font-bold uppercase text-xs tracking-widest border border-black group-hover:border-white px-3 py-1 relative z-10">
                                Unirme Ahora <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>

                        {/* RAVEHUB TRUST CARD */}
                        <a
                            href={country.id === 'peru' ? "https://www.ravehublatam.com/eventos/bts-en-lima-2026" : "https://www.ravehublatam.com"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                        >
                            <div className="bg-[#111] border-2 border-white/20 p-6 flex items-start gap-4 hover:border-acid-yellow transition-colors relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-acid-yellow text-black text-[10px] font-black uppercase px-2 py-1">
                                    Verified Partner
                                </div>
                                <div className="bg-white/10 p-3 rounded-full text-acid-yellow group-hover:bg-acid-yellow group-hover:text-black transition-colors">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-black uppercase text-white leading-none mb-1 group-hover:text-acid-yellow transition-colors">Verificado por RaveHub</h4>
                                    <p className="text-xs text-gray-400 font-mono leading-relaxed">
                                        Garantía de autenticidad del 100%. Soporte local en {country.city}.
                                    </p>
                                </div>
                            </div>
                        </a>

                        {/* PHASE STATUS */}
                        <div className="bg-white/5 border border-white/20 p-6">
                            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Status de Venta</h4>
                            <div className="space-y-4">
                                {PHASES.map((p) => {
                                    const active = currentDate >= p.start && currentDate <= p.end;
                                    return (
                                        <div key={p.id} className={`flex items-center justify-between ${active ? 'opacity-100' : 'opacity-40'}`}>
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${active ? p.color : 'bg-gray-600'}`}></div>
                                                <span className={`text-sm font-bold uppercase ${active ? 'text-white' : 'text-gray-500'}`}>{p.name}</span>
                                            </div>
                                            {active && <span className="text-[10px] bg-white text-black px-2 rounded font-bold">LIVE</span>}
                                        </div>
                                    )
                                })}
                            </div>
                            {/* PAYMENT SCHEDULE SUMMARY */}
                            {isInstallment && totalTickets > 0 && (
                                <div className="bg-[#111] border-2 border-acid-yellow/50 p-6 animate-fade-in-up">
                                    <h4 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2 text-acid-yellow">Cronograma de Pagos</h4>
                                    <div className="space-y-3 font-mono text-sm">
                                        <div className="flex justify-between items-center text-white font-bold">
                                            <span>HOY (Reserva + Fee)</span>
                                            <span>{country.currencySymbol}{reservationAmount.toLocaleString('en-US')}</span>
                                        </div>
                                        {paymentDates.map((date, i) => (
                                            <div key={i} className="flex justify-between items-center text-gray-400">
                                                <span>Cuota {i + 1} ({date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })})</span>
                                                <span>{country.currencySymbol}{monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                                            </div>
                                        ))}
                                        <div className="border-t border-white/20 pt-2 mt-2 flex justify-between items-center text-acid-pink font-bold">
                                            <span>Total Final</span>
                                            <span>{country.currencySymbol}{totalAmount.toLocaleString('en-US')}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div >
            </section >

            {/* TRUST & INFO SECTION (SEO THIN CONTENT FIX) */}
            <section className="container mx-auto px-4 md:px-8 pb-24 text-gray-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto border-t border-white/20 pt-16">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4 uppercase">¿Cómo es el proceso de compra segura con RaveHub?</h3>
                            <p className="leading-relaxed">En RaveHub, hemos simplificado la experiencia de usuario para eliminar fricciones y garantizar transparencia en cada clic. Nuestro proceso de "Compra Segura" se estructura en tres pasos blindados tecnológicamente para asegurar que cada fan tenga acceso legítimo a sus entradas.</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4 uppercase">¿Por qué comprar aquí es seguro?</h3>
                            <p className="leading-relaxed mb-4">La Garantía RaveHub es nuestro compromiso de "Cero Riesgos". Comprar aquí es seguro porque eliminamos la incertidumbre del mercado secundario informal.</p>
                            <ul className="space-y-2 list-disc pl-5">
                                <li><strong>Verificación:</strong> Solo trabajamos con organizadores de eventos verificados.</li>
                                <li><strong>Protección Anti-Fraude:</strong> Nuestro sistema previene la duplicación y falsificación.</li>
                                <li><strong>Soporte 24/7:</strong> Canal exclusivo para resolver incidencias.</li>
                                <li><strong>Transparencia:</strong> Precios finales sin comisiones ocultas.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div>
                            {/* CORRECCIÓN: Cambiamos "SEO" por "Hito Histórico" o "Cultural". Suena más épico. */}
                            <h3 className="text-2xl font-bold text-white mb-4 uppercase">
                                Historia de BTS en {country.name}: Un Hito Histórico para el Army
                            </h3>

                            <p className="leading-relaxed mb-4">
                                La relación entre BTS y {country.name} es una historia de espera que finalmente se materializa en 2026.
                                A diferencia de visitas anteriores a la región, esta llegada oficial al {country.venue} marca el
                                evento cultural más importante de la década.
                            </p>

                            {/* CORRECCIÓN: Integramos la keyword de forma natural sin decir "la búsqueda de..." */}
                            <p className="leading-relaxed mb-4">
                                La demanda acumulada ha generado una expectativa sin precedentes. Por ello, encontrar dónde
                                <strong className="text-white font-bold"> comprar entradas para BTS en {country.city} de forma 100% segura </strong>
                                es la prioridad absoluta para proteger tu inversión y tu sueño.
                            </p>

                            <p className="leading-relaxed">
                                Al adquirir tus pases a través de canales verificados como RaveHub, aseguras tu lugar en el
                                Estadio Nacional con total confianza y garantía local.
                            </p>
                        </div>
                    </div>
                </div>
            </section >

            {/* STICKY CHECKOUT BAR */}
            <AnimatePresence>
                {
                    totalTickets > 0 && (
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed bottom-0 left-0 w-full z-50 bg-acid-yellow border-t-4 border-black text-black p-4 md:p-6"
                        >
                            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="bg-black text-acid-yellow w-12 h-12 flex items-center justify-center font-black text-xl border-2 border-black">
                                        {totalTickets}
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-black/60">
                                            {isInstallment ? 'A Pagar HOY' : 'Total a Pagar'}
                                        </p>
                                        <div className="flex flex-col">
                                            <p className="text-3xl font-black font-mono tracking-tight leading-none">
                                                {country.currencySymbol}{isInstallment ? reservationAmount.toLocaleString('en-US') : totalAmount.toLocaleString('en-US')}
                                            </p>
                                            {isInstallment && (
                                                <span className="text-xs font-bold text-black/50">
                                                    + {installmentMonths} cuotas de {country.currencySymbol}{Math.ceil(monthlyPayment).toLocaleString('en-US')}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsMembershipModalOpen(true)}
                                    className="w-full md:w-auto bg-black text-white hover:bg-white hover:text-black px-12 py-4 text-xl font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                                >
                                    Finalizar Compra <ArrowRight className="w-6 h-6" />
                                </button>
                            </div>
                        </motion.div>
                    )
                }

            </AnimatePresence >

            <CommunityModal isOpen={isCommunityOpen} onClose={() => setIsCommunityOpen(false)} />
            <MembershipModal isOpen={isMembershipModalOpen} onClose={() => setIsMembershipModalOpen(false)} />

        </div >
    );
}
