"use client";

import Image from 'next/image';
import Link from 'next/link';
import { GlassCard } from '@/components/GlassCard';
import { TermsModal } from '@/components/TermsModal';
import { Star, ShoppingBag, Music, ShieldCheck, ChevronDown, Ticket, Smartphone } from 'lucide-react';
import { useState, useEffect } from 'react';

const PRICING: Record<string, { symbol: string, price: string, link: string }> = {
    PE: { symbol: 'S/.', price: '99.50', link: 'https://secure.micuentaweb.pe/t/o6d5a6ps' },
    MX: { symbol: 'MXN', price: '490.00', link: 'https://secure.micuentaweb.pe/t/o6d5a6ps' },
    CO: { symbol: 'COP', price: '115,000', link: 'https://secure.micuentaweb.pe/t/o6d5a6ps' },
    CL: { symbol: 'CLP', price: '26,000', link: 'https://secure.micuentaweb.pe/t/o6d5a6ps' },
    BR: { symbol: 'R$', price: '180,00', link: 'https://secure.micuentaweb.pe/t/o6d5a6ps' },
    AR: { symbol: 'ARS', price: '30,000', link: 'https://secure.micuentaweb.pe/t/o6d5a6ps' },
    DEFAULT: { symbol: 'USD', price: '29.50', link: 'https://secure.micuentaweb.pe/t/o6d5a6ps' }
};

