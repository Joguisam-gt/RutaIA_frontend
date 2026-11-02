import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
    children,
    variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
    size = 'md', // 'sm' | 'md' | 'lg'
    isLoading = false,
    isDisabled = false,
    fullWidth = false,
    icon: Icon = null,
    iconPosition = 'left',
    onClick,
    type = 'button',
    className = '',
    ...props
}) => {
    // Variantes de estilo (El degradado se aplica exclusivamente a botones interactivos)
    const variants = {
        primary:
            'bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 text-white hover:opacity-95 shadow-md shadow-indigo-500/20 active:scale-[0.98]',
        secondary:
            'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-[0.98]',
        outline:
            'border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-[0.98]',
        ghost:
            'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800',
        danger:
            'bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-600/20 active:scale-[0.98]',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs rounded-xl gap-1.5',
        md: 'px-4 py-2.5 text-xs font-bold rounded-xl gap-2',
        lg: 'px-6 py-3.5 text-sm font-extrabold rounded-2xl gap-2.5',
    };

    const disabledStyles = isDisabled || isLoading ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer';
    const widthStyle = fullWidth ? 'w-full' : 'w-auto';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled || isLoading}
            className={`inline-flex items-center justify-center font-bold transition-all duration-200 ${variants[variant]} ${sizes[size]} ${disabledStyles} ${widthStyle} ${className}`}
            {...props}
        >
            {isLoading ? (
                <Loader2 size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="animate-spin" />
            ) : (
                <>
                    {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />}
                    <span>{children}</span>
                    {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />}
                </>
            )}
        </button>
    );
};

export default Button;