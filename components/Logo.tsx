import React from "react";

export const Logo = ({ className = "" }: { className?: string }) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {/* Custom SVG Ticket Shape with Purple Gradient */}
            <div className="relative w-10 h-6 transform -rotate-12 hover:rotate-0 transition-transform duration-300 group">
                <svg
                    viewBox="0 0 100 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                    style={{ overflow: 'visible' }}
                >
                    <defs>
                        <linearGradient id="ticketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#7C3AED" />
                            <stop offset="50%" stopColor="#9333EA" />
                            <stop offset="100%" stopColor="#A855F7" />
                        </linearGradient>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    {/* Ticket Body */}
                    <path
                        d="M10 0H90C95.5228 0 100 4.47715 100 10V20C100 20 92 22 92 30C92 38 100 40 100 40V50C100 55.5228 95.5228 60 90 60H10C4.47715 60 0 55.5228 0 50V40C0 40 8 38 8 30C8 22 0 20 0 20V10C0 4.47715 4.47715 0 10 0Z"
                        fill="url(#ticketGradient)"
                        filter="url(#glow)"
                    />
                    {/* Center Circle */}
                    <circle cx="50" cy="30" r="14" fill="black" />
                </svg>

                {/* BTS Logo Image */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/f/ff/BTS_logo_%282017%29.png"
                        alt="BTS Logo"
                        className="w-2.5 h-2.5 object-contain invert"
                    />
                </div>
            </div>
            <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tighter text-white font-sans">
                    BTS<span className="gradient-text">TICKETS</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-bold">
                    Latin America
                </span>
            </div>
        </div>
    );
};
