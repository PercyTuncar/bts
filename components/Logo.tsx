import React from "react";

export const Logo = ({ className = "" }: { className?: string }) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="w-10 h-10 bg-acid-pink border-2 border-white flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#000_2px,#000_4px)] opacity-20" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/ff/BTS_logo_%282017%29.png" alt="BTS Logo" className="w-5 h-5 object-contain relative z-10 brightness-0" />
            </div>
            <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tighter text-white font-sans">
                    BTS<span className="text-acid-yellow">TICKETS</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.4em] text-gray-400 font-bold">
                    Latin America
                </span>
            </div>
        </div >
    );
};