const TEXTS = {
    ES: {
        assistance_service: "Servicio de asistencia para",
        title_top: "Comprar",
        title_middle: "Membresía",
        title_bottom: "BTS Oficial",
        hero_subtitle_pre: "Asegura tu acceso a la",
        hero_highlight: "preventa del Tour 2026",
        hero_subtitle_post: "hoy mismo.",
        activate_membership_btn: "Activar Membresía",
        price_label: "Precio:",
        one_time_payment: "Pago Único",
        secure_payment: "Gestionamos tu pago en la web oficial.",
        exclusive_benefits_title: "Beneficios Exclusivos",
        benefit_1_title: "Prioridad en Conciertos",
        benefit_1_desc: "Acceso exclusivo a PREVENTAS y sorteos para entradas de conciertos de BTS (Indispensable para conseguir ticket).",
        benefit_2_title: "Contenido Exclusivo",
        benefit_2_desc: "Acceso a fotos, videos y audios solo para miembros en Weverse.",
        benefit_3_title: "Merch Limitado",
        benefit_3_desc: "Posibilidad de comprar productos exclusivos \"ARMY Member Only\" en la Weverse Shop.",
        benefit_4_title: "Participación en Eventos",
        benefit_4_desc: "Oportunidad de aplicar para asistir a programas de música y eventos especiales en Corea.",
        benefit_5_title: "Tarjeta Digital",
        benefit_5_desc: "Tarjeta de membresía móvil oficial dentro de tu app Weverse.",
        limited_offer: "Oferta Limitada",
        one_time_payment_1_year: "Pago Único / 1 Año",
        proceed_to_payment: "Proceder al Pago",
        faq_title: "Preguntas Frecuentes",
        faq_1_q: "¿Cuánto dura la membresía?",
        faq_1_a: "La membresía tiene una validez de 365 días (1 año) a partir del momento de la activación.",
        faq_2_q: "¿Sirve para la preventa de conciertos en Latinoamérica?",
        faq_2_a: "Sí, la ARMY Membership Global es el único requisito para acceder a las preventas oficiales de tickets en cualquier parte del mundo.",
        faq_3_q: "¿Cómo recibo mi membresía?",
        faq_3_a_pre: "Una vez realizado el pago de",
        faq_3_a_post: "procesamos tu alta y recibirás las credenciales y confirmación directamente a tu correo electrónico o whatsapp.",
        sticky_buy: "Comprar -",
        modal_total_amount: "Monto Total a Pagar",
        modal_select_card_instruct: "Selecciona \"Pagar con Tarjeta\" para completar tu compra de forma segura.",
        modal_terms_read_accept: "He leído y acepto los",
        modal_terms_conditions: "Términos y Condiciones",
        modal_terms_and: "y la",
        modal_terms_privacy: "Política de Privacidad",
        modal_other_countries_pay: "Otros países pueden pagar con tarjeta",
        modal_debit_credit_here: "de débito o crédito VISA / Mastercard aquí",
        modal_pay_card_btn: "PAGAR CON TARJETA AQUÍ",
        modal_pay_accepts_terms: "AL REALIZAR EL PAGO, ACEPTAS LOS TÉRMINOS Y CONDICIONES"
    },
    PT: {
        assistance_service: "Serviço de assistência para",
        title_top: "Comprar",
        title_middle: "Membros",
        title_bottom: "Oficial BTS",
        hero_subtitle_pre: "Garanta seu acesso à",
        hero_highlight: "pré-venda da Tour 2026",
        hero_subtitle_post: "hoje mesmo.",
        activate_membership_btn: "Ativar Membros",
        price_label: "Preço:",
        one_time_payment: "Pagamento Único",
        secure_payment: "Gerenciamos seu pagamento no site oficial.",
        exclusive_benefits_title: "Benefícios Exclusivos",
        benefit_1_title: "Prioridade em Shows",
        benefit_1_desc: "Acesso exclusivo a PRÉ-VENDAS e sorteios para ingressos de shows do BTS (Indispensável para conseguir ingresso).",
        benefit_2_title: "Conteúdo Exclusivo",
        benefit_2_desc: "Acesso a fotos, vídeos e áudios apenas para membros no Weverse.",
        benefit_3_title: "Merch Limitado",
        benefit_3_desc: "Possibilidade de comprar produtos exclusivos \"ARMY Member Only\" na Weverse Shop.",
        benefit_4_title: "Participação em Eventos",
        benefit_4_desc: "Oportunidade de se inscrever para assistir a programas de música e eventos especiais na Coreia.",
        benefit_5_title: "Cartão Digital",
        benefit_5_desc: "Cartão de membro móvel oficial dentro do seu app Weverse.",
        limited_offer: "Oferta Limitada",
        one_time_payment_1_year: "Pagamento Único / 1 Ano",
        proceed_to_payment: "Prosseguir para Pagamento",
        faq_title: "Perguntas Frequentes",
        faq_1_q: "Quanto tempo dura a membresia?",
        faq_1_a: "A membresia tem validade de 365 dias (1 ano) a partir do momento da ativação.",
        faq_2_q: "Serve para a pré-venda de shows na América Latina?",
        faq_2_a: "Sim, a ARMY Membership Global é o único requisito para acessar as pré-vendas oficiais de ingressos em qualquer parte do mundo.",
        faq_3_q: "Como recebo minha membresia?",
        faq_3_a_pre: "Uma vez realizado o pagamento de",
        faq_3_a_post: "processamos seu cadastro e você receberá as credenciais e confirmação diretamente no seu e-mail ou WhatsApp.",
        sticky_buy: "Comprar -",
        modal_total_amount: "Valor Total a Pagar",
        modal_select_card_instruct: "Selecione \"Pagar com Cartão\" para completar sua compra com segurança.",
        modal_terms_read_accept: "Li e aceito os",
        modal_terms_conditions: "Termos e Condições",
        modal_terms_and: "e a",
        modal_terms_privacy: "Política de Privacidade",
        modal_other_countries_pay: "Outros países podem pagar com cartão",
        modal_debit_credit_here: "de débito ou crédito VISA / Mastercard aqui",
        modal_pay_card_btn: "PAGAR COM CARTÃO AQUI",
        modal_pay_accepts_terms: "AO REALIZAR O PAGAMENTO, VOCÊ ACEITA OS TERMOS E CONDIÇÕES"
    }
};

