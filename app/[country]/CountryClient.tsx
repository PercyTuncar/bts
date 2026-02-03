"use client";

import { useState, useEffect } from "react";
import { CountryData } from "@/lib/data/countries";
import { Calendar, MapPin, Ticket, CreditCard, Minus, Plus, Music, ArrowRight, X, ShieldCheck, Info } from "lucide-react";
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

// Sales Phases Configuration (Updated Colors for Light Mode)
const PHASES = [
    {
        id: 'early-bird',
        name: 'Early Bird',
        dates: '17 Ene - 22 Ene',
        start: new Date(2026, 0, 17),
        end: new Date(2026, 0, 22, 23, 59, 59),
        color: 'bg-slate-200', // Neutral for past
        textColor: 'text-slate-500',
        supply: 85
    },
    {
        id: 'preventa-1',
        name: 'Preventa 1',
        dates: '23 Ene - 15 Feb',
        start: new Date(2026, 0, 23),
        end: new Date(2026, 1, 15, 23, 59, 59),
        color: 'bg-primary', // Active Focus
        textColor: 'text-primary',
        supply: 0
    },
    {
        id: 'preventa-3',
        name: 'Venta General',
        dates: '16 Feb - 08 Oct',
        start: new Date(2026, 1, 16),
        end: new Date(2026, 9, 8, 20, 0, 0),
        color: 'bg-green-500', // Success/Open
        textColor: 'text-green-500',
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
        historyDesc3: "comprar boletos para BTS en {city} de forma 100% segura",
        historyDesc4: "es la prioridad absoluta para proteger tu inversión y tu sueño.",
        historyDesc5: "Al adquirir tus pases a través de canales verificados como RaveHub, aseguras tu lugar en el evento con total confianza y garantía local.",
        toPayToday: "A Pagar HOY",
        totalToPay: "Total a Pagar",
        installmentsOf: "cuotas de",
        checkout: "Finalizar Compra",
        faqTitle: "Preguntas Frecuentes sobre el Concierto",
        q1: "¿Cuándo salen a la venta las entradas?",
        a1: "Las fechas varían por país. Revisa la sección de cronograma más arriba para ver las fechas específicas de Preventa Army, Preventa General y Venta General en tu país.",
        q2: "¿Qué incluye el paquete VIP?",
        a2: "Los paquetes VIP suelen incluir entrada anticipada, acceso a soundcheck, merch exclusivo y lanyard conmemorativo. Consulta los detalles de cada zona en la selección de entradas.",
        q3: "¿Cómo llegar al Estadio?",
        a3: "El evento se realizará en {venue}. Recomendamos usar transporte público y llegar con tiempo de antelación para evitar congestiones."
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
        checkout: "Finalizar Compra",
        faqTitle: "Perguntas Frequentes sobre o Show",
        q1: "Quando começam as vendas dos ingressos?",
        a1: "As datas variam por país. Verifique a seção de cronograma acima para ver as datas específicas da Pré-venda Army, Pré-venda Geral e Venda Geral no seu país.",
        q2: "O que inclui o pacote VIP?",
        a2: "Os pacotes VIP geralmente incluem entrada antecipada, acesso à passagem de som, merch exclusivo e cordão comemorativo. Consulte os detalhes de cada setor na seleção de ingressos.",
        q3: "Como chegar ao Estádio?",
        a3: "O evento será realizado no {venue}. Recomendamos usar transporte público e chegar com antecedência para evitar congestionamentos."
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
        checkout: "Finalizar Compra",
        faqTitle: "Preguntas Frecuentes sobre el Concierto",
        q1: "¿Cuándo salen a la venta los boletos?",
        a1: "Las fechas varían. Checa la sección de cronograma arriba para ver las fechas de Preventa Army, Preventa General y Venta General.",
        q2: "¿Qué incluye el paquete VIP?",
        a2: "Los paquetes VIP incluyen entrada anticipada, soundcheck, merch exclusivo y lanyard. Checa los detalles de cada zona.",
        q3: "¿Cómo llegar al Foro?",
        a3: "El evento es en {venue}. Te recomendamos llegar en transporte público o usar los estacionamientos oficiales con tiempo."
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
        const parseDate = (d: string) => new Date(d + "T12:00:00");
        const locale = lang === 'pt' ? 'pt-BR' : 'es-ES';

        const d1 = parseDate(dates[0]);
        const month = d1.toLocaleDateString(locale, { month: 'long' });
        const year = d1.getFullYear();

        if (dates.length === 1) {
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
    const [videoLoaded, setVideoLoaded] = useState(false);

    // Initial tick to avoid hydration mismatch
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const router = useRouter();

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

    // Modern Minimal Clock Component
    const Digit = ({ val, label }: { val: number, label: string }) => (
        <div className="flex flex-col items-center">
            <div className="w-14 h-16 md:w-16 md:h-20 bg-white border border-slate-100 flex items-center justify-center relative overflow-hidden shadow-sm rounded-xl">
                <span className="text-2xl md:text-4xl font-black text-slate-900 z-10">{val.toString().padStart(2, '0')}</span>
            </div>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider mt-2 text-slate-400">{label}</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden">

            {/* MARQUEE HEADER (Clean Red) */}
            <div className="fixed top-20 left-0 w-full bg-slate-900 text-white z-40 border-b border-primary/20 overflow-hidden py-3 shadow-md">
                <div className="flex whitespace-nowrap animate-marquee">
                    {[...Array(10)].map((_, i) => (
                        <span key={i} className="text-sm font-bold uppercase tracking-[0.2em] mx-8 flex items-center gap-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            {t.worldTour} 2026
                            <span className="text-slate-500">|</span>
                            {t.liveFrom} {country.city}
                            <span className="text-slate-500">|</span>
                            {t.buyTickets}
                            <span className="text-slate-500">|</span>
                            {selectedDate ? new Date(selectedDate).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'es-ES', { weekday: 'long', day: 'numeric', month: 'long' }) : t.selectDate}
                        </span>
                    ))}
                </div>
            </div>

            {/* HERO SECTION - Split Layout */}
            <section className="relative h-[100svh] min-h-[650px] max-h-[850px] pt-32 overflow-hidden bg-black">
                {/* Background Video & Image */}
                <div className="absolute inset-0 w-full h-full z-0">
                    {/* Placeholder Image */}
                    <Image
                        src="https://images.prestigeonline.com/wp-content/uploads/sites/6/2022/08/09215459/BTS-members-1600x900.jpg"
                        alt={`Integrantes de BTS actuando en vivo en ${country.venue}, ${country.name}`}
                        fill
                        className={`object-cover object-[center_20%] transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
                        priority
                        sizes="100vw"
                    />
                    
                    {/* Background Video */}
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        onCanPlayThrough={() => setVideoLoaded(true)}
                        className={`absolute inset-0 w-full h-full object-cover object-[center_20%] transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <source src="/images/video-bts.mp4" type="video/mp4" />
                    </video>
                    
                    {/* Gradient Overlay - Strong on left for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>
                </div>

                {/* Content - Left Aligned */}
                <div className="relative z-10 h-full container mx-auto px-4 md:px-8 flex flex-col justify-center">

                    {/* Main Content */}
                    <div className="max-w-2xl">
                        
                        {/* Title Block */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <p className="text-white/50 text-xs md:text-sm font-medium uppercase tracking-[0.3em] mb-2">
                                {country.id === 'brasil' ? 'Ingressos' : (country.id === 'mexico' ? 'Boletos' : 'Entradas')}
                            </p>
                            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tight leading-[0.85]">
                                BTS
                            </h1>
                            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.85] bg-gradient-to-r from-primary to-rose-400 bg-clip-text text-transparent">
                                {country.name}
                            </h2>
                        </motion.div>

                        {/* Info Row */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap items-center gap-3 mt-3"
                        >
                            <span className="inline-flex items-center gap-2 text-white text-base font-medium">
                                <MapPin className="w-5 h-5 text-primary" />
                                {country.city}
                            </span>
                            <span className="text-white/30">•</span>
                            <span className="text-white/60 text-base">{country.venue}</span>
                        </motion.div>

                        {/* Date & Countdown Row */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap items-center gap-5 mt-3"
                        >
                            <div className="flex items-center gap-2 bg-primary/20 border border-primary/30 text-white text-base font-semibold px-4 py-2 rounded-xl">
                                <Calendar className="w-5 h-5 text-primary" />
                                {primaryDate}
                            </div>
                            
                            <div className="flex items-center gap-4 text-white">
                                {[
                                    { val: timeLeft.days, label: t.days },
                                    { val: timeLeft.hours, label: t.hrs },
                                    { val: timeLeft.minutes, label: t.min },
                                    { val: timeLeft.seconds, label: t.seg }
                                ].map((item, idx) => (
                                    <div key={idx} className="text-center">
                                        <span className="block text-2xl md:text-3xl font-black tabular-nums">{item.val.toString().padStart(2, '0')}</span>
                                        <span className="block text-[10px] uppercase tracking-wider text-white/40">{item.label}</span>
                                    </div>
                                ))}
                                <span className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase ml-2">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                    {t.live}
                                </span>
                            </div>
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-5"
                        >
                            <a 
                                href="#tickets" 
                                className="group inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider text-base px-8 py-4 rounded-2xl transition-all duration-300 shadow-[0_0_30px_rgba(225,29,72,0.5)] hover:shadow-[0_0_50px_rgba(225,29,72,0.7)] hover:scale-[1.02]"
                            >
                                <Ticket className="w-6 h-6" />
                                {t.buyTickets}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </motion.div>

                        {/* SEO Text - Compact */}
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-white/40 text-xs md:text-sm leading-relaxed mt-4 max-w-xl"
                        >
                            {country.id === 'brasil' ? (
                                <>
                                    A espera acabou. <span className="text-white/60">BTS chega a {country.city}</span> para conquistar o <span className="text-primary/70">{country.venue}</span>. Garanta seus ingressos para o BTS no {country.name}. Preços a partir de {country.currencySymbol}{Math.min(...country.prices.map(p => p.price))}.
                                </>
                            ) : (
                                <>
                                    La espera ha terminado. <span className="text-white/60">BTS llega a {country.city}</span> para conquistar el <span className="text-primary/70">{country.venue}</span>. Asegura tus entradas para BTS en {country.name}. Precios desde {country.currencySymbol}{Math.min(...country.prices.map(p => p.price))}.
                                </>
                            )}
                        </motion.p>
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
                                <h2 className="text-4xl font-black uppercase italic text-slate-900 tracking-tighter">{t.tickets}</h2>

                                <div className="flex gap-2 w-full md:w-auto p-1 bg-slate-100 rounded-xl">
                                    {(country.allowInstallments !== false) && (
                                        <>
                                            <button onClick={() => setIsInstallment(false)} className={`flex-1 md:flex-none px-6 py-3 text-xs md:text-sm font-bold uppercase rounded-lg transition-all ${!isInstallment ? 'bg-white text-slate-900 shadow-sm' : 'bg-transparent text-slate-400 hover:text-slate-600'}`}>
                                                {t.cash}
                                            </button>
                                            <button onClick={() => setIsInstallment(true)} className={`flex-1 md:flex-none px-6 py-3 text-xs md:text-sm font-bold uppercase rounded-lg transition-all ${isInstallment ? 'bg-slate-900 text-white shadow-sm' : 'bg-transparent text-slate-400 hover:text-slate-600'}`}>
                                                {t.installments}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* INSTALLMENT SELECTOR */}
                            {isInstallment && (
                                <div className="bg-slate-50 p-6 rounded-2xl animate-fade-in-up">
                                    <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">{t.chooseInstallments}</p>
                                    <div className="flex gap-4 mb-4">
                                        {[2, 3].map(m => (
                                            <button
                                                key={m}
                                                onClick={() => setInstallmentMonths(m)}
                                                className={`flex-1 py-4 text-lg font-black uppercase border-2 rounded-xl transition-all ${installmentMonths === m ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-400 hover:border-slate-300'}`}
                                            >
                                                {m} {t.installments}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium">
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
                                                className={`p-6 border-2 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 group ${isSelected ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 text-slate-400 hover:border-primary/50 hover:bg-white bg-white hover:text-slate-900'}`}
                                            >
                                                <span className={`text-4xl font-black uppercase leading-none ${isSelected ? 'text-primary' : 'text-slate-300 group-hover:text-slate-900'}`}>{d.getDate()}</span>
                                                <span className="text-xs font-bold uppercase tracking-widest mt-2">{d.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'es-ES', { month: 'short' })}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {country.prices.map((zone, i) => (
                                <div key={zone.zone} className="group relative">
                                    <div className="relative bg-white border border-slate-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1">
                                        <div className="flex items-center gap-6 flex-1 text-center md:text-left">
                                            <span className="text-5xl font-black italic text-slate-100 group-hover:text-primary/10 transition-colors hidden md:block">0{i + 1}</span>
                                            <div>
                                                <h4 className="text-xl md:text-2xl font-black uppercase leading-none mb-2 text-slate-900">{zone.zone}</h4>
                                                {zone.description && (
                                                    <p className="text-sm text-slate-500 mt-2 font-medium leading-tight max-w-md mx-auto md:mx-0">{zone.description}</p>
                                                )}
                                                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${['mexico', 'madrid'].includes(country.id) ? 'bg-green-100 text-green-700' : 'bg-orange-50 text-orange-600'}`}>
                                                        {['mexico', 'madrid'].includes(country.id) ? "Precio Oficial" : "Precio Ref."}
                                                    </span>
                                                    {i === 0 && <span className="bg-primary/10 text-primary px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">{t.bestSeller}</span>}
                                                </div>

                                                {/* MADRID PROGRESS BAR */}
                                                {country.id === 'madrid' && (
                                                    <div className="mt-4 w-full max-w-xs">
                                                        <div className="flex justify-between items-end mb-1">
                                                            <span className="text-[10px] font-bold uppercase text-slate-400">Disponibilidad</span>
                                                            <span className="text-[10px] font-black text-rose-500 animate-pulse">
                                                                {(() => {
                                                                    const remainingDays = timeLeft.days;
                                                                    let p = 100 - (remainingDays / 10);
                                                                    if (p < 90) p = 90;
                                                                    if (p > 100) p = 100;
                                                                    // Show inverse? "Agotado"? Usually high % means sold out or high capacity?
                                                                    // User said "Starts at 90% (which is 0%)... gives sensation of running out".
                                                                    // So 90% = "Low urgency"? No, usually 90% means "90% sold".
                                                                    // If 100 days left, p=90. If 50 days left, p=95.
                                                                    // This implies "Sold Percentage" increases as date approaches.
                                                                    return `${p.toFixed(0)}% Agotado`;
                                                                })()}
                                                            </span>
                                                        </div>
                                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                            <div 
                                                                className="h-full bg-gradient-to-r from-rose-500 to-primary transition-all duration-1000 ease-out"
                                                                style={{ 
                                                                    width: `${(() => {
                                                                        const remainingDays = timeLeft.days;
                                                                        let p = 100 - (remainingDays / 10);
                                                                        if (p < 90) p = 90;
                                                                        if (p > 100) p = 100;
                                                                        return p;
                                                                    })()}%` 
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                                            <div className="text-right md:text-right text-left">
                                                <p className="text-3xl font-black text-slate-900 tracking-tight">{country.currencySymbol}{getPrice(zone.price).toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US')}</p>
                                                {isInstallment && <p className="text-[10px] text-slate-400 font-bold uppercase">+ {t.fee} {country.currencySymbol}{config.fee}</p>}
                                            </div>

                                            <div className={`flex items-center bg-slate-50 rounded-xl overflow-hidden ${!selectedDate ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                                <button onClick={() => updateQuantity(zone.zone, -1)} disabled={!activePhase || !selectedDate} className="w-12 h-12 flex items-center justify-center hover:bg-white text-slate-500 transition-colors disabled:opacity-50">
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center font-bold text-lg text-slate-900">{quantities[zone.zone] || 0}</span>
                                                <button onClick={() => updateQuantity(zone.zone, 1)} disabled={!activePhase || !selectedDate} className="w-12 h-12 flex items-center justify-center hover:bg-white text-slate-500 transition-colors disabled:opacity-50">
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
                        {/* MAPA CARD */}
                        <div className="bg-white p-2 rounded-3xl shadow-lg border border-slate-100 overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                            <div className="bg-slate-50 relative aspect-square rounded-2xl overflow-hidden">
                                <Image 
                                    src={
                                        country.id === 'mexico' ? "/images/mapa-mexico.png" : 
                                        country.id === 'madrid' ? "/images/bts-madrid-mapa.png" : 
                                        "/images/stadium-map.png"
                                    } 
                                    alt={`Mapa de zonas y precios ${country.venue}`} 
                                    fill 
                                    className="object-contain p-4" 
                                />
                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur pl-2 pr-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                                    <div className="bg-primary p-1.5 rounded-full text-white">
                                        <MapPin className="w-3 h-3" />
                                    </div>
                                    <span className="text-xs font-bold uppercase text-slate-900">{t.mapStage}</span>
                                </div>
                            </div>
                        </div>

                        {/* COMMUNITY CARD */}
                        <div
                            onClick={() => setIsCommunityOpen(true)}
                            className="bg-slate-900 text-white p-8 rounded-3xl cursor-pointer shadow-xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform duration-500">
                                <Image src="/images/whatsapp.svg" alt="WhatsApp" width={80} height={80} className="invert" />
                            </div>
                            <h4 className="text-2xl font-black uppercase mb-3 relative z-10 group-hover:text-primary transition-colors">
                                {t.whatsappGroups}
                            </h4>
                            <p className="font-medium text-slate-400 text-sm leading-relaxed relative z-10 max-w-[90%] mb-6">
                                {t.joinCommunity}
                            </p>
                            <div className="inline-flex items-center gap-2 font-bold uppercase text-xs tracking-widest bg-white/10 hover:bg-white hover:text-slate-900 px-6 py-3 rounded-full transition-all">
                                {t.joinNow} <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>

                        {/* PHASE STATUS */}
                        <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
                            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 border-b border-slate-100 pb-4 text-slate-400">{t.salesStatus}</h4>
                            <div className="space-y-4">
                                {country.id === 'mexico' ? (
                                    <div className="space-y-6">
                                        {/* Mexico Status Logic (Kept same structure but updated styling) */}
                                        <div className={`relative pl-4 border-l-2 ${currentDate >= MEXICO_DATES.membership.start && currentDate <= MEXICO_DATES.membership.end ? 'border-primary' : 'border-slate-100'}`}>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex justify-between items-center">
                                                    <h5 className={`font-bold text-sm uppercase ${currentDate >= MEXICO_DATES.membership.start && currentDate <= MEXICO_DATES.membership.end ? 'text-primary' : 'text-slate-500'}`}>
                                                        Venta Army Membership
                                                    </h5>
                                                    {currentDate >= MEXICO_DATES.membership.start && currentDate <= MEXICO_DATES.membership.end && (
                                                        <span className="flex items-center gap-1.5 bg-red-100 text-red-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full animate-pulse">
                                                            Live
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-400">Vie, 23 ene 2026</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : country.id === 'madrid' ? (
                                    <div className="space-y-5">
                                        {/* MADRID CUSTOM PHASES */}
                                        <div className="flex items-center justify-between opacity-60 grayscale">
                                            <div className="flex items-center gap-4">
                                                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                                <span className="text-sm font-bold uppercase text-slate-500 line-through decoration-slate-400">Preventa Army</span>
                                            </div>
                                            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-bold uppercase">Agotado</span>
                                        </div>

                                        <div className="flex items-center justify-between opacity-100">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                                    <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>
                                                </div>
                                                <span className="text-sm font-black uppercase text-slate-900">Venta General</span>
                                            </div>
                                            <span className="text-[10px] bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-extrabold uppercase animate-pulse shadow-sm border border-green-200">
                                                Disponible
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    PHASES.map((p) => {
                                        const active = currentDate >= p.start && currentDate <= p.end;
                                        return (
                                            <div key={p.id} className={`flex items-center justify-between ${active ? 'opacity-100' : 'opacity-40 grayscale'}`}>
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-3 h-3 rounded-full shadow-sm ring-2 ring-offset-2 ring-transparent ${active ? 'bg-primary ring-primary/20' : 'bg-slate-200'}`}></div>
                                                    <span className={`text-sm font-bold uppercase ${active ? 'text-slate-900' : 'text-slate-400'}`}>{p.name}</span>
                                                </div>
                                                {active && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold">{t.live}</span>}
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div >
            </section >

            {/* INFO & SEO */}
            <section className="container mx-auto px-4 md:px-8 pb-12 pt-12 border-t border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto text-slate-600">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 mb-4 uppercase">{t.secureProcessTitle}</h2>
                            <p className="leading-relaxed text-lg">{t.secureProcessDesc}</p>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-4 uppercase">{t.whySecureTitle}</h2>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                                    <span><strong>{t.verification}</strong> {t.verificationDesc}</span>
                                </li>
                                <li className="flex gap-3">
                                    <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                                    <span><strong>{t.fraudProtection}</strong> {t.fraudProtectionDesc}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 mb-4 uppercase">
                                {t.historyTitle.replace('{country}', country.name)}
                            </h2>
                            <div className="space-y-4 text-lg leading-relaxed">
                                <p>{t.historyDesc1.replace('{country}', country.name).replace('{venue}', country.venue)}</p>
                                <div className="bg-slate-100 p-6 rounded-2xl border-l-4 border-primary italic text-slate-700">
                                    "{t.historyDesc3.replace('{city}', country.city)} {t.historyDesc4}"
                                </div>
                                <p>{t.historyDesc5}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="container mx-auto px-4 md:px-8 pb-32 pt-12 border-t border-slate-200">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase text-center">{t.faqTitle}</h2>
                    <div className="space-y-6">
                        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
                            <h3 className="font-bold text-lg text-slate-900 mb-2">{t.q1}</h3>
                            <p className="text-slate-600">{t.a1}</p>
                        </div>
                        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
                            <h3 className="font-bold text-lg text-slate-900 mb-2">{t.q2}</h3>
                            <p className="text-slate-600">{t.a2}</p>
                        </div>
                        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
                            <h3 className="font-bold text-lg text-slate-900 mb-2">{t.q3}</h3>
                            <p className="text-slate-600">{t.a3.replace('{venue}', country.venue)}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* STICKY CHECKOUT BAR */}
            <AnimatePresence>
                {
                    totalTickets > 0 && (
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-4 md:p-6"
                        >
                            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-6">
                                    <div className="bg-slate-900 text-white w-14 h-14 flex items-center justify-center font-black text-2xl rounded-2xl shadow-lg shadow-slate-900/20">
                                        {totalTickets}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                                            {isInstallment ? t.toPayToday : t.totalToPay}
                                        </p>
                                        <div className="flex flex-col">
                                            <p className="text-3xl font-black font-sans tracking-tight text-slate-900 leading-none">
                                                {country.currencySymbol}{isInstallment ? reservationAmount.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US') : totalAmount.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US')}
                                            </p>
                                            {isInstallment && (
                                                <span className="text-xs font-bold text-primary mt-1">
                                                    + {installmentMonths} {t.installmentsOf} {country.currencySymbol}{Math.ceil(monthlyPayment).toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US')}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsMembershipModalOpen(true)}
                                    className="w-full md:w-auto bg-primary text-white hover:bg-red-600 px-10 py-4 text-lg font-black uppercase tracking-widest transition-all hover:-translate-y-1 shadow-xl shadow-primary/30 flex items-center justify-center gap-3 rounded-full"
                                >
                                    {t.checkout} <ArrowRight className="w-5 h-5" />
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
