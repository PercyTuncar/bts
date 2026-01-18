import React from "react";

export const Logo = ({ className = "" }: { className?: string }) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                <defs>
                    <linearGradient id="logo_gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#22d3ee" /> {/* Cyan */}
                        <stop offset="50%" stopColor="#a855f7" /> {/* Purple */}
                        <stop offset="100%" stopColor="#ec4899" /> {/* Pink */}
                    </linearGradient>
                </defs>
                {/* Abstract Ticket/B Shape */}
                <path d="M10 8C7.79086 8 6 9.79086 6 12V28C6 30.2091 7.79086 32 10 32H30C32.2091 32 34 30.2091 34 28V12C34 9.79086 32.2091 8 30 8H10ZM25 12L28 15V25L25 28L22 25V15L25 12ZM15 12L18 15V25L15 28L12 25V15L15 12Z"
                    fill="url(#logo_gradient)"
                    fillOpacity="0.8"
                />
                {/* Center play/action accent */}
                <path d="M18 16L24 20L18 24V16Z" fill="#fff" />
            </svg>
            <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tighter text-white">
                    BTS<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">TICKETS</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">
                    Official Tour
                </span>
            </div>
        </div>
    );
};
