"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import { CountdownTimer } from "@/components/CountdownTimer";
import { CountryData } from "@/lib/data/countries";
import { Calendar, MapPin, Ticket, Info, MessageCircle, CreditCard, Minus, Plus, Star, Music, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
    country: CountryData;
};

// Sales Phases Configuration
const PHASES = [
    {
        id: 'early-bird',
        name: 'EARLY BIRD',
        dates: '17 Ene - 22 Ene',
        start: new Date(2026, 0, 17), // Jan 17
        end: new Date(2026, 0, 22, 23, 59, 59),
        color: 'from-pink-500 to-rose-500',
        supply: 85
    },
    {
        id: 'preventa-1',
        name: 'PREVENTA 1',
        dates: '23 Ene - 15 Feb',
        start: new Date(2026, 0, 23),
        end: new Date(2026, 1, 15, 23, 59, 59),
        color: 'from-purple-500 to-indigo-500',
        supply: 0
    },
    {
        id: 'preventa-3',
        name: 'PREVENTA 3',
        dates: '16 Feb - 08 Oct',
        start: new Date(2026, 1, 16),
        end: new Date(2026, 9, 8, 20, 0, 0),
        color: 'from-cyan-500 to-blue-500',
        supply: 0
    }
];

const INSTALLMENT_CONFIG: Record<string, { fee: number; reservation: number }> = {
    'peru': { fee: 100, reservation: 100 },
    'chile': { fee: 30000, reservation: 27000 },
    'mexico': { fee: 600, reservation: 550 },
    'colombia': { fee: 120000, reservation: 110000 },
};

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }
};

