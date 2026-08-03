"use client";

import { useState, useEffect, useRef } from "react";
import { CountryData } from "@/lib/data/countries";
import { getServiceFeePerTicket } from "@/lib/pricing";
import { Calendar, MapPin, Ticket, Minus, Plus, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CommunityModal } from "@/components/CommunityModal";
import { MembershipModal } from "@/components/MembershipModal";
import { SoldOutModal } from "@/components/SoldOutModal";
import PhaseProgress from "@/components/PhaseProgress";
import { useCart } from "@/context/CartContext";
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
    'peru': { fee: 399, reservation: 0 },
    'chile': { fee: 79000, reservation: 0 },
    'mexico': { fee: 660, reservation: 660 }, // ~110 PEN
    'colombia': { fee: 121000, reservation: 121000 }, // ~110 PEN
    'argentina': { fee: 150000, reservation: 0 },
    'brasil': { fee: 200, reservation: 200 }, // ~110 PEN
};

// Cash-purchase service fees now live in lib/pricing.ts (SERVICE_FEE_PER_TICKET),
// which is the single source of truth shared with the JSON-LD Offer.price
// generator in app/[country]/page.tsx. Keep the installment-only interest
// figures here since they only apply when paying in installments.
const PERU_INSTALLMENT_INTEREST = 399;
const CHILE_INSTALLMENT_INTEREST = 50;
const ARGENTINA_INSTALLMENT_INTEREST = 50;
const COLOMBIA_INSTALLMENT_INTEREST = 50;

const getLocale = (countryId: string) => {
    // D3: Brasil prices are in USD — use en-US for decimal formatting
    if (countryId === 'brasil') return 'en-US';
    if (countryId === 'mexico') return 'es-MX';
    if (countryId === 'colombia') return 'es-CO';
    if (countryId === 'madrid') return 'es-ES';
    if (countryId === 'chile') return 'es-CL';
    if (countryId === 'argentina') return 'es-AR';
    return 'es-ES';
};

