"use client";

import { useState } from "react";
import { CommunityModal } from "@/components/CommunityModal";
import { ArrowRight, MessageCircle } from "lucide-react";

export function HomeCommunityBanner() {
    const [isCommunityOpen, setIsCommunityOpen] = useState(false);

    return (
        <section className="container mx-auto px-4 py-20">
            <div
                onClick={() => setIsCommunityOpen(true)}
                className="relative glass-card overflow-hidden cursor-pointer group rounded-2xl border-green-500/20 hover:border-green-500/50 transition-all hover:shadow-[0_0_40px_rgba(37,211,102,0.2)]"
            >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-primary/10 opacity-50" />

                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.4)] group-hover:scale-110 transition-transform duration-300">
                            <MessageCircle className="w-8 h-8 text-white fill-current" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-4xl font-black uppercase text-white mb-2 leading-none">
                                Grupos de <span className="text-green-400">WhatsApp</span>
                            </h2>
                            <p className="text-white/50 max-w-xl">
                                Unete a los grupos exclusivos. Coordina y vive la experiencia con fans de tu pais.
                            </p>
                        </div>
                    </div>

                    <div className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-green-400 transition-colors flex items-center gap-2 group-hover:scale-105 transform duration-200">
                        Unirme <ArrowRight className="w-5 h-5" />
                    </div>
                </div>
            </div>

            <CommunityModal isOpen={isCommunityOpen} onClose={() => setIsCommunityOpen(false)} />
        </section>
    );
}
