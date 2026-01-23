"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface LightBoxImageProps {
    src: string;
    alt: string;
}

export const LightBoxImage = ({ src, alt }: LightBoxImageProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scale, setScale] = useState(1);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        setScale(1); // Reset zoom on close/open
    };

    const handleZoomIn = (e: React.MouseEvent) => {
        e.stopPropagation();
        setScale((prev) => Math.min(prev + 0.5, 3));
    };

    const handleZoomOut = (e: React.MouseEvent) => {
        e.stopPropagation();
        setScale((prev) => Math.max(prev - 0.5, 1));
    };

    return (
        <>
            {/* Thumbnail View */}
            <div
                className="group relative w-full bg-slate-100 border-b border-slate-200 cursor-zoom-in overflow-hidden"
                onClick={toggleOpen}
            >
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-auto object-contain max-h-[500px] mx-auto transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover Overlay Hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-black/75 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 backdrop-blur-md">
                        <Maximize2 className="w-4 h-4" />
                        Ver Mapa Completo
                    </span>
                </div>

                <div className="absolute bottom-4 left-4 text-slate-900 bg-white/90 px-2 py-1 rounded text-xs font-bold uppercase tracking-widest opacity-80 shadow-sm">
                    Fuente: Ticketmaster México
                </div>
            </div>

            {/* Fullscreen Lightbox */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center overflow-hidden"
                        onClick={toggleOpen}
                    >
                        {/* Toolbar */}
                        <div className="absolute top-4 right-4 flex items-center gap-4 z-50">
                            <div className="bg-slate-800/80 rounded-full p-2 flex items-center gap-2 border border-slate-700">
                                <button
                                    onClick={handleZoomOut}
                                    className="p-2 hover:bg-slate-700 rounded-full text-white transition-colors"
                                    title="Zoom Out"
                                >
                                    <ZoomOut className="w-5 h-5" />
                                </button>
                                <span className="text-white text-xs font-mono min-w-[3rem] text-center">
                                    {Math.round(scale * 100)}%
                                </span>
                                <button
                                    onClick={handleZoomIn}
                                    className="p-2 hover:bg-slate-700 rounded-full text-white transition-colors"
                                    title="Zoom In"
                                >
                                    <ZoomIn className="w-5 h-5" />
                                </button>
                            </div>

                            <button
                                onClick={toggleOpen}
                                className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Image Container */}
                        <div
                            className="w-full h-full flex items-center justify-center p-4 overflow-auto"
                            onClick={(e) => e.stopPropagation()} // Allow clicking background to close, but not image area if dragging (future)
                        >
                            <motion.div
                                animate={{ scale: scale }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="relative cursor-grab active:cursor-grabbing"
                                drag
                                dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
                            >
                                <img
                                    src={src}
                                    alt={alt}
                                    className="max-w-[90vw] max-h-[90vh] object-contain shadow-2xl rounded-lg"
                                    style={{
                                        maxWidth: scale > 1 ? 'none' : '90vw',
                                        maxHeight: scale > 1 ? 'none' : '90vh'
                                    }}
                                    draggable={false}
                                />
                            </motion.div>
                        </div>

                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white/80 text-sm pointer-events-none">
                            Arrastra para mover • Usa Scroll para zoom
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
