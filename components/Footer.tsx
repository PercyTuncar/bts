import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, ArrowRight, Mail } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-black text-white border-t-2 border-white relative z-50">
            {/* NEWSLETTER SECTION */}
            <div className="border-b-2 border-white/20">
                <div className="container mx-auto px-4 md:px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="max-w-xl">
                        <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
                            Únete al <span className="text-acid-pink">Army</span>
                        </h3>
                        <p className="text-gray-400 font-mono text-sm md:text-base">
                            Recibe alertas de preventa, merch exclusivo y noticias del tour antes que nadie.
                        </p>
                    </div>

                    <div className="w-full md:w-auto flex-1 max-w-lg">
                        <div className="flex relative group">
                            <div className="absolute inset-0 bg-acid-pink translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                            <div className="relative flex w-full bg-black border-2 border-white p-1 z-10">
                                <div className="flex items-center pl-4 text-gray-400">
                                    <Mail size={20} />
                                </div>
                                <input
                                    type="email"
                                    placeholder="TU EMAIL AQUÍ..."
                                    className="w-full bg-transparent border-none text-white font-bold uppercase placeholder:text-gray-600 focus:outline-none focus:ring-0 px-4 py-3"
                                />
                                <button className="bg-white text-black font-black uppercase px-6 hover:bg-acid-yellow transition-colors flex items-center gap-2">
                                    <span className="hidden md:inline">Suscribirse</span>
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN LINKS */}
            <div className="container mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                    {/* BRAND */}
                    <div className="col-span-1 md:col-span-1 space-y-6">
                        <Link href="/" className="inline-block">
                            <div className="w-16 h-16 bg-acid-pink border-2 border-white flex items-center justify-center -rotate-6 hover:rotate-0 transition-transform duration-300">
                                <span className="font-black text-2xl text-black">B</span>
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
                        <h4 className="text-acid-yellow font-bold uppercase tracking-widest text-sm mb-2">Explora</h4>
                        <FooterLink href="/">Inicio</FooterLink>
                        <FooterLink href="/eventos">Tour Dates</FooterLink>
                        <FooterLink href="/tienda">Merch Oficial</FooterLink>
                        <FooterLink href="/blog">Noticias</FooterLink>
                    </div>

                    {/* LINKS COLUMN 2 */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-acid-yellow font-bold uppercase tracking-widest text-sm mb-2">Soporte</h4>
                        <FooterLink href="#" rel="nofollow">Ayuda</FooterLink>
                        <FooterLink href="/legal/terminos">Términos</FooterLink>
                        <FooterLink href="/legal/privacidad">Privacidad</FooterLink>
                        <FooterLink href="#" rel="nofollow">Contacto</FooterLink>
                    </div>

                    {/* SOCIALS */}
                    <div className="flex flex-col space-y-6">
                        <h4 className="text-acid-yellow font-bold uppercase tracking-widest text-sm">Síguenos</h4>
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
            <div className="border-t border-white/20 bg-[#050505]">
                <div className="container mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-[10px] font-mono text-gray-600 uppercase text-center md:text-left">
                        <p>© 2026 EntradasBTS / Ravehub. All Rights Reserved.</p>
                        <p className="mt-1 text-gray-700">Entradasbts.com es un distribuidor autorizado gestionado por Ravehub. </p>
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
    <Link href={href} rel={rel} className="text-gray-400 hover:text-white hover:translate-x-2 transition-all font-bold uppercase text-sm flex items-center gap-2 group">
        <span className="w-1 h-1 bg-acid-pink opacity-0 group-hover:opacity-100 transition-opacity"></span>
        {children}
    </Link>
);

const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
    <a href={href} className="w-12 h-12 border-2 border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-300">
        {icon}
    </a>
);
