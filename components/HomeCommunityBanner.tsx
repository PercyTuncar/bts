"use client";

import { useState } from "react";
import { CommunityModal } from "@/components/CommunityModal";
import { ArrowRight } from "lucide-react";

export function HomeCommunityBanner() {
    const [isCommunityOpen, setIsCommunityOpen] = useState(false);

    return (
        <section className="container mx-auto px-4 mb-24">
            <div
                onClick={() => setIsCommunityOpen(true)}
                className="relative bg-[#25D366] overflow-hidden cursor-pointer group border-2 border-white/20 hover:border-white transition-colors"
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg')] bg-repeat space" style={{ backgroundSize: '100px' }}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

                <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.5)] group-hover:scale-110 transition-transform duration-300">
                            <img src="/images/whatsapp.svg" alt="WhatsApp" className="w-12 h-12" />
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black uppercase italic text-white mb-2 leading-none relative z-10">
                                Grupos de <span className="relative inline-block px-2 ml-1">
                                    <span className="absolute inset-0 bg-black -skew-x-12"></span>
                                    <span className="relative z-10 text-[#25D366]">WhatsApp</span>
                                </span>
                            </h2>
                            <p className="text-lg md:text-xl text-gray-200 font-medium max-w-xl">
                                Únete a los grupos oficiales de WhatsApp. Coordina, comparte y vive la experiencia con fans de tu país.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white text-black px-8 py-4 text-xl font-black uppercase tracking-widest hover:bg-black hover:text-[#25D366] transition-colors flex items-center gap-3 shadow-[8px_8px_0px_black] group-hover:shadow-[4px_4px_0px_white] group-hover:translate-x-1 group-hover:translate-y-1 transform duration-200">
                        Unirme Ahora <ArrowRight className="w-6 h-6" />
                    </div>
                </div>
            </div>

            <CommunityModal isOpen={isCommunityOpen} onClose={() => setIsCommunityOpen(false)} />
        </section>
    );
}
