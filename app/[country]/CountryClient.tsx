"use client";

import { useState, useEffect } from "react";
import { CountryData } from "@/lib/data/countries";
import { Calendar, MapPin, Ticket, CreditCard, Minus, Plus, Music, ArrowRight, X, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
    'argentina': { fee: 50000, reservation: 50000 }, // ~110 PEN
    'brasil': { fee: 200, reservation: 200 }, // ~110 PEN
};

const translations = {
    es: {
        worldTour: "Gira Mundial",
        liveFrom: "En Vivo desde",
        buyTickets: "Compra tus Entradas",
        selectDate: "Selecciona una Fecha",
        tickets: "Entradas",
        nextEvent: "Próximo Evento",
        place: "Lugar",
        days: "Días",
        hrs: "Hrs",
        min: "Min",
        seg: "Seg",
        cash: "Contado",
        installments: "Cuotas",
        selectDateStep: "1. Selecciona la Fecha",
        chooseInstallments: "2. Elige tus cuotas",
        initialReservation: "Reserva inicial de",
        perTicket: "por entrada (incluye fee)",
        verified: "Verificado",
        bestSeller: "Best Seller",
        fee: "Fee",
        mapStage: "Mapa del Escenario",
        whatsappGroups: "Grupos de WhatsApp",
        joinCommunity: "Únete a la comunidad oficial y organiza tu viaje al concierto.",
        joinNow: "Unirme Ahora",
        verifiedPartner: "Verified Partner",
        verifiedBy: "Verificado por RaveHub",
        guarantee: "Garantía de autenticidad del 100%. Soporte local en",
        salesStatus: "Status de Venta",
        live: "LIVE",
        paymentSchedule: "Cronograma de Pagos",
        today: "HOY (Reserva + Fee)",
        quota: "Cuota",
        finalTotal: "Total Final",
        secureProcessTitle: "¿Cómo es el proceso de compra segura con RaveHub?",
        secureProcessDesc: "En RaveHub, hemos simplificado la experiencia de usuario para eliminar fricciones y garantizar transparencia en cada clic. Nuestro proceso de \"Compra Segura\" se estructura en tres pasos blindados tecnológicamente para asegurar que cada fan tenga acceso legítimo a sus entradas.",
        whySecureTitle: "¿Por qué comprar aquí es seguro?",
        whySecureDesc: "La Garantía RaveHub es nuestro compromiso de \"Cero Riesgos\". Comprar aquí es seguro porque eliminamos la incertidumbre del mercado secundario informal.",
        verification: "Verificación:",
        verificationDesc: "Solo trabajamos con organizadores de eventos verificados.",
        fraudProtection: "Protección Anti-Fraude:",
        fraudProtectionDesc: "Nuestro sistema previene la duplicación y falsificación.",
        support: "Soporte 24/7:",
        supportDesc: "Canal exclusivo para resolver incidencias.",
        transparency: "Transparencia:",
        transparencyDesc: "Precios finales sin comisiones ocultas.",
        historyTitle: "Historia de BTS en {country}: Un Hito Histórico para el Army",
        historyDesc1: "La relación entre BTS y {country} es una historia de espera que finalmente se materializa en 2026. A diferencia de visitas anteriores a la región, esta llegada oficial al {venue} marca el evento cultural más importante de la década.",
        historyDesc2: "La demanda acumulada ha generado una expectativa sin precedentes. Por ello, encontrar dónde",
        historyDesc3: "comprar entradas para BTS en {city} de forma 100% segura",
        historyDesc4: "es la prioridad absoluta para proteger tu inversión y tu sueño.",
        historyDesc5: "Al adquirir tus pases a través de canales verificados como RaveHub, aseguras tu lugar en el evento con total confianza y garantía local.",
        toPayToday: "A Pagar HOY",
        totalToPay: "Total a Pagar",
        installmentsOf: "cuotas de",
        checkout: "Finalizar Compra"
    },
    pt: {
        worldTour: "Turnê Mundial",
        liveFrom: "Ao Vivo de",
        buyTickets: "Compre seus Ingressos",
        selectDate: "Selecione uma Data",
        tickets: "Ingressos",
        nextEvent: "Próximo Evento",
        place: "Local",
        days: "Dias",
        hrs: "Hrs",
        min: "Min",
        seg: "Seg",
        cash: "À Vista",
        installments: "Parcelado",
        selectDateStep: "1. Selecione a Data",
        chooseInstallments: "2. Escolha suas parcelas",
        initialReservation: "Reserva inicial de",
        perTicket: "por ingresso (inclui taxa)",
        verified: "Verificado",
        bestSeller: "Mais Vendido",
        fee: "Taxa",
        mapStage: "Mapa do Palco",
        whatsappGroups: "Grupos de WhatsApp",
        joinCommunity: "Junte-se à comunidade oficial e organize sua viagem para o show.",
        joinNow: "Entrar Agora",
        verifiedPartner: "Parceiro Verificado",
        verifiedBy: "Verificado por RaveHub",
        guarantee: "Garantia de autenticidade de 100%. Suporte local em",
        salesStatus: "Status de Venda",
        live: "AO VIVO",
        paymentSchedule: "Cronograma de Pagamentos",
        today: "HOJE (Reserva + Taxa)",
        quota: "Parcela",
        finalTotal: "Total Final",
        secureProcessTitle: "Como é o processo de compra segura com a RaveHub?",
        secureProcessDesc: "Na RaveHub, simplificamos a experiência do usuário para eliminar atritos e garantir transparência em cada clique. Nosso processo de \"Compra Segura\" é estruturado em três passos blindados tecnologicamente para garantir que cada fã tenha acesso legítimo aos seus ingressos.",
        whySecureTitle: "Por que comprar aqui é seguro?",
        whySecureDesc: "A Garantia RaveHub é nosso compromisso de \"Risco Zero\". Comprar aqui é seguro porque eliminamos a incerteza do mercado secundário informal.",
        verification: "Verificação:",
        verificationDesc: "Trabalhamos apenas com organizadores de eventos verificados.",
        fraudProtection: "Proteção Antifraude:",
        fraudProtectionDesc: "Nosso sistema previne duplicação e falsificação.",
        support: "Suporte 24/7:",
        supportDesc: "Canal exclusivo para resolver incidentes.",
        transparency: "Transparência:",
        transparencyDesc: "Preços finais sem taxas ocultas.",
        historyTitle: "História do BTS no {country}: Um Marco Histórico para o Army",
        historyDesc1: "A relação entre BTS e {country} é uma história de espera que finalmente se concretiza em 2026. Ao contrário de visitas anteriores à região, esta chegada oficial ao {venue} marca o evento cultural mais importante da década.",
        historyDesc2: "A demanda acumulada gerou uma expectativa sem precedentes. Por isso, encontrar onde",
        historyDesc3: "comprar ingressos para BTS em {city} de forma 100% segura",
        historyDesc4: "é a prioridade absoluta para proteger seu investimento e seu sonho.",
        historyDesc5: "Ao adquirir seus ingressos através de canais verificados como a RaveHub, você garante seu lugar no evento com total confiança e garantia local.",
        toPayToday: "A Pagar HOJE",
        totalToPay: "Total a Pagar",
        installmentsOf: "parcelas de",
        checkout: "Finalizar Compra"
    },
    mx: {
        worldTour: "Gira Mundial",
        liveFrom: "En Vivo desde",
        buyTickets: "Compra tus Boletos",
        selectDate: "Selecciona una Fecha",
        tickets: "Boletos",
        nextEvent: "Próximo Evento",
        place: "Lugar",
        days: "Días",
        hrs: "Hrs",
        min: "Min",
        seg: "Seg",
        cash: "Contado",
        installments: "Cuotas",
        selectDateStep: "1. Selecciona la Fecha",
        chooseInstallments: "2. Elige tus cuotas",
        initialReservation: "Reserva inicial de",
        perTicket: "por boleto (incluye fee)",
        verified: "Verificado",
        bestSeller: "Best Seller",
        fee: "Fee",
        mapStage: "Mapa del Escenario",
        whatsappGroups: "Grupos de WhatsApp",
        joinCommunity: "Únete a la comunidad oficial y organiza tu viaje al concierto.",
        joinNow: "Unirme Ahora",
        verifiedPartner: "Verified Partner",
        verifiedBy: "Verificado por RaveHub",
        guarantee: "Garantía de autenticidad del 100%. Soporte local en",
        salesStatus: "Status de Venta",
        live: "LIVE",
        paymentSchedule: "Cronograma de Pagos",
        today: "HOY (Reserva + Fee)",
        quota: "Cuota",
        finalTotal: "Total Final",
        secureProcessTitle: "¿Cómo es el proceso de compra segura con RaveHub?",
        secureProcessDesc: "En RaveHub, hemos simplificado la experiencia de usuario para eliminar fricciones y garantizar transparencia en cada clic. Nuestro proceso de \"Compra Segura\" se estructura en tres pasos blindados tecnológicamente para asegurar que cada fan tenga acceso legítimo a sus entradas.",
        whySecureTitle: "¿Por qué comprar aquí es seguro?",
        whySecureDesc: "La Garantía RaveHub es nuestro compromiso de \"Cero Riesgos\". Comprar aquí es seguro porque eliminamos la incertidumbre del mercado secundario informal.",
        verification: "Verificación:",
        verificationDesc: "Solo trabajamos con organizadores de eventos verificados.",
        fraudProtection: "Protección Anti-Fraude:",
        fraudProtectionDesc: "Nuestro sistema previene la duplicación y falsificación.",
        support: "Soporte 24/7:",
        supportDesc: "Canal exclusivo para resolver incidencias.",
        transparency: "Transparencia:",
        transparencyDesc: "Precios finales sin comisiones ocultas.",
        historyTitle: "Historia de BTS en {country}: Un Hito Histórico para el Army",
        historyDesc1: "La relación entre BTS y {country} es una historia de espera que finalmente se materializa en 2026. A diferencia de visitas anteriores a la región, esta llegada oficial al {venue} marca el evento cultural más importante de la década.",
        historyDesc2: "La demanda acumulada ha generado una expectativa sin precedentes. Por ello, encontrar dónde",
        historyDesc3: "comprar boletos para BTS en {city} de forma 100% segura",
        historyDesc4: "es la prioridad absoluta para proteger tu inversión y tu sueño.",
        historyDesc5: "Al adquirir tus pases a través de canales verificados como RaveHub, aseguras tu lugar en el evento con total confianza y garantía local.",
        toPayToday: "A Pagar HOY",
        totalToPay: "Total a Pagar",
        installmentsOf: "cuotas de",
        checkout: "Finalizar Compra"
    }
};

