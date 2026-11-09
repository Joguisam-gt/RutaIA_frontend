import React from 'react';

export const Input = ({ label, error, className = '', ...props }) => {
    return (
        <div className="w-full flex flex-col space-y-1.5">
            {label && (
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {label}
                </label>
            )}
            <input
                className={`w-full px-3.5 py-2 text-sm rounded-md border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${error ? 'border-red-500 focus:ring-red-500' : ''
                    } ${className}`}
                {...props}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
};

export default Input;