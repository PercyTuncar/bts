import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { GlassCard } from '@/components/GlassCard';
import { Star, ShoppingBag, Music, ShieldCheck, ChevronDown, Ticket, Smartphone } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Membresía BTS: Compra Aquí',
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
                url: '/images/membership-card.png',
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
        <div className="min-h-screen pb-20 pt-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* SECTION 1: HERO (NETFLIX STYLE) */}
            <section className="relative h-[90vh] md:h-screen w-full overflow-hidden flex items-center md:items-end pb-12 md:pb-32 px-4 md:px-12 group">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/bts-group-hero.jpg"
                        alt="BTS Member Group Photo"
                        fill
                        className="object-cover object-top md:object-center transition-transform duration-[20s] ease-linear group-hover:scale-105"
                        priority
                    />
                    {/* Mobile Gradient: darker overall for legibility */}
                    <div className="absolute inset-0 bg-black/60 md:bg-transparent z-10 block md:hidden"></div>

                    {/* Desktop Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-10 hidden md:block"></div>
                </div>

                {/* Content */}
                <div className="relative z-20 max-w-2xl space-y-6 animate-in slide-in-from-bottom-10 fade-in duration-1000">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-4">
                            <Image src="/icon.png" width={40} height={40} alt="BTS Logo" className="drop-shadow-lg" />
                            <span className="text-sm font-bold tracking-[0.2em] text-gray-200 uppercase">Official Fanclub</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] drop-shadow-2xl">
                            <span className="block text-white">Membresía</span>
                            <span className="block text-acid-pink">BTS</span>
                        </h1>
                    </div>

                    <p className="text-xl md:text-2xl font-medium text-gray-100 max-w-lg drop-shadow-md">
                        Comprar Aquí. La única forma de acceder a las preventas del Tour 2026.
                        <br />
                        <span className="text-acid-yellow font-bold mt-2 block">¡Únete al ARMY oficial hoy!</span>
                    </p>

                    <div className="flex flex-col gap-4 pt-4">
                        <a
                            href="https://mpago.la/1fcrBXe"
                            target="_blank"
                            rel="noopener"
                            className="bg-acid-pink text-white hover:bg-white hover:text-black transition-all text-xl md:text-2xl font-black uppercase py-4 px-10 rounded flex items-center gap-3 w-fit shadow-[0_0_30px_rgba(255,28,94,0.5)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)]"
                        >
                            <Ticket className="w-6 h-6 fill-current" />
                            Comprar Ahora - S/. 99.50
                        </a>
                        <p className="text-sm font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
                            <span className="text-neon-green">⚡</span> Entrega digital rápida | Acceso Oficial 2026
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 2: BENEFITS */}
            <section className="container mx-auto px-4 py-20 border-t border-white/10 relative z-20 bg-black">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black uppercase mb-4">
                        ¿Por qué necesitas la <span className="text-acid-pink">ARMY Membership</span>?
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Ser parte del fandom oficial no es solo un título, es tu llave de acceso a beneficios exclusivos.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((benefit, i) => (
                        <GlassCard key={i} className="flex flex-col items-start gap-4 hover:bg-white/5 transition-colors p-8">
                            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                {benefit.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-black uppercase mb-2 text-white">{benefit.title}</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </section>

            {/* SECTION 3: PRICE & GUARANTEE */}
            <section className="relative py-24 overflow-hidden bg-black">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-acid-yellow/5"></div>
                <div className="absolute -right-20 top-20 w-96 h-96 bg-acid-pink blur-[150px] opacity-20"></div>

                <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12">

                    {/* Visual Card Display - Moved from Hero */}
                    <div className="relative w-full max-w-md perspective-1000 group">
                        <div className="relative transform rotate-y-12 group-hover:rotate-y-0 transition-transform duration-700 ease-out">
                            <div className="absolute inset-0 bg-acid-pink blur-3xl opacity-30 animate-pulse"></div>
                            <GlassCard className="p-0 border-0 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
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
                    <div className="max-w-xl w-full bg-black/50 border border-white/20 p-8 md:p-12 text-center relative overflow-hidden backdrop-blur-md">
                        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>

                        <h2 className="text-3xl md:text-4xl font-black uppercase mb-8 relative z-10">Precio de Oferta Limitada</h2>

                        <div className="flex flex-col items-center justify-center gap-6 relative z-10">
                            <div className="text-7xl md:text-8xl font-black text-white leading-none tracking-tighter">
                                S/. 99.50
                                <span className="block mt-4">
                                    <span className="py-2 px-4 rounded-full border border-white/20 bg-white/5 text-sm md:text-base text-gray-300 font-bold tracking-widest uppercase">
                                        Pago Único / 1 Año
                                    </span>
                                </span>
                            </div>

                            <div className="w-full space-y-4">
                                <a
                                    href="https://mpago.la/1fcrBXe"
                                    target="_blank"
                                    rel="noopener"
                                    className="block w-full bg-acid-yellow text-black font-black uppercase text-2xl py-5 hover:scale-105 transition-transform shadow-[8px_8px_0_white] hover:shadow-[12px_12px_0_white]"
                                >
                                    Proceder al Pago
                                </a>
                                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                                    <ShieldCheck className="w-4 h-4 text-neon-green" />
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
                <div className="mb-12 border-b-4 border-white pb-4">
                    <h2 className="text-4xl md:text-5xl font-black uppercase italic">Preguntas Frecuentes</h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="group border-2 border-white/10 hover:border-acid-yellow transition-colors bg-black/50">
                            <details className="group p-6 cursor-pointer">
                                <summary className="flex justify-between items-center text-xl font-bold uppercase list-none">
                                    <h3 className="group-hover:text-acid-yellow transition-colors">{faq.q}</h3>
                                    <ChevronDown className="w-6 h-6 group-open:rotate-180 transition-transform text-white/50 group-hover:text-acid-yellow" />
                                </summary>
                                <div className="mt-4 text-gray-400 text-lg leading-relaxed pl-2 border-l-2 border-acid-pink">
                                    {faq.a}
                                </div>
                            </details>
                        </div>
                    ))}
                </div>
            </section>

            {/* STICKY MOBILE CTA */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden bg-gradient-to-t from-black via-black to-transparent pt-8">
                <a
                    href="https://mpago.la/1fcrBXe"
                    target="_blank"
                    rel="noopener"
                    className="block w-full bg-white text-black font-black uppercase text-center py-4 text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)]"
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
