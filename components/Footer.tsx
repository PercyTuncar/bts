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
        joinArmy: isBrazil ? "Junte-se ao" : "Unete al",
        stayConnected: isBrazil
            ? "Mantenha-se conectado. Junte-se aos nossos grupos oficiais de WhatsApp."
            : "Mantente conectado. Unete a nuestros grupos oficiales de WhatsApp.",
        whatsappGroups: "Grupos de WhatsApp",
        clickToView: isBrazil ? "Clique para ver" : "Click para ver",
        worldTour: "World Tour 2026",
        experience: "Experience the energy.",
        liveFrom: "Live from Latin America.",
        explore: isBrazil ? "Explorar" : "Explora",
        home: isBrazil ? "Inicio" : "Inicio",
        tourDates: "Tour Dates",
        merch: "Merch Oficial",
        news: isBrazil ? "Noticias" : "Noticias",
        support: isBrazil ? "Suporte" : "Soporte",
        help: isBrazil ? "Ajuda" : "Ayuda",
        terms: isBrazil ? "Termos" : "Terminos",
        privacy: isBrazil ? "Privacidade" : "Privacidad",
        contact: isBrazil ? "Contato" : "Contacto",
        follow: isBrazil ? "Siga-nos" : "Siguenos",
        disclaimer: isBrazil
            ? "Entradasbts.com e um servico independente operado pela Ravehub."
            : "Entradasbts.com es un servicio independiente operado por Ravehub."
    };

    return (
        <footer className="bg-black text-white border-t border-white/5 relative z-50">
            {/* WHATSAPP SECTION */}
            <div className="border-b border-white/5">
                <div className="container mx-auto px-4 md:px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="max-w-xl">
                        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                            {t.joinArmy} <span className="gradient-text">Army</span>
                        </h3>
                        <p className="text-white/50 text-lg leading-relaxed">
                            {t.stayConnected}
                        </p>
                    </div>

                    <div className="w-full md:w-auto flex-1 max-w-lg">
                        <button
                            onClick={() => setIsCommunityOpen(true)}
                            className="group cursor-pointer w-full glass-card p-6 rounded-2xl flex items-center justify-between hover:border-green-500/50 transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                    <MessageCircle className="w-6 h-6 fill-current" />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="font-bold text-lg text-white">{t.whatsappGroups}</span>
                                    <span className="text-xs text-green-500 uppercase tracking-wider">{t.clickToView}</span>
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:border-green-500 group-hover:text-green-500 transition-all">
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <CommunityModal isOpen={isCommunityOpen} onClose={() => setIsCommunityOpen(false)} />

            {/* MAIN LINKS */}
            <div className="container mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                    <div className="col-span-1 md:col-span-1 space-y-6">
                        <Link href="/" className="inline-block">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center -rotate-6 hover:rotate-0 transition-transform duration-300 shadow-glow">
                                <span className="font-black text-xl text-white">B</span>
                            </div>
                        </Link>
                        <p className="text-xs font-mono text-white/30 uppercase leading-relaxed">
                            {t.worldTour}<br />
                            {t.experience}<br />
                            {t.liveFrom}
                        </p>
                    </div>

                    {/* LINKS COLUMN 1 */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="font-bold uppercase tracking-widest text-sm mb-2 text-white/50">{t.explore}</h4>
                        <FooterLink href="/">{t.home}</FooterLink>
                        <FooterLink href="/eventos">{t.tourDates}</FooterLink>
                        <FooterLink href="/tienda">{t.merch}</FooterLink>
                        <FooterLink href="/blog">{t.news}</FooterLink>
                    </div>

                    {/* LINKS COLUMN 2 */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="font-bold uppercase tracking-widest text-sm mb-2 text-white/50">{t.support}</h4>
                        <FooterLink href="#" rel="nofollow">{t.help}</FooterLink>
                        <FooterLink href="/legal/terminos">{t.terms}</FooterLink>
                        <FooterLink href="/legal/privacidad">{t.privacy}</FooterLink>
                        <FooterLink href="#" rel="nofollow">{t.contact}</FooterLink>
                    </div>

                    {/* SOCIALS */}
                    <div className="flex flex-col space-y-6">
                        <h4 className="font-bold uppercase tracking-widest text-sm text-white/50">{t.follow}</h4>
                        <div className="flex gap-3">
                            <SocialIcon icon={<Instagram />} href="#" />
                            <SocialIcon icon={<Twitter />} href="#" />
                            <SocialIcon icon={<Youtube />} href="#" />
                            <SocialIcon icon={<Facebook />} href="#" />
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-white/5">
                <div className="container mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-[10px] font-mono text-white/30 uppercase text-center md:text-left">
                        <p>2026 EntradasBTS / Ravehub. All Rights Reserved.</p>
                        <p className="mt-1 text-white/20">{t.disclaimer}</p>
                    </div>
                    <div className="flex gap-6 text-[10px] font-mono text-white/30 uppercase">
                        <span className="text-primary">Made for ARMY</span>
                        <span>Seoul - Lima - Santiago - CDMX - Bogota</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterLink = ({ href, children, rel }: { href: string; children: React.ReactNode; rel?: string }) => (
    <Link href={href} rel={rel} className="text-white/40 hover:text-white hover:translate-x-2 transition-all font-medium text-sm flex items-center gap-2 group">
        <span className="w-1 h-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></span>
        {children}
    </Link>
);

const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
    <a href={href} className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:bg-primary hover:border-primary hover:text-white hover:-translate-y-1 transition-all duration-300">
        {icon}
    </a>
);
