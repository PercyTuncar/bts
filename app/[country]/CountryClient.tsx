"use client";

import { useState, useEffect } from "react";
import { CountryData } from "@/lib/data/countries";
import { Calendar, MapPin, Ticket, CreditCard, Minus, Plus, ArrowRight, ShieldCheck, Info, Sparkles, Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CommunityModal } from "@/components/CommunityModal";
import { MembershipModal } from "@/components/MembershipModal";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";

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
        color: 'bg-white/10',
        textColor: 'text-white/50',
        supply: 85
    },
    {
        id: 'preventa-1',
        name: 'Preventa 1',
        dates: '23 Ene - 15 Feb',
        start: new Date(2026, 0, 23),
        end: new Date(2026, 1, 15, 23, 59, 59),
        color: 'bg-primary',
        textColor: 'text-primary',
        supply: 0
    },
    {
        id: 'preventa-3',
        name: 'Venta General',
        dates: '16 Feb - 08 Oct',
        start: new Date(2026, 1, 16),
        end: new Date(2026, 9, 8, 20, 0, 0),
        color: 'bg-success',
        textColor: 'text-success',
        supply: 0
    }
];

const INSTALLMENT_CONFIG: Record<string, { fee: number; reservation: number }> = {
    'peru': { fee: 100, reservation: 100 },
    'chile': { fee: 31000, reservation: 31000 },
    'mexico': { fee: 660, reservation: 660 },
    'colombia': { fee: 121000, reservation: 121000 },
    'argentina': { fee: 50000, reservation: 50000 },
    'brasil': { fee: 200, reservation: 200 },
};

const translations = {
    es: {
        worldTour: "Gira Mundial",
        liveFrom: "En Vivo desde",
        buyTickets: "Comprar Entradas",
        selectDate: "Selecciona Fecha",
        tickets: "Entradas Disponibles",
        nextEvent: "Proximo Evento",
        place: "Lugar",
        days: "Dias",
        hrs: "Hrs",
        min: "Min",
        seg: "Seg",
        cash: "Contado",
        installments: "Cuotas",
        selectDateStep: "Selecciona la Fecha",
        chooseInstallments: "Elige tus cuotas",
        initialReservation: "Reserva inicial de",
        perTicket: "por entrada (incluye fee)",
        verified: "Verificado",
        bestSeller: "Popular",
        fee: "Fee",
        mapStage: "Mapa del Escenario",
        whatsappGroups: "Grupos de WhatsApp",
        joinCommunity: "Unete a la comunidad y organiza tu viaje.",
        joinNow: "Unirme",
        verifiedPartner: "Partner Verificado",
        verifiedBy: "Verificado por RaveHub",
        guarantee: "Garantia del 100%.",
        salesStatus: "Status",
        live: "LIVE",
        paymentSchedule: "Cronograma de Pagos",
        today: "HOY (Reserva + Fee)",
        quota: "Cuota",
        finalTotal: "Total Final",
        toPayToday: "A Pagar HOY",
        totalToPay: "Total a Pagar",
        installmentsOf: "cuotas de",
        checkout: "Finalizar Compra",
        readyForPurple: "Listo para el oceano purpura?",
        selectZone: "Selecciona tu zona",
        paymentOptions: "Opciones de Pago",
    },
    pt: {
        worldTour: "Turne Mundial",
        liveFrom: "Ao Vivo de",
        buyTickets: "Comprar Ingressos",
        selectDate: "Selecione Data",
        tickets: "Ingressos Disponiveis",
        nextEvent: "Proximo Evento",
        place: "Local",
        days: "Dias",
        hrs: "Hrs",
        min: "Min",
        seg: "Seg",
        cash: "A Vista",
        installments: "Parcelado",
        selectDateStep: "Selecione a Data",
        chooseInstallments: "Escolha suas parcelas",
        initialReservation: "Reserva inicial de",
        perTicket: "por ingresso (inclui taxa)",
        verified: "Verificado",
        bestSeller: "Popular",
        fee: "Taxa",
        mapStage: "Mapa do Palco",
        whatsappGroups: "Grupos de WhatsApp",
        joinCommunity: "Junte-se a comunidade e organize sua viagem.",
        joinNow: "Entrar",
        verifiedPartner: "Parceiro Verificado",
        verifiedBy: "Verificado por RaveHub",
        guarantee: "Garantia de 100%.",
        salesStatus: "Status",
        live: "AO VIVO",
        paymentSchedule: "Cronograma de Pagamentos",
        today: "HOJE (Reserva + Taxa)",
        quota: "Parcela",
        finalTotal: "Total Final",
        toPayToday: "A Pagar HOJE",
        totalToPay: "Total a Pagar",
        installmentsOf: "parcelas de",
        checkout: "Finalizar Compra",
        readyForPurple: "Pronto para o oceano roxo?",
        selectZone: "Selecione sua zona",
        paymentOptions: "Opcoes de Pagamento",
    },
    mx: {
        worldTour: "Gira Mundial",
        liveFrom: "En Vivo desde",
        buyTickets: "Comprar Boletos",
        selectDate: "Selecciona Fecha",
        tickets: "Boletos Disponibles",
        nextEvent: "Proximo Evento",
        place: "Lugar",
        days: "Dias",
        hrs: "Hrs",
        min: "Min",
        seg: "Seg",
        cash: "Contado",
        installments: "Cuotas",
        selectDateStep: "Selecciona la Fecha",
        chooseInstallments: "Elige tus cuotas",
        initialReservation: "Reserva inicial de",
        perTicket: "por boleto (incluye fee)",
        verified: "Verificado",
        bestSeller: "Popular",
        fee: "Fee",
        mapStage: "Mapa del Escenario",
        whatsappGroups: "Grupos de WhatsApp",
        joinCommunity: "Unete a la comunidad y organiza tu viaje.",
        joinNow: "Unirme",
        verifiedPartner: "Partner Verificado",
        verifiedBy: "Verificado por RaveHub",
        guarantee: "Garantia del 100%.",
        salesStatus: "Status",
        live: "LIVE",
        paymentSchedule: "Cronograma de Pagos",
        today: "HOY (Reserva + Fee)",
        quota: "Cuota",
        finalTotal: "Total Final",
        toPayToday: "A Pagar HOY",
        totalToPay: "Total a Pagar",
        installmentsOf: "cuotas de",
        checkout: "Finalizar Compra",
        readyForPurple: "Listo para el oceano purpura?",
        selectZone: "Selecciona tu zona",
        paymentOptions: "Opciones de Pago",
    }
};

