"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, ArrowRight, MessageCircle } from "lucide-react";
import { useState } from "react";
import { CommunityModal } from "./CommunityModal";
import { usePathname } from "next/navigation";

export const Footer = () => {
    const [isCommunityOpen, setIsCommunityOpen] = useState(false);
    const pathname = usePathname();
    const isBrazil = pathname?.startsWith('/brasil');

    const t = {
        joinArmy: isBrazil ? "Junte-se ao" : "Únete al",
        stayConnected: isBrazil
            ? "Mantenha-se conectado. Junte-se aos nossos grupos oficiais de WhatsApp para receber notícias e alertas instantaneamente."
            : "Mantente conectado. Únete a nuestros grupos oficiales de WhatsApp para recibir noticias y alertas al instante.",
        whatsappGroups: "Grupos de WhatsApp", // Same in both or similar enough? Pt: Grupos de WhatsApp. Es: Grupos de WhatsApp. OK.
        clickToView: isBrazil ? "Clique para ver tudo" : "Click para ver todos",

        explore: isBrazil ? "Explorar" : "Explora",
        home: isBrazil ? "Início" : "Inicio",
        tourDates: "Tour Dates",
        merch: isBrazil ? "Merch Oficial" : "Merch Oficial", // Same
        news: isBrazil ? "Notícias" : "Noticias",
        support: isBrazil ? "Suporte" : "Soporte",
        help: isBrazil ? "Ajuda" : "Ayuda",
        terms: isBrazil ? "Termos" : "Términos",
        privacy: isBrazil ? "Privacidade" : "Privacidad",
        contact: isBrazil ? "Contato" : "Contacto",
        follow: isBrazil ? "Siga-nos" : "Síguenos",
        rights: isBrazil ? "Todos os direitos reservados." : "All Rights Reserved.", // Keeping English/Spanish mix as consistent with design?
        // Original was "All Rights Reserved." in English. Let's keep it English or localized? 
        // User asked for: "Junte-se ao Army", "Notícias", "Ajuda", "Termos", "Privacidade", "Contato".
        // Let's stick to what was asked + necessary context.
        disclaimer: isBrazil
            ? "Entradasbts.com é um serviço independente de gestão de compras operado pela Ravehub."
            : "Entradasbts.com es un servicio independiente de gestión de compras operado por Ravehub."
    };

    return (
        <footer className="bg-slate-50 text-slate-900 border-t border-slate-200 relative z-50">
            {/* WHATSAPP SECTION (Refactored to Light Mode/Red Accent) */}
            <div className="border-b border-slate-200 bg-white">
                <div className="container mx-auto px-4 md:px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="max-w-xl">
                        <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-slate-900">
                            {t.joinArmy} <span className="text-primary">Army</span>
                        </h3>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            {t.stayConnected}
                        </p>
                    </div>

                    <div className="w-full md:w-auto flex-1 max-w-lg">
                        <div
                            onClick={() => setIsCommunityOpen(true)}
                            className="group cursor-pointer relative"
                        >
                            <div className="absolute inset-0 bg-primary/20 translate-x-2 translate-y-2 rounded-2xl group-hover:translate-x-1 group-hover:translate-y-1 transition-transform"></div>
                            <div className="relative bg-white border-2 border-primary p-6 md:p-8 rounded-2xl z-10 flex items-center justify-between hover:-translate-y-1 hover:-translate-x-1 transition-transform duration-200 shadow-xl shadow-primary/10">
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                                        <MessageCircle className="w-8 h-8 fill-current" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-black uppercase text-xl leading-none mb-1 text-slate-900">{t.whatsappGroups}</span>
                                        <span className="text-xs font-bold text-primary uppercase tracking-widest">{t.clickToView}</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 border-2 border-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:border-primary group-hover:text-primary transition-colors bg-slate-50">
                                    <ArrowRight className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CommunityModal isOpen={isCommunityOpen} onClose={() => setIsCommunityOpen(false)} />

            {/* MAIN LINKS */}
            <div className="container mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                    <div className="col-span-1 md:col-span-1 space-y-6">
                        <Link href="/" className="inline-block">
                            <div className="w-16 h-16 bg-primary border-2 border-white flex items-center justify-center -rotate-6 hover:rotate-0 transition-transform duration-300 shadow-sm">
                                <span className="font-black text-2xl text-slate-900">B</span>
                            </div>
                        </Link>
                        <div className="text-[10px] font-mono text-gray-500 uppercase leading-relaxed">
                            <p className="mb-2">
                                <span className="font-bold text-slate-700">Aviso de Autonomía:</span> Operamos como una plataforma independiente de Personal Shopper para la adquisición de entradas y membresias, funcionando como una entidad ajena a las redes de ticketeras y organizadores oficiales.
                            </p>
                            <p>
                                Todo encargo aplica según nuestros <Link href="/legal/terminos" className="underline hover:text-slate-900 transition-colors font-bold">Términos y Condiciones</Link>. Léelos aquí.
                            </p>
                        </div>
                    </div>

                    {/* LINKS COLUMN 1 */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-secondary font-bold uppercase tracking-widest text-sm mb-2 text-slate-700">{t.explore}</h4>
                        <FooterLink href="/">{t.home}</FooterLink>
                        <FooterLink href="/eventos">{t.tourDates}</FooterLink>
                        <FooterLink href="/tienda">{t.merch}</FooterLink>
                        <FooterLink href="/blog">{t.news}</FooterLink>
                    </div>

                    {/* LINKS COLUMN 2 */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-secondary font-bold uppercase tracking-widest text-sm mb-2 text-slate-700">{t.support}</h4>
                        <FooterLink href="#" rel="nofollow">{t.help}</FooterLink>
                        <FooterLink href="/legal/terminos">{t.terms}</FooterLink>
                        <FooterLink href="/legal/privacidad">{t.privacy}</FooterLink>
                        <FooterLink href="#" rel="nofollow">{t.contact}</FooterLink>
                    </div>

                    {/* SOCIALS */}
                    <div className="flex flex-col space-y-6">
                        <h4 className="text-secondary font-bold uppercase tracking-widest text-sm text-slate-700">{t.follow}</h4>
                        <div className="flex gap-4">
                            <SocialIcon icon={<Instagram />} href="#" />
                            <SocialIcon icon={<Twitter />} href="#" />
                            <SocialIcon icon={<Youtube />} href="#" />
                            <SocialIcon icon={<Facebook />} href="#" />
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-slate-200 bg-white">
                <div className="container mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-[10px] font-mono text-gray-600 uppercase text-center md:text-left">
                        <p>© 2026 EntradasBTS / Ravehub. All Rights Reserved.</p>
                        <p className="mt-1 text-gray-700">{t.disclaimer}</p>
                    </div>
                    <div className="flex gap-6 text-[10px] font-mono text-gray-600 uppercase">
                        <span>Made for ARMY</span>
                        <span>Seoul • Lima • Santiago • CDMX • Bogotá</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterLink = ({ href, children, rel }: { href: string; children: React.ReactNode; rel?: string }) => (
    <Link href={href} rel={rel} className="text-slate-500 hover:text-slate-900 hover:translate-x-2 transition-all font-bold uppercase text-sm flex items-center gap-2 group">
        <span className="w-1 h-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
        {children}
    </Link>
);

const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
    <a href={href} className="w-12 h-12 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white hover:-translate-y-1 transition-all duration-300">
        {icon}
    </a>
);
