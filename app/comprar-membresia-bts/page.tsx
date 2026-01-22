import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { GlassCard } from '@/components/GlassCard';
import { Star, ShoppingBag, Music, ShieldCheck, ChevronDown, Ticket, Smartphone } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Comprar Membresía BTS Peru',
    description: '¡Únete al ARMY oficial! Compra tu Membresía BTS Global por S/. 99.50. Accede a preventas de conciertos, sorteos y contenido exclusivo en Weverse. Pago seguro con Mercado Pago.',
    keywords: ['membresía bts precio perú', 'comprar army membership', 'bts fanclub oficial', 'beneficios membresía bts', 'weverse shop bts'],
    alternates: {
        canonical: 'https://entradasbts.com/comprar-membresia-bts',
    },
    openGraph: {
        title: 'Compra tu Membresía BTS ARMY Oficial - S/. 99.50',
        description: 'Asegura tu acceso a preventas de entradas y contenido exclusivo de BTS. Únete al Fanclub oficial hoy mismo.',
        images: [
            {
                url: '/images/bts-group-hero.jpg',
                width: 1200,
                height: 630,
                alt: 'Membresía BTS Global Official Fanclub ARMY',
            }
        ],
        type: 'website',
        locale: 'es_PE',
    }
};

export default function MembershipPage() {
    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "Membresía BTS Global Official Fanclub ARMY",
        "image": [
            "https://entradasbts.com/images/membership-card.png",
            "https://entradasbts.com/images/og-peru.jpg"
        ],
        "description": "Membresía oficial para fans de BTS (ARMY). Incluye acceso a preventas de conciertos, contenido exclusivo en Weverse y kit de membresía móvil.",
        "sku": "BTS-MEM-PE-2026",
        "mpn": "BTS-ARMY-GLOBAL-001",
        "brand": {
            "@type": "Brand",
            "name": "BTS / HYBE",
            "logo": "https://entradasbts.com/icon.png"
        },
        "offers": {
            "@type": "Offer",
            "url": "https://entradasbts.com/comprar-membresia-bts-army",
            "priceCurrency": "PEN",
            "price": "99.50",
            "priceValidUntil": "2026-12-31",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "Entradas BTS",
                "url": "https://entradasbts.com"
            },
            "acceptedPaymentMethod": "http://purl.org/goodrelations/v1#PaymentMethodCreditCard",
            "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": "0",
                    "currency": "PEN"
                },
                "shippingDestination": {
                    "@type": "DefinedRegion",
                    "addressCountry": "PE"
                },
                "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "handlingTime": {
                        "@type": "QuantitativeValue",
                        "minValue": "0",
                        "maxValue": "0",
                        "unitCode": "DAY"
                    },
                    "transitTime": {
                        "@type": "QuantitativeValue",
                        "minValue": "0",
                        "maxValue": "0",
                        "unitCode": "DAY"
                    }
                }
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "1520",
            "bestRating": "5",
            "worstRating": "1"
        },
        "audience": {
            "@type": "Audience",
            "audienceType": "K-pop Fans, BTS Army, Music Lovers"
        },
        "category": "Arts & Entertainment > Music > Fan Clubs"
    };

    const benefits = [
        {
            icon: <Ticket className="w-8 h-8 text-acid-yellow" />,
            title: "Prioridad en Conciertos",
            description: "Acceso exclusivo a PREVENTAS y sorteos para entradas de conciertos de BTS (Indispensable para conseguir ticket)."
        },
        {
            icon: <Music className="w-8 h-8 text-acid-pink" />,
            title: "Contenido Exclusivo",
            description: "Acceso a fotos, videos y audios solo para miembros en Weverse."
        },
        {
            icon: <ShoppingBag className="w-8 h-8 text-neon-green" />,
            title: "Merch Limitado",
            description: "Posibilidad de comprar productos exclusivos \"ARMY Member Only\" en la Weverse Shop."
        },
        {
            icon: <Star className="w-8 h-8 text-acid-yellow" />,
            title: "Participación en Eventos",
            description: "Oportunidad de aplicar para asistir a programas de música y eventos especiales en Corea."
        },
        {
            icon: <Smartphone className="w-8 h-8 text-white" />,
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
            a: "Una vez realizado el pago de S/. 99.50, procesamos tu alta y recibirás las credenciales y confirmación directamente a tu correo electrónico o whatsapp."
        }
    ];

    return (
        <div className="min-h-screen pb-20 pt-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* SECTION 1: HERO (LIGHT PREMIUM STYLE) */}
            <section className="relative w-full overflow-hidden flex flex-col items-center pt-8 pb-16 lg:pt-16 lg:pb-24 px-4 md:px-12 bg-purple-50">

                {/* Background Decor */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <Image
                        src="/images/bts-group-hero.jpg"
                        alt="BTS Member Group Photo"
                        fill
                        className="object-cover opacity-20 lg:opacity-30" // Lower opacity for background effect
                        priority
                    />
                    {/* Gradients for Pastel Vibe */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-50/90 via-white/80 to-purple-50/90"></div>

                    {/* Decorative Elements */}
                    <div className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                {/* Content Container */}
                <div className="relative z-20 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Text Content */}
                    <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-2">
                        <div className="inline-flex items-center gap-2 mb-0">
                            <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-slate-500 uppercase">SERVICIO DE ASISTENCIA PARA</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                            <span className="block text-slate-900 drop-shadow-sm">COMPRAR</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Membresía</span>
                            <span className="block text-slate-900">BTS ARMY</span>
                        </h1>

                        <p className="text-base md:text-xl font-medium text-slate-600 max-w-lg leading-relaxed">
                            Asegura tu acceso a la <span className="font-bold text-slate-900 bg-acid-yellow/50 px-1">preventa del Tour 2026</span> hoy mismo.
                            <br className="hidden md:block" />
                            <span className="block mt-2 text-primary font-bold">¡Únete al ARMY oficial hoy!</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6 w-full sm:w-auto">
                            <a
                                href="https://mpago.la/1fcrBXe"
                                target="_blank"
                                rel="noopener"
                                className="group bg-slate-900 text-white hover:bg-white hover:text-slate-900 border-2 border-slate-900 transition-all text-xl font-black uppercase py-4 px-12 rounded-lg flex items-center justify-center gap-3 w-full sm:w-auto shadow-[6px_6px_0_#A855F7] hover:shadow-[2px_2px_0_#A855F7] hover:translate-x-1 hover:translate-y-1 relative overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10"></span>
                                <Ticket className="w-6 h-6" />
                                <span>Comprar Ahora</span>
                            </a>
                            <div className="flex flex-col justify-center text-xs font-bold text-slate-400 uppercase tracking-widest text-center sm:text-left">
                                <span>Precio: S/. 99.50</span>
                                <span className="text-[10px] text-slate-300">Pago único</span>
                            </div>
                        </div>

                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mt-4">
                            <ShieldCheck className="w-4 h-4 text-green-500" /> Gestionamos tu pago en la web oficial.
                        </p>
                    </div>

                    {/* Right Column: Hero Visual (Card Mockup) */}
                    <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative perspective-1000">
                        <div className="relative transform hover:scale-105 transition-transform duration-500">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-acid-yellow blur-3xl opacity-40 rounded-full"></div>

                            {/* Card Image Container with Premium Glass Effect */}
                            <div className="relative z-10 rotate-6 hover:rotate-2 transition-transform duration-500">
                                {/* Glass Border/Glow Wrapper */}
                                <div className="absolute -inset-0.5 bg-gradient-to-br from-white/60 to-white/5 rounded-[2rem] blur-[1px]"></div>

                                {/* Main Card Container */}
                                <div className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(168,85,247,0.4)] backdrop-blur-sm">
                                    <Image
                                        src="/images/membership-card.png"
                                        alt="Tarjeta Membresía BTS ARMY Oficial"
                                        width={500}
                                        height={320}
                                        className="w-full max-w-md h-auto object-cover relative z-10"
                                        priority
                                    />

                                    {/* Premium Gloss Effects */}
                                    {/* 1. Top Highlight */}
                                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none z-20 mix-blend-overlay"></div>

                                    {/* 2. Diagonal Sheen */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/10 pointer-events-none z-20"></div>

                                    {/* 3. Iridescent/Holo Detail (Subtle) */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 mix-blend-color-dodge opacity-50 z-20 pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -right-6 z-20 bg-white p-4 rounded-xl shadow-xl border border-slate-100 animate-bounce-slow">
                                <div className="flex items-center gap-2">
                                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div className="flex flex-col leading-none">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Estado</span>
                                        <span className="font-black text-slate-900 uppercase">Disponible</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: BENEFITS */}
            <section className="container mx-auto px-4 py-20 border-t border-slate-200 relative z-20 bg-white">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black uppercase mb-4 text-slate-900">
                        ¿Por qué necesitas la <span className="text-primary">ARMY Membership</span>?
                    </h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                        Ser parte del fandom oficial no es solo un título, es tu llave de acceso a beneficios exclusivos.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((benefit, i) => (
                        <GlassCard key={i} className="flex flex-col items-start gap-4 hover:bg-slate-50 transition-colors p-8 border border-slate-200 shadow-sm">
                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                {benefit.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-black uppercase mb-2 text-slate-900">{benefit.title}</h3>
                                <p className="text-slate-500 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </section>

            {/* SECTION 3: PRICE & GUARANTEE */}
            <section className="relative py-24 overflow-hidden bg-slate-50">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-primary/5"></div>
                <div className="absolute -right-20 top-20 w-96 h-96 bg-secondary blur-[150px] opacity-20"></div>

                <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12">

                    {/* Visual Card Display - Moved from Hero */}
                    <div className="relative w-full max-w-md perspective-1000 group">
                        <div className="relative transform rotate-y-12 group-hover:rotate-y-0 transition-transform duration-700 ease-out">
                            <div className="absolute inset-0 bg-primary blur-3xl opacity-30 animate-pulse"></div>
                            <GlassCard className="p-0 border-0 overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/membership-card.png"
                                    alt="Tarjeta Membresía BTS ARMY Oficial"
                                    width={600}
                                    height={380}
                                    className="w-full h-auto object-cover rounded-xl"
                                />
                            </GlassCard>
                        </div>
                    </div>

                    {/* Price Content */}
                    <div className="max-w-xl w-full bg-white/80 border border-slate-200 p-8 md:p-12 text-center relative overflow-hidden backdrop-blur-md shadow-lg rounded-2xl">

                        <h2 className="text-3xl md:text-4xl font-black uppercase mb-8 relative z-10 text-slate-900">Precio de Oferta Limitada</h2>

                        <div className="flex flex-col items-center justify-center gap-6 relative z-10">
                            <div className="text-7xl md:text-8xl font-black text-slate-900 leading-none tracking-tighter">
                                S/. 99.50
                                <span className="block mt-4">
                                    <span className="py-2 px-4 rounded-full border border-slate-200 bg-slate-50 text-sm md:text-base text-slate-500 font-bold tracking-widest uppercase">
                                        Pago Único / 1 Año
                                    </span>
                                </span>
                            </div>

                            <div className="w-full space-y-4">
                                <a
                                    href="https://mpago.la/1fcrBXe"
                                    target="_blank"
                                    rel="noopener"
                                    className="block w-full bg-primary text-slate-900 font-black uppercase text-2xl py-5 hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                                >
                                    Proceder al Pago
                                </a>
                                <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                                    <ShieldCheck className="w-4 h-4 text-secondary" />
                                    Pago 100% seguro procesado por Mercado Pago
                                </div>
                                <div className="flex justify-center pt-2">
                                    <Image
                                        src="/images/payment-methods.png"
                                        alt="Medios de Pago: Yape, Plin, Visa, Mastercard"
                                        width={400}
                                        height={60}
                                        className="w-full max-w-sm h-auto opacity-90 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: FAQ */}
            <section className="container mx-auto px-4 py-20 max-w-4xl">
                <div className="mb-12 border-b-4 border-slate-900 pb-4">
                    <h2 className="text-4xl md:text-5xl font-black uppercase italic text-slate-900">Preguntas Frecuentes</h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="group border border-slate-200 hover:border-primary transition-colors bg-white">
                            <details className="group p-6 cursor-pointer">
                                <summary className="flex justify-between items-center text-xl font-bold uppercase list-none">
                                    <h3 className="text-slate-900 group-hover:text-primary transition-colors">{faq.q}</h3>
                                    <ChevronDown className="w-6 h-6 group-open:rotate-180 transition-transform text-slate-400 group-hover:text-primary" />
                                </summary>
                                <div className="mt-4 text-slate-600 text-lg leading-relaxed pl-2 border-l-2 border-primary">
                                    {faq.a}
                                </div>
                            </details>
                        </div>
                    ))}
                </div>
            </section>

            {/* STICKY MOBILE CTA */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden bg-gradient-to-t from-white via-white to-transparent pt-8">
                <a
                    href="https://mpago.la/1fcrBXe"
                    target="_blank"
                    rel="noopener"
                    className="block w-full bg-primary text-slate-900 font-black uppercase text-center py-4 text-lg shadow-lg"
                >
                    Comprar Membresía - S/. 99.50
                </a>
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
