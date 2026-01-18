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
                    "inline-flex items-center justify-center font-black uppercase tracking-widest transition-all duration-200 active:translate-y-1 active:translate-x-1 active:shadow-none border-2",
                    {
                        'bg-acid-yellow text-black border-black shadow-[4px_4px_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_#000]': variant === 'primary',
                        'bg-acid-pink text-black border-black shadow-[4px_4px_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_#000]': variant === 'secondary',
                        'bg-transparent border-white text-white hover:bg-white hover:text-black': variant === 'outline',
                        'px-4 py-2 text-xs': size === 'sm',
                        'px-8 py-3 text-sm': size === 'md',
                        'px-12 py-4 text-base': size === 'lg',
                    },
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';