export default function CountryClient({ country }: Props) {
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

    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [isInstallment, setIsInstallment] = useState(false);
    const [isCommunityOpen, setIsCommunityOpen] = useState(false);
    const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
    const [installmentMonths, setInstallmentMonths] = useState(3);
    const [mounted, setMounted] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [selectedDate, setSelectedDate] = useState<string | null>(country.dates[0] || null);
    const router = useRouter();

    const getTargetDate = () => {
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

    // Countdown Component
    const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center">
            <div className="w-14 h-14 md:w-16 md:h-16 glass-card rounded-xl flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-black text-white tabular-nums">{value.toString().padStart(2, '0')}</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider mt-2 text-white/40">{label}</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-primary/30 selection:text-white overflow-x-hidden">

            {/* HERO SECTION - Immersive Full Screen */}
            <section className="relative h-[100svh] min-h-[700px] overflow-hidden">
                {/* Background Video & Image */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <Image
                        src="https://images.prestigeonline.com/wp-content/uploads/sites/6/2022/08/09215459/BTS-members-1600x900.jpg"
                        alt={`BTS en vivo en ${country.venue}, ${country.name}`}
                        fill
                        className={`object-cover object-[center_20%] transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
                        priority
                        sizes="100vw"
                    />
                    
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
                    
                    {/* Premium Dark Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
                    
                    {/* Subtle Purple Glow */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-1/2 bg-purple-glow opacity-30" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full container mx-auto px-4 md:px-8 flex flex-col justify-end pb-16 md:pb-24">
                    
                    {/* Main Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        {/* Live Badge */}
                        <div className="flex items-center gap-3 mb-4">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                {t.live}
                            </span>
                            <span className="text-white/40 text-sm">{t.worldTour} 2026</span>
                        </div>

                        {/* Title */}
                        <h1 className="flex flex-col mb-4">
                            <span className="text-6xl sm:text-7xl md:text-8xl font-black text-white uppercase tracking-tight leading-[0.9]">
                                BTS
                            </span>
                            <span className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] gradient-text">
                                {country.id === 'madrid' ? 'Madrid' : country.name}
                            </span>
                        </h1>

                        {/* Location & Date */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="flex items-center gap-2 text-white/70">
                                <MapPin className="w-5 h-5 text-primary" />
                                <span>{country.venue}</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-white/20" />
                            <div className="flex items-center gap-2 text-white/70">
                                <Calendar className="w-5 h-5 text-primary" />
                                <span>{primaryDate}</span>
                            </div>
                        </div>

                        {/* Countdown */}
                        <div className="flex items-center gap-4 mb-8">
                            <CountdownUnit value={timeLeft.days} label={t.days} />
                            <span className="text-white/20 text-2xl font-light">:</span>
                            <CountdownUnit value={timeLeft.hours} label={t.hrs} />
                            <span className="text-white/20 text-2xl font-light">:</span>
                            <CountdownUnit value={timeLeft.minutes} label={t.min} />
                            <span className="text-white/20 text-2xl font-light">:</span>
                            <CountdownUnit value={timeLeft.seconds} label={t.seg} />
                        </div>

                        {/* CTA Button */}
                        <a 
                            href="#tickets" 
                            className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-light text-white font-bold uppercase tracking-wider text-base px-8 py-4 rounded-2xl transition-all duration-300 shadow-glow hover:shadow-glow-lg hover:scale-[1.02]"
                        >
                            <Ticket className="w-5 h-5" />
                            {t.buyTickets}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
                    <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
                        <motion.div 
                            animate={{ y: [0, 12, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-1.5 h-3 bg-primary rounded-full"
                        />
                    </div>
                </motion.div>
            </section>

            {/* TICKETS SECTION */}
            <section id="tickets" className="py-20 relative">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-purple-glow opacity-20 pointer-events-none" />
                
                <div className="container mx-auto px-4 md:px-8">
                    
                    {/* Section Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-primary text-sm font-bold uppercase tracking-widest mb-4 block">{t.selectZone}</span>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">{t.tickets}</h2>
                        <p className="text-white/50 max-w-lg mx-auto">{t.readyForPurple}</p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        
                        {/* LEFT: Date & Payment Options */}
                        <div className="lg:col-span-1 space-y-6">
                            
                            {/* Date Selector */}
                            <GlassCard>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    {t.selectDateStep}
                                </h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {country.dates.map((date) => {
                                        const d = new Date(date + "T12:00:00");
                                        const isSelected = selectedDate === date;
                                        return (
                                            <button
                                                key={date}
                                                onClick={() => setSelectedDate(date)}
                                                className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                                                    isSelected 
                                                        ? 'bg-gradient-to-br from-primary to-primary-light text-white shadow-glow' 
                                                        : 'bg-white/5 border border-white/10 text-white/60 hover:border-primary/50 hover:text-white'
                                                }`}
                                            >
                                                <span className="text-2xl font-black">{d.getDate()}</span>
                                                <span className="text-[10px] uppercase tracking-wider mt-1 opacity-70">
                                                    {d.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'es-ES', { month: 'short' })}
                                                </span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </GlassCard>

                            {/* Payment Mode Toggle */}
                            {country.allowInstallments !== false && (
                                <GlassCard>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2">
                                        <CreditCard className="w-4 h-4 text-primary" />
                                        {t.paymentOptions}
                                    </h3>
                                    <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
                                        <button 
                                            onClick={() => setIsInstallment(false)} 
                                            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                                                !isInstallment 
                                                    ? 'bg-white text-black' 
                                                    : 'text-white/50 hover:text-white'
                                            }`}
                                        >
                                            {t.cash}
                                        </button>
                                        <button 
                                            onClick={() => setIsInstallment(true)} 
                                            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                                                isInstallment 
                                                    ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                                                    : 'text-white/50 hover:text-white'
                                            }`}
                                        >
                                            <Sparkles className="w-4 h-4" />
                                            {t.installments}
                                        </button>
                                    </div>

                                    {/* Installment Selector */}
                                    <AnimatePresence>
                                        {isInstallment && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-4 space-y-3">
                                                    <p className="text-xs text-white/40">{t.chooseInstallments}</p>
                                                    <div className="flex gap-2">
                                                        {[2, 3].map(m => (
                                                            <button
                                                                key={m}
                                                                onClick={() => setInstallmentMonths(m)}
                                                                className={`flex-1 py-3 rounded-lg text-sm font-bold border transition-all ${
                                                                    installmentMonths === m 
                                                                        ? 'border-primary bg-primary/10 text-primary' 
                                                                        : 'border-white/10 text-white/50 hover:border-white/20'
                                                                }`}
                                                            >
                                                                {m} {t.installments}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <p className="text-[10px] text-white/30">
                                                        * {t.initialReservation} {country.currencySymbol}{config.reservation.toLocaleString()} {t.perTicket}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </GlassCard>
                            )}

                            {/* WhatsApp Community */}
                            <button
                                onClick={() => setIsCommunityOpen(true)}
                                className="w-full glass-card p-4 rounded-2xl flex items-center gap-4 hover:border-green-500/50 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                    <MessageCircle className="w-6 h-6 text-white fill-current" />
                                </div>
                                <div className="text-left flex-1">
                                    <span className="font-bold text-white block">{t.whatsappGroups}</span>
                                    <span className="text-xs text-white/40">{t.joinCommunity}</span>
                                </div>
                                <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                            </button>
                        </div>

                        {/* RIGHT: Ticket Zones */}
                        <div className="lg:col-span-2 space-y-4">
                            {country.prices.map((zone, i) => {
                                const qty = quantities[zone.zone] || 0;
                                const price = getPrice(zone.price);
                                
                                return (
                                    <motion.div
                                        key={zone.zone}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className={`glass-card p-6 rounded-2xl transition-all duration-300 ${
                                            qty > 0 ? 'border-primary/50 shadow-glow' : ''
                                        }`}
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            {/* Zone Info */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h4 className="text-lg font-bold text-white">{zone.zone}</h4>
                                                    {i === 0 && (
                                                        <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase">
                                                            {t.bestSeller}
                                                        </span>
                                                    )}
                                                </div>
                                                {zone.description && (
                                                    <p className="text-sm text-white/40 mb-2">{zone.description}</p>
                                                )}
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xl font-black gradient-text">
                                                        {country.currencySymbol}{price.toLocaleString()}
                                                    </span>
                                                    {isInstallment && (
                                                        <span className="text-xs text-white/30 px-2 py-1 rounded bg-white/5">
                                                            +{t.fee}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => updateQuantity(zone.zone, -1)}
                                                    disabled={qty === 0}
                                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-12 text-center text-xl font-bold tabular-nums">{qty}</span>
                                                <button
                                                    onClick={() => updateQuantity(zone.zone, 1)}
                                                    className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Sticky Checkout Bar */}
                    <AnimatePresence>
                        {totalTickets > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 100 }}
                                className="fixed bottom-0 left-0 right-0 z-50 bg-surface-dark/95 backdrop-blur-xl border-t border-white/5 p-4"
                            >
                                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-6">
                                        <div>
                                            <span className="text-white/40 text-xs uppercase tracking-wider">{totalTickets} {totalTickets === 1 ? 'entrada' : 'entradas'}</span>
                                            <div className="text-2xl font-black gradient-text">
                                                {country.currencySymbol}{totalAmount.toLocaleString()}
                                            </div>
                                        </div>
                                        {isInstallment && (
                                            <div className="hidden md:block pl-6 border-l border-white/10">
                                                <span className="text-white/40 text-xs">{t.toPayToday}</span>
                                                <div className="text-lg font-bold text-white">
                                                    {country.currencySymbol}{reservationAmount.toLocaleString()}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <Button variant="glow" size="lg" className="w-full md:w-auto">
                                        <Ticket className="w-5 h-5 mr-2" />
                                        {t.checkout}
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* TRUST BADGES */}
            <section className="py-16 border-t border-white/5">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { icon: ShieldCheck, label: t.verified, desc: "RaveHub Partner" },
                            { icon: Clock, label: "24/7", desc: "Soporte" },
                            { icon: CreditCard, label: t.installments, desc: "Disponibles" },
                            { icon: Users, label: "10K+", desc: "Army conectados" },
                        ].map((item, i) => (
                            <div key={i} className="glass-card p-4 rounded-xl flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <item.icon className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <span className="font-bold text-white text-sm block">{item.label}</span>
                                    <span className="text-white/40 text-xs">{item.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modals */}
            <CommunityModal isOpen={isCommunityOpen} onClose={() => setIsCommunityOpen(false)} />
            <MembershipModal isOpen={isMembershipModalOpen} onClose={() => setIsMembershipModalOpen(false)} />
        </div>
    );
}
