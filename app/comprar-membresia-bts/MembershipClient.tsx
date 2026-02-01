"use client";

import Image from 'next/image';
import Link from 'next/link';
import { GlassCard } from '@/components/GlassCard';
import { TermsModal } from '@/components/TermsModal';
import { Star, ShoppingBag, Music, ShieldCheck, ChevronDown, Ticket, Smartphone } from 'lucide-react';
import { useState, useEffect } from 'react';

const PRICING: Record<string, { symbol: string, price: string, link: string }> = {
    PE: { symbol: 'S/.', price: '99.50', link: 'https://mpago.la/1fcrBXe' },
    MX: { symbol: 'MXN', price: '450.00', link: '#' },
    CO: { symbol: 'COP', price: '110,000', link: '#' },
    CL: { symbol: 'CLP', price: '25,000', link: '#' },
    DEFAULT: { symbol: 'USD', price: '29.50', link: '#' }
};

export default function MembershipClient({ country = 'PE' }: { country?: string }) {
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [currency, setCurrency] = useState(PRICING[country] || PRICING.DEFAULT);

    useEffect(() => {
        const detectCountry = async () => {
             try {
                 const response = await fetch('https://ipinfo.io/json?token=083e31e242486c');
                 const data = await response.json();
                 if (data && data.country) {
                     const detectedCountry = data.country; // e.g., "PE", "US"
                     if (PRICING[detectedCountry]) {
                         setCurrency(PRICING[detectedCountry]);
                     } else {
                         setCurrency(PRICING.DEFAULT);
                     }
                 }
             } catch (error) {
                 console.error("Error detecting country", error);
             }
        };

        detectCountry();
    }, []);

    const handleBuyClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsTermsOpen(true);
    };

    const handleTermsAccept = () => {
        window.location.href = currency.link;
    };


    const benefits = [
        {
            icon: <Ticket className="w-8 h-8 text-primary" />,
            title: "Prioridad en Conciertos",
            description: "Acceso exclusivo a PREVENTAS y sorteos para entradas de conciertos de BTS (Indispensable para conseguir ticket)."
        },
        {
            icon: <Music className="w-8 h-8 text-primary" />,
            title: "Contenido Exclusivo",
            description: "Acceso a fotos, videos y audios solo para miembros en Weverse."
        },
        {
            icon: <ShoppingBag className="w-8 h-8 text-primary" />,
            title: "Merch Limitado",
            description: "Posibilidad de comprar productos exclusivos \"ARMY Member Only\" en la Weverse Shop."
        },
        {
            icon: <Star className="w-8 h-8 text-primary" />,
            title: "Participación en Eventos",
            description: "Oportunidad de aplicar para asistir a programas de música y eventos especiales en Corea."
        },
        {
            icon: <Smartphone className="w-8 h-8 text-primary" />,
            title: "Tarjeta Digital",
            description: "Tarjeta de membresía móvil oficial dentro de tu app Weverse."
        }
    ];

    const faqs = [
        {
            q: "¿Cuánto dura la membresía?",
            a: "La membresía tiene una validez de 365 días (1 año) a partir del momento de la activación."
        },
        {
            q: "¿Sirve para la preventa de conciertos en Latinoamérica?",
            a: "Sí, la ARMY Membership Global es el único requisito para acceder a las preventas oficiales de tickets en cualquier parte del mundo."
        },
        {
            q: "¿Cómo recibo mi membresía?",
            a: `Una vez realizado el pago de ${currency.symbol} ${currency.price}, procesamos tu alta y recibirás las credenciales y confirmación directamente a tu correo electrónico o whatsapp.`
        }
    ];

    return (
        <div className="min-h-screen pb-20 pt-16 bg-white">
            
            <TermsModal
                isOpen={isTermsOpen}
                onClose={() => setIsTermsOpen(false)}
                onAccept={handleTermsAccept}
                currency={currency}
            />

            {/* SECTION 1: HERO (CLEAN WHITE) */}
            <section className="relative w-full overflow-hidden flex flex-col items-center pt-16 pb-20 px-4 md:px-12 bg-white">
                <div className="relative z-20 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Text Content */}
                    <div className="order-1 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
                        
                        <div className="flex flex-col items-center lg:items-start gap-2">
                            <span className="text-sm font-bold tracking-[0.2em] text-slate-500 uppercase">
                                Servicio de asistencia para 
                            </span>

                            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-slate-900">
                                Comprar<br />
                                <span className="text-primary">Membresía</span><br />
                                Oficial BTS
                            </h1>
                        </div>

                        <div className="flex flex-col gap-1 max-w-lg">
                            <p className="text-xl md:text-2xl text-slate-600 leading-snug">
                                Asegura tu acceso a la <span className="bg-[#fcd34d] px-2 py-0.5 font-bold text-slate-900 mx-1 box-decoration-clone">preventa del Tour 2026</span>
                                hoy mismo.
                            </p>
                        </div>

                        <div className="w-full flex flex-col sm:flex-row items-center gap-6">
                            <button
                                onClick={handleBuyClick}
                                className="group bg-slate-900 text-white hover:bg-[#8A2BE2] transition-all text-xl font-black uppercase py-5 px-10 rounded-xl flex items-center justify-center gap-4 w-full sm:w-auto shadow-xl hover:shadow-2xl shadow-slate-900/20 hover:-translate-y-1"
                            >
                                <Ticket className="w-6 h-6" />
                                <span>Activar Membresía</span>
                            </button>
                            
                            <div className="text-center sm:text-left flex flex-col justify-center leading-tight">
                                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Precio: {currency.symbol} {currency.price}</p>
                                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">Pago Único</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-green-500" />
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Gestionamos tu pago en la web oficial.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Hero Visual (Clean Image) */}
                    <div className="order-2 lg:order-2 flex justify-center lg:justify-end relative">
                        <div className="relative transform hover:scale-105 transition-transform duration-500">
                            {/* Simple shadow instead of glow */}
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-200">
                                <Image
                                    src="/images/membership-card.png"
                                    alt="Tarjeta Membresía BTS ARMY Oficial"
                                    width={500}
                                    height={320}
                                    className="w-full max-w-md h-auto object-cover bg-slate-100"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: BENEFITS */}
            <section className="container mx-auto px-4 py-24 bg-slate-50">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black uppercase mb-4 text-slate-900">
                        Beneficios Exclusivos
                    </h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {benefits.map((benefit, i) => (
                        <div key={i} className="flex flex-col items-start gap-4 bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 group">
                            <div className="p-3 bg-red-50 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                {benefit.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold uppercase mb-2 text-slate-900">{benefit.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 3: PURCHASE & PRICE */}
            <section className="py-24 bg-white border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">

                        {/* Image Side */}
                        <div className="md:w-1/2 relative min-h-[300px] bg-slate-100">
                            <Image
                                src="/images/bts-tour-2026-latinoamerica-preventa.jpg"
                                alt="BTS Group"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
                        </div>

                        {/* Content Side */}
                        <div className="md:w-1/2 p-12 flex flex-col justify-center items-center text-center">
                            <h2 className="text-2xl font-bold uppercase mb-2 text-slate-900">Oferta Limitada</h2>
                            <div className="text-6xl font-black text-primary mb-2">{currency.symbol} {currency.price}</div>
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Pago Único / 1 Año</span>

                            <button
                                onClick={handleBuyClick}
                                className="w-full bg-slate-900 text-white font-bold uppercase py-4 rounded-xl hover:bg-[#8A2BE2] transition-colors shadow-lg hover:shadow-xl mb-6"
                            >
                                Proceder al Pago
                            </button>

                            <div className="flex justify-center opacity-60 hover:opacity-100 transition-opacity">
                                <Image
                                    src="/images/payment-methods.png"
                                    alt="Medios de Pago"
                                    width={300}
                                    height={40}
                                    className="h-8 w-auto grayscale"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: FAQ */}
            <section className="container mx-auto px-4 py-24 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black uppercase text-slate-900">Preguntas Frecuentes</h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border-b border-slate-200">
                            <details className="group py-6 cursor-pointer">
                                <summary className="flex justify-between items-center text-lg font-bold text-slate-900 list-none hover:text-primary transition-colors">
                                    {faq.q}
                                    <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform text-slate-400" />
                                </summary>
                                <div className="mt-4 text-slate-600 leading-relaxed">
                                    {faq.a}
                                </div>
                            </details>
                        </div>
                    ))}
                </div>
            </section>

            {/* STICKY MOBILE CTA */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden bg-white/90 backdrop-blur-lg border-t border-slate-200">
                <button
                    onClick={handleBuyClick}
                    className="block w-full bg-primary text-white font-bold uppercase text-center py-4 text-lg shadow-lg rounded-xl"
                >
                    Comprar - {currency.symbol} {currency.price}
                </button>
            </div>

        </div>
    );
}

function ArrowRightIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}
