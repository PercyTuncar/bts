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
    const baseStyles = "relative bg-white border border-slate-200 transition-transform duration-200 ease-out shadow-sm";

    const variants = {
        default: "p-6",
        interactive: "p-6 cursor-pointer hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_#A855F7] active:translate-y-0 active:translate-x-0 active:shadow-none hover:border-primary",
        sticky: "p-4 border-b-4 border-acid-yellow sticky top-20 z-30 bg-white",
        feature: "p-8 border-slate-200 hover:border-primary hover:bg-slate-50"
    };

    return (
        <div className={cn(baseStyles, variants[variant], className)}>
            {/* Perforated Edge Effect (Subtle) */}
            <div className="absolute inset-y-0 -left-1 w-2 bg-[radial-gradient(circle,transparent_2px,#F8FAFC_2px)] bg-[length:4px_8px] z-20 pointer-events-none opacity-0 md:opacity-100" />

            <div className="relative z-10">{children}</div>
        </div>
    );
};
