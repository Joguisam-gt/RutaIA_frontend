import React from 'react';

export const Input = ({
    label,
    error,
    helperText,
    icon: Icon = null,
    rightElement = null,
    id,
    type = 'text',
    className = '',
    required = false,
    ...props
}) => {
    const inputId = id || props.name;

    return (
        <div className="w-full space-y-1.5">
            {label && (
                <label htmlFor={inputId} className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    {label} {required && <span className="text-rose-500">*</span>}
                </label>
            )}

            <div className="relative flex items-center">
                {Icon && (
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <Icon size={16} />
                    </div>
                )}

                <input
                    id={inputId}
                    type={type}
                    className={`w-full py-2.5 text-xs bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl border transition-colors focus:outline-none ${Icon ? 'pl-10' : 'pl-3.5'
                        } ${rightElement ? 'pr-10' : 'pr-3.5'} ${error
                            ? 'border-rose-500 focus:border-rose-600'
                            : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500'
                        } ${className}`}
                    {...props}
                />

                {rightElement && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                        {rightElement}
                    </div>
                )}
            </div>

            {error ? (
                <span className="block text-[11px] font-semibold text-rose-500">{error}</span>
            ) : helperText ? (
                <span className="block text-[11px] text-slate-400">{helperText}</span>
            ) : null}
        </div>
    );
};

export default Input;