export default function CountryClient({ country }: Props) {
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const lang = country.id === 'brasil' ? 'pt' : (country.id === 'mexico' ? 'mx' : 'es');
    const t = translations[lang];

    const formatDateRange = (dates: string[]) => {
        if (!dates.length) return '';
        // Append T12:00:00 to prevent timezone shifts (UTC vs Local)
        const parseDate = (d: string) => new Date(d + "T12:00:00");
        const locale = lang === 'pt' ? 'pt-BR' : 'es-ES';

        const d1 = parseDate(dates[0]);
        const month = d1.toLocaleDateString(locale, { month: 'long' });
        const year = d1.getFullYear();

        if (dates.length === 1) {
            // Capitalize first letter of the day
            const weekday = d1.toLocaleDateString(locale, { weekday: 'long' });
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

    // PHASES DEFINITION
    const PHASES = [
        { id: 1, name: 'Early Bird', start: new Date('2025-06-01'), end: new Date('2025-06-15'), color: 'bg-pink-500' },
        { id: 2, name: 'Preventa 1', start: new Date('2025-06-16'), end: new Date('2025-06-30'), color: 'bg-purple-500' },
        { id: 3, name: 'Venta General', start: new Date('2025-07-01'), end: new Date('2026-05-10'), color: 'bg-green-500' },
    ];

    // MEXICO SPECIFIC DATES
    const MEXICO_DATES = {
        membership: {
            start: new Date('2026-01-23T09:00:00-06:00'), // CST
            end: new Date('2026-01-23T22:00:00-06:00')
        },
        vip: {
            start: new Date('2026-01-24T09:00:00-06:00'),
            end: new Date('2026-05-07T20:00:00-06:00')
        },
        general: {
            start: new Date('2026-01-24T09:00:00-06:00')
        }
    };

    const getTargetDate = () => {
        if (country.id === 'mexico') {
            const now = new Date();
            if (now < MEXICO_DATES.membership.start) return MEXICO_DATES.membership.start.getTime();
            if (now > MEXICO_DATES.membership.end && now < MEXICO_DATES.general.start) return MEXICO_DATES.general.start.getTime();
            return new Date(country.dates[0] + "T20:00:00").getTime(); // Fallback to event start
        }
        return new Date(country.dates[0] + "T20:00:00").getTime();
    };

    useEffect(() => {
        setMounted(true);
        const target = getTargetDate();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = target - now;

            if (distance < 0) {
                // For Mexico, if we pass membership start, we might want to stay at 0 or target next phase?
                // For simplicity, just show 0s if target passed.
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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
    }, [country.dates, country.id]);

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
        const dateStr = dateObj.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'es-ES', { day: 'numeric', month: 'long' });

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
            <div className="w-12 h-14 md:w-16 md:h-20 bg-white border border-slate-200 flex items-center justify-center relative overflow-hidden shadow-sm">
                <span className="text-2xl md:text-4xl font-black text-slate-900 font-mono z-10 tracking-tighter">{val.toString().padStart(2, '0')}</span>
                <div className="absolute inset-0 bg-slate-50 opacity-20"></div>
            </div>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2 text-slate-500 bg-white px-1 border border-slate-100">{label}</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-secondary selection:text-white overflow-x-hidden">

            {/* GRID BACKGROUND */}
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            {/* MARQUEE HEADER */}
            <div className="fixed top-20 left-0 w-full bg-slate-900 text-white z-40 border-y border-slate-200 overflow-hidden py-2 shadow-sm">
                <div className="flex whitespace-nowrap animate-marquee">
                    {[...Array(10)].map((_, i) => (
                        <span key={i} className="text-sm font-black uppercase tracking-widest mx-4">
                            {t.worldTour} 2026 • {t.liveFrom} {country.city} • {t.buyTickets} • {selectedDate ? new Date(selectedDate).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'es-ES', { weekday: 'long', day: 'numeric', month: 'long' }) : t.selectDate} •
                        </span>
                    ))}
                </div>
            </div>

            {/* HERO SECTION */}
            <section className="relative min-h-[90vh] flex flex-col pt-32 pb-20 overflow-hidden border-b border-slate-200 bg-white">
                <motion.div style={{ y: heroY, opacity }} className="absolute inset-0 w-screen h-full z-0">
                    <Image
                        src="https://images.prestigeonline.com/wp-content/uploads/sites/6/2022/08/09215459/BTS-members-1600x900.jpg"
                        alt={`Concierto BTS ${country.name} ${country.venue} lleno Army Kpop`}
                        fill
                        className="object-cover opacity-80"
                        priority
                        sizes="100vw"
                    />
                    {/* Modern Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-white/50 to-slate-50"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent"></div>
                </motion.div>

                <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col justify-between flex-1">
                    <div className="max-w-5xl relative">
                        {/* Decorative Blur Blob */}
                        <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl mix-blend-multiply filter pointer-events-none"></div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-[10rem] md:text-[18rem] leading-[0.75] font-black tracking-tighter select-none relative z-0"
                            style={{ fontFamily: '"Arial Black", sans-serif' }}
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-slate-200 to-white drop-shadow-sm stroke-slate-300"
                                style={{ WebkitTextStroke: '2px #e2e8f0' }}>
                                BTS
                            </span>
                        </motion.div>

                        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-8 md:-mt-20 ml-2 md:ml-4 relative z-20">

                            <motion.div
                                initial={{ scale: 0, rotate: -10 }}
                                animate={{ scale: 1, rotate: -2 }}
                                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 text-xl md:text-3xl font-black uppercase shadow-xl transform hover:scale-105 transition-transform"
                            >
                                World Tour '26
                            </motion.div>

                            <h1 className="relative">
                                <span className="block text-5xl md:text-8xl font-serif italic text-slate-800 relative z-20 tracking-tight">
                                    {country.city}
                                </span>
                                <span className="block text-lg md:text-2xl text-slate-500 font-sans font-bold tracking-[0.2em] mt-2 uppercase bg-white/50 backdrop-blur-sm px-2 inline-block rounded">
                                    {t.tickets} BTS {country.name}
                                </span>
                            </h1>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mt-12 pb-8">
                        {/* INFO BLOCK - Consistent Ticket Stub Style */}
                        <div className="bg-white border border-slate-200 p-6 max-w-sm w-full relative shadow-sm group hover:-translate-y-1 hover:shadow-[4px_4px_0_#A855F7] transition-all duration-200">
                            {/* Decorative Tape/Corner */}
                            <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-slate-300 bg-white z-20"></div>

                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="font-serif italic text-slate-400 text-sm mb-1">{t.nextEvent}</p>
                                    <p className="text-xl font-black uppercase text-slate-900 leading-tight">{primaryDate}</p>
                                </div>
                                <div className="text-primary">
                                    <MapPin className="w-6 h-6" />
                                </div>
                            </div>

                            <div className="flex items-center gap-4 border-t border-slate-100 pt-4 mt-2">
                                <div className="w-10 h-10 bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-lg border border-slate-200">
                                    <ArrowRight className="-rotate-45 w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t.place}</p>
                                    <p className="text-base font-bold text-slate-900 leading-tight">{country.venue}</p>
                                </div>
                            </div>
                        </div>

                        {/* CLOCK */}
                        <div className="flex gap-3 md:gap-4 bg-white p-4 border border-slate-200 shadow-sm relative">
                            {/* Perforated Edge Visual Hint */}
                            <div className="absolute -left-1 top-0 bottom-0 w-1 bg-[radial-gradient(circle,transparent_2px,#e2e8f0_2px)] bg-[length:4px_8px]"></div>

                            <Digit val={timeLeft.days} label={t.days} />
                            <Digit val={timeLeft.hours} label={t.hrs} />
                            <Digit val={timeLeft.minutes} label={t.min} />
                            <Digit val={timeLeft.seconds} label={t.seg} />
                        </div>
                    </div>
                </div>
            </section>

            {/* TICKETS & STAGES */}
            <section id="tickets" className="py-20 container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row gap-12">

                    {/* LEFT COL: TICKETS */}
                    <div className="flex-1">
                        <div className="mb-12 flex flex-col gap-8 border-b border-slate-200 pb-8">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                                <h3 className="text-5xl font-black uppercase italic text-slate-900">{t.tickets}</h3>

                                <div className="flex gap-2 w-full md:w-auto p-1 bg-slate-100 rounded-xl">
                                    <button onClick={() => setIsInstallment(false)} className={`flex-1 md:flex-none px-6 py-2 text-xs md:text-sm font-bold uppercase rounded-lg transition-all shadow-sm ${!isInstallment ? 'bg-white text-slate-900 shadow-md' : 'bg-transparent text-slate-500 hover:text-slate-900'}`}>
                                        {t.cash}
                                    </button>
                                    <button onClick={() => setIsInstallment(true)} className={`flex-1 md:flex-none px-6 py-2 text-xs md:text-sm font-bold uppercase rounded-lg transition-all shadow-sm ${isInstallment ? 'bg-primary text-white shadow-md' : 'bg-transparent text-slate-500 hover:text-primary'}`}>
                                        {t.installments}
                                    </button>
                                </div>
                            </div>

                            {/* INSTALLMENT SELECTOR (Only if Cuotas selected) */}
                            {isInstallment && (
                                <div className="animate-fade-in-up">
                                    <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2 pl-1">{t.chooseInstallments}</p>
                                    <div className="flex gap-4">
                                        {[2, 3].map(m => (
                                            <button
                                                key={m}
                                                onClick={() => setInstallmentMonths(m)}
                                                className={`flex-1 py-4 text-lg font-black uppercase border rounded-xl transition-all shadow-sm ${installmentMonths === m ? 'bg-secondary border-secondary text-white shadow-md transform -translate-y-0.5' : 'bg-white border-slate-200 text-slate-400 hover:border-secondary hover:text-secondary'}`}
                                            >
                                                {m} {t.installments}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-secondary mt-2 font-mono font-bold pl-1">
                                        * {t.initialReservation} {country.currencySymbol}{config.reservation.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US')} {t.perTicket}
                                    </p>
                                </div>
                            )}

                            {/* DATE SELECTOR */}
                            <div className="space-y-4">
                                <p className="text-sm font-bold uppercase tracking-widest text-slate-400 pl-1">{t.selectDateStep}</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {country.dates.map((date) => {
                                        const d = new Date(date + "T12:00:00");
                                        const isSelected = selectedDate === date;
                                        return (
                                            <button
                                                key={date}
                                                onClick={() => setSelectedDate(date)}
                                                className={`p-4 border rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${isSelected ? 'bg-gradient-to-br from-primary to-secondary border-transparent text-white shadow-lg transform -translate-y-1' : 'border-slate-200 text-slate-400 hover:border-primary hover:text-primary bg-white hover:shadow-md'}`}
                                            >
                                                <span className="text-3xl font-black uppercase leading-none">{d.getDate()}</span>
                                                <span className="text-xs font-bold uppercase tracking-widest mt-1">{d.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'es-ES', { month: 'short' })}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {country.prices.map((zone, i) => (
                                <div key={zone.zone} className="group relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl translate-x-0 translate-y-0 scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"></div>
                                    <div className="relative bg-white border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-lg">

                                        <div className="flex items-center gap-6 flex-1">
                                            <span className="text-4xl font-serif italic text-slate-200 group-hover:text-primary/20 transition-colors">0{i + 1}</span>
                                            <div>
                                                <h4 className="text-xl md:text-2xl font-black uppercase leading-none mb-2 text-slate-900">{zone.zone}</h4>
                                                {zone.description && (
                                                    <p className="text-sm text-slate-500 mt-2 font-medium leading-tight max-w-md">{zone.description}</p>
                                                )}
                                                {zone.color && zone.color !== 'N/A' && (
                                                    <p className="text-xs text-primary mt-2 font-mono uppercase bg-primary/5 inline-block px-2 py-1 rounded-md">{zone.color}</p>
                                                )}
                                                <div className="flex gap-3 text-xs font-bold uppercase tracking-widest text-slate-400 mt-3">
                                                    <span className={`px-2 py-1 rounded-md text-slate-500 ${country.id === 'mexico' ? 'bg-slate-100' : 'bg-orange-100 text-orange-600'}`}>
                                                        {country.id === 'mexico' ? t.verified : "Precio Ref. Aprox"}
                                                    </span>
                                                    {i === 0 && <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-md">{t.bestSeller}</span>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                                            <div className="text-right">
                                                <p className="text-2xl md:text-3xl font-bold font-mono text-slate-900">{country.currencySymbol}{getPrice(zone.price).toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US')}</p>
                                                {isInstallment && <p className="text-[10px] text-slate-500 uppercase">+ {t.fee} {country.currencySymbol}{config.fee}</p>}
                                            </div>

                                            <div className={`flex items-center border rounded-xl overflow-hidden ${!selectedDate ? 'border-slate-200 opacity-50 cursor-not-allowed bg-slate-50' : 'border-slate-300 bg-white shadow-sm'}`}>
                                                <button onClick={() => updateQuantity(zone.zone, -1)} disabled={!activePhase || !selectedDate} className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 text-slate-600 transition-colors disabled:opacity-50">
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-12 text-center font-mono font-bold text-lg text-slate-900">{quantities[zone.zone] || 0}</span>
                                                <button onClick={() => updateQuantity(zone.zone, 1)} disabled={!activePhase || !selectedDate} className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 text-slate-600 transition-colors disabled:opacity-50">
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
                        <div className="border border-slate-200 p-2 bg-white shadow-lg rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                            <div className="bg-slate-50 relative aspect-square rounded-xl overflow-hidden hover:grayscale-0 transition-all duration-500">
                                <Image src={country.id === 'mexico' ? "/images/mapa-mexico.png" : "/images/stadium-map.png"} alt={`Mapa de zonas y precios ${country.venue} concierto BTS ${country.city}`} fill className="object-contain p-4 bg-transparent" />
                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur text-slate-900 px-3 py-1 text-xs font-black uppercase rounded-lg shadow-sm">
                                    {t.mapStage}
                                </div>
                            </div>
                            {country.id === 'mexico' && (
                                <p className="text-[10px] text-slate-500 mt-3 px-2 pb-1 leading-tight text-center">
                                    Nota: Los 7 niveles de precios corresponden a la división física de las gradas (A, B y C).
                                </p>
                            )}
                        </div>

                        {/* COMMUNITY CARD */}
                        <div
                            onClick={() => setIsCommunityOpen(true)}
                            className="bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white p-6 rounded-2xl cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-20 transform group-hover:scale-110 transition-transform">
                                <Image src="/images/whatsapp.svg" alt="WhatsApp" width={60} height={60} className="w-16 h-16 invert" />
                            </div>
                            <h4 className="text-2xl font-black uppercase italic mb-2 relative z-10">
                                {t.whatsappGroups}
                            </h4>
                            <p className="font-medium text-sm leading-tight relative z-10 max-w-[90%] opacity-90">
                                {t.joinCommunity}
                            </p>
                            <div className="mt-4 inline-flex items-center gap-2 font-bold uppercase text-xs tracking-widest bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg relative z-10 group-hover:bg-white group-hover:text-[#128C7E] transition-colors">
                                {t.joinNow} <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>

                        {/* RAVEHUB TRUST CARD */}
                        <a
                            href={country.id === 'peru' ? "https://www.ravehublatam.com/eventos/bts-en-lima-2026" : "https://www.ravehublatam.com"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                        >
                            <div className="bg-white border border-slate-200 p-6 rounded-2xl flex items-start gap-4 hover:border-primary hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-slate-900 text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl">
                                    {t.verifiedPartner}
                                </div>
                                <div className="bg-slate-50 p-3 rounded-full text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-black uppercase text-slate-900 leading-none mb-1 group-hover:text-primary transition-colors">{t.verifiedBy}</h4>
                                    <p className="text-xs text-slate-500 font-mono leading-relaxed">
                                        {t.guarantee} {country.city}.
                                    </p>
                                </div>
                            </div>
                        </a>

                        {/* PHASE STATUS */}
                        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-slate-200 pb-2 text-slate-900">{t.salesStatus}</h4>
                            <div className="space-y-4">
                                {country.id === 'mexico' ? (
                                    // MEXICO CUSTOM SCHEDULE
                                    <div className="space-y-6">
                                        {/* MEMBERSHIP PRESALE */}
                                        {/* MEMBERSHIP PRESALE */}
                                        <div className={`relative pl-4 border-l-2 ${currentDate >= MEXICO_DATES.membership.start && currentDate <= MEXICO_DATES.membership.end ? 'border-primary' : 'border-slate-200'}`}>
                                            <div className="flex flex-col gap-1 w-full">
                                                <div className="flex justify-between items-center w-full">
                                                    <h5 className={`font-bold text-sm uppercase ${currentDate >= MEXICO_DATES.membership.start && currentDate <= MEXICO_DATES.membership.end ? 'text-primary' : 'text-slate-500'}`}>
                                                        Venta Army Membership
                                                    </h5>
                                                    {/* Countdown or Live Badge */}
                                                    {currentDate < MEXICO_DATES.membership.start && (
                                                        <div className="text-[10px] md:text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded whitespace-nowrap">
                                                            Empieza en: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                                                        </div>
                                                    )}
                                                    {currentDate >= MEXICO_DATES.membership.start && currentDate <= MEXICO_DATES.membership.end && (
                                                        <span className="flex items-center gap-1.5 bg-slate-900 text-white text-[10px] uppercase font-black px-2 py-1 rounded animate-pulse whitespace-nowrap">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 block"></span> Live
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="text-xs text-slate-400">
                                                    Vie, 23 ene 2026, 9:00 AM - 10:00 PM
                                                </p>

                                                {/* Membership Badge */}
                                                <div>
                                                    <Link href="/comprar-membresia-bts" className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border border-purple-200 hover:bg-purple-200 transition-colors">
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 14l-1 1-1 1H3m2 0h11l-4-4a6 6 0 017-7z" />
                                                        </svg>
                                                        Membresía Requerida
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        {/* VIP PACKAGES (MEMBERSHIP) */}
                                        <div className="relative pl-4 border-l-2 border-slate-200 opacity-80">
                                            <h5 className="font-bold text-sm uppercase text-slate-500">
                                                Venta Army VIP
                                            </h5>
                                            <p className="text-xs text-slate-400 mt-1">
                                                Vie, 23 ene 2026, 9:00 AM - 10:00 PM
                                            </p>
                                        </div>

                                        {/* GENERAL SALE */}
                                        {/* GENERAL SALE */}
                                        <div className={`relative pl-4 border-l-2 ${currentDate >= MEXICO_DATES.general.start ? 'border-primary' : 'border-slate-200'}`}>
                                            <div className="flex flex-col gap-1 w-full">
                                                <div className="flex justify-between items-center w-full">
                                                    <h5 className={`font-bold text-sm uppercase ${currentDate >= MEXICO_DATES.general.start ? 'text-primary' : 'text-slate-500'}`}>
                                                        Venta General
                                                    </h5>
                                                    {/* Countdown or Live Badge */}
                                                    {currentDate > MEXICO_DATES.membership.end && currentDate < MEXICO_DATES.general.start && (
                                                        <div className="text-[10px] md:text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded whitespace-nowrap">
                                                            Empieza en: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                                                        </div>
                                                    )}
                                                    {currentDate >= MEXICO_DATES.general.start && (
                                                        <span className="flex items-center gap-1.5 bg-slate-900 text-white text-[10px] uppercase font-black px-2 py-1 rounded animate-pulse whitespace-nowrap">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 block"></span> Live
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-400">
                                                    Sáb, 24 ene 2026, 9:00 AM - Jue, 7 may 2026
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    PHASES.map((p) => {
                                        const active = currentDate >= p.start && currentDate <= p.end;
                                        return (
                                            <div key={p.id} className={`flex items-center justify-between ${active ? 'opacity-100' : 'opacity-40'}`}>
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-3 h-3 rounded-full shadow-sm ${active ? p.color : 'bg-slate-300'}`}></div>
                                                    <span className={`text-sm font-bold uppercase ${active ? 'text-slate-900' : 'text-slate-400'}`}>{p.name}</span>
                                                </div>
                                                {active && <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded-md font-bold shadow-sm">{t.live}</span>}
                                            </div>
                                        )
                                    })
                                )}
                            </div>    {/* PAYMENT SCHEDULE SUMMARY */}
                            {isInstallment && totalTickets > 0 && (
                                <div className="bg-slate-50 border border-secondary/30 p-6 rounded-xl animate-fade-in-up mt-6">
                                    <h4 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-secondary/20 pb-2 text-secondary">{t.paymentSchedule}</h4>
                                    <div className="space-y-3 font-mono text-sm">
                                        <div className="flex justify-between items-center text-slate-900 font-bold">
                                            <span>{t.today}</span>
                                            <span>{country.currencySymbol}{reservationAmount.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US')}</span>
                                        </div>
                                        {paymentDates.map((date, i) => (
                                            <div key={i} className="flex justify-between items-center text-slate-500">
                                                <span>{t.quota} {i + 1} ({date.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'es-ES', { month: 'short', day: 'numeric' })})</span>
                                                <span>{country.currencySymbol}{monthlyPayment.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US', { maximumFractionDigits: 2 })}</span>
                                            </div>
                                        ))}
                                        <div className="border-t border-slate-200 pt-2 mt-2 flex justify-between items-center text-secondary font-bold">
                                            <span>{t.finalTotal}</span>
                                            <span>{country.currencySymbol}{totalAmount.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US')}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {country.id === 'mexico' && (
                            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                                <h4 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-slate-200 pb-2 text-slate-900">📋 Información Importante de Venta</h4>
                                <ul className="space-y-4 text-sm text-slate-600">
                                    <li>
                                        <strong className="text-slate-900 block mb-1">Cargo por servicio:</strong>
                                        Los precios de la lista ya incluyen los cargos por servicio, excepto un cargo extra de $50 MXN por procesamiento de orden.
                                    </li>
                                    <li>
                                        <strong className="text-slate-900 block mb-1">Modalidad:</strong>
                                        Los cargos se aplican al momento del pago.
                                    </li>
                                    <li>
                                        <strong className="text-slate-900 block mb-1">Estabilidad:</strong>
                                        Los precios no cambian durante la preventa ni la venta general.
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div >
            </section >

            {/* TRUST & INFO SECTION (SEO THIN CONTENT FIX) */}
            <section className="container mx-auto px-4 md:px-8 pb-24 text-slate-600">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto border-t border-slate-200 pt-16">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 uppercase">{t.secureProcessTitle}</h3>
                            <p className="leading-relaxed">{t.secureProcessDesc}</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 uppercase">{t.whySecureTitle}</h3>
                            <p className="leading-relaxed mb-4">{t.whySecureDesc}</p>
                            <ul className="space-y-2 list-disc pl-5">
                                <li><strong>{t.verification}</strong> {t.verificationDesc}</li>
                                <li><strong>{t.fraudProtection}</strong> {t.fraudProtectionDesc}</li>
                                <li><strong>{t.support}</strong> {t.supportDesc}</li>
                                <li><strong>{t.transparency}</strong> {t.transparencyDesc}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div>
                            {/* CORRECCIÓN: Cambiamos "SEO" por "Hito Histórico" o "Cultural". Suena más épico. */}
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 uppercase">
                                {t.historyTitle.replace('{country}', country.name)}
                            </h3>

                            <p className="leading-relaxed mb-4">
                                {t.historyDesc1.replace('{country}', country.name).replace('{venue}', country.venue)}
                            </p>

                            {/* CORRECCIÓN: Integramos la keyword de forma natural sin decir "la búsqueda de..." */}
                            <p className="leading-relaxed mb-4">
                                {t.historyDesc2}
                                <strong className="text-slate-900 font-bold"> {t.historyDesc3.replace('{city}', country.city)} </strong>
                                {t.historyDesc4}
                            </p>

                            <p className="leading-relaxed">
                                {t.historyDesc5}
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
                                            {isInstallment ? t.toPayToday : t.totalToPay}
                                        </p>
                                        <div className="flex flex-col">
                                            <p className="text-3xl font-black font-mono tracking-tight leading-none">
                                                {country.currencySymbol}{isInstallment ? reservationAmount.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US') : totalAmount.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US')}
                                            </p>
                                            {isInstallment && (
                                                <span className="text-xs font-bold text-black/50">
                                                    + {installmentMonths} {t.installmentsOf} {country.currencySymbol}{Math.ceil(monthlyPayment).toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US')}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsMembershipModalOpen(true)}
                                    className="w-full md:w-auto bg-black text-white hover:bg-white hover:text-black px-12 py-4 text-xl font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                                >
                                    {t.checkout} <ArrowRight className="w-6 h-6" />
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
