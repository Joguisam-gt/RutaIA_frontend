import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const HeaderControls = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex items-center">
            <button
                onClick={toggleTheme}
                aria-label="Cambiar tema"
                className="p-2 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
                {theme === 'light' ? (
                    <Moon className="w-4 h-4" />
                ) : (
                    <Sun className="w-4 h-4" />
                )}
            </button>
        </div>
    );
};

export default HeaderControls;