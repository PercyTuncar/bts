import React from "react";

export const Logo = ({ className = "" }: { className?: string }) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {/* Custom CSS Ticket Shape */}
            {/* Custom SVG Ticket Shape */}
            {/* Custom SVG Ticket Shape */}
            <div className="relative w-14 h-9 transform -rotate-12 hover:rotate-0 transition-transform duration-300 drop-shadow-sm group">
                <svg
                    viewBox="0 0 100 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-md"
                    style={{ overflow: 'visible' }}
                >
                    {/* Ticket Body */}
                    <path
                        d="M10 0H90C95.5228 0 100 4.47715 100 10V20C100 20 92 22 92 30C92 38 100 40 100 40V50C100 55.5228 95.5228 60 90 60H10C4.47715 60 0 55.5228 0 50V40C0 40 8 38 8 30C8 22 0 20 0 20V10C0 4.47715 4.47715 0 10 0Z"
                        fill="#A855F7"
                        stroke="#0f172a"
                        strokeWidth="3.5"
                        strokeLinejoin="round"
                    />
                    {/* Center White Circle */}
                    <circle cx="50" cy="30" r="14" fill="white" />
                </svg>

                {/* BTS Logo Image Centered in the white circle */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/f/ff/BTS_logo_%282017%29.png"
                        alt="BTS Logo"
                        className="w-4 h-4 object-contain brightness-0 opacity-100"
                    />
                </div>
            </div>
            <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tighter text-slate-900 font-sans">
                    BTS<span className="text-primary">TICKETS</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.4em] text-gray-400 font-bold">
                    Latin America
                </span>
            </div>
        </div >
    );
};
