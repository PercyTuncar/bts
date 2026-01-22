"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, ArrowRight, MessageCircle } from "lucide-react";
import { useState } from "react";
import { CommunityModal } from "./CommunityModal";

export const Footer = () => {
    const [isCommunityOpen, setIsCommunityOpen] = useState(false);

    return (
        <footer className="bg-slate-50 text-slate-900 border-t border-slate-200 relative z-50">
            {/* WHATSAPP SECTION (Formerly Newsletter) */}
            <div className="border-b border-slate-200">
                <div className="container mx-auto px-4 md:px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="max-w-xl">
                        <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
                            Únete al <span className="text-primary">Army</span>
                        </h3>
                        <p className="text-slate-500 font-mono text-sm md:text-base">
                            Mantente conectado. Únete a nuestros grupos oficiales de WhatsApp para recibir noticias y alertas al instante.
                        </p>
                    </div>

                    <div className="w-full md:w-auto flex-1 max-w-lg">
                        <div
                            onClick={() => setIsCommunityOpen(true)}
                            className="group cursor-pointer relative"
                        >
                            <div className="absolute inset-0 bg-[#25D366] translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3 rounded-xl"></div>
                            <div className="relative bg-white border border-slate-200 p-4 md:p-6 rounded-xl z-10 flex items-center justify-between hover:-translate-y-1 hover:-translate-x-1 transition-transform duration-200">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
                                        <MessageCircle className="w-6 h-6" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-black uppercase text-lg leading-none mb-1">Grupos de WhatsApp</span>
                                        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Click para ver todos</span>
                                    </div>
                                </div>
                                <div className="w-10 h-10 border-2 border-slate-100 rounded-full flex items-center justify-center text-slate-300 group-hover:border-[#25D366] group-hover:text-[#25D366] transition-colors">
                                    <ArrowRight className="w-5 h-5" />
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
                        <p className="text-xs font-mono text-gray-500 uppercase leading-relaxed">
                            World Tour 2026<br />
                            Experience the energy.<br />
                            Live from Latin America.
                        </p>
                    </div>

                    {/* LINKS COLUMN 1 */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-secondary font-bold uppercase tracking-widest text-sm mb-2 text-slate-700">Explora</h4>
                        <FooterLink href="/">Inicio</FooterLink>
                        <FooterLink href="/eventos">Tour Dates</FooterLink>
                        <FooterLink href="/tienda">Merch Oficial</FooterLink>
                        <FooterLink href="/blog">Noticias</FooterLink>
                    </div>

                    {/* LINKS COLUMN 2 */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-secondary font-bold uppercase tracking-widest text-sm mb-2 text-slate-700">Soporte</h4>
                        <FooterLink href="#" rel="nofollow">Ayuda</FooterLink>
                        <FooterLink href="/legal/terminos">Términos</FooterLink>
                        <FooterLink href="/legal/privacidad">Privacidad</FooterLink>
                        <FooterLink href="#" rel="nofollow">Contacto</FooterLink>
                    </div>

                    {/* SOCIALS */}
                    <div className="flex flex-col space-y-6">
                        <h4 className="text-secondary font-bold uppercase tracking-widest text-sm text-slate-700">Síguenos</h4>
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
                        <p className="mt-1 text-gray-700">Entradasbts.com es un servicio independiente de gestión de compras operado por Ravehub. </p>
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