export default function CountryClient({ country }: Props) {
    const primaryDate = new Date(country.dates[0]).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const whatsappNumber = "51999999999";

    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [isInstallment, setIsInstallment] = useState(false);
    const [installmentMonths, setInstallmentMonths] = useState(3);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
    }, []);

    const currentDate = mounted ? new Date() : new Date('2026-01-16'); // Default to before phases or specific date to avoid mismatch

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

    const generateWhatsAppLink = () => {
        const items = country.prices
            .filter(z => (quantities[z.zone] || 0) > 0)
            .map(z => `• ${quantities[z.zone]}x ${z.zone} (${country.currencySymbol} ${getPrice(z.price).toLocaleString('en-US')})`)
            .join('\n');

        const header = `Hola, deseo comprar entradas para BTS en ${country.name}:`;
        const paymentInfo = isInstallment
            ? `\n💳 *Plan Cuotas (${installmentMonths} meses)*\n` +
            `• Precio Regular + Fee: ${country.currencySymbol} ${totalAmount.toLocaleString('en-US')}\n` +
            `• Reserva (Pago Hoy): ${country.currencySymbol} ${reservationAmount.toLocaleString('en-US')}\n` +
            `• ${installmentMonths} Cuotas de: ${country.currencySymbol} ${monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            : `\n💰 *Pago Completo*\n• Total: ${country.currencySymbol} ${totalAmount.toLocaleString('en-US')}`;

        const fullMessage = `${header}\n${items}${paymentInfo}`;
        return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;
    };

    const getPhaseStatus = (phase: typeof PHASES[0]) => {
        if (activePhase && phase.id === activePhase.id) return 'active';
        if (currentDate > phase.end) return 'completed';
        return 'locked';
    };

    return (
        <div className="min-h-screen bg-[#020205] text-white overflow-x-hidden selection:bg-purple-500/30 font-sans">
            
            {/* Dynamic Background */}
            <div className="fixed inset-0 z-0">
                {/* Darker, cleaner base */}
                <div className="absolute inset-0 bg-[#020205]" />
                
                {/* Subtle ambient gradients - positioned to avoid text interference */}
                <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-purple-900/10 blur-[150px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[60vw] h-[60vw] bg-indigo-900/10 blur-[150px] rounded-full mix-blend-screen" />
                
                {/* Noise texture for premium feel */}
                <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay pointer-events-none"></div>
            </div>

            {/* HERO SECTION - Completely Redesigned */}
            <motion.section 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="relative z-10 min-h-screen w-full flex flex-col justify-center overflow-hidden pt-24 lg:pt-0"
            >
                {/* Hero Background Image */}
                <div className="absolute inset-0 z-0 select-none pointer-events-none">
                    <Image
                        src="/images/concert-bg.png"
                        alt="Concert Background"
                        fill
                        className="object-cover object-center opacity-40 mix-blend-overlay grayscale"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020205] via-[#020205]/80 to-[#020205]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#020205] via-[#020205]/60 to-transparent" />
                </div>

                <div className="w-full h-full px-4 lg:px-12 relative z-10 flex flex-col lg:grid lg:grid-cols-12 items-center gap-12 lg:gap-0">
                    
                    {/* LEFT: Impact Content (7 Cols) */}
                    <motion.div variants={fadeInUp} className="w-full lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-8 pt-8 lg:pt-0">
                        
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-purple-500/10">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            <span className="text-xs font-bold tracking-widest text-green-400 uppercase">Venta Oficial Activa</span>
                        </div>

                        {/* Main Heading */}
                        <div className="space-y-2">
                            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.9]">
                                <span className="block text-white drop-shadow-2xl">BTS</span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-white pb-2">
                                    {country.city.toUpperCase()}
                                </span>
                            </h1>
                        </div>

                        {/* Description */}
                        <p className="text-lg sm:text-xl text-gray-400 max-w-lg lg:max-w-xl font-light leading-relaxed">
                            El momento ha llegado. Únete al <span className="text-purple-300 font-semibold">Purple Ocean</span> en el {country.venue} para la experiencia más grande del 2026.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 pt-2">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button 
                                    className="w-full sm:w-auto bg-white text-black hover:bg-gray-100 text-base sm:text-lg px-8 py-6 rounded-full font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-2"
                                    onClick={() => document.getElementById('entradas')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    <Ticket className="w-5 h-5" />
                                    Comprar Tickets
                                </Button>
                            </motion.div>
                            
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <button className="w-full sm:w-auto px-8 py-6 rounded-full font-bold border border-white/20 hover:bg-white/5 transition-all text-white flex items-center justify-center gap-3 group backdrop-blur-sm">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                        <Play className="w-3 h-3 fill-current ml-0.5" />
                                    </div>
                                    <span className="text-sm sm:text-base">Ver Trailer</span>
                                </button>
                            </motion.div>
                        </div>

                        {/* Meta Info */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 text-sm font-medium text-gray-500 pt-4">
                            <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                                <Calendar className="w-4 h-4 text-purple-400" />
                                {primaryDate}
                            </span>
                            <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                                <MapPin className="w-4 h-4 text-pink-400" />
                                {country.venue}
                            </span>
                        </div>
                    </motion.div>

                    {/* RIGHT: Dashboard / Timer (5 Cols) */}
                    <motion.div variants={fadeInUp} className="w-full lg:col-span-5 flex flex-col justify-center relative h-full">
                        {/* Decorative Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

                        <div className="relative w-full max-w-md mx-auto lg:mr-0 lg:ml-auto">
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                            >
                                <div className="flex flex-col gap-6 p-2">
                                    {/* Header with Logo */}
                                    <div className="flex justify-between items-end border-b border-white/10 pb-6">
                                        <div>
                                            <p className="text-xs font-bold text-purple-400 uppercase tracking-[0.2em] mb-1">World Tour</p>
                                            <h3 className="text-5xl font-black text-white tracking-tighter">2026</h3>
                                        </div>
                                        <LogoIcon className="w-16 h-16 text-white opacity-90" />
                                    </div>

                                    {/* Timer Section */}
                                    <div className="py-2">
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Tiempo Restante</p>
                                            <div className="flex items-center gap-2">
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                                </span>
                                                <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">En vivo</span>
                                            </div>
                                        </div>
                                        <CountdownTimer targetDate={`${country.dates[0]}T20:00:00`} className="w-full" />
                                    </div>

                                    {/* Info Grid */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group cursor-default">
                                            <div className="p-2 bg-purple-500/20 w-fit rounded-lg text-purple-300 mb-3 group-hover:scale-110 transition-transform">
                                                <Music className="w-5 h-5" />
                                            </div>
                                            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Evento</p>
                                            <p className="text-base font-bold text-white">Live Concert</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group cursor-default">
                                            <div className="p-2 bg-pink-500/20 w-fit rounded-lg text-pink-300 mb-3 group-hover:scale-110 transition-transform">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Ciudad</p>
                                            <p className="text-base font-bold text-white">{country.city}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 2, duration: 2, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group z-20"
                    onClick={() => document.getElementById('entradas')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 group-hover:text-white transition-colors">Descubre Más</span>
                    <div className="w-[1px] h-8 bg-gradient-to-b from-gray-600 to-transparent group-hover:from-white transition-colors" />
                </motion.div>
            </motion.section>

            {/* MAIN CONTENT */}
            <div className="relative z-10 container mx-auto px-6 lg:px-8 py-24 space-y-32">
                
                {/* PHASES */}
                <section>
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="space-y-16"
                    >
                        <div className="text-center space-y-4 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">Cronograma de Venta</h2>
                            <p className="text-gray-400 text-lg">
                                Las entradas se liberan por fases. <span className="text-white font-medium">Recomendamos comprar en preventa</span> para asegurar los mejores lugares y precios.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {PHASES.map((phase, idx) => {
                                const status = getPhaseStatus(phase);
                                const isActive = status === 'active';
                                
                                return (
                                    <motion.div key={phase.id} variants={fadeInUp}>
                                        <GlassCard 
                                            className={`h-full p-8 relative overflow-hidden transition-all duration-500 group border-t-4
                                                ${isActive ? 'border-t-purple-500 bg-gradient-to-b from-purple-900/10 to-transparent' : 'border-t-transparent border-white/5 opacity-70 hover:opacity-100 hover:bg-white/5'}
                                            `}
                                        >
                                            {isActive && (
                                                <div className="absolute top-4 right-4">
                                                    <span className="relative flex h-3 w-3">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                                                    </span>
                                                </div>
                                            )}
                                            
                                            <div className="relative z-10 flex flex-col h-full">
                                                <div className="mb-4">
                                                    <span className={`text-[10px] font-bold tracking-[0.2em] uppercase 
                                                        ${isActive ? 'text-purple-400' : 'text-gray-500'}`}>
                                                        Fase 0{idx + 1}
                                                    </span>
                                                </div>

                                                <h3 className={`text-2xl font-black uppercase mb-2 ${isActive ? 'text-white' : 'text-gray-300'}`}>
                                                    {phase.name}
                                                </h3>
                                                <p className="text-sm font-medium text-gray-500 mb-8 flex items-center gap-2">
                                                    <Calendar className="w-3 h-3" />
                                                    {phase.dates}
                                                </p>

                                                {isActive && (
                                                    <div className="mt-auto space-y-3">
                                                        <div className="flex justify-between text-xs font-bold text-white/80">
                                                            <span>Disponibilidad</span>
                                                            <span className="text-purple-400">{phase.supply}%</span>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                                            <motion.div 
                                                                initial={{ width: 0 }}
                                                                whileInView={{ width: `${phase.supply}%` }}
                                                                transition={{ duration: 1.5, ease: "circOut" }}
                                                                className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                                                            />
                                                        </div>
                                                        <p className="text-[10px] text-gray-500 text-right">Alta demanda en este momento</p>
                                                    </div>
                                                )}
                                                
                                                {status === 'locked' && (
                                                    <div className="mt-auto pt-4 border-t border-white/5">
                                                        <div className="flex items-center gap-2 text-xs text-gray-600 font-bold uppercase tracking-wider">
                                                            <div className="w-2 h-2 rounded-full bg-gray-700" />
                                                            Próximamente
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </GlassCard>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </section>

                {/* PRICING & ZONES */}
                <section id="entradas" className="scroll-mt-24">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-12">
                            <div className="max-w-2xl">
                                <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">Tickets & Zonas</h2>
                                <p className="text-gray-400 text-lg">
                                    Explora las ubicaciones disponibles en el estadio. Todos los precios incluyen impuestos y tasas de servicio.
                                </p>
                            </div>
                            
                            {/* Installment Switch */}
                            <div className="flex items-center gap-4 bg-white/5 p-1.5 pr-6 rounded-full border border-white/10 backdrop-blur-md">
                                <div className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg ${!isInstallment ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>
                                    Contado
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer group">
                                    <input type="checkbox" checked={isInstallment} onChange={(e) => setIsInstallment(e.target.checked)} className="sr-only peer" />
                                    <div className="w-12 h-7 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-gray-400 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-900 peer-checked:after:bg-white group-hover:after:bg-white"></div>
                                </label>
                                <div className={`text-sm font-bold transition-colors ${isInstallment ? 'text-purple-400' : 'text-gray-400'}`}>
                                    Cuotas
                                </div>
                            </div>
                        </div>

                        {/* Installment Controls */}
                        <AnimatePresence>
                            {isInstallment && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0, y: -20 }}
                                    animate={{ height: "auto", opacity: 1, y: 0 }}
                                    exit={{ height: 0, opacity: 0, y: -20 }}
                                    className="overflow-hidden mb-10"
                                >
                                    <GlassCard className="p-6 border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center gap-5">
                                            <div className="p-4 bg-purple-500/20 rounded-2xl text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                                                <CreditCard className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-lg">Facilidades de Pago</h4>
                                                <p className="text-sm text-gray-400">
                                                    Reserva hoy con solo <span className="text-white font-bold">{country.currencySymbol}{config.reservation}</span> y paga el resto hasta en 3 cuotas sin intereses.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 bg-black/20 p-1.5 rounded-xl">
                                            {[1, 2, 3].map(m => (
                                                <button
                                                    key={m}
                                                    onClick={() => setInstallmentMonths(m)}
                                                    className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${installmentMonths === m ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                                >
                                                    {m} {m === 1 ? 'Mes' : 'Meses'}
                                                </button>
                                            ))}
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="grid lg:grid-cols-12 gap-10">
                            {/* Tickets List */}
                            <div className="lg:col-span-8 space-y-4">
                                {country.prices.map((zone, idx) => (
                                    <motion.div 
                                        key={zone.zone}
                                        variants={cardHover}
                                        whileHover="hover"
                                        initial="rest"
                                        animate="rest"
                                    >
                                        <GlassCard className="group p-0 overflow-visible border-white/5 hover:border-purple-500/30 transition-colors bg-[#0A0A0A]">
                                            <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8">
                                                
                                                {/* Rank/Index */}
                                                <div className="flex-shrink-0 hidden sm:block">
                                                    <span className="text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors">0{idx + 1}</span>
                                                </div>

                                                {/* Details */}
                                                <div className="flex-grow text-center sm:text-left w-full">
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                                        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">{zone.zone}</h3>
                                                        {idx === 0 && (
                                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 self-center sm:self-auto">
                                                                <Star className="w-3 h-3 fill-current" /> VIP
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-gray-500">
                                                        <span className="flex items-center gap-1.5"><Ticket className="w-3.5 h-3.5" /> Stock Limitado</span>
                                                        <span className="w-1 h-1 bg-gray-800 rounded-full" />
                                                        <span className="flex items-center gap-1.5"><Info className="w-3.5 h-3.5" /> {isInstallment ? '+ Fee admin' : 'Precio Final'}</span>
                                                    </div>
                                                </div>

                                                {/* Price & Action */}
                                                <div className="flex flex-col items-center sm:items-end gap-4 min-w-[160px] w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-white/5">
                                                    <div className="text-center sm:text-right">
                                                        <p className="text-3xl font-black text-white tracking-tight">
                                                            <span className="text-sm font-bold text-gray-500 mr-1 align-top mt-1 inline-block">{country.currencySymbol}</span>
                                                            {getPrice(zone.price).toLocaleString('en-US')}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/5">
                                                        <button 
                                                            onClick={() => updateQuantity(zone.zone, -1)}
                                                            className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-md transition-colors text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                                            disabled={!activePhase || (quantities[zone.zone] || 0) <= 0}
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="w-10 text-center font-bold text-lg tabular-nums">{quantities[zone.zone] || 0}</span>
                                                        <button 
                                                            onClick={() => updateQuantity(zone.zone, 1)}
                                                            className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                                            disabled={!activePhase}
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </GlassCard>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Map Sticky */}
                            <div className="lg:col-span-4">
                                <div className="sticky top-24 space-y-6">
                                    <GlassCard className="p-2 bg-[#0A0A0A] border-white/10">
                                        <div className="relative aspect-square rounded-xl overflow-hidden bg-[#111]">
                                            <Image 
                                                src="/images/stadium-map.png"
                                                alt="Venue Map"
                                                fill
                                                className="object-contain p-6 hover:scale-105 transition-transform duration-500"
                                            />
                                            {/* Map Overlay Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                                            
                                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                                <p className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                                                    <MapPin className="w-3 h-3" /> Distribución
                                                </p>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-3 text-xs font-medium text-gray-300 bg-white/5 p-2 rounded-lg border border-white/5">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" /> 
                                                        VIP Soundcheck
                                                    </div>
                                                    <div className="flex items-center gap-3 text-xs font-medium text-gray-300 bg-white/5 p-2 rounded-lg border border-white/5">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-gray-300" /> 
                                                        Cancha General
                                                    </div>
                                                    <div className="flex items-center gap-3 text-xs font-medium text-gray-300 bg-white/5 p-2 rounded-lg border border-white/5">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" /> 
                                                        Tribunas Numeradas
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                    
                                    <div className="p-4 rounded-2xl bg-purple-900/10 border border-purple-500/20 text-center">
                                        <p className="text-xs text-purple-300 font-medium leading-relaxed">
                                            * El mapa es referencial. Las ubicaciones pueden variar según la disposición final del escenario.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </div>

            {/* CHECKOUT BAR - Optimized */}
            <AnimatePresence>
                {totalTickets > 0 && (
                    <motion.div 
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-0 left-0 right-0 z-50 p-4 lg:p-6 pointer-events-none"
                    >
                        <div className="container mx-auto max-w-5xl pointer-events-auto">
                            <GlassCard className="p-4 md:p-6 border-t border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] bg-[#121212]/95 backdrop-blur-xl rounded-3xl ring-1 ring-white/10">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex-1 text-center md:text-left space-y-1">
                                        {isInstallment ? (
                                            <>
                                                <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">Pago Inicial Requerido</p>
                                                <div className="flex items-baseline justify-center md:justify-start gap-3">
                                                    <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">{country.currencySymbol} {reservationAmount.toLocaleString('en-US')}</h3>
                                                    <div className="text-left leading-tight">
                                                        <p className="text-xs text-gray-400 font-medium">+ {installmentMonths} cuotas de</p>
                                                        <p className="text-sm text-white font-bold">{country.currencySymbol} {monthlyPayment.toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total a Pagar ({totalTickets} tickets)</p>
                                                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">{country.currencySymbol} {totalAmount.toLocaleString('en-US')}</h3>
                                            </>
                                        )}
                                    </div>

                                    <motion.a
                                        href={generateWhatsAppLink()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full md:w-auto"
                                    >
                                        <Button size="lg" className="w-full md:w-auto bg-white hover:bg-gray-100 text-black font-black text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)] px-10 py-7 rounded-2xl flex items-center justify-center gap-3">
                                            <MessageCircle className="w-6 h-6 fill-current" />
                                            {isInstallment ? 'Reservar Ahora' : 'Confirmar Compra'}
                                        </Button>
                                    </motion.a>
                                </div>
                            </GlassCard>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Simple Logo Icon
function LogoIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M4.5 3.75a.75.75 0 00-1.5 0v16.5a.75.75 0 001.5 0v-16.5zM7.5 3.75a.75.75 0 00-1.5 0v16.5a.75.75 0 001.5 0v-16.5zM11.25 3.75a.75.75 0 00-1.5 0v16.5a.75.75 0 001.5 0v-16.5zM14.25 3.75a.75.75 0 00-1.5 0v16.5a.75.75 0 001.5 0v-16.5zM18 3.75a.75.75 0 00-1.5 0v16.5a.75.75 0 001.5 0v-16.5z" />
        </svg>
    )
}