export default function MembershipClient({ country = 'PE' }: { country?: string }) {
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [currency, setCurrency] = useState(PRICING[country] || PRICING.DEFAULT);
    const [content, setContent] = useState(country === 'BR' ? TEXTS.PT : TEXTS.ES);

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

                     if (detectedCountry === 'BR') {
                         setContent(TEXTS.PT);
                     } else {
                         setContent(TEXTS.ES);
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
            icon: <Ticket className="w-8 h-8 transition-colors text-primary group-hover:text-white" />,
            title: content.benefit_1_title,
            description: content.benefit_1_desc
        },
        {
            icon: <Music className="w-8 h-8 transition-colors text-primary group-hover:text-white" />,
            title: content.benefit_2_title,
            description: content.benefit_2_desc
        },
        {
            icon: <ShoppingBag className="w-8 h-8 transition-colors text-primary group-hover:text-white" />,
            title: content.benefit_3_title,
            description: content.benefit_3_desc
        },
        {
            icon: <Star className="w-8 h-8 transition-colors text-primary group-hover:text-white" />,
            title: content.benefit_4_title,
            description: content.benefit_4_desc
        },
        {
            icon: <Smartphone className="w-8 h-8 transition-colors text-primary group-hover:text-white" />,
            title: content.benefit_5_title,
            description: content.benefit_5_desc
        }
    ];

    const faqs = [
        {
            q: content.faq_1_q,
            a: content.faq_1_a
        },
        {
            q: content.faq_2_q,
            a: content.faq_2_a
        },
        {
            q: content.faq_3_q,
            a: `${content.faq_3_a_pre} ${currency.symbol} ${currency.price}, ${content.faq_3_a_post}`
        }
    ];

    return (
        <div className="min-h-screen pb-20 pt-16 bg-white">
            
            <TermsModal
                isOpen={isTermsOpen}
                onClose={() => setIsTermsOpen(false)}
                onAccept={handleTermsAccept}
                currency={currency}
                content={content}
            />

            {/* SECTION 1: HERO (CLEAN WHITE) */}
            <section className="relative w-full overflow-hidden flex flex-col items-center pt-16 pb-20 px-4 md:px-12 bg-white">
                <div className="relative z-20 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Text Content */}
                    <div className="order-1 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
                        
                        <div className="flex flex-col items-center lg:items-start gap-2">
                            <span className="text-sm font-bold tracking-[0.2em] text-slate-500 uppercase">
                                {content.assistance_service}
                            </span>

                            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-slate-900">
                                {content.title_top}<br />
                                <span className="text-primary">{content.title_middle}</span><br />
                                {content.title_bottom}
                            </h1>
                        </div>

                        <div className="flex flex-col gap-1 max-w-lg">
                            <p className="text-xl md:text-2xl text-slate-600 leading-snug">
                                {content.hero_subtitle_pre} <span className="bg-[#fcd34d] px-2 py-0.5 font-bold text-slate-900 mx-1 box-decoration-clone">{content.hero_highlight}</span>
                                {content.hero_subtitle_post}
                            </p>
                        </div>

                        <div className="w-full flex flex-col sm:flex-row items-center gap-6">
                            <button
                                onClick={handleBuyClick}
                                className="group bg-slate-900 text-white hover:bg-[#8A2BE2] transition-all text-xl font-black uppercase py-5 px-10 rounded-xl flex items-center justify-center gap-4 w-full sm:w-auto shadow-xl hover:shadow-2xl shadow-slate-900/20 hover:-translate-y-1"
                            >
                                <Ticket className="w-6 h-6" />
                                <span>{content.activate_membership_btn}</span>
                            </button>
                            
                            <div className="text-center sm:text-left flex flex-col justify-center leading-tight">
                                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">{content.price_label} {currency.symbol} {currency.price}</p>
                                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">{content.one_time_payment}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-green-500" />
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                {content.secure_payment}
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
                        {content.exclusive_benefits_title}
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
                            <h2 className="text-2xl font-bold uppercase mb-2 text-slate-900">{content.limited_offer}</h2>
                            <div className="text-6xl font-black text-primary mb-2">{currency.symbol} {currency.price}</div>
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">{content.one_time_payment_1_year}</span>

                            <button
                                onClick={handleBuyClick}
                                className="w-full bg-slate-900 text-white font-bold uppercase py-4 rounded-xl hover:bg-[#8A2BE2] transition-colors shadow-lg hover:shadow-xl mb-6"
                            >
                                {content.proceed_to_payment}
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
                    <h2 className="text-3xl font-black uppercase text-slate-900">{content.faq_title}</h2>
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
                    {content.sticky_buy} {currency.symbol} {currency.price}
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
