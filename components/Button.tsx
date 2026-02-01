import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-full",
                    {
                        // Primary: Red background, white text, subtle red glow
                        'bg-primary text-white shadow-lg shadow-primary/30 hover:bg-red-600 hover:shadow-primary/50': variant === 'primary',
                        // Secondary: Slate 900 background
                        'bg-slate-900 text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800': variant === 'secondary',
                        // Outline: Transparent with Red border
                        'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white': variant === 'outline',
                        'px-4 py-2 text-sm': size === 'sm',
                        'px-8 py-3 text-base': size === 'md',
                        'px-10 py-4 text-lg': size === 'lg',
                    },
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';