const translations = {
    es: {
        worldTour: "Gira Mundial",
        liveFrom: "En Vivo desde",
        buyTickets: "Comprar entradas",
        selectDate: "Selecciona una Fecha",
        tickets: "Entradas",
        nextEvent: "Próximo Evento",
        place: "Lugar",
        days: "Días",
        hrs: "Hrs",
        min: "Min",
        seg: "Seg",
        cash: "Al contado",
        installments: "En cuotas",
        ticketDisclaimer: "Nota: Estos precios ya son reales por zona y al total se añade la comisión de servicio por entrada.",
        selectDateStep: "1. Selecciona la Fecha",
        chooseInstallments: "2. Elige tus cuotas",
        initialReservation: "Reserva inicial de",
        perTicket: "por entrada (incluye fee)",
        verified: "Verificado",
        bestSeller: "Best Seller",
        fee: "Fee",
        mapStage: "",
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
        verification: "Adquisición Oficial:",
        verificationDesc: "Nuestro equipo de gestores realiza las compras únicamente a través de las ticketeras y plataformas oficiales del evento, garantizando la legitimidad del acceso.",
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
        historyDesc5: "Al asegurar tu gestión de compra a través de plataformas de Personal Shopper como RaveHub, delegas el estrés de las filas virtuales y aseguras que expertos intenten conseguir tu lugar con total transparencia.",
        toPayToday: "A Pagar HOY",
        totalToPay: "Total a Pagar",
        installmentsOf: "cuotas de",
        checkout: "Comprar entradas ahora",
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
        buyTickets: "Comprar ingressos agora",
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
        ticketDisclaimer: "Nota: Estes preços estão em dólares americanos (USD) e são reais por setor. A comissão de serviço por ingresso é adicionada no total.",
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
        verification: "Aquisição Oficial:",
        verificationDesc: "Nossa equipe de gestores realiza as compras unicamente através das bilheterias e plataformas oficiais do evento, garantindo a legitimidade do acesso.",
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
        historyDesc5: "Ao garantir sua gestão de compra através de plataformas de Personal Shopper como a RaveHub, você delega o estresse das filas virtuais e garante que especialistas tentem conseguir seu lugar com total transparência.",
        toPayToday: "A Pagar HOJE",
        totalToPay: "Total a Pagar",
        installmentsOf: "parcelas de",
        checkout: "Comprar ingressos agora",
        faqTitle: "Perguntas Frequentes sobre o Show",
        q1: "Quando começam as vendas dos ingressos?",
        a1: "As datas variam por país. Verifique a seção de cronograma acima para ver as datas específicas da Pré-venda Army, Pré-venda Geral e Venda Geral no seu país.",
        q2: "O que inclui o pacote VIP?",
        a2: "Os pacotes VIP geralmente incluem entrada antecipada, acesso à passagem de som, merch exclusivo e cordão comemorativo. Consulte os detalhes de cada setor na seleção de ingressos.",
        q3: "Como chegar ao Estádio?",
        a3: "O evento será realizado no {venue}. Recomendamos usar transporte público e chegar com antecedência para evitar congestionamentos."
    },
    co: {
        worldTour: "Gira Mundial",
        liveFrom: "En Vivo desde",
        buyTickets: "Comprar entradas",
        selectDate: "Selecciona una Fecha",
        tickets: "Boletas",
        nextEvent: "Próximo Evento",
        place: "Lugar",
        days: "Días",
        hrs: "Hrs",
        min: "Min",
        seg: "Seg",
        cash: "Contado",
        installments: "Cuotas",
        ticketDisclaimer: "Nota: Estos precios por zona son reales y se añade la comisión de servicio por boleta en el total.",
        selectDateStep: "1. Selecciona la Fecha",
        chooseInstallments: "2. Elige tus cuotas",
        initialReservation: "Reserva inicial de",
        perTicket: "por boleta (incluye fee)",
        verified: "Verificado",
        bestSeller: "Best Seller",
        fee: "Fee",
        mapStage: "",
        whatsappGroups: "Grupos de WhatsApp",
        joinCommunity: "Únete a la comunidad oficial y organiza tu viaje al concierto.",
        joinNow: "Unirme Ahora",
        verifiedPartner: "Verified Partner",
        verifiedBy: "Verificado por RaveHub",
        guarantee: "Garantía de autenticidad del 100%. Soporte local en",
        salesStatus: "Status de Venta",
        live: "EN VIVO",
        paymentSchedule: "Cronograma de Pagos",
        today: "HOY (Reserva + Fee)",
        quota: "Cuota",
        finalTotal: "Total Final",
        secureProcessTitle: "¿Cómo es el proceso de compra segura con RaveHub?",
        secureProcessDesc: "En RaveHub, hemos simplificado la experiencia de usuario para eliminar fricciones y garantizar transparencia en cada clic. Nuestro proceso de \"Compra Segura\" se estructura en tres pasos blindados tecnológicamente para asegurar que cada fan tenga acceso legítimo a sus entradas.",
        whySecureTitle: "¿Por qué comprar aquí es seguro?",
        whySecureDesc: "La Garantía RaveHub es nuestro compromiso de 'Cero Riesgos'. Comprar aquí es seguro porque eliminamos la incertidumbre del mercado secundario.",
        verification: "Adquisición Oficial:",
        verificationDesc: "Nuestro equipo de gestores realiza las compras únicamente a través de las ticketeras oficiales del evento, garantizando la legitimidad de tu acceso.",
        fraudProtection: "Protección Anti-Fraude:",
        fraudProtectionDesc: "Nuestro sistema previene la duplicación y falsificación de boletas.",
        support: "Soporte 24/7:",
        supportDesc: "Dispones de un canal exclusivo para resolver cualquier incidencia con tus boletas.",
        transparency: "Transparencia:",
        transparencyDesc: "Precios finales, sin sorpresas ni comisiones ocultas.",
        historyTitle: "BTS en Colombia: El Regreso más esperado por el Army",
        historyDesc1: "La espera terminó. BTS regresa a Colombia en 2026, y esta vez el {venue} será el epicentro del Army. Un evento que marcará la historia musical del país.",
        historyDesc2: "La demanda es histórica. Por eso, encontrar dónde",
        historyDesc3: "comprar boletos para BTS en {city} de forma 100% segura",
        historyDesc4: "es la clave para proteger tu inversión y vivir este sueño.",
        historyDesc5: "Al usar un Personal Shopper como RaveHub, dejas que expertos gestionen la compra, asegurando tu lugar sin el estrés de las filas virtuales.",
        toPayToday: "A Pagar HOY",
        totalToPay: "Total a Pagar",
        installmentsOf: "cuotas de",
        checkout: "Comprar entradas ahora",
        faqTitle: "Preguntas Frecuentes sobre el Concierto en Bogotá",
        q1: "¿Cuándo salen a la venta las boletas?",
        a1: "Las fechas varían. Revisa el cronograma de venta más arriba para las fechas de Preventa Army y Venta General en Colombia.",
        q2: "¿Qué incluye el paquete VIP?",
        a2: "Los paquetes VIP suelen incluir entrada anticipada, acceso a soundcheck, y merch exclusivo. Consulta los detalles al seleccionar tu boleta.",
        q3: "¿Cómo llegar al Estadio El Campín?",
        a3: "El {venue} está en el corazón de Bogotá. Recomendamos usar TransMilenio o transporte público y llegar con suficiente tiempo."
    },
    es_ES: {
        worldTour: "Gira Mundial",
        liveFrom: "En Vivo desde",
        buyTickets: "Comprar entradas",
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
        ticketDisclaimer: "Nota: Estos precios por zona son reales y se añade la comisión de servicio por entrada en el total.",
        selectDateStep: "1. Selecciona la Fecha",
        chooseInstallments: "2. Elige tus cuotas",
        initialReservation: "Reserva inicial de",
        perTicket: "por entrada (incluye fee)",
        verified: "Verificado",
        bestSeller: "Best Seller",
        fee: "Fee",
        mapStage: "",
        whatsappGroups: "Grupos de WhatsApp",
        joinCommunity: "Únete a la comunidad oficial y organiza tu viaje al concierto.",
        joinNow: "Unirme Ahora",
        verifiedPartner: "Verified Partner",
        verifiedBy: "Verificado por RaveHub",
        guarantee: "Garantía de autenticidad del 100%. Soporte local en",
        salesStatus: "Estado de la Venta",
        live: "EN VIVO",
        paymentSchedule: "Cronograma de Pagos",
        today: "HOY (Reserva + Fee)",
        quota: "Cuota",
        finalTotal: "Total Final",
        secureProcessTitle: "¿Cómo funciona la compra segura con RaveHub?",
        secureProcessDesc: "En RaveHub, hemos optimizado el proceso para que sea intuitivo y transparente. Nuestra 'Compra Segura' te protege en cada paso para garantizar tu acceso al evento.",
        whySecureTitle: "¿Por qué es seguro comprar aquí?",
        whySecureDesc: "La Garantía RaveHub es nuestro compromiso de 'Cero Riesgos'. Comprar aquí es seguro porque eliminamos la incertidumbre del mercado de reventa.",
        verification: "Adquisición Oficial:",
        verificationDesc: "Nuestro equipo de gestores compra las entradas únicamente a través de las ticketeras oficiales, garantizando su legitimidad.",
        fraudProtection: "Protección Antifraude:",
        fraudProtectionDesc: "Nuestro sistema previene la duplicación y falsificación de entradas.",
        support: "Soporte 24/7:",
        supportDesc: "Dispones de un canal exclusivo para resolver cualquier incidencia con tus entradas.",
        transparency: "Transparencia:",
        transparencyDesc: "Precios finales, sin sorpresas ni comisiones ocultas.",
        historyTitle: "BTS en Madrid: Una Cita Histórica en el Metropolitano",
        historyDesc1: "La espera ha terminado. BTS llega a Madrid en 2026 para un evento que quedará en la memoria del Army español. El {venue} vibrará como nunca.",
        historyDesc2: "La demanda es masiva. Por ello, encontrar dónde",
        historyDesc3: "comprar entradas para BTS en {city} de forma 100% segura",
        historyDesc4: "es fundamental para proteger tu inversión y tu sueño.",
        historyDesc5: "Al confiar en un Personal Shopper como RaveHub, dejas que expertos se encarguen de la compra, asegurando tu sitio con total transparencia y sin estrés.",
        toPayToday: "A Pagar HOY",
        totalToPay: "Total a Pagar",
        installmentsOf: "cuotas de",
        checkout: "Comprar entradas ahora",
        faqTitle: "Preguntas Frecuentes sobre el Concierto en Madrid",
        q1: "¿Cuándo salen a la venta las entradas?",
        a1: "Las fechas de venta varían. Consulta el cronograma oficial más arriba para ver las fechas de Preventa Army y Venta General en España.",
        q2: "¿Qué incluye el paquete VIP?",
        a2: "Los paquetes VIP suelen ofrecer acceso prioritario, soundcheck, merchandising exclusivo y acreditación conmemorativa. Revisa los detalles de cada zona al comprar.",
        q3: "¿Cómo llegar al Estadio Metropolitano?",
        a3: "El {venue} tiene excelente conexión. Recomendamos usar la Línea 7 de Metro (estación 'Estadio Metropolitano') y llegar con antelación."
    },
    mx: {
        worldTour: "Gira Mundial",
        liveFrom: "En Vivo desde",
        buyTickets: "Comprar entradas",
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
        ticketDisclaimer: "Nota: Estos precios por zona son reales y se añade la comisión de servicio por boleto en el total.",
        selectDateStep: "1. Selecciona la Fecha",
        chooseInstallments: "2. Elige tus cuotas",
        initialReservation: "Reserva inicial de",
        perTicket: "por boleto (incluye fee)",
        verified: "Verificado",
        bestSeller: "Best Seller",
        fee: "Fee",
        mapStage: "",
        whatsappGroups: "Grupos de WhatsApp",
        joinCommunity: "Únete a la comunidad oficial y organiza tu viaje al concierto.",
        joinNow: "Unirme Ahora",
        verifiedPartner: "Verified Partner",
        verifiedBy: "Verificado por RaveHub",
        guarantee: "Garantía de autenticidad del 100%. Soporte local en",
        salesStatus: "Status de Venta",
        live: "EN VIVO",
        paymentSchedule: "Cronograma de Pagos",
        today: "HOY (Reserva + Fee)",
        quota: "Cuota",
        finalTotal: "Total Final",
        secureProcessTitle: "¿Cómo es el proceso de compra segura con RaveHub?",
        secureProcessDesc: "En RaveHub, hemos simplificado la experiencia de usuario para eliminar fricciones y garantizar transparencia en cada clic. Nuestro proceso de \"Compra Segura\" se estructura en tres pasos blindados tecnológicamente para asegurar que cada fan tenga acceso legítimo a sus entradas.",
        whySecureTitle: "¿Por qué comprar aquí es seguro?",
        whySecureDesc: "La Garantía RaveHub es nuestro compromiso de 'Cero Riesgos'. Comprar aquí es seguro porque eliminamos la incertidumbre del mercado secundario.",
        verification: "Adquisición Oficial:",
        verificationDesc: "Nuestro equipo de gestores realiza las compras únicamente a través de las ticketeras oficiales del evento, garantizando la legitimidad de tu acceso.",
        fraudProtection: "Protección Anti-Fraude:",
        fraudProtectionDesc: "Nuestro sistema previene la duplicación y falsificación de boletas.",
        support: "Soporte 24/7:",
        supportDesc: "Dispones de un canal exclusivo para resolver cualquier incidencia con tus boletas.",
        transparency: "Transparencia:",
        transparencyDesc: "Precios finales, sin sorpresas ni comisiones ocultas.",
        historyTitle: "Historia de BTS en {country}: Un Hito Histórico para el Army",
        historyDesc1: "La relación entre BTS y {country} es una historia de espera que finalmente se materializa en 2026. A diferencia de visitas anteriores a la región, esta llegada oficial al {venue} marca el evento cultural más importante de la década.",
        historyDesc2: "La demanda acumulada ha generado una expectativa sin precedentes. Por ello, encontrar dónde",
        historyDesc3: "comprar boletos para BTS en {city} de forma 100% segura",
        historyDesc4: "es la prioridad absoluta para proteger tu inversión y tu sueño.",
        historyDesc5: "Al asegurar tu gestión de compra a través de plataformas de Personal Shopper como RaveHub, delegas el estrés de las filas virtuales y aseguras que expertos intenten conseguir tu lugar con total transparencia.",
        toPayToday: "A Pagar HOY",
        totalToPay: "Total a Pagar",
        installmentsOf: "cuotas de",
        checkout: "Comprar entradas ahora",
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
    const router = useRouter();
    const { addItem, removeItem, updateItem, items: cartItems } = useCart();
    const [isMapExpanded, setIsMapExpanded] = useState(false);
    const [mounted, setMounted] = useState(false);
    const lang = country.id === 'brasil' ? 'pt' : (country.id === 'mexico' ? 'mx' : (country.id === 'colombia' ? 'co' : (country.id === 'madrid' ? 'es_ES' : 'es')));
    const t = translations[lang] || translations.es;
    const isPeru = country.id === 'peru';
    const isChile = country.id === 'chile';
    const isArgentina = country.id === 'argentina';
    const isColombia = country.id === 'colombia';
    const isAndesFlow = isPeru || isChile || isArgentina;

    // Detectar si el evento ya finalizó (fecha del último show ya pasó)
    const lastEventDate = new Date(country.dates[country.dates.length - 1] + "T23:59:59");
    const isEventFinished = mounted && new Date() > lastEventDate;

    const formatDateRange = (dates: string[]) => {
        if (!dates.length) return '';
        const parseDate = (d: string) => new Date(d + "T12:00:00");
        const locale = lang === 'pt' ? 'pt-BR' : (lang === 'es_ES' ? 'es-ES' : 'es-LA');

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
    const [isSoldOutModalOpen, setIsSoldOutModalOpen] = useState(false);
    const [installmentMonths, setInstallmentMonths] = useState(3);
    const [videoLoaded, setVideoLoaded] = useState(false);

    // Currency conversion for Chile, Colombia, Argentina
    const EXCHANGE_RATES: Record<string, number> = {
        chile: 886.36,
        colombia: 3619.91,
        argentina: 1367.51,
    };
    const [showLocalCurrency, setShowLocalCurrency] = useState(true);
    const showCurrencyToggle = isChile || isColombia || isArgentina;

    const formatPrice = (price: number, showLocal: boolean) => {
        if (!showLocal || !EXCHANGE_RATES[country.id]) {
            return { main: `${country.currency === 'USD' ? '$' : ''}${price.toLocaleString('es-ES')}`, sub: null };
        }
        const localPrice = Math.round(price * EXCHANGE_RATES[country.id]);
        const locale = country.id === 'chile' ? 'es-CL' : country.id === 'colombia' ? 'es-CO' : 'es-AR';
        const currency = country.id === 'chile' ? 'CLP' : country.id === 'colombia' ? 'COP' : 'ARS';
        return {
            main: new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(localPrice),
            sub: `Ref: USD $${price.toLocaleString('es-ES')}`
        };
    };

    // Initial tick to avoid hydration mismatch
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    // Chile date availability: only Oct 17 is available, 14 and 16 are sold out
    const CHILE_DATE_AVAILABILITY: Record<string, boolean> = {
        '2026-10-14': false,
        '2026-10-16': false,
        '2026-10-17': true,
    };
    const isDateAvailable = (date: string) => {
        if (country.id === 'chile') return CHILE_DATE_AVAILABILITY[date] ?? true;
        return true;
    };
    const firstAvailableDate = country.dates.find(d => isDateAvailable(d)) || country.dates[0];
    const [selectedDate, setSelectedDate] = useState<string | null>(firstAvailableDate || null);
    const [stockMessage, setStockMessage] = useState('');

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
    const rawConfig = INSTALLMENT_CONFIG[country.id] || { fee: 100, reservation: 0 };
    const config = { ...rawConfig };

    const updateQuantity = (zone: string, delta: number, maxStock?: number) => {
        setQuantities(prev => {
            const current = prev[zone] || 0;
            const next = Math.max(0, current + delta);
            const cap = maxStock ?? Infinity;
            if (delta > 0 && next > cap) {
                setStockMessage('Solo hay 1 ticket disponible para Cancha Andes');
                setTimeout(() => setStockMessage(''), 3000);
                return prev;
            }
            return { ...prev, [zone]: Math.min(next, cap) };
        });
    };

    const getPrice = (basePrice: number) => {
        if (!isInstallment) return basePrice;
        if (isPeru) return basePrice; // No se aplica fee adicional por cuotas en Perú
        if (isChile) return basePrice + CHILE_INSTALLMENT_INTEREST;
        if (isArgentina) return basePrice + ARGENTINA_INSTALLMENT_INTEREST;
        if (isColombia) return basePrice + COLOMBIA_INSTALLMENT_INTEREST;
        return basePrice + config.fee;
    };
    const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0);

    const calculateTotal = () => {
        let total = 0;
        country.prices.forEach(z => {
            const count = quantities[z.zone] || 0;
            total += getPrice(z.price) * count;
        });
        return total;
    };

    const baseAmount = country.prices.reduce((sum, zone) => sum + ((quantities[zone.zone] || 0) * zone.price), 0);
    // C2/4.2: service fee per ticket comes from the same table used to build
    // Offer.price in JSON-LD, so the visible total and the structured data
    // never diverge.
    const serviceFeeAmount = totalTickets * getServiceFeePerTicket(country.id);

    const perTicketInstallFee = isInstallment
        ? (isPeru ? 0 : (isChile ? CHILE_INSTALLMENT_INTEREST : (isArgentina ? ARGENTINA_INSTALLMENT_INTEREST : (isColombia ? COLOMBIA_INSTALLMENT_INTEREST : config.fee))))
        : 0;

    const installmentInterestAmount = totalTickets * perTicketInstallFee;
    const totalAmount = calculateTotal() + serviceFeeAmount;
    const monthlyPayment = isInstallment && installmentMonths > 0
        ? totalAmount / installmentMonths
        : 0;

    // Reserva (1ª cuota) — la primera cuota absorbe el resto si hay redondeos
    const reservationAmount = isInstallment && installmentMonths > 0
        ? (() => {
            const m = Math.max(1, installmentMonths);
            const base = Math.floor(totalAmount / m);
            const remainder = totalAmount - base * m;
            return Math.round(base + remainder);
        })()
        : totalAmount;

    // Previene doble envío por doble clic
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const addingRef = useRef(false);

    const handleCheckout = () => {
        if (addingRef.current) return;
        addingRef.current = true;
        setIsAddingToCart(true);

        if (!selectedDate || totalTickets === 0) {
            addingRef.current = false;
            setIsAddingToCart(false);
            return;
        }

        // Add all selected tickets to cart (same flow for all countries)
        const addedSlugs: string[] = [];
        country.prices.forEach((zone) => {
            const quantity = quantities[zone.zone] || 0;
            if (quantity <= 0) {
                return;
            }

            const slug = `ticket-${country.id}-${zone.zone}-${isInstallment ? `cuotas-${installmentMonths}` : 'contado'}`;
            // record slug once per zone
            addedSlugs.push(slug);

            const countryImage = country.id === 'peru' 
                ? 'https://firebasestorage.googleapis.com/v0/b/event-ticket-website-6b541.firebasestorage.app/o/events%2Fstage-maps%2F1775537017513_wawzy.jpg?alt=media&token=09428b15-4857-4b81-b46e-f5f658ac9ecf' 
                : country.id === 'chile' 
                    ? 'https://res.cloudinary.com/dz1qivt7m/image/upload/v1775645342/mapa_chile_taxr0b.jpg' 
                    : country.id === 'argentina' 
                        ? 'https://res.cloudinary.com/dz1qivt7m/image/upload/v1775645587/mapa_argentina_a7ogen.jpg' 
                        : country.id === 'colombia' 
                            ? 'https://res.cloudinary.com/dz1qivt7m/image/upload/v1775645807/mapa_colombia_qtwzow.jpg'
                            : country.id === 'mexico' 
                                ? '/images/mapa-mexico.png' 
                                : country.id === 'madrid' 
                                    ? '/images/bts-madrid-mapa.png' 
                                    : '/images/stadium-map.png';

            for (let i = 0; i < quantity; i += 1) {
                addItem({
                    slug,
                    name: `${zone.zone} • BTS ${country.name}`,
                    price: zone.price,
                    image: countryImage,
                    type: 'ticket',
                    zone: zone.zone,
                    countryId: country.id,
                    currency: country.currency,
                    currencySymbol: country.currencySymbol,
                    serviceFeePerTicket: getServiceFeePerTicket(country.id),
                    installmentInterestPerTicket: perTicketInstallFee,
                    isInstallment,
                    installmentMonths: isInstallment ? installmentMonths : undefined,
                });
            }
        });

        if (isInstallment && addedSlugs.length > 0) {
            const createPaymentSchedule = (total: number, months: number) => {
                const now = new Date();
                const schedule: { date: string; amount: number }[] = [];
                const m = Math.max(0, months);

                if (m > 0) {
                    const base = Math.floor(total / m);
                    const remainder = total - base * m;

                    for (let i = 0; i < m; i += 1) {
                        const amount = base + (i === 0 ? remainder : 0);
                        const d = new Date(now);
                        d.setMonth(now.getMonth() + i);
                        schedule.push({ date: d.toISOString(), amount: Math.round(amount) });
                    }
                } else if (total > 0) {
                    schedule.push({ date: now.toISOString(), amount: Math.round(total) });
                }

                return schedule;
            };

            const schedule = createPaymentSchedule(Math.round(totalAmount), installmentMonths || 0);

            // Remove any existing payment-plan for this country to avoid stale plans
            cartItems.filter(i => i.type === 'payment-plan' && i.countryId === country.id).forEach(i => removeItem(i.slug));

            // Attach schedule to each added slug (one payment schedule per ticket line)
            addedSlugs.forEach(s => updateItem(s, {
                paymentSchedule: schedule,
                isInstallment: true,
                installmentMonths: installmentMonths,
            }));
        }

        router.push('/tienda/cart');
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden">

            {/* H1: sr-only breadcrumb nav (H1 accessible text) */}
            <nav aria-label="breadcrumb" className="sr-only">
                <ol>
                    <li><a href="/">{country.id === 'brasil' ? 'Início' : 'Inicio'}</a></li>
                    <li aria-current="page">
                        {country.id === 'brasil'
                            ? `Ingressos BTS ${country.name} 2026`
                            : `${country.id === 'mexico' ? 'Boletos' : country.id === 'colombia' ? 'Boletas' : 'Entradas'} BTS ${country.id === 'madrid' ? 'Madrid' : country.name} 2026`}
                    </li>
                </ol>
            </nav>

                        {/* MARQUEE HEADER - Country Specific */}
            <div className="fixed top-20 left-0 w-full bg-slate-900 text-white z-40 border-b border-primary/20 overflow-hidden py-3 shadow-md">
                {/* I8: will-change-transform for composited animation */}
                <div className="flex whitespace-nowrap animate-marquee will-change-transform">
                    {country.dates.map((date, idx) => {
                        const dateStr = mounted ? new Date(date + "T12:00:00").toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'es-ES', { weekday: 'short', day: 'numeric', month: 'short' }) : '';
                        return (
                            <span key={date} className="text-sm font-bold uppercase tracking-[0.2em] mx-8 flex items-center gap-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                {t.worldTour} 2026
                                <span className="text-slate-500">|</span>
                                {country.city}, {country.venue}
                                <span className="text-slate-500">|</span>
                                {dateStr}
                                <span className="text-slate-500">|</span>
                                {t.buyTickets}
                            </span>
                        );
                    })}
                </div>
            </div>

            {/* HERO SECTION - Split Layout */}
            <section className="relative h-[100svh] min-h-[650px] max-h-[850px] pt-32 overflow-hidden bg-black">
                {/* Background Video & Image */}
                <div className="absolute inset-0 w-full h-full z-0">
                        {/* I1: fetchPriority on hero image */}
                    {/* Placeholder Image */}
                    <Image
                        src="https://images.prestigeonline.com/wp-content/uploads/sites/6/2022/08/09215459/BTS-members-1600x900.jpg"
                        alt={`Integrantes de BTS actuando en vivo en ${country.venue}, ${country.name}`}
                        fill
                        className={`object-cover object-[center_20%] transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
                        priority
                        sizes="100vw"
                        fetchPriority="high"
                    />

                    {/* Background Video — I7: preload="none" to avoid blocking LCP */}
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="none"
                        poster="https://images.prestigeonline.com/wp-content/uploads/sites/6/2022/08/09215459/BTS-members-1600x900.jpg"
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

                        {/* Title — B4: sr-only with full keyword text per country */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight leading-[0.9]">
                            <span className="sr-only">
                                {country.id === 'brasil'
                                    ? `Ingressos BTS Brasil 2026 - ARIRANG World Tour no Estádio do MorumBIS, São Paulo`
                                    : country.id === 'peru'
                                        ? `Entradas BTS Perú 2026 - ARIRANG World Tour en Estadio San Marcos, Lima`
                                        : country.id === 'chile'
                                            ? `Entradas BTS Chile 2026 - ARIRANG World Tour en Estadio Nacional, Santiago`
                                            : country.id === 'mexico'
                                                ? `Boletos BTS México 2026 - ARIRANG World Tour en Estadio GNP Seguros, CDMX`
                                                : country.id === 'colombia'
                                                    ? `Boletas BTS Colombia 2026 - ARIRANG World Tour en Estadio El Campín, Bogotá`
                                                    : country.id === 'argentina'
                                                        ? `Entradas BTS Argentina 2026 - ARIRANG World Tour en Estadio Único La Plata`
                                                        : country.id === 'madrid'
                                                            ? `Entradas BTS Madrid 2026 - ARIRANG World Tour en Riyadh Air Metropolitano`
                                                            : `Entradas BTS ${country.name} 2026 - ARIRANG World Tour en ${country.venue}`}
                            </span>
                            BTS <span className="bg-gradient-to-r from-primary to-rose-400 bg-clip-text text-transparent">{country.id === 'madrid' ? 'Madrid' : country.name}</span>
                            <span className="block text-lg sm:text-xl md:text-2xl font-bold text-white/80 mt-2 tracking-normal normal-case">ARIRANG World Tour 2026 · {country.venue}</span>
                        </h1>

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

                            {isEventFinished ? (
                                <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-700 text-white px-6 py-3 rounded-xl">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                                        <span className="text-base font-bold uppercase tracking-wider text-slate-400">
                                            {country.id === 'brasil' ? 'Evento Finalizado' : 'Evento Finalizado'}
                                        </span>
                                    </div>
                                </div>
                            ) : (
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
                            )}
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-5"
                        >
                            {isEventFinished ? (
                                <div className="inline-flex items-center gap-3 bg-slate-800 text-slate-400 font-bold uppercase tracking-wider text-base px-8 py-4 rounded-2xl cursor-not-allowed opacity-60">
                                    <Ticket className="w-6 h-6" />
                                    {country.id === 'brasil' ? 'Evento Encerrado' : 'Evento Pasado'}
                                </div>
                            ) : (
                                <a
                                    href="#tickets"
                                    className="group inline-flex items-center gap-3 bg-red-700 hover:bg-red-800 text-white font-bold uppercase tracking-wider text-base px-8 py-4 rounded-2xl transition-all duration-300 shadow-[0_0_30px_rgba(225,29,72,0.5)] hover:shadow-[0_0_50px_rgba(225,29,72,0.7)] hover:scale-[1.02]"
                                >
                                    <Ticket className="w-6 h-6" />
                                    {t.buyTickets}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            )}
                        </motion.div>

                        {/* SEO Text - Enriched with keyword variations */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-white/40 text-xs md:text-sm leading-relaxed mt-4 max-w-xl"
                        >
                            {country.id === 'brasil' ? (
                                <>
                                    BTS chega a {country.city} neste 2026. Prepare-se para fazer história no {country.venue} e garanta seus ingressos para o show mais esperado do {country.name}. Veja o mapa de setores e os preços oficiais a partir de {country.currencySymbol}{Math.min(...country.prices.map(p => p.price)).toLocaleString('pt-BR')}.
                                </>
                            ) : (
                                <>
                                    BTS llega a {country.city} este 2026. Prepárate para hacer historia en el {country.venue} y asegura tus entradas para el concierto más esperado de {country.name}. Conoce el mapa de zonas y los precios oficiales a partir de {country.currency === 'USD' && <span className="text-white/50">USD </span>}{country.currencySymbol}{Math.min(...country.prices.map(p => p.price)).toLocaleString("es-ES")}.
                                </>
                            )}
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* TICKETS SECTION - Redesigned */}
            <section id="tickets" className="py-16 container mx-auto px-4 md:px-8">
                
                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-black uppercase text-slate-900 tracking-tight mb-2">{t.tickets}</h2>
                    <p className="text-slate-500 text-sm">{t.ticketDisclaimer}</p>
                    {/* D3: Brasil USD notice */}
                    {country.id === 'brasil' && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4 max-w-2xl mx-auto">
                            <p className="text-sm font-bold text-blue-900">💵 Preços em Dólares Americanos (USD)</p>
                            <p className="text-xs text-blue-700">Todos os preços exibidos estão em dólares americanos (USD). O câmbio é de responsabilidade do comprador.</p>
                        </div>
                    )}
                </div>

                {/* Main Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* LEFT: Dates & Payment */}
                    <div className="lg:col-span-2 space-y-5">
                        
                        {/* Currency Toggle - Mejorado (for Chile, Colombia, Argentina) */}
                        {showCurrencyToggle && (
                            <div className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-slate-700">
                                        {!showLocalCurrency ? '🇺🇸' : isChile ? '🇨🇱' : isColombia ? '🇨🇴' : '🇦🇷'} Precios {!showLocalCurrency ? 'Dólares' : 'Pesos'}
                                    </span>
                                    <span className="text-xs text-slate-500" title="Precio referencial">(Ref)</span>
                                </div>
                                <div className="bg-white p-1 rounded-lg flex shadow-sm">
                                    <button 
                                        onClick={() => setShowLocalCurrency(false)}
                                        className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all flex items-center gap-1 ${!showLocalCurrency ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        <span>USD</span>
                                        <span className="text-xs opacity-60">$</span>
                                    </button>
                                    <button 
                                        onClick={() => setShowLocalCurrency(true)}
                                        className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all flex items-center gap-1 ${showLocalCurrency ? 'bg-primary text-white' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        <span>{isChile ? 'CLP' : isColombia ? 'COP' : 'ARS'}</span>
                                        <span className="text-xs opacity-60">{isChile ? '$' : isColombia ? '$' : '$'}</span>
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* PayPal Notification for Chile Cash Payment */}
                        {isChile && !isInstallment && (
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M7.163 21.073H0V7.529h7.163v13.544zm1.758-15.062c-.555-.596-1.365-.93-2.261-.93H2.505c-.896 0-1.706.334-2.261.93-.555.596-.863 1.42-.863 2.418v9.23c0 .999.308 1.822.863 2.418.555.596 1.365.93 2.261.93h6.409c.896 0 1.706-.334 2.261-.93.555-.596.863-1.42.863-2.418V9.33c0-.998-.308-1.821-.863-2.418zm9.035 5.26c-.457-.63-1.123-.98-2.058-.98-1.025 0-1.856.43-2.492 1.29V7.529h-2.442v13.544h2.442V14.035c0-.471.088-.836.263-1.094.175-.258.414-.387.716-.387.298 0 .53.122.693.364.164.243.245.605.245 1.085v6.726h2.442v-7.238c0-.934-.232-1.65-.694-2.148z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-blue-900">Pago Seguro con PayPal</p>
                                    <p className="text-xs text-blue-700">Al seleccionar pago al contado serás redirigido a PayPal para un pago más seguro.</p>
                                </div>
                            </div>
                        )}

                        {/* Payment Method Toggle */}
                        {(country.allowInstallments !== false) && (
                            <div className="bg-white rounded-xl p-1 flex border border-slate-200 shadow-sm max-w-md mx-auto lg:mx-0">
                                <button 
                                    onClick={() => setIsInstallment(false)} 
                                    className={`flex-1 py-2.5 px-5 text-sm font-bold uppercase rounded-lg transition-all ${!isInstallment ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}
                                >
                                    {t.cash}
                                </button>
                                <button 
                                    onClick={() => setIsInstallment(true)} 
                                    className={`flex-1 py-2.5 px-5 text-sm font-bold uppercase rounded-lg transition-all ${isInstallment ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}
                                >
                                    {t.installments}
                                </button>
                            </div>
                        )}

                        {/* Installment Months */}
                        {isInstallment && (
                            <div className="bg-slate-50 p-4 rounded-xl max-w-md mx-auto lg:mx-0">
                                {/* D2: Número de cuotas → Número de parcelas for Brasil */}
                                <p className="text-sm font-semibold text-slate-600 mb-3">
                                    {country.id === 'brasil' ? 'Número de parcelas:' : 'Número de cuotas:'}
                                </p>
                                <div className="flex gap-2">
                                    {[2, 3, 4].map(m => (
                                        <button
                                            key={m}
                                            onClick={() => setInstallmentMonths(m)}
                                            className={`flex-1 py-2 text-lg font-bold border-2 rounded-lg transition-all ${installmentMonths === m ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-600'}`}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Date Selection */}
                        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="w-5 h-5 text-primary" />
                                <span className="font-bold text-slate-900">{t.selectDateStep}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {country.dates.map((date) => {
                                    const d = new Date(date + "T12:00:00");
                                    const isSelected = selectedDate === date;
                                    const available = isDateAvailable(date);
                                    return (
                                        <button
                                            key={date}
                                            onClick={() => { 
  if (available) {
    setSelectedDate(date);
    localStorage.setItem("bts-fecha-seleccionada", date);
  }
}}
                                            disabled={!available}
                                            className={`py-3 px-2 border-2 rounded-lg flex flex-col items-center transition-all relative ${
                                                !available
                                                    ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed opacity-60'
                                                    : isSelected
                                                        ? 'border-primary bg-primary text-white'
                                                        : 'border-slate-100 text-slate-900 hover:border-primary/50'
                                            }`}
                                        >
                                            <span className="text-xl font-black">{d.getDate()}</span>
                                            <span className="text-xs font-semibold uppercase mt-0.5">{d.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'es-ES', { month: 'short' })}</span>
                                            {!available && (
                                                <span className="text-[9px] font-bold uppercase bg-red-100 text-red-600 px-1 py-0.5 rounded mt-1">
                                                    {/* D2: Agotado → Esgotado for Brasil */}
                                                    {country.id === 'brasil' ? 'Esgotado' : 'Agotado'}
                                                </span>
                                            )}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Price Zones */}
                        <div className="space-y-3">
                            {country.prices.map((zone, i) => {
                                const isCanchaAndes = zone.zone === 'Cancha Andes';
                                const isDisabled = zone.soldOut;
                                return (
                                <div key={zone.zone} className={`group relative ${isDisabled ? 'opacity-60' : ''}`} aria-disabled={isDisabled}>
                                    {/* Stock limit message for Cancha Andes */}
                                    {isCanchaAndes && stockMessage && (
                                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-lg whitespace-nowrap animate-pulse">
                                            {stockMessage}
                                        </div>
                                    )}
                                    <div className={`bg-white border-2 rounded-xl p-3 md:p-4 flex items-center justify-between gap-2 md:gap-4 transition-all overflow-hidden relative ${isDisabled ? 'border-slate-200' : 'border-slate-100 hover:border-primary/30 hover:shadow-md'}`}>
                                        
                                        {/* Zone Info */}
                                        <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-black ${isDisabled ? 'bg-slate-100 text-slate-300' : 'bg-slate-100 text-slate-400 group-hover:bg-primary group-hover:text-white'}`}>
                                                {i + 1}
                                            </div>
                                            <div>
                                                {/* J4: h4→h3 for zone names (heading hierarchy) */}
                                                <h3 className={`text-base font-bold uppercase ${isDisabled ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{zone.zone}</h3>
                                                {i === 0 && !isDisabled && (
                                                    <span className="text-xs font-bold uppercase bg-primary/10 text-primary px-1.5 py-0.5 rounded">{t.bestSeller}</span>
                                                )}
                                                {zone.soldOut && (
                                                    <span className="text-xs font-bold uppercase bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                                                        {/* D2: Agotado → Esgotado for Brasil */}
                                                        {country.id === 'brasil' ? 'Esgotado' : 'Agotado'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Price & Quantity */}
                                        <div className="flex items-center gap-2">
                                            <div className="text-right min-w-0">
                                                {(() => {
                                                    const formatted = formatPrice(getPrice(zone.price), showLocalCurrency);
                                                    return (
                                                        <>
                                                            <p className={`text-base md:text-lg font-black whitespace-nowrap ${isDisabled ? 'text-slate-400' : 'text-slate-900'}`}>
                                                                {formatted.main}
                                                            </p>
                                                            {formatted.sub && (
                                                                <span className="text-[9px] font-medium text-slate-400 block whitespace-nowrap">{formatted.sub}</span>
                                                            )}
                                                        </>
                                                    );
                                                })()}
                                            </div>
                                            <div className={`flex items-center bg-slate-50 rounded-lg ${isDisabled ? 'opacity-50' : ''}`}>
                                                {/* J1: aria-labels for quantity buttons */}
                                                <button
                                                    onClick={() => !isDisabled && selectedDate && updateQuantity(zone.zone, -1, zone.stock)}
                                                    disabled={isDisabled || !selectedDate}
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 text-slate-500"
                                                    aria-label={country.id === 'brasil' ? `Reduzir quantidade de ${zone.zone}` : `Reducir cantidad de ${zone.zone}`}
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-6 text-center font-bold text-sm">{quantities[zone.zone] || 0}</span>
                                                <button
                                                    onClick={() => !isDisabled && selectedDate && updateQuantity(zone.zone, 1, zone.stock)}
                                                    disabled={isDisabled || !selectedDate}
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 text-slate-500"
                                                    aria-label={country.id === 'brasil' ? `Aumentar quantidade de ${zone.zone}` : `Aumentar cantidad de ${zone.zone}`}
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>

                    {/* RIGHT: Map & Summary */}
                    <div className="space-y-5">
                        {/* Stadium Map */}
                        <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                            <div className={`relative ${['peru', 'chile', 'argentina', 'colombia'].includes(country.id) ? 'aspect-[16/10]' : 'aspect-square'}`} onClick={() => setIsMapExpanded(true)}>
                                {['peru', 'chile', 'argentina', 'colombia'].includes(country.id) ? (
                                    <img
                                        src={country.id === 'peru' ? 'https://firebasestorage.googleapis.com/v0/b/event-ticket-website-6b541.firebasestorage.app/o/events%2Fstage-maps%2F1775537017513_wawzy.jpg?alt=media&token=09428b15-4857-4b81-b46e-f5f658ac9ecf' : country.id === 'chile' ? 'https://res.cloudinary.com/dz1qivt7m/image/upload/v1775645342/mapa_chile_taxr0b.jpg' : country.id === 'argentina' ? 'https://res.cloudinary.com/dz1qivt7m/image/upload/v1775645587/mapa_argentina_a7ogen.jpg' : 'https://res.cloudinary.com/dz1qivt7m/image/upload/v1775645807/mapa_colombia_qtwzow.jpg'}
                                        alt={`Mapa de zonas ${country.venue}`}
                                        className="w-full h-full object-cover cursor-pointer"
                                        loading="lazy"
                                    />
                                ) : (
                                    <Image
                                        src={country.id === 'mexico' ? "/images/mapa-mexico.png" : country.id === 'madrid' ? "/images/bts-madrid-mapa.png" : "/images/stadium-map.png"}
                                        alt={`Mapa de zonas ${country.venue}`}
                                        fill
                                        className="object-contain p-4 cursor-pointer"
                                    />
                                )}
                            </div>
                            <div className="p-3 border-t border-slate-100 flex justify-between items-center">
                                {/* D2: Mapa de Zonas → Mapa de Setores for Brasil */}
                                <span className="font-bold text-slate-900 text-sm">
                                    {country.id === 'brasil' ? 'Mapa de Setores' : 'Mapa de Zonas'}
                                </span>
                                {/* J3: text-red-700 for better contrast (5.98:1 vs 4.70:1) */}
                                <span className="text-red-700 text-sm font-semibold">Ver →</span>
                            </div>
                        </div>

                        {/* WhatsApp */}
                        <div onClick={() => setIsCommunityOpen(true)} className="bg-slate-900 text-white p-5 rounded-xl cursor-pointer hover:-translate-y-1 transition-all">
                            <div className="flex items-center gap-2 mb-2">
                                <Image src="/images/whatsapp.svg" alt="WhatsApp" width={20} height={20} className="invert" />
                                <h4 className="text-base font-black uppercase">{t.whatsappGroups}</h4>
                            </div>
                            <p className="text-slate-400 text-sm mb-3">{t.joinCommunity}</p>
                            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase bg-white/10 px-3 py-1.5 rounded-lg">
                                {t.joinNow} <ArrowRight className="w-3 h-3" />
                            </span>
                        </div>

                        {/* Sales Status */}
                        <div className="bg-white border border-slate-200 p-4 rounded-xl">
                            <h4 className="text-xs font-bold uppercase text-slate-500 mb-3">{t.salesStatus}</h4>
                            <div className="space-y-2">
                                {isEventFinished ? (
                                    <div className="flex items-center justify-between opacity-60">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                                            <span className="text-sm font-bold text-slate-600">
                                                {country.id === 'brasil' ? 'Evento Encerrado' : 'Evento Finalizado'}
                                            </span>
                                        </div>
                                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">
                                            {country.id === 'brasil' ? 'Concluído' : 'Concluido'}
                                        </span>
                                    </div>
                                ) : country.id === 'madrid' ? (
                                    <>
                                        <div className="flex items-center justify-between opacity-50">
                                            <span className="text-sm text-slate-400 line-through">Preventa Army</span>
                                            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded">Agotado</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                <span className="text-sm font-bold">Venta General</span>
                                            </div>
                                            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">Activo</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            {/* D2: Venta General → Venda Geral for Brasil */}
                                            <span className="text-sm font-bold">
                                                {country.id === 'brasil' ? 'Venda Geral' : 'Venta General'}
                                            </span>
                                        </div>
                                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">
                                            {/* D2: Activo → Ativo for Brasil */}
                                            {country.id === 'brasil' ? 'Ativo' : 'Activo'}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="container mx-auto px-4 md:px-8 pb-16 pt-12 border-t border-slate-200">
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

            {/* H2: Internal linking to other country pages */}
            <section className="container mx-auto px-4 py-8 pb-32 border-t border-slate-100">
                <h3 className="text-lg font-bold mb-4 text-slate-700">
                    {country.id === 'brasil' ? 'Outros países da turnê:' : 'Otros países de la gira:'}
                </h3>
                <div className="flex flex-wrap gap-3">
                    {[
                        { id: 'peru', label: '🇵🇪 Perú' },
                        { id: 'chile', label: '🇨🇱 Chile' },
                        { id: 'mexico', label: '🇲🇽 México' },
                        { id: 'colombia', label: '🇨🇴 Colombia' },
                        { id: 'argentina', label: '🇦🇷 Argentina' },
                        { id: 'brasil', label: '🇧🇷 Brasil' },
                        { id: 'madrid', label: '🇪🇸 Madrid' },
                    ].filter(c => c.id !== country.id).map(c => (
                        <a
                            key={c.id}
                            href={`/${c.id}`}
                            className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-primary/50 hover:text-primary text-slate-700 text-sm font-medium px-4 py-2 rounded-xl transition-all"
                        >
                            {c.label}
                        </a>
                    ))}
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
                                                {country.currency === 'USD' && <span className="text-sm font-bold text-slate-400 align-top mr-0.5">USD</span>}
                                                {country.currencySymbol}{(isInstallment ? reservationAmount : totalAmount).toLocaleString(getLocale(country.id))}
                                            </p>
                                            {isInstallment && (
                                                <span className="text-xs font-bold text-primary mt-1">
                                                    + {installmentMonths} {t.installmentsOf} {country.currencySymbol}{Math.ceil(monthlyPayment).toLocaleString(getLocale(country.id))}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={isAddingToCart || isEventFinished}
                                    className="w-full md:w-auto bg-primary text-white hover:bg-red-600 px-10 py-4 text-lg font-black uppercase tracking-widest transition-all hover:-translate-y-1 shadow-xl shadow-primary/30 flex items-center justify-center gap-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isEventFinished 
                                        ? (country.id === 'brasil' ? 'Evento Encerrado' : 'Evento Pasado')
                                        : (isAndesFlow ? 'Agregar al carrito' : t.checkout)
                                    } 
                                    {!isEventFinished && <ArrowRight className="w-5 h-5" />}
                                </button>
                            </div>
                        </motion.div>
                    )
                }

            </AnimatePresence >

            <CommunityModal isOpen={isCommunityOpen} onClose={() => setIsCommunityOpen(false)} />
            <MembershipModal isOpen={isMembershipModalOpen} onClose={() => setIsMembershipModalOpen(false)} />
            <SoldOutModal isOpen={isSoldOutModalOpen} onClose={() => setIsSoldOutModalOpen(false)} />

            {/* MAP EXPANDED MODAL */}
            <AnimatePresence>
                {isMapExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                        onClick={() => setIsMapExpanded(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative max-w-5xl w-full max-h-[90vh] overflow-auto bg-white rounded-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsMapExpanded(false)}
                                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            {['peru', 'chile', 'argentina', 'colombia'].includes(country.id) ? (
                                <img
                                    src={
                                        country.id === 'peru'
                                            ? 'https://firebasestorage.googleapis.com/v0/b/event-ticket-website-6b541.firebasestorage.app/o/events%2Fstage-maps%2F1775537017513_wawzy.jpg?alt=media&token=09428b15-4857-4b81-b46e-f5f658ac9ecf'
                                            : country.id === 'chile'
                                            ? 'https://res.cloudinary.com/dz1qivt7m/image/upload/v1775645342/mapa_chile_taxr0b.jpg'
                                            : country.id === 'argentina'
                                            ? 'https://res.cloudinary.com/dz1qivt7m/image/upload/v1775645587/mapa_argentina_a7ogen.jpg'
                                            : 'https://res.cloudinary.com/dz1qivt7m/image/upload/v1775645807/mapa_colombia_qtwzow.jpg'
                                    }
                                    alt={`Mapa de zonas y precios ${country.venue}`}
                                    className="w-full h-auto"
                                />
                            ) : (
                                <div className="relative aspect-square w-full">
                                    <Image
                                        src={
                                            country.id === 'mexico' ? "/images/mapa-mexico.png" :
                                                country.id === 'madrid' ? "/images/bts-madrid-mapa.png" :
                                                    "/images/stadium-map.png"
                                        }
                                        alt={`Mapa de zonas y precios ${country.venue}`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div >
    );
}
