import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'interactive' | 'sticky' | 'feature';
}

export const GlassCard = ({ children, className, variant = 'default' }: GlassCardProps) => {
    // Brutalist "Ticket Stub" Base Styles
    const baseStyles = "relative bg-black border-2 border-white transition-transform duration-200 ease-out";

    const variants = {
        default: "p-6",
        interactive: "p-6 cursor-pointer hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_#fff] active:translate-y-0 active:translate-x-0 active:shadow-none",
        sticky: "p-4 border-b-4 border-acid-yellow sticky top-20 z-30 bg-black",
        feature: "p-8 border-white/20 hover:border-acid-yellow hover:bg-white/5"
    };

    return (
        <div className={cn(baseStyles, variants[variant], className)}>
            {/* Perforated Edge Effect (Subtle) */}
            <div className="absolute inset-y-0 -left-1 w-2 bg-[radial-gradient(circle,transparent_2px,#000_2px)] bg-[length:4px_8px] z-20 pointer-events-none opacity-0 md:opacity-100" />

            <div className="relative z-10">{children}</div>
        </div>
    );
};
